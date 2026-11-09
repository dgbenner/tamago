import { useEffect, useRef, useState } from 'react'

// Records the learner for speak-and-compare. Nothing leaves the device, and nothing is kept after the question.
// state: idle, recording, done, unavailable (no microphone or permission refused).
export function useRecorder() {
  const [state, setState] = useState(typeof MediaRecorder === 'undefined' || !navigator.mediaDevices?.getUserMedia ? 'unavailable' : 'idle')
  const [url, setUrl] = useState(null)
  const rec = useRef(null)
  const audio = useRef(null)

  useEffect(() => () => {
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
        setUrl(URL.createObjectURL(new Blob(chunks, { type: r.mimeType })))
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
  return { state, start, stop, playBack }
}
