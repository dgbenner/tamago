// French "every live main unit builds lessons in all five rounds" (from test/lesson.test.js), in shards by circle so
// they run side by side (Dan, 2026-11-16: about 4.5 minutes as one test). Shard i of n builds every n-th circle from
// i; together, every circle, as before. In test:fast without a French content change, a fixed 5% of them
// (test/lib/scope.mjs).
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { buildLesson, contentForUnit, lessonsInRound } from '../../src/lib/lesson.js'
import { sampleOf } from './scope.mjs'

const seeded = (seed) => { let x = seed; return () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296 } }
export function mainUnits(i, n) {
  test(`every live main unit builds lessons in all five rounds, from a learner who has finished the units before it (shard ${i} of ${n})`, () => {
    const tables = {}
    for (const f of readdirSync('src/content')) tables[f.replace('.json', '')] = JSON.parse(readFileSync(`src/content/${f}`))
    const main = tables.units.filter((u) => String(u.status).startsWith('live') && !['yes', 'node'].includes(u.is_topic_pick)).sort((a, b) => a.order - b.order)
    assert.ok(main.length >= 13)
    for (const u of sampleOf('content', main).filter((_, k) => k % n === i - 1)) {
      const uc = contentForUnit(tables, u.unit_id)
      const before = new Set(tables.words.filter((w) => main.some((m) => m.order < u.order && m.unit_id === w.first_unit)).map((w) => w.word_id))
      for (let round = 1; round <= 5; round++) {
        assert.ok(lessonsInRound(uc, round) >= 1, `${u.unit_id} round ${round}`)
        for (let seed = 1; seed <= 6; seed++) {
          const l = buildLesson(uc, { round, known: round === 1 ? before : new Set([...before, ...uc.wordOrder]), unit_id: u.unit_id, rng: seeded(seed * round) })
          // Ten questions, plus at most one A1 task item (QT14 to QT17) where the circle has them.
          assert.equal(l.queue.filter((q) => !q.item_id).length, 10, `${u.unit_id} round ${round}`)
          assert.ok(l.queue.filter((q) => q.item_id).length <= 1, `${u.unit_id} round ${round}: one task item at most`)
        }
      }
    }
  })
}
