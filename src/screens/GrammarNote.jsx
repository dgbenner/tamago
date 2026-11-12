import { recordingOf } from '../lib/lesson.js'
import { play } from '../lib/audio.js'
import { IconBack, IconSpeaker } from './icons.jsx'
import { TL } from '../lib/course.js'

// A unit's grammar note: the rule in plain words, examples from the unit with audio, and the verb table from
// Wiktionary. Since 2026-11-12 (Dan, batch 5) it opens over the tree from the circle's notebook icon: a centred pop-up on
// desktop and iPad, a bottom sheet on iPhone (Home NoteSheet, with GrammarNoteBody). The full screen below stays for
// any older route to it.
export function GrammarNoteBody({ note, sentenceById }) {
  return (
    <>
      <p className="text-lg leading-relaxed">{note.rule}</p>
      <ul className="flex flex-col gap-2">
        {note.examples.map((id) => sentenceById.get(id)).filter(Boolean).map((s) => (
          <li key={s.sentence_id} className="flex items-start gap-3 rounded-xl border-2 border-line bg-surface p-3">
            <button onClick={() => play({ french: s.french, file: recordingOf(s) })} aria-label={`Play: ${s.french}`} className="icon-btn -m-1 shrink-0 [&_svg]:size-5"><IconSpeaker /></button>
            <div>
              <p lang={TL} className="text-lg">{s.french}</p>
              <p className="text-muted">{s.english}</p>
            </div>
          </li>
        ))}
      </ul>
      {note.conjugations.filter((t) => t.present).map((t) => (
        <section key={t.lemma} className="flex flex-col gap-2">
          <h3 className="font-semibold"><span lang={TL}>{t.lemma}</span>, present</h3>
          <table className="w-full border-collapse text-left">
            <tbody>
              {t.present.map((row) => (
                <tr key={row.person} className="border-b-2 border-line">
                  <td lang={TL} className="py-1.5 pr-4 text-muted">{row.person}</td>
                  <td lang={TL} className="py-1.5 font-semibold">{row.form}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a href={t.source} target="_blank" rel="noreferrer" className="text-sm text-muted underline underline-offset-2">Table from Wiktionary</a>
        </section>
      ))}
    </>
  )
}

export default function GrammarNote({ unit, note, sentenceById, onDone, doneLabel, onBack, intro, wordCount, sampleWords = [] }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <div>
          <p className="text-sm text-muted">{intro ? 'Before You Start' : 'Grammar Note'}</p>
          <h1 className="text-xl font-semibold">{unit.title}</h1>
        </div>
      </header>

      {intro && (
        <div className="flex flex-col gap-2 rounded-xl border-2 border-line bg-surface p-4">
          <p>A short note on the idea this unit is built on. Read it, tap an example to hear it, then start your first lesson.</p>
          {wordCount > 0 && <p className="text-sm text-muted">New in this unit: {wordCount} words, among them <span lang={TL}>{sampleWords.join(', ')}</span>.</p>}
        </div>
      )}

      <p className="text-lg leading-relaxed">{note.rule}</p>

      <ul className="flex flex-col gap-2">
        {note.examples.map((id) => sentenceById.get(id)).filter(Boolean).map((s) => (
          <li key={s.sentence_id} className="flex items-start gap-3 rounded-xl border-2 border-line bg-surface p-3">
            <button onClick={() => play({ french: s.french, file: recordingOf(s) })} aria-label={`Play: ${s.french}`} className="icon-btn -m-1 shrink-0 [&_svg]:size-5"><IconSpeaker /></button>
            <div>
              <p lang={TL} className="text-lg">{s.french}</p>
              <p className="text-muted">{s.english}</p>
            </div>
          </li>
        ))}
      </ul>

      {note.conjugations.filter((t) => t.present).map((t) => (
        <section key={t.lemma} className="flex flex-col gap-2">
          <h2 className="font-semibold"><span lang={TL}>{t.lemma}</span>, present</h2>
          <table className="w-full border-collapse text-left">
            <tbody>
              {t.present.map((row) => (
                <tr key={row.person} className="border-b-2 border-line">
                  <td lang={TL} className="py-1.5 pr-4 text-muted">{row.person}</td>
                  <td lang={TL} className="py-1.5 font-semibold">{row.form}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a href={t.source} target="_blank" rel="noreferrer" className="text-sm text-muted underline underline-offset-2">Table from Wiktionary</a>
        </section>
      ))}

      <div className="sticky bottom-0 -mx-4 mt-auto bg-bg px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button onClick={onDone} className="btn-submit w-full">{doneLabel}</button>
      </div>
    </main>
  )
}
