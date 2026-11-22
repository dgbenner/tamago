# Tamago Brazilian Portuguese check, A1 Part 1, 2026-11-14

Quality pass on Brazilian Portuguese A1 Part 1, change no code. Three sets: the Tatoeba candidates kept out only by the trust rule (218 distinct sentences in `_review/portuguese-part1-candidates.md`), each marked **Use** or **Reject**, with European phrasing rejected; the 172 drafted sentences in `_review/portuguese-part1-drafts.md`, each marked **Keep**, **Fix** or **Cut**, with a swap named where a Use candidate teaches the same word; and the 36 European-to-Brazilian swaps in `content-pt/a1-list.json`. Meanings, genders and verb forms were checked against the course's Wiktionary data in content-pt/checks (words.json, conjugations.json), not memory. The candidates file carries the same marks in place. This is a reviewer's read, not a native speaker's.

## Counts

- Candidates: **Use 184** · **Reject 34** (31 of the Use marks name the English to show).
- Drafts: **Keep 172** · **Fix 0** · **Cut 0**; 11 drafts have a swap named (4 are word for word on Tatoeba).
- A1 list swaps: **26 right as written** · **10 right with a note** (two are spelling fixes rather than regional swaps; one, campismo, only half fits).
- Every draft reads as Brazilian: você throughout, ônibus, tem for there is, estou com fome / sede / dor, estou procurando, gosto de. Nothing in the drafts needed a fix.
- Reject reasons, most common first: idioms (Sei lá, Quem sabe, bom gosto, Isso é com você); como as "like" where the learner knows "how"; odd or insulting lines; two European forms ("Tenho sede", "Tem de falar"); a wrong line ("O que é seu nome?"); an English mismatch (grande as tall); two-sentence and seven-word lines; one imperative idiom.
- Accepted answers to widen: S3117 (obrigada), S3111 (Desculpa), S31106 (Repete).
- Glossary senses to re-pick in word-senses.json (the course's Wiktionary pick is a wrong or narrow sense): homem "male", chá "tea plant", cachorro "puppy", pássaro "passerine", carro "cart", cansado "sleepy", estação "season" (the circle means the station), trem "set", jogo "play", alto "loud", baixo "low", legal "legal" (Brazilian legal is cool, nice), seu (lemma "him"), dia (lemma "a"), médico ("consulting room" mixed in).
- The Tatoeba sentences already in the course were not checked here; they carry a source_id and were checked at import.


## U01 · Say Hi

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S1101 | Oi, Maria. | Hi, Maria. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S1102 | Oi! Você é Tom? | Hi! Are you Tom? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S1103 | Olá, Maria. | Hello, Maria. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S1104 | Olá! Eu sou Ana. | Hello! I'm Ana. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S1105 | Tchau, Tom. | Bye, Tom. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S1106 | Tchau, Maria. | Bye, Maria. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S1107 | Tchau, Ana! | Bye, Ana! | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S1108 | Sim, sou eu. | Yes, it's me. (reply) | Keep |  | Correct; "Sim, sou eu" is how a Brazilian answers. |
| S1109 | Sim, eu sou Tom. | Yes, I'm Tom. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S1110 | Não, eu não sou Tom. | No, I'm not Tom. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#2442429](https://tatoeba.org/en/sentences/show/2442429) | Tom é um homem. | Tom is a man. | Use |  |  |

## U31 · Getting Help

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S31101 | Pode repetir, por favor? | Can you repeat that, please? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S31102 | Pode repetir? | Can you repeat that? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S31103 | Você pode falar mais devagar? | Can you speak more slowly? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S31104 | Pode falar mais devagar, por favor? | Can you speak more slowly, please? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S31105 | Pode falar devagar, por favor? | Can you speak slowly, please? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S31106 | Não entendi. Repita, por favor. | I didn't understand. Repeat, please. | Keep |  | Correct; Repita is the polite imperative, as the table has it; "Repete" is the everyday informal one, worth accepting. |
| S31107 | Não entendi. Pode repetir? | I didn't understand. Can you repeat that? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#340434](https://tatoeba.org/en/sentences/show/340434) | Eu não entendo. | I don't get it. | Use | I don't understand. |  |
| [#656769](https://tatoeba.org/en/sentences/show/656769) | De novo não! | Not again! | Reject |  | Exclamation idiom ("Not again!"). |
| [#13199690](https://tatoeba.org/en/sentences/show/13199690) | Sim, entendo! | Yes, I understand! | Use |  |  |

## U02 · People + Things

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S2101 | Essa casa é grande. | That house is big. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S2102 | Essa casa é pequena. | That house is small. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S2103 | Essa é a professora. | This is the teacher. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S2104 | Sim, ele é professor. | Yes, he's a teacher. (reply) | Keep |  | Correct; no article before a profession, the Brazilian norm. |
| S2105 | Não, ele é médico. | No, he's a doctor. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S2106 | Não, ele é professor. | No, he's a teacher. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S2107 | Sim, é ele. | Yes, it's him. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#1108747](https://tatoeba.org/en/sentences/show/1108747) | Sou professor. | I am a teacher. | Use |  |  |
| [#1117474](https://tatoeba.org/en/sentences/show/1117474) | Ela é forte. | She is strong. | Use |  |  |
| [#2332089](https://tatoeba.org/en/sentences/show/2332089) | Eu não sou um professor. | I'm not a teacher. | Use |  |  |

## U03 · Polite Phrases

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S3101 | Esse livro, por favor. | That book, please. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S3102 | De nada, Maria. | You're welcome, Maria. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S3103 | De nada, Tom. | You're welcome, Tom. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S3104 | Boa tarde, Tom. | Good afternoon, Tom. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S3105 | Boa tarde! Tudo bem? | Good afternoon! How are you? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S3106 | Até logo, Tom. | See you later, Tom. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S3107 | Tchau! Até logo! | Bye! See you later! | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S3108 | Com licença, você é o professor? | Excuse me, are you the teacher? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S3109 | Com licença, professora. | Excuse me, teacher. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S3111 | Desculpe, Tom. | Sorry, Tom. | Keep |  | Correct; "Desculpa" is the informal Brazilian form, worth accepting too. |
| S3112 | Desculpe, você é o Tom? | Excuse me, are you Tom? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S3113 | Estou mal. | I'm not doing well. | Keep | Swap: #1388535, the same sentence; show "I'm not doing well." | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S3114 | Não estou mal. | I'm not bad. (reply) | Keep |  | Correct as a reply to "Você está mal?"; an odd line on its own. |
| S3115 | Você está mal? | Are you unwell? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S3117 | Tudo bem, obrigado. | I'm fine, thank you. (reply) | Keep |  | Correct; a woman says "obrigada", accept both. |
| S3118 | Tudo bem, e você? | I'm fine, and you? (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#1388535](https://tatoeba.org/en/sentences/show/1388535) | Estou mal. | I feel sick. | Use | I'm not doing well. |  |
| [#340433](https://tatoeba.org/en/sentences/show/340433) | Obrigado, isso é tudo. | Thanks, that's all. | Use |  |  |
| [#340454](https://tatoeba.org/en/sentences/show/340454) | Bom dia, como vai? | Good day, how are you? | Use |  |  |
| [#1158849](https://tatoeba.org/en/sentences/show/1158849) | Ela não está aqui. | She's not here. | Use |  |  |
| [#2190163](https://tatoeba.org/en/sentences/show/2190163) | Como é esse professor? | How is this teacher? | Use | What is this teacher like? |  |
| [#2292400](https://tatoeba.org/en/sentences/show/2292400) | Não, é tudo. | No, that's all. | Use | No, that's all. |  |
| [#4076904](https://tatoeba.org/en/sentences/show/4076904) | Você não é como eu. | You're not like me. | Reject |  | como as "like", a homograph with the "how" the learner knows. |
| [#10357565](https://tatoeba.org/en/sentences/show/10357565) | Como ele está? | How's he doing? | Use |  |  |
| [#10357570](https://tatoeba.org/en/sentences/show/10357570) | O homem está aqui. | The man is here. | Use |  |  |

## U04 · Food + Drink

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S4101 | Ele come pão e queijo. | He eats bread and cheese. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S4102 | Sim, eu gosto de suco. | Yes, I like juice. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S4103 | Não, eu não gosto de suco. | No, I don't like juice. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S4104 | Não, eu não bebo café. | No, I don't drink coffee. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S4105 | Sim, eu gosto de chá. | Yes, I like tea. (reply) | Keep | Swap: #7223085 "Gosto de chá." if the Sim is not needed. | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#7223085](https://tatoeba.org/en/sentences/show/7223085) | Gosto de chá. | I like tea. | Use |  |  |
| [#767894](https://tatoeba.org/en/sentences/show/767894) | O menino come pão. | The boy eats bread. | Use |  |  |
| [#2378284](https://tatoeba.org/en/sentences/show/2378284) | Como uma maçã. | I am eating an apple. | Use |  |  |
| [#3674792](https://tatoeba.org/en/sentences/show/3674792) | Você bebe o chá? | Do you drink tea? | Use | Do you drink the tea? |  |
| [#3741519](https://tatoeba.org/en/sentences/show/3741519) | Ela não bebe café. | She doesn't drink coffee. | Use |  |  |
| [#4870691](https://tatoeba.org/en/sentences/show/4870691) | Ele bebe água. | He drinks water. | Use |  |  |
| [#6681574](https://tatoeba.org/en/sentences/show/6681574) | Sou de Londres. | I am from London. | Use |  |  |

## U05 · Animals

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S5101 | O rato é um animal pequeno. | The mouse is a small animal. | Keep |  | Correct; rato covers mouse and rat in Brazil (camundongo is the small mouse), the English "mouse" is fine. |
| S5102 | O gato é um animal. | The cat is an animal. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S5103 | Sim, eu tenho um cachorro. | Yes, I have a dog. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S5104 | Não, eu tenho um gato. | No, I have a cat. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S5105 | Sim, tenho um gato. | Yes, I have a cat. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S5106 | Sim, eu como peixe. | Yes, I eat fish. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S5107 | Sim, eu gosto de peixe. | Yes, I like fish. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S5108 | Sim, tem leite. | Yes, there's milk. (reply) | Keep |  | Correct Brazilian "tem" for there is. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#13967005](https://tatoeba.org/en/sentences/show/13967005) | Tenho um cachorro pequeno. | I have a small dog. | Use |  |  |
| [#4697846](https://tatoeba.org/en/sentences/show/4697846) | Ela não gosta de peixe. | She doesn't like fish. | Use |  |  |
| [#475652](https://tatoeba.org/en/sentences/show/475652) | Não é um gato. É um cachorro. | That's not a cat. That's a dog. | Use |  |  |
| [#773393](https://tatoeba.org/en/sentences/show/773393) | Tenho uma casa. | I have a house. | Use |  |  |
| [#949946](https://tatoeba.org/en/sentences/show/949946) | Eu tenho uma casa grande. | I have a big house. | Use |  |  |
| [#1834546](https://tatoeba.org/en/sentences/show/1834546) | Ele é um animal. | He's an animal. | Reject |  | An insult. |
| [#2363005](https://tatoeba.org/en/sentences/show/2363005) | Como o cachorro está? | How's the dog? | Use |  |  |
| [#10349938](https://tatoeba.org/en/sentences/show/10349938) | Eu sou um pássaro. | I'm a bird! | Reject |  | Odd line. |

## U32 · Conversation Help

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S32101 | Como se diz isso em português? | How do you say that in Portuguese? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S32102 | Como se diz isso em inglês? | How do you say that in English? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S32103 | Como se diz essa palavra em português? | How do you say this word in Portuguese? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S32104 | O que significa isso? | What does that mean? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S32105 | O que isso quer dizer? | What does that mean? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S32106 | Sim, eu entendo português. | Yes, I understand Portuguese. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S32107 | Não, eu não entendo português. | No, I don't understand Portuguese. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#1033691](https://tatoeba.org/en/sentences/show/1033691) | Ele é inglês. | He is English. | Reject |  | inglês as the nationality where the circle teaches the language. |
| [#1207165](https://tatoeba.org/en/sentences/show/1207165) | Ele é um homem de palavra. | He's a man of his word. | Reject |  | Idiom (a man of his word). |
| [#2557517](https://tatoeba.org/en/sentences/show/2557517) | Ela quer mais. | She wants more. | Use |  |  |
| [#3322614](https://tatoeba.org/en/sentences/show/3322614) | Não quer mais café? | Won't you have some more coffee? | Use | Don't you want more coffee? |  |
| [#11776871](https://tatoeba.org/en/sentences/show/11776871) | Ele não quer mais chá? | Does he want some more tea? | Use | Doesn't he want more tea? |  |

## U06 · Plurals

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S6101 | Os livros são grandes. | The books are big. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S6102 | Os livros são bons. | The books are good. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S6103 | Os cachorros são grandes. | The dogs are big. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S6104 | As crianças têm livros. | The children have books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S6105 | As mulheres têm muitos amigos. | The women have a lot of friends. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S6106 | Sim, eles são bons amigos. | Yes, they're good friends. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S6107 | Sim, eu tenho maçãs. | Yes, I have apples. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#2700625](https://tatoeba.org/en/sentences/show/2700625) | Não gosto de maçãs. | I don't like apples. | Use |  |  |
| [#518345](https://tatoeba.org/en/sentences/show/518345) | Ele não gosta de nós. | He doesn't like us. | Use |  |  |
| [#562405](https://tatoeba.org/en/sentences/show/562405) | Temos um gato e um cachorro. | We have a cat and a dog. | Use |  |  |
| [#1179341](https://tatoeba.org/en/sentences/show/1179341) | Eu não gosto de cachorros. | I don't like dogs. | Use |  |  |
| [#3074514](https://tatoeba.org/en/sentences/show/3074514) | Vocês são bons. | You guys are good. | Use | You are good. |  |
| [#3696832](https://tatoeba.org/en/sentences/show/3696832) | Não temos chá. | We don't have tea. | Use |  |  |
| [#3813293](https://tatoeba.org/en/sentences/show/3813293) | Nós temos uma casa pequena. | We have a small house. | Use |  |  |
| [#4869764](https://tatoeba.org/en/sentences/show/4869764) | Ela gosta de gatos. | She loves cats. | Use | She likes cats. |  |

## U07 · Describing Things

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S7101 | O carro é velho. | The car is old. | Keep | Swap: #5537599 "Tenho um carro velho." teaches carro and velho the same way. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S7102 | Sim, é novo. | Yes, it's new. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S7103 | Não, é muito velho. | No, it's very old. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S7104 | Sim, é muito bom. | Yes, it's very good. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S7105 | Sim, sou novo aqui. | Yes, I'm new here. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S7106 | Sim, ele é jovem. | Yes, he's young. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#5537599](https://tatoeba.org/en/sentences/show/5537599) | Tenho um carro velho. | I have an old car. | Use |  |  |
| [#8374179](https://tatoeba.org/en/sentences/show/8374179) | Tenho um carro novo. | I have a new car. | Use |  |  |
| [#3426829](https://tatoeba.org/en/sentences/show/3426829) | Esse é um carro novo? | Is that a new car? | Use |  |  |
| [#5836710](https://tatoeba.org/en/sentences/show/5836710) | Não sou mais jovem. | I am not at all young anymore. | Use | I'm not young anymore. |  |
| [#341005](https://tatoeba.org/en/sentences/show/341005) | Essa água tem gosto bom. | This water tastes good. | Reject |  | gosto as the noun "taste", a trap with "I like". |
| [#1178914](https://tatoeba.org/en/sentences/show/1178914) | Ela é velha. | She is old. | Use |  |  |
| [#1178920](https://tatoeba.org/en/sentences/show/1178920) | Tom come muito peixe. | Tom eats a lot of fish. | Use |  |  |
| [#1307570](https://tatoeba.org/en/sentences/show/1307570) | Eu sou um homem velho. | I'm an old man. | Use |  |  |
| [#1334795](https://tatoeba.org/en/sentences/show/1334795) | Gosto muito de você! | I like you very much! | Use |  |  |
| [#1456068](https://tatoeba.org/en/sentences/show/1456068) | Tom não tem carro. | Tom doesn't have a car. | Use |  |  |
| [#1484141](https://tatoeba.org/en/sentences/show/1484141) | Você é muito bonita. | You are very beautiful. | Use |  |  |
| [#1503096](https://tatoeba.org/en/sentences/show/1503096) | Não muito bem. | Not too well. | Use |  |  |
| [#3752397](https://tatoeba.org/en/sentences/show/3752397) | O Tom vai também? | Is Tom going, too? | Use | Is Tom going too? |  |
| [#4049682](https://tatoeba.org/en/sentences/show/4049682) | Gosto muito de você, Tom. | I like you a lot, Tom. | Use |  |  |
| [#4313700](https://tatoeba.org/en/sentences/show/4313700) | Também gosto de maçãs. | I too like apples. | Use | I like apples too. |  |
| [#8597717](https://tatoeba.org/en/sentences/show/8597717) | Você tem bom gosto. | You have good taste. | Reject |  | Idiom (good taste). |
| [#13142249](https://tatoeba.org/en/sentences/show/13142249) | Isso é bom! | That's fine! | Use | That's good! |  |
| [#13931336](https://tatoeba.org/en/sentences/show/13931336) | O carro é pequeno. | The car is small. | Use |  |  |

## U52 · Free Time

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S52101 | Eu gosto de festa. | I like parties. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S52102 | A festa é aqui. | The party is here. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S52103 | Sim, eu gosto de cantar. | Yes, I like singing. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S52104 | Sim, eu gosto de música. | Yes, I like music. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S52105 | Não, eu não gosto de dançar. | No, I don't like dancing. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#3752545](https://tatoeba.org/en/sentences/show/3752545) | É uma grande festa. | It's a great party. | Use | It's a big party. |  |
| [#3292475](https://tatoeba.org/en/sentences/show/3292475) | Ele gosta muito de música. | He likes music very much. | Use |  |  |
| [#867476](https://tatoeba.org/en/sentences/show/867476) | Ele gosta de música. Eu também gosto. | He likes the music. I like it, too. | Reject |  | Two sentences. |
| [#383804](https://tatoeba.org/en/sentences/show/383804) | Você quer dançar? | Would you like to dance? | Use |  |  |
| [#1576746](https://tatoeba.org/en/sentences/show/1576746) | Ela gosta de ler livros. | She likes to read books. | Use |  |  |
| [#1576748](https://tatoeba.org/en/sentences/show/1576748) | Ela gosta de ler. | She likes to read. | Use |  |  |
| [#4010507](https://tatoeba.org/en/sentences/show/4010507) | O professor lê o livro. | The teacher reads the book. | Use |  |  |
| [#13421024](https://tatoeba.org/en/sentences/show/13421024) | Ela lê. | She reads. | Use |  |  |

## U08 · Where Things Are

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S8101 | O gato está na cama. | The cat is on the bed. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S8102 | O livro está na mesa. | The book is on the table. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S8103 | Não, ele está na cozinha. | No, he's in the kitchen. (reply) | Keep | Swap: #1487848 "Ele está na cozinha." if the Não is not needed. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S8104 | Sim, ele está no banheiro. | Yes, he's in the bathroom. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S8105 | Não, eles estão no jardim. | No, they're in the garden. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S8106 | Sim, estamos em casa. | Yes, we're at home. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S8107 | Sim, estou em casa. | Yes, I'm at home. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#14026264](https://tatoeba.org/en/sentences/show/14026264) | As maçãs não estão na mesa. | The apples are not on the table. | Use |  |  |
| [#1487848](https://tatoeba.org/en/sentences/show/1487848) | Ele está na cozinha. | He's in the kitchen. | Use |  |  |
| [#1576713](https://tatoeba.org/en/sentences/show/1576713) | A casa tem jardim? | Has the house got a garden? | Use | Does the house have a garden? |  |
| [#1831869](https://tatoeba.org/en/sentences/show/1831869) | O jardim é bonito. | The garden is beautiful. | Use |  |  |
| [#3253673](https://tatoeba.org/en/sentences/show/3253673) | Eles estão aqui. | They are here. | Use |  |  |
| [#8490166](https://tatoeba.org/en/sentences/show/8490166) | Nós estamos no Brasil. | We are in Brazil. | Use |  |  |

## U09 · How You Feel

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S9101 | Sim, estou cansado. | Yes, I'm tired. (reply) | Keep | Swap: #347631 "Eu estou cansado." if the Sim is not needed. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S9102 | Não, eu não estou cansado. | No, I'm not tired. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S9103 | Sim, estou cansada. | Yes, I'm tired. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S9104 | Sim, estou com fome. | Yes, I'm hungry. (reply) | Keep |  | Correct Brazilian "estou com fome". |
| S9105 | Não, eu não estou com sono. | No, I'm not sleepy. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S9106 | Sim, estou feliz. | Yes, I'm happy. (reply) | Keep | Swap: #972209 "Eu estou feliz." if the Sim is not needed. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S9107 | Sim, ele está doente. | Yes, he's sick. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#347631](https://tatoeba.org/en/sentences/show/347631) | Eu estou cansado. | I'm tired. | Use |  |  |
| [#341143](https://tatoeba.org/en/sentences/show/341143) | Você não está cansado? | Are you not tired? | Use |  |  |
| [#519027](https://tatoeba.org/en/sentences/show/519027) | Estou cansado de dançar. | I'm tired of dancing. | Use |  |  |
| [#2804139](https://tatoeba.org/en/sentences/show/2804139) | Eu não estou mais com fome. | I'm not hungry anymore. | Use |  |  |
| [#972208](https://tatoeba.org/en/sentences/show/972208) | Eu sou feliz. | I am happy. | Use |  |  |
| [#6814198](https://tatoeba.org/en/sentences/show/6814198) | Não sou feliz. | I'm not happy. | Use |  |  |
| [#972209](https://tatoeba.org/en/sentences/show/972209) | Eu estou feliz. | I am happy. | Use |  |  |
| [#341096](https://tatoeba.org/en/sentences/show/341096) | Isso é com você. | This is on you. | Reject |  | Idiom. |
| [#341138](https://tatoeba.org/en/sentences/show/341138) | Está frio. | It's cold. | Use |  |  |
| [#530830](https://tatoeba.org/en/sentences/show/530830) | Ela tem medo de gatos. | She is afraid of cats. | Use |  |  |
| [#773101](https://tatoeba.org/en/sentences/show/773101) | Você está com sede? | Are you thirsty? | Use |  |  |
| [#1158882](https://tatoeba.org/en/sentences/show/1158882) | Estamos com calor. | We're hot. | Use |  |  |
| [#1485276](https://tatoeba.org/en/sentences/show/1485276) | Você está com medo? | Are you afraid? | Use |  |  |
| [#1546048](https://tatoeba.org/en/sentences/show/1546048) | Tenho sede. | I am thirsty. | Reject |  | "Tenho sede" is the European form; Brazil says "Estou com sede". |
| [#1775788](https://tatoeba.org/en/sentences/show/1775788) | Está com medo? | Are you afraid? | Use |  |  |
| [#2116768](https://tatoeba.org/en/sentences/show/2116768) | Não tenho medo de Tom. | I'm not afraid of Tom. | Use |  |  |
| [#2763379](https://tatoeba.org/en/sentences/show/2763379) | Você tem medo. | You're afraid. | Use |  |  |
| [#3255809](https://tatoeba.org/en/sentences/show/3255809) | Ele tem medo. | He is afraid. | Use |  |  |
| [#3513068](https://tatoeba.org/en/sentences/show/3513068) | Está tudo bem com vocês? | Are you doing OK? | Use |  |  |
| [#3664464](https://tatoeba.org/en/sentences/show/3664464) | O frio é muito bom. | Cold weather is really good. | Reject |  | Odd line. |
| [#10774555](https://tatoeba.org/en/sentences/show/10774555) | Tem de falar com eles. | You have to talk to them. | Reject |  | "Tem de" is European (Brazil says "tem que"), and the subject is missing. |
| [#13931165](https://tatoeba.org/en/sentences/show/13931165) | Ela está com ela. | She is with her. | Reject |  | Odd line. |

## U33 · Finding the Word

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S33101 | Estou procurando a palavra. | I'm looking for the word. (reply) | Keep |  | Correct Brazilian gerund ("estou procurando"). |
| S33102 | Estou procurando uma palavra em português. | I'm looking for a word in Portuguese. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S33103 | É uma coisa para ler. | It's a thing for reading. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S33104 | É uma coisa para nadar. | It's a thing for swimming. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S33105 | Serve para ler. | It's for reading. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S33106 | Isso serve para ler. | This is for reading. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S33107 | Isso serve para nadar. | This is for swimming. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S33108 | Como se chama essa coisa? | What is this thing called? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S33109 | Não sei o nome. | I don't know the name. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S33110 | Não sei como se diz. | I don't know how to say it. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S33111 | Eu sei! | I know! (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S33112 | Sim, eu sei nadar. | Yes, I can swim. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#10894775](https://tatoeba.org/en/sentences/show/10894775) | Sei lá. | I don't know. | Reject |  | Idiom. |
| [#2993652](https://tatoeba.org/en/sentences/show/2993652) | Eu não sei dançar. | I can't dance. | Use |  |  |
| [#1130898](https://tatoeba.org/en/sentences/show/1130898) | Como se chama? | What is your name? | Use | What's your name? |  |
| [#1485093](https://tatoeba.org/en/sentences/show/1485093) | Sabe nadar? | Can you swim? | Use | Can you swim? |  |
| [#3319704](https://tatoeba.org/en/sentences/show/3319704) | A mulher chama o homem. | The woman calls the man. | Use |  |  |
| [#3752323](https://tatoeba.org/en/sentences/show/3752323) | Você não sabe? | Don't you know? | Use |  |  |
| [#3752332](https://tatoeba.org/en/sentences/show/3752332) | Você sabe isso? | Do you know that? | Use |  |  |
| [#13930508](https://tatoeba.org/en/sentences/show/13930508) | Tom é um nome. | Tom is a name. | Reject |  | Odd meta line. |

## U10 · Mine + Yours

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S10101 | As maçãs são minhas. | The apples are mine. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S10102 | A mãe dela é professora. | Her mother is a teacher. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S10103 | Meu pai é médico. | My father is a doctor. | Keep | Swap: #517432, the same sentence. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S10106 | Esse é o carro dele. | That's his car. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S10107 | Sim, ela é minha mãe. | Yes, she's my mother. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S10108 | Não, ela é minha amiga. | No, she's my friend. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S10109 | Ele está bem, obrigado. | He's fine, thank you. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S10110 | Sim, meu pai é médico. | Yes, my father is a doctor. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S10111 | Sim, ele é meu amigo. | Yes, he's my friend. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S10112 | Não, ela não está em casa. | No, she isn't at home. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#517432](https://tatoeba.org/en/sentences/show/517432) | Meu pai é médico. | My father's a doctor. | Use |  |  |
| [#517350](https://tatoeba.org/en/sentences/show/517350) | Ele é meu pai. | He is my father. | Use |  |  |
| [#517435](https://tatoeba.org/en/sentences/show/517435) | Meu pai é grande. | My father is tall. | Reject |  | grande is big, not tall; the English says tall. |
| [#1491115](https://tatoeba.org/en/sentences/show/1491115) | Não sei o nome dele. | I don't know his name. | Use |  |  |
| [#1491116](https://tatoeba.org/en/sentences/show/1491116) | Eu não sei o nome dele. | I don't know his name. | Use |  |  |
| [#1645753](https://tatoeba.org/en/sentences/show/1645753) | O inglês dele é muito bom. | His English is quite good. | Use |  |  |
| [#4291021](https://tatoeba.org/en/sentences/show/4291021) | Sou como meu pai. | I am like my father. | Reject |  | como as "like", a homograph trap. |
| [#3875274](https://tatoeba.org/en/sentences/show/3875274) | Estou procurando um amigo meu. | I'm looking for a friend of mine. | Use |  |  |
| [#475660](https://tatoeba.org/en/sentences/show/475660) | Gosto muito dela. | I like her very much. | Use |  |  |
| [#517461](https://tatoeba.org/en/sentences/show/517461) | Meu pai tem muitos livros. | My father has many books. | Use |  |  |
| [#558638](https://tatoeba.org/en/sentences/show/558638) | O cachorro é meu. | The dog is mine. | Use |  |  |
| [#824263](https://tatoeba.org/en/sentences/show/824263) | Meu pai não gosta de futebol. | My father doesn't like soccer. | Use |  |  |
| [#1062510](https://tatoeba.org/en/sentences/show/1062510) | Ele é amigo dela. | He's her friend. | Use |  |  |
| [#1064633](https://tatoeba.org/en/sentences/show/1064633) | O cachorro é seu. | The dog is yours. | Use |  |  |
| [#1249003](https://tatoeba.org/en/sentences/show/1249003) | Você é amigo dela? | Are you her friend? | Use |  |  |
| [#1837783](https://tatoeba.org/en/sentences/show/1837783) | Seu cachorro está lá. | Your dog is over there. | Use |  |  |
| [#2440857](https://tatoeba.org/en/sentences/show/2440857) | Ele é um amigo de um amigo. | He's a friend of a friend. | Use |  |  |
| [#2440859](https://tatoeba.org/en/sentences/show/2440859) | Ele é um amigo de uma amiga. | He's a friend of a friend. | Use |  |  |
| [#3741542](https://tatoeba.org/en/sentences/show/3741542) | Isso é seu, Tom? | Is this yours, Tom? | Use |  |  |
| [#13682124](https://tatoeba.org/en/sentences/show/13682124) | O carro dela está lá. | Her car is there. | Use |  |  |

## U11 · Asking Questions

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S11101 | Que livro é esse? | What book is that? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S11102 | Que animal é esse? | What animal is that? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S11104 | Porque estou cansado. | Because I'm tired. (reply) | Keep |  | Correct; porque (one word) for because, as the table has it. |
| S11105 | Eu sou o Tom. | I'm Tom. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S11106 | Estou na cozinha. | I'm in the kitchen. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S11107 | Eles estão no jardim. | They're in the garden. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S11108 | Tenho um livro. | I have a book. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#883051](https://tatoeba.org/en/sentences/show/883051) | Sei que não sei. | I know that I do not know. | Reject |  | Socratic line; que as a conjunction. |
| [#3654162](https://tatoeba.org/en/sentences/show/3654162) | Onde é que estou? | Where am I? | Use |  |  |
| [#13809799](https://tatoeba.org/en/sentences/show/13809799) | Você tem que ler? | Do you have to read? | Use |  |  |
| [#3752512](https://tatoeba.org/en/sentences/show/3752512) | Porque Tom está cansado? | Why is Tom tired? | Reject |  | The question word is "por que", two words, in Brazilian spelling; one-word porque is "because". |
| [#3752507](https://tatoeba.org/en/sentences/show/3752507) | Porque você está cansado? | Why are you tired? | Reject |  | Same: "Por que você está cansado?" in Brazilian spelling. |
| [#3752510](https://tatoeba.org/en/sentences/show/3752510) | Porque você está cansada? | Why are you tired? | Reject |  | Same: "Por que você está cansada?" in Brazilian spelling. |
| [#341013](https://tatoeba.org/en/sentences/show/341013) | Onde está o livro? | Where is the book? | Use |  |  |
| [#697449](https://tatoeba.org/en/sentences/show/697449) | Onde você vai? | Where are you heading? | Use | Where are you going? |  |
| [#784903](https://tatoeba.org/en/sentences/show/784903) | O que isso significa? | What does this mean? | Use |  |  |
| [#883050](https://tatoeba.org/en/sentences/show/883050) | Eu sei que eu não sei. | I know that I do not know. | Reject |  | Socratic line. |
| [#955623](https://tatoeba.org/en/sentences/show/955623) | Quem sabe? | Who knows? | Reject |  | Idiom (maybe). |
| [#1002391](https://tatoeba.org/en/sentences/show/1002391) | O que é isso? | What's this stuff? | Use | What is this? |  |
| [#1130899](https://tatoeba.org/en/sentences/show/1130899) | O que é seu nome? | What's your name? | Reject |  | Wrong: "Qual é o seu nome?", not "O que é". |
| [#1130900](https://tatoeba.org/en/sentences/show/1130900) | Qual é seu nome? | What is your name? | Use |  |  |
| [#1193321](https://tatoeba.org/en/sentences/show/1193321) | Quem está doente? | Who is sick? | Use |  |  |
| [#1207086](https://tatoeba.org/en/sentences/show/1207086) | O que significa? | What does that mean? | Use | What does it mean? |  |
| [#1485013](https://tatoeba.org/en/sentences/show/1485013) | Onde está ele? | Where is he? | Use |  |  |
| [#2178599](https://tatoeba.org/en/sentences/show/2178599) | Por que eu estou aqui? | Why am I here? | Use |  |  |
| [#2440816](https://tatoeba.org/en/sentences/show/2440816) | Ela sabe o que quer. | She knows what she wants. | Use |  |  |
| [#2440817](https://tatoeba.org/en/sentences/show/2440817) | Ele sabe o que quer. | He knows what he wants. | Use |  |  |
| [#2763330](https://tatoeba.org/en/sentences/show/2763330) | Essa mulher é mais velha que eu. | That woman is much older than I am. | Use | That woman is older than me. |  |
| [#2874454](https://tatoeba.org/en/sentences/show/2874454) | Eu não sei onde ela está. | I don't know where it is. | Use | I don't know where she is. |  |
| [#3030067](https://tatoeba.org/en/sentences/show/3030067) | Você é mais novo que ele? | Are you younger than him? | Use |  |  |
| [#3258873](https://tatoeba.org/en/sentences/show/3258873) | Você é amigo de quem? | Whose friend are you? | Use |  |  |
| [#3527017](https://tatoeba.org/en/sentences/show/3527017) | O que você quer falar? | What do you want to say? | Use | What do you want to say? |  |
| [#3597128](https://tatoeba.org/en/sentences/show/3597128) | Quem são eles? | Who are they? | Use |  |  |
| [#3741574](https://tatoeba.org/en/sentences/show/3741574) | Por que você não está com fome? | Why aren't you hungry? | Use |  |  |
| [#3752311](https://tatoeba.org/en/sentences/show/3752311) | O que isso diz? | What does it say? | Use |  |  |
| [#3849734](https://tatoeba.org/en/sentences/show/3849734) | Tom diz que está cansado. | Tom says he's tired. | Use |  |  |
| [#4139427](https://tatoeba.org/en/sentences/show/4139427) | O Tom não sabe onde está. | Tom doesn't know where he is. | Use |  |  |
| [#4543606](https://tatoeba.org/en/sentences/show/4543606) | Você sabe o que significa isso? | Do you know what it means? | Use |  |  |

## U53 · Around Town

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S53101 | O museu fica perto. | The museum is nearby. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S53102 | O museu fica longe? | Is the museum far? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S53103 | Fica perto. | It's nearby. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S53104 | Fica longe. | It's far. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S53105 | Não, é perto. | No, it's close. (reply) | Keep |  | Correct; "fica perto" is the more idiomatic reply, "é perto" is heard. |
| S53106 | Sim, é muito longe. | Yes, it's very far. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S53107 | Sim, eu tenho uma bicicleta. | Yes, I have a bike. (reply) | Keep | Swap: #502277 "Eu tenho uma bicicleta." if the Sim is not needed. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S53108 | Sim, tem um hospital perto. | Yes, there's a hospital nearby. (reply) | Keep |  | Correct Brazilian "tem" for there is. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#4931910](https://tatoeba.org/en/sentences/show/4931910) | Ele está mais perto. | He's closer. | Use |  |  |
| [#3883003](https://tatoeba.org/en/sentences/show/3883003) | É muito longe? | Is it far? | Use | Is it very far? |  |
| [#502277](https://tatoeba.org/en/sentences/show/502277) | Eu tenho uma bicicleta. | I have a bicycle. | Use |  |  |
| [#2178703](https://tatoeba.org/en/sentences/show/2178703) | Aqui estamos na estação. | Here we are at the station. | Reject |  | Odd phrasing. |
| [#3599121](https://tatoeba.org/en/sentences/show/3599121) | O Tom não está no hospital. | Tom's not in the hospital. | Use |  |  |
| [#10706693](https://tatoeba.org/en/sentences/show/10706693) | Eles estão no museu. | They are at the museum. | Use |  |  |

## U12 · Intro to Numbers

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S12101 | Tenho sete livros. | I have seven books. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S12102 | Tenho oito amigos. | I have eight friends. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S12103 | Tenho nove livros. | I have nine books. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S12104 | Ela tem nove anos. | She is nine years old. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S12105 | Tenho dez anos. | I'm ten years old. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S12107 | Tenho três maçãs. | I have three apples. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S12108 | Ele tem dois gatos. | He has two cats. (reply) | Keep | Swap: #534820, the same sentence; show "He has two cats." | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S12109 | Não, tenho oito anos. | No, I'm eight years old. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#3451195](https://tatoeba.org/en/sentences/show/3451195) | Três mais cinco são oito. | Three plus five equals eight. | Use |  |  |
| [#534820](https://tatoeba.org/en/sentences/show/534820) | Ele tem dois gatos. | He keeps two cats. | Use | He has two cats. |  |
| [#558666](https://tatoeba.org/en/sentences/show/558666) | Você tem quatro cachorros. | You have four dogs. | Use |  |  |
| [#1127365](https://tatoeba.org/en/sentences/show/1127365) | Temos duas crianças. | We have two children. | Use |  |  |

## U13 · Colors

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S13101 | A casa é branca. | The house is white. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S13102 | A cama é branca. | The bed is white. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S13103 | A mesa é preta. | The table is black. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S13104 | Minha bicicleta é preta. | My bike is black. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S13105 | A maçã é amarela. | The apple is yellow. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S13106 | A casa é amarela. | The house is yellow. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S13107 | Não, é verde. | No, it's green. (reply) | Keep | Swap: #8743870 "A maçã é verde." if the Não is not needed. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S13108 | Meu cachorro é preto. | My dog is black. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S13109 | Não, meu carro é branco. | No, my car is white. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S13110 | Sim, é branco. | Yes, it's white. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S13111 | Sim, eu gosto de vinho branco. | Yes, I like white wine. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#8743870](https://tatoeba.org/en/sentences/show/8743870) | A maçã é verde. | The apple is green. | Use |  |  |
| [#3143736](https://tatoeba.org/en/sentences/show/3143736) | Você gosta de chá verde? | Do you drink green tea? | Use | Do you like green tea? |  |
| [#11515782](https://tatoeba.org/en/sentences/show/11515782) | Qual cachorro é preto? | Which dog is black? | Use |  |  |
| [#4083532](https://tatoeba.org/en/sentences/show/4083532) | O Tom tem um cachorro preto. | Tom has a black dog. | Use |  |  |
| [#945722](https://tatoeba.org/en/sentences/show/945722) | O cachorro é branco. | The dog is white. | Use |  |  |
| [#2781160](https://tatoeba.org/en/sentences/show/2781160) | Eu tenho um gato branco. | I have a white cat. | Use |  |  |
| [#2924690](https://tatoeba.org/en/sentences/show/2924690) | Eu tenho um cavalo branco. | I've got a white horse. | Use |  |  |
| [#1177982](https://tatoeba.org/en/sentences/show/1177982) | O cachorro é vermelho. | The dog is red. | Reject |  | Odd line. |
| [#10740775](https://tatoeba.org/en/sentences/show/10740775) | Ele tem um carro azul. | He has a blue car. | Use |  |  |

## U14 · Time

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S14101 | Essa semana eu estou em casa. | This week I'm at home. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S14102 | Estou cansado essa semana. | I'm tired this week. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S14103 | Temos uma semana. | We have a week. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S14106 | Sim, hoje é segunda-feira. | Yes, today is Monday. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S14107 | Não, hoje é sábado. | No, today is Saturday. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#455378](https://tatoeba.org/en/sentences/show/455378) | Que horas são agora? | What time is it now? | Use |  |  |
| [#935426](https://tatoeba.org/en/sentences/show/935426) | Que dia é hoje? | What day is it today? | Use |  |  |
| [#949940](https://tatoeba.org/en/sentences/show/949940) | Ela está em seu hotel agora. | She is in her hotel now. | Use |  |  |
| [#1111391](https://tatoeba.org/en/sentences/show/1111391) | Hoje o dia está ótimo. | It's a nice day. | Use | Today is a great day. |  |
| [#1483297](https://tatoeba.org/en/sentences/show/1483297) | Hoje está muito calor. | It is very hot today. | Use |  |  |
| [#2565981](https://tatoeba.org/en/sentences/show/2565981) | Hoje é o grande dia. | Today's the big day. | Reject |  | Idiom. |
| [#3297486](https://tatoeba.org/en/sentences/show/3297486) | Não estou cansado agora. | I'm not tired right now. | Use |  |  |
| [#3752320](https://tatoeba.org/en/sentences/show/3752320) | Onde o Tom está hoje? | Where's Tom today? | Use |  |  |
| [#4959534](https://tatoeba.org/en/sentences/show/4959534) | Eu não sei onde ele está agora. | I don't know where he is now. | Use |  |  |
| [#5540473](https://tatoeba.org/en/sentences/show/5540473) | Onde é que está agora? | Where is it now? | Use |  |  |
| [#6294289](https://tatoeba.org/en/sentences/show/6294289) | Hoje é um novo dia! | Today is a new day! | Use |  |  |
| [#7210314](https://tatoeba.org/en/sentences/show/7210314) | Por que agora? | Why now? | Use |  |  |
| [#10501871](https://tatoeba.org/en/sentences/show/10501871) | Que dia é o jogo? | What day is the game? | Use |  |  |

## U15 · Going Places

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S15101 | Sim, eu vou à escola amanhã. | Yes, I'm going to school tomorrow. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S15102 | Não, amanhã eu não vou à escola. | No, I'm not going to school tomorrow. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S15103 | Vamos ao parque. | Let's go to the park. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S15104 | O restaurante fica na cidade. | The restaurant is in town. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S15105 | Eu vou de ônibus. | I go by bus. (reply) | Keep |  | Correct; ônibus with the Brazilian accent. |
| S15106 | Sim, vou ao banco hoje. | Yes, I'm going to the bank today. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#785431](https://tatoeba.org/en/sentences/show/785431) | Vou de ônibus à escola. | I go to school by bus. | Use |  |  |
| [#1801062](https://tatoeba.org/en/sentences/show/1801062) | Eu não vou à escola de ônibus. | I don't go to school by bus. | Use |  |  |
| [#1299178](https://tatoeba.org/en/sentences/show/1299178) | Eu vou ao parque. | I'll go to the park. | Use | I'm going to the park. |  |
| [#1452894](https://tatoeba.org/en/sentences/show/1452894) | Eu vou no domingo. | I'm leaving on Sunday. | Use | I'm going on Sunday. |  |
| [#10159312](https://tatoeba.org/en/sentences/show/10159312) | Eu vou lá com vocês. | I'll go there with you. | Use |  |  |
| [#651588](https://tatoeba.org/en/sentences/show/651588) | Para com isso! | Stop that! | Reject |  | Imperative idiom; para is the verb here. |
| [#937946](https://tatoeba.org/en/sentences/show/937946) | Domingo vou à igreja. | I go to church on Sunday. | Use |  |  |
| [#1580311](https://tatoeba.org/en/sentences/show/1580311) | Quando nós vamos para casa? | When will we go home? | Use |  |  |
| [#1859479](https://tatoeba.org/en/sentences/show/1859479) | Nós vamos dançar amanhã. | We are going to a dance tomorrow. | Use | We're going dancing tomorrow. |  |
| [#2044260](https://tatoeba.org/en/sentences/show/2044260) | Sou muito velha para ele. | I'm too old for him. | Reject |  | Odd line. |
| [#2982045](https://tatoeba.org/en/sentences/show/2982045) | Hoje nós vamos dançar. | Today, we are going dancing. | Use |  |  |
| [#3760588](https://tatoeba.org/en/sentences/show/3760588) | Vamos de trem. | Let's go by train. | Use |  |  |
| [#4655744](https://tatoeba.org/en/sentences/show/4655744) | Agora vou para a igreja. | I am going to church now. | Use |  |  |
| [#6968829](https://tatoeba.org/en/sentences/show/6968829) | Vamos falar com ele na segunda-feira. | We'll talk with him on Monday. | Use |  |  |
| [#8245069](https://tatoeba.org/en/sentences/show/8245069) | Nós vamos à praia. | We're going to the beach. | Use |  |  |
| [#8245070](https://tatoeba.org/en/sentences/show/8245070) | Nós vamos para a praia. | We go to the beach. | Use |  |  |
| [#10734444](https://tatoeba.org/en/sentences/show/10734444) | Você quer que nós vamos com você? | Do you want us to go with you? | Reject |  | Seven words with querer que; past A1. |
| [#12190541](https://tatoeba.org/en/sentences/show/12190541) | Diz boa noite ao Pai. | Say night-night to Dad. | Reject |  | Imperative; capital Pai; deleted owner. |

## U51 · Body + Looks

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S51101 | Meu nariz é grande. | My nose is big. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S51105 | Estou com dor na perna. | My leg hurts. (reply) | Keep |  | Correct Brazilian "estou com dor na perna". |
| S51106 | Tom está com dor na perna. | Tom's leg hurts. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S51107 | Estou com dor no braço. | My arm hurts. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S51108 | Como está seu braço? | How's your arm? | Keep | Swap: #10784597, the same sentence. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S51109 | O braço dele é forte. | His arm is strong. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S51110 | O que você tem na boca? | What do you have in your mouth? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S51111 | Tenho uma maçã na boca. | I have an apple in my mouth. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S51112 | A boca dele é grande. | His mouth is big. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S51113 | Ela tem cabelo preto e comprido. | She has long black hair. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S51114 | Sim, eu sou alto. | Yes, I'm tall. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S51115 | Não, eu sou baixo. | No, I'm short. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S51117 | Minha perna está bem. | My leg is fine. (reply) | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#10784597](https://tatoeba.org/en/sentences/show/10784597) | Como está seu braço? | How's your arm? | Use |  |  |
| [#8317773](https://tatoeba.org/en/sentences/show/8317773) | É alto? | Is he tall? | Use | Is he tall? |  |
| [#1485039](https://tatoeba.org/en/sentences/show/1485039) | Tom é muito alto. | Tom is very tall. | Use |  |  |
| [#1179349](https://tatoeba.org/en/sentences/show/1179349) | Ele é um menino alto. | He is a tall boy. | Use |  |  |
| [#354844](https://tatoeba.org/en/sentences/show/354844) | Os olhos dele são azuis. | His eyes are blue. | Use |  |  |
| [#950401](https://tatoeba.org/en/sentences/show/950401) | Ele come aqui na minha mão. | I have him eating out of my hand. | Reject |  | Idiom. |
| [#971992](https://tatoeba.org/en/sentences/show/971992) | Você fica bem de cabelo curto. | You look nice with your hair short. | Reject |  | Idiom (ficar bem de). |
| [#1207158](https://tatoeba.org/en/sentences/show/1207158) | Eu sou mais alto que ele. | I'm taller than him. | Use |  |  |
| [#3667439](https://tatoeba.org/en/sentences/show/3667439) | Eu vou a pé. | I will go on foot. | Use |  |  |
| [#9463883](https://tatoeba.org/en/sentences/show/9463883) | Tenho muito cabelo. | I have a lot of hair. | Use |  |  |
| [#13956383](https://tatoeba.org/en/sentences/show/13956383) | Você é uma mulher alta. | You're a tall woman. | Use |  |  |

## A1 list: the Brazilian swaps

| European | Brazilian | Verdict | Note |
| --- | --- | --- | --- |
| quilómetro | quilômetro | Right |  |
| castanho | marrom | Right |  |
| cinzento | cinza | Right |  |
| apelido | sobrenome | Right | apelido in Brazil means nickname, so the swap matters. |
| telemóvel | celular | Right |  |
| utilizador | usuário | Right |  |
| género | gênero | Right |  |
| rapariga | moça | Right | rapariga is offensive in Brazil; moça (or menina) is the word. |
| básico | fundamental | Right, in context | Only in "ensino básico" → "ensino fundamental"; básico on its own is normal Brazilian. |
| secundário | médio | Right, in context | Only in "ensino secundário" → "ensino médio"; secundário on its own is normal Brazilian. |
| licenciatura | graduação | Right, in context | graduação is the Brazilian degree; licenciatura exists in Brazil for teaching degrees. |
| louro | loiro | Right | Both are used in Brazil; loiro is the commoner spelling. |
| sanita | vaso | Right, incomplete | vaso alone also means vase; the word is "vaso sanitário" (or privada). |
| lavatório | pia | Right |  |
| renda | aluguel | Right | renda in Brazil means income, so the swap matters. |
| arrendamento | aluguel | Right |  |
| arrendar | alugar | Right |  |
| chávena | xícara | Right |  |
| frigorífico | geladeira | Right |  |
| comando | controle | Right, incomplete | The Brazilian word is "controle remoto"; controle alone is fine once the context is set. |
| paragem | ponto | Right, incomplete | "ponto de ônibus"; ponto alone has many meanings. |
| autocarro | ônibus | Right |  |
| cão | cachorro | Right | cão is understood in Brazil; cachorro is the everyday word. |
| piriquito | periquito | Spelling, not regional | piriquito is a misspelling in both varieties; periquito is right everywhere. |
| desporto | esporte | Right |  |
| comboio | trem | Right |  |
| mota | moto | Right |  |
| campismo | acampamento | Partly | For the campsite Brazil says "camping"; acampamento is the activity or a camp. "parque de campismo" → "camping". |
| constipado | resfriado | Right | constipado in Brazil means constipated, so the swap matters. |
| constipação | resfriado | Right | Same; constipação in Brazil is constipation. |
| iboprufeno | ibuprofeno | Spelling, not regional | ibuprofeno is the spelling in both varieties. |
| euro | real | Right |  |
| cêntimo | centavo | Right |  |
| gelado | sorvete | Right | gelado in Brazil is an adjective (chilled); sorvete is ice cream. |
| ementa | cardápio | Right |  |
| empregado | garçom | Right, in context | garçom for the waiter; empregado also means employee in Brazil. |
