// The Dutch course's tables, bundled so a lesson never waits on the network. Loaded at startup
// by main.jsx when this course is the chosen one (src/lib/course.js); the other course stays out of the download.
import units from '../content-nl/units.json'
import sentences from '../content-nl/sentences.json'
import words from '../content-nl/words.json'
import sentence_words from '../content-nl/sentence_words.json'
import accepted_answers from '../content-nl/accepted_answers.json'
import question_types from '../content-nl/question_types.json'
import variants from '../content-nl/variants.json'
import rounds from '../content-nl/rounds.json'
import round_type_mix from '../content-nl/round_type_mix.json'
import phase1_fallbacks from '../content-nl/phase1_fallbacks.json'
import cant_swaps from '../content-nl/cant_swaps.json'
import flag_reasons from '../content-nl/flag_reasons.json'
import qa_answers from '../content-nl/qa_answers.json'
import feedback_phrases from '../content-nl/feedback_phrases.json'
import settings_defaults from '../content-nl/settings_defaults.json'
import tree_layout from '../content-nl/tree_layout.json'
import grammar_notes from '../content-nl/grammar_notes.json'
import can_do from '../content-nl/can_do.json'
import conjugations from '../content-nl/conjugations.json'
import image_set from '../content-nl/image_set.json'
import a1_list from '../content-nl/a1_list.json'
import parts from '../content-nl/parts.json'
import a1_tasks from '../content-nl/a1_tasks.json'
import a1_texts from '../content-nl/a1_texts.json'
import a1_forms from '../content-nl/a1_forms.json'
import a1_prompts from '../content-nl/a1_prompts.json'
import catch_up from '../content-nl/catch_up.json'
import a1_listen from '../content-nl/a1_listen.json'

export const tables = {
  units, sentences, words, sentence_words, accepted_answers, question_types, variants, rounds, tree_layout, grammar_notes, image_set, can_do, conjugations, a1_list, parts, a1_tasks, a1_texts, a1_forms, a1_prompts, a1_listen, catch_up,
  round_type_mix, phase1_fallbacks, cant_swaps, flag_reasons, settings_defaults, qa_answers, feedback_phrases,
}
