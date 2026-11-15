// Fable's Spanish Part 3 review, the one change outside Part 3's own circles (Dan, 2026-11-15;
// _review/spanish-part3-check.md): the course teaches the Mexican word and accepts Spain's. coche (U53, Part 1) is
// turned off and carro takes its place; every coche line was rewritten with carro (content-es/drafts.json and
// cut_sentences) and the coche wording is an accepted answer (review-decisions accepted_additions). The other
// regional words (tarea, básquetbol, café for brown, piso) are in scripts/part3/es.mjs.
// Rerun after regenerating the Part 4 workbook.
// Usage: node scripts/review/es-part3.mjs _source/tamago-es-data-v9.xlsx _source/tamago-es-data-v10.xlsx
import { join } from 'node:path'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '../..')
const [from, to] = process.argv.slice(2)
const wb = XLSX.readFile(join(ROOT, from))
const words = XLSX.utils.sheet_to_json(wb.Sheets.words, { defval: '' })
const coche = words.find((w) => w.form === 'coche'); if (!coche) throw new Error('coche is not in the workbook')
coche.status = 'off: Spain; the course teaches carro (Dan, 2026-11-15)'
if (!words.some((w) => w.form === 'carro')) {
  if (words.some((w) => w.word_id === 'W1045')) throw new Error('W1045 is taken')
  words.push({ ...coche, word_id: 'W1045', form: 'carro', wiktionary_url: 'https://en.wiktionary.org/wiki/carro#Spanish', status: 'pull from Wiktionary', notes: "A1 Part 1 vocabulary circle word (in place of coche: Fable's Part 3 review)" })
}
wb.Sheets.words = XLSX.utils.json_to_sheet(words)
const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, "Fable's Spanish Part 3 review: carro (W1045) in place of coche (off) in U53."])
wb.Sheets.README = XLSX.utils.aoa_to_sheet(r)
XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}: coche off, carro W1045`)
