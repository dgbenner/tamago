# Tamago check-in

Updated November 10, 2026. **New: vocabulary and Catch-Up circles (section 9). French Part 2 now closes a quarter of the gap to the core goal.** **New: French A1 Part 2, Everyday Life, is built: 12 circles, ready for you to try.** **New: the Asking for Help thread (three help circles per course), conversation scenes, and the conversation partner in Self-Study.** **German is live: all 15 A1 units, nine topic packs and the A1 Final Check, chosen on the opening screen, from the header flag or in Settings.** Fable's review is applied: 15 drafts swapped, the week pair cut, 69 drafts left for the native check. The Spanish course is live: all 15 units, six topic packs, and language switching. Also live: **three French topic packs at a second Your Topic node (Office, Doctor and the rebuilt Weather), the content sweep and the Developer area are live** at https://tamago-83f.pages.dev.

## Done since last check-in

- **Section 9, French: vocabulary circles and Catch-Up circles, live.** (Section 9 is saved at the end of _source/a1-complete.md.)
  - **Five vocabulary circles in Part 2,** one in each row beside its situation circles. Their themes stay clear of Parts 3 to 5:
    - Around Town (cinéma, gare, hôtel, musée, bus, train, vélo, voiture, avec…);
    - Free Time (film, photo, fête, cadeau, voyage, vacances, regarder, écouter, jouer, lire…);
    - Body and Feelings (main, tête, pied, yeux, dos, cheveux, content, heureux, triste, peur, seul…);
    - People (gens, copain, copine, voisin, étudiant, élève, professeur, mais, aussi, ou…);
    - Outdoors (montagne, campagne, arbre, fleur, route, pont, chemin, sud, sur…).
  - **Their lessons are word-focused:** Match the Pairs and Pick the Picture first, then the new Type the Word, then short sentences. Type the Word shows the English, and the picture where there is one; a noun is right with or without its article.
  - **Sentences:** 151 Tatoeba lines kept after the review (idioms, colloquial lines and misleading senses cut, such as *danse* used as the verb). There are 69 drafts where Tatoeba had fewer than 3 sentences for a word; *musée*, *pont* and *sud* had none at all.
  - **Catch-Up, four slots:** after Part 1 rows 5 and 7, and after Part 2 rows 12 and 14.
    - **What it holds:** each one fills itself from the circles above it: your mistakes first, then the words you missed, then the words you've seen only once or twice.
    - **How it plays:** each item comes back at the round its circle has reached, with no five rounds. Round-1 words come back as one Match the Pairs board, later ones as Type the Word.
    - **When:** it opens once its row is reached, never locks anything, and refills as you go. The circle shows "3 to catch up", or "Nothing yet".
  - **The Catch-Up icon** is a bowl of miso soup I drew as a stand-in until side-dish art arrives.
  - **Coverage, French:**
    - **Core (FLELex's 600 most frequent A1 words):** 242 taught (40%), 214 on the main path (36%).
    - **Full list (1,196):** 280 (23%).
    - **Part 2's share:** the goal is 90% of the core, 540 words. Part 1 left a gap of 439, a quarter of that is 110, and Part 2 now adds 113.
  - **Fixed on the way:**
    - The pull let a circle use words from approved circles after it, which only mattered once circles were placed between others. It now uses only the circles before it in order.
    - The first circle's spoken name now reads "Start Here" first, as it is seen (WCAG 2.5.3, label in name).
- **French Part 2: Fable's results applied. The French native-speaker list is now 349 (was 363).**
  - **14 drafts swapped for Fable's Use candidates** (_review/french-part2-candidates.md), by the Part 1 rules: ids kept, Fable's English picks used, each Tatoeba sentence used once, pairs untouched. 12 are held: 7 halves of question-and-answer pairs, and 5 whose candidates went to other drafts. The held drafts are listed in the build log.
  - **The fixes from _review/french-part2-check.md:**
    - S10864 is now "Un paquet de biscuits, s'il vous plaît." (A packet of biscuits, please.).
    - Marie's message R103 asks for a packet of biscuits, and its first answer reads "Milk, biscuits and apples".
    - N105 is "J'ai vingt ans." (20).
    - Biscuits is a new Unit 49 word. Wiktionary gives only "biscuit", so the hint is "biscuits". It has two checked Tatoeba lines, "J'aime les biscuits." and "Plus de biscuits !", so it's in 3 sentences.
  - **Six accepted answers from the check:**
    - Hello, ma'am. What's your name?
    - Tu es américaine ?
    - Non, je suis allemande.
    - C'est combien ? (for What's the price?)
    - How much do the fruits cost?
    - Could you spell it, please?
  - **Answer choices are always shuffled.** Read and Answer items are written with the right choice first; each showing now reorders them, and the answer follows. The listening passages Claude writes in Self-Study are shuffled too, since a model tends to put the answer first. Every other choice set was already shuffled. A test covers it.
- **French core target (176 of 600 taught, 29%; 149 on the main path, 25%):** content/a1-list.json now also holds FLELex's 600 most frequent A1 words (by their frequency in A1 textbooks), in order, as the core. The full 1,196 stays as the stretch goal. scripts/a1-coverage.mjs reports both.
- **A1 Complete, step 3: French Part 2, Everyday Life (stopped here for you to try it, as the spec says).** Local and on GitHub, so live at https://tamago-83f.pages.dev once the deploy finishes.
  - **Twelve circles on rows 11 to 15:** nine main circles and three help circles.
    - Main: Your Name, Please; Phone Numbers; Age and Birthdays; Numbers to 100; Where You Live; Countries and Languages; At the Market; How Much Is It?; Bottles and Bags.
    - Help: Spelling It Out, Checking Numbers, Checking You Understood.
    - Each circle has its grammar note, an "I can" statement, question-and-answer pairs and its sushi.
  - **To reach it:** finish round 1 of every Part 1 circle, then use the banner's Go to Part 2, or the part switcher. With Testing Shortcuts on, swiping a circle right to left passes a lesson, so Part 1 can be skipped through quickly.
  - **Sentences:** French now has 1,262. 899 are checked Tatoeba; 363 are drafts for the native check, 96 of them new in Part 2.
  - **Task items:** 22, all drafts for the native check: 14 Write What You Hear, 2 Fill In the Form, 3 Read and Answer, 3 Write a Message. Each lesson in a circle that has them takes one item, mid-lesson. The Part 2 Review is set at the middle of the part and at the end.
  - **A1 coverage, French (FLELex):** 208 words taught (17%, was 13%); 166 on the main path (14%, was 9%). Numbers to 100 are now complete, 29 of 29, and prices 6 of 7 (centime is missing). Times, days, months and dates are still thin and are left for later parts.
  - **The quality pass, ready for Fable:** _review/french-part2-candidates.md lists 217 Tatoeba sentences that are kept out only by the trust rule, set beside the 96 Part 2 drafts. 5 drafts are word for word on Tatoeba from an unchecked owner, and 33 have a candidate that teaches all the same new words. Nothing is swapped yet. The Part 1 file, _review/french-candidates.md, with Fable's marks, is untouched. Once Fable has marked the Part 2 file, I'll swap in the Use candidates the same way as before.
  - **Cut on the way:** idioms, *cher* meaning dear, and every line where Tatoeba's English named a different person (Mary for Marie).
- **A1 Complete, step 2: the framework, live.** Nothing new to learn yet; Part 2 writes the content.
  - **Parts.** The current tree is A1 · Part 1, First Steps. The parts tab in each workbook plans 4 parts for German and Spanish and 6 for French, from each gap at about 12 new words a circle (FLELex A1 is nearly twice the Goethe list). The tree shows one part:
    - "A1 · Part 1 of 4: First Steps" at the top;
    - its circles;
    - the Part 1 Review (ten questions over the part, never locking anything);
    - the cap, "End of A1 · Part 1 of 4";
    - Part 2 as one locked banner with its title and summary (Everyday Life: spelling and phone numbers, age, address and nationality, numbers to 100, prices and shopping).
  - **Unlocking.** A part opens when every circle of the part before has finished round 1. The banner then offers "Go to Part 2", or says it's being written. A part switcher appears at the top once more than one part is open.
  - **The final check** moves to the end of the last part, as the spec says, so it's off the tree until that part exists. Its results still show on Progress.
  - **A1 Coverage on Progress:** A1 words (the learner's share of the course's list, with what the course teaches so far), A1 tasks (of 13, with the list), and the part.
    - **Tasks.** The thirteen A1 tasks are in an a1_tasks tab. A circle tags the tasks it teaches outright: so far Saying Hello (T01) and the help circles (T13).
  - **Four new question types,** working in all three courses. They're Read and Answer (QT14), Fill In the Form (QT15), Write a Message (QT16) and Write What You Hear (QT17).
    - **Data and lessons:** their items go in four new workbook tabs, tied to a circle. A lesson takes one, mid-lesson, where its circle has them.
    - **Checking:** QT15 checks each field by its rule (text ignoring case and accents; numbers and phones as digits). QT17 checks values, not text, so 3,50 €, 3.50 and €3.50 are the same, as are 14h30, 14:30 and 14.30, and dates match on day and month.
    - **Can't Listen Now** turns QT17 into reading the number written out.
    - **QT16** counts as done when sent and is never scored. Claude's notes (meaning, mistakes, points not covered, a tidier version) appear when they arrive, and Continue never waits.
    - **Try them** on samples: Developer page, Try the A1 Task Types. The samples are marked as samples and are not course content.
- **A1 Complete, step 1: official lists loaded, coverage measured (stopped here for you, as the spec says).** The spec is saved as _source/a1-complete.md, and the numbers come from scripts/a1-coverage.mjs.
  - **German:** the Goethe-Institut Start Deutsch 1 Wortliste, 627 main entries (the list says about 650; its indented sub-entries aren't counted). The course teaches **118 (19%)**, every one in 3 or more sentences; 91 (15%) are on the main path without the topic packs.
  - **Spanish:** the PCIC A1 column of the general and specific notion inventories, 534 words. The course teaches **106 (20%)**; 88 (16%) on the main path. The Cervantes site was down for maintenance, so I read the Internet Archive's copy.
  - **French (your choice):** the A1 level of FLELex (CEFRLex, CENTAL, UCLouvain), 1,196 words, licensed CC BY-NC-SA 4.0, stored as headwords with its source and credited on About the Content. The course teaches **152 (13%)**; 110 (9%) on the main path. It's nearly twice the Goethe list's size, so French needs more parts than German or Spanish to reach 90%.
  - **The spec's themes, all three courses:** numbers to 100, about 10 of 29 (one to ten only); prices 0 or 1; times 2 or 3; days 6 or 7 of 13; months 0; dates 0.
  - **Rough size of the gap:** reaching 90% means about 450 more German words and about 375 more Spanish words. At 15 to 20 new words a circle, that's roughly 25 to 30 more circles each: Parts 2 to 4.
- **Ready to go public (your switch).**
  - **History scan:** no secrets in any of the 126 commits. The only key-shaped strings are the deliberate fakes in the redaction test.
  - **The 19 square sushi images** (Aji, Amaebi, Anago, Chutoro, Ebi, Hamachi, Hirame, Hotate, Ika, Maguro, Otoro, Saba, Sake, Tai, Tako, Unagi, Ikura, Tobiko, Uni; I earlier said 21, wrongly) are moved out of the repo into a tamago-held folder next to it, sources and app copies both. The circles that used them now wear the confirmed glossy set; the help circles wear the three glossy rolls.
  - **Personal details** removed from tracked files: the key's name and expiry, the free-credit date, a Netlify credit note, a personal-domain mention and Desktop folder names. No email or home-folder path was in any tracked file, and commits use the GitHub no-reply address.
  - **README** (what Tamago is, screenshots, live link, stack, how it was built, credits and licenses) and an **MIT LICENSE** for the code.
- **Typing to pick word chips, for everyone.** On any question with a word bank, letters typed (with no text field in use) pick chips. As soon as only one chip matches the letters so far, it moves into the answer. If several match (*e* for *est* and *eau*), they all get an orange edge until more letters narrow it down. Space or Enter takes the shortest exact match, and Backspace takes back a letter, or the last placed chip. Matching ignores case, accents and punctuation. The keyboard toggle for typing whole answers is unchanged.
- **Testing Shortcuts on the tree** (only while that setting is on): swiping a circle right to left, or pressing the right arrow while it has focus, passes its next lesson without playing it. Its questions count as seen and right, marked as tests, and a line at the bottom says "Passed for testing".
- **Reset Progress** in the Testing block on the Developer page, with a confirmation on the page. It wipes the current language's lessons, scores, words met, review items, checkpoints and scenes on this device. It keeps settings, flags, the native-speaker check and the other languages.
- **The conversation job, parts 2 to 5: conversations with Claude, live.**
  - **Scenes on the path:** a Conversations node after Asking About Words (the second help circle). It opens once that circle has had its first lessons. There are three scenes per course: Ordering a Drink, A New Neighbour and Finding the Way.
    - Each opens with a word prep: its 5 or 6 key words with your pictures, tap to hear.
    - Claude then speaks a little above the learner's level on purpose.
  - **Help phrases, one tap away**, from the help circles opened so far: I don't understand, slower please, please repeat, what does it mean, how do you say…, I'm looking for the word….
    - Tapping a word in Claude's line puts it into "what does … mean" (*Qu'est-ce que « café » veut dire ?*).
    - "How do you say…" and "I'm looking for the word…" put a frame in the box to finish.
    - Claude answers each in the course language: it slows down (the voice slows too), repeats word for word, rephrases more simply, explains with simpler words, or gives the word.
  - **Conversation Partner in Self-Study,** not tied to a circle. Its filters start from the learner's progress, and the learner can change them:
    - language;
    - topic: any opened circle, or free;
    - vocabulary: my words only, or plus a few new;
    - speed: slow, normal or natural;
    - corrections: each turn, at the end, or off.
  - **For every conversation:**
    - Claude speaks with the device voice. The learner speaks where the browser can listen, and can always type; Can't Speak Now switches to typing.
    - Claude's English translation is shown only on request.
    - At the end, the course words Claude used that the learner hadn't met go to the Glossary, with Review the New Words (flashcards). Their meanings come from Tamago's Wiktionary data, never from Claude.
    - Never graded.
  - **Cost:** Haiku 5.5 at low effort, with its prompt cached after the first turn, and 14 learner turns per conversation (help taps count). The server holds the limit too, under the Tamago key's $5 monthly cap. A conversation costs well under a cent. It's in the Model Story as section 5.
  - **Tested in Chrome** with a stand-in for Claude (no API calls): scene, help chips, partner, corrections each turn and at the end, new words. axe found no problems. The real endpoint goes live with this push; I made no real calls before it.
  - **Fixed on the way:** French *vais*, *vas* and *va* showed leftover stylesheet text in their hints (live since the A1 units). They now read "go (aller, je)", and so on. Also shortened: *nous*, *au*, Spanish *él* and German *hallo*.
- **The conversation job, part 1: Asking for Help, three help circles in each course.** They sit after the first circle (Asking for Help), after Row 3, about a third of the way in (Asking About Words), and after Row 6, about two thirds in (Finding the Word). They wear the three gunkan sushi in every course: ikura, tobiko, uni. Each is a full circle with five rounds, a grammar note and an "I can" statement written for the CEFR's A1 spoken-interaction row, which is exactly this skill.
  - **What they teach.**
    - Asking for Help: I don't understand, slower please, please repeat (*Je ne comprends pas*, *Más despacio, por favor*, *Sprechen Sie langsamer!*), in both the polite and the friendly forms.
    - Asking About Words: how do you say…, what does … mean (*Qu'est-ce que ça veut dire ?*, *¿Cómo se dice…?*, *Was bedeutet das?*).
    - Finding the Word: I'm looking for the word…, it's a thing for…, what's it called (*Je cherche le mot*, *Es una cosa para el agua*, *Wie nennt man das?*).
  - **They don't lock anything.** The next row still opens with the row before, so nobody's progress changes, and checkpoints neither review nor wait for them. Main units never use their words.
  - **Borrowed words.** Where a phrase needs a word a later unit teaches, the circle borrows it: its hint shows on tap, but it isn't taught as new there. Examples: *s'il vous plaît* and *qu'est-ce que* in French, *por favor*, *qué* and *en* in Spanish, *bitte*, *was* and *Deutsch* in German.
  - **Content:** Tatoeba first, the same rules. French: 85 Tatoeba lines and 14 drafts. Spanish: 81 and 19. German: 78 and 18. Drafts go only where Tatoeba's checked lines lack the core phrase itself (*Je ne comprends pas.* has no checked French line, nor *Repite, por favor.*, *Ich verstehe nicht.* or *Ich suche das Wort.*). They're on the native-speaker lists below.
  - **Cut in review:** *suis* from *suivre* (I don't follow), *plus* as "no longer", *sé* as "be!", *para* as "stop", *auf* as "up", *ihr* commands, idioms and sayings.
  - **One gap in German:** *Ich weiß nicht* (I don't know) can't be taught. *weiß* is already the course's word for "white", and a form can be only one word in the engine. The circle teaches *Weißt du…?* (do you know…?) instead. Allowing one form to carry two words would fix it; it's a change to the engine, not to content.
- **German: Fable's results applied. The German native-speaker list is now 69 (was 86).**
  - **15 drafts swapped** for Fable's Use candidates, under the French and Spanish rules: ids kept, Fable's English shown where named (*The women are tall*, *Tomorrow is Sunday*, *Bye and good night*…), each Tatoeba sentence used once, question-and-answer pairs untouched. Each swap is recorded as a reviewed confirm. Among them, *Ich bin ein Mann.* and *Ich bin ein Junge.* are now MUIRIEL's identical Tatoeba lines.
  - **20 held**: 18 are halves of question-and-answer pairs whose Use candidates aren't the same sentence, and 2 (S3108, S15102) lost their only Use candidates to other drafts. The rest of the Use marks stay in _review/german-candidates.md as the reserve.
  - **One choice of mine:** *Entschuldigung, geht es Ihnen gut?* was the first Use candidate for both S3106 *Entschuldigung!* and S3107 *Entschuldigung, bist du Tom?*. I gave it to S3107, so S3106 stays and can carry the accepted answer "Sorry!" you asked for. The swap count is the same either way.
  - **Cut:** the week pair S13101 *Wie ist deine Woche?* and S13102 *Meine Woche ist gut.*, as you said. S13103 *Ich habe eine Woche Zeit.* carries Woche alone now. Days and Times keeps three question-and-answer pairs instead of four, since nothing else in the unit answers a question.
  - **Accepted answers added:** "Hello! How are you?" and "Good day! How are you?" for *Guten Tag! Wie geht es Ihnen?*; "Sorry!" for *Entschuldigung!*; "I have a week's time." for *Ich habe eine Woche Zeit.*
  - German now: 803 sentences, 734 from Tatoeba (91%), 69 drafted.
- **German, live: 15 A1 units, 9 topic packs, the final check.** Standard German as spoken in Germany, du and Sie, after the Goethe-Institut's A1 (Start Deutsch 1), on the same framework as French and Spanish. **805 sentences: 719 from checked Tatoeba (89%), 86 drafted (11%)**, the lowest draft share of the three courses; 216 words, 166 with a Lingua Libre recording; 66 words pictured; about 29 hours to finish A1.
  - **Its own order:** Saying Hello (sein, ein and eine), People and Things (der, die, das), Polite Phrases (du and Sie, dir and Ihnen), Food and Drink (verb endings, mögen), Having Things (haben, einen), More Than One (plurals, wir, Sie), Describing Things, **Not and None** (kein, keine, keinen), Mine and Yours, Asking Questions (woher, kommen aus), Counting to Ten (es gibt), Naming Colours, Days and Times (am Montag, Uhr), Going Places (gehen, nach Hause and zu Hause), **Wanting and Can** (möchte, kann). Each has a grammar note, a conjugation table where it has a verb, its "I can" statements and four question-and-answer pairs.
  - **Drafts** fill only what checked Tatoeba can't reach with so few words (Mann, Brief, Zeitung, Ente, Maus, the plurals Bücher and Männer, fünf to zehn, Woche, spielen) and the answers of question pairs. They are on the German native-speaker list at the end of this file.
  - **Cut in review, about 120 pulled lines.** Mostly: weiß as *I know* (wissen) instead of white; sie or die as *it* or *they* this early; English that renames Maria as Mary (a typed "Maria" would be marked wrong); *heute Morgen* (morning) beside *morgen* (tomorrow); idioms (*Ja und?*, *Was hast du?*, *Wie geht das Lied?*); English that drops a word (*Ich kann gut Deutsch sprechen* as *I speak German well*); insults and odd lines. Every cut is listed with its reason in content-de/sweep/packs-review.json.
  - **Cities as names:** Berlin, Hamburg, London and Paris are allowed in sentences, like Tom and Anna, because they're spelled the same in English. That gave kommen aus real answers: *Ich bin aus Berlin.*
  - **Topic packs (Tatoeba only, 30 each, every word in 3 or more)** at Your Topic after Unit 15: The Weather, Family Life, At the Office, At the Doctor, At the Hotel, Music and Songs, At the Café, At the Supermarket, At the Beach. Hotel is mostly keys and rooms (Schlüssel, Zimmer), and Beach mostly fish (Fisch), but both are on topic. Skipped for being under 30: Garden (24), Clothes (25), Home (24), Airports (25); Cinema, because Film and Kino reach no sentences. Words left out of packs (under 3 good lines): Regen; Baby; Kopf, weh, Medizin; Nacht, Bett; Lied, Lieder, singst; Café; Hähnchen, Tomate, Ei, Butter, Supermarkt; Sand.
  - **A1 Final Check** follows Start Deutsch 1, with a link to the Goethe-Institut's practice page. Checked in Chrome: parts in order, scores per part, Progress per skill, axe clean.
  - **German candidates: _review/german-candidates.md.** The same as French and Spanish: 808 Tatoeba lines kept out only by the trust rule; 3 drafts are word for word on Tatoeba from an unchecked owner (*Ich bin ein Mann.* and *Ich bin ein Junge.* are MUIRIEL's), and 37 have a candidate that teaches the same new words. **Nothing swapped**, as you asked.
- **Fixed on the way, the pull's noun test.** It missed plurals (Wiktionary's "nominative/accusative/genitive plural of Kind") and two-word glosses ("house cat"), so Tatoeba lines with Katze and Kinder were left out. It now also reads the word's hint. German Unit 5 was rebuilt with Tatoeba's cat lines (drafts 10 to 7). The French and Spanish candidate files use the same test; rerunning them would add a few candidates. Their live units are unchanged.
- **Third picture batch, in lessons: all 20.** Beach, sea, sand, sun, snow, rice, chicken, tomato, egg, eggs, cup, music, piano, guitar, hospital, doctors, door, window, pen and orange, each the row its English file name names (copied to _source/pictures/incoming-2026-11-10c/). Every row of image-list.md now has your art except four Spanish-only ones (student, two teachers, bathroom), and **no course uses an OpenMoji stand-in any more**: French 96 pictured words, Spanish 63, German 66. Orange and naranja are your orange now.
- **Fixed on the way, Spanish verb tables.** The Verbs tool and grammar notes in Spanish showed nonsense conjugations (*je se, tu ses* for ser): the table reader only understood French tables. It now reads each language's own Wiktionary table, with the Spanish course's persons (yo, tú, él/ella/usted, nosotros, ellos/ellas/ustedes; no vosotros, no vos). Spanish nouns also now carry their gender from Wiktionary (94 of 96), as French did, and some Wiktionary glosses lost broken leftovers (*dog, domesticated for thousands of years…)* is now *dog*; stray stylesheet text after *chocolate* is gone).
- **A1 Final Check, French and Spanish.** At the end of the path, after the last unit (and after the topic node), modeled on the DELF A1 and DELE A1: four parts in the exams' order, listening (pick what you heard, type what you hear), reading (pick the meaning, build the translation), writing (build and type the translation), speaking (speak and compare). 21 questions from the course's own sentences, spread over every A1 unit; nothing taken from exam papers. Listening, reading and writing are scored per part; speaking is practice, never graded. It opens once every unit has had its first lessons and never locks anything. The result shows per skill on the Progress page, which links to the official free sample papers: France Éducation international's DELF A1 page, the Instituto Cervantes DELE page (its old direct PDF links now redirect there), and, for German, the Goethe-Institut's Start Deutsch 1 practice page.
- **Content numbers on the Developer page** (Course Snapshot, French and Spanish side by side): sentences split three ways with percentages (Tatoeba checked, Tatoeba reviewed by Fable, drafted by Claude), words and native recordings, units and packs, lessons, distinct questions, and hours to finish A1 from the device's lesson times (the craft review's timings until a device has three or more lessons logged per round). Today: French 766 sentences (62% / 5% / 33%), Spanish 792 (80% / 4% / 16%); about 30 and 34 hours to finish A1.
- **French drafts swapped for Fable's Use candidates: 40.** The French native-speaker list is now **253** (was 293). Same rules as Spanish: ids kept, Fable's English picks used, each Tatoeba sentence once, a question-and-answer pair changed only for the very same sentence, each swap recorded as a reviewed confirm (workbook v25). 78 drafts had a Use candidate; 38 are held: 29 halves of question-and-answer pairs and 9 whose candidates went to other drafts (listed in the build log). The other Use candidates stay in _review/french-candidates.md as the reserve. Every word still has 3 or more sentences, as before (au revoir has two in Unit 1 and two more in Unit 3, as it did). The file's header now says French native, not Spanish (my script's slip, also fixed).
- **French candidates for review:** _review/french-candidates.md, the same as the Spanish list: every Tatoeba French sentence kept out only by the trust rule that otherwise fits a unit or topic pack, 277 in all, grouped by unit, each of the 293 drafts beside the candidates that could replace it, exact matches first. 16 drafts are word for word on Tatoeba from an unchecked owner; 97 have a candidate that teaches all the same new words. Nothing swapped; not yet reviewed for idioms or odd lines.
  - Fixed on the way: an exact match now has to be the same kind of sentence; the first pass paired *Tu es un garçon ?* with *Tu es un garçon.* None of the Spanish swaps rested on such a match. Two Spanish swaps did turn a statement into a question by Fable's choice (S2110 *¿Cómo es él?*, S5102 *¿Cómo está el pájaro?*); neither is in a question-and-answer pair.
- **Spanish drafts swapped for Fable's Use candidates: 31 of the 62.** The Spanish native-speaker list is now **127** (was 158). Each swap keeps its sentence id, takes Fable's English pick where one was named (I'm fine, I like green, My family isn't a big family), and is recorded as a reviewed confirm, since these owners carry no native or OK signal. The other 31 are held, for two reasons:
  - **24 are halves of QT09 question-and-answer pairs**, and none of their Use candidates is the same sentence: swapping *Sí, hay leche.* (the answer to ¿Hay leche?) for *Hay un gato.* would break the pair. They are S2113, S3112, S3113, S4106, S5114, S7101, S7102, S7103, S8104, S8105, S9107, S10101, S10102, S10109, S10110, S10111, S11103, S12102, S12118, S13105, S13108, S15101, S15102, S15103.
  - **7 whose Use candidates were already used** for other drafts: one Tatoeba sentence can be in the course only once (Seis y cuatro son diez was the first pick for five drafts). They are S3104, S10104, S12105, S12106, S12113, S12114, S13107.
  - Every word in every unit still has 3 or more sentences. The bulleted Use candidates stay in _review/spanish-candidates.md as the reserve.
- **enfant and enfants pictures approved** (your call: distinct enough from the baby). They're in French lessons, and enfants also pictures Spanish niños. Only orange and naranja still use OpenMoji.
- **Spanish candidates for review:** _review/spanish-candidates.md lists every Tatoeba Spanish sentence kept out only by the trust rule (no declared native owner, no OK tag) that otherwise fits a unit: 472 in all, grouped by unit, each draft beside the candidates that could replace it. 13 of the 158 drafts are word for word on Tatoeba from an unchecked owner, and 69 have a candidate that teaches all the same new words. Nothing is swapped. The candidates pass the rules only; I haven't reviewed them for idioms or odd lines, as I did the pulled ones.
- **Your second batch of pictures is in lessons, both languages.** All 40 are copied to _source/pictures/incoming-2026-11-10b/ and matched to the list: house, cheese, milk, bed, table, chair, kitchen, bathroom, newspaper, letters, colours (red, blue, green, yellow), weather (cold, hot), coffee, tea, sugar, chocolate, butter, croissant, banana, meat, fish, sandwich, restaurant, city, boat, birds and a bird, duck, horses, baby, family, men, singer, student, and both teachers. French now pictures 74 words with your art (only enfant, on hold, and orange still use OpenMoji); Spanish 56 (only naranja). 26 rows of the list remain to make. Picture Check shows the new ones; three matched by file name (croissant, sandwich, restaurant), the rest by the picture. The men's picture has three where the list asked for two, which reads fine for hommes.
- **Opening screen bugs fixed** (your report): it looked like it loaded twice and the flags didn't show.
  - The new circles counted every unit's lessons when home first drew, by simulating lessons, which froze the page for about four seconds while the opening screen was up. The counts are now worked out when the content is built, so home draws at once.
  - After each deploy, the page reloads once to switch to the new version; that reload used to play the opening screen again. Now it goes straight to home.
  - The language question waits until the app has checked for progress, so someone with progress never sees the flags flash and vanish, and a new visitor sees them within half a second, already loaded.
- **New circles on the tree, both languages.** The Circle Lab design is live: each circle is its sushi on a warm off-white disc (the same in light and dark, so the art's white edges no longer show on dark; faint with the lock when locked), one green ring that fills with every lesson, and the title. Start Here sits on the first circle before your first lesson, Your Progress after it, then neither again. A finished circle's ring fades as recall drops. Every sushi is trimmed and scaled to the same visible size, so rolls and hand rolls match the nigiri. A full circle's height of space separates rows, checkpoints and level markers; the path scrolls. The circle's pop-up no longer says Unit 3 or round 2: it says Lesson 8 of 26. The Circle Lab (http://localhost:5180/lab.html, on your Mac only) matches.
- **Spanish, live.** English to Latin American Spanish (ustedes, never vosotros), on the same framework as French: rounds, question types, topic nodes, checkpoints, grammar notes, "I can" statements. 15 units, 642 sentences (484 checked Tatoeba, 158 drafted), 205 words, 189 levelled Lingua Libre recordings.
  - **Topic packs (Tatoeba only, 30 or more, every word in 3 or more, your newest rule):** Family Life, At the Office, At the Doctor, Music and Songs, At the Café and In the Garden, at a Your Topic node after Unit 15.
    - No pack reached 30 on Units 1 to 5 (Weather 20, Family 27 before review), so Spanish has no topic node after Unit 5; the node holding the packs is called Your Topic, since it's the only one.
    - Skipped: Weather (rain, heat, snowing and weather itself under 3 good sentences each), Cinema (about 9 of 52 on the topic), Clothing (29), Hotels 28, Airports 26, Supermarket 19, Home 19, Beach 17, and the other topics, all lower.
    - Words left out of packs for having under 3 good sentences: jefe; doctora, enfermera, cabeza, dolor; piano; pastel; flores, planta.
  - **Its own order:** 15 units after the PCIC A1 inventory (as taught in the Complutense A1.1 programme; the Cervantes site was down): Saying Hello (soy, eres; un, una), People and Things (el, la; es), Polite Phrases (usted; estoy bien), Food and Drink (-er verbs; me gusta), Pets and Animals (tener), More Than One (plurals; ustedes), Describing Things (agreement), **Where Things Are** (estar for place, hay), **Ser or Estar**, Mine and Yours, Asking Questions, Counting to Ten, Naming Colours, Days and Times, Going Places. A unit appears on the tree once it's built; each is committed and pushed as it goes live.
  - **Unit 1 is live:** 51 sentences, 30 from checked Tatoeba and 21 drafted (marked, on the Spanish native-speaker list). Tatoeba's shortest classics (¿Cómo te llamas?, Adiós., Soy una niña.) are mostly owned by people with no native or OK signal, so the first unit needed drafts; later units have far more to draw on. 22 of its 24 words play a Lingua Libre recording, levelled like the French ones. Grammar note and four "I can" statements.
  - **Unit 2 is live:** People and Things, 43 sentences (30 Tatoeba, 13 drafts); aquí moved to Where Things Are, since in Spanish it goes with estar; widened with este, esta, esto, eso and puerta. Grammar note.
  - **Unit 3 is live:** Polite Phrases, 43 sentences (30 Tatoeba, 13 drafts): tú and usted, estar for how you are. Cut lines whose English misled (buenas tardes as good evening, ¿Cómo está usted? as How do you do?).
  - **Unit 4 is live:** Food and Drink, 36 sentences (30 Tatoeba, 6 drafts): como, comes, come; bebo, bebes, bebe; me gusta. Cut como meaning like, a pun and a crush.
  - **Unit 5 is live:** Pets and Animals, 44 sentences (30 Tatoeba, 14 drafts): tengo, tienes, tiene. Tatoeba's checked lines for pato, tortuga and ratón are nearly all "I am a mouse" kinds of sentence, which the brief cuts, so those words are drafted.
  - **Unit 6 is live:** More Than One, 56 sentences (30 Tatoeba, 26 drafts): los, las, unos, unas; somos, son; ustedes. Widened with the plural forms a plural sentence needs (grandes, pequeños, tienen, comen, beben, chicos, chicas, casas). Plurals within the first six units' words are thin on checked Tatoeba, hence the drafts.
  - **Unit 7 is live:** Describing Things, 33 sentences (30 Tatoeba, 3 drafted answers): agreement (bueno, buena), muy, también. From here Tatoeba has plenty, so drafting drops away.
  - **Unit 8 is live:** Where Things Are, 35 sentences (30 Tatoeba, 5 drafts): estar for place (está, están, estamos) and hay for what there is, with aquí and allí.
  - **Unit 9 is live:** Ser or Estar, 37 sentences (30 Tatoeba, 7 drafts): ser for what someone is (soy profesor), estar for how they are now (estoy cansado).
  - **Unit 10 is live:** Mine and Yours, 41 sentences (30 Tatoeba, 11 drafts): mi, tu, su and their plurals; de for whose. Widened with amigos and amigas; cut cómo de grande (Spain usage, beyond A1).
  - **Unit 11 is live:** Asking Questions, 33 sentences (30 Tatoeba, 3 drafts): qué, quién, dónde, cuál, por qué, porque. Cut idioms (¿Y qué?, ¿Qué hay?) and three copies of "That's because you're a girl".
  - **Unit 12 is live:** Counting to Ten, 48 sentences (30 Tatoeba, 18 drafts): dos to diez, cuántos and cuántas, hay. Tatoeba writes most numbers above four as digits, which the pull leaves out, so five to ten are drafted.
  - **Unit 13 is live:** Naming Colours, 40 sentences (30 Tatoeba, 10 drafts): colours after the noun, agreement, ¿De qué color es? Cut an idiom (No tengo blanca, I'm broke).
  - **Unit 14 is live:** Days and Times, 39 sentences (30 Tatoeba, 9 drafts): hoy, mañana, ahora, días de la semana, ¿Qué hora es? Cut te llamo meaning I'll call you.
  - **Unit 15 is live:** Going Places, 33 sentences (30 Tatoeba, 3 drafted answers): voy, vas, va; a and al. Cut me voy and te vas (irse, to leave) and ¿Cómo te va? (an idiom). **All 15 Spanish units are now live.**
  - **Around the units:** sushi icons by difficulty over the 15 units (5 nigiri, 5 maki, 5 temaki; with three temaki pictures, two repeat), a checkpoint after each of rows 2, 3, 6, 8 and 9, and your pictures in Spanish lessons: 44 Spanish words use the shared pictures (yours where made, OpenMoji until then).
  - **Picture list:** _source/image-list.md now has French, Spanish and Language columns. Nearly every picture is Shared; croissant is French. Four Spanish words get rows of their own (profesor, profesora, estudiante, baño), and rows already in lessons sit at the end, marked done. Picture Check shows the Spanish words too.
  - I widened Unit 1 before drafting, as the brief says: me llamo / te llamas, chico, chica, señor, señora. 8 pulled lines cut (odd, idiomatic, or no meaning "right?").
- **Language switching:**
  - First launch: "Choose Your Language" under the logo with your three flags; the opening screen waits for a pick. Anyone who already has French progress isn't asked.
  - After that: a small flag in the header (where points used to sit) opens a Language pop-up, and Settings has a Language row with all the flags. The language you pick opens next time; switching reloads straight to home, without the opening screen.
  - German shows faintly and says "German: Coming Soon".
  - Progress is separate per language (French keeps its data; Spanish has its own store). Settings are shared.
  - Your flags are used directly, copied to _source/flags/. The Spanish flag is Spain's, for a Latin American course; say if you'd rather another.
- **Course Snapshot** on the Developer page shows French and Spanish side by side.
- **Your pictures are in lessons.** 33 of them now show in Pick the Picture for 36 words (blanche, noire and docteur share theirs), in place of the OpenMoji stand-ins where there was one: homme, femme, garçon, fille, pomme, pain, eau, chat, chien, cheval, tortue, souris, noir, blanc, école, parc, magasin, and new words such as livre, lettre, ami, amie, bureau and médecin. As you chose: the rabbit animaux, the one-tree parc, one turtle, and the glass for eau. On hold until you check them: enfant and enfants. Your side note is recorded on the doctor and garçons pictures (more stylised than the rest). 13 words still use OpenMoji until their pictures arrive (lait, fromage, orange, sandwich, oiseau, canard, the four colours, ville, restaurant, and enfant), so a question can mix the two styles for now. About the Content says most pictures were made for Tamago.
- **Picture Check** on the Developer page (https://tamago-83f.pages.dev/#developer), second accordion: your 39 pictures, each large with its French, English and status, then the 57 rows still Missing (with what to draw). None is used in lessons yet.
  - The files are copied as you sent them to _source/pictures/incoming-2026-11-10/. None was named like its row (they carry ChatGPT's titles), so all 39 are **Guessed**, from the picture itself. No Match: none.
  - Doubles: two of each for eau (a glass and a drop; the drop could be meant for bleu), parc, animaux (one has a rabbit instead of the bird) and tortue (the two turtle files are identical copies).
  - Worth your eye: the man with a thermometer I put at fièvre, the blanket-and-tissue one at malade; the second smiling boy at enfant; two women in sweaters at femmes and the arm-around pair at amie; two boys at garçons; two apples at pommes (the list asked for three).
  - The matches are in _source/pictures/picture-check.json; change a row there, or tell me, and the page follows.
- **Fixes from the 2026-11-10 craft review and French check:**
  - **Opening screen:** still on every launch. It now clears with one crossfade of about half a second that reveals home in place; the header logo no longer rises, and nothing on home moves.
  - **"Close." and "Almost."** appear only for a near miss: one word wrong, missing or extra, or two letters off. An answer nowhere near gets "Not quite.", "Here's the answer." and the like.
  - **After a lesson:** home shows one line above the bottom buttons, "8 of 9", which fades by itself after about 3 seconds. No screen, no tap.
  - **Smaller fixes:** the level caption no longer repeats "Very Early A1" once the tree shows level markers (it still says Starting Out before then); the topic pop-up says "Choose a Topic" over "Your Topic" until you pick, then "Your Topic" over the pack's name; the keyboard focus ring in light mode is the ink colour instead of the browser's blue (dark keeps its light blue). 3px as before.
  - **French (workbook v24):** S3106 is now "Oui, je suis Marie. Bonsoir !" and S7355 "Je mange du pain parce que j'aime le pain." The Weather fixes and the S6056 cut were skipped (those rows are already off since the rebuild); the four Family Life lines stay as they are. Five more answers count as right: "No, she is small.", "How are you, Marie?", "Sorry, is it here?", "It's his tortoise.", "No, it's his apple."
  - Left as is, as you asked: where tools open on desktop. Points were already hidden.
- **Points hidden everywhere.** The blue chip is gone from home on every screen size. Points are still earned on each right answer and stored day by day as before; they just don't show. The setting that was Points and Streaks is now Streaks and covers only the streak and the weekly goal.
- **Picture list for Pick the Picture:** _source/image-list.md, 97 words (92 pictures to make, since feminine colours and docteur reuse a picture), most-used first, with file name, what to draw and priority, and one reusable ChatGPT prompt at the top. It includes the 30 words that show an OpenMoji stand-in today, since those don't match the sushi style. Drop finished images in _source/pictures/.
- **Developer area:** "Developer" sits last in the tools strip (and the panel on desktop), in a quieter dashed outline. It opens one page: testing controls at the top (Testing shortcuts, Variant Test Bank, Flag Review, Native-Speaker Check, Forum, all moved out of Settings), then large accordions: Course Snapshot (dated, exact numbers), Model Story, Craft Rubric, Latest Grades, Test Notes, Feature List, Question Types, Build Phases, Autonomous Brief and Check-In. Settings now holds only learner settings.
  - **Model Story** is new (_source/model-story.md): for the builder, the reviewer, the Why? explanations and the practice writer, what each is for, its model, its rules, where its facts come from, what it must never do, its cost limits and how it's graded, plus Tamago's product rules. Two honest gaps it names: Why? explanations aren't graded systematically yet, and the practice writer has no per-device daily cap (only the $5 monthly workspace limit).
  - **Before testers:** on the Developer page, set Show Developer in Tools and Testing Shortcuts to Off. The page stays open for you at https://tamago-83f.pages.dev/#developer
- **Content sweep (overnight), before and after:**

  | | Before | After |
  | --- | --- | --- |
  | Tamago originals | 303 | 300 |
  | Tatoeba sentences | 390 | 393 |
  | Native-speaker check list | 303 | 300 |
  | Extra English answers accepted | 173 | 197 |
  | Words with a native recording | 0 of 209 | 204 of 209 |
  | Sentences with a native recording | 14 | 14 |
  | Recordings in all | 14 | 218 |
  | Loudness spread of recordings | -18.2 to -26.6 LUFS (before Pass 1) | -15.7 to -18.2 LUFS |
  | Audio download | 1.2 MB | 2.3 MB |

  - Originals: only 5 had a checked Tatoeba sentence teaching the same words and grammar within the unit's words, and I took 3 (S5112, S7151, S7254). The other two would have lost the point of the sentence. 105 originals are question-and-answer pairs written together, so they stay; 193 had no match. Tatoeba's fitting sentences were already in the course from the earlier pulls.
  - Answers: 24 more English answers count as right (kid and kids for enfant(s), siblings, city, Farewell, How's it going? and so on). 8 linked translations stayed out as idioms or misleading ("You've got mail." for Tu as une lettre, "I have three sons." for trois enfants).
  - Recordings: every word with a Lingua Libre recording now plays it in Match the Pairs, Pick the Picture and flashcards, levelled to the same volume as the rest. The five without are deliberate: est, as and fils sound different by meaning, and l' and j' aren't words on their own. Every speaker is credited on About the Content.
- **Two new topic packs, at a second Your Topic node.** As you decided, packs may now use every A1 word. They sit behind "Another Topic", a new node after Unit 13 (it opens once Days and Times and Going Places finish round 1). It works like the first one: pick a topic, switch any time, each keeps its progress, and the two nodes keep separate choices.
  - **At the Office:** 30 sentences, 8 new words (bureau, travail, travaille, travaillent, patron, occupé, occupée, stylo).
  - **At the Doctor:** 30 sentences, 7 new words (médecin, médecins, docteur, malade, malades, hôpital, fièvre).
  - Every sentence is checked Tatoeba (a native owner or the OK tag), nothing drafted, every new word in at least 3 sentences, the same rules as the first seven packs apart from the wider vocabulary. I read every sentence; the ones I turned down, and why, are in content/sweep/packs-review.json.
  - Words that couldn't reach 3 good sentences were left out rather than drafted: ordinateur, collègue, téléphone, réunion and secrétaire for the Office; tête, mal, rhume, toux, gorge, dentiste and infirmière for the Doctor. So the Doctor pack is about doctors, being ill and fever, not aches and pains.
  - **Skipped (fewer than 30 good sentences, even with all of A1):** Cinema (45 candidates, but only about 20 stayed on the topic; the rest were people being funny or sad, or regarde as "look"), Clothing 28, Colours and Art 27, Soccer 25, Train Travel 25 (mostly car sentences), Cooking 14, Pharmacy (its words are the Doctor pack's), Airports 27, Museums 27, Gardening 26, Hotels 15, Cycling 16, Hiking 14, Chinese Food 18, Bakery 8, Cats 7, Birds 7, Tree Types 7, Dogs 5, Cloud Types 5, Ocean Life 4. Numbers are candidates before review.
  - Fixed on the way: the check that the English carries each noun only looked at Wiktionary's first wording, so "film" didn't count for film ("movie, film") or "doctor" for médecin ("physician; doctor"). It now takes every alternative.
- **The Weather, rebuilt at Another Topic.** S6057, S6012 and S6056 are cut (temps meaning "time"). That left 14 sentences, so Weather moved to Another Topic and was rebuilt on all of A1, Tatoeba only: its 5 drafts are off, 7 of its Tatoeba sentences stay, and 23 new ones joined (Il fait froid, Il pleut aujourd'hui, Le ciel est bleu…). 30 sentences, all checked Tatoeba.
  - Words now: neige, soleil, froid, chaud, plus ciel, pleut and fait (hinted "to be, of the weather (faire)", Wiktionary's impersonal sense).
  - Left out under the 3-sentence rule: temps (no weather sentence on Tatoeba within A1), pluie (only 2, so "Il aime la pluie et la neige" and "J'aime la pluie" went with it), nuage and vent (under 3 each). I turned down 15 more: fait as "did", "done" or "a fact", and idioms like "Bien fait", "Bon vent", "C'est chaud" for hectic (content/sweep/packs-review.json).
  - Your Topic now lists the other six; anyone who had picked Weather there finds it under Another Topic instead, with its progress.
  - The native-speaker list is now 293.
- **Pass 4, accessibility (WCAG 2.2 AA):**
  - Keyboard: every question type can be answered on desktop with Tab and Enter alone. Enter checks; on a word or choice not yet picked, Enter picks it; after an answer, focus is on Continue and Enter goes on. Focus stays put when a picked chip or matched pair disappears. Unit and checkpoint details are proper dialogs (Escape closes them and focus returns).
  - Focus: a blue ring shows wherever the keyboard is, in light and dark, and never hides under the pinned bars.
  - Screen readers: every control and audio button says what it does ("Play the sentence", "Choice 2, plays its sentence", "Picture: cat"); chosen items and matched pairs are announced; each screen has its own title and heading.
  - Contrast: a few colours moved by a hair to pass. The orange fill, the blue points chip and the gray secondary text are each a shade darker, and text fields got a slightly stronger edge. Nothing else in the look changed.
  - Zoom: at 200% and at a 320 px width nothing is cut off and nothing scrolls sideways; on very short screens the header and footer stop being pinned.
  - Reduced motion: with the device asking for it, nothing moves; the opening screen shows the letters already drawn.
  - Checked with axe (the standard automated WCAG checker) on every screen and question type, light and dark, phone and desktop: no violations. Keyboard-only runs in Chrome and Firefox answered all 13 question types.
- **Developer Notes:** at the bottom of Settings, collapsed. Inside, one item per document: the craft review rubric, the latest grade table, the feature list, question types, build phases, autonomous build, your test notes and this check-in. They're read from _source and _review at each deploy, so they stay current. Read only. One setting hides the whole section (Settings, Testing (For Dan), Developer Notes). Keys and secrets can't appear: anything key-shaped is blanked, and the tests fail if a document ever contains one.
- **Test notes, Pass 3 (the Glossary):** Words is now the Glossary. It opens on your own words, each marked Learned, Missed, Fading or Not Yet, with a count for each that doubles as a filter. Show All A1 Words adds the whole level (209 words); there's a search box for French or English. A2 joins when its content exists.
- **Test notes, Pass 2 (desktop and iPad in landscape):** the logo with its sushi sits left and points and settings right, in a shorter strip. Home uses the width: the path on the left, and a right-hand panel listing Glossary, Verbs, Self-Study and Progress with a line on each; a tool opens in the panel, beside the path. Unit and checkpoint details open as centred pop-ups. Practice and Next Lesson sit side by side. Lessons have bigger items and more room; Settings are in two columns. An iPad held upright asks to be turned sideways.
- **Test notes, Pass 1 (all devices):**
  - Opening screen more fluid (one eased curve per letter, a little faster, held a little longer); it fades fast while the header logo rises into place. The logo no longer jumps: the sushi is a small preloaded image with its space reserved.
  - Home: short pinned header and footer, each with a thin line; points in one style at every value, zero included; Glossary, Verbs and Self-Study as a sideways strip of tiles above the tree; the level in italics with Progress as a quiet button; "Starting Out" until you finish round 1 of a unit, then level markers across the tree (Very Early A1, Early A1, High A1, A2).
  - Tree: rounds as a ring of five segments around each circle, bigger sushi, a lock on locked units (tapping one explains what opens it), "?" on Your Topic until you choose, titles only, less space between rows. Checkpoints are smaller, with a checkered flag; their sheet lists the units and has Skip.
  - Every unit has a 2 or 3 word title (Saying Hello, People and Things, Polite Phrases, Food and Drink, Pets and Animals, More Than One, Describing Things, Mine and Yours, Asking Questions, Counting to Ten, Naming Colours, Days and Times, Going Places; topics: The Weather, Family Life, At Home, Music and Songs, At the Café, At the Supermarket, At the Beach). Workbook v17.
  - Bottom buttons: Practice (your mistakes first, then what you're likeliest to forget; it shows "Practice · 4 Mistakes" when there are some, and is never grayed out) and Next Lesson: <unit title>.
  - Lesson intro: "Before You Start", one plain sentence on what the screen is, and how many new words the unit brings.
  - Can't Listen Now / Can't Speak Now: a faint button at the bottom of every listening and speaking question, as well as in Settings. It pauses for an hour and swaps the rest of the lesson.
  - Settings in sections (Lessons, Sound and Look, Goals, Your Learning, Testing (For Dan)); Title Case on labels and buttons throughout; everything a step bigger on phones.
  - Audio: the 14 native recordings were up to 8 dB apart; they're now within about 1 dB. The computer voice is set by each device and can't be levelled.
- **Craft review fixes, live.** The twelve fixes from the 2026-11-09 craft review are in, with your changes to the top five (pairs still animate out, the French feedback lines stay, points as plain text). Details in the build log under "Craft review fixes"; the report and screenshots are in _review/2026-11-09/.
- **Moved to Cloudflare Pages.** Project tamago, connected to the GitHub repo, so every push to main deploys (about 30 seconds). Live: https://tamago-83f.pages.dev
  - The two Claude functions are now Cloudflare Pages Functions at /api/explain and /api/generate; the handlers are shared in server/. They still answer "not set up" until the key is added (item 4).
  - Fixed on the way: Cloudflare redirects /index.html to /, and the offline cache had stored that redirect, which made a second visit fail to load. The page is now cached as /.
  - Checked on the live site in Chrome and Firefox: lessons, Units 1 to 13, placement, review, Make your own, backup and restore, and a reload with no connection. No errors.
- **Netlify builds stopped** (Build settings, Stop builds) through the API, so pushes use no more credits. The site tamago-590 is not deleted and still serves its Phase 5 version.
- **Unit icons from your sushi art.** All 35 files are copied into _source/icons and sorted into nigiri (26), maki (6) and temaki (3). App-sized copies (192 px) are in public/icons.
  - The A1 tree is planned at 13 units: Units 1 to 5 get nigiri, 6 to 9 maki, 10 to 13 temaki. Each pick is random, made once per unit, then kept (content/unit-icons.json).
  - The tree shows the icon in place of the unit number. Locally only, for now.
- **A1 units 6 to 13** (local and on GitHub, not live):
  - Plurals, Adjectives, Possessives, Questions, Numbers, Colours, Time and Places, in the old Duolingo order, two per tree row. Row 5 opens after row 3, so Your topic stays optional.
  - Each unit has 35 to 49 sentences, every new word in at least 3, four question-and-answer pairs, a grammar note (verb tables from Wiktionary: être, aller), four "I can" statements checked against the CEFR A1 grid, and pictures for colours and places.
  - The course is 693 sentences now: 390 from Tatoeba and 303 written for Tamago.
  - New review checkpoints after rows 6 and 8, with shorter labels ("Units 1 to 9").
- **Workbook v16** holds all of it. Rebuilding from v16 alone gives the same app, apart from labels.

## Decisions made

- **Pass 4:** a picture choice is read aloud by its English meaning ("Picture: cat"), which makes Pick the Picture work like Pick the Meaning for someone who can't see the pictures. Enter on a choice that answers straight away (Pick the Meaning) answers it, as a tap does.
- **Developer Notes:** on by default for now, like Testing shortcuts; both get turned off before testers. Only the eight documents you named are bundled; nothing else in _source reaches the app.
- **Test notes, Pass 3:** a word counts as Missed when you get it wrong in Match the Pairs or Pick the Picture, or leave it out of a French answer; a later right answer clears it. A choice between whole sentences can't say which word tripped you, so it doesn't mark one. Fading means known but with recall under 80% now.
- **Test notes, Pass 2:** desktop and iPad share one layout from 1024px wide, so a phone turned sideways keeps the phone layout. Unit details open as a centred pop-up (your notes), while the tools open in the right-hand panel (your decision on the secondary menu).
- **Test notes:** Practice with nothing to bring back yet says so and offers the next lesson, rather than going gray. Skip on a checkpoint just marks it skipped; checkpoints never lock anything, so it can still be taken. "Finishing your first unit" for the level label means finishing its round 1 (that's when the next units open). Level markers sit where finishing the units above reaches the next band; the band itself follows your weakest skill, as on the Progress page.
- **Cuts:** 41 pulled sentences, for idioms ("un vieux de la vieille", "Ça va bien maintenant !"), misleading senses ("ma petite amie" glossed as "my little friend", "C'est neuf." meaning new, "un bleu" meaning a bruise or a freshman, "tu suis" from suivre), odd lines ("We are in two") and one typo ("Il va a l'école").
- **No topic words in the main units:** the first pull drew words from the live topic packs (famille, café, maison…). I fixed the pull so main units never use a pack's words, since a pack is one optional choice.
- **Drafts:** 149 for these units, to bring every word to 3 sentences and give each unit four question pairs. One turned out to be on Tatoeba and became a Tatoeba row; one duplicated Unit 4, so its question now points at the Unit 4 sentence.
- **Gunkan in maki:** Ikura, Tobiko and Uni are gunkan ("battleship") sushi. I've put them in maki, since gunkan-maki is traditionally counted as a maki. Say if you'd rather they go elsewhere.
- **A repeated temaki:** there are three temaki pictures for four units, so Units 11 and 13 share one. More temaki art would remove the repeat.
- **No side icons yet:** Your topic, the review checkpoints and Make keep no icon until side art arrives. Your topic no longer shows a number, so it doesn't clash with the new Unit 6. Its order moved from 6 to 50 in the workbook.

## Waiting for Dan

0. **Accessibility items I couldn't fix:**
   - **iPad landscape only vs WCAG 1.3.4.** AA says an app mustn't lock itself to one orientation, so the "Turn your iPad sideways" note fails AA. Your Pass 2 notes asked for it, so I left it. Say the word and I'll remove it (an upright iPad would then get the phone layout).
   - **Listening and speaking questions** need hearing and a voice by design. The alternative is the Can't Listen Now / Can't Speak Now button on each of those questions (and in Settings), which swaps them for reading and writing. There's no transcript for listening questions, since that would give the answer away.
   - **Speak and Compare with a dismissed microphone prompt:** if someone closes the browser's microphone question without answering, Done stays off until they record. Can't Speak Now on that question gets them past it.
   - **No person has used it with a screen reader yet** (VoiceOver or NVDA). The structure and labels pass the automated checks, but a real screen-reader session belongs in testing, ideally with someone who uses one daily.
   - **Not covered by AA, not done:** Windows high-contrast mode (forced colours) wasn't tested.
1. **Icons:**
   - Unclear group: Ikura.png, Tobiko.png and Uni.png (gunkan; filed under maki for now).
   - Side art: none came in this batch (miso soup, ice cream, yakitori and so on). Send it and the off-path nodes will get side icons.
   - Where the art came from:
     - Seven files carry ChatGPT download marks (blob:https://chatgpt.com/…): Glossy Tuna Nigiri on Dark Gradient-2, Glossy Unagi Temaki Hand Roll-3, Glossy Yellowtail Nigiri Sushi-4, Glossy Ōtoro Nigiri Sushi-3, Hamachi Nigiri Sushi Emoji-5, Maguro Tuna Nigiri Emoji-1, and Temaki Hand Roll with Fresh Fillings-2.
     - The other "Glossy …" files match that set in size (1536 by 1024) and style, but carry no origin mark.
     - The 19 square files (Aji, Amaebi … Uni, 512 by 512) carry no origin either, and are held out of the repo until you confirm where they came from.
   - Commercial emoji check: none of the files is a copy of an Apple, Google, Samsung or Microsoft emoji. The "Emoji" in some file names reads as a generation prompt, not a vendor set. The OpenAI terms assign generated images to you. If the 512 set came from a stock or emoji pack, tell me which, and I'll check its licence.
   - No icon has a face, a character or text.
2. **Netlify (your call, no hurry).** Builds are stopped and the old site still serves Phase 5 at https://tamago-590.netlify.app. Anyone who had it installed stays on that old version; the new home is https://tamago-83f.pages.dev. Delete the Netlify site whenever you like, or keep it. A custom domain on Cloudflare (for example a subdomain of a domain you own) is a few clicks when you want one.
2c. **German native-speaker check:** 69 drafted German sentences, listed at the end of this file, need a native speaker of standard German before testers. Same flow: https://tamago-83f.pages.dev, choose German, then https://tamago-83f.pages.dev/#developer and Native-Speaker Check.
2a. **Spanish native-speaker check:** 158 drafted Spanish sentences, listed at the end of this file, need a native speaker of Latin American Spanish before testers. Same flow as French: on their phone, https://tamago-83f.pages.dev, choose Spanish, then https://tamago-83f.pages.dev/#developer and Native-Speaker Check. Most drafts are in the first six units, where Tatoeba's checked sentences within so few words run out; from Unit 7 on, drafting is a handful per unit.
2b. **Spanish flag (your call):** the course is Latin American Spanish and the flag is Spain's. Send another flag image whenever you like and I'll swap it in.
3. **Native-speaker check (now 349 French sentences, listed below, plus Part 2's 22 task items).** Arrange the person. On their phone they open https://tamago-83f.pages.dev/#developer, then Native-Speaker Check. When they're done they tap Save the results and send you the file. Put it in _source/ and I'll fold it in.
4. **The Claude features (explanations, written practice, conversations)** run on a Tamago-only key, stored only as a Cloudflare Pages secret (TAMAGO_ANTHROPIC_API_KEY), under a $5 monthly spend cap. If the key lapses or the cap is reached, they switch off quietly and the rest of the app works as before.
   - Cost: Haiku 5.5 is $0.10 per million input tokens and $0.50 per million output; one explanation is a few hundred tokens. Claude-written practice uses Opus 5.5 ($4 and $20 per million), a few cents a set. The $5 cap stops everything for the rest of the month if it's ever reached.
5. **Sign-in, sync, discussions, flags from testers (a new account).** These need an account service with a database. My suggestion is Supabase (https://supabase.com, free tier, sign-in by email link). Say yes and create the project, and I'll walk you through the keys one step at a time.
6. **Testers (your call).** When you say go, I'll turn Testing shortcuts off by default and give you the link to send. Until there's a server, testers send their flags by saving the flags file.
7. **Earlier items:**
   - Try the topics and Words on your phone.

## Drafted sentences

Every French sentence I wrote (414), for the native-speaker check. Tatoeba sentences aren't listed.

**U01 Saying Hello** (18)

- S0011 Tu es une fille. = You are a girl.
- S0016 Un homme et une femme. = A man and a woman.
- S0017 Un garçon et une fille. = A boy and a girl.
- S0018 Bonjour, je suis Paul. = Hello, I am Paul.
- S0019 Bonjour, je suis Marie. = Hello, I am Marie.
- S0020 Merci, au revoir. = Thank you, goodbye.
- S0021 Oui, je suis une femme. = Yes, I am a woman.
- S0022 Non, je suis un homme. = No, I am a man.
- S0023 Tu es un garçon ? = Are you a boy?
- S0024 Non, je suis une fille. = No, I am a girl.
- S0025 Tu es Paul ? = Are you Paul?
- S0026 Oui, je suis Paul. = Yes, I am Paul.
- S0027 C'est une fille ? = Is it a girl?
- S0028 Non, c'est un garçon. = No, it is a boy.
- S0029 Tu es un enfant ? = Are you a child?
- S0030 Non, je suis une femme. = No, I am a woman.
- S0039 Tu es une femme ? = Are you a woman?
- S0040 Tu es un homme ? = Are you a man?

**U31 Asking for Help** (9)

- S9061 Je ne comprends pas. = I don't understand.
- S9062 Répète, s'il te plaît. = Please repeat.
- S9063 Répétez, s'il vous plaît. = Please repeat.
- S9064 Répète plus lentement, s'il te plaît. = Please repeat more slowly.
- S9065 Répétez plus lentement, s'il vous plaît. = Please repeat more slowly.
- S9066 Encore, s'il vous plaît. = Again, please.
- S9067 Vous comprenez ? = Do you understand?
- S9068 Tu comprends ? = Do you understand?
- S9069 Parle plus lentement, s'il te plaît. = Please speak more slowly.

**U02 People and Things** (23)

- S2101 Le livre est ici ? = Is the book here? (QT09 question)
- S2102 Oui, le livre est ici. = Yes, the book is here. (QT09 answer)
- S2103 Les enfants sont ici ? = Are the children here? (QT09 question)
- S2104 Oui, les enfants sont ici. = Yes, the children are here. (QT09 answer)
- S2105 La lettre est ici ? = Is the letter here? (QT09 question)
- S2106 Oui, voici la lettre. = Yes, here is the letter. (QT09 answer)
- S2107 Elle est grande ? = Is she tall? (QT09 question)
- S2108 Non, elle est petite. = No, she is short. (QT09 answer)
- S2109 Voici les hommes. = Here are the men.
- S2110 Voici le journal. = Here is the newspaper.
- S2111 Les femmes sont ici. = The women are here.
- S2112 Les hommes et les femmes sont ici. = The men and the women are here.
- S2113 Les garçons sont ici. = The boys are here.
- S2114 Voici les garçons et les filles. = Here are the boys and the girls.
- S2115 Les filles sont ici. = The girls are here.
- S2116 Les garçons ? Ils sont ici. = The boys? They are here.
- S2117 Les hommes ? Ils sont ici. = The men? They are here.
- S2118 Les filles ? Elles sont ici. = The girls? They are here.
- S2119 Voici les enfants. = Here are the children.
- S2120 Voici les femmes. = Here are the women.
- S2121 La lettre est petite. = The letter is small.
- S2122 Le journal est ici. = The newspaper is here.
- S2123 Le garçon ? Il est ici. = The boy? He is here.

**U03 Polite Phrases** (17)

- S3101 Vous êtes Paul ? = Are you Paul? (QT09 question)
- S3102 Non, je suis Marie. = No, I'm Marie. (QT09 answer)
- S3103 Ça va, Marie ? = Are you OK, Marie? (QT09 question)
- S3104 Oui, ça va bien. = Yes, I'm fine. (QT09 answer)
- S3105 Tu es Marie ? = Are you Marie? (QT09 question)
- S3106 Oui, je suis Marie. Bonsoir ! = Yes, I'm Marie. Good evening! (QT09 answer)
- S3107 Comment ça va, Paul ? = How are you, Paul? (QT09 question)
- S3108 Bien, merci, Marie. = Fine, thanks, Marie. (QT09 answer)
- S3109 Excusez-moi, vous êtes Paul ? = Excuse me, are you Paul?
- S3110 Excusez-moi, s'il vous plaît. = Excuse me, please.
- S3111 Excusez-moi, je suis Marie. = Excuse me, I'm Marie.
- S3112 Pardon, tu es Paul ? = Sorry, are you Paul?
- S3113 Pardon, Marie ! = Sorry, Marie!
- S3114 Pardon, c'est ici ? = Excuse me, is it here?
- S3115 Paul, s'il te plaît ! = Paul, please!
- S3119 De rien, Paul. = You're welcome, Paul.
- S3120 Au revoir, à bientôt ! = Goodbye, see you soon!

**U04 Food and Drink** (9)

- S4101 Tu manges une pomme ? = Are you eating an apple? (QT09 question)
- S4102 Oui, je mange une pomme. = Yes, I'm eating an apple. (QT09 answer)
- S4103 Tu aimes le fromage ? = Do you like cheese? (QT09 question)
- S4104 Oui, j'aime bien le fromage. = Yes, I quite like cheese. (QT09 answer)
- S4105 Tu manges du pain ? = Are you eating bread? (QT09 question)
- S4106 Non, je mange un sandwich. = No, I'm eating a sandwich. (QT09 answer)
- S4107 Tu aimes le lait ? = Do you like milk? (QT09 question)
- S4108 Non, j'aime l'eau. = No, I like water. (QT09 answer)
- S4111 Elle mange un sandwich. = She's eating a sandwich.

**U05 Pets and Animals** (11)

- S5101 Tu as un chien ? = Do you have a dog? (QT09 question)
- S5102 Oui, j'ai un petit chien. = Yes, I have a small dog. (QT09 answer)
- S5103 Tu as un chat ? = Do you have a cat? (QT09 question)
- S5104 Non, j'ai une tortue. = No, I have a tortoise. (QT09 answer)
- S5105 Il a un cheval ? = Does he have a horse? (QT09 question)
- S5106 Oui, il a un grand cheval. = Yes, he has a big horse. (QT09 answer)
- S5107 Tu as un oiseau ? = Do you have a bird? (QT09 question)
- S5108 Non, j'ai un canard. = No, I have a duck. (QT09 answer)
- S5109 La tortue est petite. = The tortoise is small.
- S5110 J'ai une tortue et un oiseau. = I have a tortoise and a bird.
- S5111 Le canard mange. = The duck is eating.

**U32 Asking About Words** (2)

- S9162 Comment on dit ça en français ? = How do you say that in French?
- S9163 Comment on dit « merci » en anglais ? = How do you say "merci" in English?

**U06 More Than One** (16)

- S7052 Les livres sont ici. = The books are here.
- S7053 Voici les livres. = Here are the books.
- S7054 J'ai des lettres. = I have letters.
- S7055 Les lettres sont ici. = The letters are here.
- S7056 Voici des lettres. = Here are some letters.
- S7060 Voici des pommes. = Here are some apples.
- S7061 J'ai des oiseaux. = I have birds.
- S7063 J'aime les oiseaux. = I like birds.
- S7066 Vous êtes des enfants ? = Are you children?
- S7067 Non, nous sommes des hommes. = No, we are men.
- S7068 Tu as des chats ? = Do you have cats?
- S7069 Oui, j'ai des chats. = Yes, I have cats.
- S7070 Les chiens sont ici ? = Are the dogs here?
- S7071 Oui, les chiens sont ici. = Yes, the dogs are here.
- S7072 Tu manges des pommes ? = Are you eating apples?
- S7073 Non, je mange du pain. = No, I'm eating bread.

**U07 Describing Things** (9)

- S7153 Il est très vieux. = He is very old.
- S7155 Le pain est bon ? = Is the bread good?
- S7156 Oui, le pain est très bon. = Yes, the bread is very good.
- S7157 Elle est gentille ? = Is she nice?
- S7158 Oui, elle est très gentille. = Yes, she's very nice.
- S7159 Le chien est vieux ? = Is the dog old?
- S7160 Non, il est jeune. = No, he's young.
- S7161 La pomme est bonne ? = Is the apple good?
- S7162 Oui, elle est très bonne. = Yes, it's very good.

**U08 Mine and Yours** (21)

- S7251 C'est ma pomme. = It's my apple.
- S7252 Voici ma lettre. = Here is my letter.
- S7253 Ma tortue est petite. = My tortoise is small.
- S7255 Ta pomme est ici. = Your apple is here.
- S7256 C'est ta lettre. = It's your letter.
- S7257 Voici ta tortue. = Here is your tortoise.
- S7258 Tes livres sont ici. = Your books are here.
- S7259 Voici tes lettres. = Here are your letters.
- S7260 J'aime tes chiens. = I like your dogs.
- S7261 Elle mange sa pomme. = She's eating her apple.
- S7262 Il a sa lettre. = He has his letter.
- S7263 C'est sa tortue. = It's her tortoise.
- S7264 Il aime ses chats. = He likes his cats.
- S7265 C'est ton chien ? = Is it your dog?
- S7266 Oui, c'est mon chien. = Yes, it's my dog.
- S7267 C'est ta pomme ? = Is it your apple?
- S7268 Non, c'est sa pomme. = No, it's her apple.
- S7269 Tes enfants sont ici ? = Are your children here?
- S7270 Oui, mes enfants sont ici. = Yes, my children are here.
- S7271 Ton ami mange ? = Is your friend eating?
- S7272 Oui, mon ami mange un sandwich. = Yes, my friend is eating a sandwich.

**U09 Asking Questions** (10)

- S7351 Qu'est-ce que tu manges ? = What are you eating?
- S7353 Quelle pomme ? = Which apple?
- S7354 Quelle lettre est ici ? = Which letter is here?
- S7355 Je mange du pain parce que j'aime le pain. = I'm eating bread because I like bread.
- S7356 Il est ici parce que tu es ici. = He is here because you are here.
- S7358 Le chat est ici. = The cat is here.
- S7359 Qui est ici ? = Who is here?
- S7360 Paul est ici. = Paul is here.
- S7361 Qu'est-ce que tu aimes ? = What do you like?
- S7364 Oui, j'ai un chien. = Yes, I have a dog.

**U33 Finding the Word** (3)

- S9261 Je cherche le mot. = I'm looking for the word.
- S9262 C'est une chose pour l'eau. = It's a thing for water.
- S9263 C'est une chose pour le pain. = It's a thing for bread.

**U10 Counting to Ten** (13)

- S7452 Il a quatre livres. = He has four books.
- S7456 Elle a six oiseaux. = She has six birds.
- S7458 J'ai sept livres. = I have seven books.
- S7459 J'ai huit pommes. = I have eight apples.
- S7460 Il a huit chiens. = He has eight dogs.
- S7461 Nous sommes huit. = There are eight of us.
- S7462 J'ai neuf livres. = I have nine books.
- S7463 Elle a neuf chats. = She has nine cats.
- S7464 Nous sommes neuf. = There are nine of us.
- S7467 Nous sommes dix. = There are ten of us.
- S7468 Tu as combien de chats ? = How many cats do you have?
- S7470 Il a combien de chiens ? = How many dogs does he have?
- S7472 Tu as combien de livres ? = How many books do you have?

**U11 Naming Colours** (19)

- S7551 Le livre est vert. = The book is green.
- S7552 J'ai un livre vert. = I have a green book.
- S7555 La tortue est verte. = The tortoise is green.
- S7557 La souris est noire. = The mouse is black.
- S7558 C'est une souris noire. = It's a black mouse.
- S7559 Elle a une souris noire. = She has a black mouse.
- S7560 La lettre est blanche. = The letter is white.
- S7561 J'ai une souris blanche. = I have a white mouse.
- S7562 La lettre est bleue. = The letter is blue.
- S7574 C'est une lettre bleue. = It's a blue letter.
- S7565 J'ai un livre bleu. = I have a blue book.
- S7566 Le chat est noir ? = Is the cat black?
- S7567 Non, il est blanc. = No, it's white.
- S7568 La pomme est rouge ? = Is the apple red?
- S7569 Non, elle est verte. = No, it's green.
- S7570 Le livre est bleu ? = Is the book blue?
- S7571 Non, il est jaune. = No, it's yellow.
- S7572 La souris est blanche ? = Is the mouse white?
- S7573 Oui, elle est blanche. = Yes, it's white.

**U12 Days and Times** (21)

- S7652 Demain, je mange ici. = Tomorrow I'm eating here.
- S7653 Paul est ici demain. = Paul is here tomorrow.
- S7654 Je mange du pain le matin. = I eat bread in the morning.
- S7655 Le matin, je mange une pomme. = In the morning, I eat an apple.
- S7656 Il mange le matin. = He eats in the morning.
- S7657 Le soir, je mange du fromage. = In the evening, I eat cheese.
- S7658 Il mange le soir. = He eats in the evening.
- S7659 J'aime le soir. = I like the evening.
- S7660 C'est une bonne semaine. = It's a good week.
- S7661 Lundi est un jour de la semaine. = Monday is a day of the week.
- S7664 Dimanche est un jour de la semaine. = Sunday is a day of the week.
- S7662 Il est une heure. = It's one o'clock.
- S7663 J'ai une heure. = I have an hour.
- S7665 C'est lundi aujourd'hui ? = Is it Monday today?
- S7666 Non, aujourd'hui c'est dimanche. = No, today is Sunday.
- S7667 Tu manges maintenant ? = Are you eating now?
- S7668 Oui, je mange maintenant. = Yes, I'm eating now.
- S7669 Tu es ici demain ? = Are you here tomorrow?
- S7670 Oui, je suis ici demain. = Yes, I'm here tomorrow.
- S7671 Tu manges le matin ? = Do you eat in the morning?
- S7672 Non, je mange le soir. = No, I eat in the evening.

**U13 Going Places** (14)

- S7751 La ville est grande. = The town is big.
- S7753 Le magasin est petit. = The shop is small.
- S7754 Elle va au magasin. = She's going to the shop.
- S7755 Le chat est dans le parc. = The cat is in the park.
- S7756 Je suis dans le magasin. = I'm in the shop.
- S7757 Le chien est dans le restaurant. = The dog is in the restaurant.
- S7758 Tu vas au parc ? = Are you going to the park?
- S7759 Oui, je vais au parc. = Yes, I'm going to the park.
- S7760 Où est-ce que tu vas ? = Where are you going?
- S7761 Je vais au restaurant. = I'm going to the restaurant.
- S7762 Il va à l'école ? = Is he going to school?
- S7763 Oui, il va à l'école. = Yes, he's going to school.
- S7764 Où est le magasin ? = Where is the shop?
- S7765 Le magasin est dans la ville. = The shop is in the town.

**U41 Your Name, Please** (6)

- S10061 Je m'appelle Paul. = My name is Paul. (QT09 answer)
- S10062 Vous vous appelez comment ? = What's your name?
- S10063 Tu t'appelles Marie ? = Is your name Marie?
- S10064 Mon prénom, c'est Paul. = My first name is Paul. (QT09 answer)
- S10065 Bonjour, Madame. Vous vous appelez comment ? = Hello, madam. What's your name?
- S10066 Oui, je m'appelle Marie. = Yes, my name is Marie. (QT09 answer)

**U51 Around Town** (14)

- S11261 Où est le musée ? = Where is the museum?
- S11262 Je vais au musée avec Paul. = I'm going to the museum with Paul.
- S11263 C'est un grand musée. = It's a big museum.
- S11264 La piscine est grande. = The swimming pool is big.
- S11265 Tu vas à la piscine ? = Are you going to the swimming pool?
- S11266 Je vais à l'école en bus. = I go to school by bus.
- S11267 Où est le bus ? = Where is the bus?
- S11268 Où est le cinéma ? = Where is the cinema?
- S11269 C'est le métro. = It's the metro.
- S11270 C'est un petit village. = It's a small village.
- S11271 Le village est petit. = The village is small.
- S11272 C'est ton bus ? = Is that your bus?
- S11273 Je vais à la gare. = I'm going to the station.
- S11274 Où est le métro ? = Where is the metro?

**U34 Spelling It Out** (3)

- S10961 Vous pouvez épeler, s'il vous plaît ? = Can you spell it, please?
- S10962 Tu peux épeler ton nom ? = Can you spell your name?
- S10964 Je peux épeler mon nom. = I can spell my name. (QT09 answer)

**U102 Family Life** (7)

- S6151 La mère et le père sont ici. = The mother and the father are here.
- S6152 Voici le père. = Here is the father.
- S6156 Les parents sont ici. = The parents are here.
- S6157 Voici les parents. = Here are the parents.
- S6159 La mère est ici. = The mother is here.
- S6160 Le père est ici. = The father is here.
- S6161 Les parents et les enfants sont ici. = The parents and the children are here.

**U42 Phone Numbers** (11)

- S10161 Mon numéro, c'est le zéro six, onze, quinze, dix-neuf, vingt. = My number is 06 11 15 19 20. (QT09 answer)
- S10162 C'est le zéro six, douze, seize, dix-sept, treize. = It's 06 12 16 17 13.
- S10163 Mon numéro de portable, c'est le zéro sept, quatorze, dix-huit, onze, douze. = My mobile number is 07 14 18 11 12.
- S10164 Son numéro, c'est le zéro six, treize, quinze, seize, vingt. = His number is 06 13 15 16 20.
- S10165 Le numéro, c'est le zéro sept, dix-sept, dix-huit, dix-neuf, quatorze. = The number is 07 17 18 19 14.
- S10166 Appelez le zéro six, onze, douze, vingt, quinze. = Call 06 11 12 20 15.
- S10167 C'est le zéro six, treize, quatorze, seize, dix-sept. = It's 06 13 14 16 17.
- S10168 Mon numéro, c'est le zéro sept, dix-huit, dix-neuf, onze, douze. = My number is 07 18 19 11 12.
- S10169 Tu as un portable ? = Do you have a mobile phone?
- S10170 Oui, j'ai un portable. = Yes, I have a mobile phone. (QT09 answer)
- S10171 Je vais appeler Paul. = I'm going to call Paul.

**U103 At Home** (15)

- S6251 La chambre est petite. = The room is small.
- S6252 Voici la chambre. = Here is the room.
- S6253 C'est une grande chambre. = It's a big room.
- S6254 Le lit est ici. = The bed is here.
- S6255 Le lit est grand. = The bed is big.
- S6256 J'ai un petit lit. = I have a small bed.
- S6257 La porte est petite. = The door is small.
- S6258 Voici la porte. = Here is the door.
- S6259 C'est une grande porte. = It's a big door.
- S6261 Voici la fenêtre. = Here is the window.
- S6262 La table et la chaise sont ici. = The table and the chair are here.
- S6263 Voici une chaise. = Here is a chair.
- S6264 La cuisine est petite. = The kitchen is small.
- S6265 Voici la cuisine. = Here is the kitchen.
- S6266 C'est une petite fenêtre. = It's a small window.

**U43 Age and Birthdays** (4)

- S10261 Elle est née aujourd'hui. = She was born today.
- S10264 Mon chat a deux mois. = My cat is two months old.
- S10265 Le chien a trois mois. = The dog is three months old.
- S10267 C'est une bonne année. = It's a good year.

**U52 Free Time** (11)

- S11361 J'aime la danse. = I like dance.
- S11362 C'est une belle danse. = It's a beautiful dance.
- S11363 Il aime la danse. = He likes dance.
- S11364 C'est un jeu. = It's a game.
- S11365 C'est mon jeu. = It's my game.
- S11366 Tu as un jeu ? = Do you have a game?
- S11368 Tu aimes le ski ? = Do you like skiing?
- S11369 Elle aime le ski. = She likes skiing.
- S11370 C'est une belle photo. = It's a beautiful photo.
- S11371 C'est un beau voyage. = It's a beautiful trip.
- S11372 C'est une belle fête. = It's a lovely party.

**U35 Checking Numbers** (5)

- S11061 Vous pouvez répéter, s'il vous plaît ? = Can you repeat that, please?
- S11062 Pardon, vous pouvez répéter le numéro ? = Sorry, can you repeat the number?
- S11063 Tu peux répéter ? = Can you repeat that?
- S11064 Un moment, je vais noter. = One moment, I'll write it down.
- S11065 Je vais noter le numéro. = I'm going to write down the number.

**U104 Music and Songs** (7)

- S6351 Il aime la musique. = He likes music.
- S6352 J'aime la chanson. = I like the song.
- S6353 Il a un piano. = He has a piano.
- S6354 Le piano est grand. = The piano is big.
- S6355 Elle a une guitare. = She has a guitar.
- S6356 J'aime la guitare. = I like the guitar.
- S6357 Voici la chanson. = Here is the song.

**U44 Numbers to 100** (11)

- S10361 Trente, quarante, cinquante, soixante. = Thirty, forty, fifty, sixty.
- S10362 Soixante-dix, quatre-vingts, quatre-vingt-dix, cent. = Seventy, eighty, ninety, a hundred.
- S10363 Il a cinquante ans. = He is fifty years old.
- S10364 Elle a soixante-dix ans. = She is seventy years old.
- S10365 Il a quatre-vingt-dix ans. = He is ninety years old.
- S10366 Elle a cent ans ! = She is a hundred years old! (QT09 answer)
- S10367 J'ai cinquante ans. = I am fifty years old.
- S10368 C'est le zéro six, cinquante, soixante-dix, quatre-vingt-dix, quarante. = It's 06 50 70 90 40.
- S10369 Elle a soixante ans. = She is sixty years old.
- S10371 Il a cent ans. = He is a hundred years old.
- S10372 Elle a quel âge ? = How old is she?

**U105 At the Café** (6)

- S6452 Une tasse de café, s'il vous plaît. = A cup of coffee, please.
- S6453 Une tasse de thé, s'il te plaît. = A cup of tea, please.
- S6454 La tasse est petite. = The cup is small.
- S6455 Un croissant, s'il vous plaît. = A croissant, please.
- S6456 Je mange un croissant. = I'm eating a croissant.
- S6457 Le croissant est grand. = The croissant is big.

**U45 Where You Live** (7)

- S10461 J'habite au dix, rue du Parc. = I live at 10, rue du Parc. (QT09 answer)
- S10462 Tu habites dans quelle rue ? = Which street do you live on?
- S10463 Tu habites près de l'école ? = Do you live near the school?
- S10465 Vous habitez près du parc ? = Do you live near the park?
- S10466 J'habite près du parc. = I live near the park. (QT09 answer)
- S10467 J'aime habiter en ville. = I like living in the city.
- S10469 L'appartement est à quel étage ? = Which floor is the apartment on?

**U53 Body and Feelings** (12)

- S11461 C'est ma main. = It's my hand.
- S11462 Ma main est petite. = My hand is small.
- S11463 C'est ma tête. = It's my head.
- S11464 Il a une grande tête. = He has a big head.
- S11465 C'est mon dos. = It's my back.
- S11466 Le chien a un dos noir. = The dog has a black back.
- S11467 Le dos du chat est blanc. = The cat's back is white.
- S11468 J'aime mes cheveux. = I like my hair.
- S11469 Elle aime ses cheveux. = She likes her hair.
- S11471 Tu as peur ? = Are you afraid?
- S11472 La tête du chien est petite. = The dog's head is small.
- S11473 Le chat a peur. = The cat is afraid.

**U106 At the Supermarket** (8)

- S6553 Du riz, s'il vous plaît. = Rice, please.
- S6555 C'est une tomate. = It's a tomato.
- S6556 Je mange une tomate. = I'm eating a tomato.
- S6558 Voici un œuf. = Here is an egg.
- S6559 J'aime les œufs. = I like eggs.
- S6560 Du beurre, s'il vous plaît. = Butter, please.
- S6561 J'aime le beurre. = I like butter.
- S6562 Il mange une banane. = He's eating a banana.

**U46 Countries and Languages** (10)

- S10561 J'habite en Allemagne. = I live in Germany.
- S10562 Il va en Allemagne. = He's going to Germany.
- S10563 Tu habites en Allemagne ? = Do you live in Germany?
- S10565 Elle va en Italie. = She's going to Italy.
- S10566 Vous habitez en Italie ? = Do you live in Italy?
- S10568 Il va en Espagne. = He's going to Spain.
- S10569 Tu vas en Espagne ? = Are you going to Spain?
- S10571 Tu es américain ? = Are you American?
- S10572 Oui, je vais en Espagne. = Yes, I'm going to Spain. (QT09 answer)
- S10573 Non, je suis allemand. = No, I'm German. (QT09 answer)

**U107 At the Beach** (9)

- S6651 Voici la plage. = Here is the beach.
- S6652 La plage est grande. = The beach is big.
- S6653 J'aime la mer. = I like the sea.
- S6654 La mer est grande. = The sea is big.
- S6655 Voici la mer. = Here is the sea.
- S6656 J'ai un bateau. = I have a boat.
- S6657 Le bateau est petit. = The boat is small.
- S6659 J'aime le sable. = I like the sand.
- S6660 Le sable est ici. = The sand is here.

**U47 At the Market** (6)

- S10661 J'achète un kilo de pommes. = I'm buying a kilo of apples.
- S10662 Je voudrais un kilo de pommes, s'il vous plaît. = I'd like a kilo of apples, please.
- S10663 Tu achètes des légumes ? = Are you buying vegetables?
- S10664 Tu achètes des fruits au marché ? = Do you buy fruit at the market?
- S10665 Un kilo de fromage, s'il vous plaît. = A kilo of cheese, please.
- S10666 Oui, j'achète des légumes. = Yes, I'm buying vegetables. (QT09 answer)

**U54 People** (12)

- S11561 J'aime les gens. = I like people.
- S11562 Elle aime les gens. = She likes people.
- S11563 C'est mon copain. = He's my friend.
- S11564 Paul est mon copain. = Paul is my friend.
- S11565 C'est ma copine. = She's my friend.
- S11566 Marie est ma copine. = Marie is my friend.
- S11567 Je suis élève. = I'm a pupil.
- S11568 C'est un bon élève. = He's a good pupil.
- S11569 C'est un client. = He's a customer.
- S11570 Le client est content. = The customer is pleased.
- S11571 Qui est la dame ? = Who is the lady?
- S11572 J'aime le pain, mais pas le fromage. = I like bread, but not cheese.

**U36 Checking You Understood** (2)

- S11161 Tu as compris ? = Did you understand?
- S11162 Oui, j'ai compris. = Yes, I understood. (QT09 answer)

**U48 How Much Is It?** (12)

- S10761 Quel est le prix ? = What's the price?
- S10762 Le prix, c'est dix euros. = The price is ten euros.
- S10763 C'est un bon prix. = It's a good price.
- S10764 Les pommes coûtent deux euros. = The apples cost two euros. (QT09 answer)
- S10765 Combien coûtent les fruits ? = How much is the fruit?
- S10766 Les légumes coûtent trois euros le kilo. = The vegetables cost three euros a kilo.
- S10767 Ça coûte un euro. = It costs one euro.
- S10768 Le pain coûte un euro. = The bread costs one euro.
- S10769 La pomme coûte un euro. = The apple costs one euro.
- S10770 La ville est chère. = The city is expensive.
- S10771 La pomme est chère. = The apple is expensive.
- S10772 Elle est chère ? = Is it expensive?

**U49 Bottles and Bags** (5)

- S10863 La bouteille est dans le sac. = The bottle is in the bag.
- S10864 Un paquet de biscuits, s'il vous plaît. = A packet of biscuits, please.
- S10865 Le paquet est dans le sac. = The packet is in the bag.
- S10866 C'est un petit paquet. = It's a small packet.
- S10868 La boîte est dans le sac. = The box is in the bag.

**U55 Outdoors** (16)

- S11661 La montagne est belle. = The mountain is beautiful.
- S11662 J'aime la montagne. = I like the mountains.
- S11663 Le chat est dans l'arbre. = The cat is in the tree.
- S11664 La terre est noire. = The soil is black.
- S11665 La terre est rouge ici. = The soil is red here.
- S11666 Le vent est froid. = The wind is cold.
- S11667 J'aime le vent. = I like the wind.
- S11668 J'aime la nature. = I like nature.
- S11669 C'est un pont. = It's a bridge.
- S11670 Le pont est grand. = The bridge is big.
- S11671 Où est le pont ? = Where is the bridge?
- S11672 J'habite dans le sud. = I live in the south.
- S11673 Il va dans le sud. = He's going to the south.
- S11674 Elle habite dans le sud de la France. = She lives in the south of France.
- S11675 Où est la route ? = Where is the road?
- S11676 Il aime la nature. = He likes nature.

## Spanish drafted sentences

Every Spanish sentence I wrote (146), for a native speaker of Latin American Spanish. Tatoeba sentences aren't listed.

**U01 Saying Hello** (16)

- S1103 ¿Cómo te llamas, niña? = What's your name, little girl?
- S1104 ¿Te llamas María? = Is your name María? (QT09 question)
- S1105 Sí, me llamo María. = Yes, my name is María. (QT09 answer)
- S1107 ¡Adiós, María! = Goodbye, María!
- S1108 Adiós, señora. = Goodbye, ma'am.
- S1109 Hola, señora. = Hello, ma'am.
- S1110 Sí, señora. = Yes, ma'am.
- S1111 Hola, señor. = Hello, sir.
- S1113 ¿Eres una niña? = Are you a girl? (QT09 question)
- S1114 No, soy un niño. = No, I'm a boy. (QT09 answer)
- S1115 Eres una chica. = You're a girl.
- S1117 No soy una chica. = I'm not a girl.
- S1118 ¿Eres un chico? = Are you a boy? (QT09 question)
- S1119 Sí, soy un chico. = Yes, I'm a boy. (QT09 answer)
- S1120 Yo me llamo Ana. = My name is Ana.
- S1121 Adiós, señor. = Goodbye, sir.

**U02 People and Things** (11)

- S2101 La carta es pequeña. = The letter is small.
- S2102 La mesa es pequeña. = The table is small.
- S2103 La puerta es pequeña. = The door is small.
- S2104 La puerta es grande. = The door is big.
- S2105 Esta es la puerta. = This is the door.
- S2106 Esta es una mesa. = This is a table.
- S2107 La mesa es grande. = The table is big.
- S2108 Eso es una carta. = That's a letter.
- S2109 Eso es un periódico. = That's a newspaper.
- S2112 Sí, es una carta. = Yes, it's a letter. (QT09 answer)
- S2113 Sí, él es Tom. = Yes, he's Tom. (QT09 answer)

**U03 Polite Phrases** (9)

- S3102 Una mesa, por favor. = A table, please.
- S3104 Buenas tardes, Tom. = Good afternoon, Tom.
- S3105 Buenas tardes, ¿cómo está usted? = Good afternoon, how are you?
- S3106 Perdón, ¿es usted Tom? = Excuse me, are you Tom?
- S3108 Perdón, señor. = Excuse me, sir.
- S3109 De nada, Tom. = You're welcome, Tom.
- S3110 De nada, señora. = You're welcome, ma'am.
- S3112 Sí, estoy bien. = Yes, I'm fine. (QT09 answer)
- S3113 Tom está bien. = Tom is fine. (QT09 answer)

**U04 Food and Drink** (5)

- S4101 ¿Comes pan? = Do you eat bread? (QT09 question)
- S4102 Comes una manzana. = You're eating an apple.
- S4103 ¿Bebes leche? = Do you drink milk? (QT09 question)
- S4104 Como una naranja. = I'm eating an orange.
- S4106 Sí, como pan. = Yes, I eat bread. (QT09 answer)

**U05 Pets and Animals** (10)

- S5101 Tengo un pájaro. = I have a bird.
- S5103 Tengo un pato. = I have a duck.
- S5104 El pato come pan. = The duck is eating bread.
- S5105 ¿Tienes un pato? = Do you have a duck?
- S5107 La tortuga es pequeña. = The turtle is small.
- S5108 ¿Tienes una tortuga? = Do you have a turtle? (QT09 question)
- S5109 No, tengo un ratón. = No, I have a mouse. (QT09 answer)
- S5112 El perro es un animal. = The dog is an animal.
- S5113 ¿Es un animal? = Is it an animal?
- S5114 Sí, tengo un libro. = Yes, I have a book. (QT09 answer)

**U06 More Than One** (25)

- S6101 Los perros son grandes. = The dogs are big. (QT09 answer)
- S6102 Los gatos son pequeños. = The cats are small.
- S6103 Las casas son grandes. = The houses are big.
- S6104 Las casas son pequeñas. = The houses are small.
- S6105 Las chicas son pequeñas. = The girls are small.
- S6106 Tengo unos libros. = I have some books.
- S6107 Tengo unos perros. = I have some dogs.
- S6108 Comen unas manzanas. = They're eating some apples.
- S6110 Unas chicas comen pan. = Some girls are eating bread.
- S6111 Nosotros somos hombres. = We are men.
- S6112 Nosotros somos mujeres. = We are women.
- S6113 Ellas son mujeres. = They are women.
- S6114 Ellas beben agua. = They drink water.
- S6115 Los hombres beben café. = The men drink coffee.
- S6116 Las chicas tienen un gato. = The girls have a cat.
- S6117 Los gatos comen. = The cats eat.
- S6118 Son casas grandes. = They are big houses.
- S6119 Los libros son pequeños. = The books are small.
- S6120 Tengo unos gatos. = I have some cats. (QT09 answer)
- S6121 Los perros comen pan. = The dogs are eating bread.
- S6122 Ellas son pequeñas. = They are small.
- S6123 Los chicos comen pan. = The boys are eating bread. (QT09 answer)
- S6124 ¿Son grandes los perros? = Are the dogs big? (QT09 question)
- S6125 ¿Los chicos comen pan? = Are the boys eating bread? (QT09 question)
- S6126 Nosotros somos niños. = We are children.

**U07 Describing Things** (3)

- S7101 Sí, soy nuevo. = Yes, I'm new. (QT09 answer)
- S7102 Sí, es nuevo. = Yes, it's new. (QT09 answer)
- S7103 Sí, Tom es muy bueno. = Yes, Tom is very good. (QT09 answer)

**U08 Where Things Are** (4)

- S8102 Hay una cama aquí. = There's a bed here.
- S8103 El baño está allí. = The bathroom is over there.
- S8104 Sí, hay leche. = Yes, there's milk. (QT09 answer)
- S8105 No, no hay pan. = No, there's no bread. (QT09 answer)

**U09 Ser or Estar** (7)

- S9101 Ella está contenta. = She's happy.
- S9102 María está muy contenta. = María is very happy.
- S9103 Ella es profesora. = She's a teacher.
- S9104 Soy profesora. = I'm a teacher.
- S9105 ¿Es usted profesora? = Are you a teacher? (QT09 question)
- S9106 Sí, soy profesora. = Yes, I'm a teacher. (QT09 answer)
- S9107 Sí, es médico. = Yes, he's a doctor. (QT09 answer)

**U10 Mine and Yours** (8)

- S10101 ¿Son tus libros? = Are they your books? (QT09 question)
- S10102 Sí, son mis libros. = Yes, they're my books. (QT09 answer)
- S10104 Tus perros son grandes. = Your dogs are big.
- S10105 Sus amigos están aquí. = His friends are here.
- S10106 Ella tiene sus libros. = She has her books.
- S10109 Sí, soy tu amigo. = Yes, I'm your friend. (QT09 answer)
- S10110 Sí, es mi familia. = Yes, it's my family. (QT09 answer)
- S10111 Sí, somos amigos. = Yes, we're friends. (QT09 answer)

**U11 Asking Questions** (1)

- S11103 No como porque estoy enfermo. = I'm not eating because I'm sick. (QT09 answer)

**U12 Counting to Ten** (13)

- S12102 Hay seis manzanas. = There are six apples. (QT09 answer)
- S12105 Hay siete libros en la mesa. = There are seven books on the table.
- S12106 Tom tiene siete perros. = Tom has seven dogs.
- S12107 Tengo ocho manzanas. = I have eight apples.
- S12108 Hay ocho niños aquí. = There are eight children here.
- S12109 Tiene ocho gatos. = He has eight cats.
- S12110 Tengo nueve libros. = I have nine books. (QT09 answer)
- S12111 Hay nueve perros. = There are nine dogs.
- S12112 Somos nueve. = There are nine of us.
- S12113 Hay diez casas. = There are ten houses.
- S12114 Tengo diez amigos. = I have ten friends.
- S12117 ¿Cuántas amigas tienes? = How many friends do you have?
- S12118 Tom tiene dos gatos. = Tom has two cats. (QT09 answer)

**U13 Naming Colours** (6)

- S13103 Tengo una mesa negra. = I have a black table.
- S13104 Esta casa es negra. = This house is black.
- S13105 El pájaro es amarillo. = The bird is yellow. (QT09 answer)
- S13107 Tengo una carta amarilla. = I have a yellow letter.
- S13108 El libro es verde. = The book is green. (QT09 answer)
- S13109 Mi casa es blanca. = My house is white. (QT09 answer)

**U14 Days and Times** (6)

- S14101 Es una buena semana. = It's a good week.
- S14103 El lunes es un día de la semana. = Monday is a day of the week.
- S14104 Tengo una hora. = I have an hour.
- S14106 Es la una. = It's one o'clock. (QT09 answer)
- S14108 El domingo estoy en casa. = On Sunday I'm at home.
- S14109 No, hoy es domingo. = No, today is Sunday. (QT09 answer)

**U15 Going Places** (3)

- S15101 La escuela está allí. = The school is over there. (QT09 answer)
- S15102 Sí, me gusta la escuela. = Yes, I like school. (QT09 answer)
- S15103 Sí, yo también voy. = Yes, I'm going too. (QT09 answer)

**U31 Asking for Help** (8)

- S31101 Repite, por favor. = Please repeat.
- S31102 Repita, por favor. = Please repeat.
- S31103 Repite, por favor. No entiendo. = Please repeat. I don't understand.
- S31104 Repita más despacio, por favor. = Please repeat more slowly.
- S31105 Repite más despacio, por favor. = Please repeat more slowly.
- S31106 No entiendo. Repita, por favor. = I don't understand. Please repeat.
- S31108 Otra vez, por favor. = Again, please.
- S31109 ¿Me entiendes? = Do you understand me?

**U32 Asking About Words** (3)

- S32101 ¿Qué quiere decir eso? = What does that mean?
- S32102 ¿Qué quiere decir «gracias»? = What does "gracias" mean?
- S32103 ¿Cómo se dice «gracias» en inglés? = How do you say "gracias" in English?

**U33 Finding the Word** (8)

- S33101 Busco la palabra. = I'm looking for the word.
- S33102 Busco una palabra. = I'm looking for a word.
- S33103 Busco la palabra en español. = I'm looking for the word in Spanish.
- S33104 Es una cosa para el agua. = It's a thing for water.
- S33105 Es una cosa para el pan. = It's a thing for bread.
- S33106 ¿Para qué sirve? = What is it for?
- S33107 Sirve para el agua. = It's for water.
- S33108 Sirve para el pan. = It's for bread.


## German drafted sentences

Every German sentence I wrote (87), for a native speaker of German as spoken in Germany. Tatoeba sentences aren't listed.

**U01 Saying Hello** (10)

- S1101 Tschüss, Tom! = Bye, Tom!
- S1102 Tschüss, Maria! = Bye, Maria!
- S1103 Nein, ich bin nicht Tom. = No, I'm not Tom.
- S1104 Nein, ich bin Anna. = No, I'm Anna.
- S1106 Du bist ein Mann. = You are a man.
- S1107 Bist du ein Mann? = Are you a man?
- S1109 Bist du ein Junge? = Are you a boy?
- S1110 Du bist ein Mädchen. = You are a girl.
- S1111 Bist du ein Kind? = Are you a child?
- S1112 Bist du eine Frau? = Are you a woman?

**U02 People and Things** (8)

- S2101 Der Brief ist hier. = The letter is here.
- S2102 Der Brief ist klein. = The letter is small.
- S2103 Ist der Brief hier? = Is the letter here?
- S2104 Die Zeitung ist hier. = The newspaper is here.
- S2105 Die Zeitung ist groß. = The newspaper is big.
- S2106 Ist die Zeitung hier? = Is the newspaper here?
- S2107 Die Frau ist hier. = The woman is here.
- S2108 Ist das Haus groß? = Is the house big?

**U03 Polite Phrases** (4)

- S3104 Auf Wiedersehen, Tom! = Goodbye, Tom!
- S3105 Danke und auf Wiedersehen! = Thank you and goodbye!
- S3106 Entschuldigung! = Excuse me!
- S3108 Entschuldigung, ist das Tom? = Excuse me, is that Tom?

**U04 Food and Drink** (5)

- S4101 Das ist ein Apfel. = That is an apple.
- S4102 Der Apfel ist klein. = The apple is small.
- S4103 Ja, ich mag Kaffee. = Yes, I like coffee. (QT09 answer)
- S4104 Ja, ich trinke Tee. = Yes, I drink tea. (QT09 answer)
- S4105 Ja, ich mag Käse. = Yes, I like cheese. (QT09 answer)

**U05 Pets and Animals** (6)

- S5105 Tom hat eine Ente. = Tom has a duck.
- S5106 Ist das eine Ente? = Is that a duck?
- S5107 Ich habe eine Maus. = I have a mouse.
- S5108 Die Maus ist klein. = The mouse is small.
- S5109 Ja, ich habe einen Hund. = Yes, I have a dog. (QT09 answer)
- S5110 Das Pferd ist ein Tier. = The horse is an animal.

**U06 More Than One** (7)

- S6101 Wir haben Bücher. = We have books.
- S6104 Die Männer trinken Kaffee. = The men drink coffee.
- S6105 Die Frauen essen Brot. = The women eat bread.
- S6107 Die Häuser sind klein. = The houses are small.
- S6108 Sind die Häuser groß? = Are the houses big?
- S6109 Ja, ich habe Äpfel. = Yes, I have apples. (QT09 answer)
- S6110 Ja, ich mag Katzen. = Yes, I like cats. (QT09 answer)

**U07 Describing Things** (3)

- S7101 Ja, Tom ist sehr jung. = Yes, Tom is very young. (QT09 answer)
- S7102 Ja, es ist neu. = Yes, it is new. (QT09 answer)
- S7103 Ja, ich bin auch neu hier. = Yes, I'm new here too. (QT09 answer)

**U09 Mine and Yours** (4)

- S9101 Ja, ich mag deinen Freund. = Yes, I like your friend. (QT09 answer)
- S9102 Ja, ich habe dein Buch. = Yes, I have your book. (QT09 answer)
- S9103 Ja, mein Auto ist neu. = Yes, my car is new. (QT09 answer)
- S9104 Ja, meine Kinder sind hier. = Yes, my children are here. (QT09 answer)

**U10 Asking Questions** (2)

- S10101 Ich komme aus Berlin. = I'm from Berlin. (QT09 answer)
- S10102 Tom kommt aus Hamburg. = Tom is from Hamburg. (QT09 answer)

**U11 Counting to Ten** (8)

- S11101 Ich habe fünf Äpfel. = I have five apples. (QT09 answer)
- S11102 Ich habe neun Bücher. = I have nine books. (QT09 answer)
- S11103 Tom hat fünf Katzen. = Tom has five cats. (QT09 answer)
- S11104 Hier sind neun Kinder. = There are nine children here.
- S11105 Sie ist neun. = She is nine.
- S11107 Sie hat acht Bücher. = She has eight books.
- S11109 Ich habe sieben Äpfel. = I have seven apples.
- S11110 Ja, es gibt Milch. = Yes, there is milk. (QT09 answer)

**U12 Naming Colours** (2)

- S12101 Nein, das Pferd ist weiß. = No, the horse is white. (QT09 answer)
- S12103 Ja, der Hund ist schwarz. = Yes, the dog is black. (QT09 answer)

**U13 Days and Times** (3)

- S13103 Ich habe eine Woche Zeit. = I have a week.
- S13104 Ich komme am Sonntag. = I'm coming on Sunday.
- S13106 Nein, heute ist Samstag. = No, today is Saturday. (QT09 answer)

**U14 Going Places** (2)

- S14102 Der Park ist hier. = The park is here. (QT09 answer)
- S14103 Ja, ich bin zu Hause. = Yes, I'm at home. (QT09 answer)

**U15 Wanting and Can** (5)

- S15102 Wir spielen heute. = We're playing today.
- S15103 Kannst du morgen spielen? = Can you play tomorrow?
- S15104 Ja, ich kann morgen spielen. = Yes, I can play tomorrow. (QT09 answer)
- S15105 Ja, ich möchte Tee. = Yes, I'd like tea. (QT09 answer)
- S15106 Ja, ich kann Deutsch sprechen. = Yes, I can speak German. (QT09 answer)

**U31 Asking for Help** (5)

- S31101 Ich verstehe nicht. = I don't understand.
- S31102 Wiederholen Sie bitte. = Please repeat.
- S31103 Wiederholen Sie bitte langsamer. = Please repeat more slowly.
- S31104 Bitte wiederholen! = Please repeat!
- S31105 Verstehst du? = Do you understand?

**U32 Asking About Words** (5)

- S32101 Wie sagt man das auf Deutsch? = How do you say that in German?
- S32102 Wie sagt man „danke“ auf Englisch? = How do you say "danke" in English?
- S32104 Was heißt das auf Englisch? = What does that mean in English?
- S32106 Was bedeutet das Wort „Haus“? = What does the word "Haus" mean?
- S32107 Ich verstehe das Wort nicht. = I don't understand the word.

**U33 Finding the Word** (8)

- S33101 Ich suche das Wort. = I'm looking for the word.
- S33102 Das ist ein Ding für Wasser. = It's a thing for water.
- S33103 Das ist ein Ding für Brot. = It's a thing for bread.
- S33105 Wie nennt man das Ding? = What do you call the thing?
- S33106 Das ist eine Sache für Kinder. = That's a thing for children.
- S33107 Das ist eine Sache für Tee. = It's a thing for tea.
- S33108 Er heißt Tom. = His name is Tom. (QT09 answer)
- S33109 Sie heißt Anna. = Her name is Anna. (QT09 answer)
