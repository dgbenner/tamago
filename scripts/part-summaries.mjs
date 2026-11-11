// Part descriptions for the carousel (Dan, 2026-11-11): no periods, and no word from the part's own title (Time and
// Plans doesn't say time or plans again; Home and Work doesn't say home or work). Writes the next workbook version;
// rerun after regenerating a Spanish or German workbook with its make-*-workbook script.
// Usage: COURSE=fr|es|de node scripts/part-summaries.mjs <from.xlsx> <to.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { C } from './lib/course.mjs'

const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')

const SHARED = {
  1: 'Hello and goodbye, people, food, animals, questions, numbers to ten, colors, days and getting help',
  2: 'Spelling, phone numbers, age, address, nationality, numbers to 100, prices and shopping',
  3: 'Days, months, dates, the clock, arranging to meet, signs, schedules and short announcements',
}
export const SUMMARIES = {
  fr: { ...SHARED, 4: 'Ordering food and drink, directions, shops and the market', 5: 'Family, rooms, jobs, forms and daily routines', 6: 'Menus, notices, messages and postcards' },
  es: { ...SHARED, 4: 'Ordering food and drink, directions, home, family, jobs, forms and short messages' },
  de: { ...SHARED, 4: 'Ordering food and drink, directions, home, family, jobs, forms and short messages' },
}

const [from, to] = process.argv.slice(2)
if (!from || !to) throw new Error('usage: COURSE=fr|es|de node scripts/part-summaries.mjs <from.xlsx> <to.xlsx>')
const wb = XLSX.readFile(join(ROOT, from))
const sheet = (name) => XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: '' })
const header = (name) => XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: '' })[0]
const save = (name, rows) => { wb.Sheets[name] = XLSX.utils.json_to_sheet(rows, { header: header(name) }) }

const map = SUMMARIES[C.id]
const words = (t) => String(t).toLowerCase().match(/[a-z]+/g) ?? []
save('parts', sheet('parts').map((p) => {
  const summary = map[p.part]
  if (!summary) throw new Error(`part ${p.part}: no summary`)
  const titleWords = words(p.title).filter((w) => !['and', 'the', 'of', 'a'].includes(w))
  const repeat = titleWords.find((w) => words(summary).some((x) => x.startsWith(w)))
  if (repeat) throw new Error(`part ${p.part} (${p.title}): the summary repeats "${repeat}"`)
  if (/\.\s*$/.test(summary)) throw new Error(`part ${p.part}: no period at the end`)
  console.log(`${p.part} ${p.title}: ${summary}`)
  return { ...p, summary }
}))
const version = to.match(/v(\d+)/)?.[1]
const note = 'Part descriptions (Dan, 2026-11-11): no periods, no word from the part title.'
save('README', [...sheet('README').map((r) => (r.item === 'Version' ? { ...r, notes: `Workbook v${version}, ${new Date().toISOString().slice(0, 10)}. ${note}` } : r)), { item: `Changes to v${version}`, notes: note }])
XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}`)
