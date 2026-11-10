// Course Snapshot on the Developer page: exact numbers worked out from a course's shipped tables.
import { BUILT_TYPES, recordingOf } from './lesson.js'

export function snapshotRows(tables, name) {
  const live = (u) => String(u.status).startsWith('live')
  const mainUnits = tables.units.filter((u) => live(u) && !['yes', 'node'].includes(u.is_topic_pick))
  const packUnits = tables.units.filter((u) => live(u) && u.is_topic_pick === 'yes')
  const bySource = (src) => tables.sentences.filter((x) => x.source === src).length
  const toEn = tables.accepted_answers.filter((a) => a.direction === 'fr_to_en').length
  const n = (x) => x.toLocaleString('en-US')
  const wordRec = tables.words.filter((w) => w.lingua_libre).length
  const sentRec = tables.sentences.filter((x) => recordingOf(x)).length
  return [
    ['Units', `${n(mainUnits.length)} A1 units, ${n(packUnits.length)} topic packs`],
    ['Sentences', `${n(tables.sentences.length)}: ${n(bySource('tatoeba'))} from Tatoeba, ${n(bySource('tamago_original'))} written for Tamago`],
    ['Native-speaker check list', `${n(bySource('tamago_original'))} sentences`],
    ['Words', n(tables.words.length)],
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
