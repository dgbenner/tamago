// Which course the content scripts work on (Spanish added 2026-11-10). COURSE=es node scripts/… for Spanish; French
// is the default, so every French command works as before. Spanish lives beside French, never inside it, because the
// French build clears its own folders: content-es/, src/content-es/, public/audio-es/, .cache/recordings-es/.
// The data shape is the same in both: the sentences' "french" column holds the course language's text, and the
// directions fr_to_en / en_to_fr mean course language to English and back.
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '../..')
export const COURSE = process.env.COURSE ?? 'fr'

export const COURSES = {
  fr: {
    id: 'fr', name: 'French', workbook: '_source/tamago-data-v40.xlsx',
    tatoeba: 'fra', wiktionaryCode: 'fr', wiktionarySection: 'French', linguaLibre: { qid: 'Q150', iso: 'fra' }, wikidataLanguage: 'Q150',
  },
  es: {
    id: 'es', name: 'Spanish', workbook: '_source/tamago-es-data-v11.xlsx',
    tatoeba: 'spa', wiktionaryCode: 'es', wiktionarySection: 'Spanish', linguaLibre: { qid: 'Q1321', iso: 'spa' }, wikidataLanguage: 'Q1321',
  },
  // German (2026-11-10): standard German as spoken in Germany, du and Sie. Its folders: content-de/, src/content-de/…
  de: {
    id: 'de', name: 'German', workbook: '_source/tamago-de-data-v9.xlsx',
    tatoeba: 'deu', wiktionaryCode: 'de', wiktionarySection: 'German', linguaLibre: { qid: 'Q188', iso: 'deu' }, wikidataLanguage: 'Q188',
  },
  // Italian (2026-11-14, branch lang/italian): standard Italian as spoken in Italy, tu and Lei. Its folders: content-it/…
  it: {
    id: 'it', name: 'Italian', workbook: '_source/tamago-it-data-v8.xlsx',
    tatoeba: 'ita', wiktionaryCode: 'it', wiktionarySection: 'Italian', linguaLibre: { qid: 'Q652', iso: 'ita' }, wikidataLanguage: 'Q652',
  },
  // Brazilian Portuguese (2026-11-14, branch lang/portuguese): você, Brazilian spelling and words. Its folders: content-pt/…
  pt: {
    id: 'pt', name: 'Portuguese', workbook: '_source/tamago-pt-data-v8.xlsx',
    tatoeba: 'por', wiktionaryCode: 'pt', wiktionarySection: 'Portuguese', linguaLibre: { qid: 'Q5146', iso: 'por' }, wikidataLanguage: 'Q5146',
  },
  // Dutch (2026-11-19, branch lang/dutch): standard Dutch (Netherlands), je informally and u formally. Its folders: content-nl/…
  nl: {
    id: "nl", name: "Dutch", workbook: "_source/tamago-nl-data-v7.xlsx",
    tatoeba: "nld", wiktionaryCode: "nl", wiktionarySection: "Dutch", linguaLibre: { qid: "Q7411", iso: "nld" }, wikidataLanguage: "Q7411",
  },
  // Swedish (2026-11-19, branch lang/swedish): standard Swedish, du throughout (formal ni is archaic, kept out of
  // Part 1). Its folders: content-sv/, src/content-sv/, public/audio-sv/.
  sv: {
    id: 'sv', name: 'Swedish', workbook: '_source/tamago-sv-data-v5.xlsx',
    tatoeba: 'swe', wiktionaryCode: 'sv', wiktionarySection: 'Swedish', linguaLibre: { qid: 'Q9027', iso: 'swe' }, wikidataLanguage: 'Q9027',
  },
  // Danish (2026-11-19, branch lang/danish): standard Danish, modern du (formal De kept out of Part 1). Its folders: content-da/…
  da: {
    id: 'da', name: 'Danish', workbook: '_source/tamago-da-data-v3.xlsx',
    tatoeba: 'dan', wiktionaryCode: 'da', wiktionarySection: 'Danish', linguaLibre: { qid: 'Q9035', iso: 'dan' }, wikidataLanguage: 'Q9035',
  },
  // Norwegian Bokmål (2026-11-19, branch lang/norwegian): standard written Bokmål, du throughout (formal De kept out of Part 1). Its folders: content-no/…
  no: {
    id: 'no', name: 'Norwegian', workbook: '_source/tamago-no-data-v3.xlsx',
    tatoeba: 'nob', wiktionaryCode: 'no', wiktionarySection: 'Norwegian Bokmål', linguaLibre: { qid: 'Q25167', iso: 'nob' }, wikidataLanguage: 'Q25167',
  },
}
export const C = COURSES[COURSE]
if (!C) throw new Error(`COURSE=${COURSE}: no such course`)

// A repo-relative path, moved to the course's own folder when the course isn't French. Shared files stay put.
const MOVED = [['content/', 'content-es/'], ['src/content', 'src/content-es'], ['public/audio-native', 'public/audio-native-es'], ['public/audio', 'public/audio-es'], ['.cache/recordings', '.cache/recordings-es']]
const SHARED = new Set(['content/sushi-catalog.json'])
export function at(p) {
  if (COURSE === 'fr' || SHARED.has(p)) return join(ROOT, p)
  const hit = MOVED.find(([from]) => p === from.replace(/\/$/, '') || p.startsWith(from))
  return join(ROOT, hit ? hit[1].replace(/-es/, `-${COURSE}`) + p.slice(hit[0].length) : p)
}
// The URL path the app uses for a course's recordings.
export const audioUrl = COURSE === 'fr' ? '/audio' : `/audio-${COURSE}`
