import { useEffect, useState } from 'react'
import { DAILY_CAP, converseReady, talksLeft } from '../lib/converse.js'
import NeedsSetup from './NeedsSetup.jsx'
import { IconBack } from './icons.jsx'
import { COURSES, chooseCourse, course } from '../lib/course.js'
import { Block } from './Make.jsx'
import UnderConstruction from '../components/UnderConstruction.jsx'

// Conversations, a tool of its own (Dan, 2026-11-13; it was the last block of Self-Study): the conversation partner,
// open to any learner whatever their place on the tree, once the API key is set and 10 words are met. The three set
// scenes stay on the tree, after the second help circle.

// The conversation partner, version 2 (Dan, 2026-11-15): five scenes, one A1 task each, using only the learner's
// words; the ones that fit their progress come first. A scene that doesn't fit yet stays visible and tappable (no
// locks), faded, under Later. Free Conversation stays. A daily cap per device keeps the cost in hand.
function Scene({ scene, onStart, disabled, later }) {
  return (
    <li>
      <button onClick={() => onStart(scene)} disabled={disabled} data-scene={scene.id}
        className={`flex w-full flex-col items-start gap-0.5 rounded-xl border-2 border-line bg-surface p-3 text-left ${later ? 'opacity-60' : ''}`}>
        <span className="font-semibold">{scene.title}</span>
        <span className="text-sm text-muted">{scene.about}</span>
        {scene.have > 0 && <span className="text-xs text-muted">{scene.met} of {scene.have} key words met</span>}
      </button>
    </li>
  )
}

function Partner({ partner, onStart }) {
  const enough = partner.metCount >= 10
  const left = talksLeft()
  const off = !enough || left <= 0
  const fits = partner.scenes.filter((x) => x.fits)
  const later = partner.scenes.filter((x) => !x.fits)
  return (
    <Block title="Conversation Partner" text={enough ? `Listen and answer in ${course.name}, spoken or typed: 6 to 8 exchanges, about 3 minutes. Never graded` : 'Meet 10 words first'}>
      <label className="flex flex-col gap-1">
        <span className="text-sm text-muted">Language</span>
        <select value={course.id} onChange={(e) => chooseCourse(e.target.value)} className="min-h-11 rounded-xl border-2 border-field bg-surface px-3 text-base">
          {COURSES.filter((c) => c.ready).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </label>
      <p className="text-sm text-muted" data-talks-left>{left > 0 ? `${left} of ${DAILY_CAP} left today on this device` : `Today's ${DAILY_CAP} conversations on this device are used. More tomorrow.`}</p>
      {fits.length > 0 && (
        <>
          <h3 className="mt-2 text-sm text-muted">Fits Your Words</h3>
          <ul className="flex flex-col gap-2">{fits.map((x) => <Scene key={x.id} scene={x} onStart={onStart} disabled={off} />)}</ul>
        </>
      )}
      {later.length > 0 && (
        <>
          <h3 className="mt-2 text-sm text-muted">Later</h3>
          <ul className="flex flex-col gap-2">{later.map((x) => <Scene key={x.id} scene={x} onStart={onStart} disabled={off} later />)}</ul>
        </>
      )}
      <h3 className="mt-2 text-sm text-muted">Anything</h3>
      <ul className="flex flex-col gap-2"><Scene scene={partner.free} onStart={onStart} disabled={off} /></ul>
    </Block>
  )
}

export default function Conversations({ partner, onPartner, onBack }) {
  const [talkReady, setTalkReady] = useState(null)
  useEffect(() => { converseReady().then(setTalkReady) }, [])
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Conversations</h1>
      </header>
      <UnderConstruction />
      {talkReady === false && <NeedsSetup title="Conversation Partner">A short spoken or typed exchange with Claude in {course.name}, kept to the words you know. Needs the API key.</NeedsSetup>}
      {talkReady === null && <p className="text-sm text-muted">Checking…</p>}
      {talkReady && <Partner partner={partner} onStart={onPartner} />}
    </main>
  )
}
