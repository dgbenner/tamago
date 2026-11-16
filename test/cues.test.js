// Interface sounds (Dan, 2026-11-15): four soft sounds, quiet, never over the language, off with the Sounds setting
// and under reduced motion, none on a wrong answer (the lesson never asks for one there).
import test from 'node:test'
import assert from 'node:assert/strict'

const storage = () => ({ getItem: () => null, setItem: () => {}, removeItem: () => {} })
globalThis.localStorage = storage()
globalThis.sessionStorage = storage()
globalThis.window = globalThis
let reduce = false
globalThis.matchMedia = (q) => ({ matches: reduce && /reduce/.test(q) })
const made = { oscillators: 0, buses: [] }
class Param { constructor(v = 1) { this.value = v; this.target = null } setValueAtTime(v) { this.value = v } exponentialRampToValueAtTime() {} setTargetAtTime(v) { this.target = v } }
let wakes = true // whether a sleeping context wakes when asked (iOS: only from a tap, and not while interrupted)
let theContext = null
globalThis.AudioContext = class {
  constructor() { theContext = this }
  state = 'running'; currentTime = 0; destination = {}; sampleRate = 44100
  resume() { if (wakes) { return Promise.resolve().then(() => { this.state = 'running' }) } return Promise.reject(new Error('not allowed')) }
  createGain() { const g = { gain: new Param(1), connect: (x) => x, disconnect() {} }; made.buses.push(g); return g }
  createOscillator() { made.oscillators++; return { type: 'sine', frequency: new Param(), connect: (x) => x, start() {}, stop() {} } }
  createBiquadFilter() { return { type: '', frequency: new Param(), connect: (x) => x } }
  createBufferSource() { return { connect: (x) => x, start() {}, stop() {} } }
  createBuffer() { return {} }
}
let voiceSpeaking = false
const spoken = []
globalThis.speechSynthesis = { get speaking() { return voiceSpeaking }, pending: false, getVoices: () => [], cancel() {}, speak(u) { spoken.push(u) } }
globalThis.SpeechSynthesisUtterance = class { constructor(t) { this.text = t } }
const { cue, setCues, CUES, CUE_LEVEL, lastCueName, play, stop, audioState } = await import('../src/lib/audio.js')

test('the four picks play, each on a quiet bus of its own', () => {
  assert.deepEqual(Object.keys(CUES).sort(), ['button', 'match', 'slot', 'start'])
  for (const name of Object.keys(CUES)) {
    const before = made.oscillators
    assert.equal(cue(name), true, name)
    assert.equal(lastCueName(), name)
    assert.ok(made.oscillators > before, `${name} made no sound`)
    assert.equal(made.buses.findLast((b) => b.gain.value === CUE_LEVEL)?.gain.value, CUE_LEVEL)
  }
  assert.ok(CUE_LEVEL <= 0.4, 'kept well under the recordings')
})

test('the Sounds setting turns them all off, and on again', () => {
  setCues(false)
  for (const name of Object.keys(CUES)) assert.equal(cue(name), false, name)
  setCues(true)
  assert.equal(cue('button'), true)
})

test('reduced motion turns them off', () => {
  reduce = true
  assert.equal(cue('start'), false)
  reduce = false
  assert.equal(cue('start'), true)
})

test('never over the device voice', () => {
  play({ french: 'Bonjour.' }) // a sentence of ours goes to the voice
  voiceSpeaking = true
  assert.equal(cue('match'), false)
  spoken.at(-1).onend() // it reports its end
  voiceSpeaking = false
  assert.equal(cue('match'), true)
})

// iPhone 11, 2026-11-15: no interface sounds at all while lesson audio played. Safari's "speaking" flag can stay true
// after the sentence has ended; trusted alone, it skipped every sound from then on.
test('a "speaking" flag stuck on after the sentence ended does not silence them', () => {
  play({ french: 'Bonjour.' })
  voiceSpeaking = true
  spoken.at(-1).onend()
  const before = made.oscillators
  assert.equal(cue('button'), true, 'the voice has reported its end: nothing of ours is being said')
  assert.ok(made.oscillators > before)
  voiceSpeaking = false
  stop()
})

// Notes scheduled on a sleeping context (suspended, or interrupted on iOS) are never heard: wake it, then play.
test('a sleeping context is woken in the tap and the sound plays once it runs', async () => {
  cue('button') // makes the context
  theContext.state = 'interrupted'
  assert.equal(audioState(), 'interrupted')
  const before = made.oscillators
  assert.equal(cue('slot'), true)
  assert.equal(made.oscillators, before, 'nothing is scheduled while the context sleeps')
  await new Promise((r) => setTimeout(r, 5))
  assert.equal(theContext.state, 'running')
  assert.ok(made.oscillators > before, 'the sound played once the context woke')
  // A context that will not wake makes no sound and throws nothing.
  theContext.state = 'suspended'; wakes = false
  const still = made.oscillators
  cue('slot')
  await new Promise((r) => setTimeout(r, 5))
  assert.equal(made.oscillators, still)
  theContext.state = 'running'; wakes = true
})

test('language audio that starts cuts a sound off at once', () => {
  cue('start')
  const bus = made.buses.findLast((b) => b.gain.value === CUE_LEVEL)
  play({ french: 'Bonjour.' })
  assert.equal(bus.gain.target, 0)
})
