// Interface sounds (Dan, 2026-11-15): soft sounds, quiet, never over the language, off with the Sounds setting only
// (Reduce Motion is about animation and leaves them alone). The answer sounds (correct Warm lift, incorrect Muted minor) play the instant Check is pressed and the
// voice starts over their tail without cutting them off.
// Since 2026-11-15 they are files played through audio elements, not made live in Web Audio: a real iPhone (iPhone 11,
// iOS 27.2, Home Screen web app) never sounded the live ones while the lesson's voice played fine.
import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const storage = () => ({ getItem: () => null, setItem: () => {}, removeItem: () => {} })
globalThis.localStorage = storage()
globalThis.sessionStorage = storage()
globalThis.window = globalThis
let reduce = false
globalThis.matchMedia = (q) => ({ matches: reduce && /reduce/.test(q) })
// Web Audio exists here and must never be touched by an interface sound.
let contexts = 0
globalThis.AudioContext = class { constructor() { contexts++ } state = 'running'; resume() { return Promise.resolve() } }
// Audio elements, as a test can watch them. `refuse` makes play() fail the way iOS does outside a tap.
const made = []
let refuse = null
globalThis.Audio = class {
  constructor() { this.src = ''; this.paused = true; this.currentTime = 0; this.readyState = 4; this.plays = 0; this.pauses = 0; this.on = {}; made.push(this) }
  addEventListener(type, fn) { (this.on[type] ??= []).push(fn) }
  load() {}
  play() {
    if (refuse) return Promise.reject(Object.assign(new Error('not from a tap'), { name: refuse }))
    this.paused = false; this.plays++
    for (const fn of this.on.playing ?? []) fn()
    return Promise.resolve()
  }
  pause() { if (!this.paused) this.pauses++; this.paused = true }
}
let voiceSpeaking = false
const spoken = []
globalThis.speechSynthesis = { get speaking() { return voiceSpeaking }, pending: false, getVoices: () => [], cancel() {}, speak(u) { spoken.push(u) } }
globalThis.SpeechSynthesisUtterance = class { constructor(t) { this.text = t } }
const { cue, setCues, CUE_NAMES, cueFile, cueStatus, lastCueName, play, stop, unlock, MAX_PLAYERS } = await import('../src/lib/audio.js')
const { CUES, CUE_LEVEL, CUE_LUFS, CUE_PEAK_DB } = await import('../src/lib/cue-recipes.js')
const el = (name) => made.find((p) => p.src === cueFile(name))
const quiet = () => { for (const p of made) p.paused = true }

test('every pick has a recipe and a rendered file', () => {
  assert.deepEqual([...CUE_NAMES].sort(), ['button', 'correct', 'incorrect', 'match', 'slot', 'start'])
  assert.deepEqual(Object.keys(CUES).sort(), [...CUE_NAMES].sort())
  assert.ok(CUE_LEVEL <= 0.4)
  assert.ok(CUE_LUFS <= -20 && CUE_LUFS >= -26, 'levelled to be heard on a phone speaker, still under the recordings (-16 LUFS)')
  assert.ok(CUE_PEAK_DB <= -1, 'never clips')
  for (const name of CUE_NAMES) {
    const path = `public${cueFile(name)}`
    assert.ok(existsSync(path), `${path} is missing: node scripts/render-cues.mjs`)
    const wav = readFileSync(path)
    assert.equal(wav.toString('latin1', 0, 4), 'RIFF')
    const seconds = (wav.length - 44) / 2 / wav.readUInt32LE(24)
    assert.ok(seconds > 0.05 && seconds < 0.7, `${name} runs ${seconds.toFixed(2)} s`)
    let peak = 0
    for (let i = 44; i + 1 < wav.length; i += 2) peak = Math.max(peak, Math.abs(wav.readInt16LE(i)))
    assert.ok(peak > 32767 * 0.3 && peak <= Math.ceil(32767 * 10 ** (CUE_PEAK_DB / 20)), `${name} peaks at ${peak}: levelled (node scripts/render-cues.mjs), never clipping`)
  }
})

test('each sound plays its own file through an audio element, never Web Audio', () => {
  for (const name of CUE_NAMES) {
    assert.equal(cue(name), true, name)
    assert.equal(lastCueName(), name)
    assert.equal(el(name).plays, 1, `${name} did not play`)
    assert.equal(el(name).currentTime, 0)
  }
  assert.equal(contexts, 0, 'an interface sound made a Web Audio context')
  assert.equal(cueStatus().heard, CUE_NAMES.length)
  assert.equal(cueStatus().ready, CUE_NAMES.length)
  quiet()
})

test('one element per sound, kept and reused; with the recordings, never more than the pool limit', () => {
  const before = made.length
  assert.equal(before, CUE_NAMES.length)
  for (let i = 0; i < 20; i++) cue('slot')
  assert.equal(made.length, before, 'a replay made a new player')
  assert.equal(el('slot').plays, 21)
  unlock() // the first tap makes the recordings' players too
  for (let i = 0; i < 40; i++) play({ french: 'x', file: `/audio/S${i}.m4a` })
  assert.ok(made.length <= MAX_PLAYERS, `${made.length} audio players`)
  stop(); quiet()
})

test('the Sounds setting turns them all off, and on again', () => {
  setCues(false)
  for (const name of CUE_NAMES) assert.equal(cue(name), false, name)
  assert.equal(cueStatus().on, false)
  setCues(true)
  assert.equal(cue('button'), true)
  quiet()
})

// Dan, 2026-11-15: Reduce Motion only affects animation. It used to mute the sounds, and a device with it on had none.
test('reduced motion does not turn them off: only the Sounds setting does', () => {
  reduce = true
  for (const name of CUE_NAMES) { quiet(); assert.equal(cue(name), true, name) }
  reduce = false
  quiet()
  assert.doesNotMatch(readFileSync('src/lib/audio.js', 'utf8'), /prefers-reduced-motion/)
})

test('never over the device voice', () => {
  play({ french: 'Bonjour.' }) // a sentence of ours goes to the voice
  voiceSpeaking = true
  assert.equal(cue('match'), false)
  spoken.at(-1).onend() // it reports its end
  voiceSpeaking = false
  assert.equal(cue('match'), true)
  quiet()
})

// iPhone 11, 2026-11-15: Safari's "speaking" flag can stay true after the sentence has ended; trusted alone, it
// skipped every sound from then on.
test('a "speaking" flag stuck on after the sentence ended does not silence them', () => {
  play({ french: 'Bonjour.' })
  voiceSpeaking = true
  spoken.at(-1).onend()
  const before = el('button').plays
  assert.equal(cue('button'), true, 'the voice has reported its end: nothing of ours is being said')
  assert.equal(el('button').plays, before + 1)
  voiceSpeaking = false
  stop(); quiet()
})

test('language audio that starts cuts a sound off at once; a new question (stop) does not', () => {
  cue('start')
  stop()
  assert.equal(el('start').paused, false, 'stop() runs on every question change and leaves the sound')
  play({ french: 'Bonjour.' })
  assert.equal(el('start').paused, true)
  spoken.at(-1).onend()
  stop()
})

test('a newer interface sound replaces the one still playing', () => {
  cue('start')
  cue('slot')
  assert.equal(el('start').paused, true)
  assert.equal(el('slot').paused, false)
  quiet()
})

test('a sound the browser refuses is recorded for the Developer page, and throws nothing', async () => {
  refuse = 'NotAllowedError'
  assert.equal(cue('slot'), true)
  await new Promise((r) => setTimeout(r, 5))
  const { error } = cueStatus()
  assert.equal(error.cue, 'slot')
  assert.match(error.error, /NotAllowedError/)
  // Being replaced by a newer sound (AbortError) is not an error.
  refuse = 'AbortError'
  cue('match')
  await new Promise((r) => setTimeout(r, 5))
  assert.equal(cueStatus().error.cue, 'slot')
  refuse = null
  const developer = readFileSync('src/screens/Developer.jsx', 'utf8')
  assert.match(developer, /data-sound-state/)
  assert.match(developer, /data-sound-error/)
})

test('the answer sounds play at Check even while the voice is speaking, and the voice starting does not cut them', async () => {
  play({ french: 'Bonjour.' })
  voiceSpeaking = true
  assert.equal(cue('match'), false, 'other sounds still wait for the voice')
  assert.equal(cue('correct'), true, 'the correct sound plays at once')
  play({ french: 'Je mange du pain.' }) // the answer bar's voice, at its usual moment
  assert.equal(el('correct').paused, false, 'not cut off')
  assert.equal(cue('incorrect'), true)
  spoken.at(-1).onend(); voiceSpeaking = false
  stop()
  // The lesson asks for them on Check: right, wrong; speaking and a written message get the button's sound.
  const lesson = readFileSync('src/screens/Lesson.jsx', 'utf8')
  assert.match(lesson, /cue\(r\.speaking \|\| q\.ungraded \? 'button' : r\.correct \? 'correct' : 'incorrect'\)/)
  await new Promise((r) => setTimeout(r, 500))
  cue('start')
  play({ french: 'Bonjour.' })
  assert.equal(el('start').paused, true, 'once the answer sound is done, language cuts the others again')
  stop()
})
