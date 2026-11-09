// content/raw + content/checks -> src/content/<table>.json, bundled into the app so a lesson needs
// no network. The workbook's status is the gate; the checks must agree with it or the build fails.
// Lingua Libre recordings for live sentences are copied to public/audio.
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { getFile } from './lib/http.mjs'

const ROOT = join(import.meta.dirname, '..')
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'))
const raw = (t) => read(`content/raw/${t}.json`)
const OUT = join(ROOT, 'src/content')
const AUDIO = join(ROOT, 'public/audio')
const SHIPPED_AS_IS = ['units', 'question_types', 'variants', 'rounds', 'round_type_mix', 'phase1_fallbacks', 'flag_reasons', 'settings_defaults']
const fCheck = new Map(read('content/checks/feedback_phrases.json').map((r) => [r.phrase_id, r]))

const decisions = read('content/review-decisions.json')
const sCheck = new Map(read('content/checks/sentences.json').map((r) => [r.sentence_id, r]))
const wCheck = new Map(read('content/checks/words.json').map((r) => [r.word_id, r]))
const aCheck = new Map(read('content/checks/accepted_answers.json').map((r) => [r.answer_id, r]))
const generated = read('content/checks/generated_answers.json')

const bad = []
const isLive = (row) => String(row.status).startsWith('live')
const tables = Object.fromEntries(SHIPPED_AS_IS.map((t) => [t, raw(t)]))

for (const u of tables.units) {
  if (isLive(u) && decisions.units?.[u.unit_id]?.action !== 'approve') bad.push(`${u.unit_id} is live without Dan's approval`)
}

// Sentences: live in the workbook and passed by the check, with the same source.
tables.sentences = raw('sentences').flatMap((s) => {
  if (!isLive(s)) return []
  const c = sCheck.get(s.sentence_id)
  if (!['checked', 'dan_reviewed'].includes(c?.status)) { bad.push(`${s.sentence_id} live in the workbook, check says ${c?.status}`); return [] }
  if (String(s.source_id) !== String(c.source_id)) bad.push(`${s.sentence_id} workbook source_id ${s.source_id}, check found ${c.source_id}`)
  if (s.source !== c.source) bad.push(`${s.sentence_id} workbook source ${s.source}, check found ${c.source}`)
  if (s.audio_source !== c.audio_source) bad.push(`${s.sentence_id} workbook audio ${s.audio_source}, check found ${c.audio_source}`)
  const native_check = String(s.status).includes('native check') ? 'needed before Phase 4' : ''
  if (s.source === 'tamago_original' && !native_check) bad.push(`${s.sentence_id} is original with no native check marker`)
  return [{ ...s, source_id: String(s.source_id), status: 'live', native_check, source_owner: c.source_owner, english_source: c.english_source, lingua_libre: c.lingua_libre }]
})
const live = new Set(tables.sentences.map((s) => s.sentence_id))
tables.sentence_words = raw('sentence_words').filter((sw) => live.has(sw.sentence_id))

// Words: the workbook carries Wiktionary's data and the hint; the check confirms it still agrees.
// A unit's words ship once the unit is live or Dan has approved it. Where the workbook has Wiktionary's data it
// must agree with the check; where it's blank (units pulled in Phase 2a) the check fills it.
const unitOpen = (id) => tables.units.some((u) => u.unit_id === id && (isLive(u) || decisions.units?.[id]?.action === 'approve'))
// A short hint in Wiktionary's own words: the gloss, or for a form of another word, that word and its meaning.
const hintFrom = (c) => {
  const short = (g) => String(g).split(/[;(]/)[0].replace(/^(feminine|plural|apocopic form) of [^:]+: /, '').trim()
  if (/\b(person|plural|singular|inflection) /.test(c.gloss) && c.lemma_gloss) return `${short(c.lemma_gloss)} (${c.lemma})`
  return short(c.gloss)
}
tables.words = raw('words').flatMap((w) => {
  if (!unitOpen(w.first_unit)) return []
  const c = wCheck.get(w.word_id)
  if (c?.status !== 'checked') { bad.push(`${w.word_id} check says ${c?.status}: ${c?.flag_reason}`); return [] }
  const filled = { ...w }
  for (const col of ['lemma', 'part_of_speech', 'gender', 'gloss']) {
    if (w[col] === '' || w[col] == null) filled[col] = c[col]
    else if (col === 'gloss' ? !String(w.gloss).includes(c.gloss) : String(w[col]) !== String(c[col])) bad.push(`${w.word_id} ${col}: workbook "${w[col]}", Wiktionary "${c[col]}"`)
  }
  if (!filled.hint) { filled.hint = hintFrom(c); filled.hint_source = 'Wiktionary (built)' }
  return [{ ...filled, gloss_full: c.gloss_full, lemma_gloss: c.lemma_gloss }]
})

// Answers: workbook rows, plus the en_to_fr rows the check generated.
tables.accepted_answers = [
  ...raw('accepted_answers').flatMap((a) => {
    const c = aCheck.get(a.answer_id)
    if (!isLive(a) || !live.has(a.sentence_id)) return []
    if (c?.status !== 'checked') { bad.push(`${a.answer_id} "${a.answer}" live in the workbook, check says ${c?.status}`); return [] }
    return [{ ...a, status: 'live' }]
  }),
  ...generated.filter((g) => live.has(g.sentence_id)).map((g) => ({ ...g, status: 'live' })),
]

// cant_swaps: parse the replacement and rounds into rules the app can use.
tables.cant_swaps = raw('cant_swaps').map((c) => {
  const [, type, variant] = String(c.replaced_by).match(/^(QT\d+)(?: variant (V\d+))?$/)
  const r = String(c.rounds)
  const [from, to] = r === 'all' ? [1, 5] : r.includes('-') ? r.split('-').map(Number) : [Number(r), Number(r)]
  return { ...c, rule: { type, variant: variant ?? null, from, to } }
})

// feedback_phrases: English lines marked live; French lines only once the check passes.
tables.feedback_phrases = raw('feedback_phrases').flatMap((f) => {
  if (f.language === 'fr') return fCheck.get(f.phrase_id)?.status === 'checked' ? [{ ...f, status: 'live', source_id: fCheck.get(f.phrase_id).source_id }] : []
  return isLive(f) ? [f] : []
})

// qa_answers: only pairs where both sentences are live.
tables.qa_answers = raw('qa_answers').filter((q) => live.has(q.question_sentence_id) && live.has(q.answer_sentence_id))

if (bad.length) {
  console.error('Build gate failed, nothing written:\n  ' + bad.join('\n  '))
  process.exit(1)
}

// Recordings.
mkdirSync(AUDIO, { recursive: true })
const wanted = new Set()
for (const s of tables.sentences.filter((x) => x.lingua_libre)) {
  const ext = s.lingua_libre.file.split('.').pop().toLowerCase()
  const name = `${s.sentence_id}.${ext}`
  wanted.add(name)
  await getFile(s.lingua_libre.url, join(AUDIO, name))
  const speaker = s.lingua_libre.file.match(/^LL-Q150 \(fra\)-(.+?)-/)?.[1] ?? ''
  s.lingua_libre = { ...s.lingua_libre, audio_file: `/audio/${name}`, speaker }
}
for (const f of readdirSync(AUDIO)) if (!wanted.has(f)) rmSync(join(AUDIO, f))

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
for (const [name, rows] of Object.entries(tables)) writeFileSync(join(OUT, `${name}.json`), JSON.stringify(rows, null, 2) + '\n')
if (existsSync(join(ROOT, 'public/content'))) rmSync(join(ROOT, 'public/content'), { recursive: true })

const awaiting = raw('sentences').filter((s) => !isLive(s) && !String(s.status).startsWith('off')).map((s) => s.sentence_id)
const original = tables.sentences.filter((s) => s.source === 'tamago_original').length
const fr = tables.accepted_answers.filter((a) => a.direction === 'fr_to_en').length
console.log(`Shipped: ${tables.sentences.length} sentences (${tables.sentences.length - original} Tatoeba, ${original} Tamago originals), ${tables.words.length} words, ${fr} fr_to_en and ${tables.accepted_answers.length - fr} en_to_fr answers, ${tables.qa_answers.length} qa_answers, ${tables.feedback_phrases.length} feedback lines (${tables.feedback_phrases.filter((f) => f.language === 'fr').length} French), ${wanted.size} recordings. U01 status: ${tables.units[0].status}.${awaiting.length ? ` Not live, awaiting a ruling: ${awaiting.join(', ')}.` : ''}`)
