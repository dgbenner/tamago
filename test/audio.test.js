import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

// The bug of 2026-11-11: the app made one audio player per recording at startup (441 for French). Safari and every
// iOS browser slow down steeply with the number of players on a page, so lessons froze on iPhone and iPad once
// Part 2's recordings arrived. The number of players must stay small however many recordings a course has.
const storage = () => ({ getItem: () => null, setItem: () => {}, removeItem: () => {} })
globalThis.localStorage = storage()
globalThis.sessionStorage = storage()
globalThis.window = globalThis
const made = []
globalThis.Audio = class {
  constructor(src = '') { this.src = src; this.paused = true; made.push(this) }
  play() { this.paused = false; return Promise.resolve() }
  pause() { this.paused = true }
}
const { MAX_PLAYERS, filesIn, play, preload } = await import('../src/lib/audio.js')

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

test('playing every recording in turn reuses the same few players', () => {
  for (const file of recordings) play({ french: 'x', file })
  assert.ok(made.length <= MAX_PLAYERS, `${made.length} audio players made`)
  const last = recordings.at(-1)
  assert.equal(made.filter((el) => el.src === last && !el.paused).length, 1, 'the last recording is the one playing')
  assert.equal(made.filter((el) => !el.paused).length, 1, 'only one plays at a time')
})

test('a recording that was just preloaded keeps its player when it is played', () => {
  const [a, b, c] = recordings
  preload([a, b, c])
  const before = made.find((el) => el.src === b)
  play({ french: 'x', file: b })
  assert.equal(made.find((el) => el.src === b), before)
  assert.equal(before.paused, false)
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
