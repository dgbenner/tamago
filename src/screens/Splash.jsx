import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { chooseCourse } from '../lib/course.js'
import { FlagRow } from './Languages.jsx'
import { LETTERS, Letter, LetterStrokes, SushiMark, VIEW, splashViewBox } from './Logo.jsx'

// Each letter is revealed by its own mask, which follows the same strokes.
const LETTER_MS = 260
const STAGGER_MS = 90
// One ease-in-out curve per letter, shared across its strokes by length, so the pen speeds up, keeps going through
// each joint, and settles at the end (Dan's test notes: more fluid, a little faster). easeInOutSine and its inverse.
const easedTime = (progress) => Math.acos(1 - 2 * progress) / Math.PI

// Shows each time the app opens, never inside a lesson. A tap skips it. It clears with one crossfade (about half a
// second) that reveals the home screen in place, already drawn underneath; nothing on home moves (Dan, 2026-11-10).
// On first launch (choose) it also shows "Choose Your Language" under the logo and waits: picking the running course
// starts the fade at once; picking another reloads into it.
export default function Splash({ onDone, choose = false }) {
  const svg = useRef(null)
  // The question can arrive a moment after the screen opens (once saved state is read), so it comes straight from
  // the prop; only "picked" is this screen's own.
  const [picked, setPicked] = useState(false)
  const held = picked ? 'picked' : choose
  useEffect(() => {
    if (held) return
    const safety = setTimeout(onDone, 4800)
    return () => clearTimeout(safety)
  }, [held])
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
  const skip = () => { if (!held) onDone() }
  const pick = (id) => { if (chooseCourse(id)) setPicked(true) }
  return (
    <div className={`splash ${held === true ? 'splash-hold' : held === 'picked' ? 'splash-now' : ''}`} onClick={skip}
      onAnimationEnd={(e) => { if (e.animationName === 'splash-out') onDone() }}>
      <div className="splash-stack flex w-[min(84vw,430px)] translate-y-[2px] flex-col items-center">
        <svg ref={svg} className="splash-wordmark w-full max-w-none md:w-[114%]" viewBox={splashViewBox} role="img" aria-label="Tamago" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            {LETTERS.map((strokes, i) => (
              <mask key={i} id={`letter-${i}`} maskUnits="userSpaceOnUse" {...VIEW}>
                {strokes.map((d, j) => <path key={j} d={d} pathLength="1" stroke="white" strokeWidth="31" strokeDasharray="1 2" strokeDashoffset="1.01" />)}
              </mask>
            ))}
          </defs>
          <g className="wm-letters">{LETTERS.map((strokes, i) => <Letter key={i} i={i} spaced><LetterStrokes d={strokes.join('')} mask={`url(#letter-${i})`} /></Letter>)}</g>
        </svg>
        <SushiMark className="splash-sushi relative z-10 -mt-[14.5%] w-[37%]" />
        {held === true && (
          <div className="splash-choose mt-[3.8rem] flex flex-col items-center gap-0">
            <h1 className="text-[1.15rem] font-semibold">Choose Your Language</h1>
            <FlagRow size="lg" onPick={pick} />
          </div>
        )}
      </div>
    </div>
  )
}
