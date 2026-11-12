// The app's copies of Dan's food art (Dan, 2026-11-11): small WebP files the tree uses, made from the originals in
// _source/sushi-originals (kept untouched in R2, bucket tamago-sushi). Each original is trimmed to its visible edges
// (alpha at 25% or more, so a soft shadow doesn't count), then scaled so its visible area is the same share of the
// square for every piece; a long, flat nigiri, a round maki and a tall hand roll then look the same size. Capped so
// the longest side stays inside the square. Two sizes: the size the circle shows the art at (CircleNode: 78% of a
// 6rem circle at the 17px root, about 80 CSS px) and twice that for sharp screens.
// Dessert and the tamago logo art are held, so no app copies are made for them.
// Usage: node scripts/make-icons.mjs   (writes public/sushi/<category>/<slug>.webp and <slug>@2x.webp)
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { META, NEEDS_CUTOUT } from './lib/sushi-meta.mjs'

const ROOT = join(import.meta.dirname, '..')
const SRC = join(ROOT, '_source/sushi-originals')
const OUT = join(ROOT, 'public/sushi')
export const SIZES = { '': 80, '@2x': 160 }
const AREA = 0.4 // the visible area as a share of the square
const MAX_SIDE = 0.94 // the longest side, as a share of the square
const magick = (...args) => execFileSync('magick', args, { encoding: 'utf8' }).trim()
export const madeFor = (m) => m.category !== 'dessert' && m.note !== 'logo'

rmSync(OUT, { recursive: true, force: true })
for (const m of META.filter(madeFor)) {
  mkdirSync(join(OUT, m.category), { recursive: true })
  let src = join(SRC, m.path)
  if (NEEDS_CUTOUT.has(m.slug)) {
    // A checkerboard painted into an opaque image: flood the light squares from the corners.
    const cut = join(ROOT, '.cache', `${m.slug}-cutout.png`)
    mkdirSync(join(ROOT, '.cache'), { recursive: true })
    const [w, h] = magick(src, '-format', '%w %h', 'info:').split(' ').map(Number)
    magick(src, '-alpha', 'set', '-fuzz', '14%', '-fill', 'none', ...[[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]].flatMap(([x, y]) => ['-draw', `color ${x},${y} floodfill`]),
      '-channel', 'A', '-morphology', 'Erode', 'Disk:1.5', '+channel', cut)
    src = cut
  }
  const box = magick(src, '-alpha', 'extract', '-threshold', '25%', '-format', '%@', 'info:')
  const [, w, h] = box.match(/^(\d+)x(\d+)/).map(Number)
  const area = Number(magick(src, '-crop', box, '+repage', '-alpha', 'extract', '-threshold', '50%', '-format', '%[fx:mean*w*h]', 'info:'))
  for (const [suffix, size] of Object.entries(SIZES)) {
    let s = Math.sqrt((AREA * size * size) / area)
    s = Math.min(s, (MAX_SIDE * size) / Math.max(w, h))
    const W = Math.max(1, Math.round(w * s)), H = Math.max(1, Math.round(h * s))
    magick(src, '-crop', box, '+repage', '-filter', 'Lanczos', '-resize', `${W}x${H}!`, '-background', 'none', '-gravity', 'center', '-extent', `${size}x${size}`,
      '-strip', '-define', 'webp:method=6', '-quality', '86', join(OUT, m.category, `${m.slug}${suffix}.webp`))
  }
  console.log(`${m.category}/${m.slug}`)
}
