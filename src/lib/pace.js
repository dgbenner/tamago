// Pace on Progress (Dan, 2026-11-15; time-based since the same day): the learner's hours per week since they started
// the course, against a typical weekly pace. Encouraging, never guilt. Every number lives here; change them here.
export const A1_HOURS = { low: 60, high: 100 } // guided hours most learners take to reach A1
export const TYPICAL_WEEKLY_HOURS = 5 // a typical pace: reaches the A1 range in about 3 to 5 months
export const PACE_BANDS = { ahead: 1.25, room: 0.75 } // well above (×1.25 or more), near, below (under ×0.75)
const WEEK = 7 * 24 * 3_600_000
const MONTH_WEEKS = 52 / 12
export const ESTIMATE_FROM_HOURS = 1 // the estimate waits for this much time, so a first few minutes don't give a silly number
export const ESTIMATE_MAX_MONTHS = 24 // longer estimates aren't shown: encouraging, never daunting

// activeMs: active learning time in the course; startedAt: when the learner started it (ISO date or ms). The weeks
// since then count as at least one, so the first days don't swing wildly. Nothing before any time is counted.
export function paceOf(activeMs, startedAt, now = Date.now(), { weekly = TYPICAL_WEEKLY_HOURS, range = A1_HOURS } = {}) {
  const start = startedAt ? new Date(startedAt).getTime() : NaN
  if (!(activeMs > 0) || !Number.isFinite(start)) return null
  const hours = activeMs / 3_600_000
  const weeks = Math.max(1, (now - start) / WEEK)
  const perWeek = hours / weeks
  const ratio = perWeek / weekly
  const status = ratio >= PACE_BANDS.ahead ? 'ahead' : ratio >= PACE_BANDS.room ? 'on' : 'room'
  // At this pace, A1 (the middle of the range) in about N months.
  const left = Math.max(0, (range.low + range.high) / 2 - hours)
  const months = perWeek > 0 ? left / perWeek / MONTH_WEEKS : null
  return { status, label: PACE_LABELS[status], line: PACE_LINES[status], hours, perWeek, ratio, months, estimate: hours < ESTIMATE_FROM_HOURS ? null : estimateLine(months, left), weekLine: weekLine(perWeek),
    bar: Math.min(1, hours / range.high), band: [range.low / range.high, 1] }
}
export const PACE_LABELS = { ahead: 'Ahead of pace', on: 'On pace', room: 'Room to add time' }
const PACE_LINES = {
  ahead: 'More time each week than most learners.',
  on: 'Right in step with most learners.',
  room: 'Every lesson adds to it, whenever suits you.',
}
function estimateLine(months, left) {
  if (left <= 0) return 'The typical hours for A1 are in'
  if (months == null || months > ESTIMATE_MAX_MONTHS) return null
  if (months < 1) return 'At this pace, A1 in under a month'
  const n = Math.round(months)
  return `At this pace, A1 in about ${n} ${n === 1 ? 'month' : 'months'}`
}
// "2.5 hours a week so far", or minutes under an hour.
function weekLine(perWeek) {
  if (perWeek < 1) { const m = Math.max(1, Math.round(perWeek * 60)); return `${m} ${m === 1 ? 'minute' : 'minutes'} a week so far` }
  const v = Math.round(perWeek * 10) / 10
  return `${v} ${v === 1 ? 'hour' : 'hours'} a week so far`
}
