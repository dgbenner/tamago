// Native recording when there is one, browser speech otherwise. No network either way once installed.
// A few audio players, reused (2026-11-11). Safari, and so every iOS browser, slows down steeply with the number of
// audio elements a page holds: one per recording (441 for French) froze lessons on iPhone and iPad. So the page never
// makes more than MAX_PLAYERS; a recording that needs one takes over the player that was used longest ago.
//
// Playing reliably on iPhone and iPad (2026-11-11). Most sentences have no recording and use the device voice, and
// Safari drops a sentence without a word if it is spoken straight after a cancel: a replay while the voice was still
// speaking, or a new question arriving over the last answer. So after a cancel the voice waits a moment (CANCEL_GAP),
// and a sentence that hasn't started is said again. iOS also wants sound to start from a tap: the first tap anywhere
// makes the players and the voice ready (unlock), so a later sentence may start by itself. A recording that makes no
// sound falls back to the device voice instead of silence.
export const MAX_PLAYERS = 12
export const CANCEL_GAP = 150 // ms between a cancel and the next sentence
export const SILENT_AFTER = 900 // ms with no start before a sentence is said again
export const STALLED_AFTER = 2500 // ms with no sound before a recording gives way to the device voice
const RETRIES = 2
const players = new Map() // recording file to its player, the one used longest ago first
const spare = [] // players made ready by the first tap, not yet given a recording
let made = 0
let utterance = null // held so the browser doesn't drop it mid-sentence
let job = 0 // every play and every stop starts a new job; what an older one left waiting does nothing
let lastCancel = -Infinity

import { course } from './course.js'

// iOS Safari fills the voice list late and may never fire voiceschanged, so ask every time. The course's voice:
// for Spanish a Latin American one (es-MX, es-US, es-419) before any other Spanish voice.
function frenchVoice() {
  const voices = window.speechSynthesis?.getVoices() ?? []
  const tag = (v) => v.lang?.replace('_', '-')
  for (const want of course.voice) {
    const local = voices.find((v) => (want.includes('-') ? tag(v) === want : tag(v)?.toLowerCase().startsWith(want)) && v.localService)
    const any = voices.find((v) => (want.includes('-') ? tag(v) === want : tag(v)?.toLowerCase().startsWith(want)))
    if (local ?? any) return local ?? any
  }
  return null
}

// False only when the device lists its voices and none is French. An empty list just means "not loaded yet".
export function hasFrenchVoice() {
  if (!('speechSynthesis' in window)) return false
  return speechSynthesis.getVoices().length === 0 || frenchVoice() !== null
}

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
    else if (made < MAX_PLAYERS) el = newPlayer()
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

// The first tap or key anywhere: every player is made inside it, and the voice says nothing once, which is what iOS
// asks before sound may start without a tap of its own.
let unlocked = false
const UNLOCK_EVENTS = ['touchend', 'pointerup', 'click', 'keydown']
export function unlock() {
  if (unlocked) return
  unlocked = true
  if (typeof document !== 'undefined') for (const type of UNLOCK_EVENTS) document.removeEventListener(type, unlock, true)
  while (made < MAX_PLAYERS) spare.push(newPlayer())
  for (const el of [...spare, ...players.values()]) if (el.paused) el.load?.()
  const synth = window.speechSynthesis
  if (synth && !synth.speaking && !synth.pending) {
    const quiet = new SpeechSynthesisUtterance(' ')
    quiet.volume = 0
    synth.speak(quiet)
  }
}
if (typeof document !== 'undefined') for (const type of UNLOCK_EVENTS) document.addEventListener(type, unlock, true)

// The recordings a question (or any content) refers to: every `file` under it, each once, in order.
export function filesIn(value, found = []) {
  if (!value || typeof value !== 'object') return found
  for (const [key, v] of Object.entries(value)) {
    if (key === 'file') { if (typeof v === 'string' && v && !found.includes(v)) found.push(v) } else filesIn(v, found)
  }
  return found
}

// Gets the next recordings ready, the first in the list first. Only as many as there are players: never a whole course.
export function preload(files) {
  const wanted = [...new Set(files)].filter(Boolean).slice(0, MAX_PLAYERS)
  for (const f of wanted.reverse()) playerFor(f) // the first ends up the most recently used, so it's taken over last
}

export function stop() {
  job++
  const synth = window.speechSynthesis
  // Safari can swallow a sentence spoken right after a cancel, needed or not: cancel only when there is something to
  // cancel, and remember when, so the next sentence waits.
  if (synth?.speaking || synth?.pending) { synth.cancel(); lastCancel = Date.now() }
  for (const el of players.values()) el.pause()
}

// Runs fn now, or once Safari has had CANCEL_GAP since the last cancel; never if another job has started meanwhile.
function afterCancel(mine, fn) {
  const wait = lastCancel + CANCEL_GAP - Date.now()
  if (wait > 0) setTimeout(() => { if (mine === job) fn() }, wait)
  else fn()
}

// One sentence in the device voice. If it hasn't started after SILENT_AFTER and the voice isn't busy with it, Safari
// dropped it: say it again, up to RETRIES times.
function say(mine, text, rate, onEnd, attempt = 0) {
  const synth = window.speechSynthesis
  const u = new SpeechSynthesisUtterance(text)
  const voice = frenchVoice()
  if (voice) u.voice = voice
  u.lang = voice?.lang ?? course.voice[0]
  u.rate = rate
  let started = false
  u.onstart = () => { started = true }
  u.onend = () => { started = true; onEnd?.() }
  u.onerror = () => { started = true }
  utterance = u
  synth.speak(u)
  if (attempt >= RETRIES) return
  const again = () => say(mine, text, rate, onEnd, attempt + 1)
  setTimeout(() => {
    if (mine !== job || started) return
    if (!synth.speaking && !synth.pending) { again(); return } // dropped
    // Busy, yet nothing has started: give it until STALLED_AFTER, then clear the voice and say it again.
    setTimeout(() => {
      if (mine !== job || started) return
      synth.cancel()
      lastCancel = Date.now()
      afterCancel(mine, again)
    }, STALLED_AFTER - SILENT_AFTER)
  }, SILENT_AFTER)
}

export function play(audio, { slow = false } = {}) {
  stop()
  const mine = job
  if (!audio.file) { speak(audio, slow, mine); return }
  const el = playerFor(audio.file)
  try { el.currentTime = 0 } catch { /* not loaded yet: it starts at the beginning anyway */ }
  el.playbackRate = slow ? 0.7 : 1
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

function speak(audio, slow, mine = job) {
  if (!('speechSynthesis' in window) || !audio.french) return
  afterCancel(mine, () => say(mine, audio.french, slow ? 0.55 : 0.9))
}

// Several French lines in a row (QT20 listening): the device voice queues them; onEnd fires after the last.
export function speakAll(lines, { slow = false, onEnd } = {}) {
  stop()
  if (!('speechSynthesis' in window) || !lines.length) { onEnd?.(); return }
  afterCancel(job, () => {
    const voice = frenchVoice()
    lines.forEach((text, i) => {
      const u = new SpeechSynthesisUtterance(text)
      if (voice) u.voice = voice
      u.lang = voice?.lang ?? course.voice[0]
      u.rate = slow ? 0.55 : 0.9
      if (i === lines.length - 1 && onEnd) u.onend = onEnd
      speechSynthesis.speak(u)
    })
  })
}

// One line of a conversation (2026-11-10) at a chosen rate (slow, normal, natural); onEnd when it's spoken.
export function speakLine(text, rate = 0.85, onEnd) {
  stop()
  if (!('speechSynthesis' in window) || !text) { onEnd?.(); return }
  const mine = job
  afterCancel(mine, () => say(mine, text, rate, onEnd))
}
