# Handoff: Spanish and German A1 Parts 3 and 4

Builder 2, 2026-11-15. Branch `content/es-de-a1`, worktree `Sites/tamago-es-de-a1`, last commit `2df529b`, pushed.
Nothing is merged to main. This note is in the worktree only (`_review/` is ignored by git); it is not on the branch.

## Done

- Spanish and German A1 Parts 3 and 4: 34 circles per course, Brush-Up slots C05 to C08, task items, three Read and
  Answer texts per circle that has them. Every A1 task T01 to T13 has a circle in both courses.
- Fable's four reviews applied (Spanish Parts 3 and 4, German Parts 3 and 4): every Use candidate, the named swaps,
  the fixes listed in each check file.
- Spanish is Mexican-standard by Dan's ruling: the Mexican word is taught, the Spain wording is an accepted answer.
- Content only. No file in `src/` outside the content folders, `test/`, `server/` or `functions/` was changed.

| | Spanish | German |
| --- | --- | --- |
| Sentences | 4,022 (3,213 Tatoeba, 809 originals) | 4,237 (3,621 Tatoeba, 616 originals) |
| Official list | 479 of 534 PCIC (90%) | 572 of 627 Goethe (91%) |
| Word audit | 0 early, 0 over 4 new words, 3,007 lessons | 0 and 0, 3,155 lessons |
| Every-lesson check | 0 issues, 30,874 questions | 0 issues, 32,295 questions |
| Workbook | v11 | v9 |

`npm test`: 194 of 194 pass. Smoke test and audio-stop test passed on the last push.

## Open, for Builder 1

Details for each are in `_review/es-de-framework-needs.md` (that file is on the branch).

1. **Mock exams.** `FORMATS.es` (DELE A1, reading first) and `FORMATS.de` (Goethe-Zertifikat A1) are proposed, not
   added: they live in `src/lib/finalcheck.js`. Until then both final checks run in the general format.
2. **Goethe speaking round** ending with a spelled word and a number: no question type does it yet.
3. **No verb table for quisiera, hätte, möchten, war.** Their hints carry the note; hiding the table needs `tableOf`
   in `src/App.jsx`.
4. **Type the Word and regional words.** Sentences accept the Spain wording; a single typed word (coche for carro)
   does not.
5. **Verb tables in grammar notes.** Missing verbs were added through each circle's `conjugation_lemma`, so a note
   shows every table of its circle (German U69 shows 13). Widening `verbLemmas` in `scripts/check-content.mjs` to
   -ar and -en infinitives would let the lists come back out.
6. **Test time.** A full `npm test` takes about 25 to 30 minutes with the new parts.

## Things to know before merging

- Shared scripts touched, each a small addition: `scripts/apply-part-candidates.mjs` (reads "Swap for #id" as well
  as "Swap: #id"), `scripts/lib/conjugation.mjs` (Spanish weather verbs in the third person only; the German reader
  takes the page's own template), `scripts/a1-coverage.mjs` (a German alias map for the Goethe list's stems, which
  counts 12 of the 572), `scripts/lib/course.mjs` (workbook versions).
- Spanish workbooks are a chain: v8 and v9 from `scripts/part3/es.mjs` and `scripts/part4/es.mjs`, v10 from
  `scripts/review/es-part3.mjs`, v11 from `scripts/review/es-part4.mjs`. Rerun all four if a workbook is regenerated.
- Spanish coverage fell from 94% to 90% with the Mexican words: the PCIC list is Spain's, so each one costs its twin.
- `CLAUDE.md` on the branch has a section for each course and each review.
- Fable's files (`*-check.md`, the marked `*-candidates.md`) are in this worktree's `_review/` and are not committed.
- The word audit writes a spreadsheet to the Desktop. Dan has asked for that to stop: run it with `HOME` pointed at
  a scratch folder and report the counts.
