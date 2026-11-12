// Accounts, layer 1 (Dan, 2026-11-11; _source/accounts-spec.md). One interface (auth/index.js), two adapters:
//   mock      on this device only (IndexedDB), with demo accounts; tonight's build, nothing leaves the device
//   supabase  Supabase Auth with row-level security; plugs in later with no screen changes
//   off       no accounts at all
// Chosen at build time by VITE_AUTH (default mock), so the unused adapter is left out of the bundle.
export const AUTH_MODE = ['mock', 'supabase', 'off'].includes(import.meta.env?.VITE_AUTH) ? import.meta.env.VITE_AUTH : 'mock'
// Public sign-up stays off until Dan approves it (VITE_SIGNUP=open). The mock lets anyone make a device-only account
// so the screens can be tried; with Supabase the Sign Up screen says sign-up isn't open yet.
export const SIGNUP_OPEN = AUTH_MODE === 'mock' || import.meta.env?.VITE_SIGNUP === 'open'
export const ROLES = ['learner', 'contributor', 'reviewer', 'admin']
// Who reaches what (spec, Screens): the console's Users section is admin only; Review and Contribute are placeholders
// for their roles, and admins see them too.
export const can = {
  console: (u) => ['admin', 'reviewer', 'contributor'].includes(u?.role),
  users: (u) => u?.role === 'admin',
  review: (u) => ['admin', 'reviewer'].includes(u?.role),
  contribute: (u) => ['admin', 'contributor'].includes(u?.role),
}
// The mock's demo accounts, shown on the Sign In screen in mock mode only.
export const MOCK_PASSWORD = 'tamago-mock'
export const MOCK_ACCOUNTS = [
  ['admin@tamago.test', 'Admin Demo', 'admin'],
  ['reviewer@tamago.test', 'Reviewer Demo', 'reviewer'],
  ['contributor@tamago.test', 'Contributor Demo', 'contributor'],
  ['learner@tamago.test', 'Learner Demo', 'learner'],
]
// The same checks in every adapter and on the screens.
export const checkPassword = (p) => (String(p ?? '').length < 8 ? 'Use at least 8 characters.' : null)
export const checkScreenName = (n) => (!String(n ?? '').trim() ? 'Choose a screen name.' : String(n).trim().length > 30 ? 'Use at most 30 characters.' : null)
