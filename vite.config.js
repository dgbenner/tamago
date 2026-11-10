import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]))

// Writes dist/sw.js with every built file precached, named by a hash of their contents.
function serviceWorker() {
  return {
    name: 'tamago-service-worker',
    apply: 'build',
    closeBundle() {
      // host config files are never served; the Picture Check images are for the Developer page only, so they aren't cached offline
      const files = walk('dist').filter((f) => !f.endsWith('sw.js') && !/[\\/]_(headers|redirects)$/.test(f) && !/[\\/]picture-check[\\/]/.test(f))
      const hash = createHash('sha1')
      for (const f of files) hash.update(readFileSync(f))
      // The page is cached as / because Cloudflare Pages answers /index.html with a redirect to /, and a
      // cached redirect can't be served for a page load.
      const urls = files.map((f) => (`/${relative('dist', f)}`).replace(/\/index\.html$/, '/'))
      const source = readFileSync('src/sw-template.js', 'utf8')
        .replace('__VERSION__', hash.digest('hex').slice(0, 12))
        .replace('__FILES__', JSON.stringify(urls))
      writeFileSync('dist/sw.js', source)
    },
  }
}

// For the Developer page's Course Snapshot: when this build was made, and from which workbook version.
// Each course's current workbook version, from scripts/lib/course.mjs (French tamago-data-vN, Spanish tamago-es-data-vN).
const COURSE_FILE = readFileSync('scripts/lib/course.mjs', 'utf8')
const WORKBOOKS = { fr: COURSE_FILE.match(/tamago-data-(v\d+)\.xlsx/)?.[1] ?? '', es: COURSE_FILE.match(/tamago-es-data-(v\d+)\.xlsx/)?.[1] ?? '' }
export default defineConfig({
  plugins: [react(), tailwindcss(), serviceWorker()],
  define: { __BUILD_TIME__: JSON.stringify(new Date().toISOString()), __WORKBOOKS__: JSON.stringify(WORKBOOKS) },
})
