// Voice Lab (Dan, 2026-11-14): every voice a learner can hear, tagged Female or Male by ear, so Answer the Question's
// picture follows the voice. Device voices are tagged by name (the same name is the same voice on every device that
// has it); recorded people by name, so all their files follow (Lingua Libre speakers, and native checkers or hired
// recorders as they arrive). Tags save to src/lib/voice-genders.json through the dev server. Runs only on the dev
// server at /voice-lab.html; it is not a build entry, so it never deploys. Being a lab, it plays voices directly
// rather than through audio.js, since it has to pick a voice the app wouldn't.
import { StrictMode, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { COURSES } from './lib/course.js'
import './index.css'

const TABLES = {
  fr: { words: () => import('./content/words.json'), sentences: () => import('./content/sentences.json'), qa: () => import('./content/qa_answers.json') },
  es: { words: () => import('./content-es/words.json'), sentences: () => import('./content-es/sentences.json'), qa: () => import('./content-es/qa_answers.json') },
  de: { words: () => import('./content-de/words.json'), sentences: () => import('./content-de/sentences.json'), qa: () => import('./content-de/qa_answers.json') },
}
const TAGS = [['female', 'Female'], ['male', 'Male'], ['unsure', 'Unsure']]
const tagOf = (v) => v.lang?.replace('_', '-')
const matches = (v, want) => (want.includes('-') ? tagOf(v) === want : tagOf(v)?.toLowerCase().startsWith(want))
// The voice the app picks for a course: the same rule as audio.js (local before remote, in the course's order).
function appVoice(voices, course) {
  for (const want of course.voice) {
    const v = voices.find((x) => matches(x, want) && x.localService) ?? voices.find((x) => matches(x, want))
    if (v) return v
  }
  return null
}

function useVoices() {
  const [voices, setVoices] = useState(() => window.speechSynthesis?.getVoices() ?? [])
  useEffect(() => {
    const load = () => setVoices(speechSynthesis.getVoices())
    speechSynthesis.addEventListener?.('voiceschanged', load)
    const t = setInterval(load, 1000) // Safari may never fire voiceschanged
    return () => { speechSynthesis.removeEventListener?.('voiceschanged', load); clearInterval(t) }
  }, [])
  return voices
}

function TagButtons({ value, onTag }) {
  return (
    <div className="flex gap-1.5">
      {TAGS.map(([k, label]) => (
        <button key={k} onClick={() => onTag(value === k ? null : k)} aria-pressed={value === k}
          className={`rounded-lg border-2 px-3 py-1.5 text-sm ${value === k ? (k === 'female' ? 'border-orange bg-orange text-white' : k === 'male' ? 'border-green bg-green text-white' : 'border-ink bg-ink text-bg') : 'border-line bg-surface'}`}>{label}</button>
      ))}
    </div>
  )
}

function Row({ title, note, onPlay, value, onTag, child, onChild }) {
  return (
    <li className="flex flex-wrap items-center gap-3 rounded-xl border-2 border-line bg-surface px-4 py-3">
      <button onClick={onPlay} aria-label={`Play ${title}`} className="icon-btn shrink-0 border-2 border-line">▶</button>
      <div className="min-w-0 flex-1">
        <p className="font-semibold break-words">{title}</p>
        {note && <p className="text-sm text-muted">{note}</p>}
      </div>
      <TagButtons value={value} onTag={onTag} />
      <label className="flex items-center gap-1.5 text-sm"><input type="checkbox" checked={child} onChange={(e) => onChild(e.target.checked)} className="size-4" />Child</label>
    </li>
  )
}

function CourseSection({ course, voices, tags, onTag, player }) {
  const [data, setData] = useState(null)
  useEffect(() => {
    const t = TABLES[course.id]
    Promise.all([t.words(), t.sentences(), t.qa()]).then(([w, s, qa]) => setData({ words: w.default, sentences: s.default, qa: qa.default }))
  }, [course.id])
  const samples = useMemo(() => {
    if (!data) return []
    const byId = new Map(data.sentences.map((s) => [s.sentence_id, s]))
    return [...new Set(data.qa.map((r) => r.question_sentence_id))].map((id) => byId.get(id)?.french).filter(Boolean)
  }, [data])
  const speakers = useMemo(() => {
    if (!data) return []
    const by = new Map()
    const add = (name, file, text) => { if (!name || !file) return; const x = by.get(name) ?? { name, files: [] }; x.files.push({ file, text }); by.set(name, x) }
    for (const s of data.sentences) {
      if (s.native_recording?.audio_file) add(s.native_recording.speaker, s.native_recording.audio_file, s.french)
      else if (s.lingua_libre?.audio_file) add(s.lingua_libre.speaker, s.lingua_libre.audio_file, s.french)
    }
    for (const w of data.words) if (w.lingua_libre?.audio_file) add(w.lingua_libre.speaker, w.lingua_libre.audio_file, w.form)
    return [...by.values()].sort((a, b) => b.files.length - a.files.length)
  }, [data])
  const used = appVoice(voices, course)
  // The one the app uses here first, then the rest by name.
  const mine = voices.filter((v) => course.voice.some((want) => matches(v, want.split('-')[0]))).sort((a, b) => (b.voiceURI === used?.voiceURI) - (a.voiceURI === used?.voiceURI) || a.name.localeCompare(b.name))
  const turn = useRef(0)
  const say = (v) => {
    const text = samples[turn.current++ % Math.max(1, samples.length)] ?? course.sample
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.voice = v; u.lang = v.lang
    speechSynthesis.speak(u)
  }
  const done = (keys) => keys.filter((k) => tags[k] === 'female' || tags[k] === 'male').length

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">{course.name}</h2>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Device Voices <span className="font-normal text-muted">({done(mine.map((v) => `voice:${v.name}`))} of {mine.length} tagged on this browser)</span></h3>
        <p className="text-sm text-muted">The voices this browser has. Every Answer the Question line is spoken by one of these today. Play plays a different question each time.</p>
        {mine.length === 0 && <p className="text-sm text-muted">No {course.name} voice on this browser.</p>}
        <ul className="flex flex-col gap-2">
          {mine.map((v) => (
            <Row key={v.voiceURI} title={v.name} value={tags[`voice:${v.name}`] ?? null} onTag={(g) => onTag(`voice:${v.name}`, g)} child={tags[`child:voice:${v.name}`] === true} onChild={(on) => onTag(`child:voice:${v.name}`, on || null)} onPlay={() => say(v)}
              note={[v.lang, v.localService ? 'on the device' : 'online', used?.voiceURI === v.voiceURI ? 'the app uses this one here' : ''].filter(Boolean).join(' · ')} />
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Recorded People <span className="font-normal text-muted">({done(speakers.map((s) => `speaker:${s.name}`))} of {speakers.length} tagged)</span></h3>
        <p className="text-sm text-muted">Everyone whose recordings ship, by name. A tag covers all their files. Play goes through their files in turn.</p>
        <ul className="flex flex-col gap-2">
          {speakers.map((s) => (
            <Row key={s.name} title={s.name} value={tags[`speaker:${s.name}`] ?? null} onTag={(g) => onTag(`speaker:${s.name}`, g)} child={tags[`child:speaker:${s.name}`] === true} onChild={(on) => onTag(`child:speaker:${s.name}`, on || null)}
              note={`${s.files.length} ${s.files.length === 1 ? 'recording' : 'recordings'} · ${s.files.slice(0, 4).map((f) => f.text).join(', ')}${s.files.length > 4 ? '…' : ''}`}
              onPlay={() => player(s)} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function VoiceLab() {
  const voices = useVoices()
  const [tags, setTags] = useState({})
  const [status, setStatus] = useState('')
  useEffect(() => { fetch('/__voice-genders').then((r) => r.json()).then(setTags).catch(() => setStatus('Could not read the saved tags.')) }, [])
  const onTag = (key, gender) => {
    const next = { ...tags }
    if (gender) next[key] = gender; else delete next[key]
    setTags(next)
    fetch('/__voice-genders', { method: 'POST', body: JSON.stringify(next) })
      .then((r) => r.json()).then((r) => setStatus(`Saved: ${r.saved} tags`)).catch(() => setStatus('Not saved: is the dev server running?'))
  }
  const audio = useRef(null)
  const turns = useRef({})
  const player = (s) => {
    const i = (turns.current[s.name] = ((turns.current[s.name] ?? -1) + 1) % s.files.length)
    audio.current ??= new Audio()
    audio.current.src = s.files[i].file
    audio.current.play()
  }
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Voice Lab</h1>
        <p className="text-muted">Tag each voice by ear. Answer the Question shows a woman for a Female voice and a man for a Male one, the girl or the boy when Child is ticked; Unsure and untagged pick any adult. Tags save as you go to src/lib/voice-genders.json.</p>
        <p role="status" className="min-h-5 text-sm text-muted">{status}</p>
      </header>
      {COURSES.filter((c) => c.ready).map((c) => <CourseSection key={c.id} course={c} voices={voices} tags={tags} onTag={onTag} player={player} />)}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><VoiceLab /></StrictMode>)
