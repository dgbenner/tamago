import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]))

// The labs (Dan, 2026-11-15) are built and deployed, linked from the Developer page, but kept out of the offline cache.
const LAB_PAGES = { main: 'index.html', lab: 'lab.html', 'design-lab': 'design-lab.html', 'voice-lab': 'voice-lab.html', 'lab-sounds': 'lab/sounds/index.html' }
const LAB_PAGE = /^(lab\.html|design-lab\.html|voice-lab\.html|lab[\\/])/

// Writes sw.js into the build folder with every built file precached, named by a hash of their contents.
function serviceWorker() {
  let outDir = 'dist'
  return {
    name: 'tamago-service-worker',
    apply: 'build',
    configResolved(c) { outDir = c.build.outDir }, // dist, or --outDir for a test build
    closeBundle() {
      const out = outDir
      // host config files are never served; the Picture Check images are for the Developer page only, so they aren't cached offline
      const files = walk(out).filter((f) => !f.endsWith('sw.js') && !LAB_PAGE.test(relative(out, f)) && !/[\\/]_(headers|redirects)$/.test(f) && !/[\\/]picture-check[\\/]/.test(f))
      const hash = createHash('sha1')
      for (const f of files) hash.update(readFileSync(f))
      // The page is cached as / because Cloudflare Pages answers /index.html with a redirect to /, and a
      // cached redirect can't be served for a page load.
      const urls = files.map((f) => (`/${relative(out, f)}`).replace(/\/index\.html$/, '/'))
      const source = readFileSync('src/sw-template.js', 'utf8')
        .replace('__VERSION__', hash.digest('hex').slice(0, 12))
        .replace('__FILES__', JSON.stringify(urls))
      writeFileSync(join(out, 'sw.js'), source)
    },
  }
}

// Voice Lab (Dan, 2026-11-14; dev server only): the lab POSTs its tags here and they're written to
// src/lib/voice-genders.json, which the app reads. Never part of a build.
function voiceLabSave() {
  return {
    name: 'tamago-voice-lab-save',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__voice-genders', (req, res) => {
        if (req.method === 'GET') { res.setHeader('content-type', 'application/json'); res.end(readFileSync('src/lib/voice-genders.json')); return }
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return }
        let body = ''
        req.on('data', (c) => { body += c })
        req.on('end', () => {
          try {
            const tags = JSON.parse(body)
            const clean = Object.fromEntries(Object.entries(tags).filter(([k, v]) => (/^(voice|speaker|file):/.test(k) && ['female', 'male', 'unsure'].includes(v)) || (/^child:(voice|speaker):/.test(k) && v === true)).sort(([a], [b]) => a.localeCompare(b)))
            writeFileSync('src/lib/voice-genders.json', `${JSON.stringify(clean, null, 1)}\n`)
            res.setHeader('content-type', 'application/json'); res.end(JSON.stringify({ saved: Object.keys(clean).length }))
          } catch (e) { res.statusCode = 400; res.end(String(e)) }
        })
      })
    },
  }
}

// Sound Lab (Dan, 2026-11-15): on the dev server /lab/sounds serves lab/sounds/index.html; Cloudflare serves the
// built lab/sounds/index.html at /lab/sounds/ itself.
function soundLab() {
  return {
    name: 'tamago-sound-lab',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => { if (/^\/lab\/sounds\/?(\?.*)?$/.test(req.url)) req.url = '/lab/sounds/index.html'; next() })
    },
  }
}

// StatCounter (Dan, 2026-11-14; project "Tamago Dev", 13366867): added only to Cloudflare's builds (CF_PAGES is set
// there), so local runs, test builds and the smoke test's own builds count nothing. Invisible counter, no cookies
// banner needed by the app itself.
const STATCOUNTER = `<!-- Default Statcounter code for Tamago Dev https://tamago-83f.pages.dev/ -->
<script type="text/javascript">var sc_project=13366867; var sc_invisible=1; var sc_security="8f9aac0f";</script>
<script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script>
<noscript><div class="statcounter"><a title="web statistics" href="https://statcounter.com/" target="_blank"><img class="statcounter" src="https://c.statcounter.com/13366867/0/8f9aac0f/1/" alt="web statistics" referrerPolicy="no-referrer-when-downgrade"></a></div></noscript>
<!-- End of Statcounter Code -->`
function statCounter() {
  return {
    name: 'tamago-statcounter',
    apply: 'build',
    transformIndexHtml(html) { return process.env.CF_PAGES ? html.replace('</body>', `${STATCOUNTER}\n  </body>`) : html },
  }
}

// For the Developer page's Course Snapshot: when this build was made, and from which workbook version.
// Each course's current workbook version, from scripts/lib/course.mjs (French tamago-data-vN, Spanish tamago-es-data-vN).
const COURSE_FILE = readFileSync('scripts/lib/course.mjs', 'utf8')
const WORKBOOKS = { fr: COURSE_FILE.match(/tamago-data-(v\d+)\.xlsx/)?.[1] ?? '', es: COURSE_FILE.match(/tamago-es-data-(v\d+)\.xlsx/)?.[1] ?? '', de: COURSE_FILE.match(/tamago-de-data-(v\d+)\.xlsx/)?.[1] ?? '', it: COURSE_FILE.match(/tamago-it-data-(v\d+)\.xlsx/)?.[1] ?? '', pt: COURSE_FILE.match(/tamago-pt-data-(v\d+)\.xlsx/)?.[1] ?? '', nl: COURSE_FILE.match(/tamago-nl-data-(v\d+)\.xlsx/)?.[1] ?? '', da: COURSE_FILE.match(/tamago-da-data-(v\d+)\.xlsx/)?.[1] ?? '', sv: COURSE_FILE.match(/tamago-sv-data-(v\d+)\.xlsx/)?.[1] ?? '' }
export default defineConfig({
  build: { rollupOptions: { input: LAB_PAGES } },
  plugins: [react(), tailwindcss(), serviceWorker(), voiceLabSave(), soundLab(), statCounter()],
  // Which site this build is for (Cloudflare Pages sets CF_PAGES_BRANCH): main is the stable site, dev the working one.
  define: { __BUILD_TIME__: JSON.stringify(new Date().toISOString()), __WORKBOOKS__: JSON.stringify(WORKBOOKS), __DEPLOY_BRANCH__: JSON.stringify(process.env.CF_PAGES_BRANCH ?? '') },
})
