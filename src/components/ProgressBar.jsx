// The lesson's progress bar: a green fill on a pale track, from 0 to 1. Lifted from Lesson.jsx unchanged
// (design-system branch).
export default function ProgressBar({ value, label = 'Lesson progress' }) {
  return (
    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-line" role="progressbar" aria-label={label} aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
      {/* Slides from the old value to the new one as the next question loads (Dan, 2026-11-12). */}
      <div className="h-full rounded-full bg-green transition-[width] duration-500 ease-in-out motion-reduce:transition-none" style={{ width: `${value * 100}%` }} />
    </div>
  )
}
