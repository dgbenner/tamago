// Native recording when there is one, browser speech otherwise. No network either way once installed.
// A few audio players, reused (2026-11-11). Safari, and so every iOS browser, slows down steeply with the number of
// audio elements a page holds: one per recording (441 for French) froze lessons on iPhone and iPad. So the page never
// makes more than MAX_PLAYERS; a recording that needs one takes over the player that was used longest ago.
export const MAX_PLAYERS = 12
const players = new Map() // recording file to its player, the one used longest ago first
let utterance = null // held so the browser doesn't drop it mid-sentence

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

function playerFor(file) {
  let el = players.get(file)
  if (el) players.delete(file) // set again below, as the most recently used
  else if (players.size < MAX_PLAYERS) {
    el = new Audio()
    el.preload = 'auto'
    el.src = file
  } else {
    const [oldest, player] = players.entries().next().value
    players.delete(oldest)
    el = player
    el.pause()
    el.src = file
  }
  players.set(file, el)
  return el
}

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
  // Safari can swallow a sentence spoken right after a needless cancel.
  if (window.speechSynthesis?.speaking || window.speechSynthesis?.pending) speechSynthesis.cancel()
  for (const el of players.values()) el.pause()
}

export function play(audio, { slow = false } = {}) {
  stop()
  if (audio.file) {
    const el = playerFor(audio.file)
    el.currentTime = 0
    el.playbackRate = slow ? 0.7 : 1
    // A recording this browser can't play falls back to the device voice rather than silence.
    el.play().catch((e) => { if (e?.name === 'NotSupportedError') speak(audio, slow) })
    return
  }
  speak(audio, slow)
}

function speak(audio, slow) {
  if (!('speechSynthesis' in window)) return
  utterance = new SpeechSynthesisUtterance(audio.french)
  const voice = frenchVoice()
  if (voice) utterance.voice = voice
  utterance.lang = voice?.lang ?? course.voice[0]
  utterance.rate = slow ? 0.55 : 0.9
  speechSynthesis.speak(utterance)
}

// Several French lines in a row (QT20 listening): the device voice queues them; onEnd fires after the last.
export function speakAll(lines, { slow = false, onEnd } = {}) {
  stop()
  if (!('speechSynthesis' in window) || !lines.length) { onEnd?.(); return }
  const voice = frenchVoice()
  lines.forEach((text, i) => {
    const u = new SpeechSynthesisUtterance(text)
    if (voice) u.voice = voice
    u.lang = voice?.lang ?? course.voice[0]
    u.rate = slow ? 0.55 : 0.9
    if (i === lines.length - 1 && onEnd) u.onend = onEnd
    speechSynthesis.speak(u)
  })
}

// One line of a conversation (2026-11-10) at a chosen rate (slow, normal, natural); onEnd when it's spoken.
export function speakLine(text, rate = 0.85, onEnd) {
  stop()
  if (!('speechSynthesis' in window) || !text) { onEnd?.(); return }
  utterance = new SpeechSynthesisUtterance(text)
  const voice = frenchVoice()
  if (voice) utterance.voice = voice
  utterance.lang = voice?.lang ?? course.voice[0]
  utterance.rate = rate
  if (onEnd) utterance.onend = onEnd
  speechSynthesis.speak(utterance)
}
