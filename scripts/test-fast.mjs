// The fast tier (Dan, 2026-11-16): run before every push (the pre-push hook runs it), in a few minutes.
//   - every logic test, as in the full suite;
//   - the whole-course content sweeps in full only for the courses whose content changed since the last push (the
//     files changed between origin/main and HEAD, plus any not yet committed);
//   - every other course's sweeps on a fixed sample of about 5% (test/lib/scope.mjs).
// The full suite (`npm test`) runs in GitHub Actions after every push to main (.github/workflows/full-suite.yml).
// Usage: npm run test:fast            (courses found from git)
//        npm run test:fast -- fr,de   (name the courses to sweep in full, for a trial)
import { execFileSync, spawnSync } from 'node:child_process'
import { readdirSync } from 'node:fs'

const COURSES = ['fr', 'es', 'de', 'it', 'pt']
// The paths that belong to one course: its content folders, recordings and workbooks.
function courseOf(path) {
  const m = path.match(/^(?:src\/)?content(?:-(es|de|it|pt))?\//) // content-it/…, src/content/…
    ?? path.match(/^public\/audio(?:-(es|de|it|pt))?\//) // recordings (public/audio is French)
    ?? path.match(/^_source\/tamago-(?:(es|de|it|pt)-)?data-v\d+\.xlsx$/) // workbooks
  return m ? (m[1] ?? 'fr') : null
}
const git = (args) => { try { return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }) } catch { return '' } }

let full
const named = process.argv[2]
if (named !== undefined) full = new Set(named.split(',').map((x) => x.trim()).filter(Boolean))
else {
  const base = git(['rev-parse', '--verify', '-q', 'origin/main']).trim()
  const changed = [
    ...(base ? git(['diff', '--name-only', `${base}...HEAD`]) : '').split('\n'),
    ...git(['diff', '--name-only', 'HEAD']).split('\n'),
  ].filter(Boolean)
  full = new Set(changed.map(courseOf).filter(Boolean))
}
const sampled = COURSES.filter((c) => !full.has(c))
console.log(`test:fast: full sweeps for ${[...full].join(', ') || 'no course'}; a 5% sample for ${sampled.join(', ') || 'none'}`)
const files = readdirSync('test').filter((f) => f.endsWith('.test.js')).map((f) => `test/${f}`)
const r = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit', env: { ...process.env, TAMAGO_SWEEP: 'sample', TAMAGO_FULL: [...full].join(',') } })
process.exit(r.status ?? 1)
