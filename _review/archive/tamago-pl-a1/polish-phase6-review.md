# Polish A1, Parts 1 to 4: Fable's phase 6 review (2026-11-22)

Scope: the course as it sits on local main (Sites/tamago, merge 3bbb386; content identical to this worktree at a33fd65): 4,641 sentences (2,992 Tatoeba, 1,649 drafts, 35.5%), 1,579 live words, 72 circles, 7 forms, 36 listening items, 10 writing prompts, 39 reading texts, the mock state certificate exam. Read against the judging themes in _source/language-pipeline.md and the seven Polish points Dan listed. Method: the word audit; a scope check of every sentence, generated accepted answer, reading text, form card and listening line against the words taught at or before its circle; every one of the 1,649 drafts read; the 72 grammar notes for the case-introducing circles read; the words' Wiktionary data in src/content-pl/words.json, and live Wiktionary pages for pan, pani, może, być może, wiać, słonecznie, państwo, owoc, drzwi, pieniądze, za and ulica (read 2026-11-22); the exam format against the UMCS description of the state exam's structure (certyfikatpolski.pl refuses automated readers). Nothing in the repo was changed; this file and the shelf summary are the only output.

## Verdicts to apply, in order

| # | Verdict | What | Why |
|---|---|---|---|
| 1 | **Fix (hints, 81 words)** | Conjugated forms whose hint is the infinitive: **jestem** "to be (być)", **mam** "to have (mieć)", **lubię**, **piję**, **mieszkam**, **wiem**, **chcę**, **mogę**, **może**, **muszę**, **idę**, **rozumiem**, **mówię**, **czytam**, **gram**, **umiem**, **boli** and the rest of Appendix A. | What a learner sees on a tap is the hint, and here it says "to be" where the word means "I am". The other 172 forms already read "I love (kochać)", "we can (móc)", "will be (być)": apply the same shape, "I am (być)", "he/she can (móc)". This is Polish's version of the form-of problem; milder than the Nordic courses (the meaning is there, the person is not), but it covers the first fifteen circles, where it matters most. |
| 2 | **Fix (hint)** | **może** W269 "to be able (móc)" → "he/she can (móc); maybe (być może)". | Wiktionary (read 2026-11-22) gives both: Etymology 1 particle "maybe, perhaps" (an ellipsis of być może), Etymology 2 third-person present of móc. U39 teaches **być może** as a phrase and the hint should say that **może** alone is the same word; see verdict 14 for the lines. |
| 3 | **Fix (hint)** | **numer** W1532 hint "number number number edition". | A gloss-join error; the learner sees the word three times. → "number". |
| 4 | **Fix (hint + POS)** | **kochany** W2604 filed as Noun, hint "dear, darling (to a man)". | Its six U89 lines use it as an adjective (**mój kochany brat**, **Kochana, jak się masz?**); Wiktionary has the adjective "beloved, dear" and the noun "loved one". Hint → "dear, beloved (kochany brat); darling (as a name)"; POS Adjective, no gender. |
| 5 | **Fix (gender, 23 words)** | Case-form nouns with no gender: telefonu, porządku, mieście, ulicy, rodziców, owoce, rację, nadzieję, pieniędzy, butelkę, butelki, wody, chleba, szklankę, filiżankę, czasu, kurtkę, lekcji, klasie, szkole, szkoły, górach, drzewa (Appendix C). | The check-in says case forms take their lemma's gender from review-decisions gender; these 23 were missed. Each lemma's headword gives it (telefon m inan, miasto n, ulica f, owoc m inan …). |
| 6 | **Fix (words)** | Formal address: add **pan** and **pani** as "you (polite, to a man / to a woman; takes the he/she verb form)" and let their Tatoeba lines in. Where: U41 Your Name, Please (**Jak się pan nazywa?**, **Jak pani ma na imię?**), U31/U26 (**Czy może pan powtórzyć?**, **Przepraszam pana**), U81/U82 (**Co pan podaje?** no; the waiter's **Co dla pani?**, **Czy pan już wybrał?**), U88 (**Jaki jest pana stan cywilny?**, **Proszę pani, podpis tutaj**). Keep **ten pan / ta pani** "this man / this woman" in U87 as it is. | Dan's policy is to teach the formal register (German Sie, Dutch u from U41). The course says ty throughout and keeps pan/pani to U87 as "this man / this woman", all six lines drafts. Wiktionary (read 2026-11-22): pan has a Pronoun heading, "you, polite second person, m-personal nominative, it takes verbs as third-person sg form"; pani the same. Every Tatoeba pan/pani line was kept out for this reason, and two already leak in as accepted answers (GS6105 **Czy ma pan psa?** at U06, GS88123 **Jaki jest pana stan cywilny?**). The state exam's role plays (shop, café, office) are in the formal register, so an A1 candidate meets it. Nominative **pan/pani** plus the third-person verb is enough at A1; **pana/panią** (object) only in U88's fixed phrases. Needs a word move and a pull; builder's work, Dan's go-ahead on the circles. |
| 7 | **Dan's call (names)** | Case-marked names: allow **Toma** (object: **Znasz Toma?**, **Nie ma Toma**) from U41 and **Tomem** (**z Tomem**) from U64, as names with a one-line note; **Marii / Marię**, **Anny / Annę** the same. **Tomowi** stays out. | review-decisions names are nominative only; the builder says this keeps out about 120 Tatoeba lines. The course does teach the accusative of animate nouns from U05 (**psa**, **kota**) and object pronouns from U41, so **Toma** at U41 is the same rule on a name. The analyser treats names as an exact lower-case match, so each form must be listed; a form the learner can tap for "Tom, object form" needs a word row, not a names entry (framework). Without it, nothing is wrong: no live line uses a case-marked personal name, and the 51 lines with **Warszawie**, **Polski**, **Polsce**, **Francji**, **Anglii**, **Niemczech**, **Japonii** all rest on taught proper-noun forms (W1615, W1645 to W1652). |
| 8 | **Cut (register)** | S56003 **Myślisz, że jestem głupi?**, S56010 **Myślisz, że Tom jest głupi?**, S56023 **Czy ten komputer jest głupi?**, S87021 **Mój szef jest taki głupi!**, S94209 **Tom jest bardziej głupi niż myślisz.** | Five "stupid" lines; **głupi** is a Kelly word and one gentle line would do (keep S56023 if one must stay). Same ruling as Danish's hate lines. |
| 9 | **Cut (register)** | S75035 **Nienawidzę tego robić!**, S75040 **Naprawdę tego nienawidzę.**, S81023 **Nienawidzę ciasta.**, draft S75104 **Nienawidzę tego.** | Four hate lines for one word; keep S75104 as the one gentle draft, or none. Danish ruling. |
| 10 | **Dan's call (register)** | The six **Bóg** lines in U95: S95001 **Czy Bóg istnieje?**, S95002, S95003, S95006, S95007 **Bóg cię kocha.**, S95008. | All Tatoeba, all natural; **Bóg** is a Kelly core word. Six in one circle reads as a theme. Keep two (S95003 **Bóg wie.**, S95008 **Tylko Bóg to wie.**, both idioms a learner hears) and cut the rest, or keep all; the course has no other religious content. |
| 11 | **Fix (English)** | S4014 **Lubię lody.** "I love ice cream" → "I like ice cream."; S4022 **Tom dużo pije.** "Tom is a heavy drinker." → "Tom drinks a lot."; S62019 **Kot ma dwadzieścia dni.** "The cat is twenty days old." (keep or cut; odd but true); S15025 **Czy on ma na imię Piotr?** "Is his name Peter?" → "Is his name Piotr?" and move to U41 or later (**ma na imię** is taught in U41, this is U15). | Loose English teaches the wrong verb (**lubię** is like, **kocham** love); S15025 tests a phrase five circles before its note. |
| 12 | **Fix (texts)** | 10 of 39 Read and Answer texts use a form the course has not taught: R306 **przed hotelem**, R309 **dla studenta**, R311 **w szpitalu** (the builder's three), R106 **Stare książki** (plural of **stary**, never taught), R101 **złotych za** at U47 (taught in U48, one circle later), and the abbreviations **zł** (R301, R302, R307), **m** (R305), **Tel.** (R310). | Appendix D. The three case forms: add the word (hotelem U84, studenta U86, szpitalu U87) or reword (**obok hotelu** is also untaught; **Przystanek jest blisko.**). R101: swap the two U47 texts' order or move R101 to U48. **zł**, **m**, **Tel.** are real-world sign shorthand and may stay if the shared text component gives them a tap hint; otherwise write **złotych**, **metrów**, **Telefon**. |
| 13 | **Cut or hide** | 29 generated accepted answers (en_to_fr) use untaught words: **moim przyjacielem** at U10, **zielone / białe** at U13 (neuter forms never taught), **będzie** at U14, **studentem** at U02, **są** at U02, **pan / pana** at U06, U75, U88, **mi** at U73, **interesującą kobietą**, **dobrą osobą**, **czerwoną twarz** at U56 … | Appendix B. Accept-only, never shown, but the theme says accepted answers use only taught words, and several accept a case or register the circle has not reached. The same shared-script gap Dutch and the builder logged; the pipeline fix is one filter in the generator. |
| 14 | **Keep** | The 199 **może** = "maybe" rejections (content-pl/sweep/packs-review.json, U15 reject, one reason for all 199: "może as maybe; taught as can (móc)"). | Consistent: every live **może** line (27) uses it as can/may, except the three **być może** lines (S39014, S39101, S39102), which are the taught phrase in U39. No "maybe" line slipped in; **Może później.** and **Tak. Nie. Może.** sit in the candidates files unused. With verdict 2's hint, "maybe" lines could come back into U39 or later; not before. |
| 15 | **Keep** | **być może** W1999 U39 "maybe, perhaps" as a two-word phrase word. | Wiktionary has the page: Particle, "(idiomatic) maybe, perhaps". The analyser handles phrase words; three lines use it. |
| 16 | **Keep** | The case order (Appendix E): nominative (Part 1), accusative of objects (U04 **kawę**, U05 **psa**; U62 **w sobotę**; U65 **tę**), genitive after **nie**, **lat** and **z / do / u / dla / nie ma** and the partitive (U05, U12; U45 to U49), locative after **w / na / przy** (U45 on; U63 months), instrumental (U64 **z kolegą**, U65 **jestem nauczycielem**, U67 **autobusem**, U74 **pod / przed / między**, U75 **interesować się**), dative as pronouns only (U26 **mi, ci**; U85 **mu, nam**), vocative never. Past U71 before perfective future U84; **będę** U64/U72. | One case per circle at the point it is needed, each form its own word, each note naming the case and its preposition; every note's claim checked (**domu** is both genitive and locative; **jako** takes the nominative; **po** with **-sku**). No sentence uses a form not taught by its circle (scope check 0 of 4,641). Two circles are the heavy ones: U41 brings in ten object pronouns at once (**cię, ciebie, go, ją, jego, jej, ich, nas, kogo, nikogo**; six are case forms) and U49 eighteen genitive forms (the partitive set), but each is one use of one case and the four-per-lesson rule spreads them. **na mnie zły** (U51, four lines) is the one Part 1 phrase with a case the part has not named; its hint carries it. |
| 17 | **Keep** | The two thin circles. U02 People + Things: 25 drafts, 18 Tatoeba (58%); U53 Around Town: 26 drafts, 21 Tatoeba (55%). | Both read as coherent first-steps sets: **To jest X. / X jest tu. / Gdzie jest X? / X jest blisko.** on their own nouns, nothing a native would question (S2121 **To drzwi.** is fine; **drzwi** is plural-only, hint "door"). They are thin because Tatoeba has few checked lines with only nominative nouns and **jest**; the candidates file lists fitting lines kept out only by the trust rule (U02 and U53 each have a block), which the builder can bring in to lower the share. Nothing to cut. |
| 18 | **Keep, with one note** | The mock exam (finalcheck.js FORMATS.pl, EXAMS.pl). | Order and modules match the regulation as UMCS summarises it: written part listening, reading, writing, no grammar module at A1 (grammar is its own module from B1, "rozpoznawanie struktur gramatycznych" sits inside reading at A2), then an oral part of at most 10 minutes; pass 50% of the written and 50% of the oral part. UMCS gives A1 timings of 20 + 30 + 40 minutes (90, under the regulation's 120) and 4 to 5 exercises for listening and reading; our 9 / 6 / 4 / 3 items are in proportion. Note for Dan: the regulation sets A1 for adults, and UMCS lists it, but the commission's current sessions (per the search results) start at A2 for adults; EXAMS.pl's "set at A1" is right in law, and the Ready for the Real Exam page should say that A1 sittings are rare and to check the session list. EXAMS.pl samples points at the home page, which refuses automated readers but opens for a person. |
| 19 | **Fix (English)** | 32 UK spellings: mum (8), theatre (7), centre (4), behaviour (3), towards (3), programme (3), apologise (2), metres (2), favourite (1). | Appendix F; the shared US-spelling script maps only colour. |
| 20 | **Framework** | Match Pairs: 20 identical words are excluded (student, problem, park, film, hotel, bank, zero, moment, kilo, złoty, grosz, weekend, plan, sport, menu, metro, e-mail, system, materiał, element); 20 near-cognates land on the board (kolor, muzeum, numer, sweter, komputer, minuta, projekt, pizzę, prezent, klient, dokument, charakter, proces, interes, milion …). | Appendix G. Polish has far fewer than the Nordic courses; the near-cognate rule asked for there would cover these. |
| 21 | **Keep** | Every other draft (1,649 read) and every Tatoeba line not named above. Drafts are marked tamago_original, within their circle's words (scope 0 misses), and in the register of a textbook; Parts 3 and 4 are mostly Kelly-word drafts (**To dobra metoda.**, **Rozwój jest ważny.**) that are flat but correct. | Nothing else to cut. Two drafts to watch at the native check: S58154 **To nasza ziemia.** "This is our land." and S95144 **Naród jest silny.** carry a tone the circle does not need; S91110 **To nie mój typ.** "He's not my type." is fine. |

## The seven Polish points, answered

1. **Case order.** Yes: one form at a time, each form its own word before any line tests it, in the order nominative, accusative, genitive, locative, instrumental, dative-as-pronouns (Appendix E and verdict 16). The scope check found no sentence, form card or listening line using a form before its circle. The grammar notes name each case where it arrives and the claims hold against Wiktionary.
2. **Thin circles.** U02 and U53 are coherent and nothing in them is wrong (verdict 17). Lowering the draft share is a trust-rule question, not a content one.
3. **może.** The 199 rejections are consistent and complete: one reason, no "maybe" line live, **być może** taught as the phrase in U39 (verdict 14). The hint on **może** should name both readings (verdict 2).
4. **Formal pan/pani.** Not taught; policy says teach it. Verdict 6 says where: U41 for the question forms, U26/U31 for the help phrases, U81/U82 for the café and restaurant, U88 for the form-filling lines. Two formal lines already sit in the accepted answers.
5. **Names in case forms.** None live; place names are handled as taught proper-noun forms; personal names stay nominative. Verdict 7 proposes **Toma** at U41 and **Tomem** at U64 for Dan.
6. **Form-of hints.** Polish does not have the Nordic problem: 0 hints are bare case or tense labels; every case form reads "meaning (lemma; phrase)". What it has instead is 81 verb forms hinted with the infinitive (verdict 1).
7. **Mock exam.** Matches the A1 state exam's modules, order and pass rule (verdict 18), with one note about A1 sittings for Dan.

## Themes, in order

- **Every word introduced before tested; four new words a lesson.** Word audit (run 2026-11-22): 0 words met early, 0 lessons over four new words, across 3,101 lessons and 1,579 words. Scope check: 0 of 4,641 sentences, 0 of 7 form cards, 0 of 36 listening lines use a word or form from a later circle or outside the course.
- **Accepted answers use only taught words.** 29 of 56 generated answers do not (verdict 13).
- **Gender, meaning, conjugation match Wiktionary.** Gender is read from each headword with animacy and matches on every word checked; 23 case forms carry none (verdict 5). Meaning: verdicts 1 to 4; **wieje** and **słonecznie**, flagged in the check-in, are already right in the shipped hints ("blows (wieje wiatr)", "sunny"). Conjugation: 118 tables from each verb's own {{pl-conj}}; not re-derived here.
- **Drafts within the unit's words, marked.** All 1,649, yes.
- **Idioms, misleading, odd lines cut.** Verdicts 8 to 11.
- **Near-cognates.** Verdict 20; a framework item.
- **Cases and inflections in teachable order.** Verdict 16.
- **Register fits A1.** ty throughout is consistent but leaves out the register the exam uses (verdict 6); otherwise clean apart from verdicts 8 to 10.

## Draft share by part and circle

| Part | Lines | Drafts | % |
|---|---|---|---|
| 1 | 841 | 242 | 28.8% |
| 2 | 1267 | 463 | 36.5% |
| 3 | 1293 | 474 | 36.7% |
| 4 | 1240 | 470 | 37.9% |

Circles over the 40% line: 20 of 72 (Part 1 has three; the dry-source rule is applied per part, and every part is under 40%).

| Circle | Title | Part | Lines | Drafts | % |
|---|---|---|---|---|---|
| U95 | Society + News | 4 | 57 | 49 | 86 |
| U63 | Months + Seasons | 3 | 77 | 59 | 77 |
| U92 | Describing Words | 4 | 66 | 45 | 68 |
| U66 | Signs + Notices | 3 | 43 | 29 | 67 |
| U91 | Ideas + Things | 4 | 109 | 72 | 66 |
| U68 | Announcements | 3 | 51 | 33 | 65 |
| U02 | People + Things | 1 | 43 | 25 | 58 |
| U42 | Phone Numbers | 2 | 76 | 43 | 57 |
| U53 | Around Town | 1 | 47 | 26 | 55 |
| U67 | Timetables | 3 | 88 | 48 | 55 |
| U88 | Filling In Forms | 4 | 53 | 29 | 55 |
| U48 | How Much Is It? | 2 | 67 | 34 | 51 |
| U58 | Outdoors | 2 | 111 | 57 | 51 |
| U65 | My Day | 3 | 101 | 51 | 50 |
| U44 | Numbers to 100 | 2 | 57 | 27 | 47 |
| U87 | At Work | 4 | 64 | 30 | 47 |
| U61 | What Time Is It? | 3 | 92 | 41 | 45 |
| U12 | Intro to Numbers | 1 | 49 | 21 | 43 |
| U93 | Doing + Getting | 4 | 119 | 51 | 43 |
| U55 | In Class | 2 | 134 | 56 | 42 |

## Appendix A: 81 conjugated forms hinted with the infinitive

Fix each to the person form plus the lemma, as the other 172 forms already read ("I love (kochać)").

| Word | Hint shown | Circle |
|---|---|---|
| jestem | to be (być) | U01 |
| jesteś | to be (być) | U01 |
| jest | to be (być) | U01 |
| masz | to have (mieć) | U03 |
| nazywam | to call, to name (nazywać) | U03 |
| nazywasz | to call, to name (nazywać) | U03 |
| nazywa | to call, to name (nazywać) | U03 |
| czujesz | to feel, to sense (czuć) | U03 |
| czuję | to feel | U03 |
| jem | to eat (jeść) | U04 |
| jesz | to eat (jeść) | U04 |
| je | to eat (jeść) | U04 |
| piję | to drink (pić) | U04 |
| pijesz | to drink (pić) | U04 |
| pije | to drink (pić) | U04 |
| lubię | to like (lubić) | U04 |
| lubisz | to like (lubić) | U04 |
| lubi | to like (lubić) | U04 |
| mam | to have (mieć) | U05 |
| ma | to have (mieć) | U05 |
| jesteśmy | to be (być) | U06 |
| jesteście | to be (być) | U06 |
| są | to be (być) | U06 |
| mamy | to have (mieć) | U06 |
| macie | to have (mieć) | U06 |
| mają | to have (mieć) | U06 |
| mieszkam | to live, to reside (mieszkać) | U08 |
| mieszkasz | to live, to reside (mieszkać) | U08 |
| mieszka | to live, to reside (mieszkać) | U08 |
| wiem | to know (wiedzieć) | U11 |
| wiesz | to know (wiedzieć) | U11 |
| wie | to know (wiedzieć) | U11 |
| robię | to make | U11 |
| robisz | to make | U11 |
| robi | to make | U11 |
| kosztuje | to cost | U12 |
| pracuję | to work (pracować) | U14 |
| pracuje | to work (pracować) | U14 |
| pracujesz | to work (pracować) | U14 |
| idę | to go (iść) | U15 |
| idziesz | to go | U15 |
| idzie | to go | U15 |
| idziemy | to go | U15 |
| chcę | to want (chcieć) | U15 |
| chcesz | to want (chcieć) | U15 |
| chce | to want (chcieć) | U15 |
| mogę | to be able (móc) | U15 |
| może | to be able (móc) | U15 |
| muszę | to have to, to need to, must (musieć) | U15 |
| musisz | to have to, to need to, must (musieć) | U15 |
| jadę | to go | U15 |
| rozumiem | to understand (rozumieć) | U31 |
| rozumiesz | to understand (rozumieć) | U31 |
| powtórz | to repeat (powtórzyć) | U31 |
| możesz | to be able (móc) | U31 |
| mów | to speak, to say (mówić) | U31 |
| mówisz | to speak, to say (mówić) | U31 |
| mówi | to speak, to say (mówić) | U32 |
| mówię | to speak, to say (mówić) | U32 |
| znaczy | to mean (znaczyć) | U32 |
| oznacza | to signify | U32 |
| szukam | to look for (szukać) | U33 |
| pamiętam | to remember (pamiętać) | U33 |
| pamiętasz | to remember (pamiętać) | U33 |
| boli | to hurt | U51 |
| bolą | to hurt | U51 |
| gram | to play | U52 |
| grasz | to play | U52 |
| gra | to play | U52 |
| czytam | to read (czytać) | U52 |
| czytasz | to read (czytać) | U52 |
| czyta | to read (czytać) | U52 |
| umiem | to be able to (umieć) | U52 |
| umiesz | to be able to (umieć) | U52 |
| umie | to be able to (umieć) | U52 |
| odpowiadać | to answer | U55 |
| odpowiedzieć | to answer | U69 |
| wziąć | to take | U73 |
| znaleźć | to find | U73 |
| prowadzić | to lead, to drive, to run | U73 |
| dostać | to get | U93 |

## Appendix B: 29 generated accepted answers with untaught words

Accept-only, never shown. Verdict for each: cut, or keep only once the generator filters against the circle's words.

| Answer id | Sentence | Answer | Untaught (word→circle; ? = not a course word) |
|---|---|---|---|
| GS10105-531786 | S10105 | Tom jest moim przyjacielem. | moim→? przyjacielem→U64 |
| GS13105-10566149 | S13105 | To jest zielone. | zielone→? |
| GS13108-10566149 | S13108 | To jest zielone. | zielone→? |
| GS13112-8753528 | S13112 | Jest białe. | białe→? |
| GS14114-4451410 | S14114 | Jutro będzie niedziela. | będzie→U72 |
| GS2118-551692 | S2118 | Tom jest studentem. | studentem→U65 |
| GS2121-12824929 | S2121 | To są drzwi. | są→U06 |
| GS35116-1614928 | S35116 | Nie mam pewności. | pewności→? |
| GS35117-1614928 | S35117 | Nie mam pewności. | pewności→? |
| GS36109-3430004 | S36109 | Trudno w to uwierzyć. | uwierzyć→? |
| GS53104-569901 | S53104 | Gdzie jest stacja? | stacja→U67 |
| GS56105-2365518 | S56105 | Ona jest interesującą kobietą. | interesującą→? kobietą→? |
| GS56109-550653 | S56109 | On jest dobrą osobą. | dobrą→? osobą→? |
| GS56115-905944 | S56115 | Masz czerwoną twarz. | czerwoną→? |
| GS57106-10624695 | S57106 | Autobus jest pełen. | pełen→? |
| GS6105-1844922 | S6105 | Czy ma pan psa? | pan→U87 |
| GS6107-531002 | S6107 | Czy jesteś zajęty? | zajęty→U09 |
| GS63170-3285682 | S63170 | Jaka jest dzisiejsza data? | dzisiejsza→? |
| GS65122-4558072 | S65122 | Kto jest twoim ojcem? | twoim→? ojcem→? |
| GS67102-4101582 | S67102 | Jeżdżę do pracy autobusem. | Jeżdżę→U84 |
| GS68127-8213717 | S68127 | Proszę zaczekać. | zaczekać→? |
| GS68129-3785115 | S68129 | Mogę was o coś spytać? | was→? spytać→? |
| GS72112-535161 | S72112 | Dzisiaj jest pochmurno. | pochmurno→? |
| GS73111-2120078 | S73111 | Pokaż mi. | mi→U26 |
| GS73123-3851745 | S73123 | Nie musisz mi dziękować. | mi→U26 |
| GS75107-933371 | S75107 | Interesuje się pan muzyką? | pan→U87 |
| GS75131-8721600 | S75131 | Mój stan zdrowia jest dobry. | stan→U88 zdrowia→? |
| GS88123-4328190 | S88123 | Jaki jest pana stan cywilny? | pana→? |
| GS91138-919776 | S91138 | Wiedza to potęga. | potęga→? |

## Appendix C: 23 case-form nouns with no gender

| Word | Form | Circle | Hint |
|---|---|---|---|
| W1533 | telefonu | U42 | of the phone (telefon) |
| W1591 | porządku | U35 | order (porządek); all right (w porządku) |
| W1613 | mieście | U45 | city, town (miasto; w mieście) |
| W1618 | ulicy | U45 | street (ulica; na ulicy) |
| W1624 | rodziców | U45 | parents (rodzic; u rodziców) |
| W1682 | owoce | U47 | fruit (owoc) |
| W1716 | rację | U36 | right (racja); masz rację: you are right |
| W1717 | nadzieję | U36 | hope (nadzieja); mam nadzieję: I hope |
| W1749 | pieniędzy | U48 | money (pieniądze; genitive) |
| W1753 | butelkę | U49 | bottle (butelka, object) |
| W1754 | butelki | U49 | bottles; of a bottle (butelka) |
| W1755 | wody | U49 | water (woda; genitive) |
| W1762 | chleba | U49 | bread (chleb; genitive) |
| W1764 | szklankę | U49 | glass (szklanka, object) |
| W1765 | filiżankę | U49 | cup (filiżanka, object) |
| W1781 | czasu | U49 | time (czas; genitive) |
| W1105 | kurtkę | U54 | jacket (kurtka, object) |
| W1118 | lekcji | U55 | lesson (lekcja; na lekcji) |
| W1120 | klasie | U55 | class (klasa; w klasie) |
| W1121 | szkole | U55 | school (szkoła; w szkole) |
| W1122 | szkoły | U55 | school (szkoła; do szkoły) |
| W1245 | górach | U58 | mountains (góra; w górach) |
| W1249 | drzewa | U58 | trees (drzewo) |

## Appendix D: Read and Answer texts with untaught words (10 of 39)

| Text | Circle | Untaught |
|---|---|---|
| R101 | U47 | złotych→U48 za→U48 |
| R106 | U48 | Stare→? |
| R301 | U82 | zł→? |
| R302 | U81 | zł→? zł→? zł→? zł→? |
| R305 | U83 | m→? |
| R306 | U84 | hotelem→? |
| R307 | U86 | zł→? |
| R309 | U86 | studenta→? |
| R310 | U87 | Tel→? |
| R311 | U87 | szpitalu→? |

## Appendix E: case forms introduced per circle (tree order; nominative-only forms left out)

From each word's Wiktionary inflection line; the circle is where the form is a new word. Read down the table: accusative first (U04), genitive next (U05, U12, then U41 to U49), locative (U45 on), instrumental (U64 on), dative pronouns (U26, U85).

| Circle | Part | Title | New case forms |
|---|---|---|---|
| U04 | 1 | Food + Drink | wodę (accusative), kawę (accusative), herbatę (accusative), lody (nom/acc pl) |
| U05 | 1 | Animals | psa (gen/acc), kota (gen/acc), ryby (nom/acc pl), rybę (accusative), pieniądze (nom/acc pl) |
| U06 | 1 | Plurals | psy (nom/acc pl), koty (nom/acc pl), dzieci (nominative/gen/acc/vocative), książki (nom/acc pl), jabłka (nom/acc pl) |
| U07 | 1 | Describing Things | dobre (nom/acc pl) |
| U52 | 1 | Free Time | piłkę (accusative), nożną (acc/instr), tenisa (gen/acc), książkę (accusative) |
| U10 | 1 | Mine + Yours | moje (nom/acc pl), twoje (nom/acc pl) |
| U12 | 1 | Intro to Numbers | dwie (nom/acc pl), lat (genitive) |
| U51 | 1 | Body + Looks | oczy (nom/acc pl), włosy (nom/acc pl), ręce (nom/acc pl), nogi (nom/acc pl), mnie (genitive/dative/accusative/locative), długie (nom/acc pl), krótkie (nom/acc pl) |
| U41 | 2 | Your Name, Please | cię (genitive), ciebie (genitive), go (gen/acc), ją (accusative), nas (gen/acc/locative), nikogo (gen/acc) |
| U54 | 2 | Clothes | kurtkę (accusative), buty (nom/acc pl), piękne (nom/acc pl) |
| U34 | 2 | Spelling It Out | litery (nom/acc pl), literę (accusative) |
| U42 | 2 | Phone Numbers | telefonu (genitive) |
| U43 | 2 | Age + Birthdays | wszystkiego (genitive), najlepszego (masculine/neuter genitive) |
| U55 | 2 | In Class | lekcji (genitive), klasie (dat/loc), szkole (dat/loc), szkoły (nom/acc pl), tym (dative), czym (instr/loc) |
| U35 | 2 | Checking Numbers | porządku (gen/loc) |
| U45 | 2 | Where You Live | domu (gen/loc), mieście (locative), mieszkaniu (dat/loc), Warszawie (dat/loc), wsi (nominative/gen/acc/vocative), pracy (genitive/dat/loc), ulicy (genitive/dat/loc), rodziców (gen/acc) |
| U56 | 2 | Looks + Character | dziwne (nom/acc pl) |
| U46 | 2 | Countries + Languages | Polski (genitive), Polsce (dat/loc), Anglii (genitive/dat/loc), Niemiec (genitive), Niemczech (locative), Francji (genitive/dat/loc), Japonii (genitive), świecie (loc), niemiecku (dative), francusku (dative), japońsku (dative), polskiego (genitive), angielskiego (genitive), francuskiego (genitive) |
| U47 | 2 | At the Market | rynku (gen/loc), owoce (nom/acc pl), warzywa (nom/acc pl), sklepu (genitive), sklepie (loc), tego (genitive), czego (genitive), pomocy (genitive), zakupy (nom/acc pl) |
| U57 | 2 | Opposites | otwarte (nom/acc pl), zamknięte (nom/acc pl), łatwe (nom/acc pl), trudne (nom/acc pl), brudne (nom/acc pl), ważne (nom/acc pl), samo (nom/acc pl), proste (nom/acc pl), możliwe (nom/acc pl), niemożliwe (nom/acc pl), duże (nom/acc pl), małe (nom/acc pl), nowe (nom/acc pl), różne (nom/acc pl) |
| U36 | 2 | Checking You Understood | rację (accusative), nadzieję (accusative), prostu (dative) |
| U48 | 2 | How Much Is It? | złote (nom/acc pl), złotych (genitive/locative), groszy (genitive), drogie (nom/acc pl), tanie (nom/acc pl), te (nonvirile nom/acc pl), takie (nom/acc pl), pieniędzy (genitive) |
| U49 | 2 | Bottles + Bags | butelkę (accusative), butelki (nom/acc pl), wody (nom/acc pl), kawy (nom/acc pl), herbaty (nom/acc pl), mleka (nom/acc pl), sera (genitive), cukru (genitive), soku (gen/loc), chleba (genitive), szklankę (accusative), filiżankę (accusative), jabłek (genitive), książek (genitive), jedzenia (genitive), rzeczy (nominative/gen/acc/vocative), niczego (genitive), czasu (genitive) |
| U58 | 2 | Outdoors | lesie (loc), góry (nom/acc pl), górach (locative), drzewa (nom/acc pl), kwiaty (nom/acc pl), plaży (genitive/dat/loc), ptaki (nom/acc pl) |
| U61 | 3 | What Time Is It? | której (genitive/dat/loc), trzeciej (genitive/dat/loc), czwartej (genitive/dat/loc), ósmej (genitive/dat/loc), minut (genitive), godziny (nom/acc pl), godzinę (accusative), nocy (genitive) |
| U62 | 3 | Days of the Week | sobotę (accusative), niedzielę (accusative), środę (accusative), tygodniu (loc), przyszłym (dative), zeszłym (dative), dni (nominative/gen/acc/vocative) |
| U63 | 3 | Months + Seasons | styczniu (loc), lutym (dative), marcu (loc), kwietniu (loc), maju (loc), czerwcu (loc), lipcu (loc), sierpniu (loc), wrześniu (loc), październiku (loc), listopadzie (loc), grudniu (loc), wiosnę (accusative), lecie (locative), jesieni (genitive), zimie (dat/loc), roku (gen/loc), początku (gen/loc), święta (nom/acc pl) |
| U72 | 3 | The Weather | stopni (genitive), chmury (nom/acc pl) |
| U64 | 3 | Making Plans | mną (instrumental), tobą (instrumental), nami (instrumental), kolegą (instrumental), przyjacielem (instrumental), rodziną (instrumental), plany (nom/acc pl), kina (nom/acc pl), teatru (genitive), przyszłości (genitive/dat/loc/vocative) |
| U65 | 3 | My Day | tę (accusative), kolację (accusative), zęby (nom/acc pl), kim (instr/loc), nauczycielem (instrumental), nauczycielką (instrumental), lekarzem (instrumental), studentem (instrumental), studentką (instrumental), siódmej (genitive/dat/loc), szóstej (genitive/dat/loc), dziewiątej (genitive/dat/loc), piątej (genitive/dat/loc), pracę (accusative), lekarką (instrumental), profesorem (instrumental), dyrektorem (instrumental), firmie (dat/loc), Polakiem (instrumental), Polką (instrumental) |
| U66 | 3 | Signs + Notices | palenia (genitive), czynne (nom/acc pl), nieczynne (nom/acc pl) |
| U67 | 3 | Timetables | autobusem (instrumental), pociągiem (instrumental), samochodem (instrumental), rowerem (instrumental), samolotem (instrumental), tramwajem (instrumental), bilety (nom/acc pl), stacji (genitive), przystanku (gen/loc), peronu (genitive), dworcu (loc), dziesiątej (genitive/dat/loc), jedenastej (genitive/dat/loc), dwunastej (genitive/dat/loc), drugiej (genitive/dat/loc) |
| U74 | 3 | Little Words | obie (nom/acc pl), domem (instrumental), stołem (instrumental), stole (loc), oknem (instrumental), łóżkiem (instrumental), sklepem (instrumental), nim (instr/loc), swoje (nom/acc pl), swoją (acc/instr), jakieś (nom/acc pl), własne (nom/acc pl) |
| U39 | 3 | Not Sure | sytuacji (genitive) |
| U68 | 3 | Announcements | pasażerów (gen/acc), kierunku (gen/loc), powodu (genitive) |
| U69 | 3 | Instructions | stronie (dat/loc), poprawną (acc/instr), słowa (nom/acc pl) |
| U75 | 3 | Likes + Feelings | muzyką (instrumental), sportem (instrumental), historią (instrumental), ochotę (accusative), sensu (genitive), kulturą (instrumental), sztuką (instrumental) |
| U81 | 4 | At the Café | ciasta (nom/acc pl), mlekiem (instrumental), piwa (nom/acc pl), kanapkę (accusative), kanapki (nom/acc pl), picia (nom/acc pl) |
| U91 | 4 | Ideas + Things | zasady (nom/acc pl), zmiany (nom/acc pl), formie (dat/loc), stanie (loc), szans (genitive) |
| U26 | 4 | Excuse Me | mi (dative), ci (dative), problemu (genitive), chwilę (accusative), sobie (dat/loc) |
| U82 | 4 | At the Restaurant | zupę (accusative), mięsa (nom/acc pl), kurczaka (gen/acc), ziemniaki (nom/acc pl), smaczne (nom/acc pl), pyszne (nom/acc pl), jajka (nom/acc pl), pizzę (accusative) |
| U83 | 4 | Asking the Way | rogu (gen/loc), metrów (genitive), drogę (accusative), drodze (dat/loc), środku (loc), tyłu (genitive) |
| U92 | 4 | Describing Words | wspólnego (genitive), jedynym (dative), ogromne (nom/acc pl), specjalnego (genitive) |
| U27 | 4 | I'm Lost | mapę (accusative), mapie (dat/loc) |
| U84 | 4 | Getting Around | metrem (instrumental), taksówką (instrumental) |
| U85 | 4 | My Family | mężatką (instrumental), mu (dative), nam (dative), syna (gen/acc), córkę (accusative) |
| U86 | 4 | At Home | pokoju (gen/loc), kuchni (genitive), łazience (dat/loc), piętrze (locative), schody (nom/acc pl), klucze (nom/acc pl), lodówce (dat/loc), ogrodzie (loc) |
| U87 | 4 | At Work | biurze (locative), pielęgniarką (instrumental) |
| U94 | 4 | Thinking + Saying | ogóle (loc) |
| U28 | 4 | Explaining a Problem | zepsute (nom/acc pl), kłopoty (nom/acc pl) |
| U88 | 4 | Filling In Forms | urodzenia (nom/acc pl), dokumenty (nom/acc pl) |
| U89 | 4 | Messages + Postcards | pozdrowienia (nom/acc pl), wiadomości (nominative/gen/acc/vocative), pocztówkę (accusative), zdjęcia (nom/acc pl) |

## Appendix F: UK spellings in shipped English (32)

| Sentence | Word | English |
|---|---|---|
| S10001 | mum | Where's my mum? |
| S10018 | mum | Is that your mum? |
| S27020 | favourite | I lost my favourite pen. |
| S87023 | centre | My office is in the city centre. |
| S91023 | behaviour | I don't like your behaviour. |
| S91028 | behaviour | His behaviour is sometimes weird. |
| S91029 | behaviour | Tom needs to change his behaviour. |
| S10101 | mum | That's our mum. |
| S64212 | theatre | Do you want to go to the cinema or the theatre? |
| S63111 | mum | My mum's birthday is in April. |
| S68106 | apologise | We apologise to the passengers. |
| S68110 | apologise | We apologise for the delay. |
| S68122 | towards | I am walking towards home. |
| S68123 | towards | We are walking towards the school. |
| S68124 | towards | He is walking towards home. |
| S64107 | theatre | I like the theatre. |
| S64108 | theatre | The theatre is near. |
| S64109 | theatre | Where is the theatre? |
| S64110 | theatre | Shall we go to the theatre? |
| S64113 | theatre | I am going to the theatre with my family. |
| S65123 | mum | My mum is a teacher. |
| S65125 | mum | My mum is a doctor. |
| S83112 | metres | The bank is fifty metres from here. |
| S83113 | metres | Go straight on for twenty metres. |
| S83114 | centre | I live in the centre. |
| S83115 | centre | Is the centre far? |
| S83116 | centre | I'm going to the centre. |
| S89105 | mum | This is my dear mum. |
| S91156 | programme | It's a good programme. |
| S91157 | programme | This programme is boring. |
| S91158 | programme | Which programme do you like? |
| S92140 | theatre | This is the national theatre. |

## Appendix G: Match Pairs cognates

Excluded by isCognate (hint equals the word): 20: student, problem, park, film, hotel, bank, zero, moment, kilo, złoty, grosz, weekend, plan, sport, menu, metro, e-mail, system, materiał, element.

Near-cognates on the board (one edit from an English hint word, five letters or more): 20.

| Word | Hint |
|---|---|
| kolor | color |
| muzeum | museum |
| numer | number number number edition |
| groszy | grosze (grosz) |
| sweter | sweater |
| komputer | computer |
| minuta | minute |
| marcu | March (w marcu: in March) |
| plany | plans (plan) |
| projekt | project |
| sensu | sense (to nie ma sensu: it makes no sense; sens) |
| problemu | problem (nie ma problemu; problem) |
| pizzę | pizza (pizza) |
| prezent | present, gift |
| klient | customer, client |
| dokument | document |
| charakter | character, personality |
| proces | process |
| interes | business, interest |
| milion | million |

## Appendix H: the 199 może rejections

content-pl/sweep/packs-review.json, U15 → reject, 199 Tatoeba ids, one reason each: "może as maybe; taught as can (móc)". Live może lines (27): S15011, S15012, S15026, S39014 (być może), S47032, S67024, S69003, S69007, S72005, S85022, S87024, S39101 (być może), S39102 (być może, draft), S73237, S73243, S73244, S73250, S73252, S74228, S74232, S73126, S91203, S93102, S93103, S93125, S93126, S93127; every one is can/may or the taught phrase.

