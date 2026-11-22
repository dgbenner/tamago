// Polish verb-form hints (Fable's phase 6 review, verdict 1, 2026-11-22): a conjugated form whose hint was its
// infinitive's ("to be (być)" on jestem) gets the person form, "I am (być)", as the other forms already read
// ("I love (kochać)", "writes (pisać)"). The person comes from the form's own Wiktionary line ("first-person singular
// present of być") or, where the check read the lemma's gloss only, from the lemma's {{pl-conj}} table in
// content-pl/checks/conjugations.json; the English verb is the hint's own (Wiktionary's gloss). Polish only: it writes
// content-pl/review-decisions.json claude_hints and touches no shared step (the form-of hint step for every course is
// another session's). Run after check-content. Usage: COURSE=pl node scripts/review/pl-verb-hints.mjs
import { join } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
const P = (f) => join(import.meta.dirname, '../../content-pl', f)
const readJ = (f) => JSON.parse(readFileSync(f, 'utf8'))
const checks = readJ(P('checks/words.json'))
const conj = readJ(P('checks/conjugations.json'))
const raw = readJ(P('raw/words.json')).filter((w) => !String(w.status).startsWith('off'))
const dec = readJ(P('review-decisions.json'))
const SKIP = new Set(['W269']) // może: both readings, set by hand (verdict 2)

const PERSON = { 'first-person singular': 'ja', 'second-person singular': 'ty', 'third-person singular': 'on', 'first-person plural': 'my', 'second-person plural': 'wy', 'third-person plural': 'oni' }
const third = (v) => {
  const [head, ...rest] = v.split(' ')
  const IRR = { be: 'is', have: 'has', can: 'can', must: 'must', do: 'does', go: 'goes' }
  const h = IRR[head] ?? (/(s|sh|ch|x|z|o)$/.test(head) ? head + 'es' : /[^aeiou]y$/.test(head) ? head.slice(0, -1) + 'ies' : head + 's')
  return [h, ...rest].join(' ')
}
const inflect = (v, person) => {
  if (/^be able( to)?$/.test(v)) v = 'can'
  if (v === 'be') return { ja: 'I am', ty: 'you are', on: 'is', my: 'we are', wy: 'you all are', oni: 'they are' }[person]
  return { ja: `I ${v}`, ty: `you ${v}`, on: third(v), my: `we ${v}`, wy: `you all ${v}`, oni: `they ${v}` }[person]
}
// A set phrase the form lives in, shown after the lemma (nazywam się is how the course uses nazywam).
const PHRASE = { nazywam: 'nazywam się: my name is', nazywasz: 'nazywasz się: your name is', nazywa: 'nazywa się: his/her name is' }

// The meanings the course already shows, as the engine compares them (lesson.js hintCore: lower case, no brackets).
const core = (h) => String(h ?? '').toLowerCase().replace(/\(.*?\)/g, '').replace(/[^\p{L}\p{N}' ]/gu, ' ').replace(/\s+/g, ' ').trim()
const BUILT = /^built from Wiktionary \(scripts\/review\/pl-verb-hints/
const cores = new Set(raw.map((w) => dec.hints?.[w.word_id] ?? (BUILT.test(dec.claude_hints?.[w.word_id]?.source ?? '') ? '' : dec.claude_hints?.[w.word_id]?.hint)).filter(Boolean).map(core))
let n = 0
const out = []
for (const w of raw) {
  if (SKIP.has(w.word_id)) continue
  const c = checks.find((x) => x.word_id === w.word_id)
  if (!c || c.part_of_speech !== 'Verb' || !c.lemma || c.lemma === w.form) continue
  // A hint this script built before keeps what it was built from (`was`), so a second run builds the same.
  const prev = dec.claude_hints?.[w.word_id]
  const cur = dec.hints?.[w.word_id] ?? (prev && BUILT.test(prev.source) ? prev.was : prev?.hint) ?? ''
  const built = cur || String(c.lemma_gloss || c.gloss).split(/[;(]/)[0].trim()
  if (!/^to /.test(built)) continue
  const g = String(c.gloss).match(/(first|second|third)-person (singular|plural) (present|imperative|future)/)
  let person = g && PERSON[`${g[1]}-person ${g[2]}`]
  const mood = g?.[3] ?? 'present'
  if (!person) {
    const row = (conj[c.lemma] ?? []).find((t) => t.form.split(/ or |, /).includes(w.form))
    person = row && { ja: 'ja', ty: 'ty', on: 'on', my: 'my', wy: 'wy', oni: 'oni' }[row.person.split(', ')[0]]
    if (!person) { console.warn(`  ${w.word_id} ${w.form}: no person found, left as "${built}"`); continue }
  }
  // The English senses: "to call, to name (nazywać)" gives call, name; at most two.
  const senses = built.replace(/\s*\([^)]*\)\s*$/, '').split(/, /).map((s) => s.replace(/^to /, '').trim()).filter(Boolean)
  let uniq = [...new Set(senses.map((s) => (/^be able( to)?$/.test(s) ? 'can' : s)))].slice(0, 2)
  const render = (list) => (mood === 'imperative' ? list.map((s) => `${s}!`).join(', ') : list.map((s) => inflect(s, person)).join(', '))
  // A meaning another word already has (jadę and idę both "I go"; umiem and mogę both "I can") takes the lemma's next
  // Wiktionary sense too, so the two read apart: "I go, I ride (jechać)", "I can, I know how (umieć)".
  if (uniq.length === 1 && cores.has(core(render(uniq)))) {
    const lemmaGloss = c.lemma_gloss || checks.find((x) => x.lemma === c.lemma && x.lemma_gloss)?.lemma_gloss || ''
    const more = String(lemmaGloss).replace(/\[[^\]]*\]/g, '').split(/[;,]/).map((x) => x.trim()).filter((x) => /^(to |can$)/.test(x)).map((x) => x.replace(/^to /, ''))
      .map((x) => (/^be able( to)?$/.test(x) ? 'can' : x)).find((x) => !uniq.includes(x))
    if (more) uniq = [...uniq, more]
  }
  const english = render(uniq)
  cores.add(core(english))
  const hint = `${english} (${[c.lemma, PHRASE[w.form]].filter(Boolean).join('; ')})`
  dec.claude_hints[w.word_id] = { hint, was: cur || built, source: `built from Wiktionary (scripts/review/pl-verb-hints.mjs): ${g ? `${w.form} "${c.gloss}"` : `${c.lemma}'s {{pl-conj}} table, ${person} row ${w.form}`}; English from ${c.lemma}: "${String(c.lemma_gloss || c.gloss).slice(0, 80)}"` }
  out.push(`${w.word_id} ${w.form}: ${cur || built} -> ${hint}`)
  n++
}
writeFileSync(P('review-decisions.json'), JSON.stringify(dec, null, 1) + '\n')
console.log(out.join('\n'))
console.log(`verb-form hints built: ${n}`)
