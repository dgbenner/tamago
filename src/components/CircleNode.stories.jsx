import CircleNode from './CircleNode.jsx'

export default {
  title: 'Components/CircleNode',
  component: CircleNode,
  args: { title: 'At the Café', icon: '/sushi/nigiri/aburi-salmon-nigiri.webp', lessonsTotal: 20, lessonsDone: 0 },
  argTypes: { onPick: { action: 'picked' }, lessonsDone: { control: { type: 'range', min: 0, max: 20 } }, recall: { control: { type: 'range', min: 0, max: 1, step: 0.05 } } },
  decorators: [(Story) => <div className="flex justify-center p-6"><Story /></div>],
}

export const NotStarted = {}

// The very first circle before any lesson.
export const StartHere = { args: { marker: 'start', title: 'Say Hi' } }

// The ring fills across all the circle's lessons.
export const InProgress = { args: { lessonsDone: 8 } }

export const Finished = { args: { lessonsDone: 20 } }

// Finished, with recall dropped. Recall fading is switched off in the app (RECALL_FADE in CircleNode.jsx), so the
// ring stays full and solid; with the switch on it would fade.
export const FinishedRecallFading = { name: 'Finished, Recall Fading (Switched Off in the App)', args: { lessonsDone: 20, recall: 0.55 } }

// Ahead of where the learner is: faded and grey, still tappable.
export const Faded = { args: { early: true } }

// With the two small icons beside it: About This Circle and the Grammar Note.
// The first circle, with its "Start Here" and both icons.
export const StartHereWithIcons = { args: { marker: 'start', title: 'Say Hi' }, argTypes: { onInfo: { action: 'info' }, onNote: { action: 'note' } } }

export const WithInfoAndNote = { args: { lessonsDone: 8 }, argTypes: { onInfo: { action: 'info' }, onNote: { action: 'note' } } }

// A Brush-Up: a caption, a count of what waits inside, and no lesson ring.
export const BrushUp = { args: { title: 'Brush-Up', icon: '/sushi/misc/miso-soup.webp', caption: '5 to Strengthen', badge: 5, ring: false } }
