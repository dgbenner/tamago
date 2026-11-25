import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// The console (accounts layer 1, 2026-11-11) is its own small app at /admin, loaded without any course.
if (location.pathname.startsWith('/admin')) {
  import('./admin/AdminApp.jsx').then(({ default: AdminApp }) => createRoot(document.getElementById('root')).render(<StrictMode><AdminApp /></StrictMode>))
} else if (window.openingChoice) window.openingChoice.then(startApp) // a first launch: the opening (index.html) asks for a language first
else startApp()

// Load the chosen course's tables (src/lib/course.js), then the app, which reads them as it starts. Nothing above may
// import course.js: it reads the choice as it loads.
async function startApp() {
const [{ course }, { useTables }] = await Promise.all([import('./lib/course.js'), import('./lib/content.js')])
offlineCopy(course)
const tablesFor = { fr: () => import('./lib/tables-fr.js'), es: () => import('./lib/tables-es.js'), de: () => import('./lib/tables-de.js'), it: () => import('./lib/tables-it.js'), pt: () => import('./lib/tables-pt.js'), nl: () => import('./lib/tables-nl.js'), pl: () => import('./lib/tables-pl.js'), no: () => import('./lib/tables-no.js'), da: () => import('./lib/tables-da.js'), sv: () => import('./lib/tables-sv.js') }
tablesFor[course.id]().then(({ tables }) => {
  useTables(tables)
  return import('./App.jsx')
}).then(({ default: App }) => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
}

// The tree's place (index.html #shell) stays until a page of the app is on screen, then goes two frames after, so the
// page has painted.
const root = document.getElementById('root')
const clearShell = () => {
  if (!root.querySelector('main')) return false
  requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById('shell')?.remove()))
  return true
}
if (!clearShell()) { const seen = new MutationObserver(() => { if (clearShell()) seen.disconnect() }); seen.observe(root, { childList: true, subtree: true }) }

// Safari only applies :active styles on a page that listens for touches.
document.addEventListener('touchstart', () => {}, { passive: true })
// Lets audio play with the iPhone's ring switch on silent, where Safari supports it.
if (navigator.audioSession) navigator.audioSession.type = 'playback'

function offlineCopy(course) {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return
  // The worker fetches the page fresh on every launch whose connection answers within 1.5 s (sw-template.js), so this
  // launch is usually already the newest version; a new worker only refreshes the offline copy, with no reload (Dan, 2026-11-11).
  // It's registered a few seconds after the page has loaded (2026-11-23), so saving the offline copy never competes
  // with the first screen, and then asked to save this course's files.
  const start = () => setTimeout(() => {
    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
    navigator.serviceWorker.ready.then((reg) => reg.active?.postMessage({ type: 'cache-course', id: course.id }))
  }, 3000)
  if (document.readyState === 'complete') start()
  else window.addEventListener('load', start, { once: true })
}
