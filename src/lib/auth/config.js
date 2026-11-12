// Accounts, layer 1 (Dan, 2026-11-11; _source/accounts-spec.md). One interface (auth/index.js), two adapters:
//   mock      on this device only (IndexedDB), with demo accounts; tonight's build, nothing leaves the device
//   supabase  Supabase Auth with row-level security; plugs in later with no screen changes
//   off       no accounts at all
// Chosen at build time by VITE_AUTH (default mock), so the unused adapter is left out of the bundle.
export const AUTH_MODE = ['mock', 'supabase', 'off'].includes(import.meta.env?.VITE_AUTH) ? import.meta.env.VITE_AUTH : 'mock'
// Sign-up is by invite only (Dan, 2026-11-11): admins create invites in the console; there is no public Sign Up.
// Invites stay off on the real service until Dan approves (VITE_INVITES=open here, TAMAGO_INVITES=open on the server).
// The mock has them on, so the flow can be tried on the device.
export const INVITES_OPEN = AUTH_MODE === 'mock' || import.meta.env?.VITE_INVITES === 'open'
export const ROLES = ['learner', 'contributor', 'reviewer', 'admin']
// Who reaches what (spec, Screens): the console's Users section is admin only; Review and Contribute are placeholders
// for their roles, and admins see them too.
export const can = {
  console: (u) => ['admin', 'reviewer', 'contributor'].includes(u?.role),
  users: (u) => u?.role === 'admin',
  review: (u) => ['admin', 'reviewer'].includes(u?.role),
  contribute: (u) => ['admin', 'contributor'].includes(u?.role),
}
// The same checks in every adapter and on the screens.
export const checkPassword = (p) => (String(p ?? '').length < 8 ? 'Use at least 8 characters.' : null)
export const checkScreenName = (n) => (!String(n ?? '').trim() ? 'Choose a screen name.' : String(n).trim().length > 30 ? 'Use at most 30 characters.' : null)
// The kind of device a sign-in came from, for the console's sign-in history (Dan, 2026-11-11): no more than that.
export function deviceType(ua = globalThis.navigator?.userAgent ?? '', touch = globalThis.navigator?.maxTouchPoints ?? 0) {
  if (/iPad/.test(ua) || (/Macintosh/.test(ua) && touch > 1)) return 'iPad'
  if (/iPhone|iPod/.test(ua)) return 'iPhone'
  if (/Android/.test(ua)) return /Mobile/.test(ua) ? 'Android Phone' : 'Android Tablet'
  if (/Macintosh|Mac OS X/.test(ua)) return 'Mac'
  if (/Windows/.test(ua)) return 'Windows PC'
  if (/CrOS/.test(ua)) return 'Chromebook'
  if (/Linux/.test(ua)) return 'Linux PC'
  return 'Other'
}
