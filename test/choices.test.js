// Choices and word order (Dan, 2026-11-13, from the playthrough and word audits), across all three courses, so new
// content can't bring the problems back:
//   - no two choices that read the same, even with different punctuation or a contraction ("You're" / "You are")
//   - no wrong choice that is also an accepted answer
//   - no two choices, and no wrong chip and a needed one, one accent apart (ou/où, a/à, la/là; Portuguese tem/têm),
//     since lenient checking takes either for the other (Dan, 2026-11-14)
//   - no picture, and no meaning, twice in one picture question
//   - Match Pairs never shows a cognate (sandwich = sandwich) and never two pairs with the same meaning
//   - a lesson brings at most 4 new words, each first met where its meaning is shown (Match Pairs, Pick the Picture,
//     Pick the Meaning), never by ear, in a blank, a build or a typing question
// The per-course sweeps run from test/choices-<course>.test.js (test/lib/choices-shared.mjs); this file keeps the
// forced cases.
import test from 'node:test'
import assert from 'node:assert/strict'
import { buildLesson, contentForUnit } from '../src/lib/lesson.js'
import { accentKey } from '../src/lib/check.js'
import { checkQuestion, loadCourse, seeded, treeOrder } from './lib/choices-shared.mjs'

const COURSES = ['content', 'content-it', 'content-pt'].map((dir) => ({ dir, t: loadCourse(dir) }))

// Forced case (Dan, 2026-11-14): with a/à, ou/où and la/là as contrast sets, the engine's favourite source of wrong
// blank choices and chips, every French circle still never offers two forms one accent apart.
test('accent pairs are never offered side by side, even as contrast sets', () => {
  assert.equal(accentKey('où', 'fr'), accentKey('ou', 'fr'))
  assert.equal(accentKey('têm', 'pt'), accentKey('tem', 'pt'))
  assert.notEqual(accentKey('ou', 'fr'), accentKey('on', 'fr'))
  const { t } = COURSES[0]
  const all = new Set(t.words.map((w) => w.word_id))
  let blanks = 0
  for (const u of treeOrder(t)) {
    const c = contentForUnit(t, u.unit_id)
    for (const [x, y] of [['a', 'à'], ['ou', 'où'], ['la', 'là']]) { c.contrast.set(x, [y]); c.contrast.set(y, [x]) }
    for (let round = 1; round <= 5; round++) {
      for (const q of buildLesson(c, { round, known: all, unit_id: u.unit_id, rng: seeded(round * 7) }).queue) { checkQuestion(q, c, `forced ${u.unit_id} R${round}`); if (q.type === 'QT05') blanks++ }
    }
  }
  assert.ok(blanks > 50, `only ${blanks} blanks built`)
})

// Dan, 2026-11-16: da and dà must never appear in the same choice set. Match Pairs and picture labels hold it too.
test('Italian da and dà never share a board or a set of pictures', async () => {
  const { makeMatchPairs } = await import('../src/lib/lesson.js')
  const { t } = COURSES.find((x) => x.dir === 'content-it')
  const da = t.words.find((w) => w.form === 'da'), dà = t.words.find((w) => w.form === 'dà')
  assert.ok(da && dà, 'the Italian course teaches both da and dà')
  const c = contentForUnit(t, dà.first_unit)
  const others = t.words.filter((w) => w.hint && !['da', 'dà'].includes(w.form)).slice(0, 3)
  const q = makeMatchPairs(c, [da, dà, ...others], 1, seeded(3))
  const keys = q.pairs.map((p) => accentKey(p.form, 'fr'))
  assert.equal(new Set(keys).size, keys.length, `board ${q.pairs.map((p) => p.form)}`)
  assert.ok(q.pairs.length >= 4)
})

// Dan, 2026-11-19 (Fable's Portuguese review): the pairs one accent apart never share a board or a set of pictures.
test('Portuguese dá and da, avô and avó, pais and país, porquê and porque never share a board', async () => {
  const { makeMatchPairs } = await import('../src/lib/lesson.js')
  const { t } = COURSES.find((x) => x.dir === 'content-pt')
  for (const [a, b] of [['dá', 'da'], ['avô', 'avó'], ['pais', 'país'], ['porquê', 'porque']]) {
    const wa = t.words.find((w) => w.form === a), wb = t.words.find((w) => w.form === b)
    assert.ok(wa && wb, `the Portuguese course teaches ${a} and ${b}`)
    const c = contentForUnit(t, wa.first_unit)
    const others = t.words.filter((w) => w.hint && ![a, b].includes(w.form)).slice(0, 3)
    const q = makeMatchPairs(c, [wa, wb, ...others], 1, seeded(5))
    const keys = q.pairs.map((p) => accentKey(p.form, 'fr'))
    assert.equal(new Set(keys).size, keys.length, `board ${q.pairs.map((p) => p.form)}`)
  }
})
