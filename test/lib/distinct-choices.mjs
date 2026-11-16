// French "choices across all units are distinct" (from test/lesson.test.js), split into shards by sentence so the
// shards run side by side (Dan, 2026-11-16): about 22 minutes as one test. Shard i of n checks every n-th sentence
// from i; together they check every sentence, as before.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { buildSession, indexContent } from '../../src/lib/lesson.js'

const seeded = (seed) => { let x = seed; return () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296 } }
export function distinctChoices(i, n) {
  test(`choices across all units are distinct, even where sentences share an English line (shard ${i} of ${n})`, () => {
    const tables = {}
    for (const f of readdirSync('src/content')) tables[f.replace('.json', '')] = JSON.parse(readFileSync(`src/content/${f}`))
    const all = indexContent(tables)
    all.sentences.forEach((s, k) => {
      if (k % n !== i - 1) return
      for (const type of ['QT03', 'QT04']) for (let r = 0; r < 3; r++) {
        const q = buildSession(all, 'practice', [{ sentence_id: s.sentence_id, type, round: 2 }], { rng: seeded(r + 1) }).queue[0]
        if (q?.choices) assert.equal(new Set(q.choices).size, q.choices.length, `${s.sentence_id} ${q.choices}`)
      }
    })
  })
}
