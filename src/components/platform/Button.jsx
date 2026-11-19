import { Button as KButton } from 'konsta/react'

// Button in the iOS and Android styles: Konsta UI's Button, in Tamago's colours.
// iOS: a capsule, 17pt semibold. Android: Material 3's fully rounded button with the touch ripple.
const fill = (bg, text) => ({ fillBgIos: bg, fillBgMaterial: bg, fillTextIos: text, fillTextMaterial: text, fillTouchRipple: 'touch-ripple-black', disabledBg: 'bg-line', disabledText: 'text-muted' })
const KIND = {
  main: { large: true, rounded: true, colors: fill('tg-fill-main', 'tg-ink-main') },
  continue: { large: true, rounded: true, colors: fill('bg-green', 'text-white') },
  outline: { large: true, rounded: true, outline: true, colors: { textIos: 'text-ink', textMaterial: 'text-ink', outlineBorderIos: 'border-field', outlineBorderMaterial: 'border-field', touchRipple: 'touch-ripple-black' } },
  link: { clear: true, inline: true, colors: { textIos: 'text-muted', textMaterial: 'text-muted', clearBgIos: 'bg-transparent', touchRipple: 'touch-ripple-black' } },
}
export default function PlatformButton({ kind = 'main', className = '', ...rest }) {
  return <KButton {...KIND[kind]} {...rest} className={`tg-button tg-button-${kind} ${className}`} />
}
