// Skill strength on the FSRS schedule: one card per item (a sentence, or a word in match pairs and word to image).
// A unit's strength is how likely its items are to be recalled now, shown as 0 to 4 bars that fall without practice.
import { createEmptyCard, fsrs, Rating } from 'ts-fsrs'

const scheduler = fsrs()
const revive = (c) => c && { ...c, due: new Date(c.due), last_review: c.last_review ? new Date(c.last_review) : undefined }

// A first attempt rates the item: right is Good, right with a typo Hard, wrong Again.
export function rate(cards, itemId, { correct, typo = false }, now = new Date()) {
  const card = revive(cards[itemId]) ?? createEmptyCard(now)
  const rating = correct ? (typo ? Rating.Hard : Rating.Good) : Rating.Again
  return { ...cards, [itemId]: scheduler.next(card, now, rating).card }
}

export const retrievability = (card, now = new Date()) => (card ? Number(scheduler.retrievability(revive(card), now, false)) : null)

export function strength(itemIds, cards, now = new Date()) {
  const rs = itemIds.map((id) => retrievability(cards[id], now)).filter((r) => r !== null)
  if (!rs.length) return { bars: 0, recall: null, items: 0 }
  const recall = rs.reduce((a, b) => a + b, 0) / rs.length
  const bars = recall >= 0.9 ? 4 : recall >= 0.8 ? 3 : recall >= 0.7 ? 2 : 1
  return { bars, recall, items: rs.length }
}

// The items most at risk of being forgotten, weakest first.
export function weakest(itemIds, cards, n, now = new Date()) {
  return itemIds.filter((id) => cards[id]).map((id) => ({ id, r: retrievability(cards[id], now) }))
    .sort((a, b) => a.r - b.r).slice(0, n).map((x) => x.id)
}
