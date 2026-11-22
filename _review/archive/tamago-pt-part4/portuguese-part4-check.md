# Tamago Brazilian Portuguese check, A1 Part 4, 2026-11-19

Quality pass on Brazilian Portuguese A1 Part 4, change no code. Three sets: the Tatoeba candidates kept out only by the trust rule (131 distinct sentences in `_review/portuguese-part4-candidates.md`), each marked **Use** or **Reject**, with European phrasing rejected; the 269 drafts in `_review/portuguese-part4-drafts.md`, each marked **Keep**, **Fix** (with the corrected Portuguese and English) or **Cut**, with a swap named where a Use candidate teaches the same word; and the 15 Read and Answer texts, checked for natural Brazilian Portuguese, clear questions and one fitting answer each. The task items (Write the Number, Fill the Form, Write a Message) are at the end. Meanings and verb forms were checked against the course's Wiktionary data in content-pt/checks (words.json, conjugations.json), not memory. The candidates file carries the same marks in place. This is a reviewer's read, not a native speaker's.

## Counts

- Candidates: **Use 107** · **Reject 24** (9 of the Use marks name the English to show).
- Drafts: **Keep 269** · **Fix 0** · **Cut 0**; 9 drafts have a swap named.
- Read and Answer texts: **Keep 15** · **Fix 0**. Task items: Keep 19 · Fix 0.
- Draft fixes: none; all 269 drafts read as Brazilian (pega o trem, café da manhã, celular, legal, ensino médio, geladeira, usuário). Text fixes: none. Task item fixes: none. Four list words are Portugal's (condutor, alojamento, tenda, fruto in the everyday sense), kept with notes since the list forces them.
- Reject reasons, most common first: sense traps (doce and resfriado as nouns, virar as become, procurar as try to, sinto muito, há as for); relative and que-clauses and one cleft, past A1; idioms (follow the money, feel for you, take my eyes off); a subjunctive; a reflexive (virar-se); a proverb; scolding, confrontational or dark lines; odd lines; one wrong English (fry); one missing period.
- No word-for-word matches; nine swaps are named.
- Checks asked for on Part 4. (1) "Há Internet no quarto?" (S87113) and "O marido de Tom é enfermeiro." (S87114) are back: both are live in U87 in content-pt/raw/sentences.json and in the built src/content-pt/sentences.json, as Tatoeba lines (#11475817, #10650966). (2) U95 At the Hotel is drafted to the usual target: 50 live sentences (28 drafts, 22 Tatoeba) against the rule of 30 to 40 per unit, and every one of its 13 words is in at least three sentences (reserva 6, carteira 8, elevador 6, the rest 3). (3) The nine cuts: no list of nine was in this worktree, so this could not be checked name by name. What the repo records is 24 cut sentences in content-pt/review-decisions.json, one of them in Part 4 (S92016 "O que é que há na geladeira?"); all 24 are gone from the built table (src/content-pt/sentences.json, 3,359 lines) and still sit in the raw pool (content-pt/raw and checks), which is how cuts are kept. If the nine were a list from an earlier Part 4 read, send it and they can be checked against the built table in a minute.
- Watch items: no draft uses tu forms, tu imperatives, "tenho de" or "estar a" + infinitive; the você imperatives (siga, vire, chame, tome, assine, feche) are right. European leanings in the drafts, all list words and all kept with a note: condutor (S84104, S84105; Brazil: motorista, cobrador), alojamento (S95107–S95109; hospedagem), tenda (S95116, S95117; barraca), fruto (S91115; fruta). Candidates: one European-leaning word order (#3112245), rejected. Por que / porque: the drafts use only "o porquê", the noun, as the file says; no candidate misuses them. Como as "like": none; "Como é sua irmã?" (#6164926) is "what is she like", a question, and "Como é a sua alimentação?" (S91128) the same; the drafts' other como is the verb.
- Accent-only pairs in Part 4: **porquê** W1894 (U95) against porque (Part 1, U11): the drafts use porquê only as the noun (o porquê), rightly; a choice round should never set porque and porquê side by side. **pais** W1671 (U85) against país (Part 2, U45): the same trap. **avô** W1660 and **avó** W1661 are both in U85 and differ only by the accent; they are a real contrast (grandfather / grandmother), so a pair asking which is which is fair, but a listening item would need the voice to carry it. No two sentences in the part differ only by accents.
- Glossary senses to re-pick or hint (checked in content-pt/checks/words.json). Wrong senses first: **fogão** W1823 is glossed "fire": show "stove". **viúvo** W1728 has the lemma "widowhood": the lemma is viúvo, "widower, widowed". **frango** W1622 "poultry": show "chicken". **tirar** W1879 "to get, obtain": the drafts use take (a photo, a grade) and take out (the trash); show "to take (out); to get (a grade)". **tiro** W1880 is also the noun shot. **ensino** W1865 "teaching": show "education; ensino fundamental / médio / superior = elementary school / high school / college". **médio** W1867 "middle" and **superior** W1868 "upper, higher": hint the school levels. **universitário** W1870 is tagged adjective; #1664977 uses the noun "university student". **graduação** W1872 "graduation": show "undergraduate degree". **recreio** W1877 "playtime": show "recess, break". **período** W1876 has a paragraph gloss: show "period; school session (período da tarde); university term". **alimentação** W1815 "food, nourishment": show "diet, eating". **xícara** W1607 "a teacup or mug": show "cup". **doce** W1608 is the adjective; #2102397 uses the noun. **prato** W1617 has a paragraph gloss: show "plate; dish". **esquerda** W1629: trim to "left". **trás** W1638 "behind": show "atrás de = behind". **placa** W1639 "street sign": show "sign". **compras** W1840 "plural of compra": show "shopping (fazer compras)". **parte** W1649 "inflection of partir": show "leaves"; the same spelling is the noun part. **pego** W1654: show "I take, I catch". **filhos** W1659, **pais** W1671, **avós** W1662 are fine; **pais** is the twin of país (see accents). **resfriado** W1848 is the adjective; #341041 uses the noun. **sabonete** W1861 "toilet soap" and **sabão** W1862 "soap": show "bar of soap (for washing yourself)", "soap (laundry, dishes)", since the drafts use sabão for clothes. **dói** W1850: show "hurts (me dói)". **queimar** W1853: trim to "to burn". **sala** W1677 "ellipsis of sala de estar": show "living room". **aluguel** W1690 "Brazilian form of aluguer": show "rent". **enfermeira** W1700, **prima** W1664, **esposa** W1670, **namorada** W1674 "female equivalent of …": show "nurse (f)", "cousin (f)", "wife", "girlfriend". **separado** W1725 "divorced": show "separated". **divorciada** W1727: show "divorced (f)". **sexo** W1730, **feminino** W1732, **cidadão** W1734 have paragraph glosses: show "sex (on a form)", "female", "citizen". **gênero** W1733 "Brazilian spelling of género": show "gender". **email** W1736 "alternative spelling of e-mail": show "email". **individual** W1884 "individual": show "single (room)". **alojamento** W1885: add "(Portugal; Brazil says hospedagem)". **tenda** W1888 "tent": add "(Portugal; in Brazil a canopy or stall; the camping tent is barraca)". **beijos** W1752 "plural of beijo": show "kisses (the sign-off: love)". **querida** W1750: show "dear (f)". **mensagens** W1740, **dentes** W1844, **quartos** W1676, **vegetais** W1806, **legumes** W1807, **gramas** W1813: show the plural noun. **peço**, **pede**, **cheira**, **cozinho**, **preparo**, **procuro**, **desligo**, **sinto**, **funciona**, **tiro**, **envio**, **mando** and the você-imperatives **vire**, **pare**, **siga**, **chame**, **tome**, **assine**, **mostre**, **desligue** are "inflection of …" strings: show "I order", "orders", "smells", "I cook", "I make", "I'm looking for", "I turn off", "I feel", "works", "I take", "I send", "I send", and "turn!", "stop!", "follow!", "call!", "take!", "sign!", "show!", "turn off!". **perdi** W1709: show "I lost (past)". **porquê** W1894 "reason, cause": show "the reason why (o porquê)", beside porque of Part 1.
- Conjugation tables (content-pt/checks/conjugations.json): every present table matches the taught forms. **doer** has no table; dói and doem are the only forms used, so one line "dói / doem" would do. **perdi** W1709 (past) points at perder's present table. The você-imperatives taught here (vire, pare, siga, chame, tome, assine, mostre, desligue) are not in their verbs' tables, which show the indicative only; the Glossary should say they are the command forms.

## U81 · At the Café

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S81101 | Eu peço um café. | I order a coffee. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S81102 | Peço um suco de laranja. | I order an orange juice. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S81103 | Ele pede um sorvete. | He orders an ice cream. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S81104 | A Ana pede um chá. | Ana orders a tea. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S81105 | O que você pede? | What do you order? | Keep | Swap for #2763640 (O Tom é um garçom) only for garçom; otherwise keep. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S81106 | Eu queria um copo de suco, por favor. | I'd like a glass of juice, please. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#1469865](https://tatoeba.org/en/sentences/show/1469865) | Vamos tomar a xícara de chá aqui. | Let's drink the cup of tea here. | Reject |  | An odd line ("a xícara" with the definite article). |
| [#1667178](https://tatoeba.org/en/sentences/show/1667178) | Não tem mais comida. | There is no food left. | Use |  |  |
| [#2102397](https://tatoeba.org/en/sentences/show/2102397) | Este doce custa oito centavos. | This candy costs eight cents. | Reject |  | "Doce" here is the noun (a sweet); the circle teaches the adjective, a sense trap. |
| [#2441735](https://tatoeba.org/en/sentences/show/2441735) | Gosto de provar peixe. | I like to fry fish. | Reject |  | The English is wrong (fry for provar), and the line is odd. |
| [#2763640](https://tatoeba.org/en/sentences/show/2763640) | O Tom é um garçom. | Tom is a waiter. | Use | Tom is a waiter. |  |
| [#3128803](https://tatoeba.org/en/sentences/show/3128803) | Não há comida. | There's no food. | Use |  |  |
| [#3282434](https://tatoeba.org/en/sentences/show/3282434) | Vai tomar uma xícara de café? | Will you have a cup of coffee? | Use |  |  |
| [#10746407](https://tatoeba.org/en/sentences/show/10746407) | Você come comida. | You eat food. | Reject |  | A tautology (you eat food). |

## U91 · Food

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S91101 | O porco está no campo. | The pig is in the field. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91102 | Eu não como porco. | I don't eat pork. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91103 | Eu gosto de massa. | I like pasta. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91104 | A massa está boa. | The pasta is good. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91105 | Você quer massa ou peixe? | Do you want pasta or fish? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91106 | Sal e pimenta, por favor. | Salt and pepper, please. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91107 | Eu como legumes todo dia. | I eat vegetables every day. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91108 | Você gosta de legumes? | Do you like vegetables? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91109 | Eu compro legumes no mercado. | I buy vegetables at the market. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91110 | Eu como cereal com leite. | I eat cereal with milk. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91111 | Você quer cereal? | Do you want cereal? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91112 | O pão é de trigo. | The bread is made of wheat. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91113 | O trigo é uma planta. | Wheat is a plant. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91114 | Este pão não tem trigo. | This bread has no wheat. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91115 | A maçã é um fruto. | The apple is a fruit. | Keep |  | Correct in the botanical sense; everyday Brazilian says "a maçã é uma fruta". Fruto is the list word, and S91116 (the tomato) is the classic use. |
| S91116 | O tomate é um fruto. | The tomato is a fruit. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91117 | Eu quero um litro de leite. | I want a liter of milk. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91118 | Um litro de água, por favor. | A liter of water, please. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91119 | Quanto custa um litro de suco? | How much is a liter of juice? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91120 | Cem gramas de queijo, por favor. | A hundred grams of cheese, please. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91121 | Quinhentos gramas de tomate, por favor. | Five hundred grams of tomatoes, please. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91122 | Um quilo tem mil gramas. | A kilo has a thousand grams. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91123 | Uma medida de açúcar, por favor. | One measure of sugar, please. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91124 | Uma medida de leite e uma de água. | One measure of milk and one of water. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91125 | Qual é a medida da mesa? | What are the measurements of the table? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91126 | A alimentação é importante. | Diet is important. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91127 | Ele tem uma boa alimentação. | He has a good diet. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91128 | Como é a sua alimentação? | What is your diet like? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91129 | Posso cheirar? | Can I smell it? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91130 | Você quer cheirar o café? | Do you want to smell the coffee? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91131 | O gato gosta de cheirar tudo. | The cat likes to smell everything. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91132 | Eu preparo o café da manhã. | I make breakfast. | Keep | Swap for #1639471 (Eu preparo o almoço todo dia), the same word on Tatoeba. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91133 | Eu preparo o jantar. | I make dinner. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S91134 | Preparo um chá para você. | I'm making you a tea. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#1639471](https://tatoeba.org/en/sentences/show/1639471) | Eu preparo o almoço todo dia. | I make lunch every day. | Use |  |  |
| [#1179367](https://tatoeba.org/en/sentences/show/1179367) | Não tenho muito interesse em cozinhar. | I don't have much interest in cooking. | Use |  |  |
| [#2195737](https://tatoeba.org/en/sentences/show/2195737) | Ele gosta de cozinhar. | He likes to cook. | Use |  |  |
| [#2213845](https://tatoeba.org/en/sentences/show/2213845) | O homem cheira o leite. | The man smells the milk. | Use |  |  |
| [#6737959](https://tatoeba.org/en/sentences/show/6737959) | Ela gosta de cozinhar para sua família. | She likes to cook for her family. | Use |  |  |

## U26 · Excuse Me

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S26101 | Com licença, você pode me ajudar? | Excuse me, can you help me? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#3752485](https://tatoeba.org/en/sentences/show/3752485) | Você não pode me ajudar? | Can't you help me? | Use |  |  |
| [#4931865](https://tatoeba.org/en/sentences/show/4931865) | Vamos todos ajudar o Tom. | Let's all help Tom. | Use |  |  |
| [#2145760](https://tatoeba.org/en/sentences/show/2145760) | Eu vou ajudar você com prazer. | I will gladly help you. | Use |  |  |
| [#968316](https://tatoeba.org/en/sentences/show/968316) | Você pode me ajudar com esta mesa? | Can you give me a hand with this table? | Use | Can you help me with this table? |  |
| [#1137871](https://tatoeba.org/en/sentences/show/1137871) | Há alguém que fale inglês? | Is there someone who speaks English? | Reject |  | A subjunctive ("que fale") is past A1. |
| [#1483324](https://tatoeba.org/en/sentences/show/1483324) | Não há problema. | No problem. | Use |  |  |
| [#2466630](https://tatoeba.org/en/sentences/show/2466630) | Acho que você tem um problema, Tom. | I think you have a problem, Tom. | Use |  |  |
| [#2900930](https://tatoeba.org/en/sentences/show/2900930) | Vejo alguém. | I see someone. | Use |  |  |
| [#2992109](https://tatoeba.org/en/sentences/show/2992109) | Tem alguém à porta. | There's somebody at the door. | Use |  |  |
| [#3616259](https://tatoeba.org/en/sentences/show/3616259) | Está claro que há um problema. | Obviously, there's a problem. | Use | It's clear there's a problem. |  |
| [#4414263](https://tatoeba.org/en/sentences/show/4414263) | Alguém pode abrir a porta, por favor? | Can someone please open the door? | Use |  |  |
| [#4927586](https://tatoeba.org/en/sentences/show/4927586) | Tom e eu estamos aqui para ajudar. | Tom and I are here to help. | Use |  |  |
| [#10790104](https://tatoeba.org/en/sentences/show/10790104) | Eu ouço alguém cantar. | I hear someone singing. | Use |  |  |

## U82 · At the Restaurant

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S82101 | Um prato de arroz, por favor. | A plate of rice, please. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S82102 | O prato está quente. | The plate is hot. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S82103 | Qual é o prato do dia? | What's the dish of the day? | Keep | Swap for #6770470 (Este é o prato do Tom), the same word on Tatoeba. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S82104 | O que tem de sobremesa? | What is there for dessert? | Keep | Swap for #383106 (Qual é a sobremesa?), the same word on Tatoeba. | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#6770469](https://tatoeba.org/en/sentences/show/6770469) | Isto é o prato do Tom | This is Tom's dish. | Reject |  | No final period; #6770470 is the same line with one. |
| [#6770470](https://tatoeba.org/en/sentences/show/6770470) | Este é o prato do Tom. | This is Tom's dish. | Use |  |  |
| [#383106](https://tatoeba.org/en/sentences/show/383106) | Qual é a sobremesa? | What's for dessert? | Use |  |  |
| [#1172888](https://tatoeba.org/en/sentences/show/1172888) | Eu nunca como carne. | I never eat meat. | Use |  |  |
| [#1172913](https://tatoeba.org/en/sentences/show/1172913) | Carne ou peixe? | Meat or fish? | Use |  |  |
| [#1172934](https://tatoeba.org/en/sentences/show/1172934) | O cachorro quer carne. | The dog wants meat. | Use |  |  |
| [#1365927](https://tatoeba.org/en/sentences/show/1365927) | A sopa está muito quente. | The soup's very hot. | Use |  |  |
| [#3605407](https://tatoeba.org/en/sentences/show/3605407) | Isto é uma faca. | This is a knife. | Use |  |  |
| [#3605409](https://tatoeba.org/en/sentences/show/3605409) | Isto é uma colher. | This is a spoon. | Use |  |  |
| [#11512577](https://tatoeba.org/en/sentences/show/11512577) | A carne é barata. | The meat is cheap. | Use |  |  |
| [#13912792](https://tatoeba.org/en/sentences/show/13912792) | Há gente que come carne de gato. | There are people who eat cat meat. | Reject |  | An odd, dark line with a relative clause. |

## U83 · Asking the Way

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S83102 | Siga reto até a praça. | Go straight ahead to the square. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S83103 | Siga reto e vire à esquerda. | Go straight ahead and turn left. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S83104 | Você tem que virar à direita. | You have to turn right. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S83105 | Onde eu tenho que virar? | Where do I have to turn? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S83106 | Eu procuro a estação. | I'm looking for the station. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S83107 | Com licença, procuro a farmácia. | Excuse me, I'm looking for the pharmacy. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S83108 | Olhe a placa. | Look at the sign. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S83109 | É para virar aqui? | Do I turn here? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#3255870](https://tatoeba.org/en/sentences/show/3255870) | Vai virar pai logo. | He'll become a father soon. | Reject |  | "Virar" here means become; the circle teaches turn, a sense trap. |
| [#10784895](https://tatoeba.org/en/sentences/show/10784895) | Procuro dormir bem. | I try to sleep well. | Reject |  | "Procurar" here means try to; the circle teaches look for, a sense trap. |
| [#438190](https://tatoeba.org/en/sentences/show/438190) | É logo na esquina. | It's just around the corner. | Use | It's right on the corner. |  |
| [#947175](https://tatoeba.org/en/sentences/show/947175) | Pare de dizer isso! | Stop saying that! | Reject |  | A scolding line. |
| [#1642873](https://tatoeba.org/en/sentences/show/1642873) | A biblioteca é para a direita. | The library is to the right. | Use | The library is to the right. |  |
| [#5302519](https://tatoeba.org/en/sentences/show/5302519) | Não se vire. | Don't turn around. | Reject |  | Reflexive "virar-se" is past A1. |
| [#10787636](https://tatoeba.org/en/sentences/show/10787636) | Siga o dinheiro. | Follow the money. | Reject |  | An idiom (follow the money). |

## U92 · Around the House

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S92101 | O fogão é novo. | The stove is new. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92102 | A sopa está no fogão. | The soup is on the stove. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92103 | O fogão está sujo. | The stove is dirty. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92104 | O sorvete está no congelador. | The ice cream is in the freezer. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92105 | O congelador é pequeno. | The freezer is small. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92106 | Tem peixe no congelador. | There's fish in the freezer. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92107 | Posso ver o vídeo? | Can I see the video? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92108 | Este vídeo é muito bom. | This video is very good. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92109 | Ele faz um vídeo da festa. | He's making a video of the party. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92110 | O fogão é a gás. | The stove runs on gas. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92111 | O hotel tem aquecimento? | Does the hotel have heating? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92112 | Pode ligar o aquecimento? | Can you turn on the heating? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92113 | Pode desligar a luz? | Can you turn off the light? | Keep | Swap for #12278562 (Não tem luz), the same word on Tatoeba. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92114 | Vou desligar o celular. | I'm going to turn off my cell phone. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92115 | Eu desligo a televisão. | I turn off the TV. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92116 | A mobília é nova. | The furniture is new. | Keep |  | Correct; Brazilians more often say "os móveis", mobília is the list word. |
| S92117 | Gosto da mobília. | I like the furniture. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92118 | O arroz está na despensa. | The rice is in the pantry. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92119 | A despensa é pequena. | The pantry is small. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92120 | Não quero sujar a cozinha. | I don't want to get the kitchen dirty. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92121 | Você vai sujar a casa! | You're going to make the house dirty! | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S92122 | A geladeira é nova. | The fridge is new. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#1249361](https://tatoeba.org/en/sentences/show/1249361) | Eu quero um novo forno. | I want a new oven. | Use |  |  |
| [#12080574](https://tatoeba.org/en/sentences/show/12080574) | Eu gosto de fazer compras. | I like shopping. | Use |  |  |
| [#12278561](https://tatoeba.org/en/sentences/show/12278561) | Não há luz. | There's no light. | Use |  |  |
| [#12278562](https://tatoeba.org/en/sentences/show/12278562) | Não tem luz. | There's no light. | Use |  |  |

## U27 · I'm Lost

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| | *(no drafts in this circle)* | | | | |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#340456](https://tatoeba.org/en/sentences/show/340456) | Com licença, eu estou perdido. | Excuse me, I'm lost. | Use |  |  |

## U84 · Getting Around

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S84101 | O transporte é caro aqui. | Transport is expensive here. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S84102 | Que transporte você vai pegar? | What transport are you going to take? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S84103 | O ônibus é o transporte mais barato. | The bus is the cheapest transport. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S84104 | O condutor do ônibus é simpático. | The bus driver is nice. | Keep |  | Correct, but a Brazilian calls a bus driver "motorista" (taught in U84 too); "condutor" is Portugal's word and, in Brazil, a formal or train-driver term. Condutor is the list word, so the line stays; for Dan and the native checker. |
| S84105 | O condutor pede a passagem. | The conductor asks for the ticket. | Keep |  | As S84104; the person who takes fares on a Brazilian bus is the "cobrador". Stiff, flagged. |
| S84106 | Onde fica a agência do banco? | Where is the bank branch? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S84107 | Vou à agência de viagem. | I'm going to the travel agency. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S84108 | A agência abre às nove. | The agency opens at nine. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S84109 | Eu pego o trem às sete. | I take the train at seven. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S84110 | Pego um táxi para o aeroporto. | I take a taxi to the airport. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#949939](https://tatoeba.org/en/sentences/show/949939) | Quando você vai partir? | When are you going to leave? | Use |  |  |
| [#2440848](https://tatoeba.org/en/sentences/show/2440848) | Não é a primeira vez. | It's not the first time. | Use |  |  |
| [#4800734](https://tatoeba.org/en/sentences/show/4800734) | Eu gosto muito de andar de moto. | I really like riding motorcycles. | Use |  |  |
| [#6770450](https://tatoeba.org/en/sentences/show/6770450) | Acho que vou partir cedo hoje. | I think I'll leave early today. | Use |  |  |

## U85 · My Family

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S85101 | Minha avó tem oitenta anos. | My grandmother is eighty. | Keep | Swap for #3572712 (Minha avó é muito velha), the same words on Tatoeba. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S85102 | Meus avós estão aqui. | My grandparents are here. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S85103 | Você tem avós? | Do you have grandparents? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S85104 | Os avós da Ana são do Brasil. | Ana's grandparents are from Brazil. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S85105 | Minha prima é professora. | My cousin is a teacher. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S85106 | Minha tia mora em Portugal. | My aunt lives in Portugal. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S85107 | Esta é a minha tia. | This is my aunt. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S85108 | O neto dele é alto. | His grandson is tall. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S85109 | Ela tem uma neta. | She has a granddaughter. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S85110 | Minha neta tem cinco anos. | My granddaughter is five. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S85111 | A neta da Ana é muito bonita. | Ana's granddaughter is very pretty. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#3572712](https://tatoeba.org/en/sentences/show/3572712) | Minha avó é muito velha. | My grandmother is very old. | Use |  |  |
| [#4533628](https://tatoeba.org/en/sentences/show/4533628) | É o aniversário da minha avó hoje. | Today's my grandmother's birthday. | Use |  |  |
| [#340989](https://tatoeba.org/en/sentences/show/340989) | A verdade é a filha do tempo. | Truth is time's daughter. | Reject |  | A proverb. |
| [#347680](https://tatoeba.org/en/sentences/show/347680) | Ele é meu irmão. | He is my brother. | Use |  |  |
| [#566462](https://tatoeba.org/en/sentences/show/566462) | Somos os filhos dele. | We are his children. | Use |  |  |
| [#651652](https://tatoeba.org/en/sentences/show/651652) | Ela tem um filho que é médico. | She has a son who is a doctor. | Reject |  | A relative clause, past A1. |
| [#808453](https://tatoeba.org/en/sentences/show/808453) | Meu irmão gosta de música. | My brother likes music. | Use |  |  |
| [#838481](https://tatoeba.org/en/sentences/show/838481) | O rapaz ali é irmão dele. | That boy is his brother. | Use |  |  |
| [#916680](https://tatoeba.org/en/sentences/show/916680) | Não é meu primo. | He's not my cousin. | Use |  |  |
| [#991440](https://tatoeba.org/en/sentences/show/991440) | É do meu irmão. | It belongs to my brother. | Use |  |  |
| [#1456104](https://tatoeba.org/en/sentences/show/1456104) | Vou comprar um relógio para meu filho. | I'll buy a watch for my son. | Use |  |  |
| [#2213767](https://tatoeba.org/en/sentences/show/2213767) | Aquela é minha esposa. | That's my wife. | Use |  |  |
| [#3112245](https://tatoeba.org/en/sentences/show/3112245) | Que seu filho faz na Alemanha? | What does your son do in Germany? | Reject |  | "Que seu filho faz" drops the "o" of "o que"; European-leaning, odd to a Brazilian ear. |
| [#3575520](https://tatoeba.org/en/sentences/show/3575520) | Quero um namorado. | I want a boyfriend. | Use |  |  |
| [#3605404](https://tatoeba.org/en/sentences/show/3605404) | O filho dele está doente. | His son is ill. | Use |  |  |
| [#3605405](https://tatoeba.org/en/sentences/show/3605405) | Seu filho está doente. | His son is ill. | Use | His son is ill. |  |
| [#3640115](https://tatoeba.org/en/sentences/show/3640115) | Acho que ela tem dois filhos. | I think she has two sons. | Use |  |  |
| [#3640117](https://tatoeba.org/en/sentences/show/3640117) | Acho que ele tem dois filhos. | I think he has two sons. | Use |  |  |
| [#4039059](https://tatoeba.org/en/sentences/show/4039059) | Somos os pais do Tom. | We're Tom's parents. | Use |  |  |
| [#4088701](https://tatoeba.org/en/sentences/show/4088701) | Sei que você tem uma namorada. | I know you have a girlfriend. | Use |  |  |
| [#6164926](https://tatoeba.org/en/sentences/show/6164926) | Como é sua irmã? | What is your sister like? | Use |  |  |
| [#7089877](https://tatoeba.org/en/sentences/show/7089877) | Sou mais forte que meu irmão. | I am stronger than my brother. | Use |  |  |
| [#9727864](https://tatoeba.org/en/sentences/show/9727864) | Maria é minha irmã mais nova. | Mary is my youngest sister. | Use |  | Tatoeba's Mary in the English only; the Portuguese says Maria, fine. |
| [#10737409](https://tatoeba.org/en/sentences/show/10737409) | Não são meus pais. | They aren't my parents. | Use |  |  |
| [#10747734](https://tatoeba.org/en/sentences/show/10747734) | Meu filho é um professor de inglês. | My son is an English teacher. | Use |  |  |
| [#12272388](https://tatoeba.org/en/sentences/show/12272388) | A Maria tem três filhos. | Maria has three sons. | Use | Maria has three children. | the English says sons; filhos is children when the sex is mixed or unknown. |

## U93 · Health

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S93101 | Meu corpo dói. | My body hurts. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93102 | Estou com dor no corpo. | My body aches. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93103 | Esporte é bom para o corpo. | Sport is good for the body. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93105 | Ele tem dentes grandes. | He has big teeth. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93106 | As crianças têm dentes de leite. | Children have baby teeth. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93107 | Quantos dentes você tem? | How many teeth do you have? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93108 | A gripe é uma doença. | The flu is an illness. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93109 | Estou resfriada. | I have a cold. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93110 | Ela está resfriada. | She has a cold. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93111 | A Ana está resfriada hoje. | Ana has a cold today. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93112 | A ferida dói. | The wound hurts. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93113 | Ele tem uma ferida na mão. | He has a wound on his hand. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93114 | A ferida é pequena. | The wound is small. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93115 | Onde fica a clínica? | Where is the clinic? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93116 | Vou à clínica amanhã. | I'm going to the clinic tomorrow. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93117 | A clínica abre às oito. | The clinic opens at eight. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93118 | Você tem remédio para dor de cabeça? | Do you have medicine for a headache? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93119 | Este medicamento é caro. | This medicine is expensive. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93120 | Eu tomo este medicamento. | I take this medicine. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93121 | Tome um comprimido. | Take a pill. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93122 | Tomo um comprimido de manhã. | I take a pill in the morning. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93123 | Um comprimido, duas vezes por dia. | One pill, twice a day. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93124 | Lavo a roupa com sabão. | I wash the clothes with soap. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93125 | Tem sabão no banheiro? | Is there soap in the bathroom? | Keep | Swap for #2171857 (Sabão, por favor), the same word on Tatoeba. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93126 | O sabão está na cozinha. | The soap is in the kitchen. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93127 | Não consigo adormecer. | I can't fall asleep. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93128 | A criança vai adormecer cedo. | The child is going to fall asleep early. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93129 | É difícil adormecer com calor. | It's hard to fall asleep in the heat. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93130 | Tome este remédio. | Take this medicine. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93131 | Não consigo sentir a mão. | I can't feel my hand. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S93132 | Tome este comprimido com água. | Take this pill with water. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#2171857](https://tatoeba.org/en/sentences/show/2171857) | Sabão, por favor. | Soap, please. | Use |  |  |
| [#341041](https://tatoeba.org/en/sentences/show/341041) | Ela está de cama com um resfriado. | She is in bed with a cold. | Reject |  | "Resfriado" here is the noun (a cold); the circle teaches the adjective (estou resfriado), a sense trap. |
| [#955619](https://tatoeba.org/en/sentences/show/955619) | Eu sinto muito. | I'm very sorry. | Reject |  | "Sinto muito" (I'm sorry) is a set phrase, a sense trap for sinto. |
| [#981321](https://tatoeba.org/en/sentences/show/981321) | Ele fica acordado até tarde da noite. | He sits up till late at night. | Use |  |  |
| [#1368285](https://tatoeba.org/en/sentences/show/1368285) | Me sinto mal hoje. | I feel bad today. | Use |  |  |
| [#1580033](https://tatoeba.org/en/sentences/show/1580033) | Eu sinto muito por você. | I feel for you deeply. | Reject |  | An idiom (feel for you). |
| [#1649483](https://tatoeba.org/en/sentences/show/1649483) | Tem sangue na água. | There's blood in the water. | Use |  |  |
| [#2151382](https://tatoeba.org/en/sentences/show/2151382) | Que doença eu tenho? | What disease do I have? | Use |  |  |
| [#4161137](https://tatoeba.org/en/sentences/show/4161137) | Tenho um coração. | I have a heart. | Use |  |  |
| [#10741912](https://tatoeba.org/en/sentences/show/10741912) | Agora me sinto mais forte. | I feel stronger now. | Use |  |  |

## U86 · At Home

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S86101 | O banheiro tem banheira? | Does the bathroom have a bathtub? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S86102 | A banheira é grande. | The bathtub is big. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S86103 | A pia é branca. | The sink is white. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S86104 | O copo está na pia. | The glass is in the sink. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S86105 | A pia da cozinha é pequena. | The kitchen sink is small. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S86106 | Feche a torneira. | Turn off the faucet. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S86107 | A torneira está aberta. | The faucet is on. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S86108 | A água da torneira é boa? | Is the tap water good? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S86109 | A chave não abre a fechadura. | The key doesn't open the lock. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S86110 | A fechadura da porta é nova. | The door lock is new. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S86111 | A porta tem uma fechadura nova. | The door has a new lock. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S86112 | Lar, doce lar. | Home, sweet home. | Keep |  | A set phrase, but the one place lar lives in everyday speech; fine. |
| S86113 | Este é o meu lar. | This is my home. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S86114 | Minha casa tem três quartos. | My house has three bedrooms. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#531772](https://tatoeba.org/en/sentences/show/531772) | Há um gato sobre a cadeira. | There is a cat on the chair. | Use |  |  |
| [#715072](https://tatoeba.org/en/sentences/show/715072) | Eu vou entrar no chuveiro. | I'll take a shower. | Use | I'm going to get in the shower. |  |
| [#959495](https://tatoeba.org/en/sentences/show/959495) | Vamos alugar uma bicicleta ali. | Let's rent a bike there. | Use |  |  |
| [#1556726](https://tatoeba.org/en/sentences/show/1556726) | Esta cadeira é de madeira. | This chair is made of wood. | Use |  |  |
| [#1576740](https://tatoeba.org/en/sentences/show/1576740) | Há muitos livros no meu quarto. | There are many books in my room. | Use |  |  |
| [#3468583](https://tatoeba.org/en/sentences/show/3468583) | Não tenho rádio no meu quarto. | I don't have a radio in my room. | Use |  |  |
| [#11521869](https://tatoeba.org/en/sentences/show/11521869) | O quarto de Tom é muito pequeno. | Tom's room is very small. | Use |  |  |
| [#12080569](https://tatoeba.org/en/sentences/show/12080569) | Não há mesa na sala. | There is no table in the room. | Use |  |  |
| [#12347878](https://tatoeba.org/en/sentences/show/12347878) | A toalha é vermelha e branca. | The towel is red and white. | Use |  |  |
| [#13951110](https://tatoeba.org/en/sentences/show/13951110) | Alguém vai fechar a janela. | Someone will close the window. | Use |  |  |

## U87 · At Work

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S87101 | Meu irmão é enfermeiro. | My brother is a nurse. | Keep | Swap for #651607 (Sou enfermeira) for the feminine; otherwise keep. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S87102 | O pai dela é bombeiro. | Her father is a firefighter. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S87103 | A polícia está aqui. | The police are here. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S87104 | A florista é muito legal. | The florist is very nice. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S87105 | Minha mãe é florista. | My mother is a florist. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S87106 | O farmacêutico está na farmácia. | The pharmacist is at the pharmacy. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S87107 | O café está no balcão. | The coffee is on the counter. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S87108 | O homem do balcão é simpático. | The man at the counter is nice. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S87110 | Você tem internet em casa? | Do you have internet at home? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S87111 | Ele é enfermeiro no hospital. | He's a nurse at the hospital. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S87112 | A conta está no balcão. | The check is on the counter. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#931897](https://tatoeba.org/en/sentences/show/931897) | Como eu chamo a polícia? | How do I get to the police? | Use | How do I call the police? |  |
| [#384233](https://tatoeba.org/en/sentences/show/384233) | Eu não tenho um computador em casa. | I don't have a computer at home. | Use |  |  |
| [#651607](https://tatoeba.org/en/sentences/show/651607) | Sou enfermeira. | I'm a nurse. | Use |  |  |
| [#768547](https://tatoeba.org/en/sentences/show/768547) | Quero comprar um computador novo. | I want to buy a new computer. | Use |  |  |
| [#1503001](https://tatoeba.org/en/sentences/show/1503001) | A cor do computador é o vermelho. | The computer's color is red. | Reject |  | An odd line. |
| [#1667145](https://tatoeba.org/en/sentences/show/1667145) | É isto que o chefe quer. | That's what the boss wants. | Reject |  | A cleft sentence ("é isto que"), past A1. |
| [#3426816](https://tatoeba.org/en/sentences/show/3426816) | Sou o chefe, não sou? | I'm the boss, aren't I? | Use |  |  |
| [#3598287](https://tatoeba.org/en/sentences/show/3598287) | Você não sabe que sou seu chefe? | Don't you know I'm your boss? | Reject |  | A confrontational line. |
| [#3964937](https://tatoeba.org/en/sentences/show/3964937) | A filha dele é uma enfermeira. | His daughter is a nurse. | Use |  |  |
| [#4277986](https://tatoeba.org/en/sentences/show/4277986) | Essa moça é enfermeira. | That young lady is a nurse. | Use |  |  |
| [#10817829](https://tatoeba.org/en/sentences/show/10817829) | Tom é o dentista de Mary. | Tom is Mary's dentist. | Use |  | Tatoeba's Mary inside the Portuguese line; the drafts use Maria. |
| [#11204952](https://tatoeba.org/en/sentences/show/11204952) | Vou ao dentista. | I'm going to the dentist's. | Use |  |  |

## U94 · School + Study

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S94101 | Meu filho está no ensino fundamental. | My son is in elementary school. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94102 | Minha filha está no ensino médio. | My daughter is in high school. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94103 | Ela tem ensino superior. | She has a college education. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94104 | O ensino fundamental tem nove anos. | Elementary school lasts nine years. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94105 | O ensino médio tem três anos. | High school lasts three years. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94106 | Depois do ensino médio, vem o ensino superior. | After high school comes college. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94107 | A Ana é professora do ensino fundamental. | Ana is an elementary school teacher. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94108 | Você tem curso superior? | Do you have a college degree? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94109 | Eu estudo no instituto. | I study at the institute. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94110 | O instituto fica perto da universidade. | The institute is near the university. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94111 | Ele é professor no instituto. | He is a teacher at the institute. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94112 | Ele faz graduação em música. | He's doing a degree in music. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94113 | A graduação tem quatro anos. | The degree lasts four years. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94114 | Depois da graduação, vou viajar. | After graduation, I'm going to travel. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94115 | Faço um curso de inglês. | I'm taking an English course. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94116 | Vou começar o curso em março. | I'm going to start the course in March. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94117 | Que disciplina você vai estudar? | What subject are you going to study? | Keep |  | Correct; "matéria" is the everyday word for a school subject, disciplina the list word. |
| S94118 | Esta disciplina é difícil. | This subject is difficult. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94119 | A disciplina de inglês é às oito. | English class is at eight. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94120 | O semestre é de agosto a dezembro. | The semester runs from August to December. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94121 | Este semestre é difícil. | This semester is difficult. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94122 | Eu estudo no período da tarde. | I study in the afternoon session. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94123 | Estou no primeiro período. | I'm in my first term. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94124 | O recreio é às dez. | Recess is at ten. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94125 | No recreio, como uma maçã. | At recess, I eat an apple. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94126 | O recreio tem vinte minutos. | Recess lasts twenty minutes. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94127 | O ginásio da escola é grande. | The school gym is big. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94128 | Tem jogo no ginásio hoje. | There's a game in the gym today. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94129 | O ginásio fica perto do parque. | The gym is near the park. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94130 | Tiro uma nota boa em inglês. | I get a good grade in English. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94131 | Tiro uma foto da praia. | I take a picture of the beach. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S94132 | Eu tiro o lixo de manhã. | I take out the trash in the morning. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#1031544](https://tatoeba.org/en/sentences/show/1031544) | Eu não consigo tirar meus olhos dela. | I can't take my eyes off her. | Reject |  | An idiom (take my eyes off), and a love line. |
| [#1664977](https://tatoeba.org/en/sentences/show/1664977) | Ele é um universitário. | He's a university student. | Use |  |  |

## U28 · Explaining a Problem

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S28101 | Tem um acidente na rua. | There's an accident on the street. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S28102 | Tem um acidente perto da estação. | There's an accident near the station. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S28103 | Chame a polícia, é um acidente! | Call the police, it's an accident! | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S28104 | Chame uma ambulância, por favor! | Call an ambulance, please! | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S28105 | A ambulância está aqui. | The ambulance is here. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S28106 | A ambulância vem agora. | The ambulance is coming now. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#383112](https://tatoeba.org/en/sentences/show/383112) | Eu perdi minha chave. | I have lost my key. | Use |  |  |
| [#2969017](https://tatoeba.org/en/sentences/show/2969017) | Eu me perdi na floresta. | I got lost in the forest. | Use |  |  |
| [#4294095](https://tatoeba.org/en/sentences/show/4294095) | Esta é a caneta que perdi ontem. | This is the pen that I lost yesterday. | Reject |  | A relative clause, past A1. |

## U88 · Filling In Forms

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S88101 | Você tem identidade? | Do you have an ID card? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88102 | Posso ver sua identidade? | May I see your ID? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88103 | Aqui está minha identidade. | Here's my ID card. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88104 | Você tem um documento? | Do you have a document? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88105 | Qual é o número do documento? | What is the document number? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88106 | Assine o documento. | Sign the document. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88107 | Tem identificação? | Do you have identification? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88108 | A identificação, por favor. | Your identification, please. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88109 | Escreva o número de identificação. | Write the identification number. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88110 | Estado civil: casado. | Marital status: married. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88111 | Qual é o estado civil dela? | What is her marital status? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88112 | Ele está separado. | He's separated. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88113 | Sou separado. | I'm separated. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88114 | Meu pai é separado. | My father is separated. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88115 | Meu irmão é divorciado. | My brother is divorced. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88116 | Sou divorciada. | I'm divorced. | Keep | Swap for #2209520 (Não sou casada) if a casada line is wanted; otherwise keep. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88117 | A mãe dela é divorciada. | Her mother is divorced. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88118 | Ela é casada ou divorciada? | Is she married or divorced? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88119 | Sexo: feminino. | Sex: female. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88120 | Sexo: masculino. | Sex: male. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88121 | Sexo: masculino ou feminino? | Sex: male or female? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88122 | Gênero: feminino. | Gender: female. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88123 | Qual é o seu gênero? | What is your gender? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88124 | Escreva o seu gênero aqui. | Write your gender here. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88125 | Sou cidadão brasileiro. | I'm a Brazilian citizen. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88126 | Ele é cidadão português. | He is a Portuguese citizen. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88128 | Escreva o nome de usuário. | Write the username. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88129 | Qual é o seu email? | What's your email? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88130 | Escreva o seu email aqui. | Write your email here. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88131 | Você tem email? | Do you have an email address? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88132 | O email tem uma arroba. | The email address has an at sign. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88133 | Onde está a arroba? | Where is the at sign? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S88134 | A arroba fica no meio. | The at sign goes in the middle. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#667327](https://tatoeba.org/en/sentences/show/667327) | Eu sou casado. | I am married. | Use |  |  |
| [#2145701](https://tatoeba.org/en/sentences/show/2145701) | Eu sou casado e tenho uma filha. | I am married and I have a daughter. | Use |  |  |
| [#2196343](https://tatoeba.org/en/sentences/show/2196343) | Eu sou um homem casado. | I'm a married man. | Use |  |  |
| [#2209520](https://tatoeba.org/en/sentences/show/2209520) | Não sou casada. | I'm not married. | Use |  |  |
| [#2218899](https://tatoeba.org/en/sentences/show/2218899) | Sua filha mais velha está casada. | Her elder daughter is married. | Use |  |  |
| [#3070681](https://tatoeba.org/en/sentences/show/3070681) | Tom está casado há muito tempo. | Tom has been married a long time. | Reject |  | "Há" here means for (há muito tempo), a sense trap for há. |
| [#3755347](https://tatoeba.org/en/sentences/show/3755347) | Eu sou viúva. | I am a widow. | Use |  |  |
| [#6770428](https://tatoeba.org/en/sentences/show/6770428) | O Tom é casado agora. | Tom is married now. | Use |  |  |
| [#8238175](https://tatoeba.org/en/sentences/show/8238175) | Estou solteira. | I'm single. | Use |  |  |

## U89 · Messages + Postcards

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S89101 | Não tenho mensagens. | I have no messages. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89102 | Pode enviar a foto? | Can you send the photo? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89103 | Eu envio uma mensagem para você. | I'll send you a message. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89104 | Envio a carta amanhã. | I'll send the letter tomorrow. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89105 | Eu envio um email todo dia. | I send an email every day. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89106 | Eu mando uma foto. | I'll send a photo. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89107 | Mando um abraço. | I send you a hug. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89108 | Mando a carta hoje. | I'm sending the letter today. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89109 | Quanto custa um selo? | How much is a stamp? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89110 | Você tem uma chamada. | You have a call. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89111 | É uma chamada para você. | It's a call for you. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89112 | A chamada é de Portugal. | The call is from Portugal. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89113 | Pode fazer uma fotocópia? | Can you make a photocopy? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89114 | Quero uma fotocópia do passaporte. | I want a photocopy of the passport. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89115 | Quanto custa uma fotocópia? | How much is a photocopy? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89116 | Beijos, Ana. | Love, Ana. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89117 | Um abraço e beijos! | Hugs and kisses! | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S89118 | Beijos para a sua mãe. | Love to your mother. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#1388036](https://tatoeba.org/en/sentences/show/1388036) | De quem é esta carta? | Who is this letter from? | Use |  |  |
| [#10800580](https://tatoeba.org/en/sentences/show/10800580) | O endereço no envelope está errado. | The address on the envelope is wrong. | Use |  |  |
| [#10938441](https://tatoeba.org/en/sentences/show/10938441) | Eu quero um abraço. | I want a hug. | Use |  |  |

## U95 · At the Hotel

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S95101 | Quero um quarto duplo. | I want a double room. | Keep |  | Correct; Brazilian hotels also say "quarto de casal"; duplo is the list word. |
| S95102 | Um quarto duplo, por favor. | A double room, please. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95103 | Quanto custa o quarto duplo? | How much is the double room? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95104 | Um quarto individual, por favor. | A single room, please. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95105 | Tem quarto individual? | Do you have a single room? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95106 | O quarto individual é pequeno. | The single room is small. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95107 | O alojamento é caro. | Accommodation is expensive. | Keep |  | Correct, but "alojamento" is Portugal's word; Brazil says "hospedagem" or "acomodação". Alojamento is the list word; for Dan and the native checker. |
| S95108 | Procuro alojamento perto da praia. | I'm looking for accommodation near the beach. | Keep |  | As S95107 (alojamento / hospedagem). |
| S95109 | O alojamento tem café da manhã. | The accommodation has breakfast. | Keep |  | As S95107 (alojamento / hospedagem). |
| S95110 | Vamos para o camping. | Let's go to the campsite. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95111 | O camping fica perto do rio. | The campsite is near the river. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95112 | Gosto de camping. | I like camping. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95113 | A barraca é pequena. | The tent is small. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95114 | Tenho uma barraca nova. | I have a new tent. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95115 | A barraca está no carro. | The tent is in the car. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95116 | A tenda é grande. | The tent is big. | Keep |  | Correct in Portugal, where "tenda" is the camping tent; in Brazil a tenda is a canopy or stall and the camping tent is "barraca" (S95113). Tenda is the list word; the Glossary hint should say so. |
| S95117 | Onde está a tenda? | Where is the tent? | Keep |  | As S95116 (tenda / barraca). |
| S95118 | Boa estadia! | Enjoy your stay! | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95119 | A estadia é de três dias. | The stay is three days. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95120 | Quanto custa a estadia? | How much is the stay? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95121 | A chave está na recepção. | The key is at the front desk. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95122 | Onde fica a recepção? | Where is the front desk? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95123 | A recepção abre às sete. | Reception opens at seven. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95124 | No princípio, é difícil. | At first, it's difficult. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95125 | Pago no princípio do mês. | I pay at the beginning of the month. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95126 | Não sei o porquê. | I don't know why. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95127 | Você sabe o porquê? | Do you know why? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S95128 | Ele não diz o porquê. | He doesn't say why. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#340436](https://tatoeba.org/en/sentences/show/340436) | Eu perdi minha carteira. | I have lost my wallet. | Use |  |  |
| [#383816](https://tatoeba.org/en/sentences/show/383816) | Há elevador? | Is there an elevator? | Use |  |  |
| [#10784455](https://tatoeba.org/en/sentences/show/10784455) | Minha carteira é marrom. | My wallet is brown. | Use |  |  |

## Read and Answer texts

| ID | Text | Verdict | Fix | Reason |
| --- | --- | --- | --- | --- |
| R301 | Prato do dia (menu) | Keep |  | Natural Brazilian menu (arroz, feijão, frango); "R$ 25" as Brazil writes it; both answers unique. |
| R302 | Lanchonete Central (menu) | Keep |  | Natural (pão de queijo); both answers unique. |
| R303 | Restaurante do João (notice) | Keep |  | Natural ("fechado às segundas"); both answers unique. |
| R304 | Uma mensagem da Ana (message) | Keep |  | Natural você-imperatives; both answers unique. |
| R305 | Na cidade (sign) | Keep |  | Natural; both answers unique. |
| R306 | O hotel (notice) | Keep |  | Natural ("ponto de ônibus" is Brazilian); both answers unique. |
| R307 | Aluga-se (notice) | Keep |  | Natural Brazilian ad ("R$ 1.800 por mês"); both answers unique. |
| R308 | Uma mensagem da Maria (message) | Keep |  | Natural; both answers unique. |
| R309 | Quarto para estudante (notice) | Keep |  | Natural; both answers unique. |
| R310 | Vaga de emprego (notice) | Keep |  | Natural (garçom, "ligue para", a mobile number); both answers unique. |
| R311 | Meu trabalho (message) | Keep |  | Natural ("num hospital" is everyday Brazilian); both answers unique. |
| R312 | A empresa (notice) | Keep |  | Natural ("motorista", "carteira de motorista"); both answers unique. |
| R313 | Um cartão-postal da Ana (message) | Keep |  | Natural ("está calor"); both answers unique. |
| R314 | Uma mensagem do Tom (message) | Keep |  | Natural ("Oi, Maria"); both answers unique. |
| R315 | Um bilhete (message) | Keep |  | Natural ("geladeira"); both answers unique. |

## Task items (Write the Number, Fill the Form, Write a Message)

| ID | Item | Verdict | Fix | Reason |
| --- | --- | --- | --- | --- |
| N301 | Um café custa cinco reais. → 5 | Keep |  | Natural. |
| N302 | São doze reais e cinquenta. → 12,50 | Keep |  | Natural; the comma decimal as Brazil writes it. |
| N303 | O prato do dia custa vinte e cinco reais. → 25 | Keep |  | Natural; matches R301. |
| N304 | A conta é de quarenta e dois reais. → 42 | Keep |  | Natural. |
| N305 | A farmácia fica a cem metros. → 100 | Keep |  | Natural. |
| N306 | O museu fica a trezentos metros. → 300 | Keep |  | Natural. |
| N307 | Pegue o ônibus número oito. → 8 | Keep |  | Natural você-imperative. |
| N308 | O ônibus passa às sete e quinze. → 7:15 | Keep |  | Natural. |
| N309 | Moro no número vinte e seis. → 26 | Keep |  | Natural. |
| N310 | A reunião é às dez e meia. → 10:30 | Keep |  | Natural. |
| N311 | Meu celular é nove, oito, sete, doze, vinte, dezoito. → 987 12 20 18 | Keep |  | Natural: a Brazilian mobile starts with 9; the key matches. |
| N312 | Eu nasci no dia doze de março. → 12/3 | Keep |  | Natural. |
| F301 | Ana Costa, brasileira, 10 de abril, São Paulo, casada, Rua das Flores 12, Rio | Keep |  | Natural; "Nome completo" as Brazilian forms have it; good alternates. |
| F302 | João Silva, 30, enfermeiro, Recife, solteiro | Keep |  | Natural ("num hospital"). |
| F303 | Na lanchonete: Tom um café e um pão de queijo, Maria um suco, 20 reais | Keep |  | Natural; a listening-style card. |
| P301 | Family: who and what they are like, 20–35 words | Keep |  | Clear. |
| P302 | Home: where and which rooms, 20–35 words | Keep |  | Clear. |
| P303 | Postcard: where, weather, what you do, 20–35 words | Keep |  | Clear. |
| P304 | Reply to a party invitation, 20–35 words | Keep |  | Clear. |
