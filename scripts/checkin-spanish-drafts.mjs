// Rewrites the "Spanish drafted sentences" section at the end of _source/check-in.md from content-es/drafts.json
// (autonomous-build.md: every drafted sentence is listed in check-in.md), for the Spanish native-speaker check.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
const ROOT = join(import.meta.dirname, '..')
const drafts = JSON.parse(readFileSync(join(ROOT, 'content-es/drafts.json'), 'utf8')).sentences
const units = JSON.parse(readFileSync(join(ROOT, 'content-es/raw/units.json'), 'utf8'))
const off = new Set(JSON.parse(readFileSync(join(ROOT, 'content-es/raw/sentences.json'), 'utf8')).filter((s) => String(s.status).startsWith('off')).map((s) => s.sentence_id))
const live = drafts.filter((d) => !off.has(d.sentence_id) && d.source !== 'tatoeba') // a draft later found on Tatoeba isn't ours
const lines = ['## Spanish drafted sentences', '', `Every Spanish sentence I wrote (${live.length}), for a native speaker of Latin American Spanish. Tatoeba sentences aren't listed.`, '']
for (const u of units) {
  const rows = live.filter((d) => d.unit_id === u.unit_id)
  if (!rows.length) continue
  lines.push(`**${u.unit_id} ${u.title}** (${rows.length})`, '', ...rows.map((d) => `- ${d.sentence_id} ${d.french} = ${d.english}${/QT09/.test(d.notes ?? '') ? ` (${d.notes.match(/QT09 \w+/)[0]})` : ''}`), '')
}
const path = join(ROOT, '_source/check-in.md')
let s = readFileSync(path, 'utf8')
const at = s.indexOf('## Spanish drafted sentences')
s = (at >= 0 ? s.slice(0, at) : s.trimEnd() + '\n\n') + lines.join('\n')
writeFileSync(path, s.trimEnd() + '\n')
console.log(`check-in: ${live.length} Spanish drafts listed`)
