# Fable's phase 6 summary: Swedish, Danish, Dutch (2026-11-21) and Polish (2026-11-22)

Reviewed on local main as merged (Swedish ac00c3c, Danish dc9edee, Dutch 02c4fc8), Parts 1 to 4, against the judging themes in `_source/language-pipeline.md`. No phase 6 review existed before this one; Polish was not touched. Nothing in the repo changed. The per-language files hold the verdicts a builder applies line by line, with appendices listing every affected row:

- `Sites/tamago-sv-a1/_review/swedish-phase6-review.md`
- `Sites/tamago-da-a1/_review/danish-phase6-review.md`
- `Sites/tamago-nl-a1/_review/dutch-phase6-review.md`
- `Sites/tamago-pl-a1/_review/polish-phase6-review.md` (added 2026-11-22; Polish section at the end of this file)

## What holds across all three

| Theme | Swedish | Danish | Dutch |
|---|---|---|---|
| Word audit (early, over four) | 0, 0 | 0, 0 | 0, 0 |
| Sentences outside their circle's words | 3 (word form missing from the list) | 1 (politi) | 0 |
| Generated en_to_fr answers with untaught words | 2 of 6 | 7 of 11 | 24 of 43 |
| Read and Answer texts with untaught words | 33 of 39 | 31 of 39 | 25 of 39 |
| Drafts marked tamago_original and in scope | 987 of 987 | 671 of 671 | 672 of 672 |
| Article/noun gender mismatches in live lines | 0 | 0 | 0 |
| Nouns needing a gender (Wiktionary has one) | 0 | 15 (months, morgen, lov) | 3 (kopje, drankje, kaartje) |
| Glossary hints that are a bare form-of label | 137 | 163 | 30 |
| Identical cognates still on Match Pairs / near-cognates | 14 / 137 | 14 / 170 | 14 / 82 |
| Circles over 40% drafts (of 51 in Parts 2 to 4) | 16 | 6 | 6 |
| Lines to cut | 7 | 14 | 7 |
| Drafts to fix | 6 | 1 | 0 |
| UK spellings in English | 16 | 5 | 14 |
| Formal address | none (one slip, S44005) | none | u taught from U41, 152 lines, none in Part 1 |

## The findings that matter most

1. **Form-of hints with no meaning (Swedish 137, Danish 163, Dutch 30).** A learner who taps Danish *kan* reads "present of kunne"; Swedish *vill*, *får*, *sa*, *skulle* and every Danish past form, participle and imperative are the same. word-hints.js shows the hint raw and `lemma_gloss` is empty for all of them. This is the one fix that changes what every learner sees on every page. It is a pipeline step, not 330 hand edits: build "can (present of kunne)" from the lemma page's first gloss.
2. **Generated accepted answers and reading texts use untaught words.** The answers are accept-only and never shown, but the theme is explicit; Dutch's include Belgian forms (gij, trager, Excuseer, Jazeker). The reading texts are read by the learner, and the untaught words (torget, stationen, kr, centrum, balkong, Appeltaart, Bushalte …) carry no hint. Each file's Appendix C lists them; reword as R306 was, or hint them.
3. **Near-cognates are not handled.** The engine excludes a word from Match Pairs only when a hint item equals it, so "a park" keeps park on the board, and musik/music, hotell/hotel, buss/bus are never considered. Framework ask in each file's Appendix E.
4. **Register slips are few and listed:** Danish hate lines (4) and death lines (6), Dutch "Are you stupid?" and two love lines, Swedish none.
5. **Wiktionary disagreements with the data:** Danish months, morgen and lov have a gender on Wiktionary (c) and none in the data; Dutch kopje, drankje and kaartje are neuter on Wiktionary, not blank; Swedish skönt is an adjective form filed as a noun with the wrong sense; Danish *hade* is "to hate" and the data gives hader no meaning.

## Part 1 findings, applied?

- **Swedish:** var's 16 "was" lines gone, all 36 Rejects gone, 21 picks and 3 fixes in, nine hints fixed. **Not applied:** the *om* hint (still "if"), and *var*'s hint now also needs "was" since U62 teaches it.
- **Danish:** lide ("kan lide: to like") and køkken (et) applied; all 47 Rejects, 15 picks, 10 fixes and the one cut applied; formal De gone. **Not applied:** the *kan* hint (still "present of kunne").
- **Dutch:** Part 1's 29 sense fixes are in; no formal u in Part 1.

## Swedish Part 4 after the trim

Coherent where it matters, unchanged by the trim. The 46 words turned off had only drafted lines and nothing shipped depends on them. U26 to U28 and U81 to U89 are the usual A1 Part 4 set at 5% to 36% drafts (U86 47%, U88 77%). The five vocabulary circles U91 to U95 are the Kelly tail (stat, parti, demokrati, makt, rättighet, politisk, ekonomisk, kristen, procent, anser, gäller, sker …) at 47% to 79% drafts each; the part average of 37.5% hides that 7 of its 17 circles are over the line. Recommendation, Dan's call: stoplist the newsroom words as Italian's register words were, keep the everyday core in those circles, and report coverage against the target. If the words stay, the part is still teachable; the learner meets an abstract cluster in the last five circles, mostly through drafts.

## Needs Dan

- The form-of hint fix is pipeline work for Builder 1 (all three languages, Part 1 included).
- Dutch keeps the polite *u* from Part 2 while Swedish and Danish keep theirs out: confirm that as policy.
- Swedish Kelly tail: stoplist or keep (above).
- Danish død/døde and hader after their lines are cut: turn off and stoplist, or draft one gentle line each.

## Polish (added 2026-11-22)

Reviewed on local main as merged (3bbb386), Parts 1 to 4 and the mock exam, against the judging themes and Dan's seven Polish points. No Polish phase 6 review existed before this one. Nothing in the repo changed. Verdicts a builder applies line by line, with appendices, are in `Sites/tamago-pl-a1/_review/polish-phase6-review.md`.

| Theme | Polish |
|---|---|
| Word audit (early, over four) | 0, 0 (3,101 lessons, 1,579 words) |
| Sentences, form cards, listening lines outside their circle's words | 0 of 4,641; 0 of 7; 0 of 36 |
| Generated en_to_fr answers with untaught words | 29 of 56 |
| Read and Answer texts with untaught words | 10 of 39 (3 case forms, 1 plural, 1 one-circle-early price, 5 abbreviations) |
| Drafts marked tamago_original and in scope | 1,649 of 1,649 |
| Gender mismatches in live lines | 0 |
| Nouns needing a gender (lemma has one) | 23 case forms |
| Glossary hints that are a bare form-of label | 0 |
| Conjugated forms hinted with the infinitive ("jestem: to be") | 81, mostly Part 1 |
| Identical cognates on Match Pairs / near-cognates | 0 / 20 |
| Circles over 40% drafts (of 72) | 20 (Part 1: U02 58%, U53 55%, U12 43%); every part under 40% (28.8 / 36.5 / 36.7 / 37.9) |
| Lines to cut | 13 (5 głupi, 4 nienawidzę, 4 of 6 Bóg if Dan agrees) |
| English to fix | 4 lines (S4014, S4022, S15025, S62019) and 32 UK spellings |
| Formal address | not taught (pan/pani only as "this man / this woman", U87); two formal lines leak into accepted answers |

**What is good.** The case order is the best-built thing in the course: nominative, then the accusative of objects (U04, U05), the genitive where it is unavoidable (nie, lat, z Polski, nie ma, the partitive), the locative with w/na (U45 on), the instrumental in Part 3 (z kolegą, jestem nauczycielem, autobusem, pod/przed/między), dative pronouns only (U26, U85). Every case form is its own word with a hint that names the lemma and the phrase, no sentence uses a form before its circle, and the 72 notes name each case where it arrives. The 199 **może** = "maybe" rejections are consistent (one reason, none slipped through; **być może** taught in U39). The thin circles U02 and U53 are coherent; their share is a trust-rule question. The mock exam matches the state exam's A1 modules, order and 50% pass rule, with no grammar module, as the regulation has it.

**What to fix, in order.**
1. 81 conjugated forms whose hint is the infinitive: **jestem** "to be (być)", **mam**, **lubię**, **mogę**, **chcę** … (Appendix A). The other 172 forms already read "I love (kochać)"; make these the same. This is Polish's form-of problem and it sits in the first fifteen circles.
2. Formal **pan/pani**: Dan's policy is to teach the formal register; Polish does not. Add **pan/pani** as the polite you (third-person verb) in U41, with the help-circle phrases (U26/U31), the café and restaurant (U81/U82) and the form lines (U88); keep **ten pan / ta pani** in U87. Wiktionary confirms the pronoun sense for both. Builder's work after Dan says which circles.
3. Hints: **może** should carry "maybe (być może)" beside "he/she can"; **numer** reads "number number number edition"; **kochany** is filed as a noun but used as an adjective. 23 case-form nouns need their lemma's gender.
4. Register cuts: five "stupid" lines, four hate lines; the six **Bóg** lines in U95 are Dan's call (keep the two idioms, S95003 and S95008).
5. Texts and answers: three untaught case forms in the reading texts (hotelem, studenta, szpitalu), **Stare** in R106, **złotych za** one circle early in R101, abbreviations zł / m / Tel.; 29 generated answers with untaught words, two of them formal.
6. English: four loose lines and 32 UK spellings.

**Names in case forms (Dan's call).** None live; place names work as taught forms. Allow **Toma** (object) from U41 and **Tomem** from U64, as the builder's logged option, and about 120 Tatoeba lines come back; each form needs a word row with a hint, not only a names entry.

**Needs Dan (Polish).**
- Formal pan/pani: which circles (proposal above).
- Case-marked names: Toma from U41, Tomem from U64, or keep nominative only.
- The six Bóg lines.
- Ready for the Real Exam: the regulation sets A1 for adults and UMCS lists it, but the commission's current sessions start at A2 for adults; the page should say A1 sittings are rare and to check the session list.
