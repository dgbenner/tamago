import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { ANIMALS, version, versionName } from '../src/lib/version.js'

test('one animal per letter, A to Z, in alphabetical order', () => {
  assert.equal(ANIMALS.length, 26)
  assert.equal(ANIMALS.map((a) => a[0]).join(''), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  assert.deepEqual(ANIMALS.slice(0, 3), ['Aardvark', 'Badger', 'Capybara'])
})
test('each deploy takes the next name; after Zebra the run goes back to Aardvark, never a daily reset', () => {
  assert.equal(versionName(1), 'Aardvark')
  assert.equal(versionName(15), 'Otter')
  assert.equal(versionName(16), 'Penguin')
  assert.equal(versionName(26), 'Zebra')
  assert.equal(versionName(27), 'Aardvark')
  assert.equal(versionName(28), 'Badger')
})
test('this version is the one in src/version.json', () => {
  const { number, day, seq } = JSON.parse(readFileSync(new URL('../src/version.json', import.meta.url), 'utf8'))
  assert.ok(Number.isInteger(number) && number >= 1)
  assert.ok(Number.isInteger(seq) && seq >= 1 && seq <= 26, 'seq names the version, 1 to 26')
  assert.match(day, /^\d{4}-\d{2}-\d{2}$/)
  assert.deepEqual(version, { number, day, name: versionName(seq) })
})
test('the name is on the opening screen and the Developer page', () => {
  for (const file of ['Splash.jsx', 'Developer.jsx']) {
    assert.match(readFileSync(new URL(`../src/screens/${file}`, import.meta.url), 'utf8'), /data-version[^>]*>Version \{version\.name\}/, file)
  }
})
