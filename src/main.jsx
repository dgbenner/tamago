import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { course } from './lib/course.js'
import { useTables } from './lib/content.js'
import './index.css'

// The console (accounts layer 1, 2026-11-11) is its own small app at /admin, loaded without any course.
if (location.pathname.startsWith('/admin')) {
  import('./admin/AdminApp.jsx').then(({ default: AdminApp }) => createRoot(document.getElementById('root')).render(<StrictMode><AdminApp /></StrictMode>))
} else startApp()

// Load the chosen course's tables first (src/lib/course.js), then the app, which reads them as it starts.
function startApp() {
const tablesFor = { fr: () => import('./lib/tables-fr.js'), es: () => import('./lib/tables-es.js'), de: () => import('./lib/tables-de.js') }
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

// Safari only applies :active styles on a page that listens for touches.
document.addEventListener('touchstart', () => {}, { passive: true })
// Lets audio play with the iPhone's ring switch on silent, where Safari supports it.
if (navigator.audioSession) navigator.audioSession.type = 'playback'

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  // The worker fetches the page fresh on every launch with a connection (sw-template.js), so this launch is already
  // the newest version; a new worker only refreshes the offline copy, with no reload (Dan, 2026-11-11).
  navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
}
