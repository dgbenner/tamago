import test from 'node:test'
import assert from 'node:assert/strict'
import { diffMarks } from '../src/lib/check.js'

const marked = (runs) => runs.filter((r) => r.mark).map((r) => r.text).join('|')

test('a dropped accent marks only that letter', () => {
  assert.equal(marked(diffMarks('Le garçon ? Il est ici.', 'Le garcon ? Il est ici.')), 'ç')
})
test('a missing letter marks it', () => {
  assert.equal(marked(diffMarks('Je suis une femme.', 'Je suis une fmme.')), 'e')
})
test('a swapped letter marks the right one, case aside', () => {
  assert.equal(marked(diffMarks('Bonjour, je suis Paul.', 'bonjour, je suis Pual.')), 'a')
})
test('nothing marked when the answer matches', () => {
  assert.equal(marked(diffMarks('Merci.', 'merci.')), '')
})
