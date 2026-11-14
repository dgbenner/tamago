import { useEffect, useMemo, useRef, useState } from 'react'
import { speakLine, stop } from '../lib/audio.js'
import { HELP_PHRASES, RATES, TURN_LIMIT, converseReady, formIndexFor, newWordsIn, piecesOf, requestTurn } from '../lib/converse.js'
import { TL, course } from '../lib/course.js'
import NeedsSetup from './NeedsSetup.jsx'
import { IconBack, IconKeyboard, IconSpeaker } from './icons.jsx'

// A conversation with Claude (Dan, 2026-11-10): a scene on the path (word prep first, Claude slightly above the
// learner's level so asking for help is the practice) or the partner in Self-Study (the learner's own filters).
// Claude speaks with the device voice; the learner speaks where the browser can listen, and can always type. The help
// phrases sit one tap away and Claude answers each properly. New course words go to the Glossary and Review at the
// end. Never graded.
const Recognition = typeof window !== 'undefined' ? window.SpeechRecognition ?? window.webkitSpeechRecognition : null

function Line({ turn, index, names, picked, onPick }) {
  const pieces = useMemo(() => piecesOf(turn.text, index, names), [turn.text, index, names])
  return (
    <p lang={TL} className="text-lg leading-relaxed">
      {pieces.map((p, i) => (p.word_id || /\p{L}/u.test(p.text) && p.text.trim()
        ? <button key={i} type="button" onClick={() => onPick(p.text)} aria-pressed={picked === p.text}
            className={`rounded-sm ${picked === p.text ? 'bg-orange text-white' : 'underline decoration-line decoration-2 underline-offset-4 hover:bg-line'}`}>{p.text}</button>
        : <span key={i}>{p.text}</span>))}
    </p>
  )
}

export default function Conversation({ mode, scene, settings, known, pool, names, helpLevel, words, metIds, cantSpeak, onReview, onEnd, onBack }) {
  const [ready, setReady] = useState(null)
  const [phase, setPhase] = useState(mode === 'scene' ? 'prep' : 'talk')
  const [turns, setTurns] = useState([]) // { role: 'ai' | 'learner', text, english, correction, help }
  const [draft, setDraft] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [error, setError] = useState('')
  const [picked, setPicked] = useState(null)
  const [typing, setTyping] = useState(cantSpeak || !Recognition)
  const [listening, setListening] = useState(false)
  const [showEnglish, setShowEnglish] = useState({})
  const [review, setReview] = useState(null)
  const [newWords, setNewWords] = useState([])
  const inputRef = useRef(null)
  const endRef = useRef(null)
  const recRef = useRef(null)
  const index = useMemo(() => formIndexFor(words), [words])
  const rate = RATES[settings.speed] ?? RATES.normal
  const phrases = HELP_PHRASES[course.id].filter((h) => h.level <= helpLevel)
  const learnerTurns = turns.filter((t) => t.role === 'learner').length
  const left = TURN_LIMIT - learnerTurns
  const lastAi = [...turns].reverse().find((t) => t.role === 'ai')
  const keyWords = (scene.keys ?? []).map((k) => words.find((w) => w.form === k)).filter(Boolean)

  useEffect(() => { converseReady().then(setReady) }, [])
  useEffect(() => () => { stop(); recRef.current?.abort?.() }, [])
  useEffect(() => { endRef.current?.scrollIntoView?.({ block: 'end' }) }, [turns, waiting])

  const body = (history) => ({
    lang: course.id, scene, stretch: mode === 'scene' ? 'scene' : settings.vocabulary === 'few' ? 'few' : 'mine',
    corrections: settings.corrections, known, pool, names,
    messages: history.map((t) => ({ role: t.role, text: t.text, help: t.help })),
  })
  // Claude's next line. A help tap that asked for slower speech gets the slow voice for the answer.
  const next = async (history, slowNext = false) => {
    setWaiting(true); setError('')
    const res = await requestTurn(body(history))
    setWaiting(false)
    if (!res.result) { setError(res.error === 'offline' ? 'No connection. Try again.' : res.error === 'busy' ? 'Claude is busy. Try again in a moment.' : 'That didn\'t work. Try again.'); return }
    const r = res.result
    const withCorrection = r.correction && settings.corrections === 'each' ? history.map((t, i) => (i === history.length - 1 && t.role === 'learner' && !t.help ? { ...t, correction: r.correction } : t)) : history
    const turn = { role: 'ai', text: String(r.say ?? '').trim(), english: String(r.english ?? '').trim() }
    const all = [...withCorrection, turn]
    setTurns(all)
    setPicked(null)
    speakLine(turn.text, slowNext ? RATES.slow : rate)
    if (r.done || all.filter((t) => t.role === 'learner').length >= TURN_LIMIT) finish(all)
  }
  const start = () => { setPhase('talk'); next([]) }
  useEffect(() => { if (ready && phase === 'talk' && !turns.length && !waiting && mode !== 'scene') next([]) }, [ready]) // the partner starts at once

  const send = (text, help = null) => {
    const t = text.trim()
    if (!t || waiting || left <= 0) return
    const history = [...turns, { role: 'learner', text: t, help }]
    setTurns(history); setDraft('')
    next(history, help === 'slower')
  }
  const tapHelp = (h) => {
    if (h.frame) { setDraft(h.frame); setTyping(true); setTimeout(() => { const el = inputRef.current; el?.focus(); if (h.caret) el?.setSelectionRange(h.caret, h.caret) }, 0); return }
    send(h.help === 'meaning' && picked && h.withWord ? h.withWord(picked) : h.text, h.help)
  }
  const listen = () => {
    if (!Recognition || listening) return
    const rec = new Recognition()
    rec.lang = course.voice[0]; rec.interimResults = false; rec.maxAlternatives = 1
    rec.onresult = (e) => { const said = e.results?.[0]?.[0]?.transcript ?? ''; setDraft(said) }
    rec.onerror = (e) => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') setTyping(true) }
    rec.onend = () => setListening(false)
    recRef.current = rec
    setListening(true)
    stop()
    rec.start()
  }
  // The end: corrections if set to the end, then the course words Claude used that the learner hadn't met.
  const finish = async (all = turns) => {
    stop()
    setPhase('end')
    const found = newWordsIn(all.filter((t) => t.role === 'ai').map((t) => t.text), words, metIds, names)
    setNewWords(found)
    onEnd(found)
    if (settings.corrections === 'end' && all.some((t) => t.role === 'learner' && !t.help)) {
      const res = await requestTurn(body(all), 'review')
      setReview(res.result?.notes ?? [])
    }
  }

  if (ready === false) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
        <header className="flex items-center gap-2"><button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button><h1 className="text-xl font-semibold">{scene.title}</h1></header>
        <NeedsSetup title="Conversation">A short spoken or typed exchange with Claude in {course.name}. Needs the API key.</NeedsSetup>
      </main>
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
        {phase === 'talk' && <span className="ml-auto text-sm text-muted">{left} {left === 1 ? 'turn' : 'turns'} left</span>}
      </header>

      {phase === 'prep' && (
        <section className="flex flex-col gap-4" aria-labelledby="prep-h">
          <h2 id="prep-h" className="font-semibold">Words for This Scene</h2>
          <p className="-mt-2 text-sm text-muted">{scene.about ?? scene.setting} Claude will speak a little above your level on purpose: when you're lost, the help phrases are one tap away.</p>
          <ul className="grid grid-cols-2 gap-3">
            {keyWords.map((w) => (
              <li key={w.word_id}>
                <button onClick={() => speakLine(w.form, rate)} className="flex w-full flex-col items-center gap-1 rounded-xl border-2 border-line bg-surface p-3">
                  {w.image_file ? <img src={`/images/${w.image_file}`} alt="" className="h-16 w-16 rounded-xl object-contain" /> : <span className="h-2" />}
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
        <ol className={`flex flex-1 flex-col gap-3 ${talk ? '-mx-4 min-h-0 overflow-y-auto px-4 pb-2' : ''}`} aria-live="polite">
          {turns.map((t, i) => (t.role === 'ai'
            ? (
              <li key={i} className="self-start rounded-2xl border-2 border-line bg-surface p-3">
                <Line turn={t} index={index} names={names} picked={i === turns.lastIndexOf(lastAi) ? picked : null} onPick={(w) => setPicked((p) => (p === w ? null : w))} />
                <div className="mt-1 flex gap-3 text-sm">
                  <button onClick={() => speakLine(t.text, rate)} className="btn-tertiary inline-flex items-center gap-1 [&_svg]:size-4"><IconSpeaker /> Again</button>
                  <button onClick={() => setShowEnglish((s) => ({ ...s, [i]: !s[i] }))} className="btn-tertiary">{showEnglish[i] ? 'Hide English' : 'English'}</button>
                </div>
                {showEnglish[i] && t.english && <p className="mt-1 text-sm text-muted">{t.english}</p>}
              </li>
            )
            : (
              <li key={i} className="self-end max-w-[85%] rounded-2xl bg-line p-3">
                <p lang={TL}>{t.text}</p>
                {t.correction && <p className="mt-1 text-sm text-muted">Better: <span lang={TL}>{t.correction}</span></p>}
              </li>
            )))}
          {waiting && <li className="self-start text-muted" aria-label="Claude is answering">…</li>}
          <li ref={endRef} aria-hidden="true" />
        </ol>
      )}

      {phase === 'talk' && (
        <div className="flex shrink-0 flex-col gap-2 border-t-2 border-line bg-bg pt-3">
          {error && <p role="alert" className="text-sm">{error} <button onClick={() => next(turns)} className="btn-tertiary">Try Again</button></p>}
          {phrases.length > 0 && (
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4" role="group" aria-label="Help phrases">
              {phrases.map((h) => (
                <button key={h.help} onClick={() => tapHelp(h)} disabled={waiting || !turns.length} lang={TL}
                  className="shrink-0 rounded-full border-2 border-line bg-surface px-3 py-1.5 text-sm">
                  {h.help === 'meaning' && picked && h.withWord ? h.withWord(picked) : h.text}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); send(draft) }} className="flex items-center gap-2">
            {!typing && (
              <button type="button" onClick={listen} disabled={waiting} aria-pressed={listening} className={`btn-secondary shrink-0 ${listening ? 'outline-4 outline-orange' : ''}`}>
                {listening ? 'Listening…' : 'Speak'}
              </button>
            )}
            <input ref={inputRef} value={draft} onChange={(e) => setDraft(e.target.value)} lang={TL} maxLength={240} aria-label={`Your answer in ${course.name}`}
              placeholder={typing ? `Type in ${course.name}` : 'Or type'} className="min-h-11 min-w-0 flex-1 rounded-xl border-2 border-field bg-surface px-3 text-base" />
            <button type="submit" disabled={!draft.trim() || waiting} className="btn-submit shrink-0">Send</button>
          </form>
          <div className="flex justify-between text-sm">
            {!typing && <button onClick={() => setTyping(true)} className="btn-tertiary inline-flex items-center gap-1 [&_svg]:size-4"><IconKeyboard /> Can't Speak Now</button>}
            <button onClick={() => finish()} disabled={!learnerTurns} className="btn-tertiary ml-auto">End the Conversation</button>
          </div>
        </div>
      )}

      {phase === 'end' && (
        <section className="flex flex-col gap-3" aria-labelledby="end-h">
          <h2 id="end-h" className="font-semibold">End of the Conversation</h2>
          {settings.corrections === 'end' && (
            review === null ? <p className="text-sm text-muted">Looking over what you said…</p>
              : review.length ? (
                <ul className="flex flex-col gap-2">
                  {review.map((n, i) => <li key={i} className="rounded-xl border-2 border-line p-3"><p lang={TL} className="text-muted line-through decoration-1">{n.said}</p><p lang={TL}>{n.better}</p><p className="text-sm text-muted">{n.why}</p></li>)}
                </ul>
              ) : <p className="text-sm text-muted">Nothing to correct.</p>
          )}
          {newWords.length ? (
            <>
              <p>{newWords.length === 1 ? 'One new word' : `${newWords.length} new words`}, now in your Glossary:</p>
              <ul className="flex flex-col gap-1">{newWords.map((w) => <li key={w.word_id}><span lang={TL} className="font-semibold">{w.form}</span> <span className="text-muted">{w.hint}</span></li>)}</ul>
              <button onClick={() => onReview(newWords)} className="btn-submit">Review the New Words</button>
            </>
          ) : <p className="text-sm text-muted">No new course words this time.</p>}
          <button onClick={onBack} className="btn-secondary">Done</button>
        </section>
      )}
    </main>
  )
}
