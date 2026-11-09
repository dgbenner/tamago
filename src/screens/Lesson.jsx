import { explain } from '../lib/explain.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { checkTyped, diffMarks } from '../lib/check.js'
import { useRecorder } from '../lib/recorder.js'
import { play, stop } from '../lib/audio.js'
import { IconChips, IconClose, IconComment, IconFlag, IconKeyboard, IconSpeaker } from './icons.jsx'

const PROMPT = {
  QT01: 'Match the pairs', QT02: 'Pick the picture', QT10: 'Say it aloud', QT13: 'Speak and compare', QT03: 'Pick the meaning', QT04: 'Pick what you heard', QT05: 'Fill in the blank', QT06: 'Translate',
  QT07: 'Tap what you hear', QT08: 'Translate', QT09: 'Answer the question', QT11: 'Type what you hear', QT12: 'Translate',
}
const LISTENING = new Set(['QT04', 'QT07', 'QT11'])
const LISTEN_FIRST = new Set(['QT03', 'QT06'])
const SHOWS_FRENCH = new Set(['QT01', 'QT02', 'QT03', 'QT05', 'QT06']) // the New word tag needs a word on screen

// The heading says what the learner is doing right now: with the French hidden it's a listening task, and a
// chip question switched to the keyboard is a typing one (craft review, fixes 8 and 9).
function headingFor(q, { hideFrench, result, typing }) {
  if (hideFrench && !result) return q.type === 'QT03' ? 'Listen and pick the meaning' : 'Listen and translate'
  if (q.type === 'QT07' && (typing || q.typed)) return 'Type what you hear'
  return PROMPT[q.type]
}

// R18: a rotating line for the answer bar, never the same one twice running. French lines come in at
// french_feedback_rate ("about 1 per lesson"). FB24 says the item comes back, so only a first-attempt miss in a lesson uses it.
const FRENCH_RATE = 0.1
function pickPhrase(phrases, q, r, kind, lastId) {
  const context = r.typo ? 'typo' : r.accent ? 'accent' : r.correct ? 'correct' : 'incorrect'
  const comesBack = kind === 'lesson' && !q.reask
  const pool = phrases.filter((p) => p.context === context && p.phrase_id !== lastId && (p.phrase_id !== 'FB24' || comesBack))
  const french = pool.filter((p) => p.language === 'fr')
  const english = pool.filter((p) => p.language === 'en')
  const from = french.length && Math.random() < FRENCH_RATE ? french : english.length ? english : pool
  return from.length ? from[Math.floor(Math.random() * from.length)] : null
}

export default function Lesson({ session, content, settings, seenWords, cantListen, onAnswer, onHint, onFlag, onExit, onAdvance, onFinish }) {
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
    const phrase = r.testSkip || r.speaking || (q.type === 'QT01' && !r.correct) ? null : pickPhrase(content.feedback_phrases, q, r, session.kind, lastPhrase.current)
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
  const props = { q, content, settings, cantListen, result, onAnswer: answer, newWords, hideFrench, onHint: (seg) => onHint(q, seg), onTyping: setTyping }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <header className="sticky top-0 z-10 -mx-4 flex items-center gap-3 bg-bg px-4 pb-2">
        <button onClick={onExit} aria-label="Leave lesson" className="icon-btn -ml-2"><IconClose /></button>
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={Math.round(barMax.current * 100)} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-green" style={{ width: `${barMax.current * 100}%` }} />
        </div>
      </header>

      <div className={`flex flex-1 flex-col gap-5 pt-5 ${result ? 'pb-56' : 'pb-[max(1rem,env(safe-area-inset-bottom))]'}`}>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">{headingFor(q, { hideFrench, result, typing })}</h1>
          {newWords.size > 0 && SHOWS_FRENCH.has(q.type) && !hideFrench && <span className="tag"><span className="new-dot" aria-hidden="true" />New</span>}
        </div>
        <Question key={q.qid} {...props} />
      </div>

      {result && !result.testSkip && <AnswerBar q={q} result={result} cantListen={cantListen} flagReasons={content.flag_reasons} onFlag={(id) => onFlag(q, id, result)} onContinue={advance} />}
    </main>
  )
}

function Question({ q, ...rest }) {
  const typedOnly = Boolean(q.typed)
  const C = typedOnly ? Typed : { QT01: MatchPairs, QT02: WordImage, QT10: Speak, QT13: Speak, QT03: PickMeaning, QT04: PickHeard, QT05: FillBlank, QT06: Build, QT07: Build, QT08: Build, QT09: Build, QT11: Typed, QT12: Typed }[q.type]
  return <C q={q} {...rest} />
}

function SpeakerButton({ audio, slow, label = 'Play', large }) {
  return (
    <button onClick={() => play(audio, { slow })} aria-label={label} className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 border-line bg-surface ${large ? 'h-16 w-16' : 'min-h-11 min-w-11 px-3'}`}>
      <IconSpeaker />
      {slow && <span className="text-sm">Slow</span>}
    </button>
  )
}

// The French, with a dotted underline on each word that has a hint.
function FrenchText({ q, newWords, onHint, blankIndex = null, filled = null }) {
  const [open, setOpen] = useState(null)
  return (
    <p lang="fr" className="text-2xl leading-relaxed">
      {q.segments.map((seg, i) => {
        if (i === blankIndex) {
          return <span key={i} className="mx-1 inline-block min-w-16 border-b-4 border-ink px-1 text-center font-semibold">{filled ?? ' '}</span>
        }
        if (!seg.word_id) return <span key={i}>{seg.text}</span>
        return (
          <span key={i} className="relative">
            <button
              onClick={() => { setOpen(open === i ? null : i); if (open !== i) onHint(seg) }}
              className="underline decoration-dotted decoration-2 underline-offset-4"
            >{seg.text}</button>
            {/* The new-word dot sits on the word like a superscript, not between words like a bullet. */}
            {newWords.has(seg.word_id) && <span className="new-dot absolute -top-0.5 left-full ml-0.5 size-1.5" aria-hidden="true" />}
            {open === i && (
              <span role="tooltip" lang="en" className="absolute top-full left-0 z-10 mt-1 whitespace-nowrap rounded-lg border-2 border-line bg-surface px-3 py-1.5 text-base shadow-md">{seg.hint}</span>
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
      <img src="/logo.png" alt="" className="h-12 w-12 shrink-0 object-contain" />
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
          : <><p lang="fr" className="relative text-2xl">{q.form}{newWords.has(q.word_id) && <span className="new-dot absolute -top-0.5 left-full ml-0.5 size-1.5" aria-hidden="true" />}</p><SpeakerButton audio={q.audio} label="Play the word" /></>}
      </div>
      <div className={`grid gap-3 ${q.choices.length === 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {q.choices.map((ch, i) => {
          const state = !result ? '' : ch.word_id === q.answer ? 'choice-right' : ch.word_id === chosen ? 'choice-wrong' : 'opacity-60'
          return (
            <button key={ch.word_id} aria-label={ch.label ?? `Picture ${i + 1}`} disabled={Boolean(result)}
              onClick={() => { setChosen(ch.word_id); onAnswer({ correct: ch.word_id === q.answer }) }}
              className={`choice flex flex-col items-center justify-center gap-1 p-2 text-center ${state}`}>
              <img src={ch.image} alt="" className="h-20 w-20" />
              {ch.label && <span lang="fr" className="text-base">{ch.label}</span>}
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
  const model = q.native ? 'Native recording' : 'Model'
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
            : <button onClick={() => setReveal(true)} className="self-start text-sm text-muted underline underline-offset-4">Show the French</button>}
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
          <button onClick={done} disabled={compare && rec.state !== 'done' && rec.state !== 'unavailable'} className="btn-submit w-full">Done</button>
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
        onPick={(choice) => { setChosen(choice); onAnswer({ correct: choice === q.answer }) }} />
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
          onPick={(choice) => { setChosen(choice); onAnswer({ correct: choice === q.answer }) }} />
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
            <button key={a.sentence_id} aria-label={`Choice ${i + 1}`} onClick={() => { play(a); if (!result) setChosen(a.sentence_id) }} className={`choice flex items-center gap-3 ${state}`}>
              <IconSpeaker />
              {result ? <span lang="fr">{a.french}</span> : <span className="text-muted">{i + 1}</span>}
            </button>
          )
        })}
      </div>
      {!result && <div className="action-row"><button disabled={!chosen} onClick={() => onAnswer({ correct: chosen === q.answer })} className="btn-submit w-full">Check</button></div>}
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
          <button key={p.form} lang="fr" disabled={matched.includes(p.form) || Boolean(result)} onClick={() => tapForm(p)}
            onAnimationEnd={endShake}
            className={`${cell(form === p.form, matched.includes(p.form), wrong?.f === p.form)} flex items-center justify-center`}>
            {/* Only the word is centred: the speaker hangs to its left and the new-word dot to its right. */}
            <span className="relative">
              {!cantListen && <span className="absolute top-1/2 right-full mr-1.5 -translate-y-1/2 opacity-60 [&_svg]:size-4"><IconSpeaker /></span>}
              {p.form}
              {newWords.has(p.word_id) && !matched.includes(p.form) && <span className="new-dot absolute top-1/2 left-full ml-1.5 -translate-y-1/2" aria-hidden="true" />}
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {q.meanings.map((m) => (
          <button key={m} lang="en" disabled={isMatchedMeaning(m) || Boolean(result)} onClick={() => tapMeaning(m)}
            onAnimationEnd={endShake} className={cell(meaning === m, isMatchedMeaning(m), wrong?.m === m)}>{m}</button>
        ))}
      </div>
    </div>
    {!result && <p className="min-h-6 text-sm text-muted">{revealed ? `${revealed.form} = ${revealed.hint}` : ''}</p>}
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
          return <button key={choice} lang="fr" disabled={Boolean(result)} onClick={() => { setChosen(choice); onAnswer({ correct: right }) }} className={`chip ${state}`}>{choice}</button>
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
    return <div className="flex items-center gap-3"><SpeakerButton audio={q.audio} large label="Play the sentence" /><SpeakerButton audio={q.audio} slow label="Play slowly" /></div>
  }
  return <p className="text-2xl leading-relaxed">{q.english}</p>
}

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
  return (
    <>
      {promptFor(q, { newWords, hideFrench, result, onHint })}
      {typing ? (
        <TypedInput q={q} value={text} onChange={setText} disabled={Boolean(result)} onSubmit={() => check(text)} />
      ) : (
        <>
          <div lang={q.lang} className="flex min-h-14 flex-wrap gap-2 border-b-2 border-line pb-2">
            {picked.map((chipIndex) => (
              <button key={chipIndex} disabled={Boolean(result)} onClick={() => setPicked(picked.filter((i) => i !== chipIndex))} className="chip">{q.chips[chipIndex]}</button>
            ))}
          </div>
          <div lang={q.lang} className="flex flex-wrap gap-2">
            {q.chips.map((chip, i) => (
              <button key={i} disabled={picked.includes(i) || Boolean(result)} onClick={() => setPicked([...picked, i])} className={`chip ${picked.includes(i) ? 'opacity-25' : ''}`}>{chip}</button>
            ))}
          </div>
        </>
      )}
      {/* One place for Check (craft review, fix 2): the check-row sits under the answer area; on a phone with
          no keyboard up it pins to the bottom so it is always in reach. Typing keeps it under the field. */}
      {!result && (
        <div className={`check-row ${typing ? '' : 'action-row'}`}>
          <button onClick={() => setTyping(!typing)} aria-label={typing ? 'Use word chips' : 'Use the keyboard'} className="icon-btn border-2 border-line">
            {typing ? <IconChips /> : <IconKeyboard />}
          </button>
          <button disabled={typing ? !text.trim() : picked.length === 0} onClick={() => check(typing ? text : answerText)} className="btn-submit flex-1">Check</button>
        </div>
      )}
    </>
  )
}

function TypedInput({ q, value, onChange, disabled, onSubmit }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (value.trim() && !disabled) onSubmit() }}>
      <input
        lang={q.lang} autoFocus value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}
        autoCapitalize="off" autoCorrect="off" autoComplete="off" spellCheck={false} enterKeyHint="done"
        aria-label={q.lang === 'en' ? 'Your answer in English' : 'Your answer in French'} placeholder={q.lang === 'en' ? 'Type in English' : 'Type in French'}
        className="w-full rounded-xl border-2 border-line bg-surface px-4 py-3 text-lg outline-none focus:border-ink"
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
      {!result && <div className="check-row"><button disabled={!text.trim()} onClick={check} className="btn-submit flex-1">Check</button></div>}
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
    if (!good && result.given?.trim() && q.accepted?.length) explain(q, result.given).then((t) => live && setWhy(t))
    return () => { live = false }
  }, [])
  const fallback = q.speaking ? 'Done.' : good ? 'Nice.' : 'Not quite.'
  return (
    <section aria-live="polite" data-outcome={good ? 'correct' : 'incorrect'} className={`fixed inset-x-0 bottom-0 z-20 border-t-2 bg-surface pb-[max(1rem,env(safe-area-inset-bottom))] ${good ? 'border-right' : 'border-wrong'}`}>
      <div className="mx-auto flex max-w-md flex-col gap-3 px-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className={`relative font-semibold ${good ? 'text-right-ink' : 'text-wrong'}`}>
              {phrase?.language === 'fr' ? (
                <button lang="fr" onClick={() => setMeaning(!meaning)} className="underline decoration-dotted decoration-2 underline-offset-4">{phrase.text}</button>
              ) : (phrase?.text ?? fallback)}
              {meaning && <span role="tooltip" className="absolute bottom-full left-0 z-10 mb-1 whitespace-nowrap rounded-lg border-2 border-line bg-surface px-3 py-1.5 text-base font-normal text-ink shadow-md">{phrase.english}</span>}
            </p>
            {shown && <p lang={isPairs ? undefined : q.lang === 'en' && !LISTENING.has(q.type) ? 'en' : 'fr'} className="mt-0.5 break-words">
              {marks ? marks.map((m, i) => (m.mark ? <strong key={i} className="underline decoration-2 underline-offset-4">{m.text}</strong> : <span key={i}>{m.text}</span>)) : shown}
            </p>}
            {other && <p className="break-words text-muted">{other}</p>}
            {why && (showWhy
              ? <p className="mt-1 break-words text-sm">{why}</p>
              : <button onClick={() => setShowWhy(true)} className="mt-1 text-sm text-muted underline decoration-dotted decoration-2 underline-offset-4">Why?</button>)}
          </div>
          <div className="flex shrink-0 text-muted">
            <button onClick={() => setPanel(panel === 'flag' ? null : 'flag')} aria-label="Flag this question" className="icon-btn"><IconFlag /></button>
            <button onClick={() => setPanel(panel === 'comment' ? null : 'comment')} aria-label="Comments" className="icon-btn"><IconComment /></button>
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
