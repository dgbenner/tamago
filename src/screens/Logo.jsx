// The wordmark as single lines, stroke by stroke in writing order, rendered as three parallel strokes.
export const LETTERS = [
  ['M0 10H60', 'M30 10V100'], // T
  ['M111 72.5A27.5 27.5 0 1 0 56 72.5A27.5 27.5 0 1 0 111 72.5', 'M111 45V100'], // a
  ['M138 45V100', 'M138 67A17 22 0 0 1 172 67V100', 'M172 67A17 22 0 0 1 206 67V100'], // m
  ['M288 72.5A27.5 27.5 0 1 0 233 72.5A27.5 27.5 0 1 0 288 72.5', 'M288 45V100'], // a
  ['M369 72.5A27.5 27.5 0 1 0 314 72.5A27.5 27.5 0 1 0 369 72.5', 'M369 45V103C369 124 355 134 341 134C330 134 321 129 317 121'], // g
  ['M422.5 45A27.5 27.5 0 1 0 422.5 100A27.5 27.5 0 1 0 422.5 45'], // o
]
export const VIEW = { x: -16, y: -6, width: 482, height: 156 }
export const viewBox = `${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`
// Letter spacing for the opening screen only (Dan's design lab, 2026-11-10): how far each letter moves from its drawn
// position; its view narrows by the total so the word stays centred. The small wordmarks keep the drawn spacing.
export const LETTER_X = [0, -2, -8.5, -12.5, -15.5, -18.5]
const SPLASH_VIEW = { ...VIEW, width: VIEW.width + LETTER_X[LETTER_X.length - 1] } // the masks keep the full VIEW: their region moves with each letter
export const splashViewBox = `${SPLASH_VIEW.x} ${SPLASH_VIEW.y} ${SPLASH_VIEW.width} ${SPLASH_VIEW.height}`

// One letter's group: the hook the design lab moves (className wm-letter, data-letter), with the spacing when asked.
export function Letter({ i, spaced = false, children }) {
  return <g className="wm-letter" data-letter={i} transform={spaced ? `translate(${LETTER_X[i]} 0)` : undefined}>{children}</g>
}

export function LetterStrokes({ d, mask }) {
  return (
    <g mask={mask}>
      <path d={d} stroke="var(--logo-green)" strokeWidth="25" />
      <path d={d} stroke="var(--bg)" strokeWidth="15" />
      <path d={d} stroke="var(--logo-orange)" strokeWidth="5" />
    </g>
  )
}

// The tamago sushi. A small WebP, preloaded in index.html, with its 3:2 box reserved, so it never arrives late and
// pushes the wordmark (Dan's test notes: the logo load was jumpy).
export function SushiMark({ className = '' }) {
  return <img src="/logo.webp" width="384" height="256" alt="" decoding="sync" className={`aspect-[3/2] h-auto ${className}`} />
}

// The logo at the top of the pages outside a lesson: the wordmark with the sushi in front.
export default function Logo() {
  return (
    <div className="flex w-36 flex-col items-center">
      <svg className="w-full" viewBox={viewBox} role="img" aria-label="Tamago" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g className="wm-letters">{LETTERS.map((strokes, i) => <Letter key={i} i={i}><LetterStrokes d={strokes.join('')} /></Letter>)}</g>
      </svg>
      <SushiMark className="relative z-10 -mt-[9%] w-[40%]" />
    </div>
  )
}

// Home's header: the wordmark alone, centred, as a single heavy yellow line. At this size the three-line version is
// too busy; the opening screen keeps all three.
export function LogoInline({ className = '' }) {
  return (
    <div role="img" aria-label="Tamago" className={className}>
      <svg className="block w-[103px]" viewBox={viewBox} aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g className="wm-letters">{LETTERS.map((strokes, i) => <Letter key={i} i={i}><path d={strokes.join('')} stroke="var(--accent)" strokeWidth="15" /></Letter>)}</g>
      </svg>
    </div>
  )
}
