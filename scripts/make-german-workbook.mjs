// The German course's first workbook (Dan, 2026-11-10: standard German as spoken in Germany, with du and Sie; the
// same framework as French and Spanish, its own content, unit count and order, with the Goethe-Institut A1 level as
// the guide). Built from the French workbook's machinery tabs like the Spanish one (make-spanish-workbook.mjs).
// German needs its own order: the accusative arrives with haben (ich habe einen Hund), nicht and kein get a unit of
// their own, and the modal verbs möchten and können close A1, as in Start Deutsch 1. Nouns keep their capital.
// Usage: node scripts/make-german-workbook.mjs <french.xlsx> <german.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
import { addHelpCircles } from './lib/help-circles.mjs'
const ROOT = join(import.meta.dirname, '..')
const [from, to] = process.argv.slice(2)
const fr = XLSX.readFile(join(ROOT, from))
const sheet = (n) => XLSX.utils.sheet_to_json(fr.Sheets[n], { defval: '' })
const header = (n) => XLSX.utils.sheet_to_json(fr.Sheets[n], { header: 1, defval: '' })[0]
const wb = XLSX.utils.book_new()
const put = (n, rows, cols = header(n)) => XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows, { header: cols }), n)

export const UNITS = [
  { id: 'U01', title: 'Saying Hello', grammar: 'sein for who you are: ich bin, du bist; ein and eine; nicht', contrast: 'ein|eine; bin|bist', row: 1,
    words: ['hallo', 'tschüss', 'ja', 'nein', 'nicht', 'ich', 'du', 'bin', 'bist', 'ein', 'eine', 'Mann', 'Frau', 'Junge', 'Mädchen', 'Kind', 'und'] },
  { id: 'U02', title: 'People and Things', grammar: 'der, die and das; er, sie and es; ist', contrast: 'der|die; der|das; er|sie; ist|bin', row: 2,
    words: ['der', 'die', 'das', 'er', 'sie', 'es', 'ist', 'hier', 'Buch', 'Brief', 'Zeitung', 'Haus', 'groß', 'klein'] },
  { id: 'U03', title: 'Polite Phrases', grammar: 'Set phrases; du for friends, Sie for strangers: Wie geht es dir? Wie geht es Ihnen?', contrast: 'dir|Ihnen; guten Morgen|guten Abend', row: 2,
    words: ['danke', 'bitte', 'guten Morgen', 'guten Tag', 'guten Abend', 'gute Nacht', 'auf Wiedersehen', 'Entschuldigung', 'wie', 'geht', 'gut', 'dir', 'Ihnen'] },
  { id: 'U04', title: 'Food and Drink', grammar: 'Verbs in the present: ich esse, du isst; ich trinke, du trinkst, er trinkt; ich mag', contrast: 'esse|isst; trinke|trinkst; mag|magst', row: 3,
    words: ['esse', 'isst', 'trinke', 'trinkst', 'trinkt', 'mag', 'magst', 'Brot', 'Wasser', 'Milch', 'Käse', 'Apfel', 'Kaffee', 'Tee'] },
  { id: 'U05', title: 'Pets and Animals', grammar: 'haben: ich habe, du hast, er hat; what you have takes the accusative: einen Hund', contrast: 'habe|hast; hast|hat; ein|einen', row: 3,
    words: ['habe', 'hast', 'hat', 'einen', 'Hund', 'Katze', 'Pferd', 'Vogel', 'Ente', 'Maus', 'Tier'] },
  { id: 'U06', title: 'More Than One', grammar: 'Plurals: die for every plural; nouns change in several ways (Hunde, Katzen, Kinder, Äpfel); wir sind, sie sind', contrast: 'ist|sind; der|die', row: 5,
    words: ['wir', 'sind', 'haben', 'essen', 'trinken', 'Bücher', 'Hunde', 'Katzen', 'Kinder', 'Männer', 'Frauen', 'Äpfel', 'Häuser'] },
  { id: 'U07', title: 'Describing Things', grammar: 'Adjectives after the verb don\'t change: das Haus ist alt, die Katze ist alt; sehr and auch', contrast: 'alt|neu; alt|jung', row: 5,
    words: ['alt', 'neu', 'jung', 'schön', 'sehr', 'auch', 'Auto'] },
  { id: 'U08', title: 'Not and None', grammar: 'nicht for not, kein for not a or no: Ich habe keinen Hund; kein, keine, keinen', contrast: 'nicht|kein; kein|keine; keine|keinen', row: 6,
    words: ['kein', 'keine', 'keinen', 'Zeit', 'Geld', 'Problem'] },
  { id: 'U09', title: 'Mine and Yours', grammar: 'mein and dein, like ein: mein Hund, meine Katze, meinen Freund', contrast: 'mein|meine; dein|deine; mein|meinen', row: 6,
    words: ['mein', 'meine', 'meinen', 'dein', 'deine', 'deinen', 'Freund', 'Freundin', 'Familie'] },
  { id: 'U10', title: 'Asking Questions', grammar: 'Question words come first, the verb second: Wo ist…? Woher kommst du? Ich komme aus…', contrast: 'wer|wo; wo|woher; was|wer', row: 7,
    words: ['was', 'wer', 'wo', 'woher', 'warum', 'wann', 'komme', 'kommst', 'kommt', 'aus'] },
  { id: 'U11', title: 'Counting to Ten', grammar: 'Numbers one to ten; wie viele with a plural; es gibt for there is', contrast: 'eins|zehn; zwei|drei', row: 7,
    words: ['eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'wie viele', 'gibt'] },
  { id: 'U12', title: 'Naming Colours', grammar: 'Colours after the verb don\'t change: das Auto ist rot; welche Farbe?', contrast: 'rot|blau; schwarz|weiß', row: 8,
    words: ['rot', 'blau', 'grün', 'schwarz', 'weiß', 'gelb', 'Farbe', 'welche'] },
  { id: 'U13', title: 'Days and Times', grammar: 'heute, morgen, jetzt; am Montag; a time word first puts the verb second: Heute ist Montag', contrast: 'heute|morgen', row: 8,
    words: ['heute', 'morgen', 'jetzt', 'Tag', 'Woche', 'Uhr', 'Montag', 'Samstag', 'Sonntag', 'am'] },
  { id: 'U14', title: 'Going Places', grammar: 'gehen: ich gehe, du gehst, er geht; in die Schule, nach Hause, zu Hause', contrast: 'gehe|gehst; nach Hause|zu Hause', row: 9,
    words: ['gehe', 'gehst', 'in', 'nach Hause', 'zu Hause', 'Schule', 'Park', 'Stadt', 'Restaurant'] },
  { id: 'U15', title: 'Wanting and Can', grammar: 'möchten and können, with the other verb at the end: Ich möchte Kaffee. Ich kann Deutsch sprechen.', contrast: 'möchte|möchtest; kann|kannst', row: 9,
    words: ['möchte', 'möchtest', 'kann', 'kannst', 'sprechen', 'Deutsch', 'spielen'] },
]

// Widening after the pull (autonomous-build.md); new words take the next ids. Moves change a word's first unit.
export const EXTRA = {}
export const MOVE = {}

// Topic packs: added once the units are live (the same framework and rule as Spanish).
// German packs (2026-11-10), all at U200 after Unit 15, on all of A1, from checked Tatoeba only (30 or more, every
// word in 3 or more). Counts from COURSE=de ALL_A1=1 node scripts/pack-feasibility.mjs before review.
export const PACKS = [
  { unit_id: 'U101', node: 'U200', topic_id: 'T06', title: 'The Weather', words: ['Sonne', 'Regen', 'Schnee', 'kalt', 'warm', 'heiß', 'regnet', 'schneit', 'Wetter'] },
  { unit_id: 'U102', node: 'U200', topic_id: 'T29', title: 'Family Life', words: ['Mutter', 'Vater', 'Bruder', 'Schwester', 'Sohn', 'Tochter', 'Baby', 'Eltern', 'Mama', 'Papa'] },
  { unit_id: 'U201', node: 'U200', topic_id: 'T22', title: 'At the Office', words: ['Büro', 'Arbeit', 'arbeite', 'arbeitest', 'arbeitet', 'Chef', 'Chefin', 'Computer', 'Telefon', 'beschäftigt'] },
  { unit_id: 'U202', node: 'U200', topic_id: 'T23', title: 'At the Doctor', words: ['Arzt', 'Ärztin', 'Krankenhaus', 'krank', 'Kopf', 'Fieber', 'weh', 'Medizin'] },
  { unit_id: 'U203', node: 'U200', topic_id: 'T28', title: 'At the Cinema', words: ['Film', 'Filme', 'Kino', 'Schauspieler', 'Fernseher', 'lustig', 'traurig'] },
  { unit_id: 'U204', node: 'U200', topic_id: 'T11', title: 'At the Hotel', words: ['Hotel', 'Schlüssel', 'Zimmer', 'Nacht', 'Bett'] },
  { unit_id: 'U205', node: 'U200', topic_id: 'T17', title: 'Music and Songs', words: ['Musik', 'Lied', 'Lieder', 'Klavier', 'Gitarre', 'Sänger', 'Sängerin', 'singt', 'singe', 'singst'] },
  { unit_id: 'U206', node: 'U200', topic_id: 'T09', title: 'At the Café', words: ['Zucker', 'Schokolade', 'Tasse', 'Saft', 'Kuchen', 'Café'] },
  { unit_id: 'U207', node: 'U200', topic_id: 'T19', title: 'In the Garden', words: ['Garten', 'Blume', 'Blumen', 'Baum', 'Bäume', 'Pflanze'] },
  { unit_id: 'U208', node: 'U200', topic_id: 'T26', title: 'Clothes and Shoes', words: ['Kleidung', 'Hemd', 'Kleid', 'Schuhe', 'Hut', 'Hose', 'Rock', 'Mantel', 'Jacke'] },
  { unit_id: 'U209', node: 'U200', topic_id: 'T25', title: 'At the Supermarket', words: ['Fleisch', 'Hähnchen', 'Reis', 'Banane', 'Tomate', 'Ei', 'Eier', 'Butter', 'Supermarkt'] },
  { unit_id: 'U210', node: 'U200', topic_id: 'T30', title: 'At Home', words: ['Stuhl', 'Fenster', 'Tisch', 'Küche', 'Sofa'] },
  { unit_id: 'U211', node: 'U200', topic_id: 'T01', title: 'At the Airport', words: ['Flugzeug', 'Flughafen', 'Ticket', 'Koffer', 'Reise', 'Pilot', 'Pass', 'Flug'] },
  { unit_id: 'U212', node: 'U200', topic_id: 'T15', title: 'At the Beach', words: ['Strand', 'Meer', 'Fisch', 'Fische', 'Boot', 'Sand'] },
]
export const PACK_SKIPPED = {
  U203: 'Cinema: 58 candidates, but Film and Kino reach none; the rest are lustig, traurig and the television',
  U208: 'Clothes: 25 candidates', U210: 'Home: 24 candidates', U211: 'Airports: 25 candidates',
  U207: 'Garden: 24 candidates once Bäume and Pflanze (under 3) are out',
}
// Words under 3 candidates on all of A1 (before review), left out of their pack.
// Baby and Lied: under 3 good sentences after review.
export const PACK_DROP = { U101: ['Regen'], U102: ['Baby'], U202: ['Kopf', 'weh', 'Medizin'], U204: ['Nacht', 'Bett'], U205: ['Lieder', 'singst', 'Lied'], U206: ['Café'], U207: ['Bäume', 'Pflanze'], U209: ['Hähnchen', 'Tomate', 'Ei', 'Butter', 'Supermarkt'], U212: ['Sand'] }
export const PACK_EXTRA = {}

if (process.argv[1] === import.meta.filename) {
  put('README', [
    { item: 'Version', notes: 'German workbook v1, 2026-11-10. The 15 A1 units as drafts with their words; no sentences yet.' },
    { item: 'What this is', notes: 'Tamago German (English to standard German as spoken in Germany) content and setup data, one tab per database table, the same shape as the French workbook. Row 1 of each tab is the column names.' },
    { item: 'Column names', notes: 'Kept from French so one engine serves all three courses: the sentences tab\'s french column holds the German text, and accepted_answers directions fr_to_en and en_to_fr mean German to English and English to German.' },
    { item: 'German', notes: 'Standard German as spoken in Germany, with du and Sie. Nouns keep their capital letter in the word list. Order after the Goethe-Institut A1 level (Start Deutsch 1).' },
    { item: 'Sources', notes: 'Sentences: Tatoeba German-English (source_id) or tamago_original (native-speaker check needed). Words: Wiktionary German. Recordings: Lingua Libre (LL-Q188 (deu)).' },
    { item: 'Editing', notes: "Add rows freely. Keep IDs unique and never reuse a retired ID. Set status to 'off' instead of deleting." },
    { item: 'Changes to v1', notes: 'New workbook, made by scripts/make-german-workbook.mjs from the French machinery tabs. Topic packs added the same day, at U200 after Unit 15.' },
  ], ['item', 'notes'])
  put('languages', sheet('languages').map((l) => ({ ...l, status: ['fr', 'es', 'de'].includes(l.lang_id) ? 'active' : l.status })))
  put('units', UNITS.map((u, i) => ({ unit_id: u.id, lang_id: 'de', cefr: 'A1', order: i + 1, title: u.title, topic: u.title, grammar_point: u.grammar, contrast_sets: u.contrast,
    can_do_ids: '', // filled below with the unit's "I can" statements branch_group: `row ${u.row}`, is_topic_pick: 'no', status: 'draft',
    borrowed_sentence_ids: '', topic_id: '', icon_group: '', icon_file: '', topic_node: '' })), [...header('units'), 'topic_node'].filter((c, i, a) => a.indexOf(c) === i))
  // Topic nodes and packs (drafts until reviewed).
  const BUILT = PACKS.filter((p) => !PACK_SKIPPED[p.unit_id])
  const unitRows = XLSX.utils.sheet_to_json(wb.Sheets.units, { defval: '' })
  const blank = Object.fromEntries(Object.keys(unitRows[0]).map((k) => [k, '']))
  unitRows.push({ ...blank, unit_id: 'U100', lang_id: 'de', cefr: 'A1', order: 50, title: 'Your Topic', topic: 'Choose a topic', grammar_point: 'The grammar of Units 1 to 5, on a topic you choose', branch_group: 'row 4', is_topic_pick: 'node', status: 'live' })
  unitRows.push({ ...blank, unit_id: 'U200', lang_id: 'de', cefr: 'A1', order: 60, title: 'Your Topic', // the node for packs on all of A1
    topic: 'Choose a topic', grammar_point: 'All of A1, on a topic you choose', branch_group: 'row 10', is_topic_pick: 'node', status: 'live' })
  for (const p of BUILT) unitRows.push({ ...blank, unit_id: p.unit_id, lang_id: 'de', cefr: 'A1', order: Number(p.unit_id.slice(1)), title: p.title, topic: p.title,
    grammar_point: p.node === 'U100' ? 'Units 1 to 5, with words for this topic' : 'All of A1, with words for this topic', branch_group: 'topic', is_topic_pick: 'yes', status: 'draft', topic_id: p.topic_id, topic_node: p.node })
  wb.Sheets.units = XLSX.utils.json_to_sheet(unitRows)
  // The tree: the same shape as French (one unit, then pairs), each row opening when the row above has finished round
  // 1. Topic nodes and "I can" statements come with the units that need them.
  const rows = [...new Set(UNITS.map((u) => u.row))]
  put('tree_layout', [...UNITS.map((u) => ({ row: u.row, position: UNITS.filter((x) => x.row === u.row).indexOf(u) + 1, unit_id: u.id,
    unlocks_after: rows.indexOf(u.row) ? `row ${rows[rows.indexOf(u.row) - 1]}` : '', notes: '' })),
    { row: 4, position: 1, unit_id: 'U100', unlocks_after: 'row 3', notes: 'choose your topic: the packs with topic_node U100, on Units 1 to 5' },
    { row: 10, position: 1, unit_id: 'U200', unlocks_after: 'row 9', notes: 'a second topic: the packs with topic_node U200, on all of A1' }])
  // "I can" statements: written for the CEFR self-assessment grid, so a German unit on the same topic as a French
  // one takes its statements; the two estar units get their own, checked against the same grid rows.
  const frCanDo = sheet('can_do')
  const SAME = { U01: 'U01', U02: 'U02', U03: 'U03', U04: 'U04', U05: 'U05', U06: 'U06', U07: 'U07', U09: 'U08', U10: 'U09', U11: 'U10', U12: 'U11', U13: 'U12', U14: 'U13' }
  const grid = Object.fromEntries(frCanDo.map((c) => [c.cefr_row, c.cefr_descriptor]))
  const src = frCanDo[0].source.replace(/, (Listening|Reading|Writing|Spoken interaction|Spoken production)$/, '')
  const OWN = {
    U08: [['listening', 'Listening', "I can understand when someone says they don't have something."], ['reading', 'Reading', "I can understand short sentences that say what someone doesn't have or isn't."],
      ['writing', 'Writing', "I can write what I have and what I don't have."], ['speaking', 'Spoken interaction', "I can say that I don't have something, or that something isn't so."]],
    U15: [['listening', 'Listening', "I can understand when someone says what they'd like or what they can do."], ['reading', 'Reading', 'I can understand short sentences about what someone would like or can do.'],
      ['writing', 'Writing', "I can write what I'd like and what I can do."], ['speaking', 'Spoken interaction', 'I can ask for something politely and say what I can do.']],
  }
  let cd = 1
  const canDo = []
  for (const u of UNITS) {
    const rows = SAME[u.id] ? frCanDo.filter((c) => c.unit_id === SAME[u.id]).map((c) => ({ skill: c.skill, cefr_row: c.cefr_row, statement: c.statement }))
      : OWN[u.id].map(([skill, cefr_row, statement]) => ({ skill, cefr_row, statement }))
    u.canDo = rows.map((r) => { const id = `CD${String(cd++).padStart(2, '0')}`; canDo.push({ can_do_id: id, unit_id: u.id, skill: r.skill, cefr: 'A1', statement: r.statement, source: `${src}, A1, ${r.cefr_row}`, cefr_row: r.cefr_row, cefr_descriptor: grid[r.cefr_row] }); return id })
  }
  put('can_do', canDo)
  for (const n of ['sentences', 'words', 'sentence_words', 'qa_answers', 'accepted_answers', 'grammar_notes']) put(n, [])
  // Words, for Wiktionary and the pull.
  let w = 1
  const words = UNITS.flatMap((u) => u.words.map((form) => ({ word_id: `W${String(w++).padStart(3, '0')}`, lang_id: 'de', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '',
    first_unit: u.id, needs_image: 'no', image_file: '', wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#German`, status: 'pull from Wiktionary', notes: '' })))
  for (const [unit, forms] of Object.entries(EXTRA)) for (const form of forms) words.push({ ...words[0], word_id: `W${String(w++).padStart(3, '0')}`, form, first_unit: unit,
    wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#German`, notes: 'added to widen the unit' })
  for (const x of words) if (MOVE[x.form]) x.first_unit = MOVE[x.form]
  let pw = 501
  const taken = new Set(words.map((x) => x.form))
  for (const p of PACKS) for (const form of p.words) {
    const id = `W${pw++}`
    if (PACK_SKIPPED[p.unit_id] || PACK_DROP[p.unit_id]?.includes(form)) continue
    if (taken.has(form)) throw new Error(`${p.unit_id}: ${form} is already in the course`)
    taken.add(form)
    words.push({ ...words[0], word_id: id, form, first_unit: p.unit_id, wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form)}#German`, notes: 'topic pack word' })
  }
  for (const [unit, forms] of Object.entries(PACK_EXTRA)) for (const form of forms) {
    const id = `W${pw++}`
    if (PACK_SKIPPED[unit]) continue
    if (taken.has(form)) throw new Error(`${unit}: ${form} is already in the course`)
    taken.add(form)
    words.push({ ...words[0], word_id: id, form, first_unit: unit, wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form)}#German`, notes: 'topic pack word, added' })
  }
  put('topics_pool', sheet('topics_pool').map((t) => { const p = PACKS.find((x) => x.topic_id === t.topic_id && !PACK_SKIPPED[x.unit_id]); return p ? { ...t, status: `pack: ${p.unit_id}` } : t }))
  wb.SheetNames.splice(wb.SheetNames.indexOf('words'), 1); delete wb.Sheets.words
  put('words', words)
  put('content_pull', sheet('content_pull').map((r) => ({ ...r, rule: String(r.rule).replace(/French/g, 'German').replace(/Elided forms \(j', l'\) count as their word\./, 'Multi-word forms (guten Morgen, nach Hause) count as their word.') })))
  for (const n of ['question_types', 'variants', 'rounds', 'round_type_mix', 'lesson_rules', 'phase1_fallbacks', 'cant_swaps', 'flag_reasons', 'settings_defaults', 'runtime_schema']) put(n, sheet(n))
  // Feedback: the English lines as in French; German lines as drafts, live only once Tatoeba backs them.
  const es = [['FB40', 'correct', 'Sehr gut!', 'Very good!'], ['FB41', 'correct', 'Super!', 'Great!'], ['FB42', 'correct', 'Perfekt!', 'Perfect!'], ['FB43', 'correct', 'Genau!', 'Exactly!'],
    ['FB44', 'correct', 'Richtig!', 'Right!'], ['FB50', 'incorrect', 'Fast!', 'Almost!'], ['FB51', 'incorrect', 'Nicht ganz.', 'Not quite.']]
  put('feedback_phrases', [...sheet('feedback_phrases').filter((f) => f.language === 'en'),
    ...es.map(([phrase_id, context, text, english]) => ({ phrase_id, context, language: 'de', text, english, min_level: 'A1', status: 'draft', notes: 'draft: checked against Tatoeba on import' }))])
  const unitsSheet = XLSX.utils.sheet_to_json(wb.Sheets.units, { defval: '' }).map((r) => ({ ...r, can_do_ids: UNITS.find((u) => u.id === r.unit_id)?.canDo.join(';') ?? '' }))
  wb.Sheets.units = XLSX.utils.json_to_sheet(unitsSheet)
  // The Asking for Help thread (2026-11-10): three help circles, from scripts/lib/help-circles.mjs.
  addHelpCircles(wb, XLSX, 'de')
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: ${UNITS.length} units, ${words.length} words`)
}
