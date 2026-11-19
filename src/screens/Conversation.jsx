import { useEffect, useMemo, useRef, useState } from 'react'
import { SLOW_RATE, slowText, speakLine, stop } from '../lib/audio.js'
import { usePlaying } from '../lib/use-playing.js'
import { EXCHANGES, RATES, TURN_LIMIT, answerTimes, converseReady, countTalk, formIndexFor, helpRow, newWordsIn, piecesOf, requestTurn, talksLeft, DAILY_CAP } from '../lib/converse.js'
import { TL, course } from '../lib/course.js'
import NeedsSetup from './NeedsSetup.jsx'
import WordPicture from './WordPicture.jsx'
import { IconBack, IconKeyboard, IconMic, IconSpeaker } from './icons.jsx'

// A conversation with Claude, version 2 (Dan, 2026-11-15; all courses): fast recall, natural-speed listening and
// speaking without freezing. A scene on the path (word prep first, Claude slightly above the learner's level) or one
// of the partner's task scenes (only the learner's words). Every partner line is heard first at natural speed in the
// best device voice, its text hidden; after a replay, Slow and Show Words appear, as in lessons. Voice is the default
// and isn't graded; typing is always there. A quiet ring shows how long an answer takes to start (no penalty, no
// cutoff). Four help phrases one tap away. 6 to 8 exchanges, then a summary: average answer time and the change since
// last time, the help phrases used, 2 or 3 gentle corrections, and new course words. Never graded.
const Recognition = typeof window !== 'undefined' ? window.SpeechRecognition ?? window.webkitSpeechRecognition : null
const RING_SECONDS = 10 // the ring fills over this, then stays full while the count goes on
const lineKey = (i) => `talk-line-${i}`

function Line({ turn, index, names, picked, onPick }) {
  const pieces = useMemo(() => piecesOf(turn.text, index, names), [turn.text, index, names])
  return (
    <p lang={TL} className="text-lg leading-relaxed" data-line-words>
      {pieces.map((p, i) => (p.word_id || /\p{L}/u.test(p.text) && p.text.trim()
        ? <button key={i} type="button" onClick={() => onPick(p.text)} aria-pressed={picked === p.text}
            className={`rounded-sm ${picked === p.text ? 'bg-orange text-white' : 'underline decoration-line decoration-2 underline-offset-4 hover:bg-line'}`}>{p.text}</button>
        : <span key={i}>{p.text}</span>))}
    </p>
  )
}

// A partner line: the speaker first; after a replay, Slow and Show Words (lessons' AudioHelp, for the device voice).
function PartnerLine({ turn, i, index, names, picked, onPick, onShow }) {
  const [replayed, setReplayed] = useState(false)
  const [english, setEnglish] = useState(false)
  const playing = usePlaying(lineKey(i))
  return (
    <li className="self-start max-w-[90%] rounded-2xl border-2 border-line bg-surface p-3" data-partner-line>
      <div className="flex items-center gap-2">
        <button onClick={() => { speakLine(turn.text, RATES.natural, undefined, lineKey(i)); setReplayed(true) }} aria-label="Play the line again"
          className="-m-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full"><span aria-hidden="true"><IconSpeaker playing={playing} /></span></button>
        {replayed && <button onClick={() => speakLine(slowText(turn.text), SLOW_RATE, undefined, lineKey(i))} className="btn-tertiary text-xs" data-slow>Slow</button>}
        {(replayed || turn.shown) && !turn.shown && <button onClick={onShow} className="btn-tertiary text-xs" data-show-words>Show Words</button>}
        {turn.shown && turn.english && <button onClick={() => setEnglish((e) => !e)} className="btn-tertiary text-xs">{english ? 'Hide English' : 'English'}</button>}
      </div>
      {turn.shown && <Line turn={turn} index={index} names={names} picked={picked} onPick={onPick} />}
      {turn.shown && english && <p className="mt-1 text-sm text-muted">{turn.english}</p>}
    </li>
  )
}

// The quiet answer-time ring: a thin muted ring filling over RING_SECONDS, the seconds inside. No color change, no
// sound, nothing at any limit.
function AnswerRing({ since }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { if (!since) return; const t = setInterval(() => setNow(Date.now()), 250); return () => clearInterval(t) }, [since])
  if (!since) return <span className="h-11 w-11 shrink-0" aria-hidden="true" />
  const s = Math.max(0, (now - since) / 1000)
  const r = 18, c = 2 * Math.PI * r
  return (
    <span role="timer" aria-label={`Answer time, ${Math.floor(s)} ${Math.floor(s) === 1 ? 'second' : 'seconds'}`} className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center" data-answer-ring>
      <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="22" cy="22" r={r} fill="none" stroke="var(--line)" strokeWidth="3" />
        <circle cx="22" cy="22" r={r} fill="none" stroke="var(--muted)" strokeWidth="3" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(1, s / RING_SECONDS))} />
      </svg>
      <span className="text-xs text-muted tabular-nums" aria-hidden="true">{Math.floor(s)}</span>
    </span>
  )
}

export default function Conversation({ mode, scene, known, pool, names, helpLevel, words, metIds, cantSpeak, lastAverage = null, onReview, onEnd, onBack }) {
  const [ready, setReady] = useState(null)
  const [phase, setPhase] = useState(mode === 'scene' ? 'prep' : 'talk')
  const [turns, setTurns] = useState([]) // { role: 'ai' | 'learner', text, english, help, spoken, shown }
  const [draft, setDraft] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [error, setError] = useState('')
  const [picked, setPicked] = useState(null)
  const [typing, setTyping] = useState(cantSpeak || !Recognition)
  const [listening, setListening] = useState(false)
  const [review, setReview] = useState(null)
  const [newWords, setNewWords] = useState([])
  const [since, setSince] = useState(null) // when the answer clock started (the partner's line ended)
  const times = useRef([]) // ms per answer, help taps not counted (a ref: finish can run from a timer)
  const sinceRef = useRef(null)
  const ended = useRef(false)
  const [summary, setSummary] = useState(null)
  const [capped, setCapped] = useState(() => talksLeft() <= 0)
  const answerStarted = useRef(null) // ms to the start of the answer in hand
  const lineTimer = useRef(null)
  const inputRef = useRef(null)
  const endRef = useRef(null)
  const recRef = useRef(null)
  const index = useMemo(() => formIndexFor(words), [words])
  const phrases = helpRow(course.id, helpLevel)
  const learnerTurns = turns.filter((t) => t.role === 'learner').length
  const answered = turns.filter((t) => t.role === 'learner' && !t.help).length
  const lastAiAt = turns.findLastIndex((t) => t.role === 'ai')
  const keyWords = (scene.keys ?? []).map((k) => words.find((w) => w.form === k)).filter(Boolean)

  useEffect(() => { converseReady().then(setReady) }, [])
  useEffect(() => () => { stop(); recRef.current?.abort?.(); clearTimeout(lineTimer.current) }, [])
  useEffect(() => { endRef.current?.scrollIntoView?.({ block: 'end' }) }, [turns, waiting])

  // The clock starts when the partner's line has been spoken (or, if the voice never reports, a moment after it
  // would have), and stops at the first sign of an answer: Speak, a typed letter, or a help phrase.
  const clock = (v) => { sinceRef.current = v; setSince(v) }
  const startClock = () => { clearTimeout(lineTimer.current); if (sinceRef.current == null && !ended.current) { answerStarted.current = null; clock(Date.now()) } }
  const markAnswer = () => {
    if (sinceRef.current != null && answerStarted.current == null) answerStarted.current = Date.now() - sinceRef.current
    clock(null); clearTimeout(lineTimer.current)
  }

  const body = (history) => ({
    v: 2, lang: course.id, scene, stretch: mode === 'scene' ? 'scene' : 'mine', corrections: 'end', known, pool, names,
    messages: history.map((t) => ({ role: t.role, text: t.text, help: t.help, spoken: t.spoken })),
  })
  const say = (text, i, rate = RATES.natural) => {
    clock(null)
    speakLine(text, rate, startClock, lineKey(i))
    clearTimeout(lineTimer.current)
    lineTimer.current = setTimeout(startClock, 2500 + text.length * 90)
  }
  // The partner's next line. "More slowly" gets the slow voice for the answer; a spelling answer shows its words.
  const next = async (history, help = null) => {
    if (!history.length && talksLeft() <= 0) { setCapped(true); return }
    setWaiting(true); setError('')
    const res = await requestTurn(body(history))
    setWaiting(false)
    if (!res.result) {
      setError(res.error === 'monthly' ? 'This month\'s Claude allowance for Tamago is used up. Conversations come back next month.'
        : res.error === 'offline' ? 'No connection. Try again.' : res.error === 'busy' ? 'Claude is busy. Try again in a moment.' : 'That didn\'t work. Try again.')
      return
    }
    if (!history.length) countTalk()
    const r = res.result
    const turn = { role: 'ai', text: String(r.say ?? '').trim(), english: String(r.english ?? '').trim(), shown: help === 'spell' }
    const all = [...history, turn]
    setTurns(all)
    setPicked(null)
    say(turn.text, all.length - 1, help === 'slower' ? RATES.slow : RATES.natural)
    const n = all.filter((t) => t.role === 'learner' && !t.help).length
    if ((r.done && n >= 1) || n >= EXCHANGES.max || all.filter((t) => t.role === 'learner').length >= TURN_LIMIT) setTimeout(() => finish(all), 2500 + turn.text.length * 60)
  }
  const start = () => { if (talksLeft() <= 0) { setCapped(true); return } setPhase('talk'); next([]) }
  useEffect(() => { if (ready && !capped && phase === 'talk' && !turns.length && !waiting && mode !== 'scene') next([]) }, [ready]) // the partner starts at once

  const send = (text, help = null, spoken = false) => {
    const t = text.trim()
    if (!t || waiting || learnerTurns >= TURN_LIMIT) return
    markAnswer()
    if (!help && answerStarted.current != null) times.current.push(answerStarted.current)
    answerStarted.current = null
    const history = [...turns, { role: 'learner', text: t, help, spoken }]
    setTurns(history); setDraft('')
    next(history, help)
  }
  const tapHelp = (h) => {
    markAnswer(); answerStarted.current = null // a help tap is not an answer: its time isn't counted
    if (h.frame) { setDraft(h.frame); setTyping(true); setTimeout(() => { const el = inputRef.current; el?.focus(); if (h.caret) el?.setSelectionRange(h.caret, h.caret) }, 0); return }
    send(picked && h.withWord ? h.withWord(picked) : h.text, h.help)
  }
  // Voice is the default: what the browser hears is sent as it is (never graded; Claude is told it came from speech).
  const listen = () => {
    if (!Recognition || listening) return
    markAnswer()
    const rec = new Recognition()
    rec.lang = course.voice[0]; rec.interimResults = false; rec.maxAlternatives = 1
    rec.onresult = (e) => { const said = e.results?.[0]?.[0]?.transcript ?? ''; if (said.trim()) send(said, null, true) }
    rec.onerror = (e) => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') setTyping(true) }
    rec.onend = () => setListening(false)
    recRef.current = rec
    setListening(true)
    stop()
    rec.start()
  }
  // The summary: answer time, help phrases used, gentle corrections, and the course words the learner hadn't met.
  const finish = async (all = turns) => {
    if (ended.current) return
    ended.current = true
    stop(); clearTimeout(lineTimer.current); clock(null)
    setPhase('end')
    const found = newWordsIn(all.filter((t) => t.role === 'ai').map((t) => t.text), words, metIds, names)
    setNewWords(found)
    const timeLine = answerTimes(times.current, lastAverage)
    const used = new Map()
    for (const t of all) if (t.role === 'learner' && t.help) { const p = phrases.find((h) => h.help === t.help); const k = p?.text ?? t.text; used.set(k, (used.get(k) ?? 0) + 1) }
    setSummary({ time: timeLine, help: [...used] })
    onEnd(found, timeLine?.avg ?? null)
    if (all.some((t) => t.role === 'learner' && !t.help)) {
      const res = await requestTurn(body(all), 'review')
      setReview((res.result?.notes ?? []).slice(0, 3))
    } else setReview([])
  }

  const frame = (children) => (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2"><button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button><h1 className="text-xl font-semibold">{scene.title}</h1></header>
      {children}
    </main>
  )
  if (ready === false) return frame(<NeedsSetup title="Conversation">A short spoken or typed exchange with Claude in {course.name}. Needs the API key.</NeedsSetup>)
  if (capped && !turns.length) {
    return frame(
      <section className="flex flex-col gap-3" data-talk-capped>
        <p>Today's {DAILY_CAP} conversations on this device are used. More tomorrow.</p>
        <button onClick={onBack} className="btn-secondary">Back</button>
      </section>,
    )
  }

  // While talking (Dan, 2026-11-13) the screen is exactly the window's height: the header and the reply bar stay put
  // and only the dialogue between them scrolls. Before and after, the page scrolls as a whole.
  const talk = phase === 'talk'
  return (
    <main className={`mx-auto flex max-w-md flex-col gap-4 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] ${talk ? 'h-dvh overflow-hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]' : 'min-h-dvh pb-6'}`}>
      <header className="flex shrink-0 items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">{scene.title}</h1>
        {talk && <span className="ml-auto text-sm text-muted" data-exchange>{Math.min(answered + 1, EXCHANGES.max)} of {EXCHANGES.max}</span>}
      </header>

      {phase === 'prep' && (
        <section className="flex flex-col gap-4" aria-labelledby="prep-h">
          <h2 id="prep-h" className="font-semibold">Words for This Scene</h2>
          <p className="-mt-2 text-sm text-muted">{scene.about ?? scene.setting} Claude will speak a little above your level on purpose: when you're lost, the help phrases are one tap away.</p>
          <ul className="grid grid-cols-2 gap-3">
            {keyWords.map((w) => (
              <li key={w.word_id}>
                <button onClick={() => speakLine(w.form, RATES.normal)} className="flex w-full flex-col items-center gap-1 rounded-xl border-2 border-line bg-surface p-3">
                  {w.image_file ? <WordPicture src={`/images/${w.image_file}`} className="h-16 w-16" fit="object-contain" /> : <span className="h-2" />}
                  <span lang={TL} className="font-semibold">{w.form}</span>
                  <span className="text-sm text-muted">{w.hint}</span>
                </button>
              </li>
            ))}
          </ul>
          <button onClick={start} disabled={ready !== true} className="btn-submit">Start the Conversation</button>
        </section>
      )}

      {phase !== 'prep' && (
        <ol className={`flex flex-col gap-3 ${talk ? '-mx-4 min-h-0 flex-1 overflow-y-auto px-4 pb-2' : ''}`} aria-live="polite">
          {turns.map((t, i) => (t.role === 'ai'
            ? <PartnerLine key={i} turn={t} i={i} index={index} names={names} picked={i === lastAiAt ? picked : null}
                onPick={(w) => setPicked((p) => (p === w ? null : w))} onShow={() => setTurns((ts) => ts.map((x, k) => (k === i ? { ...x, shown: true } : x)))} />
            : (
              <li key={i} className="self-end max-w-[85%] rounded-2xl bg-line p-3">
                <p lang={TL}>{t.text}</p>
              </li>
            )))}
          {waiting && <li className="self-start text-muted" aria-label="Claude is answering">…</li>}
          <li ref={endRef} aria-hidden="true" />
        </ol>
      )}

      {talk && (
        <div className="flex shrink-0 flex-col gap-2 border-t-2 border-line bg-bg pt-3">
          {error && <p role="alert" className="text-sm">{error} {!/month/.test(error) && <button onClick={() => next(turns)} className="btn-tertiary">Try Again</button>}</p>}
          {phrases.length > 0 && (
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4" role="group" aria-label="Help phrases" data-help-row>
              {phrases.map((h) => (
                <button key={h.help} onClick={() => tapHelp(h)} disabled={waiting || !turns.length} lang={TL} data-help={h.help}
                  className="shrink-0 rounded-full border-2 border-line bg-surface px-3 py-1.5 text-sm">
                  {picked && h.withWord ? h.withWord(picked) : h.text}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); send(draft) }} className="flex items-center gap-2">
            <AnswerRing since={since} />
            {!typing && (
              <button type="button" onClick={listen} disabled={waiting} aria-pressed={listening} data-speak
                className={`btn-secondary inline-flex shrink-0 items-center gap-1 [&_svg]:size-5 ${listening ? 'outline-4 outline-orange' : ''}`}>
                <IconMic live={listening} /> {listening ? 'Listening…' : 'Speak'}
              </button>
            )}
            <input ref={inputRef} value={draft} onChange={(e) => { if (e.target.value) markAnswer(); setDraft(e.target.value) }} lang={TL} maxLength={240} aria-label={`Your answer in ${course.name}`}
              placeholder={typing ? `Type in ${course.name}` : 'Or type'} className="min-h-11 min-w-0 flex-1 rounded-xl border-2 border-field bg-surface px-3 text-base" />
            <button type="submit" disabled={!draft.trim() || waiting} className="btn-submit shrink-0">Send</button>
          </form>
          <div className="flex justify-between text-sm">
            {!typing && <button onClick={() => setTyping(true)} className="btn-tertiary inline-flex items-center gap-1 [&_svg]:size-4"><IconKeyboard /> Can't Speak Now</button>}
            <button onClick={() => finish()} disabled={!answered} className="btn-tertiary ml-auto">End the Conversation</button>
          </div>
        </div>
      )}

      {phase === 'end' && (
        <section className="flex flex-col gap-5" aria-labelledby="end-h" data-talk-summary>
          <h2 id="end-h" className="font-semibold">End of the Conversation</h2>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-muted">Answer Time</h3>
            {summary?.time ? <><p className="text-lg">{summary.time.line}</p><p className="text-sm text-muted">{summary.time.change}</p></> : <p className="text-sm text-muted">No answers timed this time.</p>}
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-muted">Help Phrases Used</h3>
            {summary?.help.length
              ? <ul className="flex flex-col gap-0.5">{summary.help.map(([text, n]) => <li key={text}><span lang={TL}>{text}</span>{n > 1 && <span className="text-muted"> × {n}</span>}</li>)}</ul>
              : <p className="text-sm text-muted">None this time.</p>}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm text-muted">A Few Better Ways</h3>
            {review === null ? <p className="text-sm text-muted">Looking over what you said…</p>
              : review.length ? (
                <ul className="flex flex-col gap-2">
                  {review.map((n, i) => <li key={i} className="rounded-xl border-2 border-line p-3"><p lang={TL} className="text-muted">{n.said}</p><p lang={TL}>{n.better}</p><p className="text-sm text-muted">{n.why}</p></li>)}
                </ul>
              ) : <p className="text-sm text-muted">Nothing to change.</p>}
          </div>
          {newWords.length ? (
            <div className="flex flex-col gap-2">
              <p>{newWords.length === 1 ? 'One new word' : `${newWords.length} new words`}, now in your Glossary:</p>
              <ul className="flex flex-col gap-1">{newWords.map((w) => <li key={w.word_id}><span lang={TL} className="font-semibold">{w.form}</span> <span className="text-muted">{w.hint}</span></li>)}</ul>
              <button onClick={() => onReview(newWords)} className="btn-submit">Review the New Words</button>
            </div>
          ) : null}
          <button onClick={onBack} className="btn-secondary">Done</button>
        </section>
      )}
    </main>
  )
}
