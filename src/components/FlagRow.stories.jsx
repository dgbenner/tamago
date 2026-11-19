import { FlagRow } from './FlagRow.jsx'

export default {
  title: 'Components/FlagRow',
  component: FlagRow,
  // onPick is always given here: without it a tap switches course and reloads the page, as in Settings.
  argTypes: { onPick: { action: 'picked' }, size: { control: 'radio', options: ['md', 'lg'] } },
  decorators: [(Story) => <div className="flex justify-center p-4"><Story /></div>],
}

// In Settings: the running course is outlined in orange. Tap a faded flag to see "Coming Soon".
export const InSettings = { args: { size: 'md' } }

// On the opening screen: bigger flags, closer together, no outline.
export const OnTheOpeningScreen = { args: { size: 'lg' } }
