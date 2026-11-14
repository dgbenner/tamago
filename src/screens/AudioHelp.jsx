import { useState } from 'react'
import { audioKey, play } from '../lib/audio.js'
import { usePlaying } from '../lib/use-playing.js'
import { IconSpeaker } from './icons.jsx'

// Audio help on every listening question (Dan, 2026-11-12, batch 2): the speaker alone up front, no Slow button. After
// the learner's first replay, two text links appear to its right, in the Can't Listen Now style: Slow (clearly slower)
// and Show Words, which shows what was said (`words`) and counts the answer as reading, not listening.
// bare: inside a speech bubble, which is the frame, so the button has none of its own (craft review, 2026-11-14).
export default function AudioHelp({ audio, words = null, wordsShown = false, onShowWords = null, label = 'Play the sentence', bare = false }) {
  const [replayed, setReplayed] = useState(false)
  const playing = usePlaying(audioKey(audio))
  return (
    <>
      <div className="flex items-center gap-2" data-audio-help>
        <button onClick={() => { play(audio); setReplayed(true) }} aria-label={label} className={`inline-flex shrink-0 items-center justify-center ${bare ? '-m-1 h-11 w-11 rounded-full' : 'mr-1 h-16 w-16 rounded-xl border-2 border-line bg-surface'}`}>
          <span aria-hidden="true"><IconSpeaker playing={playing} /></span>
        </button>
        {replayed && <button onClick={() => play(audio, { slow: true })} className="btn-tertiary text-xs" data-slow>Slow</button>}
        {replayed && words && onShowWords && !wordsShown && <button onClick={onShowWords} className="btn-tertiary text-xs" data-show-words>Show Words</button>}
      </div>
      {wordsShown && words}
    </>
  )
}
