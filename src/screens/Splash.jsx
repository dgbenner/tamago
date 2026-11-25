import { FlagRow } from '../components/FlagRow.jsx'
import { LETTERS, Letter, LetterStrokes, SushiMark, splashViewBox } from '../components/Logo.jsx'

// The same picture drawn in React, for the design lab only (the app's own is in index.html).
export default function Splash({ choose = false }) {
  return (
    <div className="splash">
      <div className="splash-stack flex w-[min(84vw,430px)] flex-col items-center">
        <svg className="splash-wordmark w-full max-w-none shrink-0 md:w-[114%]" viewBox={splashViewBox} role="img" aria-label="Tamago" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <g className="wm-letters">{LETTERS.map((strokes, i) => <Letter key={i} i={i} spaced><LetterStrokes d={strokes.join('')} /></Letter>)}</g>
        </svg>
        <div className="splash-sushi relative z-10 -mt-[14.5%] w-[37%]"><SushiMark className="w-full" /></div>
        {choose && <div className="flex flex-col items-center pt-[3.8rem]"><h1 className="text-[1.15rem] font-semibold">Choose Your Language</h1><FlagRow size="lg" onPick={() => {}} /></div>}
      </div>
    </div>
  )
}
