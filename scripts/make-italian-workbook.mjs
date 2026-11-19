// The Italian course's first workbook (Dan, 2026-11-14, branch lang/italian: standard Italian as spoken in Italy, with
// tu and Lei; the same framework as French, Spanish and German, its own content and order). Built from the French
// workbook's machinery tabs like the Spanish and German ones. Part 1 only: 15 situation circles, the three help
// circles (scripts/lib/help-circles.mjs) and, added after by scripts/add-vocab-part1.mjs, three vocabulary circles and
// two Brush-Up slots. No topic packs yet, so no topic nodes.
// Italian needs its own order in places: stare for how you are (come stai?) sits with the polite phrases; c'è and
// ci sono get a circle; feelings split between essere (sono stanco) and avere (ho fame); possessives take the article.
// Usage: node scripts/make-italian-workbook.mjs <french.xlsx> <italian.xlsx>
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
  { id: 'U01', title: 'Saying Hello', grammar: 'essere for who you are: io sono, tu sei; un and una; non', contrast: 'un|una; sono|sei', row: 1,
    words: ['ciao', 'sì', 'no', 'non', 'io', 'tu', 'sono', 'sei', 'un', 'una', 'uomo', 'donna', 'ragazzo', 'ragazza', 'bambino', 'bambina', 'e'] },
  { id: 'U02', title: 'People and Things', grammar: "il, la and l'; lui and lei; è; questo and questa", contrast: "il|la; il|l'; lui|lei; è|sono; questo|questa", row: 2,
    words: ['il', 'la', "l'", 'lui', 'lei', 'è', 'qui', 'questo', 'questa', 'libro', 'casa', 'dottore', 'grande', 'piccolo', 'piccola', 'forte'] },
  { id: 'U03', title: 'Polite Phrases', grammar: 'Set phrases; tu for friends, Lei for strangers; stare for how you are: Come stai? Come sta? Sto bene', contrast: 'stai|sta; scusa|scusi; bene|male', row: 2,
    words: ['grazie', 'per favore', 'prego', 'buongiorno', 'buonasera', 'buona notte', 'arrivederci', 'scusa', 'scusi', 'come', 'sto', 'stai', 'sta', 'bene', 'male'] },
  { id: 'U04', title: 'Food and Drink', grammar: 'Verbs in the present: mangio, mangi, mangia; bevo, bevi, beve; mi piace, ti piace', contrast: 'mangio|mangi; bevo|bevi; mi|ti', row: 3,
    words: ['mangio', 'mangi', 'mangia', 'bevo', 'bevi', 'beve', 'mi', 'ti', 'piace', 'pane', 'acqua', 'latte', 'formaggio', 'mela', 'caffè', 'tè', 'vino'] },
  { id: 'U05', title: 'Pets and Animals', grammar: 'avere in the present: ho, hai, ha', contrast: 'ho|hai; hai|ha; ha|è', row: 3,
    words: ['ho', 'hai', 'ha', 'cane', 'gatto', 'cavallo', 'uccello', 'pesce', 'topo', 'animale'] },
  { id: 'U06', title: 'More Than One', grammar: 'Plurals: i, gli and le; nouns in -o take -i, nouns in -a take -e; noi siamo, voi siete, loro sono; abbiamo, avete, hanno', contrast: 'il|i; la|le; siamo|siete; abbiamo|avete; avete|hanno', row: 5,
    words: ['i', 'gli', 'le', 'noi', 'voi', 'loro', 'siamo', 'siete', 'abbiamo', 'avete', 'hanno', 'libri', 'gatti', 'bambini', 'mele', 'uomini', 'ragazzi', 'amici', 'molti'] },
  { id: 'U07', title: 'Describing Things', grammar: 'Adjectives agree with the noun (buono, buona; nuovo, nuova); molto and anche', contrast: 'buono|buona; vecchio|vecchia; nuovo|nuova; bello|bella', row: 5,
    words: ['buono', 'buona', 'vecchio', 'vecchia', 'nuovo', 'nuova', 'giovane', 'bello', 'bella', 'molto', 'anche', 'macchina'] },
  { id: 'U08', title: 'Where Things Are', grammar: "c'è for one thing, ci sono for several; in and sul for where", contrast: "c'è|ci sono; qui|lì; in|sul", row: 6,
    words: ["c'è", 'ci sono', 'lì', 'in', 'sul', 'tavolo', 'letto', 'cucina', 'bagno', 'giardino'] },
  { id: 'U09', title: 'How You Feel', grammar: 'essere with an adjective that agrees: sono stanco, sono stanca; avere for hunger, thirst and cold: ho fame, ho sete, ho freddo', contrast: 'stanco|stanca; malato|malata; sono|ho', row: 6,
    words: ['stanco', 'stanca', 'felice', 'triste', 'malato', 'malata', 'fame', 'sete', 'sonno', 'paura', 'freddo', 'caldo'] },
  { id: 'U10', title: 'Mine and Yours', grammar: 'Possessives take the article: il mio libro, la mia casa; but mio padre, mia madre; di for whose', contrast: 'mio|mia; tuo|tua; suo|sua; mio|miei', row: 7,
    words: ['mio', 'mia', 'miei', 'mie', 'tuo', 'tua', 'suo', 'sua', 'di', 'amico', 'amica', 'famiglia', 'padre', 'madre'] },
  { id: 'U11', title: 'Asking Questions', grammar: "Question words come first: chi, cosa, dove, quando, perché; dov'è for where is; perché also means because", contrast: "chi|cosa; dove|quando; dov'è|dove", row: 7,
    words: ['chi', 'cosa', 'che', 'dove', "dov'è", 'quando', 'perché', 'quale'] },
  { id: 'U12', title: 'Counting to Ten', grammar: 'Numbers one to ten; quanti and quante with a plural noun', contrast: 'quanti|quante; due|dieci', row: 8,
    words: ['uno', 'due', 'tre', 'quattro', 'cinque', 'sette', 'otto', 'nove', 'dieci', 'quanti', 'quante'] },
  { id: 'U13', title: 'Naming Colors', grammar: 'Colors come after the noun; most agree (rosso, rossa), blu and verde do not change in the singular', contrast: 'rosso|rossa; nero|nera; bianco|bianca', row: 8,
    words: ['rosso', 'rossa', 'blu', 'verde', 'nero', 'nera', 'bianco', 'bianca', 'giallo', 'gialla', 'colore'] },
  { id: 'U14', title: 'Days and Times', grammar: 'Time words: oggi, domani, adesso; days of the week without a capital; il lunedì for every Monday', contrast: 'oggi|domani', row: 9,
    words: ['oggi', 'domani', 'adesso', 'giorno', 'settimana', 'ora', 'lunedì', 'sabato', 'domenica'] },
  { id: 'U15', title: 'Going Places', grammar: 'andare in the present: vado, vai, va; a, al and alla', contrast: 'vado|vai; vai|va; al|alla', row: 9,
    words: ['vado', 'vai', 'va', 'a', 'al', 'alla', 'parco', 'scuola', 'negozio', 'città', 'ristorante'] },
]

// Widening after the pull (autonomous-build.md); new words take the next ids. Moves change a word's first unit.
export const EXTRA = {}
export const MOVE = {}

if (process.argv[1] === import.meta.filename) {
  put('README', [
    { item: 'Version', notes: 'Italian workbook v1, 2026-11-14. The 15 A1 units as drafts with their words; no sentences yet.' },
    { item: 'What this is', notes: 'Tamago Italian (English to standard Italian as spoken in Italy) content and setup data, one tab per database table, the same shape as the French workbook. Row 1 of each tab is the column names.' },
    { item: 'Column names', notes: 'Kept from French so one engine serves every course: the sentences tab\'s french column holds the Italian text, and accepted_answers directions fr_to_en and en_to_fr mean Italian to English and English to Italian.' },
    { item: 'Italian', notes: 'Standard Italian as spoken in Italy, with tu and Lei. Official A1 list: the Profilo della lingua italiana A1 inventory, not loaded yet (it is on the book\'s CD-ROM, not online).' },
    { item: 'Sources', notes: 'Sentences: Tatoeba Italian-English (source_id) or tamago_original (native-speaker check needed). Words: Wiktionary Italian. Recordings: Lingua Libre (LL-Q652 (ita)).' },
    { item: 'Editing', notes: "Add rows freely. Keep IDs unique and never reuse a retired ID. Set status to 'off' instead of deleting." },
    { item: 'Changes to v1', notes: 'New workbook, made by scripts/make-italian-workbook.mjs from the French machinery tabs. Part 1 only; no topic packs.' },
  ], ['item', 'notes'])
  put('languages', sheet('languages').map((l) => ({ ...l, status: ['fr', 'es', 'de', 'it'].includes(l.lang_id) ? 'active' : l.status })))
  put('units', UNITS.map((u, i) => ({ unit_id: u.id, lang_id: 'it', cefr: 'A1', order: i + 1, title: u.title, topic: u.title, grammar_point: u.grammar, contrast_sets: u.contrast,
    can_do_ids: '', // filled below with the unit's "I can" statements branch_group: `row ${u.row}`, is_topic_pick: 'no', status: 'draft',
    borrowed_sentence_ids: '', topic_id: '', icon_group: '', icon_file: '', topic_node: '' })), [...header('units'), 'topic_node'].filter((c, i, a) => a.indexOf(c) === i))
  // The tree: the same shape as French (one unit, then pairs), each row opening when the row above has finished round
  // 1. Topic nodes and "I can" statements come with the units that need them.
  const rows = [...new Set(UNITS.map((u) => u.row))]
  put('tree_layout', [...UNITS.map((u) => ({ row: u.row, position: UNITS.filter((x) => x.row === u.row).indexOf(u) + 1, unit_id: u.id,
    unlocks_after: rows.indexOf(u.row) ? `row ${rows[rows.indexOf(u.row) - 1]}` : '', notes: '' }))])
  // "I can" statements: written for the CEFR self-assessment grid, so a German unit on the same topic as a French
  // one takes its statements; the two estar units get their own, checked against the same grid rows.
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
  // Words, for Wiktionary and the pull.
  let w = 1
  const words = UNITS.flatMap((u) => u.words.map((form) => ({ word_id: `W${String(w++).padStart(3, '0')}`, lang_id: 'it', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '',
    first_unit: u.id, needs_image: 'no', image_file: '', wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Italian`, status: 'pull from Wiktionary', notes: '' })))
  for (const [unit, forms] of Object.entries(EXTRA)) for (const form of forms) words.push({ ...words[0], word_id: `W${String(w++).padStart(3, '0')}`, form, first_unit: unit,
    wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Italian`, notes: 'added to widen the unit' })
  for (const x of words) if (MOVE[x.form]) x.first_unit = MOVE[x.form]
  put('topics_pool', sheet('topics_pool'))
  wb.SheetNames.splice(wb.SheetNames.indexOf('words'), 1); delete wb.Sheets.words
  put('words', words)
  put('content_pull', sheet('content_pull').map((r) => ({ ...r, rule: String(r.rule).replace(/French/g, 'Italian').replace(/Elided forms \(j', l'\) count as their word\./, "Multi-word forms (per favore, ci sono) and elided forms (l', c'è) count as their word.") })))
  for (const n of ['question_types', 'variants', 'rounds', 'round_type_mix', 'lesson_rules', 'phase1_fallbacks', 'cant_swaps', 'flag_reasons', 'settings_defaults', 'runtime_schema']) put(n, sheet(n))
  // Feedback: the English lines as in French; Italian lines as drafts, live only once Tatoeba backs them.
  const es = [['FB40', 'correct', 'Molto bene!', 'Very good!'], ['FB41', 'correct', 'Bravo!', 'Well done!'], ['FB42', 'correct', 'Perfetto!', 'Perfect!'], ['FB43', 'correct', 'Esatto!', 'Exactly!'],
    ['FB44', 'correct', 'Giusto!', 'Right!'], ['FB50', 'incorrect', 'Quasi!', 'Almost!'], ['FB51', 'incorrect', 'Non proprio.', 'Not quite.']]
  put('feedback_phrases', [...sheet('feedback_phrases').filter((f) => f.language === 'en'),
    ...es.map(([phrase_id, context, text, english]) => ({ phrase_id, context, language: 'it', text, english, min_level: 'A1', status: 'draft', notes: 'draft: checked against Tatoeba on import' }))])
  const unitsSheet = XLSX.utils.sheet_to_json(wb.Sheets.units, { defval: '' }).map((r) => ({ ...r, can_do_ids: UNITS.find((u) => u.id === r.unit_id)?.canDo.join(';') ?? '' }))
  wb.Sheets.units = XLSX.utils.json_to_sheet(unitsSheet)
  // The Asking for Help thread (2026-11-10): three help circles, from scripts/lib/help-circles.mjs.
  addHelpCircles(wb, XLSX, 'it')
  // A1 Complete (2026-11-10): parts, tasks, and part and tasks columns on units.
  addA1Plan(wb, XLSX, 'it')
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: ${UNITS.length} units, ${words.length} words`)
}
