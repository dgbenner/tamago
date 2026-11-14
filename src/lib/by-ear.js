// Lines never used where the learner only hears them (Dan, 2026-11-12): a word said twice in a row ("Non, non et
// non !") is confusing by ear. They stay in reading and writing questions. `repeatsAWord` finds candidates; the list
// below is the decision for each course (test/by-ear.test.js fails on a new candidate nobody has decided on).
const fold = (w) => w.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')
const JOIN = new Set(['et', 'y', 'und', 'e', 'o', 'ou', 'oder', 'and'])
export function repeatsAWord(text) {
  const w = (String(text).match(/[\p{L}']+/gu) ?? []).map(fold)
  return w.some((x, i) => x === w[i + 1] || (JOIN.has(w[i + 1]) && x === w[i + 2]))
}
// Cut from listening.
export const NOT_BY_EAR = new Set([
  'Non, non et non !', 'Oui, oui, exactement !', // French
  'No, no me llamo Tom.', 'No, no entiendo.', 'No, no hay pan.', 'No, no tengo celular.', 'No, no tengo bolsa.', 'Ja, ja, genau!', // Spanish: "No, no …" sounds like "no no"
])
// Kept: the repeat is ordinary grammar or clear by ear.
export const FINE_BY_EAR = new Set(['Vous vous appelez comment ?', 'Bonjour, Madame. Vous vous appelez comment ?', 'Dos y dos son cuatro.'])
export const notByEar = (s) => NOT_BY_EAR.has(s?.french)
