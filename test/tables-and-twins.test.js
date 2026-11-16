// Three fixes, all courses (Dan, 2026-11-15): the French -eler and -eter tables read from the verb's own page (appelle,
// not the 1990 appèle); Type the Word accepts the Spain twin of a Mexican word, from the one regional list; reflexive
// verbs show their tables with the pronouns (me lavo, te lavas, se lava).
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { indexContent, makeTypeWord } from '../src/lib/lesson.js'
import { checkTyped } from '../src/lib/check.js'
import { REGIONAL, twinsOf } from '../src/lib/regional.js'
import { tableFor } from '../src/lib/word-hints.js'

const load = (dir) => Object.fromEntries(readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => [f.replace('.json', ''), JSON.parse(readFileSync(`${dir}/${f}`))]))
const fr = load('src/content')
const es = load('src/content-es')
const table = (t, lemma) => t.conjugations.find((x) => x.lemma === lemma)?.present?.map((r) => r.form)

test('French appeler takes the double l, as rappeler and jeter do; épeler gives both spellings, double l first', () => {
  assert.deepEqual(table(fr, 'appeler'), ['appelle', 'appelles', 'appelle', 'appelons', 'appelez', 'appellent'])
  // The doubling verbs the course has (répéter's répète is an accent, not a doubled consonant, and is right).
  for (const t of fr.conjugations.filter((x) => ['appeler', 'rappeler', 'jeter', 'épeler'].includes(x.lemma) && x.present)) {
    for (const r of t.present) assert.doesNotMatch(r.form.split(' or ')[0], /è(l|t)e/, `${t.lemma}: ${r.form}`)
  }
  // The Glossary shows appelle and appelles their table again.
  for (const f of ['appelle', 'appelles']) { const w = fr.words.find((x) => x.form === f); if (w) assert.ok(tableFor(w, fr.conjugations), f) }
})

test('Spanish reflexive verbs show their tables with the pronouns, bañarse included', () => {
  assert.deepEqual(table(es, 'lavarse'), ['me lavo', 'te lavas', 'se lava', 'nos lavamos', 'se lavan'])
  assert.deepEqual(table(es, 'bañarse'), ['me baño', 'te bañas', 'se baña', 'nos bañamos', 'se bañan'])
  for (const w of es.words.filter((x) => /rse$/.test(x.lemma) && x.part_of_speech === 'Verb')) {
    const t = tableFor(w, es.conjugations)
    assert.ok(t, `${w.form} has a table`)
    assert.ok(t.present.every((r, i) => r.form.startsWith(['me ', 'te ', 'se ', 'nos ', 'se '][i])), w.form)
  }
  const notes = Object.fromEntries(es.grammar_notes.map((n) => [n.unit_id, n.conjugations.map((c) => c.lemma)]))
  assert.deepEqual(notes.U92, ['lavarse', 'bañarse'])
  assert.deepEqual(notes.U41, ['llamarse'])
})

test('Type the Word accepts the Spain twin (coche for carro), with or without an article, from the one regional list', () => {
  const all = indexContent(es)
  const word = (f) => es.words.find((w) => w.form === f)
  const q = makeTypeWord(all, word('carro'), 3, Math.random)
  for (const typed of ['carro', 'coche', 'el coche', 'un coche']) assert.ok(checkTyped(typed, q.accepted, { lang: 'fr', vocabulary: new Set(), word: true }).correct, typed)
  assert.ok(!checkTyped('auto', q.accepted, { lang: 'fr', vocabulary: new Set(), word: true }).correct)
  assert.deepEqual(twinsOf('es', 'maneja'), ['conduce'], 'same form: drives, not to drive')
  // Every course form in the list is a Spanish course word; French has no twins.
  for (const [m] of REGIONAL.es) assert.ok(word(m), m)
  assert.deepEqual(makeTypeWord(indexContent(fr), fr.words.find((w) => w.form === 'chat') ?? fr.words[0], 3, Math.random).accepted.filter((a) => /coche/.test(a)), [])
  assert.match(readFileSync('scripts/a1-coverage.mjs', 'utf8'), /src\/lib\/regional\.js/, 'coverage reads the same list')
})
