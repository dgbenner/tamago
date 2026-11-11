// Developer Notes must never show a key: redact() blanks key-shaped text, and the documents it shows hold none.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { gradesSection, redact } from '../src/lib/redact.js'

test('redact blanks keys and tokens', () => {
  const samples = ['sk-ant-api03-AbC123xyz_456-defGHI', 'ghp_' + 'a1B2c3D4e5F6g7H8i9J0k1L2', 'AKIAABCDEFGHIJKLMNOP', 'TAMAGO_ANTHROPIC_API_KEY=sk-ant-zzzzzzzzzzzz', 'token: abcd1234efgh5678']
  for (const s of samples) assert.ok(redact(s).includes('[removed]'), s)
  assert.equal(redact('Key tamago-key, stored as a Cloudflare Pages secret (TAMAGO_ANTHROPIC_API_KEY).'), 'Key tamago-key, stored as a Cloudflare Pages secret (TAMAGO_ANTHROPIC_API_KEY).')
})

test('the documents shown hold nothing key-shaped', () => {
  const files = ['model-story.md', 'craft-review.md', 'tamago-feature-list.md', 'question-types.md', 'build-phases.md', 'autonomous-build.md', 'test-notes.md', 'check-in.md'].map((f) => `_source/${f}`)
  // A review still in progress has screenshots but no report yet.
  for (const d of readdirSync('_review')) if (existsSync(`_review/${d}/craft-review.md`)) files.push(`_review/${d}/craft-review.md`)
  for (const f of files) {
    const text = readFileSync(f, 'utf8')
    assert.equal(redact(text), text, `${f} has something that looks like a key`)
  }
})

test('the grade table is the Grades section of the review', () => {
  const md = '# R\n\n## Timing\nx\n\n## Grades\n\n| a | b |\n| --- | --- |\n| 1 | 2 |\n\n## Fixes\ny'
  assert.equal(gradesSection(md).trim(), '## Grades\n\n| a | b |\n| --- | --- |\n| 1 | 2 |')
})
