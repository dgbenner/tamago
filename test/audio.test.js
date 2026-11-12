import test, { mock } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

// Three bugs are held here, all of 2026-11-11.
// The freeze: the app made one audio player per recording at startup (441 for French). Safari and every iOS browser
// slow down steeply with the number of players on a page, so lessons froze on iPhone and iPad.
// Silent questions on iPad: Safari loses a sentence handed to the device voice while an earlier one is still being
// cancelled (a replay, or a new question over the last answer), and a recording can fail to start.
// Slow, choppy replay on iPhone: the first cure for the silence waited a fixed 150 ms after every cancel and said a
// lost sentence again 0.9 s later; audio elements also take 0.2 to 0.3 s to start or restart. Sound must start in
// the tap, or the moment a cancel has really finished, and never twice.
mock.timers.enable({ apis: ['setTimeout', 'Date'] })
const storage = () => ({ getItem: () => null, setItem: () => {}, removeItem: () => {} })
globalThis.localStorage = storage()
globalThis.sessionStorage = storage()
globalThis.window = globalThis
const TARGET = 200 // ms from the tap to the sound (Dan)

// ---- Audio elements, as a test can watch them. `sound` says what one does when asked to play.
const made = []
let sound = 'plays' // 'plays', 'silent' (never makes a sound), 'refused' (iOS: not from a tap)
globalThis.Audio = class {
  constructor() { this.src = ''; this.paused = true; this.currentTime = 0; this.loads = 0; this.playedAt = []; made.push(this) }
  load() { this.loads++ }
  play() {
    if (sound === 'refused') return Promise.reject(Object.assign(new Error('not allowed'), { name: 'NotAllowedError' }))
    this.paused = false
    this.playedAt.push(Date.now())
    if (sound === 'plays') this.currentTime = 0.2
    return Promise.resolve()
  }
  pause() { this.paused = true }
}

// ---- Web Audio: a decoded recording starts the moment start() is called.
const web = { state: 'running', started: [], sounding: new Set(), fetched: [], resumes: 0 }
class FakeContext {
  get state() { return web.state }
  get currentTime() { return Date.now() / 1000 }
  get destination() { return {} }
  resume() { web.resumes++; return Promise.resolve() }
  decodeAudioData(bytes, resolve) { setTimeout(() => resolve({ file: bytes.file }), 5) }
  createBuffer() { return { file: 'silence' } }
  createGain() { return { gain: { setTargetAtTime() {} }, connect() {} } }
  createBufferSource() {
    return {
      buffer: null, onended: null, connect() {},
      start() { if (this.buffer.file !== 'silence') { web.started.push({ file: this.buffer.file, at: Date.now() }); web.sounding.add(this) } },
      stop() { web.sounding.delete(this) },
    }
  }
}
globalThis.fetch = (file) => { web.fetched.push(file); return Promise.resolve({ ok: true, arrayBuffer: () => Promise.resolve({ file }) }) }

// ---- The device voice, built the way Safari's is. One sentence is spoken at a time; the rest queue. cancel() empties
// the queue and tells the system to stop the current sentence, which reports back `cancelTakes` ms later (never, if
// null). When a sentence reports, Safari takes the first in the queue to be that sentence and removes it: so a
// sentence spoken between a cancel and its report is removed unheard. That is the bug the page has to work around.
const voice = { current: null, queue: [], cancelTakes: 5, dropNext: false, cancels: 0, heard: [] }
const report = (u, failed) => {
  if (u.over) return
  u.over = true
  voice.current = null
  if (failed) u.onerror?.({ error: 'canceled' }); else u.onend?.()
  if (voice.queue.length) { voice.queue.shift(); if (voice.queue.length) begin(voice.queue[0]) }
}
const begin = (u) => {
  voice.current = u
  voice.heard.push({ text: u.text, at: Date.now() })
  setTimeout(() => { if (!u.over) u.onstart?.() }, 10)
  setTimeout(() => report(u, false), 1000)
}
globalThis.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; this.volume = 1 } }
globalThis.speechSynthesis = {
  getVoices: () => [],
  get speaking() { return Boolean(voice.current) },
  get pending() { return voice.queue.length > 1 },
  cancel() {
    voice.cancels++
    voice.queue = []
    const u = voice.current
    if (u && voice.cancelTakes === 'inside') report(u, true)
    else if (u && !u.stopping && voice.cancelTakes != null) { u.stopping = true; setTimeout(() => report(u, true), voice.cancelTakes) }
  },
  speak(u) {
    if (voice.dropNext) { voice.dropNext = false; return }
    voice.queue.push(u)
    if (voice.queue.length === 1 && !voice.current) begin(u)
  },
}

const audio = await import('../src/lib/audio.js') // with Web Audio
globalThis.AudioContext = FakeContext
const { MAX_DECODED, MAX_PLAYERS, CANCEL_LIMIT, filesIn } = audio
const flush = async () => { for (let i = 0; i < 12; i++) await Promise.resolve() }
const wait = async (ms) => { await flush(); mock.timers.tick(ms); await flush() }
const pass = async (ms) => { for (let t = 0; t < ms; t += 2) await wait(2) } // time passing in small steps
const settle = () => pass(6000)
const fresh = async (a = audio) => {
  a.stop(); await settle()
  if (voice.current) report(voice.current, true)
  Object.assign(voice, { queue: [], cancelTakes: 5, dropNext: false, cancels: 0, heard: [] })
  Object.assign(web, { state: 'running', started: [], resumes: 0 }); web.sounding.clear()
  sound = 'plays'
}
const texts = () => voice.heard.map((h) => h.text)

const sentences = JSON.parse(readFileSync(new URL('../src/content/sentences.json', import.meta.url), 'utf8'))
const words = JSON.parse(readFileSync(new URL('../src/content/words.json', import.meta.url), 'utf8'))
const recordings = [...sentences.map((s) => s.native_recording?.audio_file ?? s.lingua_libre?.audio_file), ...words.map((w) => w.lingua_libre?.audio_file)].filter(Boolean)
const sentence = (french) => ({ french, file: null })

test('the course has far more recordings than a page can hold players for', () => {
  assert.ok(recordings.length > 200, `${recordings.length} recordings`)
  assert.ok(MAX_PLAYERS <= 16, `MAX_PLAYERS is ${MAX_PLAYERS}`)
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

// ---- Recordings ----
test('preloading every recording of the course decodes only a few, and makes no audio players', async () => {
  await fresh()
  audio.preload(recordings)
  await settle()
  assert.ok(web.fetched.length <= MAX_DECODED, `${web.fetched.length} recordings fetched`)
  assert.equal(made.length, 0)
})

test('timing: a recording made ready starts in the tap itself, first time and on replay', async () => {
  await fresh()
  const [file] = recordings
  audio.preload([file])
  await settle()
  for (const tap of ['first tap', 'replay after it ended', 'replay']) {
    const tapped = Date.now()
    audio.play({ french: 'x', file })
    const started = web.started.at(-1)
    assert.equal(started?.file, file, tap)
    assert.ok(started.at - tapped <= TARGET, `${tap}: ${started.at - tapped} ms`)
    assert.equal(started.at - tapped, 0, `${tap}: nothing waits`)
    await pass(tap === 'first tap' ? 1500 : 100)
  }
  assert.equal(made.length, 0, 'no audio element was needed')
})

test('no stutter: a replay mid-sound stops the old sound and starts one new one', async () => {
  await fresh()
  const [file] = recordings
  audio.play({ french: 'x', file })
  await pass(100)
  audio.play({ french: 'x', file })
  audio.play({ french: 'x', file })
  assert.equal(web.sounding.size, 1, 'one sound at a time')
  audio.stop()
  assert.equal(web.sounding.size, 0)
})

test('timing: a recording not decoded yet still starts in the tap (an audio element), and is decoded for the next tap', async () => {
  await fresh()
  const file = recordings[200]
  const tapped = Date.now()
  audio.play({ french: 'x', file })
  const el = made.find((p) => p.src === file)
  assert.equal(el.playedAt.at(-1) - tapped, 0)
  await pass(1500)
  audio.play({ french: 'x', file })
  assert.equal(web.started.at(-1)?.file, file, 'the replay uses the decoded sound')
  assert.deepEqual(texts(), [], 'never also spoken')
})

test('slow playback keeps the pitch: it uses an audio element', async () => {
  await fresh()
  const [file] = recordings
  audio.play({ french: 'x', file }, { slow: true })
  assert.equal(web.started.length, 0)
  assert.equal(made.find((p) => p.src === file).playbackRate, 0.6) // clearly slower (Dan, 2026-11-12)
})

test('a sleeping Web Audio context (iOS after a call) is woken, and the sound comes from an audio element meanwhile', async () => {
  await fresh()
  const [file] = recordings
  web.state = 'interrupted'
  const tapped = Date.now()
  audio.play({ french: 'x', file })
  assert.ok(web.resumes >= 1)
  assert.equal(web.started.length, 0)
  assert.equal(made.find((p) => p.src === file).playedAt.at(-1) - tapped, 0)
})

// ---- Audio elements alone: an iPhone too old for Web Audio with the ring switch off, or a recording not decoded.
globalThis.AudioContext = undefined
const elements = await import('../src/lib/audio.js?elements-only')
elements.preload([]) // settles on audio elements before Web Audio is put back
globalThis.AudioContext = FakeContext

test('audio elements: preloading and playing every recording keeps the number of players small', async () => {
  await fresh(elements)
  made.length = 0
  elements.preload(recordings)
  assert.ok(made.length <= MAX_PLAYERS, `${made.length} audio players made for ${recordings.length} recordings`)
  for (const file of recordings) elements.play({ french: 'x', file })
  assert.ok(made.length <= MAX_PLAYERS, `${made.length} audio players made`)
  const last = recordings.at(-1)
  assert.equal(made.filter((el) => el.src === last && !el.paused).length, 1, 'the last recording is the one playing')
  assert.equal(made.filter((el) => !el.paused).length, 1, 'only one plays at a time')
})

test('audio elements: a preloaded recording keeps its player, and a player given another recording is told to load it', async () => {
  await fresh(elements)
  const [a, b, c] = recordings
  elements.preload([a, b, c])
  const before = made.find((el) => el.src === b)
  const loads = before.loads
  elements.play({ french: 'x', file: b })
  assert.equal(made.find((el) => el.src === b), before)
  assert.equal(before.paused, false)
  assert.ok(loads >= 1)
  assert.equal(before.loads, loads, 'a replay does not load again')
})

test('audio elements: the first tap makes every player ready, and never more than the limit', async () => {
  await fresh(elements)
  elements.unlock()
  assert.equal(made.length, MAX_PLAYERS)
  for (const file of recordings.slice(0, 60)) elements.play({ french: 'x', file })
  assert.equal(made.length, MAX_PLAYERS)
  await fresh(elements)
  assert.deepEqual(texts(), [], 'nothing is spoken to make the voice ready')
})

test('a recording iOS refuses to start is spoken by the device voice instead', async () => {
  await fresh(elements)
  sound = 'refused'
  elements.play({ french: 'bonjour', file: recordings[1] })
  await settle()
  assert.deepEqual(texts(), ['bonjour'])
})

test('a recording that makes no sound is spoken by the device voice instead, once', async () => {
  await fresh(elements)
  sound = 'silent'
  elements.play({ french: 'merci', file: recordings[2] })
  await settle()
  assert.deepEqual(texts(), ['merci'])
})

test('a recording that plays is not also spoken', async () => {
  await fresh(elements)
  elements.play({ french: 'bonjour', file: recordings[0] })
  await settle()
  assert.deepEqual(texts(), [])
})

// ---- The device voice: most sentences have no recording.
test('timing: with the voice free, a sentence is handed to it in the tap itself', async () => {
  await fresh()
  const tapped = Date.now()
  audio.play(sentence('Bonjour.'))
  assert.equal(voice.heard[0]?.at - tapped, 0)
  await settle()
  assert.deepEqual(texts(), ['Bonjour.'])
})

test('timing: a replay after the sentence has ended starts in the tap, with no cancel', async () => {
  await fresh()
  audio.play(sentence('Je suis une femme.'))
  await pass(1500) // it has ended
  const tapped = Date.now()
  audio.play(sentence('Je suis une femme.'))
  assert.equal(voice.heard[1]?.at - tapped, 0)
  assert.equal(voice.cancels, 0, 'nothing to cancel')
  await settle()
  assert.deepEqual(texts(), ['Je suis une femme.', 'Je suis une femme.'])
})

for (const takes of [5, 60, 150, 250]) {
  test(`timing: a replay mid-sentence starts as soon as the cancel has finished (${takes} ms), once`, async () => {
    await fresh()
    voice.cancelTakes = takes
    audio.play(sentence('Je suis une femme.'))
    await pass(300) // mid-sentence
    const tapped = Date.now()
    audio.play(sentence('Je suis une femme.'))
    await settle()
    assert.deepEqual(texts(), ['Je suis une femme.', 'Je suis une femme.'], 'heard again, once')
    const delay = voice.heard[1].at - tapped
    assert.ok(delay >= takes, `not before the cancel finished (${delay} ms)`)
    assert.ok(delay <= takes + 20, `${delay} ms after the tap, for a cancel of ${takes} ms`)
    if (takes <= 150) assert.ok(delay <= TARGET, `${delay} ms`)
  })
}

test('a browser that reports the end inside cancel itself: the replay goes at once, and nothing breaks', async () => {
  await fresh()
  voice.cancelTakes = 'inside'
  audio.play(sentence('Bonjour.'))
  await pass(300)
  const tapped = Date.now()
  audio.play(sentence('Bonjour.'))
  audio.play(sentence('Bonjour.'))
  await settle()
  assert.deepEqual(texts(), ['Bonjour.', 'Bonjour.', 'Bonjour.'].slice(0, texts().length))
  assert.equal(texts().at(-1), 'Bonjour.')
  assert.ok(voice.heard.at(-1).at - tapped <= 20)
})

test('a new question arriving over the last answer is heard, without delay', async () => {
  await fresh()
  audio.play(sentence('Oui, merci.'))
  await pass(200)
  audio.stop() // leaving the question
  const tapped = Date.now()
  audio.play(sentence('Tu es un garçon ?')) // the next one plays as it arrives
  await settle()
  assert.deepEqual(texts(), ['Oui, merci.', 'Tu es un garçon ?'])
  assert.ok(voice.heard[1].at - tapped <= 25, `${voice.heard[1].at - tapped} ms`)
})

test('quick taps on several choices: the last one is heard, once, and the others are not started late', async () => {
  await fresh()
  audio.play(sentence('Un.'))
  await pass(30)
  audio.play(sentence('Deux.'))
  await pass(30)
  audio.play(sentence('Trois.'))
  await settle()
  assert.equal(texts().at(-1), 'Trois.')
  assert.equal(texts().filter((t) => t === 'Trois.').length, 1)
  assert.equal(texts().filter((t) => t === 'Deux.').length <= 1, true)
})

test('a sentence the device drops without a word is said again', async () => {
  await fresh()
  voice.dropNext = true
  audio.play(sentence('Au revoir.'))
  await settle()
  assert.deepEqual(texts(), ['Au revoir.'])
})

test('a cancel that never reports does not silence the voice for good', async () => {
  await fresh()
  audio.play(sentence('Merci.'))
  await pass(200)
  voice.cancelTakes = null
  const stuck = voice.current
  const tapped = Date.now()
  audio.play(sentence('De rien.'))
  await pass(CANCEL_LIMIT + 20)
  report(stuck, true) // the system finally lets go
  await settle()
  assert.equal(texts().filter((t) => t === 'De rien.').length, 1)
  assert.ok(voice.heard.at(-1).at - tapped <= CANCEL_LIMIT + 400)
})

test('a sentence is never spoken twice for one tap, however slow the voice is to start', async () => {
  await fresh()
  audio.play(sentence('Bonjour, je suis Paul.'))
  await settle()
  assert.deepEqual(texts(), ['Bonjour, je suis Paul.'])
})

test('stopping means silence: nothing waiting is said afterwards', async () => {
  await fresh()
  voice.dropNext = true
  audio.play(sentence('Merci.'))
  audio.stop()
  await settle()
  assert.deepEqual(texts(), [])
  audio.play(sentence('Un.'))
  await pass(100)
  audio.play(sentence('Deux.'))
  audio.stop()
  await settle()
  assert.deepEqual(texts(), ['Un.'])
})
