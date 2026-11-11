// Drag and drop for word chips (Dan, 2026-11-11): a chip dragged from the bank goes into the answer at the drop
// marker; one dragged within the answer moves there; one dragged back to the bank leaves the answer. Tapping and
// typing to pick keep working. These are the pure parts, so test/chipdrag.test.js can hold them without a browser.

// How far a press must travel before it is a drag rather than a tap (CSS px).
export const DRAG_START = 6

// Where in the answer a chip dropped at (x, y) goes: the number of answer chips (the dragged one left out) that sit
// before the point. A chip is before it when its row is above the point, or it is on the point's row and its
// middle is left of the point. Rects are in reading order, as on screen.
export function dropIndex(rects, x, y) {
  let n = 0
  rects.forEach((r, i) => {
    const rowAbove = y > r.bottom
    const sameRow = y >= r.top && y <= r.bottom
    if (rowAbove || (sameRow && x > r.left + r.width / 2)) n = i + 1
  })
  return n
}

// Where the drop marker stands for an index: a bar just before the chip at that index, or just after the last chip,
// or at the start of an empty answer. Coordinates are relative to the answer box.
export function markerAt(rects, index, box, gap = 8) {
  const half = gap / 2
  if (!rects.length) return { left: 0, top: 0, height: Math.min(box.height, 52) }
  if (index < rects.length) {
    const r = rects[index]
    return { left: r.left - box.left - half, top: r.top - box.top, height: r.height }
  }
  const r = rects[rects.length - 1]
  return { left: r.right - box.left + half, top: r.top - box.top, height: r.height }
}

// The answer after a drop. `picked` holds chip numbers in answer order; `chip` is the one dragged; `to` is
// { zone: 'answer', index } (index counted with the dragged chip left out) or { zone: 'bank' }; anything else
// leaves the answer as it was.
export function applyDrop(picked, chip, to) {
  const rest = picked.filter((i) => i !== chip)
  if (to?.zone === 'bank') return rest
  if (to?.zone !== 'answer') return picked
  const at = Math.max(0, Math.min(to.index, rest.length))
  return [...rest.slice(0, at), chip, ...rest.slice(at)]
}
