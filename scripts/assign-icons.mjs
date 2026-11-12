// Unit icons from Dan's sushi art (content/icons.json, made from _source/icons; Dan made the square set with ChatGPT,
// and they are back in rotation since 2026-11-11). Rules (Dan, 2026-11-10 and 2026-11-11):
//   - Easy to hard: in each part, the first third of the main circles nigiri, the middle third maki, the last third
//     temaki. A vocabulary circle takes the type of the circle just before it.
//   - The help thread: each part's help circles wear the three rolls, in order (California, salmon-avocado, tuna),
//     and no other circle wears them.
//   - No image twice in a part, and none across a part boundary: a part's opening circles never wear an image from
//     the close of the part before (the BOUNDARY window), and an image the part before used at all comes last in
//     line. So no image repeats from one circle to the next.
//   - Where a type has fewer images than circles, the circles at the edge of its run borrow from the neighbouring
//     type (temaki's first ones become maki, maki's first ones nigiri), keeping the easy-to-hard order; an image
//     repeats only when every type is used up.
// The picks are a fixed shuffle per course and part, so a rerun gives the same tree. Writes content/unit-icons.json
// for the course; import.mjs fills the units' icon columns from it. test/icons.test.js holds the rules.
// Usage: COURSE=fr|es|de node scripts/assign-icons.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { at, C } from './lib/course.mjs'
const read = (p) => JSON.parse(readFileSync(at(p), 'utf8'))
const pools = read('content/icons.json')
const OUT = at('content/unit-icons.json')
export const BOUNDARY = 6
const ROLLS = ['glossy-california-roll-emoji-7.webp', 'glossy-salmon-avocado-sushi-roll-6.webp', 'glossy-tuna-maki-sushi-roll-5.webp']
const TYPES = ['nigiri', 'maki', 'temaki']

// A fixed shuffle: each file sorted by a hash of the course, part and file name.
const shuffled = (list, salt) => [...list].sort((a, b) => hash(salt + a).localeCompare(hash(salt + b)))
const hash = (s) => createHash('sha1').update(s).digest('hex')

const units = read('content/raw/units.json')
const parts = [...new Set(units.map((u) => Number(u.part || 1)))].sort((a, b) => a - b)
const out = {}
let before = [] // the part before's images, in path order
for (const part of parts) {
  // The circles of this part on the path, in order (topic packs and their nodes have no sushi).
  const path = units.filter((u) => Number(u.part || 1) === part && !['yes', 'node'].includes(u.is_topic_pick)).sort((a, b) => a.order - b.order)
  const main = path.filter((u) => u.is_topic_pick !== 'help' && u.mix !== 'vocab')
  const third = Math.ceil(main.length / 3)
  const typeOfMain = new Map(main.map((u, i) => [u.unit_id, i < third ? 'nigiri' : i < main.length - Math.floor(main.length / 3) ? 'maki' : 'temaki']))
  // Wanted type per sushi circle (help circles aside), in order.
  const sushi = path.filter((u) => u.is_topic_pick !== 'help')
  const wanted = []
  for (const u of sushi) wanted.push(typeOfMain.get(u.unit_id) ?? wanted.at(-1) ?? 'nigiri')
  // Each type's images, the rolls kept for the help thread.
  const avail = Object.fromEntries(TYPES.map((t) => [t, (pools[t] ?? []).map((x) => x.file).filter((f) => !ROLLS.includes(f))]))
  // Borrow: from the hardest type down, a type with more circles than images hands its first circles to the type
  // before it.
  for (let t = TYPES.length - 1; t > 0; t--) {
    let over = wanted.filter((w) => w === TYPES[t]).length - avail[TYPES[t]].length
    for (let i = 0; i < wanted.length && over > 0; i++) if (wanted[i] === TYPES[t]) { wanted[i] = TYPES[t - 1]; over-- }
  }
  // The help circles' rolls are this part's too.
  const help = path.filter((u) => u.is_topic_pick === 'help')
  help.forEach((u, i) => { out[u.unit_id] = { group: 'maki', file: ROLLS[i % ROLLS.length] } })
  const used = new Set(help.map((u, i) => ROLLS[i % ROLLS.length]))
  const closing = new Set(before.slice(-BOUNDARY))
  const lastPart = new Set(before)
  const queue = Object.fromEntries(TYPES.map((t) => [t, shuffled(avail[t], `${C.id}:${part}:`)
    .sort((a, b) => Number(lastPart.has(a)) - Number(lastPart.has(b)))])) // images the part before used come last
  sushi.forEach((u, i) => {
    const opening = path.indexOf(u) < BOUNDARY
    const ok = (f) => !used.has(f) && !(opening && closing.has(f))
    // Its type first, then the neighbours, nearest first; a repeat only when every type is used up.
    const order = [wanted[i], ...TYPES.filter((t) => t !== wanted[i]).sort((a, b) => Math.abs(TYPES.indexOf(a) - TYPES.indexOf(wanted[i])) - Math.abs(TYPES.indexOf(b) - TYPES.indexOf(wanted[i])))]
    let group = order.find((t) => queue[t].some(ok))
    let file = group && queue[group].find(ok)
    if (!file) { group = wanted[i]; file = queue[group][i % queue[group].length]; console.warn(`${u.unit_id}: every image used, ${file} repeats`) }
    used.add(file)
    out[u.unit_id] = { group, file }
  })
  before = path.map((u) => out[u.unit_id].file)
  console.log(`Part ${part}: ${path.map((u) => `${u.unit_id} ${out[u.unit_id].group}/${out[u.unit_id].file.replace('.webp', '')}`).join(', ')}`)
}
writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n')
console.log(`Wrote ${C.id} unit icons`)
