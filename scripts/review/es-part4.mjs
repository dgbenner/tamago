// Fable's Spanish Part 4 review, the changes outside Parts 3 and 4's own configs (Dan, 2026-11-15;
// _review/spanish-part4-check.md): departamento in place of apartamento (U45) and lentes in place of gafas (U54),
// the Spain words turned off and accepted as answers (content-es/review-decisions.json accepted_additions); and every
// Write a Message prompt at 30 to 40 words, the length of DELE A1's Tarea 2. The other Mexican words are in
// scripts/part4/es.mjs. Rerun after scripts/review/es-part3.mjs when a workbook is regenerated.
// Usage: node scripts/review/es-part4.mjs _source/tamago-es-data-v10.xlsx _source/tamago-es-data-v11.xlsx
import { join } from 'node:path'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '../..')
const [from, to] = process.argv.slice(2)
const wb = XLSX.readFile(join(ROOT, from))
const words = XLSX.utils.sheet_to_json(wb.Sheets.words, { defval: '' })
for (const [old, form, id] of [['apartamento', 'departamento', 'W906'], ['gafas', 'lentes', 'W1159']]) {
  const w = words.find((x) => x.form === old); if (!w) throw new Error(`${old} is not in the workbook`)
  w.status = `off: Spain; the course teaches ${form} (Dan, 2026-11-15)`
  if (words.some((x) => x.form === form)) continue
  if (words.some((x) => x.word_id === id)) throw new Error(`${id} is taken`)
  words.push({ ...w, word_id: id, form, wiktionary_url: `https://en.wiktionary.org/wiki/${form}#Spanish`, status: 'pull from Wiktionary', notes: `in place of ${old}: Fable's Part 4 review` })
}
wb.Sheets.words = XLSX.utils.json_to_sheet(words)
const prompts = XLSX.utils.sheet_to_json(wb.Sheets.a1_prompts, { defval: '' }).map((p) => ({ ...p, min_words: 30, max_words: 40 }))
wb.Sheets.a1_prompts = XLSX.utils.json_to_sheet(prompts)
const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, "Fable's Spanish Part 4 review: departamento (W906) for apartamento and lentes (W1159) for gafas, both off; every Write a Message prompt 30 to 40 words."])
wb.Sheets.README = XLSX.utils.aoa_to_sheet(r)
XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}: departamento, lentes; ${prompts.length} prompts at 30 to 40 words`)
