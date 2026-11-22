# Tamago Spanish check, A1 Part 3, 2026-11-15

Quality pass on Spanish A1 Part 3 (Latin American Spanish), change no code. Three sets: the Tatoeba candidates kept out only by the trust rule (478 distinct sentences shown in `_review/spanish-part3-candidates.md`; the "and N more" tails are not in that file and were not reviewed), each marked **Use** or **Reject**; the 198 drafts in `_review/spanish-part3-drafts.md`, each marked **Keep**, **Fix** (with the corrected Spanish and English) or **Cut**, with a swap named where a Use candidate teaches the same word; and the 15 Read and Answer texts, checked for natural Spanish, clear questions and one fitting answer each. The task items (Write the Number, Fill the Form, Write a Message) are at the end. Meanings and verb forms were checked against the course's Wiktionary data in content-es/checks (words.json, conjugations.json), not memory. The candidates file carries the same marks in place. This is a reviewer's read, not a native speaker's.

## Counts

- Candidates: **Use 375** · **Reject 103** (96 of the Use marks name the English to show).
- Drafts: **Keep 198** · **Fix 0** · **Cut 0**; 32 drafts have a swap named.
- Read and Answer texts: **Keep 15** · **Fix 0**. Task items: Keep 16 · Fix 1 (N205).
- Draft fixes: none; all 198 drafts are correct Latin American Spanish with matching English. Text fixes: none. Task item fix: N205 (a March date placed in Days of the Week, before marzo is taught).
- Reject reasons, most common first: imperatives outside the help circles and Instructions (U69, where they were kept); idioms (del todo, me viene bien, a la próxima, de nuevo, volver a, llevarse bien, en mi lugar, mira quién habla); constructions past A1 (impersonal se, estar por, hay que, antes de que with the subjunctive, hace … que, no … más que); sense traps (para as stops, pasado the noun and pasado mañana, segundo the ordinal, juego the noun, seguro as insurance, lleva as wears, te ves as you look, sale en la radio, abierta as open-minded, llama as knock); compliments and remarks on looks (hermosa, gordo of a person) in Looks + Character; proverbs and mottos; scolding, gloomy or dark lines; odd lines; two-sentence and fragment lines; one ungrammatical line (#711070 "Tú habla").
- Eight word-for-word matches are swaps (S61111, S72102, S72104, S66101, S66106, S74101, S74102, S74110); 24 more swaps are named where a Use candidate carries the same word as well or better. Answer the Question pairs (S61102, S62113, S64107, S64111, S66102, S66108, S67114, S67111, S65116, S72105, S72106) were left as drafts so the pairs stay intact; S63110 is swapped to a line that still answers its question.
- Twelve-hour clock: every draft and task item that names a time of day uses "de la mañana / de la tarde / de la noche" or a bare hour; the printed timetables (R201, R210) use the 24-hour clock, as real notices do.
- Latin American usage, for the native checker and Dan's call (the drafts are correct Spanish and were kept): **planta** (floors) is Spain's; Latin America says piso (S66110, S66111, S66112, R208; "planta baja" is fine everywhere). **deberes** is Spain's; Latin America says tarea (S69111, S69112, #853667, #1289169). **baloncesto** is Spain's; Latin America says básquetbol (S73102 to S73104, #692844, #854722, #860507). **marrón** is Argentina and Colombia; Mexico says café for brown (U74). **menos cuarto** (S61104, N204) is Spain and the south; Mexico and Colombia say "un cuarto para las diez". **¿Qué tiempo hace?** (S72104) is standard; Mexicans more often ask "¿Cómo está el clima?". **coche** (S71109) is Spain and Argentina; Mexico says carro. **ducharse** (U65) is understood; "bañarse" is the everyday verb. Good Latin American choices already in place: boleto, celular, pesos, nos vemos, en la tarde (#456528), yo juego tenis without al (#859087), un radio (#12846041), baños (R208), primero de enero (S63118).
- Glossary senses to re-pick or hint (checked in content-es/checks/words.json): **cuarto** W1205 has a garbled gloss ("fourth, quarter quarter-hour watch watch English or American quart cuarto, quarter-sack quarter quarter"); show "quarter" (quarter of an hour). **temprano** W1211 is picked as the adjective; the lines use the adverb (me levanto temprano, es temprano). **tarde** W1209 "afternoon" is right for "de la tarde" but the circle also uses the adverb (termino tarde, llega tarde); hint both. **menos** W1206 "less": hint "to" in times (diez menos cuarto). **pues** W1255 "so, then; in that case": the help circle uses the filler "well" (Pues sí). **solo** W1413 "sole; one; only; single": the lines mean alone (estoy solo, vive solo); Wiktionary has that sense. **por** W1404 "by": the lines use por la mañana (in), por aquí (around here), por día (per), por favor; hint "for, by, through; in (the morning)". **tiempo** W1415 "time": The Weather circle means weather (¿Qué tiempo hace?); hint "weather; time". **hace** W1416: hint "it is (weather): hace calor, hace frío". **comida** W1283 "food": in Latin America la comida is also lunch, the main meal (#1148428's English says lunch); hint both. **luego** W1293 "then": also later (hasta luego, nos vemos luego). **fin** W1222 "end": hint "fin de semana = weekend". **claro** W880 is the interjection "of course"; U74's claros (W1441) means light (ojos claros) and needs the adjective sense. **venir** W1261's gloss starts "Senses relating to literal movement. [with de ‘from’ …]"; show "to come". **ir** W1270 "to go, can sometimes be translated with to come": show "to go". **levantarse** W1276 and **ducharse** W1278 are glossed "infinitive of … combined with se"; show "to get up" and "to shower". **cenar** W1281 "to dine; to have supper; to have a lavish meal": show "to have dinner". **señores** W1330 and **pasajeros** W1331 are tagged Adjective; they are nouns here (gentlemen, passengers). **segundo** W1258 is the time unit, right; the ordinal candidates were rejected. **seguro** W1327 "certain; sure" is right; the insurance line was rejected. **juego** W1431 is the verb form, right; the noun (game) lines were rejected.
- Conjugation tables (content-es/checks/conjugations.json): **nevar** shows a full table (nievo, nievas, nevamos, nievan) while **llover** shows only "llueve" with dashes; both are weather verbs and should match (third person only, as llover has it). No table at all for **cambiar, cenar, desayunar, entrar, esquiar, practicar, visitar** (regular -ar verbs; Wiktionary has es-conj for each, so the fetch or the parse missed them), nor for **levantarse** and **ducharse** (reflexive infinitives; levantar and duchar have tables, which could stand in with the pronouns). Every table present matches the forms taught (levanto, ducho, empiezo, vuelvo, hago, vengo, salgo, oigo, siento, creo, elijo and the rest).
- The Tatoeba sentences already in the course were not checked here; they carry a source_id and were checked at import.


## U61 · What Time Is It?

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S61102 | Son las tres y media. | It's half past three. | Keep |  | Correct, natural, A1; the English matches. |
| S61104 | Son las diez menos cuarto. | It's a quarter to ten. | Keep |  | Correct. "Menos cuarto" is the Spain and South American form; Mexico and Colombia say "un cuarto para las diez". Both are understood; one for the native checker (N204 says the same). |
| S61105 | Es la una y media. | It's half past one. | Keep |  | Correct, natural, A1; the English matches. |
| S61106 | Es la una y cuarto. | It's a quarter past one. | Keep |  | Correct, natural, A1; the English matches. |
| S61107 | La clase es a las nueve y media. | The class is at half past nine. | Keep |  | Correct, natural, A1; the English matches. |
| S61108 | Son las cinco de la tarde. | It's five in the afternoon. | Keep |  | Correct, natural, A1; the English matches. |
| S61109 | Son las siete de la mañana. | It's seven in the morning. | Keep |  | Correct, natural, A1; the English matches. |
| S61110 | Son las once de la noche. | It's eleven at night. | Keep |  | Correct, natural, A1; the English matches. |
| S61111 | Es mediodía. | It's noon. | Keep | Swap: #724454, the same sentence. | Correct, natural, A1; the English matches. |
| S61112 | Como a mediodía. | I eat at noon. | Keep |  | Correct; "Como" is I eat here, the English fixes the reading. |
| S61113 | A medianoche estoy en la cama. | At midnight I'm in bed. | Keep |  | Correct, natural, A1; the English matches. |
| S61114 | Estoy en casa a medianoche. | I'm home at midnight. | Keep |  | Correct, natural, A1; the English matches. |
| S61115 | Tengo dos horas. | I have two hours. | Keep |  | Correct, natural, A1; the English matches. |
| S61116 | Estudio tres horas al día. | I study three hours a day. | Keep |  | Correct, natural, A1; the English matches. |
| S61117 | Son dos horas en autobús. | It's two hours by bus. | Keep |  | Correct, natural, A1; the English matches. |
| S61118 | Voy pronto. | I'm going soon. | Keep |  | Correct but bare; fine as a word carrier. |
| S61119 | Tom va a llamar pronto. | Tom is going to call soon. | Keep |  | Correct, natural, A1; the English matches. |
| S61120 | Pronto es mi cumpleaños. | My birthday is soon. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#10742786](https://tatoeba.org/en/sentences/show/10742786) | Tengo media hora. | I've got half an hour. | Use |  |  |
| [#10742787](https://tatoeba.org/en/sentences/show/10742787) | Tengo una media hora. | I've got half an hour. | Reject |  | "Una media hora" means about half an hour; the English drops that, and #10742786 already carries media. |
| [#853651](https://tatoeba.org/en/sentences/show/853651) | Voy a estudiar inglés esta tarde. | I am going to study English this afternoon. | Use |  |  |
| [#1226240](https://tatoeba.org/en/sentences/show/1226240) | ¡Qué noche! | What a night! | Reject |  | Exclamative fragment. |
| [#724454](https://tatoeba.org/en/sentences/show/724454) | Es mediodía. | It is midday. | Use |  |  |
| [#434903](https://tatoeba.org/en/sentences/show/434903) | Él tiene menos pan. | He has less bread. | Use |  |  |
| [#456180](https://tatoeba.org/en/sentences/show/456180) | Es temprano. | It's early. | Use |  |  |
| [#702995](https://tatoeba.org/en/sentences/show/702995) | Espera cinco minutos, por favor. | Please wait for five minutes. | Reject |  | Imperative; the circle is not a help or instruction circle. |
| [#1113212](https://tatoeba.org/en/sentences/show/1113212) | Yo tengo menos de diez pesos. | I have less than ten pesos. | Use |  |  |
| [#2895096](https://tatoeba.org/en/sentences/show/2895096) | Quiero unos minutos más. | I want a few more minutes. | Use |  |  |
| [#3518267](https://tatoeba.org/en/sentences/show/3518267) | Al menos estoy vivo. | At least I'm still alive. | Reject |  | "Al menos estoy vivo" is a dark idiom. |
| [#6380490](https://tatoeba.org/en/sentences/show/6380490) | Una hora tiene sesenta minutos. | An hour has sixty minutes. | Use |  |  |
| [#9035344](https://tatoeba.org/en/sentences/show/9035344) | Me voy en un minuto. | I'm leaving in one minute. | Use |  |  |
| [#9795636](https://tatoeba.org/en/sentences/show/9795636) | Siete menos cuatro son tres. | Seven minus four equals three. | Use | Seven minus four is three. |  |
| [#10363269](https://tatoeba.org/en/sentences/show/10363269) | Hay uno menos. | There is one less. | Reject |  | A fragment with no scene; "one less" of what. |

## U71 · Little Words

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S71101 | Cuando estoy cansado, voy a la cama. | When I'm tired, I go to bed. | Keep |  | Correct, natural, A1; the English matches. |
| S71102 | Leo cuando estoy solo. | I read when I'm alone. | Keep |  | Correct, natural, A1; the English matches. |
| S71103 | Cuando voy a la playa, estoy contento. | When I go to the beach, I'm happy. | Keep |  | Correct, natural, A1; the English matches. |
| S71104 | Voy a la escuela antes de las ocho. | I go to school before eight. | Keep |  | Correct, natural, A1; the English matches. |
| S71105 | Después de la clase voy a casa. | After class I go home. | Keep |  | Correct, natural, A1; the English matches. |
| S71106 | Tom dice que no. | Tom says no. | Keep |  | Correct, natural, A1; the English matches. |
| S71107 | Es más grande que mi casa. | It's bigger than my house. | Keep |  | Correct, natural, A1; the English matches. |
| S71108 | La puerta del baño es blanca. | The bathroom door is white. | Keep |  | Correct, natural, A1; the English matches. |
| S71109 | Es el coche del profesor. | It's the teacher's car. | Keep |  | Correct Spanish; in Mexico "carro" is the car. Coche is the course's word since Part 2 (W1036), fine. |
| S71110 | Estoy cerca del parque. | I'm near the park. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#6382691](https://tatoeba.org/en/sentences/show/6382691) | Comprendo cuando no hablas muy rápido. | I understand you when you don't speak very quickly. | Use | I understand when you don't speak very fast. |  |
| [#10759078](https://tatoeba.org/en/sentences/show/10759078) | Ahora sé mucho más que antes. | Now I know much more than before. | Use |  |  |
| [#434213](https://tatoeba.org/en/sentences/show/434213) | ¿Y después? | And afterward? | Use | And then? |  |
| [#853873](https://tatoeba.org/en/sentences/show/853873) | El domingo va después del sábado. | Sunday comes after Saturday. | Use |  |  |
| [#765168](https://tatoeba.org/en/sentences/show/765168) | Sé que no sé. | I know that I do not know. | Reject |  | A riddle line; two readings of "sé" (know, be) in five words. |
| [#456534](https://tatoeba.org/en/sentences/show/456534) | ¡Claro que sí! | Of course! | Use |  |  |
| [#1439169](https://tatoeba.org/en/sentences/show/1439169) | ¡Claro que no! | No way! | Use | Of course not! |  |
| [#340306](https://tatoeba.org/en/sentences/show/340306) | Baja del caballo. | Get down from your horse. | Reject |  | Imperative; the circle is not a help or instruction circle. |
| [#1912566](https://tatoeba.org/en/sentences/show/1912566) | Vivo cerca del mar. | I live close to the sea. | Use |  |  |
| [#329727](https://tatoeba.org/en/sentences/show/329727) | No es del todo exacto. | It isn't totally exact. | Reject |  | "Del todo" is an idiom (entirely). |
| [#331447](https://tatoeba.org/en/sentences/show/331447) | Eso está todo malo. | That's altogether wrong. | Reject |  | "Está todo malo" is an odd, regional line; the English does not match. |
| [#337105](https://tatoeba.org/en/sentences/show/337105) | Ya voy. | I am coming. | Use | I'm coming. |  |
| [#342341](https://tatoeba.org/en/sentences/show/342341) | Él ya no está aquí. | He is no longer here. | Use |  |  |
| [#344106](https://tatoeba.org/en/sentences/show/344106) | Soy mucho más joven que tú. | I'm much younger than you. | Use |  |  |
| [#345843](https://tatoeba.org/en/sentences/show/345843) | Ya no eres un niño. | You are no longer a child. | Reject |  | A scolding line. |
| [#356706](https://tatoeba.org/en/sentences/show/356706) | Él vive solo en un apartamento. | He lives alone in an apartment. | Use |  |  |
| [#434159](https://tatoeba.org/en/sentences/show/434159) | ¿Sobre qué? | About what? | Use |  |  |
| [#434691](https://tatoeba.org/en/sentences/show/434691) | Todo es muy caro en esta tienda. | Everything is very expensive in this store. | Use |  |  |
| [#434693](https://tatoeba.org/en/sentences/show/434693) | ¿Todo bien? | Everything okay? | Use | Everything okay? |  |
| [#434703](https://tatoeba.org/en/sentences/show/434703) | Perdón, ¿hay un hotel por aquí? | Excuse me, is there a hotel around here? | Use |  |  |
| [#436108](https://tatoeba.org/en/sentences/show/436108) | ¿Por dónde se va a ...? | How do I get to ...? | Reject |  | Trailing ellipsis, and "se va" (impersonal se) is past A1. |
| [#436232](https://tatoeba.org/en/sentences/show/436232) | ¿Cuánto tengo que pagar? | How much must I pay? | Use | How much do I have to pay? |  |
| [#436558](https://tatoeba.org/en/sentences/show/436558) | No quiero eso hasta mañana. | I don't want that until tomorrow. | Reject |  | An odd line; "not until tomorrow" is not what a learner needs for hasta. |
| [#456044](https://tatoeba.org/en/sentences/show/456044) | ¿Está bien ya? | Is that OK now? | Reject |  | Odd word order for the sense; "¿Ya está bien?" would be the natural line. |
| [#456528](https://tatoeba.org/en/sentences/show/456528) | Hasta mañana en la tarde. | Not until tomorrow afternoon. | Use | See you tomorrow afternoon. |  |
| [#456666](https://tatoeba.org/en/sentences/show/456666) | Hasta pronto. | See you soon. | Use |  |  |
| [#462541](https://tatoeba.org/en/sentences/show/462541) | Eso es todo, gracias. | That's all, thanks. | Use |  |  |
| [#462825](https://tatoeba.org/en/sentences/show/462825) | El dinero está sobre la mesa. | The money is on the table. | Use |  |  |
| [#462855](https://tatoeba.org/en/sentences/show/462855) | El periódico cuesta menos que el libro. | The newspaper costs less than the book. | Use |  |  |
| [#463097](https://tatoeba.org/en/sentences/show/463097) | No hay más que ropa aquí. | There is nothing here but clothing. | Reject |  | "No … más que" (nothing but) is past A1. |
| [#464225](https://tatoeba.org/en/sentences/show/464225) | Por aquí. | This way. | Use |  |  |
| [#464597](https://tatoeba.org/en/sentences/show/464597) | ¿Cuánto cuesta por día? | What is the rate per day? | Use | How much does it cost per day? |  |
| [#505938](https://tatoeba.org/en/sentences/show/505938) | ¿Eso es un gato o un perro? | Is that a cat or a dog? | Use |  |  |
| [#525142](https://tatoeba.org/en/sentences/show/525142) | Está más que claro. | It's abundantly clear. | Reject |  | "Más que claro" is an idiom. |
| [#526225](https://tatoeba.org/en/sentences/show/526225) | No solo de pan vive el hombre. | Man lives not by bread alone. | Reject |  | A proverb. |

## U37 · Didn't Catch That

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| | *(no drafts in this circle)* | | | | |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#330665](https://tatoeba.org/en/sentences/show/330665) | Hoy me siento bien. | I feel well today. | Use |  |  |
| [#331673](https://tatoeba.org/en/sentences/show/331673) | Me gusta este, me lo llevo. | I like this. I'll take it. | Reject |  | Two clauses, and "me lo llevo" (I'll take it) is a shop idiom. |
| [#336343](https://tatoeba.org/en/sentences/show/336343) | Esto es lo que quiero. | This is what I want. | Use |  |  |
| [#343840](https://tatoeba.org/en/sentences/show/343840) | Pero yo entiendo lo que él dice. | But I understand what he says. | Use |  |  |
| [#347537](https://tatoeba.org/en/sentences/show/347537) | No entiendo lo que quieres decir. | I don't get what you mean. | Use |  |  |
| [#432211](https://tatoeba.org/en/sentences/show/432211) | Tú lo tienes todo. | You have everything. | Reject |  | "Lo tienes todo" is an idiom (you have it all). |
| [#435153](https://tatoeba.org/en/sentences/show/435153) | Lo sé. | I know. | Use |  |  |
| [#436528](https://tatoeba.org/en/sentences/show/436528) | Ya no lo quiero. | I don't want it anymore. | Use |  |  |
| [#436586](https://tatoeba.org/en/sentences/show/436586) | Me siento bien hoy. | I feel good today. | Use |  |  |
| [#436592](https://tatoeba.org/en/sentences/show/436592) | Me siento muy enfermo. | I feel very sick. | Use |  |  |
| [#436594](https://tatoeba.org/en/sentences/show/436594) | Me siento bien. | I feel fine. | Use |  |  |
| [#455836](https://tatoeba.org/en/sentences/show/455836) | No me siento bien. | I don't feel well. | Use |  |  |
| [#462467](https://tatoeba.org/en/sentences/show/462467) | Lo siento, no tengo dinero. | Sorry, I don't have any money. | Use |  |  |
| [#464559](https://tatoeba.org/en/sentences/show/464559) | ¿Para qué lo quieres? | What do you want it for? | Use |  |  |
| [#536674](https://tatoeba.org/en/sentences/show/536674) | ¿Entiendes lo que quiero decir? | Do you see what I mean? | Use | Do you understand what I mean? |  |
| [#543523](https://tatoeba.org/en/sentences/show/543523) | Me siento mal por ella. | I feel bad for her. | Reject |  | "Sentirse mal por" is feel sorry for, a sense trap for sentir. |
| [#547424](https://tatoeba.org/en/sentences/show/547424) | Ya me siento bien. | I'm feeling fine now. | Use | I feel fine now. |  |
| [#616158](https://tatoeba.org/en/sentences/show/616158) | Me siento solo. | I'm lonely. | Use | I feel lonely. |  |
| [#674887](https://tatoeba.org/en/sentences/show/674887) | Eres lo que comes. | You are what you eat. | Reject |  | A proverb. |
| [#720499](https://tatoeba.org/en/sentences/show/720499) | Eso no lo sé. | I don't know that. | Use |  |  |
| [#742966](https://tatoeba.org/en/sentences/show/742966) | ¿Qué dijiste? | What did you say? | Use |  |  |
| [#789186](https://tatoeba.org/en/sentences/show/789186) | No entiendo muy bien lo que dice. | I don't quite understand what he says. | Use |  |  |
| [#854403](https://tatoeba.org/en/sentences/show/854403) | Lo sé muy bien. | I know it very well. | Use |  |  |
| [#854759](https://tatoeba.org/en/sentences/show/854759) | ¿Qué es lo que te gusta? | What do you like? | Use |  |  |
| [#857261](https://tatoeba.org/en/sentences/show/857261) | No lo entiendo. | I don't get it. | Use | I don't understand it. |  |

## U62 · Days of the Week

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S62101 | Este fin de semana estoy en casa. | This weekend I'm at home. | Keep |  | Correct, natural, A1; the English matches. |
| S62102 | El fin de semana voy a la playa. | On the weekend I go to the beach. | Keep |  | Correct; "el fin de semana" for on the weekend, US English matches Latin American usage. |
| S62103 | El periódico de ayer está en la mesa. | Yesterday's newspaper is on the table. | Keep |  | Correct, natural, A1; the English matches. |
| S62104 | ¿Dónde está el pan de ayer? | Where is yesterday's bread? | Keep |  | Correct, natural, A1; the English matches. |
| S62105 | Voy al cine dos veces al mes. | I go to the movies twice a month. | Keep |  | Correct; "cine" and "the movies" match. |
| S62106 | Como tres veces al día. | I eat three times a day. | Keep |  | Correct, natural, A1; the English matches. |
| S62107 | A veces voy al parque. | Sometimes I go to the park. | Keep |  | Correct, natural, A1; the English matches. |
| S62108 | El próximo lunes voy al médico. | Next Monday I'm going to the doctor. | Keep |  | Correct, natural, A1; the English matches. |
| S62109 | El periódico es de la semana pasada. | The newspaper is from last week. | Keep |  | Correct, natural, A1; the English matches. |
| S62110 | La foto es de la semana pasada. | The photo is from last week. | Keep |  | Correct, natural, A1; the English matches. |
| S62111 | La carta no es de la semana pasada. | The letter isn't from last week. | Keep |  | Correct, natural, A1; the English matches. |
| S62112 | ¿Qué día es mañana? | What day is tomorrow? | Keep |  | Correct, natural, A1; the English matches. |
| S62113 | Mañana es jueves. | Tomorrow is Thursday. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#854442](https://tatoeba.org/en/sentences/show/854442) | Tiene tres veces más libros que yo. | He has three times as many books as I have. | Reject |  | "Tres veces más … que" is a comparison past A1, and the English says "as many as". |
| [#514475](https://tatoeba.org/en/sentences/show/514475) | ¿Cuántas veces te lo tengo que decir? | How many times do I have to tell you? | Reject |  | A scolding line, and "te lo tengo que decir" stacks two pronouns. |
| [#8688995](https://tatoeba.org/en/sentences/show/8688995) | El jueves estoy aquí. | I'm here on Thursday. | Use |  |  |
| [#342983](https://tatoeba.org/en/sentences/show/342983) | Ella siempre habla en inglés. | She always speaks in English. | Use |  |  |
| [#345265](https://tatoeba.org/en/sentences/show/345265) | Él siempre dice la verdad. | He always tells the truth. | Use |  |  |
| [#434743](https://tatoeba.org/en/sentences/show/434743) | ¿Para cuántos días? | For how many days? | Use |  |  |
| [#437501](https://tatoeba.org/en/sentences/show/437501) | Uno para todos, todos para uno. | One for all, all for one. | Reject |  | A motto. |
| [#455988](https://tatoeba.org/en/sentences/show/455988) | En una semana hay siete días. | In one week there are seven days. | Use |  |  |
| [#462637](https://tatoeba.org/en/sentences/show/462637) | El gato tiene veinte días. | The cat is twenty days old. | Use |  |  |
| [#463247](https://tatoeba.org/en/sentences/show/463247) | Están todos bien, gracias. | They're all fine, thanks. | Use |  |  |
| [#463287](https://tatoeba.org/en/sentences/show/463287) | Este día es viernes. | This day is Friday. | Reject |  | "Este día es viernes" is not how Spanish says it; "Hoy es viernes". |
| [#584248](https://tatoeba.org/en/sentences/show/584248) | Él siempre está feliz. | He is always happy. | Use |  |  |
| [#607851](https://tatoeba.org/en/sentences/show/607851) | Voy cada año. | I go every year. | Use |  |  |
| [#611388](https://tatoeba.org/en/sentences/show/611388) | Siempre hay que decir la verdad. | You should always tell the truth. | Reject |  | "Hay que" is past A1, and the line preaches. |
| [#620458](https://tatoeba.org/en/sentences/show/620458) | Aprender poco a poco todos los días. | Learn little by little every day. | Reject |  | A fragment (infinitive), and preachy. |
| [#687559](https://tatoeba.org/en/sentences/show/687559) | ¿De dónde son todos ustedes? | Where are you all from? | Use |  |  |
| [#743575](https://tatoeba.org/en/sentences/show/743575) | El tren se para en cada estación. | The train stops at every station. | Reject |  | "Se para" (stops) is a sense trap: para is taught as "for". |
| [#744622](https://tatoeba.org/en/sentences/show/744622) | Siempre me siento cansado. | I always have a tired feeling. | Use | I always feel tired. |  |
| [#749912](https://tatoeba.org/en/sentences/show/749912) | ¡Buenas noches a todos! | Good night, everyone! | Use |  |  |
| [#763133](https://tatoeba.org/en/sentences/show/763133) | Voy a la iglesia todos los días. | I go to church every day. | Use |  |  |
| [#850500](https://tatoeba.org/en/sentences/show/850500) | Todos tienen su precio. | Everyone has his price. | Reject |  | A cynical line. |
| [#852401](https://tatoeba.org/en/sentences/show/852401) | Él va allí cada día. | He goes there every day. | Use |  |  |
| [#862435](https://tatoeba.org/en/sentences/show/862435) | Este tren para en cada estación. | This train stops at every station. | Reject |  | "Para" as stops is a sense trap; para is taught as "for". |
| [#876978](https://tatoeba.org/en/sentences/show/876978) | Quiero vivir para siempre. | I want to live forever. | Use |  |  |
| [#1441340](https://tatoeba.org/en/sentences/show/1441340) | Él es el amigo de todos. | He's everybody's friend. | Use |  |  |
| [#1461766](https://tatoeba.org/en/sentences/show/1461766) | Hablo inglés cada día. | I speak English every day. | Use |  |  |
| [#2119574](https://tatoeba.org/en/sentences/show/2119574) | Hay un tren cada treinta minutos. | The train runs every thirty minutes. | Use | There's a train every thirty minutes. |  |
| [#2998508](https://tatoeba.org/en/sentences/show/2998508) | Siempre escucho a Tom. | I always listen to Tom. | Use |  |  |

## U63 · Months + Seasons

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S63101 | Mi cumpleaños es en enero. | My birthday is in January. | Keep |  | Correct, natural, A1; the English matches. |
| S63102 | En abril voy a México. | In April I'm going to Mexico. | Keep |  | Correct, natural, A1; the English matches. |
| S63103 | Mi cumpleaños es el dos de mayo. | My birthday is on the second of May. | Keep |  | Correct, natural, A1; the English matches. |
| S63104 | En mayo voy a España. | In May I'm going to Spain. | Keep |  | Correct, natural, A1; the English matches. |
| S63105 | Las vacaciones son en junio. | The vacation is in June. | Keep |  | Correct, natural, A1; the English matches. |
| S63106 | Hoy es diez de junio. | Today is the tenth of June. | Keep |  | Correct; Latin American dates drop the article ("Hoy es diez de junio"). |
| S63107 | En agosto estamos en la playa. | In August we're at the beach. | Keep |  | Correct, natural, A1; the English matches. |
| S63108 | En septiembre voy a la escuela. | In September I go to school. | Keep |  | Correct, natural, A1; the English matches. |
| S63109 | Hoy es quince de septiembre. | Today is the fifteenth of September. | Keep |  | Correct, natural, A1; the English matches. |
| S63110 | Mi cumpleaños es el tres de noviembre. | My birthday is on the third of November. | Keep | Swap: #856907 "Mi cumpleaños es en noviembre." still answers S63119. | Correct, natural, A1; the English matches. |
| S63111 | En noviembre voy a Francia. | In November I'm going to France. | Keep |  | Correct, natural, A1; the English matches. |
| S63112 | En diciembre hay vacaciones. | There are holidays in December. | Keep |  | Correct, natural, A1; the English matches. |
| S63113 | En primavera voy mucho al parque. | In spring I go to the park a lot. | Keep | Swap: #456242 "Estamos en primavera." | Correct, natural, A1; the English matches. |
| S63114 | Me gusta el otoño. | I like fall. | Keep |  | Correct, natural, A1; the English matches. |
| S63115 | En otoño voy a la montaña. | In the fall I go to the mountains. | Keep | Swap: #875830 "Voy a España en otoño." | Correct, natural, A1; the English matches. |
| S63116 | ¿Qué fecha es mañana? | What's the date tomorrow? | Keep | Swap: #332137 "¿Cuál es la fecha de hoy?" | Correct, natural, A1; the English matches. |
| S63117 | La fecha de la fiesta es el cinco de abril. | The date of the party is the fifth of April. | Keep |  | Correct, natural, A1; the English matches. |
| S63118 | Hoy es primero de enero. | Today is the first of January. | Keep |  | Correct; "primero de enero" is the Latin American form (Spain says uno). |
| S63119 | ¿Cuándo es tu cumpleaños? | When is your birthday? | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#11466103](https://tatoeba.org/en/sentences/show/11466103) | Enero es mi mes. | January is my month. | Reject |  | An odd line; "January is my month" has no scene. |
| [#10629335](https://tatoeba.org/en/sentences/show/10629335) | ¿Cuántos días tiene enero? | How many days does January have? | Use |  |  |
| [#10629329](https://tatoeba.org/en/sentences/show/10629329) | Enero tiene treinta y un días. | January has thirty-one days. | Use |  |  |
| [#10191153](https://tatoeba.org/en/sentences/show/10191153) | Ya estamos en junio. | It's June. | Use | It's June already. |  |
| [#856907](https://tatoeba.org/en/sentences/show/856907) | Mi cumpleaños es en noviembre. | My birthday is in November. | Use |  |  |
| [#456242](https://tatoeba.org/en/sentences/show/456242) | Estamos en primavera. | It's spring. | Use |  |  |
| [#875815](https://tatoeba.org/en/sentences/show/875815) | Me gusta la primavera. | I like spring. | Use |  |  |
| [#13630926](https://tatoeba.org/en/sentences/show/13630926) | ¿Te gusta la primavera? | Do you like Spring? | Use | Do you like spring? |  |
| [#12046828](https://tatoeba.org/en/sentences/show/12046828) | Es otoño. | It is autumn. | Use |  |  |
| [#1327383](https://tatoeba.org/en/sentences/show/1327383) | Ahora es otoño. | It's fall now. | Use |  |  |
| [#875830](https://tatoeba.org/en/sentences/show/875830) | Voy a España en otoño. | I am going to Spain in the fall. | Use |  |  |
| [#332137](https://tatoeba.org/en/sentences/show/332137) | ¿Cuál es la fecha de hoy? | What is the date today? | Use |  |  |
| [#1391557](https://tatoeba.org/en/sentences/show/1391557) | ¿A qué fecha estamos hoy? | What is the date today? | Reject |  | "¿A qué fecha estamos?" is a regional (Río de la Plata) phrasing; the course's form is "¿Qué fecha es hoy?". |
| [#2270156](https://tatoeba.org/en/sentences/show/2270156) | ¿Qué fecha tiene la carta? | What's the date on the letter? | Use |  |  |
| [#463311](https://tatoeba.org/en/sentences/show/463311) | Este es mi sombrero en el verano. | This is my hat in the summer. | Reject |  | An odd line (my hat in the summer). |
| [#463313](https://tatoeba.org/en/sentences/show/463313) | Esta es mi casa en el invierno. | This is my house in the winter. | Reject |  | An odd line (my house in the winter). |
| [#711070](https://tatoeba.org/en/sentences/show/711070) | Tú habla primero, yo después. | You speak first; I will speak after. | Reject |  | "Tú habla" is not grammatical; it needs "Habla tú" or "Tú hablas". |
| [#811439](https://tatoeba.org/en/sentences/show/811439) | ¿Te gusta el verano? | Do you like summer? | Use |  |  |
| [#855441](https://tatoeba.org/en/sentences/show/855441) | El invierno es frío, pero me gusta. | Winter is cold, but I like it. | Use |  |  |
| [#9689558](https://tatoeba.org/en/sentences/show/9689558) | ¿Ya es invierno? | Is it winter already? | Use |  |  |
| [#10191140](https://tatoeba.org/en/sentences/show/10191140) | Ahora es marzo. | It's now March. | Use |  |  |
| [#10191148](https://tatoeba.org/en/sentences/show/10191148) | Ahora es julio. | It's now July. | Use |  |  |
| [#10669956](https://tatoeba.org/en/sentences/show/10669956) | ¡Yo primero! | I'll go in first! | Use | Me first! |  |
| [#10718264](https://tatoeba.org/en/sentences/show/10718264) | No me gusta la ciudad en invierno. | I don't like the city during the winter. | Use | I don't like the city in winter. |  |
| [#10815283](https://tatoeba.org/en/sentences/show/10815283) | Lleva un vestido amarillo de verano. | She is wearing a yellow summer dress. | Reject |  | "Lleva" as wears is a sense trap. |
| [#11164769](https://tatoeba.org/en/sentences/show/11164769) | Febrero no tiene treinta días. | February does not have thirty days. | Use |  |  |
| [#12046823](https://tatoeba.org/en/sentences/show/12046823) | Es verano. | It is summer. | Use |  |  |
| [#12046842](https://tatoeba.org/en/sentences/show/12046842) | Es invierno. | It's winter. | Use |  |  |
| [#12874752](https://tatoeba.org/en/sentences/show/12874752) | ¿A dónde vas este próximo verano? | Where will you go next summer? | Reject |  | "Este próximo verano" doubles the determiner; odd. |

## U72 · The Weather

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S72102 | No me gusta la lluvia. | I don't like the rain. | Keep | Swap: #854408, the same sentence. | Correct, natural, A1; the English matches. |
| S72103 | La lluvia es buena para el campo. | The rain is good for the countryside. | Keep |  | Correct, natural, A1; the English matches. |
| S72104 | ¿Qué tiempo hace hoy? | What's the weather like today? | Keep | Swap: #687357, the same sentence. | Correct and standard. In Mexico and Colombia "¿Cómo está el clima?" is heard more; worth the native checker's view. |
| S72105 | Hace calor. | It's hot. | Keep |  | Correct; hace for weather. See the senses note (hace, tiempo). |
| S72106 | Hace frío y llueve. | It's cold and it's raining. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#854408](https://tatoeba.org/en/sentences/show/854408) | No me gusta la lluvia. | I do not like the rain. | Use |  |  |
| [#11441483](https://tatoeba.org/en/sentences/show/11441483) | Me gusta escuchar la lluvia. | I like listening to the rain. | Use |  |  |
| [#687357](https://tatoeba.org/en/sentences/show/687357) | ¿Qué tiempo hace hoy? | What is the weather like today? | Use |  |  |
| [#456104](https://tatoeba.org/en/sentences/show/456104) | Hace mal tiempo. | It is bad weather. | Use | The weather is bad. |  |
| [#8791530](https://tatoeba.org/en/sentences/show/8791530) | ¿Qué tiempo hace esta mañana? | What's the weather like this morning? | Use |  |  |
| [#1305446](https://tatoeba.org/en/sentences/show/1305446) | Hace dos meses que no llueve. | It hasn't rained for two months. | Reject |  | "Hace dos meses que no llueve" (for two months) is a construction past A1. |
| [#463089](https://tatoeba.org/en/sentences/show/463089) | Hace mal tiempo. Hace frío y llueve. | There is bad weather. There it's cold and raining. | Reject |  | Two sentences; the English is clumsy. "Hace frío y llueve" is already a draft (S72106). |
| [#338916](https://tatoeba.org/en/sentences/show/338916) | Quiero un buen diccionario. | I want a good dictionary. | Use |  |  |
| [#346626](https://tatoeba.org/en/sentences/show/346626) | No tengo tiempo para leer libros. | I have no time to read books. | Use |  |  |
| [#356829](https://tatoeba.org/en/sentences/show/356829) | No sé qué hacer. | I don't know what to do. | Use |  |  |
| [#434215](https://tatoeba.org/en/sentences/show/434215) | Y ahora, ¿qué voy a hacer? | And now, what am I going to do? | Use |  |  |
| [#434647](https://tatoeba.org/en/sentences/show/434647) | ¿Nieva mucho aquí en el invierno? | Does it snow much here in winter? | Use |  |  |
| [#434677](https://tatoeba.org/en/sentences/show/434677) | Cada uno hace lo que quiere. | Each one does what he wishes. | Reject |  | "Cada uno hace lo que quiere" is a saying, with impersonal lo que. |
| [#435843](https://tatoeba.org/en/sentences/show/435843) | No tengo tiempo. | I have no time. | Use |  |  |
| [#436114](https://tatoeba.org/en/sentences/show/436114) | ¿Cómo se hace eso? | How do you make that? | Reject |  | Impersonal "se hace" is past A1. |
| [#436390](https://tatoeba.org/en/sentences/show/436390) | Busco un buen hotel. | I am looking for a good hotel. | Use |  |  |
| [#454056](https://tatoeba.org/en/sentences/show/454056) | Llueve mucho en junio. | It rains a lot in June. | Use |  |  |
| [#464539](https://tatoeba.org/en/sentences/show/464539) | ¿Qué hace por la tarde? | What do you do in the afternoon? | Use |  |  |
| [#464545](https://tatoeba.org/en/sentences/show/464545) | ¿Qué te gusta hacer? | What do you like to do? | Use |  |  |
| [#475741](https://tatoeba.org/en/sentences/show/475741) | Leer me hace feliz. | Reading makes me happy. | Use |  |  |
| [#576080](https://tatoeba.org/en/sentences/show/576080) | Hoy no hace mucho viento. | There isn't much wind today. | Use |  |  |
| [#581243](https://tatoeba.org/en/sentences/show/581243) | Va a llover esta tarde. | It is going to rain this afternoon. | Use |  |  |
| [#588288](https://tatoeba.org/en/sentences/show/588288) | No sé qué hacer ahora. | I don't know what to do now. | Use |  |  |
| [#597711](https://tatoeba.org/en/sentences/show/597711) | ¿Tienes tiempo pasado mañana? | Do you have time the day after tomorrow? | Reject |  | "Pasado mañana" is a set phrase (the day after tomorrow); pasado is taught as last. |
| [#602657](https://tatoeba.org/en/sentences/show/602657) | Hace mucho viento. | The wind is blowing hard. | Use | It's very windy. |  |
| [#606988](https://tatoeba.org/en/sentences/show/606988) | ¿Qué quieres hacer? | What do you want to do? | Use |  |  |
| [#607890](https://tatoeba.org/en/sentences/show/607890) | ¿Qué hace usted esta tarde? | What are you doing this evening? | Use | What are you doing this afternoon? |  |
| [#616037](https://tatoeba.org/en/sentences/show/616037) | ¿Por qué tengo que hacer eso? | Why do I have to do that? | Use |  |  |
| [#623776](https://tatoeba.org/en/sentences/show/623776) | Hace mucho frío. | It's very cold. | Use |  |  |
| [#646615](https://tatoeba.org/en/sentences/show/646615) | Se me hace que va a llover. | I have a hunch that it will rain. | Reject |  | "Se me hace que" is an idiom (I have a feeling). |
| [#647636](https://tatoeba.org/en/sentences/show/647636) | Hace bastante frío. | It's pretty cold. | Use |  |  |
| [#687483](https://tatoeba.org/en/sentences/show/687483) | ¿Qué tiempo hace en tu país ahora? | What's the weather in your country now? | Use |  |  |

## U38 · Thinking It Over

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S38101 | Pues sí. | Well, yes. | Keep |  | Correct; pues as the filler "well". The Glossary gloss for pues is "so, then"; see the senses note. |
| S38102 | Pues, un momento. | Well, one moment. | Keep |  | Correct, natural, A1; the English matches. |
| S38103 | Veamos el mapa. | Let's look at the map. | Keep |  | Correct; an imperative in a help circle, fine. |
| S38104 | Un segundo, por favor. | One second, please. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#12033047](https://tatoeba.org/en/sentences/show/12033047) | El inglés es mi segundo idioma. | English is my second language. | Reject |  | Segundo here is the ordinal; the circle teaches the time unit (un segundo), a sense trap. |
| [#529007](https://tatoeba.org/en/sentences/show/529007) | ¿Puedes ver lejos? | Can you see far? | Use |  |  |
| [#733910](https://tatoeba.org/en/sentences/show/733910) | Voy a ver a un amigo mañana. | I am seeing a friend tomorrow. | Use | I'm going to see a friend tomorrow. |  |
| [#738292](https://tatoeba.org/en/sentences/show/738292) | Quiero ver esta película. | I want to watch this film. | Use | I want to see this movie. |  |
| [#790794](https://tatoeba.org/en/sentences/show/790794) | No sé qué pensar. | I don't know what to think. | Use |  |  |
| [#855133](https://tatoeba.org/en/sentences/show/855133) | Quiero ver la película. | I want to watch the film. | Use | I want to see the movie. |  |
| [#859826](https://tatoeba.org/en/sentences/show/859826) | Pienso que es médico. | I think he is a doctor. | Use |  |  |
| [#871455](https://tatoeba.org/en/sentences/show/871455) | Es una chica guapa de ver. | She is a pretty girl to look at. | Reject |  | An odd line about a girl's looks. |
| [#2378858](https://tatoeba.org/en/sentences/show/2378858) | Yo también lo pienso. | I think so too. | Use |  |  |
| [#2738857](https://tatoeba.org/en/sentences/show/2738857) | No lo quiero ver. | I don't want to see him. | Use | I don't want to see it. |  |
| [#9884000](https://tatoeba.org/en/sentences/show/9884000) | Quiero ver tu casa. | I want to see your house. | Use |  |  |
| [#10352368](https://tatoeba.org/en/sentences/show/10352368) | A ver qué tienes aquí. | Let's see what you have there. | Reject |  | "A ver" is an idiom (let's see). |
| [#10500662](https://tatoeba.org/en/sentences/show/10500662) | Yo pienso que sí. | I think so. | Use |  |  |
| [#10518784](https://tatoeba.org/en/sentences/show/10518784) | ¿Me puede ver? | Can she see me? | Use | Can you see me? |  |
| [#10691383](https://tatoeba.org/en/sentences/show/10691383) | ¡Quiero ver! | I want to see! | Use |  |  |
| [#11167607](https://tatoeba.org/en/sentences/show/11167607) | Ya no sé qué pensar. | I don't know what to think any more. | Use | I don't know what to think anymore. |  |
| [#12874637](https://tatoeba.org/en/sentences/show/12874637) | Yo pienso que Tom hace eso. | I think that Tom does that. | Use |  |  |
| [#12947812](https://tatoeba.org/en/sentences/show/12947812) | No pienso en el pasado. | I don't think about the old days. | Reject |  | "El pasado" the noun; pasado is taught as the adjective last. |
| [#13695509](https://tatoeba.org/en/sentences/show/13695509) | Quiero ver a Tom bailar. | I want to see Tom dance. | Use |  |  |
| [#13905053](https://tatoeba.org/en/sentences/show/13905053) | ¿No lo quieres ver? | Don't you want to see him? | Use | Don't you want to see it? |  |
| [#14105776](https://tatoeba.org/en/sentences/show/14105776) | ¿Quieres ver a mi gato? | Do you want to see my cat? | Use |  |  |

## U64 · Making Plans

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S64101 | ¿Vamos al concierto el sábado? | Shall we go to the concert on Saturday? | Keep |  | Correct, natural, A1; the English matches. |
| S64102 | El concierto es el viernes. | The concert is on Friday. | Keep |  | Correct, natural, A1; the English matches. |
| S64103 | ¿Vamos a la discoteca? | Shall we go to the club? | Keep |  | Correct; discoteca is understood everywhere, Mexicans say antro, fine. |
| S64104 | No me gusta la discoteca. | I don't like the club. | Keep |  | Correct, natural, A1; the English matches. |
| S64105 | Vamos a la discoteca el sábado. | We're going to the club on Saturday. | Keep |  | Correct, natural, A1; the English matches. |
| S64106 | ¿Vienes al cine? | Are you coming to the movies? | Keep |  | Correct, natural, A1; the English matches. |
| S64107 | Sí, ¿a qué hora? | Yes, at what time? | Keep |  | Correct, natural, A1; the English matches. |
| S64108 | Nos vemos a las ocho. | See you at eight. | Keep |  | Correct; "Nos vemos" is the Latin American see-you. |
| S64109 | Nos vemos en la plaza. | See you in the square. | Keep |  | Correct, natural, A1; the English matches. |
| S64110 | ¿Quieres ir al cine mañana? | Do you want to go to the movies tomorrow? | Keep |  | Correct, natural, A1; the English matches. |
| S64111 | Sí, estoy libre mañana. | Yes, I'm free tomorrow. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#860208](https://tatoeba.org/en/sentences/show/860208) | Él va al concierto. | He is going to the concert. | Use |  |  |
| [#355057](https://tatoeba.org/en/sentences/show/355057) | El próximo domingo hay un concierto. | There will be a concert next Sunday. | Use | There's a concert next Sunday. |  |
| [#978778](https://tatoeba.org/en/sentences/show/978778) | ¿Vienes o no? | Are you coming or not? | Use |  |  |
| [#1391704](https://tatoeba.org/en/sentences/show/1391704) | ¿Cuándo vienes? | When do you come? | Use | When are you coming? |  |
| [#2831](https://tatoeba.org/en/sentences/show/2831) | ¿De dónde vienes? | Where are you from? | Use | Where are you coming from? |  |
| [#2824](https://tatoeba.org/en/sentences/show/2824) | ¿Nos vemos mañana? | We're meeting up tomorrow? | Use | Shall we meet tomorrow? |  |
| [#336331](https://tatoeba.org/en/sentences/show/336331) | Nos vemos a la próxima. | See you again. | Reject |  | "A la próxima" is an idiom (next time). |
| [#620465](https://tatoeba.org/en/sentences/show/620465) | Buen día. Nos vemos pronto. | Good day. See you soon. | Reject |  | Two sentences. |
| [#774793](https://tatoeba.org/en/sentences/show/774793) | ¿Quieres ir? | You want to go? | Use | Do you want to go? |  |
| [#2349703](https://tatoeba.org/en/sentences/show/2349703) | No puedes ir. | You can't go. | Use |  |  |
| [#454134](https://tatoeba.org/en/sentences/show/454134) | Tienes que ir. | You have to go. | Use |  |  |
| [#434239](https://tatoeba.org/en/sentences/show/434239) | ¿Está libre? | Are you free? | Use |  |  |
| [#455916](https://tatoeba.org/en/sentences/show/455916) | No estoy libre. | I'm not free. | Use |  |  |
| [#627515](https://tatoeba.org/en/sentences/show/627515) | Hoy estoy libre. | I'm free today. | Use |  |  |
| [#329893](https://tatoeba.org/en/sentences/show/329893) | Hoy no me viene bien. | Today is not good for me. | Reject |  | "Me viene bien" is an idiom (suits me). |
| [#342942](https://tatoeba.org/en/sentences/show/342942) | ¿Por qué no puedes venir? | Why can't you come? | Use |  |  |
| [#345187](https://tatoeba.org/en/sentences/show/345187) | Nos vemos mañana en la escuela. | See you tomorrow at school. | Use |  |  |
| [#345807](https://tatoeba.org/en/sentences/show/345807) | Vemos con los ojos. | We see with our eyes. | Use |  |  |
| [#346660](https://tatoeba.org/en/sentences/show/346660) | Tú te ves joven para tu edad. | You look young for your age. | Reject |  | "Te ves joven" is look, a sense trap for ver. |
| [#356694](https://tatoeba.org/en/sentences/show/356694) | Quiero ir a la fiesta. | I would love to attend the party. | Use | I want to go to the party. |  |
| [#356802](https://tatoeba.org/en/sentences/show/356802) | ¿Por qué no vienes a mi fiesta? | Would you like to come to my party? | Use | Why don't you come to my party? |  |
| [#358639](https://tatoeba.org/en/sentences/show/358639) | Después del sábado viene el domingo. | After Saturday comes Sunday. | Use |  |  |
| [#358675](https://tatoeba.org/en/sentences/show/358675) | ¿A dónde vamos? | Where are we going? | Use |  |  |
| [#456302](https://tatoeba.org/en/sentences/show/456302) | Vamos a la playa. | Let's go to the beach. | Use |  |  |
| [#490671](https://tatoeba.org/en/sentences/show/490671) | Voy a salir esta tarde. | I'm going to go out this afternoon. | Use |  |  |
| [#493756](https://tatoeba.org/en/sentences/show/493756) | La primavera viene después del invierno. | Spring comes after winter. | Use |  |  |
| [#538832](https://tatoeba.org/en/sentences/show/538832) | Tengo que ir a la escuela. | I have to go to school. | Use |  |  |
| [#581241](https://tatoeba.org/en/sentences/show/581241) | Vamos a nadar en el río. | Let's go and swim in the river. | Use | Let's go swim in the river. |  |
| [#590765](https://tatoeba.org/en/sentences/show/590765) | Te veo de nuevo mañana. | See you again tomorrow. | Reject |  | "De nuevo" (again) is an idiom. |
| [#602591](https://tatoeba.org/en/sentences/show/602591) | Tiene mucho tiempo que no te veo. | It is a long time since I saw you last. | Reject |  | "Tiene mucho tiempo que no te veo" is a construction past A1. |
| [#619188](https://tatoeba.org/en/sentences/show/619188) | No puede venir, está enfermo. | He cannot come, he is ill. | Use | He can't come, he's sick. |  |
| [#627347](https://tatoeba.org/en/sentences/show/627347) | Vamos al cine. | We are going to the cinema. | Use | We're going to the movies. |  |
| [#632081](https://tatoeba.org/en/sentences/show/632081) | ¿Cuándo puedes venir? | What time can you come? | Use | When can you come? |  |
| [#699004](https://tatoeba.org/en/sentences/show/699004) | Voy a salir. | I'm going out. | Use |  |  |
| [#700233](https://tatoeba.org/en/sentences/show/700233) | ¿Te quieres ir? | Do you want to go? | Use | Do you want to leave? |  |
| [#710508](https://tatoeba.org/en/sentences/show/710508) | Te veo mañana en la escuela. | See you tomorrow at school. | Use |  |  |
| [#733110](https://tatoeba.org/en/sentences/show/733110) | Quiero ir a ver una película. | I want to go to see a film. | Use | I want to go see a movie. |  |
| [#738648](https://tatoeba.org/en/sentences/show/738648) | Ya me tengo que ir. | I have to leave now. | Use | I have to go now. |  |
| [#740628](https://tatoeba.org/en/sentences/show/740628) | Eso me viene bien. | That suits me all right. | Reject |  | "Me viene bien" is an idiom. |

## U65 · My Day

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S65102 | Me levanto temprano. | I get up early. | Keep | Swap: #1110905 "Normalmente me levanto temprano." (show "I usually get up early.") | Correct, natural, A1; the English matches. |
| S65103 | Es difícil levantarse temprano. | It's hard to get up early. | Keep | Swap: #13687273 "Tom tiene que levantarse temprano mañana." | Correct, natural, A1; the English matches. |
| S65104 | Me ducho por la mañana. | I shower in the morning. | Keep |  | Correct; "en la mañana" is the commoner Latin American form, "por la mañana" is fine everywhere. |
| S65105 | Me ducho todos los días. | I shower every day. | Keep | Swap: #860145 "Me ducho cada noche." (show "I shower every night.") | Correct. Latin Americans more often say "me baño" for a shower; ducharse is understood and is the course's word. |
| S65106 | Me ducho y desayuno. | I shower and have breakfast. | Keep |  | Correct, natural, A1; the English matches. |
| S65107 | Es bueno ducharse todos los días. | It's good to shower every day. | Keep |  | Correct, natural, A1; the English matches. |
| S65108 | Tom va a ducharse. | Tom is going to take a shower. | Keep |  | Correct, natural, A1; the English matches. |
| S65109 | Tom quiere ducharse ahora. | Tom wants to take a shower now. | Keep |  | Correct, natural, A1; the English matches. |
| S65110 | Termino a las cinco. | I finish at five. | Keep |  | Correct, natural, A1; the English matches. |
| S65111 | Termino tarde los viernes. | I finish late on Fridays. | Keep |  | Correct; tarde the adverb (late). The Glossary gloss for tarde is the noun "afternoon"; see the senses note. |
| S65112 | Hoy termino temprano. | Today I finish early. | Keep |  | Correct, natural, A1; the English matches. |
| S65113 | Quiero terminar pronto. | I want to finish soon. | Keep |  | Correct, natural, A1; the English matches. |
| S65114 | Voy a terminar el libro. | I'm going to finish the book. | Keep |  | Correct, natural, A1; the English matches. |
| S65115 | Vuelvo a casa a las seis. | I come home at six. | Keep |  | Correct; "Vuelvo a casa" reads as I get back home; the English fits. |
| S65116 | La cena es a las nueve. | Dinner is at nine. | Keep |  | Correct, natural, A1; the English matches. |
| S65117 | ¿A qué hora es la cena? | What time is dinner? | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#1355301](https://tatoeba.org/en/sentences/show/1355301) | Yo no me levanto temprano. | I do not get up early. | Use |  |  |
| [#1110905](https://tatoeba.org/en/sentences/show/1110905) | Normalmente me levanto temprano. | I usually get up early in the morning. | Use | I usually get up early. |  |
| [#13687273](https://tatoeba.org/en/sentences/show/13687273) | Tom tiene que levantarse temprano mañana. | Tom has to get up early tomorrow. | Use |  |  |
| [#1165494](https://tatoeba.org/en/sentences/show/1165494) | Tom no tiene que levantarse temprano mañana. | Tom doesn't have to get up early tomorrow. | Use |  |  |
| [#860145](https://tatoeba.org/en/sentences/show/860145) | Me ducho cada noche. | I have a shower every night. | Use | I shower every night. |  |
| [#2753025](https://tatoeba.org/en/sentences/show/2753025) | Esto nunca va a terminar. | This is never going to end. | Reject |  | A gloomy line. |
| [#4413094](https://tatoeba.org/en/sentences/show/4413094) | Vuelvo en un mes. | I'll be back in a month. | Use | I'll be back in a month. |  |
| [#507330](https://tatoeba.org/en/sentences/show/507330) | Te vuelvo a llamar. | I'll call you back. | Reject |  | "Volver a" plus infinitive (again) is an idiom. |
| [#687819](https://tatoeba.org/en/sentences/show/687819) | ¿Con quién cena usted? | With whom are you eating dinner? | Use | Who are you having dinner with? |  |
| [#437028](https://tatoeba.org/en/sentences/show/437028) | Quiero eso para luego. | I want that later. | Reject |  | An odd line (I want that for later). |
| [#482090](https://tatoeba.org/en/sentences/show/482090) | Ellos están por empezar. | They are about to start. | Reject |  | "Estar por" (be about to) is past A1. |
| [#562696](https://tatoeba.org/en/sentences/show/562696) | Quiero cenar en un restaurante. | I wanna have dinner in a restaurant. | Use | I want to have dinner at a restaurant. |  |
| [#618138](https://tatoeba.org/en/sentences/show/618138) | ¿Qué quiere usted desayunar? | What would you like for breakfast? | Use | What do you want for breakfast? |  |
| [#627423](https://tatoeba.org/en/sentences/show/627423) | ¿Qué quieres para desayunar? | What do you want for breakfast? | Use |  |  |
| [#663859](https://tatoeba.org/en/sentences/show/663859) | ¿Y luego? | And then? | Use |  |  |
| [#687457](https://tatoeba.org/en/sentences/show/687457) | ¿Qué hay para cenar? | What's for dinner? | Use |  |  |
| [#726553](https://tatoeba.org/en/sentences/show/726553) | No voy a volver. | I'm not going back. | Use |  |  |
| [#730304](https://tatoeba.org/en/sentences/show/730304) | ¿Con cuál empiezo? | Which shall I begin with? | Use | Which one do I start with? |  |
| [#853297](https://tatoeba.org/en/sentences/show/853297) | Nos vemos luego. | See you again. | Use | See you later. |  |
| [#853809](https://tatoeba.org/en/sentences/show/853809) | ¿Qué hago con esto? | What shall I do with it? | Use | What do I do with this? |  |
| [#868660](https://tatoeba.org/en/sentences/show/868660) | Hago deporte todos los días. | I play sports every day. | Use |  |  |
| [#872264](https://tatoeba.org/en/sentences/show/872264) | ¿De quién es esta comida? | Whose food is this? | Use |  |  |
| [#977789](https://tatoeba.org/en/sentences/show/977789) | No quiero volver. | I don't wanna go back. | Use | I don't want to go back. |  |
| [#994803](https://tatoeba.org/en/sentences/show/994803) | Este dinero es para comprar comida. | This money is to buy food. | Use |  |  |
| [#1048191](https://tatoeba.org/en/sentences/show/1048191) | ¿Cuándo empiezo? | When do I get started? | Use | When do I start? |  |
| [#1102958](https://tatoeba.org/en/sentences/show/1102958) | ¿Quieres ir hoy a cenar? | Do you want to go to dinner today? | Use | Do you want to go out for dinner today? |  |
| [#1125216](https://tatoeba.org/en/sentences/show/1125216) | El chico no tiene comida. | The boy has no food. | Use |  |  |
| [#1148428](https://tatoeba.org/en/sentences/show/1148428) | Ellos beben café luego de la comida. | They drink coffee after lunch. | Use |  |  |
| [#1152384](https://tatoeba.org/en/sentences/show/1152384) | Siempre es difícil empezar una carta. | It's always difficult to start a letter. | Use |  |  |
| [#1179165](https://tatoeba.org/en/sentences/show/1179165) | La escuela empieza en primavera. | School begins in spring. | Use |  |  |
| [#1288054](https://tatoeba.org/en/sentences/show/1288054) | No. Lo siento, tengo que volver pronto. | No. I'm sorry, I've got to go back early. | Reject |  | Two sentences; the first "No." hangs. |
| [#1418149](https://tatoeba.org/en/sentences/show/1418149) | ¿Qué hago yo con esto? | What am I supposed to do with that? | Reject |  | A near duplicate of #853809 with a sharper English. |
| [#1567439](https://tatoeba.org/en/sentences/show/1567439) | No sé por dónde empezar. | I don't know where to start. | Use |  |  |
| [#2002676](https://tatoeba.org/en/sentences/show/2002676) | La comida está buena. | The food is good. | Use |  |  |

## U73 · Hobbies

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S73101 | Corro en el parque. | I run in the park. | Keep |  | Correct, natural, A1; the English matches. |
| S73102 | Me gusta la gimnasia. | I like gymnastics. | Keep |  | Correct, natural, A1; the English matches. |
| S73103 | Hago gimnasia los lunes. | I do gymnastics on Mondays. | Keep |  | Correct; in Latin America baloncesto is "básquetbol". See the senses note. |
| S73104 | La clase de gimnasia es a las seis. | The gymnastics class is at six. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#339792](https://tatoeba.org/en/sentences/show/339792) | No, pero juego al tenis. | No, but I play tennis. | Use |  |  |
| [#359873](https://tatoeba.org/en/sentences/show/359873) | Tom puede correr rápido. | Tom can run fast. | Use |  |  |
| [#436732](https://tatoeba.org/en/sentences/show/436732) | Me gusta comprar por internet. | I like shopping on the internet. | Use |  |  |
| [#663692](https://tatoeba.org/en/sentences/show/663692) | Él está cansado de ver la televisión. | He is tired of watching television. | Use |  |  |
| [#692844](https://tatoeba.org/en/sentences/show/692844) | ¿Te gusta el baloncesto? | Do you like basketball? | Use |  |  |
| [#703105](https://tatoeba.org/en/sentences/show/703105) | Me gusta correr. | I like to run. | Use |  |  |
| [#738502](https://tatoeba.org/en/sentences/show/738502) | Juega bien al tenis. | He is good at playing tennis. | Use | He plays tennis well. |  |
| [#743467](https://tatoeba.org/en/sentences/show/743467) | Veo la televisión todo el día. | I watch television all day long. | Use |  |  |
| [#764283](https://tatoeba.org/en/sentences/show/764283) | ¿Hay una televisión en la casa? | Is there a television in the house? | Use |  |  |
| [#793352](https://tatoeba.org/en/sentences/show/793352) | Quiero ir a esquiar con ella. | I want to go skiing with her. | Use |  |  |
| [#813064](https://tatoeba.org/en/sentences/show/813064) | Y ahora: trece horas sin internet. | And now: thirteen hours without internet. | Reject |  | A fragment with a colon. |
| [#854722](https://tatoeba.org/en/sentences/show/854722) | Me gusta jugar al baloncesto. | I like to play basketball. | Use |  |  |
| [#858197](https://tatoeba.org/en/sentences/show/858197) | ¿Quieres jugar al tenis con nosotros? | Do you want to play tennis with us? | Use |  |  |
| [#859087](https://tatoeba.org/en/sentences/show/859087) | Yo juego tenis. | I play tennis. | Use |  |  |
| [#860507](https://tatoeba.org/en/sentences/show/860507) | Me gusta nadar y jugar al baloncesto. | I like swimming and playing basketball. | Use |  |  |
| [#861572](https://tatoeba.org/en/sentences/show/861572) | Puedes ver la televisión después de cenar. | You can watch television after dinner. | Use |  |  |
| [#864220](https://tatoeba.org/en/sentences/show/864220) | Él no puede correr muy rápido. | He can't run very fast. | Use |  |  |
| [#1105899](https://tatoeba.org/en/sentences/show/1105899) | Veo televisión todos los días. | I watch television every day. | Use |  |  |
| [#1230244](https://tatoeba.org/en/sentences/show/1230244) | Él siempre lee una revista. | He always reads a magazine. | Use |  |  |
| [#1935057](https://tatoeba.org/en/sentences/show/1935057) | Este juego es muy difícil. | This game is so hard. | Reject |  | Juego here is the noun (game); the circle teaches juego as I play, a sense trap. |
| [#3428011](https://tatoeba.org/en/sentences/show/3428011) | Mi amigo no juega al tenis. | My friend doesn't play tennis. | Use |  |  |
| [#7031507](https://tatoeba.org/en/sentences/show/7031507) | Hoy quiero correr por la playa. | Today, I want to run on the beach. | Use | Today I want to run on the beach. |  |
| [#8297384](https://tatoeba.org/en/sentences/show/8297384) | Me gusta mucho jugar al tenis. | I really enjoy playing tennis. | Use | I really like playing tennis. |  |
| [#8887227](https://tatoeba.org/en/sentences/show/8887227) | ¿Cómo se llama este juego? | What is this game called? | Reject |  | Juego as the noun (game), a sense trap. |
| [#12846041](https://tatoeba.org/en/sentences/show/12846041) | Yo no tengo un radio. | I don't have a radio. | Use |  |  |

## U66 · Signs + Notices

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S66101 | ¿Dónde está la entrada? | Where is the entrance? | Keep | Swap: #687647, the same sentence. | Correct, natural, A1; the English matches. |
| S66102 | La entrada está allí. | The entrance is there. | Keep |  | Correct, natural, A1; the English matches. |
| S66103 | La salida está allí. | The exit is there. | Keep |  | Correct, natural, A1; the English matches. |
| S66104 | Esta es la salida. | This is the exit. | Keep | Swap: #687649 "¿Dónde está la salida?" (show "Where is the exit?"); S66103 then answers it. | Correct, natural, A1; the English matches. |
| S66105 | La farmacia está cerrada. | The pharmacy is closed. | Keep |  | Correct, natural, A1; the English matches. |
| S66106 | ¿Dónde está el ascensor? | Where is the elevator? | Keep | Swap: #355012, the same sentence. | Correct, natural, A1; the English matches. |
| S66107 | ¿Dónde está la escalera? | Where are the stairs? | Keep |  | Correct; singular escalera for the stairs, plural English, as Spanish has it. |
| S66108 | La escalera está allí. | The stairs are there. | Keep |  | Correct, natural, A1; the English matches. |
| S66109 | No hay ascensor, pero hay escalera. | There's no elevator, but there are stairs. | Keep |  | Correct, natural, A1; the English matches. |
| S66110 | Vivo en la planta tres. | I live on the third floor. | Keep | Swap: #676394 "Vivo en la planta baja." (show "I live on the ground floor.") | Correct Spanish. In Latin America floors are "piso" ("Vivo en el piso tres"); planta is Spain's word except in "planta baja", which is everywhere. See the senses note. |
| S66111 | La tienda está en la planta dos. | The shop is on the second floor. | Keep |  | Correct Spanish; "piso dos" in Latin America. See S66110. |
| S66112 | ¿En qué planta está el restaurante? | Which floor is the restaurant on? | Keep |  | Correct Spanish; "¿En qué piso?" in Latin America. See S66110. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#687647](https://tatoeba.org/en/sentences/show/687647) | ¿Dónde está la entrada? | Where is the entrance? | Use |  |  |
| [#8678036](https://tatoeba.org/en/sentences/show/8678036) | No hay salida. | There's no way out. | Use |  |  |
| [#687649](https://tatoeba.org/en/sentences/show/687649) | ¿Dónde está la salida? | Where is the way out? | Use | Where is the exit? |  |
| [#355012](https://tatoeba.org/en/sentences/show/355012) | ¿Dónde está el ascensor? | Where is the elevator? | Use |  |  |
| [#456066](https://tatoeba.org/en/sentences/show/456066) | ¿Hay ascensor? | Is there an elevator? | Use | Is there an elevator? |  |
| [#687701](https://tatoeba.org/en/sentences/show/687701) | ¿Qué planta es? | Which floor is it? | Use |  |  |
| [#676394](https://tatoeba.org/en/sentences/show/676394) | Vivo en la planta baja. | I live on the bottom floor. | Use | I live on the ground floor. |  |
| [#11035145](https://tatoeba.org/en/sentences/show/11035145) | Está en la planta baja. | It's on the ground floor. | Use |  |  |
| [#343646](https://tatoeba.org/en/sentences/show/343646) | La puerta está abierta ahora. | The door is open now. | Use |  |  |
| [#356764](https://tatoeba.org/en/sentences/show/356764) | Él tiene mucho dinero en el banco. | He has plenty of money in the bank. | Use | He has a lot of money in the bank. |  |
| [#401606](https://tatoeba.org/en/sentences/show/401606) | Cierra la puerta, por favor. | Close the door, please. | Reject |  | Imperative; the circle is not a help or instruction circle. |
| [#456400](https://tatoeba.org/en/sentences/show/456400) | ¿Tengo que abrir todo? | Must I open everything? | Use | Do I have to open everything? |  |
| [#462901](https://tatoeba.org/en/sentences/show/462901) | El restaurante está en la planta baja. | The restaurant is on the ground floor. | Use |  |  |
| [#475884](https://tatoeba.org/en/sentences/show/475884) | Gracias por la información. | Thank you for the information. | Use |  |  |
| [#564464](https://tatoeba.org/en/sentences/show/564464) | Voy al banco. | I'm going to the bank. | Use |  |  |
| [#582428](https://tatoeba.org/en/sentences/show/582428) | Esta puerta no se abre. | This door will not open. | Reject |  | Impersonal "se abre" is past A1, and the English shifts to won't. |
| [#639602](https://tatoeba.org/en/sentences/show/639602) | El museo no se abre los lunes. | The museum is not open on Monday. | Reject |  | Impersonal "se abre", and the English says "is not open" for "does not open". |
| [#687519](https://tatoeba.org/en/sentences/show/687519) | ¿Cuándo abre? | When does it open? | Use |  |  |
| [#853530](https://tatoeba.org/en/sentences/show/853530) | Abre los ojos por favor. | Open your eyes, please. | Reject |  | Imperative; the circle is not a help or instruction circle. |
| [#916174](https://tatoeba.org/en/sentences/show/916174) | ¿Hay un banco cerca de la estación? | Is there a bank near the station? | Use |  |  |
| [#951274](https://tatoeba.org/en/sentences/show/951274) | ¿Dónde está el banco? | Where is the bank? | Use |  |  |
| [#1343324](https://tatoeba.org/en/sentences/show/1343324) | Ahora tengo que ir al banco. | I have to go to the bank now. | Use |  |  |
| [#1348376](https://tatoeba.org/en/sentences/show/1348376) | La puerta no cierra. | The door won't close. | Use |  |  |
| [#1398317](https://tatoeba.org/en/sentences/show/1398317) | La puerta está cerrada. | The door is closed. | Use |  |  |
| [#1422148](https://tatoeba.org/en/sentences/show/1422148) | Soy yo, abre la puerta. | It's me, open the door. | Reject |  | Imperative; the circle is not a help or instruction circle. |
| [#1905936](https://tatoeba.org/en/sentences/show/1905936) | Los jueves no abre la tienda. | The store is not open on Thursdays. | Use | The shop doesn't open on Thursdays. |  |
| [#2927161](https://tatoeba.org/en/sentences/show/2927161) | Ella abre la puerta. | She opens the door. | Use |  |  |
| [#4436218](https://tatoeba.org/en/sentences/show/4436218) | Ahora voy a cerrar la puerta. | I'm going to close the door now. | Use |  |  |
| [#8674957](https://tatoeba.org/en/sentences/show/8674957) | La botella está cerrada. | The bottle is closed. | Use |  |  |
| [#8678045](https://tatoeba.org/en/sentences/show/8678045) | Está abierta. | It's open. | Use |  |  |
| [#9001658](https://tatoeba.org/en/sentences/show/9001658) | Tom, abre la puerta, por favor. | Tom, please open the door. | Reject |  | Imperative; the circle is not a help or instruction circle. |
| [#9816919](https://tatoeba.org/en/sentences/show/9816919) | Solo cierra los ojos. | Just close your eyes. | Reject |  | Imperative; the circle is not a help or instruction circle. |
| [#10683399](https://tatoeba.org/en/sentences/show/10683399) | Es muy abierta. | She's very open. | Reject |  | Abierta as open-minded, a sense trap. |

## U67 · Timetables

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S67101 | El horario está en la estación. | The timetable is at the station. | Keep | Swap: #12029376 "¿Dónde está el horario?" | Correct, natural, A1; the English matches. |
| S67102 | Un boleto de ida, por favor. | A one-way ticket, please. | Keep |  | Correct; boleto is the Latin American word, good. |
| S67103 | Quiero un boleto de ida. | I want a one-way ticket. | Keep |  | Correct, natural, A1; the English matches. |
| S67104 | Un boleto de ida y vuelta, por favor. | A round-trip ticket, please. | Keep |  | Correct; "de ida y vuelta" is understood everywhere (Mexico also says "viaje redondo"). |
| S67105 | Quiero un boleto de ida y vuelta. | I want a round-trip ticket. | Keep |  | Correct, natural, A1; the English matches. |
| S67106 | ¿Cuánto cuesta el boleto de ida y vuelta? | How much is the round-trip ticket? | Keep |  | Correct, natural, A1; the English matches. |
| S67107 | Voy en barco. | I'm going by boat. | Keep |  | Correct, natural, A1; the English matches. |
| S67108 | El barco sale a las diez. | The boat leaves at ten. | Keep |  | Correct, natural, A1; the English matches. |
| S67109 | Me gusta viajar en barco. | I like traveling by boat. | Keep |  | Correct, natural, A1; the English matches. |
| S67110 | El barco está en el puerto. | The boat is in the port. | Keep |  | Correct, natural, A1; the English matches. |
| S67111 | El puerto está cerca. | The port is nearby. | Keep |  | Correct, natural, A1; the English matches. |
| S67112 | ¿Dónde está el puerto? | Where is the port? | Keep |  | Correct, natural, A1; the English matches. |
| S67113 | ¿A qué hora sale el tren? | What time does the train leave? | Keep |  | Correct, natural, A1; the English matches. |
| S67114 | El tren sale a las ocho. | The train leaves at eight. | Keep |  | Correct, natural, A1; the English matches. |
| S67115 | El tren llega a las diez. | The train arrives at ten. | Keep | Swap: #2002654 "El tren llega tarde." | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#679556](https://tatoeba.org/en/sentences/show/679556) | ¿Tienes el horario? | Do you have the schedule? | Use |  |  |
| [#12029376](https://tatoeba.org/en/sentences/show/12029376) | ¿Dónde está el horario? | Where is the schedule? | Use |  |  |
| [#8300382](https://tatoeba.org/en/sentences/show/8300382) | ¿Cuál es tu horario para mañana? | What's your schedule for tomorrow? | Use |  |  |
| [#336341](https://tatoeba.org/en/sentences/show/336341) | ¿De dónde sale? | Where does it leave from? | Use |  |  |
| [#343923](https://tatoeba.org/en/sentences/show/343923) | Ella no sale mucho. | She doesn't get outdoors much. | Use | She doesn't go out much. |  |
| [#354925](https://tatoeba.org/en/sentences/show/354925) | Él sale ahora en la radio. | He is on the radio. | Reject |  | "Sale en la radio" is on the radio, a sense trap for salir. |
| [#7292934](https://tatoeba.org/en/sentences/show/7292934) | Llega temprano. | Be early. | Reject |  | Reads as an imperative (Be early); ambiguous. |
| [#2002654](https://tatoeba.org/en/sentences/show/2002654) | El tren llega tarde. | The train is late. | Use |  |  |
| [#11510375](https://tatoeba.org/en/sentences/show/11510375) | Siempre llega tarde. | He is always late. | Use | He's always late. |  |
| [#339523](https://tatoeba.org/en/sentences/show/339523) | Yo no tengo tiempo para viajar. | I don't have time to travel. | Use |  |  |
| [#358270](https://tatoeba.org/en/sentences/show/358270) | Ya llega el invierno. | Winter is coming soon. | Use | Winter is coming. |  |
| [#434293](https://tatoeba.org/en/sentences/show/434293) | ¿A qué hora llega el próximo tren? | At which hour is the next train arriving? | Use | What time does the next train arrive? |  |
| [#435095](https://tatoeba.org/en/sentences/show/435095) | Aquí está mi boleto. | Here is my air ticket. | Use | Here's my ticket. |  |
| [#436226](https://tatoeba.org/en/sentences/show/436226) | ¿Cuánto cuesta el boleto? | How much is the ticket? | Use |  |  |
| [#574561](https://tatoeba.org/en/sentences/show/574561) | Estoy ahora en el aeropuerto. | I'm at the airport now. | Use |  |  |
| [#612534](https://tatoeba.org/en/sentences/show/612534) | ¿Dónde está la parada de autobús? | Where's the bus stop? | Use |  |  |
| [#642357](https://tatoeba.org/en/sentences/show/642357) | El autobús sale en cinco minutos. | The bus leaves in five minutes. | Use |  |  |
| [#732638](https://tatoeba.org/en/sentences/show/732638) | Todo tiene que llegar a un fin. | All things must have an end. | Reject |  | A proverb. |
| [#783653](https://tatoeba.org/en/sentences/show/783653) | No tengo boleto. | I don't have a ticket. | Use |  |  |
| [#790368](https://tatoeba.org/en/sentences/show/790368) | Cerca hay una parada de autobús. | There is a bus stop near by. | Use | There's a bus stop nearby. |  |
| [#791920](https://tatoeba.org/en/sentences/show/791920) | Es muy malo no llegar a tiempo. | Not coming on time is very bad. | Reject |  | A preachy line with "a tiempo" (on time), an idiom. |
| [#838588](https://tatoeba.org/en/sentences/show/838588) | Quiero viajar en avión. | I want to travel by airplane. | Use |  |  |
| [#853868](https://tatoeba.org/en/sentences/show/853868) | En avión, por favor. | By plane, please. | Use |  |  |
| [#857602](https://tatoeba.org/en/sentences/show/857602) | ¿Cuándo sale el próximo tren? | When does the next train leave? | Use |  |  |
| [#862939](https://tatoeba.org/en/sentences/show/862939) | ¡Voy a llegar tarde a la escuela! | I'm going to be late for school! | Use |  |  |
| [#864187](https://tatoeba.org/en/sentences/show/864187) | Perdona por llegar tarde. | Sorry for being late. | Use |  |  |
| [#914922](https://tatoeba.org/en/sentences/show/914922) | Me gusta viajar por tren. | I like to travel by train. | Use | I like traveling by train. |  |
| [#995172](https://tatoeba.org/en/sentences/show/995172) | ¿Dónde está el aeropuerto? | Where's the airport? | Use |  |  |
| [#999668](https://tatoeba.org/en/sentences/show/999668) | El aeropuerto está cerca. | The airport is close at hand. | Use | The airport is nearby. |  |
| [#1075459](https://tatoeba.org/en/sentences/show/1075459) | Aquí hay una parada de autobús. | There's a bus stop here. | Use |  |  |
| [#1287860](https://tatoeba.org/en/sentences/show/1287860) | Este autobús te lleva al aeropuerto. | This bus will take you to the airport. | Use | This bus takes you to the airport. |  |
| [#1415451](https://tatoeba.org/en/sentences/show/1415451) | No quiero llegar tarde. | I don't want to be late. | Use |  |  |
| [#2002653](https://tatoeba.org/en/sentences/show/2002653) | El tren llega temprano. | The train is early. | Use |  |  |
| [#2684502](https://tatoeba.org/en/sentences/show/2684502) | Voy a ir en avión. | I will go there by plane. | Use | I'm going to go by plane. |  |

## U74 · Looks + Character

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S74101 | Tengo un caballo marrón. | I have a brown horse. | Keep | Swap: #12013851, the same sentence. | Correct. In Mexico the everyday word for brown is café; marrón is the course's word, fine. |
| S74102 | El cielo está gris. | The sky is gray. | Keep | Swap: #11928157, the same sentence. | Correct, natural, A1; the English matches. |
| S74103 | Tengo un gato gris. | I have a gray cat. | Keep | Swap: #10367301 "Tengo el pelo gris." | Correct, natural, A1; the English matches. |
| S74104 | Tiene los ojos claros. | She has light eyes. | Keep |  | Correct; "ojos claros" is light eyes; the Glossary gloss for claro is the interjection "of course" (W880). See the senses note. |
| S74105 | Tengo los ojos claros. | I have light eyes. | Keep |  | Correct, natural, A1; the English matches. |
| S74106 | Sus ojos son claros. | His eyes are light. | Keep |  | Correct, natural, A1; the English matches. |
| S74107 | Tiene los ojos oscuros. | He has dark eyes. | Keep |  | Correct, natural, A1; the English matches. |
| S74108 | Sus ojos son oscuros. | Her eyes are dark. | Keep |  | Correct, natural, A1; the English matches. |
| S74109 | Tengo los ojos oscuros. | I have dark eyes. | Keep |  | Correct, natural, A1; the English matches. |
| S74110 | Tom tiene bigote. | Tom has a mustache. | Keep | Swap: #12938217, the same sentence. | Correct, natural, A1; the English matches. |
| S74111 | Él tiene bigote y barba. | He has a mustache and a beard. | Keep | Swap: #8493924 "Él tiene bigote." | Correct, natural, A1; the English matches. |
| S74112 | El profesor tiene un bigote negro. | The teacher has a black mustache. | Keep |  | Correct, natural, A1; the English matches. |
| S74113 | No es antipático, es tímido. | He isn't unpleasant, he's shy. | Keep |  | Correct, natural, A1; the English matches. |
| S74114 | Ana es muy sociable. | Ana is very sociable. | Keep |  | Correct, natural, A1; the English matches. |
| S74115 | Mi amigo es muy sociable. | My friend is very sociable. | Keep |  | Correct, natural, A1; the English matches. |
| S74116 | No soy muy sociable. | I'm not very sociable. | Keep | Swap: #1176832 "Tom no es muy sociable." | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#12013851](https://tatoeba.org/en/sentences/show/12013851) | Tengo un caballo marrón. | I have a brown horse. | Use |  |  |
| [#687703](https://tatoeba.org/en/sentences/show/687703) | ¿Cuál es marrón? | Which is brown? | Use |  |  |
| [#436666](https://tatoeba.org/en/sentences/show/436666) | Tengo el pelo marrón. | I have brown hair. | Use |  |  |
| [#11928157](https://tatoeba.org/en/sentences/show/11928157) | El cielo está gris. | The sky is gray. | Use |  |  |
| [#10367301](https://tatoeba.org/en/sentences/show/10367301) | Tengo el pelo gris. | I have gray hair. | Use |  |  |
| [#12938217](https://tatoeba.org/en/sentences/show/12938217) | Tom tiene bigote. | Tom has a mustache. | Use |  |  |
| [#8493924](https://tatoeba.org/en/sentences/show/8493924) | Él tiene bigote. | He has a mustache. | Use |  |  |
| [#1176832](https://tatoeba.org/en/sentences/show/1176832) | Tom no es muy sociable. | Tom isn't very sociable. | Use |  |  |
| [#454258](https://tatoeba.org/en/sentences/show/454258) | Soy hermosa. | I'm beautiful. | Reject |  | A line about one's own looks (I'm beautiful). |
| [#456470](https://tatoeba.org/en/sentences/show/456470) | Mis zapatos son marrones. | My shoes are brown. | Use |  |  |
| [#462577](https://tatoeba.org/en/sentences/show/462577) | La camisa grande es marrón. | The big shirt is brown. | Use |  |  |
| [#462617](https://tatoeba.org/en/sentences/show/462617) | El sombrero marrón es viejo. | The brown hat is old. | Use |  |  |
| [#462619](https://tatoeba.org/en/sentences/show/462619) | El caballo marrón es rápido. | The brown horse is fast. | Use |  |  |
| [#488667](https://tatoeba.org/en/sentences/show/488667) | Ella tiene los ojos marrones. | She has brown eyes. | Use |  |  |
| [#586026](https://tatoeba.org/en/sentences/show/586026) | Soy delgado pero estoy gordo. | I am a thin person, but at the moment I am fat. | Reject |  | An odd line (thin but fat). |
| [#688019](https://tatoeba.org/en/sentences/show/688019) | Eres muy hermosa. | You're very beautiful. | Reject |  | A compliment on looks addressed to you; the course keeps these out. |
| [#855233](https://tatoeba.org/en/sentences/show/855233) | Tengo los ojos azules. | My eyes are blue. | Use | I have blue eyes. |  |
| [#867526](https://tatoeba.org/en/sentences/show/867526) | Ella tiene unos grandes ojos azules. | She has large blue eyes. | Use | She has big blue eyes. |  |
| [#1153702](https://tatoeba.org/en/sentences/show/1153702) | Eres una hermosa mujer. | You're a beautiful woman. | Reject |  | A compliment on looks addressed to you. |
| [#1238955](https://tatoeba.org/en/sentences/show/1238955) | Es la mujer más hermosa. | She's the most beautiful woman. | Reject |  | A superlative about a woman's looks. |
| [#1384710](https://tatoeba.org/en/sentences/show/1384710) | Tiene ojos azules. | She has blue eyes. | Use |  |  |
| [#1989655](https://tatoeba.org/en/sentences/show/1989655) | Eres hermoso. | You're cute. | Reject |  | A compliment on looks addressed to you; the English "cute" is off too. |
| [#2002601](https://tatoeba.org/en/sentences/show/2002601) | El chico es gordo. | The boy is fat. | Reject |  | Calls a boy fat. |
| [#2397006](https://tatoeba.org/en/sentences/show/2397006) | Tengo ojos azules. | I have blue eyes. | Use |  |  |
| [#2789153](https://tatoeba.org/en/sentences/show/2789153) | ¿Soy linda? | Am I pretty? | Reject |  | A line about one's own looks. |
| [#2924652](https://tatoeba.org/en/sentences/show/2924652) | Este gato es bastante gordo. | This cat is very fat. | Use | This cat is pretty fat. |  |
| [#2926155](https://tatoeba.org/en/sentences/show/2926155) | Él tiene ojos verdes. | He has green eyes. | Use |  |  |
| [#3697842](https://tatoeba.org/en/sentences/show/3697842) | Es hermoso. | It's beautiful. | Use |  |  |
| [#4827165](https://tatoeba.org/en/sentences/show/4827165) | Ella es la chica más hermosa. | She's the most beautiful girl. | Reject |  | A superlative about a girl's looks. |
| [#8281715](https://tatoeba.org/en/sentences/show/8281715) | Tengo el pelo oscuro. | I have dark hair. | Use |  |  |
| [#9672917](https://tatoeba.org/en/sentences/show/9672917) | Tengo ojos marrones. | I have brown eyes. | Use |  |  |
| [#9834098](https://tatoeba.org/en/sentences/show/9834098) | ¡Eres una chica muy hermosa! | You're a really pretty girl. | Reject |  | A compliment on looks addressed to you. |
| [#10349204](https://tatoeba.org/en/sentences/show/10349204) | Te ves hermosa. | You look beautiful. | Reject |  | "Te ves" (you look) is a sense trap for ver, and a compliment on looks. |

## U39 · Not Sure

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S39101 | Quizá. | Maybe. | Keep |  | Correct, natural, A1; the English matches. |
| S39102 | Quizá mañana. | Maybe tomorrow. | Keep |  | Correct, natural, A1; the English matches. |
| S39103 | Quizá Tom está enfermo. | Maybe Tom is sick. | Keep |  | Correct; quizá with the indicative is fine. |
| S39104 | Creo que no. | I don't think so. | Keep | Swap: #644756 "No creo." | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#1932978](https://tatoeba.org/en/sentences/show/1932978) | Quizá sí, quizá no… | Maybe, maybe not... | Use | Maybe yes, maybe no. |  |
| [#514951](https://tatoeba.org/en/sentences/show/514951) | ¡Quizá para la próxima! | Maybe next time! | Reject |  | "Para la próxima" is an idiom (next time). |
| [#1534980](https://tatoeba.org/en/sentences/show/1534980) | Quizá ella está por venir. | Maybe she is coming. | Reject |  | "Estar por" (be about to) is past A1. |
| [#644756](https://tatoeba.org/en/sentences/show/644756) | No creo. | I don't think so. | Use |  |  |
| [#930976](https://tatoeba.org/en/sentences/show/930976) | No lo creo. | No, I don't think so. | Use | I don't think so. |  |
| [#811777](https://tatoeba.org/en/sentences/show/811777) | Yo creo en él. | I believe in him. | Use |  |  |
| [#345162](https://tatoeba.org/en/sentences/show/345162) | Creo que es una buena idea. | I think it's a good idea. | Use |  |  |
| [#358447](https://tatoeba.org/en/sentences/show/358447) | Se dice que ver es creer. | They say that seeing is believing. | Reject |  | A proverb with impersonal "se dice". |
| [#401397](https://tatoeba.org/en/sentences/show/401397) | Creo que va a llover. | I think it's going to rain. | Use |  |  |
| [#434255](https://tatoeba.org/en/sentences/show/434255) | ¿Estás segura? | Are you sure? | Use |  |  |
| [#436434](https://tatoeba.org/en/sentences/show/436434) | Estoy seguro. | I am sure. | Use |  |  |
| [#436988](https://tatoeba.org/en/sentences/show/436988) | Creo que tengo frío. | I think I am cold. | Use |  |  |
| [#556353](https://tatoeba.org/en/sentences/show/556353) | Sí, creo que está bien. | Yes, I think it's okay. | Use |  |  |
| [#590743](https://tatoeba.org/en/sentences/show/590743) | ¿Estás seguro de eso? | Are you sure about that? | Use |  |  |
| [#637614](https://tatoeba.org/en/sentences/show/637614) | Sí, tengo una buena idea. | Yes, I have a good idea. | Use |  |  |
| [#638423](https://tatoeba.org/en/sentences/show/638423) | Tengo una buena idea. | I've got a good idea. | Use |  |  |
| [#687867](https://tatoeba.org/en/sentences/show/687867) | Sí, tengo seguro. | Yes, I have insurance. | Reject |  | Seguro here is insurance, a sense trap. |
| [#853424](https://tatoeba.org/en/sentences/show/853424) | Creo que viene, pero no estoy seguro. | I think he's coming, but I'm not quite sure. | Use | I think he's coming, but I'm not sure. |  |
| [#853466](https://tatoeba.org/en/sentences/show/853466) | Ver es creer. | To see is to believe. | Reject |  | A proverb. |
| [#853540](https://tatoeba.org/en/sentences/show/853540) | Creo que va a llover hoy. | I think it's going to rain today. | Use |  |  |
| [#853730](https://tatoeba.org/en/sentences/show/853730) | Creo que mañana va a llover. | I think tomorrow it's going to rain. | Use | I think it's going to rain tomorrow. |  |
| [#853971](https://tatoeba.org/en/sentences/show/853971) | Creo que hay agua bajo la mesa. | I think that there is water under the table. | Use |  |  |
| [#862640](https://tatoeba.org/en/sentences/show/862640) | No estoy muy seguro. | I'm not really sure. | Use | I'm not very sure. |  |
| [#988300](https://tatoeba.org/en/sentences/show/988300) | Creo que él es feliz. | I believe that he's happy. | Use | I think he's happy. |  |
| [#999669](https://tatoeba.org/en/sentences/show/999669) | ¿Tienes idea de cuándo cierra el banco? | Do you have any idea when the bank closes? | Use |  |  |
| [#1067998](https://tatoeba.org/en/sentences/show/1067998) | Estoy seguro de que está vivo. | I'm sure he's alive. | Reject |  | A dark line (he's alive). |
| [#1086450](https://tatoeba.org/en/sentences/show/1086450) | Tienes una buena idea. | You've got a good idea. | Use |  |  |
| [#1153723](https://tatoeba.org/en/sentences/show/1153723) | ¿Cómo es posible? | How's this possible? | Use | How is that possible? |  |
| [#1199109](https://tatoeba.org/en/sentences/show/1199109) | Creo que hay un hombre allí. | I think that there is a man there. | Use |  |  |
| [#1203192](https://tatoeba.org/en/sentences/show/1203192) | Lento pero seguro. | Slow and steady wins the race. | Reject |  | A proverb. |
| [#1218268](https://tatoeba.org/en/sentences/show/1218268) | Creo que todo va bien. | I think everything is going well. | Use |  |  |

## U68 · Announcements

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S68101 | Buenos días, señores. | Good morning, gentlemen. | Keep |  | Correct; "señores" to a mixed crowd is normal Spanish, the English "gentlemen" is the nearest. |
| S68102 | Buenas tardes, señores pasajeros. | Good afternoon, passengers. | Keep |  | Correct announcement Spanish. |
| S68103 | Señores pasajeros, atención, por favor. | Passengers, your attention, please. | Keep |  | Correct announcement Spanish. |
| S68104 | El tren tiene retraso. | The train is delayed. | Keep |  | Correct, natural, A1; the English matches. |
| S68105 | El tren llega con retraso. | The train is arriving late. | Keep | Swap: #463085 "Hay un retraso de veinte minutos." (show "There's a twenty-minute delay.") | Correct, natural, A1; the English matches. |
| S68106 | El avión tiene una hora de retraso. | The plane is an hour late. | Keep |  | Correct, natural, A1; the English matches. |
| S68107 | Hoy no hay autobuses. | There are no buses today. | Keep |  | Correct, natural, A1; the English matches. |
| S68108 | Los autobuses están en la estación. | The buses are at the station. | Keep |  | Correct, natural, A1; the English matches. |
| S68109 | Hay tres autobuses al día. | There are three buses a day. | Keep | Swap: #434335 "Hay autobuses cada diez minutos." (show "There are buses every ten minutes.") | Correct, natural, A1; the English matches. |
| S68110 | Los taxis están en la entrada. | The taxis are at the entrance. | Keep |  | Correct, natural, A1; the English matches. |
| S68111 | No hay taxis. | There are no taxis. | Keep |  | Correct, natural, A1; the English matches. |
| S68112 | Mi maleta es negra. | My suitcase is black. | Keep | Swap: #493526 "¿De quién es esta maleta?" (show "Whose suitcase is this?") | Correct, natural, A1; the English matches. |
| S68113 | La carretera está cerrada. | The road is closed. | Keep |  | Correct, natural, A1; the English matches. |
| S68114 | Hay una carretera nueva. | There's a new road. | Keep | Swap: #12080800 "¿Ves la carretera en el mapa?" | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#463085](https://tatoeba.org/en/sentences/show/463085) | Hay un retraso de veinte minutos. | There is a twenty minute delay. | Use | There's a twenty-minute delay. |  |
| [#434335](https://tatoeba.org/en/sentences/show/434335) | Hay autobuses cada diez minutos. | Buses run every ten minutes. | Use | There are buses every ten minutes. |  |
| [#493526](https://tatoeba.org/en/sentences/show/493526) | ¿De quién es esta maleta? | Who does this suitcase belong to? | Use | Whose suitcase is this? |  |
| [#12049412](https://tatoeba.org/en/sentences/show/12049412) | La carretera no está bien. | The road is not good. | Reject |  | An odd line; "the road is not good" is not what Spanish or English says. |
| [#12080800](https://tatoeba.org/en/sentences/show/12080800) | ¿Ves la carretera en el mapa? | Do you see the road on the map? | Use |  |  |
| [#456062](https://tatoeba.org/en/sentences/show/456062) | ¿Hay una estación de metro por aquí? | Is there a subway station around? | Use | Is there a metro station around here? |  |
| [#745048](https://tatoeba.org/en/sentences/show/745048) | ¿Tienen su pasaporte? | Do you have your passport? | Use | Do you have your passport? |  |
| [#854032](https://tatoeba.org/en/sentences/show/854032) | Por favor, llama antes de entrar. | Please knock on the door before you enter. | Reject |  | Imperative, and "llama" here is knock, a sense trap. |
| [#967100](https://tatoeba.org/en/sentences/show/967100) | Puedes entrar. | You can come in. | Use |  |  |
| [#6826935](https://tatoeba.org/en/sentences/show/6826935) | Vamos a entrar antes de que nieve. | Let's get in before it snows. | Reject |  | "Antes de que" takes the subjunctive (nieve), past A1. |
| [#11310171](https://tatoeba.org/en/sentences/show/11310171) | No se puede viajar sin pasaporte. | You cannot travel without a passport. | Use |  |  |
| [#11345052](https://tatoeba.org/en/sentences/show/11345052) | ¿El metro va al aeropuerto? | Does the subway go to the airport? | Use | Does the metro go to the airport? |  |
| [#13582077](https://tatoeba.org/en/sentences/show/13582077) | Mi pasaporte no está aquí. | My passport isn't here. | Use |  |  |
| [#14005074](https://tatoeba.org/en/sentences/show/14005074) | Soy el conductor de Tom. | I'm Tom's driver. | Use |  |  |

## U69 · Instructions

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S69101 | Esta actividad es fácil. | This activity is easy. | Keep |  | Correct, natural, A1; the English matches. |
| S69102 | Es una actividad interesante. | It's an interesting activity. | Keep | Swap: #3714856 "Leer es una buena actividad." | Correct, natural, A1; the English matches. |
| S69103 | La actividad es en grupos. | The activity is in groups. | Keep |  | Correct, natural, A1; the English matches. |
| S69104 | Vamos a empezar la unidad dos. | We're going to start unit two. | Keep |  | Correct, natural, A1; the English matches. |
| S69105 | La unidad tres es difícil. | Unit three is hard. | Keep |  | Correct, natural, A1; the English matches. |
| S69106 | Estamos en la unidad cinco. | We're on unit five. | Keep |  | Correct, natural, A1; the English matches. |
| S69107 | Vamos a practicar en parejas. | We're going to practice in pairs. | Keep |  | Correct, natural, A1; the English matches. |
| S69108 | La actividad es en parejas. | The activity is in pairs. | Keep |  | Correct, natural, A1; the English matches. |
| S69109 | Ahora, en parejas. | Now, in pairs. | Keep |  | Correct classroom fragment; fine in Instructions. |
| S69110 | Vamos a hacer grupos de tres. | We're going to make groups of three. | Keep |  | Correct, natural, A1; the English matches. |
| S69111 | No tengo deberes hoy. | I don't have homework today. | Keep | Swap: #853667 "Tengo que hacer mis deberes." | Correct Spanish. In Latin America homework is "la tarea"; deberes is Spain's word. The course chose deberes; see the senses note. |
| S69112 | ¿Hay deberes para mañana? | Is there homework for tomorrow? | Keep |  | Correct; "tarea" in Latin America. See S69111. |
| S69113 | Contesta la pregunta. | Answer the question. | Keep |  | Correct; an imperative in Instructions, where they belong. |
| S69114 | Contesta, por favor. | Answer, please. | Keep |  | Correct; an imperative in Instructions. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#3714856](https://tatoeba.org/en/sentences/show/3714856) | Leer es una buena actividad. | Reading is a good activity. | Use |  |  |
| [#853667](https://tatoeba.org/en/sentences/show/853667) | Tengo que hacer mis deberes. | I have to do my homework. | Use |  |  |
| [#1289169](https://tatoeba.org/en/sentences/show/1289169) | No tengo tiempo para hacer mis deberes. | I have no time to do my homework. | Use |  |  |
| [#346297](https://tatoeba.org/en/sentences/show/346297) | ¡Mira! Hay un gato en la cocina. | Look! There's a cat in the kitchen. | Use |  |  |
| [#434505](https://tatoeba.org/en/sentences/show/434505) | ¿Tengo que cambiar? | Do I have to change? | Use |  |  |
| [#455826](https://tatoeba.org/en/sentences/show/455826) | Quiero cambiar esto. | I want to change that. | Use | I want to change this. |  |
| [#969734](https://tatoeba.org/en/sentences/show/969734) | ¿Dónde tengo que cambiar de tren? | Where do I have to change trains? | Use |  |  |
| [#1316068](https://tatoeba.org/en/sentences/show/1316068) | Nadar es un buen ejercicio. | Swimming is good exercise. | Use |  |  |
| [#1466507](https://tatoeba.org/en/sentences/show/1466507) | Mira quién habla. | Look who's talking. | Reject |  | "Mira quién habla" is an idiom. |
| [#1904144](https://tatoeba.org/en/sentences/show/1904144) | Tengo que cambiar mi ropa. | I have to change my clothes. | Use | I have to change my clothes. |  |
| [#2766527](https://tatoeba.org/en/sentences/show/2766527) | Tom quiere cambiar. | Tom wants to change. | Use |  |  |
| [#3706638](https://tatoeba.org/en/sentences/show/3706638) | Quiero cambiar. | I want to change. | Use |  |  |
| [#4721930](https://tatoeba.org/en/sentences/show/4721930) | Mira el mapa. | Look at the map. | Use |  |  |
| [#8670802](https://tatoeba.org/en/sentences/show/8670802) | ¿Me escucha? | Can you hear me? | Use | Can you hear me? |  |
| [#10564896](https://tatoeba.org/en/sentences/show/10564896) | Me voy a cambiar la ropa. | I'm going to change my clothes. | Reject |  | Reflexive "cambiarse" with the article is past A1. |
| [#10761950](https://tatoeba.org/en/sentences/show/10761950) | ¡Mira lo que tengo! | Look what I have! | Use |  |  |
| [#10963691](https://tatoeba.org/en/sentences/show/10963691) | Elige un idioma. | Choose a language. | Use |  |  |
| [#11678844](https://tatoeba.org/en/sentences/show/11678844) | Mira este gato. | Look at this cat. | Use |  |  |
| [#12853797](https://tatoeba.org/en/sentences/show/12853797) | ¡Mira! ¡El gato está en la cocina! | Look! The cat's in the kitchen! | Use |  |  |
| [#12923555](https://tatoeba.org/en/sentences/show/12923555) | Ella no escucha. | She doesn't listen. | Use |  |  |
| [#13273792](https://tatoeba.org/en/sentences/show/13273792) | Quiero practicar mi francés. | I want to practice my French. | Use |  |  |
| [#13366890](https://tatoeba.org/en/sentences/show/13366890) | Mira, ¡allí estoy! | Look, it's me! | Reject |  | "Mira, ¡allí estoy!" has an exclamation mark mid-sentence; #13366891 says the same. |
| [#13366891](https://tatoeba.org/en/sentences/show/13366891) | Mira, ¡soy yo! | Look, it's me! | Use | Look, it's me! |  |
| [#13367295](https://tatoeba.org/en/sentences/show/13367295) | Puedes cambiar. | You can change. | Use |  |  |
| [#13952517](https://tatoeba.org/en/sentences/show/13952517) | Él nunca escucha al profesor. | He never listens to the teacher. | Use |  |  |
| [#13997954](https://tatoeba.org/en/sentences/show/13997954) | ¡Mira qué bien estás! | Look at you! | Reject |  | "¡Mira qué bien estás!" is an idiom (look at you). |

## U75 · Places to Visit

### Drafts

| ID | Spanish | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S75101 | Hay mucho turismo aquí. | There's a lot of tourism here. | Keep |  | Correct, natural, A1; the English matches. |
| S75102 | El turismo es bueno para la ciudad. | Tourism is good for the city. | Keep |  | Correct, natural, A1; the English matches. |
| S75103 | Estudio turismo. | I study tourism. | Keep |  | Correct, natural, A1; the English matches. |
| S75104 | Es un monumento famoso. | It's a famous monument. | Keep |  | Correct, natural, A1; the English matches. |
| S75105 | ¿Qué es este monumento? | What is this monument? | Keep | Swap: #9930667 "¿Quieres visitar este monumento?" | Correct, natural, A1; the English matches. |
| S75106 | El monumento está en la plaza. | The monument is in the square. | Keep |  | Correct, natural, A1; the English matches. |
| S75107 | La catedral es muy vieja. | The cathedral is very old. | Keep |  | Correct, natural, A1; the English matches. |
| S75108 | ¿Dónde está la catedral? | Where is the cathedral? | Keep |  | Correct, natural, A1; the English matches. |
| S75109 | Quiero visitar la catedral. | I want to visit the cathedral. | Keep |  | Correct, natural, A1; the English matches. |
| S75110 | ¿Cuál es la capital de Francia? | What is the capital of France? | Keep | Swap: #11217962 "¿Cuál es la capital del país?" | Correct, natural, A1; the English matches. |
| S75111 | La capital de México es muy grande. | The capital of Mexico is very big. | Keep |  | Correct, natural, A1; the English matches. |
| S75112 | Vivo en la capital. | I live in the capital. | Keep |  | Correct, natural, A1; the English matches. |
| S75113 | Hay lugares para visitar. | There are places to visit. | Keep |  | Correct, natural, A1; the English matches. |
| S75114 | ¿Qué lugares quieres visitar? | Which places do you want to visit? | Keep |  | Correct, natural, A1; the English matches. |
| S75115 | ¿Qué lugares hay cerca de aquí? | What places are there near here? | Keep |  | Correct, natural, A1; the English matches. |
| S75116 | Vivo en el centro. | I live downtown. | Keep |  | Correct, natural, A1; the English matches. |
| S75117 | El hotel está en el centro de la ciudad. | The hotel is in the center of the city. | Keep | Swap: #12151837 "Estamos muy lejos del centro." | Correct, natural, A1; the English matches. |
| S75118 | ¿Tiene un plano de la ciudad? | Do you have a map of the city? | Keep |  | Correct; "plano" is right for a street map, Latin Americans more often say "mapa" (W1121, known). |
| S75119 | Quiero un plano del centro. | I want a map of downtown. | Keep |  | Correct, natural, A1; the English matches. |
| S75120 | El plano está en la mesa. | The map is on the table. | Keep |  | Correct, natural, A1; the English matches. |
| S75121 | Hay una exposición en el museo. | There's an exhibition at the museum. | Keep |  | Correct, natural, A1; the English matches. |
| S75122 | La exposición es muy interesante. | The exhibition is very interesting. | Keep |  | Correct, natural, A1; the English matches. |
| S75123 | Quiero ver la exposición. | I want to see the exhibition. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | Spanish | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#9930667](https://tatoeba.org/en/sentences/show/9930667) | ¿Quieres visitar este monumento? | Do you want to visit this monument? | Use |  |  |
| [#10806470](https://tatoeba.org/en/sentences/show/10806470) | Este monumento tiene más de cien años. | This monument is more than one hundred years old. | Use |  |  |
| [#11217962](https://tatoeba.org/en/sentences/show/11217962) | ¿Cuál es la capital del país? | What is the capital of the country? | Use |  |  |
| [#12151837](https://tatoeba.org/en/sentences/show/12151837) | Estamos muy lejos del centro. | We are a long way from the center. | Use |  |  |
| [#330142](https://tatoeba.org/en/sentences/show/330142) | ¿Por qué no vas en mi lugar? | Will you go in place of me? | Reject |  | "En mi lugar" (instead of me) is an idiom. |
| [#436452](https://tatoeba.org/en/sentences/show/436452) | Voy a visitar a mis amigas. | I am visiting my friends. | Use | I'm going to visit my friends. |  |
| [#732620](https://tatoeba.org/en/sentences/show/732620) | Son buena gente. | They are good people. | Use |  |  |
| [#867821](https://tatoeba.org/en/sentences/show/867821) | ¿Está este lugar lejos del banco? | Is this place far from the bank? | Use |  |  |
| [#968635](https://tatoeba.org/en/sentences/show/968635) | ¿Qué ciudad vas a visitar primero? | Which city are you going to visit first? | Use |  |  |
| [#1098539](https://tatoeba.org/en/sentences/show/1098539) | Soy un turista también. | I'm a tourist, too! | Use | I'm a tourist too. |  |
| [#1169707](https://tatoeba.org/en/sentences/show/1169707) | Me llevo bien con la gente. | I get along well with people. | Reject |  | "Llevarse bien con" is an idiom. |
| [#1288877](https://tatoeba.org/en/sentences/show/1288877) | Estás en un lugar seguro. | You are in a safe place. | Use |  |  |
| [#2045276](https://tatoeba.org/en/sentences/show/2045276) | No me gusta este lugar. | I don't like this place. | Use |  |  |
| [#9471977](https://tatoeba.org/en/sentences/show/9471977) | Me gusta este lugar. | I like this place. | Use |  |  |
| [#9981876](https://tatoeba.org/en/sentences/show/9981876) | Voy a visitar a Tom hoy. | I'm going to visit Tom today. | Use |  |  |
| [#10141020](https://tatoeba.org/en/sentences/show/10141020) | Soy famoso. | I'm famous. | Use |  |  |
| [#10221037](https://tatoeba.org/en/sentences/show/10221037) | Este edificio es nuevo. | This building is new. | Use |  |  |
| [#10333097](https://tatoeba.org/en/sentences/show/10333097) | ¿A quién más quieres visitar? | Who else do you want to visit? | Use |  |  |
| [#10543332](https://tatoeba.org/en/sentences/show/10543332) | ¡La gente aquí está muy enferma! | The people here are very ill! | Reject |  | A line about ill people. |
| [#11070818](https://tatoeba.org/en/sentences/show/11070818) | Hay gente que no come huevos. | Some people don't eat eggs. | Use |  |  |
| [#11241615](https://tatoeba.org/en/sentences/show/11241615) | ¿Qué quiere la gente? | What do the people want? | Use |  |  |
| [#12853874](https://tatoeba.org/en/sentences/show/12853874) | Tom te quiere visitar. | Tom wants to visit you. | Use |  |  |
| [#13702820](https://tatoeba.org/en/sentences/show/13702820) | Sé lo que la gente quiere. | I know what people want. | Use |  |  |
| [#13714902](https://tatoeba.org/en/sentences/show/13714902) | La gente es gente. | People are people. | Reject |  | A tautology ("people are people"), a saying. |

## Read and Answer texts

| ID | Text | Verdict | Fix | Reason |
| --- | --- | --- | --- | --- |
| R201 | La tienda (notice) | Keep |  | Natural shop hours; both answers unique. |
| R202 | Un mensaje de Juan | Keep |  | Natural message; both answers unique. |
| R203 | El museo (notice) | Keep |  | Natural; "a las 2 de la tarde" is the twelve-hour form the course wants; both answers unique. |
| R204 | Las vacaciones (notice) | Keep |  | Natural; "Primer día de clase" is right (primer before a noun); both answers unique. |
| R205 | La fiesta (sign) | Keep |  | Natural poster; both answers unique. |
| R206 | Una carta de María | Keep |  | Natural; both answers unique. |
| R207 | En la tienda (sign) | Keep |  | Natural; both answers unique. |
| R208 | En la estación (sign) | Keep |  | Natural; "Baños" is the Latin American word, good. "Planta 1 / planta 2" reads as Spain; Latin American signs say "Piso 1" or "Nivel 1". Both answers unique. One for the native checker, with S66110. |
| R209 | El banco (notice) | Keep |  | Natural; both answers unique. |
| R210 | Autobús a Guadalajara (timetable) | Keep |  | Natural; printed timetables use the 24-hour clock, right; both answers unique. |
| R211 | Autobús 12 (timetable) | Keep |  | Natural; both answers unique. |
| R212 | Un mensaje de Juan | Keep |  | Natural; "a las 5:30 de la tarde" is the twelve-hour form; both answers unique (the bus leaves from Guadalajara, Juan arrives at the station). |
| R213 | En clase (notice) | Keep |  | Natural classroom instructions; both answers unique. |
| R214 | La puerta (notice) | Keep |  | Natural; both answers unique. |
| R215 | El ejercicio (notice) | Keep |  | Natural; both answers unique. |

## Task items: Write the Number, Fill the Form, Write a Message

Each was read for natural Spanish, a clear task and one fitting answer.

| ID | Kind | Item | Verdict | Reason |
| --- | --- | --- | --- | --- |
| N201 | time | Son las tres y media. → 3:30 | Keep | Natural; one answer. |
| N202 | time | Son las ocho y cuarto. → 8:15 | Keep | Natural; one answer. |
| N203 | time | Es mediodía. → 12:00 | Keep | Natural; one answer. |
| N204 | time | Son las diez menos cuarto. → 9:45 | Keep | Correct; "un cuarto para las diez" is the Mexican and Colombian form (see S61104). One answer. |
| N205 | date | El cinco de marzo. → 5/3 | Fix | Natural, but it sits in U62 (Days of the Week) and marzo is first taught in U63 (W1237). Move it to U63, or say a day of the week in U62. |
| N206 | date | El primero de mayo. → 1/5 | Keep | Natural Latin American date; one answer. |
| N207 | date | El quince de septiembre. → 15/9 | Keep | Natural; one answer. |
| N208 | date | El treinta de diciembre. → 30/12 | Keep | Natural; one answer. |
| N209 | time | El autobús sale a las cuatro y veinte. → 4:20 | Keep | Natural; one answer. |
| N210 | time | El tren llega a las nueve y diez. → 9:10 | Keep | Natural; one answer. |
| N211 | time | Atención: el autobús a Guadalajara sale a las seis. → 6:00 | Keep | Natural announcement; one answer. |
| N212 | number | El autobús número siete sale ahora. → 7 | Keep | Natural; one answer. |
| F201 | form | Juan y María, cine, sábado 8:30 de la noche, la plaza | Keep | Natural; "Se ven en la plaza" is they meet; every field has one answer and the accepted variants are generous. |
| F202 | form | María: se levanta 7:00, empieza 9:00, termina 5:00 | Keep | Natural; one answer per field. |
| P201 | prompt | Message about your week: two days, what you do; 20 to 35 words | Keep | Clear. |
| P202 | prompt | Invite a friend out: what, which day, what time; 20 to 35 words | Keep | Clear. |
| P203 | prompt | Your day: get up, work, dinner; 25 to 40 words | Keep | Clear. |
