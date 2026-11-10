import { useEffect, useState } from 'react'
import { getAll, put } from '../lib/store.js'
import { download, stamp } from '../lib/files.js'
import NeedsSetup from './NeedsSetup.jsx'
import { IconBack } from './icons.jsx'
import { TL } from '../lib/course.js'

// Flag review (answer flags, version 2), for Dan. "My answer should be accepted" flags with a typed or built answer
// can be accepted: the answer counts on this device at once, and "Save for Claude" carries it into the content
// for everyone at the next deploy (scripts/import-flags.mjs). Other flags are listed for the content and bug fixes.
const GROUPS = [
  { title: 'Answers to review', test: (f) => f.reason_id === 'F1' && f.given && f.direction },
  { title: 'Content issues', test: (f) => ['F2', 'F3'].includes(f.reason_id) || (f.reason_id === 'F1' && !(f.given && f.direction)) },
  { title: 'Something is broken', test: (f) => f.reason_id === 'F4' },
]

export default function FlagReview({ reasons, onAccept, onBack }) {
  const [flags, setFlags] = useState(null)
  const [showDone, setShowDone] = useState(false)
  useEffect(() => { getAll('flags').then((rows) => setFlags(rows.sort((a, b) => String(b.flagged_at).localeCompare(a.flagged_at)))) }, [])
  const decide = (f, status) => {
    const row = { ...f, status, decided_at: new Date().toISOString() }
    put('flags', row)
    setFlags((list) => list.map((x) => (x.flag_id === f.flag_id ? row : x)))
    if (status === 'accepted') onAccept({ sentence_id: f.sentence_id, direction: f.direction, answer: f.given, source: 'learner flag, approved on this device' })
  }
  const reasonOf = (id) => reasons.find((r) => r.reason_id === id)?.label ?? id
  const save = () => download(`tamago-flags-${stamp()}.json`, { app: 'tamago', kind: 'flags', saved_at: new Date().toISOString(), flags })
  if (!flags) return null
  const open = (f) => !f.status || f.status === 'open'
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Flag Review</h1>
      </header>
      <p className="text-sm text-muted">Flags from lessons on this device. An accepted answer counts here at once; save the flags for Claude to make it count for everyone.</p>
      <NeedsSetup title="Flags from Other Learners">Collecting flags from testers' devices needs a server. Until then, a tester can send the file from this screen.</NeedsSetup>
      {flags.length === 0 && <p className="text-muted">No flags yet.</p>}
      {GROUPS.map((g) => {
        const list = flags.filter((f) => g.test(f) && (showDone || open(f)))
        if (!list.length) return null
        return (
          <section key={g.title} className="flex flex-col gap-2">
            <h2 className="font-semibold">{g.title}</h2>
            {list.map((f) => (
              <div key={f.flag_id} className="flex flex-col gap-2 rounded-xl border-2 border-line bg-surface p-3">
                <p className="text-sm text-muted">{f.sentence_id} · {f.type_id} · {reasonOf(f.reason_id)} · {new Date(f.flagged_at).toLocaleDateString()}{!open(f) ? ` · ${f.status}` : ''}</p>
                {f.french && <p lang={TL}>{f.french}</p>}
                {f.english && <p className="text-muted">{f.english}</p>}
                {f.given && <p><span className="text-sm text-muted">Answer given: </span><span lang={f.direction === 'en_to_fr' ? TL : 'en'}>{f.given}</span></p>}
                {open(f) && (
                  <div className="flex gap-2">
                    <button onClick={() => decide(f, 'dismissed')} className="btn-secondary flex-1">{g.title === 'Answers to review' ? 'Not right' : 'Done'}</button>
                    {g.title === 'Answers to review' && <button onClick={() => decide(f, 'accepted')} className="btn-secondary flex-1">Accept</button>}
                  </div>
                )}
              </div>
            ))}
          </section>
        )
      })}
      {flags.some((f) => !open(f)) && <button onClick={() => setShowDone(!showDone)} className="btn-secondary">{showDone ? 'Hide decided flags' : 'Show decided flags'}</button>}
      <button onClick={save} disabled={flags.length === 0} className="btn-secondary">Save for Claude</button>
    </main>
  )
}
