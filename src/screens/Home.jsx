import Logo from './Logo.jsx'
import { IconGear } from './icons.jsx'

export default function Home({ unit, progress, round, lessonsInRound, points, bankSize, inProgress, onStart, onReview, onSettings }) {
  const complete = progress.round_reached >= 5
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <header className="relative flex justify-center">
        <Logo />
        <button onClick={onSettings} aria-label="Settings" className="icon-btn absolute top-0 right-0 -mr-2"><IconGear /></button>
      </header>

      <section className="rounded-2xl border border-line bg-surface p-5">
        <p className="text-sm text-muted">Unit {unit.order}</p>
        <h1 className="text-2xl font-semibold">{unit.title}</h1>
        <p className="mt-1 text-muted">
          {complete ? 'All 5 rounds done' : `Round ${round} of 5 · Lesson ${progress.lessons_done + 1} of ${lessonsInRound}`}
        </p>
        <button onClick={onStart} className="btn-primary mt-5 w-full">
          {inProgress ? 'Resume' : complete ? 'Practice' : 'Start'}
        </button>
      </section>

      <button onClick={onReview} disabled={bankSize === 0} className="btn-secondary">
        Review{bankSize ? ` (${bankSize})` : ''}
      </button>

      <p className="text-center text-muted">Today: {points} {points === 1 ? 'point' : 'points'}</p>
    </main>
  )
}
