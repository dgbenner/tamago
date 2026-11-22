# Tamago Dutch check, A1 Part 1, 2026-11-19

Quality pass on Dutch A1 Part 1, change no code. Two sets: the Tatoeba candidates kept out only by the trust rule (200 distinct sentences in `_review/dutch-candidates.md`), each marked **Use** or **Reject**; and the 163 drafted sentences in `_review/dutch-part1-drafts.md`, each marked **Keep**, **Fix** (with the corrected Dutch and English) or **Cut**, with a swap named where a Use candidate teaches the same word. Use means natural, correct Dutch as spoken in the Netherlands, an accurate English, and right for A1. Meanings and verb forms were checked against the course's Wiktionary data in content-nl/checks (words.json, conjugations.json), not memory; de/het against Wiktionary's noun headers, fetched for this pass, because the checks file has no gender field filled. Part 1 has no task items. The candidates file carries the same marks in place. This is a reviewer's read, not a native speaker's.

## Counts

- Candidates: **Use 145** · **Reject 55** (15 of the Use marks name the English to show).
- Drafts: **Keep 161** · **Fix 2** · **Cut 0**; 10 drafts have a swap named.
- Draft fixes: two (S51109, S51117), both "zijn" used as his, which the word list does not teach; haar (her) replaces it. Cuts: none. Two word-for-word matches are swaps (S15101, S51102); eight more swaps are named.
- Formal "u": no draft and no candidate uses u or uw. The builder's note that generated accepted answers leak "u" (S31109) stands; nothing shown to the learner does.
- Separable verbs and verb-final order: no draft uses a separable verb; one candidate does (#11375852 "Eet en drink op", rejected). Verb-final subordinate clauses appear in 13 candidates (weet je waar we zijn, een paard dat praat, ik ga waar jij ook gaat) and were rejected as past A1. The three omdat drafts in U11 (S11104–S11106) are verb-final by necessity, since omdat is a course word; they are kept and flagged so Dan can decide whether omdat belongs in Part 1 at all.
- Sense traps that drove the rejects: **ze / zij** as they (nine candidates; the learner knows ze as she and the plural pronoun is not taught); **zijn** as his (seven candidates and two drafts, S51109 and S51117; the circle knows zijn only as the verb, and his is not in the word list); **haar** as hair (two); **lang** as tall (two); **te** in "te voet" (two); **wat** as some (one); **op** in opeten (one). Idioms (je hebt mijn woord, op zoek, een blauw oog, te ver gaan, man van zijn woord, houd je mond); one love line (#847843); scolding or slangy lines; two ungrammatical lines (#459927, #473367); odd lines; fragments. "Ik heb het koud" (#413344) was kept: it is the only way Dutch says I'm cold.
- Match Pairs and cognates. The engine keeps a word off Match Pairs only when one comma- or semicolon-separated item of its hint equals the word itself (isCognate in src/lib/lesson.js), and the Dutch hints are the raw Wiktionary glosses. So hotel, museum, park, bed, water, arm, bus, station, strand, in, sorry, pardon, warm, blond and man are kept off, but four words whose English is identical slip through because their hint starts with "a" or a longer phrase: **taxi** ("a taxi"), **film** ("a film, thin layer or membrane"), **hand** ("a hand of a human…"), **school** ("a school, educational institution…"). Their hints should start with the bare word. Beyond those, Dutch is so close to English that a large share of Part 1 is a near-cognate the learner matches without reading: hallo, appel, melk, kaas, thee, koffie, wijn, brood, vis, kat, muis, boek, huis, deur, dokter, foto, muziek, familie, trein, straat, voet, neus, lang, nieuw, oud, jong, goed, hier, dag, uur, maandag, zondag, vader, moeder, broer, vriend, wat, waar, wanneer, honger, koud, ziek, zwemmen, dansen, zingen, voetbal, kleur, groen, blauw, rood, wit, bruin, twee, drie, vier, zes, zeven, acht, negen, tien. The app's identical-only test will not catch any of them. For Dutch a per-course no-match list, or a similarity test in isCognate (say, one letter apart after folding), would keep Match Pairs honest; the builder's call.
- De/het in the drafts, checked against Wiktionary: all right. De lerares, de deur, de tafel, de kaas, de kat, de vogel, de hond, de foto, de film, de kamer, de kerk, de trein, de taxi, de week, de winkel, de stad, de straat, de hand are de-words; het konijn, het feest, het spel (dit spel), het bed, het boek, het ding, het museum, het plein, het hotel, het park, het restaurant, het been are het-words, as Wiktionary has them (konijn, spel, plein, park, museum, hotel, restaurant, feest, been all n). The candidates' articles are right too (het boek, het ziekenhuis, het station, de thee, de appel, het huis, de tuin, de keuken, de badkamer).
- Glossary senses to re-pick or hint (checked in content-nl/checks/words.json; every hint is currently the raw Wiktionary gloss, so most of these are trims): **film** W1026 is glossed "a film, thin layer or membrane": a wrong sense; show "film, movie". **meisje** W015 "diminutive of meid": show "girl". **een** W011 has the lemma "a": the lemma is een. **het** W019 is filed under the lemma de: show "the (het-words)". **dit** W023 and **dat** W024 are filed under deze and die: show "this", "that". **je** W007, **ze** W022, **we** W077 "unstressed form of …": show "you", "she", "we" (unstressed). **ben** W008, **bent** W009, **begrijp** W701, **begrijpt** W702, **zeg** W706, **zegt** W707, **spreek** W708, **praat** W709, **herhaal** W710, **gaat** W045, **eet** W049, **drink** W051, **drinkt** W052, **houd** W053, **houdt** W054, **heb** W065, **hebt** W066, **staat** W102, **ligt** W103, **betekent** W711, **zoek** W715, **weet** W716, **heet** W720, **lees** W1024, **ga** W174 are "inflection of …" strings: show the sense ("am", "are", "I understand", "understands", "I say", "says", "I speak", "speak! / speaks", "repeat!", "goes (hoe gaat het)", "eats; eat!", "I drink", "drinks", "I like (houden van)", "likes", "I have", "you have", "stands, is", "lies, is", "means", "I look for", "knows; know", "is called", "I read", "I go"). **grote** W091 and **welke** W144 are long inflection strings: show "big (before a noun)", "which". **langzamer** W703 "comparative degree of langzaam": show "more slowly". **nog** W704 "still, as before" and **keer** W705 "time": hint "nog een keer = once more". **dank** W035 "gratitude, thanks": hint "dank je = thank you". **graag** W037: add "please (koffie, graag)". **prima** W048 "excellent": show "fine, great". **van** W055 "of": hint "houden van = to like". **kat** W069 "domestic cat, pussy, Felis silvestris catus": show "cat". **konijn** W074, **vogel** W071, **hand** W1003, **been** W1008, **school** W178, **kamer** W114 ("a room, physical chamber in a building a bedroom"), **naar** W176, **wat** W139, **uur** W169, **straat** W182, **week** W168, **blond** W1012, **hoi** W001 ("A greeting acknowledging someone's arrival…") have paragraph glosses: trim to the word. **blij** W117 ends "For generally in life, see gelukkig.": show "happy, glad". **honger** W122 and **dorst** W123: hint "honger / dorst hebben = to be hungry / thirsty". **om** W718 "around, about" and **te** W719 "too": the help circle uses "om te eten = (in order) to eat"; hint both senses, since te as too is also used (te moe). **er** W110 "there": hint "er is = there is". **strand** W1034 "beach, strand": show "beach". **dichtbij** W1037 is tagged adjective: show "nearby, close". **familie** W133 "relatives": show "family". **haar** W128 "her": note that the same word is hair. **morgen** W165 "tomorrow": the same word is morning (goedemorgen). **zijn** W088: note that the same word is his. **veel** W090 "much": show "a lot, many". **voetbal** W1018 is het voetbal (the game) and de voetbal (the ball). De/het is missing from every noun: the gender field is empty for all 240 words in both words.json files, so the Glossary cannot show de or het. Wiktionary's headers give it for every Part 1 noun (fetched for this pass; the list is in the Appendix), and the pipeline should pull it as it does for the other courses.
- Conjugation tables (content-nl/checks/conjugations.json): every Part 1 verb has a table and every taught form is in it, with one wrinkle: **houden** gives "ik hou" while the course teaches houd (W053); both are standard, hou the commoner. The tables do not show the inversion forms (ben je, heb je, eet je, ga je), which Part 1 uses in every question; a hint line that the -t drops after je in questions would help, since the Glossary's "ben" gloss mentions inversion only in Wiktionary's words.

## U01 · Saying Hello

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S1101 | Hoi! Ik ben een jongen. | Hi! I'm a boy. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S1102 | Nee, ik ben Tom. | No, I'm Tom. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S1103 | Jij bent een meisje. | You're a girl. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S1104 | Een meisje en een jongen. | A girl and a boy. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S1105 | Ben je een man? | Are you a man? | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S1106 | Ja, ik ben een kind. | Yes, I'm a child. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S1107 | Hoi! En jij? | Hi! And you? | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S1108 | Tom is een man. | Tom is a man. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S1109 | Anna is een vrouw. | Anna is a woman. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#2509883](https://tatoeba.org/en/sentences/show/2509883) | Ik ben. | I am. | Reject |  | A fragment. |
| [#8453016](https://tatoeba.org/en/sentences/show/8453016) | Ben jij Mary? | Are you Mary? | Use | Are you Mary? | Tatoeba's Mary; the drafts use Maria and Anna. |
| [#11036458](https://tatoeba.org/en/sentences/show/11036458) | Ik ben ik. | I am me. | Reject |  | An odd line (I am me). |
| [#12186141](https://tatoeba.org/en/sentences/show/12186141) | Ik ben Maria. | I'm Mary. | Use | I'm Maria. |  |

## U31 · Asking for Help

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S31101 | Ik begrijp je. | I understand you. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S31103 | Tom begrijpt je. | Tom understands you. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S31104 | Nog een keer, alsjeblieft. | One more time, please. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S31106 | Tom zegt ja. | Tom says yes. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S31107 | Maria zegt nee. | Maria says no. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S31108 | Ik praat langzamer. | I speak more slowly. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S31109 | Praat langzamer, alsjeblieft. | Speak more slowly, please. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S31110 | Herhaal, alsjeblieft. | Repeat, please. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S31111 | Ik herhaal. | I repeat. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S31112 | Herhaal, Tom. | Repeat, Tom. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| | *(no candidates in this circle)* | | | | |

## U02 · People and Things

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S2101 | Zij is lerares. | She's a teacher. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S2102 | De lerares is groot. | The teacher is tall. | Keep |  | Correct; groot of a person is tall, as the English has it. |
| S2103 | De deur is groot. | The door is big. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S2104 | Dat is een deur. | That's a door. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S2105 | De tafel is klein. | The table is small. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S2107 | De deur en de tafel. | The door and the table. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#445017](https://tatoeba.org/en/sentences/show/445017) | Dat is een tafel. | That is a table. | Use |  |  |
| [#846631](https://tatoeba.org/en/sentences/show/846631) | Je bent een dokter. | You are a doctor. | Use | You're a doctor. | Dutch usually drops the article before a profession (je bent dokter, as #1621245 has it); with een it is emphatic but correct. |
| [#997026](https://tatoeba.org/en/sentences/show/997026) | Het boek is groot. | The book is big. | Use |  |  |
| [#1621245](https://tatoeba.org/en/sentences/show/1621245) | Ik ben dokter. | I am a doctor. | Use |  |  |
| [#1678460](https://tatoeba.org/en/sentences/show/1678460) | Dit is een klein boek. | This is a small book. | Use |  |  |
| [#2791022](https://tatoeba.org/en/sentences/show/2791022) | Het boek is klein. | The book is small. | Use |  |  |
| [#7431011](https://tatoeba.org/en/sentences/show/7431011) | Tom is groot en sterk. | Tom is tall and strong. | Use |  |  |
| [#13896592](https://tatoeba.org/en/sentences/show/13896592) | Dat is je boek. | That's your book. | Use |  |  |

## U03 · Polite Phrases

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S3101 | Dank je, Tom. | Thank you, Tom. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S3102 | Ja, dank je. | Yes, thank you. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S3103 | Ja, alsjeblieft. | Yes, please. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S3104 | Graag! | Gladly! | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S3106 | Goedemiddag, Tom. | Good afternoon, Tom. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S3107 | Goedemiddag, dokter. | Good afternoon, doctor. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S3108 | Goedenavond, Anna. | Good evening, Anna. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S3109 | Goedenavond en tot ziens. | Good evening and goodbye. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S3110 | Sorry, Tom. | Sorry, Tom. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S3111 | Sorry! | Sorry! | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S3113 | Pardon, dokter. | Excuse me, doctor. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S3114 | Prima, dank je. | Great, thank you. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#2803861](https://tatoeba.org/en/sentences/show/2803861) | Ik praat graag. | I like talking. | Use |  |  |
| [#1371084](https://tatoeba.org/en/sentences/show/1371084) | Hallo! Goedemorgen! | Hello! Good morning! | Reject |  | Two exclamations, a fragment. |
| [#2791016](https://tatoeba.org/en/sentences/show/2791016) | Hoe zeg je dat? | How do you say that? | Use |  |  |
| [#13543464](https://tatoeba.org/en/sentences/show/13543464) | Hoe gaat het, man? | How you doing, man? | Reject |  | Slang ("man" as a vocative). |

## U04 · Food and Drink

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S4103 | Ik houd van thee. | I like tea. | Keep |  | Correct. Wiktionary's table gives "ik hou"; "ik houd" is the full spelling, also standard, and the form the course teaches (W053). One line in the Glossary should say both exist. |
| S4104 | Ik houd van brood. | I like bread. | Keep |  | Correct; see S4103 on houd / hou. |
| S4106 | De kaas is lekker. | The cheese is tasty. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S4107 | Tom eet brood en kaas. | Tom eats bread and cheese. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#413389](https://tatoeba.org/en/sentences/show/413389) | Hij houdt van eten. | He has a good appetite. | Use | He likes eating. |  |
| [#490476](https://tatoeba.org/en/sentences/show/490476) | Hij houdt van ze. | He loves them. | Reject |  | "Ze" here is them (object); the learner knows ze as she, a sense trap. |
| [#847843](https://tatoeba.org/en/sentences/show/847843) | Ze houdt van Tom. | She loves Tom. | Reject |  | A love line. |
| [#1168714](https://tatoeba.org/en/sentences/show/1168714) | Drink je koffie? | Do you drink coffee? | Use |  |  |
| [#1481679](https://tatoeba.org/en/sentences/show/1481679) | De man eet brood. | The man is eating bread. | Use |  |  |
| [#3515001](https://tatoeba.org/en/sentences/show/3515001) | Koffie, graag. | Coffee, please. | Use |  |  |
| [#3637628](https://tatoeba.org/en/sentences/show/3637628) | Is dit van Tom? | Is this Tom's? | Use |  |  |
| [#12238440](https://tatoeba.org/en/sentences/show/12238440) | Het kind drinkt water. | The child drinks water. | Use |  |  |

## U05 · Pets and Animals

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S5102 | De kat is klein. | The cat is small. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S5103 | Ik heb een vogel. | I have a bird. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S5104 | De vogel is klein. | The bird is small. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S5105 | De kat eet een muis. | The cat eats a mouse. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S5106 | Ik heb een muis. | I have a mouse. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S5107 | Ik heb een konijn. | I have a rabbit. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S5108 | Het konijn eet. | The rabbit is eating. | Keep |  | Correct: konijn is a het-noun (Wiktionary n). |
| S5109 | Een hond is een dier. | A dog is an animal. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S5110 | De kat is een dier. | The cat is an animal. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S5111 | Ik heb een dier. | I have an animal. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#450253](https://tatoeba.org/en/sentences/show/450253) | Vis, alsjeblieft. | Fish, please. | Use |  |  |
| [#983671](https://tatoeba.org/en/sentences/show/983671) | Dit is een paard. | This is a horse. | Use |  |  |
| [#2291458](https://tatoeba.org/en/sentences/show/2291458) | Ik heb een boek. | I have a book. | Use |  |  |
| [#3522072](https://tatoeba.org/en/sentences/show/3522072) | Ik heb een appel. | I have an apple. | Use |  |  |
| [#11614713](https://tatoeba.org/en/sentences/show/11614713) | Dit is een vis. | That is a fish. | Use | This is a fish. |  |
| [#12168867](https://tatoeba.org/en/sentences/show/12168867) | Ik heb een paard dat praat. | I have a horse that talks. | Reject |  | A relative clause with the verb at the end, past A1. |
| [#12185780](https://tatoeba.org/en/sentences/show/12185780) | Ze heeft een hond. | She has a dog. | Use |  |  |
| [#13850868](https://tatoeba.org/en/sentences/show/13850868) | Heb je een paard? | Do you have a horse? | Use |  |  |

## U32 · Asking About Words

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| | *(no drafts in this circle)* | | | | |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#5483723](https://tatoeba.org/en/sentences/show/5483723) | Ik spreek Engels. | I speak English. | Use |  |  |
| [#13972502](https://tatoeba.org/en/sentences/show/13972502) | Pardon, wat betekent dat? | Sorry, what does that mean? | Use |  |  |

## U06 · More Than One

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S6101 | De huizen zijn groot. | The houses are big. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S6102 | De huizen zijn klein. | The houses are small. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S6103 | Dat zijn grote huizen. | Those are big houses. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S6104 | De mannen zijn sterk. | The men are strong. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S6105 | Dat zijn mannen. | Those are men. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S6106 | De mannen eten brood. | The men eat bread. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S6107 | De vrouwen zijn sterk. | The women are strong. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S6108 | Dat zijn vrouwen. | Those are women. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S6109 | De mannen en de vrouwen. | The men and the women. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#448779](https://tatoeba.org/en/sentences/show/448779) | Hebben jullie kinderen? | Do you have any children? | Use |  |  |
| [#450120](https://tatoeba.org/en/sentences/show/450120) | Hij eet veel. | He eats a lot. | Use |  |  |
| [#540531](https://tatoeba.org/en/sentences/show/540531) | Dit is zijn huis. | This is his house. | Reject |  | "Zijn" here is the possessive his; the circle teaches zijn as the verb to be, and his is not in the word list, a sense trap. |
| [#598708](https://tatoeba.org/en/sentences/show/598708) | Ik heb veel boeken. | I have many books. | Use |  |  |
| [#751099](https://tatoeba.org/en/sentences/show/751099) | De boeken zijn klein. | The books are small. | Use |  |  |
| [#846725](https://tatoeba.org/en/sentences/show/846725) | Zijn ze groot? | Are they tall? | Reject |  | "Ze" here means they; the learner knows ze as she, and the plural zij/ze is not in the word list, a sense trap. |
| [#858134](https://tatoeba.org/en/sentences/show/858134) | Zijn ze vrienden? | Are they friends? | Reject |  | "Ze" here means they; the learner knows ze as she, and the plural zij/ze is not in the word list, a sense trap. |
| [#1033112](https://tatoeba.org/en/sentences/show/1033112) | Jullie zijn kinderen. | You are children. | Use |  |  |
| [#2795929](https://tatoeba.org/en/sentences/show/2795929) | Tom is een man van zijn woord. | Tom is a man of his word. | Reject |  | An idiom (a man of his word), and zijn as his. |
| [#3551140](https://tatoeba.org/en/sentences/show/3551140) | Jij en ik, we zijn vrienden. | You and I, we are friends. | Use |  |  |
| [#3600542](https://tatoeba.org/en/sentences/show/3600542) | Jij hebt veel boeken. | You have a lot of books. | Use |  |  |
| [#3635268](https://tatoeba.org/en/sentences/show/3635268) | Ze hebben Tom nog. | They've still got Tom. | Reject |  | "Ze" as they, and an odd line. |
| [#8447783](https://tatoeba.org/en/sentences/show/8447783) | Hebben jullie een hond? | Have you got a dog? | Use |  |  |
| [#11342172](https://tatoeba.org/en/sentences/show/11342172) | Ze zijn slecht. | They're bad. | Reject |  | "Ze" here means they; the learner knows ze as she, a sense trap. |
| [#13438093](https://tatoeba.org/en/sentences/show/13438093) | Ze heeft veel boeken. | She has many books. | Use |  |  |

## U07 · Describing Things

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| | *(no drafts in this circle)* | | | | |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#393136](https://tatoeba.org/en/sentences/show/393136) | Ik heb een auto. | I have a car. | Use |  |  |
| [#450311](https://tatoeba.org/en/sentences/show/450311) | Heb je een auto? | Do you have a car? | Use |  |  |
| [#527291](https://tatoeba.org/en/sentences/show/527291) | Dat is zijn auto. | That is his car. | Reject |  | "Zijn" here is the possessive his; the circle teaches zijn as the verb to be, a sense trap. |
| [#540568](https://tatoeba.org/en/sentences/show/540568) | Ik ook. | Me too. | Use |  |  |
| [#848042](https://tatoeba.org/en/sentences/show/848042) | Hij is oud. | He is old. | Use |  |  |
| [#848459](https://tatoeba.org/en/sentences/show/848459) | Dit boek is een nieuw boek. | That book is a new book. | Use | This book is a new book. |  |
| [#848948](https://tatoeba.org/en/sentences/show/848948) | Hoe oud is hij? | How old is he? | Use |  |  |
| [#11133801](https://tatoeba.org/en/sentences/show/11133801) | Je bent heel jong. | You're very young. | Use |  |  |
| [#13719974](https://tatoeba.org/en/sentences/show/13719974) | Ik heb een grote auto. | I have a big car. | Use |  |  |
| [#13931348](https://tatoeba.org/en/sentences/show/13931348) | De auto is klein. | The car is small. | Use |  |  |

## U52 · Free Time

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S52101 | Dit is een foto. | This is a photo. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S52102 | De foto is mooi. | The photo is beautiful. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S52103 | Ik heb een foto. | I have a photo. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S52104 | Het feest is leuk. | The party is fun. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S52105 | Een leuk feest. | A fun party. | Keep |  | Correct: no -e on leuk before het-noun feest with een. |
| S52106 | Het feest is goed. | The party is good. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S52108 | Ik houd van dit spel. | I like this game. | Keep |  | Correct: spel is a het-noun (Wiktionary n), so dit spel. |
| S52109 | Ik houd van zwemmen. | I like swimming. | Keep | Swap for #846663 (Hij houdt van zwemmen), the same word on Tatoeba. | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S52110 | Zwemmen is leuk. | Swimming is fun. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S52111 | Kijken is leuk. | Watching is fun. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S52112 | Wij kijken een film. | We're watching a film. | Keep |  | Correct in everyday Dutch ("we kijken een film"); the careful form is "naar een film kijken", and the Glossary hint for kijken says "with naar". Fine as is. |
| S52113 | De film is leuk. | The film is fun. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S52114 | De film is goed. | The film is good. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#8476163](https://tatoeba.org/en/sentences/show/8476163) | Ze zwemmen. | They are swimming. | Reject |  | "Ze" here means they; the learner knows ze as she, and the plural zij/ze is not in the word list, a sense trap. |
| [#8476167](https://tatoeba.org/en/sentences/show/8476167) | Zij zwemmen. | They are swimming. | Reject |  | "Zij" here means they; the learner knows zij as she, a sense trap. |
| [#8476011](https://tatoeba.org/en/sentences/show/8476011) | Jullie zwemmen. | You swim. | Use |  |  |
| [#846663](https://tatoeba.org/en/sentences/show/846663) | Hij houdt van zwemmen. | He likes to swim. | Use |  |  |
| [#1473392](https://tatoeba.org/en/sentences/show/1473392) | Ik lees dit boek. | I'm reading this book. | Use |  |  |
| [#3637385](https://tatoeba.org/en/sentences/show/3637385) | Houdt Tom van zwemmen? | Does Tom like to swim? | Use |  |  |
| [#4343879](https://tatoeba.org/en/sentences/show/4343879) | Ik lees een boek. | I read a book. | Use |  |  |
| [#7787773](https://tatoeba.org/en/sentences/show/7787773) | Ik lees veel boeken. | I read a lot of books. | Use |  |  |

## U08 · Where Things Are

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S8101 | De tafel staat hier. | The table is here. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S8102 | Het bed staat daar. | The bed is there. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S8103 | De tafel staat in de kamer. | The table is in the room. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S8104 | De kat is onder de tafel. | The cat is under the table. | Keep |  | Correct; Dutch would as readily say "zit onder" for a cat, but "is onder" is fine. |
| S8105 | De hond ligt onder het bed. | The dog is under the bed. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S8106 | Het boek ligt onder de tafel. | The book is under the table. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S8107 | De tafel staat naast het bed. | The table is next to the bed. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S8108 | Tom is naast Maria. | Tom is next to Maria. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S8109 | De kat ligt naast de hond. | The cat is lying next to the dog. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#857909](https://tatoeba.org/en/sentences/show/857909) | Ik eet hier. | I eat here. | Use |  |  |
| [#2345943](https://tatoeba.org/en/sentences/show/2345943) | Het boek ligt op de tafel. | The book is on the table. | Use |  |  |
| [#2824928](https://tatoeba.org/en/sentences/show/2824928) | Heeft het huis een tuin? | Has the house got a garden? | Use |  |  |
| [#3189786](https://tatoeba.org/en/sentences/show/3189786) | Hij ligt in zijn bed. | He is lying in his bed. | Reject |  | "Zijn" here is the possessive his, a sense trap. |
| [#3687783](https://tatoeba.org/en/sentences/show/3687783) | Is Tom daar ook? | Is Tom there, too? | Use |  |  |
| [#8486795](https://tatoeba.org/en/sentences/show/8486795) | We hebben een grote tuin. | We have a big yard. | Use |  |  |
| [#10327650](https://tatoeba.org/en/sentences/show/10327650) | Jullie zijn hier. | You are here. | Use |  |  |
| [#11375852](https://tatoeba.org/en/sentences/show/11375852) | Eet en drink op. | Eat and drink up. | Reject |  | Two separable verbs (opeten, opdrinken), past A1; op is taught as on. |
| [#11666279](https://tatoeba.org/en/sentences/show/11666279) | We hebben een tafel in de keuken. | We have a table in the kitchen. | Use |  |  |
| [#12190329](https://tatoeba.org/en/sentences/show/12190329) | Ik ben in de tuin. | I am in the garden. | Use |  |  |
| [#12220429](https://tatoeba.org/en/sentences/show/12220429) | Ik heb een grote tuin. | I have a big garden. | Use |  |  |

## U09 · How You Feel

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S9102 | Tom heeft honger. | Tom is hungry. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#413344](https://tatoeba.org/en/sentences/show/413344) | Ik heb het koud. | I feel cold. | Use | I'm cold. | "het koud hebben" is the set phrase Dutch uses for feeling cold; the one idiom worth teaching here. |
| [#448708](https://tatoeba.org/en/sentences/show/448708) | Ik ben ziek. | I am sick. | Use |  |  |
| [#847528](https://tatoeba.org/en/sentences/show/847528) | Ben je blij? | Are you happy? | Use |  |  |
| [#1033236](https://tatoeba.org/en/sentences/show/1033236) | Ben je moe? | Are you tired? | Use |  |  |
| [#6838447](https://tatoeba.org/en/sentences/show/6838447) | Zijn jullie moe? | Are you tired? | Use |  |  |
| [#8230006](https://tatoeba.org/en/sentences/show/8230006) | Is Tom bang? | Is Tom scared? | Use |  |  |
| [#11884047](https://tatoeba.org/en/sentences/show/11884047) | Tom is oud en ziek. | Tom is old and sick. | Use |  |  |

## U33 · Finding the Word

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S33103 | Weet je het? | Do you know? | Keep | Swap for #3606287 (Tom weet dat), the same word on Tatoeba. | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S33104 | Het ding is klein. | The thing is small. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S33105 | Dit ding is groot. | This thing is big. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S33106 | Dat is een ding. | That's a thing. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S33107 | Het is om te eten. | It's for eating. | Keep |  | Correct; "om te" with eten is purpose (for eating), which is what the circle wants; the Glossary glosses om as around and te as too (see senses). |
| S33108 | Brood is om te eten. | Bread is for eating. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S33109 | Een appel is om te eten. | An apple is for eating. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#3606287](https://tatoeba.org/en/sentences/show/3606287) | Tom weet dat. | Tom knows that. | Use |  |  |
| [#11008956](https://tatoeba.org/en/sentences/show/11008956) | Weet ze dat ik hier ben? | Does she know that I'm here? | Reject |  | A subordinate clause with the verb at the end, past A1, and dat as the conjunction that. |
| [#11009009](https://tatoeba.org/en/sentences/show/11009009) | Weet hij dat ik hier ben? | Does he know I'm here? | Reject |  | A subordinate clause with the verb at the end, past A1, and dat as the conjunction that. |
| [#850689](https://tatoeba.org/en/sentences/show/850689) | Je praat te veel. | You talk too much. | Reject |  | A scolding line. |
| [#2226224](https://tatoeba.org/en/sentences/show/2226224) | Hoe heet dat dier? | What's that animal's name? | Use |  |  |
| [#7091665](https://tatoeba.org/en/sentences/show/7091665) | Ik ben te moe. | I'm too tired. | Use |  |  |
| [#8473305](https://tatoeba.org/en/sentences/show/8473305) | Tom drinkt veel te veel. | Tom drinks way too much. | Reject |  | A remark on someone's drinking. |
| [#8508832](https://tatoeba.org/en/sentences/show/8508832) | De thee is te koud. | The tea's too cold. | Use |  |  |
| [#11148937](https://tatoeba.org/en/sentences/show/11148937) | Tom is op zoek. | Tom is on watch. | Reject |  | "Op zoek" is an idiom, and the English (on watch) is wrong. |

## U10 · Mine and Yours

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S10101 | Zij is mijn vriendin. | She's my friend. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S10102 | Anna is mijn vriendin. | Anna is my friend. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S10103 | Is zij jouw vriendin? | Is she your friend? | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#462143](https://tatoeba.org/en/sentences/show/462143) | Dit is jouw hond. | This is your dog. | Use |  |  |
| [#540539](https://tatoeba.org/en/sentences/show/540539) | Heb je een vriend? | Do you have a friend? | Use |  |  |
| [#638347](https://tatoeba.org/en/sentences/show/638347) | Dit is mijn vader. | This is my father. | Use |  |  |
| [#859740](https://tatoeba.org/en/sentences/show/859740) | Dit is haar huis. | This is her house. | Use |  |  |
| [#859834](https://tatoeba.org/en/sentences/show/859834) | Is dit jouw boek? | Is this your book? | Use |  |  |
| [#1481677](https://tatoeba.org/en/sentences/show/1481677) | Hij is zijn vriend. | He is his friend. | Reject |  | "Zijn" here is the possessive his, a sense trap. |
| [#3559920](https://tatoeba.org/en/sentences/show/3559920) | Zij houdt van haar kinderen. | She loves her children. | Use |  |  |
| [#3559958](https://tatoeba.org/en/sentences/show/3559958) | Tom is je vriend. | Tom is your friend. | Use |  |  |
| [#5366028](https://tatoeba.org/en/sentences/show/5366028) | En dit is onze tuin. | And here's our garden. | Use | And this is our garden. |  |
| [#8130208](https://tatoeba.org/en/sentences/show/8130208) | Hij is mijn leraar. | He is my teacher. | Use |  |  |
| [#8353928](https://tatoeba.org/en/sentences/show/8353928) | Ik zoek mijn hond. | I'm looking for my dog. | Use |  |  |
| [#8479927](https://tatoeba.org/en/sentences/show/8479927) | Hij is haar vader. | He's her father. | Use |  |  |
| [#11011914](https://tatoeba.org/en/sentences/show/11011914) | Tom heeft een broer en een zus. | Tom has a brother and a sister. | Use |  |  |
| [#11353110](https://tatoeba.org/en/sentences/show/11353110) | Ik ben een vriend van je broer. | I'm a friend of your brother's. | Use |  |  |
| [#11682381](https://tatoeba.org/en/sentences/show/11682381) | Mijn kinderen zijn mooi. | My children are beautiful. | Use |  |  |
| [#12021613](https://tatoeba.org/en/sentences/show/12021613) | Je hebt mijn woord. | You have my word. | Reject |  | An idiom (you have my word). |
| [#12404349](https://tatoeba.org/en/sentences/show/12404349) | Mijn boek is nieuw. | My book is new. | Use |  |  |
| [#13414708](https://tatoeba.org/en/sentences/show/13414708) | Ja, ik ben zijn vader. | Yes, I am his father. | Reject |  | "Zijn" here is the possessive his, a sense trap. |
| [#13414722](https://tatoeba.org/en/sentences/show/13414722) | Tom, ik ben je vader! | Tom, I'm your father! | Reject |  | A film quotation, dramatic. |
| [#13414744](https://tatoeba.org/en/sentences/show/13414744) | Tom, ik ben je moeder! | Tom, I'm your mother! | Reject |  | The same joke. |
| [#13543470](https://tatoeba.org/en/sentences/show/13543470) | Hoe gaat het, broer? | How you doing, brother? | Reject |  | Slang ("broer" as a vocative). |
| [#13971855](https://tatoeba.org/en/sentences/show/13971855) | Mijn broer is dokter. | My brother is a doctor. | Use |  |  |

## U11 · Asking Questions

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S11101 | Wanneer eet je? | When do you eat? | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S11102 | Wanneer ben je hier? | When are you here? | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S11103 | Wanneer eten we? | When do we eat? | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S11104 | Waarom? Omdat ik moe ben. | Why? Because I'm tired. | Keep |  | Correct. "Omdat" forces the verb to the end (omdat ik moe ben); since omdat is a course word, this is the one verb-final pattern Part 1 teaches on purpose. Candidates with other verb-final clauses were rejected (see the note). |
| S11105 | Ik ben blij, omdat Tom hier is. | I'm glad, because Tom is here. | Keep |  | Correct; verb-final after omdat, as S11104. |
| S11106 | Omdat ik honger heb. | Because I'm hungry. | Keep |  | Correct; verb-final after omdat, as S11104. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#12842480](https://tatoeba.org/en/sentences/show/12842480) | Weet jij hoe en wanneer? | Do you know how and when? | Reject |  | An odd, elliptical line. |
| [#5970](https://tatoeba.org/en/sentences/show/5970) | Wat is dat? | What is it? | Use | What is that? |  |
| [#459927](https://tatoeba.org/en/sentences/show/459927) | Ik weet van waar hij is. | I know where he comes from. | Reject |  | Ungrammatical ("waar hij vandaan komt"). |
| [#462144](https://tatoeba.org/en/sentences/show/462144) | Waar is jouw hond? | Where is your dog? | Use |  |  |
| [#466340](https://tatoeba.org/en/sentences/show/466340) | Drink wat thee. | Drink some tea. | Reject |  | "Wat" here means some, a sense trap, and an imperative. |
| [#628145](https://tatoeba.org/en/sentences/show/628145) | Waar zijn we? | Where are we? | Use |  |  |
| [#997047](https://tatoeba.org/en/sentences/show/997047) | Welke auto is van je vader? | Which car is your father's? | Use |  |  |
| [#1179420](https://tatoeba.org/en/sentences/show/1179420) | Waar is je broer? | Where's your brother? | Use |  |  |
| [#1556880](https://tatoeba.org/en/sentences/show/1556880) | Waar is de badkamer? | Where is the bathroom? | Use |  |  |
| [#1994510](https://tatoeba.org/en/sentences/show/1994510) | Wie is Tom? | Who's Tom? | Use |  |  |
| [#1994516](https://tatoeba.org/en/sentences/show/1994516) | Waarom ben ik hier? | Why am I here? | Use |  |  |
| [#2027765](https://tatoeba.org/en/sentences/show/2027765) | Ik weet wie ik ben. | I know who I am. | Reject |  | A subordinate clause with the verb at the end, past A1. |
| [#2116299](https://tatoeba.org/en/sentences/show/2116299) | Begrijp je wat ik zeg? | Do you understand what I am saying? | Reject |  | A subordinate clause with the verb at the end, past A1. |
| [#3566074](https://tatoeba.org/en/sentences/show/3566074) | Wie is dat in de badkamer? | Who is that in the bathroom? | Use |  |  |
| [#3612632](https://tatoeba.org/en/sentences/show/3612632) | Weet je waar we zijn? | Do you know where we are? | Reject |  | A subordinate clause with the verb at the end, past A1. |
| [#3687786](https://tatoeba.org/en/sentences/show/3687786) | Waarom is Tom daar nog? | Why's Tom still here? | Use | Why is Tom still there? |  |
| [#3702001](https://tatoeba.org/en/sentences/show/3702001) | Weet je wie ik ben? | Do you know who I am? | Reject |  | A subordinate clause with the verb at the end, past A1. |
| [#4522592](https://tatoeba.org/en/sentences/show/4522592) | Waar zwemmen ze? | Where are they swimming? | Reject |  | "Ze" here means they, a sense trap. |
| [#5367555](https://tatoeba.org/en/sentences/show/5367555) | Waarom zijn we hier? | Why are we here? | Use |  |  |
| [#5868753](https://tatoeba.org/en/sentences/show/5868753) | Waar is mijn moeder? | Where is my mother? | Use |  |  |
| [#5868786](https://tatoeba.org/en/sentences/show/5868786) | Waar is mijn broer? | Where's my brother? | Use |  |  |
| [#5868854](https://tatoeba.org/en/sentences/show/5868854) | Waar is mijn paard? | Where's my horse? | Use |  |  |
| [#7730953](https://tatoeba.org/en/sentences/show/7730953) | Waar zijn de kinderen? | Where are the children? | Use |  |  |
| [#8104047](https://tatoeba.org/en/sentences/show/8104047) | Tom, weet jij waar we zijn? | Tom, do you know where we are? | Reject |  | A subordinate clause with the verb at the end, past A1. |
| [#8105536](https://tatoeba.org/en/sentences/show/8105536) | Tom weet waar ik ben. | Tom knows where I am. | Reject |  | A subordinate clause with the verb at the end, past A1. |
| [#8500179](https://tatoeba.org/en/sentences/show/8500179) | Wie weet waar Tom is? | Who knows where Tom is? | Reject |  | A subordinate clause with the verb at the end, past A1. |

## U53 · Around Town

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S53101 | Het museum is groot. | The museum is big. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S53103 | Het museum is dichtbij. | The museum is nearby. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S53104 | De kerk is mooi. | The church is beautiful. | Keep | Swap for #3524272 (Dat is een kerk), the same word on Tatoeba. | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S53105 | De kerk is oud. | The church is old. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S53106 | Waar is de kerk? | Where is the church? | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S53107 | De trein is hier. | The train is here. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S53108 | Waar is de trein? | Where is the train? | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S53109 | De trein is groot. | The train is big. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S53110 | De taxi is daar. | The taxi is there. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S53111 | Waar is de taxi? | Where is the taxi? | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S53112 | De taxi is hier. | The taxi is here. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S53113 | Het plein is groot. | The square is big. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S53114 | Waar is het plein? | Where is the square? | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S53115 | Het plein is dichtbij. | The square is nearby. | Keep | Swap for #2797304 (Het station is dichtbij), the same word on Tatoeba. | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S53116 | Het hotel is dichtbij. | The hotel is nearby. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#3524272](https://tatoeba.org/en/sentences/show/3524272) | Dat is een kerk. | That's a church. | Use |  |  |
| [#996988](https://tatoeba.org/en/sentences/show/996988) | Het ziekenhuis is hier dichtbij. | The hospital is near here. | Use |  |  |
| [#2797304](https://tatoeba.org/en/sentences/show/2797304) | Het station is dichtbij. | The station is nearby. | Use |  |  |
| [#3567482](https://tatoeba.org/en/sentences/show/3567482) | Is er een ziekenhuis dichtbij? | Is there a hospital nearby? | Use |  |  |
| [#4172216](https://tatoeba.org/en/sentences/show/4172216) | Waar is het ziekenhuis? | Where is the hospital? | Use |  |  |
| [#11344267](https://tatoeba.org/en/sentences/show/11344267) | Wanneer is je bus? | What time is your bus? | Use | When is your bus? |  |
| [#14102380](https://tatoeba.org/en/sentences/show/14102380) | Waar is een goed hotel? | Where is a good hotel? | Use |  |  |

## U12 · Counting to Ten

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S12101 | Ik heb vijf katten. | I have five cats. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S12102 | Vijf honden. | Five dogs. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S12103 | Ik heb zes boeken. | I have six books. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S12104 | Zes katten. | Six cats. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S12105 | Ik heb zeven appels. | I have seven apples. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S12106 | Zeven kinderen. | Seven children. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S12107 | Ik heb acht boeken. | I have eight books. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S12108 | Acht honden. | Eight dogs. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S12109 | Ik heb negen katten. | I have nine cats. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S12110 | Negen appels. | Nine apples. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S12111 | Ik heb tien boeken. | I have ten books. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S12112 | Tien kinderen. | Ten children. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#12154686](https://tatoeba.org/en/sentences/show/12154686) | Hoeveel is vijf keer zeven? | How much is five times seven? | Use |  |  |
| [#1372180](https://tatoeba.org/en/sentences/show/1372180) | Hij is acht. | He is eight. | Use |  |  |
| [#1372181](https://tatoeba.org/en/sentences/show/1372181) | Zij is acht. | She is eight. | Use |  |  |
| [#706314](https://tatoeba.org/en/sentences/show/706314) | We hebben twee kinderen. | We have two children. | Use |  |  |
| [#846645](https://tatoeba.org/en/sentences/show/846645) | Hij is de vader van drie kinderen. | He is the father of three children. | Use |  |  |
| [#2439146](https://tatoeba.org/en/sentences/show/2439146) | Heb je twee boeken? | Do you have two books? | Use |  |  |
| [#3567467](https://tatoeba.org/en/sentences/show/3567467) | Zijn jullie twee vrienden? | Are you two friends? | Use |  |  |
| [#3593332](https://tatoeba.org/en/sentences/show/3593332) | Ik heb drie kinderen. | I have three children. | Use |  |  |
| [#3601687](https://tatoeba.org/en/sentences/show/3601687) | Hoeveel kinderen heb je? | How many children do you have? | Use |  |  |
| [#3970199](https://tatoeba.org/en/sentences/show/3970199) | Tom heeft nog drie honden. | Tom has three other dogs. | Use | Tom has three more dogs. |  |
| [#8074857](https://tatoeba.org/en/sentences/show/8074857) | We hebben drie honden. | We have three dogs. | Use |  |  |
| [#12249876](https://tatoeba.org/en/sentences/show/12249876) | Maria heeft drie kinderen. | Mary has three children. | Use |  | Tatoeba's Mary in the English; the Dutch has Maria, fine. |

## U13 · Naming Colours

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S13101 | De hond is bruin. | The dog is brown. | Keep | Swap for #11524221 (Het konijn is bruin), the same word on Tatoeba. | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S13102 | Mijn paard is bruin. | My horse is brown. | Keep | Swap for #12013861 (Ik heb een bruin paard), the same words on Tatoeba. | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S13103 | De tafel is bruin. | The table is brown. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#11524221](https://tatoeba.org/en/sentences/show/11524221) | Het konijn is bruin. | The rabbit is brown. | Use |  |  |
| [#12013861](https://tatoeba.org/en/sentences/show/12013861) | Ik heb een bruin paard. | I have a brown horse. | Use |  |  |
| [#4107638](https://tatoeba.org/en/sentences/show/4107638) | De hond is groen en mooi. | The dog is green and beautiful. | Reject |  | An odd line (a green dog). |
| [#11002403](https://tatoeba.org/en/sentences/show/11002403) | Melk is wit. | Milk is white. | Use |  |  |
| [#11600476](https://tatoeba.org/en/sentences/show/11600476) | De kaas is geel. | The cheese is yellow. | Use |  |  |
| [#12408822](https://tatoeba.org/en/sentences/show/12408822) | De appel is geel. | The apple is yellow. | Use |  |  |

## U14 · Days and Times

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S14101 | Maandag is een dag. | Monday is a day. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S14102 | Zaterdag is een dag. | Saturday is a day. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S14103 | Zondag is een dag. | Sunday is a day. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S14104 | De week is nieuw. | The week is new. | Keep |  | Correct but odd ("the week is new"); "Het is een nieuwe week" would need the inflected nieuwe, not taught. Fine as a drill. |
| S14105 | De week is goed. | The week is good. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S14107 | Zaterdag is goed. | Saturday is good. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S14109 | Zondag en maandag. | Sunday and Monday. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S14110 | De week is mooi. | The week is lovely. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#2808823](https://tatoeba.org/en/sentences/show/2808823) | Waar is Tom nu? | Where is Tom now? | Use |  |  |
| [#3600663](https://tatoeba.org/en/sentences/show/3600663) | Je bent veel te laat. | You're way too late. | Reject |  | A scolding line. |
| [#11504574](https://tatoeba.org/en/sentences/show/11504574) | Morgen zijn we er. | We’ll be there tomorrow. | Use | Tomorrow we'll be there. |  |
| [#12166653](https://tatoeba.org/en/sentences/show/12166653) | Wat eten we vandaag? | What are we having today? | Use | What are we eating today? |  |
| [#12181899](https://tatoeba.org/en/sentences/show/12181899) | Waar is hij nu? | Where is he now? | Use |  |  |

## U15 · Going Places

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S15101 | Ik ga naar het park. | I'm going to the park. | Keep | Swap for #450250, the same sentence. | Word for word on Tatoeba. |
| S15102 | Het park is mooi. | The park is beautiful. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S15103 | Mijn school is groot. | My school is big. | Keep | Swap for #533731 (Dat is mijn school), the same word on Tatoeba. | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S15105 | De winkel is hier. | The shop is here. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S15106 | Ik ga naar de stad. | I'm going to the city. | Keep | Swap for #2824895 (Ben je in de stad?), the same word on Tatoeba. | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S15107 | De stad is groot. | The city is big. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S15108 | Wij gaan naar het restaurant. | We're going to the restaurant. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S15110 | De winkel is in de straat. | The shop is in the street. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S15111 | Ik ben op straat. | I'm out on the street. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#450250](https://tatoeba.org/en/sentences/show/450250) | Ik ga naar het park. | I go to the park. | Use |  |  |
| [#11601566](https://tatoeba.org/en/sentences/show/11601566) | Ik ben in het park. | I'm in the park. | Use |  |  |
| [#473334](https://tatoeba.org/en/sentences/show/473334) | Ik ga naar school. | I go to school. | Use |  |  |
| [#533731](https://tatoeba.org/en/sentences/show/533731) | Dat is mijn school. | That is my school. | Use |  |  |
| [#13723134](https://tatoeba.org/en/sentences/show/13723134) | We gaan naar school. | We're going to school. | Use |  |  |
| [#2824895](https://tatoeba.org/en/sentences/show/2824895) | Ben je in de stad? | Aren't you in town? | Use | Are you in town? |  |
| [#473367](https://tatoeba.org/en/sentences/show/473367) | Vandaag gaan we gaan dansen. | Today, we are going dancing. | Reject |  | Ungrammatical (a doubled gaan). |
| [#1032962](https://tatoeba.org/en/sentences/show/1032962) | Hoe laat ga je naar huis? | What time do you go home? | Use |  |  |
| [#2793208](https://tatoeba.org/en/sentences/show/2793208) | Nu ga je te ver. | Now you're going too far. | Reject |  | An idiom (going too far). |
| [#3970209](https://tatoeba.org/en/sentences/show/3970209) | Tom is een vriend van school. | Tom is a friend from school. | Use |  |  |
| [#11146932](https://tatoeba.org/en/sentences/show/11146932) | Een kind gaat naar een school. | A child is going to a school. | Reject |  | An odd line ("naar een school"; Dutch says naar school). |
| [#11484476](https://tatoeba.org/en/sentences/show/11484476) | Ik ga waar jij ook gaat. | I'll go wherever you go. | Reject |  | A clause with the verb at the end, past A1. |

## U51 · Body and Looks

### Drafts

| ID | Dutch | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S51101 | Ik heb twee ogen. | I have two eyes. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S51102 | Mijn ogen zijn blauw. | My eyes are blue. | Keep | Swap for #422361, the same sentence. | Word for word on Tatoeba. |
| S51103 | Mijn oog is rood. | My eye is red. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S51104 | Mijn hand is klein. | My hand is small. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S51105 | De hand is groot. | The hand is big. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S51106 | Mijn voet is groot. | My foot is big. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S51107 | Mijn voet is koud. | My foot is cold. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S51108 | Mijn neus is klein. | My nose is small. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S51109 | Zijn neus is rood. | His nose is red. | Fix | Haar neus is rood. = Her nose is red. | "Zijn" as his is not in the word list (the circle knows zijn only as the verb); haar (her) is taught in U10. |
| S51110 | Mijn mond is klein. | My mouth is small. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S51111 | Haar mond is mooi. | Her mouth is pretty. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S51112 | Mijn hoofd is groot. | My head is big. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S51113 | Mijn hoofd is warm. | My head is warm. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S51114 | Mijn been is lang. | My leg is long. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S51115 | Het been is sterk. | The leg is strong. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S51116 | Mijn arm is sterk. | My arm is strong. | Keep |  | Correct, natural, A1; the English matches; de/het as Wiktionary gives it. |
| S51117 | Zijn arm is lang. | His arm is long. | Fix | Haar arm is lang. = Her arm is long. | "Zijn" as his is not in the word list; haar (her) is taught in U10. |

### Candidates

| Tatoeba | Dutch | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#473336](https://tatoeba.org/en/sentences/show/473336) | Haar ogen zijn blauw. | Her eyes are blue. | Use |  |  |
| [#1407054](https://tatoeba.org/en/sentences/show/1407054) | Mary heeft grote ogen. | Mary has big eyes. | Use |  | Tatoeba's Mary; the drafts use Maria and Anna. |
| [#422361](https://tatoeba.org/en/sentences/show/422361) | Mijn ogen zijn blauw. | My eyes are blue. | Use |  |  |
| [#3600645](https://tatoeba.org/en/sentences/show/3600645) | Je hebt een blauw oog. | You've got a black eye. | Reject |  | An idiom (a black eye). |
| [#3077534](https://tatoeba.org/en/sentences/show/3077534) | Ik ga te voet. | I go on foot. | Reject |  | "Te voet" is a set phrase; te is taught as too, a sense trap. |
| [#12161063](https://tatoeba.org/en/sentences/show/12161063) | Ga je te voet? | Are you going on foot? | Reject |  | "Te voet" is a set phrase, a sense trap for te. |
| [#417103](https://tatoeba.org/en/sentences/show/417103) | Houd je mond. | Shut your mouth. | Reject |  | A rude imperative idiom. |
| [#11987982](https://tatoeba.org/en/sentences/show/11987982) | De mond van het kind is rood. | The mouth of the child is red. | Use |  |  |
| [#414392](https://tatoeba.org/en/sentences/show/414392) | Hij is blond. | He's blond. | Use |  |  |
| [#417133](https://tatoeba.org/en/sentences/show/417133) | Hoe lang is dit? | How long is this? | Use |  |  |
| [#461045](https://tatoeba.org/en/sentences/show/461045) | Dit is te lang. | This is too long. | Use |  |  |
| [#582753](https://tatoeba.org/en/sentences/show/582753) | Ze heeft kort haar. | She has short hair. | Reject |  | "Haar" here is hair; the learner knows haar as her, a sense trap. |
| [#8097108](https://tatoeba.org/en/sentences/show/8097108) | Ze heeft heel kort haar. | She's got very short hair. | Reject |  | "Haar" here is hair, a sense trap. |
| [#8240851](https://tatoeba.org/en/sentences/show/8240851) | Hoe lang is jullie broer? | How tall is your brother? | Reject |  | "Lang" here means tall; the circle teaches long, a sense trap. |
| [#11885164](https://tatoeba.org/en/sentences/show/11885164) | Ze zijn jong en slim. | They are young and smart. | Reject |  | "Ze" here means they, a sense trap. |
| [#12908199](https://tatoeba.org/en/sentences/show/12908199) | Hoe lang ben je? | How tall are you? | Reject |  | "Lang" here means tall, a sense trap. |

## Appendix: de/het from Wiktionary (Part 1 nouns)

| Noun | Wiktionary gender | Article |
| --- | --- | --- |
| appel | m, n | de |
| arm | m | de |
| auto | m | de |
| badkamer | f | de |
| bed | n | het |
| been | n, n | het |
| boek | n | het |
| broer | m | de |
| brood | n | het |
| bus | m, f | de |
| dag | m, f | de |
| dank | m | de |
| deur | f | de |
| dier | n | het |
| ding | n | het |
| dokter | m | de |
| dorst | m | de |
| familie | f | de |
| feest | n | het |
| fiets | f | de |
| film | m | de |
| foto | f | de |
| hand | f | de |
| hond | m, n | de |
| honger | m | de |
| hoofd | n | het |
| hotel | n | het |
| huis | n | het |
| jaar | n | het |
| jongen | m | de |
| kaas | m | de |
| kamer | f | de |
| kat | f, m | de |
| keer | m | de |
| kerk | f | de |
| keuken | f | de |
| kind | n | het |
| kleur | f | de |
| koffie | f,m | de |
| konijn | n | het |
| leraar | m | de |
| lerares | f | de |
| maandag | m | de |
| man | m | de |
| meisje | (diminutive, no header) | het (diminutive) |
| melk | f | de |
| moeder | f | de |
| mond | m, f | de |
| muis | f,m | de |
| museum | n | het |
| muziek | f | de |
| neus | m,f | de |
| oog | n, f | het |
| paard | n | het |
| park | n | het |
| plein | n | het |
| restaurant | n | het |
| school | f,n, f | de |
| spel | n | het |
| stad | f | de |
| station | n | het |
| straat | f | de |
| strand | n | het |
| tafel | f | de |
| taxi | m | de |
| thee | m | de |
| trein | m | de |
| tuin | m | de |
| uur | n | het |
| vader | m | de |
| vis | m | de |
| voet | m | de |
| voetbal | n, m | het |
| vogel | m | de |
| vriend | m | de |
| vriendin | f | de |
| vrouw | f | de |
| water | n | het |
| week | f | de |
| wijn | m | de |
| winkel | m | de |
| woord | n | het |
| zaterdag | m | de |
| ziekenhuis | n | het |
| zondag | m | de |
| zus | f | de |

Where Wiktionary lists two entries (appel m and n, hond m and n, oog n and f, voetbal n and m, school f and n), the first is the sense the course teaches: de appel, de hond, het oog, het voetbal (the game), de school.
