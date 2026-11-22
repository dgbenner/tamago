# Tamago Brazilian Portuguese check, A1 Part 2, 2026-11-19

Quality pass on Brazilian Portuguese A1 Part 2, change no code. Three sets: the Tatoeba candidates kept out only by the trust rule (134 distinct sentences in `_review/portuguese-part2-candidates.md`), each marked **Use** or **Reject**, with European phrasing rejected; the 197 drafts in `_review/portuguese-part2-drafts.md`, each marked **Keep**, **Fix** (with the corrected Portuguese and English) or **Cut**, with a swap named where a Use candidate teaches the same word; and the 9 Read and Answer texts, checked for natural Brazilian Portuguese, clear questions and one fitting answer each. The task items (Write the Number, Fill the Form, Write a Message) are at the end. Meanings and verb forms were checked against the course's Wiktionary data in content-pt/checks (words.json, conjugations.json), not memory. The candidates file carries the same marks in place. This is a reviewer's read, not a native speaker's.

## Counts

- Candidates: **Use 119** · **Reject 15** (14 of the Use marks name the English to show).
- Drafts: **Keep 197** · **Fix 0** · **Cut 0**; 7 drafts have a swap named.
- Read and Answer texts: **Keep 9** · **Fix 0**. Task items: Keep 19 · Fix 0.
- Draft fixes: none; all 197 drafts read as Brazilian (você, tem for there is, celular, todo dia). Text fixes: none. Task item fixes: none. The files for Parts 2 and 3 were not in this worktree's _review; the copies dated November 16 in the main tree matched this worktree's sentences line for line (197 and 261 drafts, no text differences), so they were copied here and marked.
- Reject reasons, most common first: proverbs and idioms (tudo tem um preço, dinheiro não se come, claro como a água, me serve bem); remarks on looks; love or break-up lines; one European dropped-subject line (#2700051); one sense trap (real as the adjective); impersonal se; odd lines.
- Two word-for-word matches are swaps (S48126, S48128); five more swaps are named.
- Watch items: no draft uses tu forms, "tenho de", "estar a" + infinitive or European vocabulary; "código postal" (S45107, S45108) is the one European term, kept because postal is the list word. Por que / porque: no Part 2 draft uses either; the one candidate with it (#1428339 "Por que o céu é azul?") has the open question form right. Como as "like": no draft or candidate; Part 2's only como is "Eu como um ovo" (I eat), the verb, which the Glossary should keep apart from the como of Part 1.
- Accent-only pairs: Part 2 adds **país** W869 (U45), whose twin **pais** (parents) comes in Part 4 (U85), so the two are never in one part. The course's other pairs are é / e, a / à, está / esta, tem / têm, as / às, que / quê, porque / porquê, dá / da and avô / avó; the ones that share a part are flagged in the Part 3 and Part 4 checks. No two sentences in Parts 2 to 4 differ only by accents.
- Glossary senses to re-pick or hint (checked in content-pt/checks/words.json): **caro** W915 "greatly valued; dear; loved; lovable" is the wrong sense for a prices circle: show "expensive" (cara W916 already has it). **quadro** W1126 "painting; picture": the classroom circle means the board; show "board (whiteboard, blackboard)". **turma** W1116 "a group of people": show "class (of students)". **aula** W1115 "lecture, lesson; class, auditorium": show "class, lesson". **colega** W1132 "colleague": the drafts mean classmate; show "classmate; colleague". **calças** W1102 "pants": show "trousers (Brazil usually a calça)". **relógio** W1111 "clock": the Clothes circle means a watch; show "watch; clock". **ligar** W820 "to link; to connect; to join": the phone circle means to call; show "to call (on the phone); to turn on". **dezenove** W831 "Brazilian Portuguese standard form of dezanove": show "nineteen". **parabéns** W838 "happy birthday!": show "congratulations; happy birthday". **nasci** W839: show "I was born". **queria** W894 "imperfect indicative of querer": show "I would like (polite)". **senhora** W803 "lady": show "madam, Mrs". **me** W941 "reflexive pronoun; myself": show "me (object): me chamo, me ajudar". **postal** W873 "postal": hint "código postal = postal code; Brazil says CEP". **real** W912: show "real (the Brazilian currency)". **nota** W925 "note": show "banknote; grade". **loiro** W1139 "alternative form of louro": show "blond". **combinado** W905 has a paragraph gloss: show "deal, agreed". **chinês** W884 and **sujo** W1159 have long glosses: trim. **estrangeiro** W885 "foreigner": also the adjective foreign. **gorda**, **baixa**, **morena**, **loira**, **má**, **brasileira**, **barata**, **toda**: "feminine singular of …" should show the meaning. **chamo** W805, **apresento** W807, **escreve** W812, **posso** W815, **custa** W909, **custam** W910, **pago** W920, **moro** W861, **mora** W862, **vivo** W864, **vive** W865, **falo** W886, **compro** W892, **quero** W893, **espera** W846 are "inflection of …" strings: show "my name is (me chamo)", "I introduce", "writes", "I can", "costs", "cost", "I pay", "I live", "lives", "I live", "lives", "I speak", "I buy", "I want", "wait!".
- Conjugation tables (content-pt/checks/conjugations.json): every present table matches the taught forms, with the você / ele form as Brazil uses it. **queria** W894 and **nasci** W839 point at present-tense tables that never show them; the Glossary should say "I would like (polite)" and "I was born (past)". No verb in the part is without a table.

## U41 · Your Name, Please

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S41101 | Meu sobrenome é Silva. | My surname is Silva. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S41102 | O sobrenome dela é Costa. | Her surname is Costa. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S41103 | Bom dia, senhora. | Good morning, madam. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S41104 | A senhora é professora? | Are you a teacher, madam? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S41105 | Muito prazer, eu sou Ana. | Nice to meet you, I'm Ana. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S41106 | Eu me chamo Ana. | My name is Ana. | Keep | Swap for #5040363 (Tom quer me conhecer) only for me; otherwise keep. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S41107 | Me chamo João. | My name is João. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S41109 | Vou apresentar meu amigo. | I'm going to introduce my friend. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S41110 | Vou apresentar minha mãe. | I'm going to introduce my mother. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S41111 | Apresento meu amigo João. | This is my friend João. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S41112 | Apresento minha mãe. | This is my mother. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S41113 | Eu apresento a Ana. | I'll introduce Ana. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#13956385](https://tatoeba.org/en/sentences/show/13956385) | A senhora é uma mulher alta. | You're a tall woman. | Reject |  | A remark on looks. |
| [#950326](https://tatoeba.org/en/sentences/show/950326) | Isso me serve bem. | It suits me. | Reject |  | "Me serve bem" (suits me) is an idiom. |
| [#3128708](https://tatoeba.org/en/sentences/show/3128708) | Não conheço Tom. | I don't know Tom. | Use |  |  |
| [#5040363](https://tatoeba.org/en/sentences/show/5040363) | Tom quer me conhecer. | Tom wants to meet me. | Use |  |  |
| [#13142287](https://tatoeba.org/en/sentences/show/13142287) | Você pode me dizer seu nome? | May I have your name? | Use | Can you tell me your name? |  |

## U54 · Clothes

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S54101 | Onde está a roupa? | Where are the clothes? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S54102 | A roupa é bonita. | The clothes are nice. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S54103 | Minha roupa está na cama. | My clothes are on the bed. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S54104 | As calças são azuis. | The trousers are blue. | Keep |  | Correct; Brazil more often says the singular "a calça é azul", with "as calças" also heard. |
| S54105 | Onde estão as calças? | Where are the trousers? | Keep |  | As S54104 (a calça / as calças). |
| S54106 | A saia é vermelha. | The skirt is red. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S54107 | Tenho uma saia nova. | I have a new skirt. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S54108 | Ela gosta de saia. | She likes skirts. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S54109 | A camiseta é branca. | The T-shirt is white. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S54110 | Tenho uma camiseta verde. | I have a green T-shirt. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S54111 | O sapato é preto. | The shoe is black. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S54112 | Onde está meu sapato? | Where's my shoe? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S54113 | Meu relógio é novo. | My watch is new. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S54114 | Qual é o seu tamanho? | What size are you? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S54115 | Vou usar o casaco. | I'm going to wear the coat. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#341091](https://tatoeba.org/en/sentences/show/341091) | Que horas são no seu relógio? | What time is it by your watch? | Use |  |  |
| [#769622](https://tatoeba.org/en/sentences/show/769622) | Meu vestido novo é vermelho. | My new dress is red. | Use |  |  |
| [#1352127](https://tatoeba.org/en/sentences/show/1352127) | Você pode usar minha bicicleta. | You can use my bicycle. | Use |  |  |
| [#2197331](https://tatoeba.org/en/sentences/show/2197331) | Você pode usar meu novo carro. | You may use my new car. | Use |  |  |

## U34 · Spelling It Out

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S34101 | Que letra é essa? | What letter is that? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S34102 | A letra é A. | The letter is A. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S34103 | Não sei essa letra. | I don't know that letter. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S34104 | Pode soletrar, por favor? | Can you spell it, please? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#10734212](https://tatoeba.org/en/sentences/show/10734212) | Pode soletrar? | Can you spell it out? | Use |  |  |
| [#10734211](https://tatoeba.org/en/sentences/show/10734211) | Você pode soletrar? | Can you spell it out? | Use |  |  |
| [#1011195](https://tatoeba.org/en/sentences/show/1011195) | Não posso. | I can't. | Use |  |  |
| [#1207084](https://tatoeba.org/en/sentences/show/1207084) | Você pode escrever seu nome aqui? | Can you write your name here? | Use |  |  |
| [#1843794](https://tatoeba.org/en/sentences/show/1843794) | Posso dançar aqui? | Can I dance here? | Use |  |  |
| [#2824465](https://tatoeba.org/en/sentences/show/2824465) | O que posso dizer? | What can I say? | Use |  |  |
| [#2911530](https://tatoeba.org/en/sentences/show/2911530) | Posso usar seu banheiro, por favor? | Can I use your toilet, please? | Use |  |  |
| [#3752410](https://tatoeba.org/en/sentences/show/3752410) | Eu posso falar com o Tom? | May I speak to Tom? | Use |  |  |

## U42 · Phone Numbers

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S42101 | Vou telefonar amanhã. | I'll phone tomorrow. | Keep |  | Correct; Brazilians more often say "ligar", and telefonar is the list word. |
| S42102 | Vou telefonar para a Ana. | I'm going to phone Ana. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42103 | Pode telefonar agora? | Can you phone now? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42104 | Meu número é zero, três, onze, quinze. | My number is zero, three, eleven, fifteen. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42105 | O número é zero, sete, doze, dezesseis. | The number is zero, seven, twelve, sixteen. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42106 | O número dela é zero, dois, dezoito, dezenove. | Her number is zero, two, eighteen, nineteen. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42107 | Tenho doze livros. | I have twelve books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42108 | Tem doze crianças. | There are twelve children. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42109 | São treze livros. | That's thirteen books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42110 | Tenho catorze livros. | I have fourteen books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42111 | Tem catorze cachorros. | There are fourteen dogs. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42112 | Tenho quinze livros. | I have fifteen books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42113 | São quinze maçãs. | That's fifteen apples. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42114 | Tenho dezesseis livros. | I have sixteen books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42115 | São dezesseis crianças. | There are sixteen children. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42116 | Tenho dezoito amigos. | I have eighteen friends. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42117 | São dezoito crianças. | There are eighteen children. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42118 | Tenho dezenove livros. | I have nineteen books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42119 | São dezenove gatos. | There are nineteen cats. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42120 | Qual é o código? | What's the code? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42121 | O código é zero, três. | The code is zero, three. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S42122 | Não sei o código. | I don't know the code. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#517761](https://tatoeba.org/en/sentences/show/517761) | Onde posso telefonar? | Where can I make a phone call? | Use |  |  |
| [#1163592](https://tatoeba.org/en/sentences/show/1163592) | Você tem celular? | Do you have a smartphone? | Use | Do you have a cell phone? |  |
| [#3139262](https://tatoeba.org/en/sentences/show/3139262) | Ela tem dezessete anos. | She's seventeen years old. | Use |  |  |
| [#3640114](https://tatoeba.org/en/sentences/show/3640114) | Ela tem telefone. | She has a telephone. | Use |  |  |
| [#10787985](https://tatoeba.org/en/sentences/show/10787985) | O Tom tem seu número? | Does Tom have your number? | Use |  |  |

## U43 · Age + Birthdays

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S43103 | Ela tem doze meses. | She's twelve months old. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S43104 | Ela tem seis meses. | She's six months old. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S43105 | São dois meses. | It's two months. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S43106 | A criança vai nascer hoje. | The baby is going to be born today. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S43107 | Quando vai nascer? | When is it due? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S43108 | Vai nascer amanhã. | It's going to be born tomorrow. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S43109 | É a data de nascimento dela. | It's her date of birth. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S43110 | Ele é idoso. | He's elderly. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S43111 | O homem idoso está cansado. | The old man is tired. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S43112 | Ela tem um mês. | She's one month old. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S43113 | Qual é a data de nascimento dele? | What's his date of birth? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#3750434](https://tatoeba.org/en/sentences/show/3750434) | Em qual mês nós estamos? | Which month is it now? | Use | What month are we in? |  |

## U55 · In Class

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S55101 | A turma é grande. | The class is big. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S55102 | Minha turma é pequena. | My class is small. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S55103 | A turma está na escola. | The class is at school. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S55104 | A página é branca. | The page is white. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S55105 | O papel está na mesa. | The paper is on the table. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S55106 | O quadro é branco. | The board is white. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S55107 | O quadro é verde. | The board is green. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S55108 | O quadro é grande. | The board is big. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S55109 | O exame é amanhã. | The exam is tomorrow. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S55110 | Tenho um exame hoje. | I have an exam today. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S55111 | O exame é hoje. | The exam is today. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S55112 | Ela é minha colega. | She's my classmate. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#438219](https://tatoeba.org/en/sentences/show/438219) | Hoje temos exame de inglês. | We have an examination in English today. | Use |  |  |
| [#1032854](https://tatoeba.org/en/sentences/show/1032854) | Hoje não temos aula. | We have no class today. | Use |  |  |
| [#1157437](https://tatoeba.org/en/sentences/show/1157437) | Eu estudo inglês. | I study English. | Use |  |  |
| [#1207161](https://tatoeba.org/en/sentences/show/1207161) | Eu tenho uma caneta. | I have a pen. | Use |  |  |
| [#1249637](https://tatoeba.org/en/sentences/show/1249637) | Aqui está uma caneta para você usar. | Here's a pen for you to use. | Use |  |  |
| [#1309197](https://tatoeba.org/en/sentences/show/1309197) | Eu não posso responder à sua pergunta. | I can't answer your question. | Use |  |  |
| [#1341927](https://tatoeba.org/en/sentences/show/1341927) | Posso usar seu lápis? | May I use your pencil? | Use |  |  |
| [#1354321](https://tatoeba.org/en/sentences/show/1354321) | Eu não sou um estudante. | I am not a student. | Use | I'm not a student. |  |
| [#1453126](https://tatoeba.org/en/sentences/show/1453126) | Você tem que responder à pergunta. | You must answer the question. | Use |  |  |
| [#1458336](https://tatoeba.org/en/sentences/show/1458336) | Leio para aprender. | I read in order to learn. | Use |  |  |
| [#1846446](https://tatoeba.org/en/sentences/show/1846446) | Você vai aprender inglês? | Are you going to learn English? | Use |  |  |
| [#2193717](https://tatoeba.org/en/sentences/show/2193717) | Não é uma aula. | It's not a class. | Use |  |  |
| [#2924730](https://tatoeba.org/en/sentences/show/2924730) | Onde fica a biblioteca? | Where's the library? | Use |  |  |
| [#3091211](https://tatoeba.org/en/sentences/show/3091211) | Tenho que estudar amanhã. | I have to study tomorrow. | Use |  |  |
| [#3304098](https://tatoeba.org/en/sentences/show/3304098) | Tenho muitos lápis. | I have a lot of pencils. | Use |  |  |
| [#3386194](https://tatoeba.org/en/sentences/show/3386194) | Vou perguntar ao Tom. | I'll go ask Tom. | Use |  |  |
| [#3936699](https://tatoeba.org/en/sentences/show/3936699) | Você é um estudante aqui? | Are you a student here? | Use |  |  |

## U35 · Checking Numbers

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S35101 | Um momento, por favor. | One moment, please. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S35102 | Espera aqui. | Wait here. | Keep |  | "Espera" is the tu-form imperative, which is also everyday spoken Brazilian ("espera aí"); the você form is "espere". The course teaches espera (W846), so it stays; one for the native checker. |
| S35103 | Espera um momento. | Wait a moment. | Keep |  | As S35102 (espera / espere). |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#1667213](https://tatoeba.org/en/sentences/show/1667213) | Não estou certo. | I am not sure. | Use | I'm not sure. |  |
| [#3139275](https://tatoeba.org/en/sentences/show/3139275) | Isso está errado. | This is incorrect. | Use | That's wrong. |  |
| [#3689591](https://tatoeba.org/en/sentences/show/3689591) | Eu sei que estou errado. | I know I'm wrong. | Use |  |  |
| [#3752419](https://tatoeba.org/en/sentences/show/3752419) | Está errado? | Is that wrong? | Use |  |  |

## U44 · Numbers to 100

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S44101 | Tenho cinquenta livros. | I have fifty books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44102 | São cinquenta crianças. | There are fifty children. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44103 | Ele tem cinquenta anos. | He's fifty years old. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44104 | Ela tem sessenta anos. | She's sixty years old. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44105 | São sessenta livros. | That's sixty books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44106 | Tenho sessenta livros. | I have sixty books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44107 | Meu pai tem setenta anos. | My father is seventy years old. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44108 | São setenta crianças. | There are seventy children. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44109 | Tenho setenta livros. | I have seventy books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44110 | Ela tem noventa anos. | She's ninety years old. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44111 | São noventa livros. | There are ninety books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44112 | São noventa e nove livros. | That's ninety-nine books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44113 | Tenho cem livros. | I have a hundred books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44114 | São quinhentos livros. | There are five hundred books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44115 | A cidade tem quinhentos anos. | The city is five hundred years old. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44116 | Tenho quinhentos amigos. | I have five hundred friends. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44117 | Um milhão é muito. | A million is a lot. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S44118 | São um milhão de crianças. | There are a million children. | Keep |  | Correct; "é um milhão de crianças" (singular with milhão) is the careful form, "são" the common one. |
| S44119 | Tenho um milhão de livros. | I have a million books. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#1859543](https://tatoeba.org/en/sentences/show/1859543) | Nós temos quarenta e cinco. | We have forty-five. | Reject |  | An odd line (forty-five of what). |

## U45 · Where You Live

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S45101 | A avenida é grande. | The avenue is big. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S45102 | Onde fica a avenida? | Where's the avenue? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S45103 | A loja fica na avenida. | The shop is on the avenue. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S45104 | A praça é bonita. | The square is beautiful. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S45105 | A igreja fica na praça. | The church is on the square. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S45106 | Onde fica a praça? | Where's the square? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S45107 | Qual é o código postal? | What's the postcode? | Keep |  | Correct Portuguese, but "código postal" is the European term; a Brazilian asks "Qual é o CEP?". Postal (W873) is the list word, so the line stays; flag for Dan and the native checker. |
| S45108 | Não sei o código postal. | I don't know the postcode. | Keep |  | "Código postal" as S45107 (Brazil: CEP). |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#379004](https://tatoeba.org/en/sentences/show/379004) | Ele mora aqui? | Does he live here? | Use |  |  |
| [#774893](https://tatoeba.org/en/sentences/show/774893) | Vivo em uma cidade pequena. | I live in a small town. | Use |  |  |
| [#791714](https://tatoeba.org/en/sentences/show/791714) | Seu nome e endereço, por favor. | Name and address, please. | Use |  |  |
| [#1337856](https://tatoeba.org/en/sentences/show/1337856) | De que país é você? | Which country are you from? | Use | What country are you from? |  |
| [#1749469](https://tatoeba.org/en/sentences/show/1749469) | Ele mora longe de sua família. | He lives apart from his family. | Use | He lives far from his family. |  |
| [#2403637](https://tatoeba.org/en/sentences/show/2403637) | É aqui que eu moro. | It is here where I live. | Use |  |  |
| [#2700051](https://tatoeba.org/en/sentences/show/2700051) | Em qual cidade mora? | What city do you live in? | Reject |  | The subject is dropped ("mora" alone), European phrasing; Brazil says "em que cidade você mora?". |
| [#3243863](https://tatoeba.org/en/sentences/show/3243863) | Ele não mora mais aqui. | He no longer lives here. | Use |  |  |
| [#3387272](https://tatoeba.org/en/sentences/show/3387272) | Ele não mora mais lá. | He does not live there any more. | Use |  |  |
| [#9691414](https://tatoeba.org/en/sentences/show/9691414) | Ela mora na cidade. | She lives in the city. | Use |  |  |
| [#10459541](https://tatoeba.org/en/sentences/show/10459541) | Não posso viver com você. | I can't live with you. | Reject |  | A break-up line. |
| [#10817850](https://tatoeba.org/en/sentences/show/10817850) | Tom sabe onde eu moro? | Does Tom know where I live? | Use |  |  |

## U56 · Looks

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S56101 | O gato é gordo. | The cat is fat. | Keep | Swap for #10744225 (Seu gato é gordo), the same words on Tatoeba. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56102 | A Maria é gorda e feliz. | Maria is plump and happy. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56103 | A menina não é gorda. | The girl isn't plump. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56104 | Minha amiga é gorda e bonita. | My friend is plump and pretty. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56105 | Ela é baixa. | She's short. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56106 | A menina é baixa. | The girl is short. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56107 | Ele é moreno. | He's dark-haired. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56108 | O João é moreno. | João is dark-haired. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56109 | Meu pai é moreno. | My father is dark-haired. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56110 | Ela é morena. | She's dark-haired. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56111 | A Ana é morena. | Ana is dark-haired. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56112 | Minha mãe é morena. | My mother is dark-haired. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56113 | Ele é ruivo. | He's a redhead. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56114 | O menino é ruivo. | The boy has red hair. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56115 | Meu amigo é ruivo. | My friend has red hair. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56116 | O professor é simpático. | The teacher is nice. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56117 | O homem é antipático. | The man is unfriendly. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56118 | Ela é alegre. | She's cheerful. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56119 | O menino está alegre. | The boy is happy. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S56120 | A música é alegre. | The music is cheerful. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#10744225](https://tatoeba.org/en/sentences/show/10744225) | Seu gato é gordo. | Your cat is fat. | Use |  |  |
| [#3128611](https://tatoeba.org/en/sentences/show/3128611) | Estou muito gordo. | I'm so fat. | Use |  |  |
| [#11520833](https://tatoeba.org/en/sentences/show/11520833) | Ela não é gorda. | She's not fat. | Reject |  | A remark on looks. |
| [#4115202](https://tatoeba.org/en/sentences/show/4115202) | O Tom é antipático, não é? | Tom's mean, isn't he? | Use |  |  |
| [#1307574](https://tatoeba.org/en/sentences/show/1307574) | Esse livro é interessante. | This book is interesting. | Use |  |  |
| [#1487985](https://tatoeba.org/en/sentences/show/1487985) | Está um dia agradável, não está? | It's a pleasant day, isn't it? | Use |  |  |
| [#4453761](https://tatoeba.org/en/sentences/show/4453761) | Tom é interessante. | Tom is interesting. | Use |  |  |
| [#12360515](https://tatoeba.org/en/sentences/show/12360515) | Seu livro é interessante. | Your book is interesting. | Use |  |  |

## U46 · Countries + Languages

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S46101 | Moro no México. | I live in Mexico. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S46102 | O México é grande. | Mexico is big. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S46103 | Você mora no México? | Do you live in Mexico? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S46104 | A China é grande. | China is big. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S46105 | Ele mora na China. | He lives in China. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S46106 | Ele é mexicano. | He's Mexican. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S46107 | Meu amigo é mexicano. | My friend is Mexican. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S46108 | Minha mãe é brasileira. | My mother is Brazilian. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#989765](https://tatoeba.org/en/sentences/show/989765) | Eu estou em Portugal. | I'm in Portugal. | Use |  |  |
| [#1207023](https://tatoeba.org/en/sentences/show/1207023) | Não, eu não falo inglês. | No, I can't speak English. | Use | No, I don't speak English. |  |
| [#2219020](https://tatoeba.org/en/sentences/show/2219020) | Meu professor de chinês é um homem. | My Chinese teacher is a man. | Use |  |  |
| [#4441593](https://tatoeba.org/en/sentences/show/4441593) | Desculpe, eu não falo português. | I'm sorry, I don't speak Portuguese. | Use |  |  |
| [#8506434](https://tatoeba.org/en/sentences/show/8506434) | Não, não falo inglês. | No, I don't speak English. | Use |  |  |

## U47 · At the Market

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S47101 | Compro pão. | I buy bread. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S47102 | Compro um livro. | I'm buying a book. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S47103 | Compro leite. | I buy milk. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S47104 | Eu queria um café, por favor. | I'd like a coffee, please. | Keep | Swap for #3867545 (Eu queria um copo de vinho), the same word on Tatoeba. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S47105 | Queria uma água. | I'd like a water. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S47106 | Um quilo de maçãs, por favor. | A kilo of apples, please. | Keep | Swap for #1489090 (Quanto custa uma maçã?) if a second maçã line is wanted; otherwise keep. | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S47107 | Quero um quilo de batata. | I want a kilo of potatoes. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S47108 | Um quilo de queijo. | A kilo of cheese. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S47109 | Eu como um ovo. | I eat an egg. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S47110 | O ovo é grande. | The egg is big. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S47111 | O tomate é vermelho. | The tomato is red. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S47112 | Quero um tomate. | I want a tomato. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S47113 | A batata é grande. | The potato is big. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S47114 | Eu gosto de batata. | I like potatoes. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#2191908](https://tatoeba.org/en/sentences/show/2191908) | Ela queria me conhecer. | She wanted to meet me. | Use |  |  |
| [#980240](https://tatoeba.org/en/sentences/show/980240) | Quero um livro para ler no trem. | I want a book to read on the train. | Use |  |  |
| [#1194001](https://tatoeba.org/en/sentences/show/1194001) | Você gosta de fruta. | You like fruit. | Use |  |  |
| [#1558047](https://tatoeba.org/en/sentences/show/1558047) | Eu quero mais. | I want more. | Use |  |  |
| [#1762085](https://tatoeba.org/en/sentences/show/1762085) | Não quero ler esse livro. | I don't want to read this book. | Use |  |  |
| [#1841200](https://tatoeba.org/en/sentences/show/1841200) | Eu não quero isso. | I don't want it. | Use |  |  |
| [#2178685](https://tatoeba.org/en/sentences/show/2178685) | Eu quero falar com ele. | I want to talk to him. | Use |  |  |
| [#3087483](https://tatoeba.org/en/sentences/show/3087483) | Não quero mais isso. | I don't want this anymore. | Use |  |  |
| [#3216352](https://tatoeba.org/en/sentences/show/3216352) | Eu quero comprar um livro. | I want to buy a book. | Use |  |  |
| [#3844444](https://tatoeba.org/en/sentences/show/3844444) | Eu quero um cachorro novo. | I want a new dog. | Use |  |  |
| [#4737892](https://tatoeba.org/en/sentences/show/4737892) | Não quero nadar. | I don't want to swim. | Use |  |  |
| [#5873480](https://tatoeba.org/en/sentences/show/5873480) | Gosto muito de comprar livros. | I really like to buy books. | Use |  |  |
| [#6888235](https://tatoeba.org/en/sentences/show/6888235) | Onde posso comprar maçãs? | Where can I buy apples? | Use |  |  |
| [#8556949](https://tatoeba.org/en/sentences/show/8556949) | Não, não quero. | No, I don't want to. | Use |  |  |
| [#10733383](https://tatoeba.org/en/sentences/show/10733383) | Quero uma família grande. | I want a large family. | Use |  |  |

## U57 · Opposites

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S57101 | O pão está duro. | The bread is hard. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S57102 | O pão está mole. | The bread is soft. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S57103 | O queijo é mole. | The cheese is soft. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S57104 | A cama é mole. | The bed is soft. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S57105 | O sapato é largo. | The shoe is wide. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S57106 | O casaco é largo. | The coat is loose. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S57107 | O carro é largo. | The car is wide. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S57108 | O cachorro não é mau. | The dog isn't bad. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#10481378](https://tatoeba.org/en/sentences/show/10481378) | Sou um mau rapaz. | I'm a bad boy. | Reject |  | An odd line (a song title). |
| [#340416](https://tatoeba.org/en/sentences/show/340416) | Hoje está muito quente. | It's very hot today. | Use |  |  |
| [#651797](https://tatoeba.org/en/sentences/show/651797) | Não é fácil para ele aprender inglês. | It is not easy for him to learn English. | Use |  |  |
| [#947208](https://tatoeba.org/en/sentences/show/947208) | É difícil aprender inglês. | English is difficult to learn. | Use |  |  |
| [#1035982](https://tatoeba.org/en/sentences/show/1035982) | É difícil falar bem inglês. | It's difficult to speak English well. | Use |  |  |
| [#1342071](https://tatoeba.org/en/sentences/show/1342071) | Minha mão está em água quente. | My hand is in warm water. | Use | My hand is in hot water. |  |
| [#2806416](https://tatoeba.org/en/sentences/show/2806416) | O banheiro está sujo. | The bathroom is dirty. | Use |  |  |
| [#3813535](https://tatoeba.org/en/sentences/show/3813535) | Essa cidade é difícil de se viver. | This city is hard to live in. | Reject |  | Impersonal "se viver" is past A1. |
| [#3813713](https://tatoeba.org/en/sentences/show/3813713) | Não tem água quente. | There is no hot water. | Use |  |  |
| [#4031633](https://tatoeba.org/en/sentences/show/4031633) | A resposta não é fácil? | Isn't the answer easy? | Use |  |  |
| [#4424545](https://tatoeba.org/en/sentences/show/4424545) | O Tom é fraco. | Tom's weak. | Use |  |  |
| [#6478400](https://tatoeba.org/en/sentences/show/6478400) | É muito importante para nós. | It's very important to us. | Use |  |  |
| [#12201086](https://tatoeba.org/en/sentences/show/12201086) | Essa não é uma pergunta difícil. | That's not a hard question. | Use |  |  |
| [#12201088](https://tatoeba.org/en/sentences/show/12201088) | Não é uma pergunta difícil. | That's not a hard question. | Use |  |  |

## U36 · Checking You Understood

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S36101 | Combinado! | Deal! | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S36102 | Amanhã, combinado? | Tomorrow, OK? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S36103 | Está combinado. | It's agreed. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#340991](https://tatoeba.org/en/sentences/show/340991) | Eu conheço a verdade. | I know the truth. | Use |  |  |
| [#941503](https://tatoeba.org/en/sentences/show/941503) | É claro que ela pode falar inglês. | Of course she can speak English. | Use |  |  |
| [#4156241](https://tatoeba.org/en/sentences/show/4156241) | Quero exatamente o que você quer. | I want exactly what you want. | Use |  |  |
| [#8282700](https://tatoeba.org/en/sentences/show/8282700) | Está claro como a água. | It's clear as water. | Reject |  | An idiom (clear as water). |
| [#10790324](https://tatoeba.org/en/sentences/show/10790324) | Eu sei exatamente quem você é. | I know exactly who you are. | Use |  |  |

## U48 · How Much Is It?

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S48101 | Quanto custam as maçãs? | How much are the apples? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48102 | Os livros custam dez reais. | The books cost ten reais. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48103 | Os sapatos custam muito. | The shoes cost a lot. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48104 | Vai custar dez reais. | It's going to cost ten reais. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48106 | Custa um real. | It costs one real. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48107 | O café custa um real. | The coffee costs one real. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48108 | Um real, por favor. | One real, please. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48109 | Custa dez reais. | It costs ten reais. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48110 | São vinte reais. | That's twenty reais. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48111 | Tenho cinquenta reais. | I have fifty reais. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48112 | Custa cinquenta centavos. | It costs fifty centavos. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48113 | São noventa centavos. | That's ninety centavos. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48114 | Custa um real e cinquenta centavos. | It costs one real fifty. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48115 | A camisa é cara. | The shirt is expensive. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48116 | Essa casa é cara. | That house is expensive. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48117 | A loja é cara. | The shop is expensive. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48118 | A camisa é barata. | The shirt is cheap. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48119 | Essa saia é barata. | That skirt is cheap. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48120 | A loja é barata. | The shop is cheap. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48121 | Tenho uma moeda. | I have a coin. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48122 | Essa moeda é de um real. | That coin is one real. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48123 | Tenho uma nota de dez reais. | I have a ten-real note. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48124 | A nota é nova. | The note is new. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48125 | Essa nota é de cinquenta reais. | That note is fifty reais. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48126 | A conta, por favor. | The bill, please. | Keep | Swap for #340431, the same sentence. | Word for word on Tatoeba (A conta, por favor). |
| S48127 | A conta é de vinte reais. | The bill is twenty reais. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48128 | Quanto custa? | How much is it? | Keep | Swap for #340430, the same sentence. | Word for word on Tatoeba (Quanto custa?). |
| S48129 | Quanto custa o pão? | How much is the bread? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S48130 | Vou pagar com cartão. | I'm going to pay by card. | Keep | Swap for #1503050 (Vou pagar com meu cartão), the same words on Tatoeba. | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#1602349](https://tatoeba.org/en/sentences/show/1602349) | Isso não é um apartamento real. | It isn't a real apartment. | Reject |  | "Real" here is the adjective; the circle teaches the currency, a sense trap. |
| [#340431](https://tatoeba.org/en/sentences/show/340431) | A conta, por favor. | The check, please. | Use |  |  |
| [#340430](https://tatoeba.org/en/sentences/show/340430) | Quanto custa? | How much is it? | Use |  |  |
| [#1489090](https://tatoeba.org/en/sentences/show/1489090) | Quanto custa uma maçã? | How much is an apple? | Use |  |  |
| [#3847300](https://tatoeba.org/en/sentences/show/3847300) | Com licença, quanto custa isso? | Excuse me, how much does this cost? | Use |  |  |
| [#1503050](https://tatoeba.org/en/sentences/show/1503050) | Vou pagar com meu cartão. | I'll pay with my card. | Use |  |  |
| [#769624](https://tatoeba.org/en/sentences/show/769624) | Quanto dinheiro você tem? | How much money do you have? | Use |  |  |
| [#935431](https://tatoeba.org/en/sentences/show/935431) | Qual é o preço? | What is the price? | Use |  |  |
| [#1383297](https://tatoeba.org/en/sentences/show/1383297) | Dinheiro não se come. | You can't eat money. | Reject |  | A proverb with impersonal se. |
| [#2456408](https://tatoeba.org/en/sentences/show/2456408) | Tom gosta de dinheiro. | Tom likes money. | Use |  |  |
| [#8266756](https://tatoeba.org/en/sentences/show/8266756) | Tudo tem um preço. | Everything has a price. | Reject |  | A proverb. |
| [#8266757](https://tatoeba.org/en/sentences/show/8266757) | Tudo tem seu preço. | Everything has its price. | Reject |  | A proverb. |
| [#10357569](https://tatoeba.org/en/sentences/show/10357569) | Desculpe, não posso pagar. | Sorry. I can't pay. | Use | Sorry, I can't pay. |  |

## U49 · Bottles + Bags

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S49101 | Quero um saco. | I want a bag. | Keep |  | Correct; "sacola" is the everyday shopping bag in Brazil, and "saco" on its own can be slang, but saco is the list word and "um saco" of something is fine. |
| S49102 | Tem um saco? | Is there a bag? | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S49103 | Leio todo dia. | I read every day. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S49104 | Ela canta todo dia. | She sings every day. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#383806](https://tatoeba.org/en/sentences/show/383806) | Você gosta de chocolate branco? | Do you like white chocolate? | Use |  |  |
| [#519248](https://tatoeba.org/en/sentences/show/519248) | Ele tem menos pão. | He has less bread. | Use |  |  |
| [#867467](https://tatoeba.org/en/sentences/show/867467) | Eu gosto de nadar, mas não aqui. | I like swimming, but I don't like to swim here. | Use | I like swimming, but not here. |  |
| [#971336](https://tatoeba.org/en/sentences/show/971336) | Estão todos bem, obrigado. | They're all fine, thanks. | Use |  |  |
| [#1017276](https://tatoeba.org/en/sentences/show/1017276) | Minha família está toda muito bem. | My family are all very well. | Use |  |  |
| [#1157472](https://tatoeba.org/en/sentences/show/1157472) | Quem é mais jovem, ele ou eu? | Who is younger, him or me? | Use |  |  |
| [#1157510](https://tatoeba.org/en/sentences/show/1157510) | Eu tenho pouco dinheiro. | I am short of money. | Use | I have little money. |  |
| [#1446787](https://tatoeba.org/en/sentences/show/1446787) | Mas eu não tenho dinheiro. | However, I have no money. | Use | But I don't have money. |  |
| [#3867545](https://tatoeba.org/en/sentences/show/3867545) | Eu queria um copo de vinho. | I'd like a glass of wine. | Use |  |  |
| [#10788807](https://tatoeba.org/en/sentences/show/10788807) | Todos estão com medo. | Everyone is afraid. | Use |  |  |
| [#13809745](https://tatoeba.org/en/sentences/show/13809745) | Bebo menos água que ele. | I drink less water than him. | Use |  |  |

## U58 · Outdoors

### Drafts

| ID | Portuguese | English | Verdict | Fix or swap | Reason |
| --- | --- | --- | --- | --- | --- |
| S58101 | A montanha é alta. | The mountain is high. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S58102 | Moro na montanha. | I live in the mountains. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S58103 | Tem uma planta na mesa. | There's a plant on the table. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S58104 | O vento é frio. | The wind is cold. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |
| S58105 | O ar é frio. | The air is cold. | Keep |  | Correct, natural Brazilian Portuguese, A1; the English matches. |

### Candidates

| Tatoeba | Portuguese | English | Verdict | English to show | Reason |
| --- | --- | --- | --- | --- | --- |
| [#12359353](https://tatoeba.org/en/sentences/show/12359353) | O ar aqui é muito mau. | The air here is very bad. | Reject |  | "Mau" of air reads European or bookish; Brazil says "o ar é ruim". |
| [#818376](https://tatoeba.org/en/sentences/show/818376) | Você é meu Sol. | You are my sunshine. | Reject |  | A love line. |
| [#1207157](https://tatoeba.org/en/sentences/show/1207157) | Isso é uma flor? | This is a flower? | Use |  |  |
| [#1428339](https://tatoeba.org/en/sentences/show/1428339) | Por que o céu é azul? | Why is the sky blue? | Use |  |  |
| [#1598320](https://tatoeba.org/en/sentences/show/1598320) | Não gosto de viver no campo. | I don't like living in the country. | Use |  |  |
| [#10140064](https://tatoeba.org/en/sentences/show/10140064) | Ele está na floresta. | He's in the forest. | Use |  |  |

## Read and Answer texts

| ID | Text | Verdict | Fix | Reason |
| --- | --- | --- | --- | --- |
| R101 | No mercado (sign) | Keep |  | Natural; feira and "o quilo" are Brazilian; both answers unique. |
| R102 | Feira da praça (notice) | Keep |  | Natural; both answers unique. |
| R103 | Uma mensagem da Ana (message) | Keep |  | Natural; both answers unique. |
| R104 | Os preços (menu) | Keep |  | Natural; both answers unique; the right answer sits second, good. |
| R105 | Na lanchonete (menu) | Keep |  | Natural Brazilian (lanchonete, pão de queijo); both answers unique. |
| R106 | Livros usados (notice) | Keep |  | Natural; both answers unique. |
| R107 | Uma mensagem da Maria (message) | Keep |  | Natural; both answers unique. |
| R108 | No supermercado (sign) | Keep |  | Natural; both answers unique. |
| R109 | Para a festa (message) | Keep |  | Natural; both answers unique. |

## Task items (Write the Number, Fill the Form, Write a Message)

| ID | Item | Verdict | Fix | Reason |
| --- | --- | --- | --- | --- |
| N101 | quinze → 15 | Keep |  | Natural. |
| N102 | dezessete → 17 | Keep |  | Natural (Brazilian spelling). |
| N103 | zero, três, onze, quinze, dezenove, vinte → 03 11 15 19 20 | Keep |  | Natural; the key matches. |
| N104 | zero, sete, doze, dezesseis, dezoito, catorze → 07 12 16 18 14 | Keep |  | Natural; the key matches. |
| N105 | Tenho vinte anos. → 20 | Keep |  | Natural. |
| N106 | Ela tem dezoito anos. → 18 | Keep |  | Natural. |
| N107 | setenta → 70 | Keep |  | Natural. |
| N108 | noventa → 90 | Keep |  | Natural. |
| N109 | quarenta e cinco → 45 | Keep |  | Natural. |
| N110 | noventa e nove → 99 | Keep |  | Natural. |
| N111 | trinta reais → 30 | Keep |  | Natural. |
| N112 | dez reais → 10 | Keep |  | Natural. |
| N113 | cem reais → 100 | Keep |  | Natural. |
| N114 | cinquenta reais → 50 | Keep |  | Natural. |
| F101 | João Silva, 40, Rua das Flores 10, São Paulo | Keep |  | Natural; generous alternates. |
| F102 | Ana Costa, 30, brasileira, França, 03 11 15 19 20 | Keep |  | Natural. |
| P101 | New friend: name, age, where you live, 20–35 words | Keep |  | Clear. |
| P102 | Postcard about yourself, 30–40 words | Keep |  | Clear. |
| P103 | Market list for a friend, 20–35 words | Keep |  | Clear. |
