# Tamago

French learning app, installable web app, mobile first. React, Vite, Tailwind v4. Hosted on Cloudflare Pages (project tamago, https://tamago-83f.pages.dev), Git-connected: every push to main deploys. No backend except two Pages Functions, functions/api/explain.js and generate.js (handlers shared in server/; Claude explaining mistakes and Claude-written practice; both off until TAMAGO_ANTHROPIC_API_KEY is set as a Pages secret; never fall back to a generic ANTHROPIC_API_KEY). The service worker caches the page as / because Pages redirects /index.html. Netlify (tamago-590) is retired: builds stopped 2026-11-09, site kept at Dan's request, frozen at Phase 5; netlify/ and netlify.toml stay only as its record.

Specs are in `_source/`: tamago-feature-list.md (what), build-phases.md (order of work), question-types.md (question logic), tamago-data-v4.xlsx (all content; lesson_rules tab holds R01 to R16), learning-methods.md (why), tamago-phase0-decisions.xlsx (decision log).
The workbook is edited outside this repo and gets reissued. Never edit it here, and never write check results into it. A new version goes in `_source/` and becomes the default path in `scripts/import.mjs`.

## Working mode

From 2026-11-09 the build runs under `_source/autonomous-build.md`: phase by phase through build-phases.md, test, commit and push at each phase end, log to `_source/build-log.md`, and overwrite `_source/check-in.md` (Done, Decisions made, Waiting for Dan). Claude owns the workbook now: edit it in place, changelog row in README, bump the version each phase. Stop only for money or accounts, making it public, deleting Dan's files, and the native-speaker check.

## Courses (2026-11-10)

Two courses: French (content/, src/content/, public/audio/, workbook _source/tamago-data-vN) and Spanish, English to Latin American Spanish with ustedes and no vosotros (content-es/, src/content-es/, public/audio-es/, workbook _source/tamago-es-data-vN, made by scripts/make-spanish-workbook.mjs). Every content script takes `COURSE=es` (scripts/lib/course.mjs: folders, workbook, Tatoeba spa, Wiktionary Spanish, Lingua Libre LL-Q1321 (spa)); French is the default and builds as before. One engine, one data shape: the sentences' `french` column and the fr_to_en / en_to_fr directions mean the course language, and q.lang 'fr' is the engine's tag for it; only lang attributes, the device voice and visible text use the real language (src/lib/course.js, TL and course.name). The app loads one course's tables at startup (main.jsx, tables-fr.js or tables-es.js); each course has its own IndexedDB (French keeps 'tamago', Spanish 'tamago-es'); settings are shared (localStorage copy). First launch asks for a language on the opening screen; then the header flag and Settings' Language row switch, by reload, skipping the opening screen. German shows faintly and says Coming Soon. Only live units appear on the tree. Spanish follows its own order (15 units after the PCIC A1 inventory, with Where Things Are and Ser or Estar), the same framework. Spanish workflow per unit: `COURSE=es node scripts/pull-units.mjs --only U0N --redo U0N`, review into content-es/sweep/packs-review.json, `scripts/unit-words.mjs`, drafts via `scripts/add-drafts.mjs` (last resort), `scripts/approve-unit.mjs` (approval and grammar note), `COURSE=es node scripts/course-build.mjs` (import, check, drafts-found, build). Spanish topic packs sit at one node, U200 Your Topic, after Unit 15 (none reached 30 on Units 1 to 5). Spanish pull reviews (cuts and English picks) are in content-es/sweep/packs-review.json; drafts in content-es/drafts.json; names allowed in content-es/review-decisions.json `names`.

## Content pipeline

`npm run content` runs three steps (`npm run pull` proposes sentences for draft units; `content/drafts.json` holds drafted sentences; decisions also carry cut_sentences, vocabulary_additions, hints and borrow until the workbook absorbs them):

1. `import`: workbook to `content/raw/`. Fails on broken IDs. Also validates sentence_words, pairs, round_type_mix, phase1_fallbacks and cant_swaps.
2. `check`: Tatoeba, Wiktionary and Lingua Libre to `content/checks/` and `content/review.md`. Generates the en_to_fr answers (workbook README). Downloads are cached in `.cache/`.
3. `build:content`: writes `src/content/`, bundled into the app, and copies recordings to `public/audio/`. The workbook's status is the gate, and the build fails if the checks disagree with it.

Content sweep (2026-11-10): `scripts/sweep-originals.mjs` and `scripts/sweep-answers.mjs` propose checked Tatoeba replacements for originals and extra linked English answers into content/sweep/; Claude reviews them (originals-review.json, answers-review.json) and `scripts/apply-sweep.mjs` folds them into the next workbook. Word recordings: the check finds Lingua Libre files through Wikidata lexemes, then Commons searches (plain, then a title pattern), skipping heterophones (est, fils, as, plus, tous…) and elided forms; recordings ship as levelled mono AAC (.m4a) in public/audio, named by sentence or word id. `scripts/pack-feasibility.mjs` counts candidates for new topic packs (content/sweep/pack-words.json).

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
- Topic packs (is_topic_pick yes) sit behind the Your topic node (U100, is_topic_pick node); one is chosen at a time (kv topic_choice), each keeps its progress, and none draws on another. Packs stay out of placement, checkpoints and scores until chosen or started. A second node, U200 Another Topic (row 9, after Unit 13), holds the packs with topic_node U200, built on all of A1 from checked Tatoeba only (Office U201, Doctor U202, and Weather U101, rebuilt there 2026-11-10); each node keeps its own choice (kv topic_choice, topic_choice_U200). Pull review for these packs: content/sweep/packs-review.json (reject, english, rebuild). Words with status off (pluie, temps) don't ship. QT09 in a unit without question pairs takes the phase1_fallbacks rows marked "no question pairs".
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

- Yellow is the primary colour: Start or Resume on home and Check in a lesson (and the sushi artwork). Green and orange fills are for things you can act on: green for Continue and progress, orange for selected items. Points are hidden everywhere (Dan, 2026-11-10): still earned and stored in the points table, never shown; `showPoints` in App.jsx is false, and the Points and Streaks setting (label now Streaks) covers only the streak and weekly goal. The points chip (blue #1f6dfb) stays in Home.jsx unused.
- Indicators and tags stay muted, like a Bootstrap secondary badge: never bold, never a colour fill. The new-word tag just says "New"; a new word gets a small orange dot to its right.
- Line weights: 2px where there used to be hairlines; 4px for buttons, choices, chips, the path box and its circles (Dan, 2026-11-09).
- Match pairs: only the word is centred; the speaker hangs to its left and the new-word dot to its right.
- Home (Dan's test notes, 2026-11-09, `_source/test-notes.md`): a short pinned header with a line under it (the wordmark and gear; the points chip that sat left is hidden since 2026-11-10), a sideways strip of tool tiles (Glossary, Verbs, Self-Study), the level in italics with Progress as a tertiary button, then the tree; a pinned footer with a line above: Practice (mistakes first, then weakest; "Practice · N Mistakes") and Next Lesson: <unit title>. Tree nodes: a ring of five round segments, the sushi inside (a lock while locked, "?" for Your Topic until chosen), the title only; the unit number appears only in the unit details. Checkpoints are small, with a checkered flag, and have Start and Skip on their sheet. "Starting Out" until round 1 of a first unit; then level markers across the tree where the units above reach the next band.
- Wide screens (1024px and up: desktop, iPad in landscape; phones never reach it): logo with sushi left, gear right; the path left and a right-hand panel listing the tools with a line each (Glossary, Verbs, Self-Study, Progress), which open inside the panel; unit and checkpoint details as centred pop-ups; bottom buttons side by side; bigger lesson items; Settings in two columns. iPad held upright shows "Turn your iPad sideways" (touch, portrait, 744px and wider).
- Glossary (src/screens/Glossary.jsx, was Words): every A1 word, opening on the learner's own; each Learned, Missed (kv word_misses: a word left out of a French answer, or a wrong match pair or picture, not on first sight; cleared by a later right answer; test skips and placement record nothing), Fading (met, recall under 0.8) or Not Yet; Show All A1 Words adds the rest; search and status filters. A2 joins when its content exists.
- Labels and buttons are Title Case. Unit titles are 2 or 3 words (workbook v17).
- Phone and wide screens: root font 17px (everything in rem scales). Recordings are levelled to -16 LUFS at build (scripts/lib/loudness.mjs).
- The opening screen (draws on with one eased curve per letter, holds about 2.4 seconds, fades fast while the header logo rises into place) is a deliberate exception to the feature list's "no loading screens" (Dan, 2026-11-07). It stays out of lessons. The green may be adjusted later.

## Accessibility (WCAG 2.2 AA, Pass 4)

- Keyboard: every question type works with Tab and Enter. Enter checks (any button marked `data-check`), except on a choice or chip not yet picked, where it picks; after an answer, focus is on Continue and Enter continues. Focus follows picked chips and matched pairs (`focusNeighbour`). Each new question focuses its heading (typed questions focus the field). Sheets are modal dialogs (focus inside, Tab trapped, Escape, focus returned). Each screen sets its title and focuses its heading.
- Focus ring: `:focus-visible` 3px `--focus` (ink in light since 2026-11-10, light blue in dark); none on headings that receive programmatic focus. `#root` has scroll padding so focus isn't hidden under the bars; at 520px or less of height the bars unpin.
- Contrast tokens were nudged only as far as AA needs: `--orange` #d3460f (white text), light `--muted` #645e53, points chip #1f6dfb, and `--field` (light #979287, dark #6a6660) for text-field and menu edges (3:1). Don't dim text with opacity.
- Names: audio buttons say what they play; picture choices carry the word's English meaning (`alt`); match pairs and audio choices expose aria-pressed and announce results.
- Reduced motion: every animation and press transition is off; the opening screen shows the letters already drawn.
- Tests (scratchpad, wiped between sessions): axe over every screen and question type in light and dark, a keyboard-only run, 200% zoom and 320px reflow, reduced motion. The dev-only `window.__tamago.lesson(unit, round)` hook (on with `VITE_TEST_HOOK=1` builds, never in the live build) opens any round.
- Developer area (src/screens/Developer.jsx, 2026-11-10; replaced Developer Notes in Settings): a quiet dashed "Developer" item last in the tools strip and the desktop panel (setting `developer`, default on; turn off before testers, with Testing shortcuts), and always at the hidden address `#developer`. One page: Testing (Testing shortcuts, Show Developer in Tools, Variant Test Bank, Flag Review, Native-Speaker Check, Forum), then large accordions: Course Snapshot (exact numbers from the shipped content, build time and workbook version via vite `define`), Model Story (_source/model-story.md), Craft Rubric, Latest Grades, Test Notes, Feature List, Question Types, Build Phases, Autonomous Brief, Check-In. Picture Check (2026-11-10): Dan's pictures in _source/pictures/incoming-<date>/ matched to image-list.md rows in _source/pictures/picture-check.json; `node scripts/picture-check.mjs` writes public/picture-check/*.webp (kept out of the offline cache) and src/dev/picture-check.json; not used in lessons until Dan approves. Documents render at build time from an explicit file list (src/lib/devnotes.js); `src/lib/redact.js` blanks key-shaped text and test/devnotes.test.js fails if a shown document holds any.

## Testing

With the Testing shortcuts setting on (on the Developer page; default on while Dan is the only user; turn the default off before Phase 4 testers), the right arrow, or a quick swipe left that starts on the right half of a touch screen, marks a question correct and moves on; with an answer on screen it acts as Continue. Attempts made this way carry `test_skip: true`. Real progress on that browser moves with it.

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
