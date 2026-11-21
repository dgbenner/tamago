// Swedish A1 · Part 3, Time and Plans (Dan, 2026-11-21; Builder 2, branch content/sv-a1), in the format of Dutch,
// Italian and Portuguese Part 3: telling the time, days, months and dates, making plans and a day's routine (T05); signs,
// notices and timetables (T09); announcements and simple instructions (T12); the help thread goes on (T13). Standard
// Swedish, du throughout; times as Swedes say them (halv fyra is 3:30, half to the next hour; kvart över åtta, kvart i
// tio, fem i halv nio), timetables and notices on the 24-hour clock with a point (18.00), dates day first. Words from the
// course's frequency list (content-sv/a1-list.json, the Swedish Kelly list) first: Part 2 ended at 38% of its 600 most
// frequent words, so Part 3 brings in the list's time words (alltid, aldrig, ofta, ibland, sedan, innan, nästa, förra,
// the months), its everyday verbs (börjar, slutar, jobbar, håller, hittar, lämnar, visar, berättar, fortsätter, händer)
// and its small words of place and direction (ut, in, upp, ner, bort, tillbaka, mot, genom, utan, bakom, utanför), aiming
// at about 65% so Part 4 can reach 90%. Verbs come as their present (one form for every person), with the infinitive
// where a modal needs it; word-senses.json gives each present its infinitive as lemma. Vocabulary themes stay clear of
// Part 4 (food and drink, directions, home, family, work, forms, messages, health). Used by scripts/add-part.mjs
// (COURSE=sv PART=3).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U61', order: 111, row: 16, after: '', title: 'What Time Is It?', tasks: 'T05',
    grammar: 'Vad är klockan? Klockan är tre; halv fyra is 3:30 (half to the next hour); kvart över tre, kvart i fyra; klockan åtta (at eight); på morgonen, på kvällen; hela dagen',
    words: ['halv', 'kvart', 'minut', 'minuter', 'tid', 'morgonen', 'eftermiddag', 'kväll', 'natt', 'tidigt', 'tidig', 'sent', 'sen', 'senare', 'före', 'just', 'direkt', 'hela', 'samtidigt'] },
  { unit_id: 'U37', order: 111.5, row: 16.5, after: 'row 16', title: "Didn't Catch That", help: true, tasks: 'T13',
    grammar: 'Vad sa du? Förlåt, jag hör dig inte. Kan du prata lite högre?: sa, the past of säga; jag ber om ursäkt',
    words: ['hör', 'höra', 'sa', 'högre', 'högt', 'tydligt', 'ber'] },
  { unit_id: 'U62', order: 112, row: 17, after: 'row 16', title: 'Days of the Week', tasks: 'T05;T09',
    grammar: 'På måndag (on Monday), på måndagar (on Mondays); alltid, ofta, ibland, aldrig; jag brukar … (I usually …); nästa vecka, förra veckan; först … sedan',
    words: ['tisdag', 'onsdag', 'torsdag', 'fredag', 'helg', 'helgen', 'igår', 'dagar', 'veckor', 'alltid', 'aldrig', 'ibland', 'ofta', 'brukar', 'nästa', 'förra', 'först', 'sedan', 'innan', 'länge', 'sista', 'då', 'fortfarande'] },
  { unit_id: 'U63', order: 113, row: 17, after: 'row 16', title: 'Months + Seasons', tasks: 'T05;T09',
    grammar: 'I januari, på sommaren; den tionde maj (on 10 May); första, andra, tredje; months, days and seasons take no capital',
    words: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december', 'våren', 'sommar', 'sommaren', 'hösten', 'vintern', 'första', 'andra', 'tredje', 'semester', 'datum', 'början', 'slut'] },
  { unit_id: 'U38', order: 113.5, row: 17.5, after: 'row 17', title: 'Thinking It Over', help: true, tasks: 'T13',
    grammar: 'Låt mig tänka. Jag minns inte. Jag undrar … Nå?: låt + an infinitive; minns (remember), antar (suppose)',
    words: ['låt', 'låter', 'tänka', 'minns', 'egentligen', 'antar', 'undrar', 'nå'] },
  { unit_id: 'U64', order: 114, row: 18, after: 'row 17', title: 'Making Plans', tasks: 'T05',
    grammar: 'Ska vi gå på bio?: ska + a plain infinitive, for plans and suggestions; vill du följa med? (come along); har du lust att …?; om (if): om du vill',
    words: ['ska', 'ses', 'följer', 'följa', 'ikväll', 'bio', 'ledig', 'lust', 'idé', 'plan', 'möte', 'bestämma', 'bestämmer', 'passar', 'förslag', 'föreslår', 'istället', 'därför', 'annan', 'möter', 'beslut', 'framtiden'] },
  { unit_id: 'U65', order: 115, row: 18, after: 'row 17', title: 'My Day', tasks: 'T05',
    grammar: 'Jag vaknar klockan sju och går upp: upp, ut, in after a verb of going; jag börjar, jag slutar; jag jobbar (everyday) and jag arbetar; medan (while); klar (done, ready)',
    words: ['vaknar', 'upp', 'sover', 'sova', 'duschar', 'frukost', 'lunch', 'middag', 'jobbar', 'jobb', 'arbetar', 'arbete', 'börjar', 'börja', 'slutar', 'sluta', 'klar', 'lägger', 'sitter', 'kvar', 'medan', 'vanlig'] },
  { unit_id: 'U66', order: 116, row: 19, after: 'row 18', title: 'Signs + Notices', tasks: 'T09',
    grammar: 'Öppet, stängt: on a sign (the -t form); affären är öppen från nio till sex; rökning förbjuden; endast (only) on notices',
    words: ['stängt', 'ingång', 'utgång', 'förbjudet', 'information', 'apotek', 'toalett', 'rökning', 'gratis', 'endast', 'polis', 'fri', 'regler'] },
  { unit_id: 'U67', order: 117, row: 19, after: 'row 18', title: 'Timetables', tasks: 'T09',
    grammar: 'Tåget avgår klockan åtta och kommer fram klockan tio; en biljett, tur och retur, en enkel biljett; med tåg, med flyg',
    words: ['avgår', 'avgång', 'ankomst', 'fram', 'flygplan', 'flyger', 'båt', 'resa', 'reser', 'biljett', 'enkel', 'spår', 'kör', 'köra'] },
  { unit_id: 'U39', order: 117.5, row: 19.5, after: 'row 19', title: 'Not Sure', help: true, tasks: 'T13',
    grammar: 'Kanske. Det beror på. Jag är inte säker. Antagligen. Inte alls.', words: ['säker', 'beror', 'troligen', 'alls', 'ändå', 'naturligtvis', 'annars'] },
  { unit_id: 'U68', order: 118, row: 20, after: 'row 19', title: 'Announcements', tasks: 'T12',
    grammar: 'Mina damer och herrar: the words of an announcement; tåget är försenat; vänligen … (please, on a notice); mellan, via, cirka',
    words: ['passagerare', 'försenat', 'damer', 'herrar', 'stannar', 'vänligen', 'mellan', 'via', 'cirka'] },
  { unit_id: 'U69', order: 119, row: 20, after: 'row 19', title: 'Instructions', tasks: 'T12',
    grammar: 'Läs texten. Välj rätt svar. Fyll i.: the command is the verb\'s stem (läs, skriv, välj), with the verb first; glöm inte …',
    words: ['titta', 'välj', 'välja', 'fyll', 'läs', 'glöm', 'försök', 'försöka', 'övning', 'text', 'visa', 'visar', 'rätta', 'förklara', 'berätta', 'berättar', 'till exempel'] },
]

const vocab = [
  { unit_id: 'U71', order: 111.2, row: 16, after: '', title: 'Little Words',
    grammar: 'Bakom, framför, mellan: where things are; ut, in, ner, bort, tillbaka: the way you go (gå ut, kom tillbaka); mot, genom, utan, runt',
    words: ['bakom', 'framför', 'utanför', 'ut', 'in', 'ner', 'bort', 'borta', 'tillbaka', 'mot', 'genom', 'utan', 'vid', 'runt', 'kring', 'ihop', 'åt', 'ur', 'någonstans', 'även', 'båda', 'varandra', 'sådan'] },
  { unit_id: 'U72', order: 113.2, row: 17, after: 'row 16', title: 'The Weather',
    grammar: 'Det regnar, det snöar, det blåser: weather verbs take det; det är tjugo grader; vädret är fint, det är kallt (the -t form after det)',
    words: ['väder', 'regn', 'regnar', 'snö', 'snöar', 'blåser', 'grader', 'varmt', 'kallt', 'soligt', 'is'] },
  { unit_id: 'U73', order: 115.2, row: 18, after: 'row 17', title: 'Doing Things',
    grammar: 'Ge, hålla, hitta, lämna: everyday verbs side by side; jag ställer (stand up), jag lägger (lay down), jag sätter (set); det händer, det fungerar',
    words: ['ger', 'håller', 'hittar', 'hitta', 'lämna', 'skickar', 'ställer', 'sätter', 'hämtar', 'flytta', 'ändra', 'drar', 'bygger', 'öppnar', 'stänger', 'söker', 'använder', 'delar', 'fortsätter', 'händer', 'startar', 'fungerar', 'lyckas'] },
  { unit_id: 'U74', order: 117.2, row: 19, after: 'row 18', title: 'Free Time',
    grammar: 'Jag spelar tennis, jag spelar gitarr: spela for games, sport and instruments; jag tränar, jag cyklar; ett lag (a team)',
    words: ['sport', 'tennis', 'cyklar', 'promenad', 'tränar', 'gitarr', 'piano', 'tidning', 'historia', 'hobby', 'tv', 'radio', 'vinner', 'lag', 'program', 'intresse'] },
  { unit_id: 'U75', order: 119.2, row: 20, after: 'row 19', title: 'Likes + Feelings',
    grammar: 'Jag älskar …; det är synd; det känns bra (it feels good); hellre (rather): jag vill hellre …; det spelar ingen roll (it doesn\'t matter)',
    words: ['älskar', 'kärlek', 'hjärta', 'känsla', 'underbar', 'fantastisk', 'synd', 'skönt', 'hellre', 'tanke', 'positiv', 'åsikt', 'liv', 'problem', 'roll', 'vågar', 'tur'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Spoken times as Swedes say them (halv fyra is 3:30); timetables and notices on the 24-hour clock with a point
// (18.00), as Swedish signs write it; dates day first.
const listen = [
  ['N201', 'U61', 'time', 'Klockan är halv fyra.', '3:30'], ['N202', 'U61', 'time', 'Klockan är kvart över åtta.', '8:15'],
  ['N203', 'U61', 'time', 'Klockan är tolv.', '12:00'], ['N204', 'U61', 'time', 'Klockan är kvart i tio.', '9:45'],
  ['N205', 'U63', 'date', 'Den femte mars.', '5/3'], ['N206', 'U63', 'date', 'Den första maj.', '1/5'],
  ['N207', 'U63', 'date', 'Den femtonde september.', '15/9'], ['N208', 'U63', 'date', 'Den trettionde december.', '30/12'],
  ['N209', 'U67', 'time', 'Bussen avgår tio över fyra.', '4:10'], ['N210', 'U67', 'time', 'Tåget kommer fram tjugo över nio.', '9:20'],
  ['N211', 'U68', 'time', 'Bussen till Uppsala avgår klockan sex.', '6:00'], ['N212', 'U68', 'number', 'Tåget till Malmö avgår från spår sju.', '7'],
]
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const texts = [
  text('R201', 'U62', 'notice', 'Affären', ['Öppet måndag till fredag: 9.00 till 18.00', 'Lördag: 10.00 till 16.00', 'Söndag: stängt'],
    [q('When is the shop closed?', ['Sunday', 'Saturday', 'Monday']), q('What time does it open on Saturday?', ['10:00', '9:00', '16:00'])]),
  text('R202', 'U62', 'message', 'Ett sms från Erik', ['Anna!', 'Ska vi gå på bio på onsdag? Jag är ledig på onsdag och torsdag.', 'På lördag jobbar jag.', 'Erik'],
    [q('When is Erik free?', ['Wednesday and Thursday', 'Saturday', 'Every day']), q('What does Erik do on Saturday?', ['He works', 'He goes to the cinema', 'He stays at home'])]),
  text('R203', 'U62', 'notice', 'Museet', ['Museet är stängt på måndagar.', 'För barn: onsdag klockan 15.00'],
    [q('Which day is the museum closed?', ['Monday', 'Wednesday', 'Tuesday']), q('When is the visit for children?', ['Wednesday at 3 pm', 'Monday at 3 pm', 'Wednesday at 5 pm'])]),
  text('R204', 'U63', 'notice', 'Lov', ['Skolan är stängd från den 20 december till den 6 januari.', 'Första skoldagen: tisdag den 7 januari'],
    [q('Which day of the week does school start again?', ['Tuesday', 'Monday', 'Saturday']), q('When do the holidays begin?', ['20 December', '7 January', '6 January'])]),
  text('R205', 'U63', 'sign', 'Fest', ['Fest på torget', 'Lördag den 21 juni, 18.00', 'Musik och dans'],
    [q('When is the party?', ['Saturday 21 June', 'Sunday 21 June', 'Saturday 21 July']), q('What time does it start?', ['6 pm', '8 pm', '9 pm'])]),
  text('R206', 'U63', 'message', 'Ett vykort från Maria', ['I juli åker vi till havet.', 'I december åker vi till bergen.', 'Och du?'],
    [q('Where does Maria go in July?', ['To the sea', 'To the mountains', 'To the city']), q('When does she go to the mountains?', ['In December', 'In July', 'In spring'])]),
  text('R207', 'U66', 'sign', 'Vid affären', ['Ingång', 'Öppet 9.00 till 19.00', 'Söndag: stängt'],
    [q('When is the shop closed?', ['On Sundays', 'On Saturdays', 'Every evening']), q('What time does it close?', ['7 pm', '9 pm', '9 am'])]),
  text('R208', 'U66', 'sign', 'På stationen', ['Toalett: en trappa upp', 'Apotek: bredvid utgången', 'Information: vid ingången'],
    [q('Where is the toilet?', ['One floor up', 'Two floors up', 'Next to the exit']), q('Where can you get information?', ['At the entrance', 'At the chemist\'s', 'On the train'])]),
  text('R209', 'U66', 'notice', 'Bageriet', ['Lindas bageri', 'Öppet varje dag 7.00 till 18.00', 'Nytt bröd klockan 7.00 och 12.00'],
    [q('Is the bakery open on Sunday?', ['Yes', 'No', 'Only in the morning']), q('When is there fresh bread?', ['At 7 am and 12 noon', 'At 6 am only', 'At 6 pm'])]),
  text('R210', 'U67', 'timetable', 'Tåg till Uppsala', ['Avgång 8.15 – ankomst 9.05', 'Avgång 12.40 – ankomst 13.30', 'Avgång 18.00 – ankomst 18.50'],
    [q('When does the 12:40 train arrive?', ['13:30', '9:05', '18:50']), q('What time is the first train?', ['8:15', '12:40', '18:00'])]),
  text('R211', 'U67', 'timetable', 'Båt till Gotland', ['Avgång från hamnen: 7.00, 9.00, 11.00', 'Söndag: en båt varannan timme'],
    [q('Where does the boat leave from?', ['The harbour', 'The station', 'The beach']), q('How often is the boat on Sundays?', ['Every two hours', 'Every hour', 'Not at all'])]),
  text('R212', 'U67', 'message', 'Ett sms från Tom', ['Jag kommer fram till stationen 17.30.', 'Mitt tåg avgår från Stockholm 15.00.', 'Vi ses!'],
    [q('When does Tom arrive?', ['5:30 pm', '3 pm', '7:30 pm']), q('Where does his train leave from?', ['Stockholm', 'The airport', 'Uppsala'])]),
  text('R213', 'U69', 'notice', 'På lektionen', ['Lyssna på texten.', 'Svara på frågorna.', 'Välj en bild.'],
    [q('What do you do first?', ['Listen to the text', 'Answer the questions', 'Choose a picture']), q('What do you choose?', ['A picture', 'A book', 'A word'])]),
  text('R214', 'U69', 'notice', 'Dörren', ['Stäng dörren, tack.', 'Observera: stäng långsamt.'],
    [q('What should you do with the door?', ['Close it', 'Leave it open', 'Lock it']), q('How should you close it?', ['Slowly', 'Quickly', 'With a key'])]),
  text('R215', 'U69', 'notice', 'Övningen', ['Välj ett nummer.', 'Öppna boken på den sidan.', 'Läs texten.'],
    [q('What do you open?', ['The book', 'The door', 'The notebook']), q('What do you do last?', ['Read the text', 'Choose a number', 'Close the book'])]),
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F201', unit_id: 'U64', card: 'Erik och Anna ska gå på bio på lördag klockan halv nio på kvällen. De ses på torget.',
      fields: [{ key: 'day', label: 'Dag', rule: 'text', answer: 'lördag', also: ['Lördag', 'på lördag'] }, { key: 'time', label: 'Tid', rule: 'text', answer: '20:30', also: ['8:30', '20.30', '8.30', 'halv nio', 'klockan halv nio'] },
        { key: 'where', label: 'Var', rule: 'text', answer: 'på torget', also: ['torget', 'torg', 'På torget'] }] },
    { id: 'F202', unit_id: 'U65', card: 'Jag heter Anna. Jag äter frukost klockan sju. Jag börjar jobba klockan nio och slutar klockan fem.',
      fields: [{ key: 'name', label: 'Namn', rule: 'text', answer: 'Anna' }, { key: 'breakfast', label: 'Frukost', rule: 'text', answer: '7:00', also: ['7', '7.00', 'sju', 'klockan sju'] },
        { key: 'start', label: 'Börjar jobba', rule: 'text', answer: '9:00', also: ['9', '9.00', 'nio', 'klockan nio'] }, { key: 'end', label: 'Slutar jobba', rule: 'text', answer: '17:00', also: ['5', '5:00', '17', '17.00', 'fem', 'klockan fem'] }] },
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
  U71: [['reading', 'Reading', 'I can understand the small words that say where something is or which way it goes: behind, outside, out, back, through.']],
  U72: [['speaking', 'Spoken production', 'I can say what the weather is like.']],
  U73: [['speaking', 'Spoken production', 'I can say what I do with everyday verbs: give, hold, find, leave, send, put.']],
  U74: [['speaking', 'Spoken production', 'I can say what I do in my free time.']],
  U75: [['speaking', 'Spoken production', 'I can say what I like and how I feel.']],
}

// Turned off in the gather (ids kept): no natural line with the circle's words yet.
const off = {
  kring: 'turned off in the gather: no natural line yet (runt carries around); Part 4',
  förra: 'turned off in the gather: förra veckan needs a past tense, which Part 3 has not taught; Part 4',
}

// Added after the ids were set: forms the circle's own lines need (gå after ska and vill, hela dagen, ditt beslut, fint
// väder, Tåget avgår …, Mina damer och herrar); Parts 1 and 2 had only går, din and fin.
const late = [{ unit_id: 'U61', words: ['gå', 'dagen'] }, { unit_id: 'U64', words: ['ditt'] }, { unit_id: 'U67', words: ['tåget'] }, { unit_id: 'U68', words: ['mina'] }, { unit_id: 'U72', words: ['fint'] },
  // Kelly core words added for coverage once the circles were gathered (each opens Tatoeba lines with the circle's words).
  { unit_id: 'U61', words: ['tidigare'] }, { unit_id: 'U64', words: ['möjlighet', 'tillfälle', 'lösning', 'risk'] }, { unit_id: 'U69', words: ['sätt', 'del'] },
  { unit_id: 'U39', words: ['särskilt', 'dessutom'] },
  { unit_id: 'U71', words: ['både', 'emot', 'bland', 'sina'] }, { unit_id: 'U73', words: ['handlar'] }, { unit_id: 'U75', words: ['enda', 'eget', 'råd', 'leva'] }]

export default {
  part: 3, off, late, wordBase: 1201, vocabBase: 1401, cdBase: 401,
  slots: [{ slot_id: 'C05', part: 3, after_row: 17 }, { slot_id: 'C06', part: 3, after_row: 19 }],
  situation, vocab, items, canDo,
}
