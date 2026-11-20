// The Dutch course's first workbook (Dan, 2026-11-19, branch lang/dutch): standard Dutch as spoken in the
// Netherlands, je informally (u, the formal you, is kept out of Part 1); the same framework as French, Spanish,
// German, Italian and Portuguese. Built from the French workbook's machinery tabs like the others. Part 1 only:
// 15 situation circles, the three help circles (scripts/lib/help-circles.mjs) and, added after by
// scripts/add-vocab-part1.mjs, three vocabulary circles and two Brush-Up slots. No topic packs yet.
// Dutch choices for Part 1: present tense only (ik stem, jij/hij stem+t, plural infinitive); de and het articles;
// plurals -en or -s; adjective +e before a noun; no separable verbs; houden van and lekker vinden for liking;
// er is for there is; feelings split between zijn (ik ben moe) and hebben (ik heb honger, ik heb het koud).
// Usage: node scripts/make-dutch-workbook.mjs <french.xlsx> <dutch.xlsx>
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
  { id: 'U01', title: 'Saying Hello', grammar: 'zijn for who you are: ik ben, jij bent, hij is; een for a or an; nee for no, niet for not', contrast: 'ben|bent; ben|is; ja|nee', row: 1,
    words: ['hoi', 'hallo', 'ja', 'nee', 'ik', 'jij', 'je', 'ben', 'bent', 'is', 'een', 'man', 'vrouw', 'jongen', 'meisje', 'kind', 'en'] },
  { id: 'U02', title: 'People and Things', grammar: 'de and het for the; hij and zij for he and she; dit and dat for this and that; a job takes no een: hij is dokter', contrast: 'de|het; hij|zij; dit|dat; groot|klein', row: 2,
    words: ['de', 'het', 'hij', 'zij', 'ze', 'dit', 'dat', 'boek', 'huis', 'dokter', 'leraar', 'lerares', 'groot', 'klein', 'sterk', 'deur', 'tafel'] },
  { id: 'U03', title: 'Polite Phrases', grammar: 'Set phrases; dank je for thank you; alsjeblieft for please and here you are; Hoe gaat het? and the answer goed', contrast: 'goed|slecht; goedemorgen|goedenavond', row: 2,
    words: ['dank', 'alsjeblieft', 'graag', 'goedemorgen', 'goedemiddag', 'goedenavond', 'tot ziens', 'sorry', 'pardon', 'hoe', 'gaat', 'goed', 'slecht', 'prima'] },
  { id: 'U04', title: 'Food and Drink', grammar: 'Present tense: ik eet, jij eet; ik drink, jij drinkt, hij drinkt; houden van for liking: ik houd van koffie', contrast: 'eet|eten; drink|drinkt', row: 3,
    words: ['eet', 'eten', 'drink', 'drinkt', 'houd', 'houdt', 'van', 'brood', 'water', 'melk', 'kaas', 'appel', 'koffie', 'thee', 'wijn', 'lekker'] },
  { id: 'U05', title: 'Pets and Animals', grammar: 'hebben for having: ik heb, jij hebt, hij heeft', contrast: 'heb|hebt; hebt|heeft', row: 3,
    words: ['heb', 'hebt', 'heeft', 'hond', 'kat', 'paard', 'vogel', 'vis', 'muis', 'konijn', 'dier'] },
  { id: 'U06', title: 'More Than One', grammar: 'Plurals add -en or -s; all plurals take de; wij zijn, jullie zijn, zij zijn; wij hebben, zij hebben', contrast: 'hond|honden; appel|appels; heb|hebben', row: 5,
    words: ['wij', 'we', 'jullie', 'honden', 'katten', 'boeken', 'huizen', 'mannen', 'vrouwen', 'kinderen', 'appels', 'vrienden', 'zijn', 'hebben', 'veel', 'grote'] },
  { id: 'U07', title: 'Describing Things', grammar: 'An adjective before a noun adds -e: een mooie auto, but een mooi huis (a het-word with een); heel for very, ook for also', contrast: 'mooi|lelijk; oud|nieuw; jong|oud', row: 5,
    words: ['mooi', 'lelijk', 'oud', 'nieuw', 'jong', 'heel', 'ook', 'auto', 'fiets', 'leuk'] },
  { id: 'U08', title: 'Where Things Are', grammar: 'staat, ligt and is for where something is; in, op, onder for in, on, under; hier and daar; er is for there is', contrast: 'hier|daar; op|onder; in|op', row: 6,
    words: ['staat', 'ligt', 'in', 'op', 'onder', 'naast', 'hier', 'daar', 'er', 'keuken', 'badkamer', 'tuin', 'kamer', 'bed'] },
  { id: 'U09', title: 'How You Feel', grammar: 'zijn for feelings: ik ben moe, ik ben blij; honger, dorst and koud take hebben: ik heb honger, ik heb het koud', contrast: 'moe|blij; honger|dorst; koud|warm', row: 6,
    words: ['moe', 'blij', 'verdrietig', 'ziek', 'boos', 'bang', 'honger', 'dorst', 'koud', 'warm'] },
  { id: 'U10', title: 'Mine and Yours', grammar: 'Possessives: mijn, jouw (je), zijn (his), haar (her); ons and onze for our; family words', contrast: 'mijn|jouw; haar|mijn; vader|moeder', row: 7,
    words: ['mijn', 'jouw', 'haar', 'ons', 'onze', 'vriend', 'vriendin', 'familie', 'vader', 'moeder', 'broer', 'zus'] },
  { id: 'U11', title: 'Asking Questions', grammar: 'Question words come first: wie, wat, waar, wanneer, waarom, welke; omdat in the answer', contrast: 'wie|wat; waar|wanneer; waarom|omdat', row: 7,
    words: ['wie', 'wat', 'waar', 'wanneer', 'waarom', 'omdat', 'welke'] },
  { id: 'U12', title: 'Counting to Ten', grammar: 'Numbers one to ten; hoeveel for how many; … jaar for an age', contrast: 'twee|drie; hoeveel|veel', row: 8,
    words: ['twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'hoeveel', 'jaar'] },
  { id: 'U13', title: 'Naming Colours', grammar: 'A colour after de or het: de auto is rood; before a noun it adds -e: een rode auto; kleur for colour', contrast: 'rood|blauw; zwart|wit', row: 8,
    words: ['rood', 'blauw', 'groen', 'zwart', 'wit', 'geel', 'bruin', 'kleur'] },
  { id: 'U14', title: 'Days and Times', grammar: 'Time words: vandaag, morgen, nu; days of the week have no capital; Hoe laat is het? for the time', contrast: 'vandaag|morgen; dag|week', row: 9,
    words: ['vandaag', 'morgen', 'nu', 'dag', 'week', 'uur', 'maandag', 'zaterdag', 'zondag', 'laat'] },
  { id: 'U15', title: 'Going Places', grammar: 'gaan for going: ik ga, jij gaat, wij gaan; naar for to a place', contrast: 'ga|gaat; ga|gaan', row: 9,
    words: ['ga', 'gaan', 'naar', 'park', 'school', 'winkel', 'stad', 'restaurant', 'straat'] },
]

// Widening after the pull (autonomous-build.md); new words take the next ids. Moves change a word's first unit.
export const EXTRA = {}
export const MOVE = {}

if (process.argv[1] === import.meta.filename) {
  put('README', [
    { item: 'Version', notes: 'Dutch workbook v1, 2026-11-19. The 15 A1 units as drafts with their words; no sentences yet.' },
    { item: 'What this is', notes: 'Tamago Dutch (English to standard Dutch of the Netherlands) content and setup data, one tab per database table, the same shape as the French workbook. Row 1 of each tab is the column names.' },
    { item: 'Column names', notes: 'Kept from French so one engine serves every course: the sentences tab\'s french column holds the Dutch text, and accepted_answers directions fr_to_en and en_to_fr mean Dutch to English and English to Dutch.' },
    { item: 'Dutch', notes: 'Standard Dutch of the Netherlands, je informally (u, the formal you, is kept out of Part 1). The A1 list is a frequency stand-in (hermitdave FrequencyWords, OpenSubtitles 2018); no free CEFR Dutch A1 inventory exists.' },
    { item: 'Sources', notes: 'Sentences: Tatoeba Dutch-English (source_id) or tamago_original (native-speaker check needed). Words: Wiktionary Dutch. Recordings: Lingua Libre (LL-Q7411 (nld)).' },
    { item: 'Editing', notes: "Add rows freely. Keep IDs unique and never reuse a retired ID. Set status to 'off' instead of deleting." },
    { item: 'Changes to v1', notes: 'New workbook, made by scripts/make-dutch-workbook.mjs from the French machinery tabs. Part 1 only; no topic packs.' },
  ], ['item', 'notes'])
  put('languages', [...sheet('languages').map((l) => ({ ...l, status: ['fr', 'es', 'de'].includes(l.lang_id) ? 'active' : l.status })), { lang_id: 'nl', name: 'Dutch', ui_language: 'en', status: 'active', order: 6 }])
  put('units', UNITS.map((u, i) => ({ unit_id: u.id, lang_id: 'nl', cefr: 'A1', order: i + 1, title: u.title, topic: u.title, grammar_point: u.grammar, contrast_sets: u.contrast,
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
  const words = UNITS.flatMap((u) => u.words.map((form) => ({ word_id: `W${String(w++).padStart(3, '0')}`, lang_id: 'nl', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '',
    first_unit: u.id, needs_image: 'no', image_file: '', wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Dutch`, status: 'pull from Wiktionary', notes: '' })))
  for (const [unit, forms] of Object.entries(EXTRA)) for (const form of forms) words.push({ ...words[0], word_id: `W${String(w++).padStart(3, '0')}`, form, first_unit: unit,
    wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Dutch`, notes: 'added to widen the unit' })
  for (const x of words) if (MOVE[x.form]) x.first_unit = MOVE[x.form]
  put('topics_pool', sheet('topics_pool'))
  wb.SheetNames.splice(wb.SheetNames.indexOf('words'), 1); delete wb.Sheets.words
  put('words', words)
  put('content_pull', sheet('content_pull').map((r) => ({ ...r, rule: String(r.rule).replace(/French/g, 'Dutch').replace(/Elided forms \(j', l'\) count as their word\./, 'Multi-word forms (tot ziens, goedemorgen) count as their word.') })))
  for (const n of ['question_types', 'variants', 'rounds', 'round_type_mix', 'lesson_rules', 'phase1_fallbacks', 'cant_swaps', 'flag_reasons', 'settings_defaults', 'runtime_schema']) put(n, sheet(n))
  const nlFb = [['FB40', 'correct', 'Heel goed!', 'Very good!'], ['FB41', 'correct', 'Goed zo!', 'Well done!'], ['FB42', 'correct', 'Perfect!', 'Perfect!'], ['FB43', 'correct', 'Precies!', 'Exactly!'],
    ['FB44', 'correct', 'Juist!', 'Right!'], ['FB50', 'incorrect', 'Bijna!', 'Almost!'], ['FB51', 'incorrect', 'Niet helemaal.', 'Not quite.']]
  put('feedback_phrases', [...sheet('feedback_phrases').filter((f) => f.language === 'en'),
    ...nlFb.map(([phrase_id, context, text, english]) => ({ phrase_id, context, language: 'nl', text, english, min_level: 'A1', status: 'draft', notes: 'draft: checked against Tatoeba on import' }))])
  const unitsSheet = XLSX.utils.sheet_to_json(wb.Sheets.units, { defval: '' }).map((r) => ({ ...r, can_do_ids: UNITS.find((u) => u.id === r.unit_id)?.canDo.join(';') ?? '' }))
  wb.Sheets.units = XLSX.utils.json_to_sheet(unitsSheet)
  addHelpCircles(wb, XLSX, 'nl')
  addA1Plan(wb, XLSX, 'nl')
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: ${UNITS.length} units, ${words.length} words`)
}
