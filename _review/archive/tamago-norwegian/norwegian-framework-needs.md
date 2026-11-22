# Norwegian (Bokmål) — framework needs for Builder 1

Builder 2, branch `lang/norwegian`, 2026-11-19. Content only. This lists the shared app wiring I did **not** do (content build is complete and self-contained under `content-no/` and `src/content-no/`), and the shared **pipeline-script** changes I did make (flagged for your awareness; all additive and course-scoped).

## App wiring not done (Builder 1)

Wire Norwegian the way Italian/Portuguese/Dutch were wired. `course.id` is `no`, `lang` is `nb`, db `tamago-no`, folders `content-no/`, `src/content-no/`, `public/audio-no/`.

- `src/lib/course.js` — stub already present (`id:'no'`, `ready:false`). Flip `ready:true` when wired.
- `main.jsx` `tablesFor` + new `src/lib/tables-no.js` (import the `src/content-no/*` tables).
- `vite.config.js` `WORKBOOKS` (add `no` → `_source/tamago-no-data-v2.xlsx`) for the Course Snapshot define.
- `src/screens/Developer.jsx` `PARTS` and Course Snapshot; `src/dev/a1-samples.js` (optional, later).
- `src/voice-lab.jsx` `TABLES`.
- `src/lib/lesson.js` `ARTICLES` (Norwegian indefinite articles `en`, `ei`, `et` — so Type the Word accepts a noun with or without its article).
- `src/lib/finalcheck.js` `EXAMS.no` and `FORMATS.no`. Norway has no single standalone A1 certificate like DELF/DELE; the standard is **Norskprøven** (Kompetanse Norge / HK-dir), a multi-level test whose lowest band reports A1. Suggest EXAMS.no = Norskprøven with its official page; **Dan to confirm** the exam and sample-paper link. Until then the final check runs in the general format (as Italian/Portuguese do).
- `src/lib/converse.js` `HELP_PHRASES` and `SCENES` (keys are course words); `server/converse.mjs` `LANG` (Norwegian Bokmål).
- `src/lib/auth` `COURSES` and the accounts-spec SQL check.
- `src/admin/AdminApp.jsx` `COURSE_NAMES`.
- Tests that enumerate courses; `scripts/sushi-catalog.mjs`; the audit db/report lists (`content-report`, `ui-audit`, `merge`) — I added Norwegian only to `scripts/audit/walk.mjs`.
- `scripts/image-list.mjs` — no Norwegian picture map; `content-no/images.json` ships an empty `words` map (no OpenMoji assigned yet). Pictures optional/later, as Portuguese.

## Shared pipeline-script changes I made (flagged)

All additive, needed to build a new language, and consistent with how es/de/it/pt/nl were added. None change the five merged courses' shipped content (check-content is not re-run in their tests).

1. `scripts/lib/course.mjs`, `scripts/lib/tatoeba.mjs` (`no`→`nob`), `scripts/lib/a1-plan.mjs` (`no`→PLAN4), `scripts/a1-coverage.mjs` (`no` THEMES), `scripts/lib/help-circles.mjs` (`no` HELP), `scripts/add-vocab-part1.mjs` (`no` VOCAB_PART1 + lang map), `scripts/audit/walk.mjs` (added `['Norwegian','content-no','no']`): the standard per-course registry entries.
2. `scripts/lib/conjugation.mjs`: added `norwegian()` returning `null`. Bokmål present tense is one form for every person (jeg er, du er, han er), so a per-person table teaches nothing; the grammar note carries the one-form rule. `null` is the same "no table" outcome the other courses already handle.
3. `scripts/build-content.mjs`: additive gender override — `if (decisions.gender?.[w.word_id]) filled.gender = decisions.gender[w.word_id]` (identical to the Dutch build). Only used if `content-no/review-decisions.json` carries `gender`.
4. **`scripts/check-content.mjs` — the one non-trivial change.** Bokmål Wiktionary entries write the gloss as an English *link template* (`# {{l-lite|en|fine}}`) and inflected forms as `{{inflection of|nb|spise||pres}}`, `{{alternative spelling of|nb|en|t=one}}`, `{{comparative of|nb|sakte}}`; the existing cleanup stripped these to nothing, leaving the word with no entry (`no_french_entry`). I extended the wikitext def-cleanup to expand them to text (so the gloss and the "of LEMMA" survive for the existing form-of detector), and added `Phrase` and `Particle` to the POS-heading list. French/Spanish/etc. use plain-text definitions, so this only adds information for them and never removes any; and check-content is not run by the test tiers, so it cannot affect their shipped content. **Builder 1: please keep this when merging — Swedish and Danish will need the same (the other builders likely flagged it too).**

## Notes
- Grammar notes and overview lines follow the target-language-bold rule (`content-no/grammar_notes.json`, `content-no/grammar-points.json`); `test/note-text.test.js` currently checks only the five merged courses, so add `content-no` to its `COURSES` list when you merge if you want it guarded.
- Gender (en/ei/et) for the Glossary: see the build report / `review-decisions.json` `gender`.
