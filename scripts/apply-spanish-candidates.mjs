// Swaps a course's drafts for Tatoeba candidates Fable marked Use in _review/<course>-candidates.md (Dan, 2026-11-10;
// Spanish first, German the same way). Fable's English pick is written pick "…" or English to show: "…".
// For each draft, its first Use candidate in the table (the same sentence first, then the shortest); Fable's English
// pick, where named, replaces Tatoeba's line. The draft keeps its sentence id (pairs and progress point at it) and
// becomes a Tatoeba row, recorded as a reviewed confirm in review-decisions (its owner has no native or OK signal,
// so the check's trust test alone would hold it out). The bulleted "other candidates" stay in the file as a reserve.
// Usage: COURSE=es node scripts/apply-spanish-candidates.mjs [--dry]   (COURSE=de for German)
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { at, C } from './lib/course.mjs'
const ROOT = join(import.meta.dirname, '..')
const dry = process.argv.includes('--dry')
// --keep S3106,…: drafts left as they are (German S3106 Entschuldigung! carries the accepted answer Sorry!), so their
// candidates can go to the next draft.
const keep = new Set((process.argv[process.argv.indexOf('--keep') + 1] ?? '').split(',').filter((x) => process.argv.includes('--keep') && x))
const FILE = `_review/${C.name.toLowerCase()}-candidates.md`
const md = readFileSync(join(ROOT, FILE), 'utf8').split('\n')
const picks = new Map()
const options = new Map()
let draft = null
for (const line of md) {
  if (!line.startsWith('| ')) { draft = null; continue }
  const cells = line.split(' | ').map((c) => c.replace(/^\| ?|\s*\|$/g, '').trim())
  if (/^S\d+ /.test(cells[0])) draft = cells[0].match(/^(S\d+) (.+) = (.+)$/)
  if (!draft) continue
  const cand = cells[1]?.match(/^(.+?) = (.+) \[#(\d+)\]/)
  const verdict = cells.at(-1) ?? ''
  if (!cand || !/\*\*Use/.test(verdict) || keep.has(draft[1])) continue
  const pick = verdict.match(/(?:pick|English to show:) "([^"]+)"/)?.[1]
  if (!options.has(draft[1])) options.set(draft[1], [])
  options.get(draft[1]).push({ id: draft[1], oldFrench: draft[2], french: cand[1], tatoebaEnglish: cand[2], english: pick ?? cand[2], source_id: cand[3], owner: cells[2], picked: Boolean(pick), same: /the same sentence/.test(cells[3] ?? '') })
}
// Two rules keep the course sound. A Tatoeba sentence can be in the course once, so each draft takes its first Use
// candidate not already taken. A draft that is half of a QT09 question-and-answer pair is swapped only for the same
// sentence, since any other line would stop answering (or asking) its partner.
const draftsFile = JSON.parse(readFileSync(at('content/drafts.json'), 'utf8'))
const inPair = new Set(draftsFile.qa_answers.flatMap((q) => [q.question_sentence_id, q.answer_sentence_id]))
const taken = new Set()
const held = []
for (const [id, list] of options) {
  const usable = list.filter((c) => !taken.has(c.source_id) && (!inPair.has(id) || c.same))
  if (!usable.length) { held.push({ id, why: inPair.has(id) ? 'half of a QT09 pair, and no Use candidate is the same sentence' : 'its Use candidates already replace other drafts', first: list[0] }); continue }
  picks.set(id, usable[0]); taken.add(usable[0].source_id)
}
console.log(`drafts with a Use candidate: ${options.size}; swapped: ${picks.size}; held: ${held.length}`)
for (const h of held) console.log(`  held ${h.id} ${h.first.oldFrench} (${h.why}; first Use: ${h.first.french})`)
for (const p of picks.values()) console.log(`${p.id} ${p.oldFrench} -> ${p.french} = ${p.english}${p.picked ? `  (Tatoeba: ${p.tatoebaEnglish})` : ''}`)
if (!dry) {
  const dpath = at('content/drafts.json')
  const drafts = JSON.parse(readFileSync(dpath, 'utf8'))
  const decPath = at('content/review-decisions.json')
  const dec = JSON.parse(readFileSync(decPath, 'utf8'))
  for (const p of picks.values()) {
    const d = drafts.sentences.find((x) => x.sentence_id === p.id)
    if (!d) throw new Error(`${p.id}: not a draft`)
    Object.assign(d, { french: p.french, english: p.english, source: 'tatoeba', source_id: p.source_id, source_owner: p.owner,
      notes: `${d.notes ?? ''}; swapped 2026-11-10 for Tatoeba #${p.source_id} (Fable's review: Use)${p.picked ? `, English picked by Fable over "${p.tatoebaEnglish}"` : ''}; was the draft "${d.french}"`.replace(/^; /, '') })
    dec.sentences[p.id] = { action: 'confirm', french: p.french, english_source: p.picked ? 'Fable review pick' : '', by: `Fable's review of ${FILE} (Use), applied by Claude at Dan's request, 2026-11-10: owner ${p.owner} has no native or OK signal` }
  }
  writeFileSync(dpath, JSON.stringify(drafts, null, 2) + '\n')
  writeFileSync(decPath, JSON.stringify(dec, null, 2) + '\n')
  console.log(`swapped ${picks.size}`)
}
