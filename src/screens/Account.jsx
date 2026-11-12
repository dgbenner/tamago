import { useEffect, useRef, useState } from 'react'
import { IconBack } from './icons.jsx'
import { checkPassword, checkScreenName } from '../lib/auth/config.js'

// Accounts, layer 1 (Dan, 2026-11-11; _source/accounts-spec.md): sign in, forgot password, reset password, and
// accepting an invite (sign-up is invite only: there's no public Sign Up), one screen that switches between them. Reached from Settings (Account), never from the tree; the app
// works the same with no account. In mock mode a note says so, with the demo accounts, and a reset "email" comes
// back as a link to open here, since nothing is sent.
const TITLES = { signin: 'Sign In', invite: 'Create Your Account', forgot: 'Forgot Password', reset: 'Reset Password' }

function Field({ label, help, ...props }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-medium">{label}</span>
      {help && <span className="-mt-1 text-sm text-muted">{help}</span>}
      <input {...props} className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base" />
    </label>
  )
}

export default function Account({ auth, start = 'signin', token = null, code = null, onSignedIn, onBack }) {
  const [mode, setMode] = useState(start)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [screenName, setScreenName] = useState('')
  const [error, setError] = useState('')
  const [note, setNote] = useState('')
  const [resetLink, setResetLink] = useState(null)
  const [busy, setBusy] = useState(false)
  const [invite, setInvite] = useState(null) // { email } once the invite link checks out
  const heading = useRef(null)
  useEffect(() => { heading.current?.focus(); document.title = `${TITLES[mode]} · Tamago` }, [mode])
  useEffect(() => {
    if (mode !== 'invite') return
    if (!auth.invitesOpen) { setError('Sign-up isn’t open yet.'); return }
    auth.readInvite(code).then(setInvite).catch((err) => setError(err.message))
  }, [mode, code])
  const go = (m) => { setMode(m); setError(''); setNote(''); setResetLink(null); setPassword('') }

  const submit = async (e) => {
    e.preventDefault()
    if (busy) return
    setError(''); setNote('')
    try {
      setBusy(true)
      if (mode === 'signin') { const u = await auth.signIn({ email, password }); await onSignedIn(u, 'signin') }
      if (mode === 'invite') {
        const bad = checkScreenName(screenName) || checkPassword(password)
        if (bad) throw new Error(bad)
        const u = await auth.acceptInvite({ code, password, screenName })
        await onSignedIn(u, 'invite')
      }
      if (mode === 'forgot') {
        const r = await auth.requestPasswordReset(email)
        setNote('If that email has an account, a link to reset the password is on its way.')
        setResetLink(r.link)
      }
      if (mode === 'reset') {
        await auth.resetPassword({ token, password })
        go('signin'); setNote('Password changed. Sign in with the new one.')
      }
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 ref={heading} tabIndex={-1} className="text-xl font-semibold focus:outline-none">{TITLES[mode]}</h1>
      </header>
      {auth?.mode === 'mock' && (
        <p className="rounded-xl border-2 border-dashed border-line p-3 text-sm text-muted" data-mock-note>
          Mock Accounts: kept on this device only, nothing is sent. Demo accounts ({auth.demo.emails.join(', ')}) all use the password {auth.demo.phrase}.
        </p>
      )}
      {mode === 'invite' && !invite
        ? <>{error ? <p role="alert" className="text-sm font-medium text-wrong">{error}</p> : <p className="text-muted">Checking the invite…</p>}
            <p className="text-sm text-muted">Everything works without an account, on this device.</p></>
        : (
          <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
            {mode === 'invite' && <p>Invited as <span className="font-semibold">{invite.email}</span>.</p>}
            {['signin', 'forgot'].includes(mode) && <Field label="Email" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} required />}
            {mode === 'invite' && <Field label="Screen Name" help="Shown in discussions once they open." autoComplete="nickname" maxLength={30} value={screenName} onChange={(e) => setScreenName(e.target.value)} required />}
            {mode !== 'forgot' && <Field label={mode === 'reset' ? 'New Password' : 'Password'} help={mode === 'signin' ? null : 'At least 8 characters.'} type="password"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} value={password} onChange={(e) => setPassword(e.target.value)} required />}
            {error && <p role="alert" className="text-sm font-medium text-wrong">{error}</p>}
            {note && <p role="status" className="text-sm">{note}</p>}
            {resetLink && (
              <a href={resetLink} className="btn-secondary text-center" data-reset-link>Open the Reset Link (Mock Email)</a>
            )}
            <button type="submit" disabled={busy} className="btn-submit">{{ signin: 'Sign In', invite: 'Create Account', forgot: 'Send Reset Link', reset: 'Save New Password' }[mode]}</button>
          </form>
        )}
      <div className="flex flex-col items-start gap-3 text-sm">
        {mode === 'signin' && <>
          <button onClick={() => go('forgot')} className="underline">Forgot Password?</button>
          <p className="text-muted">New accounts are by invite.</p>
        </>}
        {mode !== 'signin' && <button onClick={() => go('signin')} className="underline">Back to Sign In</button>}
      </div>
    </main>
  )
}
