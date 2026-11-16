// The microphone on an iPhone (2026-11-15): in the "playback" audio session (main.jsx, for the ring switch) Safari
// refuses the microphone with no prompt, so Speak and Compare said "Recording isn't available". The fake below does
// what Safari does: getUserMedia rejects unless the session allows recording, and only counts when called in the tap.
import test from 'node:test'
import assert from 'node:assert/strict'
import { closeMic, openMic } from '../src/lib/mic.js'

function iphone() {
  const nav = { audioSession: { type: 'playback' }, calls: [], inTap: true }
  nav.mediaDevices = {
    getUserMedia: (c) => {
      nav.calls.push({ ...c, inTap: nav.inTap, session: nav.audioSession.type })
      if (nav.audioSession.type === 'playback') return Promise.reject(Object.assign(new Error('refused'), { name: 'InvalidStateError' }))
      return Promise.resolve({ id: 'stream' })
    },
  }
  return nav
}

test('the microphone opens on an iPhone: the session allows recording before the request', async () => {
  const nav = iphone()
  const stream = await openMic(nav)
  assert.equal(stream.id, 'stream')
  assert.equal(nav.calls[0].session, 'play-and-record')
  assert.equal(nav.audioSession.type, 'play-and-record')
})

test('the request runs inside the tap: nothing is awaited before it', () => {
  const nav = iphone()
  openMic(nav).catch(() => {})
  nav.inTap = false // the tap's own code has finished
  assert.equal(nav.calls.length, 1)
  assert.equal(nav.calls[0].inTap, true)
})

test('the page goes back to playback when the microphone closes, and when it is refused', async () => {
  const nav = iphone()
  await openMic(nav)
  closeMic(nav)
  assert.equal(nav.audioSession.type, 'playback')
  nav.mediaDevices.getUserMedia = () => Promise.reject(Object.assign(new Error('no'), { name: 'NotAllowedError' }))
  await assert.rejects(openMic(nav), { name: 'NotAllowedError' })
  assert.equal(nav.audioSession.type, 'playback')
})

test('a browser with no audio session just asks', async () => {
  const nav = { mediaDevices: { getUserMedia: () => Promise.resolve({ id: 's' }) } }
  assert.equal((await openMic(nav)).id, 's')
  closeMic(nav)
})
