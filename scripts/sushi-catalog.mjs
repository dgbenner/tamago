// The sushi catalog (Dan, 2026-11-11): content/sushi-catalog.json and _source/sushi-catalog.md, from
// scripts/lib/sushi-meta.mjs, the originals in _source/sushi-originals (also in R2, bucket tamago-sushi) and each
// course's content/unit-icons.json. One entry per image: app file, dish, category, main colour, where it's used,
// duplicates. The Markdown opens with the usage rules and ends with what's short and a ChatGPT prompt for the next
// batch. Run after assign-icons.mjs, so "where it's used" is current.
// Usage: node scripts/sushi-catalog.mjs
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { META, CATEGORIES, COLORS, HELP_ROLLS, toneOf } from './lib/sushi-meta.mjs'

const ROOT = join(import.meta.dirname, '..')
const R2 = { bucket: 'tamago-sushi', prefix: 'originals/' }
const COURSES = [['French', 'content'], ['Spanish', 'content-es'], ['German', 'content-de']]
const TREE = ['nigiri', 'maki', 'temaki']
// Enough of each tree type for two neighbouring parts without a repeat: the longest run of one type in a part is 7
// (Spanish Part 1 temaki), so 14. Misc covers two Pick Your Own nodes a part over six parts: 12.
const TARGET = { nigiri: 14, maki: 14, temaki: 14, misc: 12 }
const MIN_PER_COLOUR = 2 // of each calm colour (white, yellow, green, brown) per tree type
const CALM = ['white', 'yellow', 'green', 'brown']
// Dishes to ask for, by category and colour, none already in the catalog.
const SUGGEST = {
  // Yellow nigiri beyond tamago (the logo) and uni (already a gunkan and a temaki) is rare: kazunoko is the one.
  nigiri: [['Kazunoko nigiri (herring roe)', 'yellow'], ['Avocado nigiri', 'green'], ['Okra nigiri', 'green'], ['Shiso cucumber nigiri', 'green'], ['Engawa nigiri (flounder fin)', 'white']],
  maki: [['Avocado maki', 'green'], ['Dragon roll (avocado on top)', 'green'], ['Kanpyo maki (gourd)', 'brown'], ['Natto maki', 'brown'], ['Kani maki (crab stick)', 'white'], ['Corn mayo gunkan', 'yellow']],
  temaki: [['Kappa temaki (cucumber)', 'green'], ['Avocado cucumber temaki', 'green'], ['Ebi tempura temaki', 'yellow'], ['California temaki', 'white'], ['Natto temaki', 'brown'], ['Soft-shell crab temaki', 'brown']],
  misc: [],
}

const dishOf = (m) => m.dish.replace(/ \(.*/, '').replace(/ with .*/, '').toLowerCase()
const sha = (p) => createHash('sha1').update(readFileSync(p)).digest('hex')
const madeFor = (m) => m.category !== 'dessert' && m.note !== 'logo'

// Where each image is used.
const used = new Map(META.map((m) => [m.slug, []]))
for (const [name, dir] of COURSES) {
  const icons = JSON.parse(readFileSync(join(ROOT, dir, 'unit-icons.json'), 'utf8'))
  const units = JSON.parse(readFileSync(join(ROOT, dir, 'raw/units.json'), 'utf8'))
  for (const [id, { file }] of Object.entries(icons)) {
    const u = units.find((x) => x.unit_id === id)
    used.get(file.replace('.webp', ''))?.push(`${name} Part ${u.part || 1}, ${u.title} (${id})`)
  }
}
used.get('miso-soup').push('Brush-Up, every course')
used.get('tamago-nigiri').push('the logo only')

// Duplicates: the same file twice, or the same dish in the same category.
const hashes = new Map()
const entries = META.map((m) => {
  const src = join(ROOT, '_source/sushi-originals', m.path)
  const h = existsSync(src) ? sha(src) : ''
  if (h && hashes.has(h)) throw new Error(`${m.path} is the same file as ${hashes.get(h)}`)
  hashes.set(h, m.path)
  const same = META.filter((x) => x !== m && x.category === m.category && dishOf(x) === dishOf(m)).map((x) => x.slug)
  const where = used.get(m.slug)
  return {
    slug: m.slug, file: madeFor(m) ? `/sushi/${m.category}/${m.slug}.webp` : null, file_2x: madeFor(m) ? `/sushi/${m.category}/${m.slug}@2x.webp` : null,
    original: `${R2.prefix}${m.path}`, dish: m.dish, category: m.category, color: m.color, tone: toneOf(m.color),
    role: HELP_ROLLS.includes(m.slug) ? 'help roll' : m.note === 'Brush-Up' ? 'Brush-Up' : m.note === 'logo' ? 'logo' : m.category === 'dessert' ? 'held' : m.category === 'misc' ? 'misc' : 'tree',
    used: where.length ? where : m.category === 'dessert' ? ['held for a later special use'] : ['not used yet'],
    same_dish_as: same, note: m.note, sha1: h,
  }
})
const replaced = [{ file: '/icons/sides/miso-soup.svg', by: 'miso-soup', why: 'the old placeholder miso soup, replaced by the new one (Dan, 2026-11-11)' }]
writeFileSync(join(ROOT, 'content/sushi-catalog.json'), JSON.stringify({
  _about: 'Every piece of Tamago food art: the app copy (WebP, 80px and @2x 160px), the untouched original in R2 (bucket tamago-sushi), dish, category, main colour, tone (red, orange and pink are red-toned), role and where it is used. Made by scripts/sushi-catalog.mjs; rules in _source/sushi-catalog.md.',
  r2_bucket: R2.bucket, replaced, images: entries,
}, null, 2) + '\n')

// Shortages.
const pools = Object.fromEntries(CATEGORIES.map((c) => [c, entries.filter((e) => e.category === c && ['tree', 'misc'].includes(e.role))]))
const short = []
for (const c of [...TREE, 'misc']) {
  const have = pools[c].length
  const lines = []
  if (have < TARGET[c]) lines.push(`${TARGET[c] - have} more images (${have} of ${TARGET[c]})`)
  if (TREE.includes(c)) {
    const red = pools[c].filter((e) => e.tone === 'red-toned').length
    if (red > have / 2) lines.push(`too red: ${red} of ${have} are red-toned, so calm colours are needed to keep red-toned ones apart`)
    for (const col of CALM) { const n = pools[c].filter((e) => e.color === col).length; if (n < MIN_PER_COLOUR) lines.push(`${col}: ${n} of ${MIN_PER_COLOUR}`) }
  }
  short.push({ c, have, lines })
}
const counts = (c) => COLORS.map((col) => [col, pools[c].filter((e) => e.color === col).length]).filter(([, n]) => n).map(([col, n]) => `${col} ${n}`).join(', ')
const needed = Object.entries(SUGGEST).flatMap(([c, list]) => (short.find((s) => s.c === c)?.lines.length ? list.map(([d, col]) => ({ c, d, col })) : []))
const existing = [...new Set(entries.map((e) => e.dish.replace(/ \(.*/, '')))].sort()
const prompt = [
  'Make a set of Japanese food illustrations to match the attached reference images: glossy, slightly stylised 3D food art like a premium emoji, one item per image, three-quarter view from slightly above, soft studio light, a soft shadow under the piece, no plate unless it is part of the dish, no text.',
  'Each one a PNG at 1536 x 1024 with a real transparent background (true alpha, not a painted checkerboard and not white).',
  'Make these, one image each, with the main colour as given:',
  ...needed.map((n) => `- ${n.d}, ${n.c}, main colour ${n.col}`),
  `Do not repeat any of these existing dishes: ${existing.join(', ')}.`,
].join('\n')

// The readable catalog.
const md = []
md.push('# Sushi catalog', '', `Every piece of Tamago food art, ${entries.length} images. Made by \`node scripts/sushi-catalog.mjs\` from scripts/lib/sushi-meta.mjs; do not edit by hand. Originals are untouched in Cloudflare R2, bucket \`${R2.bucket}\`, under \`originals/\` (and locally in _source/sushi-originals, not in git). The app uses only the small copies in public/sushi: WebP, trimmed and scaled to the same visible size, 80 px and 160 px (@2x).`, '')
md.push('## Usage rules', '',
  '- **Main circles:** nigiri for the easiest third of each part, maki for the middle, temaki for the hardest. A vocabulary circle takes the type of the circle before it.',
  '- **Help circles:** the three help rolls, in order: California roll, salmon avocado roll, tekka maki. Nothing else wears them.',
  '- **Pick Your Own:** a misc dish instead of the "?", kept after a topic is chosen.',
  '- **Brush-Up** (was Catch-Up): the new miso soup.',
  '- **Checkpoints:** the flag. The tamago sushi is the logo only.',
  '- **Dessert:** not on the tree. Held for a later special use.',
  '- **No image twice** within a part or across a part boundary (a part\'s first 6 places never use one from the last 6 of the part before), **and no two similar colours side by side.** Red, orange and pink are one tone (red-toned: tuna, salmon, shrimp), so two red-toned pieces never sit together; white, yellow, green, brown, silver and pale pink mix in between.',
  '- **Shortages:** a type with fewer images than circles borrows from the type before it at the edge of its run (easy-to-hard order kept). An image repeats only when every type is used up.',
  '- Assignment: `COURSE=fr|es|de node scripts/assign-icons.mjs`, then import and build; test/icons.test.js fails on any repeat or colour clash. Images: `node scripts/make-icons.mjs`.', '')
md.push('## Duplicates', '',
  '- 16 files in the Desktop batch were the same files as the earlier glossy set; each is listed once.',
  '- The old placeholder miso soup (/icons/sides/miso-soup.svg) is replaced by the new miso soup.',
  '- Same dish, different art (both kept, since each is its own picture; the assignment puts a new dish ahead of one already in the part):',
  ...[...new Set(entries.filter((e) => e.same_dish_as.length).map((e) => [e.slug, ...e.same_dish_as].sort().join(', ')))].map((g) => `  - ${g}`), '')
for (const c of CATEGORIES) {
  const list = entries.filter((e) => e.category === c)
  md.push(`## ${c[0].toUpperCase()}${c.slice(1)} (${list.length})`, '', '| Image | Dish | Colour | Used | Notes |', '| --- | --- | --- | --- | --- |')
  for (const e of list) md.push(`| ${e.file ? `\`${e.slug}\`` : `\`${e.slug}\` (no app copy)`} | ${e.dish} | ${e.color} | ${e.used.join('; ')} | ${[e.role !== 'tree' && e.role !== 'misc' ? e.role : '', e.same_dish_as.length ? `same dish as ${e.same_dish_as.join(', ')}` : '', e.note && !['logo', 'Brush-Up'].includes(e.note) && !e.note.startsWith('help roll') ? e.note : ''].filter(Boolean).join('; ')} |`)
  md.push('')
}
md.push('## What is short', '', `Targets: ${TREE.map((c) => `${c} ${TARGET[c]}`).join(', ')} (two neighbouring parts without a repeat), misc ${TARGET.misc}; at least ${MIN_PER_COLOUR} of each calm colour (${CALM.join(', ')}) in each tree type, and no more than half red-toned. Help rolls, the miso soup, the logo and desserts are not counted.`, '')
for (const s of short) md.push(`- **${s.c}** (${s.have}: ${counts(s.c)}): ${s.lines.length ? s.lines.join('; ') : 'nothing short'}`)
md.push('', '## Prompt for the next batch', '', 'Paste into ChatGPT with two or three current images attached as the style reference:', '', '```', prompt, '```', '')
writeFileSync(join(ROOT, '_source/sushi-catalog.md'), md.join('\n'))
console.log(short.map((s) => `${s.c} (${s.have}: ${counts(s.c)}): ${s.lines.join('; ') || 'nothing short'}`).join('\n'))
