# Dutch (nl) — framework / app wiring needed to make the course playable

Builder 2 built **content only** on branch `lang/dutch` (this worktree). The content pipeline
scripts were extended for `nl` (course.mjs, tatoeba.mjs, conjugation.mjs, a1-plan.mjs,
a1-coverage.mjs, help-circles.mjs, add-vocab-part1.mjs, make-dutch-workbook.mjs) because those
generate the content. **No runtime app file under `src/` or `server/` was changed** (git is clean
there). The list below is what the main builder needs to wire up to make Dutch actually navigable
and testable. None of it is done on this branch.

Mirror what Portuguese (`pt`) already does in each spot.

## Required for the course to load and play
1. **`src/lib/tables-nl.js`** — CREATE, mirroring `src/lib/tables-pt.js`. Maps the built
   `content-nl` tables into the shape the app consumes.
2. **`src/main.jsx:14`** — add `nl: () => import('./lib/tables-nl.js')` to `tablesFor`.
3. **`src/lib/course.js:14`** — the `nl` entry already exists but is `ready: false` ("Coming
   Soon", flag added 2026-11-14). Flip to `ready: true` when launching. Consider `devOnly: true`
   first (as Italian/Portuguese were until Dan approved them public on 2026-11-16).

## Conversation practice (Private Booth / converse)
4. **`src/lib/converse.js`** — add `nl` to:
   - `HELP_PHRASES` (near line 35+): the in-conversation help lines, in Dutch.
   - `SCENES` (near line 80+ and 140): the scene openers, in Dutch.
   - `KEYS` (near line 167): the food / way / intro / shop / plan keyword sets, in Dutch, e.g.
     `nl: { food: ['eten','brood','water','koffie','rekening','ik wil'], way: ['waar','straat','links','rechts','ver','station'], intro: ['heet','naam','woon','jaar','werk','hoi'], shop: ['hoeveel','euro','kopen','prijs','kost','ik wil'], plan: ['morgen','zaterdag','film','hoe laat','samen','vrij'] }`
     (suggested — confirm against the Dutch word list).
5. **`server/converse.mjs:14`** — add to `LANG`:
   `nl: 'standard Dutch as spoken in the Netherlands (je informally, u with strangers)'`.

## Mock exam / final check
6. **`src/lib/finalcheck.js`** — add `nl` to `EXAMS` (line 8+). The A1 Dutch options to pick from:
   **CNaVT – PTIT** (Profiel Toeristische en Informele Taalvaardigheid, ~A2 but the entry
   profile), or the **Inburgering** exam (A1 reading/listening). There is no single CEFR-A1 exam as
   clean as DELF/Goethe; the main builder should choose and word it. Add `FORMATS.nl` (line 47+,
   like `FORMATS.it` at 74) **only if** Dutch wants a language-specific mock-exam round; otherwise
   the default `PARTS` format is fine.

## Admin / accounts / developer
7. **`src/admin/AdminApp.jsx:15`** — add `nl: 'Dutch'` to `COURSE_NAMES`.
8. **`src/lib/auth/mock.js:30`** and **`src/lib/auth/supabase.js`** — add `'nl'` to the `COURSES`
   array. The course DB name is `tamago-nl` (already set in `src/lib/course.js`).
9. **`src/screens/Developer.jsx`** — add Dutch to the Course Snapshot:
   - `import partsNl from '../content-nl/parts.json'` (line ~15),
   - `nl: partsNl` in `PARTS` (line 134),
   - a Dutch column in the snapshot build + header + rows (lines 55–68) and the workbook line (62).
10. **`src/lib/check.js`** and **`src/lib/instructions.js`** — one `pt` reference each; check whether
    a Dutch branch/string is needed and add if so (likely a course-name or voice string).

## Test / audit tooling (optional, to cover Dutch in CI)
- `scripts/test-fast.mjs` auto-discovers changed courses from git, so Dutch is swept automatically
  once `content-nl` is committed — no edit needed for the smoke to run.
- To include Dutch in the playthrough audit, run with `AUDIT_COURSES=Dutch`.
- `scripts/assign-icons.mjs` is per-`COURSE` and has already been run for `nl` (unit-icons.json
  written); re-run `COURSE=nl node scripts/assign-icons.mjs` if the tree changes.

## Pipeline: generated en_to_fr answers import untaught words (incl. formal "u")
`scripts/check-content.mjs` (the generated en_to_fr answers block, ~line 245) adds **every**
trusted Tatoeba sentence whose English matches a live sentence's English as an accepted answer —
with no check that the answer uses only words taught by that circle. For Dutch this leaks the
formal **"u"** (banned from Part 1) and other untaught words into accepted answers, e.g.:
- `S31109` "Praat langzamer, alsjeblieft." picks up "Kunt u langzamer spreken alstublieft?" and
  "Spreekt u alstublieft langzamer." as accepted answers (formal "u", "alstublieft").
- (Fixed in content: the draft "Nee, dank je" was removed because its only English match pulled in
  "Nee, dank u." / "Nee, bedankt", which also caused a false-accept — see below.)

This is **shared pipeline code**, so it was not changed here. The fix (improves every course): in
that block, drop a candidate answer whose words aren't all known by the sentence's unit — the same
`analyse(... , formIndexFor(known))` test used for drafts and pulls. That would keep formal "u" out
of Dutch accepted answers and tighten the others. Until then, the residual "u" sits only in
*accepted* answers (never shown to the learner; no Part-1 lesson displays "u").

## Audit note: "a wrong answer is marked right" (engine typo-tolerance, not a content defect)
The every-lesson (logic) audit flags one Dutch case: `S11017` "Waar ben ik?" ("Where am I?"),
QT06, where "Where am" is accepted. This is `checkTyped` treating the dropped 1-letter "I" as a
typo, and it is engine-wide: on the same audit, **French ships 3** such findings (e.g. "He's better
than" for "He's better than me") and **Portuguese ships 91** (mostly "…, não" tag-question
truncations). Dutch's single case is on a legitimate pulled sentence and was left as content.

## Out of scope (Part 1 only)
Parts 2–3 (`scripts/part2/`, `scripts/part3/`, `scripts/add-part.mjs`) are not built for Dutch.
