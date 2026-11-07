import { play } from '../lib/audio.js'
import { IconBack, IconSpeaker } from './icons.jsx'

function Segmented({ label, help, value, options, onChange }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="font-medium">{label}</legend>
      {help && <p className="-mt-1 text-sm text-muted">{help}</p>}
      <div className="flex overflow-hidden rounded-xl border border-line">
        {options.map(([v, text]) => (
          <button key={v} aria-pressed={value === v} onClick={() => onChange(v)}
            className={`min-h-11 flex-1 px-2 text-sm ${value === v ? 'bg-accent font-semibold text-accent-ink' : 'bg-surface'}`}>{text}</button>
        ))}
      </div>
    </fieldset>
  )
}

const PAUSE_OPTIONS = [['normal', 'Off'], ['15', '15 min'], ['60', '1 hour'], ['always', 'Always']]
const pauseValue = (until) => {
  if (until === 'always') return 'always'
  if (typeof until !== 'number' || until <= Date.now()) return 'normal'
  return until - Date.now() > 15 * 60 * 1000 ? '60' : '15'
}
const pauseUntil = (v) => (v === 'normal' ? null : v === 'always' ? 'always' : Date.now() + Number(v) * 60 * 1000)

export default function Settings({ settings, onChange, onBack, onAbout }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Settings</h1>
      </header>
      <Segmented label="Answer checking" help="Lenient accepts a one-letter typo and a missing accent." value={settings.answer_strictness}
        options={[['lenient', 'Lenient'], ['strict', 'Strict']]} onChange={(v) => onChange({ answer_strictness: v })} />
      <Segmented label="Typed answers" value={settings.typed_input} options={[['chips', 'Word chips'], ['keyboard', 'Keyboard']]} onChange={(v) => onChange({ typed_input: v })} />
      <Segmented label="Listen first" help="Audio plays with the French hidden until you answer." value={settings.listen_first}
        options={[['on', 'On'], ['off', 'Off']]} onChange={(v) => onChange({ listen_first: v })} />
      <Segmented label="Can't listen now" help="Audio questions swap for reading and writing. Applies from the next lesson." value={pauseValue(settings.cant_listen_until)}
        options={PAUSE_OPTIONS} onChange={(v) => onChange({ cant_listen_until: pauseUntil(v) })} />
      <Segmented label="Can't speak now" help="Speaking questions arrive in a later version." value={pauseValue(settings.cant_speak_until)}
        options={PAUSE_OPTIONS} onChange={(v) => onChange({ cant_speak_until: pauseUntil(v) })} />
      <Segmented label="Theme" value={settings.theme} options={[['system', 'System'], ['light', 'Light'], ['dark', 'Dark']]} onChange={(v) => onChange({ theme: v })} />
      <div className="flex flex-col gap-2">
        <p className="font-medium">Sound</p>
        <p className="-mt-1 text-sm text-muted">Volume follows your device's buttons. If you hear nothing on an iPhone, check the ring switch too.</p>
        <button onClick={() => play({ french: 'Je suis une femme.', file: null })} className="btn-secondary inline-flex items-center justify-center gap-2"><IconSpeaker /> Test sound</button>
      </div>
      <button onClick={onAbout} className="btn-secondary">About the content</button>
    </main>
  )
}
