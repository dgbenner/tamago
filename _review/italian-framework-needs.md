# Italian: framework needs

Branch `lang/italian`, 2026-11-14. Italian content is built and audited on this branch, but the app does not offer
Italian yet: every item below is a change to shared code, so none of them is made here. They are listed for the
main builder. All are one-line additions to a per-course list unless marked otherwise.

## 1. App registration (needed before Italian can be opened at all)

| File | What to add |
| --- | --- |
| `src/lib/course.js` `COURSES` | Italian is listed with `ready: false` (see the note under this table). Change it to `ready: true` once the two rows below are in |
| `src/main.jsx` `tablesFor` | `it: () => import('./lib/tables-it.js')` |
| `src/lib/tables-it.js` (new file) | A copy of `tables-de.js` reading `../content-it/` |
| `vite.config.js` `WORKBOOKS` | `it: COURSE_FILE.match(/tamago-it-data-(v\d+)\.xlsx/)?.[1] ?? ''` |
| `src/screens/Developer.jsx` | `partsIt` import and `PARTS.it`; an Italian column in Course Snapshot (tables, lesson log `tamago-it`, workbook version) |

Flags (Dan, 2026-11-14): Dan sent glossy flag badges for Italian, Brazilian Portuguese and Dutch during this work,
for the first-launch row and the language pop-up. On this branch: the originals are in `_source/flags/` (they came
with a checkerboard baked in instead of transparency, so a cut-out copy sits beside each), the app-size copies are
`public/flags/it.webp`, `pt.webp` and `nl.webp` (192 px, the disc sized like the other three), and `COURSES` in
`src/lib/course.js` lists the three as `ready: false`, so they show faintly as Coming Soon. That one edit to
`course.js` is the only change to app code on this branch. Portuguese and Dutch have no course yet.

## 2. Per-course lists inside the engine

| File | What to add | Without it |
| --- | --- | --- |
| `src/lib/lesson.js` `ARTICLES` | `it: ['il', 'lo', 'la', "l'", 'i', 'gli', 'le', 'un', 'uno', 'una', "un'"]` | Type the Word refuses an Italian noun typed with its article |
| `src/lib/finalcheck.js` `EXAMS` | An Italian A1 exam entry. Suggested: CELI Impatto (A1), Università per Stranieri di Perugia (the Profilo's own centre). Dan to confirm the exam and its sample-paper link | `EXAMS[course.id]` is undefined for Italian |
| `src/lib/converse.js` `HELP_PHRASES`, `SCENES` | Italian help phrases (Non capisco. / Più lentamente, per favore. / Ripeta, per favore. / Cosa significa? / Come si dice…? / Cerco la parola…) and the three scenes with Italian key words (caffè, tè, acqua, latte, per favore, grazie; ciao, casa, famiglia, bambini, cane; dove, parco, scuola, ristorante, città) | Conversations has no Italian phrases or scenes |
| `server/converse.mjs` `LANG` | `it: 'standard Italian as spoken in Italy (tu with friends, Lei with strangers)'` | The partner has no language instruction |
| `src/lib/auth/mock.js`, `src/lib/auth/supabase.js` `COURSES` | `'it'` | Italian progress does not sync to an account (check the Supabase table for a course constraint first) |
| `src/admin/AdminApp.jsx` `COURSE_NAMES` | `it: 'Italian'` | The console shows "it" |
| `src/dev/a1-samples.js` | Italian samples for QT14 to QT17 (only needed for Try the A1 Task Types; Part 1 uses none of them) | |
| `src/lib/by-ear.js` | Nothing needed now: no Italian line repeats a word (checked on this branch). A later line that does must be decided there | |
| `src/voice-lab.jsx` | Italian device voices and Lingua Libre speakers, if the Voice Lab lists courses by hand | Speaker pictures fall back to "untagged" |

## 3. Tests and audits that list courses by hand

| File | What to add |
| --- | --- |
| `test/choices.test.js`, `test/by-ear.test.js`, `test/icons.test.js`, `test/converse.test.js` | `['it', 'src/content-it']` (or the file's own form of it) |
| `scripts/audit/walk.mjs` `COURSES` | `['Italian', 'content-it', 'it']` |
| `scripts/audit/ui-audit.mjs` | `it: 'tamago-it'` in the database map |
| `scripts/audit/merge.mjs` | `'Italian'` in the course list |
| `scripts/assign-icons.mjs` `RANK` | `['it', 'content-it']` (without it Italian still gets icons, but German's are not counted as "earlier") |
| `scripts/sushi-catalog.mjs`, `scripts/content-report.mjs` | `['Italian', 'content-it']` / `['Italian', 'src/content-it']` |
| `scripts/image-list.mjs` | An Italian map onto the shared picture rows, as German has (`content-it/pictures.json`); until then Italian words have no pictures |

The two audits were run on this branch against Italian from temporary copies of the audit scripts with the Italian
entry added; the copies are not committed.

## 4. Content pipeline registrations already made on this branch

The content scripts cannot run for a course that is not registered, so these additions were made. Each adds an
Italian entry and changes nothing for French, Spanish or German.

- `scripts/lib/course.mjs`: the `it` course (workbook `_source/tamago-it-data-vN.xlsx`, Tatoeba `ita`, Wiktionary
  Italian, Lingua Libre `LL-Q652 (ita)`).
- `scripts/lib/tatoeba.mjs`: `it: 'ita'`.
- `scripts/lib/help-circles.mjs`: the Italian help circles' words; `Italian` in the Wiktionary section map.
- `scripts/lib/a1-plan.mjs`: `PARTS.it` (four parts, as Spanish and German).
- `scripts/add-vocab-part1.mjs`: the Italian vocabulary circles.
- `scripts/part-summaries.mjs`, `scripts/retitle-units.mjs`: Italian entries.
- `scripts/lib/conjugation.mjs`: an Italian reader for Wiktionary's `{{it-conj}}` table. The table prints stress
  marks that are not spelling (hò, màngio), so the forms are read from the table's links.
- `scripts/check-content.mjs`: `it-noun` joins the headword patterns that give a noun's gender.
- New file: `scripts/make-italian-workbook.mjs`.

## 5. The official A1 list is not loaded

The Profilo della lingua italiana (Spinelli and Parizzi, La Nuova Italia, 2010) keeps its A1 inventories and word
lists on the book's CD-ROM. The Perugia site for it, https://www.unistrapg.it/profilo_lingua_italiana/site/index.html,
has the presentation and learner samples only, not the inventories, and no other copy was found online. Nothing was
stored in its place: `content-it/a1-list.json` does not exist, and coverage against the Profilo cannot be reported
until Dan has the book (about 35 euros). Once the A1 list is in hand it goes in `content-it/a1-list.json` in the same
shape as the other three, and `COURSE=it node scripts/a1-coverage.mjs` reports coverage. `scripts/a1-coverage.mjs`
also needs an Italian `THEMES` entry (numbers, prices, times, days, months, dates) before it will run.
