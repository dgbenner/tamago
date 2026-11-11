import { createContext, useContext, useEffect, useId, useRef, useState } from 'react'
import { LogoInline, SushiMark } from './Logo.jsx'
import { IconBars, IconBook, IconCode, IconCheckered, IconClose, IconComment, IconGear, IconLock, IconStudy, IconVerb } from './icons.jsx'
import { TL, course } from '../lib/course.js'
import { FlagRow } from './Languages.jsx'
import CircleNode from './CircleNode.jsx'

// A tree node is a circle (Circle Lab design, approved 2026-11-10; src/screens/CircleNode.jsx): its sushi on a warm
// disc, one ring that fills across all its lessons, the title. "Start Here" and "Your Progress" show on the first
// circle only, the first time; a "?" stands for Your Topic until one is chosen.
function Node({ node, onPick, onTestPass }) {
  const { unit, open, circle, strength, topic, marker } = node
  return (
    <CircleNode title={unit.title} icon={unit.icon_file ? `/icons/${unit.icon_group}/${unit.icon_file}` : null} glyph={topic?.choosing ? '?' : null}
      locked={!open} lessonsDone={circle.done} lessonsTotal={circle.total} recall={strength?.items > 0 ? strength.recall : null} marker={marker}
      onPick={() => onPick(node)} onTestPass={onTestPass && node.open && !node.topic?.choosing ? () => onTestPass(node.unit.unit_id) : null} />
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
  // No unit numbers or rounds on screen (Circle Lab, 2026-11-10): the circle's lessons, counted across all of them.
  const where = reached >= 5 ? 'Every lesson here is done. Lessons from here are practice.'
    : `Lesson ${Math.min(node.circle.done + 1, node.circle.total)} of ${node.circle.total}. Each lesson is a step harder than the one before.`
  return (
    <Sheet onClose={onClose}>
      {/* Until a pack is chosen the kicker says what to do and the title is the node's name; never the same words twice. */}
      <SheetHead kicker={topic ? (topic.choosing ? 'Choose a Topic' : 'Your Topic') : null} title={listing && !topic.choosing ? 'Choose a Topic' : unit.title} onClose={onClose} />
      {listing ? <>
        <p className="mt-2 text-muted">Words and sentences on one subject. You can switch later; each topic keeps its progress.</p>
        <TopicList topic={topic} current={topic.choosing ? null : unit.unit_id} onChoose={onChooseTopic} />
      </> : !open ? <>
        <p className="mt-2 text-muted">{unit.grammar_point}</p>
        <p className="mt-4">Locked for now. It opens when you've finished the first lessons of {lockedBy}.</p>
        <p className="mt-2 text-sm text-muted">These open in order, so each one builds on the words before it. Know some {course.name} already? The placement check in Settings can open several at once.</p>
      </> : <>
        <p className="mt-2 text-muted">{unit.grammar_point}</p>
        <p className="mt-3 text-sm text-muted">{where}</p>
        {hasNote && <button onClick={onGrammarNote} className="btn-secondary mt-4 w-full">Grammar Note</button>}
        {topic && <button onClick={() => setSwitching(true)} className="btn-secondary mt-3 w-full">Change Topic</button>}
        <button onClick={onStart} className="btn-submit mt-5 w-full">{inProgress ? `Start ${unit.title}` : label}</button>
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
      <p className="mt-2">A short review of everything above it:</p>
      <ul className="mt-2 flex flex-col gap-1">{cp.units.map((t) => <li key={t} className="font-medium">{t}</li>)}</ul>
      <p className="mt-2 text-sm text-muted">Ten questions, the ones you're likeliest to have forgotten first. It never locks anything, so you can skip it and come back any time.</p>
      {cp.available
        ? <button onClick={onStart} className="btn-submit mt-5 w-full">{cp.done ? 'Take It Again' : 'Start Checkpoint'}</button>
        : <p className="mt-4 text-sm">It opens when you've finished the first lessons of each of those.</p>}
      {!cp.done && <button onClick={onSkip} className="btn-secondary mt-3 w-full">Skip</button>}
    </Sheet>
  )
}

// The final A1 check (finalcheck.js): after the whole tree, its sheet names the exam it's modeled on, the four
// parts, the last result per skill, and links to the official free sample papers.
function FinalNode({ fc, onPick }) {
  return (
    <button onClick={onPick} className={`inline-flex items-center gap-2 rounded-full border-2 border-line px-4 py-1.5 font-semibold ${fc.available || fc.last ? 'text-ink' : 'text-muted'}`}>
      <span className="[&_svg]:size-4"><IconCheckered /></span>
      A1 Final Check
      {fc.last && <span className="text-right-ink">✓</span>}
    </button>
  )
}
function FinalCard({ fc, onStart, onClose }) {
  const s = fc.last?.scores
  return (
    <Sheet onClose={onClose}>
      <SheetHead kicker={`Modeled on the ${fc.exam.name}`} title="A1 Final Check" onClose={onClose} />
      <p className="mt-2">Four parts, in the order of the {fc.exam.name}: listening, reading, writing, then speaking. Every question uses this course's own sentences, from all of its units.</p>
      <p className="mt-2 text-sm text-muted">Listening, reading and writing are scored. Speaking is practice and never graded. It never locks anything; take it as often as you like.</p>
      {s && (
        <div className="mt-4">
          <p className="text-sm text-muted">Last time, {fc.last.date}:</p>
          <ul className="mt-1 flex flex-col gap-0.5">
            {['listening', 'reading', 'writing'].map((k) => <li key={k}><span className="font-medium capitalize">{k}</span> {s[k]?.right ?? 0} of {s[k]?.total ?? 0}</li>)}
            <li><span className="font-medium">Speaking</span> practised, not graded</li>
          </ul>
        </div>
      )}
      {fc.available
        ? <button onClick={onStart} className="btn-submit mt-5 w-full">{fc.last ? 'Take It Again' : 'Start the Final Check'}</button>
        : <p className="mt-4 text-sm">It opens when you've finished the first lessons of every unit.</p>}
      <a href={fc.exam.samples} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-3 flex w-full items-center justify-center">Official {fc.exam.name} Sample Papers</a>
      <p className="mt-1 text-center text-xs text-muted">Free, from the {fc.exam.body}. Opens their site.</p>
    </Sheet>
  )
}

// Conversation scenes (Dan, 2026-11-10): three per course, after the second help circle. Claude speaks a little
// above the learner's level so that asking for help is the practice. Never graded, never locks anything.
function ScenesNode({ sc, onPick }) {
  const done = sc.scenes.filter((x) => x.done).length
  return (
    <button onClick={onPick} className={`inline-flex items-center gap-2 rounded-full border-2 border-line px-4 py-1.5 font-semibold ${sc.available ? 'text-ink' : 'text-muted'}`}>
      <span className="[&_svg]:size-4"><IconComment /></span>
      Conversations
      {done > 0 && <span className="text-sm font-normal text-muted">{done} of {sc.scenes.length}</span>}
    </button>
  )
}
function ScenesCard({ sc, onStart, onClose }) {
  return (
    <Sheet onClose={onClose}>
      <SheetHead kicker="Talk with Claude" title="Conversations" onClose={onClose} />
      <p className="mt-2">Short scenes, spoken or typed. Claude speaks a little above your level on purpose, so use the help phrases: slower, again, what does it mean.</p>
      <p className="mt-2 text-sm text-muted">Each starts with its key words. Never graded; new words go to your Glossary.</p>
      {sc.available ? (
        <ul className="mt-4 flex flex-col gap-2">
          {sc.scenes.map((x) => (
            <li key={x.id}>
              <button onClick={() => onStart(x)} className="flex w-full items-center justify-between rounded-xl border-2 border-line bg-surface p-3 text-left">
                <span className="font-semibold">{x.title}</span>
                {x.done && <span className="text-right-ink" aria-label="done">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      ) : <p className="mt-4 text-sm">They open when you've finished the first lessons of Asking About Words.</p>}
    </Sheet>
  )
}

// A1 in parts (A1 Complete, 2026-11-10). The part review closes a part: ten questions over its circles, never
// locking anything. Then the cap, and the next part as one banner: its title and what it covers, not its circles.
function PartReviewCard({ part, onStart, onClose }) {
  const r = part.review
  return (
    <Sheet onClose={onClose}>
      <SheetHead kicker={r.done ? 'Passed' : 'Optional'} title={`Part ${part.n} Review`} onClose={onClose} />
      <p className="mt-2">A short review of Part {part.n}, {part.title}:</p>
      <ul className="mt-2 flex flex-col gap-1">{r.units.map((t) => <li key={t} className="font-medium">{t}</li>)}</ul>
      <p className="mt-2 text-sm text-muted">Ten questions, the ones you're likeliest to have forgotten first. It never locks anything.</p>
      {r.available
        ? <button onClick={onStart} className="btn-submit mt-5 w-full">{r.done ? 'Take It Again' : 'Start the Review'}</button>
        : <p className="mt-4 text-sm">It opens when you've finished the first lessons of every circle in this part.</p>}
    </Sheet>
  )
}
function PartEnd({ part, onReview, onPartView }) {
  const next = part.next
  return (
    <>
      {part.review && (
        <li>
          <button onClick={onReview} className={`inline-flex items-center gap-2 rounded-full border-2 border-line px-4 py-1.5 font-semibold ${part.review.available ? 'text-ink' : 'text-muted'}`}>
            <span className="[&_svg]:size-4"><IconCheckered /></span>
            Part {part.n} Review
            {part.review.done && <span className="text-right-ink">✓</span>}
          </button>
        </li>
      )}
      <li className="flex w-full items-center gap-3 text-sm font-semibold text-muted" aria-label={`End of A1, Part ${part.n} of ${part.total}`}>
        <span className="h-0.5 flex-1 bg-line" />
        <span>End of A1 · Part {part.n} of {part.total}</span>
        <span className="h-0.5 flex-1 bg-line" />
      </li>
      {next && (
        <li className="w-full">
          <div className={`flex flex-col gap-1 rounded-2xl border-2 border-line bg-surface p-4 ${next.unlocked && next.built ? '' : 'opacity-80'}`}>
            <p className="flex items-center gap-2 text-sm text-muted">
              {!(next.unlocked && next.built) && <span className="[&_svg]:size-4"><IconLock /></span>}
              A1 · Part {next.n} of {part.total}
            </p>
            <p className="text-lg font-semibold">{next.title}</p>
            <p className="text-sm text-muted">{next.summary}</p>
            {next.unlocked && next.built
              ? <button onClick={() => onPartView(next.n)} className="btn-submit mt-3">Go to Part {next.n}</button>
              : <p className="mt-2 text-sm">{next.unlocked ? 'Being written. It opens here as soon as it\'s ready.' : `Opens when every circle in Part ${part.n} has finished its first lessons.`}</p>}
          </div>
        </li>
      )}
    </>
  )
}
// The part switcher, at the top of the tree once more than one part is open.
function PartSwitcher({ part, onPartView }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-semibold text-muted">A1 · Part {part.n} of {part.total}{part.title ? `: ${part.title}` : ''}</p>
      {part.switcher.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Parts">
          {part.switcher.map((x) => (
            <button key={x.n} onClick={() => onPartView(x.n)} aria-pressed={x.n === part.n} aria-label={`Part ${x.n}: ${x.title}`}
              className={`rounded-full border-2 px-3 py-1 text-sm ${x.n === part.n ? 'border-orange bg-orange text-white' : 'border-line bg-surface'}`}>Part {x.n}</button>
          ))}
        </div>
      )}
    </div>
  )
}

export function CheckpointNode({ cp, onPick }) {
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

const TOOL_ICONS = { glossary: IconBook, verbs: IconVerb, study: IconStudy, progress: IconBars, developer: IconCode }
// The secondary menu: tools beside the path, as a sideways strip of tiles, out of the tree. (Progress has its own
// quiet button on a phone; on a wide screen it joins the panel's list.)
function Tools({ tools }) {
  return (
    <nav aria-label="Tools" className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 lg:hidden">
      {tools.filter((t) => t.id !== 'progress').map((t) => {
        const Icon = TOOL_ICONS[t.id]
        return (
          // Developer is quieter: dashed outline, no fill, muted text; not a learning tool.
          <button key={t.id} onClick={t.onOpen} className={`flex w-24 shrink-0 snap-start flex-col items-center gap-1 rounded-xl border-2 px-2 py-2.5 text-sm ${t.quiet ? 'border-dashed border-field bg-transparent text-muted' : 'border-line bg-surface font-medium'}`}>
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
          <button key={t.id} onClick={t.onOpen} className={`flex items-start gap-3 rounded-xl border-2 p-3 text-left hover:border-muted ${t.quiet ? 'mt-3 border-dashed border-field bg-transparent text-muted' : 'border-line bg-surface'}`}>
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

export default function Home({ wide, panel, rows, markers, pointsToday, pointsTotal, showPoints, streakLine, tools, onProgress, checkpoints, onCheckpoint, onSkipCheckpoint,
  finalCheck, onFinal, scenes, onScene, onTestPass, part, onPartView, onPartReview, practice, onPractice, nextLabel, onNext, inProgress, lastLine, onLastLineGone, onStartUnit, onSettings, onChooseTopic, onGrammarNote, hasNote }) {
  const [picked, setPicked] = useState(null)
  const [cpPicked, setCpPicked] = useState(null)
  const [practiceNote, setPracticeNote] = useState(false)
  const [languages, setLanguages] = useState(false)
  const [finalOpen, setFinalOpen] = useState(false)
  const [scenesOpen, setScenesOpen] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  return (
    <main className="home">
      {/* Pinned, and short: points, the wordmark, settings. On a wide screen the logo (with its sushi) sits left and
          the utilities right, like a desktop site. */}
      <header className="bar-top home-header -mx-4 flex items-center justify-between gap-3 px-4 pt-[max(2px,env(safe-area-inset-top))] pb-0 lg:mx-0 lg:px-0 lg:pt-[2.5px]">
        {/* The course flag (points sat here until they were hidden): opens the language pop-up. */}
        <span className="hdr-lang flex w-20 items-center justify-start gap-2 lg:order-2 lg:w-auto lg:justify-end lg:-translate-x-[2px]">
          {showPoints && <Points total={pointsTotal} today={pointsToday} />}
          <button onClick={() => setLanguages(true)} aria-label={`Language: ${course.name}`} className="icon-btn -ml-2 lg:ml-0"><img src={course.flag} alt="" className="h-8 w-8 object-contain" /></button>
        </span>
        <span className="hdr-brand flex items-center gap-2 lg:order-1 lg:mr-auto lg:ml-[2px] lg:gap-[3px]">
          <SushiMark className="hdr-sushi relative hidden w-11 lg:block lg:w-[2.18rem] lg:-top-[2px]" />
          <LogoInline className="hdr-wordmark" />
        </span>
        <span className="hdr-gear flex w-20 justify-end lg:order-3 lg:w-auto lg:-ml-[1.1rem] lg:-translate-x-[2px]"><button onClick={onSettings} aria-label="Settings" className="icon-btn -mr-2"><IconGear /></button></span>
      </header>

      <div className="home-path">
        <h1 className="sr-only">Tamago: your path</h1>

      <Tools tools={tools} />

      {/* The streak if on, and Progress as a low-emphasis button on a phone. The level caption ("Starting Out") is gone
          (Dan, 2026-11-10): the tree's level markers say where you are. On a wide screen with no streak the row is empty. */}
      <div className={`flex items-center justify-between gap-3 ${streakLine ? '' : 'lg:hidden'}`}>
        <p className="text-sm text-muted">{streakLine}</p>
        <button onClick={onProgress} className="btn-tertiary -mr-2 lg:hidden">Progress</button>
      </div>

      {/* The tree: rows of one, two or three units, with checkpoints and level markers between them. */}
      {/* At least a circle's height (6rem) of empty space between a row's titles and whatever comes next; the path scrolls. */}
      {part && <PartSwitcher part={part} onPartView={onPartView} />}
      <ol className="home-tree flex flex-1 flex-col items-center gap-y-[2.7rem] pt-[1.9rem] pb-24 lg:[&>li]:[zoom:1.11]">
        {rows.map((row, i) => {
          const n = row.row ?? i + 1 // the row's own number, not its place in the list
          const cp = checkpoints.find((x) => x.afterRow === n)
          const marker = markers.find((m) => m.beforeRow === n)
          return [
            marker && <Marker key={`m${i}`} label={marker.label} />,
            <li key={i} className="flex justify-center gap-4 lg:gap-[4.9rem]">
              {row.map((node) => <Node key={node.unit.unit_id} node={node} onPick={setPicked} onTestPass={onTestPass} />)}
            </li>,
            cp && <li key={`cp${i}`}><CheckpointNode cp={cp} onPick={setCpPicked} /></li>,
            scenes && scenes.afterRow === n && <li key={`sc${i}`}><ScenesNode sc={scenes} onPick={() => setScenesOpen(true)} /></li>,
          ]
        })}
        {finalCheck && <li><FinalNode fc={finalCheck} onPick={() => setFinalOpen(true)} /></li>}
        {part && <PartEnd part={part} onReview={() => setReviewOpen(true)} onPartView={onPartView} />}
        {markers.filter((m) => m.beforeRow > (rows.at(-1)?.row ?? rows.length)).map((m) => <Marker key={m.label} label={m.label} />)}
      </ol>

      {/* Pinned to the bottom, with a line above, so they're always on screen. */}
      <div className="bar-bottom -mx-4 mt-auto flex flex-col gap-3 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
        {/* The last lesson's score, "8 of 9": one line just above the bar that fades by itself; no screen, no tap.
            It floats, so nothing moves when it goes. */}
        {lastLine && <p role="status" className="result-line" onAnimationEnd={onLastLineGone}>{lastLine}</p>}
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
      {reviewOpen && part?.review && <PartReviewCard part={part} onClose={() => setReviewOpen(false)} onStart={() => { setReviewOpen(false); onPartReview() }} />}
      {scenesOpen && <ScenesCard sc={scenes} onClose={() => setScenesOpen(false)} onStart={(x) => { setScenesOpen(false); onScene(x) }} />}
      {finalOpen && <FinalCard fc={finalCheck} onClose={() => setFinalOpen(false)} onStart={() => { setFinalOpen(false); onFinal() }} />}
      {languages && (
        <Sheet onClose={() => setLanguages(false)}>
          <SheetHead title="Language" onClose={() => setLanguages(false)} />
          <p className="mt-2 mb-4 text-muted">Each language keeps its own progress.</p>
          <FlagRow />
        </Sheet>
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
