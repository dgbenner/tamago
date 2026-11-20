// Fable's Portuguese Parts 2 to 4 review, the regional words (Dan, 2026-11-19; _review/portuguese-part2-check.md,
// -part3-, -part4-): the course teaches the Brazilian word and accepts Portugal's, as Spanish does with Mexico's.
// Workbook: postal (código postal), correios, condutor, alojamento and tenda are turned off (ids kept) and CEP, correio,
// cobrador and hospedagem added (motorista and barraca the course already has). The drafts that used the Portugal word
// are rewritten with the Brazilian one in content-pt/drafts.json, the three Tatoeba lines with one are cut and redrafted
// (ids S<unit>301, notes carry the Tatoeba id), the Portugal wording is an accepted answer (review-decisions
// accepted_additions with a keep ruling), and the Glossary hints say which is which. Also here: the senses and lemmas
// Fable flagged (caro, tocar, fogão, cada, viúvo) and the impersonal notes (chove, há, neva).
// Usage: node scripts/review/pt-parts2-4.mjs _source/tamago-pt-data-v7.xlsx _source/tamago-pt-data-v8.xlsx
import { join } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '../..')
const [from, to] = process.argv.slice(2)
const today = '2026-11-19'
const WHY = "Fable's Portuguese Parts 2 to 4 review (2026-11-19; _review/portuguese-part2-check.md, -part3-, -part4-), Dan's ruling: the Brazilian word is taught, Portugal's is accepted"

// 1. The workbook.
const wb = XLSX.readFile(join(ROOT, from))
const words = XLSX.utils.sheet_to_json(wb.Sheets.words, { defval: '' })
const OFF = { postal: 'CEP', correios: 'correio', condutor: 'motorista, cobrador', alojamento: 'hospedagem', tenda: 'barraca' }
for (const [form, br] of Object.entries(OFF)) {
  const w = words.find((x) => x.form === form); if (!w) throw new Error(`${form} is not in the workbook`)
  w.status = `off: Portugal; the course teaches ${br} (Dan, ${today})`
}
const NEW = [['W943', 'CEP', 'U45'], ['W1375', 'correio', 'U66'], ['W1755', 'cobrador', 'U84'], ['W1896', 'hospedagem', 'U95']]
for (const [id, form, unit] of NEW) {
  if (words.some((w) => w.word_id === id)) throw new Error(`${id} is taken`)
  if (words.some((w) => w.form === form)) throw new Error(`${form} is already in the workbook`)
  const like = words.find((w) => w.first_unit === unit)
  words.push({ ...like, word_id: id, form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '', first_unit: unit, needs_image: 'no', image_file: '',
    wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form)}#Portuguese`, status: 'pull from Wiktionary', notes: `Brazilian word in place of Portugal's (Fable's Parts 2 to 4 review, ${today})` })
}
wb.Sheets.words = XLSX.utils.json_to_sheet(words)
const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, "Fable's Portuguese Parts 2 to 4 review: CEP (W943, U45), correio (W1375, U66), cobrador (W1755, U84), hospedagem (W1896, U95) in place of postal, correios, condutor, alojamento and tenda (off)."])
wb.Sheets.README = XLSX.utils.aoa_to_sheet(r)
XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}: 5 words off, 4 added`)

// 2. Drafts: the Portugal word out, the Brazilian one in; the three Tatoeba lines cut and redrafted.
const dpath = join(ROOT, 'content-pt/drafts.json'), decPath = join(ROOT, 'content-pt/review-decisions.json'), packsPath = join(ROOT, 'content-pt/sweep/packs-review.json')
const drafts = JSON.parse(readFileSync(dpath, 'utf8')), dec = JSON.parse(readFileSync(decPath, 'utf8')), packs = JSON.parse(readFileSync(packsPath, 'utf8'))
const REWRITE = { // id: [new Portuguese, English (unchanged unless given), Portugal wording accepted]
  S45107: ['Qual é o CEP?', "What's the zip code?"], S45108: ['Não sei o CEP.', "I don't know the zip code."],
  S66103: ['Onde fica o correio?', "Where's the post office?"], S66104: ['O correio fica perto.', 'The post office is nearby.'], S66105: ['O correio está aqui.', 'The post office is here.'],
  S84104: ['O motorista do ônibus é simpático.', 'The bus driver is nice.'], S84105: ['O cobrador pede a passagem.', 'The conductor asks for the ticket.'],
  S95107: ['A hospedagem é cara.', 'Accommodation is expensive.'], S95108: ['Procuro hospedagem perto da praia.', "I'm looking for accommodation near the beach."], S95109: ['A hospedagem tem café da manhã.', 'The accommodation has breakfast.'],
  S95116: ['A barraca é grande.', 'The tent is big.'], S95117: ['Onde está a barraca?', 'Where is the tent?'],
}
let ad = Math.max(0, ...dec.accepted_additions.map((a) => Number(a.answer_id.slice(2)))) + 1
const accept = (sid, answer, note) => {
  const id = `AD${String(ad++).padStart(4, '0')}`
  dec.accepted_additions.push({ answer_id: id, sentence_id: sid, direction: 'en_to_fr', answer, source: `${WHY}: ${note}`, status: 'live' })
  dec.accepted_answers[id] = { action: 'keep', answer, by: WHY }
}
for (const [sid, [pt, en]] of Object.entries(REWRITE)) {
  const d = drafts.sentences.find((x) => x.sentence_id === sid); if (!d) throw new Error(`${sid}: not a draft`)
  const was = d.french
  Object.assign(d, { french: pt, english: en, notes: `${d.notes ?? ''}; rewritten ${today} with the Brazilian word (${WHY}); was "${was}"`.replace(/^; /, '') })
  accept(sid, was, "Portugal's wording of the same line")
}
// Tatoeba lines with a Portugal word: cut, and the line redrafted with the Brazilian word.
const CUT = [['S45018', '11748207', 'U45', 'S45301', 'O que é um CEP?', 'What is a zip code?', 'código postal'],
  ['S84019', '1304500', 'U84', 'S84301', 'Ele é um mau motorista.', 'He is a bad driver.', 'condutor'],
  ['S95010', '6695996', 'U95', 'S95301', 'A Maria não está na barraca.', "Maria isn't in the tent.", 'tenda']]
const S = JSON.parse(readFileSync(join(ROOT, 'content-pt/raw/sentences.json'), 'utf8'))
for (const [sid, tat, unit, nid, pt, en, word] of CUT) {
  const s = S.find((x) => x.sentence_id === sid); if (!s || String(s.source_id) !== tat) throw new Error(`${sid}: not the expected Tatoeba line`)
  if (!dec.cut_sentences.includes(sid)) dec.cut_sentences.push(sid)
  ;(packs[unit] ??= {}).reject ??= {}
  packs[unit].reject[tat] = `${word} is Portugal's word; the line is redrafted as ${nid} with the Brazilian one (Fable's Parts 2 to 4 review, ${today})`
  if (drafts.sentences.some((x) => x.sentence_id === nid)) throw new Error(`${nid} exists`)
  drafts.sentences.push({ sentence_id: nid, unit_id: unit, french: pt, english: en, notes: `draft: Tatoeba #${tat} with the Brazilian word (${WHY}); was "${s.french}" (${sid}, cut)` })
  accept(nid, s.french, `Portugal's wording, Tatoeba #${tat}`)
}
// 3. Hints: the regional words, and the senses Fable flagged.
const HINTS = {
  W943: 'zip code, postal code (CEP; Portugal: código postal)', W1375: 'post office; mail (Portugal: os correios)', W1755: 'fare collector (on a bus)', W1896: 'accommodation, lodging (Portugal: alojamento)',
  W1887: 'tent (for camping; Portugal: tenda)', W1646: 'driver (bus, taxi; Portugal also condutor)', W1888: 'tent (Portugal; in Brazil a canopy or stall)',
  W1823: 'stove', W915: 'expensive', W1469: 'to play (an instrument); to touch', W1470: 'I play (an instrument); I touch',
  W1432: 'it rains (chover: only chove is used)', W1433: 'to rain (impersonal: chove)', W1421: 'there is, there are (haver: only há is used)', W1434: 'it snows (nevar: only neva is used)',
  W1240: 'each, every', W1728: 'widowed; a widower',
}
for (const [id, hint] of Object.entries(HINTS)) dec.claude_hints[id] = { hint, source: `${WHY}; course sense` }
writeFileSync(dpath, JSON.stringify(drafts, null, 2) + '\n'); writeFileSync(decPath, JSON.stringify(dec, null, 2) + '\n'); writeFileSync(packsPath, JSON.stringify(packs, null, 2) + '\n')
// 4. Senses: the whole sense, or the lemma, Fable asked for.
const spath = join(ROOT, 'content-pt/word-senses.json'), senses = JSON.parse(readFileSync(spath, 'utf8'))
Object.assign(senses, {
  W915: { pos: 'Adjective', match: 'expensive', note: 'the prices circle teaches expensive, not dear (Fable, 2026-11-19)' },
  W1469: { pos: 'Verb', match: 'to play (a musical instrument)', note: 'Free Time teaches toco violão (Fable, 2026-11-19)' },
  W1240: { pos: 'Pronoun', lemma: 'cada', note: 'its gloss "examples of the thing" read as a form of "the" (Fable, 2026-11-19)' },
  W1728: { pos: 'Adjective', lemma: 'viúvo', note: 'its gloss "a state of widowhood" read as a form of "widowhood" (Fable, 2026-11-19)' },
})
writeFileSync(spath, JSON.stringify(senses, null, 2) + '\n')
console.log(`drafts rewritten ${Object.keys(REWRITE).length}, cut and redrafted ${CUT.length}, accepted additions to ${ad - 1}, hints ${Object.keys(HINTS).length}, senses 4`)
