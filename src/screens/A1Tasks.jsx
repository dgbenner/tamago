import { useEffect, useRef, useState } from 'react'
import { play } from '../lib/audio.js'
import { checkForm, readValue, sameValue, wordCount } from '../lib/a1types.js'
import { requestFeedback } from '../lib/converse.js'
import { TL, course } from '../lib/course.js'
import AudioHelp from './AudioHelp.jsx'

// The A1 task question types (A1 Complete, 2026-11-10; logic in src/lib/a1types.js). No timers; Check is the only
// commitment; nothing here waits on the network before the learner can go on.

const KIND_LABEL = { menu: 'Menu', sign: 'Sign', notice: 'Notice', timetable: 'Timetable', message: 'Message' }

// QT14: the text, styled by what it is, then 2 or 3 questions. Right when every question is.
// Craft review (Fable, 2026-11-14): picks wait for Check, like every other type (no submit on the last pick); the text
// and choices are compact and the questions sit side by side on wide screens, so the whole task is in view; a wrong
// answer puts its corrections in the answer bar.
export function ReadText({ q, result, onAnswer }) {
  const [picked, setPicked] = useState({})
  const all = Object.keys(picked).length === q.questions.length
  const pick = (i, k) => { if (!result) setPicked((p) => ({ ...p, [i]: k })) }
  const check = () => {
    document.activeElement?.blur()
    const right = q.questions.filter((x, j) => picked[j] === x.answer).length
    const fixes = q.questions.flatMap((x, j) => (picked[j] === x.answer ? [] : [`${x.question} ${x.choices[x.answer]}`]))
    onAnswer({ correct: right === q.questions.length, given: Object.values(picked).join(','), corrections: fixes.length ? [`${right} of ${q.questions.length} right`, ...fixes] : null })
  }
  return (
    <>
      <figure className={`rounded-2xl border-2 border-line bg-surface p-3 ${q.kind === 'sign' ? 'text-center' : ''}`}>
        <figcaption className="mb-1 text-sm text-muted">{KIND_LABEL[q.kind] ?? 'Text'}{q.title ? `: ${q.title}` : ''}</figcaption>
        <div lang={TL} className={`flex flex-col gap-0.5 ${q.kind === 'sign' ? 'text-xl font-semibold' : 'text-lg'}`}>
          {q.lines.map((l, i) => <p key={i}>{l}</p>)}
        </div>
      </figure>
      <div className="grid gap-4 lg:grid-cols-2">
        {q.questions.map((x, i) => (
          <fieldset key={i} className="flex flex-col gap-1.5">
            <legend className="mb-1.5 font-medium">{x.question}</legend>
            {/* Short choices sit side by side on a phone, so both questions fit above Check. */}
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1.5">
            {x.choices.map((c, k) => {
              const state = !result ? (picked[i] === k ? 'choice-selected' : '') : k === x.answer ? 'choice-right' : picked[i] === k ? 'choice-wrong' : 'opacity-60'
              return <button key={k} lang={x.lang === 'course' ? TL : undefined} disabled={Boolean(result)} aria-pressed={picked[i] === k} onClick={() => pick(i, k)} data-wrong={state === 'choice-wrong' ? '' : undefined} className={`choice min-h-11 py-1.5 text-base ${state}`}>{c}</button>
            })}
            </div>
          </fieldset>
        ))}
      </div>
      {!result && <div className="check-row action-row"><button data-check disabled={!all} onClick={check} className="btn-submit flex-1">Check</button></div>}
    </>
  )
}

// QT15: a short card, then the form. Each field is checked by its rule; wrong ones show what was expected.
export function FormFill({ q, result, onAnswer }) {
  const [values, setValues] = useState({})
  const [checked, setChecked] = useState(null)
  const filled = q.fields.every((f) => String(values[f.key] ?? '').trim())
  const check = () => {
    document.activeElement?.blur()
    const r = checkForm(q.fields, values)
    setChecked(r)
    // The corrections go in the answer bar too (craft review, 2026-11-14), so the bar never hides them.
    const fixes = r.results.filter((x) => !x.ok).map((x) => `${q.fields.find((f) => f.key === x.key)?.label}: ${x.expected}`)
    onAnswer({ correct: r.correct, given: q.fields.map((f) => values[f.key] ?? '').join(' | '), corrections: fixes.length ? fixes : null })
  }
  return (
    <>
      <div lang={TL} className="rounded-2xl border-2 border-line bg-surface p-4 text-lg">{q.card}</div>
      <form onSubmit={(e) => { e.preventDefault(); if (filled && !result) check() }} className="flex flex-col gap-3">
        {q.fields.map((f) => {
          const r = checked?.results.find((x) => x.key === f.key)
          return (
            <label key={f.key} className="flex flex-col gap-1">
              <span lang={TL} className="font-medium">{f.label}</span>
              <input value={values[f.key] ?? ''} onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))} disabled={Boolean(result)} lang={TL}
                inputMode={f.rule === 'number' || f.rule === 'phone' ? 'numeric' : 'text'} autoComplete="off" autoCapitalize="off" spellCheck={false}
                aria-invalid={r ? !r.ok : undefined}
                className={`min-h-11 rounded-xl border-2 bg-surface px-3 text-lg outline-none ${r ? (r.ok ? 'border-right' : 'border-wrong') : 'border-field focus:border-ink'}`} />
              {r && !r.ok && <span data-wrong className="text-sm">Expected: <span lang={TL}>{r.expected}</span></span>}
            </label>
          )
        })}
        {!result && <div className="check-row"><button data-check type="submit" disabled={!filled} className="btn-submit flex-1">Check</button></div>}
      </form>
    </>
  )
}

// QT16: a short message to a prompt. Sending counts as done (never scored); Claude's feedback on meaning, grammar
// and missing points shows when it arrives, and Continue never waits for it.
export function WriteMessage({ q, result, onAnswer }) {
  const [text, setText] = useState('')
  const [feedback, setFeedback] = useState(null)
  // After Done (craft review, 2026-11-14): a line says the notes are on the way, until they arrive or turn out to be off.
  const [waiting, setWaiting] = useState(false)
  const notesRef = useRef(null)
  const n = wordCount(text)
  const send = () => {
    document.activeElement?.blur()
    onAnswer({ correct: true, given: text, speaking: true }) // speaking: no praise line, like a spoken answer: "Done."
    setWaiting(true)
    requestFeedback({ lang: course.id, prompt: q.prompt, points: q.points, text }).then((f) => { setFeedback(f); setWaiting(false) }, () => setWaiting(false))
  }
  useEffect(() => { if (feedback || waiting) notesRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }) }, [feedback, waiting])
  // The points are listed once, as bullets; the sentence keeps only the task (craft review, 2026-11-14).
  const task = q.points.length ? q.prompt.replace(/:.*$/, '.') : q.prompt
  return (
    <>
      <p className="text-lg">{task}</p>
      {q.points.length > 0 && <ul className="-mt-2 list-disc pl-5 text-muted">{q.points.map((p) => <li key={p}>{p}</li>)}</ul>}
      <textarea value={text} onChange={(e) => setText(e.target.value)} disabled={Boolean(result)} rows={6} lang={TL} aria-label={`Your message in ${course.name}`} aria-describedby="wc"
        className="rounded-xl border-2 border-field bg-surface px-3 py-2 text-lg outline-none focus:border-ink" />
      <p id="wc" className="-mt-2 text-sm text-muted">{n} {n === 1 ? 'word' : 'words'} · aim for {q.min} to {q.max}</p>
      {waiting && !feedback && <p ref={notesRef} role="status" className="text-sm text-muted">Claude's notes on your message are on the way…</p>}
      {feedback && (
        <section ref={notesRef} aria-live="polite" className="flex flex-col gap-1 rounded-xl border-2 border-line p-3 text-sm">
          <h2 className="font-semibold">Claude's notes</h2>
          {feedback.meaning && <p>{feedback.meaning}</p>}
          {feedback.grammar?.length > 0 && <ul className="list-disc pl-5">{feedback.grammar.map((g, i) => <li key={i}>{g}</li>)}</ul>}
          {feedback.missing?.length > 0 && <p className="text-muted">Not covered yet: {feedback.missing.join('; ')}</p>}
          {feedback.better && <p>A tidier version: <span lang={TL}>{feedback.better}</span></p>}
        </section>
      )}
      {!result && <div className="check-row"><button data-check disabled={n < 3} onClick={send} className="btn-submit flex-1">Done</button></div>}
    </>
  )
}

const ASK = { phone: 'Write the phone number', number: 'Write the number', price: 'Write the price', time: 'Write the time', date: 'Write the date (day/month)' }
const HINT = { phone: '06 12 34 56 78', number: '47', price: '3.50', time: '14:30', date: '12/3' }
// QT17: hear a number, price, time or date and write it in figures; checked as a value. With Can't Listen Now the
// words are shown instead. Slow and Show Words come after the first replay (AudioHelp, Dan 2026-11-12).
export function ListenNumber({ q, result, onAnswer, wordsShown, onShowWords }) {
  const [text, setText] = useState('')
  useEffect(() => { if (!q.readInstead) play(q.audio) }, [q.qid])
  const check = () => { document.activeElement?.blur(); onAnswer({ correct: sameValue(q.kind, q.answer, text), given: text }) }
  return (
    <>
      {q.readInstead
        ? <p lang={TL} className="text-2xl">{q.audio.french}</p>
        : (
          <AudioHelp audio={q.audio} label="Play it again" words={<p lang={TL} className="text-2xl">{q.audio.french}</p>} wordsShown={wordsShown} onShowWords={onShowWords} />
        )}
      <form onSubmit={(e) => { e.preventDefault(); if (text.trim() && !result) check() }}>
        <input autoFocus value={text} onChange={(e) => setText(e.target.value)} disabled={Boolean(result)} inputMode={q.kind === 'number' ? 'numeric' : 'text'}
          placeholder={`For example ${HINT[q.kind] ?? '47'}`} aria-label={ASK[q.kind] ?? 'Your answer'} autoComplete="off"
          className="w-full rounded-xl border-2 border-field bg-surface px-4 py-3 text-lg outline-none focus:border-ink" />
      </form>
      {text.trim() && !result && readValue(q.kind, text) === null && <p className="text-sm text-muted">Write it in figures, like {HINT[q.kind]}.</p>}
      {!result && <div className="check-row"><button data-check disabled={!text.trim()} onClick={check} className="btn-submit flex-1">Check</button></div>}
    </>
  )
}
