# Finnish — A1 scouting report

## 1. Grammar features that differ from courses already built
Finnish is Uralic, the most structurally distant of the five from the courses built:
- **No grammatical gender and no articles at all** — so the *entire* "article/gender" slot the existing courses rely on has nothing to show.
- **~15 cases, agglutinative suffixes** on the noun (`talo` house → `talossa` in the house → `talosta` from the house). Prepositional meaning is carried by case endings.
- **Consonant gradation**: stems alternate consonants under inflection (`katu` → `kadun`, `pankki` → `pankin`, `tyttö` → `tytön`). Even the most basic A1 nouns change shape when a case suffix is added — brutal for a beginner.
- **Partitive case** is pervasive and semantically loaded (partial objects, after numbers, negation, mass nouns) and has no European-language equivalent.
- **Vowel harmony** (`a o u` vs `ä ö y`) governs every suffix.
- **Verbs**: personal endings; a **separate negative verb** `ei` that itself conjugates (`en ole`, `et ole`) instead of a negating particle.
- **Postpositions** rather than prepositions; word order flexible.
- **Script**: Latin + `ä ö` (and `å` for Swedish loans). Spelling is phonemic; long vs short vowels/consonants are contrastive (`tuli`/`tuuli`/`tulli`).

## 2. What the A1 circles / grammar notes need
- **Glossary**: the biggest rework of all five — with no gender *and* no article, the current slot is meaningless. Replace it with the noun's stem + key forms (nominative + genitive + partitive), because consonant gradation changes the stem the learner must learn.
- **New grammar notes with no precedent**: consonant gradation, partitive use, case suffixes for location/motion, vowel harmony, and the negative verb (`ei` conjugation) for the "no/not" circle.
- **Numbers circle**: numbers govern the partitive singular — a dedicated note.
- Greetings/food/colours work as topics; colours need little agreement work (adjectives agree in case/number but there's no gender).
- **Wiktionary friction**: English Wiktionary has rich Finnish inflection tables (no gender to parse), but the pipeline must handle gradation + case suffixes, not a single article.

## 3. Word list
- **No clean, freely-downloadable CEFR-graded A1 list.** Finnish was **not** in the KELLY project; Kotus/YKI materials aren't an open CEFR-graded word list.
- **Reliable stand-in**: **hermitdave FrequencyWords** (OpenSubtitles2018), content **CC BY-SA 4.0** (code MIT), covers Finnish (`fi`). Source: https://github.com/hermitdave/FrequencyWords (frequency-ranked, not CEFR — manual A1 selection; note subtitle frequency skews spoken/colloquial).

## 4. Tatoeba + Lingua Libre coverage
- **Tatoeba: ~155,049 Finnish sentences** — healthy; most circles fillable from checked sentences. Source: https://tatoeba.org/en/stats/sentences_by_language
- **Lingua Libre: ~219 Finnish recordings** (via Wikimedia Commons `Category:Lingua Libre pronunciation-fin`) — negligible; device TTS fallback for almost all audio.

**Verdict: HIGH.** Biggest obstacle: consonant gradation + ~15 cases + the partitive mean even basic nouns inflect heavily, and with no gender and no article the Glossary/grammar-note model must be rebuilt rather than tweaked; near-zero human audio adds to it. Healthy Tatoeba is the one bright spot.
