import LevelLine from './LevelLine.jsx'

export default {
  title: 'Components/LevelLine',
  component: LevelLine,
  args: { label: 'Early A1' },
  // It is a list item: the tree is a list.
  decorators: [(Story) => <ol className="mx-auto flex max-w-md flex-col items-center gap-4 p-4"><Story /></ol>],
}

export const EarlyA1 = {}
export const HighA1 = { args: { label: 'High A1' } }
