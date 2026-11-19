import test from 'node:test'
import assert from 'node:assert/strict'
import { brushUpGreen, brushUpSpan, inSpan, isLit, reachedRow } from '../src/lib/tree-reach.js'

// Dan, 2026-11-18: Brush-Ups, checkpoints and part reviews stay faded until the learner gets there or uses them.
const slots = [{ slot_id: 'C01', after_row: 5 }, { slot_id: 'C02', after_row: 7 }, { slot_id: 'C03', after_row: 12 }]

test('the first Brush-Up covers everything above it, each later one the rows since the one before', () => {
  assert.deepEqual(brushUpSpan(slots, slots[0]), { from: -Infinity, to: 5 })
  assert.deepEqual(brushUpSpan(slots, slots[1]), { from: 6, to: 7 })
  assert.deepEqual(brushUpSpan(slots, slots[2]), { from: 8, to: 12 }) // across the part boundary too
})

test('a row belongs to exactly one Brush-Up', () => {
  for (let row = 1; row <= 12; row++) assert.equal(slots.filter((s) => inSpan(row, brushUpSpan(slots, s))).length, 1, `row ${row}`)
  assert.equal(slots.filter((s) => inSpan(13, brushUpSpan(slots, s))).length, 0)
  assert.equal(inSpan(undefined, brushUpSpan(slots, slots[0])), false)
})

test('faded until a circle in the row above it, or below it, has been started', () => {
  assert.equal(isLit({ row: 5, startedRows: [] }), false)
  assert.equal(isLit({ row: 5, startedRows: [1, 2, 4] }), false) // work above it, but not yet at it
  assert.equal(isLit({ row: 5, startedRows: [1, 5] }), true) // the row just above it is started
  assert.equal(isLit({ row: 5, startedRows: [9] }), true) // the learner is working further down
  assert.equal(reachedRow(7, [5]), false)
})

test('using it lights it wherever the learner is', () => {
  assert.equal(isLit({ row: 12, startedRows: [1], used: true }), true)
  assert.equal(isLit({ row: 12, startedRows: [1], used: null }), false)
})

test('a Brush-Up is green only when it is empty and was worked through, or everything it covers is finished', () => {
  assert.equal(brushUpGreen({ available: true, waiting: 0, engaged: true }), true) // every item inside answered
  assert.equal(brushUpGreen({ available: true, waiting: 0, allFinished: true }), true) // a perfect run above it
  assert.equal(brushUpGreen({ available: true, waiting: 0 }), false) // a lesson or two above it, nothing missed yet
  assert.equal(brushUpGreen({ available: true, waiting: 2, engaged: true, allFinished: true }), false) // a new miss
  assert.equal(brushUpGreen({ available: false, waiting: 0, engaged: true }), false)
})
