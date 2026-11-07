import { useEffect } from 'react'

// The wordmark, drawn as single lines so each letter can render as three parallel strokes.
const LETTERS = [
  'M0 10H60M30 10V100', // T
  'M103 72.5A27.5 27.5 0 1 1 48 72.5A27.5 27.5 0 1 1 103 72.5M103 45V100', // a
  'M124 100V45M124 67A15 22 0 0 1 154 67V100M154 67A15 22 0 0 1 184 67V100', // m
  'M260 72.5A27.5 27.5 0 1 1 205 72.5A27.5 27.5 0 1 1 260 72.5M260 45V100', // a
  'M336 72.5A27.5 27.5 0 1 1 281 72.5A27.5 27.5 0 1 1 336 72.5M336 45V103C336 124 322 132 308 132C297 132 288 127 284 119', // g
  'M412 72.5A27.5 27.5 0 1 1 357 72.5A27.5 27.5 0 1 1 412 72.5', // o
].join('')

// Shows once when the app opens, never inside a lesson. A tap skips it.
export default function Splash({ onDone }) {
  useEffect(() => {
    const safety = setTimeout(onDone, 2500)
    return () => clearTimeout(safety)
  }, [])
  return (
    <div className="splash" onClick={onDone} onAnimationEnd={(e) => { if (e.animationName === 'splash-out') onDone() }}>
      <div className="flex w-[min(80vw,360px)] flex-col items-center">
        <svg className="splash-wipe w-full" viewBox="-10 0 432 142" role="img" aria-label="Tamago" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={LETTERS} stroke="var(--logo-green)" strokeWidth="15" />
          <path d={LETTERS} stroke="var(--bg)" strokeWidth="9" />
          <path d={LETTERS} stroke="var(--logo-orange)" strokeWidth="3" />
        </svg>
        <img src="/logo.png" alt="" className="relative z-10 -mt-[11%] w-[42%]" />
      </div>
    </div>
  )
}
