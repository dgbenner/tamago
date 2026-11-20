// The Swedish course's first workbook (Dan, 2026-11-19, branch lang/swedish): standard Swedish, du throughout (the
// formal ni as a polite address is archaic and is kept out of Part 1); the same framework as French, Spanish,
// German, Italian and Portuguese. Built from the French workbook's machinery tabs like the others. Part 1 only:
// 15 situation circles, the three help circles (scripts/lib/help-circles.mjs) and, added after by
// scripts/add-vocab-part1.mjs, three vocabulary circles and two Brush-Up slots. No topic packs yet.
// Swedish choices for Part 1: present tense is one form for every person (jag/du/han/vi talar), ending in -r;
// en words and ett words, the definite as a suffix (en bok → boken, ett hus → huset); plurals -or/-ar/-er/-n or
// none; an adjective before an ett-word adds -t, before a plural or a definite -a; V2 word order; tycker om and
// gillar for liking; det finns for there is; feelings are är + an adjective (jag är trött, jag är hungrig).
// Usage: node scripts/make-swedish-workbook.mjs <french.xlsx> <swedish.xlsx>
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
  { id: 'U01', title: 'Saying Hello', grammar: 'är for who you are: jag är, du är, han är (one form for everyone); en for a or an; nej for no, inte for not', contrast: 'jag|du; ja|nej; en|ett', row: 1,
    words: ['hej', 'hallå', 'ja', 'nej', 'jag', 'du', 'är', 'en', 'ett', 'man', 'kvinna', 'pojke', 'flicka', 'barn', 'och', 'inte'] },
  { id: 'U02', title: 'People and Things', grammar: 'Nouns are en words or ett words; the goes on the end: en bok → boken, ett hus → huset; han and hon for he and she; den and det for it', contrast: 'en|ett; han|hon; stor|liten', row: 2,
    words: ['han', 'hon', 'den', 'det', 'bok', 'hus', 'bil', 'dörr', 'bord', 'läkare', 'lärare', 'stor', 'liten', 'stark'] },
  { id: 'U03', title: 'Polite Phrases', grammar: 'Set phrases; tack for thank you; varsågod for here you are and you are welcome; Hur mår du? and the answer bra', contrast: 'bra|dålig; god morgon|god kväll', row: 2,
    words: ['tack', 'varsågod', 'gärna', 'god morgon', 'god dag', 'god kväll', 'hej då', 'förlåt', 'ursäkta', 'hur', 'mår', 'bra', 'dålig'] },
  { id: 'U04', title: 'Food and Drink', grammar: 'Present tense ends in -r for everyone: jag äter, du äter; jag dricker, du dricker; tycker om for liking: jag tycker om kaffe', contrast: 'äter|dricker; tycker|gillar', row: 3,
    words: ['äter', 'dricker', 'tycker', 'om', 'gillar', 'bröd', 'vatten', 'mjölk', 'ost', 'äpple', 'kaffe', 'te', 'vin', 'god'] },
  { id: 'U05', title: 'Pets and Animals', grammar: 'har for having: jag har, du har, han har (one form for everyone)', contrast: 'har|är; hund|katt', row: 3,
    words: ['har', 'hund', 'katt', 'häst', 'fågel', 'fisk', 'mus', 'kanin', 'djur'] },
  { id: 'U06', title: 'More Than One', grammar: 'Plurals: en words add -or, -ar or -er, many ett words add -n or stay the same; vi, ni, de for we, you, they', contrast: 'hund|hundar; äpple|äpplen; en|flera', row: 5,
    words: ['vi', 'ni', 'de', 'hundar', 'katter', 'böcker', 'bilar', 'män', 'kvinnor', 'äpplen', 'många', 'flera'] },
  { id: 'U07', title: 'Describing Things', grammar: 'An adjective before an en word is plain, before an ett word adds -t: en fin bil, ett fint hus; mycket for very, också for also', contrast: 'fin|ful; gammal|ny; ung|gammal', row: 5,
    words: ['fin', 'ful', 'gammal', 'ny', 'ung', 'mycket', 'också', 'cykel', 'rolig', 'snäll'] },
  { id: 'U08', title: 'Where Things Are', grammar: 'står, ligger and är for where something is; i, på, under for in, on, under; här and där; det finns for there is', contrast: 'här|där; på|under; i|på', row: 6,
    words: ['står', 'ligger', 'i', 'på', 'under', 'bredvid', 'här', 'där', 'finns', 'kök', 'badrum', 'trädgård', 'rum', 'säng'] },
  { id: 'U09', title: 'How You Feel', grammar: 'är for feelings: jag är trött, jag är glad; hungrig and törstig are adjectives too: jag är hungrig', contrast: 'trött|glad; hungrig|törstig; kall|varm', row: 6,
    words: ['trött', 'glad', 'ledsen', 'sjuk', 'arg', 'rädd', 'hungrig', 'törstig', 'kall', 'varm'] },
  { id: 'U10', title: 'Mine and Yours', grammar: 'Possessives: min/mitt, din/ditt (en word takes min, ett word takes mitt); hans for his, hennes for her; vår for our; family words', contrast: 'min|din; hans|hennes; mamma|pappa', row: 7,
    words: ['min', 'mitt', 'din', 'hans', 'hennes', 'vår', 'vän', 'familj', 'mamma', 'pappa', 'bror', 'syster'] },
  { id: 'U11', title: 'Asking Questions', grammar: 'Question words come first: vem, vad, var, när, varför, vilken; eftersom in the answer', contrast: 'vem|vad; var|när; varför|eftersom', row: 7,
    words: ['vem', 'vad', 'var', 'när', 'varför', 'eftersom', 'vilken'] },
  { id: 'U12', title: 'Counting to Ten', grammar: 'Numbers one to ten; ett and en both mean one (ett hus, en bok); … år for an age', contrast: 'två|tre; fem|sex', row: 8,
    words: ['två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'år'] },
  { id: 'U13', title: 'Naming Colors', grammar: 'A color after är: bilen är röd; before an ett word it adds -t: ett rött hus; färg for color', contrast: 'röd|blå; svart|vit', row: 8,
    words: ['röd', 'blå', 'grön', 'svart', 'vit', 'gul', 'brun', 'färg'] },
  { id: 'U14', title: 'Days and Times', grammar: 'Time words: idag, imorgon, nu; days have no capital; Vad är klockan? for the time', contrast: 'idag|imorgon; dag|vecka', row: 9,
    words: ['idag', 'imorgon', 'nu', 'dag', 'vecka', 'timme', 'måndag', 'lördag', 'söndag', 'klockan'] },
  { id: 'U15', title: 'Going Places', grammar: 'går and åker for going: jag går, jag åker; till for to a place', contrast: 'går|åker; till|från', row: 9,
    words: ['går', 'åker', 'till', 'från', 'park', 'skola', 'affär', 'stad', 'restaurang', 'gata'] },
]

// Widening after the pull (autonomous-build.md); new words take the next ids. Moves change a word's first unit.
export const EXTRA = {}
export const MOVE = {}

if (process.argv[1] === import.meta.filename) {
  put('README', [
    { item: 'Version', notes: 'Swedish workbook v1, 2026-11-19. The 15 A1 units as drafts with their words; no sentences yet.' },
    { item: 'What this is', notes: 'Tamago Swedish (English to standard Swedish) content and setup data, one tab per database table, the same shape as the French workbook. Row 1 of each tab is the column names.' },
    { item: 'Column names', notes: 'Kept from French so one engine serves every course: the sentences tab\'s french column holds the Swedish text, and accepted_answers directions fr_to_en and en_to_fr mean Swedish to English and English to Swedish.' },
    { item: 'Swedish', notes: 'Standard Swedish, du throughout (the formal ni as a polite address is archaic and is kept out of Part 1). The A1 list is the Swedish Kelly list (Kelly project, Språkbanken), CEFR-graded, headwords only.' },
    { item: 'Sources', notes: 'Sentences: Tatoeba Swedish-English (source_id) or tamago_original (native-speaker check needed). Words: Wiktionary Swedish. Recordings: Lingua Libre (LL-Q9027 (swe)).' },
    { item: 'Editing', notes: "Add rows freely. Keep IDs unique and never reuse a retired ID. Set status to 'off' instead of deleting." },
    { item: 'Changes to v1', notes: 'New workbook, made by scripts/make-swedish-workbook.mjs from the French machinery tabs. Part 1 only; no topic packs.' },
  ], ['item', 'notes'])
  put('languages', [...sheet('languages').map((l) => ({ ...l, status: ['fr', 'es', 'de'].includes(l.lang_id) ? 'active' : l.status })), { lang_id: 'sv', name: 'Swedish', ui_language: 'en', status: 'active', order: 7 }])
  put('units', UNITS.map((u, i) => ({ unit_id: u.id, lang_id: 'sv', cefr: 'A1', order: i + 1, title: u.title, topic: u.title, grammar_point: u.grammar, contrast_sets: u.contrast,
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
  const words = UNITS.flatMap((u) => u.words.map((form) => ({ word_id: `W${String(w++).padStart(3, '0')}`, lang_id: 'sv', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '',
    first_unit: u.id, needs_image: 'no', image_file: '', wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Swedish`, status: 'pull from Wiktionary', notes: '' })))
  for (const [unit, forms] of Object.entries(EXTRA)) for (const form of forms) words.push({ ...words[0], word_id: `W${String(w++).padStart(3, '0')}`, form, first_unit: unit,
    wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Swedish`, notes: 'added to widen the unit' })
  for (const x of words) if (MOVE[x.form]) x.first_unit = MOVE[x.form]
  put('topics_pool', sheet('topics_pool'))
  wb.SheetNames.splice(wb.SheetNames.indexOf('words'), 1); delete wb.Sheets.words
  put('words', words)
  put('content_pull', sheet('content_pull').map((r) => ({ ...r, rule: String(r.rule).replace(/French/g, 'Swedish').replace(/Elided forms \(j', l'\) count as their word\./, 'Multi-word forms (god morgon, hej då) count as their word.') })))
  for (const n of ['question_types', 'variants', 'rounds', 'round_type_mix', 'lesson_rules', 'phase1_fallbacks', 'cant_swaps', 'flag_reasons', 'settings_defaults', 'runtime_schema']) put(n, sheet(n))
  const svFb = [['FB40', 'correct', 'Mycket bra!', 'Very good!'], ['FB41', 'correct', 'Bra gjort!', 'Well done!'], ['FB42', 'correct', 'Perfekt!', 'Perfect!'], ['FB43', 'correct', 'Precis!', 'Exactly!'],
    ['FB44', 'correct', 'Rätt!', 'Right!'], ['FB50', 'incorrect', 'Nästan!', 'Almost!'], ['FB51', 'incorrect', 'Inte riktigt.', 'Not quite.']]
  put('feedback_phrases', [...sheet('feedback_phrases').filter((f) => f.language === 'en'),
    ...svFb.map(([phrase_id, context, text, english]) => ({ phrase_id, context, language: 'sv', text, english, min_level: 'A1', status: 'draft', notes: 'draft: checked against Tatoeba on import' }))])
  const unitsSheet = XLSX.utils.sheet_to_json(wb.Sheets.units, { defval: '' }).map((r) => ({ ...r, can_do_ids: UNITS.find((u) => u.id === r.unit_id)?.canDo.join(';') ?? '' }))
  wb.Sheets.units = XLSX.utils.json_to_sheet(unitsSheet)
  addHelpCircles(wb, XLSX, 'sv')
  addA1Plan(wb, XLSX, 'sv')
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: ${UNITS.length} units, ${words.length} words`)
}
