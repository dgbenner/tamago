// Native recording when there is one, browser speech otherwise. No network either way once installed.
const elements = new Map()
let utterance = null // held so the browser doesn't drop it mid-sentence

// iOS Safari fills the voice list late and may never fire voiceschanged, so ask every time.
function frenchVoice() {
  const voices = window.speechSynthesis?.getVoices() ?? []
  return voices.find((v) => v.lang?.replace('_', '-') === 'fr-FR' && v.localService)
    ?? voices.find((v) => v.lang?.toLowerCase().startsWith('fr')) ?? null
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
    el.play().catch(() => {})
    return
  }
  if (!('speechSynthesis' in window)) return
  utterance = new SpeechSynthesisUtterance(audio.french)
  const voice = frenchVoice()
  if (voice) utterance.voice = voice
  utterance.lang = voice?.lang ?? 'fr-FR'
  utterance.rate = slow ? 0.55 : 0.9
  speechSynthesis.speak(utterance)
}
