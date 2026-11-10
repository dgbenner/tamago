// The content numbers report for French and Spanish (Dan, 2026-11-10), from the shipped tables, the same numbers the
// Developer page's Course Snapshot shows. Hours use the craft review's lesson times here (the lesson log is on the
// device). Usage: node scripts/content-report.mjs
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { contentNumbers } from '../src/lib/snapshot.js'
const ROOT = join(import.meta.dirname, '..')
const load = (dir) => Object.fromEntries(readdirSync(join(ROOT, dir)).filter((f) => f.endsWith('.json')).map((f) => [f.slice(0, -5), JSON.parse(readFileSync(join(ROOT, dir, f), 'utf8'))]))
const pct = (x, t) => `${Math.round((x * 100) / t)}%`
for (const [name, dir] of [['French', 'src/content'], ['Spanish', 'src/content-es']]) {
  const c = contentNumbers(load(dir))
  console.log(JSON.stringify({ name, ...c, pctChecked: pct(c.checked, c.sentences), pctFable: pct(c.fable, c.sentences), pctDrafted: pct(c.drafted, c.sentences), pctRecorded: pct(c.recorded, c.words), minutes: c.minutes.map((m) => m.min) }))
}
