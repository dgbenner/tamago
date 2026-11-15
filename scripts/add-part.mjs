// A later A1 part for any course (Dan, 2026-11-14; generalised from scripts/add-part2.mjs, which built Spanish and German
// Part 2): situation circles, three help circles (on .5 rows, gating nothing), five vocabulary circles (one beside each
// row's situation circles), Brush-Up slots, and the part's A1 task items (QT14 to QT17). Each part's config is
// scripts/part<N>/<course>.mjs and gives part, wordBase, vocabBase, cdBase and slots (added to the course's existing
// slots) besides the circles, words, items and "I can" statements. `off` and `late` work as in add-part2.mjs; `revive`
// moves a word that was turned off into a circle of this part.
// Usage: COURSE=fr PART=3 node scripts/add-part.mjs <from.xlsx> <to.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { addVocabFramework } from './lib/vocab-catchup.mjs'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const COURSE = process.env.COURSE
const LANG = { fr: 'French', es: 'Spanish', de: 'German' }
const PART = Number(process.env.PART)

if (process.argv[1] === import.meta.filename) {
  if (!LANG[COURSE] || !PART) throw new Error('COURSE=fr|es|de and PART=n')
  const P = (await import(`./part${PART}/${COURSE}.mjs`)).default
  if (P.part !== PART) throw new Error(`config says part ${P.part}`)
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
  let cd = P.cdBase
  for (const u of [...circles].sort((a, b) => a.order - b.order)) {
    const cds = (P.canDo[u.unit_id] ?? []).map(([skill, row, statement]) => {
      const id = `CD${cd++}`
      canDo.push({ can_do_id: id, unit_id: u.unit_id, skill, cefr: 'A1', statement, source: `${src}, A1, ${row}`, cefr_row: row, cefr_descriptor: grid[row] ?? '' })
      return id
    })
    units.push({ ...blank, unit_id: u.unit_id, lang_id: COURSE, cefr: 'A1', order: u.order, title: u.title, topic: u.title, grammar_point: u.grammar, can_do_ids: cds.join(';'),
      branch_group: `row ${u.row}`, is_topic_pick: u.help ? 'help' : 'no', status: 'draft', part: P.part, tasks: u.tasks ?? '', borrow_words: (u.borrow ?? []).join(';') })
  }
  wb.Sheets.units = XLSX.utils.json_to_sheet(units)
  wb.Sheets.can_do = XLSX.utils.json_to_sheet(canDo)
  const layout = sheet('tree_layout').filter((t) => !ids.has(t.unit_id))
  const pos = {}
  for (const u of [...circles].sort((a, b) => a.row - b.row || a.order - b.order)) {
    layout.push({ row: u.row, position: (pos[u.row] = (pos[u.row] ?? 0) + 1), unit_id: u.unit_id, unlocks_after: u.after,
      notes: u.help ? `A1 Part ${P.part} help circle, gates nothing` : P.vocab.includes(u) ? `A1 Part ${P.part} vocabulary circle` : `A1 Part ${P.part}` })
  }
  wb.Sheets.tree_layout = XLSX.utils.json_to_sheet(layout)
  const mine = (id) => { const n = Number(String(id).slice(1)); return (n >= P.wordBase && n < P.wordBase + 200) || (n >= P.vocabBase && n < P.vocabBase + 200) }
  const words = sheet('words').filter((w) => !mine(w.word_id))
  const keys = Object.keys(words[0])
  // A word turned off earlier and wanted now (P.revive: { form: unit }; French Part 5 copain, copine, temps) moves to
  // that circle and is checked again; it keeps its id.
  for (const [form, unit] of Object.entries(P.revive ?? {})) {
    const w = words.find((x) => x.form === form)
    if (!w) throw new Error(`revive: ${form} is not in the course`)
    Object.assign(w, { first_unit: unit, status: 'pull from Wiktionary', notes: `A1 Part ${P.part} word (revived; was ${String(w.status).slice(0, 60)})` })
  }
  const taken = new Set(words.map((w) => w.form))
  const add = (u, form, id, note) => {
    if (taken.has(form)) throw new Error(`${u.unit_id}: ${form} is already in the course`)
    taken.add(form)
    words.push({ ...Object.fromEntries(keys.map((k) => [k, ''])), word_id: `W${id}`, lang_id: COURSE, form, first_unit: u.unit_id, needs_image: 'no',
      wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form)}#${LANG[COURSE]}`, status: P.off?.[form] ? `off: ${P.off[form]}` : 'pull from Wiktionary', notes: note })
  }
  let n = P.wordBase
  for (const u of P.situation) for (const form of u.words) add(u, form, n++, `A1 Part ${P.part} word`)
  // Words added to an earlier circle after its ids were set (P.late): numbered after every situation word, so no id moves.
  for (const l of (P.late ?? []).filter((x) => P.situation.some((u) => u.unit_id === x.unit_id))) { const u = P.situation.find((x) => x.unit_id === l.unit_id); for (const form of l.words) add(u, form, n++, `A1 Part ${P.part} word (added in review)`) }
  let v = P.vocabBase
  for (const u of P.vocab) for (const form of u.words) add(u, form, v++, `A1 Part ${P.part} vocabulary circle word`)
  // The same for a vocabulary circle: numbered after every vocabulary word.
  for (const l of (P.late ?? []).filter((x) => P.vocab.some((u) => u.unit_id === x.unit_id))) { const u = P.vocab.find((x) => x.unit_id === l.unit_id); for (const form of l.words) add(u, form, v++, `A1 Part ${P.part} vocabulary circle word (added for coverage)`) }
  wb.Sheets.words = XLSX.utils.json_to_sheet(words)
  for (const [tab, rows] of Object.entries(P.items)) {
    const keep = sheet(tab).filter((r) => !rows.some((x) => x.id === r.id))
    wb.Sheets[tab] = XLSX.utils.json_to_sheet([...keep, ...rows])
  }
  const vocabUnits = sheet('units').filter((u) => u.mix === 'vocab').map((u) => u.unit_id)
  const slots = [...sheet('catch_up').filter((r) => r.slot_id && !P.slots.some((x) => x.slot_id === r.slot_id)).map((r) => ({ slot_id: r.slot_id, part: r.part, after_row: r.after_row })), ...P.slots]
  addVocabFramework(XLSX, wb, { slots, vocabUnits: [...new Set([...vocabUnits, ...P.vocab.map((u) => u.unit_id)])] })
  const parts = sheet('parts').map((p) => (Number(p.part) === P.part ? { ...p, status: 'live' } : p))
  wb.Sheets.parts = XLSX.utils.json_to_sheet(parts)
  const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
  r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, `A1 · Part ${P.part}: ${P.situation.length} situation and help circles and ${P.vocab.length} vocabulary circles as drafts; words from W${P.wordBase} and W${P.vocabBase}; "I can" statements from CD${P.cdBase}; Brush-Up slots ${P.slots.map((x) => x.slot_id).join(', ')}; ${Object.values(P.items).reduce((t, x) => t + x.length, 0)} A1 task items.`])
  wb.Sheets.README = XLSX.utils.aoa_to_sheet(r)
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: ${circles.length} circles, ${n - P.wordBase + v - P.vocabBase} words, ${Object.values(P.items).reduce((t, x) => t + x.length, 0)} task items`)
}
