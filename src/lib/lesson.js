import { a1QuestionFor } from './a1types.js'
// Builds lessons from content. Pure: no React, no storage, so it runs under node --test.
// Rule numbers (R01...) refer to the workbook's lesson_rules tab.
import { normalize } from './check.js'

export const BUILT_TYPES = new Set(['QT01', 'QT02', 'QT03', 'QT04', 'QT05', 'QT06', 'QT07', 'QT08', 'QT09', 'QT10', 'QT11', 'QT12', 'QT13', 'QT14', 'QT15', 'QT16', 'QT17'])
// Word to image needs at least 3 pictured words to choose between.
const MIN_PICTURES = 3
const pictured = (c) => c.words.filter((w) => w.image_file)
const AUDIO_TYPES = new Set(['QT04', 'QT07', 'QT11'])
const MAX_NEW_WORDS = 4 // R01
const PASS_SHARE = 0.7 // R05
export const LESSON_SIZE = 10

export const passMark = (graded) => Math.ceil(graded * PASS_SHARE)
export const pick = (list, rng) => list[Math.floor(rng() * list.length)]
export function shuffle(list, rng) {
  const out = [...list]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const englishTokens = (s) => s.english.replace(/[.,!?;:]/g, ' ').split(/\s+/).filter(Boolean)

export function indexContent(t) {
  const swBySentence = new Map()
  for (const sw of t.sentence_words) {
    if (!swBySentence.has(sw.sentence_id)) swBySentence.set(sw.sentence_id, [])
    swBySentence.get(sw.sentence_id).push(sw)
  }
  for (const rows of swBySentence.values()) rows.sort((a, b) => a.position - b.position)
  const vocabulary = {
    fr: new Set(t.sentence_words.flatMap((sw) => normalize(sw.surface, 'fr').split(' '))),
    en: new Set(t.sentences.flatMap((s) => normalize(s.english, 'en').split(' '))),
  }
  const qaByQuestion = new Map()
  for (const q of t.qa_answers) {
    if (!qaByQuestion.has(q.question_sentence_id)) qaByQuestion.set(q.question_sentence_id, [])
    qaByQuestion.get(q.question_sentence_id).push(q.answer_sentence_id)
  }
  const contrast = new Map()
  for (const u of t.units) {
    for (const set of String(u.contrast_sets ?? '').split(';').map((x) => x.trim()).filter(Boolean)) {
      const forms = set.split('|')
      for (const f of forms) contrast.set(f, forms.filter((x) => x !== f))
    }
  }
  // New words arrive in the order the workbook's sentences first use them.
  const wordOrder = []
  for (const s of t.sentences) {
    for (const row of swBySentence.get(s.sentence_id) ?? []) {
      if (row.word_id && !wordOrder.includes(row.word_id)) wordOrder.push(row.word_id)
    }
  }
  return {
    ...t,
    swBySentence, vocabulary, qaByQuestion, contrast, wordOrder,
    // QT09 answers can come from earlier units (Oui., Non.), so lookups reach every sentence.
    sentenceById: new Map((t.allSentences ?? t.sentences).map((s) => [s.sentence_id, s])),
    wordById: new Map(t.words.map((w) => [w.word_id, w])),
    typeById: new Map(t.question_types.map((q) => [q.type_id, q])),
    roundByNumber: new Map(t.rounds.map((r) => [r.round, r])),
  }
}

// One unit's lessons (R21): its own sentences plus any it borrows (decisions: borrow), and the words of this unit
// and the ones before it. Sentences and words of QT09 answers from other units come along for lookups.
export function contentForUnit(t, unitId) {
  const unit = t.units.find((u) => u.unit_id === unitId)
  const ids = new Set([...t.sentences.filter((s) => s.unit_id === unitId).map((s) => s.sentence_id), ...(unit.borrowed_sentence_ids ?? [])])
  const qa = t.qa_answers.filter((q) => ids.has(q.question_sentence_id))
  const withAnswers = new Set([...ids, ...qa.map((q) => q.answer_sentence_id)])
  // Earlier units, never another topic pack (a pack is one choice among several).
  const earlier = new Set(t.units.filter((u) => u.order <= unit.order && (u.is_topic_pick !== 'yes' || u.unit_id === unitId)).map((u) => u.unit_id))
  const usedHere = new Set(t.sentence_words.filter((r) => ids.has(r.sentence_id)).map((r) => r.word_id))
  return indexContent({
    ...t, unit_id: unitId, allSentences: t.sentences,
    sentences: t.sentences.filter((s) => ids.has(s.sentence_id)),
    // Plus any later word the unit's own sentences use (a help circle borrows a few, 2026-11-10); never new here.
    words: t.words.filter((w) => earlier.has(w.first_unit) || usedHere.has(w.word_id)),
    sentence_words: t.sentence_words.filter((r) => withAnswers.has(r.sentence_id)),
    accepted_answers: t.accepted_answers.filter((a) => ids.has(a.sentence_id)),
    qa_answers: qa,
  })
}

// ---------- The mix for a round: workbook mix, then Phase 1 fallbacks, then Can't listen / speak swaps ----------
function swapRule(c, setting, type, round) {
  return c.cant_swaps.find((x) => x.setting === setting && x.type === type && round >= x.rule.from && round <= x.rule.to)?.rule ?? null
}

// One entry per question slot, with the workbook type it came from (swapped_from in runtime_schema).
export function mixSlots(c, round, { cantListen = false, cantSpeak = false } = {}) {
  const out = []
  for (const m of c.round_type_mix.filter((x) => x.round === round)) {
    let type = m.type_id
    // A type not built yet, or word to image in a unit with too few pictures, takes its phase1_fallbacks row.
    // Answer the question in a unit with no question pairs (the topic packs) does the same.
    const noPairs = type === 'QT09' && c.qaByQuestion.size === 0
    if (!BUILT_TYPES.has(type) || (type === 'QT02' && pictured(c).length < MIN_PICTURES) || noPairs) {
      type = c.phase1_fallbacks.find((f) => f.round === round && f.missing_type === type && !String(f.status ?? '').startsWith('off'))?.substitute_type ?? type
    }
    if (cantSpeak) type = swapRule(c, 'cant_speak_now', type, round)?.type ?? type
    if (cantListen) type = swapRule(c, 'cant_listen_now', type, round)?.type ?? type
    for (let i = 0; i < m.questions_per_10; i++) out.push({ type, from: m.type_id })
  }
  return out
}

export function effectiveMix(c, round, settings = {}) {
  const out = new Map()
  for (const s of mixSlots(c, round, settings)) out.set(s.type, (out.get(s.type) ?? 0) + 1)
  return [...out].map(([type, n]) => ({ type, n }))
}

const inRounds = (c, type, round) => {
  const t = c.typeById.get(type)
  return Boolean(t) && round >= t.first_round && round <= t.last_round
}

// ---------- Chips and variants ----------
function chipDistractorCount(type, round) {
  if (type === 'QT06') return 2
  return { 1: 1, 2: 1, 3: 2, 4: 4, 5: 4 }[round] // rounds tab: 1 for QT07 in round 2, 2 in round 3, 4 after
}

// R17: a variant that lists rounds in use_in_rounds is the only one of its type in those rounds; variants with it
// empty rotate in rounds no listed variant covers. "cant_listen_now only" is used under that setting, and only then.
const coversRound = (v, round) => {
  const m = String(v.use_in_rounds ?? '').match(/^(\d)(?:-(\d))?$/)
  return Boolean(m) && round >= Number(m[1]) && round <= Number(m[2] ?? m[1])
}
function variantFor(c, type, round, rng, last, { cantListen = false } = {}) {
  const live = c.variants.filter((v) => v.type_id === type && v.status === 'live')
  const forSetting = live.filter((v) => / only$/.test(String(v.use_in_rounds)))
  const setting = cantListen && forSetting.find((v) => String(v.use_in_rounds).startsWith('cant_listen_now'))
  if (setting) return setting.variant_id
  const normal = live.filter((v) => !forSetting.includes(v))
  const listed = normal.filter((v) => coversRound(v, round))
  let options = listed.length ? listed : normal.filter((v) => !v.use_in_rounds)
  if (!options.length) options = normal // a re-ask a round past every listed range
  const fresh = options.filter((v) => v.variant_id !== last?.[type])
  return pick(fresh.length ? fresh : options, rng).variant_id
}

const frenchKey = (s) => normalize(s.french, 'fr')
const wordIds = (c, s) => (c.swBySentence.get(s.sentence_id) ?? []).map((sw) => sw.word_id).filter(Boolean)

// Closest other sentences first: shared words, then similar length. Never a sentence that says the same
// words (a question and its statement sound and read nearly alike).
function similarSentences(c, s, rng, n, pool, usable = () => true) {
  const own = new Set(wordIds(c, s))
  const rank = (list) => shuffle(list, rng)
    .filter((x) => x.sentence_id !== s.sentence_id && frenchKey(x) !== frenchKey(s) && usable(x))
    .map((x) => {
      const ids = wordIds(c, x)
      return { x, score: ids.filter((id) => own.has(id)).length - Math.abs(ids.length - own.size) * 0.5 }
    })
    .sort((a, b) => b.score - a.score)
    .map(({ x }) => x)
  const fromPool = rank(pool)
  const rest = fromPool.length >= n ? [] : rank(c.sentences).filter((x) => !fromPool.includes(x))
  // Two sentences can share an English line or a French key ("Horses are animals."), so each choice must be distinct in both.
  const out = []
  for (const x of [...fromPool, ...rest]) {
    if (out.length >= n) break
    if (x.english !== s.english && !out.some((o) => o.english === x.english || frenchKey(o) === frenchKey(x))) out.push(x)
  }
  return out
}

// R03: the first wrong chip is the contrast of a word in the sentence (un for une, es for suis) when there is one.
function frenchChipDistractors(c, rows, n, rng) {
  const needed = new Set(rows.map((r) => normalize(r.surface, 'fr')))
  const own = rows.map((r) => c.wordById.get(r.word_id)).filter(Boolean)
  const contrasts = shuffle(own.flatMap((w) => c.contrast.get(w.form) ?? []), rng).filter((f) => !needed.has(normalize(f, 'fr')))
  const rank = (w) => (own.some((o) => o.part_of_speech === w.part_of_speech && o.gender === w.gender) ? 0
    : own.some((o) => o.part_of_speech === w.part_of_speech) ? 1 : 2)
  const others = shuffle(c.words.filter((w) => !needed.has(normalize(w.form, 'fr'))), rng).sort((a, b) => rank(a) - rank(b)).map((w) => w.form)
  return [...new Set([...contrasts, ...others])].slice(0, n)
}

function englishChipDistractors(c, s, n, rng) {
  const needed = new Set(englishTokens(s).map((t) => t.toLowerCase()))
  const seen = new Set()
  const out = []
  for (const x of shuffle(c.sentences, rng)) {
    for (const t of englishTokens(x)) {
      const key = t.toLowerCase()
      if (!needed.has(key) && !seen.has(key) && out.length < n) { seen.add(key); out.push(t) }
    }
  }
  return out
}

// ---------- One question ----------
export function supports(c, type, s, round) {
  const rows = c.swBySentence.get(s.sentence_id) ?? []
  if (type === 'QT05') return rows.length >= 2 && rows.some((r) => r.word_id)
  if (type === 'QT09') return (c.qaByQuestion.get(s.sentence_id)?.length ?? 0) > 0
  if (type === 'QT07' || type === 'QT08') return rows.length >= 2 || chipDistractorCount(type, round) > 0
  return true
}

// The French split into plain text and tappable words, so hints and the blank line up with the sentence.
export function segmentFrench(c, s) {
  const out = []
  let at = 0
  const lower = s.french.toLowerCase()
  for (const row of c.swBySentence.get(s.sentence_id) ?? []) {
    const found = lower.indexOf(String(row.surface).toLowerCase(), at)
    if (found < 0) continue
    if (found > at) out.push({ text: s.french.slice(at, found) })
    const end = found + String(row.surface).length
    const word = c.wordById.get(row.word_id)
    out.push({ text: s.french.slice(found, end), word_id: row.word_id || undefined, hint: row.hint_override || word?.hint || undefined })
    at = end
  }
  if (at < s.french.length) out.push({ text: s.french.slice(at) })
  return out
}

// A native speaker's recording from the Phase 4 check plays first, then Lingua Libre's, then the device voice.
export const recordingOf = (s) => s?.native_recording?.audio_file ?? s?.lingua_libre?.audio_file ?? null
// A word's own recording (Lingua Libre, content sweep part 3), else a one-word sentence's recording, else none (TTS).
export const wordRecordingOf = (c, w) => w?.lingua_libre?.audio_file ?? recordingOf(c.sentences.find((s) => recordingOf(s) && normalize(s.french, 'fr') === normalize(w.form, 'fr'))) ?? null
const audioOf = (s) => ({ sentence_id: s.sentence_id, french: s.french, file: recordingOf(s) })
const answersFor = (c, s, direction) => c.accepted_answers.filter((a) => a.sentence_id === s.sentence_id && a.direction === direction).map((a) => a.answer)
const chipCase = (row) => (row.notes === 'name' ? row.surface : String(row.surface).toLowerCase())

export function makeQuestion(c, type, s, round, rng, last, { cantListen = false, pool = c.sentences } = {}) {
  const variant = variantFor(c, type, round, rng, last, { cantListen })
  if (last) last[type] = variant
  const base = {
    qid: `${type}-${s.sentence_id}-${Math.floor(rng() * 1e9)}`, type, variant, round, skill: c.typeById.get(type).skill,
    sentence_id: s.sentence_id, french: s.french, english: s.english,
    segments: segmentFrench(c, s), audio: audioOf(s),
  }
  const meaningChoices = () => {
    const others = similarSentences(c, s, rng, 2, pool, (x) => x.english !== s.english && !answersFor(c, s, 'fr_to_en').includes(x.english))
    return shuffle([s.english, ...others.map((x) => x.english)], rng)
  }
  if (type === 'QT03') return { ...base, choices: meaningChoices(), answer: s.english, shown: s.english }
  if (type === 'QT04') {
    if (variant === 'V0404') return { ...base, choices: meaningChoices(), answer: s.english, shown: s.french }
    const others = similarSentences(c, s, rng, 2, pool)
    return { ...base, audioChoices: shuffle([s, ...others], rng).map(audioOf), answer: s.sentence_id, shown: s.french }
  }
  if (type === 'QT05') {
    const rows = c.swBySentence.get(s.sentence_id).filter((r) => r.word_id)
    const contrastRows = rows.filter((r) => c.contrast.has(c.wordById.get(r.word_id)?.form))
    const blankRow = pick(contrastRows.length && rng() < 0.7 ? contrastRows : rows, rng)
    const blankIndex = base.segments.findIndex((seg) => seg.word_id === blankRow.word_id)
    const word = c.wordById.get(blankRow.word_id)
    const choiceTotal = round >= 3 ? 4 : 3
    const inSentence = new Set(rows.map((r) => r.word_id))
    const rank = (w) => (w.part_of_speech === word.part_of_speech && w.gender === word.gender ? 0 : w.part_of_speech === word.part_of_speech ? 1 : 2)
    const others = shuffle(c.words.filter((w) => !inSentence.has(w.word_id)), rng).sort((a, b) => rank(a) - rank(b)).map((w) => w.form)
    const partners = (c.contrast.get(word.form) ?? []).filter((f) => !rows.some((r) => c.wordById.get(r.word_id)?.form === f))
    const distractors = [...new Set([...partners, ...others])].slice(0, choiceTotal - 1)
    const answer = base.segments[blankIndex].text.toLowerCase()
    return { ...base, blankIndex, choices: shuffle([answer, ...distractors], rng), answer, shown: s.french }
  }
  if (type === 'QT06') {
    const accepted = [s.english, ...answersFor(c, s, 'fr_to_en')]
    if (variant === 'V0602') return { ...base, lang: 'en', typed: true, accepted, shown: s.english }
    return { ...base, lang: 'en', chips: shuffle([...englishTokens(s), ...englishChipDistractors(c, s, chipDistractorCount(type, round), rng)], rng), accepted, shown: s.english }
  }
  if (type === 'QT07' || type === 'QT08') {
    const rows = c.swBySentence.get(s.sentence_id) ?? []
    const accepted = type === 'QT07' ? [s.french] : [s.french, ...answersFor(c, s, 'en_to_fr')]
    return { ...base, lang: 'fr', chips: shuffle([...rows.map(chipCase), ...frenchChipDistractors(c, rows, chipDistractorCount(type, round), rng)], rng), accepted, shown: s.french }
  }
  if (type === 'QT09') {
    // R04: any listed answer counts. The first row is the one shown, and the one the chips can build.
    // The fullest answer is the one shown and the one the chips build.
    const answers = c.qaByQuestion.get(s.sentence_id).map((id) => c.sentenceById.get(id))
      .sort((a, b) => wordIds(c, b).length - wordIds(c, a).length)
    const primary = answers[0]
    const q = {
      ...base, lang: 'fr', accepted: answers.map((a) => a.french), shown: primary.french,
      answers: answers.map((a) => ({ french: a.french, english: a.english, audio: audioOf(a) })),
    }
    // Round 5 is keyboard only, including the written-out question under Can't listen now.
    if (variant === 'V0902' || round >= 5) return { ...q, typed: true }
    const rows = c.swBySentence.get(primary.sentence_id) ?? []
    return { ...q, chips: shuffle([...rows.map(chipCase), ...frenchChipDistractors(c, rows, chipDistractorCount(type, round), rng)], rng) }
  }
  // Speaking (never graded): repeat what you hear (QT10), speak and compare (QT13). "Native" only with a real recording (R11).
  if (type === 'QT10' || type === 'QT13') return { ...base, speaking: true, native: Boolean(recordingOf(s)), shown: s.french }
  if (type === 'QT11') return { ...base, lang: 'fr', accepted: [s.french], shown: s.french }
  return { ...base, lang: 'fr', accepted: [s.french, ...answersFor(c, s, 'en_to_fr')], shown: s.french } // QT12
}

// A word gets a native recording when a one-word sentence has one; otherwise browser speech.
// Word to image (QT02): V0201 shows the French word and three pictures; V0202 the English word and four pictures
// labelled in French. Only words already met or new in this lesson, and only pictured ones.
export function makeWordImage(c, word, pool, round, rng, last) {
  let variant = variantFor(c, 'QT02', round, rng, last)
  if (variant === 'V0202' && pool.length < 4) variant = 'V0201'
  if (last) last.QT02 = variant
  const n = variant === 'V0202' ? 4 : 3
  const others = shuffle(pool.filter((w) => w.word_id !== word.word_id && w.hint !== word.hint), rng).slice(0, n - 1)
  const fileFor = (w) => wordRecordingOf(c, w)
  return {
    qid: `QT02-${word.word_id}-${Math.floor(rng() * 1e9)}`, type: 'QT02', variant, round, skill: c.typeById.get('QT02').skill,
    word_ids: [word.word_id], word_id: word.word_id, form: word.form, hint: word.hint,
    audio: { french: word.form, file: fileFor(word) },
    // alt: what the picture shows, in English, so a screen reader can answer (WCAG 1.1.1).
    choices: shuffle([word, ...others], rng).map((w) => ({ word_id: w.word_id, image: `/images/${w.image_file}`, label: variant === 'V0202' ? w.form : null, alt: w.hint })),
    answer: word.word_id, shown: `${word.form} = ${word.hint}`,
  }
}

export function makeMatchPairs(c, words, round, rng) {
  const fileFor = (w) => wordRecordingOf(c, w)
  const pairs = words.map((w) => ({ word_id: w.word_id, form: w.form, hint: w.hint, audio: { french: w.form, file: fileFor(w) } }))
  return {
    qid: `QT01-${words.map((w) => w.word_id).join('')}-${Math.floor(rng() * 1e9)}`, type: 'QT01', round, skill: c.typeById.get('QT01').skill,
    variant: words.length < 5 ? 'V0102' : 'V0101', // R01: the 4-pair variant when fewer than 5 words are available
    word_ids: words.map((w) => w.word_id), pairs, meanings: shuffle(pairs.map((p) => p.hint), rng),
    shown: pairs.map((p) => `${p.form} = ${p.hint}`).join(', '),
  }
}

// ---------- A lesson ----------
const seenCount = (map, id) => map?.[id] ?? 0
const leastSeen = (list, idOf, seen, rng) => shuffle(list, rng).sort((a, b) => seenCount(seen, idOf(a)) - seenCount(seen, idOf(b)))

// R01: up to 4 unmet words, and the sentences made only of met words and those.
// In a unit's lessons only the unit's own words are new (R01); words from earlier units are always allowed, since the
// tree, or placement, has already brought the learner past them.
const ownWord = (c, id) => !c.unit_id || c.wordById.get(id)?.first_unit === c.unit_id
export function lessonScope(c, known, round) {
  const newWords = c.wordOrder.filter((id) => ownWord(c, id) && !known.has(id)).slice(0, MAX_NEW_WORDS)
  const allowed = new Set([...known, ...c.wordOrder.filter((id) => !ownWord(c, id)), ...newWords])
  const sentences = c.sentences.filter((s) => s.max_round >= round && wordIds(c, s).every((id) => allowed.has(id)))
  return { newWords, allowed, sentences }
}

function pickWordSet(c, scope, seenWords, used, rng, first = null) {
  const out = []
  const hints = new Set()
  const take = (list) => {
    for (const w of list) {
      if (out.length < 5 && !hints.has(w.hint) && !out.includes(w)) { out.push(w); hints.add(w.hint) }
    }
  }
  if (first && c.wordById.has(first)) take([c.wordById.get(first)])
  take(scope.newWords.map((id) => c.wordById.get(id)).filter((w) => !used.has(w.word_id)))
  const ordered = leastSeen(c.words.filter((w) => scope.allowed.has(w.word_id)), (w) => w.word_id, seenWords, rng)
  take(ordered.filter((w) => !used.has(w.word_id)))
  take(ordered)
  out.forEach((w) => used.add(w.word_id))
  return out
}

// Round-robin across types so the same type doesn't run together. The mix keeps its order, so match pairs
// comes first and new words meet the learner there.
function interleave(slots) {
  const groups = new Map()
  for (const s of slots) groups.set(s.type, [...(groups.get(s.type) ?? []), s])
  const left = [...groups.values()]
  const out = []
  while (left.some((g) => g.length)) {
    for (const g of left) if (g.length) out.push(g.shift())
  }
  return out
}

function constraint(type) {
  return { QT09: 4, QT05: 3, QT07: 2, QT08: 2, QT06: 2, QT01: 1 }[type] ?? 0
}

// retry = the failed lesson's questions: same items, new types where the round allows it.
// carry = a missed item from the last lesson, which takes one slot at its original type (R07).
export function buildLesson(c, { round, seen = {}, known = new Set(), settings = {}, rng = Math.random, retry = null, carry = null, unit_id = 'U01' }) {
  const slotList = interleave(mixSlots(c, round, settings))
  const slots = slotList.map((x) => x.type)
  const scope = lessonScope(c, known, round)
  const opts = { cantListen: settings.cantListen, pool: scope.sentences }
  const last = {}
  const counts = { ...(seen.sentences ?? {}) }
  const usedPairs = new Set()
  const usedWords = new Set()
  const assigned = new Array(slots.length)
  const retrySentences = retry?.filter((q) => q.sentence_id).map((q) => ({ s: c.sentenceById.get(q.sentence_id), before: q.type }))
  const retryWords = retry?.filter((q) => q.type === 'QT01').map((q) => q.word_ids.map((id) => c.wordById.get(id)))
  const usedPictures = new Set()
  let carryWord = !retry && carry?.word_id ? carry.word_id : null

  // Most constrained types choose first, so one-word sentences stay available for the types that can use them.
  const order = slots.map((type, i) => ({ type, i })).sort((a, b) => constraint(b.type) - constraint(a.type))
  for (const slot of order) {
    let { type } = slot
    const { i } = slot
    if (type === 'QT02') {
      // New words first, then the least seen; with fewer than 3 pictured words met, the slot takes the fallback.
      const pool = c.words.filter((w) => w.image_file && scope.allowed.has(w.word_id))
      const fresh = pool.filter((w) => !usedPictures.has(w.word_id))
      if (pool.length >= MIN_PICTURES && fresh.length) {
        const word = [...fresh.filter((w) => scope.newWords.includes(w.word_id)), ...leastSeen(fresh, (w) => w.word_id, seen.words, rng)][0]
        usedPictures.add(word.word_id)
        assigned[i] = makeWordImage(c, word, pool, round, rng, last)
        continue
      }
      type = c.phase1_fallbacks.find((f) => f.round === round && f.missing_type === 'QT02' && !String(f.status ?? '').startsWith('off'))?.substitute_type ?? 'QT03'
    }
    if (type === 'QT01') {
      const words = retryWords?.length ? retryWords.shift() : pickWordSet(c, scope, seen.words, usedWords, rng, carryWord)
      carryWord = null
      assigned[i] = makeMatchPairs(c, words, round, rng)
      continue
    }
    let s
    if (retrySentences) {
      const fits = retrySentences.filter((x) => supports(c, type, x.s, round))
      const fresh = fits.find((x) => x.before !== type) ?? fits[0]
      if (fresh) { s = fresh.s; retrySentences.splice(retrySentences.indexOf(fresh), 1) }
    }
    if (!s) {
      const open = scope.sentences.filter((x) => supports(c, type, x, round))
      // Early lessons have few usable sentences, so one may appear twice, never twice in the same type.
      const fresh = open.filter((x) => !usedPairs.has(x.sentence_id) && !usedPairs.has(`${x.sentence_id}${type}`))
      const second = open.filter((x) => !usedPairs.has(`${x.sentence_id}${type}`))
      s = leastSeen(fresh.length ? fresh : second.length ? second : open, (x) => x.sentence_id, counts, rng)[0]
    }
    usedPairs.add(s.sentence_id)
    usedPairs.add(`${s.sentence_id}${type}`)
    counts[s.sentence_id] = (counts[s.sentence_id] ?? 0) + 1
    assigned[i] = makeQuestion(c, type, s, round, rng, last, opts)
  }

  // R07
  if (!retry && carry?.sentence_id && BUILT_TYPES.has(carry.type) && inRounds(c, carry.type, round)
    && !(settings.cantListen && (AUDIO_TYPES.has(carry.type)))) {
    const s = c.sentenceById.get(carry.sentence_id)
    if (s && supports(c, carry.type, s, round)) {
      let at = assigned.findIndex((q) => q.type === carry.type && q.sentence_id !== s.sentence_id)
      if (at < 0) at = assigned.findLastIndex((q) => q.type !== 'QT01')
      if (at >= 0) assigned[at] = makeQuestion(c, carry.type, s, round, rng, last, opts)
    }
  }

  slotList.forEach((slot, i) => {
    if (slot.from !== assigned[i].type && (assigned[i].type === slot.type || slot.type === 'QT02')) assigned[i].swapped_from = slot.from
  })

  // A1 Complete (2026-11-10): a circle with A1 task items (QT14 to QT17) gives one per lesson, mid-lesson.
  const task = retry ? null : a1QuestionFor(c, unit_id, round, { seen: seen.sentences ?? {}, cantListen: settings.cantListen, rng })
  if (task) assigned.splice(Math.floor(assigned.length / 2), 0, task)

  return {
    id: `L${Math.floor(rng() * 1e12)}`, kind: 'lesson', unit_id, round, started_at: Date.now(),
    queue: assigned, size: assigned.length, graded: assigned.filter((q) => q.skill !== 'speaking' && !q.ungraded).length,
    index: 0, firstCorrect: 0, firstWrong: 0, misses: [],
  }
}

// How many lessons a round takes to cover every live sentence: played through several times, taking the longest,
// so the count the learner sees doesn't shift.
const lessonCounts = new WeakMap()
export function lessonsInRound(c, round) {
  if (!lessonCounts.has(c)) lessonCounts.set(c, new Map())
  const cache = lessonCounts.get(c)
  if (cache.has(round)) return cache.get(round)
  let longest = 0
  for (let seed = 1; seed <= 30; seed++) {
    let x = seed
    const rng = () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296 }
    const known = new Set(round === 1 ? [] : c.wordOrder)
    const seen = { sentences: {}, words: {} }
    let n = 0
    while (n < 40 && (Object.keys(seen.sentences).length < c.sentences.length || c.wordOrder.some((id) => ownWord(c, id) && !known.has(id)))) {
      const lesson = buildLesson(c, { round, seen, known, rng })
      for (const q of lesson.queue) {
        if (q.sentence_id) seen.sentences[q.sentence_id] = (seen.sentences[q.sentence_id] ?? 0) + 1
        for (const id of q.word_ids ?? []) { seen.words[id] = (seen.words[id] ?? 0) + 1; known.add(id) }
        for (const seg of q.segments ?? []) if (seg.word_id) known.add(seg.word_id)
      }
      n++
    }
    longest = Math.max(longest, n)
  }
  cache.set(round, longest)
  return longest
}

// ---------- Remediation: same content, a different type, one step easier where possible ----------
const EASIER = {
  QT12: ['QT08', 'QT06', 'QT07'], QT11: ['QT07', 'QT12', 'QT08'], QT09: ['QT08', 'QT12'],
  QT08: ['QT06', 'QT05', 'QT07', 'QT03', 'QT12'], QT07: ['QT04', 'QT08', 'QT05', 'QT03', 'QT12'],
  QT06: ['QT03', 'QT05', 'QT08', 'QT07'], QT05: ['QT03', 'QT06', 'QT08'], QT04: ['QT03', 'QT07'], QT03: ['QT04', 'QT06', 'QT05'],
}

export function simplestSentenceWith(c, wordId, known) {
  const list = c.sentences.filter((s) => {
    const ids = wordIds(c, s)
    return ids.includes(wordId) && ids.every((id) => id === wordId || known.has(id))
  })
  return list.sort((a, b) => wordIds(c, a).length - wordIds(c, b).length)[0] ?? null
}

export function reaskFor(c, q, { rng = Math.random, cantListen = false, missedWord = null, known = new Set(c.wordOrder) } = {}) {
  let s
  if (q.type === 'QT01' || q.type === 'QT02') s = simplestSentenceWith(c, missedWord ?? q.word_ids[0], known)
  else if (q.type === 'QT09') s = c.sentenceById.get(c.qaByQuestion.get(q.sentence_id)[0]) // QT09's content is its answer
  else s = c.sentenceById.get(q.sentence_id)
  if (!s) return null
  const options = q.type === 'QT01' || q.type === 'QT02' ? ['QT03', 'QT06'] : EASIER[q.type] ?? ['QT03']
  // R06: the same round's types or one round easier.
  const allowed = new Set([q.round, q.round - 1].filter((r) => r >= 1).flatMap((r) => effectiveMix(c, r, { cantListen }).map((m) => m.type)))
  const usable = (t) => allowed.has(t) && inRounds(c, t, q.round) && !(cantListen && AUDIO_TYPES.has(t)) && supports(c, t, s, q.round)
  // With Can't listen on in round 1 no other type is open, so the same type returns with new choices.
  const type = options.find(usable) ?? (!['QT01', 'QT02'].includes(q.type) && usable(q.type) ? q.type : null)
  if (!type) return null
  return { ...makeQuestion(c, type, s, q.round, rng, null, { cantListen }), reask: true }
}

// ---------- Review ----------
// Items already correct today go last: only a new day moves them toward leaving the bank (R09).
export function buildReview(c, bank, { round = 1, settings = {}, rng = Math.random, today = '' } = {}) {
  const creditLeft = (e) => ((e.correct_days ?? []).includes(today) ? 1 : 0)
  const entries = [...bank].sort((a, b) => creditLeft(a) - creditLeft(b) || (a.correct_days?.length ?? 0) - (b.correct_days?.length ?? 0) || String(a.added_at).localeCompare(String(b.added_at))).slice(0, LESSON_SIZE)
  const queue = entries.flatMap((e) => {
    const s = c.sentenceById.get(e.sentence_id)
    if (!s) return []
    let type = BUILT_TYPES.has(e.type_id) && e.type_id !== 'QT01' ? e.type_id : 'QT03'
    if (settings.cantListen) type = swapRule(c, 'cant_listen_now', type, round)?.type ?? (AUDIO_TYPES.has(type) ? 'QT03' : type)
    if (!supports(c, type, s, round)) type = 'QT03'
    return [makeQuestion(c, type, s, round, rng, null, { cantListen: settings.cantListen })]
  })
  return { id: `R${Math.floor(rng() * 1e12)}`, kind: 'review', round, started_at: Date.now(), queue: shuffle(queue, rng), size: queue.length, graded: queue.length, index: 0, firstCorrect: 0, firstWrong: 0, misses: [] }
}

// ---------- Short sessions outside the tree: practice weak skills, an "I can" check, the placement check ----------
// items: [{ sentence_id, type, round, unit_id }]. Nothing here moves tree progress or the score.
export function buildSession(c, kind, items, { settings = {}, rng = Math.random, ...extra } = {}) {
  const queue = items.flatMap((it) => {
    const s = c.sentenceById.get(it.sentence_id)
    if (!s) return []
    let type = it.type
    if (settings.cantListen && AUDIO_TYPES.has(type)) type = 'QT03'
    if (!supports(c, type, s, it.round)) type = 'QT03'
    return [{ ...makeQuestion(c, type, s, it.round, rng, null, { cantListen: settings.cantListen }), unit_id: it.unit_id, ...(it.part ? { part: it.part } : {}) }]
  })
  return {
    id: `${kind[0].toUpperCase()}${Math.floor(rng() * 1e12)}`, kind, started_at: Date.now(), ...extra,
    queue, size: queue.length, graded: queue.filter((q) => !q.speaking).length, index: 0, firstCorrect: 0, firstWrong: 0, misses: [],
  }
}

// The type a sentence is practised in, by how far its unit has come: recognition early, recall later.
export const practiceType = (reached) => (reached >= 4 ? 'QT12' : reached >= 2 ? 'QT08' : 'QT03')

// An "I can" check: three of the unit's sentences in the statement's skill (learning-methods 17).
const CHECK_TYPE = { listening: ['QT04', 2], reading: ['QT03', 2], writing: ['QT12', 4], speaking: ['QT13', 5] }
export function checkItems(c, skill, rng = Math.random) {
  const [type, round] = CHECK_TYPE[skill]
  const pool = c.sentences.filter((s) => s.unit_id === c.unit_id && supports(c, type, s, round))
  return shuffle(pool, rng).slice(0, 3).map((s) => ({ sentence_id: s.sentence_id, type, round, unit_id: c.unit_id }))
}

// Placement: three questions per unit, in tree order (meaning, listening, typed translation).
export function placementItems(unitContents, rng = Math.random) {
  return unitContents.flatMap((c) => {
    const own = shuffle(c.sentences.filter((s) => s.unit_id === c.unit_id), rng)
    return [['QT03', 2], ['QT04', 2], ['QT12', 4]].map(([type, round], i) => own[i] && ({ sentence_id: own[i].sentence_id, type, round, unit_id: c.unit_id })).filter(Boolean)
  })
}

// ---------- Can't listen now / Can't speak now, tapped inside a lesson ----------
// Old Duolingo's way: the question on screen and every later one that needs the ear (or the voice) switch to the
// type the cant_swaps rows name for that round, on the same sentence. Answers already given stay as they were.
// The current question is rebuilt even when its type stays (a Listen first one shows its French again).
export function swapRemaining(c, session, { cantListen = false, cantSpeak = false }, rng = Math.random) {
  const queue = session.queue.map((q, i) => {
    // A number heard (QT17) is read instead, the same question otherwise.
    if (i >= session.index && q.type === 'QT17' && cantListen) return { ...q, readInstead: true, skill: 'reading' }
    if (i < session.index || !q.sentence_id) return q
    let type = q.type
    if (cantSpeak && q.speaking) type = swapRule(c, 'cant_speak_now', type, q.round)?.type ?? 'QT08'
    if (cantListen && AUDIO_TYPES.has(type)) type = swapRule(c, 'cant_listen_now', type, q.round)?.type ?? 'QT03'
    if (type === q.type && i !== session.index) return q
    const s = c.sentenceById.get(q.sentence_id)
    if (!s) return q
    if (!supports(c, type, s, q.round)) type = 'QT03'
    const swapped = { ...makeQuestion(c, type, s, q.round, rng, null, { cantListen }), swapped_from: q.swapped_from ?? (type !== q.type ? q.type : undefined) }
    if (q.unit_id) swapped.unit_id = q.unit_id
    if (q.reask) swapped.reask = true
    return swapped
  })
  return { ...session, queue, graded: queue.slice(0, session.size).filter((q) => !q.speaking).length }
}
