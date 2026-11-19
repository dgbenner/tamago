// The iOS and Android versions of the components that Konsta UI has a match for. Storybook hands this list to the
// StyleProvider; the app never imports it, so Konsta UI is not part of the app.
import Button from './Button.jsx'
import ChoiceList from './ChoiceList.jsx'
import ProgressBar from './ProgressBar.jsx'
import Sheet from './Sheet.jsx'
import Toast from './Toast.jsx'
import ToolPill from './ToolPill.jsx'

export const platformParts = { Button, ChoiceList, ProgressBar, Sheet, Toast, ToolPill }
