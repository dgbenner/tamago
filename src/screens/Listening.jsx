import { useEffect, useState } from 'react'
import { speakAll, stop } from '../lib/audio.js'
import { IconBack, IconSpeaker } from './icons.jsx'
import { TL, course } from '../lib/course.js'

// QT20 listening comprehension (Phase 5): a short exchange, heard first, then questions in English. The French text
// opens on request or once every question is answered. Not graded into scores; it's practice the learner asked for.
export default function Listening({ passage, onDone, onBack }) {
  const [picked, setPicked] = useState({})
  const [showText, setShowText] = useState(false)
  const play = (slow = false) => speakAll(passage.lines.map((l) => l.french), { slow })
  useEffect(() => { play(); return stop }, [])
  const done = Object.keys(picked).length === passage.questions.length
  const right = passage.questions.filter((q, i) => picked[i] === q.answer).length
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Listening</h1>
      </header>
      <div className="flex gap-2">
        <button onClick={() => play()} className="btn-secondary inline-flex flex-1 items-center justify-center gap-2"><IconSpeaker /> Play</button>
        <button onClick={() => play(true)} className="btn-secondary flex-1">Slowly</button>
      </div>
      {passage.questions.map((q, i) => (
        <fieldset key={i} className="flex flex-col gap-2">
          <legend className="mb-2 font-medium">{q.question}</legend>
          {q.choices.map((c, k) => {
            const state = picked[i] === undefined ? '' : k === q.answer ? 'choice-right' : picked[i] === k ? 'choice-wrong' : ''
            return <button key={k} disabled={picked[i] !== undefined} onClick={() => setPicked((p) => ({ ...p, [i]: k }))} className={`choice ${state}`}>{c}</button>
          })}
        </fieldset>
      ))}
      {(showText || done)
        ? (
          <ol className="flex flex-col gap-2">
            {passage.lines.map((l, i) => (
              <li key={i} className="rounded-xl border-2 border-line bg-surface p-3">
                <p lang={TL}><span className="text-muted">{l.speaker}: </span>{l.french}</p>
                <p className="text-sm text-muted">{l.english}</p>
              </li>
            ))}
          </ol>
        )
        : <button onClick={() => setShowText(true)} className="btn-secondary">Show the {course.name}</button>}
      {done && <p className="text-lg">{right} of {passage.questions.length}.</p>}
      {done && <button onClick={onDone} className="btn-primary">Continue</button>}
      <p className="text-xs text-muted">Written by Claude from your words; not checked by a native speaker.</p>
    </main>
  )
}
