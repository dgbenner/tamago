// Picture Check (Dan, 2026-11-10): Dan's pictures for Pick the Picture, matched to the rows of _source/image-list.md,
// for review on the Developer page before any go into lessons. Nothing here touches words.json or the lessons.
//   _source/pictures/incoming-<date>/   Dan's files, exactly as handed over
//   _source/pictures/picture-check.json  each file's row: by file name first, else Claude's guess from the image
// Writes public/picture-check/*.webp (480 px, kept out of the offline cache) and src/dev/picture-check.json.
// Pictures Dan approved (decision "use") also go into lessons: public/images/pictures/<row file>.webp (384 px,
// cached offline like every lesson picture) and content/pictures.json (word id to file), which import.mjs prefers
// over the OpenMoji stand-ins.
// Usage: node scripts/picture-check.mjs
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(import.meta.dirname, '..')
const PICS = join(ROOT, '_source/pictures')
const OUT = join(ROOT, 'public/picture-check')
const map = JSON.parse(readFileSync(join(PICS, 'picture-check.json'), 'utf8'))

// The rows of image-list.md, read by their column names (| # | French | Spanish | English | File | What to draw | …).
const lines = readFileSync(join(ROOT, '_source/image-list.md'), 'utf8').split('\n')
const head = lines.find((l) => l.startsWith('| # |')).split('|').slice(1, -1).map((x) => x.trim())
const col = (c, name) => c[head.indexOf(name)] ?? ''
const rows = lines.filter((l) => /^\| \d+ \|/.test(l))
  .map((l) => { const c = l.split('|').slice(1, -1).map((x) => x.trim()); return { n: Number(c[0]), french: col(c, 'French') || col(c, 'Spanish'), spanish: col(c, 'Spanish'), english: col(c, 'English'), file: col(c, 'File'), draw: col(c, 'What to draw'), priority: col(c, 'Priority') } })
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
const used = []
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
    french: row?.french ?? '', spanish: row?.spanish ?? '', also: row?.also ?? [], english: row?.english ?? '', file: row?.file ?? '', draw: row?.draw ?? '',
    note: m?.note ?? '', decision: m?.decision ?? '',
  })
  if (row && m?.decision === 'use') used.push({ row, src: join(PICS, img.folder, img.name) })
}
// A row that shares another row's picture (bleue, docteur…) is covered when that picture is.
const missing = [...byFile.values()].filter((r) => !covered.has(r.file))
for (const r of missing) cards.push({ image: null, source: '', status: 'Missing', french: r.french, spanish: r.spanish, also: r.also, english: r.english, file: r.file, draw: r.draw, note: '' })

const order = { Matched: 0, Guessed: 1, 'No Match': 2, Missing: 3 }
cards.sort((a, b) => order[a.status] - order[b.status] || (rows.find((r) => r.file === a.file)?.n ?? 999) - (rows.find((r) => r.file === b.file)?.n ?? 999))
const counts = Object.fromEntries(Object.keys(order).map((k) => [k, cards.filter((c) => c.status === k).length]))
// Lesson pictures: one per row file; every word on that row, and the rows sharing its picture, point to it.
const LESSON = join(ROOT, 'public/images/pictures')
rmSync(LESSON, { recursive: true, force: true })
mkdirSync(LESSON, { recursive: true })
const words = JSON.parse(readFileSync(join(ROOT, 'content/raw/words.json'), 'utf8'))
const pictures = {}
for (const { row, src } of used) {
  const file = `pictures/${row.file.replace(/\.png$/, '.webp')}`
  if (Object.values(pictures).includes(file)) throw new Error(`${row.file}: two pictures chosen`)
  execFileSync('magick', [src, '-resize', '384x384', '-quality', '82', join(ROOT, 'public/images', file)])
  for (const form of [row.french, ...row.also]) {
    const w = words.find((x) => x.form === form && !String(x.status).startsWith('off'))
    if (w) pictures[w.word_id] = file // a Spanish-only row has no French word; its Spanish word is wired by image-list.mjs
  }
}
writeFileSync(join(ROOT, 'content/pictures.json'), JSON.stringify({ _about: "Dan's pictures in lessons (Picture Check decision use), word id to file under public/images. Written by scripts/picture-check.mjs; import.mjs prefers these over OpenMoji.", words: pictures }, null, 2) + '\n')
mkdirSync(join(ROOT, 'src/dev'), { recursive: true })
writeFileSync(join(ROOT, 'src/dev/picture-check.json'), JSON.stringify({ made: new Date().toISOString().slice(0, 10), images: images.length, rows: rows.length, counts, cards }, null, 2) + '\n')
console.log(`${images.length} images, ${rows.length} rows:`, counts, `| in lessons: ${used.length} pictures for ${Object.keys(pictures).length} words`)
if (!existsSync(OUT)) throw new Error('no output')
