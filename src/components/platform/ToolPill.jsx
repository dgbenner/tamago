import { Chip } from 'konsta/react'
import { TOOL_ICONS } from '../ToolTile.jsx'

// The tool pill in the iOS and Android styles: Konsta UI's Chip, as a button. iOS: a filled capsule. Android:
// Material 3's outlined assist chip with 8px corners. Developer stays the quiet one.
export default function PlatformToolPill({ tool: t }) {
  const Icon = TOOL_ICONS[t.id]
  return (
    <Chip component="button" outline onClick={t.onOpen} data-tool={t.id} data-quiet={t.quiet || undefined} className="tg-chip"
      colors={{ outlineTextIos: 'text-ink', outlineTextMaterial: 'text-ink', outlineBorderIos: 'border-line', outlineBorderMaterial: 'border-field' }}
      media={<span className="tg-chip-icon"><Icon /></span>}>{t.label}</Chip>
  )
}
