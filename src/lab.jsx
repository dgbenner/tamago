// Circle Lab (Dan, 2026-11-10): the new tree circle, every state, a live circle with sliders, and a sample tree in
// light and dark. Runs only on the dev server at /lab.html; lab.html is not a build entry, so it never deploys.
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import CircleNode, { circleLine, firstCircleMarker } from './screens/CircleNode.jsx'
import { CheckpointNode } from './screens/Home.jsx'
import './index.css'
import './lab.css'

const icon = (group, file) => `/sushi/${group}/${file}`
const TOTAL = 26 // lessons across a circle's five rounds, about what a unit has

const STATES = [
  { label: 'Locked', note: 'Opens when the circles above it are done.', props: { locked: true } },
  { label: 'Not started', note: 'Open, no lessons yet.', props: { lessonsDone: 0 } },
  { label: 'In progress', note: 'The ring fills with every lesson.', props: { lessonsDone: 11, recall: 0.9 } },
  { label: 'Start Here', note: 'First use only: the first circle, before any lesson.', props: { lessonsDone: 0, marker: 'start' } },
  { label: 'Your Progress', note: 'Once, after the first lesson, to point out the ring. Then never again.', props: { lessonsDone: 1, recall: 1, marker: 'progress' } },
  { label: 'Finished', note: 'Every lesson done, remembered well.', props: { lessonsDone: TOTAL, recall: 0.95 } },
  { label: 'Finished, fading', note: 'Recall has dropped: time to practise.', props: { lessonsDone: TOTAL, recall: 0.55 } },
]

function States() {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
      {STATES.map((s) => (
        <li key={s.label} className="flex flex-col items-center gap-2 rounded-xl border-2 border-line bg-surface p-3 text-center">
          <CircleNode title="Saying Hello" icon={icon('nigiri', 'salmon-nigiri-3.webp')} lessonsTotal={TOTAL} {...s.props} />
          <p className="font-semibold">{s.label}</p>
          <p className="text-sm text-muted">{s.note}</p>
        </li>
      ))}
    </ul>
  )
}

function Live() {
  const [done, setDone] = useState(7)
  const [recall, setRecall] = useState(85)
  const props = { lessonsDone: done, lessonsTotal: TOTAL, recall: recall / 100 }
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border-2 border-line bg-surface p-5 sm:flex-row sm:items-start sm:gap-8">
      <div className="flex flex-col items-center gap-2">
        <CircleNode title="Saying Hello" icon={icon('nigiri', 'salmon-nigiri-3.webp')} marker={firstCircleMarker(done)} {...props} />
        <p className="text-sm" role="status">{circleLine(props)}</p>
      </div>
      <div className="flex w-full max-w-sm flex-col gap-4">
        <label className="flex flex-col gap-1"><span className="font-medium">Lessons done: {done} of {TOTAL}</span>
          <input type="range" min="0" max={TOTAL} value={done} onChange={(e) => setDone(Number(e.target.value))} /></label>
        <label className="flex flex-col gap-1"><span className="font-medium">Recall: {recall}%</span>
          <input type="range" min="0" max="100" value={recall} onChange={(e) => setRecall(Number(e.target.value))} /></label>
        <p className="text-sm text-muted">The ring fills across all the lessons, however many there are. Once it's full, recall below about 80% makes it fade. This is the learner's first circle, so it says Start Here at 0 lessons and Your Progress after the first; from the second lesson on, no marker.</p>
      </div>
    </div>
  )
}

// A short tree: the same rows as home (one, then pairs), a checkpoint after the second row.
const TREE = [
  [{ title: 'Saying Hello', icon: icon('nigiri', 'salmon-nigiri-3.webp'), lessonsDone: TOTAL, recall: 0.95 }],
  [{ title: 'People and Things', icon: icon('nigiri', 'amaebi-nigiri.webp'), lessonsDone: TOTAL, recall: 0.9 }, { title: 'Polite Phrases', icon: icon('nigiri', 'anago-nigiri.webp'), lessonsDone: TOTAL, recall: 0.55 }],
  'checkpoint',
  [{ title: 'Food and Drink', icon: icon('nigiri', 'chutoro-nigiri.webp'), lessonsDone: 8, recall: 0.85 }, { title: 'Pets and Animals', icon: icon('maki', 'california-roll.webp'), lessonsDone: 0 }],
  [{ title: 'More Than One', locked: true }, { title: 'Describing Things', locked: true }],
  [{ title: 'Going Places', locked: true }],
]
function Tree({ theme }) {
  return (
    <section className={`${theme === 'dark' ? 'lab-dark' : 'lab-light'} flex flex-col gap-3 rounded-2xl border-2 border-line p-4`} aria-label={`Sample tree, ${theme}`}>
      <h3 className="font-semibold">{theme === 'dark' ? 'Dark' : 'Light'}</h3>
      <ol className="flex flex-col items-center gap-24">
        {TREE.map((row, i) => row === 'checkpoint'
          ? <li key={i}><CheckpointNode cp={{ available: true, done: true }} onPick={() => {}} /></li>
          : <li key={i} className="flex justify-center gap-4">{row.map((c) => <CircleNode key={c.title} lessonsTotal={TOTAL} {...c} />)}</li>)}
      </ol>
    </section>
  )
}

function Lab() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6">
      <header>
        <h1 className="text-2xl font-semibold">Circle Lab</h1>
        <p className="text-muted">The tree circle, approved and live on the tree in both languages since November 10. This page runs on this Mac only. The circle is src/screens/CircleNode.jsx, the same component the tree uses: a warm off-white disc behind every sushi (faint when locked), one ring, and sushi trimmed and scaled to the same visible size (scripts/make-icons.mjs).</p>
      </header>
      <section className="flex flex-col gap-3"><h2 className="text-lg font-semibold">Every State</h2><States /></section>
      <section className="flex flex-col gap-3"><h2 className="text-lg font-semibold">Try It</h2><Live /></section>
      <section className="flex flex-col gap-3"><h2 className="text-lg font-semibold">Sample Tree</h2>
        <div className="grid gap-4 md:grid-cols-2"><Tree theme="light" /><Tree theme="dark" /></div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><Lab /></StrictMode>)
