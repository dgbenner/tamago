import { useState } from 'react'
import { Tabbar, TabbarLink } from 'konsta/react'
import Button from '../Button.jsx'
import { SushiMark } from '../Logo.jsx'
import { Sheet, SheetHead } from '../Sheet.jsx'
import { TOOL_ICONS, ToolCard } from '../ToolTile.jsx'

// The tools on an iOS or Android phone: Konsta UI's Tabbar, pinned to the bottom, where both platforms keep an
// app's main destinations (the tab bar on iOS, the navigation bar on Android). Both allow five places at most, so:
// Learn (the tree, where you are), three tools, and More, which opens a sheet with the rest. Tamago's strip shows
// every tool at once; the choice of which three is an assumption to settle (FIRST below).
const FIRST = ['practice', 'glossary', 'progress']
const SHORT = { practice: 'Practice' }
const More = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /></svg>
const link = { textIos: 'tg-tab', textActiveIos: 'tg-tab-on', textMaterial: 'tg-tab', textActiveMaterial: 'tg-tab-on', iconBgActiveMaterial: 'tg-tab-pill' }
export default function PlatformToolStrip({ tools }) {
  const [more, setMore] = useState(false)
  const first = FIRST.map((id) => tools.find((t) => t.id === id)).filter(Boolean)
  const rest = tools.filter((t) => !first.includes(t))
  return (
    <>
      <nav aria-label="Tools" className="tg-tabbar">
        <Tabbar labels icons colors={{ bgIos: 'tg-bar-ios-bottom', bgMaterial: 'tg-bar-md' }}>
          <TabbarLink component="button" active colors={link} icon={<SushiMark className="tg-tab-sushi" />} label="Learn" linkProps={{ 'aria-current': 'page' }} />
          {first.map((t) => { const Icon = TOOL_ICONS[t.id]; return <TabbarLink component="button" key={t.id} colors={link} icon={<Icon />} label={SHORT[t.id] ?? t.label} onClick={t.onOpen} linkProps={{ 'data-tool': t.id }} /> })}
          {rest.length > 0 && <TabbarLink component="button" colors={link} icon={<More />} label="More" onClick={() => setMore(true)} linkProps={{ 'aria-haspopup': 'dialog' }} />}
        </Tabbar>
      </nav>
      {more && (
        <Sheet onClose={() => setMore(false)}>
          <SheetHead title="More" onClose={() => setMore(false)} />
          <div className="mt-4 flex flex-col gap-2">{rest.map((t) => <ToolCard key={t.id} tool={{ ...t, onOpen: () => { setMore(false); t.onOpen?.() } }} />)}</div>
          <div className="mt-3 flex justify-center"><Button kind="link" onClick={() => setMore(false)}>Back</Button></div>
        </Sheet>
      )}
    </>
  )
}
