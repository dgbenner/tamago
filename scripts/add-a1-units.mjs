// Adds the A1 units after Unit 5 (autonomous-build.md: the old Duolingo A1 order: plurals, adjectives,
// possessives, questions, numbers, colours, time, places). Same shape as U02 to U05: a draft unit, its words for
// the Wiktionary check, a tree row, and four "I can" statements checked against the CEFR A1 grid rows.
// Usage: node scripts/add-a1-units.mjs <from.xlsx> <to.xlsx>
import { join } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const [from, to] = process.argv.slice(2)
const wb = XLSX.readFile(join(ROOT, from))
const sheet = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' })
const header = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { header: 1, defval: '' })[0]
const save = (n, rows) => { const cols = [...header(n)]; for (const r of rows) for (const k of Object.keys(r)) if (!cols.includes(k)) cols.push(k); wb.Sheets[n] = XLSX.utils.json_to_sheet(rows, { header: cols }) }

// cd: [reading, listening, writing, speaking] statements; the grid rows they're checked against are fixed per skill.
const UNITS = [
  { id: 'U06', title: 'Plurals', topic: 'More than one', grammar: 'Plurals: les and des; most nouns add -s, some -x; nous sommes', contrast: 'un|des; une|des; le|les; sommes|sont', row: 5, pos: 1, after: 'row 3',
    words: ['des', 'nous', 'sommes', 'livres', 'lettres', 'chats', 'chiens', 'pommes', 'oiseaux', 'chevaux'],
    cd: ['I can understand short sentences about more than one person or thing.', 'I can recognize plural words like des and les when spoken slowly.', 'I can write short sentences about several people or things.', 'I can say simple things about us and about several people.'] },
  { id: 'U07', title: 'Adjectives', topic: 'Describing people and things', grammar: 'Adjectives agree with the noun (bon, bonne); most come after it, a few (beau, jeune, vieux) before', contrast: 'bon|bonne; beau|belle; vieux|vieille; gentil|gentille', row: 5, pos: 2, after: 'row 3',
    words: ['bon', 'bonne', 'beau', 'belle', 'jeune', 'vieux', 'vieille', 'gentil', 'gentille', 'très'],
    cd: ['I can understand simple descriptions of people and things.', 'I can recognize simple describing words when spoken slowly.', 'I can write a short sentence describing someone or something.', 'I can describe a person or a thing in a few words.'] },
  { id: 'U08', title: 'Possessives', topic: 'Whose is it', grammar: 'Possessives: mon, ma, mes; ton, ta, tes; son, sa, ses agree with the thing owned', contrast: 'mon|ma; mon|mes; ton|ta; son|sa', row: 6, pos: 1, after: 'row 5',
    words: ['mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'ami', 'amie'],
    cd: ['I can understand short sentences about what belongs to whom.', 'I can recognize my, your and his or her when spoken slowly.', 'I can write short sentences about my things and my friends.', 'I can say what is mine and ask what is yours.'] },
  { id: 'U09', title: 'Questions', topic: 'Asking', grammar: 'Questions: est-ce que, qu\'est-ce que, qui, où, pourquoi, and quel or quelle with a noun', contrast: 'quel|quelle; qui|où; est-ce que|qu\'est-ce que', row: 6, pos: 2, after: 'row 5',
    words: ['qui', 'où', 'est-ce que', 'qu\'est-ce que', 'quel', 'quelle', 'pourquoi', 'parce que'],
    cd: ['I can understand simple written questions about who, what and where.', 'I can understand simple questions asked slowly and clearly.', 'I can write a simple question.', 'I can ask and answer simple questions about familiar things.'] },
  { id: 'U10', title: 'Numbers', topic: 'Counting', grammar: 'Numbers two to ten; combien de with a noun', contrast: 'six|dix; deux|dix', row: 7, pos: 1, after: 'row 6',
    words: ['deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'combien'],
    cd: ['I can understand numbers and quantities in short sentences.', 'I can understand numbers when spoken slowly.', 'I can write numbers and how many of something.', 'I can say how many and ask how many.'] },
  { id: 'U11', title: 'Colours', topic: 'Colours', grammar: 'Colour words come after the noun and agree with it (vert, verte; blanc, blanche)', contrast: 'bleu|bleue; vert|verte; noir|noire; blanc|blanche', row: 7, pos: 2, after: 'row 6',
    words: ['rouge', 'bleu', 'bleue', 'vert', 'verte', 'noir', 'noire', 'blanc', 'blanche', 'jaune'],
    cd: ['I can understand short sentences about colours.', 'I can recognize colour words when spoken slowly.', 'I can write what colour something is.', 'I can say what colour something is.'] },
  { id: 'U12', title: 'Time', topic: 'Days and times', grammar: 'Time words: aujourd\'hui, demain, maintenant; le matin, le soir; days of the week without a capital', contrast: 'aujourd\'hui|demain; matin|soir', row: 8, pos: 1, after: 'row 7',
    words: ['aujourd\'hui', 'demain', 'maintenant', 'jour', 'matin', 'soir', 'semaine', 'heure', 'lundi', 'dimanche'],
    cd: ['I can understand simple sentences about days and times.', 'I can recognize days and time words when spoken slowly.', 'I can write when something happens.', 'I can say when something happens.'] },
  { id: 'U13', title: 'Places', topic: 'Around town', grammar: 'aller in the present: je vais, tu vas, il va; à and au (à + le); dans', contrast: 'vais|vas; vas|va; à|au', row: 8, pos: 2, after: 'row 7',
    words: ['ville', 'école', 'parc', 'restaurant', 'magasin', 'à', 'au', 'dans', 'vais', 'vas', 'va'],
    cd: ['I can understand simple sentences about where people are going.', 'I can recognize place names and où when spoken slowly.', 'I can write where I am going.', 'I can say where I am and where I am going.'] },
]
const SKILL_ROWS = [['reading', 'Reading'], ['listening', 'Listening'], ['writing', 'Writing'], ['speaking', 'Spoken interaction']]

const units = sheet('units').filter((u) => !UNITS.some((x) => x.id === u.unit_id))
UNITS.forEach((u, i) => units.push({ unit_id: u.id, lang_id: 'fr', cefr: 'A1', order: 6 + i, title: u.title, topic: u.topic, grammar_point: u.grammar, contrast_sets: u.contrast,
  can_do_ids: [0, 1, 2, 3].map((k) => `CD${21 + i * 4 + k}`).join(';'), branch_group: `row ${u.row}`, is_topic_pick: 'no', status: 'draft' }))
save('units', units)

const layout = sheet('tree_layout').filter((t) => !UNITS.some((x) => x.id === t.unit_id))
for (const u of UNITS) layout.push({ row: u.row, position: u.pos, unit_id: u.id, unlocks_after: u.after, notes: u.after === 'row 3' ? 'opens after row 3: Your topic (row 4) is optional' : '' })
save('tree_layout', layout)

const words = sheet('words').filter((w) => !/^W4\d\d$/.test(w.word_id))
const have = new Set(words.map((w) => w.form))
let n = 401
for (const u of UNITS) for (const form of u.words) {
  if (have.has(form)) throw new Error(`${form} is already a word`)
  words.push({ word_id: `W${n++}`, lang_id: 'fr', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '', first_unit: u.id, needs_image: 'no', image_file: '', wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#French`, status: 'pull from Wiktionary' })
}
save('words', words)

const canDo = sheet('can_do').filter((c) => Number(String(c.can_do_id).slice(2)) < 21)
const cefr = JSON.parse(readFileSync(join(ROOT, 'content/cefr_a1.json'), 'utf8'))
UNITS.forEach((u, i) => SKILL_ROWS.forEach(([skill, row], k) => {
  const id = `CD${21 + i * 4 + k}`
  canDo.push({ can_do_id: id, unit_id: u.id, skill, cefr: 'A1', statement: u.cd[k], source: `checked against CEFR self-assessment grid (Europass copy, Council of Europe 2004-2020), A1, ${row}` })
  cefr.statements[id] = row
}))
save('can_do', canDo)
writeFileSync(join(ROOT, 'content/cefr_a1.json'), JSON.stringify(cefr, null, 2) + '\n')

XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}: ${UNITS.length} units (U06 to U13), ${n - 401} words (W401 to W${n - 1}), ${UNITS.length * 4} can_do rows.`)
