# Norwegian Part 1 — Fable's check (2026-11-20)

**No candidates or drafts file exists in this worktree** (_review/ has only norwegian-framework-needs.md), so nothing is marked in place. This check reads the shipped content instead: every live line in content-no/raw/sentences.json that src/content-no/sentences.json carries, Tatoeba rows as "candidates" and tamago_original rows as "drafts". Meanings, gender and verb forms checked against content-no/checks/words.json and conjugations.json (Wiktionary), not memory; three noun entries were read on Wiktionary itself today (vann, rom, arm).

**Tatoeba lines:** 117: Use 110 (English picks 6), Reject 7.  
**Drafts:** 133 originals: Keep 131, Fix 2, Cut 0.

## Needs Dan or Builder 1

- **Review files missing.** Builder 2 wrote no norwegian-candidates.md or norwegian-drafts.md. The counts above are from the tables.
- **Wrong Wiktionary entries (the hint a learner sees):** **drikker** (W046) is filed under the noun drikk, hint "a drink (drikk)" → should be the verb drikke, "drinks"; **leser** (W1024) is the noun "a reader" → the verb lese, "reads"; **i** (W090) is "the letter I" → the preposition "in"; **vår** (W115) is "spring" → "our"; **arm** (W1009) is the adjective "poor" with no gender → the noun "an arm", en (Wiktionary: arm m, armen); **rom** (W099) is "rum", gender en → the room sense, "a room", et (Wiktionary: rom n, rommet); **et** (W010) is the numeral "one" → "a, an (neuter)"; **mann** (W011) "human being" → "man"; **de** (W068) "those" → "they"; **den/det** "that" → "it; that"; **pen** "nice" → "pretty"; **bad** (W097) "a bath" → "a bathroom; a bath" (S8102 means bathroom); **se** hint ends in " .".
- **Gender wrong in the data:** **vann** (W049) is en in content-no; Wiktionary gives vann n, definite vannet. **rom** is en; the room sense is n. No shipped line puts an article before either, so no sentence is wrong, but the Glossary tag and any Type the Word article check would be. Every other noun carries a gender from Wiktionary (en 73, et 21); only arm has none (filed as an adjective). review-decisions.gender is empty, which is fine while Wiktionary supplies it.
- **Match Pairs:** no Norwegian hint equals its form, so nothing is excluded as a cognate; **park** ("a park"), **restaurant** ("a restaurant"), **film** ("a film"), **museum** ("a museum"), **taxi** ("a taxi") and **hånd** ("a hand") will sit on the board as identical pairs. Near-cognates (bok, melk, fisk, fotball, hotell, buss, fot, nese, hår) are allowed but easy.
- **Formal address:** none. De appears only as "they" (4 lines). du and dere throughout.
- 11 Tatoeba lines sit twice under two ids: U01 to U03 lines refilled into U05 (S5008 to S5016), U05 lines into U06 (S6008, S6009), S6003/S12001. They stand but repeat.
- No conjugation tables by design (one present form). Fine for Part 1.

## U01 Saying Hello

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S1101 | Keep |  | Hallo! — reads naturally |
| S1103 | Keep |  | Du er en gutt. — reads naturally |
| S1104 | Keep |  | Ja og nei. — reads naturally |
| S1105 | Keep |  | Er du en jente? — reads naturally |
| S1106 | Keep |  | Nei, jeg er ikke en gutt. — reads naturally |
| S1107 | Keep |  | Jeg er et barn. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S1001 | Use | | Jeg er en kvinne. |
| S1002 | Use | | Jeg er en jente. |
| S1003 | Use | | Hei, du. |
| S1004 | Use | | Jeg er. |
| S1102 | Use | | Jeg er en mann. |

## U31 Asking for Help

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S31101 | Keep |  | Saktere, takk. — reads naturally |
| S31102 | Keep |  | En gang til. — reads naturally |
| S31103 | Keep |  | Jeg sier ja. — reads naturally |
| S31104 | Keep |  | Gjenta, takk. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S31001 | Use | "Do you understand?" | Forstår du? (was "Understand?") |
| S31002 | Use | | Jeg forstår! |
| S31003 | Use | | Du snakker. |

## U02 People and Things

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S2101 | Keep |  | Dette er et hus. — reads naturally |
| S2102 | Keep |  | Det er en liten dør. — reads naturally |
| S2103 | Keep |  | Det er et bord. — reads naturally |
| S2104 | Keep |  | Denne er stor. — reads naturally |
| S2105 | Keep |  | Han er lærer og hun er lege. — reads naturally |
| S2106 | Keep |  | Den er stor. — reads naturally |
| S2107 | Keep |  | Det er en bok. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S2001 | Use | | Han er lærer. |
| S2002 | Use | | Er det et nei? |
| S2003 | Use | | Jeg er ikke lege. |
| S2004 | Use | | Du er en lege. |

## U03 Polite Phrases

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S3101 | Keep |  | God dag! — reads naturally |
| S3102 | Keep |  | Vær så god. — reads naturally |
| S3103 | Keep |  | Hvordan går det? — reads naturally |
| S3104 | Keep |  | Det går fint. — reads naturally |
| S3105 | Keep |  | Bra, takk. — reads naturally |
| S3106 | Keep |  | Unnskyld! — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S3001 | Use | | God kveld. |
| S3002 | Use | | God morgen. |
| S3003 | Use | | Ikke dårlig. |
| S3004 | Use | | Det er ikke bra. |
| S3005 | Use | | Ha det! |
| S3006 | Use | | Vær så snill. |
| S3007 | Use | | Beklager det. |

## U04 Food and Drink

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S4101 | Keep |  | Jeg drikker vann. — reads naturally |
| S4102 | Keep |  | Jeg drikker te. — reads naturally |
| S4103 | Keep |  | Jeg liker ost. — reads naturally |
| S4104 | Keep |  | Et eple, takk. — reads naturally |
| S4105 | Keep |  | Vin er deilig. — reads naturally |
| S4106 | Keep |  | Kaffe er deilig. — reads naturally |
| S4107 | Keep |  | Drikker du melk? — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S4001 | Use | | Jeg spiser brød. |
| S4002 | Use | "I don't like coffee." | Jeg liker ikke kaffe. (was "I dislike coffee.") |
| S4003 | Use | | Jeg liker brød. |
| S4004 | Use | | Liker du det? |

## U05 Pets and Animals

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S5101 | Keep |  | Jeg har en mus. — reads naturally |
| S5102 | Keep |  | Du har en kanin. — reads naturally |
| S5103 | Keep |  | En kanin er et dyr. — reads naturally |
| S5104 | Keep |  | Jeg har en katt. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S5001 | Use | | Han har en hund. |
| S5002 | Use | | Jeg har en stor hund. |
| S5003 | Use | | En hest er et dyr. |
| S5004 | Use | | Det er en fugl. |
| S5005 | Use | "Do you have milk?" | Har du melk? (was "Do you have some milk?") |
| S5006 | Use | | Liker du fisk? |
| S5007 | Use | | Fisk, takk. |
| S5008 | Use | | Er det et nei? |
| S5009 | Use | | Jeg har ikke vann. |
| S5010 | Use | | Jeg er. |
| S5011 | Use | | Han er lærer. |
| S5012 | Use | | Jeg er ikke lege. |
| S5013 | Use | | Jeg er en kvinne. |
| S5014 | Use | | Jeg er en jente. |
| S5015 | Use | | Det er ikke bra. |
| S5016 | Use | | Du er en lege. |

## U32 Asking About Words

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S32101 | Keep |  | Et ord på norsk. — reads naturally |
| S32102 | Keep |  | Hva betyr det på norsk? — reads naturally |
| S32103 | Keep |  | Et ord på engelsk. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S32001 | Use | | Hva betyr det? |
| S32002 | Use | | Er du engelsk? |
| S32003 | Use | | Han snakker engelsk. |

## U06 More Than One

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S6101 | Keep |  | Jeg har to hunder. — reads naturally |
| S6102 | Keep |  | Vi har mange katter. — reads naturally |
| S6103 | Keep |  | To bøker. — reads naturally |
| S6104 | Keep |  | De er menn. — reads naturally |
| S6105 | Keep |  | De er kvinner. — reads naturally |
| S6106 | Keep |  | Jeg har to epler. — reads naturally |
| S6107 | Keep |  | Vi er venner. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S6001 | Reject | | Er de?: "Er de?" is a fragment ("They are?") |
| S6002 | Use | | Liker dere det? |
| S6003 | Use | | Ja, to. |
| S6004 | Use | "Hey, you all." | Hei, dere. (was "Hey, you.") |
| S6005 | Use | | De er barn. |
| S6006 | Use | | De spiser brød. |
| S6007 | Use | | Vi har ikke vann. |
| S6008 | Use | | Han har en hund. |
| S6009 | Use | | Jeg har en stor hund. |

## U07 Describing Things

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S7101 | Keep |  | En ny bil. — reads naturally |
| S7102 | Keep |  | En stygg hund. — reads naturally |
| S7103 | Keep |  | Han er ung. — reads naturally |
| S7104 | Keep |  | Jeg har en sykkel. — reads naturally |
| S7105 | Keep |  | En ung mann. — reads naturally |
| S7106 | Keep |  | En fin bil. — reads naturally |
| S7107 | Keep |  | Han er veldig ung. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S7001 | Use | | Jeg har en gammel bil. |
| S7002 | Use | | Ha det gøy. |
| S7003 | Use | | Jeg er lærer også. |

## U52 Free Time

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S52101 | Keep |  | Jeg liker musikk. — reads naturally |
| S52102 | Keep |  | Liker du fotball? — reads naturally |
| S52103 | Keep |  | Jeg liker å synge. — reads naturally |
| S52104 | Keep |  | Jeg liker å lese. — reads naturally |
| S52106 | Keep |  | En fin film. — reads naturally |
| S52107 | Keep |  | Et bilde. — reads naturally |
| S52108 | Keep |  | En fest! — reads naturally |
| S52109 | Keep |  | Jeg liker spill. — reads naturally |
| S52110 | Keep |  | Jeg liker å danse. — reads naturally |
| S52111 | Keep |  | Jeg liker å svømme. — reads naturally |
| S52112 | Keep |  | Jeg liker å se en film. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S52001 | Use | | Han liker ikke å danse. |
| S52002 | Reject | | Å nei!: å as the interjection "oh"; learners know å only as the infinitive marker |
| S52003 | Reject | | Å, unnskyld.: å as "oh"; same trap |
| S52105 | Use | | Jeg leser en bok. |

## U08 Where Things Are

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S8101 | Keep |  | Det er en seng her. — reads naturally |
| S8102 | Keep |  | Det er et bad her. — bad = bathroom here; the hint says "a bath" (see above) |
| S8103 | Keep |  | Det er et rom her. — reads naturally |
| S8104 | Fix | Det er et kjøkken her. = There is a kitchen here. | Jeg er i et kjøkken. — "I am in a kitchen" is odd |
| S8105 | Keep |  | Den står der. — reads naturally |
| S8106 | Keep |  | En bok ligger der. — reads naturally |
| S8107 | Keep |  | En katt er under et bord. — reads naturally |
| S8108 | Keep |  | Det er en hage ved et hus. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S8001 | Use | | Er den der? |
| S8002 | Use | | Er det der? |
| S8003 | Use | | Ikke her. |
| S8004 | Use | | Se på det! |
| S8005 | Use | | Jeg spiser her. |
| S8006 | Use | | Se der. |

## U09 How You Feel

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S9101 | Keep |  | Jeg er glad. — reads naturally |
| S9102 | Keep |  | Er du redd? — reads naturally |
| S9103 | Keep |  | Jeg er tørst. — reads naturally |
| S9104 | Keep |  | Jeg er varm. — reads naturally |
| S9105 | Keep |  | Jeg er sint. — reads naturally |
| S9106 | Keep |  | Jeg er sulten. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S9001 | Use | | Du er trøtt, er du ikke? |
| S9002 | Use | | Jeg er trøtt! |
| S9003 | Use | | Hun er ikke kald. |
| S9004 | Use | | Er du trist? |
| S9005 | Use | "Aren't you sad?" | Er du ikke trist? (was "You’re not sad?") |
| S9006 | Use | | Hun er gammel og syk. |

## U33 Finding the Word

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S33101 | Keep |  | Jeg leter etter en bok. — reads naturally |
| S33102 | Fix | Det er en ting. = It is a thing. | Det er en ting å se. — "It is a thing to see" is odd and adds å se |
| S33103 | Keep |  | Jeg vet det. — reads naturally |
| S33104 | Keep |  | Det heter kaffe. — reads naturally |

## U10 Mine and Yours

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S10101 | Keep |  | Det er hans bok. — reads naturally |
| S10102 | Keep |  | Det er hennes katt. — reads naturally |
| S10103 | Keep |  | Det er vår hund. — reads naturally |
| S10104 | Keep |  | Hun er min venninne. — reads naturally |
| S10105 | Keep |  | Hun er min mor. — reads naturally |
| S10106 | Keep |  | Det er min familie. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S10001 | Use | | Han er min bror. |
| S10002 | Use | | Er dette din bil? |
| S10003 | Use | "Hi, Dad." | Hei, far. (was "Hi, Father.") |
| S10004 | Use | | Den er min. |
| S10005 | Use | | Den er ikke min. |
| S10006 | Use | | Har du en søster? |
| S10007 | Use | | Har dere en søster? |
| S10008 | Use | | Har hun en søster? |
| S10009 | Use | | Hei, venn! |
| S10010 | Use | | Jeg har en venn. |
| S10011 | Use | | Det er ikke min katt. |
| S10012 | Use | | Har han en søster? |

## U11 Asking Questions

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S11102 | Keep |  | Når er det? — reads naturally |
| S11103 | Keep |  | Når spiser vi? — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S11001 | Reject | | Hva, hvorfor?: "Hva, hvorfor?" is an odd fragment |
| S11002 | Use | | Hvorfor ikke? |
| S11003 | Use | | Hvem er det? |
| S11004 | Use | | Hvem er han? |
| S11005 | Use | | Hva liker du? |
| S11006 | Use | | Hvor mange barn har du? |
| S11007 | Use | | Det er fordi du er jente. |
| S11008 | Use | | Hvem er dere? |
| S11009 | Use | | Hei, hva er dette? |
| S11010 | Use | | Hvorfor er han sint? |
| S11011 | Use | | Hvilken er din bok? |
| S11012 | Use | | Hvem er sulten? |
| S11013 | Use | | Hvem er der? |
| S11014 | Use | | Hvorfor er du trøtt? |
| S11101 | Use | | Når? |

## U53 Around Town

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S53101 | Keep |  | Det er et museum. — reads naturally |
| S53102 | Keep |  | Det er en kirke. — reads naturally |
| S53103 | Keep |  | Det er et hotell. — reads naturally |
| S53104 | Keep |  | Det er en stasjon. — reads naturally |
| S53105 | Keep |  | Det er en buss. — reads naturally |
| S53106 | Keep |  | Det er et tog. — reads naturally |
| S53107 | Keep |  | Det er en taxi. — reads naturally |
| S53108 | Keep |  | Det er en strand. — reads naturally |
| S53109 | Keep |  | Det er et sykehus. — reads naturally |
| S53110 | Keep |  | Det er et torg. — reads naturally |
| S53111 | Keep |  | Det er nær. — reads naturally |
| S53112 | Keep |  | Det er langt. — reads naturally |

## U12 Counting to Ten

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S12101 | Keep |  | Én, to, tre. — reads naturally |
| S12102 | Keep |  | Tre, fire, fem. — reads naturally |
| S12103 | Keep |  | Seks, sju, åtte. — reads naturally |
| S12104 | Keep |  | Ni, ti. — reads naturally |
| S12105 | Keep |  | Jeg er ti år. — "Jeg er ti år" is how Norwegians say it |
| S12106 | Keep |  | Jeg har én bror. — reads naturally |
| S12107 | Keep |  | Jeg har fire bøker. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S12001 | Use | | Ja, to. |
| S12002 | Use | | Vi er en familie på fem. |

## U13 Naming Colours

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S13101 | Keep |  | Det er en rød bil. — reads naturally |
| S13102 | Keep |  | Det er en blå dør. — reads naturally |
| S13103 | Keep |  | Det er en grønn sykkel. — reads naturally |
| S13104 | Keep |  | Det er en gul bok. — reads naturally |
| S13105 | Keep |  | Det er en brun hund. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S13001 | Use | | Hvilken hund er svart? |
| S13002 | Use | | Jeg har en hvit hest. |
| S13003 | Use | | Dette er en veldig fin farge. |

## U14 Days and Times

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S14101 | Keep |  | Det er en fin dag. — reads naturally |
| S14102 | Keep |  | Det er en uke. — reads naturally |
| S14103 | Keep |  | En time. — reads naturally |
| S14104 | Keep |  | I dag er det lørdag. — reads naturally |
| S14105 | Keep |  | I morgen er det søndag. — reads naturally |
| S14106 | Keep |  | Det er sent. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S14001 | Use | | Er det mandag i dag? |
| S14002 | Use | | I morgen? |
| S14003 | Use | | Og nå? |
| S14004 | Use | | Hvor er du nå? |
| S14005 | Reject | | Hva har vi nå her?: "Hva har vi nå her?" is an idiom |
| S14006 | Use | | Ikke nå! |
| S14007 | Use | | Jeg er syk nå. |
| S14008 | Use | | Jeg er veldig sulten nå. |

## U15 Going Places

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S15101 | Keep |  | Jeg går til en skole. — acceptable; a native checker may prefer "Jeg går til skolen" |
| S15102 | Keep |  | Vi går til en park. — reads naturally |
| S15103 | Keep |  | Hun går til en butikk. — reads naturally |
| S15104 | Keep |  | Jeg går til en by. — reads naturally |
| S15105 | Keep |  | Det er en gate. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S15001 | Reject | | Gå og se hvem det er.: imperative plus an indirect clause (se hvem det er): word order past A1 Part 1 |
| S15002 | Use | | Det er en restaurant her. |
| S15003 | Reject | | Jeg er dårlig til å svømme.: "dårlig til å" = bad at; til and å in senses not taught |

## U51 Body and Looks

**Drafts (tamago_original)**

| ID | Verdict | Fix or swap | Reason |
|---|---|---|---|
| S51101 | Keep |  | Jeg har to øyne. — reads naturally |
| S51102 | Keep |  | Et øye. — reads naturally |
| S51103 | Keep |  | Jeg har en hånd. — reads naturally |
| S51104 | Keep |  | Jeg har en fot. — reads naturally |
| S51105 | Keep |  | Han har en stor munn. — reads naturally |
| S51106 | Keep |  | Hun har et fint hode. — reads naturally |
| S51107 | Keep |  | Jeg har et ben. — reads naturally |
| S51108 | Keep |  | Han har en lang arm. — reads naturally |
| S51109 | Keep |  | Hun har langt hår. — reads naturally |
| S51110 | Keep |  | Han har kort hår. — reads naturally |

**Tatoeba lines (shipped)**

| ID | Verdict | English to show | Reason |
|---|---|---|---|
| S51001 | Use | | Han har lang nese. |
| S51002 | Use | | Du er pen. |
| S51003 | Use | | Han er veldig smart. |
| S51004 | Use | | Du er en smart gutt. |
