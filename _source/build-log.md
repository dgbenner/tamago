# Tamago build log

Kept under _source/autonomous-build.md. Newest phase first.

## Phase 2b: grammar notes, speaking, word to image (November 9, 2026)

**Built**

- Grammar note before each unit's first lesson, once, and from the unit card any time: the rule in plain words, three examples from the unit's live sentences with audio, and the present tense read from Wiktionary's own conjugation table (être, manger, aimer, avoir). The build fails if an example isn't live or a table can't be read.
- Speaking, never graded: Say it aloud (QT10, V1002: audio, the French behind a tap, Done) from round 1, and Speak and compare (QT13) in rounds 4 and 5: V1301 records you and plays the model and yours side by side; V1302 gives the English, you say it from memory, then compare. Recording stays on the device and is dropped after the question. With no microphone, Done still works. Each counts a point (R14) and stays out of the score and the pass (R05).
- Word to image (QT02): OpenMoji 15.1.0 pictures (CC BY-SA 4.0) for the 19 nouns marked needs_image, saved in the app for offline use and credited on About the content. V0201 French word and three pictures; V0202 English word and four pictures labelled in French.
- Workbook v9: grammar_notes tab, words.image_file, phase1_fallbacks status column (QT09, QT10, QT13 rows off; QT02 kept).

**Decisions**

- Picture set: OpenMoji, because it's openly licensed (CC BY-SA 4.0, credited), covers every needs_image noun and works offline as small SVGs.
- Word to image falls back to Pick the meaning when fewer than 3 pictured words have been met (the first lessons of a unit) or a unit has fewer than 3 pictured words in all, using the QT02 fallback row.
- Units 2 and 3 have no pictured words of their own, so their word to image questions use Unit 1's (R21 allows words from opened units).
- Grammar note rules are mine, in plain words; every example is a live sentence and every verb form comes from Wiktionary.
- Speaking gets no feedback line in the answer bar ("Done."), since nothing is judged.
- The end-of-lesson line counts graded questions only ("8 of 8."), since speaking isn't scored.
- Speak and compare says "Native recording" only where Lingua Libre has one (R11); otherwise "Model".

**Stubbed**

- Grammar note link from the answer bar (learning-methods 15): not built; the unit card has it.

**Waiting for Dan**

- Nothing new.

## Phase 2a: Units 2 to 5, the learning tree, home screen (November 9, 2026)

**Built**

- Import reads workbook v8 (v7 at the start of the phase) and checks tree_layout. Content outside the workbook (decisions, Tatoeba pulls in content/pull, drafts in content/drafts.json) is merged at import and skipped once the workbook holds it.
- Wiktionary check: handles pages split into subpages ("a"), sense picks for the 64 new words in content/word-senses.json.
- scripts/pull-units.mjs: content_pull rules P01 to P09, report in content/pull/review.md.
- scripts/workbook-sync.mjs: folds everything back into the next workbook version, with a README changelog row. v8 written and verified: rebuilding from v8 alone gives the same app content.
- Lesson engine: contentForUnit (own sentences plus borrowed ones, words of this and earlier units, QT09 answers from any unit). Progress, rounds seen and the next-lesson carry are per unit; review spans all units.
- Home: the tree (rows, nodes with an icon slot, five round segments, the current unit's round and lesson), unit cards, locked units, pinned Review and Continue or Resume.

**Decisions**

- Followed Dan's Phase 2a rulings: cuts, U02 words, 4 QT09 pairs per unit, drafts to reach 3 per word, U03 borrows U01's tu/es sentences, five short hints.
- Approved U02 myself under the brief (the newer instruction): 53 sentences, every word in 3 or more.
- The pull's extra rules (names, digits, articles, noun meaning, plainest English) and why: the first pull let in places, star signs and pronoun uses of le that would teach the wrong thing.
- Hints for words without one: Wiktionary's gloss, or for a verb form "to eat (manger)". hint_source says Wiktionary.
- Node icon slot shows the unit number until unit icons exist.
- Starting another unit while a lesson is in progress sets the lesson aside, and the card says so.

**Stubbed**

- Grammar note button on the unit card (Phase 2b).

**Waiting for Dan**

- Reading the new units; the native-speaker check list (84 sentences); hosting move off Netlify.
