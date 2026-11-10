import { createContext, useContext, useEffect, useId, useRef, useState } from 'react'
import { LogoInline, SushiMark } from './Logo.jsx'
import { IconBars, IconBook, IconCheckered, IconClose, IconGear, IconLock, IconStudy, IconVerb } from './icons.jsx'

// Rounds as a ring of five segments around the unit circle, filling as rounds finish (Dan's test notes). Strength
// (FSRS, 0 to 4 bars) is folded in: the finished segments fade as the unit's recall drops.
const STRENGTH_OPACITY = { 4: 1, 3: 0.75, 2: 0.5, 1: 0.3 }
const R = 46
const C = 2 * Math.PI * R
const GAP = 7 // degrees between segments
function RoundRing({ reached, strength, locked }) {
  const bars = strength?.items > 0 ? strength.bars : null
  const opacity = bars ? STRENGTH_OPACITY[bars] ?? 0.3 : 1
  const seg = (C * (72 - GAP)) / 360
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx="50" cy="50" r={R} fill="none" strokeWidth="7" strokeLinecap="round"
          stroke={!locked && i < reached ? 'var(--green)' : 'var(--line)'} strokeOpacity={!locked && i < reached ? opacity : 1}
          strokeDasharray={`${seg} ${C}`} transform={`rotate(${-90 + GAP / 2 + i * 72} 50 50)`} />
      ))}
    </svg>
  )
}

// A tree node is a unit: a circle with its sushi (a lock until it opens, a "?" for Your Topic until one is chosen),
// the ring of rounds, and the title. The unit you're on has an orange halo.
function Node({ node, onPick }) {
  const { unit, open, progress, current, strength, topic } = node
  const icon = unit.icon_file ? `/icons/${unit.icon_group}/${unit.icon_file}` : null
  const reached = progress.round_reached
  const label = `${unit.title}. ${open ? `${reached} of 5 rounds finished` : 'Locked'}${open && strength?.items > 0 ? `, strength ${strength.bars} of 4` : ''}`
  return (
    <button onClick={() => onPick(node)} aria-label={label} className="flex w-32 flex-col items-center gap-1.5">
      <span className={`relative flex size-24 items-center justify-center rounded-full ${current && open ? 'outline-2 outline-offset-2 outline-orange' : ''}`}>
        <RoundRing reached={reached} strength={open ? strength : null} locked={!open} />
        {!open
          ? <span className="text-muted [&_svg]:size-8"><IconLock /></span>
          : topic?.choosing
            ? <span className="text-4xl font-semibold text-muted">?</span>
            : icon ? <img src={icon} alt="" className="size-16 object-contain" /> : null}
      </span>
      <span className={`text-base font-semibold leading-tight ${open ? '' : 'text-muted'}`}>{unit.title}</span>
    </button>
  )
}

// The Your Topic node: pick one topic pack. Each pack keeps its own progress, so switching loses nothing.
function TopicList({ topic, current, onChoose }) {
  return (
    <ul className="mt-4 flex flex-col gap-2">
      {topic.packs.map((p) => (
        <li key={p.unit_id}>
          <button onClick={() => onChoose(p.unit_id)} className={`choice flex w-full items-center justify-between ${p.unit_id === current ? 'border-orange' : ''}`}>
            <span>{p.title}</span>
            {p.started && <span className="text-xs text-muted">Started</span>}
          </button>
        </li>
      ))}
    </ul>
  )
}

// A bottom sheet on a phone (a centred pop-up on wider screens). A modal dialog (WCAG 2.1.2, 2.4.3, 4.1.2): named by
// its heading, focus moves into it, Tab stays inside, Escape closes it, and focus goes back to what opened it.
export function Sheet({ onClose, children }) {
  const ref = useRef(null)
  const titleId = useId()
  useEffect(() => {
    const opener = document.activeElement
    const box = ref.current
    const focusables = () => [...box.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), select, textarea, [tabindex]:not([tabindex="-1"])')]
    ;(focusables().find((el) => !el.matches('[aria-label=Close]')) ?? focusables()[0])?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
      if (e.key !== 'Tab') return
      const list = focusables()
      if (!list.length) return
      const first = list[0]
      const last = list.at(-1)
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); if (opener?.isConnected) opener.focus({ preventScroll: true }) }
  }, [])
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <section ref={ref} role="dialog" aria-modal="true" aria-labelledby={titleId} className="sheet" onClick={(e) => e.stopPropagation()}>
        <SheetTitle.Provider value={titleId}>{children}</SheetTitle.Provider>
      </section>
    </div>
  )
}
const SheetTitle = createContext(null)
function SheetHead({ kicker, title, onClose }) {
  const id = useContext(SheetTitle)
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        {kicker && <p className="text-sm text-muted">{kicker}</p>}
        <h2 id={id} className="text-xl font-semibold">{title}</h2>
      </div>
      <button onClick={onClose} aria-label="Close" className="icon-btn -mr-2 -mt-2"><IconClose /></button>
    </div>
  )
}

// Unit details. The unit number lives here and nowhere else on home.
function UnitCard({ node, inProgress, onStart, onClose, onGrammarNote, hasNote, onChooseTopic }) {
  const { unit, open, progress, topic, lockedBy, lesson, lessons } = node
  const [switching, setSwitching] = useState(false)
  const listing = topic && open && (topic.choosing || switching)
  const reached = progress.round_reached
  const label = reached >= 5 ? 'Practice Again' : reached > 0 || progress.lessons_done > 0 ? 'Next Lesson' : 'Start Lesson'
  const where = reached >= 5 ? 'All five rounds are done. Lessons from here are practice.'
    : `Each unit has five rounds, each a step harder than the last. You're on round ${reached + 1}, lesson ${lesson} of ${lessons}.`
  return (
    <Sheet onClose={onClose}>
      <SheetHead kicker={topic ? 'Your Topic' : `Unit ${unit.order}`} title={listing ? 'Choose a Topic' : unit.title} onClose={onClose} />
      {listing ? <>
        <p className="mt-2 text-muted">Words and sentences on one subject. You can switch later; each topic keeps its progress.</p>
        <TopicList topic={topic} current={topic.choosing ? null : unit.unit_id} onChoose={onChooseTopic} />
      </> : !open ? <>
        <p className="mt-2 text-muted">{unit.grammar_point}</p>
        <p className="mt-4">Locked for now. It opens when you've finished round 1 of {lockedBy}.</p>
        <p className="mt-2 text-sm text-muted">Units open in order, so each one builds on the words before it. Know some French already? The placement check in Settings can open several at once.</p>
      </> : <>
        <p className="mt-2 text-muted">{unit.grammar_point}</p>
        <p className="mt-3 text-sm text-muted">{where}</p>
        {hasNote && <button onClick={onGrammarNote} className="btn-secondary mt-4 w-full">Grammar Note</button>}
        {topic && <button onClick={() => setSwitching(true)} className="btn-secondary mt-3 w-full">Change Topic</button>}
        <button onClick={onStart} className="btn-submit mt-5 w-full">{inProgress ? 'Start This Unit' : label}</button>
        {inProgress && <p className="mt-2 text-center text-xs text-muted">Your lesson in progress is set aside.</p>}
      </>}
    </Sheet>
  )
}

// A checkpoint: an optional review of the units above it. The details, and Skip, are on its sheet.
function CheckpointCard({ cp, onStart, onSkip, onClose }) {
  return (
    <Sheet onClose={onClose}>
      <SheetHead kicker={cp.done ? 'Passed' : cp.skipped ? 'Skipped' : 'Optional'} title="Checkpoint" onClose={onClose} />
      <p className="mt-2">A short review of the units above it:</p>
      <ul className="mt-2 flex flex-col gap-1">{cp.units.map((t) => <li key={t} className="font-medium">{t}</li>)}</ul>
      <p className="mt-2 text-sm text-muted">Ten questions, the ones you're likeliest to have forgotten first. It never locks anything, so you can skip it and come back any time.</p>
      {cp.available
        ? <button onClick={onStart} className="btn-submit mt-5 w-full">{cp.done ? 'Take It Again' : 'Start Checkpoint'}</button>
        : <p className="mt-4 text-sm">It opens when you've finished round 1 of each of those units.</p>}
      {!cp.done && <button onClick={onSkip} className="btn-secondary mt-3 w-full">Skip</button>}
    </Sheet>
  )
}

function CheckpointNode({ cp, onPick }) {
  return (
    <button onClick={() => onPick(cp)} className={`inline-flex items-center gap-2 rounded-full border-2 border-line px-3 py-1 text-sm ${cp.available || cp.done ? 'text-ink' : 'text-muted'}`}>
      <span className="[&_svg]:size-4"><IconCheckered /></span>
      Checkpoint
      {cp.done && <span className="text-right-ink">✓</span>}
      {cp.skipped && !cp.done && <span className="text-xs text-muted">Skipped</span>}
    </button>
  )
}

// A level marker across the tree, like a date divider in a feed.
function Marker({ label }) {
  return (
    <li className="flex w-full items-center gap-3 text-sm text-muted" aria-label={`Level: ${label}`}>
      <span className="h-0.5 flex-1 bg-line" />
      <span className="italic">{label}</span>
      <span className="h-0.5 flex-1 bg-line" />
    </li>
  )
}

const TOOL_ICONS = { glossary: IconBook, verbs: IconVerb, study: IconStudy, progress: IconBars }
// The secondary menu: tools beside the path, as a sideways strip of tiles, out of the tree. (Progress has its own
// quiet button on a phone; on a wide screen it joins the panel's list.)
function Tools({ tools }) {
  return (
    <nav aria-label="Tools" className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 lg:hidden">
      {tools.filter((t) => t.id !== 'progress').map((t) => {
        const Icon = TOOL_ICONS[t.id]
        return (
          <button key={t.id} onClick={t.onOpen} className="flex w-24 shrink-0 snap-start flex-col items-center gap-1 rounded-xl border-2 border-line bg-surface px-2 py-2.5 text-sm font-medium">
            <span className="[&_svg]:size-7"><Icon /></span>
            {t.label}
          </button>
        )
      })}
    </nav>
  )
}

// The right-hand panel on a wide screen: each tool with a line on what it's for; a tool opens here, in place.
function ToolMenu({ tools }) {
  return (
    <nav aria-label="Tools" className="flex flex-col gap-2">
      <h2 className="mb-1 text-lg font-semibold">Tools</h2>
      {tools.map((t) => {
        const Icon = TOOL_ICONS[t.id]
        return (
          <button key={t.id} onClick={t.onOpen} className="flex items-start gap-3 rounded-xl border-2 border-line bg-surface p-3 text-left hover:border-muted">
            <span className="mt-0.5 shrink-0 [&_svg]:size-6"><Icon /></span>
            <span className="flex flex-col gap-0.5">
              <span className="font-semibold">{t.label}</span>
              <span className="text-sm text-muted">{t.about}</span>
            </span>
          </button>
        )
      })}
    </nav>
  )
}

// Points: one style at every value, zero included.
function Points({ total, today }) {
  return (
    <span className="inline-flex min-w-11 items-center justify-center gap-1.5 rounded-full bg-[#1f6dfb] px-2.5 py-1 text-sm font-semibold text-white" title={`${total} points in all, ${today} today`} aria-label={`${total} points`}>
      <span className="size-2.5 rounded-full bg-white/80" aria-hidden="true" />{total}
    </span>
  )
}

export default function Home({ wide, panel, rows, markers, levelLabel, pointsToday, pointsTotal, showPoints, streakLine, logoState, tools, onProgress, checkpoints, onCheckpoint, onSkipCheckpoint,
  practice, onPractice, nextLabel, onNext, inProgress, lastLine, onStartUnit, onSettings, onChooseTopic, onGrammarNote, hasNote }) {
  const [picked, setPicked] = useState(null)
  const [cpPicked, setCpPicked] = useState(null)
  const [practiceNote, setPracticeNote] = useState(false)
  return (
    <main className="home">
      {/* Pinned, and short: points, the wordmark, settings. On a wide screen the logo (with its sushi) sits left and
          the utilities right, like a desktop site. */}
      <header className="bar-top home-header -mx-4 flex items-center justify-between gap-3 px-4 pt-[max(0.25rem,env(safe-area-inset-top))] pb-1 lg:mx-0 lg:px-0 lg:py-1.5">
        <span className="flex w-20 justify-start lg:order-2 lg:w-auto lg:justify-end">{showPoints && <Points total={pointsTotal} today={pointsToday} />}</span>
        <span className={`flex items-center gap-2 lg:order-1 lg:mr-auto ${logoState === 'wait' ? 'logo-wait' : logoState === 'arrive' ? 'logo-arrive' : ''}`}>
          <SushiMark className="hidden w-11 lg:block" />
          <LogoInline />
        </span>
        <span className="flex w-20 justify-end lg:order-3 lg:w-auto"><button onClick={onSettings} aria-label="Settings" className="icon-btn -mr-2"><IconGear /></button></span>
      </header>

      <div className="home-path">
        <h1 className="sr-only">Tamago: your path</h1>

      <Tools tools={tools} />

      {/* Where you are, quietly: the level in italics, and Progress as a low-emphasis button. */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted"><span className="italic">{levelLabel}</span>{streakLine && <span> · {streakLine}</span>}</p>
        <button onClick={onProgress} className="btn-tertiary -mr-2 lg:hidden">Progress</button>
      </div>

      {/* The tree: rows of one, two or three units, with checkpoints and level markers between them. */}
      <ol className="flex flex-1 flex-col items-center gap-5 pt-1 pb-4">
        {rows.map((row, i) => {
          const cp = checkpoints.find((x) => x.afterRow === i + 1)
          const marker = markers.find((m) => m.beforeRow === i + 1)
          return [
            marker && <Marker key={`m${i}`} label={marker.label} />,
            <li key={i} className="flex justify-center gap-4">
              {row.map((node) => <Node key={node.unit.unit_id} node={node} onPick={setPicked} />)}
            </li>,
            cp && <li key={`cp${i}`}><CheckpointNode cp={cp} onPick={setCpPicked} /></li>,
          ]
        })}
        {markers.filter((m) => m.beforeRow > rows.length).map((m) => <Marker key={m.label} label={m.label} />)}
      </ol>

      {/* Pinned to the bottom, with a line above, so they're always on screen. */}
      <div className="bar-bottom -mx-4 mt-auto flex flex-col gap-3 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
        {/* The last lesson's score sits here instead of on a screen of its own (craft review, fix 12). */}
        {lastLine && <p className="text-center text-sm text-muted">{lastLine}</p>}
        <div className="bottom-buttons">
          <button onClick={() => (practice.ready ? onPractice() : setPracticeNote(true))} className="btn-secondary">
            Practice{practice.mistakes ? ` · ${practice.mistakes} ${practice.mistakes === 1 ? 'Mistake' : 'Mistakes'}` : ''}
          </button>
          <button onClick={onNext} className="btn-submit">{nextLabel}</button>
        </div>
      </div>

      </div>

      {wide && (
        <aside className="home-panel" aria-label={panel ? undefined : 'Tools'}>
          {panel
            ? <div className="panel-screen">
                {panel}
              </div>
            : <ToolMenu tools={tools} />}
        </aside>
      )}

      {picked && (
        <UnitCard node={picked} inProgress={inProgress && !picked.current}
          onStart={() => { setPicked(null); onStartUnit(picked.unit.unit_id) }} onClose={() => setPicked(null)}
          onChooseTopic={(id) => { setPicked(null); onChooseTopic(id) }}
          hasNote={hasNote(picked.unit.unit_id)} onGrammarNote={() => { setPicked(null); onGrammarNote(picked.unit.unit_id) }} />
      )}
      {cpPicked && (
        <CheckpointCard cp={cpPicked} onClose={() => setCpPicked(null)}
          onStart={() => { setCpPicked(null); onCheckpoint(cpPicked.afterRow) }}
          onSkip={() => { setCpPicked(null); onSkipCheckpoint(cpPicked.afterRow) }} />
      )}
      {practiceNote && (
        <Sheet onClose={() => setPracticeNote(false)}>
          <SheetHead title="Practice" onClose={() => setPracticeNote(false)} />
          <p className="mt-2">Practice brings back your mistakes first, then the things you're likeliest to forget.</p>
          <p className="mt-2 text-sm text-muted">There's nothing to bring back yet. Do a lesson or two and it fills up.</p>
          <button onClick={() => { setPracticeNote(false); onNext() }} className="btn-submit mt-5 w-full">{nextLabel}</button>
        </Sheet>
      )}
    </main>
  )
}
