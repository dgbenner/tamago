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
    samples: 'https://www.cvcl.it',
    format: 'Short texts to read and a form and a message to write (the written paper); then numbers and short lines to listen to, and speaking (the oral paper).' },
  // Brazilian Portuguese (2026-11-14): Brazil's own exam, Celpe-Bras, has no A1; ACESSO is the A1 exam for Portuguese
  // (European). Exam and link for Dan to confirm.
  pt: { name: 'ACESSO (A1)', body: 'CAPLE, Universidade de Lisboa', official: 'https://caple.letras.ulisboa.pt',
    about: 'ACESSO is the A1 exam of CAPLE, the Portuguese certification centre of the Universidade de Lisboa.',
    note: 'ACESSO is set in European Portuguese; Brazil\'s own exam, Celpe-Bras, has no A1 level. This course teaches Brazilian Portuguese.',
    samples: 'https://caple.letras.ulisboa.pt',
    format: 'Short texts to read and a form and a short message to write; then numbers, prices and short lines to listen to; then speaking.' },
  // Dutch (2026-11-20): no general A1 exam like DELF or Goethe exists for Dutch (CNaVT starts at A2); the A1 exam is the
  // Basic Civic Integration Exam Abroad (Dutch government, set at A1). Exam and link for Dan to confirm.
  nl: { name: 'Basic Civic Integration Exam Abroad (A1)', body: 'Dutch government (inburgeren.nl)', official: 'https://www.inburgeren.nl/en/civic-integration-abroad/',
    about: 'The Basic Civic Integration Exam Abroad is the Dutch government\'s exam at A1, taken before moving to the Netherlands. It tests speaking and reading Dutch, with a separate part on Dutch society.',
    note: 'There is no general A1 Dutch exam for everyone; the CNaVT exams start at A2. This course practises the language parts only.',
    samples: 'https://www.inburgeren.nl/en/civic-integration-abroad/',
    format: 'Short texts to read first; then spoken Dutch, heard and answered; a little writing as practice, since the exam has none.' },
  // Swedish (2026-11-21, the full A1 run): Swedex, Folkuniversitetet's exam. Its current levels start at A2 (the combined
  // A2/B1 test); no Swedish exam is set at A1, so the note says so, as Portuguese's does for ACESSO.
  sv: { name: 'Swedex', body: 'Folkuniversitetet', official: 'https://www.folkuniversitetet.se/in-english/swedex-swedish-examinations/about-swedex/',
    about: 'Swedex is the Swedish language exam of Folkuniversitetet, with four modules: reading, listening, a written part and a spoken part.',
    note: 'Swedex starts at A2, one level above where this course ends; there is no Swedish exam set at A1. The final check follows its four modules for practice.',
    samples: 'https://www.folkuniversitetet.se/in-english/swedex-swedish-examinations/mock-exams/',
    format: 'Short texts to read; numbers and short lines to listen to; a form and a short message to write; then speaking.' },
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
  // Dutch is a mock Basic Civic Integration Exam Abroad (2026-11-20, the full A1 run; end of Part 4, the last part): its
  // two language papers, reading (Leestoets) then spoken Dutch (Toets Gesproken Nederlands: questions heard and answered),
  // here as listening and speaking. The exam has no writing paper; a short writing section stays as practice so every
  // course's result shows the same four skills. Item counts are ours.
  nl: [
    { id: 'reading', label: 'Reading', paper: 'Leestoets', items: [['QT14', 3, 4], ['QT03', 2, 3]] },
    { id: 'listening', label: 'Listening', paper: 'Toets Gesproken Nederlands', items: [['QT04', 2, 3], ['QT17', 3, 3], ['QT11', 4, 2]] },
    { id: 'speaking', label: 'Speaking', paper: 'Toets Gesproken Nederlands', items: [['QT13', 5, 4]] },
    { id: 'writing', label: 'Writing', paper: 'Practice (not in the exam)', items: [['QT15', 4, 1], ['QT12', 4, 2]] },
  ],
  // Swedish is a mock Swedex (2026-11-21; end of Part 4): its four modules in order, reading, listening, the written part
  // (a form and a short message, the message not scored), the spoken part (never graded). Item counts are ours.
  sv: [
    { id: 'reading', label: 'Reading', paper: 'Läsförståelse', items: [['QT14', 3, 4], ['QT03', 2, 2]] },
    { id: 'listening', label: 'Listening', paper: 'Hörförståelse', items: [['QT04', 2, 3], ['QT17', 3, 4], ['QT11', 4, 2]] },
    { id: 'writing', label: 'Writing', paper: 'Skriftlig del', items: [['QT15', 4, 1], ['QT16', 5, 1], ['QT12', 4, 2]] },
    { id: 'speaking', label: 'Speaking', paper: 'Muntlig del', items: [['QT13', 5, 3]] },
  ],
}
// Italian is a mock CELI Impatto (A1) (Dan, 2026-11-16; at the end of Part 4, the last part). The Università per
// Stranieri di Perugia describes two papers: a written one (reading, then writing) and an oral one (listening, then
// speaking), so reading comes first. Item counts follow the other mock exams; the official paper's counts are for Dan
// to check against the sample on cvcl.it.
FORMATS.it = [
  { id: 'reading', label: 'Reading', paper: 'Comprensione della lettura', items: [['QT14', 3, 4], ['QT03', 2, 2]] },
  { id: 'writing', label: 'Writing', paper: 'Produzione di testi scritti', items: [['QT15', 4, 1], ['QT16', 5, 1], ['QT12', 4, 2]] },
  { id: 'listening', label: 'Listening', paper: "Comprensione dell'ascolto", items: [['QT17', 3, 4], ['QT04', 2, 3], ['QT11', 4, 2]] },
  { id: 'speaking', label: 'Speaking', paper: 'Produzione orale', items: [['QT13', 5, 3]] },
]
// Brazilian Portuguese is a mock ACESSO (A1) (Dan, 2026-11-19; at the end of Part 4, the last part). CAPLE's page for
// the exam (caple.letras.ulisboa.pt/exame/1/acesso) lists four components in this order, the first two sat together:
// Compreensão da Leitura (20 min, 20%), Produção e Interação Escritas (20 min, 15%: filling in a form about yourself and
// a very short informal text), Compreensão do Oral (25 min, 35%), Produção e Interação Orais (8 to 10 min, 30%, in
// pairs with an examiner). The weights are CAPLE's; the item counts are ours, listening given a little more for its 35%.
FORMATS.pt = [
  { id: 'reading', label: 'Reading', paper: 'Compreensão da Leitura', items: [['QT14', 3, 4], ['QT03', 2, 2]] },
  { id: 'writing', label: 'Writing', paper: 'Produção e Interação Escritas', items: [['QT15', 4, 1], ['QT16', 5, 1], ['QT12', 4, 2]] },
  { id: 'listening', label: 'Listening', paper: 'Compreensão do Oral', items: [['QT17', 3, 4], ['QT04', 2, 3], ['QT11', 4, 3]] },
  { id: 'speaking', label: 'Speaking', paper: 'Produção e Interação Orais', items: [['QT13', 5, 3]] },
]
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
