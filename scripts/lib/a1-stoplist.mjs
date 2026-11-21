// The shared A1 stoplist (Dan, 2026-11-20): words an A1 core list must never count, applied to every course
// automatically by build-content (the shipped a1_list, so the app's "% of A1 words" leaves them out) and by
// a1-coverage (the target). Frequency lists built from subtitles or the web carry oaths, slurs, violence and subtitle
// leftovers (English words, names, OCR slips); Kelly's web corpus carries legal and official register. Nothing here
// stops a word being taught; it only stops it counting toward A1. What each course drops is printed and written to
// content*/a1-dropped.json, never asked about. Add a word under its language (or ALL for forms that are junk in every
// list), with its reason. Started from Italian's register cuts (content-it/a1-exclude.json, Fable's review,
// 2026-11-16) and Dutch's 31 (Dan approved, 2026-11-20).

const REASON = {
  subtitle: 'subtitle leftover (English word, name, abbreviation or OCR slip)',
  oath: 'oath or swearing',
  slur: 'slur or insult',
  violence: 'violence',
  register: 'legal, official or administrative register',
}

// Junk in any course's list: English words and names that subtitle-based frequency lists pick up.
const ALL = { subtitle: ['the', 'mr', 'mrs', 'sir', 'miss', 'hey', 'john', 'jack'] }

const BY_COURSE = {
  it: {
    register: [
      'comma', 'decreto', 'norma', 'provvedimento', 'disposizione', 'atto', 'ente', 'commissione', 'amministrazione', 'amministrativo',
      'istituzione', 'legislativo', 'regolamento', 'attuazione', 'obbligo', 'comitato', 'costituzione',
      'dichiarare', 'destinare', 'disporre', 'effettuare', 'costituire', 'adottare', 'approvare', 'individuare', 'determinare',
      'intervenire', 'stabilire', 'provvedere', 'sottoporre', 'attribuire',
      'ulteriore', 'eventuale', 'ambito', 'riferimento', 'relativo', 'previsto', 'soggetto', 'nonché', 'ovvero', 'mediante',
      'pertanto', 'medesimo', 'apposito',
    ],
  },
  nl: {
    subtitle: ['oh', 'hé', 'hè', 'lk', 'ie', 'dr', 'oke', 'eén', 'schat', 'lieverd', 'vent'],
    oath: ['verdomme', 'god'],
    slur: ['klootzak'],
    violence: ['vermoord', 'vermoorden', 'doden', 'moord', 'bloed', 'schiet', 'sterven', 'oorlog', 'wapen'],
  },
  // Danish and Norwegian core lists are subtitle frequency lists too (2026-11-20, standing step): their oaths, kill words
  // and leftovers. Everyday words that subtitles over-represent but A1 needs (død, politiet, hallo) stay.
  da: {
    subtitle: ['åh', 'ej', 'h', 'l', 's', 'agent', 'kaptajn', 'dollars', 'sam', 'new', 'okay', 'ok'],
    oath: ['fanden', 'helvede', 'lort', 'pis', 'sgu', 'skide', 'kæft', 'gud'],
    violence: ['dræbe', 'dræbte', 'dræbt', 'dræber', 'ihjel', 'våben', 'blod', 'dø'],
  },
  no: {
    subtitle: ['lkke', 'a', 's', 'pa', 'kaptein', 'dollar', 'new', 'ok'],
    oath: ['faen', 'helvete', 'jævla', 'herregud', 'pokker', 'dritt', 'kjeft', 'jøss', 'gud'],
    violence: ['drepe', 'drepte', 'drept', 'dreper', 'våpen', 'blod', 'dø'],
  },
}

const fold = (w) => String(w).toLowerCase().normalize('NFC').trim()

// The stoplist for one course: folded word → reason.
export function stoplistFor(course) {
  const out = new Map()
  for (const src of [ALL, BY_COURSE[course] ?? {}]) for (const [kind, words] of Object.entries(src)) for (const w of words) out.set(fold(w), REASON[kind])
  return out
}

// Split a word list into what counts and what the stoplist drops (with reasons), keeping the list's order.
export function applyStoplist(course, words) {
  const stop = stoplistFor(course)
  const kept = [], dropped = []
  for (const w of words) (stop.has(fold(w)) ? dropped.push({ word: w, reason: stop.get(fold(w)) }) : kept.push(w))
  return { kept, dropped }
}
