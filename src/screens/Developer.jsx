import { useEffect, useState } from 'react'
import { audioState, courseVoiceInfo, cueStatus } from '../lib/audio.js'
import { lessonLogFor, snapshotRows } from '../lib/snapshot.js'
import { getAll, resetEverything, resetLanguage } from '../lib/store.js'
import { course as running } from '../lib/course.js'
import { IconBack } from './icons.jsx'
import Backup from './Backup.jsx'
import FlaggedAnswers from './FlaggedAnswers.jsx'
import { site, version } from '../lib/version.js'
import { COURSES, PARKED, TL, course, jumpInCourse } from '../lib/course.js'
import partsFr from '../content/parts.json'
import partsEs from '../content-es/parts.json'
import partsDe from '../content-de/parts.json'
import partsIt from '../content-it/parts.json'
import partsPt from '../content-pt/parts.json'
import partsNl from '../content-nl/parts.json'
import partsPl from '../content-pl/parts.json'
import partsNo from '../content-no/parts.json'
import partsDa from '../content-da/parts.json'
import partsSv from '../content-sv/parts.json'

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

// Course Snapshot: the courses side by side, French, Spanish, German, Italian, Portuguese and Dutch, from each one's shipped tables. The course not
// running is loaded only when the accordion opens.
function CourseSnapshot({ snapshot }) {
  const [rows, setRows] = useState(null)
  const load = () => {
    if (rows) return
    // Each course's lesson log on this device, for the hours estimate: the running course from its own store, the
    // other only if its database already exists here.
    const logOf = (id, db) => (running.id === id ? getAll('lessons') : lessonLogFor(db))
    Promise.all([import('../lib/tables-fr.js'), import('../lib/tables-es.js'), import('../lib/tables-de.js'), import('../lib/tables-it.js'), import('../lib/tables-pt.js'), import('../lib/tables-nl.js'), import('../lib/tables-sv.js'), import('../lib/tables-da.js'), import('../lib/tables-no.js'), import('../lib/tables-pl.js'), logOf('fr', 'tamago'), logOf('es', 'tamago-es'), logOf('de', 'tamago-de'), logOf('it', 'tamago-it'), logOf('pt', 'tamago-pt'), logOf('nl', 'tamago-nl'), logOf('sv', 'tamago-sv'), logOf('da', 'tamago-da'), logOf('no', 'tamago-no'), logOf('pl', 'tamago-pl')]).then(([fr, es, de, it, pt, nl, sv, da, no, pl, frLog, esLog, deLog, itLog, ptLog, nlLog, svLog, daLog, noLog, plLog]) => {
      const a = snapshotRows(fr.tables, 'French', { lessonLog: frLog }); const b = snapshotRows(es.tables, 'Spanish', { lessonLog: esLog }); const c = snapshotRows(de.tables, 'German', { lessonLog: deLog }); const d = snapshotRows(it.tables, 'Italian', { lessonLog: itLog }); const e = snapshotRows(pt.tables, 'Portuguese', { lessonLog: ptLog }); const f = snapshotRows(nl.tables, 'Dutch', { lessonLog: nlLog }); const g = snapshotRows(sv.tables, 'Swedish', { lessonLog: svLog }); const h = snapshotRows(da.tables, 'Danish', { lessonLog: daLog }); const j = snapshotRows(no.tables, 'Norwegian', { lessonLog: noLog }); const k = snapshotRows(pl.tables, 'Polish', { lessonLog: plLog })
      setRows(a.map(([label, v], i) => [label, v, b[i][1], c[i][1], d[i][1], e[i][1], f[i][1], g[i][1], h[i][1], j[i][1], k[i][1]]))
    })
  }
  return (
    <Accordion title="Course Snapshot" onOpen={load}>
      <p className="mb-3 text-sm text-muted">This version, built {snapshot.built}. Workbooks: French {snapshot.workbooks.fr}, Spanish {snapshot.workbooks.es}, German {snapshot.workbooks.de}, Italian {snapshot.workbooks.it}, Portuguese {snapshot.workbooks.pt}, Dutch {snapshot.workbooks.nl}, Swedish {snapshot.workbooks.sv}, Danish {snapshot.workbooks.da}, Norwegian {snapshot.workbooks.no}, Polish {snapshot.workbooks.pl}.</p>
      {!rows ? <p>Loading…</p> : (
        <div className="doc"><div className="doc-table" tabIndex={0} role="region" aria-label="Course Snapshot">
          <table>
            <thead><tr><th scope="col"></th><th scope="col">French</th><th scope="col">Spanish</th><th scope="col">German</th><th scope="col">Italian</th><th scope="col">Portuguese</th><th scope="col">Dutch</th><th scope="col">Swedish</th><th scope="col">Danish</th><th scope="col">Norwegian</th><th scope="col">Polish</th></tr></thead>
            <tbody>
              {rows.map(([label, fr, es, de, it, pt, nl, sv, da, no, pl]) => <tr key={label}><th scope="row">{label}</th><td>{fr}</td><td>{es}</td><td>{de}</td><td>{it}</td><td>{pt}</td><td>{nl}</td><td>{sv}</td><td>{da}</td><td>{no}</td><td>{pl}</td></tr>)}
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

// Jump to Part (Dan, 2026-11-11): for each language, a button per part that marks every circle in the earlier parts
// as round 1 complete and opens that part, as Dev: Jump Here does on the tree. Another language opens first (a
// reload), then jumps. A part with no circles yet can't be jumped to.
const PARTS = { fr: partsFr, es: partsEs, de: partsDe, it: partsIt, pt: partsPt, nl: partsNl, pl: partsPl, no: partsNo, da: partsDa, sv: partsSv }
function JumpToPart({ onJumpPart }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold">Jump to Part</p>
      {COURSES.filter((c) => c.ready).map((c) => (
        <div key={c.id} role="group" aria-label={`Jump to a part of ${c.name}`} className="flex flex-col gap-2">
          <p className="text-sm text-muted">{c.name}{c.id === course.id ? ' (this language)' : ''}</p>
          <div className="flex flex-wrap gap-2">
            {[...PARTS[c.id]].sort((a, b) => a.part - b.part).map((p) => {
              const built = p.status === 'live'
              return (
                <button key={p.part} disabled={!built} title={built ? p.title : `${p.title}: no circles built yet`}
                  aria-label={`Jump to ${c.name} Part ${p.part}, ${p.title}${built ? '' : ', not built yet'}`}
                  onClick={() => (c.id === course.id ? onJumpPart(p.part) : jumpInCourse(c.id, p.part))}
                  className="dev-jump disabled:opacity-40">Part {p.part}</button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// Two resets (Dan, 2026-11-13; Reset Progress before), each asking on the page first.
//   Reset This Language: this course only, back to first use (Start Here again); other courses and settings stay.
//   Reset Everything: every course, settings, sign-in and the offline copy; reloads as a brand-new user.
// The device voice in use for sentences without a recording (Dan, 2026-11-15): the best the device has, remembered per
// language. The list can fill late (iOS), so it asks again when the voices change.
function DeviceVoice() {
  const [info, setInfo] = useState(() => courseVoiceInfo())
  const [sounds, setSounds] = useState(() => cueStatus())
  useEffect(() => {
    const again = () => setInfo(courseVoiceInfo())
    window.speechSynthesis?.addEventListener?.('voiceschanged', again)
    const t = setTimeout(again, 800)
    const tick = setInterval(() => setSounds(cueStatus()), 1000) // the sound line follows what the last taps did
    return () => { window.speechSynthesis?.removeEventListener?.('voiceschanged', again); clearTimeout(t); clearInterval(tick) }
  }, [])
  // Interface sounds (2026-11-15): files through audio elements. Their state and last error show here because the
  // iPhone they failed on can't be reached from a debugger: this line is what gets read back.
  const when = (at) => new Date(at).toLocaleTimeString()
  const soundLine = [
    sounds.on ? 'on' : 'off in Settings',
    sounds.players ? `${sounds.ready} of ${sounds.players} files ready` : 'players not made yet (tap once)',
    `audio session ${sounds.session}`,
    `last asked: ${sounds.last ?? 'none'}`,
    `heard playing: ${sounds.heard}`,
  ].filter(Boolean).join(' · ')
  return <p data-device-voice className="text-sm">Device Voice ({course.name}): {info ? <><span className="font-medium">{info.name}</span> · {info.lang} · {info.grade}</> : 'none found'}<span data-sound-state className="block text-muted">Interface Sounds (audio files): {soundLine}</span><span data-sound-error className="block text-muted">Last Sound Error: {sounds.error ? `${sounds.error.cue}: ${sounds.error.error} (${when(sounds.error.at)})` : 'none'}</span><span data-audio-state className="block text-muted">Recordings: Web Audio {audioState()}</span></p>
}

// The labs (Dan, 2026-11-15): built and deployed with the app, listed only while Developer is on.
const LABS = [['Sound Lab', '/lab/sounds/'], ['Circle Lab', '/lab.html'], ['Design Lab', '/design-lab.html'], ['Voice Lab', '/voice-lab.html']]
function Labs() {
  return (
    <div role="group" aria-labelledby="labs-h" className="flex flex-col gap-2">
      <h3 id="labs-h" className="font-medium">Labs</h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {LABS.map(([name, href]) => <a key={href} href={href} target="_blank" rel="noopener" className="btn-secondary text-center" data-lab={href}>{name}</a>)}
      </div>
    </div>
  )
}

function ResetButton({ id, label, title, text, confirm, run }) {
  const [asking, setAsking] = useState(false)
  const [busy, setBusy] = useState(false)
  if (!asking) return <button onClick={() => setAsking(true)} className="btn-secondary" data-reset={id}>{label}</button>
  return (
    <div role="alertdialog" aria-labelledby={`${id}-h`} aria-describedby={`${id}-d`} className="flex flex-col gap-3 rounded-xl border-2 border-wrong p-4">
      <p id={`${id}-h`} className="font-semibold">{title}</p>
      <p id={`${id}-d`} className="text-sm">{text}</p>
      <div className="flex gap-2">
        <button autoFocus onClick={() => setAsking(false)} className="btn-secondary flex-1">Cancel</button>
        <button disabled={busy} onClick={async () => { setBusy(true); await run() }} className="btn-submit flex-1" data-reset-confirm={id}>{confirm}</button>
      </div>
    </div>
  )
}
function Resets() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <ResetButton id="reset-language" label="Reset This Language" title={`Reset ${course.name}?`}
        text={`${course.name} goes back to first use on this device: every lesson, score, word met, review item and checkpoint, and Start Here returns. It can't be undone. Settings, flags and the other languages stay as they are.`}
        confirm={`Reset ${course.name}`} run={async () => { await resetLanguage(); window.location.replace('/') }} />
      <ResetButton id="reset-everything" label="Reset Everything" title="Reset everything?"
        text="Every language's progress, all settings, the sign-in and the offline copy are cleared from this device, and Tamago opens as it does for a brand-new user. It can't be undone."
        confirm="Reset Everything" run={async () => { await resetEverything([...COURSES.map((c) => c.db), ...PARKED.map((c) => c.db), 'tamago-accounts-mock']); window.location.replace('/') }} />
    </div>
  )
}

export default function Developer({ settings, onChange, snapshot, onBack, onVariants, onFlags, onNativeCheck, onForum, onTryA1, onJumpPart, onAcceptAnswer }) {
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
      <p className="-mt-3"><span data-version>Version {version.name} · Deploy {version.number}</span>{site && <> <span data-site className="site-tag">{site}</span></>}</p>

      <section className="flex flex-col gap-5 rounded-xl border-2 border-dashed border-field p-5">
        <h2 className="text-lg font-semibold">Testing</h2>
        <DeviceVoice />
        <Segmented label="Testing Shortcuts" help="In a lesson: swipe left from the right side of the screen, or press the right arrow, to pass a question as correct. On the tree: swipe a circle right to left, or press the right arrow while it has focus, to pass its next lesson without playing it. Passes are marked as tests." value={settings.test_shortcuts}
          options={[['on', 'On'], ['off', 'Off']]} onChange={(v) => onChange({ test_shortcuts: v })} />
        <Segmented label="Show Developer in Tools" help={`Off hides this page's entry before testers. It stays open at ${location.origin}/#developer`} value={settings.developer ?? 'on'}
          options={[['on', 'On'], ['off', 'Off']]} onChange={(v) => onChange({ developer: v })} />
        <div className="grid gap-2 sm:grid-cols-2">
          <button onClick={onVariants} className="btn-secondary">Variant Test Bank</button>
          <button onClick={onFlags} className="btn-secondary">Flag Review</button>
          <button onClick={onNativeCheck} className="btn-secondary">Native-Speaker Check</button>
          <button onClick={onForum} className="btn-secondary">Forum</button>
          <button onClick={onTryA1} className="btn-secondary sm:col-span-2">Try the A1 Task Types</button>
        </div>
        {(settings.developer ?? 'on') === 'on' && <Labs />}
        <FlaggedAnswers onAccept={onAcceptAnswer} />
        <JumpToPart onJumpPart={onJumpPart} />
        <Backup />
        <Resets />
      </section>

      <div className="flex flex-col gap-3">
        <CourseSnapshot snapshot={snapshot} />
        <PictureCheck />
        {TITLES.map(([id]) => <Doc key={id} doc={docFor(id)} lib={lib} loadLib={loadLib} />)}
      </div>
    </main>
  )
}
