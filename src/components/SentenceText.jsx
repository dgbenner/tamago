import { useState } from 'react'
import { TL } from '../lib/course.js'

// The sentence in the course language, and the new-word line under it. Lifted from Lesson.jsx unchanged
// (design-system branch).
// The French, with a dotted underline on each word that has a hint.
export function FrenchText({ q, newWords, onHint, blankIndex = null, filled = null, markNewOnly = false }) {
  const [open, setOpen] = useState(null)
  return (
    <p lang={TL} className="text-2xl leading-relaxed">
      {q.segments.map((seg, i) => {
        if (i === blankIndex) {
          return <span key={i} className="mx-1 inline-block min-w-16 border-b-4 border-ink px-1 text-center font-semibold">{filled ?? ' '}</span>
        }
        if (!seg.word_id) return <span key={i}>{seg.text}</span>
        return (
          <span key={i} className="relative">
            <button
              onClick={() => { setOpen(open === i ? null : i); if (open !== i) onHint(seg) }} aria-expanded={open === i} aria-describedby={open === i ? `hint-${q.qid}-${i}` : undefined}
              className={markNewOnly && !newWords.has(seg.word_id) ? '' : 'underline decoration-dotted decoration-2 underline-offset-4'}
            >{seg.text}</button>
            {/* The new-word dot sits on the word like a superscript, not between words like a bullet. */}
            {newWords.has(seg.word_id) && <span className="new-dot absolute -top-0.5 left-full ml-0.5 size-1.5" aria-hidden="true" />}
            {open === i && (
              <span id={`hint-${q.qid}-${i}`} role="tooltip" lang="en" className="absolute top-full left-0 z-10 mt-1 w-max max-w-[min(18rem,80vw)] rounded-lg border-2 border-line bg-surface px-3 py-1.5 text-base shadow-md">{seg.hint}</span>
            )}
          </span>
        )
      })}
    </p>
  )
}

// First sight: a new word's meaning shows with it. Not a hint, so it isn't logged.
export function FirstSight({ q, newWords, except = null }) {
  const lines = (q.segments ?? []).filter((seg, i) => i !== except && seg.word_id && newWords.has(seg.word_id) && seg.hint)
  if (lines.length === 0) return null
  return <p className="text-sm text-muted">{lines.map((seg) => `${seg.text.toLowerCase()} = ${seg.hint}`).join(', ')}</p>
}
