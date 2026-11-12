// Lines confusing by ear stay out of listening (Dan, 2026-11-12): every course's repeated-word lines are decided, and a
// line cut from listening is never a heard question nor listen-first.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { FINE_BY_EAR, NOT_BY_EAR, notByEar, repeatsAWord } from '../src/lib/by-ear.js'
import { supports } from '../src/lib/lesson.js'
import { QUESTION_NAMES, questionLabel } from '../src/lib/question-names.js'

const sentencesOf = (dir) => JSON.parse(readFileSync(new URL(`../src/${dir}/sentences.json`, import.meta.url), 'utf8'))

test('every repeated-word line in every course is decided: cut from listening, or fine by ear', () => {
  for (const dir of ['content', 'content-es', 'content-de']) {
    for (const s of sentencesOf(dir).filter((x) => repeatsAWord(x.french))) {
      assert.ok(NOT_BY_EAR.has(s.french) || FINE_BY_EAR.has(s.french), `${dir} ${s.sentence_id} "${s.french}" repeats a word: add it to NOT_BY_EAR or FINE_BY_EAR`)
    }
  }
  assert.ok(repeatsAWord('Non, non et non !') && repeatsAWord('No, no entiendo.') && !repeatsAWord('Je ne sais pas.'))
})

test('a line cut from listening is never heard first', () => {
  const s = { sentence_id: 'S0031', french: 'Non, non et non !' }
  assert.ok(notByEar(s))
  for (const t of ['QT04', 'QT07', 'QT10', 'QT11', 'QT13']) assert.equal(supports({ swBySentence: new Map() }, t, s, 3), false, t)
})

test('every question type has a short label', () => {
  for (const t of ['QT01', 'QT02', 'QT03', 'QT04', 'QT05', 'QT06', 'QT07', 'QT08', 'QT09', 'QT10', 'QT11', 'QT12', 'QT13', 'QT14', 'QT15', 'QT16', 'QT17', 'QT18']) assert.ok(QUESTION_NAMES[t], t)
  assert.equal(questionLabel('QT11', 'French'), 'QT11 · Type What You Hear')
  assert.equal(questionLabel('QT08', 'Spanish'), 'QT08 · Build in Spanish')
})
