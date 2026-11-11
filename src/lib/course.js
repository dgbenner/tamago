// Which language course this launch runs (Dan, 2026-11-10). Each course has its own content and its own progress
// (a separate IndexedDB database); settings are shared. The choice is remembered on the device, and a new choice
// takes effect by reloading into that course (with the opening screen, as on every launch).
// Inside the engine the course language is still tagged 'fr' (q.lang, fr_to_en, the french column): it means "the
// course language". Only what reaches the screen or the device voice uses the real language below.
export const COURSES = [
  { id: 'fr', name: 'French', sample: 'pomme, fromage, chat…', lang: 'fr', voice: ['fr-FR', 'fr'], db: 'tamago', flag: '/flags/fr.webp', ready: true },
  { id: 'es', name: 'Spanish', sample: 'manzana, queso, gato…', lang: 'es', voice: ['es-MX', 'es-US', 'es-419', 'es'], db: 'tamago-es', flag: '/flags/es.webp', ready: true },
  { id: 'de', name: 'German', sample: 'Apfel, Käse, Katze…', lang: 'de', voice: ['de-DE', 'de'], db: 'tamago-de', flag: '/flags/de.webp', ready: true },
]
const KEY = 'tamago-course'

const read = (store, key) => { try { return store.getItem(key) } catch { return null } }
const write = (store, key, value) => { try { store.setItem(key, value) } catch { /* private mode: this launch only */ } }

const saved = read(localStorage, KEY)
export const firstLaunch = !saved
export const course = COURSES.find((c) => c.id === saved && c.ready) ?? COURSES[0]
export const TL = course.lang // the course language, for lang attributes

// Picking a course: remembered, and if it isn't the one running, a reload opens it.
export function chooseCourse(id) {
  const c = COURSES.find((x) => x.id === id && x.ready)
  if (!c) return false
  write(localStorage, KEY, c.id)
  if (c.id !== course.id) window.location.reload()
  return true
}

// Dev: Jump to Part on the Developer page for another language (Dan, 2026-11-11): the part waits here across the
// reload that opens that language, and App jumps once the course has loaded. Read once.
const JUMP = 'tamago-dev-jump'
export function jumpInCourse(id, part) { write(sessionStorage, JUMP, String(part)); write(localStorage, KEY, id); window.location.reload() }
export function takeDevJump() { const v = Number(read(sessionStorage, JUMP)); if (v) { try { sessionStorage.removeItem(JUMP) } catch { /* */ } } return v || 0 }

// Settings are shared across courses: a copy lives outside the course databases.
const SETTINGS = 'tamago-settings'
export const sharedSettings = () => { try { return JSON.parse(read(localStorage, SETTINGS) ?? 'null') } catch { return null } }
export const saveSharedSettings = (s) => write(localStorage, SETTINGS, JSON.stringify(s))
