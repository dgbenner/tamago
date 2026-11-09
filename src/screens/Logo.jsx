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

export function LetterStrokes({ d, mask }) {
  return (
    <g mask={mask}>
      <path d={d} stroke="var(--logo-green)" strokeWidth="25" />
      <path d={d} stroke="var(--bg)" strokeWidth="15" />
      <path d={d} stroke="var(--logo-orange)" strokeWidth="5" />
    </g>
  )
}

// The logo at the top of the pages outside a lesson: the wordmark with the sushi in front.
export default function Logo() {
  return (
    <div className="flex w-36 flex-col items-center">
      <svg className="w-full" viewBox={viewBox} role="img" aria-label="Tamago" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {LETTERS.map((strokes, i) => <LetterStrokes key={i} d={strokes.join('')} />)}
      </svg>
      <img src="/logo.png" alt="" className="relative z-10 -mt-[9%] w-[40%]" />
    </div>
  )
}

// Home's header lockup: the wordmark is what gets centred; the sushi sits to its left with a small gap,
// outside the centring.
export function LogoInline() {
  return (
    <div className="relative" role="img" aria-label="Tamago">
      <img src="/logo.png" alt="" className="absolute top-1/2 right-full mr-1.5 w-[29px] -translate-y-1/2" />
      <svg className="block w-[86px]" viewBox={viewBox} aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {LETTERS.map((strokes, i) => <LetterStrokes key={i} d={strokes.join('')} />)}
      </svg>
    </div>
  )
}
