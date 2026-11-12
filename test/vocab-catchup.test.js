// Vocabulary and Catch-Up circles (A1 Complete 9), against the real French content.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { buildCatchUp, buildLesson, catchUpItems, contentForUnit, effectiveMix, indexContent } from '../src/lib/lesson.js'
import { checkTyped } from '../src/lib/check.js'

const tables = {}
for (const f of readdirSync('src/content')) tables[f.replace('.json', '')] = JSON.parse(readFileSync(`src/content/${f}`))
const seeded = (seed) => { let x = seed; return () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296 } }
const vocab = tables.units.filter((u) => u.mix === 'vocab')
const all = indexContent(tables)

test('vocabulary circles take the word-focused mix; situation circles keep the main one', () => {
  assert.ok(vocab.length >= 5)
  const v = contentForUnit(tables, vocab[0].unit_id)
  const types = (c, r) => Object.fromEntries(effectiveMix(c, r).map((m) => [m.type, m.n]))
  assert.equal(types(v, 1).QT01, 3)
  assert.equal(types(v, 3).QT18, 4) // three, plus the speaking slot moved over (2026-11-12)
  assert.equal(types(contentForUnit(tables, 'U01'), 3).QT18, undefined)
})

test('Type the word asks a word of the circle, met already, and takes it with or without an article', () => {
  const u = vocab.find((x) => x.unit_id === 'U51') ?? vocab[0]
  const c = contentForUnit(tables, u.unit_id)
  const known = new Set(c.wordOrder)
  const lesson = buildLesson(c, { round: 3, unit_id: u.unit_id, known, rng: seeded(3) })
  const typed = lesson.queue.filter((q) => q.type === 'QT18')
  assert.equal(typed.length, 4)
  assert.equal(new Set(typed.map((q) => q.word_id)).size, 4)
  for (const q of typed) {
    assert.equal(c.wordById.get(q.word_id).first_unit, u.unit_id)
    assert.ok(checkTyped(q.form, q.accepted).correct)
  }
  const noun = typed.find((q) => c.wordById.get(q.word_id).part_of_speech === 'Noun')
  if (noun) assert.ok(checkTyped(`le ${noun.form}`, noun.accepted).correct || checkTyped(`la ${noun.form}`, noun.accepted).correct || checkTyped(`l'${noun.form}`, noun.accepted).correct)
})

test('Catch-Up: mistakes first, then missed words, then words seen once or twice, each at its circle\'s round', () => {
  const units = new Set(['U01', 'U02', 'U03'])
  const s = tables.sentences.find((x) => x.unit_id === 'U02')
  const words = tables.words.filter((w) => units.has(w.first_unit) && w.hint)
  const met = new Set(words.map((w) => w.word_id))
  const exposure = Object.fromEntries(words.map((w, i) => [w.word_id, i < 3 ? 1 : 9]))
  const items = catchUpItems(all, { units, bank: [{ sentence_id: s.sentence_id, type_id: 'QT08' }], wordMisses: { [words[5].word_id]: '2026-11-10' }, exposure, met, reachedOf: (u) => ({ U01: 5, U02: 3, U03: 1 })[u] })
  assert.equal(items[0].kind, 'sentence')
  assert.equal(items[0].round, 3)
  assert.equal(items[1].word_id, words[5].word_id)
  assert.ok(items[1].missed)
  assert.deepEqual(items.slice(2).map((x) => x.word_id).sort(), words.slice(0, 3).map((w) => w.word_id).sort())
  // Nothing outside the slot's circles, nothing unmet, nothing seen often.
  assert.equal(catchUpItems(all, { units: new Set(['U13']), bank: [], wordMisses: {}, exposure, met, reachedOf: () => 2 }).length, 0)
  const session = buildCatchUp(all, items, { rng: seeded(5), slot_id: 'C01' })
  assert.equal(session.kind, 'catchup')
  assert.ok(session.queue.length > 0)
  for (const q of session.queue) assert.ok(q.round >= 1 && q.round <= 5)
})

test('Catch-Up slots sit after rows that exist, two per French part so far', () => {
  for (const c of tables.catch_up) assert.ok(tables.tree_layout.some((t) => Number(t.row) === c.after_row), c.slot_id)
  const byPart = {}
  for (const c of tables.catch_up) byPart[c.part] = (byPart[c.part] ?? 0) + 1
  assert.deepEqual(byPart, { 1: 2, 2: 2 })
})
