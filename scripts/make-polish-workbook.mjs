// The Polish course's first workbook (Builder 2, 2026-11-21, branch content/pl-a1): standard Polish, ty informally
// (Pan and Pani, the formal you with the third person, are kept out of Part 1); the same framework as the other courses.
// Built from the French workbook's machinery tabs like the others. Part 1 only: 15 situation circles, the three help
// circles (scripts/lib/help-circles.mjs) and, added after by scripts/add-vocab-part1.mjs, three vocabulary circles and
// two Brush-Up slots. No topic packs yet.
// Polish choices for Part 1 (the scout's case order): seven cases, and the analyser matches exact forms, so every case
// form a circle uses is a course word of its own with its hint (kot and kota, kawa and kawę). Part 1 is the nominative
// (to jest dom, X jest duży), plus the accusative where a circle needs objects (piję kawę, mam psa, gram w tenisa,
// boli mnie). The genitive only where it can't be avoided, and named in that circle's grammar line: after nie with a
// masculine animal the form is the same as the accusative (nie mam psa), and lat after a number (mam dziesięć lat).
// Instrumental (jestem lekarzem), locative (w domu) and dative (podoba mi się) wait for later parts, so lines with them
// are not pulled. No articles. Aspect: the imperfective present only. ty throughout; wy is only the plural you.
// Usage: node scripts/make-polish-workbook.mjs <french.xlsx> <polish.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
import { addHelpCircles } from './lib/help-circles.mjs'
import { addA1Plan } from './lib/a1-plan.mjs'
const ROOT = join(import.meta.dirname, '..')
const [from, to] = process.argv.slice(2)

export const UNITS = [
  { id: 'U01', title: 'Saying Hello', grammar: 'być for who you are: ja jestem, ty jesteś, on jest; tak and nie; czy starts a yes-no question; ty, the informal you, throughout', contrast: 'tak|nie; jestem|jesteś; tu|tam', row: 1,
    words: ['cześć', 'tak', 'nie', 'ja', 'ty', 'jestem', 'jesteś', 'jest', 'to', 'i', 'tu', 'tam', 'kto', 'czy', 'też'] },
  { id: 'U02', title: 'People and Things', grammar: 'No articles: książka is a book or the book; to jest for this is, with the noun as it stands (to jest dom); on and ona for he and she; ten and ta for this; an adjective agrees with its noun: duży dom, duża książka', contrast: 'on|ona; ten|ta; duży|duża; mały|mała', row: 2,
    words: ['on', 'ona', 'ten', 'ta', 'tylko', 'mężczyzna', 'kobieta', 'chłopiec', 'dziewczyna', 'dziecko', 'książka', 'dom', 'stół', 'nauczyciel', 'lekarz', 'student', 'duży', 'duża', 'mały', 'mała', 'drzwi', 'okno'] },
  { id: 'U03', title: 'Polite Phrases', grammar: 'Set phrases: dziękuję for thank you, proszę for please, przepraszam for sorry, dzień dobry; jak się masz? and dobrze; nazywam się for my name is; a ty? for and you?', contrast: 'dobrze|źle; nazywam|nazywasz; czuję|czujesz', row: 2,
    words: ['dziękuję', 'proszę', 'przepraszam', 'dzień dobry', 'dobry wieczór', 'dobranoc', 'do widzenia', 'jak', 'się', 'masz', 'a', 'nazywam', 'nazywasz', 'nazywa', 'czujesz', 'czuję', 'dobrze', 'bardzo', 'źle', 'wszystko'] },
  { id: 'U04', title: 'Food and Drink', grammar: 'Present tense: ja jem, ty jesz, on je; piję, pijesz, pije; lubię with a thing or an infinitive (lubię jeść); a feminine thing you eat, drink or like takes the accusative, -a to -ę: woda, wodę; kawa, kawę; chleb, mleko and jabłko stay the same', contrast: 'jem|jesz; piję|pije; woda|wodę; kawa|kawę; herbata|herbatę', row: 3,
    words: ['co', 'jem', 'jesz', 'je', 'piję', 'pijesz', 'pije', 'lubię', 'lubisz', 'lubi', 'jeść', 'chleb', 'woda', 'wodę', 'kawa', 'kawę', 'herbata', 'herbatę', 'mleko', 'jabłko', 'ser', 'lody', 'dużo', 'mało'] },
  { id: 'U05', title: 'Pets and Animals', grammar: 'mieć for having: mam, masz, ma; an animal you have takes the accusative: pies, psa; kot, kota; ryba, rybę; after nie the object is genitive, which for pies and kot is the same form (nie mam psa)', contrast: 'mam|ma; pies|psa; kot|kota; ryba|rybę', row: 3,
    words: ['mam', 'ma', 'pies', 'psa', 'kot', 'kota', 'koń', 'ptak', 'ryba', 'ryby', 'rybę', 'zwierzę', 'pieniądze', 'nic'] },
  { id: 'U06', title: 'More Than One', grammar: 'Plurals change the ending: kot, koty; pies, psy; książka, książki; dziecko, dzieci; my, wy, oni, one with jesteśmy, jesteście, są and mamy, macie, mają; oni for a group with a man in it, one for the rest', contrast: 'jesteśmy|są; mamy|mają; oni|one; kot|koty', row: 5,
    words: ['my', 'wy', 'oni', 'one', 'jesteśmy', 'jesteście', 'są', 'mamy', 'macie', 'mają', 'psy', 'koty', 'dzieci', 'ludzie', 'książki', 'jabłka', 'wszyscy', 'sami', 'zajęci'] },
  { id: 'U07', title: 'Describing Things', grammar: 'An adjective agrees with its noun: dobry (masculine), dobra (feminine), dobre (neuter); it usually comes before the noun: nowy samochód, stara książka; to jest dobry pomysł; ale for but', contrast: 'dobry|dobra; nowy|nowa; stary|stara', row: 5,
    words: ['dobry', 'dobra', 'dobre', 'nowy', 'nowa', 'stary', 'stara', 'ładny', 'ładna', 'taki', 'inny', 'ważny', 'samochód', 'telefon', 'rower', 'pomysł', 'problem', 'prawda', 'człowiek', 'ale'] },
  { id: 'U08', title: 'Where Things Are', grammar: 'gdzie for where: gdzie jest kuchnia?; tu, tutaj and tam for here and there; blisko and daleko; mieszkam, mieszkasz, mieszka for where you live (places after w and na come in a later part)', contrast: 'tu|tam; mieszkam|mieszkasz; blisko|daleko', row: 6,
    words: ['gdzie', 'tutaj', 'teraz', 'już', 'mieszkam', 'mieszkasz', 'mieszka', 'kuchnia', 'pokój', 'łóżko', 'ogród', 'mieszkanie', 'blisko', 'daleko'] },
  { id: 'U09', title: 'How You Feel', grammar: 'być with an adjective that agrees with the speaker: jestem zmęczony (a man), jestem zmęczona (a woman); bardzo, trochę and zbyt before it; naprawdę for really', contrast: 'zmęczony|zmęczona; chory|chora; głodny|głodna', row: 6,
    words: ['zmęczony', 'zmęczona', 'szczęśliwy', 'szczęśliwa', 'smutny', 'smutna', 'chory', 'chora', 'zajęty', 'zajęta', 'głodny', 'głodna', 'naprawdę', 'zawsze', 'trochę', 'zbyt'] },
  { id: 'U10', title: 'Mine and Yours', grammar: 'mój, moja, moje and twój, twoja, twoje agree with the thing owned: mój brat, moja siostra, moje imię; nasz and nasza for our', contrast: 'mój|moja; twój|twoja; mama|tata', row: 7,
    words: ['mój', 'moja', 'moje', 'twój', 'twoja', 'twoje', 'nasz', 'nasza', 'mama', 'tata', 'brat', 'siostra', 'przyjaciel', 'imię', 'rodzina', 'ojciec', 'matka', 'żona', 'mąż', 'syn', 'córka'] },
  { id: 'U11', title: 'Asking Questions', grammar: 'Question words come first: kto, co, gdzie, kiedy, dlaczego, jak, który; bo in the answer; wiem, wiesz, wie and wiem, że …; robię, robisz, robi', contrast: 'wiem|wiesz; robię|robisz; dlaczego|bo', row: 7,
    words: ['kiedy', 'dlaczego', 'który', 'która', 'bo', 'że', 'wiem', 'wiesz', 'wie', 'robię', 'robisz', 'robi', 'robić', 'ktoś', 'nikt'] },
  { id: 'U12', title: 'Counting to Ten', grammar: 'Numbers one to ten: jeden, jedna; dwa, dwie (dwie with a feminine noun); after dwa, trzy, cztery the plural: dwa koty, trzy psy; ile for how many and how much; lat after a number for an age (a genitive, used here as a set word: mam dziesięć lat)', contrast: 'jeden|jedna; dwa|dwie; pierwszy|drugi', row: 8,
    words: ['jeden', 'jedna', 'dwa', 'dwie', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osiem', 'dziewięć', 'dziesięć', 'ile', 'lat', 'kosztuje', 'pierwszy', 'drugi'] },
  { id: 'U13', title: 'Naming Colours', grammar: 'A colour agrees like any adjective: czerwony samochód, czerwona książka; jaki and jaka for what kind or which; mój ulubiony kolor', contrast: 'czerwony|czerwona; czarny|czarna; biały|biała; jaki|jaka', row: 8,
    words: ['czerwony', 'czerwona', 'niebieski', 'niebieska', 'zielony', 'zielona', 'czarny', 'czarna', 'biały', 'biała', 'żółty', 'kolor', 'jaki', 'jaka', 'ulubiony', 'kwiat'] },
  { id: 'U14', title: 'Days and Times', grammar: 'Time words: dzisiaj or dziś, jutro, rano, wieczorem; days have no capital: poniedziałek, sobota, niedziela; często and nigdy (nigdy goes with nie); pracuję, pracujesz, pracuje', contrast: 'dzisiaj|jutro; rano|wieczorem; pracuję|pracuje', row: 9,
    words: ['dzisiaj', 'dziś', 'jutro', 'dzień', 'tydzień', 'miesiąc', 'godzina', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela', 'późno', 'wcześnie', 'rano', 'wieczorem', 'często', 'nigdy', 'praca', 'pracuję', 'pracuje', 'pracujesz', 'wolny'] },
  { id: 'U15', title: 'Going Places', grammar: 'iść for going on foot: idę, idziesz, idzie, idziemy; jadę for going by car, bus or train; dokąd for where to; chcę, mogę, muszę with an infinitive: chcę spać, muszę iść', contrast: 'idę|idziesz; chcę|chcesz; muszę|musisz', row: 9,
    words: ['idę', 'idziesz', 'idzie', 'idziemy', 'iść', 'dokąd', 'chcę', 'chcesz', 'chce', 'mogę', 'może', 'muszę', 'musisz', 'spać', 'szkoła', 'park', 'na', 'jadę'] },
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
  const url = (form) => `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Polish`
  put('README', [
    { item: 'Version', notes: 'Polish workbook v1, 2026-11-21. The 15 A1 units as drafts with their words; no sentences yet.' },
    { item: 'What this is', notes: 'Tamago Polish (English to standard Polish) content and setup data, one tab per database table, the same shape as the French workbook. Row 1 of each tab is the column names.' },
    { item: 'Column names', notes: 'Kept from French so one engine serves every course: the sentences tab\'s french column holds the Polish text, and accepted_answers directions fr_to_en and en_to_fr mean Polish to English and English to Polish.' },
    { item: 'Polish', notes: 'Standard Polish, ty informally (Pan and Pani, the formal you, kept out of Part 1). Each case form a circle uses is a word of its own (kot, kota). Part 1: nominative, the accusative for objects, the genitive only where named in the grammar line. The A1 list is the A1 band of the Polish Kelly list (CC BY-NC-SA 2.0).' },
    { item: 'Sources', notes: 'Sentences: Tatoeba Polish-English (source_id) or tamago_original (native-speaker check needed). Words: Wiktionary Polish. Recordings: Lingua Libre (LL-Q809 (pol)).' },
    { item: 'Editing', notes: "Add rows freely. Keep IDs unique and never reuse a retired ID. Set status to 'off' instead of deleting." },
    { item: 'Changes to v1', notes: 'New workbook, made by scripts/make-polish-workbook.mjs from the French machinery tabs. Part 1 only; no topic packs.' },
  ], ['item', 'notes'])
  put('languages', [...sheet('languages').map((l) => ({ ...l, status: ['fr', 'es', 'de'].includes(l.lang_id) ? 'active' : l.status })), { lang_id: 'pl', name: 'Polish', ui_language: 'en', status: 'active', order: 11 }])
  put('units', UNITS.map((u, i) => ({ unit_id: u.id, lang_id: 'pl', cefr: 'A1', order: i + 1, title: u.title, topic: u.title, grammar_point: u.grammar, contrast_sets: u.contrast,
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
  const words = UNITS.flatMap((u) => u.words.map((form) => ({ word_id: `W${String(w++).padStart(3, '0')}`, lang_id: 'pl', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '',
    first_unit: u.id, needs_image: 'no', image_file: '', wiktionary_url: url(form), status: 'pull from Wiktionary', notes: '' })))
  for (const [unit, forms] of Object.entries(EXTRA)) for (const form of forms) words.push({ ...words[0], word_id: `W${String(w++).padStart(3, '0')}`, form, first_unit: unit, wiktionary_url: url(form), notes: 'added to widen the unit' })
  for (const x of words) if (MOVE[x.form]) x.first_unit = MOVE[x.form]
  put('topics_pool', sheet('topics_pool'))
  wb.SheetNames.splice(wb.SheetNames.indexOf('words'), 1); delete wb.Sheets.words
  put('words', words)
  put('content_pull', sheet('content_pull').map((r) => ({ ...r, rule: String(r.rule).replace(/French/g, 'Polish').replace(/Elided forms \(j', l'\) count as their word\./, 'Multi-word forms (dzień dobry, po polsku) count as their word; each case form is a word of its own.') })))
  for (const n of ['question_types', 'variants', 'rounds', 'round_type_mix', 'lesson_rules', 'phase1_fallbacks', 'cant_swaps', 'flag_reasons', 'settings_defaults', 'runtime_schema']) put(n, sheet(n))
  // Short Polish feedback lines, each kept only if Tatoeba has it from a trusted owner with this English (the check).
  const roFb = [['FB40', 'correct', 'Bardzo dobrze!', 'Very good!'], ['FB41', 'correct', 'Brawo!', 'Well done!'], ['FB42', 'correct', 'Doskonale!', 'Perfect!'], ['FB43', 'correct', 'Dokładnie!', 'Exactly!'],
    ['FB44', 'correct', 'Dobrze!', 'Good!'], ['FB50', 'incorrect', 'Prawie!', 'Almost!'], ['FB51', 'incorrect', 'Nie całkiem.', 'Not quite.']]
  put('feedback_phrases', [...sheet('feedback_phrases').filter((f) => f.language === 'en'),
    ...roFb.map(([phrase_id, context, text, english]) => ({ phrase_id, context, language: 'pl', text, english, min_level: 'A1', status: 'draft', notes: 'draft: checked against Tatoeba on import' }))])
  const unitsSheet = XLSX.utils.sheet_to_json(wb.Sheets.units, { defval: '' }).map((r) => ({ ...r, can_do_ids: UNITS.find((u) => u.id === r.unit_id)?.canDo.join(';') ?? '' }))
  wb.Sheets.units = XLSX.utils.json_to_sheet(unitsSheet)
  addHelpCircles(wb, XLSX, 'pl')
  addA1Plan(wb, XLSX, 'pl')
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: ${UNITS.length} units, ${words.length} words`)
}
