# Tamago French check, A1 Part 6, 2026-11-15

Quality pass on French A1 Part 6, change no code. Three sets: the Tatoeba candidates kept out only by the trust rule (279 distinct sentences shown in `_review/french-part6-candidates.md`; the "and N more" tails are not in that file and were not reviewed), each marked **Use** or **Reject**; the 155 drafts in `_review/french-part6-drafts.md`, each marked **Keep**, **Fix** (with the corrected French and English) or **Cut**, with a swap named where a Use candidate teaches the same word; and the 15 Read and Answer texts, checked for natural French, clear questions and one fitting answer each. Meanings and verb forms were checked against the course's Wiktionary data in content/checks (words.json, conjugations.json), not memory. The candidates file carries the same marks in place. This is a reviewer's read, not a native speaker's.

## Counts

- Candidates: **Use 168** · **Reject 111** (55 of the Use marks name the English to show).
- Drafts: **Keep 154** · **Fix 1** · **Cut 0**; 27 drafts have a swap named.
- Read and Answer texts: **Keep 14** · **Fix 1**.
- Draft fix: S17965 ("Je te le promets"; needs le as a known pronoun, else keep and accept both). Text fix: R610 ("Gardez votre billet" is the bus notice, not "Tenez").
- Reject reasons, most common first: imperatives outside Instructions (U604, where they were kept) and the help circles; dark lines (mourir, mort, threats) in Life Stories and Telling a Story; gros of a person (fat) in Describing; love lines; idioms; "en" and "se demander" past A1; passé composé; exclamatives and fragments; sense traps (offre the noun, affaires as business); punctuation slips.
- People + Places (U613) and Life Stories (U608) read line by line: all 19 and 13 drafts are correct and gentle; U608's candidates were almost all dark, as the builder noted, so the drafts stand with two swaps (S18570, S18572).
- The two word-for-word matches (S17362, S18363) are swaps; 25 more swaps are named. Answer the Question pairs were left as drafts.
- Glossary senses to re-pick in word-senses.json: simple "single" (the lines mean simple, plain), doux "sweet" (douce here is gentle), coup "blow, hit" (tout à coup, suddenly), suite "next step" (tout de suite, right away), fort "strong" (the help circle means louder, the adverb), certain "certain, guaranteed" (sure), occuper "to occupy" (s'occuper de, to look after), amuser "to amuse" (s'amuser, to have fun), marier "to marry off" (se marier, to get married), habiller "to dress" (s'habiller, to get dressed), affaires "plural of affaire" (things, belongings), emmener "to take off, take away" (to take someone somewhere), crier "to cry out" (to shout), quelque "some" (quelque chose, something), discuter "to chat" (discuter de, to talk about), general "general, usual" (en général). All checked in content/checks/words.json.
- Conjugation tables (content/checks/conjugations.json): **rappeler** is listed as "rappèle, rappèles, rappèlent", the 1990 reform spelling, while the course teaches the form "rappelle" (W2007); the table should show "rappelle" (Wiktionary gives both, the double-l first). **asseoir** has broken cells: "assoyons or asseyons or" and "assoyez or asseyez or" end in a dangling "or"; show one form per cell ("asseyons", "asseyez", matching asseyez-vous). falloir correctly shows only "il faut". situer has no table (only the participle situé is taught), fine.
- The Tatoeba sentences already in the course were not checked here; they carry a source_id and were checked at import.


## U601 · Postcards

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S17161 | Mon séjour à la mer est super. | My stay by the sea is great. | Keep |  | Correct, natural, A1; the English matches. |
| S17162 | Bon séjour ! | Enjoy your stay! | Keep |  | Correct, natural, A1; the English matches. |
| S17163 | C'est un séjour d'une semaine. | It's a one-week stay. | Keep |  | Correct, natural, A1; the English matches. |
| S17164 | Le lendemain, on va à la plage. | The next day, we go to the beach. | Keep |  | Correct, natural, A1; the English matches. |
| S17165 | Je rentre le lendemain. | I'm going home the next day. | Keep |  | Correct, natural, A1; the English matches. |
| S17166 | Le lendemain, il fait beau. | The next day, the weather is nice. | Keep |  | Correct, natural, A1; the English matches. |
| S17167 | La plage est pleine de monde. | The beach is full of people. | Keep |  | Correct, natural, A1; the English matches. |
| S17168 | Ma valise est pleine. | My suitcase is full. | Keep |  | Correct, natural, A1; the English matches. |
| S17169 | Oui, il fait très chaud ici. | Yes, it's very hot here. | Keep |  | Correct, natural, A1; the English matches. |
| S17170 | Il fait beau à la mer ? | Is the weather nice by the sea? | Keep |  | Correct, natural, A1; the English matches. |
| S17171 | Il fait froid le soir. | It's cold in the evening. | Keep |  | Correct, natural, A1; the English matches. |
| S17172 | Il y a du soleil. | It's sunny. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#8879951](https://tatoeba.org/en/sentences/show/8879951) | La boîte est pleine. | The box is full. | Use |  |  |
| [#427118](https://tatoeba.org/en/sentences/show/427118) | Le restaurant est toujours plein. | The restaurant is always packed. | Use | The restaurant is always full. |  |
| [#1327391](https://tatoeba.org/en/sentences/show/1327391) | C'est trop tranquille. | It's too quiet. | Use | It's too quiet. |  |
| [#1329015](https://tatoeba.org/en/sentences/show/1329015) | Je te souhaite une bonne journée ! | I hope you have a great day! | Use | I wish you a good day! |  |
| [#12466751](https://tatoeba.org/en/sentences/show/12466751) | Il ne veut pas rester tranquille. | He won't stay still. | Use | He won't keep still. |  |
| [#13497247](https://tatoeba.org/en/sentences/show/13497247) | Elle souhaite le meilleur pour ses enfants. | She wishes the best for her children. | Use |  |  |
| [#13871803](https://tatoeba.org/en/sentences/show/13871803) | Laisse mon ami tranquille. | Leave my friend alone. | Reject |  | Imperative. |
| [#13871804](https://tatoeba.org/en/sentences/show/13871804) | Laisse mon amie tranquille. | Leave my friend alone. | Reject |  | Imperative. |

## U611 · Reactions

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S17261 | Heureusement, il fait beau. | Luckily, the weather is nice. | Keep | Swap: #8870787 "Heureusement, ce n'est pas grave." | Correct, natural, A1; the English matches. |
| S17262 | Heureusement, j'ai ma clé. | Luckily, I have my key. | Keep |  | Correct, natural, A1; the English matches. |
| S17263 | Ah, c'est toi ! | Ah, it's you! | Keep | Swap: #7556800 "Ah oui, c'est vrai." | Correct, natural, A1; the English matches. |
| S17264 | Ah, d'accord ! | Ah, OK! | Keep |  | Correct, natural, A1; the English matches. |
| S17265 | C'est mieux comme ça. | It's better like that. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#8870787](https://tatoeba.org/en/sentences/show/8870787) | Heureusement, ce n'est pas grave. | Fortunately, it isn't serious. | Use |  |  |
| [#13571973](https://tatoeba.org/en/sentences/show/13571973) | Heureusement que je vous connais. | It's a good thing I know you. | Reject |  | "Heureusement que" is past A1, and the English is an idiom. |
| [#13127727](https://tatoeba.org/en/sentences/show/13127727) | Heureusement, j'ai encore cinq euros. | Fortunately, I still have five euros. | Use |  |  |
| [#7556800](https://tatoeba.org/en/sentences/show/7556800) | Ah oui, c'est vrai. | Oh yeah, it's true. | Use |  |  |
| [#10458313](https://tatoeba.org/en/sentences/show/10458313) | Ah ! Quel beau jour ! | Ah! What a beautiful day! | Reject |  | Exclamative. |
| [#395391](https://tatoeba.org/en/sentences/show/395391) | Ah, je vous remercie, mon cher. | Oh, thank you, kind sir. | Reject |  | An odd, dated line. |
| [#378612](https://tatoeba.org/en/sentences/show/378612) | C'est mieux. | It's better. | Use |  |  |
| [#6599078](https://tatoeba.org/en/sentences/show/6599078) | Mon pied va mieux. | My foot is better. | Use |  |  |
| [#10673321](https://tatoeba.org/en/sentences/show/10673321) | De mieux en mieux ! | Better and better! | Use |  |  |
| [#9915](https://tatoeba.org/en/sentences/show/9915) | Son anglais est excellent. | Her English is excellent. | Use |  |  |
| [#130349](https://tatoeba.org/en/sentences/show/130349) | C'est comme cela qu'il est. | That's the way he is. | Reject |  | Idiom. |
| [#180805](https://tatoeba.org/en/sentences/show/180805) | Elle va beaucoup mieux aujourd'hui. | She's heaps better today. | Use | She's much better today. |  |
| [#181982](https://tatoeba.org/en/sentences/show/181982) | On doit toujours faire de son mieux. | We must always do our best. | Reject |  | Idiom. |
| [#330841](https://tatoeba.org/en/sentences/show/330841) | Oh, non ! vraiment ? | Oh no, really? | Reject |  | Punctuation: lower case after the exclamation mark. |
| [#331722](https://tatoeba.org/en/sentences/show/331722) | C'est un vin excellent. | That's an excellent wine. | Use |  |  |
| [#358363](https://tatoeba.org/en/sentences/show/358363) | Cela va bien avec ton pantalon. | It looks nice with your trousers. | Use |  |  |
| [#429159](https://tatoeba.org/en/sentences/show/429159) | Cela va sans dire. | That goes without saying. | Reject |  | Idiom. |
| [#465417](https://tatoeba.org/en/sentences/show/465417) | Personne ne pense cela. | No one thinks so. | Use | Nobody thinks that. |  |
| [#465523](https://tatoeba.org/en/sentences/show/465523) | Combien cela coûte par jour ? | How much does it cost a day? | Use |  |  |
| [#470446](https://tatoeba.org/en/sentences/show/470446) | Oh ! Aujourd'hui c'est mon jour. | Oh! Today is my day. | Reject |  | An odd line. |
| [#657645](https://tatoeba.org/en/sentences/show/657645) | Je sais que tu peux faire mieux. | I know you can make it better. | Use | I know you can do better. |  |
| [#715036](https://tatoeba.org/en/sentences/show/715036) | Cela me donne grand plaisir. | That gives me great pleasure. | Reject |  | Stilted; not how French says it. |
| [#781399](https://tatoeba.org/en/sentences/show/781399) | Oh, un bain, s'il vous plaît. | Oh, a bath, please. | Reject |  | An odd line. |
| [#888773](https://tatoeba.org/en/sentences/show/888773) | Cela me va bien. | It suits me. | Use | That suits me. |  |
| [#901840](https://tatoeba.org/en/sentences/show/901840) | Je ne peux faire mieux. | I can't do any better. | Reject |  | Literary negation without "pas". |
| [#920384](https://tatoeba.org/en/sentences/show/920384) | C'est mieux que rien. | Better than nothing. | Use |  |  |
| [#1114954](https://tatoeba.org/en/sentences/show/1114954) | Il parle l'anglais mieux que moi. | He speaks English better than I do. | Use | He speaks English better than me. |  |
| [#1184022](https://tatoeba.org/en/sentences/show/1184022) | Elle va mieux de jour en jour. | She is getting better day by day. | Use |  |  |
| [#1275371](https://tatoeba.org/en/sentences/show/1275371) | Qui t'a dit cela ? | Who told you that? | Reject |  | Passé composé. |
| [#1364447](https://tatoeba.org/en/sentences/show/1364447) | C'est toujours mieux que rien. | It's still better than nothing. | Use |  |  |
| [#1769516](https://tatoeba.org/en/sentences/show/1769516) | C'est on ne peut mieux. | It could not be better. | Reject |  | Idiom. |
| [#1769541](https://tatoeba.org/en/sentences/show/1769541) | Il peut faire mieux. | He can do better. | Use |  |  |
| [#1900924](https://tatoeba.org/en/sentences/show/1900924) | Écoute cela. | Listen to this. | Reject |  | Imperative. |
| [#2474037](https://tatoeba.org/en/sentences/show/2474037) | Je pense que c'est mieux. | I think that's best. | Use | I think that's better. |  |

## U621 · In My Opinion

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S17361 | À mon avis, c'est une bonne idée. | In my opinion, it's a good idea. | Keep |  | Correct, natural, A1; the English matches. |
| S17362 | Quel est ton avis ? | What's your opinion? | Keep | Swap: #4359959, the same sentence. | Correct, natural, A1; the English matches. |
| S17363 | À mon avis, c'est trop cher. | In my opinion, it's too expensive. | Keep |  | Correct, natural, A1; the English matches. |
| S17364 | Tu as un conseil pour moi ? | Do you have some advice for me? | Keep |  | Correct, natural, A1; the English matches. |
| S17365 | Vous êtes certain ? | Are you sure? | Keep |  | Correct, natural, A1; the English matches. |
| S17366 | Tu es certaine ? | Are you sure? | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#494013](https://tatoeba.org/en/sentences/show/494013) | J'ai un avis. | I have an opinion. | Use |  |  |
| [#2372063](https://tatoeba.org/en/sentences/show/2372063) | Il a un autre avis qu'elle. | He differs in opinion from her. | Reject |  | Awkward French ("un autre avis qu'elle"). |
| [#4359959](https://tatoeba.org/en/sentences/show/4359959) | Quel est ton avis ? | What is your opinion? | Use |  |  |
| [#7673](https://tatoeba.org/en/sentences/show/7673) | Suis mon conseil ! | Take my advice! | Reject |  | Imperative. |
| [#5340240](https://tatoeba.org/en/sentences/show/5340240) | C'est un bon conseil. | That's some good advice. | Use |  |  |
| [#13300109](https://tatoeba.org/en/sentences/show/13300109) | Merci de ton conseil. | Thank you for your advice. | Use | Thanks for your advice. |  |
| [#10208711](https://tatoeba.org/en/sentences/show/10208711) | Je n'en suis pas si certain. | I'm not so sure about that. | Reject |  | "En" is past A1. |
| [#10208709](https://tatoeba.org/en/sentences/show/10208709) | Je n'en suis pas si certaine. | I'm not so sure about that. | Reject |  | "En" is past A1. |
| [#7872](https://tatoeba.org/en/sentences/show/7872) | S'il vous plaît, suivez mon conseil. | Please take my advice. | Reject |  | Imperative. |
| [#10200](https://tatoeba.org/en/sentences/show/10200) | Merci de votre conseil. | Thank you for your advice. | Use |  |  |
| [#2465169](https://tatoeba.org/en/sentences/show/2465169) | Je pense que c'est très clair. | I think that's very clear. | Use |  |  |
| [#13915848](https://tatoeba.org/en/sentences/show/13915848) | Quel est ton conseil ? | What is your advice? | Use |  |  |
| [#13916014](https://tatoeba.org/en/sentences/show/13916014) | Quel est votre conseil ? | What is your advice? | Use |  |  |
| [#14038795](https://tatoeba.org/en/sentences/show/14038795) | Merci beaucoup pour votre conseil ! | Thank you very much for your advice! | Use |  |  |

## U602 · Going Out

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S17461 | On va au théâtre ce soir ? | Shall we go to the theatre tonight? | Keep |  | Correct, natural, A1; the English matches. |
| S17462 | Oui, à quelle heure ? | Yes, what time? | Keep |  | Correct, natural, A1; the English matches. |
| S17463 | Le théâtre est près de la gare. | The theatre is near the station. | Keep |  | Correct, natural, A1; the English matches. |
| S17464 | Il y a une exposition au musée. | There's an exhibition at the museum. | Keep |  | Correct, natural, A1; the English matches. |
| S17465 | L'exposition est très belle. | The exhibition is very beautiful. | Keep |  | Correct, natural, A1; the English matches. |
| S17466 | On se retrouve au bar ? | Shall we meet at the bar? | Keep |  | Correct, natural, A1; the English matches. |
| S17467 | Le bar est à côté du cinéma. | The bar is next to the cinema. | Keep |  | Correct, natural, A1; the English matches. |
| S17468 | Le spectacle commence à huit heures. | The show starts at eight. | Keep | Swap: #8229952 "Quand est votre prochain spectacle ?" | Correct, natural, A1; the English matches. |
| S17469 | C'est une exposition de peinture. | It's an exhibition of paintings. | Keep |  | Correct, natural, A1; the English matches. |
| S17470 | On va voir un spectacle samedi. | We're going to see a show on Saturday. | Keep |  | Correct, natural, A1; the English matches. |
| S17471 | J'aime la peinture et la musique. | I like painting and music. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#9889767](https://tatoeba.org/en/sentences/show/9889767) | Le spectacle doit continuer. | The show must go on. | Reject |  | A quotation. |
| [#8229952](https://tatoeba.org/en/sentences/show/8229952) | Quand est votre prochain spectacle ? | When is your next concert? | Use | When is your next show? |  |
| [#332339](https://tatoeba.org/en/sentences/show/332339) | J'adore danser. | I love to dance. | Use |  |  |
| [#672120](https://tatoeba.org/en/sentences/show/672120) | Elle veut danser. | She wants to dance. | Use |  |  |
| [#1974108](https://tatoeba.org/en/sentences/show/1974108) | Que le concert commence ! | Let the concert begin! | Reject |  | Exclamative wish. |

## U603 · Notices

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S17561 | Ici, le vélo est interdit. | Bikes aren't allowed here. | Keep |  | Correct; a real notice says "Vélos interdits", this spoken form is fine. |
| S17562 | J'ai perdu un objet. | I've lost something. | Keep |  | Correct; the English "something" is the right rendering of un objet here. |
| S17563 | C'est un petit objet. | It's a small object. | Keep |  | Correct, natural, A1; the English matches. |
| S17564 | Le magasin est ouvert jusqu'à sept heures. | The shop is open until seven. | Keep | Swap: #11325226 "Je peux rester ici jusqu'à demain." if a first-person line is wanted; the draft is the better notice. | Correct, natural, A1; the English matches. |
| S17565 | Pas de bruit, s'il vous plaît. | No noise, please. | Keep | Swap: #2136889 "Quel est ce bruit ?" | Correct, natural, A1; the English matches. |
| S17566 | La fin du film est triste. | The end of the film is sad. | Keep | Swap: #1606741 "C'est la fin." | Correct, natural, A1; the English matches. |
| S17567 | Il y a des chiens partout. | There are dogs everywhere. | Keep |  | Correct, natural, A1; the English matches. |
| S17568 | Le parc est fermé jusqu'à lundi. | The park is closed until Monday. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#11247701](https://tatoeba.org/en/sentences/show/11247701) | Tout cela est interdit. | All this is forbidden. | Use | All that is forbidden. |  |
| [#11372408](https://tatoeba.org/en/sentences/show/11372408) | Notre amour est interdit. | Our love is forbidden. | Reject |  | A love line. |
| [#3214679](https://tatoeba.org/en/sentences/show/3214679) | Attends jusqu'à demain. | Wait until tomorrow. | Reject |  | Imperative. |
| [#338443](https://tatoeba.org/en/sentences/show/338443) | Prenez un taxi jusqu'à l'hôtel. | Take a taxi to the hotel. | Reject |  | Imperative; Notices is not the instruction circle. |
| [#11325226](https://tatoeba.org/en/sentences/show/11325226) | Je peux rester ici jusqu'à demain. | I can stay here until tomorrow. | Use |  |  |
| [#2136889](https://tatoeba.org/en/sentences/show/2136889) | Quel est ce bruit ? | What is that noise? | Use | What's that noise? |  |
| [#429231](https://tatoeba.org/en/sentences/show/429231) | Ne fais pas de bruit. | Don't make a noise. | Reject |  | Imperative. |
| [#11685307](https://tatoeba.org/en/sentences/show/11685307) | D'où vient ce bruit ? | Where's the noise coming from? | Use | Where's that noise coming from? |  |
| [#1606741](https://tatoeba.org/en/sentences/show/1606741) | C'est la fin. | This is the end. | Use | It's the end. |  |
| [#14013503](https://tatoeba.org/en/sentences/show/14013503) | Ce n'est pas la fin. | This is not the end. | Use |  |  |
| [#400878](https://tatoeba.org/en/sentences/show/400878) | C'est la fin de mon histoire. | This is the end of my story. | Use |  |  |
| [#9672132](https://tatoeba.org/en/sentences/show/9672132) | Cherche partout. | Look everywhere. | Reject |  | Imperative. |
| [#6601891](https://tatoeba.org/en/sentences/show/6601891) | Le bruit est trop pour moi. | The noise is too much for me. | Reject |  | Not French: "le bruit est trop fort pour moi". |
| [#7257865](https://tatoeba.org/en/sentences/show/7257865) | Le début de l'histoire est intéressant. | The start of the story is interesting. | Use |  |  |
| [#9147574](https://tatoeba.org/en/sentences/show/9147574) | C'est le début de l'année. | It's the beginning of the year. | Use |  |  |
| [#12035053](https://tatoeba.org/en/sentences/show/12035053) | Elle n'aime pas le bruit. | She does not like noise. | Use |  |  |

## U612 · Health

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S17661 | Il y a un accident devant la gare. | There's been an accident outside the station. | Keep |  | Correct; French present for a scene the English puts in the perfect. |
| S17662 | Le sport, c'est bon pour la santé. | Sport is good for your health. | Keep | Swap: #459824 "Le sport est bon pour votre santé." | Correct, natural, A1; the English matches. |
| S17663 | Je vais tomber ! | I'm going to fall! | Keep |  | Correct, natural, A1; the English matches. |
| S17665 | Elle est en bonne santé. | She's in good health. | Keep |  | Correct, natural, A1; the English matches. |
| S17666 | L'enfant tombe et pleure. | The child falls and cries. | Keep |  | Correct, natural, A1; the English matches. |
| S17667 | Le bébé va tomber ! | The baby is going to fall! | Keep |  | Correct, natural, A1; the English matches. |
| S17668 | Il ne faut pas pleurer. | There's no need to cry. | Keep |  | Correct; "il ne faut pas" reads as "you mustn't" or "there's no need", both fit. |
| S17669 | Le bébé commence à pleurer. | The baby starts to cry. | Keep |  | Correct, natural, A1; the English matches. |
| S17670 | Elle commence à pleurer. | She starts to cry. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#5696921](https://tatoeba.org/en/sentences/show/5696921) | La santé avant tout ! | Health first! | Reject |  | A slogan fragment. |
| [#12543314](https://tatoeba.org/en/sentences/show/12543314) | Qu'est-ce que la santé ? | What is health? | Reject |  | An odd line. |
| [#12207006](https://tatoeba.org/en/sentences/show/12207006) | Notre santé est très bonne. | Our health is very good. | Use |  |  |
| [#11965284](https://tatoeba.org/en/sentences/show/11965284) | Tu veux tomber de là ? | Do you want to fall from there? | Reject |  | An odd line. |
| [#12080010](https://tatoeba.org/en/sentences/show/12080010) | Ne me laisse pas tomber ! | Don't let me fall! | Reject |  | Imperative and idiom. |
| [#1209932](https://tatoeba.org/en/sentences/show/1209932) | Si tu veux pleurer, pleure. | If you want to cry, cry. | Reject |  | Imperative. |
| [#12076339](https://tatoeba.org/en/sentences/show/12076339) | J'ai entendu un enfant pleurer. | I heard a child crying. | Reject |  | Passé composé. |
| [#129053](https://tatoeba.org/en/sentences/show/129053) | Courir est bon pour la santé. | Running is good for the health. | Use | Running is good for your health. |  |
| [#139651](https://tatoeba.org/en/sentences/show/139651) | Mon anniversaire tombe un dimanche. | My birthday falls on Sunday. | Use |  |  |
| [#381881](https://tatoeba.org/en/sentences/show/381881) | On pleure quand on est très triste. | We cry when we are very sad. | Use | We cry when we're very sad. |  |
| [#459824](https://tatoeba.org/en/sentences/show/459824) | Le sport est bon pour votre santé. | Sport is good for your health. | Use |  |  |
| [#609668](https://tatoeba.org/en/sentences/show/609668) | L'enfant ne pleure plus. | The child is not crying anymore. | Use | The child isn't crying any more. |  |
| [#1153650](https://tatoeba.org/en/sentences/show/1153650) | Je tombe. | I'm falling. | Use |  |  |
| [#1675983](https://tatoeba.org/en/sentences/show/1675983) | Oui, je pleure. | Yes, I am crying. | Use |  |  |
| [#2144545](https://tatoeba.org/en/sentences/show/2144545) | Ne pleure pas ! | Don't cry. | Reject |  | Imperative. |
| [#7758311](https://tatoeba.org/en/sentences/show/7758311) | On ne peut pas vivre sans air. | We can't live without air. | Use |  |  |
| [#11464210](https://tatoeba.org/en/sentences/show/11464210) | Il est tard et la nuit tombe. | It's late and night falls. | Use | It's late and night is falling. |  |
| [#13108488](https://tatoeba.org/en/sentences/show/13108488) | Le printemps est dans l'air. | Spring is in the air. | Reject |  | Idiom. |
| [#13151700](https://tatoeba.org/en/sentences/show/13151700) | Va prendre l'air. | Get some fresh air. | Reject |  | Imperative. |
| [#13795866](https://tatoeba.org/en/sentences/show/13795866) | Le garçon pleure. | The boy is crying. | Use |  |  |

## U604 · Instructions

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S17767 | Ajoutez du sucre. | Add some sugar. | Keep |  | Correct, natural, A1; the English matches. |
| S17768 | Je vais ajouter un peu d'eau. | I'm going to add a little water. | Keep | Swap: #487838 "Je n'ai rien à ajouter." | Correct, natural, A1; the English matches. |
| S17769 | Tu peux ajouter ton nom ? | Can you add your name? | Keep |  | Correct, natural, A1; the English matches. |
| S17770 | Je vais installer l'ordinateur. | I'm going to set up the computer. | Keep |  | Correct, natural, A1; the English matches. |
| S17771 | On peut installer la télé ici. | We can put the TV here. | Keep |  | Correct; installer la télé is set up, the English "put" is fine. |
| S17772 | Tu peux tenir mon sac ? | Can you hold my bag? | Keep |  | Correct, natural, A1; the English matches. |
| S17773 | Il faut tenir la porte. | You have to hold the door. | Keep |  | Correct, natural, A1; the English matches. |
| S17774 | Il faut ajouter du lait. | You have to add some milk. | Keep |  | Correct, natural, A1; the English matches. |
| S17775 | Le bus ne peut pas avancer. | The bus can't move forward. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#487838](https://tatoeba.org/en/sentences/show/487838) | Je n'ai rien à ajouter. | I've got nothing more to say. | Use | I have nothing to add. |  |
| [#1336139](https://tatoeba.org/en/sentences/show/1336139) | Tu peux t'asseoir où tu veux. | You may sit wherever you like. | Use | You can sit wherever you want. |  |
| [#12583232](https://tatoeba.org/en/sentences/show/12583232) | Viens et assieds-toi avec nous. | Come and sit with us. | Use | Come and sit with us. |  |
| [#12942677](https://tatoeba.org/en/sentences/show/12942677) | Assieds-toi à ma droite. | Come sit to my right. | Use | Sit on my right. |  |
| [#12999709](https://tatoeba.org/en/sentences/show/12999709) | Je dois m'asseoir. | I have to sit down. | Use |  |  |

## U605 · Weekend Plans

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S17861 | Je t'emmène au cinéma samedi. | I'm taking you to the cinema on Saturday. | Keep |  | Correct, natural, A1; the English matches. |
| S17862 | On se promène dimanche ? | Shall we go for a walk on Sunday? | Keep |  | Correct, natural, A1; the English matches. |
| S17863 | Oui, dans le parc ! | Yes, in the park! | Keep |  | Correct, natural, A1; the English matches. |
| S17864 | Il emmène ses enfants à la plage. | He takes his children to the beach. | Keep |  | Correct, natural, A1; the English matches. |
| S17865 | Paul m'accompagne au cinéma. | Paul is coming with me to the cinema. | Keep |  | Correct, natural, A1; the English matches. |
| S17866 | Tu peux m'emmener à la gare ? | Can you take me to the station? | Keep |  | Correct, natural, A1; the English matches. |
| S17867 | Je vais emmener les enfants au parc. | I'm going to take the children to the park. | Keep |  | Correct, natural, A1; the English matches. |
| S17868 | Elle partage sa chambre avec sa sœur. | She shares her room with her sister. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#180265](https://tatoeba.org/en/sentences/show/180265) | Je me promène dans le parc. | I walk in the park. | Use | I go for a walk in the park. |  |
| [#8631285](https://tatoeba.org/en/sentences/show/8631285) | Je me promène dans le noir. | I'm wandering in the dark. | Reject |  | An odd line. |
| [#181280](https://tatoeba.org/en/sentences/show/181280) | Elle se promène parfois dans le parc. | She sometimes takes a walk in the park. | Use |  |  |
| [#959379](https://tatoeba.org/en/sentences/show/959379) | Je vais vous emmener avec ma voiture. | I will give you a ride in my car. | Use | I'll take you in my car. |  |
| [#13409471](https://tatoeba.org/en/sentences/show/13409471) | Je ne partage rien avec lui. | I'm not sharing anything with him. | Reject |  | A harsh line. |
| [#9107364](https://tatoeba.org/en/sentences/show/9107364) | Je ne partage pas votre avis. | I don't share your opinion. | Use |  |  |
| [#9049](https://tatoeba.org/en/sentences/show/9049) | Je partage la même idée que toi. | I share your idea. | Reject |  | Awkward French; "Je suis d'accord avec toi" is the natural line. |
| [#10236](https://tatoeba.org/en/sentences/show/10236) | Je vais vous accompagner. | I will come with you. | Use | I'll come with you. |  |
| [#354627](https://tatoeba.org/en/sentences/show/354627) | On lui a dit de m'accompagner. | She was told to accompany me. | Reject |  | Passé composé. |
| [#1008461](https://tatoeba.org/en/sentences/show/1008461) | On va se promener ? | Shall we go for a walk? | Use |  |  |
| [#1071828](https://tatoeba.org/en/sentences/show/1071828) | J'aime me promener seul. | I like to walk alone. | Use | I like walking alone. |  |
| [#7463579](https://tatoeba.org/en/sentences/show/7463579) | Merci de partager cela avec moi. | Thanks for sharing this with me. | Use | Thanks for sharing that with me. |  |

## U613 · People + Places

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S18061 | La ville a beaucoup d'habitants. | The town has a lot of inhabitants. | Keep |  | Correct, natural, A1; the English matches. |
| S18062 | Les habitants sont là. | The locals are here. | Keep |  | Correct but thin; "The locals are here" needs a scene. Fine as a word carrier. |
| S18063 | Il y a combien d'habitants ici ? | How many people live here? | Keep |  | Correct, natural, A1; the English matches. |
| S18064 | Je suis un habitant de la ville. | I'm a resident of the town. | Keep |  | Correct, natural, A1; the English matches. |
| S18065 | Chaque habitant a une carte. | Every resident has a card. | Keep |  | Correct, natural, A1; the English matches. |
| S18066 | Un habitant m'aide. | A local is helping me. | Keep |  | Correct, natural, A1; the English matches. |
| S18067 | J'habite dans le nord. | I live in the north. | Keep | Swap: #3981637 "Elle vient du nord." | Correct, natural, A1; the English matches. |
| S18068 | Il fait froid dans le nord. | It's cold in the north. | Keep |  | Correct, natural, A1; the English matches. |
| S18069 | Le nord de la France est beau. | The north of France is beautiful. | Keep |  | Correct, natural, A1; the English matches. |
| S18070 | La maison a un siècle. | The house is a hundred years old. | Keep |  | Correct, natural, A1; the English matches. |
| S18071 | Un siècle, c'est cent ans. | A century is a hundred years. | Keep |  | Correct, natural, A1; the English matches. |
| S18072 | Ma grand-mère a presque un siècle. | My grandmother is almost a hundred. | Keep |  | Correct, natural, A1; the English matches. |
| S18073 | C'est une ville moderne. | It's a modern town. | Keep | Swap: #8798203 "Marie est une femme moderne." | Correct, natural, A1; the English matches. |
| S18075 | La gare est très moderne. | The station is very modern. | Keep |  | Correct, natural, A1; the English matches. |
| S18076 | Il y a un jardin autour de la maison. | There's a garden around the house. | Keep |  | Correct, natural, A1; the English matches. |
| S18077 | On marche autour du parc. | We walk around the park. | Keep |  | Correct, natural, A1; the English matches. |
| S18078 | Nous avons de nombreux livres. | We have many books. | Keep | Swap: #12692854 "Nous sommes nombreux." | Correct, natural, A1; the English matches. |
| S18079 | Le roi et la reine sont là. | The king and queen are here. | Keep |  | Correct, natural, A1; the English matches. |
| S18080 | Il y a des gens autour de moi. | There are people around me. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#3981637](https://tatoeba.org/en/sentences/show/3981637) | Elle vient du nord. | She comes from the north. | Use |  |  |
| [#1247599](https://tatoeba.org/en/sentences/show/1247599) | C'est une fille moderne. | She's a modern girl. | Use |  |  |
| [#8798203](https://tatoeba.org/en/sentences/show/8798203) | Marie est une femme moderne. | Mary is a modern woman. | Use | Marie is a modern woman. |  |
| [#12692854](https://tatoeba.org/en/sentences/show/12692854) | Nous sommes nombreux. | There are a lot of us. | Use |  |  |
| [#8884846](https://tatoeba.org/en/sentences/show/8884846) | Notre grand-mère a de nombreux chiens. | Our grandmother has many dogs. | Use |  |  |
| [#781406](https://tatoeba.org/en/sentences/show/781406) | Je suis le roi du monde ! | I'm the king of the world! | Reject |  | A film quotation. |
| [#1153657](https://tatoeba.org/en/sentences/show/1153657) | Le roi arrive. | The king is coming. | Use |  |  |
| [#1625051](https://tatoeba.org/en/sentences/show/1625051) | Il est heureux comme un roi. | He is as happy as a king. | Reject |  | Idiom. |
| [#9085237](https://tatoeba.org/en/sentences/show/9085237) | C'est notre reine. | She's our queen. | Use |  |  |
| [#10854407](https://tatoeba.org/en/sentences/show/10854407) | Le roi vit dans le château. | The king lives in the castle. | Use |  |  |
| [#10854408](https://tatoeba.org/en/sentences/show/10854408) | Le roi habite le château. | The king lives in the castle. | Use |  |  |
| [#11069869](https://tatoeba.org/en/sentences/show/11069869) | L'amour est roi. | Love is king. | Reject |  | An odd line. |
| [#11318543](https://tatoeba.org/en/sentences/show/11318543) | J'étudie plusieurs langues en même temps. | I'm studying several languages at the same time. | Use |  |  |
| [#11519266](https://tatoeba.org/en/sentences/show/11519266) | La reine est dans son château. | The queen is in her castle. | Use |  |  |
| [#11598296](https://tatoeba.org/en/sentences/show/11598296) | Qui est le roi d'Espagne ? | Who is the king of Spain? | Use |  |  |
| [#11599039](https://tatoeba.org/en/sentences/show/11599039) | Qui est le roi ? | Who is the king? | Use |  |  |
| [#12316099](https://tatoeba.org/en/sentences/show/12316099) | Je parle plusieurs langues. | I speak many languages. | Use | I speak several languages. |  |
| [#14076320](https://tatoeba.org/en/sentences/show/14076320) | Je suis la reine de France. | I am the queen of France. | Use |  |  |

## U622 · Yes or No

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S17961 | J'accepte avec plaisir. | I accept with pleasure. | Keep |  | Correct, natural, A1; the English matches. |
| S17962 | Elle accepte le cadeau. | She accepts the present. | Keep |  | Correct, natural, A1; the English matches. |
| S17963 | Tu viens samedi ? | Are you coming on Saturday? | Keep |  | Correct, natural, A1; the English matches. |
| S17964 | Désolé, je ne peux pas. | Sorry, I can't. | Keep |  | Correct, natural, A1; the English matches. |
| S17965 | Je te promets. | I promise you. | Fix | "Je te le promets." = "I promise you." | On its own "Je te promets" hangs; French adds "le" (or "C'est promis"). Needs le as a known object pronoun; if it is not, keep the draft and accept both. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#139590](https://tatoeba.org/en/sentences/show/139590) | Accepte l'amour de quelqu'un. | Accept a person's love. | Reject |  | Imperative. |
| [#11745416](https://tatoeba.org/en/sentences/show/11745416) | Je promets de ne jamais te quitter. | I promise you I won't ever leave you. | Reject |  | A love line. |
| [#401159](https://tatoeba.org/en/sentences/show/401159) | Je ne peux pas accepter ton cadeau. | I cannot accept your gift. | Use |  |  |

## U606 · Feelings

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S18161 | Le sport, ça m'intéresse. | Sport interests me. | Keep | Swap: #9579319 "Ça m'intéresse." | Correct, natural, A1; the English matches. |
| S18162 | La musique m'intéresse beaucoup. | Music interests me a lot. | Keep |  | Correct, natural, A1; the English matches. |
| S18163 | J'aime m'amuser. | I like having fun. | Keep | Swap: #970628 "Je veux m'amuser." | Correct, natural, A1; the English matches. |
| S18164 | Tu vas t'amuser à la fête. | You'll have fun at the party. | Keep |  | Correct, natural, A1; the English matches. |
| S18165 | Je ne veux pas t'ennuyer. | I don't want to bore you. | Keep |  | Correct, natural, A1; the English matches. |
| S18166 | Je t'offre un café ? | Can I buy you a coffee? | Keep | Swap: #14033 "Je vous offre à boire ?" | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#9579319](https://tatoeba.org/en/sentences/show/9579319) | Ça m'intéresse. | I'm interested in that. | Use | That interests me. |  |
| [#970628](https://tatoeba.org/en/sentences/show/970628) | Je veux m'amuser. | I want to have fun. | Use |  |  |
| [#14010987](https://tatoeba.org/en/sentences/show/14010987) | Je t'offre mon cœur ! | I'm gifting you my heart! | Reject |  | A love line. |
| [#14033](https://tatoeba.org/en/sentences/show/14033) | Je vous offre à boire ? | May I offer you a drink? | Use | Can I get you a drink? |  |
| [#430636](https://tatoeba.org/en/sentences/show/430636) | Je vais accepter votre offre. | I'll accept your offer. | Reject |  | "Offre" here is the noun, not the verb form the circle teaches; a sense trap. |
| [#3384](https://tatoeba.org/en/sentences/show/3384) | C'est une surprise. | It's a surprise. | Use |  |  |
| [#139433](https://tatoeba.org/en/sentences/show/139433) | Quelle surprise ! | What a surprise! | Reject |  | Exclamative. |
| [#378891](https://tatoeba.org/en/sentences/show/378891) | Je m'ennuie. | I'm bored. | Use |  |  |
| [#652819](https://tatoeba.org/en/sentences/show/652819) | Quelle surprise de te voir ici ! | What a surprise to see you here! | Reject |  | Exclamative. |
| [#2515899](https://tatoeba.org/en/sentences/show/2515899) | Nous avons une petite surprise pour toi. | We have a little surprise for you. | Use |  |  |
| [#3216758](https://tatoeba.org/en/sentences/show/3216758) | L'école m'ennuie. | School bores me. | Use |  |  |
| [#13054641](https://tatoeba.org/en/sentences/show/13054641) | D'accord. J'accepte votre offre. | All right. I accept your offer. | Reject |  | Two sentences, and offre as a noun. |
| [#13309877](https://tatoeba.org/en/sentences/show/13309877) | On s'ennuie grave. | We're bored as hell. | Reject |  | Slang ("grave"). |

## U607 · Writing Back

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S18261 | Paul vous salue. | Paul says hello. | Keep |  | Correct; "Paul vous salue" is the letter phrase for "Paul says hello". |
| S18262 | Tu peux saluer ta mère pour moi ? | Can you say hello to your mother for me? | Keep |  | Correct, natural, A1; the English matches. |
| S18263 | Il salue le prof. | He says hello to the teacher. | Keep |  | Correct, natural, A1; the English matches. |
| S18264 | Je vais saluer Marie. | I'm going to say hello to Marie. | Keep |  | Correct, natural, A1; the English matches. |
| S18265 | Je peux apporter quelque chose ? | Can I bring something? | Keep |  | Correct, natural, A1; the English matches. |
| S18266 | Oui, un dessert, si tu veux. | Yes, a dessert, if you like. | Keep |  | Correct, natural, A1; the English matches. |
| S18267 | Je vais apporter du pain. | I'm going to bring some bread. | Keep |  | Correct, natural, A1; the English matches. |
| S18268 | Elle apporte un cadeau. | She's bringing a present. | Keep | Swap: #11665987 "Elle apporte le fromage." | Correct, natural, A1; the English matches. |
| S18269 | Ma grand-mère vous salue. | My grandmother says hello. | Keep |  | Correct, natural, A1; the English matches. |
| S18270 | Je voudrais saluer tes parents. | I'd like to say hello to your parents. | Keep |  | Correct, natural, A1; the English matches. |
| S18271 | Tu peux apporter le dessert ? | Can you bring the dessert? | Keep |  | Correct, natural, A1; the English matches. |
| S18272 | Paul apporte de l'eau. | Paul is bringing some water. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#1158209](https://tatoeba.org/en/sentences/show/1158209) | Je te salue. | I greet you. | Reject |  | "Je te salue" is a stiff greeting, not what the circle teaches (saluer for say hello to). |
| [#407307](https://tatoeba.org/en/sentences/show/407307) | Apporte la clé. | Bring the key. | Reject |  | Imperative. |
| [#11665987](https://tatoeba.org/en/sentences/show/11665987) | Elle apporte le fromage. | She brings the cheese. | Use |  |  |
| [#9700](https://tatoeba.org/en/sentences/show/9700) | Je dois faire quelque chose. | I have some things I need to do. | Use | I have to do something. |  |
| [#136483](https://tatoeba.org/en/sentences/show/136483) | Tu vas quelque part ? | Are you going anywhere? | Use |  |  |
| [#181079](https://tatoeba.org/en/sentences/show/181079) | Elle s'occupe de mes enfants. | She takes care of my children. | Use | She looks after my children. |  |
| [#663828](https://tatoeba.org/en/sentences/show/663828) | Je vais m'en occuper. | I'll see to it. | Reject |  | "En" is past A1. |
| [#1012287](https://tatoeba.org/en/sentences/show/1012287) | Je m'en occupe. | I'm taking care of it. | Reject |  | "En" is past A1. |
| [#2046348](https://tatoeba.org/en/sentences/show/2046348) | Je peux vous emmener quelque part ? | Can I offer you guys a ride? | Use | Can I take you somewhere? |  |
| [#3050753](https://tatoeba.org/en/sentences/show/3050753) | Je souhaite discuter avec ton oncle. | I want to talk to your uncle. | Use | I'd like to talk with your uncle. |  |
| [#3219092](https://tatoeba.org/en/sentences/show/3219092) | Je vais m'en occuper pour toi. | I'm going to take care of it for you. | Reject |  | "En" is past A1. |
| [#12778989](https://tatoeba.org/en/sentences/show/12778989) | Grand-mère va s'occuper de toi. | Grandmother will take care of you. | Use | Grandma will look after you. |  |
| [#12778991](https://tatoeba.org/en/sentences/show/12778991) | Grand-mère va s'occuper de vous. | Grandmother will take care of you. | Use | Grandma will look after you. |  |

## U614 · Describing

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S18461 | Ma mère est très douce. | My mother is very gentle. | Keep |  | Correct; douce here is gentle. The Glossary gloss for doux is "sweet"; see the senses note. |
| S18462 | Mon chien est brun. | My dog is brown. | Keep | Swap: #12013840 "J'ai un cheval brun." (brun sits more naturally on a horse). | Correct; for animals and things French more often says marron, but brun is right for a dog's coat. |
| S18463 | En général, je me lève tôt. | In general, I get up early. | Keep |  | Correct, natural, A1; the English matches. |
| S18464 | En général, il fait beau ici. | The weather is usually nice here. | Keep |  | Correct, natural, A1; the English matches. |
| S18465 | C'est un gros chien. | It's a big dog. | Keep | Swap: #1152621 "Ce chien est gros." | Correct, natural, A1; the English matches. |
| S18466 | Il a un gros sac. | He has a big bag. | Keep |  | Correct, natural, A1; the English matches. |
| S18467 | Elle a une grosse voiture. | She has a big car. | Keep |  | Correct, natural, A1; the English matches. |
| S18468 | Le film est long. | The film is long. | Keep | Swap: #10693787 "C'est un long voyage." | Correct, natural, A1; the English matches. |
| S18469 | La semaine est longue. | The week is long. | Keep |  | Correct, natural, A1; the English matches. |
| S18470 | Il est très pauvre. | He is very poor. | Keep | Swap: #748130 "Il est pauvre, mais heureux." | Correct, natural, A1; the English matches. |
| S18471 | Pauvre Paul ! | Poor Paul! | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#12013840](https://tatoeba.org/en/sentences/show/12013840) | J'ai un cheval brun. | I have a brown horse. | Use |  |  |
| [#1176735](https://tatoeba.org/en/sentences/show/1176735) | Il rentre chez lui tard en général. | He usually comes home late. | Use | He usually gets home late. |  |
| [#1168737](https://tatoeba.org/en/sentences/show/1168737) | Il est gros. | He is overweight. | Reject |  | Gros of a person is fat; a body line. |
| [#3155](https://tatoeba.org/en/sentences/show/3155) | Je suis si gros. | I'm so fat. | Reject |  | Gros of a person is fat; a body line. |
| [#1152621](https://tatoeba.org/en/sentences/show/1152621) | Ce chien est gros. | That dog is big. | Use | This dog is big. |  |
| [#10580435](https://tatoeba.org/en/sentences/show/10580435) | C'est pourquoi je suis si grosse. | That's why I'm so fat. | Reject |  | Gros of a person is fat; a body line. |
| [#1244756](https://tatoeba.org/en/sentences/show/1244756) | Dix ans, c'est long. | Ten years is a long time. | Use |  |  |
| [#10693787](https://tatoeba.org/en/sentences/show/10693787) | C'est un long voyage. | It is a long journey. | Use |  |  |
| [#400845](https://tatoeba.org/en/sentences/show/400845) | Qu'est-ce que ce pont est long ! | How long that bridge is! | Reject |  | Exclamative. |
| [#1153553](https://tatoeba.org/en/sentences/show/1153553) | Longue journée ? | Long day? | Reject |  | A fragment. |
| [#3764538](https://tatoeba.org/en/sentences/show/3764538) | Tu es pauvre. | You're poor. | Reject |  | A blunt personal line. |
| [#9014070](https://tatoeba.org/en/sentences/show/9014070) | Pauvre de moi. | Poor me. | Reject |  | Idiom. |
| [#12166237](https://tatoeba.org/en/sentences/show/12166237) | Pauvre chien ! | Poor dog. | Use | Poor dog! |  |
| [#435599](https://tatoeba.org/en/sentences/show/435599) | Je suis pauvre. | I'm poor. | Use |  |  |
| [#748130](https://tatoeba.org/en/sentences/show/748130) | Il est pauvre, mais heureux. | He is poor, but happy. | Use |  |  |
| [#1046613](https://tatoeba.org/en/sentences/show/1046613) | Elle est pauvre, mais heureuse. | She is poor, but happy. | Use |  |  |
| [#1647004](https://tatoeba.org/en/sentences/show/1647004) | Facile n'est pas toujours simple. | Easy isn't always simple. | Reject |  | An aphorism. |
| [#1683238](https://tatoeba.org/en/sentences/show/1683238) | En gros, c'est ça. | That's about it. | Reject |  | Idiom. |
| [#2084348](https://tatoeba.org/en/sentences/show/2084348) | Je suis trop gros. | I'm too fat. | Reject |  | Gros of a person is fat; a body line. |
| [#2150420](https://tatoeba.org/en/sentences/show/2150420) | C'est une idée très simple. | It's a very simple idea. | Use |  |  |
| [#2860156](https://tatoeba.org/en/sentences/show/2860156) | Ce n'est pas aussi simple. | It isn't that simple. | Use | It's not that simple. |  |
| [#2881796](https://tatoeba.org/en/sentences/show/2881796) | Le livre est gros. | The book is big. | Use | The book is big. |  |
| [#3213405](https://tatoeba.org/en/sentences/show/3213405) | Ils sont trop gros. | They're too fat. | Reject |  | Gros of people is fat; a body line. |
| [#3288989](https://tatoeba.org/en/sentences/show/3288989) | Tout est plus simple. | Everything is simpler. | Use |  |  |
| [#3764542](https://tatoeba.org/en/sentences/show/3764542) | Je ne suis pas pauvre. | I'm not poor. | Use |  |  |
| [#3764543](https://tatoeba.org/en/sentences/show/3764543) | Tu n'es pas pauvre. | You're not poor. | Use |  |  |
| [#8797071](https://tatoeba.org/en/sentences/show/8797071) | Quel est ton plus gros problème ? | What is your biggest problem? | Use |  |  |
| [#11111758](https://tatoeba.org/en/sentences/show/11111758) | Je cherche la lumière. | I am seeking the light. | Reject |  | An odd line. |
| [#11262440](https://tatoeba.org/en/sentences/show/11262440) | Il est trop gros pour courir vite. | He is too fat to run quickly. | Reject |  | Gros of a person is fat; a body line. |
| [#11426581](https://tatoeba.org/en/sentences/show/11426581) | La lumière de mai est magnifique. | The light in May is wonderful. | Use |  |  |
| [#12148483](https://tatoeba.org/en/sentences/show/12148483) | Oui, c'est aussi simple. | Yes, it's that easy. | Use | Yes, it's that simple. |  |
| [#12180452](https://tatoeba.org/en/sentences/show/12180452) | Elle a un gros problème. | She has a big problem. | Use |  |  |
| [#12219858](https://tatoeba.org/en/sentences/show/12219858) | J'ai un gros chat. | I have a big cat. | Use |  |  |
| [#13078882](https://tatoeba.org/en/sentences/show/13078882) | Bonjour, ma lumière. | Hello, my light. | Reject |  | An odd line. |
| [#13365769](https://tatoeba.org/en/sentences/show/13365769) | Le français est une langue simple. | French is a simple language. | Use |  |  |

## U623 · Louder, Please

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S18361 | Plus fort, s'il vous plaît ! | Louder, please! | Keep |  | Correct, natural, A1; the English matches. |
| S18362 | Je n'entends pas ta voix. | I can't hear your voice. | Keep |  | Correct, natural, A1; the English matches. |
| S18363 | Elle a une belle voix. | She has a beautiful voice. | Keep | Swap: #12988127, the same sentence. | Correct, natural, A1; the English matches. |
| S18365 | Je reviens tout de suite. | I'll be right back. | Keep |  | Correct; "tout de suite" is the set phrase; the Glossary gloss for suite (next step) is not this sense. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#549027](https://tatoeba.org/en/sentences/show/549027) | Il est très fort. | He is extremely strong. | Use | He's very strong. |  |
| [#432753](https://tatoeba.org/en/sentences/show/432753) | Il est grand et fort. | He is tall and strong. | Use |  |  |
| [#11186](https://tatoeba.org/en/sentences/show/11186) | Ne parle pas fort ici. | Don't talk in a loud voice here. | Reject |  | Imperative. |
| [#11925954](https://tatoeba.org/en/sentences/show/11925954) | J'entends des voix. | I hear voices. | Reject |  | An odd line (hearing voices). |
| [#2485871](https://tatoeba.org/en/sentences/show/2485871) | Tu as une belle voix. | You have a beautiful voice. | Use |  |  |
| [#12988127](https://tatoeba.org/en/sentences/show/12988127) | Elle a une belle voix. | She has a beautiful voice. | Use |  |  |
| [#8996](https://tatoeba.org/en/sentences/show/8996) | C'est ton tour. | It's your turn. | Use |  |  |
| [#139512](https://tatoeba.org/en/sentences/show/139512) | Ne parle pas si fort ! | Don't talk so loud. | Reject |  | Imperative. |
| [#391253](https://tatoeba.org/en/sentences/show/391253) | C'est notre tour de rire. | It is our turn to laugh. | Reject |  | An odd line. |
| [#440746](https://tatoeba.org/en/sentences/show/440746) | Il est petit mais fort. | He is short, but strong. | Use | He's small but strong. |  |
| [#800069](https://tatoeba.org/en/sentences/show/800069) | Il parle anglais très fort. | He speaks English very loudly. | Use |  |  |
| [#1066757](https://tatoeba.org/en/sentences/show/1066757) | Je suis aussi fort que toi. | I am as strong as you. | Use |  |  |
| [#8826989](https://tatoeba.org/en/sentences/show/8826989) | Maintenant c'est ton tour. | Now, it's your turn. | Use | Now it's your turn. |  |
| [#8826992](https://tatoeba.org/en/sentences/show/8826992) | C'est ton tour maintenant. | Now, it's your turn. | Use | It's your turn now. |  |
| [#8911418](https://tatoeba.org/en/sentences/show/8911418) | Ce n'est pas ton tour. | It's not your turn. | Use |  |  |
| [#11967535](https://tatoeba.org/en/sentences/show/11967535) | Je t'aime très, très fort. | I love you very, very much. | Reject |  | A love line. |
| [#11967536](https://tatoeba.org/en/sentences/show/11967536) | Je vous aime très, très fort. | I love you very, very much. | Reject |  | A love line. |
| [#11967539](https://tatoeba.org/en/sentences/show/11967539) | Je t'aime très, très, très fort. | I love you very, very, very much. | Reject |  | A love line. |
| [#11967540](https://tatoeba.org/en/sentences/show/11967540) | Je vous aime très, très, très fort. | I love you very, very, very much. | Reject |  | A love line. |
| [#12270761](https://tatoeba.org/en/sentences/show/12270761) | Alors — c'est ton tour. | Now then—your turn. | Reject |  | A dash in the middle; odd punctuation. |
| [#13187980](https://tatoeba.org/en/sentences/show/13187980) | C'est mon tour aujourd'hui. | It's my turn today. | Use |  |  |
| [#14054069](https://tatoeba.org/en/sentences/show/14054069) | Je suis aussi fort que vous. | I'm as strong as you. | Use |  |  |

## U608 · Life Stories

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S18561 | Sans eau, on peut mourir. | Without water, you can die. | Keep |  | Correct, natural, A1; the English matches. |
| S18562 | On ne va pas mourir ! | We're not going to die! | Keep |  | Correct, natural, A1; the English matches. |
| S18563 | Je ne veux pas mourir jeune. | I don't want to die young. | Keep |  | Correct, natural, A1; the English matches. |
| S18564 | Le bébé va naître en mai. | The baby will be born in May. | Keep |  | Correct, natural, A1; the English matches. |
| S18565 | Mon fils va naître bientôt. | My son will be born soon. | Keep |  | Correct, natural, A1; the English matches. |
| S18566 | Le bébé doit naître demain. | The baby is due tomorrow. | Keep |  | Correct; "doit naître" is how French says due. |
| S18567 | Tout à coup, il pleure. | Suddenly, he cries. | Keep |  | Correct; "tout à coup" is the set phrase; the Glossary gloss for coup (blow) is the wrong sense here. |
| S18568 | Tout à coup, elle tombe. | Suddenly, she falls. | Keep |  | Correct, natural, A1; the English matches. |
| S18569 | Tout à coup, il fait froid. | Suddenly, it's cold. | Keep |  | Correct, natural, A1; the English matches. |
| S18570 | Paul va se marier en juin. | Paul is getting married in June. | Keep | Swap: #1043828 "Je veux me marier avec elle." | Correct, natural, A1; the English matches. |
| S18572 | Ma vie est simple. | My life is simple. | Keep | Swap: #8417826 "La vie est bonne." | Correct, natural, A1; the English matches. |
| S18573 | J'aime ma vie. | I love my life. | Keep |  | Correct, natural, A1; the English matches. |
| S18574 | Elle raconte sa vie. | She's telling the story of her life. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#10155](https://tatoeba.org/en/sentences/show/10155) | Il doit mourir. | He shall die. | Reject |  | A dark line. |
| [#13275431](https://tatoeba.org/en/sentences/show/13275431) | Il veut mourir. | He wants to die. | Reject |  | A dark line. |
| [#8793192](https://tatoeba.org/en/sentences/show/8793192) | La reine doit mourir. | The queen must die. | Reject |  | A dark line. |
| [#1043828](https://tatoeba.org/en/sentences/show/1043828) | Je veux me marier avec elle. | I want to marry her. | Use | I want to marry her. |  |
| [#13013396](https://tatoeba.org/en/sentences/show/13013396) | Elle se prépare à se marier. | She's getting ready to marry. | Use | She's getting ready to get married. |  |
| [#12848246](https://tatoeba.org/en/sentences/show/12848246) | Tu es ma vie. | You are my life. | Reject |  | A love line. |
| [#8417826](https://tatoeba.org/en/sentences/show/8417826) | La vie est bonne. | Life is good. | Use |  |  |
| [#7452332](https://tatoeba.org/en/sentences/show/7452332) | L'eau c'est la vie. | Water is life. | Reject |  | Missing comma before c'est. |
| [#132022](https://tatoeba.org/en/sentences/show/132022) | Il n'est pas mort heureux. | He didn't die happily. | Reject |  | A dark line, passé composé. |
| [#136576](https://tatoeba.org/en/sentences/show/136576) | On dit qu'il est mort ici. | He is said to have died here. | Reject |  | A dark line, passé composé. |
| [#136582](https://tatoeba.org/en/sentences/show/136582) | Il est comme mort. | He is as good as dead. | Reject |  | A dark line. |
| [#766374](https://tatoeba.org/en/sentences/show/766374) | Mon chat est mort hier. | My pet cat died yesterday. | Reject |  | A dark line, passé composé. |
| [#1132816](https://tatoeba.org/en/sentences/show/1132816) | J'ai une vie extraordinaire. | I have a great life. | Use | I have an extraordinary life. |  |
| [#1132817](https://tatoeba.org/en/sentences/show/1132817) | La vie n'est pas juste. | Life isn't fair. | Use |  |  |
| [#1184642](https://tatoeba.org/en/sentences/show/1184642) | Il est content de sa vie simple. | He is content with the simple life. | Use |  |  |
| [#1326674](https://tatoeba.org/en/sentences/show/1326674) | Je ne peux pas mourir ici. | I can't die here. | Reject |  | A dark line. |
| [#1337652](https://tatoeba.org/en/sentences/show/1337652) | La vie est difficile. | Life is hard. | Use |  |  |
| [#1645961](https://tatoeba.org/en/sentences/show/1645961) | Le chien est à la mort. | The dog is close to death. | Reject |  | A dark line. |
| [#2146849](https://tatoeba.org/en/sentences/show/2146849) | Je ne veux pas mourir ici. | I don't want to die here. | Reject |  | A dark line. |
| [#2158582](https://tatoeba.org/en/sentences/show/2158582) | Je veux vivre une vie heureuse. | I want to live a happy life. | Use |  |  |
| [#2296201](https://tatoeba.org/en/sentences/show/2296201) | Je veux revenir dans ta vie. | I want to be in your life again. | Reject |  | A love line. |
| [#2727039](https://tatoeba.org/en/sentences/show/2727039) | Il est mort ? | He's dead? | Reject |  | A dark line. |
| [#3035559](https://tatoeba.org/en/sentences/show/3035559) | Il est mort hier. | He died yesterday. | Reject |  | A dark line, passé composé. |
| [#3597789](https://tatoeba.org/en/sentences/show/3597789) | C'est une belle vie. | It's a beautiful life. | Use |  |  |
| [#3680953](https://tatoeba.org/en/sentences/show/3680953) | On ne veut pas mourir. | People don't want to die. | Reject |  | A dark line. |
| [#7273959](https://tatoeba.org/en/sentences/show/7273959) | Il ne veut pas mourir. | He doesn't want to die. | Reject |  | A dark line. |
| [#7327802](https://tatoeba.org/en/sentences/show/7327802) | Prends la vie comme elle vient. | Take life as it comes. | Reject |  | Imperative and a proverb. |
| [#8205647](https://tatoeba.org/en/sentences/show/8205647) | Un livre peut changer votre vie. | A book can change your life. | Use |  |  |
| [#8423889](https://tatoeba.org/en/sentences/show/8423889) | J'ai une bonne vie maintenant. | I have a good life now. | Use |  |  |
| [#9410481](https://tatoeba.org/en/sentences/show/9410481) | Je commence une nouvelle vie. | I'm starting a new life. | Use |  |  |
| [#9727871](https://tatoeba.org/en/sentences/show/9727871) | La vie est très chère ici. | Life here is very expensive. | Use |  |  |
| [#9844320](https://tatoeba.org/en/sentences/show/9844320) | L'Italien aime la vie. | Italians enjoy life. | Reject |  | A national generalisation. |
| [#10016012](https://tatoeba.org/en/sentences/show/10016012) | Ton mari est mort. | Your husband is dead. | Reject |  | A dark line. |

## U609 · Telling a Story

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S18661 | Il cache son argent. | He hides his money. | Keep | Swap: #3794900 "Je ne cache rien." | Correct, natural, A1; the English matches. |
| S18662 | J'imagine une grande maison. | I imagine a big house. | Keep |  | Correct, natural, A1; the English matches. |
| S18663 | Elle imagine une histoire. | She makes up a story. | Keep |  | Correct; imaginer as make up, the English fits. |
| S18664 | Tu peux imaginer ? | Can you imagine? | Keep |  | Correct, natural, A1; the English matches. |
| S18665 | C'est difficile à imaginer. | It's hard to imagine. | Keep |  | Correct, natural, A1; the English matches. |
| S18666 | Le chat aime se cacher. | The cat likes to hide. | Keep | Swap: #638644 "Je n'ai rien à cacher." | Correct, natural, A1; the English matches. |
| S18667 | Il ne faut pas crier. | You mustn't shout. | Keep | Swap: #1184291 "Tu ne dois pas crier sur lui." | Correct, natural, A1; the English matches. |
| S18668 | J'aime imaginer une histoire. | I like making up a story. | Keep |  | Correct, natural, A1; the English matches. |
| S18669 | Paul imagine un voyage. | Paul imagines a trip. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#3794900](https://tatoeba.org/en/sentences/show/3794900) | Je ne cache rien. | I'm not hiding anything. | Use |  |  |
| [#1132814](https://tatoeba.org/en/sentences/show/1132814) | Je ne me cache pas. | I'm not hiding. | Use |  |  |
| [#463920](https://tatoeba.org/en/sentences/show/463920) | Je ne te cache rien. | I'm not hiding anything from you. | Use |  |  |
| [#638644](https://tatoeba.org/en/sentences/show/638644) | Je n'ai rien à cacher. | I have nothing to hide. | Use |  |  |
| [#3892467](https://tatoeba.org/en/sentences/show/3892467) | Il me faut cacher ce sac. | I have to hide this bag. | Use | I have to hide this bag. |  |
| [#10135381](https://tatoeba.org/en/sentences/show/10135381) | Tu n'as plus où te cacher. | You've got nowhere left to hide. | Reject |  | A threat. |
| [#1184291](https://tatoeba.org/en/sentences/show/1184291) | Tu ne dois pas crier sur lui. | You must not shout at him. | Use |  |  |
| [#11258](https://tatoeba.org/en/sentences/show/11258) | Merci de garder ça secret. | Please keep this a secret. | Use | Please keep this secret. |  |
| [#180780](https://tatoeba.org/en/sentences/show/180780) | Elle m'a dit son secret. | She told me her secret. | Reject |  | Passé composé. |
| [#181598](https://tatoeba.org/en/sentences/show/181598) | Je me demande où il se cache. | I wonder where he is hiding. | Reject |  | "Se demander" is past A1. |
| [#549009](https://tatoeba.org/en/sentences/show/549009) | Garde cela secret s'il te plaît. | Please keep this secret. | Reject |  | Imperative. |
| [#706741](https://tatoeba.org/en/sentences/show/706741) | C'est un secret. | It's a secret. | Use |  |  |
| [#1329067](https://tatoeba.org/en/sentences/show/1329067) | Je vais te dire un petit secret. | I tell you a little secret. | Use |  |  |
| [#3249721](https://tatoeba.org/en/sentences/show/3249721) | Ne crie pas, ou tu es mort. | Don't scream, or you're dead. | Reject |  | A threat. |
| [#3444085](https://tatoeba.org/en/sentences/show/3444085) | Je connais ton secret. | I know your secret. | Use |  |  |
| [#11348557](https://tatoeba.org/en/sentences/show/11348557) | L'aventure commence maintenant ! | The adventure starts now! | Use |  |  |
| [#11373249](https://tatoeba.org/en/sentences/show/11373249) | Chaque voyage est une aventure. | Every trip is an adventure. | Use |  |  |
| [#11379089](https://tatoeba.org/en/sentences/show/11379089) | C'est notre secret. | This is our secret. | Use |  |  |
| [#11906245](https://tatoeba.org/en/sentences/show/11906245) | Il ne s'en cache plus. | He no longer hides it. | Reject |  | "En" is past A1. |
| [#11942812](https://tatoeba.org/en/sentences/show/11942812) | Quel est ton secret ? | What is your secret? | Use |  |  |
| [#11942817](https://tatoeba.org/en/sentences/show/11942817) | Quel est votre secret ? | What's your secret? | Use |  |  |
| [#12081558](https://tatoeba.org/en/sentences/show/12081558) | Ne crie pas ! | Don't shout! | Reject |  | Imperative. |
| [#12681520](https://tatoeba.org/en/sentences/show/12681520) | Chaque jour est une nouvelle aventure. | Every day is a new adventure. | Use |  |  |

## U615 · Everyday Words

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S18761 | Le café est situé près de la gare. | The café is near the station. | Keep | Swap: #683180 "Ce magasin est bien situé." | Correct, natural, A1; the English matches. |
| S18762 | Où est situé l'hôtel ? | Where is the hotel located? | Keep |  | Correct, natural, A1; the English matches. |
| S18763 | Nous sommes au bord de la mer. | We're by the sea. | Keep |  | Correct, natural, A1; the English matches. |
| S18764 | Il y a un café au bord de la mer. | There's a café by the sea. | Keep |  | Correct, natural, A1; the English matches. |
| S18765 | Je m'habille vite le matin. | I get dressed quickly in the morning. | Keep |  | Correct, natural, A1; the English matches. |
| S18766 | Je vais ranger mes affaires. | I'm going to put my things away. | Keep |  | Correct, natural, A1; the English matches. |
| S18767 | Paul respecte ses parents. | Paul respects his parents. | Keep |  | Correct, natural, A1; the English matches. |
| S18768 | Le chat est au bord de la table. | The cat is on the edge of the table. | Keep |  | Correct; au bord de la table is the edge, while au bord de la mer is by the sea; both senses are in this circle, worth a hint. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#683180](https://tatoeba.org/en/sentences/show/683180) | Ce magasin est bien situé. | This store enjoys a geographical advantage. | Use | This shop is well located. |  |
| [#1675990](https://tatoeba.org/en/sentences/show/1675990) | Je m'habille. | I am getting dressed. | Use |  |  |
| [#14102450](https://tatoeba.org/en/sentences/show/14102450) | Attends, je m'habille. | Wait, I'm getting dressed. | Reject |  | Imperative ("Attends"). |
| [#3471](https://tatoeba.org/en/sentences/show/3471) | Ce ne sont pas mes affaires ! | These things aren't mine! | Reject |  | "Mes affaires" also means my business; the exclamation reads that way; a sense trap. |
| [#429594](https://tatoeba.org/en/sentences/show/429594) | Les affaires sont les affaires. | Business is business. | Reject |  | A proverb. |

## Read and Answer texts

| ID | Text | Verdict | Fix | Reason |
| --- | --- | --- | --- | --- |
| R601 | Une carte de Marie | Keep |  | Natural postcard; both answers unique. |
| R602 | Une carte de Paul | Keep |  | Natural; both answers unique. |
| R603 | Une carte de Sophie | Keep |  | Natural; both answers unique. |
| R604 | Théâtre du Parc (notice) | Keep |  | Natural poster; both answers unique. |
| R605 | Exposition (notice) | Keep |  | Natural; both answers unique. |
| R606 | Un message de Léa | Keep |  | Natural; both answers unique. |
| R607 | Piscine (sign) | Keep |  | Natural pool sign; both answers unique. |
| R608 | Objets trouvés (notice) | Keep |  | Natural; both answers unique. |
| R609 | Le parc (sign) | Keep |  | Natural; both answers unique. |
| R610 | Dans le bus (notice) | Fix | "Tenez votre billet" is not a bus notice; buses say "Gardez votre billet" (keep your ticket). Write that and make the first question "What should you do with your ticket?" with "Keep it / Throw it away / Buy one". Gardez is not in the word list, so if every text word must be known, keep "Tenez" and change the English choice to "Have it ready". | See fix. |
| R611 | Le gâteau (notice) | Keep |  | Natural recipe lines; both answers unique. |
| R612 | Pour installer l'ordinateur (notice) | Keep |  | Natural numbered steps; both answers unique. |
| R613 | La réponse de Paul | Keep |  | Natural; both answers unique. |
| R614 | Un mail de Sophie | Keep |  | Natural; both answers unique. |
| R615 | Pour Léa (message) | Keep |  | Natural; both answers unique. |

## Mock DELF A1: the Part 6 task items and the format

The final check (finalcheck.js FORMATS.fr) runs the four DELF papers in order: listening (four a1_listen items, three picture lines, two typed lines), reading (four texts of different kinds, two lines), writing (a form, a free message not scored, two typed lines), speaking (not graded). The task items come from every part's a1_* tables, one of each text kind first; these are the Part 6 rows.

| ID | Kind | Item | Verdict | Reason |
| --- | --- | --- | --- | --- |
| N601 | number | Le séjour dure dix jours. → 10 | Keep | Natural; one answer. "dure" is not a taught word, fine for listening. |
| N602 | price | La chambre coûte quatre-vingts euros la nuit. → 80 | Keep | Natural; one answer. |
| N603 | time | Le spectacle commence à vingt heures trente. → 20:30 | Keep | Natural; one answer. |
| N604 | price | Le billet coûte douze euros. → 12 | Keep | Natural; one answer. |
| N605 | time | Le magasin est ouvert jusqu'à dix-neuf heures. → 19:00 | Keep | Natural; one answer. |
| N606 | date | L'exposition, c'est jusqu'au trente juin. → 30/6 | Keep | Natural; "jusqu'au" is heard, not typed; one answer. |
| N607 | number | Prenez la sortie numéro quatre. → 4 | Keep | Natural; one answer. |
| N608 | number | Ajoutez deux cents grammes de sucre. → 200 | Keep | Natural recipe line; one answer. |
| F601 | form | Deux billets pour le concert de samedi, Léa Martin, 06 12 34 56 78 | Keep | Natural; one answer per field. |
| F602 | form | Tom Durand, 16, tennis le mercredi | Keep | Natural; one answer per field. |
| P601 | prompt | Postcard: where, weather, what you do, 30 to 45 words | Keep | Clear; DELF exercise 2 length (40 words minimum in the real exam; 30 is a fair floor here). |
| P602 | prompt | Reply to an invitation: thank, can you come, what you bring | Keep | Clear. |
| P603 | prompt | Plan the weekend: where, when, who | Keep | Clear. |

Format notes: the reading paper asks for four kinds of text (notice or sign, message, timetable, menu); Parts 5 and 6 add notices, messages, signs and one timetable, and the menus come from Part 4, so the pool has all four kinds. The listening and reading pools mix all parts, as DELF does. Nothing in the format needs a change.
