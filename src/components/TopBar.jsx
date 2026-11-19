import { IconGear } from '../screens/icons.jsx'
import { LogoInline, SushiMark } from './Logo.jsx'
import { usePlatformPart } from './style/StyleContext.jsx'

// The main page's header: the course flag (opens the language pop-up), the wordmark (reloads the app), and the gear
// (Settings). Pinned, and short. On a wide screen the logo, with its sushi, sits left and the rest right, like a
// desktop site. Lifted from Home.jsx unchanged (design-system branch). start: anything to show before the flag.
function TamagoTopBar({ flag, languageName, onLanguage, onLogo, onSettings, start = null }) {
  return (
    <header className="bar-top home-header -mx-4 flex items-center justify-between gap-3 px-4 pt-[max(2px,env(safe-area-inset-top))] pb-0 lg:mx-0 lg:px-0 lg:pt-[2.5px]">
      {/* The course flag (points sat here until they were hidden): opens the language pop-up. */}
      <span className="hdr-lang flex w-20 items-center justify-start gap-2 lg:order-2 lg:w-auto lg:justify-end lg:-translate-x-[2px]">
        {start}
        <button onClick={onLanguage} aria-label={`Language: ${languageName}`} className="icon-btn -ml-2 lg:ml-0"><img src={flag} alt="" className="h-8 w-8 object-contain" /></button>
      </span>
      {/* The logo reloads the app, opening screen and version name included, as on a fresh launch (Dan, 2026-11-11). */}
      <button type="button" onClick={onLogo} aria-label="Tamago, reload"
        className="hdr-brand flex cursor-pointer items-center gap-2 rounded-lg lg:order-1 lg:mr-auto lg:ml-[2px] lg:gap-[3px]">
        <SushiMark className="hdr-sushi relative hidden w-11 lg:block lg:w-[2.18rem] lg:-top-[2px]" />
        <LogoInline className="hdr-wordmark" />
      </button>
      <span className="hdr-gear flex w-20 justify-end lg:order-3 lg:w-auto lg:-ml-[1.1rem] lg:-translate-x-[2px]"><button onClick={onSettings} aria-label="Settings" className="icon-btn -mr-2"><IconGear /></button></span>
    </header>
  )
}

export default function TopBar(props) {
  const Platform = usePlatformPart('TopBar')
  return Platform ? <Platform {...props} /> : <TamagoTopBar {...props} />
}
