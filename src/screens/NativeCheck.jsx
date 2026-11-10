import { useEffect, useMemo, useRef, useState } from 'react'
import { play } from '../lib/audio.js'
import { useRecorder } from '../lib/recorder.js'
import { getKv, putKv, remove } from '../lib/store.js'
import { download, stamp } from '../lib/files.js'
import { IconBack, IconSpeaker } from './icons.jsx'

// The native-speaker check (Phase 4), for the person Dan arranges. Every sentence Tamago wrote itself (source
// tamago_original), one at a time: natural or not, a corrected version, a note, and a recording. Results stay on
// the device until "Save the results" writes one file for Dan; scripts/import-native-check.mjs folds it in.
const audioKey = (id) => `native_audio_${id}`
const toDataUrl = (blob) => new Promise((resolve) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.readAsDataURL(blob) })

export default function NativeCheck({ sentences, results, onChange, onBack }) {
  const firstOpen = Math.max(0, sentences.findIndex((s) => !results[s.sentence_id]))
  const [index, setIndex] = useState(firstOpen)
  const s = sentences[index]
  const r = results[s.sentence_id] ?? {}
  const marked = sentences.filter((x) => results[x.sentence_id]?.verdict).length
  const recorded = sentences.filter((x) => results[x.sentence_id]?.recorded).length
  const set = (patch) => onChange({ ...results, [s.sentence_id]: { ...r, ...patch, checked_at: new Date().toISOString() } })
  const go = (i) => setIndex(Math.min(sentences.length - 1, Math.max(0, i)))
  const nextOpen = () => {
    const after = sentences.findIndex((x, i) => i > index && !results[x.sentence_id]?.verdict)
    go(after >= 0 ? after : sentences.findIndex((x) => !results[x.sentence_id]?.verdict))
  }
  const save = async () => {
    const out = []
    for (const x of sentences) {
      const res = results[x.sentence_id]
      if (!res) continue
      const blob = res.recorded ? await getKv(audioKey(x.sentence_id)) : null
      out.push({ sentence_id: x.sentence_id, french: x.french, english: x.english, ...res, audio: blob ? await toDataUrl(blob) : null })
    }
    download(`tamago-native-check-${stamp()}.json`, { app: 'tamago', kind: 'native_check', saved_at: new Date().toISOString(), checker: results.$checker ?? '', license_agreed: Boolean(results.$license), results: out })
  }
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Native-Speaker Check</h1>
      </header>
      <p className="text-sm text-muted">
        For a native French speaker. Is each sentence something a French speaker would say, and does the English match?
        Fix anything that's off, and record the sentence if you can. When you're done, save the results and send the file to Dan.
      </p>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Your name (optional, for the credits)</span>
        <input value={results.$checker ?? ''} maxLength={60} onChange={(e) => onChange({ ...results, $checker: e.target.value })}
          className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base" />
      </label>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" checked={Boolean(results.$license)} onChange={(e) => onChange({ ...results, $license: e.target.checked })} className="mt-1 size-4" />
        <span>My recordings may be used in Tamago and shared under CC BY-SA 4.0, credited to the name above. Without this, they stay unused.</span>
      </label>
      <p className="text-sm text-muted">{marked} of {sentences.length} checked · {recorded} recorded</p>

      <Card key={s.sentence_id} s={s} r={r} set={set} position={`${index + 1} of ${sentences.length}`} />

      <div className="flex gap-2">
        <button onClick={() => go(index - 1)} disabled={index === 0} className="btn-secondary flex-1">Previous</button>
        <button onClick={() => go(index + 1)} disabled={index === sentences.length - 1} className="btn-secondary flex-1">Next</button>
      </div>
      {marked < sentences.length && <button onClick={nextOpen} className="btn-secondary">Next Unchecked</button>}
      <button onClick={save} disabled={marked === 0} className="btn-secondary">Save the Results</button>
    </main>
  )
}

function Card({ s, r, set, position }) {
  const rec = useRecorder()
  const [saved, setSaved] = useState(null) // object URL of the kept recording
  const kept = useRef(null)
  useEffect(() => {
    let url = null
    if (r.recorded) getKv(audioKey(s.sentence_id)).then((b) => { if (b) { url = URL.createObjectURL(b); setSaved(url) } })
    return () => { if (url) URL.revokeObjectURL(url) }
  }, [])
  // A finished recording is kept at once, replacing any earlier one.
  useEffect(() => {
    if (!rec.blob) return
    putKv(audioKey(s.sentence_id), rec.blob)
    if (saved) URL.revokeObjectURL(saved)
    setSaved(URL.createObjectURL(rec.blob))
    set({ recorded: true })
  }, [rec.blob])
  const playSaved = () => { kept.current ??= new Audio(); kept.current.src = saved; kept.current.play().catch(() => {}) }
  const drop = () => { remove('kv', audioKey(s.sentence_id)); setSaved(null); rec.reset(); set({ recorded: false }) }
  const unit = useMemo(() => `${s.unit_title} · ${s.sentence_id}`, [s])
  return (
    <section className="flex flex-col gap-4 rounded-xl border-2 border-line bg-surface p-4">
      <p className="text-sm text-muted">{position} · {unit}</p>
      <div className="flex items-start gap-3">
        <button onClick={() => play({ french: s.french, file: null })} aria-label="Play the computer voice" className="icon-btn -m-1 shrink-0 [&_svg]:size-5"><IconSpeaker /></button>
        <div>
          <p lang="fr" className="text-xl">{s.french}</p>
          <p className="text-muted">{s.english}</p>
        </div>
      </div>
      <div className="flex overflow-hidden rounded-xl border-2 border-line">
        {[['ok', 'Natural'], ['fix', 'Needs a fix']].map(([v, label]) => (
          <button key={v} aria-pressed={r.verdict === v} onClick={() => set({ verdict: v })}
            className={`min-h-11 flex-1 text-sm ${r.verdict === v ? 'bg-orange font-semibold text-white' : 'bg-surface'}`}>{label}</button>
        ))}
      </div>
      {r.verdict === 'fix' && (
        <>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Corrected French</span>
            <input lang="fr" defaultValue={r.french_fix ?? s.french} onBlur={(e) => set({ french_fix: e.target.value.trim() })} autoCapitalize="sentences"
              className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Corrected English (if it changes)</span>
            <input defaultValue={r.english_fix ?? s.english} onBlur={(e) => set({ english_fix: e.target.value.trim() })}
              className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base" />
          </label>
        </>
      )}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Note (optional)</span>
        <textarea defaultValue={r.note ?? ''} rows={2} onBlur={(e) => set({ note: e.target.value.trim() })}
          className="rounded-xl border-2 border-field bg-surface px-3 py-2 text-base" />
      </label>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Recording{r.verdict === 'fix' ? ' (of the corrected French)' : ''}</p>
        {rec.state === 'unavailable'
          ? <p className="text-sm text-muted">No microphone here, or permission was refused.</p>
          : (
            <div className="flex gap-2">
              {rec.state === 'recording'
                ? <button onClick={rec.stop} className="btn-secondary flex-1">Stop</button>
                : <button onClick={rec.start} className="btn-secondary flex-1">{saved ? 'Record again' : 'Record'}</button>}
              {saved && rec.state !== 'recording' && <button onClick={playSaved} className="btn-secondary flex-1">Play</button>}
              {saved && rec.state !== 'recording' && <button onClick={drop} className="btn-secondary flex-1">Delete</button>}
            </div>
          )}
      </div>
    </section>
  )
}
