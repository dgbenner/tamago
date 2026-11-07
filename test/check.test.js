import test from 'node:test'
import assert from 'node:assert/strict'
import { checkTyped, normalize } from '../src/lib/check.js'

const vocabulary = new Set(['je', 'suis', 'une', 'un', 'femme', 'es', 'et', 'tu', 'garçon'])
const fr = (input, accepted, extra = {}) => checkTyped(input, accepted, { lang: 'fr', vocabulary, ...extra })

test('case, spaces and punctuation are ignored', () => {
  assert.ok(fr('  je   SUIS une femme ', ['Je suis une femme.']).correct)
  assert.ok(fr('Tu es Paul?', ['Tu es Paul ?']).correct)
  assert.ok(fr('Tu es Paul ?', ['Tu es Paul?']).correct)
  assert.ok(fr('Non !', ['Non!']).correct)
  assert.equal(normalize('Merci, au revoir.', 'fr'), 'merci au revoir')
})
test('curly apostrophe matches straight', () => assert.ok(fr('C’est un garçon', ["C'est un garçon."]).correct))
test('the main sentence is accepted with no accepted_answers rows', () => assert.ok(fr('Oui', ['Oui.']).correct))
test('missing accent passes when lenient, and is reported', () => {
  const r = fr('je suis un garcon', ['Je suis un garçon.'])
  assert.ok(r.correct && r.accent && !r.typo)
})
test('one-letter typo passes when lenient, and is reported', () => {
  const r = fr('je suis une fenme', ['Je suis une femme.'])
  assert.ok(r.correct && r.typo)
})
test('neighbouring letters swapped is one typo', () => assert.ok(fr('je sius une femme', ['Je suis une femme.']).typo))
test('a wrong word is a miss even one letter away', () => {
  assert.equal(fr('je suis un femme', ['Je suis une femme.']).correct, false)
  assert.equal(fr('tu et une femme', ['Tu es une femme.']).correct, false)
})
test('two typos are a miss', () => assert.equal(fr('je sois une fenme', ['Je suis une femme.']).correct, false))
test('a missing space counts as the one typo', () => assert.ok(fr('jesuis une femme', ['Je suis une femme.']).typo))
test('strict: no typos and accents required, spacing still ignored', () => {
  assert.equal(fr('je suis une fenme', ['Je suis une femme.'], { strict: true }).correct, false)
  assert.equal(fr('je suis un garcon', ['Je suis un garçon.'], { strict: true }).correct, false)
  assert.ok(fr('Tu es Paul?', ['Tu es Paul ?'], { strict: true }).correct)
})
test('any accepted answer counts and is the one shown', () => {
  const r = fr('salut', ['Bonjour.', 'Salut !'])
  assert.ok(r.correct)
  assert.equal(r.matched, 'Salut !')
})
test('English contractions are equal', () => {
  assert.ok(checkTyped("I'm a girl", ['I am a girl.'], { lang: 'en' }).correct)
  assert.ok(checkTyped('you are a boy', ["You're a boy."], { lang: 'en', strict: true }).correct)
})
test('an empty answer is a miss', () => assert.equal(fr('  ', ['Oui.']).correct, false))
