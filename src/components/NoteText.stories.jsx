import NoteText from './NoteText.jsx'

export default {
  title: 'Components/NoteText',
  component: NoteText,
  args: { text: 'Say **bonjour** to greet someone during the day.\n**Comment tu t\'appelles ?** (to a friend)\n\n**Je m\'appelle Paul.** gives your name.' },
  decorators: [(Story) => <div className="mx-auto flex max-w-md flex-col items-center gap-4 p-4"><Story /></div>],
}

export const Note = {}
export const OverviewLine = { args: { inline: true, text: '**Je suis**, **tu es**: the verb être; **un**, **une**' } }
