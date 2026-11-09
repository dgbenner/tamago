// Folds a flags file saved from the app (Settings, Flag review, "Save for Claude") into the content.
// Approved "my answer should be accepted" flags become accepted answers for everyone at the next deploy
// (decisions.accepted_additions, then the workbook at the next sync). Every other open flag goes to
// content/flags-inbox.json for Claude to act on under the content rules.
// Usage: node scripts/import-flags.mjs <tamago-flags-YYYY-MM-DD.json>
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
const ROOT = join(import.meta.dirname, '..')
const file = process.argv[2]
if (!file) throw new Error('usage: import-flags.mjs <flags file>')
const data = JSON.parse(readFileSync(file, 'utf8'))
if (data.app !== 'tamago' || data.kind !== 'flags') throw new Error('Not a Tamago flags file.')

const DEC = join(ROOT, 'content/review-decisions.json')
const decisions = JSON.parse(readFileSync(DEC, 'utf8'))
decisions.accepted_additions ??= []
const norm = (t) => String(t).trim().replace(/\s+/g, ' ')
const known = new Set(decisions.accepted_additions.map((a) => `${a.sentence_id}|${a.direction}|${norm(a.answer)}`))
let next = decisions.accepted_additions.length + 1
let added = 0
for (const f of data.flags.filter((x) => x.status === 'accepted' && x.given && x.direction)) {
  const key = `${f.sentence_id}|${f.direction}|${norm(f.given)}`
  if (known.has(key)) continue
  known.add(key)
  decisions.accepted_additions.push({
    answer_id: `AF${String(next++).padStart(4, '0')}`, sentence_id: f.sentence_id, direction: f.direction, answer: norm(f.given),
    source: `learner flag, approved by Dan ${String(f.decided_at ?? '').slice(0, 10)}`.trim(), status: 'live',
  })
  added++
}
writeFileSync(DEC, JSON.stringify(decisions, null, 2) + '\n')

const INBOX = join(ROOT, 'content/flags-inbox.json')
const inbox = existsSync(INBOX) ? JSON.parse(readFileSync(INBOX, 'utf8')) : []
const seen = new Set(inbox.map((f) => f.flag_id))
const open = data.flags.filter((f) => f.status !== 'accepted' && f.status !== 'dismissed' && !seen.has(f.flag_id))
writeFileSync(INBOX, JSON.stringify([...inbox, ...open], null, 2) + '\n')
console.log(`${added} accepted answers added to review-decisions.json; ${open.length} open flags added to content/flags-inbox.json. Run npm run content next.`)
