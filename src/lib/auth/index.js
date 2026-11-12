// Accounts, layer 1 (Dan, 2026-11-11; _source/accounts-spec.md): the one way screens reach the account service.
// The app works with no account; signing in only adds a copy of progress in the account and a record of sessions.
import { useEffect, useState } from 'react'
import { AUTH_MODE } from './config.js'
import { dumpAll, restoreAll } from '../store.js'

let auth = null
let loading = null
// The adapter for this build. VITE_AUTH is fixed at build time, so the unused adapter is left out of the bundle.
export function getAuth() {
  if (AUTH_MODE === 'off') return Promise.resolve(null)
  return loading ?? (loading = (AUTH_MODE === 'supabase' ? import('./supabase.js') : import('./mock.js')).then((m) => (auth = m.create())).catch(() => null))
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
const lessonCount = (dump) => (dump?.stores?.lessons ?? []).length + (dump?.stores?.unit_progress ?? []).length

// On sign-in (and on opening a course while signed in): this course's progress and the account's copy meet.
//   - the account has none: this device's progress goes into the account ("moved");
//   - this device has none: the account's copy comes onto the device ("restored"; the caller reloads);
//   - both have some: the one with more lessons wins (a decision for Dan; spec, Open questions).
export async function syncCourse(a, course) {
  if (!a) return 'none'
  const local = await dumpAll()
  const remote = await a.loadProgress(course).catch(() => null)
  const here = lessonCount(local)
  const there = lessonCount(remote?.snapshot)
  if (!remote?.snapshot) { if (here) { await a.saveProgress(course, local, progressSummary(local)); return 'moved' } return 'none' }
  if (!here || there > here) { await restoreAll(remote.snapshot); return 'restored' }
  await a.saveProgress(course, local, progressSummary(local))
  return 'kept'
}
// After a lesson: the account's copy follows, a moment later so a run of lessons saves once.
let timer = null
export function saveSoon(a, course) {
  if (!a) return
  clearTimeout(timer)
  timer = setTimeout(async () => { const d = await dumpAll(); a.saveProgress(course, d, progressSummary(d)).catch(() => {}) }, 1500)
}
