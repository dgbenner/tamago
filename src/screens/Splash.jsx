import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { chooseCourse, course, firstLaunch } from '../lib/course.js'
import { keepOpening, onOpening, openingState } from '../lib/opening.js'
import { FlagRow } from '../components/FlagRow.jsx'
import { site, version } from '../lib/version.js'
import { LETTERS, Letter, LetterStrokes, SushiMark, splashViewBox } from '../components/Logo.jsx'

// The opening, on every launch but a language switch (Dan, 2026-11-25): a black screen with the wordmark and the sushi
// dropping in together, all of it in index.html (#opening) so it plays before any code has loaded. This adds what comes
// next, on its own React root (main.jsx) without waiting for the course: on a first launch "Choose Your Language" and
// the flags, else the learner's line once it's known, and the version name. The tree loads behind. It leaves by itself
// once the app has drawn a page under it, or on a tap, click or key from then on, with the halftone wipe: the black
// becomes a grid of dots that shrink away corner to corner. Reduced motion: a short fade.
const MIN_MS = 1900 // the least it shows, from its first paint: the drop lands by 0.9 s, then a moment at rest
const LINE_MS = 900 // and at least this after the app is ready, so the learner's line can be read
const DOT = 26 // CSS px between dot centres
const SWEEP = 0.7 // how staggered the corner-to-corner sweep is (0: every dot at once)
const SHRINK_MS = 750
const SETTLE_MAX_MS = 1200 // the wipe never waits longer than this for the page to be free
const FLAGS_MS = 620 // the flags follow the landing

const el = () => document.getElementById('opening')

export function Opening({ onDone }) {
  const app = useSyncExternalStore(onOpening, openingState)
  const [fresh, setFresh] = useState(false) // a first launch with nothing saved here: ask at once, before the course has loaded
  const [picked, setPicked] = useState(false)
  const left = useRef(false)
  const asking = (app.choose || fresh) && !picked
  const rest = useRef(el().classList.contains('op-rest')).current
  // Someone with saved progress but no course recorded isn't new; the app says so once it has read it (app.choose).
  useEffect(() => {
    if (!firstLaunch || rest) return
    if (!indexedDB.databases) { setFresh(true); return }
    indexedDB.databases().then((all) => { if (!all.some((d) => d.name === course.db)) setFresh(true) }).catch(() => setFresh(true))
  }, [rest])
  // The app found progress after all: no question.
  const held = asking && !(app.ready && !app.choose)
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
        halftoneOut(canvas, gone) // draws its first, full frame before the black goes, so nothing blinks
      }
      box.classList.add('splash-leaving')
    }
    requestAnimationFrame(watch)
  }
  useEffect(() => {
    if (!app.ready || held) return undefined
    if (picked || rest) { leave(); return undefined }
    const auto = setTimeout(leave, Math.max(LINE_MS, MIN_MS - (performance.now() - (window.openingAt ?? 0))))
    const box = el()
    window.addEventListener('keydown', leave)
    box.addEventListener('click', leave)
    return () => { clearTimeout(auto); window.removeEventListener('keydown', leave); box.removeEventListener('click', leave) }
  }, [app.ready, held, picked]) // eslint-disable-line react-hooks/exhaustive-deps
  const pick = (id) => {
    if (id !== course.id) keepOpening()
    if (chooseCourse(id)) setPicked(true)
  }
  const shown = useRef(false)
  if (held) shown.current = true
  return (
    <>
      {app.line && !shown.current && <p data-return-line className="splash-line absolute inset-x-0 top-full mt-5 text-center text-sm text-muted">{app.line}</p>}
      {shown.current && <Choose onPick={pick} since={performance.now() - (window.openingAt ?? 0)} />}
      {/* The version's name, lower left (Dan, 2026-11-11): which deploy this device is running. */}
      {createPortal(
        <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] flex items-center gap-2">
          <p data-version className="text-base text-muted">Version {version.name}</p>
          {site && <span data-site className="site-tag">{site}</span>}
        </div>, el())}
    </>
  )
}

function Choose({ onPick, since = FLAGS_MS }) {
  const wait = useRef(Math.max(0, Math.round(FLAGS_MS - since))).current
  return (
    <div style={{ '--wait': `${wait}ms` }} className="splash-choose -mx-[calc((min(92vw,760px)-min(84vw,430px))/2)] flex flex-col items-center gap-0 pt-[3.8rem] [@media(max-height:760px)]:pt-3">
      <h1 className="text-[1.15rem] font-semibold">Choose Your Language</h1>
      <FlagRow size="lg" onPick={onPick} />
    </div>
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
        {choose && <Choose onPick={() => {}} />}
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
  const s = DOT * dpr
  const R = s * 0.73 // 0.7071·s already covers a square cell
  const cols = Math.ceil(W / s) + 1
  const rows = Math.ceil(H / s) + 1
  ctx.fillStyle = '#000'
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
