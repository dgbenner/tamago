import { useEffect, useRef } from 'react'
import { IconBack } from './icons.jsx'

// Privacy (Dan, 2026-11-15, before testers): plain words on what stays on the device, what the Claude features send,
// and that StatCounter is the only tracking. Opened from Settings. Keep it true to the code: when something here
// changes (real accounts, a new Claude feature), change this page with it.
export default function Privacy({ onBack }) {
  const heading = useRef(null)
  useEffect(() => { heading.current?.focus() }, [])
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 ref={heading} tabIndex={-1} className="text-xl font-semibold outline-none">Privacy</h1>
      </header>
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold">On This Device</h2>
        <p>Your progress, settings, the words you've met, your flags and your learning time are kept in this browser on this device. Nothing of it leaves the device unless you sign in, which keeps a copy of your progress in your account.</p>
        <p>Recordings of your voice in Speak and Compare stay in memory while the question is on screen. They aren't saved or sent anywhere.</p>
        <p>Clearing this site's data in your browser removes all of it.</p>
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold">What the Claude Features Send</h2>
        <p>Some features ask Claude, an AI model made by Anthropic, through Tamago's server. Only what the feature needs is sent, with no name or email:</p>
        <ul className="list-disc pl-5">
          <li><span className="font-medium">Why?</span> after a wrong typed answer: the sentence, its accepted answers, your answer and the word hints.</li>
          <li><span className="font-medium">Self-Study</span> new sentences and listening: the words you've met and their meanings.</li>
          <li><span className="font-medium">Conversations</span>: what you and your partner say in that conversation.</li>
          <li><span className="font-medium">Write a Message</span>: the task and your message.</li>
        </ul>
        <p>Tamago's server passes these on and keeps nothing. Anthropic handles them under its API terms.</p>
        <p>Speaking in Conversations uses your browser's own speech recognition. Some browsers send that audio to their maker to turn it into text.</p>
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold">Tracking</h2>
        <p>None beyond StatCounter, which counts visits: pages opened, the kind of browser and device, and a rough location from your internet address. It may set its own cookie to tell new visits from returning ones. There are no ads, no other trackers, and nothing is sold.</p>
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="font-semibold">Age</h2>
        <p>Accounts are for people 13 or older.</p>
      </section>
    </main>
  )
}
