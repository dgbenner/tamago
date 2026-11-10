import { useEffect, useLayoutEffect, useRef } from 'react'
import { LETTERS, LetterStrokes, SushiMark, VIEW, viewBox } from './Logo.jsx'

// Each letter is revealed by its own mask, which follows the same strokes.
const LETTER_MS = 260
const STAGGER_MS = 90
// One ease-in-out curve per letter, shared across its strokes by length, so the pen speeds up, keeps going through
// each joint, and settles at the end (Dan's test notes: more fluid, a little faster). easeInOutSine and its inverse.
const easedTime = (progress) => Math.acos(1 - 2 * progress) / Math.PI

// Shows each time the app opens, never inside a lesson. A tap skips it. It clears with one crossfade (about half a
// second) that reveals the home screen in place, already drawn underneath; nothing on home moves (Dan, 2026-11-10).
export default function Splash({ onDone }) {
  const svg = useRef(null)
  useEffect(() => {
    const safety = setTimeout(onDone, 4800)
    return () => clearTimeout(safety)
  }, [])
  // Before the first paint: measure every stroke and give it its slice of the letter's eased time.
  useLayoutEffect(() => {
    LETTERS.forEach((strokes, i) => {
      const paths = [...svg.current.querySelectorAll(`#letter-${i} path`)]
      const lengths = paths.map((p) => p.getTotalLength())
      const total = lengths.reduce((a, b) => a + b, 0)
      let done = 0
      paths.forEach((p, j) => {
        const start = easedTime(done / total)
        done += lengths[j]
        const end = easedTime(Math.min(1, done / total))
        p.style.animationDelay = `${i * STAGGER_MS + start * LETTER_MS}ms`
        p.style.animationDuration = `${Math.max(1, (end - start) * LETTER_MS)}ms`
        p.classList.add('splash-draw')
      })
    })
  }, [])
  const skip = () => onDone()
  return (
    <div className="splash" onClick={skip}
      onAnimationEnd={(e) => { if (e.animationName === 'splash-out') onDone() }}>
      <div className="flex w-[min(84vw,380px)] flex-col items-center">
        <svg ref={svg} className="w-full" viewBox={viewBox} role="img" aria-label="Tamago" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            {LETTERS.map((strokes, i) => (
              <mask key={i} id={`letter-${i}`} maskUnits="userSpaceOnUse" {...VIEW}>
                {strokes.map((d, j) => <path key={j} d={d} pathLength="1" stroke="white" strokeWidth="31" strokeDasharray="1 2" strokeDashoffset="1.01" />)}
              </mask>
            ))}
          </defs>
          {LETTERS.map((strokes, i) => <LetterStrokes key={i} d={strokes.join('')} mask={`url(#letter-${i})`} />)}
        </svg>
        <SushiMark className="relative z-10 -mt-[9%] w-[40%]" />
      </div>
    </div>
  )
}
