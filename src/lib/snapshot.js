// Course Snapshot on the Developer page: exact numbers worked out from a course's shipped tables (Dan, 2026-11-10:
// the content report, for French and Spanish side by side). Also used by scripts/content-report.mjs.
import { BUILT_TYPES, recordingOf } from './lesson.js'

const live = (u) => String(u.status).startsWith('live')
const pct = (n, total) => (total ? `${Math.round((n * 100) / total)}%` : '0%')
const n = (x) => Math.round(x).toLocaleString('en-US')

// Minutes per lesson by round when the device has no lesson log yet: the craft review's timings (2026-11-10: round 1
// about 2 to 4 minutes, round 4 about 6 to 8 with typing and speaking), filled in between.
export const DEFAULT_MINUTES = [3, 4, 5, 7, 7]
const WORD_TYPES = new Set(['QT01', 'QT02']) // match pairs and word to image ask about words, not sentences

// The pieces of the report, as numbers.
export function contentNumbers(tables, { lessonLog = [] } = {}) {
  const mains = tables.units.filter((u) => live(u) && !['yes', 'node'].includes(u.is_topic_pick))
  const packs = tables.units.filter((u) => live(u) && u.is_topic_pick === 'yes')
  const s = tables.sentences
  const drafted = s.filter((x) => x.source === 'tamago_original').length
  const fable = s.filter((x) => x.source === 'tatoeba' && /Fable/.test(x.notes ?? '')).length
  const checked = s.length - drafted - fable
  const recorded = tables.words.filter((w) => w.lingua_libre).length
  const lessonsOf = (u) => (u.lesson_counts ?? []).reduce((a, b) => a + b, 0)
  // Distinct questions: every sentence of a unit, once for each sentence type its rounds ask (QT09 only for the
  // questions that have answers), plus each word for match pairs, and each pictured word for word to image.
  const mix = (r) => [...new Set(tables.round_type_mix.filter((m) => m.round === r && Number(m.questions_per_10) > 0).map((m) => m.type_id))].filter((t) => BUILT_TYPES.has(t))
  const asked = new Set(tables.qa_answers.map((q) => q.question_sentence_id))
  let questions = 0
  for (const u of [...mains, ...packs]) {
    const us = s.filter((x) => x.unit_id === u.unit_id)
    const uw = tables.words.filter((w) => w.first_unit === u.unit_id)
    for (let r = 1; r <= 5; r++) for (const t of mix(r)) {
      if (t === 'QT01') questions += uw.length
      else if (t === 'QT02') questions += uw.filter((w) => w.image_file).length
      else if (t === 'QT09') questions += us.filter((x) => asked.has(x.sentence_id)).length
      else if (!WORD_TYPES.has(t)) questions += us.length
    }
  }
  // Minutes per lesson by round: the median of this device's log for that round (with 3 or more lessons), else the
  // review's timings.
  const minutes = [1, 2, 3, 4, 5].map((r, i) => {
    const d = lessonLog.filter((l) => l.round === r && l.duration_ms > 0 && l.duration_ms < 60 * 60 * 1000).map((l) => l.duration_ms).sort((a, b) => a - b)
    return d.length >= 3 ? { min: d[Math.floor(d.length / 2)] / 60000, from: 'log', count: d.length } : { min: DEFAULT_MINUTES[i], from: 'review', count: d.length }
  })
  const hoursFor = (units) => units.reduce((h, u) => h + (u.lesson_counts ?? []).reduce((a, c, i) => a + c * minutes[i].min, 0), 0) / 60
  return {
    sentences: s.length, checked, fable, drafted, words: tables.words.length, recorded,
    mains: mains.length, packs: packs.length, lessonsA1: mains.reduce((a, u) => a + lessonsOf(u), 0), lessonsPacks: packs.reduce((a, u) => a + lessonsOf(u), 0),
    questions, hoursA1: hoursFor(mains), hoursPack: packs.length ? hoursFor(packs) / packs.length : 0, minutes,
  }
}

export function snapshotRows(tables, name, opts) {
  const c = contentNumbers(tables, opts)
  const toEn = tables.accepted_answers.filter((a) => a.direction === 'fr_to_en').length
  const wordRec = c.recorded
  const sentRec = tables.sentences.filter((x) => recordingOf(x)).length
  const fromLog = c.minutes.every((m) => m.from === 'log')
  return [
    ['Sentences', n(c.sentences)],
    ['· Tatoeba, checked', `${n(c.checked)} (${pct(c.checked, c.sentences)})`],
    ['· Tatoeba, reviewed by Fable', `${n(c.fable)} (${pct(c.fable, c.sentences)})`],
    ['· Drafted by Claude (native check list)', `${n(c.drafted)} (${pct(c.drafted, c.sentences)})`],
    ['Words', n(c.words)],
    ['Words with a native recording', `${n(c.recorded)} (${pct(c.recorded, c.words)})`],
    ['Units and topic packs', `${n(c.mains)} A1 units, ${n(c.packs)} topic packs`],
    ['Lessons', `${n(c.lessonsA1)} in the A1 units, ${n(c.lessonsPacks)} more in the topic packs`],
    ['Distinct questions, about', `${n(c.questions)} (each sentence in each question type its rounds ask; each word in match pairs and pictures)`],
    ['Hours to finish A1, about', `${c.hoursA1.toFixed(0)} (${fromLog ? 'from this device\'s lesson times' : c.minutes.some((m) => m.from === 'log') ? 'partly from this device\'s lesson times' : 'from the craft review\'s lesson times; this device has too few lessons logged'}: ${c.minutes.map((m, i) => `round ${i + 1} ${m.min.toFixed(1)} min`).join(', ')}); a topic pack adds about ${c.hoursPack.toFixed(1)}`],
    ['Accepted answers', `${n(toEn)} English (${name} to English), ${n(tables.accepted_answers.length - toEn)} ${name} (English to ${name})`],
    ['Question-and-answer pairs', n(tables.qa_answers.length)],
    ['Grammar notes', n(tables.grammar_notes.length)],
    ['"I can" statements', n(tables.can_do.length)],
    ['Native recordings', `${n(sentRec + wordRec)}: ${n(wordRec)} words, ${n(sentRec)} sentences`],
    ['Word pictures', n(tables.words.filter((w) => w.image_file).length)],
    ['Question types built', `${n(tables.question_types.filter((t) => BUILT_TYPES.has(t.type_id)).length)} of ${n(tables.question_types.length)}`],
    ['Question variants live', `${n(tables.variants.filter((v) => String(v.status).startsWith('live')).length)} of ${n(tables.variants.length)}`],
  ]
}

// A course's lesson log on this device, without creating its database if the course was never opened here.
export async function lessonLogFor(dbName) {
  try {
    // Opening a database that isn't there would create it empty and break that course later, so only read one the
    // browser can confirm exists (a browser that can't list them gets nothing here).
    if (!indexedDB.databases || !(await indexedDB.databases()).some((d) => d.name === dbName)) return []
    const db = await new Promise((resolve, reject) => { const q = indexedDB.open(dbName); q.onsuccess = () => resolve(q.result); q.onerror = reject })
    if (!db.objectStoreNames.contains('lessons')) { db.close(); return [] }
    const rows = await new Promise((resolve) => { const q = db.transaction('lessons').objectStore('lessons').getAll(); q.onsuccess = () => resolve(q.result); q.onerror = () => resolve([]) })
    db.close()
    return rows
  } catch { return [] }
}
