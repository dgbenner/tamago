import { useRef, useState } from 'react'
import { dumpAll, restoreAll } from '../lib/store.js'
import { download, readJson, stamp } from '../lib/files.js'
import NeedsSetup from './NeedsSetup.jsx'
import { IconBack } from './icons.jsx'

// Profile and backup (Phase 4). With no account the screen name stays on this device. Signed in (accounts layer 1,
// Dan, 2026-11-11), this is the account's Profile: the screen name is the account's, with the email, Change Password
// and Sign Out. A backup file still moves progress between devices without an account: it holds everything Tamago
// stores, and restoring replaces it all.
export default function Profile({ profile, onChange, onBack, auth = null, user = null, onSignIn, onSignOut }) {
  const [name, setName] = useState(user?.screen_name ?? profile.screen_name ?? '')
  const [pw, setPw] = useState({ current: '', next: '' })
  const [accountNote, setAccountNote] = useState({ kind: '', text: '' })
  const saveName = async () => {
    const n = name.trim()
    onChange({ screen_name: n })
    if (!user || n === user.screen_name) return
    try { await auth.updateProfile({ screenName: n }); setAccountNote({ kind: 'ok', text: 'Screen name saved.' }) } catch (err) { setAccountNote({ kind: 'error', text: err.message }) }
  }
  const changePassword = async (e) => {
    e.preventDefault()
    try { await auth.changePassword(pw); setPw({ current: '', next: '' }); setAccountNote({ kind: 'ok', text: 'Password changed.' }) } catch (err) { setAccountNote({ kind: 'error', text: err.message }) }
  }
  const [restoring, setRestoring] = useState(null) // the parsed backup, waiting for a second tap
  const [message, setMessage] = useState('')
  const input = useRef(null)
  const save = async () => { download(`tamago-backup-${stamp()}.json`, await dumpAll()); setMessage('Backup saved to your downloads.') }
  const pick = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const backup = await readJson(file)
      if (backup?.app !== 'tamago') throw new Error('This file is not a Tamago backup.')
      setRestoring(backup); setMessage('')
    } catch (err) { setMessage(err.message.startsWith('This') ? err.message : 'This file is not a Tamago backup.') }
  }
  const restore = async () => {
    try { await restoreAll(restoring); location.reload() } catch (err) { setMessage(err.message); setRestoring(null) }
  }
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">{user ? 'Profile' : 'Profile and Backup'}</h1>
      </header>
      {user && <p className="-mt-3 text-sm text-muted" data-signed-in>Signed in as {user.email}{auth?.mode === 'mock' ? ' (mock account, this device only)' : ''}</p>}
      <label className="flex flex-col gap-2">
        <span className="font-medium">Screen Name</span>
        <span className="-mt-1 text-sm text-muted">Shown in discussions once they open.{user ? '' : ' Stays on this device unless you sign in.'}</span>
        <input value={name} maxLength={30} autoComplete="nickname" onChange={(e) => setName(e.target.value)} onBlur={saveName}
          className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base" />
      </label>
      {user ? (
        <>
          <form onSubmit={changePassword} className="flex flex-col gap-3">
            <p className="font-medium">Change Password</p>
            <input type="password" aria-label="Current Password" placeholder="Current Password" autoComplete="current-password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })}
              className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base" />
            <input type="password" aria-label="New Password" placeholder="New Password (8 or More Characters)" autoComplete="new-password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })}
              className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base" />
            <button type="submit" className="btn-secondary">Change Password</button>
          </form>
          {accountNote.text && <p role={accountNote.kind === 'error' ? 'alert' : 'status'} className={`text-sm ${accountNote.kind === 'error' ? 'font-medium text-wrong' : ''}`}>{accountNote.text}</p>}
          <button onClick={onSignOut} className="btn-secondary">Sign Out</button>
        </>
      ) : auth ? (
        <div className="flex flex-col gap-2">
          <p className="font-medium">Account</p>
          <p className="-mt-1 text-sm text-muted">Optional. Signing in keeps a copy of your progress in your account; everything works without one.</p>
          <button onClick={onSignIn} className="btn-secondary">Sign In</button>
        </div>
      ) : <NeedsSetup title="Email and Sign-In">Signing in, and syncing progress across devices, need an account service. Until then everything stays on this device; a backup file moves it.</NeedsSetup>}
      <div className="flex flex-col gap-2">
        <p className="font-medium">Backup</p>
        <p className="-mt-1 text-sm text-muted">One file with all your progress, settings and recordings. Restore it on another device or browser to carry on there.</p>
        <button onClick={save} className="btn-secondary">Save a Backup</button>
        <button onClick={() => input.current.click()} className="btn-secondary">Restore from a Backup</button>
        <input ref={input} type="file" accept="application/json,.json" onChange={pick} className="hidden" />
        {restoring && (
          <div className="flex flex-col gap-2 rounded-xl border-2 border-line bg-surface p-3">
            <p className="text-sm">Backup from {new Date(restoring.saved_at).toLocaleString()}. Restoring replaces everything on this device.</p>
            <div className="flex gap-2">
              <button onClick={() => setRestoring(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={restore} className="btn-secondary flex-1">Replace and Restore</button>
            </div>
          </div>
        )}
        {message && <p role="status" className="text-sm text-muted">{message}</p>}
      </div>
    </main>
  )
}
