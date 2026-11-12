// Tree pictures (Dan, 2026-11-11), against what each course ships, in screen order (tree rows left to right, each
// Catch-Up after its row): every picture exists and comes from the sushi catalog; no image twice in a part or across
// a part boundary; no two similar colours side by side (red, orange and pink are one tone); help circles in the three
// rolls, in order, and nothing else in them; Pick Your Own wears a misc dish; no dessert and no logo on the tree.
// Rules: _source/sushi-catalog.md, scripts/assign-icons.mjs.
import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const BOUNDARY = 6 // a part's first places against the last places of the part before (assign-icons.mjs)
const catalog = JSON.parse(readFileSync('content/sushi-catalog.json', 'utf8')).images
const bySlug = new Map(catalog.map((e) => [e.slug, e]))
const ROLLS = catalog.filter((e) => e.role === 'help roll').map((e) => e.slug)
const MISO = 'miso-soup'

for (const dir of ['src/content', 'src/content-es', 'src/content-de']) {
  const read = (t) => JSON.parse(readFileSync(`${dir}/${t}.json`, 'utf8'))
  const units = new Map(read('units').map((u) => [u.unit_id, u]))
  const layout = read('tree_layout').filter((t) => units.has(t.unit_id))
  const slots = read('catch_up')
  const partOf = (u) => Number(u.part || 1)
  const parts = [...new Set(layout.map((t) => partOf(units.get(t.unit_id))))].sort((a, b) => a - b).map((p) => {
    const rows = [...new Set(layout.filter((t) => partOf(units.get(t.unit_id)) === p).map((t) => t.row))].sort((a, b) => a - b)
    const path = []
    for (const r of rows) {
      for (const t of layout.filter((x) => x.row === r).sort((a, b) => a.position - b.position)) {
        const u = units.get(t.unit_id)
        path.push({ id: u.unit_id, kind: u.is_topic_pick, slug: String(u.icon_file).replace('.webp', ''), group: u.icon_group })
      }
      for (const s of slots.filter((x) => Number(x.part) === p && Number(x.after_row) === r)) path.push({ id: s.slot_id, kind: 'catchup', slug: MISO, group: 'misc' })
    }
    return path
  })

  test(`${dir}: every place on the path has a catalog picture whose files exist`, () => {
    for (const e of parts.flat()) {
      const c = bySlug.get(e.slug)
      assert.ok(c, `${e.id}: ${e.slug} is not in content/sushi-catalog.json`)
      assert.equal(e.group, c.category, `${e.id}: group ${e.group}, catalog says ${c.category}`)
      for (const f of [c.file, c.file_2x]) assert.ok(f && existsSync(`public${f}`), `${e.id}: public${f} is missing`)
      assert.ok(!['held', 'logo'].includes(c.role), `${e.id} wears ${e.slug} (${c.role})`)
    }
  })

  test(`${dir}: no image twice within a part`, () => {
    parts.forEach((path, i) => {
      const seen = new Map()
      for (const e of path.filter((x) => x.kind !== 'catchup')) {
        assert.ok(!seen.has(e.slug), `part ${i + 1}: ${e.slug} on ${seen.get(e.slug)} and ${e.id}`)
        seen.set(e.slug, e.id)
      }
    })
  })

  test(`${dir}: no image across a part boundary`, () => {
    for (let i = 1; i < parts.length; i++) {
      const closing = new Map(parts[i - 1].filter((e) => e.kind !== 'catchup').slice(-BOUNDARY).map((e) => [e.slug, e.id]))
      for (const e of parts[i].filter((x) => x.kind !== 'catchup').slice(0, BOUNDARY)) assert.ok(!closing.has(e.slug), `part ${i + 1} opens with ${e.slug} on ${e.id}, used near the end of part ${i} on ${closing.get(e.slug)}`)
    }
  })

  test(`${dir}: no two similar colours side by side`, () => {
    const path = parts.flat()
    for (let i = 1; i < path.length; i++) {
      const [a, b] = [bySlug.get(path[i - 1].slug), bySlug.get(path[i].slug)]
      assert.notEqual(a.tone, b.tone, `${path[i - 1].id} ${a.slug} and ${path[i].id} ${b.slug} are both ${a.tone}`)
    }
  })

  test(`${dir}: help circles wear the rolls in order, Pick Your Own a misc dish, Catch-Up the miso soup`, () => {
    for (const path of parts) {
      path.filter((e) => e.kind === 'help').forEach((e, i) => assert.equal(e.slug, ROLLS[i % ROLLS.length], e.id))
      for (const e of path.filter((x) => x.kind !== 'help')) assert.ok(!ROLLS.includes(e.slug), `${e.id} wears a help roll`)
      for (const e of path.filter((x) => x.kind === 'node')) assert.equal(bySlug.get(e.slug).category, 'misc', `${e.id} wears ${e.slug}`)
      for (const e of path.filter((x) => !['catchup'].includes(x.kind))) assert.notEqual(e.slug, MISO, `${e.id} wears the Catch-Up miso soup`)
    }
  })
}
