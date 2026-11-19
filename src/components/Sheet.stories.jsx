import Button from './Button.jsx'
import { Sheet, SheetHead } from './Sheet.jsx'

// A sheet as Home.jsx builds one: the head, some text, a main button and a Back link.
const Example = ({ onClose, onStart }) => (
  <Sheet onClose={onClose}>
    <SheetHead kicker="Grammar Note" title="At the Café" onClose={onClose} />
    <p className="mt-2 text-muted">Ordering politely with “je voudrais” and “s’il vous plaît”.</p>
    <div className="mt-5 flex flex-col items-center gap-1">
      <Button kind="main" onClick={onStart} className="w-full">Start Lesson</Button>
      <Button kind="link" onClick={onClose}>Back</Button>
    </div>
  </Sheet>
)

export default {
  title: 'Components/Sheet',
  component: Sheet,
  subcomponents: { SheetHead },
  argTypes: { onClose: { action: 'closed' }, onStart: { action: 'main button' } },
  render: (args) => <Example {...args} />,
}

// Under 1024 px wide: rises from the bottom edge.
export const BottomSheetOnPhone = { globals: { viewport: { value: 'phone', isRotated: false } } }

// From 1024 px wide: a pop-up in the middle of the screen.
export const CenteredPopUpOnDesktop = { globals: { viewport: { value: 'desktop', isRotated: false } } }
