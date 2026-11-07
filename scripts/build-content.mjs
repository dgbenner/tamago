// content/raw + content/checks -> public/content/<table>.json, the only content the app can load.
// Sentences and answers ship only with status "checked". The Phase 0 done test prints at the end.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'))
const OUT = join(ROOT, 'public/content')
const INTERNAL = new Set(['runtime_schema'])

const checks = { s: read('content/checks/sentences.json'), w: read('content/checks/words.json'), a: read('content/checks/accepted_answers.json') }
const sCheck = new Map(checks.s.map((r) => [r.sentence_id, r]))
const wCheck = new Map(checks.w.map((r) => [r.word_id, r]))
const aCheck = new Map(checks.a.map((r) => [r.answer_id, r]))

const tables = {}
for (const f of readdirSync(join(ROOT, 'content/raw'))) {
  const name = f.replace('.json', '')
  if (!INTERNAL.has(name)) tables[name] = read(`content/raw/${f}`)
}

// Workbook columns keep their names; lingua_libre, source_owner, gloss_full and lemma_gloss are additions.
tables.sentences = tables.sentences.flatMap((s) => {
  const c = sCheck.get(s.sentence_id)
  if (c?.status !== 'checked' || c.draft_french !== s.french) return []
  return [{ ...s, french: c.french, english: c.english, source: c.source, source_id: c.source_id, source_owner: c.source_owner, status: 'checked', audio_source: c.audio_source, lingua_libre: c.lingua_libre }]
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

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
for (const [name, rows] of Object.entries(tables)) writeFileSync(join(OUT, `${name}.json`), JSON.stringify(rows, null, 2) + '\n')

// Gate: read back what was written.
const out = (t) => JSON.parse(readFileSync(join(OUT, `${t}.json`), 'utf8'))
const bad = []
for (const s of out('sentences')) {
  if (s.status !== 'checked') bad.push(`${s.sentence_id} status ${s.status}`)
  if (s.source === 'claude_draft') bad.push(`${s.sentence_id} is a Claude draft`)
  if (s.source === 'tatoeba' && !s.source_id) bad.push(`${s.sentence_id} has no source_id`)
}
for (const a of out('accepted_answers')) if (a.status !== 'checked') bad.push(`${a.answer_id} status ${a.status}`)
for (const w of out('words')) if (!w.part_of_speech || !w.gloss) bad.push(`${w.word_id} missing Wiktionary data`)
if (bad.length) {
  console.error('Build gate failed:\n  ' + bad.join('\n  '))
  process.exit(1)
}

const u1 = out('sentences').filter((s) => s.unit_id === 'U01').length
const wordCount = out('words').length
const done = u1 >= 30 && wordCount >= 18
console.log(`Unit 1: ${u1} of 30 sentences live, ${wordCount} of 18 words live. Phase 0 done test: ${done ? 'PASSED' : 'NOT YET'}.`)
