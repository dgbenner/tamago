# Tamago check-in

Updated November 10, 2026. **Two new topic packs at a second Your Topic node, the content sweep and the Developer area are live** at https://tamago-83f.pages.dev.

## Done since last check-in

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
- **S6057 cut** from the Weather pack ("Il a du temps."), so the native-speaker list is now 299.
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

0. **Weather pack, temps (your call, no hurry).** With S6057 cut, temps is in 2 sentences, under the 3-per-word rule, and both use it as "time" (J'ai du temps, Tu as du temps), not weather. Tatoeba has nothing checked that uses it for weather within Units 1 to 5. Options: leave it, drop temps and those two sentences, or let the Weather pack use all of A1 too (Il fait beau temps and the like would then fit).
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
     - The 21 square files (Aji, Amaebi … Uni, 512 by 512) carry no origin either. Please confirm where they came from.
   - Commercial emoji check: none of the files is a copy of an Apple, Google, Samsung or Microsoft emoji. The "Emoji" in some file names reads as a generation prompt, not a vendor set. The OpenAI terms assign generated images to you. If the 512 set came from a stock or emoji pack, tell me which, and I'll check its licence.
   - No icon has a face, a character or text.
2. **Netlify (your call, no hurry).** Builds are stopped and the old site still serves Phase 5 at https://tamago-590.netlify.app. Anyone who had it installed stays on that old version; the new home is https://tamago-83f.pages.dev. Delete the Netlify site whenever you like, or keep it. A custom domain on Cloudflare (for example a subdomain of danbenner.com) is a few clicks when you want one.
3. **Native-speaker check (now 299 sentences: 18 in Unit 1 and the 281 drafts listed below).** Arrange the person. On their phone they open https://tamago-83f.pages.dev/#developer, then Native-Speaker Check. When they're done they tap Save the results and send you the file. Put it in _source/ and I'll fold it in.
4. **Claude explanations and Claude-written practice: key added 2026-11-09.** Key tamago-cloudflare, in its own Anthropic workspace (Tamago) with a $5 monthly spend limit, stored only as a Cloudflare Pages secret (TAMAGO_ANTHROPIC_API_KEY). **The key expires January 2, 2027**; after that both features switch off quietly until a new key replaces it (Console, Tamago workspace, then the same secret in Cloudflare and a redeploy).
   - Cost: Haiku 5.5 is $0.10 per million input tokens and $0.50 per million output; one explanation is a few hundred tokens. Claude-written practice uses Opus 5.5 ($4 and $20 per million), a few cents a set. The $5 cap stops everything for the rest of the month if it's ever reached.
5. **Sign-in, sync, discussions, flags from testers (a new account).** These need an account service with a database. My suggestion is Supabase (https://supabase.com, free tier, sign-in by email link). Say yes and create the project, and I'll walk you through the keys one step at a time.
6. **Testers (your call).** When you say go, I'll turn Testing shortcuts off by default and give you the link to send. Until there's a server, testers send their flags by saving the flags file.
7. **Earlier items:**
   - Try the topics and Words on your phone.

## Drafted sentences

Every sentence I wrote, for the native-speaker check. Tatoeba sentences aren't listed.

**U02 Basics 2** (23)

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

**U03 Phrases** (20)

- S3101 Vous êtes Paul ? = Are you Paul? (QT09 question)
- S3102 Non, je suis Marie. = No, I'm Marie. (QT09 answer)
- S3103 Ça va, Marie ? = Are you OK, Marie? (QT09 question)
- S3104 Oui, ça va bien. = Yes, I'm fine. (QT09 answer)
- S3105 Tu es Marie ? = Are you Marie? (QT09 question)
- S3106 Oui, bonsoir ! Je suis Marie. = Yes, good evening! I'm Marie. (QT09 answer)
- S3107 Comment ça va, Paul ? = How are you, Paul? (QT09 question)
- S3108 Bien, merci, Marie. = Fine, thanks, Marie. (QT09 answer)
- S3109 Excusez-moi, vous êtes Paul ? = Excuse me, are you Paul?
- S3110 Excusez-moi, s'il vous plaît. = Excuse me, please.
- S3111 Excusez-moi, je suis Marie. = Excuse me, I'm Marie.
- S3112 Pardon, tu es Paul ? = Sorry, are you Paul?
- S3113 Pardon, Marie ! = Sorry, Marie!
- S3114 Pardon, c'est ici ? = Excuse me, is it here?
- S3115 Paul, s'il te plaît ! = Paul, please!
- S3116 Oui, s'il te plaît. = Yes, please.
- S3117 Bonsoir, Paul ! = Good evening, Paul!
- S3118 Bonne nuit, Marie. = Good night, Marie.
- S3119 De rien, Paul. = You're welcome, Paul.
- S3120 Au revoir, à bientôt ! = Goodbye, see you soon!

**U04 Food** (11)

- S4101 Tu manges une pomme ? = Are you eating an apple? (QT09 question)
- S4102 Oui, je mange une pomme. = Yes, I'm eating an apple. (QT09 answer)
- S4103 Tu aimes le fromage ? = Do you like cheese? (QT09 question)
- S4104 Oui, j'aime bien le fromage. = Yes, I quite like cheese. (QT09 answer)
- S4105 Tu manges du pain ? = Are you eating bread? (QT09 question)
- S4106 Non, je mange un sandwich. = No, I'm eating a sandwich. (QT09 answer)
- S4107 Tu aimes le lait ? = Do you like milk? (QT09 question)
- S4108 Non, j'aime l'eau. = No, I like water. (QT09 answer)
- S4109 Il mange une orange. = He's eating an orange.
- S4110 Tu aimes le pain ? = Do you like bread?
- S4111 Elle mange un sandwich. = She's eating a sandwich.

**U05 Animals** (11)

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

**U06 Plurals** (23)

- S7051 J'ai des livres. = I have books.
- S7052 Les livres sont ici. = The books are here.
- S7053 Voici les livres. = Here are the books.
- S7054 J'ai des lettres. = I have letters.
- S7055 Les lettres sont ici. = The letters are here.
- S7056 Voici des lettres. = Here are some letters.
- S7057 Voici les chats. = Here are the cats.
- S7058 Il mange des pommes. = He's eating apples.
- S7059 J'aime les pommes. = I like apples.
- S7060 Voici des pommes. = Here are some apples.
- S7061 J'ai des oiseaux. = I have birds.
- S7062 Les oiseaux sont ici. = The birds are here.
- S7063 J'aime les oiseaux. = I like birds.
- S7064 Voici les chevaux. = Here are the horses.
- S7065 J'aime les chevaux. = I like horses.
- S7066 Vous êtes des enfants ? = Are you children? (QT09 question)
- S7067 Non, nous sommes des hommes. = No, we are men. (QT09 answer)
- S7068 Tu as des chats ? = Do you have cats? (QT09 question)
- S7069 Oui, j'ai des chats. = Yes, I have cats. (QT09 answer)
- S7070 Les chiens sont ici ? = Are the dogs here? (QT09 question)
- S7071 Oui, les chiens sont ici. = Yes, the dogs are here. (QT09 answer)
- S7072 Tu manges des pommes ? = Are you eating apples? (QT09 question)
- S7073 Non, je mange du pain. = No, I'm eating bread. (QT09 answer)

**U07 Adjectives** (10)

- S7153 Il est très vieux. = He is very old.
- S7154 C'est une vieille lettre. = It's an old letter.
- S7155 Le pain est bon ? = Is the bread good? (QT09 question)
- S7156 Oui, le pain est très bon. = Yes, the bread is very good. (QT09 answer)
- S7157 Elle est gentille ? = Is she nice? (QT09 question)
- S7158 Oui, elle est très gentille. = Yes, she's very nice. (QT09 answer)
- S7159 Le chien est vieux ? = Is the dog old? (QT09 question)
- S7160 Non, il est jeune. = No, he's young. (QT09 answer)
- S7161 La pomme est bonne ? = Is the apple good? (QT09 question)
- S7162 Oui, elle est très bonne. = Yes, it's very good. (QT09 answer)

**U08 Possessives** (21)

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
- S7265 C'est ton chien ? = Is it your dog? (QT09 question)
- S7266 Oui, c'est mon chien. = Yes, it's my dog. (QT09 answer)
- S7267 C'est ta pomme ? = Is it your apple? (QT09 question)
- S7268 Non, c'est sa pomme. = No, it's her apple. (QT09 answer)
- S7269 Tes enfants sont ici ? = Are your children here? (QT09 question)
- S7270 Oui, mes enfants sont ici. = Yes, my children are here. (QT09 answer)
- S7271 Ton ami mange ? = Is your friend eating? (QT09 question)
- S7272 Oui, mon ami mange un sandwich. = Yes, my friend is eating a sandwich. (QT09 answer)

**U09 Questions** (13)

- S7351 Qu'est-ce que tu manges ? = What are you eating?
- S7352 Quel livre ? = Which book?
- S7353 Quelle pomme ? = Which apple?
- S7354 Quelle lettre est ici ? = Which letter is here?
- S7355 Je mange parce que j'aime le pain. = I'm eating because I like bread.
- S7356 Il est ici parce que tu es ici. = He is here because you are here.
- S7357 Où est le chat ? = Where is the cat? (QT09 question)
- S7358 Le chat est ici. = The cat is here. (QT09 answer)
- S7359 Qui est ici ? = Who is here? (QT09 question)
- S7360 Paul est ici. = Paul is here. (QT09 answer)
- S7361 Qu'est-ce que tu aimes ? = What do you like? (QT09 question)
- S7363 Est-ce que tu as un chien ? = Do you have a dog? (QT09 question)
- S7364 Oui, j'ai un chien. = Yes, I have a dog. (QT09 answer)

**U10 Numbers** (20)

- S7451 J'ai quatre chats. = I have four cats.
- S7452 Il a quatre livres. = He has four books.
- S7453 Elle a cinq livres. = She has five books.
- S7454 Nous sommes cinq. = There are five of us. (QT09 answer)
- S7455 J'ai six pommes. = I have six apples.
- S7456 Elle a six oiseaux. = She has six birds.
- S7457 Il a sept chats. = He has seven cats.
- S7458 J'ai sept livres. = I have seven books. (QT09 answer)
- S7459 J'ai huit pommes. = I have eight apples.
- S7460 Il a huit chiens. = He has eight dogs. (QT09 answer)
- S7461 Nous sommes huit. = There are eight of us.
- S7462 J'ai neuf livres. = I have nine books.
- S7463 Elle a neuf chats. = She has nine cats.
- S7464 Nous sommes neuf. = There are nine of us.
- S7465 J'ai dix pommes. = I have ten apples.
- S7466 Il a dix oiseaux. = He has ten birds.
- S7467 Nous sommes dix. = There are ten of us.
- S7468 Tu as combien de chats ? = How many cats do you have? (QT09 question)
- S7470 Il a combien de chiens ? = How many dogs does he have? (QT09 question)
- S7472 Tu as combien de livres ? = How many books do you have? (QT09 question)

**U11 Colours** (23)

- S7551 Le livre est vert. = The book is green.
- S7552 J'ai un livre vert. = I have a green book.
- S7553 La pomme est verte. = The apple is green.
- S7554 C'est une pomme verte. = It's a green apple.
- S7555 La tortue est verte. = The tortoise is green.
- S7557 La souris est noire. = The mouse is black.
- S7558 C'est une souris noire. = It's a black mouse.
- S7559 Elle a une souris noire. = She has a black mouse.
- S7560 La lettre est blanche. = The letter is white.
- S7561 J'ai une souris blanche. = I have a white mouse.
- S7562 La lettre est bleue. = The letter is blue.
- S7574 C'est une lettre bleue. = It's a blue letter.
- S7563 C'est une pomme jaune. = It's a yellow apple.
- S7564 Le canard est jaune. = The duck is yellow.
- S7565 J'ai un livre bleu. = I have a blue book.
- S7566 Le chat est noir ? = Is the cat black? (QT09 question)
- S7567 Non, il est blanc. = No, it's white. (QT09 answer)
- S7568 La pomme est rouge ? = Is the apple red? (QT09 question)
- S7569 Non, elle est verte. = No, it's green. (QT09 answer)
- S7570 Le livre est bleu ? = Is the book blue? (QT09 question)
- S7571 Non, il est jaune. = No, it's yellow. (QT09 answer)
- S7572 La souris est blanche ? = Is the mouse white? (QT09 question)
- S7573 Oui, elle est blanche. = Yes, it's white. (QT09 answer)

**U12 Time** (22)

- S7651 Demain, c'est dimanche. = Tomorrow is Sunday.
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
- S7665 C'est lundi aujourd'hui ? = Is it Monday today? (QT09 question)
- S7666 Non, aujourd'hui c'est dimanche. = No, today is Sunday. (QT09 answer)
- S7667 Tu manges maintenant ? = Are you eating now? (QT09 question)
- S7668 Oui, je mange maintenant. = Yes, I'm eating now. (QT09 answer)
- S7669 Tu es ici demain ? = Are you here tomorrow? (QT09 question)
- S7670 Oui, je suis ici demain. = Yes, I'm here tomorrow. (QT09 answer)
- S7671 Tu manges le matin ? = Do you eat in the morning? (QT09 question)
- S7672 Non, je mange le soir. = No, I eat in the evening. (QT09 answer)

**U13 Places** (15)

- S7751 La ville est grande. = The town is big.
- S7752 Je vais au magasin. = I'm going to the shop.
- S7753 Le magasin est petit. = The shop is small.
- S7754 Elle va au magasin. = She's going to the shop.
- S7755 Le chat est dans le parc. = The cat is in the park.
- S7756 Je suis dans le magasin. = I'm in the shop.
- S7757 Le chien est dans le restaurant. = The dog is in the restaurant.
- S7758 Tu vas au parc ? = Are you going to the park? (QT09 question)
- S7759 Oui, je vais au parc. = Yes, I'm going to the park. (QT09 answer)
- S7760 Où est-ce que tu vas ? = Where are you going? (QT09 question)
- S7761 Je vais au restaurant. = I'm going to the restaurant. (QT09 answer)
- S7762 Il va à l'école ? = Is he going to school? (QT09 question)
- S7763 Oui, il va à l'école. = Yes, he's going to school. (QT09 answer)
- S7764 Où est le magasin ? = Where is the shop? (QT09 question)
- S7765 Le magasin est dans la ville. = The shop is in the town. (QT09 answer)

**U101 Weather** (7)

- S6051 Elle aime la pluie. = She likes the rain.
- S6052 J'aime le soleil. = I like the sun.
- S6053 Voici le soleil ! = Here is the sun!
- S6054 Il a chaud. = He's hot.
- S6055 Le soleil est grand. = The sun is big.
- S6056 Tu as du temps ? = Do you have time?

**U102 Family** (12)

- S6151 La mère et le père sont ici. = The mother and the father are here.
- S6152 Voici le père. = Here is the father.
- S6153 J'ai un fils. = I have a son.
- S6154 Le fils est petit. = The son is small.
- S6155 Le bébé est ici. = The baby is here.
- S6156 Les parents sont ici. = The parents are here.
- S6157 Voici les parents. = Here are the parents.
- S6158 Voici la mère. = Here is the mother.
- S6159 La mère est ici. = The mother is here.
- S6160 Le père est ici. = The father is here.
- S6161 Les parents et les enfants sont ici. = The parents and the children are here.
- S6162 Voici le bébé. = Here is the baby.

**U103 Home** (16)

- S6251 La chambre est petite. = The room is small.
- S6252 Voici la chambre. = Here is the room.
- S6253 C'est une grande chambre. = It's a big room.
- S6254 Le lit est ici. = The bed is here.
- S6255 Le lit est grand. = The bed is big.
- S6256 J'ai un petit lit. = I have a small bed.
- S6257 La porte est petite. = The door is small.
- S6258 Voici la porte. = Here is the door.
- S6259 C'est une grande porte. = It's a big door.
- S6260 La fenêtre est grande. = The window is big.
- S6261 Voici la fenêtre. = Here is the window.
- S6262 La table et la chaise sont ici. = The table and the chair are here.
- S6263 Voici une chaise. = Here is a chair.
- S6264 La cuisine est petite. = The kitchen is small.
- S6265 Voici la cuisine. = Here is the kitchen.
- S6266 C'est une petite fenêtre. = It's a small window.

**U104 Music** (7)

- S6351 Il aime la musique. = He likes music.
- S6352 J'aime la chanson. = I like the song.
- S6353 Il a un piano. = He has a piano.
- S6354 Le piano est grand. = The piano is big.
- S6355 Elle a une guitare. = She has a guitar.
- S6356 J'aime la guitare. = I like the guitar.
- S6357 Voici la chanson. = Here is the song.

**U105 Coffee shop** (7)

- S6451 J'aime le chocolat. = I like chocolate.
- S6452 Une tasse de café, s'il vous plaît. = A cup of coffee, please.
- S6453 Une tasse de thé, s'il te plaît. = A cup of tea, please.
- S6454 La tasse est petite. = The cup is small.
- S6455 Un croissant, s'il vous plaît. = A croissant, please.
- S6456 Je mange un croissant. = I'm eating a croissant.
- S6457 Le croissant est grand. = The croissant is big.

**U106 Supermarket** (12)

- S6551 Je mange du poulet. = I'm eating chicken.
- S6552 Je mange du riz. = I'm eating rice.
- S6553 Du riz, s'il vous plaît. = Rice, please.
- S6554 Je mange une banane. = I'm eating a banana.
- S6555 C'est une tomate. = It's a tomato.
- S6556 Je mange une tomate. = I'm eating a tomato.
- S6557 J'ai un œuf. = I have an egg.
- S6558 Voici un œuf. = Here is an egg.
- S6559 J'aime les œufs. = I like eggs.
- S6560 Du beurre, s'il vous plaît. = Butter, please.
- S6561 J'aime le beurre. = I like butter.
- S6562 Il mange une banane. = He's eating a banana.

**U107 The beach** (9)

- S6651 Voici la plage. = Here is the beach.
- S6652 La plage est grande. = The beach is big.
- S6653 J'aime la mer. = I like the sea.
- S6654 La mer est grande. = The sea is big.
- S6655 Voici la mer. = Here is the sea.
- S6656 J'ai un bateau. = I have a boat.
- S6657 Le bateau est petit. = The boat is small.
- S6659 J'aime le sable. = I like the sand.
- S6660 Le sable est ici. = The sand is here.

