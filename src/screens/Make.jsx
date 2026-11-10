import { useEffect, useState } from 'react'
import { generateReady } from '../lib/generate.js'
import NeedsSetup from './NeedsSetup.jsx'
import { IconBack } from './icons.jsx'

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

export default function Make({ weakSkill, weekCount, metCount, listMatch, onWeak, onWeek, onList, onSentences, onListening, status, onBack }) {
  const [list, setList] = useState('')
  const [focus, setFocus] = useState('')
  const [ready, setReady] = useState(null)
  useEffect(() => { generateReady().then(setReady) }, [])
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

      <Block title="Flashcards from Your List" text="Paste French words or text. Words Tamago knows become flashcards, with their meanings from Wiktionary.">
        <textarea value={list} onChange={(e) => setList(e.target.value)} rows={3} lang="fr" placeholder="pomme, fromage, chat…"
          className="rounded-xl border-2 border-line bg-surface px-3 py-2 text-base" />
        {match && <p className="text-sm text-muted">{match.words.length} found{match.missing.length ? ` · not in Tamago yet: ${match.missing.join(', ')}` : ''}</p>}
        <button onClick={() => onList(match.words)} disabled={!match?.words.length} className="btn-secondary">Make flashcards</button>
      </Block>

      {ready === false && (
        <NeedsSetup title="Written by Claude">New practice sentences and short listening exchanges, written from the words you've met. Needs an API key.</NeedsSetup>
      )}
      {ready && (
        <Block title="Written by Claude" text={enough ? 'From the words you\'ve met, checked against them; any line with another word is dropped. Not checked by a native speaker.' : 'Meet 20 words first.'}>
          <input value={focus} onChange={(e) => setFocus(e.target.value)} maxLength={80} placeholder="About… (optional)"
            className="min-h-11 rounded-xl border-2 border-line bg-surface px-3 text-base" />
          <div className="flex gap-2">
            <button onClick={() => onSentences(focus)} disabled={!enough || Boolean(status)} className="btn-secondary flex-1">New sentences</button>
            <button onClick={() => onListening(focus)} disabled={!enough || Boolean(status)} className="btn-secondary flex-1">Listening</button>
          </div>
          {status && <p role="status" className="text-sm text-muted">{status}</p>}
        </Block>
      )}
      <NeedsSetup title="Conversation">A short spoken or typed exchange with Claude in French, kept to the words you know. Needs an API key and its own design pass.</NeedsSetup>
    </main>
  )
}
