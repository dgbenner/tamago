import { useMemo, useState } from 'react'
import { checkTyped } from '../lib/check.js'
import { IconBack, IconClose } from './icons.jsx'
import { TL } from '../lib/course.js'

// The verb conjugation trainer. Tables are Wiktionary's present indicative; the drill asks one person at a time.
export default function Verbs({ tables, strict, onBack }) {
  const [drill, setDrill] = useState(null)
  if (drill) return <Drill table={drill} strict={strict} onDone={() => setDrill(null)} />
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Verbs</h1>
      </header>
      {tables.length === 0 && <p className="text-muted">Verbs appear here once you've met them in a lesson.</p>}
      {tables.map((t) => (
        <section key={t.lemma} className="flex flex-col gap-2 rounded-xl border-2 border-line bg-surface p-3">
          <div className="flex items-center justify-between">
            <h2 lang={TL} className="text-lg font-semibold">{t.lemma}</h2>
            <button onClick={() => setDrill(t)} className="btn-secondary min-h-10 px-4 text-sm">Practise</button>
          </div>
          <table className="w-full text-left text-sm">
            <tbody>{t.present.map((r) => <tr key={r.person}><td lang={TL} className="py-0.5 pr-4 text-muted">{r.person}</td><td lang={TL} className="font-semibold">{r.form}</td></tr>)}</tbody>
          </table>
          <a href={t.source} target="_blank" rel="noreferrer" className="text-xs text-muted underline underline-offset-2">Present tense, from Wiktionary</a>
        </section>
      ))}
    </main>
  )
}

function Drill({ table, strict, onDone }) {
  // Each person twice, shuffled: twelve quick questions.
  const order = useMemo(() => [...table.present, ...table.present].sort(() => Math.random() - 0.5), [table])
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [right, setRight] = useState(0)
  const row = order[i]
  if (!row) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-4">
        <p className="text-center text-xl">{right} of {order.length}.</p>
        <button onClick={onDone} className="btn-primary">Continue</button>
      </main>
    )
  }
  const check = () => {
    const r = checkTyped(text, [row.form], { strict, lang: 'fr', vocabulary: new Set(table.present.map((x) => x.form)) })
    setResult(r)
    if (r.correct) setRight(right + 1)
  }
  const next = () => { setI(i + 1); setText(''); setResult(null) }
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <header className="flex items-center gap-3">
        <button onClick={onDone} aria-label="Leave the drill" className="icon-btn -ml-2"><IconClose /></button>
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-green" style={{ width: `${(i / order.length) * 100}%` }} /></div>
      </header>
      <h1 className="text-xl font-semibold"><span lang={TL}>{table.lemma}</span>, present</h1>
      <p lang={TL} className="text-2xl">{row.person} …</p>
      <form onSubmit={(e) => { e.preventDefault(); if (result) next(); else if (text.trim()) check() }}>
        <input lang={TL} autoFocus value={text} disabled={Boolean(result)} onChange={(e) => setText(e.target.value)} aria-label="The verb form"
          autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck={false}
          className="w-full rounded-xl border-2 border-field bg-surface px-4 py-3 text-lg outline-none focus:border-ink" />
      </form>
      {result
        ? (
          <div className="flex flex-col gap-3">
            <p className={result.correct ? 'font-semibold text-right-ink' : 'font-semibold text-wrong'}>{result.correct ? 'Right.' : 'The form is'} <span lang={TL} className="text-ink">{row.form}</span></p>
            <button onClick={next} className="btn-primary">Continue</button>
          </div>
        )
        : <button onClick={check} disabled={!text.trim()} className="btn-submit">Check</button>}
    </main>
  )
}
