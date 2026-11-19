import { Fab } from 'konsta/react'
import { IconForward } from '../../screens/icons.jsx'
import Button from '../Button.jsx'
import { useStyle } from '../style/StyleContext.jsx'

// The main page's pinned action in the iOS and Android styles.
// iOS: the same full-width main button, floating just above the tab bar.
// Android: Konsta UI's Fab with its label (Material's extended floating action button), at the lower right, which
// is where Material puts a screen's one main action.
export default function PlatformPinnedAction({ label, onClick }) {
  if (useStyle() === 'ios') return <div className="tg-pinned"><Button kind="main" onClick={onClick}>{label}</Button></div>
  return (
    <div className="tg-pinned">
      <Fab component="button" onClick={onClick} text={label} textPosition="before" icon={<IconForward />}
        colors={{ bgMaterial: 'tg-fill-main', textMaterial: 'tg-ink-main', touchRipple: 'touch-ripple-black' }} className="tg-fab" />
    </div>
  )
}
