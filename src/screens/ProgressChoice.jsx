import { useEffect, useRef, useState } from 'react'

// Both sides have progress (accounts layer 1, Dan, 2026-11-11): this device and the account each have lessons the
// other doesn't, so the learner picks which to keep, seeing both. Shown after signing in, or on opening a course
// while signed in. The pick replaces the other side; nothing is merged.
const count = (n = 0, one) => `${n ?? 0} ${n === 1 ? one : `${one}s`}`
const lessons = (n) => count(n, 'lesson')
const when = (iso) => (iso ? new Date(iso).toLocaleDateString(undefined, { dateStyle: 'medium' }) : null)

function Side({ title, s, label, onPick, busy }) {
  return (
    <button onClick={onPick} disabled={busy} className="choice flex w-full flex-col items-start gap-1 text-left">
      <span className="font-semibold">{label}</span>
      <span className="text-sm text-muted">{title}: {lessons(s?.lessons_done ?? 0)}, {count(s?.circles_started, 'circle')} started, {count(s?.words_met, 'word')}{when(s?.last_lesson_at) ? `, last lesson ${when(s.last_lesson_at)}` : ''}</span>
    </button>
  )
}

export default function ProgressChoice({ device, account, courseName, onPick }) {
  const heading = useRef(null)
  const [busy, setBusy] = useState(false)
  useEffect(() => { heading.current?.focus() }, [])
  const pick = async (p) => { setBusy(true); try { await onPick(p) } finally { setBusy(false) } }
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(1.5rem,env(safe-area-inset-top))] pb-8">
      <h1 ref={heading} tabIndex={-1} className="text-xl font-semibold focus:outline-none">Which Progress to Keep?</h1>
      <p>This device and your account both have {courseName} progress.</p>
      <p className="font-medium" data-progress-counts>This device: {lessons(device?.lessons_done ?? 0)} · Account: {lessons(account?.lessons_done ?? 0)}</p>
      <div className="flex flex-col gap-3">
        <Side title="This device" s={device} label="Keep This Device’s" onPick={() => pick('device')} busy={busy} />
        <Side title="Account" s={account} label="Keep the Account’s" onPick={() => pick('account')} busy={busy} />
      </div>
      <p className="text-sm text-muted">The one you keep replaces the other, here and in your account.</p>
    </main>
  )
}
