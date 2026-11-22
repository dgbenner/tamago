# Tamago French check, A1 Part 5, 2026-11-15

Quality pass on French A1 Part 5, change no code. Three sets: the Tatoeba candidates kept out only by the trust rule (428 distinct sentences shown in `_review/french-part5-candidates.md`; the "and N more" tails are not in that file and were not reviewed), each marked **Use** or **Reject**; the 155 drafts in `_review/french-part5-drafts.md`, each marked **Keep**, **Fix** (with the corrected French and English) or **Cut**, with a swap named where a Use candidate teaches the same word; and the 15 Read and Answer texts, checked for natural French, clear questions and one fitting answer each. Meanings and verb forms were checked against the course's Wiktionary data in content/checks (words.json, conjugations.json), not memory. The candidates file carries the same marks in place. This is a reviewer's read, not a native speaker's.

## Counts

- Candidates: **Use 269** · **Reject 159** (111 of the Use marks name the English to show).
- Drafts: **Keep 153** · **Fix 2** · **Cut 0**; 13 drafts have a swap named.
- Read and Answer texts: **Keep 14** · **Fix 1**.
- Draft fixes: S16569 ("Allô, ici Paul", not "Ici c'est Paul"), S16873 (English only: "Where is the meeting?"). Text fix: R503 (a key "sous la porte" cannot be picked up; "chez la voisine").
- Reject reasons, most common first: imperatives outside the help circles; passé composé; idioms (bon goût, ça te regarde, au jour le jour, ne … que, tu n'as qu'à); sense traps (copain and copine as boyfriend and girlfriend, vis as saw, neuf as new, devoir the noun, mal the adverb, temps the weather, exercice as physical exercise, suis as follow, dois as owe); love and harsh lines; odd lines; exclamatives and fragments; "se rappeler de"; capitalised nationality adjectives.
- Filling In Forms (U508) read line by line: all 14 drafts are correct form French; one English tightened (S16873). Mademoiselle (S16869) is spoken courtesy, not a form field since 2012.
- The two word-for-word matches (S15476, S16164) are swaps; eleven more swaps are named where a Use candidate carries the same word as well or better. Answer the Question pairs were left as drafts so the pairs stay intact.
- Glossary senses to re-pick in word-senses.json (the course's Wiktionary pick is not the sense this part uses): garder "keep, retain, store" (the circle also means look after), envie "appetite, craving" (avoir envie de, to feel like), mal "pain" is right but the circle's "Tu as mal ?" wants "avoir mal" noted, mariage "marriage" (the lines mean the wedding), rappeler "call again" (also remind), coucher "to go to bed" (the form taught is se coucher, right), exercice "exercise, performance" (the schoolwork sense), collège "junior high school" (US; the course says secondary school), temps "time" (right; the weather sense is the trap). All checked in content/checks/words.json.
- Conjugation tables (content/checks/conjugations.json): **rappeler** is listed as "rappèle, rappèles, rappèlent", the 1990 reform spelling, while the course teaches the form "rappelle" (W2007); the table should show "rappelle" (Wiktionary gives both, the double-l first). **asseoir** has broken cells: "assoyons or asseyons or" and "assoyez or asseyez or" end in a dangling "or"; show one form per cell ("asseyons", "asseyez", matching asseyez-vous). falloir correctly shows only "il faut". situer has no table (only the participle situé is taught), fine.
- The Tatoeba sentences already in the course were not checked here; they carry a source_id and were checked at import.


## U501 · People You Know

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S15461 | Vous avez un plan de la ville ? | Do you have a map of the town? | Keep |  | Correct, natural, A1; the English matches. |
| S15462 | Je te raconte une histoire. | I'll tell you a story. | Keep |  | Correct, natural, A1; the English matches. |
| S15463 | Vous avez compris ? | Did you understand? | Keep |  | Correct, natural, A1; the English matches. |
| S15464 | Je te présente Marie. | This is Marie. | Keep |  | Correct, natural, A1; the English matches. |
| S15466 | Il n'est pas là. | He isn't here. | Keep |  | Correct, natural, A1; the English matches. |
| S15467 | Tu connais Paul ? | Do you know Paul? | Keep |  | Correct, natural, A1; the English matches. |
| S15468 | Oui, c'est mon ami. | Yes, he's my friend. | Keep |  | Correct, natural, A1; the English matches. |
| S15469 | Vous avez des enfants ? | Do you have children? | Keep |  | Correct, natural, A1; the English matches. |
| S15470 | Oui, j'ai deux enfants. | Yes, I have two children. | Keep |  | Correct, natural, A1; the English matches. |
| S15471 | Tu peux me rappeler ? | Can you call me back? | Keep |  | Correct, natural, A1; the English matches. |
| S15472 | Je voudrais connaître la ville. | I'd like to get to know the town. | Keep |  | Correct, natural, A1; the English matches. |
| S15473 | Je suis content de te connaître. | I'm glad to know you. | Keep |  | Correct; "Ravi de te connaître" is the commoner greeting, this one is fine. |
| S15474 | Je vous rappelle demain. | I'll call you back tomorrow. | Keep |  | Correct, natural, A1; the English matches. |
| S15476 | Ce n'est pas mon sac. | That's not my bag. | Keep | Swap: #139318, the same sentence; show "That's not my bag." | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#8597726](https://tatoeba.org/en/sentences/show/8597726) | Vous avez bon goût. | You have good taste. | Reject |  | "Avoir bon goût" is an idiom. |
| [#2784905](https://tatoeba.org/en/sentences/show/2784905) | Vous n'avez rien dit. | You said nothing. | Reject |  | Passé composé ("dit"), which the course does not teach. |
| [#13010973](https://tatoeba.org/en/sentences/show/13010973) | Vous avez cinq sous ? | Do you have 5 cents? | Reject |  | "Sous" is slang for money. |
| [#9598364](https://tatoeba.org/en/sentences/show/9598364) | Il te veut. | He wants you. | Reject |  | A love line. |
| [#7410](https://tatoeba.org/en/sentences/show/7410) | Je te connais. | I know you. | Use |  |  |
| [#3371020](https://tatoeba.org/en/sentences/show/3371020) | Ça te regarde. | It concerns you. | Reject |  | Idiom (regarder as concern). |
| [#395586](https://tatoeba.org/en/sentences/show/395586) | N'entre pas. | Keep out. | Reject |  | Imperative; the circle is not a help circle. |
| [#825119](https://tatoeba.org/en/sentences/show/825119) | Ce n'est rien. | No prob. | Use | It's nothing. |  |
| [#1624940](https://tatoeba.org/en/sentences/show/1624940) | N'oublie rien. | Don't forget anything. | Reject |  | Imperative. |
| [#1174430](https://tatoeba.org/en/sentences/show/1174430) | Tu me connais ? | Do you know me? | Use |  |  |
| [#3618217](https://tatoeba.org/en/sentences/show/3618217) | Je vous connais. | I know you. | Use |  |  |
| [#1177951](https://tatoeba.org/en/sentences/show/1177951) | Je voudrais connaître son nom. | I would like to know her name. | Use | I'd like to know her name. |  |
| [#12093238](https://tatoeba.org/en/sentences/show/12093238) | Elle ne veut pas nous connaître. | She does not want to know us. | Reject |  | An unfriendly, odd line. |
| [#3674515](https://tatoeba.org/en/sentences/show/3674515) | Qu'est-ce que tu voudrais connaître ? | What is it you'd like to know? | Reject |  | Connaître with a thing to find out; French says savoir here. |
| [#181397](https://tatoeba.org/en/sentences/show/181397) | Je vous rappelle plus tard. | I'll call you back later. | Use |  |  |
| [#1226638](https://tatoeba.org/en/sentences/show/1226638) | Que vous rappelle ce chapeau ? | What does this hat remind you of? | Reject |  | Rappeler as remind, with inversion; a sense trap for a circle teaching call back. |
| [#7269500](https://tatoeba.org/en/sentences/show/7269500) | Je me rappelle très bien de toi. | I remember you very well. | Reject |  | "Se rappeler de" is a disputed form; the standard is "se souvenir de". |
| [#139318](https://tatoeba.org/en/sentences/show/139318) | Ce n'est pas mon sac. | This isn't my bag. | Use | That's not my bag. |  |
| [#433123](https://tatoeba.org/en/sentences/show/433123) | Ce n'est pas vrai. | This is not true. | Use |  |  |
| [#3201](https://tatoeba.org/en/sentences/show/3201) | Ce n'est pas important. | This is not important. | Use |  |  |
| [#3881](https://tatoeba.org/en/sentences/show/3881) | Je n'aime pas l'école. | I don't like school. | Use |  |  |
| [#6132](https://tatoeba.org/en/sentences/show/6132) | Je n'en crois pas mes yeux. | I can't believe my eyes. | Reject |  | Idiom. |
| [#7065](https://tatoeba.org/en/sentences/show/7065) | Je n'ai pas beaucoup d'argent. | I don't have much money. | Use |  |  |
| [#7086](https://tatoeba.org/en/sentences/show/7086) | Je n'y suis pour rien. | I have nothing to do with it. | Reject |  | Idiom. |
| [#7121](https://tatoeba.org/en/sentences/show/7121) | Je connais ce garçon. | I know the boy. | Use | I know this boy. |  |
| [#7406](https://tatoeba.org/en/sentences/show/7406) | Je n'aime pas beaucoup le fromage. | I don't like cheese very much. | Use |  |  |
| [#7919](https://tatoeba.org/en/sentences/show/7919) | Je n'entends rien. | I can hear nothing. | Use | I can't hear anything. |  |
| [#8008](https://tatoeba.org/en/sentences/show/8008) | Notre école est dans ce village. | Our school is in that village. | Use |  |  |
| [#8551](https://tatoeba.org/en/sentences/show/8551) | Je viens juste de lire ce livre. | I have just read this book. | Reject |  | "Venir de" plus infinitive is past A1, and the English is a perfect. |
| [#10501](https://tatoeba.org/en/sentences/show/10501) | Ce château est beau. | That castle is beautiful. | Use |  |  |
| [#11396](https://tatoeba.org/en/sentences/show/11396) | Combien pour ce chapeau rouge ? | How much for this red hat? | Use | How much is this red hat? |  |
| [#11458](https://tatoeba.org/en/sentences/show/11458) | Que ce livre est petit ! | How small this book is! | Reject |  | Exclamative. |
| [#12455](https://tatoeba.org/en/sentences/show/12455) | Ce n'est pas si loin. | It's not so far. | Use |  |  |
| [#119963](https://tatoeba.org/en/sentences/show/119963) | Je n'ai pas d'enfant. | I don't have any children. | Use | I don't have children. |  |
| [#127735](https://tatoeba.org/en/sentences/show/127735) | Je connais son nom. | I know what his name is. | Use | I know his name. |  |
| [#127737](https://tatoeba.org/en/sentences/show/127737) | Je ne connais pas son nom. | I don't know his name. | Use |  |  |
| [#131461](https://tatoeba.org/en/sentences/show/131461) | Il n'est plus un enfant. | He is no longer a child. | Use |  |  |
| [#135888](https://tatoeba.org/en/sentences/show/135888) | Elle n'est rien pour lui. | She is nothing to him. | Reject |  | A harsh line. |
| [#136583](https://tatoeba.org/en/sentences/show/136583) | Il n'est pas là, non ? | He isn't here, is he? | Reject |  | Tag question with "non", odd in writing. |
| [#138604](https://tatoeba.org/en/sentences/show/138604) | Il n'est pas américain. | He is not an American. | Use |  |  |
| [#138670](https://tatoeba.org/en/sentences/show/138670) | Prenez ce que vous voulez. | You can take whatever you like. | Reject |  | Imperative. |
| [#138671](https://tatoeba.org/en/sentences/show/138671) | Prends ce que tu aimes. | Take whichever you like. | Reject |  | Imperative. |
| [#139193](https://tatoeba.org/en/sentences/show/139193) | Je suis libre ce soir. | I'm free this evening. | Use |  |  |
| [#139317](https://tatoeba.org/en/sentences/show/139317) | À qui est ce sac ? | Whose bag is this? | Use |  |  |

## U511 · Family Words

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S15561 | Ma grand-mère a quatre-vingts ans. | My grandmother is eighty. | Keep |  | Correct, natural, A1; the English matches. |
| S15562 | Ma tante habite près d'ici. | My aunt lives near here. | Keep |  | Correct, natural, A1; the English matches. |
| S15563 | Tu as un cousin ? | Do you have a cousin? | Keep |  | Correct, natural, A1; the English matches. |
| S15564 | Oui, il a dix ans. | Yes, he's ten. | Keep |  | Correct, natural, A1; the English matches. |
| S15565 | Comment va ta grand-mère ? | How is your grandmother? | Keep |  | Correct, natural, A1; the English matches. |
| S15566 | Elle va bien, merci. | She's well, thank you. | Keep |  | Correct, natural, A1; the English matches. |
| S15567 | Mon oncle et ma tante sont là. | My uncle and aunt are here. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#11998742](https://tatoeba.org/en/sentences/show/11998742) | Ma grand-mère a un chat. | My grandmother has a cat. | Use |  |  |
| [#452322](https://tatoeba.org/en/sentences/show/452322) | Ma grand-mère parle lentement. | My grandmother speaks slowly. | Use |  |  |
| [#9700426](https://tatoeba.org/en/sentences/show/9700426) | J'aime vraiment ma grand-mère. | I really love my grandmother. | Use | I really love my grandmother. |  |
| [#11130177](https://tatoeba.org/en/sentences/show/11130177) | Ce n'est pas ma tante. | She is not my aunt. | Use |  |  |
| [#7693](https://tatoeba.org/en/sentences/show/7693) | Ma grand-mère habite à la campagne. | My grandmother lives in the country. | Use |  |  |
| [#134851](https://tatoeba.org/en/sentences/show/134851) | Papa ne mange pas beaucoup de fruits. | Dad doesn't eat a lot of fruit. | Use | Dad doesn't eat much fruit. |  |
| [#134918](https://tatoeba.org/en/sentences/show/134918) | Papa est grand. | Dad is tall. | Use | Dad is tall. |  |
| [#135343](https://tatoeba.org/en/sentences/show/135343) | Mon oncle vient nous voir demain. | My uncle is coming to see us tomorrow. | Use |  |  |
| [#333634](https://tatoeba.org/en/sentences/show/333634) | Maman est plus vieille que Papa. | Mom is older than Dad. | Use | Mum is older than Dad. |  |
| [#384227](https://tatoeba.org/en/sentences/show/384227) | J'ai un copain qui m'aime. | I have a friend who loves me. | Reject |  | A love line with a relative clause. |
| [#453969](https://tatoeba.org/en/sentences/show/453969) | Mon grand-père adore lire. | My grandfather loves to read. | Use |  |  |
| [#549738](https://tatoeba.org/en/sentences/show/549738) | Où habite ton oncle ? | Where does your uncle live? | Use |  |  |
| [#888775](https://tatoeba.org/en/sentences/show/888775) | Mon papa a dit non. | My papa said no. | Reject |  | Passé composé. |
| [#2809357](https://tatoeba.org/en/sentences/show/2809357) | Le garçon parle à son grand-père. | The boy is speaking to his grandfather. | Use |  |  |
| [#2859787](https://tatoeba.org/en/sentences/show/2859787) | Marie a un nouveau copain. | Mary has a new boyfriend. | Reject |  | "Nouveau copain" reads as boyfriend, not the friend the circle teaches; a sense trap. |
| [#8885044](https://tatoeba.org/en/sentences/show/8885044) | Comment va ton grand-père ? | How is your grandfather doing? | Use |  |  |
| [#8885380](https://tatoeba.org/en/sentences/show/8885380) | Ma copine n'aime pas les fleurs. | My girlfriend doesn't like flowers. | Reject |  | "Ma copine" reads as girlfriend; the Tatoeba English says so; a sense trap. |
| [#8993080](https://tatoeba.org/en/sentences/show/8993080) | Ma grand-mère est très vieille. | My grandmother is very old. | Use |  |  |
| [#9033351](https://tatoeba.org/en/sentences/show/9033351) | Bonjour maman, ça va ? | Hello mom, how are you? | Use | Hello Mum, how are you? |  |
| [#11161521](https://tatoeba.org/en/sentences/show/11161521) | C'est son copain. | It's her boyfriend. | Reject |  | Copain as boyfriend, as the English says; a sense trap. |
| [#11207064](https://tatoeba.org/en/sentences/show/11207064) | Papa veut nous voir. | Dad wants to see us. | Use |  |  |
| [#12125738](https://tatoeba.org/en/sentences/show/12125738) | Notre grand-père a quatre-vingt-dix ans. | Our grandfather is ninety years old. | Use |  |  |
| [#12206858](https://tatoeba.org/en/sentences/show/12206858) | Maman, j'arrive ! | Mom, I'm coming! | Use | Mum, I'm coming! |  |
| [#12288162](https://tatoeba.org/en/sentences/show/12288162) | Oui, maman. | Yes, Mom. | Use | Yes, Mum. |  |
| [#12288164](https://tatoeba.org/en/sentences/show/12288164) | Oui, papa. | Yes, Dad. | Use |  |  |
| [#13212590](https://tatoeba.org/en/sentences/show/13212590) | Papa est chez lui. | Dad is at home. | Use | Dad is at home. |  |
| [#13554803](https://tatoeba.org/en/sentences/show/13554803) | J'achète des fleurs à ma maman. | I'm buying my mum flowers. | Use | I'm buying my mum flowers. |  |
| [#13590819](https://tatoeba.org/en/sentences/show/13590819) | Qui est ton grand-père ? | Who is your grandfather? | Use |  |  |
| [#14014329](https://tatoeba.org/en/sentences/show/14014329) | Ma maman est de gauche. | My mom is a left-winger. | Reject |  | A political label, past A1. |

## U521 · Being Polite

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S15661 | Ce n'est pas la peine. | There's no need. | Keep |  | Correct, natural, A1; the English matches. |
| S15662 | Merci, ce n'est pas la peine. | Thanks, there's no need. | Keep |  | Correct, natural, A1; the English matches. |
| S15663 | Ce n'est pas la peine de venir. | There's no need to come. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#398376](https://tatoeba.org/en/sentences/show/398376) | Je suis désolé de te déranger. | I am sorry to trouble you. | Use | I'm sorry to bother you. |  |
| [#645871](https://tatoeba.org/en/sentences/show/645871) | Désolé de te déranger. | Sorry to trouble you. | Use | Sorry to bother you. |  |
| [#728040](https://tatoeba.org/en/sentences/show/728040) | Ne pas déranger. | Do not disturb. | Use | Do not disturb. |  |
| [#1005415](https://tatoeba.org/en/sentences/show/1005415) | Je peux te déranger un moment ? | May I bother you for a moment? | Use | Can I bother you for a moment? |  |
| [#1122869](https://tatoeba.org/en/sentences/show/1122869) | Ça ne dérange pas. | It's no trouble. | Use | It's no bother. |  |

## U502 · My Family

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S15761 | J'ai un frère et une sœur. | I have a brother and a sister. | Keep |  | Correct, natural, A1; the English matches. |
| S15762 | Tu as un frère ? | Do you have a brother? | Keep |  | Correct, natural, A1; the English matches. |
| S15763 | Oui, il s'appelle Paul. | Yes, his name is Paul. | Keep |  | Correct, natural, A1; the English matches. |
| S15764 | Ma famille n'est pas grande. | My family isn't big. | Keep |  | Correct, natural, A1; the English matches. |
| S15766 | Elle s'appelle Marie. | Her name is Marie. | Keep |  | Correct, natural, A1; the English matches. |
| S15767 | Mon père est âgé. | My father is old. | Keep |  | Correct, natural, A1; the English matches. |
| S15768 | Le mari de ma sœur s'appelle Paul. | My sister's husband is called Paul. | Keep | Swap: #13260807 "C'est mon mari." teaches mari the same way, shorter. | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#13538434](https://tatoeba.org/en/sentences/show/13538434) | Il est plus âgé que vous. | He's older than you. | Use | He's older than you. |  |
| [#8794078](https://tatoeba.org/en/sentences/show/8794078) | Je suis plus âgé que vous. | I am older than you. | Use | I'm older than you. |  |
| [#8799979](https://tatoeba.org/en/sentences/show/8799979) | Papa est plus âgé que maman. | Dad is older than mom. | Use | Dad is older than Mum. |  |
| [#13260807](https://tatoeba.org/en/sentences/show/13260807) | C'est mon mari. | He is my husband. | Use | He's my husband. |  |
| [#9070787](https://tatoeba.org/en/sentences/show/9070787) | J'aime mon mari. | I love my husband. | Use |  |  |
| [#13260809](https://tatoeba.org/en/sentences/show/13260809) | Il est mon mari. | He is my husband. | Reject |  | French says "C'est mon mari", not "Il est mon mari". |
| [#131866](https://tatoeba.org/en/sentences/show/131866) | Il s'est marié pour l'argent. | He married for money. | Reject |  | Passé composé, and a sour line. |
| [#416952](https://tatoeba.org/en/sentences/show/416952) | Je me demande s'il est marié. | I wonder if he is married. | Reject |  | "Se demander" and "s'il" are past A1. |
| [#429278](https://tatoeba.org/en/sentences/show/429278) | Je suis marié. | I'm married. | Use |  |  |
| [#1005431](https://tatoeba.org/en/sentences/show/1005431) | Je suis mariée. | I'm married. | Use |  |  |
| [#1138283](https://tatoeba.org/en/sentences/show/1138283) | Oui, je suis marié. | Yes, I am married. | Use |  |  |
| [#1138288](https://tatoeba.org/en/sentences/show/1138288) | Oui, je suis mariée. | Yes, I am married. | Use |  |  |
| [#2201373](https://tatoeba.org/en/sentences/show/2201373) | Je suis une femme mariée. | I'm a married woman. | Use |  |  |
| [#3369619](https://tatoeba.org/en/sentences/show/3369619) | Je me suis mariée. | I got married. | Reject |  | Passé composé. |
| [#6600848](https://tatoeba.org/en/sentences/show/6600848) | Son chien est plus âgé que moi. | His dog is older than me. | Reject |  | An odd line. |
| [#6807178](https://tatoeba.org/en/sentences/show/6807178) | Je crois en mon mari. | I believe in my husband. | Reject |  | "Croire en" is past A1 and the line is odd. |
| [#11155721](https://tatoeba.org/en/sentences/show/11155721) | C'est quand ton mariage ? | When is your wedding? | Use | When's your wedding? |  |
| [#11750349](https://tatoeba.org/en/sentences/show/11750349) | Alors, c'est quand le mariage ? | So, when's the wedding? | Use | So, when's the wedding? |  |
| [#12008241](https://tatoeba.org/en/sentences/show/12008241) | Elle est mariée. | She is married. | Use |  |  |
| [#13094754](https://tatoeba.org/en/sentences/show/13094754) | J'achète une robe pour le mariage. | I'm buying a dress for the wedding. | Use |  |  |
| [#13288263](https://tatoeba.org/en/sentences/show/13288263) | Je suis marié avec elle. | I'm married to her. | Use | I'm married to her. |  |
| [#13544831](https://tatoeba.org/en/sentences/show/13544831) | J'aime mon mari et mes enfants. | I love my husband and my children. | Use |  |  |

## U503 · At Home

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S15861 | La salle de bain est petite. | The bathroom is small. | Keep |  | Correct; "salle de bains" with the s is the other accepted spelling, worth accepting as typed. |
| S15862 | Où est la salle de bain ? | Where's the bathroom? | Keep |  | Correct, natural, A1; the English matches. |
| S15863 | C'est à côté de la cuisine. | It's next to the kitchen. | Keep |  | Correct, natural, A1; the English matches. |
| S15864 | C'est une grande pièce. | It's a big room. | Keep |  | Correct, natural, A1; the English matches. |
| S15865 | Le salon est grand. | The living room is big. | Keep | Swap: #12202809 "Il est au salon." teaches salon the same way. | Correct, natural, A1; the English matches. |
| S15866 | Il y a une table dans le salon. | There's a table in the living room. | Keep |  | Correct, natural, A1; the English matches. |
| S15867 | Le mur de la chambre est blanc. | The bedroom wall is white. | Keep |  | Correct, natural, A1; the English matches. |
| S15868 | Tu vis dans une maison ? | Do you live in a house? | Keep |  | Correct, natural, A1; the English matches. |
| S15869 | Non, je vis dans un appartement. | No, I live in a flat. | Keep |  | Correct, natural, A1; the English matches. |
| S15871 | Ma chambre a une fenêtre. | My bedroom has a window. | Keep |  | Correct, natural, A1; the English matches. |
| S15872 | Je suis dans la salle de bain. | I'm in the bathroom. | Keep |  | Correct, natural, A1; the English matches. |
| S15873 | La cuisine est une petite pièce. | The kitchen is a small room. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#913519](https://tatoeba.org/en/sentences/show/913519) | Je peux sortir de la pièce ? | Can I go out of the room? | Use | Can I leave the room? |  |
| [#12202809](https://tatoeba.org/en/sentences/show/12202809) | Il est au salon. | He's in the living room. | Use |  |  |
| [#12202810](https://tatoeba.org/en/sentences/show/12202810) | Elle est au salon. | She's in the living room. | Use |  |  |
| [#12202812](https://tatoeba.org/en/sentences/show/12202812) | Elles sont au salon. | They're in the living room. | Use |  |  |
| [#8880968](https://tatoeba.org/en/sentences/show/8880968) | Je vis seule. | I'm living alone. | Use | I live alone. |  |
| [#515638](https://tatoeba.org/en/sentences/show/515638) | Vis et apprends. | Live and learn. | Reject |  | Imperative and a proverb. |
| [#2753150](https://tatoeba.org/en/sentences/show/2753150) | Je vis un chien. | I saw a dog. | Reject |  | "Vis" here is the past of voir (I saw); a sense trap. |
| [#7409](https://tatoeba.org/en/sentences/show/7409) | Je vis dans un appartement. | I live in an apartment. | Use | I live in a flat. |  |
| [#7861](https://tatoeba.org/en/sentences/show/7861) | Mon oncle vit dans un appartement. | My uncle lives in an apartment. | Use | My uncle lives in a flat. |  |
| [#391599](https://tatoeba.org/en/sentences/show/391599) | Je vis dans une petite ville. | I live in a small town. | Use |  |  |
| [#408593](https://tatoeba.org/en/sentences/show/408593) | Est-ce que la chambre a un bain ? | Does the room have a bath? | Reject |  | French asks for a baignoire or a salle de bain, not "un bain" in a room. |
| [#428944](https://tatoeba.org/en/sentences/show/428944) | Je vis au jour le jour. | I am living from day to day. | Reject |  | Idiom. |
| [#482244](https://tatoeba.org/en/sentences/show/482244) | J'ai perdu ma clé. | I have lost my key. | Use | I've lost my key. |  |
| [#499588](https://tatoeba.org/en/sentences/show/499588) | J'adore vivre avec toi. | I love living with you. | Use |  |  |
| [#667310](https://tatoeba.org/en/sentences/show/667310) | Il gagne de quoi vivre. | He earns a living. | Reject |  | Idiom. |
| [#801103](https://tatoeba.org/en/sentences/show/801103) | Prends un bain s'il te plaît. | Please take a bath. | Reject |  | Imperative. |
| [#914868](https://tatoeba.org/en/sentences/show/914868) | Elle vit seule. | She lives on her own. | Use | She lives alone. |  |
| [#1151650](https://tatoeba.org/en/sentences/show/1151650) | Je ne trouve pas ma clé. | I can't find my key. | Use | I can't find my key. |  |
| [#1215477](https://tatoeba.org/en/sentences/show/1215477) | Je voudrais vivre dans une grande ville. | I would like to live in a large city. | Use |  |  |
| [#1329053](https://tatoeba.org/en/sentences/show/1329053) | Tu ne vis pas ici. | You aren't living here. | Use | You don't live here. |  |
| [#1546091](https://tatoeba.org/en/sentences/show/1546091) | Je ne peux pas vivre sans elle. | I can't live without her. | Reject |  | A love line. |
| [#1587832](https://tatoeba.org/en/sentences/show/1587832) | Avec qui est-ce que tu vis ? | Who do you live with? | Use |  |  |
| [#2567475](https://tatoeba.org/en/sentences/show/2567475) | Je prends un bain chaque jour. | I take a bath every day. | Use | I take a bath every day. |  |
| [#3225886](https://tatoeba.org/en/sentences/show/3225886) | Il vit en Angleterre. | He lives in England. | Use |  |  |
| [#3585859](https://tatoeba.org/en/sentences/show/3585859) | Elle vit loin de moi. | She lives far from me. | Use |  |  |
| [#3835904](https://tatoeba.org/en/sentences/show/3835904) | Voici ta clé. | Here's your key. | Use |  |  |
| [#4448229](https://tatoeba.org/en/sentences/show/4448229) | C'est la clé pour la boîte. | This is the key for the box. | Reject |  | "La clé pour la boîte" is not how French says it ("de la boîte"). |
| [#8229468](https://tatoeba.org/en/sentences/show/8229468) | Je vis sur une petite île. | I live on a small island. | Use |  |  |
| [#9366698](https://tatoeba.org/en/sentences/show/9366698) | J'aime vivre. | I love to live. | Reject |  | An odd line on its own. |
| [#10953991](https://tatoeba.org/en/sentences/show/10953991) | Il vit en ville. | He lives in the city. | Use | He lives in town. |  |
| [#11917473](https://tatoeba.org/en/sentences/show/11917473) | C'est votre clé ? | Is this your key? | Use |  |  |
| [#12548513](https://tatoeba.org/en/sentences/show/12548513) | Le clé est sur la table. | The key is on the table. | Reject |  | Gender error: "le clé". |

## U512 · Morning + Night

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S15961 | D'habitude, je me lève tôt. | I usually get up early. | Keep |  | Correct, natural, A1; the English matches. |
| S15962 | C'est une bonne habitude. | It's a good habit. | Keep |  | Correct, natural, A1; the English matches. |
| S15963 | Tu viens à la soirée ? | Are you coming to the party? | Keep |  | Correct, natural, A1; the English matches. |
| S15964 | Tu peux préparer le dîner ? | Can you make dinner? | Keep |  | Correct, natural, A1; the English matches. |
| S15965 | Je vais préparer un gâteau. | I'm going to make a cake. | Keep |  | Correct, natural, A1; the English matches. |
| S15966 | Elle se repose un peu. | She's resting a little. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#11165215](https://tatoeba.org/en/sentences/show/11165215) | C'est l'habitude. | It’s the habit. | Reject |  | A fragment of a conversation; odd on its own. |
| [#10453279](https://tatoeba.org/en/sentences/show/10453279) | Quelle belle soirée ! | What a beautiful evening! | Reject |  | Exclamative. |
| [#7867](https://tatoeba.org/en/sentences/show/7867) | Mon grand-père se réveille tôt. | My grandfather gets up early. | Use | My grandfather wakes up early. |  |
| [#10095](https://tatoeba.org/en/sentences/show/10095) | Mai se trouve après avril. | May comes after April. | Reject |  | An odd line. |
| [#408675](https://tatoeba.org/en/sentences/show/408675) | Le jour se lève bientôt. | The day is breaking soon. | Reject |  | Poetic; "le jour se lève" is not an A1 line. |
| [#427665](https://tatoeba.org/en/sentences/show/427665) | Tu sais où se trouve le problème. | You know where the problem lies. | Reject |  | An odd line. |
| [#478028](https://tatoeba.org/en/sentences/show/478028) | Je me couche très tôt. | I go to bed very early. | Use |  |  |
| [#890820](https://tatoeba.org/en/sentences/show/890820) | Va et réveille Marie. | Go and wake up Mary. | Reject |  | Imperative. |
| [#1238043](https://tatoeba.org/en/sentences/show/1238043) | Il se lève tôt. | He gets up early. | Use |  |  |
| [#1336344](https://tatoeba.org/en/sentences/show/1336344) | Demain est la dernière journée d'école ! | Tomorrow is the last day of school! | Reject |  | French says "Demain, c'est le dernier jour d'école"; this word order is off. |
| [#1605262](https://tatoeba.org/en/sentences/show/1605262) | Je me réveille tôt. | I wake up early. | Use |  |  |
| [#1807318](https://tatoeba.org/en/sentences/show/1807318) | Je me réveille très tôt. | I wake up very early. | Use |  |  |
| [#2740501](https://tatoeba.org/en/sentences/show/2740501) | Je me prépare à partir demain. | I'm getting ready to leave tomorrow. | Use | I'm getting ready to leave tomorrow. |  |
| [#3926743](https://tatoeba.org/en/sentences/show/3926743) | Marie n'arrive pas à se décider. | Mary can't make up her mind. | Reject |  | "Arriver à" plus "se décider" is past A1. |
| [#5341006](https://tatoeba.org/en/sentences/show/5341006) | Mon grand-père se lève tôt. | My grandfather gets up early. | Use |  |  |
| [#6571577](https://tatoeba.org/en/sentences/show/6571577) | Maintenant je me repose. | I'm having a rest now. | Use | I'm resting now. |  |
| [#10486094](https://tatoeba.org/en/sentences/show/10486094) | Il ne se passe rien. | Nothing's going on. | Reject |  | Idiom. |
| [#10787872](https://tatoeba.org/en/sentences/show/10787872) | Elle se réveille tôt le matin. | She wakes up early in the morning. | Use |  |  |
| [#10793448](https://tatoeba.org/en/sentences/show/10793448) | Il se joue de moi. | He's messing with me. | Reject |  | Idiom. |
| [#11277432](https://tatoeba.org/en/sentences/show/11277432) | Bien entendu, je me repose le samedi. | Of course, I rest on Saturdays. | Reject |  | "Bien entendu" is past A1. |
| [#11278097](https://tatoeba.org/en/sentences/show/11278097) | Il se lève et marche lentement. | He gets up and walks slowly. | Use |  |  |
| [#11464665](https://tatoeba.org/en/sentences/show/11464665) | Je vais me coucher, bonne nuit. | I'm going to sleep, goodnight. | Use | I'm going to bed, good night. |  |
| [#12697614](https://tatoeba.org/en/sentences/show/12697614) | Il se rappelle encore d'elle. | He still remembers her. | Reject |  | "Se rappeler de" is a disputed form. |
| [#12705037](https://tatoeba.org/en/sentences/show/12705037) | Comment ça se dit en français ? | How do you say it in French? | Use | How do you say that in French? |  |
| [#12705113](https://tatoeba.org/en/sentences/show/12705113) | Comment ça se dit en italien ? | How do you say that in Italian? | Use | How do you say that in Italian? |  |
| [#12705114](https://tatoeba.org/en/sentences/show/12705114) | Comment ça se dit en allemand ? | How do you say it in German? | Use | How do you say that in German? |  |
| [#12705121](https://tatoeba.org/en/sentences/show/12705121) | Comment ça se dit en anglais ? | How do you say it in English? | Use | How do you say that in English? |  |

## U504 · Housework

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S16061 | Je fais le ménage le samedi. | I do the housework on Saturdays. | Keep |  | Correct, natural, A1; the English matches. |
| S16062 | Tu fais le ménage ? | Are you doing the housework? | Keep |  | Correct, natural, A1; the English matches. |
| S16063 | Non, je vais ranger ma chambre. | No, I'm going to tidy my room. | Keep |  | Correct, natural, A1; the English matches. |
| S16064 | Je n'aime pas faire le ménage. | I don't like doing housework. | Keep |  | Correct, natural, A1; the English matches. |
| S16065 | Tu peux ranger la cuisine ? | Can you tidy the kitchen? | Keep |  | Correct, natural, A1; the English matches. |
| S16066 | Je vais ranger mes vêtements. | I'm going to put away my clothes. | Keep |  | Correct, natural, A1; the English matches. |
| S16067 | Ma grand-mère garde les enfants. | My grandmother looks after the children. | Keep |  | Correct; garder as look after. The Glossary gloss for garder (keep, retain, store) lacks this sense; see the senses note. |
| S16068 | Tu peux garder mon sac ? | Can you look after my bag? | Keep |  | Correct, natural, A1; the English matches. |
| S16069 | Je vais garder le chien samedi. | I'm going to look after the dog on Saturday. | Keep |  | Correct, natural, A1; the English matches. |
| S16070 | Il garde son argent. | He keeps his money. | Keep |  | Correct, natural, A1; the English matches. |
| S16072 | Qu'est-ce que tu vas faire ? | What are you going to do? | Keep |  | Correct, natural, A1; the English matches. |
| S16073 | J'aime faire la cuisine. | I like cooking. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#2859956](https://tatoeba.org/en/sentences/show/2859956) | En garde ! | Have at you! | Reject |  | A fencing cry. |
| [#2290840](https://tatoeba.org/en/sentences/show/2290840) | Tu peux garder le livre. | You may keep the book. | Use | You can keep the book. |  |
| [#891234](https://tatoeba.org/en/sentences/show/891234) | Je vais garder ce gâteau pour moi. | I'll keep this cake for myself. | Use | I'll keep this cake for myself. |  |
| [#3618214](https://tatoeba.org/en/sentences/show/3618214) | Tu peux faire ça. | You can do that. | Use | You can do that. |  |
| [#10611913](https://tatoeba.org/en/sentences/show/10611913) | T'as assez à faire. | You have enough to do. | Reject |  | "T'as" is a spoken elision the course does not teach. |
| [#13358228](https://tatoeba.org/en/sentences/show/13358228) | Tu vas faire quoi ? | What'll you do? | Use | What are you going to do? |  |
| [#3422](https://tatoeba.org/en/sentences/show/3422) | Je ne peux pas vivre sans télé. | I can't live without a TV. | Use | I can't live without TV. |  |
| [#8725](https://tatoeba.org/en/sentences/show/8725) | Fais comme on te dit de faire. | Do as you are told. | Reject |  | Imperative. |
| [#9969](https://tatoeba.org/en/sentences/show/9969) | Tu peux me faire dix moins six ? | Can you subtract six from ten? | Reject |  | An odd line. |
| [#181152](https://tatoeba.org/en/sentences/show/181152) | Qu'est-ce que tu fais ce soir ? | What are you doing this evening? | Use |  |  |
| [#376578](https://tatoeba.org/en/sentences/show/376578) | L'ordinateur est neuf. | The computer is new. | Reject |  | "Neuf" here is new, not nine; a sense trap. |
| [#389615](https://tatoeba.org/en/sentences/show/389615) | Non merci, je ne fais que regarder. | No, thank you. I'm just looking around. | Reject |  | "Ne … que" is past A1. |
| [#391229](https://tatoeba.org/en/sentences/show/391229) | Ne me fais pas rire. | Don't make me laugh. | Reject |  | Imperative. |
| [#427470](https://tatoeba.org/en/sentences/show/427470) | Je ne fais que regarder. | I'm just looking around. | Reject |  | "Ne … que" is past A1. |
| [#428836](https://tatoeba.org/en/sentences/show/428836) | Je ne peux rien faire. | I can't do anything. | Use | I can't do anything. |  |
| [#590439](https://tatoeba.org/en/sentences/show/590439) | J'ai beaucoup à faire. | I have a great deal to do. | Use | I have a lot to do. |  |
| [#961163](https://tatoeba.org/en/sentences/show/961163) | Je ne peux pas faire ça. | I can't do that. | Use |  |  |
| [#1005426](https://tatoeba.org/en/sentences/show/1005426) | Je ne sais pas quoi faire demain ! | I don't know what to do tomorrow. | Use | I don't know what to do tomorrow! |  |
| [#1007471](https://tatoeba.org/en/sentences/show/1007471) | Je sais ce que je vais faire. | I know what I'll do. | Use | I know what I'm going to do. |  |
| [#1011218](https://tatoeba.org/en/sentences/show/1011218) | Qu'est-ce que tu fais maintenant ? | What are you doing? | Use | What are you doing now? |  |
| [#1037587](https://tatoeba.org/en/sentences/show/1037587) | Tu fais quoi ? | What are you doing? | Use |  |  |
| [#1076237](https://tatoeba.org/en/sentences/show/1076237) | Il n'a rien à faire. | He has nothing to do. | Use | He has nothing to do. |  |
| [#1079917](https://tatoeba.org/en/sentences/show/1079917) | Je voudrais regarder la télé. | I'd like to watch TV. | Use |  |  |
| [#1109996](https://tatoeba.org/en/sentences/show/1109996) | C'est comme ça que tu fais ! | That's how you do it! | Reject |  | An odd line. |
| [#1242768](https://tatoeba.org/en/sentences/show/1242768) | Moi, je joue sur mon ordinateur. | Me, I play on my computer. | Use | I play on my computer. |  |
| [#1494824](https://tatoeba.org/en/sentences/show/1494824) | Mon ordinateur est mon meilleur ami. | My computer is my best friend. | Use |  |  |
| [#1592885](https://tatoeba.org/en/sentences/show/1592885) | Il lave ta voiture. | He is washing your car. | Use |  |  |
| [#1624970](https://tatoeba.org/en/sentences/show/1624970) | Je n'ai rien à faire. | I have nothing to do. | Use |  |  |
| [#1642885](https://tatoeba.org/en/sentences/show/1642885) | Fais attention à ce que tu bois. | Be careful with what you drink. | Reject |  | Imperative. |
| [#1697302](https://tatoeba.org/en/sentences/show/1697302) | Marie aime faire la fête. | Mary likes to party. | Use | Marie likes to party. |  |
| [#1844166](https://tatoeba.org/en/sentences/show/1844166) | Il lave la voiture chaque semaine. | He washes the car every week. | Use |  |  |

## U505 · At Work

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S16161 | Je travaille dans une entreprise. | I work for a company. | Keep |  | Correct, natural, A1; the English matches. |
| S16162 | Mon entreprise est petite. | My company is small. | Keep |  | Correct, natural, A1; the English matches. |
| S16163 | C'est une grande entreprise. | It's a big company. | Keep |  | Correct, natural, A1; the English matches. |
| S16164 | Je suis journaliste. | I'm a journalist. | Keep | Swap: #494537, the same sentence. | Correct, natural, A1; the English matches. |
| S16165 | Ma collègue est très gentille. | My colleague is very kind. | Keep | Swap: #1240038 "C'est mon collègue." if a shorter line is wanted. | Correct, natural, A1; the English matches. |
| S16166 | La secrétaire est au bureau. | The secretary is at the office. | Keep |  | Correct, natural, A1; the English matches. |
| S16167 | Mon patron est en réunion. | My boss is in a meeting. | Keep | Swap: #4036135 "La réunion est demain." teaches réunion the same way. | Correct, natural, A1; the English matches. |
| S16168 | Le travail commence à neuf heures. | Work starts at nine. | Keep |  | Correct, natural, A1; the English matches. |
| S16169 | Le directeur n'est pas là. | The manager isn't here. | Keep |  | Correct. The English says manager while R504 says director for the same word; pick one. |
| S16170 | C'est un beau projet. | It's a lovely project. | Keep |  | Correct, natural, A1; the English matches. |
| S16171 | Ils ont un nouveau projet. | They have a new project. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#494537](https://tatoeba.org/en/sentences/show/494537) | Je suis journaliste. | I am a journalist. | Use |  |  |
| [#10780801](https://tatoeba.org/en/sentences/show/10780801) | Ma tante est journaliste. | My aunt is a journalist. | Use |  |  |
| [#1240038](https://tatoeba.org/en/sentences/show/1240038) | C'est mon collègue. | He is my colleague. | Use | He's my colleague. |  |
| [#396302](https://tatoeba.org/en/sentences/show/396302) | Il est mon collègue. | He is my colleague. | Reject |  | French says "C'est mon collègue", not "Il est mon collègue". |
| [#4036135](https://tatoeba.org/en/sentences/show/4036135) | La réunion est demain. | The meeting is tomorrow. | Use |  |  |
| [#9035289](https://tatoeba.org/en/sentences/show/9035289) | À quelle heure commence la réunion ? | What time does the meeting start? | Use |  |  |
| [#628680](https://tatoeba.org/en/sentences/show/628680) | J'ai un projet à faire. | I have a project to do. | Use |  |  |
| [#10398](https://tatoeba.org/en/sentences/show/10398) | Je crois que tu aimes ton métier. | I believe you like your job. | Use |  |  |
| [#126516](https://tatoeba.org/en/sentences/show/126516) | Nous avons un chien noir et blanc. | We have a black and white dog. | Use |  |  |
| [#139034](https://tatoeba.org/en/sentences/show/139034) | Nous avons juste de quoi vivre. | We have just enough to live. | Reject |  | Idiom. |
| [#139741](https://tatoeba.org/en/sentences/show/139741) | Ils ont le même âge. | They are the same age. | Use |  |  |
| [#407589](https://tatoeba.org/en/sentences/show/407589) | Ils ont douze enfants. | They have twelve children. | Use |  |  |
| [#515596](https://tatoeba.org/en/sentences/show/515596) | Ils ont peu de livres. | They have few books. | Use |  |  |
| [#562407](https://tatoeba.org/en/sentences/show/562407) | Nous avons un chat et un chien. | We have a cat and a dog. | Use |  |  |
| [#936206](https://tatoeba.org/en/sentences/show/936206) | Nous avons beaucoup à faire. | We have a lot to do. | Use |  |  |
| [#1045531](https://tatoeba.org/en/sentences/show/1045531) | Nous avons un chat blanc. | We have a white cat. | Use |  |  |
| [#1830343](https://tatoeba.org/en/sentences/show/1830343) | Ils ont besoin de l'argent. | They need the money. | Use |  |  |
| [#2753693](https://tatoeba.org/en/sentences/show/2753693) | Ils ont dit comment ? | Did they say how? | Reject |  | An odd line. |
| [#3215597](https://tatoeba.org/en/sentences/show/3215597) | Ils ont encore perdu. | They lost again. | Reject |  | Passé composé. |
| [#3215598](https://tatoeba.org/en/sentences/show/3215598) | Elles ont encore perdu. | They lost again. | Reject |  | Passé composé. |
| [#3215599](https://tatoeba.org/en/sentences/show/3215599) | Ils ont perdu à nouveau. | They lost again. | Reject |  | Passé composé. |
| [#3215602](https://tatoeba.org/en/sentences/show/3215602) | Elles ont perdu à nouveau. | They lost again. | Reject |  | Passé composé. |
| [#4789631](https://tatoeba.org/en/sentences/show/4789631) | Ils ont du pain. | They have bread. | Use |  |  |
| [#6297079](https://tatoeba.org/en/sentences/show/6297079) | Nous n'avons rien à boire. | We have nothing to drink. | Use |  |  |
| [#6297086](https://tatoeba.org/en/sentences/show/6297086) | Nous n'avons rien à faire. | We have nothing to do. | Use |  |  |
| [#7264779](https://tatoeba.org/en/sentences/show/7264779) | Nous n'avons plus rien à perdre. | We have nothing left to lose. | Reject |  | Idiom. |
| [#8026435](https://tatoeba.org/en/sentences/show/8026435) | Ils n'ont rien dit. | They didn't say anything. | Reject |  | Passé composé. |
| [#8026448](https://tatoeba.org/en/sentences/show/8026448) | Elles n'ont rien dit. | They didn't say anything. | Reject |  | Passé composé. |
| [#8159485](https://tatoeba.org/en/sentences/show/8159485) | Nous avons besoin d'elle. | We need her. | Use |  |  |
| [#8225854](https://tatoeba.org/en/sentences/show/8225854) | Nous avons une idée. | We have an idea. | Use |  |  |
| [#8225870](https://tatoeba.org/en/sentences/show/8225870) | Nous avons la même idée. | We have the same idea. | Use |  |  |
| [#8303101](https://tatoeba.org/en/sentences/show/8303101) | Ils ont besoin de vacances. | They need a vacation. | Use | They need a holiday. |  |

## U513 · Have To

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S16361 | Il va falloir partir. | We'll have to leave. | Keep |  | Correct; impersonal "il va falloir" reads as we/you will have to. |
| S16362 | Je vais devoir partir tôt. | I'll have to leave early. | Keep |  | Correct, natural, A1; the English matches. |
| S16363 | Elle va devoir payer. | She will have to pay. | Keep |  | Correct, natural, A1; the English matches. |
| S16364 | Tu as mal ? | Does it hurt? | Keep |  | Correct, natural, A1; the English matches. |
| S16365 | Oui, j'ai mal à la tête. | Yes, I have a headache. | Keep |  | Correct, natural, A1; the English matches. |
| S16366 | Il faut partir maintenant. | We have to leave now. | Keep |  | Correct, natural, A1; the English matches. |
| S16367 | Il va falloir payer. | We'll have to pay. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#10916414](https://tatoeba.org/en/sentences/show/10916414) | Il va falloir apprendre à vivre avec. | We'll have to learn to live with it. | Reject |  | Idiom. |
| [#1490100](https://tatoeba.org/en/sentences/show/1490100) | C'est ton premier devoir. | This is your first assignment. | Reject |  | "Devoir" here is the noun (homework); a sense trap. |
| [#12190006](https://tatoeba.org/en/sentences/show/12190006) | On doit faire son devoir. | One must do one's duty. | Reject |  | "Devoir" here is the noun (duty); a sense trap. |
| [#12247705](https://tatoeba.org/en/sentences/show/12247705) | Il faut faire son devoir. | One must do one's duty. | Reject |  | "Devoir" here is the noun (duty); a sense trap. |
| [#10700993](https://tatoeba.org/en/sentences/show/10700993) | Il parle mal. | He speaks badly. | Reject |  | "Mal" here is the adverb badly, not the pain the circle teaches; a sense trap. |
| [#13827172](https://tatoeba.org/en/sentences/show/13827172) | Il m'en faut. | I need some. | Reject |  | "En" is past A1. |
| [#3922818](https://tatoeba.org/en/sentences/show/3922818) | Il faut faire vite. | We have to act fast. | Use | We have to be quick. |  |
| [#2316966](https://tatoeba.org/en/sentences/show/2316966) | Il me faut un taxi ! | I need a taxi! | Use |  |  |
| [#3174](https://tatoeba.org/en/sentences/show/3174) | On peut toujours trouver du temps. | One can always find time. | Use | You can always find time. |  |
| [#6514](https://tatoeba.org/en/sentences/show/6514) | Je dois préparer le dîner aujourd'hui. | I have to cook dinner today. | Use | I have to make dinner today. |  |
| [#136638](https://tatoeba.org/en/sentences/show/136638) | Prends ton temps. | Take your time. | Reject |  | Imperative. |
| [#330280](https://tatoeba.org/en/sentences/show/330280) | Il ne peut plus marcher. | He can't walk any more. | Use |  |  |
| [#330293](https://tatoeba.org/en/sentences/show/330293) | On ne peut en dire plus. | No more can be said. | Reject |  | "Ne … que" with "en", past A1. |
| [#367128](https://tatoeba.org/en/sentences/show/367128) | Je n'ai pas beaucoup de temps. | I do not have much time. | Use |  |  |
| [#378614](https://tatoeba.org/en/sentences/show/378614) | Oui, tu dois. | Yes, you must. | Reject |  | A fragment. |
| [#398708](https://tatoeba.org/en/sentences/show/398708) | Je dois encore acheter ton livre. | I still have to buy your book. | Use | I still have to buy your book. |  |
| [#410980](https://tatoeba.org/en/sentences/show/410980) | Je dois y aller maintenant. | I have to go now. | Use | I have to go now. |  |
| [#417444](https://tatoeba.org/en/sentences/show/417444) | Tu ne dois pas entrer. | You must not come in. | Use | You mustn't come in. |  |
| [#427126](https://tatoeba.org/en/sentences/show/427126) | On peut voir une grande montagne là-bas. | We can see a big mountain over there. | Use |  |  |
| [#427701](https://tatoeba.org/en/sentences/show/427701) | Je suis désolé, je dois partir maintenant. | I'm afraid I have to go now. | Use | I'm sorry, I have to leave now. |  |
| [#427745](https://tatoeba.org/en/sentences/show/427745) | On ne peut vivre sans eau. | One can't live without water. | Reject |  | Literary negation without "pas". |
| [#429411](https://tatoeba.org/en/sentences/show/429411) | Il y a un temps pour tout. | There is a time for everything. | Reject |  | A proverb. |
| [#429487](https://tatoeba.org/en/sentences/show/429487) | Le temps passe vite. | Time passes quickly. | Use |  |  |
| [#438732](https://tatoeba.org/en/sentences/show/438732) | Tu dois y aller. | You have to go. | Use | You have to go. |  |
| [#458027](https://tatoeba.org/en/sentences/show/458027) | Je n'ai pas le temps. | I have no time. | Use |  |  |
| [#498439](https://tatoeba.org/en/sentences/show/498439) | Il est tard, je dois partir. | It's getting late. I gotta go. | Use | It's late, I have to leave. |  |
| [#536987](https://tatoeba.org/en/sentences/show/536987) | Le temps est si beau. | The weather is so nice! | Reject |  | "Temps" here is the weather, not the time the circle teaches; a sense trap. |
| [#538831](https://tatoeba.org/en/sentences/show/538831) | Je dois aller à l'école. | I have to go to school. | Use |  |  |
| [#549775](https://tatoeba.org/en/sentences/show/549775) | Je dois sortir d'ici. | I've got to get out of here. | Use | I have to get out of here. |  |
| [#629348](https://tatoeba.org/en/sentences/show/629348) | On ne peut pas vivre pour toujours. | Man cannot live forever. | Use | We can't live forever. |  |
| [#684467](https://tatoeba.org/en/sentences/show/684467) | Il peut nager très vite. | He can swim very fast. | Use |  |  |
| [#705958](https://tatoeba.org/en/sentences/show/705958) | Je dois ranger mon appartement. | I have to clean up my apartment. | Use | I have to tidy my flat. |  |
| [#756260](https://tatoeba.org/en/sentences/show/756260) | Combien je te dois? | What do I owe you? | Reject |  | No space before the question mark, and "dois" here means owe; a sense trap. |

## U522 · Saying Why

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S16261 | Pourquoi tu ne viens pas ? | Why aren't you coming? | Keep |  | Correct, natural, A1; the English matches. |
| S16262 | Parce que je n'ai pas le temps. | Because I don't have time. | Keep |  | Correct, natural, A1; the English matches. |
| S16263 | Par exemple ? | For example? | Keep | Swap: #3213171 "Voici un exemple." if a full sentence is preferred to the fragment. | Correct; a natural one-word follow-up question. |
| S16264 | Vous avez un exemple ? | Do you have an example? | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#3213171](https://tatoeba.org/en/sentences/show/3213171) | Voici un exemple. | Here is an example. | Use |  |  |
| [#139565](https://tatoeba.org/en/sentences/show/139565) | Suivez son exemple. | Follow his example. | Reject |  | Imperative. |
| [#11387454](https://tatoeba.org/en/sentences/show/11387454) | Je donne un exemple. | I give an example. | Use |  |  |
| [#3432](https://tatoeba.org/en/sentences/show/3432) | Fais tout ce qu'il te dit. | Do whatever he tells you. | Reject |  | Imperative. |
| [#15366](https://tatoeba.org/en/sentences/show/15366) | Je pense qu'il va bientôt revenir. | I suppose he will be back soon. | Use | I think he'll be back soon. |  |
| [#127599](https://tatoeba.org/en/sentences/show/127599) | J'attends qu'il m'aide. | I expect him to help me. | Reject |  | Subjunctive. |
| [#127782](https://tatoeba.org/en/sentences/show/127782) | Je sais qu'elle est belle. | I know that she is beautiful. | Use |  |  |
| [#136240](https://tatoeba.org/en/sentences/show/136240) | Ce n'est rien qu'une enfant. | She is nothing but a child. | Reject |  | "Ne … rien que" is past A1. |
| [#138975](https://tatoeba.org/en/sentences/show/138975) | C'est ici qu'il joue. | He is playing here. | Use | This is where he plays. |  |
| [#140102](https://tatoeba.org/en/sentences/show/140102) | Fais attention à ce qu'il dit. | Pay attention to what he says. | Reject |  | Imperative. |
| [#384543](https://tatoeba.org/en/sentences/show/384543) | Je pense qu'elle est gentille. | I think she is kind. | Use |  |  |
| [#391111](https://tatoeba.org/en/sentences/show/391111) | Je parle aussi bien français qu'elle. | I speak French as well as she does. | Use |  |  |
| [#397144](https://tatoeba.org/en/sentences/show/397144) | Tout ce qu'il dit est juste. | Everything he says is correct. | Use | Everything he says is right. |  |
| [#430398](https://tatoeba.org/en/sentences/show/430398) | Fais ce qu'il te plaît. | You are welcome to do anything you like. | Reject |  | Imperative and idiom. |
| [#439945](https://tatoeba.org/en/sentences/show/439945) | Ce n'est qu'un enfant. | He is just a child. | Reject |  | "Ne … que" is past A1. |
| [#477939](https://tatoeba.org/en/sentences/show/477939) | Qu'elle est belle ! | How beautiful she is! | Reject |  | Exclamative. |
| [#549409](https://tatoeba.org/en/sentences/show/549409) | Ce que vous dites est vrai. | What you say is right. | Use |  |  |
| [#558626](https://tatoeba.org/en/sentences/show/558626) | Je suis sûr qu'il est heureux. | I'm sure that he's happy. | Use |  |  |
| [#646666](https://tatoeba.org/en/sentences/show/646666) | Vous êtes plus grand qu'elle. | You are taller than she. | Use | You're taller than her. |  |
| [#646668](https://tatoeba.org/en/sentences/show/646668) | Tu es plus grand qu'elle. | You are taller than she. | Use | You're taller than her. |  |
| [#1112512](https://tatoeba.org/en/sentences/show/1112512) | Ce n'est qu'un jeu. | It's only a game. | Reject |  | "Ne … que" is past A1. |
| [#1257351](https://tatoeba.org/en/sentences/show/1257351) | Ne dis rien ! | Don't say anything. | Reject |  | Imperative. |
| [#1498365](https://tatoeba.org/en/sentences/show/1498365) | Tu n'as qu'à aller là-bas. | All you have to do is go there. | Reject |  | Idiom. |
| [#1508517](https://tatoeba.org/en/sentences/show/1508517) | Je suis sûr de ma phrase. | I'm sure of my sentence. | Reject |  | An odd line. |
| [#1508518](https://tatoeba.org/en/sentences/show/1508518) | Je suis sûre de ma phrase. | I'm sure of my sentence. | Reject |  | An odd line. |
| [#1583953](https://tatoeba.org/en/sentences/show/1583953) | Il n'y a qu'à demander. | You just have to ask for it. | Reject |  | Idiom. |
| [#1684339](https://tatoeba.org/en/sentences/show/1684339) | Il se peut qu'elle raconte tout. | She may spill the beans. | Reject |  | "Il se peut que" is past A1, and the English is an idiom. |
| [#1785570](https://tatoeba.org/en/sentences/show/1785570) | Je vais écrire une phrase en allemand. | I'm going to write a sentence in German. | Use |  |  |

## U506 · School + Study

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S16461 | Mon fils va au collège. | My son goes to secondary school. | Keep |  | Correct; collège is the 11-to-15 school, so secondary school is the right English. |
| S16462 | Le collège est près d'ici. | The school is near here. | Keep |  | Correct, natural, A1; the English matches. |
| S16463 | Ma sœur est au lycée. | My sister is at high school. | Keep | Swap: #10687351 "Nous ne sommes plus au lycée." | Correct, natural, A1; the English matches. |
| S16464 | Le lycée commence à huit heures. | High school starts at eight. | Keep |  | Correct, natural, A1; the English matches. |
| S16465 | Tu vas à l'université ? | Do you go to university? | Keep |  | Correct, natural, A1; the English matches. |
| S16466 | Oui, j'étudie les maths. | Yes, I study maths. | Keep |  | Correct, natural, A1; the English matches. |
| S16467 | Je fais l'exercice. | I'm doing the exercise. | Keep |  | Correct, natural, A1; the English matches. |
| S16468 | Ma classe est grande. | My class is big. | Keep | Swap: #136642 "Ils sont dans la même classe." | Correct, natural, A1; the English matches. |
| S16469 | La classe commence à neuf heures. | The class starts at nine. | Keep |  | Correct, natural, A1; the English matches. |
| S16470 | Le prof est très gentil. | The teacher is very kind. | Keep |  | Correct, natural, A1; the English matches. |
| S16471 | L'examen est demain. | The exam is tomorrow. | Keep | Swap: #3229023 "L'examen est facile." | Correct, natural, A1; the English matches. |
| S16472 | C'est un exercice difficile. | It's a difficult exercise. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#10687351](https://tatoeba.org/en/sentences/show/10687351) | Nous ne sommes plus au lycée. | We're not in high school anymore. | Use | We're not at high school any more. |  |
| [#2047036](https://tatoeba.org/en/sentences/show/2047036) | Je vais à l'université. | I'm going to the university. | Use | I go to university. |  |
| [#1164918](https://tatoeba.org/en/sentences/show/1164918) | Je suis étudiante dans une université. | I am a student in a university. | Use | I'm a student at a university. |  |
| [#11613849](https://tatoeba.org/en/sentences/show/11613849) | L'exercice est bon pour toi. | Exercise is good for you. | Reject |  | "Exercice" here is physical exercise, not the schoolwork the circle teaches; a sense trap. |
| [#1129539](https://tatoeba.org/en/sentences/show/1129539) | Fais de l'exercice chaque jour. | Exercise every day. | Reject |  | Imperative, and the physical-exercise sense. |
| [#136642](https://tatoeba.org/en/sentences/show/136642) | Ils sont dans la même classe. | They are in the same class. | Use |  |  |
| [#1144779](https://tatoeba.org/en/sentences/show/1144779) | Notre classe est une petite classe. | Our class is a small one. | Use |  |  |
| [#3229023](https://tatoeba.org/en/sentences/show/3229023) | L'examen est facile. | The exam is easy. | Use |  |  |
| [#484666](https://tatoeba.org/en/sentences/show/484666) | Demain j'ai un examen. | I have an exam tomorrow. | Use | I have an exam tomorrow. |  |
| [#15735](https://tatoeba.org/en/sentences/show/15735) | J'étudie à l'étranger. | I study abroad. | Use |  |  |
| [#119767](https://tatoeba.org/en/sentences/show/119767) | Merci pour ta réponse. | Thanks for your reply. | Use |  |  |
| [#127894](https://tatoeba.org/en/sentences/show/127894) | J'étudie. | I am studying. | Use |  |  |
| [#417443](https://tatoeba.org/en/sentences/show/417443) | Tu dois bien étudier. | You must study hard. | Use | You have to study hard. |  |
| [#435467](https://tatoeba.org/en/sentences/show/435467) | J'aime les maths. | I like maths. | Use |  |  |
| [#493695](https://tatoeba.org/en/sentences/show/493695) | Tu connais la réponse ? | Do you know the answer? | Use |  |  |
| [#613775](https://tatoeba.org/en/sentences/show/613775) | J'étudie le chinois depuis deux ans. | I have been studying Chinese for two years. | Use |  |  |
| [#888912](https://tatoeba.org/en/sentences/show/888912) | Marie étudie toujours deux heures par jour. | Mary always studies for two hours a day. | Use | Marie always studies two hours a day. |  |
| [#890540](https://tatoeba.org/en/sentences/show/890540) | Elle connaît peut-être la réponse. | She might know the answer. | Use | Maybe she knows the answer. |  |
| [#1007513](https://tatoeba.org/en/sentences/show/1007513) | Il est meilleur que moi en maths. | He's better than me at maths. | Use |  |  |
| [#1168636](https://tatoeba.org/en/sentences/show/1168636) | Tu dois plus étudier. | You have to study more. | Reject |  | French says "étudier plus", not "plus étudier". |
| [#1583952](https://tatoeba.org/en/sentences/show/1583952) | Même un enfant connaît la réponse. | Even a child can answer the question. | Use | Even a child knows the answer. |  |
| [#1683212](https://tatoeba.org/en/sentences/show/1683212) | Je lui ai dit d'étudier. | I told him to study. | Reject |  | Passé composé. |
| [#2295739](https://tatoeba.org/en/sentences/show/2295739) | J'étudie trois heures par jour. | I study for 3 hours every day. | Use | I study three hours a day. |  |
| [#2317807](https://tatoeba.org/en/sentences/show/2317807) | Il étudie aussi le chinois. | He studies Chinese as well. | Use |  |  |
| [#2471301](https://tatoeba.org/en/sentences/show/2471301) | Ils ont besoin d'étudier. | They need to study. | Use |  |  |
| [#2474024](https://tatoeba.org/en/sentences/show/2474024) | Il leur faut étudier. | They need to study. | Reject |  | "Leur" is past A1. |
| [#2826434](https://tatoeba.org/en/sentences/show/2826434) | Je pense que j'ai la réponse. | I think I have the answer. | Use |  |  |
| [#2837745](https://tatoeba.org/en/sentences/show/2837745) | Une question est une réponse. | A question is an answer. | Reject |  | An odd line. |
| [#3556383](https://tatoeba.org/en/sentences/show/3556383) | Je déteste les maths. | I hate maths. | Use |  |  |
| [#3707989](https://tatoeba.org/en/sentences/show/3707989) | Personne n'a de réponse. | No one has an answer. | Use |  |  |
| [#5351075](https://tatoeba.org/en/sentences/show/5351075) | Voici la réponse. | Here's the answer. | Use |  |  |
| [#5511801](https://tatoeba.org/en/sentences/show/5511801) | J'attends une réponse. | I'm waiting for a reply. | Use |  |  |
| [#6028404](https://tatoeba.org/en/sentences/show/6028404) | Je ne comprends pas ta réponse. | I don't understand your answer. | Use |  |  |
| [#7814822](https://tatoeba.org/en/sentences/show/7814822) | La réponse est juste. | The answer is right. | Use |  |  |

## U507 · Messages

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S16561 | J'envoie un mail à Paul. | I'm sending an e-mail to Paul. | Keep |  | Correct, natural, A1; the English matches. |
| S16562 | C'est un mail de ma collègue. | It's an e-mail from my colleague. | Keep | Swap: #5682888 "Quelle est ton adresse mail ?" teaches mail in its most useful line. | Correct, natural, A1; the English matches. |
| S16563 | Je vais écrire un mail. | I'm going to write an e-mail. | Keep |  | Correct, natural, A1; the English matches. |
| S16564 | Tu peux m'envoyer un message ? | Can you send me a message? | Keep |  | Correct, natural, A1; the English matches. |
| S16565 | Oui, je t'écris ce soir. | Yes, I'll write to you tonight. | Keep |  | Correct, natural, A1; the English matches. |
| S16566 | Je vais envoyer une lettre. | I'm going to send a letter. | Keep |  | Correct, natural, A1; the English matches. |
| S16567 | Allô ? Oui, c'est Marie. | Hello? Yes, it's Marie. | Keep |  | Correct; two sentences, which the pull would not allow, but natural for a phone line. |
| S16568 | Allô, Paul ? C'est maman. | Hello, Paul? It's Mum. | Keep |  | Correct phone line. |
| S16569 | Allô ? Ici c'est Paul. | Hello? It's Paul here. | Fix | "Allô, ici Paul." = "Hello, Paul here." | "Ici c'est Paul" is not the phone phrase; French says "Ici Paul" or "C'est Paul". |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#5682888](https://tatoeba.org/en/sentences/show/5682888) | Quelle est ton adresse mail ? | What's your email address? | Use | What's your email address? |  |
| [#11799223](https://tatoeba.org/en/sentences/show/11799223) | Quelle est son adresse mail ? | What is her e-mail address? | Use | What's her email address? |  |
| [#11929671](https://tatoeba.org/en/sentences/show/11929671) | J'écris. | I'm writing. | Use |  |  |
| [#12311294](https://tatoeba.org/en/sentences/show/12311294) | J'écris une histoire. | I'm writing a story. | Use |  |  |
| [#13919302](https://tatoeba.org/en/sentences/show/13919302) | Écris ce que tu sais. | Write what you know. | Reject |  | Imperative. |
| [#1570157](https://tatoeba.org/en/sentences/show/1570157) | Allô, y a quelqu'un? | Hello, is anybody there? | Reject |  | Spoken "y a" for il y a, and no space before the question mark. |
| [#135534](https://tatoeba.org/en/sentences/show/135534) | Jour après jour je lui écris. | Day after day I write to her. | Reject |  | An odd line. |
| [#1446261](https://tatoeba.org/en/sentences/show/1446261) | Viens et écris ton nom. | Come and write your name. | Reject |  | Imperative. |
| [#2705117](https://tatoeba.org/en/sentences/show/2705117) | J'ai un message. | I have a message. | Use |  |  |
| [#3138422](https://tatoeba.org/en/sentences/show/3138422) | Je suis sur internet. | I am on the Internet. | Use | I'm on the internet. |  |
| [#7035626](https://tatoeba.org/en/sentences/show/7035626) | Il lui a écrit un message. | He wrote her a message. | Reject |  | Passé composé. |
| [#11014366](https://tatoeba.org/en/sentences/show/11014366) | Écris dans ta langue ! | Write in your language! | Reject |  | Imperative. |
| [#11111672](https://tatoeba.org/en/sentences/show/11111672) | Tu écris comme une vieille personne. | You write like an old person. | Reject |  | An insult. |
| [#11155262](https://tatoeba.org/en/sentences/show/11155262) | J'écris et puis je lis. | I write and then I read. | Use |  |  |
| [#11533331](https://tatoeba.org/en/sentences/show/11533331) | J'écris un nouveau livre. | I'm writing a new book. | Use |  |  |
| [#11812914](https://tatoeba.org/en/sentences/show/11812914) | Je n'ai pas Internet. | I don't have Internet. | Use | I don't have internet. |  |

## U514 · Invitations

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S16761 | Je t'invite à dîner. | I'm inviting you to dinner. | Keep |  | Correct, natural, A1; the English matches. |
| S16762 | Je vais inviter Paul et Marie. | I'm going to invite Paul and Marie. | Keep |  | Correct, natural, A1; the English matches. |
| S16763 | Tu peux inviter ta sœur. | You can invite your sister. | Keep |  | Correct, natural, A1; the English matches. |
| S16764 | On va fêter ton anniversaire. | We're going to celebrate your birthday. | Keep |  | Correct, natural, A1; the English matches. |
| S16765 | Je vais fêter mes trente ans. | I'm going to celebrate my thirtieth birthday. | Keep |  | Correct, natural, A1; the English matches. |
| S16766 | Tu viens à ma fête samedi ? | Are you coming to my party on Saturday? | Keep |  | Correct, natural, A1; the English matches. |
| S16767 | Avec plaisir, merci ! | With pleasure, thank you! | Keep |  | Correct, natural, A1; the English matches. |
| S16768 | Il invite Marie au cinéma. | He's inviting Marie to the cinema. | Keep |  | Correct, natural, A1; the English matches. |
| S16769 | Je voudrais vous remercier. | I'd like to thank you. | Keep |  | Correct, natural, A1; the English matches. |
| S16770 | Comment te remercier ? | How can I thank you? | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#407696](https://tatoeba.org/en/sentences/show/407696) | Je vous invite. | I'm inviting you. | Use | I'm inviting you. |  |
| [#549404](https://tatoeba.org/en/sentences/show/549404) | Vous pouvez inviter qui vous voulez. | You may invite any person you like. | Use | You can invite whoever you want. |  |
| [#2491519](https://tatoeba.org/en/sentences/show/2491519) | Tout le plaisir est pour moi. | It's my pleasure. | Use | The pleasure is mine. |  |
| [#11542214](https://tatoeba.org/en/sentences/show/11542214) | Avec grand plaisir, mon amie. | With great pleasure, my friend. | Reject |  | An odd vocative. |
| [#469686](https://tatoeba.org/en/sentences/show/469686) | Tout le plaisir est pour nous. | It's our pleasure. | Reject |  | The set phrase is "Tout le plaisir est pour moi"; the plural is odd. |
| [#10954](https://tatoeba.org/en/sentences/show/10954) | Je ne peux pas te remercier assez. | I can't thank you enough. | Use |  |  |
| [#751703](https://tatoeba.org/en/sentences/show/751703) | Au revoir et bonne chance. | Goodbye and good luck. | Use |  |  |
| [#802527](https://tatoeba.org/en/sentences/show/802527) | Bonne chance pour l'examen ! | Good luck on the exam! | Use |  |  |
| [#1038701](https://tatoeba.org/en/sentences/show/1038701) | C'est vraiment pas de chance ! | Bad luck! | Reject |  | Dropped "ne". |
| [#2608173](https://tatoeba.org/en/sentences/show/2608173) | Je n'ai pas de chance. | I have no luck. | Use | I have no luck. |  |
| [#3033832](https://tatoeba.org/en/sentences/show/3033832) | Je vous remercie pour votre aide. | I thank you for your assistance. | Use | Thank you for your help. |  |
| [#13021248](https://tatoeba.org/en/sentences/show/13021248) | Je te remercie pour ton aide. | I thank you for your help. | Use | Thank you for your help. |  |

## U523 · Feeling Like It

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S16661 | Tu as envie de venir ? | Do you feel like coming? | Keep |  | Correct, natural, A1; the English matches. |
| S16663 | J'ai envie de dormir. | I feel like sleeping. | Keep |  | Correct, natural, A1; the English matches. |
| S16665 | Tu as envie de quoi ? | What do you feel like? | Keep |  | Correct, natural, A1; the English matches. |
| S16666 | Je veux bien. | I'd like that. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#8085881](https://tatoeba.org/en/sentences/show/8085881) | J'ai envie de partir. | I wish to leave. | Use | I feel like leaving. |  |
| [#236944](https://tatoeba.org/en/sentences/show/236944) | Je te veux. | I want you. | Reject |  | A love line. |
| [#3265707](https://tatoeba.org/en/sentences/show/3265707) | Je m'en veux. | I blame myself. | Reject |  | Idiom. |
| [#11758849](https://tatoeba.org/en/sentences/show/11758849) | Quand tu veux. | Whenever you're ready. | Use | Whenever you want. |  |
| [#6807](https://tatoeba.org/en/sentences/show/6807) | Je veux apprendre à nager. | I want to learn how to swim. | Use |  |  |
| [#7167](https://tatoeba.org/en/sentences/show/7167) | Je veux voir le film. | I want to see the movie. | Use |  |  |
| [#10274](https://tatoeba.org/en/sentences/show/10274) | Fais ce que tu veux. | Do whatever you want. | Reject |  | Imperative. |
| [#10482](https://tatoeba.org/en/sentences/show/10482) | Je veux ce sac. | I want that bag. | Use |  |  |
| [#10692](https://tatoeba.org/en/sentences/show/10692) | Je t'aide quand tu veux. | I am always ready to help you. | Use | I'll help you whenever you want. |  |
| [#135204](https://tatoeba.org/en/sentences/show/135204) | Je veux monter à cheval. | I want to ride a horse. | Use |  |  |
| [#135989](https://tatoeba.org/en/sentences/show/135989) | C'est ce que je veux dire. | What I want to say is this. | Use | That's what I mean. |  |
| [#138667](https://tatoeba.org/en/sentences/show/138667) | Choisis la robe que tu veux. | Choose any dress you like. | Reject |  | Imperative. |
| [#138668](https://tatoeba.org/en/sentences/show/138668) | Achète la robe que tu veux. | Buy the dress you want. | Reject |  | Imperative. |
| [#138673](https://tatoeba.org/en/sentences/show/138673) | Tu peux prendre ce que tu veux. | You may take anything you like. | Use |  |  |
| [#139055](https://tatoeba.org/en/sentences/show/139055) | Je veux rester ici. | I want to stay here. | Use |  |  |
| [#181493](https://tatoeba.org/en/sentences/show/181493) | Je veux partir à l'étranger. | I want to go abroad. | Use | I want to go abroad. |  |
| [#181691](https://tatoeba.org/en/sentences/show/181691) | Passe me voir quand tu veux. | Come and see me any time you like. | Reject |  | Imperative. |
| [#236949](https://tatoeba.org/en/sentences/show/236949) | Je veux quelqu'un d'autre. | I want somebody else. | Reject |  | A love line. |
| [#330489](https://tatoeba.org/en/sentences/show/330489) | Je veux de l'argent. | I want money. | Use |  |  |
| [#330692](https://tatoeba.org/en/sentences/show/330692) | Je veux ce téléphone. | I want this telephone. | Use |  |  |
| [#390281](https://tatoeba.org/en/sentences/show/390281) | Je veux aller en France. | I want to go over to France. | Use | I want to go to France. |  |
| [#391014](https://tatoeba.org/en/sentences/show/391014) | Je veux aller en Italie. | I do want to go to Italy. | Use | I want to go to Italy. |  |
| [#391034](https://tatoeba.org/en/sentences/show/391034) | Je veux habiter en Italie. | I want to live in Italy. | Use |  |  |
| [#407113](https://tatoeba.org/en/sentences/show/407113) | Je ne veux rien à boire. | I don't want anything to drink. | Use |  |  |
| [#415501](https://tatoeba.org/en/sentences/show/415501) | Prends ce que tu veux. | Take anything you want. | Reject |  | Imperative. |
| [#417468](https://tatoeba.org/en/sentences/show/417468) | Prends le gâteau que tu veux. | Take whatever cake you want. | Reject |  | Imperative. |
| [#427669](https://tatoeba.org/en/sentences/show/427669) | Tu peux aller où tu veux. | You can go anywhere you like. | Use |  |  |
| [#430391](https://tatoeba.org/en/sentences/show/430391) | Je ne veux pas perdre ce match. | I don't want to lose this match. | Use |  |  |
| [#453145](https://tatoeba.org/en/sentences/show/453145) | Je veux prendre un bain. | I want to take a bath. | Use |  |  |

## U508 · Filling In Forms

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S16861 | Votre nom, s'il vous plaît ? | Your surname, please? | Keep |  | Correct, natural, A1; the English matches. |
| S16862 | Quel est votre lieu de naissance ? | What is your place of birth? | Keep |  | Correct, natural, A1; the English matches. |
| S16864 | Quelle est votre profession ? | What is your job? | Keep |  | Correct, natural, A1; the English matches. |
| S16865 | Je suis prof. | I'm a teacher. | Keep |  | Correct, natural, A1; the English matches. |
| S16866 | Votre nationalité, s'il vous plaît ? | Your nationality, please? | Keep | Swap: #428460 "Quelle est sa nationalité ?" | Correct, natural, A1; the English matches. |
| S16867 | Profession : journaliste. | Job: journalist. | Keep |  | Correct, natural, A1; the English matches. |
| S16868 | C'est une belle profession. | It's a fine profession. | Keep |  | Correct, natural, A1; the English matches. |
| S16869 | Merci, mademoiselle. | Thank you, miss. | Keep |  | Correct in speech; mademoiselle left official French forms in 2012, so it is a spoken courtesy here, not a form field. |
| S16870 | Votre signature, s'il vous plaît. | Your signature, please. | Keep | Swap: #2859990 "Nous avons besoin de votre signature." | Correct, natural, A1; the English matches. |
| S16871 | Votre date de naissance, s'il vous plaît ? | Your date of birth, please? | Keep |  | Correct, natural, A1; the English matches. |
| S16872 | Date et lieu de naissance ? | Date and place of birth? | Keep |  | Correct, natural, A1; the English matches. |
| S16873 | Quel est le lieu de la réunion ? | Where is the meeting being held? | Fix | French unchanged; show "Where is the meeting?" | "Where is the meeting being held?" is heavier than the French; the plain question matches. |
| S16874 | Vous êtes marié ou célibataire ? | Are you married or single? | Keep |  | Correct, natural, A1; the English matches. |
| S16875 | Je suis née le trois mai. | I was born on the third of May. | Keep |  | Correct feminine; accept "né" too. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#428460](https://tatoeba.org/en/sentences/show/428460) | Quelle est sa nationalité ? | What is his nationality? | Use |  |  |
| [#2859990](https://tatoeba.org/en/sentences/show/2859990) | Nous avons besoin de votre signature. | We need your signature. | Use |  |  |
| [#1309348](https://tatoeba.org/en/sentences/show/1309348) | Il est Italien de naissance. | He is Italian by birth. | Reject |  | Nationality adjectives take no capital: "italien". |
| [#132765](https://tatoeba.org/en/sentences/show/132765) | Il est Allemand de naissance. | He is German by birth. | Reject |  | Nationality adjectives take no capital: "allemand". |
| [#1720066](https://tatoeba.org/en/sentences/show/1720066) | Il est japonais de naissance. | He is Japanese by birth. | Use |  |  |
| [#1138264](https://tatoeba.org/en/sentences/show/1138264) | Quand est-ce que le mariage a lieu ? | When is the wedding going to take place? | Use | When does the wedding take place? |  |
| [#12656610](https://tatoeba.org/en/sentences/show/12656610) | Elle est célibataire. | She's single. | Use |  |  |
| [#8790348](https://tatoeba.org/en/sentences/show/8790348) | Il est encore célibataire ? | Is he still single? | Use | Is he still single? |  |

## U509 · See You Soon

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S16961 | Je t'embrasse, Marie. | Love, Marie. | Keep |  | Correct message ending; the English "Love," is the right equivalent. |
| S16962 | Je vous embrasse. | Love to you all. | Keep |  | Correct, natural, A1; the English matches. |
| S16963 | Elle embrasse sa mère. | She kisses her mother. | Keep |  | Correct, natural, A1; the English matches. |
| S16964 | Je te fais une bise. | I'm giving you a kiss on the cheek. | Keep |  | Correct; "Je te fais des bises" / "Bisous" are the commoner endings, this one is fine. |
| S16965 | Une bise à ta sœur ! | Give your sister a kiss from me! | Keep |  | Correct, natural, A1; the English matches. |
| S16966 | Bises, Marie. | Love, Marie. | Keep |  | Correct, natural, A1; the English matches. |
| S16967 | À bientôt, bises ! | See you soon, love! | Keep |  | Correct, natural, A1; the English matches. |
| S16968 | Bises à tout le monde. | Love to everyone. | Keep |  | Correct, natural, A1; the English matches. |
| S16969 | On va se retrouver à la gare. | We're going to meet at the station. | Keep |  | Correct, natural, A1; the English matches. |
| S16970 | Je vais retrouver Paul ce soir. | I'm meeting Paul tonight. | Keep |  | Correct, natural, A1; the English matches. |
| S16971 | On peut se retrouver demain ? | Can we meet tomorrow? | Keep |  | Correct, natural, A1; the English matches. |
| S16972 | Oui, à dix heures. | Yes, at ten o'clock. | Keep |  | Correct, natural, A1; the English matches. |
| S16973 | En France, on se fait la bise. | In France, people kiss on the cheek. | Keep |  | Correct; a cultural note line, "se faire la bise" is the set phrase. |
| S16974 | Je quitte la maison à huit heures. | I leave the house at eight. | Keep |  | Correct, natural, A1; the English matches. |
| S16975 | Elle quitte l'école à cinq heures. | She leaves school at five. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#1694960](https://tatoeba.org/en/sentences/show/1694960) | L'homme embrasse la femme. | The man kisses the woman. | Use |  |  |
| [#11502510](https://tatoeba.org/en/sentences/show/11502510) | On est quitte ? | Are we even? | Reject |  | Idiom (quitte as even). |
| [#11916318](https://tatoeba.org/en/sentences/show/11916318) | Je te quitte maintenant. | I'm leaving you now. | Reject |  | Reads as a break-up line. |
| [#2432948](https://tatoeba.org/en/sentences/show/2432948) | Je pense qu'on est quitte maintenant. | I think we're even now. | Reject |  | Idiom (quitte as even). |
| [#440038](https://tatoeba.org/en/sentences/show/440038) | Je suis content de vous revoir. | I'm glad to see you back. | Use | I'm glad to see you again. |  |
| [#549030](https://tatoeba.org/en/sentences/show/549030) | Le train vient de quitter. | The train just left. | Reject |  | Ungrammatical: quitter needs an object. |
| [#549748](https://tatoeba.org/en/sentences/show/549748) | Je veux te revoir. | I want to see you again. | Use |  |  |
| [#746284](https://tatoeba.org/en/sentences/show/746284) | J'espère te revoir bientôt. | I hope I'll see you again soon. | Use |  |  |
| [#1405642](https://tatoeba.org/en/sentences/show/1405642) | Je dois te quitter. | I have to leave you. | Use | I have to leave you. |  |
| [#1900917](https://tatoeba.org/en/sentences/show/1900917) | Je ne veux jamais plus te revoir. | I never want to see you again. | Reject |  | A harsh line. |
| [#1908923](https://tatoeba.org/en/sentences/show/1908923) | Vous pouvez quitter la pièce. | You may leave the room. | Use |  |  |
| [#3925832](https://tatoeba.org/en/sentences/show/3925832) | Tu dois quitter le pays aujourd'hui. | You have to leave the country today. | Reject |  | An odd, harsh line. |

## U515 · Love + Dreams

### Drafts

| ID | French | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S17061 | Oui, je rêve de voyager. | Yes, I dream of travelling. | Keep |  | Correct, natural, A1; the English matches. |
| S17062 | Mon fils aime rêver. | My son likes to dream. | Keep |  | Correct, natural, A1; the English matches. |
| S17063 | Il est amoureux de Marie. | He's in love with Marie. | Keep |  | Correct, natural, A1; the English matches. |
| S17064 | Elle est amoureuse de Paul. | She's in love with Paul. | Keep |  | Correct, natural, A1; the English matches. |
| S17065 | Tu as un rêve ? | Do you have a dream? | Keep |  | Correct, natural, A1; the English matches. |
| S17066 | J'aime rêver le soir. | I like to dream in the evening. | Keep |  | Correct; a slightly literary line, fine beside the others. |
| S17067 | Ma grand-mère a un grand cœur. | My grandmother has a big heart. | Keep |  | Correct, natural, A1; the English matches. |
| S17068 | Tu as un bon cœur. | You have a kind heart. | Keep |  | Correct, natural, A1; the English matches. |

### Candidates

| Tatoeba | French | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#3447](https://tatoeba.org/en/sentences/show/3447) | J'ai un rêve. | I have a dream. | Use |  |  |
| [#11980736](https://tatoeba.org/en/sentences/show/11980736) | L'Américain rêve. | The American dreams. | Reject |  | An odd line. |
| [#892706](https://tatoeba.org/en/sentences/show/892706) | Tout n'est que rêve. | Everything is but a dream. | Reject |  | "Ne … que" and a proverb. |
| [#13186951](https://tatoeba.org/en/sentences/show/13186951) | Je ne peux qu'en rêver. | I can only dream of that. | Reject |  | "Ne … que" with "en", past A1. |
| [#11980670](https://tatoeba.org/en/sentences/show/11980670) | Tu peux toujours rêver américain ! | American dream on! | Reject |  | An odd line. |
| [#11980678](https://tatoeba.org/en/sentences/show/11980678) | Vous pouvez toujours rêver américain. | American dream on. | Reject |  | An odd line. |
| [#1135860](https://tatoeba.org/en/sentences/show/1135860) | Je suis un amoureux du beau. | I am a lover of the beautiful. | Reject |  | Amoureux as a noun (lover of), an odd line. |
| [#1135859](https://tatoeba.org/en/sentences/show/1135859) | Nous sommes des amoureux du beau. | We are lovers of the beautiful. | Reject |  | Amoureux as a noun (lover of), an odd line. |
| [#11341723](https://tatoeba.org/en/sentences/show/11341723) | Février est le mois des amoureux. | February is the month of lovers. | Use |  |  |
| [#11231](https://tatoeba.org/en/sentences/show/11231) | Ouvre ton cœur. | Open your heart. | Reject |  | Imperative. |
| [#1817946](https://tatoeba.org/en/sentences/show/1817946) | Voici mon cœur. | Here is my heart. | Reject |  | An odd line. |
| [#12341950](https://tatoeba.org/en/sentences/show/12341950) | C'est mon cœur. | It's my heart. | Reject |  | An odd line. |
| [#506901](https://tatoeba.org/en/sentences/show/506901) | Qu'est-ce que l'amour ? | What is love? | Use |  |  |
| [#518350](https://tatoeba.org/en/sentences/show/518350) | Je veux faire l'amour avec toi. | I want to make love with you. | Reject |  | A sexual line. |
| [#549080](https://tatoeba.org/en/sentences/show/549080) | C'est mon premier amour. | He's my first love. | Use | It's my first love. |  |
| [#936334](https://tatoeba.org/en/sentences/show/936334) | C'est seulement un rêve. | It's just a dream. | Use |  |  |
| [#1945927](https://tatoeba.org/en/sentences/show/1945927) | Crois à l'amour ! | Believe in love! | Reject |  | Imperative. |
| [#2818992](https://tatoeba.org/en/sentences/show/2818992) | Les yeux sont la langue du cœur. | The eyes are the language of the heart. | Reject |  | A proverb. |
| [#3615084](https://tatoeba.org/en/sentences/show/3615084) | Mon amour ne coûte rien. | My love doesn't cost anything. | Reject |  | An odd line. |
| [#5316828](https://tatoeba.org/en/sentences/show/5316828) | Où se trouve l'amour ? | Where's the love? | Reject |  | An odd line. |
| [#8087551](https://tatoeba.org/en/sentences/show/8087551) | Je rêve du printemps chaque jour. | I dream of spring every day. | Use |  |  |
| [#8223664](https://tatoeba.org/en/sentences/show/8223664) | Aujourd'hui, je suis mon cœur. | Today, I follow my heart. | Reject |  | "Suis" here is follow, not am; a sense trap. |
| [#9129580](https://tatoeba.org/en/sentences/show/9129580) | L'amour connaît juste le numéro deux. | Love just knows the number two. | Reject |  | An odd line. |
| [#10684863](https://tatoeba.org/en/sentences/show/10684863) | C'est le grand amour ! | It's true love! | Reject |  | Idiom. |
| [#11321457](https://tatoeba.org/en/sentences/show/11321457) | L'amour est beau. | Love is beautiful. | Use |  |  |
| [#11595461](https://tatoeba.org/en/sentences/show/11595461) | Que mon amour est beau ! | How nice my love is! | Reject |  | Exclamative. |
| [#11604104](https://tatoeba.org/en/sentences/show/11604104) | Bonjour, mon amour. | Good morning, my love. | Use |  |  |
| [#11980669](https://tatoeba.org/en/sentences/show/11980669) | J'ai un rêve américain. | I have an American dream. | Reject |  | An odd line. |
| [#12035234](https://tatoeba.org/en/sentences/show/12035234) | Que d'amour ! | How much love! | Reject |  | Exclamative fragment. |
| [#12308723](https://tatoeba.org/en/sentences/show/12308723) | Je t'aime, mon amour. | I love you, my darling. | Use | I love you, my love. |  |
| [#12977752](https://tatoeba.org/en/sentences/show/12977752) | Je n'ai que ton amour. | I only have your love. | Reject |  | "Ne … que" is past A1. |
| [#12977762](https://tatoeba.org/en/sentences/show/12977762) | Je n'ai que votre amour. | I have only your love. | Reject |  | "Ne … que" is past A1. |
| [#13738484](https://tatoeba.org/en/sentences/show/13738484) | C'est de toi que je rêve. | It's you I dream of. | Reject |  | Cleft structure, past A1. |
| [#14051978](https://tatoeba.org/en/sentences/show/14051978) | L'amour c'est l'amour. | Love is love. | Reject |  | Missing comma, and a tautology. |

## Read and Answer texts

| ID | Text | Verdict | Fix | Reason |
| --- | --- | --- | --- | --- |
| R501 | Appartement (notice) | Keep |  | Natural ad French; "Trois pièces" counts the salon and two chambres, kitchen and bathroom aside, so the lines agree. Both answers unique. |
| R502 | Un message de Léa | Keep |  | Natural; both answers unique. |
| R503 | Un message de Paul | Fix | "La clé est sous la porte" does not work: a key cannot sit under a door, and a key slid under the door is inside. Write "La clé est chez la voisine." (voisine is known) and make the first choices "At the neighbour's / On the table / In the bag". | See fix. |
| R504 | Réunion (notice) | Keep |  | Natural; both answers unique. The English says director here and manager in S16169 for directeur; pick one. |
| R505 | Pour Sophie (message) | Keep |  | Natural; "n'est pas bien" is the everyday way to say not well; both answers unique. |
| R506 | Le bureau (notice) | Keep |  | Natural; both answers unique. |
| R507 | Lundi (timetable) | Keep |  | Clear; both answers unique. |
| R508 | L'examen (notice) | Keep |  | Natural; both answers unique. |
| R509 | Un message du prof | Keep |  | Natural teacher's note; both answers unique. |
| R510 | Un message de Tom | Keep |  | Natural; "Envoie-moi un message" is a message imperative, fine in a text; both answers unique. |
| R511 | Un mail (message) | Keep |  | Natural formal mail; both answers unique. |
| R512 | Pour Marc (message) | Keep |  | Natural; both answers unique. |
| R513 | Une carte de Nice | Keep |  | Natural postcard; both answers unique. |
| R514 | Merci ! (message) | Keep |  | Natural; both answers unique. |
| R515 | Au revoir (message) | Keep |  | Natural; both answers unique. |

## Mock DELF A1: the Part 5 task items

The final check (finalcheck.js FORMATS.fr) draws its listening, form and writing tasks from every part's a1_* tables; these are the Part 5 rows. Each was read for natural French, a clear task and one fitting answer.

| ID | Kind | Item | Verdict | Reason |
| --- | --- | --- | --- | --- |
| N501 | number | Ma grand-mère a soixante-dix-huit ans. → 78 | Keep | Natural; one answer. |
| N502 | number | Nous sommes cinq dans la famille. → 5 | Keep | Natural; one answer. |
| N503 | number | L'appartement a quatre pièces. → 4 | Keep | Natural; one answer. |
| N504 | phone | Mon numéro, c'est le zéro un, quarante-deux, trente, dix-huit, seize. → 01 42 30 18 16 | Keep | Natural; read in pairs as French does; one answer. |
| N505 | time | La réunion est à neuf heures et demie. → 9:30 | Keep | Natural; one answer. |
| N506 | date | La réunion, c'est le douze mars. → 12/3 | Keep | Natural; matches the Part 2 date format (5/3). |
| N507 | time | L'examen commence à quatorze heures. → 14:00 | Keep | Natural; one answer. |
| N508 | number | Faites l'exercice numéro sept. → 7 | Keep | Natural classroom line; one answer. |
| F501 | form | Julie Bernard, née le trois avril à Lyon, française, journaliste | Keep | Natural; every field has one answer; the date accepts 3/4 and "le 3 avril" too, good. |
| F502 | form | Marc Petit, 34, marié, deux enfants, directeur | Keep | Natural; "Situation de famille" is the real form label; one answer per field. |
| P501 | prompt | Family message, 25 to 40 words | Keep | Clear three-point task at DELF A1 length. |
| P502 | prompt | E-mail to a colleague: can't come, why, another day | Keep | Clear; matches DELF exercise 2. |
| P503 | prompt | Thank a friend for a party | Keep | Clear. |
