import WrongMark from './WrongMark.jsx'
import { usePlatformPart } from './style/StyleContext.jsx'

// A column of answer choices, one tap to pick (Pick the Meaning, Pick What You Heard, Fill the Blank). Lifted from
// Lesson.jsx unchanged (design-system branch). Once `result` is set every choice is disabled: the right one takes the
// green edge, the learner's wrong pick the red edge with "Incorrect", the rest fade.
function TamagoChoiceList({ choices, result, chosen, answer, onPick, lang }) {
  return (
    <div className="flex flex-col gap-2.5">
      {choices.map((choice) => {
        const state = !result ? '' : choice.toLowerCase() === answer.toLowerCase() ? 'choice-right' : choice === chosen ? 'choice-wrong' : 'opacity-60'
        return <button key={choice} lang={lang} disabled={Boolean(result)} onClick={() => onPick(choice)} className={`choice ${state} ${state === 'choice-wrong' ? 'flex items-center justify-between gap-3' : ''}`}>{choice}{state === 'choice-wrong' && <WrongMark />}</button>
      })}
    </div>
  )
}

export default function ChoiceList(props) {
  const Platform = usePlatformPart('ChoiceList')
  return Platform ? <Platform {...props} /> : <TamagoChoiceList {...props} />
}
