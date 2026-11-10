// Folds the reviewed sweep into the next workbook version (Claude owns the workbook under autonomous-build.md).
//   node scripts/apply-sweep.mjs originals <from.xlsx> <to.xlsx>   part 1: replacements from content/sweep/originals-review.json
//   node scripts/apply-sweep.mjs answers <from.xlsx> <to.xlsx>     part 2: accepted answers from content/sweep/answers-review.json
// Sentence ids stay the same, so grammar notes, pictures and progress keep pointing at the right rows.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { analyse, formIndexFor } from './lib/french.mjs'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const [part, from, to] = process.argv.slice(2)
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'))
const wb = XLSX.readFile(join(ROOT, from))
const sheet = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' })
const header = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { header: 1, defval: '' })[0]
const save = (n, rows) => { const cols = [...header(n)]; for (const r of rows) for (const k of Object.keys(r)) if (!cols.includes(k)) cols.push(k); wb.Sheets[n] = XLSX.utils.json_to_sheet(rows, { header: cols }) }
const changelog = (line) => { const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' }); r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, line]); wb.Sheets.README = XLSX.utils.aoa_to_sheet(r) }

if (part === 'originals') {
  const review = read('content/sweep/originals-review.json')
  const proposals = new Map(read('content/sweep/originals.json').proposals.map((p) => [p.sentence_id, p]))
  const sentences = sheet('sentences')
  let sw = sheet('sentence_words')
  const words = sheet('words')
  const units = sheet('units')
  const order = new Map(units.map((u) => [u.unit_id, u.order]))
  const names = new Set(sw.filter((r) => r.notes === 'name').map((r) => String(r.surface).toLowerCase()))
  const done = []
  for (const [id, r] of Object.entries(review)) {
    if (id.startsWith('_') || r.action !== 'replace') continue
    const p = proposals.get(id)
    const pick = r.source_id && r.source_id !== p.source_id ? p.alternatives.find((a) => a.source_id === r.source_id) : { french: p.new_french, english: p.new_english, source_id: p.source_id, source_owner: p.source_owner }
    const row = sentences.find((s) => s.sentence_id === id)
    const known = words.filter((w) => order.get(w.first_unit) <= order.get(row.unit_id) || w.first_unit === row.unit_id)
    const a = analyse(pick.french, formIndexFor(known), { names })
    if (a.unknown) throw new Error(`${id} "${pick.french}": "${a.unknown}" not a known word`)
    Object.assign(row, { french: pick.french, english: pick.english, source: 'tatoeba', source_id: pick.source_id, status: 'live', audio_source: 'tts',
      notes: `content sweep 2026-11-10: replaced the draft "${row.french}" = "${row.english}" with checked Tatoeba #${pick.source_id} (${pick.source_owner})` })
    sw = sw.filter((x) => x.sentence_id !== id)
    a.parts.forEach((q, k) => sw.push({ sentence_id: id, position: k + 1, surface: q.surface, word_id: q.word_id ?? '', notes: q.name ? 'name' : '', hint_override: '' }))
    done.push(`${id} ${pick.french}`)
  }
  save('sentences', sentences)
  save('sentence_words', sw)
  changelog(`Content sweep, part 1: ${done.length} Tamago originals replaced by checked Tatoeba sentences teaching the same words and grammar (${done.join('; ')}). The other originals had no checked match within their unit's words, or are question-and-answer pairs.`)
  console.log(`replaced ${done.length}: ${done.join(' | ')}`)
}

if (part === 'answers') {
  const review = read('content/sweep/answers-review.json')
  const answers = sheet('accepted_answers')
  const have = new Set(answers.map((a) => `${a.sentence_id}|${a.direction}|${String(a.answer).toLowerCase()}`))
  let added = 0
  for (const x of review.add) {
    const key = `${x.sentence_id}|fr_to_en|${x.answer.toLowerCase()}`
    if (have.has(key)) continue
    have.add(key)
    answers.push({ answer_id: `AT${x.sentence_id.slice(1)}${String(++added).padStart(4, '0')}`, sentence_id: x.sentence_id, direction: 'fr_to_en', answer: x.answer, source: `tatoeba #${x.english_id}`, status: 'live' })
  }
  save('accepted_answers', answers)
  changelog(`Content sweep, part 2: ${added} more English answers accepted (fr_to_en), each a Tatoeba translation linked to the sentence; ${review.skipped.length} linked translations left out as idiomatic, loose or misleading (content/sweep/answers-review.json).`)
  console.log(`added ${added} answers`)
}
XLSX.writeFile(wb, join(ROOT, to))
