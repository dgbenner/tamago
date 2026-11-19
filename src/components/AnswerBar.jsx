import { useEffect, useState } from 'react'
import { explain } from '../lib/explain.js'
import { accentMisses, diffMarks } from '../lib/check.js'
import { play } from '../lib/audio.js'
import { IconComment, IconFlag, IconWhy } from '../screens/icons.jsx'
import { LISTENING } from '../lib/question-names.js'
import { TL } from '../lib/course.js'
import Button from './Button.jsx'

// The bar that rises from the bottom once a question is answered: the verdict, the translation or the right answer,
// notes on accents and capitals, Why?, flag, comment, and Continue. Lifted from Lesson.jsx unchanged (design-system branch).
// For "is this the learner's own answer": case, punctuation, apostrophe style and spacing don't count; accents do.
const foldAnswer = (t) => String(t).toLowerCase().replace(/[’ʼ]/g, "'").replace(/[^\p{L}\p{N}' ]/gu, ' ').replace(/\s+/g, ' ').trim()

export default function AnswerBar({ q, result, cantListen, flagReasons, onFlag, onContinue }) {
  const [panel, setPanel] = useState(null)
  const [flagged, setFlagged] = useState(false)
  const qaAnswer = q.answers?.find((a) => a.french === (result.matched ?? q.shown)) ?? q.answers?.[0]
  // Answer the Question (Dan, 2026-11-14): a sample reply under the verdict. Right, it's another listed reply when there
  // is one (never the learner's own again); with a typo or accent marks, the reply they meant, marked; wrong, the
  // fullest reply.
  const isChat = q.type === 'QT09' && q.answers?.length > 0
  const sample = !isChat ? null : !result.correct ? q.answers[0] : (result.typo || result.accent) ? qaAnswer
    : q.answers.find((a) => foldAnswer(a.french) !== foldAnswer(result.given ?? result.matched ?? '')) ?? qaAnswer
  // The French plays when the bar appears, without holding up Continue.
  useEffect(() => {
    if (!cantListen && q.audio) play((sample ?? qaAnswer)?.audio ?? q.audio)
  }, [])
  // What to show: the accepted answer they matched, else the main one, plus the other language for sentences.
  // Match pairs ends with every pair matched: a clean board shows nothing, a mistapped pair is named.
  const isPairs = q.type === 'QT01'
  const answerShown = isPairs ? (result.missedPair ? `${result.missedPair.form} = ${result.missedPair.hint}` : null) : result.correct && result.matched ? result.matched : q.shown
  // Never the learner's own answer again (Dan, 2026-11-12): it's already on screen above. A correction (typo or
  // accent marks, or a wrong answer) still shows.
  const same = (a, b) => a != null && b != null && foldAnswer(a) === foldAnswer(b)
  // Right, with the only listed reply being the learner's own (Dan's rule: never their own answer again, 2026-11-12):
  // no Sample Reply, just what their reply means (audit, 2026-11-14).
  const ownSample = isChat && result.correct && !(result.typo || result.accent) && same(result.given ?? result.matched, sample.french)
  const shown = answerShown && same(result.given, answerShown) && !(result.typo || result.accent) ? null : answerShown
  const otherLine = q.sentence_id ? (qaAnswer ? qaAnswer.english : q.type === 'QT03' || q.type === 'QT06' ? q.french : q.english) : null
  // Nor in the second line: Pick What You Heard by meaning shows the sentence heard, not the English picked (2026-11-13).
  const other = otherLine && same(result.given, otherLine) ? null : otherLine
  const good = result.correct
  // A typo or a missing accent: the letters that differ are marked in the answer shown.
  const marks = result.typo && result.given ? diffMarks(isChat ? sample.french : shown, result.given) : null
  // Capitals and accents (Dan, 2026-11-14): a short note per word, the letter in bold. Right by default; wrong in Strict.
  const accentNotes = result.accent && result.given ? accentMisses(result.given, result.matched ?? shown) : []
  const capitalNotes = result.capitals ?? []
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
  const fallback = q.speaking || q.ungraded ? 'Done.' : good ? 'Right!' : 'Incorrect'
  return (
    <section aria-live="polite" data-outcome={good ? 'correct' : 'incorrect'} className={`fixed inset-x-0 bottom-0 z-20 border-t-2 bg-surface pb-[max(1rem,env(safe-area-inset-bottom))] ${good ? 'border-right' : 'border-wrong'}`}>
      <div className="mx-auto flex max-w-md flex-col gap-3 px-4 pt-4 lg:max-w-4xl">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className={`relative font-semibold ${good ? 'text-right-ink' : 'text-wrong'}`}>
              {phrase && phrase.language !== 'en' ? (
                <button lang={TL} onClick={() => setMeaning(!meaning)} aria-expanded={meaning} className="underline decoration-dotted decoration-2 underline-offset-4">{phrase.text}</button>
              ) : (phrase?.text ?? fallback)}
              {meaning && <span role="tooltip" className="absolute bottom-full left-0 z-10 mb-1 w-max max-w-[min(18rem,80vw)] rounded-lg border-2 border-line bg-surface px-3 py-1.5 text-base font-normal text-ink shadow-md">{phrase.english}</span>}
            </p>
            {ownSample && <p className="mt-0.5 break-words text-muted">{sample.english}</p>}
            {isChat && !ownSample && <div data-sample-reply className="mt-1">
              <p className="text-sm text-muted">Sample Reply</p>
              <p lang={TL} className="break-words">{marks ? marks.map((m, i) => (m.mark ? <strong key={i} className="underline decoration-2 underline-offset-4">{m.text}</strong> : <span key={i}>{m.text}</span>)) : sample.french}</p>
              <p className="break-words text-muted">{sample.english}</p>
            </div>}
            {!isChat && shown && <p lang={isPairs ? undefined : q.lang === 'en' && !LISTENING.has(q.type) ? 'en' : TL} className="mt-0.5 break-words">
              {marks ? marks.map((m, i) => (m.mark ? <strong key={i} className="underline decoration-2 underline-offset-4">{m.text}</strong> : <span key={i}>{m.text}</span>)) : shown}
            </p>}
            {!isChat && other && <p className="break-words text-muted">{other}</p>}
            {/* Read and Answer, Fill the Form: what was wrong, in the bar itself (craft review, 2026-11-14). */}
            {(accentNotes.length > 0 || capitalNotes.length > 0) && <div data-letter-notes className="mt-0.5 flex flex-col gap-0.5 text-sm">
              {capitalNotes.map((c, i) => <p key={`c${i}`}>Don't forget the capital: <span lang={q.lang === 'en' ? 'en' : TL}>{[...c.word].map((ch, k) => (c.at.includes(k) ? <strong key={k}>{ch}</strong> : ch))}</span></p>)}
              {accentNotes.map((a, i) => <p key={`a${i}`}>Watch the accent: <span lang={q.lang === 'en' ? 'en' : TL}>{a.runs.map((r, k) => (r.mark ? <strong key={k}>{r.text}</strong> : <span key={k}>{r.text}</span>))}</span></p>)}
            </div>}
            {!good && result.corrections?.length > 0 && <ul data-corrections className="mt-0.5 flex flex-col gap-0.5">{result.corrections.map((c, i) => <li key={i} className={`break-words ${i === 0 && /of \d+ right$/.test(c) ? 'text-muted' : ''}`}>{c}</li>)}</ul>}
            {why && showWhy && <p className="mt-1 break-words text-sm" data-why>{why}</p>}
          </div>
          {/* Right side: Why? (once an explanation has arrived), flag, comment (Dan, 2026-11-12). */}
          <div className="flex shrink-0 text-muted">
            {why && <button onClick={() => setShowWhy(!showWhy)} aria-label="Why?" aria-expanded={showWhy} className="icon-btn"><IconWhy /></button>}
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
        <Button kind="primary" autoFocus onClick={onContinue}>Continue</Button>
      </div>
    </section>
  )
}
