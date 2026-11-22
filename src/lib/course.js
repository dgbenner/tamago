// Which language course this launch runs (Dan, 2026-11-10). Each course has its own content and its own progress
// (a separate IndexedDB database); settings are shared. The choice is remembered on the device, and a new choice
// takes effect by reloading into that course (with the opening screen, as on every launch).
// Inside the engine the course language is still tagged 'fr' (q.lang, fr_to_en, the french column): it means "the
// course language". Only what reaches the screen or the device voice uses the real language below.
export const COURSES = [
  { id: 'fr', name: 'French', sample: 'pomme, fromage, chat…', lang: 'fr', voice: ['fr-FR', 'fr'], db: 'tamago', flag: '/flags/fr.webp', ready: true },
  { id: 'es', name: 'Spanish', sample: 'manzana, queso, gato…', lang: 'es', voice: ['es-MX', 'es-US', 'es-419', 'es'], db: 'tamago-es', flag: '/flags/es.webp', ready: true },
  { id: 'de', name: 'German', sample: 'Apfel, Käse, Katze…', lang: 'de', voice: ['de-DE', 'de'], db: 'tamago-de', flag: '/flags/de.webp', ready: true },
  // Italian and Brazilian Portuguese: public since 2026-11-16 (Dan approved; Developer only until then).
  { id: 'it', name: 'Italian', sample: 'mela, formaggio, gatto…', lang: 'it', voice: ['it-IT', 'it'], db: 'tamago-it', flag: '/flags/it.webp', ready: true },
  { id: 'pt', name: 'Portuguese', sample: 'maçã, queijo, gato…', lang: 'pt-BR', voice: ['pt-BR', 'pt'], db: 'tamago-pt', flag: '/flags/pt.webp', ready: true }, // Brazilian Portuguese
  // Dutch (Dan, 2026-11-20): Part 1 only, so Developer only for now (devOnly: ready while Developer is on).
  { id: 'nl', name: 'Dutch', sample: 'appel, kaas, kat…', lang: 'nl', voice: ['nl-NL', 'nl'], db: 'tamago-nl', flag: '/flags/nl.webp', ready: false, devOnly: true },
  // Polish (2026-11-22): A1 complete (four parts), Developer only until Dan makes it public, like Dutch.
  { id: 'pl', name: 'Polish', sample: 'jabłko, ser, kot…', lang: 'pl', voice: ['pl-PL', 'pl'], db: 'tamago-pl', flag: '/flags/pl.webp', ready: false, devOnly: true },
  // Danish (Dan, 2026-11-20): Part 1 only, so Developer only for now, like Dutch.
  { id: 'da', name: 'Danish', sample: 'æble, ost, kat…', lang: 'da', voice: ['da-DK', 'da'], db: 'tamago-da', flag: '/flags/da.webp', ready: false, devOnly: true },
  // Swedish (Dan, 2026-11-20): Part 1 only, so Developer only for now, like Dutch.
  { id: 'sv', name: 'Swedish', sample: 'äpple, ost, katt…', lang: 'sv', voice: ['sv-SE', 'sv'], db: 'tamago-sv', flag: '/flags/sv.webp', ready: false, devOnly: true },
]
// The picker shows only the nine committed courses (Dan, 2026-11-22): the five public ones and the four Developer-only
// ones above. The Coming Soon flags (Romanian, Finnish, Czech, Hungarian, Greek) are gone from it; their flag pictures
// stay in public/flags and Romanian's content stays on its branch (content/ro-a1). Norwegian is parked, not deleted: it
// is out of COURSES, so no picker, Developer list, voice lab or Conversations list offers it and a device that had it
// saved opens French, but its content (content-no, src/content-no), its tables (main.jsx, tables-no.js), its tests and
// its database name stay, and Reset Everything still clears that database. Putting the entry back into COURSES
// returns it.
export const PARKED = [
  { id: 'no', name: 'Norwegian', sample: 'eple, ost, katt…', lang: 'nb', voice: ['nb-NO', 'no-NO', 'nb', 'no'], db: 'tamago-no', flag: '/flags/no.webp', ready: false },
]
const KEY = 'tamago-course'

// A developer-only course is ready only while Developer is on (shared settings copy; Developer defaults to on).
// Off, it shows faintly as Coming Soon like the courses not built yet. A change applies from the next launch.
const devOn = () => { try { return (JSON.parse(localStorage.getItem('tamago-settings') ?? 'null')?.developer ?? 'on') !== 'off' } catch { return true } }
for (const c of COURSES) if (c.devOnly) c.ready = devOn()

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
