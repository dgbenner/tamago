// Adds drafted sentences and QT09 pairs to a course's drafts.json from a small JSON file:
//   { "unit": "U02", "sentences": [["S2101", "La carta es pequeña.", "The letter is small.", "note"], …], "qa": [["S2005", "S2112"], …] }
// Usage: COURSE=es node scripts/add-drafts.mjs <file.json>
import { readFileSync, writeFileSync } from 'node:fs'
import { at } from './lib/course.mjs'
const input = JSON.parse(readFileSync(process.argv[2], 'utf8'))
const path = at('content/drafts.json')
const d = JSON.parse(readFileSync(path, 'utf8'))
const have = new Set(d.sentences.map((s) => s.sentence_id))
for (const [id, french, english, notes] of input.sentences) {
  if (have.has(id)) throw new Error(`${id} is already a draft`)
  d.sentences.push({ sentence_id: id, unit_id: input.unit, french, english, notes: notes ?? 'draft: Tatoeba had too few checked sentences for this word' })
}
for (const [q, a] of input.qa ?? []) d.qa_answers.push({ question_sentence_id: q, answer_sentence_id: a })
writeFileSync(path, JSON.stringify(d, null, 2) + '\n')
console.log(`${input.unit}: ${input.sentences.length} drafts, ${(input.qa ?? []).length} pairs`)
