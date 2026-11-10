// Picture Check (Dan, 2026-11-10): Dan's pictures for Pick the Picture, matched to the rows of _source/image-list.md,
// for review on the Developer page before any go into lessons. Nothing here touches words.json or the lessons.
//   _source/pictures/incoming-<date>/   Dan's files, exactly as handed over
//   _source/pictures/picture-check.json  each file's row: by file name first, else Claude's guess from the image
// Writes public/picture-check/*.webp (480 px, kept out of the offline cache) and src/dev/picture-check.json.
// Usage: node scripts/picture-check.mjs
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const PICS = join(ROOT, '_source/pictures')
const OUT = join(ROOT, 'public/picture-check')
const map = JSON.parse(readFileSync(join(PICS, 'picture-check.json'), 'utf8'))

// The rows of image-list.md: | # | French | English | File | What to draw | Priority | Sentences | Unit | Note |
const rows = readFileSync(join(ROOT, '_source/image-list.md'), 'utf8').split('\n')
  .filter((l) => /^\| \d+ \|/.test(l))
  .map((l) => { const c = l.split('|').slice(1, -1).map((x) => x.trim()); return { n: Number(c[0]), french: c[1], english: c[2], file: c[3], draw: c[4], priority: c[5] } })
// One picture per file; rows that reuse another's picture ("same image as bleu") are listed under it.
const byFile = new Map()
for (const r of rows.filter((x) => !x.draw.startsWith('same image as'))) if (!byFile.has(r.file)) byFile.set(r.file, { ...r, also: [] })
for (const r of rows.filter((x) => x.draw.startsWith('same image as'))) byFile.get(r.file)?.also.push(r.french)

const folders = readdirSync(PICS, { withFileTypes: true }).filter((d) => d.isDirectory() && d.name.startsWith('incoming-')).map((d) => d.name).sort()
const images = folders.flatMap((d) => readdirSync(join(PICS, d)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort().map((f) => ({ folder: d, name: f })))
rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })
const slug = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const cards = []
const covered = new Set()
for (const img of images) {
  const web = `${slug(img.name.replace(/\.\w+$/, ''))}.webp`
  execFileSync('magick', [join(PICS, img.folder, img.name), '-resize', '480x480', '-quality', '82', join(OUT, web)])
  const named = byFile.get(img.name.toLowerCase())
  const m = map.files[img.name]
  const row = named ?? (m?.file ? byFile.get(m.file) : null)
  if (m?.file && !row) throw new Error(`${img.name}: ${m.file} is not a row of image-list.md`)
  if (row) covered.add(row.file)
  cards.push({
    image: `/picture-check/${web}`, source: `${img.folder}/${img.name}`,
    status: named ? 'Matched' : row ? 'Guessed' : 'No Match',
    french: row?.french ?? '', also: row?.also ?? [], english: row?.english ?? '', file: row?.file ?? '', draw: row?.draw ?? '',
    note: m?.note ?? '',
  })
}
// A row that shares another row's picture (bleue, docteur…) is covered when that picture is.
const missing = [...byFile.values()].filter((r) => !covered.has(r.file))
for (const r of missing) cards.push({ image: null, source: '', status: 'Missing', french: r.french, also: r.also, english: r.english, file: r.file, draw: r.draw, note: '' })

const order = { Matched: 0, Guessed: 1, 'No Match': 2, Missing: 3 }
cards.sort((a, b) => order[a.status] - order[b.status] || (rows.find((r) => r.file === a.file)?.n ?? 999) - (rows.find((r) => r.file === b.file)?.n ?? 999))
const counts = Object.fromEntries(Object.keys(order).map((k) => [k, cards.filter((c) => c.status === k).length]))
mkdirSync(join(ROOT, 'src/dev'), { recursive: true })
writeFileSync(join(ROOT, 'src/dev/picture-check.json'), JSON.stringify({ made: new Date().toISOString().slice(0, 10), images: images.length, rows: rows.length, counts, cards }, null, 2) + '\n')
console.log(`${images.length} images, ${rows.length} rows:`, counts)
if (!existsSync(OUT)) throw new Error('no output')
