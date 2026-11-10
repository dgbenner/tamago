// The French workbook's help circles (Dan, 2026-11-10: the Asking for Help thread). Spanish and German get theirs from
// their generators; all three take scripts/lib/help-circles.mjs.
// Usage: node scripts/add-help-circles.mjs <from.xlsx> <to.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { addHelpCircles, HELP_ROWS } from './lib/help-circles.mjs'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const [from, to] = process.argv.slice(2)
const wb = XLSX.readFile(join(ROOT, from))
addHelpCircles(wb, XLSX, 'fr')
const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, `The Asking for Help thread: three help circles (${HELP_ROWS.map((h) => `${h.unit_id} ${h.title}, row ${h.row}`).join('; ')}), drafts until reviewed; words from W701; units gain a borrow_words column; "I can" statements CD91 to CD93.`])
wb.Sheets.README = XLSX.utils.aoa_to_sheet(r)
XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}: ${HELP_ROWS.length} help circles`)
