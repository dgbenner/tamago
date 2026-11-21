# Tamago: language content pipeline (all remaining languages)

November 20, 2026. For Claude Code / Builder 2. One autonomous pass: scout every remaining A1 language, then
gather each into a review shelf. No Fable, no app wiring, no pushes — the shelf waits for review tomorrow.
Runs by itself; Dan reads one check-in file.

## Languages this covers

Every remaining A1 language not yet complete, in build order (scout confirms readiness):

- Romanian — Part 1 is gathering tonight; this pass does Parts 2–4.
- Norwegian — Parts 2–4. Dry source (Lingua Libre had nothing, Tatoeba thin); the scout decides.
- Polish, Czech, Hungarian, Finnish — full A1.
- Greek — flagged. Non-Latin alphabet, against the "other alphabets" hands-off line. Scout reports it and
  marks it Hold. Do not build without Dan's word.

Skip anything already in flight: if a `content/<lang>-a1` branch or worktree already exists, another session
owns it — leave it alone (one session per worktree). Tonight that's Dutch, Swedish, Danish, Romanian.

## Stage 0 — Scout pass (research first)

Before building anything, produce a scouting report per language at `_review/scout/<lang>.md`, plus a ranked
summary at `_review/scout/_summary.md`. Research only — no content built. Fill every field:

- **Sources:** Tatoeba lines with an English translation (count); Wiktionary coverage for gender, meaning,
  conjugation; Lingua Libre recordings (count, or none).
- **A1 word list:** which authority to use (official institute list, KELLY, or a frequency stand-in) and its
  license.
- **Grammar load for A1:** the features that must be sequenced — case system (how many, introduce when),
  gender, agglutination, articles, script.
- **Nearness:** how close to a language already built, so pipeline reuse is known.
- **Judging themes for this language:** the shared checklist below, tailored — e.g. "Polish: cases appearing
  before they're taught; gender agreement; drafts outnumbering sourced lines."
- **Verdict:** Ready / Ready-with-caveats / Hold, with the reason.

## Stage 1 — Gather pass (build the shelf)

For each language the scout marked Ready or Ready-with-caveats, in readiness order, build the needed parts,
gather-only:

- Per part: write the part setup (circles, words, I-can statements, task items), pull Tatoeba, pick Wiktionary
  meanings, check Lingua Libre, draft only where a circle is short.
- Write `_review/<lang>-partN-candidates.md` and `-drafts.md`. Commit locally in the language's own
  worktree/branch off main. No push, no app wiring, no Fable.
- Log one line per part to `_review/content-shelf-log.md`: language, part, Tatoeba count, draft count.
- Facts — gender, meaning, conjugation — from Wiktionary, never model memory. Drafts marked `tamago_original`.

## Dry-source rule (built in, so no one decides it live)

If, for any part, drafts would exceed 40% of the part's sentences — sources too thin, the Norwegian case —
stop that language after the log line, mark it Hold-dry in the check-in, and move on. Don't invent a whole
part to fill a gap.

## Judging themes (the shared checklist review applies tomorrow)

The scout tailors these per language; they're what Fable watches:

- Every word is introduced before it's tested; no more than four new words a lesson.
- Accepted answers use only words the course has taught.
- Gender, meaning, conjugation match Wiktionary; no glosses from memory (the Norwegian gloss/gender errors).
- Drafts stay within the unit's words and are marked.
- Idioms, misleading-at-level, or odd sentences cut.
- Near-cognates handled, not just identical matches.
- Cases and inflections introduced in teachable order, never dumped.
- Register fits A1.

## Check-in (Dan reads only this)

Overwrite `_review/shelf/check-in.md` each pass, three sections: Done since last check-in, Decisions made,
Waiting for Dan. Everything else lives in the logs and scout files.

## Stop and wait for Dan only for

- Money, accounts, keys, domains, hosting.
- Making anything public or opening to testers.
- Deleting data or files outside the repo.
- Greek, or any Hold language — report, don't build.

## Never

- Push, merge to main, wire into the app, or run Fable. The shelf waits for review.
- Touch a language another session already has in a worktree.
- Definitions or conjugations from model memory.

## Update, 2026-11-20 late (Dan): full A1 run, replaces gather-only

Every remaining language goes all the way to A1-complete in one continuous run, one language at a time:
1. **Gather** each missing part (as Stage 1 above, same rules; the 40% dry-source rule still holds a language).
2. **Filter** the core list: the shared stoplist (`scripts/lib/a1-stoplist.mjs`, oaths, slurs, violence, subtitle
   leftovers, official register) applies automatically at build; each language's own junk is added under its key and
   what it drops is logged (`content*/a1-dropped.json` and the build output). Never stop to ask.
3. **Wire Developer-only**: merge the language's branch into main locally (no push), approve its units, grammar notes
   (bold-marked) and overview lines, icons, build; a new course is registered `devOnly: true`.
4. **Audit**: the fast tests, the word audit and the every-lesson check; fix what they find.
5. **Mock exam** at the end of the last part (`finalcheck.js` EXAMS and FORMATS, or the general format where the
   language has no A1 exam), decided and logged.
6. **Fable review**: queued; it runs on Fable when Fable credits return.

Phases 1–5 run on Opus. Every content and build decision is made under the rules in this doc and logged in the
check-in; stop only for money, accounts, going public, or deleting data. Pushing to the live site still waits for Dan.
Struck (Dan): Greek, Czech, Hungarian, Finnish. Norwegian: held by the dry-source rule.
