import { mocked } from 'storybook/test'
import { explain } from '../../lib/explain.js'
import Compare from './Compare.jsx'
import QuestionPage from './QuestionPage.jsx'

const STATES = { 'Before Answering': 'before-answering', Right: 'right', Wrong: 'wrong' }

export default {
  title: 'Screens/Question Page',
  component: QuestionPage,
  argTypes: { onExit: { action: 'leave lesson' }, onContinue: { action: 'continue' }, onHint: { action: 'hint opened' }, onFlag: { action: 'flagged' } },
  beforeEach: () => { mocked(explain).mockResolvedValue(null) },
}

// Tap a choice to answer; Continue starts it again.
export const BeforeAnswering = {}
export const Right = { args: { picked: 'I would like a coffee.' } }
export const Wrong = { args: { picked: 'I have a coffee.' } }

// Tamago, iOS and Android together. Theme in the toolbar switches all three; State and Layout are under Controls.
// At desktop size they are stacked by default, since three 1440px windows side by side are too small to read.
const compare = (size) => ({
  parameters: { compare: true },
  globals: { viewport: { value: 'desktop', isRotated: false } },
  args: { state: 'Before Answering', layout: size === 'desktop' ? 'Stacked' : 'Side by Side' },
  argTypes: { state: { control: 'radio', options: Object.keys(STATES) }, layout: { control: 'radio', options: ['Side by Side', 'Stacked'] } },
  render: ({ state, layout }, { globals }) => <Compare storyId={`screens-question-page--${STATES[state]}`} size={size} theme={globals.theme} stacked={layout === 'Stacked'} />,
})
export const ComparePhone = { ...compare('phone'), name: 'Compare: Phone' }
export const CompareDesktop = { ...compare('desktop'), name: 'Compare: Desktop' }
