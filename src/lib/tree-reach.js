// What on the tree is lit (full colour) and what a Brush-Up covers (Dan, 2026-11-18). Pure, so the rules are tested
// without the app (test/tree-reach.test.js).
//
// A Brush-Up, a checkpoint and a part review can always be opened, like every circle since the locks went
// (2026-11-15). They show faded until the learner has got there:
//   - a circle in the row just above it, or anywhere below it, has been started (green on its ring), or
//   - the learner has used it: started that Brush-Up, passed that checkpoint or review.
// A Brush-Up that is still faded can already carry its number, once something it covers has been missed.

// Has work been done at this row or below it? `started` holds the rows with a started circle.
export const reachedRow = (row, startedRows) => startedRows.some((r) => r >= row)

export const isLit = ({ row, startedRows, used = false }) => Boolean(used) || reachedRow(row, startedRows)

// The rows a Brush-Up draws on: the first one, everything above it; each later one, the rows since the Brush-Up
// before it (so a miss shows on the next Brush-Up down the tree and nowhere else). `slots` are the catch_up rows
// ({ slot_id, after_row }); returns { from, to }, both inclusive.
export function brushUpSpan(slots, slot) {
  const before = slots.map((s) => s.after_row).filter((r) => r < slot.after_row)
  return { from: before.length ? Math.max(...before) + 1 : -Infinity, to: slot.after_row }
}
export const inSpan = (row, span) => row != null && row >= span.from && row <= span.to

// The full green ring on a Brush-Up (Dan, 2026-11-18): nothing is left inside it, and either the learner has worked
// through it (started it, and every item since is answered) or every circle it covers is finished, so there was
// nothing to miss. One lesson done above an empty Brush-Up is not enough. A new miss in its stretch fills it again and
// the green goes until that is answered.
export const brushUpGreen = ({ available, waiting, engaged = false, allFinished = false }) =>
  Boolean(available) && waiting === 0 && (Boolean(engaged) || Boolean(allFinished))
