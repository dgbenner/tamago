// Mock A1 exams for Spanish and German (Dan, 2026-11-15): DELE A1 (reading first) and Goethe-Zertifikat A1: Start
// Deutsch 1 (Sprechen ends with spelling your name and saying a number), at the end of each course's Part 4. And the
// Glossary's verb tables: none for a form its verb's present never shows (quisiera, hätte).
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { buildSession, indexContent } from '../src/lib/lesson.js'
import { EXAMS, finalItems, partsFor } from '../src/lib/finalcheck.js'
import { tableFor } from '../src/lib/word-hints.js'

const load = (dir) => Object.fromEntries(readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => [f.replace('.json', ''), JSON.parse(readFileSync(`${dir}/${f}`))]))
const seeded = (seed) => { let x = seed; return () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296 } }
const mainsOf = (t) => t.units.filter((u) => String(u.status).startsWith('live') && !['yes', 'node'].includes(u.is_topic_pick)).map((u) => u.unit_id)
const expected = (id) => partsFor(id).flatMap((p) => p.items).reduce((n, [, , c]) => n + c, 0)

test('Spanish final check: a mock DELE A1, reading first, task items from the course, the message not scored', () => {
  const t = load('src/content-es')
  const all = indexContent(t)
  const items = finalItems(all, mainsOf(t), seeded(5), 'es')
  assert.deepEqual([...new Set(items.map((i) => i.part))], ['reading', 'listening', 'writing', 'speaking'])
  assert.equal(items.length, expected('es'))
  const of = (type) => items.filter((i) => i.type === type)
  assert.equal(of('QT14').length, 4); assert.equal(new Set(of('QT14').map((i) => i.a1.kind)).size, 4, 'four kinds of text')
  assert.ok(of('QT17').length === 4 && of('QT17').every((i) => i.part === 'listening'))
  assert.ok(of('QT15').length === 1 && of('QT16').length === 1)
  const s = buildSession(all, 'final', items, { rng: seeded(5) })
  assert.equal(s.queue.length, items.length)
  assert.equal(s.graded, items.filter((i) => i.part !== 'speaking' && i.type !== 'QT16').length)
  assert.match(EXAMS.es.format, /read/)
})

test('German final check: a mock Goethe A1, Schreiben a form and a message, Sprechen ending with a spelled name and a number', () => {
  const t = load('src/content-de')
  const all = indexContent(t)
  const items = finalItems(all, mainsOf(t), seeded(9), 'de')
  assert.deepEqual([...new Set(items.map((i) => i.part))], ['listening', 'reading', 'writing', 'speaking'])
  assert.equal(items.length, expected('de'))
  assert.deepEqual(items.filter((i) => i.part === 'writing').map((i) => i.type), ['QT15', 'QT16'])
  assert.equal(new Set(items.filter((i) => i.type === 'QT14').map((i) => i.a1.kind)).size >= 4, true)
  const speaking = items.filter((i) => i.part === 'speaking')
  assert.deepEqual(speaking.slice(-2).map((i) => i.prompt?.kind), ['spell', 'number'])
  const s = buildSession(all, 'final', items, { rng: seeded(9) })
  assert.equal(s.queue.length, items.length)
  const [spell, number] = s.queue.slice(-2)
  assert.ok(spell.speaking && spell.variant === 'V1302' && /Buchstabieren/.test(spell.english))
  const n = t.a1_listen.find((x) => x.id === number.item_id)
  assert.ok(n && n.kind === 'number' && number.english === `Say this number: ${n.answer}` && number.shown === n.say)
  assert.equal(s.graded, items.filter((i) => i.part !== 'speaking' && i.type !== 'QT16').length, 'speaking never graded')
})

test('Glossary: no verb table for quisiera or hätte; infinitives, present forms and split forms keep theirs', () => {
  for (const [dir, none, keep] of [['src/content-es', ['quisiera'], ['quiero', 'querer']], ['src/content-de', ['hätte', 'war', 'möchten'], ['habe', 'hat']]]) {
    const t = load(dir)
    const word = (f) => t.words.find((w) => w.form === f)
    for (const f of none) assert.equal(tableFor(word(f), t.conjugations), null, f)
    for (const f of keep) if (word(f)) assert.ok(tableFor(word(f), t.conjugations), f)
  }
  const sep = { lemma: 'aufstehen', present: [{ person: 'ich', form: 'stehe auf' }] }
  assert.ok(tableFor({ form: 'stehe', lemma: 'aufstehen', part_of_speech: 'Verb' }, [sep]))
  assert.equal(tableFor({ form: 'haus', lemma: 'haus', part_of_speech: 'Noun' }, [sep]), null)
})

test('Italian final check: a mock CELI Impatto, the written paper (reading, writing) then the oral (listening, speaking)', () => {
  const t = load('src/content-it')
  const all = indexContent(t)
  const items = finalItems(all, mainsOf(t), seeded(3), 'it')
  assert.deepEqual([...new Set(items.map((i) => i.part))], ['reading', 'writing', 'listening', 'speaking'])
  assert.equal(items.length, expected('it'))
  assert.ok(items.filter((i) => i.type === 'QT14').length === 4 && items.some((i) => i.type === 'QT15') && items.some((i) => i.type === 'QT16'))
  const s = buildSession(all, 'final', items, { rng: seeded(3) })
  assert.equal(s.queue.length, items.length)
  assert.match(EXAMS.it.format, /written paper/)
})

test('Portuguese final check: a mock ACESSO, reading and writing (sat together) then listening, then speaking', () => {
  const t = load('src/content-pt')
  const all = indexContent(t)
  const items = finalItems(all, mainsOf(t), seeded(7), 'pt')
  assert.deepEqual([...new Set(items.map((i) => i.part))], ['reading', 'writing', 'listening', 'speaking'])
  assert.equal(items.length, expected('pt'))
  const of = (type) => items.filter((i) => i.type === type)
  assert.equal(of('QT14').length, 4)
  assert.ok(of('QT17').length === 4 && of('QT17').every((i) => i.part === 'listening'))
  assert.deepEqual(items.filter((i) => i.part === 'writing').map((i) => i.type).slice(0, 2), ['QT15', 'QT16'])
  const s = buildSession(all, 'final', items, { rng: seeded(7) })
  assert.equal(s.queue.length, items.length)
  assert.equal(s.graded, items.filter((i) => i.part !== 'speaking' && i.type !== 'QT16').length, 'speaking and the message never graded')
  assert.match(EXAMS.pt.format, /form/)
})
