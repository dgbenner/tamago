// Storybook for the design-system demonstration (branch design-system; never part of the app's build).
export default {
  framework: {
    name: '@storybook/react-vite',
    // Its own small Vite config: the app's (vite.config.js) carries the service worker, the labs and StatCounter.
    options: { builder: { viteConfigPath: '.storybook/vite.config.js' } },
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx)'],
  addons: ['@storybook/addon-docs'],
  // Only the pictures the stories use (sushi, flags, the logo): the published copy carries no recordings or app icons.
  staticDirs: [{ from: '../public/sushi', to: '/sushi' }, { from: '../public/flags', to: '/flags' }, { from: '../public/logo.webp', to: '/logo.webp' }],
  // No usage reporting, and no "what's new" lookups: Storybook itself calls no server.
  core: { disableTelemetry: true, disableWhatsNewNotifications: true },
}
