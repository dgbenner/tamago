// Tree pictures from the sushi catalog (scripts/lib/sushi-meta.mjs; rules at the top of _source/sushi-catalog.md;
// Dan, 2026-11-10 and 2026-11-11):
//   - Main circles, in each part: nigiri for the easiest third, maki for the middle, temaki for the hardest. A
//     vocabulary circle takes the type of the circle before it.
//   - Help circles: the three help rolls, in order; nothing else wears them.
//   - Pick Your Own: a misc dish. Catch-Up: the miso soup (Home.jsx). Checkpoints: the flag. The tamago sushi is the
//     logo only; desserts are held, never on the tree.
//   - No image twice in a part, and none across a part boundary: a part's opening circles (the BOUNDARY window) never
//     wear an image from the close of the part before, and images the part before used come last in line.
//   - No two similar colours side by side, in path order (tree rows, left to right, Catch-Up and help circles in
//     place): red, orange and pink are one tone (red-toned), so two red-toned pieces never sit together.
//   - Where a type has fewer images than circles, the circles at the edge of its run borrow from the type before it,
//     keeping the easy-to-hard order; a colour clash also borrows from a neighbouring type before giving way. An image
//     repeats only when every type is used up. A dish already in the part (another salmon nigiri) comes after new ones.
// The picks are a fixed shuffle per course and part, so a rerun gives the same tree. Writes content/unit-icons.json
// for the course; import.mjs fills the units' icon columns from it. test/icons.test.js holds the rules.
// Usage: COURSE=fr|es|de node scripts/assign-icons.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { at, C } from './lib/course.mjs'
import { META, HELP_ROLLS, toneOf } from './lib/sushi-meta.mjs'
const read = (p) => JSON.parse(readFileSync(at(p), 'utf8'))
export const BOUNDARY = 6
const TYPES = ['nigiri', 'maki', 'temaki']
const bySlug = new Map(META.map((m) => [m.slug, m]))
const MISO = bySlug.get('miso-soup')
const hash = (s) => createHash('sha1').update(s).digest('hex')
const dishOf = (m) => m.dish.replace(/ \(.*/, '').replace(/ with .*/, '').toLowerCase()

const units = read('content/raw/units.json')
const unitOf = new Map(units.map((u) => [u.unit_id, u]))
const layout = read('content/raw/tree_layout.json')
const slots = read('content/raw/catch_up.json')
const partOf = (u) => Number(u.part || 1)
const parts = [...new Set(layout.map((t) => partOf(unitOf.get(t.unit_id))))].sort((a, b) => a - b)
const out = {}
let before = [] // the part before's slugs, in path order
for (const part of parts) {
  // The part's path in screen order: rows, left to right, a Catch-Up after its row.
  const rows = [...new Set(layout.filter((t) => partOf(unitOf.get(t.unit_id)) === part).map((t) => t.row))].sort((a, b) => a - b)
  const path = []
  for (const r of rows) {
    for (const t of layout.filter((x) => x.row === r).sort((a, b) => a.position - b.position)) path.push({ unit: unitOf.get(t.unit_id) })
    for (const s of slots.filter((x) => Number(x.part) === part && Number(x.after_row) === r)) path.push({ catchUp: s.slot_id, slug: MISO.slug })
  }
  const kind = (e) => (e.catchUp ? 'catchup' : e.unit.is_topic_pick === 'help' ? 'help' : e.unit.is_topic_pick === 'node' ? 'pick' : e.unit.mix === 'vocab' ? 'vocab' : 'main')
  // Fixed pictures first: help rolls in order, miso soup on Catch-Up.
  path.filter((e) => kind(e) === 'help').forEach((e, i) => { e.slug = HELP_ROLLS[i % HELP_ROLLS.length] })
  // Wanted types: thirds of the main circles; a vocabulary circle takes the type before it; Pick Your Own is misc.
  const main = path.filter((e) => kind(e) === 'main')
  const third = Math.ceil(main.length / 3)
  main.forEach((e, i) => { e.want = i < third ? 'nigiri' : i < main.length - Math.floor(main.length / 3) ? 'maki' : 'temaki' })
  let last = 'nigiri'
  for (const e of path) { if (kind(e) === 'main') last = e.want; else if (kind(e) === 'vocab') e.want = last; else if (kind(e) === 'pick') e.want = 'misc' }
  // Pools: tree images of each type, help rolls kept back.
  const pool = (t) => META.filter((m) => m.category === t && !HELP_ROLLS.includes(m.slug) && m.note !== 'logo' && m.note !== 'Catch-Up')
  // Borrow for shortage: from the hardest type down, a type with more circles than images hands its first circles
  // to the type before it.
  for (let t = TYPES.length - 1; t > 0; t--) {
    let over = path.filter((e) => e.want === TYPES[t]).length - pool(TYPES[t]).length
    for (const e of path) if (over > 0 && e.want === TYPES[t]) { e.want = TYPES[t - 1]; over-- }
  }
  const used = new Set(path.filter((e) => e.slug).map((e) => e.slug))
  const dishes = new Set([...used].map((s) => dishOf(bySlug.get(s))))
  const closing = new Set(before.slice(-BOUNDARY))
  const lastPart = new Set(before)
  const queue = (t) => pool(t).sort((a, b) => Number(lastPart.has(a.slug)) - Number(lastPart.has(b.slug)) || Number(dishes.has(dishOf(a))) - Number(dishes.has(dishOf(b))) || hash(`${C.id}:${part}:${a.slug}`).localeCompare(hash(`${C.id}:${part}:${b.slug}`)))
  const neighbours = (t) => (t === 'misc' ? ['misc'] : [t, ...TYPES.filter((x) => x !== t).sort((a, b) => Math.abs(TYPES.indexOf(a) - TYPES.indexOf(t)) - Math.abs(TYPES.indexOf(b) - TYPES.indexOf(t)))])
  path.forEach((e, i) => {
    if (e.slug) return
    const prev = path[i - 1]?.slug && bySlug.get(path[i - 1].slug)
    const next = path[i + 1]?.slug && bySlug.get(path[i + 1].slug) // fixed neighbours ahead: a help roll or the miso soup
    const opening = i < BOUNDARY
    const free = (m) => !used.has(m.slug) && !(opening && closing.has(m.slug))
    const calm = (m) => (!prev || toneOf(prev.color) !== toneOf(m.color)) && (!next || toneOf(next.color) !== toneOf(m.color))
    const order = neighbours(e.want)
    let m
    for (const test of [(x) => free(x) && calm(x), free]) {
      for (const t of order) { m = queue(t).find(test); if (m) break }
      if (m) break
      console.warn(`${e.unit.unit_id}: no ${e.want} that keeps the colours apart`)
    }
    if (!m) { m = queue(e.want)[i % queue(e.want).length]; console.warn(`${e.unit.unit_id}: every image used, ${m.slug} repeats`) }
    e.slug = m.slug
    used.add(m.slug); dishes.add(dishOf(m))
  })
  for (const e of path) if (e.unit) out[e.unit.unit_id] = { group: bySlug.get(e.slug).category, file: `${e.slug}.webp` }
  before = path.map((e) => e.slug)
  console.log(`Part ${part}: ${path.map((e) => `${e.unit?.unit_id ?? e.catchUp} ${e.slug} (${bySlug.get(e.slug).color})`).join(', ')}`)
}
writeFileSync(at('content/unit-icons.json'), JSON.stringify(out, null, 2) + '\n')
console.log(`Wrote ${C.id} unit icons`)
