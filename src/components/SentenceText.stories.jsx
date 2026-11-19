import { FirstSight, FrenchText } from './SentenceText.jsx'

// "Je voudrais un café." Each word carries its hint; spaces and punctuation don't.
const q = {
  qid: 'story',
  segments: [
    { text: 'Je', word_id: 'W1', hint: 'I' }, { text: ' ' },
    { text: 'voudrais', word_id: 'W2', hint: 'would like' }, { text: ' ' },
    { text: 'un', word_id: 'W3', hint: 'a, one' }, { text: ' ' },
    { text: 'café', word_id: 'W4', hint: 'coffee' }, { text: '.' },
  ],
}

export default {
  title: 'Components/SentenceText',
  component: FrenchText,
  subcomponents: { FirstSight },
  args: { q, newWords: new Set() },
  argTypes: { onHint: { action: 'hint opened' }, newWords: { control: false } },
  render: (args) => <main className="lesson mx-auto flex max-w-md flex-col gap-5 px-4 pt-5 lg:max-w-4xl"><FrenchText {...args} /><FirstSight q={args.q} newWords={args.newWords} except={args.blankIndex ?? null} /></main>,
}

// Every word has a dotted underline; tap one for its meaning.
export const WithHints = {}

// A hint open (the story taps "voudrais").
export const HintOpen = { play: async ({ canvas, userEvent }) => { await userEvent.click(canvas.getByRole('button', { name: 'voudrais' })) } }

// New words carry an orange dot, and their meanings show under the sentence.
export const WithNewWords = { args: { newWords: new Set(['W2', 'W4']) } }

// Fill in the Blank: one word is a gap.
export const WithABlank = { args: { blankIndex: 6 } }

// The gap filled with the learner's pick.
export const BlankFilled = { args: { blankIndex: 6, filled: 'café' } }

// Answer the Question: only new words are underlined; every word still opens its hint.
export const OnlyNewWordsMarked = { args: { markNewOnly: true, newWords: new Set(['W2']) } }
