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
    if (!r.ok) {
      const why = await r.json().then((j) => j.error).catch(() => null)
      return { error: why === 'monthly' ? 'monthly' : r.status === 429 ? 'busy' : 'failed' }
    }
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
  it: [
    { help: 'understand', level: 1, text: 'Non capisco.' },
    { help: 'slower', level: 1, text: 'Più lentamente, per favore.' },
    { help: 'repeat', level: 1, text: 'Ripeta, per favore.' },
    { help: 'meaning', level: 2, text: 'Cosa significa?', withWord: (w) => `Cosa significa «${w}»?` },
    { help: 'say', level: 2, text: 'Come si dice…?', frame: 'Come si dice «» in italiano?', caret: 14 },
    { help: 'word', level: 3, text: 'Cerco la parola…', frame: 'Cerco la parola. È una cosa per ' },
  ],
  pt: [
    { help: 'understand', level: 1, text: 'Não entendo.' },
    { help: 'slower', level: 1, text: 'Mais devagar, por favor.' },
    { help: 'repeat', level: 1, text: 'Pode repetir, por favor?' },
    { help: 'meaning', level: 2, text: 'O que significa?', withWord: (w) => `O que significa “${w}”?` },
    { help: 'say', level: 2, text: 'Como se diz…?', frame: 'Como se diz “” em português?', caret: 13 },
    { help: 'word', level: 3, text: 'Estou procurando a palavra…', frame: 'Estou procurando a palavra. É uma coisa para ' },
  ],
  nl: [
    { help: 'understand', level: 1, text: 'Ik begrijp het niet.' },
    { help: 'slower', level: 1, text: 'Langzamer, alsjeblieft.' },
    { help: 'repeat', level: 1, text: 'Kunt u dat herhalen?' },
    { help: 'meaning', level: 2, text: 'Wat betekent dat?', withWord: (w) => `Wat betekent „${w}”?` },
    { help: 'say', level: 2, text: 'Hoe zeg je…?', frame: 'Hoe zeg je „” in het Nederlands?', caret: 12 },
    { help: 'word', level: 3, text: 'Ik zoek het woord…', frame: 'Ik zoek het woord. Het is een ding om ' },
  ],
  pl: [
    { help: 'understand', level: 1, text: 'Nie rozumiem.' },
    { help: 'slower', level: 1, text: 'Wolniej, proszę.' },
    { help: 'repeat', level: 1, text: 'Możesz powtórzyć?' },
    { help: 'meaning', level: 2, text: 'Co to znaczy?', withWord: (w) => `Co znaczy „${w}”?` },
    { help: 'say', level: 2, text: 'Jak się mówi…?', frame: 'Jak się mówi „” po polsku?', caret: 14 },
    { help: 'word', level: 3, text: 'Szukam słowa…', frame: 'Szukam słowa. To jest coś do ' },
  ],
  no: [
    { help: 'understand', level: 1, text: 'Jeg forstår ikke.' },
    { help: 'slower', level: 1, text: 'Saktere, takk.' },
    { help: 'repeat', level: 1, text: 'Kan du gjenta det?' },
    { help: 'meaning', level: 2, text: 'Hva betyr det?', withWord: (w) => `Hva betyr «${w}»?` },
    { help: 'say', level: 2, text: 'Hvordan sier man…?', frame: 'Hvordan sier man «» på norsk?', caret: 18 },
    { help: 'word', level: 3, text: 'Jeg leter etter ordet…', frame: 'Jeg leter etter ordet. Det er noe man bruker til å ' },
  ],
  da: [
    { help: 'understand', level: 1, text: 'Jeg forstår det ikke.' },
    { help: 'slower', level: 1, text: 'Langsommere, tak.' },
    { help: 'repeat', level: 1, text: 'Kan du gentage det?' },
    { help: 'meaning', level: 2, text: 'Hvad betyder det?', withWord: (w) => `Hvad betyder »${w}«?` },
    { help: 'say', level: 2, text: 'Hvordan siger man…?', frame: 'Hvordan siger man »« på dansk?', caret: 19 },
    { help: 'word', level: 3, text: 'Jeg leder efter ordet…', frame: 'Jeg leder efter ordet. Det er en ting, man bruger til at ' },
  ],
  sv: [
    { help: 'understand', level: 1, text: 'Jag förstår inte.' },
    { help: 'slower', level: 1, text: 'Långsammare, tack.' },
    { help: 'repeat', level: 1, text: 'Kan du upprepa?' },
    { help: 'meaning', level: 2, text: 'Vad betyder det?', withWord: (w) => `Vad betyder ”${w}”?` },
    { help: 'say', level: 2, text: 'Hur säger man…?', frame: 'Hur säger man ”” på svenska?', caret: 15 },
    { help: 'word', level: 3, text: 'Jag letar efter ordet…', frame: 'Jag letar efter ordet. Det är något man använder för att ' },
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
  it: [
    { id: 'cafe', title: 'Ordering a Drink', about: 'You walk into a café and order something to drink.', setting: 'A small café. The learner comes in and orders something to drink.', ai: 'the waiter, friendly and a little quick', learner: 'a customer', keys: ['caffè', 'tè', 'acqua', 'latte', 'per favore', 'grazie'] },
    { id: 'neighbour', title: 'A New Neighbour', about: 'Someone has just moved in next door. Say hello and get to know them.', setting: 'The learner meets someone who has just moved in next door, outside the house.', ai: 'the new neighbour, chatty, with a family and a dog', learner: 'the person who lives next door', keys: ['ciao', 'casa', 'famiglia', 'bambini', 'cane'] },
    { id: 'way', title: 'Finding the Way', about: 'You\'re in town looking for the park. Ask someone the way.', setting: 'In town. The learner is looking for the park and asks someone in the street.', ai: 'a local who knows the town well', learner: 'a visitor', keys: ['dove', 'parco', 'scuola', 'ristorante', 'città'] },
  ],
  pt: [
    { id: 'cafe', title: 'Ordering a Drink', about: 'You walk into a café and order something to drink.', setting: 'A small café. The learner comes in and orders something to drink.', ai: 'the waiter, friendly and a little quick', learner: 'a customer', keys: ['café', 'chá', 'água', 'leite', 'por favor', 'obrigado'] },
    { id: 'neighbour', title: 'A New Neighbour', about: 'Someone has just moved in next door. Say hello and get to know them.', setting: 'The learner meets someone who has just moved in next door, outside the house.', ai: 'the new neighbour, chatty, with a family and a dog', learner: 'the person who lives next door', keys: ['oi', 'casa', 'família', 'crianças', 'cachorro'] },
    { id: 'way', title: 'Finding the Way', about: 'You\'re in town looking for the park. Ask someone the way.', setting: 'In town. The learner is looking for the park and asks someone in the street.', ai: 'a local who knows the town well', learner: 'a visitor', keys: ['onde', 'parque', 'escola', 'restaurante', 'cidade'] },
  ],
  nl: [
    { id: 'cafe', title: 'Ordering a Drink', about: 'You walk into a café and order something to drink.', setting: 'A small café. The learner comes in and orders something to drink.', ai: 'the waiter, friendly and a little quick', learner: 'a customer', keys: ['koffie', 'thee', 'water', 'melk', 'alsjeblieft', 'dank'] },
    { id: 'neighbour', title: 'A New Neighbour', about: 'Someone has just moved in next door. Say hello and get to know them.', setting: 'The learner meets someone who has just moved in next door, outside the house.', ai: 'the new neighbour, chatty, with a family and a dog', learner: 'the person who lives next door', keys: ['hallo', 'huis', 'familie', 'kinderen', 'hond'] },
    { id: 'way', title: 'Finding the Way', about: 'You\'re in town looking for the park. Ask someone the way.', setting: 'In town. The learner is looking for the park and asks someone in the street.', ai: 'a local who knows the town well', learner: 'a visitor', keys: ['waar', 'park', 'school', 'restaurant', 'stad'] },
  ],
  pl: [
    { id: 'cafe', title: 'Ordering a Drink', about: 'You walk into a café and order something to drink.', setting: 'A small café. The learner comes in and orders something to drink.', ai: 'the waiter, friendly and a little quick', learner: 'a customer', keys: ['kawa', 'herbata', 'woda', 'mleko', 'dziękuję'] },
    { id: 'neighbour', title: 'A New Neighbour', about: 'Someone has just moved in next door. Say hello and get to know them.', setting: 'The learner meets someone who has just moved in next door, outside the house.', ai: 'the new neighbour, chatty, with a family and a dog', learner: 'the person who lives next door', keys: ['cześć', 'dom', 'rodzina', 'dzieci', 'pies'] },
    { id: 'way', title: 'Finding the Way', about: 'You\'re in town looking for the park. Ask someone the way.', setting: 'In town. The learner is looking for the park and asks someone in the street.', ai: 'a local who knows the town well', learner: 'a visitor', keys: ['gdzie', 'park', 'szkoła', 'restauracja', 'miasto'] },
  ],
  no: [
    { id: 'cafe', title: 'Ordering a Drink', about: 'You walk into a café and order something to drink.', setting: 'A small café. The learner comes in and orders something to drink.', ai: 'the waiter, friendly and a little quick', learner: 'a customer', keys: ['kaffe', 'te', 'vann', 'melk', 'takk'] },
    { id: 'neighbour', title: 'A New Neighbour', about: 'Someone has just moved in next door. Say hello and get to know them.', setting: 'The learner meets someone who has just moved in next door, outside the house.', ai: 'the new neighbour, chatty, with a family and a dog', learner: 'the person who lives next door', keys: ['hei', 'hus', 'familie', 'barn', 'hund'] },
    { id: 'way', title: 'Finding the Way', about: 'You\'re in town looking for the park. Ask someone the way.', setting: 'In town. The learner is looking for the park and asks someone in the street.', ai: 'a local who knows the town well', learner: 'a visitor', keys: ['hvor', 'park', 'skole', 'restaurant', 'by'] },
  ],
  da: [
    { id: 'cafe', title: 'Ordering a Drink', about: 'You walk into a café and order something to drink.', setting: 'A small café. The learner comes in and orders something to drink.', ai: 'the waiter, friendly and a little quick', learner: 'a customer', keys: ['kaffe', 'te', 'vand', 'mælk', 'tak'] },
    { id: 'neighbour', title: 'A New Neighbour', about: 'Someone has just moved in next door. Say hello and get to know them.', setting: 'The learner meets someone who has just moved in next door, outside the house.', ai: 'the new neighbour, chatty, with a family and a dog', learner: 'the person who lives next door', keys: ['hej', 'hus', 'familie', 'børn', 'hund'] },
    { id: 'way', title: 'Finding the Way', about: 'You\'re in town looking for the park. Ask someone the way.', setting: 'In town. The learner is looking for the park and asks someone in the street.', ai: 'a local who knows the town well', learner: 'a visitor', keys: ['hvor', 'park', 'skole', 'restaurant', 'by'] },
  ],
  sv: [
    { id: 'cafe', title: 'Ordering a Drink', about: 'You walk into a café and order something to drink.', setting: 'A small café. The learner comes in and orders something to drink.', ai: 'the waiter, friendly and a little quick', learner: 'a customer', keys: ['kaffe', 'te', 'vatten', 'mjölk', 'tack'] },
    { id: 'neighbour', title: 'A New Neighbour', about: 'Someone has just moved in next door. Say hello and get to know them.', setting: 'The learner meets someone who has just moved in next door, outside the house.', ai: 'the new neighbour, chatty, with a family and a dog', learner: 'the person who lives next door', keys: ['hej', 'hus', 'familj', 'barn', 'hund'] },
    { id: 'way', title: 'Finding the Way', about: 'You\'re in town looking for the park. Ask someone the way.', setting: 'In town. The learner is looking for the park and asks someone in the street.', ai: 'a local who knows the town well', learner: 'a visitor', keys: ['var', 'park', 'skola', 'restaurang', 'stad'] },
  ],
}

// ---- Conversation partner, version 2 (Dan, 2026-11-15; all courses) ----
// Fast recall, natural-speed listening, speaking without freezing. Each scene is one A1 task, using only the words the
// learner has met; the partner's lines are heard first (text hidden, Slow and Show Words as in lessons); voice by
// default, typing always; a quiet answer-time ring; four help phrases one tap away; 6 to 8 exchanges; a summary.

// The four help phrases, always one tap away, first in the row (the help circles' others follow, as before).
// help: what the server asks of Claude (server/converse.mjs HELP).
export const TALK_HELP = {
  fr: [
    { help: 'repeat', text: 'Vous pouvez répéter ?' },
    { help: 'slower', text: "Plus lentement, s'il vous plaît." },
    { help: 'spell', text: "Ça s'écrit comment ?", withWord: (w) => `« ${w} », ça s'écrit comment ?` },
    { help: 'meaning', text: "Qu'est-ce que ça veut dire ?", withWord: (w) => `Qu'est-ce que « ${w} » veut dire ?` },
  ],
  es: [
    { help: 'repeat', text: '¿Puede repetir?' },
    { help: 'slower', text: 'Más despacio, por favor.' },
    { help: 'spell', text: '¿Cómo se escribe?', withWord: (w) => `¿Cómo se escribe «${w}»?` },
    { help: 'meaning', text: '¿Qué significa?', withWord: (w) => `¿Qué significa «${w}»?` },
  ],
  de: [
    { help: 'repeat', text: 'Können Sie das wiederholen?' },
    { help: 'slower', text: 'Langsamer, bitte.' },
    { help: 'spell', text: 'Wie schreibt man das?', withWord: (w) => `Wie schreibt man „${w}“?` },
    { help: 'meaning', text: 'Was bedeutet das?', withWord: (w) => `Was bedeutet „${w}“?` },
  ],
  it: [
    { help: 'repeat', text: 'Può ripetere?' },
    { help: 'slower', text: 'Più lentamente, per favore.' },
    { help: 'spell', text: 'Come si scrive?', withWord: (w) => `Come si scrive «${w}»?` },
    { help: 'meaning', text: 'Cosa significa?', withWord: (w) => `Cosa significa «${w}»?` },
  ],
  pt: [
    { help: 'repeat', text: 'Pode repetir?' },
    { help: 'slower', text: 'Mais devagar, por favor.' },
    { help: 'spell', text: 'Como se escreve?', withWord: (w) => `Como se escreve “${w}”?` },
    { help: 'meaning', text: 'O que significa?', withWord: (w) => `O que significa “${w}”?` },
  ],
  nl: [
    { help: 'repeat', text: 'Kunt u dat herhalen?' },
    { help: 'slower', text: 'Langzamer, alsjeblieft.' },
    { help: 'spell', text: 'Hoe schrijf je dat?', withWord: (w) => `Hoe schrijf je „${w}”?` },
    { help: 'meaning', text: 'Wat betekent dat?', withWord: (w) => `Wat betekent „${w}”?` },
  ],
  pl: [
    { help: 'repeat', text: 'Możesz powtórzyć?' },
    { help: 'slower', text: 'Wolniej, proszę.' },
    { help: 'spell', text: 'Jak to się pisze?', withWord: (w) => `Jak się pisze „${w}”?` },
    { help: 'meaning', text: 'Co to znaczy?', withWord: (w) => `Co znaczy „${w}”?` },
  ],
  no: [
    { help: 'repeat', text: 'Kan du gjenta det?' },
    { help: 'slower', text: 'Saktere, takk.' },
    { help: 'spell', text: 'Hvordan staver man det?', withWord: (w) => `Hvordan staver man «${w}»?` },
    { help: 'meaning', text: 'Hva betyr det?', withWord: (w) => `Hva betyr «${w}»?` },
  ],
  da: [
    { help: 'repeat', text: 'Kan du gentage det?' },
    { help: 'slower', text: 'Langsommere, tak.' },
    { help: 'spell', text: 'Hvordan staver man det?', withWord: (w) => `Hvordan staver man »${w}«?` },
    { help: 'meaning', text: 'Hvad betyder det?', withWord: (w) => `Hvad betyder »${w}«?` },
  ],
  sv: [
    { help: 'repeat', text: 'Kan du upprepa?' },
    { help: 'slower', text: 'Långsammare, tack.' },
    { help: 'spell', text: 'Hur stavas det?', withWord: (w) => `Hur stavas ”${w}”?` },
    { help: 'meaning', text: 'Vad betyder det?', withWord: (w) => `Vad betyder ”${w}”?` },
  ],
}
// The whole help row: the four first, then the help circles' phrases the learner has opened that aren't the same ask.
export const helpRow = (courseId, helpLevel) => [
  ...(TALK_HELP[courseId] ?? []),
  ...(HELP_PHRASES[courseId] ?? []).filter((h) => h.level <= helpLevel && !(TALK_HELP[courseId] ?? []).some((t) => t.help === h.help)),
]

// Five scenes, one A1 task each. keys: course words the task turns on; a key the course doesn't have yet is skipped
// (Dutch, Swedish, Danish, Norwegian have Part 1 only), so a scene fits more courses as they grow.
const TASKS = [
  { id: 'food', title: 'Ordering Food', about: 'Order something to eat and drink, then ask for the bill', setting: 'A small restaurant or café at lunchtime. The learner orders food and a drink, and at the end asks to pay.', ai: 'the waiter, friendly', learner: 'a customer' },
  { id: 'way', title: 'Asking Directions', about: 'Ask someone in town the way to a place', setting: 'In the street in town. The learner asks a local the way to a place (the station, a shop, a street) and checks how far it is.', ai: 'a local who knows the town', learner: 'a visitor' },
  { id: 'intro', title: 'Introducing Yourself', about: 'Meet someone new: names, where you live, what you do', setting: 'At a friendly get-together. The learner meets someone new; they swap names, where they live, age or work.', ai: 'someone friendly the learner has just met', learner: 'a guest' },
  { id: 'shop', title: 'Shopping', about: 'Find something in a shop, ask the price and buy it', setting: 'A small shop. The learner looks for something, asks how much it costs and buys it.', ai: 'the shop assistant', learner: 'a customer' },
  { id: 'plan', title: 'Making a Plan', about: 'Agree with a friend on what to do, which day and what time', setting: 'A friend calls the learner to make a plan: what to do together, which day and at what time.', ai: 'a friend of the learner', learner: 'the friend' },
]
const KEYS = {
  fr: { food: ['manger', 'pain', 'eau', 'café', 'addition', 'voudrais'], way: ['où', 'rue', 'gauche', 'droite', 'loin', 'gare'], intro: ['appelle', 'nom', 'habite', 'ans', 'travaille', 'bonjour'], shop: ['combien', 'euros', 'acheter', 'prix', 'coûte', 'voudrais'], plan: ['demain', 'samedi', 'cinéma', 'heure', 'ensemble', 'libre'] },
  es: { food: ['comer', 'pan', 'agua', 'café', 'cuenta', 'quiero'], way: ['dónde', 'calle', 'izquierda', 'derecha', 'lejos', 'estación'], intro: ['llamo', 'nombre', 'vivo', 'años', 'trabajo', 'hola'], shop: ['cuánto', 'pesos', 'comprar', 'precio', 'cuesta', 'quiero'], plan: ['mañana', 'sábado', 'cine', 'hora', 'juntos', 'libre'] },
  de: { food: ['essen', 'Brot', 'Wasser', 'Kaffee', 'bezahlen', 'möchte'], way: ['wo', 'Straße', 'links', 'rechts', 'weit', 'Bahnhof'], intro: ['heiße', 'Name', 'wohne', 'Jahre', 'arbeite', 'hallo'], shop: ['wie viel', 'Euro', 'kaufen', 'Preis', 'kostet', 'möchte'], plan: ['morgen', 'Samstag', 'Kino', 'Uhr', 'zusammen', 'Zeit'] },
  it: { food: ['mangiare', 'pane', 'acqua', 'caffè', 'conto', 'vorrei'], way: ['dove', 'strada', 'sinistra', 'destra', 'lontano', 'stazione'], intro: ['chiamo', 'nome', 'abito', 'anni', 'lavoro', 'ciao'], shop: ['quanto', 'euro', 'comprare', 'prezzo', 'costa', 'vorrei'], plan: ['domani', 'sabato', 'cinema', 'ora', 'insieme', 'libero'] },
  pt: { food: ['comer', 'pão', 'água', 'café', 'conta', 'quero'], way: ['onde', 'rua', 'esquerda', 'direita', 'longe', 'estação'], intro: ['chamo', 'nome', 'moro', 'anos', 'trabalho', 'oi'], shop: ['quanto', 'reais', 'comprar', 'preço', 'custa', 'quero'], plan: ['amanhã', 'sábado', 'cinema', 'hora', 'juntos', 'livre'] },
  nl: { food: ['eten', 'brood', 'water', 'koffie', 'rekening', 'wil'], way: ['waar', 'straat', 'links', 'rechts', 'ver', 'station'], intro: ['heet', 'naam', 'woon', 'jaar', 'werk', 'hoi'], shop: ['hoeveel', 'euro', 'kopen', 'prijs', 'kost', 'wil'], plan: ['morgen', 'zaterdag', 'film', 'laat', 'samen', 'vrij'] },
  pl: { food: ['jeść', 'chleb', 'woda', 'kawa', 'rachunek', 'chcę'], way: ['gdzie', 'ulica', 'w lewo', 'w prawo', 'daleko', 'dworzec'], intro: ['nazywam', 'imię', 'mieszkam', 'lat', 'pracuję', 'cześć'], shop: ['ile', 'złotych', 'kupić', 'cena', 'kosztuje', 'chcę'], plan: ['jutro', 'sobotę', 'kina', 'o której', 'razem', 'wolny'] },
  no: { food: ['spise', 'brød', 'vann', 'kaffe', 'regningen', 'vil'], way: ['hvor', 'gate', 'venstre', 'høyre', 'langt', 'stasjon'], intro: ['heter', 'navn', 'bor', 'år', 'jobber', 'hei'], shop: ['hvor mye', 'kroner', 'kjøpe', 'pris', 'koster', 'vil'], plan: ['i morgen', 'lørdag', 'kino', 'klokka', 'sammen', 'fri'] },
  da: { food: ['spise', 'brød', 'vand', 'kaffe', 'regningen', 'vil'], way: ['hvor', 'gade', 'venstre', 'højre', 'langt', 'station'], intro: ['hedder', 'navn', 'bor', 'år', 'arbejder', 'hej'], shop: ['hvor meget', 'kroner', 'købe', 'pris', 'koster', 'vil'], plan: ['i morgen', 'lørdag', 'biograf', 'klokken', 'sammen', 'fri'] },
  sv: { food: ['äta', 'bröd', 'vatten', 'kaffe', 'notan', 'vill'], way: ['var', 'gata', 'vänster', 'höger', 'långt', 'station'], intro: ['heter', 'namn', 'bor', 'år', 'jobbar', 'hej'], shop: ['hur mycket', 'kronor', 'köpa', 'pris', 'kostar', 'vill'], plan: ['imorgon', 'lördag', 'bio', 'klockan', 'tillsammans', 'ledig'] },
}
export const TASK_SCENES = Object.fromEntries(Object.entries(KEYS).map(([c, k]) => [c, TASKS.map((t) => ({ ...t, task: t.title, keys: k[t.id] }))]))

// A scene fits when the course has at least 3 of its key words and the learner has met at least two thirds of them.
export const FIT_SHARE = 2 / 3
export function sceneFit(scene, words, metIds) {
  const keys = scene.keys.map((k) => words.find((w) => w.form === k && w.status !== 'off')).filter(Boolean)
  const met = keys.filter((w) => metIds.has(w.word_id)).length
  return { have: keys.length, met, fits: keys.length >= 3 && met >= keys.length * FIT_SHARE }
}

// Length: 6 to 8 exchanges (a learner answer and the partner's line; help taps don't count), about 2 to 3 minutes.
export const EXCHANGES = { wrapFrom: 6, max: 8 }

// Cost guard: a daily cap per device, across courses (localStorage, so it needs no account), well inside the Tamago
// workspace's monthly limit on Anthropic's side. One conversation is about 10 short Haiku 5.5 calls with the long part
// of the prompt cached. Counted when the partner's first line arrives.
export const DAILY_CAP = 5
const CAP_KEY = 'tamago-talk-day'
const dayOf = (now = new Date()) => `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
export function talksToday(store = globalThis.localStorage, now = new Date()) {
  try { const v = JSON.parse(store.getItem(CAP_KEY) ?? 'null'); return v?.day === dayOf(now) ? v.count : 0 } catch { return 0 }
}
export const talksLeft = (store, now) => Math.max(0, DAILY_CAP - talksToday(store, now))
export function countTalk(store = globalThis.localStorage, now = new Date()) {
  try { store.setItem(CAP_KEY, JSON.stringify({ day: dayOf(now), count: talksToday(store, now) + 1 })) } catch { /* private mode: no cap kept */ }
}

// Average answer time in seconds (one decimal) and the change since last time, in plain, gentle words.
export function answerTimes(times, last = null) {
  if (!times.length) return null
  const avg = Math.round((times.reduce((a, b) => a + b, 0) / times.length) / 100) / 10
  let change = 'First time measured'
  if (last != null) {
    const d = Math.round((avg - last) * 10) / 10
    change = Math.abs(d) < 0.3 ? 'About the same as last time' : d < 0 ? `${Math.abs(d)} s quicker than last time` : `${d} s longer than last time`
  }
  return { avg, line: `${avg} s on average`, change }
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
