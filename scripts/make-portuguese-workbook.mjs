// The Brazilian Portuguese course's first workbook (Dan, 2026-11-14, branch lang/portuguese: Portuguese as spoken in
// Brazil, with você and Brazilian spelling and words; the same framework as French, Spanish and German). Built from
// the French workbook's machinery tabs like the Spanish and German ones. Part 1 only: 15 situation circles, the three
// help circles (scripts/lib/help-circles.mjs) and, added after by scripts/add-vocab-part1.mjs, three vocabulary circles
// and two Brush-Up slots. No topic packs yet, so no topic nodes.
// Brazilian choices: você with the verb form of ele and ela (no tu); estar for how you are and estar com for hunger
// and thirst; gostar de for liking; tem for there is; ônibus, trem, banheiro, cachorro, suco.
// Usage: node scripts/make-portuguese-workbook.mjs <french.xlsx> <portuguese.xlsx>
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
  { id: 'U01', title: 'Saying Hello', grammar: 'ser for who you are: eu sou, você é; um and uma; não', contrast: 'um|uma; sou|é', row: 1,
    words: ['oi', 'olá', 'tchau', 'sim', 'não', 'eu', 'você', 'sou', 'é', 'um', 'uma', 'homem', 'mulher', 'menino', 'menina', 'criança', 'e'] },
  { id: 'U02', title: 'People and Things', grammar: 'o and a; ele and ela; esse and essa; isso', contrast: 'o|a; ele|ela; esse|essa', row: 2,
    words: ['o', 'a', 'ele', 'ela', 'aqui', 'esse', 'essa', 'isso', 'livro', 'casa', 'médico', 'professor', 'professora', 'grande', 'pequeno', 'pequena', 'forte'] },
  { id: 'U03', title: 'Polite Phrases', grammar: 'Set phrases; obrigado from a man, obrigada from a woman; estar for how you are: Como você está? Estou bem; Como vai? Tudo bem?', contrast: 'obrigado|obrigada; estou|está; bem|mal', row: 2,
    words: ['obrigado', 'obrigada', 'por favor', 'de nada', 'bom dia', 'boa tarde', 'boa noite', 'até logo', 'com licença', 'desculpe', 'tudo', 'como', 'vai', 'estou', 'está', 'bem', 'mal', 'ótimo'] },
  { id: 'U04', title: 'Food and Drink', grammar: 'Verbs in the present: como, come; bebo, bebe; gostar de for liking: gosto de café', contrast: 'como|come; bebo|bebe; gosto|gosta', row: 3,
    words: ['come', 'bebo', 'bebe', 'gosto', 'gosta', 'de', 'pão', 'água', 'leite', 'queijo', 'maçã', 'café', 'chá', 'suco', 'vinho'] },
  { id: 'U05', title: 'Pets and Animals', grammar: 'ter in the present: eu tenho, você tem, ele tem', contrast: 'tenho|tem; tem|é', row: 3,
    words: ['tenho', 'tem', 'cachorro', 'gato', 'cavalo', 'pássaro', 'peixe', 'rato', 'animal'] },
  { id: 'U06', title: 'More Than One', grammar: 'Plurals: os and as; nouns add -s (and -m becomes -ns); nós somos, vocês são, eles são; temos and têm', contrast: 'o|os; a|as; somos|são; temos|têm', row: 5,
    words: ['os', 'as', 'nós', 'vocês', 'eles', 'elas', 'somos', 'são', 'temos', 'têm', 'livros', 'gatos', 'cachorros', 'crianças', 'maçãs', 'homens', 'mulheres', 'amigos', 'muitos', 'grandes', 'bons'] },
  { id: 'U07', title: 'Describing Things', grammar: 'Adjectives agree with the noun (novo, nova; bonito, bonita) and usually follow it; muito and também', contrast: 'bom|boa; velho|velha; novo|nova; bonito|bonita', row: 5,
    words: ['bom', 'boa', 'velho', 'velha', 'novo', 'nova', 'jovem', 'bonito', 'bonita', 'muito', 'também', 'carro'] },
  { id: 'U08', title: 'Where Things Are', grammar: 'estar for where something is: está, estão, estamos; em + o = no, em + a = na; tem for there is', contrast: 'está|estão; no|na; aqui|lá', row: 6,
    words: ['estão', 'estamos', 'lá', 'em', 'no', 'na', 'mesa', 'cama', 'cozinha', 'banheiro', 'jardim'] },
  { id: 'U09', title: 'How You Feel', grammar: 'estar with an adjective that agrees: estou cansado, estou cansada; estar com for hunger, thirst and cold: estou com fome', contrast: 'cansado|cansada; estou|está; fome|sede', row: 6,
    words: ['cansado', 'cansada', 'feliz', 'triste', 'doente', 'com', 'fome', 'sede', 'sono', 'medo', 'frio', 'calor'] },
  { id: 'U10', title: 'Mine and Yours', grammar: 'Possessives agree with the thing owned: meu, minha, meus, minhas; seu, sua; dele and dela for his and her', contrast: 'meu|minha; seu|sua; dele|dela; meu|meus', row: 7,
    words: ['meu', 'minha', 'meus', 'minhas', 'seu', 'sua', 'dele', 'dela', 'amigo', 'amiga', 'família', 'pai', 'mãe'] },
  { id: 'U11', title: 'Asking Questions', grammar: 'Question words come first: quem, o que, onde, quando, por que, qual; porque in the answer', contrast: 'quem|o que; onde|quando; por que|porque', row: 7,
    words: ['quem', 'o que', 'que', 'onde', 'quando', 'por que', 'porque', 'qual'] },
  { id: 'U12', title: 'Counting to Ten', grammar: 'Numbers one to ten; dois and duas agree; quantos and quantas with a plural noun', contrast: 'quantos|quantas; dois|duas', row: 8,
    words: ['dois', 'duas', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'quantos', 'quantas', 'anos'] },
  { id: 'U13', title: 'Naming Colours', grammar: 'Colours come after the noun; most agree (vermelho, vermelha), azul and verde do not change in the singular', contrast: 'vermelho|vermelha; preto|preta; branco|branca', row: 8,
    words: ['vermelho', 'vermelha', 'azul', 'verde', 'preto', 'preta', 'branco', 'branca', 'amarelo', 'amarela', 'cor'] },
  { id: 'U14', title: 'Days and Times', grammar: 'Time words: hoje, amanhã, agora; days of the week without a capital; Que horas são?', contrast: 'hoje|amanhã', row: 9,
    words: ['hoje', 'amanhã', 'agora', 'dia', 'semana', 'hora', 'horas', 'segunda-feira', 'sexta-feira', 'sábado', 'domingo'] },
  { id: 'U15', title: 'Going Places', grammar: 'ir in the present: eu vou, você vai, nós vamos; para for where you are going; ao and à', contrast: 'vou|vai; vou|vamos; ao|à', row: 9,
    words: ['vou', 'vamos', 'para', 'ao', 'à', 'parque', 'escola', 'loja', 'cidade', 'restaurante'] },
]

// Widening after the pull (autonomous-build.md); new words take the next ids. Moves change a word's first unit.
export const EXTRA = {}
export const MOVE = {}

if (process.argv[1] === import.meta.filename) {
  put('README', [
    { item: 'Version', notes: 'Portuguese workbook v1, 2026-11-14. The 15 A1 units as drafts with their words; no sentences yet.' },
    { item: 'What this is', notes: 'Tamago Portuguese (English to Portuguese as spoken in Brazil) content and setup data, one tab per database table, the same shape as the French workbook. Row 1 of each tab is the column names.' },
    { item: 'Column names', notes: 'Kept from French so one engine serves every course: the sentences tab\'s french column holds the Portuguese text, and accepted_answers directions fr_to_en and en_to_fr mean Portuguese to English and English to Portuguese.' },
    { item: 'Portuguese', notes: 'Portuguese as spoken in Brazil: você, Brazilian spelling and words. No official A1 word list is loaded yet.' },
    { item: 'Sources', notes: 'Sentences: Tatoeba Portuguese-English (source_id) or tamago_original (native-speaker check needed). Words: Wiktionary Portuguese. Recordings: Lingua Libre (LL-Q5146 (por)).' },
    { item: 'Editing', notes: "Add rows freely. Keep IDs unique and never reuse a retired ID. Set status to 'off' instead of deleting." },
    { item: 'Changes to v1', notes: 'New workbook, made by scripts/make-portuguese-workbook.mjs from the French machinery tabs. Part 1 only; no topic packs.' },
  ], ['item', 'notes'])
  put('languages', [...sheet('languages').map((l) => ({ ...l, status: ['fr', 'es', 'de'].includes(l.lang_id) ? 'active' : l.status })), { lang_id: 'pt', name: 'Portuguese', ui_language: 'en', status: 'active', order: 5 }])
  put('units', UNITS.map((u, i) => ({ unit_id: u.id, lang_id: 'pt', cefr: 'A1', order: i + 1, title: u.title, topic: u.title, grammar_point: u.grammar, contrast_sets: u.contrast,
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
  const words = UNITS.flatMap((u) => u.words.map((form) => ({ word_id: `W${String(w++).padStart(3, '0')}`, lang_id: 'pt', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '',
    first_unit: u.id, needs_image: 'no', image_file: '', wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Portuguese`, status: 'pull from Wiktionary', notes: '' })))
  for (const [unit, forms] of Object.entries(EXTRA)) for (const form of forms) words.push({ ...words[0], word_id: `W${String(w++).padStart(3, '0')}`, form, first_unit: unit,
    wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Portuguese`, notes: 'added to widen the unit' })
  for (const x of words) if (MOVE[x.form]) x.first_unit = MOVE[x.form]
  put('topics_pool', sheet('topics_pool'))
  wb.SheetNames.splice(wb.SheetNames.indexOf('words'), 1); delete wb.Sheets.words
  put('words', words)
  put('content_pull', sheet('content_pull').map((r) => ({ ...r, rule: String(r.rule).replace(/French/g, 'Portuguese').replace(/Elided forms \(j', l'\) count as their word\./, 'Multi-word forms (por favor, bom dia, o que) count as their word.') })))
  for (const n of ['question_types', 'variants', 'rounds', 'round_type_mix', 'lesson_rules', 'phase1_fallbacks', 'cant_swaps', 'flag_reasons', 'settings_defaults', 'runtime_schema']) put(n, sheet(n))
  // Feedback: the English lines as in French; Portuguese lines as drafts, live only once Tatoeba backs them.
  const es = [['FB40', 'correct', 'Muito bem!', 'Very good!'], ['FB41', 'correct', 'Ótimo!', 'Great!'], ['FB42', 'correct', 'Perfeito!', 'Perfect!'], ['FB43', 'correct', 'Exato!', 'Exactly!'],
    ['FB44', 'correct', 'Certo!', 'Right!'], ['FB50', 'incorrect', 'Quase!', 'Almost!'], ['FB51', 'incorrect', 'Não exatamente.', 'Not exactly.']]
  put('feedback_phrases', [...sheet('feedback_phrases').filter((f) => f.language === 'en'),
    ...es.map(([phrase_id, context, text, english]) => ({ phrase_id, context, language: 'pt', text, english, min_level: 'A1', status: 'draft', notes: 'draft: checked against Tatoeba on import' }))])
  const unitsSheet = XLSX.utils.sheet_to_json(wb.Sheets.units, { defval: '' }).map((r) => ({ ...r, can_do_ids: UNITS.find((u) => u.id === r.unit_id)?.canDo.join(';') ?? '' }))
  wb.Sheets.units = XLSX.utils.json_to_sheet(unitsSheet)
  // The Asking for Help thread (2026-11-10): three help circles, from scripts/lib/help-circles.mjs.
  addHelpCircles(wb, XLSX, 'pt')
  // A1 Complete (2026-11-10): parts, tasks, and part and tasks columns on units.
  addA1Plan(wb, XLSX, 'pt')
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: ${UNITS.length} units, ${words.length} words`)
}
