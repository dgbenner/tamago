import { useEffect, useRef, useState } from 'react'
import { addAccepted, allContent, recordings, tables, unitContent } from './lib/content.js'
import { buildLesson, buildReview, buildSession, checkItems, lessonsInRound, makeMatchPairs, passMark, placementItems, practiceType, reaskFor } from './lib/lesson.js'
import { isDue, rate, rateGrade, retrievability, strength, weakest } from './lib/strength.js'
import { skillScores } from './lib/score.js'
import { getKv, loadState, put, putKv, remove } from './lib/store.js'
import { hasFrenchVoice, preload, stop } from './lib/audio.js'
import Home from './screens/Home.jsx'
import Lesson from './screens/Lesson.jsx'
import Settings from './screens/Settings.jsx'
import About from './screens/About.jsx'
import Splash from './screens/Splash.jsx'
import GrammarNote from './screens/GrammarNote.jsx'
import Progress from './screens/Progress.jsx'
import Words from './screens/Words.jsx'
import Flashcards from './screens/Flashcards.jsx'
import Verbs from './screens/Verbs.jsx'
import VariantBank from './screens/VariantBank.jsx'
import Profile from './screens/Profile.jsx'
import NativeCheck from './screens/NativeCheck.jsx'
import FlagReview from './screens/FlagReview.jsx'
import Forum from './screens/Forum.jsx'

const FIRST_UNIT = tables.units[0].unit_id
const c = allContent // settings defaults, flags and other shared tables
const today = () => new Date().toLocaleDateString('en-CA')
const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
const defaults = Object.fromEntries(c.settings_defaults.map((s) => [s.setting, s.default]))
const DEFAULT_SETTINGS = {
  answer_strictness: defaults.answer_strictness, typed_input: defaults.typed_input, listen_first: defaults.listen_first,
  theme: defaults.theme, cant_listen_until: null, cant_speak_until: null,
  test_shortcuts: 'on', // Dan only for now; turn the default off before testers (Phase 4)
  points_and_streaks: defaults.points_and_streaks ?? 'on', weekly_goal: 'none',
}
// Monday-start week, for the weekly goal.
const weekStart = (d = new Date()) => { const x = new Date(d); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x.toLocaleDateString('en-CA') }

const paused = (until) => until === 'always' || (typeof until === 'number' && until > Date.now())

export default function App() {
  const [ready, setReady] = useState(false)
  const [screen, setScreen] = useState('home')
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [bank, setBank] = useState([])
  const [progressByUnit, setProgressByUnit] = useState({})
  const [currentUnit, setCurrentUnit] = useState(FIRST_UNIT)
  const [pointsToday, setPointsToday] = useState(0)
  const [pointsTotal, setPointsTotal] = useState(0)
  const [session, setSession] = useState(null)
  const [ending, setEnding] = useState(null)
  const [splash, setSplash] = useState(true)
  const seenWords = useRef(new Set())
  const roundSeen = useRef({})
  const carry = useRef([])
  const notesSeen = useRef(new Set())
  const [note, setNote] = useState(null) // { unitId, thenStart }
  // Phase 2c: FSRS cards, answers by unit/round/skill, review clears by skill, "I can" checks, days active.
  const [cards, setCards] = useState({})
  const tally = useRef({})
  const [clears, setClears] = useState({})
  const [canDoChecked, setCanDoChecked] = useState({})
  const [activeDays, setActiveDays] = useState([])
  // Phase 3: flashcard deck (FSRS, per word), finished checkpoints, variant switches, the flashcards in hand.
  const [deck, setDeck] = useState({})
  const [checkpoints, setCheckpoints] = useState({})
  const [variantStatus, setVariantStatus] = useState({})
  const [flash, setFlash] = useState(null)
  // Phase 3: the topic chosen at the Your topic node (a pack unit id), or null.
  const [topicChoice, setTopicChoice] = useState(null)
  // Phase 4: profile (screen name), native-speaker check results.
  const [profile, setProfile] = useState({})
  const [nativeResults, setNativeResults] = useState({})

  useEffect(() => {
    preload(recordings)
    loadState().then((s) => {
      setBank(s.bank)
      setProgressByUnit(Object.fromEntries(s.progress.map((p) => [p.unit_id, p])))
      if (s.kv.current_unit && tables.units.some((u) => u.unit_id === s.kv.current_unit)) setCurrentUnit(s.kv.current_unit)
      setPointsToday(s.points.find((p) => p.date === today())?.amount ?? 0)
      setPointsTotal(s.points.reduce((n, p) => n + p.amount, 0))
      if (s.kv.settings) setSettings({ ...DEFAULT_SETTINGS, ...s.kv.settings })
      seenWords.current = new Set(s.kv.seen_words ?? [])
      // Rounds seen, per unit. Older installs kept Unit 1's alone under round_seen.
      roundSeen.current = s.kv.round_seen_by_unit ?? (s.kv.round_seen ? { [FIRST_UNIT]: s.kv.round_seen } : {})
      carry.current = s.kv.carry ?? []
      notesSeen.current = new Set(s.kv.notes_seen ?? [])
      setCards(s.kv.fsrs_cards ?? {})
      tally.current = s.kv.skill_tally ?? {}
      setClears(s.kv.review_clears ?? {})
      setCanDoChecked(s.kv.can_do_checked ?? {})
      setActiveDays(s.kv.active_days ?? [])
      setDeck(s.kv.flashcards ?? {})
      setCheckpoints(s.kv.checkpoints ?? {})
      applyVariants(s.kv.variant_status ?? {})
      if (s.kv.topic_choice) setTopicChoice(s.kv.topic_choice)
      setProfile(s.kv.profile ?? {})
      setNativeResults(s.kv.native_check ?? {})
      if (s.kv.approved_answers?.length) addAccepted(s.kv.approved_answers)
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

  // The variant test bank changes the shared variant rows in place, so every unit's lessons see it.
  const original = useRef(Object.fromEntries(tables.variants.map((v) => [v.variant_id, v.status])))
  function applyVariants(map) {
    for (const v of tables.variants) v.status = map[v.variant_id] ?? original.current[v.variant_id]
    setVariantStatus(map)
  }
  const changeVariant = (id, status) => {
    const next = { ...variantStatus, [id]: status }
    applyVariants(next)
    putKv('variant_status', next)
  }

  const progressOf = (unitId) => progressByUnit[unitId] ?? { unit_id: unitId, round_reached: 0, lessons_done: 0 }
  const roundOf = (unitId) => Math.min(progressOf(unitId).round_reached + 1, 5)
  // Lessons and "I can" checks run on one unit; review, practice and placement span units.
  const contentFor = (s) => (['review', 'practice', 'placement', 'words', 'checkpoint'].includes(s?.kind) ? allContent : unitContent(s?.unit_id ?? currentUnit))

  // R20: a row opens when every unit in the row it names has finished round 1. A unit also has to be live.
  const layout = tables.tree_layout
  // Topic packs sit at the Your topic node: they open with it, and only the chosen one (or one already started) is on the path.
  const topicNode = tables.units.find((u) => u.is_topic_pick === 'node')
  const packs = tables.units.filter((u) => u.is_topic_pick === 'yes' && String(u.status).startsWith('live')).sort((a, b) => a.order - b.order)
  const isPack = (unitId) => packs.some((p) => p.unit_id === unitId)
  const onPath = (u) => u.is_topic_pick !== 'node' && (u.is_topic_pick !== 'yes' || u.unit_id === topicChoice || (progressByUnit[u.unit_id]?.lessons_done ?? 0) > 0)
  const rowOf = (unitId) => layout.find((t) => t.unit_id === (isPack(unitId) ? topicNode?.unit_id : unitId))
  const isOpen = (unitId) => {
    const unit = tables.units.find((u) => u.unit_id === unitId)
    if (!String(unit?.status).startsWith('live')) return false
    const after = String(rowOf(unitId)?.unlocks_after ?? '').match(/^row (\d+)$/)
    if (!after) return true
    return layout.filter((t) => t.row === Number(after[1])).every((t) => progressOf(t.unit_id).round_reached >= 1)
  }
  const lockedByOf = (unitId) => {
    const after = String(rowOf(unitId)?.unlocks_after ?? '').match(/^row (\d+)$/)
    const names = after ? layout.filter((t) => t.row === Number(after[1])).map((t) => `Unit ${tables.units.find((u) => u.unit_id === t.unit_id).order}`) : []
    return names.length ? names.join(' and ') : 'the unit before it'
  }
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
  const startLesson = (unitId = currentUnit) => {
    if (session && unitId === currentUnit) { begin(session); return }
    if (unitId !== currentUnit) { setCurrentUnit(unitId); putKv('current_unit', unitId) }
    const round = roundOf(unitId)
    const lesson = buildLesson(unitContent(unitId), {
      round, unit_id: unitId, seen: roundSeen.current[unitId]?.[round] ?? {}, known: seenWords.current,
      settings: lessonModes(), carry: carry.current[0]?.unit_id === unitId ? carry.current[0] : null,
    })
    carry.current = []
    putKv('carry', [])
    begin(lesson)
  }
  // The grammar note comes before a unit's first lesson, once.
  const noteFor = (unitId) => tables.grammar_notes.find((n) => n.unit_id === unitId)
  const startUnit = (unitId) => {
    if (noteFor(unitId) && !notesSeen.current.has(unitId)) { setNote({ unitId, thenStart: true }); setScreen('note'); return }
    startLesson(unitId)
  }
  const closeNote = (start) => {
    const { unitId } = note
    notesSeen.current.add(unitId)
    putKv('notes_seen', [...notesSeen.current])
    setNote(null)
    if (start) startLesson(unitId)
    else setScreen('home')
  }
  // Practice weak skills: the ten items most at risk across the open units, in a type that fits each unit's stage.
  const openUnits = tables.units.filter((u) => onPath(u) && isOpen(u.unit_id)).map((u) => u.unit_id)
  const itemsOf = (unitId) => tables.sentences.filter((s) => s.unit_id === unitId).map((s) => s.sentence_id)
  const startPractice = () => {
    const ids = weakest(openUnits.flatMap(itemsOf), cards, 10)
    if (!ids.length) return
    const items = ids.map((id) => { const u = allContent.sentenceById.get(id).unit_id; const reached = progressOf(u).round_reached; return { sentence_id: id, type: practiceType(reached), round: Math.min(reached + 1, 5), unit_id: u } })
    begin(buildSession(allContent, 'practice', items, { settings: lessonModes() }))
  }
  const startCheck = (canDo) => begin(buildSession(unitContent(canDo.unit_id), 'check', checkItems(unitContent(canDo.unit_id), canDo.skill), { settings: lessonModes(), unit_id: canDo.unit_id, can_do_id: canDo.can_do_id }))
  const startPlacement = () => {
    const liveUnits = [...tables.units].sort((a, b) => a.order - b.order).filter((u) => String(u.status).startsWith('live') && !['node', 'yes'].includes(u.is_topic_pick))
    begin(buildSession(allContent, 'placement', placementItems(liveUnits.map((u) => unitContent(u.unit_id))), { settings: lessonModes() }))
  }
  // Side tools. Words met, in unit order; a word's recall is its own card, else the average of its sentences'.
  const metWords = () => tables.words.filter((w) => seenWords.current.has(w.word_id))
  const sentencesWith = (wordId) => tables.sentence_words.filter((r) => r.word_id === wordId).map((r) => r.sentence_id)
  const recallOf = (wordId) => {
    if (cards[wordId]) return retrievability(cards[wordId])
    const rs = sentencesWith(wordId).map((id) => cards[id]).filter(Boolean).map((cd) => retrievability(cd))
    return rs.length ? rs.reduce((a, b) => a + b, 0) / rs.length : null
  }
  const examplesOf = (wordId) => [...new Set(sentencesWith(wordId))].map((id) => allContent.sentenceById.get(id)).filter(Boolean).slice(0, 3)
  const tableOf = (w) => (w.part_of_speech === 'Verb' ? tables.conjugations.find((t) => t.lemma === w.lemma) : null)
  const startMatch = () => {
    const pool = metWords().sort((a, b) => (recallOf(a.word_id) ?? 1) - (recallOf(b.word_id) ?? 1))
    const words = []
    for (const w of pool) if (words.length < 5 && !words.some((x) => x.hint === w.hint)) words.push(w)
    const q = makeMatchPairs(allContent, words, 1, Math.random)
    begin({ id: `W${Date.now()}`, kind: 'words', started_at: Date.now(), queue: [q], size: 1, graded: 1, index: 0, firstCorrect: 0, firstWrong: 0, misses: [] })
  }
  const startFlashcards = (aloud) => {
    const met = metWords()
    const due = met.filter((w) => deck[w.word_id] && isDue(deck[w.word_id])).sort((a, b) => new Date(deck[a.word_id].due) - new Date(deck[b.word_id].due))
    const fresh = met.filter((w) => !deck[w.word_id])
    const pick = [...due, ...fresh].slice(0, 10)
    const fileFor = (w) => tables.sentences.find((s) => s.lingua_libre?.audio_file && s.french.replace(/[.!?]/g, '').trim().toLowerCase() === w.form)?.lingua_libre.audio_file ?? null
    setFlash({ aloud, cards: pick.map((w) => ({ word_id: w.word_id, form: w.form, hint: w.hint, audio: { french: w.form, file: fileFor(w) }, example: examplesOf(w.word_id)[0] ?? null })) })
    setScreen('flashcards')
  }
  const gradeCard = (wordId, g) => setDeck((d) => { const n = rateGrade(d, wordId, g); putKv('flashcards', n); return n })

  // Review checkpoints (Phase 3): after rows 2 and 3, a review of every unit above. Open once those units have
  // finished round 1; passing marks it done. It never locks anything.
  const checkpointRows = [2, 3].filter((r) => layout.some((t) => t.row === r))
  const unitsUpTo = (row) => layout.filter((t) => t.row <= row && t.unit_id !== topicNode?.unit_id).map((t) => t.unit_id)
  const startCheckpoint = (row) => {
    const ids = unitsUpTo(row).flatMap(itemsOf)
    const weakestFirst = weakest(ids, cards, 10)
    const rest = ids.filter((id) => !weakestFirst.includes(id)).sort(() => Math.random() - 0.5)
    const items = [...weakestFirst, ...rest].slice(0, 10).map((id) => { const u = allContent.sentenceById.get(id).unit_id; const reached = progressOf(u).round_reached; return { sentence_id: id, type: practiceType(reached), round: Math.min(reached + 1, 5), unit_id: u } })
    begin(buildSession(allContent, 'checkpoint', items, { settings: lessonModes(), row }))
  }

  const markActive = () => setActiveDays((d) => { if (d.includes(today())) return d; const next = [...d, today()].slice(-400); putKv('active_days', next); return next })

  const startReview = () => {
    if (bank.length) begin(buildReview(allContent, bank, { round: roundOf(currentUnit), settings: lessonModes(), today: today() }))
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
    setPointsTotal((n) => n + 1)
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
      round: q.round, skill: result.hidden ? 'listening' : q.skill, first_attempt: first, correct: q.speaking ? null : result.correct, typo_accepted: Boolean(result.typo), graded: q.skill !== 'speaking', swapped_from: q.swapped_from ?? null, test_skip: Boolean(result.testSkip), answered_at: new Date().toISOString(),
    })
    for (const seg of q.segments ?? []) if (seg.word_id) seenWords.current.add(seg.word_id)
    for (const id of q.word_ids ?? []) seenWords.current.add(id)
    putKv('seen_words', [...seenWords.current])

    // Lesson answers feed the score by skill (R12: after swaps and Listen first).
    if (session.kind === 'lesson' && first) {
      const skill = result.hidden ? 'listening' : q.skill
      const t = tally.current
      t[session.unit_id] ??= {}
      t[session.unit_id][q.round] ??= {}
      t[session.unit_id][q.round][skill] = (t[session.unit_id][q.round][skill] ?? 0) + 1
      putKv('skill_tally', t)
    }
    // First attempts rate the item on the FSRS schedule (placement excluded: it tests, it doesn't teach).
    if (first && !q.speaking && session.kind !== 'placement') {
      setCards((cs) => { const next = rate(cs, q.sentence_id ?? q.word_ids[0], result); putKv('fsrs_cards', next); return next })
    }
    let next = session
    if (session.kind === 'placement' && first) next = { ...next, placement: [...(next.placement ?? []), { unit_id: q.unit_id, correct: result.correct }] }
    // Speaking is never graded: it earns a point when done (R14) and stays out of the score and the pass.
    if (q.speaking) {
      addPoint()
      setSession(next)
      putKv('current_session', next)
      return
    }
    if (first) {
      next = { ...next, firstCorrect: next.firstCorrect + (result.correct ? 1 : 0), firstWrong: next.firstWrong + (result.correct ? 0 : 1) }
      if (result.correct) addPoint()
      else next = { ...next, misses: [...(next.misses ?? []), { sentence_id: q.sentence_id ?? null, word_id: result.missedWord ?? null, type: q.type }] }
    }
    if (!result.correct) {
      // One re-ask only: a wrong re-ask shows the answer and the lesson moves on.
      const reask = session.kind === 'lesson' && first
        ? reaskFor(contentFor(session), q, { cantListen: lessonModes().cantListen, missedWord: result.missedWord, known: seenWords.current }) : null
      if (reask) next = { ...next, queue: [...next.queue, reask] }
      // Round 1 misses stay out of the bank, and so do misses in a placement or an "I can" check (they test, they don't teach).
      if (q.round >= 2 && !['placement', 'check'].includes(session.kind)) addToBank(q.sentence_id ?? reask?.sentence_id, q.type)
    }
    if (session.kind === 'review' && result.correct) {
      setBank((b) => b.flatMap((e) => {
        if (e.sentence_id !== q.sentence_id) return [e]
        // Leaves after three correct answers on three different days.
        const days = [...new Set([...(e.correct_days ?? []), today()])]
        if (days.length >= 3) {
          remove('review_bank', e.sentence_id)
          // A cleared item is new learning: it moves its skill's score.
          const skill = allContent.typeById.get(e.type_id)?.skill ?? 'reading'
          setClears((cl) => { const n = { ...cl, [skill]: (cl[skill] ?? 0) + 1 }; putKv('review_clears', n); return n })
          return []
        }
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

  // Flags (version 2): the answer as given, its direction and the sentence travel with the flag, for Flag review.
  // Listening types (QT07, QT11) accept only the sentence heard, so their answers can't be approved.
  const onFlag = (q, reason_id, result) => {
    const direction = q.type === 'QT07' || q.type === 'QT11' || q.type === 'QT09' ? null : q.lang === 'fr' ? 'en_to_fr' : q.lang === 'en' ? 'fr_to_en' : null
    put('flags', {
      flag_id: uid(), sentence_id: q.sentence_id ?? q.word_ids.join(';'), type_id: q.type, reason_id, flagged_at: new Date().toISOString(),
      given: result?.given ?? null, correct: result?.correct ?? null, direction, french: q.french ?? null, english: q.english ?? null, status: 'open',
    })
  }

  const finish = (s) => {
    remove('kv', 'current_session')
    setSession(null)
    markActive()
    if (s.kind === 'review' || s.kind === 'practice') {
      setEnding({ line: `${s.firstCorrect} of ${s.graded ?? s.size} correct.`, back: s.kind === 'practice' ? 'home' : 'home' })
      return
    }
    if (s.kind === 'words') {
      setEnding({ line: s.firstCorrect ? 'All matched.' : 'All matched, with a slip or two.', back: 'words' })
      return
    }
    if (s.kind === 'checkpoint') {
      const mark = passMark(s.graded)
      const passed = s.firstCorrect >= mark
      if (passed) setCheckpoints((m) => { const n = { ...m, [s.row]: today() }; putKv('checkpoints', n); return n })
      setEnding({ line: `${s.firstCorrect} of ${s.graded}.${passed ? '' : ` Pass is ${mark}; try it again any time.`}` })
      return
    }
    if (s.kind === 'check') {
      const passed = s.firstCorrect >= (s.graded ?? 0)
      if (passed) setCanDoChecked((m) => { const n = { ...m, [s.can_do_id]: today() }; putKv('can_do_checked', n); return n })
      setEnding({ line: passed ? 'Checked.' : `${s.firstCorrect} of ${s.graded}. Not checked yet; try it again another time.`, back: 'progress' })
      return
    }
    if (s.kind === 'placement') {
      // A unit is placed when 2 of its 3 answers are right; placing stops at the first unit that isn't.
      const order = [...new Set((s.placement ?? []).map((p) => p.unit_id))]
      const placed = []
      for (const u of order) {
        const rows = s.placement.filter((p) => p.unit_id === u)
        if (rows.filter((p) => p.correct).length >= 2) placed.push(u); else break
      }
      setProgressByUnit((p) => {
        const n = { ...p }
        for (const u of placed) {
          const cur = n[u] ?? { unit_id: u, round_reached: 0, lessons_done: 0 }
          if (cur.round_reached < 1) { n[u] = { ...cur, round_reached: 1, lessons_done: 0 }; put('unit_progress', n[u]) }
        }
        return n
      })
      for (const u of placed) for (const w of tables.words.filter((x) => x.first_unit === u)) seenWords.current.add(w.word_id)
      putKv('seen_words', [...seenWords.current])
      putKv('placement', { date: today(), placed })
      const names = placed.map((u) => tables.units.find((x) => x.unit_id === u).order)
      setEnding({ line: placed.length ? `Placed through Unit ${names.at(-1)}: round 1 of ${names.length === 1 ? 'Unit 1' : `Units ${names.join(', ')}`} counts as done.` : 'Start with Unit 1.' })
      return
    }
    const mark = passMark(s.graded ?? s.size)
    const passed = s.firstCorrect >= mark
    put('lessons', { lesson_id: s.id, unit_id: s.unit_id, round: s.round, score: s.firstCorrect, graded_count: s.graded ?? s.size, passed, duration_ms: s.started_at ? Date.now() - s.started_at : null, finished_at: new Date().toISOString() })
    if (!passed) {
      setEnding({ line: `${s.firstCorrect} of ${s.graded ?? s.size}. Pass is ${mark}, so this lesson repeats in new question types.`, retry: s })
      return
    }
    const unitSeen = roundSeen.current[s.unit_id] ?? {}
    const seen = unitSeen[s.round] ?? { sentences: {}, words: {} }
    for (const q of s.queue.slice(0, s.size)) {
      if (q.sentence_id) seen.sentences[q.sentence_id] = (seen.sentences[q.sentence_id] ?? 0) + 1
      for (const id of q.word_ids ?? []) seen.words[id] = (seen.words[id] ?? 0) + 1
    }
    roundSeen.current = { ...roundSeen.current, [s.unit_id]: { ...unitSeen, [s.round]: seen } }
    putKv('round_seen_by_unit', roundSeen.current)
    carry.current = (s.misses ?? []).map((m) => ({ ...m, unit_id: s.unit_id }))
    putKv('carry', carry.current)
    const progress = progressOf(s.unit_id)
    const uc = unitContent(s.unit_id)
    if (s.round === roundOf(s.unit_id) && progress.round_reached < 5) {
      const done = progress.lessons_done + 1
      // A round runs its full count, and longer only if a miss kept a sentence or word from appearing.
      const covered = uc.sentences.every((x) => seen.sentences[x.sentence_id]) && uc.wordOrder.every((id) => seenWords.current.has(id))
      const count = lessonsInRound(uc, s.round)
      const roundDone = (done >= count && covered) || done >= count + 3
      const nextProgress = { ...progress, round_reached: roundDone ? s.round : progress.round_reached, lessons_done: roundDone ? 0 : done }
      setProgressByUnit((p) => ({ ...p, [s.unit_id]: nextProgress }))
      put('unit_progress', nextProgress)
    }
    setEnding({ line: `${s.firstCorrect} of ${s.graded ?? s.size}.` })
  }

  const leaveLesson = () => {
    stop()
    setScreen('home')
  }

  const afterEnding = () => {
    if (ending?.retry) {
      begin(buildLesson(unitContent(ending.retry.unit_id), { round: ending.retry.round, unit_id: ending.retry.unit_id, known: seenWords.current, settings: lessonModes(), retry: ending.retry.queue.slice(0, ending.retry.size) }))
      return
    }
    const back = ending?.back ?? 'home'
    setEnding(null)
    setScreen(back)
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
      <Lesson key={session.id} session={session} content={contentFor(session)} settings={settings} seenWords={seenWords.current} cantListen={lessonModes().cantListen}
        onAnswer={onAnswer} onHint={onHint} onFlag={onFlag} onExit={leaveLesson}
        onAdvance={(s) => { setSession(s); putKv('current_session', s) }} onFinish={finish} />
    )
  }
  // Scores, strength and streaks, all worked out from what's stored.
  const a1Units = tables.units.filter((u) => u.cefr === 'A1' && String(u.status).startsWith('live') && onPath(u))
  const scores = skillScores({
    units: a1Units.map((u) => ({ unit_id: u.unit_id, content: unitContent(u.unit_id), reached: progressOf(u.unit_id).round_reached })),
    tally: tally.current, clears,
    canDo: tables.can_do.filter((d) => a1Units.some((u) => u.unit_id === d.unit_id)).map((d) => ({ skill: d.skill, checked: Boolean(canDoChecked[d.can_do_id]) })),
  })
  const days = new Set(activeDays)
  let streak = 0
  for (let d = new Date(days.has(today()) ? Date.now() : Date.now() - 864e5); days.has(d.toLocaleDateString('en-CA')); d = new Date(d.getTime() - 864e5)) streak++
  const thisWeek = activeDays.filter((d) => d >= weekStart()).length
  const goal = settings.weekly_goal === 'none' ? null : Number(settings.weekly_goal)
  const showPoints = settings.points_and_streaks !== 'off'

  if (screen === 'words') {
    return <Words words={metWords()} units={[...tables.units].sort((a, b) => a.order - b.order)} recallOf={recallOf} examplesOf={examplesOf} tableOf={tableOf}
      onMatch={startMatch} onFlashcards={startFlashcards} onBack={() => setScreen('home')} />
  }
  if (screen === 'flashcards' && flash) return <Flashcards cards={flash.cards} aloud={flash.aloud} onGrade={gradeCard} onDone={() => { markActive(); setFlash(null); setScreen('words') }} />
  if (screen === 'verbs') {
    const lemmas = new Set(metWords().filter((w) => w.part_of_speech === 'Verb').map((w) => w.lemma))
    return <Verbs tables={tables.conjugations.filter((t) => lemmas.has(t.lemma))} strict={settings.answer_strictness === 'strict'} onBack={() => setScreen('home')} />
  }
  if (screen === 'variants') {
    return <VariantBank types={tables.question_types.filter((t) => tables.variants.some((v) => v.type_id === t.type_id))} variants={tables.variants.map((v) => ({ ...v }))}
      onChange={changeVariant} onBack={() => setScreen('settings')} />
  }
  if (screen === 'progress') {
    return <Progress scores={scores} units={a1Units} canDo={tables.can_do} checked={canDoChecked} isOpen={isOpen} progressOf={progressOf}
      onCheck={startCheck} onBack={() => setScreen('home')} />
  }
  if (screen === 'settings') {
    return <Settings settings={settings} onChange={changeSettings} onBack={() => setScreen('home')} onAbout={() => setScreen('about')} onPlacement={startPlacement} onVariants={() => setScreen('variants')}
      onProfile={() => setScreen('profile')} onNativeCheck={() => setScreen('native')} onFlags={() => setScreen('flags')} onForum={() => setScreen('forum')} />
  }
  if (screen === 'profile') return <Profile profile={profile} onChange={(p) => { const n = { ...profile, ...p }; setProfile(n); putKv('profile', n) }} onBack={() => setScreen('settings')} />
  if (screen === 'native') {
    const order = new Map(tables.units.map((u) => [u.unit_id, u]))
    const list = tables.sentences.filter((s) => s.source === 'tamago_original')
      .map((s) => ({ ...s, unit_title: `${order.get(s.unit_id).is_topic_pick === 'yes' ? 'Topic' : 'Unit ' + order.get(s.unit_id).order}: ${order.get(s.unit_id).title}` }))
      .sort((x, y) => order.get(x.unit_id).order - order.get(y.unit_id).order || x.sentence_id.localeCompare(y.sentence_id))
    return <NativeCheck sentences={list} results={nativeResults} onChange={(n) => { setNativeResults(n); putKv('native_check', n) }} onBack={() => setScreen('settings')} />
  }
  if (screen === 'flags') {
    return <FlagReview reasons={tables.flag_reasons} onBack={() => setScreen('settings')} onAccept={(row) => {
      addAccepted([row])
      getKv('approved_answers').then((list) => putKv('approved_answers', [...(list ?? []), row]))
    }} />
  }
  if (screen === 'forum') return <Forum onBack={() => setScreen('settings')} />
  if (screen === 'about') return <About content={allContent} onBack={() => setScreen('settings')} />
  if (screen === 'note' && note) {
    const unit = tables.units.find((u) => u.unit_id === note.unitId)
    return <GrammarNote unit={unit} note={noteFor(note.unitId)} sentenceById={allContent.sentenceById} doneLabel={note.thenStart ? 'Start the lesson' : 'Done'}
      onDone={() => closeNote(note.thenStart)} onBack={() => closeNote(false)} />
  }
  const rows = [...new Set(layout.map((t) => t.row))].sort((a, b) => a - b).map((r) => layout.filter((t) => t.row === r).sort((a, b) => a.position - b.position).map((t) => {
    // The Your topic node stands for the chosen pack once there is one; it keeps the node's place number.
    const node = tables.units.find((u) => u.unit_id === t.unit_id)
    const id = node.is_topic_pick === 'node' ? topicChoice ?? node.unit_id : node.unit_id
    const unit = id === node.unit_id ? node : { ...tables.units.find((u) => u.unit_id === id), order: node.order }
    const progress = progressOf(id)
    const open = isOpen(id)
    const choosing = id === topicNode?.unit_id
    const lessons = open && !choosing ? Math.max(lessonsInRound(unitContent(id), roundOf(id)), progress.lessons_done + 1) : 0
    return { unit, progress, open, current: id === currentUnit, lesson: progress.lessons_done + 1, lessons, strength: strength(itemsOf(id), cards),
      topic: node.is_topic_pick === 'node' ? { choosing, packs: packs.map((p) => ({ unit_id: p.unit_id, title: p.title, started: progressOf(p.unit_id).lessons_done > 0 })) } : null }
  }))
  const cur = progressOf(currentUnit)
  return (
    <Home rows={rows} points={pointsToday} pointsTotal={pointsTotal} bankSize={bank.length} showPoints={showPoints}
      scores={scores} streak={streak} thisWeek={thisWeek} goal={goal} onProgress={() => setScreen('progress')}
      canPractice={weakest(openUnits.flatMap(itemsOf), cards, 1).length > 0} onPractice={startPractice}
      onWords={() => setScreen('words')} onVerbs={() => setScreen('verbs')}
      checkpoints={checkpointRows.map((row) => ({ afterRow: row, label: `Units ${unitsUpTo(row).map((u) => tables.units.find((x) => x.unit_id === u).order).join(', ')}`, available: unitsUpTo(row).every((u) => progressOf(u).round_reached >= 1), done: checkpoints[row] ?? null }))}
      onCheckpoint={startCheckpoint}
      inProgress={Boolean(session)}
      currentLabel={cur.round_reached >= 5 ? 'Practice' : 'Continue'} lockedByOf={lockedByOf}
      onContinue={() => (session ? startLesson() : startUnit(currentUnit))} onStartUnit={(id) => { if (session && id !== currentUnit) { remove('kv', 'current_session'); setSession(null) } startUnit(id) }}
      onGrammarNote={(id) => { setNote({ unitId: id, thenStart: false }); setScreen('note') }} hasNote={(id) => Boolean(noteFor(id))}
      onChooseTopic={(id) => { setTopicChoice(id); putKv('topic_choice', id); if (session && id !== currentUnit) { remove('kv', 'current_session'); setSession(null) } startUnit(id) }}
      onReview={startReview} onSettings={() => setScreen('settings')} />
  )
  }

  return (
    <>
      {view()}
      {splash && <Splash onDone={() => setSplash(false)} />}
    </>
  )
}
