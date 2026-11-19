import { mocked } from 'storybook/test'
import { play } from '../lib/audio.js'
import AudioHelp from './AudioHelp.jsx'

const words = <p lang="fr" className="text-2xl leading-relaxed">Un café, s’il vous plaît.</p>

export default {
  title: 'Components/AudioHelp',
  component: AudioHelp,
  args: { audio: { french: 'Un café, s’il vous plaît.' }, words },
  argTypes: { onShowWords: { action: 'show words' }, words: { control: false } },
  // Stories are silent: the play function is replaced with one that does nothing.
  beforeEach: () => { mocked(play).mockImplementation(() => {}) },
  decorators: [(Story) => <main className="lesson mx-auto flex max-w-md flex-col gap-5 px-4 pt-5 lg:max-w-4xl"><Story /></main>],
}
const replay = async ({ canvas, userEvent }) => { await userEvent.click(canvas.getByLabelText('Play the sentence')) }

// How every listening question starts: the speaker alone.
export const SpeakerAlone = {}

// After the first replay, Slow and Show Words appear.
export const AfterAReplay = { play: replay }

// Show Words was tapped: the sentence shows and the link goes.
export const WordsShown = { args: { wordsShown: true }, play: replay }

// Inside a speech bubble (Answer the Question): no frame of its own.
export const Bare = { args: { bare: true } }
