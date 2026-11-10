import { useEffect, useState } from 'react'
import { generateReady } from '../lib/generate.js'
import { converseReady } from '../lib/converse.js'
import NeedsSetup from './NeedsSetup.jsx'
import { IconBack } from './icons.jsx'
import { COURSES, TL, chooseCourse, course } from '../lib/course.js'

// Learner-guided practice (Phase 5): the learner asks, Tamago builds it in its own question shapes.
// Lesson on a weak point, a test on this week's sentences and flashcards from a list need nothing outside the app.
// New sentences and listening are written by Claude from the learner's words and checked against them.
function Block({ title, text, children }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-semibold">{title}</h2>
      {text && <p className="-mt-1 text-sm text-muted">{text}</p>}
      {children}
    </section>
  )
}

// A filter: a labelled row of choices, like a segmented control.
function Choice({ label, value, options, onChange }) {
  return (
    <fieldset className="flex flex-col gap-1">
      <legend className="mb-1 text-sm text-muted">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map(([v, text]) => (
          <button key={v} type="button" onClick={() => onChange(v)} aria-pressed={value === v}
            className={`rounded-full border-2 px-3 py-1 text-sm ${value === v ? 'border-orange bg-orange text-white' : 'border-line bg-surface'}`}>{text}</button>
        ))}
      </div>
    </fieldset>
  )
}

// The conversation partner (Dan, 2026-11-10): not tied to a circle. Filters the learner can change, with defaults
// from their progress.
function Partner({ partner, onStart }) {
  const [f, setF] = useState(partner.defaults)
  const set = (k) => (v) => setF((x) => ({ ...x, [k]: v }))
  const enough = partner.metCount >= 10
  return (
    <Block title="Conversation Partner" text={enough ? `Talk with Claude in ${course.name}, spoken or typed. Never graded; new words go to your Glossary.` : 'Meet 10 words first.'}>
      <label className="flex flex-col gap-1">
        <span className="text-sm text-muted">Language</span>
        <select value={course.id} onChange={(e) => chooseCourse(e.target.value)} className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base">
          {COURSES.filter((c) => c.ready).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm text-muted">Topic</span>
        <select value={f.topic} onChange={(e) => set('topic')(e.target.value)} className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base">
          <option value="free">Free conversation</option>
          {partner.topics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>
      <Choice label="Vocabulary" value={f.vocabulary} onChange={set('vocabulary')} options={[['mine', 'My Words Only'], ['few', 'My Words Plus a Few New']]} />
      <Choice label="Speed" value={f.speed} onChange={set('speed')} options={[['slow', 'Slow'], ['normal', 'Normal'], ['natural', 'Natural']]} />
      <Choice label="Corrections" value={f.corrections} onChange={set('corrections')} options={[['each', 'Each Turn'], ['end', 'At the End'], ['off', 'Off']]} />
      <button onClick={() => onStart(f)} disabled={!enough} className="btn-secondary">Start a Conversation</button>
    </Block>
  )
}

export default function Make({ weakSkill, weekCount, metCount, listMatch, onWeak, onWeek, onList, onSentences, onListening, status, onBack, partner, onPartner }) {
  const [list, setList] = useState('')
  const [focus, setFocus] = useState('')
  const [ready, setReady] = useState(null)
  const [talkReady, setTalkReady] = useState(null)
  useEffect(() => { generateReady().then(setReady); converseReady().then(setTalkReady) }, [])
  const match = list.trim() ? listMatch(list) : null
  const enough = metCount >= 20
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Self-Study</h1>
      </header>

      <Block title="Your Weakest Skill" text={weakSkill ? `Ten questions in ${weakSkill.toLowerCase()}, on the sentences you know least well.` : 'Answer a few questions first.'}>
        <button onClick={onWeak} disabled={!weakSkill} className="btn-secondary">Practise {weakSkill ? weakSkill.toLowerCase() : ''}</button>
      </Block>

      <Block title="This Week" text={weekCount ? `A test on the ${weekCount} sentences you've met since Monday.` : 'Nothing met since Monday yet.'}>
        <button onClick={onWeek} disabled={!weekCount} className="btn-secondary">Test This Week</button>
      </Block>

      <Block title="Flashcards from Your List" text={`Paste ${course.name} words or text. Words Tamago knows become flashcards, with their meanings from Wiktionary.`}>
        <textarea aria-label={`${course.name} words or text`} value={list} onChange={(e) => setList(e.target.value)} rows={3} lang={TL} placeholder={course.sample}
          className="rounded-xl border-2 border-field bg-surface px-3 py-2 text-base" />
        {match && <p className="text-sm text-muted">{match.words.length} found{match.missing.length ? ` · not in Tamago yet: ${match.missing.join(', ')}` : ''}</p>}
        <button onClick={() => onList(match.words)} disabled={!match?.words.length} className="btn-secondary">Make flashcards</button>
      </Block>

      {ready === false && (
        <NeedsSetup title="Written by Claude">New practice sentences and short listening exchanges, written from the words you've met. Needs an API key.</NeedsSetup>
      )}
      {ready && (
        <Block title="Written by Claude" text={enough ? 'From the words you\'ve met, checked against them; any line with another word is dropped. Not checked by a native speaker.' : 'Meet 20 words first.'}>
          <input aria-label="Topic for the practice (optional)" value={focus} onChange={(e) => setFocus(e.target.value)} maxLength={80} placeholder="About… (optional)"
            className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base" />
          <div className="flex gap-2">
            <button onClick={() => onSentences(focus)} disabled={!enough || Boolean(status)} className="btn-secondary flex-1">New sentences</button>
            <button onClick={() => onListening(focus)} disabled={!enough || Boolean(status)} className="btn-secondary flex-1">Listening</button>
          </div>
          {status && <p role="status" className="text-sm text-muted">{status}</p>}
        </Block>
      )}
      {talkReady === false && <NeedsSetup title="Conversation Partner">A short spoken or typed exchange with Claude in {course.name}, kept to the words you know. Needs the API key.</NeedsSetup>}
      {talkReady && partner && <Partner partner={partner} onStart={onPartner} />}
    </main>
  )
}
