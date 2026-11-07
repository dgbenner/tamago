# Tamago: question types and question logic

Draft 1, November 7, 2026. How a sentence becomes a question, which question types exist, and how they phase in
across the five rounds of a skill node. Table IDs match the workbook (tamago-data.xlsx).

## 1. The building blocks

A question is built from four parts:

| Part | What it is | Workbook tab |
| --- | --- | --- |
| Item | A sentence, or a single word, from the unit's content | sentences, words |
| Question type | What the learner does (match, build, type, listen, speak) | question_types |
| Variant | One way of doing that type (audio choices vs. text choices, for example) | variants |
| Direction | French to English, or English to French | set per question |

One sentence feeds many questions. "Je suis une femme." can be a word match, a chip build, a typed translation,
a listening question and a repeat-after-me, each in a different round.

## 2. Question types

Each type trains one main skill. The skill decides which score the question feeds.

| ID | Type | Main skill | Recognition or recall | First round |
| --- | --- | --- | --- | --- |
| QT01 | Match pairs: French words and meanings on one screen, tap to pair | Reading | Recognition | 1 |
| QT02 | Word to image: a word at the top, pick the image | Reading | Recognition | 1 |
| QT03 | Pick the meaning: a French sentence, pick the English from 3 or 4 | Reading | Recognition | 1 |
| QT04 | Pick what you heard: audio plays, answer choices are speaker buttons | Listening | Recognition | 1 |
| QT05 | Fill in the blank with chips: one word missing, pick the chip | Reading | Recognition | 2 |
| QT06 | Build the translation, French to English, with chips | Reading | Recognition | 2 |
| QT07 | Tap what you hear: audio plays, build the French with chips | Listening | Partial recall | 2 |
| QT08 | Build the translation, English to French, with chips | Writing | Partial recall | 3 |
| QT09 | Answer the question: a speaker asks, the learner answers (chips in round 3, typed in round 5) | Writing | Partial recall | 3 |
| QT10 | Repeat what you hear: audio only, text behind a reveal button, then speak. Never graded | Speaking | Recall | 3 |
| QT11 | Type what you hear: audio plays, type the French | Listening | Recall | 4 |
| QT12 | Type the translation, English to French, keyboard | Writing | Recall | 4 |
| QT13 | Speak and compare: record yourself, play both side by side. Never graded | Speaking | Recall | 4 |

Later, outside the 10-minute block: QT20 listening comprehension (one audio scenario, several short typed
answers) and QT21 conversation (Phase 3, through the API).

Speaking types are never graded. They count as done when the learner records once. They can be skipped with
Can't speak now, and the lesson still counts.

## 3. Variants

Every type has at least one variant. All variants stay live in a test bank; none are deleted. A variant has a
status: live, testing or off. Examples:

- QT02 word to image: (a) French word, pick the image; (b) English word, four images labeled in French.
- QT04 pick what you heard: (a) 3 speaker buttons; (b) 4 speaker buttons; (c) text appears after the second play.
- QT05 fill in the blank: (a) plain sentence; (b) blank inside a speaker's dialogue bubble; (c) chip is part of a
  word instead of a whole word.
- QT07 tap what you hear: (a) chips include distractors; (b) chips are only the needed words, in random order.

The full list is in the variants tab.

## 4. The five rounds

Each skill node runs the same content five times. Help drops each round.

| Round | Name | What changes | Types used | Choices |
| --- | --- | --- | --- | --- |
| 1 | Exposure | Every word is new and tagged. Recognition only | QT01, QT02, QT03, QT04 | 2 to 3 |
| 2 | Guided | Chips appear. Sentences are short | QT03, QT04, QT05, QT06, QT07 | 3 to 4 |
| 3 | Build | English to French starts, with chips. Speaking starts | QT05, QT07, QT08, QT09, QT10 | 4, plus 2 distractor chips |
| 4 | Partial recall | Typing starts. Fewer chips, more distractors | QT07, QT08, QT11, QT12, QT13 | 4, plus 4 distractor chips |
| 5 | Recall | Keyboard only. Nothing pre-filled | QT09 typed, QT11, QT12, QT13 | none |

The round_type_mix tab holds the share of each type per round. Rule of thumb: 10 questions per lesson, no type
more than 3 times, and at least one listening question in every lesson.

## 5. How a lesson is put together

1. Take the node's items and the current round.
2. Pick 10 questions: new items first in round 1, then items the learner has seen least.
3. For each item, pick a type allowed in this round that the item can support:
   - word to image needs an image;
   - listening types need audio (Lingua Libre or browser speech);
   - answer the question needs a question and answer pair (pair_id in the sentences tab).
4. Pick a live variant of that type, rotating so the learner doesn't see the same variant twice in a row.
5. Build distractors from words in the same unit, same part of speech and same gender where possible.

## 6. Answering and remediation

- **First attempts count.** The lesson score is first-attempt correct answers out of 10. Pass is 7.
- **A miss goes to the end of the block** and comes back once as a different type, either the same round's
  type or one round easier (for example, a missed QT12 typed translation returns as QT08 with chips).
  The re-ask does not change the score. It must be answered before the lesson ends.
- **Every miss goes to the review bank.** It leaves after three correct answers in review.
- **Under 7**: the lesson doesn't count and restarts right away with the same items in new types.
- **Hints** never cost a strike. Each hint is logged; hinted words go to review.

## 7. Answer checking (rule-based, no API in version 1)

- Normalize: lower case, trim, collapse extra spaces, ignore final punctuation.
- Check against every accepted answer for the sentence (accepted_answers tab).
- Default (lenient): one-letter typo accepted, with the correct spelling shown. Missing accent accepted at A1
  and pointed out. A wrong word is a miss.
- Strict setting: no typos, accents required.

## 8. Phasing across levels

- A1 rounds use 2 to 4 choices and short sentences (up to about 6 words).
- New types join as the learner moves up, not all at once. At A1, QT20 and QT21 are off.
- Choices and sentence length grow with level. Exact numbers per level are open.

## 9. Open items

- Name for a round ("coin" is the working word).
- Points earned per question.
- Exact mix per round, to tune after Dan uses it.
- This draft can go to Fable for a second pass.
