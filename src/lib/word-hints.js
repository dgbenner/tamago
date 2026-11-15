// Hints for words in a line (Dan, 2026-11-15, all courses): a course word shows its own hint; any other form of a
// taught verb ("gardez", "allons") shows the verb's ("garder: to keep"), from the verb's Wiktionary conjugation table
// (conjugations.json), so the form needn't be in the word list. Meanings always come from the course's data.
import { analyse, formIndexFor } from '../../scripts/lib/french.mjs'

// A Wiktionary gloss trimmed for a hint: no usage notes in brackets ("to go [with à ‘to a location’]" → "to go").
const trim = (g) => String(g ?? '').replace(/\s*\[[^\]]*\]/g, '').replace(/\s+/g, ' ').trim()

// form (lower case) -> "lemma: meaning", for every present form of every verb whose lemma a course word carries.
export function verbFormHints(words, conjugations) {
  const live = words.filter((w) => w.status !== 'off')
  const known = new Set(live.map((w) => w.form.toLowerCase()))
  const out = new Map()
  for (const c of conjugations ?? []) {
    const lemma = c.lemma
    const own = live.find((w) => w.form === lemma)
    const kin = live.filter((w) => w.lemma === lemma)
    if (!own && kin.length === 0) continue
    const meaning = trim(own?.hint || own?.gloss) || trim(kin.find((w) => w.lemma_gloss)?.lemma_gloss)
    if (!meaning) continue
    const hint = `${lemma}: ${meaning}`
    const forms = [lemma, ...(c.present ?? []).flatMap((p) => String(p.form).split(/\s+or\s+|\s*[,/]\s*/))]
    for (const f of forms.map((x) => x.trim().toLowerCase()).filter(Boolean)) if (!known.has(f) && !out.has(f)) out.set(f, hint)
  }
  return out
}

// A line as pieces: { text, hint } for a word with a hint, { text } for the rest; the pieces join back to the line.
export function hintPieces(text, words, verbHints) {
  const index = formIndexFor(words.filter((w) => w.status !== 'off'))
  const byId = new Map(words.map((w) => [w.word_id, w]))
  const { parts = [] } = analyse(text, index, { partial: true })
  const out = []
  let at = 0
  for (const p of parts) {
    if (p.at > at) out.push({ text: text.slice(at, p.at) })
    const piece = text.slice(p.at, p.end)
    const hint = p.word_id ? trim(byId.get(p.word_id)?.hint || byId.get(p.word_id)?.gloss) : verbHints.get(piece.toLowerCase().replace(/[’ʼ]/g, "'"))
    out.push(hint ? { text: piece, hint, word_id: p.word_id || null } : { text: piece })
    at = p.end
  }
  if (at < text.length) out.push({ text: text.slice(at) })
  return out
}

// form (lower case) -> lemma, for the Glossary's search: "gardez" finds garder's words.
export function formLemmas(conjugations) {
  const out = new Map()
  for (const c of conjugations ?? []) for (const f of [c.lemma, ...(c.present ?? []).flatMap((p) => String(p.form).split(/\s+or\s+|\s*[,/]\s*/))]) {
    const k = f.trim().toLowerCase(); if (k && !out.has(k)) out.set(k, c.lemma)
  }
  return out
}

// The present table to show for a verb word in the Glossary (Dan, 2026-11-15): only when the word is the infinitive or
// one of the table's own forms. A fixed polite form such as Spanish quisiera or German hätte, möchten or war belongs to
// a lemma whose present table never shows it, so it keeps its note (the hint) and gets no table. A separable verb's
// cell ("stehe auf") or a cell given two ways ("assois or assieds") matches on any of its words.
export function tableFor(word, conjugations) {
  if (word.part_of_speech !== 'Verb' || !word.lemma) return null
  const table = conjugations.find((t) => t.lemma === word.lemma)
  if (!table?.present) return null
  const form = String(word.form).toLowerCase()
  if (form === String(word.lemma).toLowerCase()) return table
  const forms = new Set(table.present.flatMap((r) => String(r.form).toLowerCase().split(/\s+or\s+|\s*[,/]\s*|\s+|[’']/)))
  return forms.has(form) ? table : null
}
