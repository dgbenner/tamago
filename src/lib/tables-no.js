// The Norwegian course's tables, bundled so a lesson never waits on the network. Loaded at startup
// by main.jsx when this course is the chosen one (src/lib/course.js); the other course stays out of the download.
import units from '../content-no/units.json'
import sentences from '../content-no/sentences.json'
import words from '../content-no/words.json'
import sentence_words from '../content-no/sentence_words.json'
import accepted_answers from '../content-no/accepted_answers.json'
import question_types from '../content-no/question_types.json'
import variants from '../content-no/variants.json'
import rounds from '../content-no/rounds.json'
import round_type_mix from '../content-no/round_type_mix.json'
import phase1_fallbacks from '../content-no/phase1_fallbacks.json'
import cant_swaps from '../content-no/cant_swaps.json'
import flag_reasons from '../content-no/flag_reasons.json'
import qa_answers from '../content-no/qa_answers.json'
import feedback_phrases from '../content-no/feedback_phrases.json'
import settings_defaults from '../content-no/settings_defaults.json'
import tree_layout from '../content-no/tree_layout.json'
import grammar_notes from '../content-no/grammar_notes.json'
import can_do from '../content-no/can_do.json'
import conjugations from '../content-no/conjugations.json'
import image_set from '../content-no/image_set.json'
import a1_list from '../content-no/a1_list.json'
import parts from '../content-no/parts.json'
import a1_tasks from '../content-no/a1_tasks.json'
import a1_texts from '../content-no/a1_texts.json'
import a1_forms from '../content-no/a1_forms.json'
import a1_prompts from '../content-no/a1_prompts.json'
import catch_up from '../content-no/catch_up.json'
import a1_listen from '../content-no/a1_listen.json'

export const tables = {
  units, sentences, words, sentence_words, accepted_answers, question_types, variants, rounds, tree_layout, grammar_notes, image_set, can_do, conjugations, a1_list, parts, a1_tasks, a1_texts, a1_forms, a1_prompts, a1_listen, catch_up,
  round_type_mix, phase1_fallbacks, cant_swaps, flag_reasons, settings_defaults, qa_answers, feedback_phrases,
}
