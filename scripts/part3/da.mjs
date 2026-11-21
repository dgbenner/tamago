// Danish A1 · Part 3, Time and Plans (Dan, 2026-11-21; Builder 2, branch content/da-a1), in the format of Swedish and
// Dutch Part 3: telling the time, days, months and dates, making plans and a day's routine (T05); signs, notices and
// timetables (T09); announcements and simple instructions (T12); the help thread goes on (T13). Standard Danish, modern
// du throughout (formal De and plural I, jer and jeres stay out); times as Danes say them (halv fire is 3:30, half to
// the next hour; kvart over otte, kvart i ti, fem minutter i halv ni), timetables and notices on the 24-hour clock with
// a point (18.00), dates day first; prices in kroner. Words from the course's frequency list (content-da/a1-list.json,
// a subtitle frequency stand-in; its 600 most frequent as the core target): Part 2 ended at 53%, and the list is heavy
// with the past (var, havde, kom, sagde, blev, gjorde, fik, gik) and the perfect (været, set, sagt, gjort), so Part 3
// brings the past in early, in its first vocabulary circle (U71 Yesterday, with i går), and the perfect in U73, where
// they open the most Tatoeba lines; then the list's time words (altid, aldrig, endnu, siden, inden, næste, sidste), its
// everyday verbs (arbejder, begynder, viser, fortæller, sætter, finder) and its small words of place and direction (op,
// ned, tilbage, væk, hen, rundt, forbi, uden, gennem, omkring); the brief aimed at about 70%, and the gather reached 81%
// (86% without the stoplist), which leaves Part 4 the family, home, work and food words. Verbs come
// as their present (one form for every person), with the infinitive where a modal needs it; word-senses.json gives each
// present, past and participle its infinitive as lemma. The verb have is still kept out (Part 1's noun have, garden);
// har and havde carry it. Tog as took reads as Part 1's tog (train), so those lines are cut. Vocabulary themes stay
// clear of Parts 1 and 2 and of Part 4 (food and drink, directions, home, family, work, forms, messages, health).
// Ids: Part 2's vocabulary words run to W1216, so this part starts at W1301 and W1501 (not Swedish's W1201 and W1401).
// Used by scripts/add-part.mjs (COURSE=da PART=3).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U61', order: 111, row: 16, after: '', title: 'What Time Is It?', tasks: 'T05',
    grammar: 'Hvad er klokken? Klokken er tre; halv fire is 3:30 (half to the next hour); kvart over tre, kvart i fire; klokken otte (at eight); om morgenen, om aftenen; i nat',
    words: ['halv', 'kvart', 'minut', 'minutter', 'timer', 'tid', 'tiden', 'morgen', 'morgenen', 'formiddag', 'eftermiddag', 'aften', 'aftenen', 'nat', 'midnat', 'tidligt', 'sent', 'senere', 'tidligere', 'før'] },
  { unit_id: 'U37', order: 111.5, row: 16.5, after: 'row 16', title: "Didn't Catch That", help: true, tasks: 'T13',
    grammar: 'Hvad sagde du? Undskyld, jeg kan ikke høre dig. Kan du tale lidt højere?: sagde, the past of sige; hør (listen); jeg beder dig',
    words: ['hører', 'høre', 'hør', 'hørte', 'højere', 'højt', 'tydeligt', 'beder'] },
  { unit_id: 'U62', order: 112, row: 17, after: 'row 16', title: 'Days of the Week', tasks: 'T05;T09',
    grammar: 'På mandag (on Monday), om mandagen (on Mondays); altid, ofte, tit, aldrig; jeg plejer at … (I usually …); næste uge, sidste uge; først … så; for en uge siden (a week ago)',
    words: ['tirsdag', 'onsdag', 'torsdag', 'fredag', 'weekend', 'weekenden', 'dage', 'uger', 'gange', 'altid', 'aldrig', 'ofte', 'tit', 'plejer', 'næste', 'sidste', 'først', 'siden', 'inden', 'længe', 'endnu', 'engang'] },
  { unit_id: 'U63', order: 113, row: 17, after: 'row 16', title: 'Months + Seasons', tasks: 'T05;T09',
    grammar: 'I januar, om sommeren; den tiende maj (on 10 May); første, anden, tredje; months, days and seasons take no capital',
    words: ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december', 'foråret', 'sommer', 'sommeren', 'efteråret', 'vinter', 'vinteren', 'første', 'tredje', 'ferie', 'dato', 'slut'] },
  { unit_id: 'U38', order: 113.5, row: 17.5, after: 'row 17', title: 'Thinking It Over', help: true, tasks: 'T13',
    grammar: 'Lad mig tænke. Jeg kan ikke huske det. Mon … ? (I wonder …); nå (well); egentlig (really, actually)',
    words: ['tænke', 'huske', 'mon', 'egentlig', 'nå', 'gætte'] },
  { unit_id: 'U64', order: 114, row: 18, after: 'row 17', title: 'Making Plans', tasks: 'T05',
    grammar: 'Skal vi gå i biografen?: skal + a plain infinitive, for plans and suggestions; vil du med? (come along); har du lyst til …?; vi ses; jeg er nødt til at … (I have to); hvis (if)',
    words: ['ses', 'biograf', 'biografen', 'fri', 'lyst', 'idé', 'plan', 'aftale', 'foreslår', 'derfor', 'bør', 'burde', 'nødt', 'sker', 'ske', 'chance', 'valg'] },
  { unit_id: 'U65', order: 115, row: 18, after: 'row 17', title: 'My Day', tasks: 'T05',
    grammar: 'Jeg vågner klokken syv og står op: op, ud, ind after a verb; jeg begynder, jeg slutter; jeg arbejder; mens (while), når (when, whenever)',
    words: ['vågner', 'op', 'sover', 'sove', 'morgenmad', 'frokost', 'aftensmad', 'arbejder', 'arbejde', 'begynder', 'begynde', 'slutter', 'mens', 'når', 'bad'] },
  { unit_id: 'U66', order: 116, row: 19, after: 'row 18', title: 'Signs + Notices', tasks: 'T09',
    grammar: 'Åbent, lukket: on a sign (the -t form); butikken er åben fra ni til seks; rygning forbudt; kun (only) and indtil (until) on notices',
    words: ['indgang', 'udgang', 'forbudt', 'information', 'apotek', 'toilet', 'rygning', 'gratis', 'politi', 'politiet', 'stop', 'indtil', 'lov', 'regler'] },
  { unit_id: 'U67', order: 117, row: 19, after: 'row 18', title: 'Timetables', tasks: 'T09',
    grammar: 'Toget kører klokken otte og er fremme klokken ti; en billet, en enkeltbillet; med tog, med fly; god tur!',
    words: ['afgang', 'ankomst', 'afgår', 'fremme', 'fly', 'flyver', 'båd', 'rejse', 'rejser', 'billet', 'perron', 'spor', 'kører', 'køre', 'toget', 'bussen', 'tur'] },
  { unit_id: 'U39', order: 117.5, row: 19.5, after: 'row 19', title: 'Not Sure', help: true, tasks: 'T13',
    grammar: 'Måske. Det afhænger af … Jeg er ikke sikker. Sandsynligvis. Slet ikke. Er det sandt?',
    words: ['afhænger', 'sandsynligvis', 'slet', 'alligevel', 'vist', 'dog', 'ellers', 'sandt', 'orden'] },
  { unit_id: 'U68', order: 118, row: 20, after: 'row 19', title: 'Announcements', tasks: 'T12',
    grammar: 'Mine damer og herrer: the words of an announcement; toget er forsinket; vi beklager; venligst (please, on a notice); mellem, via, cirka',
    words: ['passagerer', 'forsinket', 'damer', 'herrer', 'stopper', 'venligst', 'beklager', 'desværre', 'mellem', 'via', 'cirka'] },
  { unit_id: 'U69', order: 119, row: 20, after: 'row 19', title: 'Instructions', tasks: 'T12',
    grammar: 'Læs teksten. Vælg det rigtige svar. Skriv dit navn.: the command is the verb\'s stem (læs, skriv, vælg), with the verb first; glem ikke …',
    words: ['kig', 'vælg', 'vælge', 'læs', 'læse', 'skriv', 'lyt', 'glem', 'prøv', 'øvelse', 'tekst', 'teksten', 'vis', 'vise', 'viser', 'forklar', 'forklare', 'fortæl', 'fortælle', 'fortæller', 'luk', 'sæt', 'sætte', 'sætter', 'find', 'finder', 'tag', 'giv', 'hjælper', 'måde'] },
]

const vocab = [
  { unit_id: 'U71', order: 111.2, row: 16, after: '', title: 'Yesterday',
    grammar: 'I går var jeg hjemme: the past is one form for every person (jeg var, du var, vi var); kom, gik, fik, gav, sagde; regular verbs add -ede or -te (talte, lavede)',
    words: ['i går', 'var', 'havde', 'kom', 'gik', 'sagde', 'blev', 'gjorde', 'fik', 'gav', 'fandt', 'troede', 'vidste', 'tænkte', 'skete', 'talte', 'lavede', 'ringede', 'fortalte', 'elskede', 'prøvede'] },
  { unit_id: 'U72', order: 113.2, row: 17, after: 'row 16', title: 'The Weather',
    grammar: 'Det regner, det sner, det blæser: weather verbs take det; det er tyve grader; vejret er godt, det er koldt (the -t form after det)',
    words: ['vejr', 'vejret', 'regn', 'regner', 'sne', 'sner', 'blæser', 'grader', 'varmt', 'koldt', 'solskin', 'is'] },
  { unit_id: 'U73', order: 115.2, row: 18, after: 'row 17', title: 'Have You Ever?',
    grammar: 'Jeg har været i Paris: har + the past participle (været, set, gjort, sagt); er with verbs of moving (han er kommet, hun er gået); har du nogensinde …?',
    words: ['været', 'set', 'sagt', 'gjort', 'fået', 'kommet', 'gået', 'blevet', 'haft', 'hørt', 'fundet', 'lavet', 'taget', 'talt', 'fortalt', 'sket', 'glemt', 'tænkt', 'nogensinde'] },
  { unit_id: 'U74', order: 117.2, row: 19, after: 'row 18', title: 'Little Words',
    grammar: 'Ned, tilbage, væk, hen, rundt: the way you go (gå ned, kom tilbage); bag, foran, udenfor: where things are; mod, uden, gennem, omkring; hinanden (each other); sin, sit, sine (his, her own)',
    words: ['ned', 'tilbage', 'væk', 'hen', 'frem', 'rundt', 'forbi', 'mod', 'imod', 'uden', 'gennem', 'igennem', 'omkring', 'bag', 'foran', 'udenfor', 'hinanden', 'begge', 'sin', 'sit', 'sine', 'egen', 'videre', 'herfra', 'tæt', 'ligesom', 'hvilket'] },
  { unit_id: 'U75', order: 119.2, row: 20, after: 'row 19', title: 'Likes + Feelings',
    grammar: 'Jeg elsker …, jeg hader …; jeg er ked af det (I am sorry, sad); jeg glæder mig til … (I look forward to); hellere (rather), helst (most of all); det er sjovt',
    words: ['hader', 'ønsker', 'kærlighed', 'hjerte', 'sjovt', 'ked', 'glæder', 'savner', 'mening', 'ligeglad', 'fantastisk', 'held', 'værre', 'hellere', 'helst', 'liv', 'livet', 'lever', 'leve', 'skyld'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Spoken times as Danes say them (halv fire is 3:30); timetables and notices on the 24-hour clock with a point
// (18.00), as Danish signs write it; dates day first.
const listen = [
  ['N201', 'U61', 'time', 'Klokken er halv fire.', '3:30'], ['N202', 'U61', 'time', 'Klokken er kvart over otte.', '8:15'],
  ['N203', 'U61', 'time', 'Klokken er tolv.', '12:00'], ['N204', 'U61', 'time', 'Klokken er kvart i ti.', '9:45'],
  ['N205', 'U63', 'date', 'Den femte marts.', '5/3'], ['N206', 'U63', 'date', 'Den første maj.', '1/5'],
  ['N207', 'U63', 'date', 'Den femtende september.', '15/9'], ['N208', 'U63', 'date', 'Den tredivte december.', '30/12'],
  ['N209', 'U67', 'time', 'Bussen kører ti minutter over fire.', '4:10'], ['N210', 'U67', 'time', 'Toget er fremme tyve minutter over ni.', '9:20'],
  ['N211', 'U68', 'time', 'Bussen til Odense kører klokken seks.', '6:00'], ['N212', 'U68', 'number', 'Toget til Aarhus kører fra spor syv.', '7'],
]
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const texts = [
  text('R201', 'U62', 'notice', 'Butikken', ['Åbent mandag til fredag: 9.00 til 18.00', 'Lørdag: 10.00 til 16.00', 'Søndag: lukket'],
    [q('When is the shop closed?', ['Sunday', 'Saturday', 'Monday']), q('What time does it open on Saturday?', ['10:00', '9:00', '16:00'])]),
  text('R202', 'U62', 'message', 'En sms fra Lars', ['Anna!', 'Skal vi i biografen på onsdag? Jeg har fri onsdag og torsdag.', 'På lørdag arbejder jeg.', 'Lars'],
    [q('When is Lars free?', ['Wednesday and Thursday', 'Saturday', 'Every day']), q('What does Lars do on Saturday?', ['He works', 'He goes to the cinema', 'He stays at home'])]),
  text('R203', 'U62', 'notice', 'Museet', ['Museet er lukket om mandagen.', 'For børn: onsdag klokken 15.00'],
    [q('Which day is the museum closed?', ['Monday', 'Wednesday', 'Tuesday']), q('When is the visit for children?', ['Wednesday at 3 pm', 'Monday at 3 pm', 'Wednesday at 5 pm'])]),
  text('R204', 'U63', 'notice', 'Ferie', ['Skolen er lukket fra den 20. december til den 6. januar.', 'Første skoledag: tirsdag den 7. januar'],
    [q('Which day of the week does school start again?', ['Tuesday', 'Monday', 'Saturday']), q('When do the holidays begin?', ['20 December', '7 January', '6 January'])]),
  text('R205', 'U63', 'sign', 'Fest', ['Fest på torvet', 'Lørdag den 21. juni, 18.00', 'Musik og dans'],
    [q('When is the party?', ['Saturday 21 June', 'Sunday 21 June', 'Saturday 21 July']), q('What time does it start?', ['6 pm', '8 pm', '9 pm'])]),
  text('R206', 'U63', 'message', 'Et postkort fra Mette', ['I juli tager vi til havet.', 'I december tager vi til Norge.', 'Og du?'],
    [q('Where does Mette go in July?', ['To the sea', 'To Norway', 'To the city']), q('When does she go to Norway?', ['In December', 'In July', 'In spring'])]),
  text('R207', 'U66', 'sign', 'Ved butikken', ['Indgang', 'Åbent 9.00 til 19.00', 'Søndag: lukket'],
    [q('When is the shop closed?', ['On Sundays', 'On Saturdays', 'Every evening']), q('What time does it close?', ['7 pm', '9 pm', '9 am'])]),
  text('R208', 'U66', 'sign', 'På stationen', ['Toilet: en etage op', 'Apotek: ved siden af udgangen', 'Information: ved indgangen'],
    [q('Where is the toilet?', ['One floor up', 'Two floors up', 'Next to the exit']), q('Where can you get information?', ['At the entrance', 'At the chemist\'s', 'On the train'])]),
  text('R209', 'U66', 'notice', 'Bageren', ['Mettes bageri', 'Åbent hver dag 7.00 til 18.00', 'Nyt brød klokken 7.00 og 12.00'],
    [q('Is the bakery open on Sunday?', ['Yes', 'No', 'Only in the morning']), q('When is there fresh bread?', ['At 7 am and 12 noon', 'At 6 am only', 'At 6 pm'])]),
  text('R210', 'U67', 'timetable', 'Tog til Odense', ['Afgang 8.15 – ankomst 9.05', 'Afgang 12.40 – ankomst 13.30', 'Afgang 18.00 – ankomst 18.50'],
    [q('When does the 12:40 train arrive?', ['13:30', '9:05', '18:50']), q('What time is the first train?', ['8:15', '12:40', '18:00'])]),
  text('R211', 'U67', 'timetable', 'Båd til Bornholm', ['Afgang fra havnen: 7.00, 9.00, 11.00', 'Søndag: en båd hver anden time'],
    [q('Where does the boat leave from?', ['The harbour', 'The station', 'The beach']), q('How often is the boat on Sundays?', ['Every two hours', 'Every hour', 'Not at all'])]),
  text('R212', 'U67', 'message', 'En sms fra Peter', ['Jeg er fremme på stationen 17.30.', 'Mit tog kører fra København 15.00.', 'Vi ses!'],
    [q('When does Peter arrive?', ['5:30 pm', '3 pm', '7:30 pm']), q('Where does his train leave from?', ['Copenhagen', 'The airport', 'Aarhus'])]),
  text('R213', 'U69', 'notice', 'I timen', ['Lyt til teksten.', 'Svar på spørgsmålene.', 'Vælg et billede.'],
    [q('What do you do first?', ['Listen to the text', 'Answer the questions', 'Choose a picture']), q('What do you choose?', ['A picture', 'A book', 'A word'])]),
  text('R214', 'U69', 'notice', 'Døren', ['Luk døren, tak.', 'Husk: luk den langsomt.'],
    [q('What should you do with the door?', ['Close it', 'Leave it open', 'Lock it']), q('How should you close it?', ['Slowly', 'Quickly', 'With a key'])]),
  text('R215', 'U69', 'notice', 'Øvelsen', ['Vælg et nummer.', 'Find siden i bogen.', 'Læs teksten.'],
    [q('What do you look for in the book?', ['The page', 'The door', 'A picture']), q('What do you do last?', ['Read the text', 'Choose a number', 'Close the book'])]),
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F201', unit_id: 'U64', card: 'Lars og Anna skal i biografen på lørdag klokken halv ni om aftenen. De ses på torvet.',
      fields: [{ key: 'day', label: 'Dag', rule: 'text', answer: 'lørdag', also: ['Lørdag', 'på lørdag'] }, { key: 'time', label: 'Tid', rule: 'text', answer: '20:30', also: ['8:30', '20.30', '8.30', 'halv ni', 'klokken halv ni'] },
        { key: 'where', label: 'Hvor', rule: 'text', answer: 'på torvet', also: ['torvet', 'torv', 'På torvet'] }] },
    { id: 'F202', unit_id: 'U65', card: 'Jeg hedder Mette. Jeg spiser morgenmad klokken syv. Jeg begynder at arbejde klokken ni og slutter klokken fem.',
      fields: [{ key: 'name', label: 'Navn', rule: 'text', answer: 'Mette' }, { key: 'breakfast', label: 'Morgenmad', rule: 'text', answer: '7:00', also: ['7', '7.00', 'syv', 'klokken syv'] },
        { key: 'start', label: 'Begynder', rule: 'text', answer: '9:00', also: ['9', '9.00', 'ni', 'klokken ni'] }, { key: 'end', label: 'Slutter', rule: 'text', answer: '17:00', also: ['5', '5:00', '17', '17.00', 'fem', 'klokken fem'] }] },
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
  U71: [['speaking', 'Spoken production', 'I can say in simple words what I did yesterday.']],
  U37: [['speaking', 'Spoken interaction', "I can say I didn't hear and ask someone to speak up."]],
  U62: [['speaking', 'Spoken production', 'I can say what day it is and how often I do something.']],
  U63: [['listening', 'Listening', 'I can understand dates and months.'], ['speaking', 'Spoken production', 'I can say when my birthday is.']],
  U72: [['speaking', 'Spoken production', 'I can say what the weather is like.']],
  U38: [['speaking', 'Spoken interaction', 'I can ask for a moment to think.']],
  U64: [['speaking', 'Spoken interaction', 'I can make a simple plan with someone: what, when and where.']],
  U65: [['speaking', 'Spoken production', 'I can describe my day in simple words.']],
  U73: [['speaking', 'Spoken interaction', 'I can ask someone if they have done or seen something, and answer.']],
  U66: [['reading', 'Reading', 'I can understand simple signs and notices: open, closed, entrance, exit.']],
  U67: [['reading', 'Reading', 'I can find a departure or arrival time on a timetable.']],
  U74: [['reading', 'Reading', 'I can understand the small words that say where something is or which way it goes: down, back, away, behind, without.']],
  U39: [['speaking', 'Spoken interaction', "I can say I'm not sure or that I think so."]],
  U68: [['listening', 'Listening', 'I can understand a short announcement at a station or an airport.']],
  U69: [['reading', 'Reading', 'I can follow short, simple instructions.']],
  U75: [['speaking', 'Spoken production', 'I can say what I like and how I feel.']],
}

// Turned off in the gather (ids kept): politiet carries the police (one Tatoeba line has bare politi).
const off = {
  politi: 'turned off in the gather: politiet (the police) carries it, and Tatoeba has one line with bare politi',
}
const late = []
// åbent was turned off in Part 2 (too few lines then); signs need it, so it moves to U66 with its id.
const revive = { åbent: 'U66' }

export default {
  part: 3, off, late, revive, wordBase: 1301, vocabBase: 1501, cdBase: 401,
  slots: [{ slot_id: 'C05', part: 3, after_row: 17 }, { slot_id: 'C06', part: 3, after_row: 19 }],
  situation, vocab, items, canDo,
}
