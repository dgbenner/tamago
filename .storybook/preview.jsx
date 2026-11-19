import { sb } from 'storybook/test'
import './platform.css' // the iOS and Android styles; never loaded by the app. First, so its layer order holds
import '../src/index.css' // the app's own styles and colours, so components look as they do in the app
import './preview.css'
import '@fontsource-variable/roboto' // Android's typeface, served from this project (no outside request)
import { App as KonstaApp } from 'konsta/react'
import { StyleProvider } from '../src/components/style/StyleContext.jsx'
import { platformParts } from '../src/components/platform/index.js'

// The answer bar asks the server why an answer was wrong. Stories never call the server: the function is replaced
// with a stand-in that answers nothing unless a story gives it an explanation.
sb.mock(import('../src/lib/explain.js'))
// Sound: the real module, watched, so a story can replace play() with silence (AudioHelp).
sb.mock(import('../src/lib/audio.js'), { spy: true })

export default {
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true }, // the page colour comes from src/index.css (--bg)
    viewport: {
      options: {
        phone: { name: 'Phone (390 px)', styles: { width: '390px', height: '844px' }, type: 'mobile' },
        desktop: { name: 'Desktop (1440 px)', styles: { width: '1440px', height: '900px' }, type: 'desktop' },
      },
    },
    options: { storySort: { order: ['Design System Card', 'Styles', 'Colors', 'Type and Spacing', 'Icons', 'Components'] } },
  },
  globalTypes: {
    style: {
      description: 'Tamago, iOS or Android',
      toolbar: { title: 'Style', icon: 'paintbrush', items: [{ value: 'tamago', title: 'Tamago' }, { value: 'ios', title: 'iOS' }, { value: 'android', title: 'Android' }], dynamicTitle: true },
    },
    theme: {
      description: 'Light or dark, as the app sets it (data-theme on the page)',
      toolbar: { title: 'Theme', icon: 'mirror', items: [{ value: 'light', title: 'Light', icon: 'sun' }, { value: 'dark', title: 'Dark', icon: 'moon' }], dynamicTitle: true },
    },
  },
  initialGlobals: { style: 'tamago', theme: 'light', viewport: { value: 'phone', isRotated: false } },
  decorators: [
    (Story, context) => {
      // What App.jsx does with the theme setting.
      const dark = context.globals.theme === 'dark'
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
      // Tamago: nothing is added, so a story draws exactly as the app does.
      const style = context.globals.style ?? 'tamago'
      if (style === 'tamago' || context.viewMode === 'docs') return <Story />
      // iOS and Android: Konsta UI's App wrapper sets the platform, and the components get their platform parts.
      return (
        <StyleProvider style={style} parts={platformParts}>
          <KonstaApp theme={style === 'ios' ? 'ios' : 'material'} dark={dark} safeAreas={false} className={`tg-platform ${dark ? 'dark' : ''}`}>
            <Story />
          </KonstaApp>
        </StyleProvider>
      )
    },
  ],
}
