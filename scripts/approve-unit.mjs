// Approves a unit of a course after Claude's review (autonomous-build.md) and adds its grammar note.
// Usage: COURSE=es node scripts/approve-unit.mjs U02 "<why>" "<grammar rule>" S2001;S2003;S2016 [conjugation lemma]
import { readFileSync, writeFileSync } from 'node:fs'
import { at } from './lib/course.mjs'
const [unit, why, rule, examples, lemma = ''] = process.argv.slice(2)
const dpath = at('content/review-decisions.json')
const d = JSON.parse(readFileSync(dpath, 'utf8'))
d.units[unit] = { action: 'approve', on: new Date().toISOString().slice(0, 10), by: `Claude under autonomous-build.md: ${why}` }
writeFileSync(dpath, JSON.stringify(d, null, 2) + '\n')
const npath = at('content/grammar_notes.json')
const n = JSON.parse(readFileSync(npath, 'utf8'))
const sentences = JSON.parse(readFileSync(at('content/raw/sentences.json'), 'utf8'))
for (const id of examples.split(';')) if (!sentences.some((s) => s.sentence_id === id && s.unit_id === unit)) throw new Error(`${id} is not a sentence of ${unit}`)
n.notes = n.notes.filter((x) => x.unit_id !== unit)
n.notes.push({ unit_id: unit, rule, example_sentence_ids: examples, conjugation_lemma: lemma, status: 'live' })
writeFileSync(npath, JSON.stringify(n, null, 2) + '\n')
console.log(`${unit} approved; grammar note with ${examples}`)
