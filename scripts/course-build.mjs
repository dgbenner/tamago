// One course's content, start to finish: import, check, build (the French npm run content, for any course).
// Usage: COURSE=es node scripts/course-build.mjs
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
const ROOT = join(import.meta.dirname, '..')
for (const s of ['import.mjs', 'check-content.mjs', 'build-content.mjs']) {
  const out = execFileSync('node', [join(ROOT, 'scripts', s)], { env: process.env, encoding: 'utf8', maxBuffer: 1 << 26 })
  console.log(out.trim().split('\n').at(-1).slice(0, 240))
}
