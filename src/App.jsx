import { useEffect, useRef, useState } from 'react'
import { content as c, recordings } from './lib/content.js'
import { buildLesson, buildReview, lessonsInRound, passMark, reaskFor } from './lib/lesson.js'
import { loadState, put, putKv, remove } from './lib/store.js'
import { hasFrenchVoice, preload, stop } from './lib/audio.js'
import Home from './screens/Home.jsx'
import Lesson from './screens/Lesson.jsx'
import Settings from './screens/Settings.jsx'
import About from './screens/About.jsx'
import Splash from './screens/Splash.jsx'

const UNIT = c.units[0]
const today = () => new Date().toLocaleDateString('en-CA')
const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
const defaults = Object.fromEntries(c.settings_defaults.map((s) => [s.setting, s.default]))
const DEFAULT_SETTINGS = {
  answer_strictness: defaults.answer_strictness, typed_input: defaults.typed_input, listen_first: defaults.listen_first,
  theme: defaults.theme, cant_listen_until: null, cant_speak_until: null,
  test_shortcuts: 'on', // Dan only for now; turn the default off before testers (Phase 4)
}

const paused = (until) => until === 'always' || (typeof until === 'number' && until > Date.now())

export default function App() {
  const [ready, setReady] = useState(false)
  const [screen, setScreen] = useState('home')
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [bank, setBank] = useState([])
  const [progress, setProgress] = useState({ unit_id: UNIT.unit_id, round_reached: 0, lessons_done: 0 })
  const [pointsToday, setPointsToday] = useState(0)
  const [session, setSession] = useState(null)
  const [ending, setEnding] = useState(null)
  const [splash, setSplash] = useState(true)
  const seenWords = useRef(new Set())
  const roundSeen = useRef({})
  const carry = useRef([])

  useEffect(() => {
    preload(recordings)
    loadState().then((s) => {
      setBank(s.bank)
      const saved = s.progress.find((p) => p.unit_id === UNIT.unit_id)
      if (saved) setProgress(saved)
      setPointsToday(s.points.find((p) => p.date === today())?.amount ?? 0)
      if (s.kv.settings) setSettings({ ...DEFAULT_SETTINGS, ...s.kv.settings })
      seenWords.current = new Set(s.kv.seen_words ?? [])
      roundSeen.current = s.kv.round_seen ?? {}
      carry.current = s.kv.carry ?? []
      if (s.kv.current_session) setSession(s.kv.current_session)
      setReady(true)
    })
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (settings.theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', settings.theme)
  }, [settings.theme])

  // The page itself never scrolls (see index.css); #root does.
  useEffect(() => { document.getElementById('root')?.scrollTo(0, 0) }, [screen])

  const changeSettings = (patch) => {
    const next = { ...settings, ...patch }
    setSettings(next)
    putKv('settings', next)
  }

  const currentRound = Math.min(progress.round_reached + 1, 5)
  const lessonModes = () => ({
    cantListen: paused(settings.cant_listen_until) || !hasFrenchVoice(),
    cantSpeak: paused(settings.cant_speak_until),
  })

  const begin = (s) => {
    setSession(s)
    putKv('current_session', s)
    setEnding(null)
    setScreen('lesson')
  }
  const startLesson = () => {
    if (session) { begin(session); return }
    const lesson = buildLesson(c, {
      round: currentRound, unit_id: UNIT.unit_id, seen: roundSeen.current[currentRound] ?? {}, known: seenWords.current,
      settings: lessonModes(), carry: carry.current[0] ?? null,
    })
    carry.current = []
    putKv('carry', [])
    begin(lesson)
  }
  const startReview = () => {
    if (bank.length) begin(buildReview(c, bank, { round: currentRound, settings: lessonModes(), today: today() }))
  }

  const addToBank = (sentence_id, type_id) => {
    setBank((b) => {
      if (!sentence_id || b.some((e) => e.sentence_id === sentence_id)) return b
      const row = { sentence_id, type_id, correct_in_review: 0, correct_days: [], added_at: new Date().toISOString() }
      put('review_bank', row)
      return [...b, row]
    })
  }

  const addPoint = () => {
    setPointsToday((n) => {
      put('points', { date: today(), amount: n + 1 })
      return n + 1
    })
  }

  // Record an answer and update the session. Called the moment the learner answers.
  const onAnswer = (q, result) => {
    const first = !q.reask
    put('attempts', {
      attempt_id: uid(), lesson_id: session.id, sentence_id: q.sentence_id ?? q.word_ids.join(';'), type_id: q.type, variant_id: q.variant,
      round: q.round, skill: result.hidden ? 'listening' : q.skill, first_attempt: first, correct: result.correct, typo_accepted: Boolean(result.typo), graded: q.skill !== 'speaking', swapped_from: q.swapped_from ?? null, test_skip: Boolean(result.testSkip), answered_at: new Date().toISOString(),
    })
    for (const seg of q.segments ?? []) if (seg.word_id) seenWords.current.add(seg.word_id)
    for (const id of q.word_ids ?? []) seenWords.current.add(id)
    putKv('seen_words', [...seenWords.current])

    let next = session
    if (first) {
      next = { ...next, firstCorrect: next.firstCorrect + (result.correct ? 1 : 0), firstWrong: next.firstWrong + (result.correct ? 0 : 1) }
      if (result.correct) addPoint()
      else next = { ...next, misses: [...(next.misses ?? []), { sentence_id: q.sentence_id ?? null, word_id: result.missedWord ?? null, type: q.type }] }
    }
    if (!result.correct) {
      // One re-ask only: a wrong re-ask shows the answer and the lesson moves on.
      const reask = session.kind === 'lesson' && first
        ? reaskFor(c, q, { cantListen: lessonModes().cantListen, missedWord: result.missedWord, known: seenWords.current }) : null
      if (reask) next = { ...next, queue: [...next.queue, reask] }
      // Round 1 misses stay out of the bank.
      if (q.round >= 2) addToBank(q.sentence_id ?? reask?.sentence_id, q.type)
    }
    if (session.kind === 'review' && result.correct) {
      setBank((b) => b.flatMap((e) => {
        if (e.sentence_id !== q.sentence_id) return [e]
        // Leaves after three correct answers on three different days.
        const days = [...new Set([...(e.correct_days ?? []), today()])]
        if (days.length >= 3) { remove('review_bank', e.sentence_id); return [] }
        const row = { ...e, correct_days: days, correct_in_review: days.length }
        put('review_bank', row)
        return [row]
      }))
    }
    setSession(next)
    putKv('current_session', next)
  }

  const onHint = (q, seg) => {
    put('hints_log', { hint_id: uid(), word_id: seg.word_id, sentence_id: q.sentence_id, tapped_at: new Date().toISOString() })
  }

  const onFlag = (q, reason_id) => {
    put('flags', { flag_id: uid(), sentence_id: q.sentence_id ?? q.word_ids.join(';'), type_id: q.type, reason_id, flagged_at: new Date().toISOString() })
  }

  const finish = (s) => {
    remove('kv', 'current_session')
    setSession(null)
    if (s.kind === 'review') {
      setEnding({ line: `${s.firstCorrect} of ${s.size} correct.` })
      return
    }
    const mark = passMark(s.graded ?? s.size)
    const passed = s.firstCorrect >= mark
    put('lessons', { lesson_id: s.id, unit_id: s.unit_id, round: s.round, score: s.firstCorrect, graded_count: s.graded ?? s.size, passed, duration_ms: s.started_at ? Date.now() - s.started_at : null, finished_at: new Date().toISOString() })
    if (!passed) {
      setEnding({ line: `${s.firstCorrect} of ${s.size}. Pass is ${mark}, so this lesson repeats in new question types.`, retry: s })
      return
    }
    const seen = roundSeen.current[s.round] ?? { sentences: {}, words: {} }
    for (const q of s.queue.slice(0, s.size)) {
      if (q.sentence_id) seen.sentences[q.sentence_id] = (seen.sentences[q.sentence_id] ?? 0) + 1
      for (const id of q.word_ids ?? []) seen.words[id] = (seen.words[id] ?? 0) + 1
    }
    roundSeen.current = { ...roundSeen.current, [s.round]: seen }
    putKv('round_seen', roundSeen.current)
    carry.current = s.misses ?? []
    putKv('carry', carry.current)
    if (s.round === currentRound && progress.round_reached < 5) {
      const done = progress.lessons_done + 1
      // A round runs its full count, and longer only if a miss kept a sentence or word from appearing.
      const covered = c.sentences.every((x) => seen.sentences[x.sentence_id]) && c.wordOrder.every((id) => seenWords.current.has(id))
      const count = lessonsInRound(c, s.round)
      const roundDone = (done >= count && covered) || done >= count + 3
      const nextProgress = { ...progress, round_reached: roundDone ? s.round : progress.round_reached, lessons_done: roundDone ? 0 : done }
      setProgress(nextProgress)
      put('unit_progress', nextProgress)
    }
    setEnding({ line: `${s.firstCorrect} of ${s.size}.` })
  }

  const leaveLesson = () => {
    stop()
    setScreen('home')
  }

  const afterEnding = () => {
    if (ending?.retry) {
      begin(buildLesson(c, { round: ending.retry.round, unit_id: ending.retry.unit_id, known: seenWords.current, settings: lessonModes(), retry: ending.retry.queue.slice(0, ending.retry.size) }))
      return
    }
    setEnding(null)
    setScreen('home')
  }

  const view = () => {
  if (!ready) return null

  if (screen === 'lesson') {
    if (ending) {
      return (
        <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-4">
          <p className="text-center text-xl">{ending.line}</p>
          <button onClick={afterEnding} className="btn-primary">Continue</button>
        </main>
      )
    }
    return (
      <Lesson key={session.id} session={session} content={c} settings={settings} seenWords={seenWords.current} cantListen={lessonModes().cantListen}
        onAnswer={onAnswer} onHint={onHint} onFlag={onFlag} onExit={leaveLesson}
        onAdvance={(s) => { setSession(s); putKv('current_session', s) }} onFinish={finish} />
    )
  }
  if (screen === 'settings') return <Settings settings={settings} onChange={changeSettings} onBack={() => setScreen('home')} onAbout={() => setScreen('about')} />
  if (screen === 'about') return <About content={c} onBack={() => setScreen('settings')} />
  return (
    <Home unit={UNIT} progress={progress} round={currentRound} lessonsInRound={Math.max(lessonsInRound(c, currentRound), progress.lessons_done + 1)} points={pointsToday}
      bankSize={bank.length} inProgress={session?.kind === 'lesson' || session?.kind === 'review'}
      onStart={startLesson} onReview={startReview} onSettings={() => setScreen('settings')} />
  )
  }

  return (
    <>
      {view()}
      {splash && <Splash onDone={() => setSplash(false)} />}
    </>
  )
}
