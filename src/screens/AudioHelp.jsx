import { useState } from 'react'
import { play } from '../lib/audio.js'
import { IconSpeaker } from './icons.jsx'

// Audio help on every listening question (Dan, 2026-11-12, batch 2): the speaker alone up front, no Slow button. After
// the learner's first replay, two text links appear to its right, in the Can't Listen Now style: Slow (clearly slower)
// and Show Words, which shows what was said (`words`) and counts the answer as reading, not listening.
export default function AudioHelp({ audio, words = null, wordsShown = false, onShowWords = null, label = 'Play the sentence' }) {
  const [replayed, setReplayed] = useState(false)
  return (
    <>
      <div className="flex items-center gap-2" data-audio-help>
        <button onClick={() => { play(audio); setReplayed(true) }} aria-label={label} className="mr-1 inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-2 border-line bg-surface">
          <span aria-hidden="true"><IconSpeaker /></span>
        </button>
        {replayed && <button onClick={() => play(audio, { slow: true })} className="btn-tertiary text-xs" data-slow>Slow</button>}
        {replayed && words && onShowWords && !wordsShown && <button onClick={onShowWords} className="btn-tertiary text-xs" data-show-words>Show Words</button>}
      </div>
      {wordsShown && words}
    </>
  )
}
