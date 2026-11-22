# Romanian — A1 scouting report

## 1. Grammar features that differ from courses already built
Romanian is Romance, so verbs and vocabulary feel close to the built courses — but two features are unlike anything shipped:
- **Enclitic definite article**: the definite article is a **suffix**, not a separate word. `lup` → `lupul` ("the wolf"), `casă` → `casa` ("the house"). The indefinite article (`un`, `o`) is separate, as expected.
- **3 genders including a true neuter**: neuter nouns behave as masculine in the singular and feminine in the plural — no dedicated neuter endings, so learners must learn the switch.
- **Lighter case system than Slavic**: nouns distinguish nominative/accusative vs **genitive/dative** (plus a vocative), and case is mostly carried by the article forms (`lupului` = "of/to the wolf") rather than heavy stem inflection — far gentler than Polish/Czech.
- **Verb conjugation**: four conjugation groups, broadly like the Romance courses.
- **Word order**: SVO, familiar.
- **Script**: Latin + `ă â î ș ț`. Comma-below `ș ț` (not cedilla) matters for data correctness.

## 2. What the A1 circles / grammar notes need
- **Glossary**: the "article" slot is the key break. Romanian's article is a **suffix on the noun**, so showing "the X" means showing an inflected form (`lupul`), not a separate word paired with the lemma. The pipeline/Wiktionary parse must capture the enclitic-article forms + plural, and the Glossary layout must present them.
- **Gender note**: the neuter's masculine-singular/feminine-plural behaviour needs an explicit note; the gender badge can't be a flat masc/fem/neut tag.
- Most of the 21-circle plan transfers from the Romance courses (greetings, numbers, family, food, colours all work). Colours/adjectives still need agreement, but it's gender/number, not case.
- **Wiktionary friction**: English Wiktionary gives Romanian gender + articulated/plural forms via templates; usable, but the pipeline must read the enclitic-article forms rather than assume a free-standing article.

## 3. Word list
- **No clean, freely-downloadable CEFR-graded A1 list.** Romanian was **not** in the KELLY project.
- **Reliable stand-in**: **hermitdave FrequencyWords** (OpenSubtitles2018), content **CC BY-SA 4.0** (code MIT), covers Romanian (`ro`). Source: https://github.com/hermitdave/FrequencyWords (frequency-ranked, not CEFR — manual A1 selection).

## 4. Tatoeba + Lingua Libre coverage
- **Tatoeba: ~42,080 Romanian sentences** — the thinnest of the five, so expect more hand-drafted sentences needing a native check. Source: https://tatoeba.org/en/stats/sentences_by_language
- **Lingua Libre: ~24,123 Romanian recordings** (via Wikimedia Commons `Category:Lingua Libre pronunciation-ron`) — a decent body of human audio, better proportionally than the corpus.

**Verdict: MODERATE.** Closest of the five to the existing Romance courses. Biggest obstacle: the enclitic definite article (a noun suffix) breaks the one-word-article Glossary model and the pipeline's article assumption; thin Tatoeba is the secondary cost.
