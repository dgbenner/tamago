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
  // Danish (Dan, 2026-11-20): Part 1 only, so Developer only for now, like Dutch.
  { id: 'da', name: 'Danish', sample: 'æble, ost, kat…', lang: 'da', voice: ['da-DK', 'da'], db: 'tamago-da', flag: '/flags/da.webp', ready: false, devOnly: true },
  // Swedish (Dan, 2026-11-20): Part 1 only, so Developer only for now, like Dutch.
  { id: 'sv', name: 'Swedish', sample: 'äpple, ost, katt…', lang: 'sv', voice: ['sv-SE', 'sv'], db: 'tamago-sv', flag: '/flags/sv.webp', ready: false, devOnly: true },
  // Coming Soon: nine more (Dan, 2026-11-16; originals in _source/flags).
  { id: 'pl', name: 'Polish', sample: 'jabłko, ser, kot…', lang: 'pl', voice: ['pl-PL', 'pl'], db: 'tamago-pl', flag: '/flags/pl.webp', ready: false },
  { id: 'ro', name: 'Romanian', sample: 'măr, brânză, pisică…', lang: 'ro', voice: ['ro-RO', 'ro'], db: 'tamago-ro', flag: '/flags/ro.webp', ready: false },
  { id: 'no', name: 'Norwegian', sample: 'eple, ost, katt…', lang: 'nb', voice: ['nb-NO', 'no-NO', 'nb', 'no'], db: 'tamago-no', flag: '/flags/no.webp', ready: false },
  { id: 'fi', name: 'Finnish', sample: 'omena, juusto, kissa…', lang: 'fi', voice: ['fi-FI', 'fi'], db: 'tamago-fi', flag: '/flags/fi.webp', ready: false },
  { id: 'cs', name: 'Czech', sample: 'jablko, sýr, kočka…', lang: 'cs', voice: ['cs-CZ', 'cs'], db: 'tamago-cs', flag: '/flags/cs.webp', ready: false },
  { id: 'hu', name: 'Hungarian', sample: 'alma, sajt, macska…', lang: 'hu', voice: ['hu-HU', 'hu'], db: 'tamago-hu', flag: '/flags/hu.webp', ready: false },
  { id: 'el', name: 'Greek', sample: 'μήλο, τυρί, γάτα…', lang: 'el', voice: ['el-GR', 'el'], db: 'tamago-el', flag: '/flags/el.webp', ready: false },
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
