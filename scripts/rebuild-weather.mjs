// Weather pack rebuild (Dan, 2026-11-10): the two sentences where temps means "time" are cut; with them gone the pack
// has under 30 sentences, so it moves to Another Topic (U200) and is rebuilt on all of A1, Tatoeba only. Its drafted
// sentences go off, its live Tatoeba sentences stay, and the pull tops it up (rebuild in content/sweep/packs-review.json).
// A few more weather words join it, so the topic can reach 30.
// Usage: node scripts/rebuild-weather.mjs <from.xlsx> <to.xlsx>
import { join } from 'node:path'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
const ROOT = join(import.meta.dirname, '..')
const [from, to] = process.argv.slice(2)
const wb = XLSX.readFile(join(ROOT, from))
const sheet = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { defval: '' })
const header = (n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { header: 1, defval: '' })[0]
const save = (n, rows) => { const cols = [...header(n)]; for (const r of rows) for (const k of Object.keys(r)) if (!cols.includes(k)) cols.push(k); wb.Sheets[n] = XLSX.utils.json_to_sheet(rows, { header: cols }) }
const changelog = (line) => { const r = XLSX.utils.sheet_to_json(wb.Sheets.README, { header: 1, defval: '' }); r.push([`Changes to ${to.match(/v(\d+)/)[0]}`, line]); wb.Sheets.README = XLSX.utils.aoa_to_sheet(r) }

// W601 to W603 were nuage, nuages and vent: Tatoeba had under 3 good sentences for each, so they were left out.
export const NEW_WORDS = { W604: 'ciel', W605: 'pleut', W606: 'fait' }
// Under 3 Tatoeba weather sentences once the time sentences are cut: temps (none) and pluie (two), so both leave the
// pack, with the two sentences that use pluie.
const DROPPED = { W302: 'pluie', W306: 'temps' }
const PLUIE = ['S6001', 'S6013']
const TIME = ['S6012', 'S6056']

const units = sheet('units').map((u) => {
  if (u.unit_id === 'U101') return { ...u, topic_node: 'U200', grammar_point: 'All of A1, with words for this topic' }
  if (u.unit_id === 'U100') return { ...u, topic: 'Choose one of six topics' }
  return u
})
save('units', units)

const sentences = sheet('sentences').map((s) => {
  if (s.unit_id !== 'U101' || String(s.status).startsWith('off')) return s
  if (PLUIE.includes(s.sentence_id)) return { ...s, status: 'off: cut in review', notes: `${s.notes}; off 2026-11-10: pluie left the rebuilt Weather pack (under 3 Tatoeba sentences)` }
  if (TIME.includes(s.sentence_id)) return { ...s, status: 'off: cut in review', notes: `${s.notes}; cut 2026-11-10 (Dan): temps here means "time", not weather` }
  if (s.source === 'tamago_original') return { ...s, status: 'off: cut in review', notes: `${s.notes}; off 2026-11-10: the Weather pack was rebuilt from Tatoeba only (Dan)` }
  return s
})
save('sentences', sentences)

const words = sheet('words').map((w) => (DROPPED[w.word_id] ? { ...w, status: 'off: under 3 Tatoeba sentences in the rebuilt Weather pack (2026-11-10)' } : w))
const taken = new Set(words.map((w) => w.form))
for (const [id, form] of Object.entries(NEW_WORDS)) {
  if (taken.has(form)) throw new Error(`${form} is already in the course`)
  words.push({ word_id: id, lang_id: 'fr', form, lemma: '', part_of_speech: '', gender: '', gloss: '', hint: '', hint_source: '', first_unit: 'U101', needs_image: 'no', image_file: '', wiktionary_url: `https://en.wiktionary.org/wiki/${encodeURIComponent(form)}#French`, status: 'pull from Wiktionary', notes: 'Weather rebuild 2026-11-10' })
}
save('words', words)

changelog(`Weather pack (U101) rebuilt: S6012 and S6056 cut (temps meaning "time"); with them gone it had 14 sentences, so it moves to Another Topic (topic_node U200), on all of A1, Tatoeba only: its 5 drafts go off and the pull tops it up. New words ${Object.values(NEW_WORDS).join(', ')}; pluie and temps leave the pack (under 3 Tatoeba sentences each), with S6001 and S6013.`)
XLSX.writeFile(wb, join(ROOT, to))
console.log(`Wrote ${to}`)
