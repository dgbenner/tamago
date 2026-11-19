import { useState } from 'react'
import ChoiceList from './ChoiceList.jsx'

const choices = ['Good evening', 'Good morning', 'Good night', 'Goodbye']
const answer = 'Good evening'

export default {
  title: 'Components/ChoiceList',
  component: ChoiceList,
  args: { choices, answer, lang: 'en', result: null, chosen: null },
  argTypes: { onPick: { action: 'picked' } },
  // The lesson's own column (Lesson.jsx), so the choices get the lesson's sizes at each width.
  decorators: [(Story) => <main className="lesson mx-auto flex max-w-md flex-col px-4 lg:max-w-4xl"><div className="flex flex-col gap-5 pt-5"><Story /></div></main>],
}

export const NothingPicked = {}

export const RightAnswer = { args: { chosen: 'Good evening', result: { correct: true } } }

export const WrongAnswer = { args: { chosen: 'Good night', result: { correct: false } } }

// Tap a choice: it is checked at once, as in a lesson.
export const TryIt = {
  render: (args) => {
    const [chosen, setChosen] = useState(null)
    return <ChoiceList {...args} chosen={chosen} result={chosen ? { correct: chosen === args.answer } : null} onPick={(c) => { setChosen(c); args.onPick?.(c) }} />
  },
}
