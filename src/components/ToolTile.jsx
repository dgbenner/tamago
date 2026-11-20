import { usePlatformPart } from './style/StyleContext.jsx'
import { IconBars, IconBook, IconCode, IconComment, IconRepeat, IconStudy, IconVerb } from '../screens/icons.jsx'

// One tool on the main page, in its two shapes. Lifted from Home.jsx unchanged (design-system branch), where each
// sat inside the list that draws it (Tools, ToolMenu).
// A tool is { id, label, about, onOpen, quiet }: quiet is Developer, dashed and muted, not a learning tool.
export const TOOL_ICONS = { glossary: IconBook, verbs: IconVerb, study: IconStudy, progress: IconBars, practice: IconRepeat, talk: IconComment, developer: IconCode }

// On phones: a pill in the sideways strip, the icon beside the label.
function TamagoToolPill({ tool: t }) {
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
    <button onClick={t.onOpen} data-ds="tool-card" className={`@container flex items-start gap-3 rounded-xl border-2 p-3 text-left hover:border-muted ${t.quiet ? 'border-dashed border-field bg-transparent text-muted' : 'border-line bg-surface'}`}>
      <span className={`mt-0.5 shrink-0 [&_svg]:size-6 ${t.quiet ? 'opacity-50' : ''}`}><Icon /></span>
      {/* Developer: tiny type at half strength, like the carousel's dev jump. */}
      <span className="flex flex-col gap-0.5">
        <span className={t.quiet ? 'dev-tiny font-semibold' : 'font-semibold'}>{t.label}</span>
        <span className={`max-w-[80cqw] ${t.quiet ? 'dev-tiny' : 'text-sm text-muted'}`}>{t.about}</span>
      </span>
    </button>
  )
}

export function ToolPill(props) {
  const Platform = usePlatformPart('ToolPill')
  return Platform ? <Platform {...props} /> : <TamagoToolPill {...props} />
}

// The secondary menu: tools beside the path, as a sideways strip of tiles, out of the tree. Progress is one of them
// (Dan, 2026-11-11: the row that held its button and the streak is gone).
function TamagoToolStrip({ tools }) {
  return (
    // A compact single row on phones (Dan, 2026-11-15: the tiles took about a third of the screen): pills with the
    // icon beside the label, so the tree starts higher; it still scrolls sideways when they don't all fit.
    <nav aria-label="Tools" className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 lg:hidden">
      {tools.map((t) => <ToolPill key={t.id} tool={t} />)}
    </nav>
  )
}

// The right-hand panel on a wide screen: each tool with a line on what it's for; a tool opens here, in place.
export function ToolPanel({ tools }) {
  const card = (t) => <ToolCard key={t.id} tool={t} />
  return (
    // The learning tools: every card the height of the tallest, evenly spaced; each line at most 80% of the card's
    // width. Developer sits below, out of the matching, and stays short (Dan, 2026-11-11).
    <nav aria-label="Tools" className="flex flex-col gap-2">
      <div className="grid auto-rows-fr gap-2">{tools.filter((t) => !t.quiet).map(card)}</div>
      {tools.filter((t) => t.quiet).map(card)}
    </nav>
  )
}

// On iOS and Android phones the tools go where the platform keeps its main destinations: a bar at the bottom.
export function ToolStrip(props) {
  const Platform = usePlatformPart('ToolStrip')
  return Platform ? <Platform {...props} /> : <TamagoToolStrip {...props} />
}
