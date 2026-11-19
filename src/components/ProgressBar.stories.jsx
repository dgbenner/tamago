import { useState } from 'react'
import Button from './Button.jsx'
import ProgressBar from './ProgressBar.jsx'

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  argTypes: { value: { control: { type: 'range', min: 0, max: 1, step: 0.05 } } },
  // The bar sits in a row beside the close button and takes the room left over.
  decorators: [(Story) => <div className="mx-auto flex max-w-md items-center gap-3 p-4"><Story /></div>],
}

export const Empty = { args: { value: 0 } }
export const PartWay = { args: { value: 0.4 } }
export const Full = { args: { value: 1 } }

// Tap Next Question: the fill slides to the new value.
export const Sliding = {
  render: () => {
    const [n, setN] = useState(2)
    return <div className="flex flex-1 flex-col gap-5"><div className="flex"><ProgressBar value={n / 10} /></div><Button kind="secondary" onClick={() => setN(n >= 10 ? 0 : n + 1)}>Next Question</Button></div>
  },
}
