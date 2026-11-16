// Typo guard (Dan, 2026-11-16): never accept a typo if the typed word is another word the course teaches, wherever in
// the course that word is taught. A lesson checks against the whole course's words, not only its own circle's.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { contentForUnit } from '../src/lib/lesson.js'
import { checkTyped, distance, normalize } from '../src/lib/check.js'

const t = {}
for (const f of readdirSync('src/content')) t[f.replace('.json', '')] = JSON.parse(readFileSync(`src/content/${f}`))

test('a circle checks typos against every word the course teaches', () => {
  const first = t.units.filter((u) => String(u.status).startsWith('live')).sort((a, b) => a.order - b.order)[0]
  const c = contentForUnit(t, first.unit_id)
  const missing = t.words.filter((w) => !String(w.status).startsWith('off')).map((w) => normalize(w.form, 'fr')).filter((f) => !f.split(' ').every((x) => c.vocabulary.fr.has(x)))
  assert.deepEqual(missing.slice(0, 5), [], 'course words missing from the first circle\'s vocabulary')
})

test('a slip that spells a word from a later circle is wrong, and the right answer is kept', () => {
  const first = t.units.filter((u) => String(u.status).startsWith('live')).sort((a, b) => a.order - b.order)[0]
  const c = contentForUnit(t, first.unit_id)
  const here = new Set(t.words.filter((w) => w.first_unit === first.unit_id).map((w) => normalize(w.form, 'fr')))
  const later = t.words.map((w) => normalize(w.form, 'fr')).filter((f) => !here.has(f) && !f.includes(' '))
  // A sentence of this circle with a word one letter from a course word taught elsewhere.
  let found = null
  for (const s of c.sentences) {
    const words = normalize(s.french, 'fr').split(' ')
    for (const [i, w] of words.entries()) {
      if (w.length < 3) continue
      const other = later.find((x) => x !== w && distance(w, x) === 1)
      if (other) { found = { s, typed: words.map((x, j) => (j === i ? other : x)).join(' '), other }; break }
    }
    if (found) break
  }
  assert.ok(found, 'no sentence in the first circle has a near-twin word elsewhere in the course')
  const r = checkTyped(found.typed, [found.s.french], { lang: 'fr', vocabulary: c.vocabulary.fr })
  assert.equal(r.correct, false, `"${found.typed}" (${found.other}) was accepted for "${found.s.french}"`)
  assert.equal(r.matched, found.s.french, 'the right answer is shown')
})

// Accent guard on the real course (Dan, 2026-11-16): a sentence with à, typed with a, is wrong in its own circle.
test('a for à in a real course sentence is wrong, with the right answer', () => {
  const s = t.sentences.find((x) => / à /.test(` ${normalize(x.french, 'fr')} `) && t.units.find((u) => u.unit_id === x.unit_id && String(u.status).startsWith('live')))
  assert.ok(s, 'a live sentence with à')
  const c = contentForUnit(t, s.unit_id)
  const typed = normalize(s.french, 'fr').replace(/(^| )à( |$)/, '$1a$2')
  const r = checkTyped(typed, [s.french], { lang: 'fr', vocabulary: c.vocabulary.fr })
  assert.equal(r.correct, false, `"${typed}" was accepted for "${s.french}"`)
  assert.equal(r.matched, s.french)
})
