// Brazilian Portuguese A1 · Part 3, Time and Plans (Dan, 2026-11-16, overnight build), in the format of Spanish and
// Italian Part 3: telling the time, days, months and dates, making plans and a day's routine (T05); signs, notices and
// timetables (T09); announcements and simple instructions (T12); the help thread goes on (T13). Brazilian throughout:
// você with the ele form, a gente, tomar café da manhã, ônibus, passagem; instructions in the você form (leia, escreva),
// never the tu form. Words from the Camões A1 list (content-pt/a1-list.json) first. Vocabulary circles carry the list's
// small words of place, colours and materials, everyday verbs, free time, and places to visit; themes stay clear of
// Part 4 (food and drink, directions, home, family, work, forms, messages, health). Read and Answer has three texts per
// circle that has it. Used by scripts/add-part.mjs (COURSE=pt PART=3).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U61', order: 111, row: 16, after: '', title: 'What Time Is It?', tasks: 'T05',
    grammar: 'Que horas são? É uma hora, são duas horas: é only with one; e meia, e quinze, quinze para as dez; da manhã, da tarde, da noite; meio-dia; às oito (at eight): a + as',
    words: ['minuto', 'minutos', 'meia', 'meio', 'meio-dia', 'manhã', 'tarde', 'noite', 'cedo', 'segundo', 'antes', 'depois', 'tempo'] },
  { unit_id: 'U37', order: 111.5, row: 16.5, after: 'row 16', title: "Didn't Catch That", help: true, tasks: 'T13',
    grammar: 'O quê? Desculpe, não ouvi. Pode falar mais alto?', words: ['ouvi', 'ouvir', 'ouço', 'quê'] },
  { unit_id: 'U62', order: 112, row: 17, after: 'row 16', title: 'Days of the Week', tasks: 'T05;T09',
    grammar: 'Na segunda, na terça: days take na; toda segunda (every Monday); sempre, nunca, às vezes; a semana que vem, a semana passada; costumo + a verb (I usually)',
    words: ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'terça-feira', 'quarta-feira', 'quinta-feira', 'fim', 'ontem', 'dias', 'sempre', 'nunca', 'vez', 'vezes', 'próxima', 'próximo', 'passado', 'passada', 'esta', 'este', 'até', 'cada', 'costumo', 'costuma'] },
  { unit_id: 'U63', order: 113, row: 17, after: 'row 16', title: 'Months + Seasons', tasks: 'T05;T09',
    grammar: 'Em janeiro, no verão; primeiro de maio, dois de maio: primeiro only for the first; months take no capital',
    words: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro', 'primavera', 'verão', 'outono', 'inverno', 'primeiro', 'terceiro', 'férias'] },
  { unit_id: 'U38', order: 113.5, row: 17.5, after: 'row 17', title: 'Thinking It Over', help: true, tasks: 'T13',
    grammar: 'Um momento… Vamos ver. Então… Eu penso que sim', words: ['penso', 'pensar', 'então', 'ver', 'deixa'] },
  { unit_id: 'U64', order: 114, row: 18, after: 'row 17', title: 'Making Plans', tasks: 'T05',
    grammar: 'Você vem? Vamos ao cinema?; vir: venho, vem; sair: saio, sai; a gente (we, with the ele form): a gente se vê',
    words: ['vem', 'vir', 'venho', 'sair', 'saio', 'vejo', 'vemos', 'livre', 'juntos', 'cinema', 'teatro', 'filme', 'circo', 'gente', 'convite'] },
  { unit_id: 'U65', order: 115, row: 18, after: 'row 17', title: 'My Day', tasks: 'T05',
    grammar: 'Acordo, me levanto, tomo banho: the day in order; fazer: faço, faz; começar, acabar; almoço, janto',
    words: ['acordo', 'acordar', 'levanto', 'levantar', 'deito', 'deitar', 'durmo', 'dormir', 'tomo', 'tomar', 'banho', 'almoço', 'almoçar', 'janto', 'jantar', 'lanche', 'lanchar', 'começo', 'começar', 'acabo', 'acabar', 'trabalho', 'trabalhar', 'chego', 'chegar', 'faço', 'faz', 'fazer'] },
  { unit_id: 'U66', order: 116, row: 19, after: 'row 18', title: 'Signs + Notices', tasks: 'T09',
    grammar: 'Aberto, fechado: on a sign; a farmácia está aberta, o banco está fechado: they agree; abre às nove, fecha às seis',
    words: ['entrada', 'saída', 'aberto', 'aberta', 'fechado', 'fechada', 'abre', 'abrir', 'fecha', 'fechar', 'informação', 'farmácia', 'padaria', 'correios', 'porta', 'estacionamento', 'proibido'] },
  { unit_id: 'U67', order: 117, row: 19, after: 'row 18', title: 'Timetables', tasks: 'T09',
    grammar: 'O ônibus sai às oito e chega às dez: sair and chegar; uma passagem de ida e volta; viajar de avião, de barco',
    words: ['sai', 'chega', 'horário', 'partida', 'chegada', 'avião', 'barco', 'porto', 'viagem', 'viajar', 'viajo', 'passagem', 'ida', 'volta'] },
  { unit_id: 'U39', order: 117.5, row: 19.5, after: 'row 19', title: 'Not Sure', help: true, tasks: 'T13',
    grammar: 'Acho que sim. Acho que não. Talvez. Não tenho certeza. É possível', words: ['acho', 'achar', 'talvez', 'possível', 'certeza'] },
  { unit_id: 'U68', order: 118, row: 20, after: 'row 19', title: 'Announcements', tasks: 'T12',
    grammar: 'Atenção, senhores passageiros: the words of an announcement; o voo está atrasado; o portão, a plataforma',
    words: ['atenção', 'passageiros', 'passaporte', 'bagagem', 'mala', 'entrar', 'destino', 'voo', 'portão', 'atrasado', 'plataforma'] },
  { unit_id: 'U69', order: 119, row: 20, after: 'row 19', title: 'Instructions', tasks: 'T12',
    grammar: 'Leia, escreva, responda, escolha: the você command (the ele form of the present subjunctive); complete as frases',
    words: ['leia', 'escreva', 'responda', 'escolha', 'complete', 'abra', 'feche', 'olhe', 'olhar', 'veja', 'ouça', 'exercício', 'texto', 'frase', 'frases', 'grupo', 'dupla'] },
]

const vocab = [
  { unit_id: 'U71', order: 111.2, row: 16, after: '', title: 'Little Words',
    grammar: 'Dentro, fora, em cima, embaixo, atrás, na frente, do lado: where things are, with de before a noun; isto, aquilo, aquele; sem, entre, sobre, por, desde',
    words: ['sem', 'entre', 'ali', 'dentro', 'fora', 'cima', 'debaixo', 'embaixo', 'atrás', 'frente', 'lado', 'isto', 'aquilo', 'aquele', 'aquela', 'sobre', 'por', 'desde', 'logo', 'depressa', 'há'] },
  { unit_id: 'U72', order: 113.2, row: 17, after: 'row 16', title: 'Colours + Materials',
    grammar: 'Marrom, cinza, rosa: some colours never change (a camisa rosa, os sapatos cinza); de plástico, de madeira: what something is made of',
    words: ['marrom', 'cinza', 'rosa', 'roxo', 'roxa', 'plástico', 'madeira', 'metal', 'vidro', 'pano', 'chove', 'chover', 'neva'] },
  { unit_id: 'U73', order: 115.2, row: 18, after: 'row 17', title: 'Doing Things',
    grammar: 'Dar: dou, dá; seguir: sigo; conseguir: consigo (I manage to); perder: perco: everyday verbs side by side',
    words: ['dou', 'dar', 'dá', 'sento', 'sentar', 'mudo', 'mudar', 'sigo', 'seguir', 'consigo', 'conseguir', 'ofereço', 'oferecer', 'lavo', 'lavar', 'limpar', 'pinto', 'pintar', 'ando', 'andar', 'passo', 'passar', 'perco', 'perder', 'recebo', 'receber'] },
  { unit_id: 'U74', order: 117.2, row: 19, after: 'row 18', title: 'Free Time',
    grammar: 'Jogar futebol, tocar violão: jogar for games and sport, tocar for instruments, brincar for children at play; gosto de + a verb',
    words: ['passatempo', 'esporte', 'natação', 'corro', 'correr', 'esquiar', 'jogar', 'brincar', 'tocar', 'toco', 'violão', 'rádio', 'arte', 'revista', 'jornal', 'história', 'poema', 'conversar', 'converso', 'interesse'] },
  { unit_id: 'U75', order: 119.2, row: 20, after: 'row 19', title: 'Places to Visit',
    grammar: 'No norte, no sul, no leste: em + the article; o mapa (masculine though it ends in -a); visitar, a visita',
    words: ['turismo', 'turista', 'visita', 'visitar', 'mapa', 'capital', 'norte', 'sul', 'oeste', 'leste', 'estrada', 'caminho', 'quilômetro', 'quilômetros', 'metro', 'metros', 'ponto'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Times on the 24-hour clock in timetables, as in Brazil; dates day first.
const listen = [
  ['N201', 'U61', 'time', 'São três e meia.', '3:30'], ['N202', 'U61', 'time', 'São oito e quinze.', '8:15'],
  ['N203', 'U61', 'time', 'É meio-dia.', '12:00'], ['N204', 'U61', 'time', 'São quinze para as dez.', '9:45'],
  ['N205', 'U63', 'date', 'Cinco de março.', '5/3'], ['N206', 'U63', 'date', 'Primeiro de maio.', '1/5'],
  ['N207', 'U63', 'date', 'Quinze de setembro.', '15/9'], ['N208', 'U63', 'date', 'Trinta de dezembro.', '30/12'],
  ['N209', 'U67', 'time', 'O ônibus sai às quatro e vinte.', '4:20'], ['N210', 'U67', 'time', 'O trem chega às nove e dez.', '9:10'],
  ['N211', 'U68', 'time', 'Atenção: o ônibus para o Rio sai às seis.', '6:00'], ['N212', 'U68', 'number', 'O voo para São Paulo sai do portão sete.', '7'],
]
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const texts = [
  text('R201', 'U62', 'notice', 'A loja', ['Aberta de segunda a sexta: 9h às 20h', 'Sábado: 10h às 18h', 'Domingo: fechada'],
    [q('When is the shop closed?', ['Sunday', 'Saturday', 'Monday']), q('What time does it open on Saturday?', ['10:00', '9:00', '18:00'])]),
  text('R202', 'U62', 'message', 'Uma mensagem do João', ['Ana,', 'vamos ao cinema na quarta? Estou livre na quarta e na quinta.', 'No sábado eu trabalho.', 'João'],
    [q('When is João free?', ['Wednesday and Thursday', 'Saturday', 'Every day']), q('What does João do on Saturday?', ['He works', 'He goes to the cinema', 'He stays at home'])]),
  text('R203', 'U62', 'notice', 'O museu', ['O museu fecha às terças.', 'Visita para crianças: quarta às 15h'],
    [q('Which day is the museum closed?', ['Tuesday', 'Wednesday', 'Monday']), q('When is the visit for children?', ['Wednesday at 3 pm', 'Tuesday at 3 pm', 'Wednesday at 5 pm'])]),
  text('R204', 'U63', 'notice', 'As férias', ['A escola fecha de 20 de dezembro a 6 de fevereiro.', 'Primeiro dia de aula: quarta, 7 de fevereiro'],
    [q('Which day of the week does school start again?', ['Wednesday', 'Monday', 'Saturday']), q('When do the holidays begin?', ['20 December', '7 February', '6 February'])]),
  text('R205', 'U63', 'sign', 'A festa', ['Festa na praça', 'Sábado, 21 de junho, às 18h', 'Música e dança'],
    [q('When is the party?', ['Saturday 21 June', 'Sunday 21 June', 'Saturday 21 July']), q('What time does it start?', ['6 pm', '8 pm', '9 pm'])]),
  text('R206', 'U63', 'message', 'Um cartão da Maria', ['Em janeiro a gente vai à praia.', 'Em julho vamos para a montanha.', 'E você?'],
    [q('Where does Maria go in January?', ['To the beach', 'To the mountains', 'To the countryside']), q('When does she go to the mountains?', ['In July', 'In January', 'In spring'])]),
  text('R207', 'U66', 'sign', 'Na loja', ['Entrada', 'Aberto das 9h às 19h', 'Fechado aos domingos'],
    [q('When is the shop closed?', ['On Sundays', 'On Saturdays', 'Every evening']), q('What time does it close?', ['7 pm', '9 pm', '9 am'])]),
  text('R208', 'U66', 'sign', 'Na estação', ['Banheiros: primeiro andar', 'Farmácia: segundo andar', 'Informação: na entrada'],
    [q('Where are the toilets?', ['On the first floor', 'On the second floor', 'Next to the exit']), q('Where can you get information?', ['At the entrance', 'At the pharmacy', 'On the train'])]),
  text('R209', 'U66', 'notice', 'A padaria', ['Padaria do Bairro', 'Aberta todos os dias das 6h às 21h', 'Pão quente às 7h e às 17h'],
    [q('Is the bakery open on Sunday?', ['Yes', 'No', 'Only in the morning']), q('When is there hot bread?', ['At 7 am and 5 pm', 'At 6 am only', 'At 9 pm'])]),
  text('R210', 'U67', 'timetable', 'Ônibus para Santos', ['Partida: 8h15 – Chegada: 10h20', 'Partida: 12h40 – Chegada: 14h45', 'Partida: 18h00 – Chegada: 20h05'],
    [q('When does the 12:40 bus arrive?', ['14:45', '10:20', '20:05']), q('What time is the first bus?', ['8:15', '12:40', '18:00'])]),
  text('R211', 'U67', 'timetable', 'Barco para a ilha', ['Saída do porto: 7h, 9h, 11h', 'Domingo: um barco a cada duas horas'],
    [q('Where does the boat leave from?', ['The port', 'The station', 'The beach']), q('How often is the boat on Sundays?', ['Every two hours', 'Every hour', 'Not at all'])]),
  text('R212', 'U67', 'message', 'Uma mensagem do Tom', ['Chego na estação às 17h30.', 'Meu ônibus sai de São Paulo às 15h.', 'Até logo!'],
    [q('When does Tom arrive?', ['5:30 pm', '3 pm', '7:30 pm']), q('Where does his bus leave from?', ['São Paulo', 'The airport', 'Rio'])]),
  text('R213', 'U69', 'notice', 'Na aula', ['Ouça o texto.', 'Responda as perguntas.', 'Escolha uma foto.'],
    [q('What do you do first?', ['Listen to the text', 'Answer the questions', 'Choose a photo']), q('What do you choose?', ['A photo', 'A book', 'A word'])]),
  text('R214', 'U69', 'notice', 'A porta', ['Feche a porta, por favor.', 'Atenção: feche devagar.'],
    [q('What should you do with the door?', ['Close it', 'Leave it open', 'Lock it']), q('How should you close it?', ['Slowly', 'Quickly', 'With a key'])]),
  text('R215', 'U69', 'notice', 'O exercício', ['Escolha um número.', 'Abra o livro nessa página.', 'Leia o texto.'],
    [q('What do you open?', ['The book', 'The door', 'The notebook']), q('What do you do last?', ['Read the text', 'Choose a number', 'Close the book'])]),
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F201', unit_id: 'U64', card: 'O João e a Ana vão ao cinema no sábado às oito e meia da noite. Eles se encontram na praça.',
      fields: [{ key: 'day', label: 'Dia', rule: 'text', answer: 'sábado', also: ['Sábado', 'no sábado'] }, { key: 'time', label: 'Hora', rule: 'text', answer: '20:30', also: ['8:30', '20h30', '8h30', 'oito e meia', 'às oito e meia'] },
        { key: 'where', label: 'Onde', rule: 'text', answer: 'na praça', also: ['praça', 'a praça', 'Na praça'] }] },
    { id: 'F202', unit_id: 'U65', card: 'Meu nome é Ana. Tomo café da manhã às sete. Começo o trabalho às nove e acabo às cinco.',
      fields: [{ key: 'name', label: 'Nome', rule: 'text', answer: 'Ana' }, { key: 'breakfast', label: 'Café da manhã', rule: 'text', answer: '7:00', also: ['7', '7h', 'sete', 'às sete'] },
        { key: 'start', label: 'Começo do trabalho', rule: 'text', answer: '9:00', also: ['9', '9h', 'nove', 'às nove'] }, { key: 'end', label: 'Fim do trabalho', rule: 'text', answer: '17:00', also: ['5', '5:00', '17', '17h', 'cinco', 'às cinco'] }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: texts.map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P201', unit_id: 'U62', prompt: 'Write a short message to a friend about your week: what you do on two days.', points: 'two days;what you do', min_words: 20, max_words: 35 },
    { id: 'P202', unit_id: 'U64', prompt: 'Write a short message to invite a friend out: what, which day and what time.', points: 'what;which day;what time', min_words: 20, max_words: 35 },
    { id: 'P203', unit_id: 'U65', prompt: 'Write a few lines about your day: when you get up, work and have dinner.', points: 'when you get up;when you work;when you have dinner', min_words: 20, max_words: 35 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

const canDo = {
  U61: [['listening', 'Listening', 'I can understand the time when someone says it.'], ['speaking', 'Spoken interaction', 'I can ask what time it is and say it.']],
  U37: [['speaking', 'Spoken interaction', "I can say I didn't hear and ask someone to speak up."]],
  U62: [['speaking', 'Spoken production', 'I can say what day it is and how often I do something.']],
  U63: [['listening', 'Listening', 'I can understand dates and months.'], ['speaking', 'Spoken production', 'I can say when my birthday is.']],
  U38: [['speaking', 'Spoken interaction', 'I can ask for a moment to think.']],
  U64: [['speaking', 'Spoken interaction', 'I can make a simple plan with someone: what, when and where.']],
  U65: [['speaking', 'Spoken production', 'I can describe my day in simple words.']],
  U66: [['reading', 'Reading', 'I can understand simple signs and notices: open, closed, entrance, exit.']],
  U67: [['reading', 'Reading', 'I can find a departure or arrival time on a timetable.']],
  U39: [['speaking', 'Spoken interaction', "I can say I'm not sure or that I think so."]],
  U68: [['listening', 'Listening', 'I can understand a short announcement at a station or an airport.']],
  U69: [['reading', 'Reading', 'I can follow short, simple instructions.']],
  U71: [['reading', 'Reading', 'I can understand the small words that say where something is: in, out, behind, between.']],
  U72: [['speaking', 'Spoken production', 'I can name colours and say what something is made of.']],
  U73: [['speaking', 'Spoken production', 'I can say what I do with everyday verbs: give, sit, change, wash, walk.']],
  U74: [['speaking', 'Spoken production', 'I can say what I do in my free time.']],
  U75: [['reading', 'Reading', 'I can understand words for places to visit and where they are.']],
}

export default {
  part: 3, wordBase: 1201, vocabBase: 1401, cdBase: 401,
  slots: [{ slot_id: 'C05', part: 3, after_row: 17 }, { slot_id: 'C06', part: 3, after_row: 19 }],
  situation, vocab, items, canDo,
  // Added in review (2026-11-16): às for the time, do and da for where things are; the course had none of them.
  late: [{ unit_id: 'U61', words: ['às'] }, { unit_id: 'U71', words: ['do', 'da'] }],
  // Turned off in review (2026-11-16): kept as an id, never shown.
  off: { deixa: 'its natural lines (Deixa eu ver, Deixa isso) use the tu imperative', passado: 'every natural line needs a past tense not yet taught', passada: 'every natural line needs a past tense not yet taught' },
}
