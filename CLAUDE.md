# Tamago

French learning app, installable web app, mobile first. React, Vite, Tailwind v4. Hosting on Netlify (not set up yet).

Specs are in `_source/`: build-phases.md (order of work), question-types.md (question logic), tamago-data.xlsx (all content).
The workbook is edited outside this repo and gets reissued. Never edit it here, and never write check results into it.

## Content pipeline

`npm run content` runs three steps:

1. `import`: workbook to `content/raw/`. Fails on broken IDs. Also validates sentence_words, pairs and round_type_mix.
2. `check`: Tatoeba, Wiktionary and Lingua Libre to `content/checks/` and `content/review.md`. Downloads are cached in `.cache/`.
3. `build:content`: writes `public/content/`, the only content the app loads. Sentences ship only as `checked` or `dan_reviewed`, answers only as `checked`.

Dan's rulings go in `content/review-decisions.json`. Wiktionary sense choices go in `content/word-senses.json`. Rows added outside the workbook go in `content/additions.json`, for the workbook owner to absorb.

Standing decisions:

- U01 goes live only after Dan's approval, recorded in review-decisions.json under `units`. The app shows only units with status `live`.
- Sentences with source `tamago_original` need a native-speaker check before Phase 4.
- `can_do` stays draft and is not shipped; not needed in Phase 1.

## Answer checking (for Phase 1)

In addition to question-types.md section 7:

- The sentence's main French text is always an accepted answer, with or without rows in accepted_answers.
- Ignore a space before ? and !, so "Tu es Paul?" and "Tu es Paul ?" are the same.

## Rules in every phase

- Speed between questions comes first. No loading spinners inside a lesson.
- No hearts, chests, gems, combo counters, interjections or celebration screens.
- No definitions or conjugations from model memory.
- Keep the data shape from the workbook; add columns, don't rename them.
