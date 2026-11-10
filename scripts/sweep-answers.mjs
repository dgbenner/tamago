// Content sweep, part 2 (Dan, 2026-11-10): every English translation Tatoeba links to a live sentence becomes an
// accepted fr_to_en answer, so fewer right answers get marked wrong. Linked translations that drop or swap a noun's
// course sense are left out automatically; the rest are listed in content/sweep/answers.json for review (idioms,
// loose or misleading renderings are taken out there, in answers-review.json).
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadTatoeba } from './lib/tatoeba.mjs'

const ROOT = join(import.meta.dirname, '..')
const raw = (t) => JSON.parse(readFileSync(join(ROOT, `content/raw/${t}.json`), 'utf8'))
mkdirSync(join(ROOT, 'content/sweep'), { recursive: true })
const sentences = raw('sentences').filter((s) => s.source === 'tatoeba' && String(s.status).startsWith('live') && s.source_id)
const sw = raw('sentence_words')
const checkedWords = JSON.parse(readFileSync(join(ROOT, 'content/checks/words.json'), 'utf8'))
const IRREGULAR = { man: 'men', woman: 'women', child: 'children', mouse: 'mice' }
const nounMeaning = new Map(checkedWords.filter((w) => w.part_of_speech === 'Noun').map((w) => {
  const g = (/^plural of /.test(w.gloss) ? w.lemma_gloss : w.gloss).split(/[,;(]/)[0].trim().toLowerCase().replace(/^(a|an|the) /, '')
  return [w.word_id, g]
}))
const carriesNouns = (english, ids) => ids.every((id) => {
  const g = nounMeaning.get(id)
  if (!g) return true
  const e = english.toLowerCase()
  return [g, g + 's', g + 'es', IRREGULAR[g]].filter(Boolean).some((x) => new RegExp(`\\b${x}\\b`).test(e))
})
const key = (e) => String(e).toLowerCase().replace(/[’]/g, "'").replace(/[.!?,;:"]+/g, '').replace(/\s+/g, ' ').trim()
const accepted = raw('accepted_answers')

const tatoeba = loadTatoeba()
// englishFor gives texts; ids are needed for the source line, so link again from the raw files.
const engIds = new Map()
for (const l of readFileSync(join(ROOT, '.cache/tatoeba/fra-eng_links.tsv'), 'utf8').split('\n')) {
  const [fr, en] = l.split('\t')
  if (!fr) continue
  if (!engIds.has(fr)) engIds.set(fr, [])
  engIds.get(fr).push(en)
}
const engText = new Map()
for (const l of readFileSync(join(ROOT, '.cache/tatoeba/eng_sentences.tsv'), 'utf8').split('\n')) { const [id, , text] = l.split('\t'); if (id) engText.set(id, text) }

const out = []
const autoSkipped = []
let before = 0
for (const s of sentences) {
  const have = new Set([key(s.english), ...accepted.filter((a) => a.sentence_id === s.sentence_id && a.direction === 'fr_to_en').map((a) => key(a.answer))])
  before += have.size
  const ids = sw.filter((r) => r.sentence_id === s.sentence_id).map((r) => r.word_id).filter(Boolean)
  for (const eid of [...new Set(engIds.get(s.source_id) ?? [])]) {
    const e = engText.get(eid)
    if (!e || have.has(key(e))) continue
    have.add(key(e))
    if (!carriesNouns(e, ids)) { autoSkipped.push({ sentence_id: s.sentence_id, french: s.french, answer: e, english_id: eid, reason: 'drops or changes a noun the course teaches' }); continue }
    out.push({ sentence_id: s.sentence_id, french: s.french, english: s.english, answer: e, english_id: eid })
  }
}
writeFileSync(join(ROOT, 'content/sweep/answers.json'), JSON.stringify({ made_at: new Date().toISOString().slice(0, 10), live_sentences: sentences.length, english_accepted_before: before, proposals: out, auto_skipped: autoSkipped }, null, 2) + '\n')
console.log(`live Tatoeba sentences ${sentences.length}; English accepted before (main + extra) ${before}; new linked translations ${out.length}; auto-skipped ${autoSkipped.length}`)
