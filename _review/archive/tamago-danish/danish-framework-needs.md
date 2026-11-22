# Danish (da) — framework needs for Builder 1

Builder 2 built the Danish Part 1 content on branch `lang/danish` (worktree `Sites/tamago-danish`), content only. The course is **not navigable in the app yet**: it needs the same app wiring the other languages got (Italian/Portuguese/Dutch). Everything below is app code Builder 2 did **not** touch.

## App wiring to add (mirror Italian/Portuguese/Dutch)
- `src/lib/course.js`: the `da` entry already exists as a stub (`ready: false`, "Coming Soon"). Flip to `ready: true` when wiring lands.
- `src/lib/tables-da.js` (new) + `main.jsx` `tablesFor` (load the da tables at startup); IndexedDB `tamago-da` is already named in the stub.
- `vite.config.js` `WORKBOOKS` — add da → `_source/tamago-da-data-v2.xlsx`.
- `src/screens/Developer.jsx` `PARTS` and Course Snapshot — add da (Part 1 only).
- `src/voice-lab.jsx` `TABLES` — add da.
- `src/lib/lesson.js` `ARTICLES` — Danish articles `en`/`et` (so Type the Word / Match Pairs accept a noun with or without its article, like `le`/`la` for French).
- `src/lib/converse.js` `HELP_PHRASES` and `SCENES` (keys are da course words) + `server/converse.mjs` `LANG`.
- `src/lib/finalcheck.js` `EXAMS` + `FORMATS` — Danish A1 exam. **Needs Dan:** Denmark's state exams (Prøve i Dansk 1/2/3, Danskuddannelse) are not CEFR-A1 single exams; there is no obvious A1 certificate like DELF/DELE. Leave the general final-check format until Dan picks an exam, or omit.
- `src/lib/auth` COURSES + the accounts-spec SQL check; `src/admin/AdminApp.jsx` `COURSE_NAMES`.
- `scripts/assign-icons.mjs` and `scripts/sushi-catalog.mjs` — add da (sushi icons for the 21 circles).
- Tests that enumerate courses (choices-da sweep file, etc.) per the tiered-test setup.
- `src/dev/a1-samples.js` and a Danish pictures map in `scripts/image-list.mjs` — later (optional, as for Italian/Portuguese).

## Content-pipeline files Builder 2 DID change (all additive, da-scoped)
- `scripts/lib/course.mjs` (da registry entry), `scripts/lib/tatoeba.mjs` (da→dan), `scripts/lib/a1-plan.mjs` (da: PLAN4), `scripts/a1-coverage.mjs` (da THEMES), `scripts/lib/help-circles.mjs` (da HELP), `scripts/add-vocab-part1.mjs` (da VOCAB + lang map), `scripts/audit/walk.mjs` (Danish row), `scripts/make-danish-workbook.mjs` (new generator).
- `scripts/build-content.mjs` — **the only generic shared edit**: an additive 2-line block that applies `decisions.gender[word_id]` when present (same block the Dutch build added; fires only for courses that ship a `review-decisions.gender`). Danish needs it because `genderFrom` has no `da-noun` case, so Danish noun gender (en/et) ships blank otherwise.
- `scripts/lib/conjugation.mjs` — `presentIndicative.da` returns `null`. **Danish present tense is one form for every person** (jeg er, du er, han er; jeg taler, vi taler), so the course teaches no per-person verb table and no grammar note sets a `conjugation_lemma`. The "Conjugations from Wiktionary: … MISSING" lines in the check are expected and harmless. If Builder 1 wants verb tables later, add a da reader, but there is little to show.

## Danish content decisions (for the record / Fable)
- **Modern du throughout.** The formal **De/Dem/Deres** is archaic and kept out of Part 1; Tatoeba lines using formal `De` for "you" were cut (S6014, S6025).
- **"I" (you-plural) kept out of Part 1** (du only). It also folds to `i` (= in) in the analyser, so Tatoeba lines using capital `I` for "you (plural)" were cut (15 lines in U08/U11/U12/U14). `i dag`/`i morgen` (today/tomorrow) are unaffected (multi-word forms).
- **Gender** imported from Wiktionary's `da-noun` first param (en/et) into `review-decisions.gender`; plural-form nouns left blank (Danish uses `de` for all definite plurals), as Dutch did.
- **Definite is a suffix** (manden, huset) — taught in the notes, never as separate vocab; drafts avoid definite and inflected-adjective forms since the analyser matches exact listed forms only.
- Grammar notes and overviews follow the **target-language-bold** convention (`content-da/grammar_notes.json`, `content-da/grammar-points.json`), validated against `src/lib/note-text.js` `noteProblems`.
- A1 list is a **frequency stand-in** (hermitdave FrequencyWords, OpenSubtitles 2018, CC BY-SA 4.0) in `content-da/a1-list.json` — Danish has no free CEFR A1 inventory, same choice as Dutch. Credit it on About the Content when wiring.
