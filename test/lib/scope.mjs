// How much of each course the whole-course sweeps check (Dan, 2026-11-16, tiered testing).
// `npm test` (the full suite, also run by GitHub Actions after every push) checks everything. `npm run test:fast`
// (scripts/test-fast.mjs, before every push) sets TAMAGO_SWEEP=sample and TAMAGO_FULL to the courses whose content
// changed since the last push: those are swept in full, every other course on a fixed sample of about 5% (every
// 20th circle or sentence, always the same ones, so a sample run is repeatable).
export const SAMPLE_EVERY = 20
const full = new Set(String(process.env.TAMAGO_FULL ?? '').split(',').map((x) => x.trim()).filter(Boolean))
const DIR_TO_ID = { content: 'fr', 'content-es': 'es', 'content-de': 'de', 'content-it': 'it', 'content-pt': 'pt', 'content-nl': 'nl', 'content-pl': 'pl', 'content-no': 'no', 'content-da': 'da', 'content-sv': 'sv' }
// True when this course's sweeps run in full; dir is the content folder name (content, content-es …).
export const sweepsFull = (dir) => process.env.TAMAGO_SWEEP !== 'sample' || full.has(DIR_TO_ID[dir] ?? dir)
// The fixed sample of a list, or the whole list when the course is swept in full.
export const sampleOf = (dir, list) => (sweepsFull(dir) ? list : list.filter((_, i) => i % SAMPLE_EVERY === 0))
