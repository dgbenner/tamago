// Tree icons (Dan, 2026-11-11), against what each course ships: no image twice in a part, none across a part
// boundary, none from one circle to the next, and the help thread in the three rolls. Rules: scripts/assign-icons.mjs.
import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const BOUNDARY = 6 // the opening circles of a part against the closing ones of the part before (assign-icons.mjs)
const ROLLS = ['glossy-california-roll-emoji-7.webp', 'glossy-salmon-avocado-sushi-roll-6.webp', 'glossy-tuna-maki-sushi-roll-5.webp']
const pools = JSON.parse(readFileSync('content/icons.json', 'utf8'))

for (const dir of ['src/content', 'src/content-es', 'src/content-de']) {
  const units = JSON.parse(readFileSync(`${dir}/units.json`, 'utf8'))
  const byPart = new Map()
  for (const u of units.filter((x) => !['yes', 'node'].includes(x.is_topic_pick)).sort((a, b) => a.order - b.order)) {
    const p = Number(u.part || 1)
    if (!byPart.has(p)) byPart.set(p, [])
    byPart.get(p).push(u)
  }
  const parts = [...byPart.keys()].sort((a, b) => a - b).map((p) => byPart.get(p))

  test(`${dir}: every circle on the path has a sushi image that exists`, () => {
    for (const u of parts.flat()) {
      assert.ok(u.icon_file, `${u.unit_id} has no icon`)
      assert.ok((pools[u.icon_group] ?? []).some((x) => x.file === u.icon_file), `${u.unit_id}: ${u.icon_group}/${u.icon_file} is not in content/icons.json`)
      assert.ok(existsSync(`public/icons/${u.icon_group}/${u.icon_file}`), `${u.unit_id}: public/icons/${u.icon_group}/${u.icon_file} is missing`)
    }
  })

  test(`${dir}: no image twice within a part`, () => {
    parts.forEach((list, i) => {
      const seen = new Map()
      for (const u of list) {
        assert.ok(!seen.has(u.icon_file), `part ${i + 1}: ${u.icon_file} on ${seen.get(u.icon_file)} and ${u.unit_id}`)
        seen.set(u.icon_file, u.unit_id)
      }
    })
  })

  test(`${dir}: no image across a part boundary or from one circle to the next`, () => {
    const path = parts.flat()
    for (let i = 1; i < path.length; i++) assert.notEqual(path[i].icon_file, path[i - 1].icon_file, `${path[i - 1].unit_id} and ${path[i].unit_id} share ${path[i].icon_file}`)
    for (let i = 1; i < parts.length; i++) {
      const closing = new Map(parts[i - 1].slice(-BOUNDARY).map((u) => [u.icon_file, u.unit_id]))
      for (const u of parts[i].slice(0, BOUNDARY)) assert.ok(!closing.has(u.icon_file), `part ${i + 1} opens with ${u.icon_file} on ${u.unit_id}, used near the end of part ${i} on ${closing.get(u.icon_file)}`)
    }
  })

  test(`${dir}: help circles wear the three rolls in order, and nothing else does`, () => {
    for (const list of parts) {
      list.filter((u) => u.is_topic_pick === 'help').forEach((u, i) => assert.equal(u.icon_file, ROLLS[i % 3], u.unit_id))
      for (const u of list.filter((x) => x.is_topic_pick !== 'help')) assert.ok(!ROLLS.includes(u.icon_file), `${u.unit_id} wears a help roll`)
    }
  })
}
