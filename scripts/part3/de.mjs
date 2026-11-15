// German A1 · Part 3, Time and Plans (Dan, 2026-11-15), in the format of French Part 3: the clock, days, months and
// dates, making plans and a day's routine (T05); signs, notices and timetables (T09); announcements and simple
// instructions (T12); the help thread goes on (T13). Words from Goethe Start Deutsch 1 where they fit
// (scripts/a1-coverage.mjs --missing), checked against Tatoeba first (scripts/circle-feasibility.mjs). German has four
// parts, so the vocabulary circles carry a large share of the list: small words, seasons and times of day, everyday
// verbs, opinions, and the modal verbs. Separable verbs are taught in the infinitive (aufstehen, abfahren), which
// sits at the end after a modal verb. Read and Answer has three texts per circle that has it.
// Used by scripts/add-part.mjs (COURSE=de PART=3).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U61', order: 111, row: 16, after: '', title: 'What Time Is It?', tasks: 'T05',
    grammar: 'Wie viel Uhr ist es? Es ist drei Uhr; halb vier is half past three; Viertel vor, Viertel nach; um acht Uhr',
    words: ['Minute', 'Minuten', 'Stunde', 'Stunden', 'halb', 'Viertel', 'vor', 'nach', 'um', 'wie viel', 'Mittag', 'Nacht', 'früh', 'schon', 'gerade', 'gleich'] },
  { unit_id: 'U37', order: 111.5, row: 16.5, after: 'row 16', title: "Didn't Catch That", help: true, tasks: 'T13',
    grammar: 'Wie bitte? Entschuldigen Sie. Ich habe dich nicht gehört. Können Sie das noch einmal sagen?', words: ['entschuldigen', 'gehört', 'sagen'] },
  { unit_id: 'U62', order: 112, row: 17, after: 'row 16', title: 'Days of the Week', tasks: 'T05;T09',
    grammar: 'Am Montag; von Montag bis Freitag; jeden Tag, nächste Woche, letzten Montag: time phrases with no preposition take the object form; war (was)',
    words: ['Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Wochenende', 'gestern', 'nächste', 'nächsten', 'letzte', 'letzten', 'jeden', 'jede', 'bis', 'von', 'ab', 'war'] },
  { unit_id: 'U63', order: 113, row: 17, after: 'row 16', title: 'Months + Dates', tasks: 'T05;T09',
    grammar: 'Im Januar, im Mai: im with months; der erste Mai, der zweite, der dritte; am ersten Mai',
    words: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember', 'Monat', 'Datum', 'erste', 'zweite', 'dritte', 'im'] },
  { unit_id: 'U38', order: 113.5, row: 17.5, after: 'row 17', title: 'Thinking It Over', help: true, tasks: 'T13',
    grammar: 'Warte mal. Also … Vielleicht. Ich denke …', words: ['also', 'warten', 'warte', 'mal', 'vielleicht', 'denke'] },
  { unit_id: 'U64', order: 114, row: 18, after: 'row 17', title: 'Making Plans', tasks: 'T05',
    grammar: 'Ich will, du willst: wollen + a verb at the end; Hast du Lust? Kommst du mit? mitkommen and einladen split in a main clause',
    words: ['treffen', 'treffe', 'besuchen', 'mitkommen', 'einladen', 'Termin', 'wollen', 'will', 'willst', 'bleiben', 'bleibe', 'Ausflug', 'Plan', 'Lust'] },
  { unit_id: 'U65', order: 115, row: 18, after: 'row 17', title: 'My Day', tasks: 'T05',
    grammar: 'Ich stehe um sieben auf: aufstehen splits, auf goes to the end; anfangen, aufhören and fernsehen split the same way; ins Bett gehen',
    words: ['aufstehen', 'stehe', 'frühstücken', 'frühstücke', 'duschen', 'dusche', 'anziehen', 'schlafen', 'anfangen', 'aufhören', 'beginnen', 'beginnt', 'Pause', 'fernsehen', 'Bett', 'ins', 'endet'] },
  { unit_id: 'U66', order: 116, row: 19, after: 'row 18', title: 'Signs + Notices', tasks: 'T09',
    grammar: 'Eingang, Ausgang; geöffnet, geschlossen; Rauchen verboten: a sign names the action with a capital letter; Achtung! Vorsicht!',
    words: ['Eingang', 'Ausgang', 'Achtung', 'Vorsicht', 'verboten', 'Toilette', 'Toiletten', 'geöffnet', 'Schild', 'Information', 'Auskunft', 'Eintritt', 'Kasse', 'rauchen', 'Aufzug'] },
  { unit_id: 'U67', order: 117, row: 19, after: 'row 18', title: 'Timetables', tasks: 'T09',
    grammar: 'Der Zug fährt um acht Uhr ab und kommt um zehn Uhr an: abfahren and ankommen split; fahren: ich fahre, er fährt; Wie lange dauert es?',
    words: ['abfahren', 'ankommen', 'Ankunft', 'Abfahrt', 'Gleis', 'Bahnsteig', 'Fahrkarte', 'Ticket', 'pünktlich', 'fährt', 'fahren', 'fahre', 'dauert', 'dauern', 'Bahn', 'Verspätung'] },
  { unit_id: 'U39', order: 117.5, row: 19.5, after: 'row 19', title: 'Not Sure', help: true, tasks: 'T13',
    grammar: 'Ich bin nicht sicher. Keine Ahnung. Das möchte ich auch wissen.', words: ['sicher', 'Ahnung', 'wissen', 'eigentlich'] },
  { unit_id: 'U68', order: 118, row: 20, after: 'row 19', title: 'Announcements', tasks: 'T12',
    grammar: 'Bitte einsteigen! Bitte aussteigen!: the infinitive as a command in announcements; der Zug hält in …; der Zug hat Verspätung',
    words: ['Durchsage', 'Ansage', 'einsteigen', 'aussteigen', 'halten', 'hält', 'Gepäck', 'Koffer', 'weiter', 'zurück', 'Flugzeug', 'fliegen', 'fliegt', 'Flug'] },
  { unit_id: 'U69', order: 119, row: 20, after: 'row 19', title: 'Instructions', tasks: 'T12',
    grammar: 'Bitte die Tür schließen. Öffnen Sie das Fenster: the infinitive, or the verb with Sie, for an instruction; anmachen, ausmachen',
    words: ['öffnen', 'schließen', 'drücken', 'ankreuzen', 'anklicken', 'abgeben', 'anmachen', 'ausmachen', 'legen', 'stellen', 'mitbringen', 'mitnehmen', 'benutzen', 'Tür', 'Fenster'] },
]

const vocab = [
  { unit_id: 'U71', order: 111.2, row: 16, after: '', title: 'Little Words',
    grammar: 'Noch, nur, etwas; nie and nichts say never and nothing without nicht; gern after a verb: ich lese gern; mich, dich (object), mir (to me)',
    words: ['noch', 'nur', 'so', 'da', 'dort', 'dann', 'denn', 'gern', 'einmal', 'bisschen', 'nie', 'nichts', 'leider', 'etwas', 'mich', 'dich', 'mir'] },
  { unit_id: 'U72', order: 113.2, row: 17, after: 'row 16', title: 'Seasons + Times of Day',
    grammar: 'Im Sommer, im Winter: im with seasons; am Vormittag, am Nachmittag, am Abend; seit gestern; bald, später, früher',
    words: ['Frühling', 'Sommer', 'Herbst', 'Winter', 'Vormittag', 'Nachmittag', 'Abend', 'seit', 'bald', 'später', 'früher', 'wieder', 'sofort', 'lange'] },
  { unit_id: 'U73', order: 115.2, row: 18, after: 'row 17', title: 'Doing Things',
    grammar: 'Ich mache, ich sehe, ich nehme, ich finde: everyday verbs; der becomes den for the thing acted on: Ich nehme den Bus; after möchte and kann the verb goes to the end',
    words: ['machen', 'mache', 'sehen', 'sehe', 'nehmen', 'nehme', 'finden', 'finde', 'helfen', 'bringen', 'holen', 'abholen', 'bekommen', 'kennen', 'kenne', 'sitzen', 'liegt', 'lachen', 'den'] },
  { unit_id: 'U74', order: 117.2, row: 19, after: 'row 18', title: 'Likes + Opinions',
    grammar: 'Das gefällt mir; ich glaube …; gut, besser, am besten; das ist wichtig, das ist toll',
    words: ['gefallen', 'gefällt', 'glauben', 'glaube', 'wunderbar', 'wichtig', 'besser', 'beste', 'besten', 'lieb', 'zufrieden', 'böse', 'normal', 'bekannt', 'toll'] },
  { unit_id: 'U75', order: 119.2, row: 20, after: 'row 19', title: 'Must + May',
    grammar: 'Ich muss, du musst; ich darf, du darfst; ich soll: the modal verb is second and the other verb goes to the end; werden: ich werde, er wird',
    words: ['müssen', 'muss', 'musst', 'dürfen', 'darf', 'darfst', 'sollen', 'soll', 'werden', 'wird', 'werde', 'möchten', 'erlauben', 'erlaubt', 'Hausaufgaben', 'waschen'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Read and Answer has three texts per circle that has it. Times are written as on a German timetable (14:30 Uhr).
const listen = [
  ['N201', 'U61', 'time', 'Es ist halb vier.', '3:30'], ['N202', 'U61', 'time', 'Es ist Viertel nach acht.', '8:15'],
  ['N203', 'U61', 'time', 'Es ist zwölf Uhr.', '12:00'], ['N204', 'U61', 'time', 'Es ist Viertel vor zehn.', '9:45'],
  ['N205', 'U62', 'time', 'Am Freitag um sieben Uhr.', '7:00'], ['N206', 'U63', 'date', 'Der erste Mai.', '1/5'],
  ['N207', 'U63', 'date', 'Der dritte Oktober.', '3/10'], ['N208', 'U63', 'date', 'Der zehnte Dezember.', '10/12'],
  ['N209', 'U67', 'time', 'Der Zug fährt um sechzehn Uhr zwanzig ab.', '16:20'], ['N210', 'U67', 'time', 'Der Bus kommt um neun Uhr zehn an.', '9:10'],
  ['N211', 'U68', 'time', 'Der Zug nach Hamburg fährt um achtzehn Uhr ab.', '18:00'], ['N212', 'U68', 'number', 'Der Zug nach Berlin fährt heute von Gleis sieben.', '7'],
  ['N213', 'U68', 'number', 'Achtung, der Zug aus Hamburg hat zwanzig Minuten Verspätung.', '20'], ['N214', 'U68', 'number', 'Der Flug nach London: bitte zum Ausgang zwölf.', '12'],
]
const texts = [
  { id: 'R201', unit_id: 'U62', kind: 'notice', title: 'Das Schwimmbad', lines: ['Geöffnet: Montag bis Freitag, 9–20 Uhr', 'Samstag: 10–18 Uhr', 'Sonntag: geschlossen'],
    questions: [{ question: 'When is the pool closed?', choices: ['Sunday', 'Saturday', 'Monday'], answer: 0 }, { question: 'What time does it open on Saturday?', choices: ['10:00', '9:00', '18:00'], answer: 0 }] },
  { id: 'R202', unit_id: 'U62', kind: 'message', title: 'Eine Nachricht von Peter', lines: ['Hallo Maria,', 'gehen wir am Mittwoch ins Kino? Ich habe am Mittwoch und am Donnerstag Zeit.', 'Am Samstag arbeite ich.', 'Peter'],
    questions: [{ question: 'When is Peter free?', choices: ['Wednesday and Thursday', 'Saturday', 'Every day'], answer: 0 }, { question: 'What does Peter do on Saturday?', choices: ['He works', 'He goes to the cinema', 'He stays home'], answer: 0 }] },
  { id: 'R203', unit_id: 'U62', kind: 'notice', title: 'Das Museum', lines: ['Das Museum ist am Dienstag geschlossen.', 'Führung für Kinder: Mittwoch, 14 Uhr'],
    questions: [{ question: 'Which day is the museum closed?', choices: ['Tuesday', 'Wednesday', 'Monday'], answer: 0 }, { question: 'When is the tour for children?', choices: ['Wednesday at 2 pm', 'Tuesday at 2 pm', 'Wednesday at 4 pm'], answer: 0 }] },
  { id: 'R204', unit_id: 'U63', kind: 'notice', title: 'Die Ferien', lines: ['Die Schule ist vom 20. Dezember bis zum 4. Januar geschlossen.', 'Der Unterricht beginnt wieder am Montag, 5. Januar.'],
    questions: [{ question: 'Which day of the week does school start again?', choices: ['Monday', 'Sunday', 'Saturday'], answer: 0 }, { question: 'When do the holidays begin?', choices: ['20 December', '5 January', '4 January'], answer: 0 }] },
  { id: 'R205', unit_id: 'U63', kind: 'sign', title: 'Das Fest', lines: ['Großes Fest im Dorf', 'Samstag, 21. Juni, ab 18 Uhr', 'Mit Musik und Tanz'],
    questions: [{ question: 'When is the village party?', choices: ['Saturday 21 June', 'Sunday 21 June', 'Saturday 21 July'], answer: 0 }, { question: 'What time does it start?', choices: ['6 pm', '8 pm', '9 pm'], answer: 0 }] },
  { id: 'R206', unit_id: 'U63', kind: 'message', title: 'Eine Karte von Anna', lines: ['Im Juli fahren wir ans Meer.', 'Im Februar fahren wir in die Berge.', 'Und du?'],
    questions: [{ question: 'Where does Anna go in July?', choices: ['To the sea', 'To the mountains', 'To a big city'], answer: 0 }, { question: 'When does she go to the mountains?', choices: ['In February', 'In July', 'In May'], answer: 0 }] },
  { id: 'R207', unit_id: 'U66', kind: 'sign', title: 'Im Geschäft', lines: ['Eingang', 'Geöffnet von 9 bis 19 Uhr', 'Am Sonntag geschlossen'],
    questions: [{ question: 'When is the shop closed?', choices: ['On Sunday', 'On Saturday', 'Every evening'], answer: 0 }, { question: 'What time does it close?', choices: ['7 pm', '9 pm', '9 am'], answer: 0 }] },
  { id: 'R208', unit_id: 'U66', kind: 'sign', title: 'Am Bahnhof', lines: ['Ausgang: links', 'Toiletten: Gleis 2', 'Information: am Eingang'],
    questions: [{ question: 'Where are the toilets?', choices: ['Platform 2', 'Platform 1', 'Near the café'], answer: 0 }, { question: 'Where can you get information?', choices: ['At the entrance', 'At the exit', 'On the train'], answer: 0 }] },
  { id: 'R209', unit_id: 'U66', kind: 'notice', title: 'Im Museum', lines: ['Eintritt: 8 Euro', 'Kinder: Eintritt frei', 'Rauchen verboten!'],
    questions: [{ question: 'How much do children pay?', choices: ['Nothing', '8 euros', '4 euros'], answer: 0 }, { question: 'What is not allowed?', choices: ['Smoking', 'Taking photos', 'Talking'], answer: 0 }] },
  { id: 'R210', unit_id: 'U67', kind: 'timetable', title: 'Zug nach Hamburg', lines: ['Abfahrt: 8:15 Uhr – Ankunft: 10:20 Uhr', 'Abfahrt: 12:40 Uhr – Ankunft: 14:45 Uhr', 'Abfahrt: 18:00 Uhr – Ankunft: 20:05 Uhr'],
    questions: [{ question: 'When does the 12:40 train arrive?', choices: ['14:45', '10:20', '20:05'], answer: 0 }, { question: 'What time is the first train?', choices: ['8:15', '12:40', '18:00'], answer: 0 }] },
  { id: 'R211', unit_id: 'U67', kind: 'timetable', title: 'Bus 12', lines: ['Abfahrt am Bahnhof: 7:00, 7:30, 8:00 Uhr', 'Am Sonntag: jede Stunde ein Bus'],
    questions: [{ question: 'Where does the bus leave from?', choices: ['The station', 'The school', 'The airport'], answer: 0 }, { question: 'How often is the bus on Sunday?', choices: ['Every hour', 'Every half hour', 'Not at all'], answer: 0 }] },
  { id: 'R212', unit_id: 'U67', kind: 'message', title: 'Eine Nachricht von Peter', lines: ['Ich komme um 17:30 Uhr am Bahnhof an.', 'Mein Zug fährt um 15 Uhr in Berlin ab.', 'Bis heute Abend!'],
    questions: [{ question: 'When does Peter arrive?', choices: ['17:30', '15:00', '7:30'], answer: 0 }, { question: 'Where does his train leave from?', choices: ['Berlin', 'Hamburg', 'Paris'], answer: 0 }] },
  { id: 'R213', unit_id: 'U69', kind: 'notice', title: 'Im Unterricht', lines: ['Lesen Sie den Text.', 'Kreuzen Sie die richtige Antwort an.', 'Geben Sie das Papier ab.'],
    questions: [{ question: 'What do you do first?', choices: ['Read the text', 'Hand in the paper', 'Mark the answer'], answer: 0 }, { question: 'What do you mark with a cross?', choices: ['The right answer', 'The wrong answer', 'Every answer'], answer: 0 }] },
  { id: 'R214', unit_id: 'U69', kind: 'notice', title: 'Die Tür', lines: ['Bitte die Tür schließen.', 'Achtung: bitte leise schließen!'],
    questions: [{ question: 'What should you do with the door?', choices: ['Close it', 'Leave it open', 'Lock it'], answer: 0 }, { question: 'How should you close it?', choices: ['Quietly', 'Quickly', 'With a key'], answer: 0 }] },
  { id: 'R215', unit_id: 'U69', kind: 'notice', title: 'Der Automat', lines: ['Fahrkarte nehmen.', 'Bitte bar zahlen.', 'Den grünen Knopf drücken.'],
    questions: [{ question: 'How do you pay?', choices: ['In cash', 'By card', 'By phone'], answer: 0 }, { question: 'Which button do you press?', choices: ['The green one', 'The red one', 'The blue one'], answer: 0 }] },
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F201', unit_id: 'U64', card: 'Peter und Maria gehen am Samstag um halb neun ins Kino. Sie treffen sich am Bahnhof.',
      fields: [{ key: 'day', label: 'Tag', rule: 'text', answer: 'Samstag', also: ['samstag', 'am Samstag'] }, { key: 'time', label: 'Uhrzeit', rule: 'text', answer: '20:30', also: ['20.30', '20:30 Uhr', '8:30', '8.30', 'halb neun', '20 Uhr 30'] }, { key: 'place', label: 'Ort', rule: 'text', answer: 'Bahnhof', also: ['am Bahnhof', 'der Bahnhof'] }] },
    { id: 'F202', unit_id: 'U65', card: 'Ich heiße Maria. Ich stehe um sieben Uhr auf. Die Arbeit beginnt um neun Uhr und endet um fünf Uhr.',
      fields: [{ key: 'name', label: 'Vorname', rule: 'text', answer: 'Maria' }, { key: 'up', label: 'Aufstehen', rule: 'text', answer: '7 Uhr', also: ['7:00', '7.00', 'sieben Uhr', '7', '7:00 Uhr'] }, { key: 'start', label: 'Beginn der Arbeit', rule: 'text', answer: '9 Uhr', also: ['9:00', '9.00', 'neun Uhr', '9', '9:00 Uhr'] }, { key: 'end', label: 'Ende der Arbeit', rule: 'text', answer: '17 Uhr', also: ['17:00', '17.00', '5 Uhr', '5:00', 'fünf Uhr', '17:00 Uhr', '17'] }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: texts.map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P201', unit_id: 'U62', prompt: 'Write a short message to a friend about your week: what you do on two days.', points: 'two days;what you do', min_words: 20, max_words: 35 },
    { id: 'P202', unit_id: 'U64', prompt: 'Write a short message to invite a friend out: what, which day and what time.', points: 'what;which day;what time', min_words: 20, max_words: 35 },
    { id: 'P203', unit_id: 'U65', prompt: 'Write a few lines about your day: when you get up, work and go to bed.', points: 'when you get up;when you work;when you go to bed', min_words: 25, max_words: 40 },
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
  U66: [['reading', 'Reading', 'I can understand simple signs and notices: open, closed, entrance, exit, no smoking.']],
  U67: [['reading', 'Reading', 'I can find a departure or arrival time on a timetable.']],
  U39: [['speaking', 'Spoken interaction', "I can say I'm not sure or don't know."]],
  U68: [['listening', 'Listening', 'I can understand a short announcement at a station or an airport.']],
  U69: [['reading', 'Reading', 'I can follow short, simple instructions.']],
  U71: [['reading', 'Reading', 'I can understand the small words that shape a sentence: still, only, never, nothing, then.']],
  U72: [['speaking', 'Spoken production', 'I can say in which season or at what time of day something happens.']],
  U73: [['speaking', 'Spoken production', 'I can say simple things I do: make, see, take, find, bring, help.']],
  U74: [['speaking', 'Spoken production', 'I can say what I like and what I think of something.']],
  U75: [['speaking', 'Spoken interaction', 'I can say what I must do and ask what I may do.']],
}

export default {
  part: 3, wordBase: 1201, vocabBase: 1401, cdBase: 301,
  slots: [{ slot_id: 'C05', part: 3, after_row: 17 }, { slot_id: 'C06', part: 3, after_row: 19 }],
  situation, vocab, items, canDo, late: [], off: {},
}
