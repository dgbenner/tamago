import { play } from '../lib/audio.js'
import Logo from './Logo.jsx'
import { IconBack, IconSpeaker } from './icons.jsx'
import { useEffect, useState } from 'react'
import { explainReady } from '../lib/explain.js'
import NeedsSetup from './NeedsSetup.jsx'

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

const PAUSE_OPTIONS = [['normal', 'Off'], ['15', '15 Min'], ['60', '1 Hour'], ['always', 'Always']]
const pauseValue = (until) => {
  if (until === 'always') return 'always'
  if (typeof until !== 'number' || until <= Date.now()) return 'normal'
  return until - Date.now() > 15 * 60 * 1000 ? '60' : '15'
}
const pauseUntil = (v) => (v === 'normal' ? null : v === 'always' ? 'always' : Date.now() + Number(v) * 60 * 1000)

// Settings come in sections (Dan's test notes: everything at one level was a lot).
function Section({ title, children }) {
  return (
    <section className="flex flex-col gap-5 border-t-2 border-line pt-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  )
}
function Item({ title, help, children }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium">{title}</p>
      {help && <p className="-mt-1 text-sm text-muted">{help}</p>}
      {children}
    </div>
  )
}

export default function Settings({ settings, onChange, onBack, onAbout, onPlacement, onVariants, onProfile, onNativeCheck, onFlags, onForum }) {
  const [explaining, setExplaining] = useState(null)
  useEffect(() => { explainReady().then(setExplaining) }, [])
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 lg:max-w-4xl px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="relative flex justify-center">
        <button onClick={onBack} aria-label="Back" className="icon-btn absolute top-0 left-0 -ml-2"><IconBack /></button>
        <Logo />
      </header>
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="settings-grid">
      <Section title="Lessons">
        <Segmented label="Answer Checking" help="Lenient accepts a one-letter typo and a missing accent." value={settings.answer_strictness}
          options={[['lenient', 'Lenient'], ['strict', 'Strict']]} onChange={(v) => onChange({ answer_strictness: v })} />
        <Segmented label="Typed Answers" value={settings.typed_input} options={[['chips', 'Word Chips'], ['keyboard', 'Keyboard']]} onChange={(v) => onChange({ typed_input: v })} />
        <Segmented label="Listen First" help="Audio plays with the French hidden until you answer." value={settings.listen_first}
          options={[['on', 'On'], ['off', 'Off']]} onChange={(v) => onChange({ listen_first: v })} />
        <Segmented label="Can't Listen Now" help="Audio questions swap for reading and writing. Also on every listening question, at the bottom." value={pauseValue(settings.cant_listen_until)}
          options={PAUSE_OPTIONS} onChange={(v) => onChange({ cant_listen_until: pauseUntil(v) })} />
        <Segmented label="Can't Speak Now" help="Speaking questions swap for listening and writing. Also on every speaking question, at the bottom." value={pauseValue(settings.cant_speak_until)}
          options={PAUSE_OPTIONS} onChange={(v) => onChange({ cant_speak_until: pauseUntil(v) })} />
      </Section>

      <Section title="Sound and Look">
        <Item title="Sound" help="Volume follows your device's buttons. If you hear nothing on an iPhone, check the ring switch too.">
          <button onClick={() => play({ french: 'Je suis une femme.', file: null })} className="btn-secondary inline-flex items-center justify-center gap-2"><IconSpeaker /> Test Sound</button>
        </Item>
        <Segmented label="Theme" value={settings.theme} options={[['system', 'System'], ['light', 'Light'], ['dark', 'Dark']]} onChange={(v) => onChange({ theme: v })} />
      </Section>

      <Section title="Goals">
        <Segmented label="Points and Streaks" help="Off hides the points, the streak and the weekly goal." value={settings.points_and_streaks}
          options={[['on', 'On'], ['off', 'Off']]} onChange={(v) => onChange({ points_and_streaks: v })} />
        <Item title="Weekly Goal" help="Days a week you mean to practise. No reminders, and nothing changes if you miss one.">
          <select value={settings.weekly_goal} onChange={(e) => onChange({ weekly_goal: e.target.value })}
            className="min-h-11 rounded-xl border-2 border-line bg-surface px-3 text-base">
            <option value="none">None</option>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => <option key={n} value={String(n)}>{n} {n === 1 ? 'Day' : 'Days'}</option>)}
          </select>
        </Item>
      </Section>

      <Section title="Your Learning">
        <Item title="Placement Check" help="Know some French already? Three questions per unit; units you pass open the next ones. Nothing is taken away.">
          <button onClick={onPlacement} className="btn-secondary">Start the Placement Check</button>
        </Item>
        <Item title="Profile and Backup" help="Your name, and a backup file of your progress you can restore on another device.">
          <button onClick={onProfile} className="btn-secondary">Profile and Backup</button>
        </Item>
        <Item title="Mistake Explanations">
          {explaining
            ? <p className="-mt-1 text-sm text-muted">On. After a wrong typed answer, a Why? link appears once Claude's explanation is ready.</p>
            : <NeedsSetup title="Claude Explains Mistakes">After a wrong typed answer, a short explanation from Claude. Needs an API key.</NeedsSetup>}
        </Item>
        <button onClick={onAbout} className="btn-secondary">About the Content</button>
      </Section>

      <Section title="Testing (For Dan)">
        <Segmented label="Testing Shortcuts" help="Swipe left from the right side of the screen, or press the right arrow, to pass a question as correct. Passes are marked as tests." value={settings.test_shortcuts}
          options={[['on', 'On'], ['off', 'Off']]} onChange={(v) => onChange({ test_shortcuts: v })} />
        <Item title="Variant Test Bank" help="Switch question variants between live, testing and off.">
          <button onClick={onVariants} className="btn-secondary">Open the Variant Test Bank</button>
        </Item>
        <button onClick={onFlags} className="btn-secondary">Flag Review</button>
        <button onClick={onNativeCheck} className="btn-secondary">Native-Speaker Check</button>
        <button onClick={onForum} className="btn-secondary">Forum</button>
      </Section>
      </div>
    </main>
  )
}
