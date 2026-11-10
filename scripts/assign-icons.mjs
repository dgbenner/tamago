// Unit icons from Dan's sushi art (content/icons.json, made from _source/icons). Tree units get an icon by
// difficulty: the first third of the A1 units nigiri, the middle third maki, the last third temaki. Within a group
// the pick is random, once per unit, then kept in content/unit-icons.json; a group's icons are used before any
// repeats. Nodes outside the normal path (checkpoints, Your topic, Make) take a random side icon once side art exists.
// Usage: node scripts/assign-icons.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { randomInt } from 'node:crypto'
import { at, C, COURSE, audioUrl } from './lib/course.mjs'
const ROOT = join(import.meta.dirname, '..')
const read = (p) => JSON.parse(readFileSync(at(p), 'utf8'))
const pools = read('content/icons.json')
const OUT = at('content/unit-icons.json')
const kept = existsSync(OUT) ? read('content/unit-icons.json') : {}

// The A1 tree, planned to its end (autonomous-build.md: the old Duolingo A1 order after Unit 5), so the thirds stay
// put as units are added: 13 units, 5 nigiri, 4 maki, 4 temaki.
// Spanish has 15 units (its own order, 2026-11-10): COURSE=es node scripts/assign-icons.mjs.
const A1_PLAN = Array.from({ length: { es: 15, de: 15 }[COURSE] ?? 13 }, (_, i) => `U${String(i + 1).padStart(2, '0')}`) // French 13, Spanish 15, German 15
const third = Math.ceil(A1_PLAN.length / 3)
const groupOf = (i) => (i < third ? 'nigiri' : i < A1_PLAN.length - Math.floor(A1_PLAN.length / 3) ? 'maki' : 'temaki')

const pick = (group, taken) => {
  const list = pools[group] ?? []
  if (!list.length) return null
  const fresh = list.filter((x) => !taken.has(x.file))
  const from = fresh.length ? fresh : list
  return from[randomInt(from.length)].file
}
A1_PLAN.forEach((id, i) => {
  const group = groupOf(i)
  if (kept[id]?.group === group) return
  const taken = new Set(Object.values(kept).filter((k) => k.group === group).map((k) => k.file))
  const file = pick(group, taken)
  if (file) kept[id] = { group, file }
})
// Side icons for nodes outside the path, once there is side art.
for (const id of ['U100', 'checkpoint_2', 'checkpoint_3', 'make']) {
  if (kept[id] || !(pools.sides ?? []).length) continue
  kept[id] = { group: 'sides', file: pick('sides', new Set()) }
}
writeFileSync(OUT, JSON.stringify(kept, null, 2) + '\n')
console.log(Object.entries(kept).map(([k, v]) => `${k} ${v.group}/${v.file}`).join('\n'))
