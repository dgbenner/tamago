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

## Hosting moved to Cloudflare Pages (2026-11-09)

- Dan connected the repo to a Pages project (tamago, https://tamago-83f.pages.dev): build `npm run build`, output `dist`, NODE_VERSION 22. Push to main deploys.
- Functions ported: server/explain.mjs and server/generate.mjs hold the handlers as handle(req, key); functions/api/*.js (Pages) and netlify/functions/*.mjs (old host) are thin wrappers. The client calls /api/explain and /api/generate. The SDK runs in workerd without nodejs_compat (checked with a fake key under wrangler pages dev: AuthenticationError, 503 key).
- public/_headers keeps sw.js no-cache; Pages' default SPA fallback replaces the Netlify redirect. _headers and _redirects stay out of the precache list.
- Bug found on the first live run: Pages answers /index.html with a 308 to /, the service worker precached the redirect, and a reload failed (ERR_FAILED). The page is now precached and served as /. Offline reload checked in Chrome and Firefox.
- Live checks (Chrome and Firefox): home tree, A1 lessons and placement, the lesson e2e, Phase 4 backup and restore, Phase 5 makers (test mocks moved to /api). No page errors.
- Netlify: stop_builds set to true through the API; the site was not deleted.

## Craft review fixes (2026-11-09)

A separate session ran `_source/craft-review.md` on the live site (report and 168 screenshots in `_review/2026-11-09/`; overall 3.7). Dan accepted the twelve fixes with changes to the top five, all applied:

- **Match pairs:** pairs still animate out; the last pair now leaves like the others (the answer bar waits 280 ms) and the first-sight line clears, so nothing is left on the board. A mistap on a seen word gives the incorrect bar, "Not quite." and the pair itself ("enfant = child"). The bar no longer treats pairs as always right.
- **One place for Check:** a `.check-row` under the answer area on every type. On a phone with no keyboard up it pins to the bottom (`.action-row`); typed answers keep it under the field; at 768 px and up it never drifts to the bottom of the window.
- **Points:** plain muted text top left ("14 points"); the coin and the blue pill are gone.
- **Feedback voice:** "Clean." (FB06) and "Spot on." (FB05) retired through `review-decisions.json` → `phrases_off`; build-content skips them and workbook-sync sets them off in the next version. French lines stay. The Why? prompt now speaks to the learner ("You wrote…").
- **Score line:** "Very early A1 · Progress ›" (the band of the skill furthest behind); the four numbers stay on the progress page.
- Unit indicators: the strength bars are gone; finished-round pills fade with the unit's recall (4 bars full, 1 bar 30%).
- New-word dot sits on the word as a superscript, in sentences and on the word-to-image prompt.
- Headings: "Listen and pick the meaning" / "Listen and translate" while the French is hidden; "Type what you hear" when a chip question is switched to the keyboard.
- Typo and accent: the differing letters are marked in the shown answer (`diffMarks` in check.js, with tests).
- Topic sheet kicker reads "Choose a topic" until a pack is chosen.
- A passed lesson returns straight to home, where "Last lesson: 8 of 9." shows above Review until the next session starts. Failed lessons, checkpoints, reviews and checks keep their own line.

Checked on the local build with Playwright: mistap bar, home return with the score line, both headings, the accent mark; `npm test` 53 passing.

## Dan's test notes, Pass 1: all devices (2026-11-09)

Notes saved to _source/test-notes.md. Decisions at their top settle the open choices.
- Workbook v17: every unit retitled to 2 or 3 words in Title Case (topic packs too).
- Opening screen: each stroke timed by its measured length inside one easeInOutSine curve per letter (no stop at joints); 260 ms a letter, 90 ms stagger, held about 2.4 s; the screen fades in 180 ms while the home header logo rises from below (720 ms ease-out).
- Logo: logo.png (342 KB) replaced by logo.webp (17 KB, preloaded, 3:2 box reserved), so nothing shifts as it loads. The PNG moved to _source/logo-app.png.
- Home: pinned short header and footer, each with a 2 px line; points chip in one style at every value; tools as a sideways tile strip (Words renamed Glossary, Make renamed Self-Study, Practice weak skills folded into Practice); level in italics plus Progress as a tertiary button; "Starting Out" until round 1 of a first unit, then markers Very Early A1, Early A1 (after row 3), High A1 (after row 6), A2 (end), placed where the units above reach score.js's 10 and 20 of 29.
- Tree: rounds as a five-segment ring (strength fades the filled segments), bigger icons (64 px in a 96 px circle), lock for locked units, "?" for Your Topic until chosen, titles only, tighter spacing; the current unit has an orange halo. Locked details explain by title what opens it. Checkpoints: small, checkered flag, "Checkpoint"; their sheet lists the units and has Start and Skip (kv checkpoints_skipped; never locks).
- Practice: the review bank first, topped up to ten with the weakest items; never disabled (with nothing yet, it explains and offers the next lesson). Next Lesson: <unit title> resumes or starts.
- Lesson intro: "Before You Start", a plain sentence on what the screen is, and the unit's new-word count with examples; Start Lesson.
- In lessons: a faint Can't Listen Now / Can't Speak Now at the bottom of listening and speaking questions; pauses for an hour and swaps the current and remaining questions (lesson.js swapRemaining, by cant_swaps).
- Settings in sections: Lessons, Sound and Look, Goals, Your Learning, Testing (For Dan). Title Case across screens.
- Phone: root font 17px. Audio: Lingua Libre recordings levelled to -16 LUFS on every content build (cached originals in .cache/recordings; short clips need exact gain plus a limiter, since loudnorm can't adapt under 3 s); native-check recordings get the same on import. Spread before: -26.6 to -18.2 LUFS; after: -17.4 to -16.0.
- Checked: 53 unit tests; Chrome and Firefox at phone size: intro, Can't Listen Now swap and setting, a lesson to the end, placement, level markers, Practice; no page errors.

## Dan's test notes, Pass 2: desktop and iPad (2026-11-09)

- One breakpoint, 1024px: desktop and iPad in landscape. Phones turned sideways (up to about 932px) keep the phone layout.
- Header: sushi plus wordmark on the left, points and settings on the right, tighter strip.
- Home in two columns: the path (with its pinned Practice and Next Lesson, side by side) and a sticky right-hand panel. The panel lists Glossary, Verbs, Self-Study and Progress with a line each; a tool opens inside the panel (App's panelScreens render the same screen components; .panel-screen strips their page frame) and Back returns to the list. The path keeps its scroll position while panel screens change.
- Unit, checkpoint and Practice details: centred pop-ups (the phone keeps the bottom sheet).
- Lessons: wider column, bigger headings, choices and chips, more space between parts. Root font 17px on wide screens too.
- Settings: the sections in two columns.
- iPad landscape only: a touch screen 744px or wider held in portrait shows "Turn your iPad sideways". The manifest's orientation can't be set per device, so this is in the page.
- Checked in Chrome and Firefox: desktop 1440x900 (panel opens Glossary in place, Back, pop-up centred, buttons side by side, lesson, settings), iPad 1180x820 landscape (two columns, no note), 820x1180 portrait (note), phone landscape 844x390 (phone layout, no note); the Pass 1 phone flow again; 53 unit tests. No page errors.

## Dan's test notes, Pass 3: the Glossary (2026-11-09)

- Words became the Glossary (src/screens/Glossary.jsx). It opens on the learner's own words with a status each: Learned, Missed, Fading, Not Yet. "Show All A1 Words" adds the rest of the level (209 words, main units then the topics, grouped by unit title); A2 waits for its content.
- Missed needed new data: kv word_misses (word_id to date). A first answer records a miss for the mismatched word in Match the Pairs (not on first sight, as before), the word in Pick the Picture, or each word of the sentence that a French answer (typed or built; not Answer the Question, whose answer is another sentence) left out. Choices between whole sentences can't say which word was wrong, so they record none. A later right first answer containing the word clears it. Test skips and placement record nothing.
- Fading: met and FSRS recall under 0.8. Learned: met otherwise. Not Yet: not met.
- Status chips filter (tap again for all), a search over French and English, and the existing Match, Flashcards, examples with audio and verb tables. Opens in the right-hand panel on wide screens.
- Checked in Chrome and Firefox, phone and desktop: empty state, Show All A1 Words (209 Not Yet), search, two lessons with a real mismatch on a known word (shows as Missed, and alone under the Missed filter); Passes 1 and 2 again; 53 unit tests. No page errors.

## Pass 4: accessibility to WCAG 2.2 AA, and Developer Notes (2026-11-09)

Accessibility:
- Baseline (axe-core 4, WCAG 2.0 to 2.2 A and AA, every screen and all 13 question types we can reach, light and dark, phone and desktop): colour contrast (white on orange 4.3, white on the blue chip 4.4, muted on the tag fill 4.41, text dimmed by opacity in the Glossary and the Can't Listen button), the Weekly Goal menu unnamed, About links under 24px, the Slow button's name missing its visible word. Plus what axe can't see: Enter didn't check, focus fell to the page when a picked chip or matched pair went away, no visible focus style, sheets weren't dialogs, picture choices were "Picture 1", text-field edges at 1.3:1.
- Fixed: tokens nudged to the smallest AA values (--orange #d3460f, light --muted #645e53, chip #1f6dfb, new --field for field edges); opacity dimming removed; names and states (aria-pressed on audio choices and pairs, aria-expanded on hints and the flag and comment toggles, "Your answer" and "Words to choose from" groups, labelled progress bar, picture alt from the word's English meaning, specific audio labels); Enter to check (data-check), focus handed on (focusNeighbour), focus to each question's heading and to Continue after answering; modal dialogs with focus trap, Escape and focus return; page titles and heading focus per screen; a sr-only h1 on home; no truncated text (Next Lesson, Glossary hints) and tooltips that wrap; scroll padding under the pinned bars, which unpin at 520px or less of height; the zero-movement leftovers under reduced motion.
- Checked: axe clean on the final build (see below); keyboard only in Chrome and Firefox answered every question type including Speak and Compare (Record, Stop, Done) with the ring visible on every stop; 200% zoom (640x400) and 320px reflow: no sideways scroll, nothing cut off; reduced motion: no animation runs, letters drawn at once; Passes 1 to 3 flows again; 56 unit tests.
- Not fixed, in check-in.md: the iPad orientation lock (WCAG 1.3.4) conflicts with Dan's landscape-only decision; listening and speaking questions need hearing and a voice by design (the in-question switches are the alternative); no person has run a screen reader through it yet.

Developer Notes:
- Bottom of Settings, collapsed; one collapsible item per document in Dan's order: craft-review.md, the newest _review Grades section, tamago-feature-list.md, question-types.md, build-phases.md, autonomous-build.md, test-notes.md, check-in.md. Rendered by marked at build time from an explicit file list (nothing else in _source is bundled), loaded only when opened; raw HTML shows as text; tables scroll inside their own box.
- Setting dev_notes (Testing (For Dan)), default on; off hides the section. Turn the default off before testers, with test_shortcuts.
- No secrets: src/lib/redact.js blanks key-shaped text (Anthropic, GitHub, AWS, Slack, JWT, long mixed tokens, key = value) and test/devnotes.test.js fails the suite if any shown document contains one. Today none does; check-in names the key (tamago-cloudflare) but holds no value.

## Content sweep (2026-11-10, overnight)

Part 1, Tamago originals against checked Tatoeba (owner a native French speaker, or tagged OK):
- scripts/sweep-originals.mjs: for each of the 303 originals, a Tatoeba sentence with every one of the draft's new
  words for its unit, its grammar forms, the same statement or question form, only the unit's allowed words, 2 to
  7 words, not in the course (cut rows included). The 105 sentences in question-and-answer pairs stay as drafts.
- 5 proposals, 193 with no match. Relaxing the form, the grammar forms or the length to 9 words found at most 7,
  so the strict rule stood. Review: 3 replaced (S5112 La souris est grande., S7151 Il est vieux., S7254 Mes chats
  sont mes enfants.), 2 rejected (S6057: temps as time in the Weather pack; S7154: loses vieille before the noun).
- Workbook v18. Sentences: 393 Tatoeba (was 390), 300 originals (was 303). Native check list: 300.

Part 2, accepted answers:
- scripts/sweep-answers.mjs: every English sentence Tatoeba links to each of the 393 live Tatoeba sentences. 564
  English answers were already accepted (main English plus the pulls' extras); 32 more links. The noun-sense filter
  dropped 15, too strictly (kid, kids, siblings, city are right), so all 32 were reviewed by hand: 24 added, 8 left
  out (idiom, embellishment, context-bound, or misleading, as "I have three sons." for trois enfants; 3 were
  contractions the checker already accepts).
- Workbook v19. fr_to_en answers: 197 (was 173). test/answers.test.js: every added answer passes the checker and
  every refused one still fails.

Part 3, Lingua Libre recordings:
- Words: Commons searches word by word hit its rate limit (429, 30 s waits). Wikidata's French lexemes link their
  Lingua Libre files, so one query found most; the rest came from Commons searches, with a title-pattern search for
  short words that drown in near misses (chat, une, dix). The user agent now names the app's address, as Wikimedia
  asks. Heterophones (est, fils, as) and elided forms (l', j') are skipped.
- 204 of 209 words now have a recording (was 0); sentences stay at 14 (full sentences are rarely recorded; the
  sentence search already finds short phrases). All 218 levelled: -18.2 to -15.7 LUFS, median -16.2. Shipped as
  mono AAC: 2.3 MB for all 218 (14 WAVs were 1.2 MB). Licences: CC BY-SA 4.0 128, CC0 38, CC BY-SA 3.0 14, CC BY
  4.0 13 (some shared files), each credited on About the Content.
- App: words play their own recording (lesson.js wordRecordingOf) in match pairs, Pick the Picture and flashcards.
- Tests muted (Chrome --mute-audio, Firefox media.volume_scale 0).

## Developer area (2026-11-10)

- "Developer" is the last item in the tools strip and the desktop panel, styled apart from the learning tools:
  dashed outline, no fill, muted text, a code icon, and a line saying it isn't part of the course.
- It opens one page: a Testing block (Testing shortcuts, Show Developer in Tools, and the Variant Test Bank, Flag
  Review, Native-Speaker Check and Forum screens, all moved out of Settings), then large accordions in Dan's order:
  Course Snapshot, Model Story, Craft Rubric, Latest Grades, Test Notes, Feature List, Question Types, Build
  Phases, Autonomous Brief, Check-In. Settings keeps only learner settings (Lessons, Sound and Look, Goals, Your
  Learning). Developer Notes in Settings is gone; its documents live here.
- Course Snapshot: dated by the build time and the workbook version (vite define), with exact counts worked out from
  the shipped content (units, sentences by source, native check list, words, answers by direction, pairs, grammar
  notes, I can statements, recordings, pictures, question types built, variants live).
- Model Story (_source/model-story.md): new, in plain language, for the builder, the reviewer, the Why?
  explanations and the practice writer: purpose, model, rules, sources of facts, what each must never do, cost
  limits, how each is graded; plus Tamago's product rules. Drafted from the documents and the code; it says where
  something isn't in place yet (no systematic grading of Why? explanations, no per-device cap on the practice writer).
- Setting `developer` (default on) hides the item; #developer always opens the page, and Back clears the hash.
- Checked in Chrome at phone and desktop sizes, light and dark: item order and dashed style, page title, the
  accordions in order, snapshot, Model Story and grade table rendering, Settings without the testing items, hiding
  and the hidden address, axe clean on the page.

## 2026-11-10: Topic packs on all of A1, at a second Your Topic node

- Dan's decisions: packs may use every A1 word, behind a second Your Topic node after Unit 13; build every pack
  that reaches 30 good sentences, checked Tatoeba only; cut S6057 from the Weather pack.
- Workbook v20 (scripts/add-topic-packs-2.mjs): node U200 "Another Topic" in tree row 9 (opens after row 8), a new
  units column topic_node (U100 for the first seven packs, U200 for the new ones), the packs that qualified as
  units, their words (W501 on), topics_pool status, S6057 off.
- App: any number of Your Topic nodes. Each pack is listed at its own node; each node keeps its own choice
  (kv topic_choice for U100 as before, topic_choice_U200 for the second). Placement, checkpoints and level markers
  skip every node.
- Pull (scripts/pull-units.mjs): packs at U200 draw on all live main units, aim at 30, and skip what review turned
  down (content/sweep/packs-review.json, which can also pick which linked English leads). The English check now
  accepts every alternative Wiktionary lists ("movie, film", "physician; doctor", "color/colour"), not only the
  first; that had been turning down good sentences for film, médecin, valise and couleur.
- Wiktionary senses chosen for the new words (content/word-senses.json): bureau as office, but as goal, billet as
  ticket, plat as dish, joue as the verb, mal as pain, occupé as busy; short hints in claude_hints where Wiktionary's
  first wording is long or carries markup (computer, cake, salt, busy, ball, to play).
- Words with fewer than 3 good sentences were dropped from each pack (the first packs' rule) and the pull redone.
- Built: At the Office (U201, 30 sentences, 8 words: bureau, travail, travaille, travaillent, patron, occupé,
  occupée, stylo). Skipped topics are listed in check-in.md.
- Built: At the Doctor (U202, 30 sentences, 7 words: médecin, médecins, docteur, malade, malades, hôpital, fièvre).
- Skipped: Cinema (45 candidates, about 20 on the topic after review) and every topic under 30 candidates even with
  all of A1 (check-in.md lists them). Workbook v21 folds both packs in (workbook-sync); rebuilding from v21 gives
  the same content apart from bookkeeping fields and 52 generated en_to_fr answers for the new rows.

## 2026-11-10: Points hidden; picture list

- Points (Dan): never shown. App.jsx `showPoints` is false; points are still earned, counted and stored (points table).
  The Points and Streaks setting is labelled Streaks and governs only the streak line and weekly goal. Checked at
  390 and 1440 px: no points on screen, no errors.
- _source/image-list.md: every picturable A1 word without a picture in the sushi style (97 rows, 92 files), by
  live sentence count, with a reusable prompt; drop folder _source/pictures/.

## 2026-11-10: Weather rebuilt at Another Topic

- Dan: cut the two sentences where temps means "time" (S6012, S6056); under 30, so move Weather to Another Topic and
  rebuild it on all of A1, Tatoeba only. Workbook v22 (scripts/rebuild-weather.mjs), synced to v23.
- U101 gets topic_node U200; its 5 drafts go off (native list 293); its live Tatoeba sentences stay and count toward
  the targets. Pull: a pack marked rebuild in packs-review.json is topped up, new ids from S8801.
- New words ciel, pleut, fait (W604 to W606; fait hinted with Wiktionary's impersonal "to be" sense of faire).
  Under 3 good sentences, left out: nuage, nuages, vent (never added), temps and pluie (word status off, so they
  don't ship and never return in a pull; S6001 and S6013 off with pluie).
- 15 candidates turned down in review (fait as did, done, a fact; temps as time; idioms). Result: 7 kept + 23 new =
  30, every word in 3 or more.
- App: a stored topic choice counts only while that pack is still at that node, so a Weather pick at Your Topic
  doesn't put it at the first node; it's listed under Another Topic, progress kept.

## 2026-11-10: Craft review and French check fixes

- Read _review/2026-11-10/craft-review.md (overall 4.1) and french-check.md (Keep 289, Fix 9, Cut 2).
- Opening screen (Dan): kept on every launch; splash-out is now one 500 ms ease-in-out crossfade over the home,
  which is already rendered underneath. The header logo's rise (logo-wait, logo-arrive, onFade) is removed, so the
  fade is the only motion. Measured in Chrome: opacity 1 until about 3.7 s, gone at 4.26 s, no other animation.
- Feedback: FB21 "Close." and FB25 "Almost." only for a near miss (check.js nearMiss: word edit distance 1 in an
  answer of 2 or more words, or letter edit distance 2 or less). Typed answers, chips, and choice questions compare
  the text picked; picture and pair questions never count as near. Unit test added.
- After a lesson: lastLine is "8 of 9", floated above the bottom bar (no layout shift), held 3 s, faded 600 ms,
  then cleared on animationend.
- Level caption hidden while level markers show; topic sheet kicker "Choose a Topic" until chosen; light --focus is
  the ink (#1c1a17), dark unchanged.
- French: scripts/apply-french-check.mjs to workbook v24 (S3106, S7355 fixed, ids kept, sentence_words rebuilt;
  drafts.json kept in step); five fr_to_en answers (AF ids) recorded as Claude's keep decisions in
  review-decisions.json. Skipped: S6053 to S6056 (off since the Weather rebuild); S6152, S6158, S6159, S6160 kept (Dan).

## 2026-11-10: Picture Check

- Dan's 39 pictures copied unchanged to _source/pictures/incoming-2026-11-10/ (Desktop originals left alone).
- Matching: by file name first (none matched; ChatGPT titles), then by looking at each picture: all 39 Guessed,
  with notes where another row could fit (_source/pictures/picture-check.json).
- scripts/picture-check.mjs: 480 px webp copies in public/picture-check/ (588 KB), excluded from the service worker
  precache; src/dev/picture-check.json, a lazily loaded chunk. Rows that reuse another row's picture show under it.
- Developer page: Picture Check accordion after Course Snapshot, a grid of cards (picture, French, English, status,
  note, source file), Missing rows as dashed boxes with what to draw. axe clean at 1440 light and 390 dark.
- Lessons untouched: no image_file changed.
- Dan's decisions after Picture Check: rabbit animaux, one-tree parc, either turtle, enfant and enfants on hold,
  doctor and garçons noted as more stylised (kept), the rest go ahead. Glass of water chosen for eau (the list's
  description). decision field in picture-check.json; scripts/picture-check.mjs now also writes
  public/images/pictures/<row>.webp (384 px, precached) and content/pictures.json, which import.mjs prefers over
  OpenMoji. 33 pictures for 36 words; 49 words pictured in all. Checked in Chrome: Pick the Picture in Units 1, 2
  and 5 loads them.

## 2026-11-10: Spanish course and language switching (start)

- Pipeline: scripts/lib/course.mjs, `COURSE=es` moves every path to Spanish's own folders (content-es, src/content-es,
  public/audio-es, .cache/recordings-es) and switches Tatoeba (spa), Wiktionary (Spanish), Lingua Libre
  (LL-Q1321 (spa), Wikidata Q1321). French rebuilt byte for byte the same.
- Spanish workbook v1 (scripts/make-spanish-workbook.mjs): machinery tabs copied from French v24; 15 units after the
  PCIC A1 inventory (Dan: content, count and order follow Spanish); "I can" statements carried over where the topic
  matches, new ones for Where Things Are and Ser or Estar against the same CEFR grid rows; Spanish feedback lines as
  drafts. Word senses in content-es/word-senses.json, short hints in claude_hints.
- Unit 1: widened (llamo, llamas, chico, chica, señor, señora; me, te, cómo moved to Unit 1), 8 cuts, 21 drafts
  (Tatoeba's checked pool for the first unit's words is 30 sentences), 4 QT09 pairs. Live.
- App: course.js (choice, first launch, shared settings), tables per course loaded in main.jsx, IndexedDB per
  course, device voice per course (es-MX first), lang attributes and visible "French" text from the course, ¿ ¡ in
  answer checking, feedback lines in either course language, Languages.jsx flag row (opening screen, header pop-up,
  Settings), German Coming Soon, tree shows live units only, Course Snapshot for both courses (src/lib/snapshot.js).
- Checked in Chrome: chooser (axe clean), German tap, Spanish pick reloads to Spanish home without the opening
  screen, Spanish lesson with lang="es", reopen keeps Spanish, switch back by the header and Settings, two
  databases, an existing French learner not asked; all five rounds of Spanish Unit 1 run with no errors.
- Spanish Unit 2 (People and Things): 30 Tatoeba, 13 drafts, 4 QT09 pairs; aquí moved to U08 (goes with estar); widened with este, esta, esto, eso, puerta; 7 cuts (tag no, esto for a person, a this/that mismatch). Turned-down sentences now stay turned down in every later unit.
- Spanish Unit 3 (Polite Phrases): 30 Tatoeba, 13 drafts, 4 QT09 pairs; 10 cuts (misleading English, idioms, quoted dialogue).
- Spanish Unit 4 (Food and Drink): 30 Tatoeba, 6 drafts, 4 QT09 pairs; 5 cuts.
- Spanish Unit 5 (Pets and Animals): 30 Tatoeba, 14 drafts, 4 QT09 pairs; 6 cuts (I am a mouse, insults).
- Spanish Unit 6 (More Than One): widened with plural adjectives and verbs; 30 Tatoeba, 26 drafts, 4 QT09 pairs; 10 cuts (como as like, I am a dog, an idiom).
- Spanish Unit 7 (Describing Things): 30 Tatoeba, 3 drafted QT09 answers; 5 cuts (too for very, bueno as well, estar nuances).
