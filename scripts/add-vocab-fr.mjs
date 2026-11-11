// French vocabulary and Catch-Up circles (A1 Complete section 9, Dan 2026-11-10). Part 2's situation circles added about
// 48 of FLELex's 600 most frequent A1 words; a part should close about a quarter of the gap to the goal (90% of the
// 600 = 540; after Part 1, 101 taught, so about 110 for Part 2). Five vocabulary circles, one in each Part 2 row beside
// its situation circles, add 65 more core headwords. Themes stay clear of the later parts (time: Part 3; food, shops and
// directions: Part 4; home, family and work: Part 5). Words checked against Tatoeba first (scripts/circle-feasibility.mjs).
// Catch-Up slots: two in Part 1 (after rows 5 and 7) and two in Part 2 (after rows 12 and 14), clear of the checkpoints.
// Usage: node scripts/add-vocab-fr.mjs <from.xlsx> <to.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { addVocabFramework } from './lib/vocab-catchup.mjs'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')

export const VOCAB_FR = [
  { unit_id: 'U51', order: 101.2, row: 11, title: 'Around Town', grammar: 'Au cinéma, à la gare, à l\'hôtel: à with le, la and l\'; en bus, en train, en voiture, but à vélo',
    words: ['cinéma', 'gare', 'hôtel', 'église', 'musée', 'piscine', 'bus', 'train', 'vélo', 'voiture', 'métro', 'village', 'avec'] },
  { unit_id: 'U52', order: 103.2, row: 12, title: 'Free Time', grammar: 'Je regarde, tu écoutes, il joue: -er verbs; je lis, tu lis: lire; aimer + a verb (j\'aime lire)',
    words: ['film', 'photo', 'jeu', 'danse', 'ski', 'fête', 'cadeau', 'voyage', 'vacances', 'jardin', 'regarde', 'regarder', 'écoute', 'joue', 'jouer', 'lis', 'lire'] },
  { unit_id: 'U53', order: 105.2, row: 13, title: 'Body and Feelings', grammar: 'Il est content, elle est contente; heureux, heureuse: adjectives agree; avoir peur (j\'ai peur)',
    words: ['main', 'tête', 'pied', 'yeux', 'dos', 'cheveux', 'content', 'contente', 'heureux', 'heureuse', 'triste', 'peur', 'sympa', 'calme', 'seul', 'seule'] },
  { unit_id: 'U54', order: 107.2, row: 14, title: 'People', grammar: 'Un voisin, une voisine; un étudiant, une étudiante: masculine and feminine; mais, aussi, ou',
    words: ['gens', 'dame', 'copain', 'copine', 'voisin', 'voisine', 'étudiant', 'étudiante', 'élève', 'professeur', 'touriste', 'client', 'mais', 'aussi', 'ou'] },
  { unit_id: 'U55', order: 109.2, row: 15, title: 'Outdoors', grammar: 'À la montagne, à la campagne: à la for places outside; sur la route, sur le pont',
    words: ['montagne', 'campagne', 'arbre', 'fleur', 'fleurs', 'terre', 'vent', 'nature', 'route', 'pont', 'chemin', 'sud', 'sur'] },
]

export const SLOTS_FR = [
  { slot_id: 'C01', part: 1, after_row: 5 }, { slot_id: 'C02', part: 1, after_row: 7 },
  { slot_id: 'C03', part: 2, after_row: 12 }, { slot_id: 'C04', part: 2, after_row: 14 },
]

const CAN_DO = {
  U51: ['reading', 'Reading', 'I can recognise the names of places and ways of getting around in a town.'],
  U52: ['speaking', 'Spoken production', 'I can say what I like doing in my free time.'],
  U53: ['speaking', 'Spoken production', 'I can say how I feel: happy, sad, calm, afraid.'],
  U54: ['reading', 'Reading', 'I can understand short sentences about the people around me.'],
  U55: ['reading', 'Reading', 'I can recognise everyday words for the countryside and the outdoors.'],
}

if (process.argv[1] === import.meta.filename) {
  const [from, to] = process.argv.slice(2)
  const wb = XLSX.readFile(join(ROOT, from))
  const sheet = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' })
  const ids = new Set(VOCAB_FR.map((u) => u.unit_id))
  const units = sheet('units').filter((u) => !ids.has(u.unit_id))
  const blank = Object.fromEntries(Object.keys(units[0]).map((k) => [k, '']))
  const canDo = sheet('can_do').filter((c) => !ids.has(c.unit_id))
  const grid = Object.fromEntries(canDo.filter((c) => c.cefr_row).map((c) => [c.cefr_row, c.cefr_descriptor]))
  const src = canDo.find((c) => c.source)?.source.replace(/, A1.*$/, '').replace(/, (Listening|Reading|Writing|Spoken interaction|Spoken production)$/, '') ?? ''
  let cd = 251
  const layout = sheet('tree_layout').filter((t) => !ids.has(t.unit_id))
  for (const u of VOCAB_FR) {
    const [skill, row, statement] = CAN_DO[u.unit_id]
    const id = `CD${cd++}`
    canDo.push({ can_do_id: id, unit_id: u.unit_id, skill, cefr: 'A1', statement, source: `${src}, A1, ${row}`, cefr_row: row, cefr_descriptor: grid[row] ?? '' })
    units.push({ ...blank, unit_id: u.unit_id, lang_id: 'fr', cefr: 'A1', order: u.order, title: u.title, topic: u.title, grammar_point: u.grammar, can_do_ids: id,
      branch_group: `row ${u.row}`, is_topic_pick: 'no', status: 'draft', part: 2, tasks: '' })
    // Beside the row's situation circles, opening with them.
    const mates = layout.filter((t) => t.row === u.row)
    layout.push({ row: u.row, position: mates.length + 1, unit_id: u.unit_id, unlocks_after: mates[0]?.unlocks_after ?? '', notes: 'A1 Part 2 vocabulary circle' })
  }
  wb.Sheets.units = XLSX.utils.json_to_sheet(units)
  wb.Sheets.can_do = XLSX.utils.json_to_sheet(canDo)
  wb.Sheets.tree_layout = XLSX.utils.json_to_sheet(layout)
  const words = sheet('words').filter((w) => !/^W1\d{3}$/.test(w.word_id))
  const taken = new Set(words.map((w) => w.form))
  let n = 1001
  for (const u of VOCAB_FR) for (const form of u.words) {
    if (taken.has(form)) throw new Error(`${u.unit_id}: ${form} is already in the course`)
    taken.add(form)
    words.push({ word_id: `W${n++}`, lang_id: 'fr', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '', first_unit: u.unit_id, needs_image: 'no', image_file: '',
      wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form)}#French`, status: 'pull from Wiktionary', notes: 'A1 Part 2 vocabulary circle word' })
  }
  wb.Sheets.words = XLSX.utils.json_to_sheet(words)
  addVocabFramework(XLSX, wb, { slots: SLOTS_FR, vocabUnits: [...ids] })
  const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
  r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, `A1 section 9: QT18 Type the word; round_type_mix.mix and units.mix (vocab: a word-focused mix); catch_up tab (slots C01 to C04). Part 2 vocabulary circles U51 to U55 as drafts, one in each of rows 11 to 15, words from W1001, "I can" statements from CD251.`])
  wb.Sheets.README = XLSX.utils.aoa_to_sheet(r)
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: ${VOCAB_FR.length} vocabulary circles, ${n - 1001} words, ${SLOTS_FR.length} Catch-Up slots`)
}
