import { Navbar } from 'konsta/react'
import { IconGear } from '../../screens/icons.jsx'
import IconButton from '../IconButton.jsx'
import { LogoInline } from '../Logo.jsx'
import { useStyle } from '../style/StyleContext.jsx'

// The main page's header in the iOS and Android styles: Konsta UI's Navbar.
// iOS: the wordmark centred, one control each side (flag left, gear right), as a navigation bar.
// Android: the wordmark at the left and both controls at the right, as Material's top app bar puts its actions.
const colors = { bgIos: 'tg-bar-ios', bgMaterial: 'tg-bar-md', textIos: 'tg-ink', textMaterial: 'tg-ink' }
export default function PlatformTopBar({ flag, languageName, onLanguage, onLogo, onSettings, start = null }) {
  const ios = useStyle() === 'ios'
  const language = <IconButton label={`Language: ${languageName}`} onClick={onLanguage}><img src={flag} alt="" className="h-8 w-8 object-contain" /></IconButton>
  const settings = <IconButton label="Settings" onClick={onSettings}><IconGear /></IconButton>
  const logo = <button type="button" onClick={onLogo} aria-label="Tamago, reload" className="tg-bar-logo"><LogoInline /></button>
  return (
    <Navbar component="header" className="tg-topbar" colors={colors} centerTitle={ios} title={logo}
      left={ios ? <>{start}{language}</> : null} right={ios ? settings : <>{start}{language}{settings}</>} />
  )
}
