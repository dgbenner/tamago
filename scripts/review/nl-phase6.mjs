// Fable's Dutch phase 6 review (2026-11-21; _review/dutch-phase6-review.md) and Dan's calls (2026-11-22), applied.
// Workbook v7 to v8: the Read and Answer texts reworded into words each circle has taught (as Danish R306 was), and
// U41's overview line. review-decisions: the cut lines, the hints whose first sense was not the one the lines use, the
// diminutives' gender (het, Wiktionary's headword line), and the generated en_to_fr answers that use untaught or Belgian
// words (generated_off). drafts.json: one new line for each word a cut left under three lines in its circle. U41's note
// says the polite u is the course's policy from Part 2.
// Usage: node scripts/review/nl-phase6.mjs _source/tamago-nl-data-v7.xlsx _source/tamago-nl-data-v8.xlsx
import { join } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '../..')
const [from, to] = process.argv.slice(2)
const today = '2026-11-22'
const FABLE = "Fable's Dutch phase 6 review (2026-11-21)"
const DAN = `Dan's call (${today})`
const readJson = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'))
const writeJson = (p, x) => writeFileSync(join(ROOT, p), JSON.stringify(x, null, 2) + '\n')

// 1. Read and Answer texts: every line, title and question in the circle's taught words. id: { field: new value }.
// A question is [question, choices, answer index]; questions not named stay as they were.
const TEXTS = {
  R101: { lines: 'Groente en fruit\nEen kilo appels: € 2\nMarkt: maandag en zaterdag' },
  R102: { lines: 'Markt op het plein\nOp zondag\nFruit, groente, brood en kaas', q: { 0: ['When is the market?', ['On Sundays', 'On Mondays', 'Every day'], 0] } },
  R103: { title: 'Van Anna' },
  R104: { title: 'Wat kost het?' },
  R105: { title: 'Koffie en thee', lines: 'Koffie: 3 euro\nThee: 2 euro\nBrood met kaas: 4 euro', q: { 1: ['What costs the most?', ['The bread with cheese', 'The coffee', 'The tea'], 0] } },
  R106: { lines: 'Oude boeken\nEen boek: 5 euro\nDrie boeken: 12 euro' },
  R107: { title: 'Van Maria' },
  R108: { lines: 'Water: een fles, 1 euro\nMelk: een fles, 2 euro\nKoffie: een pak, 5 euro',
    q: { 0: ['How much is a bottle of water?', ['1 euro', '2 euros', '5 euros'], 0], 1: ['What costs 5 euros?', ['A pack of coffee', 'A bottle of milk', 'A bottle of water'], 0] } },
  R109: { lines: 'Voor het feest:\neen fles water,\neen kilo kaas,\nveel fruit!', q: { 0: ['How much cheese?', ['A kilo', 'Two kilos', 'Three kilos'], 0] } },
  R201: { lines: 'Open van maandag tot vrijdag: 9.00 tot 18.00 uur\nZaterdag: 10.00 tot 17.00 uur\nZondag: dicht' },
  R202: { title: 'Van Jan', lines: 'Anna,\nwil je woensdag naar de film gaan? Ik ben woensdag en donderdag thuis.\nOp zaterdag ben ik op school.\nJan',
    q: { 0: ['When is Jan at home?', ['Wednesday and Thursday', 'Saturday', 'Every day'], 0], 1: ['Where is Jan on Saturday?', ['At school', 'At the movies', 'At home'], 0] } },
  R203: { lines: 'Het museum is op maandag dicht.\nVoor kinderen: woensdag om 15.00 uur' },
  R204: { lines: 'De school is dicht van 20 december tot 5 januari.\nDe eerste dag op school: maandag 6 januari' },
  R206: { title: 'Van Maria', lines: 'In juli gaan we naar zee.\nIn december gaan we naar de stad.\nEn jij?',
    q: { 0: ['Where does Maria go in July?', ['To the sea', 'To the forest', 'To the mountains'], 0], 1: ['When does she go to the city?', ['In December', 'In July', 'In spring'], 0] } },
  R208: { lines: 'Toilet: boven\nApotheek: naast de uitgang\nInformatie: bij de ingang', q: { 0: ['Where is the toilet?', ['Upstairs', 'Downstairs', 'Next to the exit'], 0] } },
  R209: { lines: 'Bakker Jan\nElke dag open van 7.00 tot 18.00 uur\nWarm brood om 7.00 en om 12.00 uur', q: { 1: ['When is there warm bread?', ['At 7 am and 12 noon', 'At 6 am only', 'At 6 pm'], 0] } },
  R212: { title: 'Van Tom' },
  R213: { lines: 'Luister naar de tekst.\nSchrijf een antwoord.\nKies een foto.', q: { 0: ['What do you do first?', ['Listen to the text', 'Write an answer', 'Choose a photo'], 0] } },
  R214: { lines: 'Doe de deur dicht, alsjeblieft.\nLet op: doe de deur langzaam dicht.' },
  R215: { lines: 'Kies een nummer.\nOpen het boek.\nLees de tekst.' },
  R301: { title: 'Het menu van de dag' },
  R302: { title: 'Koffie en taart', lines: 'Koffie: € 3\nThee: € 2,50\nTaart: € 4,50\nSoep: € 5',
    q: { 0: ['How much is the cake?', ['4.50 euros', '3 euros', '5 euros'], 0], 1: ['What costs 3 euros?', ['A coffee', 'A tea', 'A soup'], 0] } },
  R304: { title: 'Van Anna' },
  R305: { lines: 'Museum: vijf minuten, links\nKerk: rechtdoor\nStation: rechts', q: { 0: ['Where is the museum?', ['Five minutes, on the left', 'Five minutes, on the right', 'Straight on'], 0] } },
  R306: { lines: 'Het hotel is dicht bij het station.\nVijf minuten lopen naar het plein\nBus: voor het hotel',
    q: { 0: ['How far is the hotel from the square?', ['Five minutes on foot', 'Five minutes by car', 'Half an hour on foot'], 0], 1: ['Where can you take the bus?', ['In front of the hotel', 'Behind the hotel', 'At the station'], 0] } },
  R307: { lines: 'Huis in de stad\nEen kamer, een keuken en een badkamer\nMet tuin\n€ 1200 per maand',
    q: { 0: ['How many rooms does the house have, besides the kitchen and bathroom?', ['One', 'Two', 'Three'], 0], 1: ['What else does it have?', ['A garden', 'A balcony', 'A garage'], 0] } },
  R308: { title: 'Van Maria' },
  R309: { lines: 'Kamer te huur voor een student\nMet bed, tafel en stoel\nDicht bij het station', q: { 1: ['Where is it?', ['Near the station', 'Near the university', 'In the countryside'], 0] } },
  R310: { title: 'Werk', lines: 'Werk voor een kok in een restaurant\nVan dinsdag tot zaterdag, 17.00 tot 23.00 uur\nBel 06 12 20 18 09' },
  R311: { lines: 'Ik ben verpleegkundige en ik werk in een ziekenhuis.\nIk begin om zeven uur in de ochtend.\nMijn baas is heel aardig.' },
  R312: { lines: 'Werk bij een bedrijf: auto rijden\nMet rijbewijs\nVan maandag tot vrijdag', q: { 0: ['What is the job?', ['Driving', 'Cooking', 'Teaching'], 0] } },
  R315: { title: 'Van Jan', lines: 'Anna,\nik ben niet thuis. Ik ben om zes uur terug.\nHet eten staat in de keuken.\nJan', q: { 1: ['Where is the food?', ['In the kitchen', 'At a restaurant', 'At school'], 0] } },
}
const U41_POINT = '**Hoe heet u?** politely: **u**, the polite you, takes the verb form of **jij** (**u bent**, **kent u**); **uw** for your; **aangenaam**; **niet** after the verb: **ik ken hem niet**; from here **u** to strangers, **je** to friends'

const wb = XLSX.readFile(join(ROOT, from))
const texts = XLSX.utils.sheet_to_json(wb.Sheets.a1_texts, { defval: '' })
for (const [id, ch] of Object.entries(TEXTS)) {
  const t = texts.find((x) => x.id === id); if (!t) throw new Error(`${id} is not in the workbook`)
  const was = [t.title, t.lines].join(' / ')
  if (ch.title) t.title = ch.title
  if (ch.lines) t.lines = ch.lines
  if (ch.q) {
    const qs = JSON.parse(t.questions_json)
    for (const [k, [question, choices, answer]] of Object.entries(ch.q)) qs[k] = { question, choices, answer }
    t.questions_json = JSON.stringify(qs)
  }
  t.notes = `${t.notes ? t.notes + '; ' : ''}reworded ${today} into words its circle has taught (${FABLE}, Appendix C); was "${was.replace(/\n/g, ' | ')}"`
}
wb.Sheets.a1_texts = XLSX.utils.json_to_sheet(texts)
const units = XLSX.utils.sheet_to_json(wb.Sheets.units, { defval: '' })
units.find((u) => u.unit_id === 'U41').grammar_point = U41_POINT
wb.Sheets.units = XLSX.utils.json_to_sheet(units)
const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, `${FABLE}: ${Object.keys(TEXTS).length} Read and Answer texts reworded into taught words; U41's overview line says u is used with strangers from here (${DAN}: the polite u from Part 2 is policy).`])
wb.Sheets.README = XLSX.utils.aoa_to_sheet(r)
XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}: ${Object.keys(TEXTS).length} texts reworded, U41 overview line`)

// 2. Notes and overview lines (content-nl/grammar_notes.json, grammar-points.json): U41 states the policy.
const notes = readJson('content-nl/grammar_notes.json'), points = readJson('content-nl/grammar-points.json')
const n41 = notes.notes.find((x) => x.unit_id === 'U41')
const POLICY = '\n\nFrom here on the course says **u** to strangers, in shops and on forms, and **je** to friends and family.'
if (!n41.rule.includes('From here on')) n41.rule = n41.rule.replace('\n\n**Aangenaam**', POLICY + '\n\n**Aangenaam**')
points.points.U41 = U41_POINT
writeJson('content-nl/grammar_notes.json', notes); writeJson('content-nl/grammar-points.json', points)

// 3. review-decisions.
const dec = readJson('content-nl/review-decisions.json')
const CUT = {
  S56002: `${DAN}: register, "Ben je gek?" (Fable: the English "Are you stupid?" is an insult the Dutch is not)`,
  S75009: `${DAN} and ${FABLE}: a love line, cut in every earlier pass`,
  S75010: `${DAN} and ${FABLE}: a love line, cut in every earlier pass`,
  S87017: `${FABLE}: "een boer" contradicts U87's note (no een before a job)`,
  S93111: `${FABLE}: idiom ("not my concern")`,
  S95123: `${FABLE}: was as "wash" in U95, where was is taught as the past of zijn`,
}
dec.cut_sentences = [...new Set([...(dec.cut_sentences ?? []), ...Object.keys(CUT)])]
dec.cut_reasons = { ...(dec.cut_reasons ?? {}), ...CUT }
const HINTS = {
  W1605: ['a cup (small), diminutive of kop', 'Wiktionary kopje: diminutive of kop; kop: cup (for drinking)'],
  W1613: ['a drink', 'Wiktionary drankje: a beverage'],
  W1332: ['a ticket', 'Wiktionary kaartje: ticket, especially a train ticket'],
  W1112: ['to wear; to carry', 'Wiktionary dragen: to carry; to wear (clothes); its lines are mostly wear'],
  W1111: ['wears; carries (dragen)', 'Wiktionary dragen: to carry; to wear (clothes); its lines are mostly wear'],
  W1338: ['to drive; to ride', 'Wiktionary rijden: to ride; to drive; its lines are drive'],
  W1337: ['drives; rides (rijden)', 'Wiktionary rijden: to ride; to drive; its lines are drive'],
  W1719: ['hard (werkt hard); loud; fast', 'Wiktionary hard: adjective hard, loud, fast; adverb fast, very, loudly; its lines are werkt hard'],
  W1740: ['to sign; to draw (tekenen)', 'Wiktionary tekenen: to draw; to sign (write a signature); U88 teaches it as sign'],
}
for (const [id, [hint, why]] of Object.entries(HINTS)) dec.claude_hints[id] = { hint, source: `${FABLE}, verdicts 1, 2 and 13 (${today}): ${why}` }
const GENDER = { W1605: 'het', W1613: 'het', W1332: 'het' }
Object.assign(dec.gender, GENDER)
dec.gender_notes = { ...(dec.gender_notes ?? {}), ...Object.fromEntries(Object.keys(GENDER).map((id) => [id, `${DAN}: Wiktionary's headword gives the diminutive n (nl-noun-dim), so het; reverses the Part 4 call that left diminutives without a gender`])) }
// Generated en_to_fr answers (checks/generated_answers.json) with a word the circle has not taught, or a Belgian form.
const BELGIAN = 'Belgian Dutch; the course is Netherlands Dutch'
const GEN = {
  'GS11103-5460013': 'zullen (U64)', 'GS3101-11779284': 'wel (U36)', 'GS31101-8575465': 'jullie (U06)',
  'GS31109-387597': 'kunt (U34), u and alstublieft (U41), spreken (not a course word)', 'GS31109-4271120': `trager: ${BELGIAN}`,
  'GS31109-481102': 'spreekt (U46), u and alstublieft (U41)', 'GS3111-514767': `Excuseer: ${BELGIAN}`, 'GS3111-4558027': 'spijt (U26), me (U41)',
  'GS3111-7344340': 'mijn (U10), excuses (not a course word)', 'GS4103-659477': 'hou (U75)', 'GS4103-4654636': 'lust (not a course word)',
  'GS4104-5460243': 'hou (U75)', 'GS53112-12997914': 'gearriveerd (not a course word)', 'GS55109-3214656': 'balpen, bureau (not course words)',
  'GS64107-9341669': "zo'n (not a course word)", 'GS65102-4660585': 'begint (not a course word)', 'GS72108-2782050': 'winderig (not a course word)',
  'GS73125-378004': 'lopend (U84)', 'GS8104-803547': 'zit (U71)', 'GS88106-689600': `gij: ${BELGIAN}`,
  'GS88111-7745670': 'Gelieve, ondertekenen (not course words; Gelieve is Belgian register)', 'GS93107-9588916': 'last, tandpijn (not course words)',
  'GS93111-8180745': 'zaak (not a course word)', 'GS94104-6116987': `Jazeker: ${BELGIAN}`,
}
dec.generated_off = { ...(dec.generated_off ?? {}), ...Object.fromEntries(Object.entries(GEN).map(([id, w]) => [id, `${FABLE}, Appendix B (${today}): untaught by its circle: ${w}`])) }
dec._generated_off = 'Generated en_to_fr answers (checks/generated_answers.json) build-content leaves out: answer id to why. Accepted answers use only words the course has taught (Dan, 2026-11-22).'
writeJson('content-nl/review-decisions.json', dec)

// 4. Drafts: one line each where a cut left a word under three lines in its circle (all in taught words).
const drafts = readJson('content-nl/drafts.json')
const NEW = [
  ['S56102', 'U56', 'Mijn kat is gek.', 'My cat is crazy.', 'gek, for S56002 (cut)'],
  ['S75107', 'U75', 'Dit boek gaat over liefde.', 'This book is about love.', 'liefde, for S75009 (cut)'],
  ['S75108', 'U75', 'Liefde is belangrijk.', 'Love is important.', 'liefde, for S75010 (cut)'],
  ['S87113', 'U87', 'Mijn vader is boer.', 'My father is a farmer.', 'boer, for S87017 (cut); no een before a job, as U87 teaches'],
  ['S93116', 'U93', 'Mijn moeder heeft zorg nodig.', 'My mother needs care.', 'zorg, for S93111 (cut)'],
  ['S95138', 'U95', 'Ik lees een boek voordat ik ga slapen.', 'I read a book before I go to sleep.', 'voordat, for S95123 (cut)'],
]
for (const [sentence_id, unit_id, french, english, why] of NEW) {
  if (drafts.sentences.some((d) => d.sentence_id === sentence_id)) continue
  drafts.sentences.push({ sentence_id, unit_id, french, english, notes: `draft ${today} (${FABLE}): ${why}` })
}
writeJson('content-nl/drafts.json', drafts)
console.log(`cuts ${Object.keys(CUT).length}, hints ${Object.keys(HINTS).length}, genders ${Object.keys(GENDER).length}, generated answers off ${Object.keys(GEN).length}, drafts ${NEW.length}`)
