// The Danish course's first workbook (Dan, 2026-11-19, branch lang/danish): standard Danish, modern du (the formal
// De is archaic and kept out of Part 1); the same framework as French, Spanish, German, Italian, Portuguese and
// Dutch. Built from the French workbook's machinery tabs like the others. Part 1 only: 15 situation circles, the
// three help circles (scripts/lib/help-circles.mjs) and, added after by scripts/add-vocab-part1.mjs, three
// vocabulary circles and two Brush-Up slots. No topic packs yet.
// Danish choices for Part 1: present tense is one form for every person (jeg er, du er; jeg taler, vi taler); en
// (common) and et (neuter) for a; the definite is a suffix (manden the man), taught in the notes, not as vocab;
// plurals -er, -e or a vowel change; an adjective adds -t with an et-word and -e before a noun or in the plural;
// kan lide for liking; der er for there is; feelings take være (jeg er sulten, jeg er træt).
// Usage: node scripts/make-danish-workbook.mjs <french.xlsx> <danish.xlsx>
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
  { id: 'U01', title: 'Saying Hello', grammar: 'være for who you are: jeg er, du er, han er; en for a with a common word and et with a neuter one; nej for no, ikke for not', contrast: 'er|ikke; ja|nej; en|et', row: 1,
    words: ['hej', 'goddag', 'ja', 'nej', 'ikke', 'jeg', 'du', 'er', 'en', 'et', 'mand', 'kvinde', 'dreng', 'pige', 'barn', 'og'] },
  { id: 'U02', title: 'People and Things', grammar: 'han and hun for he and she; den and det for it; a job takes no en or et: han er læge; stor and lille for big and small', contrast: 'han|hun; den|det; stor|lille', row: 2,
    words: ['han', 'hun', 'den', 'det', 'bog', 'hus', 'læge', 'lærer', 'stor', 'lille', 'stærk', 'dør', 'bord'] },
  { id: 'U03', title: 'Polite Phrases', grammar: 'Set phrases; tak for thank you; Hvordan går det? and the answer godt', contrast: 'godt|dårligt; godmorgen|godaften', row: 2,
    words: ['tak', 'godmorgen', 'godaften', 'farvel', 'undskyld', 'hvordan', 'går', 'godt', 'dårligt', 'fint', 'velkommen'] },
  { id: 'U04', title: 'Food and Drink', grammar: 'Present tense is one form for every person: jeg spiser, du spiser; jeg drikker; kan lide for liking: jeg kan lide kaffe', contrast: 'spiser|drikker; brød|vand', row: 3,
    words: ['spiser', 'drikker', 'kan', 'lide', 'brød', 'vand', 'mælk', 'ost', 'æble', 'kaffe', 'te', 'vin', 'lækker'] },
  { id: 'U05', title: 'Pets and Animals', grammar: 'have for having, one form for every person: jeg har, du har, han har', contrast: 'hund|kat; har|er', row: 3,
    words: ['har', 'hund', 'kat', 'hest', 'fugl', 'fisk', 'mus', 'kanin', 'dyr'] },
  { id: 'U06', title: 'More Than One', grammar: 'Plurals add -er or -e or change the vowel; vi and de for we and they; vi er, de er; vi har', contrast: 'hund|hunde; mand|mænd; stor|store', row: 5,
    words: ['vi', 'de', 'hunde', 'katte', 'bøger', 'huse', 'mænd', 'kvinder', 'børn', 'æbler', 'venner', 'mange', 'store'] },
  { id: 'U07', title: 'Describing Things', grammar: 'An adjective after er stays plain; before a noun it adds -e: en gammel bil, den gamle bil; meget for very, også for also', contrast: 'smuk|grim; gammel|ny; ung|gammel', row: 5,
    words: ['smuk', 'grim', 'gammel', 'ny', 'ung', 'meget', 'også', 'bil', 'cykel', 'god', 'sjov'] },
  { id: 'U08', title: 'Where Things Are', grammar: 'står and ligger and er for where something is; i, på, under; her and der; der er for there is', contrast: 'her|der; på|under; i|på', row: 6,
    words: ['står', 'ligger', 'i', 'på', 'under', 'her', 'der', 'køkken', 'badeværelse', 'have', 'værelse', 'seng'] },
  { id: 'U09', title: 'How You Feel', grammar: 'være for feelings: jeg er træt, jeg er glad; hungry and thirsty take være too: jeg er sulten, jeg er tørstig', contrast: 'træt|glad; sulten|tørstig; varm|kold', row: 6,
    words: ['træt', 'glad', 'trist', 'syg', 'vred', 'bange', 'sulten', 'tørstig', 'varm', 'kold'] },
  { id: 'U10', title: 'Mine and Yours', grammar: 'Possessives: min and mit, din and dit, hans and hendes; vores for our; family words', contrast: 'min|din; hans|hendes; far|mor', row: 7,
    words: ['min', 'mit', 'din', 'dit', 'hans', 'hendes', 'vores', 'ven', 'veninde', 'familie', 'far', 'mor', 'bror', 'søster'] },
  { id: 'U11', title: 'Asking Questions', grammar: 'Question words come first: hvem, hvad, hvor, hvornår, hvorfor, hvilken; fordi in the answer', contrast: 'hvem|hvad; hvor|hvornår; hvorfor|fordi', row: 7,
    words: ['hvem', 'hvad', 'hvor', 'hvornår', 'hvorfor', 'fordi', 'hvilken'] },
  { id: 'U12', title: 'Counting to Ten', grammar: 'Numbers one to ten; hvor mange for how many; … år for an age', contrast: 'to|tre; fire|fem', row: 8,
    words: ['to', 'tre', 'fire', 'fem', 'seks', 'syv', 'otte', 'ni', 'ti', 'år'] },
  { id: 'U13', title: 'Naming Colours', grammar: 'A colour after er: bilen er rød; before a noun it adds -t with an et-word and -e in the plural; farve for colour', contrast: 'rød|blå; sort|hvid', row: 8,
    words: ['rød', 'blå', 'grøn', 'sort', 'hvid', 'gul', 'brun', 'farve'] },
  { id: 'U14', title: 'Days and Times', grammar: 'Time words: i dag, i morgen, nu; days of the week have no capital; Hvad er klokken? for the time', contrast: 'i dag|i morgen; dag|uge', row: 9,
    words: ['i dag', 'i morgen', 'nu', 'dag', 'uge', 'time', 'mandag', 'lørdag', 'søndag', 'klokken'] },
  { id: 'U15', title: 'Going Places', grammar: 'gå for going: jeg går, du går, vi går; til for to a place', contrast: 'park|skole; by|gade', row: 9,
    words: ['til', 'park', 'skole', 'butik', 'by', 'restaurant', 'gade'] },
]

// Widening after the pull (autonomous-build.md); new words take the next ids. Moves change a word's first unit.
export const EXTRA = {}
export const MOVE = {}

if (process.argv[1] === import.meta.filename) {
  put('README', [
    { item: 'Version', notes: 'Danish workbook v1, 2026-11-19. The 15 A1 units as drafts with their words; no sentences yet.' },
    { item: 'What this is', notes: 'Tamago Danish (English to standard Danish) content and setup data, one tab per database table, the same shape as the French workbook. Row 1 of each tab is the column names.' },
    { item: 'Column names', notes: 'Kept from French so one engine serves every course: the sentences tab\'s french column holds the Danish text, and accepted_answers directions fr_to_en and en_to_fr mean Danish to English and English to Danish.' },
    { item: 'Danish', notes: 'Standard Danish, modern du (the formal De is archaic and kept out of Part 1). The A1 list is a frequency stand-in (hermitdave FrequencyWords, OpenSubtitles 2018); no free CEFR Danish A1 inventory exists.' },
    { item: 'Sources', notes: 'Sentences: Tatoeba Danish-English (source_id) or tamago_original (native-speaker check needed). Words: Wiktionary Danish. Recordings: Lingua Libre (LL-Q9035 (dan)).' },
    { item: 'Editing', notes: "Add rows freely. Keep IDs unique and never reuse a retired ID. Set status to 'off' instead of deleting." },
    { item: 'Changes to v1', notes: 'New workbook, made by scripts/make-danish-workbook.mjs from the French machinery tabs. Part 1 only; no topic packs.' },
  ], ['item', 'notes'])
  put('languages', [...sheet('languages').map((l) => ({ ...l, status: ['fr', 'es', 'de'].includes(l.lang_id) ? 'active' : l.status })), { lang_id: 'da', name: 'Danish', ui_language: 'en', status: 'active', order: 7 }])
  put('units', UNITS.map((u, i) => ({ unit_id: u.id, lang_id: 'da', cefr: 'A1', order: i + 1, title: u.title, topic: u.title, grammar_point: u.grammar, contrast_sets: u.contrast,
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
  const words = UNITS.flatMap((u) => u.words.map((form) => ({ word_id: `W${String(w++).padStart(3, '0')}`, lang_id: 'da', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '',
    first_unit: u.id, needs_image: 'no', image_file: '', wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Danish`, status: 'pull from Wiktionary', notes: '' })))
  for (const [unit, forms] of Object.entries(EXTRA)) for (const form of forms) words.push({ ...words[0], word_id: `W${String(w++).padStart(3, '0')}`, form, first_unit: unit,
    wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Danish`, notes: 'added to widen the unit' })
  for (const x of words) if (MOVE[x.form]) x.first_unit = MOVE[x.form]
  put('topics_pool', sheet('topics_pool'))
  wb.SheetNames.splice(wb.SheetNames.indexOf('words'), 1); delete wb.Sheets.words
  put('words', words)
  put('content_pull', sheet('content_pull').map((r) => ({ ...r, rule: String(r.rule).replace(/French/g, 'Danish').replace(/Elided forms \(j', l'\) count as their word\./, 'Multi-word forms (i dag, i morgen, vær så god) count as their word.') })))
  for (const n of ['question_types', 'variants', 'rounds', 'round_type_mix', 'lesson_rules', 'phase1_fallbacks', 'cant_swaps', 'flag_reasons', 'settings_defaults', 'runtime_schema']) put(n, sheet(n))
  const daFb = [['FB40', 'correct', 'Rigtig godt!', 'Very good!'], ['FB41', 'correct', 'Godt klaret!', 'Well done!'], ['FB42', 'correct', 'Perfekt!', 'Perfect!'], ['FB43', 'correct', 'Præcis!', 'Exactly!'],
    ['FB44', 'correct', 'Rigtigt!', 'Right!'], ['FB50', 'incorrect', 'Næsten!', 'Almost!'], ['FB51', 'incorrect', 'Ikke helt.', 'Not quite.']]
  put('feedback_phrases', [...sheet('feedback_phrases').filter((f) => f.language === 'en'),
    ...daFb.map(([phrase_id, context, text, english]) => ({ phrase_id, context, language: 'da', text, english, min_level: 'A1', status: 'draft', notes: 'draft: checked against Tatoeba on import' }))])
  const unitsSheet = XLSX.utils.sheet_to_json(wb.Sheets.units, { defval: '' }).map((r) => ({ ...r, can_do_ids: UNITS.find((u) => u.id === r.unit_id)?.canDo.join(';') ?? '' }))
  wb.Sheets.units = XLSX.utils.json_to_sheet(unitsSheet)
  addHelpCircles(wb, XLSX, 'da')
  addA1Plan(wb, XLSX, 'da')
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: ${UNITS.length} units, ${words.length} words`)
}
