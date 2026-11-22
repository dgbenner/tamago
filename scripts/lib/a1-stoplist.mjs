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
  // and leftovers. Everyday words that subtitles over-represent but A1 needs (politiet, hallo) stay.
  // Part 2 gather (2026-11-21, Builder 2): hr (the subtitle abbreviation of herr, Mr).
  da: {
    subtitle: ['åh', 'ej', 'h', 'l', 's', 'agent', 'kaptajn', 'dollars', 'sam', 'new', 'okay', 'ok', 'hr'],
    oath: ['fanden', 'helvede', 'lort', 'pis', 'sgu', 'skide', 'kæft', 'gud'],
    // Phase 6 (2026-11-22, Dan's call on Fable's review): død, døde, døden and hade, hader with their death and hate lines cut;
    // hate is filed under violence, the nearest kind.
    violence: ['dræbe', 'dræbte', 'dræbt', 'dræber', 'ihjel', 'våben', 'blod', 'dø', 'død', 'døde', 'døden', 'hade', 'hader'],
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
  // rana (wound) from rano (morning); gen from the abbreviation gen. (general); dr is an abbreviation; nim (Part 2,
  // 2026-11-21) is the instrumental or locative of on (z nim, o nim), a form listed as a headword. Violence: wojna,
  // śmierć, walka, ofiara, żołnierz, armia, wojskowy. Everyday words the corpus over-represents (sprawa, strona,
  // prawo, pan) stay, as do religious words (bóg, ksiądz) and Żyd, a plain noun, not a slur. Part 4 gather (2026-11-21):
  // officialese verbs and connectives with no A1 line on Tatoeba (dokonać carry out, uzyskać obtain, stwierdzić state,
  // określić and określony determine, zgodnie in accordance, poprzez by means of) and legal register (prawny, sąd as a
  // court, wniosek as an application, zakład as an establishment), as Italian's nonché, mediante and effettuare.
  // U95 prune (2026-11-22, Dan's call, as Swedish Part 4's newsroom tail): U95 Society + News is the Kelly newsroom and
  // report tail (społeczeństwo, naród, wolność, organizacja, związek as union, rozwój, środowisko, ochrona, akcja,
  // kwestia, badanie as research, warunek, udział, bezpieczeństwo; współpraca, produkcja, wzrost, umowa, służba already
  // off). Those with only drafted lines are off (scripts/review/pl-u95-prune.mjs, workbook v9); bezpieczeństwo keeps its
  // Tatoeba line and stays taught. Everyday ciało, milion and interes still count. v2: U95 needs a source beyond Tatoeba.
  pl: {
    register: ['państwo', 'państwowy', 'rząd', 'ustawa', 'komisja', 'minister', 'ministerstwo', 'prezydent', 'premier', 'unia', 'senator', 'Senat', 'sejm', 'poseł',
      'parlament', 'partia', 'polityczny', 'polityk', 'wyborczy', 'społeczny', 'europejski', 'administracja', 'budżet', 'podatek', 'przepis', 'poprawka',
      'posiedzenie', 'komitet', 'urząd', 'instytucja', 'władza', 'gospodarczy', 'gospodarka', 'finansowy', 'działalność', 'realizacja', 'dotyczyć', 'stanowić', 'ów', 'prenumerata',
      'dokonać', 'uzyskać', 'stwierdzić', 'określić', 'określony', 'zgodnie', 'poprzez', 'prawny', 'sąd', 'wniosek', 'zakład',
      'społeczeństwo', 'naród', 'organizacja', 'związek', 'wolność', 'bezpieczeństwo', 'ochrona', 'akcja', 'kwestia', 'środowisko', 'badanie', 'rozwój',
      'warunek', 'udział', 'współpraca', 'produkcja', 'wzrost', 'umowa', 'służba'],
    artefact: ['lato', 'były', 'proca', 'mus', 'wieko', 'rana', 'gen', 'nim'],
    subtitle: ['dr'],
    violence: ['wojna', 'śmierć', 'walka', 'ofiara', 'żołnierz', 'armia', 'wojskowy'],
  },
  // Swedish phase 6 (2026-11-22, Dan's call on Fable's review): the Kelly newsroom and officialese tail of Part 4's
  // vocabulary circles U91 to U95, as Italian's register words were: abstract nouns of news and reports (system,
  // resultat, faktum, procent, krav, stöd, samhälle, stat, parti, demokrati, makt, rättighet, utveckling …), the
  // adjectives of politics and economics (social, nationell, europeisk, ekonomisk, politisk, kristen …) and written
  // register verbs and connectives (anse, gälla, finna, ske, kräva, föra, bidra, dock, dess, såväl, däremot). The
  // everyday core of those circles (mål, skäl, anledning, skillnad, behov, område, kunskap, hög, låg, riktig, vissa,
  // val, rösta, medlem, utbildning, inse, leda, skapa, öka …) still counts. Stoplisted words with Tatoeba lines stay
  // taught; those with only drafted lines are off (part4/sv.mjs, workbook v8).
  sv: {
    artefact: ['analog', 'unna', 'å', 'te sig', 'riva', 'el', 'ro', 'kapa', 'beta', 'ätt', 'orm', 'akt', 'hov', 'medium', 'ämna', 'åta sig', 'port', 'lik', 'tyda', 'luta', 'peng', 'som att'],
    subtitle: ['etikett', 'inlägg', 'länka', 'kommentera', 'blogg', 'kl.', 'dom'],
    register: ['regering', 'riksdag', 'kommun', 'myndighet', 'kommission', 'socialdemokrat', 'åtgärd', 'verksamhet', 'enligt', 'samt', 'därmed', 'såsom', 'utgöra', 'innebära', 'genomföra', 'anmäla', 'bildning', 'mission',
      'system', 'resultat', 'faktum', 'syfte', 'procent', 'betydelse', 'krav', 'stöd', 'antal', 'princip', 'nivå', 'handling',
      'social', 'nationell', 'internationell', 'europeisk', 'ekonomisk', 'politisk', 'kristen', 'offentlig', 'enskild', 'allmän', 'särskild', 'övrig',
      'samhälle', 'stat', 'politik', 'politiker', 'parti', 'demokrati', 'debatt', 'makt', 'rättighet', 'utveckling', 'ekonomi', 'organisation',
      'anse', 'gälla', 'finna', 'dock', 'dess', 'såväl', 'dels', 'däremot', 'ske', 'kräva', 'utveckla', 'föra', 'bidra'],
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
