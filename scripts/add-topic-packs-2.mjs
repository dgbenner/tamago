// Topic packs, second node (Dan, 2026-11-10): packs may use every A1 word. They sit behind a second Your Topic node
// (U200) after Unit 13, in tree row 9. Each new pack is a draft unit with topic_node U200 until its sentences are
// reviewed; the first seven get topic_node U100. Also cuts S6057 from the Weather pack (Dan's decision).
// Usage: node scripts/add-topic-packs-2.mjs <from.xlsx> <to.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const [from, to] = process.argv.slice(2)
const wb = XLSX.readFile(join(ROOT, from))
const sheet = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' })
const header = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { header: 1, defval: '' })[0]
const save = (n, rows) => { const cols = [...header(n)]; for (const r of rows) for (const k of Object.keys(r)) if (!cols.includes(k)) cols.push(k); wb.Sheets[n] = XLSX.utils.json_to_sheet(rows, { header: cols }) }
const changelog = (line) => { const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' }); r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, line]); wb.Sheets.README = XLSX.utils.aoa_to_sheet(r) }

// The topics with 28 or more candidates under the all-A1 rule (scripts/pack-feasibility.mjs with ALL_A1=1); words
// with no candidate sentence are left out, and a word goes to one pack only.
export const PACKS = [
  { unit_id: 'U201', topic_id: 'T22', title: 'At the Office', words: ['bureau', 'ordinateur', 'travail', 'travaille', 'travailles', 'travaillent', 'patron', 'patronne', 'collègue', 'collègues', 'téléphone', 'réunion', 'occupé', 'occupée', 'secrétaire', 'stylo'] },
  { unit_id: 'U202', topic_id: 'T23', title: 'At the Doctor', words: ['médecin', 'médecins', 'docteur', 'docteurs', 'malade', 'malades', 'hôpital', 'mal', 'infirmière', 'fièvre', 'tête', 'dentiste', 'ventre', 'gorge', 'toux', 'rhume', 'santé'] },
  { unit_id: 'U203', topic_id: 'T28', title: 'At the Cinema', words: ['film', 'films', 'cinéma', 'acteur', 'acteurs', 'actrice', 'regarde', 'regardes', 'regardent', 'histoire', 'télé', 'télévision', 'drôle', 'triste', 'billet'] },
  { unit_id: 'U204', topic_id: 'T12', title: 'Playing Soccer', words: ['football', 'ballon', 'équipe', 'joueur', 'joue', 'jouent', 'foot', 'sport', 'gagne', 'but'] },
  { unit_id: 'U205', topic_id: 'T27', title: 'Colours and Art', words: ['art', 'tableau', 'tableaux', 'couleur', 'couleurs', 'artiste', 'artistes', 'peintre'] },
  { unit_id: 'U206', topic_id: 'T10', title: 'Train Travel', words: ['train', 'trains', 'gare', 'voyage', 'voiture', 'valise'] },
  { unit_id: 'U207', topic_id: 'T26', title: 'Clothes and Shoes', words: ['robe', 'chemise', 'chapeau', 'chaussures', 'manteau', 'pantalon', 'chaussettes'] },
  { unit_id: 'U208', topic_id: 'T18', title: 'Cooking Meals', words: ['soupe', 'gâteau', 'gâteaux', 'cuisinier', 'cuisinière', 'recette', 'sel', 'poivre', 'plat', 'délicieux'] },
]

// After the pull and review: words with fewer than 3 good sentences (the first packs' rule) are dropped, and a pack
// that can't reach 30 good sentences is skipped (listed in check-in.md). Word ids stay fixed by the lists above.
export const DROP = {
  U201: ['ordinateur', 'travailles', 'patronne', 'collègue', 'collègues', 'téléphone', 'réunion', 'secrétaire'],
  U202: ['docteurs', 'mal', 'infirmière', 'tête', 'dentiste', 'ventre', 'gorge', 'toux', 'rhume', 'santé'],
  U203: ['télé', 'cinéma', 'acteurs', 'actrice', 'regardes', 'regardent', 'télévision', 'billet'],
}
// Candidates before review where under 30; Cinema had 45, but only 20 stayed on the topic after review (the rest are
// people being funny or sad, or regarde as "look").
export const SKIPPED = { U203: 'about 20 on the topic', U204: 25, U205: 27, U206: 25, U207: 28, U208: 14 }
const BUILT = PACKS.filter((p) => !SKIPPED[p.unit_id])

if (process.argv[1] === import.meta.filename) {
  const units = sheet('units').filter((u) => !/^U2\d\d$/.test(u.unit_id)).map((u) => (u.is_topic_pick === 'yes' ? { ...u, topic_node: 'U100' } : u))
  units.push({ unit_id: 'U200', lang_id: 'fr', cefr: 'A1', order: 60, title: 'Another Topic', topic: 'Choose a topic', grammar_point: 'All of A1, on a topic you choose', contrast_sets: '', can_do_ids: '', branch_group: 'row 9', is_topic_pick: 'node', status: 'live', borrowed_sentence_ids: '', topic_id: '', icon_group: '', icon_file: '', topic_node: '' })
  BUILT.forEach((p) => units.push({ unit_id: p.unit_id, lang_id: 'fr', cefr: 'A1', order: 201 + PACKS.indexOf(p), title: p.title, topic: p.title, grammar_point: 'All of A1, with words for this topic', contrast_sets: '', can_do_ids: '', branch_group: 'topic', is_topic_pick: 'yes', status: 'draft', borrowed_sentence_ids: '', topic_id: p.topic_id, icon_group: '', icon_file: '', topic_node: 'U200' }))
  save('units', units)

  const layout = sheet('tree_layout').filter((t) => t.unit_id !== 'U200')
  layout.push({ row: 9, position: 1, unit_id: 'U200', unlocks_after: 'row 8', notes: 'a second topic: the packs with topic_node U200, on all of A1' })
  save('tree_layout', layout)

  const taken = new Set(sheet('words').map((w) => w.form))
  const words = sheet('words').filter((w) => !/^W5\d\d$/.test(w.word_id))
  let n = 501
  for (const p of PACKS) for (const form of p.words) {
    if (SKIPPED[p.unit_id] || DROP[p.unit_id]?.includes(form)) { n++; continue }
    if (taken.has(form)) throw new Error(`${p.unit_id}: ${form} is already in the course`)
    taken.add(form)
    words.push({ word_id: `W${n++}`, lang_id: 'fr', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '', first_unit: p.unit_id, needs_image: 'no', image_file: '', wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form)}#French`, status: 'pull from Wiktionary', notes: '' })
  }
  save('words', words)

  save('topics_pool', sheet('topics_pool').map((t) => { const p = BUILT.find((x) => x.topic_id === t.topic_id); return p ? { ...t, status: `pack: ${p.unit_id} (draft)` } : t }))

  const sentences = sheet('sentences')
  const cut = sentences.find((s) => s.sentence_id === 'S6057')
  Object.assign(cut, { status: 'off: cut in review', notes: `${cut.notes}; cut 2026-11-10 (Dan): temps here means "time", not weather` })
  save('sentences', sentences)

  changelog(`Second Your Topic node (U200, row 9, after Unit 13) for packs on all of A1, with ${BUILT.length} packs that can reach 30 checked Tatoeba sentences (${BUILT.map((p) => `${p.unit_id} ${p.title}`).join(', ')}; words from W501); ${Object.keys(SKIPPED).length} topics skipped for too few sentences; the first seven packs get topic_node U100. S6057 "Il a du temps." cut from the Weather pack (Dan).`)
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: node U200, ${BUILT.length} draft packs`)
}
