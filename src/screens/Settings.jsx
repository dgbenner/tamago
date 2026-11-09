import { play } from '../lib/audio.js'
import Logo from './Logo.jsx'
import { IconBack, IconSpeaker } from './icons.jsx'

function Segmented({ label, help, value, options, onChange }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="font-medium">{label}</legend>
      {help && <p className="-mt-1 text-sm text-muted">{help}</p>}
      <div className="flex overflow-hidden rounded-xl border-2 border-line">
        {options.map(([v, text]) => (
          <button key={v} aria-pressed={value === v} onClick={() => onChange(v)}
            className={`min-h-11 flex-1 px-2 text-sm ${value === v ? 'bg-orange font-semibold text-white' : 'bg-surface'}`}>{text}</button>
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

export default function Settings({ settings, onChange, onBack, onAbout, onPlacement, onVariants }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="relative flex justify-center">
        <button onClick={onBack} aria-label="Back" className="icon-btn absolute top-0 left-0 -ml-2"><IconBack /></button>
        <Logo />
      </header>
      <h1 className="text-xl font-semibold">Settings</h1>
      <Segmented label="Answer checking" help="Lenient accepts a one-letter typo and a missing accent." value={settings.answer_strictness}
        options={[['lenient', 'Lenient'], ['strict', 'Strict']]} onChange={(v) => onChange({ answer_strictness: v })} />
      <Segmented label="Typed answers" value={settings.typed_input} options={[['chips', 'Word chips'], ['keyboard', 'Keyboard']]} onChange={(v) => onChange({ typed_input: v })} />
      <Segmented label="Listen first" help="Audio plays with the French hidden until you answer." value={settings.listen_first}
        options={[['on', 'On'], ['off', 'Off']]} onChange={(v) => onChange({ listen_first: v })} />
      <Segmented label="Can't listen now" help="Audio questions swap for reading and writing. Applies from the next lesson." value={pauseValue(settings.cant_listen_until)}
        options={PAUSE_OPTIONS} onChange={(v) => onChange({ cant_listen_until: pauseUntil(v) })} />
      <Segmented label="Can't speak now" help="Speaking questions swap for listening and writing. Applies from the next lesson." value={pauseValue(settings.cant_speak_until)}
        options={PAUSE_OPTIONS} onChange={(v) => onChange({ cant_speak_until: pauseUntil(v) })} />
      <Segmented label="Points and streaks" help="Off hides the points, the streak and the weekly goal." value={settings.points_and_streaks}
        options={[['on', 'On'], ['off', 'Off']]} onChange={(v) => onChange({ points_and_streaks: v })} />
      <fieldset className="flex flex-col gap-2">
        <legend className="font-medium">Weekly goal</legend>
        <p className="-mt-1 text-sm text-muted">Days a week you mean to practise. No reminders, and nothing changes if you miss one.</p>
        <select value={settings.weekly_goal} onChange={(e) => onChange({ weekly_goal: e.target.value })}
          className="min-h-11 rounded-xl border-2 border-line bg-surface px-3 text-base">
          <option value="none">None</option>
          {[1, 2, 3, 4, 5, 6, 7].map((n) => <option key={n} value={String(n)}>{n} {n === 1 ? 'day' : 'days'}</option>)}
        </select>
      </fieldset>
      <div className="flex flex-col gap-2">
        <p className="font-medium">Placement check</p>
        <p className="-mt-1 text-sm text-muted">Know some French already? Three questions per unit; units you pass open the next ones. Nothing is taken away.</p>
        <button onClick={onPlacement} className="btn-secondary">Start the placement check</button>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-medium">Variant test bank</p>
        <p className="-mt-1 text-sm text-muted">Switch question variants between live, testing and off.</p>
        <button onClick={onVariants} className="btn-secondary">Open the variant test bank</button>
      </div>
      <Segmented label="Testing shortcuts" help="Swipe left from the right side of the screen, or press the right arrow, to pass a question as correct. Passes are marked as tests." value={settings.test_shortcuts}
        options={[['on', 'On'], ['off', 'Off']]} onChange={(v) => onChange({ test_shortcuts: v })} />
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
