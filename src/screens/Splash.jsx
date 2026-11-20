import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { chooseCourse } from '../lib/course.js'
import { FlagRow } from '../components/FlagRow.jsx'
import { site, version } from '../lib/version.js'
import { LETTERS, Letter, LetterStrokes, SushiMark, VIEW, splashViewBox } from '../components/Logo.jsx'

// Each letter is revealed by its own mask, which follows the same strokes.
const LETTER_MS = 260
const STAGGER_MS = 90
// One ease-in-out curve per letter, shared across its strokes by length, so the pen speeds up, keeps going through
// each joint, and settles at the end (Dan's test notes: more fluid, a little faster). easeInOutSine and its inverse.
const easedTime = (progress) => Math.acos(1 - 2 * progress) / Math.PI

// Shows each time the app opens, never inside a lesson (Dan, 2026-11-13: a gauze curtain). The home screen is already
// drawn underneath and shows through a translucent sheet of the page color with a fine woven-dot texture, so it's
// plain the app is right there; the wordmark and sushi sit over it at full strength. It leaves by itself after the
// letters draw and a short hold, or at once on any tap, click or key, with the halftone wipe from the Cunk countdown:
// the curtain becomes a grid of dots that shrink away corner to corner (halftoneOut, a canvas, about 0.75 s), and taps
// reach the home screen from the moment it starts. Reduced motion: a short fade. On first launch (choose) it shows
// "Choose Your Language" and waits: picking the running course leaves at once; picking another reloads into it.
const HOLD_MS = 3600 // the drop settles by about 2.75 s (Dan, 2026-11-19: slower fall), then a moment at rest
const DOT = 26 // CSS px between dot centres
const SWEEP = 0.7 // how staggered the corner-to-corner sweep is (0: every dot at once)
const SHRINK_MS = 750
const GROW_MS = 450
const SETTLE_MAX_MS = 1200 // the dots never wait longer than this for the page to be free
const GAUZE = 0.9 // the curtain's opacity over the home screen (0.84 at first; Dan, 2026-11-13: a touch less showing through)

export default function Splash({ onDone, choose = false, line = null }) {
  const svg = useRef(null)
  const canvas = useRef(null)
  // The question can arrive a moment after the screen opens (once saved state is read), so it comes straight from
  // the prop; only "picked" is this screen's own.
  const [picked, setPicked] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const held = picked ? 'picked' : choose
  // Once the picker has shown it stays until the screen goes, so after a pick everything leaves together (Dan,
  // 2026-11-19: the flags vanished at once and the logo jumped to the centre before fading).
  const chose = useRef(false)
  // The question arrives a moment after the screen opens; the flags' ripple is timed from the screen's start, not
  // from theirs, so they still come in just behind the sushi.
  const opened = useRef(performance.now())
  const choseAt = useRef(0)
  if (choose === true && !chose.current) { chose.current = true; choseAt.current = Math.round(performance.now() - opened.current) }
  const left = useRef(false)
  const leave = () => {
    if (left.current) return
    left.current = true
    // The canvas draws its first, full frame before the curtain's own color goes, so nothing blinks.
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
  // The curtain comes on as halftone dots; the tint layer shows (and the base starts to thin) once they cover it.
  const [covered, setCovered] = useState(false)
  useLayoutEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !canvas.current) { setCovered(true); return }
    // The home screen is built underneath in the first moments and holds the page up for a few hundred ms; the dots
    // wait until it is free (the plain page color holds until then), or they would jump from nothing to full cover.
    const start = () => { if (!left.current && canvas.current) halftoneIn(canvas.current, () => { if (!left.current) setCovered(true) }) }
    // Free = three frames in a row under 40 ms apart; never later than SETTLE_MAX_MS.
    let last = performance.now(), smooth = 0, raf = 0, gone = false
    const first = last
    const watch = (now) => {
      if (gone) return
      smooth = now - last < 40 ? smooth + 1 : 0
      last = now
      if (smooth >= 3 || now - first > SETTLE_MAX_MS) start()
      else raf = requestAnimationFrame(watch)
    }
    raf = requestAnimationFrame(watch)
    return () => { gone = true; cancelAnimationFrame(raf) }
  }, [])
  // Once the curtain's layer is painted under the full cover of dots, the canvas clears (same color, no blink).
  useEffect(() => {
    if (covered && !left.current && canvas.current) canvas.current.getContext('2d').clearRect(0, 0, canvas.current.width, canvas.current.height)
  }, [covered])
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
    <div className={`splash ${covered ? 'splash-covered' : ''} ${leaving ? 'splash-leaving' : ''}`} onClick={skip} style={{ '--gauze': GAUZE }}>
      <div className="splash-base" aria-hidden="true" />
      <div className="splash-tint" aria-hidden="true" />
      <canvas ref={canvas} className="splash-dots" aria-hidden="true" />
      <div className="splash-stack flex w-[min(84vw,430px)] translate-y-[2px] flex-col items-center">
        {/* The drop (Dan, 2026-11-19): the wordmark falls in from above the screen and lands with a little squash, its
            shadow growing under it; the sushi follows the same way. Each has an outer wrapper that falls and an inner one
            that squashes from its bottom edge, so each motion keeps its own pivot (index.css .splash-fall). */}
        <div className="splash-fall splash-fall-wm relative flex w-full flex-col items-center">
          <span className="splash-shadow splash-shadow-wm" aria-hidden="true" />
          <div className="splash-land flex w-full justify-center">
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
          </div>
        </div>
        <div className="splash-sushi splash-fall splash-fall-sushi relative z-10 -mt-[14.5%] w-[37%]">
          <span className="splash-shadow splash-shadow-sushi" aria-hidden="true" />
          <div className="splash-land"><SushiMark className="w-full" /></div>
        </div>
        {/* Where the learner is (Dan, 2026-11-15): quiet, under the logo, only for a returning learner. */}
        {line && held !== true && <p data-return-line className="splash-line mt-5 text-sm text-muted">{line}</p>}
        {chose.current && (
          <div style={{ '--since': `${choseAt.current}ms` }} className="splash-choose mt-[3.8rem] [@media(max-height:760px)]:mt-3 flex flex-col items-center gap-0 lg:w-[min(92vw,760px)]">
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
function halftoneOut(el, onDone) { halftone(el, onDone, false) }
// Coming on (Dan, 2026-11-19): the same dots in reverse, growing from nothing, top-left first, until they cover the
// screen; then the curtain's own layer takes over and the canvas clears.
function halftoneIn(el, onDone) { halftone(el, onDone, true) }
function halftone(el, onDone, grow) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const W = (el.width = Math.ceil(window.innerWidth * dpr))
  const H = (el.height = Math.ceil(window.innerHeight * dpr))
  const ctx = el.getContext('2d')
  // exactly the curtain's own color, alpha included (read before it goes transparent)
  const curtain = getComputedStyle(el.parentElement.querySelector('.splash-tint')).backgroundColor
  const s = DOT * dpr
  const R = s * 0.73 // 0.7071·s already covers a square cell
  const cols = Math.ceil(W / s) + 1
  const rows = Math.ceil(H / s) + 1
  ctx.fillStyle = curtain
  const t0 = performance.now()
  let done = false
  const finish = () => { if (!done) { done = true; onDone() } }
  const MS = grow ? GROW_MS : SHRINK_MS
  const safety = setTimeout(finish, MS + 400)
  const run = (el.halftoneRun = (el.halftoneRun || 0) + 1) // a newer wipe on this canvas stops this one
  const frame = (now) => {
    if (el.halftoneRun !== run) { clearTimeout(safety); return }
    const p = Math.min(1, Math.max(0, (now - t0) / MS))
    ctx.clearRect(0, 0, W, H)
    ctx.beginPath()
    for (let j = 0; j < rows; j++) {
      const y = j * s
      for (let i = 0; i < cols; i++) {
        const x = i * s
        const local = Math.min(1, Math.max(0, p * (1 + SWEEP) - ((x + y) / (W + H)) * SWEEP))
        const k = grow ? 1 - local : local
        const r = R * (1 - k) * (1 - k * 0.15)
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
