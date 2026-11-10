# Tamago craft review, 2026-11-10

Second run of `_source/craft-review.md`, same rubric as 2026-11-09. Desktop only, Chrome at 1280 × 800, on
https://tamago-83f.pages.dev as deployed this morning (commit 11d755b, the Developer area). Driven with Playwright,
so timings are machine-measured and audio was not heard. Later rounds were reached by writing unit_progress rows into
the app's IndexedDB (Unit 1 at round 4, Units 2 and 3 past round 1). Dark mode through the browser's colour-scheme
setting, with the app's theme on System. No code was changed. About 130 screenshots are in this folder; names below
point to them. `french-check.md` in the same folder is the separate French check.

The app has changed a great deal since the last review: a two-column desktop home with a Tools panel that opens
tools in place, a Practice button and a Next Lesson button pinned at the bottom, level markers on the tree, lesson
intros, in-lesson Can't Listen Now and Can't Speak Now, Title Case throughout, and a wider lesson column. Several
of last week's twelve fixes survived the redesign; two were undone by it (noted below).

## What was used

- Fresh home, unit pop-up, first-time grammar note (00-home-fresh, 01-unit-sheet)
- Unit 1 round 1, two lessons (L1-*, L2-*), with a miss (L1-q02, L2-q03), the flag and comment panels (L1-q03-*)
- Unit 1 round 4 (L3-*): chips, Answer the Question, Type What You Hear with a one-letter slip, typed translation,
  Speak and Compare
- Unit 2 round 2 (L4-*), including the keyboard toggle on a chip question and a dropped apostrophe (L4-q05-*)
- Practice from the bottom bar (07-practice-q1, R-*, R-end), a Checkpoint pop-up and its first question
  (12-checkpoint, 12-checkpoint-q1), Can't Listen Now tapped mid-lesson (C1-cant-listen-tapped)
- Locked unit and Your Topic pop-ups (10-*, 11-*), Glossary with Match (T-glossary, T-glossary-match), Verbs with
  the drill (T-verbs, T-verbs-drill), Self-Study (T-self-study), Progress (T-progress, 12-progress-scrolled),
  Settings (18-*), About (19-about), Developer (17-developer)
- Dark: home, unit pop-up, four questions with a miss and the flag panel, Progress, Settings, grammar note,
  leaving a lesson (D1 to D9)

## Timing

- **Continue to next question: 21 to 52 ms over 54 transitions, median about 30 ms** (L1, L2, L3, L4, R, D3
  logs). Unchanged from last week. No transition, no animation, no fetch.
- **Page load to a usable home: 3.4 to 3.8 s, on every load and reload** (03-splash). This is the opening
  wordmark: drawn by about 1.1 s, held to 3.1 s, then a 160 ms fade. Last week's report gave 0.4 to 0.7 s for the
  same thing; that number was wrong. The harness saw the home's buttons in the DOM under the overlay and called
  the page usable. This run waits for the overlay to go.
- **Lesson length:** round 1 is 10 questions plus one re-ask; rounds 2 and 4 were 10. Scripted, a lesson took 9
  to 11 s of wall time, so a person's time is all answering: about 2 to 4 minutes for round 1, 6 to 8 for round
  4 with typing and two speaking questions. Under 10 minutes.
- **After a lesson:** straight back to home; no end screen (L1-end, L2-end, L3-end). Practice still ends on a
  one-line screen, "8 of 8 correct." with Continue (R-end).

## Grades

| Criterion | Grade | Last | Evidence |
| --- | --- | --- | --- |
| 1. No dead time | 4 | 4 | 21–52 ms between questions; a passed lesson returns straight to home (L1-end). Next Lesson starts in one tap. The opening screen holds every launch for 3.4–3.8 s (03-splash), which is now the only wait a learner meets and the longest in the product. |
| 2. One thing on screen | 4 | 4 | Close, progress bar, heading, question, Check under the answer area (L3-q04-QT09, L4-q04-QT06). The only extras are the New tag with its gloss line and a small muted Can't Listen Now / Can't Speak Now link at the foot of audio and speaking questions (L1-q04-QT04, L1-q05-QT10); both earn their place. |
| 3. Obvious in one second | 4 | 4 | Title Case headings that say the task, including "Listen and Pick the Meaning" and "Type What You Hear" when the mode changes (L1-q02-QT03, L4-q05-QT07-keyboard). Home names the action: "Next Lesson: Saying Hello", "Practice · 1 Mistake" (09-home-after-L4). Pop-ups explain locks in one sentence (10-locked-unit-sheet). The one unexplained mark is the blue pill with a dot and a number, top right (00-home-fresh). |
| 4. Consistency | 4 | 3 | Check and Done now sit in the same place on every type, under the answer area (L3-q05-QT11, L3-q07-QT13, L4-q04-QT06). Pop-ups share one shape and header (01-unit-sheet, 12-checkpoint, 10-locked-unit-sheet). Two breaks: Glossary's Match opens full screen while the Verbs drill opens inside the Tools panel (T-glossary-match, T-verbs-drill); a lesson ends on home but Practice ends on its own screen (R-end). |
| 5. Typography and spacing | 4 | 4 | Clear scale, French set apart by dotted hint underlines, the new-word dot now a superscript on the word (L4-q01-QT03). The two-column home reads well at 1280 (00-home-fresh). Small things: "Very Early A1" appears twice at the top of the tree, as a caption and as a row divider (04-home-progressed); the Your Topic pop-up's kicker repeats its title (11-your-topic-sheet). |
| 6. Light and dark | 4 | 4 | Dark is designed: warm near-black, lifted cards, pastel right/wrong outlines, legible muted text (D1-home-dark, D3-q02-QT04-answered-miss, D7-settings-dark, D8-grammar-dark). One off-palette element: the keyboard focus ring on text fields is the browser's default blue in light mode (L3-q06-QT12, L4-q05-QT07-keyboard). |
| 7. Tone | 4 | 3 | Pop-up and settings copy is calm and exact: "Locked for now. It opens when you've finished round 1 of…", "It never locks anything, so you can skip it" (10-locked-unit-sheet, 12-checkpoint). "Clean." and "Spot on." are gone; the French lines stay. Two lines still misfire: "Close." and "Almost." appear for answers that were nowhere near (L2-q03-QT03-answered-miss, D3-q02-QT04-answered-miss), and "Right on." is the one slangy line left. The blue points pill reads as currency again. |
| 8. Single bite | 5 | 4 | Next Lesson is one tap and names the unit; Practice is one tap and says what it holds; the tree is one calm column with ring progress and level markers, checkpoints marked Skipped when skipped (09-home-after-L4, D4-after-leave-dark). Tools sit beside the tree and open in place without leaving home (T-glossary, T-progress). The sushi icons are consistent and quiet. |
| 9. Feedback and states | 4 | 3 | Right, wrong and the answer in both languages appear at once (L1-q02-QT03-answered-miss). Slips are marked letter by letter: the missing e in femme, the dropped apostrophe in C'est (L3-q05-QT11-answered-typo, L4-q05-QT07-answered-typo). Match the Pairs ends clean with nothing left on the board (L1-q06-QT01-answered). Can't Listen Now swaps the question in place (C1-cant-listen-tapped). What holds it at 4: the misleading "Close." and "Almost." lines, and the silent return to home after a lesson, with no line saying how it went. |

**Overall: 4.1** (last week 3.7). Up on consistency, tone, single bite and feedback; level elsewhere.

Never-acceptable list: none found. No hearts, gems, chests, counters, timers, character lines or celebration
screens; no spinner inside a lesson; all text readable in both modes.

## Last week's twelve fixes, as they stand on the live site

| Fix | Status |
| --- | --- |
| 1 Match pairs end state | Holding: the board clears, nothing floats (L1-q06-QT01-answered). The mistap bar could not be re-checked here: this run's mistaps fell on new words, which rule R02 doesn't count. |
| 2 One place for Check | Holding, and better: the Check row sits under the answer area on every type at desktop width (L3-q04, L3-q05, L3-q07). |
| 3 Points as plain text | **Undone by the redesign.** A blue pill with a dot and the number is back, top right (00-home-fresh, D1-home-dark). |
| 4 Feedback voice | Holding for the phrase set (no "Clean.", no "Spot on."). The Why? explanation was not reached in this run, so its voice is unverified here. |
| 5 Band line on home | Superseded: the score line is gone; the band shows as the tree's level markers and the Progress tool holds the numbers (04-home-progressed, T-progress). Reads well. |
| 6 Unit indicators | Superseded: rings around the icon show progress; the strength bars are gone (04-home-progressed). One mark per unit, as asked. |
| 7 New-word dot | Holding: superscript on the word (L4-q01-QT03). |
| 8 Listen-first heading | Holding: "Listen and Pick the Meaning", "Listen and Translate" (L1-q02-QT03, L3-q01-QT06). |
| 9 Keyboard-mode heading | Holding: "Type What You Hear" (L4-q05-QT07-keyboard). |
| 10 Typo and accent marks | Holding (L3-q05-QT11-answered-typo). |
| 11 Topic kicker | **Undone:** the pop-up reads "Your Topic / Your Topic" again (11-your-topic-sheet). |
| 12 Lesson end on home | Half: a lesson now returns straight home, but the "Last lesson: 9 of 9" line is gone, so nothing acknowledges the lesson (02-home-after-L1). |

## Fixes, most important first

1. **The opening screen.** 3.4 to 3.8 s on every launch and every reload, measured to the moment the overlay
   clears (03-splash). CLAUDE.md records it as a deliberate exception to the no-loading-screens rule, and it is a
   handsome drawing; but it is now the only wait in the product, and a learner opening the app in a line pays it
   each time. Show the full draw once per install (or once a day), then a 400 ms version or none; keep the
   reduced-motion path as it is. Lifts 1.
2. **Points pill.** The blue badge with a dot top right is the last game-currency mark on screen (00-home-fresh).
   Plain muted text, "36 points", as agreed on 2026-11-09. Lifts 7 and 3.
3. **"Close." and "Almost." on far-off answers.** Both read as a judgement of the answer and are wrong when the pick
   shared no words with the right one (L2-q03-QT03-answered-miss, D3-q02-QT04-answered-miss). Use them only
   when the check found one wrong word or a slip; otherwise "Not quite." or "Here's the answer." Lifts 9 and 7.
4. **Where drills open.** Glossary's Match takes the full screen; the Verbs drill runs inside the Tools panel
   (T-glossary-match, T-verbs-drill). Anything with a progress bar and an answer bar should open the same way; full
   screen matches lessons. The same rule would give Practice the same ending as a lesson instead of its own screen
   (R-end). Lifts 4.
5. **Acknowledge the lesson.** After a passed lesson the home returns with only the points number changed
   (02-home-after-L1). One muted line above the bottom bar, "Last lesson: 9 of 9", for the length of the visit, as
   fix 12 had it. Lifts 9 and 1.
6. **Focus ring colour.** Text fields show the browser's default blue ring in light mode (L4-q05-QT07-keyboard,
   L3-q06-QT12). Use the ink or green token at the same thickness so the WCAG pass keeps its visibility. Lifts 6.
7. **Double level caption.** "Very Early A1" sits as the strip caption and again as the first row divider
   (04-home-progressed). Keep the dividers; drop the caption, or make it the current unit's round line. Lifts 5.
8. **Topic kicker.** "Your Topic / Your Topic" (11-your-topic-sheet). Kicker "Choose a topic" until a pack is
   chosen, as before. Lifts 5.
9. **"Right on."** The one slangy line left in the English set. Drop it. Lifts 7.

## Notes for the builder

- Tools cards in the Tools panel are `<button>` elements with no box of their own (the harness saw a 0 × 0 rect and
  a covering div); a real pointer click lands fine, and a JavaScript click opens them. Only worth a look if
  keyboard or screen-reader users report the cards unreachable; the WCAG pass says they are.
- One page error was seen once, "Cannot read properties of undefined (reading 'sentence_id')", when the harness
  started Unit 1 at round 4 immediately after writing progress rows and clearing a session. Starting rounds 2, 3,
  4 and 5 of Unit 1 afterwards all worked (probe2 log: 10 questions each, the right types). Not reproduced; noted
  in case it recurs for a real learner.
- Practice goes straight into a session when the bank holds mistakes and opens a pop-up when it is empty
  (07-practice-q1, 07-practice-sheet). Reasonable, but it is the one button on home with two behaviours.
- Round 1 mistaps on new words don't count (rule R02), so the "Not quite. · enfant = child" bar from fix 1 only
  shows from round 2; verified locally on 2026-11-09, not re-run here.
