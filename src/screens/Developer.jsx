import { useState } from 'react'
import { IconBack } from './icons.jsx'

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
        <Accordion title="Course Snapshot">
          <p className="mb-3 text-sm text-muted">This version, built {snapshot.built} from workbook {snapshot.workbook}.</p>
          <div className="doc"><div className="doc-table" tabIndex={0} role="region" aria-label="Course Snapshot">
            <table>
              <tbody>
                {snapshot.rows.map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}
              </tbody>
            </table>
          </div></div>
        </Accordion>
        {TITLES.map(([id]) => <Doc key={id} doc={docFor(id)} lib={lib} loadLib={loadLib} />)}
      </div>
    </main>
  )
}
