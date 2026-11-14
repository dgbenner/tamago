// Playthrough audit, every-lesson check (Dan, 2026-11-12): every question of every lesson as one learner walks each
// course in tree order. Choices (duplicates, near-duplicates by punctuation or contraction, a wrong choice that's also
// right, a picture twice, a cognate pair), whether the right answer is accepted and a wrong one refused, whether the
// chips can build the answer, translations, recordings on disk and whether a Lingua Libre recording names the same
// word. Writes JSON to the path given (default logic-issues.json in the working directory).
//   node scripts/audit/logic-audit.mjs [out.json]
import { existsSync, writeFileSync } from 'node:fs'
import { checkTyped, sameAnswer } from '../../src/lib/check.js'
import { isCognate } from '../../src/lib/lesson.js'
import { COURSES, tablesOf, walk } from './walk.mjs'

const out = process.argv[2] ?? 'logic-issues.json'
const fold = (t) => String(t ?? '').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[’ʼ]/g, "'").replace(/[^\p{L}\p{N}' ]/gu, ' ').replace(/\s+/g, ' ').trim()
const core = (h) => String(h ?? '').toLowerCase().replace(/\(.*?\)/g, '').replace(/[^\p{L}\p{N}' ]/gu, ' ').replace(/\s+/g, ' ').trim()
const issues = new Map()
const add = (key, issue) => { const x = issues.get(key); if (x) x.count++; else issues.set(key, { ...issue, count: 1 }) }
const stats = {}
const fileOk = (f) => !f || existsSync(`public${decodeURI(f)}`)
const llWord = (ll) => { const m = /-([^-]+)\.(wav|ogg|mp3|flac)$/i.exec(ll?.file ?? ''); return m ? fold(m[1].replace(/_/g, ' ')) : null }

for (const [course, dir] of COURSES) {
  const t = tablesOf(dir)
  const st = stats[course] = { questions: 0, lessons: 0, byType: {} }
  walk(t, (q, { u, c, round, lesson, newHere }) => {
    st.questions++; st.byType[q.type] = (st.byType[q.type] ?? 0) + 1
    const at = { course, circle: u.title, round, lesson, type: q.type, where: 'logic' }
    const k = (what) => `${course}|${q.sentence_id ?? q.word_id ?? (q.word_ids ?? []).join(',')}|${q.type}|${what}`
    const vocab = c.vocabulary?.[q.lang] ?? new Set()
    if (q.choices) {
      const texts = q.choices.map((x) => (typeof x === 'string' ? x : x.label ?? x.alt ?? x.word_id))
      if (texts.some((x) => !String(x ?? '').trim())) add(k('empty'), { ...at, issue: `empty choice among ${JSON.stringify(texts)}`, severity: 'high' })
      const meaningType = q.type === 'QT03' || (q.type === 'QT04' && q.variant === 'V0404')
      const alike = texts.some((a, i) => texts.some((b, j) => j > i && (fold(a) === fold(b) || (meaningType && sameAnswer(a, b, 'en')))))
      if (alike && q.type !== 'QT02') add(k('dup'), { ...at, issue: `choices read the same: ${JSON.stringify(texts)}`, severity: 'high' })
      if (meaningType) {
        const right = [q.answer, ...t.accepted_answers.filter((a) => a.sentence_id === q.sentence_id && a.direction === 'fr_to_en').map((a) => a.answer)]
        for (const ch of q.choices) if (ch !== q.answer && right.some((r) => sameAnswer(ch, r, 'en'))) add(k('also right'), { ...at, issue: `the wrong choice "${ch}" is also right for "${q.french}"`, severity: 'high' })
      }
      if (q.type === 'QT02') {
        if (new Set(q.choices.map((x) => x.image)).size !== q.choices.length) add(k('picture twice'), { ...at, issue: `a picture twice: ${q.choices.map((x) => `${x.alt}=${x.image.split('/').pop()}`).join(', ')}`, severity: 'high' })
        if (new Set(q.choices.map((x) => core(x.alt))).size !== q.choices.length) add(k('meaning twice'), { ...at, issue: `a meaning twice: ${q.choices.map((x) => x.alt).join(', ')}`, severity: 'high' })
      }
    }
    if (q.audioChoices && new Set(q.audioChoices.map((a) => fold(a.french))).size !== q.audioChoices.length) add(k('audio dup'), { ...at, issue: 'audio choices say the same thing', severity: 'high' })
    if (q.pairs) {
      if (new Set(q.pairs.map((p) => core(p.hint))).size !== q.pairs.length) add(k('pair meaning'), { ...at, issue: `two pairs share a meaning: ${q.pairs.map((p) => `${p.form}=${p.hint}`).join(', ')}`, severity: 'high' })
      for (const p of q.pairs) {
        if (isCognate(p)) add(`${course}|cognate|${p.word_id}`, { ...at, issue: `a pair reads the same as its meaning: ${p.form} = ${p.hint}`, severity: 'low' })
        if (!String(p.hint ?? '').trim()) add(`${course}|hint|${p.word_id}`, { ...at, issue: `match pair "${p.form}" has no meaning`, severity: 'high' })
        if (!fileOk(p.audio?.file)) add(`${course}|file|${p.audio.file}`, { ...at, issue: `recording missing on disk: ${p.audio.file}`, severity: 'medium' })
      }
    }
    if (q.sentence_id && !String(q.english ?? '').trim()) add(k('no english'), { ...at, issue: 'sentence has no English translation', severity: 'high' })
    for (const sg of q.segments ?? []) if (sg.word_id && newHere.includes(sg.word_id) && !sg.hint && ['QT03', 'QT05', 'QT06'].includes(q.type)) add(`${course}|nohint|${sg.word_id}`, { ...at, issue: `new word "${sg.text}" shown with no meaning under it`, severity: 'medium' })
    if (q.audio?.file) {
      if (!fileOk(q.audio.file)) add(`${course}|file|${q.audio.file}`, { ...at, issue: `recording missing on disk: ${q.audio.file}`, severity: 'medium' })
      const s = c.sentenceById.get(q.sentence_id)
      const said = llWord(s?.lingua_libre)
      if (said && fold(q.french) !== said && !fold(q.french).split(' ').every((w) => said.split(' ').includes(w))) add(k('ll'), { ...at, issue: `recording is Lingua Libre "${said}" but the sentence reads "${q.french}"`, severity: 'high' })
    }
    if (q.accepted?.length) {
      const opts = { lang: q.lang, vocabulary: vocab }
      if (!checkTyped(q.accepted[0], q.accepted, opts).correct) add(k('main'), { ...at, issue: `the main answer "${q.accepted[0]}" is marked wrong`, severity: 'critical' })
      if (q.chips) {
        const src = q.type === 'QT06' ? null : q.type === 'QT09' ? t.sentences.find((x) => x.french === q.shown) : c.sentenceById.get(q.sentence_id)
        const intended = q.type === 'QT06' ? q.english.replace(/[.,!?;:]/g, ' ').split(/\s+/).filter(Boolean) : (c.swBySentence.get(src?.sentence_id) ?? []).map((row) => (row.notes === 'name' ? row.surface : String(row.surface).toLowerCase()))
        if (q.type === 'QT06' || src) {
          const bag = [...q.chips]
          const missing = intended.filter((x) => { const i = bag.indexOf(x); if (i < 0) return true; bag.splice(i, 1); return false })
          if (missing.length || !intended.length) add(k('chips'), { ...at, issue: `the chips can't build "${q.shown}" (missing ${JSON.stringify(missing)})`, severity: 'critical' })
          else if (!checkTyped(intended.join(' '), q.accepted, opts).correct) add(k('chip answer'), { ...at, issue: `building the answer from chips ("${intended.join(' ')}") is marked wrong`, severity: 'critical' })
        }
      }
      const w = q.accepted[0].split(/\s+/)
      if (w.length >= 3) {
        const wrong = w.slice(0, -1).join(' ')
        if (!q.accepted.some((a) => fold(a) === fold(wrong)) && checkTyped(wrong, q.accepted, opts).correct) add(k('wrong ok'), { ...at, issue: `a wrong answer ("${wrong}") is marked right`, severity: 'high' })
      }
      if (checkTyped('zzz qqq', q.accepted, opts).correct) add(k('nonsense'), { ...at, issue: 'nonsense is marked right', severity: 'critical' })
    }
  }, () => { st.lessons++ })
}
const list = [...issues.values()]
writeFileSync(out, JSON.stringify({ stats, issues: list }, null, 1))
const by = {}
for (const i of list) { const kk = `${i.course} | ${i.issue.replace(/["(:].*$/, '').trim()} | ${i.severity}`; by[kk] = (by[kk] ?? 0) + 1 }
console.log(JSON.stringify(Object.fromEntries(Object.entries(stats).map(([k, v]) => [k, { lessons: v.lessons, questions: v.questions }]))))
console.log(Object.entries(by).sort().map(([kk, v]) => `${v}\t${kk}`).join('\n') || 'no issues')
