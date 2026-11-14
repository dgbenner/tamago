import { useEffect, useState } from 'react'
import { converseReady } from '../lib/converse.js'
import NeedsSetup from './NeedsSetup.jsx'
import { IconBack } from './icons.jsx'
import { COURSES, chooseCourse, course } from '../lib/course.js'
import { Block } from './Make.jsx'

// Conversations, a tool of its own (Dan, 2026-11-13; it was the last block of Self-Study): the conversation partner,
// open to any learner whatever their place on the tree, once the API key is set and 10 words are met. The three set
// scenes stay on the tree, after the second help circle.
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


export default function Conversations({ partner, onPartner, onBack }) {
  const [talkReady, setTalkReady] = useState(null)
  useEffect(() => { converseReady().then(setTalkReady) }, [])
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Conversations</h1>
      </header>
      {talkReady === false && <NeedsSetup title="Conversation Partner">A short spoken or typed exchange with Claude in {course.name}, kept to the words you know. Needs the API key.</NeedsSetup>}
      {talkReady === null && <p className="text-sm text-muted">Checking…</p>}
      {talkReady && <Partner partner={partner} onStart={onPartner} />}
    </main>
  )
}
