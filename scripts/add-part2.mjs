// A1 · Part 2, Everyday Life, for Spanish and German (Dan, 2026-11-14), in French Part 2's format: nine situation
// circles (spelling, phone numbers, age, numbers to 100, where you live, countries and languages, the market, prices,
// quantities), the three help circles (U34 to U36, on .5 rows, gating nothing), five vocabulary circles (one beside the
// situation circles of each row, 11 to 15), Catch-Up (Brush-Up) slots C03 and C04 after rows 12 and 14, and the part's
// A1 task items (QT14 Read and Answer, QT15 Fill the Form, QT16 Write a Message, QT17 Write the Number).
// Each course's circles, words, task items and "I can" statements are in scripts/part2/<course>.mjs.
// Words: situation and help circles from W801, vocabulary circles from W1101. "I can" statements from CD201.
// Usage: COURSE=es node scripts/add-part2.mjs <from.xlsx> <to.xlsx>   (COURSE=de for German)
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { addVocabFramework } from './lib/vocab-catchup.mjs'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const COURSE = process.env.COURSE
const LANG = { es: 'Spanish', de: 'German' }

export const SLOTS = [
  { slot_id: 'C01', part: 1, after_row: 5 }, { slot_id: 'C02', part: 1, after_row: 7 },
  { slot_id: 'C03', part: 2, after_row: 12 }, { slot_id: 'C04', part: 2, after_row: 14 },
]

if (process.argv[1] === import.meta.filename) {
  if (!LANG[COURSE]) throw new Error('COURSE=es or COURSE=de')
  const P = (await import(`./part2/${COURSE}.mjs`)).default
  const [from, to] = process.argv.slice(2)
  const wb = XLSX.readFile(join(ROOT, from))
  const sheet = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' })
  const circles = [...P.situation, ...P.vocab]
  const ids = new Set(circles.map((u) => u.unit_id))
  const units = sheet('units').filter((u) => !ids.has(u.unit_id))
  const blank = Object.fromEntries(Object.keys(units[0]).map((k) => [k, '']))
  const canDo = sheet('can_do').filter((c) => !ids.has(c.unit_id))
  const grid = Object.fromEntries(canDo.filter((c) => c.cefr_row).map((c) => [c.cefr_row, c.cefr_descriptor]))
  const src = canDo.find((c) => c.source)?.source.replace(/, A1.*$/, '').replace(/, (Listening|Reading|Writing|Spoken interaction|Spoken production)$/, '') ?? ''
  let cd = 201
  for (const u of [...circles].sort((a, b) => a.order - b.order)) {
    const cds = (P.canDo[u.unit_id] ?? []).map(([skill, row, statement]) => {
      const id = `CD${cd++}`
      canDo.push({ can_do_id: id, unit_id: u.unit_id, skill, cefr: 'A1', statement, source: `${src}, A1, ${row}`, cefr_row: row, cefr_descriptor: grid[row] ?? '' })
      return id
    })
    units.push({ ...blank, unit_id: u.unit_id, lang_id: COURSE, cefr: 'A1', order: u.order, title: u.title, topic: u.title, grammar_point: u.grammar, can_do_ids: cds.join(';'),
      branch_group: `row ${u.row}`, is_topic_pick: u.help ? 'help' : 'no', status: 'draft', part: 2, tasks: u.tasks ?? '', borrow_words: (u.borrow ?? []).join(';') })
  }
  wb.Sheets.units = XLSX.utils.json_to_sheet(units)
  wb.Sheets.can_do = XLSX.utils.json_to_sheet(canDo)
  const layout = sheet('tree_layout').filter((t) => !ids.has(t.unit_id))
  const pos = {}
  for (const u of [...circles].sort((a, b) => a.row - b.row || a.order - b.order)) {
    layout.push({ row: u.row, position: (pos[u.row] = (pos[u.row] ?? 0) + 1), unit_id: u.unit_id, unlocks_after: u.after,
      notes: u.help ? 'A1 Part 2 help circle, gates nothing' : P.vocab.includes(u) ? 'A1 Part 2 vocabulary circle' : 'A1 Part 2' })
  }
  wb.Sheets.tree_layout = XLSX.utils.json_to_sheet(layout)
  const words = sheet('words').filter((w) => !/^W(8\d\d|9\d\d|11\d\d)$/.test(w.word_id))
  const keys = Object.keys(words[0])
  const taken = new Set(words.map((w) => w.form))
  const add = (u, form, id, note) => {
    if (taken.has(form)) throw new Error(`${u.unit_id}: ${form} is already in the course`)
    taken.add(form)
    words.push({ ...Object.fromEntries(keys.map((k) => [k, ''])), word_id: `W${id}`, lang_id: COURSE, form, first_unit: u.unit_id, needs_image: 'no',
      wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form)}#${LANG[COURSE]}`, status: P.off?.[form] ? `off: ${P.off[form]}` : 'pull from Wiktionary', notes: note })
  }
  let n = 801
  for (const u of P.situation) for (const form of u.words) add(u, form, n++, 'A1 Part 2 word')
  // Words added to an earlier circle after its ids were set (P.late): numbered after every situation word, so no id moves.
  for (const l of (P.late ?? []).filter((x) => P.situation.some((u) => u.unit_id === x.unit_id))) { const u = P.situation.find((x) => x.unit_id === l.unit_id); for (const form of l.words) add(u, form, n++, 'A1 Part 2 word (added in review)') }
  let v = 1101
  for (const u of P.vocab) for (const form of u.words) add(u, form, v++, 'A1 Part 2 vocabulary circle word')
  // The same for a vocabulary circle: numbered after every vocabulary word.
  for (const l of (P.late ?? []).filter((x) => P.vocab.some((u) => u.unit_id === x.unit_id))) { const u = P.vocab.find((x) => x.unit_id === l.unit_id); for (const form of l.words) add(u, form, v++, 'A1 Part 2 vocabulary circle word (added for coverage)') }
  wb.Sheets.words = XLSX.utils.json_to_sheet(words)
  for (const [tab, rows] of Object.entries(P.items)) {
    const keep = sheet(tab).filter((r) => !rows.some((x) => x.id === r.id))
    wb.Sheets[tab] = XLSX.utils.json_to_sheet([...keep, ...rows])
  }
  const vocabUnits = sheet('units').filter((u) => u.mix === 'vocab').map((u) => u.unit_id)
  addVocabFramework(XLSX, wb, { slots: SLOTS, vocabUnits: [...new Set([...vocabUnits, ...P.vocab.map((u) => u.unit_id)])] })
  const parts = sheet('parts').map((p) => (Number(p.part) === 2 ? { ...p, status: 'live' } : p))
  wb.Sheets.parts = XLSX.utils.json_to_sheet(parts)
  const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
  r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, `A1 · Part 2, Everyday Life: ${P.situation.length} situation and help circles and ${P.vocab.length} vocabulary circles as drafts, rows 11 to 15; words from W801 and W1101; "I can" statements from CD201; Brush-Up slots C03 and C04 after rows 12 and 14; ${Object.values(P.items).reduce((t, x) => t + x.length, 0)} A1 task items.`])
  wb.Sheets.README = XLSX.utils.aoa_to_sheet(r)
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: ${circles.length} circles, ${n - 801 + v - 1101} words, ${Object.values(P.items).reduce((t, x) => t + x.length, 0)} task items`)
}
