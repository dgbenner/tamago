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
  'Não, não falo inglês.', 'Não, não quero.', // Portuguese (Fable's Parts 2 to 4 review brought them in, 2026-11-19)
  'Rustig, rustig!', 'Regen, regen, ga weg!', // Dutch Parts 2 to 4: a word said twice for effect, as Oui, oui (2026-11-20)
  'Nie, nie możesz.', 'Nie, nie mówię po angielsku.', 'Nie, nie musisz iść zaraz.', 'Nie, nie przyjdę.', // Polish (2026-11-22): "Nie, nie …" sounds like nie nie, as Spanish No, no
])
// Kept: the repeat is ordinary grammar or clear by ear.
export const FINE_BY_EAR = new Set(['Vous vous appelez comment ?', 'Bonjour, Madame. Vous vous appelez comment ?', 'Dos y dos son cuatro.', 'Andata o andata e ritorno?', 'Eu acho que vai chover logo logo.',
  'Hvordan går det? Det går godt.', // Danish: the repeat falls across the question and its answer (2026-11-20)
  'Hvem tror du, du er?', // Danish Parts 2 to 4 (2026-11-21): du du falls across the comma, ordinary grammar (who do you think you are)
  'Kto to? To tylko dziecko.', // Polish (2026-11-22): to to falls across the question and its answer, as the Danish line
  // Dutch Parts 2 to 4 (2026-11-20): je je (you, your or yourself) and dat dat (that, then that) are ordinary grammar
  'Waarom draag je je hoed niet?', 'Heb je je paspoort?', 'Hoe voel je je?', 'Voel je je ziek?', 'Weet je je postcode?',
  'Hoe weet je dat dat klopt?', 'Geloven jullie dat dat zal werken?',
])
export const notByEar = (s) => NOT_BY_EAR.has(s?.french)
