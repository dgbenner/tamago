// The next version name for the next deploy (src/lib/version.js): `npm run bump`, then commit and push.
// The number moves on from the one on GitHub's main, so running it twice before a push still gives the next name.
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const file = new URL('../src/version.json', import.meta.url)
const local = JSON.parse(readFileSync(file, 'utf8')).number
let live = null
try { live = JSON.parse(execFileSync('git', ['show', 'origin/main:src/version.json'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })).number } catch { /* no version on main yet */ }
const next = live == null ? local : live + 1
writeFileSync(file, `${JSON.stringify({ number: next })}\n`)
const { versionName } = await import('../src/lib/version.js')
console.log(`Version ${versionName(next)} (deploy ${next})${live == null ? '' : `; live is ${versionName(live)}`}`)
