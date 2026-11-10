// Splitting French into the course's words. Multi-word forms (au revoir, s'il vous plaît) and elided forms
// (l', j') count as their word, matched longest first.
export const norm = (s) => String(s).replace(/[’ʼ]/g, "'").replace(/[  ]/g, ' ').replace(/\s+/g, ' ').trim()
export const loose = (s) => norm(s).toLowerCase().replace(/[.!?¿¡…,;:"«»„“”‚‘\s]+/g, ' ').trim() // ¿ ¡ for Spanish, „ “ for German

export function tokenize(text) {
  const out = []
  const re = /[A-Za-zÀ-ÖØ-öø-ÿŒœ]+(?:-[A-Za-zÀ-ÖØ-öø-ÿŒœ]+)*'?/g
  let m
  while ((m = re.exec(norm(text)))) out.push({ text: m[0], at: m.index })
  return out
}

export const formIndexFor = (words) => words
  .map((w) => ({ word_id: w.word_id, parts: tokenize(w.form).map((t) => t.text.toLowerCase()) }))
  .sort((a, b) => b.parts.length - a.parts.length)

// Returns { parts: [{ surface, word_id, name, at, end }], count } or { unknown } naming the first word not in the index.
// partial (conversations, 2026-11-10): carry on past an unknown word, marking it unknown, instead of stopping.
export function analyse(text, formIndex, { names = new Set(), partial = false } = {}) {
  const toks = tokenize(text)
  const lower = toks.map((t) => t.text.toLowerCase())
  const parts = []
  for (let i = 0; i < toks.length;) {
    const hit = formIndex.find((f) => f.parts.every((p, k) => lower[i + k] === p))
    if (hit) {
      const last = toks[i + hit.parts.length - 1]
      parts.push({ surface: norm(text).slice(toks[i].at, last.at + last.text.length), word_id: hit.word_id, at: toks[i].at, end: last.at + last.text.length })
      i += hit.parts.length
      continue
    }
    if (names.has(lower[i])) { parts.push({ surface: toks[i].text, word_id: '', name: true, at: toks[i].at, end: toks[i].at + toks[i].text.length }); i++; continue }
    if (partial) { parts.push({ surface: toks[i].text, word_id: '', unknown: true, at: toks[i].at, end: toks[i].at + toks[i].text.length }); i++; continue }
    return { unknown: toks[i].text }
  }
  return { parts, count: toks.length }
}
