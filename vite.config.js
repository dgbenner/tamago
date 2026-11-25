import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { versionName } from './src/lib/version.js'

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]))

// The labs (Dan, 2026-11-15) are built and deployed, linked from the Developer page, but kept out of the offline cache.
const LAB_PAGES = { main: 'index.html', lab: 'lab.html', 'design-lab': 'design-lab.html', 'voice-lab': 'voice-lab.html', 'lab-sounds': 'lab/sounds/index.html' }
const LAB_PAGE = /^(lab\.html|design-lab\.html|voice-lab\.html|lab[\\/])/

// Writes sw.js into the build folder, named by a hash of every built file's contents (2026-11-23, Dan: a first visit
// had downloaded all 95 MB, every course, at once, sharing weak Wi-Fi with the page itself). CORE, the app without any
// course, is saved at install; each course's own files (its tables chunks and its recordings folder) are listed in
// COURSE_FILES and saved only once the page says that course is open. generateBundle finds each course's chunks: those
// reached from src/lib/tables-<id>.js and not from the app's own entry. It also adds modulepreload links for the app's
// code to the page, so the browser fetches it while main.jsx loads the course's tables (the app reads them as it
// starts, so it still runs after them).
function serviceWorker() {
  let outDir = 'dist'
  const courseChunks = {}
  return {
    name: 'tamago-service-worker',
    apply: 'build',
    enforce: 'post',
    configResolved(c) { outDir = c.build.outDir }, // dist, or --outDir for a test build
    generateBundle(_, bundle) {
      const reach = (start) => {
        const seen = new Set()
        const go = (f) => { if (seen.has(f) || !bundle[f]) return; seen.add(f); for (const i of bundle[f].imports ?? []) go(i) }
        go(start)
        return seen
      }
      const chunks = Object.values(bundle).filter((c) => c.type === 'chunk')
      const app = chunks.find((c) => c.facadeModuleId?.endsWith('/src/App.jsx'))
      const main = chunks.find((c) => c.isEntry && c.facadeModuleId?.endsWith('/index.html'))
      const shared = new Set([...(main ? reach(main.fileName) : []), ...(app ? reach(app.fileName) : [])])
      for (const c of chunks) {
        const m = /\/src\/lib\/tables-([a-z]+)\.js$/.exec(c.facadeModuleId ?? '')
        if (m) courseChunks[m[1]] = [...reach(c.fileName)].filter((f) => !shared.has(f)).map((f) => `/${f}`)
      }
      const html = bundle['index.html']
      if (app && html?.type === 'asset') {
        const page = String(html.source)
        const links = [...reach(app.fileName)].filter((f) => !page.includes(`/${f}"`)).map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`)
        // The app's own scripts and styles go after the opening (index.html #opening, 2026-11-25), so it paints
        // before the app's styles have loaded and the part above the mark names no built file (sw-template.js).
        const assets = [...page.matchAll(/^ *<(?:script type="module"|link rel="(?:modulepreload|stylesheet)")[^>]*\/assets\/[^>]*>(?:<\/script>)?\n/gm)].map((m) => m[0])
        const rest = assets.reduce((p, a) => p.replace(a, ''), page)
        // The app's styles again in the page itself, for home as it last looked (#shell); main.jsx drops them once the
        // app has drawn, since after a deploy this copy can be the last version's.
        const css = assets.map((a) => /rel="stylesheet".*href="\/([^"]+)"/.exec(a)?.[1]).filter(Boolean).map((f) => bundle[f]?.source ?? '').join('\n')
        const styled = rest.replace('</head>', () => `  <style id="shell-style">${css}</style>\n  </head>`)
        html.source = styled.replace('<!--shell-end-->\n', `<!--shell-end-->\n    <script>window.courseFiles = ${JSON.stringify(courseChunks)}</script>\n${assets.join('')}    ${links.join('\n    ')}\n`)
      }
    },
    closeBundle() {
      const out = outDir
      // host config files are never served; the Picture Check images are for the Developer page only, so they aren't cached offline
      const files = walk(out).filter((f) => !f.endsWith('sw.js') && !LAB_PAGE.test(relative(out, f)) && !/[\\/]_(headers|redirects)$/.test(f) && !/[\\/]picture-check[\\/]/.test(f))
      const hash = createHash('sha1')
      for (const f of files) hash.update(readFileSync(f))
      // The page is cached as / because Cloudflare Pages answers /index.html with a redirect to /, and a
      // cached redirect can't be served for a page load.
      const urls = files.map((f) => (`/${relative(out, f)}`).replace(/\/index\.html$/, '/'))
      const ofCourse = {}
      for (const [id, list] of Object.entries(courseChunks)) for (const u of list) ofCourse[u] = id
      const audioCourse = (u) => { const m = /^\/audio(?:-([a-z]+))?\//.exec(u); return m ? (m[1] ?? 'fr') : null }
      const core = [], byCourse = {}
      for (const u of urls) {
        const id = ofCourse[u] ?? audioCourse(u)
        if (id) (byCourse[id] ??= []).push(u)
        else core.push(u)
      }
      const source = readFileSync('src/sw-template.js', 'utf8')
        .replace('__VERSION__', hash.digest('hex').slice(0, 12))
        .replace('__FILES__', JSON.stringify(core))
        .replace('__COURSE_FILES__', JSON.stringify(byCourse))
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

// The opening's pictures inside the page itself (2026-11-25), so the sushi and the language flags need no request of
// their own: %FLAGS%, one button per course of src/lib/course.js in the order FlagRow shows them, and after the whole
// layout %PICTURES%, which fills in the sushi and then each flag, so nothing moves as they arrive.
// %TREES%: each course's first seven circles as a new learner sees them, [title, picture], for the tree's place (#shell).
const VERSION = JSON.parse(readFileSync('src/version.json', 'utf8'))
const BRANCH = process.env.CF_PAGES_BRANCH ?? ''
const SITE = BRANCH && BRANCH !== 'main' ? BRANCH[0].toUpperCase() + BRANCH.slice(1) : ''
const trees = (ids) => Object.fromEntries(ids.map((id) => {
  const read = (f) => JSON.parse(readFileSync(join(COURSE_DIRS[id], f), 'utf8'))
  const units = new Map(read('units.json').map((u) => [u.unit_id, u]))
  return [id, read('tree_layout.json').sort((a, b) => a.row - b.row || a.position - b.position).slice(0, 7).map((t) => { const u = units.get(t.unit_id); return [u.title, `${u.icon_group}/${u.icon_file.replace(/\.webp$/, '')}`] })]
}))
const dataUri = (file) => `data:image/webp;base64,${readFileSync(file).toString('base64')}`
function openingPictures() {
  const all = () => {
    const list = readFileSync('src/lib/course.js', 'utf8').split('export const PARKED')[0]
    const courses = [...list.matchAll(/\{ id: '(\w+)', name: '([^']+)'.*?flag: '([^']+)', ready: true/g)].map(([, id, name, flag]) => ({ id, name, flag }))
    courses.sort((x, y) => x.name.localeCompare(y.name, 'en'))
    const fill = (id, file) => `<script>document.querySelectorAll('[data-pic="${id}"]').forEach((i) => { i.src = '${dataUri(file)}' })</script>`
    const pictures = [fill('sushi', 'public/logo.webp'), ...courses.map((c) => fill(c.id, `public${c.flag}`))].join('\n    ')
    const flags = courses.map((c, i) => {
      const stats = COURSE_STATS[c.id]
      return `<li style="--i:${i}"><button type="button" data-course="${c.id}" aria-label="${c.name}" aria-pressed="false"><img data-pic="${c.id}" width="192" height="192" alt="" /><span>${c.name}</span>${stats ? `<em>${stats.level} · ${stats.circles} circles</em>` : ''}</button></li>`
    }).join('\n            ')
    return { flags, pictures, courses }
  }
  return { name: 'tamago-opening-pictures', transformIndexHtml: (html) => { if (!html.includes('%FLAGS%')) return html; const { flags, pictures, courses } = all(); return html.replace('%FLAGS%', () => flags).replace('%PICTURES%', () => pictures).replace('%TREES%', () => JSON.stringify(trees(courses.map((c) => c.id)))).replace('%HOME%', () => readFileSync('src/opening-home.html', 'utf8').trim()).replace('%VERSION%', versionName(VERSION.seq ?? VERSION.number)).replace('%SITE%', SITE ? `<span data-site class="site-tag">${SITE}</span>` : '') } }
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
const WORKBOOKS = { fr: COURSE_FILE.match(/tamago-data-(v\d+)\.xlsx/)?.[1] ?? '', es: COURSE_FILE.match(/tamago-es-data-(v\d+)\.xlsx/)?.[1] ?? '', de: COURSE_FILE.match(/tamago-de-data-(v\d+)\.xlsx/)?.[1] ?? '', it: COURSE_FILE.match(/tamago-it-data-(v\d+)\.xlsx/)?.[1] ?? '', pt: COURSE_FILE.match(/tamago-pt-data-(v\d+)\.xlsx/)?.[1] ?? '', nl: COURSE_FILE.match(/tamago-nl-data-(v\d+)\.xlsx/)?.[1] ?? '', pl: COURSE_FILE.match(/tamago-pl-data-(v\d+)\.xlsx/)?.[1] ?? '', no: COURSE_FILE.match(/tamago-no-data-(v\d+)\.xlsx/)?.[1] ?? '', da: COURSE_FILE.match(/tamago-da-data-(v\d+)\.xlsx/)?.[1] ?? '', sv: COURSE_FILE.match(/tamago-sv-data-(v\d+)\.xlsx/)?.[1] ?? '' }

// For the language picker's sublabel (Dan, 2026-11-22): each course's CEFR level span and its circle count, read from
// the course's own units.json at build time so the label stays right as courses grow (a circle is a live unit; the
// shipped tree shows only live units). One level reads "A1" today; a course spanning levels would read "A1–A2". The
// picker reads __COURSE_STATS__[id]; a course with no content dir maps to null. Same build-time route as __WORKBOOKS__.
const COURSE_DIRS = { fr: 'src/content', es: 'src/content-es', de: 'src/content-de', it: 'src/content-it', pt: 'src/content-pt', nl: 'src/content-nl', pl: 'src/content-pl', no: 'src/content-no', da: 'src/content-da', sv: 'src/content-sv' }
const courseStats = () => Object.fromEntries(Object.entries(COURSE_DIRS).map(([id, dir]) => {
  try {
    const units = JSON.parse(readFileSync(join(dir, 'units.json'), 'utf8')).filter((u) => u.status === 'live')
    const levels = [...new Set(units.map((u) => u.cefr).filter(Boolean))].sort()
    const level = levels.length === 0 ? '' : levels.length === 1 ? levels[0] : `${levels[0]}–${levels[levels.length - 1]}`
    return [id, { level, circles: units.length }]
  } catch { return [id, null] }
}))
const COURSE_STATS = courseStats()
export default defineConfig({
  build: { rollupOptions: { input: LAB_PAGES } },
  plugins: [react(), tailwindcss(), serviceWorker(), voiceLabSave(), soundLab(), openingPictures(), statCounter()],
  // Which site this build is for (Cloudflare Pages sets CF_PAGES_BRANCH): main is the stable site, dev the working one.
  define: { __BUILD_TIME__: JSON.stringify(new Date().toISOString()), __WORKBOOKS__: JSON.stringify(WORKBOOKS), __COURSE_STATS__: JSON.stringify(COURSE_STATS), __DEPLOY_BRANCH__: JSON.stringify(process.env.CF_PAGES_BRANCH ?? '') },
})
