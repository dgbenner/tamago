// Hints on any form of a taught verb (Dan, 2026-11-15, all courses), and the device voice's grade.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { formLemmas, hintPieces, verbFormHints } from '../src/lib/word-hints.js'

const load = (dir) => ({ words: JSON.parse(readFileSync(`src/${dir}/words.json`)), conjugations: JSON.parse(readFileSync(`src/${dir}/conjugations.json`)) })

test('a form of a taught verb that is not a course word shows the verb\'s hint', () => {
  const fr = load('content')
  const hints = verbFormHints(fr.words, fr.conjugations)
  assert.match(hints.get('gardez'), /^garder: to keep/)
  assert.match(hints.get('allons'), /^aller: to go$/)
  const pieces = hintPieces('Gardez votre billet.', fr.words, hints)
  assert.equal(pieces.map((p) => p.text).join(''), 'Gardez votre billet.')
  assert.match(pieces.find((p) => p.text === 'Gardez').hint, /^garder: /)
  assert.ok(pieces.find((p) => p.text === 'billet').hint)
})

test('a course word keeps its own hint, never the verb\'s', () => {
  const fr = load('content')
  const hints = verbFormHints(fr.words, fr.conjugations)
  for (const w of fr.words.filter((x) => x.status !== 'off')) assert.ok(!hints.has(w.form.toLowerCase()), w.form)
})

const ONE_FORM = new Set(['content-sv', 'content-da', 'content-no'])
test('every course gets verb-form hints, and the Glossary finds a verb by any form', () => {
  for (const dir of ['content', 'content-es', 'content-de', 'content-it', 'content-pt', 'content-nl', 'content-sv']) {
    const t = load(dir)
    // Swedish, Danish and Norwegian (2026-11-20): the present tense is one form for every person, so these courses
    // build no verb tables on purpose and their notes carry the pattern; they must stay empty rather than half-built.
    if (ONE_FORM.has(dir)) { assert.equal(t.conjugations.length, 0, `${dir}: no verb tables`); continue }
    assert.ok(verbFormHints(t.words, t.conjugations).size > 10, dir)
  }
  assert.equal(formLemmas(load('content').conjugations).get('gardez'), 'garder')
  assert.equal(formLemmas(load('content-es').conjugations).get('comemos'), 'comer')
})

test('device voices rank Premium, Enhanced, Natural, on the device, online', async () => {
  globalThis.window ??= globalThis
  globalThis.localStorage ??= { getItem: () => null, setItem: () => {}, removeItem: () => {} }
  const { voiceQuality } = await import('../src/lib/audio.js')
  const v = (name, voiceURI, localService) => ({ name, voiceURI, localService })
  const ranked = [v('Thomas', 'com.apple.voice.compact.fr-FR.Thomas', true), v('Amélie (Enhanced)', 'com.apple.voice.enhanced.fr-CA.Amelie', true), v('Google français', 'Google français', false),
    v('Microsoft Denise Online (Natural) - French (France)', 'x', false), v('Audrey (Premium)', 'com.apple.voice.premium.fr-FR.Audrey', true)].sort((a, b) => voiceQuality(b) - voiceQuality(a)).map((x) => x.name)
  assert.deepEqual(ranked, ['Audrey (Premium)', 'Amélie (Enhanced)', 'Microsoft Denise Online (Natural) - French (France)', 'Thomas', 'Google français'])
})
