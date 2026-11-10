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
    id: 'fr', name: 'French', workbook: '_source/tamago-data-v24.xlsx',
    tatoeba: 'fra', wiktionaryCode: 'fr', wiktionarySection: 'French', linguaLibre: { qid: 'Q150', iso: 'fra' }, wikidataLanguage: 'Q150',
  },
  es: {
    id: 'es', name: 'Spanish', workbook: '_source/tamago-es-data-v1.xlsx',
    tatoeba: 'spa', wiktionaryCode: 'es', wiktionarySection: 'Spanish', linguaLibre: { qid: 'Q1321', iso: 'spa' }, wikidataLanguage: 'Q1321',
  },
}
export const C = COURSES[COURSE]
if (!C) throw new Error(`COURSE=${COURSE}: no such course`)

// A repo-relative path, moved to the course's own folder when the course isn't French. Shared files stay put.
const MOVED = [['content/', 'content-es/'], ['src/content', 'src/content-es'], ['public/audio-native', 'public/audio-native-es'], ['public/audio', 'public/audio-es'], ['.cache/recordings', '.cache/recordings-es']]
const SHARED = new Set(['content/icons.json'])
export function at(p) {
  if (COURSE === 'fr' || SHARED.has(p)) return join(ROOT, p)
  const hit = MOVED.find(([from]) => p === from.replace(/\/$/, '') || p.startsWith(from))
  return join(ROOT, hit ? hit[1].replace(/-es/, `-${COURSE}`) + p.slice(hit[0].length) : p)
}
// The URL path the app uses for a course's recordings.
export const audioUrl = COURSE === 'fr' ? '/audio' : `/audio-${COURSE}`
