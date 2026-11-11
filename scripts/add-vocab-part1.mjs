// Spanish and German vocabulary and Catch-Up circles in A1 Part 1 (A1 Complete section 9, Dan 2026-11-10): three
// vocabulary circles of official-list words (PCIC A1, Goethe Start Deutsch 1), one beside the situation circles of rows
// 5, 7 and 9, and two Catch-Up slots after rows 5 and 7. Themes stay clear of Parts 2 to 4 (spelling, numbers and
// shopping; time; food, directions, home, family and work). Each placed where Tatoeba has the most sentences for it
// with the words known by then (scripts/circle-feasibility.mjs): Around Town needs the going-places words, so it is last.
// Usage: COURSE=es node scripts/add-vocab-part1.mjs <from.xlsx> <to.xlsx>   (COURSE=de for German)
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { addVocabFramework } from './lib/vocab-catchup.mjs'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const COURSE = process.env.COURSE

export const VOCAB_PART1 = {
  es: [
    { unit_id: 'U51', order: 7.2, row: 5, title: 'Body and Feelings', grammar: 'Es simpático, es simpática: adjectives agree; tengo el pelo…, tiene los ojos…: tener for features',
      words: ['pelo', 'ojos', 'manos', 'cara', 'pie', 'nariz', 'dientes', 'alegre', 'simpático', 'simpática', 'serio', 'tímido', 'guapo', 'guapa'],
      cando: ['speaking', 'Spoken production', 'I can describe a person simply: their hair, their eyes, what they are like.'] },
    { unit_id: 'U52', order: 11.2, row: 7, title: 'Free Time', grammar: 'Me gusta + a verb (me gusta leer); leo, lee: -er verbs; jugar al fútbol',
      words: ['película', 'foto', 'fiesta', 'deporte', 'fútbol', 'bailar', 'nadar', 'jugar', 'juega', 'leer', 'leo', 'lee', 'escuchar', 'escucho', 'vacaciones'],
      cando: ['speaking', 'Spoken production', 'I can say what I like doing in my free time.'] },
    { unit_id: 'U53', order: 15.2, row: 9, title: 'Around Town', grammar: 'En coche, en autobús, en tren: en for how you travel; con (with)',
      words: ['museo', 'cine', 'teatro', 'iglesia', 'hotel', 'estación', 'coche', 'autobús', 'tren', 'taxi', 'plaza', 'calle', 'pueblo', 'con'],
      cando: ['reading', 'Reading', 'I can recognise the names of places and ways of getting around in a town.'] },
  ],
  de: [
    // Tatoeba has almost no German body-word lines a learner could read by row 7 (Kopf, Hand, Fuß: none), so the
    // circle is People and Feelings, after Mine and Yours; body words wait for a later part.
    { unit_id: 'U51', order: 11.2, row: 7, title: 'People and Feelings', grammar: 'Der Lehrer, die Lehrerin: -in for a woman. Ich bin müde, er ist glücklich: sein + an adjective; ich habe Hunger, ich habe Durst: haben',
      words: ['Leute', 'Mensch', 'Herr', 'Gast', 'Partner', 'Baby', 'Lehrer', 'Lehrerin', 'müde', 'glücklich', 'lustig', 'allein', 'ruhig', 'Hunger', 'Durst'],
      cando: ['speaking', 'Spoken production', 'I can say how I feel, and say simple things about the people around me.'] },
    { unit_id: 'U52', order: 7.2, row: 5, title: 'Free Time', grammar: 'Ich lese, er liest: lesen changes its vowel; ich höre Musik; gern (ich tanze gern)',
      words: ['Film', 'Foto', 'Sport', 'Fußball', 'Party', 'Hobby', 'Garten', 'Geschenk', 'Urlaub', 'Freizeit', 'lesen', 'lese', 'liest', 'hören', 'höre', 'tanzen', 'schwimmen'],
      cando: ['speaking', 'Spoken production', 'I can say what I like doing in my free time.'] },
    { unit_id: 'U53', order: 15.2, row: 9, title: 'Around Town', grammar: 'Mit dem Bus, mit dem Zug, mit dem Fahrrad: mit + dem for how you travel',
      words: ['Bahnhof', 'Bus', 'Zug', 'Taxi', 'Kino', 'Dorf', 'Straße', 'Fahrrad', 'Flughafen', 'Café', 'mit'],
      cando: ['reading', 'Reading', 'I can recognise the names of places and ways of getting around in a town.'] },
  ],
}
export const SLOTS_PART1 = [{ slot_id: 'C01', part: 1, after_row: 5 }, { slot_id: 'C02', part: 1, after_row: 7 }]

if (process.argv[1] === import.meta.filename) {
  const V = VOCAB_PART1[COURSE]
  if (!V) throw new Error('COURSE=es or COURSE=de')
  const [from, to] = process.argv.slice(2)
  const wb = XLSX.readFile(join(ROOT, from))
  const sheet = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' })
  const ids = new Set(V.map((u) => u.unit_id))
  const units = sheet('units').filter((u) => !ids.has(u.unit_id))
  const blank = Object.fromEntries(Object.keys(units[0]).map((k) => [k, '']))
  const canDo = sheet('can_do').filter((c) => !ids.has(c.unit_id))
  const grid = Object.fromEntries(canDo.filter((c) => c.cefr_row).map((c) => [c.cefr_row, c.cefr_descriptor]))
  const src = canDo.find((c) => c.source)?.source.replace(/, A1.*$/, '').replace(/, (Listening|Reading|Writing|Spoken interaction|Spoken production)$/, '') ?? ''
  const layout = sheet('tree_layout').filter((t) => !ids.has(t.unit_id))
  let cd = 251
  for (const u of V) {
    const [skill, row, statement] = u.cando
    const id = `CD${cd++}`
    canDo.push({ can_do_id: id, unit_id: u.unit_id, skill, cefr: 'A1', statement, source: `${src}, A1, ${row}`, cefr_row: row, cefr_descriptor: grid[row] ?? '' })
    units.push({ ...blank, unit_id: u.unit_id, lang_id: COURSE, cefr: 'A1', order: u.order, title: u.title, topic: u.title, grammar_point: u.grammar, can_do_ids: id,
      branch_group: `row ${u.row}`, is_topic_pick: 'no', status: 'draft', part: 1, tasks: '' })
    const mates = layout.filter((t) => t.row === u.row)
    layout.push({ row: u.row, position: mates.length + 1, unit_id: u.unit_id, unlocks_after: mates[0]?.unlocks_after ?? '', notes: 'A1 Part 1 vocabulary circle' })
  }
  wb.Sheets.units = XLSX.utils.json_to_sheet(units)
  wb.Sheets.can_do = XLSX.utils.json_to_sheet(canDo)
  wb.Sheets.tree_layout = XLSX.utils.json_to_sheet(layout)
  const words = sheet('words').filter((w) => !/^W1\d{3}$/.test(w.word_id))
  const taken = new Set(words.map((w) => w.form))
  const keys = Object.keys(words[0])
  const lang = { es: 'Spanish', de: 'German' }[COURSE]
  let n = 1001
  for (const u of V) for (const form of u.words) {
    if (taken.has(form)) throw new Error(`${u.unit_id}: ${form} is already in the course`)
    taken.add(form)
    const row = Object.fromEntries(keys.map((k) => [k, '']))
    words.push({ ...row, word_id: `W${n++}`, lang_id: COURSE, form, first_unit: u.unit_id, needs_image: 'no',
      wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form)}#${lang}`, status: 'pull from Wiktionary', notes: 'A1 Part 1 vocabulary circle word' })
  }
  wb.Sheets.words = XLSX.utils.json_to_sheet(words)
  addVocabFramework(XLSX, wb, { slots: SLOTS_PART1, vocabUnits: [...ids] })
  const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
  r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, `A1 section 9: QT18 Type the word; round_type_mix.mix and units.mix; catch_up C01 and C02 (after rows 5 and 7). Part 1 vocabulary circles ${[...ids].join(', ')} as drafts in rows 5, 7 and 9, words from W1001, "I can" statements from CD251.`])
  wb.Sheets.README = XLSX.utils.aoa_to_sheet(r)
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: ${V.length} vocabulary circles, ${n - 1001} words, ${SLOTS_PART1.length} Catch-Up slots`)
}
