// Checks the imported content against Tatoeba, Wiktionary and Lingua Libre.
// Writes content/checks/*.json and content/review.md. Never touches the workbook,
// so results survive a new workbook: they are matched by text and re-run on each import.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { getJson } from './lib/http.mjs'
import { loadTatoeba } from './lib/tatoeba.mjs'
import { presentIndicative } from './lib/conjugation.mjs'
import { at, C, COURSE, audioUrl } from './lib/course.mjs'
// Lingua Libre names files LL-<language item> (<ISO 639-3>)-<speaker>-<text>.<ext>.
const LL = `LL-${C.linguaLibre.qid} (${C.linguaLibre.iso})`
const llEsc = LL.replace(/[()]/g, '\\$&')
const LL_FILE = new RegExp(`^File:${llEsc}-(.+)\\.[a-z0-9]+$`, 'i')
const LL_PARTS = new RegExp(`^${llEsc}-([^-]+)-(.+)\\.[a-z0-9]+$`, 'i')
const LL_SPEAKER = new RegExp(`^${llEsc}-(.+?)-`)

const ROOT = join(import.meta.dirname, '..')
const read = (p) => JSON.parse(readFileSync(at(p), 'utf8'))
const raw = (t) => read(`content/raw/${t}.json`)
const CHECKS = at('content/checks')
mkdirSync(CHECKS, { recursive: true })

const sentences = raw('sentences')
const words = raw('words')
const sentenceWords = raw('sentence_words')
const accepted = raw('accepted_answers')
const senses = read('content/word-senses.json')
const decisions = read('content/review-decisions.json')

const MAX_WORDS = 6 // question-types.md section 8
const norm = (s) => String(s).replace(/[’ʼ]/g, "'").replace(/[  ]/g, ' ').replace(/\s+/g, ' ').trim()
const loose = (s) => norm(s).toLowerCase().replace(/[.!?…,;:"«»\s]+/g, ' ').trim()
const CONTRACTIONS = [[/\bi'm\b/g, 'i am'], [/\byou're\b/g, 'you are'], [/\bhe's\b/g, 'he is'], [/\bshe's\b/g, 'she is'], [/\bit's\b/g, 'it is']]
const looseEn = (s) => CONTRACTIONS.reduce((t, [re, to]) => t.replace(re, to), loose(s).replace(/-/g, ' '))
const tokens = (s) => norm(s).toLowerCase().split(/[\s.,!?;:…"«»()\-]+/).filter(Boolean)
const tatoebaUrl = (id) => `https://tatoeba.org/en/sentences/show/${id}`

// ---------- Tatoeba ----------
console.log('Tatoeba: loading exports')
const tatoeba = loadTatoeba()
const byExact = new Map()
const byLoose = new Map()
const byId = new Map()
for (const s of tatoeba.french) {
  for (const [map, key] of [[byExact, norm(s.text)], [byLoose, loose(s.text)]]) {
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(s)
  }
  byId.set(s.id, s)
}
const trusted = (s) => { const t = tatoeba.trustOf(s); return t.native_owner || t.ok_tag }
const describe = (s) => {
  const t = tatoeba.trustOf(s)
  return { source_id: s.id, source_owner: s.owner, ...t, french: s.text, english: tatoeba.englishFor(s.id) }
}

const isOff = (row) => String(row.status).startsWith('off')
const acceptedFor = (id) => accepted.filter((a) => a.sentence_id === id && a.direction === 'fr_to_en' && !isOff(a)).map((a) => a.answer)

function matchSentence(s) {
  const wanted = new Set([s.english, ...acceptedFor(s.sentence_id)].map(looseEn))
  const score = (c) => {
    const en = tatoeba.englishFor(c.id).some((e) => looseEn(e) === looseEn(s.english)) ? 2
      : tatoeba.englishFor(c.id).some((e) => wanted.has(looseEn(e))) ? 1 : 0
    return en * 2 + (trusted(c) ? 1 : 0)
  }
  const exact = [...(byExact.get(norm(s.french)) ?? [])].sort((a, b) => score(b) - score(a))
  const best = exact[0]
  if (!best) {
    const variants = (byLoose.get(loose(s.french)) ?? []).map(describe)
    return { reason: 'no_match', variants }
  }
  const english_linked = tatoeba.englishFor(best.id).some((e) => wanted.has(looseEn(e)))
  if (!english_linked) return { reason: 'english_not_linked', match: describe(best) }
  if (!trusted(best)) return { reason: 'no_trust_signal', match: describe(best) }
  return { reason: null, match: describe(best) }
}

// Replacement candidates: real Tatoeba sentences using only this unit's vocabulary.
function vocabulary(unit) {
  const allowed = new Set()
  for (const w of words.filter((w) => w.first_unit === unit)) tokens(w.form).forEach((t) => allowed.add(t))
  return allowed
}
const pools = new Map()
function pool(unit) {
  if (pools.has(unit)) return pools.get(unit)
  const allowed = vocabulary(unit)
  const seen = new Set()
  const list = []
  for (const s of tatoeba.french) {
    const t = tokens(s.text)
    if (t.length === 0 || t.length > MAX_WORDS || !t.every((x) => allowed.has(x))) continue
    const en = tatoeba.englishFor(s.id)
    if (en.length === 0 || !trusted(s)) continue
    const key = norm(s.text)
    if (seen.has(key)) continue
    seen.add(key)
    list.push({ s, t })
  }
  pools.set(unit, list)
  return list
}

// The pool minus sentences the unit already has, punctuation variants included.
const MIN_SIMILARITY = 0.3
const inUse = new Set(sentences.map((x) => loose(x.french)))
const freshPool = (unit) => {
  const seen = new Set()
  return pool(unit).filter((c) => {
    const key = loose(c.s.text)
    if (inUse.has(key) || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

// Replacing a sentence means regenerating its sentence_words from the unit's word list.
function tokenizeReplacement(french, unit) {
  const forms = words.filter((w) => w.first_unit === unit).map((w) => ({ ...w, parts: tokens(w.form) })).sort((a, b) => b.parts.length - a.parts.length)
  const original = norm(french).split(/[\s.,!?;:…"«»()\-]+/).filter(Boolean)
  const t = original.map((x) => x.toLowerCase())
  const out = []
  for (let i = 0; i < t.length;) {
    const hit = forms.find((f) => f.parts.every((p, k) => t[i + k] === p))
    if (!hit) throw new Error(`"${french}": "${t[i]}" is not in the ${unit} word list`)
    out.push({ position: out.length + 1, surface: original.slice(i, i + hit.parts.length).join(' '), word_id: hit.word_id, notes: '' })
    i += hit.parts.length
  }
  return out
}

// ---------- Lingua Libre (recordings live on Wikimedia Commons) ----------
async function linguaLibre(text) {
  const q = `intitle:"${LL}" intitle:"${loose(text)}"`
  const res = await getJson(`https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=50&format=json&srsearch=${encodeURIComponent(q)}`)
  const want = loose(text)
  const hits = (res?.query?.search ?? []).map((r) => r.title).filter((title) => {
    const m = title.match(LL_FILE)
    if (!m) return false
    const rest = m[1]
    const cut = rest.indexOf('-') // speaker-transcription; a second hyphen means a compound like re-bonjour
    // A question needs a recording titled as one: a flat "et" is not "Et ?".
    if (/\?\s*$/.test(text) && !rest.includes('?')) return false
    return cut > 0 && loose(rest.slice(cut + 1)) === want
  }).sort()
  if (hits.length === 0) return null
  const info = await getJson(`https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url|extmetadata&format=json&titles=${encodeURIComponent(hits[0])}`)
  const page = Object.values(info?.query?.pages ?? {})[0]
  const ii = page?.imageinfo?.[0]
  return {
    file: hits[0].replace(/^File:/, ''), url: ii?.url ?? '',
    license: ii?.extmetadata?.LicenseShortName?.value ?? '', recordings_found: hits.length,
  }
}

// ---------- Sentences ----------
console.log('Sentences: matching')
const sentenceChecks = []
for (const s of sentences) {
  const decision = decisions.sentences?.[s.sentence_id]
  const stale = decision && decision.french !== s.french
  if (stale) console.warn(`  stale decision ignored for ${s.sentence_id}: made on "${decision.french}"`)
  // Drafts, and originals the workbook marks live pending the native check, count as approved originals.
  const original = s.origin === 'draft' || (s.source === 'tamago_original' && String(s.status).includes('native check'))
  const d = original && !decision?.action ? { action: 'keep' } : stale ? null : decision
  const result = matchSentence(s)
  const row = {
    sentence_id: s.sentence_id, unit_id: s.unit_id, draft_french: s.french, draft_english: s.english,
    french: s.french, english: s.english, source: 'claude_draft', source_id: '', source_owner: '',
    status: 'flagged', flag_reason: result.reason, match: result.match ?? null, variants: result.variants ?? [],
    decision: d?.action ?? '', sentence_words: null, english_source: '', native_check: '',
  }
  if (result.reason === null) {
    Object.assign(row, { status: 'checked', source: 'tatoeba', source_id: result.match.source_id, source_owner: result.match.source_owner })
  } else if (d?.action === 'confirm' && result.match) {
    Object.assign(row, { status: 'checked', flag_reason: null, source: 'tatoeba', source_id: result.match.source_id, source_owner: result.match.source_owner, english_source: d.english_source ?? '' })
  } else if (d?.action === 'keep') {
    Object.assign(row, { status: 'dan_reviewed', flag_reason: null, source: 'tamago_original', native_check: 'needed before Phase 4' })
  } else if (d?.action === 'replace') {
    const t = byId.get(String(d.tatoeba_id))
    if (!t) throw new Error(`${s.sentence_id}: Tatoeba sentence ${d.tatoeba_id} not found`)
    Object.assign(row, {
      status: 'checked', flag_reason: null, source: 'tatoeba', source_id: t.id, source_owner: t.owner,
      french: t.text, english: d.english ?? tatoeba.englishFor(t.id)[0],
      sentence_words: tokenizeReplacement(t.text, s.unit_id),
    })
  }
  if (row.status === 'flagged') {
    // Closest by shared words (Jaccard). Below the floor a candidate is unrelated, so show none.
    const draft = new Set(tokens(s.french))
    row.candidates = freshPool(s.unit_id)
      .map((c) => {
        const own = new Set(c.t)
        const shared = [...own].filter((x) => draft.has(x)).length
        return { c, similarity: shared / (own.size + draft.size - shared) }
      })
      .filter((x) => x.similarity >= MIN_SIMILARITY)
      .sort((a, b) => b.similarity - a.similarity || a.c.s.id - b.c.s.id)
      .slice(0, 3)
      .map(({ c }) => describe(c.s))
  }
  sentenceChecks.push(row)
}

console.log('Sentences: Lingua Libre')
for (const row of sentenceChecks) {
  row.lingua_libre = await linguaLibre(row.french)
  row.audio_source = row.lingua_libre ? 'lingua_libre' : 'tts'
}

// ---------- Accepted answers ----------
// A wiktionary source reads "wiktionary: c'est = it is": the word's gloss must say so.
const wiktionaryBacks = (source) => {
  const m = String(source).match(/^wiktionary: (.+?) = (.+)$/)
  const w = m && words.find((x) => x.form === m[1])
  return Boolean(w && String(w.gloss).includes(m[2]))
}
const answerChecks = accepted.map((a) => {
  const s = sentences.find((x) => x.sentence_id === a.sentence_id)
  const hit = a.direction !== 'fr_to_en' ? null
    : (byLoose.get(loose(s.french)) ?? []).find((c) => tatoeba.englishFor(c.id).some((e) => looseEn(e) === looseEn(a.answer)))
  const d = decisions.accepted_answers?.[a.answer_id]
  const kept = d?.action === 'keep' && d.answer === a.answer
  const linked = [...new Set((byLoose.get(loose(s.french)) ?? []).flatMap((c) => tatoeba.englishFor(c.id)))]
  return {
    answer_id: a.answer_id, sentence_id: a.sentence_id, answer: a.answer,
    status: isOff(a) ? 'off' : hit || kept || wiktionaryBacks(a.source) ? 'checked' : 'flagged',
    source: a.source, source_id: hit?.id ?? '',
    reason: isOff(a) || hit || kept || wiktionaryBacks(a.source) ? '' : `Tatoeba does not link this wording. It links: ${linked.join('; ')}`,
  }
})

// ---------- Generated en_to_fr answers (workbook README) ----------
// Other French sentences Tatoeba links to the same English, under the same checked rule.
// The main French sentence always counts, so it is never listed here.
const liveSentences = sentences.filter((s) => String(s.status).startsWith('live'))
const englishWanted = new Map()
for (const s of liveSentences) {
  const key = looseEn(s.english)
  if (!englishWanted.has(key)) englishWanted.set(key, [])
  englishWanted.get(key).push(s)
}
const generatedAnswers = []
for (const c of tatoeba.french) {
  if (!trusted(c)) continue
  for (const en of tatoeba.englishFor(c.id)) {
    for (const s of englishWanted.get(looseEn(en)) ?? []) {
      if (loose(c.text) === loose(s.french)) continue
      const id = `G${s.sentence_id}-${c.id}`
      if (generatedAnswers.some((g) => g.answer_id === id)) continue
      const same = generatedAnswers.some((g) => g.sentence_id === s.sentence_id && loose(g.answer) === loose(c.text))
      if (!same) generatedAnswers.push({ answer_id: id, sentence_id: s.sentence_id, direction: 'en_to_fr', answer: norm(c.text), source: 'tatoeba', source_id: c.id, status: 'checked', source_owner: c.owner })
    }
  }
}
generatedAnswers.sort((x, y) => x.sentence_id.localeCompare(y.sentence_id) || x.answer.localeCompare(y.answer))

// ---------- French feedback lines (feedback_phrases) ----------
// A French line ships when Tatoeba has it, from a trusted owner, linked to its English.
const phraseChecks = (raw('feedback_phrases') ?? []).filter((f) => f.language !== 'en').map((f) => {
  const found = (byLoose.get(loose(f.text)) ?? []).filter(trusted)
  const linked = found.find((c) => tatoeba.englishFor(c.id).some((e) => looseEn(e) === looseEn(f.english)))
  const linkedEnglish = [...new Set(found.flatMap((c) => tatoeba.englishFor(c.id)))]
  return {
    phrase_id: f.phrase_id, text: f.text, english: f.english, status: linked ? 'checked' : 'flagged',
    source_id: linked?.id ?? '', source_owner: linked?.owner ?? '',
    reason: linked ? '' : found.length ? `Tatoeba links other English: ${linkedEnglish.slice(0, 6).join('; ')}` : 'not in Tatoeba from a trusted owner',
  }
})

// ---------- Wiktionary ----------
console.log('Words: Wiktionary')
const clean = (html) => String(html).replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '').replace(/\.mw-parser-output[^}]*\}/g, '').replace(/&#32;/g, ' ').replace(/&#160;|&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
const shorten = (d) => { let x = d; while (/\([^()]*\)/.test(x)) x = x.replace(/\s*\([^()]*\)/g, ''); return x.replace(/\s*[()]\s*/g, ' ').trim() }
const title = (form) => encodeURIComponent(form.replace(/ /g, '_'))

// Very large pages ("a") keep most languages on subpages; French is then on one of these.
const SUBPAGES = ['', '/languages_A_to_L', '/languages_M_to_Z']

async function french(form) {
  for (const sub of SUBPAGES) {
    const defs = await getJson(`https://en.wiktionary.org/api/rest_v1/page/definition/${title(form)}${encodeURIComponent(sub)}`)
    const entries = (defs?.[C.wiktionaryCode] ?? []).map((e) => ({ pos: e.partOfSpeech, definitions: e.definitions.map((x) => clean(x.definition)).filter(Boolean) }))
    if (entries.length) return entries
  }
  // Wiktionary's summary leaves out some headings (Spanish cien sits under ===Number===; mucha has none listed): read
  // the course's section of the page itself, each part-of-speech heading and its # definitions (2026-11-14).
  const section = await frenchWikitext(form)
  const out = []
  for (const m of section.matchAll(/\n===+ *(Number|Numeral|Adjective|Determiner|Noun|Verb|Adverb|Pronoun|Interjection|Preposition|Conjunction|Proper noun) *===+\n([\s\S]*?)(?=\n===|$)/g)) {
    const defs = [...m[2].matchAll(/^# (?!:)(.+)$/gm)].map((d) => d[1]
      .replace(/\{\{(?:feminine singular of|feminine of|plural of|masculine plural of|feminine plural of)\|[a-z]+\|([^}|]+)[^}]*\}\}/g, 'feminine singular of $1')
      .replace(/\{\{gl\|([^}]*)\}\}/g, '($1)').replace(/\{\{[^}]*\}\}/g, '').replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1').replace(/'''?/g, '').trim()).filter(Boolean)
    if (defs.length) out.push({ pos: m[1] === 'Number' ? 'Numeral' : m[1], definitions: defs })
  }
  return out
}

async function frenchWikitext(form) {
  for (const sub of SUBPAGES) {
    const p = await getJson(`https://en.wiktionary.org/w/api.php?action=parse&page=${title(form)}${encodeURIComponent(sub)}&prop=wikitext&format=json&redirects=1`)
    const wt = p?.parse?.wikitext?.['*'] ?? ''
    const section = wt.match(new RegExp(`(?:^|\\n)==${C.wiktionarySection}==\\n([\\s\\S]*?)(?=\\n==[^=]|$)`))?.[1]
    if (section) return section
  }
  return ''
}

// Gender from the headword template under the entry's part-of-speech heading.
function genderFrom(section, pos, posIndex, definition) {
  const parts = section.split(new RegExp(`\\n={3,4}${pos}={3,4}\\n`))
  const head = parts[posIndex + 1]?.split('\n').find((l) => l.startsWith('{{')) ?? ''
  const fromNoun = head.match(/\{\{fr-noun\|(?:g=)?(mfbysense|mf|m|f)\b/)?.[1]
  // German and Spanish headwords (2026-11-10): {{de-noun|m,es,…}}, {{de-noun|g=n}}, {{es-noun|m}}.
  const fromOther = head.match(/\{\{(?:de|es)-noun\|(?:g=)?(mfbysense|mf|m|f|n)\b/)?.[1]
  const fromHead = fromOther ?? head.match(/\{\{head\|(?:fr|es|de)\|[^}]*\bg=(m|f|n)\b/)?.[1]
  const g = fromNoun ?? fromHead ?? (/^feminine\b/.test(definition) ? 'f' : /^masculine\b/.test(definition) ? 'm' : '')
  return g === 'mfbysense' || g === 'mf' ? 'm/f' : g
}

const wordChecks = []
for (const w of words) {
  const entries = await french(w.form)
  const section = await frenchWikitext(w.form)
  const pick = senses[w.word_id]
  const entry = pick?.form_of ? null : entries.find((e) => e.pos === pick?.pos && (!pick.match || e.definitions.some((d) => d.includes(pick.match)))) ?? (pick ? null : entries[0])
  const definition = entry && (pick?.match ? entry.definitions.find((d) => d.includes(pick.match)) : entry.definitions[0])
  const row = {
    word_id: w.word_id, form: w.form, lemma: w.form, part_of_speech: '', gender: '', gloss: '', gloss_full: '', lemma_gloss: '',
    wiktionary_url: `https://en.wiktionary.org/wiki/${title(w.form)}#${C.wiktionarySection}`,
    status: 'flagged', flag_reason: '', other_entries: [],
  }
  // A form Wiktionary's page files under another verb (trinkst sits under triften there): the pick names the lemma
  // and person, and the lemma's own Wiktionary conjugation table has to list the form.
  const table = !definition && pick?.form_of ? await presentIndicative(pick.form_of) : null
  if (table?.some((t) => t.person.split(', ')[0] === pick.person && t.form === w.form)) {
    Object.assign(row, { part_of_speech: 'Verb', lemma: pick.form_of, gloss: `${{ ich: 'first-person singular', du: 'second-person singular', er: 'third-person singular', wir: 'first-person plural', ihr: 'second-person plural' }[pick.person] ?? pick.person} present of ${pick.form_of}`, gloss_full: `present tense, ${pick.person}, in Wiktionary's conjugation of ${pick.form_of}`, status: 'checked', wiktionary_url: `https://en.wiktionary.org/wiki/${title(pick.form_of)}#${C.wiktionarySection}` })
    const lemmaEntry = (await french(pick.form_of)).find((e) => e.pos === 'Verb')
    row.lemma_gloss = lemmaEntry ? shorten(lemmaEntry.definitions[0]) : ''
  } else if (!definition) {
    row.flag_reason = entries.length ? 'sense_not_found' : 'no_french_entry'
  } else {
    row.part_of_speech = entry.pos
    row.gloss_full = definition
    const posIndex = entries.filter((e) => e.pos === entry.pos).indexOf(entry)
    row.gender = ['Noun', 'Article'].includes(entry.pos) ? genderFrom(section, entry.pos, posIndex, definition) : ''
    // Form-of entries name their lemma: "first-person ... of être", "feminine singular of un (“a / an”)".
    const form = definition.match(/\bof ([\p{L}'-]+)(?: \(“(.+?)”\))?/u)
    if (form && /(person|singular|plural)\b/.test(definition)) {
      row.lemma = form[1]
      if (form[2]) row.gloss = form[2]
      else {
        const lemmaEntries = await french(form[1])
        const lemmaEntry = lemmaEntries.find((e) => e.pos === entry.pos)
        row.lemma_gloss = lemmaEntry ? shorten(lemmaEntry.definitions[0]) : ''
        row.gloss = definition
      }
    } else {
      row.gloss = shorten(definition)
    }
    row.status = 'checked'
    if (!pick) { row.status = 'flagged'; row.flag_reason = 'sense_not_picked' }
    row.other_entries = entries.filter((e) => e !== entry).map((e) => `${e.pos}: ${e.definitions[0] ?? ''}`)
  }
  wordChecks.push(row)
}

// Word recordings on Lingua Libre (content sweep, part 3). Wikidata's French lexemes link their Lingua Libre files,
// so one query finds most of them; the words Wikidata doesn't link are searched on Commons one by one, at the polite
// pace of lib/http.mjs. Licences and file addresses come from Commons, fifty files a request. A form spelled
// the same but said differently by meaning (est "is" or "east", fils "son" or "threads") is skipped: the recording
// can't say which one it is. Elided forms (j', l') aren't words on their own.
const HETEROPHONES = new Set(['est', 'fils', 'as', 'plus', 'tous', 'os', 'sens', 'vis', 'content', 'couvent'])
console.log('Words: Lingua Libre')
const recordable = wordChecks.filter((r) => !HETEROPHONES.has(r.form) && !/'$/.test(r.form))
// In batches (a single query for 360 words is a URL Wikidata refuses, 431), with the course's own language tag.
const bindings = []
for (let i = 0; i < recordable.length; i += 120) {
  const values = recordable.slice(i, i + 120).map((r) => `"${r.form.replace(/"/g, '')}"@${C.wiktionaryCode}`).join(' ')
  const sparql = `SELECT ?rep ?audio WHERE { VALUES ?rep { ${values} } ?l dct:language wd:${C.wikidataLanguage}; ontolex:lexicalForm ?f. ?f ontolex:representation ?rep; wdt:P443 ?audio. FILTER(CONTAINS(STR(?audio), "LL-${C.linguaLibre.qid}")) }`
  const wd = await getJson(`https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(sparql)}`)
  bindings.push(...(wd?.results?.bindings ?? []))
}
const filesFor = new Map()
for (const b of bindings) {
  const file = decodeURIComponent(b.audio.value.split('/Special:FilePath/')[1] ?? '')
  const rest = file.match(LL_PARTS)
  if (!rest || loose(rest[2]) !== loose(b.rep.value)) continue // the file must be titled as the word itself
  if (!filesFor.has(b.rep.value)) filesFor.set(b.rep.value, new Set())
  filesFor.get(b.rep.value).add(file)
}
for (const r of recordable) {
  if (filesFor.has(r.form)) continue
  const q = `intitle:"${LL}" intitle:"${loose(r.form)}"`
  const res = await getJson(`https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=50&format=json&srsearch=${encodeURIComponent(q)}`)
  const hits = (res?.query?.search ?? []).map((x) => x.title.replace(/^File:/, '')).filter((t) => { const m = t.match(LL_PARTS); return m && loose(m[2]) === loose(r.form) })
  // A short, common word (chat, une, dix) drowns in near misses (château, chaton), so a title pattern ending in the
  // word itself finds it.
  if (!hits.length) {
    const pattern = `intitle:"${LL}" intitle:/-${r.form.replace(/[.?+*|{}[\]()"\\#@&<>~]/g, '\\$&')}.wav/`
    const res2 = await getJson(`https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=50&format=json&srsearch=${encodeURIComponent(pattern)}`)
    hits.push(...(res2?.query?.search ?? []).map((x) => x.title.replace(/^File:/, '')).filter((t) => { const m = t.match(LL_PARTS); return m && loose(m[2]) === loose(r.form) }))
  }
  if (hits.length) filesFor.set(r.form, new Set(hits))
}
// One file per word (the first by name, as for sentences), with its licence and address.
const chosen = new Map([...filesFor].map(([form, set]) => [form, [...set].sort()[0]]))
const infoFor = new Map()
const titles = [...new Set(chosen.values())]
for (let i = 0; i < titles.length; i += 50) {
  const batch = titles.slice(i, i + 50).map((t) => `File:${t}`).join('|')
  const info = await getJson(`https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url|extmetadata&format=json&titles=${encodeURIComponent(batch)}`)
  for (const page of Object.values(info?.query?.pages ?? {})) {
    const ii = page.imageinfo?.[0]
    if (ii) infoFor.set(page.title.replace(/^File:/, ''), { url: ii.url, license: ii.extmetadata?.LicenseShortName?.value ?? '' })
  }
}
for (const row of wordChecks) {
  const file = recordable.includes(row) ? chosen.get(row.form) : null
  const info = file && infoFor.get(file)
  row.lingua_libre = info && /^CC/.test(info.license) ? { file, url: info.url, license: info.license, recordings_found: filesFor.get(row.form).size } : null
}

// ---------- Output ----------
const save = (name, rows) => writeFileSync(join(CHECKS, `${name}.json`), JSON.stringify(rows, null, 2) + '\n')
save('sentences', sentenceChecks)
save('accepted_answers', answerChecks)
save('generated_answers', generatedAnswers)

// Conjugation tables for the grammar notes, read from Wiktionary.
// Every verb lemma in the course (for the conjugation trainer), plus the grammar notes' lemmas.
const verbLemmas = wordChecks.filter((w) => w.status === 'checked' && w.part_of_speech === 'Verb' && w.lemma && w.lemma !== w.form || (w.part_of_speech === 'Verb' && /er$|ir$|re$/.test(w.lemma))).map((w) => w.lemma)
const lemmas = [...new Set([...(raw('grammar_notes') ?? []).flatMap((n) => String(n.conjugation_lemma).split(';').map((x) => x.trim()).filter(Boolean)), ...verbLemmas])]
const conjugations = {}
for (const l of lemmas) conjugations[l] = await presentIndicative(l)
save('conjugations', conjugations)
console.log(`Conjugations from Wiktionary: ${Object.entries(conjugations).map(([l, t]) => `${l} ${t ? t.length + ' forms' : 'MISSING'}`).join(', ')}`)
save('feedback_phrases', phraseChecks)
save('words', wordChecks)

const esc = (s) => String(s).replace(/\|/g, '\\|')
const trustLabel = (m) => [m.native_owner && 'native owner', m.ok_tag && 'OK tag'].filter(Boolean).join(', ') || 'neither'
const link = (m) => `[#${m.source_id}](${tatoebaUrl(m.source_id)})`
const candidateCell = (r) => (r.candidates ?? []).map((c) => `${link(c)} ${esc(c.french)} = ${esc(c.english[0] ?? '')}`).join('<br>') || 'none'
const flagged = sentenceChecks.filter((r) => r.status === 'flagged')
const group = (reason) => flagged.filter((r) => r.flag_reason === reason)
const offIds = new Set(sentences.filter(isOff).map((s) => s.sentence_id))
const passed = sentenceChecks.filter((r) => r.status === 'checked' && !offIds.has(r.sentence_id))
const reviewed = sentenceChecks.filter((r) => r.status === 'dan_reviewed' && !offIds.has(r.sentence_id))
const awaiting = sentences.filter((s) => !isOff(s) && !String(s.status).startsWith('live'))
const table = (title, lead, head, rows) => {
  if (rows.length === 0) return
  md.push(`## ${title} (${rows.length})`, '')
  if (lead) md.push(lead, '')
  md.push(`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.join(' | ')} |`), '')
}
const pairOf = new Map(sentences.map((s) => [s.sentence_id, s.pair_id]))

const md = []
md.push('# Tamago content review', '')
md.push(`Sentences live: ${passed.length + reviewed.length} (${passed.length} matched to Tatoeba, ${reviewed.length} Tamago originals), ${offIds.size} off, ${awaiting.length} awaiting a ruling. Words with Wiktionary data: ${wordChecks.filter((w) => w.status === 'checked').length} of ${wordChecks.length}. French-to-English answers: ${answerChecks.filter((a) => a.status === 'checked').length} live, ${answerChecks.filter((a) => a.status === 'off').length} off, ${answerChecks.filter((a) => a.status === 'flagged').length} flagged. English-to-French answers generated from Tatoeba: ${generatedAnswers.length}.`, '')
const approved = (id) => decisions.units?.[id]?.action === 'approve'
md.push(`Unit 1 is ${approved('U01') ? 'approved and live' : 'not live: it waits for Dan\'s approval'}.`, '')
md.push('Generated by `npm run content`. Do not edit by hand: record decisions in content/review-decisions.json.', '')
md.push('**What "checked" means here.** Tatoeba has no checked field. A sentence passes when its French is in Tatoeba exactly (ignoring curly apostrophes and spacing), a directly linked English translation matches the draft English or an accepted answer (I\'m = I am), and the sentence is owned by a self-declared native French speaker or carries Tatoeba\'s OK tag. Dan can confirm a match that lacks one of these.', '')

table('Exact match, one signal missing', 'French and English both match Tatoeba, but the owner is not a declared native speaker and there is no OK tag.',
  ['ID', 'French', 'English', 'Tatoeba', 'Owner'], group('no_trust_signal').map((r) => [r.sentence_id, esc(r.french), esc(r.english), link(r.match), r.match.source_owner]))
table("French matches, English doesn't", '', ['ID', 'French', 'Draft English', 'Tatoeba', 'Tatoeba English', 'Signal'],
  group('english_not_linked').map((r) => [r.sentence_id, esc(r.french), esc(r.english), link(r.match), esc(r.match.english.join('; ') || 'none linked'), trustLabel(r.match)]))
table('Not in Tatoeba', `Candidates use only Unit 1 words, have 6 words or fewer, have a linked English translation and pass the signal test. ${freshPool('U01').length} such sentences are unused.`,
  ['ID', 'Pair', 'Draft', 'Closest candidates from Tatoeba'], group('no_match').map((r) => [r.sentence_id, pairOf.get(r.sentence_id) || '', `${esc(r.french)}<br>${esc(r.english)}`, candidateCell(r)]))

const flaggedAnswers = answerChecks.filter((a) => a.status === 'flagged')
table('Accepted answers not backed by Tatoeba', 'These stay out of the app until the workbook owner rules on them.', ['ID', 'Sentence', 'Answer', 'Reason'],
  flaggedAnswers.map((a) => [a.answer_id, `${a.sentence_id} ${esc(sentences.find((s) => s.sentence_id === a.sentence_id).french)}`, esc(a.answer), esc(a.reason)]))

table('Tamago originals: native-speaker check needed before Phase 4', 'Dan kept these drafts with no Tatoeba source. No native speaker has read them.', ['ID', 'Pair', 'French', 'English', 'Audio'],
  reviewed.map((r) => [r.sentence_id, pairOf.get(r.sentence_id) || '', esc(r.french), esc(r.english), r.audio_source]))

table('Words, for a read-through', 'Part of speech is the entry chosen in content/word-senses.json. All wording is Wiktionary\'s.', ['ID', 'Form', 'Lemma', 'POS', 'Gender', 'Gloss', 'Status'],
  wordChecks.map((w) => [w.word_id, esc(w.form), esc(w.lemma), w.part_of_speech, w.gender, esc(w.gloss) + (w.lemma_gloss ? ` (${esc(w.lemma)}: ${esc(w.lemma_gloss)})` : ''), w.status + (w.flag_reason ? `: ${w.flag_reason}` : '')]))

table('Matched to Tatoeba', 'Decision "confirm" means Dan accepted a match the automatic test did not pass. English source "tamago_original" means Tatoeba links no translation and the English is ours.', ['ID', 'French', 'English', 'Tatoeba', 'Owner', 'Decision', 'English source', 'Audio'],
  passed.map((r) => [r.sentence_id, esc(r.french), esc(r.english), `[#${r.source_id}](${tatoebaUrl(r.source_id)})`, r.source_owner, r.decision, r.english_source, r.audio_source]))

table('Off in the workbook', 'Set to off by the workbook owner. Not shipped.', ['ID', 'French', 'English', 'Reason'],
  sentences.filter(isOff).map((s) => [s.sentence_id, esc(s.french), esc(s.english), esc(s.notes)]))

table('English-to-French answers generated from Tatoeba', 'Other French sentences Tatoeba links to the same English, passing the same native-owner or OK-tag test. Accepted on typed English-to-French questions alongside the main sentence.', ['Sentence', 'English', 'Also accepted', 'Tatoeba', 'Owner'],
  generatedAnswers.map((g) => { const s = sentences.find((x) => x.sentence_id === g.sentence_id); return [g.sentence_id, esc(s.english), esc(g.answer), `[#${g.source_id}](${tatoebaUrl(g.source_id)})`, g.source_owner] }))

table('French feedback lines', 'Checked against Tatoeba: same French from a trusted owner, linked to the listed English. Flagged lines stay out of the app.', ['ID', 'French', 'English', 'Status', 'Tatoeba', 'Reason'],
  phraseChecks.map((p) => [p.phrase_id, esc(p.text), esc(p.english), p.status, p.source_id ? `[#${p.source_id}](${tatoebaUrl(p.source_id)})` : '', esc(p.reason)]))

const ll = sentenceChecks.filter((r) => r.lingua_libre && !offIds.has(r.sentence_id))
table('Lingua Libre recordings', '', ['ID', 'French', 'File', 'License', 'Recordings found'],
  ll.map((r) => [r.sentence_id, esc(r.french), `[${esc(r.lingua_libre.file)}](${encodeURI(r.lingua_libre.url)})`, esc(r.lingua_libre.license), r.lingua_libre.recordings_found]))
writeFileSync(at('content/review.md'), md.join('\n'))

console.log(`Sentences: ${passed.length} checked, ${reviewed.length} dan_reviewed, ${flagged.length} flagged. Words: ${wordChecks.filter((w) => w.status === 'checked').length} checked. Answers: ${answerChecks.filter((a) => a.status === 'checked').length} checked, ${flaggedAnswers.length} flagged, ${generatedAnswers.length} en_to_fr generated. Lingua Libre: ${ll.length} live sentences, ${wordChecks.filter((w) => w.lingua_libre).length} words. French feedback lines: ${phraseChecks.filter((p) => p.status === 'checked').length} of ${phraseChecks.length} checked.`)
