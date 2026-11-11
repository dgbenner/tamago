// The German course's tables, bundled so a lesson never waits on the network. Loaded at startup
// by main.jsx when this course is the chosen one (src/lib/course.js); the other course stays out of the download.
import units from '../content-de/units.json'
import sentences from '../content-de/sentences.json'
import words from '../content-de/words.json'
import sentence_words from '../content-de/sentence_words.json'
import accepted_answers from '../content-de/accepted_answers.json'
import question_types from '../content-de/question_types.json'
import variants from '../content-de/variants.json'
import rounds from '../content-de/rounds.json'
import round_type_mix from '../content-de/round_type_mix.json'
import phase1_fallbacks from '../content-de/phase1_fallbacks.json'
import cant_swaps from '../content-de/cant_swaps.json'
import flag_reasons from '../content-de/flag_reasons.json'
import qa_answers from '../content-de/qa_answers.json'
import feedback_phrases from '../content-de/feedback_phrases.json'
import settings_defaults from '../content-de/settings_defaults.json'
import tree_layout from '../content-de/tree_layout.json'
import grammar_notes from '../content-de/grammar_notes.json'
import can_do from '../content-de/can_do.json'
import conjugations from '../content-de/conjugations.json'
import image_set from '../content-de/image_set.json'
import a1_list from '../content-de/a1_list.json'
import parts from '../content-de/parts.json'
import a1_tasks from '../content-de/a1_tasks.json'
import a1_texts from '../content-de/a1_texts.json'
import a1_forms from '../content-de/a1_forms.json'
import a1_prompts from '../content-de/a1_prompts.json'
import catch_up from '../content-de/catch_up.json'
import a1_listen from '../content-de/a1_listen.json'

export const tables = {
  units, sentences, words, sentence_words, accepted_answers, question_types, variants, rounds, tree_layout, grammar_notes, image_set, can_do, conjugations, a1_list, parts, a1_tasks, a1_texts, a1_forms, a1_prompts, a1_listen, catch_up,
  round_type_mix, phase1_fallbacks, cant_swaps, flag_reasons, settings_defaults, qa_answers, feedback_phrases,
}
