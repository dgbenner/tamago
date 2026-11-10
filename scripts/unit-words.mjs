// How many sentences each new word of a unit has (pulled, drafted, kept), for the 3-per-word rule.
// Usage: COURSE=es node scripts/unit-words.mjs U02   (after an import)
import { readFileSync } from 'node:fs'
import { at } from './lib/course.mjs'
const raw = (t) => JSON.parse(readFileSync(at(`content/raw/${t}.json`), 'utf8'))
const unit = process.argv[2]
const off = new Set(raw('sentences').filter((s) => String(s.status).startsWith('off')).map((s) => s.sentence_id))
const inUnit = new Set(raw('sentences').filter((s) => s.unit_id === unit && !off.has(s.sentence_id)).map((s) => s.sentence_id))
const count = {}
for (const r of raw('sentence_words')) if (inUnit.has(r.sentence_id) && r.word_id) (count[r.word_id] ??= new Set()).add(r.sentence_id)
const words = raw('words').filter((w) => w.first_unit === unit && !String(w.status).startsWith('off'))
console.log(`${unit}: ${inUnit.size} sentences | ${words.map((w) => `${w.form} ${count[w.word_id]?.size ?? 0}`).join(', ')}`)
console.log(`  under 3: ${words.filter((w) => (count[w.word_id]?.size ?? 0) < 3).map((w) => w.form).join(', ') || 'none'}`)
