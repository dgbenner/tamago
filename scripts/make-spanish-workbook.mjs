// The Spanish course's first workbook (Dan, 2026-11-10: English to Latin American Spanish, ustedes and no vosotros,
// the same structure as French). Built from the French workbook: the lesson machinery tabs are copied as they are
// (question types, variants, rounds, mixes, rules, fallbacks, swaps, flags, settings, runtime schema, topics pool,
// the "I can" statements, which are written for the CEFR grid, not for French); the content tabs start empty and
// the 15 units come in as drafts with their words, for the Tatoeba pull, one unit at a time.
// Order and grammar follow the PCIC A1 inventory as taught in the Universidad Complutense A1.1 programme (the
// Cervantes site was down): ser for identity, estar with bien and mal, el and la, plurals, agreement, possessives,
// interrogatives, numbers with hay, estar for place. Latin American forms: ustedes, never vosotros.
// Usage: node scripts/make-spanish-workbook.mjs <french.xlsx> <spanish.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const [from, to] = process.argv.slice(2)
const fr = XLSX.readFile(join(ROOT, from))
const sheet = (n) => XLSX.utils.sheet_to_json(fr.Sheets[n], { defval: '' })
const header = (n) => XLSX.utils.sheet_to_json(fr.Sheets[n], { header: 1, defval: '' })[0]
const wb = XLSX.utils.book_new()
const put = (n, rows, cols = header(n)) => XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows, { header: cols }), n)

export const UNITS = [
  { id: 'U01', title: 'Saying Hello', grammar: 'ser for who you are: yo soy, tú eres; un and una', contrast: 'un|una; soy|eres', row: 1,
    words: ['hola', 'adiós', 'sí', 'no', 'yo', 'tú', 'soy', 'eres', 'un', 'una', 'hombre', 'mujer', 'niño', 'niña', 'y'] },
  { id: 'U02', title: 'People and Things', grammar: 'el and la; él and ella; es', contrast: 'el|la; él|ella; es|soy', row: 2,
    words: ['el', 'la', 'él', 'ella', 'es', 'aquí', 'libro', 'carta', 'periódico', 'casa', 'grande', 'pequeño', 'pequeña'] },
  { id: 'U03', title: 'Polite Phrases', grammar: 'Set phrases; tú and usted; estar for how you are: estoy, estás, está with bien and mal', contrast: 'tú|usted; estás|está; bien|mal', row: 2,
    words: ['gracias', 'por favor', 'buenos días', 'buenas tardes', 'buenas noches', 'perdón', 'de nada', 'usted', 'cómo', 'estoy', 'estás', 'está', 'bien', 'mal'] },
  { id: 'U04', title: 'Food and Drink', grammar: '-er verbs in the present: como, comes, come; bebo, bebes, bebe; me gusta, te gusta', contrast: 'como|comes; bebo|bebes; me|te', row: 3,
    words: ['como', 'comes', 'come', 'bebo', 'bebes', 'bebe', 'me', 'te', 'gusta', 'pan', 'agua', 'leche', 'queso', 'manzana', 'naranja', 'café'] },
  { id: 'U05', title: 'Pets and Animals', grammar: 'tener in the present: tengo, tienes, tiene', contrast: 'tengo|tienes; tiene|es', row: 3,
    words: ['tengo', 'tienes', 'tiene', 'perro', 'gato', 'caballo', 'pájaro', 'pato', 'tortuga', 'ratón', 'animal'] },
  { id: 'U06', title: 'More Than One', grammar: 'Plurals: los, las, unos, unas; nouns add -s or -es; somos and son; ustedes, not vosotros', contrast: 'el|los; la|las; un|unos; somos|son', row: 5,
    words: ['los', 'las', 'unos', 'unas', 'nosotros', 'ustedes', 'ellos', 'ellas', 'somos', 'son', 'libros', 'perros', 'gatos', 'niños', 'manzanas', 'hombres', 'mujeres'] },
  { id: 'U07', title: 'Describing Things', grammar: 'Adjectives agree with the noun (bueno, buena) and usually come after it; muy', contrast: 'bueno|buena; viejo|vieja; nuevo|nueva', row: 5,
    words: ['bueno', 'buena', 'viejo', 'vieja', 'nuevo', 'nueva', 'joven', 'bonito', 'bonita', 'muy', 'también'] },
  { id: 'U08', title: 'Where Things Are', grammar: 'estar for where something is: está, están, estamos; hay for what there is', contrast: 'está|hay; está|están; aquí|allí', row: 6,
    words: ['están', 'estamos', 'hay', 'allí', 'en', 'mesa', 'cama', 'cocina', 'baño'] },
  { id: 'U09', title: 'Ser or Estar', grammar: 'ser for what someone is (a teacher, a student), estar for how they are right now (tired, happy, ill)', contrast: 'es|está; soy|estoy; eres|estás', row: 6,
    words: ['cansado', 'cansada', 'contento', 'contenta', 'enfermo', 'enferma', 'profesor', 'profesora', 'estudiante', 'médico'] },
  { id: 'U10', title: 'Mine and Yours', grammar: 'Possessives: mi, mis; tu, tus; su, sus; de for whose', contrast: 'mi|mis; tu|tus; su|sus', row: 7,
    words: ['mi', 'mis', 'tu', 'tus', 'su', 'sus', 'de', 'amigo', 'amiga', 'familia'] },
  { id: 'U11', title: 'Asking Questions', grammar: 'Question words carry an accent: qué, quién, dónde, cuál, por qué; porque in the answer', contrast: 'qué|quién; por qué|porque; dónde|cuál', row: 7,
    words: ['qué', 'quién', 'dónde', 'cuál', 'por qué', 'porque'] },
  { id: 'U12', title: 'Counting to Ten', grammar: 'Numbers two to ten; cuántos and cuántas with a noun', contrast: 'cuántos|cuántas; dos|diez', row: 8,
    words: ['dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'cuántos', 'cuántas'] },
  { id: 'U13', title: 'Naming Colours', grammar: 'Colours come after the noun; most agree (rojo, roja), azul and verde do not change', contrast: 'rojo|roja; negro|negra; blanco|blanca', row: 8,
    words: ['rojo', 'roja', 'azul', 'verde', 'negro', 'negra', 'blanco', 'blanca', 'amarillo', 'amarilla', 'color'] },
  { id: 'U14', title: 'Days and Times', grammar: 'Time words: hoy, mañana, ahora; el lunes; days of the week without a capital', contrast: 'hoy|mañana', row: 9,
    words: ['hoy', 'mañana', 'ahora', 'día', 'semana', 'hora', 'lunes', 'sábado', 'domingo'] },
  { id: 'U15', title: 'Going Places', grammar: 'ir in the present: voy, vas, va; a and al (a + el)', contrast: 'voy|vas; vas|va; a|al', row: 9,
    words: ['voy', 'vas', 'va', 'a', 'al', 'parque', 'escuela', 'tienda', 'ciudad', 'restaurante'] },
]

// Widening after the pull (autonomous-build.md: widen with common A1 words before drafting). New words get the next
// ids, so the ids above never move; a word that comes earlier than first planned moves its first_unit.
export const EXTRA = {
  U01: ['llamo', 'llamas', 'chico', 'chica', 'señor', 'señora'],
  U02: ['esto', 'eso', 'este', 'esta', 'puerta'],
  U06: ['grandes', 'pequeños', 'pequeñas', 'tienen', 'comen', 'beben', 'chicos', 'chicas', 'casas'],
}
// aquí goes with estar (Where Things Are); mesa joins People and Things.
export const MOVE = { me: 'U01', te: 'U01', cómo: 'U01', aquí: 'U08', mesa: 'U02' }

if (process.argv[1] === import.meta.filename) {
  put('README', [
    { item: 'Version', notes: 'Spanish workbook v1, 2026-11-10. The 15 A1 units as drafts with their words; no sentences yet.' },
    { item: 'What this is', notes: 'Tamago Spanish (English to Latin American Spanish) content and setup data, one tab per database table, the same shape as the French workbook. Row 1 of each tab is the column names.' },
    { item: 'Column names', notes: 'Kept from French so one engine serves both: the sentences tab\'s french column holds the Spanish text, and accepted_answers directions fr_to_en and en_to_fr mean Spanish to English and English to Spanish.' },
    { item: 'Spanish', notes: 'Latin American Spanish: ustedes for you plural, never vosotros (no vosotros forms in any word list, so no such sentence can be pulled). Order after the PCIC A1 inventory.' },
    { item: 'Sources', notes: 'Sentences: Tatoeba Spanish-English (source_id) or tamago_original (native-speaker check needed). Words: Wiktionary Spanish. Recordings: Lingua Libre (LL-Q1321 (spa)).' },
    { item: 'Editing', notes: "Add rows freely. Keep IDs unique and never reuse a retired ID. Set status to 'off' instead of deleting." },
    { item: 'Changes to v1', notes: 'New workbook, made by scripts/make-spanish-workbook.mjs from the French v24 machinery tabs.' },
  ], ['item', 'notes'])
  put('languages', sheet('languages').map((l) => ({ ...l, status: ['fr', 'es'].includes(l.lang_id) ? 'active' : l.status })))
  put('units', UNITS.map((u, i) => ({ unit_id: u.id, lang_id: 'es', cefr: 'A1', order: i + 1, title: u.title, topic: u.title, grammar_point: u.grammar, contrast_sets: u.contrast,
    can_do_ids: '', // filled below with the unit's "I can" statements branch_group: `row ${u.row}`, is_topic_pick: 'no', status: 'draft',
    borrowed_sentence_ids: '', topic_id: '', icon_group: '', icon_file: '', topic_node: '' })), [...header('units'), 'topic_node'].filter((c, i, a) => a.indexOf(c) === i))
  // The tree: the same shape as French (one unit, then pairs), each row opening when the row above has finished round
  // 1. Topic nodes and "I can" statements come with the units that need them.
  const rows = [...new Set(UNITS.map((u) => u.row))]
  put('tree_layout', UNITS.map((u) => ({ row: u.row, position: UNITS.filter((x) => x.row === u.row).indexOf(u) + 1, unit_id: u.id,
    unlocks_after: rows.indexOf(u.row) ? `row ${rows[rows.indexOf(u.row) - 1]}` : '', notes: '' })))
  // "I can" statements: written for the CEFR self-assessment grid, so a Spanish unit on the same topic as a French
  // one takes its statements; the two estar units get their own, checked against the same grid rows.
  const frCanDo = sheet('can_do')
  const SAME = { U01: 'U01', U02: 'U02', U03: 'U03', U04: 'U04', U05: 'U05', U06: 'U06', U07: 'U07', U10: 'U08', U11: 'U09', U12: 'U10', U13: 'U11', U14: 'U12', U15: 'U13' }
  const grid = Object.fromEntries(frCanDo.map((c) => [c.cefr_row, c.cefr_descriptor]))
  const src = frCanDo[0].source.replace(/, (Listening|Reading|Writing|Spoken interaction|Spoken production)$/, '')
  const OWN = {
    U08: [['listening', 'Listening', 'I can understand where something is when someone tells me slowly.'], ['reading', 'Reading', 'I can understand short sentences that say where things are in a home.'],
      ['writing', 'Writing', 'I can write where something is: here, there, in the kitchen.'], ['speaking', 'Spoken interaction', 'I can ask where something is and say whether there is one.']],
    U09: [['listening', 'Listening', 'I can understand when someone says how they are or what they do.'], ['reading', 'Reading', 'I can understand short sentences about how someone feels and what their job is.'],
      ['writing', 'Writing', 'I can write how I am today and what I do.'], ['speaking', 'Spoken production', 'I can say how I feel today and what I am.']],
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
  const words = UNITS.flatMap((u) => u.words.map((form) => ({ word_id: `W${String(w++).padStart(3, '0')}`, lang_id: 'es', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '',
    first_unit: u.id, needs_image: 'no', image_file: '', wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Spanish`, status: 'pull from Wiktionary', notes: '' })))
  for (const [unit, forms] of Object.entries(EXTRA)) for (const form of forms) words.push({ ...words[0], word_id: `W${String(w++).padStart(3, '0')}`, form, first_unit: unit,
    wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#Spanish`, notes: 'added to widen the unit' })
  for (const x of words) if (MOVE[x.form]) x.first_unit = MOVE[x.form]
  wb.SheetNames.splice(wb.SheetNames.indexOf('words'), 1); delete wb.Sheets.words
  put('words', words)
  put('content_pull', sheet('content_pull').map((r) => ({ ...r, rule: String(r.rule).replace(/French/g, 'Spanish').replace(/Elided forms \(j', l'\) count as their word\./, 'Multi-word forms (por favor, buenos días) count as their word.') })))
  for (const n of ['question_types', 'variants', 'rounds', 'round_type_mix', 'lesson_rules', 'phase1_fallbacks', 'cant_swaps', 'flag_reasons', 'topics_pool', 'settings_defaults', 'runtime_schema']) put(n, sheet(n))
  // Feedback: the English lines as in French; Spanish lines as drafts, live only once Tatoeba backs them.
  const es = [['FB40', 'correct', '¡Muy bien!', 'Very good!'], ['FB41', 'correct', '¡Bravo!', 'Well done!'], ['FB42', 'correct', '¡Perfecto!', 'Perfect!'], ['FB43', 'correct', '¡Exacto!', 'Exactly!'],
    ['FB44', 'correct', '¡Eso es!', "That's it!"], ['FB50', 'incorrect', '¡Casi!', 'Almost!'], ['FB51', 'incorrect', 'No exactamente.', 'Not quite.']]
  put('feedback_phrases', [...sheet('feedback_phrases').filter((f) => f.language === 'en'),
    ...es.map(([phrase_id, context, text, english]) => ({ phrase_id, context, language: 'es', text, english, min_level: 'A1', status: 'draft', notes: 'draft: checked against Tatoeba on import' }))])
  const unitsSheet = XLSX.utils.sheet_to_json(wb.Sheets.units, { defval: '' }).map((r) => ({ ...r, can_do_ids: UNITS.find((u) => u.id === r.unit_id).canDo.join(';') }))
  wb.Sheets.units = XLSX.utils.json_to_sheet(unitsSheet)
  XLSX.writeFile(wb, join(ROOT, to))
  console.log(`Wrote ${to}: ${UNITS.length} units, ${words.length} words`)
}
