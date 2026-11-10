// Content sweep, part 2: Tatoeba's other English translations count as right; the ones left out in review don't.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { indexContent, makeQuestion } from '../src/lib/lesson.js'
import { checkTyped } from '../src/lib/check.js'

const tables = {}
for (const f of readdirSync('src/content')) tables[f.replace('.json', '')] = JSON.parse(readFileSync(`src/content/${f}`))
const c = indexContent(tables)
const review = JSON.parse(readFileSync('content/sweep/answers-review.json', 'utf8'))
const accepts = (id, text) => {
  const q = makeQuestion(c, 'QT06', c.sentenceById.get(id), 5, () => 0.5, null, {})
  return checkTyped(text, q.accepted, { lang: 'en', vocabulary: c.vocabulary.en }).correct
}

test('every reviewed Tatoeba translation is accepted', () => {
  for (const a of review.add) assert.ok(accepts(a.sentence_id, a.answer), `${a.sentence_id} "${a.answer}"`)
})

test('translations left out in review are still marked wrong', () => {
  for (const s of review.skipped.filter((x) => !/contractions/.test(x.reason))) assert.ok(!accepts(s.sentence_id, s.answer), `${s.sentence_id} "${s.answer}"`)
})
