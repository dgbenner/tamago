// German A1 · Part 4, Out and About (Dan, 2026-11-15), the last German part, in the format of French Parts 4 to 6:
// ordering food and drink (T07) and reading a menu (T09); asking the way and getting around (T08); family, home and
// work (T06); filling in a form (T10); writing a short message or card (T11); the help thread goes on (T13). Words
// from Goethe Start Deutsch 1 where they fit (scripts/a1-coverage.mjs --missing), checked against Tatoeba first
// (scripts/circle-feasibility.mjs). Vocabulary circles: food, shops and services, where things are, trips, and people
// and things. My Family borrows the Family pack's words. Read and Answer has three texts per circle that has it.
// The mock Goethe-Zertifikat A1 follows this part.
// Used by scripts/add-part.mjs (COURSE=de PART=4).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U81', order: 121, row: 21, after: '', title: 'At the Café', tasks: 'T07;T09',
    grammar: 'Ich hätte gern einen Kaffee. Ich nehme ein Stück Kuchen. Die Rechnung, bitte. Es schmeckt gut: schmecken says how food tastes',
    words: ['bestellen', 'bestelle', 'Getränk', 'Getränke', 'Bier', 'Wein', 'Brötchen', 'Butter', 'Rechnung', 'schmecken', 'schmeckt', 'Appetit', 'Speisekarte', 'Stück', 'hätte'] },
  { unit_id: 'U26', order: 121.5, row: 21.5, after: 'row 21', title: 'Excuse Me', help: true, tasks: 'T13',
    grammar: 'Entschuldigung, darf ich Sie etwas fragen? Ich brauche Hilfe. Ich danke Ihnen.', words: ['Hilfe', 'stören', 'danken'] },
  { unit_id: 'U82', order: 122, row: 22, after: 'row 21', title: 'At the Restaurant', tasks: 'T07;T09',
    grammar: 'Ist der Platz frei? Was können Sie empfehlen? Ich bin satt. Es riecht gut: riechen says how something smells',
    words: ['Platz', 'empfehlen', 'Lokal', 'kochen', 'kocht', 'satt', 'lecker', 'Nachtisch', 'riechen', 'riecht', 'Gericht'] },
  { unit_id: 'U83', order: 123, row: 22, after: 'row 21', title: 'Asking the Way', tasks: 'T08',
    grammar: 'Wie komme ich zum Bahnhof? zum (zu dem) with der and das words, zur (zu der) with die words; links, rechts, geradeaus; an der Ecke',
    words: ['links', 'rechts', 'geradeaus', 'Ecke', 'wohin', 'Ort', 'Weg', 'Nähe', 'Ampel', 'Brücke', 'Meter', 'Kilometer', 'zum', 'zur', 'dem'] },
  { unit_id: 'U27', order: 123.5, row: 22.5, after: 'row 22', title: "I'm Lost", help: true, tasks: 'T13',
    grammar: 'Ich bin fremd hier. Ich habe mich verlaufen. Können Sie mir das auf dem Stadtplan zeigen?', words: ['fremd', 'verlaufen', 'Stadtplan', 'zeigen', 'suchen'] },
  { unit_id: 'U84', order: 124, row: 23, after: 'row 22', title: 'Getting Around', tasks: 'T08',
    grammar: 'Mit dem Bus, mit der Straßenbahn: mit takes dem and der; zu Fuß gehen; Rad fahren; laufen: ich laufe, er läuft',
    words: ['Haltestelle', 'Straßenbahn', 'S-Bahn', 'Autobahn', 'Rad', 'laufen', 'läuft', 'zu Fuß', 'Lkw'] },
  { unit_id: 'U85', order: 125, row: 23, after: 'row 22', title: 'My Family', tasks: 'T06',
    grammar: 'Unser, unsere (our), euer, eure (your, to several people): like mein and meine; Ich bin verheiratet, ich bin ledig',
    borrow: ['Mutter', 'Vater', 'Bruder', 'Schwester', 'Sohn', 'Tochter', 'Eltern'],
    words: ['Geschwister', 'Großeltern', 'Oma', 'Opa', 'Ehemann', 'Ehefrau', 'verheiratet', 'ledig', 'heiraten', 'Hochzeit', 'Verwandte', 'Partnerin', 'unser', 'unsere', 'euer', 'eure', 'leben', 'lebt', 'Kindergarten'] },
  { unit_id: 'U86', order: 126, row: 24, after: 'row 23', title: 'At Home', tasks: 'T06',
    grammar: 'In der Küche, im Bad, auf dem Balkon; im ersten Stock; eine Wohnung mieten, umziehen',
    words: ['Küche', 'Bad', 'Balkon', 'Schrank', 'Sofa', 'Herd', 'Kühlschrank', 'Möbel', 'Treppe', 'Stock', 'Licht', 'Raum', 'mieten', 'vermieten', 'umziehen', 'baden', 'Wohnzimmer'] },
  { unit_id: 'U87', order: 127, row: 24, after: 'row 23', title: 'At Work', tasks: 'T06',
    grammar: 'Was sind Sie von Beruf? Ich bin Lehrer: no ein before a job; Ich arbeite bei einer Firma; studieren is for university',
    borrow: ['Büro', 'Arbeit', 'arbeite', 'arbeitest', 'arbeitet', 'Chef', 'Chefin'],
    words: ['Beruf', 'Job', 'Firma', 'Kollege', 'Stelle', 'verdienen', 'verdient', 'arbeitslos', 'Hausfrau', 'studieren', 'studiert', 'Studium', 'Praktikum', 'Doktor', 'reparieren', 'arbeiten', 'Kurs', 'Gruppe'] },
  { unit_id: 'U28', order: 127.5, row: 24.5, after: 'row 24', title: 'Explaining a Problem', help: true, tasks: 'T13',
    grammar: 'Das funktioniert nicht. Hier fehlt etwas. Was ist passiert? Alles in Ordnung?', words: ['fehlen', 'fehlt', 'funktioniert', 'passiert', 'Ordnung'] },
  { unit_id: 'U88', order: 128, row: 25, after: 'row 24', title: 'Filling In Forms', tasks: 'T10',
    grammar: 'Bitte füllen Sie das Formular aus: ausfüllen splits; Sie müssen hier unterschreiben; Geburtsjahr, Geburtsort: two nouns join into one',
    words: ['Formular', 'ausfüllen', 'unterschreiben', 'Geburtsjahr', 'Geburtsort', 'weiblich', 'männlich', 'anmelden', 'Heimat', 'Unterschrift', 'Dame'] },
  { unit_id: 'U89', order: 129, row: 25, after: 'row 24', title: 'Messages + Cards', tasks: 'T11',
    grammar: 'Liebe Anna, lieber Tom: how a message opens; Viele Grüße, herzliche Grüße: how it ends; Ich freue mich; Herzlichen Glückwunsch!',
    words: ['E-Mail', 'schicken', 'Gruß', 'Grüße', 'herzlich', 'liebe', 'lieber', 'Glückwunsch', 'gratulieren', 'gratuliere', 'freuen', 'freue', 'Feier', 'feiern', 'willkommen', 'Glück', 'erzählen', 'Anruf', 'telefonieren', 'Einladung'] },
]

const vocab = [
  { unit_id: 'U91', order: 121.2, row: 21, after: '', title: 'Food',
    grammar: 'Das Frühstück, das Mittagessen, das Abendessen: zum Frühstück (for breakfast); Salz und Öl; das Ei, die Eier',
    words: ['Salat', 'Hähnchen', 'Pommes frites', 'Schinken', 'Salz', 'Öl', 'Birne', 'Suppe', 'Ei', 'Frühstück', 'Mittagessen', 'Abendessen', 'Wurst', 'bitter'] },
  { unit_id: 'U92', order: 123.2, row: 22, after: 'row 21', title: 'Shops + Services',
    grammar: 'Einkaufen splits: ich kaufe ein; in der Bäckerei, auf der Bank, bei der Post; günstig is good value',
    words: ['Geschäft', 'Laden', 'Bäckerei', 'Kiosk', 'Bank', 'Post', 'Polizei', 'Automat', 'einkaufen', 'verkaufen', 'verkauft', 'günstig', 'Briefmarke', 'Supermarkt', 'Apotheke', 'Kunde'] },
  { unit_id: 'U93', order: 125.2, row: 23, after: 'row 22', title: 'Where It Is',
    grammar: 'An, bei, über, unter, zwischen say where; oben, unten, hinten, daneben stand alone; ohne and durch take den for der words',
    words: ['an', 'bei', 'durch', 'gegen', 'ohne', 'über', 'unter', 'zwischen', 'oben', 'unten', 'hinten', 'daneben', 'Mitte'] },
  { unit_id: 'U94', order: 127.2, row: 24, after: 'row 23', title: 'Trips',
    grammar: 'Ins Ausland reisen; im Hotel übernachten; ein Einzelzimmer, ein Doppelzimmer; den Pass oder den Ausweis zeigen',
    words: ['reisen', 'reise', 'Ausland', 'Pass', 'Ausweis', 'übernachten', 'Rezeption', 'Einzelzimmer', 'Doppelzimmer', 'besichtigen', 'Sehenswürdigkeit', 'Sehenswürdigkeiten', 'Führung', 'Papiere'] },
  { unit_id: 'U95', order: 129.2, row: 25, after: 'row 24', title: 'People + Things',
    grammar: 'Alle, beide, andere, die meisten: words for how many; diese (this, these), dieser with der words; sich kümmern um: to look after',
    words: ['Erwachsene', 'Jugendliche', 'Bekannte', 'beide', 'alle', 'andere', 'diese', 'dieser', 'meisten', 'eilig', 'sich', 'kümmern', 'Bein', 'Lied', 'Internet', 'gewinnen', 'Feuer', 'Teil', 'Thema', 'Gespräch'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Read and Answer has three texts per circle that has it; the notices include the small ads of the Goethe
// reading paper (a flat to let, a course).
const listen = [
  ['N301', 'U81', 'price', 'Ein Kaffee, zwei Euro fünfzig.', '2.50'], ['N302', 'U81', 'price', 'Ein Bier, vier Euro.', '4'],
  ['N303', 'U82', 'price', 'Die Suppe kostet sechs Euro fünfzig.', '6.50'], ['N304', 'U82', 'price', 'Das macht zusammen zwölf Euro.', '12'],
  ['N305', 'U84', 'number', 'Nehmen Sie den Bus Nummer dreiundzwanzig.', '23'], ['N306', 'U84', 'number', 'Fahren Sie mit der Straßenbahn Nummer vier.', '4'],
  ['N307', 'U83', 'number', 'Der Bahnhof ist zweihundert Meter von hier.', '200'], ['N308', 'U86', 'number', 'Die Wohnung ist im dritten Stock.', '3'],
  ['N309', 'U87', 'time', 'Die Praxis ist morgen ab neun Uhr geöffnet.', '9:00'], ['N310', 'U87', 'time', 'Das Büro ist heute bis sechzehn Uhr dreißig geöffnet.', '16:30'],
  ['N311', 'U89', 'phone', 'Meine Nummer ist null, sieben, zwölf, sechzehn, achtzehn, vierzehn.', '07 12 16 18 14'], ['N312', 'U89', 'date', 'Die Feier ist am zweiten Juni.', '2/6'],
]
const texts = [
  { id: 'R301', unit_id: 'U81', kind: 'menu', title: 'Café am Markt', lines: ['Kaffee: 2 €', 'Tee: 2,50 €', 'Apfelsaft: 3,50 €', 'Bier: 4 €'],
    questions: [{ question: 'How much is the apple juice?', choices: ['€3.50', '€2.50', '€4'], answer: 0 }, { question: 'What is the cheapest drink?', choices: ['Coffee', 'Tea', 'Beer'], answer: 0 }] },
  { id: 'R302', unit_id: 'U81', kind: 'sign', title: 'Im Café', lines: ['Bitte an der Kasse bestellen und zahlen.', 'Kein Bier und kein Wein vor zwölf Uhr.'],
    questions: [{ question: 'Where do you order?', choices: ['At the till', 'At the table', 'Outside'], answer: 0 }, { question: 'When can you have wine?', choices: ['From noon', 'In the morning', 'Never'], answer: 0 }] },
  { id: 'R303', unit_id: 'U81', kind: 'message', title: 'Eine Nachricht von Maria', lines: ['Peter,', 'ich bin im Café am Bahnhof.', 'Ich trinke einen Tee. Kommst du?'],
    questions: [{ question: 'Where is Maria?', choices: ['At the café by the station', 'On the train', 'At home'], answer: 0 }, { question: 'What is she drinking?', choices: ['Tea', 'Coffee', 'Juice'], answer: 0 }] },
  { id: 'R304', unit_id: 'U82', kind: 'menu', title: 'Mittagessen – 15 €', lines: ['Suppe oder Salat', 'Hähnchen mit Reis', 'Nachtisch: Schokoladenkuchen'],
    questions: [{ question: 'How much is the lunch?', choices: ['€15', '€5', '€50'], answer: 0 }, { question: 'What is the main course?', choices: ['Chicken with rice', 'Soup', 'Chocolate cake'], answer: 0 }] },
  { id: 'R305', unit_id: 'U82', kind: 'notice', title: 'Das Restaurant', lines: ['Geöffnet: Dienstag bis Sonntag', 'Mittag: 12–14 Uhr', 'Abend: 18–22 Uhr', 'Am Montag geschlossen'],
    questions: [{ question: 'Which day is the restaurant closed?', choices: ['Monday', 'Sunday', 'Tuesday'], answer: 0 }, { question: 'What time does it open in the evening?', choices: ['6 pm', '12 noon', '10 pm'], answer: 0 }] },
  { id: 'R306', unit_id: 'U82', kind: 'menu', title: 'Nachtisch', lines: ['Kuchen: 5 €', 'Eis: 4 €', 'Obst: 3 €'],
    questions: [{ question: 'How much is the cake?', choices: ['€5', '€4', '€3'], answer: 0 }, { question: 'Which dessert costs €3?', choices: ['Fruit', 'Ice cream', 'Cake'], answer: 0 }] },
  { id: 'R307', unit_id: 'U83', kind: 'message', title: 'Der Weg zu mir', lines: ['Am Bahnhof gehst du links.', 'Dann gehst du geradeaus bis zur Ampel.', 'Mein Haus ist rechts, am Park.'],
    questions: [{ question: 'Which way do you go at the station?', choices: ['Left', 'Right', 'Straight on'], answer: 0 }, { question: 'Where is the house?', choices: ['By the park', 'Next to the station', 'Behind the school'], answer: 0 }] },
  { id: 'R308', unit_id: 'U83', kind: 'sign', title: 'Das Museum', lines: ['Museum → rechts, 200 m', 'Bahnhof ← links, 1 km'],
    questions: [{ question: 'Where is the museum?', choices: ['To the right', 'To the left', 'Behind you'], answer: 0 }, { question: 'How far is the station?', choices: ['1 km', '200 m', '2 km'], answer: 0 }] },
  { id: 'R309', unit_id: 'U83', kind: 'message', title: 'Das Restaurant', lines: ['Gehen Sie über die Brücke.', 'Das Restaurant ist an der Ecke, in der Nähe der Bank.'],
    questions: [{ question: 'What do you cross?', choices: ['The bridge', 'The square', 'The road'], answer: 0 }, { question: 'What is near the restaurant?', choices: ['The bank', 'The church', 'The park'], answer: 0 }] },
  { id: 'R310', unit_id: 'U86', kind: 'notice', title: 'Wohnung zu vermieten', lines: ['Zwei Zimmer, Küche, Bad, Balkon', 'Dritter Stock, mit Aufzug', 'Miete: 600 Euro im Monat'],
    questions: [{ question: 'How many rooms does the flat have?', choices: ['Two', 'Three', 'One'], answer: 0 }, { question: 'How much is the rent a month?', choices: ['600 euros', '300 euros', '900 euros'], answer: 0 }] },
  { id: 'R311', unit_id: 'U86', kind: 'notice', title: 'Zu verkaufen', lines: ['Sofa, zwei Jahre alt: 80 Euro', 'Kühlschrank, neu: 150 Euro', 'Telefon: 030 12 34 56'],
    questions: [{ question: 'How much is the sofa?', choices: ['80 euros', '150 euros', '30 euros'], answer: 0 }, { question: 'Which thing is new?', choices: ['The fridge', 'The sofa', 'The phone'], answer: 0 }] },
  { id: 'R312', unit_id: 'U86', kind: 'message', title: 'Eine Nachricht von Anna', lines: ['Hallo Tom,', 'wir ziehen am Samstag um.', 'Die neue Wohnung ist im zweiten Stock und hat einen Balkon.', 'Kannst du helfen?'],
    questions: [{ question: 'When is Anna moving?', choices: ['On Saturday', 'On Sunday', 'Next month'], answer: 0 }, { question: 'What does the new flat have?', choices: ['A balcony', 'A garden', 'A lift'], answer: 0 }] },
  { id: 'R313', unit_id: 'U89', kind: 'message', title: 'Eine Einladung', lines: ['Liebe Maria,', 'am Samstag feiere ich meinen Geburtstag.', 'Die Feier beginnt um 19 Uhr bei mir zu Hause.', 'Kommst du? Viele Grüße, Peter'],
    questions: [{ question: 'What is Peter celebrating?', choices: ['His birthday', 'His wedding', 'A new job'], answer: 0 }, { question: 'Where is the party?', choices: ["At Peter's home", 'At a restaurant', 'In the park'], answer: 0 }] },
  { id: 'R314', unit_id: 'U89', kind: 'message', title: 'Eine Karte aus Hamburg', lines: ['Lieber Tom,', 'viele Grüße aus Hamburg!', 'Das Hotel ist am Bahnhof. Am Montag fahre ich mit dem Zug zurück.', 'Anna'],
    questions: [{ question: 'Where is Anna?', choices: ['In Hamburg', 'In Berlin', 'In Paris'], answer: 0 }, { question: 'How is she going home?', choices: ['By train', 'By plane', 'By car'], answer: 0 }] },
  { id: 'R315', unit_id: 'U89', kind: 'notice', title: 'Deutschkurs', lines: ['Deutsch für Anfänger', 'Montag und Mittwoch, 18–20 Uhr', 'Anmeldung im Büro, erster Stock'],
    questions: [{ question: 'When is the course?', choices: ['Monday and Wednesday evening', 'Every morning', 'At the weekend'], answer: 0 }, { question: 'Where do you sign up?', choices: ['In the office on the first floor', 'In the classroom', 'At the entrance'], answer: 0 }] },
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F301', unit_id: 'U88', card: 'Ich heiße Maria Schmidt. Ich bin 1990 in Hamburg geboren. Ich komme aus Deutschland und ich bin verheiratet.',
      fields: [{ key: 'last', label: 'Name', rule: 'text', answer: 'Schmidt' }, { key: 'first', label: 'Vorname', rule: 'text', answer: 'Maria' }, { key: 'year', label: 'Geburtsjahr', rule: 'number', answer: '1990' }, { key: 'place', label: 'Geburtsort', rule: 'text', answer: 'Hamburg' },
        { key: 'country', label: 'Land', rule: 'text', answer: 'Deutschland' }, { key: 'status', label: 'Familienstand', rule: 'text', answer: 'verheiratet' }] },
    { id: 'F302', unit_id: 'U88', card: 'Guten Tag, mein Name ist Peter Weber. Ich möchte ein Einzelzimmer für zwei Nächte, vom zehnten bis zum zwölften Mai. Meine Nummer ist null, sechs, elf, fünfzehn, neunzehn, zwanzig.',
      fields: [{ key: 'last', label: 'Name', rule: 'text', answer: 'Weber' }, { key: 'room', label: 'Zimmer', rule: 'text', answer: 'Einzelzimmer', also: ['ein Einzelzimmer', 'einzelzimmer'] }, { key: 'nights', label: 'Nächte', rule: 'number', answer: '2' },
        { key: 'from', label: 'Ankunft', rule: 'text', answer: '10. Mai', also: ['10.5.', '10.5', '10.05.', '10.05', '10/5', 'zehnter Mai', 'zehnten Mai', 'vom zehnten Mai', '10 Mai', 'am 10. Mai'] }, { key: 'tel', label: 'Telefon', rule: 'phone', answer: '06 11 15 19 20' }] },
    { id: 'F303', unit_id: 'U82', card: 'Ich möchte einen Tisch für vier Personen bestellen, am Samstag um acht Uhr abends. Mein Name ist Anna Becker.',
      fields: [{ key: 'name', label: 'Name', rule: 'text', answer: 'Becker', also: ['Anna Becker'] }, { key: 'people', label: 'Personen', rule: 'number', answer: '4' }, { key: 'day', label: 'Tag', rule: 'text', answer: 'Samstag', also: ['samstag', 'am Samstag'] },
        { key: 'time', label: 'Uhrzeit', rule: 'text', answer: '20 Uhr', also: ['20:00', '20.00', '20:00 Uhr', '20.00 Uhr', '20', '8 Uhr', '8:00', '8.00', '8', 'acht Uhr', 'um acht Uhr', 'acht', '8 Uhr abends', 'acht Uhr abends'] }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: texts.map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P301', unit_id: 'U82', prompt: 'Write a short message to a friend about a restaurant: where it is, what you ate and what it cost.', points: 'where it is;what you ate;the price', min_words: 25, max_words: 40 },
    { id: 'P302', unit_id: 'U83', prompt: 'Write a short message to a friend: how to get to your home from the station.', points: 'leaving the station;two directions;where your home is', min_words: 25, max_words: 40 },
    { id: 'P303', unit_id: 'U86', prompt: 'Write a few lines to a friend about your new home: where it is, the rooms and what you like about it.', points: 'where it is;the rooms;what you like', min_words: 25, max_words: 40 },
    { id: 'P304', unit_id: 'U89', prompt: 'A friend invites you to a birthday party on Saturday. Write a short reply: say thank you, say that you are coming and ask what you can bring.', points: 'thank you;you are coming;what to bring', min_words: 25, max_words: 40 },
    { id: 'P305', unit_id: 'U89', prompt: 'Write a short postcard from a trip: where you are, your hotel and when you go home.', points: 'where you are;your hotel;when you go home', min_words: 25, max_words: 40 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

const canDo = {
  U81: [['speaking', 'Spoken interaction', 'I can order a drink and something to eat, and ask for the bill.']],
  U26: [['speaking', 'Spoken interaction', "I can get someone's attention politely and ask for help."]],
  U82: [['speaking', 'Spoken interaction', 'I can order a simple meal.'], ['reading', 'Reading', 'I can understand a simple menu.']],
  U83: [['speaking', 'Spoken interaction', 'I can ask the way and understand simple directions.']],
  U27: [['speaking', 'Spoken interaction', "I can say I'm lost and ask someone to show me the way."]],
  U84: [['speaking', 'Spoken production', 'I can say how I get somewhere: by bus, by tram, by bike, on foot.']],
  U85: [['speaking', 'Spoken production', 'I can talk about my family in simple words.']],
  U86: [['speaking', 'Spoken production', 'I can describe my home in simple words.'], ['reading', 'Reading', 'I can understand a short ad for a flat.']],
  U87: [['speaking', 'Spoken interaction', 'I can say what my job is and ask someone about theirs.']],
  U28: [['speaking', 'Spoken interaction', 'I can say that something is missing or does not work.']],
  U88: [['writing', 'Writing', 'I can fill in a form with my personal details.']],
  U89: [['writing', 'Writing', 'I can write a short, simple card or message: a greeting, an invitation, a thank-you.']],
  U91: [['reading', 'Reading', 'I can recognise everyday words for food and meals.']],
  U92: [['reading', 'Reading', 'I can recognise the names of shops and services in a town.']],
  U93: [['reading', 'Reading', 'I can understand where something is: above, below, between, next to it.']],
  U94: [['speaking', 'Spoken interaction', 'I can ask for a room and show my papers on a trip.']],
  U95: [['reading', 'Reading', 'I can understand who and what a sentence is about: everyone, both, the others, this one.']],
}

export default {
  part: 4, wordBase: 1601, vocabBase: 1801, cdBase: 401,
  slots: [{ slot_id: 'C07', part: 4, after_row: 22 }, { slot_id: 'C08', part: 4, after_row: 24 }],
  situation, vocab, items, canDo, off: {},
  // Added in review (2026-11-15): forms the circles' own phrases need and the course never taught (Gehen Sie geradeaus;
  // Ist alles in Ordnung?; im ersten Stock; Viele Grüße; Herzlichen Glückwunsch; Wir freuen uns).
  late: [{ unit_id: 'U82', words: ['alles'] }, { unit_id: 'U83', words: ['gehen'] }, { unit_id: 'U86', words: ['ersten', 'zweiten'] }, { unit_id: 'U89', words: ['herzlichen', 'uns'] }, { unit_id: 'U94', words: ['viele'] }],
}
