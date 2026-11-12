// Accounts, layer 1 (Dan, 2026-11-11; _source/accounts-spec.md): the one way screens reach the account service.
// The app works with no account; signing in only adds a copy of progress in the account and a record of sessions.
import { useEffect, useState } from 'react'
import { AUTH_MODE } from './config.js'
import { dumpAll, restoreAll, resetProgress } from '../store.js'
import { belongsElsewhere, chooseSync } from './sync-rule.js'
export { belongsElsewhere, chooseSync }

let auth = null
let loading = null
// The adapter for this build. VITE_AUTH is fixed at build time, so the unused adapter is left out of the bundle.
export function getAuth() {
  if (AUTH_MODE === 'off') return Promise.resolve(null)
  // The raw build variable, compared in place, so the bundler drops the branch not taken: a Supabase build has no
  // mock in it at all (and mock.js refuses to start there anyway), and a mock build has no Supabase library.
  return loading ?? (loading = (import.meta.env.VITE_AUTH === 'supabase' ? import('./supabase.js') : import('./mock.js')).then((m) => (auth = m.create())).catch(() => null))
}

// The signed-in user (or null) and the adapter, kept current.
export function useAuth() {
  const [state, setState] = useState({ ready: false, user: null, auth: null })
  useEffect(() => {
    let off = () => {}
    let live = true
    getAuth().then(async (a) => {
      if (!a) { if (live) setState({ ready: true, user: null, auth: null }); return }
      const user = await a.session().catch(() => null)
      if (!live) return
      setState({ ready: true, user, auth: a })
      off = a.onChange((u) => setState((s) => ({ ...s, user: u })))
    })
    return () => { live = false; off() }
  }, [])
  return state
}

// A short summary of one course's progress, for the console (lessons, circles, words), read from a dumpAll copy.
export function progressSummary(dump) {
  const st = dump?.stores ?? {}
  const kv = Object.fromEntries((st.kv ?? []).map((r) => [r.key, r.value]))
  const lessons = st.lessons ?? []
  return {
    lessons_done: lessons.filter((l) => l.passed).length,
    circles_started: (st.unit_progress ?? []).filter((u) => (u.lessons_done ?? 0) > 0 || (u.round_reached ?? 0) > 0).length,
    words_met: Array.isArray(kv.seen_words) ? kv.seen_words.length : 0,
    last_lesson_at: lessons.map((l) => l.finished_at).filter(Boolean).sort().at(-1) ?? null,
  }
}
const hasProgress = (dump) => (dump?.stores?.lessons ?? []).length + (dump?.stores?.unit_progress ?? []).length > 0

const markerKey = (course, userId) => `tamago-sync:${course}:${userId}`
const readMarker = (course, userId) => { try { return JSON.parse(localStorage.getItem(markerKey(course, userId))) } catch { return null } }
const writeMarker = (course, userId, m) => { try { localStorage.setItem(markerKey(course, userId), JSON.stringify(m)); claimDevice(course, userId) } catch { /* private mode: asks again next time */ } }
// The account this course's device progress belongs to: the last one it synced with. Before the owner key existed,
// a sync marker for another account says the same.
const ownerKey = (course) => `tamago-owner:${course}`
function deviceOwner(course) {
  try {
    const owner = localStorage.getItem(ownerKey(course))
    if (owner) return owner
    const prefix = `tamago-sync:${course}:`
    for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k?.startsWith(prefix)) return k.slice(prefix.length) }
  } catch { /* no storage: nothing to go on */ }
  return null
}
function claimDevice(course, userId) { try { localStorage.setItem(ownerKey(course), userId) } catch { /* private mode */ } }

async function upload(a, course, userId, local) {
  const summary = progressSummary(local)
  const saved_at = await a.saveProgress(course, local, summary)
  writeMarker(course, userId, { saved_at, lessons: summary.lessons_done })
}
async function download(a, course, userId, remote) {
  await restoreAll(remote.snapshot)
  writeMarker(course, userId, { saved_at: remote.saved_at, lessons: progressSummary(remote.snapshot).lessons_done })
}
// On sign-in, and on opening a course while signed in. Returns { action, device, account } with each side's summary;
// on 'ask' nothing has changed yet and the caller shows the choice, then calls settleSync. On 'elsewhere' the device's
// progress belongs to another account: nothing has changed, and the caller asks Start Fresh or Bring, then calls
// startFresh or bringDevice.
export async function syncCourse(a, course, user) {
  if (!a || !user) return { action: 'none' }
  const local = await dumpAll()
  const device = progressSummary(local)
  if (belongsElsewhere({ localAny: hasProgress(local), owner: deviceOwner(course), userId: user.id })) return { action: 'elsewhere', device }
  const remote = await a.loadProgress(course).catch(() => null)
  const account = remote?.snapshot ? progressSummary(remote.snapshot) : null
  const action = chooseSync({ local: { any: hasProgress(local), lessons: device.lessons_done }, remote: remote?.snapshot ? { any: hasProgress(remote.snapshot), saved_at: remote.saved_at } : null, marker: readMarker(course, user.id) })
  if (action === 'upload') await upload(a, course, user.id, local)
  if (action === 'download') await download(a, course, user.id, remote)
  return { action, device, account }
}
// The learner's pick after 'ask': 'device' keeps this device's and saves it to the account; 'account' brings the
// account's onto the device (the caller reloads).
export async function settleSync(a, course, user, pick) {
  if (pick === 'device') return upload(a, course, user.id, await dumpAll())
  return download(a, course, user.id, await a.loadProgress(course))
}
// Another account's progress on the device. Start Fresh wipes this course's progress on the device (the other account
// keeps its own copy), then syncs as usual; Bring makes it this account's: saved there if the account has none, else the learner picks (ask).
export async function startFresh(a, course, user) {
  await resetProgress()
  claimDevice(course, user.id)
  return syncCourse(a, course, user)
}
export async function bringDevice(a, course, user) {
  // This device's last sync with the account was of other progress, so it says nothing now: forget it, and an account
  // that has progress of its own gets the Which Progress to Keep question instead of being overwritten.
  try { localStorage.removeItem(markerKey(course, user.id)) } catch { /* private mode */ }
  claimDevice(course, user.id)
  return syncCourse(a, course, user)
}
// After a lesson: the account's copy follows, a moment later so a run of lessons saves once.
let timer = null
export function saveSoon(a, course, user) {
  if (!a || !user) return
  clearTimeout(timer)
  timer = setTimeout(async () => { upload(a, course, user.id, await dumpAll()).catch(() => {}) }, 1500)
}
