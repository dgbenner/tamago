import { useEffect, useRef, useState } from 'react'

// Records the learner for speak-and-compare (nothing leaves the device, nothing is kept after the question), and the
// native speaker in the native-speaker check, which keeps the recording (blob).
// state: idle, recording, done, unavailable (no microphone or permission refused).
export function useRecorder() {
  const [state, setState] = useState(typeof MediaRecorder === 'undefined' || !navigator.mediaDevices?.getUserMedia ? 'unavailable' : 'idle')
  const [url, setUrl] = useState(null)
  const [blob, setBlob] = useState(null)
  const rec = useRef(null)
  const audio = useRef(null)

  useEffect(() => () => {
    audio.current?.pause() // "Yours" never plays on into the next question (Dan, 2026-11-12)
    rec.current?.stream?.getTracks().forEach((t) => t.stop())
    if (url) URL.revokeObjectURL(url)
  }, [url])

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const r = new MediaRecorder(stream)
      const chunks = []
      r.ondataavailable = (e) => chunks.push(e.data)
      r.onstop = () => {
        stream.getTracks().forEach((t) => t.stop())
        const b = new Blob(chunks, { type: r.mimeType || chunks[0]?.type || 'audio/webm' })
        setBlob(b)
        setUrl(URL.createObjectURL(b))
        setState('done')
      }
      r.start()
      rec.current = r
      setState('recording')
    } catch {
      setState('unavailable')
    }
  }
  const stop = () => rec.current?.state === 'recording' && rec.current.stop()
  const playBack = () => {
    if (!url) return
    audio.current ??= new Audio()
    audio.current.src = url
    audio.current.play().catch(() => {})
  }
  const reset = () => { setBlob(null); setUrl(null); setState((s) => (s === 'unavailable' ? s : 'idle')) }
  return { state, start, stop, playBack, blob, reset }
}
