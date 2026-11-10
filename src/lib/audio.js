// Native recording when there is one, browser speech otherwise. No network either way once installed.
const elements = new Map()
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

export function preload(files) {
  for (const f of files) {
    if (elements.has(f)) continue
    const el = new Audio(f)
    el.preload = 'auto'
    elements.set(f, el)
  }
}

export function stop() {
  // Safari can swallow a sentence spoken right after a needless cancel.
  if (window.speechSynthesis?.speaking || window.speechSynthesis?.pending) speechSynthesis.cancel()
  for (const el of elements.values()) el.pause()
}

export function play(audio, { slow = false } = {}) {
  stop()
  if (audio.file) {
    const el = elements.get(audio.file) ?? new Audio(audio.file)
    elements.set(audio.file, el)
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
