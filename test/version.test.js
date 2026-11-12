import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { ANIMALS, version, versionName } from '../src/lib/version.js'

test('one animal per letter, A to Z, in alphabetical order', () => {
  assert.equal(ANIMALS.length, 26)
  assert.equal(ANIMALS.map((a) => a[0]).join(''), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  assert.deepEqual(ANIMALS.slice(0, 3), ['Aardvark', 'Badger', 'Capybara'])
})
test('each deploy of the day takes the next name; after Z a second round begins', () => {
  assert.equal(versionName(1), 'Aardvark')
  assert.equal(versionName(2), 'Badger')
  assert.equal(versionName(3), 'Capybara')
  assert.equal(versionName(26), 'Zebra')
  assert.equal(versionName(27), 'Aardvark 2')
  assert.equal(versionName(28), 'Badger 2')
  assert.equal(versionName(53), 'Aardvark 3')
  assert.equal(new Set(Array.from({ length: 78 }, (_, i) => versionName(i + 1))).size, 78, 'no two deploys share a name')
})
test('this version is the one in src/version.json, a whole number from 1', () => {
  const { number, day, daily } = JSON.parse(readFileSync(new URL('../src/version.json', import.meta.url), 'utf8'))
  assert.ok(Number.isInteger(number) && number >= 1)
  assert.ok(Number.isInteger(daily) && daily >= 1, 'the day\'s count names the version')
  assert.match(day, /^\d{4}-\d{2}-\d{2}$/)
  assert.deepEqual(version, { number, day, name: versionName(daily) })
})
test('the name is on the opening screen and the Developer page', () => {
  for (const file of ['Splash.jsx', 'Developer.jsx']) {
    assert.match(readFileSync(new URL(`../src/screens/${file}`, import.meta.url), 'utf8'), /data-version[^>]*>Version \{version\.name\}/, file)
  }
})
