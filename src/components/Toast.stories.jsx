import { useState } from 'react'
import Button from './Button.jsx'
import Toast from './Toast.jsx'

export default {
  title: 'Components/Toast',
  component: Toast,
  argTypes: { onGone: { action: 'gone' } },
}
// Each of these slides down, holds about 3 seconds and slides away. To see it again, use the toolbar's
// "Remount component" button.
const kind = (k, text) => ({ args: { line: { id: 1, kind: k, text } } })
export const Info = kind('info', 'Signed Out. Progress Stays on This Device')
export const Success = kind('success', 'Progress Saved to Your Account')
// Warning and Error are styled in src/index.css but not used in the app yet; the wording here is a sample.
export const Warning = { ...kind('warning', 'No Connection. Trying Again'), name: 'Warning (Not Used in the App Yet)' }
export const ErrorKind = { ...kind('error', 'Progress Could Not Be Saved'), name: 'Error (Not Used in the App Yet)' }
// A passed lesson: green, white text, larger.
export const Pass = kind('pass', 'Say Hi · 8 of 10 · Nicely Done')

// Tap the button to send a toast, as the app does.
export const TryIt = {
  render: (args) => {
    const [line, setLine] = useState(null)
    return <div className="flex justify-center" style={{ paddingTop: "6rem" }}><Toast line={line} onGone={() => { setLine(null); args.onGone?.() }} /><Button kind="outline" onClick={() => setLine({ id: Date.now(), kind: 'pass', text: 'At the Café · 10 of 10 · Perfect Score!' })}>Finish a Lesson</Button></div>
  },
}

// Every kind, held still for comparing. In the app only one shows at a time and it leaves by itself; the stillness
// here is for this page only.
export const EveryKindHeldStill = {
  name: 'Every Kind, Held Still (Tamago Style Only)',
  render: () => (
    <div className="flex flex-col items-center gap-3 p-6">
      <style>{'.toast { animation: none !important; }'}</style>
      {[['info', 'Signed Out. Progress Stays on This Device'], ['success', 'Progress Saved to Your Account'], ['pass', 'Say Hi · 8 of 10 · Nicely Done']].map(([k, text]) => <p key={k} className={`toast toast-${k}`}>{text}</p>)}
      <p className="text-sm text-muted">Not used in the app yet:</p>
      {[['warning', 'No Connection. Trying Again'], ['error', 'Progress Could Not Be Saved']].map(([k, text]) => <p key={k} className={`toast toast-${k}`}>{text}</p>)}
    </div>
  ),
}
