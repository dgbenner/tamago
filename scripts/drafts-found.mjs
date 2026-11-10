// A drafted sentence the check finds on Tatoeba (same text, linked English, a native or OK signal) becomes a
// Tatoeba row: its drafts.json entry gets the source, so it leaves the native-speaker list. Run after the check.
// Usage: COURSE=es node scripts/drafts-found.mjs   (prints how many changed)
import { readFileSync, writeFileSync } from 'node:fs'
import { at } from './lib/course.mjs'
const path = at('content/drafts.json')
const drafts = JSON.parse(readFileSync(path, 'utf8'))
const checks = new Map(JSON.parse(readFileSync(at('content/checks/sentences.json'), 'utf8')).map((s) => [s.sentence_id, s]))
// A draft the workbook already holds (all of French's) is the workbook's row, not this file's: leave it.
const inBook = new Set(JSON.parse(readFileSync(at('content/raw/sentences.json'), 'utf8')).filter((s) => s.origin === 'workbook').map((s) => s.sentence_id))
let n = 0
for (const d of drafts.sentences) {
  if (inBook.has(d.sentence_id)) continue
  const c = checks.get(d.sentence_id)
  if (d.source === 'tatoeba' || c?.source !== 'tatoeba' || !c.source_id) continue
  Object.assign(d, { source: 'tatoeba', source_id: c.source_id, source_owner: c.source_owner, notes: `${d.notes ?? ''}; drafted, then found on Tatoeba from a checked owner`.replace(/^; /, '') })
  n++
}
writeFileSync(path, JSON.stringify(drafts, null, 2) + '\n')
console.log(`drafts found on Tatoeba: ${n}`)
