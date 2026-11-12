// The mock account service (accounts layer 1, Dan, 2026-11-11): the same interface as auth/supabase.js, kept on this
// device. Users, sessions, progress copies and reset links live in a small key-value store (IndexedDB in the
// browser, a Map in tests). Passwords are stored as SHA-256 hashes, never plain. Nothing is sent anywhere: a reset
// "email" comes back as a link the screen shows, marked as the mock's. Demo accounts (config.js MOCK_ACCOUNTS) are
// made on first use, with a few sample learners so the console has something to list.
import { MOCK_ACCOUNTS, MOCK_PASSWORD, ROLES, SIGNUP_OPEN, checkPassword, checkScreenName } from './config.js'

export function idbStore(name = 'tamago-accounts-mock') {
  let db = null
  const open = () => db ?? (db = new Promise((resolve, reject) => {
    const req = indexedDB.open(name, 1)
    req.onupgradeneeded = () => req.result.createObjectStore('kv')
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  }))
  const tx = async (mode, fn) => { const d = await open(); return new Promise((resolve, reject) => { const r = fn(d.transaction('kv', mode).objectStore('kv')); r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error) }) }
  return { get: (k) => tx('readonly', (s) => s.get(k)), set: (k, v) => tx('readwrite', (s) => s.put(v, k)) }
}
export const memoryStore = () => { const m = new Map(); return { get: async (k) => structuredClone(m.get(k)), set: async (k, v) => { m.set(k, structuredClone(v)) } } }

const hash = async (s) => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`tamago:${s}`)))].map((b) => b.toString(16).padStart(2, '0')).join('')
const id = () => crypto.randomUUID()
const now = () => new Date().toISOString()
const clean = (email) => String(email ?? '').trim().toLowerCase()
const publicUser = (u) => u && ({ id: u.id, email: u.email, screen_name: u.screen_name, role: u.role, disabled: u.disabled, created_at: u.created_at, last_active_at: u.last_active_at })

const SAMPLE = ['Mika', 'Jonas', 'Priya', 'Lucía', 'Tom', 'Aiko', 'Noah', 'Sofia']
const COURSES = ['fr', 'es', 'de']

export function createMockAuth({ store = idbStore(), session = sessionSlot() } = {}) {
  const listeners = new Set()
  let current = null
  let ready = null
  const users = async () => (await store.get('users')) ?? []
  const saveUsers = (list) => store.set('users', list)
  const emit = () => { for (const f of listeners) f(publicUser(current)) }

  async function seed() {
    if (await store.get('seeded')) return
    const pw = await hash(MOCK_PASSWORD)
    const day = 86400000
    const list = MOCK_ACCOUNTS.map(([email, screen_name, role], i) => ({ id: id(), email, screen_name, role, password: pw, disabled: false, created_at: new Date(Date.now() - (30 - i) * day).toISOString(), last_active_at: null }))
    SAMPLE.forEach((name, i) => list.push({ id: id(), email: `${name.toLowerCase().normalize('NFD').replace(/[^a-z]/g, '')}@example.test`, screen_name: name, role: 'learner', password: pw, disabled: i === 6, created_at: new Date(Date.now() - (20 - i * 2) * day).toISOString(), last_active_at: new Date(Date.now() - i * day * 0.7).toISOString() }))
    const sessions = []
    list.slice(3).forEach((u, i) => {
      for (let k = 0; k < 3 + (i % 4); k++) {
        const finished = new Date(Date.now() - (k * 1.3 + i * 0.4) * day)
        sessions.push({ id: id(), user_id: u.id, course: COURSES[(i + k) % 3], kind: 'lesson', unit_id: `U0${1 + (k % 5)}`, unit_title: ['Say Hi', 'People + Things', 'Polite Phrases', 'Food + Drink', 'Animals'][k % 5], round: 1 + (k % 3), score: 6 + (k % 4), size: 10, passed: k % 4 !== 3, started_at: new Date(finished - 6 * 60000).toISOString(), finished_at: finished.toISOString() })
      }
      store.set(`summary:${u.id}:${COURSES[i % 3]}`, { course: COURSES[i % 3], lessons_done: 4 + i * 3, circles_started: 2 + (i % 4), words_met: 20 + i * 9, updated_at: list[3 + i]?.last_active_at ?? now() })
    })
    await saveUsers(list)
    await store.set('sessions', sessions)
    await store.set('seeded', true)
  }
  const init = () => ready ?? (ready = (async () => {
    await seed()
    const sid = session.get()
    const u = sid && (await users()).find((x) => x.id === sid)
    current = u && !u.disabled ? u : null
    if (!current) session.set(null)
    return publicUser(current)
  })())
  const touch = async (userId) => {
    const list = await users()
    const u = list.find((x) => x.id === userId)
    if (u) { u.last_active_at = now(); await saveUsers(list); if (current?.id === userId) current = u }
  }
  const mustBeAdmin = () => { if (current?.role !== 'admin') throw new Error('Admins only.') }

  const api = {
    mode: 'mock',
    signupOpen: SIGNUP_OPEN,
    async session() { await init(); return publicUser(current) },
    onChange(f) { listeners.add(f); return () => listeners.delete(f) },

    async signUp({ email, password, screenName }) {
      await init()
      if (!SIGNUP_OPEN) throw new Error('Sign-up isn’t open yet.')
      const e = clean(email)
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) throw new Error('Enter an email address.')
      const bad = checkPassword(password) || checkScreenName(screenName)
      if (bad) throw new Error(bad)
      const list = await users()
      if (list.some((u) => u.email === e)) throw new Error('That email already has an account. Sign in instead.')
      const u = { id: id(), email: e, screen_name: screenName.trim(), role: 'learner', password: await hash(password), disabled: false, created_at: now(), last_active_at: now() }
      list.push(u); await saveUsers(list)
      current = u; session.set(u.id); emit()
      return publicUser(u)
    },
    async signIn({ email, password }) {
      await init()
      const u = (await users()).find((x) => x.email === clean(email))
      if (!u || u.password !== (await hash(password))) throw new Error('That email and password don’t match.')
      if (u.disabled) throw new Error('This account is turned off. Ask for help to turn it back on.')
      await touch(u.id)
      current = (await users()).find((x) => x.id === u.id); session.set(u.id); emit()
      return publicUser(current)
    },
    async signOut() { current = null; session.set(null); emit() },
    async requestPasswordReset(email) {
      await init()
      const u = (await users()).find((x) => x.email === clean(email))
      // The same answer whether or not the email has an account, as a real service gives.
      if (!u) return { sent: true, link: null }
      const token = id()
      const resets = (await store.get('resets')) ?? {}
      resets[token] = { user_id: u.id, expires: Date.now() + 3600000 }
      await store.set('resets', resets)
      return { sent: true, link: `/account/reset?token=${token}` }
    },
    async resetPassword({ token, password }) {
      await init()
      const bad = checkPassword(password)
      if (bad) throw new Error(bad)
      const resets = (await store.get('resets')) ?? {}
      const r = resets[token]
      if (!r || r.expires < Date.now()) throw new Error('This reset link has expired. Ask for a new one.')
      const list = await users()
      const u = list.find((x) => x.id === r.user_id)
      u.password = await hash(password)
      delete resets[token]
      await saveUsers(list); await store.set('resets', resets)
      return true
    },
    async updateProfile({ screenName }) {
      if (!current) throw new Error('Sign in first.')
      const bad = checkScreenName(screenName)
      if (bad) throw new Error(bad)
      const list = await users()
      const u = list.find((x) => x.id === current.id)
      u.screen_name = screenName.trim()
      await saveUsers(list); current = u; emit()
      return publicUser(u)
    },
    async changePassword({ current: old, next }) {
      if (!current) throw new Error('Sign in first.')
      const list = await users()
      const u = list.find((x) => x.id === current.id)
      if (u.password !== (await hash(old))) throw new Error('The current password isn’t right.')
      const bad = checkPassword(next)
      if (bad) throw new Error(bad)
      u.password = await hash(next)
      await saveUsers(list)
      return true
    },

    // Progress: a full copy of one course's device data (store.js dumpAll) plus a small summary for the console.
    async loadProgress(course) {
      if (!current) return null
      return (await store.get(`progress:${current.id}:${course}`)) ?? null
    },
    async saveProgress(course, snapshot, summary) {
      if (!current) return
      await store.set(`progress:${current.id}:${course}`, { snapshot, saved_at: now() })
      await store.set(`summary:${current.id}:${course}`, { course, ...summary, updated_at: now() })
      await touch(current.id)
    },
    async recordSession(row) {
      if (!current) return
      const sessions = (await store.get('sessions')) ?? []
      sessions.push({ id: id(), user_id: current.id, ...row })
      await store.set('sessions', sessions.slice(-2000))
      await touch(current.id)
    },

    admin: {
      async listUsers({ q = '' } = {}) {
        await init(); mustBeAdmin()
        const s = q.trim().toLowerCase()
        return (await users()).filter((u) => !s || u.email.includes(s) || u.screen_name.toLowerCase().includes(s)).map(publicUser)
          .sort((a, b) => String(b.last_active_at ?? '').localeCompare(String(a.last_active_at ?? '')))
      },
      async getUser(userId) {
        await init(); mustBeAdmin()
        const u = (await users()).find((x) => x.id === userId)
        if (!u) throw new Error('No such user.')
        const progress = (await Promise.all(COURSES.map((c) => store.get(`summary:${u.id}:${c}`)))).filter(Boolean)
        return { ...publicUser(u), progress }
      },
      async sessions(userId, { limit = 20 } = {}) {
        await init(); mustBeAdmin()
        return ((await store.get('sessions')) ?? []).filter((s) => s.user_id === userId).sort((a, b) => b.finished_at.localeCompare(a.finished_at)).slice(0, limit)
      },
      async sendPasswordReset(userId) {
        await init(); mustBeAdmin()
        const u = (await users()).find((x) => x.id === userId)
        if (!u) throw new Error('No such user.')
        return api.requestPasswordReset(u.email)
      },
      async setDisabled(userId, disabled) {
        await init(); mustBeAdmin()
        if (userId === current.id) throw new Error('You can’t turn off your own account.')
        const list = await users()
        list.find((x) => x.id === userId).disabled = Boolean(disabled)
        await saveUsers(list)
        return true
      },
      async setRole(userId, role) {
        await init(); mustBeAdmin()
        if (!ROLES.includes(role)) throw new Error('Unknown role.')
        if (userId === current.id && role !== 'admin') throw new Error('You can’t take away your own admin role.')
        const list = await users()
        list.find((x) => x.id === userId).role = role
        await saveUsers(list)
        return true
      },
    },
  }
  return api
}

// Which mock account is signed in on this device (a stand-in for the real service's session).
export function sessionSlot(key = 'tamago-auth-session') {
  let mem = null
  return {
    get: () => { try { return localStorage.getItem(key) } catch { return mem } },
    set: (v) => { try { if (v) localStorage.setItem(key, v); else localStorage.removeItem(key) } catch { mem = v } },
  }
}

export const create = () => createMockAuth()
