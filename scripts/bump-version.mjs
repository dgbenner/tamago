// The next version for the next push (src/lib/version.js): `npm run bump`, then commit and push. The deploy number goes
// one past the highest on GitHub; the name is the day's count, back to Aardvark on a new day (local date), or on
// `npm run bump -- --reset` (Dan, 2026-11-11: start over).
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
const d = new Date()
const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const live = (() => { try { return JSON.parse(execFileSync('git', ['show', 'origin/main:src/version.json'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })) } catch { return {} } })()
const daily = !process.argv.includes('--reset') && live.day === day ? (live.daily ?? 0) + 1 : 1
writeFileSync(file, `${JSON.stringify({ number: next, day, daily })}\n`)
const { versionName } = await import('../src/lib/version.js')
console.log(`Version ${versionName(daily)} (deploy ${next}, ${day}); main is deploy ${main ?? 'none'}`)
