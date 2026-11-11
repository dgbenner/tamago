// Rule-based answer checking (question-types.md section 7, plus the rulings in CLAUDE.md).
const CONTRACTIONS = [[/\bi'm\b/g, 'i am'], [/\byou're\b/g, 'you are'], [/\bhe's\b/g, 'he is'], [/\bshe's\b/g, 'she is'], [/\bit's\b/g, 'it is']]

// Lower case, straight apostrophes, single spaces, and no punctuation or symbols anywhere in the text: commas, periods,
// question and exclamation marks, quotes, dashes, brackets and the rest, wherever they sit (Dan, 2026-11-11). Only an
// apostrophe or a hyphen inside a word stays (c'est, est-ce); checkTyped lets those go too.
function clean(text) {
  return String(text).normalize('NFC').toLowerCase().replace(/[’ʼ‘`´]/g, "'").replace(/[‐‑]/g, '-')
    .replace(/[^\p{L}\p{M}\p{N}\s'-]/gu, ' ').replace(/'\s+/g, "'")
    .split(/\s+/).map((word) => word.replace(/^['-]+|['-]+$/g, '')).filter(Boolean).join(' ')
}
export function normalize(text, lang) {
  let t = clean(text)
  if (lang === 'en') for (const [re, to] of CONTRACTIONS) t = t.replace(re, to)
  return t
}
// The readings of a text that count as the same answer: as written, with apostrophes and hyphens as spaces (c est),
// and with them gone (cest, im). The first is the main one.
function readings(text, lang) {
  const c = clean(text)
  const main = normalize(text, lang)
  const spaced = c.replace(/['-]/g, ' ').replace(/\s+/g, ' ').trim()
  return { main, spaced, all: [...new Set([main, spaced, c.replace(/['-]/g, '')])] }
}

const fold = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').replace(/œ/g, 'oe').replace(/æ/g, 'ae').replace(/ß/g, 'ss') // ss for ß counts like a missed accent

// Edit distance, with a swap of two neighbouring letters counting as one.
export function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1)
    }
  }
  return d[a.length][b.length]
}

// One-letter slip against this answer? Typing another real word ("un" for "une") is a wrong word, not a typo.
function isTypo(input, answer, vocabulary) {
  const I = input.split(' ')
  const A = answer.split(' ')
  if (I.length !== A.length) return Math.abs(I.length - A.length) === 1 && distance(input, answer) === 1
  const diffs = A.map((w, i) => [w, I[i]]).filter(([w, t]) => w !== t)
  if (diffs.length !== 1) return false
  const [word, typed] = diffs[0]
  return word.length >= 3 && distance(word, typed) === 1 && !vocabulary.has(typed)
}

// accepted[0] is the main answer. Returns { correct, typo, accent, matched }; matched is the accepted text to show.
export function checkTyped(input, accepted, { strict = false, lang = 'fr', vocabulary = new Set() } = {}) {
  const typed = readings(input, lang)
  const miss = { correct: false, typo: false, accent: false, matched: accepted[0] }
  if (!typed.main) return miss
  const answers = accepted.map((a) => ({ text: a, ...readings(a, lang) }))
  const same = (as) => answers.find((a) => a.all.some((r) => typed.all.some((t) => as(r) === as(t))))
  const exact = same((x) => x)
  if (exact) return { correct: true, typo: false, accent: false, matched: exact.text }
  if (strict) return miss
  const accent = same(fold)
  if (accent) return { correct: true, typo: false, accent: true, matched: accent.text }
  const foldedVocabulary = new Set([...vocabulary].flatMap((w) => [w, ...String(w).split(/['-]/)]).map(fold))
  const slip = answers.find((a) => isTypo(fold(typed.main), fold(a.main), foldedVocabulary) || isTypo(fold(typed.spaced), fold(a.spaced), foldedVocabulary))
  if (slip) return { correct: true, typo: true, accent: false, matched: slip.text }
  return miss
}

// Which letters of the shown answer the learner's answer got wrong (a typo or a dropped accent), so the answer bar
// can mark them. Letters are compared exactly, so "e" never matches "é". Only letters and digits are ever marked:
// punctuation and spaces are not part of the answer. Returns runs of { text, mark }.
export function diffMarks(shown, given) {
  const a = [...String(shown)]
  const b = [...String(given).toLowerCase()]
  const same = (x, y) => x.toLowerCase() === y
  const L = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) L[i][j] = same(a[i], b[j]) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1])
  const runs = []
  const push = (ch, mark) => { const last = runs[runs.length - 1]; if (last && last.mark === mark) last.text += ch; else runs.push({ text: ch, mark }) }
  let i = 0
  let j = 0
  while (i < a.length) {
    if (j < b.length && same(a[i], b[j])) { push(a[i], false); i++; j++ }
    else if (j < b.length && L[i + 1][j] < L[i][j + 1]) j++
    else { push(a[i], /[\p{L}\p{N}]/u.test(a[i])); i++ }
  }
  return runs
}

// A near miss (craft review 2026-11-10): a wrong answer one word away from an accepted one (a word wrong, missing or
// extra, in an answer of two words or more), or two letters away from it. Only near misses may hear "Close." or
// "Almost."; an answer nowhere near gets a plain line.
const editDistance = (a, b) => {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j)
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    prev = cur
  }
  return prev[b.length]
}
export function nearMiss(given, accepted, lang = 'fr') {
  const g = fold(normalize(given ?? '', lang))
  if (!g) return false
  return accepted.some((a) => {
    const t = fold(normalize(a, lang))
    const gw = g.split(' '), tw = t.split(' ')
    if (tw.length >= 2 && editDistance(gw, tw) <= 1) return true
    return t.length >= 4 && editDistance([...g], [...t]) <= 2
  })
}
