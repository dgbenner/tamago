// Fable's Polish phase 6 review and Dan's calls (2026-11-22; _review/polish-phase6-review.md), the content side.
// Workbook v7 to v8: pan and pani move to U41 as the polite you (Dan's call 1: formal address from Part 2, as Dutch u);
// pana (U26, the polite object form and your), Toma (U41) and Tomem (U64) added (Dan's call 2: Tom in case forms, words
// whose hints point to Tom); bóg off (Dan's call 3 cuts its six U95 lines, leaving it none); ten Read and Answer texts
// reworded into taught words (verdict 12). Content: the Tatoeba lines the formal register and the Tom forms unlock (the
// pull had turned the pan/pani ones down by pattern; packs-review loses those rejects), the register cuts (verdicts 8 to
// 10), the English fixes (verdict 11), the hints, senses and genders (verdicts 2 to 5). The 81 verb-form hints are built
// by scripts/review/pl-verb-hints.mjs and the generated answers scoped by scripts/review/pl-answer-scope.mjs, both after
// the check.
// Usage: node scripts/review/pl-phase6.mjs _source/tamago-pl-data-v7.xlsx _source/tamago-pl-data-v8.xlsx
import { join } from 'node:path'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { loadTatoeba } from '../lib/tatoeba.mjs'
import { analyse, formIndexFor, loose, norm } from '../lib/french.mjs'
process.env.COURSE = 'pl'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '../..')
const P = (f) => join(ROOT, 'content-pl', f)
const readJ = (f) => JSON.parse(readFileSync(f, 'utf8'))
const writeJ = (f, d, indent = 2) => writeFileSync(f, JSON.stringify(d, null, indent) + '\n') // review-decisions and word-senses keep their one-space indent
const [from, to] = process.argv.slice(2)
const today = '2026-11-22'
const WHY = "Fable's Polish phase 6 review (2026-11-22; _review/polish-phase6-review.md)"
const DAN = `${WHY}, Dan's call`

// 1. The workbook.
const wb = XLSX.readFile(join(ROOT, from))
const sheet = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' })
const words = sheet('words')
const byForm = (f) => { const w = words.find((x) => x.form === f); if (!w) throw new Error(`${f} is not in the workbook`); return w }
for (const f of ['pan', 'pani']) Object.assign(byForm(f), { first_unit: 'U41', notes: `moved from U87 to U41: the polite you, taught from Part 2 (${DAN} 1)` })
byForm('bóg').status = `off: its six U95 lines cut, none left (${DAN} 3; id kept)`
const NEW = [['W1782', 'Toma', 'U41', `Tom, genitive and accusative (${DAN} 2)`], ['W2075', 'Tomem', 'U64', `Tom, instrumental, z Tomem (${DAN} 2)`],
  ['W2624', 'pana', 'U26', `the polite you, object form and your (${DAN} 1)`]]
for (const [id, form, unit, note] of NEW) {
  if (words.some((w) => w.word_id === id)) throw new Error(`${id} is taken`)
  if (words.some((w) => w.form === form)) throw new Error(`${form} is already in the workbook`)
  const like = words.find((w) => w.first_unit === unit)
  words.push({ ...like, word_id: id, form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '', first_unit: unit, needs_image: 'no', image_file: '',
    wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form)}#Polish`, status: 'pull from Wiktionary', notes: note })
}
wb.Sheets.words = XLSX.utils.json_to_sheet(words)
// Read and Answer texts in taught words (verdict 12; rewording preferred over hinting, as Danish R306).
const texts = sheet('a1_texts')
const TEXT = {
  R101: { lines: ['Owoce i warzywa', 'Jabłka, ser i chleb', 'Rynek: poniedziałek i sobota'], q0: { question: 'Which fruit is on the sign?', choices: ['Apples', 'Pears', 'Bananas'], answer: 0 } }, // złotych, za are U48
  R106: { title: 'Tanie książki', line0: 'Tanie książki' }, // stare never taught; tanie is U48
  R301: { swap: [['35 zł', '35 złotych']] },
  R302: { swap: [['12 zł', '12 złotych'], ['9 zł', '9 złotych'], ['15 zł', '15 złotych'], ['14 zł', '14 złotych']] },
  R305: { swap: [['200 m ', '200 metrów ']] },
  R306: { swap: [['Przystanek jest przed hotelem.', 'Przystanek jest blisko.']], q1: { question: 'Where is the bus stop?', choices: ['Nearby', 'Far away', 'At the station'], answer: 0 } },
  R307: { swap: [['2500 zł', '2500 złotych']] },
  R309: { title: 'Pokój', swap: [['Pokój dla studenta', 'Pokój w centrum']], q0: { question: 'What is near the room?', choices: ['The university', 'The station', 'The sea'], answer: 0 } },
  R310: { swap: [['Tel. 501 234 567', 'Telefon: 501 234 567']] },
  R311: { swap: [['Jestem pielęgniarką i pracuję w szpitalu.', 'Jestem pielęgniarką.']], q0: { question: 'What is her job?', choices: ['A nurse', 'A teacher', 'A doctor'], answer: 0 } },
}
for (const [id, t] of Object.entries(TEXT)) {
  const row = texts.find((x) => x.id === id); if (!row) throw new Error(`${id} missing`)
  let lines = String(row.lines).split('\n')
  if (t.lines) lines = t.lines
  if (t.line0) lines[0] = t.line0
  for (const [a, b] of t.swap ?? []) { const before = lines.join('\n'); lines = lines.map((l) => l.replace(a, b)); if (lines.join('\n') === before) throw new Error(`${id}: "${a}" not found`) }
  row.lines = lines.join('\n')
  if (t.title) row.title = t.title
  const q = JSON.parse(row.questions_json)
  if (t.q0) q[0] = t.q0
  if (t.q1) q[1] = t.q1
  row.questions_json = JSON.stringify(q)
  row.notes = `reworded into taught words (${WHY}, verdict 12)`
}
wb.Sheets.a1_texts = XLSX.utils.json_to_sheet(texts)
const readme = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
readme.push([`Changes to ${to.match(/v(\d+)/)[0]}`, `${WHY} and Dan's calls: pan and pani to U41 (the polite you); Toma W1782 (U41), Tomem W2075 (U64), pana W2624 (U26) added; bóg W2846 off; R101, R106, R301, R302, R305 to R307, R309 to R311 reworded into taught words.`])
wb.Sheets.README = XLSX.utils.aoa_to_sheet(readme)
XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}`)

// 2. Lines. Every Tatoeba line is read from the export (trusted owner, English linked) and placed in a circle whose words
// it uses, under the pull's rule: the main circles before it, the help circles of earlier parts, its own words.
const units = sheet('units').sort((a, b) => a.order - b.order)
const U = new Map(units.map((u) => [u.unit_id, u]))
const live = words.filter((w) => !String(w.status).startsWith('off'))
const dec = readJ(P('review-decisions.json'))
const names = new Set(dec.names.map((x) => x.toLowerCase()))
const isHelp = (u) => u.is_topic_pick === 'help'
const allowedFor = (T) => {
  const t = U.get(T)
  const ok = isHelp(t) ? units.filter((x) => x.order <= t.order)
    : units.filter((x) => (x.order < t.order && !isHelp(x)) || (isHelp(x) && Number(x.part) < Number(t.part)) || x.unit_id === T)
  return formIndexFor(live.filter((w) => ok.some((x) => x.unit_id === w.first_unit)))
}
const fits = (text, T) => !analyse(text, allowedFor(T), { names }).unknown
const tat = loadTatoeba('pol')
const tById = new Map(tat.french.map((s) => [s.id, s]))
const trusted = (s) => { const t = tat.trustOf(s); return t.native_owner || t.ok_tag }
const drafts = readJ(P('drafts.json'))
const pulls = readdirSync(P('pull')).filter((f) => /^U\d+\.json$/.test(f)).map((f) => readJ(P(`pull/${f}`)))
const inCourse = new Set([...pulls.flatMap((p) => p.sentences), ...drafts.sentences].map((s) => loose(s.french)))
const usedIds = new Set([...pulls.flatMap((p) => p.sentences), ...drafts.sentences].map((s) => s.sentence_id))
const nextId = (unit) => { const n = unit.slice(1); for (let i = 401; ; i++) { const id = `S${Number(n)}${i}`; if (!usedIds.has(id)) { usedIds.add(id); return id } } }
const mains = units.filter((u) => !isHelp(u) && !['yes', 'node'].includes(u.is_topic_pick))
const added = []
const addTatoeba = (tid, unit, note, english) => {
  const s = tById.get(String(tid)); if (!s) throw new Error(`Tatoeba ${tid} not found`)
  if (!trusted(s)) throw new Error(`Tatoeba ${tid} has no trust signal`)
  const linked = tat.englishFor(s.id); const en = english ?? linked[0]
  if (!linked.includes(en)) throw new Error(`Tatoeba ${tid}: "${en}" is not linked (${linked.join('; ')})`)
  if (inCourse.has(loose(s.text))) throw new Error(`Tatoeba ${tid} "${s.text}" is already in the course`)
  if (!fits(s.text, unit)) throw new Error(`Tatoeba ${tid} "${s.text}" uses a word ${unit} has not taught`)
  inCourse.add(loose(s.text))
  const row = { sentence_id: nextId(unit), unit_id: unit, french: norm(s.text), english: en, notes: `Tatoeba line brought in by ${note}`, source: 'tatoeba', source_id: s.id, source_owner: s.owner }
  drafts.sentences.push(row); added.push({ ...row, why: note })
  return row
}
// Earliest main circle, from `min` on, whose words the line uses.
const place = (tid, min) => {
  const s = tById.get(String(tid)); const start = U.get(min).order
  const u = mains.find((x) => x.order >= start && fits(s.text, x.unit_id)); if (!u) throw new Error(`${tid} "${s.text}" fits no circle from ${min}`)
  return u.unit_id
}

// Dan's call 1: the polite you in U41, U81 and U82, U26 and U88 (U31, Fable's other help circle, sits in Part 1, before
// the register is taught, so its share went to U26). The pull's 1,625 pattern rejects were revisited for these circles.
const FORMAL = {
  U41: [[349237, 'What is your name, sir?'], [348679], [409969], [551751], [722395], [1844922, 'Do you have a dog?'], [8506138], [367140]],
  U81: [[529950], [1114004], [11262014]],
  U82: [[1114003], [3881876]],
  U26: [[2138824], [4104354], [5932992], [6044078, "I'm pleased to meet you."], [8774033]],
  U88: [[706923], [722315], [751449], [4328191, "What's your marital status?"], [6973867]],
}
const formalNote = `${DAN} 1 (formal address from Part 2; the pull's pan/pani pattern reject revisited for this circle)`
for (const [unit, list] of Object.entries(FORMAL)) for (const [tid, en] of list) addTatoeba(tid, unit, formalNote, en)
// pani in U41 needs lines of its own: Tatoeba's checked ones all use words of later circles, so three drafts.
const PANI = [['Jak pani ma na imię?', 'What is your name?'], ['Gdzie pani mieszka?', 'Where do you live?'], ['Czy mówi pani po angielsku?', 'Do you speak English?']]
for (const [pl, en] of PANI) {
  if (!fits(pl, 'U41')) throw new Error(`draft "${pl}" does not fit U41`)
  const row = { sentence_id: nextId('U41'), unit_id: 'U41', french: pl, english: en, notes: `draft: pani as the polite you in U41 (${DAN} 1); no checked Tatoeba line fits the circle's words` }
  drafts.sentences.push(row); added.push({ ...row, why: 'pani draft' })
}

// Dan's call 2: Toma from U41 (genitive and accusative; possessive lines from U42, where numer telefonu brings the
// possessive genitive), Tomem from U64 (z, instrumental; jestem with the instrumental from U65).
const TOM = [
  // [Tatoeba id, earliest circle, English pick]
  [3634380, 'U41'], [3781357, 'U41'], [2826625, 'U41'], [3680170, 'U41', 'Nobody likes Tom.'], [6488498, 'U41'], [10566184, 'U41'], [6156441, 'U41'],
  [10592772, 'U41', "Tom isn't here."], [10299727, 'U41'], [5223799, 'U41'],
  [3942968, 'U42'], [12069288, 'U42'], [10574244, 'U42', "This is Tom's room."], [3680171, 'U42'], [6729233, 'U42'], [2519058, 'U42'],
  [566483, 'U41'], [2559912, 'U41'], [3850328, 'U41'], [3602934, 'U41', "I've known Tom for years."], [3680164, 'U42'], [3718696, 'U41'], [3851562, 'U42'],
  [3868203, 'U41'], [10584447, 'U41', "Tom isn't at home."], [8541242, 'U41'], [10593985, 'U41'], [3886575, 'U41'], [3070699, 'U41'], [6729238, 'U42'],
  [2116727, 'U64'], [2810196, 'U64'], [3579418, 'U64'], [4837737, 'U64'], [4837739, 'U64'], [7802519, 'U64'], [11298093, 'U64', "We're meeting Tom tomorrow."],
  [13352419, 'U64'], [4919335, 'U64'], [10543453, 'U65'],
]
for (const [tid, min, en] of TOM) addTatoeba(tid, place(tid, min), `${DAN} 2 (Tom in case forms)`, en)

// Verdicts 8 and 9: the gentle lines that keep głupi and nienawidzę at three in their first circle after the cuts.
for (const [tid, unit, en] of [[2732004, 'U56'], [4482509, 'U56'], [6313053, 'U75'], [6602623, 'U75']]) addTatoeba(tid, unit, `${WHY}, verdicts 8 and 9 (a gentle line in place of the cut ones, so the word keeps three)`, en)
// Verdict 11: S15025 tests ma na imię five circles early; cut there and brought into U41 with Piotr as Piotr.
inCourse.delete(loose('Czy on ma na imię Piotr?')) // the same line, moving
addTatoeba(2186149, 'U41', `${WHY}, verdict 11 (was S15025 in U15, before ma na imię)`, 'Is his name Piotr?')

// 3. Cuts (verdicts 8 to 11, Dan's call 3).
const CUTS = {
  S56003: 'verdict 8, register: one of five stupid lines', S56010: 'verdict 8, register', S87021: 'verdict 8, register', S94209: 'verdict 8, register',
  S75035: 'verdict 9, register: hate line', S75040: 'verdict 9, register', S81023: 'verdict 9, register',
  S95001: "Dan's call 3: the six Bóg lines", S95002: "Dan's call 3", S95003: "Dan's call 3", S95006: "Dan's call 3", S95007: "Dan's call 3", S95008: "Dan's call 3",
  S15025: 'verdict 11: ma na imię before U41; brought into U41',
}
for (const id of Object.keys(CUTS)) if (!dec.cut_sentences.includes(id)) dec.cut_sentences.push(id)
dec._cut_sentences = `${dec._cut_sentences ?? ''} ${WHY}: ${Object.entries(CUTS).map(([k, v]) => `${k} (${v})`).join('; ')}.`.trim()

// Verdict 11: English. Lubię is like, not love; dużo pije is drinks a lot. Tatoeba links only the loose English, so the
// line keeps its Tatoeba source with our English (decisions.sentences confirm, english_source says why).
const ENGLISH = { S4014: ['I like ice cream.', 'lubię is like (kocham is love); Tatoeba links only "I love ice cream."'], S4022: ['Tom drinks a lot.', 'Tatoeba links only "Tom is a heavy drinker."'] }
for (const p of pulls) for (const s of p.sentences) if (ENGLISH[s.sentence_id]) {
  const [en, why] = ENGLISH[s.sentence_id]
  s.notes = `${s.notes}; English "${s.english}" replaced with "${en}" (${WHY}, verdict 11)`; s.english = en
  dec.sentences[s.sentence_id] = { action: 'confirm', french: s.french, english_source: `${WHY}, verdict 11: ${why}` }
  writeJ(P(`pull/${p.unit_id}.json`), p)
}
// S62019 Kot ma dwadzieścia dni. is kept (Fable: keep or cut; the line is natural and its English right).

// 4. Hints, senses, genders.
const H = (id, hint, source) => { dec.claude_hints[id] = { hint, source } }
H('W2568', 'you (polite, to a man; takes the he/she verb form); man, gentleman (ten pan)', 'Wiktionary, pan: Pronoun "you polite second person m-personal nominative, it takes verbs as third-person sg form"; Noun "gentleman, man"')
H('W2569', 'you (polite, to a woman; takes the he/she verb form); woman, lady (ta pani)', 'Wiktionary, pani: Pronoun "female equivalent of pan (“you”) (polite second person f nominative, it takes verbs as third-person sg form)"')
H('W2624', 'you (polite, to a man: object form, znam pana); your (pana komputer)', 'Wiktionary, pana: Pronoun "genitive/accusative singular of pan (“you (polite)”)"')
H('W1782', 'Tom (object form: znasz Toma?; Tom\'s: pies Toma)', `Tom, genitive and accusative, as Tatoeba's checked lines use it (${DAN} 2; a name has no Wiktionary entry)`)
H('W2075', 'Tom (with z: z Tomem)', `Tom, instrumental, as Tatoeba's checked lines use it (${DAN} 2; a name has no Wiktionary entry)`)
H('W269', 'he/she can (móc); maybe (być może)', `Wiktionary, może: Verb "third-person singular present of móc", Particle "maybe, perhaps" (${WHY}, verdict 2)`)
H('W1532', 'number', `Wiktionary, numer: "number (indicating the position of something in a list or sequence)" (${WHY}, verdict 3)`)
H('W2604', 'dear, beloved (kochany brat); darling (as a name)', `Wiktionary, kochany: Participle "passive adjectival participle of kochać", declined as an adjective; Noun "loved one, love" (${WHY}, verdict 4)`)
H('W2145', 'blows (wieje wiatr: the wind is blowing; wiać)', 'Wiktionary, wiać: "to blow (to produce an air current)"; wieje is its third-person singular present in the {{pl-conj}} table')
const senses = readJ(P('word-senses.json'))
Object.assign(senses, {
  W2568: { pos: 'Pronoun', note: `the polite you, U41 (${DAN} 1); the noun sense stays in the hint for ten pan` },
  W2569: { pos: 'Pronoun', note: `the polite you, U41 (${DAN} 1)` },
  W2624: { pos: 'Pronoun', match: 'you (polite)', note: `object form of the polite you, U26 (${DAN} 1)` },
  W1782: { name: 'Tom', case: 'genitive and accusative', note: `${DAN} 2` },
  W2075: { name: 'Tom', case: 'instrumental', note: `${DAN} 2` },
  W2604: { pos: 'Participle', note: `used as an adjective (mój kochany brat); Wiktionary files the adjective under Participle, there is no Adjective heading (${WHY}, verdict 4)` },
  W2145: { pos: 'Verb', form_of: 'wiać', person: 'on', note: 'wiać to blow; the page\'s form-of lines name the scram and perceptible senses only' },
})
writeJ(P('word-senses.json'), senses, 1)
// Verdict 5: case forms take their lemma's gender, read from each lemma's {{pl-noun}} headword (2026-11-22).
const GENDER = { W1533: 'm, inanimate', W1591: 'm, inanimate', W1613: 'n', W1618: 'f', W1624: 'm, personal', W1682: 'm, inanimate', W1716: 'f', W1717: 'f',
  W1749: 'm, inanimate', W1753: 'f', W1754: 'f', W1755: 'f', W1762: 'm, inanimate', W1764: 'f', W1765: 'f', W1781: 'm, inanimate', W1105: 'f', W1118: 'f',
  W1120: 'f', W1121: 'f', W1122: 'f', W1245: 'f', W1249: 'n' }
for (const [id, g] of Object.entries(GENDER)) { if (dec.gender[id] && dec.gender[id] !== g) throw new Error(`${id} gender already ${dec.gender[id]}`); dec.gender[id] = g }
dec._gender = `${dec._gender} ${WHY}, verdict 5: 23 case forms take their lemma's gender from its {{pl-noun}} headword (telefon, porządek, miasto, ulica, rodzic, owoc, racja, nadzieja, pieniądz, butelka, woda, chleb, szklanka, filiżanka, czas, kurtka, lekcja, klasa, szkoła, góra, drzewo).`
dec._about = `${dec._about} Phase 6 (${today}): ${WHY} applied with Dan's calls by scripts/review/pl-phase6.mjs (formal pan/pani from U41, Toma and Tomem as words, the Bóg lines cut, the exam note); generated_off holds generated answers that use a word the circle has not taught (scripts/review/pl-answer-scope.mjs).`
writeJ(P('review-decisions.json'), dec, 1)

// 5. packs-review: the brought-in lines are no longer turned down.
const packs = readJ(P('sweep/packs-review.json'))
let unrejected = 0
const ids = new Set(added.filter((a) => a.source_id).map((a) => String(a.source_id)))
for (const v of Object.values(packs)) if (v?.reject) for (const k of Object.keys(v.reject)) if (ids.has(k)) { delete v.reject[k]; unrejected++ }
packs._about = `${packs._about} Phase 6 (${today}): the formal-register, Tom and gentle-replacement lines brought in by scripts/review/pl-phase6.mjs left the reject lists (${unrejected}); the pan/pani pattern reject stands everywhere else.`
writeJ(P('sweep/packs-review.json'), packs)
writeJ(P('drafts.json'), drafts)
const byUnit = {}
for (const a of added) byUnit[a.unit_id] = (byUnit[a.unit_id] ?? 0) + 1
console.log(`added ${added.length} (${added.filter((a) => a.source_id).length} Tatoeba, ${added.filter((a) => !a.source_id).length} drafts), unrejected ${unrejected}, cut ${Object.keys(CUTS).length}`)
console.log(JSON.stringify(byUnit))
writeJ(join(process.env.SCRATCH ?? '/tmp', 'pl-phase6-added.json'), added)
