import { useEffect } from 'react'

// The wordmark as single lines, stroke by stroke in writing order. Each letter is drawn as three parallel
// lines and revealed by its own mask, which follows the same strokes.
const LETTERS = [
  ['M0 10H60', 'M30 10V100'], // T
  ['M111 72.5A27.5 27.5 0 1 0 56 72.5A27.5 27.5 0 1 0 111 72.5', 'M111 45V100'], // a
  ['M138 45V100', 'M138 67A17 22 0 0 1 172 67V100', 'M172 67A17 22 0 0 1 206 67V100'], // m
  ['M288 72.5A27.5 27.5 0 1 0 233 72.5A27.5 27.5 0 1 0 288 72.5', 'M288 45V100'], // a
  ['M369 72.5A27.5 27.5 0 1 0 314 72.5A27.5 27.5 0 1 0 369 72.5', 'M369 45V103C369 124 355 134 341 134C330 134 321 129 317 121'], // g
  ['M422.5 45A27.5 27.5 0 1 0 422.5 100A27.5 27.5 0 1 0 422.5 45'], // o
]
const LETTER_MS = 300
const STAGGER_MS = 110
const VIEW = { x: -16, y: -6, width: 482, height: 156 }

// Shows once when the app opens, never inside a lesson. A tap skips it.
export default function Splash({ onDone }) {
  useEffect(() => {
    const safety = setTimeout(onDone, 2500)
    return () => clearTimeout(safety)
  }, [])
  return (
    <div className="splash" onClick={onDone} onAnimationEnd={(e) => { if (e.animationName === 'splash-out') onDone() }}>
      <div className="flex w-[min(84vw,380px)] flex-col items-center">
        <svg className="w-full" viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`} role="img" aria-label="Tamago" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
          {LETTERS.map((strokes, i) => {
            const d = strokes.join('')
            return (
              <g key={i} mask={`url(#letter-${i})`}>
                <path d={d} stroke="var(--logo-green)" strokeWidth="25" />
                <path d={d} stroke="var(--bg)" strokeWidth="15" />
                <path d={d} stroke="var(--logo-orange)" strokeWidth="5" />
              </g>
            )
          })}
        </svg>
        <img src="/logo.png" alt="" className="relative z-10 -mt-[9%] w-[40%]" />
      </div>
    </div>
  )
}
