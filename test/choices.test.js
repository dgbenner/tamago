// Choices and word order (Dan, 2026-11-13, from the playthrough and word audits), across all three courses, so new
// content can't bring the problems back:
//   - no two choices that read the same, even with different punctuation or a contraction ("You're" / "You are")
//   - no wrong choice that is also an accepted answer
//   - no picture, and no meaning, twice in one picture question
//   - Match Pairs never shows a cognate (sandwich = sandwich) and never two pairs with the same meaning
//   - a lesson brings at most 4 new words, each first met where its meaning is shown (Match Pairs, Pick the Picture,
//     Pick the Meaning), never by ear, in a blank, a build or a typing question
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { buildLesson, contentForUnit, isCognate, lessonsInRound } from '../src/lib/lesson.js'
import { sameAnswer } from '../src/lib/check.js'

const seeded = (seed) => { let x = seed; return () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296 } }
const core = (h) => String(h ?? '').toLowerCase().replace(/\(.*?\)/g, '').replace(/[^\p{L}\p{N}' ]/gu, ' ').replace(/\s+/g, ' ').trim()
const COURSES = ['content', 'content-es', 'content-de'].map((dir) => {
  const t = {}
  for (const f of readdirSync(`src/${dir}`)) t[f.replace('.json', '')] = JSON.parse(readFileSync(`src/${dir}/${f}`))
  return { dir, t }
})
const treeOrder = (t) => {
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

function checkQuestion(q, c, where) {
  if (q.choices && (q.type === 'QT03' || (q.type === 'QT04' && q.variant === 'V0404'))) {
    for (let i = 0; i < q.choices.length; i++) for (let j = i + 1; j < q.choices.length; j++) {
      assert.ok(!sameAnswer(q.choices[i], q.choices[j], 'en'), `${where}: choices read the same: "${q.choices[i]}" / "${q.choices[j]}"`)
    }
    const right = [q.answer, ...c.accepted_answers.filter((a) => a.sentence_id === q.sentence_id && a.direction === 'fr_to_en').map((a) => a.answer)]
    for (const ch of q.choices) if (ch !== q.answer) assert.ok(!right.some((r) => sameAnswer(ch, r, 'en')), `${where}: the wrong choice "${ch}" is also right for "${q.french}"`)
  }
  if (q.type === 'QT05') assert.equal(new Set(q.choices.map((x) => x.toLowerCase())).size, q.choices.length, `${where}: duplicate blank choices ${q.choices}`)
  if (q.type === 'QT02') {
    assert.equal(new Set(q.choices.map((x) => x.image)).size, q.choices.length, `${where}: a picture twice (${q.choices.map((x) => x.image)})`)
    assert.equal(new Set(q.choices.map((x) => core(x.alt))).size, q.choices.length, `${where}: a meaning twice (${q.choices.map((x) => x.alt)})`)
  }
  if (q.type === 'QT01') {
    for (const p of q.pairs) assert.ok(!isCognate(p), `${where}: a cognate pair, ${p.form} = ${p.hint}`)
    assert.equal(new Set(q.pairs.map((p) => core(p.hint))).size, q.pairs.length, `${where}: two pairs share a meaning`)
  }
  if (q.audioChoices) assert.equal(new Set(q.audioChoices.map((a) => a.french.toLowerCase())).size, q.audioChoices.length, `${where}: audio choices say the same thing`)
}

for (const { dir, t } of COURSES) {
  test(`${dir}: every circle and round: no duplicate, near-duplicate or also-right choices; no picture twice; no cognate pairs`, () => {
    const all = new Set(t.words.map((w) => w.word_id))
    for (const u of treeOrder(t)) {
      const c = contentForUnit(t, u.unit_id)
      for (let round = 1; round <= 5; round++) for (let seed = 1; seed <= 3; seed++) {
        for (const q of buildLesson(c, { round, known: all, unit_id: u.unit_id, rng: seeded(seed * 31 + round) }).queue) checkQuestion(q, c, `${u.unit_id} R${round}`)
      }
    }
  })

  test(`${dir}: walking the tree, each lesson brings at most 4 new words, each first met with its meaning shown`, () => {
    const SHOWN = new Set(['QT01', 'QT02', 'QT03'])
    const seen = new Set()
    for (const u of treeOrder(t)) {
      const c = contentForUnit(t, u.unit_id)
      const roundSeen = { sentences: {}, words: {} }
      for (let l = 1; l <= lessonsInRound(c, 1); l++) {
        const lesson = buildLesson(c, { round: 1, seen: roundSeen, known: seen, unit_id: u.unit_id, rng: seeded(u.order * 100 + l) })
        let fresh = 0
        for (const q of lesson.queue) {
          const ids = [...new Set([...(q.segments ?? []).map((s) => s.word_id).filter(Boolean), ...(q.word_ids ?? [])])]
          for (const id of ids.filter((x) => !seen.has(x))) {
            fresh++
            const w = c.wordById.get(id)
            assert.ok(w, `${u.unit_id} lesson ${l}: word ${id} isn't in the word list`)
            assert.ok(SHOWN.has(q.type) || isCognate(w), `${u.unit_id} lesson ${l}: "${w.form}" is first met in ${q.type}, without its meaning`)
          }
          for (const id of ids) seen.add(id)
        }
        assert.ok(fresh <= 4, `${u.unit_id} lesson ${l}: ${fresh} new words`)
        for (const q of lesson.queue) {
          if (q.sentence_id) roundSeen.sentences[q.sentence_id] = (roundSeen.sentences[q.sentence_id] ?? 0) + 1
          for (const id of q.word_ids ?? []) roundSeen.words[id] = (roundSeen.words[id] ?? 0) + 1
        }
      }
      for (let round = 2; round <= 5; round++) for (const id of c.wordOrder) if (c.wordById.has(id) && c.wordById.get(id).first_unit === u.unit_id) seen.add(id)
    }
  })
}
