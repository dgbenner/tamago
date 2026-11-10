// One course's content, start to finish: import, check, build (the French npm run content, for any course).
// A draft the check finds on Tatoeba is switched to its Tatoeba source first (drafts-found.mjs), then re-checked.
// Usage: COURSE=es node scripts/course-build.mjs
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
const ROOT = join(import.meta.dirname, '..')
const run = (s) => { const out = execFileSync('node', [join(ROOT, 'scripts', s)], { env: process.env, encoding: 'utf8', maxBuffer: 1 << 26 }); console.log(out.trim().split('\n').at(-1).slice(0, 240)); return out }
run('import.mjs'); run('check-content.mjs')
if (!/: 0$/.test(run('drafts-found.mjs').trim())) { run('import.mjs'); run('check-content.mjs') }
run('build-content.mjs')
