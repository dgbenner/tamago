// Spanish A1 · Part 3, Time and Plans (Dan, 2026-11-15), in the format of French Part 3: telling the time, days, months
// and dates, making plans and a day's routine (T05); signs, notices and timetables (T09); announcements and simple
// instructions (T12); the help thread goes on (T13). Latin American Spanish: tú and usted, ustedes, boleto, nos vemos
// (not quedamos). Words from the PCIC A1 inventory first (scripts/a1-coverage.mjs --missing), checked against Tatoeba
// (scripts/circle-feasibility.mjs). Vocabulary circles carry the inventory's small words, the weather, hobbies, looks
// and character, and places to visit; themes stay clear of Part 4 (food and drink, directions, home, family, work,
// forms and messages). Read and Answer has three texts per circle that has it.
// Used by scripts/add-part.mjs (COURSE=es PART=3).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U61', order: 111, row: 16, after: '', title: 'What Time Is It?', tasks: 'T05',
    grammar: '¿Qué hora es? Es la una, son las dos: es only with one; y media, y cuarto, menos cuarto; de la mañana, de la tarde, de la noche',
    words: ['minuto', 'minutos', 'horas', 'media', 'cuarto', 'menos', 'mediodía', 'medianoche', 'tarde', 'noche', 'temprano', 'pronto'] },
  { unit_id: 'U37', order: 111.5, row: 16.5, after: 'row 16', title: "Didn't Catch That", help: true, tasks: 'T13',
    grammar: '¿Perdona? No te oigo. ¿Qué dijiste? Lo siento', words: ['oigo', 'siento', 'lo', 'dijiste', 'perdona'] },
  { unit_id: 'U62', order: 112, row: 17, after: 'row 16', title: 'Days of the Week', tasks: 'T05;T09',
    grammar: 'El lunes (on Monday), los lunes (every Monday); todos los días, cada semana; la semana próxima, el mes pasado: próximo and pasado agree',
    words: ['martes', 'miércoles', 'jueves', 'viernes', 'fin', 'ayer', 'días', 'todos', 'cada', 'siempre', 'nunca', 'normalmente', 'veces', 'próximo', 'próxima', 'pasado', 'pasada'] },
  { unit_id: 'U63', order: 113, row: 17, after: 'row 16', title: 'Months + Seasons', tasks: 'T05;T09',
    grammar: 'En enero, en verano; el primero de mayo, el dos de mayo: primero only for the first; months take no capital',
    words: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre', 'primavera', 'verano', 'otoño', 'invierno', 'fecha', 'primero'] },
  { unit_id: 'U38', order: 113.5, row: 17.5, after: 'row 17', title: 'Thinking It Over', help: true, tasks: 'T13',
    grammar: 'Un segundo. A ver… Pues… Déjame pensar', words: ['pienso', 'pensar', 'pues', 'ver', 'veamos', 'segundo'] },
  { unit_id: 'U64', order: 114, row: 18, after: 'row 17', title: 'Making Plans', tasks: 'T05',
    grammar: '¿Vienes? Vamos a ver una película: ir a + a verb for a plan; venir: vengo, vienes, viene; salir: salgo; nos vemos',
    words: ['vienes', 'viene', 'venir', 'vengo', 'salir', 'salgo', 'veo', 'ves', 'vemos', 'nos', 'vamos', 'ir', 'libre', 'juntos', 'concierto', 'discoteca'] },
  { unit_id: 'U65', order: 115, row: 18, after: 'row 17', title: 'My Day', tasks: 'T05',
    grammar: 'Me levanto, me ducho: verbs with me; levantarse, ducharse; empezar (e to ie): empiezo; volver (o to ue): vuelvo; hacer: hago',
    words: ['levanto', 'levantarse', 'ducho', 'ducharse', 'desayuno', 'desayunar', 'cenar', 'cena', 'comida', 'empiezo', 'empezar', 'empieza', 'termino', 'terminar', 'termina', 'vuelvo', 'volver', 'hago', 'luego'] },
  { unit_id: 'U66', order: 116, row: 19, after: 'row 18', title: 'Signs + Notices', tasks: 'T09',
    grammar: 'Abierto, cerrado: on a sign; la farmacia está abierta, el banco está cerrado: they agree; abrir: abre; cerrar (e to ie): cierra',
    words: ['entrada', 'salida', 'abrir', 'abre', 'cerrar', 'cierra', 'abierta', 'cerrada', 'información', 'farmacia', 'banco', 'ascensor', 'escalera', 'planta'] },
  { unit_id: 'U67', order: 117, row: 19, after: 'row 18', title: 'Timetables', tasks: 'T09',
    grammar: 'El tren sale a las ocho y llega a las diez: salir and llegar; un boleto de ida y vuelta; viajar en avión, en barco',
    words: ['llega', 'llegar', 'llego', 'sale', 'horario', 'ida', 'vuelta', 'boleto', 'avión', 'barco', 'aeropuerto', 'puerto', 'parada', 'viajar', 'viajo'] },
  { unit_id: 'U39', order: 117.5, row: 19.5, after: 'row 19', title: 'Not Sure', help: true, tasks: 'T13',
    grammar: 'No estoy seguro, no estoy segura. Creo que sí. Quizá. Es posible. Ni idea', words: ['creo', 'creer', 'posible', 'quizá', 'seguro', 'segura', 'idea'] },
  { unit_id: 'U68', order: 118, row: 20, after: 'row 19', title: 'Announcements', tasks: 'T12',
    grammar: 'Señores pasajeros, atención: the words of an announcement; el tren tiene retraso; entrar en, entrar a',
    words: ['señores', 'pasajeros', 'atención', 'retraso', 'autobuses', 'taxis', 'conductor', 'pasaporte', 'maleta', 'entrar', 'metro', 'carretera'] },
  { unit_id: 'U69', order: 119, row: 20, after: 'row 19', title: 'Instructions', tasks: 'T12',
    grammar: 'Escucha, mira, contesta, elige: the tú command is the él form; practicar, cambiar: -ar verbs',
    words: ['practicar', 'ejercicio', 'actividad', 'lección', 'unidad', 'parejas', 'grupos', 'deberes', 'cambiar', 'escucha', 'mira', 'contesta', 'elige'] },
]

const vocab = [
  { unit_id: 'U71', order: 111.2, row: 16, after: '', title: 'Little Words',
    grammar: 'Pero, o, sin, entre, hasta: words that join; antes de, después de; cuándo asks, cuando joins; todo, toda agree',
    words: ['sin', 'o', 'pero', 'por', 'todo', 'entre', 'sobre', 'antes', 'después', 'cuándo', 'cuando', 'ya', 'solo', 'hasta'] },
  { unit_id: 'U72', order: 113.2, row: 17, after: 'row 16', title: 'The Weather',
    grammar: 'Hace calor, hace frío, hace viento: hacer for the weather; llueve, nieva; hace buen tiempo: buen before a masculine noun',
    words: ['tiempo', 'hace', 'hacer', 'calor', 'llueve', 'llover', 'nieva', 'nevar', 'viento', 'buen', 'nieve', 'lluvia'] },
  { unit_id: 'U73', order: 115.2, row: 18, after: 'row 17', title: 'Hobbies',
    grammar: 'Juego al tenis: jugar a + the sport; ver la televisión, escuchar la radio; correr: corro',
    words: ['televisión', 'radio', 'revista', 'internet', 'juego', 'tenis', 'baloncesto', 'correr', 'corro', 'esquiar', 'gimnasia'] },
  { unit_id: 'U74', order: 117.2, row: 19, after: 'row 18', title: 'Looks + Character',
    grammar: 'Ojos azules, ojos verdes: colours take -s or -es in the plural (marrón, marrones); ser for what someone is like',
    words: ['marrón', 'gris', 'oscuro', 'claros', 'oscuros', 'azules', 'verdes', 'negros', 'marrones', 'bigote', 'gordo', 'gorda', 'lindo', 'linda', 'hermoso', 'hermosa', 'antipático', 'trabajador', 'sociable'] },
  { unit_id: 'U75', order: 119.2, row: 20, after: 'row 19', title: 'Places to Visit',
    grammar: 'Visitar un lugar; el centro de la ciudad; la gente takes a singular verb: la gente es simpática',
    words: ['turismo', 'turista', 'monumento', 'catedral', 'edificio', 'capital', 'lugar', 'lugares', 'centro', 'plano', 'gente', 'exposición', 'visitar', 'famoso'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Read and Answer has three texts per circle that has it. Times as said in Latin America: the twelve-hour clock
// with de la mañana, de la tarde, de la noche; timetables in figures.
const listen = [
  ['N201', 'U61', 'time', 'Son las tres y media.', '3:30'], ['N202', 'U61', 'time', 'Son las ocho y cuarto.', '8:15'],
  ['N203', 'U61', 'time', 'Es mediodía.', '12:00'], ['N204', 'U61', 'time', 'Son las diez menos cuarto.', '9:45'],
  ['N205', 'U62', 'date', 'El cinco de marzo.', '5/3'], ['N206', 'U63', 'date', 'El primero de mayo.', '1/5'],
  ['N207', 'U63', 'date', 'El quince de septiembre.', '15/9'], ['N208', 'U63', 'date', 'El treinta de diciembre.', '30/12'],
  ['N209', 'U67', 'time', 'El autobús sale a las cuatro y veinte.', '4:20'], ['N210', 'U67', 'time', 'El tren llega a las nueve y diez.', '9:10'],
  ['N211', 'U68', 'time', 'Atención: el autobús a Guadalajara sale a las seis.', '6:00'], ['N212', 'U68', 'number', 'El autobús número siete sale ahora.', '7'],
]
const texts = [
  { id: 'R201', unit_id: 'U62', kind: 'notice', title: 'La tienda', lines: ['Abierto de lunes a viernes: 9:00 – 20:00', 'Sábado: 10:00 – 18:00', 'Domingo: cerrado'],
    questions: [{ question: 'When is the shop closed?', choices: ['Sunday', 'Saturday', 'Monday'], answer: 0 }, { question: 'What time does it open on Saturday?', choices: ['10:00', '9:00', '18:00'], answer: 0 }] },
  { id: 'R202', unit_id: 'U62', kind: 'message', title: 'Un mensaje de Juan', lines: ['María:', '¿Vamos al cine el miércoles? Estoy libre el miércoles y el jueves.', 'El sábado trabajo.', 'Juan'],
    questions: [{ question: 'When is Juan free?', choices: ['Wednesday and Thursday', 'Saturday', 'Every day'], answer: 0 }, { question: 'What does Juan do on Saturday?', choices: ['He works', 'He goes to the movies', 'He stays home'], answer: 0 }] },
  { id: 'R203', unit_id: 'U62', kind: 'notice', title: 'El museo', lines: ['El museo está cerrado los martes.', 'Visita para niños: miércoles a las 2 de la tarde'],
    questions: [{ question: 'Which day is the museum closed?', choices: ['Tuesday', 'Wednesday', 'Monday'], answer: 0 }, { question: 'When is the visit for children?', choices: ['Wednesday at 2 pm', 'Tuesday at 2 pm', 'Wednesday at 4 pm'], answer: 0 }] },
  { id: 'R204', unit_id: 'U63', kind: 'notice', title: 'Las vacaciones', lines: ['La escuela está cerrada del 20 de diciembre al 4 de enero.', 'Primer día de clase: lunes 5 de enero'],
    questions: [{ question: 'Which day of the week does school start again?', choices: ['Monday', 'Sunday', 'Saturday'], answer: 0 }, { question: 'When do the holidays begin?', choices: ['20 December', '5 January', '4 January'], answer: 0 }] },
  { id: 'R205', unit_id: 'U63', kind: 'sign', title: 'La fiesta', lines: ['Gran fiesta del pueblo', 'Sábado 21 de junio, a las 6 de la tarde', 'Música y baile'],
    questions: [{ question: 'When is the village party?', choices: ['Saturday 21 June', 'Sunday 21 June', 'Saturday 21 July'], answer: 0 }, { question: 'What time does it start?', choices: ['6 pm', '8 pm', '9 pm'], answer: 0 }] },
  { id: 'R206', unit_id: 'U63', kind: 'message', title: 'Una carta de María', lines: ['En julio vamos a la playa.', 'En invierno vamos a la montaña.', '¿Y tú?'],
    questions: [{ question: 'Where does María go in July?', choices: ['To the beach', 'To the mountains', 'To the countryside'], answer: 0 }, { question: 'When does she go to the mountains?', choices: ['In winter', 'In July', 'In spring'], answer: 0 }] },
  { id: 'R207', unit_id: 'U66', kind: 'sign', title: 'En la tienda', lines: ['Entrada', 'Abierto de 9:00 a 19:00', 'Cerrado los domingos'],
    questions: [{ question: 'When is the shop closed?', choices: ['On Sundays', 'On Saturdays', 'Every evening'], answer: 0 }, { question: 'What time does it close?', choices: ['7 pm', '9 pm', '9 am'], answer: 0 }] },
  { id: 'R208', unit_id: 'U66', kind: 'sign', title: 'En la estación', lines: ['Baños: planta 1', 'Farmacia: planta 2', 'Información: en la entrada'],
    questions: [{ question: 'Where are the toilets?', choices: ['On floor 1', 'On floor 2', 'Next to the exit'], answer: 0 }, { question: 'Where can you get information?', choices: ['At the entrance', 'At the pharmacy', 'On the train'], answer: 0 }] },
  { id: 'R209', unit_id: 'U66', kind: 'notice', title: 'El banco', lines: ['Banco de la Plaza', 'Abierto de lunes a viernes, de 9:00 a 16:00', 'Sábado y domingo: cerrado'],
    questions: [{ question: 'Is the bank open on Saturday?', choices: ['No', 'Yes', 'Only in the morning'], answer: 0 }, { question: 'What time does it close on Friday?', choices: ['4 pm', '9 am', '6 pm'], answer: 0 }] },
  { id: 'R210', unit_id: 'U67', kind: 'timetable', title: 'Autobús a Guadalajara', lines: ['Salida: 8:15 – Llegada: 10:20', 'Salida: 12:40 – Llegada: 14:45', 'Salida: 18:00 – Llegada: 20:05'],
    questions: [{ question: 'When does the 12:40 bus arrive?', choices: ['14:45', '10:20', '20:05'], answer: 0 }, { question: 'What time is the first bus?', choices: ['8:15', '12:40', '18:00'], answer: 0 }] },
  { id: 'R211', unit_id: 'U67', kind: 'timetable', title: 'Autobús 12', lines: ['Salida de la estación: 7:00, 7:30, 8:00', 'Los domingos: un autobús cada hora'],
    questions: [{ question: 'Where does the bus leave from?', choices: ['The station', 'The center', 'The school'], answer: 0 }, { question: 'How often is the bus on Sundays?', choices: ['Every hour', 'Every half hour', 'Not at all'], answer: 0 }] },
  { id: 'R212', unit_id: 'U67', kind: 'message', title: 'Un mensaje de Juan', lines: ['Llego a la estación a las 5:30 de la tarde.', 'Mi autobús sale de Guadalajara a las 3.', '¡Hasta luego!'],
    questions: [{ question: 'When does Juan arrive?', choices: ['5:30 pm', '3:00 pm', '7:30 pm'], answer: 0 }, { question: 'Where does his bus leave from?', choices: ['Guadalajara', 'The airport', 'The station in town'], answer: 0 }] },
  { id: 'R213', unit_id: 'U69', kind: 'notice', title: 'En clase', lines: ['Escucha el texto.', 'Contesta las preguntas.', 'Elige una foto.'],
    questions: [{ question: 'What do you do first?', choices: ['Listen to the text', 'Answer the questions', 'Choose a photo'], answer: 0 }, { question: 'What do you choose?', choices: ['A photo', 'A text', 'A question'], answer: 0 }] },
  { id: 'R214', unit_id: 'U69', kind: 'notice', title: 'La puerta', lines: ['Cierra la puerta, por favor.', 'Atención: cierra despacio.'],
    questions: [{ question: 'What should you do with the door?', choices: ['Close it', 'Leave it open', 'Lock it'], answer: 0 }, { question: 'How should you close it?', choices: ['Slowly', 'Quickly', 'With a key'], answer: 0 }] },
  { id: 'R215', unit_id: 'U69', kind: 'notice', title: 'El ejercicio', lines: ['Elige un número.', 'Abre el libro en esa página.', 'Lee el texto.'],
    questions: [{ question: 'What do you open?', choices: ['The book', 'The door', 'The dictionary'], answer: 0 }, { question: 'What do you do last?', choices: ['Read the text', 'Choose a number', 'Open the book'], answer: 0 }] },
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F201', unit_id: 'U64', card: 'Juan y María van al cine el sábado a las ocho y media de la noche. Se ven en la plaza.',
      fields: [{ key: 'day', label: 'Día', rule: 'text', answer: 'sábado', also: ['Sábado', 'sabado', 'el sábado'] }, { key: 'time', label: 'Hora', rule: 'text', answer: '8:30', also: ['20:30', '8.30', '8:30 pm', '8:30 p. m.', 'ocho y media', 'las ocho y media'] }, { key: 'place', label: 'Lugar', rule: 'text', answer: 'la plaza', also: ['plaza', 'en la plaza'] }] },
    { id: 'F202', unit_id: 'U65', card: 'Me llamo María. Me levanto a las siete. Empiezo el trabajo a las nueve y termino a las cinco.',
      fields: [{ key: 'name', label: 'Nombre', rule: 'text', answer: 'María', also: ['Maria'] }, { key: 'up', label: 'Se levanta', rule: 'text', answer: '7:00', also: ['7', '7 am', '7:00 am', 'siete', 'las siete', 'a las siete'] }, { key: 'start', label: 'Empieza el trabajo', rule: 'text', answer: '9:00', also: ['9', '9 am', '9:00 am', 'nueve', 'las nueve', 'a las nueve'] }, { key: 'end', label: 'Termina el trabajo', rule: 'text', answer: '5:00', also: ['5', '17:00', '5 pm', '5:00 pm', 'cinco', 'las cinco', 'a las cinco'] }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: texts.map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P201', unit_id: 'U62', prompt: 'Write a short message to a friend about your week: what you do on two days.', points: 'two days;what you do', min_words: 20, max_words: 35 },
    { id: 'P202', unit_id: 'U64', prompt: 'Write a short message to invite a friend out: what, which day and what time.', points: 'what;which day;what time', min_words: 20, max_words: 35 },
    { id: 'P203', unit_id: 'U65', prompt: 'Write a few lines about your day: when you get up, work and have dinner.', points: 'when you get up;when you work;when you have dinner', min_words: 25, max_words: 40 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

const canDo = {
  U61: [['listening', 'Listening', 'I can understand the time when someone says it.'], ['speaking', 'Spoken interaction', 'I can ask what time it is and say it.']],
  U37: [['speaking', 'Spoken interaction', "I can say I didn't hear and ask someone to say it again."]],
  U62: [['speaking', 'Spoken production', 'I can say what day it is and how often I do something.']],
  U63: [['listening', 'Listening', 'I can understand dates and months.'], ['speaking', 'Spoken production', 'I can say when my birthday is.']],
  U38: [['speaking', 'Spoken interaction', 'I can ask for a moment to think.']],
  U64: [['speaking', 'Spoken interaction', 'I can make a simple plan with someone: what, when and where.']],
  U65: [['speaking', 'Spoken production', 'I can describe my day in simple words.']],
  U66: [['reading', 'Reading', 'I can understand simple signs and notices: open, closed, entrance, exit.']],
  U67: [['reading', 'Reading', 'I can find a departure or arrival time on a timetable.']],
  U39: [['speaking', 'Spoken interaction', "I can say I'm not sure or don't know."]],
  U68: [['listening', 'Listening', 'I can understand a short announcement at a station.']],
  U69: [['reading', 'Reading', 'I can follow short, simple instructions.']],
  U71: [['reading', 'Reading', 'I can understand the small words that link a sentence: but, or, without, before, after.']],
  U72: [['speaking', 'Spoken production', 'I can say what the weather is like.']],
  U73: [['speaking', 'Spoken production', 'I can say what I do in my free time.']],
  U74: [['speaking', 'Spoken production', 'I can describe what someone looks like and what they are like.']],
  U75: [['reading', 'Reading', 'I can understand short texts about places to visit.']],
}

export default {
  part: 3, wordBase: 1201, vocabBase: 1401, cdBase: 301,
  slots: [{ slot_id: 'C05', part: 3, after_row: 17 }, { slot_id: 'C06', part: 3, after_row: 19 }],
  situation, vocab, items, canDo, off: {},
  // Added in review: que (creo que, tengo que) and del (de + el), which the course never had.
  late: [{ unit_id: 'U71', words: ['que', 'del'] }],
}
