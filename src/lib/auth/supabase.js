// The real account service (accounts layer 1; _source/accounts-spec.md): Supabase Auth, with the tables and
// row-level security the spec sets up, behind the same interface as auth/mock.js, so no screen changes when it is
// switched on (VITE_AUTH=supabase). Not run yet: it waits for Dan's Supabase project (spec, Setup).
// Keys: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY at build time (the anon key is public by design; row-level
// security is what keeps data private). Turning an account off needs the service-role key, so it goes through
// the Pages Function /api/admin-user, which checks that the caller is an admin.
import { createClient } from '@supabase/supabase-js'
import { ROLES, SIGNUP_OPEN, checkPassword, checkScreenName } from './config.js'

const COURSES = ['fr', 'es', 'de']
const friendly = (error) => {
  const m = String(error?.message ?? error)
  if (/invalid login/i.test(m)) return 'That email and password don’t match.'
  if (/banned|disabled/i.test(m)) return 'This account is turned off. Ask for help to turn it back on.'
  if (/already registered/i.test(m)) return 'That email already has an account. Sign in instead.'
  if (/signups not allowed|signup is disabled/i.test(m)) return 'Sign-up isn’t open yet.'
  return m
}
const must = ({ data, error }) => { if (error) throw new Error(friendly(error)); return data }

export function create() {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Accounts aren’t set up yet (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).')
  const sb = createClient(url, key, { auth: { persistSession: true, detectSessionInUrl: true } })
  const listeners = new Set()
  let current = null
  const profileOf = async (authUser) => {
    if (!authUser) return null
    const p = must(await sb.from('profiles').select('id, email, screen_name, role, disabled, created_at, last_active_at').eq('id', authUser.id).single())
    return p
  }
  const set = async (authUser) => { current = await profileOf(authUser); for (const f of listeners) f(current); return current }
  let recovering = false
  sb.auth.onAuthStateChange((event, s) => {
    if (event === 'PASSWORD_RECOVERY') recovering = true
    if (['SIGNED_IN', 'SIGNED_OUT', 'USER_UPDATED', 'PASSWORD_RECOVERY'].includes(event)) set(s?.user ?? null).catch(() => {})
  })
  const touch = () => current && sb.from('profiles').update({ last_active_at: new Date().toISOString() }).eq('id', current.id)
  const token = async () => (await sb.auth.getSession()).data.session?.access_token

  const api = {
    mode: 'supabase',
    signupOpen: SIGNUP_OPEN,
    async session() { const { data } = await sb.auth.getSession(); return set(data.session?.user ?? null) },
    onChange(f) { listeners.add(f); return () => listeners.delete(f) },
    async signUp({ email, password, screenName }) {
      if (!SIGNUP_OPEN) throw new Error('Sign-up isn’t open yet.')
      const bad = checkPassword(password) || checkScreenName(screenName)
      if (bad) throw new Error(bad)
      const data = must(await sb.auth.signUp({ email, password, options: { data: { screen_name: screenName.trim() } } }))
      return set(data.user)
    },
    async signIn({ email, password }) {
      const data = must(await sb.auth.signInWithPassword({ email, password }))
      const u = await set(data.user)
      if (u?.disabled) { await sb.auth.signOut(); throw new Error(friendly('disabled')) }
      await touch()
      return u
    },
    async signOut() { await sb.auth.signOut(); await set(null) },
    async requestPasswordReset(email) {
      must(await sb.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/account/reset` }))
      return { sent: true, link: null }
    },
    // The email's link signs the user in for recovery (PASSWORD_RECOVERY); the new password is set on that session.
    async resetPassword({ password }) {
      const bad = checkPassword(password)
      if (bad) throw new Error(bad)
      if (!recovering && !(await sb.auth.getSession()).data.session) throw new Error('This reset link has expired. Ask for a new one.')
      must(await sb.auth.updateUser({ password }))
      return true
    },
    async updateProfile({ screenName }) {
      const bad = checkScreenName(screenName)
      if (bad) throw new Error(bad)
      must(await sb.from('profiles').update({ screen_name: screenName.trim() }).eq('id', current.id))
      return set((await sb.auth.getUser()).data.user)
    },
    async changePassword({ current: old, next }) {
      const bad = checkPassword(next)
      if (bad) throw new Error(bad)
      // Supabase doesn't ask for the old password, so check it by signing in with it first.
      const { error } = await sb.auth.signInWithPassword({ email: current.email, password: old })
      if (error) throw new Error('The current password isn’t right.')
      must(await sb.auth.updateUser({ password: next }))
      return true
    },
    async loadProgress(course) {
      if (!current) return null
      const { data } = await sb.from('progress').select('snapshot, saved_at').eq('user_id', current.id).eq('course', course).maybeSingle()
      return data ?? null
    },
    async saveProgress(course, snapshot, summary) {
      if (!current) return
      must(await sb.from('progress').upsert({ user_id: current.id, course, snapshot, summary, saved_at: new Date().toISOString() }))
      await touch()
    },
    async recordSession(row) {
      if (!current) return
      must(await sb.from('sessions').insert({ user_id: current.id, ...row }))
      await touch()
    },
    admin: {
      async listUsers({ q = '' } = {}) {
        let query = sb.from('profiles').select('id, email, screen_name, role, disabled, created_at, last_active_at').order('last_active_at', { ascending: false, nullsFirst: false }).limit(200)
        const s = q.trim().replace(/[%,()]/g, '')
        if (s) query = query.or(`email.ilike.%${s}%,screen_name.ilike.%${s}%`)
        return must(await query)
      },
      async getUser(userId) {
        const p = must(await sb.from('profiles').select('id, email, screen_name, role, disabled, created_at, last_active_at').eq('id', userId).single())
        const rows = must(await sb.from('progress').select('course, summary, saved_at').eq('user_id', userId))
        return { ...p, progress: COURSES.map((c) => rows.find((r) => r.course === c)).filter(Boolean).map((r) => ({ course: r.course, ...r.summary, updated_at: r.saved_at })) }
      },
      async sessions(userId, { limit = 20 } = {}) {
        return must(await sb.from('sessions').select('*').eq('user_id', userId).order('finished_at', { ascending: false }).limit(limit))
      },
      async sendPasswordReset(userId) {
        const p = must(await sb.from('profiles').select('email').eq('id', userId).single())
        return api.requestPasswordReset(p.email)
      },
      async setDisabled(userId, disabled) {
        const res = await fetch('/api/admin-user', { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${await token()}` }, body: JSON.stringify({ user_id: userId, disabled: Boolean(disabled) }) })
        if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? 'That didn’t work.')
        return true
      },
      async setRole(userId, role) {
        if (!ROLES.includes(role)) throw new Error('Unknown role.')
        must(await sb.from('profiles').update({ role }).eq('id', userId))
        return true
      },
    },
  }
  return api
}
