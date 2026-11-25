// The home page a new learner sees, saved as src/opening-home.html for the opening (index.html %HOME%): French's, from the
// real app at desktop width (phones hide the panel and desktop the tool strip by CSS), its first seven circles. The
// opening puts each course's own pictures and titles in. Run again when home's look or markup changes:
//   node scripts/capture-home.mjs
import { writeFileSync } from 'node:fs'
import { chromium } from 'playwright'
import { build, preview } from 'vite'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const outDir = mkdtempSync(join(tmpdir(), 'tamago-home-'))
await build({ logLevel: 'error', build: { outDir, emptyOutDir: true } })
const server = await preview({ logLevel: 'error', build: { outDir }, preview: { port: 5392, open: false } })
const browser = await chromium.launch({ channel: 'chrome' })
const page = await (await browser.newContext({ viewport: { width: 1400, height: 900 }, serviceWorkers: 'block' })).newPage()
await page.addInitScript(() => localStorage.setItem('tamago-course', 'fr'))
await page.goto(server.resolvedUrls.local[0])
await page.waitForFunction(() => localStorage.getItem('tamago-home:fr'))
const html = await page.evaluate(() => {
  const box = document.createElement('div')
  box.innerHTML = localStorage.getItem('tamago-home:fr')
  let n = 0
  for (const li of [...box.querySelectorAll('.home-tree > li')]) { if (n >= 7) li.remove(); n += li.querySelectorAll('.circle-node').length }
  for (const x of box.querySelectorAll('img')) { if (/sushi\/|flags\//.test(x.getAttribute('src'))) { x.removeAttribute('src'); x.removeAttribute('srcset') } }
  for (const x of box.querySelectorAll('[aria-label]')) x.removeAttribute('aria-label')
  return box.innerHTML
})
writeFileSync('src/opening-home.html', html + '\n')
console.log(`src/opening-home.html: ${html.length} characters`)
await browser.close(); server.httpServer.close(); rmSync(outDir, { recursive: true, force: true })
process.exit(0)
