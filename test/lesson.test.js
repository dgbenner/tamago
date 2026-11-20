import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { BUILT_TYPES, buildLesson, buildReview, buildSession, contentForUnit, indexContent, effectiveMix, lessonScope, lessonsInRound, mixSlots, passMark, reaskFor } from '../src/lib/lesson.js'
import { checkTyped } from '../src/lib/check.js'

const tables = {}
for (const f of readdirSync('src/content')) tables[f.replace('.json', '')] = JSON.parse(readFileSync(`src/content/${f}`))
const c = contentForUnit(tables, 'U01')
const allKnown = new Set(c.wordOrder)

function seeded(seed) {
  let x = seed
  return () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296 }
}
const types = (mix) => Object.fromEntries(mix.map((m) => [m.type, m.n]))
const wordsIn = (s) => c.swBySentence.get(s.sentence_id).map((r) => r.word_id).filter(Boolean)

// The workbook mix, with the speaking shift on top (Dan, 2026-11-12, batch 4): no speaking in rounds 1 and 2, one in
// rounds 3 to 5, the freed slots to graded types, Answer the Question first.
test('mixes: the workbook mix with far fewer speaking questions, their slots to graded types', () => {
  assert.deepEqual(types(effectiveMix(c, 1)), { QT01: 2, QT02: 2, QT03: 3, QT04: 3 })
  assert.deepEqual(types(effectiveMix(c, 2)), { QT03: 1, QT04: 2, QT05: 2, QT06: 3, QT07: 2 })
  assert.deepEqual(types(effectiveMix(c, 3)), { QT05: 2, QT07: 2, QT08: 3, QT09: 2, QT10: 1 })
  // Rounds 4 and 5 also give one Type in French slot to Build in English, for reading (2026-11-13).
  assert.deepEqual(types(effectiveMix(c, 4)), { QT06: 2, QT07: 1, QT08: 1, QT09: 2, QT11: 2, QT12: 1, QT13: 1 })
  assert.deepEqual(types(effectiveMix(c, 5)), { QT06: 2, QT09: 3, QT11: 2, QT12: 2, QT13: 1 })
})

test("Can't speak swaps the speaking types per cant_swaps", () => {
  assert.deepEqual(types(effectiveMix(c, 1, { cantSpeak: true })), { QT01: 2, QT02: 2, QT03: 3, QT04: 3 }) // no speaking left to swap
  assert.deepEqual(types(effectiveMix(c, 4, { cantSpeak: true })), { QT06: 2, QT07: 1, QT08: 1, QT09: 2, QT11: 2, QT12: 2 })
})

test('a unit without enough pictures runs word to image on its fallback', () => {
  const bare = contentForUnit({ ...tables, words: tables.words.map((w) => ({ ...w, image_file: '' })) }, 'U01')
  assert.deepEqual(types(effectiveMix(bare, 1)), { QT01: 2, QT03: 5, QT04: 3 })
})

test('word to image: pictured words met, the answer among the choices, V0202 has four', () => {
  for (let seed = 1; seed <= 30; seed++) {
    for (const q of buildLesson(c, { round: 1, known: allKnown, rng: seeded(seed) }).queue.filter((x) => x.type === 'QT02')) {
      assert.ok(q.choices.some((x) => x.word_id === q.answer))
      assert.equal(q.choices.length, q.variant === 'V0202' ? 4 : 3)
      assert.ok(q.choices.every((x) => /\.(svg|webp)$/.test(x.image)))
      assert.equal(new Set(q.choices.map((x) => x.word_id)).size, q.choices.length)
    }
  }
})

test("Can't listen removes every audio type and keeps QT09, written out", () => {
  for (let r = 1; r <= 5; r++) {
    for (const m of effectiveMix(c, r, { cantListen: true })) assert.ok(!['QT04', 'QT07', 'QT11'].includes(m.type), `round ${r} ${m.type}`)
    assert.equal(effectiveMix(c, r, { cantListen: true }).reduce((n, m) => n + m.n, 0), 10)
  }
  assert.deepEqual(types(effectiveMix(c, 2, { cantListen: true })), { QT03: 3, QT05: 2, QT06: 5 })
  const q = buildLesson(c, { round: 3, known: allKnown, settings: { cantListen: true }, rng: seeded(4) }).queue.find((x) => x.type === 'QT09')
  assert.equal(q.variant, 'V0903')
})

test('pass mark is 60% of graded questions, rounded up (Dan, 2026-11-15)', () => {
  assert.equal(passMark(10), 6)
  assert.equal(passMark(9), 6)
  assert.equal(passMark(8), 5)
  assert.equal(buildLesson(c, { round: 3, known: allKnown, rng: seeded(1) }).graded, 9) // one speaking question isn't graded
})

test('round 1: at most 4 new words a lesson, sentences only from met words, new words first', () => {
  for (let seed = 1; seed <= 20; seed++) {
    const known = new Set()
    const seen = { sentences: {}, words: {} }
    const rng = seeded(seed)
    for (let n = 0; n < lessonsInRound(c, 1); n++) {
      const scope = lessonScope(c, known, 1)
      assert.ok(scope.newWords.length <= 4)
      const lesson = buildLesson(c, { round: 1, seen, known, rng })
      assert.equal(lesson.queue[0].type, 'QT01')
      for (const id of scope.newWords) assert.ok(lesson.queue.filter((q) => q.type === 'QT01').some((q) => q.word_ids.includes(id)), `new word ${id} never matched`)
      assert.ok(lesson.queue[0].word_ids.includes(scope.newWords[0]) || scope.newWords.length === 0)
      const before = new Set(known)
      for (const q of lesson.queue) {
        if (q.sentence_id) {
          for (const id of wordsIn(c.sentenceById.get(q.sentence_id))) assert.ok(before.has(id) || scope.newWords.includes(id), `${q.french}: ${id} unmet`)
          seen.sentences[q.sentence_id] = (seen.sentences[q.sentence_id] ?? 0) + 1
        }
        for (const id of q.word_ids ?? []) { seen.words[id] = (seen.words[id] ?? 0) + 1; known.add(id) }
        for (const seg of q.segments ?? []) if (seg.word_id) known.add(seg.word_id)
      }
    }
    assert.equal(known.size, c.wordOrder.length, 'all words met by the end of round 1')
    assert.equal(Object.keys(seen.sentences).length, c.sentences.length, `seed ${seed} sentence coverage`)
  }
})

test('the first lesson has 4 pairs, using the 4-pair variant', () => {
  const q = buildLesson(c, { round: 1, rng: seeded(3) }).queue[0]
  assert.equal(q.pairs.length, 4)
  assert.equal(q.variant, 'V0102')
  assert.equal(new Set(q.meanings).size, 4)
})

test('every lesson has 10 built questions, the right types and valid parts', () => {
  for (let round = 1; round <= 5; round++) {
    for (let seed = 1; seed <= 40; seed++) {
      const l = buildLesson(c, { round, known: allKnown, rng: seeded(seed * round) })
      assert.equal(l.queue.length, 10)
      const counts = {}
      for (const q of l.queue) {
        counts[q.type] = (counts[q.type] ?? 0) + 1
        assert.ok(BUILT_TYPES.has(q.type))
        assert.ok(c.variants.some((v) => v.variant_id === q.variant && v.type_id === q.type), `${q.type} ${q.variant}`)
        if (q.choices && q.type !== 'QT02') { assert.ok(q.choices.map((x) => x.toLowerCase()).includes(q.answer.toLowerCase())); assert.equal(new Set(q.choices).size, q.choices.length) }
        if (q.audioChoices) { assert.equal(q.audioChoices.length, 3); assert.ok(q.audioChoices.some((a) => a.sentence_id === q.answer)) }
        if (q.type === 'QT01') { assert.equal(q.pairs.length, 5); assert.equal(new Set(q.meanings).size, 5) }
      }
      assert.deepEqual(counts, types(effectiveMix(c, round)))
      const ids = l.queue.filter((q) => q.sentence_id).map((q) => q.sentence_id)
      assert.equal(new Set(ids).size, ids.length)
    }
  }
})

test('variants follow the rounds', () => {
  const qs = (round) => buildLesson(c, { round, known: allKnown, rng: seeded(round) }).queue
  assert.ok(qs(1).filter((q) => q.type === 'QT04').every((q) => q.variant === 'V0404' && q.choices))
  assert.ok(qs(2).filter((q) => q.type === 'QT04').every((q) => q.variant === 'V0404'))
  const r5 = qs(5)
  assert.ok(r5.filter((q) => q.type === 'QT06').every((q) => q.variant === 'V0602' && !q.chips))
  assert.ok(r5.filter((q) => q.type === 'QT09').every((q) => q.variant === 'V0902' && !q.chips))
  assert.ok(qs(3).filter((q) => q.type === 'QT09').every((q) => q.variant === 'V0901' && q.chips))
})

test('contrast: an un or une, suis or es sentence gets its partner as a wrong chip', () => {
  let checked = 0
  for (let seed = 1; seed <= 60; seed++) {
    for (const round of [2, 3, 4]) {
      for (const q of buildLesson(c, { round, known: allKnown, rng: seeded(seed) }).queue) {
        if (!['QT07', 'QT08'].includes(q.type)) continue
        const forms = q.segments.map((s) => s.text.toLowerCase())
        const partners = forms.flatMap((f) => c.contrast.get(f) ?? []).filter((f) => !forms.includes(f))
        if (partners.length) { checked++; assert.ok(q.chips.some((x) => partners.includes(x)), `${q.french}: ${q.chips}`) }
      }
    }
  }
  assert.ok(checked > 100)
  const r2 = buildLesson(c, { round: 2, known: allKnown, rng: seeded(2) }).queue.find((q) => q.type === 'QT07')
  assert.equal(r2.chips.length, c.swBySentence.get(r2.sentence_id).length + 1, 'round 2 QT07 has one wrong chip')
})

test('QT09 accepts every listed answer, and only those', () => {
  const q = buildLesson(c, { round: 5, known: allKnown, rng: seeded(6) }).queue.find((x) => x.type === 'QT09')
  const listed = c.qaByQuestion.get(q.sentence_id).map((id) => c.sentenceById.get(id).french)
  assert.ok(listed.length >= 3)
  const check = (t) => checkTyped(t, q.accepted, { lang: 'fr', vocabulary: c.vocabulary.fr }).correct
  for (const a of listed) assert.ok(check(a), a)
  assert.equal(check('Merci.'), false)
})

test('a chip question can always be built from its chips', () => {
  for (let round = 2; round <= 4; round++) {
    for (let seed = 1; seed <= 30; seed++) {
      for (const q of buildLesson(c, { round, known: allKnown, rng: seeded(seed) }).queue) {
        if (!q.chips) continue
        const main = q.shown.toLowerCase().replace(/[.,!?]/g, ' ').split(/\s+/).filter(Boolean)
        const pool = q.chips.flatMap((x) => x.toLowerCase().split(' '))
        for (const w of main) { const i = pool.indexOf(w); assert.ok(i >= 0, `${q.type} ${q.french}: ${w}`); pool.splice(i, 1) }
      }
    }
  }
})

test('a re-ask is the same content in a different type, allowed in that round', () => {
  for (let round = 1; round <= 5; round++) {
    for (let seed = 1; seed <= 10; seed++) {
      for (const q of buildLesson(c, { round, known: allKnown, rng: seeded(seed + round) }).queue.filter((x) => !x.speaking)) {
        const r = reaskFor(c, q, { rng: seeded(3) })
        assert.ok(r && r.reask, `${q.type} round ${round}`)
        // A line cut from listening (by-ear.js) may have no other type open, so the same type returns with new choices.
        if (!q.notByEar) assert.notEqual(r.type, q.type)
        const t = c.typeById.get(r.type)
        assert.ok(round >= t.first_round && round <= t.last_round, `${r.type} in round ${round}`)
        if (q.sentence_id && q.type !== 'QT09') assert.equal(r.sentence_id, q.sentence_id)
      }
    }
  }
  const typed = buildLesson(c, { round: 5, known: allKnown, rng: seeded(2) }).queue.find((q) => q.type === 'QT12')
  assert.equal(reaskFor(c, typed, { rng: seeded(3) }).type, 'QT08') // the spec's own example
})

test("a re-ask respects Can't listen", () => {
  for (let round = 1; round <= 5; round++) {
    for (const q of buildLesson(c, { round, known: allKnown, rng: seeded(5), settings: { cantListen: true } }).queue) {
      const r = reaskFor(c, q, { rng: seeded(3), cantListen: true })
      if (r) assert.ok(!['QT04', 'QT07', 'QT11'].includes(r.type))
    }
  }
})

test('a missed item fills one slot in the next lesson at its original type', () => {
  const s = c.sentences.find((x) => x.sentence_id === 'S0006')
  const l = buildLesson(c, { round: 4, known: allKnown, rng: seeded(8), carry: { sentence_id: s.sentence_id, type: 'QT12' } })
  assert.equal(l.queue.length, 10)
  assert.ok(l.queue.some((q) => q.sentence_id === 'S0006' && q.type === 'QT12'))
  const moved = buildLesson(c, { round: 5, known: allKnown, rng: seeded(8), carry: { sentence_id: s.sentence_id, type: 'QT05' } })
  assert.ok(!moved.queue.some((q) => q.type === 'QT05'), 'a type outside the round is skipped')
})

test('a failed lesson repeats the same items in new types', () => {
  for (let round = 1; round <= 5; round++) {
    const first = buildLesson(c, { round, known: allKnown, rng: seeded(round + 1) })
    const again = buildLesson(c, { round, known: allKnown, rng: seeded(round + 2), retry: first.queue })
    const ids = (l) => l.queue.map((q) => q.sentence_id).filter(Boolean).sort()
    const shared = ids(again).filter((id) => ids(first).includes(id)).length
    assert.ok(shared >= ids(first).length - 1, `round ${round}: ${shared}`)
    const before = new Map(first.queue.map((q) => [q.sentence_id, q.type]))
    assert.ok(again.queue.filter((q) => q.sentence_id && before.get(q.sentence_id) !== q.type).length >= 2, `round ${round}`)
  }
})

test('review: up to 10 from the bank, not yet correct today first, QT01 entries become sentences', () => {
  const bank = c.sentences.slice(0, 12).map((s, i) => ({ sentence_id: s.sentence_id, type_id: i % 2 ? 'QT01' : 'QT12', correct_days: i < 2 ? ['2026-11-07'] : [], added_at: String(i) }))
  const r = buildReview(c, bank, { round: 3, rng: seeded(9), today: '2026-11-07' })
  assert.equal(r.queue.length, 10)
  assert.ok(r.queue.every((q) => q.sentence_id && q.type !== 'QT01'))
  assert.ok(!r.queue.some((q) => q.sentence_id === bank[0].sentence_id || q.sentence_id === bank[1].sentence_id))
})

test('R17: every question uses a variant its use_in_rounds allows', () => {
  const covers = (v, r) => { const m = String(v.use_in_rounds).match(/^(\d)(?:-(\d))?$/); return m && r >= +m[1] && r <= +(m[2] ?? m[1]) }
  for (const cantListen of [false, true]) {
    for (let round = 1; round <= 5; round++) {
      for (let seed = 1; seed <= 15; seed++) {
        for (const q of buildLesson(c, { round, known: allKnown, rng: seeded(seed), settings: { cantListen } }).queue) {
          if (q.type === 'QT01') continue // R01 picks V0101 or V0102 by the words available
          const v = c.variants.find((x) => x.variant_id === q.variant)
          assert.equal(v.status, 'live', q.variant)
          const live = c.variants.filter((x) => x.type_id === q.type && x.status === 'live')
          if (String(v.use_in_rounds).endsWith(' only')) { assert.ok(cantListen, `${q.variant} without its setting`); continue }
          const listed = live.filter((x) => covers(x, round))
          if (listed.length) assert.ok(covers(v, round), `${q.variant} in round ${round}`)
          else assert.equal(v.use_in_rounds, '', `${q.variant} in round ${round}`)
        }
      }
    }
  }
  const qt09 = buildLesson(c, { round: 4, known: allKnown, rng: seeded(2), settings: { cantListen: true } }).queue.find((q) => q.type === 'QT09')
  assert.equal(qt09.variant, 'V0903')
})

test('R06: a re-ask uses a type from this round or the round before', () => {
  for (let round = 1; round <= 5; round++) {
    const allowed = new Set([round, round - 1].filter((r) => r >= 1).flatMap((r) => effectiveMix(c, r).map((m) => m.type)))
    for (let seed = 1; seed <= 15; seed++) {
      for (const q of buildLesson(c, { round, known: allKnown, rng: seeded(seed) }).queue.filter((x) => !x.speaking)) {
        const r = reaskFor(c, q, { rng: seeded(seed) })
        assert.ok(r && allowed.has(r.type), `${q.type} in round ${round} became ${r?.type}`)
      }
    }
  }
})

test('swapped_from records the workbook type a slot started as', () => {
  const q = buildLesson(c, { round: 4, known: allKnown, rng: seeded(3), settings: { cantSpeak: true } }).queue
  assert.ok(q.some((x) => x.type === 'QT12' && x.swapped_from === 'QT13'))
  assert.ok(!q.some((x) => x.type === 'QT06' && x.swapped_from))
  // The first lesson has too few pictured words for word to image, so those slots fall back and say so.
  const first = buildLesson(c, { round: 1, rng: seeded(3) }).queue
  assert.ok(first.some((x) => x.type === 'QT03' && x.swapped_from === 'QT02'))
})

test('QT09 shows and builds the fullest listed answer', () => {
  for (let seed = 1; seed <= 20; seed++) {
    const q = buildLesson(c, { round: 3, known: allKnown, rng: seeded(seed) }).queue.find((x) => x.type === 'QT09')
    const words = (f) => f.split(/\s+/).length
    assert.ok(q.accepted.every((a) => words(a) <= words(q.shown)), q.shown)
  }
})

test('topic packs: lessons build in every round, no QT09 without pairs, and no other pack leaks in', () => {
  const packs = tables.units.filter((u) => u.is_topic_pick === 'yes' && String(u.status).startsWith('live'))
  assert.ok(packs.length >= 8)
  // Each pack belongs to a Your Topic node on the tree: the first seven to U100, those on all of A1 to U200.
  const nodes = new Set(tables.units.filter((u) => u.is_topic_pick === 'node').map((u) => u.unit_id))
  assert.ok(packs.every((p) => nodes.has(p.topic_node || 'U100') && tables.tree_layout.some((t) => t.unit_id === (p.topic_node || 'U100'))))
  assert.ok(nodes.has('U200') && packs.some((p) => p.topic_node === 'U200'))
  for (const p of packs) {
    const pc = contentForUnit(tables, p.unit_id)
    const units = new Set(pc.sentences.map((s) => s.unit_id))
    assert.ok(packs.every((o) => o.unit_id === p.unit_id || !units.has(o.unit_id)), p.unit_id)
    const known = new Set(pc.wordOrder)
    for (let round = 1; round <= 5; round++) {
      assert.ok(lessonsInRound(pc, round) >= 1)
      for (let seed = 1; seed <= 10; seed++) {
        const l = buildLesson(pc, { round, known, unit_id: p.unit_id, rng: seeded(seed * round) })
        assert.equal(l.queue.length, 10, `${p.unit_id} round ${round}`)
        assert.ok(l.queue.every((q) => BUILT_TYPES.has(q.type) && (q.type !== 'QT09' || pc.qaByQuestion.size > 0)), `${p.unit_id} round ${round}`)
      }
    }
  }
})

// 'choices across all units are distinct' runs in six shards: test/distinct-choices-<n>.test.js.

// 'every live main unit builds lessons in all five rounds' runs in four shards: test/main-units-<n>.test.js.

test('final A1 check: four parts in exam order, the course\'s own A1 sentences, each once, speaking ungraded', async () => {
  const { finalItems, finalScores, PARTS } = await import('../src/lib/finalcheck.js')
  const all = indexContent(tables)
  const mains = tables.units.filter((u) => String(u.status).startsWith('live') && !['yes', 'node'].includes(u.is_topic_pick)).map((u) => u.unit_id)
  const items = finalItems(all, mains, seeded(7))
  assert.deepEqual([...new Set(items.map((i) => i.part))], ['listening', 'reading', 'writing', 'speaking'])
  assert.equal(items.length, PARTS.flatMap((p) => p.items).reduce((n, [, , c]) => n + c, 0))
  assert.equal(new Set(items.map((i) => i.sentence_id)).size, items.length)
  assert.ok(items.every((i) => mains.includes(i.unit_id)))
  const s = buildSession(all, 'final', items, { rng: seeded(7) })
  assert.ok(s.queue.filter((q) => q.part === 'speaking').every((q) => q.speaking))
  assert.equal(s.graded, items.filter((i) => i.part !== 'speaking').length)
  const scores = finalScores([{ part: 'reading', correct: true }, { part: 'reading', correct: false }, { part: 'speaking', speaking: true }])
  assert.deepEqual(scores.reading, { right: 1, total: 2 })
  assert.deepEqual(scores.speaking, { done: 1 })
})

// The French final check is a mock DELF A1 (Dan, 2026-11-15): its four papers in order, each with the task the paper
// sets, A1 task items from every part, four reading texts of four kinds, the message written but not scored.
test('French final check: a mock DELF A1 with numbers heard, four kinds of text, a form and a message', async () => {
  const { finalItems, finalScores, partsFor } = await import('../src/lib/finalcheck.js')
  const all = indexContent(tables)
  const mains = tables.units.filter((u) => String(u.status).startsWith('live') && !['yes', 'node'].includes(u.is_topic_pick)).map((u) => u.unit_id)
  const items = finalItems(all, mains, seeded(11), 'fr')
  assert.deepEqual([...new Set(items.map((i) => i.part))], ['listening', 'reading', 'writing', 'speaking'])
  assert.equal(items.length, partsFor('fr').flatMap((p) => p.items).reduce((n, [, , c]) => n + c, 0))
  const of = (type) => items.filter((i) => i.type === type)
  assert.ok(of('QT17').length === 4 && of('QT17').every((i) => i.part === 'listening' && i.a1))
  assert.equal(new Set(of('QT14').map((i) => i.a1.kind)).size, 4, 'four kinds of text')
  assert.ok(of('QT15').length === 1 && of('QT16').length === 1 && [...of('QT15'), ...of('QT16')].every((i) => i.part === 'writing'))
  assert.equal(new Set(items.map((i) => i.sentence_id ?? i.a1.id)).size, items.length, 'nothing twice')
  const s = buildSession(all, 'final', items, { rng: seeded(11) })
  assert.equal(s.queue.length, items.length)
  assert.equal(s.graded, items.filter((i) => i.part !== 'speaking' && i.type !== 'QT16').length)
  const scores = finalScores([{ part: 'writing', correct: true }, { part: 'writing', correct: true, ungraded: true }])
  assert.deepEqual(scores.writing, { right: 1, total: 1, written: 1 })
  // A course without a mock exam format keeps the general one (every course has one now: test/exams.test.js).
  assert.ok(finalItems(all, mains, seeded(11), 'zz').every((i) => !i.a1))
})

// Crash fix (playthrough audit, 2026-11-12): a later round for a learner who hasn't met its words (a topic pack, a Dev
// jump) used to throw when no sentence fit a slot; it now falls back to a type a sentence supports.
test('a later round never crashes for a learner who has met none of its words', () => {
  for (let round = 3; round <= 5; round++) {
    const l = buildLesson(c, { round, known: new Set(), rng: seeded(round) })
    assert.equal(l.queue.filter((q) => !q.item_id).length, 10, `round ${round}`)
  }
})

// No locks (Dan, 2026-11-15): a circle opened early introduces the earlier circles' words its own sentences use, the
// way a help circle introduces what it borrows: new, toward the 4, never assumed known.
test('a circle opened early introduces the earlier words its sentences use', () => {
  const later = tables.units.filter((u) => String(u.status).startsWith('live') && u.is_topic_pick === 'no' && Number(u.part) === 3)[0]
  const uc = contentForUnit(tables, later.unit_id)
  const normal = lessonScope(uc, new Set(), 1)
  const early = lessonScope(uc, new Set(), 1, { early: true })
  assert.ok(normal.newWords.every((id) => uc.wordById.get(id).first_unit === later.unit_id), 'in order, only its own words are new')
  assert.ok(early.newWords.some((id) => uc.wordById.get(id).first_unit !== later.unit_id), 'early, earlier words are introduced too')
  assert.ok(early.newWords.length <= 4)
  assert.ok(early.sentences.every((s) => (uc.swBySentence.get(s.sentence_id) ?? []).every((r) => !r.word_id || early.allowed.has(r.word_id))))
})

// The end-of-lesson toast (Dan, 2026-11-15): a phrase per score band, about six each, none under 60%.
test('pass phrases: three bands of six, none under 60%', async () => {
  const { PASS_PHRASES, passBand, passPhrase } = await import('../src/lib/pass-phrases.js')
  for (const list of Object.values(PASS_PHRASES)) assert.equal(new Set(list).size, 6)
  assert.equal(passBand(0.59), null); assert.equal(passPhrase(0.5), null)
  assert.equal(passBand(0.6), 'pass'); assert.equal(passBand(0.79), 'pass')
  assert.equal(passBand(0.8), 'strong'); assert.equal(passBand(0.99), 'strong')
  assert.equal(passBand(1), 'perfect')
  assert.ok(PASS_PHRASES.perfect.includes('Perfect Score!'))
})

// Equivalent answers (Dan, 2026-11-15; scripts/lib/equivalents.mjs): safe reorderings, US and UK words, time phrases
// in the course language; never a question turned into a statement, nor a time word pulled out of its phrase.
test('equivalent answers: safe reorderings only', async () => {
  const { equivalentAnswers } = await import('../scripts/lib/equivalents.mjs')
  const run = (english, french = 'x', lang = 'fr') => equivalentAnswers({ sentences: [{ sentence_id: 's', french, english }], rows: [], lang }).added.map((r) => r.answer)
  assert.ok(run('Here we are.').includes('We are here.'))
  assert.ok(run('Here is the book.').includes('The book is here.'))
  assert.ok(run("I'm leaving tomorrow.").includes("Tomorrow, I'm leaving."))
  assert.ok(run('I live in a flat.').includes('I live in an apartment.'))
  assert.deepEqual(run('Is he here?'), [])
  assert.deepEqual(run('There is a cat.'), [])
  assert.deepEqual(run('Thanks for yesterday.', 'Je vous remercie pour hier.'), [])
  assert.deepEqual(run('The departure is now.', "Le départ, c'est maintenant."), [])
  assert.ok(run('I eat in the evening.', 'Le soir, je mange.').includes('Je mange le soir.'))
  assert.deepEqual(run('x', 'Morgen gehe ich.', 'de'), [])
})

