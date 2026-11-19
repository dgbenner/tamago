// The app's buttons, by kind. Each kind is one class from src/index.css, so a Button looks exactly like the plain
// <button className="btn-..."> it replaces (design-system branch); every other setting passes straight through.
//   submit     yellow, the main action: Check, Done, Start Lesson, Next Lesson
//   primary    green: Continue
//   secondary  outlined
//   tertiary   a quiet text link: Back, Slow, Show Words, Can't Listen Now
const CLASS = { submit: 'btn-submit', primary: 'btn-primary', secondary: 'btn-secondary', tertiary: 'btn-tertiary' }
export default function Button({ kind = 'submit', className = '', ...rest }) {
  return <button {...rest} className={className ? `${CLASS[kind]} ${className}` : CLASS[kind]} />
}
