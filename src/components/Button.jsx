// The app's buttons, by kind. Each kind is one class from src/index.css, so a Button looks exactly like the plain
// <button className="btn-..."> it replaces (design-system branch); every other setting passes straight through.
//   main      yellow, the main action: Check, Done, Start Lesson, Next Lesson (class btn-submit)
//   continue  green: Continue (class btn-primary)
//   outline   outlined (class btn-secondary)
//   link      a quiet text link: Back, Slow, Show Words, Can't Listen Now (class btn-tertiary)
// The kinds have plain names; the app's class names stay as they are (Dan, 2026-11-19).
const CLASS = { main: 'btn-submit', continue: 'btn-primary', outline: 'btn-secondary', link: 'btn-tertiary' }
export default function Button({ kind = 'main', className = '', ...rest }) {
  return <button {...rest} className={className ? `${CLASS[kind]} ${className}` : CLASS[kind]} />
}
