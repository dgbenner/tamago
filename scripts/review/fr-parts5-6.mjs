// Fable's French Parts 5 and 6 review, the two Read and Answer fixes (Dan, 2026-11-15; _review/french-part5-check.md
// and -part6-check.md): R503 "La clé est chez la voisine." (a key can't sit under a door), R610 "Gardez votre billet."
// (the bus notice; "Tenez" was wrong). The rows are taken from the workbook as they are and only these cells changed;
// scripts/part5/fr.mjs and part6/fr.mjs carry the same text. Used by scripts/add-items.mjs.
import { join } from 'node:path'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
const rows = XLSX.utils.sheet_to_json(XLSX.readFile(join(import.meta.dirname, '../../_source/tamago-data-v39.xlsx')).Sheets.a1_texts, { defval: '' })
const fix = (id, lines, first) => {
  const r = rows.find((x) => x.id === id); if (!r) throw new Error(`${id} not in v39`)
  const q = JSON.parse(r.questions_json); q[0] = { ...q[0], ...first }
  return { ...r, lines: lines.join('\n'), questions_json: JSON.stringify(q), notes: [r.notes, "Fable's Parts 5-6 review, 2026-11-15"].filter(Boolean).join('; ') }
}
export default {
  note: "Fable's French Parts 5-6 review: R503 key chez la voisine, R610 Gardez votre billet (Dan, 2026-11-15)",
  items: { a1_texts: [
    fix('R503', ['Marie,', 'La clé est chez la voisine.', 'Le dîner est dans la cuisine.', 'Bonne nuit !'], { choices: ["At the neighbor's", 'On the table', 'In the bag'], answer: 0 }),
    fix('R610', ["Avancez, s'il vous plaît.", 'Asseyez-vous.', 'Gardez votre billet.'], { question: 'What should you do with your ticket?', choices: ['Keep it', 'Throw it away', 'Buy one'], answer: 0 }),
  ] },
}
