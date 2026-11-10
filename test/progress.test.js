import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { contentForUnit } from '../src/lib/lesson.js'
import { band, expectedShares, skillScores, SKILLS } from '../src/lib/score.js'
import { rate, strength, weakest } from '../src/lib/strength.js'

const tables = {}
for (const f of readdirSync('src/content')) tables[f.replace('.json', '')] = JSON.parse(readFileSync(`src/content/${f}`))
const units = tables.units.filter((u) => u.cefr === 'A1' && String(u.status).startsWith('live') && !['node', 'yes'].includes(u.is_topic_pick)).map((u) => ({ unit_id: u.unit_id, content: contentForUnit(tables, u.unit_id), reached: 0 }))
const day = (d) => new Date(`2026-11-${String(d).padStart(2, '0')}T12:00:00`)

test('bands follow the feature list', () => {
  assert.equal(band(0), 'very early A1'); assert.equal(band(9.9), 'very early A1'); assert.equal(band(10), 'early A1')
  assert.equal(band(29.9), 'high A1'); assert.equal(band(30), 'A2'); assert.equal(band(59.9), 'A2')
})

test('expected shares come from the round mix and add up to 1', () => {
  const s = expectedShares(units[0].content, 1)
  assert.ok(Math.abs(SKILLS.reduce((n, k) => n + s[k], 0) - 1) < 1e-9)
  assert.equal(s.writing, 0) // round 1 has no writing questions
  assert.ok(s.speaking > 0)
})

test('nothing done scores 0; every A1 round done reaches 29 and stops short of A2', () => {
  const none = skillScores({ units })
  for (const s of SKILLS) assert.equal(none[s].score, 0)
  const all = skillScores({ units: units.map((u) => ({ ...u, reached: 5 })) })
  for (const s of SKILLS) { assert.equal(all[s].score, 29); assert.equal(all[s].band, 'high A1') }
})

test('A2 needs every round and every "I can" for that skill', () => {
  const through = units.map((u) => ({ ...u, reached: 5 }))
  const canDo = SKILLS.flatMap((s) => [{ skill: s, checked: true }, { skill: s, checked: s !== 'writing' }])
  const r = skillScores({ units: through, canDo, clears: { reading: 20 } })
  assert.equal(r.reading.score, 31) // 29 + 2 from clears
  assert.equal(r.reading.band, 'A2')
  assert.equal(r.writing.score, 29)
  const capped = skillScores({ units: through, clears: { reading: 20 } })
  assert.equal(capped.reading.score, 29.9) // clears can't pass A1 without the checks
})

test('a round counts what was actually asked: a listening-heavy round 1 feeds listening more', () => {
  const one = units.map((u, i) => ({ ...u, reached: i === 0 ? 1 : 0 }))
  const asWritten = skillScores({ units: one })
  const heavy = skillScores({ units: one, tally: { U01: { 1: { reading: 2, listening: 8 } } } })
  assert.ok(heavy.listening.score > asWritten.listening.score)
  assert.ok(heavy.reading.score < asWritten.reading.score)
  assert.equal(heavy.speaking.score, 0)
})

test('strength: a fresh correct item is strong and fades; a miss is weak', () => {
  let cards = rate({}, 'S0001', { correct: true }, day(1))
  cards = rate(cards, 'S0002', { correct: false }, day(1))
  assert.equal(strength(['S0001'], cards, day(2)).bars, 4)
  assert.ok(strength(['S0001'], cards, day(30)).bars < 4)
  assert.deepEqual(weakest(['S0001', 'S0002', 'S0003'], cards, 2, day(2)), ['S0002', 'S0001'])
  assert.deepEqual(strength(['S0003'], cards, day(2)), { bars: 0, recall: null, items: 0 })
})

import { buildSession, checkItems, placementItems, practiceType } from '../src/lib/lesson.js'
const seeded = (seed) => { let x = seed; return () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296 } }

test('an "I can" check asks three of the unit\'s sentences in the statement\'s skill', () => {
  for (const [skill, type] of [['listening', 'QT04'], ['reading', 'QT03'], ['writing', 'QT12'], ['speaking', 'QT13']]) {
    const c = units[2].content
    const items = checkItems(c, skill, seeded(2))
    assert.equal(items.length, 3)
    const s = buildSession(c, 'check', items, { rng: seeded(3) })
    assert.ok(s.queue.every((q) => q.type === type && c.sentenceById.get(q.sentence_id).unit_id === 'U03'))
    assert.equal(s.graded, skill === 'speaking' ? 0 : 3)
  }
})

test('placement asks three per unit, in tree order', () => {
  const items = placementItems(units.map((u) => u.content), seeded(4))
  assert.equal(items.length, units.length * 3)
  assert.deepEqual([...new Set(items.map((i) => i.unit_id))], units.map((u) => u.unit_id))
})

test('practice type follows how far the unit has come', () => {
  assert.equal(practiceType(0), 'QT03'); assert.equal(practiceType(2), 'QT08'); assert.equal(practiceType(5), 'QT12')
})
