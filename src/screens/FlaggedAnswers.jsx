import { useEffect, useState } from 'react'
import { getAll, put } from '../lib/store.js'
import { download, stamp } from '../lib/files.js'
import { TL, course } from '../lib/course.js'

// Flagged Answers (Dan, 2026-11-15), on the Developer page: every "My answer should be accepted" flag on this device,
// with the sentence, the expected answer and the learner's. Accept makes the answer count on this device at once;
// Export Accepted Answers saves a file for the course's flagged-answers/ folder (content/flagged-answers, or
// content-es/... for Spanish), which the next content build reads, so it counts for everyone. Flags stay on the device
// until real accounts exist; then they move to the server. Listening answers (Tap or Type What You Hear, Answer the
// Question) accept only the sentence heard, so those can be rejected but not accepted.
const answerFlag = (f) => f.reason_id === 'F1'
export default function FlaggedAnswers({ onAccept }) {
  const [flags, setFlags] = useState(null)
  const [showDecided, setShowDecided] = useState(false)
  useEffect(() => { getAll('flags').then((rows) => setFlags(rows.filter(answerFlag).sort((a, b) => String(b.flagged_at).localeCompare(a.flagged_at)))).catch(() => setFlags([])) }, [])
  if (!flags) return null
  const decide = (f, status) => {
    const row = { ...f, status, decided_at: new Date().toISOString() }
    put('flags', row)
    setFlags((list) => list.map((x) => (x.flag_id === f.flag_id ? row : x)))
    if (status === 'accepted') onAccept({ sentence_id: f.sentence_id, direction: f.direction, answer: f.given, source: 'learner flag, accepted on this device' })
  }
  const open = (f) => !f.status || f.status === 'open'
  const accepted = flags.filter((f) => f.status === 'accepted' && f.given && f.direction)
  const exportAccepted = () => download(`flagged-answers-${course.id}-${stamp()}.json`, {
    app: 'tamago', kind: 'accepted-answers', course: course.id, saved_at: new Date().toISOString(),
    answers: accepted.map((f) => ({ sentence_id: f.sentence_id, direction: f.direction, answer: f.given, expected: f.expected ?? null, question: f.question ?? null, flagged_at: f.flagged_at, decided_at: f.decided_at })),
  })
  const shown = flags.filter((f) => showDecided || open(f))
  const expectedOf = (f) => f.expected ?? (f.direction === 'en_to_fr' ? f.french : f.english)
  return (
    <section className="flex flex-col gap-3" aria-labelledby="flagged-h" data-flagged-answers>
      <h3 id="flagged-h" className="font-medium">Flagged Answers <span className="font-normal text-muted">({flags.filter(open).length} open)</span></h3>
      {flags.length === 0 && <p className="text-sm text-muted">No answers flagged on this device yet.</p>}
      {shown.map((f) => (
        <div key={f.flag_id} data-flag={f.flag_id} className="flex flex-col gap-1.5 rounded-xl border-2 border-line bg-surface p-3 text-sm">
          <p className="text-muted">{f.sentence_id} · {f.type_id} · {new Date(f.flagged_at).toLocaleDateString()}{!open(f) ? ` · ${f.status === 'accepted' ? 'Accepted' : 'Rejected'}` : ''}</p>
          {f.question && f.question !== f.french && f.question !== f.english && <p><span className="text-muted">Question: </span>{f.question}</p>}
          {f.french && <p><span className="text-muted">Sentence: </span><span lang={TL}>{f.french}</span>{f.english && <span className="text-muted"> = {f.english}</span>}</p>}
          <p><span className="text-muted">Expected: </span><span lang={f.direction === 'en_to_fr' ? TL : 'en'}>{expectedOf(f) ?? '(not saved)'}</span></p>
          <p><span className="text-muted">Their answer: </span><span lang={f.direction === 'en_to_fr' ? TL : 'en'} className="font-medium">{f.given ?? '(none)'}</span></p>
          {open(f) && (
            <div className="mt-1 flex gap-2">
              <button onClick={() => decide(f, 'dismissed')} className="btn-secondary flex-1">Reject</button>
              <button onClick={() => decide(f, 'accepted')} disabled={!f.given || !f.direction} className="btn-secondary flex-1" title={!f.direction ? 'A listening answer accepts only the sentence heard' : undefined}>Accept</button>
            </div>
          )}
        </div>
      ))}
      <div className="flex flex-wrap gap-2">
        {flags.some((f) => !open(f)) && <button onClick={() => setShowDecided(!showDecided)} className="btn-secondary">{showDecided ? 'Hide Decided' : 'Show Decided'}</button>}
        <button onClick={exportAccepted} disabled={accepted.length === 0} className="btn-secondary" data-export-accepted>Export Accepted Answers ({accepted.length})</button>
      </div>
      <p className="text-xs text-muted">Put the exported file in {course.id === 'fr' ? 'content' : `content-${course.id}`}/flagged-answers/ and the next content build adds the answers for everyone.</p>
    </section>
  )
}
