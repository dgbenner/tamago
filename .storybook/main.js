// Storybook for the design-system demonstration (branch design-system; never part of the app's build).
export default {
  framework: {
    name: '@storybook/react-vite',
    // Its own small Vite config: the app's (vite.config.js) carries the service worker, the labs and StatCounter.
    options: { builder: { viteConfigPath: '.storybook/vite.config.js' } },
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx)'],
  addons: ['@storybook/addon-docs'],
  core: { disableTelemetry: true },
}
