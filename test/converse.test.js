// Conversations (2026-11-10): Claude's lines split into the course's words, so meanings come from Tamago's data.
import test from 'node:test'
import { readFileSync, readdirSync } from 'node:fs'
import assert from 'node:assert/strict'
import { piecesOf, newWordsIn, formIndexFor, HELP_PHRASES, SCENES } from '../src/lib/converse.js'

const load = (dir) => Object.fromEntries(readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => [f.replace('.json', ''), JSON.parse(readFileSync(`${dir}/${f}`))]))
const tables = load('src/content')
const index = formIndexFor(tables.words)
test('a line keeps its text and marks course words, multi-word forms included', () => {
  const line = "Bonjour ! Un café, s'il vous plaît ?"
  const pieces = piecesOf(line, index)
  assert.equal(pieces.map((p) => p.text).join(''), line)
  assert.ok(pieces.some((p) => p.text === "s'il vous plaît" && p.word_id))
  assert.ok(pieces.some((p) => p.text === 'café' && p.word_id))
})
test('unknown words stay plain text, and new words are only course words not yet met', () => {
  const met = new Set(tables.words.filter((w) => w.form === 'bonjour').map((w) => w.word_id))
  const found = newWordsIn(['Bonjour, voulez-vous un croissant ?'], tables.words, met)
  assert.ok(!found.some((w) => w.form === 'bonjour'))
  assert.ok(found.every((w) => tables.words.includes(w)))
})
test('every scene key word is a course word, in every course', async () => {
  for (const [lang, dir] of [['fr', 'src/content'], ['es', 'src/content-es'], ['de', 'src/content-de'], ['it', 'src/content-it'], ['pt', 'src/content-pt'], ['nl', 'src/content-nl'], ['da', 'src/content-da'], ['sv', 'src/content-sv']]) {
    const t = load(dir)
    for (const s of SCENES[lang]) for (const k of s.keys) assert.ok(t.words.some((w) => w.form === k), `${lang} ${s.id}: ${k}`)
    assert.equal(HELP_PHRASES[lang].length, 6)
  }
})

// ---- Conversation partner, version 2 (Dan, 2026-11-15) ----
import { TALK_HELP, TASK_SCENES, helpRow, sceneFit, EXCHANGES, DAILY_CAP, talksLeft, countTalk, answerTimes } from '../src/lib/converse.js'
import { paceNote, monthlyLimit } from '../server/converse.mjs'

const COURSE_DIRS = [['fr', 'src/content'], ['es', 'src/content-es'], ['de', 'src/content-de'], ['it', 'src/content-it'], ['pt', 'src/content-pt'], ['nl', 'src/content-nl'], ['da', 'src/content-da'], ['sv', 'src/content-sv']]
test('v2: the four help phrases, one tap away and first in the row, in every course', () => {
  for (const [lang] of COURSE_DIRS) {
    assert.deepEqual(TALK_HELP[lang].map((h) => h.help), ['repeat', 'slower', 'spell', 'meaning'])
    const row = helpRow(lang, 3)
    assert.deepEqual(row.slice(0, 4).map((h) => h.help), ['repeat', 'slower', 'spell', 'meaning'])
    assert.equal(new Set(row.map((h) => h.help)).size, row.length, `${lang}: no ask twice`)
    assert.match(TALK_HELP[lang][3].withWord('X'), /X/)
  }
  const server = readFileSync('server/converse.mjs', 'utf8')
  for (const h of ['repeat', 'slower', 'spell', 'meaning']) assert.match(server, new RegExp(`\\b${h}: '`), `server answers ${h}`)
})
test('v2: five A1 task scenes per course; Italian and Portuguese fit what they have, French fits most for a full learner', () => {
  for (const [lang, dir] of COURSE_DIRS) {
    const t = load(dir)
    assert.deepEqual(TASK_SCENES[lang].map((s) => s.id), ['food', 'way', 'intro', 'shop', 'plan'])
    const nobody = TASK_SCENES[lang].map((s) => sceneFit(s, t.words, new Set()))
    assert.ok(nobody.every((f) => !f.fits), `${lang}: nothing fits before any word is met`)
    const all = new Set(t.words.map((w) => w.word_id))
    const everyone = TASK_SCENES[lang].map((s) => sceneFit(s, t.words, all))
    assert.ok(everyone.filter((f) => f.fits).length >= (lang === 'it' || lang === 'pt' || lang === 'nl' || lang === 'da' || lang === 'sv' ? 1 : 4), `${lang}: ${everyone.map((f) => f.have).join(',')}`)
  }
})
test('v2: 6 to 8 exchanges; the server is told to wrap up from 6 and close at 8', () => {
  assert.deepEqual(EXCHANGES, { wrapFrom: 6, max: 8 })
  assert.match(paceNote(3), /of 6 to 8\.$/)
  assert.match(paceNote(6), /bring the task to an end/)
  assert.match(paceNote(8), /close the scene now.*done to true/)
})
test('v2: a daily cap per device, counted per day', () => {
  const store = new Map(); const s = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v) }
  const day = new Date(2026, 10, 15, 9)
  assert.equal(talksLeft(s, day), DAILY_CAP)
  for (let i = 0; i < DAILY_CAP; i++) countTalk(s, day)
  assert.equal(talksLeft(s, day), 0)
  assert.equal(talksLeft(s, new Date(2026, 10, 16, 9)), DAILY_CAP, 'a new day starts fresh')
})
test('v2: average answer time and the change since last time, in gentle words', () => {
  assert.equal(answerTimes([]), null)
  assert.deepEqual(answerTimes([2000, 4000]), { avg: 3, line: '3 s on average', change: 'First time measured' })
  assert.equal(answerTimes([2000, 4000], 4.2).change, '1.2 s quicker than last time')
  assert.equal(answerTimes([2000, 4000], 2.5).change, '0.5 s longer than last time')
  assert.equal(answerTimes([2000, 4000], 3.1).change, 'About the same as last time')
})
test('v2: the monthly limit reads as such, not as a retry', async () => {
  const Anthropic = (await import('@anthropic-ai/sdk')).default
  const err = (status, message) => Anthropic.APIError.generate(status, { error: { type: 'invalid_request_error', message } }, message, new Headers())
  assert.ok(monthlyLimit(err(400, 'You have reached your specified API usage limits.')))
  assert.ok(!monthlyLimit(err(400, 'messages: field required')))
})
