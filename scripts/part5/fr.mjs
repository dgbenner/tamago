// French A1 · Part 5, Home and Work (Dan, 2026-11-15), in the format of Parts 3 and 4: family, home and housework, work
// and school (T06), forms (T10), messages and e-mails (T11); the help thread goes on (T13). "te", "n'" and "avez"
// come first (U501), so the circles after it, and their drafts, can use them. Home, family and work words that sit in
// the Family, Home and Office topic packs (maison, mère, travail …) are borrowed here, so the path teaches them to a
// learner who chose another pack (lessonScope introduces a pack word as new unless that learner met it).
// Words from the FLELex core 600 where they fit, checked against Tatoeba first (scripts/circle-feasibility.mjs).
// Read and Answer has three texts per circle that has it.
// Used by scripts/add-part.mjs (COURSE=fr PART=5).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U501', order: 131, row: 26, after: '', title: 'People You Know', tasks: 'T06',
    grammar: "Tu connais Paul ? Je te connais: te (you) before the verb, t' before a vowel; je n'ai pas, ce n'est pas: n' before a vowel; vous avez (you have)",
    words: ['te', "n'", 'avez', 'connais', 'connaît', 'connaître', 'rappelle', 'rappeler'] },
  { unit_id: 'U521', order: 131.5, row: 26.5, after: 'row 26', title: 'Being Polite', help: true, tasks: 'T13',
    grammar: "Je vous dérange ? Ce n'est pas la peine (no need). Vous avez raison, tu as raison (you're right).",
    words: ['dérange', 'déranger', 'peine', 'raison'] },
  { unit_id: 'U502', order: 132, row: 27, after: 'row 26', title: 'My Family', tasks: 'T06',
    grammar: "J'ai un frère et deux sœurs; ma mère, mon père, mes parents; il est marié, elle est mariée; il est âgé",
    words: ['mari', 'marié', 'mariée', 'âgé', 'mariage'],
    borrow: ['famille', 'mère', 'père', 'frère', 'sœur', 'fils', 'parents', 'bébé'] },
  { unit_id: 'U503', order: 133, row: 27, after: 'row 26', title: 'At Home', tasks: 'T06',
    grammar: "Je vis dans une maison: vivre (je vis, il vit); trois pièces: le salon, la cuisine, la chambre; la salle de bain",
    words: ['vis', 'vit', 'vivre', 'salle', 'bain', 'pièce', 'salon', 'mur', 'clé'],
    borrow: ['maison', 'chambre', 'cuisine', 'porte', 'fenêtre', 'lit', 'table', 'chaise'] },
  { unit_id: 'U504', order: 134, row: 28, after: 'row 27', title: 'Housework', tasks: 'T06',
    grammar: "Je fais le ménage; je lave, tu laves, il lave: -er verbs; ranger, garder (to keep)",
    words: ['lave', 'laver', 'ménage', 'ranger', 'garde', 'garder', 'ordinateur', 'télé'] },
  { unit_id: 'U505', order: 135, row: 28, after: 'row 27', title: 'At Work', tasks: 'T06;T10',
    grammar: "Je travaille dans une entreprise; il est journaliste: no article before a job; une réunion au bureau",
    words: ['collègue', 'directeur', 'secrétaire', 'journaliste', 'métier', 'projet', 'réunion', 'entreprise'],
    borrow: ['travail', 'travaille', 'travaillent', 'bureau', 'patron'] },
  { unit_id: 'U522', order: 135.5, row: 28.5, after: 'row 28', title: 'Saying Why', help: true, tasks: 'T13',
    grammar: "Pourquoi ? Parce que … (because); qu' before a vowel: parce qu'il, qu'est-ce que; par exemple; qu'est-ce que tu dis ?",
    words: ['parce', "qu'", 'dis', 'exemple', 'phrase'] },
  { unit_id: 'U506', order: 136, row: 29, after: 'row 28', title: 'School + Study', tasks: 'T06',
    grammar: "J'étudie les maths: étudier; au collège, au lycée, à l'université; un examen, un exercice, la réponse",
    words: ['étudie', 'étudier', 'classe', 'collège', 'lycée', 'université', 'prof', 'examen', 'maths', 'exercice', 'réponse'] },
  { unit_id: 'U507', order: 137, row: 29, after: 'row 28', title: 'Messages', tasks: 'T11',
    grammar: "J'écris un message; j'envoie un mail: envoyer (j'envoie); allô ? c'est Paul",
    words: ['message', 'mail', 'envoyer', 'envoie', 'internet', 'allô', 'écris'] },
  { unit_id: 'U523', order: 137.5, row: 29.5, after: 'row 29', title: 'Feeling Like It', help: true, tasks: 'T13',
    grammar: "Tu as envie de … ? (do you feel like); je veux bien; oui, volontiers ! (gladly)",
    words: ['envie', 'veux', 'volontiers'] },
  { unit_id: 'U508', order: 138, row: 30, after: 'row 29', title: 'Filling In Forms', tasks: 'T10',
    grammar: 'Nom, prénom, date et lieu de naissance, nationalité, profession; marié(e) or célibataire; Madame, Mademoiselle, Monsieur',
    words: ['nationalité', 'profession', 'mademoiselle', 'naissance', 'lieu', 'célibataire', 'signature'] },
  { unit_id: 'U509', order: 139, row: 30, after: 'row 29', title: 'See You Soon', tasks: 'T11',
    grammar: "At the end of a message: je t'embrasse, bises, à bientôt; on se retrouve au café; je quitte la maison à huit heures",
    words: ['embrasse', 'bise', 'bises', 'revoir', 'retrouver', 'retrouve', 'quitter', 'quitte'] },
]

const vocab = [
  { unit_id: 'U511', order: 131.2, row: 26, after: '', title: 'Family Words',
    grammar: "Maman, papa; mon oncle, ma tante, mon cousin; mon copain (my boyfriend, or a friend), ma copine",
    words: ['maman', 'papa', 'grand-mère', 'grand-père', 'oncle', 'tante', 'cousin'] },
  { unit_id: 'U512', order: 133.2, row: 27, after: 'row 26', title: 'Morning + Night',
    grammar: "Je me réveille, il se couche: me and se before the verb (reflexive verbs); la journée, la soirée; je prépare le dîner",
    words: ['se', 'réveille', 'couche', 'coucher', 'journée', 'soirée', 'prépare', 'préparer', 'repose', 'habitude'] },
  { unit_id: 'U513', order: 135.2, row: 28, after: 'row 27', title: 'Have To',
    grammar: "Je dois partir: devoir + a verb; il faut (you have to, it takes); je n'ai pas le temps; j'ai mal (it hurts)",
    words: ['dois', 'doit', 'devoir', 'faut', 'falloir', 'mal'] },
  { unit_id: 'U514', order: 137.2, row: 29, after: 'row 28', title: 'Invitations',
    grammar: "Je t'invite: te becomes t' before a vowel; avec plaisir; je te remercie; bonne chance !",
    words: ['invite', 'inviter', 'fêter', 'plaisir', 'chance', 'remercie', 'remercier'] },
  { unit_id: 'U515', order: 139.2, row: 30, after: 'row 29', title: 'Love + Dreams',
    grammar: "Il est amoureux, elle est amoureuse (de); je rêve de voyager; un rêve, l'amour, le cœur",
    words: ['amour', 'amoureux', 'amoureuse', 'rêve', 'rêver', 'cœur'] },
]

const listen = [
  ['N501', 'U502', 'number', 'Ma grand-mère a soixante-dix-huit ans.', '78'], ['N502', 'U502', 'number', 'Nous sommes cinq dans la famille.', '5'],
  ['N503', 'U503', 'number', "L'appartement a quatre pièces.", '4'], ['N504', 'U503', 'phone', "Mon numéro, c'est le zéro un, quarante-deux, trente, dix-huit, seize.", '01 42 30 18 16'],
  ['N505', 'U505', 'time', 'La réunion est à neuf heures et demie.', '9:30'], ['N506', 'U505', 'date', "La réunion, c'est le douze mars.", '12/3'],
  ['N507', 'U506', 'time', "L'examen commence à quatorze heures.", '14:00'], ['N508', 'U506', 'number', "Faites l'exercice numéro sept.", '7'],
]
const texts = [
  { id: 'R501', unit_id: 'U503', kind: 'notice', title: 'Appartement', lines: ['Trois pièces', 'Salon, cuisine, deux chambres', 'Salle de bain avec fenêtre', '850 € par mois'],
    questions: [{ question: 'How many bedrooms are there?', choices: ['Two', 'Three', 'One'], answer: 0 }, { question: 'How much is it a month?', choices: ['€850', '€350', '€580'], answer: 0 }] },
  { id: 'R502', unit_id: 'U503', kind: 'message', title: 'Un message de Léa', lines: ['Maman,', "Je n'ai pas la clé de la maison.", 'Tu rentres à quelle heure ?', 'Léa'],
    questions: [{ question: "What doesn't Léa have?", choices: ['The house key', 'Her phone', 'Her bag'], answer: 0 }, { question: 'Who is the message for?', choices: ['Her mother', 'Her father', 'Her brother'], answer: 0 }] },
  { id: 'R503', unit_id: 'U503', kind: 'message', title: 'Un message de Paul', lines: ['Marie,', 'La clé est sous la porte.', 'Le dîner est dans la cuisine.', 'Bonne nuit !'],
    questions: [{ question: 'Where is the key?', choices: ['Under the door', 'On the table', 'In the bag'], answer: 0 }, { question: 'Where is dinner?', choices: ['In the kitchen', 'In the living room', 'In the bedroom'], answer: 0 }] },
  { id: 'R504', unit_id: 'U505', kind: 'notice', title: 'Réunion', lines: ["Réunion de l'équipe", 'Lundi, 9h30, salle 2', 'Avec le directeur'],
    questions: [{ question: 'When is the meeting?', choices: ['Monday at 9:30', 'Tuesday at 2:00', 'Friday at 9:00'], answer: 0 }, { question: 'Who will be there?', choices: ['The director', 'The secretary', 'A journalist'], answer: 0 }] },
  { id: 'R505', unit_id: 'U505', kind: 'message', title: 'Pour Sophie', lines: ['Bonjour Sophie,', "Mon fils n'est pas bien.", "Je travaille à la maison aujourd'hui.", 'Merci, Paul'],
    questions: [{ question: 'Where is Paul working today?', choices: ['At home', 'At the office', 'At school'], answer: 0 }, { question: 'Why?', choices: ['His son is not well', 'He is on holiday', 'The office is closed'], answer: 0 }] },
  { id: 'R506', unit_id: 'U505', kind: 'notice', title: 'Le bureau', lines: ['Du lundi au vendredi : 8h30 – 17h', 'Déjeuner : 12h – 13h', 'Fermé le samedi et le dimanche'],
    questions: [{ question: 'When does the office open?', choices: ['8:30', '5 pm', '1 pm'], answer: 0 }, { question: 'Which days is it closed?', choices: ['Saturday and Sunday', 'Monday and Friday', 'It is never closed'], answer: 0 }] },
  { id: 'R507', unit_id: 'U506', kind: 'timetable', title: 'Lundi', lines: ['8h : maths', '9h : anglais', '10h : histoire', '11h : sport'],
    questions: [{ question: 'What is at 9:00?', choices: ['English', 'Maths', 'History'], answer: 0 }, { question: 'When is sport?', choices: ['11:00', '8:00', '10:00'], answer: 0 }] },
  { id: 'R508', unit_id: 'U506', kind: 'notice', title: "L'examen", lines: ['Examen de français', 'Le 15 juin, à 14h', 'Salle 12', "Pas de téléphone, s'il vous plaît."],
    questions: [{ question: 'What date is the exam?', choices: ['15 June', '15 July', '5 June'], answer: 0 }, { question: 'What is not allowed?', choices: ['Phones', 'Pens', 'Books'], answer: 0 }] },
  { id: 'R509', unit_id: 'U506', kind: 'message', title: 'Un message du prof', lines: ['Bonjour,', "Pas de classe demain : je suis à l'université.", 'Pour jeudi : exercices 3 et 4.'],
    questions: [{ question: 'Why is there no class tomorrow?', choices: ['The teacher is at the university', 'The teacher is ill', 'It is a holiday'], answer: 0 }, { question: 'What is for Thursday?', choices: ['Exercises 3 and 4', 'Exercise 1', 'An exam'], answer: 0 }] },
  { id: 'R510', unit_id: 'U507', kind: 'message', title: 'Un message de Tom', lines: ['Salut !', 'Je suis au café avec Léa.', 'Tu viens ? Envoie-moi un message.'],
    questions: [{ question: 'Where is Tom?', choices: ['At the café', 'At work', 'At home'], answer: 0 }, { question: 'Who is with him?', choices: ['Léa', 'His mother', 'A colleague'], answer: 0 }] },
  { id: 'R511', unit_id: 'U507', kind: 'message', title: 'Un mail', lines: ['Bonjour Madame Martin,', 'Merci pour votre message.', 'Je vous rappelle demain à 10h.', 'Paul Durand'],
    questions: [{ question: 'When will Paul call back?', choices: ['Tomorrow at 10:00', 'Today at 10:00', 'Tomorrow at 2:00'], answer: 0 }, { question: 'Who is the mail to?', choices: ['Mrs Martin', 'Mr Durand', 'Paul'], answer: 0 }] },
  { id: 'R512', unit_id: 'U507', kind: 'message', title: 'Pour Marc', lines: ['Marc,', 'Ta mère a un message pour toi.', "Rappelle-la, s'il te plaît."],
    questions: [{ question: 'Who has a message for Marc?', choices: ['His mother', 'His father', 'A colleague'], answer: 0 }, { question: 'What should Marc do?', choices: ['Call her back', 'Write to her', 'Go home'], answer: 0 }] },
  { id: 'R513', unit_id: 'U509', kind: 'message', title: 'Une carte de Nice', lines: ['Chère Julie,', "Nice, c'est super ! La ville est belle.", 'Je rentre samedi.', "Je t'embrasse, Marie"],
    questions: [{ question: 'Where is Marie?', choices: ['In Nice', 'In Paris', 'In Lyon'], answer: 0 }, { question: 'When does she go home?', choices: ['Saturday', 'Sunday', 'Monday'], answer: 0 }] },
  { id: 'R514', unit_id: 'U509', kind: 'message', title: 'Merci !', lines: ['Chers amis,', 'Merci pour la belle soirée !', 'On se retrouve en juin ?', 'Bises, Paul'],
    questions: [{ question: 'What is Paul thanking them for?', choices: ['The evening', 'The present', 'The trip'], answer: 0 }, { question: 'When does he want to meet again?', choices: ['In June', 'In July', 'Tomorrow'], answer: 0 }] },
  { id: 'R515', unit_id: 'U509', kind: 'message', title: 'Au revoir', lines: ['Je quitte Paris lundi.', 'Merci pour tout !', 'Au revoir et à bientôt, Sophie'],
    questions: [{ question: 'When is Sophie leaving Paris?', choices: ['Monday', 'Friday', 'Sunday'], answer: 0 }, { question: 'What does she say?', choices: ['Thank you for everything', 'Happy birthday', 'Good luck'], answer: 0 }] },
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F501', unit_id: 'U508', card: "Je m'appelle Julie Bernard. Je suis née le trois avril, à Lyon. Je suis française et je suis journaliste.",
      fields: [{ key: 'last', label: 'Nom', rule: 'text', answer: 'Bernard' }, { key: 'first', label: 'Prénom', rule: 'text', answer: 'Julie' },
        { key: 'born', label: 'Date de naissance', rule: 'text', answer: '3 avril', also: ['3/4', '03/04', 'le 3 avril', 'trois avril'] }, { key: 'place', label: 'Lieu de naissance', rule: 'text', answer: 'Lyon' },
        { key: 'nat', label: 'Nationalité', rule: 'text', answer: 'française', also: ['française', 'francaise'] }, { key: 'job', label: 'Profession', rule: 'text', answer: 'journaliste' }] },
    { id: 'F502', unit_id: 'U505', card: "Marc Petit a trente-quatre ans. Il est marié et il a deux enfants. Il est directeur.",
      fields: [{ key: 'last', label: 'Nom', rule: 'text', answer: 'Petit' }, { key: 'age', label: 'Âge', rule: 'number', answer: '34' },
        { key: 'family', label: 'Situation de famille', rule: 'text', answer: 'marié' }, { key: 'kids', label: 'Enfants', rule: 'number', answer: '2' },
        { key: 'job', label: 'Profession', rule: 'text', answer: 'directeur' }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: texts.map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P501', unit_id: 'U502', prompt: 'Write a short message to a new friend about your family: who is in it, their ages and where they live.', points: 'who is in your family;their ages;where they live', min_words: 25, max_words: 40 },
    { id: 'P502', unit_id: 'U507', prompt: "Write a short e-mail to a colleague: you can't come to the meeting, why, and another day you can.", points: "you can't come;why;another day", min_words: 25, max_words: 40 },
    { id: 'P503', unit_id: 'U509', prompt: 'Write a short message to thank a friend for a party: thank them, say what you liked and when you will meet again.', points: 'thank them;what you liked;when you meet again', min_words: 25, max_words: 40 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

const canDo = {
  U501: [['speaking', 'Spoken interaction', 'I can ask if someone knows a person and say who I know.']],
  U521: [['speaking', 'Spoken interaction', "I can ask politely if I'm disturbing someone, and say they're right."]],
  U502: [['speaking', 'Spoken production', 'I can talk about my family: who they are, their ages, if they are married.']],
  U503: [['speaking', 'Spoken production', 'I can describe my home: the rooms and what is in them.'], ['reading', 'Reading', 'I can understand a simple flat advert or a note at home.']],
  U504: [['speaking', 'Spoken production', 'I can say what I do at home: cleaning, washing, tidying.']],
  U505: [['speaking', 'Spoken interaction', 'I can ask and answer about work: my job, my colleagues, a meeting.'], ['reading', 'Reading', 'I can understand a short notice or e-mail at work.']],
  U522: [['speaking', 'Spoken interaction', 'I can ask why, say because, and give an example.']],
  U506: [['speaking', 'Spoken production', 'I can say what and where I study.'], ['reading', 'Reading', 'I can understand a school timetable or a note from a teacher.']],
  U507: [['writing', 'Writing', 'I can write and understand a short message or e-mail.']],
  U523: [['speaking', 'Spoken interaction', 'I can say I feel like doing something, and accept gladly.']],
  U508: [['writing', 'Writing', 'I can fill in a form with my name, date and place of birth, nationality and job.']],
  U509: [['writing', 'Writing', 'I can end a message to a friend and arrange to meet again.']],
  U511: [['speaking', 'Spoken production', 'I can name the people in my family.']],
  U512: [['speaking', 'Spoken production', 'I can say what I do in the morning and at night.']],
  U513: [['speaking', 'Spoken production', 'I can say what I have to do, and that something hurts.']],
  U514: [['speaking', 'Spoken interaction', 'I can invite someone, accept with pleasure and thank them.']],
  U515: [['speaking', 'Spoken production', 'I can say who I love and what I dream of.']],
}

export default {
  part: 5, wordBase: 2001, vocabBase: 2201, cdBase: 501,
  slots: [{ slot_id: 'C09', part: 5, after_row: 27 }, { slot_id: 'C10', part: 5, after_row: 29 }],
  // Late words (2026-11-15): the course had no fais, faire, avons, ont, dites or peut (faire only as the Weather pack's
  // fait), so faire le ménage and nous avons couldn't be said. ce: c' was the only form, so ce n'est pas (la peine, grave) couldn't be said; first circle, so all of Part 5 has it.
  situation, vocab, items, canDo, late: [{ unit_id: 'U501', words: ['ce'] }, { unit_id: 'U504', words: ['fais', 'faire'] }, { unit_id: 'U505', words: ['avons', 'ont'] }, { unit_id: 'U522', words: ['dites'] }, { unit_id: 'U513', words: ['peut'] }], off: {},
  // Turned off earlier and wanted now: copain and copine (cut from People in review, now in Family Words), temps (the
  // Weather pack had under 3 sentences; Have To needs it: je n'ai pas le temps).
  revive: { copain: 'U511', copine: 'U511', temps: 'U513' },
}
