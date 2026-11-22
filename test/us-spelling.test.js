// US spelling (Dan, 2026-11-16; extended 2026-11-22): nothing the app ships says "colour", "theatre", "Mum" and the rest
// in its English; the accepted answers keep both spellings, and the course language is never touched.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { ENGLISH, UK_US, usSpelling, usSpellingTable } from '../scripts/lib/us-spelling.mjs'

const DIRS = ['content', 'content-es', 'content-de', 'content-it', 'content-pt', 'content-nl', 'content-pl', 'content-no', 'content-da', 'content-sv']

test('colour becomes color, case and endings kept', () => {
  assert.equal(usSpelling('What colour is it? Colours, coloured, colourful.'), 'What color is it? Colors, colored, colorful.')
  assert.equal(usSpelling('Il est rouge.'), 'Il est rouge.')
})

test('the UK spellings Fable flagged become US, case kept', () => {
  assert.equal(usSpelling('Mum, where is the theatre?'), 'Mom, where is the theater?')
  assert.equal(usSpelling('We are travelling to the centre, a hundred metres on.'), 'We are traveling to the center, a hundred meters on.')
  assert.equal(usSpelling('A litre of milk. The harbour. My neighbourhood. I apologise. I practise.'), 'A liter of milk. The harbor. My neighborhood. I apologize. I practice.')
  assert.equal(usSpelling('my favourite programme, a grey aeroplane, maths'), 'my favorite program, a gray airplane, math')
})

test('a gloss with both spellings keeps one', () => {
  assert.equal(usSpelling('neighbour, neighbor'), 'neighbor')
  assert.equal(usSpelling('math or maths'), 'math')
  assert.equal(usSpelling('airplane, aeroplane'), 'airplane')
  assert.equal(usSpelling('mummy, mommy, mom, mum'), 'mommy, mom')
})

test('words that only look like UK spellings are left alone', () => {
  for (const t of ['our hour', 'four tours', 'your flour', 'a promise, an exercise, a surprise', 'tre, fire, otte', 'Paris', 'controlled'])
    assert.equal(usSpelling(t), t)
})

test('bold course-language words in English text are left alone', () => {
  assert.equal(usSpelling('**le centre** is the centre; **maman** (mum)'), '**le centre** is the center; **maman** (mom)')
})

test('only English fields change: the course language keeps its spelling', () => {
  const [s] = usSpellingTable('sentences', [{ french: 'Le théâtre est au centre.', english: 'The theatre is in the centre.' }])
  assert.equal(s.french, 'Le théâtre est au centre.')
  assert.equal(s.english, 'The theater is in the center.')
  const [w] = usSpellingTable('words', [{ form: 'centre', lemma: 'centre', hint: 'centre', wiktionary_url: 'https://en.wiktionary.org/wiki/centre#French' }])
  assert.deepEqual(w, { form: 'centre', lemma: 'centre', hint: 'center', wiktionary_url: 'https://en.wiktionary.org/wiki/centre#French' })
  const [r] = usSpellingTable('a1_texts', [{ title: 'Centre', lines: ['Teatre'], questions: [{ question: 'Where is the harbour?', choices: ['The harbour'] }] }])
  assert.deepEqual(r, { title: 'Centre', lines: ['Teatre'], questions: [{ question: 'Where is the harbor?', choices: ['The harbor'] }] })
})

// The guard: no UK spelling in the English fields of any course's shipped tables (accepted answers keep both).
const UK = new RegExp(`\\b(${UK_US.map(([uk]) => uk).join('|')})\\b`, 'i')
const strings = (v) => (typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(strings) : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : [])
const unbold = (t) => t.replace(/\*\*[^*]*\*\*/g, '')

test('no shipped English uses a UK spelling, in any course', () => {
  for (const dir of DIRS) {
    for (const [table, fields] of Object.entries(ENGLISH)) {
      let rows
      try { rows = JSON.parse(readFileSync(`src/${dir}/${table}.json`, 'utf8')) } catch { continue }
      for (const r of rows) {
        const keys = [...fields.map((f) => f.replace(/\.\*$/, '')), ...(table === 'feedback_phrases' && r.language === 'en' ? ['text'] : [])]
        for (const k of keys) for (const t of strings(r[k])) {
          const hit = unbold(t).match(UK)
          assert.ok(!hit, `src/${dir}/${table}.json ${k}: "${hit?.[0]}" in "${t.slice(0, 80)}"`)
        }
      }
    }
  }
})

test('no shipped content says colour, outside the accepted answers', () => {
  for (const dir of DIRS) {
    for (const f of readdirSync(`src/${dir}`).filter((x) => x.endsWith('.json') && x !== 'accepted_answers.json')) {
      const text = readFileSync(`src/${dir}/${f}`, 'utf8')
      assert.ok(!/\bcolour/i.test(text), `src/${dir}/${f} still says colour`)
    }
  }
})
