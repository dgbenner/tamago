// The final A1 checkpoint (Dan, 2026-11-10): one per course, after its last unit, modeled on the format of that
// language's A1 exam (DELF A1, DELE A1, Goethe-Zertifikat A1: Start Deutsch 1): four parts, listening, reading,
// writing and speaking, in the exams' order. Every question is built from the course's own sentences; nothing is
// taken from exam papers. Listening, reading and writing are scored; speaking is practice and never graded (R14).
import { shuffle } from './lesson.js'

export const EXAMS = {
  fr: { name: 'DELF A1', body: 'France Éducation international', samples: 'https://www.france-education-international.fr/diplome/delf-tout-public/niveau-a1/exemples-sujets' },
  es: { name: 'DELE A1', body: 'Instituto Cervantes', samples: 'https://cervantes.org/es/examenes/dele' },
  de: { name: 'Goethe-Zertifikat A1: Start Deutsch 1', body: 'Goethe-Institut', samples: 'https://www.goethe.de/de/spr/prf/ueb/pa1.html' },
}

export const PARTS = [
  { id: 'listening', label: 'Listening', items: [['QT04', 2, 3], ['QT11', 4, 3]] },
  { id: 'reading', label: 'Reading', items: [['QT03', 2, 3], ['QT06', 3, 3]] },
  { id: 'writing', label: 'Writing', items: [['QT08', 3, 2], ['QT12', 4, 4]] },
  { id: 'speaking', label: 'Speaking', items: [['QT13', 5, 3]] },
]
export const PART_LABEL = Object.fromEntries(PARTS.map((p) => [p.id, p.label]))

// The questions: sentences spread across every unit (round robin over the units, each sentence once), each part's
// types in turn. Topic packs stay out: the check is for the A1 units everyone takes.
export function finalItems(c, unitIds, rng = Math.random) {
  const byUnit = unitIds.map((u) => shuffle(c.sentences.filter((s) => s.unit_id === u), rng))
  const used = new Set()
  let k = Math.floor(rng() * unitIds.length)
  const next = () => {
    for (let tries = 0; tries < unitIds.length * 40; tries++) {
      const list = byUnit[k++ % byUnit.length]
      const s = list.find((x) => !used.has(x.sentence_id))
      if (s) { used.add(s.sentence_id); return s }
    }
    return null
  }
  return PARTS.flatMap((p) => p.items.flatMap(([type, round, count]) => Array.from({ length: count }, () => next()).filter(Boolean)
    .map((s) => ({ sentence_id: s.sentence_id, type, round, unit_id: s.unit_id, part: p.id }))))
}

// Scores per part from the first attempts recorded in the session (results: [{ part, correct, speaking }]).
export function finalScores(results = []) {
  return Object.fromEntries(PARTS.map((p) => {
    const rows = results.filter((r) => r.part === p.id)
    return [p.id, p.id === 'speaking' ? { done: rows.length } : { right: rows.filter((r) => r.correct).length, total: rows.length }]
  }))
}
export const finalLine = (scores) => PARTS.map((p) => (p.id === 'speaking' ? `Speaking practised (${scores.speaking?.done ?? 0}, not graded)` : `${p.label} ${scores[p.id]?.right ?? 0} of ${scores[p.id]?.total ?? 0}`)).join(' · ')
