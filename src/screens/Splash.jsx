import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { chooseCourse } from '../lib/course.js'
import { FlagRow } from './Languages.jsx'
import { site, version } from '../lib/version.js'
import { LETTERS, Letter, LetterStrokes, SushiMark, VIEW, splashViewBox } from './Logo.jsx'

// Each letter is revealed by its own mask, which follows the same strokes.
const LETTER_MS = 260
const STAGGER_MS = 90
// One ease-in-out curve per letter, shared across its strokes by length, so the pen speeds up, keeps going through
// each joint, and settles at the end (Dan's test notes: more fluid, a little faster). easeInOutSine and its inverse.
const easedTime = (progress) => Math.acos(1 - 2 * progress) / Math.PI

// Shows each time the app opens, never inside a lesson (Dan, 2026-11-13: a gauze curtain). The home screen is already
// drawn underneath and shows through a translucent sheet of the page colour with a fine woven-dot texture, so it's
// plain the app is right there; the wordmark and sushi sit over it at full strength. It leaves by itself after the
// letters draw and a short hold, or at once on any tap, click or key, with the halftone wipe from the Cunk countdown:
// the curtain becomes a grid of dots that shrink away corner to corner (halftoneOut, a canvas, about 0.75 s), and taps
// reach the home screen from the moment it starts. Reduced motion: a short fade. On first launch (choose) it shows
// "Choose Your Language" and waits: picking the running course leaves at once; picking another reloads into it.
const HOLD_MS = 3000 // letters drawn by about 0.75 s, then held
const DOT = 26 // CSS px between dot centres
const SWEEP = 0.7 // how staggered the corner-to-corner sweep is (0: every dot at once)
const SHRINK_MS = 750
const GAUZE = 0.84 // the curtain's opacity over the home screen

export default function Splash({ onDone, choose = false }) {
  const svg = useRef(null)
  const canvas = useRef(null)
  // The question can arrive a moment after the screen opens (once saved state is read), so it comes straight from
  // the prop; only "picked" is this screen's own.
  const [picked, setPicked] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const held = picked ? 'picked' : choose
  const left = useRef(false)
  const leave = () => {
    if (left.current) return
    left.current = true
    // The canvas draws its first, full frame before the curtain's own colour goes, so nothing blinks.
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && canvas.current) halftoneOut(canvas.current, onDone)
    else setTimeout(onDone, 300)
    setLeaving(true)
  }
  useEffect(() => {
    if (held === true) return undefined
    if (held === 'picked') { leave(); return undefined }
    const auto = setTimeout(leave, HOLD_MS)
    const onKey = () => leave()
    window.addEventListener('keydown', onKey)
    return () => { clearTimeout(auto); window.removeEventListener('keydown', onKey) }
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
  const skip = () => { if (!held) leave() }
  const pick = (id) => { if (chooseCourse(id)) setPicked(true) }
  return (
    <div className={`splash ${leaving ? 'splash-leaving' : ''}`} onClick={skip} style={{ '--gauze': GAUZE }}>
      <canvas ref={canvas} className="splash-dots" aria-hidden="true" />
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
      {/* The version's name, lower left (Dan, 2026-11-11): which deploy this device is running. */}
      <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] flex items-center gap-2">
        <p data-version className="text-base text-muted">Version {version.name}</p>
        {site && <span data-site className="site-tag">{site}</span>}
      </div>
    </div>
  )
}

// The halftone wipe (from the Cunk countdown's clip transitions): the curtain is drawn as overlapping dots that cover it
// completely, then every dot shrinks to nothing, the top-left ones first. One path filled once a frame, so overlaps
// never darken. Then onDone.
function halftoneOut(el, onDone) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const W = (el.width = Math.ceil(window.innerWidth * dpr))
  const H = (el.height = Math.ceil(window.innerHeight * dpr))
  const ctx = el.getContext('2d')
  // exactly the curtain's own colour, alpha included (read before it goes transparent)
  const curtain = getComputedStyle(el.parentElement).backgroundColor
  const s = DOT * dpr
  const R = s * 0.73 // 0.7071·s already covers a square cell
  const cols = Math.ceil(W / s) + 1
  const rows = Math.ceil(H / s) + 1
  ctx.fillStyle = curtain
  const t0 = performance.now()
  let done = false
  const finish = () => { if (!done) { done = true; onDone() } }
  const safety = setTimeout(finish, SHRINK_MS + 400)
  const frame = (now) => {
    const p = Math.min(1, Math.max(0, (now - t0) / SHRINK_MS))
    ctx.clearRect(0, 0, W, H)
    ctx.beginPath()
    for (let j = 0; j < rows; j++) {
      const y = j * s
      for (let i = 0; i < cols; i++) {
        const x = i * s
        const local = Math.min(1, Math.max(0, p * (1 + SWEEP) - ((x + y) / (W + H)) * SWEEP))
        const r = R * (1 - local) * (1 - local * 0.15)
        if (r <= 0.01) continue
        ctx.moveTo(x + r, y)
        ctx.arc(x, y, r, 0, Math.PI * 2)
      }
    }
    ctx.fill()
    if (p < 1) requestAnimationFrame(frame)
    else { clearTimeout(safety); finish() }
  }
  frame(t0)
}
