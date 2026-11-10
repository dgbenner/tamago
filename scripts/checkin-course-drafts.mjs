// Rewrites a course's "<Course> drafted sentences" section of _source/check-in.md from its drafts.json (COURSE=es or de)
// (autonomous-build.md: every drafted sentence is listed in check-in.md), for the Spanish native-speaker check.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { at, C } from './lib/course.mjs'
const ROOT = join(import.meta.dirname, '..')
const drafts = JSON.parse(readFileSync(at('content/drafts.json'), 'utf8')).sentences
const units = JSON.parse(readFileSync(at('content/raw/units.json'), 'utf8'))
const off = new Set(JSON.parse(readFileSync(at('content/raw/sentences.json'), 'utf8')).filter((s) => String(s.status).startsWith('off')).map((s) => s.sentence_id))
const cut = new Set(JSON.parse(readFileSync(at('content/review-decisions.json'), 'utf8')).cut_sentences ?? []) // cut drafts don't ship
const live = drafts.filter((d) => !off.has(d.sentence_id) && !cut.has(d.sentence_id) && d.source !== 'tatoeba') // a draft later found on Tatoeba isn't ours
const HEAD = `## ${C.name} drafted sentences`
const lines = [HEAD, '', `Every ${C.name} sentence I wrote (${live.length}), for a native speaker${C.id === 'es' ? ' of Latin American Spanish' : C.id === 'de' ? ' of German as spoken in Germany' : ''}. Tatoeba sentences aren't listed.`, '']
for (const u of units) {
  const rows = live.filter((d) => d.unit_id === u.unit_id)
  if (!rows.length) continue
  lines.push(`**${u.unit_id} ${u.title}** (${rows.length})`, '', ...rows.map((d) => `- ${d.sentence_id} ${d.french} = ${d.english}${/QT09/.test(d.notes ?? '') ? ` (${d.notes.match(/QT09 \w+/)[0]})` : ''}`), '')
}
const path = join(ROOT, '_source/check-in.md')
let s = readFileSync(path, 'utf8')
// Each course's section ends where the next course's begins (Spanish, then German, at the end of the file).
const start = s.indexOf(HEAD)
const nextHeads = ['## Spanish drafted sentences', '## German drafted sentences'].filter((h) => h !== HEAD).map((h) => s.indexOf(h)).filter((i) => i > start)
const end = start >= 0 && nextHeads.length ? Math.min(...nextHeads) : -1
s = start < 0 ? s.trimEnd() + '\n\n' + lines.join('\n') + '\n' : s.slice(0, start) + lines.join('\n') + '\n' + (end >= 0 ? '\n' + s.slice(end) : '')
writeFileSync(path, s.trimEnd() + '\n')
console.log(`check-in: ${live.length} ${C.name} drafts listed`)
