import { recordingOf } from '../lib/lesson.js'
import { useState } from 'react'
import { play } from '../lib/audio.js'
import { IconBack, IconSpeaker } from './icons.jsx'

// The word list: every word met, how well it's known, its verb table and example sentences.
// Two mini exercises: matching (recognition) and flashcards (recall, on FSRS), with an option to say each aloud.
export default function Words({ words, units, recallOf, examplesOf, tableOf, onMatch, onFlashcards, onBack }) {
  const [open, setOpen] = useState(null)
  const [aloud, setAloud] = useState(false)
  const known = (r) => (r === null ? 'new' : r >= 0.9 ? 'strong' : r >= 0.7 ? 'fair' : 'weak')
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Words</h1>
        <span className="ml-auto text-sm text-muted">{words.length} met</span>
      </header>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <button onClick={onMatch} disabled={words.length < 4} className="btn-secondary flex-1">Match</button>
          <button onClick={() => onFlashcards(aloud)} disabled={words.length === 0} className="btn-secondary flex-1">Flashcards</button>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" checked={aloud} onChange={(e) => setAloud(e.target.checked)} className="size-4" />
          Say each card aloud
        </label>
      </div>

      {units.map((u) => {
        const list = words.filter((w) => w.first_unit === u.unit_id)
        if (!list.length) return null
        return (
          <section key={u.unit_id} className="flex flex-col gap-1">
            <p className="text-sm text-muted">Unit {u.order} · {u.title}</p>
            {list.map((w) => {
              const r = recallOf(w.word_id)
              const isOpen = open === w.word_id
              const table = tableOf(w)
              return (
                <div key={w.word_id} className="rounded-xl border-2 border-line bg-surface">
                  <button onClick={() => setOpen(isOpen ? null : w.word_id)} className="flex w-full items-center gap-3 px-3 py-2 text-left">
                    <span lang="fr" className="font-semibold">{w.form}</span>
                    <span className="flex-1 truncate text-muted">{w.hint}</span>
                    <span className={`text-xs ${known(r) === 'weak' ? 'text-wrong' : 'text-muted'}`}>{known(r)}</span>
                  </button>
                  {isOpen && (
                    <div className="flex flex-col gap-2 border-t-2 border-line px-3 py-2 text-sm">
                      <p className="text-muted">{[w.part_of_speech, w.gender && `(${w.gender})`, w.lemma !== w.form && `of ${w.lemma}`].filter(Boolean).join(' ')}</p>
                      {examplesOf(w.word_id).map((s) => (
                        <button key={s.sentence_id} onClick={() => play({ french: s.french, file: recordingOf(s) })} className="flex items-start gap-2 text-left">
                          <span className="mt-0.5 opacity-60 [&_svg]:size-4"><IconSpeaker /></span>
                          <span><span lang="fr">{s.french}</span> <span className="text-muted">{s.english}</span></span>
                        </button>
                      ))}
                      {table && (
                        <p className="text-muted"><span lang="fr">{table.present.map((x) => x.form).join(', ')}</span> (present of <span lang="fr">{table.lemma}</span>, from Wiktionary)</p>
                      )}
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
