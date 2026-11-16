// The drafts file for Fable's review of one A1 part (2026-11-15; written by hand for French, Spanish and German parts
// until now): every sentence of the part that isn't from Tatoeba, circle by circle, then the part's task items (Write
// the Number, Fill the Form, Read and Answer, Write a Message). Writes _review/<course>-part<N>-drafts.md; it will not
// overwrite a file that already carries review marks (a "Verdict" or "**Use**"). Nothing is swapped.
// Usage: COURSE=it PART=2 node scripts/part-drafts.mjs ["one line on what to read for"]
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { at, C } from './lib/course.mjs'
const ROOT = join(import.meta.dirname, '..')
const PART = Number(process.env.PART)
if (!PART) throw new Error('PART=n')
const raw = (t) => JSON.parse(readFileSync(at(`content/raw/${t}.json`), 'utf8'))
const units = raw('units').filter((u) => Number(u.part) === PART && !['yes', 'node'].includes(u.is_topic_pick)).sort((a, b) => a.order - b.order)
const ids = new Set(units.map((u) => u.unit_id))
const sentences = raw('sentences').filter((s) => ids.has(s.unit_id) && !String(s.status).startsWith('off'))
const isDraft = (s) => s.source !== 'tatoeba'
const esc = (x) => String(x ?? '').replace(/\|/g, '\\|')
const OUT = join(ROOT, `_review/${C.name.toLowerCase()}-part${PART}-drafts.md`)
if (existsSync(OUT) && /Verdict|\*\*Use\*\*/.test(readFileSync(OUT, 'utf8'))) throw new Error(`${OUT} carries review marks: not overwritten`)
const drafts = sentences.filter(isDraft)
const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
const out = [`# ${C.name}, A1 Part ${PART}: drafted sentences`, '',
  `${date}. Every ${C.name} sentence in Part ${PART} that is not from Tatoeba (${drafts.length} of ${sentences.length}), for Fable's review and then a native speaker. Each was written because Tatoeba had under three checked sentences for a word within the words known by that circle. Each uses only words taught by its circle or before it. The part's task items (Write the Number, Fill the Form, Read and Answer, Write a Message) follow; all of them are written for Tamago.`, '']
if (process.argv[2]) out.push(`To read for besides the usual: ${process.argv[2]}`, '')
out.push('| Circle | Drafts | Tatoeba | Share drafted |', '| --- | --- | --- | --- |')
for (const u of units) {
  const all = sentences.filter((s) => s.unit_id === u.unit_id)
  const d = all.filter(isDraft).length
  out.push(`| ${u.unit_id} ${u.title} | ${d} | ${all.length - d} | ${all.length ? Math.round((d * 100) / all.length) : 0}% |`)
}
for (const u of units) {
  const d = drafts.filter((s) => s.unit_id === u.unit_id)
  if (!d.length) continue
  out.push('', `## ${u.unit_id} ${u.title}`, '', `| Id | ${C.name} | English |`, '| --- | --- | --- |')
  for (const s of d) out.push(`| ${s.sentence_id} | ${esc(s.french)} | ${esc(s.english)} |`)
}
const inPart = (r) => ids.has(r.unit_id)
out.push('', '## Task items', '', '### Write the Number', '', '| Id | Circle | Kind | Said | Answer |', '| --- | --- | --- | --- | --- |')
for (const n of raw('a1_listen').filter(inPart)) out.push(`| ${n.id} | ${n.unit_id} | ${n.kind} | ${esc(n.say)} | ${esc(n.answer)} |`)
out.push('', '### Fill the Form')
for (const f of raw('a1_forms').filter(inPart)) {
  out.push('', `**${f.id}** (${f.unit_id}) ${f.card}`, '')
  for (const x of JSON.parse(f.fields_json)) out.push(`- ${x.label}: ${x.answer}${x.also?.length ? ` (also: ${x.also.join('; ')})` : ''}`)
}
out.push('', '### Read and Answer')
for (const t of raw('a1_texts').filter(inPart)) {
  out.push('', `**${t.id}** (${t.unit_id}, ${t.kind}) ${t.title}`, '', `> ${String(t.lines).split('\n').join('  \n> ')}`, '')
  for (const q of JSON.parse(t.questions_json)) out.push(`- ${q.question} ${q.choices.map((c, i) => (i === q.answer ? `**${c}**` : c)).join(' / ')}`)
}
out.push('', '### Write a Message', '')
for (const p of raw('a1_prompts').filter(inPart)) out.push(`- **${p.id}** (${p.unit_id}, ${p.min_words} to ${p.max_words} words) ${p.prompt} Points: ${String(p.points).split(';').join(', ')}.`)
writeFileSync(OUT, out.join('\n') + '\n')
console.log(`Wrote ${OUT}: ${drafts.length} drafts of ${sentences.length} sentences`)
