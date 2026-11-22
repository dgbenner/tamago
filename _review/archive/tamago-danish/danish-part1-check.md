# Danish Part 1 — Fable's check (2026-11-20)

Candidates: _review/danish-candidates.md marked in place (every shipped Tatoeba line). Drafts: _review/danish-drafts.md. Meanings, gender and verb forms checked against content-da/checks/words.json and conjugations.json (Wiktionary), not memory. No swaps: every candidate is already a shipped line, so a Reject is a cut.

**Candidates:** 473 shipped lines: Use 426 (English picks 15), Reject 47.  
**Drafts:** 111 originals: Keep 100, Fix 10, Cut 1.

## Needs Dan or Builder 1

- **lide** (W044) hint is "suffer". The word is only taught inside **kan lide** (like); a learner tapping it reads "suffer". Hint should be "kan lide: to like". **kan** (W043) hint is "present of kunne"; it should say "can (kan lide: to like)". Lines with kan as "know a language" (Du kan engelsk?) are Rejects.
- **de** (W064) is taught as "they"; six shipped lines use it as "those", "these" or the plural "the" (De æbler er store, De bøger er vores, De tre store mænd spiser). Rejects.
- **til** (W158) is "to"; nine U15 lines use it as "for", "of" or "at" (Det er til Tom, far til tre børn, god til, ikke til katte). Rejects. **hvor** as "how" (Hvor stor?) is a Reject too.
- Nouns taught as verbs: svømmer and danser appear as "swimmer" and "dancer" in three lines (Rejects); **kort** "short" appears as "map" in S51010 (Reject).
- Glossary hints to fix: **langsommere** "slow" → "slower"; **pæn** "nice, decent" → "pretty, nice"; **klog** "sensible" → "clever, smart"; **lang** "long" → "long; tall (of a person)"; **den** "that, the" and **det** "that" → "it; that"; **nu** is filed as a noun; **have** is "garden" (right, but an English false friend on Match Pairs).
- Match Pairs leaks: the hints for **gang** ("a time (en gang til: one more time)") and **leder** ("leder efter: to look for") contain the Danish word, so the English tile shows the answer. **film** hint "a movie, a film, motion picture" does not equal "film", so the identical pair stays on the board. False friends that will sit on Match Pairs with a different meaning: barn (child), god (good), her (here), far (father), by (town), fire (four), to (two), time (hour), sort (black), grim (ugly), man (one/you), have (garden). under, glad, park, restaurant, hånd, arm, museum, hotel, station, bus are excluded.
- Gender: no article/noun mismatch in any shipped line, but **køkken** (W094, et køkken in S8103) and **klokken** have no gender in the data, with the plurals. Add et for køkken.
- Formal address: none left. S6014 "Har De æbler?" and S6025 "Har De et hus?" are not in the built course or the candidates file; every live De is "they/those". Danish uses du throughout. "I" (plural you) does not appear.
- 19 Tatoeba lines sit twice under two ids. Five are exact duplicates inside one circle (S2101=S2005, S2103=S2016, S5101=S5006, S31101=S31002, S31102=S31003, S32101=S32003, S52104=S52002, S52106=S52005): one of each pair is a Reject below. The U01/U02 lines refilled into U05 and U06 (S5024 to S5029, S6020, S6022, S6028 to S6030) stand but are repeats.
- Names: Maria beside Mary (S2020, S12027).

## U01 Saying Hello

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S1101 | Keep |  | Hej! Jeg er en dreng. — reads naturally |
| S1102 | Keep |  | Goddag, jeg er en mand. — reads naturally |
| S1103 | Keep |  | Ja, jeg er en pige. — reads naturally |
| S1104 | Keep |  | Nej, jeg er ikke en dreng. — reads naturally |
| S1105 | Keep |  | Et barn og en mand. — reads naturally |
| S1106 | Keep |  | En pige og en dreng. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S1001 | Use | | Du er en dreng, ikke en mand. |
| S1002 | Use | | Jeg er ikke et barn. |
| S1003 | Use | | Du er ikke en pige. |
| S1004 | Use | | Jeg er et barn. |
| S1005 | Use | | Er du en dreng? |
| S1006 | Reject | | Ja, og?: "Yeah, and?" is snippy and odd on its own |
| S1007 | Use | | Jeg er en mand. |
| S1008 | Use | | Er du en pige? |
| S1009 | Use | | Jeg er en kvinde. |
| S1010 | Use | | Jeg er en dreng. |
| S1011 | Use | | Jeg er kvinde. |
| S1012 | Use | | Tom er en mand. |
| S1013 | Use | | Mary er en kvinde. |
| S1014 | Use | | Hej, Tom! |
| S1015 | Use | | Jeg er ikke Tom. |
| S1016 | Use | | Jeg er Tom. |
| S1017 | Reject | | Tom er Tom.: "Tom is Tom" is an idiom |

## U31 Asking for Help

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S31103 | Keep |  | Forstår du? — reads naturally |
| S31104 | Keep |  | Langsommere, tak. — reads naturally |
| S31105 | Keep |  | En gang til, tak. — reads naturally |
| S31106 | Keep |  | Gentag, tak. — reads naturally |
| S31107 | Keep |  | Siger du ja? — reads naturally |
| S31108 | Keep |  | Jeg siger ja. — reads naturally |
| S31109 | Keep |  | Taler du? — reads naturally |
| S31110 | Keep |  | Jeg taler ikke. — reads naturally |
| S31111 | Keep |  | Igen, tak. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S31001 | Use | | Du taler. |
| S31002 | Reject | | Jeg forstår.: duplicate of S31101 (same Danish); S31101 has the better English |
| S31003 | Use | | Jeg forstår ikke. |
| S31101 | Use | | Jeg forstår. |
| S31102 | Reject | | Jeg forstår ikke.: duplicate of S31003 (same Danish) |

## U02 People and Things

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S2102 | Keep |  | Det er et hus. — reads naturally |
| S2104 | Keep |  | Hun er lærer. — reads naturally |
| S2105 | Keep |  | En lille dør. — reads naturally |
| S2106 | Keep |  | Det er et bord. — reads naturally |
| S2107 | Keep |  | Den er lille. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S2001 | Use | | Han er en stor dreng. |
| S2002 | Use | | Er han læge? |
| S2003 | Use | | Er hun en læge? |
| S2004 | Use | | Hun er læge. |
| S2005 | Use | | Det er en bog. |
| S2006 | Use | | Den kvinde er stærk. |
| S2007 | Use | | Jeg er stor og stærk. |
| S2008 | Use | | Han er stærk. |
| S2009 | Reject | | Ja, den er.: "Ja, den er." is not natural Danish ("Ja, det er den") |
| S2010 | Reject | | Ja, det er.: "Ja, det er." is not natural Danish |
| S2011 | Use | | Du er stor. |
| S2012 | Use | | Hun er kvinde. |
| S2013 | Use | | Jeg er ikke lærer. |
| S2014 | Use | | Er han en læge? |
| S2015 | Use | | Er du læge? |
| S2016 | Use | | Han er læge. |
| S2017 | Use | | Han er ikke læge. |
| S2018 | Use | | Du er læge. |
| S2019 | Use | | Tom er stor. |
| S2020 | Use | | Maria er læge. |
| S2021 | Use | | Tom er læge. |
| S2022 | Use | | Jeg er stærk. |
| S2023 | Use | | Jeg er ikke læge. |
| S2024 | Use | | Hun er et barn. |
| S2025 | Use | | Hun er en kvinde. |
| S2026 | Use | | Du er en læge. |
| S2027 | Use | | Han er ikke en pige. |
| S2101 | Reject | | Det er en bog.: duplicate of S2005 |
| S2103 | Reject | | Han er læge.: duplicate of S2016 |

## U03 Polite Phrases

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S3103 | Fix | English: How is it going? It is going well. | Hvordan går det? Det går godt. — "I am well" is not what Det går godt says |
| S3104 | Keep |  | Det går dårligt. — reads naturally |
| S3108 | Keep |  | Tak, det er fint. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S3001 | Use | | Goddag! Hvordan går det? |
| S3002 | Use | | Hvordan går det, Tom? |
| S3003 | Use | | Hej Tom! Hvordan går det? |
| S3004 | Use | | Ikke dårligt! |
| S3005 | Use | | Godaften, Tom. |
| S3006 | Use | | Nej tak. |
| S3007 | Use | "Goodbye, Tom!" | Farvel, Tom! (was "Have a nice day, Tom.") |
| S3008 | Reject | | Du er ikke velkommen.: "You're not welcome" is hostile |
| S3009 | Use | | Jeg går. |
| S3010 | Use | | Han går. |
| S3011 | Use | | Hun går. |
| S3101 | Use | | Godmorgen! |
| S3102 | Use | | Godaften! |
| S3105 | Use | | Farvel! |
| S3106 | Use | | Undskyld! |
| S3107 | Use | | Velkommen! |

## U04 Food and Drink

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S4101 | Keep |  | Jeg spiser brød. — reads naturally |
| S4102 | Keep |  | Jeg kan lide ost. — reads naturally |
| S4103 | Keep |  | Jeg drikker te. — reads naturally |
| S4104 | Keep |  | Hun drikker vin. — reads naturally |
| S4105 | Keep |  | Kaffe er lækker. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S4001 | Use | | Drikker du vand? |
| S4002 | Use | | Jeg drikker vand. |
| S4003 | Use | | Kan du lide te? |
| S4004 | Use | | Kan du lide mælk? |
| S4005 | Use | | Jeg spiser ost. |
| S4006 | Use | | Jeg spiser et æble. |
| S4007 | Use | | Jeg kan godt lide mælk. |
| S4008 | Use | | Drikker du kaffe? |
| S4009 | Use | | Han spiser et æble. |
| S4010 | Use | | Drikker du vin? |
| S4011 | Use | | Drikker Tom kaffe? |
| S4012 | Use | | Tom drikker kaffe. |
| S4013 | Use | | Han drikker vand. |
| S4014 | Use | | Tom drikker mælk. |
| S4015 | Use | | Han drikker te. |
| S4016 | Use | | Hun spiser et æble. |
| S4017 | Use | | Kan du lide det? |
| S4018 | Use | | Kan du lide Tom? |
| S4019 | Reject | | Drikker Tom?: "Does Tom drink?" means alcohol |
| S4020 | Use | | Jeg drikker kaffe. |
| S4021 | Use | | Jeg drikker ikke kaffe. |
| S4022 | Use | | Hun drikker ikke kaffe. |
| S4023 | Use | | Tom spiser ikke et æble. |
| S4024 | Use | | Hun spiser. |
| S4025 | Use | | Han spiser. |
| S4026 | Use | | Jeg spiser. |
| S4027 | Use | | Tom spiser. |
| S4028 | Reject | | Tom drikker.: "Tom drinks" means alcohol |
| S4029 | Use | | Jeg spiser ikke. |
| S4030 | Use | | Jeg kan ikke. |

## U05 Pets and Animals

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S5102 | Keep |  | Jeg har en fugl. — reads naturally |
| S5103 | Keep |  | Jeg har en fisk. — reads naturally |
| S5104 | Keep |  | Jeg har en mus. — reads naturally |
| S5105 | Keep |  | Jeg har en kanin. — reads naturally |
| S5106 | Keep |  | En hund er et dyr. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S5001 | Use | | Jeg har en kat og en hund. |
| S5002 | Use | | Jeg har en hund og en kat. |
| S5003 | Use | "Do you have a dog?" | Har du en hund? (was "Have you a dog?") |
| S5004 | Use | | Er det en kat? |
| S5005 | Use | | Er det en fugl? |
| S5006 | Use | | Jeg har en hest. |
| S5007 | Use | | Det er en fugl. |
| S5008 | Use | | Drikker fisk vand? |
| S5009 | Use | | Kan du ikke lide fisk? |
| S5010 | Use | | Har han en hund? |
| S5011 | Use | | Du har en hund, har du ikke? |
| S5012 | Use | | Har du vin? |
| S5013 | Use | | Hvordan har du det? |
| S5014 | Use | | Har hun det godt? |
| S5015 | Use | | Har du en bog? |
| S5016 | Use | | Har du et hus? |
| S5017 | Use | "Are you feeling bad?" | Har du det dårligt? (was "Do you feel sick?") |
| S5018 | Use | | Hvordan har Mary det? |
| S5019 | Use | | Har Tom det dårligt? |
| S5020 | Use | | Har du det godt? |
| S5021 | Use | "Aren't you feeling well?" | Har du det ikke godt? (was "Do you feel sick?") |
| S5022 | Use | | Hvordan har du det, Tom? |
| S5023 | Use | | Og du, hvordan har du det? |
| S5024 | Use | | Er du læge? |
| S5025 | Use | | Er han læge? |
| S5026 | Use | | Er hun en læge? |
| S5027 | Use | | Er han en læge? |
| S5028 | Use | | Er du en dreng? |
| S5029 | Use | | Er du en pige? |
| S5030 | Use | | Jeg har en hund. |
| S5101 | Reject | | Jeg har en hest.: duplicate of S5006 |

## U32 Asking About Words

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S32102 | Fix | Hvad betyder det ord? = What does that word mean? | Hvad betyder et ord? — "What does a word mean?" is odd |
| S32103 | Keep |  | Hvordan siger man det? — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S32001 | Use | | Taler hun engelsk? |
| S32002 | Use | | Taler du engelsk? |
| S32003 | Reject | | Hvad betyder det?: duplicate of S32101 (same Danish); S32101 has the better English |
| S32004 | Use | | Taler han engelsk? |
| S32005 | Use | "How do you say ...?" | Hvordan siger man ...? (was "How do you say...?") |
| S32006 | Use | | Jeg taler dansk. |
| S32007 | Reject | | Nej betyder nej.: "No means no" carries a loaded meaning |
| S32008 | Use | | Han taler dansk. |
| S32009 | Use | | Jeg taler ikke dansk. |
| S32010 | Use | | Han siger ikke et ord. |
| S32011 | Use | | Jeg forstår ikke et ord. |
| S32012 | Reject | | Du kan engelsk?: kan as "know (a language)"; learners know kan only inside kan lide |
| S32013 | Use | | Undskyld, taler du engelsk? |
| S32014 | Use | | Han taler engelsk. |
| S32015 | Use | | Jeg taler engelsk. |
| S32016 | Use | | Han taler godt engelsk. |
| S32017 | Reject | | Jeg kan ikke engelsk.: kan as "know (a language)"; learners know kan only inside kan lide |
| S32018 | Use | | Jeg taler ikke engelsk. |
| S32101 | Use | | Hvad betyder det? |

## U06 More Than One

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S6101 | Keep |  | Jeg har mange bøger. — reads naturally |
| S6102 | Keep |  | Vi har mange huse. — reads naturally |
| S6103 | Keep |  | De er mænd. — reads naturally |
| S6104 | Keep |  | Mange store æbler. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S6001 | Reject | | De æbler er store.: de as "those" (demonstrative); taught as "they" |
| S6002 | Use | | Er de store? |
| S6003 | Use | | Vi er mænd. |
| S6004 | Use | | Hun har mange hunde. |
| S6005 | Use | | De har mange venner. |
| S6006 | Use | | Katte kan ikke lide hunde. |
| S6007 | Use | | Katte og hunde er dyr. |
| S6008 | Use | | Vi er venner. |
| S6009 | Use | | Vi spiser æbler. |
| S6010 | Use | | Jeg har mange venner. |
| S6011 | Use | | Hunde kan ikke lide katte. |
| S6012 | Use | | Jeg har en stor hund. |
| S6013 | Use | | Tom har en stor hund. |
| S6015 | Use | "Does he have children?" | Har han børn? (was "Has he any children?") |
| S6016 | Use | | Har hun børn? |
| S6017 | Use | | Har du børn? |
| S6018 | Use | | De er kvinder. |
| S6019 | Use | | Vi er kvinder. |
| S6020 | Use | | Jeg er en mand. |
| S6021 | Reject | | Mary kan godt lide kvinder.: "Mary likes women" reads as a line about attraction |
| S6022 | Use | | Tom er en mand. |
| S6023 | Use | | Har du æbler? |
| S6024 | Use | | Kan du lide æbler? |
| S6026 | Use | | Kan Tom lide hunde? |
| S6027 | Use | | Kan du ikke lide æbler? |
| S6028 | Use | "Do you have a dog?" | Har du en hund? (was "Have you a dog?") |
| S6029 | Use | | Har han en hund? |
| S6030 | Use | | Du har en hund, har du ikke? |

## U07 Describing Things

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S7101 | Fix | Det er en ny bil. = It is a new car. | En bil er ny. — "A car is new" is an unnatural generic |
| S7102 | Fix | Det er en gammel cykel. = It is an old bike. | En cykel er gammel. — "A bike is old" is an unnatural generic |
| S7103 | Keep |  | Hun er ung. — reads naturally |
| S7104 | Fix | Det er en grim bil. = It is an ugly car. | En bil er grim. — "A car is ugly" is an unnatural generic |
| S7105 | Fix | Det er en sjov bog. = It is a fun book. | En bog er sjov. — "A book is fun" is an unnatural generic |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S7001 | Use | | Han er meget smuk. |
| S7002 | Use | | Hun er meget smuk. |
| S7003 | Use | | Tom er meget gammel. |
| S7004 | Use | | Tom har en ny bil. |
| S7005 | Use | | Tom har en smuk bil. |
| S7006 | Use | | Den bog er meget gammel. |
| S7007 | Use | | Den er ny. |
| S7008 | Use | | Du er ikke ung. |
| S7009 | Use | | "Er hun ung?" "Ja, det er hun." |
| S7010 | Use | | Hun er gammel. |
| S7011 | Use | | Har du bil? |
| S7012 | Use | | Er jeg sjov? |
| S7013 | Use | | Er han en god lærer? |
| S7014 | Use | | Er Tom en god lærer? |
| S7015 | Use | | Har du ikke en cykel? |
| S7016 | Reject | | Er du også en mus?: "Are you a mouse as well?" is nonsense |
| S7017 | Reject | | Også jeg er lærer.: "Også jeg er lærer" is marked word order; S7018 has the plain one |
| S7018 | Use | | Jeg er også lærer. |
| S7019 | Use | | Jeg er ikke god. |
| S7020 | Use | | Du er en sjov pige. |
| S7021 | Use | | Jeg har ikke en cykel. |
| S7022 | Use | | Er hun smuk? |
| S7023 | Use | | Har Tom bil? |
| S7024 | Reject | | Drikker du meget?: "Are you a heavy drinker?" is about alcohol |
| S7025 | Use | | Har du en bil? |
| S7026 | Use | | Drikker du meget kaffe? |
| S7027 | Use | | Er hun en smuk pige? |
| S7028 | Use | | Mary er meget smuk. |
| S7029 | Use | | Du er meget smuk. |
| S7030 | Use | | Du er smuk. |

## U52 Free Time

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S52101 | Keep |  | Jeg kan lide musik. — reads naturally |
| S52102 | Keep |  | Det er et billede. — reads naturally |
| S52103 | Keep |  | Jeg kan lide fodbold. — reads naturally |
| S52105 | Keep |  | Det er et spil. — reads naturally |
| S52107 | Keep |  | Hun synger og danser. — reads naturally |
| S52108 | Keep |  | Det er en fest. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S52001 | Use | | Ser Tom fodbold? |
| S52002 | Use | | Jeg kan spille fodbold. |
| S52003 | Use | | Vi ser en ny film. |
| S52004 | Use | | Kan du lide film? |
| S52005 | Use | | Jeg synger. |
| S52006 | Use | | Jeg danser. |
| S52007 | Use | | Tom danser. |
| S52008 | Use | | De danser. |
| S52009 | Use | | Tom svømmer. |
| S52010 | Use | | Tom synger godt. |
| S52011 | Use | | Han svømmer godt. |
| S52012 | Use | | Jeg ser en bog. |
| S52013 | Reject | | Hun er en god svømmer.: svømmer as the noun "swimmer"; taught as the verb |
| S52014 | Use | | Du kan ikke lide musik. |
| S52015 | Use | | Det er en sjov film. |
| S52016 | Reject | | Jeg er danser.: danser as the noun "dancer"; taught as the verb |
| S52017 | Use | | Jeg danser ikke. |
| S52018 | Use | | Tom og Mary danser. |
| S52019 | Reject | | Du er en god danser.: danser as the noun "dancer"; taught as the verb |
| S52104 | Reject | | Jeg kan spille fodbold.: duplicate of S52002 |
| S52106 | Reject | | Jeg synger.: duplicate of S52005 |

## U08 Where Things Are

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S8101 | Keep |  | En bog ligger på et bord. — reads naturally |
| S8102 | Keep |  | En kat er under et bord. — reads naturally |
| S8103 | Keep |  | Det er et køkken. — et køkken is right, but the word has no gender in the data (see above) |
| S8104 | Keep |  | Det er et badeværelse. — reads naturally |
| S8105 | Keep |  | Det er en have. — reads naturally |
| S8106 | Keep |  | Det er et værelse. — reads naturally |
| S8107 | Keep |  | En kat ligger på en seng. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S8002 | Reject | | Der er meget på spil.: idiom (a lot at stake); spil in a sense not taught |
| S8003 | Use | | Jeg går i seng! |
| S8004 | Use | | Tom er i seng. |
| S8005 | Use | | Er der vand? |
| S8006 | Use | | Er Tom her? |
| S8007 | Use | | Er du ny her? |
| S8008 | Use | | Er Tom der også? |
| S8009 | Use | | Tom står. |
| S8010 | Use | | Vi står. |
| S8011 | Use | | Jeg står. |
| S8017 | Use | | Er Tom lærer her? |
| S8020 | Use | | Er det der mælk? |
| S8021 | Use | | Du er ny her, ikke? |
| S8022 | Use | | Er det der en fugl? |
| S8023 | Use | | Er det her en fugl? |
| S8024 | Use | | Ikke her! |
| S8025 | Reject | | I bil!: "I bil!" is a fragment with i as "by" |
| S8026 | Use | | Den er der. |
| S8027 | Use | | Jeg er her. |
| S8029 | Use | | Tom er her. |
| S8030 | Use | | Her er jeg. |

## U09 How You Feel

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S9101 | Keep |  | Jeg er glad. — reads naturally |
| S9102 | Keep |  | Han er trist. — reads naturally |
| S9103 | Keep |  | Kaffe er varm. — acceptable generic; a native checker may prefer "Kaffen er varm" |
| S9104 | Keep |  | Te er kold. — acceptable generic; a native checker may prefer "Teen er kold" |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S9001 | Use | | Er du tørstig? |
| S9002 | Use | | Er du træt? |
| S9003 | Use | | Er du sulten? |
| S9004 | Use | | Er du også sulten? |
| S9005 | Use | | Er du ikke tørstig? |
| S9006 | Use | | Jeg er træt. |
| S9007 | Use | | Jeg er glad! |
| S9008 | Use | | Jeg kan ikke lide kold kaffe. |
| S9009 | Use | | Jeg er tørstig. |
| S9010 | Use | | Jeg er sulten. |
| S9011 | Use | | Er du syg? |
| S9012 | Use | | Er du ikke bange? |
| S9013 | Use | | Han er syg. |
| S9014 | Use | | Jeg er syg. |
| S9015 | Use | | Jeg er trist. |
| S9016 | Use | | Han er bange. |
| S9017 | Use | | Jeg er vred. |
| S9018 | Use | | Tom er bange. |
| S9019 | Use | | Jeg er meget træt. |
| S9020 | Use | | Ja, hun er vred. |
| S9021 | Use | | Jeg er ikke vred. |
| S9022 | Use | | Tom er syg. |
| S9023 | Reject | | Du er syg!: "Du er syg!" with the exclamation reads as an insult |
| S9024 | Use | | Du er bange. |
| S9025 | Use | | Vi er bange. |
| S9026 | Use | | De er bange. |
| S9027 | Use | | Jeg er bange. |
| S9028 | Use | | Du er tørstig. |
| S9029 | Use | | Jeg er meget sulten. |
| S9030 | Use | | Jeg er ikke bange. |

## U33 Finding the Word

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S33101 | Keep |  | Jeg leder efter en bog. — reads naturally |
| S33102 | Keep |  | Jeg leder efter et ord. — reads naturally |
| S33103 | Keep |  | Det er en ting. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S33001 | Use | | Ved du ikke det? |
| S33002 | Reject | | Er det ikke Tom han hedder?: cleft "Er det ikke Tom han hedder?" is word order past A1 Part 1 |
| S33003 | Use | "I don't know." | Jeg ved ikke. (was "Dunno.") |
| S33004 | Use | "I know how." | Jeg ved hvordan. (was "I know a way.") |
| S33005 | Use | | Jeg hedder Tom. |
| S33006 | Use | | Jeg hedder også Tom. |
| S33007 | Use | | Det ved jeg. |
| S33008 | Use | | Han ved det. |
| S33009 | Reject | | Det ved kvinder.: "Women know that" is an odd line |
| S33010 | Use | "I don't know that." | Det ved jeg ikke. (was "Don't know.") |
| S33011 | Use | | Jeg ved det ikke. |
| S33012 | Use | | Han ved det ikke. |
| S33013 | Use | | Ja, jeg ved det. |

## U10 Mine and Yours

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S10101 | Keep |  | Det er dit hus. — reads naturally |
| S10102 | Keep |  | Hun er min veninde. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S10001 | Use | | Tom er din ven, ikke min. |
| S10002 | Use | | Er hans far læge? |
| S10003 | Use | | Er hendes far læge? |
| S10004 | Use | | Er du hans mor? |
| S10005 | Use | | Er du min mor? |
| S10006 | Use | | Er din far læge? |
| S10007 | Use | | Det er min, ikke hendes. |
| S10008 | Use | | Er han din ven? |
| S10009 | Use | | Det er mit, ikke hans. |
| S10010 | Use | | Det er mit, ikke hendes. |
| S10011 | Use | | Hvordan har din ven det? |
| S10012 | Use | | Hvordan har din mor det? |
| S10013 | Use | | Det er min bror. |
| S10014 | Use | | Vi er din familie. |
| S10015 | Use | | Det er min søster. |
| S10016 | Use | | Hans familie er meget stor. |
| S10017 | Use | | Hendes familie er meget stor. |
| S10018 | Use | | Det her er min bror. |
| S10019 | Use | | Det her er min søster. |
| S10020 | Use | | Hun er ikke min søster. |
| S10021 | Use | | Det er vores. |
| S10022 | Use | | Det er mit. |
| S10023 | Reject | | De bøger er vores.: de as "those"; taught as "they" |
| S10024 | Use | | Jeg har en bror. |
| S10025 | Use | | Jeg ser dit bord. |
| S10026 | Reject | | De her er vores bøger.: "de her" as "these"; de taught as "they" |
| S10027 | Use | | Er hans far lærer? |
| S10028 | Use | | Er det din? |
| S10029 | Use | | Er det din bil? |
| S10030 | Use | | Ser du min bog? |

## U11 Asking Questions

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S11101 | Keep |  | Hvilken bog? — reads naturally |
| S11102 | Keep |  | Jeg er glad, fordi jeg er her. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S11001 | Reject | | Hvor stor?: hvor as "how" (Hvor stor?); taught as "where" |
| S11002 | Use | | Hvem er han? |
| S11003 | Use | | Hvad er det? |
| S11004 | Use | | Hvem står der? |
| S11005 | Use | | Hvor er du? |
| S11007 | Use | | Hvorfor danser du? |
| S11008 | Use | | Hvorfor er du her? |
| S11009 | Use | | Hvornår drikker du kaffe? |
| S11010 | Use | "When are we there?" | Hvornår er vi der? (was "When will we get there?") |
| S11011 | Use | | Det er fordi du er en pige. |
| S11012 | Use | | Hvem er du? |
| S11013 | Use | | Hvor svømmer du? |
| S11014 | Use | | Hvad har Tom? |
| S11015 | Use | | Hvilken hund er din? |
| S11016 | Use | | Hvorfor er han her? |
| S11017 | Use | "When do you go to bed?" | Hvornår går du i seng? (was "At what time do you go to bed?") |
| S11018 | Use | | Hvor er Paris? |
| S11019 | Use | | Hvor er han? |
| S11020 | Use | | Hvem er Tom? |
| S11021 | Use | | Hvor er Tom? |
| S11023 | Use | | Hvad drikker de? |
| S11024 | Use | | Hvor ligger Paris? |
| S11025 | Use | | Hvor svømmer de? |
| S11027 | Use | | Hvor er de? |
| S11028 | Use | | Hvem er træt? |
| S11029 | Use | | Hvem er jeg? |
| S11030 | Use | | Hvem er hun? |

## U53 Around Town

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S53101 | Keep |  | Det er et museum. — reads naturally |
| S53102 | Keep |  | Det er et hotel. — reads naturally |
| S53103 | Keep |  | Det er en bus. — reads naturally |
| S53104 | Keep |  | Det er et tog. — reads naturally |
| S53105 | Keep |  | Det er en taxa. — reads naturally |
| S53106 | Keep |  | Det er en station. — reads naturally |
| S53107 | Keep |  | Det er en strand. — reads naturally |
| S53108 | Keep |  | Det er et sygehus. — reads naturally |
| S53109 | Keep |  | Det er et torv. — reads naturally |
| S53110 | Cut |  | En station er nær. — "En station er nær" is an unnatural generic; S53111 already teaches nær |
| S53111 | Keep |  | Er det nær? Nej, det er langt. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S53001 | Use | | Hvor er dit hotel? |
| S53002 | Use | | Der er vores bus. |
| S53003 | Use | | Det er en kirke. |
| S53004 | Use | | Jeg ser en kirke. |
| S53005 | Use | "Tom doesn't go to church." | Tom går ikke i kirke. (was "Tom isn't a church-going man.") |

## U12 Counting to Ten

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S12101 | Keep |  | Jeg har fem hunde. — reads naturally |
| S12102 | Keep |  | Der er seks katte. — reads naturally |
| S12103 | Keep |  | Jeg har syv bøger. — reads naturally |
| S12104 | Keep |  | Der er otte børn. — reads naturally |
| S12105 | Keep |  | Jeg har ni æbler. — reads naturally |
| S12106 | Keep |  | Der er ti venner. — reads naturally |
| S12107 | Keep |  | Jeg er ti år. — "Jeg er ti år" is how Danes say it |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S12001 | Use | | To og to er fire. |
| S12002 | Use | | Tom har tre hunde og syv katte. |
| S12003 | Use | | Hans bil er to år gammel. |
| S12004 | Use | | Jeg har tre hunde. |
| S12005 | Use | | Du har fire hunde. |
| S12006 | Use | | Jeg har fem katte. |
| S12007 | Use | | Vi er en familie på fem. |
| S12009 | Use | | Tom har tre katte. |
| S12011 | Use | | Hun er otte. |
| S12012 | Use | | Han har ti børn. |
| S12013 | Use | | Hun har ti børn. |
| S12014 | Use | | Han har en hund og seks katte. |
| S12015 | Use | | Hun har en hund og seks katte. |
| S12016 | Use | | Hvor er de to? |
| S12017 | Use | | To kvinder synger. |
| S12018 | Use | | Jeg har to bøger. |
| S12019 | Use | | Han har to hunde. |
| S12020 | Use | | Vi har to børn. |
| S12021 | Use | | Hun har to børn. |
| S12022 | Use | | Jeg har to katte. |
| S12023 | Use | | Tom har tre hunde. |
| S12024 | Use | | Jeg har to børn. |
| S12025 | Use | | Jeg har fire katte. |
| S12026 | Use | | Mary har tre børn. |
| S12027 | Use | | Maria har tre børn. |
| S12028 | Use | | Jeg har ikke to katte. |
| S12029 | Reject | | De tre store mænd spiser.: de as the plural definite article "the"; taught as "they" |
| S12030 | Use | | Jeg har en hund og to katte. |

## U13 Naming Colours

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S13101 | Fix | Det er en rød bil. = It is a red car. | En bil er rød. — "A car is red" is an unnatural generic |
| S13102 | Fix | Det er en grøn cykel. = It is a green bike. | En cykel er grøn. — "A bike is green" is an unnatural generic |
| S13103 | Fix | Det er en gul bus. = It is a yellow bus. | En bus er gul. — "A bus is yellow" is an unnatural generic |
| S13104 | Fix | Det er en brun hund. = It is a brown dog. | En hund er brun. — "A dog is brown" is an unnatural generic |
| S13105 | Keep |  | Hvilken farve? — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S13001 | Use | | Er den blå? |
| S13002 | Use | | Er den hvid? |
| S13003 | Use | | Er den rød? |
| S13004 | Use | | Er din hest sort? |
| S13005 | Use | | Hans cykel er blå. |
| S13006 | Use | | Din kat er sort. |
| S13007 | Use | | Min hund er hvid. |
| S13008 | Use | | Tom har også en rød bil. |
| S13009 | Use | | Hendes cykel er blå. |
| S13010 | Use | | Min kat er sort. |
| S13011 | Use | | Drikker du grøn te? |
| S13012 | Use | | Hvilken farve har dit hus? |
| S13013 | Use | | Hun har en hvid kat. |
| S13014 | Use | | Jeg har en brun hest. |
| S13015 | Use | | Jeg kan ikke lide grøn te. |
| S13016 | Use | | Han har en hvid kat. |
| S13017 | Use | | Tom har en sort hund. |
| S13018 | Use | | Han har en blå bil. |
| S13019 | Use | | Hun har en lille sort hund. |
| S13020 | Use | | Jeg har en stor, sort hund. |

## U14 Days and Times

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S14101 | Keep |  | I dag er en god dag. — reads naturally |
| S14102 | Keep |  | Det er en uge. — reads naturally |
| S14103 | Keep |  | Det er en time. — reads naturally |
| S14104 | Keep |  | I dag er det søndag. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S14001 | Use | | Hvad dag er det i dag? |
| S14002 | Use | | I dag er en ny dag! |
| S14003 | Use | | Er det lørdag i morgen? |
| S14004 | Use | | I morgen er det søndag. |
| S14005 | Use | | I dag er det mandag. |
| S14006 | Use | | I morgen er det mandag. |
| S14007 | Use | | I dag er det lørdag. |
| S14008 | Use | | Det er mandag i morgen. |
| S14009 | Use | | Og hvad nu? |
| S14010 | Use | | Hvor er Tom nu? |
| S14011 | Use | | Hvad er der nu? |
| S14012 | Use | | Det er lørdag. |
| S14013 | Use | | Hvordan har du det i dag? |
| S14014 | Use | | I dag danser vi. |
| S14015 | Use | | Hvor er du nu? |
| S14016 | Use | | Hvor er vi nu? |
| S14018 | Use | | Er du glad nu? |
| S14019 | Use | | Er du bange nu? |
| S14020 | Use | | Hvor er jeg nu? |
| S14021 | Use | | Hvor er din far nu? |
| S14022 | Use | | Det er mandag. |
| S14023 | Use | | Jeg går nu. |
| S14024 | Use | | Jeg er glad i dag. |
| S14025 | Use | | Jeg er syg nu. |
| S14026 | Use | | De har nu tre børn. |
| S14027 | Use | | Tom er ikke her i dag. |
| S14028 | Use | | Jeg er en mand nu. |
| S14029 | Use | | Han går i seng nu. |
| S14030 | Use | | Jeg har det ikke godt i dag. |
| S14105 | Use | | Hvad er klokken? |

## U15 Going Places

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S15101 | Keep |  | Jeg går til en park. — reads naturally |
| S15102 | Keep |  | Jeg går til en butik. — reads naturally |
| S15103 | Keep |  | Jeg går til en restaurant. — reads naturally |
| S15104 | Keep |  | Det er en stor by. — reads naturally |
| S15105 | Keep |  | Det er en gade. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S15001 | Use | | Han går til skole. |
| S15002 | Use | | Hvor er din skole? |
| S15003 | Use | | Hvilken by er vi i? |
| S15004 | Use | | Hvor ligger din skole? |
| S15005 | Reject | | Hvad er det til?: til as "for"; taught as "to" |
| S15006 | Reject | | Hvad er Tom god til?: "god til" = good at; til in a sense not taught |
| S15007 | Reject | | Her er butik.: "Her er butik." is not natural Danish and the English is odd |
| S15008 | Use | | Er Tom i skole? |
| S15009 | Use | "Where does Tom go to school?" | Hvor går Tom i skole? (was "Where does Tom attend school?") |
| S15010 | Use | | Hvorfor er du ikke i skole? |
| S15011 | Use | | Jeg går i skole. |
| S15012 | Use | | Det er en skole. |
| S15013 | Use | | Tom er ikke i skole. |
| S15014 | Reject | | Er du bror til Mary?: "bror til" = brother of; til in a sense not taught |
| S15015 | Reject | | Det er til Tom.: til as "for"; taught as "to" |
| S15016 | Reject | | Den er til Tom.: til as "for"; taught as "to" |
| S15017 | Reject | | Den er til min familie.: til as "for"; taught as "to" |
| S15018 | Reject | | Tom er ikke til katte.: idiom (not a cat person); til in a sense not taught |
| S15019 | Use | | Der er ikke langt til Paris. |
| S15020 | Reject | | Tom er far til tre børn.: "far til" = father of; til in a sense not taught |
| S15021 | Use | | Jeg går ikke i skole i dag. |
| S15022 | Reject | | Jeg er ikke far til Tom.: "far til" = father of; til in a sense not taught |

## U51 Body and Looks

**Drafts**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S51101 | Keep |  | Jeg har en næse. — reads naturally |
| S51102 | Keep |  | Jeg har en mund. — reads naturally |
| S51103 | Keep |  | Hun har to øjne. — reads naturally |
| S51104 | Keep |  | Jeg har en hånd. — reads naturally |
| S51105 | Keep |  | Jeg har en fod. — reads naturally |
| S51106 | Keep |  | Det er et hoved. — reads naturally |
| S51107 | Keep |  | Det er et ben. — reads naturally |
| S51108 | Keep |  | Jeg har en arm. — reads naturally |
| S51109 | Keep |  | Hun er pæn. — pæn = pretty here; the hint says "nice, decent" (see above) |
| S51110 | Keep |  | Han er lang. — lang = tall here; the hint says "long" (see above) |
| S51111 | Keep |  | Det er et øje. — reads naturally |

**Candidates (shipped Tatoeba lines)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S51001 | Use | | Han har en lang næse. |
| S51002 | Use | | Hun er meget klog, er hun ikke? |
| S51003 | Use | | Tom er kort. |
| S51004 | Use | "Tom is clever." | Tom er klog. (was "Tom has brains.") |
| S51005 | Use | | Hun har blå øjne. |
| S51006 | Use | | Han har blå øjne. |
| S51007 | Use | | Hendes øjne er blå. |
| S51008 | Use | | Tom er meget kort. |
| S51009 | Use | | Du er meget klog. |
| S51010 | Reject | | Vi har et kort.: kort as the noun "map"; taught as the adjective "short" |
| S51011 | Reject | | Den kvinde har en mund.: "That woman has a mouth" is an odd line |
| S51012 | Use | | En hund har fire ben. |
| S51013 | Use | | Jeg har en bog i min hånd. |
| S51014 | Use | | Jeg har blå øjne. |
| S51015 | Use | | Tom har blå øjne. |
| S51016 | Use | | Hans øjne er blå. |
| S51017 | Use | | Den dreng er meget klog. |
| S51018 | Use | | Han er en klog dreng. |
| S51019 | Use | | Den lille dreng er klog. |
| S51020 | Use | | Mary er en klog pige. |
| S51021 | Use | | Hun har store blå øjne. |
