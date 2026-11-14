import test from 'node:test'
import assert from 'node:assert/strict'

// What a question puts on screen, rendered without a browser (Vite loads the JSX).
const storage = () => ({ getItem: () => null, setItem: () => {}, removeItem: () => {} })
globalThis.localStorage = storage()
globalThis.sessionStorage = storage()
globalThis.window = globalThis
const { createServer } = await import('vite')
const vite = await createServer({ configFile: false, logLevel: 'silent', appType: 'custom', server: { middlewareMode: true, hmr: false, ws: false }, optimizeDeps: { noDiscovery: true } })
const { promptFor, SpeakerBubble, ReplyBubble } = await vite.ssrLoadModule('/src/screens/Lesson.jsx')
const { createElement } = await import('react')
const { renderToStaticMarkup } = await import('react-dom/server')
test.after(() => vite.close())

const question = { type: 'QT09', variant: 'V0901', qid: 'q1', lang: 'fr', french: 'Tu es Paul ?', segments: [{ text: 'Tu es Paul ?' }], audio: { french: 'Tu es Paul ?', file: null } }
const prompt = (q, result = null) => renderToStaticMarkup(promptFor(q, { newWords: new Set(), hideFrench: false, result, onHint: () => {} }))

// Answer the Question is a chat (Dan, 2026-11-14): the question in a speaker bubble on the left with a small avatar,
// no quotes inside it; while it's only heard, the bubble holds the speaker alone (Dan, 2026-11-11).
test('Answer the Question, heard: the bubble holds the speaker alone', () => {
  const html = prompt(question)
  assert.match(html, /data-speaker-bubble/)
  assert.match(html, /data-avatar/)
  assert.match(html, /data-audio-help[^>]*><button[^>]*aria-label="Play the question"/)
  assert.match(html, /data-avatar[^>]*><img[^>]*src="\/images\/speakers\/(female|male)-[a-z-]+\.webp"/, "the speaker is one of Dan's adult avatars, named by gender (Dan, 2026-11-14)")
  assert.equal(html.match(/<button/g).length, 1, 'no Slow up front: Slow and Show Words come after the first replay (Dan, 2026-11-12)')
  assert.doesNotMatch(html, /Tu es Paul/, 'the words stay hidden until Show Words')
})
test('Answer the Question, written (V0903) or answered: the question is in the bubble, with no quotes', () => {
  for (const html of [prompt({ ...question, variant: 'V0903' }), prompt(question, { correct: true })]) {
    assert.match(html, /data-speaker-bubble.*Tu es Paul/s)
    assert.doesNotMatch(html, /[«»“”„]/)
    assert.doesNotMatch(html, /logo\.webp/, 'never the logo')
  }
})
test('the reply bubble holds what it is given', () => {
  assert.match(renderToStaticMarkup(createElement(ReplyBubble, null, 'Oui')), /data-reply-bubble.*Oui/s)
})
test('no other question type uses bubbles', () => {
  for (const type of ['QT03', 'QT06', 'QT07', 'QT08', 'QT11', 'QT12']) {
    const html = renderToStaticMarkup(promptFor({ ...question, type, english: 'Are you Paul?' }, { newWords: new Set(), hideFrench: false, result: { correct: true }, onHint: () => {} }))
    assert.doesNotMatch(html, /data-speaker-bubble|data-reply-bubble/, type)
  }
})
test('the logo picture is used by the logo alone', async () => {
  const { readFileSync, readdirSync } = await import('node:fs')
  const dir = new URL('../src/screens/', import.meta.url)
  const users = readdirSync(dir).filter((f) => /logo\.webp/.test(readFileSync(new URL(f, dir), 'utf8').replace(/\{\/\*[\s\S]*?\*\/\}/g, '')))
  assert.deepEqual(users, ['Logo.jsx'])
})
