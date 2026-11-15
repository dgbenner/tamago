// Pace on Progress (Dan, 2026-11-15): hours against the typical time for A1 (src/lib/pace.js, the one place the range
// lives). Encouraging words only; nothing before a lesson.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { A1_HOURS, PACE_LABELS, paceOf } from '../src/lib/pace.js'

const h = (n) => n * 3_600_000
test('the A1 range is 60 to 100 guided hours, in one place', () => {
  assert.deepEqual(A1_HOURS, { low: 60, high: 100 })
  assert.doesNotMatch(readFileSync('src/screens/Progress.jsx', 'utf8'), /\b60\b/, 'Progress reads the range from pace.js')
})
test('a tenth of the course: under 6 hours has room, 6 to 10 is on pace, over 10 is ahead', () => {
  assert.equal(paceOf(h(3), 0.1).status, 'room')
  assert.equal(paceOf(h(8), 0.1).status, 'on')
  assert.equal(paceOf(h(12), 0.1).status, 'ahead')
})
test('nothing before a lesson; the bar stops at the top of the range', () => {
  assert.equal(paceOf(h(1), 0), null)
  assert.equal(paceOf(h(500), 1).bar, 1)
})
test('the words are the three Dan chose, none of them guilt', () => {
  assert.deepEqual(Object.values(PACE_LABELS), ['Ahead of pace', 'On pace', 'Room to add time'])
  for (const s of ['ahead', 'on', 'room']) assert.doesNotMatch(paceOf(h({ ahead: 50, on: 8, room: 0.1 }[s]), 0.1).line, /behind|slow|only|should|must|late/i)
})
