// The Danish course's tables, bundled so a lesson never waits on the network. Loaded at startup
// by main.jsx when this course is the chosen one (src/lib/course.js); the other course stays out of the download.
import units from '../content-da/units.json'
import sentences from '../content-da/sentences.json'
import words from '../content-da/words.json'
import sentence_words from '../content-da/sentence_words.json'
import accepted_answers from '../content-da/accepted_answers.json'
import question_types from '../content-da/question_types.json'
import variants from '../content-da/variants.json'
import rounds from '../content-da/rounds.json'
import round_type_mix from '../content-da/round_type_mix.json'
import phase1_fallbacks from '../content-da/phase1_fallbacks.json'
import cant_swaps from '../content-da/cant_swaps.json'
import flag_reasons from '../content-da/flag_reasons.json'
import qa_answers from '../content-da/qa_answers.json'
import feedback_phrases from '../content-da/feedback_phrases.json'
import settings_defaults from '../content-da/settings_defaults.json'
import tree_layout from '../content-da/tree_layout.json'
import grammar_notes from '../content-da/grammar_notes.json'
import can_do from '../content-da/can_do.json'
import conjugations from '../content-da/conjugations.json'
import image_set from '../content-da/image_set.json'
import a1_list from '../content-da/a1_list.json'
import parts from '../content-da/parts.json'
import a1_tasks from '../content-da/a1_tasks.json'
import a1_texts from '../content-da/a1_texts.json'
import a1_forms from '../content-da/a1_forms.json'
import a1_prompts from '../content-da/a1_prompts.json'
import catch_up from '../content-da/catch_up.json'
import a1_listen from '../content-da/a1_listen.json'

export const tables = {
  units, sentences, words, sentence_words, accepted_answers, question_types, variants, rounds, tree_layout, grammar_notes, image_set, can_do, conjugations, a1_list, parts, a1_tasks, a1_texts, a1_forms, a1_prompts, a1_listen, catch_up,
  round_type_mix, phase1_fallbacks, cant_swaps, flag_reasons, settings_defaults, qa_answers, feedback_phrases,
}
