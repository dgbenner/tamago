// Course quality (Dan, 2026-11-10; Spanish first, then French): every Tatoeba sentence the pull left out ONLY for the trust rule (the
// owner isn't a declared native speaker and there's no OK tag) but that otherwise fits a unit: every word known by
// then (or a listed name), 2 to 7 words, no digits, an article only before a noun or adjective, linked English that
// carries the unit's nouns, not already in the course, not turned down in review. Each is set beside the drafts it
// could replace, exact matches first. Covers the main units and the topic packs (a first-node pack draws on Units 1
// to 5 and its own words, a second-node pack on all of A1). Writes _review/<course>-candidates.md; it will not
// overwrite a file that already carries review marks. Nothing is swapped.
// Usage: node scripts/trust-candidates.mjs   (French)   ·   COURSE=es … (Spanish)
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { at, C, COURSE } from './lib/course.mjs'
import { loadTatoeba } from './lib/tatoeba.mjs'
import { analyse as analyseWords, formIndexFor as formIndexOf, loose, norm } from './lib/french.mjs'

const ROOT = join(import.meta.dirname, '..')
const raw = (t) => JSON.parse(readFileSync(at(`content/raw/${t}.json`), 'utf8'))
const allUnits = raw('units').filter((u) => u.is_topic_pick !== 'node').sort((a, b) => a.order - b.order)
const mains = allUnits.filter((u) => u.is_topic_pick !== 'yes')
const units = [...mains, ...allUnits.filter((u) => u.is_topic_pick === 'yes')]
const words = raw('words').filter((w) => !String(w.status).startsWith('off'))
const sentences = raw('sentences')
const sw = raw('sentence_words')
const decisions = JSON.parse(readFileSync(at('content/review-decisions.json'), 'utf8'))
const review = existsSync(at('content/sweep/packs-review.json')) ? JSON.parse(readFileSync(at('content/sweep/packs-review.json'), 'utf8')) : {}
const turnedDown = new Set(Object.values(review).flatMap((r) => Object.keys(r?.reject ?? {})))
const NAMES = new Set([...sw.filter((r) => r.notes === 'name').map((r) => String(r.surface)), ...(decisions.names ?? [])].map((x) => x.toLowerCase()))
const checked = JSON.parse(readFileSync(at('content/checks/words.json'), 'utf8'))
const POS = new Map(checked.map((w) => [w.word_id, w.part_of_speech]))
const IRREGULAR = { man: 'men', woman: 'women', child: 'children', mouse: 'mice' }
const nounMeaning = new Map(checked.filter((w) => w.part_of_speech === 'Noun').map((w) => [w.word_id,
  (/\bplural of /.test(w.gloss) ? w.lemma_gloss : w.gloss).replace(/\([^)]*\)/g, '').split(/[,;/]/).map((x) => x.trim().toLowerCase().replace(/^(a|an|the) /, '')).filter((x) => /^[a-z' -]+$/.test(x)).concat(String(decisions.hints?.[w.word_id] ?? decisions.claude_hints?.[w.word_id]?.hint ?? '').replace(/\([^)]*\)/g, '').split(/[,;/]/).map((x) => x.trim().toLowerCase()).filter((x) => /^[a-z' -]+$/.test(x)))]))
const carriesNouns = (english, parts) => parts.every((p) => {
  const gs = nounMeaning.get(p.word_id)
  if (!gs?.length) return true
  const e = english.toLowerCase()
  return gs.some((g) => [g, g + 's', g + 'es', IRREGULAR[g]].filter(Boolean).some((x) => new RegExp(`\\b${x}\\b`).test(e)))
})
function analyse(text, index) {
  const a = analyseWords(text, index, { names: NAMES })
  if (a.unknown) return null
  for (let k = 0; k < a.parts.length; k++) {
    if (POS.get(a.parts[k].word_id) !== 'Article') continue
    const next = POS.get(a.parts[k + 1]?.word_id)
    if (!a.parts[k + 1] || (next && !['Noun', 'Adjective'].includes(next))) return null
  }
  return a
}

// Same words, and the same kind of sentence: a question never matches a statement (loose() drops the ?).
const lkey = (t) => loose(t) + (/\?\s*$/.test(norm(t)) ? ' ?' : '')
const tatoeba = loadTatoeba(C.tatoeba)
const taken = new Set(sentences.map((s) => lkey(s.french)))
const untrusted = tatoeba.french.filter((s) => { const t = tatoeba.trustOf(s); return !t.native_owner && !t.ok_tag })
const formOf = new Map(words.map((w) => [w.word_id, w.form]))
const off = new Set(sentences.filter((s) => String(s.status).startsWith('off')).map((s) => s.sentence_id))
const drafts = sentences.filter((s) => s.source === 'tamago_original' && !off.has(s.sentence_id))

const OUT = join(ROOT, `_review/${C.name.toLowerCase()}-candidates.md`)
if (existsSync(OUT) && /\*\*(Use|Reject)/.test(readFileSync(OUT, 'utf8'))) throw new Error(`${OUT} carries review marks; not overwriting it`)
const out = [`# ${C.name}: Tatoeba sentences kept out only by the trust rule`, '',
  `November 10, 2026. Each sentence below fits its unit on every other rule the pull applies (every word known by then or a listed name, 2 to 7 words, no digits, articles before a noun or adjective, linked English that carries the unit's nouns, not already in the course, not turned down in review). The only thing missing is the trust signal: its owner hasn't declared ${C.name} native, and it has no OK tag. Nothing has been swapped.`, '',
  'Under each unit: its drafts, each beside the candidates that could replace it: the same sentence on Tatoeba first, then up to three that teach all the draft\'s new words; then the unit\'s other fitting candidates. These haven\'t had my review for idioms or odd lines; they pass the rules only. Links go to Tatoeba, where the owner and any comments can be checked.', '']
const link = (s) => `[#${s.id}](https://tatoeba.org/en/sentences/show/${s.id})`
const esc = (x) => String(x).replace(/\|/g, '\\|')
let total = 0, sameText = 0, covered = 0
const firstFive = new Set(mains.slice(0, 5).map((u) => u.unit_id))
const opened = new Set()
for (const u of units) {
  // A main unit: every unit up to it. A pack: Units 1 to 5 (first node) or all of A1 (second node), and its own words.
  const pack = u.is_topic_pick === 'yes'
  if (!pack) opened.add(u.unit_id)
  const allowed = !pack ? opened : new Set([...((u.topic_node || 'U100') === 'U100' ? firstFive : mains.map((m) => m.unit_id)), u.unit_id])
  const index = formIndexOf(words.filter((w) => allowed.has(w.first_unit)))
  const own = new Set(words.filter((w) => w.first_unit === u.unit_id).map((w) => w.word_id))
  const cands = []
  const seen = new Set()
  for (const s of untrusted) {
    // Quoted dialogue was cut in review whoever the owner, so it's left out here too.
    if (/\d/.test(s.text) || /["«»“”]/.test(s.text) || turnedDown.has(String(s.id))) continue
    const key = lkey(s.text)
    if (seen.has(key)) continue
    const a = analyse(s.text, index)
    if (!a || a.count < 2 || a.count > 7) continue
    const mine = [...new Set(a.parts.map((p) => p.word_id).filter((id) => own.has(id)))]
    if (!mine.length) continue
    const english = [...new Set(tatoeba.englishFor(s.id))].filter((e) => carriesNouns(e, a.parts))
    if (!english.length) continue
    seen.add(key)
    cands.push({ s, key, mine: new Set(mine), english, inCourse: taken.has(key) })
  }
  const fresh = cands.filter((c) => !c.inCourse)
  const unitDrafts = drafts.filter((d) => d.unit_id === u.unit_id)
  if (!fresh.length && !unitDrafts.length) continue
  out.push(`## ${u.unit_id} ${u.title}${pack ? ' (topic)' : ''}`, '', `${unitDrafts.length} drafts · ${fresh.length} candidates that fit`, '')
  const used = new Set()
  if (unitDrafts.length) {
    out.push('| Draft | Could be replaced by | Owner | Why it fits |', '| --- | --- | --- | --- |')
    for (const d of unitDrafts) {
      const dWords = new Set(sw.filter((r) => r.sentence_id === d.sentence_id && own.has(r.word_id)).map((r) => r.word_id))
      // The draft's own text on Tatoeba (in the course already, as this draft) ranks first.
      const exact = cands.find((c) => c.key === lkey(d.french))
      const scored = fresh.map((c) => {
        const overlap = [...dWords].filter((id) => c.mine.has(id)).length
        return { c, all: dWords.size > 0 && overlap === dWords.size, overlap }
      }).filter((x) => x.all && x.c !== exact).sort((a, b) => a.c.s.text.length - b.c.s.text.length)
      const picks = [...(exact ? [{ c: exact, same: true }] : []), ...scored.slice(0, exact ? 2 : 3)]
      const draftCell = `${d.sentence_id} ${esc(d.french)} = ${esc(d.english)}`
      if (!picks.length) { out.push(`| ${draftCell} | none teaches all its new words | | |`); continue }
      picks.forEach((p, i) => {
        used.add(p.c.key)
        const why = p.same ? 'the same sentence' : `has all its new words (${[...dWords].map((id) => formOf.get(id)).join(', ')})`
        out.push(`| ${i ? '' : draftCell} | ${esc(norm(p.c.s.text))} = ${esc(p.c.english[0])} ${link(p.c.s)} | ${esc(p.c.s.owner || 'unknown')} | ${why} |`)
      })
      if (exact) sameText++
      covered++
    }
    out.push('')
  }
  const rest = fresh.filter((c) => !used.has(c.key))
  if (rest.length) {
    out.push(`Other candidates in this unit (${rest.length}):`, '')
    for (const c of rest.slice(0, 25)) out.push(`- ${esc(norm(c.s.text))} = ${esc(c.english[0])} ${link(c.s)} (${esc(c.s.owner || 'unknown')}; new words: ${[...c.mine].map((id) => formOf.get(id)).join(', ')})`)
    if (rest.length > 25) out.push(`- and ${rest.length - 25} more`)
    out.push('')
  }
  total += fresh.length
}
out.splice(4, 0, `**In all:** ${total} candidates across the units. Of the ${drafts.length} drafts, ${sameText} are word for word on Tatoeba from an unchecked owner, and ${covered} have a candidate that teaches all the same new words.`, '')
mkdirSync(join(ROOT, '_review'), { recursive: true })
writeFileSync(OUT, out.join('\n') + '\n')
console.log(`candidates ${total}; drafts ${drafts.length}, same text ${sameText}, covered ${covered}`)
