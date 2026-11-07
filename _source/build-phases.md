# Tamago: build phases

Draft 1, November 7, 2026. The order Claude Code builds Tamago in. Each build phase ends with something Dan
can open on his phone and use. These build phases are separate from the three content phases in the feature list.

Source documents: tamago-feature-list.md (what), question-types.md (question logic), tamago-data.xlsx (data).

## Stack

- React, Vite, Tailwind. Installable web app (PWA), mobile first.
- No backend in phases 0 to 2. Content ships as JSON files built from the workbook. Progress is stored on the
  device (IndexedDB).
- Hosting on Netlify. Netlify Functions only when an API call is needed (phase 4 and later).

## Phase 0: setup and content import

Goal: the data is in the app and checked.

- Repo, Vite project, Tailwind, light and dark mode tokens.
- Import script: reads each workbook tab, writes one JSON file per table, and fails on broken IDs.
- Content check script:
  - match each draft sentence to a checked Tatoeba sentence (from the Tatoeba French–English export) and fill
    source_id, or flag it for replacement;
  - pull part of speech, gender and a short gloss for each word from Wiktionary;
  - mark which sentences have a Lingua Libre recording.
- Dan reviews the flagged sentences. Nothing with status "draft" goes live.

Done when: Unit 1 has 30 checked sentences and 18 words with Wiktionary data, all as JSON.

## Phase 1: the 10-minute lesson (version 1)

Goal: Dan can open the app in a line and finish a Unit 1 lesson before it moves.

- Lesson player:
  - 10 questions, progress bar at the top, no timers;
  - next question appears with no delay; no screens between questions or after the lesson beyond one line
    with the score and a Continue button;
  - answer bar after each answer: right or wrong, the correct answer, flag and comment icons bottom right.
- Question types: QT01, QT03, QT04, QT05, QT06, QT07, QT08, QT11, QT12 (QT02 waits for images; QT09, QT10,
  QT13 come in phase 2).
- Five rounds for Unit 1, using round_type_mix.
- Remediation: a miss returns at the end of the block as a different type. Score counts first attempts. Pass is
  7 of 10; under 7 restarts the lesson.
- Rule-based answer checking: typo, spaces, accents, accepted answers. Strictness setting.
- Tap a dotted word for its hint. Hints logged. New word tag.
- Review bank: every miss goes in; leaves after three correct answers in review. A Review button on home.
- Flag: picks a reason and stores it on the device. Comment icon shows a "coming later" stub.
- Settings: answer strictness, chips or keyboard, listen first, can't listen now, can't speak now, theme.
- Next lesson preloaded; works with no connection.
- Home screen: Unit 1 with its round count, points for today, Review button.

Done when: Dan can do all five rounds of Unit 1 on his phone, offline, with no screen that holds him.

## Phase 2: the tree and progress

- Learning tree with three to five A1 units: rows of one, two or three nodes, gray when locked, lesson count,
  branching rule (all nodes in a row required to move on).
- Grammar note screen before each unit.
- Speaking types QT09, QT10, QT13 (never graded); QT02 once images are chosen.
- Skill strength bars on FSRS; Practice weak skills button.
- Points, per-skill score (one decimal through A1) and CEFR band; progress page with the "I can" checklist.
- Streak and weekly goal, with an off switch.

## Phase 3: the side tools and choice

- Word list with matching and flashcard modes, say-aloud option, FSRS flashcards.
- Verb conjugation trainer (conjugations from Wiktionary).
- Choose your topic node: about 7 topics from the pool of 30; first topic packs built from Tatoeba.
- Variant test bank: switch variants between live, testing and off from a settings screen for Dan.
- Review checkpoint nodes in the tree.

## Phase 4: accounts and community

- Profile with screen name and email, authentication, sync across devices.
- Answer flags, version 2: "My answer should be accepted" goes to a review list.
- Sentence discussions, version 3: thread under each question, votes, report link; Claude screens for spam.
- Forum stub with a Sentence Discussions section and an Unanswered filter.
- Claude explains mistakes on typed answers (small model, daily limit).
- 5 to 10 testers.

## Phase 5: learner-guided content

- Learner asks for a lesson, flashcards or a test; an LLM returns structured data in Tamago's question shape.
- Conversations through the API (QT21). Listening comprehension (QT20).
- Facts in generated content still come from Wiktionary.

## Rules for Claude Code in every phase

- Speed between questions comes first. No loading spinners inside a lesson.
- No hearts, chests, gems, combo counters, interjections or celebration screens.
- No definitions or conjugations from model memory.
- Keep the data shape from the workbook; add columns, don't rename them.
