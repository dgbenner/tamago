// US spelling in everything the app shows (Dan, 2026-11-16: "colour" becomes "color" everywhere). Applied by
// build-content to every shipped string except the accepted answers, which keep both spellings so a learner who types
// "colour" is still right (scripts/lib/equivalents.mjs adds the US and UK pairs). Sources (Tatoeba lines, Wiktionary
// glosses, workbooks) stay as they are; the shipped copy is what changes.
const WORDS = [
  [/\b([Cc])olour(s|ed|ful|less|ing)?\b/g, (_, c, end = '') => `${c}olor${end}`],
  // A gloss that gave both spellings ("a color, colour") would read "a color, color": keep one (2026-11-20).
  [/\b([Cc]olor(?:s|ed|ful|less|ing)?), \1\b/g, '$1'],
]
export const usSpelling = (text) => (typeof text === 'string' ? WORDS.reduce((s, [re, to]) => s.replace(re, to), text) : text)
// Every string in a table's rows, nested JSON strings included (questions_json and the like are plain strings).
export const usSpellingRows = (rows) => rows.map((r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, typeof v === 'string' ? usSpelling(v) : v])))
