// Rule-based answer checking (question-types.md section 7, plus the rulings in CLAUDE.md).
// English contractions count as their long forms (2026-11-13: more of them, so "You're" and "You are" are one answer, in
// checking and in keeping two choices from reading alike).
const CONTRACTIONS = [
  [/\bi'm\b/g, 'i am'], [/\byou're\b/g, 'you are'], [/\bwe're\b/g, 'we are'], [/\bthey're\b/g, 'they are'],
  [/\bhe's\b/g, 'he is'], [/\bshe's\b/g, 'she is'], [/\bit's\b/g, 'it is'], [/\bthat's\b/g, 'that is'], [/\bwhat's\b/g, 'what is'],
  [/\bthere's\b/g, 'there is'], [/\bwhere's\b/g, 'where is'], [/\bwho's\b/g, 'who is'], [/\bhow's\b/g, 'how is'],
  [/\bi've\b/g, 'i have'], [/\byou've\b/g, 'you have'], [/\bwe've\b/g, 'we have'], [/\bthey've\b/g, 'they have'],
  [/\b(i|you|he|she|it|we|they) ?'ll\b/g, '$1 will'], [/\bcan't\b/g, 'can not'], [/\bcannot\b/g, 'can not'], [/\bwon't\b/g, 'will not'],
  [/\b(is|are|was|were|do|does|did|has|have|had|could|should|would|must|need)n't\b/g, '$1 not'],
]

// Lower case, straight apostrophes, single spaces, and no punctuation or symbols anywhere in the text: commas, periods,
// question and exclamation marks, quotes, dashes, brackets and the rest, wherever they sit (Dan, 2026-11-11). Only an
// apostrophe or a hyphen inside a word stays (c'est, est-ce); checkTyped lets those go too.
function clean(text) {
  return String(text).normalize('NFC').toLowerCase().replace(/[’ʼ‘`´]/g, "'").replace(/[‐‑]/g, '-')
    .replace(/[^\p{L}\p{M}\p{N}\s'-]/gu, ' ').replace(/'\s+/g, "'")
    .split(/\s+/).map((word) => word.replace(/^['-]+|['-]+$/g, '')).filter(Boolean).join(' ')
}
// Two texts that count as the same answer (any reading in common): "You're sick." and "You are sick!" do.
export function sameAnswer(a, b, lang) {
  const ra = readings(a, lang).all
  return readings(b, lang).all.some((r) => ra.includes(r))
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
// The key lenient checking reads a word by: no accents, no case, no punctuation. Two choices with one key can't both be
// offered (ou/où, a/à, la/là, Portuguese tem/têm): lenient checking would take either for the other (Dan, 2026-11-14).
export const accentKey = (text, lang) => fold(normalize(text, lang)).toLowerCase()

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

// Slips against this answer (Dan, 2026-11-16: up to two typos per answer, was one): two words a letter out each, or one
// word two letters out. A word under 3 letters gets no allowance, a word under 6 at most one slip, and typing another
// real word ("un" for "une") is a wrong word, not a typo.
const TYPOS = 2
const slipsAllowed = (word) => (word.length >= 6 ? 2 : word.length >= 3 ? 1 : 0)
function isTypo(input, answer, vocabulary) {
  const I = input.split(' ')
  const A = answer.split(' ')
  // A missing or extra space: never when a typed word that isn't in the answer is another course word.
  if (I.length !== A.length) return Math.abs(I.length - A.length) === 1 && distance(input, answer) <= TYPOS && !I.some((w) => !A.includes(w) && vocabulary.has(w))
  const diffs = A.map((w, i) => [w, I[i]]).filter(([w, t]) => w !== t)
  if (!diffs.length || diffs.length > TYPOS) return false
  let total = 0
  for (const [word, typed] of diffs) {
    const d = distance(word, typed)
    if (d > slipsAllowed(word) || vocabulary.has(typed)) return false
    total += d
  }
  return total <= TYPOS
}

// Capitals (Dan, 2026-11-14): the words whose capital the learner left out, from the accepted text, with the letters
// that should be capitals. The very first letter of a sentence never counts (nobody is marked down for "je suis"); a
// single word typed on its own (Type the Word: German Hund) does. Only when both have the same words.
const casedWords = (t) => String(t).normalize('NFC').replace(/[’ʼ‘`´]/g, "'").replace(/[^\p{L}\p{M}\p{N}\s'-]/gu, ' ').split(/\s+/).map((w) => w.replace(/^['-]+|['-]+$/g, '')).filter(Boolean)
export function capitalMisses(given, matched, { word = false } = {}) {
  const a = casedWords(matched), b = casedWords(given)
  if (a.length !== b.length) return []
  const out = []
  a.forEach((w, i) => {
    const g = b[i]
    if ([...w].length !== [...g].length || fold(w.toLowerCase()) !== fold(g.toLowerCase())) return
    const W = [...w], G = [...g]
    const at = W.map((ch, k) => (ch !== ch.toLowerCase() && G[k] === G[k].toLowerCase() && !(i === 0 && k === 0 && !word) ? k : -1)).filter((k) => k >= 0)
    if (at.length) out.push({ word: w, at })
  })
  return out
}
// Accents (same day): the words of the accepted text whose accents the learner left out, with the letters to mark.
export function accentMisses(given, matched) {
  let a = casedWords(matched), b = casedWords(given)
  // A hyphen or apostrophe left out (est il for est-il) still lines the words up (2026-11-16).
  if (a.length !== b.length) { const parts = (ws) => ws.flatMap((w) => w.split(/[-'’]/)).filter(Boolean); a = parts(a); b = parts(b) }
  if (a.length !== b.length) return []
  return a.flatMap((w, i) => {
    const g = b[i]
    if (w.toLowerCase() === g.toLowerCase() || fold(w.toLowerCase()) !== fold(g.toLowerCase())) return []
    const runs = diffMarks(w, g)
    return runs.some((r) => r.mark) ? [{ word: w, runs }] : []
  })
}

// Does the learner's answer, which matches this accepted one but for accents, put an accent-twin in place of a word:
// a word typed differently from the answer's, the same once accents are folded, that the course teaches on its own?
function realWordByAccent(typed, answer, vocabulary) {
  for (const t of typed.all) for (const r of answer.all) {
    if (fold(t) !== fold(r)) continue
    const T = t.split(' '), R = r.split(' ')
    if (T.length === R.length && T.some((w, i) => w !== R[i] && vocabulary.has(w))) return true
  }
  return false
}

// accepted[0] is the main answer. Returns { correct, typo, accent, capitals, matched }; matched is the accepted text to
// show. cased: false for answers built from word chips (shown in lower case), which can't miss a capital; word: true
// for a single word typed on its own. Lenient (the default): a missing capital or accent is right, with a note; strict:
// either is wrong.
export function checkTyped(input, accepted, { strict = false, lang = 'fr', vocabulary = new Set(), cased = true, word = false } = {}) {
  const typed = readings(input, lang)
  const miss = { correct: false, typo: false, accent: false, capitals: [], matched: accepted[0] }
  if (!typed.main) return miss
  const answers = accepted.map((a) => ({ text: a, ...readings(a, lang) }))
  const same = (as) => answers.find((a) => a.all.some((r) => typed.all.some((t) => as(r) === as(t))))
  const caps = (m) => (cased ? capitalMisses(input, m, { word }) : [])
  const exact = same((x) => x)
  if (exact) {
    const capitals = caps(exact.text)
    if (strict && capitals.length) return { ...miss, capitals }
    return { correct: true, typo: false, accent: false, capitals, matched: exact.text }
  }
  if (strict) return miss
  const accent = same(fold)
  if (accent) {
    // Accent guard (Dan, 2026-11-16): a missing or wrong accent is right in lenient mode, except when the word typed is
    // itself another word the course teaches (a for à, ou for où, la for là, da for dà, e for é, tem for têm). Then it is
    // wrong, and the answer bar shows the right answer with its accent note (accent stays true).
    if (realWordByAccent(typed, accent, vocabulary)) return { ...miss, accent: true, matched: accent.text }
    return { correct: true, typo: false, accent: true, capitals: caps(accent.text), matched: accent.text }
  }
  const foldedVocabulary = new Set([...vocabulary].flatMap((w) => [w, ...String(w).split(/['-]/)]).map(fold))
  const slip = answers.find((a) => isTypo(fold(typed.main), fold(a.main), foldedVocabulary) || isTypo(fold(typed.spaced), fold(a.spaced), foldedVocabulary))
  if (slip) return { correct: true, typo: true, accent: false, capitals: [], matched: slip.text }
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
