// Tree Lines lab (Dan, 2026-11-12; branch lab/tree-lines, never merged to main). The French tree, Parts 1 and 2, drawn
// with the real CircleNode and sample progress, with thin lines joining each circle to the next in tree order and a
// calm pulse from the last finished circle to the current one.
//
// Lines: one SVG behind the circles. Between two rows, every circle of the upper row runs to a junction midway, and
// the junction runs to every circle of the lower row, so rows of 2 or 3 branch out and join again. A line into a locked
// circle is dotted; into a reached one, solid. Same gray (--tree-line, tuned per theme).
// Pulse: SVG and CSS only (tree-lines.css). One sequence per cycle on a shared clock: the ring leaves the finished
// circle, the line turns green, the dot travels down, the current circle's outline shows, all settle. No per-frame
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
const LAST_FINISHED = (() => { // the finished circle in the row just above the current one, rightmost
  const ci = ROWS.findIndex((row) => row.some((n) => n.current))
  return ROWS[ci - 1]?.filter((n) => !n.locked).at(-1)?.id
})()

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const GAP_BELOW = 6 // px between a title and its line
const GAP_ABOVE = 10 // px between a line and the next disc (room for the current circle's outline)

// Measures every disc and title once, and again whenever the tree changes size. Not per frame.
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
        at[n.id] = { cx: d.left - o.left + d.width / 2, cy: d.top - o.top + d.height / 2, r: d.width / 2, top: d.top - o.top, bottom: b.bottom - o.top }
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

// The lines between row i and row i+1: every upper circle to the junction, the junction to every lower circle.
function gapPaths(geo, upper, lower) {
  const ups = upper.map((n) => geo.at[n.id]).filter(Boolean), downs = lower.map((n) => geo.at[n.id]).filter(Boolean)
  if (!ups.length || !downs.length) return null
  const y0 = Math.max(...ups.map((g) => g.bottom)) + GAP_BELOW
  const y1 = Math.min(...downs.map((g) => g.top)) - GAP_ABOVE
  const j = { x: geo.w / 2, y: (y0 + y1) / 2 }
  const curve = (x0, ya, x1, yb) => {
    const m = (ya + yb) / 2
    return x0 === x1 || Math.abs(x0 - x1) < 0.5 ? `M${x0} ${ya}V${yb}` : `M${x0} ${ya}C${x0} ${m} ${x1} ${m} ${x1} ${yb}`
  }
  // A short shared stem at the junction, so two rows of two read as join-then-branch rather than an X.
  const stem = upper.length > 1 && lower.length > 1 ? Math.min(14, (y1 - y0) / 4) : 0
  const into = upper.map((n, i) => ({ from: n.id, d: curve(ups[i].cx, ups[i].bottom + GAP_BELOW, j.x, j.y - stem / 2) + (stem ? `V${j.y + stem / 2}` : '') }))
  const out = lower.map((n, i) => ({ to: n.id, locked: n.locked, d: curve(j.x, j.y + stem / 2, downs[i].cx, downs[i].top - GAP_ABOVE) }))
  return { j, into, out, anyOpen: lower.some((n) => !n.locked) }
}

function Lines({ geo, pulse }) {
  const segs = []
  let pulsePath = null
  for (let i = 0; i < ROWS.length - 1; i++) {
    const g = gapPaths(geo, ROWS[i], ROWS[i + 1])
    if (!g) continue
    g.into.forEach((p) => segs.push({ key: `${i}i${p.from}`, d: p.d, dotted: !g.anyOpen }))
    g.out.forEach((p) => segs.push({ key: `${i}o${p.to}`, d: p.d, dotted: p.locked }))
    const from = g.into.find((p) => p.from === LAST_FINISHED), to = g.out.find((p) => ROWS[i + 1].find((n) => n.id === p.to)?.current)
    if (from && to) pulsePath = from.d + to.d.replace(/^M[^CV]+/, '') // one continuous path through the junction
  }
  const a = geo.at[LAST_FINISHED], c = NODES.find((n) => n.current) && geo.at[NODES.find((n) => n.current).id]
  return (
    <svg className="tree-lines" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
      <g className="tree-lines-gray">
        {segs.map((s) => <path key={s.key} d={s.d} className={s.dotted ? 'tl-dotted' : 'tl-solid'} />)}
      </g>
      {pulse && pulsePath && a && c && (
        <g className="tl-pulse" key={pulse.key}>
          <circle className="tl-ring" cx={a.cx} cy={a.cy} r={a.r * 0.96} />
          <path className="tl-green" d={pulsePath} pathLength="100" />
          {pulse.glow && <path className="tl-dot tl-dot-glow" d={pulsePath} pathLength="100" />}
          <path className="tl-dot" d={pulsePath} pathLength="100" />
          <circle className="tl-outline" cx={c.cx} cy={c.cy} r={c.r * 1.06} />
        </g>
      )}
    </svg>
  )
}

export default function TreeLinesLab() {
  const [theme, setTheme] = useState(() => (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  const [interval, setIntervalS] = useState(3)
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
