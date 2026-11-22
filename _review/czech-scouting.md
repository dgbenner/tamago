# Czech — A1 scouting report

## 1. Grammar features that differ from courses already built
- **7 cases** (nominative, genitive, dative, accusative, vocative, locative, instrumental), inflecting everyday A1 nouns from the first lesson. "I have a dog" → accusative (`psa`); negation + numerals pull further cases.
- **No articles at all** — no definite/indefinite distinction.
- **3 genders** (masculine / feminine / neuter), with masculine split by **animacy** (animate vs inanimate), which changes accusative endings.
- **Verbal aspect** — perfective/imperfective pairs, a core A1 concept absent from the existing courses.
- **Vocative case** used when addressing people by name — directly relevant to the greetings circle (`Pane Nováku!`).
- **Numerals govern case** (2–4 nominative plural, 5+ genitive plural), like Polish.
- **Script**: Latin + háček/čárka letters `č š ž ř ě á é í ó ú ů ý`. The `ř` sound and dense consonant clusters are pronunciation hurdles; vowel length is phonemic.

## 2. What the A1 circles / grammar notes need
- **Glossary**: the one "article/gender" slot breaks — replace with gender + animacy + declension pattern, ideally showing nominative/genitive/accusative.
- **Greetings circle**: needs a vocative note (names change form when addressed).
- **Colours/adjectives circle**: adjective↔noun agreement across case + gender.
- **Verb circles**: new aspect note; present conjugation by person; gendered past tense.
- **Numbers circle**: numeral-governed case note.
- No-article means any "a/the" scaffolding from the built courses drops entirely.
- **Wiktionary friction**: English Wiktionary has full Czech declension tables + gender/animacy, so the facts exist, but the pipeline (currently one article/gender) must parse the case tables.

## 3. Word list
- **No clean, freely-downloadable CEFR-graded A1 list.** Czech was **not** in the KELLY project. The Czech National Corpus (SYN/ČNK) publishes frequency lists but behind registration and not CEFR-graded / not an open licence.
- **Reliable stand-in**: **hermitdave FrequencyWords** (OpenSubtitles2018), content **CC BY-SA 4.0** (code MIT), covers Czech (`cs`). Source: https://github.com/hermitdave/FrequencyWords (frequency-ranked, not CEFR-graded — A1 selection is manual).

## 4. Tatoeba + Lingua Libre coverage
- **Tatoeba: ~90,246 Czech sentences** — decent; most circles fillable from checked sentences, some hand-drafting. Source: https://tatoeba.org/en/stats/sentences_by_language
- **Lingua Libre: ~6,602 Czech recordings** (via Wikimedia Commons `Category:Lingua Libre pronunciation-ces`) — modest; partial human audio, meaningful TTS fallback for gaps.

**Verdict: HIGH.** Biggest obstacle: the 7-case system + masculine animacy + verbal aspect, which breaks the one-word-article/simple-gender Glossary model; thinner Tatoeba and audio than Polish compound the hand-work.
