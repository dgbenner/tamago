import { sb } from 'storybook/test'
import '../src/index.css' // the app's own styles and colours, so components look as they do in the app
import './preview.css'

// The answer bar asks the server why an answer was wrong. Stories never call the server: the function is replaced
// with a stand-in that answers nothing unless a story gives it an explanation.
sb.mock(import('../src/lib/explain.js'))

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
    options: { storySort: { order: ['Design System Card', 'Components'] } },
  },
  globalTypes: {
    theme: {
      description: 'Light or dark, as the app sets it (data-theme on the page)',
      toolbar: { title: 'Theme', icon: 'mirror', items: [{ value: 'light', title: 'Light', icon: 'sun' }, { value: 'dark', title: 'Dark', icon: 'moon' }], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'light', viewport: { value: 'phone', isRotated: false } },
  decorators: [
    (Story, context) => {
      // What App.jsx does with the theme setting.
      document.documentElement.setAttribute('data-theme', context.globals.theme === 'dark' ? 'dark' : 'light')
      return <Story />
    },
  ],
}
