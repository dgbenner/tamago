# Dutch A1, Parts 1 to 4: Fable's phase 6 review (2026-11-21)

Scope: the course on local main (commit 02c4fc8; 2,992 sentences, 2,320 Tatoeba and 672 drafts; 1,009 words; 72 circles), against the judging themes in _source/language-pipeline.md. Same method: word audit, scope check of every sentence, accepted answer and reading text, content-nl/checks/ data, live Wiktionary for kopje, drankje, kaartje and hard (read 2026-11-21), every Part 2 to 4 draft read. Nothing changed in the repo.

## Verdicts to apply, in order

| # | Verdict | What | Why |
|---|---|---|---|
| 1 | **Fix (gender)** | **kopje**, **drankje** (U81), **kaartje** (U67) → het. | The check-in says Wiktionary gives diminutives no gender. It does: kopje n, drankje n, kaartje n (headword lines read 2026-11-21). Their hints should also carry a meaning: "a cup (small), diminutive of kop", "a drink", "a ticket". |
| 2 | **Fix (hints)** | **dragen** "to carry" → "to wear; to carry"; **draagt** likewise; **rijden** "to ride" → "to drive; to ride"; **rijdt** likewise; **hard** "fast, swiftly" → "hard (werkt hard); loud; fast". | 14 lines use dragen as wear (U54, S49028, S94115), 7 use rijden as drive (U26, U27, U67, S95127), 3 use hard as "works hard" (S87029, S87031, S87033). Wiktionary's Dutch adverb hard is "fast; very; loudly", the adjective "hard"; the hint should lead with the sense the lines use. |
| 3 | **Fix (pipeline)** | 30 form-of hints with no meaning: the U92 participles (gedaan "past participle of doen", gezien, gezegd, gehad …), comparatives (ouder, jonger, beter, harder, liever, minder, langzamer), wees, lopend, gebeurd, één, mail, best, anderen (Appendix A). | Same defect as Swedish and Danish, far smaller. Build "done (past participle of doen)". |
| 4 | **Fix (English)** | S56002 **Ben je gek?** "Are you stupid?" → "Are you crazy?" | gek is crazy, mad (the hint is right); the English is an insult the Dutch is not. S56006, S56007 already say nuts. |
| 5 | **Cut** | S87017 **Maria is een boer, toch?** | U87's own note teaches "no een before a job" (Ze is verpleegkundige); this line contradicts it in the same circle. |
| 6 | **Cut** | S75009 **Is het liefde?**, S75010 **Is dit liefde?** | Love lines, cut in every earlier pass; **Muziek is liefde** (S75032) and the houden-van lines are fine. |
| 7 | **Cut (drafts)** | S93111 **Dat is mijn zorg niet.**, S95123 **Was je handen voordat je eet.** | Idiom (not my concern); and in U95, where **was** is taught as the past of zijn, a line with was as "wash" is a sense trap. |
| 8 | **Cut or hide** | 24 of 43 generated en_to_fr answers use untaught or Belgian forms: gij, trager, Excuseer, Jazeker, lust, balpen, bureau, winderig, Gelieve, ondertekenen, tandpijn, zaak, gearriveerd; u/alstublieft/zullen/hou before their circles. | Appendix B. The Belgian ones (gij, trager, Excuseer, Jazeker) should go whatever the rule; the course is Netherlands Dutch. |
| 9 | **Fix (texts)** | 25 of 39 Read and Answer texts use untaught words (Appeltaart, Tosti, Jus d'orange, Bushalte, koelkast, verdieping, 's ochtends …). | Appendix C. |
| 10 | **Fix (English)** | 14 UK spellings (litre, harbour, theatre, neighbourhood, Mum). | Appendix D; the builder flagged this. |
| 11 | **Framework** | Match Pairs: 14 identical words on the board (drink, één, student, april, plan, lunch, begin, bank, help, stop, sport, tram, metro, postcode); 82 near-cognates. | Appendix E. |
| 12 | **Keep, Dan to confirm** | The polite **u/uw/meneer/mevrouw/alstublieft** from U41 (152 lines in Parts 2 to 4, none in Part 1), taught in U41's note with its verb form. | Consistent and well introduced, the German Sie precedent. The one policy question: Swedish and Danish keep the polite form out entirely; Dutch teaches it. Fine either way, but it should be a decision, not an accident. |
| 13 | **Keep** | **liefs** off (Wiktionary has only the partitive of lief); two-gender nouns on Wiktionary's first (spijt de, raam het, gram het); **teken** as "sign" in U88 (hint "to draw (tekenen)" could add "to sign"); **af** taught by drafts. | The builder's calls, all defensible; teken's hint is the one to touch. |
| 14 | **Keep** | Every other draft (517 of 519 read) and every Tatoeba line not named above. | Scope check 0 misses. Past tense arrives in order: zei U37 and dacht U38 (both taught in their notes), the perfect in U92, the simple past in U95; Part 2's only past forms are geboren (participle as adjective, U43). Separable verbs from U65 with a note. |

## Part 1 findings, were they applied?

Dutch Part 1 was reviewed 2026-11-19 (Sites/tamago-nl-a1/_review/dutch-part1-check.md); 29 hints carry hint_source "Fable review 2026-11-19 (sense fix)", the formal u is absent from Part 1 (0 lines), and no Part 1 line uses a word outside its circle. Applied.

## The judging themes, one by one

- **Introduced before tested, four a lesson.** Word audit 0 and 0 (2,018 lessons). Scope check: 0 sentences outside their circle's words.
- **Accepted answers use taught words.** The worst of the three: 24 of 43 generated answers (verdict 8). Texts in verdict 9.
- **Gender, meaning, conjugation.** No article/noun mismatch in any live line. 43 nouns without gender: 40 plurals, plus kopje, drankje, kaartje (verdict 1). 980 hints from Wiktionary, 29 from the Part 1 review; 30 form-of labels (verdict 3); three hints lead with the wrong sense for their lines (verdict 2). Conjugation tables come from nl-conj; none of the sampled forms disagreed.
- **Drafts.** 672 rows, all tamago_original, all within scope. Over the 40% line by circle: U63 Months 53%, U95 Long Ago 48%, U88 Forms 47%, U94 Thinking + Saying 47%, U73 41%, U42 40% (Appendix F).
- **Idioms and odd lines.** Verdicts 4 to 7. "Rustig, rustig!" and "Regen, regen, ga weg!" are rightly out of listening.
- **Near-cognates.** Not handled (verdict 11); Dutch has the most excluded identical cognates (55) and the fewest near ones.
- **Inflections in order.** Adjective -e in U56, comparatives U43/U44/U57, numbers U42/U44, separable verbs U65, zullen U64, perfect U92 before the simple past U95 (the usual Dutch order), kwam/zag vowel changes named in U95. In order.
- **Register.** je/jij with u taught as polite from U41 (verdict 12); the two love lines and "Are you stupid?" are the only slips.

## Appendix A: 30 Glossary hints that show a form-of label with no meaning

What the learner sees on a tap, in the Glossary and on Match Pairs (word-hints.js hintPieces shows `hint`, and `lemma_gloss` is empty for all of these). Fix: build the hint as "meaning (form of lemma)" from the lemma page's first gloss, e.g. "can (present of kunne)".

| Word | Hint shown | Circle |
|---|---|---|
| langzamer | comparative degree of langzaam | U31 |
| één | alternative form of een | U42 |
| ouder | comparative degree of oud | U43 |
| jonger | comparative degree of jong | U43 |
| minder | comparative degree of weinig | U44 |
| beter | comparative degree of goed | U57 |
| harder | comparative degree of hard | U37 |
| liever | comparative degree of graag | U75 |
| lopend | present participle of lopen | U84 |
| gebeurd | past participle of gebeuren | U28 |
| wees | imperative of zijn | U28 |
| mail | alternative form of e-mail | U88 |
| best | superlative degree of goed | U89 |
| gedaan | past participle of doen | U92 |
| gezien | past participle of zien | U92 |
| gezegd | past participle of zeggen | U92 |
| gehad | past participle of hebben | U92 |
| gemaakt | past participle of maken | U92 |
| gehoord | past participle of horen | U92 |
| gevonden | past participle of vinden | U92 |
| geweest | past participle of zijn | U92 |
| gekomen | past participle of komen | U92 |
| gegeven | past participle of geven | U92 |
| gebruikt | past participle of gebruiken | U92 |
| begrepen | past participle of begrijpen | U92 |
| verteld | past participle of vertellen | U92 |
| gegeten | past participle of eten | U92 |
| gekocht | past participle of kopen | U92 |
| gewerkt | past participle of werken | U92 |
| anderen | plural of ander | U94 |

## Appendix B: accepted answers (en_to_fr) with words the course has not taught by that circle

These are accept-only answers, never shown, but the theme says accepted answers use only taught words. Verdict for each: Cut, or keep only if the pipeline marks them hidden and tests them.

| Answer id | Sentence | Answer | Untaught (word→circle it belongs to, ? = not a course word) |
|---|---|---|---|
| GS11103-5460013 | S11103 | Wanneer zullen we eten? | zullen→U64 |
| GS3101-11779284 | S3101 | Dank je wel, Tom. | wel→U36 |
| GS31101-8575465 | S31101 | Ik begrijp jullie. | jullie→U06 |
| GS31109-387597 | S31109 | Kunt u langzamer spreken alstublieft? | Kunt→U34 u→U41 spreken→? alstublieft→U41 |
| GS31109-4271120 | S31109 | Spreek trager, alsjeblieft. | trager→? |
| GS31109-481102 | S31109 | Spreekt u alstublieft langzamer. | Spreekt→U46 u→U41 alstublieft→U41 |
| GS3111-514767 | S3111 | Excuseer. | Excuseer→U26 |
| GS3111-4558027 | S3111 | Het spijt me. | spijt→U26 me→U41 |
| GS3111-7344340 | S3111 | Mijn excuses. | Mijn→U10 excuses→? |
| GS4103-659477 | S4103 | Ik hou van thee. | hou→U75 |
| GS4103-4654636 | S4103 | Ik lust thee. | lust→? |
| GS4104-5460243 | S4104 | Ik hou van brood. | hou→U75 |
| GS53112-12997914 | S53112 | De taxi is gearriveerd. | gearriveerd→? |
| GS55109-3214656 | S55109 | De balpen ligt op het bureau. | balpen→? bureau→? |
| GS64107-9341669 | S64107 | Ik heb er niet zo'n zin in. | zo'→? n→? |
| GS65102-4660585 | S65102 | Het begint laat te worden. | begint→? |
| GS72108-2782050 | S72108 | Het is winderig vandaag. | winderig→? |
| GS73125-378004 | S73125 | Ik ga lopend naar school. | lopend→U84 |
| GS8104-803547 | S8104 | De kat zit onder de tafel. | zit→U71 |
| GS88106-689600 | S88106 | Waar woont gij? | gij→? |
| GS88111-7745670 | S88111 | Gelieve hier te ondertekenen. | Gelieve→? ondertekenen→? |
| GS93107-9588916 | S93107 | Heb je last van tandpijn? | last→? tandpijn→? |
| GS93111-8180745 | S93111 | Het is mijn zaak niet. | zaak→? |
| GS94104-6116987 | S94104 | Jazeker. | Jazeker→? |

## Appendix C: Read and Answer texts with untaught words (25 of 39)

Each listed word is not a course word (?) or belongs to a later circle. Verdict: Fix, reword to taught words (as R306 was), or give the word a tap hint. Signs and menus may keep a real-world word if it does not carry an answer.

| Text | Circle | Untaught words |
|---|---|---|
| R101 | U47 | euro→U48 per→U48 |
| R102 | U47 | Elke→U49 woensdag→U62 |
| R105 | U48 | Appeltaart→? |
| R106 | U48 | Eén→? |
| R108 | U49 | flessen→? Chocolade→? dozen→? |
| R109 | U49 | flessen→? sap→? chocolade→? |
| R201 | U62 | gesloten→U66 |
| R202 | U62 | zullen→U64 bioscoop→U64 vrij→U64 werk→U65 |
| R203 | U62 | gesloten→U66 |
| R204 | U63 | gesloten→U66 schooldag→? |
| R206 | U63 | bergen→? |
| R208 | U66 | Toiletten→? verdieping→U86 |
| R209 | U66 | Jansen→? Vers→? |
| R213 | U69 | Beantwoord→? |
| R214 | U69 | dichtdoen→? |
| R215 | U69 | die→? bladzijde→? |
| R302 | U82 | Jus→? d'→? orange→? Appeltaart→? Tosti→? |
| R305 | U83 | meter→? |
| R306 | U83 | eind→? centrum→? Bushalte→? |
| R307 | U86 | Appartement→? centrum→? slaapkamers→? balkon→? |
| R309 | U86 | universiteit→? |
| R310 | U87 | zoekt→? |
| R311 | U87 | s→? ochtends→? |
| R312 | U87 | zoekt→? chauffeur→? |
| R315 | U89 | koelkast→? |

## Appendix D: UK spellings in shipped English (14)

The course standard is US spelling; only "colour" is mapped. Fix: extend scripts/lib/us-spelling.mjs (litre, harbour, theatre, centre, metre, programme, practise, apologise, travelling, Mum, neighbourhood).

| Sentence | Word | English |
|---|---|---|
| S91017 | litre | What does a litre of milk cost? |
| S91018 | litre | What does a litre of milk cost? |
| S45101 | neighbourhood | My neighbourhood is nice. |
| S64104 | theatre | Shall we go to the theatre? |
| S64105 | theatre | The theatre is nearby. |
| S67109 | harbour | The boat is in the harbour. |
| S67110 | harbour | Rotterdam has a big harbour. |
| S67111 | harbour | We're going to the harbour. |
| S85112 | Mum | Mum, where are you? |
| S85113 | Mum | Mum is in the kitchen. |
| S85114 | Mum | I love you, Mum. |
| S85116 | Mum | Bye, Mum! |
| S85117 | Mum | Mum, I'm hungry. |
| S85118 | Mum | Where's Mum? |

## Appendix E: Match Pairs cognates

Excluded by isCognate (hint item equals the word): 55. Identical words that still land on the board because the hint carries an article or a longer phrase: 14. Near-cognates (within two letters of a hint word) that land on the board: 82. The engine handles identical matches only; near-cognates are not handled. Framework ask: isCognate should strip "a, an, the, to" and compare each hint word, and a near-cognate rule (one edit after folding: musik/music, hotell/hotel, buss/bus) should keep the pair off Match Pairs or pair it with a different meaning.

Identical on the board:

| Word | Hint |
|---|---|
| drink | I drink |
| één | alternative form of een |
| student | a student at an institute for academic tertiary education |
| april | the month of April |
| plan | a set of intended actions, through which one expects to achieve a goal: plan, plot, scheme |
| lunch | a lunch, a meal eaten around noon |
| begin | to begin (beginnen) |
| bank | a bank |
| help | to help (helpen) |
| stop | to stop, to halt (stoppen) |
| sport | a sport |
| tram | a tram, a streetcar, vehicle on rails for passenger transport in cities |
| metro | an underground railway or underground-railway system, a subway, a metro |
| postcode | a postcode, a postal code |

Near-cognates (first 60):

| Word | Hint |
|---|---|
| hallo | hello |
| kind | child, kid, non-adult human |
| boek | book |
| goed | good |
| drinkt | drinks |
| melk | milk |
| appel | apple |
| wijn | wine |
| onder | under, below, beneath, underneath |
| hier | here |
| honger | hunger |
| vriend | friend |
| zeven | seven |
| tien | ten |
| groen | green |
| laat | late |
| woord | word |
| lang | long |
| trein | train |
| naam | name |
| nummer | number used as a means of identification |
| belt | to ring, like using a bell (bellen) |
| Engeland | England |
| Europa | Europe |
| markt | a physical market place, usually a public square |
| supermarkt | supermarket |
| tomaat | tomato, fruit of Solanum lycopersicum |
| banaan | banana |
| kost | to cost (kosten) |
| glas | glass |
| paar | pair, couple |
| alle | all, all of (al) |
| hoed | a hat, worn on the head |
| papier | paper |
| leren | to learn, to study |
| stil | still, not moving |
| licht | light, bright |
| rivier | a river |
| bloem | flower, bloom of flowering plant |
| gras | grass |
| minuut | minute |
| minuten | minute (minuut) |
| middag | midday, noon |
| januari | January |
| februari | February |
| juni | June |
| juli | July |
| oktober | October |
| idee | idea |
| werk | work, labor |
| maak | to make, create, prepare (maken) |
| maken | to make, create, prepare |
| uitgang | exit, outgang |
| bakker | baker |
| boot | boat |
| retour | return |
| hoop | to hope for, to wish for [with op ‘on’] (hopen) |
| paspoort | passport, official document, notably granting right of passage |
| boven | above |
| breng | to bring, to carry (brengen) |

## Appendix F: circles over the 40% draft line (6 of 51 in Parts 2 to 4)

The dry-source rule is applied per part; by circle these sit over it.

| Circle | Title | Part | Lines | Drafts | % |
|---|---|---|---|---|---|
| U63 | Months + Seasons | 3 | 66 | 35 | 53 |
| U95 | Long Ago | 4 | 77 | 37 | 48 |
| U88 | Filling In Forms | 4 | 34 | 16 | 47 |
| U94 | Thinking + Saying | 4 | 78 | 37 | 47 |
| U73 | Doing Things | 3 | 71 | 29 | 41 |
| U42 | Phone Numbers | 2 | 52 | 21 | 40 |
