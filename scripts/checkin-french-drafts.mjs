// Rewrites the French "Drafted sentences" section of _source/check-in.md from the course (every live
// tamago_original sentence), so the native-speaker list in check-in matches the app's Native-Speaker Check.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
const ROOT = join(import.meta.dirname, '..')
const sentences = JSON.parse(readFileSync(join(ROOT, 'content/raw/sentences.json'), 'utf8'))
const units = JSON.parse(readFileSync(join(ROOT, 'content/raw/units.json'), 'utf8')).sort((a, b) => a.order - b.order)
const live = sentences.filter((s) => s.source === 'tamago_original' && String(s.status).startsWith('live'))
const lines = ['## Drafted sentences', '', `Every French sentence I wrote (${live.length}), for the native-speaker check. Tatoeba sentences aren't listed.`, '']
for (const u of units) {
  const rows = live.filter((s) => s.unit_id === u.unit_id)
  if (!rows.length) continue
  lines.push(`**${u.unit_id} ${u.title}** (${rows.length})`, '', ...rows.map((s) => `- ${s.sentence_id} ${s.french} = ${s.english}${/QT09 \w+/.test(s.notes ?? '') ? ` (${s.notes.match(/QT09 \w+/)[0]})` : ''}`), '')
}
const path = join(ROOT, '_source/check-in.md')
const s = readFileSync(path, 'utf8')
const a = s.indexOf('## Drafted sentences'), b = s.indexOf('## Spanish drafted sentences')
writeFileSync(path, s.slice(0, a) + lines.join('\n') + '\n' + (b >= 0 ? s.slice(b) : ''))
console.log(`check-in: ${live.length} French drafts listed`)
