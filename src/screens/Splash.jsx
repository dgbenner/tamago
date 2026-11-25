import { useEffect, useRef, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { chooseCourse, course, firstLaunch } from '../lib/course.js'
import { keepOpening, onOpening, openingState, tellOpening } from '../lib/opening.js'
import { FlagRow } from '../components/FlagRow.jsx'
import { site, version } from '../lib/version.js'
import { LETTERS, Letter, LetterStrokes, SushiMark, splashViewBox } from '../components/Logo.jsx'

// The opening, on every launch but a language switch (Dan, 2026-11-25): a black screen, the wordmark and the sushi
// dropping in together, and on a first launch the language flags as they land; all of it is in index.html (#opening), so
// it plays before any code has loaded. This adds, on its own React root (main.jsx) and without waiting for the course,
// the version name and the learner's line, and runs the ending. Once the app has drawn the tree, the black thins so it
// shows through. Then it leaves: by itself, except while it asks for a language; on a pick; or on a tap anywhere (kept
// if it came early), with the halftone wipe: the black becomes a grid of dots that shrink away corner to corner, and the
// tree is there. Reduced motion: a short fade.
const MIN_MS = 1900 // the least it shows, from its first paint: the drop lands by 0.9 s, then a moment at rest
const LINE_MS = 1200 // and at least this after the app is ready: the tree shows through, the learner's line can be read
const PICK_MS = 150 // the picked flag's outline shows before a reload
const DOT = 26 // CSS px between dot centres
const SWEEP = 0.7 // how staggered the corner-to-corner sweep is (0: every dot at once)
const SHRINK_MS = 750
const SETTLE_MAX_MS = 1200 // the wipe never waits longer than this for the page to be free

const el = () => document.getElementById('opening')

// From here on index.html hands every tap over; one it took earlier was a flag (course.js has read it as the course) or a skip.
if (typeof window !== 'undefined') {
  window.openingTake = tellOpening
  if (window.openingPick) tellOpening({ picked: window.openingPick })
  if (window.openingSkip) tellOpening({ skip: true })
}

export function Opening({ onDone }) {
  const app = useSyncExternalStore(onOpening, openingState)
  const left = useRef(false)
  const rest = useRef(el().classList.contains('op-rest')).current
  // It asks on a first launch, until the app finds saved progress after all (someone who has used the course isn't new).
  const asking = firstLaunch && !rest && !app.picked && !(app.ready && !app.choose)
  const leave = () => {
    if (left.current) return
    left.current = true
    // Free = three frames in a row under 40 ms apart, so the wipe doesn't stutter while the tree is still being built.
    let last = performance.now(), smooth = 0
    const first = last
    const watch = (now) => {
      smooth = now - last < 40 ? smooth + 1 : 0
      last = now
      if (smooth < 3 && now - first < SETTLE_MAX_MS) { requestAnimationFrame(watch); return }
      const box = el()
      const gone = () => { onDone(); box.remove() }
      document.documentElement.classList.remove('is-opening')
      for (const m of document.querySelectorAll('meta[name=theme-color]')) if (m.dataset.color) m.content = m.dataset.color
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) setTimeout(gone, 300)
      else {
        const canvas = document.createElement('canvas')
        canvas.className = 'splash-dots'
        box.prepend(canvas)
        halftoneOut(canvas, getComputedStyle(box).backgroundColor, gone) // draws its first, full frame before the black goes, so nothing blinks
      }
      box.classList.add('splash-leaving')
    }
    requestAnimationFrame(watch)
  }
  useEffect(() => { if (app.ready) el().classList.add('op-see') }, [app.ready])
  // A flag picked here: the running course just goes on; another reloads into it, with the logo at rest meanwhile.
  useEffect(() => {
    if (!app.picked) return
    if (app.picked === course.id) { chooseCourse(app.picked); return }
    setTimeout(() => { keepOpening(); chooseCourse(app.picked) }, PICK_MS)
  }, [app.picked])
  useEffect(() => {
    const onKey = (e) => { if (!asking || e.key === 'Escape') tellOpening({ skip: true }) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [asking])
  useEffect(() => {
    if (!app.ready || (app.picked && app.picked !== course.id)) return undefined
    if (app.skip || app.picked || rest) { leave(); return undefined }
    if (asking) return undefined
    const auto = setTimeout(leave, Math.max(LINE_MS, MIN_MS - (performance.now() - (window.openingAt ?? 0))))
    return () => clearTimeout(auto)
  }, [app.ready, app.skip, app.picked, asking]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {app.line && !firstLaunch && <p data-return-line className="splash-line absolute inset-x-0 top-full mt-5 text-center text-sm text-muted">{app.line}</p>}
      {/* The version's name, lower left (Dan, 2026-11-11): which deploy this device is running. */}
      {createPortal(
        <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] flex items-center gap-2">
          <p data-version className="text-base text-muted">Version {version.name}</p>
          {site && <span data-site className="site-tag">{site}</span>}
        </div>, el())}
    </>
  )
}

// The same picture drawn in React, for the design lab only (the app's own is in index.html).
export default function Splash({ choose = false }) {
  return (
    <div className="splash">
      <div className="splash-stack flex w-[min(84vw,430px)] flex-col items-center">
        <svg className="splash-wordmark w-full max-w-none shrink-0 md:w-[114%]" viewBox={splashViewBox} role="img" aria-label="Tamago" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <g className="wm-letters">{LETTERS.map((strokes, i) => <Letter key={i} i={i} spaced><LetterStrokes d={strokes.join('')} /></Letter>)}</g>
        </svg>
        <div className="splash-sushi relative z-10 -mt-[14.5%] w-[37%]"><SushiMark className="w-full" /></div>
        {choose && <div className="flex flex-col items-center pt-[3.8rem]"><h1 className="text-[1.15rem] font-semibold">Choose Your Language</h1><FlagRow size="lg" onPick={() => {}} /></div>}
      </div>
    </div>
  )
}

// The halftone wipe (from the Cunk countdown's clip transitions): the curtain is drawn as overlapping dots that cover it
// completely, then every dot shrinks to nothing, the top-left ones first. One path filled once a frame, so overlaps
// never darken. Then onDone.
function halftoneOut(el, color, onDone) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const W = (el.width = Math.ceil(window.innerWidth * dpr))
  const H = (el.height = Math.ceil(window.innerHeight * dpr))
  const ctx = el.getContext('2d')
  const s = DOT * dpr
  const R = s * 0.73 // 0.7071·s already covers a square cell
  const cols = Math.ceil(W / s) + 1
  const rows = Math.ceil(H / s) + 1
  ctx.fillStyle = color
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
        const k = Math.min(1, Math.max(0, p * (1 + SWEEP) - ((x + y) / (W + H)) * SWEEP))
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
