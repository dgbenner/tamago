import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { course } from './lib/course.js'
import { useTables } from './lib/content.js'
import './index.css'

// Load the chosen course's tables first (src/lib/course.js), then the app, which reads them as it starts.
const tablesFor = { fr: () => import('./lib/tables-fr.js'), es: () => import('./lib/tables-es.js') }
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

// Safari only applies :active styles on a page that listens for touches.
document.addEventListener('touchstart', () => {}, { passive: true })
// Lets audio play with the iPhone's ring switch on silent, where Safari supports it.
if (navigator.audioSession) navigator.audioSession.type = 'playback'

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  // A new version takes over on opening. Reload once so it shows straight away; a lesson in progress resumes.
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload(), { once: true })
  }
  navigator.serviceWorker.register('/sw.js')
}
