// French A1 · Part 3, Time and Plans (Dan, 2026-11-14), in Part 2's format: telling the time, days, months and dates,
// making plans and a day's routine (T05); signs, notices and timetables (T09); announcements and simple instructions
// (T12); the help thread goes on (T13). Words from the FLELex core 600 where they fit (scripts/a1-coverage.mjs --missing),
// checked against Tatoeba first (scripts/circle-feasibility.mjs). Vocabulary circles carry the core's small words
// (que, tout, moi, rien…), common verbs and opinions, and places to visit; themes stay clear of Parts 4 to 6 (food and
// drink, directions, home, family, work). Read and Answer has several texts per circle, so a circle never repeats one.
// Used by scripts/add-part.mjs (COURSE=fr PART=3).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U61', order: 111, row: 16, after: '', title: 'What Time Is It?', tasks: 'T05',
    grammar: "Il est trois heures; trois heures et demie, et quart, moins le quart; à midi; tôt and tard",
    words: ['minute', 'heures', 'midi', 'demie', 'quart', 'moins', 'tôt', 'tard', 'après-midi', 'nuit'] },
  { unit_id: 'U37', order: 111.5, row: 16.5, after: 'row 16', title: "Didn't Catch That", help: true, tasks: 'T13',
    grammar: "Pardon ? Quoi ? Je n'ai pas entendu. Désolé, désolée", words: ['entends', 'entendu', 'quoi', 'désolé', 'désolée'] },
  { unit_id: 'U62', order: 112, row: 17, after: 'row 16', title: 'Days of the Week', tasks: 'T05;T09',
    grammar: 'Lundi (on Monday), le lundi (every Monday); la semaine prochaine, le week-end dernier: prochain and dernier agree',
    words: ['mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'week-end', 'hier', 'prochain', 'prochaine', 'dernier', 'dernière'] },
  { unit_id: 'U63', order: 113, row: 17, after: 'row 16', title: 'Months + Seasons', tasks: 'T05;T09',
    grammar: 'En janvier, en été, en hiver, but au printemps; le premier mai, le deux mai: premier only for the first',
    words: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre', 'été', 'hiver', 'printemps', 'automne', 'date', 'premier'] },
  { unit_id: 'U38', order: 113.5, row: 17.5, after: 'row 17', title: 'Thinking It Over', help: true, tasks: 'T13',
    grammar: 'Un instant. Attends, je réfléchis. Voyons…', words: ['réfléchis', 'réfléchir', 'instant', 'voyons', 'attends'] },
  { unit_id: 'U64', order: 114, row: 18, after: 'row 17', title: 'Making Plans', tasks: 'T05',
    grammar: 'Tu viens ? On va voir un film: aller + a verb for a plan; venir: je viens, il vient; sortir: je sors',
    words: ['viens', 'vient', 'venir', 'sortir', 'sors', 'voir', 'vois', 'rester', 'ensemble', 'libre', 'rendez-vous'] },
  { unit_id: 'U65', order: 115, row: 18, after: 'row 17', title: 'My Day', tasks: 'T05',
    grammar: "Je me lève, je dors: verbs with me; d'abord, ensuite, puis, après: putting the day in order",
    words: ['lève', 'me', 'dors', 'dormir', 'finis', 'commence', 'déjeuner', 'dîner', "d'abord", 'ensuite', 'puis', 'après', 'avant'] },
  { unit_id: 'U66', order: 116, row: 19, after: 'row 18', title: 'Signs + Notices', tasks: 'T09',
    grammar: 'Ouvert, fermé: the forms on a sign; le magasin est fermé, la porte est fermée: they agree',
    words: ['entrée', 'sortie', 'ouvert', 'ouverte', 'fermé', 'fermée', 'attention', 'toilettes', 'parking', 'centre', 'information'] },
  { unit_id: 'U67', order: 117, row: 19, after: 'row 18', title: 'Timetables', tasks: 'T09',
    grammar: 'Le train part à huit heures, il arrive à dix heures: partir and arriver; depuis, pendant',
    words: ['arrive', 'arriver', 'part', 'partir', 'départ', 'arrivée', 'retour', 'depuis', 'pendant', 'quai'] },
  { unit_id: 'U39', order: 117.5, row: 19.5, after: 'row 19', title: 'Not Sure', help: true, tasks: 'T13',
    grammar: "Je ne suis pas sûr, pas sûre. Aucune idée. C'est possible.", words: ['sûr', 'sûre', 'idée', 'aucune', 'possible'] },
  { unit_id: 'U68', order: 118, row: 20, after: 'row 19', title: 'Announcements', tasks: 'T12',
    grammar: 'Descendez, montez: the vous command; le train a du retard',
    words: ['descendre', 'descendez', 'monter', 'montez', 'retard'] },
  { unit_id: 'U69', order: 119, row: 20, after: 'row 19', title: 'Instructions', tasks: 'T12',
    grammar: 'Ouvrez, fermez, écoutez: the vous command is the vous form without vous; ouvre, ferme for tu',
    words: ['ouvre', 'ouvrez', 'ferme', 'fermez', 'tourne', 'réponds', 'répondez', 'choisis', 'écoutez'] },
]

const vocab = [
  { unit_id: 'U71', order: 111.2, row: 16, after: '', title: 'Little Words',
    grammar: "Toujours, souvent, parfois, jamais: how often; ne … jamais; je pense que …: que joins two parts",
    words: ['que', 'tout', 'y', 'alors', 'quand', 'comme', 'toujours', 'souvent', 'jamais', 'parfois', 'déjà', 'vraiment', 'peut-être', 'seulement'] },
  { unit_id: 'U72', order: 113.2, row: 17, after: 'row 16', title: 'Me + You',
    grammar: 'Moi, toi, lui, eux: after a preposition (avec moi, chez toi); personne and rien with ne',
    words: ['moi', 'toi', 'lui', 'eux', 'leur', 'notre', 'nos', 'personne', 'rien', "quelqu'un", 'autre', 'chaque', 'même'] },
  { unit_id: 'U73', order: 115.2, row: 18, after: 'row 17', title: 'Doing Things',
    grammar: 'Je prends, je mets, je donne: everyday verbs in the present; aider + a person (j\'aide Paul)',
    words: ['mets', 'donne', 'trouve', 'trouver', 'passe', 'prends', 'prendre', 'aide', 'aider', 'oublie', 'montre'] },
  { unit_id: 'U74', order: 117.2, row: 19, after: 'row 18', title: 'Likes + Opinions',
    grammar: "J'adore, je préfère, je déteste + le, la, les; je pense que, je crois que; ça me plaît",
    words: ['adore', 'préfère', 'déteste', 'pense', 'crois', 'plaît', 'intéressant', 'génial', 'super', 'magnifique'] },
  { unit_id: 'U75', order: 119.2, row: 20, after: 'row 19', title: 'Places to Visit',
    grammar: 'Visiter un château, rencontrer des gens; le monde: tout le monde (everyone)',
    words: ['visiter', 'visite', 'château', 'île', 'région', 'monde', 'rencontrer', 'découvrir', 'célèbre', 'ancien', 'quartier'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Read and Answer has three texts per circle that has it. Times are written as on a French timetable (14h30).
const listen = [
  ['N201', 'U61', 'time', 'Il est trois heures et demie.', '3:30'], ['N202', 'U61', 'time', 'Il est huit heures et quart.', '8:15'],
  ['N203', 'U61', 'time', 'Il est midi.', '12:00'], ['N204', 'U61', 'time', 'Il est dix heures moins le quart.', '9:45'],
  ['N205', 'U62', 'date', 'Le cinq mars.', '5/3'], ['N206', 'U63', 'date', 'Le premier mai.', '1/5'],
  ['N207', 'U63', 'date', 'Le quatorze juillet.', '14/7'], ['N208', 'U63', 'date', 'Le vingt-cinq décembre.', '25/12'],
  ['N209', 'U67', 'time', 'Le train part à seize heures vingt.', '16:20'], ['N210', 'U67', 'time', 'Le bus arrive à neuf heures dix.', '9:10'],
  ['N211', 'U68', 'time', 'Le train pour Lyon part à dix-huit heures.', '18:00'], ['N212', 'U68', 'number', 'Le train part du quai numéro sept.', '7'],
]
const texts = [
  { id: 'R201', unit_id: 'U62', kind: 'notice', title: 'La piscine', lines: ['Ouvert du lundi au vendredi : 9h – 20h', 'Samedi : 10h – 18h', 'Dimanche : fermé'],
    questions: [{ question: 'When is the pool closed?', choices: ['Sunday', 'Saturday', 'Monday'], answer: 0 }, { question: 'What time does it open on Saturday?', choices: ['10:00', '9:00', '18:00'], answer: 0 }] },
  { id: 'R202', unit_id: 'U62', kind: 'message', title: 'Un message de Paul', lines: ['Marie,', 'Le cinéma, mercredi ? Je suis libre mercredi et jeudi.', 'Samedi, je travaille.', 'Paul'],
    questions: [{ question: 'When is Paul free?', choices: ['Wednesday and Thursday', 'Saturday', 'Every day'], answer: 0 }, { question: 'What does Paul do on Saturday?', choices: ['He works', 'He goes to the cinema', 'He stays home'], answer: 0 }] },
  { id: 'R203', unit_id: 'U62', kind: 'notice', title: 'Le musée', lines: ['Le musée est fermé le mardi.', 'Visite pour les enfants : mercredi à 14h'],
    questions: [{ question: 'Which day is the museum closed?', choices: ['Tuesday', 'Wednesday', 'Monday'], answer: 0 }, { question: 'When is the visit for children?', choices: ['Wednesday at 2 pm', 'Tuesday at 2 pm', 'Wednesday at 4 pm'], answer: 0 }] },
  { id: 'R204', unit_id: 'U63', kind: 'notice', title: 'Les vacances', lines: ["L'école est fermée du 20 décembre au 4 janvier.", 'Retour : le lundi 5 janvier'],
    questions: [{ question: 'Which day of the week does school start again?', choices: ['Monday', 'Sunday', 'Saturday'], answer: 0 }, { question: 'When do the holidays begin?', choices: ['20 December', '5 January', '4 January'], answer: 0 }] },
  { id: 'R205', unit_id: 'U63', kind: 'sign', title: 'La fête', lines: ['Grande fête du village', 'Samedi 21 juin, à partir de 18h', 'Musique et danse'],
    questions: [{ question: 'When is the village party?', choices: ['Saturday 21 June', 'Sunday 21 June', 'Saturday 21 July'], answer: 0 }, { question: 'What time does it start?', choices: ['6 pm', '8 pm', '9 pm'], answer: 0 }] },
  { id: 'R206', unit_id: 'U63', kind: 'message', title: 'Une carte de Marie', lines: ['En juillet, nous allons à la mer.', 'En hiver, nous allons à la montagne.', 'Et toi ?'],
    questions: [{ question: 'Where does Marie go in July?', choices: ['To the sea', 'To the mountains', 'To the countryside'], answer: 0 }, { question: 'When does she go to the mountains?', choices: ['In winter', 'In July', 'In spring'], answer: 0 }] },
  { id: 'R207', unit_id: 'U66', kind: 'sign', title: 'Au magasin', lines: ['Entrée', 'Ouvert de 9h à 19h', 'Fermé le dimanche'],
    questions: [{ question: 'When is the shop closed?', choices: ['On Sunday', 'On Saturday', 'Every evening'], answer: 0 }, { question: 'What time does it close?', choices: ['7 pm', '9 pm', '9 am'], answer: 0 }] },
  { id: 'R208', unit_id: 'U66', kind: 'sign', title: 'À la gare', lines: ['Attention : sortie à gauche', 'Toilettes : quai 2', 'Informations : à l\'entrée'],
    questions: [{ question: 'Where are the toilets?', choices: ['Platform 2', 'Platform 1', 'Near the café'], answer: 0 }, { question: 'Where can you get information?', choices: ['At the entrance', 'At the exit', 'On the train'], answer: 0 }] },
  { id: 'R209', unit_id: 'U66', kind: 'notice', title: 'Le parking', lines: ['Parking du centre', 'Ouvert la nuit', 'Gratuit le dimanche'],
    questions: [{ question: 'Is the car park open at night?', choices: ['Yes', 'No', 'Only on Sunday'], answer: 0 }, { question: 'When is it free?', choices: ['On Sunday', 'At night', 'Every day'], answer: 0 }] },
  { id: 'R210', unit_id: 'U67', kind: 'timetable', title: 'Train pour Lyon', lines: ['Départ : 8h15 – Arrivée : 10h20', 'Départ : 12h40 – Arrivée : 14h45', 'Départ : 18h00 – Arrivée : 20h05'],
    questions: [{ question: 'When does the 12:40 train arrive?', choices: ['14:45', '10:20', '20:05'], answer: 0 }, { question: 'What time is the first train?', choices: ['8:15', '12:40', '18:00'], answer: 0 }] },
  { id: 'R211', unit_id: 'U67', kind: 'timetable', title: 'Bus 12', lines: ['Départ de la gare : 7h, 7h30, 8h', 'Le dimanche : un bus toutes les heures'],
    questions: [{ question: 'Where does the bus leave from?', choices: ['The station', 'The centre', 'The school'], answer: 0 }, { question: 'How often is the bus on Sunday?', choices: ['Every hour', 'Every half hour', 'Not at all'], answer: 0 }] },
  { id: 'R212', unit_id: 'U67', kind: 'message', title: 'Un message de Paul', lines: ["J'arrive à la gare à 17h30.", 'Mon train part de Paris à 15h.', 'À ce soir !'],
    questions: [{ question: 'When does Paul arrive?', choices: ['17:30', '15:00', '7:30'], answer: 0 }, { question: 'Where does his train leave from?', choices: ['Paris', 'Lyon', 'The station in town'], answer: 0 }] },
  { id: 'R213', unit_id: 'U69', kind: 'notice', title: 'En classe', lines: ['Écoutez le texte.', 'Répondez aux questions.', 'Choisissez une image.'],
    questions: [{ question: 'What do you do first?', choices: ['Listen to the text', 'Answer the questions', 'Choose a picture'], answer: 0 }, { question: 'What do you choose?', choices: ['A picture', 'A text', 'A question'], answer: 0 }] },
  { id: 'R214', unit_id: 'U69', kind: 'notice', title: 'La porte', lines: ['Fermez la porte, s\'il vous plaît.', 'Attention : fermez doucement.'],
    questions: [{ question: 'What should you do with the door?', choices: ['Close it', 'Leave it open', 'Lock it'], answer: 0 }, { question: 'How should you close it?', choices: ['Gently', 'Quickly', 'With a key'], answer: 0 }] },
  { id: 'R215', unit_id: 'U69', kind: 'notice', title: 'Le jeu', lines: ['Choisis un numéro.', 'Tourne la carte.', 'Réponds à la question.'],
    questions: [{ question: 'What do you turn over?', choices: ['The card', 'The number', 'The page'], answer: 0 }, { question: 'What do you do last?', choices: ['Answer the question', 'Choose a number', 'Turn the card'], answer: 0 }] },
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F201', unit_id: 'U64', card: "Paul et Marie vont au cinéma samedi à huit heures et demie. Le rendez-vous est devant la gare.",
      fields: [{ key: 'day', label: 'Jour', rule: 'text', answer: 'samedi', also: ['Samedi'] }, { key: 'time', label: 'Heure', rule: 'text', answer: '20h30', also: ['20:30', '8h30', '8:30', 'huit heures et demie'] }, { key: 'place', label: 'Lieu', rule: 'text', answer: 'la gare', also: ['gare', 'devant la gare'] }] },
    { id: 'F202', unit_id: 'U65', card: "Je m'appelle Marie. Je me lève à sept heures. Je commence le travail à neuf heures et je finis à cinq heures.",
      fields: [{ key: 'name', label: 'Prénom', rule: 'text', answer: 'Marie' }, { key: 'up', label: 'Lever', rule: 'text', answer: '7h', also: ['7:00', '7h00', 'sept heures', '7'] }, { key: 'start', label: 'Début du travail', rule: 'text', answer: '9h', also: ['9:00', '9h00', 'neuf heures', '9'] }, { key: 'end', label: 'Fin du travail', rule: 'text', answer: '17h', also: ['17:00', '5h', '5:00', 'cinq heures', '17h00'] }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: texts.map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P201', unit_id: 'U62', prompt: 'Write a short message to a friend about your week: what you do on two days.', points: 'two days;what you do', min_words: 20, max_words: 35 },
    { id: 'P202', unit_id: 'U64', prompt: 'Write a short message to invite a friend out: what, which day and what time.', points: 'what;which day;what time', min_words: 20, max_words: 35 },
    { id: 'P203', unit_id: 'U65', prompt: 'Write a few lines about your day: when you get up, work and go to sleep.', points: 'when you get up;when you work;when you go to sleep', min_words: 25, max_words: 40 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

const canDo = {
  U61: [['listening', 'Listening', 'I can understand the time when someone says it.'], ['speaking', 'Spoken interaction', 'I can ask what time it is and say it.']],
  U37: [['speaking', 'Spoken interaction', "I can say I didn't hear and ask someone to say it again."]],
  U62: [['speaking', 'Spoken production', 'I can say what day it is and talk about this week and last week.']],
  U63: [['listening', 'Listening', 'I can understand dates and months.'], ['speaking', 'Spoken production', 'I can say when my birthday is.']],
  U38: [['speaking', 'Spoken interaction', 'I can ask for a moment to think.']],
  U64: [['speaking', 'Spoken interaction', 'I can make a simple plan with someone: what, when and where.']],
  U65: [['speaking', 'Spoken production', 'I can describe my day in simple words.']],
  U66: [['reading', 'Reading', 'I can understand simple signs and notices: open, closed, entrance, exit.']],
  U67: [['reading', 'Reading', 'I can find a departure or arrival time on a timetable.']],
  U39: [['speaking', 'Spoken interaction', "I can say I'm not sure or don't know."]],
  U68: [['listening', 'Listening', 'I can understand a short announcement at a station.']],
  U69: [['reading', 'Reading', 'I can follow short, simple instructions.']],
  U71: [['reading', 'Reading', 'I can understand the small words that link a sentence: always, never, when, already.']],
  U72: [['reading', 'Reading', 'I can understand who a sentence is about: me, you, him, them, nobody, someone.']],
  U73: [['speaking', 'Spoken production', 'I can say simple things I do: take, put, give, find, help.']],
  U74: [['speaking', 'Spoken production', 'I can say what I like, love, prefer and hate, and what I think.']],
  U75: [['reading', 'Reading', 'I can understand short texts about places to visit.']],
}

export default {
  part: 3, wordBase: 1201, vocabBase: 1401, cdBase: 301,
  slots: [{ slot_id: 'C05', part: 3, after_row: 17 }, { slot_id: 'C06', part: 3, after_row: 19 }],
  situation, vocab, items, canDo, late: [], off: {},
}
