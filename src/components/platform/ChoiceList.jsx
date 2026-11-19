import { List, ListItem } from 'konsta/react'
import WrongMark from '../WrongMark.jsx'

// The choices in the iOS and Android styles: Konsta UI's List. iOS: an inset grouped list, rows parted by hairlines.
// Android: Material 3 list items with the touch ripple. A row is a button, as in Tamago's. After the answer the right
// row carries a green check, a wrong pick the red "Incorrect", and the rest fade: the same signals as Tamago's edges.
const Check = () => <svg data-right-mark width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--right)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Right"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
const colors = { strongBgIos: 'bg-surface', strongBgMaterial: 'bg-surface' }
const item = { primaryTextIos: 'text-ink', primaryTextMaterial: 'text-ink', touchRipple: 'touch-ripple-black' }
export default function PlatformChoiceList({ choices, result, chosen, answer, onPick, lang }) {
  return (
    <List strong inset dividers colors={colors} className="tg-choices">
      {choices.map((choice) => {
        const state = !result ? '' : choice.toLowerCase() === answer.toLowerCase() ? 'right' : choice === chosen ? 'wrong' : 'other'
        return (
          <ListItem key={choice} link chevron={false} linkComponent="button" colors={item} title={choice} data-choice-state={state || undefined}
            linkProps={{ type: 'button', lang, disabled: Boolean(result), onClick: () => onPick(choice) }}
            after={state === 'right' ? <Check /> : state === 'wrong' ? <WrongMark /> : null} />
        )
      })}
    </List>
  )
}
