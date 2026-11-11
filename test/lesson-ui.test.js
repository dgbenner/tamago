import test from 'node:test'
import assert from 'node:assert/strict'

// What a question puts on screen, rendered without a browser (Vite loads the JSX).
const storage = () => ({ getItem: () => null, setItem: () => {}, removeItem: () => {} })
globalThis.localStorage = storage()
globalThis.sessionStorage = storage()
globalThis.window = globalThis
const { createServer } = await import('vite')
const vite = await createServer({ configFile: false, logLevel: 'silent', appType: 'custom', server: { middlewareMode: true, hmr: false, ws: false }, optimizeDeps: { noDiscovery: true } })
const { promptFor, SpeakerBubble } = await vite.ssrLoadModule('/src/screens/Lesson.jsx')
const { createElement } = await import('react')
const { renderToStaticMarkup } = await import('react-dom/server')
test.after(() => vite.close())

const question = { type: 'QT09', variant: 'V0901', qid: 'q1', lang: 'fr', french: 'Tu es Paul ?', segments: [{ text: 'Tu es Paul ?' }], audio: { french: 'Tu es Paul ?', file: null } }
const prompt = (q, result = null) => renderToStaticMarkup(promptFor(q, { newWords: new Set(), hideFrench: false, result, onHint: () => {} }))

// Dan, 2026-11-11: on Answer the Question a sushi picture showed before the speaker. The speaker shows alone.
test('Answer the Question, heard: the speaker shows alone, with no picture before it', () => {
  const html = prompt(question)
  assert.match(html, /^<button[^>]*aria-label="Play the question"/, 'the speaker button comes first, and is all there is')
  assert.doesNotMatch(html, /<img/, 'no picture')
  assert.equal(html.match(/<button/g).length, 1)
})
test('Answer the Question, written (V0903) or answered: the question is shown as text', () => {
  assert.match(prompt({ ...question, variant: 'V0903' }), /Tu es Paul/)
  assert.match(prompt(question, { correct: true }), /Tu es Paul/)
})

// Dan, 2026-11-11: no picture in any speech bubble (the sushi logo stood in for a character). The place stays in the
// code, commented out.
test('a speech bubble shows its words and no picture', () => {
  for (const html of [prompt({ ...question, variant: 'V0903' }), prompt(question, { correct: true }), renderToStaticMarkup(createElement(SpeakerBubble, null, 'Bonjour'))]) {
    assert.doesNotMatch(html, /<img|logo\.webp|<svg/)
  }
  assert.match(renderToStaticMarkup(createElement(SpeakerBubble, null, 'Bonjour')), /Bonjour/)
})
test('the logo picture is used by the logo alone, and the character\'s place is kept in a comment', async () => {
  const { readFileSync, readdirSync } = await import('node:fs')
  const dir = new URL('../src/screens/', import.meta.url)
  const users = readdirSync(dir).filter((f) => /logo\.webp/.test(readFileSync(new URL(f, dir), 'utf8').replace(/\{\/\*[\s\S]*?\*\/\}/g, '')))
  assert.deepEqual(users, ['Logo.jsx'])
  assert.match(readFileSync(new URL('Lesson.jsx', dir), 'utf8'), /\{\/\* The character goes here:/)
})
