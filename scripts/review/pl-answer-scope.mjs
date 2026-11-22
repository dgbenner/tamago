// Generated accepted answers (en_to_fr, from Tatoeba's other Polish lines with the same English) that use a word the
// sentence's circle has not taught are cut for Polish (Fable's phase 6 review, verdict 13, 2026-11-22): they go in
// content-pl/review-decisions.json generated_off, which build-content honours. A word counts as taught when its first
// circle comes at or before the sentence's (by order) or the circle borrows it, the rule import.mjs applies to drafts.
// The two formal answers Dan kept (GS6105, GS88123) stay. Run after check-content, before build-content.
// Usage: COURSE=pl node scripts/review/pl-answer-scope.mjs
import { join } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import { analyse, formIndexFor } from '../lib/french.mjs'
const P = (f) => join(import.meta.dirname, '../../content-pl', f)
const readJ = (f) => JSON.parse(readFileSync(f, 'utf8'))
const dec = readJ(P('review-decisions.json'))
const gen = readJ(P('checks/generated_answers.json'))
const units = readJ(P('raw/units.json')); const order = new Map(units.map((u) => [u.unit_id, u.order]))
const words = readJ(P('raw/words.json')).filter((w) => !String(w.status).startsWith('off'))
const sentences = new Map(readJ(P('raw/sentences.json')).map((s) => [s.sentence_id, s]))
const names = new Set(dec.names.map((x) => x.toLowerCase()))
const KEEP = new Set(['GS6105-1844922', 'GS88123-4328190']) // Dan's call 1: the two formal lines already accepted stay
const cut = {}
const indexes = new Map()
for (const g of gen) {
  const s = sentences.get(g.sentence_id)
  if (!s || dec.cut_sentences.includes(g.sentence_id) || KEEP.has(g.answer_id)) continue
  const u = units.find((x) => x.unit_id === s.unit_id)
  if (!indexes.has(u.unit_id)) {
    const borrow = new Set(String(u.borrow_words ?? '').split(';').map((x) => x.trim()).filter(Boolean))
    indexes.set(u.unit_id, formIndexFor(words.filter((w) => order.get(w.first_unit) <= u.order || borrow.has(w.form))))
  }
  const a = analyse(g.answer, indexes.get(u.unit_id), { names })
  if (a.unknown) {
    const later = words.find((w) => w.form.toLowerCase() === String(a.unknown).toLowerCase())
    cut[g.answer_id] = `"${g.answer}" for ${g.sentence_id} (${u.unit_id}): ${a.unknown} ${later ? `is taught in ${later.first_unit}` : 'is not a course word'} (Fable's phase 6 review, verdict 13)`
  }
}
dec.generated_off = cut
writeFileSync(P('review-decisions.json'), JSON.stringify(dec, null, 1) + '\n')
const live = gen.filter((g) => sentences.has(g.sentence_id) && !dec.cut_sentences.includes(g.sentence_id))
console.log(Object.values(cut).join('\n'))
console.log(`generated answers on live lines: ${live.length}; cut ${Object.keys(cut).length}; kept ${live.length - Object.keys(cut).length}`)
