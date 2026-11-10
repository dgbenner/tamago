import { useState } from 'react'
import { recordingOf } from '../lib/lesson.js'
import { play } from '../lib/audio.js'
import { IconBack, IconSpeaker } from './icons.jsx'
import { TL, course } from '../lib/course.js'

// The Glossary (Dan's test notes, Pass 3): one tool for vocabulary. It opens on your own words with how well you know
// each (Learned, Missed, Fading); "Show All A1 Words" adds the rest of the level as Not Yet. A2 and later join the level
// list when their content exists. Match and Flashcards work on the words you've met. Meanings are the Wiktionary hints.
export const STATUS = {
  learned: { label: 'Learned', help: 'You know it.' },
  missed: { label: 'Missed', help: 'Wrong last time it came up.' },
  fading: { label: 'Fading', help: 'Known, but due for practice.' },
  new: { label: 'Not Yet', help: 'Not in a lesson yet.' },
}
const ORDER = ['missed', 'fading', 'learned', 'new']

export default function Glossary({ words, groups, statusOf, examplesOf, tableOf, onMatch, onFlashcards, onBack }) {
  const [open, setOpen] = useState(null)
  const [aloud, setAloud] = useState(false)
  const [all, setAll] = useState(false)
  const [only, setOnly] = useState(null) // one status, or null for all of them
  const [query, setQuery] = useState('')
  const met = words.filter((w) => statusOf(w.word_id) !== 'new')
  const shown = all ? words : met
  const counts = Object.fromEntries(ORDER.map((k) => [k, shown.filter((w) => statusOf(w.word_id) === k).length]))
  const q = query.trim().toLowerCase()
  const visible = shown.filter((w) => (!only || statusOf(w.word_id) === only) && (!q || w.form.toLowerCase().includes(q) || String(w.hint).toLowerCase().includes(q)))
  const pick = (k) => setOnly(only === k ? null : k)

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-4 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Glossary</h1>
        <span className="ml-auto text-sm text-muted">{met.length} of {words.length} A1 words met</span>
      </header>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <button onClick={onMatch} disabled={met.length < 4} className="btn-secondary flex-1">Match</button>
          <button onClick={() => onFlashcards(aloud)} disabled={met.length === 0} className="btn-secondary flex-1">Flashcards</button>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" checked={aloud} onChange={(e) => setAloud(e.target.checked)} className="size-4" />
          Say Each Card Aloud
        </label>
      </div>

      <div className="flex flex-col gap-3 border-t-2 border-line pt-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={all} onChange={(e) => { setAll(e.target.checked); if (!e.target.checked && only === 'new') setOnly(null) }} className="size-4" />
          <span className="font-medium">Show All A1 Words</span>
        </label>
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Find a word, in ${course.name} or English`}
          className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base" aria-label="Find a word" />
        {/* The four kinds, each a filter: tap one to show only it, tap again for all. */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Show by how well you know them">
          {ORDER.filter((k) => k !== 'new' || all).map((k) => (
            <button key={k} onClick={() => pick(k)} aria-pressed={only === k} title={STATUS[k].help}
              className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border-2 px-3 text-sm ${only === k ? 'border-orange bg-orange font-semibold text-white' : 'border-line bg-surface'}`}>
              <Dot status={k} on={only === k} />{STATUS[k].label} <span className={only === k ? '' : 'text-muted'}>{counts[k]}</span>
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 && <p className="text-muted">Words appear here as you meet them in lessons. Tick Show All A1 Words to see the whole level.</p>}
      {shown.length > 0 && visible.length === 0 && <p className="text-muted">No words match.</p>}

      {groups.map((g) => {
        const list = visible.filter((w) => w.first_unit === g.unit_id)
        if (!list.length) return null
        return (
          <section key={g.unit_id} className="flex flex-col gap-1">
            <h2 className="text-sm text-muted">{g.title}</h2>
            {list.map((w) => {
              const st = statusOf(w.word_id)
              const isOpen = open === w.word_id
              const table = tableOf(w)
              return (
                <div key={w.word_id} className="rounded-xl border-2 border-line bg-surface">
                  <button onClick={() => setOpen(isOpen ? null : w.word_id)} aria-expanded={isOpen} className="flex w-full items-center gap-3 px-3 py-2 text-left">
                    <span lang={TL} className="font-semibold">{w.form}</span>
                    <span className="flex-1 text-muted">{w.hint}</span>
                    <span className={`inline-flex items-center gap-1.5 text-xs ${st === 'missed' ? 'text-wrong' : 'text-muted'}`}><Dot status={st} />{STATUS[st].label}</span>
                  </button>
                  {isOpen && (
                    <div className="flex flex-col gap-2 border-t-2 border-line px-3 py-2 text-sm">
                      <p className="text-muted">{[w.part_of_speech, w.gender && `(${w.gender})`, w.lemma !== w.form && `of ${w.lemma}`].filter(Boolean).join(' ')}</p>
                      {examplesOf(w.word_id).map((s) => (
                        <button key={s.sentence_id} onClick={() => play({ french: s.french, file: recordingOf(s) })} className="flex items-start gap-2 text-left">
                          <span className="mt-0.5 opacity-60 [&_svg]:size-4"><IconSpeaker /></span>
                          <span><span lang={TL}>{s.french}</span> <span className="text-muted">{s.english}</span></span>
                        </button>
                      ))}
                      {table && (
                        <p className="text-muted"><span lang={TL}>{table.present.map((x) => x.form).join(', ')}</span> (present of <span lang={TL}>{table.lemma}</span>, from Wiktionary)</p>
                      )}
                      {st === 'new' && <p className="text-muted">Taught in {g.title}.</p>}
                    </div>
                  )}
                </div>
              )
            })}
          </section>
        )
      })}
    </main>
  )
}

// A small mark per kind: filled green for Learned, red for Missed, half for Fading, hollow for Not Yet.
function Dot({ status, on = false }) {
  const base = 'inline-block size-2.5 shrink-0 rounded-full'
  if (on) return <span className={`${base} bg-white`} aria-hidden="true" />
  if (status === 'learned') return <span className={`${base} bg-green`} aria-hidden="true" />
  if (status === 'missed') return <span className={`${base} bg-wrong`} aria-hidden="true" />
  if (status === 'fading') return <span className={`${base} border-2 border-green bg-[linear-gradient(90deg,var(--green)_50%,transparent_50%)]`} aria-hidden="true" />
  return <span className={`${base} border-2 border-muted`} aria-hidden="true" />
}
