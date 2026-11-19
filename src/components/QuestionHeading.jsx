import { useState } from 'react'
import { TL, course } from '../lib/course.js'
import { courseHeading } from '../lib/instructions.js'

// The question's heading text ("Translate", "Pick the Meaning"). Lifted from Lesson.jsx (design-system branch); the
// only change is that it is handed the part number instead of looking it up from the unit.
// The heading in the course language from Part 3 on (src/lib/instructions.js), phased in by part; a tap shows the
// English beside it, and screen readers always hear the English too.
export default function QuestionHeading({ english, part = 0 }) {
  const [open, setOpen] = useState(false)
  const own = courseHeading(english, part, course.id)
  if (!own) return english
  return (
    <>
      <button type="button" lang={TL} onClick={() => setOpen(!open)} aria-expanded={open} data-course-heading className="text-left decoration-line decoration-dotted decoration-2 underline-offset-4 hover:underline">{own}</button>
      {open ? <span lang="en" className="ml-2 text-base font-normal text-muted" data-heading-english>{english}</span> : <span lang="en" className="sr-only"> ({english})</span>}
    </>
  )
}
