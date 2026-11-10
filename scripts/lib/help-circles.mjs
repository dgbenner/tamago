// The Asking for Help thread (Dan, 2026-11-10): three help circles in each course, after the first circle, about a
// third of the way in and about two thirds of the way in. Each adds communication strategies, from the basics (I
// don't understand, slower please, please repeat) to harder ones (how do you say…, what does … mean, I'm looking for
// the word…, it's a thing for…). Tatoeba first, the same content rules, five rounds each.
// They sit on rows of their own (1.5, 3.5, 6.5), open with the row before, and gate nothing: a learner already past
// them keeps every unit open, and main units never draw on their words. A circle may borrow a few later words its
// phrases need (borrow_words); they show their hint but aren't taught as new there.
// Used by scripts/add-help-circles.mjs (French workbook) and the Spanish and German workbook generators.

export const HELP_ROWS = [
  { unit_id: 'U31', order: 1.5, row: 1.5, after: 'row 1', title: 'Asking for Help' },
  { unit_id: 'U32', order: 5.5, row: 3.5, after: 'row 3', title: 'Asking About Words' },
  { unit_id: 'U33', order: 9.5, row: 6.5, after: 'row 6', title: 'Finding the Word' },
]

export const HELP = {
  fr: {
    U31: { grammar: 'Je ne comprends pas; plus lentement; répétez, s\'il vous plaît', words: ['ne', 'pas', 'comprends', 'comprenez', 'répète', 'répétez', 'lentement', 'plus', 'parle', 'parlez', 'encore'], borrow: ["s'il vous plaît", "s'il te plaît", 'vous'] },
    U32: { grammar: 'Qu\'est-ce que ça veut dire? Le mot en français', words: ['dit', 'on', 'veut', 'dire', 'mot', 'ça', 'en', 'français', 'anglais'], borrow: ["qu'est-ce que"] },
    U33: { grammar: 'Je cherche le mot…; c\'est une chose pour…; je ne sais pas', words: ['cherche', 'sais', 'chose', 'pour', "s'", 'appelle'], borrow: [] },
  },
  es: {
    U31: { grammar: 'No entiendo; más despacio; repite, por favor', words: ['entiendo', 'entiendes', 'despacio', 'más', 'repite', 'repita', 'habla', 'hable', 'otra vez'], borrow: ['por favor'] },
    U32: { grammar: '¿Cómo se dice…? ¿Qué significa…?', words: ['se', 'dice', 'significa', 'quiere', 'decir', 'palabra', 'español', 'inglés'], borrow: ['qué', 'en'] },
    U33: { grammar: 'Busco la palabra…; es una cosa para…; no sé', words: ['busco', 'sé', 'cosa', 'para', 'llama', 'sirve'], borrow: ['qué'] },
  },
  de: {
    U31: { grammar: 'Ich verstehe nicht; langsamer, bitte; noch einmal', words: ['verstehe', 'verstehst', 'langsamer', 'noch einmal', 'sprich', 'wiederholen'], borrow: ['bitte', 'sprechen', 'sie'] },
    U32: { grammar: 'Wie sagt man…? Was bedeutet…? Was heißt…?', words: ['sagt', 'man', 'heißt', 'bedeutet', 'Wort', 'auf', 'Englisch'], borrow: ['was', 'Deutsch'] },
    U33: { grammar: 'Ich suche das Wort…; das ist ein Ding für…; weißt du…?', words: ['suche', 'Ding', 'Sache', 'für', 'nennt', 'weißt'], borrow: [] },
  },
}

// "I can" statements, written for the CEFR self-assessment grid's A1 spoken interaction row, which is this thread:
// "provided the other person is prepared to repeat or rephrase things at a slower rate of speech and help me
// formulate what I'm trying to say".
export const HELP_CAN_DO = {
  U31: 'I can say that I don\'t understand and ask someone to speak more slowly or say it again.',
  U32: 'I can ask how to say something and what a word means.',
  U33: 'I can ask for a word I don\'t know by saying what the thing is for.',
}

// Adds the circles to a workbook in place: units, tree rows, words (W701 on) and "I can" statements.
export function addHelpCircles(wb, XLSX, lang) {
  const sheet = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' })
  const header = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { header: 1, defval: '' })[0]
  const save = (n, rows) => { const cols = [...header(n)]; for (const r of rows) for (const k of Object.keys(r)) if (!cols.includes(k)) cols.push(k); wb.Sheets[n] = XLSX.utils.json_to_sheet(rows, { header: cols }) }
  const spec = HELP[lang]
  const ids = new Set(HELP_ROWS.map((h) => h.unit_id))

  const canDo = sheet('can_do').filter((c) => !ids.has(c.unit_id))
  const grid = canDo.find((c) => c.cefr_row === 'Spoken interaction') ?? canDo[0]
  const cdIds = {}
  HELP_ROWS.forEach((h, i) => {
    cdIds[h.unit_id] = `CD${91 + i}`
    canDo.push({ ...grid, can_do_id: cdIds[h.unit_id], unit_id: h.unit_id, skill: 'speaking', cefr: 'A1', statement: HELP_CAN_DO[h.unit_id], cefr_row: 'Spoken interaction', cefr_descriptor: grid?.cefr_row === 'Spoken interaction' ? grid.cefr_descriptor : '' })
  })
  save('can_do', canDo)

  const units = sheet('units').filter((u) => !ids.has(u.unit_id))
  const blank = Object.fromEntries(Object.keys(units[0]).map((k) => [k, '']))
  for (const h of HELP_ROWS) units.push({ ...blank, unit_id: h.unit_id, lang_id: lang, cefr: 'A1', order: h.order, title: h.title, topic: h.title, grammar_point: spec[h.unit_id].grammar,
    can_do_ids: cdIds[h.unit_id], branch_group: `row ${h.row}`, is_topic_pick: 'help', status: 'draft', borrow_words: spec[h.unit_id].borrow.join(';') })
  save('units', units)

  const layout = sheet('tree_layout').filter((t) => !ids.has(t.unit_id))
  for (const h of HELP_ROWS) layout.push({ row: h.row, position: 1, unit_id: h.unit_id, unlocks_after: h.after, notes: 'Asking for Help thread: a help circle, gates nothing' })
  save('tree_layout', layout)

  const words = sheet('words').filter((w) => !/^W7\d\d$/.test(w.word_id))
  const taken = new Set(words.map((w) => w.form))
  const section = { fr: 'French', es: 'Spanish', de: 'German' }[lang]
  let n = 701
  for (const h of HELP_ROWS) for (const form of spec[h.unit_id].words) {
    if (taken.has(form)) throw new Error(`${h.unit_id}: ${form} is already in the course`)
    taken.add(form)
    words.push({ word_id: `W${n++}`, lang_id: lang, form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '', first_unit: h.unit_id, needs_image: 'no', image_file: '',
      wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form.replace(/ /g, '_'))}#${section}`, status: 'pull from Wiktionary', notes: 'help circle word' })
  }
  save('words', words)
  return HELP_ROWS.length
}
