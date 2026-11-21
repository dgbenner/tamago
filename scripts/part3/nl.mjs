// Dutch A1 · Part 3, Time and Plans (Dan, 2026-11-20; Builder 2, branch content/nl-a1), in the format of Italian and
// Portuguese Part 3: telling the time, days, months and dates, making plans and a day's routine (T05); signs, notices
// and timetables (T09); announcements and simple instructions (T12); the help thread goes on (T13). Standard Dutch as
// spoken in the Netherlands, je and jij; times as the Dutch say them (half acht is 7:30, kwart over acht, tien voor
// half negen), timetables on the 24-hour clock. Words from the course's frequency list (content-nl/a1-list.json) first.
// Vocabulary circles carry the list's small words of place and direction, the weather, everyday verbs, free time, and
// feelings and opinions; themes stay clear of Part 4 (food and drink, directions, home, family, work, forms, messages,
// health). Read and Answer has three texts per circle that has it. Used by scripts/add-part.mjs (COURSE=nl PART=3).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U61', order: 111, row: 16, after: '', title: 'What Time Is It?', tasks: 'T05',
    grammar: 'Hoe laat is het? Het is drie uur; half vier is 3:30 (half to the next hour); kwart over drie, kwart voor vier; om acht uur (at eight); \'s ochtends, \'s avonds',
    words: ['half', 'kwart', 'over', 'minuut', 'minuten', 'tijd', 'ochtend', 'middag', 'avond', 'nacht', 'vroeg', 'straks', 'later', 'meteen', 'zo'] },
  { unit_id: 'U37', order: 111.5, row: 16.5, after: 'row 16', title: "Didn't Catch That", help: true, tasks: 'T13',
    grammar: 'Wat zei je? Sorry, ik hoor je niet. Kun je iets harder praten?: zei, the past of zeggen', words: ['hoor', 'hoort', 'horen', 'zei', 'luister', 'harder', 'versta'] },
  { unit_id: 'U62', order: 112, row: 17, after: 'row 16', title: 'Days of the Week', tasks: 'T05;T09',
    grammar: 'Op maandag (on Monday), elke maandag; altijd, vaak, soms, nooit; volgende week, vorige week; eerst … daarna',
    words: ['dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'weekend', 'gisteren', 'dagen', 'weken', 'altijd', 'nooit', 'soms', 'vaak', 'meestal', 'volgende', 'vorige', 'eerst', 'daarna', 'tot', 'vanaf', 'sinds'] },
  { unit_id: 'U63', order: 113, row: 17, after: 'row 16', title: 'Months + Seasons', tasks: 'T05;T09',
    grammar: 'In januari, in de zomer; op tien mei (on 10 May); de eerste, de tweede, de derde; months and seasons take no capital',
    words: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december', 'lente', 'zomer', 'herfst', 'winter', 'eerste', 'tweede', 'derde', 'vakantie', 'datum'] },
  { unit_id: 'U38', order: 113.5, row: 17.5, after: 'row 17', title: 'Thinking It Over', help: true, tasks: 'T13',
    grammar: 'Even denken … Eens kijken … Nou … Ik denk het wel; ik denk, jij denkt; dacht, the past of denken', words: ['denk', 'denkt', 'denken', 'nou', 'eens', 'toch', 'dacht'] },
  { unit_id: 'U64', order: 114, row: 18, after: 'row 17', title: 'Making Plans', tasks: 'T05',
    grammar: 'Zullen we naar de film gaan?: zullen + a verb at the end, for suggestions; ga je mee? kom je mee? (mee: along); als (if): als je wilt',
    words: ['zullen', 'zal', 'mee', 'afspraak', 'vanavond', 'bioscoop', 'theater', 'concert', 'vrij', 'zin', 'zie', 'ziet', 'zien', 'idee', 'plan', 'als'] },
  { unit_id: 'U65', order: 115, row: 18, after: 'row 17', title: 'My Day', tasks: 'T05',
    grammar: 'Ik sta om zeven uur op: separable verbs split (opstaan); ik werk, ik doe, ik maak; ik word wakker; klaar (done, ready)',
    words: ['sta', 'slaap', 'slapen', 'wakker', 'word', 'wordt', 'worden', 'werk', 'werkt', 'werken', 'ontbijt', 'lunch', 'douche', 'begin', 'beginnen', 'klaar', 'doe', 'doet', 'doen', 'maak', 'maakt', 'maken'] },
  { unit_id: 'U66', order: 116, row: 19, after: 'row 18', title: 'Signs + Notices', tasks: 'T09',
    grammar: 'Open, gesloten: on a sign; de winkel is open van negen tot zes; verboden te roken; trekken, duwen (on a door)',
    words: ['gesloten', 'ingang', 'uitgang', 'verboden', 'informatie', 'apotheek', 'bakker', 'bank', 'toilet', 'roken', 'parkeren', 'trekken', 'duwen', 'gratis'] },
  { unit_id: 'U67', order: 117, row: 19, after: 'row 18', title: 'Timetables', tasks: 'T09',
    grammar: 'De trein vertrekt om acht uur en komt om tien uur aan: aankomen splits; een kaartje, een retour, een enkele reis; met de trein, met het vliegtuig',
    words: ['vertrekt', 'vertrekken', 'vertrek', 'aankomst', 'vliegtuig', 'boot', 'haven', 'reis', 'reizen', 'kaartje', 'retour', 'enkele', 'perron', 'spoor', 'rijdt', 'rijden', 'vlucht'] },
  { unit_id: 'U39', order: 117.5, row: 19.5, after: 'row 19', title: 'Not Sure', help: true, tasks: 'T13',
    grammar: 'Misschien. Ik denk het niet. Ik weet het niet zeker. Waarschijnlijk wel. Ik hoop het.', words: ['misschien', 'geloof', 'geloven', 'waarschijnlijk', 'mogelijk', 'hoop'] },
  { unit_id: 'U68', order: 118, row: 20, after: 'row 19', title: 'Announcements', tasks: 'T12',
    grammar: 'Let op! Dames en heren: the words of an announcement; de trein heeft vertraging; wilt u … (polite request)',
    words: ['let', 'aandacht', 'passagiers', 'vertraging', 'koffer', 'paspoort', 'dames', 'heren', 'iedereen', 'wachten', 'helaas'] },
  { unit_id: 'U69', order: 119, row: 20, after: 'row 19', title: 'Instructions', tasks: 'T12',
    grammar: 'Lees de tekst. Kies het goede antwoord. Vul in.: the command is the verb\'s stem, with the verb first; vergeet niet …',
    words: ['kijk', 'kies', 'kiezen', 'vul', 'zet', 'help', 'stop', 'vergeet', 'probeer', 'oefening', 'tekst', 'woorden'] },
]

const vocab = [
  { unit_id: 'U71', order: 111.2, row: 16, after: '', title: 'Little Words',
    grammar: 'Achter, tussen, boven, beneden: where things are; weg, terug: away and back (ga weg, kom terug); door, langs, zonder, tegen',
    words: ['tussen', 'achter', 'boven', 'beneden', 'overal', 'ergens', 'nergens', 'zonder', 'tegen', 'langs', 'door', 'rond', 'weg', 'terug', 'zit', 'zitten'] },
  { unit_id: 'U72', order: 113.2, row: 17, after: 'row 16', title: 'The Weather',
    grammar: 'Het regent, het sneeuwt, het waait: weather verbs take het; het is twintig graden; mooi weer, slecht weer',
    words: ['weer', 'regen', 'regent', 'sneeuw', 'sneeuwt', 'wind', 'waait', 'graden', 'wolken', 'zonnig', 'nat', 'droog'] },
  { unit_id: 'U73', order: 115.2, row: 18, after: 'row 17', title: 'Doing Things',
    grammar: 'Geven, krijgen, brengen, halen: everyday verbs side by side; ik geef, jij geeft; leggen (lay down) and zetten (stand up)',
    words: ['geef', 'geeft', 'geven', 'krijg', 'krijgt', 'krijgen', 'breng', 'brengen', 'haal', 'halen', 'zetten', 'leg', 'leggen', 'pakken', 'gebruik', 'gebruiken', 'helpen', 'loop', 'lopen', 'valt', 'vallen', 'blijf', 'blijft', 'blijven'] },
  { unit_id: 'U74', order: 117.2, row: 19, after: 'row 18', title: 'Free Time',
    grammar: 'Ik speel tennis, ik speel gitaar: spelen for games, sport and instruments; ik hou van fietsen (I like cycling)',
    words: ['sport', 'tennis', 'fietsen', 'wandelen', 'speel', 'speelt', 'spelen', 'gitaar', 'piano', 'krant', 'verhaal', 'hobby', 'televisie', 'radio', 'tekenen'] },
  { unit_id: 'U75', order: 119.2, row: 20, after: 'row 19', title: 'Likes + Feelings',
    grammar: 'Ik vind het leuk (I like it): vinden for opinions; ik hou van … (I love, I like); ik voel me goed; liever (rather)',
    words: ['vind', 'vindt', 'vinden', 'geweldig', 'fantastisch', 'prachtig', 'jammer', 'fijn', 'voel', 'voelt', 'voelen', 'hou', 'liefde', 'hart', 'mooie', 'erg', 'liever'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Spoken times as the Dutch say them (half vier is 3:30); timetables and notices on the 24-hour clock with a
// point (18.00), as Dutch signs write it; dates day first.
const listen = [
  ['N201', 'U61', 'time', 'Het is half vier.', '3:30'], ['N202', 'U61', 'time', 'Het is kwart over acht.', '8:15'],
  ['N203', 'U61', 'time', 'Het is twaalf uur.', '12:00'], ['N204', 'U61', 'time', 'Het is kwart voor tien.', '9:45'],
  ['N205', 'U63', 'date', 'Vijf maart.', '5/3'], ['N206', 'U63', 'date', 'Eén mei.', '1/5'],
  ['N207', 'U63', 'date', 'Vijftien september.', '15/9'], ['N208', 'U63', 'date', 'Dertig december.', '30/12'],
  ['N209', 'U67', 'time', 'De bus vertrekt om tien over vier.', '4:10'], ['N210', 'U67', 'time', 'De trein komt om twintig over negen aan.', '9:20'],
  ['N211', 'U68', 'time', 'Let op: de bus naar Utrecht vertrekt om zes uur.', '6:00'], ['N212', 'U68', 'number', 'De trein naar Amsterdam vertrekt van spoor zeven.', '7'],
]
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const texts = [
  text('R201', 'U62', 'notice', 'De winkel', ['Open van maandag tot vrijdag: 9.00 tot 18.00 uur', 'Zaterdag: 10.00 tot 17.00 uur', 'Zondag: gesloten'],
    [q('When is the shop closed?', ['Sunday', 'Saturday', 'Monday']), q('What time does it open on Saturday?', ['10:00', '9:00', '17:00'])]),
  text('R202', 'U62', 'message', 'Een bericht van Jan', ['Anna,', 'zullen we woensdag naar de bioscoop gaan? Ik ben woensdag en donderdag vrij.', 'Op zaterdag werk ik.', 'Jan'],
    [q('When is Jan free?', ['Wednesday and Thursday', 'Saturday', 'Every day']), q('What does Jan do on Saturday?', ['He works', 'He goes to the cinema', 'He stays at home'])]),
  text('R203', 'U62', 'notice', 'Het museum', ['Het museum is op maandag gesloten.', 'Voor kinderen: woensdag om 15.00 uur'],
    [q('Which day is the museum closed?', ['Monday', 'Wednesday', 'Tuesday']), q('When is the visit for children?', ['Wednesday at 3 pm', 'Monday at 3 pm', 'Wednesday at 5 pm'])]),
  text('R204', 'U63', 'notice', 'De vakantie', ['De school is gesloten van 20 december tot 5 januari.', 'Eerste schooldag: maandag 6 januari'],
    [q('Which day of the week does school start again?', ['Monday', 'Wednesday', 'Saturday']), q('When do the holidays begin?', ['20 December', '6 January', '5 January'])]),
  text('R205', 'U63', 'sign', 'Het feest', ['Feest op het plein', 'Zaterdag 21 juni, 18.00 uur', 'Muziek en dansen'],
    [q('When is the party?', ['Saturday 21 June', 'Sunday 21 June', 'Saturday 21 July']), q('What time does it start?', ['6 pm', '8 pm', '9 pm'])]),
  text('R206', 'U63', 'message', 'Een kaart van Maria', ['In juli gaan we naar zee.', 'In december gaan we naar de bergen.', 'En jij?'],
    [q('Where does Maria go in July?', ['To the sea', 'To the mountains', 'To the city']), q('When does she go to the mountains?', ['In December', 'In July', 'In spring'])]),
  text('R207', 'U66', 'sign', 'Bij de winkel', ['Ingang', 'Open van 9.00 tot 19.00 uur', 'Op zondag gesloten'],
    [q('When is the shop closed?', ['On Sundays', 'On Saturdays', 'Every evening']), q('What time does it close?', ['7 pm', '9 pm', '9 am'])]),
  text('R208', 'U66', 'sign', 'Op het station', ['Toiletten: eerste verdieping', 'Apotheek: naast de uitgang', 'Informatie: bij de ingang'],
    [q('Where are the toilets?', ['On the first floor', 'On the second floor', 'Next to the exit']), q('Where can you get information?', ['At the entrance', 'At the chemist\'s', 'On the train'])]),
  text('R209', 'U66', 'notice', 'De bakker', ['Bakker Jansen', 'Elke dag open van 7.00 tot 18.00 uur', 'Vers brood om 7.00 en om 12.00 uur'],
    [q('Is the bakery open on Sunday?', ['Yes', 'No', 'Only in the morning']), q('When is there fresh bread?', ['At 7 am and 12 noon', 'At 6 am only', 'At 6 pm'])]),
  text('R210', 'U67', 'timetable', 'Trein naar Utrecht', ['Vertrek 8.15 – aankomst 9.05', 'Vertrek 12.40 – aankomst 13.30', 'Vertrek 18.00 – aankomst 18.50'],
    [q('When does the 12:40 train arrive?', ['13:30', '9:05', '18:50']), q('What time is the first train?', ['8:15', '12:40', '18:00'])]),
  text('R211', 'U67', 'timetable', 'Boot naar Texel', ['Vertrek uit de haven: 7.00, 9.00, 11.00 uur', 'Zondag: elke twee uur een boot'],
    [q('Where does the boat leave from?', ['The harbour', 'The station', 'The beach']), q('How often is the boat on Sundays?', ['Every two hours', 'Every hour', 'Not at all'])]),
  text('R212', 'U67', 'message', 'Een bericht van Tom', ['Ik kom om 17.30 uur aan op het station.', 'Mijn trein vertrekt om 15.00 uur uit Amsterdam.', 'Tot straks!'],
    [q('When does Tom arrive?', ['5:30 pm', '3 pm', '7:30 pm']), q('Where does his train leave from?', ['Amsterdam', 'The airport', 'Utrecht'])]),
  text('R213', 'U69', 'notice', 'In de les', ['Luister naar de tekst.', 'Beantwoord de vragen.', 'Kies een foto.'],
    [q('What do you do first?', ['Listen to the text', 'Answer the questions', 'Choose a photo']), q('What do you choose?', ['A photo', 'A book', 'A word'])]),
  text('R214', 'U69', 'notice', 'De deur', ['Doe de deur dicht, alsjeblieft.', 'Let op: langzaam dichtdoen.'],
    [q('What should you do with the door?', ['Close it', 'Leave it open', 'Lock it']), q('How should you close it?', ['Slowly', 'Quickly', 'With a key'])]),
  text('R215', 'U69', 'notice', 'De oefening', ['Kies een nummer.', 'Open het boek op die bladzijde.', 'Lees de tekst.'],
    [q('What do you open?', ['The book', 'The door', 'The notebook']), q('What do you do last?', ['Read the text', 'Choose a number', 'Close the book'])]),
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F201', unit_id: 'U64', card: 'Jan en Anna gaan zaterdag om half negen \'s avonds naar de bioscoop. Ze zien elkaar op het plein.',
      fields: [{ key: 'day', label: 'Dag', rule: 'text', answer: 'zaterdag', also: ['Zaterdag', 'op zaterdag'] }, { key: 'time', label: 'Tijd', rule: 'text', answer: '20:30', also: ['8:30', '20.30', '8.30', 'half negen', 'om half negen'] },
        { key: 'where', label: 'Waar', rule: 'text', answer: 'op het plein', also: ['plein', 'het plein', 'Op het plein'] }] },
    { id: 'F202', unit_id: 'U65', card: 'Mijn naam is Anna. Ik ontbijt om zeven uur. Ik begin om negen uur met werken en om vijf uur ben ik klaar.',
      fields: [{ key: 'name', label: 'Naam', rule: 'text', answer: 'Anna' }, { key: 'breakfast', label: 'Ontbijt', rule: 'text', answer: '7:00', also: ['7', '7.00', 'zeven', 'om zeven uur'] },
        { key: 'start', label: 'Begin werk', rule: 'text', answer: '9:00', also: ['9', '9.00', 'negen', 'om negen uur'] }, { key: 'end', label: 'Einde werk', rule: 'text', answer: '17:00', also: ['5', '5:00', '17', '17.00', 'vijf', 'om vijf uur'] }] },
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
  U71: [['reading', 'Reading', 'I can understand the small words that say where something is: behind, between, above, away, back.']],
  U72: [['speaking', 'Spoken production', 'I can say what the weather is like.']],
  U73: [['speaking', 'Spoken production', 'I can say what I do with everyday verbs: give, get, bring, fetch, put, walk.']],
  U74: [['speaking', 'Spoken production', 'I can say what I do in my free time.']],
  U75: [['speaking', 'Spoken production', 'I can say what I like and how I feel.']],
}

export default {
  part: 3, wordBase: 1201, vocabBase: 1401, cdBase: 401,
  slots: [{ slot_id: 'C05', part: 3, after_row: 17 }, { slot_id: 'C06', part: 3, after_row: 19 }],
  situation, vocab, items, canDo,
}
