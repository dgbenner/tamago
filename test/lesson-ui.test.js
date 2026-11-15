import test from 'node:test'
import assert from 'node:assert/strict'

// What a question puts on screen, rendered without a browser (Vite loads the JSX).
const storage = () => ({ getItem: () => null, setItem: () => {}, removeItem: () => {} })
globalThis.localStorage = storage()
globalThis.sessionStorage = storage()
globalThis.window = globalThis
const { createServer } = await import('vite')
const vite = await createServer({ configFile: false, logLevel: 'silent', appType: 'custom', server: { middlewareMode: true, hmr: false, ws: false }, optimizeDeps: { noDiscovery: true } })
const { promptFor, SpeakerBubble, ReplyBubble, speakerFor, askedToYou, replyStart } = await vite.ssrLoadModule('/src/screens/Lesson.jsx')
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

// The speaker follows the voice's tags (Dan, 2026-11-14): a child's recording gets a child, by gender.
test('a voice tagged Child gets the girl or the boy; an adult voice gets an adult of its gender', () => {
  const rec = (speaker) => ({ ...question, audio: { file: '/audio/x.m4a', speaker } })
  assert.match(speakerFor(rec('Aemines4')), /child-male-glasses/)
  assert.match(speakerFor(rec('Lilie B. (BiblioCanet66)')), /child-female-chestnut/)
  assert.match(speakerFor(rec('Aemines2')), /\/female-/)
  assert.match(speakerFor(rec('Aemines1')), /\/male-/)
  assert.match(speakerFor(question, 'Thomas'), /\/male-/)
  assert.match(speakerFor(question, 'Amélie'), /\/female-/)
})

test('Pick What You Heard shows the speaker\'s picture, with no bubble (Dan, 2026-11-14)', () => {
  assert.match(speakerFor({ type: 'QT04', sentence_id: 'S1', audio: { file: '/audio/x.m4a', speaker: 'Aemines1' } }), /\/male-/)
})

test('Pick the Meaning shows the speaker only for a question put to the learner (Dan, 2026-11-14)', () => {
  assert.equal(askedToYou({ french: 'Tu es Paul ?', english: 'Are you Paul?' }), true)
  assert.equal(askedToYou({ french: '¿Comes pan?', english: 'Do you eat bread?' }), true)
  assert.equal(askedToYou({ french: 'Wo ist dein Auto?', english: 'Where is your car?' }), true)
  assert.equal(askedToYou({ french: 'Le livre est ici ?', english: 'Is the book here?' }), false)
  assert.equal(askedToYou({ french: 'Tu es ici.', english: "You're here." }), false)
  assert.equal(askedToYou({ french: 'Elles sont ici ?', english: 'Are they here?' }), false)
})

// Capitals and accents (Dan, 2026-11-14): the bar names the word with the letter in bold.
test('the answer bar notes a missing capital and a missing accent, the letter in bold', async () => {
  const { AnswerBar } = await vite.ssrLoadModule('/src/screens/Lesson.jsx')
  const q = { type: 'QT12', qid: 'q9', lang: 'fr', sentence_id: 'S1', french: 'Dan aime le café.', english: 'Dan likes coffee.', shown: 'Dan aime le café.', accepted: ['Dan aime le café.'], audio: { file: null } }
  const result = { correct: true, accent: true, typo: false, capitals: [], given: 'Dan aime le cafe', matched: 'Dan aime le café.' }
  const html = renderToStaticMarkup(createElement(AnswerBar, { q, result: { ...result, capitals: [{ word: 'Paul', at: [0] }] }, cantListen: true, flagReasons: [], onFlag: () => {}, onContinue: () => {} }))
  assert.match(html, /Don&#x27;t forget the capital: <span[^>]*><strong>P<\/strong>aul/)
  assert.match(html, /Watch the accent: <span[^>]*><span>caf<\/span><strong>é<\/strong>/)
})

test('a recording\'s own tag beats its person\'s: Rdrg109 is a man, his "una" a woman (Dan, 2026-11-15)', () => {
  const q = { type: 'QT04', sentence_id: 'S1' }
  assert.match(speakerFor({ ...q, audio: { file: '/audio-es/W010.m4a', speaker: 'Rdrg109' } }), /\/female-/)
  assert.match(speakerFor({ ...q, audio: { file: '/audio-es/W011.m4a', speaker: 'Rdrg109' } }), /\/male-/)
})

test('Answer the Question\'s hint shows how a reply could start, from the fullest reply (Dan, 2026-11-15)', () => {
  const q = (...replies) => ({ answers: replies.map((french) => ({ french })) })
  assert.equal(replyStart(q('Je m\'appelle Paul.')), 'Je m\'appelle…')
  assert.equal(replyStart(q('Oui.', 'Oui, je parle un peu français.')), 'Oui, je parle…')
  assert.equal(replyStart(q('Merci.')), 'Me…')
  assert.equal(replyStart({ answers: [] }), null)
})
