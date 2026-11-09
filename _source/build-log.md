# Tamago build log

Kept under _source/autonomous-build.md. Newest phase first.

## A1 units 6 to 13, unit icons, deploy pause (November 9, 2026)

**Built**

- Netlify deploys paused at Dan's request (50% of monthly credits): `ignore = "exit 0"` in netlify.toml skips the build on every push. Verified: the live bundle stayed index-86-Nu7X1.js after pushes.
- Unit icons:
  - Dan's 35 sushi images are in _source/icons/{nigiri,maki,temaki}, with 192 px webp copies in public/icons. content/icons.json lists them.
  - scripts/assign-icons.mjs assigns by difficulty over the planned 13 A1 units: 5 nigiri, 4 maki, 4 temaki. Picks are random, used once before any repeat, and kept in content/unit-icons.json.
  - Import fills the units' icon_group and icon_file. A tree node shows its icon; the topic node shows nothing until side art exists.
- scripts/add-a1-units.mjs (v14 to v15) adds:
  - U06 to U13 (Plurals, Adjectives, Possessives, Questions, Numbers, Colours, Time, Places) and words W401 to W480;
  - tree rows 5 to 8 (row 5 after row 3), and can_do CD21 to CD52 with CEFR grid rows.
  - Sense picks: son as the determiner, vert as the adjective, à as the preposition, gentil as "kind".
- Pull: ID bases 7000 to 7700. Live topic packs and the topic node are no longer open to later units; the first pull had used pack words.
- Content: 41 pulled sentences cut, 149 drafts, 32 QT09 pairs (four answer with pulled sentences), 8 grammar notes, OpenMoji pictures for six colours and five places.
- App:
  - checkpoints after rows 6 and 8, labelled "Units 1 to 9" for long runs;
  - Your topic's order moved from 6 to 50, so it doesn't clash with Unit 6.
- Workbook v16. A rebuild from it differs from v15 only in origin, status and hint_source labels.
- Tests: 49 pass (new: every live main unit builds lessons in all five rounds). Browser runs in Chrome and Firefox covered the tree, the Unit 13 card, its note with the aller table, a lesson and placement across 13 units; all earlier regressions pass.

**Decisions**

- The A1 plan is 13 units, so the icon thirds don't move as units are added.
- Gunkan (Ikura, Tobiko, Uni) went in maki, as gunkan-maki, and are listed for Dan.
- Main units never draw on topic-pack words.
- The cuts are listed in check-in.md by kind. Each draft is in check-in.md for the native check (now 303 sentences).

**Waiting for Dan**

- Side art; confirmation of the 512 px set's origin; deploy or the Cloudflare move.

## Phase 5: learner-guided content (November 9, 2026)

**Built**

- Make your own (a Make button on home, in a two-by-two grid with Practice weak skills, Words and Verbs). It covers the feature list's four learner asks:
  - **A lesson on a weak point:** the weakest graded skill by score (reading, listening or writing). Ten of the least-known items, in a type of that skill at the unit's stage.
  - **A test on this week's topics:** sentences answered since Monday (attempts), in each unit's practice type.
  - **Flashcards from pasted words:** French text matched to Tamago's words in any unit, so meanings come from Wiktionary. Unknown words are named "not in Tamago yet". It uses the FSRS flashcards from Phase 3.
  - **Claude-written practice** (netlify/functions/generate.mjs, claude-opus-5-5 at low effort, structured JSON output, server-side refusal fallback "default"). It covers new sentences from the learner's met words, and a QT20 listening exchange (4 to 6 lines, 3 English questions).
- The app re-splits every generated French line with the pipeline's own splitter (scripts/lib/french.mjs) against the learner's met words, plus the course names. Any line with another word is dropped; a listening passage with one bad line is dropped whole.
- Generated sentences run as a session of QT03, QT06 and QT08. They live in the session itself, so a reload keeps them. They're kept out of FSRS strength, the review bank and the skill tally.
- QT20 Listening screen: plays the exchange by device voice (Play, Slowly), questions with right and wrong marks, and the French and English text on request or once answered. It isn't scored.
- Tests: 48 pass (new: generation validation). Browser runs in Chrome and Firefox covered every Make path with the function mocked: two of five generated lines were dropped as expected, nothing generated reached cards or the bank, and needs setup showed without the function. All earlier regressions pass.
- Workbook v14: no content change; changelog row.

**Decisions**

- Three of the four asks need no model, so they work now. Only Claude-written material waits on the key.
- The generation model is the default (Opus 5.5) at low effort: the feature list names the smaller model only for answer checking. The refusal fallback is on ("default"), as the API guidance recommends.
- Generated content is practice the learner asked for. It never changes scores, strength or Review, and it's marked "Written by Claude, not checked by a native speaker".
- Same key rule as Phase 4: TAMAGO_ANTHROPIC_API_KEY only, passed explicitly.

**Stubbed (needs setup)**

- QT21 Conversation: a needs-setup card on Make. It needs the key, plus a design pass (turn-taking, speaking or typing, how mistakes are handled) before it's built.

**Waiting for Dan**

- The same key as Phase 4 turns on both explanations and Claude-written practice.

## Phase 4: accounts and community, the parts that need no account (November 9, 2026)

**Built**

- Native-speaker check kit:
  - Settings, Native-speaker check: the 154 tamago_original sentences one at a time. Each gets Natural or Needs a fix, a corrected French and English, a note, and a recording (kept in kv as a Blob). There is a name for the credits and a CC BY-SA 4.0 consent box.
  - "Save the results" writes one JSON file.
  - scripts/import-native-check.mjs folds the file in:
    - Verdicts go to content/native-check.json.
    - Recordings go to public/audio-native/, converted to AAC .m4a with ffmpeg so iPhones play them, and only with consent.
    - A fix to a draft is written into drafts.json, and import re-checks its words. A fix to a workbook row is listed and held back from the build until applied.
  - The build marks checked sentences "checked by a native speaker" and ships each recording as native_recording. The app plays it before Lingua Libre's or the device voice. About credits the speakers.
- Answer flags, version 2:
  - A flag now carries the answer as given, its direction (en_to_fr or fr_to_en; none for listening types and QT09), the sentence and status.
  - Settings, Flag review: answers to review (Accept or Not right), content issues and bugs.
  - Accepting counts the answer on this device at once (kv approved_answers, applied at startup through addAccepted).
  - "Save for Claude" writes the flags file. scripts/import-flags.mjs adds accepted answers to decisions.accepted_additions (AF0001 on), which ship for everyone at the next deploy and reach the workbook at the next sync. Open flags go to content/flags-inbox.json.
- Profile and backup: a screen name (kv profile), and a backup of every store to one JSON file, with Blobs as data URLs, plus restore. This is how progress moves between devices until sync exists. Email and sign-in show as needs setup.
- Claude explains mistakes: netlify/functions/explain.mjs uses @anthropic-ai/sdk 1.6.0 and claude-haiku-5-5 at low effort.
  - GET reports whether TAMAGO_ANTHROPIC_API_KEY is set; POST answers in one or two sentences, using only the exercise, the accepted answers and the Wiktionary hints sent with it. It refuses other origins.
  - In a lesson, a wrong typed answer asks for an explanation in the background, and the answer bar shows "Why?" only once one has arrived; Continue never waits. There's a cap of 30 a day per device.
  - Settings shows on, or needs setup.
- Discussions and the forum: the answer bar's comment panel says discussions need setup. A Forum screen (Settings) shows the agreed sections (Sentence Discussions with Unanswered, French; Popular, New, Followed) as needs setup.
- Workbook v13: no content change; a changelog row for the new side files.
- Checked in Chrome and Firefox:
  - The Why? link, with the function mocked. Continue shows at once and Why? about a second later. No real API call was made: it costs money and there is no key.
  - Flag, accept and save, then import-flags and the build. AF0001 shipped.
  - The native check, with a fake microphone, then the import and build. The recording shipped as m4a, and the workbook fix was held back.
  - Backup, a full wipe, then restore. The profile, progress, flags and recording came back.
  - Test content was reverted afterwards.

**Decisions**

- Native-check recordings need the checker's explicit consent to CC BY-SA 4.0 (the license the content shares under). Without it they are kept in the file but never used.
- A native fix is never applied silently to a workbook row: the sentence is held back until the workbook holds the fix, so sentence_words stay right.
- Flags from other learners would need a server, so "for everyone" goes through Dan: accept on the device, save the file, Claude imports, deploy.
- The explanation model is the feature list's "smaller, cheaper model for answer checking": Haiku 5.5, at low effort. The prompt forbids definitions and verb forms beyond the hints and answers sent, which keeps to "no facts from model memory".
- There is no loading state in lessons: the explanation is fetched in the background and only a ready one is offered.
- A recording a browser can't play falls back to the device voice.
- The key is Tamago-only (TAMAGO_ANTHROPIC_API_KEY, passed to the SDK explicitly). After the first Phase 4 deploy the live function reported ready, because Dan's Netlify account already holds an ANTHROPIC_API_KEY, apparently from another project. Using it would spend money on a key not given to Tamago, so the fix went live within minutes (3087a22).
- The For Dan tools (Flag review, Native-speaker check, Forum) sit in Settings and stay out of home.

**Stubbed (needs setup)**

- Email, sign-in and sync across devices: need an account service.
- Sentence discussions, the forum and Claude's spam screening: need sign-in and a server.
- Flags arriving from testers' devices: need a server. Until then, a file per tester.
- Claude explanations: need TAMAGO_ANTHROPIC_API_KEY in Netlify. A per-learner server-side limit comes with sign-in.
- 5 to 10 testers: Dan's call.

**Waiting for Dan**

- Setup steps are in check-in.md.

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
