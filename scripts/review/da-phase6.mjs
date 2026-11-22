// Fable's Danish phase 6 review and Dan's calls (2026-11-22; _review/danish-phase6-review.md).
// Workbook: hader, død and døde turned off (ids kept; Dan: cut with their hate and death lines, stoplisted), and 31 Read and
// Answer texts reworded into words taught by their circle (as R306 was), their questions kept in step.
// Decisions: the 14 cuts plus S66012 (politi is not a course word; politiet carries the police), S67105 fixed, the seven
// generated answers with untaught words left out (generated_off), kan / de / til hints, the months, morgen and lov as en (Wiktionary c),
// lide's sense read from Wiktionary's "kunne lide" entry, Odense and Bornholm allowed as names, the U75 note and overview line
// without hader.
// Usage: node scripts/review/da-phase6.mjs _source/tamago-da-data-v7.xlsx _source/tamago-da-data-v8.xlsx
import { join } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '../..')
const [from, to] = process.argv.slice(2)
const today = '2026-11-22'
const WHY = "Fable's Danish phase 6 review (2026-11-21; _review/danish-phase6-review.md), applied 2026-11-22"

// 1. The workbook: three words off, the reading texts reworded.
const wb = XLSX.readFile(join(ROOT, from))
const words = XLSX.utils.sheet_to_json(wb.Sheets.words, { defval: '' })
const OFF = {
  W1580: `off: hate lines cut, not A1 register (Dan's call on ${WHY}); stoplisted under da`,
  W2225: `off: death lines cut, not A1 register (Dan's call on ${WHY}); stoplisted under da`,
  W2226: `off: death lines cut, not A1 register (Dan's call on ${WHY}); stoplisted under da`,
}
for (const [id, status] of Object.entries(OFF)) {
  const w = words.find((x) => x.word_id === id); if (!w) throw new Error(`${id} is not in the workbook`)
  w.status = status
}
wb.Sheets.words = XLSX.utils.json_to_sheet(words)

const q = (question, choices, answer = 0) => ({ question, choices, answer })
// id: [title, lines, questions]; every word taught at or before the text's circle (place names from review-decisions names).
const TEXTS = {
  R101: ['Marked', ['Frugt og grøntsager', 'Et kilo æbler: 25', 'Marked: mandag og lørdag'],
    [q('How much is a kilo of apples?', ['25 kroner', '15 kroner', '52 kroner']), q('When is the market on?', ['Monday and Saturday', 'Every day', 'Only on Sunday'])]],
  R102: ['Marked', ['Lørdag: marked', 'Frugt, grøntsager, brød og ost'],
    [q('When is the market?', ['On Saturday', 'On Monday', 'Every day']), q('What can you buy there?', ['Fruit, vegetables, bread and cheese', 'Clothes and shoes', 'Books and maps'])]],
  R103: ['Fra Anna', ['Lars!', 'Jeg er på et marked. Jeg køber frugt og grøntsager.', 'Skal jeg købe et æble til dig?', 'Anna'],
    [q('Where is Anna?', ['At a market', 'At school', 'In the park']), q('What does she offer to buy for Lars?', ['An apple', 'A coffee', 'Some bread'])]],
  R104: ['Hvad koster det?', ['Brød: 30 kroner', 'Ost: 90 kroner', 'Mælk: 15 kroner', 'Vand: 20 kroner'],
    [q('How much is the cheese?', ['30 kroner', '90 kroner', '15 kroner'], 1), q('What costs 30 kroner?', ['The bread', 'The milk', 'The water'])]],
  R105: ['Kaffe og te', ['Kaffe: 35 kroner', 'Te: 30 kroner', 'Brød med ost: 45 kroner'],
    [q('How much is a tea?', ['30 kroner', '35 kroner', '45 kroner']), q('What costs the most?', ['The bread with cheese', 'The coffee', 'The tea'])]],
  R107: ['Fra Maria', ['Peter!', 'Kan du købe en flaske mælk, en pakke kaffe og et kilo æbler?', 'Tak!', 'Maria'],
    [q('What does Maria want?', ['Milk, coffee and apples', 'Bread and water', 'Fruit and vegetables']), q('How much milk?', ['One bottle', 'Two bottles', 'A kilo'])]],
  R108: ['I en butik', ['Mælk: en flaske, 15 kroner', 'Kaffe: en pakke, 50 kroner'],
    [q('How much is a bottle of milk?', ['15 kroner', '50 kroner', '40 kroner']), q('What costs 50 kroner?', ['A pack of coffee', 'A bottle of milk', 'A glass of water'])]],
  R109: ['Til en fest', ['en flaske vin,', 'en pakke kaffe,', 'et kilo æbler,', 'brød og ost!'],
    [q('What is there one bottle of?', ['Wine', 'Milk', 'Water']), q('What is the list for?', ['A party', 'School', 'A trip'])]],
  R201: ['Butik', ['Mandag til fredag: 9.00 til 18.00', 'Lørdag: 10.00 til 16.00', 'Søndag: lukket'],
    [q('When is the shop closed?', ['Sunday', 'Saturday', 'Monday']), q('What time does it open on Saturday?', ['10:00', '9:00', '16:00'])]],
  R202: ['Fra Lars', ['Anna!', 'Skal vi se en film på onsdag? Jeg er hjemme onsdag og torsdag.', 'På lørdag skal jeg til København.', 'Lars'],
    [q('When is Lars at home?', ['Wednesday and Thursday', 'Saturday', 'Every day']), q('Where is Lars going on Saturday?', ['To Copenhagen', 'To the cinema', 'To the market'])]],
  R203: ['Museum', ['Museum: lukket mandag', 'For børn: onsdag klokken 15.00'],
    [q('Which day is the museum closed?', ['Monday', 'Wednesday', 'Tuesday']), q('When is the visit for children?', ['Wednesday at 3 pm', 'Monday at 3 pm', 'Wednesday at 5 pm'])]],
  R204: ['Ferie', ['Skole: lukket fra den 20. december til den 6. januar', 'Skole igen: tirsdag den 7. januar'],
    [q('Which day of the week does school start again?', ['Tuesday', 'Monday', 'Saturday']), q('When do the holidays begin?', ['20 December', '7 January', '6 January'])]],
  R205: ['Fest', ['Stor fest!', 'Lørdag den 21. juni, 18.00', 'Musik og sjov'],
    [q('When is the party?', ['Saturday 21 June', 'Sunday 21 June', 'Saturday 21 July']), q('What time does it start?', ['6 pm', '8 pm', '9 pm'])]],
  R206: ['Fra Mette', ['I juli tager vi til havet.', 'I december tager vi til Norge.', 'Og du?'],
    [q('Where does Mette go in July?', ['To the sea', 'To Norway', 'To the city']), q('When does she go to Norway?', ['In December', 'In July', 'In spring'])]],
  R207: ['Butik', ['Indgang', 'Åbent 9.00 til 19.00', 'Søndag: lukket'],
    [q('When is the shop closed?', ['On Sundays', 'On Saturdays', 'Every evening']), q('What time does it close?', ['7 pm', '9 pm', '9 am'])]],
  R208: ['Station', ['Toilet: ved udgang B', 'Apotek: ved udgang B', 'Information: ved indgang A'],
    [q('Where is the toilet?', ['At exit B', 'At entrance A', 'On the train']), q('Where can you get information?', ['At entrance A', "At the pharmacy", 'On the train'])]],
  R209: ['Mettes butik', ['Brød og kaffe', 'Åbent hver dag 7.00 til 18.00', 'Nyt brød klokken 7.00 og 12.00'],
    [q('Is the shop open on Sunday?', ['Yes', 'No', 'Only in the morning']), q('When is there fresh bread?', ['At 7 am and 12 noon', 'At 6 am only', 'At 6 pm'])]],
  R211: ['Båd til Bornholm', ['Afgang: 7.00, 9.00, 11.00', 'Søndag: en båd hver anden time'],
    [q('What time is the first boat?', ['7:00', '9:00', '11:00']), q('How often is the boat on Sundays?', ['Every two hours', 'Every hour', 'Not at all'])]],
  R212: ['Fra Peter', ['Jeg er fremme i Aarhus 17.30.', 'Mit tog kører fra København 15.00.', 'Vi ses!'],
    [q('When does Peter arrive?', ['5:30 pm', '3 pm', '7:30 pm']), q('Where does his train leave from?', ['Copenhagen', 'The airport', 'Odense'])]],
  R213: ['Øvelse', ['Lyt til teksten.', 'Svar på et spørgsmål.', 'Vælg et billede.'],
    [q('What do you do first?', ['Listen to the text', 'Answer a question', 'Choose a picture']), q('What do you choose?', ['A picture', 'A book', 'A word'])]],
  R214: ['Døren', ['Luk døren.', 'Luk den langsomt, tak.'],
    [q('What should you do with the door?', ['Close it', 'Leave it open', 'Lock it']), q('How should you close it?', ['Slowly', 'Quickly', 'With a key'])]],
  R215: ['Øvelse', ['Vælg et nummer.', 'Find siden i din bog.', 'Læs teksten.'],
    [q('What do you look for in the book?', ['The page', 'The door', 'A picture']), q('What do you do last?', ['Read the text', 'Choose a number', 'Close the book'])]],
  R301: ['Restaurant', ['I dag: suppe, kylling med ris', 'Dessert: is', '125 kroner'],
    [q("How much is today's meal?", ['125 kroner', '25 kroner', '150 kroner']), q('What is there for dessert?', ['Ice cream', 'Cake', 'Fruit'])]],
  R302: ['Kaffe og kage', ['Kaffe: 30 kroner', 'Te: 25 kroner', 'Kage: 35 kroner', 'Sandwich: 60 kroner'],
    [q('How much is a sandwich?', ['60 kroner', '30 kroner', '35 kroner']), q('What costs 25 kroner?', ['A tea', 'A coffee', 'A cake'])]],
  R303: ['Restaurant', ['Fisk og kød', 'Åbent tirsdag til søndag', 'Mandag: lukket'],
    [q('When is the restaurant closed?', ['On Mondays', 'On Sundays', 'On Tuesdays']), q('What does the restaurant serve?', ['Fish and meat', 'Pizza', 'Only salads'])]],
  R304: ['Fra Anna', ['Mit hus ligger midt i byen.', 'Gå ligeud til hjørnet.', 'Min gade er den anden til højre.'],
    [q("Where is Anna's house?", ['In the middle of town', 'Near the school', 'By the sea']), q('Which street is hers?', ['The second on the right', 'The first on the left', 'The second on the left'])]],
  R305: ['I byen', ['Museum: 200 meter til venstre', 'Kirke: ligeud', 'Station: til højre'],
    [q('Where is the museum?', ['200 meters on the left', '200 meters on the right', 'Straight on']), q('Where is the station?', ['On the right', 'On the left', 'Straight on'])]],
  R306: ['Hotel Danmark', ['Hotel Danmark ligger midt i byen.', 'Fem minutter fra havet', 'Bussen stopper lige foran'],
    [q('How far is the hotel from the sea?', ['Five minutes', 'Fifteen minutes', 'Half an hour']), q('Where does the bus stop?', ['In front of the hotel', 'Behind the hotel', 'At the station'])]],
  R307: ['Lejlighed til leje', ['Lejlighed midt i byen', 'Et soveværelse, stue, køkken og badeværelse', 'Med have', 'Leje: 9.000 kroner'],
    [q('How many bedrooms does the apartment have?', ['One', 'Two', 'Three']), q('What else does it have?', ['A garden', 'A balcony', 'A garage'])]],
  R308: ['Fra Maria', ['Min nye lejlighed er lille.', 'Den har et soveværelse, en stue og et køkken.', 'Der er ingen have.'],
    [q("What is Maria's new apartment like?", ['Small', 'Big', 'Old']), q("What doesn't it have?", ['A garden', 'A kitchen', 'A bedroom'])]],
  R309: ['Værelse til leje', ['Et værelse med seng, bord og stol', 'Tæt på en skole', 'Leje: 3.000 kroner'],
    [q('What is in the room?', ['A bed, a table and a chair', 'A sofa and a lamp', 'A fridge']), q('Where is the room?', ['Near a school', 'Near the sea', 'In the forest'])]],
  R310: ['Job', ['Kok til restaurant', 'Tirsdag til lørdag, 17.00 til 23.00', 'Telefon: 12 34 56 78'],
    [q('What job is it?', ['A cook', 'A waiter', 'A driver']), q('Which days?', ['Tuesday to Saturday', 'Monday to Friday', 'Every day'])]],
  R312: ['Job', ['Job i et firma', 'Du skal have kørekort', 'Mandag til fredag'],
    [q('Where is the job?', ['In a company', 'In a school', 'In a shop']), q('What do you need?', ["A driver's license", 'A university degree', 'A car'])]],
  R313: ['Et postkort fra Anna', ['Kære Peter!', 'Jeg er ved havet med min familie. Det er varmt, og havet er fantastisk.', 'Kærlig hilsen, Anna'],
    [q('Where is Anna?', ['At the seaside', 'In the mountains', 'In the city']), q('What is the weather like?', ['Warm', 'Cold', 'Rainy'])]],
  R314: ['Fra Tom', ['Hej Maria!', 'På lørdag fylder jeg 30. Kommer du til min fest?', 'Den er hjemme hos mig klokken otte.', 'Tom'],
    [q('Why is Tom having a party?', ["It's his birthday", 'He has a new job', "It's Christmas"]), q('Where is the party?', ['At his home', 'At a restaurant', 'In the park'])]],
  R315: ['Til Anna', ['Anna!', 'Jeg er ikke hjemme. Jeg er tilbage klokken seks.', 'Der er mad på bordet.', 'Peter'],
    [q('When is Peter back?', ['At six', 'At eight', 'At five']), q('Where is the food?', ['On the table', 'At a restaurant', 'In the fridge'])]],
}
const texts = XLSX.utils.sheet_to_json(wb.Sheets.a1_texts, { defval: '' })
for (const [id, [title, lines, questions]] of Object.entries(TEXTS)) {
  const t = texts.find((x) => x.id === id); if (!t) throw new Error(`${id} is not in the workbook`)
  const was = `${t.title}: ${String(t.lines).replace(/\n/g, ' / ')}`
  Object.assign(t, { title, lines: lines.join('\n'), questions_json: JSON.stringify(questions), notes: `${t.notes ? `${t.notes}; ` : ''}reworded ${today} into taught words (${WHY}); was "${was}"` })
}
wb.Sheets.a1_texts = XLSX.utils.json_to_sheet(texts)
const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, `Fable's Danish phase 6 review: hader (W1580), død (W2225), døde (W2226) off with their lines; ${Object.keys(TEXTS).length} Read and Answer texts reworded into taught words.`])
wb.Sheets.README = XLSX.utils.aoa_to_sheet(r)
XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}: ${Object.keys(OFF).length} words off, ${Object.keys(TEXTS).length} texts reworded`)

// 2. Decisions.
const decPath = join(ROOT, 'content-da/review-decisions.json'), dec = JSON.parse(readFileSync(decPath, 'utf8'))
const CUTS = ['S75008', 'S75009', 'S75011', 'S26026', // hate lines (verdict 4; Dan: cut, hader off)
  'S92002', 'S92011', 'S92012', 'S92016', 'S92020', 'S92022', // death lines (verdict 5; Dan: cut, død and døde off)
  'S42112', 'S87110', 'S91107', 'S91116', // drafts (verdict 7)
  'S66012'] // politi is not a course word (verdict 9: cut, not added; it would have one line)
for (const id of CUTS) if (!dec.cut_sentences.includes(id)) dec.cut_sentences.push(id)
// Generated en_to_fr answers with untaught words (verdict 10, Appendix B): left out through decisions.generated_off (answer id
// to why), the key build-content honours (the Dutch session's filter, shared so the branches merge clean).
const OFF_ANSWERS = { 'GS28104-10698229': 'skade is not a course word', 'GS28104-10698230': 'såret is not a course word', 'GS36124-6934711': 'manglede is not a course word',
  'GS55127-6105509': "Må as Fable listed it (Appendix B: må→U47 for a U55 sentence's answer); cut with its pair", 'GS55127-6105510': 'jeres is not a course word',
  'GS88119-1747065': 'enlig is not a course word', 'GS9101-628354': 'lykkelig is taught in U56, after U01' }
delete dec.cut_answers
dec.generated_off = Object.fromEntries(Object.entries(OFF_ANSWERS).map(([k, v]) => [k, `${v} (Fable's Danish phase 6 review, verdict 10, Appendix B; ${today})`]))
Object.assign(dec.claude_hints, {
  W043: { hint: 'can (kan lide: to like)', source: `${WHY}, verdict 2 (Dan's call 3): kan is the present of kunne, can; Wiktionary Danish` },
  W064: { hint: 'they; the, those (before a plural)', source: `${WHY}, verdict 6: Wiktionary Danish de, pronoun they and plural definite article` },
  W158: { hint: 'to; for (til dig); of (far til)', source: `${WHY}, verdict 6: Wiktionary Danish til; 19 lines use it as for or of` },
})
// Gender blanks that disagree with Wiktionary (verdict 3, Dan's call 4): Wiktionary gives common gender (c) for the months,
// morgen and lov. lov had been left blank because its page lists several nouns; Fable read it: c for law and for permission
// (only the dated "praise" is c or n), so en.
const EN = ['W1308', 'W1424', ...Array.from({ length: 12 }, (_, i) => `W${1351 + i}`)]
for (const id of EN) dec.gender[id] = 'en'
for (const n of ['Odense', 'Bornholm']) if (!dec.names.includes(n)) dec.names.push(n)
writeFileSync(decPath, JSON.stringify(dec, null, 2) + '\n')

// 3. Draft fix (verdict 8).
const dpath = join(ROOT, 'content-da/drafts.json'), drafts = JSON.parse(readFileSync(dpath, 'utf8'))
const d = drafts.sentences.find((x) => x.sentence_id === 'S67105')
if (d.french === 'Toget har ankomst klokken fem.') Object.assign(d, { french: 'Ankomst: klokken fem.', english: "Arrival: five o'clock.", notes: `${d.notes}; fixed ${today} (${WHY}, verdict 8: "har ankomst" is not idiomatic); was "Toget har ankomst klokken fem."` })
// After the cuts nul, løn, del and hovedet were down to two lines in their first circle: one gentle draft each, taught words only.
const NEW = [['S42128', 'U42', 'Mit nummer er nul tolv tyve.', 'My number is zero twelve twenty.', 'nul'],
  ['S87112', 'U87', 'Hans løn er god.', 'His salary is good.', 'løn'],
  ['S91117', 'U91', 'Det er en stor del af mit liv.', "It's a big part of my life.", 'del'],
  ['S91118', 'U91', 'Han har briller på hovedet.', 'He has glasses on his head.', 'hovedet']]
for (const [sentence_id, unit_id, french, english, w] of NEW) if (!drafts.sentences.some((x) => x.sentence_id === sentence_id))
  drafts.sentences.push({ sentence_id, unit_id, french, english, notes: `draft ${today}: ${w} kept at three lines in its first circle after the phase 6 cuts (${WHY})` })
writeFileSync(dpath, JSON.stringify(drafts, null, 2) + '\n')

// 4. lide's gloss (Dan's call 3): its own page's first sense is "suffer"; the course teaches kan lide, so the sense is read
// from Wiktionary's "kunne lide" entry.
const spath = join(ROOT, 'content-da/word-senses.json'), senses = JSON.parse(readFileSync(spath, 'utf8'))
senses.W044 = { pos: 'Verb', via: 'kunne lide', note: `the course teaches kan lide, to like; lide alone is suffer (${WHY})` }
writeFileSync(spath, JSON.stringify(senses, null, 2) + '\n')

// 5. U75's note and overview line lose hader (its lines are cut).
const npath = join(ROOT, 'content-da/grammar_notes.json'), notes = JSON.parse(readFileSync(npath, 'utf8'))
const n75 = notes.notes.find((n) => n.unit_id === 'U75')
const old = '**elsker** and **hader** are love and hate: **Hader du mig?**'
if (n75.rule.startsWith(old)) n75.rule = n75.rule.replace(old, '**ønsker** is wish or want: **Hvad ønsker du?**')
writeFileSync(npath, JSON.stringify(notes, null, 1) + '\n')
const gpath = join(ROOT, 'content-da/grammar-points.json'), points = JSON.parse(readFileSync(gpath, 'utf8'))
points.points.U75 = points.points.U75.replace('**jeg hader …**', '**hvad ønsker du?**')
writeFileSync(gpath, JSON.stringify(points, null, 1) + '\n')
console.log(`cuts ${CUTS.length}, answers off ${Object.keys(dec.generated_off).length}, hints 3, genders ${EN.length}, S67105 fixed, lide via kunne lide, U75 note`)
