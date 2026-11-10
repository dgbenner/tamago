// Content sweep, part 1 (Dan, 2026-11-10): for each sentence Tamago wrote itself (source tamago_original), look for a
// checked Tatoeba sentence (owner a native French speaker, or tagged OK) that teaches the same thing: every one of the
// draft's new words for its unit, the same grammar forms of the unit, the same kind of sentence (statement or
// question), and nothing outside the words the unit allows. Question-and-answer pairs (QT09) were written together
// and stay as drafts. Writes content/sweep/originals.json (proposals) and content/sweep/originals.md for review;
// nothing changes until scripts/apply-sweep.mjs folds the reviewed list into the workbook.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadTatoeba } from './lib/tatoeba.mjs'
import { analyse as analyseWords, formIndexFor, loose, norm } from './lib/french.mjs'

const ROOT = join(import.meta.dirname, '..')
const raw = (t) => JSON.parse(readFileSync(join(ROOT, `content/raw/${t}.json`), 'utf8'))
const OUT = join(ROOT, 'content/sweep')
mkdirSync(OUT, { recursive: true })

const MIN_WORDS = 2, MAX_WORDS = 7 // content_pull P03, as for every pull
const units = raw('units').sort((a, b) => a.order - b.order)
const unitById = new Map(units.map((u) => [u.unit_id, u]))
const words = raw('words')
const formOf = new Map(words.map((w) => [w.word_id, w.form]))
const sentences = raw('sentences')
const sw = raw('sentence_words')
const NAMES = new Set(sw.filter((r) => r.notes === 'name').map((r) => String(r.surface).toLowerCase()))
const checkedWords = JSON.parse(readFileSync(join(ROOT, 'content/checks/words.json'), 'utf8'))
const POS = new Map(checkedWords.map((w) => [w.word_id, w.part_of_speech]))
const IRREGULAR = { man: 'men', woman: 'women', child: 'children', mouse: 'mice' }
const nounMeaning = new Map(checkedWords.filter((w) => w.part_of_speech === 'Noun').map((w) => {
  const g = (/^plural of /.test(w.gloss) ? w.lemma_gloss : w.gloss).split(/[,;(]/)[0].trim().toLowerCase().replace(/^(a|an|the) /, '')
  return [w.word_id, g]
}))
// The English carries each noun in the sense the course teaches (as in pull-units.mjs).
export const carriesNouns = (english, parts) => parts.every((p) => {
  const g = nounMeaning.get(p.word_id)
  if (!g) return true
  const e = english.toLowerCase()
  return [g, g + 's', g + 'es', IRREGULAR[g]].filter(Boolean).some((x) => new RegExp(`\\b${x}\\b`).test(e))
})
function analyse(text, index) {
  const a = analyseWords(text, index, { names: NAMES })
  if (a.unknown) return null
  for (let k = 0; k < a.parts.length; k++) {
    if (POS.get(a.parts[k].word_id) !== 'Article') continue
    const next = POS.get(a.parts[k + 1]?.word_id)
    if (!a.parts[k + 1] || (next && !['Noun', 'Adjective'].includes(next))) return null
  }
  return a
}

// The words each unit may use, as for its pull: main units take every earlier main unit; a topic pack takes Units 1 to 5.
const allowedFor = new Map()
const opened = new Set()
for (const u of units) {
  if (u.is_topic_pick === 'node') continue
  allowedFor.set(u.unit_id, new Set([...opened, u.unit_id]))
  if (u.is_topic_pick !== 'yes' && String(u.status).startsWith('live')) opened.add(u.unit_id)
}
for (const u of units.filter((x) => x.is_topic_pick === 'yes')) allowedFor.set(u.unit_id, new Set([...units.filter((x) => x.is_topic_pick !== 'yes' && x.is_topic_pick !== 'node' && x.order <= 5).map((x) => x.unit_id), u.unit_id]))
const contrastForms = (u) => new Set(String(u.contrast_sets).split(';').flatMap((x) => x.trim().split('|')).filter(Boolean))

const originals = sentences.filter((s) => s.source === 'tamago_original')
const inPairs = new Set(raw('qa_answers').flatMap((q) => [q.question_sentence_id, q.answer_sentence_id]))
const taken = new Set(sentences.map((s) => loose(s.french))) // the course, cut rows included: a cut sentence never returns

console.log('Tatoeba: loading exports')
const tatoeba = loadTatoeba()
const freq = tatoeba.englishWordCounts()
const plainness = (e) => {
  const ws = e.toLowerCase().match(/[a-z']+/g) ?? []
  return ws.reduce((n, w) => n + 1 / Math.log(2 + (freq.get(w) ?? 0)), 0) + ws.length * 0.05 + (e.includes('!') ? 0.3 : 0)
}
const trusted = (s) => { const t = tatoeba.trustOf(s); return t.native_owner || t.ok_tag }
const pool = tatoeba.french.filter((s) => trusted(s) && !/\d/.test(s.text) && !taken.has(loose(s.text)))
console.log(`checked Tatoeba sentences not in the course: ${pool.length}`)

// Analyse the pool once per vocabulary.
const analysed = new Map()
function candidatesFor(unitId) {
  if (analysed.has(unitId)) return analysed.get(unitId)
  const index = formIndexFor(words.filter((w) => allowedFor.get(unitId).has(w.first_unit)))
  const out = []
  for (const s of pool) {
    const a = analyse(s.text, index)
    if (!a || a.count < MIN_WORDS || a.count > MAX_WORDS) continue
    const english = [...new Set(tatoeba.englishFor(s.id))].filter((e) => carriesNouns(e, a.parts)).sort((x, y) => plainness(x) - plainness(y))
    if (!english.length) continue
    out.push({ s, parts: a.parts, ids: new Set(a.parts.map((p) => p.word_id).filter(Boolean)), english })
  }
  analysed.set(unitId, out)
  return out
}

const used = new Set()
const proposals = []
const kept = { pairs: 0, none: 0 }
for (const d of originals) {
  const u = unitById.get(d.unit_id)
  if (inPairs.has(d.sentence_id)) { kept.pairs++; proposals.push({ sentence_id: d.sentence_id, unit_id: d.unit_id, french: d.french, english: d.english, outcome: 'kept: question-and-answer pair' }); continue }
  const own = sw.filter((r) => r.sentence_id === d.sentence_id)
  const ownIds = new Set(own.map((r) => r.word_id).filter((id) => words.find((w) => w.word_id === id)?.first_unit === d.unit_id))
  const grammar = contrastForms(u)
  const draftForms = new Set(own.map((r) => formOf.get(r.word_id)).filter((f) => grammar.has(f)))
  const question = /\?\s*$/.test(d.french)
  const fits = candidatesFor(d.unit_id).filter((c) => !used.has(c.s.id)
    && [...ownIds].every((id) => c.ids.has(id))
    && [...draftForms].every((f) => c.parts.some((p) => formOf.get(p.word_id) === f))
    && /\?\s*$/.test(c.s.text) === question)
  // Closest first: fewest extra words, then nearest in length, then the plainest English.
  const draftLen = own.length
  fits.sort((x, y) => (x.ids.size - y.ids.size) || (Math.abs(x.parts.length - draftLen) - Math.abs(y.parts.length - draftLen)) || (plainness(x.english[0]) - plainness(y.english[0])))
  const best = fits[0]
  if (!best) { kept.none++; proposals.push({ sentence_id: d.sentence_id, unit_id: d.unit_id, french: d.french, english: d.english, outcome: 'kept: no match on Tatoeba' }); continue }
  used.add(best.s.id)
  const t = tatoeba.trustOf(best.s)
  proposals.push({
    sentence_id: d.sentence_id, unit_id: d.unit_id, french: d.french, english: d.english, outcome: 'replace',
    new_french: norm(best.s.text), new_english: best.english[0], other_english: best.english.slice(1), source_id: best.s.id, source_owner: best.s.owner,
    trust: t.native_owner ? 'native owner' : 'OK tag', alternatives: fits.slice(1, 4).map((c) => ({ french: norm(c.s.text), english: c.english[0], source_id: c.s.id, source_owner: c.s.owner })),
    words: best.parts.map((p) => ({ surface: p.surface, word_id: p.word_id ?? '', name: Boolean(p.name) })),
  })
}
writeFileSync(join(OUT, 'originals.json'), JSON.stringify({ made_at: new Date().toISOString().slice(0, 10), proposals }, null, 2) + '\n')
const esc = (x) => String(x ?? '').replace(/\|/g, '\\|')
const md = ['# Sweep, part 1: Tamago originals against checked Tatoeba sentences', '',
  `${originals.length} originals. Proposed replacements: ${proposals.filter((p) => p.outcome === 'replace').length}. Kept: ${kept.pairs} question-and-answer pairs, ${kept.none} with no match.`, '',
  '| ID | Unit | Draft | Tatoeba | English | Owner |', '| --- | --- | --- | --- | --- | --- |',
  ...proposals.filter((p) => p.outcome === 'replace').map((p) => `| ${p.sentence_id} | ${p.unit_id} | ${esc(p.french)} | [${esc(p.new_french)}](https://tatoeba.org/en/sentences/show/${p.source_id}) | ${esc(p.new_english)} | ${p.source_owner} (${p.trust}) |`)]
writeFileSync(join(OUT, 'originals.md'), md.join('\n') + '\n')
console.log(`originals ${originals.length}: replace ${proposals.filter((p) => p.outcome === 'replace').length}, kept pairs ${kept.pairs}, kept no match ${kept.none}`)
