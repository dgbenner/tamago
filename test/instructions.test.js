// Instructions in the course language (Dan, 2026-11-15): from Part 3 on, phased in by part, every course complete.
import test from 'node:test'
import assert from 'node:assert/strict'
import { HEADINGS, PHASE, courseHeading } from '../src/lib/instructions.js'

test('every course has every heading, and no phase before Part 3', () => {
  for (const [lang, row] of Object.entries(HEADINGS)) for (const k of Object.keys(PHASE)) assert.ok(row[k], `${lang}: ${k}`)
  assert.ok(Object.values(PHASE).every((p) => p >= 3))
})
test('phased in by part: Translate from Part 3, listening from Part 4, forms from Part 6', () => {
  assert.equal(courseHeading('Translate', 2, 'fr'), null)
  assert.equal(courseHeading('Translate', 3, 'fr'), 'Traduis')
  assert.equal(courseHeading('Type What You Hear', 3, 'fr'), null)
  assert.equal(courseHeading('Type What You Hear', 4, 'fr'), 'Écoute et écris')
  assert.equal(courseHeading('Fill In the Form', 5, 'fr'), null)
  assert.equal(courseHeading('Fill In the Form', 6, 'es'), 'Llena el formulario')
  assert.equal(courseHeading('Something Else', 6, 'fr'), null)
})
