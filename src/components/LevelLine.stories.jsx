import LevelLine from './LevelLine.jsx'

export default {
  title: 'Components/LevelLine',
  component: LevelLine,
  args: { label: 'A1: Part 2' },
  // It is a list item: the tree is a list.
  decorators: [(Story) => <ol className="mx-auto flex max-w-md flex-col items-center gap-4 p-4"><Story /></ol>],
}

export const PartTop = {}
export const Midpoint = { args: { label: 'A1: Part 2 · Midpoint' } }
