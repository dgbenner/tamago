// Brazilian Portuguese A1 · Part 4, Out and About (Dan, 2026-11-16, overnight build), the last part, in the format of
// Spanish and Italian Part 4: the café and the restaurant (T07), asking the way and getting around (T08), family, home
// and work (T06), forms (T10) and messages (T11); the help thread ends (T13). Brazilian throughout: garçom, cardápio,
// café da manhã, geladeira, banheiro, ônibus, celular, carteira de identidade, prices in reais; never pequeno-almoço,
// frigorífico, casa de banho, autocarro, comboio. The Camões A1 list (with its Brazilian swaps) is the target, 90% by
// the end of this part: the situation circles carry the words that fit them, and the five vocabulary circles the rest
// (food, around the house, health, school and study, travel and the hotel). Left out on purpose: the list's religion
// words (religião, cristão, judeu, muçulmano, hindu, budista, deus, ateu, agnóstico), periquito, fax and its
// multi-word headwords. Read and Answer has three texts per circle that has it. Used by scripts/add-part.mjs
// (COURSE=pt PART=4).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U81', order: 121, row: 21, after: '', title: 'At the Café', tasks: 'T07',
    grammar: 'Eu queria um café, por favor; pedir: peço, pede; a conta, por favor; uma xícara de café, um copo de suco',
    words: ['pedir', 'peço', 'pede', 'garçom', 'cardápio', 'menu', 'xícara', 'doce', 'bebida', 'comida', 'provar', 'sorvete'] },
  { unit_id: 'U26', order: 121.5, row: 21.5, after: 'row 21', title: 'Excuse Me', help: true, tasks: 'T13',
    grammar: 'Com licença (may I come through?); você pode me ajudar?; tem alguém aqui?; sem problema', words: ['ajuda', 'ajudar', 'alguém', 'problema'] },
  { unit_id: 'U82', order: 122, row: 22, after: 'row 21', title: 'At the Restaurant', tasks: 'T07;T09',
    grammar: 'De entrada, prato principal, sobremesa: the courses; um prato de arroz; o garfo, a faca, a colher',
    words: ['prato', 'garfo', 'faca', 'colher', 'carne', 'frango', 'arroz', 'salada', 'sopa', 'sobremesa', 'feijão'] },
  { unit_id: 'U83', order: 123, row: 22, after: 'row 21', title: 'Asking the Way', tasks: 'T08',
    grammar: 'À direita, à esquerda, siga reto: directions; vire (turn), pare (stop): the você command; na esquina',
    words: ['direita', 'esquerda', 'reto', 'vire', 'virar', 'pare', 'parar', 'esquina', 'procuro', 'procurar', 'trás', 'placa'] },
  { unit_id: 'U27', order: 123.5, row: 22.5, after: 'row 22', title: "I'm Lost", help: true, tasks: 'T13;T08',
    grammar: 'Estou perdido, estou perdida: I am lost; você pode me mostrar no mapa?; é por aqui?', words: ['perdido', 'perdida', 'mostrar', 'mostre'] },
  { unit_id: 'U84', order: 124, row: 23, after: 'row 22', title: 'Getting Around', tasks: 'T08',
    grammar: 'De ônibus, de carro, de moto, a pé: how you go; partir (to leave): o trem parte às oito; a primeira vez',
    words: ['transporte', 'moto', 'motorista', 'taxista', 'condutor', 'parte', 'partir', 'primeira', 'agência', 'pegar', 'pego'] },
  { unit_id: 'U85', order: 125, row: 23, after: 'row 22', title: 'My Family', tasks: 'T06',
    grammar: 'Meu irmão, minha irmã: the possessive agrees with the person; os meus pais (my parents); casado, casada',
    words: ['irmão', 'irmã', 'filho', 'filha', 'filhos', 'avô', 'avó', 'avós', 'primo', 'prima', 'tio', 'tia', 'neto', 'neta', 'marido', 'esposa', 'pais', 'casal', 'namorado', 'namorada'] },
  { unit_id: 'U86', order: 126, row: 24, after: 'row 23', title: 'At Home', tasks: 'T06',
    grammar: 'Minha casa tem três quartos; a sala, o quarto, o banheiro; alugar, o aluguel: renting',
    words: ['quarto', 'quartos', 'sala', 'janela', 'parede', 'cadeira', 'sofá', 'garagem', 'chuveiro', 'banheira', 'pia', 'torneira', 'chave', 'fechadura', 'toalha', 'aluguel', 'alugar', 'lar'] },
  { unit_id: 'U87', order: 127, row: 24, after: 'row 23', title: 'At Work', tasks: 'T06',
    grammar: 'Sou enfermeiro, sou enfermeira: no article before a job; trabalho num escritório; o meu chefe, os meus colegas',
    words: ['profissão', 'computador', 'internet', 'escritório', 'chefe', 'empresa', 'enfermeiro', 'enfermeira', 'dentista', 'bombeiro', 'polícia', 'policial', 'florista', 'farmacêutico', 'balcão'] },
  { unit_id: 'U28', order: 127.5, row: 24.5, after: 'row 24', title: 'Explaining a Problem', help: true, tasks: 'T13',
    grammar: 'Não funciona (it does not work); perdi a chave (I lost the key); é urgente?; chame a polícia', words: ['funciona', 'perdi', 'urgente', 'acidente', 'ambulância'] },
  { unit_id: 'U88', order: 128, row: 25, after: 'row 24', title: 'Filling In Forms', tasks: 'T10',
    grammar: 'Nome, sobrenome, data de nascimento, estado civil: the words on a form; solteiro, casado, divorciado agree; assine aqui',
    words: ['assinar', 'assine', 'assinatura', 'identidade', 'documento', 'identificação', 'estado', 'civil', 'solteiro', 'solteira', 'casado', 'casada', 'separado', 'divorciado', 'divorciada', 'viúvo', 'viúva', 'sexo', 'masculino', 'feminino', 'gênero', 'cidadão', 'usuário', 'email', 'arroba'] },
  { unit_id: 'U89', order: 129, row: 25, after: 'row 24', title: 'Messages + Postcards', tasks: 'T11',
    grammar: 'Querida Ana, querido João: dear (querido agrees); um abraço, beijos: ways to end; enviar, mandar: to send',
    words: ['carta', 'mensagem', 'mensagens', 'enviar', 'envio', 'mandar', 'mando', 'envelope', 'selo', 'chamada', 'fotocópia', 'querido', 'querida', 'abraço', 'beijos'] },
]

const vocab = [
  { unit_id: 'U91', order: 121.2, row: 21, after: '', title: 'Food',
    grammar: 'Um litro de leite, cem gramas de queijo: de after a quantity; carne de vaca, carne de porco; sal e pimenta',
    words: ['vaca', 'porco', 'massa', 'sal', 'pimenta', 'vegetais', 'legumes', 'cereal', 'trigo', 'fruto', 'litro', 'grama', 'gramas', 'medida', 'alimentação', 'cheira', 'cheirar', 'cozinhar', 'cozinho', 'preparar', 'preparo'] },
  { unit_id: 'U92', order: 123.2, row: 22, after: 'row 21', title: 'Around the House',
    grammar: 'A geladeira, o fogão, o forno: the kitchen; ligar and desligar (to switch on and off): desligue a luz',
    words: ['geladeira', 'fogão', 'forno', 'congelador', 'televisão', 'vídeo', 'luz', 'eletricidade', 'gás', 'aquecimento', 'lixo', 'desligar', 'desligo', 'desligue', 'mobília', 'despensa', 'sujar', 'som', 'compras'] },
  { unit_id: 'U93', order: 125.2, row: 23, after: 'row 22', title: 'Health',
    grammar: 'Estou com dor de cabeça (my head hurts); dói (it hurts); estou resfriado; tome um comprimido',
    words: ['corpo', 'coração', 'dente', 'dentes', 'sangue', 'doença', 'gripe', 'resfriado', 'resfriada', 'dói', 'doer', 'ferida', 'queimar', 'sinto', 'sentir', 'clínica', 'remédio', 'medicamento', 'comprimido', 'aspirina', 'sabonete', 'sabão', 'acordado', 'adormecer'] },
  { unit_id: 'U94', order: 127.2, row: 24, after: 'row 23', title: 'School + Study',
    grammar: 'O ensino fundamental, o ensino médio, o ensino superior: school in Brazil; fazer um curso; tirar uma nota (to get a grade)',
    words: ['ensino', 'fundamental', 'médio', 'superior', 'universidade', 'universitário', 'instituto', 'graduação', 'curso', 'disciplina', 'semestre', 'período', 'recreio', 'ginásio', 'tirar', 'tiro', 'brincadeira'] },
  { unit_id: 'U95', order: 129.2, row: 25, after: 'row 24', title: 'At the Hotel',
    grammar: 'Um quarto de casal, um quarto individual, um quarto duplo; tenho uma reserva; a carteira (wallet)',
    words: ['reserva', 'duplo', 'individual', 'alojamento', 'camping', 'barraca', 'tenda', 'estadia', 'carteira', 'recepção', 'elevador', 'princípio', 'porquê'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Prices in reais; timetables on the 24-hour clock.
const listen = [
  ['N301', 'U81', 'price', 'Um café custa cinco reais.', '5'], ['N302', 'U81', 'price', 'São doze reais e cinquenta.', '12,50'],
  ['N303', 'U82', 'price', 'O prato do dia custa vinte e cinco reais.', '25'], ['N304', 'U82', 'price', 'A conta é de quarenta e dois reais.', '42'],
  ['N305', 'U83', 'number', 'A farmácia fica a cem metros.', '100'], ['N306', 'U83', 'number', 'O museu fica a trezentos metros.', '300'],
  ['N307', 'U84', 'number', 'Pegue o ônibus número oito.', '8'], ['N308', 'U84', 'time', 'O ônibus passa às sete e quinze.', '7:15'],
  ['N309', 'U86', 'number', 'Moro no número vinte e seis.', '26'], ['N310', 'U87', 'time', 'A reunião é às dez e meia.', '10:30'],
  ['N311', 'U88', 'phone', 'Meu celular é nove, oito, sete, doze, vinte, dezoito.', '987 12 20 18'], ['N312', 'U88', 'date', 'Eu nasci no dia doze de março.', '12/3'],
]
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const texts = [
  text('R301', 'U82', 'menu', 'Prato do dia', ['Arroz, feijão, frango e salada', 'Sobremesa: fruta', 'R$ 25'],
    [q('How much is the dish of the day?', ['25 reais', '15 reais', '50 reais']), q('What is there for dessert?', ['Fruit', 'Cake', 'Ice cream'])]),
  text('R302', 'U82', 'menu', 'Lanchonete Central', ['Café: R$ 5', 'Suco de laranja: R$ 8', 'Sorvete: R$ 10', 'Pão de queijo: R$ 6'],
    [q('How much is an ice cream?', ['10 reais', '5 reais', '8 reais']), q('What costs 6 reais?', ['Cheese bread', 'Orange juice', 'A coffee'])]),
  text('R303', 'U82', 'notice', 'Restaurante do João', ['Peixe e carne', 'Aberto de terça a domingo', 'Fechado às segundas'],
    [q('When is the restaurant closed?', ['On Mondays', 'On Sundays', 'On Tuesdays']), q('What does the restaurant serve?', ['Fish and meat', 'Pizza', 'Only salads'])]),
  text('R304', 'U83', 'message', 'Uma mensagem da Ana', ['Minha casa fica perto da estação.', 'Siga reto e atravesse a praça.', 'Minha rua é a segunda à direita.'],
    [q('Where is Ana\'s house?', ['Near the station', 'Near the school', 'Downtown']), q('Which street is hers?', ['The second on the right', 'The first on the left', 'The second on the left'])]),
  text('R305', 'U83', 'sign', 'Na cidade', ['Museu: 200 metros, à esquerda', 'Igreja: siga reto', 'Estação: à direita'],
    [q('Where is the museum?', ['200 meters on the left', '200 meters on the right', 'Straight ahead']), q('Where is the station?', ['On the right', 'On the left', 'Straight ahead'])]),
  text('R306', 'U83', 'notice', 'O hotel', ['O hotel fica no fim da rua.', 'A cinco minutos a pé do centro', 'Ponto de ônibus na frente do hotel'],
    [q('How far is the hotel from downtown?', ['Five minutes on foot', 'Five minutes by car', 'Half an hour on foot']), q('Where is the bus stop?', ['In front of the hotel', 'Behind the hotel', 'At the station'])]),
  text('R307', 'U86', 'notice', 'Aluga-se', ['Apartamento no centro', 'Dois quartos, sala, cozinha e banheiro', 'Com garagem', 'R$ 1.800 por mês'],
    [q('How many bedrooms does the apartment have?', ['Two', 'Three', 'One']), q('What else does it have?', ['A garage', 'A garden', 'A pool'])]),
  text('R308', 'U86', 'message', 'Uma mensagem da Maria', ['Minha casa nova é pequena.', 'Tem um quarto, uma sala e uma cozinha.', 'Não tem jardim.'],
    [q('What is Maria\'s new house like?', ['Small', 'Big', 'Old']), q('What doesn\'t it have?', ['A garden', 'A kitchen', 'A bedroom'])]),
  text('R309', 'U86', 'notice', 'Quarto para estudante', ['Aluga-se quarto para estudante', 'Com cama, mesa e cadeira', 'Perto da universidade'],
    [q('Who is the room for?', ['A student', 'A family', 'A tourist']), q('Where is it?', ['Near the university', 'Near the station', 'In the countryside'])]),
  text('R310', 'U87', 'notice', 'Vaga de emprego', ['Restaurante procura garçom', 'De terça a sábado, das 18h às 23h', 'Ligue para 98712-2018'],
    [q('What job is it?', ['A waiter', 'A cook', 'A driver']), q('Which days?', ['Tuesday to Saturday', 'Monday to Friday', 'Every day'])]),
  text('R311', 'U87', 'message', 'Meu trabalho', ['Sou enfermeira e trabalho num hospital.', 'Começo às sete da manhã.', 'Minha chefe é muito simpática.'],
    [q('Where does she work?', ['In a hospital', 'In a school', 'In a shop']), q('When does she start?', ['At seven in the morning', 'At seven in the evening', 'At nine'])]),
  text('R312', 'U87', 'notice', 'A empresa', ['Empresa de transporte procura motorista', 'Com carteira de motorista', 'Horário: de segunda a sexta'],
    [q('Who is the company looking for?', ['A driver', 'A secretary', 'A teacher']), q('What do you need?', ['A driver\'s license', 'A university degree', 'A car'])]),
  text('R313', 'U89', 'message', 'Um cartão-postal da Ana', ['Querido João,', 'estou na praia com a minha família. Está calor e o mar é lindo.', 'Um abraço, Ana'],
    [q('Where is Ana?', ['At the beach', 'In the mountains', 'In the city']), q('What is the weather like?', ['Hot', 'Cold', 'Rainy'])]),
  text('R314', 'U89', 'message', 'Uma mensagem do Tom', ['Oi, Maria,', 'sábado é meu aniversário. Você vem à minha festa?', 'É na minha casa, às oito.', 'Tom'],
    [q('Why is Tom having a party?', ['It\'s his birthday', 'He has a new job', 'It\'s Christmas']), q('Where is the party?', ['At his house', 'At a restaurant', 'At the park'])]),
  text('R315', 'U89', 'message', 'Um bilhete', ['Ana,', 'não estou em casa. Volto às seis.', 'O jantar está na geladeira.', 'João'],
    [q('When is João back?', ['At six', 'At eight', 'At five']), q('Where is dinner?', ['In the fridge', 'At a restaurant', 'In the oven'])]),
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F301', unit_id: 'U88', card: 'Meu nome é Ana Costa. Sou brasileira. Nasci no dia 10 de abril, em São Paulo. Sou casada. Moro na Rua das Flores, 12, no Rio.',
      fields: [{ key: 'name', label: 'Nome completo', rule: 'text', answer: 'Ana Costa' }, { key: 'nat', label: 'Nacionalidade', rule: 'text', answer: 'brasileira', also: ['brasileiro', 'Brasileira'] },
        { key: 'born', label: 'Data de nascimento', rule: 'text', answer: '10/4', also: ['10 de abril', '10/04', '10.4', '10 de Abril'] }, { key: 'place', label: 'Local de nascimento', rule: 'text', answer: 'São Paulo', also: ['Sao Paulo'] },
        { key: 'civil', label: 'Estado civil', rule: 'text', answer: 'casada', also: ['Casada', 'casado'] }, { key: 'town', label: 'Cidade', rule: 'text', answer: 'Rio', also: ['Rio de Janeiro', 'rio'] }] },
    { id: 'F302', unit_id: 'U87', card: 'Meu nome é João Silva. Tenho trinta anos. Sou enfermeiro e trabalho num hospital em Recife. Sou solteiro.',
      fields: [{ key: 'name', label: 'Nome', rule: 'text', answer: 'João', also: ['Joao'] }, { key: 'last', label: 'Sobrenome', rule: 'text', answer: 'Silva' }, { key: 'age', label: 'Idade', rule: 'number', answer: '30' },
        { key: 'job', label: 'Profissão', rule: 'text', answer: 'enfermeiro', also: ['Enfermeiro'] }, { key: 'civil', label: 'Estado civil', rule: 'text', answer: 'solteiro', also: ['Solteiro'] }] },
    { id: 'F303', unit_id: 'U81', card: 'Na lanchonete: o Tom pede um café e um pão de queijo. A Maria pede um suco. Eles pagam vinte reais.',
      fields: [{ key: 'tom', label: 'Tom', rule: 'text', answer: 'um café e um pão de queijo', also: ['café e pão de queijo', 'café, pão de queijo', 'um café, um pão de queijo'] },
        { key: 'maria', label: 'Maria', rule: 'text', answer: 'um suco', also: ['suco'] }, { key: 'total', label: 'Total (reais)', rule: 'number', answer: '20' }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: texts.map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P301', unit_id: 'U85', prompt: 'Write a few lines about your family: who they are and what they are like.', points: 'who is in your family;what they are like', min_words: 20, max_words: 35 },
    { id: 'P302', unit_id: 'U86', prompt: 'Write a short message about your home: where it is and which rooms it has.', points: 'where it is;which rooms it has', min_words: 20, max_words: 35 },
    { id: 'P303', unit_id: 'U89', prompt: 'Write a postcard to a friend from a trip: where you are, the weather and what you do.', points: 'where you are;the weather;what you do', min_words: 20, max_words: 35 },
    { id: 'P304', unit_id: 'U89', prompt: 'Write back to a friend who invited you to a party: say thank you, say if you can come, and ask one question.', points: 'thank you;if you can come;one question', min_words: 20, max_words: 35 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

const canDo = {
  U81: [['speaking', 'Spoken interaction', 'I can order a drink and something to eat at a café, and pay.']],
  U26: [['speaking', 'Spoken interaction', 'I can get someone\'s attention politely and ask for help.']],
  U82: [['reading', 'Reading', 'I can understand a simple menu and its prices.'], ['speaking', 'Spoken interaction', 'I can order a meal in a restaurant.']],
  U83: [['listening', 'Listening', 'I can follow simple directions: left, right, straight on.'], ['speaking', 'Spoken interaction', 'I can ask the way to a place.']],
  U27: [['speaking', 'Spoken interaction', 'I can say I am lost and ask someone to show me the way.']],
  U84: [['speaking', 'Spoken production', 'I can say how I get around: by bus, by car, on foot.']],
  U85: [['speaking', 'Spoken production', 'I can talk about my family in simple words.']],
  U86: [['reading', 'Reading', 'I can understand a short ad for an apartment or a room.'], ['speaking', 'Spoken production', 'I can describe my home: its rooms and its things.']],
  U87: [['speaking', 'Spoken production', 'I can say what I do for work and where.']],
  U28: [['speaking', 'Spoken interaction', 'I can say that something doesn\'t work or that I lost something.']],
  U88: [['writing', 'Writing', 'I can fill in a form with my personal details.']],
  U89: [['writing', 'Writing', 'I can write a short postcard or message.'], ['reading', 'Reading', 'I can understand a short personal message or postcard.']],
  U91: [['reading', 'Reading', 'I can recognize everyday words for food and quantities.']],
  U92: [['reading', 'Reading', 'I can recognize everyday words for things around the house.']],
  U93: [['speaking', 'Spoken production', 'I can say what hurts and that I feel ill.']],
  U94: [['reading', 'Reading', 'I can recognize everyday words for school and study.']],
  U95: [['speaking', 'Spoken interaction', 'I can book a room and say what kind of room I want.']],
}

export default {
  part: 4, wordBase: 1601, vocabBase: 1801, cdBase: 501,
  slots: [{ slot_id: 'C07', part: 4, after_row: 22 }, { slot_id: 'C08', part: 4, after_row: 24 }],
  situation, vocab, items, canDo,
  // Added in review (2026-11-19): the command forms the circles' notes teach (siga reto, chame a polícia, tome um
  // comprimido), which no other course word gives.
  late: [{ unit_id: 'U83', words: ['siga'] }, { unit_id: 'U28', words: ['chame'] }, { unit_id: 'U93', words: ['tome'] }],
  // Turned off in review (2026-11-19): kept as an id, never shown.
  off: { grama: 'the singular unit reads as grass and is rarely natural at A1; gramas teaches the list word' },
}
