// Pace on Progress (Dan, 2026-11-15, time-based): hours per week since the learner started, against a typical week
// (src/lib/pace.js, the one place the numbers live). Encouraging words only; an estimate in months.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { A1_HOURS, PACE_LABELS, TYPICAL_WEEKLY_HOURS, paceOf } from '../src/lib/pace.js'

const h = (n) => n * 3_600_000
const DAY = 24 * 3_600_000
const now = Date.parse('2026-11-15T12:00:00Z')
const weeksAgo = (w) => new Date(now - w * 7 * DAY).toISOString()

test('5 hours a week is typical, and the numbers live in pace.js only', () => {
  assert.equal(TYPICAL_WEEKLY_HOURS, 5)
  assert.deepEqual(A1_HOURS, { low: 60, high: 100 })
  // 5 a week reaches the range in 12 to 20 weeks: about 3 to 5 months.
  assert.ok(A1_HOURS.low / 5 / (52 / 12) >= 2.7 && A1_HOURS.high / 5 / (52 / 12) <= 5)
  assert.doesNotMatch(readFileSync('src/screens/Progress.jsx', 'utf8'), /\b(60|5 hours)\b/, 'Progress reads the numbers from pace.js')
})

test('well above a typical week is ahead, near it on pace, below it room to add time', () => {
  assert.equal(paceOf(h(28), weeksAgo(4), now).status, 'ahead') // 7 a week
  assert.equal(paceOf(h(20), weeksAgo(4), now).status, 'on') // 5 a week
  assert.equal(paceOf(h(8), weeksAgo(4), now).status, 'room') // 2 a week
})

test('the first days count as a week, so a first evening doesn\'t read as a flying start', () => {
  assert.equal(paceOf(h(1), new Date(now - DAY).toISOString(), now).perWeek, 1)
})

test('the estimate: A1 in about N months at the learner\'s own pace', () => {
  assert.equal(paceOf(h(20), weeksAgo(4), now).estimate, 'At this pace, A1 in about 3 months') // 60 h left at 5 a week
  assert.equal(paceOf(h(79.5), weeksAgo(10), now).estimate, 'At this pace, A1 in under a month')
  assert.equal(paceOf(h(90), weeksAgo(10), now).estimate, 'The typical hours for A1 are in')
})

test('nothing before any time is counted; the words are Dan\'s, none of them guilt', () => {
  assert.equal(paceOf(0, weeksAgo(1), now), null)
  assert.equal(paceOf(h(2), null, now), null)
  assert.deepEqual(Object.values(PACE_LABELS), ['Ahead of pace', 'On pace', 'Room to add time'])
  for (const hrs of [40, 20, 1]) assert.doesNotMatch(paceOf(h(hrs), weeksAgo(4), now).line, /behind|slow|only|should|must|late/i)
})

test('no estimate from a first few minutes, nor one past two years; minutes under an hour a week', () => {
  assert.equal(paceOf(h(0.2), weeksAgo(1), now).estimate, null)
  assert.equal(paceOf(h(1.5), weeksAgo(20), now).estimate, null) // 0.075 a week: years away
  assert.equal(paceOf(h(0.5), weeksAgo(1), now).weekLine, '30 minutes a week so far')
  assert.equal(paceOf(h(10), weeksAgo(4), now).weekLine, '2.5 hours a week so far')
})
