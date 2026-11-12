// Question type labels (Dan, 2026-11-12): a short plain name per type, to read aloud when talking about a question.
// Shown in the lower left of every lesson question while Developer is on ("QT11 · Type What You Hear"). The course
// language's name fills {lang}. QT20 and QT21 are Self-Study screens, not lesson questions; they're here for the list.
export const QUESTION_NAMES = {
  QT01: 'Match Pairs', QT02: 'Pick the Picture', QT03: 'Pick the Meaning', QT04: 'Pick What You Heard',
  QT05: 'Fill the Blank', QT06: 'Build in English', QT07: 'Tap What You Hear', QT08: 'Build in {lang}',
  QT09: 'Answer the Question', QT10: 'Say It Aloud', QT11: 'Type What You Hear', QT12: 'Type in {lang}',
  QT13: 'Speak and Compare', QT14: 'Read and Answer', QT15: 'Fill the Form', QT16: 'Write a Message',
  QT17: 'Write the Number', QT18: 'Type the Word', QT20: 'Listen and Understand', QT21: 'Conversation',
}
export const questionLabel = (type, lang) => `${type} · ${(QUESTION_NAMES[type] ?? type).replace('{lang}', lang)}`
