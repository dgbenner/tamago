import test from 'node:test'
import assert from 'node:assert/strict'
import { accentMisses, checkTyped, diffMarks, normalize } from '../src/lib/check.js'

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
// Two typos per answer (Dan, 2026-11-16; was one): two words a letter out each, or one long word two letters out.
test('two typos in two words pass, and are reported', () => {
  const r = fr('je siis une fenme', ['Je suis une femme.'])
  assert.ok(r.correct && r.typo)
})
test('two typos in one word of six letters or more pass', () => {
  const r = fr('il est au restaurnt', ['Il est au restaurant.'])
  assert.ok(r.correct && r.typo)
  const s = fr('il est au restuarnt', ['Il est au restaurant.'])
  assert.ok(s.correct && s.typo)
})
test('two typos in a short word are a miss', () => assert.equal(fr('je suis une fmmi', ['Je suis une femme.']).correct, false))
test('three typos are a miss', () => assert.equal(fr('je siis une fenmi', ['Je suis une femme.']).correct, false))
test('another real word is still a miss, even with a second typo elsewhere', () => assert.equal(fr('tu et une fenme', ['Tu es une femme.']).correct, false))
test('a missing space counts as a typo', () => assert.ok(fr('jesuis une femme', ['Je suis une femme.']).typo))
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

test('near miss: one word or two letters off, never an unrelated answer', async () => {
  const { nearMiss } = await import('../src/lib/check.js')
  assert.ok(nearMiss('Je mange une pomme', ['Je mange une orange.']))
  assert.ok(nearMiss('Je mange pomme', ['Je mange une pomme.']))
  assert.ok(nearMiss('fromaje', ['fromage']))
  assert.ok(!nearMiss('Il a un chien.', ['Je mange une pomme.']))
  assert.ok(!nearMiss('The cat is here.', ['I like bread.'], 'en'))
  assert.ok(!nearMiss('', ['Bonjour']))
})

// Dan, 2026-11-11: punctuation never counts, wherever it is; nor do extra spaces; a missing accent is right, with a note.
const exactly = (r) => r.correct && !r.typo && !r.accent
const marked = (shown, given) => diffMarks(shown, given).filter((m) => m.mark).map((m) => m.text)

test('a comma in the middle doesn\'t count, missing or extra', () => {
  assert.ok(exactly(fr('Oui je suis une femme', ['Oui, je suis une femme.'])))
  assert.ok(exactly(fr('Oui, je, suis une femme', ['Oui je suis une femme.'])))
})
test('a period doesn\'t count, at the end or in the middle', () => {
  assert.ok(exactly(fr('Oui. Je suis une femme', ['Oui, je suis une femme.'])))
  assert.ok(exactly(fr('Oui je suis une femme...', ['Oui. Je suis une femme.'])))
})
test('a question mark doesn\'t count, in the middle or at the end, upside down or not', () => {
  assert.ok(exactly(fr('Tu es Paul ? Oui', ['Tu es Paul ? Oui.'])))
  assert.ok(exactly(fr('Tu es Paul Oui?', ['Tu es Paul ? Oui.'])))
  assert.ok(exactly(fr('Tu es Paul', ['¿Tu es Paul?'])))
})
test('an exclamation mark doesn\'t count, in the middle or at the end', () => {
  assert.ok(exactly(fr('Non merci', ['Non ! Merci !'])))
  assert.ok(exactly(fr('Non! merci!!', ['Non, merci.'])))
})
test('dashes, quotes, brackets, colons and other symbols don\'t count', () => {
  assert.ok(exactly(fr('Oui — je suis une femme', ['Oui, je suis une femme.'])))
  assert.ok(exactly(fr('Oui - je suis une femme', ['Oui, je suis une femme.'])))
  assert.ok(exactly(fr('Oui – je suis une femme', ['Oui, je suis une femme.'])))
  assert.ok(exactly(fr('« Oui », je suis (une) femme ; * /', ['Oui, je suis une femme.'])))
  assert.ok(exactly(fr("'Oui' : \"je suis une femme\"…", ['Oui, je suis une femme.'])))
})
test('extra spaces don\'t count: at the ends, between words, around punctuation', () => {
  assert.ok(exactly(fr('   Oui ,   je  suis\tune   femme  .  ', ['Oui, je suis une femme.'])))
  assert.ok(exactly(fr('Oui,\u00a0je suis\u202fune femme', ['Oui, je suis une femme.'])))
})
test('an apostrophe or a hyphen left out, or typed as a space, doesn\'t count', () => {
  assert.ok(exactly(fr('C est un garçon', ["C'est un garçon."])))
  assert.ok(exactly(fr('cest un garçon', ["C'est un garçon."])))
  assert.ok(exactly(fr('Qu est ce que c est', ["Qu'est-ce que c'est ?"])))
  assert.ok(exactly(fr('Est ce que tu es Paul', ['Est-ce que tu es Paul ?'])))
  assert.ok(exactly(checkTyped('Im a boy', ["I'm a boy."], { lang: 'en' })))
  assert.ok(exactly(checkTyped('Its a boy', ["It's a boy."], { lang: 'en' })))
})
test('punctuation alone is not an answer', () => assert.equal(fr(' ?! ', ['Oui.']).correct, false))
test('a missing accent is right, and the note marks that letter and nothing else', () => {
  const r = fr('Oui je suis un garcon', ['Oui, je suis un garçon.'])
  assert.ok(r.correct && r.accent && !r.typo)
  assert.deepEqual(marked(r.matched, 'Oui je suis un garcon'), ['ç'])
  assert.deepEqual(marked('Où est le garçon ?', 'ou est le garcon'), ['ù', 'ç'])
  assert.deepEqual(marked('Ça va ?', 'ca va'), ['Ç'])
})
test('a missing accent with missing punctuation is still only a missing accent', () => {
  const r = fr('ou est le garcon', ['Où est le garçon ?'])
  assert.ok(r.correct && r.accent && !r.typo)
  const s = fr('C est un garcon', ["C'est un garçon."])
  assert.ok(s.correct && s.accent && !s.typo)
})
test('the note never marks punctuation the learner left out', () => {
  assert.deepEqual(marked('Oui, je suis une femme.', 'oui je suis une femme'), [])
  assert.deepEqual(marked("Qu'est-ce que c'est ?", 'qu est ce que c est'), [])
  assert.deepEqual(marked('Je suis une femme.', 'je suis une fenme'), ['m'])
})
test('strict mode: an accent is required and a typo is a miss, but punctuation and spaces still don\'t count', () => {
  assert.equal(fr('Oui je suis un garcon', ['Oui, je suis un garçon.'], { strict: true }).correct, false)
  assert.equal(fr('Oui je suis une fenme', ['Oui, je suis une femme.'], { strict: true }).correct, false)
  assert.ok(fr('  Oui — je suis un garçon !', ['Oui, je suis un garçon.'], { strict: true }).correct)
})
test('lenient is the default: Strict is a choice in Settings, off until chosen', async () => {
  const { readFileSync } = await import('node:fs')
  const defaults = JSON.parse(readFileSync(new URL('../src/content/settings_defaults.json', import.meta.url), 'utf8'))
  const row = defaults.find((d) => d.setting === 'answer_strictness')
  assert.equal(row.default, 'lenient')
  assert.match(row.options, /strict/)
  assert.match(readFileSync(new URL('../src/screens/Settings.jsx', import.meta.url), 'utf8'), /answer_strictness/)
})
test('a wrong word is still wrong, punctuation or not', () => {
  assert.equal(fr('Oui, je suis un femme', ['Oui, je suis une femme.']).correct, false)
  assert.equal(fr('Non je suis une femme', ['Oui, je suis une femme.']).correct, false)
})

// Capitals and accents (Dan, 2026-11-14): right by default with a note naming the word; wrong in Strict. A sentence's
// first letter never counts; chip answers (lower case) can't miss a capital; a single typed word can.
test('a missing capital is right with a note, wrong in strict', () => {
  const r = checkTyped('je suis dan', ['Je suis Dan.'])
  assert.equal(r.correct, true)
  assert.deepEqual(r.capitals, [{ word: 'Dan', at: [0] }])
  assert.equal(checkTyped('je suis dan', ['Je suis Dan.'], { strict: true }).correct, false)
  assert.deepEqual(checkTyped('Je suis Dan', ['Je suis Dan.'], { strict: true }).capitals, [])
  assert.deepEqual(checkTyped('ich habe einen hund', ['Ich habe einen Hund.'], { cased: false, strict: true }).capitals, [])
  assert.equal(checkTyped('ich habe einen hund', ['Ich habe einen Hund.'], { cased: false, strict: true }).correct, true)
  assert.deepEqual(checkTyped('hund', ['Hund'], { word: true }).capitals, [{ word: 'Hund', at: [0] }])
})
test('a missing accent is right with a note naming the word', () => {
  const r = checkTyped('un cafe', ['Un café.'])
  assert.equal(r.correct, true)
  assert.equal(r.accent, true)
  const notes = accentMisses('un cafe', 'Un café.')
  assert.equal(notes.length, 1)
  assert.equal(notes[0].word, 'café')
  assert.equal(notes[0].runs.filter((x) => x.mark).map((x) => x.text).join(''), 'é')
  assert.equal(checkTyped('un cafe', ['Un café.'], { strict: true }).correct, false)
})
// Typo guard (Dan, 2026-11-16): a slip that spells another word the course teaches is wrong, never a typo, also when a
// space is missing or extra.
test('a missing space that spells another course word is a miss', () => {
  assert.ok(checkTyped('mason', ['Ma son.'], { lang: 'fr', vocabulary: new Set() }).typo)
  assert.equal(checkTyped('mason', ['Ma son.'], { lang: 'fr', vocabulary: new Set(['mason']) }).correct, false)
})
// Accent guard (Dan, 2026-11-16): a missing accent is right in lenient mode unless the word typed is itself another word
// the course teaches; then it is wrong, with the right answer and its accent note.
test('an accent that turns the word into another course word is a miss, with the accent note', () => {
  const cases = [
    ['fr', 'il a paris', 'Il est à Paris.', ['il', 'a', 'à', 'paris', 'est'], 'il est a paris'],
    ['fr', 'ou est il', 'Où est-il ?', ['ou', 'où', 'est', 'il'], null],
    ['fr', 'il est la', 'Il est là.', ['il', 'est', 'la', 'là'], null],
    ['it', 'parla da sola', 'Parla dà sola.', ['parla', 'da', 'dà', 'sola'], null],
    ['pt', 'ele e alto', 'Ele é alto.', ['ele', 'e', 'é', 'alto'], null],
    ['pt', 'eles tem fome', 'Eles têm fome.', ['eles', 'tem', 'têm', 'fome'], null],
  ]
  for (const [lang, typed, answer, words, alt] of cases) {
    const r = checkTyped(alt ?? typed, [answer], { lang, vocabulary: new Set(words) })
    assert.equal(r.correct, false, `${typed} for ${answer}`)
    assert.ok(r.accent && r.matched === answer, `${typed}: the right answer, marked as an accent miss`)
    assert.ok(accentMisses(alt ?? typed, answer).length > 0, `${typed}: an accent note`)
  }
})
test('a missing accent that makes no other course word is still right', () => {
  assert.ok(fr('je suis un garcon', ['Je suis un garçon.']).correct)
  assert.ok(checkTyped('cafe', ['Café.'], { lang: 'fr', vocabulary: new Set(['café']) }).correct)
})
