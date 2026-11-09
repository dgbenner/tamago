# Tamago

French learning app, installable web app, mobile first. React, Vite, Tailwind v4. No backend except two Netlify Functions (explain.mjs for Claude explaining mistakes, generate.mjs for Claude-written practice; both off until TAMAGO_ANTHROPIC_API_KEY is set in Netlify; never fall back to a generic ANTHROPIC_API_KEY, which Dan's Netlify account already holds for something else). Deploys are PAUSED (Dan, 2026-11-09): netlify.toml has ignore = "exit 0", so pushes reach GitHub only. Remove it only when Dan says; hosting moves to Cloudflare later.

Specs are in `_source/`: tamago-feature-list.md (what), build-phases.md (order of work), question-types.md (question logic), tamago-data-v4.xlsx (all content; lesson_rules tab holds R01 to R16), learning-methods.md (why), tamago-phase0-decisions.xlsx (decision log).
The workbook is edited outside this repo and gets reissued. Never edit it here, and never write check results into it. A new version goes in `_source/` and becomes the default path in `scripts/import.mjs`.

## Working mode

From 2026-11-09 the build runs under `_source/autonomous-build.md`: phase by phase through build-phases.md, test, commit and push at each phase end, log to `_source/build-log.md`, and overwrite `_source/check-in.md` (Done, Decisions made, Waiting for Dan). Claude owns the workbook now: edit it in place, changelog row in README, bump the version each phase. Stop only for money or accounts, making it public, deleting Dan's files, and the native-speaker check.

## Content pipeline

`npm run content` runs three steps (`npm run pull` proposes sentences for draft units; `content/drafts.json` holds drafted sentences; decisions also carry cut_sentences, vocabulary_additions, hints and borrow until the workbook absorbs them):

1. `import`: workbook to `content/raw/`. Fails on broken IDs. Also validates sentence_words, pairs, round_type_mix, phase1_fallbacks and cant_swaps.
2. `check`: Tatoeba, Wiktionary and Lingua Libre to `content/checks/` and `content/review.md`. Generates the en_to_fr answers (workbook README). Downloads are cached in `.cache/`.
3. `build:content`: writes `src/content/`, bundled into the app, and copies recordings to `public/audio/`. The workbook's status is the gate, and the build fails if the checks disagree with it.

Dan's rulings go in `content/review-decisions.json` (also accepted_additions, from `node scripts/import-flags.mjs <file>`). The native-speaker check comes back as a file: `node scripts/import-native-check.mjs <file>` writes content/native-check.json and public/audio-native/ (m4a via ffmpeg, only with the checker's CC BY-SA consent); a fix to a workbook row holds that sentence back until the workbook has it. Wiktionary sense choices go in `content/word-senses.json`.

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

- A unit's lessons count only its own words as new (R01); words of earlier units are always allowed (Phase 3, after placement and topic packs exposed the old reading).
- Topic packs (is_topic_pick yes) sit behind the Your topic node (U100, is_topic_pick node); one is chosen at a time (kv topic_choice), each keeps its progress, and none draws on another. Packs stay out of placement, checkpoints and scores until chosen or started. QT09 in a unit without question pairs takes the phase1_fallbacks rows marked "no question pairs".
- Claude's hints go in decisions.claude_hints with their source; Dan's stay in decisions.hints.
- Make your own (Phase 5): Claude-written French is re-split with scripts/lib/french.mjs against the learner's met words and dropped if any word is outside them; generated sessions (kind generated) stay out of FSRS, the review bank and the skill tally.
- Unit icons: Dan's sushi art in _source/icons, by difficulty over the 13 A1 units (scripts/assign-icons.mjs, picks kept in content/unit-icons.json). Main units never draw on topic-pack words (pull-units opened set).
- Lessons per round: enough to cover every live sentence (`lessonsInRound`), currently see `lessonsInRound`. A round can run past its count only if a sentence or word hasn't appeared yet.
- New words arrive in the order the workbook's sentences first use them. Early lessons have few usable sentences, so one may appear twice, in different types.
- First sight on match pairs: tapping a new word shows its meaning below the grid. Other types show it under the sentence.
- Variants come from the variants tab by use_in_rounds (R17); only QT01 picks by words available (R01). V0903 answers by chips in rounds 3 and 4 and typed in round 5, since round 5 is keyboard only.
- QT09 shows and builds the fullest listed answer; any listed answer is accepted.
- Feedback lines (R18): French lines ship only when Tatoeba links them to the listed English. The rate is a fixed 0.1 per answer (`FRENCH_RATE`), standing in for "about 1 per lesson".
- Phase 1 builds QT09; QT10 and QT13 still use phase1_fallbacks.
- Listen first (QT03, QT06 only): French hidden until the answer, unless the sentence has a new word.
- If the device has no French voice, the app treats it as Can't listen now.
- Match pairs plays each French word on tap in both V0101 and V0102, at Dan's request.

## Look

- Yellow is the primary colour: Start or Resume on home and Check in a lesson (and the sushi artwork). Green and orange fills are for things you can act on: green for Continue and progress, orange for selected items. The points chip on home is electric blue (#1f6fff), at Dan's request.
- Indicators and tags stay muted, like a Bootstrap secondary badge: never bold, never a colour fill. The new-word tag just says "New"; a new word gets a small orange dot to its right.
- Line weights: 2px where there used to be hairlines; 4px for buttons, choices, chips, the path box and its circles (Dan, 2026-11-09).
- Match pairs: only the word is centred; the speaker hangs to its left and the new-word dot to its right.
- Home: points chip in the top left corner, gear top right, the wordmark alone centred between them (103px wide, no sushi, one heavy yellow line (accent, stroke 15), no outline; the opening screen keeps all three lines); the learning path placeholder in the middle (Dan will spec it), Review and Start or Resume pinned to the bottom. Settings and About keep the centred logo.
- The opening screen (draws on, then holds 2 seconds) is a deliberate exception to the feature list's "no loading screens" (Dan, 2026-11-07). It stays out of lessons. The green may be adjusted later.

## Testing

With the Testing shortcuts setting on (default on while Dan is the only user; turn the default off before Phase 4 testers), the right arrow, or a quick swipe left that starts on the right half of a touch screen, marks a question correct and moves on; with an answer on screen it acts as Continue. Attempts made this way carry `test_skip: true`. Real progress on that browser moves with it.

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
