// The A1 task question types (A1 Complete, section 5, 2026-11-10). Pure, so the tests run them against real data.
//   QT14 Read a short text (menu, sign, timetable, message), then 2 or 3 questions. Reading.
//   QT15 Fill in a form (name, age, address, nationality, phone) from a short card. Writing, checked by rules.
//   QT16 Write a short message to a prompt. Writing; Claude gives feedback; not scored; counts as done.
//   QT17 Listen and write the number, price, time or date. Listening; checked as values, not text.
// Their items live in the workbook's a1_texts, a1_forms, a1_prompts and a1_listen tabs, tied to a circle like
// sentences are. They follow the existing rules: no timers, hints never cost a strike, Can't Listen Now swaps.

export const A1_TYPES = {
  QT14: { name: 'Read and Answer', skill: 'reading', table: 'a1_texts', rounds: [2, 5] },
  QT15: { name: 'Fill In the Form', skill: 'writing', table: 'a1_forms', rounds: [3, 5] },
  QT16: { name: 'Write a Message', skill: 'writing', table: 'a1_prompts', rounds: [4, 5] },
  QT17: { name: 'Write What You Hear', skill: 'listening', table: 'a1_listen', rounds: [2, 5] },
}

// Case, accents and punctuation don't count (e matches é); spaces collapse.
export const foldText = (t) => String(t ?? '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/ß/g, 'ss').replace(/[’ʼ]/g, "'").replace(/[.,!?¿¡;:«»„“”"()]/g, ' ').replace(/\s+/g, ' ').trim()
const digits = (t) => String(t ?? '').replace(/\D/g, '')

// A value as the learner might write it, by kind:
//   number "47"; price "3,50 €" "3.50" "3,5" "€3.50" (to cents); time "14h30" "14:30" "14.30" "14 h" (hh:mm);
//   date "12/3" "12.03." "12-03" (day and month; a year if given). Returns null when it can't be read.
export function readValue(kind, raw) {
  const t = String(raw ?? '').trim().toLowerCase()
  if (!t) return null
  if (kind === 'number') { const d = t.replace(/[\s.'’]/g, ''); return /^-?\d+$/.test(d) ? String(Number(d)) : null }
  if (kind === 'phone') { const d = digits(t); return d.length >= 4 ? d : null }
  if (kind === 'price') {
    const m = t.replace(/[€$£]|eur(os?)?|euro|usd|pesos?|cents?|centimes?/g, ' ').replace(/\s+/g, '').match(/^(\d+)(?:[.,](\d{1,2}))?$/)
    if (!m) return null
    return (Number(m[1]) * 100 + Number((m[2] ?? '0').padEnd(2, '0'))).toString()
  }
  if (kind === 'time') {
    const m = t.replace(/\s+/g, '').replace(/uhr$/, 'h').match(/^(\d{1,2})(?:[h:.](\d{2})?)?h?$/)
    if (!m || Number(m[1]) > 24 || Number(m[2] ?? 0) > 59) return null
    return `${String(Number(m[1])).padStart(2, '0')}:${String(Number(m[2] ?? 0)).padStart(2, '0')}`
  }
  if (kind === 'date') {
    const m = t.replace(/\s+/g, '').match(/^(\d{1,2})[./-](\d{1,2})(?:[./-](\d{2,4}))?\.?$/)
    if (!m || Number(m[1]) > 31 || Number(m[2]) > 12 || Number(m[1]) < 1 || Number(m[2]) < 1) return null
    return `${Number(m[1])}/${Number(m[2])}${m[3] ? `/${m[3].length === 2 ? `20${m[3]}` : m[3]}` : ''}`
  }
  return null
}
// A date matches on day and month; a year counts only if the expected answer has one.
export function sameValue(kind, expected, given) {
  const a = readValue(kind, expected)
  const b = readValue(kind, given)
  if (a === null || b === null) return false
  if (kind === 'date') { const [ad, am, ay] = a.split('/'); const [bd, bm, by] = b.split('/'); return ad === bd && am === bm && (!ay || ay === by) }
  return a === b
}

// QT15: each field by its rule. text: the listed answers, ignoring case, accents and punctuation; number and phone
// as values. Returns per-field results and whether all are right.
export function checkForm(fields, values) {
  const results = fields.map((f) => {
    const given = values[f.key] ?? ''
    const ok = f.rule === 'number' ? sameValue('number', f.answer, given)
      : f.rule === 'phone' ? sameValue('phone', f.answer, given)
        : [f.answer, ...(f.also ?? [])].some((a) => foldText(a) === foldText(given))
    return { key: f.key, ok, expected: f.answer }
  })
  return { results, correct: results.every((r) => r.ok) }
}

// QT16: words written, for the length guide (30 to 40 for a postcard). Never a pass mark.
export const wordCount = (t) => String(t ?? '').trim().split(/\s+/).filter((w) => /\p{L}/u.test(w)).length

const inRounds = (type, round) => round >= A1_TYPES[type].rounds[0] && round <= A1_TYPES[type].rounds[1]

// A question for one item. QT16 is never graded (ungraded: done counts, like speaking, but no swap).
export function makeA1Question(type, item, round, { cantListen = false } = {}) {
  const base = { qid: `${type}-${item.id}-${Math.floor(Math.random() * 1e9)}`, type, round, skill: A1_TYPES[type].skill, item_id: item.id, variant: `${type}-1` }
  if (type === 'QT14') return { ...base, kind: item.kind, title: item.title ?? '', lines: item.lines, questions: item.questions }
  if (type === 'QT15') return { ...base, card: item.card, fields: item.fields }
  if (type === 'QT16') return { ...base, ungraded: true, prompt: item.prompt, points: item.points ?? [], min: item.min_words ?? 20, max: item.max_words ?? 40 }
  // QT17: heard, or with Can't Listen Now, read (the words written out) and answered the same way.
  return { ...base, kind: item.kind, audio: { french: item.say }, answer: item.answer, shown: `${item.answer} · ${item.say}`, lang: 'fr', readInstead: Boolean(cantListen), skill: cantListen ? 'reading' : 'listening' }
}

// The circle's A1 task items that fit this round, one per lesson at most, the least seen first.
export function a1QuestionFor(c, unitId, round, { seen = {}, cantListen = false, rng = Math.random } = {}) {
  const pool = []
  for (const [type, d] of Object.entries(A1_TYPES)) {
    if (!inRounds(type, round)) continue
    for (const item of c[d.table] ?? []) if (item.unit_id === unitId) pool.push({ type, item })
  }
  if (!pool.length) return null
  pool.sort((a, b) => (seen[a.item.id] ?? 0) - (seen[b.item.id] ?? 0) || rng() - 0.5)
  return makeA1Question(pool[0].type, pool[0].item, round, { cantListen })
}
