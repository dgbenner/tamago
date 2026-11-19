import { useEffect, useState } from 'react'
import { Notification, Toast as KToast } from 'konsta/react'
import { SushiMark } from '../Logo.jsx'
import { useStyle } from '../style/StyleContext.jsx'

// The toast in the iOS and Android styles. iOS has no toast of its own; the nearest convention is the banner that
// drops from the top with the app's icon, so iOS uses Konsta UI's Notification. Android uses Konsta UI's Toast, drawn
// as Material's snackbar at the bottom. Tamago's colour for each kind stays (the .toast-<kind> classes).
// Like Tamago's, it leaves by itself after about 3 seconds.
const HOLD = 3200
export default function PlatformToast({ line, onGone }) {
  const style = useStyle()
  const [opened, setOpened] = useState(false)
  useEffect(() => {
    if (!line) return undefined
    const show = requestAnimationFrame(() => setOpened(true))
    const hide = setTimeout(() => setOpened(false), HOLD)
    const gone = setTimeout(() => onGone?.(), HOLD + 500)
    return () => { cancelAnimationFrame(show); clearTimeout(hide); clearTimeout(gone); setOpened(false) }
  }, [line?.id])
  const kind = `toast-${line?.kind ?? 'info'}`
  return (
    <div aria-live="polite">
      {line && (style === 'ios'
        ? <Notification key={line.id} opened={opened} icon={<SushiMark className="tg-toast-icon" />} title="Tamago" text={line.text}
            colors={{ bgIos: `tg-toast ${kind}`, titleIos: '', subtitleIos: '' }} />
        : <KToast key={line.id} opened={opened} position="center" colors={{ bgMaterial: `tg-toast ${kind}`, textMaterial: '' }}>{line.text}</KToast>)}
    </div>
  )
}
