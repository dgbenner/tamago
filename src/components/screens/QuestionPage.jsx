import { useState } from 'react'
import { IconClose } from '../../screens/icons.jsx'
import AnswerBar from '../AnswerBar.jsx'
import ChoiceList from '../ChoiceList.jsx'
import IconButton from '../IconButton.jsx'
import ProgressBar from '../ProgressBar.jsx'
import QuestionHeading from '../QuestionHeading.jsx'
import { FirstSight, FrenchText } from '../SentenceText.jsx'
import { flagReasons, newWords, question as q } from './sample.js'

// The question page, Pick the Meaning, built from the library's components only (design-system branch): the close
// button and the progress bar, the heading with its New tag, the sentence with word hints and the new word's meaning,
// the choices, and the answer bar once a choice is tapped. The layout around them is the lesson's own (Lesson.jsx).
// picked: start already answered with that choice (the Right and Wrong states); a tap answers it otherwise.
export default function QuestionPage({ picked = null, onExit, onContinue, onHint, onFlag }) {
  const [chosen, setChosen] = useState(picked)
  const result = chosen ? { correct: chosen === q.answer, given: chosen } : null
  return (
    <main data-screen="question" className="lesson mx-auto flex min-h-dvh max-w-md flex-col px-4 pt-[max(0.75rem,env(safe-area-inset-top))] lg:max-w-4xl">
      <header className="sticky top-0 z-10 -mx-4 flex items-center gap-3 bg-bg px-4 pb-2">
        <IconButton label="Leave lesson" onClick={onExit} className="-ml-2"><IconClose /></IconButton>
        <ProgressBar value={result ? 0.4 : 0.3} />
      </header>
      <div className={`flex flex-1 flex-col gap-5 pt-5 ${result ? 'pb-56' : 'pb-[max(1rem,env(safe-area-inset-bottom))]'}`}>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold outline-none"><QuestionHeading english="Pick the Meaning" part={1} /></h1>
          <span className="tag"><span className="new-dot" aria-hidden="true" />New</span>
        </div>
        <FrenchText q={q} newWords={newWords} onHint={(seg) => onHint?.(seg)} />
        <FirstSight q={q} newWords={newWords} />
        <ChoiceList choices={q.choices} result={result} chosen={chosen} answer={q.answer} lang="en" onPick={setChosen} />
      </div>
      {result && <AnswerBar q={q} result={result} cantListen flagReasons={flagReasons} onFlag={(id) => onFlag?.(id)} onContinue={() => { setChosen(null); onContinue?.() }} />}
    </main>
  )
}
