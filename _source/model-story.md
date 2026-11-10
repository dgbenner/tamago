# Tamago: the model story

November 10, 2026. Which AI does what in Tamago, under which rules, and how each one is checked. Drafted from the
project's own documents (feature list, autonomous build brief, craft review, check-in) and from the code as built.
Where something isn't in place yet, it says so.

## Tamago's product rules

These hold for every AI below, and for the app itself.

- **The 10-minute lesson is the core.** A learner opens the app in a queue and finishes a lesson before the queue
  moves. Nearly all of those 10 minutes are questions, one after another. Nothing may slow the step from one
  question to the next: no loading spinners inside a lesson, no screens to click through.
- **No game rewards.** No hearts, chests, gems, combo counters, character interjections, celebration screens or
  timers. Points and streaks are quiet indicators, and a setting turns them off.
- **Facts come from Wiktionary.** Word meanings, hints and verb tables come from Wiktionary (CC BY-SA), never from
  a model's memory. Sentences come from Tatoeba wherever possible; any sentence written for Tamago is marked as
  such and waits for a native speaker's check.
- **A native speaker, not an AI, checks the French** Tamago wrote itself. No model does this step.

## 1. The builder

- **Purpose:** builds and maintains the app and its content: code, the content pipeline, the workbook, tests,
  the build log and the daily check-in for Dan.
- **Model:** Claude, working in Claude Code (currently Claude Opus 5.5).
- **Rules it follows:** the autonomous build brief (`_source/autonomous-build.md`) and the project notes
  (`CLAUDE.md`). It works phase by phase, tests, commits and pushes at each step, and logs every decision. It stops
  and waits for Dan for anything that costs money or needs an account, for making anything public or opening it to
  testers, for deleting Dan's files, and for the native-speaker check.
- **Where its facts must come from:** Tatoeba for sentences, Wiktionary for meanings and conjugations, Lingua Libre
  for recordings, the CEFR self-assessment grid for "I can" statements. When Tatoeba has nothing that fits, it may
  draft a sentence within the unit's words, marked "tamago_original" and listed for the native check.
- **Must never:** state a definition or conjugation from memory; add game rewards; put spinners in a lesson; open
  the app to testers or spend money on its own; put keys or secrets in the app or the documents.
- **Cost limits:** none inside the app. It runs under Dan's Claude Code account, and Dan decides when it works.
- **How it's graded:** the automated tests (unit tests for the lesson engine, answer checking and content rules;
  browser runs in Chrome and Firefox), the content check (every live sentence and word matched against Tatoeba and
  Wiktionary, or the build fails), an accessibility audit against WCAG 2.2 AA, the craft review below, and Dan's
  own test notes.

## 2. The reviewer

- **Purpose:** grades how the app looks and feels, as a new learner would meet it. It doesn't judge the French or
  the learning logic.
- **Model:** a separate Claude Code session that didn't build Tamago, so it comes without the builder's
  assumptions.
- **Rules it follows:** the craft review rubric (`_source/craft-review.md`): use the live site as a new learner,
  screenshot every screen and state, time the lesson, grade nine criteria from 1 to 5 with one line of evidence
  each, and list fixes in order. It changes no code.
- **Where its facts must come from:** what it sees and measures on the live site, with a screenshot named for each
  grade.
- **Must never:** change code or content; grade from the code instead of the screen; round a grade up. When in
  doubt between two grades, it gives the lower one.
- **Cost limits:** none inside the app; it runs when Dan asks for a review.
- **How it's graded:** Dan reads the review against the screenshots. Anything on the rubric's "never acceptable"
  list is a top fix whatever the grades.

## 3. Mistake explanations ("Why?")

- **Purpose:** after a wrong typed answer, one or two plain sentences on what differs from the closest accepted
  answer, and why it matters.
- **Model:** Claude Haiku 5.5, a smaller, faster model (the feature list asks for a smaller, cheaper model for
  answer checking), at low effort.
- **Rules it follows:** answer only from what the app sends: the exercise, the learner's answer, the accepted
  answers, and the Wiktionary meanings of the sentence's words. No greeting, no praise, no exclamation marks, no
  lists. If the reason can't be told from what it was given, it just names the difference.
- **Where its facts must come from:** only that message. It never adds meanings or verb forms of its own.
- **Must never:** define words or give conjugations beyond what it was sent; slow the lesson. The request goes out
  in the background, and the Why? link appears only once an explanation has arrived. Continue never waits for it.
- **Cost limits:** 30 explanations a day per device; up to 2,000 output tokens per explanation; a key used only by
  Tamago, in its own Anthropic workspace with a $5 monthly spend limit. One explanation costs a fraction of a cent.
  Requests from other sites are refused.
- **How it's graded:** not yet systematically. Learners can flag an answer, and Dan reviews flags. A set of known
  mistakes with expected explanations, scored the same way each time, is the next step.

## 4. The practice writer (Self-Study, "Written by Claude")

- **Purpose:** writes fresh practice from the words a learner has already met: short sentences to translate, and
  short two-person listening exchanges with three comprehension questions.
- **Model:** Claude Opus 5.5 at low effort, with the platform's fallback to another model if it's busy. It returns
  structured data in a fixed shape, so the app can check every line.
- **Rules it follows:** use only the French words in the list it's given, in the forms listed, and only the names
  listed; keep sentences short, natural and literal; give plain, faithful English.
- **Where its facts must come from:** the learner's own met words, with their Wiktionary meanings. The app then
  re-splits every French line against its word list and drops any line with a word outside it, so a meaning can
  never come from the model.
- **Must never:** introduce a word the learner hasn't met; write idioms; feed the score, the review bank or the
  learner's memory schedule. Its sessions are kept apart from progress.
- **Cost limits:** at most 8 sentences per request; at most 150 words sent; up to 8,000 output tokens; the same
  Tamago-only key and $5 monthly workspace limit. There's no per-device daily cap yet, so the workspace limit is
  the ceiling.
- **How it's graded:** the app's own filter (any line with an unmet word is dropped; if fewer than three
  sentences survive, the learner is asked to try again) and the unit tests for that filter. Its French isn't
  checked by a native speaker, and the screen says so.

## When something goes wrong

- A learner flags a question or an answer; Dan reviews the flags, and accepted answers fold into the content.
- The key expires on January 2, 2027, and the free credit ends November 20, 2026. Either way, both Claude
  features switch off quietly and the rest of the app works as before.
