// content/raw + content/checks -> src/content/<table>.json, bundled into the app so a lesson needs
// no network. The workbook's status is the gate; the checks must agree with it or the build fails.
// Lingua Libre recordings for live sentences are copied to public/audio.
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { getFile } from './lib/http.mjs'
import { normaliseFile } from './lib/loudness.mjs'

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
// An approved unit is live; each unit also lists the earlier sentences its lessons may borrow.
tables.units = tables.units.map((u) => ({
  ...(decisions.units?.[u.unit_id]?.action === 'approve' ? { ...u, status: 'live' } : u),
  borrowed_sentence_ids: decisions.borrow?.[u.unit_id] ?? String(u.borrowed_sentence_ids ?? '').split(';').filter(Boolean),
}))
tables.tree_layout = raw('tree_layout')

// Sentences: live in the workbook and passed by the check, with the same source.
// A pulled or drafted sentence ships once its unit is approved, unless Dan cut it.
const approved = (unitId) => decisions.units?.[unitId]?.action === 'approve'
const cut = new Set(decisions.cut_sentences ?? [])
// The native-speaker check (Phase 4): verdicts, fixes and recordings from scripts/import-native-check.mjs.
const NATIVE = existsSync(join(ROOT, 'content/native-check.json')) ? JSON.parse(readFileSync(join(ROOT, 'content/native-check.json'), 'utf8')) : { checks: [], results: {} }
const nativeLicensed = NATIVE.checks.some((c) => c.license_agreed)
const squash = (t) => String(t ?? '').trim().replace(/\s+/g, ' ')
// A fix not yet in the sentence is held back: the sentence doesn't ship until the fix is applied.
const fixPending = (s) => { const n = NATIVE.results[s.sentence_id]; return n?.verdict === 'fix' && (squash(n.french_fix) !== squash(s.french) || squash(n.english_fix) !== squash(s.english)) }
const heldBack = []
const ships = (s) => !cut.has(s.sentence_id) && (s.origin === 'pull' ? approved(s.unit_id) : s.origin === 'draft' ? approved(s.unit_id) || isLive(tables.units.find((u) => u.unit_id === s.unit_id) ?? {}) : isLive(s))
tables.sentences = raw('sentences').flatMap((s) => {
  if (!ships(s)) return []
  if (fixPending(s)) { heldBack.push(s.sentence_id); return [] }
  const c = sCheck.get(s.sentence_id)
  if (s.origin === 'pull' && c?.status === 'checked') s = { ...s, source_id: c.source_id }
  if (!['checked', 'dan_reviewed'].includes(c?.status)) { bad.push(`${s.sentence_id} live in the workbook, check says ${c?.status}`); return [] }
  if (String(s.source_id) !== String(c.source_id)) bad.push(`${s.sentence_id} workbook source_id ${s.source_id}, check found ${c.source_id}`)
  if (s.source !== c.source) bad.push(`${s.sentence_id} workbook source ${s.source}, check found ${c.source}`)
  if (s.origin !== 'workbook' && s.origin) s = { ...s, audio_source: c.audio_source } // the pull and drafts don't know about recordings; the check does
  if (s.audio_source !== c.audio_source) bad.push(`${s.sentence_id} workbook audio ${s.audio_source}, check found ${c.audio_source}`)
  const n = NATIVE.results[s.sentence_id]
  const native_check = n?.verdict ? 'checked by a native speaker' : String(s.status).includes('native check') ? 'needed before Phase 4' : ''
  const native_recording = n?.audio_file && nativeLicensed && existsSync(join(ROOT, 'public/audio-native', n.audio_file))
    ? { audio_file: `/audio-native/${n.audio_file}`, speaker: n.checker || 'a native speaker', license: 'CC BY-SA 4.0' } : undefined
  if (s.source === 'tamago_original' && !native_check) bad.push(`${s.sentence_id} is original with no native check marker`)
  return [{ ...s, source_id: String(s.source_id), status: 'live', native_check, source_owner: c.source_owner, english_source: c.english_source, lingua_libre: c.lingua_libre, ...(native_recording ? { native_recording } : {}) }]
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
  if (String(w.status).startsWith('off')) return [] // a word taken out of its unit (pluie and temps, Weather rebuild)
  const c = wCheck.get(w.word_id)
  if (c?.status !== 'checked') { bad.push(`${w.word_id} check says ${c?.status}: ${c?.flag_reason}`); return [] }
  const filled = { ...w }
  for (const col of ['lemma', 'part_of_speech', 'gender', 'gloss']) {
    if (w[col] === '' || w[col] == null) filled[col] = c[col]
    else if (col === 'gloss' ? !String(w.gloss).includes(c.gloss) : String(w[col]) !== String(c[col])) bad.push(`${w.word_id} ${col}: workbook "${w[col]}", Wiktionary "${c[col]}"`)
  }
  if (decisions.hints?.[w.word_id]) { filled.hint = decisions.hints[w.word_id]; filled.hint_source = 'Dan, review decisions' }
  // Claude's hints under autonomous-build.md: a short form or a better-fitting Wiktionary sense, with its source.
  else if (decisions.claude_hints?.[w.word_id]) { filled.hint = decisions.claude_hints[w.word_id].hint; filled.hint_source = decisions.claude_hints[w.word_id].source }
  if (!filled.hint) { filled.hint = hintFrom(c); filled.hint_source = 'Wiktionary (built)' }
  return [{ ...filled, gloss_full: c.gloss_full, lemma_gloss: c.lemma_gloss, ...(c.lingua_libre ? { lingua_libre: c.lingua_libre } : {}) }]
})

// Answers: workbook rows, plus the en_to_fr rows the check generated.
tables.accepted_answers = [
  ...raw('accepted_answers').flatMap((a) => {
    const c = aCheck.get(a.answer_id)
    if (!(isLive(a) || a.status === 'pulled') || !live.has(a.sentence_id)) return []
    // An answer Dan approved from a learner's flag is his ruling, not a Tatoeba claim, so the check doesn't gate it.
    if (String(a.source).startsWith('learner flag')) return [{ ...a, status: 'live' }]
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

// "I can" statements ship once checked against the CEFR grid, for units that are open.
tables.can_do = raw('can_do').filter((c) => c.cefr_row && unitOpen(c.unit_id))
for (const c of raw('can_do')) if (!c.cefr_row && unitOpen(c.unit_id)) bad.push(`can_do ${c.can_do_id} not checked against the CEFR grid`)

// Grammar notes: examples must be live sentences; tables come from the Wiktionary check.
const conjugations = read('content/checks/conjugations.json')
tables.grammar_notes = raw('grammar_notes').filter((n) => String(n.status).startsWith('live')).map((n) => {
  const examples = String(n.example_sentence_ids).split(';').filter(Boolean)
  for (const id of examples) if (!live.has(id)) bad.push(`grammar note ${n.unit_id}: example ${id} is not a live sentence`)
  const tables_ = String(n.conjugation_lemma).split(';').map((l) => l.trim()).filter(Boolean).map((l) => ({ lemma: l, present: conjugations[l] ?? null, source: `https://en.wiktionary.org/wiki/${encodeURIComponent(l)}#Conjugation` }))
  for (const t of tables_) if (!t.present) bad.push(`grammar note ${n.unit_id}: no Wiktionary table for ${t.lemma}`)
  return { ...n, examples, conjugations: tables_ }
})

// Verb tables for the conjugation trainer: every verb lemma Wiktionary gave a present tense for.
tables.conjugations = Object.entries(conjugations).filter(([, t]) => t).map(([lemma, present]) => ({ lemma, present, source: `https://en.wiktionary.org/wiki/${encodeURIComponent(lemma)}#Conjugation` }))

// feedback_phrases: English lines marked live; French lines only once the check passes.
// Lines retired by a review decision stay in the workbook as off and never ship.
const phrasesOff = new Set(decisions.phrases_off?.ids ?? [])
tables.feedback_phrases = raw('feedback_phrases').flatMap((f) => {
  if (phrasesOff.has(f.phrase_id)) return []
  if (f.language === 'fr') return fCheck.get(f.phrase_id)?.status === 'checked' ? [{ ...f, status: 'live', source_id: fCheck.get(f.phrase_id).source_id }] : []
  return isLive(f) ? [f] : []
})

// qa_answers: only pairs where both sentences are live.
tables.qa_answers = raw('qa_answers').filter((q) => live.has(q.question_sentence_id) && live.has(q.answer_sentence_id))

if (bad.length) {
  console.error('Build gate failed, nothing written:\n  ' + bad.join('\n  '))
  process.exit(1)
}

// Pictures for word to image, copied into the app so they work offline.
const IMAGE_SET = read('content/images.json').set
mkdirSync(join(ROOT, 'public/images/openmoji'), { recursive: true })
for (const w of tables.words.filter((x) => x.image_file)) {
  const code = w.image_file.match(/openmoji\/(\w+)\.svg/)?.[1]
  if (code) await getFile(IMAGE_SET.file_url.replace('{code}', code), join(ROOT, 'public/images', w.image_file))
}
tables.image_set = [IMAGE_SET]

// Recordings.
const AAC = ['-ac', '1', '-c:a', 'aac', '-b:a', '64k']
mkdirSync(AUDIO, { recursive: true })
const wanted = new Set()
for (const s of tables.sentences.filter((x) => x.lingua_libre)) {
  const ext = s.lingua_libre.file.split('.').pop().toLowerCase()
  const name = `${s.sentence_id}.m4a`
  wanted.add(name)
  // Downloaded once into .cache, then levelled to one loudness on every build (lib/loudness.mjs) and kept as small
  // mono AAC: the service worker caches every recording, so size is install time.
  const raw = join(ROOT, '.cache/recordings', `${s.sentence_id}.${ext}`)
  mkdirSync(join(ROOT, '.cache/recordings'), { recursive: true })
  await getFile(s.lingua_libre.url, raw)
  normaliseFile(raw, join(AUDIO, name), AAC)
  const speaker = s.lingua_libre.file.match(/^LL-Q150 \(fra\)-(.+?)-/)?.[1] ?? ''
  s.lingua_libre = { ...s.lingua_libre, audio_file: `/audio/${name}`, speaker }
}
// Word recordings (content sweep, part 3), the same way: public/audio/<word_id>.<ext>, levelled.
for (const w of tables.words.filter((x) => x.lingua_libre)) {
  const ext = w.lingua_libre.file.split('.').pop().toLowerCase()
  const name = `${w.word_id}.m4a`
  wanted.add(name)
  const raw = join(ROOT, '.cache/recordings', `${w.word_id}.${ext}`)
  await getFile(w.lingua_libre.url, raw)
  normaliseFile(raw, join(AUDIO, name), AAC)
  const speaker = w.lingua_libre.file.match(/^LL-Q150 \(fra\)-(.+?)-/)?.[1] ?? ''
  w.lingua_libre = { ...w.lingua_libre, audio_file: `/audio/${name}`, speaker }
}
for (const f of readdirSync(AUDIO)) if (!wanted.has(f)) rmSync(join(AUDIO, f))

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
for (const [name, rows] of Object.entries(tables)) writeFileSync(join(OUT, `${name}.json`), JSON.stringify(rows, null, 2) + '\n')
if (existsSync(join(ROOT, 'public/content'))) rmSync(join(ROOT, 'public/content'), { recursive: true })

const awaiting = raw('sentences').filter((s) => !live.has(s.sentence_id) && !cut.has(s.sentence_id) && !String(s.status).startsWith('off')).map((s) => s.sentence_id)
const original = tables.sentences.filter((s) => s.source === 'tamago_original').length
const fr = tables.accepted_answers.filter((a) => a.direction === 'fr_to_en').length
console.log(`Shipped: ${tables.sentences.length} sentences (${tables.sentences.length - original} Tatoeba, ${original} Tamago originals), ${tables.words.length} words, ${fr} fr_to_en and ${tables.accepted_answers.length - fr} en_to_fr answers, ${tables.qa_answers.length} qa_answers, ${tables.feedback_phrases.length} feedback lines (${tables.feedback_phrases.filter((f) => f.language === 'fr').length} French), ${wanted.size} recordings (${tables.words.filter((w) => w.lingua_libre).length} of them words). U01 status: ${tables.units[0].status}.${awaiting.length ? ` Not live, awaiting a ruling: ${awaiting.join(', ')}.` : ''}`)
if (heldBack.length) console.log(`Held back until their native-speaker fix is applied: ${heldBack.join(', ')}.`)
