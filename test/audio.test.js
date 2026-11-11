import test, { mock } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

// Two bugs are held here.
// 2026-11-11, the freeze: the app made one audio player per recording at startup (441 for French). Safari and every
// iOS browser slow down steeply with the number of players on a page, so lessons froze on iPhone and iPad. The number
// of players must stay small however many recordings a course has.
// 2026-11-11, silent questions on iPad: Safari drops a sentence spoken straight after a cancel (a replay, or a new
// question over the last answer), and a recording can fail to start. Sound must come anyway.
mock.timers.enable({ apis: ['setTimeout', 'Date'] })
const storage = () => ({ getItem: () => null, setItem: () => {}, removeItem: () => {} })
globalThis.localStorage = storage()
globalThis.sessionStorage = storage()
globalThis.window = globalThis

// Audio players as a test can watch them. `sound` says what a player does when asked to play.
const made = []
let sound = 'plays' // 'plays', 'silent' (never makes a sound), 'refused' (iOS: not from a tap)
globalThis.Audio = class {
  constructor() { this.src = ''; this.paused = true; this.currentTime = 0; this.loads = 0; made.push(this) }
  load() { this.loads++ }
  play() {
    if (sound === 'refused') return Promise.reject(Object.assign(new Error('not allowed'), { name: 'NotAllowedError' }))
    this.paused = false
    if (sound === 'plays') this.currentTime = 0.2
    return Promise.resolve()
  }
  pause() { this.paused = true }
}

// The device voice, behaving like Safari on iOS: a sentence spoken within 100 ms of a cancel is dropped without a
// word, and so is the next one when `dropNext` is set. A sentence starts 10 ms after it is spoken and lasts a second.
const spoken = [] // the sentences that were really heard
const voice = { speaking: false, pending: false, dropNext: false, cancelledAt: -Infinity, token: 0 }
globalThis.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; this.volume = 1 } }
globalThis.speechSynthesis = {
  getVoices: () => [],
  get speaking() { return voice.speaking },
  get pending() { return voice.pending },
  cancel() { voice.token++; voice.speaking = false; voice.pending = false; voice.cancelledAt = Date.now() },
  speak(u) {
    if (voice.dropNext || Date.now() - voice.cancelledAt < 100) { voice.dropNext = false; return }
    const token = ++voice.token
    voice.pending = true
    setTimeout(() => {
      if (token !== voice.token) return
      voice.pending = false; voice.speaking = true
      if (u.volume > 0) spoken.push(u.text)
      u.onstart?.()
      setTimeout(() => { if (token !== voice.token) return; voice.speaking = false; u.onend?.() }, 1000)
    }, 10)
  },
}
const { MAX_PLAYERS, filesIn, play, preload, stop, unlock } = await import('../src/lib/audio.js')
const wait = async (ms) => { await Promise.resolve(); await Promise.resolve(); mock.timers.tick(ms); await Promise.resolve(); await Promise.resolve() }
const settle = async () => { for (let i = 0; i < 80; i++) await wait(100) } // 8 seconds, in steps
const fresh = async () => { stop(); await settle(); spoken.length = 0; sound = 'plays'; voice.dropNext = false }

const sentences = JSON.parse(readFileSync(new URL('../src/content/sentences.json', import.meta.url), 'utf8'))
const words = JSON.parse(readFileSync(new URL('../src/content/words.json', import.meta.url), 'utf8'))
const recordings = [...sentences.map((s) => s.native_recording?.audio_file ?? s.lingua_libre?.audio_file), ...words.map((w) => w.lingua_libre?.audio_file)].filter(Boolean)

test('the course has far more recordings than a page can hold players for', () => {
  assert.ok(recordings.length > 200, `${recordings.length} recordings`)
  assert.ok(MAX_PLAYERS <= 16, `MAX_PLAYERS is ${MAX_PLAYERS}`)
})

test('preloading every recording of the course keeps the number of audio players small', () => {
  preload(recordings)
  assert.ok(made.length <= MAX_PLAYERS, `${made.length} audio players made for ${recordings.length} recordings`)
})

test('playing every recording in turn reuses the same few players', async () => {
  for (const file of recordings) play({ french: 'x', file })
  assert.ok(made.length <= MAX_PLAYERS, `${made.length} audio players made`)
  const last = recordings.at(-1)
  assert.equal(made.filter((el) => el.src === last && !el.paused).length, 1, 'the last recording is the one playing')
  assert.equal(made.filter((el) => !el.paused).length, 1, 'only one plays at a time')
  await fresh()
})

test('a recording that was just preloaded keeps its player when it is played', async () => {
  const [a, b, c] = recordings
  preload([a, b, c])
  const before = made.find((el) => el.src === b)
  play({ french: 'x', file: b })
  assert.equal(made.find((el) => el.src === b), before)
  assert.equal(before.paused, false)
  await fresh()
})

test('a player given another recording is told to load it (iOS does not always follow a changed src)', async () => {
  const file = recordings[40]
  play({ french: 'x', file })
  const el = made.find((p) => p.src === file)
  const loads = el.loads
  play({ french: 'x', file })
  assert.equal(el.loads, loads, 'a replay does not load again')
  assert.ok(loads >= 1)
  await fresh()
})

test('the first tap makes every player ready, and never more than the limit', async () => {
  unlock()
  assert.equal(made.length, MAX_PLAYERS)
  for (const file of recordings.slice(0, 60)) play({ french: 'x', file })
  assert.equal(made.length, MAX_PLAYERS)
  await fresh()
  assert.deepEqual(spoken, [], 'making the voice ready is not heard')
})

test('filesIn finds the recordings of a question, whatever its type', () => {
  const q = {
    type: 'QT04', audio: { french: 'a', file: '/audio/S1.m4a' },
    audioChoices: [{ sentence_id: 'S2', file: '/audio/S2.m4a' }, { sentence_id: 'S3', file: null }],
    pairs: [{ word_id: 'W1', audio: { french: 'b', file: '/audio/W1.m4a' } }],
    answers: [{ french: 'c', audio: { file: '/audio/S1.m4a' } }],
  }
  assert.deepEqual(filesIn(q), ['/audio/S1.m4a', '/audio/S2.m4a', '/audio/W1.m4a'])
  assert.deepEqual(filesIn(null), [])
})

// The device voice: most sentences have no recording.
const sentence = (french) => ({ french, file: null })

test('a sentence with no recording is spoken on the first tap', async () => {
  await fresh()
  play(sentence('Bonjour.'))
  await settle()
  assert.deepEqual(spoken, ['Bonjour.'])
})

test('replay while the voice is still speaking: the sentence is heard again', async () => {
  await fresh()
  play(sentence('Je suis une femme.'))
  await wait(300) // mid-sentence
  play(sentence('Je suis une femme.'))
  await settle()
  assert.deepEqual(spoken, ['Je suis une femme.', 'Je suis une femme.'])
})

test('a new question arriving over the last answer is heard', async () => {
  await fresh()
  play(sentence('Oui, merci.'))
  await wait(200)
  stop() // leaving the question
  play(sentence('Tu es un garçon ?')) // the next one plays as it arrives
  await settle()
  assert.deepEqual(spoken, ['Oui, merci.', 'Tu es un garçon ?'])
})

test('quick taps on several choices: the last one is heard, once', async () => {
  await fresh()
  play(sentence('Un.'))
  await wait(30)
  play(sentence('Deux.'))
  await wait(30)
  play(sentence('Trois.'))
  await settle()
  assert.equal(spoken.at(-1), 'Trois.')
  assert.equal(spoken.filter((t) => t === 'Trois.').length, 1)
})

test('a sentence the device drops without a word is said again', async () => {
  await fresh()
  voice.dropNext = true
  play(sentence('Au revoir.'))
  await settle()
  assert.deepEqual(spoken, ['Au revoir.'])
})

test('stopping means silence: nothing waiting is said afterwards', async () => {
  await fresh()
  voice.dropNext = true
  play(sentence('Merci.'))
  stop()
  await settle()
  assert.deepEqual(spoken, [])
})

test('a recording that plays is not also spoken', async () => {
  await fresh()
  play({ french: 'bonjour', file: recordings[0] })
  await settle()
  assert.deepEqual(spoken, [])
})

test('a recording iOS refuses to start is spoken by the device voice instead', async () => {
  await fresh()
  sound = 'refused'
  play({ french: 'bonjour', file: recordings[1] })
  await settle()
  assert.deepEqual(spoken, ['bonjour'])
})

test('a recording that makes no sound is spoken by the device voice instead, once', async () => {
  await fresh()
  sound = 'silent'
  play({ french: 'merci', file: recordings[2] })
  await settle()
  assert.deepEqual(spoken, ['merci'])
})
