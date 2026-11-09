# Tamago build log

Kept under _source/autonomous-build.md. Newest phase first.

## Phase 3: word list, flashcards, verbs, topic packs, variant bank, checkpoints (November 9, 2026)

**Built**

- Words screen: every word met, with its recall (its own card, else the average of its sentences'), its verb table and its examples. Match (a match-pairs round of met words) and Flashcards (FSRS per word, kept in kv flashcards; graded Again, Hard, Good or Easy; optional say-aloud before turning).
- Verbs screen: Wiktionary present-tense tables for every met verb (checks/conjugations.json, now shipped), and a drill one person at a time, typed and checked with the app's answer rules.
- Review checkpoints after tree rows 2 and 3: ten items from the units above, weakest first, in each unit's practice type. Pass at 70%. They are open once the units finish round 1 and never lock anything (kv checkpoints).
- Variant test bank in Settings: live, testing or off per variant, per browser (kv variant_status), applied over the workbook's status. A type keeps at least one live variant.
- Topic packs: scripts/add-topic-packs.mjs made workbook v11. It holds the node U100 "Your topic" (is_topic_pick node, tree row 4, opens after row 3) and seven packs, U101 to U107 (is_topic_pick yes), from topics_pool: Weather, Family, Home, Music, Coffee shop, Supermarket, The beach. Their words are W301 to W347.
  - The pull (P01 to P09, PACK_TARGET 15) takes words from the main units plus the pack's own, never another pack.
  - 72 Tatoeba sentences and 70 drafts give every pack word 3 or more sentences.
  - The node's card lists the topics; the choice is kept in kv topic_choice. The node then shows the chosen pack, and Change topic switches it, with each pack's progress kept.
- Workbook v12 (sync from v11): pack rows go live, three QT09 fallback rows, and hints with their sources. Rebuilding from v12 alone gives the same app, apart from 25 more generated en_to_fr answers for pack sentences, which every workbook row gets.
- Tests: 46 pass. Packs build lessons in all five rounds and never draw on another pack; choices are distinct across all units; placement covers the main path only. Browser runs: the topic flow in Chrome, Firefox and WebKit; the Phase 2c flows; the side tools; and e2e against the production build.

**Decisions**

- Cuts in the packs (brief: cut idiomatic, misleading or odd):
  - S6003 "Il neige." (neige as a verb).
  - S6007, S6011 and S6014: "Il est (grand, bien) temps" is an idiom.
  - S6010: "Le Soleil" is the astronomical Sun.
  - S6105, S6106 and S6107: mère and père used as forms of address read as old-fashioned.
  - S6108 "Ils sont parents." (relatives).
  - S6111 "Je suis un bébé." and S6507 "Je suis une banane.": odd, like the earlier cut "Je suis un chat".
  - S6112 "La famille, c'est la famille." (idiom).
  - S6310 "C'est une grande chanson." (grande as great).
  - S6406 « Salut. » « Café. » (odd).
- Drafts that the check found already on Tatoeba:
  - S6658 "C'est un grand bateau." is Tatoeba 8693082, so it is now a Tatoeba row. Import accepts source tatoeba on a draft for this.
  - Four drafts duplicated pulled sentences and were reworded: S6051, S6054, S6353, S6558.
- QT09 in a unit with no question pairs (six of the packs) uses new phase1_fallbacks rows: round 3 QT08, rounds 4 and 5 QT12, which keeps the writing skill. workbook-sync keeps these rows live.
- R01 reading: a unit's lessons count only its own words as new; words of earlier units are always allowed. The old reading counted every unmet word, which crashed a pack's first lesson. It could also crash after placement, which credits rounds without marking words met.
- Packs stay off the path (placement, checkpoints, scores, practice) until chosen or started, since they're one choice among seven.
- Distinct choices: a sentence's similar-sentence choices must differ in English and in French. This was found as a React duplicate-key warning in practice, which predated this phase.
- Hints: decisions.claude_hints holds Claude's hints with their source, kept apart from Dan's decisions.hints. They cover neige "snow" (short form), parents "parents" (a Wiktionary sense of parent), and chambre "room" and bateau "boat" (short forms, previously labelled as Dan's).
- Croissant sense: the pick matches "croissant" among Wiktionary's senses (crescent, croissant, crescent moon).

**Stubbed**

- The topic node, like every node, shows its number until unit icons exist.
- Variant bank switches live in the browser only; they aren't written back to the workbook.

**Waiting for Dan**

- Native-speaker check: now 154 sentences (18 in U01 and 136 drafts, listed in check-in.md).
- Phone pass over Unit 6 and the Words and Verbs screens.

## Phase 2c: strength, scores, progress, streaks, placement (November 9, 2026)

**Built**

- Skill strength on FSRS (ts-fsrs 6.0.0, MIT): one card per item, rated by every first attempt in lessons, review, practice and checks (right Good, typo Hard, wrong Again). Each unit node shows 0 to 4 bars from its items' average recall now, falling without practice (R23).
- Practice weak skills on the tree: the ten weakest items across open units, in a type that fits each unit's stage (R24). Points only.
- Per-skill score on the 0 to 160 scale, one decimal, with the CEFR band; a short line on home, the full picture on a new Progress page (R22).
- Progress page: scores and bands, what A1 complete needs, and the "I can" checklist. Each statement ticks only after a three-question check in its skill (R25).
- can_do rows checked against the CEFR A1 self-assessment grid (Europass copy saved in _source/reference) and now shipped.
- Streak and weekly goal (Settings: Points and streaks on/off, Weekly goal none to 7 days), with no reminders and nothing after a missed day (R27).
- Placement check in Settings: three questions per unit; passing units count round 1 as done (R26).
- Workbook v10: can_do cefr_row and cefr_descriptor, lesson_rules R22 to R27.

**Decisions**

- Score rate (open in the feature list): first-time rounds add by each skill's share of the answers actually asked (R12), all A1 rounds reach 29, clears add 0.1, A2 needs all rounds and all checks (R22).
- Placement credits round 1 of the units it places, so their rounds count toward the score like any finished round.
- Misses in placement and in I can checks stay out of the review bank; they test rather than teach.
- Strength bars sit on the unit circle; the five round segments stay below the title.
- The home score line shows the four skills and the reading band; tapping it opens Progress.
- CEFR grid source: the Council of Europe site blocks automated access, so the Europass copy of the same grid is used and kept in the repo.

**Stubbed**

- Practice weak skills draws from sentences only (word cards from match pairs and word to image count toward strength but aren't practised directly).

**Waiting for Dan**

- Nothing new.

## Phase 2b: grammar notes, speaking, word to image (November 9, 2026)

**Built**

- Grammar note before each unit's first lesson, once, and from the unit card any time: the rule in plain words, three examples from the unit's live sentences with audio, and the present tense read from Wiktionary's own conjugation table (être, manger, aimer, avoir). The build fails if an example isn't live or a table can't be read.
- Speaking, never graded: Say it aloud (QT10, V1002: audio, the French behind a tap, Done) from round 1, and Speak and compare (QT13) in rounds 4 and 5: V1301 records you and plays the model and yours side by side; V1302 gives the English, you say it from memory, then compare. Recording stays on the device and is dropped after the question. With no microphone, Done still works. Each counts a point (R14) and stays out of the score and the pass (R05).
- Word to image (QT02): OpenMoji 15.1.0 pictures (CC BY-SA 4.0) for the 19 nouns marked needs_image, saved in the app for offline use and credited on About the content. V0201 French word and three pictures; V0202 English word and four pictures labelled in French.
- Workbook v9: grammar_notes tab, words.image_file, phase1_fallbacks status column (QT09, QT10, QT13 rows off; QT02 kept).

**Decisions**

- Picture set: OpenMoji, because it's openly licensed (CC BY-SA 4.0, credited), covers every needs_image noun and works offline as small SVGs.
- Word to image falls back to Pick the meaning when fewer than 3 pictured words have been met (the first lessons of a unit) or a unit has fewer than 3 pictured words in all, using the QT02 fallback row.
- Units 2 and 3 have no pictured words of their own, so their word to image questions use Unit 1's (R21 allows words from opened units).
- Grammar note rules are mine, in plain words; every example is a live sentence and every verb form comes from Wiktionary.
- Speaking gets no feedback line in the answer bar ("Done."), since nothing is judged.
- The end-of-lesson line counts graded questions only ("8 of 8."), since speaking isn't scored.
- Speak and compare says "Native recording" only where Lingua Libre has one (R11); otherwise "Model".

**Stubbed**

- Grammar note link from the answer bar (learning-methods 15): not built; the unit card has it.

**Waiting for Dan**

- Nothing new.

## Phase 2a: Units 2 to 5, the learning tree, home screen (November 9, 2026)

**Built**

- Import reads workbook v8 (v7 at the start of the phase) and checks tree_layout. Content outside the workbook (decisions, Tatoeba pulls in content/pull, drafts in content/drafts.json) is merged at import and skipped once the workbook holds it.
- Wiktionary check: handles pages split into subpages ("a"), sense picks for the 64 new words in content/word-senses.json.
- scripts/pull-units.mjs: content_pull rules P01 to P09, report in content/pull/review.md.
- scripts/workbook-sync.mjs: folds everything back into the next workbook version, with a README changelog row. v8 written and verified: rebuilding from v8 alone gives the same app content.
- Lesson engine: contentForUnit (own sentences plus borrowed ones, words of this and earlier units, QT09 answers from any unit). Progress, rounds seen and the next-lesson carry are per unit; review spans all units.
- Home: the tree (rows, nodes with an icon slot, five round segments, the current unit's round and lesson), unit cards, locked units, pinned Review and Continue or Resume.

**Decisions**

- Followed Dan's Phase 2a rulings: cuts, U02 words, 4 QT09 pairs per unit, drafts to reach 3 per word, U03 borrows U01's tu/es sentences, five short hints.
- Approved U02 myself under the brief (the newer instruction): 53 sentences, every word in 3 or more.
- The pull's extra rules (names, digits, articles, noun meaning, plainest English) and why: the first pull let in places, star signs and pronoun uses of le that would teach the wrong thing.
- Hints for words without one: Wiktionary's gloss, or for a verb form "to eat (manger)". hint_source says Wiktionary.
- Node icon slot shows the unit number until unit icons exist.
- Starting another unit while a lesson is in progress sets the lesson aside, and the card says so.

**Stubbed**

- Grammar note button on the unit card (Phase 2b).

**Waiting for Dan**

- Reading the new units; the native-speaker check list (84 sentences); hosting move off Netlify.
