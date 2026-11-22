// Fable's Swedish phase 6 review and Dan's calls (2026-11-22; _review/swedish-phase6-review.md, branch content/sv-a1).
// Workbook (v7 to v8): the Kelly newsroom tail of Part 4's vocabulary circles is stoplisted (a1-stoplist.mjs, sv
// register) and the stoplisted words that had only drafted lines are turned off, ids kept; the reading texts are
// reworded into words taught by their circle (as Danish R306 was); two can-do lines follow their circles. Content files:
// Fable's cuts and draft fixes, the drafts that used a word now off (cut, or rewritten without it where a kept word
// needs the line), new drafts where a cut left a word under three lines in its first circle, the hints Fable named
// (var, om, till, skönt), skönt refiled as the adjective form Wiktionary's head template says it is, and the two
// generated answers with vad cut.
// Usage: node scripts/review/sv-phase6.mjs _source/tamago-sv-data-v7.xlsx _source/tamago-sv-data-v8.xlsx
import { join } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '../..')
const [from, to] = process.argv.slice(2)
const today = '2026-11-22'
const WHY = "Fable's Swedish phase 6 review (2026-11-22; _review/swedish-phase6-review.md)"
const DAN = "Dan's call on Fable's Swedish phase 6 review (2026-11-22)"
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'))
const write = (p, v) => writeFileSync(join(ROOT, p), JSON.stringify(v, null, 2) + '\n')

// Words turned off (ids kept): Kelly newsroom words, now stoplisted, whose lines in their circle were all drafts
// (politiker had one Tatoeba line, "Jag är politiker.", which teaches nothing once politik and parti are gone).
const OFF = ['stöd', 'antal', 'social', 'nationell', 'internationell', 'europeisk', 'ekonomisk', 'politisk', 'samhälle', 'stat', 'politik',
  'politiker', 'parti', 'debatt', 'utveckling', 'sker', 'kräver', 'utvecklar']
export const OFF_REASON = `turned off in phase 6: Kelly newsroom word, stoplisted (register), its lines were drafts only (${DAN})`

// Reading texts reworded into words taught at or before their circle. Prices on a market sign use the Swedish 25:-.
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const TEXTS = {
  R101: ['Marknad', ['Frukt och grönsaker', 'Äpplen, ett kilo: 25:-', 'Marknad: måndag och lördag']],
  R102: ['Marknad', ['Marknad på lördag', 'Frukt, grönsaker, bröd och ost'],
    [q('When is the market?', ['On Saturday', 'On Monday', 'Every day']), q('What can you buy there?', ['Fruit, vegetables, bread and cheese', 'Clothes and shoes', 'Books and maps'])]],
  R103: ['Från Anna', ['Erik!', 'Jag är på en marknad. Jag köper frukt och grönsaker.', 'Vill du ha ett äpple?', 'Anna'],
    [q('Where is Anna?', ['At a market', 'At school', 'In the park']), q('What does she offer Erik?', ['An apple', 'A coffee', 'Some bread'])]],
  R104: ['Pris'],
  R105: ['Kaffe och te', ['Kaffe: 35 kronor', 'Te: 30 kronor', 'Bröd med ost: 45 kronor'],
    [q('How much is a tea?', ['30 kronor', '35 kronor', '45 kronor']), q('What costs the most?', ['The bread with cheese', 'The coffee', 'The tea'])]],
  R106: ['Böcker', ['En bok: 20 kronor', 'Tre böcker: 50 kronor']],
  R107: ['Från Maria'],
  R108: ['Idag', ['En flaska vatten: 10 kronor', 'Ett paket kaffe: 50 kronor'],
    [q('How much is a bottle of water?', ['10 kronor', '40 kronor', '50 kronor']), q('What costs 50 kronor?', ['A packet of coffee', 'A bottle of water', 'A kilo of apples'])]],
  R109: ['Till en fest', ['två paket kaffe,', 'en påse äpplen,', 'mycket frukt!'],
    [q('How many packets of coffee?', ['Two', 'One', 'Three']), q('What is the list for?', ['A party', 'School', 'A trip'])]],
  R201: ['Öppet', ['Öppet måndag till fredag: 9.00 till 18.00', 'Lördag: 10.00 till 16.00', 'Söndag: inte öppet']],
  R202: ['Från Erik', ['Anna!', 'Kan du komma på onsdag? Jag är hemma på onsdag och torsdag.', 'På lördag är jag inte hemma.', 'Erik'],
    [q('When is Erik at home?', ['Wednesday and Thursday', 'Saturday', 'Every day']), q('What does Erik say about Saturday?', ["He isn't at home", "He's at the cinema", "He's free"])]],
  R203: ['Museum', ['Inte öppet på måndag.', 'För barn: onsdag klockan 15.00']],
  R204: ['Skola', ['Ingen skola från den 20 december till den 6 januari.', 'Skola igen: tisdag den 7 januari']],
  R205: ['Fest', ['Fest i Uppsala', 'Lördag den 21 juni, 18.00', 'Musik! Vi dansar och sjunger.']],
  R206: ['Från Maria', ['I juli åker vi till havet.', 'I december är vi hemma.', 'Och du?'],
    [q('Where does Maria go in July?', ['To the sea', 'To the mountains', 'To the city']), q('Where is Maria in December?', ['At home', 'At the sea', 'In the mountains'])]],
  R207: ['Ingång', ['Öppet 9.00 till 19.00', 'Söndag: stängt']],
  R208: ['Station', ['Toalett och apotek: vid utgång 2', 'Information: vid ingång 1'],
    [q('Where are the toilet and the pharmacy?', ['By exit 2', 'By entrance 1', 'On the train']), q('Where can you get information?', ['By entrance 1', 'By exit 2', 'At the pharmacy'])]],
  R209: ['Bröd', ['Öppet varje dag 7.00 till 18.00', 'Varmt bröd klockan 7.00 och 12.00'],
    [q('Is it open on Sunday?', ['Yes', 'No', 'Only in the morning']), q('When is there warm bread?', ['At 7 am and 12 noon', 'At 6 am only', 'At 6 pm'])]],
  R211: ['Båt till Gotland', ['Avgång: 7.00, 9.00, 11.00', 'Söndag: en båt klockan 10.00 och en klockan 16.00'],
    [q('What time is the first boat?', ['7:00', '9:00', '11:00']), q('How many boats are there on Sunday?', ['Two', 'Three', 'One'])]],
  R212: ['Från Tom', ['Jag kommer fram klockan 17.30.', 'Mitt tåg avgår från Stockholm 15.00.', 'Vi ses!']],
  R213: ['Lektion', ['Läs en text.', 'Välj sedan en bild.'],
    [q('What do you do first?', ['Read a text', 'Choose a picture', 'Answer the questions']), q('What do you choose?', ['A picture', 'A book', 'A word'])]],
  R214: ['Glöm inte!', ['Läs långsamt.', 'Glöm inte din bok.'],
    [q('How should you read?', ['Slowly', 'Quickly', 'With a friend']), q("What shouldn't you forget?", ['Your book', 'Your key', 'Your phone'])]],
  R215: ['Övning', ['Välj ett nummer.', 'Titta i din bok.', 'Läs en text.'],
    [q('Where do you look?', ['In your book', 'At the door', 'In the notebook']), q('What do you do last?', ['Read a text', 'Choose a number', 'Close the book'])]],
  R301: ['Lunch', ['Soppa, kyckling med ris och sallad', 'Efterrätt: glass', '125 kronor']],
  R302: ['Fika', ['Kaffe: 30 kronor', 'Te: 25 kronor', 'Bulle: 35 kronor', 'Smörgås: 60 kronor'],
    [q('How much is a sandwich?', ['60 kronor', '30 kronor', '35 kronor']), q('What costs 25 kronor?', ['A tea', 'A coffee', 'A bun'])]],
  R303: ['Restaurang'],
  R304: ['Från Anna', ['Mitt hus ligger nära en kyrka.', 'Gå rakt fram.', 'Mitt hus ligger på den andra gatan till höger.'],
    [q("Where is Anna's house?", ['Near a church', 'Near a school', 'In the city center']), q('Which street is hers?', ['The second on the right', 'The first on the left', 'The second on the left'])]],
  R305: ['Höger eller vänster?', ['Museum: 200 meter till vänster', 'Kyrka: rakt fram', 'Station: till höger']],
  R306: ['Hotell', ['Hotell: 300 meter rakt fram, till höger', 'Buss 4: vid hörnet'],
    [q('Where is the hotel?', ['300 meters straight on, on the right', '300 meters on the left', 'Next to the station']), q('Where do you take bus 4?', ['At the corner', 'In front of the hotel', 'At the bridge'])]],
  R307: ['Lägenhet', ['Lägenhet på våning tre', 'Två sovrum, vardagsrum, kök och badrum', '9 000 kronor varje månad'],
    [q('How many bedrooms does the apartment have?', ['Two', 'Three', 'One']), q('Which floor is it on?', ['The third', 'The second', 'The first'])]],
  R308: ['Från Maria', ['Min lägenhet är ny och liten.', 'Den har ett sovrum, ett vardagsrum och ett kök.', 'Det finns ingen soffa.'],
    [q("What is Maria's new apartment like?", ['Small', 'Big', 'Old']), q("What doesn't it have?", ['A sofa', 'A kitchen', 'A bedroom'])]],
  R309: ['Rum', ['Rum: 3 000 kronor varje månad', 'Med säng, bord och stol', 'Nära en skola'],
    [q('How much is the room?', ['3,000 kronor a month', '300 kronor a month', '3,000 kronor a week']), q('What is in the room?', ['A bed, a table and a chair', 'A sofa and a lamp', 'A fridge'])]],
  R310: ['Jobb', ['Restaurang söker en kock', 'Tisdag till lördag, 17.00 till 23.00', 'Telefon: 070 123 45 67']],
  R312: ['Företag', ['Vi kör taxi i Uppsala.', 'Vi söker en kollega.', 'Du behöver körkort.'],
    [q('What does the company do?', ['It drives taxis', 'It sells cars', 'It cleans offices']), q('What do you need?', ["A driver's license", 'A university degree', 'A car'])]],
  R313: [null, ['Kära Erik!', 'Jag är vid havet med min familj. Det är varmt och skönt.', 'Kram, Anna']],
  R314: [null, ['Hej Maria!', 'På lördag fyller jag år. Kommer du på min fest?', 'Vi ses hemma hos mig, klockan åtta.', 'Tom']],
  R315: ['Till Anna', ['Anna!', 'Jag är inte hemma. Jag är tillbaka klockan sex.', 'Det finns soppa och bröd.', 'Erik'],
    [q('When is Erik back?', ['At six', 'At eight', 'At five']), q('What is there to eat?', ['Soup and bread', 'Pizza', 'Chicken and rice'])]],
}

// Drafts: Fable's fixes (verdict 7); rewrites of drafts that used a word now off but carry a kept word's line; new
// drafts where a cut left a word under three lines in its first circle; and the drafts cut (Fable's verdict 8, and
// those whose only reason was a word now off).
const FIX = { // id: [Swedish, English]
  // Fable proposed i Sverige; U44 comes before the countries circle, so the line says something true in the circle's own words.
  S44121: ['En miljon är mycket.', 'A million is a lot.'],
  S86104: ['Mitt kök har två fönster.', 'My kitchen has two windows.'],
  S86109: ['Jag hyr en lägenhet en trappa upp.', 'I rent a flat one floor up.'],
  // Fable proposed Vårt hus; vårt is not a course word (vår is), so the line keeps mitt.
  S86110: ['Mitt hus har ett svart tak.', 'My house has a black roof.'],
  S92139: ['Min familj är kristen.', 'My family is Christian.'],
  S94165: ['Hon är glad inför sommaren.', 'She is happy about the coming summer.'],
}
const REWRITE = { // kept words that need the line: the word now off taken out
  S91145: ['Jag behöver tid och kunskap.', 'I need time and knowledge.'], // kunskap
  S92126: ['Det är en riktig vän.', "That's a real friend."], // riktig
  S93108: ['Sverige är en demokrati.', 'Sweden is a democracy.'], // demokrati
  S93109: ['Utbildning är bra för alla.', 'Education is good for everyone.'], // utbildning
  S93113: ['Vi diskuterar en plan.', "We're discussing a plan."], // diskuterar
  S93116: ['Är du medlem?', 'Are you a member?'], // medlem
  S93121: ['Det är en intressant diskussion.', "It's an interesting discussion."], // diskussion
  S95113: ['Hon leder en grupp.', 'She leads a group.'], // leder
}
const ADD = [ // [id, unit, Swedish, English, why]
  ['S86116', 'U86', 'Mitt badrum har ett varmt golv.', 'My bathroom has a warm floor.', 'golv keeps three lines after S86104 lost "ett kallt golv"'],
  ['S86117', 'U86', 'Det är en lång trappa.', "It's a long staircase.", 'trappa keeps three lines after S86110 lost its staircase'],
  ['S92152', 'U92', 'Min hund är nästan mänsklig.', 'My dog is almost human.', 'mänsklig keeps three lines after S92130 (cut)'],
  ['S92153', 'U92', 'Det är en hög bro.', "It's a high bridge.", 'hög keeps three lines after S92104 (cut)'],
  ['S92154', 'U92', 'Solen är låg.', 'The sun is low.', 'låg keeps three lines after S92104 (cut)'],
]
const CUT_DRAFTS = {
  // Fable's verdict 8
  S92102: 'national and international contradicts itself', S92104: 'duplicates S92106', S92130: 'odd ("Love is human")',
  S93114: 'odd ("Politics is hard for a politician")', S92136: 'adds nothing its circle lacks', S93118: 'adds nothing its circle lacks',
}
const offWhy = (w) => `its word ${w} is turned off (${DAN})`
for (const [ids, w] of [['S91131 S91132 S91133', 'antal'], ['S91144 S91146', 'stöd'], ['S92101', 'politisk, ekonomisk'], ['S92103 S92128', 'social'],
  ['S92134 S92135', 'internationell'], ['S92137', 'nationell'], ['S92138', 'europeisk'], ['S92142', 'ekonomisk'], ['S92143 S92144', 'politisk'],
  ['S93107', 'samhälle, stat'], ['S93110 S93111', 'stat'], ['S93112', 'politik'], ['S93115', 'politiker'], ['S93117', 'parti'], ['S93122 S93123', 'debatt'],
  ['S93148 S93149 S93150', 'utveckling'], ['S95121 S95122 S95123', 'kräver'], ['S95130 S95131 S95132', 'utvecklar'], ['S95148 S95149 S95150', 'sker']])
  for (const id of ids.split(' ')) CUT_DRAFTS[id] = offWhy(w)
// Tatoeba lines cut: S44005 (verdict 6, ni to one person is the polite form the course keeps out); S57011, S58007,
// S58025 (verdict 9, smutsig, blomma and låda are off, so the line shows an unhinted word; swapped out rather than
// bringing back a word with one line); S93016 (Jag är politiker., politiker is off).
const CUT_TATOEBA = {
  S44005: ['U44', '3833748', 'ni to one person is the polite form the course keeps out'],
  S57011: ['U57', '2114786', 'smutsig is off (its circle teaches the -a and -t forms), so the line shows an unhinted word'],
  S58007: ['U58', '10661032', 'blomma is off (the circle teaches blommor), so the line shows an unhinted word'],
  S58025: ['U58', '9084188', 'låda is off, so the line shows an unhinted word'],
  S93016: ['U93', '', 'politiker is off'],
}

// 1. The workbook.
const wb = XLSX.readFile(join(ROOT, from))
const sheet = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' })
const words = sheet('words')
for (const form of OFF) {
  const w = words.find((x) => x.form === form && x.first_unit >= 'U91' && x.first_unit <= 'U95'); if (!w) throw new Error(`${form} is not a Part 4 vocabulary word`)
  if (String(w.status).startsWith('off')) throw new Error(`${form} is already off`)
  w.status = `off: ${OFF_REASON}`
}
wb.Sheets.words = XLSX.utils.json_to_sheet(words)
const texts = sheet('a1_texts')
for (const [id, [title, lines, questions]] of Object.entries(TEXTS)) {
  const t = texts.find((x) => x.id === id); if (!t) throw new Error(`${id} is not a text`)
  if (title) t.title = title
  if (lines) t.lines = lines.join('\n')
  if (questions) t.questions_json = JSON.stringify(questions)
  t.notes = `${t.notes ? t.notes + '; ' : ''}reworded into words taught by ${t.unit_id} (${WHY}, verdict 11)`
}
wb.Sheets.a1_texts = XLSX.utils.json_to_sheet(texts)
const canDo = sheet('can_do')
const CAN = { U92: 'I can recognize common describing words: high, low, real, similar, shared.', U93: 'I can recognize the words of a simple news item: elections, votes, rights, democracy.' }
for (const [u, text] of Object.entries(CAN)) { const c = canDo.find((x) => x.unit_id === u); if (!c) throw new Error(`no can_do for ${u}`); c.statement = text }
wb.Sheets.can_do = XLSX.utils.json_to_sheet(canDo)
const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, `${WHY} and Dan's calls: ${OFF.length} Kelly newsroom words in U91 to U95 turned off (stoplisted, drafts only); ${Object.keys(TEXTS).length} reading texts reworded into taught words; U92 and U93 can-do lines follow their circles.`])
wb.Sheets.README = XLSX.utils.aoa_to_sheet(r)
XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}: ${OFF.length} words off, ${Object.keys(TEXTS).length} texts reworded`)

// 2. Drafts.
const drafts = read('content-sv/drafts.json')
const byId = new Map(drafts.sentences.map((d) => [d.sentence_id, d]))
for (const [id, [sv, en]] of Object.entries({ ...FIX, ...REWRITE })) {
  const d = byId.get(id); if (!d) throw new Error(`${id}: not a draft`)
  const was = `${d.french} | ${d.english}`
  Object.assign(d, { french: sv, english: en, notes: `${d.notes ?? ''}; ${FIX[id] ? 'fixed' : 'rewritten without a word now off'} ${today} (${WHY}); was "${was}"`.replace(/^; /, '') })
}
for (const [id, unit, sv, en, why] of ADD) {
  if (byId.has(id)) throw new Error(`${id} exists`)
  drafts.sentences.push({ sentence_id: id, unit_id: unit, french: sv, english: en, notes: `draft: ${why} (${WHY}), native check` })
}
const before = drafts.sentences.length
drafts.sentences = drafts.sentences.filter((d) => !CUT_DRAFTS[d.sentence_id])
if (before - drafts.sentences.length !== Object.keys(CUT_DRAFTS).length) throw new Error(`cut ${before - drafts.sentences.length} drafts, expected ${Object.keys(CUT_DRAFTS).length}`)
write('content-sv/drafts.json', drafts)

// 3. Decisions: Tatoeba cuts, generated answers cut, hints, names.
const dec = read('content-sv/review-decisions.json'), packs = read('content-sv/sweep/packs-review.json')
const S = read('content-sv/raw/sentences.json')
for (const [sid, [unit, tat, why]] of Object.entries(CUT_TATOEBA)) {
  const s = S.find((x) => x.sentence_id === sid); if (!s || s.source !== 'tatoeba') throw new Error(`${sid}: not a Tatoeba line`)
  const tid = String(s.source_id); if (tat && tid !== tat) throw new Error(`${sid}: Tatoeba #${tid}, expected ${tat}`)
  if (!dec.cut_sentences.includes(sid)) dec.cut_sentences.push(sid)
  ;((packs[unit] ??= {}).reject ??= {})[tid] = `${why} (${WHY})`
}
// Accepted answers generated from Tatoeba that use vad (U11) in U33, before the course teaches it (verdict 10).
dec.cut_answers = [...new Set([...(dec.cut_answers ?? []), 'GS33103-4446756', 'GS33103-4446755'])]
const HINTS = {
  W127: ['where; was (past of vara)', 'U62 teaches Igår var det torsdag; Wiktionary: var, past indicative of vara'],
  W047: ['tycker om: to like; om: if, about', 'Wiktionary: om, conjunction if, preposition about; tycka om, to like'],
  W162: ['to; for (till mig); another (en syster till)', 'Wiktionary: till, preposition to, for; adverb another, more'],
  W1481: ['nice, pleasant (det är skönt)', 'Wiktionary: skönt, indefinite neuter singular of the adjective skön, comfortable, pleasurable'],
}
for (const [id, [hint, src]] of Object.entries(HINTS)) dec.claude_hints[id] = { hint, source: `${WHY}; ${src}` }
if (!dec.names.includes('Gotland')) dec.names.push('Gotland') // R211, Båt till Gotland
write('content-sv/review-decisions.json', dec); write('content-sv/sweep/packs-review.json', packs)

// 4. skönt: Wiktionary files it under ===Noun=== with {{head|sv|adjective form}} and {{adj form of|sv|skön}}, so it is
// filed as the adjective form it says it is, and its lemma gloss is skön's adjective sense, not the noun's.
const senses = read('content-sv/word-senses.json')
senses.W1481 = { pos: 'Noun', file_as: 'Adjective', lemma_match: 'comfortable, pleasurable', note: `head template says adjective form; Fable's phase 6 review, verdict 5 (${today})` }
write('content-sv/word-senses.json', senses)

// 5. Notes and overview lines that named a word now off or used a line now cut.
const notes = read('content-sv/grammar_notes.json'), points = read('content-sv/grammar-points.json')
const note = (u) => notes.notes.find((n) => n.unit_id === u)
const swap = (u, from, to) => { const n = note(u); if (!n.rule.includes(from)) throw new Error(`${u}: note has no "${from}"`); n.rule = n.rule.replace(from, to) }
swap('U92', 'Words for kinds: **social**, **politisk**, **ekonomisk**, **nationell**, **internationell**, **europeisk**:\n**Paris är en europeisk stad.**',
  '**Riktig** is real, **liknande** similar and **gemensam** shared:\n**Det är en riktig vän.**')
swap('U93', 'The words of the news: **ett samhälle** (a society), **en stat**, **politik**, **ett parti**, **en debatt**:\n**Sverige är en stat i Europa.**\n**Han är medlem i ett parti.**',
  'The words of the news: **demokrati**, **makt** (power), **en rättighet** (a right), **en artikel**:\n**Sverige är en demokrati.**\n**Medlem** is member: **Är du medlem?**')
note('U93').example_sentence_ids = 'S93108;S93116;S93119'
swap('U95', '\n\n**Det sker** is it happens: **Vad sker nu?**', '')
const pswap = (u, from, to) => { if (!points.points[u].includes(from)) throw new Error(`${u}: overview has no "${from}"`); points.points[u] = points.points[u].replace(from, to) }
pswap('U91', '; **ett antal** (a number of)', '')
pswap('U93', '**Ett samhälle**, **en stat**, **ett parti**: the words of the news; **vem röstar du på?**; **jag är medlem i …**', '**Demokrati**, **makt**, **en rättighet**: the words of the news; **vem röstar du på?**; **är du medlem?**')
pswap('U93', '; **utbildning**, **demokrati**', '; **utbildning**')
pswap('U95', '; **det sker** (it happens)', '')
write('content-sv/grammar_notes.json', notes); write('content-sv/grammar-points.json', points)
console.log(`drafts: ${Object.keys(FIX).length} fixed, ${Object.keys(REWRITE).length} rewritten, ${ADD.length} added, ${Object.keys(CUT_DRAFTS).length} cut; Tatoeba cut ${Object.keys(CUT_TATOEBA).length}; answers cut 2; hints ${Object.keys(HINTS).length}`)
