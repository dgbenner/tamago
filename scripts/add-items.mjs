// Adds or replaces A1 task items (a1_texts, a1_forms, a1_prompts, a1_listen rows) in a course workbook from a config
// module whose default export is { note, items: { tab: [rows] } }, rows shaped as in scripts/add-part.mjs (Dan,
// 2026-11-15: French Part 2's Read and Answer brought up to three texts per circle, scripts/part2/fr-texts.mjs).
// Usage: node scripts/add-items.mjs <config.mjs> <from.xlsx> <to.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const [config, from, to] = process.argv.slice(2)
const P = (await import(pathToFileURL(join(ROOT, config)).href)).default
const wb = XLSX.readFile(join(ROOT, from))
let n = 0
for (const [tab, rows] of Object.entries(P.items)) {
  const keep = XLSX.utils.sheet_to_json(wb.Sheets[tab], { defval: '' }).filter((r) => !rows.some((x) => x.id === r.id))
  wb.Sheets[tab] = XLSX.utils.json_to_sheet([...keep, ...rows])
  n += rows.length
}
const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, P.note])
wb.Sheets.README = XLSX.utils.aoa_to_sheet(r)
XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}: ${n} items`)
