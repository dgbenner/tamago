// Which language course this launch runs (Dan, 2026-11-10). Each course has its own content and its own progress
// (a separate IndexedDB database); settings are shared. The choice is remembered on the device, and a new choice
// takes effect by reloading straight into that course, without the opening screen again.
// Inside the engine the course language is still tagged 'fr' (q.lang, fr_to_en, the french column): it means "the
// course language". Only what reaches the screen or the device voice uses the real language below.
export const COURSES = [
  { id: 'fr', name: 'French', sample: 'pomme, fromage, chat…', lang: 'fr', voice: ['fr-FR', 'fr'], db: 'tamago', flag: '/flags/fr.webp', ready: true },
  { id: 'es', name: 'Spanish', sample: 'manzana, queso, gato…', lang: 'es', voice: ['es-MX', 'es-US', 'es-419', 'es'], db: 'tamago-es', flag: '/flags/es.webp', ready: true },
  { id: 'de', name: 'German', lang: 'de', voice: ['de-DE', 'de'], db: 'tamago-de', flag: '/flags/de.webp', ready: false },
]
const KEY = 'tamago-course'
const SKIP = 'tamago-skip-splash'

const read = (store, key) => { try { return store.getItem(key) } catch { return null } }
const write = (store, key, value) => { try { store.setItem(key, value) } catch { /* private mode: this launch only */ } }

const saved = read(localStorage, KEY)
export const firstLaunch = !saved
export const course = COURSES.find((c) => c.id === saved && c.ready) ?? COURSES[0]
export const TL = course.lang // the course language, for lang attributes

// Picking a course: remembered, and if it isn't the one running, a reload opens it (skipping the opening screen).
export function chooseCourse(id) {
  const c = COURSES.find((x) => x.id === id && x.ready)
  if (!c) return false
  write(localStorage, KEY, c.id)
  if (c.id !== course.id) reloadSkippingSplash()
  return true
}
// A reload that should land on home, not on the opening screen again: a course switch, or a new version taking over
// (main.jsx), which otherwise shows the opening screen twice in a row (Dan, 2026-11-10).
export function reloadSkippingSplash() { write(sessionStorage, SKIP, '1'); window.location.reload() }
// True once, on the launch such a reload opens.
export const skipSplash = (() => { const v = read(sessionStorage, SKIP); if (v) { try { sessionStorage.removeItem(SKIP) } catch { /* */ } } return Boolean(v) })()

// Settings are shared across courses: a copy lives outside the course databases.
const SETTINGS = 'tamago-settings'
export const sharedSettings = () => { try { return JSON.parse(read(localStorage, SETTINGS) ?? 'null') } catch { return null } }
export const saveSharedSettings = (s) => write(localStorage, SETTINGS, JSON.stringify(s))
