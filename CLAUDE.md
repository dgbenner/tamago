# Tamago

French learning app, installable web app, mobile first. React, Vite, Tailwind v4. No backend. Netlify config is in place; deploy only when Dan says.

Specs are in `_source/`: tamago-feature-list.md (what), build-phases.md (order of work), question-types.md (question logic), tamago-data-v3.xlsx (all content; its README holds Phase 1 rules), tamago-phase0-decisions.xlsx (decision log).
The workbook is edited outside this repo and gets reissued. Never edit it here, and never write check results into it. A new version goes in `_source/` and becomes the default path in `scripts/import.mjs`.

## Content pipeline

`npm run content` runs three steps:

1. `import`: workbook to `content/raw/`. Fails on broken IDs. Also validates sentence_words, pairs, round_type_mix, phase1_fallbacks and cant_swaps.
2. `check`: Tatoeba, Wiktionary and Lingua Libre to `content/checks/` and `content/review.md`. Generates the en_to_fr answers (workbook README). Downloads are cached in `.cache/`.
3. `build:content`: writes `src/content/`, bundled into the app, and copies recordings to `public/audio/`. The workbook's status is the gate, and the build fails if the checks disagree with it.

Dan's rulings go in `content/review-decisions.json`. Wiktionary sense choices go in `content/word-senses.json`.

Standing decisions:

- A unit can be live only with Dan's approval recorded in review-decisions.json under `units`.
- Non-Tatoeba sentences (source `tamago_original`) need a native-speaker check before testers in Phase 4. Until then the flag button is the safety net.
- `can_do` stays draft and is not shipped until Phase 2; it gets checked against the CEFR self-assessment grid before the progress page is built.
- The placement check is in Phase 2.

## App

- `src/lib/check.js`: answer checking. `src/lib/lesson.js`: mixes, lessons, re-asks, review. Both pure; `npm test` runs them against the real content.
- `src/lib/store.js`: IndexedDB, runtime_schema table names. Loaded once at startup, then written behind.
- `src/sw-template.js`: becomes `dist/sw.js` at build, precaching everything.

Choices the specs left open, easy to change:

- Lessons per round: enough to cover every live sentence (`lessonsInRound`), currently 6, 4, 4, 4, 4.
- Listen first (QT03, QT06 only): French hidden until the answer, unless the sentence has a new word.
- If the device has no French voice, the app treats it as Can't listen now.
- Match pairs (V0101) plays each French word on tap, at Dan's request. The workbook still lists audio on tap as V0102, testing.

## Answer checking

In addition to question-types.md section 7:

- The sentence's main French text is always an accepted answer, with or without rows in accepted_answers.
- Punctuation is ignored, including a space before ? and !.
- Typing another known word ("un" for "une") is a wrong word, not a typo. Words under 3 letters get no typo allowance.
- QT07 and QT11 accept only the sentence heard, not en_to_fr alternates. English contractions equal their long forms.

## Rules in every phase

- Speed between questions comes first. No loading spinners inside a lesson.
- No hearts, chests, gems, combo counters, interjections or celebration screens.
- No definitions or conjugations from model memory.
- Keep the data shape from the workbook; add columns, don't rename them.
