import { mocked } from 'storybook/test'
import { explain } from '../lib/explain.js'
import AnswerBar from './AnswerBar.jsx'

const flagReasons = [
  { reason_id: 'FR01', label: 'My answer should be accepted' },
  { reason_id: 'FR02', label: 'The sentence sounds wrong' },
  { reason_id: 'FR03', label: 'Something else is wrong' },
]
// "Type in French": the English is shown, the learner types the French.
const typed = { type: 'QT12', sentence_id: 'S0001', lang: 'fr', french: 'Un café, s’il vous plaît.', english: 'A coffee, please.', shown: 'Un café, s’il vous plaît.', accepted: ['Un café, s’il vous plaît.'] }

export default {
  title: 'Components/AnswerBar',
  component: AnswerBar,
  // cantListen: stories stay silent (in the app the bar plays the sentence as it appears).
  args: { q: typed, cantListen: true, flagReasons },
  argTypes: { onContinue: { action: 'continue' }, onFlag: { action: 'flagged' } },
  beforeEach: () => { mocked(explain).mockResolvedValue(null) },
}

export const Right = { args: { result: { correct: true, given: 'Un café, s’il vous plaît.', matched: 'Un café, s’il vous plaît.' } } }

export const WrongWithCorrectAnswer = { args: { result: { correct: false, given: 'Un thé, merci.' } } }

export const WithAccentNote = { args: { result: { correct: true, accent: true, given: 'Un cafe, s’il vous plait.', matched: 'Un café, s’il vous plaît.' } } }

// The Why? button appears once an explanation has arrived; tap it to read the explanation.
export const WithWhyButton = {
  args: { result: { correct: false, given: 'Un café, merci.' } },
  beforeEach: () => { mocked(explain).mockResolvedValue('“Merci” means “thank you”. To ask politely, French uses “s’il vous plaît” (please).') },
}
