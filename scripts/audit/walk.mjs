// Shared by the audits (Dan's word-introduction and playthrough audits, 2026-11-12/13): load a course's tables and walk
// its tree in order the way one learner would, every circle (a topic node stands for its packs), every round, the
// app's own number of lessons per round, everything answered right. Mirrors App: seen words grow by each question's
// segments and word_ids; the round's seen counts follow recordPass. Run from the repo root.
import { readFileSync, readdirSync } from 'node:fs'
import { buildLesson, contentForUnit, lessonsInRound } from '../../src/lib/lesson.js'

// AUDIT_COURSES=Spanish,German limits a run to those courses (2026-11-14).
export const COURSES = [['French', 'content', 'fr'], ['Spanish', 'content-es', 'es'], ['German', 'content-de', 'de']].filter(([name]) => !process.env.AUDIT_COURSES || process.env.AUDIT_COURSES.split(',').includes(name))
export const seeded = (seed) => { let x = seed; return () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296 } }
export function tablesOf(dir) {
  const t = {}
  for (const f of readdirSync(`src/${dir}`)) t[f.replace('.json', '')] = JSON.parse(readFileSync(`src/${dir}/${f}`))
  return t
}
export function treeOrder(t) {
  const unit = (id) => t.units.find((u) => u.unit_id === id)
  const out = []
  for (const row of [...t.tree_layout].sort((a, b) => a.row - b.row || a.position - b.position)) {
    const u = unit(row.unit_id)
    if (!u || !String(u.status).startsWith('live')) continue
    if (u.is_topic_pick === 'node') out.push(...t.units.filter((x) => x.is_topic_pick === 'yes' && x.topic_node === u.unit_id && String(x.status).startsWith('live')).sort((a, b) => a.order - b.order))
    else out.push(u)
  }
  return out
}
// onQuestion(q, { u, c, round, lesson, index, newHere, seen }) for every question, in order; onLesson after each lesson.
export function walk(t, onQuestion, onLesson = () => {}) {
  const seen = new Set()
  for (const u of treeOrder(t)) {
    const c = contentForUnit(t, u.unit_id)
    const roundSeen = {}
    for (let round = 1; round <= 5; round++) {
      for (let lesson = 1; lesson <= lessonsInRound(c, round); lesson++) {
        const rs = roundSeen[round] ??= { sentences: {}, words: {} }
        const built = buildLesson(c, { round, seen: rs, known: seen, unit_id: u.unit_id, rng: seeded(u.order * 1000 + round * 50 + lesson) })
        let fresh = 0
        built.queue.forEach((q, index) => {
          const ids = [...new Set([...(q.segments ?? []).map((s) => s.word_id).filter(Boolean), ...(q.word_ids ?? [])])]
          const newHere = ids.filter((id) => !seen.has(id))
          fresh += newHere.length
          onQuestion(q, { u, c, t, round, lesson, index, newHere, seen })
          for (const id of ids) seen.add(id)
        })
        onLesson({ u, round, lesson, fresh })
        for (const q of built.queue.slice(0, built.size)) {
          if (q.sentence_id || q.item_id) rs.sentences[q.sentence_id ?? q.item_id] = (rs.sentences[q.sentence_id ?? q.item_id] ?? 0) + 1
          for (const id of q.word_ids ?? []) rs.words[id] = (rs.words[id] ?? 0) + 1
        }
      }
    }
  }
}
