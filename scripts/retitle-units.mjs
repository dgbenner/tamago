// Shorter tree titles (Dan, 2026-11-11): 2 to 3 words, Title Case, "+" for "and", US spelling. French Part 1 is Dan's
// list; Spanish and German follow it where the circle is the same, and the same style where it isn't. French Part 2
// waits ("No Part 2 until Part 1 is clean"). Writes the next workbook version; rerun after regenerating a Spanish or
// German workbook with its make-*-workbook script, which writes the old titles back.
// Usage: COURSE=fr|es|de node scripts/retitle-units.mjs <from.xlsx> <to.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { C } from './lib/course.mjs'

const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')

// By old title, so a circle keeps its new name in every course that has it.
export const SHARED = {
  'Saying Hello': 'Say Hi', 'Asking for Help': 'Getting Help', 'People and Things': 'People + Things',
  'Food and Drink': 'Food + Drink', 'Pets and Animals': 'Animals', 'Asking About Words': 'Conversation Help',
  'Your Topic': 'Pick Your Own', 'Another Topic': 'Pick Your Own', 'More Than One': 'Plurals',
  'Counting to Ten': 'Intro to Numbers', 'Naming Colours': 'Colors', 'Days and Times': 'Time',
}
// Circles only one course has.
export const OWN = {
  fr: {},
  es: { 'Body and Feelings': 'Body + Feelings' },
  de: { 'Not and None': 'Not + None', 'Wanting and Can': 'Want + Can', 'People and Feelings': 'People + Feelings' },
}
// French Part 2 keeps its titles for now.
const KEEP_PARTS = { fr: [2], es: [], de: [] }

const [from, to] = process.argv.slice(2)
if (!from || !to) throw new Error('usage: COURSE=fr|es|de node scripts/retitle-units.mjs <from.xlsx> <to.xlsx>')
const id = C.id
const map = { ...SHARED, ...OWN[id] }
const wb = XLSX.readFile(join(ROOT, from))
const sheet = (name) => XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: '' })
const header = (name) => XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: '' })[0]
const save = (name, rows) => { wb.Sheets[name] = XLSX.utils.json_to_sheet(rows, { header: header(name) }) }

const changed = []
save('units', sheet('units').map((u) => {
  const next = map[u.title]
  if (!next || KEEP_PARTS[id].includes(Number(u.part))) return u
  changed.push(`${u.unit_id} ${u.title} → ${next}`)
  return { ...u, title: next }
}))
const version = to.match(/v(\d+)/)?.[1]
const note = 'Shorter tree titles (Dan, 2026-11-11): 2 to 3 words, Title Case, + for and, US spelling.'
const readme = sheet('README')
save('README', [...readme.map((r) => (r.item === 'Version' ? { ...r, notes: `Workbook v${version}, ${new Date().toISOString().slice(0, 10)}. ${note}` } : r)), { item: `Changes to v${version}`, notes: note }])
XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}:\n${changed.join('\n')}`)
