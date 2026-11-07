# Tamago: learning methods

Draft 1, November 7, 2026. How Tamago teaches adults, and the methods it uses beyond remediation. Each method
says where it fits in the app. IDs match the workbook. Meanings and conjugations stay out of this document; they
come from Wiktionary.

## 1. Philosophy

1. **Memory is built by pulling things out of it.** Answering from memory teaches more than reading the answer
   again. Most of a lesson is the learner producing or choosing an answer, not looking at material.
2. **Forgetting is part of the design.** An item that comes back after a gap and takes effort to recall gets
   stronger. Getting everything right in one sitting feels good and proves little.
3. **Adults can use a rule when told it.** Tell them the rule briefly, then get them practicing. Don't make them
   guess it from examples, and don't lecture.
4. **Language is sound first.** A learner who only reads French builds wrong sounds in their head. Every French
   sentence should be heard, and speaking should start early. French spelling is a poor guide to its sound, which
   makes this matter more.
5. **Help fades.** The five rounds move from recognition to recall. Each round should remove support, and the
   last round should have none.
6. **Practice has to look like use.** Translation drills build knowledge, not the ability to take part in a
   conversation. Learners also need to understand and say things for their meaning.
7. **Adults run their own learning.** They have a reason for being here and limited time. Give them a choice of
   topic and honest progress. Never use guilt, pressure or rewards as the reason to continue.
8. **Measure what lasts.** The useful number is whether something can be recalled a day or more later, not the
   score in the lesson.

## 2. Where Tamago stands now

Paul Nation's four strands are a useful check. He recommends a course give roughly equal time to each.

| Strand | What it is | Tamago now | Gap |
| --- | --- | --- | --- |
| Language-focused learning | Deliberate study of words, sounds, grammar | The 10-minute lesson, grammar notes, side tools | Strong |
| Meaning-focused input | Reading and listening to understand a message | Single sentences; QT20 is planned for later | Weak |
| Meaning-focused output | Saying or writing something to communicate | QT09 only; QT21 is planned for later | Weak |
| Fluency | Using what is already known, easily and quickly | Nothing | Missing |

The lesson stays the core, and it should not grow to fill these gaps. Methods 10 to 13 add the other strands in
small pieces around it.

## 3. Methods

### Inside the lesson

**1. New-word limit.** Introduce no more than about 4 new words in a lesson, and use a sentence only when its other
words have been met. Too many new items at once means none get learned.
- *Fits:* lesson builder, round 1. Show the meaning beside a new word at first sight.
- *When:* now. In the current build, 16 to 18 of Unit 1's 18 words appear in the first round 1 lesson.

**2. Cumulative slots.** From Unit 2 on, 2 of every 10 questions come from earlier units, chosen by what is most
overdue on the FSRS schedule. Old material then returns without the learner choosing to review it. Mixing old and new
also makes the learner work out which form or rule applies, which blocked practice doesn't demand.
- *Fits:* lesson builder, rounds 2 to 5. Round 1 stays on the current unit. The research supports blocking first and
  mixing after, and a purely random mix has not always helped.
- *When:* Phase 2, as soon as Unit 2 exists.

**3. Contrast practice.** When a unit has a grammar point, make the wrong choices test it. The learner should have to
choose between un and une, or suis and es, rather than rule out an unrelated word. Learning happens when the learner
has to notice the difference.
- *Fits:* distractor rules for QT05, QT07 and QT08. Use the unit's grammar_point to choose the contrast.
- *When:* now. Today, the other article appears in only about 7% of round 3 chip questions on un or une sentences.

**4. Sound with every sentence.** Play the French when the answer bar appears, on every question type. The learner
connects spelling to sound many times with no extra screens. The audio must never hold up the next question.
- *Fits:* answer bar. Off under Can't listen now.
- *When:* now. Today, QT05, QT08 and QT12 can pass with the learner never hearing the sentence.

**5. Aloud, some of the time.** Saying a word aloud helps memory more than reading it silently. The benefit is
strongest when spoken items are mixed with silent ones, and it fades when everything is spoken. One or two spoken
items in 10 fits well.
- *Fits:* QT10 from round 1, as "say it, tap Done" with no recording. This adds almost no time and needs no microphone.
- *When:* Phase 2, with the other speaking types.

**6. Speech from memory.** Repeating a sentence just heard trains the mouth, not recall. The learner also needs to see
an English prompt, say the French from memory, then play their version beside the model. This is the practice closest
to real speech, and it stays ungraded.
- *Fits:* QT13 in round 5, with QT10 and the side-by-side comparison carrying rounds 1 to 4.
- *When:* Phase 2. Needs real recordings as the model; only 5 of 36 live sentences have one.

**7. Explain the error.** A rule can catch many errors without a model: wrong article, wrong verb form, missing word,
word order. Name the type in one short line in the answer bar and link to the unit's grammar note. Don't add an
explanation screen. Feedback that shows what went wrong helps more than a bare right or wrong.
- *Fits:* answer bar, typed and chip answers. Rule explanations come from the grammar note and Wiktionary, not model
  memory. Claude explanations join in Phase 4 as planned.
- *When:* the rule-based version in Phase 2.

### Around the lesson

**8. Spaced rounds.** Five rounds in one day gives far less than the same rounds across several days. Nothing locks.
The home screen should recommend the review that is due first, and say plainly that the next round works best
tomorrow. A learner who wants to continue can.
- *Fits:* home screen and tree. Skill strength bars show the same schedule.
- *When:* Phase 2.

**9. Relearning on separate days.** An item should leave the review bank after three correct answers on three
different days, not three in a row. A missed item also returns in the next lesson at its original difficulty, since a
correct answer on an easier re-ask shows little about recall. This is the direct follow-up to remediation.
- *Fits:* review bank exit rule; one slot in the next lesson.
- *When:* now. It's a small change to the bank, and today three review sessions in a row clear an item.

**10. Short known-word passages.** After a node's round 3, offer a few connected lines, as text and audio, built only
from words the learner has met. One comprehension question follows. This is the first time they read or hear French
as a message instead of a test item.
- *Fits:* optional item at the end of a node, outside the 10-minute block. This is a small early form of QT20. Lines
  come from checked Tatoeba sentences or are written and reviewed like other content. Generated versions come in
  content Phase 3.
- *When:* Phase 3. Unit 1's vocabulary is too small to make these interesting; start at about Unit 3.

**11. Say something true.** At the end of a unit, give a prompt the learner answers about themselves, such as a
greeting and who they are, by typing or speaking. It isn't graded. The learner sees model sentences from the unit
afterward. Producing something real shows them what they can't yet say, and that drives attention to the next lesson.
- *Fits:* unit end, tied to the can_do statements (CD03, CD04 in Unit 1). Claude can comment on it in Phase 4.
- *When:* Phase 2 without feedback from Claude.

**12. Answer real questions.** QT09 is the only lesson question that isn't translation. Any answer that truly fits the
question must be accepted, or it teaches the wrong lesson.
- *Fits:* QT09, with more pairs per unit and several accepted answers for each.
- *When:* Next after Phase 1. It needs no microphone, so it doesn't have to wait for the speaking types.

**13. Easy and quick.** Fluency comes from using known material without strain. Offer an optional run through mastered
sentences in a node: listening or reading, as many as the learner wants. No timer shows and nothing is scored, in
keeping with the no-timer rule. It earns points but no score, as repeated content already does.
- *Fits:* side tool, opened from a completed node.
- *When:* Phase 3.

**14. Hearing drills.** Short drills where the learner tells apart two similar sounds, heard from several different
voices, with immediate feedback. Perception training improves hearing and, to a smaller degree, pronunciation.
Hearing a sound from several speakers is the established way to do it.
- *Fits:* side tool using sound pairs from the current unit, under two minutes. Must use real recordings from several
  speakers (Lingua Libre). Browser speech isn't good enough here.
- *When:* Phase 3, depending on how many recordings exist. Drop it if the recordings aren't available.

**15. Short grammar notes.** One screen before a unit, as the feature list already plans. Add two things: the note can
be skipped, and it stays reachable from the answer bar when the learner needs it. Explicit teaching outperforms
implicit teaching in the research, and adults want the rule at the moment they get it wrong.
- *Fits:* unit start, answer bar link.
- *When:* Phase 2.

**16. Whole phrases first.** Teach common phrases as single units before taking them apart. The workbook already does
this with au revoir (W003). Extend it to useful phrases in each unit, so a learner can use them before knowing the
grammar inside them.
- *Fits:* the words and sentence_words tabs, as a content rule.
- *When:* from Unit 2 authoring on.

### Motivation and honest progress

**17. Can-do checks that test something.** Learners are poor judges of what they've learned, and repetition makes this
worse because material feels familiar. Tie each "I can" statement to a short task, and only tick it after the task:
hear it and understand it, or say it from memory and compare.
- *Fits:* progress page, unit end. Links to methods 6 and 11.
- *When:* Phase 2, when can_do ships.

**18. A plan, not just a goal.** Ask for the reason in the learner's own words, as already planned, and add one
when-and-where line: "After I pour my coffee, I do one lesson." If-then plans of this kind help people follow through.
The effect is smaller than first reported, but the cost here is one line of text.
- *Fits:* goal setting, home screen.
- *When:* with the planned goals feature.

**19. Expect a long start.** Habits take weeks to months to form, and a missed day doesn't undo the progress. A missed
day leads with the review due, with no message about the absence. This backs up what the feature list already says
about guilt.
- *Fits:* home screen, streak and weekly goal wording.
- *When:* Phase 2.

**20. Real choice.** Choosing a topic gives adults a reason to care about the content. Keep the choose-your-topic node
and the free ordering of branch nodes, since these are what separate a tree from a path.
- *Fits:* tree, as planned.
- *When:* Phase 3, as planned.

### Tuning

**21. Measure retention, then tune.** The attempts table already holds what's needed:
- **Delayed recall:** first-attempt correct on an item's next appearance at least one day later, by question type and
  variant. This is the main measure for deciding what stays in the mix.
- **Difficulty:** first-attempt correct per round. Keep it between about 70% and 90%. Under that, the round is too
  hard and failed lessons pile up. Over that, it isn't removing enough help. These limits are a starting rule based on
  the 7 of 10 pass mark, not a research finding.
- **Lesson time:** the gaps between answered_at values show how long a lesson takes, by round.
- **Hints:** hint taps per word, from hints_log, to find words that need more practice.

Use the variant test bank for comparisons. Dan alone can't show which variant is better. These numbers become useful
with the 5 to 10 testers.

## 4. What to leave out

- **Learning styles.** No "visual learner" settings. Matching teaching to a claimed style has weak evidence. All
  learners need sound and text.
- **Input alone.** Listening and reading alone won't produce speech. Adults also benefit from direct teaching.
- **Machine-graded pronunciation.** Tamago's rule stands. Scoring is unreliable and discourages people from speaking.
- **Speed pressure.** Fluency practice stays optional and untimed.
- **Long explanations in the lesson.** They break the 10-minute rhythm. Notes stay short and optional.
- **Rewards as the reason to continue.** This is already in the feature list; it is also the point of principle 7.

## 5. Order of work

1. **Now, small:** new-word limit (1), contrast practice (3), sound with every sentence (4), relearning on separate
   days (9).
2. **Next after Phase 1:** QT09 with real accepted answers (12).
3. **Phase 2:** cumulative slots (2), aloud (5), speech from memory (6), explaining errors (7), spaced rounds (8), say
   something true (11), grammar notes (15), can-do tasks (17), wording for missed days (19).
4. **Phase 3 and later:** passages (10), easy and quick (13), hearing drills (14), choice of topic (20).
5. **Ongoing:** whole phrases (16), measuring (21).

## 6. How firm this is

Most of this research comes from labs and classrooms, not from apps or from A1 French. It tells us the direction, not
the numbers. The limits here (4 new words, 2 cumulative slots, 70% to 90%) are starting points to tune. Three findings
are less settled than they sound:

- **Guessing before being told.** Some studies find that guessing a new word's meaning and then seeing the answer
  beats plain study, but later work limits or questions this for foreign vocabulary. So Tamago shows a new word's
  meaning at first sight instead of relying on guessing.
- **Interleaving.** It has good support for grammar and verb forms, but one study found no gain from a random or a
  simple alternating schedule. It depends on how the mix fits the task.
- **Retrieval versus restudy.** Testing beats restudy, though later work questioned how little the 2008 study found
  restudy adding. Tamago doesn't depend on that detail.

The sources below were checked to exist, and their main claims checked through abstracts or papers that cite them. The
full papers weren't read. The exception is Li (2010): the paper was confirmed, but its finding here comes from memory.

## 7. Sources

- Cepeda, Pashler, Vul, Wixted & Rohrer (2006). Distributed practice in verbal recall tasks. *Psychological Bulletin*
  132. Method 8.
- Goo, Granena, Yilmaz & Novella (2015). Implicit and explicit instruction in L2 learning. In *Implicit and Explicit
  Learning of Languages*, Benjamins. Method 15.
- Gollwitzer & Sheeran (2006). Implementation intentions and goal achievement. *Advances in Experimental Social
  Psychology* 38. Sheeran, Listrom & Gollwitzer (2024) report smaller estimates after correcting for bias. Method 18.
- Karpicke & Roediger (2008). The critical importance of retrieval for learning. *Science* 319. Principle 1.
- Lally, van Jaarsveld, Potts & Wardle (2010). How are habits formed. *European Journal of Social Psychology*. Small
  sample, wide spread between people. Method 19.
- Li (2010). The effectiveness of corrective feedback in SLA. *Language Learning* 60(2). Method 7.
- MacLeod, Gopie, Hourihan, Neary & Ozubko (2010). The production effect. *Journal of Experimental Psychology:
  Learning, Memory, and Cognition* 36(3). Method 5.
- Nakata & Suzuki (2019). Mixing grammar exercises facilitates long-term retention. *The Modern Language Journal*
  103(3). Method 2.
- Nation (2007). The four strands. *Innovation in Language Learning and Teaching* 1(1). Section 2.
- Norris & Ortega (2000). Effectiveness of L2 instruction. *Language Learning* 50(3). Method 15.
- Pan, Tajran, Lovelett, Osuna & Rickard (2019). Does interleaved practice enhance foreign language learning?
  *Journal of Educational Psychology* 111(7). Method 2.
- Potts & Shanks (2014). The benefit of generating errors during learning. *Journal of Experimental Psychology:
  General*. Section 6.
- Rawson & Dunlosky (2011). Optimizing schedules of retrieval practice for durable and efficient learning.
  *Journal of Experimental Psychology: General* 140. Method 9.
- Sakai & Moorman (2018). Can perception training improve the production of second language phonemes? *Applied
  Psycholinguistics* 39(1). Method 14.
- Uchihara, Karas & Thomson (2025). High variability phonetic training: a meta-analysis of L2 perceptual training
  studies. *Studies in Second Language Acquisition*. Method 14.
