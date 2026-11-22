# Swedish Part 1 — Fable's check (2026-11-20)

Candidates: _review/swedish-candidates.md marked in place (every shipped line). Drafts: _review/swedish-drafts.md. Meanings, gender and verb forms checked against content-sv/checks/words.json and conjugations.json (Wiktionary), not memory. No swaps: every candidate is already a shipped line, so a Reject is a cut and a draft fix is a rewrite.

**Candidates:** 482 shipped lines: Use 446 (English picks 22), Reject 36. The builder's 13 REJECT lines stand.  
**Drafts:** 64 originals: Keep 61, Fix 3, Cut 0 (plus 3 rows already turned into Tatoeba rows).

## Needs Dan or Builder 1

- **var** (W127) is taught as "where", but 16 shipped lines use **var** as the past tense "was/were" (När var det?, Den var svart, Hur var din dag?). Past tense is not in Part 1 and the Glossary would show "where". All 16 are Rejects below.
- **om** (W047) hint is "if"; the word is only taught inside **tycker om** (like). Hint should read "tycker om: to like (om alone: if, about)". Lines using om as "if" or "in a week" are Rejects.
- **tycker** alone means "think" (Vad tycker Tom?); only tycker om is taught. Two Rejects.
- **till** (W162) is "to"; four lines use it as "for", "of" or "another" (Vad är den här till?, en syster till, en vän till hans bror). Rejects.
- **ni** (W068) hint is "you"; it should say "you (plural)". The 12 ni lines are all plural you, none formal, so they stand.
- Glossary hints to fix (raw Wiktionary senses): **gång** "the continuous running of something" → "a time, occasion (en gång till)"; **film** "film; a thin layer" → "a film, movie"; **station** broadcasting sense → "a station"; **klockan** "definite singular of klocka" → "the clock; o'clock (Vad är klockan?)"; **kallas** "passive infinitive of kalla" → "is called"; **män** "man (man)" → "men"; **spel** lemma is "entertainment" → "a game"; **lång** "long" → "long; tall (of a person)"; **det** lemma is set to "neuter".
- Match Pairs: **äpple** folds to "apple" and its hint is "an apple", so it is not excluded as a cognate and the pair gives itself away. Same risk for the near-cognates bok, hund, fisk, musik, hotell, buss, restaurang (allowed, but easy pairs). man, under, glad, park, hand, arm, blond, film, museum, station, bank are already excluded.
- Gender: no article/noun mismatch in any shipped line. 10 word rows have no gender (plural and definite forms: hundar, katter, böcker, bilar, män, kvinnor, äpplen, ögon, ordet, klockan), which is expected.
- 15 Tatoeba lines sit in two circles under two ids (U01/U02 lines refilled into U05 and U06, 52006/S52104). Harmless, but the learner meets the same line twice as "new".
- Formal address: none. Swedish uses du throughout; ni appears only as plural.

## U01 Saying Hello

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S1101 | Keep |  | Nej, jag är inte Tom. — reads naturally |
| S1102 | Keep |  | Ja, jag är Tom. — reads naturally |
| S1103 | Keep |  | En man och en kvinna. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 3011695 | Use | | Du är inte en pojke. |
| 3011696 | Use | | Du är inte en flicka. |
| 10687054 | Use | | Du är ett barn. |
| 1074252 | Use | | Jag är kvinna. |
| 2086326 | Use | | Jag är. |
| 2009015 | Use | | Är inte du Tom? |
| 3344400 | Use | | Jag är Tom. |
| 1959732 | Use | | Hej, Tom! |
| 10710929 | Use | | Du är inte Tom. |

## U31 Asking for Help

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S31101 | Keep |  | En gång till, tack. — reads naturally |
| S31102 | Keep |  | Säg hej! — reads naturally |
| S31103 | Keep |  | Upprepa, tack. — reads naturally |
| S31104 | Keep |  | Prata igen, tack. — reads naturally |
| S31105 | Keep |  | Du pratar. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 892565 | Use | | Prata långsammare. |
| 1990271 | Use | "I understand." | Jag förstår. (was "I see.") |
| 1990603 | Use | | Prata inte! |
| 409678 | Use | | Jag förstår inte. |
| 2210096 | Use | | Du förstår inte. |
| 3983780 | Use | | Ja, jag förstår. Tack. |

## U02 People and Things

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S2101 | Keep |  | Det är en dörr. — reads naturally |
| S2102 | Keep |  | Det är ett bord. — reads naturally |
| S2103 | Keep |  | Det är ett hus. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 3684652 | Use | | Han är en liten man. |
| 483687 | Use | | Är han läkare? |
| 1117475 | Use | | Hon är stark. |
| 10712272 | Use | | Hon är lärare. |
| 1418330 | Use | | Är han lärare? |
| 8778440 | Use | "She is not a doctor." | Hon är inte läkare. (was "She is not a physician.") |
| 891687 | Use | | Han är lärare. |
| 1991615 | Use | | Han är stark. |
| 353815 | Use | | Han är inte läkare. |
| 10687046 | Use | | Hon är ett barn. |
| 2113561 | Use | | Tom är stark. |
| 4408982 | Use | | Det är Tom. |
| 8760472 | Use | "It's me." | Det är jag. (was "It is I.") |
| 10687054 | Use | | Du är ett barn. |
| 3011695 | Use | | Du är inte en pojke. |
| 10712341 | Use | | Är du inte lärare? |
| 1108739 | Use | | Jag är lärare. |
| 1965100 | Use | | ”Är du lärare?” ”Ja!” |
| 2634727 | Use | | Jag är inte läkare. |
| 3011696 | Use | | Du är inte en flicka. |

## U03 Polite Phrases

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S3101 | Keep |  | Förlåt, Tom. — reads naturally |
| S3102 | Keep |  | Ursäkta, är du Tom? — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 10686519 | Use | | "Hur mår du?" "Jag mår bra, tack." |
| 1387537 | Use | | Jag mår bra, tack. |
| 1990458 | Use | | Mår du bra? |
| 849444 | Use | | God morgon. |
| 3807229 | Use | | God kväll! |
| 1215764 | Use | | ”Tack.” ”Varsågod.” |
| 2332806 | Use | | Hej! God morgon! |
| 1990482 | Use | | Hur mår Mary? |
| 2042055 | Use | | Hur mår du? |
| 778582 | Use | | God dag. |
| 1387686 | Use | | Hej då. |
| 5893672 | Use | | Ja, gärna. |
| 2000141 | Use | | Mår han bra? |
| 2455236 | Use | | Mår du inte bra? |
| 1583404 | Use | | Jag mår bra. |
| 1607648 | Use | | Han mår bra. |
| 9577430 | Use | "How is Tom?" | Hur mår Tom? (was "How's Tom's health?") |
| 427049 | Use | | Hej! Hur mår du? |
| 5893619 | Use | | Hur stor? |
| 890908 | Use | | Hur är han? |
| 2001542 | Use | | Hur är den? |
| 2001546 | Use | "How is it?" | Hur är det? (was "How are you?") |
| 6779957 | Use | | Tom mår inte bra. |
| 5893671 | Use | | Ja, tack. |
| 10712102 | Use | | Tack, Tom. |
| 4408957 | Use | | Det är bra. |
| 4408958 | Use | | Den är bra. |
| 8742126 | Use | | Jag är inte bra. |
| 3840623 | Use | | Du är en bra läkare. |
| 9419503 | Use | | Han är en bra man. |

## U04 Food and Drink

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S4101 | Keep |  | Jag äter bröd. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 4144566 | Use | | Tycker du om kaffe? |
| 4328274 | Use | | Tycker du om ost? |
| 4328319 | Use | | Tycker du om vin? |
| 1168719 | Use | | Dricker du kaffe? |
| 3674794 | Use | | Dricker du te? |
| 4328275 | Use | | Gillar du ost? |
| 2113509 | Use | | Jag gillar te. |
| 2146134 | Use | | Jag äter ett äpple. |
| 10687049 | Use | | Du äter ett äpple. |
| 3993099 | Use | | Dricker Tom kaffe? |
| 2146307 | Use | | Hon gillar vin. |
| 10747309 | Use | | Jag äter inte ost. |
| 2113511 | Use | | Jag tycker om te. |
| 2146298 | Use | | Hon tycker om vin. |
| 4163782 | Use | | Jag tycker om vatten. |
| 4258969 | Use | | Jag dricker vatten. |
| 10598335 | Use | | Jag dricker mjölk. |
| 10710895 | Use | | Hon dricker mjölk. |
| 10687041 | Use | | Du och jag dricker vatten. |
| 4408961 | Use | | Den är god. |
| 8742124 | Reject | | Jag är inte god.: god as morally good / tasty on a person reads oddly; 8742126 covers "I am not good" |
| 10687014 | Use | | Det är ett äpple. |
| 9419500 | Use | | Han är en god man. |
| 2003856 | Use | | Tycker du om Tom? |
| 2791489 | Use | | Tycker du om det? |
| 4328428 | Use | | Tycker Tom om det? |
| 2003855 | Use | | Gillar du Tom? |
| 4327977 | Reject | | Dricker du, Tom?: "Do you drink?" means alcohol; dricker is taught as drinking a drink |
| 5891825 | Use | | Gillar du den? |
| 5891826 | Use | | Gillar du det? |

## U05 Pets and Animals

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S5101 | Keep |  | Jag har en mus. — reads naturally |
| S5102 | Keep |  | Du har en kanin. — reads naturally |
| S5103 | Keep |  | Jag har en fågel. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 3845270 | Use | | Jag har en katt och en hund. |
| 3841205 | Use | | Han har hund. |
| 2654387 | Use | | Jag har en katt. |
| 10673271 | Use | | Är det en häst? |
| 11562970 | Reject | | Jag är en fisk.: "I'm a fish" is a nonsense line |
| 3841206 | Use | | Hon har hund. |
| 7881212 | Use | | Jag har en häst. |
| 822696 | Use | | Gillar du fisk? |
| 2328319 | Use | | Fisk, tack. |
| 964386 | Use | | Han tycker om djur. |
| 773381 | Use | | Har du barn? |
| 4097556 | Use | | Har du bil? |
| 4328435 | Use | | Har Tom den? |
| 9432439 | Use | | Har du hus? |
| 1971160 | Use | | Har du det bra? |
| 3866651 | Use | | Har du ett hus? |
| 4317079 | Use | | Hur har Tom och Mary det? |
| 483687 | Use | | Är han läkare? |
| 890908 | Use | | Hur är han? |
| 1418330 | Use | | Är han lärare? |
| 2001542 | Use | | Hur är den? |
| 2001546 | Use | "How is it?" | Hur är det? (was "How are you?") |
| 2009015 | Use | | Är inte du Tom? |
| 10712341 | Use | | Är du inte lärare? |
| 3841207 | Use | | Han har en hund. |
| 3841208 | Use | | Hon har en hund. |
| 7881213 | Use | | Jag har en hund. |
| 10691709 | Use | | Tom har en hund. |
| 4439575 | Use | | Tom har barn. |
| 10687047 | Use | | Hon har vatten. |

## U32 Asking About Words

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S32101 | Keep |  | Jag säger ett ord. — reads naturally |
| S32102 | Keep |  | Vad betyder ordet? — reads naturally |
| S32103 | Fix | Säg ordet på engelska. = Say the word in English. | Ordet på engelska. — a bare fragment ("Ordet på engelska.") teaches nothing; säg (U31) is available |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 401347 | Use | | Vad betyder det? |
| 1603370 | Use | | Vad säger han? |
| 2180636 | Use | | Pratar du svenska? |
| 4328403 | Use | | Betyder det ja? |
| 2180637 | Use | | Jag pratar svenska. |
| 2180633 | Use | | Jag pratar inte svenska. |
| 2654805 | Use | | Jag förstår vad du säger. |

## U06 More Than One

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S6101 | Keep |  | Vi har äpplen. — reads naturally |
| S6102 | Keep |  | Jag har flera böcker. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 3869687 | Reject | | Ni är inte hundar.: "You're not dogs" is odd; ni already has nine plain lines |
| 10663148 | Use | | Hundar gillar inte katter. |
| 10686361 | Use | | Hur många bilar har du? |
| 1990477 | Use | | Vi är män. |
| 5928406 | Use | | Vi är kvinnor. |
| 10687028 | Use | | De är kvinnor. |
| 4025772 | Use | | Jag har många böcker. |
| 4455624 | Use | | Han har många böcker. |
| 10687057 | Use | | Vi har ett äpple. |
| 10702359 | Use | | De har en häst. |
| 11907094 | Use | | Jag gillar hundar. |
| 3841207 | Use | | Han har en hund. |
| 3846285 | Use | | Har ni djur? |
| 4327893 | Use | | Har de det? |
| 4343930 | Use | "How are you all?" | Hur mår ni? (was "How are you guys?") |
| 5382280 | Use | | Hon har inte många böcker. |
| 3841205 | Use | | Han har hund. |
| 11572385 | Use | | Jag gillar katter. |
| 2146134 | Use | | Jag äter ett äpple. |
| 11572386 | Use | | Jag tycker om katter. |
| 10673271 | Use | | Är det en häst? |
| 1959162 | Use | | Jag tycker inte om hundar. |
| 9432441 | Use | | Har ni hus? |
| 3866652 | Use | | Har ni ett hus? |
| 4327882 | Use | | Tycker de om vin? |
| 5891846 | Use | | Tycker ni om det? |
| 10753385 | Use | | Vi äter. |
| 2174977 | Use | | De är lärare. |
| 3841167 | Use | | De har bröd. |
| 10687037 | Use | | Vi är barn. |

## U07 Describing Things

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S7101 | Keep |  | Du har en fin bil. — reads naturally |
| S7102 | Keep |  | Jag har en ny cykel. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 10660813 | Use | | Han är mycket ung. |
| 3842321 | Use | | Är du ny? |
| 415896 | Use | | Hur gammal är han? |
| 742910 | Use | | Hur gammal är du? |
| 1972809 | Use | | Jag är ung. |
| 3711671 | Use | | Tom är inte ful. |
| 11284487 | Use | | Du är inte ful. |
| 8388343 | Use | | Jag har en ny bil. |
| 4445611 | Use | | Hur gammal är du, Tom? |
| 2113507 | Use | | Tom är ung. |
| 4363788 | Use | | Hur mycket äter du? |
| 3873244 | Use | | Hur mycket gillar du Tom? |
| 1990264 | Use | | Jag också. |
| 1990461 | Use | | Han är snäll. |
| 1990575 | Use | | Hon är snäll. |
| 2114799 | Use | | Tom är rolig. |
| 1998321 | Use | | Tom är inte rolig. |
| 1998356 | Use | | Du är inte rolig. |
| 10614154 | Use | | Vi är också lärare. |
| 12347475 | Use | | Jag är också läkare. |
| 3873243 | Use | | Hur mycket tycker du om Tom? |
| 1506686 | Use | | Hon är gammal. |
| 1583500 | Use | | Jag är gammal. |
| 1998289 | Use | "That's a lot." | Det är mycket. (was "That's plenty.") |
| 10710785 | Use | | Hon är ung. |
| 11588130 | Use | | Du är gammal. |
| 10928638 | Use | | Du är inte gammal. |
| 11188786 | Reject | | Jag dricker inte mycket.: "I don't drink much" means alcohol |
| 3473786 | Use | | Jag tycker mycket om hundar. |
| 4344307 | Use | | Jag tycker också om katter. |

## U52 Free Time

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S52101 | Keep |  | Jag har ett foto. — reads naturally |
| S52102 | Keep |  | Vi har en fest. — reads naturally |
| S52103 | Keep |  | Jag spelar fotboll. — reads naturally |
| S52104 | Keep |  | Jag simmar. — now a Tatoeba row, not a draft |
| S52105 | Keep |  | Du dansar. — reads naturally |
| S52106 | Keep |  | Han sjunger. — reads naturally |
| S52107 | Fix | English: I like films. | Jag gillar film. — film means movies here; the Glossary hint says "a thin layer", so "I like film" reads wrong |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 5384579 | Use | | Tittar du? |
| 11163210 | Use | | Sjunger Tom? |
| 2000081 | Use | | Jag läser. |
| 4401179 | Use | | Tom simmar. |
| 6296285 | Use | | Vi tittar. |
| 9024226 | Use | | Jag simmar. |
| 10707627 | Use | | Han läser. |
| 10707633 | Use | | Han dansar. |
| 10710708 | Use | | Hon läser. |
| 10710710 | Use | | Hon simmar. |
| 10710720 | Use | | Hon sjunger. |
| 10954541 | Use | | Jag sjunger. |
| 11172625 | Use | | Tom gillar musik. |
| 11907093 | Use | | Vi gillar musik. |
| 822648 | Use | | Hon gillar inte fotboll. |
| 11172626 | Use | | Tom tycker om musik. |
| 3009042 | Use | | Det är inte ett spel. |
| 4328520 | Use | | Han tycker mycket om fotboll. |
| 1996282 | Use | | Hon sjunger bra. |
| 3639544 | Use | | Han sjunger bra. |
| 3950428 | Use | | Jag sjunger inte. |
| 4401178 | Use | | Hon simmar bra. |
| 10691611 | Use | | Jag simmar inte. |
| 11572425 | Use | | Jag läser böcker. |
| 2132751 | Use | | Han läser en bok. |
| 3098209 | Use | | Jag läser en bok. |
| 7881217 | Use | | Hon läser en bok. |
| 10753491 | Use | | Vi läser en bok. |
| 10767527 | Use | | Tom och Mary sjunger. |
| 11177292 | Use | | Jag gillar inte musik. |

## U08 Where Things Are

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S8101 | Keep |  | En man står där. — reads naturally |
| S8102 | Keep |  | En katt är under en bil. — reads naturally |
| S8103 | Keep |  | En katt är bredvid en hund. — reads naturally |
| S8104 | Keep |  | Det finns ett kök här. — reads naturally |
| S8105 | Keep |  | Det finns en säng där. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 3711740 | Use | "Look at this." | Titta på det här. (was "Watch this.") |
| 4367553 | Use | | Det finns en fågel här. |
| 11474588 | Use | | Är de där? |
| 1970848 | Use | | Är det där Tom? |
| 4448210 | Use | | Är du i Paris? |
| 4448211 | Use | | Är ni i Paris? |
| 3712379 | Use | | Jag är bra på spel. |
| 10710894 | Use | | Är hon här? |
| 4159684 | Use | "Hello? Are you there?" | Hallå? Är du där? (was "Hello? Are you still here?") |
| 4448212 | Use | | Är de i Paris? |
| 2027037 | Use | | Har den ett badrum? |
| 11186527 | Use | | Har hon en trädgård? |
| 11284440 | Use | | Jag har en stor trädgård. |
| 4445735 | Use | | Jag är inte bra på det. |
| 11474589 | Use | | Är du här? |
| 11474590 | Use | | Är ni här? |
| 3842318 | Use | | Är du ny här? |
| 2021556 | Use | | Hur mycket är det där? |
| 4328316 | Use | | Tycker du om de här? |
| 4344142 | Use | | Hur gammal är den här? |
| 4344143 | Use | | Hur gammal är den där? |
| 2100293 | Use | | Inte här! |
| 651211 | Use | | Jag äter här. |
| 1996705 | Use | | Jag är här. |
| 2048632 | Use | "Tom is there." | Tom är där. (was "Tom is right there.") |
| 2048634 | Use | | Tom är här. |
| 2113586 | Use | | Här är hon! |
| 3096715 | Use | | Hon är här. |
| 4408951 | Use | | Den är här. |
| 4408955 | Use | | Här är den. |

## U09 How You Feel

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 991450 | Use | | Är du trött? |
| 2279159 | Use | | Är du hungrig? |
| 5902211 | Use | | Är du törstig? |
| 4344104 | Use | | Hur varm är den? |
| 4344163 | Use | | Hur trött är du? |
| 10702401 | Use | | Är du inte törstig? |
| 409599 | Use | | Jag är hungrig. |
| 1583511 | Use | | Jag är glad. |
| 2113536 | Use | | Tom är glad. |
| 3621399 | Use | | Jag är kall. |
| 3710475 | Use | | Jag är varm. |
| 10710823 | Use | | Hon är kall. |
| 1971159 | Use | | Är du ledsen? |
| 3741005 | Use | "Are you angry?" | Är du arg? (was "Are you mad?") |
| 3829809 | Use | "Is Tom angry?" | Är Tom arg? (was "Is Tom mad?") |
| 4344162 | Use | | Hur sjuk är Tom? |
| 9152313 | Use | | Är du inte rädd? |
| 848198 | Use | | Jag är törstig. |
| 1397907 | Use | | Han är sjuk. |
| 1998323 | Use | | Tom är rädd. |
| 2113545 | Use | | Tom är arg. |
| 2113549 | Use | | Tom är ledsen. |
| 2113556 | Use | | Tom är sjuk. |
| 2113567 | Use | | Tom är trött. |
| 2114819 | Use | | Tom är hungrig. |
| 6389179 | Use | | Du är ledsen. |
| 10702258 | Use | | Jag är rädd. |
| 2014189 | Use | | Tom är inte glad. |
| 2022408 | Reject | | Tom gillar den varm.: "Tom likes it hot" is odd and ambiguous |
| 2149594 | Use | | Jag är arg. |

## U33 Finding the Word

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S33101 | Keep |  | Jag letar efter en bok. — reads naturally |
| S33102 | Keep |  | Det är en sak. — reads naturally |
| S33103 | Keep |  | Hur kallas det? — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 1996739 | Use | | Vet Tom? |
| 4328269 | Use | | Vet du hur? |
| 1996740 | Use | "Does Tom know about it?" | Vet Tom om det? (was "Does Tom know?") |
| 3848869 | Use | | Jag heter Tom. |
| 4343875 | Use | | Han heter Tom. |
| 4446132 | Use | | Jag heter också Tom. |
| 2096037 | Use | | Hur vet du det? |
| 2096038 | Use | "How do you all know that?" | Hur vet ni det? (was "How can you know that?") |
| 4327921 | Use | | Hur vet vi det? |
| 4363790 | Use | | Hur mycket vet du? |
| 3242265 | Use | | Hur vet du om det? |
| 11061822 | Use | | Vet du mycket om Tom? |
| 11852283 | Reject | | Vet de hur gammal jag är?: indirect question with subject-before-verb order (hur gammal jag är): past A1 Part 1 |
| 1605290 | Use | | Jag vet. |
| 12107157 | Use | | Han vet. |
| 2022386 | Use | | Tom vet inte. |
| 2171251 | Use | | Det vet du inte. |
| 4350420 | Use | | Jag vet det, Tom. |
| 4350429 | Use | "I know that." | Det där vet jag. (was "I know that much.") |
| 5947860 | Use | | Det vet jag om. |
| 5947861 | Use | | Jag vet om det. |
| 2098278 | Reject | | Jag vet hur gammal Tom är.: indirect question order (hur gammal Tom är): past A1 Part 1 |

## U10 Mine and Yours

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 1996378 | Use | | Hur mår din pappa? |
| 2048348 | Use | | Hur mår din mamma? |
| 4025401 | Use | | Du är min pappa. |
| 893313 | Use | | Han är min bror. |
| 1433375 | Use | | Han är hennes vän. |
| 3095399 | Use | | Jag är inte din mamma. |
| 1130753 | Use | | Min bror är lärare. |
| 3098206 | Use | | Jag läser hans bok. |
| 10753403 | Use | | Vi är hans barn. |
| 11057270 | Use | | Är hon din syster? |
| 11281996 | Use | | Gillar din vän te? |
| 11281998 | Use | | Tycker din vän om te? |
| 2291286 | Use | | Jag är din bror. |
| 4457040 | Use | | Min familj är liten. |
| 8603474 | Use | | Vi är din familj. |
| 10661030 | Use | | Det är min syster. |
| 1433463 | Use | | Min familj mår bra, tack. |
| 4441885 | Use | | Det där är min pappa. |
| 1990636 | Use | | Det är mitt. |
| 4408972 | Use | | Den är vår. |
| 5408035 | Use | | Du är mitt barn. |
| 10691723 | Use | | Tom gillar vår hund. |
| 10701075 | Use | | Vår lärare är trött. |
| 2009003 | Use | | Det där är hans bil. |
| 2654378 | Use | | Det här är mitt hus. |
| 4317335 | Use | | Är du min läkare? |
| 10161641 | Use | | Är det här din? |
| 1543842 | Use | | Han är min vän. |
| 2158353 | Use | | Han är din vän. |
| 3099435 | Use | | Du är min vän. |

## U11 Asking Questions

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S11101 | Keep |  | Jag är glad eftersom du är här. — eftersom clause with no inte, so no subordinate-order trap |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 1998350 | Reject | | När var det?: past tense var (was/were): not taught in Part 1, and var is the Glossary word for "where" |
| 1587330 | Reject | | Varför var du där?: past tense var (was/were): not taught in Part 1, and var is the Glossary word for "where" |
| 4423933 | Reject | | Varför var Tom rädd?: past tense var (was/were): not taught in Part 1, and var is the Glossary word for "where" |
| 869060 | Use | | Vem läser? |
| 409683 | Use | "What is that?" | Vad är det? (was "What is this?") |
| 773371 | Use | | Vem är du? |
| 1138547 | Use | | Vad läser du? |
| 3840620 | Reject | | Varför var inte Tom där?: past tense var (was/were): not taught in Part 1, and var is the Glossary word for "where" |
| 891548 | Use | | Vem är hon? |
| 1990287 | Use | | Vad har hon? |
| 3809595 | Use | | Vilken är min? |
| 8745879 | Use | | Vilken hund är din? |
| 1987457 | Use | | Vilken stor hund! |
| 10713281 | Use | | Varför, Tom? |
| 1131156 | Reject | | Hur var det?: past tense var (was/were): not taught in Part 1, and var is the Glossary word for "where" |
| 1965154 | Use | | Vem är han? |
| 1966405 | Use | | Var är han? |
| 1991660 | Use | | Var är du? |
| 1996310 | Use | | Var ligger Paris? |
| 2000250 | Use | | Var är jag? |
| 2001550 | Use | | Var är de? |
| 2015050 | Use | | Vad har du? |
| 2147544 | Use | | Var är hon? |
| 2227025 | Use | | Var är ni? |
| 4446570 | Reject | | Var de bra?: past tense var (was/were): not taught in Part 1, and var is the Glossary word for "where" |
| 4446713 | Reject | | Vad tycker de?: tycker alone = think; learners know only tycker om = like |
| 4446726 | Use | | Vad har vi? |
| 4446736 | Reject | | Vad tycker Tom?: tycker alone = think; learners know only tycker om = like |
| 4840352 | Use | | Och varför inte? |
| 5240206 | Use | | Vad äter du? |

## U53 Around Town

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S53101 | Keep |  | Det finns ett museum här. — reads naturally |
| S53102 | Keep |  | Det finns en kyrka där. — reads naturally |
| S53103 | Keep |  | Det finns en strand här. — reads naturally |
| S53104 | Keep |  | Det finns ett torg här. — reads naturally |
| S53105 | Keep |  | Det finns en bank här. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 11852643 | Use | | Hur nära är de? |
| 2049025 | Use | | Vilken station är det här? |
| 3843467 | Use | | Jag gillar tåg. |
| 4441892 | Use | | De är nära. |
| 3747481 | Reject | | Han ligger på sjukhus.: ligger på sjukhus is an idiom (is in hospital); learners know ligger = lies |
| 3843469 | Use | | Jag tycker om tåg. |
| 880574 | Use | | Det finns en buss här. |
| 880599 | Use | | Det finns ett hotell där. |
| 1969895 | Use | | Det är en buss här. |
| 1969929 | Use | | Det finns ett hotell här. |

## U12 Counting to Ten

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S12101 | Keep |  | Jag har sex katter. — sex is six; the English false friend is harmless on screen |
| S12102 | Keep |  | Hon har sju böcker. — reads naturally |
| S12103 | Keep |  | Vi har nio hundar. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 2178330 | Use | | Hon är fem år gammal. |
| 10710822 | Use | | Hon är fem. |
| 1129881 | Use | | Vi har två barn. |
| 1996387 | Use | | Jag har två bilar. |
| 3864124 | Use | | Jag har tre barn. |
| 10707472 | Use | | De har tre barn. |
| 2160486 | Use | | Han har två bilar. |
| 10747255 | Use | | Han har tre bilar. |
| 10949061 | Use | | Vi har fem katter. |
| 10710738 | Use | | Hon är åtta. |
| 1969055 | Use | | Hon har tio barn. |
| 10735134 | Use | | Jag har fyra barn. |
| 11301767 | Use | | Jag har fyra katter. |
| 3081367 | Use | | Jag har två katter. |
| 11164127 | Use | | Jag har fem barn. |
| 11269269 | Use | | Vi har två hundar. |
| 11277212 | Use | | Du har tre bilar. |
| 11277213 | Use | | Ni har tre bilar. |
| 10161202 | Use | | Tom är i rum tre. |

## U13 Naming Colours

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S13101 | Keep |  | Min cykel är grön. — reads naturally |
| S13102 | Keep |  | Jag har en gul bil. — reads naturally |
| S13103 | Keep |  | Blå är en färg. — fine; a native checker may prefer "Blått är en färg" |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 2113519 | Use | | Är den vit? |
| 5408038 | Use | | Är den blå? |
| 12096990 | Reject | | Är Tom svart?: "Is Tom black?" is about a person's race |
| 11061773 | Use | | Är din bil svart? |
| 3710517 | Use | | De är blå. |
| 10710890 | Reject | | Hon är vit.: "She's white" is about a person's race |
| 4343814 | Use | | Hennes bok är röd. |
| 3096665 | Use | | Jag har en röd bil. |
| 3710525 | Reject | | Den var svart.: past tense var (was) |
| 372485 | Use | | Min hund är vit. |
| 12025401 | Use | | Han har en brun häst. |
| 11657358 | Use | | Jag har en ny röd bil. |
| 3710526 | Reject | | Det var svart.: past tense var (was) |
| 3239454 | Use | | Din katt är svart. |
| 4446085 | Use | | Min häst är svart. |
| 9024148 | Use | | Min katt är svart. |
| 12105245 | Use | | Vår hund är svart. |
| 2328147 | Use | | Han har en vit katt. |
| 2781162 | Use | | Jag har en vit katt. |
| 3302566 | Use | | Vi har en vit katt. |
| 3990534 | Use | | Jag har en vit häst. |
| 4343600 | Use | | Han har en vit hund. |

## U14 Days and Times

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S14101 | Keep |  | Vi är här en timme. — acceptable; a native checker may prefer "Vi är här i en timme" |
| S14102 | Keep |  | Vad är klockan? — now a Tatoeba row, not a draft |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 1988739 | Reject | | Hur var din dag idag?: past tense var (was) |
| 11230957 | Use | | Är idag en dålig dag? |
| 7889885 | Use | | Imorgon är det måndag. |
| 10714457 | Use | | Imorgon är det lördag. |
| 4452855 | Use | | Är det måndag idag? |
| 1936173 | Reject | | Hur var din dag?: past tense var (was) |
| 11277210 | Use | | Idag är det söndag. |
| 866369 | Use | | Var är du nu? |
| 2005642 | Use | | Hur mår du nu? |
| 2022962 | Use | | Var är vi nu? |
| 1991635 | Use | | Det är måndag. |
| 4069306 | Use | | Det är lördag. |
| 4344169 | Reject | | Hur var det idag?: past tense var (was) |
| 4446657 | Use | | Vilken dag är det? |
| 6080475 | Use | | Varför är Tom här idag? |
| 4317353 | Use | | Är du rädd nu? |
| 5337070 | Use | "Where are you all now?" | Var är ni nu? (was "Where are you guys now?") |
| 4317331 | Use | | Varför är du här nu? |
| 4445609 | Use | | Hur gammal är Tom nu? |
| 4445610 | Use | | Hur gammal är du nu? |
| 6080457 | Reject | | Varför var Tom inte här idag?: past tense var (was) |
| 11230955 | Use | | Idag är en dålig dag. |
| 10161650 | Use | | Inte idag! |
| 3784437 | Use | | Jag är man nu. |
| 4347270 | Use | | Jag mår bra nu. |
| 10712328 | Use | | Jag är sjuk nu. |
| 10735142 | Use | | Tom är trött idag. |
| 11277165 | Use | | Du är lärare nu. |
| 11626374 | Use | | Vi är här nu. |
| 918719 | Use | | Nu har de tre barn. |

## U15 Going Places

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S15101 | Keep |  | Jag är från Stockholm. — reads naturally |
| S15102 | Keep |  | Jag går till en park. — reads naturally |
| S15103 | Keep |  | Jag går till en affär. — reads naturally |
| S15104 | Keep |  | Jag åker till en stad. — reads naturally |
| S15105 | Keep |  | Det finns en gata här. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 3097315 | Use | | Jag åker till Stockholm. |
| 4448218 | Use | "I'm going to Paris tomorrow." | Jag åker till Paris imorgon. (was "I leave for Paris tomorrow.") |
| 2005643 | Use | "How is it going?" | Hur går det? (was "How's it coming?") |
| 3711776 | Reject | | Går måndag bra?: går as "is OK / works"; learners know går = goes/walks |
| 2079135 | Use | "Why isn't Tom going?" | Varför åker inte Tom? (was "Why won't Tom leave?") |
| 11852228 | Use | | Hur går det, Tom? |
| 2015047 | Reject | | Vad är den här till?: till as "for"; taught as "to" |
| 2183625 | Use | | Var ligger din skola? |
| 11852648 | Use | | Jag gillar min skola. |
| 880572 | Use | | Det finns en restaurang här. |
| 11852649 | Use | | Jag tycker om min skola. |
| 11908310 | Use | | Hur går din dag? |
| 2022947 | Reject | | Vad är det här till?: till as "for"; taught as "to" |
| 3711777 | Reject | | Går det bra på måndag?: går as "is OK / works"; learners know går = goes/walks |
| 5007333 | Use | | Vi åker. |
| 5007334 | Use | | Vi går. |
| 10857072 | Use | | Jag går. |
| 2053579 | Use | "I'm going now." | Jag går nu. (was "I'm going to go now.") |
| 4320014 | Use | | Jag åker gärna. |
| 4441850 | Use | | Jag går mycket. |
| 4328558 | Reject | | Jag går om du går.: om as "if" in a conditional; learners know om only inside tycker om |
| 12220405 | Reject | | Jag har en syster till.: "en syster till" = another sister: till in a sense not taught |
| 2389834 | Reject | | Vi åker om en vecka idag.: om as "in" (time), future sense; past A1 Part 1 |
| 4170143 | Reject | | I går var en bra dag.: past tense var, and "i går" (yesterday) is not a course word |
| 9987465 | Use | | Det är inte långt till Paris. |
| 2097931 | Reject | | Det var söndag i går, inte lördag.: past tense var, and "i går" is not a course word |
| 2097932 | Reject | | I går var det söndag, inte lördag.: past tense var, and "i går" is not a course word |
| 12249343 | Reject | | Jag är en vän till hans bror.: till as "of"; taught as "to" |

## U51 Body and Looks

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S51101 | Keep |  | Jag har blå ögon. — now a Tatoeba row, not a draft |
| S51102 | Fix | Det är ett öga. = It's an eye. | Jag har ett öga. — "I have one eye" is odd |
| S51103 | Keep |  | Min hand är kall. — reads naturally |
| S51104 | Keep |  | Min fot är stor. — reads naturally |
| S51105 | Keep |  | Min näsa är röd. — reads naturally |
| S51106 | Keep |  | Min mun är liten. — reads naturally |
| S51107 | Keep |  | Jag har ett huvud. — reads naturally |
| S51108 | Keep |  | Mitt ben är långt. — reads naturally |
| S51109 | Keep |  | Min arm är lång. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| 10707705 | Use | | Är han lång? |
| 1126341 | Use | | Hur lång är du? |
| 4423910 | Use | | Tom är lång. |
| 10707720 | Use | | Han är blond. |
| 10714458 | Use | | Tom har långt hår. |
| 11572403 | Use | | Jag är lång. |
| 2900332 | Use | | Tom är inte lång. |
| 3005125 | Use | | Han är mycket lång. |
| 3301510 | Use | | Hon är mycket lång. |
