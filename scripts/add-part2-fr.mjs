// French A1 · Part 2, Everyday Life (A1 Complete step 3, 2026-11-10): spelling and phone numbers (T02), age, address
// and nationality (T03), numbers, prices and quantities when shopping (T04), with three help circles. Words chosen
// from the FLELex A1 list where they fit the situations (plus the numbers, which A1 needs and FLELex leaves out), and
// checked against Tatoeba before they were added (scripts/circle-feasibility.mjs).
// Usage: node scripts/add-part2-fr.mjs <from.xlsx> <to.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')

// Rows 11 to 15 (help circles on .5 rows, gating nothing). The part's first row opens with the part.
export const PART2_FR = [
  { unit_id: 'U41', order: 101, row: 11, after: '', title: 'Your Name, Please', grammar: "Je m'appelle, tu t'appelles, vous vous appelez; nom and prénom; votre", tasks: 'T01;T02',
    words: ['nom', 'prénom', 'monsieur', 'madame', 'appelles', 'appelez', "m'", "t'", 'votre'] },
  { unit_id: 'U34', order: 101.5, row: 11.5, after: 'row 11', title: 'Spelling It Out', help: true, grammar: "Comment ça s'écrit ? Vous pouvez épeler ?", tasks: 'T02;T13',
    words: ['écrit', 'écrire', 'épeler', 'pouvez', 'peux'] },
  { unit_id: 'U42', order: 102, row: 12, after: 'row 11', title: 'Phone Numbers', grammar: 'Numbers 0 to 20; mon numéro, c\'est …', tasks: 'T02',
    words: ['téléphone', 'numéro', 'portable', 'appeler', 'zéro', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf', 'vingt'] },
  { unit_id: 'U43', order: 103, row: 12, after: 'row 11', title: 'Age and Birthdays', grammar: "J'ai … ans (avoir for age); né, née", tasks: 'T03',
    words: ['âge', 'ans', 'anniversaire', 'né', 'née', 'mois', 'année'] },
  { unit_id: 'U35', order: 103.5, row: 12.5, after: 'row 12', title: 'Checking Numbers', help: true, grammar: "Pardon, combien ? Vous pouvez répéter ? Un moment, je note.", tasks: 'T13',
    words: ['répéter', 'moment', 'attendez', 'noter', 'note'] },
  { unit_id: 'U44', order: 104, row: 13, after: 'row 12', title: 'Numbers to 100', grammar: 'Tens to 100: trente … cent; soixante-dix, quatre-vingts, quatre-vingt-dix', tasks: 'T04',
    words: ['trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingts', 'quatre-vingt-dix', 'cent'] },
  { unit_id: 'U45', order: 105, row: 13, after: 'row 12', title: 'Where You Live', grammar: "J'habite à … ; habiter like parler; près de, loin de", tasks: 'T03',
    words: ['habite', 'habites', 'habitez', 'habiter', 'rue', 'adresse', 'appartement', 'pays', 'étage', 'près', 'loin'] },
  { unit_id: 'U46', order: 106, row: 14, after: 'row 13', title: 'Countries and Languages', grammar: 'Je suis allemand, elle est allemande; en France, en Italie; parler + language', tasks: 'T03',
    words: ['France', 'Allemagne', 'Italie', 'Angleterre', 'Espagne', 'allemand', 'espagnol', 'italien', 'américain', 'chinois', 'japonais', 'langue', 'langues', 'étranger'] },
  { unit_id: 'U47', order: 107, row: 14, after: 'row 13', title: 'At the Market', grammar: 'Je voudrais … (polite asking); acheter: j\'achète; des fruits, des légumes', tasks: 'T04',
    words: ['marché', 'acheter', 'achète', 'achètes', 'voudrais', 'voulez', 'kilo', 'fruits', 'légumes', 'fruit'] },
  { unit_id: 'U36', order: 107.5, row: 14.5, after: 'row 14', title: 'Checking You Understood', help: true, grammar: "D'accord. J'ai compris. C'est vrai ? Exactement.", tasks: 'T13',
    words: ["d'accord", 'compris', 'exactement', 'vrai'] },
  { unit_id: 'U48', order: 108, row: 15, after: 'row 14', title: 'How Much Is It?', grammar: 'Ça coûte combien ? Ça coûte … euros; c\'est cher', tasks: 'T04',
    words: ['prix', 'coûte', 'coûtent', 'euro', 'euros', 'cher', 'chère', 'payer', 'carte', 'argent', 'voilà'] },
  { unit_id: 'U49', order: 109, row: 15, after: 'row 14', title: 'Bottles and Bags', grammar: 'Une bouteille de …, un paquet de …: de after a quantity; beaucoup de, assez de, trop de', tasks: 'T04',
    words: ['bouteille', 'paquet', 'boîte', 'verre', 'sac', 'assez', 'beaucoup', 'peu', 'trop'] },
]

// Words taken out in review, kept in place (status off) so no id moves.
const OFF = { note: 'the noun note looks like je note (I write it down), misleading in a help circle' }

// "I can" statements for the part, on the CEFR self-assessment grid's A1 rows.
const CAN_DO = {
  U41: [['speaking', 'Spoken interaction', 'I can say my name and ask someone theirs, politely or to a friend.']],
  U34: [['speaking', 'Spoken interaction', 'I can ask how a word or a name is spelled, and spell my own.']],
  U42: [['listening', 'Listening', 'I can understand a phone number said slowly.'], ['speaking', 'Spoken production', 'I can give my phone number.']],
  U43: [['speaking', 'Spoken interaction', 'I can ask and say how old someone is.']],
  U35: [['speaking', 'Spoken interaction', 'I can ask someone to repeat a number and check that I have it right.']],
  U44: [['listening', 'Listening', 'I can understand numbers up to 100 said slowly.']],
  U45: [['writing', 'Writing', 'I can write where I live: my street, my town, my country.'], ['speaking', 'Spoken production', 'I can say where I live.']],
  U46: [['reading', 'Reading', 'I can understand which country someone comes from and which languages they speak.']],
  U47: [['speaking', 'Spoken interaction', 'I can ask for things at a market and say how much I want.']],
  U36: [['speaking', 'Spoken interaction', 'I can say that I have understood, or check that I have.']],
  U48: [['listening', 'Listening', 'I can understand prices.'], ['speaking', 'Spoken interaction', 'I can ask how much something costs.']],
  U49: [['reading', 'Reading', 'I can understand quantities on a shopping list.']],
}

if (process.argv[1] === import.meta.filename) {
  const [from, to] = process.argv.slice(2)
  const wb = XLSX.readFile(join(ROOT, from))
  const sheet = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' })
  const ids = new Set(PART2_FR.map((u) => u.unit_id))
  const units = sheet('units').filter((u) => !ids.has(u.unit_id))
  const blank = Object.fromEntries(Object.keys(units[0]).map((k) => [k, '']))
  const canDo = sheet('can_do').filter((c) => !ids.has(c.unit_id))
  const grid = Object.fromEntries(canDo.filter((c) => c.cefr_row).map((c) => [c.cefr_row, c.cefr_descriptor]))
  const src = canDo.find((c) => c.source)?.source.replace(/, A1.*$/, '').replace(/, (Listening|Reading|Writing|Spoken interaction|Spoken production)$/, '') ?? ''
  let cd = 201
  for (const u of PART2_FR) {
    const cds = (CAN_DO[u.unit_id] ?? []).map(([skill, row, statement]) => {
      const id = `CD${cd++}`
      canDo.push({ can_do_id: id, unit_id: u.unit_id, skill, cefr: 'A1', statement, source: `${src}, A1, ${row}`, cefr_row: row, cefr_descriptor: grid[row] ?? '' })
      return id
    })
    units.push({ ...blank, unit_id: u.unit_id, lang_id: 'fr', cefr: 'A1', order: u.order, title: u.title, topic: u.title, grammar_point: u.grammar, can_do_ids: cds.join(';'),
      branch_group: `row ${u.row}`, is_topic_pick: u.help ? 'help' : 'no', status: 'draft', part: 2, tasks: u.tasks })
  }
  wb.Sheets.units = XLSX.utils.json_to_sheet(units)
  wb.Sheets.can_do = XLSX.utils.json_to_sheet(canDo)
  const layout = sheet('tree_layout').filter((t) => !ids.has(t.unit_id))
  const pos = {}
  for (const u of PART2_FR) layout.push({ row: u.row, position: (pos[u.row] = (pos[u.row] ?? 0) + 1), unit_id: u.unit_id, unlocks_after: u.after, notes: u.help ? 'A1 Part 2 help circle, gates nothing' : 'A1 Part 2' })
  wb.Sheets.tree_layout = XLSX.utils.json_to_sheet(layout)
  const words = sheet('words').filter((w) => !/^W8\d\d$/.test(w.word_id))
  const taken = new Set(words.map((w) => w.form))
  let n = 801
  for (const u of PART2_FR) for (const form of u.words) {
    if (taken.has(form)) throw new Error(`${u.unit_id}: ${form} is already in the course`)
    taken.add(form)
    words.push({ word_id: `W${n++}`, lang_id: 'fr', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '', first_unit: u.unit_id, needs_image: 'no', image_file: '',
      wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form)}#French`, status: OFF[form] ? `off: ${OFF[form]}` : 'pull from Wiktionary', notes: 'A1 Part 2 word' })
  }
  wb.Sheets.words = XLSX.utils.json_to_sheet(words)
  const parts = sheet('parts').map((p) => (Number(p.part) === 2 ? { ...p, status: 'building' } : p))
  wb.Sheets.parts = XLSX.utils.json_to_sheet(parts)
  const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' })
  r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, `A1 · Part 2, Everyday Life: ${PART2_FR.length} circles as drafts (${PART2_FR.filter((u) => u.help).length} help circles), rows 11 to 15, words from W801, "I can" statements from CD201.`])
  wb.Sheets.README = XLSX.utils.aoa_to_sheet(r)
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: ${PART2_FR.length} circles, ${n - 801} words`)
}
