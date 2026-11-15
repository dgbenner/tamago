import { IconBack } from './icons.jsx'
import { A1_HOURS, TYPICAL_WEEKLY_HOURS, paceOf } from '../lib/pace.js'

const NAMES = { reading: 'Reading', listening: 'Listening', writing: 'Writing', speaking: 'Speaking' }

// The full picture, kept off the home screen: per-skill score and CEFR band, what A1 complete needs, and the
// "I can" checklist. A statement is ticked only after a short check of that skill (learning-methods 17).
// Total hours of active learning (Dan, 2026-11-15): one decimal, "0.4 hours", "12 hours" from ten up.
const hours = (ms) => { const h = ms / 3_600_000; const v = h >= 10 ? Math.round(h) : Number(h.toFixed(1)); return `${v} ${v === 1 ? 'hour' : 'hours'}` }

export default function Progress({ coverage, finalCheck, scores, units, canDo, checked, isOpen, progressOf, activeMs = 0, startedAt = null, onCheck, onExam, onBack }) {
  const pace = paceOf(activeMs, startedAt)
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Progress</h1>
      </header>

      <section className="flex flex-col gap-1.5" aria-labelledby="time-h">
        <div className="flex items-baseline justify-between">
          <h2 id="time-h" className="font-semibold">Time Learning</h2>
          <span data-time-learning className="font-semibold">{hours(activeMs)}</span>
        </div>
        {/* Pace (Dan, 2026-11-15; src/lib/pace.js): hours a week against a typical week; the bar is hours toward A1, the typical band shaded. */}
        {pace && (
          <>
            <div className="relative h-2.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
              <div className="absolute inset-y-0 bg-green/25" style={{ left: `${pace.band[0] * 100}%`, right: 0 }} />
              <div className="absolute inset-y-0 left-0 rounded-full bg-green" style={{ width: `${Math.max(2, pace.bar * 100)}%` }} />
            </div>
            <p className="text-sm"><span data-pace className="font-medium">{pace.label}</span><span className="text-muted"> · {pace.line}</span></p>
            {pace.estimate && <p data-pace-estimate className="text-sm">{pace.estimate}</p>}
            <p className="text-xs text-muted">{pace.weekLine}. A typical pace is about {TYPICAL_WEEKLY_HOURS} a week; most learners reach A1 in {A1_HOURS.low} to {A1_HOURS.high} hours of guided study.</p>
          </>
        )}
      </section>

      {/* A1 coverage (A1 Complete, 2026-11-10): measured against the course's official A1 word list and the thirteen
          A1 tasks, so "A1 complete" means a level people understand. */}
      {coverage && (
        <section className="flex flex-col gap-3" aria-labelledby="cov-h">
          <h2 id="cov-h" className="font-semibold">A1 Coverage</h2>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between"><span className="font-medium">A1 words</span><span className="font-semibold">{Math.round((coverage.met * 100) / coverage.total)}%</span></div>
            <div className="h-2.5 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-green" style={{ width: `${(coverage.met * 100) / coverage.total}%` }} /></div>
            <p className="text-sm text-muted">You've met {coverage.met} of the {coverage.total} words on the A1 word list ({coverage.source}). The course teaches {coverage.course} of them so far; more come with each part.</p>
          </div>
          <div className="flex items-baseline justify-between"><span className="font-medium">A1 tasks</span><span className="font-semibold">{coverage.tasks.filter((t) => t.done).length} of {coverage.tasks.length}</span></div>
          <details className="-mt-2 text-sm">
            <summary className="cursor-pointer text-muted">The thirteen A1 tasks</summary>
            <ul className="mt-2 flex flex-col gap-1">
              {coverage.tasks.map((t) => <li key={t.task_id} className="flex gap-2"><span aria-hidden="true" className={t.done ? 'text-right-ink' : 'text-muted'}>{t.done ? '✓' : '·'}</span><span className={t.done ? '' : 'text-muted'}>{t.task}{t.done ? '' : ' (not yet)'}</span></li>)}
            </ul>
          </details>
          <div className="flex items-baseline justify-between"><span className="font-medium">Part</span><span className="font-semibold">{coverage.part} of {coverage.parts}</span></div>
        </section>
      )}

      <section className="flex flex-col gap-3">
        {Object.entries(scores).map(([skill, s]) => (
          <div key={skill} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <span className="font-semibold">{NAMES[skill]}</span>
              <span><span className="font-semibold">{s.score.toFixed(1)}</span> <span className="text-sm text-muted">{s.band}</span></span>
            </div>
            {/* The bar runs to 30, where A1 is complete. */}
            <div className="h-2.5 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-green" style={{ width: `${Math.min(100, (s.score / 30) * 100)}%` }} /></div>
          </div>
        ))}
        <p className="text-sm text-muted">Scores use the 0 to 160 scale. They move only for new learning: a round finished for the first time, or a review item cleared on three different days.</p>
      </section>

      {/* The final A1 check, per skill (finalcheck.js): its last result, speaking practised but never graded. */}
      {finalCheck && (
        <section className="flex flex-col gap-2">
          <h2 className="font-semibold">A1 Final Check</h2>
          <p className="text-sm text-muted">Modeled on the {finalCheck.exam.name}, with this course's own sentences.{finalCheck.last ? ` Last taken ${finalCheck.last.date}.` : ''}</p>
          {finalCheck.last ? (
            <ul className="flex flex-col gap-1">
              {['listening', 'reading', 'writing'].map((k) => {
                const p = finalCheck.last.scores[k] ?? { right: 0, total: 0 }
                return (
                  <li key={k} className="flex items-baseline justify-between">
                    <span className="font-medium">{NAMES[k] ?? k}</span>
                    <span>{p.right} of {p.total}{p.total ? <span className="text-sm text-muted"> · {Math.round((p.right * 100) / p.total)}%</span> : null}{p.written ? <span className="text-sm text-muted"> · message written</span> : null}</span>
                  </li>
                )
              })}
              <li className="flex items-baseline justify-between"><span className="font-medium">{NAMES.speaking ?? 'Speaking'}</span><span className="text-sm text-muted">practised, not graded</span></li>
            </ul>
          ) : <p>Not taken yet. {finalCheck.available ? 'It\'s open: find it at the end of the last part.' : 'It opens when every unit has had its first lessons.'}</p>}
          <a href={finalCheck.exam.samples} target="_blank" rel="noopener noreferrer" className="self-start text-sm underline underline-offset-4">Official {finalCheck.exam.name} sample papers ({finalCheck.exam.body})</a>
          <button onClick={onExam} className="self-start text-sm underline underline-offset-4">Ready for the Real Exam?</button>
        </section>
      )}

      <section className="flex flex-col gap-2">
        <h2 className="font-semibold">What A1 Takes, for Each Skill</h2>
        <ul className="list-disc pl-5 text-muted">
          <li>every A1 unit finished through round 5</li>
          <li>every A1 "I can" for that skill checked</li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-semibold">I Can</h2>
        {units.map((u) => (
          <div key={u.unit_id} className="flex flex-col gap-2">
            <p className="text-sm text-muted">Unit {u.order} · {u.title}</p>
            {canDo.filter((d) => d.unit_id === u.unit_id).map((d) => (
              <div key={d.can_do_id} className="flex items-start justify-between gap-3 rounded-xl border-2 border-line bg-surface p-3">
                <div>
                  <p>{d.statement}</p>
                  <p className="text-xs text-muted">{NAMES[d.skill]}{checked[d.can_do_id] ? ` · checked ${checked[d.can_do_id]}` : ''}</p>
                </div>
                {checked[d.can_do_id]
                  ? <span className="shrink-0 font-semibold text-right-ink" aria-label="Checked">✓</span>
                  : <button onClick={() => onCheck(d)} data-can-do-check className="btn-secondary min-h-10 shrink-0 px-3 text-sm">Check</button>}
              </div>
            ))}
          </div>
        ))}
        <p className="text-sm text-muted">A check opens once the unit has finished round 1: three short questions in that skill, all right to tick it.</p>
      </section>
    </main>
  )
}
