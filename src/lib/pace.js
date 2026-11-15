// Pace on Progress (Dan, 2026-11-15): the learner's time against the typical time for A1, encouraging, never guilt.
// The A1 range lives here and only here; change it in this one place.
export const A1_HOURS = { low: 60, high: 100 } // guided hours most learners take to reach A1

// share: how much of the course is done, 0 to 1 (lessons done of all planned, every circle and round).
// The typical hours for that much of the course are share × the range. More hours than its top: "Ahead of pace"
// (more time in than most at this point); within it: "On pace"; fewer: "Room to add time". Nothing before a lesson.
export function paceOf(activeMs, share, range = A1_HOURS) {
  if (!(share > 0)) return null
  const hours = activeMs / 3_600_000
  const low = share * range.low, high = share * range.high
  const status = hours > high ? 'ahead' : hours >= low ? 'on' : 'room'
  return { status, label: PACE_LABELS[status], line: PACE_LINES[status], hours, low, high, bar: Math.min(1, hours / range.high), band: [range.low / range.high, 1] }
}
export const PACE_LABELS = { ahead: 'Ahead of pace', on: 'On pace', room: 'Room to add time' }
const PACE_LINES = {
  ahead: 'More time in than most learners at this point.',
  on: 'Right in step with most learners at this point.',
  room: 'Every lesson adds to it, whenever suits you.',
}
