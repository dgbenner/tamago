import units from '../content/units.json'
import sentences from '../content/sentences.json'
import words from '../content/words.json'
import sentence_words from '../content/sentence_words.json'
import accepted_answers from '../content/accepted_answers.json'
import question_types from '../content/question_types.json'
import variants from '../content/variants.json'
import rounds from '../content/rounds.json'
import round_type_mix from '../content/round_type_mix.json'
import phase1_fallbacks from '../content/phase1_fallbacks.json'
import cant_swaps from '../content/cant_swaps.json'
import flag_reasons from '../content/flag_reasons.json'
import qa_answers from '../content/qa_answers.json'
import feedback_phrases from '../content/feedback_phrases.json'
import settings_defaults from '../content/settings_defaults.json'
import { indexContent } from './lesson.js'

// Bundled with the app, so a lesson never waits on the network.
export const content = indexContent({
  units, sentences, words, sentence_words, accepted_answers, question_types, variants, rounds,
  round_type_mix, phase1_fallbacks, cant_swaps, flag_reasons, settings_defaults, qa_answers, feedback_phrases,
})
export const recordings = sentences.filter((s) => s.lingua_libre?.audio_file).map((s) => s.lingua_libre.audio_file)
