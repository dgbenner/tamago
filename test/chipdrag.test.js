import test from 'node:test'
import assert from 'node:assert/strict'
import { applyDrop, dropIndex, markerAt } from '../src/lib/chipdrag.js'

// Chip drag and drop (Dan, 2026-11-11): where a dropped chip lands, and what the answer becomes.
const rect = (left, top, width = 60, height = 44) => ({ left, top, width, height, right: left + width, bottom: top + height })
// Two rows: three chips on the first, two on the second.
const rows = [rect(0, 0), rect(70, 0), rect(140, 0), rect(0, 54), rect(70, 54)]

test('dropIndex: before the first chip, between chips, after the last, and on the second row', () => {
  assert.equal(dropIndex(rows, 10, 20), 0, 'left half of the first chip')
  assert.equal(dropIndex(rows, 50, 20), 1, 'right half of the first chip')
  assert.equal(dropIndex(rows, 300, 20), 3, 'past the end of row one')
  assert.equal(dropIndex(rows, 5, 70), 3, 'start of row two')
  assert.equal(dropIndex(rows, 300, 70), 5, 'end of row two')
  assert.equal(dropIndex(rows, 300, 200), 5, 'below everything')
  assert.equal(dropIndex(rows, 300, -30), 0, 'above everything')
  assert.equal(dropIndex([], 10, 10), 0, 'empty answer')
})

test('markerAt: a bar before the chip at the index, or after the last chip', () => {
  const box = { left: 0, top: 0, height: 100 }
  assert.deepEqual(markerAt(rows, 1, box), { left: 66, top: 0, height: 44 })
  assert.deepEqual(markerAt(rows, 5, box), { left: 134, top: 54, height: 44 })
  assert.equal(markerAt([], 0, box).left, 0)
})

test('applyDrop: bank to answer, reorder, back to the bank, and a drop nowhere', () => {
  assert.deepEqual(applyDrop([4, 2], 7, { zone: 'answer', index: 1 }), [4, 7, 2], 'from the bank, into the middle')
  assert.deepEqual(applyDrop([4, 2, 7], 4, { zone: 'answer', index: 2 }), [2, 7, 4], 'reordered to the end')
  assert.deepEqual(applyDrop([4, 2, 7], 7, { zone: 'answer', index: 0 }), [7, 4, 2], 'reordered to the start')
  assert.deepEqual(applyDrop([4, 2, 7], 2, { zone: 'bank' }), [4, 7], 'back to the bank')
  assert.deepEqual(applyDrop([4, 2], 7, null), [4, 2], 'dropped nowhere: unchanged')
  assert.deepEqual(applyDrop([4, 2], 7, { zone: 'answer', index: 99 }), [4, 2, 7], 'index past the end goes last')
})
