// Tree Lines lab (Dan, 2026-11-12; branch lab/tree-lines, never merged to main). The French tree, Parts 1 and 2, drawn
// with the real CircleNode and sample progress, with thin lines joining each circle to the next in tree order and a
// calm pulse from the last finished circle to the current one.
//
// Lines: one SVG behind the circles, touching each disc's edge and running under the titles (so the gray is very
// light). Between two rows, every circle of the upper row runs to a junction midway, and
// the junction runs to every circle of the lower row, so rows of 2 or 3 branch out and join again. A line into a locked
// circle is dotted; into a reached one, solid. Same gray (--tree-line, tuned per theme).
// Pulse (Dan's second pass, 2026-11-12): SVG and CSS only (tree-lines.css). The gray lines stay; a lit stretch, like a
// train, runs from the top of the tree down every reached line to the current circle, lighting each circle's outline
// from the top down as it passes; as it arrives a ring radiates from the current circle, then it all fades. No per-frame
// JavaScript: the geometry is measured once (and again on resize), and the browser runs the animation. It pauses while
// the tab is hidden or the current circle is off screen, and isn't drawn at all under reduced motion.
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import CircleNode from '../screens/CircleNode.jsx'
import units from '../content/units.json'
import layout from '../content/tree_layout.json'
import catchUp from '../content/catch_up.json'
import './tree-lines.css'

const TOTAL = 26
const FINISHED = new Set(['Say Hi', 'Getting Help', 'People + Things', 'Polite Phrases', 'Food + Drink', 'Animals'])
const CURRENT = 'Conversation Help'

// Parts 1 and 2 in tree order, with the Brush-Up circles where the tree has them.
function buildRows() {
  const unit = (id) => units.find((u) => u.unit_id === id)
  const placed = layout.map((t) => ({ ...t, unit: unit(t.unit_id) })).filter((t) => [1, 2].includes(Number(t.unit?.part)))
  const rowNums = [...new Set(placed.map((t) => t.row))].sort((a, b) => a - b)
  const rows = []
  for (const r of rowNums) {
    rows.push(placed.filter((t) => t.row === r).sort((a, b) => a.position - b.position).map((t) => {
      const title = t.unit.title
      const finished = FINISHED.has(title)
      const current = title === CURRENT
      return { id: t.unit_id, title, icon: t.unit.icon_file ? `/sushi/${t.unit.icon_group}/${t.unit.icon_file}` : null, locked: !finished && !current, lessonsDone: finished ? TOTAL : current ? 3 : 0, recall: finished ? 0.93 : null, current }
    }))
    for (const cu of catchUp.filter((c) => c.after_row === r && [1, 2].includes(Number(c.part)))) {
      rows.push([{ id: cu.slot_id, title: cu.title, icon: '/sushi/misc/miso-soup.webp', locked: true, lessonsDone: 0, brushUp: true }])
    }
  }
  return rows
}
const ROWS = buildRows()
const NODES = ROWS.flat()
const CURRENT_ID = NODES.find((n) => n.current)?.id

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const EDGE = 0.96 // the ring's outer edge, as a share of the disc's half-width (CircleNode: r 45 + half of stroke 6, of 50)
const TRAIN = 150 // px: the lit stretch that travels down the lines

// Measures every disc, title and marker once, and again whenever the tree changes size (a wider window moves the
// circles, so the lines follow). Not per frame.
function useGeometry(box) {
  const [geo, setGeo] = useState(null)
  useLayoutEffect(() => {
    const measure = () => {
      const root = box.current
      if (!root) return
      const o = root.getBoundingClientRect()
      const at = {}
      for (const n of NODES) {
        const el = root.querySelector(`[data-node="${n.id}"]`)
        const disc = el?.querySelector('.aspect-square')
        if (!disc) continue
        const d = disc.getBoundingClientRect(), b = el.firstElementChild.getBoundingClientRect()
        const cx = d.left - o.left + d.width / 2, cy = d.top - o.top + d.height / 2, r = d.width / 2
        at[n.id] = { cx, cy, r, discTop: cy - r * EDGE, discBottom: cy + r * EDGE, top: b.top - o.top, bottom: b.bottom - o.top }
      }
      setGeo({ w: o.width, h: o.height, at })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(box.current)
    return () => ro.disconnect()
  }, [])
  return geo
}

// The lines between row i and row i+1. Each line leaves a disc at its bottom edge and goes straight down under the
// title; every upper circle runs into a junction midway, the junction branches to every lower circle, and each branch
// comes straight down onto the next disc's top edge.
function gapPaths(geo, upper, lower) {
  const ups = upper.map((n) => geo.at[n.id]).filter(Boolean), downs = lower.map((n) => geo.at[n.id]).filter(Boolean)
  if (!ups.length || !downs.length) return null
  const y0 = Math.max(...ups.map((g) => g.bottom))
  const y1 = Math.min(...downs.map((g) => g.top))
  const j = { x: geo.w / 2, y: (y0 + y1) / 2 }
  const curve = (x0, ya, x1, yb) => {
    const m = (ya + yb) / 2
    return Math.abs(x0 - x1) < 0.5 ? `L${x1} ${yb}` : `L${x0} ${ya}C${x0} ${m} ${x1} ${m} ${x1} ${yb}`
  }
  // A short shared stem at the junction, so two rows of two read as join-then-branch rather than an X.
  const stem = upper.length > 1 && lower.length > 1 ? Math.min(14, (y1 - y0) / 4) : 0
  const into = upper.map((n, i) => ({ from: n, d: `M${ups[i].cx} ${ups[i].discBottom}` + curve(ups[i].cx, y0, j.x, j.y - stem / 2) + (stem ? `V${j.y + stem / 2}` : '') }))
  const out = lower.map((n, i) => ({ to: n, d: `M${j.x} ${j.y + stem / 2}` + curve(j.x, j.y + stem / 2, downs[i].cx, y1) + `L${downs[i].cx} ${downs[i].discTop}` }))
  return { into, out, anyOpen: lower.some((n) => !n.locked) }
}

// Gray lines, and the pulse: a copy of the route already travelled (every line between reached circles, and a thin
// outline round each reached circle) drawn in green, seen only through a soft band that slides from the top of the
// tree to the current circle. Branches at the same height light together. One mask, so one moving part.
function Lines({ geo, pulse }) {
  const segs = [], lit = []
  for (let i = 0; i < ROWS.length - 1; i++) {
    const g = gapPaths(geo, ROWS[i], ROWS[i + 1])
    if (!g) continue
    g.into.forEach((p) => { segs.push({ key: `${i}i${p.from.id}`, d: p.d, dotted: !g.anyOpen }); if (!p.from.locked && g.anyOpen) lit.push(p.d) })
    g.out.forEach((p) => { segs.push({ key: `${i}o${p.to.id}`, d: p.d, dotted: p.to.locked }); if (!p.to.locked) lit.push(p.d) })
  }
  const reached = NODES.filter((n) => !n.locked && geo.at[n.id]).map((n) => ({ id: n.id, ...geo.at[n.id] }))
  const cur = geo.at[CURRENT_ID]
  const first = geo.at[NODES[0].id]
  const start = first ? first.discTop - TRAIN : 0
  const travel = cur ? cur.discBottom + 6 - TRAIN - start : 0
  return (
    <svg className="tree-lines" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
      <g className="tree-lines-gray">
        {segs.map((s) => <path key={s.key} d={s.d} className={s.dotted ? 'tl-dotted' : 'tl-solid'} />)}
      </g>
      {pulse && cur && (
        <g className="tl-pulse" key={pulse.key} style={{ '--tl-travel': `${travel}px` }}>
          <defs>
            {/* The train: a faint tail above, full strength towards the front, a short soft nose. */}
            <linearGradient id="tl-train-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.75" stopColor="#fff" stopOpacity="1" />
              <stop offset="0.92" stopColor="#fff" stopOpacity="1" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="tl-train" maskUnits="userSpaceOnUse" x="0" y="0" width={geo.w} height={geo.h}>
              <rect className="tl-band" x="0" y={start} width={geo.w} height={TRAIN} fill="url(#tl-train-fade)" />
            </mask>
          </defs>
          <g className="tl-lit" mask="url(#tl-train)">
            {pulse.glow && lit.map((d, i) => <path key={`g${i}`} d={d} className="tl-lit-glow" />)}
            {lit.map((d, i) => <path key={i} d={d} className="tl-lit-line" />)}
            {reached.map((g) => <circle key={g.id} cx={g.cx} cy={g.cy} r={g.r * 1.08} className="tl-lit-outline" />)}
          </g>
          <circle className="tl-ring" cx={cur.cx} cy={cur.cy} r={cur.r * EDGE} />
        </g>
      )}
    </svg>
  )
}

export default function TreeLinesLab() {
  const [theme, setTheme] = useState(() => (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  const [interval, setIntervalS] = useState(5)
  const [opacity, setOpacity] = useState(0.7)
  const [glow, setGlow] = useState(true)
  const [hidden, setHidden] = useState(document.hidden)
  const [offscreen, setOffscreen] = useState(false)
  const [still] = useState(reducedMotion)
  const box = useRef(null)
  const geo = useGeometry(box)
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  useEffect(() => { document.title = 'Tree Lines Lab · Tamago' }, [])
  useEffect(() => {
    const on = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', on)
    return () => document.removeEventListener('visibilitychange', on)
  }, [])
  useEffect(() => {
    const el = box.current?.querySelector('[data-current]')
    if (!el) return
    el.scrollIntoView({ block: 'center' }) // the pulse runs only while the current circle is on screen
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const paused = hidden || offscreen
  return (
    <main className="tl-page mx-auto flex min-h-dvh max-w-3xl flex-col px-4 pb-24" data-paused={paused ? '' : undefined}
      style={{ '--pulse': `${interval}s`, '--tl-opacity': opacity }}>
      <header className="tl-controls sticky top-0 z-10 -mx-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-b-2 border-line bg-bg px-4 py-2 text-sm">
        <h1 className="mr-auto font-semibold">Tree Lines Lab</h1>
        <label className="flex items-center gap-2">Pulse {interval}s
          <input type="range" min="2" max="6" step="0.5" value={interval} onChange={(e) => setIntervalS(Number(e.target.value))} className="w-24" /></label>
        <label className="flex items-center gap-2">Lines {Math.round(opacity * 100)}%
          <input type="range" min="0.2" max="1" step="0.05" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-24" /></label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={glow} onChange={(e) => setGlow(e.target.checked)} /> Glow</label>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="rounded-lg border-2 border-line px-2 py-0.5">{theme === 'dark' ? 'Light' : 'Dark'}</button>
        <span className="w-full text-xs text-muted" role="status">{still ? 'Reduced motion is on: lines only, no pulse.' : paused ? 'Pulse paused (tab hidden or current circle off screen).' : 'Pulse running.'}</span>
      </header>
      <div ref={box} className="relative mt-4">
        {geo && <Lines geo={geo} pulse={still ? null : { key: interval, glow }} />}
        <ol className="relative flex flex-col items-center gap-y-[2.7rem] pt-[1.9rem]">
          {ROWS.map((row, i) => (
            <li key={i} className="flex w-full justify-center gap-[min(4.9rem,6vw)]">
              {row.map((n) => (
                <div key={n.id} data-node={n.id} data-current={n.current ? '' : undefined} className="flex min-w-0 shrink justify-center">
                  <CircleNode title={n.title} icon={n.icon} locked={n.locked} lessonsDone={n.lessonsDone} lessonsTotal={TOTAL} recall={n.recall ?? null} ring={!n.brushUp} onPick={() => {}} />
                </div>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}
