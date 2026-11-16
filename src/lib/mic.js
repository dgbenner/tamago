// The microphone (2026-11-15, iPhone): main.jsx puts the page in the "playback" audio session so lessons are heard
// with the ring switch on silent, and in that session Safari refuses the microphone outright, with no prompt:
// Speak and Compare said "Recording isn't available" on every iPhone. Recording needs "play-and-record" for as long
// as the microphone is open; the page goes back to "playback" after, so sound returns to full volume on the speaker.
// The request must run inside the tap: nothing is awaited before getUserMedia is called.
export async function openMic(nav = navigator) {
  const session = nav.audioSession
  if (session && session.type !== 'play-and-record') { try { session.type = 'play-and-record' } catch { /* the request below reports it */ } }
  try {
    return await nav.mediaDevices.getUserMedia({ audio: true })
  } catch (e) {
    closeMic(nav)
    throw e
  }
}
export function closeMic(nav = navigator) {
  const session = nav.audioSession
  if (session?.type === 'play-and-record') { try { session.type = 'playback' } catch { /* stays as it is */ } }
}
