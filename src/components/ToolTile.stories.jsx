import { ToolCard, ToolPill } from './ToolTile.jsx'

const tools = [
  { id: 'talk', label: 'Conversations', about: 'Talk through everyday scenes' },
  { id: 'glossary', label: 'Glossary', about: 'Every word, with its meaning' },
  { id: 'practice', label: 'Practice Mistakes', about: 'Strengthen 5 recent sticking points' },
  { id: 'progress', label: 'Progress', about: 'Time, words and skills so far' },
  { id: 'study', label: 'Self-Study', about: 'Flashcards and listening' },
  { id: 'verbs', label: 'Verbs', about: 'Practice the verb tables' },
  { id: 'developer', label: 'Developer', about: 'Testing and notes', quiet: true },
]

export default {
  title: 'Components/ToolTile',
  component: ToolPill,
  subcomponents: { ToolCard },
  argTypes: { tool: { control: 'object' } },
}

// On phones: one pill.
export const Pill = { args: { tool: tools[1] }, render: (args) => <div className="p-4"><ToolPill {...args} /></div> }

// Developer is quieter: dashed and muted.
export const PillQuiet = { args: { tool: tools[6] }, render: (args) => <div className="p-4"><ToolPill {...args} /></div> }

// The strip as Home.jsx draws it on phones: one row that scrolls sideways.
export const PillStrip = {
  globals: { viewport: { value: 'phone', isRotated: false } },
  render: () => <div className="px-4 pt-4"><nav aria-label="Tools" className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4">{tools.map((t) => <ToolPill key={t.id} tool={t} />)}</nav></div>,
}

// From 1024 px: a card with a line on what the tool is for.
export const Card = { args: { tool: tools[1] }, render: (args) => <div className="flex max-w-sm flex-col p-4"><ToolCard {...args} /></div> }

// The panel as Home.jsx draws it on wide screens: every card the height of the tallest, Developer last.
export const CardPanel = {
  globals: { viewport: { value: 'desktop', isRotated: false } },
  render: () => (
    <div className="max-w-sm p-4">
      <nav aria-label="Tools" className="flex flex-col gap-2">
        <div className="grid auto-rows-fr gap-2">{tools.filter((t) => !t.quiet).map((t) => <ToolCard key={t.id} tool={t} />)}</div>
        {tools.filter((t) => t.quiet).map((t) => <ToolCard key={t.id} tool={t} />)}
      </nav>
    </div>
  ),
}
