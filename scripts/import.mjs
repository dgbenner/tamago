// Workbook -> content/raw/<table>.json. Fails (exit 1) on broken IDs.
// Usage: node scripts/import.mjs [path/to/workbook.xlsx]
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'

const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const WORKBOOK = process.argv[2] ?? join(ROOT, '_source/tamago-data.xlsx')
const OUT = join(ROOT, 'content/raw')

const wb = XLSX.readFile(WORKBOOK)
const tables = {}
for (const name of wb.SheetNames) {
  if (name === 'README') continue
  tables[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: '' })
}

const errors = []
const fail = (msg) => errors.push(msg)

const PRIMARY_KEYS = {
  languages: 'lang_id', units: 'unit_id', can_do: 'can_do_id', sentences: 'sentence_id',
  words: 'word_id', question_types: 'type_id', variants: 'variant_id', rounds: 'round',
  accepted_answers: 'answer_id', flag_reasons: 'reason_id', topics_pool: 'topic_id',
  settings_defaults: 'setting',
}
const ids = {}
for (const [table, key] of Object.entries(PRIMARY_KEYS)) {
  if (!tables[table]) { fail(`missing tab: ${table}`); tables[table] = [] }
  ids[table] = new Set()
  for (const [i, row] of tables[table].entries()) {
    const id = row[key]
    if (id === '') fail(`${table} row ${i + 2}: blank ${key}`)
    else if (ids[table].has(id)) fail(`${table}: duplicate ${key} ${id}`)
    ids[table].add(id)
  }
}

// [table, column, referenced table]. Blank values are allowed only where noted below.
const REFS = [
  ['units', 'lang_id', 'languages'], ['can_do', 'unit_id', 'units'],
  ['sentences', 'unit_id', 'units'], ['words', 'lang_id', 'languages'],
  ['words', 'first_unit', 'units'], ['variants', 'type_id', 'question_types'],
  ['round_type_mix', 'round', 'rounds'], ['round_type_mix', 'type_id', 'question_types'],
  ['accepted_answers', 'sentence_id', 'sentences'], ['sentence_words', 'sentence_id', 'sentences'],
]
for (const [table, col, target] of REFS) {
  for (const [i, row] of (tables[table] ?? []).entries()) {
    if (!ids[target].has(row[col])) fail(`${table} row ${i + 2}: ${col} "${row[col]}" not in ${target}`)
  }
}
for (const u of tables.units) {
  for (const id of String(u.can_do_ids).split(';').filter(Boolean)) {
    if (!ids.can_do.has(id)) fail(`units ${u.unit_id}: can_do_ids "${id}" not in can_do`)
  }
}

// sentence_words: every token maps to a word, unless it is marked as a name,
// and the surfaces appear in order inside the French.
const swBySentence = new Map()
for (const [i, sw] of (tables.sentence_words ?? []).entries()) {
  if (sw.word_id === '' && sw.notes !== 'name') fail(`sentence_words row ${i + 2}: blank word_id and not marked name`)
  if (sw.word_id !== '' && !ids.words.has(sw.word_id)) fail(`sentence_words row ${i + 2}: word_id "${sw.word_id}" not in words`)
  if (!swBySentence.has(sw.sentence_id)) swBySentence.set(sw.sentence_id, [])
  swBySentence.get(sw.sentence_id).push(sw)
}
for (const s of tables.sentences) {
  const parts = swBySentence.get(s.sentence_id)
  if (!parts) { fail(`sentences ${s.sentence_id}: no sentence_words rows`); continue }
  let at = 0
  for (const p of [...parts].sort((a, b) => a.position - b.position)) {
    const found = s.french.toLowerCase().indexOf(String(p.surface).toLowerCase(), at)
    if (found < 0) fail(`sentence_words ${s.sentence_id}: "${p.surface}" not found in order in "${s.french}"`)
    else at = found + String(p.surface).length
  }
}
const usedWords = new Set((tables.sentence_words ?? []).map((sw) => sw.word_id))
for (const w of tables.words) {
  if (!usedWords.has(w.word_id)) fail(`words ${w.word_id} "${w.form}": used by no sentence`)
}

// A pair_id links exactly one question and one answer.
const pairs = new Map()
for (const s of tables.sentences) {
  if (s.pair_id) pairs.set(s.pair_id, [...(pairs.get(s.pair_id) ?? []), s.sentence_id])
}
for (const [id, members] of pairs) {
  if (members.length !== 2) fail(`pair_id ${id}: expected 2 sentences, got ${members.join(', ')}`)
}

// round_type_mix: the rules of thumb from question-types.md section 4.
const typeById = new Map(tables.question_types.map((t) => [t.type_id, t]))
for (const r of tables.rounds) {
  const rows = (tables.round_type_mix ?? []).filter((m) => m.round === r.round)
  const total = rows.reduce((n, m) => n + m.questions_per_10, 0)
  if (total !== 10) fail(`round_type_mix round ${r.round}: adds to ${total}, not 10`)
  if (!rows.some((m) => typeById.get(m.type_id)?.skill === 'listening')) fail(`round_type_mix round ${r.round}: no listening type`)
  for (const m of rows) {
    const t = typeById.get(m.type_id)
    if (m.questions_per_10 > 3) fail(`round_type_mix round ${r.round}: ${m.type_id} more than 3 times`)
    if (t && (r.round < t.first_round || r.round > t.last_round)) {
      fail(`round_type_mix round ${r.round}: ${m.type_id} outside its rounds ${t.first_round} to ${t.last_round}`)
    }
  }
}

if (errors.length) {
  console.error(`Import failed, ${errors.length} problem(s). Nothing was written.`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
for (const [name, rows] of Object.entries(tables)) {
  writeFileSync(join(OUT, `${name}.json`), JSON.stringify(rows, null, 2) + '\n')
}
console.log(`Imported ${Object.keys(tables).length} tables, IDs clean: ` +
  `${tables.sentences.length} sentences, ${tables.words.length} words, ${tables.sentence_words.length} sentence_words.`)
