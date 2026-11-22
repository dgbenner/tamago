// Form-of glosses with no meaning (Fable, phase 6 reviews, 2026-11-21): Wiktionary files many inflected forms under a
// bare label, "present of kunne", "past participle of doen", "comparative degree of oud", and a hint built from that
// label tells the learner nothing. The check reads the named word's own Wiktionary entry and keeps its first gloss as
// lemma_gloss; build-content then makes the hint "can (present of kunne)": the meaning, then the label.
// Used by scripts/check-content.mjs and scripts/build-content.mjs, every course.

// The label words Wiktionary puts before "of X" in a form-of definition (any order, any case: "Plural of", "past
// participle neuter of", "subjective unstressed form of", "apocopic form of", "alternative spelling of").
const LABEL = [
  'present', 'past', 'future', 'active', 'passive', 'predicative', 'attributive', 'indicative', 'subjunctive', 'imperative',
  'infinitive', 'tense', 'participle', 'supine', 'gerund', 'neuter', 'common', 'masculine', 'feminine', 'definite',
  'indefinite', 'singular', 'plural', 'comparative', 'superlative', 'degree', 'diminutive', 'stressed', 'unstressed',
  'subjective', 'objective', 'adverbial', 'alternative', 'spelling', 'form', 'apocopic', 'abbreviation', 'inflection',
  'nominative', 'genitive', 'dative', 'accusative', 'instrumental', 'locative', 'vocative', 'first', 'second', 'third', 'person',
].join('|')
// The whole definition is the label and its word (one to three words: imorgon is "alternative spelling of i morgon"),
// optionally with Wiktionary's own short gloss in curly quotes.
const BARE = new RegExp(`^((?:(?:${LABEL})[\\s-]+)*(?:${LABEL}) of (\\p{L}[\\p{L}'-]*(?: \\p{L}[\\p{L}'-]*){0,2}))(?: \\(“(.+?)”\\))?$`, 'iu')

// { label: "present of kunne", lemma: "kunne", gloss: "can" | undefined } for a bare form-of definition, else null.
export function bareFormOf(definition) {
  const m = String(definition ?? '').trim().match(BARE)
  return m ? { label: m[1], lemma: m[2], gloss: m[3] } : null
}
