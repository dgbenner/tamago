// Topic packs from the pool (Dan, 2026-11-10): how many checked Tatoeba sentences each candidate topic can reach with
// Units 1 to 5 plus its own words (the rule for the first seven packs). A pack needs 30 good ones, no drafted French.
// Prints counts per topic and per word; content/sweep/packs/<topic>.json holds the candidates for review.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadTatoeba } from './lib/tatoeba.mjs'
import { at, COURSE } from './lib/course.mjs'
import { analyse, formIndexFor, loose, norm } from './lib/french.mjs'

const ROOT = join(import.meta.dirname, '..')
const raw = (t) => JSON.parse(readFileSync(at(`content/raw/${t}.json`), 'utf8'))
const OUT = at('content/sweep/packs')
mkdirSync(OUT, { recursive: true })
export const TOPICS = JSON.parse(readFileSync(at('content/sweep/pack-words.json'), 'utf8'))

const words = raw('words')
const MAIN = raw('units').filter((u) => !['yes', 'node'].includes(u.is_topic_pick)).sort((a, b) => a.order - b.order).map((u) => u.unit_id)
const BASE_UNITS = process.env.ALL_A1 ? MAIN : MAIN.slice(0, 5) // all of A1 (13 French units, 15 Spanish), or Units 1 to 5 // the first seven packs' rule; ALL_A1 measures the alternative
const base = words.filter((w) => BASE_UNITS.includes(w.first_unit))
const taken = new Set(raw('sentences').map((s) => loose(s.french)))
const existingForms = new Set(words.map((w) => w.form))
const DECISIONS = JSON.parse(readFileSync(at('content/review-decisions.json'), 'utf8'))
const NAMES = new Set([...raw('sentence_words').filter((r) => r.notes === 'name').map((r) => String(r.surface)), ...(DECISIONS.names ?? [])].map((x) => x.toLowerCase()))
const tatoeba = loadTatoeba()
// A sentence turned down anywhere in the course stays out.
const REVIEW = (() => { try { return JSON.parse(readFileSync(at('content/sweep/packs-review.json'), 'utf8')) } catch { return {} } })()
const turnedDown = new Set(Object.values(REVIEW).flatMap((r) => Object.keys(r?.reject ?? {})))
const trusted = (s) => { const t = tatoeba.trustOf(s); return t.native_owner || t.ok_tag }
const pool = tatoeba.french.filter((s) => trusted(s) && !/\d/.test(s.text) && !taken.has(loose(s.text)) && !turnedDown.has(String(s.id)))
const only = process.argv[2]
for (const [id, t] of Object.entries(TOPICS)) {
  if (only && id !== only) continue
  const clash = t.words.filter((f) => existingForms.has(f))
  const own = t.words.filter((f) => !existingForms.has(f)).map((form, i) => ({ word_id: `NEW${i}`, form }))
  const index = formIndexFor([...base, ...own])
  const ownIds = new Set(own.map((w) => w.word_id))
  const found = []
  const seen = new Set()
  for (const s of pool) {
    const a = analyse(s.text, index, { names: NAMES })
    if (a.unknown || a.count < 2 || a.count > 7) continue
    if (!a.parts.some((p) => ownIds.has(p.word_id))) continue
    const key = loose(s.text)
    if (seen.has(key)) continue
    seen.add(key)
    const english = [...new Set(tatoeba.englishFor(s.id))]
    if (!english.length) continue
    found.push({ source_id: s.id, owner: s.owner, french: norm(s.text), english, forms: a.parts.filter((p) => ownIds.has(p.word_id)).map((p) => own.find((w) => w.word_id === p.word_id).form) })
  }
  const perWord = Object.fromEntries(own.map((w) => [w.form, found.filter((f) => f.forms.includes(w.form)).length]))
  writeFileSync(join(OUT, `${id}.json`), JSON.stringify({ topic: t.name, words: own.map((w) => w.form), clash, candidates: found }, null, 2) + '\n')
  console.log(`${id} ${t.name}: ${found.length} candidates | ${Object.entries(perWord).map(([f, n]) => `${f} ${n}`).join(', ')}${clash.length ? ` | already in the course: ${clash.join(', ')}` : ''}`)
}
