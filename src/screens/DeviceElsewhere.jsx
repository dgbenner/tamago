import { useState } from 'react'

// Another account's progress on this device (Dan, 2026-11-12): signing in never merges it in. The learner picks,
// with Start Fresh the default: first, and the main button. Focus goes to the heading, as on every screen (App), so
// the question is read out; the first Tab lands on Start Fresh.
const lessons = (n = 0) => `${n} ${n === 1 ? 'lesson' : 'lessons'}`

export default function DeviceElsewhere({ device, courseName, onPick }) {
  const [busy, setBusy] = useState(false)
  const pick = async (p) => { setBusy(true); try { await onPick(p) } finally { setBusy(false) } }
  return (
    <main aria-labelledby="elsewhere-title" className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(1.5rem,env(safe-area-inset-top))] pb-8">
      <h1 id="elsewhere-title" className="text-xl font-semibold">Start Fresh or Bring This Device’s Progress?</h1>
      <p>The {courseName} progress on this device ({lessons(device?.lessons_done ?? 0)}) was made with another account.</p>
      <div className="flex flex-col gap-3">
        <button onClick={() => pick('fresh')} disabled={busy} className="btn-submit" data-start-fresh>Start Fresh</button>
        <button onClick={() => pick('bring')} disabled={busy} className="btn-secondary">Bring This Device’s Progress</button>
      </div>
      <p className="text-sm text-muted">Start Fresh clears it from this device; the other account keeps its own copy.</p>
    </main>
  )
}
