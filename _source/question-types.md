# Tamago: question types and question logic

Draft 2, November 7, 2026. Updated from the learning review. How a sentence becomes a question, which question
types exist, and how they phase in across the five rounds of a skill node. Table IDs match tamago-data-v4.xlsx.

## 1. The building blocks

A question is built from four parts:

| Part | What it is | Workbook tab |
| --- | --- | --- |
| Item | A sentence, or a single word, from the unit's content | sentences, words |
| Question type | What the learner does (match, build, type, listen, speak) | question_types |
| Variant | One way of doing that type | variants |
| Direction | French to English, or English to French | set per question |

One sentence feeds many questions. "Je suis une femme." can be a word match, a chip build, a typed translation,
a listening question and a spoken answer, each in a different round.

## 2. Question types

Each type trains one main skill. The skill decides which score the question feeds.

| ID | Type | Main skill | Kind | Rounds |
| --- | --- | --- | --- | --- |
| QT01 | Match pairs: French words and meanings on one screen | Reading | Recognition | 1–2 |
| QT02 | Word to image | Reading | Recognition | 1–2 |
| QT03 | Pick the meaning: a French sentence, pick the English | Reading | Recognition | 1–3 |
| QT04 | Pick what you heard: audio plays, pick the English meaning (V0404) or the matching clip | Listening | Recognition | 1–3 |
| QT05 | Fill in the blank with chips | Reading | Recognition | 2–4 |
| QT06 | French to English: chips, or typed in round 5 (V0602) | Reading | Recognition to recall | 2–5 |
| QT07 | Tap what you hear: build the French with chips | Listening | Partial recall | 2–5 |
| QT08 | Build the translation, English to French, with chips | Writing | Partial recall | 3–5 |
| QT09 | Answer the question: a speaker asks, the learner answers | Writing | Partial recall | 3–5 |
| QT10 | Repeat what you hear: say it aloud. Never graded | Speaking | Imitation | 1–4 |
| QT11 | Type what you hear | Listening | Recall | 4–5 |
| QT12 | Type the translation, English to French | Writing | Recall | 4–5 |
| QT13 | Speak: imitation (V1301), or from an English prompt with no audio first (V1302). Never graded | Speaking | Recall | 4–5 |

Rounds include re-asks: a type can appear one round after its last mix round.

When Listen first hides the French, QT03 and QT06 feed Listening, not Reading.

Speaking types are never graded. They count as done when the learner says the sentence once. V1002 needs no
recording: say it, tap Done.

Later, outside the 10-minute block: QT20 listening comprehension and QT21 conversation (Phase 3, through the API).

## 3. Variants

Every type has at least one variant. All variants stay in a test bank with a status: live, testing or off.
Nothing is deleted. Key variants:

- V0404: audio plays, pick the English meaning. Main QT04 variant in rounds 1 and 2.
- V0602: read the French, type the English. Round 5, so reading reaches recall.
- V0903: QT09 with the question written out, for Can't listen now.
- V1002: say it aloud, no recording.
- V1302: English prompt, say the French from memory, then play both. Round 5.

The full list is in the variants tab.

## 4. The five rounds

| Round | Name | Mix | Reading / Listening / Writing / Speaking |
| --- | --- | --- | --- |
| 1 | Exposure | QT01 2, QT02 2, QT03 2, QT04 3, QT10 1 | 6 / 3 / 0 / 1 |
| 2 | Guided | QT03 1, QT04 2, QT05 2, QT06 2, QT07 2, QT10 1 | 5 / 4 / 0 / 1 |
| 3 | Build | QT05 2, QT07 2, QT08 3, QT09 1, QT10 2 | 2 / 2 / 4 / 2 |
| 4 | Partial recall | QT06 1, QT07 1, QT08 1, QT09 1, QT11 2, QT12 2, QT13 2 | 1 / 3 / 4 / 2 |
| 5 | Recall | QT06 1, QT09 2, QT11 2, QT12 3, QT13 2 | 1 / 2 / 5 / 2 |

Choices: 3 in rounds 1 and 2, 4 in round 3, none after. Round 4 has fewer chip questions, each with more
distractors. Round 2 gives QT07 one distractor chip, the contrast word.

## 5. How a lesson is put together

1. Take the node's items and the current round.
2. New words: no more than 4 per lesson. A sentence is used only when its other words have been met. Use the
   4-pair QT01 variant when fewer than 5 words are available.
3. A missed item from the last lesson fills one slot, at its original type.
4. For each item, pick a type allowed in this round that the item can support: word to image needs an image,
   listening needs audio, answer the question needs a row in qa_answers.
5. Pick a live variant, rotating so the same variant doesn't repeat back to back.
6. Distractors: at least one wrong chip is a contrast from the unit's contrast_sets (un/une, suis/es). Others
   come from the same unit, same part of speech and gender where possible.
7. No type more than 3 times, counted before swaps and fallbacks.

## 6. Answering, remediation and review

- **First sight**: a new word's meaning shows the first time. On QT01, a wrong tap on a new word isn't a miss.
- **Pass mark**: first attempts count. Speaking earns a point but isn't graded. Pass is 70% of graded
  questions, rounded up.
- **Re-asks**: a miss returns at the end of the lesson as a different type. A wrong re-ask shows the answer and
  the lesson moves on; the item stays in the bank.
- **Under the pass mark**: the lesson doesn't count and restarts with the same items in new types.
- **Review bank**: misses in rounds 2 to 5 go in. Round 1 misses and hinted words don't. An item leaves after
  three correct answers on three different days.
- **Hints** never cost a strike and are always logged.
- **Answer bar**: the French plays on every question when the bar appears, without blocking Continue.

## 7. Answer checking (rule-based, no API in version 1)

- Normalize: lower case, trim, collapse spaces, ignore final punctuation and the space before ? and !.
- Check against the main sentence and every live accepted answer.
- QT09 accepts any answer listed for the question in qa_answers.
- Lenient by default: one-letter typo accepted on words of 3 letters or more, if the typo isn't another known
  word. Missing accent accepted at A1 and pointed out. Strict setting: no typos, accents required.

## 8. Swaps

- Can't listen now and Can't speak now swap types per the cant_swaps tab.
- Phase 1 swaps types not built yet per the phase1_fallbacks tab. Build QT09 before the speaking types.
- A swapped question feeds the replacement's skill. The swapped-out skill doesn't move.

## 9. Open items

- Name for a round ("coin" is the working word).
- Lesson time: log it by round to check whether 10 questions fills 10 minutes.
- The limits (4 new words, 70% pass) are starting numbers, to tune after use.
