// Match Pairs taps (Dan, 2026-11-14), pure so the rules are tested without a browser:
//   - tapping the selected tile again deselects it; tapping another tile in the same column moves the selection;
//   - a tile in the other column attempts the pair: right, both leave the board; wrong, both go back to how they were
//     (nothing selected; `wrong` only drives the shake, and Lesson.jsx clears it after the shake, by time as well,
//     since no animationend comes under reduced motion).
// state: { form, meaning, matched: [forms], wrong: { f, m } | null }; returns the next state and what happened.
export const startPairs = () => ({ form: null, meaning: null, matched: [], wrong: null })

export function tapPair(state, pairs, side, value) {
  const s = { ...state, wrong: null }
  const mine = side === 'form' ? 'form' : 'meaning', other = side === 'form' ? 'meaning' : 'form'
  if (s[mine] === value) return { state: { ...s, [mine]: null }, outcome: 'deselect' }
  if (!s[other]) return { state: { ...s, [mine]: value }, outcome: 'select' }
  const f = side === 'form' ? value : s.form, m = side === 'form' ? s.meaning : value
  const right = pairs.find((p) => p.form === f)?.hint === m
  const cleared = { ...s, form: null, meaning: null }
  return right
    ? { state: { ...cleared, matched: [...s.matched, f] }, outcome: 'match', form: f }
    : { state: { ...cleared, wrong: { f, m } }, outcome: 'wrong', form: f }
}
