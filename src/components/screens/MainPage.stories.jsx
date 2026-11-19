import Compare from './Compare.jsx'
import MainPage from './MainPage.jsx'

const STATES = { 'The Tree': 'the-tree', "A Circle's Sheet Open": 'a-circles-sheet-open' }

export default {
  title: 'Screens/Main Page',
  component: MainPage,
  argTypes: { onOpen: { action: 'opened' } },
}

// Tap a circle's info icon to open its sheet. On iOS and Android phones, More in the bottom bar opens the other tools.
export const TheTree = {}
export const ACirclesSheetOpen = { name: "A Circle's Sheet Open", args: { sheetFor: 'U03' } }

// Tamago, iOS and Android together. Theme in the toolbar switches all three; State and Layout are under Controls.
// At desktop size they are stacked by default, since three 1440px windows side by side are too small to read.
const compare = (size) => ({
  parameters: { compare: true },
  globals: { viewport: { value: 'desktop', isRotated: false } },
  args: { state: 'The Tree', layout: size === 'desktop' ? 'Stacked' : 'Side by Side' },
  argTypes: { state: { control: 'radio', options: Object.keys(STATES) }, layout: { control: 'radio', options: ['Side by Side', 'Stacked'] } },
  render: ({ state, layout }, { globals }) => <Compare storyId={`screens-main-page--${STATES[state]}`} size={size} theme={globals.theme} stacked={layout === 'Stacked'} />,
})
export const ComparePhone = { ...compare('phone'), name: 'Compare: Phone' }
export const CompareDesktop = { ...compare('desktop'), name: 'Compare: Desktop' }
