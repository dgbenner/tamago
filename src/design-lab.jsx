// Design Lab (Dan, 2026-11-10): the real app with a slider panel over it. Every slider sets one CSS variable on <html>;
// design-lab.css reads them and overrides the live styles. Runs only on the dev server at /design-lab.html, which is not
// a build entry, so none of this deploys. Values persist in localStorage (tamago-design-lab) so a reload keeps them.
import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './design-lab.css'

// The app's own opening screen is skipped (the lab shows it on demand, held), and a course is always chosen.
try {
  sessionStorage.setItem('tamago-skip-splash', '1')
  if (!localStorage.getItem('tamago-course')) localStorage.setItem('tamago-course', 'fr')
} catch { /* private mode */ }

const STORE = 'tamago-design-lab'

// Every control: key (the CSS variable is --lab-<key>), label, range, unit and the live app's current value as default.
// Root font is 17px on desktop, so rem values are given here in px at that size.
const SECTIONS = [
  {
    title: 'Opening Screen', note: 'Tick "Show opening screen" above to see it, held with the language choice.',
    groups: [
      { title: 'Wordmark and sushi', controls: [
        { key: 'splash-width', label: 'Stack width', min: 200, max: 700, step: 2, unit: 'px', def: 380 },
        { key: 'splash-y', label: 'Stack up / down', min: -300, max: 300, step: 1, unit: 'px', def: 0 },
        { key: 'splash-wordmark', label: 'Wordmark width', min: 40, max: 140, step: 1, unit: '%', def: 100 },
        { key: 'splash-sushi', label: 'Sushi width', min: 10, max: 100, step: 1, unit: '%', def: 40 },
        { key: 'splash-sushi-x', label: 'Sushi left / right', min: -200, max: 200, step: 1, unit: 'px', def: 0 },
        { key: 'splash-overlap', label: 'Sushi overlap (up is negative)', min: -40, max: 30, step: 0.5, unit: '%', def: -9 },
      ] },
      { title: 'Choose Your Language', controls: [
        { key: 'choose-top', label: 'Space above', min: 0, max: 160, step: 1, unit: 'px', def: 34 },
        { key: 'choose-x', label: 'Left / right', min: -300, max: 300, step: 1, unit: 'px', def: 0 },
        { key: 'choose-y', label: 'Up / down', min: -300, max: 300, step: 1, unit: 'px', def: 0 },
        { key: 'choose-scale', label: 'Scale', min: 0.4, max: 2, step: 0.01, unit: '', def: 1 },
        { key: 'choose-title', label: 'Title size', min: 12, max: 40, step: 0.5, unit: 'px', def: 21.25 },
        { key: 'choose-gap', label: 'Title to flags', min: 0, max: 60, step: 1, unit: 'px', def: 17 },
        { key: 'flag-size', label: 'Flag size', min: 30, max: 160, step: 1, unit: 'px', def: 85 },
        { key: 'flag-gap', label: 'Between flags', min: 0, max: 80, step: 1, unit: 'px', def: 17 },
        { key: 'flag-label', label: 'Flag label size', min: 10, max: 24, step: 0.5, unit: 'px', def: 14.875 },
      ] },
    ],
  },
  {
    title: 'Home Header',
    groups: [
      { title: 'Bar', controls: [
        { key: 'hdr-pt', label: 'Padding above', min: 0, max: 60, step: 0.5, unit: 'px', def: 6.4 },
        { key: 'hdr-pb', label: 'Padding below', min: 0, max: 60, step: 0.5, unit: 'px', def: 6.4 },
      ] },
      { title: 'Left: sushi and wordmark', controls: [
        { key: 'brand-x', label: 'Left / right', min: -100, max: 300, step: 1, unit: 'px', def: 0 },
        { key: 'brand-y', label: 'Up / down', min: -60, max: 60, step: 1, unit: 'px', def: 0 },
        { key: 'brand-scale', label: 'Scale (both)', min: 0.4, max: 2.5, step: 0.01, unit: '', def: 1 },
        { key: 'brand-sushi', label: 'Sushi width', min: 16, max: 140, step: 1, unit: 'px', def: 46.75 },
        { key: 'brand-sushi-y', label: 'Sushi up / down', min: -40, max: 40, step: 1, unit: 'px', def: 0 },
        { key: 'brand-wordmark', label: 'Wordmark width', min: 40, max: 300, step: 1, unit: 'px', def: 103 },
        { key: 'brand-gap', label: 'Sushi to wordmark', min: -20, max: 60, step: 1, unit: 'px', def: 8.5 },
      ] },
      { title: 'Right: flag and gear', controls: [
        { key: 'tools-x', label: 'Left / right', min: -300, max: 100, step: 1, unit: 'px', def: 0 },
        { key: 'tools-y', label: 'Up / down', min: -60, max: 60, step: 1, unit: 'px', def: 0 },
        { key: 'tools-scale', label: 'Scale (both)', min: 0.4, max: 2.5, step: 0.01, unit: '', def: 1 },
        { key: 'tools-flag', label: 'Flag size', min: 16, max: 80, step: 1, unit: 'px', def: 34 },
        { key: 'tools-gear', label: 'Gear size', min: 16, max: 80, step: 1, unit: 'px', def: 24 },
        { key: 'tools-gap', label: 'Flag to gear', min: -20, max: 80, step: 1, unit: 'px', def: 12.75 },
      ] },
    ],
  },
  {
    title: 'Tree',
    groups: [
      { title: 'Circles', controls: [
        { key: 'tree-gap', label: 'Vertical spacing (between rows)', min: 0, max: 260, step: 1, unit: 'px', def: 102 },
        { key: 'tree-row-gap', label: 'Sideways spacing (within a row)', min: 0, max: 120, step: 1, unit: 'px', def: 17 },
        { key: 'circle-scale', label: 'Circle scale (title scales with it)', min: 0.4, max: 2.2, step: 0.01, unit: '', def: 1 },
        { key: 'tree-top', label: 'Space above the tree', min: 0, max: 160, step: 1, unit: 'px', def: 4.25 },
      ] },
    ],
  },
]
const ALL = SECTIONS.flatMap((s) => s.groups.flatMap((g) => g.controls))
const DEFAULTS = Object.fromEntries(ALL.map((c) => [c.key, c.def]))

const load = () => { try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORE) ?? '{}') } } catch { return { ...DEFAULTS } } }
const apply = (values) => {
  const root = document.documentElement
  for (const c of ALL) root.style.setProperty(`--lab-${c.key}`, `${values[c.key]}${c.unit}`)
}

function Slider({ c, value, onChange }) {
  const changed = value !== c.def
  return (
    <label className={`lab-row ${changed ? 'lab-changed' : ''}`}>
      <span className="lab-label">{c.label}</span>
      <input type="range" min={c.min} max={c.max} step={c.step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      <input type="number" min={c.min} max={c.max} step={c.step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      <span className="lab-unit">{c.unit}</span>
      <button type="button" title="Reset" disabled={!changed} onClick={() => onChange(c.def)}>↺</button>
    </label>
  )
}

function Panel({ splash, setSplash }) {
  const [values, setValues] = useState(load)
  const [open, setOpen] = useState(true)
  const [side, setSide] = useState('right')
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  const [copied, setCopied] = useState(false)
  useEffect(() => { apply(values); try { localStorage.setItem(STORE, JSON.stringify(values)) } catch { /* */ } }, [values])
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  const set = (key, v) => setValues((s) => ({ ...s, [key]: v }))
  const changedOnly = Object.fromEntries(ALL.filter((c) => values[c.key] !== c.def).map((c) => [c.key, `${values[c.key]}${c.unit}`]))
  const text = JSON.stringify(changedOnly, null, 2)
  const copy = async () => { try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1200) } catch { /* */ } }
  if (!open) return <button className="lab-reopen" onClick={() => setOpen(true)}>Lab</button>
  return (
    <aside className={`lab-panel lab-${side}`}>
      <header className="lab-head">
        <strong>Design Lab</strong>
        <span className="lab-head-tools">
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? 'Light' : 'Dark'}</button>
          <button onClick={() => setSide(side === 'right' ? 'left' : 'right')}>{side === 'right' ? '◀' : '▶'}</button>
          <button onClick={() => setOpen(false)}>Hide</button>
        </span>
      </header>
      <label className="lab-toggle"><input type="checkbox" checked={splash} onChange={(e) => setSplash(e.target.checked)} /> Show opening screen</label>
      {SECTIONS.map((s) => (
        <details key={s.title} open>
          <summary>{s.title}</summary>
          {s.note && <p className="lab-note">{s.note}</p>}
          {s.groups.map((g) => (
            <fieldset key={g.title}>
              <legend>{g.title} <button type="button" className="lab-reset" onClick={() => setValues((v) => ({ ...v, ...Object.fromEntries(g.controls.map((c) => [c.key, c.def])) }))}>reset</button></legend>
              {g.controls.map((c) => <Slider key={c.key} c={c} value={values[c.key]} onChange={(v) => set(c.key, v)} />)}
            </fieldset>
          ))}
        </details>
      ))}
      <details>
        <summary>Values changed from live ({Object.keys(changedOnly).length})</summary>
        <textarea readOnly value={text} rows={Math.min(14, Math.max(3, Object.keys(changedOnly).length + 2))} />
        <div className="lab-actions">
          <button onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
          <button onClick={() => setValues({ ...DEFAULTS })}>Reset all</button>
        </div>
      </details>
    </aside>
  )
}

// The app first (its own entry's steps), then the panel beside it, and the opening screen held over both on demand.
const tablesFor = { fr: () => import('./lib/tables-fr.js'), es: () => import('./lib/tables-es.js'), de: () => import('./lib/tables-de.js') }
const [{ course }, { useTables }] = await Promise.all([import('./lib/course.js'), import('./lib/content.js')])
const { tables } = await tablesFor[course.id]()
useTables(tables)
const [{ default: App }, { default: Splash }] = await Promise.all([import('./App.jsx'), import('./screens/Splash.jsx')])

function Lab() {
  const [splash, setSplash] = useState(false)
  return (
    <>
      {splash && <Splash onDone={() => {}} choose />}
      <Panel splash={splash} setSplash={setSplash} />
    </>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
createRoot(document.getElementById('lab')).render(<StrictMode><Lab /></StrictMode>)
document.addEventListener('touchstart', () => {}, { passive: true })
