// Applies Fable's review of a part's candidates file (Dan, 2026-11-14; Spanish Part 2 first):
//   - every candidate marked Use is brought into its circle, with Fable's English pick where named ("English to show");
//     candidates in the "and N more" tails aren't in the file, so they weren't reviewed and stay out; Rejects stay out;
//   - the drafts Fable named a swap for in the check file (the Fix or swap column: "Swap: #id …", the first id named)
//     become that Tatoeba sentence, keeping their id (pairs and progress point at it);
//   - each Tatoeba row brought in is a reviewed confirm in review-decisions, since its owner has no native or OK signal.
// Brought-in rows go to drafts.json as Tatoeba rows (like earlier swaps), ids from S<unit>201 so no id moves.
// Usage: COURSE=es PART=2 node scripts/apply-part-candidates.mjs [--dry]
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { at, C } from './lib/course.mjs'
const ROOT = join(import.meta.dirname, '..')
const dry = process.argv.includes('--dry')
const PART = Number(process.env.PART || 2)
const base = `_review/${C.name.toLowerCase()}-part${PART}`
const CAND = `${base}-candidates.md`, CHECK = `${base}-check.md`
const today = new Date().toISOString().slice(0, 10)

// The candidates file: unit headings, table rows (draft | candidate | owner | why | verdict) and the bulleted others.
const cands = new Map() // source_id -> { unit, french, tatoebaEnglish, english, owner, picked, use }
let unit = null
for (const line of readFileSync(join(ROOT, CAND), 'utf8').split('\n')) {
  const h = line.match(/^## (U\d+) /); if (h) { unit = h[1]; continue }
  let french, english, id, owner, verdict
  if (line.startsWith('| ')) {
    const cells = line.split(' | ').map((c) => c.replace(/^\| ?|\s*\|$/g, '').trim())
    const m = cells[1]?.match(/^(.+?) = (.+) \[#(\d+)\]/); if (!m) continue
    ;[, french, english, id] = m; owner = cells[2]; verdict = cells.at(-1)
  } else if (line.startsWith('- ')) {
    const m = line.match(/^- (.+?) = (.+) \[#(\d+)\]\([^)]*\) \(([^;)]+)[^)]*\) · (.*)$/); if (!m) continue
    ;[, french, english, id, owner, verdict] = m
  } else continue
  if (!/\*\*(Use|Reject)/.test(verdict ?? '')) continue
  const pick = verdict.match(/English to show: "([^"]+)"/)?.[1]
  if (!cands.has(id)) cands.set(id, { unit, french, tatoebaEnglish: english, english: pick ?? english, owner, picked: Boolean(pick), use: /\*\*Use/.test(verdict) })
}
const use = [...cands.entries()].filter(([, c]) => c.use)
console.log(`candidates marked: ${cands.size}; Use ${use.length}; Reject ${cands.size - use.length}; English picks ${use.filter(([, c]) => c.picked).length}`)

// The check file's named swaps.
const swaps = new Map()
for (const line of readFileSync(join(ROOT, CHECK), 'utf8').split('\n')) {
  const cells = line.split(' | ').map((c) => c.replace(/^\| ?|\s*\|$/g, '').trim())
  if (!/^S\d+$/.test(cells[0] ?? '')) continue
  const sw = cells[4]?.match(/Swap: #(\d+)/); if (!sw) continue
  const c = cands.get(sw[1]); if (!c) throw new Error(`${cells[0]}: swap #${sw[1]} is not in ${CAND}`)
  // An English named in the swap note ("show \"…\"") wins over the candidate's.
  const show = cells[4].match(/show "([^"]+)"/)?.[1]
  swaps.set(cells[0], { ...c, source_id: sw[1], english: show ?? c.english, picked: Boolean(show) || c.picked })
}
console.log(`swaps named: ${swaps.size}`)

const dpath = at('content/drafts.json'), decPath = at('content/review-decisions.json')
const drafts = JSON.parse(readFileSync(dpath, 'utf8')), dec = JSON.parse(readFileSync(decPath, 'utf8'))
const inCourse = new Set(JSON.parse(readFileSync(at('content/raw/sentences.json'), 'utf8')).filter((s) => s.source === 'tatoeba').map((s) => String(s.source_id)))
const confirm = (id, c, how) => { dec.sentences[id] = { action: 'confirm', french: c.french, english_source: c.picked ? 'Fable review pick' : '', by: `Fable's review of ${CAND} (${how}), applied by Claude at Dan's request, ${today}: owner ${c.owner} has no native or OK signal` } }
for (const [id, c] of swaps) {
  const d = drafts.sentences.find((x) => x.sentence_id === id); if (!d) throw new Error(`${id}: not a draft`)
  console.log(`swap ${id} ${d.french} -> ${c.french} = ${c.english}`)
  Object.assign(d, { french: c.french, english: c.english, source: 'tatoeba', source_id: c.source_id, source_owner: c.owner,
    notes: `${d.notes ?? ''}; swapped ${today} for Tatoeba #${c.source_id} (Fable's review: Use)${c.picked ? `, English picked by Fable over "${c.tatoebaEnglish}"` : ''}; was the draft "${d.french}"`.replace(/^; /, '') })
  confirm(id, c, 'named swap')
}
const swapped = new Set([...swaps.values()].map((c) => c.source_id))
const next = new Map()
let added = 0, skipped = 0
for (const [sid, c] of use) {
  if (swapped.has(sid) || inCourse.has(sid) || drafts.sentences.some((x) => String(x.source_id) === sid)) { skipped++; continue }
  const n = (next.get(c.unit) ?? Number(c.unit.slice(1)) * 1000 + 201)
  next.set(c.unit, n + 1)
  const id = `S${n}`
  if (drafts.sentences.some((x) => x.sentence_id === id)) throw new Error(`${id} taken`)
  drafts.sentences.push({ sentence_id: id, unit_id: c.unit, french: c.french, english: c.english, source: 'tatoeba', source_id: sid, source_owner: c.owner,
    notes: `brought in ${today} from Fable's review of ${CAND} (Use)${c.picked ? `, English picked by Fable over "${c.tatoebaEnglish}"` : ''}` })
  confirm(id, c, 'Use')
  added++
}
console.log(`brought in: ${added}; already in the course or used by a swap: ${skipped}`)
if (!dry) { writeFileSync(dpath, JSON.stringify(drafts, null, 2) + '\n'); writeFileSync(decPath, JSON.stringify(dec, null, 2) + '\n') }
