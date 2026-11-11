import { explain } from '../lib/explain.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { checkTyped, diffMarks, nearMiss } from '../lib/check.js'
import { PART_LABEL } from '../lib/finalcheck.js'
import { useRecorder } from '../lib/recorder.js'
import { play, stop } from '../lib/audio.js'
import { IconChips, IconClose, IconComment, IconFlag, IconKeyboard, IconSpeaker } from './icons.jsx'
import { TL, course } from '../lib/course.js'
import { FormFill, ListenNumber, ReadText, WriteMessage } from './A1Tasks.jsx'

const PROMPT = {
  QT01: 'Match the Pairs', QT02: 'Pick the Picture', QT10: 'Say It Aloud', QT13: 'Speak and Compare', QT03: 'Pick the Meaning', QT04: 'Pick What You Heard', QT05: 'Fill in the Blank', QT06: 'Translate',
  QT07: 'Tap What You Hear', QT08: 'Translate', QT09: 'Answer the Question', QT11: 'Type What You Hear', QT12: 'Translate',
  QT14: 'Read and Answer', QT15: 'Fill In the Form', QT16: 'Write a Message', QT17: 'Write What You Hear', QT18: 'Type the Word',
}
const LISTENING = new Set(['QT04', 'QT07', 'QT11'])
const LISTEN_FIRST = new Set(['QT03', 'QT06'])
const SHOWS_FRENCH = new Set(['QT01', 'QT02', 'QT03', 'QT05', 'QT06']) // the New word tag needs a word on screen

// The heading says what the learner is doing right now: with the French hidden it's a listening task, and a
// chip question switched to the keyboard is a typing one (craft review, fixes 8 and 9).
function headingFor(q, { hideFrench, result, typing }) {
  if (hideFrench && !result) return q.type === 'QT03' ? 'Listen and Pick the Meaning' : 'Listen and Translate'
  if (q.type === 'QT07' && (typing || q.typed)) return 'Type What You Hear'
  if (q.type === 'QT17' && q.readInstead) return 'Write the Number'
  return PROMPT[q.type]
}

// R18: a rotating line for the answer bar, never the same one twice running. French lines come in at
// french_feedback_rate ("about 1 per lesson"). FB24 says the item comes back, so only a first-attempt miss in a lesson uses it.
const FRENCH_RATE = 0.1
// "Close." and "Almost." only for a near miss (nearMiss in check.js): one word or two letters off.
const NEAR_ONLY = new Set(['FB21', 'FB25'])
function pickPhrase(phrases, q, r, kind, lastId) {
  const context = r.typo ? 'typo' : r.accent ? 'accent' : r.correct ? 'correct' : 'incorrect'
  const comesBack = kind === 'lesson' && !q.reask
  const pool = phrases.filter((p) => p.context === context && p.phrase_id !== lastId && (p.phrase_id !== 'FB24' || comesBack) && (r.near || !NEAR_ONLY.has(p.phrase_id)))
  const french = pool.filter((p) => p.language !== 'en') // the course language's lines
  const english = pool.filter((p) => p.language === 'en')
  const from = french.length && Math.random() < FRENCH_RATE ? french : english.length ? english : pool
  return from.length ? from[Math.floor(Math.random() * from.length)] : null
}

export default function Lesson({ session, content, settings, seenWords, cantListen, onAnswer, onHint, onFlag, onExit, onAdvance, onFinish, onCantNow }) {
  const q = session.queue[session.index]
  const [result, setResult] = useState(null)
  const [typing, setTyping] = useState(false) // a chip question switched to the keyboard
  const barMax = useRef(0)
  useEffect(() => { setTyping(false) }, [q.qid])

  const tagRound = q.round <= 2
  const newWords = useMemo(() => {
    const ids = q.word_ids ?? (q.segments ?? []).map((s) => s.word_id).filter(Boolean)
    return new Set(tagRound ? ids.filter((id) => !seenWords.has(id)) : [])
  }, [q.qid])
  // Listen first: audio with the French hidden until the answer. A sentence with a new word stays visible,
  // since the word has to be shown to be taught.
  const hideFrench = useMemo(() => LISTEN_FIRST.has(q.type) && settings.listen_first === 'on' && !cantListen && newWords.size === 0, [q.qid])

  useEffect(() => {
    if (LISTENING.has(q.type) || q.type === 'QT10' || (q.type === 'QT13' && q.variant !== 'V1302') || (q.type === 'QT02' && q.variant === 'V0201')
      || (q.type === 'QT09' && q.variant !== 'V0903') || hideFrench) play(q.audio)
    return stop
  }, [q.qid])

  const lastPhrase = useRef(null)
  const answer = (r) => {
    // Speaking isn't judged, so it gets no feedback line. A mistapped pair gets the plain "Not quite." and the pair itself.
    const near = !r.correct && r.given != null && nearMiss(r.given, r.against ?? q.accepted ?? [], r.lang ?? q.lang)
    const phrase = r.testSkip || r.speaking || (q.type === 'QT01' && !r.correct) ? null : pickPhrase(content.feedback_phrases, q, { ...r, near }, session.kind, lastPhrase.current)
    if (phrase) lastPhrase.current = phrase.phrase_id
    const full = { ...r, hidden: hideFrench, phrase }
    setResult(full)
    onAnswer(q, full)
  }

  const advance = () => {
    const nextIndex = session.index + 1
    setResult(null)
    if (nextIndex >= session.queue.length) onFinish(session)
    else onAdvance({ ...session, index: nextIndex })
  }

  // Testing shortcuts (a setting): pass the question as correct, or Continue when an answer is showing.
  // Right arrow on a keyboard; on a touch screen, a swipe left that starts on the right half.
  // In a field with text the arrow stays a cursor key.
  useEffect(() => {
    if (settings.test_shortcuts !== 'on') return undefined
    const pass = () => (result ? advance() : answer({ correct: true, testSkip: true }))
    const onKey = (e) => {
      if (e.key !== 'ArrowRight' || e.repeat || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return
      if (e.target instanceof HTMLInputElement && e.target.value) return
      e.preventDefault()
      pass()
    }
    let start = null
    const onStart = (e) => {
      const t = e.touches[0]
      start = e.touches.length === 1 && t.clientX > window.innerWidth / 2 ? { x: t.clientX, y: t.clientY, at: Date.now() } : null
    }
    const onEnd = (e) => {
      if (!start) return
      const t = e.changedTouches[0]
      const dx = t.clientX - start.x
      const dy = Math.abs(t.clientY - start.y)
      const quick = Date.now() - start.at < 700
      start = null
      if (dx < -70 && dy < Math.abs(dx) / 2 && quick) pass()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [result, session, settings.test_shortcuts])

  // Keyboard (WCAG 2.1.1): Enter checks the answer. On a choice or chip that isn't picked yet, Enter picks it (the
  // button's own action), so Enter works through a whole question: pick, pick, check.
  const mainRef = useRef(null)
  useEffect(() => {
    if (result) return undefined
    const onKey = (e) => {
      if (e.key !== 'Enter' || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) return // a field submits itself
      if (t instanceof HTMLButtonElement && !t.disabled && t.dataset.check === undefined && t.getAttribute('aria-pressed') !== 'true') return
      const check = mainRef.current?.querySelector('[data-check]:not(:disabled)')
      if (!check) return
      e.preventDefault()
      check.click()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [result, q.qid])
  // A new question: focus its heading, so a screen reader starts there and Tab goes to the first control.
  // A typed question focuses its field instead (autoFocus).
  const headingRef = useRef(null)
  useEffect(() => {
    if (!mainRef.current?.querySelector('input[autofocus], input:focus')) headingRef.current?.focus({ preventScroll: true })
  }, [q.qid])

  useEffect(() => {
    if (!result) return undefined
    // A test skip goes straight on, once the session holds its answer.
    if (result.testSkip) { advance(); return undefined }
    const onKey = (e) => { if (e.key === 'Enter') { e.preventDefault(); advance() } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [result, session])

  const shareDone = session.index / session.queue.length
  barMax.current = Math.max(barMax.current, shareDone)
  const showCantNow = !result && onCantNow && (q.speaking || (!cantListen && (LISTENING.has(q.type) || hideFrench)))
  const props = { q, content, settings, cantListen, result, onAnswer: answer, newWords, hideFrench, onHint: (seg) => onHint(q, seg), onTyping: setTyping }

  return (
    <main ref={mainRef} className="lesson mx-auto flex min-h-dvh max-w-md flex-col px-4 pt-[max(0.75rem,env(safe-area-inset-top))] lg:max-w-2xl">
      <header className="sticky top-0 z-10 -mx-4 flex items-center gap-3 bg-bg px-4 pb-2">
        <button onClick={onExit} aria-label="Leave lesson" className="icon-btn -ml-2"><IconClose /></button>
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-line" role="progressbar" aria-label="Lesson progress" aria-valuenow={Math.round(barMax.current * 100)} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-green" style={{ width: `${barMax.current * 100}%` }} />
        </div>
      </header>

      <div className={`flex flex-1 flex-col gap-5 pt-5 ${result ? 'pb-56' : showCantNow ? 'pb-1' : 'pb-[max(1rem,env(safe-area-inset-bottom))]'}`}>
        {/* The final A1 check names the part a question belongs to (listening, reading, writing, speaking). */}
        {q.part && <p className="-mb-3 text-sm font-medium text-muted">{PART_LABEL[q.part]}</p>}
        <div className="flex items-center gap-2">
          <h1 ref={headingRef} tabIndex={-1} className="text-xl font-semibold outline-none">{headingFor(q, { hideFrench, result, typing })}</h1>
          {newWords.size > 0 && SHOWS_FRENCH.has(q.type) && !hideFrench && <span className="tag"><span className="new-dot" aria-hidden="true" />New</span>}
        </div>
        <Question key={q.qid} {...props} />
      </div>

      {/* Old Duolingo's switch, on the question itself: faint, bottom centre. It pauses for an hour, like Settings. */}
      {showCantNow && (
        <div className="flex justify-center pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <button onClick={() => onCantNow(q.speaking ? 'speak' : 'listen')} className="btn-tertiary text-xs">
            {q.speaking ? "Can't Speak Now" : "Can't Listen Now"}
          </button>
        </div>
      )}

      {result && !result.testSkip && <AnswerBar q={q} result={result} cantListen={cantListen} flagReasons={content.flag_reasons} onFlag={(id) => onFlag(q, id, result)} onContinue={advance} />}
    </main>
  )
}

function Question({ q, ...rest }) {
  const typedOnly = Boolean(q.typed)
  const C = typedOnly ? Typed : { QT01: MatchPairs, QT02: WordImage, QT10: Speak, QT13: Speak, QT03: PickMeaning, QT04: PickHeard, QT05: FillBlank, QT06: Build, QT07: Build, QT08: Build, QT09: Build, QT11: Typed, QT12: Typed, QT14: ReadText, QT15: FormFill, QT16: WriteMessage, QT17: ListenNumber, QT18: TypeWord }[q.type]
  return <C q={q} {...rest} />
}

function SpeakerButton({ audio, slow, label = 'Play', large }) {
  return (
    <button onClick={() => play(audio, { slow })} aria-label={label} className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 border-line bg-surface ${large ? 'h-16 w-16' : 'min-h-11 min-w-11 px-3'}`}>
      <span aria-hidden="true"><IconSpeaker /></span>
      {slow && <span className="text-sm">Slow</span>}
    </button>
  )
}

// The French, with a dotted underline on each word that has a hint.
function FrenchText({ q, newWords, onHint, blankIndex = null, filled = null }) {
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
              className="underline decoration-dotted decoration-2 underline-offset-4"
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
function FirstSight({ q, newWords, except = null }) {
  const lines = (q.segments ?? []).filter((seg, i) => i !== except && seg.word_id && newWords.has(seg.word_id) && seg.hint)
  if (lines.length === 0) return null
  return <p className="text-sm text-muted">{lines.map((seg) => `${seg.text.toLowerCase()} = ${seg.hint}`).join(', ')}</p>
}

// A dialogue speaker. The image slot holds a placeholder until the animal characters exist.
function SpeakerBubble({ children }) {
  return (
    <div className="flex items-start gap-3">
      <img src="/logo.webp" width="384" height="256" alt="" className="h-12 w-12 shrink-0 object-contain" />
      <div className="rounded-2xl rounded-tl-sm border-2 border-line bg-surface px-4 py-3">{children}</div>
    </div>
  )
}

function ChoiceList({ choices, result, chosen, answer, onPick, lang }) {
  return (
    <div className="flex flex-col gap-2.5">
      {choices.map((choice) => {
        const state = !result ? '' : choice.toLowerCase() === answer.toLowerCase() ? 'choice-right' : choice === chosen ? 'choice-wrong' : 'opacity-60'
        return <button key={choice} lang={lang} disabled={Boolean(result)} onClick={() => onPick(choice)} className={`choice ${state}`}>{choice}</button>
      })}
    </div>
  )
}

// Word to image (QT02).
function WordImage({ q, result, onAnswer, newWords }) {
  const [chosen, setChosen] = useState(null)
  return (
    <>
      <div className="flex items-center gap-3">
        {q.variant === 'V0202'
          ? <p className="text-2xl">{q.hint}</p>
          : <><p lang={TL} className="relative text-2xl">{q.form}{newWords.has(q.word_id) && <span className="new-dot absolute -top-0.5 left-full ml-0.5 size-1.5" aria-hidden="true" />}</p><SpeakerButton audio={q.audio} label="Play the word" /></>}
      </div>
      <div className={`grid gap-3 ${q.choices.length === 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {q.choices.map((ch, i) => {
          const state = !result ? '' : ch.word_id === q.answer ? 'choice-right' : ch.word_id === chosen ? 'choice-wrong' : 'opacity-60'
          return (
            <button key={ch.word_id} aria-label={ch.label ?? (ch.alt ? `Picture: ${ch.alt}` : `Picture ${i + 1}`)} disabled={Boolean(result)}
              onClick={() => { setChosen(ch.word_id); onAnswer({ correct: ch.word_id === q.answer }) }}
              className={`choice flex flex-col items-center justify-center gap-1 p-2 text-center ${state}`}>
              <img src={ch.image} alt="" className="h-20 w-20" />
              {ch.label && <span lang={TL} className="text-base">{ch.label}</span>}
            </button>
          )
        })}
      </div>
    </>
  )
}

// Speaking, never graded (QT10, QT13). Done counts it; nothing is scored and nothing is kept.
function Speak({ q, result, onAnswer, newWords, onHint }) {
  const fromMemory = q.variant === 'V1302'
  const compare = q.type === 'QT13'
  const [reveal, setReveal] = useState(compare && !fromMemory)
  const rec = useRecorder()
  const model = q.native ? 'Native Recording' : 'Model'
  const done = () => { rec.stop(); onAnswer({ correct: true, speaking: true }) }
  return (
    <>
      {fromMemory && !result ? <p className="text-2xl leading-relaxed">{q.english}</p> : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <SpeakerButton audio={q.audio} large label={model} />
            {compare && <span className="text-sm text-muted">{model}</span>}
          </div>
          {reveal || result
            ? <FrenchText q={q} newWords={newWords} onHint={onHint} />
            : <button onClick={() => setReveal(true)} className="self-start text-sm text-muted underline underline-offset-4">Show the {course.name}</button>}
        </div>
      )}
      {!result && compare && (
        rec.state === 'unavailable'
          ? <p className="text-sm text-muted">Recording isn't available here. Say it aloud, then tap Done.</p>
          : (
            <div className="flex flex-wrap items-center gap-2">
              {rec.state === 'recording'
                ? <button onClick={rec.stop} className="btn-secondary px-5">Stop</button>
                : <button onClick={rec.start} className="btn-secondary px-5">{rec.state === 'done' ? 'Record again' : 'Record'}</button>}
              {rec.state === 'done' && (
                <>
                  <button onClick={() => play(q.audio)} className="btn-secondary px-4">{model}</button>
                  <button onClick={rec.playBack} className="btn-secondary px-4">Yours</button>
                </>
              )}
            </div>
          )
      )}
      {!result && !compare && <p className="text-sm text-muted">Say it aloud, then tap Done.</p>}
      {!result && (
        <div className="action-row">
          <button data-check onClick={done} disabled={compare && rec.state !== 'done' && rec.state !== 'unavailable'} className="btn-submit w-full">Done</button>
        </div>
      )}
    </>
  )
}

function PickMeaning({ q, result, onAnswer, newWords, hideFrench, onHint }) {
  const [chosen, setChosen] = useState(null)
  return (
    <>
      {hideFrench && !result
        ? <SpeakerButton audio={q.audio} large label="Play the sentence" />
        : <><FrenchText q={q} newWords={newWords} onHint={onHint} /><FirstSight q={q} newWords={newWords} /></>}
      <ChoiceList choices={q.choices} result={result} chosen={chosen} answer={q.answer} lang="en"
        onPick={(choice) => { setChosen(choice); onAnswer({ correct: choice === q.answer, given: choice, against: [q.answer], lang: 'en' }) }} />
    </>
  )
}

function PickHeard({ q, result, onAnswer }) {
  const [chosen, setChosen] = useState(null)
  if (q.variant === 'V0404') {
    return (
      <>
        <SpeakerButton audio={q.audio} large label="Play the sentence" />
        <ChoiceList choices={q.choices} result={result} chosen={chosen} answer={q.answer} lang="en"
          onPick={(choice) => { setChosen(choice); onAnswer({ correct: choice === q.answer, given: choice, against: [q.answer], lang: 'en' }) }} />
      </>
    )
  }
  return (
    <>
      <SpeakerButton audio={q.audio} large label="Play the sentence" />
      <div className="flex flex-col gap-2.5">
        {q.audioChoices.map((a, i) => {
          const state = !result ? (chosen === a.sentence_id ? 'choice-selected' : '') : a.sentence_id === q.answer ? 'choice-right' : a.sentence_id === chosen ? 'choice-wrong' : 'opacity-60'
          return (
            <button key={a.sentence_id} aria-label={result ? undefined : `Choice ${i + 1}, plays its sentence`} aria-pressed={result ? undefined : chosen === a.sentence_id}
              onClick={() => { play(a); if (!result) setChosen(a.sentence_id) }} className={`choice flex items-center gap-3 ${state}`}>
              <span aria-hidden="true"><IconSpeaker /></span>
              {result ? <span lang={TL}>{a.french}</span> : <span className="text-muted">{i + 1}</span>}
            </button>
          )
        })}
      </div>
      {!result && <div className="action-row"><button data-check disabled={!chosen} onClick={() => { const pick = q.audioChoices.find((x) => x.sentence_id === chosen); onAnswer({ correct: chosen === q.answer, given: pick?.french, against: [q.shown] }) }} className="btn-submit w-full">Check</button></div>}
    </>
  )
}

function MatchPairs({ q, result, onAnswer, newWords, cantListen }) {
  const [form, setForm] = useState(null)
  const [meaning, setMeaning] = useState(null)
  const [matched, setMatched] = useState([])
  const [wrong, setWrong] = useState(null)
  const [revealed, setRevealed] = useState(null)
  const missed = useRef([])

  const attempt = (f, m) => {
    setForm(null)
    setMeaning(null)
    const pair = q.pairs.find((p) => p.form === f)
    if (pair.hint === m) {
      const next = [...matched, f]
      setMatched(next)
      setWrong(null)
      if (next.length === q.pairs.length) {
        // The last pair animates out like the others before the answer bar comes; nothing is left on the board.
        setRevealed(null)
        const missedPair = q.pairs.find((p) => p.word_id === missed.current[0]) ?? null
        window.setTimeout(() => onAnswer({ correct: missed.current.length === 0, missedWord: missed.current[0], missedPair: missedPair && { form: missedPair.form, hint: missedPair.hint } }), 280)
      }
    } else {
      // A wrong tap on a new word isn't a miss.
      if (!newWords.has(pair.word_id) && !missed.current.includes(pair.word_id)) missed.current.push(pair.word_id)
      setWrong({ f, m })
    }
  }
  const tapForm = (p) => {
    setWrong(null)
    if (!cantListen) play(p.audio)
    if (newWords.has(p.word_id)) setRevealed(p) // first sight: its meaning shows
    if (meaning) attempt(p.form, meaning); else setForm(p.form)
  }
  const tapMeaning = (m) => { setWrong(null); if (form) attempt(form, m); else setMeaning(m) }
  const isMatchedMeaning = (m) => q.pairs.some((p) => p.hint === m && matched.includes(p.form))

  // R19: a correct pair animates out together and leaves its space; a wrong pair shakes and stays.
  const cell = (selected, done, bad) => `choice text-center ${done ? 'pair-out' : bad ? 'pair-shake' : selected ? 'choice-selected' : ''}`
  const endShake = (e) => { if (e.animationName === 'pair-shake') setWrong(null) }
  return (
    <>
    <div className="grid grid-cols-2 gap-2.5">
      <div className="flex flex-col gap-2.5">
        {q.pairs.map((p) => (
          <button key={p.form} lang={TL} disabled={matched.includes(p.form) || Boolean(result)} aria-pressed={form === p.form} onClick={(e) => { if (meaning && q.pairs.find((x) => x.form === p.form).hint === meaning) focusNeighbour(e.currentTarget); tapForm(p) }}
            onAnimationEnd={endShake}
            className={`${cell(form === p.form, matched.includes(p.form), wrong?.f === p.form)} flex items-center justify-center`}>
            {/* Only the word is centred: the speaker hangs to its left and the new-word dot to its right. */}
            <span className="relative">
              {!cantListen && <span aria-hidden="true" className="absolute top-1/2 right-full mr-1.5 -translate-y-1/2 opacity-60 [&_svg]:size-4"><IconSpeaker /></span>}
              {p.form}
              {newWords.has(p.word_id) && !matched.includes(p.form) && <span className="new-dot absolute top-1/2 left-full ml-1.5 -translate-y-1/2" aria-hidden="true" />}
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {q.meanings.map((m) => (
          <button key={m} lang="en" disabled={isMatchedMeaning(m) || Boolean(result)} aria-pressed={meaning === m} onClick={(e) => { if (form && q.pairs.find((x) => x.form === form).hint === m) focusNeighbour(e.currentTarget); tapMeaning(m) }}
            onAnimationEnd={endShake} className={cell(meaning === m, isMatchedMeaning(m), wrong?.m === m)}>{m}</button>
        ))}
      </div>
    </div>
    {!result && <p className="min-h-6 text-sm text-muted">{revealed ? `${revealed.form} = ${revealed.hint}` : ''}</p>}
    {/* What a screen reader hears after each pair. */}
    <p className="sr-only" aria-live="polite">{wrong ? `${wrong.f} and ${wrong.m} don't match.` : matched.length ? `Matched ${matched.at(-1)}. ${q.pairs.length - matched.length} left.` : ''}</p>
    </>
  )
}

function FillBlank({ q, result, onAnswer, newWords, onHint }) {
  const [chosen, setChosen] = useState(null)
  const text = <FrenchText q={q} newWords={newWords} onHint={onHint} blankIndex={q.blankIndex} filled={chosen} />
  return (
    <>
      <p className="text-muted">{q.english}</p>
      {q.variant === 'V0502' ? <SpeakerBubble>{text}</SpeakerBubble> : text}
      <FirstSight q={q} newWords={newWords} except={q.blankIndex} />
      <div className="flex flex-wrap gap-2">
        {q.choices.map((choice) => {
          const right = choice.toLowerCase() === q.answer
          const state = !result ? '' : right ? 'choice-right' : choice === chosen ? 'choice-wrong' : 'opacity-60'
          return <button key={choice} lang={TL} disabled={Boolean(result)} onClick={() => { setChosen(choice); onAnswer({ correct: right }) }} className={`chip ${state}`}>{choice}</button>
        })}
      </div>
    </>
  )
}

function promptFor(q, { newWords, hideFrench, result, onHint }) {
  if (q.type === 'QT06') {
    return hideFrench && !result ? <SpeakerButton audio={q.audio} large label="Play the sentence" /> : <><FrenchText q={q} newWords={newWords} onHint={onHint} /><FirstSight q={q} newWords={newWords} /></>
  }
  if (q.type === 'QT09') {
    return (
      <SpeakerBubble>
        {q.variant === 'V0903' || result ? <FrenchText q={q} newWords={newWords} onHint={onHint} /> : <SpeakerButton audio={q.audio} label="Play the question" />}
      </SpeakerBubble>
    )
  }
  if (q.type === 'QT07') return <SpeakerButton audio={q.audio} large label="Play the sentence" />
  if (q.type === 'QT11') {
    return <div className="flex items-center gap-3"><SpeakerButton audio={q.audio} large label="Play the sentence" /><SpeakerButton audio={q.audio} slow label="Slow: play the sentence slowly" /></div>
  }
  return <p className="text-2xl leading-relaxed">{q.english}</p>
}

// Typing to pick chips (Dan, 2026-11-10): letters typed with no field focused pick from the chip bank. Matching ignores
// case, accents and punctuation (e matches é); chips that read the same count as one.
const foldChip = (t) => String(t).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[’ʼ]/g, "'").replace(/[.,!?¿¡;:«»„“”"…]/g, '').trim()

function Build({ q, content, settings, result, onAnswer, newWords, hideFrench, onHint, onTyping }) {
  const [typing, setTypingState] = useState(settings.typed_input === 'keyboard')
  useEffect(() => { onTyping?.(typing) }, [typing])
  const setTyping = setTypingState
  const [picked, setPicked] = useState([])
  const [text, setText] = useState('')
  const check = (value) => {
    document.activeElement?.blur()
    // The answer as given travels with the result, so a flag can carry it to Flag review.
    onAnswer({ ...checkTyped(value, q.accepted, { strict: settings.answer_strictness === 'strict', lang: q.lang, vocabulary: content.vocabulary[q.lang] }), given: value })
  }
  const answerText = picked.map((i) => q.chips[i]).join(' ')
  // The letters typed so far, and the chips they still match. One match (by text) moves into the answer at once;
  // several wait for more letters, and a space or Enter takes the shortest exact match. Backspace takes back a letter,
  // or with none typed, the last placed chip.
  const [typed, setTyped] = useState('')
  const free = q.chips ? q.chips.map((c, i) => i).filter((i) => !picked.includes(i)) : []
  const matching = (pre) => free.filter((i) => foldChip(q.chips[i]).startsWith(pre))
  const lit = typed ? new Set(matching(typed)) : new Set()
  useEffect(() => { setTyped('') }, [q.qid])
  useEffect(() => {
    if (typing || result || !q.chips) return undefined
    const place = (i) => { setPicked((p) => [...p, i]); setTyped('') }
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return
      const t = e.target
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t?.isContentEditable) return
      if (e.key === 'Backspace') {
        e.preventDefault()
        if (typed) setTyped(typed.slice(0, -1))
        else setPicked((p) => p.slice(0, -1))
        return
      }
      if ((e.key === ' ' || e.key === 'Enter') && typed) {
        e.preventDefault(); e.stopPropagation()
        const exact = matching(typed).filter((i) => foldChip(q.chips[i]) === typed).sort((a, b) => q.chips[a].length - q.chips[b].length)
        if (exact.length) place(exact[0])
        return
      }
      if (e.key.length !== 1 || !/[\p{L}'’-]/u.test(e.key)) return
      const next = typed + foldChip(e.key)
      const hits = matching(next)
      if (!hits.length) { e.preventDefault(); return }
      e.preventDefault()
      const texts = new Set(hits.map((i) => foldChip(q.chips[i])))
      if (texts.size === 1) place(hits[0])
      else setTyped(next)
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [typing, result, q.qid, typed, picked])
  return (
    <>
      {promptFor(q, { newWords, hideFrench, result, onHint })}
      {typing ? (
        <TypedInput q={q} value={text} onChange={setText} disabled={Boolean(result)} onSubmit={() => check(text)} />
      ) : (
        <>
          {/* Your answer so far, then the word bank. Picking a word keeps keyboard focus in the bank (on the next word
              still there); removing one returns focus to the answer. */}
          <div lang={q.lang === 'en' ? 'en' : TL} role="group" aria-label={`Your answer: ${answerText || 'empty'}`} className="flex min-h-14 flex-wrap gap-2 border-b-2 border-line pb-2">
            {picked.map((chipIndex) => (
              <button key={chipIndex} disabled={Boolean(result)} aria-label={`${q.chips[chipIndex]}, remove`} onClick={(e) => { focusNeighbour(e.currentTarget); setPicked(picked.filter((i) => i !== chipIndex)) }} className="chip">{q.chips[chipIndex]}</button>
            ))}
          </div>
          <div lang={q.lang === 'en' ? 'en' : TL} role="group" aria-label="Words to choose from" className="flex flex-wrap gap-2">
            {q.chips.map((chip, i) => (
              <button key={i} disabled={picked.includes(i) || Boolean(result)} onClick={(e) => { focusNeighbour(e.currentTarget); setTyped(''); setPicked([...picked, i]) }} className={`chip ${picked.includes(i) ? 'opacity-25' : ''} ${lit.has(i) ? 'chip-lit' : ''}`}>{chip}</button>
            ))}
          </div>
          <p role="status" className="min-h-5 text-sm text-muted">{typed ? `Typed “${typed}”: ${lit.size} words match. Keep typing, or press Space for the exact word.` : ''}</p>
        </>
      )}
      {/* One place for Check (craft review, fix 2): the check-row sits under the answer area; on a phone with
          no keyboard up it pins to the bottom so it is always in reach. Typing keeps it under the field. */}
      {!result && (
        <div className={`check-row ${typing ? '' : 'action-row'}`}>
          <button onClick={() => setTyping(!typing)} aria-label={typing ? 'Use word chips' : 'Use the keyboard'} className="icon-btn border-2 border-line">
            {typing ? <IconChips /> : <IconKeyboard />}
          </button>
          <button data-check disabled={typing ? !text.trim() : picked.length === 0} onClick={() => check(typing ? text : answerText)} className="btn-submit flex-1">Check</button>
        </div>
      )}
    </>
  )
}

// A button that's about to go away or be disabled hands keyboard focus to the next usable button in its group (or the
// one before), else to the question's Check button. Pointer users never see it.
function focusNeighbour(el) {
  if (!el.matches(':focus-visible')) return
  const group = [...el.parentElement.querySelectorAll('button')]
  const i = group.indexOf(el)
  const next = [...group.slice(i + 1), ...group.slice(0, i).reverse()].find((b) => !b.disabled)
  window.setTimeout(() => (next ?? el.closest('main')?.querySelector('[data-check]'))?.focus(), 0)
}

function TypedInput({ q, value, onChange, disabled, onSubmit }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (value.trim() && !disabled) onSubmit() }}>
      <input
        lang={q.lang === 'en' ? 'en' : TL} autoFocus value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}
        autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck={false} enterKeyHint="done"
        aria-label={q.lang === 'en' ? 'Your answer in English' : `Your answer in ${course.name}`} placeholder={q.lang === 'en' ? 'Type in English' : `Type in ${course.name}`}
        className="w-full rounded-xl border-2 border-field bg-surface px-4 py-3 text-lg outline-none focus:border-ink"
      />
    </form>
  )
}

function Typed({ q, content, settings, result, onAnswer, newWords, hideFrench, onHint }) {
  const [text, setText] = useState('')
  const check = () => {
    document.activeElement?.blur()
    onAnswer({ ...checkTyped(text, q.accepted, { strict: settings.answer_strictness === 'strict', lang: q.lang, vocabulary: content.vocabulary[q.lang] }), given: text })
  }
  return (
    <>
      {promptFor(q, { newWords, hideFrench, result, onHint })}
      <TypedInput q={q} value={text} onChange={setText} disabled={Boolean(result)} onSubmit={check} />
      {!result && <div className="check-row"><button data-check disabled={!text.trim()} onClick={check} className="btn-submit flex-1">Check</button></div>}
    </>
  )
}

// QT18 Type the word (A1 Complete 9): the meaning in English, the picture if the word has one; type the word.
function TypeWord({ q, content, settings, result, onAnswer }) {
  const [text, setText] = useState('')
  const check = () => {
    document.activeElement?.blur()
    onAnswer({ ...checkTyped(text, q.accepted, { strict: settings.answer_strictness === 'strict', lang: 'fr', vocabulary: content.vocabulary.fr }), given: text })
  }
  return (
    <>
      <div className="flex items-center gap-4">
        {q.image && <img src={q.image} alt="" className="h-20 w-20 shrink-0" />}
        <p lang="en" className="text-2xl leading-relaxed">{q.hint}</p>
      </div>
      <TypedInput q={q} value={text} onChange={setText} disabled={Boolean(result)} onSubmit={check} />
      {!result && <div className="check-row"><button data-check disabled={!text.trim()} onClick={check} className="btn-submit flex-1">Check</button></div>}
    </>
  )
}

function AnswerBar({ q, result, cantListen, flagReasons, onFlag, onContinue }) {
  const [panel, setPanel] = useState(null)
  const [flagged, setFlagged] = useState(false)
  const qaAnswer = q.answers?.find((a) => a.french === (result.matched ?? q.shown)) ?? q.answers?.[0]
  // The French plays when the bar appears, without holding up Continue.
  useEffect(() => {
    if (!cantListen && q.audio) play(qaAnswer?.audio ?? q.audio)
  }, [])
  // What to show: the accepted answer they matched, else the main one, plus the other language for sentences.
  // Match pairs ends with every pair matched: a clean board shows nothing, a mistapped pair is named.
  const isPairs = q.type === 'QT01'
  const shown = isPairs ? (result.missedPair ? `${result.missedPair.form} = ${result.missedPair.hint}` : null) : result.correct && result.matched ? result.matched : q.shown
  const other = q.sentence_id ? (qaAnswer ? qaAnswer.english : q.type === 'QT03' || q.type === 'QT06' ? q.french : q.english) : null
  const good = result.correct
  // A typo or a missing accent: the letters that differ are marked in the answer shown.
  const marks = (result.typo || result.accent) && result.given ? diffMarks(shown, result.given) : null
  const [meaning, setMeaning] = useState(false)
  const phrase = result.phrase
  // A wrong typed answer may get an explanation (Phase 4); it shows only once it has arrived.
  const [why, setWhy] = useState(null)
  const [showWhy, setShowWhy] = useState(false)
  useEffect(() => {
    let live = true
    if (!good && result.given?.trim() && q.accepted?.length && q.sentence_id) explain(q, result.given).then((t) => live && setWhy(t))
    return () => { live = false }
  }, [])
  const fallback = q.speaking || q.ungraded ? 'Done.' : good ? 'Nice.' : 'Not quite.'
  return (
    <section aria-live="polite" data-outcome={good ? 'correct' : 'incorrect'} className={`fixed inset-x-0 bottom-0 z-20 border-t-2 bg-surface pb-[max(1rem,env(safe-area-inset-bottom))] ${good ? 'border-right' : 'border-wrong'}`}>
      <div className="mx-auto flex max-w-md flex-col gap-3 px-4 pt-4 lg:max-w-2xl">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className={`relative font-semibold ${good ? 'text-right-ink' : 'text-wrong'}`}>
              {phrase && phrase.language !== 'en' ? (
                <button lang={TL} onClick={() => setMeaning(!meaning)} aria-expanded={meaning} className="underline decoration-dotted decoration-2 underline-offset-4">{phrase.text}</button>
              ) : (phrase?.text ?? fallback)}
              {meaning && <span role="tooltip" className="absolute bottom-full left-0 z-10 mb-1 w-max max-w-[min(18rem,80vw)] rounded-lg border-2 border-line bg-surface px-3 py-1.5 text-base font-normal text-ink shadow-md">{phrase.english}</span>}
            </p>
            {shown && <p lang={isPairs ? undefined : q.lang === 'en' && !LISTENING.has(q.type) ? 'en' : TL} className="mt-0.5 break-words">
              {marks ? marks.map((m, i) => (m.mark ? <strong key={i} className="underline decoration-2 underline-offset-4">{m.text}</strong> : <span key={i}>{m.text}</span>)) : shown}
            </p>}
            {other && <p className="break-words text-muted">{other}</p>}
            {why && (showWhy
              ? <p className="mt-1 break-words text-sm">{why}</p>
              : <button onClick={() => setShowWhy(true)} className="mt-1 text-sm text-muted underline decoration-dotted decoration-2 underline-offset-4">Why?</button>)}
          </div>
          <div className="flex shrink-0 text-muted">
            <button onClick={() => setPanel(panel === 'flag' ? null : 'flag')} aria-label="Flag this question" aria-expanded={panel === 'flag'} className="icon-btn"><IconFlag /></button>
            <button onClick={() => setPanel(panel === 'comment' ? null : 'comment')} aria-label="Comments" aria-expanded={panel === 'comment'} className="icon-btn"><IconComment /></button>
          </div>
        </div>
        {panel === 'comment' && <p className="text-sm text-muted">Discussions need setup: they open once sign-in and a server are in place.</p>}
        {panel === 'flag' && (flagged
          ? <p className="text-sm text-muted">Flag saved.</p>
          : (
            <div className="flex flex-col gap-1.5">
              {flagReasons.map((r) => (
                <button key={r.reason_id} onClick={() => { onFlag(r.reason_id); setFlagged(true) }} className="rounded-lg border-2 border-line px-3 py-2 text-left text-sm">{r.label}</button>
              ))}
            </div>
          ))}
        <button autoFocus onClick={onContinue} className="btn-primary">Continue</button>
      </div>
    </section>
  )
}
