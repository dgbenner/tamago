// Playthrough audit spreadsheet (Dan, 2026-11-12): the every-lesson check, the browser pass and the word audit's
// early words, one row per issue (course, circle, round, lesson, question type, issue, severity, screenshot), plus a
// tab of questions run. Writes ~/Desktop/tamago-playthrough-audit.xlsx.
//   node scripts/audit/merge.mjs logic.json ui.json
import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import * as fs from 'node:fs'
import * as XLSX from 'xlsx/xlsx.mjs'
import { QUESTION_NAMES } from '../../src/lib/question-names.js'
XLSX.set_fs(fs)

const [logicFile, uiFile] = process.argv.slice(2)
const logic = JSON.parse(readFileSync(logicFile))
const ui = JSON.parse(readFileSync(uiFile))
const name = (t, course) => (QUESTION_NAMES[t] ? `${t} · ${QUESTION_NAMES[t].replace('{lang}', course)}` : t)
const rank = { critical: 0, high: 1, medium: 2, low: 3 }
const rows = logic.issues.map((i) => ({ course: i.course, circle: i.circle, round: i.round, lesson: i.lesson, 'question type': name(i.type, i.course), issue: `${i.issue}${i.count > 1 ? ` (seen in ${i.count} lessons)` : ''} [every-lesson check]`, severity: i.severity, screenshot: '' }))
const norm = (x) => x.replace(/"[^"]*"/g, '"…"').replace(/\(.*\)/, '').trim()
const groups = new Map()
for (const i of ui.issues) {
  const key = `${i.course}|${i.circle}|${i.type}|${norm(i.issue)}`
  const g = groups.get(key)
  if (g) { g.devices.add(i.device); g.n++; g.screenshot ||= i.screenshot; continue }
  groups.set(key, { ...i, devices: new Set([i.device]), n: 1 })
}
for (const i of groups.values()) rows.push({ course: i.course, circle: i.circle, round: i.round, lesson: i.lesson === '-' ? '-' : `${i.lesson}, question ${i.question}`, 'question type': name(i.type, i.course), issue: `${i.issue}${i.n > 2 ? ` (${i.n} times in this circle)` : ''} [WebKit ${[...i.devices].sort().join(' and ')}]`, severity: i.severity, screenshot: i.screenshot })
try {
  const wb0 = XLSX.readFile(`${homedir()}/Desktop/tamago-word-intro-audit.xlsx`)
  for (const course of ['French', 'Spanish', 'German']) for (const r of XLSX.utils.sheet_to_json(wb0.Sheets[course]).filter((x) => x.flagged === 'yes')) {
    rows.push({ course, circle: r.circle, round: r.round, lesson: r.lesson, 'question type': r.first_question_type, issue: `word "${r.word}" first appears here, before it's introduced: ${r.reason} [word audit]`, severity: 'medium', screenshot: '' })
  }
} catch { /* no word audit on the Desktop */ }
rows.sort((a, b) => rank[a.severity] - rank[b.severity] || a.course.localeCompare(b.course) || String(a.circle).localeCompare(String(b.circle)))
const cols = ['course', 'circle', 'round', 'lesson', 'question type', 'issue', 'severity', 'screenshot']
const wb = XLSX.utils.book_new()
const sh = XLSX.utils.json_to_sheet(rows.length ? rows : [{ course: '-', issue: 'No issues found.' }], { header: cols })
sh['!cols'] = [9, 22, 6, 22, 26, 90, 9, 44].map((wch) => ({ wch }))
XLSX.utils.book_append_sheet(wb, sh, 'Issues')
const ran = []
for (const [k, v] of Object.entries(ui.counts)) { const [course, device] = k.split('|'); ran.push({ pass: `WebKit ${device}`, course, lessons: v.lessons, questions: v.questions, ...v.byType }) }
for (const [course, v] of Object.entries(logic.stats)) ran.push({ pass: 'every-lesson check', course, lessons: v.lessons, questions: v.questions, ...v.byType })
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(ran), 'Questions run')
XLSX.writeFile(wb, `${homedir()}/Desktop/tamago-playthrough-audit.xlsx`)
const by = {}
for (const r of rows) { const k = `${r.course}|${r.severity}`; by[k] = (by[k] ?? 0) + 1 }
console.log(rows.length, 'rows', JSON.stringify(by))
