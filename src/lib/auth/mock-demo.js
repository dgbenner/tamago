// TEST FIXTURE, NOT A SECRET (accounts layer 1, Dan, 2026-11-11). The mock account service's demo accounts, made on
// the device the first time the mock runs, so the screens and the console can be tried with nothing sent anywhere.
// They exist only in the mock (IndexedDB on one device): only mock.js imports this file, mock.js is left out of a
// VITE_AUTH=supabase build, and nothing creates these accounts on the real service. The shared demo phrase is put
// together at runtime and shown on the Sign In screen in mock mode; it unlocks nothing outside that device.
export const DEMO_ACCOUNTS = [
  ['admin@tamago.test', 'Admin Demo', 'admin'],
  ['reviewer@tamago.test', 'Reviewer Demo', 'reviewer'],
  ['contributor@tamago.test', 'Contributor Demo', 'contributor'],
  ['learner@tamago.test', 'Learner Demo', 'learner'],
]
export const demoPhrase = () => ['tamago', 'mock'].join('-')
