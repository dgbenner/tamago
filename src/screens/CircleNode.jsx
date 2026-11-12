import { useRef } from 'react'
import { IconBookmark, IconLock } from './icons.jsx'

// The new tree circle (Dan, 2026-11-10; in the lab at /lab.html, not on the live tree yet). The learner sees a circle
// and its lessons, named by its title: no unit numbers, no rounds, no segments. The five rounds still run underneath;
// the ring simply fills across all of a circle's lessons, whatever their number. One accent colour (--ring) for the
// fill and the first-use marker.
// Every circle has a warm off-white disc inside the ring (--disc, the same in light and dark), so the soft white edges
// of the sushi art never show on dark; a locked circle keeps the disc faint, with the lock on it. The sushi images are
// trimmed and scaled to the same visible area (scripts/make-icons.mjs), so every piece looks the same size; they show at
// 78% of the circle (10% larger than the first 71%, Dan, 2026-11-11), with a 2x file for sharp screens.
//   locked       gray, with a lock
//   in progress  the ring fills, lessonsDone of lessonsTotal
//   finished     a full ring; as recall drops the ring fades (faint below about 80%)
const R = 45
const LEN = 2 * Math.PI * R

// How strong a finished ring looks for a recall from 0 to 1: full at 90% and above, faint (0.25) at 50% and below.
export const ringOpacity = (recall) => (recall == null ? 1 : Math.min(1, Math.max(0.25, 0.25 + ((recall - 0.5) / 0.4) * 0.75)))

// The first-use marker, on the very first circle only: "Start Here" before any lesson, then never again (Dan,
// 2026-11-11: "Your Progress" after the first lesson is gone).
export const MARKERS = { start: 'Start Here' }
export const firstCircleMarker = (lessonsDone) => (lessonsDone === 0 ? 'start' : null)

export function circleState({ locked, lessonsDone, lessonsTotal }) {
  if (locked) return 'locked'
  return lessonsDone >= lessonsTotal ? 'finished' : 'in progress'
}

// A short description for screen readers and for the line under a live circle.
export function circleLine({ locked, lessonsDone, lessonsTotal, recall }) {
  if (locked) return 'Locked'
  if (lessonsDone >= lessonsTotal) return recall == null ? 'Finished' : `Finished · Recall ${Math.round(recall * 100)}%`
  const parts = [lessonsDone === 0 ? 'Not started' : `Lesson ${lessonsDone + 1} of ${lessonsTotal}`]
  if (lessonsDone > 0 && recall != null) parts.push(`Recall ${Math.round(recall * 100)}%`)
  return parts.join(' · ')
}

// onTestPass (Testing Shortcuts only, 2026-11-10): a right-to-left swipe on the circle, or the right arrow while it
// has focus, passes its next lesson without playing it.
// onNote (Dan, 2026-11-12): the grammar note opens from a small gray bookmark at the circle's lower right, about 25 px
// out from the circle (batch 3), its bottom on the circle's bottom edge; only on an open circle that has a note. Tapping the circle itself goes straight to a lesson.
// The wrapper is a size container so the icon can follow the disc (min(100%, 6rem) wide, under the 1.625rem marker).
export default function CircleNode({ onNote = null, ...props }) {
  const button = <CircleButton {...props} />
  if (!onNote || props.locked) return button
  return (
    <div className="relative flex w-32 min-w-0 shrink justify-center [container-type:inline-size]">
      {button}
      <button onClick={onNote} aria-label={`Grammar Note: ${props.title}`} data-note-icon
        className="absolute flex size-7 items-center justify-center rounded-full text-muted [&_svg]:size-5"
        style={{ left: 'calc(50% + min(100cqw, 6rem) / 2 - 1rem + 25px)', top: 'calc(1.625rem + min(100cqw, 6rem) - 1.75rem)' }}>
        <IconBookmark />
      </button>
    </div>
  )
}

function CircleButton({ title, icon, locked = false, lessonsDone = 0, lessonsTotal = 1, recall = null, marker = null, onPick, onTestPass = null, caption = null, showCaption = true, ring = true }) {
  // caption (Catch-Up, A1 Complete 9): a quiet line under the title, also read out in place of the lesson count; ring
  // false: no lesson ring, since a Catch-Up circle has no lessons of its own.
  const start = useRef(null)
  const swiped = useRef(false)
  const test = onTestPass ? {
    onKeyDown: (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); onTestPass() } },
    onPointerDown: (e) => { start.current = { x: e.clientX, y: e.clientY }; swiped.current = false },
    onPointerUp: (e) => {
      const d = start.current; start.current = null
      if (d && d.x - e.clientX > 40 && Math.abs(e.clientY - d.y) < 40) { swiped.current = true; onTestPass() }
    },
    style: { touchAction: 'pan-y' },
  } : {}
  const state = circleState({ locked, lessonsDone, lessonsTotal })
  const share = state === 'locked' ? 0 : Math.min(1, lessonsDone / lessonsTotal)
  const opacity = state === 'finished' ? ringOpacity(recall) : 1
  return (
    <button {...test} onClick={() => { if (swiped.current) { swiped.current = false; return } onPick() }} aria-label={`${marker ? `${MARKERS[marker]} ` : ''}${title}. ${caption ?? circleLine({ locked, lessonsDone, lessonsTotal, recall })}`}
      className="flex w-32 min-w-0 shrink flex-col items-center gap-1.5" data-state={state}>
      {/* The marker sits above the circle and keeps its space on every circle, so rows line up. */}
      <span className={`flex h-5 items-center gap-1 text-xs font-semibold text-ring ${marker ? '' : 'invisible'}`} aria-hidden="true">
        <span className="size-2 rounded-full bg-ring" />{MARKERS[marker] ?? MARKERS.start}
      </span>{' '}{/* keeps "Start Here" and the title apart as words for label-in-name checks */}
      <span className="relative flex aspect-square w-full max-w-24 items-center justify-center rounded-full">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r="40" fill="var(--disc)" fillOpacity={state === 'locked' ? 0.3 : 1} />
          <circle cx="50" cy="50" r={R} fill="none" strokeWidth="6" stroke="var(--line)" />
          {ring && share > 0 && (
            <circle cx="50" cy="50" r={R} fill="none" strokeWidth="6" strokeLinecap="round" stroke="var(--ring)" strokeOpacity={opacity}
              strokeDasharray={`${share * LEN} ${LEN}`} />
          )}
        </svg>
        {state === 'locked'
          ? <span className="relative text-muted [&_svg]:size-8"><IconLock /></span>
          : icon ? <img src={icon} srcSet={`${icon} 1x, ${icon.replace(/\.webp$/, '@2x.webp')} 2x`} alt="" className="relative aspect-square w-[78%] object-contain" /> : null}
      </span>
      <span className={`max-w-full text-base leading-tight font-semibold break-words ${state === 'locked' ? 'text-muted' : ''}`}>{title}</span>
      {caption && showCaption && <>{' '}<span className="-mt-1 text-sm text-muted">{caption}</span></>}
    </button>
  )
}
