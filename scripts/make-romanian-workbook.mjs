// The Romanian course's first workbook (Builder 2, 2026-11-21, branch content/ro-a1): standard Romanian as spoken in
// Romania, tu informally (dumneavoastră, the formal you, is kept out of Part 1); the same framework as French, Spanish,
// German, Italian, Portuguese, Dutch and the Scandinavian courses. Built from the French workbook's machinery tabs like
// the others. Part 1 only: 15 situation circles, the three help circles (scripts/lib/help-circles.mjs) and, added after
// by scripts/add-vocab-part1.mjs, three vocabulary circles and two Brush-Up slots. No topic packs yet.
// Romanian choices for Part 1: the definite article is a suffix (băiat → băiatul, fată → fata, carte → cartea), and the
// analyser matches exact forms, so each circle lists the definite forms its sentences use, taught as forms of their own;
// indefinite un and o are separate words. Only the nominative-accusative: genitive-dative forms (lui Tom, Mariei,
// mamei) stay out of Part 1, so their lines are not pulled. Liking is the set phrase îmi place / îți place (and plac for
// a plural thing), taught as a phrase, not as the dative. Feelings: a fi with an adjective that agrees (sunt obosit,
// sunt obosită), and the set phrase mi-e foame, mi-e sete. tu throughout; voi is only the plural you.
// The old cedilla letters ş ţ are not Romanian spelling: lines written with them are never matched (the course's
// forms use ș ț), and nor are lines written without diacritics.
// Usage: node scripts/make-romanian-workbook.mjs <french.xlsx> <romanian.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
import { addHelpCircles } from './lib/help-circles.mjs'
import { addA1Plan } from './lib/a1-plan.mjs'
const ROOT = join(import.meta.dirname, '..')
const [from, to] = process.argv.slice(2)

export const UNITS = [
  { id: 'U01', title: 'Saying Hello', grammar: 'a fi for who you are: eu sunt, tu ești, el este (or e); un and o for a; nu for no and not', contrast: 'da|nu; un|o; bărbat|femeie', row: 1,
    words: ['salut', 'da', 'nu', 'eu', 'tu', 'sunt', 'ești', 'este', 'e', 'un', 'o', 'bărbat', 'femeie', 'băiat', 'fată', 'copil', 'și', 'aici'] },
  { id: 'U02', title: 'People and Things', grammar: 'The is a suffix: băiat → băiatul, fată → fata, carte → cartea; el and ea for he and she; asta and acesta for this; a job takes no article: el este profesor', contrast: 'el|ea; carte|cartea; mare|mic', row: 2,
    words: ['el', 'ea', 'asta', 'acesta', 'aceasta', 'carte', 'cartea', 'casă', 'casa', 'profesor', 'mare', 'mic', 'mică', 'ușa', 'masă', 'masa', 'fata'] },
  { id: 'U03', title: 'Polite Phrases', grammar: 'Set phrases: mulțumesc for thank you, te rog for please, îmi pare rău for sorry; Ce faci? and the answer bine', contrast: 'bună ziua|bună seara; bine|foarte', row: 2,
    words: ['mulțumesc', 'te rog', 'bună ziua', 'bună dimineața', 'bună seara', 'noapte bună', 'la revedere', 'pa', 'scuze', 'îmi pare rău', 'ce', 'faci', 'bine', 'foarte'] },
  { id: 'U04', title: 'Food and Drink', grammar: 'Present tense: eu mănânc, tu mănânci, el mănâncă; eu beau, tu bei, el bea; îmi place for liking a thing, îmi plac for liking things, nu-mi place for not; cu for with', contrast: 'mănânc|beau; place|plac; cafea|cafeaua', row: 3,
    words: ['mănânc', 'mănânci', 'mănâncă', 'beau', 'bei', 'bea', 'îmi', 'îți', 'nu-mi', 'place', 'plac', 'pâine', 'apă', 'apa', 'lapte', 'cafea', 'cafeaua', 'ceai', 'ceaiul', 'cu'] },
  { id: 'U05', title: 'Pets and Animals', grammar: 'a avea for having: eu am, tu ai, el are', contrast: 'am|ai; câine|pisică', row: 3,
    words: ['am', 'ai', 'are', 'câine', 'câinele', 'pisică', 'pisica', 'cal', 'pasăre', 'pește', 'animal'] },
  { id: 'U06', title: 'More Than One', grammar: 'Plurals change the ending (câine → câini, pisică → pisici, carte → cărți, măr → mere) and take the article too (câinii, pisicile, merele); noi, voi, ei, ele with suntem, sunteți, sunt and avem, aveți, au', contrast: 'câine|câini; pisică|pisici; suntem|sunteți', row: 5,
    words: ['noi', 'voi', 'ei', 'ele', 'suntem', 'sunteți', 'avem', 'aveți', 'au', 'câini', 'câinii', 'pisici', 'pisicile', 'cărți', 'copii', 'oameni', 'măr', 'mere', 'merele'] },
  { id: 'U07', title: 'Describing Things', grammar: 'An adjective comes after the noun and agrees: un câine frumos, o casă frumoasă; foarte for very, mult for a lot, dar for but', contrast: 'frumos|frumoasă; nou|vechi; bun|bună', row: 5,
    words: ['frumos', 'frumoasă', 'nou', 'vechi', 'bun', 'bună', 'rău', 'mult', 'mașină', 'mașina', 'telefon', 'dar'] },
  { id: 'U08', title: 'Where Things Are', grammar: 'în, pe, sub, lângă for in, on, under, next to, with no article after them: pe masă, în bucătărie; aici and acolo; unde for where; locuiesc for where you live', contrast: 'în|pe; aici|acolo; pe|sub', row: 6,
    words: ['unde', 'în', 'pe', 'sub', 'lângă', 'acolo', 'bucătărie', 'bucătăria', 'cameră', 'camera', 'pat', 'grădină', 'locuiesc', 'locuiești', 'locuiește'] },
  { id: 'U09', title: 'How You Feel', grammar: 'a fi for feelings, the adjective agreeing: sunt obosit, sunt obosită; mi-e foame, mi-e sete, mi-e frig for hungry, thirsty, cold, and ți-e for you', contrast: 'obosit|obosită; mi-e|ți-e; foame|sete', row: 6,
    words: ['obosit', 'obosită', 'fericit', 'fericită', 'trist', 'tristă', 'bolnav', 'bolnavă', 'ocupat', 'ocupată', 'mi-e', 'ți-e', 'foame', 'sete', 'frig', 'cald'] },
  { id: 'U10', title: 'Mine and Yours', grammar: 'The possessive comes after the noun with its article: mama mea, tatăl meu, cartea ta, câinele tău, casa noastră; numele meu for my name', contrast: 'meu|mea; tău|ta; mama|tatăl', row: 7,
    words: ['meu', 'mea', 'tău', 'ta', 'nostru', 'noastră', 'mama', 'tatăl', 'fratele', 'sora', 'prietenul', 'prietena', 'familia', 'numele'] },
  { id: 'U11', title: 'Asking Questions', grammar: 'Question words come first: cine, ce, unde, când, de ce, cum, care; pentru că in the answer; știu, știi, știe for knowing', contrast: 'cine|ce; de ce|pentru că; știu|știi', row: 7,
    words: ['cine', 'când', 'de ce', 'cum', 'care', 'pentru că', 'știu', 'știi', 'știe'] },
  { id: 'U12', title: 'Counting to Ten', grammar: 'Numbers one to ten: unu, doi (două with a feminine noun: două pisici), trei …; câți and câte for how many; … ani for an age', contrast: 'doi|două; câți|câte', row: 8,
    words: ['unu', 'doi', 'două', 'trei', 'patru', 'cinci', 'șase', 'șapte', 'opt', 'nouă', 'zece', 'ani', 'câți', 'câte'] },
  { id: 'U13', title: 'Naming Colours', grammar: 'A colour comes after the noun and agrees: un câine negru, o pisică neagră; verde stays the same; culoare for colour', contrast: 'roșu|roșie; negru|neagră; alb|albă', row: 8,
    words: ['roșu', 'roșie', 'albastru', 'albastră', 'verde', 'negru', 'neagră', 'alb', 'albă', 'galben', 'culoare', 'culoarea'] },
  { id: 'U14', title: 'Days and Times', grammar: 'Time words: azi or astăzi, mâine, acum; days have no capital: luni, sâmbătă, duminică', contrast: 'azi|mâine; zi|săptămână', row: 9,
    words: ['azi', 'astăzi', 'mâine', 'acum', 'zi', 'săptămână', 'săptămâna', 'luni', 'vineri', 'sâmbătă', 'duminică', 'târziu', 'devreme'] },
  { id: 'U15', title: 'Going Places', grammar: 'a merge for going: eu merg, tu mergi, el merge, noi mergem; la for to a place, with no article: merg la școală; acasă for home; vreau for I want', contrast: 'merg|mergi; vreau|vrei', row: 9,
    words: ['merg', 'mergi', 'merge', 'mergem', 'la', 'școală', 'parc', 'magazin', 'oraș', 'acasă', 'vreau', 'vrei', 'vrea'] },
]

// Widening after the pull (autonomous-build.md); new words take the next ids. Moves change a word's first unit.
export const EXTRA = {}
export const MOVE = {}

if (process.argv[1] === import.meta.filename) {
  const fr = XLSX.readFile(join(ROOT, from))
  const sheet = (n) => XLSX.utils.sheet_to_json(fr.Sheets[n], { defval: '' })
  const header = (n) => XLSX.utils.sheet_to_json(fr.Sheets[n], { header: 1, defval: '' })[0]
  const wb = XLSX.utils.book_new()
  const put = (n, rows, cols = header(n)) => XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows, { header: cols }), n)
  const url = (form) => `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Romanian`
  put('README', [
    { item: 'Version', notes: 'Romanian workbook v1, 2026-11-21. The 15 A1 units as drafts with their words; no sentences yet.' },
    { item: 'What this is', notes: 'Tamago Romanian (English to standard Romanian) content and setup data, one tab per database table, the same shape as the French workbook. Row 1 of each tab is the column names.' },
    { item: 'Column names', notes: 'Kept from French so one engine serves every course: the sentences tab\'s french column holds the Romanian text, and accepted_answers directions fr_to_en and en_to_fr mean Romanian to English and English to Romanian.' },
    { item: 'Romanian', notes: 'Standard Romanian as spoken in Romania, tu informally (dumneavoastră, the formal you, kept out of Part 1). Comma-below ș ț only. The A1 list is a frequency stand-in (hermitdave FrequencyWords, OpenSubtitles 2018, CC BY-SA 4.0); no free CEFR Romanian A1 inventory exists.' },
    { item: 'Sources', notes: 'Sentences: Tatoeba Romanian-English (source_id) or tamago_original (native-speaker check needed). Words: Wiktionary Romanian. Recordings: Lingua Libre (LL-Q7913 (ron)).' },
    { item: 'Editing', notes: "Add rows freely. Keep IDs unique and never reuse a retired ID. Set status to 'off' instead of deleting." },
    { item: 'Changes to v1', notes: 'New workbook, made by scripts/make-romanian-workbook.mjs from the French machinery tabs. Part 1 only; no topic packs.' },
  ], ['item', 'notes'])
  put('languages', [...sheet('languages').map((l) => ({ ...l, status: ['fr', 'es', 'de'].includes(l.lang_id) ? 'active' : l.status })), { lang_id: 'ro', name: 'Romanian', ui_language: 'en', status: 'active', order: 10 }])
  put('units', UNITS.map((u, i) => ({ unit_id: u.id, lang_id: 'ro', cefr: 'A1', order: i + 1, title: u.title, topic: u.title, grammar_point: u.grammar, contrast_sets: u.contrast,
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
    U08: [['listening', 'Listening', 'I can understand when someone says where something is.'], ['reading', 'Reading', 'I can understand short sentences that say where things are.'],
      ['writing', 'Writing', 'I can write where something is.'], ['speaking', 'Spoken interaction', 'I can ask and say where something is and where I live.']],
    U09: [['listening', 'Listening', 'I can understand when someone says how they feel.'], ['reading', 'Reading', 'I can understand short sentences about how someone feels.'],
      ['writing', 'Writing', 'I can write how I feel.'], ['speaking', 'Spoken interaction', 'I can say how I feel: tired, happy, ill, hungry, thirsty.']],
  }
  let cd = 1
  const canDo = []
  for (const u of UNITS) {
    const rs = SAME[u.id] ? frCanDo.filter((c) => c.unit_id === SAME[u.id]).map((c) => ({ skill: c.skill, cefr_row: c.cefr_row, statement: c.statement }))
      : OWN[u.id].map(([skill, cefr_row, statement]) => ({ skill, cefr_row, statement }))
    u.canDo = rs.map((r) => { const id = `CD${String(cd++).padStart(2, '0')}`; canDo.push({ can_do_id: id, unit_id: u.id, skill: r.skill, cefr: 'A1', statement: r.statement, source: `${src}, A1, ${r.cefr_row}`, cefr_row: r.cefr_row, cefr_descriptor: grid[r.cefr_row] }); return id })
  }
  put('can_do', canDo)
  for (const n of ['sentences', 'words', 'sentence_words', 'qa_answers', 'accepted_answers', 'grammar_notes']) put(n, [])
  let w = 1
  const words = UNITS.flatMap((u) => u.words.map((form) => ({ word_id: `W${String(w++).padStart(3, '0')}`, lang_id: 'ro', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '',
    first_unit: u.id, needs_image: 'no', image_file: '', wiktionary_url: url(form), status: 'pull from Wiktionary', notes: '' })))
  for (const [unit, forms] of Object.entries(EXTRA)) for (const form of forms) words.push({ ...words[0], word_id: `W${String(w++).padStart(3, '0')}`, form, first_unit: unit, wiktionary_url: url(form), notes: 'added to widen the unit' })
  for (const x of words) if (MOVE[x.form]) x.first_unit = MOVE[x.form]
  put('topics_pool', sheet('topics_pool'))
  wb.SheetNames.splice(wb.SheetNames.indexOf('words'), 1); delete wb.Sheets.words
  put('words', words)
  put('content_pull', sheet('content_pull').map((r) => ({ ...r, rule: String(r.rule).replace(/French/g, 'Romanian').replace(/Elided forms \(j', l'\) count as their word\./, 'Multi-word forms (bună ziua, te rog) and hyphenated forms (nu-mi, mi-e) count as their word.') })))
  for (const n of ['question_types', 'variants', 'rounds', 'round_type_mix', 'lesson_rules', 'phase1_fallbacks', 'cant_swaps', 'flag_reasons', 'settings_defaults', 'runtime_schema']) put(n, sheet(n))
  // Short Romanian feedback lines, each kept only if Tatoeba has it from a trusted owner with this English (the check).
  const roFb = [['FB40', 'correct', 'Foarte bine!', 'Very good!'], ['FB41', 'correct', 'Bravo!', 'Well done!'], ['FB42', 'correct', 'Perfect!', 'Perfect!'], ['FB43', 'correct', 'Exact!', 'Exactly!'],
    ['FB44', 'correct', 'Corect!', 'Correct!'], ['FB50', 'incorrect', 'Aproape!', 'Almost!'], ['FB51', 'incorrect', 'Nu chiar.', 'Not quite.']]
  put('feedback_phrases', [...sheet('feedback_phrases').filter((f) => f.language === 'en'),
    ...roFb.map(([phrase_id, context, text, english]) => ({ phrase_id, context, language: 'ro', text, english, min_level: 'A1', status: 'draft', notes: 'draft: checked against Tatoeba on import' }))])
  const unitsSheet = XLSX.utils.sheet_to_json(wb.Sheets.units, { defval: '' }).map((r) => ({ ...r, can_do_ids: UNITS.find((u) => u.id === r.unit_id)?.canDo.join(';') ?? '' }))
  wb.Sheets.units = XLSX.utils.json_to_sheet(unitsSheet)
  addHelpCircles(wb, XLSX, 'ro')
  addA1Plan(wb, XLSX, 'ro')
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: ${UNITS.length} units, ${words.length} words`)
}
