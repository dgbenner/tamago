// The French workbook's A1 plan (A1 Complete, 2026-11-10): parts, tasks, and part and tasks columns on units.
// Spanish and German get theirs from their generators; all three take scripts/lib/a1-plan.mjs.
// Usage: node scripts/add-a1-plan.mjs <from.xlsx> <to.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { addA1Plan, PARTS } from './lib/a1-plan.mjs'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const [from, to] = process.argv.slice(2)
const wb = XLSX.readFile(join(ROOT, from))
addA1Plan(wb, XLSX, 'fr')
const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, `A1 Complete: a parts tab (${PARTS.fr.length} parts planned; Part 1 is the current tree), an a1_tasks tab (T01 to T13), and part and tasks columns on units.`])
wb.Sheets.README = XLSX.utils.aoa_to_sheet(r)
XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}`)
