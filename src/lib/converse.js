// Conversations (Dan, 2026-11-10): the scenes on the path and the conversation partner in Self-Study, talking with
// Claude through /api/converse (server/converse.mjs). What Claude says is split into the course's words with the
// pipeline's own splitter, so a word's meaning always comes from Tamago's Wiktionary data, never from the model.
// Never graded.
import { analyse, formIndexFor } from '../../scripts/lib/french.mjs'

const URL_ = '/api/converse'
let ready = null
export const converseReady = () => (ready ??= fetch(URL_).then((r) => (r.ok ? r.json() : { ready: false })).then((j) => Boolean(j.ready)).catch(() => false))
export const TURN_LIMIT = 14 // learner turns, help taps included (the server holds the same limit)

export async function requestTurn(body, kind = 'turn') {
  try {
    const r = await fetch(URL_, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...body, kind }) })
    if (!r.ok) return { error: r.status === 429 ? 'busy' : 'failed' }
    return { result: (await r.json()).result ?? null }
  } catch { return { error: 'offline' } }
}

// QT16 (A1 Complete): Claude's notes on a short message, in English: meaning, grammar, points not covered, and a
// tidier version. Null when it can't be had (no key, offline); the question is already done either way.
export async function requestFeedback({ lang, prompt, points, text }) {
  try {
    const r = await fetch(URL_, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ kind: 'message', lang, prompt, points, text }) })
    if (!r.ok) return null
    return (await r.json()).result ?? null
  } catch { return null }
}

// The help phrases, one tap away: the ones from the help circles the learner has opened (level 1 to 3). Most send at
// once; "say" and "word" put a frame in the box to finish. meaning takes the word picked in Claude's line, if any.
export const HELP_PHRASES = {
  fr: [
    { help: 'understand', level: 1, text: 'Je ne comprends pas.' },
    { help: 'slower', level: 1, text: "Plus lentement, s'il vous plaît." },
    { help: 'repeat', level: 1, text: "Répétez, s'il vous plaît." },
    { help: 'meaning', level: 2, text: "Qu'est-ce que ça veut dire ?", withWord: (w) => `Qu'est-ce que « ${w} » veut dire ?` },
    { help: 'say', level: 2, text: 'Comment on dit … ?', frame: 'Comment on dit « » en français ?', caret: 17 },
    { help: 'word', level: 3, text: 'Je cherche le mot…', frame: "Je cherche le mot. C'est une chose pour " },
  ],
  es: [
    { help: 'understand', level: 1, text: 'No entiendo.' },
    { help: 'slower', level: 1, text: 'Más despacio, por favor.' },
    { help: 'repeat', level: 1, text: 'Repita, por favor.' },
    { help: 'meaning', level: 2, text: '¿Qué significa?', withWord: (w) => `¿Qué significa «${w}»?` },
    { help: 'say', level: 2, text: '¿Cómo se dice…?', frame: '¿Cómo se dice «» en español?', caret: 15 },
    { help: 'word', level: 3, text: 'Busco la palabra…', frame: 'Busco la palabra. Es una cosa para ' },
  ],
  de: [
    { help: 'understand', level: 1, text: 'Ich verstehe nicht.' },
    { help: 'slower', level: 1, text: 'Langsamer, bitte.' },
    { help: 'repeat', level: 1, text: 'Noch einmal, bitte.' },
    { help: 'meaning', level: 2, text: 'Was bedeutet das?', withWord: (w) => `Was bedeutet „${w}“?` },
    { help: 'say', level: 2, text: 'Wie sagt man…?', frame: 'Wie sagt man „“ auf Deutsch?', caret: 13 },
    { help: 'word', level: 3, text: 'Ich suche das Wort…', frame: 'Ich suche das Wort. Das ist ein Ding für ' },
  ],
}

// Three scenes per course, built around the help phrases: Claude speaks slightly above the learner's level on
// purpose. Each opens with a word prep of its key words (course words, so meanings and pictures are Tamago's own).
export const SCENES = {
  fr: [
    { id: 'cafe', title: 'Ordering a Drink', about: 'You walk into a café and order something to drink.', setting: 'A small café. The learner comes in and orders something to drink.', ai: 'the waiter, friendly and a little quick', learner: 'a customer', keys: ['café', 'thé', 'eau', 'lait', "s'il vous plaît", 'merci'] },
    { id: 'neighbour', title: 'A New Neighbour', about: 'Someone has just moved in next door. Say hello and get to know them.', setting: 'The learner meets someone who has just moved in next door, outside the house.', ai: 'the new neighbour, chatty, with a family and a dog', learner: 'the person who lives next door', keys: ['bonjour', 'maison', 'famille', 'enfants', 'chien'] },
    { id: 'way', title: 'Finding the Way', about: 'You\'re in town looking for the park. Ask someone the way.', setting: 'In town. The learner is looking for the park and asks someone in the street.', ai: 'a local who knows the town well', learner: 'a visitor', keys: ['où', 'parc', 'école', 'restaurant', 'ville'] },
  ],
  es: [
    { id: 'cafe', title: 'Ordering a Drink', about: 'You walk into a café and order something to drink.', setting: 'A small café. The learner comes in and orders something to drink.', ai: 'the waiter, friendly and a little quick', learner: 'a customer', keys: ['café', 'té', 'agua', 'leche', 'por favor', 'gracias'] },
    { id: 'neighbour', title: 'A New Neighbour', about: 'Someone has just moved in next door. Say hello and get to know them.', setting: 'The learner meets someone who has just moved in next door, outside the house.', ai: 'the new neighbour, chatty, with a family and a dog', learner: 'the person who lives next door', keys: ['hola', 'casa', 'familia', 'niños', 'perro'] },
    { id: 'way', title: 'Finding the Way', about: 'You\'re in town looking for the park. Ask someone the way.', setting: 'In town. The learner is looking for the park and asks someone in the street.', ai: 'a local who knows the town well', learner: 'a visitor', keys: ['dónde', 'parque', 'escuela', 'restaurante', 'ciudad'] },
  ],
  de: [
    { id: 'cafe', title: 'Ordering a Drink', about: 'You walk into a café and order something to drink.', setting: 'A small café. The learner comes in and orders something to drink.', ai: 'the waiter, friendly and a little quick', learner: 'a customer', keys: ['Kaffee', 'Tee', 'Wasser', 'Milch', 'bitte', 'danke'] },
    { id: 'neighbour', title: 'A New Neighbour', about: 'Someone has just moved in next door. Say hello and get to know them.', setting: 'The learner meets someone who has just moved in next door, outside the house.', ai: 'the new neighbour, chatty, with a family and a dog', learner: 'the person who lives next door', keys: ['hallo', 'Haus', 'Familie', 'Kinder', 'Hund'] },
    { id: 'way', title: 'Finding the Way', about: 'You\'re in town looking for the park. Ask someone the way.', setting: 'In town. The learner is looking for the park and asks someone in the street.', ai: 'a local who knows the town well', learner: 'a visitor', keys: ['wo', 'Park', 'Schule', 'Restaurant', 'Stadt'] },
  ],
}

// Speeds for the device voice; Plus lentement drops the next line to the slow rate.
export const RATES = { slow: 0.65, normal: 0.85, natural: 1.0 }

// A line split into pieces: course words carry their word (for tapping, and for new words at the end); anything
// else is plain text. Uses the same splitter as the content pipeline.
export function piecesOf(text, index, names = []) {
  const shown = text.replace(/[’ʼ]/g, "'").replace(/[  ]/g, ' ').replace(/\s+/g, ' ').trim()
  const parts = analyse(shown, index, { names: new Set(names.map((n) => n.toLowerCase())), partial: true }).parts
  const out = []
  let at = 0
  for (const p of parts) {
    if (p.at > at) out.push({ text: shown.slice(at, p.at) })
    out.push({ text: shown.slice(p.at, p.end), word_id: p.word_id || null })
    at = p.end
  }
  if (at < shown.length) out.push({ text: shown.slice(at) })
  return out
}
export { formIndexFor }

// Course words in Claude's lines that the learner hadn't met: they go to the Glossary and Review at the end.
export function newWordsIn(lines, words, metIds, names = []) {
  const index = formIndexFor(words)
  const found = new Map()
  for (const line of lines) {
    for (const p of analyse(line, index, { names: new Set(names.map((n) => n.toLowerCase())), partial: true }).parts) {
      if (p.word_id && !metIds.has(p.word_id)) found.set(p.word_id, words.find((w) => w.word_id === p.word_id))
    }
  }
  return [...found.values()].filter(Boolean)
}
