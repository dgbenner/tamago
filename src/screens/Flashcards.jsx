import { useEffect, useState } from 'react'
import { play } from '../lib/audio.js'
import { IconClose, IconSpeaker } from './icons.jsx'
import { TL } from '../lib/course.js'

// FSRS flashcards: French on the front; meaning and an example on the back; the learner grades their own recall.
// With "say aloud" on, the card plays and asks to be said before turning.
export default function Flashcards({ cards, aloud, onGrade, onDone }) {
  const [i, setI] = useState(0)
  const [shown, setShown] = useState(false)
  const card = cards[i]
  useEffect(() => { if (card && aloud) play(card.audio) }, [i])
  if (!card) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-4">
        <p className="text-center text-xl">{cards.length} {cards.length === 1 ? 'card' : 'cards'} done.</p>
        <button onClick={onDone} className="btn-primary">Continue</button>
      </main>
    )
  }
  const grade = (g) => { onGrade(card.word_id, g); setShown(false); setI(i + 1) }
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <header className="flex items-center gap-3">
        <button onClick={onDone} aria-label="Leave flashcards" className="icon-btn -ml-2"><IconClose /></button>
        <span className="text-sm text-muted">Card {i + 1} of {cards.length}</span>
      </header>
      <section className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border-4 border-line bg-surface p-6 text-center">
        <p lang={TL} className="text-3xl font-semibold">{card.form}</p>
        <button onClick={() => play(card.audio)} aria-label="Play the word" className="icon-btn border-2 border-line"><IconSpeaker /></button>
        {aloud && !shown && <p className="text-sm text-muted">Say it aloud, then turn the card.</p>}
        {shown && (
          <>
            <p className="text-xl">{card.hint}</p>
            {card.example && <p className="text-muted"><span lang={TL}>{card.example.french}</span><br />{card.example.english}</p>}
          </>
        )}
      </section>
      <div className="sticky bottom-0 -mx-4 bg-bg px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
        {!shown
          ? <button onClick={() => setShown(true)} className="btn-submit w-full">Turn the Card</button>
          : (
            <div className="grid grid-cols-4 gap-2">
              {[['again', 'Again'], ['hard', 'Hard'], ['good', 'Good'], ['easy', 'Easy']].map(([g, label]) => (
                <button key={g} onClick={() => grade(g)} className={g === 'good' ? 'btn-submit px-1' : 'btn-secondary px-1'}>{label}</button>
              ))}
            </div>
          )}
      </div>
    </main>
  )
}
