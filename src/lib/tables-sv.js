// The Swedish course's tables, bundled so a lesson never waits on the network. Loaded at startup
// by main.jsx when this course is the chosen one (src/lib/course.js); the other course stays out of the download.
import units from '../content-sv/units.json'
import sentences from '../content-sv/sentences.json'
import words from '../content-sv/words.json'
import sentence_words from '../content-sv/sentence_words.json'
import accepted_answers from '../content-sv/accepted_answers.json'
import question_types from '../content-sv/question_types.json'
import variants from '../content-sv/variants.json'
import rounds from '../content-sv/rounds.json'
import round_type_mix from '../content-sv/round_type_mix.json'
import phase1_fallbacks from '../content-sv/phase1_fallbacks.json'
import cant_swaps from '../content-sv/cant_swaps.json'
import flag_reasons from '../content-sv/flag_reasons.json'
import qa_answers from '../content-sv/qa_answers.json'
import feedback_phrases from '../content-sv/feedback_phrases.json'
import settings_defaults from '../content-sv/settings_defaults.json'
import tree_layout from '../content-sv/tree_layout.json'
import grammar_notes from '../content-sv/grammar_notes.json'
import can_do from '../content-sv/can_do.json'
import conjugations from '../content-sv/conjugations.json'
import image_set from '../content-sv/image_set.json'
import a1_list from '../content-sv/a1_list.json'
import parts from '../content-sv/parts.json'
import a1_tasks from '../content-sv/a1_tasks.json'
import a1_texts from '../content-sv/a1_texts.json'
import a1_forms from '../content-sv/a1_forms.json'
import a1_prompts from '../content-sv/a1_prompts.json'
import catch_up from '../content-sv/catch_up.json'
import a1_listen from '../content-sv/a1_listen.json'

export const tables = {
  units, sentences, words, sentence_words, accepted_answers, question_types, variants, rounds, tree_layout, grammar_notes, image_set, can_do, conjugations, a1_list, parts, a1_tasks, a1_texts, a1_forms, a1_prompts, a1_listen, catch_up,
  round_type_mix, phase1_fallbacks, cant_swaps, flag_reasons, settings_defaults, qa_answers, feedback_phrases,
}
