// US spelling (Dan, 2026-11-16): nothing the app ships says "colour"; the accepted answers keep both spellings.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { usSpelling } from '../scripts/lib/us-spelling.mjs'

test('colour becomes color, case and endings kept', () => {
  assert.equal(usSpelling('What colour is it? Colours, coloured, colourful.'), 'What color is it? Colors, colored, colorful.')
  assert.equal(usSpelling('Il est rouge.'), 'Il est rouge.')
})

test('no shipped content says colour, outside the accepted answers', () => {
  for (const dir of ['content', 'content-es', 'content-de', 'content-it', 'content-pt', 'content-nl']) {
    for (const f of readdirSync(`src/${dir}`).filter((x) => x.endsWith('.json') && x !== 'accepted_answers.json')) {
      const text = readFileSync(`src/${dir}/${f}`, 'utf8')
      assert.ok(!/\bcolour/i.test(text), `src/${dir}/${f} still says colour`)
    }
  }
})
