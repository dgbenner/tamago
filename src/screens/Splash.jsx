import { useEffect } from 'react'
import { LETTERS, LetterStrokes, VIEW, viewBox } from './Logo.jsx'

// Each letter is revealed by its own mask, which follows the same strokes.
const LETTER_MS = 300
const STAGGER_MS = 110

// Shows once when the app opens, never inside a lesson. A tap skips it.
export default function Splash({ onDone }) {
  useEffect(() => {
    const safety = setTimeout(onDone, 4600)
    return () => clearTimeout(safety)
  }, [])
  return (
    <div className="splash" onClick={onDone} onAnimationEnd={(e) => { if (e.animationName === 'splash-out') onDone() }}>
      <div className="flex w-[min(84vw,380px)] flex-col items-center">
        <svg className="w-full" viewBox={viewBox} role="img" aria-label="Tamago" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            {LETTERS.map((strokes, i) => (
              <mask key={i} id={`letter-${i}`} maskUnits="userSpaceOnUse" {...VIEW}>
                {strokes.map((d, j) => (
                  <path key={j} d={d} className="splash-draw" pathLength="1" stroke="white" strokeWidth="31"
                    style={{ animationDelay: `${i * STAGGER_MS + (j * LETTER_MS) / strokes.length}ms`, animationDuration: `${LETTER_MS / strokes.length}ms` }} />
                ))}
              </mask>
            ))}
          </defs>
          {LETTERS.map((strokes, i) => <LetterStrokes key={i} d={strokes.join('')} mask={`url(#letter-${i})`} />)}
        </svg>
        <img src="/logo.png" alt="" className="relative z-10 -mt-[9%] w-[40%]" />
      </div>
    </div>
  )
}
