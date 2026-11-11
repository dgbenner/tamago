// The A1 task question types (A1 Complete, 2026-11-10): answers checked as values and by rules.
import test from 'node:test'
import assert from 'node:assert/strict'
import { checkForm, foldText, readValue, sameValue, wordCount, makeA1Question, a1QuestionFor } from '../src/lib/a1types.js'

test('prices read as cents, whatever the writing', () => {
  for (const g of ['3,50 €', '3.50', '3,5', '€3.50', '3.50 euros', '3,50']) assert.equal(readValue('price', g), '350', g)
  assert.ok(sameValue('price', '12', '12,00 €'))
  assert.ok(!sameValue('price', '3.50', '3.05'))
})
test('times read as hh:mm', () => {
  for (const g of ['14h30', '14:30', '14.30', '14 h 30', '14h30 Uhr']) assert.ok(sameValue('time', '14:30', g), g)
  assert.ok(sameValue('time', '9:00', '9h'))
  assert.ok(!sameValue('time', '14:30', '14:03'))
  assert.equal(readValue('time', '25:00'), null)
})
test('dates match day and month, and the year only when asked', () => {
  assert.ok(sameValue('date', '12/3', '12.03.'))
  assert.ok(sameValue('date', '12/3', '12/03/2026'))
  assert.ok(!sameValue('date', '12/3/2026', '12/3/2025'))
  assert.ok(!sameValue('date', '12/3', '3/12'))
})
test('numbers and phones are digits', () => {
  assert.ok(sameValue('number', '47', ' 47 '))
  assert.ok(sameValue('number', '1000', '1.000'))
  assert.ok(sameValue('phone', '06 12 34 56 78', '0612345678'))
  assert.ok(!sameValue('number', '47', 'quarante-sept'))
})
test('forms check each field by its rule, ignoring case and accents', () => {
  const fields = [{ key: 'name', rule: 'text', answer: 'Hélène Dupont' }, { key: 'age', rule: 'number', answer: '32' }, { key: 'nat', rule: 'text', answer: 'française', also: ['francaise', 'française'] }, { key: 'tel', rule: 'phone', answer: '06 12 34 56 78' }]
  const r = checkForm(fields, { name: 'helene dupont', age: '32', nat: 'Francaise', tel: '0612345678' })
  assert.ok(r.correct)
  const r2 = checkForm(fields, { name: 'Helene', age: '23', nat: 'française', tel: '06 12 34 56 78' })
  assert.deepEqual(r2.results.map((x) => x.ok), [false, false, true, true])
  assert.equal(foldText('Ça va ?'), 'ca va')
})
test('a message counts words, and is never graded', () => {
  assert.equal(wordCount('Salut Marie ! Je suis à Paris.'), 6)
  assert.ok(makeA1Question('QT16', { id: 'P1', prompt: 'x' }, 4).ungraded)
})
test('a circle gives one task item in the rounds that fit, least seen first; Can\'t Listen Now reads instead', () => {
  const c = { a1_listen: [{ id: 'N1', unit_id: 'U40', kind: 'price', say: 'trois euros cinquante', answer: '3.50' }, { id: 'N2', unit_id: 'U40', kind: 'time', say: 'quatorze heures trente', answer: '14:30' }], a1_prompts: [{ id: 'P1', unit_id: 'U40', prompt: 'Write' }] }
  assert.equal(a1QuestionFor(c, 'U40', 1), null)
  const q = a1QuestionFor(c, 'U40', 2, { seen: { N1: 3 } })
  assert.equal(q.item_id, 'N2')
  assert.ok(a1QuestionFor(c, 'U40', 2, { cantListen: true }).readInstead)
  assert.equal(a1QuestionFor(c, 'U99', 4), null)
})

test('Read and Answer choices are shuffled, the answer following its choice', () => {
  const item = { id: 'R1', kind: 'sign', lines: ['x'], questions: [{ question: 'q', choices: ['right', 'b', 'c'], answer: 0 }] }
  const firsts = new Set()
  for (let i = 0; i < 40; i++) {
    const q = makeA1Question('QT14', item, 3).questions[0]
    assert.equal(q.choices[q.answer], 'right')
    firsts.add(q.choices[0])
  }
  assert.ok(firsts.size > 1)
})
