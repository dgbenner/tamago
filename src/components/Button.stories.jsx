import Button from './Button.jsx'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: { onClick: { action: 'clicked' }, kind: { control: 'radio', options: ['submit', 'primary', 'secondary', 'tertiary'] } },
  decorators: [(Story) => <div className="mx-auto flex max-w-md flex-col gap-3 p-4"><Story /></div>],
}

// The main button on the question page, yellow: Check.
export const Check = { args: { kind: 'submit', children: 'Check', className: 'w-full' } }

// Nothing to check yet: grey, and it can't be tapped.
export const CheckDisabled = { args: { kind: 'submit', children: 'Check', className: 'w-full', disabled: true } }

// After the answer, green: Continue.
export const Continue = { args: { kind: 'primary', children: 'Continue' } }

// The secondary text link, as on the question page.
export const TextLink = { args: { kind: 'tertiary', children: "Can't Listen Now", className: 'text-xs' } }

// The outlined button (Record Voice, Grammar Note, Skip).
export const Outlined = { args: { kind: 'secondary', children: 'Skip', className: 'w-full' } }
