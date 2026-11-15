import { useEffect, useRef } from 'react'
import { IconBack } from './icons.jsx'
import { course } from '../lib/course.js'
import { EXAMS } from '../lib/finalcheck.js'

// Ready for the Real Exam? (Dan, 2026-11-15): what the real A1 exam is for this course and who runs it, plain facts
// only, no promises. Linked from Progress and from the final check's result. The body's own site has dates, centres,
// fees and the rules; this page never repeats those, since they change.
export default function RealExam({ onBack }) {
  const exam = EXAMS[course.id]
  const heading = useRef(null)
  useEffect(() => { heading.current?.focus() }, [])
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-4 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 ref={heading} tabIndex={-1} className="text-xl font-semibold">Ready for the Real Exam?</h1>
      </header>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">{exam.name}</h2>
        <p>{exam.about}</p>
        {exam.note && <p>{exam.note}</p>}
        <p>Dates, exam centres, fees and how to register are on the {exam.body} site, and change from year to year.</p>
        <a href={exam.official} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center justify-center text-center">{exam.body}</a>
        <a href={exam.samples} target="_blank" rel="noopener noreferrer" className="self-start text-sm underline underline-offset-4">Official sample papers</a>
      </section>
      <section className="flex flex-col gap-2 border-t-2 border-line pt-4">
        <h2 className="font-semibold">Tamago's Final Check</h2>
        <p className="text-sm text-muted">The final check at the end of the course follows the exam's order with this course's own sentences. It is practice, not the exam, and its score says nothing about an exam result.</p>
      </section>
    </main>
  )
}
