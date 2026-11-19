import { IconClose } from '../screens/icons.jsx'

// Wrong (Dan, 2026-11-12): the learner's answer turns red, with a red X and "Incorrect" to its right.
export default function WrongMark({ className = '' }) {
  return <span data-wrong-mark className={`inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-wrong [&_svg]:size-4 ${className}`}><IconClose />Incorrect</span>
}
