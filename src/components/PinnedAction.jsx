import Button from './Button.jsx'
import { usePlatformPart } from './style/StyleContext.jsx'

// The main page's one pinned action, at the bottom with a line above, so it is always on screen: "Next Lesson: Say Hi".
// Lifted from Home.jsx (design-system branch); the button is the library's Button, which draws the same class.
function TamagoPinnedAction({ label, onClick }) {
  return (
    <div className="bar-bottom -mx-4 mt-auto flex flex-col gap-3 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="bottom-buttons">
        <Button kind="main" onClick={onClick}>{label}</Button>
      </div>
    </div>
  )
}

export default function PinnedAction(props) {
  const Platform = usePlatformPart('PinnedAction')
  return Platform ? <Platform {...props} /> : <TamagoPinnedAction {...props} />
}
