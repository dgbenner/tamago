// Conversations (2026-11-10): Claude's lines split into the course's words, so meanings come from Tamago's data.
import test from 'node:test'
import { readFileSync, readdirSync } from 'node:fs'
import assert from 'node:assert/strict'
import { piecesOf, newWordsIn, formIndexFor, HELP_PHRASES, SCENES } from '../src/lib/converse.js'

const load = (dir) => Object.fromEntries(readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => [f.replace('.json', ''), JSON.parse(readFileSync(`${dir}/${f}`))]))
const tables = load('src/content')
const index = formIndexFor(tables.words)
test('a line keeps its text and marks course words, multi-word forms included', () => {
  const line = "Bonjour ! Un café, s'il vous plaît ?"
  const pieces = piecesOf(line, index)
  assert.equal(pieces.map((p) => p.text).join(''), line)
  assert.ok(pieces.some((p) => p.text === "s'il vous plaît" && p.word_id))
  assert.ok(pieces.some((p) => p.text === 'café' && p.word_id))
})
test('unknown words stay plain text, and new words are only course words not yet met', () => {
  const met = new Set(tables.words.filter((w) => w.form === 'bonjour').map((w) => w.word_id))
  const found = newWordsIn(['Bonjour, voulez-vous un croissant ?'], tables.words, met)
  assert.ok(!found.some((w) => w.form === 'bonjour'))
  assert.ok(found.every((w) => tables.words.includes(w)))
})
test('every scene key word is a course word, in every course', async () => {
  for (const [lang, dir] of [['fr', 'src/content'], ['es', 'src/content-es'], ['de', 'src/content-de']]) {
    const t = load(dir)
    for (const s of SCENES[lang]) for (const k of s.keys) assert.ok(t.words.some((w) => w.form === k), `${lang} ${s.id}: ${k}`)
    assert.equal(HELP_PHRASES[lang].length, 6)
  }
})
