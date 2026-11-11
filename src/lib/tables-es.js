// The Spanish course's tables, bundled so a lesson never waits on the network. Loaded at startup
// by main.jsx when this course is the chosen one (src/lib/course.js); the other course stays out of the download.
import units from '../content-es/units.json'
import sentences from '../content-es/sentences.json'
import words from '../content-es/words.json'
import sentence_words from '../content-es/sentence_words.json'
import accepted_answers from '../content-es/accepted_answers.json'
import question_types from '../content-es/question_types.json'
import variants from '../content-es/variants.json'
import rounds from '../content-es/rounds.json'
import round_type_mix from '../content-es/round_type_mix.json'
import phase1_fallbacks from '../content-es/phase1_fallbacks.json'
import cant_swaps from '../content-es/cant_swaps.json'
import flag_reasons from '../content-es/flag_reasons.json'
import qa_answers from '../content-es/qa_answers.json'
import feedback_phrases from '../content-es/feedback_phrases.json'
import settings_defaults from '../content-es/settings_defaults.json'
import tree_layout from '../content-es/tree_layout.json'
import grammar_notes from '../content-es/grammar_notes.json'
import can_do from '../content-es/can_do.json'
import conjugations from '../content-es/conjugations.json'
import image_set from '../content-es/image_set.json'
import a1_list from '../content-es/a1_list.json'
import parts from '../content-es/parts.json'
import a1_tasks from '../content-es/a1_tasks.json'

export const tables = {
  units, sentences, words, sentence_words, accepted_answers, question_types, variants, rounds, tree_layout, grammar_notes, image_set, can_do, conjugations, a1_list, parts, a1_tasks,
  round_type_mix, phase1_fallbacks, cant_swaps, flag_reasons, settings_defaults, qa_answers, feedback_phrases,
}
