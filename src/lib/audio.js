// Native recording when there is one, browser speech otherwise. No network either way once installed.
// Every sound of the course goes through this file. Three rulings shape it:
//
// 1. Few audio elements (2026-11-11). Safari, and so every iOS browser, slows down steeply with the number of audio
//    elements a page holds: one per recording (441 for French) froze lessons on iPhone and iPad. The page never makes
//    more than MAX_PLAYERS, and reuses them.
// 2. Sound that always comes (2026-11-11). Safari drops a sentence handed to the device voice while an earlier one is
//    still being cancelled (a replay, or a new question over the last answer). A recording iOS refuses, or that makes
//    no sound, is spoken by the device voice instead.
// 3. Sound within about 0.2 s of the tap, with no stutter (Dan, 2026-11-11). Nothing waits a fixed time any more:
//    - Recordings are decoded ahead (this question's and the next two) and started through Web Audio, which starts
//      at once and restarts cleanly. An audio element takes 0.2 to 0.3 s to start or to restart mid-play, and can
//      stutter; it is now only the way for a recording not decoded yet, and for slow playback (it keeps the pitch).
//    - The device voice speaks in the tap itself when it is free. When it is still speaking, it is cancelled and the
//      new sentence goes the moment the old one reports it has stopped (its end or error event), not after a set
//      wait: the first fix waited 150 ms and, when the cancel took longer than that on a phone, lost the sentence
//      and said it again 0.9 s later.
export const MAX_PLAYERS = 12 // every audio element the page makes: the interface sounds' six (below) and the recordings' six
export const MAX_DECODED = 36 // decoded recordings kept ready: about three questions' worth, with room
export const CANCEL_LIMIT = 400 // ms: a cancel that still hasn't reported by then is taken as done
export const DROPPED_AFTER = 300 // ms with no start and an idle voice: the sentence was dropped, say it again
export const STALLED_AFTER = 2500 // ms with no sound before a recording in an audio element gives way to the voice
const RETRIES = 2

import { course } from './course.js'

let job = 0 // every play and every stop starts a new job; what an older one left waiting does nothing

// What's playing now (Dan, 2026-11-12, batch 4), for the speaker icons' playing state: a key per sound (the recording's
// file, else its words; "yours:…" for the learner's own recording), null when nothing plays. Every sound ends it.
let nowKey = null
const listeners = new Set()
export const audioKey = (audio) => audio?.file ?? audio?.french ?? null
export const nowPlaying = () => nowKey
export function onPlaying(fn) { listeners.add(fn); return () => listeners.delete(fn) }
function setNow(key) { if (nowKey === key) return; nowKey = key; for (const fn of listeners) fn(key) }
// Sounds made outside this module (the learner's recording played back): stop() stops them too.
const outside = new Set()
export function playOutside(el, key) {
  stop()
  hushCues()
  const mine = job
  outside.add(el)
  el.onended = el.onpause = () => { if (mine === job) setNow(null) }
  el.play()?.catch?.(() => { if (mine === job) setNow(null) })
  setNow(key)
}
// For tests: is any sound still going? Players, the decoded sound, outside sounds, the device voice.
export function anythingPlaying() {
  return Boolean(sounding) || [...players.values(), ...outside].some((el) => !el.paused && !el.ended)
    || Boolean(typeof window !== 'undefined' && window.speechSynthesis?.speaking)
}
if (typeof window !== 'undefined') window.__tamagoAudio = { playing: anythingPlaying, now: nowPlaying, outside: () => [...outside].filter((el) => !el.paused && !el.ended).length }

// ---- Recordings through Web Audio ----
let ctx // undefined: not tried yet; null: not available here
const decoded = new Map() // recording file to its decoded sound, or to the promise of it; least recently used first
let sounding = null // the source now playing, with its gain

// The ring switch silences Web Audio on an iPhone unless the page can ask for the playback session (main.jsx,
// navigator.audioSession, iOS 16.4 on); an older iPhone keeps to audio elements, which the switch leaves alone.
function webAudioFits() {
  const Ctor = window.AudioContext ?? window.webkitAudioContext
  if (!Ctor || typeof fetch !== 'function') return false
  const nav = window.navigator ?? {}
  const apple = /iP(hone|ad|od)/.test(nav.userAgent ?? '') || (/Mac/.test(nav.userAgent ?? '') && nav.maxTouchPoints > 1)
  return !apple || Boolean(nav.audioSession)
}
function context() {
  if (ctx === undefined) {
    try { ctx = webAudioFits() ? new (window.AudioContext ?? window.webkitAudioContext)() : null } catch { ctx = null }
  }
  return ctx
}
function decode(file) {
  const c = context()
  if (!c) return
  if (decoded.has(file)) { const kept = decoded.get(file); decoded.delete(file); decoded.set(file, kept); return }
  const coming = fetch(file)
    .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.arrayBuffer() })
    .then((bytes) => new Promise((resolve, reject) => { c.decodeAudioData(bytes, resolve, reject) }))
    .then((sound) => { if (decoded.get(file) === coming) decoded.set(file, sound) })
    .catch(() => { if (decoded.get(file) === coming) decoded.delete(file) })
  decoded.set(file, coming)
  while (decoded.size > MAX_DECODED) decoded.delete(decoded.keys().next().value)
}
const readySound = (file) => { const s = decoded.get(file); return s && typeof s.then !== 'function' ? s : null }
function startSound(sound, key = null, mine = job) {
  const source = ctx.createBufferSource()
  const gain = ctx.createGain()
  source.buffer = sound
  source.connect(gain)
  gain.connect(ctx.destination)
  source.onended = () => { if (sounding?.source === source) sounding = null; if (mine === job) setNow(null) }
  source.start()
  sounding = { source, gain }
  setNow(key)
}
function stopSound() {
  if (!sounding) return
  const { source, gain } = sounding
  sounding = null
  source.onended = null
  // A few milliseconds of fade, so a sound cut short doesn't click.
  try { gain.gain.setTargetAtTime(0, ctx.currentTime, 0.004); source.stop(ctx.currentTime + 0.02) } catch { try { source.stop() } catch { /* already over */ } }
}

// ---- Recordings through audio elements: the fallback, and slow playback ----
const players = new Map() // recording file to its player, the one used longest ago first
const spare = [] // players made ready by the first tap, not yet given a recording
let made = 0 // recording players made; never more than REC_PLAYERS
function newPlayer() {
  made++
  const el = new Audio()
  el.preload = 'auto'
  return el
}
function playerFor(file) {
  let el = players.get(file)
  if (el) players.delete(file) // set again below, as the most recently used
  else {
    if (spare.length) el = spare.pop()
    else if (made < REC_PLAYERS) el = newPlayer()
    else {
      const [oldest, player] = players.entries().next().value
      players.delete(oldest)
      el = player
      el.pause()
    }
    el.src = file
    el.load?.() // iOS doesn't always follow a changed src by itself
  }
  players.set(file, el)
  return el
}

// ---- The first tap ----
// iOS wants sound to start from a tap. The first tap or key anywhere starts the Web Audio context (with one silent
// sample) and makes the audio players inside it; any later tap wakes the context again if iOS has put it to sleep (a
// call, another app). The device voice needs no such step: nothing is ever spoken before a first tap, and a silent
// sentence to "unlock" it could leave Safari's voice busy.
let unlocked = false
export function unlock() {
  const c = context()
  if (c && c.state !== 'running') c.resume?.()?.catch?.(() => {})
  if (unlocked) return
  unlocked = true
  if (c) {
    try {
      const silent = c.createBufferSource()
      silent.buffer = c.createBuffer(1, 1, 22050)
      silent.connect(c.destination)
      silent.start()
    } catch { /* the context will start with the first real sound */ }
  }
  while (made < REC_PLAYERS) spare.push(newPlayer())
  for (const el of [...spare, ...players.values()]) if (el.paused) el.load?.()
  cuePlayers()
}
if (typeof document !== 'undefined') for (const type of ['touchend', 'pointerup', 'click', 'keydown']) document.addEventListener(type, unlock, true)

// ---- Interface sounds (Dan, 2026-11-15; picked in the Sound Lab, /lab/sounds) ----
// Six soft sounds, nothing licensed: start (tapping a circle to begin its lesson), button (Continue, Next Lesson),
// match (a pair matched), slot (a word chip landing in the answer), correct and incorrect (on Check).
// They are files played through audio elements (2026-11-15). They used to be made live in Web Audio, and on a real
// iPhone (iPhone 11, iOS 27.2, Home Screen web app) none was ever heard while the lesson's voice played fine, after
// one round of fixes to the live path. So each recipe (cue-recipes.js) is rendered once to public/sounds/<name>.wav
// (scripts/render-cues.mjs, at the level the live bus had) and played by an audio element, the path that phone plays.
//   - Each sound keeps one element of its own, loaded by the first tap, so it starts at once and restarts cleanly.
//     The six count toward MAX_PLAYERS; recordings share the rest (REC_PLAYERS).
//   - One is skipped while a recording or the device voice is going (languagePlaying), and any course sound that
//     starts cuts them off at once (play, speakLine, speakAll and playOutside call hushCues), so none sits over the
//     language; stop() leaves them, since it runs on every question change.
//   - The Sounds setting turns them all off (setCues, from App), and nothing else does. Reduce Motion is about
//     animation only (Dan, 2026-11-15): it used to mute them too, which on a device with Reduce Motion on looked
//     exactly like broken sound.
//   - The ring switch: with the page in the playback session (main.jsx, iOS 16.4 on) they are heard on silent like
//     the lesson; on an older iPhone the switch silences audio elements' sounds as it does any page's.
export const CUE_NAMES = ['start', 'button', 'match', 'slot', 'correct', 'incorrect']
export const cueFile = (name) => `/sounds/${name}.wav`
const REC_PLAYERS = MAX_PLAYERS - CUE_NAMES.length
let cuesOn = true
export const setCues = (on) => { cuesOn = Boolean(on) }
let cueEls = null // name to its audio element, made by the first tap (or the first sound)
let cueError = null // the last thing that went wrong, for the Developer page
const noteCueError = (name, e) => { cueError = { cue: name, error: [e?.name, e?.message].filter(Boolean).join(': ') || String(e), at: Date.now() } }
function cuePlayers() {
  if (cueEls) return cueEls
  if (typeof Audio === 'undefined') { noteCueError('all', { name: 'NoAudioElement', message: 'this browser has no Audio' }); return null }
  cueEls = new Map()
  for (const name of CUE_NAMES) {
    try {
      const el = new Audio()
      el.preload = 'auto'
      el.src = cueFile(name)
      el.addEventListener?.('error', () => noteCueError(name, { name: 'MediaError', message: `code ${el.error?.code ?? '?'} ${el.error?.message ?? ''}`.trim() }))
      el.load?.()
      cueEls.set(name, el)
    } catch (e) { noteCueError(name, e) }
  }
  return cueEls
}
// Answer sounds (Dan, 2026-11-15): the correct and incorrect sounds play the instant Check is pressed and the voice reads
// the sentence at its usual moment over their tail; the language starting doesn't cut them off (they're short), nor
// does a sound still playing hold them back. ANSWER_CUES names them; answerUntil is when the current one is done.
export const ANSWER_CUES = new Set(['correct', 'incorrect'])
const ANSWER_CUE_MS = 450
let answerUntil = 0
function hushCues(language = true, but = null) {
  if (!cueEls) return
  if (language && Date.now() < answerUntil) return
  for (const el of cueEls.values()) if (el !== but && !el.paused) el.pause()
}
let lastCue = null
let cuePlays = 0 // sounds an element has reported as really playing
export const lastCueName = () => lastCue
if (typeof window !== 'undefined' && window.__tamagoAudio) window.__tamagoAudio.lastCue = lastCueName // for the browser checks
// Is the language being heard? For the interface sounds only. Safari's own "speaking" flag is not enough on an iPhone:
// it can stay true after a sentence has ended, which silenced every interface sound from then on (iPhone 11,
// 2026-11-15, while lesson audio played fine). The voice counts as busy only while Safari says so AND a sentence of
// ours is still out (`live`), so one stuck flag can't mute them and one lost end report can't either.
function languagePlaying() {
  if (sounding || [...players.values(), ...outside].some((el) => !el.paused && !el.ended)) return true
  return Boolean(typeof window !== 'undefined' && window.speechSynthesis?.speaking) && live.size > 0
}
// The state of the page's Web Audio (recordings only now), for the Developer page.
export const audioState = () => ctx?.state ?? (ctx === null ? 'none' : 'not started')
// The interface sounds' state, for the Developer page: no real phone is at hand when these are changed, so the page
// says what the sound system did. ready: files loaded far enough to play; heard: plays an element reported as playing.
export function cueStatus() {
  const els = cueEls ? [...cueEls.values()] : []
  return {
    on: cuesOn, players: els.length, ready: els.filter((el) => el.readyState >= 2).length,
    session: (typeof navigator !== 'undefined' && navigator.audioSession?.type) || 'none',
    last: lastCue, heard: cuePlays, error: cueError,
  }
}
export function cue(name) {
  const answerCue = ANSWER_CUES.has(name)
  if (!cuesOn || !CUE_NAMES.includes(name) || (!answerCue && languagePlaying())) return false
  const el = cuePlayers()?.get(name)
  if (!el) return false
  hushCues(false, el) // one interface sound at a time
  answerUntil = answerCue ? Date.now() + ANSWER_CUE_MS : 0
  lastCue = name
  try {
    try { el.currentTime = 0 } catch { /* not loaded yet: it starts at the beginning anyway */ }
    if (!el.counted) { el.counted = true; el.addEventListener?.('playing', () => { cuePlays++ }) }
    // AbortError: a newer sound or the language took over, which is how it should end.
    el.play()?.catch?.((e) => { if (e?.name !== 'AbortError') noteCueError(name, e) })
    return true
  } catch (e) { noteCueError(name, e); return false }
}

// The recordings a question (or any content) refers to: every `file` under it, each once, in order.
export function filesIn(value, found = []) {
  if (!value || typeof value !== 'object') return found
  for (const [key, v] of Object.entries(value)) {
    if (key === 'file') { if (typeof v === 'string' && v && !found.includes(v)) found.push(v) } else filesIn(v, found)
  }
  return found
}

// Gets the next recordings ready, the first in the list first: decoded where Web Audio is used, else in the audio
// players. Only a few: never a whole course.
export function preload(files) {
  const wanted = [...new Set(files)].filter(Boolean)
  if (context()) { for (const f of wanted.slice(0, MAX_DECODED).reverse()) decode(f); return }
  for (const f of wanted.slice(0, REC_PLAYERS).reverse()) playerFor(f) // the first ends up the most recently used, so it's taken over last
}

// ---- The device voice ----
// iOS Safari fills the voice list late and may never fire voiceschanged, so ask every time. The course's voice:
// for Spanish a Latin American one (es-MX, es-US, es-419) before any other Spanish voice.
// Clearer voices (Dan, 2026-11-15, all courses): within the course's first region that has any voice, the best the
// device has: Premium, then Enhanced (Apple's downloadable voices), then Natural or Neural (Microsoft's), then any
// voice on the device, then the rest. The pick is remembered per language (localStorage tamago-voice:<lang>) and kept
// while the device still has it, so the voice doesn't change between visits when the list's order does.
const QUALITY = [[/premium/i, 5], [/enhanced|erweitert|amélioré|mejorad|migliorat|aprimorad/i, 4], [/natural|neural/i, 3]]
export const voiceQuality = (v) => {
  const text = `${v.name} ${v.voiceURI}`
  for (const [re, n] of QUALITY) if (re.test(text)) return n
  return v.localService ? 2 : 1
}
const pickKey = () => `tamago-voice:${course.id}`
const remembered = () => { try { return localStorage.getItem(pickKey()) } catch { return null } }
const remember = (uri) => { try { localStorage.setItem(pickKey(), uri) } catch { /* private mode: pick again next time */ } }
function frenchVoice() {
  const voices = window.speechSynthesis?.getVoices() ?? []
  if (voices.length === 0) return null
  const tag = (v) => v.lang?.replace('_', '-')
  for (const want of course.voice) {
    const fits = voices.filter((v) => (want.includes('-') ? tag(v) === want : tag(v)?.toLowerCase().startsWith(want)))
    if (fits.length === 0) continue
    const kept = remembered()
    const best = [...fits].sort((a, b) => voiceQuality(b) - voiceQuality(a))[0]
    // A remembered voice stands unless a better one has arrived since (an Enhanced voice downloaded later).
    const mine = fits.find((v) => v.voiceURI === kept)
    if (mine && voiceQuality(mine) >= voiceQuality(best)) return mine
    remember(best.voiceURI)
    return best
  }
  return null
}

// The name of the device voice the course speaks with, or null (the Voice Lab and the speaker's picture use it).
export const courseVoiceName = () => frenchVoice()?.name ?? null
// The voice in use and its grade, for the Developer page.
const GRADE = { 5: 'Premium', 4: 'Enhanced', 3: 'Natural', 2: 'Basic, on the device', 1: 'Basic, online' }
export function courseVoiceInfo() {
  const v = frenchVoice()
  return v ? { name: v.name, lang: v.lang, grade: GRADE[voiceQuality(v)] } : null
}

// False only when the device lists its voices and none is French. An empty list just means "not loaded yet".
export function hasFrenchVoice() {
  if (!('speechSynthesis' in window)) return false
  return speechSynthesis.getVoices().length === 0 || frenchVoice() !== null
}

// The sentences handed to the voice that haven't reported their end. The page keeps its own account, because the
// voice's flags can't be trusted to say when a cancel is needed. After a cancel only the sentence that was being
// spoken still has to report (Safari clears the queued ones without a word); until it does, anything spoken would be
// lost when its cancel lands.
const live = new Set()
let cancelledAt = -Infinity
function voiceFree() {
  const synth = window.speechSynthesis
  if (live.size === 0 && !synth.speaking) return true
  if (Date.now() - cancelledAt < CANCEL_LIMIT) return false
  live.clear() // a cancel that never reported: taken as done
  return true
}
// Runs fn as soon as the voice is free: at once if it is, else when the cancelled sentence has reported, looked at
// every few milliseconds. Only the newest caller is kept waiting.
let waiting = null
function whenVoiceFree(mine, fn) {
  if (voiceFree()) { fn(); return }
  waiting = fn
  const check = () => {
    if (waiting !== fn) return
    if (mine !== job) { waiting = null; return }
    if (voiceFree()) { waiting = null; fn(); return }
    setTimeout(check, 8)
  }
  setTimeout(check, 0)
}
function hush() {
  const synth = window.speechSynthesis
  waiting = null
  // Cancel only when something is still out: Safari can lose the next sentence after a needless cancel. "Out" is a
  // sentence of ours, or the voice saying it is still speaking: a sentence the page lost track of kept playing into
  // the next question (Dan, 2026-11-12).
  if (!synth || (live.size === 0 && !synth.speaking && !synth.pending)) return
  const speaking = [...live].find((u) => u.started) ?? live.values().next().value
  synth.cancel() // some browsers report the end inside this call, others a moment later
  cancelledAt = Date.now()
  const reported = !speaking || !live.has(speaking)
  live.clear()
  if (!reported) live.add(speaking)
}

// One sentence in the device voice. If it hasn't started, hasn't ended and the voice sits idle after DROPPED_AFTER,
// Safari dropped it: say it again, up to RETRIES times. A sentence the voice is busy with is never said twice.
function say(mine, text, rate, onEnd, attempt = 0) {
  const synth = window.speechSynthesis
  const u = new SpeechSynthesisUtterance(text)
  const voice = frenchVoice()
  if (voice) u.voice = voice
  u.lang = voice?.lang ?? course.voice[0]
  u.rate = rate
  let heard = false // started, ended or failed: the voice took it
  u.onstart = () => { heard = true; u.started = true }
  u.onend = () => { heard = true; live.delete(u); onEnd?.() }
  u.onerror = () => { heard = true; live.delete(u); onEnd?.() }
  live.add(u) // also keeps it from being collected mid-sentence
  synth.speak(u)
  setTimeout(() => {
    if (heard || synth.speaking || synth.pending || !live.has(u)) return
    live.delete(u) // dropped
    if (mine === job && attempt < RETRIES) say(mine, text, rate, onEnd, attempt + 1)
  }, DROPPED_AFTER)
}

// Slow (Dan, 2026-11-12: "Slow sounds the same as normal speed"): some device voices barely change with the rate, so
// slow also puts a short pause between words (a comma the voice honours), and the rate drops further.
export const SLOW_RATE = 0.45
export const RECORDING_SLOW = 0.6
export const slowText = (text) => String(text).replace(/([^\s,;:.!?¿¡])\s+(?=[^\s,;:.!?»“”„])/gu, '$1, ')
function speak(audio, slow, mine = job) {
  if (!('speechSynthesis' in window) || !audio.french) return
  setNow(audioKey(audio))
  whenVoiceFree(mine, () => say(mine, slow ? slowText(audio.french) : audio.french, slow ? SLOW_RATE : 0.9, () => { if (mine === job) setNow(null) }))
}

// ---- Playing ----
// Stops every sound: recordings, the device voice, and outside sounds such as the learner's own recording. A new
// question always calls it (Lesson.jsx), so nothing plays on into the next one (Dan, 2026-11-12).
export function stop() {
  job++
  hush()
  stopSound()
  for (const el of players.values()) el.pause()
  for (const el of outside) el.pause()
  setNow(null)
}

export function play(audio, { slow = false } = {}) {
  stop()
  hushCues() // the language starts: an interface sound never sits over it
  const mine = job
  if (!audio.file) { speak(audio, slow, mine); return }
  const c = context()
  if (c && c.state !== 'running') c.resume?.()?.catch?.(() => {})
  if (c && !slow) {
    const sound = readySound(audio.file)
    if (sound && c.state === 'running') { startSound(sound, audioKey(audio), mine); return }
    decode(audio.file) // ready for the next tap
  }
  const el = playerFor(audio.file)
  try { el.currentTime = 0 } catch { /* not loaded yet: it starts at the beginning anyway */ }
  el.playbackRate = slow ? RECORDING_SLOW : 1
  el.onended = () => { if (mine === job) setNow(null) }
  setNow(audioKey(audio))
  // A recording this browser can't or won't play falls back to the device voice rather than silence.
  let fellBack = false
  const fallBack = () => {
    if (fellBack || mine !== job) return
    fellBack = true
    el.pause()
    speak(audio, slow, mine)
  }
  const playing = el.play()
  playing?.catch?.((e) => { if (e?.name !== 'AbortError') fallBack() }) // AbortError: something newer took over
  setTimeout(() => { if (!el.currentTime && !el.ended) fallBack() }, STALLED_AFTER)
}

// Several French lines in a row (QT20 listening): the device voice queues them; onEnd fires after the last.
export function speakAll(lines, { slow = false, onEnd } = {}) {
  stop()
  hushCues()
  if (!('speechSynthesis' in window) || !lines.length) { onEnd?.(); return }
  whenVoiceFree(job, () => {
    const voice = frenchVoice()
    lines.forEach((text, i) => {
      const u = new SpeechSynthesisUtterance(text)
      if (voice) u.voice = voice
      u.lang = voice?.lang ?? course.voice[0]
      u.rate = slow ? 0.55 : 0.9
      u.onstart = () => { u.started = true }
      u.onend = () => { live.delete(u); if (i === lines.length - 1) onEnd?.() }
      u.onerror = () => { live.delete(u) }
      live.add(u)
      speechSynthesis.speak(u)
    })
  })
}

// One line of a conversation (2026-11-10) at a chosen rate (slow, normal, natural); onEnd when it's spoken.
// key (Conversation v2, 2026-11-15): marks the line as playing under that key, so its speaker icon animates.
export function speakLine(text, rate = 0.85, onEnd, key = null) {
  stop()
  hushCues()
  if (!('speechSynthesis' in window) || !text) { onEnd?.(); return }
  const mine = job
  if (key) setNow(key)
  whenVoiceFree(mine, () => say(mine, text, rate, () => { if (key && mine === job) setNow(null); onEnd?.() }))
}
