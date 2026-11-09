import { LogoInline } from './Logo.jsx'
import { IconGear } from './icons.jsx'

// Placeholder for the points counter: a coin and the running total.
function Coin() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="#ffc21a" stroke="#c98a00" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="4" fill="none" stroke="#c98a00" strokeWidth="1.2" />
    </svg>
  )
}

// Placeholder for the learning path, until Dan specs it: the five rounds as stops, with the current
// round and lesson shown at the current stop.
function PathPlaceholder({ unit, round, lesson, lessons, complete }) {
  return (
    <section className="flex flex-1 flex-col rounded-2xl border-4 border-dashed border-line p-5">
      <p className="text-xs uppercase tracking-wide text-muted">Learning path · placeholder</p>
      <p className="mt-3 text-sm text-muted">Unit {unit.order}</p>
      <h1 className="text-2xl font-semibold">{unit.title}</h1>
      <ol className="mt-8 flex flex-col items-center gap-0">
        {[1, 2, 3, 4, 5].map((r) => {
          const done = complete || r < round
          const current = !complete && r === round
          return (
            <li key={r} className="flex flex-col items-center">
              {r > 1 && <span className="h-5 w-1 bg-line" aria-hidden="true" />}
              <span className={`flex h-12 w-12 items-center justify-center rounded-full border-4 text-sm font-semibold ${done ? 'border-green bg-green text-white' : current ? 'border-orange text-orange' : 'border-line text-muted'}`}>{r}</span>
              {current && <span className="mt-1 text-xs text-muted">Round {round} of 5 · Lesson {lesson} of {lessons}</span>}
            </li>
          )
        })}
      </ol>
      {complete && <p className="mt-4 text-center text-sm text-muted">All 5 rounds done</p>}
    </section>
  )
}

export default function Home({ unit, progress, round, lessonsInRound, points, pointsTotal, bankSize, inProgress, onStart, onReview, onSettings }) {
  const complete = progress.round_reached >= 5
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(1rem,env(safe-area-inset-top))]">
      <header className="relative flex min-h-11 items-center justify-center">
        <span className="absolute left-0 inline-flex items-center gap-1.5 rounded-full bg-[#1f6fff] px-2.5 py-1 text-sm font-semibold text-white" title={`${pointsTotal} points in all, ${points} today`}>
          <Coin />
          {pointsTotal}
        </span>
        <LogoInline />
        <button onClick={onSettings} aria-label="Settings" className="icon-btn absolute right-0 -mr-2"><IconGear /></button>
      </header>

      <PathPlaceholder unit={unit} round={round} lesson={progress.lessons_done + 1} lessons={lessonsInRound} complete={complete} />

      {/* Pinned to the bottom so they're always on screen. */}
      <div className="sticky bottom-0 -mx-4 mt-auto flex flex-col gap-3 bg-bg px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button onClick={onReview} disabled={bankSize === 0} className="btn-secondary">
          Review{bankSize ? ` (${bankSize})` : ''}
        </button>
        <button onClick={onStart} className="btn-submit">
          {inProgress ? 'Resume' : complete ? 'Practice' : 'Start'}
        </button>
      </div>
    </main>
  )
}
