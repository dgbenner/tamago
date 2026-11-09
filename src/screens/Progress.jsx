import { IconBack } from './icons.jsx'

const NAMES = { reading: 'Reading', listening: 'Listening', writing: 'Writing', speaking: 'Speaking' }

// The full picture, kept off the home screen: per-skill score and CEFR band, what A1 complete needs, and the
// "I can" checklist. A statement is ticked only after a short check of that skill (learning-methods 17).
export default function Progress({ scores, units, canDo, checked, isOpen, progressOf, onCheck, onBack }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Progress</h1>
      </header>

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

      <section className="flex flex-col gap-2">
        <h2 className="font-semibold">A1 complete, for a skill, needs</h2>
        <ul className="list-disc pl-5 text-muted">
          <li>every A1 unit finished through round 5</li>
          <li>every A1 "I can" for that skill checked</li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-semibold">I can</h2>
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
                  : <button onClick={() => onCheck(d)} disabled={!isOpen(u.unit_id) || progressOf(u.unit_id).round_reached < 1} className="btn-secondary min-h-10 shrink-0 px-3 text-sm">Check</button>}
              </div>
            ))}
          </div>
        ))}
        <p className="text-sm text-muted">A check opens once the unit has finished round 1: three short questions in that skill, all right to tick it.</p>
      </section>
    </main>
  )
}
