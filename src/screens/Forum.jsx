import NeedsSetup from './NeedsSetup.jsx'
import { IconBack } from './icons.jsx'
import { TL, course } from '../lib/course.js'

// The forum, stubbed (feature list: "stub only for now"). Its shape is here so the sections are agreed before a
// server exists: Sentence Discussions (every question's thread, with an Unanswered filter) and French, each with
// Popular, New and Followed.
export default function Forum({ onBack }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Forum</h1>
      </header>
      <NeedsSetup title="Discussions">Threads, replies, votes and screen names need sign-in and a server. Claude will screen posts for spam once they open.</NeedsSetup>
      {[['Sentence Discussions', 'One thread per question, also reached from the answer bar. Filter: Unanswered.'], [course.name, 'Questions about grammar, sounds and usage.']].map(([title, text]) => (
        <section key={title} className="flex flex-col gap-2 rounded-xl border-2 border-line bg-surface p-3 opacity-60">
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm text-muted">{text}</p>
          <div className="flex gap-2 text-sm text-muted">{['Popular', 'New', 'Followed'].map((t) => <span key={t} className="tag">{t}</span>)}</div>
        </section>
      ))}
    </main>
  )
}
