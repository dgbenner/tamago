import { useEffect, useRef, useState } from 'react'
import { addAccepted, allContent, tables, unitContent } from './lib/content.js'
import { chooseCourse, course, firstLaunch, saveSharedSettings, sharedSettings, takeDevJump } from './lib/course.js'
import { BUILT_TYPES, recordingOf, wordRecordingOf, indexContent, buildLesson, buildReview, buildSession, checkItems, lessonsInRound, makeMatchPairs, passMark, placementItems, practiceType, reaskFor, swapRemaining, buildCatchUp, catchUpItems } from './lib/lesson.js'
import { isDue, rate, rateGrade, retrievability, strength, weakest } from './lib/strength.js'
import { skillScores } from './lib/score.js'
import { getAll, getKv, loadState, put, putKv, remove } from './lib/store.js'
import { hasFrenchVoice, stop } from './lib/audio.js'
import Home from './screens/Home.jsx'
import Lesson from './screens/Lesson.jsx'
import Settings from './screens/Settings.jsx'
import About from './screens/About.jsx'
import Splash from './screens/Splash.jsx'
import GrammarNote from './screens/GrammarNote.jsx'
import Progress from './screens/Progress.jsx'
import Glossary from './screens/Glossary.jsx'
import Flashcards from './screens/Flashcards.jsx'
import Verbs from './screens/Verbs.jsx'
import VariantBank from './screens/VariantBank.jsx'
import Profile from './screens/Profile.jsx'
import NativeCheck from './screens/NativeCheck.jsx'
import FlagReview from './screens/FlagReview.jsx'
import Forum from './screens/Forum.jsx'
import Make from './screens/Make.jsx'
import Listening from './screens/Listening.jsx'
import Developer from './screens/Developer.jsx'
import Conversation from './screens/Conversation.jsx'
import { SCENES } from './lib/converse.js'
import { makeA1Question } from './lib/a1types.js'
import { A1_SAMPLES } from './dev/a1-samples.js'
import { firstCircleMarker } from './screens/CircleNode.jsx'
import { EXAMS, finalItems, finalLine, finalScores } from './lib/finalcheck.js'
import { listeningFrom, requestGenerated, sentencesFrom } from './lib/generate.js'
import { tokenize } from '../scripts/lib/french.mjs'

const FIRST_UNIT = tables.units[0].unit_id
const c = allContent // settings defaults, flags and other shared tables
const today = () => new Date().toLocaleDateString('en-CA')
const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
const defaults = Object.fromEntries(c.settings_defaults.map((s) => [s.setting, s.default]))
const DEFAULT_SETTINGS = {
  answer_strictness: defaults.answer_strictness, typed_input: defaults.typed_input, listen_first: defaults.listen_first,
  theme: defaults.theme, cant_listen_until: null, cant_speak_until: null,
  test_shortcuts: 'on', // Dan only for now; turn the default off before testers (Phase 4)
  developer: 'on', // the Developer entry in Tools; turn the default off before testers (#developer always opens it)
  points_and_streaks: defaults.points_and_streaks ?? 'on', weekly_goal: 'none',
}
// Monday-start week, for the weekly goal.
const weekStart = (d = new Date()) => { const x = new Date(d); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x.toLocaleDateString('en-CA') }

// Desktop and iPad in landscape (Dan's test notes, Pass 2): from 1024px the home becomes two columns, with the tools in a
// right-hand panel. Phones never reach it, even turned sideways.
const WIDE = '(min-width: 1024px)'
function useWide() {
  const [wide, setWide] = useState(() => window.matchMedia(WIDE).matches)
  useEffect(() => {
    const m = window.matchMedia(WIDE)
    const on = () => setWide(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return wide
}

const SCREEN_TITLES = { home: 'Tamago', lesson: 'Lesson', words: 'Glossary', verbs: 'Verbs', make: 'Self-Study', progress: 'Progress', settings: 'Settings', about: 'About the Content',
  profile: 'Profile and Backup', native: 'Native-Speaker Check', flags: 'Flag Review', forum: 'Forum', variants: 'Variant Test Bank', note: 'Grammar Note', flashcards: 'Flashcards', listening: 'Listening', developer: 'Developer' }

// A topic pack belongs to the node in its topic_node column; packs from before the column belong to the first node.
const packNode = (unit, nodes) => unit?.topic_node || nodes[0]?.unit_id
const topicKey = (nodeId) => (nodeId === 'U100' ? 'topic_choice' : `topic_choice_${nodeId}`)
const paused = (until) => until === 'always' || (typeof until === 'number' && until > Date.now())

export default function App() {
  const [ready, setReady] = useState(false)
  const wide = useWide()
  const [screen, setScreen] = useState('home')
  // A conversation in progress (Dan, 2026-11-10): a scene from the path or the partner from Self-Study.
  const [convo, setConvo] = useState(null)
  const [scenesDone, setScenesDone] = useState({})
  // A1 in parts (A1 Complete, 2026-11-10): the part the tree shows, and part reviews passed.
  const [partView, setPartView] = useState(null)
  const [partReviews, setPartReviews] = useState({})
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [bank, setBank] = useState([])
  const [progressByUnit, setProgressByUnit] = useState({})
  const [currentUnit, setCurrentUnit] = useState(FIRST_UNIT)
  const [pointsToday, setPointsToday] = useState(0)
  const [pointsTotal, setPointsTotal] = useState(0)
  const [session, setSession] = useState(null)
  const [ending, setEnding] = useState(null)
  const [lastLine, setLastLine] = useState(null) // a toast on home: { id, kind: info|success|warning|error, text }
  const toast = (kind, text) => setLastLine({ id: Date.now(), kind, text })
  const [splash, setSplash] = useState(true) // the opening screen and version name on every launch (Dan, 2026-11-11)
  // First launch: the opening screen asks for a language, but only once the saved state shows nobody has used this
  // course here yet (a learner with progress is never asked, and never sees the flags flash and vanish).
  const [chooser, setChooser] = useState(false)
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
  const [checkpointsSkipped, setCheckpointsSkipped] = useState({})
  // Pass 3: words got wrong, for the Glossary's Missed (word_id to the date); a later right answer clears them.
  const [wordMisses, setWordMisses] = useState({})
  // Catch-Up (A1 Complete 9): how often each word was shown in Catch-Up sessions, on top of the lessons' counts.
  const [catchupSeen, setCatchupSeen] = useState({})
  // The final A1 check's last result (kv final_check: date and per-part scores).
  const [finalCheck, setFinalCheck] = useState(null)
  const [variantStatus, setVariantStatus] = useState({})
  const [flash, setFlash] = useState(null)
  // Phase 3: the topic chosen at each Your Topic node (node unit id to a pack unit id). Since 2026-11-10 there are two
  // nodes: U100 after Unit 5 (packs on Units 1 to 5) and U200 after Unit 13 (packs on all of A1).
  const [topicChoice, setTopicChoice] = useState({})
  // Phase 4: profile (screen name), native-speaker check results.
  const [profile, setProfile] = useState({})
  const [nativeResults, setNativeResults] = useState({})
  // Phase 5: Make your own. Sentences met this week, Claude's status line, a listening passage in hand.
  const [weekIds, setWeekIds] = useState([])
  const [makeStatus, setMakeStatus] = useState('')
  const [passage, setPassage] = useState(null)

  useEffect(() => {
    loadState().then((s) => {
      setBank(s.bank)
      setProgressByUnit(Object.fromEntries(s.progress.map((p) => [p.unit_id, p])))
      if (s.kv.current_unit && tables.units.some((u) => u.unit_id === s.kv.current_unit)) setCurrentUnit(s.kv.current_unit)
      setPointsToday(s.points.find((p) => p.date === today())?.amount ?? 0)
      setPointsTotal(s.points.reduce((n, p) => n + p.amount, 0))
      // Settings are shared across courses: the shared copy wins, else this course's own.
      const shared = sharedSettings()
      if (shared || s.kv.settings) setSettings({ ...DEFAULT_SETTINGS, ...(s.kv.settings ?? {}), ...(shared ?? {}) })
      // Someone who already has progress here isn't new: no language question, this course stays.
      if (firstLaunch) {
        if (s.progress.length || s.points.length || s.bank.length) chooseCourse(course.id)
        else setChooser(true)
      }
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
      setScenesDone(s.kv.scenes_done ?? {})
      setPartReviews(s.kv.part_reviews ?? {})
      if (s.kv.part_view) setPartView(s.kv.part_view)
      setCheckpointsSkipped(s.kv.checkpoints_skipped ?? {})
      setWordMisses(s.kv.word_misses ?? {})
      setCatchupSeen(s.kv.catchup_seen ?? {})
      setFinalCheck(s.kv.final_check ?? null)
      applyVariants(s.kv.variant_status ?? {})
      // The first node's choice keeps its old key (topic_choice); later nodes use topic_choice_<node>.
      // A choice counts only while the pack is still at that node (Weather moved to the second node on 2026-11-10).
      const nodes = tables.units.filter((u) => u.is_topic_pick === 'node').sort((a, b) => a.order - b.order)
      setTopicChoice(Object.fromEntries(nodes.map((n) => [n.unit_id, s.kv[topicKey(n.unit_id)]])
        .filter(([n, v]) => v && packNode(tables.units.find((u) => u.unit_id === v), nodes) === n)))
      setProfile(s.kv.profile ?? {})
      setNativeResults(s.kv.native_check ?? {})
      if (s.kv.approved_answers?.length) addAccepted(s.kv.approved_answers)
      if (s.kv.current_session) setSession(s.kv.current_session)
      setReady(true)
    })
  }, [])

  // The Developer page's hidden address: #developer opens it, whatever the setting.
  useEffect(() => {
    if (!ready) return undefined
    const open = () => { if (location.hash === '#developer') setScreen('developer') }
    open()
    window.addEventListener('hashchange', open)
    return () => window.removeEventListener('hashchange', open)
  }, [ready])
  const leaveDeveloper = () => { if (location.hash) history.replaceState(null, '', location.pathname); setScreen('home') }

  useEffect(() => {
    const root = document.documentElement
    if (settings.theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', settings.theme)
  }, [settings.theme])

  // The page itself never scrolls (see index.css); #root does.
  // On a wide screen the panel's screens open beside the path, so the path keeps its place.
  const PANEL = ['home', 'words', 'verbs', 'progress', 'make']
  const lastScreen = useRef(screen)
  useEffect(() => {
    const inPanel = wide && PANEL.includes(screen) && PANEL.includes(lastScreen.current)
    if (!inPanel) document.getElementById('root')?.scrollTo(0, 0)
    // Each screen has its own page title (WCAG 2.4.2), and moving to a screen moves focus to its heading, so a screen
    // reader announces where you are (2.4.3). Lessons place their own focus. The first load leaves focus alone.
    document.title = `${SCREEN_TITLES[screen] ?? 'Tamago'}${screen === 'home' ? '' : ' · Tamago'}`
    if (lastScreen.current !== screen && screen !== 'lesson') {
      window.setTimeout(() => {
        const scope = inPanel || (wide && PANEL.includes(screen) && screen !== 'home') ? document.querySelector('.home-panel') : document
        const h = scope?.querySelector('h1:not(.sr-only), h2') ?? document.querySelector('h1')
        if (h) { if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }) }
      }, 0)
    }
    lastScreen.current = screen
  }, [screen])

  const changeSettings = (patch) => {
    const next = { ...settings, ...patch }
    setSettings(next)
    putKv('settings', next)
    saveSharedSettings(next) // settings are shared across courses
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
  // Claude's sentences live in the session itself, so a generated session survives a reload.
  const generated = useRef(new Map())
  const generatedContent = (s) => {
    if (!generated.current.has(s.id)) generated.current.set(s.id, indexContent({ ...tables, sentences: [...tables.sentences, ...s.generated.sentences], sentence_words: [...tables.sentence_words, ...s.generated.sentence_words] }))
    return generated.current.get(s.id)
  }
  const contentFor = (s) => s?.kind === 'generated' ? generatedContent(s) : (['review', 'practice', 'placement', 'words', 'checkpoint', 'final', 'catchup'].includes(s?.kind) ? allContent : unitContent(s?.unit_id ?? currentUnit))

  // R20: a row opens when every unit in the row it names has finished round 1. A unit also has to be live.
  // Only units with content are on the tree: a course still being built (Spanish) shows the units it has so far.
  // A topic node appears once it has a live pack.
  const liveUnit = (id) => String(tables.units.find((u) => u.unit_id === id)?.status).startsWith('live')
  const firstNode = tables.units.filter((u) => u.is_topic_pick === 'node').sort((a, b) => a.order - b.order)[0]?.unit_id
  const nodeHasPacks = (id) => tables.units.some((u) => u.is_topic_pick === 'yes' && String(u.status).startsWith('live') && (u.topic_node || firstNode) === id)
  const layout = tables.tree_layout.filter((t) => liveUnit(t.unit_id) && (tables.units.find((u) => u.unit_id === t.unit_id)?.is_topic_pick !== 'node' || nodeHasPacks(t.unit_id)))
  // Topic packs sit at the Your topic node: they open with it, and only the chosen one (or one already started) is on the path.
  const topicNodes = tables.units.filter((u) => u.is_topic_pick === 'node').sort((a, b) => a.order - b.order)
  const isTopicNode = (unitId) => topicNodes.some((n) => n.unit_id === unitId)
  const packs = tables.units.filter((u) => u.is_topic_pick === 'yes' && String(u.status).startsWith('live')).sort((a, b) => a.order - b.order)
  const nodeOfPack = (unitId) => packNode(tables.units.find((u) => u.unit_id === unitId), topicNodes)
  const isPack = (unitId) => packs.some((p) => p.unit_id === unitId)
  const packsAt = (nodeId) => packs.filter((p) => nodeOfPack(p.unit_id) === nodeId)
  const onPath = (u) => u.is_topic_pick !== 'node' && (u.is_topic_pick !== 'yes' || u.unit_id === topicChoice[nodeOfPack(u.unit_id)] || (progressByUnit[u.unit_id]?.lessons_done ?? 0) > 0)
  const rowOf = (unitId) => layout.find((t) => t.unit_id === (isPack(unitId) ? nodeOfPack(unitId) : unitId))
  // Parts: a part opens when every circle of the part before it has finished round 1 (R20, as rows do).
  const partOf = (unitId) => Number(tables.units.find((u) => u.unit_id === (isPack(unitId) ? nodeOfPack(unitId) : unitId))?.part || 1)
  const partCircles = (n) => layout.filter((t) => !isTopicNode(t.unit_id) && partOf(t.unit_id) === n).map((t) => t.unit_id)
  const partDone = (n) => partCircles(n).length > 0 && partCircles(n).every((u) => progressOf(u).round_reached >= 1)
  const partUnlocked = (n) => n <= 1 || (partUnlocked(n - 1) && partDone(n - 1))
  const isOpen = (unitId) => {
    const unit = tables.units.find((u) => u.unit_id === unitId)
    if (!String(unit?.status).startsWith('live')) return false
    if (!partUnlocked(partOf(unitId))) return false
    const after = String(rowOf(unitId)?.unlocks_after ?? '').match(/^row (\d+)$/)
    if (!after) return true
    return layout.filter((t) => t.row === Number(after[1])).every((t) => progressOf(t.unit_id).round_reached >= 1)
  }
  const lockedByOf = (unitId) => {
    const after = String(rowOf(unitId)?.unlocks_after ?? '').match(/^row (\d+)$/)
    // By title: learners don't count units (Dan's test notes).
    const names = after ? layout.filter((t) => t.row === Number(after[1])).map((t) => tables.units.find((u) => u.unit_id === t.unit_id).title) : []
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
    setLastLine(null)
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
  // Development only (stripped from the live build): open any round of any unit, so tests can reach every question type.
  useEffect(() => {
    if (!import.meta.env.DEV && import.meta.env.VITE_TEST_HOOK !== '1') return
    window.__tamago = {
      lesson: (unitId, round) => {
        const uc = unitContent(unitId)
        begin(buildLesson(uc, { round, unit_id: unitId, known: new Set([...seenWords.current, ...uc.wordOrder]), settings: lessonModes() }))
      },
    }
  })
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
  // The open units on the path, for Practice and Self-Study.
  const openUnits = tables.units.filter((u) => onPath(u) && isOpen(u.unit_id)).map((u) => u.unit_id)
  const itemsOf = (unitId) => tables.sentences.filter((s) => s.unit_id === unitId).map((s) => s.sentence_id)
  const startCheck = (canDo) => begin(buildSession(unitContent(canDo.unit_id), 'check', checkItems(unitContent(canDo.unit_id), canDo.skill), { settings: lessonModes(), unit_id: canDo.unit_id, can_do_id: canDo.can_do_id }))
  const startPlacement = () => {
    const liveUnits = [...tables.units].sort((a, b) => a.order - b.order).filter((u) => String(u.status).startsWith('live') && !['node', 'yes'].includes(u.is_topic_pick))
    begin(buildSession(allContent, 'placement', placementItems(liveUnits.map((u) => unitContent(u.unit_id))), { settings: lessonModes() }))
  }
  // Phase 5, Make your own. The weakest graded skill, by score; ten of the least-known items in a type of that skill.
  const SKILL_TYPES = { reading: (r) => (r >= 2 ? 'QT06' : 'QT03'), listening: (r) => (r >= 4 ? 'QT11' : r >= 2 ? 'QT07' : 'QT04'), writing: (r) => (r >= 4 ? 'QT12' : 'QT08') }
  const courseNames = [...new Set(tables.sentence_words.filter((x) => x.notes === 'name').map((x) => x.surface))]
  const openMakeScreen = () => {
    setMakeStatus('')
    const since = weekStart()
    getAll('attempts').then((rows) => setWeekIds([...new Set(rows.filter((x) => x.answered_at && new Date(x.answered_at).toLocaleDateString('en-CA') >= since && allContent.sentenceById.has(x.sentence_id)).map((x) => x.sentence_id))]))
    setScreen('make')
  }
  const startWeakSkill = (skill) => {
    const ids = weakest(openUnits.flatMap(itemsOf), cards, 10)
    const items = ids.map((id) => { const u = allContent.sentenceById.get(id).unit_id; const reached = progressOf(u).round_reached; return { sentence_id: id, type: SKILL_TYPES[skill](reached), round: Math.max(2, Math.min(reached + 1, 5)), unit_id: u } })
    begin(buildSession(allContent, 'practice', items, { settings: lessonModes(), back: 'make' }))
  }
  const startWeek = () => {
    const ids = weekIds.sort(() => Math.random() - 0.5).slice(0, 10)
    const items = ids.map((id) => { const u = allContent.sentenceById.get(id).unit_id; const reached = progressOf(u).round_reached; return { sentence_id: id, type: practiceType(reached), round: Math.min(reached + 1, 5), unit_id: u } })
    begin(buildSession(allContent, 'practice', items, { settings: lessonModes(), back: 'make' }))
  }
  // Pasted French: each word Tamago has (any unit) becomes a card; the rest are named as not in Tamago yet.
  const listMatch = (text) => {
    const byForm = new Map(tables.words.map((w) => [w.form.toLowerCase(), w]))
    const found = new Map()
    const missing = new Set()
    for (const t of tokenize(text)) {
      const k = t.text.toLowerCase()
      const w = byForm.get(k) ?? byForm.get(k.replace(/'$/, ''))
      if (w) found.set(w.word_id, w)
      else missing.add(k)
    }
    return { words: [...found.values()].slice(0, 20), missing: [...missing].slice(0, 12) }
  }
  const startGenerated = async (focus) => {
    setMakeStatus('Claude is writing…')
    const words = metWords()
    const res = await requestGenerated('sentences', words, { names: courseNames, count: 8, focus })
    const g = sentencesFrom(res.result, words, courseNames)
    if (g.sentences.length < 3) { setMakeStatus(res.error === 'offline' ? 'No connection.' : 'Not enough sentences used only your words. Try again.'); return }
    setMakeStatus('')
    const items = g.sentences.map((s, i) => ({ sentence_id: s.sentence_id, type: ['QT03', 'QT06', 'QT08'][i % 3], round: 3, unit_id: 'GEN' }))
    const content = indexContent({ ...tables, sentences: [...tables.sentences, ...g.sentences], sentence_words: [...tables.sentence_words, ...g.sentence_words] })
    const s = buildSession(content, 'generated', items, { settings: lessonModes(), generated: g, back: 'make' })
    generated.current.set(s.id, content)
    begin(s)
  }
  const startListening = async (focus) => {
    setMakeStatus('Claude is writing…')
    const words = metWords()
    const res = await requestGenerated('listening', words, { names: courseNames, focus })
    const p = listeningFrom(res.result, words, courseNames)
    if (!p) { setMakeStatus(res.error === 'offline' ? 'No connection.' : 'That one used words you haven\'t met. Try again.'); return }
    setMakeStatus('')
    setPassage(p)
    setScreen('listening')
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
  const startFlashcards = (aloud, chosen = null, back = 'words') => {
    const met = chosen ?? metWords()
    const due = met.filter((w) => deck[w.word_id] && isDue(deck[w.word_id])).sort((a, b) => new Date(deck[a.word_id].due) - new Date(deck[b.word_id].due))
    const fresh = met.filter((w) => !deck[w.word_id])
    const pick = [...due, ...fresh].slice(0, 10)
    const fileFor = (w) => wordRecordingOf(allContent, w)
    setFlash({ aloud, back, cards: pick.map((w) => ({ word_id: w.word_id, form: w.form, hint: w.hint, audio: { french: w.form, file: fileFor(w) }, example: examplesOf(w.word_id)[0] ?? null })) })
    setScreen('flashcards')
  }
  const gradeCard = (wordId, g) => setDeck((d) => { const n = rateGrade(d, wordId, g); putKv('flashcards', n); return n })

  // Review checkpoints (Phase 3): after rows 2 and 3, a review of every unit above. Open once those units have
  // finished round 1; passing marks it done. It never locks anything.
  // Spanish has one more row of units (row 9), so the last row of main units always gets one too.
  const lastMainRow = Math.max(0, ...layout.filter((t) => !isTopicNode(t.unit_id)).map((t) => t.row))
  // Part 1 keeps its rows; each later part (A1 Complete) gets one mid-part and one at its last row of circles.
  const partOfRow = (r) => Math.max(1, ...layout.filter((t) => t.row === r).map((t) => partOf(t.unit_id)))
  const part1Last = Math.max(0, ...layout.filter((t) => !isTopicNode(t.unit_id) && partOf(t.unit_id) === 1 && Number.isInteger(t.row)).map((t) => t.row))
  const laterRows = (n) => [...new Set(layout.filter((t) => !isTopicNode(t.unit_id) && partOf(t.unit_id) === n && Number.isInteger(t.row)).map((t) => t.row))].sort((a, b) => a - b)
  const laterCheckpoints = [...new Set(layout.map((t) => partOf(t.unit_id)))].filter((n) => n > 1).flatMap((n) => { const rs = laterRows(n); return rs.length ? [rs[Math.min(2, rs.length - 1)], rs.at(-1)] : [] })
  const checkpointRows = [...new Set([2, 3, 6, 8, part1Last, ...laterCheckpoints])].filter((r) => layout.some((t) => t.row === r && !isTopicNode(t.unit_id)))
  // Help circles (2026-11-10) don't gate anything, so a checkpoint neither reviews nor waits for them.
  const isHelpUnit = (unitId) => tables.units.find((u) => u.unit_id === unitId)?.is_topic_pick === 'help'
  const unitsUpTo = (row) => layout.filter((t) => t.row <= row && !isTopicNode(t.unit_id) && !isHelpUnit(t.unit_id)).map((t) => t.unit_id)
  // Catch-Up (A1 Complete 9): slots after a row (catch_up tab), each filled for this learner from the circles above it:
  // their mistakes, the words they missed, the words seen only once or twice. Open once its row is reached; never
  // locks anything; refills as misses come in. Exposure counts each word in what lessons and Catch-Ups showed.
  const exposure = (() => {
    const n = { ...catchupSeen }
    for (const byRound of Object.values(roundSeen.current)) for (const seen of Object.values(byRound ?? {})) {
      for (const [id, k] of Object.entries(seen.words ?? {})) n[id] = (n[id] ?? 0) + k
      for (const [sid, k] of Object.entries(seen.sentences ?? {})) for (const r of allContent.swBySentence.get(sid) ?? []) if (r.word_id) n[r.word_id] = (n[r.word_id] ?? 0) + k
    }
    return n
  })()
  const catchUpUnits = (row) => new Set([
    ...layout.filter((t) => t.row <= row && !isTopicNode(t.unit_id)).map((t) => t.unit_id),
    ...packs.filter((p) => onPath(p) && (rowOf(p.unit_id)?.row ?? Infinity) <= row).map((p) => p.unit_id),
  ])
  const catchUpFor = (row) => catchUpItems(allContent, { units: catchUpUnits(row), bank, wordMisses, exposure, met: seenWords.current, reachedOf: (u) => progressOf(u).round_reached })
  const catchUps = (tables.catch_up ?? []).filter((c) => layout.some((t) => t.row === c.after_row)).map((c) => {
    const items = catchUpFor(c.after_row)
    return { ...c, afterRow: c.after_row, available: layout.filter((t) => t.row === c.after_row).some((t) => isOpen(t.unit_id)),
      count: items.length, mistakes: items.filter((x) => x.kind === 'sentence' || x.missed).length }
  })
  const startCatchUp = (c) => { const items = catchUpFor(c.afterRow); if (items.length) begin(buildCatchUp(allContent, items, { settings: lessonModes(), slot_id: c.slot_id })) }
  // The final A1 check: four parts over every A1 unit's sentences, modeled on the course's A1 exam (finalcheck.js).
  const mainUnitIds = layout.filter((t) => !isTopicNode(t.unit_id)).map((t) => t.unit_id)
  const startFinal = () => begin(buildSession(allContent, 'final', finalItems(allContent, mainUnitIds), { settings: lessonModes() }))
  // Conversations (2026-11-10). Help phrases follow the help circles opened (1 to 3); scenes open once the second help
  // circle has had its first lessons. Claude gets the learner's words and the course's A1 words, as forms only.
  const helpIds = ['U31', 'U32', 'U33'].filter((id) => tables.units.some((u) => u.unit_id === id && String(u.status).startsWith('live')))
  const helpLevel = helpIds.filter((id) => isOpen(id)).length
  const sceneInfo = helpIds[1] ? { afterRow: rowOf(helpIds[1])?.row, available: progressOf(helpIds[1]).round_reached >= 1, scenes: (SCENES[course.id] ?? []).map((sc) => ({ ...sc, done: scenesDone[sc.id] ?? null })) } : null
  const a1Forms = [...new Set(tables.words.filter((w) => !packs.some((p) => p.unit_id === w.first_unit)).map((w) => w.form))]
  const startConversation = (mode, scene, settingsFor, back) => setConvo({ mode, scene, settings: settingsFor, back }) || setScreen('converse')
  const conversationEnded = (found, c) => {
    for (const w of found) seenWords.current.add(w.word_id)
    if (found.length) putKv('seen_words', [...seenWords.current])
    if (c.mode === 'scene') setScenesDone((m) => { const n = { ...m, [c.scene.id]: today() }; putKv('scenes_done', n); return n })
    markActive()
  }
  // The partner's defaults come from progress: the circle in hand, the learner's words, a gentler speed early on.
  const partnerDefaults = () => {
    const met = metWords().length
    return { topic: tables.units.find((u) => u.unit_id === currentUnit)?.title ?? 'free', vocabulary: met < 80 ? 'mine' : 'few', speed: met < 60 ? 'slow' : 'normal', corrections: 'end' }
  }
  const partnerTopics = tables.units.filter((u) => onPath(u) && isOpen(u.unit_id) && u.is_topic_pick !== 'node').sort((a, b) => a.order - b.order).map((u) => u.title)
  const finalInfo = { exam: EXAMS[course.id], available: mainUnitIds.length > 0 && mainUnitIds.every((u) => progressOf(u).round_reached >= 1), last: finalCheck }
  const startCheckpoint = (row) => {
    const ids = unitsUpTo(row).flatMap(itemsOf)
    const weakestFirst = weakest(ids, cards, 10)
    const rest = ids.filter((id) => !weakestFirst.includes(id)).sort(() => Math.random() - 0.5)
    const items = [...weakestFirst, ...rest].slice(0, 10).map((id) => { const u = allContent.sentenceById.get(id).unit_id; const reached = progressOf(u).round_reached; return { sentence_id: id, type: practiceType(reached), round: Math.min(reached + 1, 5), unit_id: u } })
    begin(buildSession(allContent, 'checkpoint', items, { settings: lessonModes(), row }))
  }

  // The part review: ten questions over the part's circles, likeliest-forgotten first. It never locks anything.
  const startPartReview = (n) => {
    const ids = partCircles(n).flatMap(itemsOf)
    const weakestFirst = weakest(ids, cards, 10)
    const rest = ids.filter((id) => !weakestFirst.includes(id)).sort(() => Math.random() - 0.5)
    const items = [...weakestFirst, ...rest].slice(0, 10).map((id) => { const u = allContent.sentenceById.get(id).unit_id; const reached = progressOf(u).round_reached; return { sentence_id: id, type: practiceType(reached), round: Math.min(reached + 1, 5), unit_id: u } })
    begin(buildSession(allContent, 'checkpoint', items, { settings: lessonModes(), row: `part${n}` }))
  }
  const markActive = () => setActiveDays((d) => { if (d.includes(today())) return d; const next = [...d, today()].slice(-400); putKv('active_days', next); return next })

  // Practice (Dan's test notes: Review and Practice weak skills are one button): the review bank's mistakes first,
  // topped up to ten with the items likeliest to be forgotten. Bank answers still count toward leaving the bank.
  const practiceIds = () => weakest(openUnits.flatMap(itemsOf), cards, 10)
  const startPracticeMix = () => {
    const review = bank.length ? buildReview(allContent, bank, { round: roundOf(currentUnit), settings: lessonModes(), today: today() }) : null
    const inReview = new Set(review?.queue.map((q) => q.sentence_id) ?? [])
    const room = 10 - (review?.queue.length ?? 0)
    const topUp = room > 0 ? practiceIds().filter((id) => !inReview.has(id)).slice(0, room) : []
    const extra = topUp.length ? buildSession(allContent, 'practice', topUp.map((id) => { const u = allContent.sentenceById.get(id).unit_id; const reached = progressOf(u).round_reached; return { sentence_id: id, type: practiceType(reached), round: Math.min(reached + 1, 5), unit_id: u } }), { settings: lessonModes() }) : null
    if (!review && !extra) return
    if (!review) { begin(extra); return }
    const queue = [...review.queue, ...(extra?.queue ?? [])]
    begin({ ...review, queue, size: queue.length, graded: queue.filter((q) => !q.speaking).length })
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
      attempt_id: uid(), lesson_id: session.id, sentence_id: q.sentence_id ?? q.item_id ?? q.word_ids.join(';'), type_id: q.type, variant_id: q.variant,
      round: q.round, skill: result.hidden ? 'listening' : q.skill, first_attempt: first, correct: q.speaking || q.ungraded ? null : result.correct, typo_accepted: Boolean(result.typo), graded: q.skill !== 'speaking' && !q.ungraded, swapped_from: q.swapped_from ?? null, test_skip: Boolean(result.testSkip), answered_at: new Date().toISOString(),
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
    // A1 task items (QT14 to QT17) have no card of their own; their sentences' words already do.
    if (first && !q.speaking && !q.item_id && !['placement', 'generated'].includes(session.kind)) {
      setCards((cs) => { const next = rate(cs, q.sentence_id ?? q.word_ids[0], result); putKv('fsrs_cards', next); return next })
    }
    if (first && !q.speaking && !q.item_id && !result.testSkip && session.kind !== 'placement') noteWordMisses(q, result)
    let next = session
    if (session.kind === 'placement' && first) next = { ...next, placement: [...(next.placement ?? []), { unit_id: q.unit_id, correct: result.correct }] }
    // The final check scores each part from first attempts (speaking counted as done, never graded).
    if (first && q.part) next = { ...next, results: [...(next.results ?? []), { part: q.part, correct: Boolean(result.correct), speaking: Boolean(q.speaking) }] }
    // Speaking is never graded: it earns a point when done (R14) and stays out of the score and the pass.
    if (q.speaking || q.ungraded) {
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
      const reask = session.kind === 'lesson' && first && !q.item_id
        ? reaskFor(contentFor(session), q, { cantListen: lessonModes().cantListen, missedWord: result.missedWord, known: seenWords.current }) : null
      if (reask) next = { ...next, queue: [...next.queue, reask] }
      // Round 1 misses stay out of the bank, and so do misses in a placement or an "I can" check (they test, they don't teach).
      if (q.round >= 2 && !q.item_id && !['placement', 'check', 'generated', 'final'].includes(session.kind)) addToBank(q.sentence_id ?? reask?.sentence_id, q.type)
    }
    if ((session.kind === 'review' || session.kind === 'catchup') && result.correct) {
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

  // Can't Listen Now / Can't Speak Now, tapped on a question: pause it for an hour (as in Settings) and swap this
  // question and the rest of the session's (Dan's test notes, as old Duolingo did).
  const cantNow = (kind) => {
    const until = Date.now() + 60 * 60 * 1000
    const patch = kind === 'listen' ? { cant_listen_until: until } : { cant_speak_until: until }
    changeSettings(patch)
    stop()
    const modes = { cantListen: kind === 'listen' || lessonModes().cantListen, cantSpeak: kind === 'speak' || lessonModes().cantSpeak }
    const next = swapRemaining(contentFor(session), session, modes)
    setSession(next)
    putKv('current_session', next)
  }

  // Which words an answer missed: the word in a match pair or picture, or, for an answer written in French, each word of
  // the sentence the answer left out. A choice between sentences can't say which word was the problem, so it marks none.
  const wordsOf = (text) => new Set(String(text).toLowerCase().normalize('NFC').split(/[^a-zà-ÿœæ]+/).filter(Boolean))
  const noteWordMisses = (q, result) => {
    const segs = (q.segments ?? []).filter((x) => x.word_id)
    let missed = []
    if (!result.correct) {
      if (result.missedWord) missed = [result.missedWord]
      else if (q.type === 'QT02') missed = q.word_ids ?? []
      else if (q.lang === 'fr' && q.type !== 'QT09' && typeof result.given === 'string') { // QT09's answer is another sentence
        const given = wordsOf(result.given)
        missed = segs.filter((x) => [...wordsOf(x.text)].some((w) => !given.has(w))).map((x) => x.word_id)
      }
    }
    const cleared = result.correct ? [...segs.map((x) => x.word_id), ...(q.word_ids ?? [])] : []
    if (!missed.length && !cleared.some((id) => wordMisses[id])) return
    setWordMisses((m) => {
      const n = { ...m }
      for (const id of cleared) delete n[id]
      for (const id of missed) n[id] = today()
      putKv('word_misses', n)
      return n
    })
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

  // A passed lesson's bookkeeping: what it showed, misses to carry, and the circle's progress. Shared by a real
  // lesson and the tree's test pass (Testing Shortcuts, 2026-11-10).
  const recordPass = (s) => {
    const unitSeen = roundSeen.current[s.unit_id] ?? {}
    const seen = unitSeen[s.round] ?? { sentences: {}, words: {} }
    for (const q of s.queue.slice(0, s.size)) {
      if (q.sentence_id || q.item_id) seen.sentences[q.sentence_id ?? q.item_id] = (seen.sentences[q.sentence_id ?? q.item_id] ?? 0) + 1
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
  }
  // Testing Shortcuts on the tree: the circle's next lesson, built as it would be and passed without being played. Its
  // questions count as seen and as answered right, marked as tests, so the circle moves on exactly as after a lesson.
  const testPass = (unitId) => {
    if (!isOpen(unitId) || progressOf(unitId).round_reached >= 5) return
    const round = roundOf(unitId)
    const s = buildLesson(unitContent(unitId), { round, unit_id: unitId, seen: roundSeen.current[unitId]?.[round] ?? {}, known: seenWords.current, settings: lessonModes() })
    const graded = s.queue.slice(0, s.size).filter((q) => !q.speaking && !q.ungraded).length
    for (const q of s.queue.slice(0, s.size)) {
      for (const seg of q.segments ?? []) if (seg.word_id) seenWords.current.add(seg.word_id)
      for (const id of q.word_ids ?? []) seenWords.current.add(id)
      const t = tally.current
      t[unitId] ??= {}; t[unitId][q.round] ??= {}; t[unitId][q.round][q.skill] = (t[unitId][q.round][q.skill] ?? 0) + 1
    }
    putKv('seen_words', [...seenWords.current]); putKv('skill_tally', tally.current)
    if (unitId !== currentUnit) { setCurrentUnit(unitId); putKv('current_unit', unitId) }
    put('lessons', { lesson_id: s.id, unit_id: unitId, round, score: graded, graded_count: graded, passed: true, test_skip: true, duration_ms: null, finished_at: new Date().toISOString() })
    recordPass({ ...s, firstCorrect: graded, graded, misses: [] })
    toast('info', `Passed for Testing: ${tables.units.find((u) => u.unit_id === unitId)?.title}, Round ${round}`)
  }
  // Dev: Jump Here (Testing Shortcuts, Dan 2026-11-11): every circle in the parts before part n counts as round 1
  // complete (its words as met), so part n opens, and the tree shows it with its first circle in hand. Circles
  // already past round 1 keep their progress. Written to the store as ordinary progress, so it stays.
  const jumpToPart = (n) => {
    const updates = {}
    const parts = tables.parts ?? [] // not partList: that is declared below the screens that return early (Developer)
    for (const x of parts.filter((p) => p.part < n)) {
      for (const u of partCircles(x.part)) {
        const p = progressOf(u)
        if (p.round_reached < 1) { updates[u] = { ...p, round_reached: 1, lessons_done: 0 }; put('unit_progress', updates[u]) }
        for (const id of unitContent(u).wordOrder) seenWords.current.add(id)
      }
    }
    putKv('seen_words', [...seenWords.current])
    setProgressByUnit((p) => ({ ...p, ...updates }))
    const first = layout.filter((t) => !isTopicNode(t.unit_id) && partOf(t.unit_id) === n).sort((a, b) => a.row - b.row || a.position - b.position)[0]?.unit_id
    if (first) { setCurrentUnit(first); putKv('current_unit', first) }
    setPartView(n); putKv('part_view', n)
    leaveDeveloper()
    const title = parts.find((p) => p.part === n)?.title
    toast('info', `Jumped for Testing: Part ${n}${title ? `, ${title}` : ''}`)
  }
  // A jump asked for on the Developer page for another language runs once that language has loaded (takeDevJump).
  useEffect(() => {
    if (!ready) return
    const n = takeDevJump()
    if (n) jumpToPart(n)
  }, [ready])
  const finish = (s) => {
    remove('kv', 'current_session')
    setSession(null)
    markActive()
    if (s.kind === 'catchup') {
      setCatchupSeen((m) => {
        const n = { ...m }
        for (const q of s.queue) for (const id of new Set([...(q.word_ids ?? []), ...(q.segments ?? []).map((x) => x.word_id).filter(Boolean)])) n[id] = (n[id] ?? 0) + 1
        putKv('catchup_seen', n)
        return n
      })
      setEnding({ line: `${s.firstCorrect} of ${s.graded ?? s.size} correct.`, back: 'home' })
      return
    }
    if (s.kind === 'review' || s.kind === 'practice' || s.kind === 'generated') {
      setEnding({ line: `${s.firstCorrect} of ${s.graded ?? s.size} correct.`, back: s.back ?? 'home' })
      return
    }
    if (s.kind === 'words') {
      setEnding({ line: s.firstCorrect ? 'All matched.' : 'All matched, with a slip or two.', back: 'words' })
      return
    }
    if (s.kind === 'checkpoint') {
      const mark = passMark(s.graded)
      const passed = s.firstCorrect >= mark
      if (passed && String(s.row).startsWith('part')) setPartReviews((m) => { const n = { ...m, [s.row.slice(4)]: today() }; putKv('part_reviews', n); return n })
      else if (passed) setCheckpoints((m) => { const n = { ...m, [s.row]: today() }; putKv('checkpoints', n); return n })
      setEnding({ line: `${s.firstCorrect} of ${s.graded}.${passed ? '' : ` Pass is ${mark}; try it again any time.`}` })
      return
    }
    if (s.kind === 'final') {
      const scores = finalScores(s.results)
      const record = { date: today(), scores }
      setFinalCheck(record); putKv('final_check', record)
      setEnding({ line: finalLine(scores), back: 'home' })
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
      const names = placed.map((u) => tables.units.find((x) => x.unit_id === u).title)
      setEnding({ line: placed.length ? `Placed through ${names.at(-1)}: round 1 of ${names.length === 1 ? names[0] : `${names.length} units`} counts as done.` : `Start with ${tables.units[0].title}.` })
      return
    }
    const mark = passMark(s.graded ?? s.size)
    const passed = s.firstCorrect >= mark
    put('lessons', { lesson_id: s.id, unit_id: s.unit_id, round: s.round, score: s.firstCorrect, graded_count: s.graded ?? s.size, passed, duration_ms: s.started_at ? Date.now() - s.started_at : null, finished_at: new Date().toISOString() })
    if (!passed) {
      setEnding({ line: `${s.firstCorrect} of ${s.graded ?? s.size}. Pass is ${mark}, so this lesson repeats in new question types.`, retry: s })
      return
    }
    recordPass(s)
    // A passed lesson goes straight back to home; its score shows there as one line that fades by itself (Dan, 2026-11-10).
    toast('success', `${s.firstCorrect} of ${s.graded ?? s.size}`)
    setScreen('home')
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
          <button onClick={afterEnding} className="btn-primary">{ending.retry ? 'Try Again' : 'Continue'}</button>
        </main>
      )
    }
    return (
      <Lesson key={session.id} session={session} content={contentFor(session)} settings={settings} seenWords={seenWords.current} cantListen={lessonModes().cantListen}
        onAnswer={onAnswer} onHint={onHint} onFlag={onFlag} onExit={leaveLesson} onCantNow={cantNow}
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
  // Points are never shown (Dan, 2026-11-10): they're still earned, counted and stored (points table) as before. The
  // streak and weekly goal are off home too (Dan, 2026-11-11); active days are still recorded.
  const showPoints = false

  // Screens that open in the right-hand panel on wide screens, and as full pages on a phone.
  const panelScreens = {
    words: () => {
    // The Glossary: every A1 word (main units, then the topics), each Learned, Missed, Fading or Not Yet.
    const a1 = [...tables.units].filter((u) => u.cefr === 'A1' && String(u.status).startsWith('live') && u.is_topic_pick !== 'node').sort((a, b) => a.order - b.order)
    const inA1 = new Set(a1.map((u) => u.unit_id))
    const statusOf = (id) => {
      if (!seenWords.current.has(id)) return 'new'
      if (wordMisses[id]) return 'missed'
      const r = recallOf(id)
      return r !== null && r < 0.8 ? 'fading' : 'learned'
    }
    return <Glossary words={tables.words.filter((w) => inA1.has(w.first_unit))} groups={a1.map((u) => ({ unit_id: u.unit_id, title: u.is_topic_pick === 'yes' ? `${u.title} (Topic)` : u.title }))}
      statusOf={statusOf} examplesOf={examplesOf} tableOf={tableOf} onMatch={startMatch} onFlashcards={startFlashcards} onBack={() => setScreen('home')} />
  },
    verbs: () => {
    const lemmas = new Set(metWords().filter((w) => w.part_of_speech === 'Verb').map((w) => w.lemma))
    return <Verbs tables={tables.conjugations.filter((t) => lemmas.has(t.lemma))} strict={settings.answer_strictness === 'strict'} onBack={() => setScreen('home')} />
  },
    progress: () => {
    // A1 coverage (A1 Complete, section 6): list words met (a course word counts for its lemma), tasks whose circles
    // have finished round 1, and the part.
    const list = tables.a1_list?.[0]
    const fold = (x) => String(x).toLowerCase().trim()
    const listKeys = new Set((list?.words ?? []).map(fold))
    const keysOf = (w) => [fold(w.lemma || w.form), fold(w.form)]
    const metKeys = new Set(metWords().flatMap(keysOf).filter((k) => listKeys.has(k)))
    const courseKeys = new Set(tables.words.flatMap(keysOf).filter((k) => listKeys.has(k)))
    const taskDone = new Set(tables.units.filter((u) => u.tasks && progressOf(u.unit_id).round_reached >= 1).flatMap((u) => String(u.tasks).split(';')))
    const coverage = list ? { met: metKeys.size, course: courseKeys.size, total: listKeys.size, source: list.source.split(',')[0], tasks: (tables.a1_tasks ?? []).map((t) => ({ ...t, done: taskDone.has(t.task_id) })), part: partOf(currentUnit), parts: Math.max(1, ...(tables.parts ?? []).map((x) => x.part)) } : null
    return <Progress coverage={coverage} finalCheck={finalInfo} scores={scores} units={a1Units} canDo={tables.can_do} checked={canDoChecked} isOpen={isOpen} progressOf={progressOf}
      onCheck={startCheck} onBack={() => setScreen('home')} />
  },
    make: () => {
    const graded = ['reading', 'listening', 'writing']
    const canWeak = weakest(openUnits.flatMap(itemsOf), cards, 1).length > 0
    const weakSkill = canWeak ? graded.reduce((lo, s) => (scores[s].score < scores[lo].score ? s : lo), graded[0]) : null
    return <Make weakSkill={weakSkill ? weakSkill[0].toUpperCase() + weakSkill.slice(1) : null} weekCount={weekIds.length} metCount={metWords().length} listMatch={listMatch}
      onWeak={() => startWeakSkill(weakSkill)} onWeek={startWeek} onList={(words) => startFlashcards(false, words, 'make')}
      onSentences={startGenerated} onListening={startListening} status={makeStatus} onBack={() => setScreen('home')}
      partner={{ defaults: partnerDefaults(), topics: partnerTopics, metCount: metWords().length }}
      onPartner={(f) => startConversation('partner', f.topic === 'free'
        ? { id: 'partner', title: 'Conversation', setting: 'A friendly, free conversation about everyday things.', ai: 'a friendly conversation partner', learner: 'a learner' }
        : { id: 'partner', title: f.topic, setting: `A friendly conversation about ${f.topic.toLowerCase()}, using that topic's words.`, ai: 'a friendly conversation partner', learner: 'a learner' }, f, 'make')} />
  },
  }
  if (panelScreens[screen] && !wide) return panelScreens[screen]()
  if (screen === 'converse' && convo) {
    return <Conversation key={convo.scene.id + convo.mode} mode={convo.mode} scene={convo.scene} settings={convo.settings} known={metWords().map((w) => w.form)} pool={a1Forms}
      names={courseNames.slice(0, 8)} helpLevel={helpLevel} words={tables.words} metIds={new Set(seenWords.current)} cantSpeak={paused(settings.cant_speak_until)}
      onEnd={(found) => conversationEnded(found, convo)} onReview={(found) => { const back = convo.back; setConvo(null); startFlashcards(false, found, back) }}
      onBack={() => { const back = convo.back; setConvo(null); setScreen(back) }} />
  }
  if (screen === 'flashcards' && flash) return <Flashcards cards={flash.cards} aloud={flash.aloud} onGrade={gradeCard} onDone={() => { markActive(); const back = flash.back ?? 'words'; setFlash(null); setScreen(back) }} />
  if (screen === 'variants') {
    return <VariantBank types={tables.question_types.filter((t) => tables.variants.some((v) => v.type_id === t.type_id))} variants={tables.variants.map((v) => ({ ...v }))}
      onChange={changeVariant} onBack={() => setScreen('developer')} />
  }
  if (screen === 'settings') {
    return <Settings settings={settings} onChange={changeSettings} onBack={() => setScreen('home')} onAbout={() => setScreen('about')} onPlacement={startPlacement}
      onProfile={() => setScreen('profile')} />
  }
  if (screen === 'developer') {
    // Course Snapshot: exact numbers for both courses, worked out from the content each ships (src/lib/snapshot.js).
    const snapshot = { built: new Date(__BUILD_TIME__).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' }), workbooks: __WORKBOOKS__ }
    return <Developer settings={settings} onChange={changeSettings} snapshot={snapshot} onBack={leaveDeveloper} onJumpPart={jumpToPart}
      onTryA1={() => {
        // The four A1 task types on samples (Developer only): a practice session, kept out of scores and review.
        const sm = A1_SAMPLES[course.id]
        const queue = ['QT14', 'QT15', 'QT17', 'QT16'].map((t) => makeA1Question(t, sm[t], 4, { cantListen: lessonModes().cantListen }))
        const s = { id: `A${Date.now()}`, kind: 'generated', back: 'developer', started_at: Date.now(), queue, size: queue.length, graded: queue.filter((q) => !q.ungraded).length, index: 0, firstCorrect: 0, firstWrong: 0, misses: [], generated: { sentences: [], sentence_words: [] } }
        generated.current.set(s.id, allContent)
        begin(s)
      }}
      onVariants={() => setScreen('variants')} onFlags={() => setScreen('flags')} onNativeCheck={() => setScreen('native')} onForum={() => setScreen('forum')} />
  }
  if (screen === 'profile') return <Profile profile={profile} onChange={(p) => { const n = { ...profile, ...p }; setProfile(n); putKv('profile', n) }} onBack={() => setScreen('settings')} />
  if (screen === 'native') {
    const order = new Map(tables.units.map((u) => [u.unit_id, u]))
    const list = tables.sentences.filter((s) => s.source === 'tamago_original')
      .map((s) => ({ ...s, unit_title: `${order.get(s.unit_id).is_topic_pick === 'yes' ? 'Topic' : 'Unit ' + order.get(s.unit_id).order}: ${order.get(s.unit_id).title}` }))
      .sort((x, y) => order.get(x.unit_id).order - order.get(y.unit_id).order || x.sentence_id.localeCompare(y.sentence_id))
    return <NativeCheck sentences={list} results={nativeResults} onChange={(n) => { setNativeResults(n); putKv('native_check', n) }} onBack={() => setScreen('developer')} />
  }
  if (screen === 'flags') {
    return <FlagReview reasons={tables.flag_reasons} onBack={() => setScreen('developer')} onAccept={(row) => {
      addAccepted([row])
      getKv('approved_answers').then((list) => putKv('approved_answers', [...(list ?? []), row]))
    }} />
  }
  if (screen === 'forum') return <Forum onBack={() => setScreen('developer')} />
  if (screen === 'listening' && passage) return <Listening passage={passage} onDone={() => { markActive(); setPassage(null); setScreen('make') }} onBack={() => { setPassage(null); setScreen('make') }} />
  if (screen === 'about') return <About content={allContent} onBack={() => setScreen('settings')} />
  if (screen === 'note' && note) {
    const unit = tables.units.find((u) => u.unit_id === note.unitId)
    const newWords = tables.words.filter((w) => w.first_unit === note.unitId)
    return <GrammarNote unit={unit} note={noteFor(note.unitId)} sentenceById={allContent.sentenceById} doneLabel={note.thenStart ? 'Start Lesson' : 'Done'}
      intro={note.thenStart} wordCount={newWords.length} sampleWords={newWords.slice(0, 4).map((w) => w.form)}
      onDone={() => closeNote(note.thenStart)} onBack={() => closeNote(false)} />
  }
  // A circle's ring (Circle Lab, 2026-11-10): lessons done out of the lessons planned across its five rounds, so it
  // fills the same however many lessons a circle has. A round that runs long never pushes the fill past its share, and
  // the fill never goes back.
  const circleOf = (unitId) => {
    // Counted at build time (units.lesson_counts): simulating lessons here froze startup for seconds.
    const unit = tables.units.find((u) => u.unit_id === unitId)
    const counts = (unit?.lesson_counts ?? [1, 1, 1, 1, 1]).map((n) => Math.max(1, n))
    const total = counts.reduce((a, b) => a + b, 0)
    const p = progressOf(unitId)
    if (p.round_reached >= 5) return { done: total, total }
    const before = counts.slice(0, p.round_reached).reduce((a, b) => a + b, 0)
    return { done: before + Math.min(p.lessons_done, counts[p.round_reached] - 1), total }
  }
  // "Start Here": on the first circle only, before any lesson anywhere.
  const firstUnit = layout[0]?.unit_id
  const startedElsewhere = Object.values(progressByUnit).some((p) => p.unit_id !== firstUnit && (p.lessons_done > 0 || p.round_reached > 0))
  const firstMarker = (unitId) => (unitId === firstUnit && !startedElsewhere ? firstCircleMarker(circleOf(unitId).done) : null)
  // Each row carries its row number (.row): a course can skip one (Spanish has no row 4 until its topic node exists).
  // The tree shows one part at a time: the part chosen in the switcher, else the part of the circle in hand.
  const partList = [...(tables.parts ?? [])].sort((a, b) => a.part - b.part)
  const lastPart = Math.max(1, ...partList.map((x) => x.part))
  const builtParts = partList.filter((x) => partCircles(x.part).length > 0 && partUnlocked(x.part)).map((x) => x.part)
  const shownPart = builtParts.includes(partView) ? partView : builtParts.includes(partOf(currentUnit)) ? partOf(currentUnit) : (builtParts.at(-1) ?? 1)
  const shownLayout = layout.filter((t) => partOf(t.unit_id) === shownPart)
  const nextPart = partList.find((x) => x.part === shownPart + 1)
  const partInfo = partList.length ? {
    n: shownPart, total: lastPart, title: partList.find((x) => x.part === shownPart)?.title ?? '',
    switcher: builtParts.map((n) => ({ n, title: partList.find((x) => x.part === n)?.title ?? '' })),
    review: shownPart < lastPart ? { available: partDone(shownPart), done: partReviews[shownPart] ?? null, units: partCircles(shownPart).map((u) => tables.units.find((x) => x.unit_id === u).title) } : null,
    next: nextPart ? { n: nextPart.part, title: nextPart.title, summary: nextPart.summary, unlocked: partUnlocked(nextPart.part), built: partCircles(nextPart.part).length > 0 } : null,
    // Every part, finished and current included, for the carousel at the end of the part (Dan, 2026-11-11). It opens on
    // the part after this one (this one when it's the last); the left arrow steps back through earlier parts.
    cards: partList.map((x) => ({ n: x.part, title: x.title, summary: x.summary, unlocked: partUnlocked(x.part), built: partCircles(x.part).length > 0 })),
    start: Math.max(0, partList.findIndex((x) => x.part > shownPart) === -1 ? partList.findIndex((x) => x.part === shownPart) : partList.findIndex((x) => x.part > shownPart)),
  } : null
  const rows = [...new Set(shownLayout.map((t) => t.row))].sort((a, b) => a - b).map((r) => Object.assign(shownLayout.filter((t) => t.row === r).sort((a, b) => a.position - b.position).map((t) => {
    // The Your topic node stands for the chosen pack once there is one; it keeps the node's place number.
    const node = tables.units.find((u) => u.unit_id === t.unit_id)
    const id = node.is_topic_pick === 'node' ? topicChoice[node.unit_id] ?? node.unit_id : node.unit_id
    const unit = id === node.unit_id ? node : { ...tables.units.find((u) => u.unit_id === id), order: node.order, icon_group: node.icon_group, icon_file: node.icon_file } // keeps the node's dish
    const progress = progressOf(id)
    const open = isOpen(id)
    const choosing = node.is_topic_pick === 'node' && id === node.unit_id
    const lessons = open && !choosing ? Math.max(unit.lesson_counts?.[roundOf(id) - 1] ?? lessonsInRound(unitContent(id), roundOf(id)), progress.lessons_done + 1) : 0
    return { unit, progress, open, current: id === currentUnit, lesson: progress.lessons_done + 1, lessons, strength: strength(itemsOf(id), cards), lockedBy: open ? null : lockedByOf(id),
      circle: choosing ? { done: 0, total: 1 } : circleOf(id), marker: choosing ? null : firstMarker(id),
      topic: node.is_topic_pick === 'node' ? { choosing, packs: packsAt(node.unit_id).map((p) => ({ unit_id: p.unit_id, title: p.title, started: progressOf(p.unit_id).lessons_done > 0 })) } : null }
  }), { row: r }))
  const curUnit = tables.units.find((u) => u.unit_id === currentUnit)
  // Levels: markers across the tree where finishing the units above would reach the next band (score.js: 10 and 20 of
  // 29). Going down the path only, never at the top (Dan, 2026-11-11: no "Very Early A1" line over the first circle).
  const mainA1 = layout.filter((t) => !isTopicNode(t.unit_id))
  const started = mainA1.some((t) => progressOf(t.unit_id).round_reached >= 1) || packs.some((p) => progressOf(p.unit_id).round_reached >= 1)
  const rowNumbers = [...new Set(layout.map((t) => t.row))].sort((p, q) => p - q)
  // The row after a given one (rows can be 1.5 for a help circle); one past the last when it's the last.
  const rowAfter = (r) => rowNumbers[rowNumbers.indexOf(r) + 1] ?? r + 1
  const rowReaching = (share) => rowNumbers.find((r) => mainA1.filter((t) => t.row <= r).length / mainA1.length >= share)
  const markers = started ? [
    { beforeRow: rowAfter(rowReaching(10 / 29)), label: 'Early A1' },
    { beforeRow: rowAfter(rowReaching(20 / 29)), label: 'High A1' },
    // A2 begins after the last part only.
    ...(shownPart === lastPart ? [{ beforeRow: rowNumbers.at(-1) + 1, label: 'A2' }] : []),
  ] : []
  return (
    <Home rows={rows} markers={markers.filter((m) => rows.some((r) => r.row === m.beforeRow) || m.label === 'A2')} pointsToday={pointsToday} pointsTotal={pointsTotal} showPoints={showPoints}
      tools={[
        { id: 'glossary', screen: 'words', label: 'Glossary', about: 'See which words are sticking', onOpen: () => setScreen('words') },
        { id: 'verbs', screen: 'verbs', label: 'Verbs', about: 'Get every present-tense form right', onOpen: () => setScreen('verbs') },
        { id: 'study', screen: 'make', label: 'Self-Study', about: 'Extra reps with tough areas', onOpen: openMakeScreen },
        { id: 'progress', screen: 'progress', label: 'Progress', about: 'Track your CEFR level in all four skills', onOpen: () => setScreen('progress') },
        ...(settings.developer !== 'off' ? [{ id: 'developer', screen: 'developer', label: 'Developer', about: 'Testing controls, not part of the course', quiet: true, onOpen: () => setScreen('developer') }] : []),
      ]}
      wide={wide} panel={wide && panelScreens[screen] ? panelScreens[screen]() : null}
      checkpoints={checkpointRows.map((row) => ({ afterRow: row, units: unitsUpTo(row).map((u) => tables.units.find((x) => x.unit_id === u).title), available: unitsUpTo(row).every((u) => progressOf(u).round_reached >= 1), done: checkpoints[row] ?? null, skipped: checkpointsSkipped[row] ?? null }))}
      catchUps={catchUps.filter((c) => rows.some((r) => r.row === c.afterRow))} onCatchUp={startCatchUp}
      onCheckpoint={startCheckpoint} finalCheck={shownPart === lastPart ? finalInfo : null} onFinal={startFinal}
      part={partInfo} onPartView={(n) => { setPartView(n); putKv('part_view', n) }} onPartReview={() => startPartReview(shownPart)}
      onJumpPart={settings.test_shortcuts === 'on' ? jumpToPart : null}
      onTestPass={settings.test_shortcuts === 'on' ? testPass : null}
      scenes={sceneInfo} onScene={(sc) => startConversation('scene', sc, { speed: 'normal', corrections: 'end', vocabulary: 'few' }, 'home')}
      onSkipCheckpoint={(row) => setCheckpointsSkipped((m) => { const n = { ...m, [row]: today() }; putKv('checkpoints_skipped', n); return n })}
      practice={{ mistakes: bank.length, ready: bank.length > 0 || practiceIds().length > 0 }} onPractice={startPracticeMix}
      nextLabel={`Next Lesson: ${curUnit?.title ?? ''}`}
      onNext={() => (session ? startLesson() : startUnit(currentUnit))}
      inProgress={Boolean(session)} lastLine={lastLine} onLastLineGone={() => setLastLine(null)}
      onStartUnit={(id) => { if (session && id !== currentUnit) { remove('kv', 'current_session'); setSession(null) } startUnit(id) }}
      onGrammarNote={(id) => { setNote({ unitId: id, thenStart: false }); setScreen('note') }} hasNote={(id) => Boolean(noteFor(id))}
      onChooseTopic={(id) => { const at = nodeOfPack(id); setTopicChoice((c) => ({ ...c, [at]: id })); putKv(topicKey(at), id); if (session && id !== currentUnit) { remove('kv', 'current_session'); setSession(null) } startUnit(id) }}
      onSettings={() => setScreen('settings')} />
  )
  }

  return (
    <>
      {view()}
      <div className="turn-note" role="alert">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M2 14a8 8 0 0 0 8 8M22 10A8 8 0 0 0 14 2" /></svg>
        <p className="text-xl font-semibold">Turn your iPad sideways</p>
        <p className="text-muted">Tamago on iPad works in landscape.</p>
      </div>
      {splash && <Splash onDone={() => setSplash(false)} choose={chooser} />}
    </>
  )
}
