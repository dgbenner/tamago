# Tamago: craft review

Draft 1, November 9, 2026. For a separate reviewer: a fresh Claude Code session that did not build Tamago.
It grades how the app looks and feels, not the French content or the learning logic.

## How to run it

1. Open the live site in a desktop browser at 1280 px wide. Do a phone pass at 390 px only when Dan asks.
2. Use it as a new learner: home, one full lesson in Unit 1 round 1, one lesson in a later unit and round, a
   missed answer, Review, Words, Verbs, Settings, and both light and dark mode.
3. Take a screenshot of every distinct screen and state. Save them in `_review/<date>/`.
4. Time it: seconds from Continue to the next question, and the total time for one lesson.
5. Grade each criterion below from 1 to 5. Write one line of evidence for each grade, naming the screenshot.
6. List fixes, most important first: what's wrong, where (screenshot), the fix, and which criterion it lifts.
7. Write it all to `_review/<date>/craft-review.md`. Change no code. The builder makes the fixes afterward.

Grade honestly. A 5 is rare. When in doubt between two grades, give the lower one.

## Criteria

**1. No dead time.** Every second in a lesson goes to questions.
- 5: The next question appears at once. No loading screens, celebrations or animations hold the learner. A lesson
  takes about 10 minutes or less.
- 3: Small waits or extra taps between questions, or one screen to click through after the lesson.
- 1: Spinners, transitions or screens that hold the learner.

**2. One thing on screen.** While answering, the screen shows the question and its answer controls, nothing else.
- 5: Nothing competes with the question. Flag and comment appear only in the answer bar.
- 3: Some extra elements (counters, labels, decoration) take attention.
- 1: The question fights with other content.

**3. Obvious in one second.** A learner knows what to do on every screen without reading instructions twice.
- 5: Each question type is clear at a glance, and the instruction is short and plain.
- 3: Some types need a second look, or instructions are long.
- 1: A learner could get stuck.

**4. Consistency.** The same things are in the same places across every question type and screen.
- 5: Prompt, answer area, chips, Continue and the answer bar sit in the same positions with the same sizes and
  spacing everywhere.
- 3: A few types break the pattern.
- 1: Each screen feels designed separately.

**5. Typography and spacing.** Type and space create a clear order of reading.
- 5: A clear type scale, French and English easy to tell apart, comfortable spacing, nothing cramped or floating.
- 3: Readable but flat, or uneven spacing.
- 1: Hard to scan.

**6. Light and dark.** Both modes are designed, not inverted.
- 5: Both read well, with matched contrast. The accent works on both backgrounds.
- 3: One mode is clearly weaker.
- 1: Text or controls are hard to read in one mode.

**7. Tone.** Words are warm and direct. Nothing childish, nothing corporate.
- 5: Feedback lines, labels and instructions sound like a calm adult. No game language (no streak pressure, no
  rewards, no "Amazing!").
- 3: Mostly right, with a few lines off.
- 1: Childish, pushy or robotic.

**8. Single bite.** The app feels light: a lesson is a small, complete piece you can finish while waiting in line.
- 5: Home makes the next lesson one tap away. The tree reads quickly. The sushi icons are consistent and calm.
- 3: Home takes some looking to find the next step.
- 1: The next step is buried.

**9. Feedback and states.** Right, wrong, typo and accent states are clear and quick.
- 5: The answer bar shows the result and the correct answer at once. Matched pairs leave smoothly. Errors are
  plain.
- 3: States are clear but slow, or inconsistent across types.
- 1: A learner can't tell whether they were right.

## Never acceptable

Any of these is a top fix, whatever the grades: hearts, chests, gems, combo counters, character interjections,
celebration screens, timers, loading spinners inside a lesson, or text that's unreadable in either mode.

## Report format

| Criterion | Grade | Evidence |
| --- | --- | --- |

Then: overall grade (the average, one decimal), and the fix list.
