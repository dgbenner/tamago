// Builds lessons from content. Pure: no React, no storage, so it runs under node --test.
import { normalize } from './check.js'

export const BUILT_TYPES = new Set(['QT01', 'QT03', 'QT04', 'QT05', 'QT06', 'QT07', 'QT08', 'QT11', 'QT12'])
const AUDIO_TYPES = new Set(['QT04', 'QT07', 'QT11'])
export const LESSON_SIZE = 10
export const PASS = 7

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
  return {
    ...t,
    swBySentence,
    vocabulary,
    sentenceById: new Map(t.sentences.map((s) => [s.sentence_id, s])),
    wordById: new Map(t.words.map((w) => [w.word_id, w])),
    roundByNumber: new Map(t.rounds.map((r) => [r.round, r])),
  }
}

// ---------- The mix for a round: workbook mix, then Phase 1 fallbacks, then Can't listen / speak swaps ----------
function swapped(c, setting, type, round) {
  const row = c.cant_swaps.find((x) => x.setting === setting && x.type === type)
  return row?.rules.find((r) => round >= r.from && round <= r.to)?.type ?? null
}

export function effectiveMix(c, round, { cantListen = false, cantSpeak = false } = {}) {
  const out = new Map()
  for (const m of c.round_type_mix.filter((x) => x.round === round)) {
    let type = c.phase1_fallbacks.find((f) => f.round === round && f.missing_type === m.type_id)?.substitute_type ?? m.type_id
    if (cantSpeak) type = swapped(c, 'cant_speak_now', type, round) ?? type
    if (cantListen) type = swapped(c, 'cant_listen_now', type, round) ?? type
    out.set(type, (out.get(type) ?? 0) + m.questions_per_10)
  }
  return [...out].map(([type, n]) => ({ type, n }))
}

// Enough lessons for every sentence to appear in the round. QT01 slots ask words, not sentences.
export function lessonsInRound(c, round) {
  const slots = effectiveMix(c, round).reduce((n, m) => n + (m.type === 'QT01' ? 0 : m.n), 0)
  return Math.ceil(c.sentences.length / slots)
}

// ---------- Distractors ----------
function chipDistractorCount(c, type, round) {
  if (type === 'QT06') return 2
  if (type === 'QT08') return round >= 4 ? 4 : 2
  if (type === 'QT07') {
    const n = Number(c.roundByNumber.get(round)?.distractor_chips)
    return Number.isFinite(n) ? n : 4
  }
  return 0
}

function variantFor(c, type, round, rng, last) {
  const live = c.variants.filter((v) => v.type_id === type && v.status === 'live')
  let options = live
  if (type === 'QT07') options = live.filter((v) => (chipDistractorCount(c, type, round) > 0 ? v.variant_id === 'V0701' : v.variant_id === 'V0702'))
  if (type === 'QT08') options = live.filter((v) => v.variant_id === (round >= 4 ? 'V0802' : 'V0801'))
  const fresh = options.filter((v) => v.variant_id !== last?.[type])
  const chosen = pick(fresh.length ? fresh : options, rng)
  return chosen.variant_id
}

const frenchKey = (s) => normalize(s.french, 'fr')
const wordIds = (c, s) => (c.swBySentence.get(s.sentence_id) ?? []).map((sw) => sw.word_id).filter(Boolean)

// Closest other sentences first: shared words, then similar length. Never a sentence that says the same
// words (a question and its statement sound and read nearly alike).
function similarSentences(c, s, rng, n, usable = () => true) {
  const own = new Set(wordIds(c, s))
  const scored = shuffle(c.sentences, rng)
    .filter((x) => x.sentence_id !== s.sentence_id && frenchKey(x) !== frenchKey(s) && usable(x))
    .map((x) => {
      const ids = wordIds(c, x)
      return { x, score: ids.filter((id) => own.has(id)).length - Math.abs(ids.length - own.size) * 0.5 }
    })
    .sort((a, b) => b.score - a.score)
  const out = []
  for (const { x } of scored) {
    if (out.length === n) break
    out.push(x)
  }
  return out
}

function frenchChipDistractors(c, s, n, rng) {
  const rows = c.swBySentence.get(s.sentence_id) ?? []
  const needed = new Set(rows.map((r) => normalize(r.surface, 'fr')))
  const own = rows.map((r) => c.wordById.get(r.word_id)).filter(Boolean)
  const rank = (w) => (own.some((o) => o.part_of_speech === w.part_of_speech && o.gender === w.gender) ? 0
    : own.some((o) => o.part_of_speech === w.part_of_speech) ? 1 : 2)
  const candidates = shuffle(c.words.filter((w) => !needed.has(normalize(w.form, 'fr'))), rng).sort((a, b) => rank(a) - rank(b))
  return candidates.slice(0, n).map((w) => w.form)
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
  if (type === 'QT07' || type === 'QT08') return rows.length >= 2 || chipDistractorCount(c, type, round) > 0
  if (type === 'QT06') return englishTokens(s).length >= 2 || chipDistractorCount(c, type, round) > 0
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

const audioOf = (s) => ({ sentence_id: s.sentence_id, french: s.french, file: s.lingua_libre?.audio_file ?? null })
const answersFor = (c, s, direction) => c.accepted_answers.filter((a) => a.sentence_id === s.sentence_id && a.direction === direction).map((a) => a.answer)
const chipCase = (row) => (row.notes === 'name' ? row.surface : String(row.surface).toLowerCase())

export function makeQuestion(c, type, s, round, rng, last) {
  const variant = variantFor(c, type, round, rng, last)
  if (last) last[type] = variant
  const base = {
    qid: `${type}-${s.sentence_id}-${Math.floor(rng() * 1e9)}`, type, variant, round,
    sentence_id: s.sentence_id, french: s.french, english: s.english,
    segments: segmentFrench(c, s), audio: audioOf(s),
  }
  if (type === 'QT03') {
    const others = similarSentences(c, s, rng, 2, (x) => x.english !== s.english && !answersFor(c, s, 'fr_to_en').includes(x.english))
    return { ...base, choices: shuffle([s.english, ...others.map((x) => x.english)], rng), answer: s.english, shown: s.english }
  }
  if (type === 'QT04') {
    const others = similarSentences(c, s, rng, 2)
    return { ...base, audioChoices: shuffle([s, ...others], rng).map(audioOf), answer: s.sentence_id, shown: s.french }
  }
  if (type === 'QT05') {
    const rows = c.swBySentence.get(s.sentence_id).filter((r) => r.word_id)
    const blankRow = pick(rows, rng)
    const blankIndex = base.segments.findIndex((seg) => seg.word_id === blankRow.word_id)
    const word = c.wordById.get(blankRow.word_id)
    const choiceTotal = round >= 3 ? 4 : 3
    const inSentence = new Set(rows.map((r) => r.word_id))
    const rank = (w) => (w.part_of_speech === word.part_of_speech && w.gender === word.gender ? 0 : w.part_of_speech === word.part_of_speech ? 1 : 2)
    const distractors = shuffle(c.words.filter((w) => !inSentence.has(w.word_id)), rng).sort((a, b) => rank(a) - rank(b)).slice(0, choiceTotal - 1).map((w) => w.form)
    const answer = base.segments[blankIndex].text
    const atStart = blankIndex === 0
    return { ...base, blankIndex, choices: shuffle([atStart ? answer.toLowerCase() : answer, ...distractors], rng), answer: answer.toLowerCase(), shown: s.french }
  }
  const n = chipDistractorCount(c, type, round)
  if (type === 'QT06') {
    return { ...base, lang: 'en', chips: shuffle([...englishTokens(s), ...englishChipDistractors(c, s, n, rng)], rng), accepted: [s.english, ...answersFor(c, s, 'fr_to_en')], shown: s.english }
  }
  if (type === 'QT07' || type === 'QT08') {
    const needed = (c.swBySentence.get(s.sentence_id) ?? []).map(chipCase)
    const accepted = type === 'QT07' ? [s.french] : [s.french, ...answersFor(c, s, 'en_to_fr')]
    return { ...base, lang: 'fr', chips: shuffle([...needed, ...frenchChipDistractors(c, s, n, rng)], rng), accepted, shown: s.french }
  }
  if (type === 'QT11') return { ...base, lang: 'fr', accepted: [s.french], shown: s.french }
  return { ...base, lang: 'fr', accepted: [s.french, ...answersFor(c, s, 'en_to_fr')], shown: s.french } // QT12
}

export function makeMatchPairs(c, words, round, rng) {
  // A word gets a native recording when a one-word sentence has one; otherwise browser speech.
  const fileFor = (w) => c.sentences.find((s) => s.lingua_libre?.audio_file && normalize(s.french, 'fr') === normalize(w.form, 'fr'))?.lingua_libre.audio_file ?? null
  const pairs = words.map((w) => ({ word_id: w.word_id, form: w.form, hint: w.hint, audio: { french: w.form, file: fileFor(w) } }))
  return {
    qid: `QT01-${words.map((w) => w.word_id).join('')}-${Math.floor(rng() * 1e9)}`, type: 'QT01', variant: 'V0101', round,
    word_ids: words.map((w) => w.word_id), pairs, meanings: shuffle(pairs.map((p) => p.hint), rng),
    shown: pairs.map((p) => `${p.form} = ${p.hint}`).join(', '),
  }
}

// ---------- A lesson ----------
const seenCount = (map, id) => map?.[id] ?? 0
const leastSeen = (list, idOf, seen, rng) => shuffle(list, rng).sort((a, b) => seenCount(seen, idOf(a)) - seenCount(seen, idOf(b)))

function pickWordSet(c, seenWords, used, rng) {
  const out = []
  const hints = new Set()
  const take = (list) => {
    for (const w of list) {
      if (out.length < 5 && !hints.has(w.hint) && !out.includes(w)) { out.push(w); hints.add(w.hint) }
    }
  }
  const ordered = leastSeen(c.words, (w) => w.word_id, seenWords, rng)
  take(ordered.filter((w) => !used.has(w.word_id)))
  take(ordered)
  out.forEach((w) => used.add(w.word_id))
  return out
}

// Round-robin across types so the same type doesn't run together; the mix keeps its order (easier first).
function interleave(mix) {
  const left = mix.map((m) => ({ ...m }))
  const out = []
  while (left.some((m) => m.n > 0)) {
    for (const m of left) if (m.n > 0) { out.push(m.type); m.n-- }
  }
  return out
}

// retry = the failed lesson's questions: same items, new types where the round allows it.
export function buildLesson(c, { round, seen = {}, settings = {}, rng = Math.random, retry = null, unit_id = 'U01' }) {
  const slots = interleave(effectiveMix(c, round, settings))
  const last = {}
  const used = new Set()
  const usedWords = new Set()
  const assigned = new Array(slots.length)
  const retrySentences = retry?.filter((q) => q.sentence_id).map((q) => ({ s: c.sentenceById.get(q.sentence_id), before: q.type }))
  const retryWords = retry?.filter((q) => q.word_ids).map((q) => q.word_ids.map((id) => c.wordById.get(id)))

  // Most constrained types choose first, so one-word sentences stay available for the types that can use them.
  const order = slots.map((type, i) => ({ type, i })).sort((a, b) => constraint(b.type) - constraint(a.type))
  for (const { type, i } of order) {
    if (type === 'QT01') {
      const words = retryWords?.length ? retryWords.shift() : pickWordSet(c, seen.words, usedWords, rng)
      assigned[i] = makeMatchPairs(c, words, round, rng)
      continue
    }
    let s
    if (retrySentences) {
      const fits = retrySentences.filter((x) => supports(c, type, x.s, round))
      const fresh = fits.find((x) => x.before !== type) ?? fits[0] ?? retrySentences[0]
      if (fresh) { s = fresh.s; retrySentences.splice(retrySentences.indexOf(fresh), 1) }
    }
    if (!s) {
      const open = c.sentences.filter((x) => !used.has(x.sentence_id) && x.max_round >= round && supports(c, type, x, round))
      s = leastSeen(open, (x) => x.sentence_id, seen.sentences, rng)[0]
    }
    used.add(s.sentence_id)
    assigned[i] = makeQuestion(c, type, s, round, rng, last)
  }
  return {
    id: `L${Math.floor(rng() * 1e12)}`, kind: 'lesson', unit_id, round,
    queue: assigned, size: assigned.length, index: 0, firstCorrect: 0, firstWrong: 0, reasked: {},
  }
}

function constraint(type) {
  return { QT05: 3, QT07: 2, QT08: 2, QT06: 2, QT01: 1 }[type] ?? 0
}

// ---------- Remediation: same content, a different type, one step easier where possible ----------
const EASIER = {
  QT12: ['QT08', 'QT06', 'QT03'], QT11: ['QT07', 'QT04', 'QT12'], QT08: ['QT06', 'QT05', 'QT03'], QT07: ['QT04', 'QT08', 'QT03'],
  QT06: ['QT03', 'QT05'], QT05: ['QT03', 'QT06'], QT04: ['QT03', 'QT06'], QT03: ['QT04', 'QT06'],
}

export function simplestSentenceWith(c, wordId) {
  const list = c.sentences.filter((s) => wordIds(c, s).includes(wordId))
  return list.sort((a, b) => wordIds(c, a).length - wordIds(c, b).length)[0] ?? null
}

export function reaskFor(c, q, { rng = Math.random, cantListen = false, missedWord = null } = {}) {
  const s = q.type === 'QT01' ? simplestSentenceWith(c, missedWord ?? q.word_ids[0]) : c.sentenceById.get(q.sentence_id)
  if (!s) return null
  const options = q.type === 'QT01' ? ['QT03', 'QT06'] : EASIER[q.type]
  const type = options.find((t) => !(cantListen && AUDIO_TYPES.has(t)) && supports(c, t, s, q.round))
  if (!type) return null
  return { ...makeQuestion(c, type, s, q.round, rng), reask: true }
}

// ---------- Review ----------
export function buildReview(c, bank, { round = 1, settings = {}, rng = Math.random } = {}) {
  const entries = [...bank].sort((a, b) => a.correct_in_review - b.correct_in_review || String(a.added_at).localeCompare(String(b.added_at))).slice(0, LESSON_SIZE)
  const queue = entries.flatMap((e) => {
    const s = c.sentenceById.get(e.sentence_id)
    if (!s) return []
    let type = BUILT_TYPES.has(e.type_id) && e.type_id !== 'QT01' ? e.type_id : 'QT03'
    if (settings.cantListen) type = swapped(c, 'cant_listen_now', type, round) ?? (AUDIO_TYPES.has(type) ? 'QT03' : type)
    if (!supports(c, type, s, round)) type = 'QT03'
    return [makeQuestion(c, type, s, round, rng)]
  })
  return { id: `R${Math.floor(rng() * 1e12)}`, kind: 'review', round, queue: shuffle(queue, rng), size: queue.length, index: 0, firstCorrect: 0, firstWrong: 0, reasked: {} }
}
