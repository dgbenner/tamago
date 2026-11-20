// The Norwegian course's first workbook (Dan, 2026-11-19, branch lang/norwegian): standard written Bokmål, du
// throughout (De, the formal you, is archaic and kept out of Part 1); the same framework as French, Spanish, German,
// Italian, Portuguese and Dutch. Built from the French workbook's machinery tabs like the others. Part 1 only:
// 15 situation circles, the three help circles (scripts/lib/help-circles.mjs) and, added after by
// scripts/add-vocab-part1.mjs, three vocabulary circles and two Brush-Up slots. No topic packs yet.
// Norwegian choices for Part 1: present tense is one form for every person (jeg er, du er, han er; jeg spiser, du
// spiser); the definite is a suffix (mann → mannen, hus → huset), taught in the note; en and et articles (ei kept
// aside, Bokmål allows en for most feminine nouns); plurals add -er, some et-words don't change; an adjective adds -t
// with an et-word (et fint hus); like for liking (jeg liker kaffe); det er for there is; feelings are adjectives with
// være (jeg er sulten, jeg er tørst, jeg er kald).
// Usage: node scripts/make-norwegian-workbook.mjs <french.xlsx> <norwegian.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
import { addHelpCircles } from './lib/help-circles.mjs'
import { addA1Plan } from './lib/a1-plan.mjs'
const ROOT = join(import.meta.dirname, '..')
const [from, to] = process.argv.slice(2)
const fr = XLSX.readFile(join(ROOT, from))
const sheet = (n) => XLSX.utils.sheet_to_json(fr.Sheets[n], { defval: '' })
const header = (n) => XLSX.utils.sheet_to_json(fr.Sheets[n], { header: 1, defval: '' })[0]
const wb = XLSX.utils.book_new()
const put = (n, rows, cols = header(n)) => XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows, { header: cols }), n)

export const UNITS = [
  { id: 'U01', title: 'Saying Hello', grammar: 'være for who you are: jeg er, du er, han er, all one form; en or et for a; nei for no, ikke for not', contrast: 'ja|nei; en|et; mann|kvinne', row: 1,
    words: ['hei', 'hallo', 'ja', 'nei', 'ikke', 'jeg', 'du', 'er', 'en', 'et', 'mann', 'kvinne', 'gutt', 'jente', 'barn', 'og'] },
  { id: 'U02', title: 'People and Things', grammar: 'The is a suffix: -en on an en-word (mann → mannen), -et on an et-word (hus → huset); han and hun for he and she; den and det for it; a job takes no article: han er lege', contrast: 'han|hun; den|det; stor|liten', row: 2,
    words: ['han', 'hun', 'den', 'det', 'denne', 'dette', 'bok', 'hus', 'lege', 'lærer', 'stor', 'liten', 'dør', 'bord'] },
  { id: 'U03', title: 'Polite Phrases', grammar: 'Set phrases; takk for thank you; vær så snill for please, vær så god for here you are; Hvordan går det? and the answer bra', contrast: 'bra|dårlig; god morgen|god kveld', row: 2,
    words: ['takk', 'vær så snill', 'vær så god', 'god morgen', 'god dag', 'god kveld', 'ha det', 'unnskyld', 'beklager', 'hvordan', 'går', 'bra', 'dårlig', 'fint'] },
  { id: 'U04', title: 'Food and Drink', grammar: 'Present tense is one form: jeg spiser, du spiser, han spiser; liker for liking: jeg liker kaffe', contrast: 'spiser|drikker; kaffe|te', row: 3,
    words: ['spiser', 'drikker', 'liker', 'brød', 'vann', 'melk', 'ost', 'eple', 'kaffe', 'te', 'vin', 'deilig'] },
  { id: 'U05', title: 'Pets and Animals', grammar: 'ha for having: jeg har, du har, han har, one form', contrast: 'har|er; hund|katt', row: 3,
    words: ['har', 'hund', 'katt', 'hest', 'fugl', 'fisk', 'mus', 'kanin', 'dyr'] },
  { id: 'U06', title: 'More Than One', grammar: 'Plurals add -er (hund → hunder); some et-words do not change (hus → hus); vi, dere, de for we, you and they', contrast: 'hund|hunder; eple|epler', row: 5,
    words: ['vi', 'dere', 'de', 'hunder', 'katter', 'bøker', 'menn', 'kvinner', 'epler', 'venner', 'mange', 'to'] },
  { id: 'U07', title: 'Describing Things', grammar: 'An adjective adds -t with an et-word: en fin bil, et fint hus; veldig for very, også for also', contrast: 'fin|stygg; gammel|ny; ung|gammel', row: 5,
    words: ['fin', 'stygg', 'gammel', 'ny', 'ung', 'veldig', 'også', 'bil', 'sykkel', 'gøy'] },
  { id: 'U08', title: 'Where Things Are', grammar: 'står, ligger and er for where something is; i, på, under for in, on, under; her and der; det er for there is', contrast: 'her|der; på|under; i|på', row: 6,
    words: ['står', 'ligger', 'i', 'på', 'under', 'ved', 'her', 'der', 'kjøkken', 'bad', 'hage', 'rom', 'seng'] },
  { id: 'U09', title: 'How You Feel', grammar: 'være for feelings: jeg er trøtt, jeg er glad; sulten, tørst and kald are adjectives too: jeg er sulten, jeg er tørst', contrast: 'trøtt|glad; sulten|tørst; kald|varm', row: 6,
    words: ['trøtt', 'glad', 'trist', 'syk', 'sint', 'redd', 'sulten', 'tørst', 'kald', 'varm'] },
  { id: 'U10', title: 'Mine and Yours', grammar: 'Possessives come after the noun or before it: min, din, hans (his), hennes (her), vår (our); family words', contrast: 'min|din; hans|hennes; far|mor', row: 7,
    words: ['min', 'din', 'hans', 'hennes', 'vår', 'venn', 'venninne', 'familie', 'far', 'mor', 'bror', 'søster'] },
  { id: 'U11', title: 'Asking Questions', grammar: 'Question words come first: hvem, hva, hvor, når, hvorfor, hvilken; fordi in the answer', contrast: 'hvem|hva; hvor|når; hvorfor|fordi', row: 7,
    words: ['hvem', 'hva', 'hvor', 'når', 'hvorfor', 'fordi', 'hvilken'] },
  { id: 'U12', title: 'Counting to Ten', grammar: 'Numbers one to ten; hvor mange for how many; … år for an age', contrast: 'to|tre; ni|ti', row: 8,
    words: ['én', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'år'] },
  { id: 'U13', title: 'Naming Colours', grammar: 'A colour after er: bilen er rød; before a noun it agrees and adds -t with an et-word: en rød bil, et rødt hus; farge for colour', contrast: 'rød|blå; svart|hvit', row: 8,
    words: ['rød', 'blå', 'grønn', 'svart', 'hvit', 'gul', 'brun', 'farge'] },
  { id: 'U14', title: 'Days and Times', grammar: 'Time words: i dag, i morgen, nå; days have no capital; Hva er klokka? for the time', contrast: 'i dag|i morgen; dag|uke', row: 9,
    words: ['i dag', 'i morgen', 'nå', 'dag', 'uke', 'time', 'mandag', 'lørdag', 'søndag', 'sent'] },
  { id: 'U15', title: 'Going Places', grammar: 'gå for going: jeg går, du går, vi går, one form; til for to a place', contrast: 'går|gå; by|gate', row: 9,
    words: ['gå', 'til', 'park', 'skole', 'butikk', 'by', 'restaurant', 'gate'] },
]

// Widening after the pull (autonomous-build.md); new words take the next ids. Moves change a word's first unit.
export const EXTRA = {}
export const MOVE = {}

if (process.argv[1] === import.meta.filename) {
  put('README', [
    { item: 'Version', notes: 'Norwegian workbook v1, 2026-11-19. The 15 A1 units as drafts with their words; no sentences yet.' },
    { item: 'What this is', notes: 'Tamago Norwegian (English to standard Bokmål) content and setup data, one tab per database table, the same shape as the French workbook. Row 1 of each tab is the column names.' },
    { item: 'Column names', notes: 'Kept from French so one engine serves every course: the sentences tab\'s french column holds the Norwegian text, and accepted_answers directions fr_to_en and en_to_fr mean Norwegian to English and English to Norwegian.' },
    { item: 'Norwegian', notes: 'Standard written Bokmål, du throughout (De, the formal you, is archaic and kept out of Part 1). The A1 list is the Norwegian Kelly list (KELLY project, CEFR-graded, CC BY), its A1 band the core target.' },
    { item: 'Sources', notes: 'Sentences: Tatoeba Norwegian Bokmål-English (source_id) or tamago_original (native-speaker check needed). Words: Wiktionary Norwegian Bokmål. Recordings: Lingua Libre (LL-Q25167 (nob)).' },
    { item: 'Editing', notes: "Add rows freely. Keep IDs unique and never reuse a retired ID. Set status to 'off' instead of deleting." },
    { item: 'Changes to v1', notes: 'New workbook, made by scripts/make-norwegian-workbook.mjs from the French machinery tabs. Part 1 only; no topic packs.' },
  ], ['item', 'notes'])
  put('languages', [...sheet('languages').map((l) => ({ ...l, status: ['fr', 'es', 'de'].includes(l.lang_id) ? 'active' : l.status })), { lang_id: 'no', name: 'Norwegian', ui_language: 'en', status: 'active', order: 9 }])
  put('units', UNITS.map((u, i) => ({ unit_id: u.id, lang_id: 'no', cefr: 'A1', order: i + 1, title: u.title, topic: u.title, grammar_point: u.grammar, contrast_sets: u.contrast,
    can_do_ids: '', branch_group: `row ${u.row}`, is_topic_pick: 'no', status: 'draft',
    borrowed_sentence_ids: '', topic_id: '', icon_group: '', icon_file: '', topic_node: '' })), [...header('units'), 'topic_node'].filter((c, i, a) => a.indexOf(c) === i))
  const rows = [...new Set(UNITS.map((u) => u.row))]
  put('tree_layout', [...UNITS.map((u) => ({ row: u.row, position: UNITS.filter((x) => x.row === u.row).indexOf(u) + 1, unit_id: u.id,
    unlocks_after: rows.indexOf(u.row) ? `row ${rows[rows.indexOf(u.row) - 1]}` : '', notes: '' }))])
  const frCanDo = sheet('can_do')
  const SAME = { U01: 'U01', U02: 'U02', U03: 'U03', U04: 'U04', U05: 'U05', U06: 'U06', U07: 'U07', U10: 'U08', U11: 'U09', U12: 'U10', U13: 'U11', U14: 'U12', U15: 'U13' }
  const grid = Object.fromEntries(frCanDo.map((c) => [c.cefr_row, c.cefr_descriptor]))
  const src = frCanDo[0].source.replace(/, (Listening|Reading|Writing|Spoken interaction|Spoken production)$/, '')
  const OWN = {
    U08: [['listening', 'Listening', 'I can understand when someone says where something is.'], ['reading', 'Reading', 'I can understand short sentences that say where things are and what there is.'],
      ['writing', 'Writing', 'I can write where something is.'], ['speaking', 'Spoken interaction', 'I can ask and say where something is.']],
    U09: [['listening', 'Listening', 'I can understand when someone says how they feel.'], ['reading', 'Reading', 'I can understand short sentences about how someone feels.'],
      ['writing', 'Writing', 'I can write how I feel.'], ['speaking', 'Spoken interaction', 'I can say how I feel: tired, happy, ill, hungry, thirsty.']],
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
  let w = 1
  const words = UNITS.flatMap((u) => u.words.map((form) => ({ word_id: `W${String(w++).padStart(3, '0')}`, lang_id: 'no', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '',
    first_unit: u.id, needs_image: 'no', image_file: '', wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Norwegian_Bokmål`, status: 'pull from Wiktionary', notes: '' })))
  for (const [unit, forms] of Object.entries(EXTRA)) for (const form of forms) words.push({ ...words[0], word_id: `W${String(w++).padStart(3, '0')}`, form, first_unit: unit,
    wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Norwegian_Bokmål`, notes: 'added to widen the unit' })
  for (const x of words) if (MOVE[x.form]) x.first_unit = MOVE[x.form]
  put('topics_pool', sheet('topics_pool'))
  wb.SheetNames.splice(wb.SheetNames.indexOf('words'), 1); delete wb.Sheets.words
  put('words', words)
  put('content_pull', sheet('content_pull').map((r) => ({ ...r, rule: String(r.rule).replace(/French/g, 'Norwegian').replace(/Elided forms \(j', l'\) count as their word\./, 'Multi-word forms (i dag, god morgen) count as their word.') })))
  for (const n of ['question_types', 'variants', 'rounds', 'round_type_mix', 'lesson_rules', 'phase1_fallbacks', 'cant_swaps', 'flag_reasons', 'settings_defaults', 'runtime_schema']) put(n, sheet(n))
  const noFb = [['FB40', 'correct', 'Veldig bra!', 'Very good!'], ['FB41', 'correct', 'Bra jobbet!', 'Well done!'], ['FB42', 'correct', 'Perfekt!', 'Perfect!'], ['FB43', 'correct', 'Nettopp!', 'Exactly!'],
    ['FB44', 'correct', 'Riktig!', 'Right!'], ['FB50', 'incorrect', 'Nesten!', 'Almost!'], ['FB51', 'incorrect', 'Ikke helt.', 'Not quite.']]
  put('feedback_phrases', [...sheet('feedback_phrases').filter((f) => f.language === 'en'),
    ...noFb.map(([phrase_id, context, text, english]) => ({ phrase_id, context, language: 'no', text, english, min_level: 'A1', status: 'draft', notes: 'draft: checked against Tatoeba on import' }))])
  const unitsSheet = XLSX.utils.sheet_to_json(wb.Sheets.units, { defval: '' }).map((r) => ({ ...r, can_do_ids: UNITS.find((u) => u.id === r.unit_id)?.canDo.join(';') ?? '' }))
  wb.Sheets.units = XLSX.utils.json_to_sheet(unitsSheet)
  addHelpCircles(wb, XLSX, 'no')
  addA1Plan(wb, XLSX, 'no')
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: ${UNITS.length} units, ${words.length} words`)
}
