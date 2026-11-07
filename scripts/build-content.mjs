// content/raw + content/checks -> public/content/<table>.json, the only content the app can load.
// Sentences ship only as checked or dan_reviewed, answers only as checked. A unit stays draft until
// Dan's approval is recorded; the app shows only live units. The Phase 0 done test prints at the end.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'))
const OUT = join(ROOT, 'public/content')
const INTERNAL = new Set(['runtime_schema', 'can_do']) // can_do stays draft; not needed in Phase 1
const decisions = read('content/review-decisions.json')

const checks = { s: read('content/checks/sentences.json'), w: read('content/checks/words.json'), a: read('content/checks/accepted_answers.json') }
const sCheck = new Map(checks.s.map((r) => [r.sentence_id, r]))
const wCheck = new Map(checks.w.map((r) => [r.word_id, r]))
const aCheck = new Map(checks.a.map((r) => [r.answer_id, r]))

const tables = {}
for (const f of readdirSync(join(ROOT, 'content/raw'))) {
  const name = f.replace('.json', '')
  if (!INTERNAL.has(name)) tables[name] = read(`content/raw/${f}`)
}

// Workbook columns keep their names; lingua_libre, source_owner, english_source, native_check,
// gloss_full and lemma_gloss are additions.
tables.sentences = tables.sentences.flatMap((s) => {
  const c = sCheck.get(s.sentence_id)
  if (!['checked', 'dan_reviewed'].includes(c?.status) || c.draft_french !== s.french) return []
  return [{ ...s, french: c.french, english: c.english, source: c.source, source_id: c.source_id, source_owner: c.source_owner, status: c.status, english_source: c.english_source, native_check: c.native_check, audio_source: c.audio_source, lingua_libre: c.lingua_libre }]
})
const live = new Set(tables.sentences.map((s) => s.sentence_id))
const replaced = (id) => sCheck.get(id)?.sentence_words
tables.sentence_words = [
  ...tables.sentence_words.filter((sw) => live.has(sw.sentence_id) && !replaced(sw.sentence_id)),
  ...[...live].filter(replaced).flatMap((id) => replaced(id).map((sw) => ({ sentence_id: id, ...sw }))),
]
tables.accepted_answers = tables.accepted_answers.flatMap((a) => {
  const c = aCheck.get(a.answer_id)
  return c?.status === 'checked' && live.has(a.sentence_id) ? [{ ...a, source: c.source, source_id: c.source_id, status: 'checked' }] : []
})
tables.words = tables.words.flatMap((w) => {
  const c = wCheck.get(w.word_id)
  if (c?.status !== 'checked') return []
  return [{ ...w, lemma: c.lemma, part_of_speech: c.part_of_speech, gender: c.gender, gloss: c.gloss, gloss_full: c.gloss_full, lemma_gloss: c.lemma_gloss, status: 'checked' }]
})

tables.units = tables.units.map((u) => decisions.units?.[u.unit_id]?.action === 'approve' ? { ...u, status: 'live' } : u)

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
for (const [name, rows] of Object.entries(tables)) writeFileSync(join(OUT, `${name}.json`), JSON.stringify(rows, null, 2) + '\n')

// Gate: read back what was written.
const out = (t) => JSON.parse(readFileSync(join(OUT, `${t}.json`), 'utf8'))
const bad = []
for (const s of out('sentences')) {
  if (s.status !== 'checked' && s.status !== 'dan_reviewed') bad.push(`${s.sentence_id} status ${s.status}`)
  if (s.source === 'claude_draft') bad.push(`${s.sentence_id} is a Claude draft`)
  if (s.source === 'tamago_original' && !s.native_check) bad.push(`${s.sentence_id} has no native_check marker`)
  if (s.source === 'tatoeba' && !s.source_id) bad.push(`${s.sentence_id} has no source_id`)
}
for (const a of out('accepted_answers')) if (a.status !== 'checked') bad.push(`${a.answer_id} status ${a.status}`)
for (const w of out('words')) if (!w.part_of_speech || !w.gloss) bad.push(`${w.word_id} missing Wiktionary data`)
if (bad.length) {
  console.error('Build gate failed:\n  ' + bad.join('\n  '))
  process.exit(1)
}

const u1 = out('sentences').filter((s) => s.unit_id === 'U01')
const original = u1.filter((s) => s.source === 'tamago_original').length
const wordCount = out('words').length
const unit = out('units').find((u) => u.unit_id === 'U01')
const done = u1.length >= 30 && wordCount >= 18
console.log(`Unit 1: ${u1.length} sentences cleared (${u1.length - original} Tatoeba, ${original} Tamago originals), ${wordCount} of 18 words. Unit status: ${unit.status}. Phase 0 done test: ${done ? 'PASSED' : 'NOT YET'}.`)
