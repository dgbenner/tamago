// Native recording when there is one, browser speech otherwise. No network either way once installed.
const elements = new Map()
let frenchVoice = null

function findVoice() {
  if (!('speechSynthesis' in window)) return
  const voices = speechSynthesis.getVoices()
  frenchVoice = voices.find((v) => v.lang === 'fr-FR' && v.localService) ?? voices.find((v) => v.lang?.startsWith('fr')) ?? null
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  findVoice()
  speechSynthesis.addEventListener?.('voiceschanged', findVoice)
}

export const hasFrenchVoice = () => frenchVoice !== null

export function preload(files) {
  for (const f of files) {
    if (elements.has(f)) continue
    const el = new Audio(f)
    el.preload = 'auto'
    elements.set(f, el)
  }
}

export function stop() {
  if ('speechSynthesis' in window) speechSynthesis.cancel()
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
  if (!frenchVoice) return
  const u = new SpeechSynthesisUtterance(audio.french)
  u.voice = frenchVoice
  u.lang = frenchVoice.lang
  u.rate = slow ? 0.55 : 0.9
  speechSynthesis.speak(u)
}
