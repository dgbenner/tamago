// US spelling in everything the app shows (Dan, 2026-11-16: "colour" becomes "color" everywhere; 2026-11-22: every UK
// spelling Fable flagged in the phase 6 reviews, and every other one found in the shipped English of all courses).
// Applied by build-content to the English of every shipped table (usSpellingTable: the fields in ENGLISH below), never
// to the course language (the sentences' french column, word forms, lemmas, reading texts, form cards) and never to the
// accepted answers, which keep both spellings so a learner who types "colour" or "theatre" is still right
// (scripts/lib/equivalents.mjs adds the US and UK pairs, these included). Inside English text, **bold** is the course
// language (notes and overview lines) and is left alone. Sources (Tatoeba lines, Wiktionary glosses, workbooks) stay as
// they are; the shipped copy is what changes.

// UK -> US, whole words. Case follows the original (Mum -> Mom, THEATRE -> THEATER).
export const UK_US = [
  // -our
  ['colour', 'color'], ['colours', 'colors'], ['coloured', 'colored'], ['colourful', 'colorful'], ['colourless', 'colorless'], ['colouring', 'coloring'],
  ['behaviour', 'behavior'], ['behaviours', 'behaviors'], ['favour', 'favor'], ['favours', 'favors'], ['favourite', 'favorite'], ['favourites', 'favorites'],
  ['favourable', 'favorable'], ['flavour', 'flavor'], ['flavours', 'flavors'], ['harbour', 'harbor'], ['harbours', 'harbors'],
  ['neighbour', 'neighbor'], ['neighbours', 'neighbors'], ['neighbourhood', 'neighborhood'], ['neighbourhoods', 'neighborhoods'], ['neighbouring', 'neighboring'],
  ['labour', 'labor'], ['honour', 'honor'], ['humour', 'humor'], ['rumour', 'rumor'], ['rumours', 'rumors'], ['odour', 'odor'], ['vapour', 'vapor'],
  ['endeavour', 'endeavor'], ['parlour', 'parlor'], ['savoury', 'savory'], ['armour', 'armor'], ['tumour', 'tumor'], ['vigour', 'vigor'],
  // -re
  ['theatre', 'theater'], ['theatres', 'theaters'], ['centre', 'center'], ['centres', 'centers'], ['metre', 'meter'], ['metres', 'meters'],
  ['kilometre', 'kilometer'], ['kilometres', 'kilometers'], ['centimetre', 'centimeter'], ['centimetres', 'centimeters'],
  ['millimetre', 'millimeter'], ['millimetres', 'millimeters'], ['litre', 'liter'], ['litres', 'liters'], ['fibre', 'fiber'], ['sombre', 'somber'],
  // -ise, -yse
  ['apologise', 'apologize'], ['apologised', 'apologized'], ['apologises', 'apologizes'], ['apologising', 'apologizing'],
  ['organise', 'organize'], ['organised', 'organized'], ['organises', 'organizes'], ['organising', 'organizing'], ['organiser', 'organizer'],
  ['organisers', 'organizers'], ['organisation', 'organization'], ['organisations', 'organizations'],
  ['recognise', 'recognize'], ['recognised', 'recognized'], ['recognises', 'recognizes'], ['recognising', 'recognizing'],
  ['realise', 'realize'], ['realised', 'realized'], ['realises', 'realizes'], ['realising', 'realizing'],
  ['utilise', 'utilize'], ['criticise', 'criticize'], ['memorise', 'memorize'], ['specialise', 'specialize'], ['summarise', 'summarize'],
  ['emphasise', 'emphasize'], ['formalised', 'formalized'], ['civilisation', 'civilization'], ['analyse', 'analyze'], ['analysed', 'analyzed'],
  // -ll-
  ['travelled', 'traveled'], ['travelling', 'traveling'], ['traveller', 'traveler'], ['travellers', 'travelers'],
  ['cancelled', 'canceled'], ['cancelling', 'canceling'], ['labelled', 'labeled'], ['modelling', 'modeling'], ['jewellery', 'jewelry'],
  ['enrolment', 'enrollment'], ['skilful', 'skillful'], ['instalment', 'installment'], ['fulfil', 'fulfill'],
  // the rest
  ['programme', 'program'], ['programmes', 'programs'], ['practise', 'practice'], ['practised', 'practiced'], ['practises', 'practices'],
  ['practising', 'practicing'], ['licence', 'license'], ['licences', 'licenses'], ['defence', 'defense'], ['offence', 'offense'],
  ['aeroplane', 'airplane'], ['aeroplanes', 'airplanes'], ['grey', 'gray'], ['greyish', 'grayish'], ['mum', 'mom'], ['mums', 'moms'],
  ['mummy', 'mommy'], ['maths', 'math'], ['pyjamas', 'pajamas'], ['tyre', 'tire'], ['tyres', 'tires'], ['cheque', 'check'], ['cheques', 'checks'],
  ['cosy', 'cozy'], ['storey', 'story'], ['storeys', 'stories'], ['moustache', 'mustache'], ['catalogue', 'catalog'], ['plough', 'plow'],
  ['judgement', 'judgment'], ['ageing', 'aging'], ['mould', 'mold'], ['sceptical', 'skeptical'], ['manoeuvre', 'maneuver'], ['learnt', 'learned'],
]
const MAP = new Map(UK_US)
const ANY = new RegExp(`\\b(${UK_US.map(([uk]) => uk).join('|')})\\b`, 'gi')
const US_WORDS = [...new Set(UK_US.map(([, us]) => us))].join('|')
// A gloss that gave both spellings ("neighbour, neighbor", "math or maths", "airplane, aeroplane") would say the US word
// twice: keep one.
const TWICE = new RegExp(`\\b(${US_WORDS})(?:, | or | / )\\1\\b`, 'gi')
const withCase = (from, to) => (from === from.toUpperCase() && from.length > 1 ? to.toUpperCase() : from[0] === from[0].toUpperCase() ? to[0].toUpperCase() + to.slice(1) : to)
const plain = (s) => s.replace(ANY, (w) => withCase(w, MAP.get(w.toLowerCase()))).replace(TWICE, (m, w) => (m.toLowerCase().startsWith(w.toLowerCase()) ? m.slice(0, w.length) : w))
// English text with its **bold** course-language words left as they are.
export const usSpelling = (text) => (typeof text === 'string' ? text.split(/(\*\*[^*]*\*\*)/).map((p, i) => (i % 2 ? p : plain(p))).join('') : text)

// Colour alone, for every other string (2026-11-16 rule, kept: no course language has a word "colour").
const COLOUR = [
  [/\b([Cc])olour(s|ed|ful|less|ing)?\b/g, (_, c, end = '') => `${c}olor${end}`],
  [/\b([Cc]olor(?:s|ed|ful|less|ing)?), \1\b/g, '$1'],
]
const colourOnly = (text) => (typeof text === 'string' ? COLOUR.reduce((s, [re, to]) => s.replace(re, to), text) : text)

// The English fields of each shipped table (a nested field spelled a.b, or a.* for every string under a).
export const ENGLISH = {
  sentences: ['english'],
  words: ['gloss', 'gloss_full', 'hint', 'lemma_gloss'],
  sentence_words: ['hint_override'],
  units: ['title', 'topic', 'grammar_point'],
  grammar_notes: ['rule'],
  parts: ['title', 'summary'],
  a1_tasks: ['task'],
  a1_texts: ['questions.*'],
  a1_prompts: ['prompt', 'points.*'],
  can_do: ['statement'],
  feedback_phrases: ['english'],
  flag_reasons: ['label'],
  rounds: ['name', 'purpose'],
  question_types: ['name'],
  variants: ['description'],
  catch_up: ['title'],
}
const deep = (v, f) => (typeof v === 'string' ? f(v) : Array.isArray(v) ? v.map((x) => deep(x, f)) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x, f)])) : v)

// One table's rows: its English fields in US spelling, colour fixed everywhere else (nested JSON strings included).
export function usSpellingTable(name, rows) {
  const fields = ENGLISH[name] ?? []
  return rows.map((r) => Object.fromEntries(Object.entries(r).map(([k, v]) => {
    // An English feedback line is all English (text); a course-language one keeps its text.
    const english = fields.includes(k) || (name === 'feedback_phrases' && k === 'text' && r.language === 'en')
    if (english || fields.includes(`${k}.*`)) return [k, deep(v, usSpelling)]
    return [k, deep(v, colourOnly)]
  })))
}
