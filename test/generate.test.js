import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { sentencesFrom, listeningFrom } from '../src/lib/generate.js'

const words = JSON.parse(readFileSync('src/content/words.json')).filter((w) => w.first_unit < 'U06')
const names = ['Paul', 'Marie']

test('generated sentences keep only lines made of the learner\'s words, split like the content pipeline', () => {
  const g = sentencesFrom({ sentences: [
    { french: 'Je mange une pomme.', english: 'I am eating an apple.' },
    { french: 'Je mange une baguette.', english: 'I am eating a baguette.' }, // baguette isn't a Tamago word
    { french: 'Le chat mange le poisson.', english: 'The cat eats the fish.' }, // poisson is a topic-pack word, not met
    { french: 'Paul aime le fromage.', english: 'Paul likes cheese.' },
    { french: 'je mange une pomme.', english: 'duplicate' },
    { french: '', english: 'empty' },
  ] }, words, names, 1)
  assert.deepEqual(g.sentences.map((s) => s.french), ['Je mange une pomme.', 'Paul aime le fromage.'])
  assert.ok(g.sentences.every((s) => s.sentence_id.startsWith('G') && s.source === 'generated'))
  assert.ok(g.sentence_words.every((r) => r.word_id || r.notes === 'name'))
  assert.equal(g.sentence_words.filter((r) => r.sentence_id === g.sentences[1].sentence_id && r.notes === 'name').length, 1)
})

test('a listening passage is all or nothing, and bad questions are dropped', () => {
  const lines = [{ speaker: 'A', french: 'Tu manges une pomme ?', english: '' }, { speaker: 'B', french: 'Non, je mange du pain.', english: '' }]
  const ok = listeningFrom({ title: 't', lines, questions: [{ question: 'q', choices: ['a', 'b', 'c'], answer: 1 }, { question: 'bad', choices: ['a'], answer: 0 }, { question: 'bad', choices: ['a', 'b'], answer: 5 }] }, words, names)
  assert.equal(ok.lines.length, 2)
  assert.equal(ok.questions.length, 1)
  assert.equal(listeningFrom({ title: 't', lines: [...lines, { speaker: 'A', french: 'Tu aimes la baguette ?', english: '' }], questions: [{ question: 'q', choices: ['a', 'b'], answer: 0 }] }, words, names), null)
  assert.equal(listeningFrom({ title: 't', lines, questions: [] }, words, names), null)
  assert.equal(listeningFrom(null, words, names), null)
})
