# Swedish A1, Parts 1 to 4: Fable's phase 6 review (2026-11-21)

Scope: the course as it sits on local main (Sites/tamago, commit ac00c3c and later; 3,133 sentences, 2,146 Tatoeba and 987 drafts; 1,040 words; 72 circles), read against the judging themes in _source/language-pipeline.md. Checked by running the word audit, a scope check of every sentence, accepted answer and reading text against the words taught at or before its circle, the Wiktionary check data in content-sv/checks/, and live Wiktionary pages where the data looked wrong; every Part 2 to 4 draft was read. Nothing in the repo was changed; this file is the only output.

## Verdicts to apply, in order

| # | Verdict | What | Why |
|---|---|---|---|
| 1 | **Fix (pipeline)** | 137 Glossary hints read "present indicative of X" / "imperative of X" / "comparative degree of X" with no meaning (kan, vill, får, tar, bor, kommer, sa, skulle, borde, välj, läs …; Appendix A). | What the learner sees on a tap is the hint, and word-hints.js shows it raw; lemma_gloss is empty for every one. Build "can (present of kunna)" from the lemma page. Theme: meaning matches Wiktionary; here the meaning is missing. |
| 2 | **Fix (hint)** | **var** W127 hint "where" → "where; was (past of vara)". | U62's note teaches **Igår var det torsdag**; four U62 lines and the hint still says only "where". |
| 3 | **Fix (hint)** | **om** W047 hint "if" → "tycker om: to like; om: if, about". | Part 1 finding, not applied. Seven Part 2 to 3 lines now use om as "if" (S35026, S61015, S65038, S68011, S69032, S73108, S69115): keep them, the hint must carry both. |
| 4 | **Fix (hint)** | **till** W162 hint "to" → "to; for (till mig); another (en syster till)". | 19 Part 2 to 4 lines use till as for/of (S41029, S43004, S48030, S65031, S65035, S68030, S89018, S92009 …). Keep the lines; fix the hint. |
| 5 | **Fix (hint + POS)** | **skönt** W? U75 is filed as a noun, hint "liking, preference, arbitration (skön)". | Wiktionary: skönt is the neuter form of the adjective skön (read 2026-11-21). Hint → "nice, pleasant (det är skönt)"; it is not a noun and needs no gender. |
| 6 | **Cut** | S44005 **Ni är nästan trettio.** "You're almost thirty." | ni to one person is the polite form the course keeps out; every other ni line is plural. |
| 7 | **Fix (drafts)** | S44121 → **Det finns en miljon hus i Sverige.**; S86104 → **Mitt kök har två fönster.**; S86109 → **Jag hyr en lägenhet en trappa upp.**; S86110 → **Vårt hus har ett svart tak.**; S92139 → **Min familj är kristen.**; S94165 English → "She is happy about the coming summer." | Stockholm does not have a million houses; two clauses glued with och; "a cold floor" and "an old staircase and a black roof" are odd; "European and Christian" is an odd pairing; glad inför is not "looking forward to". |
| 8 | **Cut (drafts)** | S92102, S92104, S92130, S92136, S93114, S93118 | "national and international question" contradicts itself; "a high risk, not a low risk" duplicates S92106; "Love is human" and "Politics is hard for a politician" are odd; "a national and economic plan" and "He has his own party" add nothing their circle lacks. |
| 9 | **Fix (lines)** | S57011 **Tom är smutsig.**, S58007 **Detta är en blomma.**, S58025 **Jag ser en låda.** | The analyser cannot place smutsig, blomma or låda on a course word (the list has other forms; sentence_words even points låda at ser), so the line shows an unhinted word. Add the singular form as a word in U57/U58 or swap the line. |
| 10 | **Cut or hide** | 2 accepted answers for S33103 use **vad** (U11, later than U33). | Appendix B. |
| 11 | **Fix (texts)** | 33 of 39 Read and Answer texts use words not taught by their circle (torget, stationen, hamnen, kr, centrum, balkong, Kanelbulle, Observera …). | Appendix C. Signs may keep a real-world word, but the answer-bearing ones need taught words or a hint. |
| 12 | **Fix (English)** | 16 UK spellings (Mum, travelling, programme, metres, practise). | Appendix D; the shared US-spelling script covers only colour. |
| 13 | **Framework** | Match Pairs: 14 identical words slip onto the board (land, person, plan, in, piano, program, problem, salt, son, bröder, sms, form, system, situation) and 137 near-cognates (musik, hotell, buss, restaurang, familj, fisk, hund …). | Appendix E. Near-cognates are not handled anywhere; the theme asks for it. |
| 14 | **Keep** | The 16 plural **ni** lines in Parts 2 to 4 (S38021, S49012, S57002, S62012 …) and the hint "you (plural)". | Plural you, not the polite form; "Har ni öppet?" to a shop is normal. |
| 15 | **Keep** | The four subordinate clauses with **inte** before the verb (S38004, S82102, S91101, S91111). | Correct Swedish; the only place a learner meets the subordinate order, with no note. Acceptable at the end of A1; a one-line note in U94 would help. |
| 16 | **Keep** | Every other Part 2 to 4 draft (906 of 917 read) and every Tatoeba line not named above. | Within their circle's words (scope check 0 misses), marked tamago_original, natural register. |

## Part 1 findings, were they applied?

| Finding | Status |
|---|---|
| var: the 16 "was" lines in Part 1 | **Applied.** None of the 16 is live; no Part 1 line uses var as was. The hint is still "where" alone (verdict 2). |
| 36 Rejects | **Applied.** 0 of 36 live. |
| 22 English picks | **Applied.** 21 of 21 shipped lines carry the pick (one id was a duplicate across circles). |
| 3 draft Fixes (S32103, S51102, S52107) | **Applied.** |
| Hints: ni, gång, film, station, klockan, kallas, män, spel, lång | **Applied** (ni "you (plural)", gång "a time, occasion", film "film, movie", klockan, kallas "is called", män "men", spel "a game", lång "long; tall"). |
| Hint: om | **Not applied.** Still "if" (verdict 3). |
| Match Pairs: äpple and near-cognates | **Not applied** (framework; verdict 13). |

## The judging themes, one by one

- **Introduced before tested, four new words a lesson.** Word audit: 0 early, 0 lessons over four (2,111 lessons). Scope check: every live sentence uses only words taught at or before its circle, except the three lines in verdict 9 whose word form is missing from the list. The one apparent exception, S8001 Titta in U08, resolves to tittar (U52, which sits before U08 on the tree).
- **Accepted answers use taught words.** 4 of 6 generated en_to_fr answers pass; 2 use vad early (verdict 10). The QA table is empty. Reading texts are the weak spot (verdict 11).
- **Gender, meaning, conjugation match Wiktionary.** Gender: no article/noun mismatch in any live line; the 57 nouns with no gender are plural and definite forms, which is expected (hundar, ordet, klockan, solen …), plus skönt, which is misfiled (verdict 5). Meaning: 994 of 1,040 hints come straight from Wiktionary, and 137 of them are form-of labels with no meaning (verdict 1); the Part 1 hints Builder 2 and I fixed are in place. Conjugation: none by design (one present form), consistent with the Glossary (ONE_FORM). fika is c or n on Wiktionary; the data says en, which is fine.
- **Drafts within the unit's words, marked.** 987 rows carry source tamago_original; every one passes the scope check. Drafts read: all 917 in Parts 2 to 4. Numbers circles (U42, U44), Clothes (U54), Months (U63) and the five Part 4 vocabulary circles are mostly drafts (Appendix F).
- **Idioms, misleading-at-level, odd lines.** Tatoeba lines are clean of the Part 1 traps (no var-as-was outside U62, no "Tom är inte på", no "Dunno"). The phrases the builder flagged read fine under their glosses: **ser … ut** (S71006, S72020, S83021: looks), **håller med** (S73011, S91101: agrees), **Mina damer och herrar** (U68), **tur** as "turn" (S75016, S75028, S75036). Odd drafts are in verdicts 7 and 8.
- **Near-cognates.** Not handled (verdict 13).
- **Inflections in teachable order.** Plural in U06, definite ending named in U58 (used earlier with hints: klockan U14, ordet U32), comparatives in U43/U44, -t forms in U57/U48, imperatives in U69, **sa** in U37 and **var** (was) in U62. The course never teaches a general past tense; 12 sa lines, 4 var lines and the modals skulle/borde are the whole past, which is right for A1. Nothing is dumped.
- **Register.** du throughout; ni only plural (verdict 6 the one slip). No dark lines: the only "sex" in the English is the form field kön (S88101, S88111), which is right. Kelly register in U91 to U95 is the one register question (below).

## Swedish Part 4: is it still a coherent A1 set after the trim?

Yes for the part's core, no change from the trim, and the vocabulary tail is the thing to decide.

- The 46 words turned off (handling, kropp, ekonomi, organisation, nämligen, påverkar, trots att, även om, framför allt, såväl …) had only drafted lines. Nothing taught depends on them: no shipped line, note or overview mentions one, and the scope check is clean. Their ids are kept, so they can return.
- What remains is coherent where it matters. U26 to U28 (Excuse Me, I'm Lost, Explaining a Problem) and U81 to U89 (café, restaurant, directions, transport, family, home, work, forms, messages) are the A1 Part 4 set every other course has, at 5% to 36% drafts each except U86 At Home (47%) and U88 Forms (77%, which is drafts everywhere, forms being Tatoeba-poor).
- The five vocabulary circles are the Kelly tail: U91 Ideas + Things (21 words: system, situation, faktum, procent, stöd, krav, område …, 57% drafts), U92 Describing Words (17: social, nationell, europeisk, ekonomisk, politisk, kristen, flest, varenda, 79%), U93 Society + News (21: samhälle, stat, parti, demokrati, makt, rättighet, 47%), U94 Thinking + Saying (15: anser, inser, gäller, dock, så att, genom att, 63%), U95 Doing + Getting (14: äger, skapar, kräver, sker, 58%). These read like a newspaper, not A1; their lines are mostly invented ("Pengar är makt", "Det är en politisk och ekonomisk fråga"). The part average of 37.5% hides that 7 of its 17 circles sit over the 40% line (Appendix F), and 16 of the 51 circles across Parts 2 to 4 do.
- Recommendation (Dan's call): treat the Swedish Kelly list as Italian's was treated. Put the newsroom and officialese words (stat, parti, politiker, demokrati, makt, rättighet, utveckling, nationell, internationell, europeisk, politisk, ekonomisk, kristen, procent, system, resultat, krav, stöd …) on the Swedish stoplist so they stop counting toward the target, and let U91 to U95 keep the everyday core (mål, skäl, anledning, skillnad, behov, område, kunskap, hög, låg, riktig, vanlig …). Coverage would read lower against the list as written and about the same against the target, which is the honest number. If the words stay, the part is still teachable; the learner just meets a cluster of abstract nouns in the last five circles, mostly through drafts.

## Appendix A: 137 Glossary hints that show a form-of label with no meaning

What the learner sees on a tap, in the Glossary and on Match Pairs (word-hints.js hintPieces shows `hint`, and `lemma_gloss` is empty for all of these). Fix: build the hint as "meaning (form of lemma)" from the lemma page's first gloss, e.g. "can (present of kunne)".

| Word | Hint shown | Circle |
|---|---|---|
| imorgon | alternative spelling of i morgon | U14 |
| långsammare | comparative degree of långsam | U31 |
| känner | present indicative of känna | U41 |
| skriver | present indicative of skriva | U34 |
| stavar | present indicative of stava | U34 |
| kan | present of kunna | U34 |
| ringer | present indicative of ringa | U42 |
| fyller | present indicative of fylla | U43 |
| blir | present indicative of bli | U43 |
| äldre | comparative degree of gammal | U43 |
| yngre | comparative degree of ung | U43 |
| väntar | present indicative of vänta | U35 |
| stämmer | present indicative of stämma | U35 |
| mer | Comparative form of mycket, used in construction of comparative form of certain adjectives | U44 |
| mindre | Comparative of lite | U44 |
| bor | present indicative of bo | U45 |
| kommer | present indicative of komma | U46 |
| talar | present indicative of tala | U46 |
| köper | present indicative of köpa | U47 |
| vill | present indicative of vilja | U47 |
| får | present indicative of få | U47 |
| tar | present indicative of ta | U47 |
| behöver | present indicative of behöva | U47 |
| menar | present indicative of mena | U36 |
| tror | present indicative of tro | U36 |
| fattar | present indicative of fatta | U36 |
| kostar | present indicative of kosta | U48 |
| betalar | present indicative of betala | U48 |
| säljer | present indicative of sälja | U47 |
| tänker | present indicative of tänka | U36 |
| frågar | present indicative of fråga | U55 |
| svarar | present indicative of svara | U55 |
| ser | present indicative of se | U58 |
| lyssnar | present indicative of lyssna | U55 |
| räknar | present indicative of räkna | U55 |
| verkar | present indicative of verka | U56 |
| saknar | present indicative of sakna | U56 |
| klarar | present indicative of klara | U57 |
| senare | comparative degree of sent | U61 |
| sa | past indicative of säga | U37 |
| högre | comparative degree of hög | U37 |
| ber | present indicative of be | U37 |
| brukar | present indicative of bruka | U62 |
| låt | imperative of låta | U38 |
| låter | present indicative of låta | U38 |
| minns | present of minnas | U38 |
| antar | present indicative of anta | U38 |
| undrar | present indicative of undra | U38 |
| följer | present indicative of följa | U64 |
| bestämmer | present indicative of bestämma | U64 |
| passar | present indicative of passa | U64 |
| föreslår | present indicative of föreslå | U64 |
| möter | present indicative of möta | U64 |
| vaknar | present indicative of vakna | U65 |
| sover | present indicative of sova | U65 |
| duschar | present indicative of duscha | U65 |
| jobbar | present indicative of jobba | U65 |
| arbetar | present indicative of arbeta | U65 |
| börjar | present indicative of börja | U65 |
| slutar | present indicative of sluta | U65 |
| lägger | present of lägga | U65 |
| sitter | present indicative of sitta | U65 |
| avgår | present indicative of avgå | U67 |
| flyger | present indicative of flyga | U67 |
| reser | present of resa | U67 |
| beror | present indicative of bero | U39 |
| stannar | present indicative of stanna | U68 |
| välj | imperative of välja | U69 |
| fyll | imperative of fylla | U69 |
| läs | imperative of läsa | U69 |
| glöm | imperative of glömma | U69 |
| försök | imperative of försöka | U69 |
| visar | present indicative of visa | U69 |
| berättar | present indicative of berätta | U69 |
| ditt | neuter singular of din, your, yours | U64 |
| mina | Plural of min | U68 |
| tidigare | comparative degree of tidigt | U61 |
| regnar | present indicative of regna | U72 |
| snöar | present indicative of snöa | U72 |
| blåser | present indicative of blåsa | U72 |
| ger | present indicative of ge, contracted from the archaic giver | U73 |
| håller | present indicative of hålla | U73 |
| hittar | present indicative of hitta | U73 |
| skickar | present indicative of skicka | U73 |
| ställer | present indicative of ställa | U73 |
| sätter | present indicative of sätta | U73 |
| hämtar | present indicative of hämta | U73 |
| drar | present indicative of dra | U73 |
| bygger | present indicative of bygga | U73 |
| öppnar | present indicative of öppna | U73 |
| stänger | present indicative of stänga | U73 |
| söker | present indicative of söka | U73 |
| använder | present indicative of använda | U73 |
| delar | present indicative of dela | U73 |
| fortsätter | present indicative of fortsätta | U73 |
| händer | present indicative of hända | U73 |
| startar | present indicative of starta | U73 |
| fungerar | present indicative of fungera | U73 |
| cyklar | present indicative of cykla | U74 |
| tränar | present indicative of träna | U74 |
| vinner | present indicative of vinna | U74 |
| älskar | present indicative of älska | U75 |
| vågar | present indicative of våga | U75 |
| handlar | present indicative of handla | U73 |
| beställer | present indicative of beställa | U81 |
| skulle | past indicative of ska | U81 |
| smakar | present indicative of smaka | U81 |
| hållet | definite singular of håll | U83 |
| sväng | imperative of svänga | U83 |
| svänger | present indicative of svänga | U83 |
| fortsätt | imperative of fortsätta | U83 |
| längre | comparative degree of långt | U83 |
| borde | past indicative of böra | U27 |
| byter | present indicative of byta | U84 |
| stiger | present indicative of stiga | U84 |
| skriv | imperative of skriva | U88 |
| hälsar | present indicative of hälsa | U89 |
| ring | imperative of ringa | U89 |
| röstar | present indicative of rösta | U93 |
| diskuterar | present indicative of diskutera | U93 |
| anser | present indicative of anse | U94 |
| inser | present indicative of inse | U94 |
| finner | present indicative of finna | U94 |
| kallar | present indicative of kalla | U94 |
| gäller | present indicative of gälla | U94 |
| bör | present indicative of böra | U94 |
| äger | present indicative of äga | U95 |
| skapar | present indicative of skapa | U95 |
| ökar | present indicative of öka | U95 |
| växer | present indicative of växa | U95 |
| leder | present indicative of leda | U95 |
| kräver | present indicative of kräva | U95 |
| utvecklar | present indicative of utveckla | U95 |
| bidrar | present indicative of bidra | U95 |
| vänder | present indicative of vända | U95 |
| sker | present indicative of ske | U95 |
| övar | present indicative of öva | U95 |

## Appendix B: accepted answers (en_to_fr) with words the course has not taught by that circle

These are accept-only answers, never shown, but the theme says accepted answers use only taught words. Verdict for each: Cut, or keep only if the pipeline marks them hidden and tests them.

| Answer id | Sentence | Answer | Untaught (word→circle it belongs to, ? = not a course word) |
|---|---|---|---|
| GS33103-4446756 | S33103 | Vad heter den? | Vad→U11 |
| GS33103-4446755 | S33103 | Vad kallas den? | Vad→U11 |

## Appendix C: Read and Answer texts with untaught words (33 of 39)

Each listed word is not a course word (?) or belongs to a later circle. Verdict: Fix, reword to taught words (as R306 was), or give the word a tap hint. Signs and menus may keep a real-world word if it does not carry an answer.

| Text | Circle | Untaught words |
|---|---|---|
| R101 | U47 | kronor→U48 per→? |
| R102 | U47 | torget→? Varje→U49 |
| R103 | U47 | torget→? |
| R105 | U48 | Äppelkaka→? |
| R106 | U48 | Gamla→? |
| R108 | U49 | flaskor→? Choklad→? askar→? |
| R109 | U49 | festen→? flaskor→? saft→? ask→? choklad→? |
| R201 | U62 | stängt→U66 |
| R202 | U62 | Ska→U64 bio→U64 ledig→U64 jobbar→U65 |
| R203 | U62 | Museet→? stängt→U66 måndagar→? |
| R204 | U63 | Skolan→? skoldagen→? |
| R205 | U63 | torget→? dans→? |
| R206 | U63 | bergen→? |
| R208 | U66 | trappa→U86 utgången→? ingången→? |
| R209 | U66 | Lindas→? bageri→? Nytt→? |
| R211 | U67 | hamnen→? varannan→? |
| R212 | U67 | stationen→? |
| R213 | U69 | Lyssna→? texten→? frågorna→? |
| R214 | U69 | Stäng→? dörren→? Observera→? stäng→? |
| R215 | U69 | Öppna→? boken→? sidan→? texten→? |
| R301 | U82 | kr→? |
| R302 | U82 | kr→? kr→? Kanelbulle→? kr→? kr→? |
| R304 | U83 | stationen→? torget→? |
| R305 | U83 | m→? |
| R306 | U83 | Hotellet→? slutet→? till fots→U84 centrum→? Busshållplats→? hotellet→? |
| R307 | U86 | centrum→? balkong→? kr→? månaden→? |
| R308 | U86 | nya→? balkong→? |
| R309 | U86 | hyra→? student→? universitetet→? |
| R310 | U87 | Ring→U89 |
| R312 | U87 | chaufför→? krävs→? |
| R313 | U89 | underbart→? |
| R314 | U89 | Festen→? |
| R315 | U89 | Maten→? kylskåpet→? |

## Appendix D: UK spellings in shipped English (16)

The course standard is US spelling; only "colour" is mapped. Fix: extend scripts/lib/us-spelling.mjs (litre, harbour, theatre, centre, metre, programme, practise, apologise, travelling, Mum, neighbourhood).

| Sentence | Word | English |
|---|---|---|
| S42105 | Mum | It's good to call Mum. |
| S43102 | Mum | Happy birthday, Mum! |
| S58117 | Mum | Flowers for Mum. |
| S71112 | travelling | We're travelling through Sweden. |
| S71118 | travelling | We're travelling around Sweden. |
| S71119 | travelling | We're travelling around Europe. |
| S74115 | programme | It's a good programme. |
| S74116 | programme | I'm watching a programme on TV. |
| S74117 | programme | It's an interesting programme. |
| S83109 | metres | Keep going straight on for a hundred metres. |
| S83110 | metres | After fifty metres it's on the left side. |
| S83114 | metres | There's an old bridge a hundred metres further on. |
| S89103 | Mum | Dear Anna, Mum says hello. |
| S89105 | Mum | Dear Mum and Dad, many greetings from Göteborg. |
| S95151 | practise | I practise every day. |
| S95153 | practise | We practise Swedish together. |

## Appendix E: Match Pairs cognates

Excluded by isCognate (hint item equals the word): 35. Identical words that still land on the board because the hint carries an article or a longer phrase: 14. Near-cognates (within two letters of a hint word) that land on the board: 137. The engine handles identical matches only; near-cognates are not handled. Framework ask: isCognate should strip "a, an, the, to" and compare each hint word, and a near-cognate rule (one edit after folding: musik/music, hotell/hotel, buss/bus) should keep the pair off Match Pairs or pair it with a different meaning.

Identical on the board:

| Word | Hint |
|---|---|
| land | a country, a land |
| person | a person, people |
| plan | a plan |
| in | into, to in |
| piano | a piano |
| program | a program |
| problem | a problem, an issue |
| salt | salt sodium chloride, used extensively as a condiment and preservative. |
| son | a son |
| bröder | a brother, clipping of broder (bror) |
| sms | text message, an SMS message |
| form | a form, a shape |
| system | a system, a way or method of organizing items and knowledge |
| situation | a situation |

Near-cognates (first 60):

| Word | Hint |
|---|---|
| dörr | a door |
| hund | a dog, a hound |
| fisk | a fish |
| äpplen | an apple (äpple) |
| varm | warm, hot hot |
| familj | family |
| syster | a sister |
| imorgon | alternative spelling of i morgon |
| restaurang | a restaurant |
| efter | after |
| lång | long; tall (of a person) |
| musik | music |
| hotell | a hotel |
| buss | a bus, a vehicle to transport people |
| nära | near, close |
| namn | name |
| stavar | present indicative of stava |
| nummer | a number |
| ringa | to ring |
| blir | present indicative of bli |
| väntar | present indicative of vänta |
| adress | an address |
| Danmark | Denmark |
| Europa | Europe |
| talar | present indicative of tala |
| tala | to speak, to talk |
| frukt | fruit |
| tomat | tomato |
| banan | a banana |
| menar | present indicative of mena |
| tror | present indicative of tro |
| fattar | present indicative of fatta |
| kostar | present indicative of kosta |
| betalar | present indicative of betala |
| paket | a package, a parcel, a packet, a wrapped gift |
| glas | glass |
| alla | all (all) |
| allt | everything, all |
| hatt | a hat |
| klass | class a group, collection, category or set sharing characteristics or attributes. a group of students or pupils regularly taking classes together, with a teacher a group of students or pupils in a given class room, studying together a social grouping, based on job, wealth, etc. |
| frågar | present indicative of fråga |
| svarar | present indicative of svara |
| papper | paper |
| öppen | open |
| gräs | grass |
| lyssnar | present indicative of lyssna |
| räknar | present indicative of räkna |
| verkar | present indicative of verka |
| saknar | present indicative of sakna |
| klarar | present indicative of klara |
| halv | half, ½ |
| minut | minute |
| minuter | minute (minut) |
| brukar | present indicative of bruka |
| först | first, firstly |
| januari | January |
| februari | February |
| juni | June |
| juli | July |
| augusti | August |

## Appendix F: circles over the 40% draft line (16 of 51 in Parts 2 to 4)

The dry-source rule is applied per part; by circle these sit over it.

| Circle | Title | Part | Lines | Drafts | % |
|---|---|---|---|---|---|
| U92 | Describing Words | 4 | 43 | 34 | 79 |
| U88 | Filling In Forms | 4 | 26 | 20 | 77 |
| U94 | Thinking + Saying | 4 | 46 | 29 | 63 |
| U54 | Clothes | 2 | 32 | 20 | 62 |
| U44 | Numbers to 100 | 2 | 52 | 31 | 60 |
| U42 | Phone Numbers | 2 | 51 | 30 | 59 |
| U95 | Doing + Getting | 4 | 48 | 28 | 58 |
| U91 | Ideas + Things | 4 | 56 | 32 | 57 |
| U63 | Months + Seasons | 3 | 73 | 41 | 56 |
| U66 | Signs + Notices | 3 | 40 | 21 | 52 |
| U86 | At Home | 4 | 32 | 15 | 47 |
| U93 | Society + News | 4 | 68 | 32 | 47 |
| U58 | Outdoors | 2 | 56 | 26 | 46 |
| U47 | At the Market | 2 | 60 | 26 | 43 |
| U55 | In Class | 2 | 66 | 28 | 42 |
| U46 | Countries + Languages | 2 | 51 | 21 | 41 |
