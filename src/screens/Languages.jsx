import { useState } from 'react'
import { COURSES, chooseCourse, course } from '../lib/course.js'

// The course flags (Dan, 2026-11-10): on the opening screen at first launch, in the header's language pop-up and in
// Settings. A course that isn't ready shows faintly and can't be picked; tapping it says "Coming Soon".
// Picking another course reloads straight into it; its progress is its own.
// Order and rows (Dan, 2026-11-14): alphabetical by English name, Coming Soon ones in place; all six in one row from
// 1024px (desktop, iPad landscape), two rows of three on phones, never one flag alone. Columns shrink, never overflow.
const BY_NAME = [...COURSES].sort((a, b) => a.name.localeCompare(b.name, 'en'))
export function FlagRow({ size = 'md', onPick }) {
  const [soon, setSoon] = useState(null)
  const px = size === 'lg' ? 'max-w-20' : 'max-w-14'
  const gap = size === 'lg' ? 'gap-x-0.5 gap-y-2' : 'gap-x-4 gap-y-3 lg:gap-x-1' // the opening screen's flags sit close together (Dan's design lab, 2026-11-10)
  return (
    <div className="flex flex-col items-center gap-2">
      <ul className={`grid grid-cols-3 lg:grid-cols-6 items-start justify-center ${gap}`}>
        {BY_NAME.map((c) => {
          const current = c.id === course.id
          return (
            <li key={c.id} className="flex min-w-0 justify-center">
              <button aria-pressed={c.ready ? current : undefined} aria-disabled={!c.ready || undefined}
                aria-label={c.ready ? c.name : `${c.name}, coming soon`}
                onClick={() => { if (!c.ready) { setSoon(c.name); return } setSoon(null); if (onPick) onPick(c.id); else chooseCourse(c.id) }}
                className={`flex w-full flex-col items-center gap-1 rounded-2xl p-1.5 ${c.ready ? '' : 'opacity-35'} ${current && size !== 'lg' ? 'outline-4 outline-offset-2 outline-orange' : ''}`}>
                <img src={c.flag} alt="" className={`aspect-square w-full ${px} object-contain`} />
                <span className={`whitespace-nowrap text-sm ${current ? 'font-semibold' : 'text-muted'}`}>{c.name}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <p role="status" className="min-h-5 text-sm text-muted">{soon ? `${soon}: Coming Soon` : ''}</p>
    </div>
  )
}
