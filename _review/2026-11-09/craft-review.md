# Tamago craft review, 2026-11-09

Desktop only, Chrome at 1280 × 800, on https://tamago-83f.pages.dev. Driven with Playwright so timings are
machine-measured; audio was not heard. Progress for the later-round and Unit 2 lessons was set by writing
unit_progress rows into the app's IndexedDB (Unit 1 at round 4, Units 2 and 3 past round 1). Dark mode was
tested through the browser's colour-scheme setting with the app's theme on System. No code was changed.
166 screenshots are in this folder; names below point to them.

## What was used

- Fresh home, unit sheet, first-time grammar note (00-home-fresh, 01-unit-sheet, 02-grammar-note-first-time)
- Unit 1 round 1, two full lessons (L1-*, L2-*), with a deliberate miss (L1-q02, L2-q03), a hint (L2-q02-hint),
  the flag panel and the comment stub (L1-q03-flag-panel, L1-q03-comment-panel)
- Unit 1 round 4 (L3-*: chips, Answer the question, Type what you hear, typed translation, Speak and compare)
- Unit 2 round 2 (L4-*), and typed answers through the keyboard toggle: a dropped accent and a wrong word
  with the Claude explanation (T1-*, T2-*)
- Review (R1-*, R2-review-end), Practice weak skills, a Review checkpoint, Progress (S5-*), Words (S8-*),
  Verbs (S9-*), Make (S10-make), Settings (S11-*), About (S12-about), locked unit and Your topic sheets
  (S2, S3), leaving a lesson (T3-after-leave)
- Dark: home, unit sheet, four questions with a miss and the flag panel, Words, Progress, Settings, grammar
  note (D1 to D9)

## Timing

- Continue to next question: 15 to 48 ms across 42 transitions, median about 32 ms (L2, L3, L4 logs). There is
  no transition, no animation, no fetch.
- Page load to usable home: 420 to 733 ms, all of it the opening wordmark animation (S0-splash). It runs on
  every load and reload, outside lessons.
- Lesson length: round 1 is 10 questions plus one re-ask; round 2 and 4 lessons were 10 questions. Driven by
  script a lesson took 9 to 11 s of wall time, so the time a person takes is all answering. At a reading pace
  of 10 to 20 s a question, round 1 is 2 to 4 minutes; round 4 with typing and two speaking questions is
  about 6 to 8 minutes. Under 10 minutes in both cases.

## Grades

| Criterion | Grade | Evidence |
| --- | --- | --- |
| 1. No dead time | 4 | 15–48 ms between questions, no spinners or celebrations (L2 log). Two things still sit between the learner and the questions: the unit sheet before a lesson (01-unit-sheet, two taps from the card) and the one-line end screen "8 of 9." with its own Continue (L1-end). |
| 2. One thing on screen | 4 | While answering: close, progress bar, heading, question (L4-q03-QT05). The "New" tag and first-sight gloss ("es = are (être)") are the only extras and earn their place. At desktop height the pinned Check sits 400 px below the chips (L4-q04-QT06), a gap the eye has to cross. |
| 3. Obvious in one second | 4 | Headings are two to four words and every type reads at a glance (L3-q05-QT11, L4-q08-QT05). Three exceptions: the home score line "R 3.1 · L 3.0 · W 0.7 · S 1.7 · very early A1" (H3-home-after-L4) is a code until tapped; with Listen first on, "Pick the meaning" looks identical to "Pick what you heard" (L1-q02-QT03 vs L1-q04-QT04); the heading still says "Tap what you hear" after switching to the keyboard (T2-typed-QT07). |
| 4. Consistency | 3 | The Check button lives in two places: pinned to the bottom for chip questions (L3-q03-QT08) and inline under the input for typed questions (L3-q05-QT11); switching a chip question to the keyboard moves it again (T1-typed-QT07). Done for speaking is pinned, Check for typed is not. Prompt, answer bar and flag icons are otherwise in the same place on every type. |
| 5. Typography and spacing | 4 | Clear scale: heading, larger sentence, choices, small muted glosses (L4-q01-QT03). French is set apart by dotted hint underlines; English prompts sit in muted text. Two things float: after Match pairs the board disappears and a lone small "oui = yes" hangs mid-screen (L1-q01-QT01-answered); the orange new-word dot sits between words like a bullet, "C'est • ici • ?" (L4-q01-QT03). |
| 6. Light and dark | 4 | Dark is designed, not inverted: warm near-black, lifted surfaces, pastel right/wrong outlines, same hierarchy (D3-q2-QT04-answered-dark, D6-settings-dark, D8-progress-dark). Yellow and orange hold on both backgrounds. The blue points pill is the one element that looks pasted on in both modes (D1-home-dark). |
| 7. Tone | 3 | Settings and Progress copy is exactly right ("No reminders, and nothing changes if you miss one." S11-settings-scrolled). The answer bar rotates through about fifteen lines; most are calm ("Not quite.", "Right. Note the accent.") but the set drifts toward interjections ("Bravo !", "Très bien !", "Spot on.", "Right on.", "Clean."), which is the pattern the feature list rules out. The Claude explanation speaks about the learner in the third person: "The learner wrote 'maison'…" (T2-why-open). The coin-and-number pill on home reads as game currency (H3-home-after-L4). |
| 8. Single bite | 4 | Continue on home starts the next lesson in one tap, Resume appears after leaving (T3-after-leave), the tree is one column of calm sushi icons (00-home-fresh). Each unit carries two progress systems, five round pills and a green signal-bars icon that reads as Wi-Fi (H3-home-after-L4), and the score line plus four tool buttons push the current unit below the fold centre. |
| 9. Feedback and states | 3 | Right, wrong and the correct answer appear at once with the sentence in both languages (L1-q02-QT03-answered, T2-typed-QT07-answered); the accent case is named (T1-typed-QT07-answered) but the letter isn't shown. Match pairs is the weak type: the finished board vanishes rather than leaving smoothly, and the bar says "Parfait !" even when a pair was mistapped and counted as a miss (L1-q01-QT01-answered; AnswerBar treats QT01 as always good). The Why? link arrives about 3 s after a wrong typed answer, which is fine since Continue never waits for it. |

**Overall: 3.7**

Never-acceptable list: none found. No hearts, gems, chests, counters, timers, character lines or celebration
screens. No spinner inside a lesson. All text was readable in both modes.

## Fixes, most important first

1. **Match pairs end state.** The board disappears and a lone "oui = yes" floats mid-screen; the bar says
   "Parfait !" even after a wrong tap that the score counts as a miss (L1-q01-QT01-answered). Keep the board
   on screen with matched pairs faded and the mistapped pair outlined in the wrong colour; when a tap was
   wrong, use the incorrect bar with "Not quite." and the pair that was missed. Lifts 9 and 5.
2. **One home for Check.** Chip questions pin Check to the bottom; typed questions put it under the input;
   the keyboard toggle moves it again (L3-q03-QT08, L3-q05-QT11, T1-typed-QT07). Put Check (and Done) in one
   place for every type. On a phone the pinned row is right; on desktop cap the column's height or keep
   Check directly under the answer area in both modes. Lifts 4 and 2.
3. **Points pill.** The blue coin badge top-left of home is the one game-currency element in the app
   (H3-home-after-L4, D1-home-dark). Show points as muted text ("29 points today") or only on the progress
   page, in the app's own palette. Lifts 7 and 8.
4. **Feedback voice.** Trim the answer-bar phrase set to the calm ones ("Right.", "Not quite.", "Almost.",
   "Right. Note the accent.") and drop the exclamations and "Clean."; keep French only where it teaches
   something. Rewrite the Why? explanation to address the learner ("You wrote maison; elles means they…")
   instead of "The learner wrote…" (T2-why-open). Lifts 7.
5. **Score line on home.** "R 3.1 · L 3.0 · W 0.7 · S 1.7 · very early A1" needs decoding (H3-home-after-L4).
   Show the band and a pointer ("Very early A1 · Progress") and leave the four numbers to the progress page,
   which already presents them well (S5-progress). Lifts 3.
6. **Unit indicators.** Each unit shows five round pills and a signal-bars strength icon that reads as Wi-Fi
   (H3-home-after-L4). Fold strength into the pills (fill level or colour) or into the ring around the icon,
   so one mark carries both. Lifts 8 and 5.
7. **New-word dot.** It sits inline between words like a bullet ("C'est • ici • ?", L4-q01-QT03). Attach it to
   the word as a superscript or colour the word's dotted underline orange instead. Lifts 5.
8. **Listen-first heading.** With the French hidden, "Pick the meaning" and "Pick what you heard" are the same
   screen (L1-q02-QT03, L1-q04-QT04). Use one heading for the hidden-French state, or add a small "Listen
   first" line under it. Lifts 3.
9. **Keyboard mode heading.** After the keyboard toggle the heading still says "Tap what you hear"
   (T2-typed-QT07). Say "Type what you hear" when typing. Lifts 3.
10. **Accent and typo state.** "Right. Note the accent." names the case but not the place
    (T1-typed-QT07-answered). Underline or bold the corrected letters in the shown answer. Lifts 9.
11. **Topic sheet.** The kicker and title both read "Your topic" (S3-your-topic). Make the kicker "Choose a
    topic" or the row number. Lifts 5.
12. **End screen.** "8 of 9." is one screen with one tap (L1-end). It passes the criterion, but the same line
    could sit on home under the unit for a second, which would remove the last tap between lessons. Lifts 1.

## Notes for the builder

- Round 1 misses don't enter the review bank, so Review stayed disabled until a round 2 miss; that is the
  rule working as written, not a bug. After one typed miss the bank held one item and Review ran one
  question (R1-review-q1, R2-review-end).
- Leaving a lesson is instant, with no confirmation, and home shows Resume (T3-after-leave). That matches the
  no-dead-time rule; a learner who taps the X by mistake loses nothing.
- Speak and compare keeps Done disabled until a recording exists (L3-q07-QT13). In a browser without a
  microphone the code shows a fallback line and enables Done; that path wasn't exercised here.
