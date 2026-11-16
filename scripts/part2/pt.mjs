// Brazilian Portuguese A1 · Part 2, Everyday Life (Dan, 2026-11-16, overnight build), after Spanish and Italian Part 2:
// Brazilian throughout (você, celular, ônibus, prices in reais), nothing European (no telemóvel, autocarro, tu).
// Words from the Camões A1 list (content-pt/a1-list.json, with its Brazilian swaps) first, where they fit the situations,
// checked against Tatoeba's short trusted lines; the target is 90% of the list by the end of Part 4. Vocabulary themes
// stay clear of Part 1's and of Parts 3 and 4 (time; food, directions, home, family, work).
// Used by scripts/add-part.mjs (COURSE=pt PART=2).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U41', order: 101, row: 11, after: '', title: 'Your Name, Please', tasks: 'T01;T02',
    grammar: 'Como você se chama? Qual é o seu nome?; me chamo …; muito prazer; o senhor, a senhora: the polite you, with the ele form',
    words: ['sobrenome', 'senhor', 'senhora', 'prazer', 'chamo', 'apresentar', 'apresento', 'conhecer', 'conheço', 'rapaz', 'moça'] },
  { unit_id: 'U34', order: 101.5, row: 11.5, after: 'row 11', title: 'Spelling It Out', help: true, tasks: 'T02;T13',
    grammar: 'Como se escreve?: poder + a verb; posso, pode', words: ['escreve', 'escrever', 'letra', 'posso', 'soletrar'] },
  { unit_id: 'U42', order: 102, row: 12, after: 'row 11', title: 'Phone Numbers', tasks: 'T02',
    grammar: 'Numbers 0 to 20; meu número é …; dezesseis to dezenove are one word; ligar para (to call)',
    words: ['número', 'telefone', 'celular', 'ligar', 'telefonar', 'zero', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove', 'vinte', 'código'] },
  { unit_id: 'U43', order: 103, row: 12, after: 'row 11', title: 'Age + Birthdays', tasks: 'T03',
    grammar: 'Tenho … anos: ter for age; quantos anos você tem?; parabéns!; nasci em …',
    words: ['idade', 'aniversário', 'mês', 'meses', 'parabéns', 'nasci', 'nascer', 'nascimento', 'data', 'adulto', 'idoso'] },
  { unit_id: 'U35', order: 103.5, row: 12.5, after: 'row 12', title: 'Checking Numbers', help: true, tasks: 'T13',
    grammar: 'Um momento. Espera aí. Está certo? Está errado.', words: ['momento', 'espera', 'certo', 'errado', 'aí'] },
  { unit_id: 'U44', order: 104, row: 13, after: 'row 12', title: 'Numbers to 100', tasks: 'T04',
    grammar: 'Tens to 100: trinta … noventa, cem; trinta e um: e between tens and units; mil, um milhão',
    words: ['trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa', 'cem', 'quinhentos', 'mil', 'milhão'] },
  { unit_id: 'U45', order: 105, row: 13, after: 'row 12', title: 'Where You Live', tasks: 'T03',
    grammar: 'Moro em …: morar for where you live; moro, mora; numa casa, num apartamento; perto de, longe de',
    words: ['moro', 'mora', 'morar', 'vivo', 'vive', 'viver', 'endereço', 'apartamento', 'país', 'lugar', 'avenida', 'praça', 'postal'] },
  { unit_id: 'U46', order: 106, row: 14, after: 'row 13', title: 'Countries + Languages', tasks: 'T03',
    grammar: 'Sou brasileiro, sou brasileira: nationalities agree; falo, fala: -ar verbs; languages take no capital',
    words: ['Brasil', 'Portugal', 'França', 'Alemanha', 'Espanha', 'México', 'China', 'brasileiro', 'brasileira', 'mexicano', 'chinês', 'estrangeiro', 'falo', 'língua', 'nacionalidade'] },
  { unit_id: 'U47', order: 107, row: 14, after: 'row 13', title: 'At the Market', tasks: 'T04',
    grammar: 'Quero …, queria … (politer): querer; comprar: compro; um quilo de …',
    words: ['mercado', 'supermercado', 'comprar', 'compro', 'quero', 'queria', 'quilo', 'fruta', 'ovo', 'ovos', 'laranja', 'banana', 'tomate', 'batata', 'vender'] },
  { unit_id: 'U36', order: 107.5, row: 14.5, after: 'row 14', title: 'Checking You Understood', help: true, tasks: 'T13',
    grammar: 'Claro. Combinado. Exatamente. É verdade?', words: ['claro', 'combinado', 'exatamente', 'verdade'] },
  { unit_id: 'U48', order: 108, row: 15, after: 'row 14', title: 'How Much Is It?', tasks: 'T04',
    grammar: 'Quanto custa? Custa … reais; custam for more than one; é caro, é barato; o troco',
    words: ['preço', 'custa', 'custam', 'custar', 'real', 'reais', 'centavos', 'caro', 'cara', 'barato', 'barata', 'pagar', 'pago', 'dinheiro', 'cartão', 'troco', 'moeda', 'nota', 'conta'] },
  { unit_id: 'U49', order: 109, row: 15, after: 'row 14', title: 'Bottles + Bags', tasks: 'T04',
    grammar: 'Uma garrafa de …, um pacote de …: de after a quantity; pouco, todo, todos; ou, mas',
    words: ['garrafa', 'copo', 'caixa', 'saco', 'pacote', 'pouco', 'todo', 'toda', 'todos', 'menos', 'ou', 'mas', 'chocolate', 'açúcar'] },
]

const vocab = [
  { unit_id: 'U54', order: 101.2, row: 11, after: '', title: 'Clothes',
    grammar: 'Vestir, usar: what you wear; a roupa (always singular); as calças, os óculos (plural)',
    words: ['roupa', 'calças', 'saia', 'camisa', 'camiseta', 'sapato', 'sapatos', 'vestido', 'casaco', 'óculos', 'relógio', 'tamanho', 'vestir', 'usar'] },
  { unit_id: 'U55', order: 103.2, row: 12, after: 'row 11', title: 'In Class',
    grammar: 'Estudar, aprender; uma pergunta, uma resposta; perguntar, responder: -ar and -er verbs',
    words: ['aula', 'turma', 'pergunta', 'resposta', 'perguntar', 'responder', 'página', 'papel', 'caneta', 'lápis', 'caderno', 'quadro', 'exame', 'estudar', 'estudo', 'aprender', 'estudante', 'colega', 'biblioteca'] },
  { unit_id: 'U56', order: 105.2, row: 13, after: 'row 12', title: 'Looks',
    grammar: 'É gordo, é gorda: adjectives agree; ser for what someone is like; simpático, agradável',
    words: ['gordo', 'gorda', 'baixa', 'moreno', 'morena', 'loiro', 'loira', 'ruivo', 'simpático', 'antipático', 'alegre', 'agradável', 'interessante', 'feio'] },
  { unit_id: 'U57', order: 107.2, row: 14, after: 'row 13', title: 'Opposites',
    grammar: 'Fácil, difícil: adjectives in -l are the same for both genders; mau, má (bad); é importante',
    words: ['quente', 'fácil', 'difícil', 'duro', 'mole', 'fraco', 'mau', 'má', 'importante', 'largo', 'limpo', 'sujo'] },
  { unit_id: 'U58', order: 109.2, row: 15, after: 'row 14', title: 'Outdoors',
    grammar: 'No campo, na praia, no mar: em + the article; o sol, o vento, o ar',
    words: ['campo', 'mar', 'rio', 'lago', 'floresta', 'montanha', 'árvore', 'flor', 'planta', 'sol', 'vento', 'neve', 'ar', 'céu'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Phone numbers in pairs; prices in reais.
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const items = {
  a1_listen: [
    ['N101', 'U42', 'number', 'quinze', '15'], ['N102', 'U42', 'number', 'dezessete', '17'], ['N103', 'U42', 'phone', 'zero, três, onze, quinze, dezenove, vinte', '03 11 15 19 20'],
    ['N104', 'U42', 'phone', 'zero, sete, doze, dezesseis, dezoito, catorze', '07 12 16 18 14'],
    ['N105', 'U43', 'number', 'Tenho vinte anos.', '20'], ['N106', 'U43', 'number', 'Ela tem dezoito anos.', '18'],
    ['N107', 'U44', 'number', 'setenta', '70'], ['N108', 'U44', 'number', 'noventa', '90'], ['N109', 'U44', 'number', 'quarenta e cinco', '45'], ['N110', 'U44', 'number', 'noventa e nove', '99'],
    ['N111', 'U48', 'price', 'trinta reais', '30'], ['N112', 'U48', 'price', 'dez reais', '10'], ['N113', 'U48', 'price', 'cem reais', '100'], ['N114', 'U48', 'price', 'cinquenta reais', '50'],
  ].map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F101', unit_id: 'U45', card: 'Meu nome é João Silva. Tenho quarenta anos. Moro na rua das Flores, número dez, em São Paulo.',
      fields: [{ key: 'first', label: 'Nome', rule: 'text', answer: 'João', also: ['Joao'] }, { key: 'last', label: 'Sobrenome', rule: 'text', answer: 'Silva' }, { key: 'age', label: 'Idade', rule: 'number', answer: '40' },
        { key: 'address', label: 'Endereço', rule: 'text', answer: 'Rua das Flores, 10', also: ['rua das Flores 10', 'Rua das Flores 10', 'rua das Flores, número dez', 'Flores 10'] }, { key: 'town', label: 'Cidade', rule: 'text', answer: 'São Paulo', also: ['Sao Paulo'] }] },
    { id: 'F102', unit_id: 'U46', card: 'Meu nome é Ana Costa. Tenho trinta anos. Sou brasileira. Moro na França. Meu número é zero, três, onze, quinze, dezenove, vinte.',
      fields: [{ key: 'first', label: 'Nome', rule: 'text', answer: 'Ana' }, { key: 'last', label: 'Sobrenome', rule: 'text', answer: 'Costa' }, { key: 'age', label: 'Idade', rule: 'number', answer: '30' },
        { key: 'nat', label: 'Nacionalidade', rule: 'text', answer: 'brasileira', also: ['brasileiro', 'Brasileira'] }, { key: 'country', label: 'País', rule: 'text', answer: 'França', also: ['Franca'] },
        { key: 'tel', label: 'Telefone', rule: 'phone', answer: '03 11 15 19 20' }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: [
    text('R101', 'U47', 'sign', 'No mercado', ['Frutas e verduras', 'Maçã: 8 reais o quilo', 'Feira: segunda e sábado'],
      [q('How much is a kilo of apples?', ['8 reais', '18 reais', '80 reais']), q('When is the market on?', ['Monday and Saturday', 'Every day', 'Only on Sunday'])]),
    text('R102', 'U47', 'notice', 'Feira da praça', ['Feira na praça', 'Aos domingos', 'Frutas, verduras, pão e queijo'],
      [q('When is the market?', ['On Sundays', 'On Mondays', 'Every day']), q('What can you buy there?', ['Fruit, vegetables, bread and cheese', 'Clothes and shoes', 'Books and maps'])]),
    text('R103', 'U47', 'message', 'Uma mensagem da Ana', ['João,', 'estou no mercado. Compro frutas e verduras.', 'Você quer uma laranja?', 'Ana'],
      [q('Where is Ana?', ['At the market', 'At school', 'In the park']), q('What does she offer João?', ['An orange', 'A coffee', 'Some bread'])]),
    text('R104', 'U48', 'menu', 'Os preços', ['Pão: 2 reais', 'Queijo: 15 reais', 'Leite: 5 reais', 'Água: 3 reais'],
      [q('How much is the cheese?', ['5 reais', '15 reais', '2 reais'], 1), q('What costs 2 reais?', ['The bread', 'The milk', 'The water'])]),
    text('R105', 'U48', 'menu', 'Na lanchonete', ['Café: 4 reais', 'Suco: 7 reais', 'Pão de queijo: 5 reais'],
      [q('How much is a juice?', ['7 reais', '4 reais', '5 reais']), q('What costs the least?', ['The coffee', 'The juice', 'The cheese bread'])]),
    text('R106', 'U48', 'notice', 'Livros usados', ['Livros usados', 'Um livro: 10 reais', 'Três livros: 25 reais'],
      [q('How much is one book?', ['10 reais', '12 reais', '30 reais']), q('How much are three books?', ['25 reais', '20 reais', '35 reais'])]),
    text('R107', 'U49', 'message', 'Uma mensagem da Maria', ['Tom,', 'você pode comprar uma garrafa de leite, um pacote de café e um quilo de banana?', 'Obrigada!', 'Maria'],
      [q('What does Maria want?', ['Milk, coffee and bananas', 'Bread and water', 'Fruit and vegetables']), q('How much milk?', ['One bottle', 'Two bottles', 'A kilo'])]),
    text('R108', 'U49', 'sign', 'No supermercado', ['Água: seis garrafas, 12 reais', 'Chocolate: duas caixas, 20 reais'],
      [q('How many bottles do you get for 12 reais?', ['Six', 'Three', 'Two']), q('What costs 20 reais?', ['Two boxes of chocolate', 'Six bottles of water', 'One box of chocolate'])]),
    text('R109', 'U49', 'message', 'Para a festa', ['Para a festa:', 'duas garrafas de suco,', 'uma caixa de chocolate,', 'muita fruta!'],
      [q('How many bottles of juice?', ['Two', 'One', 'Three']), q('What is the list for?', ['A party', 'School', 'A trip'])]),
  ].map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P101', unit_id: 'U45', prompt: 'Write a short message to a new friend: your name, how old you are and where you live.', points: 'your name;your age;where you live', min_words: 20, max_words: 35 },
    { id: 'P102', unit_id: 'U46', prompt: 'Write a short postcard about yourself: where you are from, where you live and which languages you speak.', points: 'where you are from;where you live;your languages', min_words: 30, max_words: 40 },
    { id: 'P103', unit_id: 'U49', prompt: 'Write a short message to a friend: what to buy at the market, and how much of each.', points: 'two or three things;how much of each', min_words: 20, max_words: 35 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

// "I can" statements, on the CEFR self-assessment grid's A1 rows (as Spanish and Italian Part 2).
const canDo = {
  U41: [['speaking', 'Spoken interaction', 'I can say my name and ask someone theirs, politely or to a friend.']],
  U34: [['speaking', 'Spoken interaction', 'I can ask how a word or a name is spelled, and spell my own.']],
  U42: [['listening', 'Listening', 'I can understand a phone number said slowly.'], ['speaking', 'Spoken production', 'I can give my phone number.']],
  U43: [['speaking', 'Spoken interaction', 'I can ask and say how old someone is.']],
  U35: [['speaking', 'Spoken interaction', 'I can ask someone to repeat a number and check that I have it right.']],
  U44: [['listening', 'Listening', 'I can understand numbers up to 100 said slowly.']],
  U45: [['writing', 'Writing', 'I can write where I live: my street, my town, my country.'], ['speaking', 'Spoken production', 'I can say where I live.']],
  U46: [['reading', 'Reading', 'I can understand which country someone comes from and which languages they speak.']],
  U47: [['speaking', 'Spoken interaction', 'I can ask for things at a market and say how much I want.']],
  U36: [['speaking', 'Spoken interaction', 'I can say that I have understood, or check that I have.']],
  U48: [['listening', 'Listening', 'I can understand prices.'], ['speaking', 'Spoken interaction', 'I can ask how much something costs.']],
  U49: [['reading', 'Reading', 'I can understand quantities on a shopping list.']],
  U54: [['speaking', 'Spoken production', 'I can say what someone is wearing.']],
  U55: [['reading', 'Reading', 'I can understand everyday words for the classroom.']],
  U56: [['speaking', 'Spoken production', 'I can describe what someone looks like: tall or short, fair or dark.']],
  U57: [['reading', 'Reading', 'I can understand simple descriptions: easy or hard, hot or cold, clean or dirty.']],
  U58: [['reading', 'Reading', 'I can recognise everyday words for the countryside and the outdoors.']],
}

export default {
  part: 2, wordBase: 801, vocabBase: 1101, cdBase: 301,
  slots: [{ slot_id: 'C03', part: 2, after_row: 12 }, { slot_id: 'C04', part: 2, after_row: 14 }],
  situation, vocab, items, canDo, off: {},
  // Added in review (2026-11-16): me chamo needs me and prices need quanto; Part 1 taught neither.
  late: [{ unit_id: 'U41', words: ['me'] }, { unit_id: 'U48', words: ['quanto'] }],
}
