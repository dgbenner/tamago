# Tamago: feature list

Saved November 6, 2026. Updated November 7, 2026 (learning review applied). A language-learning web app that brings back old
Duolingo's best features for serious adult learners. Dan uses it first, then opens it to others. Not a spec yet.

## Direction

- Bring back the features Duolingo removed or weakened: forums, answer flags, the word list, grammar notes.
- Built for real progress: CEFR levels instead of points, no punishments, no graded pronunciation.
- Built for adults, not children. No candy, chests, toys or cartoon pressure.
- **The 10-minute lesson is the core.** A learner opens the app in a line and finishes a lesson before it moves.
  Nearly all of the 10 minutes is questions, one after another. Speed between questions matters more than
  anything else on screen.
- Market is crowded at the top (Duolingo, Babbel, Busuu, Rosetta Stone); Busuu is the closest existing app
  (CEFR levels, native-speaker corrections). Openings: less common languages and regional variants.

## Languages

- English to French only for now, with an English interface. Built so languages swap without changing the structure.
- Later: Spanish, then German. Italian possible.
- Scope for now: A1 in French, across all four skills.

## Progress: points, score and CEFR

Three layers, each with its own job.

- **Points (XP)**: effort. Earned for answering questions. Kept loose for now. Shown in the lesson and on home.
- **Score**: learning. One score per skill (reading, writing, listening, speaking) on Duolingo's 0–160 scale,
  used as the benchmark. Score moves only for new learning: a round finished for the first time, a review
  question cleared. Repeating content already mastered earns points but no score. This is the break between
  points and learning, so a learner can't grind writing points into a writing level.
- **CEFR level**: the label that comes from the score, using Duolingo's bands. A1 is split three ways:
  0–9 very early A1, 10–19 early A1, 20–29 high A1. A2 is 30–59.
- **Intermediate layer**: A1 alone takes months. Score shows to one decimal through A1 (Reading 4.6) so it moves
  every few lessons. Exact rate is open.
- **Where it shows**: points and a short score line on home. The full picture (per-skill score, CEFR band,
  "I can" checklist, what "A1 complete" requires) lives on its own progress page, not in the main view.
- **A1 complete for a skill**: every A1 node for that skill finished through round 5, and every A1 "I can"
  statement for that skill checked.
- Note: Duolingo's score is one number per course and moves with course completion, not with a skill test.
  Per-skill score is Tamago's own addition.

## Lesson flow (core)

- A lesson is a block of about 8 to 10 questions. Pass is 70% of graded questions (speaking isn't graded).
- No more than 4 new words per lesson; a new word's meaning shows at first sight.
- **A miss is a strike, nothing more.** No hearts, no lives, no lockout.
- **Under the pass mark**: the lesson doesn't count; the learner repeats it right away with the same content in new
  formats. Nothing locks.
- **No timers** on any question.
- **Progress bar at the top** of the screen during questions.
- **No dead time**: no loading screens, no congratulation screens, no animations that hold the learner.
  The next question appears right away.
- **Remediation**: a missed question goes to the end of the block and comes back in a different question type
  (same content, new format).
- **Answer bar**: after each answer, a bar at the bottom shows right or wrong and the correct answer, and the
  French plays without blocking Continue. The flag
  and comment icons sit in this bar, bottom right, faint outlines. Correction: earlier versions of this list
  put them bottom left during the question. Nothing extra shows while the learner is answering.
  - **Flag** gives a short list of reasons (my answer should be accepted, audio is wrong, translation is wrong,
    something is broken).
  - **Comment** shows the comment count and opens that question's discussion. Stubbed in version 1; working in
    version 3.
- **Feedback lines**: the answer bar shows short, warm, direct lines that rotate ("Nice.", "Not quite."), not a
  fixed Correct or Incorrect. French lines ("Très bien !", "Presque !") rotate in at a flexible rate, about one
  per lesson to start, with tap-for-meaning. Instructions shift toward French as the course goes up in level.
- **Match pairs**: a correct pair animates out together; no green outline.
- **New word tag**: the first time a word appears, the question says so and the word is highlighted.
- **Tap a word for hints**: words with a dotted underline open a small table of translations, from Wiktionary.
  A hint never costs a strike. Every hint is logged. Correction: hinted words no longer go to review.

## Answer checking

- Default is lenient: a one-letter typo is accepted and the correct spelling is shown. Extra spaces are ignored.
  A missing accent counts as correct at A1 and is pointed out. A wrong word is a miss.
- A setting lets the learner make checking stricter.

## Review and skill strength (core, outside tree progress)

- **Review bank**: misses in rounds 2 to 5 go in (round 1 misses don't). Review draws from the bank. A question
  leaves the bank after three correct answers on three different days. Review doesn't count toward progress in the tree.
- **Skill strength**: each skill node shows four bars that drop over time without practice, on the FSRS schedule.
- **Practice weak skills**: one button on the tree pulls from the weakest skills.
- **Review checkpoints**: a review node appears in the tree after a set amount of new content. Stubbed for now.

## Question types (core)

- **Fill in the blank** with word chips at the bottom. A chip can be a whole word or part of a word.
  Variant: the blank sits inside a speaker's dialogue bubble.
- **Type the translation** from source to target language, with word chips ("chiclets") to build the answer.
  A keyboard icon in the chip bank switches to typing; a setting makes it the default.
- **Word to image match**: a word at the top, pick the matching image (tomato). Variant: the English word at the
  top, four images labeled in French.
- **Match pairs**: target words and their meanings on one screen, tap to pair them (the old Words matching).
- **Answer the question**: a speaker asks something ("How do I get to the park?") and the learner answers
  instead of translating.
- **Listening**: type what you hear, tap what you hear (word chips), pick what you heard, a slow button.
  - **Audio-only answers**: when a listening question has choices, the choices are speaker buttons, not text.
    Written French choices turn a listening question into a reading question; English meaning choices are fine.
  - Text stays hidden until the learner answers. Option to try: text appears only after the second play.
- **Repeat what you hear**: audio only, text behind a reveal button, then say it. Never graded. Starts in round 1.
- **Speak from memory**: an English prompt, say the French, then hear both. Round 5. Never graded.
- **Speaking, never graded**: listen to a native recording, record yourself, play both side by side.
- Question types work off one sentence corpus in different ways.
- **Variants**: each question type can have several ways to interact (six or more for listening, for example).
  All variants stay live in a test bank. Nothing is deleted; weak variants are kept, changed or switched off.
- **Phasing**: early lessons use fewer, simpler types and fewer choices. Types and choices grow with level.
- Later, outside the 10-minute block: **listening comprehension** (one audio scenario, then several short typed
  answers) and conversations.

## Learning tree (core)

- Organized by CEFR level (A1–C2). Each unit pairs a topic with one grammar point and one or two
  CEFR "I can" statements. Short placement check; "I can" checklist at the end of each level.
- Skills show as icons in rows of one, two or three. Locked skills are gray. Each shows a lesson count (2/7)
  and its strength bars.
- **Five rounds per skill node**: the same content five times, with less help each round.
  Round 1 is exposure (match words, recognize, pick from choices). Round 5 is recall with nothing pre-filled
  (type it from scratch). The question-type mix per round sets the scaffolding. Name for a round is open
  ("coin" is the working word).
- **Branching**: some points have one node; others open to three nodes the learner can take in any order,
  all three required before moving on. Learners can go forward only so far ahead.
- **Choose your topic**: one of the three nodes can be a pick. About 7 topics shown from a pool of about 30
  (airports, dogs, tree types, Chinese food, cloud types). The chosen topic feeds that node's questions.
- Topic packs are built from checked Tatoeba sentences and reviewed before release.
- **Grammar note** for each unit: a short screen before the lesson with the rule in plain words and two or three
  examples with audio (the old Tips, for example savoir vs. connaître).
- The question tree and the learning tree are worked on separately.

## Side tools (outside the learning tree)

- **Word list / dictionary** of every word met: how well it's known, conjugations, example sentences.
  A mini exercise to test those words, with both modes: matching (recognition) and flashcards (recall).
  Option to say each word out loud.
- **Verb conjugation trainer** with its own mini exercises.
- **Flashcards** from the word list, scheduled with FSRS.

## Settings and habits

- **Listen first**: audio plays with text hidden; text appears after answering. Those questions then feed the
  Listening score, not Reading.
- **Can't listen now / Can't speak now**: pause for 15 minutes or 1 hour, swapped for reading and typing so
  the lesson still counts; a setting turns either off permanently. A swapped question feeds the replacement's
  skill; the swapped-out skill's score doesn't move.
- **Word chips or keyboard** for typed answers.
- **Answer strictness** (see Answer checking).
- **Points and streaks** with an off switch; optional weekly goal (e.g. 4 days a week); no hearts or energy.
- **No notifications at first.** Later: goals in the learner's words (how much to practice, and why, in free
  text); reminders use that sentence; learner picks the time and email or notification, or turns them off.
  The reason shows on the home screen. No guilt after missed days.
- **Light and dark mode.**

## Platform

- One responsive web app, mobile first (most use will be on phones), with a desktop layout.
  Installable to the Home Screen.
- **Next lesson always preloaded** on the device. A lesson runs with no connection.
- Version 1 is Dan only: no sign-in, all progress on the device, nothing to sync.
- Planned for later: profile with screen name and email, authentication, then sync across devices. Screen names
  show in question comments and the forum.

## Mascot and characters

- **Mascot: a piece of tamago sushi with no face.**
- Later: animal characters as speakers in dialogue questions. Squirrels and forest creatures first, octopuses
  later. Placeholder images to start. Leave an image slot in those question layouts now.

## Content phases

- **Phase 1: baseline from free sources** (Tatoeba, Wiktionary, Lingua Libre). Fixed content, reviewed by us.
- **Phase 2: features that need more specific content**, built by us over time (topic packs, more question
  variants).
- **Phase 3: learner-guided content.** Tamago owns the framework and the data shape. The learner steers what
  gets made (a lesson on a weak point, flashcards from pasted words, a test on this week's topics, a text
  rewritten in French with questions). An LLM returns structured data that fits Tamago's question types.
  Conversations with a model happen here, through API calls.
- Note: generated sentences and questions are fine; definitions and conjugations in them still come from Wiktionary.

## Later

- **Version 2: answer flags.** "My answer should be accepted" goes to a review list; approved answers are
  accepted for everyone.
- **Version 3: sentence discussions.** A thread under each question: sentence with audio and translation,
  comment count, threaded replies with up and down votes, report link. Claude screens for spam.
- **Forum**: stub only for now. Each question's thread also lives in a Sentence Discussions section of the
  forum, so a learner can browse discussions by question without being in a lesson. An Unanswered filter.
  Other sections: threads and categories by language; Popular, New and Followed tabs.

## Left out on purpose

From current and recent Duolingo: hearts, gems, chests, Daily Quests, the Super upsell, "Jump here?" skips,
"Perfect lesson" stat screens, character interjections between questions ("5 in a row"), combo counters,
streak commitment screens, the XP nag bar, puzzle and costume events.

## Content

| What | Source | License |
| --- | --- | --- |
| Sentences with translations, some audio | Tatoeba (checked sentences only) | CC BY |
| Definitions, conjugations, grammar, word hints | Wiktionary | CC BY-SA |
| Native pronunciation recordings | Lingua Libre | CC BY-SA |
| Audio for any sentence | Browser text-to-speech | Free |
| Review scheduling | FSRS | MIT |
| Grammar and vocabulary by level (Spanish) | Instituto Cervantes curriculum plan | Free online |
| Grammar and vocabulary by level (French) | To find: French equivalent of the Cervantes plan | To check |
| Images for word to image match | To find: openly licensed image set | To check |

An About the content page carries the credits. Content built from CC BY-SA sources is shared under the same license.

## Where Claude fits

- Checks typed answers and explains mistakes; writes practice sentences from known words; screens discussion posts.
- Facts (definitions, conjugations) come from Wiktionary, never the model's memory.
- A smaller, cheaper model for answer checking, with a daily limit per learner.
- Phase 3 generation (see Content phases).

## Opening it to others

- Dan first, then 5–10 testers learning the same language, then public.
- Minimum age 13; store as little personal data as possible.
- Its own name and look; nothing resembling Duolingo's name, owl or green.

## Name

**Tamago** (Japanese for egg). Mascot is faceless tamago sushi. Progress shows as plain CEFR levels.
Before committing, check the US trademark database (education and software), the domain and app store names.
"Wasabi" is already used by a Japanese language school.

## Documents to build

- **question-types.md**: question types, their variants, how each works off the corpus, and how they phase in
  across the five rounds. Dan wants Fable to take this. Vintage screenshots received November 7.
- **learning-methods.md**: learning philosophy for adults, and methods beyond remediation.
- **duolingo-2012-2017.md**: features Duolingo had and removed. Vintage screenshots received November 7.
- **unmet-needs.md**: user complaints and needs Dan pastes in, logged as they arrive. Started November 7.

## Inputs received

- **The Duolingo Handbook (2025)**: principles that explain the changes Tamago reacts to.
  - The Tree was replaced by the linear Path in 2022. Tamago keeps a tree with choice.
  - Characters are named as Duolingo's moat against AI learning tools. Tamago competes on the learning.
  - Hearts and ad removal drive the paid plan. Tamago has no hearts.
  - Their own handbook says learning outcomes are hard to measure. Tamago uses CEFR per skill as the measure.
  - Useful to keep: "clock speed" applied to time between questions.
- **Current Duolingo desktop, dark mode (November 2026)**: Path, chests, gems, hearts, Super upsell, Daily Quests.
- **X thread of Claude prompts for French learners (November 2026)**: source of the Phase 3 ideas.
- **Vintage Duolingo screenshots (November 7)**: the old tree with strength bars and Practice Weak Skills,
  question types, the answer bar with flag and discuss icons, sentence discussions, the language forums,
  Tips, Can't speak now, the streak calendar.
- **Duolingo Score (Wikipedia, duoplanet)**: 0–160 scale with CEFR bands; score rises as course content is
  completed; French reaches 130. Also from Wikipedia: volunteer course contributors ended March 2021;
  community forums shut down March 2022.
