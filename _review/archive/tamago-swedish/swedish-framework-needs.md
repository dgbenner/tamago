# Swedish (sv) — framework needs for Builder 1

Builder 2 built the Swedish Part 1 content on branch `lang/swedish` (worktree `Sites/tamago-swedish`), content only. These are the app-code (shared) changes Builder 1 needs to make on main to wire Swedish in, mirroring Italian/Portuguese/Dutch. Builder 2 did **not** make these (content-only rule). The course stays `ready:false` in `src/lib/course.js` until Builder 1 wires it.

## Course identity (already decided, matches the stub in src/lib/course.js)
- id `sv`, name Swedish, lang `sv`, voice `['sv-SE','sv']`, db `tamago-sv`, flag `/flags/sv.webp`.
- Folders: `content-sv/`, `src/content-sv/`, `public/audio-sv/`. Workbook `_source/tamago-sv-data-v2.xlsx`.
- Tatoeba `swe`, Wiktionary `Swedish`, Lingua Libre `LL-Q9027 (swe)`.

## Pipeline (shared scripts) — DONE by Builder 2 on this branch (additive, course-scoped)
- `scripts/lib/course.mjs` — `sv` entry.
- `scripts/lib/tatoeba.mjs` — `sv: 'swe'` lang map.
- `scripts/lib/a1-plan.mjs` — `sv: PLAN4`.
- `scripts/a1-coverage.mjs` — `sv` THEMES block.
- `scripts/add-vocab-part1.mjs` — `sv` VOCAB_PART1 + lang name.
- `scripts/lib/conjugation.mjs` — `sv: swedish` returns null (Swedish present is one form for every person, so no per-person table; the grammar note carries the pattern).
- `scripts/lib/help-circles.mjs` — `sv` HELP block + `Swedish` section name.
- `scripts/audit/walk.mjs` — `['Swedish','content-sv','sv']`.
- `scripts/build-content.mjs` — additive gender override: `if (decisions.gender?.[w.word_id]) filled.gender = decisions.gender[w.word_id]`. **This is the one shared-code data override** (same one Dutch introduced). Needed because `genderFrom` in check-content parses fr/de/es/it/pt-noun but not `sv-noun`, so Swedish en/ett gender ships blank. Builder 2 imported en/ett from Wiktionary into `content-sv/review-decisions.json` `gender` (84 nouns). A cleaner long-term fix: teach `genderFrom` the `{{sv-noun|c|n}}` template (c→en, n→ett) and drop the override.
- `scripts/make-swedish-workbook.mjs` — the generator (new file, course-scoped).

## App wiring (shared) — NEEDED, not done
- `main.jsx` `tablesFor` + new `src/lib/tables-sv.js` (clone tables-pt.js).
- `vite.config.js` WORKBOOKS — add sv workbook.
- `src/screens/Developer.jsx` PARTS and Course Snapshot — add sv.
- `src/voice-lab.jsx` TABLES — add sv.
- `src/lib/lesson.js` ARTICLES — Swedish articles `['en','ett']` (indefinite); the definite is a suffix, not an article, so no definite article list.
- `src/lib/finalcheck.js` EXAMS — Swedish A1 exam. Candidate: **Swedex A1** (Folkuniversitetet / TISUS is C-level, not A1). Dan to confirm the exam body, format and official sample link. Until then the final check runs in the general format (as Italian/Portuguese did before their exams were added).
- `src/lib/converse.js` HELP_PHRASES + SCENES (3 scenes, keys are sv course words); `server/converse.mjs` LANG (Swedish).
- `src/lib/auth` COURSES + the accounts-spec SQL check.
- `src/admin/AdminApp.jsx` COURSE_NAMES.
- Tests that enumerate courses (choices-*, exams, etc.) — add sv where a per-course list is hard-coded. NOTE: `test/note-text.test.js` COURSES does NOT include content-sv (nor content-nl); Builder 2's grammar notes/points are bold-marked and validate clean against note-text.js, so sv can be added to that list safely if desired.
- `scripts/assign-icons.mjs` + `scripts/sushi-catalog.mjs` — Swedish icons (Builder 2 left `content-sv/unit-icons.json` unwritten; run `COURSE=sv node scripts/assign-icons.mjs` then import/build, or Builder 1 assigns during merge as for Italian/Portuguese).
- Audits: `scripts/audit/walk.mjs` done; `content-report`, `ui-audit` db, `merge` — add sv.
- `src/lib/course.js` — flip `ready:true` when wired (currently false).

## Not done (later, as other new courses deferred)
- Swedish pictures map in `scripts/image-list.mjs` (Builder 2 shipped `content-sv/images.json` with OpenMoji + empty words map; a `pictures.json`/`pictures-shared.json` can be added later).
- Swedish samples in `src/dev/a1-samples.js`.

## Notes / decisions for Dan
- A1 list: **Swedish Kelly list** (Kelly project, Språkbanken, CC BY 4.0), CEFR-graded, headwords only → `content-sv/a1-list.json` (1352 words; core = 600 most frequent corpus-ranked A1 words).
- du throughout; formal/archaic `ni` as polite address kept out of Part 1.
- en/ett gender + the definite suffix taught; present tense is one invariant `-r` form (no verb tables).
- Icons not yet assigned (see above).
