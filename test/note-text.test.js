// Grammar notes and circle overviews: the target language is bold and carries its language, English is regular weight
// (Dan, 2026-11-16; src/lib/note-text.js, src/screens/NoteText.jsx).
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { noteProblems, parseNote, plainNote } from '../src/lib/note-text.js'

const table = (dir, name) => JSON.parse(readFileSync(new URL(`../src/${dir}/${name}.json`, import.meta.url), 'utf8'))
const COURSES = ['content', 'content-es', 'content-de', 'content-it', 'content-pt', 'content-nl', 'content-no', 'content-da', 'content-sv']

test('a note parses into paragraphs, lines and runs; only marked runs are the target language', () => {
  const note = "To ask someone's name:\n**Comment tu t'appelles ?** (to a friend)\n**Vous vous appelez comment ?** (polite)\n\n**Je m'appelle** means my name is."
  const paras = parseNote(note)
  assert.equal(paras.length, 2)
  assert.equal(paras[0].length, 3)
  assert.deepEqual(paras[0][1], [{ text: "Comment tu t'appelles ?", tl: true }, { text: ' (to a friend)', tl: false }])
  assert.deepEqual(paras[1][0], [{ text: "Je m'appelle", tl: true }, { text: ' means my name is.', tl: false }])
  assert.equal(plainNote('**Hola**, which means hello.'), 'Hola, which means hello.')
  assert.deepEqual(parseNote(''), [])
  assert.deepEqual(parseNote('Plain English.'), [[[{ text: 'Plain English.', tl: false }]]])
})

test('a badly marked note is caught', () => {
  assert.deepEqual(noteProblems('**Hola** means hello.'), [])
  assert.ok(noteProblems('**Hola means hello.').length)
  assert.ok(noteProblems('**Hola\namigo** means hello.').length)
  assert.ok(noteProblems('**** means hello.').length)
  assert.ok(noteProblems('*Hola* means hello.').length)
  assert.ok(noteProblems('Hola means hello.\n').length)
})

test('every grammar note and overview line in every course is well marked, and every note marks its target language', () => {
  for (const dir of COURSES) {
    for (const n of table(dir, 'grammar_notes')) {
      assert.deepEqual(noteProblems(n.rule), [], `${dir} ${n.unit_id} note`)
      assert.ok(parseNote(n.rule).flat(2).some((r) => r.tl), `${dir} ${n.unit_id}: the note has no target-language run`)
    }
    for (const u of table(dir, 'units')) {
      assert.deepEqual(noteProblems(u.grammar_point ?? ''), [], `${dir} ${u.unit_id} overview`)
      assert.ok(!String(u.grammar_point ?? '').includes('\n'), `${dir} ${u.unit_id}: the overview line is one line`)
    }
  }
})

test('the note and the overview are drawn through NoteText, which sets the language on bold runs', () => {
  const src = (f) => readFileSync(new URL(`../src/screens/${f}`, import.meta.url), 'utf8')
  assert.match(readFileSync(new URL('../src/components/NoteText.jsx', import.meta.url), 'utf8'), /<strong key=\{i\} lang=\{TL\}/)
  assert.equal(src('GrammarNote.jsx').match(/<NoteText text=\{note\.rule\}/g).length, 2)
  assert.equal(src('Home.jsx').match(/<NoteText inline text=\{unit\.grammar_point\}/g).length, 3)
  assert.ok(!/\{note\.rule\}<|\{unit\.grammar_point\}</.test(src('GrammarNote.jsx') + src('Home.jsx')))
})
