// The running course's content (src/lib/course.js). main.jsx loads the course's tables (tables-fr.js or
// tables-es.js) and hands them over with useTables before the app's first import, so everything below is ready
// by the time App.jsx runs.
import { contentForUnit, indexContent } from './lesson.js'

export let tables = null
// Every unit at once: review, which spans units, and the About page.
export let allContent = null
export let recordings = []
export function useTables(t) {
  tables = t
  allContent = indexContent(t)
  recordings = [...t.sentences.map((s) => s.native_recording?.audio_file ?? s.lingua_libre?.audio_file), ...t.words.map((w) => w.lingua_libre?.audio_file)].filter(Boolean)
  cache.clear()
}
// One unit's lessons, built once per unit.
const cache = new Map()
export const unitContent = (unitId) => {
  if (!cache.has(unitId)) cache.set(unitId, contentForUnit(tables, unitId))
  return cache.get(unitId)
}
// Answers approved in Flag review apply on this device at once; clearing the unit cache rebuilds lessons with them.
export function addAccepted(rows) {
  const have = new Set(tables.accepted_answers.map((a) => `${a.sentence_id}|${a.direction}|${a.answer}`))
  for (const r of rows) if (!have.has(`${r.sentence_id}|${r.direction}|${r.answer}`)) tables.accepted_answers.push({ ...r, status: 'live' })
  cache.clear()
}
