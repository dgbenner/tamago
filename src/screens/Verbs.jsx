import { useMemo, useState } from 'react'
import { checkTyped } from '../lib/check.js'
import { cue } from '../lib/audio.js'
import { IconBack, IconClose } from './icons.jsx'
import { TL } from '../lib/course.js'
import UnderConstruction from '../components/UnderConstruction.jsx'

// The verb conjugation trainer. Tables are Wiktionary's present indicative. Three exercises per verb (Dan, 2026-11-15):
// Type the Forms (one person at a time), Pick the Right Form (four choices), Match Pronoun to Form (one board). In each,
// a missed person comes back once at the end (after the board, as Pick the Right Form). A cell Wiktionary gives two
// ways ("assois or assieds") accepts either.
const formsOf = (cell) => String(cell).split(/\s+or\s+/).map((x) => x.trim()).filter(Boolean)
const shuffle = (xs) => { const a = [...xs]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }
const EXERCISES = [['type', 'Type the Forms'], ['pick', 'Pick the Right Form'], ['match', 'Match Pronoun to Form']]

export default function Verbs({ tables, strict, onBack }) {
  const [drill, setDrill] = useState(null) // { table, kind }
  if (drill?.kind === 'match') return <MatchDrill table={drill.table} onDone={() => setDrill(null)} />
  if (drill) return <Drill table={drill.table} kind={drill.kind} strict={strict} onDone={() => setDrill(null)} />
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Verbs</h1>
      </header>
      <UnderConstruction />
      {tables.length === 0 && <p className="text-muted">Verbs appear here once you've met them in a lesson.</p>}
      {tables.map((t) => (
        <section key={t.lemma} className="flex flex-col gap-2 rounded-xl border-2 border-line bg-surface p-3" data-verb={t.lemma}>
          <h2 lang={TL} className="text-lg font-semibold">{t.lemma}</h2>
          <table className="w-full text-left text-sm">
            <tbody>{t.present.map((r) => <tr key={r.person}><td lang={TL} className="py-0.5 pr-4 text-muted">{r.person}</td><td lang={TL} className="font-semibold">{r.form}</td></tr>)}</tbody>
          </table>
          <div className="flex flex-wrap gap-2">
            {EXERCISES.map(([kind, label]) => <button key={kind} onClick={() => setDrill({ table: t, kind })} data-exercise={kind} className="btn-secondary min-h-10 px-3 text-sm">{label}</button>)}
          </div>
          <a href={t.source} target="_blank" rel="noreferrer" className="text-xs text-muted underline underline-offset-2">Present tense, from Wiktionary</a>
        </section>
      ))}
    </main>
  )
}

function Frame({ i, total, onDone, title, children }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-3">
        <button onClick={onDone} aria-label="Leave the drill" className="icon-btn -ml-2"><IconClose /></button>
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-green transition-[width]" style={{ width: `${(i / Math.max(1, total)) * 100}%` }} /></div>
      </header>
      <h1 className="text-xl font-semibold">{title}</h1>
      {children}
    </main>
  )
}
function Done({ right, total, onDone }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-4">
      <p className="text-center text-xl" data-drill-done>{right} of {total}.</p>
      <button onClick={() => { cue('button'); onDone() }} className="btn-primary">Continue</button>
    </main>
  )
}

// Type the Forms and Pick the Right Form: each person twice (type) or once (pick), shuffled; a miss adds that person
// once more at the end. `start` lets the match board hand over its missed persons as Pick the Right Form.
function Drill({ table, kind, strict, onDone, start = null }) {
  const [queue, setQueue] = useState(() => start ?? shuffle(kind === 'type' ? [...table.present, ...table.present] : table.present).map((r) => ({ ...r, again: false })))
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [picked, setPicked] = useState(null)
  const [result, setResult] = useState(null)
  const [right, setRight] = useState(0)
  const firsts = queue.filter((r) => !r.again).length
  const row = queue[i]
  const choices = useMemo(() => {
    if (!row || kind !== 'pick') return []
    const own = formsOf(row.form)[0]
    const others = [...new Set(table.present.flatMap((r) => formsOf(r.form)))].filter((f) => !formsOf(row.form).includes(f))
    return shuffle([own, ...shuffle(others).slice(0, 3)])
  }, [i, row?.person, kind])
  if (!row) return <Done right={right} total={firsts} onDone={onDone} />
  const judge = (correct) => {
    setResult({ correct })
    if (correct) { if (!row.again) setRight((n) => n + 1); cue('button') }
    else if (!row.again) setQueue((q) => [...q, { ...row, again: true }])
  }
  const check = () => {
    if (kind === 'pick') judge(formsOf(row.form).includes(picked))
    else judge(checkTyped(text, formsOf(row.form), { strict, lang: 'fr', vocabulary: new Set(table.present.flatMap((x) => formsOf(x.form))) }).correct)
  }
  const next = () => { cue('button'); setI(i + 1); setText(''); setPicked(null); setResult(null) }
  return (
    <Frame i={i} total={queue.length} onDone={onDone} title={<><span lang={TL}>{table.lemma}</span>, {kind === 'pick' ? 'Pick the Right Form' : 'present'}</>}>
      <p lang={TL} className="text-2xl">{row.person} …{row.again && <span lang="en" className="ml-2 align-middle text-sm text-muted">again</span>}</p>
      {kind === 'pick'
        ? (
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Choices">
            {choices.map((c) => {
              const state = !result ? (picked === c ? 'choice-selected' : '') : formsOf(row.form).includes(c) ? 'choice-right' : picked === c ? 'choice-wrong' : 'opacity-60'
              return <button key={c} lang={TL} disabled={Boolean(result)} aria-pressed={picked === c} onClick={() => setPicked(c)} className={`choice min-h-12 text-lg ${state}`}>{c}</button>
            })}
          </div>
        )
        : (
          <form onSubmit={(e) => { e.preventDefault(); if (result) next(); else if (text.trim()) check() }}>
            <input lang={TL} autoFocus value={text} disabled={Boolean(result)} onChange={(e) => setText(e.target.value)} aria-label="The verb form"
              autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck={false}
              className="w-full rounded-xl border-2 border-field bg-surface px-4 py-3 text-lg outline-none focus:border-ink" />
          </form>
        )}
      {result
        ? (
          <div className="flex flex-col gap-3">
            <p className={result.correct ? 'font-semibold text-right-ink' : 'font-semibold text-wrong'}>{result.correct ? 'Right.' : 'The form is'} <span lang={TL} className="text-ink">{row.form}</span>{!result.correct && !row.again && <span className="font-normal text-muted"> · it comes back at the end</span>}</p>
            <button autoFocus onClick={next} className="btn-primary">Continue</button>
          </div>
        )
        : <button onClick={check} disabled={kind === 'pick' ? !picked : !text.trim()} className="btn-submit">Check</button>}
    </Frame>
  )
}

// Match Pronoun to Form: the persons on one side, the forms on the other, shuffled; tap one of each. Persons that share
// a form (je and il mange) take either tile. A wrong pair is noted; once the board is clear, those persons come back as
// Pick the Right Form.
function MatchDrill({ table, onDone }) {
  const rows = table.present
  const tiles = useMemo(() => shuffle(rows.map((r, k) => ({ k, form: r.form }))), [table])
  const [person, setPerson] = useState(null)
  const [tile, setTile] = useState(null)
  const [done, setDone] = useState({}) // person index -> tile index
  const [wrong, setWrong] = useState(null)
  const [missed, setMissed] = useState([])
  const [after, setAfter] = useState(null)
  const usedTiles = new Set(Object.values(done))
  const total = rows.length
  if (after) return <Drill table={table} kind="pick" strict={false} onDone={onDone} start={after} />
  const finished = Object.keys(done).length === total
  if (finished && !after) {
    if (missed.length) return <Handover onGo={() => setAfter(shuffle(missed).map((k) => ({ ...rows[k], again: false })))} count={missed.length} />
    return <Done right={total} total={total} onDone={onDone} />
  }
  const tryPair = (p, t) => {
    if (p == null || t == null) return
    if (tiles[t].form === rows[p].form) {
      setDone((d) => ({ ...d, [p]: t })); cue('match')
    } else {
      setWrong({ p, t }); if (!missed.includes(p)) setMissed((m) => [...m, p])
      setTimeout(() => setWrong(null), 400)
    }
    setPerson(null); setTile(null)
  }
  const cell = (selected, matched, isWrong) => `choice min-h-12 ${matched ? 'invisible' : isWrong ? 'choice-wrong' : selected ? 'choice-selected' : ''}`
  return (
    <Frame i={Object.keys(done).length} total={total} onDone={onDone} title={<><span lang={TL}>{table.lemma}</span>, Match Pronoun to Form</>}>
      <div className="grid grid-cols-2 gap-2" data-match-board>
        <div className="flex flex-col gap-2">
          {rows.map((r, p) => <button key={r.person} lang={TL} disabled={p in done} aria-pressed={person === p} onClick={() => { setPerson(p); tryPair(p, tile) }} className={cell(person === p, p in done, wrong?.p === p)}>{r.person}</button>)}
        </div>
        <div className="flex flex-col gap-2">
          {tiles.map((x, t) => <button key={t} lang={TL} disabled={usedTiles.has(t)} aria-pressed={tile === t} onClick={() => { setTile(t); tryPair(person, t) }} className={cell(tile === t, usedTiles.has(t), wrong?.t === t)}>{x.form}</button>)}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{wrong ? 'Not a pair.' : `${Object.keys(done).length} of ${total} matched.`}</p>
    </Frame>
  )
}
function Handover({ count, onGo }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-4">
      <p className="text-center text-xl">All matched. {count === 1 ? 'One person comes' : `${count} persons come`} back to pick once more.</p>
      <button onClick={onGo} className="btn-primary">Continue</button>
    </main>
  )
}
