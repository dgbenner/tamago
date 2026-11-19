// Fixed sample content for the two screens. Nothing here comes from the course data or the network.
export const question = {
  qid: 'sample-q', type: 'QT03', sentence_id: 'S-sample', lang: 'en',
  french: 'Je voudrais un café.', english: 'I would like a coffee.', shown: 'I would like a coffee.',
  segments: [
    { text: 'Je', word_id: 'W1', hint: 'I' }, { text: ' ' },
    { text: 'voudrais', word_id: 'W2', hint: 'would like' }, { text: ' ' },
    { text: 'un', word_id: 'W3', hint: 'a, one' }, { text: ' ' },
    { text: 'café', word_id: 'W4', hint: 'coffee' }, { text: '.' },
  ],
  choices: ['I would like a tea.', 'I would like a coffee.', 'I have a coffee.', 'I like coffee.'],
  answer: 'I would like a coffee.',
}
export const newWords = new Set(['W2'])
export const flagReasons = [
  { reason_id: 'FR01', label: 'My answer should be accepted' },
  { reason_id: 'FR02', label: 'The sentence sounds wrong' },
  { reason_id: 'FR03', label: 'Something else is wrong' },
]

export const tools = [
  { id: 'talk', label: 'Conversations', about: 'Talk through everyday scenes' },
  { id: 'glossary', label: 'Glossary', about: 'Every word, with its meaning' },
  { id: 'practice', label: 'Practice Mistakes', about: 'Strengthen 5 recent sticking points' },
  { id: 'progress', label: 'Progress', about: 'Time, words and skills so far' },
  { id: 'study', label: 'Self-Study', about: 'Flashcards and listening' },
  { id: 'verbs', label: 'Verbs', about: 'Practice the verb tables' },
  { id: 'developer', label: 'Developer', about: 'Testing and notes', quiet: true },
]
const s = (group, file) => `/sushi/${group}/${file}.webp`
// Part of the tree: finished, in progress and not started, with a level line where the level changes.
export const tree = [
  { row: [{ id: 'U01', title: 'Say Hi', icon: s('nigiri', 'aburi-salmon-nigiri'), done: 20, total: 20 }] },
  { row: [
    { id: 'U02', title: 'Numbers', icon: s('nigiri', 'aji-nigiri-sq'), done: 20, total: 20 },
    { id: 'U03', title: 'At the Café', icon: s('misc', 'gyoza'), done: 8, total: 20, current: true, about: 'Ordering politely with “je voudrais” and “s’il vous plaît”.' },
  ] },
  { level: 'Early A1' },
  { row: [
    { id: 'U04', title: 'My Family', icon: s('misc', 'edamame'), done: 0, total: 20 },
    { id: 'U05', title: 'Days of the Week', icon: s('misc', 'takoyaki'), done: 0, total: 20 },
  ] },
]
