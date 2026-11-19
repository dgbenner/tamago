import { createContext, useContext, useEffect, useId, useRef } from 'react'
import { IconClose } from '../screens/icons.jsx'

// Lifted from Home.jsx unchanged (design-system branch).
// A bottom sheet on a phone (a centred pop-up on wider screens). A modal dialog (WCAG 2.1.2, 2.4.3, 4.1.2): named by
// its heading, focus moves into it, Tab stays inside, Escape closes it, and focus goes back to what opened it.
export function Sheet({ onClose, children }) {
  const ref = useRef(null)
  const titleId = useId()
  useEffect(() => {
    const opener = document.activeElement
    const box = ref.current
    const focusables = () => [...box.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), select, textarea, [tabindex]:not([tabindex="-1"])')]
    ;(focusables().find((el) => !el.matches('[aria-label=Close]')) ?? focusables()[0])?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
      if (e.key !== 'Tab') return
      const list = focusables()
      if (!list.length) return
      const first = list[0]
      const last = list.at(-1)
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('keydown', onKey); if (opener?.isConnected) opener.focus({ preventScroll: true }) }
  }, [])
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <section ref={ref} role="dialog" aria-modal="true" aria-labelledby={titleId} className="sheet" onClick={(e) => e.stopPropagation()}>
        <SheetTitle.Provider value={titleId}>{children}</SheetTitle.Provider>
      </section>
    </div>
  )
}
const SheetTitle = createContext(null)
export function SheetHead({ kicker, title, onClose }) {
  const id = useContext(SheetTitle)
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        {kicker && <p className="text-sm text-muted">{kicker}</p>}
        <h2 id={id} className="text-xl font-semibold">{title}</h2>
      </div>
      <button onClick={onClose} aria-label="Close" className="icon-btn -mr-2 -mt-2"><IconClose /></button>
    </div>
  )
}
