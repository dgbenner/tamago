import { useState } from 'react'
import { COURSES, chooseCourse, course } from '../lib/course.js'

// The course flags (Dan, 2026-11-10): on the opening screen at first launch, in the header's language pop-up and in
// Settings. A course that isn't ready shows faintly and can't be picked; tapping it says "Coming Soon".
// Picking another course reloads straight into it; its progress is its own.
// Order and rows (Dan, 2026-11-14; 15 flags since 2026-11-16): alphabetical by English name, Coming Soon ones in place;
// rows of four on phones (4, 4, 4, 3: five rows of three ran off a phone's opening screen) and three rows of five from
// 1024px (desktop, iPad landscape), so no flag is ever alone on a row. Columns shrink, never overflow. Coming Soon flags are faint and grey, so the live courses stand out in color.
const BY_NAME = [...COURSES].sort((a, b) => a.name.localeCompare(b.name, 'en'))
export function FlagRow({ size = 'md', onPick }) {
  const [soon, setSoon] = useState(null)
  const px = size === 'lg' ? 'max-w-16 [@media(max-height:760px)]:max-w-12 lg:max-w-20' : 'max-w-14' // short phones (iPhone SE): smaller, so all four rows fit
  const gap = size === 'lg' ? 'gap-x-0.5 gap-y-1 lg:gap-y-2' : 'gap-x-2 gap-y-3 lg:gap-x-1' // the opening screen's flags sit close together (Dan's design lab, 2026-11-10)
  return (
    <div data-ds="flag-row" className="flex flex-col items-center gap-2">
      {/* Opening screen on wide screens (Dan, 2026-11-19): two rows, 8 then 7. The smaller picker (header, Settings)
          keeps rows of five there; phones keep rows of four. */}
      <ul className={`grid grid-cols-4 ${size === 'lg' ? 'lg:grid-cols-8' : 'lg:grid-cols-5'} items-start justify-center ${gap}`}>
        {BY_NAME.map((c, n) => {
          const current = c.id === course.id
          return (
            <li key={c.id} className="flex min-w-0 justify-center" style={{ '--i': n }}>
              <button data-ready={c.ready || undefined} aria-pressed={c.ready ? current : undefined} aria-disabled={!c.ready || undefined}
                aria-label={c.ready ? c.name : `${c.name}, coming soon`}
                onClick={() => { if (!c.ready) { setSoon(c.name); return } setSoon(null); if (onPick) onPick(c.id); else chooseCourse(c.id) }}
                className={`flag-pick flex w-full flex-col items-center gap-1 rounded-2xl p-1.5 ${c.ready ? '' : 'opacity-35 grayscale'} ${current && size !== 'lg' ? 'outline-4 outline-offset-2 outline-orange' : ''}`}>
                <img src={c.flag} alt="" className={`aspect-square w-full ${px} object-contain`} />
                <span className={`whitespace-nowrap text-xs sm:text-sm ${current ? 'font-semibold' : 'text-muted'}`}>{c.name}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <p role="status" className="min-h-5 text-sm text-muted">{soon ? `${soon}: Coming Soon` : ''}</p>
    </div>
  )
}
