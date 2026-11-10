// Swaps drafts for the Tatoeba candidates Fable marked Use in _review/<course>-candidates.md (Dan, 2026-11-10; the
// Spanish run was apply-spanish-candidates.mjs, the French one is this). Same rules as Spanish:
//   - each draft takes its first Use candidate in the table (the same sentence first) that is still free: one
//     Tatoeba sentence is in the course once;
//   - a draft that is half of a QT09 question-and-answer pair changes only for the same sentence;
//   - Fable's English pick, where named, replaces Tatoeba's line;
//   - the sentence id stays, and the swap is recorded as a confirm in review-decisions (the owner has no native or
//     OK signal, so the trust test alone would hold it out).
// French drafts are workbook rows, so this writes the next workbook: node scripts/apply-trust-candidates.mjs <from.xlsx> <to.xlsx> [--dry]
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { at, C } from './lib/course.mjs'
import { analyse, formIndexFor } from './lib/french.mjs'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const [from, to] = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const dry = process.argv.includes('--dry')
const raw = (t) => JSON.parse(readFileSync(at(`content/raw/${t}.json`), 'utf8'))

const md = readFileSync(join(ROOT, `_review/${C.name.toLowerCase()}-candidates.md`), 'utf8').split('\n')
const options = new Map()
let draft = null
for (const line of md) {
  if (!line.startsWith('| ')) { draft = null; continue }
  const cells = line.split(' | ').map((c) => c.replace(/^\| ?|\s*\|$/g, '').trim())
  if (/^S\d+ /.test(cells[0])) draft = cells[0].match(/^(S\d+) (.+) = (.+)$/)
  if (!draft) continue
  const cand = cells[1]?.match(/^(.+?) = (.+) \[#(\d+)\]/)
  const verdict = cells.at(-1) ?? ''
  if (!cand || !/\*\*Use/.test(verdict)) continue
  const pick = verdict.match(/pick "([^"]+)"/)?.[1]
  if (!options.has(draft[1])) options.set(draft[1], [])
  options.get(draft[1]).push({ id: draft[1], oldFrench: draft[2], french: cand[1].replace(/\\\|/g, '|'), tatoebaEnglish: cand[2], english: pick ?? cand[2], source_id: cand[3], owner: cells[2], picked: Boolean(pick), same: /the same sentence/.test(cells[3] ?? '') })
}
const inPair = new Set(raw('qa_answers').flatMap((q) => [q.question_sentence_id, q.answer_sentence_id]))
const picks = new Map()
const held = []
const taken = new Set()
for (const [id, list] of options) {
  const usable = list.filter((c) => !taken.has(c.source_id) && (!inPair.has(id) || c.same))
  if (!usable.length) { held.push({ id, why: inPair.has(id) ? 'pair' : 'used', first: list[0] }); continue }
  picks.set(id, usable[0]); taken.add(usable[0].source_id)
}
console.log(`drafts with a Use candidate: ${options.size}; swapped: ${picks.size}; held: ${held.length} (${held.filter((h) => h.why === 'pair').length} pair halves, ${held.filter((h) => h.why === 'used').length} candidates used)`)
for (const h of held) console.log(`  held ${h.id} ${h.first.oldFrench} (${h.why === 'pair' ? 'half of a QT09 pair' : 'candidates already used'}; first Use: ${h.first.french})`)
for (const p of picks.values()) console.log(`${p.id} ${p.oldFrench} -> ${p.french} = ${p.english}${p.picked ? `  (Tatoeba: ${p.tatoebaEnglish})` : ''}`)
if (dry) process.exit(0)

const wb = XLSX.readFile(join(ROOT, from))
const sheet = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' })
const header = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { header: 1, defval: '' })[0]
const save = (n, rows) => { const cols = [...header(n)]; for (const r of rows) for (const k of Object.keys(r)) if (!cols.includes(k)) cols.push(k); wb.Sheets[n] = XLSX.utils.json_to_sheet(rows, { header: cols }) }
const sentences = sheet('sentences')
let sw = sheet('sentence_words')
const words = sheet('words').filter((w) => !String(w.status).startsWith('off'))
const order = new Map(sheet('units').map((u) => [u.unit_id, u.order]))
const names = new Set(sw.filter((r) => r.notes === 'name').map((r) => String(r.surface).toLowerCase()))
const decPath = at('content/review-decisions.json')
const dec = JSON.parse(readFileSync(decPath, 'utf8'))
for (const p of picks.values()) {
  const row = sentences.find((s) => s.sentence_id === p.id)
  if (!row || row.source !== 'tamago_original') throw new Error(`${p.id}: not a draft row in the workbook`)
  const a = analyse(p.french, formIndexFor(words.filter((w) => order.get(w.first_unit) <= order.get(row.unit_id))), { names })
  if (a.unknown) throw new Error(`${p.id} "${p.french}": "${a.unknown}" is not a known word`)
  Object.assign(row, { french: p.french, english: p.english, source: 'tatoeba', source_id: p.source_id, status: 'live',
    notes: `${row.notes}; swapped 2026-11-10 for Tatoeba #${p.source_id} (${p.owner}; Fable's review: Use)${p.picked ? `, English picked by Fable over "${p.tatoebaEnglish}"` : ''}; was the draft "${p.oldFrench}"` })
  sw = sw.filter((x) => x.sentence_id !== p.id)
  a.parts.forEach((q, k) => sw.push({ sentence_id: p.id, position: k + 1, surface: q.surface, word_id: q.word_id ?? '', notes: q.name ? 'name' : '', hint_override: '' }))
  dec.sentences[p.id] = { action: 'confirm', french: p.french, english_source: p.picked ? 'Fable review pick' : '', by: `Fable's review of _review/${C.name.toLowerCase()}-candidates.md (Use), applied by Claude at Dan's request, 2026-11-10: owner ${p.owner} has no native or OK signal` }
}
save('sentences', sentences)
save('sentence_words', sw)
const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, `${picks.size} Tamago drafts swapped for Tatoeba sentences Fable reviewed as Use (_review/${C.name.toLowerCase()}-candidates.md); ids kept, Fable's English picks used, QT09 pairs left whole, each Tatoeba sentence once. ${held.length} held.`])
wb.Sheets.README = XLSX.utils.aoa_to_sheet(r)
XLSX.writeFile(wb, join(ROOT, to))
writeFileSync(decPath, JSON.stringify(dec, null, 2) + '\n')
console.log(`wrote ${to}; swapped ${picks.size}`)
