// Phase 3: adds the "choose your topic" node and seven topic packs to the workbook (Claude owns it under
// autonomous-build.md). Each pack is a unit marked is_topic_pick; the node (U100) sits in tree row 4.
// Usage: node scripts/add-topic-packs.mjs <from.xlsx> <to.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const [from, to] = process.argv.slice(2)
const wb = XLSX.readFile(join(ROOT, from))
const sheet = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' })
const header = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { header: 1, defval: '' })[0]
const save = (n, rows) => { const cols = [...header(n)]; for (const r of rows) for (const k of Object.keys(r)) if (!cols.includes(k)) cols.push(k); wb.Sheets[n] = XLSX.utils.json_to_sheet(rows, { header: cols }) }

const PACKS = [
  { unit_id: 'U101', topic_id: 'T06', title: 'Weather', words: ['neige', 'pluie', 'soleil', 'froid', 'chaud', 'temps'] },
  { unit_id: 'U102', topic_id: 'T29', title: 'Family', words: ['frère', 'sœur', 'mère', 'père', 'fils', 'famille', 'bébé', 'parents'] },
  { unit_id: 'U103', topic_id: 'T30', title: 'Home', words: ['maison', 'chambre', 'table', 'chaise', 'cuisine', 'lit', 'porte', 'fenêtre'] },
  { unit_id: 'U104', topic_id: 'T17', title: 'Music', words: ['musique', 'chanson', 'piano', 'guitare', 'chanteur', 'chante'] },
  { unit_id: 'U105', topic_id: 'T09', title: 'Coffee shop', words: ['café', 'thé', 'sucre', 'chocolat', 'tasse', 'croissant'] },
  { unit_id: 'U106', topic_id: 'T25', title: 'Supermarket', words: ['viande', 'poulet', 'riz', 'banane', 'tomate', 'œuf', 'œufs', 'beurre'] },
  { unit_id: 'U107', topic_id: 'T15', title: 'The beach', words: ['plage', 'mer', 'poisson', 'bateau', 'sable'] },
]

const units = sheet('units').filter((u) => !/^U1\d\d$/.test(u.unit_id))
units.push({ unit_id: 'U100', lang_id: 'fr', cefr: 'A1', order: 6, title: 'Your topic', topic: 'Choose one of seven topics', grammar_point: 'The grammar of Units 1 to 5, on a topic you choose', contrast_sets: '', can_do_ids: '', branch_group: 'row 4', is_topic_pick: 'node', status: 'live' })
PACKS.forEach((p, i) => units.push({ unit_id: p.unit_id, lang_id: 'fr', cefr: 'A1', order: 101 + i, title: p.title, topic: p.title, grammar_point: 'Units 1 to 5, with words for this topic', contrast_sets: '', can_do_ids: '', branch_group: 'topic', is_topic_pick: 'yes', status: 'draft', topic_id: p.topic_id }))
save('units', units)

const layout = sheet('tree_layout').filter((t) => t.unit_id !== 'U100')
layout.push({ row: 4, position: 1, unit_id: 'U100', unlocks_after: 'row 3', notes: 'choose your topic: one of the topic packs (is_topic_pick yes)' })
save('tree_layout', layout)

const words = sheet('words').filter((w) => !/^W3\d\d$/.test(w.word_id))
let n = 301
for (const p of PACKS) for (const form of p.words) words.push({ word_id: `W${n++}`, lang_id: 'fr', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '', first_unit: p.unit_id, needs_image: 'no', image_file: '', wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form)}#French`, status: 'pull from Wiktionary' })
save('words', words)

save('topics_pool', sheet('topics_pool').map((t) => (PACKS.some((p) => p.topic_id === t.topic_id) ? { ...t, status: 'pack: ' + PACKS.find((p) => p.topic_id === t.topic_id).unit_id } : t)))

XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}: node U100 and ${PACKS.length} packs, ${n - 301} words (W301 to W${n - 1}).`)
