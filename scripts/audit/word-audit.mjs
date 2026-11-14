// Word introduction audit (Dan, 2026-11-12): for every lesson of every circle, each new word and the question type
// where the learner first sees it; flagged when that isn't a question that shows its meaning (Match Pairs, Pick the
// Picture, Pick the Meaning) unless the word reads the same as its meaning; lessons with more than 4 new words; and the
// reading / listening / writing / speaking share per round, scored as the app scores them (listen-first questions are
// listening). Writes ~/Desktop/tamago-word-intro-audit.xlsx and prints a JSON summary.
//   node scripts/audit/word-audit.mjs
import { homedir } from 'node:os'
import * as fs from 'node:fs'
import * as XLSX from 'xlsx/xlsx.mjs'
import { isCognate } from '../../src/lib/lesson.js'
import { QUESTION_NAMES } from '../../src/lib/question-names.js'
import { COURSES, tablesOf, walk } from './walk.mjs'
XLSX.set_fs(fs)

const OK = new Set(['QT01', 'QT02', 'QT03'])
const REASON = {
  QT04: 'listening: heard before it is ever seen', QT05: 'Fill the Blank', QT06: 'build question (English from the sentence)',
  QT07: 'listening + build', QT08: 'build question: built from English, never seen', QT09: 'build question (Answer the Question)',
  QT10: 'speaking question, meaning not shown', QT11: 'listening + typing', QT12: 'typing question: typed from English, never seen',
  QT13: 'speaking question, meaning not shown', QT18: 'typing question: typed from its English meaning',
}
const SKILLS = ['reading', 'listening', 'writing', 'speaking']
const words = {}, shares = [], summary = {}
for (const [course, dir] of COURSES) {
  const t = tablesOf(dir)
  const rows = [], share = {}, over = []
  let lessons = 0
  walk(t, (q, { u, c, round, lesson, newHere }) => {
    const listenFirst = (q.type === 'QT03' || q.type === 'QT06') && newHere.length === 0 && !q.notByEar && q.listenFirst !== false
    const skill = listenFirst ? 'listening' : q.skill
    share[round] ??= Object.fromEntries(SKILLS.map((k) => [k, 0]))
    if (skill in share[round]) share[round][skill]++
    for (const id of newHere) {
      const w = c.wordById.get(id)
      const cognate = w && isCognate(w)
      const flagged = !w || (!OK.has(q.type) && !cognate)
      let reason = !w ? 'not in the word list, but in a live sentence' : flagged ? REASON[q.type] ?? `first seen in ${q.type}` : cognate && !OK.has(q.type) ? `cognate, reads the same as its meaning; first in ${q.type}` : ''
      if (w && w.first_unit !== u.unit_id && flagged) reason += `; belongs to ${t.units.find((x) => x.unit_id === w.first_unit)?.title ?? w.first_unit}`
      const surface = (q.segments ?? []).find((s) => s.word_id === id)?.text
      rows.push({ course, circle: u.title, round, lesson, word: w?.form ?? `${surface ?? id} (${id})`, first_question_type: `${q.type} · ${(QUESTION_NAMES[q.type] ?? q.type).replace('{lang}', course)}`, flagged: flagged ? 'yes' : 'no', reason })
    }
  }, ({ u, round, lesson, fresh }) => { lessons++; if (fresh > 4) over.push(`${u.title} R${round} L${lesson}: ${fresh}`) })
  words[course] = rows
  for (const [r, s] of Object.entries(share)) { const tot = SKILLS.reduce((a, k) => a + s[k], 0); shares.push({ course, round: Number(r), ...Object.fromEntries(SKILLS.map((k) => [k, `${Math.round((100 * s[k]) / tot)}%`])), questions: tot }) }
  summary[course] = {
    circles: new Set(rows.map((r) => r.circle)).size, lessons, words: rows.length, early: rows.filter((r) => r.flagged === 'yes').length, over4: over.length, overList: over,
    cognatesNotOnBoard: rows.filter((r) => r.reason.startsWith('cognate')).length,
    flagged: rows.filter((r) => r.flagged === 'yes').map((r) => `${r.circle} R${r.round} L${r.lesson} ${r.word} (${r.first_question_type.split(' ')[0]}) ${r.reason}`),
  }
}
const wb = XLSX.utils.book_new()
const cols = ['course', 'circle', 'round', 'lesson', 'word', 'first_question_type', 'flagged', 'reason']
for (const [course, rows] of Object.entries(words)) {
  const sh = XLSX.utils.json_to_sheet(rows, { header: cols })
  sh['!cols'] = [10, 22, 7, 7, 18, 30, 8, 60].map((wch) => ({ wch }))
  XLSX.utils.book_append_sheet(wb, sh, course)
}
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(shares, { header: ['course', 'round', 'reading', 'listening', 'writing', 'speaking', 'questions'] }), 'Round shares')
XLSX.writeFile(wb, `${homedir()}/Desktop/tamago-word-intro-audit.xlsx`)
console.log(JSON.stringify({ summary, shares }, null, 1))
