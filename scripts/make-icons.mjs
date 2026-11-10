// The tree's sushi images (content/icons.json, from Dan's art in _source/icons), made for the circle's disc (Dan,
// 2026-11-10): each source is trimmed to its visible edges (alpha at 25% or more, so a soft shadow doesn't count),
// then scaled so its visible area is the same share of the 192 px square for every piece. A long, flat nigiri and a
// round maki or a tall hand roll then look the same size. Capped so the longest side stays inside the square.
// Usage: node scripts/make-icons.mjs   (writes public/icons/<group>/<file>)
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const SIZE = 192
const AREA = 0.4 // the visible area as a share of the square
const MAX_SIDE = 0.94 // the longest side, as a share of the square
const magick = (...args) => execFileSync('magick', args, { encoding: 'utf8' }).trim()
const pools = JSON.parse(readFileSync(join(ROOT, 'content/icons.json'), 'utf8'))

for (const [group, list] of Object.entries(pools)) {
  mkdirSync(join(ROOT, 'public/icons', group), { recursive: true })
  for (const { file, source } of list) {
    const src = join(ROOT, source)
    const box = magick(src, '-alpha', 'extract', '-threshold', '25%', '-format', '%@', 'info:')
    const [, w, h] = box.match(/^(\d+)x(\d+)/).map(Number)
    const area = Number(magick(src, '-crop', box, '+repage', '-alpha', 'extract', '-threshold', '50%', '-format', '%[fx:mean*w*h]', 'info:'))
    let s = Math.sqrt((AREA * SIZE * SIZE) / area)
    s = Math.min(s, (MAX_SIDE * SIZE) / Math.max(w, h))
    const W = Math.round(w * s), H = Math.round(h * s)
    magick(src, '-crop', box, '+repage', '-resize', `${W}x${H}!`, '-background', 'none', '-gravity', 'center', '-extent', `${SIZE}x${SIZE}`, '-quality', '90', join(ROOT, 'public/icons', group, file))
    console.log(`${group}/${file}: visible ${w}x${h}, now ${W}x${H}`)
  }
}
