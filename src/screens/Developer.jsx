import { useState } from 'react'
import { lessonLogFor, snapshotRows } from '../lib/snapshot.js'
import { getAll } from '../lib/store.js'
import { course as running } from '../lib/course.js'
import { IconBack } from './icons.jsx'
import { TL } from '../lib/course.js'

// The Developer area (Dan, 2026-11-10): everything for building and testing Tamago, out of Settings and away from the
// learning tools. Testing controls first, then one large accordion per document: Course Snapshot (built from the
// content in this version), Model Story, Craft Rubric, Latest Grades, Test Notes, Feature List, Question Types,
// Build Phases, Autonomous Brief, Check-In. The documents load the first time one is opened.
// "Show Developer in Tools" hides the entry before testers; https://…/#developer always opens this page.
function Segmented({ label, help, value, options, onChange }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="font-medium">{label}</legend>
      {help && <p className="-mt-1 text-sm text-muted">{help}</p>}
      <div className="flex overflow-hidden rounded-xl border-2 border-line">
        {options.map(([v, text]) => (
          <button key={v} aria-pressed={value === v} onClick={() => onChange(v)}
            className={`min-h-11 flex-1 px-2 text-sm ${value === v ? 'bg-orange font-semibold text-white' : 'bg-surface'}`}>{text}</button>
        ))}
      </div>
    </fieldset>
  )
}

function Accordion({ title, onOpen, children }) {
  return (
    <details className="dev-accordion rounded-xl border-2 border-line bg-surface" onToggle={(e) => { if (e.currentTarget.open) onOpen?.() }}>
      <summary className="cursor-pointer px-5 py-4 text-lg font-semibold">{title}</summary>
      <div className="border-t-2 border-line px-5 py-4">{children}</div>
    </details>
  )
}

// Course Snapshot: the courses side by side, French, Spanish and German, from each one's shipped tables. The course not
// running is loaded only when the accordion opens.
function CourseSnapshot({ snapshot }) {
  const [rows, setRows] = useState(null)
  const load = () => {
    if (rows) return
    // Each course's lesson log on this device, for the hours estimate: the running course from its own store, the
    // other only if its database already exists here.
    const logOf = (id, db) => (running.id === id ? getAll('lessons') : lessonLogFor(db))
    Promise.all([import('../lib/tables-fr.js'), import('../lib/tables-es.js'), import('../lib/tables-de.js'), logOf('fr', 'tamago'), logOf('es', 'tamago-es'), logOf('de', 'tamago-de')]).then(([fr, es, de, frLog, esLog, deLog]) => {
      const a = snapshotRows(fr.tables, 'French', { lessonLog: frLog }); const b = snapshotRows(es.tables, 'Spanish', { lessonLog: esLog }); const c = snapshotRows(de.tables, 'German', { lessonLog: deLog })
      setRows(a.map(([label, v], i) => [label, v, b[i][1], c[i][1]]))
    })
  }
  return (
    <Accordion title="Course Snapshot" onOpen={load}>
      <p className="mb-3 text-sm text-muted">This version, built {snapshot.built}. Workbooks: French {snapshot.workbooks.fr}, Spanish {snapshot.workbooks.es}, German {snapshot.workbooks.de}.</p>
      {!rows ? <p>Loading…</p> : (
        <div className="doc"><div className="doc-table" tabIndex={0} role="region" aria-label="Course Snapshot">
          <table>
            <thead><tr><th scope="col"></th><th scope="col">French</th><th scope="col">Spanish</th><th scope="col">German</th></tr></thead>
            <tbody>
              {rows.map(([label, fr, es, de]) => <tr key={label}><th scope="row">{label}</th><td>{fr}</td><td>{es}</td><td>{de}</td></tr>)}
            </tbody>
          </table>
        </div></div>
      )}
    </Accordion>
  )
}

// Picture Check (Dan, 2026-11-10): Dan's pictures against the rows of _source/image-list.md, before any go into a
// lesson (scripts/picture-check.mjs). Loaded the first time the accordion opens; the images load as they scroll in.
function PictureCheck() {
  const [data, setData] = useState(null)
  const load = () => { if (!data) import('../dev/picture-check.json').then((m) => setData(m.default)) }
  return (
    <Accordion title="Picture Check" onOpen={load}>
      {!data ? <p>Loading…</p> : (
        <>
          <p className="mb-4 text-sm text-muted">
            {data.images} pictures against the {data.rows} rows of image-list.md, {data.made}. {Object.entries(data.counts).map(([k, n]) => `${k} ${n}`).join(' · ')}. {data.cards.filter((c) => c.decision === 'use').length} are in lessons (your picks); the rest are alternates or on hold.
            Matched: the file is named as its row. Guessed: Claude's guess from the picture. No Match: no row fits. Missing: a row with no picture yet.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.cards.map((c, i) => (
              <li key={i} className="flex flex-col gap-2 rounded-xl border-2 border-line p-3">
                {c.image
                  ? <img src={c.image} alt={c.english ? `Picture for ${c.french}, ${c.english}` : 'Picture with no matching row'} loading="lazy" className="aspect-square w-full rounded-lg bg-white object-contain" />
                  : <div className="flex aspect-square w-full items-center justify-center rounded-lg border-2 border-dashed border-field p-4 text-center text-sm text-muted">To draw: {c.draw}</div>}
                <p className="flex items-baseline justify-between gap-2">
                  <span><span lang="fr" className="text-lg font-semibold">{c.french || '—'}</span>{c.spanish && c.spanish !== c.french ? <span lang="es" className="text-lg"> · {c.spanish}</span> : null}{c.also?.length ? <span className="text-sm text-muted"> (also {c.also.join(', ')})</span> : null}</span>
                  <span className="rounded-full border-2 border-line px-2 text-sm text-muted">{c.status}</span>
                </p>
                <p className="-mt-1 text-muted">{c.english}</p>
                {c.decision && <p className="text-sm">{c.decision === 'use' ? 'In lessons.' : `${c.decision[0].toUpperCase()}${c.decision.slice(1)}.`}</p>}
                {c.note && <p className="text-sm text-muted">{c.note}</p>}
                {c.source && <p className="text-xs break-all text-muted">{c.source}</p>}
              </li>
            ))}
          </ul>
        </>
      )}
    </Accordion>
  )
}

function Doc({ doc, lib, loadLib }) {
  const [html, setHtml] = useState(null)
  const open = async () => {
    if (html !== null) return
    const l = lib ?? await loadLib()
    setHtml(await l.renderDoc(l.DOCS.find((d) => d.id === doc.id)))
  }
  return (
    <Accordion title={doc.title} onOpen={open}>
      <div className="doc" dangerouslySetInnerHTML={{ __html: html ?? '<p>Loading…</p>' }} />
    </Accordion>
  )
}

// The document list without loading the renderer: titles only, in the order of devnotes.js.
const TITLES = [['model-story', 'Model Story'], ['craft-review', 'Craft Rubric'], ['grades', 'Latest Grades'], ['test-notes', 'Test Notes'], ['features', 'Feature List'],
  ['question-types', 'Question Types'], ['build-phases', 'Build Phases'], ['autonomous-build', 'Autonomous Brief'], ['check-in', 'Check-In']]

export default function Developer({ settings, onChange, snapshot, onBack, onVariants, onFlags, onNativeCheck, onForum }) {
  const [lib, setLib] = useState(null)
  const loadLib = () => import('../lib/devnotes.js').then((l) => { setLib(l); return l })
  const docFor = (id) => lib?.DOCS.find((d) => d.id === id) ?? { id, title: TITLES.find((t) => t[0] === id)[1] }
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-10 lg:max-w-4xl">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Developer</h1>
      </header>
      <p className="-mt-3 text-sm text-muted">For building and testing Tamago. Not part of the course.</p>

      <section className="flex flex-col gap-5 rounded-xl border-2 border-dashed border-field p-5">
        <h2 className="text-lg font-semibold">Testing</h2>
        <Segmented label="Testing Shortcuts" help="Swipe left from the right side of the screen, or press the right arrow, to pass a question as correct. Passes are marked as tests." value={settings.test_shortcuts}
          options={[['on', 'On'], ['off', 'Off']]} onChange={(v) => onChange({ test_shortcuts: v })} />
        <Segmented label="Show Developer in Tools" help={`Off hides this page's entry before testers. It stays open at ${location.origin}/#developer`} value={settings.developer ?? 'on'}
          options={[['on', 'On'], ['off', 'Off']]} onChange={(v) => onChange({ developer: v })} />
        <div className="grid gap-2 sm:grid-cols-2">
          <button onClick={onVariants} className="btn-secondary">Variant Test Bank</button>
          <button onClick={onFlags} className="btn-secondary">Flag Review</button>
          <button onClick={onNativeCheck} className="btn-secondary">Native-Speaker Check</button>
          <button onClick={onForum} className="btn-secondary">Forum</button>
        </div>
      </section>

      <div className="flex flex-col gap-3">
        <CourseSnapshot snapshot={snapshot} />
        <PictureCheck />
        {TITLES.map(([id]) => <Doc key={id} doc={docFor(id)} lib={lib} loadLib={loadLib} />)}
      </div>
    </main>
  )
}
