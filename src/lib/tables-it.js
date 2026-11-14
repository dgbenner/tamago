// The Italian course's tables, bundled so a lesson never waits on the network. Loaded at startup
// by main.jsx when this course is the chosen one (src/lib/course.js); the other course stays out of the download.
import units from '../content-it/units.json'
import sentences from '../content-it/sentences.json'
import words from '../content-it/words.json'
import sentence_words from '../content-it/sentence_words.json'
import accepted_answers from '../content-it/accepted_answers.json'
import question_types from '../content-it/question_types.json'
import variants from '../content-it/variants.json'
import rounds from '../content-it/rounds.json'
import round_type_mix from '../content-it/round_type_mix.json'
import phase1_fallbacks from '../content-it/phase1_fallbacks.json'
import cant_swaps from '../content-it/cant_swaps.json'
import flag_reasons from '../content-it/flag_reasons.json'
import qa_answers from '../content-it/qa_answers.json'
import feedback_phrases from '../content-it/feedback_phrases.json'
import settings_defaults from '../content-it/settings_defaults.json'
import tree_layout from '../content-it/tree_layout.json'
import grammar_notes from '../content-it/grammar_notes.json'
import can_do from '../content-it/can_do.json'
import conjugations from '../content-it/conjugations.json'
import image_set from '../content-it/image_set.json'
import a1_list from '../content-it/a1_list.json'
import parts from '../content-it/parts.json'
import a1_tasks from '../content-it/a1_tasks.json'
import a1_texts from '../content-it/a1_texts.json'
import a1_forms from '../content-it/a1_forms.json'
import a1_prompts from '../content-it/a1_prompts.json'
import catch_up from '../content-it/catch_up.json'
import a1_listen from '../content-it/a1_listen.json'

export const tables = {
  units, sentences, words, sentence_words, accepted_answers, question_types, variants, rounds, tree_layout, grammar_notes, image_set, can_do, conjugations, a1_list, parts, a1_tasks, a1_texts, a1_forms, a1_prompts, a1_listen, catch_up,
  round_type_mix, phase1_fallbacks, cant_swaps, flag_reasons, settings_defaults, qa_answers, feedback_phrases,
}
