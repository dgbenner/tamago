import { IconClose, IconFlag, IconGear } from '../screens/icons.jsx'
import IconButton from './IconButton.jsx'

export default {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: { onClick: { action: 'clicked' }, children: { control: false } },
  decorators: [(Story) => <div className="flex gap-2 p-4"><Story /></div>],
}

export const Close = { args: { label: 'Leave lesson', children: <IconClose /> } }
export const Settings = { args: { label: 'Settings', children: <IconGear /> } }
// Quiet icons in a bar take the muted colour from what is around them.
export const Muted = { render: (args) => <span className="flex text-muted"><IconButton {...args} label="Flag this question"><IconFlag /></IconButton></span> }
