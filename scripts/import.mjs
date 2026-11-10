// Workbook -> content/raw/<table>.json. Fails (exit 1) on broken IDs.
// Usage: node scripts/import.mjs [path/to/workbook.xlsx]
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { analyse, formIndexFor } from './lib/french.mjs'
import { join } from 'node:path'
import { createRequire } from 'node:module'

const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const WORKBOOK = process.argv[2] ?? join(ROOT, '_source/tamago-data-v18.xlsx')
const OUT = join(ROOT, 'content/raw')

const wb = XLSX.readFile(WORKBOOK)
const tables = {}
for (const name of wb.SheetNames) {
  if (name === 'README') continue
  tables[name] = XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: '' })
}

const errors = []
const fail = (msg) => errors.push(msg)

// Content from outside the workbook, until the workbook catches up. Each row says where it came from.
for (const t of ['sentences', 'sentence_words', 'accepted_answers', 'qa_answers', 'words']) tables[t] ??= []
for (const s of tables.sentences) s.origin = 'workbook'
const decisions = JSON.parse(readFileSync(join(ROOT, 'content/review-decisions.json'), 'utf8'))
// Words Dan added to a unit.
const wordIds = new Set(tables.words.map((w) => w.word_id))
for (const w of decisions.vocabulary_additions ?? []) if (!wordIds.has(w.word_id)) tables.words.push({ ...w, origin: 'decision' })
// Sentences pulled from Tatoeba (content/pull/U0x.json).
const PULL = join(ROOT, 'content/pull')
for (const f of existsSync(PULL) ? readdirSync(PULL).filter((x) => /^U\d+\.json$/.test(x)).sort() : []) {
  const p = JSON.parse(readFileSync(join(PULL, f), 'utf8'))
  const inBook = new Set(tables.sentences.map((s) => s.sentence_id))
  for (const s of p.sentences) { if (inBook.has(s.sentence_id)) continue; const { other_english, ...row } = s; tables.sentences.push({ ...row, origin: 'pull' }) }
  tables.sentence_words.push(...p.sentence_words.filter((r) => !inBook.has(r.sentence_id)))
  const ansIds = new Set(tables.accepted_answers.map((a) => a.answer_id))
  tables.accepted_answers.push(...p.accepted_answers.filter((a) => !ansIds.has(a.answer_id)))
  const qaKeys = new Set(tables.qa_answers.map((q) => q.question_sentence_id + '>' + q.answer_sentence_id))
  tables.qa_answers.push(...p.qa_answers.filter((q) => !qaKeys.has(q.question_sentence_id + '>' + q.answer_sentence_id)))
}
// Grammar notes (content/grammar_notes.json) until the workbook has its grammar_notes tab rows.
const NOTES = join(ROOT, 'content/grammar_notes.json')
tables.grammar_notes ??= []
if (existsSync(NOTES)) {
  const have = new Set(tables.grammar_notes.map((n) => n.unit_id))
  for (const n of JSON.parse(readFileSync(NOTES, 'utf8')).notes) if (!have.has(n.unit_id)) tables.grammar_notes.push(n)
}
// Pictures for word to image (content/images.json) fill words.image_file where the workbook has none.
const IMAGES = join(ROOT, 'content/images.json')
if (existsSync(IMAGES)) {
  const img = JSON.parse(readFileSync(IMAGES, 'utf8'))
  for (const w of tables.words) if (!w.image_file && img.words[w.word_id]) w.image_file = `openmoji/${img.words[w.word_id]}.svg`
}

// can_do statements checked against the CEFR A1 grid (content/cefr_a1.json), until the workbook carries it.
const CEFR = join(ROOT, 'content/cefr_a1.json')
if (existsSync(CEFR)) {
  const grid = JSON.parse(readFileSync(CEFR, 'utf8'))
  for (const c of tables.can_do ?? []) {
    const row = grid.statements[c.can_do_id]
    if (row && !c.cefr_row) Object.assign(c, { cefr_row: row, cefr_descriptor: grid.rows[row], source: `checked against ${grid.source}, ${row}` })
  }
}

// Sentences Claude drafted at Dan's request (content/drafts.json), split into words here.
const DRAFTS = join(ROOT, 'content/drafts.json')
if (existsSync(DRAFTS)) {
  const drafts = JSON.parse(readFileSync(DRAFTS, 'utf8'))
  const names = new Set(tables.sentence_words.filter((r) => r.notes === 'name').map((r) => String(r.surface).toLowerCase()))
  const unitOrder = new Map(tables.units.map((u) => [u.unit_id, u.order]))
  const inBook = new Set(tables.sentences.map((s) => s.sentence_id))
  for (const d of drafts.sentences) {
    if (inBook.has(d.sentence_id)) continue
    const known = tables.words.filter((w) => unitOrder.get(w.first_unit) <= unitOrder.get(d.unit_id))
    const a = analyse(d.french, formIndexFor(known), { names })
    if (a.unknown) { fail(`drafts ${d.sentence_id} "${d.french}": "${a.unknown}" is not a word of ${d.unit_id} or earlier`); continue }
    tables.sentences.push({ sentence_id: d.sentence_id, unit_id: d.unit_id, french: d.french, english: d.english, pair_id: '',
      // A draft the check later found on Tatoeba carries its source and is treated as a pulled row.
      ...(d.source === 'tatoeba'
        ? { source: 'tatoeba', source_id: d.source_id, source_owner: d.source_owner, status: 'pulled: awaiting approval', origin: 'pull' }
        : { source: 'tamago_original', source_id: '', status: 'live: native check before Phase 4', origin: 'draft' }),
      audio_source: 'tts', max_round: 5, notes: d.notes ?? 'drafted by Claude at Dan\'s request' })
    a.parts.forEach((p, k) => tables.sentence_words.push({ sentence_id: d.sentence_id, position: k + 1, surface: p.surface, word_id: p.word_id, notes: p.name ? 'name' : '', hint_override: '' }))
  }
  const qaKeys = new Set(tables.qa_answers.map((q) => q.question_sentence_id + '>' + q.answer_sentence_id))
  for (const q of drafts.qa_answers ?? []) if (!qaKeys.has(q.question_sentence_id + '>' + q.answer_sentence_id)) tables.qa_answers.push(q)
}

// Unit icons (content/unit-icons.json, from scripts/assign-icons.mjs) fill the units' icon_group and icon_file columns.
{
  const ICONS = join(ROOT, 'content/unit-icons.json')
  const icons = existsSync(ICONS) ? JSON.parse(readFileSync(ICONS, 'utf8')) : {}
  for (const u of tables.units) if (icons[u.unit_id] && !u.icon_file) Object.assign(u, { icon_group: icons[u.unit_id].group, icon_file: icons[u.unit_id].file })
}

// Answers learners flagged as "should be accepted" and Dan approved on his device (Flag review, Phase 4), folded in by
// scripts/import-flags.mjs. Skipped once the workbook holds them.
{
  const have = new Set(tables.accepted_answers.map((x) => x.answer_id))
  for (const x of decisions.accepted_additions ?? []) if (!have.has(x.answer_id)) tables.accepted_answers.push({ ...x, origin: 'flag' })
}

const PRIMARY_KEYS = {
  languages: 'lang_id', units: 'unit_id', can_do: 'can_do_id', sentences: 'sentence_id',
  words: 'word_id', question_types: 'type_id', variants: 'variant_id', rounds: 'round',
  accepted_answers: 'answer_id', flag_reasons: 'reason_id', topics_pool: 'topic_id',
  settings_defaults: 'setting', feedback_phrases: 'phrase_id',
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
// Only a live unit's words must be in use; a draft unit's sentences arrive with the Tatoeba pull.
const liveUnits = new Set(tables.units.filter((u) => String(u.status).startsWith('live')).map((u) => u.unit_id))
for (const w of tables.words) {
  if (liveUnits.has(w.first_unit) && !usedWords.has(w.word_id)) fail(`words ${w.word_id} "${w.form}": used by no sentence`)
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

// phase1_fallbacks: a missing type in a round's mix, swapped for a type allowed in that round.
for (const [i, f] of (tables.phase1_fallbacks ?? []).entries()) {
  const where = `phase1_fallbacks row ${i + 2}`
  const sub = typeById.get(f.substitute_type)
  if (!typeById.has(f.missing_type)) fail(`${where}: missing_type "${f.missing_type}" not in question_types`)
  if (!sub) fail(`${where}: substitute_type "${f.substitute_type}" not in question_types`)
  else if (f.round < sub.first_round || f.round > sub.last_round) fail(`${where}: ${f.substitute_type} outside its rounds`)
  if (!tables.round_type_mix.some((m) => m.round === f.round && m.type_id === f.missing_type)) fail(`${where}: ${f.missing_type} is not in round ${f.round}`)
}
// cant_swaps: the replacement type (and variant, if named) must exist; rounds reads "all", "2" or "3-5".
for (const [i, c] of (tables.cant_swaps ?? []).entries()) {
  if (!typeById.has(c.type)) fail(`cant_swaps row ${i + 2}: type "${c.type}" not in question_types`)
  const m = String(c.replaced_by).match(/^(QT\d+)(?: variant (V\d+))?$/)
  if (!m) { fail(`cant_swaps row ${i + 2}: cannot read "${c.replaced_by}"`); continue }
  if (!typeById.has(m[1])) fail(`cant_swaps row ${i + 2}: "${m[1]}" not in question_types`)
  if (m[2] && !ids.variants.has(m[2])) fail(`cant_swaps row ${i + 2}: "${m[2]}" not in variants`)
  if (!/^(all|\d(-\d)?)$/.test(String(c.rounds))) fail(`cant_swaps row ${i + 2}: cannot read rounds "${c.rounds}"`)
}
// feedback_phrases: known contexts and languages; French lines carry their English.
for (const [i, f] of (tables.feedback_phrases ?? []).entries()) {
  if (!['correct', 'incorrect', 'typo', 'accent'].includes(f.context)) fail(`feedback_phrases row ${i + 2}: unknown context "${f.context}"`)
  if (!['en', 'fr'].includes(f.language)) fail(`feedback_phrases row ${i + 2}: unknown language "${f.language}"`)
  if (f.language === 'fr' && !f.english) fail(`feedback_phrases row ${i + 2}: French line without its English`)
}
// variants: use_in_rounds reads empty, "3", "1-2" or "<setting> only".
for (const [i, v] of tables.variants.entries()) {
  if (!/^(|\d(-\d)?|\w+ only)$/.test(String(v.use_in_rounds ?? ''))) fail(`variants row ${i + 2}: cannot read use_in_rounds "${v.use_in_rounds}"`)
}
// tree_layout: every unit placed once; unlocks_after names an earlier row.
const placed = new Map()
for (const [i, t] of (tables.tree_layout ?? []).entries()) {
  if (!ids.units.has(t.unit_id)) fail(`tree_layout row ${i + 2}: unit "${t.unit_id}" not in units`)
  if (placed.has(t.unit_id)) fail(`tree_layout: ${t.unit_id} placed twice`)
  placed.set(t.unit_id, t.row)
  const m = String(t.unlocks_after).match(/^row (\d+)$/)
  if (t.unlocks_after !== '' && !(m && Number(m[1]) < t.row)) fail(`tree_layout row ${i + 2}: cannot read unlocks_after "${t.unlocks_after}"`)
}
// Topic packs are reached through the topic node, not placed in the tree themselves.
for (const u of tables.units) if (!placed.has(u.unit_id) && u.is_topic_pick !== 'yes') fail(`units ${u.unit_id}: not in tree_layout`)
// qa_answers: both sides are sentences.
for (const [i, q] of (tables.qa_answers ?? []).entries()) {
  for (const col of ['question_sentence_id', 'answer_sentence_id']) {
    if (!ids.sentences.has(q[col])) fail(`qa_answers row ${i + 2}: ${col} "${q[col]}" not in sentences`)
  }
}
// contrast_sets: "un|une; suis|es", every member a word.
const forms = new Set(tables.words.map((w) => w.form))
for (const u of tables.units) {
  for (const set of String(u.contrast_sets ?? '').split(';').map((x) => x.trim()).filter(Boolean)) {
    for (const form of set.split('|')) if (!forms.has(form)) fail(`units ${u.unit_id}: contrast "${form}" not in words`)
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
