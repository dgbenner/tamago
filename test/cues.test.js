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
globalThis.AudioContext = class {
  state = 'running'; currentTime = 0; destination = {}; sampleRate = 44100
  resume() { return Promise.resolve() }
  createGain() { const g = { gain: new Param(1), connect: (x) => x, disconnect() {} }; made.buses.push(g); return g }
  createOscillator() { made.oscillators++; return { type: 'sine', frequency: new Param(), connect: (x) => x, start() {}, stop() {} } }
  createBiquadFilter() { return { type: '', frequency: new Param(), connect: (x) => x } }
  createBufferSource() { return { connect: (x) => x, start() {}, stop() {} } }
  createBuffer() { return {} }
}
let voiceSpeaking = false
globalThis.speechSynthesis = { get speaking() { return voiceSpeaking }, getVoices: () => [], cancel() {}, speak() {} }
globalThis.SpeechSynthesisUtterance = class { constructor(t) { this.text = t } }
const { cue, setCues, CUES, CUE_LEVEL, lastCueName, play } = await import('../src/lib/audio.js')

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

test('never over the device voice or a recording', () => {
  voiceSpeaking = true
  assert.equal(cue('match'), false)
  voiceSpeaking = false
  assert.equal(cue('match'), true)
})

test('language audio that starts cuts a sound off at once', () => {
  cue('start')
  const bus = made.buses.findLast((b) => b.gain.value === CUE_LEVEL)
  play({ french: 'Bonjour.' })
  assert.equal(bus.gain.target, 0)
})
