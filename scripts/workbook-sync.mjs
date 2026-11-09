// Folds everything kept outside the workbook back into it, as the next version: Dan's and Claude's decisions,
// the Tatoeba pulls and the drafts, Wiktionary data and hints for words, units approved to live, cut sentences off.
// Usage: node scripts/workbook-sync.mjs <from.xlsx> <to.xlsx> "<changelog line>"
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'

const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const [from, to, note] = process.argv.slice(2)
if (!from || !to || !note) throw new Error('usage: workbook-sync.mjs <from.xlsx> <to.xlsx> "<changelog line>"')
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'))

const wb = XLSX.readFile(join(ROOT, from))
const sheet = (name) => XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: '' })
const header = (name) => XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: '' })[0]
// Writes rows back, keeping the sheet's columns in order and adding any new ones at the end (add columns, never rename).
const save = (name, rows) => {
  const cols = [...(wb.Sheets[name] ? header(name) : [])]
  for (const r of rows) for (const k of Object.keys(r)) if (!cols.includes(k)) cols.push(k)
  wb.Sheets[name] = XLSX.utils.json_to_sheet(rows, { header: cols })
  if (!wb.SheetNames.includes(name)) wb.SheetNames.push(name)
}

const decisions = read('content/review-decisions.json')
const raw = (t) => read(`content/raw/${t}.json`)
const checks = { words: new Map(read('content/checks/words.json').map((w) => [w.word_id, w])), sentences: new Map(read('content/checks/sentences.json').map((s) => [s.sentence_id, s])) }
const built = new Map(read('src/content/words.json').map((w) => [w.word_id, w]))

// Units: approved ones go live.
save('units', sheet('units').map((u) => (decisions.units?.[u.unit_id]?.action === 'approve' && !String(u.status).startsWith('live') ? { ...u, status: 'live' } : u)))

// Words: workbook rows plus additions, with blanks filled from Wiktionary and the built hints.
const words = [...sheet('words')]
for (const w of decisions.vocabulary_additions ?? []) if (!words.some((x) => x.word_id === w.word_id)) words.push(w)
save('words', words.map((w) => {
  const c = checks.words.get(w.word_id)
  const b = built.get(w.word_id)
  if (!c || c.status !== 'checked') return w
  const out = { ...w }
  for (const col of ['lemma', 'part_of_speech', 'gender', 'gloss']) if (out[col] === '' || out[col] == null) out[col] = c[col]
  if (!out.hint && b?.hint) { out.hint = b.hint; out.hint_source = b.hint_source === 'Dan, review decisions' ? 'short form of Wiktionary' : b.hint_source === 'Wiktionary (built)' ? 'Wiktionary' : b.hint_source }
  if (String(out.status).startsWith('pull from')) out.status = 'checked'
  return out
}))

// Sentences, words in sentences, answers and QT09 pairs merged at import: write the ones the workbook lacks.
const rawSentences = raw('sentences')
const have = new Set(sheet('sentences').map((s) => s.sentence_id))
const cut = new Set(decisions.cut_sentences ?? [])
const unitLive = (id) => decisions.units?.[id]?.action === 'approve'
const sentences = [...sheet('sentences'), ...rawSentences.filter((s) => s.origin !== 'workbook' && !have.has(s.sentence_id)).map((s) => {
  const { origin, source_owner, ...row } = s
  const c = checks.sentences.get(s.sentence_id)
  const status = cut.has(s.sentence_id) ? 'off: cut in review' : origin === 'draft' ? 'live: native check before Phase 4' : unitLive(s.unit_id) ? 'live' : 'draft'
  return { ...row, source_id: c?.source_id ?? row.source_id, audio_source: c?.audio_source ?? row.audio_source, status }
})].map((s) => (cut.has(s.sentence_id) && !String(s.status).startsWith('off') ? { ...s, status: 'off: cut in review' } : s))
save('sentences', sentences)
const inSheet = new Set(sentences.map((s) => s.sentence_id))
const swKey = (r) => `${r.sentence_id}:${r.position}`
const swHave = new Set(sheet('sentence_words').map(swKey))
save('sentence_words', [...sheet('sentence_words'), ...raw('sentence_words').filter((r) => inSheet.has(r.sentence_id) && !swHave.has(swKey(r)))])
const ansHave = new Set(sheet('accepted_answers').map((a) => a.answer_id))
save('accepted_answers', [...sheet('accepted_answers'), ...raw('accepted_answers').filter((a) => !ansHave.has(a.answer_id)).map((a) => ({ ...a, status: a.status === 'pulled' ? 'live' : a.status }))])
const qaKey = (q) => `${q.question_sentence_id}>${q.answer_sentence_id}`
const qaHave = new Set(sheet('qa_answers').map(qaKey))
save('qa_answers', [...sheet('qa_answers'), ...raw('qa_answers').filter((q) => !qaHave.has(qaKey(q)))])

// Which earlier sentences a unit's lessons may use: a new column on units.
if (decisions.borrow) save('units', sheet('units').map((u) => ({ ...u, borrowed_sentence_ids: (decisions.borrow[u.unit_id] ?? []).join(';') })))

// Pictures: image_file from the import (content/images.json) where the workbook has none.
const imageOf = new Map(raw('words').filter((w) => w.image_file).map((w) => [w.word_id, w.image_file]))
save('words', sheet('words').map((w) => (!w.image_file && imageOf.has(w.word_id) ? { ...w, image_file: imageOf.get(w.word_id) } : w)))

// Grammar notes: a tab of their own.
const notes = raw('grammar_notes') ?? []
if (notes.length) save('grammar_notes', notes.map(({ examples, conjugations, ...n }) => n))

// Phase 1 fallbacks: a status column. Rows for types now built are off (kept, never deleted); word to image keeps
// its rows for units with too few pictured words, and Answer the question its rows for units with no question pairs.
const builtTypes = new Set(['QT02', 'QT09', 'QT10', 'QT13'])
save('phase1_fallbacks', sheet('phase1_fallbacks').map((f) => ({
  ...f,
  status: f.missing_type === 'QT02' ? 'live: used when a unit has fewer than 3 pictured words'
    : String(f.status).includes('no question pairs') ? f.status
    : builtTypes.has(f.missing_type) ? 'off: type built' : (f.status || 'live'),
})))

// can_do: the CEFR grid check (cefr_row, cefr_descriptor, source) carried in from content/cefr_a1.json.
const canDoRaw = new Map(raw('can_do').map((c) => [c.can_do_id, c]))
save('can_do', sheet('can_do').map((c) => { const r = canDoRaw.get(c.can_do_id); return r?.cefr_row ? { ...c, source: r.source, cefr_row: r.cefr_row, cefr_descriptor: r.cefr_descriptor } : c }))

// lesson_rules: the rules Phase 2c added.
const ruleRows = [{"rule_id":"R22","topic":"Score","rule":"A round finished for the first time adds to each skill by its share of that round's answers (after swaps). Every A1 round brings a skill to 29; each review item cleared adds 0.1. A skill reaches 30 (A2) only with every A1 unit through round 5 and every A1 I can for it checked; until then it stops at 29.9.","notes":"Phase 2c; the rate was open in the feature list"},{"rule_id":"R23","topic":"Strength","rule":"Each item has an FSRS card; a first attempt rates it (right Good, typo Hard, wrong Again). A unit shows 0 to 4 bars from its items' average recall now: 90% or more 4, 80% 3, 70% 2, less 1.","notes":"Phase 2c"},{"rule_id":"R24","topic":"Practice weak skills","rule":"The ten items with the lowest recall across open units, in a type that fits the unit's stage (round 1 to 2 Pick the meaning, 3 to 4 build English to French, 5 typed). Earns points; moves no score or round.","notes":"Phase 2c"},{"rule_id":"R25","topic":"I can checks","rule":"A statement ticks only after a check: three of the unit's sentences in its skill (listening Pick what you heard, reading Pick the meaning, writing typed translation, speaking Speak from memory), all graded ones right. Opens once the unit has finished round 1.","notes":"Phase 2c; learning-methods 17"},{"rule_id":"R26","topic":"Placement","rule":"Three questions per unit in tree order. A unit with 2 of 3 right counts round 1 as done, up to the first unit that falls short. Never lowers progress. Misses stay out of the review bank.","notes":"Phase 2c"},{"rule_id":"R27","topic":"Streak and weekly goal","rule":"A day counts when any session is finished. The streak shows from 2 days; the weekly goal counts days since Monday. Both hide with Points and streaks off. No reminders and no message after a missed day.","notes":"Phase 2c"}]
const haveRules = new Set(sheet('lesson_rules').map((r) => r.rule_id))
save('lesson_rules', [...sheet('lesson_rules'), ...ruleRows.filter((r) => !haveRules.has(r.rule_id))])

// Feedback lines retired in review: status off, never deleted.
const phrasesOff = new Set(decisions.phrases_off?.ids ?? [])
if (phrasesOff.size && wb.Sheets.feedback_phrases) save('feedback_phrases', sheet('feedback_phrases').map((f) => (phrasesOff.has(f.phrase_id) && !String(f.status).startsWith('off') ? { ...f, status: 'off: retired in the craft review' } : f)))

// README: version and changelog.
const readme = sheet('README')
const version = to.match(/v(\d+)/)?.[1]
save('README', [...readme.map((r) => (r.item === 'Version' ? { ...r, notes: `Workbook v${version}, ${new Date().toISOString().slice(0, 10)}. ${note}` } : r)), { item: `Changes to v${version}`, notes: note }])

XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}: ${sentences.length} sentences, ${words.length} words.`)
