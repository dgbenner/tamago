import { useEffect, useId, useRef, useState } from 'react'
import { Popup, Sheet as KSheet } from 'konsta/react'
import { SheetTitle, useSheetFocus } from '../Sheet.jsx'

// The sheet in the iOS and Android styles: Konsta UI's Sheet on a phone (rounded top corners and a drag handle, as
// both platforms draw a bottom sheet) and Konsta UI's Popup from 1024px wide. The modal behaviour is Tamago's own
// (useSheetFocus): focus moves in, Tab stays inside, Escape closes, focus goes back.
const WIDE = '(min-width: 1024px)'
export default function PlatformSheet({ onClose, children }) {
  const ref = useRef(null)
  const titleId = useId()
  const [wide, setWide] = useState(() => window.matchMedia(WIDE).matches)
  const [opened, setOpened] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(WIDE)
    const update = () => setWide(mq.matches)
    mq.addEventListener('change', update)
    const raf = requestAnimationFrame(() => setOpened(true)) // rises (phone) or comes up (wide) once it is on the page
    return () => { mq.removeEventListener('change', update); cancelAnimationFrame(raf) }
  }, [])
  useSheetFocus(ref, onClose)
  const Box = wide ? Popup : KSheet
  const colors = wide ? { bg: 'bg-surface' } : { bgIos: 'bg-surface', bgMaterial: 'bg-surface' }
  return (
    <Box ref={ref} opened={opened} onBackdropClick={onClose} colors={colors} role="dialog" aria-modal="true" aria-labelledby={titleId} className={wide ? 'tg-sheet tg-popup' : 'tg-sheet tg-bottom-sheet'}>
      <SheetTitle.Provider value={titleId}>{children}</SheetTitle.Provider>
    </Box>
  )
}
