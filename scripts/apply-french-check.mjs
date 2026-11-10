// Folds the French check of 2026-11-10 (_review/2026-11-10/french-check.md) into the next workbook (Dan's ruling:
// apply its fixes and cuts, skip Weather sentences already off, keep the four Family Life lines, add the accepted
// answers its Keep rows name). Sentence ids stay, so progress and pairs keep pointing at the right rows.
// Usage: node scripts/apply-french-check.mjs <from.xlsx> <to.xlsx>
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { analyse, formIndexFor } from './lib/french.mjs'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const [from, to] = process.argv.slice(2)
const wb = XLSX.readFile(join(ROOT, from))
const sheet = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' })
const header = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { header: 1, defval: '' })[0]
const save = (n, rows) => { const cols = [...header(n)]; for (const r of rows) for (const k of Object.keys(r)) if (!cols.includes(k)) cols.push(k); wb.Sheets[n] = XLSX.utils.json_to_sheet(rows, { header: cols }) }
const changelog = (line) => { const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' }); r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, line]); wb.Sheets.README = XLSX.utils.aoa_to_sheet(r) }

// Fix rows. S6053, S6054, S6055 (Weather) are off since the rebuild; S6152, S6158, S6159, S6160 stay (Dan).
const FIXES = {
  S3106: { french: 'Oui, je suis Marie. Bonsoir !', english: "Yes, I'm Marie. Good evening!", why: 'confirm first, then greet' },
  S7355: { french: "Je mange du pain parce que j'aime le pain.", english: "I'm eating bread because I like bread.", why: 'eating in general because one likes bread did not follow' },
}
// Cuts: S6056 and S6057, both already off. Accepted answers from the Keep rows' notes.
const ANSWERS = [
  ['S2108', 'No, she is small.', 'petite for a person: short, and small too'],
  ['S3103', 'How are you, Marie?', 'ça va as a greeting question'],
  ['S3114', 'Sorry, is it here?', 'pardon as sorry'],
  ['S7263', "It's his tortoise.", 'sa is his or her'],
  ['S7268', "No, it's his apple.", 'sa is his or her'],
]

const sentences = sheet('sentences')
let sw = sheet('sentence_words')
const words = sheet('words').filter((w) => !String(w.status).startsWith('off'))
const units = sheet('units')
const order = new Map(units.map((u) => [u.unit_id, u.order]))
const names = new Set(sw.filter((r) => r.notes === 'name').map((r) => String(r.surface).toLowerCase()))
const done = []
for (const [id, f] of Object.entries(FIXES)) {
  const row = sentences.find((s) => s.sentence_id === id)
  const known = words.filter((w) => order.get(w.first_unit) <= order.get(row.unit_id))
  const a = analyse(f.french, formIndexFor(known), { names })
  if (a.unknown) throw new Error(`${id} "${f.french}": "${a.unknown}" is not a known word`)
  Object.assign(row, { french: f.french, english: f.english, notes: `${row.notes}; French check 2026-11-10: was "${row.french}" = "${row.english}" (${f.why})` })
  sw = sw.filter((x) => x.sentence_id !== id)
  a.parts.forEach((q, k) => sw.push({ sentence_id: id, position: k + 1, surface: q.surface, word_id: q.word_id ?? '', notes: q.name ? 'name' : '', hint_override: '' }))
  done.push(`${id} ${f.french}`)
}
save('sentences', sentences)
save('sentence_words', sw)

const answers = sheet('accepted_answers')
ANSWERS.forEach(([sid, answer, why], k) => {
  if (answers.some((x) => x.sentence_id === sid && x.direction === 'fr_to_en' && x.answer.toLowerCase() === answer.toLowerCase())) return
  answers.push({ answer_id: `AF${sid.slice(1)}${k + 1}`, sentence_id: sid, direction: 'fr_to_en', answer, source: `French check 2026-11-10: ${why}`, status: 'live' })
})
save('accepted_answers', answers)

// drafts.json carries the same rows for the native-speaker check list; keep its text in step.
const draftsPath = join(ROOT, 'content/drafts.json')
const drafts = JSON.parse(readFileSync(draftsPath, 'utf8'))
for (const list of Object.values(drafts)) if (Array.isArray(list)) for (const d of list) if (FIXES[d.sentence_id] && d.french) Object.assign(d, { french: FIXES[d.sentence_id].french, english: FIXES[d.sentence_id].english })
writeFileSync(draftsPath, JSON.stringify(drafts, null, 2) + '\n')

changelog(`French check 2026-11-10 (_review/2026-11-10/french-check.md): fixed ${done.join('; ')}; ${ANSWERS.length} accepted answers added from its Keep notes (${ANSWERS.map((x) => x[0]).join(', ')}). Weather fixes and cuts skipped (those rows are off since the rebuild); the four Family Life lines kept as they are (Dan).`)
XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}: ${done.join(' | ')}; ${ANSWERS.length} answers`)
