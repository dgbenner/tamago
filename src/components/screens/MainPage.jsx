import { useEffect, useState } from 'react'
import Button from '../Button.jsx'
import CircleNode from '../CircleNode.jsx'
import LevelLine from '../LevelLine.jsx'
import PinnedAction from '../PinnedAction.jsx'
import { Sheet, SheetHead } from '../Sheet.jsx'
import { ToolPanel, ToolStrip } from '../ToolTile.jsx'
import TopBar from '../TopBar.jsx'
import { tools, tree } from './sample.js'

// The main page, built from the library's components only (design-system branch): the header, the tools, part of the
// tree (finished, in progress, not started, with a level line), the pinned Next Lesson, and a circle's sheet. The
// layout around them is Home.jsx's own: one column on a phone; from 1024px the tree and a tools panel beside it.
const WIDE = '(min-width: 1024px)'
const circles = tree.flatMap((r) => r.row ?? [])
export default function MainPage({ sheetFor = null, onOpen }) {
  const [wide, setWide] = useState(() => window.matchMedia(WIDE).matches)
  const [open, setOpen] = useState(sheetFor) // the id of the circle whose sheet is open
  useEffect(() => {
    const mq = window.matchMedia(WIDE)
    const update = () => setWide(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  const current = circles.find((c) => c.current)
  const node = circles.find((c) => c.id === open)
  const all = tools.map((t) => ({ ...t, onOpen: () => onOpen?.(t.label) }))
  return (
    <main data-screen="main" className="home">
      <TopBar flag="/flags/fr.webp" languageName="French" onLanguage={() => onOpen?.('Language')} onLogo={() => onOpen?.('Logo')} onSettings={() => onOpen?.('Settings')} />
      <div className="home-path">
        <h1 className="sr-only">Tamago: your path</h1>
        <ToolStrip tools={all} />
        <ol className="home-tree flex flex-1 flex-col items-center gap-y-[2.7rem] pt-[1.9rem] pb-24 lg:[&>li]:[zoom:1.11]">
          {tree.map((r, i) => (r.level
            ? <LevelLine key={i} label={r.level} />
            : (
              <li key={i} className="flex w-full justify-center gap-[min(4.9rem,6vw)]">
                {r.row.map((c) => <CircleNode key={c.id} title={c.title} icon={c.icon} lessonsDone={c.done} lessonsTotal={c.total} marker={null}
                  onPick={() => onOpen?.(`Lesson: ${c.title}`)} onInfo={() => setOpen(c.id)} onNote={c.current ? () => onOpen?.(`Grammar Note: ${c.title}`) : null} />)}
              </li>
            )))}
        </ol>
        <PinnedAction label={`Next Lesson: ${current.title}`} onClick={() => onOpen?.(`Lesson: ${current.title}`)} />
      </div>
      {wide && <aside className="home-panel" aria-label="Tools"><ToolPanel tools={all} /></aside>}
      {node && (
        <Sheet onClose={() => setOpen(null)}>
          <SheetHead kicker="About This Circle" title={node.title} onClose={() => setOpen(null)} />
          <p className="mt-2 text-muted">{node.about ?? 'Words and sentences on one subject, a step harder each lesson.'}</p>
          <p className="mt-3 text-sm text-muted">{node.done >= node.total ? 'Every lesson here is done. Lessons from here are practice.' : `Lesson ${node.done + 1} of ${node.total}. Each lesson is a step harder than the one before.`}</p>
          <div className="mt-5 flex flex-col items-center gap-1">
            <Button kind="main" className="w-full" onClick={() => { setOpen(null); onOpen?.(`Lesson: ${node.title}`) }}>{node.done >= node.total ? 'Practice Again' : node.done > 0 ? 'Next Lesson' : 'Start Lesson'}</Button>
            <Button kind="link" onClick={() => setOpen(null)}>Back</Button>
          </div>
        </Sheet>
      )}
    </main>
  )
}
