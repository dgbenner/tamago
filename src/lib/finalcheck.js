// The final A1 checkpoint (Dan, 2026-11-10): one per course, after its last unit, modeled on the format of that
// language's A1 exam (DELF A1, DELE A1, Goethe-Zertifikat A1: Start Deutsch 1): four parts, listening, reading,
// writing and speaking, in the exams' order. Every question is built from the course's own sentences; nothing is
// taken from exam papers. Listening, reading and writing are scored; speaking is practice and never graded (R14).
import { shuffle } from './lesson.js'

// official: the body's page for the exam; about (and note): plain facts for Ready for the Real Exam? (Dan, 2026-11-15).
export const EXAMS = {
  fr: { name: 'DELF A1', body: 'France Éducation international', official: 'https://www.france-education-international.fr/diplome/delf-tout-public',
    about: 'The DELF A1 is the first level of the DELF, the French diplomas of France\'s Ministry of Education, set by France Éducation international. It has four papers: listening, reading, writing and speaking.',
    samples: 'https://www.france-education-international.fr/diplome/delf-tout-public/niveau-a1/exemples-sujets',
    format: 'Numbers, prices and short lines to listen to; a notice, a message, a timetable and a menu to read; a form and a short message to write; then speaking.' },
  es: { name: 'DELE A1', body: 'Instituto Cervantes', official: 'https://examenes.cervantes.es/es/dele/que-es',
    about: 'The DELE A1 is the first level of the DELE, the official Spanish diplomas the Instituto Cervantes awards for Spain\'s Ministry of Education. It has four tests: reading, listening, writing and speaking.',
    samples: 'https://cervantes.org/es/examenes/dele',
    format: 'A message, a notice, an ad and a menu or timetable to read; numbers, prices and short lines to listen to; a form and a short message to write; then speaking.' },
  de: { name: 'Goethe-Zertifikat A1: Start Deutsch 1', body: 'Goethe-Institut', official: 'https://www.goethe.de/en/spr/prf/gzsd1.html',
    about: 'Goethe-Zertifikat A1: Start Deutsch 1 is the Goethe-Institut\'s exam for the first level of German. It has four parts: listening, reading, writing and speaking.',
    samples: 'https://www.goethe.de/de/spr/prf/ueb/pa1.html',
    format: 'Numbers, times, prices and announcements to listen to; messages, notices and signs to read; a form and a short message to write; then speaking, ending with spelling your name and saying a number.' },
  // Italian (2026-11-14): CELI Impatto, from the Profilo's own centre; exam and link for Dan to confirm.
  it: { name: 'CELI Impatto (A1)', body: 'Università per Stranieri di Perugia', official: 'https://www.cvcl.it',
    about: 'CELI Impatto is the A1 exam of the CVCL, the language certification centre of the Università per Stranieri di Perugia.',
    samples: 'https://www.cvcl.it' },
  // Brazilian Portuguese (2026-11-14): Brazil's own exam, Celpe-Bras, has no A1; ACESSO is the A1 exam for Portuguese
  // (European). Exam and link for Dan to confirm.
  pt: { name: 'ACESSO (A1)', body: 'CAPLE, Universidade de Lisboa', official: 'https://caple.letras.ulisboa.pt',
    about: 'ACESSO is the A1 exam of CAPLE, the Portuguese certification centre of the Universidade de Lisboa.',
    note: 'ACESSO is set in European Portuguese; Brazil\'s own exam, Celpe-Bras, has no A1 level. This course teaches Brazilian Portuguese.',
    samples: 'https://caple.letras.ulisboa.pt' },
}

export const PARTS = [
  { id: 'listening', label: 'Listening', items: [['QT04', 2, 3], ['QT11', 4, 3]] },
  { id: 'reading', label: 'Reading', items: [['QT03', 2, 3], ['QT06', 3, 3]] },
  { id: 'writing', label: 'Writing', items: [['QT08', 3, 2], ['QT12', 4, 4]] },
  { id: 'speaking', label: 'Speaking', items: [['QT13', 5, 3]] },
]
// French is a mock DELF A1 (Dan, 2026-11-15; at the end of Part 6, the last part, while each part before it ends with
// a short part review): the exam's four papers in its order, each with the kind of task the paper sets. Listening:
// numbers, prices and times heard (DELF's announcements and messages), then short lines. Reading: four short texts of
// different kinds (a notice or sign, a message, a timetable, a menu), as DELF's four reading exercises, then lines.
// Writing: a form (DELF exercise 1) and a short message (exercise 2, not scored: Claude's notes when on), then two
// typed lines. Speaking (introducing yourself, asking and answering, a little role play): never graded. A1 task items
// (QT14 to QT17) come from the course's own a1_* tables, from every unit given.
export const FORMATS = {
  fr: [
    { id: 'listening', label: 'Listening', paper: "Compréhension de l'oral", items: [['QT17', 3, 4], ['QT04', 2, 3], ['QT11', 4, 2]] },
    { id: 'reading', label: 'Reading', paper: 'Compréhension des écrits', items: [['QT14', 3, 4], ['QT03', 2, 2]] },
    { id: 'writing', label: 'Writing', paper: 'Production écrite', items: [['QT15', 4, 1], ['QT16', 5, 1], ['QT12', 4, 2]] },
    { id: 'speaking', label: 'Speaking', paper: 'Production orale', items: [['QT13', 5, 3]] },
  ],
  // Spanish is a mock DELE A1 (Dan, 2026-11-15; at the end of Part 4, the last part): reading comes first, as in DELE.
  es: [
    { id: 'reading', label: 'Reading', paper: 'Comprensión de lectura', items: [['QT14', 3, 4], ['QT03', 2, 2]] },
    { id: 'listening', label: 'Listening', paper: 'Comprensión auditiva', items: [['QT04', 2, 3], ['QT17', 3, 4], ['QT11', 4, 2]] },
    { id: 'writing', label: 'Writing', paper: 'Expresión e interacción escritas', items: [['QT15', 4, 1], ['QT16', 5, 1], ['QT12', 4, 2]] },
    { id: 'speaking', label: 'Speaking', paper: 'Expresión e interacción orales', items: [['QT13', 5, 3]] },
  ],
  // German is a mock Goethe-Zertifikat A1: Start Deutsch 1 (Dan, 2026-11-15; end of Part 4). Schreiben is exactly a
  // form and a short message. Sprechen ends as the exam's Teil 1 does: spelling your name, then saying a number.
  de: [
    { id: 'listening', label: 'Listening', paper: 'Hören', items: [['QT17', 3, 4], ['QT04', 2, 4], ['QT11', 4, 2]] },
    { id: 'reading', label: 'Reading', paper: 'Lesen', items: [['QT14', 3, 5], ['QT03', 2, 2]] },
    { id: 'writing', label: 'Writing', paper: 'Schreiben', items: [['QT15', 4, 1], ['QT16', 5, 1]] },
    { id: 'speaking', label: 'Speaking', paper: 'Sprechen', items: [['QT13', 5, 3], ['SPELL', 5, 1], ['SAY_NUMBER', 5, 1]] },
  ],
}
// Speaking prompts with no sentence behind them, never graded: a model answer shows after Done.
export const SPELL_PROMPT = {
  de: { task: 'Buchstabieren Sie Ihren Namen.', english: 'Spell your name aloud, letter by letter', model: 'Müller: M, Ü, L, L, E, R.' },
}
export const partsFor = (courseId) => FORMATS[courseId] ?? PARTS
export const PART_LABEL = Object.fromEntries(PARTS.map((p) => [p.id, p.label]))
const A1_TABLE = { QT14: 'a1_texts', QT15: 'a1_forms', QT16: 'a1_prompts', QT17: 'a1_listen' }

// The questions: sentences spread across every unit (round robin over the units, each sentence once), each part's
// types in turn. Topic packs stay out: the check is for the A1 units everyone takes. A1 task items are spread the
// same way, Read and Answer texts one of each kind first.
export function finalItems(c, unitIds, rng = Math.random, courseId = '') {
  const inUnits = new Set(unitIds)
  const usedItems = new Set()
  const taskItems = (type, count) => {
    const pool = shuffle((c[A1_TABLE[type]] ?? []).filter((x) => inUnits.has(x.unit_id)), rng)
    const out = []
    const kinds = new Set()
    for (const pass of [0, 1]) for (const x of pool) {
      if (out.length >= count || usedItems.has(x.id)) continue
      if (pass === 0 && type === 'QT14' && kinds.has(x.kind)) continue
      if (pass === 0 && out.some((o) => o.unit_id === x.unit_id)) continue
      usedItems.add(x.id); kinds.add(x.kind); out.push(x)
    }
    return out
  }
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
  const last = unitIds.at(-1) ?? null
  const prompt = (type, round, part) => {
    if (type === 'SPELL' && SPELL_PROMPT[courseId]) {
      const sp = SPELL_PROMPT[courseId]
      return [{ prompt: { kind: 'spell', id: 'spell', english: `${sp.english}: ${sp.task}`, model: sp.model }, type: 'QT13', round, unit_id: last, part }]
    }
    if (type === 'SAY_NUMBER') {
      const n = shuffle((c.a1_listen ?? []).filter((x) => x.kind === 'number' && inUnits.has(x.unit_id)), rng)[0]
      return n ? [{ prompt: { kind: 'number', id: n.id, english: `Say this number: ${n.answer}`, model: n.say }, type: 'QT13', round, unit_id: n.unit_id, part }] : []
    }
    return []
  }
  return partsFor(courseId).flatMap((p) => p.items.flatMap(([type, round, count]) => (type === 'SPELL' || type === 'SAY_NUMBER') ? prompt(type, round, p.id) : A1_TABLE[type]
    ? taskItems(type, count).map((x) => ({ a1: x, type, round, unit_id: x.unit_id, part: p.id }))
    : Array.from({ length: count }, () => next()).filter(Boolean).map((s) => ({ sentence_id: s.sentence_id, type, round, unit_id: s.unit_id, part: p.id }))))
}

// Scores per part from the first attempts recorded in the session (results: [{ part, correct, speaking, ungraded }]).
// A message written (QT16) is counted as written, outside the score.
export function finalScores(results = []) {
  return Object.fromEntries(PARTS.map((p) => {
    const rows = results.filter((r) => r.part === p.id)
    const graded = rows.filter((r) => !r.ungraded)
    const written = rows.length - graded.length
    return [p.id, p.id === 'speaking' ? { done: rows.length } : { right: graded.filter((r) => r.correct).length, total: graded.length, ...(written ? { written } : {}) }]
  }))
}
export const finalLine = (scores) => PARTS.map((p) => (p.id === 'speaking' ? `Speaking practised (${scores.speaking?.done ?? 0}, not graded)` : `${p.label} ${scores[p.id]?.right ?? 0} of ${scores[p.id]?.total ?? 0}${scores[p.id]?.written ? ', message written' : ''}`)).join(' · ')
