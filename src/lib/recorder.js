import { useEffect, useRef, useState } from 'react'
import { playOutside, stop as stopSound } from './audio.js'
import { closeMic, openMic } from './mic.js'

// Records the learner for speak-and-compare (nothing leaves the device, nothing is kept after the question), and the
// native speaker in the native-speaker check, which keeps the recording (blob).
// state: idle, recording, done, unavailable (no microphone or permission refused).
export function useRecorder() {
  const [state, setState] = useState(typeof MediaRecorder === 'undefined' || !navigator.mediaDevices?.getUserMedia ? 'unavailable' : 'idle')
  const [url, setUrl] = useState(null)
  const [blob, setBlob] = useState(null)
  const [error, setError] = useState(null) // why the microphone was refused (its error's name), for the Developer line
  const rec = useRef(null)
  const audio = useRef(null)

  // Leaving the question stops everything (Dan, 2026-11-12): the playback of "Yours", and a recording in progress.
  useEffect(() => () => { stopRecorder(); audio.current?.pause() }, [])
  useEffect(() => () => { if (url) URL.revokeObjectURL(url) }, [url])
  function stopRecorder() {
    const r = rec.current
    if (r?.state === 'recording') { r.onstop = null; try { r.stop() } catch { /* already stopped */ } }
    r?.stream?.getTracks().forEach((t) => t.stop())
    closeMic()
  }

  const begin = async () => {
    try {
      const stream = await openMic() // asked inside the tap, in the audio session that allows it (mic.js)
      const r = new MediaRecorder(stream)
      const chunks = []
      r.ondataavailable = (e) => chunks.push(e.data)
      r.onstop = () => {
        stream.getTracks().forEach((t) => t.stop())
        closeMic()
        const b = new Blob(chunks, { type: r.mimeType || chunks[0]?.type || 'audio/webm' })
        setBlob(b)
        setUrl(URL.createObjectURL(b))
        setState('done')
      }
      r.start()
      rec.current = r
      setState('recording')
    } catch (e) {
      closeMic()
      setError(e?.name || String(e?.message ?? e))
      setState('unavailable')
    }
  }
  const stop = () => rec.current?.state === 'recording' && rec.current.stop()
  // Through audio.js, so a new question (stop) ends it and the Yours speaker shows it playing.
  const playBack = () => {
    if (!url) return
    audio.current ??= new Audio()
    audio.current.src = url
    playOutside(audio.current, `yours:${url}`)
  }
  const start = async () => {
    stopSound() // the model or an earlier playback never records over itself
    return begin()
  }
  const reset = () => { setBlob(null); setUrl(null); setState((s) => (s === 'unavailable' ? s : 'idle')) }
  return { state, error, start, stop, playBack, blob, reset, key: url ? `yours:${url}` : null }
}
