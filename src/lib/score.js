// Per-skill score on Duolingo's 0 to 160 scale, and its CEFR band (feature list: Progress).
// Score moves only for new learning: a round finished for the first time, and a review item cleared. The exact rate
// is open in the spec; this is the rule used here (logged in build-log.md):
// - Each A1 round finished for the first time adds to each skill by that skill's share of the round's answers
//   (what was actually asked, after swaps; R12). Finishing every A1 round of every A1 unit brings a skill to 29.
// - Each review item cleared (three correct days) adds 0.1 to its skill.
// - A skill reaches 30 (A2) only when every A1 unit is through round 5 and every A1 "I can" for it is checked;
//   until then it stops at 29.9.
import { effectiveMix } from './lesson.js'

export const SKILLS = ['reading', 'listening', 'writing', 'speaking']
const A1_TOP = 29
const A1_CAP = 29.9

export function band(score) {
  if (score < 10) return 'very early A1'
  if (score < 20) return 'early A1'
  if (score < 30) return 'high A1'
  if (score < 60) return 'A2'
  return 'beyond A2'
}

// The share of each skill in a round's mix as written (the expectation a finished round is measured against).
export function expectedShares(c, round) {
  const counts = Object.fromEntries(SKILLS.map((s) => [s, 0]))
  for (const m of effectiveMix(c, round)) counts[c.typeById.get(m.type)?.skill] += m.n
  return normalise(counts)
}
const normalise = (counts) => {
  const total = SKILLS.reduce((n, s) => n + (counts[s] ?? 0), 0)
  return Object.fromEntries(SKILLS.map((s) => [s, total ? (counts[s] ?? 0) / total : 0]))
}

// units: A1 units, each { unit_id, content, reached } (reached = rounds finished, 0 to 5).
// tally: answers by unit, round and skill, from lessons. clears: review items cleared, by skill.
// canDo: A1 statements { skill, checked }.
export function skillScores({ units, tally = {}, clears = {}, canDo = [] }) {
  const expected = Object.fromEntries(SKILLS.map((s) => [s, 0]))
  const earned = Object.fromEntries(SKILLS.map((s) => [s, 0]))
  for (const u of units) {
    for (let r = 1; r <= 5; r++) {
      const exp = expectedShares(u.content, r)
      for (const s of SKILLS) expected[s] += exp[s]
      if (r > u.reached) continue
      const actual = tally[u.unit_id]?.[r] ? normalise(tally[u.unit_id][r]) : exp
      for (const s of SKILLS) earned[s] += actual[s]
    }
  }
  const allThrough = units.length > 0 && units.every((u) => u.reached >= 5)
  return Object.fromEntries(SKILLS.map((s) => {
    const fromRounds = expected[s] ? (A1_TOP * earned[s]) / expected[s] : 0
    const raw = fromRounds + 0.1 * (clears[s] ?? 0)
    const statements = canDo.filter((x) => x.skill === s)
    const complete = allThrough && statements.length > 0 && statements.every((x) => x.checked)
    const score = complete ? Math.max(30, raw) : Math.min(A1_CAP, raw)
    return [s, { score: Math.round(score * 10) / 10, band: band(score), complete }]
  }))
}
