import { useEffect, useState } from 'react'
import { play } from '../lib/audio.js'
import { checkForm, readValue, sameValue, wordCount } from '../lib/a1types.js'
import { requestFeedback } from '../lib/converse.js'
import { TL, course } from '../lib/course.js'
import { IconSpeaker } from './icons.jsx'

// The A1 task question types (A1 Complete, 2026-11-10; logic in src/lib/a1types.js). No timers; Check is the only
// commitment; nothing here waits on the network before the learner can go on.

const KIND_LABEL = { menu: 'Menu', sign: 'Sign', notice: 'Notice', timetable: 'Timetable', message: 'Message' }

// QT14: the text, styled by what it is, then 2 or 3 questions. Right when every question is.
export function ReadText({ q, result, onAnswer }) {
  const [picked, setPicked] = useState({})
  const pick = (i, k) => {
    if (picked[i] !== undefined || result) return
    const next = { ...picked, [i]: k }
    setPicked(next)
    if (Object.keys(next).length === q.questions.length) onAnswer({ correct: q.questions.every((x, j) => next[j] === x.answer), given: Object.values(next).join(',') })
  }
  return (
    <>
      <figure className={`rounded-2xl border-2 border-line bg-surface p-4 ${q.kind === 'sign' ? 'text-center' : ''}`}>
        <figcaption className="mb-2 text-sm text-muted">{KIND_LABEL[q.kind] ?? 'Text'}{q.title ? `: ${q.title}` : ''}</figcaption>
        <div lang={TL} className={`flex flex-col gap-1 ${q.kind === 'sign' ? 'text-2xl font-semibold' : 'text-lg'}`}>
          {q.lines.map((l, i) => <p key={i}>{l}</p>)}
        </div>
      </figure>
      {q.questions.map((x, i) => (
        <fieldset key={i} className="flex flex-col gap-2">
          <legend className="mb-2 font-medium">{x.question}</legend>
          {x.choices.map((c, k) => {
            const state = picked[i] === undefined ? '' : k === x.answer ? 'choice-right' : picked[i] === k ? 'choice-wrong' : ''
            return <button key={k} lang={x.lang === 'course' ? TL : undefined} disabled={picked[i] !== undefined || Boolean(result)} aria-pressed={picked[i] === k} onClick={() => pick(i, k)} className={`choice ${state}`}>{c}</button>
          })}
        </fieldset>
      ))}
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
    onAnswer({ correct: r.correct, given: q.fields.map((f) => values[f.key] ?? '').join(' | ') })
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
                className={`min-h-11 rounded-xl border-2 bg-surface px-3 text-lg ${r ? (r.ok ? 'border-right' : 'border-wrong') : 'border-field'}`} />
              {r && !r.ok && <span className="text-sm">Expected: <span lang={TL}>{r.expected}</span></span>}
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
  const n = wordCount(text)
  const send = () => {
    document.activeElement?.blur()
    onAnswer({ correct: true, given: text, speaking: true }) // speaking: no praise line, like a spoken answer: "Done."
    requestFeedback({ lang: course.id, prompt: q.prompt, points: q.points, text }).then((f) => setFeedback(f))
  }
  return (
    <>
      <p className="text-lg">{q.prompt}</p>
      {q.points.length > 0 && <ul className="-mt-2 list-disc pl-5 text-muted">{q.points.map((p) => <li key={p}>{p}</li>)}</ul>}
      <textarea value={text} onChange={(e) => setText(e.target.value)} disabled={Boolean(result)} rows={6} lang={TL} aria-label={`Your message in ${course.name}`} aria-describedby="wc"
        className="rounded-xl border-2 border-field bg-surface px-3 py-2 text-lg" />
      <p id="wc" className="-mt-2 text-sm text-muted">{n} {n === 1 ? 'word' : 'words'} · aim for {q.min} to {q.max}</p>
      {feedback && (
        <section aria-live="polite" className="flex flex-col gap-1 rounded-xl border-2 border-line p-3 text-sm">
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

const ASK = { number: 'Write the number', price: 'Write the price', time: 'Write the time', date: 'Write the date (day/month)' }
const HINT = { number: '47', price: '3.50', time: '14:30', date: '12/3' }
// QT17: hear a number, price, time or date and write it in figures; checked as a value. With Can't Listen Now the
// words are shown instead.
export function ListenNumber({ q, result, onAnswer }) {
  const [text, setText] = useState('')
  useEffect(() => { if (!q.readInstead) play(q.audio) }, [q.qid])
  const check = () => { document.activeElement?.blur(); onAnswer({ correct: sameValue(q.kind, q.answer, text), given: text }) }
  return (
    <>
      {q.readInstead
        ? <p lang={TL} className="text-2xl">{q.audio.french}</p>
        : (
          <div className="flex items-center gap-3">
            <button onClick={() => play(q.audio)} aria-label="Play it again" className="inline-flex h-16 w-16 items-center justify-center rounded-xl border-2 border-line bg-surface"><IconSpeaker /></button>
            <button onClick={() => play(q.audio, { slow: true })} aria-label="Play it slowly" className="min-h-11 rounded-xl border-2 border-line bg-surface px-3 text-sm">Slow</button>
          </div>
        )}
      <p className="font-medium">{ASK[q.kind] ?? 'Write it in figures'}</p>
      <form onSubmit={(e) => { e.preventDefault(); if (text.trim() && !result) check() }}>
        <input autoFocus value={text} onChange={(e) => setText(e.target.value)} disabled={Boolean(result)} inputMode={q.kind === 'number' ? 'numeric' : 'text'}
          placeholder={`For example ${HINT[q.kind] ?? '47'}`} aria-label={ASK[q.kind] ?? 'Your answer'} autoComplete="off"
          className="w-full rounded-xl border-2 border-field bg-surface px-4 py-3 text-lg" />
      </form>
      {text.trim() && !result && readValue(q.kind, text) === null && <p className="text-sm text-muted">Write it in figures, like {HINT[q.kind]}.</p>}
      {!result && <div className="check-row"><button data-check disabled={!text.trim()} onClick={check} className="btn-submit flex-1">Check</button></div>}
    </>
  )
}
