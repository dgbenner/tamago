# Hungarian — A1 scouting report

## 1. Grammar features that differ from courses already built
Hungarian is Uralic (Finno-Ugric), structurally unlike every course built so far:
- **No grammatical gender at all** — not even in pronouns (`ő` = he/she). This *simplifies* the noun entry.
- **~18 cases, expressed as agglutinative suffixes** stacked on the noun (`ház` house → `házban` in the house → `házamban` in my house). "In/on/to/from" are case suffixes, not prepositions.
- **Vowel harmony**: almost every suffix has back and front variants chosen by the stem's vowels (`-ban`/`-ben`, `-hoz`/`-hez`/`-höz`). Pervasive from lesson 1.
- **Articles exist**: definite `a`/`az` and indefinite `egy` — closer to English than the Slavic languages (the `a`/`az` choice is purely phonological).
- **Definite vs indefinite verb conjugation**: the verb changes ending depending on whether its object is definite (`olvasok` I read / `olvasom` I read it) — no analogue in the built courses.
- **Possessive suffixes** replace possessive pronouns; **after a numeral the noun stays singular** (`két alma`, not plural).
- **Word order**: topic/focus-driven, flexible, not fixed SVO.
- **Script**: Latin + `á é í ó ö ő ú ü ű` and digraphs `sz cs gy ny ly zs`.

## 2. What the A1 circles / grammar notes need
- **Glossary**: the gender half of the "article/gender" slot simply drops (good). The article (`a`/`az`) is trivial. The real rework is that noun *meaning* lives in suffixed forms, so the Glossary may want to show a stem + a couple of key case forms.
- **New grammar notes with no precedent**: vowel harmony (touches every suffix), case suffixes replacing prepositions, and definite/indefinite verb conjugation. These are concepts, not lookups.
- **Numbers circle**: singular-after-numeral note.
- Greetings/colours/food circles are fine as topics; colours need no case-agreement work (adjectives before a noun don't inflect), which is easier than Slavic.
- **Wiktionary friction**: English Wiktionary has large Hungarian inflection tables (no gender to parse — simpler), but the pipeline must handle suffix morphology rather than a single article.

## 3. Word list
- **No clean, freely-downloadable CEFR-graded A1 list.** Hungarian was **not** in the KELLY project; the ECL/state exams don't publish an open A1 list.
- **Reliable stand-in**: **hermitdave FrequencyWords** (OpenSubtitles2018), content **CC BY-SA 4.0** (code MIT), covers Hungarian (`hu`). Source: https://github.com/hermitdave/FrequencyWords (frequency-ranked, not CEFR — manual A1 selection).

## 4. Tatoeba + Lingua Libre coverage
- **Tatoeba: ~445,632 Hungarian sentences** — the **largest of the five** (a very active contributor base), so circles fill easily from checked sentences with little hand-drafting. Source: https://tatoeba.org/en/stats/sentences_by_language
- **Lingua Libre: ~260 Hungarian recordings** (via Wikimedia Commons `Category:Lingua Libre pronunciation-hun`) — negligible; the app will fall back to device TTS for almost all audio.

**Verdict: MODERATE–HIGH.** The huge Tatoeba corpus and gender-free nouns help a lot, but vowel harmony, agglutinative case suffixes and definite/indefinite verb conjugation are entirely new teaching concepts with no Glossary analogue. Biggest obstacle: vowel harmony + case-suffix morphology (and effectively no human audio).
