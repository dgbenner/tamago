// Proposes sentences for draft units from Tatoeba, under the workbook's content_pull rules (P01 to P09).
// Writes content/pull/<unit>.json once per unit: an existing file is Dan's list under review or approved, so it is
// never rewritten unless the unit is named with --redo U02. Also writes content/pull/review.md.
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadTatoeba } from './lib/tatoeba.mjs'
import { analyse as analyseWords, formIndexFor as formIndexOf, loose, norm, tokenize } from './lib/french.mjs'

const ROOT = join(import.meta.dirname, '..')
const raw = (t) => JSON.parse(readFileSync(join(ROOT, `content/raw/${t}.json`), 'utf8'))
const PULL = join(ROOT, 'content/pull')
const redo = new Set(process.argv.includes('--redo') ? process.argv.slice(process.argv.indexOf('--redo') + 1) : [])

const MIN_WORDS = 2, MAX_WORDS = 7 // P03
const TARGET_MIN = 30, TARGET_MAX = 40, PER_WORD = 3 // P04
const GRAMMAR_MIN = 10, CONTRAST_MIN = 2 // P05
const QUESTIONS_MIN = 4 // P06
const ID_BASE = { U02: 2000, U03: 3000, U04: 4000, U05: 5000, U101: 6000, U102: 6100, U103: 6200, U104: 6300, U105: 6400, U106: 6500, U107: 6600 }
// A topic pack (is_topic_pick yes) is one node: a smaller target, and it draws only on Units 1 to 5 plus its own words.
const isPack = (u) => u.is_topic_pick === 'yes'
const PACK_TARGET = 15

const units = raw('units').sort((a, b) => a.order - b.order)
const words = raw('words')
// The workbook's own sentences; the pulls and drafts merged at import are not in the way of a fresh pull.
const existing = raw('sentences').filter((s) => !s.origin || s.origin === 'workbook')
// Names allowed (R21): the ones the workbook already uses. Dan can add more there.
const NAMES = new Set(raw('sentence_words').filter((r) => r.notes === 'name').map((r) => String(r.surface).toLowerCase()))
// Part of speech from the Wiktionary check, to tell an article from a pronoun.
const checkedWords = JSON.parse(readFileSync(join(ROOT, 'content/checks/words.json'), 'utf8'))
const POS = new Map(checkedWords.map((w) => [w.word_id, w.part_of_speech]))
// A noun's meaning in this course, from Wiktionary: the first sense, or the lemma's for a plural.
const IRREGULAR = { man: 'men', woman: 'women', child: 'children', mouse: 'mice' }
const nounMeaning = new Map(checkedWords.filter((w) => w.part_of_speech === 'Noun').map((w) => {
  const g = (/^plural of /.test(w.gloss) ? w.lemma_gloss : w.gloss).split(/[,;(]/)[0].trim().toLowerCase().replace(/^(a|an|the) /, '')
  return [w.word_id, g]
}))
// The English carries each noun in the sense the course teaches: "J'ai une fille" as "daughter" doesn't count for girl.
const carriesNouns = (english, parts) => parts.every((p) => {
  const g = nounMeaning.get(p.word_id)
  if (!g) return true
  const e = english.toLowerCase()
  return [g, g + 's', g + 'es', IRREGULAR[g]].filter(Boolean).some((x) => new RegExp(`\\b${x}\\b`).test(e))
})


// An article must come before a noun or adjective; le, la, l', les before a verb are pronouns, and l'un isn't an article.
function analyse(text, formIndex) {
  const a = analyseWords(text, formIndex, { names: NAMES })
  if (a.unknown) return null
  for (let k = 0; k < a.parts.length; k++) {
    if (POS.get(a.parts[k].word_id) !== 'Article') continue
    const next = POS.get(a.parts[k + 1]?.word_id)
    if (!a.parts[k + 1] || (next && !['Noun', 'Adjective'].includes(next))) return null
  }
  return a
}
const formIndexFor = (allowedUnits) => formIndexOf(words.filter((w) => allowedUnits.has(w.first_unit)))

// The unit's grammar point, read from its contrast sets: the forms the unit is teaching.
const contrastPairs = (u) => String(u.contrast_sets).split(';').map((x) => x.trim()).filter(Boolean).map((s) => s.split('|'))

// P07: the plainest English uses the commonest words (counted across Tatoeba's English), then is shortest.
let freq = null
const plainness = (e) => {
  const ws = e.toLowerCase().match(/[a-z']+/g) ?? []
  const rarity = ws.reduce((n, w) => n + 1 / Math.log(2 + (freq.get(w) ?? 0)), 0)
  return rarity + ws.length * 0.05 + (e.includes('!') ? 0.3 : 0)
}

console.log('Tatoeba: loading exports')
const tatoeba = loadTatoeba()
freq = tatoeba.englishWordCounts()
const trusted = (s) => { const t = tatoeba.trustOf(s); return t.native_owner || t.ok_tag }
// Already in the course: the workbook, drafts and other units' pulls, but not the pull being redone.
const taken = new Set(raw('sentences').filter((s) => !(s.origin === 'pull' && redo.has(s.unit_id))).map((s) => loose(s.french)))

const report = ['# Units 2 to 5: sentences pulled from Tatoeba', '',
  'Proposed under the workbook\'s content_pull rules. Nothing here is live until Dan approves the unit (P09): record `{"U02": {"action": "approve"}}` under units in content/review-decisions.json.', '']

const opened = new Set(units.filter((u) => String(u.status).startsWith('live')).map((u) => u.unit_id))
for (const u of units) {
  if (u.is_topic_pick === 'node') continue
  const allowed = new Set([...opened, u.unit_id])
  if (!isPack(u)) opened.add(u.unit_id)
  if (String(u.status).startsWith('live')) continue
  const file = join(PULL, `${u.unit_id}.json`)
  const unitWords = words.filter((w) => w.first_unit === u.unit_id)
  const unitWordIds = new Set(unitWords.map((w) => w.word_id))
  const formOf = new Map(words.map((w) => [w.word_id, w.form]))
  const pairs = contrastPairs(u)
  const grammarForms = new Set(pairs.flat())

  let pull
  if (existsSync(file) && !redo.has(u.unit_id)) {
    pull = JSON.parse(readFileSync(file, 'utf8'))
  } else {
    // P01 to P03: every candidate.
    const index = formIndexFor(allowed)
    const seen = new Set()
    const candidates = []
    for (const s of tatoeba.french) {
      if (!trusted(s)) continue
      const key = loose(s.text)
      if (taken.has(key) || seen.has(key)) continue
      if (/\d/.test(s.text)) continue
      const a = analyse(s.text, index)
      if (!a || a.count < MIN_WORDS || a.count > MAX_WORDS) continue
      // A new word of the unit, or a contrast form of its grammar point (P05 wants both sides of each pair).
      if (!a.parts.some((p) => unitWordIds.has(p.word_id) || grammarForms.has(formOf.get(p.word_id)))) continue
      const english = [...new Set(tatoeba.englishFor(s.id))].filter((e) => carriesNouns(e, a.parts)).sort((x, y) => plainness(x) - plainness(y))
      if (!english.length) continue
      seen.add(key)
      candidates.push({ s, parts: a.parts, english, forms: a.parts.map((p) => (p.word_id ? formOf.get(p.word_id) : null)).filter(Boolean) })
    }

    // P04 and P05: greedy picks, each time the sentence that does most for what is still short.
    const wordCount = new Map()
    const formCount = new Map()
    let grammar = 0
    const chosen = []
    const gain = (c) => {
      let g = 0
      const ids = new Set(c.parts.map((p) => p.word_id).filter((id) => unitWordIds.has(id)))
      for (const id of ids) g += (wordCount.get(id) ?? 0) < PER_WORD ? 4 : 0.2
      if (c.forms.some((f) => grammarForms.has(f)) && grammar < GRAMMAR_MIN) g += 2
      for (const f of new Set(c.forms)) if (grammarForms.has(f) && (formCount.get(f) ?? 0) < CONTRAST_MIN) g += 2
      if (/\?\s*$/.test(c.s.text)) g += 0.5
      return g - c.parts.length * 0.01
    }
    const pool = [...candidates].sort((a, b) => Number(a.s.id) - Number(b.s.id))
    const target = isPack(u) ? PACK_TARGET : TARGET_MIN
    while (chosen.length < TARGET_MAX && pool.length) {
      let best = 0
      for (let i = 1; i < pool.length; i++) if (gain(pool[i]) > gain(pool[best])) best = i
      const g = gain(pool[best])
      if (chosen.length >= target && g < 1) break
      const c = pool.splice(best, 1)[0]
      chosen.push(c)
      for (const id of new Set(c.parts.map((p) => p.word_id))) wordCount.set(id, (wordCount.get(id) ?? 0) + 1)
      for (const f of c.forms) formCount.set(f, (formCount.get(f) ?? 0) + 1)
      if (c.forms.some((f) => grammarForms.has(f))) grammar++
    }

    // P06: questions, and the pulled or earlier sentences that answer them.
    const yesNo = existing.filter((s) => ['S0004', 'S0005'].includes(s.sentence_id)).map((s) => s.sentence_id)
    const SWAP = { es: 'suis', 'êtes': 'suis', as: 'ai', manges: 'mange', aimes: 'aime' }
    // An answer swaps the verb to the first person and keeps everything else the question is about.
    const FUNCTION = new Set(['tu', 'vous', 'je', "j'", 'oui', 'non'])
    const answersFor = (q) => {
      const verb = q.forms.find((f) => SWAP[f])
      if (!verb) return []
      const content = q.forms.filter((f) => f !== verb && !FUNCTION.has(f))
      return candidates.filter((c) => c !== q && !/\?\s*$/.test(c.s.text) && c.forms.includes(SWAP[verb])
        && (c.forms.includes('je') || c.forms.includes("j'")) && content.every((f) => c.forms.includes(f))
        && c.forms.filter((f) => !FUNCTION.has(f) && f !== SWAP[verb]).length <= content.length + 1).slice(0, 3)
    }
    const questions = candidates.filter((c) => /\?\s*$/.test(c.s.text)).map((q) => ({ q, answers: answersFor(q) }))
      .filter((x) => x.answers.length).sort((a, b) => b.answers.length - a.answers.length).slice(0, 6)
    // P06 puts questions and their answers in the unit, on top of the picks.
    for (const { q, answers } of questions) for (const c of [q, ...answers]) if (!chosen.includes(c)) chosen.push(c)

    const base = ID_BASE[u.unit_id]
    const sentences = chosen.map((c, i) => ({
      sentence_id: `S${String(base + i + 1).padStart(4, '0')}`, unit_id: u.unit_id, french: norm(c.s.text), english: c.english[0],
      pair_id: '', source: 'tatoeba', source_id: c.s.id, status: 'pulled: awaiting approval', audio_source: 'tts', max_round: 5,
      notes: 'pulled from Tatoeba under content_pull', source_owner: c.s.owner, other_english: c.english.slice(1, 5),
    }))
    const idOf = new Map(chosen.map((c, i) => [c, sentences[i].sentence_id]))
    pull = {
      unit_id: u.unit_id, pulled_at: new Date().toISOString().slice(0, 10), candidates: candidates.length,
      sentences,
      sentence_words: chosen.flatMap((c, i) => c.parts.map((p, k) => ({ sentence_id: sentences[i].sentence_id, position: k + 1, surface: p.surface, word_id: p.word_id, notes: p.name ? 'name' : '', hint_override: '' }))),
      accepted_answers: sentences.flatMap((s) => s.other_english.map((e, k) => ({ answer_id: `A${s.sentence_id.slice(1)}${k + 1}`, sentence_id: s.sentence_id, direction: 'fr_to_en', answer: e, source: 'tatoeba', status: 'pulled' }))),
      qa_answers: questions.flatMap(({ q, answers }) => [...answers.map((a) => idOf.get(a)), ...yesNo].map((a) => ({ question_sentence_id: idOf.get(q), answer_sentence_id: a }))),
    }
    writeFileSync(file, JSON.stringify(pull, null, 2) + '\n')
  }

  // Report against the targets, whether freshly pulled or kept from before.
  const sw = pull.sentence_words
  const perWord = new Map(unitWords.map((w) => [w.word_id, new Set()]))
  for (const r of sw) perWord.get(r.word_id)?.add(r.sentence_id)
  const formsIn = (id) => sw.filter((r) => r.sentence_id === id).map((r) => formOf.get(r.word_id)).filter(Boolean)
  const grammarCount = pull.sentences.filter((s) => formsIn(s.sentence_id).some((f) => grammarForms.has(f))).length
  const formTally = new Map([...grammarForms].map((f) => [f, pull.sentences.filter((s) => formsIn(s.sentence_id).includes(f)).length]))
  const questionIds = [...new Set(pull.qa_answers.map((q) => q.question_sentence_id))]
  const gaps = unitWords.filter((w) => perWord.get(w.word_id).size < PER_WORD)
  const esc = (s) => String(s).replace(/\|/g, '\\|')
  const tatoebaUrl = (id) => `https://tatoeba.org/en/sentences/show/${id}`
  report.push(`## ${u.unit_id} ${u.title}: ${u.grammar_point}`, '')
  report.push(`${pull.sentences.length} sentences picked from ${pull.candidates} candidates (target ${TARGET_MIN} to ${TARGET_MAX}). Grammar point in ${grammarCount} (target ${GRAMMAR_MIN}). Questions for QT09: ${questionIds.length} (target ${QUESTIONS_MIN}).`, '')
  report.push(`Contrast forms, sentences each (target ${CONTRAST_MIN}): ${[...formTally].map(([f, n]) => `${f} ${n}`).join(', ')}.`, '')
  report.push(gaps.length ? `**Gaps (P08)**, fewer than ${PER_WORD} usable sentences: ${gaps.map((w) => `${w.form} (${perWord.get(w.word_id).size})`).join(', ')}. Dan decides: drop the word, or have Claude draft sentences.` : 'Every new word is in at least 3 sentences.', '')
  report.push('| ID | French | English | Other English | Tatoeba | Owner |', '| --- | --- | --- | --- | --- | --- |')
  for (const s of pull.sentences) report.push(`| ${s.sentence_id} | ${esc(s.french)} | ${esc(s.english)} | ${esc(s.other_english.join('; '))} | [#${s.source_id}](${tatoebaUrl(s.source_id)}) | ${s.source_owner} |`)
  if (questionIds.length) {
    report.push('', '**QT09 questions and answers**', '')
    for (const q of questionIds) {
      const french = (id) => pull.sentences.find((s) => s.sentence_id === id)?.french ?? existing.find((s) => s.sentence_id === id)?.french
      report.push(`- ${q} ${esc(french(q))}: ${pull.qa_answers.filter((x) => x.question_sentence_id === q).map((x) => esc(french(x.answer_sentence_id))).join(' / ')}`)
    }
  }
  report.push('')
  console.log(`${u.unit_id}: ${pull.sentences.length} sentences of ${pull.candidates} candidates, grammar ${grammarCount}, questions ${questionIds.length}, gaps ${gaps.map((w) => w.form).join(', ') || 'none'}`)
}
writeFileSync(join(PULL, 'review.md'), report.join('\n'))
