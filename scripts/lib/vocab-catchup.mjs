// Vocabulary and Catch-Up circles (A1 Complete section 9, Dan 2026-11-10), the framework half, built once for every
// course's workbook:
//   QT18 Type the Word: the English meaning (and the picture, where there is one), the course word typed.
//   round_type_mix.mix: '' for the situation circles' mix, 'vocab' for a vocabulary circle's word-focused mix (match
//     pairs, pick the picture, type the word, then short sentences), chosen by units.mix.
//   catch_up: slots in the tree (after a row), filled per learner from their misses and their thinnest words.
// Content (which circles are vocabulary circles, where the slots sit) is per course.

export const QT18 = {
  type_id: 'QT18', key: 'type_word', name: 'Type the word', skill: 'writing', recognition_or_recall: 'recall', input: 'keyboard',
  needs_audio: 'no', needs_image: 'optional', notes: 'Vocabulary and Catch-Up circles (A1 Complete 9): the English meaning, and the picture where the word has one; the course word is typed, with or without its article. Checked as a typed answer.',
  first_round: 2, last_round: 5, skill_when_listen_first: '', notes_last_round: '',
}

// Each round adds to 10, has a listening type, no type more than 3 times, every type inside its rounds (import checks).
export const VOCAB_MIX = {
  1: { QT01: 3, QT02: 2, QT03: 2, QT04: 2, QT10: 1 },
  2: { QT01: 2, QT02: 1, QT18: 3, QT03: 1, QT04: 1, QT07: 1, QT10: 1 },
  3: { QT18: 3, QT05: 2, QT08: 2, QT07: 2, QT10: 1 },
  4: { QT18: 3, QT08: 2, QT12: 2, QT11: 2, QT13: 1 },
  5: { QT18: 3, QT12: 3, QT11: 2, QT06: 1, QT13: 1 },
}

// slots: [{ slot_id, part, after_row }]. Adds QT18, the mix column and rows, the units.mix column, and the catch_up tab.
export function addVocabFramework(XLSX, wb, { slots = [], vocabUnits = [] } = {}) {
  const sheet = (n) => (wb.Sheets[n] ? XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' }) : [])
  const types = sheet('question_types').filter((t) => t.type_id !== 'QT18')
  wb.Sheets.question_types = XLSX.utils.json_to_sheet([...types, QT18])
  const mix = sheet('round_type_mix').filter((m) => m.mix !== 'vocab').map((m) => ({ ...m, mix: '' }))
  for (const [round, row] of Object.entries(VOCAB_MIX)) {
    for (const [type_id, n] of Object.entries(row)) mix.push({ round: Number(round), type_id, questions_per_10: n, notes: 'vocabulary circle', mix: 'vocab' })
  }
  wb.Sheets.round_type_mix = XLSX.utils.json_to_sheet(mix)
  const units = sheet('units').map((u) => ({ ...u, mix: vocabUnits.includes(u.unit_id) ? 'vocab' : (u.mix ?? '') }))
  wb.Sheets.units = XLSX.utils.json_to_sheet(units)
  const rows = slots.map((s) => ({ slot_id: s.slot_id, part: s.part, after_row: s.after_row, title: 'Catch-Up', status: 'live', notes: s.notes ?? '' }))
  if (!wb.SheetNames.includes('catch_up')) wb.SheetNames.push('catch_up')
  wb.Sheets.catch_up = XLSX.utils.json_to_sheet(rows.length ? rows : [{ slot_id: '', part: '', after_row: '', title: '', status: '', notes: '' }])
}
