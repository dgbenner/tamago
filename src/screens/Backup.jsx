import { useRef, useState } from 'react'
import { dumpAll, restoreAll } from '../lib/store.js'
import { download, readJson, stamp } from '../lib/files.js'

// The backup file (Phase 4; on the Developer page since 2026-11-11, Dan): one file with everything Tamago stores on
// this device, for moving progress between devices without an account. Restoring replaces it all, after a second tap.
export default function Backup() {
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
      <div className="flex flex-col gap-2">
        <p className="font-medium">Backup</p>
        <p className="-mt-1 text-sm text-muted">One file with all your progress, settings and recordings. Restore it on another device or browser to carry on there. Moving progress without an account.</p>
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
  )
}
