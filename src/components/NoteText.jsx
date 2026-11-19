import { TL } from '../lib/course.js'
import { parseNote } from '../lib/note-text.js'

// The text of a grammar note or a circle overview (src/lib/note-text.js): target-language runs in bold and marked
// with the course language, so a screen reader says them in that language; English at regular weight. A note's lines
// stack; its paragraphs are spaced. `inline` is for a one-line summary inside a sentence-sized slot.
export default function NoteText({ text, className = '', inline = false }) {
  const paras = parseNote(text)
  const run = (r, i) => (r.tl ? <strong key={i} lang={TL} className="font-semibold">{r.text}</strong> : <span key={i}>{r.text}</span>)
  if (inline) return <span className={className}>{paras.flat(2).map(run)}</span>
  return (
    <div className={`flex flex-col gap-3 ${className}`} data-note-text>
      {paras.map((lines, p) => <p key={p}>{lines.map((runs, l) => <span key={l} className="block">{runs.map(run)}</span>)}</p>)}
    </div>
  )
}
