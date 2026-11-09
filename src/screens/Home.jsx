import { useState } from 'react'
import { LogoInline } from './Logo.jsx'
import { IconClose, IconGear } from './icons.jsx'

function Coin() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="#ffc21a" stroke="#c98a00" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="4" fill="none" stroke="#c98a00" strokeWidth="1.2" />
    </svg>
  )
}

// Five small segments, one per round finished.
function Rounds({ reached }) {
  return (
    <span className="flex gap-1" aria-label={`${reached} of 5 rounds finished`}>
      {[1, 2, 3, 4, 5].map((r) => <span key={r} className={`h-1.5 w-4 rounded-full ${r <= reached ? 'bg-green' : 'bg-line'}`} />)}
    </span>
  )
}

// A tree node is a unit: a circle with an icon slot, the title, and its rounds. The current unit says where it is.
// Strength: four bars that fall without practice (FSRS).
function StrengthBars({ bars }) {
  return (
    <span className="absolute -top-1 -right-3 flex h-4 items-end gap-0.5" aria-label={`Strength ${bars} of 4`}>
      {[1, 2, 3, 4].map((b) => <span key={b} className={`w-1 rounded-sm ${b <= bars ? 'bg-green' : 'bg-line'}`} style={{ height: `${b * 25}%` }} />)}
    </span>
  )
}

function Node({ node, onPick }) {
  const { unit, open, progress, current, lesson, lessons, strength, topic } = node
  const icon = unit.icon_file ? `/icons/${unit.icon_group}/${unit.icon_file}` : null
  return (
    <button onClick={() => onPick(node)} className={`flex w-36 flex-col items-center gap-1.5 ${open ? '' : 'opacity-40'}`}>
      <span className={`relative flex h-16 w-16 items-center justify-center rounded-full border-4 text-xl font-semibold ${!open ? 'border-line bg-line text-muted' : current ? 'border-orange text-orange' : progress.round_reached >= 5 ? (icon ? 'border-green' : 'border-green bg-green text-white') : 'border-line'}`}>
        {/* The unit's sushi icon (by difficulty); the number where a unit has none. The topic node waits for side art. */}
        {icon ? <img src={icon} alt="" className="size-12 object-contain" /> : topic ? null : unit.order}
        {open && strength?.items > 0 && <StrengthBars bars={strength.bars} />}
      </span>
      <span className="text-sm font-semibold leading-tight">{unit.title}</span>
      <Rounds reached={progress.round_reached} />
      {current && open && <span className="text-xs text-muted">{progress.round_reached >= 5 ? 'All rounds done' : `Round ${Math.min(progress.round_reached + 1, 5)} · Lesson ${lesson} of ${lessons}`}</span>}
    </button>
  )
}

// The Your topic node: pick one topic pack. Each pack keeps its own progress, so switching loses nothing.
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

function UnitCard({ node, lockedBy, inProgress, onStart, onClose, onGrammarNote, hasNote, onChooseTopic }) {
  const { unit, open, progress, topic } = node
  const [switching, setSwitching] = useState(false)
  const listing = topic && open && (topic.choosing || switching)
  const label = progress.round_reached >= 5 ? 'Practice' : progress.round_reached > 0 || progress.lessons_done > 0 ? 'Continue' : 'Start'
  return (
    <div className="fixed inset-0 z-30 flex items-end bg-black/30" onClick={onClose}>
      <section className="mx-auto w-full max-w-md rounded-t-2xl border-t-2 border-line bg-surface p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted">{topic ? 'Your topic' : `Unit ${unit.order}`}</p>
            <h2 className="text-xl font-semibold">{listing ? 'Choose a topic' : unit.title}</h2>
          </div>
          <button onClick={onClose} aria-label="Close" className="icon-btn -mr-2 -mt-2"><IconClose /></button>
        </div>
        {listing ? <>
          <p className="mt-2 text-muted">Words and sentences on one subject. You can switch later; each topic keeps its progress.</p>
          <TopicList topic={topic} current={topic.choosing ? null : unit.unit_id} onChoose={onChooseTopic} />
        </> : <>
        <p className="mt-2 text-muted">{unit.grammar_point}</p>
        {hasNote && <button onClick={onGrammarNote} className="btn-secondary mt-4 w-full">Grammar note</button>}
        {topic && open && <button onClick={() => setSwitching(true)} className="btn-secondary mt-4 w-full">Change topic</button>}
        {open
          ? <button onClick={onStart} className="btn-submit mt-5 w-full">{inProgress ? 'Start this unit' : label}</button>
          : <p className="mt-5 text-sm text-muted">Opens when {lockedBy} {lockedBy.includes(' and ') ? 'have' : 'has'} finished round 1.</p>}
        {open && inProgress && <p className="mt-2 text-center text-xs text-muted">Your lesson in progress is set aside.</p>}
        </>}
      </section>
    </div>
  )
}

export default function Home({ rows, points, pointsTotal, bankSize, inProgress, currentLabel, onContinue, onReview, onStartUnit, onSettings, onChooseTopic, lockedByOf, onGrammarNote, hasNote, showPoints, scores, streak, thisWeek, goal, onProgress, canPractice, onPractice, onWords, onVerbs, onMake, checkpoints, onCheckpoint }) {
  const [picked, setPicked] = useState(null)
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="relative flex min-h-11 items-center justify-center">
        {showPoints && <span className="absolute left-0 inline-flex items-center gap-1.5 rounded-full bg-[#1f6fff] px-2.5 py-1 text-sm font-semibold text-white" title={`${pointsTotal} points in all, ${points} today`}>
          <Coin />
          {pointsTotal}
        </span>}
        <LogoInline />
        <button onClick={onSettings} aria-label="Settings" className="icon-btn absolute right-0 -mr-2"><IconGear /></button>
      </header>

      {/* A short score line; the full picture is on the progress page. Streak and weekly goal only when on. */}
      <button onClick={onProgress} className="-mt-2 flex flex-col items-center gap-0.5 text-sm text-muted">
        <span>{['reading', 'listening', 'writing', 'speaking'].map((s) => `${s[0].toUpperCase()} ${scores[s].score.toFixed(1)}`).join(' · ')} · {scores.reading.band}</span>
        {showPoints && (streak > 1 || goal) && <span>{[streak > 1 && `${streak}-day streak`, goal && `${thisWeek} of ${goal} days this week`].filter(Boolean).join(' · ')}</span>}
      </button>

      <div className="grid w-full grid-cols-2 gap-2 [&>button]:whitespace-nowrap [&>button]:px-2">
        <button onClick={onPractice} disabled={!canPractice} className="btn-secondary min-h-10 px-4 text-sm">Practice weak skills</button>
        <button onClick={onWords} className="btn-secondary min-h-10 px-4 text-sm">Words</button>
        <button onClick={onVerbs} className="btn-secondary min-h-10 px-4 text-sm">Verbs</button>
        <button onClick={onMake} className="btn-secondary min-h-10 px-4 text-sm">Make</button>
      </div>

      {/* The tree: rows of one, two or three units, top to bottom. */}
      <ol className="flex flex-1 flex-col items-center gap-8 py-4">
        {rows.map((row, i) => {
          const cp = checkpoints.find((x) => x.afterRow === i + 1)
          return [
            <li key={i} className="flex justify-center gap-6">
              {row.map((node) => <Node key={node.unit.unit_id} node={node} onPick={setPicked} />)}
            </li>,
            cp && (
              // A review checkpoint: optional, never a lock.
              <li key={`cp${i}`}>
                <button onClick={() => onCheckpoint(cp.afterRow)} disabled={!cp.available}
                  className={`rounded-full border-4 px-4 py-1.5 text-sm font-semibold disabled:opacity-40 ${cp.done ? 'border-green text-right-ink' : 'border-line'}`}>
                  {cp.done ? '✓ ' : ''}Review checkpoint · {cp.label}
                </button>
              </li>
            ),
          ]
        })}
      </ol>

      {/* Pinned to the bottom so they're always on screen. */}
      <div className="sticky bottom-0 -mx-4 mt-auto flex flex-col gap-3 bg-bg px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button onClick={onReview} disabled={bankSize === 0} className="btn-secondary">
          Review{bankSize ? ` (${bankSize})` : ''}
        </button>
        <button onClick={onContinue} className="btn-submit">{inProgress ? 'Resume' : currentLabel}</button>
      </div>

      {picked && (
        <UnitCard node={picked} lockedBy={lockedByOf(picked.unit.unit_id)} inProgress={inProgress}
          onStart={() => { setPicked(null); onStartUnit(picked.unit.unit_id) }} onClose={() => setPicked(null)}
          onChooseTopic={(id) => { setPicked(null); onChooseTopic(id) }}
          hasNote={hasNote(picked.unit.unit_id)} onGrammarNote={() => { setPicked(null); onGrammarNote(picked.unit.unit_id) }} />
      )}
    </main>
  )
}
