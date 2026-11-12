// Folds Fable's check of the vocabulary circles' drafts (_review/<course>-vocab-check.md, 2026-11-11) into the drafts,
// the decisions and the next workbook (Dan's ruling, 2026-11-11). Run after the Use candidates are swapped in
// (apply-spanish-candidates.mjs with FILE=_review/<course>-vocab-candidates.md): a fix on a draft that was swapped
// is skipped, since the line it fixed is gone.
//   - French: wherever copain or copine means "friend", ami or amie instead (Dan); copain and copine go off.
//     "C'est mon ami." and "C'est mon amie." are already in the course, so those two drafts name the friend.
//   - Spanish: feet in the plural (S51102, S51103); pies is a new word.
//   - German: viel for the Freizeit lines, lang for the street; viel and lang are new words.
// Sentence ids stay, so progress and pairs keep pointing at the right rows. Rerun after regenerating a Spanish or
// German workbook with its make-*-workbook script, which drops the new words.
// Usage: COURSE=fr|es|de node scripts/apply-vocab-check.mjs <from.xlsx> <to.xlsx>
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { at, C } from './lib/course.mjs'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const [from, to] = process.argv.slice(2)
if (!from || !to) throw new Error('usage: COURSE=fr|es|de node scripts/apply-vocab-check.mjs <from.xlsx> <to.xlsx>')
const FILE = `_review/${C.name.toLowerCase()}-vocab-check.md`

const PLAN = {
  fr: {
    fixes: {
      S11363: { english: 'He likes dancing.', why: '"He likes dance" is not English' },
      S11361: { english: 'I like dancing.', why: '"I like dance" is not English' },
      S11563: { french: "C'est mon ami Paul.", english: 'This is my friend Paul.', why: 'ami for friend (Dan); "C\'est mon ami." is already in the course' },
      S11564: { french: 'Paul est mon ami.', english: 'Paul is my friend.', why: 'ami for friend (Dan)' },
      S11565: { french: "C'est mon amie Marie.", english: 'This is my friend Marie.', why: 'amie for friend (Dan); "C\'est mon amie." is already in the course' },
      S11566: { french: 'Marie est mon amie.', english: 'Marie is my friend.', why: 'amie for friend (Dan)' },
    },
    off: { copain: 'no sentence uses it since ami replaced it (Dan, 2026-11-11)', copine: 'no sentence uses it since amie replaced it (Dan, 2026-11-11)' },
    answers: [],
  },
  es: {
    fixes: {
      S51102: { french: 'Tengo los pies grandes.', english: 'I have big feet.', why: 'feet in the plural; "un pie grande" sounds like one foot' },
      S51103: { french: 'Tom tiene los pies pequeños.', english: 'Tom has small feet.', why: 'feet in the plural' },
    },
    add: [{ form: 'pies', unit: 'U51', note: 'plural of pie, for the plural fix (S51102, S51103)' }],
    answers: [['S51119', "I'm a serious person.", '"I\'m serious" can read as "I mean it"'], ['S53114', "The hotel is nice.", 'bonito as nice']],
  },
  de: {
    fixes: {
      S52117: { french: 'Ich habe viel Freizeit.', english: 'I have a lot of free time.', why: 'Freizeit needs a measure to sound German' },
      S52118: { french: 'Hast du viel Freizeit?', english: 'Do you have a lot of free time?', why: 'as S52117' },
      S52119: { french: 'Wir haben viel Freizeit.', english: 'We have a lot of free time.', why: 'as S52117' },
      S52120: { english: 'Are you listening?', why: '"Hören Sie?" is first heard as "Are you listening?"' },
      S53111: { french: 'Die Straße ist lang.', english: 'The street is long.', why: 'a street is lang or breit, not groß' },
    },
    add: [{ form: 'viel', unit: 'U52', note: 'for the Freizeit fixes (S52117 to S52119)' }, { form: 'lang', unit: 'U53', note: 'for the street fix (S53111)' }],
    answers: [['S52123', "You don't swim.", 'Sie as formal you']],
  },
}[C.id]

// Drafts.
const dpath = at('content/drafts.json')
const drafts = JSON.parse(readFileSync(dpath, 'utf8'))
const decPath = at('content/review-decisions.json')
const dec = JSON.parse(readFileSync(decPath, 'utf8'))
const done = []
for (const [id, f] of Object.entries(PLAN.fixes)) {
  const d = drafts.sentences.find((x) => x.sentence_id === id)
  if (!d) throw new Error(`${id}: not a draft`)
  if (d.source === 'tatoeba') { done.push(`${id} skipped: swapped for Tatoeba #${d.source_id}`); continue }
  const was = `${d.french} = ${d.english}`
  Object.assign(d, { french: f.french ?? d.french, english: f.english ?? d.english,
    notes: `${d.notes ?? ''}; fixed 2026-11-11 from ${FILE}: ${f.why}; was "${was}"`.replace(/^; /, '') })
  done.push(`${id} ${was} -> ${d.french} = ${d.english}`)
}
// Accepted answers from the Keep rows' notes, on drafts still drafts.
dec.accepted_additions ??= []
let n = dec.accepted_additions.reduce((m, a) => Math.max(m, Number(a.answer_id.slice(2))), 0)
for (const [id, answer, why] of PLAN.answers) {
  const d = drafts.sentences.find((x) => x.sentence_id === id)
  if (!d || d.source === 'tatoeba') { done.push(`${id} answer "${answer}" skipped: the draft was swapped`); continue }
  if (dec.accepted_additions.some((a) => a.sentence_id === id && a.answer === answer)) continue
  const answer_id = `AD${String(++n).padStart(4, '0')}`
  const by = `${C.name} vocabulary check of 2026-11-11 (${FILE}), added at Dan's request: ${why}`
  dec.accepted_additions.push({ answer_id, sentence_id: id, direction: 'fr_to_en', answer, source: by, status: 'live' })
  (dec.accepted_answers ??= {})[answer_id] = { action: 'keep', answer, by }
  done.push(`${answer_id} ${id} also accepts "${answer}"`)
}
writeFileSync(dpath, JSON.stringify(drafts, null, 2) + '\n')
writeFileSync(decPath, JSON.stringify(dec, null, 2) + '\n')

// Workbook: new words, and words no sentence uses any more.
const wb = XLSX.readFile(join(ROOT, from))
const sheet = (name) => XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: '' })
const header = (name) => XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: '' })[0]
const words = sheet('words')
let max = words.reduce((m, w) => Math.max(m, Number(String(w.word_id).slice(1)) || 0), 0)
for (const a of PLAN.add ?? []) {
  if (words.some((w) => w.form === a.form && !String(w.status).startsWith('off'))) { done.push(`${a.form} is already a word`); continue }
  const word_id = `W${++max}`
  words.push({ word_id, lang_id: C.id, form: a.form, first_unit: a.unit, needs_image: 'no',
    wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(a.form)}#${C.name}`, status: 'pull from Wiktionary', notes: `added 2026-11-11, ${a.note}` })
  done.push(`${word_id} ${a.form} in ${a.unit}`)
}
for (const [form, why] of Object.entries(PLAN.off ?? {})) {
  const w = words.find((x) => x.form === form)
  if (!w) throw new Error(`${form}: no such word`)
  Object.assign(w, { status: 'off: cut in review', notes: `${w.notes ? `${w.notes}; ` : ''}off 2026-11-11: ${why}` })
  done.push(`${w.word_id} ${form} off`)
}
wb.Sheets.words = XLSX.utils.json_to_sheet(words, { header: header('words') })
const version = to.match(/v(\d+)/)?.[1]
const note = `Vocabulary check of 2026-11-11 (${FILE}): ${[...(PLAN.add ?? []).map((a) => `${a.form} added`), ...Object.keys(PLAN.off ?? {}).map((f) => `${f} off`)].join(', ')}.`
const readme = sheet('README')
wb.Sheets.README = XLSX.utils.json_to_sheet([...readme.map((r) => (r.item === 'Version' ? { ...r, notes: `Workbook v${version}, ${new Date().toISOString().slice(0, 10)}. ${note}` } : r)), { item: `Changes to v${version}`, notes: note }], { header: header('README') })
XLSX.writeFile(wb, join(ROOT, to))
console.log(`${done.join('\n')}\nWrote ${to}`)
