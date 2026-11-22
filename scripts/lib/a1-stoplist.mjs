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
  artefact: 'lemmatiser artefact (a headword the corpus tagger made from another word, not the word itself)',
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
  // Part 2 gather (2026-11-21, Builder 2): hr (the subtitle abbreviation of herr, Mr).
  da: {
    subtitle: ['åh', 'ej', 'h', 'l', 's', 'agent', 'kaptajn', 'dollars', 'sam', 'new', 'okay', 'ok', 'hr'],
    oath: ['fanden', 'helvede', 'lort', 'pis', 'sgu', 'skide', 'kæft', 'gud'],
    violence: ['dræbe', 'dræbte', 'dræbt', 'dræber', 'ihjel', 'våben', 'blod', 'dø'],
  },
  no: {
    subtitle: ['lkke', 'a', 's', 'pa', 'kaptein', 'dollar', 'new', 'ok'],
    oath: ['faen', 'helvete', 'jævla', 'herregud', 'pokker', 'dritt', 'kjeft', 'jøss', 'gud'],
    violence: ['drepe', 'drepte', 'drept', 'dreper', 'våpen', 'blod', 'dø'],
  },
  // Swedish (2026-11-21, Builder 2, Part 2 gather): the Kelly list is a lemmatised web corpus, so its core holds tagger
  // artefacts (analog, unna, å, ätt, orm, hov, kapa, beta, åta sig, te sig: headwords split off och, att, form, behov,
  // åt …), web-page leftovers and parliamentary register. Everyday words the corpus over-represents (land, fråga, krona)
  // stay. Part 4 gather (2026-11-21): som att (a tagger multiword, not a unit of its own), dom (the spoken spelling of
  // de and dem; its noun is the court's verdict), bildning (formal cultivation, beside utbildning) and mission.
  // Polish (2026-11-21, Builder 2, Part 1 gather): the Kelly A1 band is from a web corpus, so as Italian's it carries
  // parliamentary, legal and official register (państwo as the state, rząd, ustawa, sejm, poseł, podatek …) and a few
  // headwords the tagger made from other words: lato (summer) is counted from lat, the genitive of rok (years); były
  // (former) from był, the past of być; proca (sling) from praca; mus (necessity) from musieć; wieko (lid) from wiek;
  // rana (wound) from rano (morning); gen from the abbreviation gen. (general); dr is an abbreviation. Violence: wojna,
  // śmierć, walka, ofiara, żołnierz, armia, wojskowy. Everyday words the corpus over-represents (sprawa, strona,
  // prawo, pan) stay, as do religious words (bóg, ksiądz) and Żyd, a plain noun, not a slur.
  pl: {
    register: ['państwo', 'państwowy', 'rząd', 'ustawa', 'komisja', 'minister', 'ministerstwo', 'prezydent', 'premier', 'unia', 'senator', 'Senat', 'sejm', 'poseł',
      'parlament', 'partia', 'polityczny', 'polityk', 'wyborczy', 'społeczny', 'europejski', 'administracja', 'budżet', 'podatek', 'przepis', 'poprawka',
      'posiedzenie', 'komitet', 'urząd', 'instytucja', 'władza', 'gospodarczy', 'gospodarka', 'finansowy', 'działalność', 'realizacja', 'dotyczyć', 'stanowić', 'ów', 'prenumerata'],
    artefact: ['lato', 'były', 'proca', 'mus', 'wieko', 'rana', 'gen'],
    subtitle: ['dr'],
    violence: ['wojna', 'śmierć', 'walka', 'ofiara', 'żołnierz', 'armia', 'wojskowy'],
  },
  sv: {
    artefact: ['analog', 'unna', 'å', 'te sig', 'riva', 'el', 'ro', 'kapa', 'beta', 'ätt', 'orm', 'akt', 'hov', 'medium', 'ämna', 'åta sig', 'port', 'lik', 'tyda', 'luta', 'peng', 'som att'],
    subtitle: ['etikett', 'inlägg', 'länka', 'kommentera', 'blogg', 'kl.', 'dom'],
    register: ['regering', 'riksdag', 'kommun', 'myndighet', 'kommission', 'socialdemokrat', 'åtgärd', 'verksamhet', 'enligt', 'samt', 'därmed', 'såsom', 'utgöra', 'innebära', 'genomföra', 'anmäla', 'bildning', 'mission'],
    violence: ['krig', 'dö', 'död', 'slå'],
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
