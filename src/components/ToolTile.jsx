import { IconBars, IconBook, IconCode, IconComment, IconRepeat, IconStudy, IconVerb } from '../screens/icons.jsx'

// One tool on the main page, in its two shapes. Lifted from Home.jsx unchanged (design-system branch), where each
// sat inside the list that draws it (Tools, ToolMenu).
// A tool is { id, label, about, onOpen, quiet }: quiet is Developer, dashed and muted, not a learning tool.
export const TOOL_ICONS = { glossary: IconBook, verbs: IconVerb, study: IconStudy, progress: IconBars, practice: IconRepeat, talk: IconComment, developer: IconCode }

// On phones: a pill in the sideways strip, the icon beside the label.
export function ToolPill({ tool: t }) {
  const Icon = TOOL_ICONS[t.id]
  return (
    // Developer is quieter: dashed outline, no fill, muted text; not a learning tool.
    <button onClick={t.onOpen} data-tool={t.id} className={`flex min-h-10 shrink-0 snap-start items-center gap-1.5 rounded-full border-2 px-3 py-1 text-sm leading-none whitespace-nowrap ${t.quiet ? 'border-dashed border-field bg-transparent text-muted' : 'border-line bg-surface font-medium'}`}>
      <span className={`[&_svg]:size-5 ${t.quiet ? 'opacity-50' : ''}`}><Icon /></span>
      <span className={t.quiet ? 'dev-tiny' : ''}>{t.label}</span>
    </button>
  )
}

// From 1024px: a card in the right-hand panel, with a line on what the tool is for.
export function ToolCard({ tool: t }) {
  const Icon = TOOL_ICONS[t.id]
  return (
    <button onClick={t.onOpen} className={`@container flex items-start gap-3 rounded-xl border-2 p-3 text-left hover:border-muted ${t.quiet ? 'border-dashed border-field bg-transparent text-muted' : 'border-line bg-surface'}`}>
      <span className={`mt-0.5 shrink-0 [&_svg]:size-6 ${t.quiet ? 'opacity-50' : ''}`}><Icon /></span>
      {/* Developer: tiny type at half strength, like the carousel's dev jump. */}
      <span className="flex flex-col gap-0.5">
        <span className={t.quiet ? 'dev-tiny font-semibold' : 'font-semibold'}>{t.label}</span>
        <span className={`max-w-[80cqw] ${t.quiet ? 'dev-tiny' : 'text-sm text-muted'}`}>{t.about}</span>
      </span>
    </button>
  )
}
