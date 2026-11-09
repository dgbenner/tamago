# Tamago: build phases

Draft 2, November 9, 2026. The order Claude Code builds Tamago in. Each phase ends with something Dan can open
on his phone and use. Source documents: tamago-feature-list.md, question-types.md, tamago-data-v7.xlsx.

## Status

| Phase | What | Status |
| --- | --- | --- |
| 0 | Setup and content import | Done |
| 1 | The 10-minute lesson, Unit 1 | Done. Deployed, on workbook v6, volume fixed |
| 2a | Units 2 to 5, the learning tree, home screen | **Next** |
| 2b | Grammar notes, speaking questions, word-to-image | Specced |
| 2c | Strength bars, points, score, progress page | Specced |
| 3 | Side tools and choice | Specced |
| 4 | Accounts and community | Specced |
| 5 | Learner-guided content | Specced |

## Stack

- React, Vite, Tailwind. Installable web app, mobile first.
- No backend through Phase 3. Content ships as JSON built from the workbook. Progress is stored on the device.
- Hosting on Netlify. Netlify Functions only when an API call is needed (Phase 4 and later).

## Phase 0: setup and content import (done)

Import script, content checks against Tatoeba, Wiktionary and Lingua Libre, and review.md for Dan's decisions.

## Phase 1: the 10-minute lesson (done)

Unit 1, five rounds, question types QT01 and QT03 to QT09, QT11 and QT12, remediation, review bank, hints,
flags, settings, feedback lines, offline use and pre-made audio files.

## Phase 2a: Units 2 to 5 and the learning tree (next)

- Pull sentences for U02 to U05 from Tatoeba, following the content_pull tab. Dan approves each unit in
  review.md. Words get Wiktionary data as in Phase 0.
- Learning tree from the tree_layout tab: U01 alone, then U02 and U03, then U04 and U05. Unlocking follows R20.
- Home screen:
  - Points chip top left, settings top right.
  - The tree scrolls. Review and Continue stay pinned at the bottom.
  - Each tree node is a unit, not a round: a circle with an icon slot, the unit title, and five small segments
    for rounds finished. The current unit also shows "Round 1 · Lesson 2 of 6".
  - Locked units are gray.
  - Tapping a unit opens a small card: title, grammar point in one line, Start or Continue. The Grammar note
    button arrives in 2b.
  - The bottom button says Resume only when a lesson is in progress. Otherwise it says Continue and starts the
    next lesson in the current unit.
- Done when: Dan can open U02 to U05 in order on his phone and finish round 1 of each.

## Phase 2b: grammar notes and speaking

- Grammar note screen before each unit: the rule in plain words, two or three examples with audio.
  Conjugation tables come from Wiktionary.
- Speaking types QT10 and QT13 (never graded). Remove their phase1_fallbacks rows.
- QT02 word to image, once an openly licensed image set is chosen. Words marked needs_image in U04 and U05.

## Phase 2c: strength and progress

- Skill strength bars on FSRS; Practice weak skills button.
- Points, per-skill score (one decimal through A1) and CEFR band.
- Progress page with the "I can" checklist; can_do rows checked against the CEFR grid first.
- Streak and weekly goal, with an off switch.
- Placement check.

## Phase 3: side tools and choice

- Word list with matching and flashcard modes, say-aloud option, FSRS flashcards.
- Verb conjugation trainer (conjugations from Wiktionary).
- Choose your topic node: about 7 topics from the pool of 30.
- Variant test bank: switch variants between live, testing and off.
- Review checkpoint nodes in the tree.

## Phase 4: accounts and community

- Native-speaker check of every tamago_original sentence, with recordings.
- Profile, screen name, email, authentication, sync.
- Answer flags (version 2) and sentence discussions (version 3); forum stub.
- Claude explains mistakes on typed answers.
- 5 to 10 testers.

## Phase 5: learner-guided content

- Learner asks for a lesson, flashcards or a test; an LLM returns structured data in Tamago's question shape.
- Conversations (QT21) and listening comprehension (QT20).

## Rules for Claude Code in every phase

- Speed between questions comes first. No loading spinners inside a lesson.
- No hearts, chests, gems, combo counters, interjections or celebration screens.
- No definitions or conjugations from model memory.
- Keep the data shape from the workbook; add columns, don't rename them.
