// Polish U95 (Society + News) pruned as Swedish Part 4's newsroom tail was (Dan's call, 2026-11-22; scripts/review/sv-phase6.mjs).
// After the Bóg lines were cut (pl-phase6.mjs) the circle stood at 49 drafts of 51 lines (96%): Tatoeba has almost no
// A1 line for the Kelly newsroom words. Its register words are stoplisted under pl in scripts/lib/a1-stoplist.mjs, so
// they no longer count toward A1; those whose only lines were drafts are turned off here, ids kept, and their drafts
// cut. bezpieczeństwo (stoplisted) and interes keep their Tatoeba line and stay taught; ciało and milion are everyday
// core and stay. The circle's note, overview line and can-do line name only the words still taught.
// v2: U95 needs a content source beyond Tatoeba (graded readers, a native writer) to be rebuilt properly.
// Workbook v8 to v9. Re-runnable: the workbook is written from v8, and the content steps set values rather than edit them.
// Usage: node scripts/review/pl-u95-prune.mjs _source/tamago-pl-data-v8.xlsx _source/tamago-pl-data-v9.xlsx
import { join } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '../..')
const P = (f) => join(ROOT, 'content-pl', f)
const readJ = (f) => JSON.parse(readFileSync(f, 'utf8'))
const writeJ = (f, d) => writeFileSync(f, JSON.stringify(d, null, 2) + '\n')
const [from, to] = process.argv.slice(2)
if (!from || !to) throw new Error('usage: node scripts/review/pl-u95-prune.mjs <v8.xlsx> <v9.xlsx>')
const today = '2026-11-22'
const DAN = "Dan's call (2026-11-22): U95 pruned as Swedish Part 4's newsroom circles were"

// Words turned off (ids kept): register, stoplisted, and every line they had in U95 was a draft.
const OFF = { // form: the drafts cut with it
  'społeczeństwo': ['S95126', 'S95127', 'S95128'],
  'naród': ['S95144', 'S95145', 'S95146'],
  'organizacja': ['S95114', 'S95115', 'S95116'],
  'związek': ['S95105', 'S95106', 'S95107'],
  'wolność': ['S95147', 'S95148', 'S95149'],
  'ochrona': ['S95132', 'S95133', 'S95134'],
  'akcja': ['S95135', 'S95136', 'S95137'],
  'kwestia': ['S95138', 'S95139', 'S95140'],
  'środowisko': ['S95129', 'S95130', 'S95131'],
  'badanie': ['S95123', 'S95124', 'S95125'],
  'rozwój': ['S95108', 'S95109', 'S95110'],
  'warunek': ['S95111', 'S95112', 'S95113'],
  'udział': ['S95117', 'S95118', 'S95119'],
}
export const OFF_REASON = `turned off: newsroom or official register, stoplisted (a1-stoplist.mjs, pl register), its U95 lines were drafts only (${DAN}; id kept; v2: needs a content source beyond Tatoeba)`
// Kept and still taught: bezpieczeństwo (stoplisted, Tatoeba S95004), interes (Tatoeba S95005), ciało and milion
// (everyday core, three drafts each). None of their lines uses a word now off, so no draft is rewritten or added.
const KEPT = { 'bezpieczeństwo': 3, interes: 3, 'ciało': 3, milion: 3 }

// 1. The workbook.
const wb = XLSX.readFile(join(ROOT, from))
const sheet = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' })
const words = sheet('words')
for (const form of Object.keys(OFF)) {
  const w = words.find((x) => x.form === form && x.first_unit === 'U95'); if (!w) throw new Error(`${form} is not a U95 word`)
  if (String(w.status).startsWith('off')) throw new Error(`${form} is already off in ${from}`)
  w.status = `off: ${OFF_REASON}`
}
for (const form of Object.keys(KEPT)) {
  const w = words.find((x) => x.form === form && x.first_unit === 'U95'); if (!w || String(w.status).startsWith('off')) throw new Error(`${form} should be a live U95 word`)
}
wb.Sheets.words = XLSX.utils.json_to_sheet(words)
const canDo = sheet('can_do')
const cd = canDo.find((x) => x.unit_id === 'U95'); if (!cd) throw new Error('no can_do for U95')
cd.statement = 'I can recognize a few words of a simple news item: safety, business, the body, a million.'
wb.Sheets.can_do = XLSX.utils.json_to_sheet(canDo)
const readme = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
readme.push([`Changes to ${to.match(/v(\d+)/)[0]}`, `${DAN}: ${Object.keys(OFF).length} newsroom words in U95 turned off (stoplisted, drafts only), ids kept; U95's can-do line names only the words still taught. v2: U95 needs a content source beyond Tatoeba.`])
wb.Sheets.README = XLSX.utils.aoa_to_sheet(readme)
XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}: ${Object.keys(OFF).length} words off`)

// 2. Drafts: those of the words now off are cut.
const drafts = readJ(P('drafts.json'))
const cut = new Set(Object.values(OFF).flat())
for (const d of drafts.sentences) if (cut.has(d.sentence_id) && d.unit_id !== 'U95') throw new Error(`${d.sentence_id} is not in U95`)
const before = drafts.sentences.length
drafts.sentences = drafts.sentences.filter((d) => !cut.has(d.sentence_id))
writeJ(P('drafts.json'), drafts)
const left = drafts.sentences.filter((d) => d.unit_id === 'U95').map((d) => d.sentence_id)
console.log(`drafts: ${before - drafts.sentences.length} cut (${cut.size} named; 0 on a rerun); U95 keeps ${left.length}: ${left.join(' ')}`)

// 3. The note and the overview line name only words still taught, each example a line the circle keeps.
const notes = readJ(P('grammar_notes.json')), points = readJ(P('grammar-points.json'))
const note = notes.notes.find((n) => n.unit_id === 'U95'); if (!note) throw new Error('no U95 note')
note.rule = '**Bezpieczeństwo** is safety: **Bezpieczeństwo jest ważne.**\n**Interes** is business, or a deal: **To nie twój interes.**\n\n**Ciało** is the body and **milion** a million: **Milion to dużo.**'
note.example_sentence_ids = 'S95004;S95005;S95142'
points.points.U95 = '**bezpieczeństwo** (safety), **interes** (business), **ciało** (body), **milion**; **Bezpieczeństwo jest ważne**; **to nie twój interes** (it\'s none of your business)'
writeJ(P('grammar_notes.json'), notes); writeJ(P('grammar-points.json'), points)
console.log(`U95 note and overview line rewritten (${today})`)
