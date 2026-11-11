// The next version name for the next push to dev (src/lib/version.js): `npm run bump`, then commit and push to dev.
// The number moves on from the highest on GitHub's dev and main, so running it twice before a push still gives the
// next name. A promote (dev merged into main) carries dev's number to main and needs no bump.
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const file = new URL('../src/version.json', import.meta.url)
const local = JSON.parse(readFileSync(file, 'utf8')).number
const on = (ref) => { try { return JSON.parse(execFileSync('git', ['show', `${ref}:src/version.json`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).number } catch { return null } }
try { execFileSync('git', ['fetch', '-q', 'origin'], { stdio: 'ignore' }) } catch { /* offline: use what we last fetched */ }
const main = on('origin/main'), dev = on('origin/dev')
const top = Math.max(main ?? 0, dev ?? 0)
const next = top ? top + 1 : local
writeFileSync(file, `${JSON.stringify({ number: next })}\n`)
const { versionName } = await import('../src/lib/version.js')
const was = [dev && `dev is ${versionName(dev)}`, main && `main is ${versionName(main)}`].filter(Boolean).join(', ')
console.log(`Version ${versionName(next)} (deploy ${next})${was ? `; ${was}` : ''}`)
