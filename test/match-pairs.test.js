// Match Pairs taps (Dan, 2026-11-14): tap again to deselect; a wrong pair returns both tiles to how they were.
import test from 'node:test'
import assert from 'node:assert/strict'
import { startPairs, tapPair } from '../src/lib/match-pairs.js'

const pairs = [{ form: 'chat', hint: 'cat' }, { form: 'chien', hint: 'dog' }]
const run = (taps) => taps.reduce((s, [side, v]) => tapPair(s, pairs, side, v).state, startPairs())

test('tapping a selected tile again deselects it, on either side', () => {
  assert.equal(run([['form', 'chat'], ['form', 'chat']]).form, null)
  assert.equal(run([['meaning', 'dog'], ['meaning', 'dog']]).meaning, null)
  assert.equal(tapPair(run([['form', 'chat']]), pairs, 'form', 'chat').outcome, 'deselect')
})
test('another tile in the same column moves the selection', () => {
  assert.equal(run([['form', 'chat'], ['form', 'chien']]).form, 'chien')
})
test('a right pair leaves the board', () => {
  const s = run([['form', 'chat'], ['meaning', 'cat']])
  assert.deepEqual(s.matched, ['chat'])
  assert.equal(s.form, null); assert.equal(s.meaning, null)
})
test('a wrong pair returns both tiles to how they were, whichever side came first', () => {
  for (const taps of [[['form', 'chat'], ['meaning', 'dog']], [['meaning', 'dog'], ['form', 'chat']]]) {
    const r = tapPair(run(taps.slice(0, 1)), pairs, ...taps[1])
    assert.equal(r.outcome, 'wrong')
    assert.deepEqual({ form: r.state.form, meaning: r.state.meaning, matched: r.state.matched }, { form: null, meaning: null, matched: [] })
    assert.deepEqual(r.state.wrong, { f: 'chat', m: 'dog' }, 'only the shake marks it')
    // the next tap starts fresh: no leftover selection or shake
    const next = tapPair(r.state, pairs, 'form', 'chien').state
    assert.equal(next.wrong, null); assert.equal(next.form, 'chien'); assert.equal(next.meaning, null)
  }
})
