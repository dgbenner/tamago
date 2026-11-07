import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { BUILT_TYPES, buildLesson, buildReview, effectiveMix, indexContent, lessonsInRound, reaskFor } from '../src/lib/lesson.js'

const tables = {}
for (const f of readdirSync('src/content')) tables[f.replace('.json', '')] = JSON.parse(readFileSync(`src/content/${f}`))
const c = indexContent(tables)

function seeded(seed) {
  let x = seed
  return () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296 }
}
const types = (mix) => Object.fromEntries(mix.map((m) => [m.type, m.n]))

test('Phase 1 mixes: workbook mix plus phase1_fallbacks', () => {
  assert.deepEqual(types(effectiveMix(c, 1)), { QT01: 3, QT03: 5, QT04: 2 })
  assert.deepEqual(types(effectiveMix(c, 2)), { QT03: 1, QT04: 2, QT05: 3, QT06: 2, QT07: 2 })
  assert.deepEqual(types(effectiveMix(c, 3)), { QT05: 2, QT07: 2, QT08: 6 })
  assert.deepEqual(types(effectiveMix(c, 4)), { QT07: 2, QT08: 2, QT11: 2, QT12: 4 })
  assert.deepEqual(types(effectiveMix(c, 5)), { QT11: 3, QT12: 7 })
})

test("Can't listen removes every audio type, in every round", () => {
  for (let r = 1; r <= 5; r++) {
    for (const m of effectiveMix(c, r, { cantListen: true })) assert.ok(!['QT04', 'QT07', 'QT11'].includes(m.type), `round ${r} ${m.type}`)
    assert.equal(effectiveMix(c, r, { cantListen: true }).reduce((n, m) => n + m.n, 0), 10)
  }
  assert.deepEqual(types(effectiveMix(c, 2, { cantListen: true })), { QT03: 3, QT05: 3, QT06: 4 })
})

test('every lesson has 10 built questions, the right types, no repeated sentence, valid parts', () => {
  for (let round = 1; round <= 5; round++) {
    for (let seed = 1; seed <= 40; seed++) {
      const l = buildLesson(c, { round, rng: seeded(seed * round) })
      assert.equal(l.queue.length, 10)
      const counts = {}
      for (const q of l.queue) {
        counts[q.type] = (counts[q.type] ?? 0) + 1
        assert.ok(BUILT_TYPES.has(q.type))
        assert.ok(c.variants.some((v) => v.variant_id === q.variant && v.status === 'live' && v.type_id === q.type), `${q.type} ${q.variant}`)
        if (q.choices) { assert.ok(q.choices.map((x) => x.toLowerCase()).includes(q.answer.toLowerCase())); assert.equal(new Set(q.choices).size, q.choices.length) }
        if (q.audioChoices) { assert.equal(q.audioChoices.length, 3); assert.ok(q.audioChoices.some((a) => a.sentence_id === q.answer)) }
        if (q.chips) assert.ok(q.chips.length >= 1)
        if (q.type === 'QT01') { assert.equal(q.pairs.length, 5); assert.equal(new Set(q.meanings).size, 5) }
      }
      assert.deepEqual(counts, types(effectiveMix(c, round)))
      const ids = l.queue.filter((q) => q.sentence_id).map((q) => q.sentence_id)
      assert.equal(new Set(ids).size, ids.length)
    }
  }
})

test('off sentences never appear', () => {
  for (let i = 0; i < 200; i++) {
    for (const q of buildLesson(c, { round: 1 + (i % 5), rng: seeded(i + 1) }).queue) assert.ok(!['S0033', 'S0038'].includes(q.sentence_id))
  }
})

test('each round covers every live sentence within its lesson count', () => {
  for (let round = 1; round <= 5; round++) {
    const seen = { sentences: {}, words: {} }
    for (let n = 0; n < lessonsInRound(c, round); n++) {
      for (const q of buildLesson(c, { round, seen, rng: seeded(n + 7) }).queue) {
        if (q.sentence_id) seen.sentences[q.sentence_id] = (seen.sentences[q.sentence_id] ?? 0) + 1
        for (const id of q.word_ids ?? []) seen.words[id] = (seen.words[id] ?? 0) + 1
      }
    }
    assert.equal(Object.keys(seen.sentences).length, c.sentences.length, `round ${round}`)
    if (round === 1) assert.equal(Object.keys(seen.words).length, c.words.length)
  }
})

test('a chip question can always be built from its chips', () => {
  for (let round = 2; round <= 4; round++) {
    for (let seed = 1; seed <= 30; seed++) {
      for (const q of buildLesson(c, { round, rng: seeded(seed) }).queue) {
        if (!q.chips) continue
        const main = (q.lang === 'en' ? q.english : q.french).toLowerCase().replace(/[.,!?]/g, ' ').split(/\s+/).filter(Boolean)
        const pool = q.chips.flatMap((x) => x.toLowerCase().split(' '))
        for (const w of main) { const i = pool.indexOf(w); assert.ok(i >= 0, `${q.type} ${q.french}: ${w}`); pool.splice(i, 1) }
      }
    }
  }
})

test('a re-ask is the same content in a different type', () => {
  for (let round = 1; round <= 5; round++) {
    for (const q of buildLesson(c, { round, rng: seeded(round) }).queue) {
      const r = reaskFor(c, q, { rng: seeded(3) })
      assert.ok(r && r.reask)
      assert.notEqual(r.type, q.type)
      if (q.sentence_id) assert.equal(r.sentence_id, q.sentence_id)
    }
  }
  const typed = { ...buildLesson(c, { round: 5, rng: seeded(2) }).queue.find((q) => q.type === 'QT12') }
  assert.equal(reaskFor(c, typed, { rng: seeded(3) }).type, 'QT08') // the spec's own example
})

test("a re-ask respects Can't listen", () => {
  for (const q of buildLesson(c, { round: 4, rng: seeded(5), settings: { cantListen: true } }).queue) {
    assert.ok(!['QT04', 'QT07', 'QT11'].includes(reaskFor(c, q, { rng: seeded(3), cantListen: true }).type))
  }
})

test('a failed lesson repeats the same items in new types', () => {
  for (let round = 1; round <= 5; round++) {
    const first = buildLesson(c, { round, rng: seeded(round + 1) })
    const again = buildLesson(c, { round, rng: seeded(round + 2), retry: first.queue })
    assert.deepEqual(again.queue.map((q) => q.sentence_id).filter(Boolean).sort(), first.queue.map((q) => q.sentence_id).filter(Boolean).sort())
    const before = new Map(first.queue.map((q) => [q.sentence_id, q.type]))
    const moved = again.queue.filter((q) => q.sentence_id && before.get(q.sentence_id) !== q.type).length
    if (round < 5) assert.ok(moved >= 2, `round ${round} moved ${moved}`)
  }
})

test('review builds from the bank, up to 10, and QT01 entries become sentences', () => {
  const bank = c.sentences.slice(0, 12).map((s, i) => ({ sentence_id: s.sentence_id, type_id: i % 2 ? 'QT01' : 'QT12', correct_in_review: 0, added_at: String(i) }))
  const r = buildReview(c, bank, { round: 3, rng: seeded(9) })
  assert.equal(r.queue.length, 10)
  assert.ok(r.queue.every((q) => q.sentence_id && q.type !== 'QT01'))
})
