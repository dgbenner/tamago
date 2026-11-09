// Learner-guided content (Phase 5): asks the generate function, then keeps only what fits Tamago. Every French
// line must split into words the learner has met (the same splitter the content pipeline uses), so hints and
// meanings come from Tamago's Wiktionary data, never from the model. Off until the function reports it's set up.
import { analyse, formIndexFor } from '../../scripts/lib/french.mjs'

const URL_ = '/.netlify/functions/generate'
let ready = null
export const generateReady = () => (ready ??= fetch(URL_).then((r) => (r.ok ? r.json() : { ready: false })).then((j) => Boolean(j.ready)).catch(() => false))

export async function requestGenerated(kind, words, { names = [], count = 6, focus = '' } = {}) {
  try {
    const r = await fetch(URL_, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ kind, words: words.map((w) => ({ form: w.form, hint: w.hint })), names, count, focus }),
    })
    if (!r.ok) return { error: r.status === 429 ? 'busy' : 'failed' }
    return { result: (await r.json()).result ?? null }
  } catch { return { error: 'offline' } }
}

// Splits a French line into the learner's words; null if any word isn't one of them.
export function fit(french, words, names) {
  const a = analyse(french, formIndexFor(words), { names: new Set(names.map((n) => n.toLowerCase())) })
  return a.unknown ? null : a.parts
}

// Generated sentences as content rows: sentences plus sentence_words, ids G…, kept only when every word fits.
export function sentencesFrom(result, words, names, stamp = Date.now()) {
  const sentences = []
  const sentence_words = []
  const seen = new Set()
  for (const [i, s] of (result?.sentences ?? []).entries()) {
    const french = String(s.french ?? '').trim()
    const english = String(s.english ?? '').trim()
    if (!french || !english || seen.has(french.toLowerCase())) continue
    const parts = fit(french, words, names)
    if (!parts?.length) continue
    seen.add(french.toLowerCase())
    const id = `G${stamp}${i}`
    sentences.push({ sentence_id: id, unit_id: 'GEN', french, english, source: 'generated', status: 'live', max_round: 5, audio_source: 'tts' })
    parts.forEach((p, k) => sentence_words.push({ sentence_id: id, position: k + 1, surface: p.surface, word_id: p.word_id, notes: p.name ? 'name' : '', hint_override: '' }))
  }
  return { sentences, sentence_words }
}

// A QT20 passage: every line fits, 2 to 8 lines, and every question has 2 to 4 choices with a valid answer.
export function listeningFrom(result, words, names) {
  const lines = (result?.lines ?? []).map((l) => ({ speaker: l.speaker === 'B' ? 'B' : 'A', french: String(l.french ?? '').trim(), english: String(l.english ?? '').trim() }))
  if (lines.length < 2 || lines.length > 8 || lines.some((l) => !l.french || !fit(l.french, words, names))) return null
  const questions = (result?.questions ?? []).filter((q) => Array.isArray(q.choices) && q.choices.length >= 2 && q.choices.length <= 4 && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.choices.length)
    .map((q) => ({ question: String(q.question), choices: q.choices.map(String), answer: q.answer }))
  if (!questions.length) return null
  return { title: String(result.title ?? 'Listening'), lines, questions }
}
