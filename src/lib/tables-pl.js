// The Polish course's tables, bundled so a lesson never waits on the network. Loaded at startup
// by main.jsx when this course is the chosen one (src/lib/course.js); the other course stays out of the download.
import units from '../content-pl/units.json'
import sentences from '../content-pl/sentences.json'
import words from '../content-pl/words.json'
import sentence_words from '../content-pl/sentence_words.json'
import accepted_answers from '../content-pl/accepted_answers.json'
import question_types from '../content-pl/question_types.json'
import variants from '../content-pl/variants.json'
import rounds from '../content-pl/rounds.json'
import round_type_mix from '../content-pl/round_type_mix.json'
import phase1_fallbacks from '../content-pl/phase1_fallbacks.json'
import cant_swaps from '../content-pl/cant_swaps.json'
import flag_reasons from '../content-pl/flag_reasons.json'
import qa_answers from '../content-pl/qa_answers.json'
import feedback_phrases from '../content-pl/feedback_phrases.json'
import settings_defaults from '../content-pl/settings_defaults.json'
import tree_layout from '../content-pl/tree_layout.json'
import grammar_notes from '../content-pl/grammar_notes.json'
import can_do from '../content-pl/can_do.json'
import conjugations from '../content-pl/conjugations.json'
import image_set from '../content-pl/image_set.json'
import a1_list from '../content-pl/a1_list.json'
import parts from '../content-pl/parts.json'
import a1_tasks from '../content-pl/a1_tasks.json'
import a1_texts from '../content-pl/a1_texts.json'
import a1_forms from '../content-pl/a1_forms.json'
import a1_prompts from '../content-pl/a1_prompts.json'
import catch_up from '../content-pl/catch_up.json'
import a1_listen from '../content-pl/a1_listen.json'

export const tables = {
  units, sentences, words, sentence_words, accepted_answers, question_types, variants, rounds, tree_layout, grammar_notes, image_set, can_do, conjugations, a1_list, parts, a1_tasks, a1_texts, a1_forms, a1_prompts, a1_listen, catch_up,
  round_type_mix, phase1_fallbacks, cant_swaps, flag_reasons, settings_defaults, qa_answers, feedback_phrases,
}
