// Rule-based answer checking (question-types.md section 7, plus the rulings in CLAUDE.md).
const CONTRACTIONS = [[/\bi'm\b/g, 'i am'], [/\byou're\b/g, 'you are'], [/\bhe's\b/g, 'he is'], [/\bshe's\b/g, 'she is'], [/\bit's\b/g, 'it is']]

// Lower case, straight apostrophes, no punctuation (so a space before ? or ! never matters), single spaces.
export function normalize(text, lang) {
  let t = String(text).toLowerCase().replace(/[’ʼ]/g, "'").replace(/[  ]/g, ' ')
    .replace(/[.,!?;:…"«»()]/g, ' ').replace(/'\s+/g, "'").replace(/\s+/g, ' ').trim()
  if (lang === 'en') for (const [re, to] of CONTRACTIONS) t = t.replace(re, to)
  return t
}

const fold = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').replace(/œ/g, 'oe').replace(/æ/g, 'ae')

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
  const typed = normalize(input, lang)
  const miss = { correct: false, typo: false, accent: false, matched: accepted[0] }
  if (!typed) return miss
  const answers = accepted.map((a) => ({ text: a, norm: normalize(a, lang) }))
  const exact = answers.find((a) => a.norm === typed)
  if (exact) return { correct: true, typo: false, accent: false, matched: exact.text }
  if (strict) return miss
  const accent = answers.find((a) => fold(a.norm) === fold(typed))
  if (accent) return { correct: true, typo: false, accent: true, matched: accent.text }
  const foldedVocabulary = new Set([...vocabulary].map(fold))
  const slip = answers.find((a) => isTypo(fold(typed), fold(a.norm), foldedVocabulary))
  if (slip) return { correct: true, typo: true, accent: false, matched: slip.text }
  return miss
}

// Which letters of the shown answer the learner's answer got wrong (a typo or a dropped accent), so the answer bar
// can mark them. Letters are compared exactly, so "e" never matches "é". Returns runs of { text, mark }.
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
    else { push(a[i], a[i].trim() !== ''); i++ }
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
