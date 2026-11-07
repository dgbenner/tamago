# Tamago

French learning app, installable web app, mobile first. React, Vite, Tailwind v4. Hosting on Netlify (not set up yet).

Specs are in `_source/`: build-phases.md (order of work), question-types.md (question logic), tamago-data.xlsx (all content).
The workbook is edited outside this repo and gets reissued. Never edit it here, and never write check results into it.

## Content pipeline

`npm run content` runs three steps:

1. `import`: workbook to `content/raw/`. Fails on broken IDs. Also validates sentence_words, pairs and round_type_mix.
2. `check`: Tatoeba, Wiktionary and Lingua Libre to `content/checks/` and `content/review.md`. Downloads are cached in `.cache/`.
3. `build:content`: writes `public/content/`, the only content the app loads. Sentences and answers ship only with status "checked".

Dan's rulings go in `content/review-decisions.json`. Wiktionary sense choices go in `content/word-senses.json`.

## Rules in every phase

- Speed between questions comes first. No loading spinners inside a lesson.
- No hearts, chests, gems, combo counters, interjections or celebration screens.
- No definitions or conjugations from model memory.
- Keep the data shape from the workbook; add columns, don't rename them.
