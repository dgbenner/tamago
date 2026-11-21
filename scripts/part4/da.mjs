// Danish A1 · Part 4, Out and About (Dan, 2026-11-21; Builder 2, branch content/da-a1), the last part, in the format of
// Swedish, Dutch, Italian and Portuguese Part 4: the café and the restaurant (T07), asking the way and getting around
// (T08), family, home and work (T06), forms (T10) and messages (T11); the help thread ends (T13). Standard Danish, modern
// du throughout (formal De and plural I, jer and jeres stay out); prices in kroner (kr.); Danish phone numbers are eight
// digits said in pairs; floors as Danes say them (anden sal). Words from the course's frequency list
// (content-da/a1-list.json, a subtitle frequency stand-in; its 600 most frequent as the core target): Part 3 ended at
// 81% (86% without the stoplist), and the brief aims at about 92%, so the situation circles carry the list words that fit
// them (mad, værsgo, vej, vejen, ad, længere, byen, bilen, hente, søn, datter, kone, gift, huset, job, chef, arbejdet,
// problemer, ondt, galt, ring), and the five vocabulary circles the rest, everyday words first: Ideas + Things (grund,
// slags, del, sagen, historien, resten, sandheden, stedet, dagen), Describing Words (eneste, rigtige, hårdt, fedt, fast,
// død, hvert, sidst), Doing + Getting (holde, holder, klarer, lader, redder, spiller, handler, slår), Thinking + Saying
// (aner, forstået, lover, foregår, da) and Commands (hold, læg, slip, løb, pas på, bliv, tænk, slap af). Verbs come as
// their present (one form for every person), with the infinitive where a modal needs it, and as the imperative in
// Commands; word-senses.json gives each present, past, participle and imperative its infinitive as lemma. The verb have
// is still kept out (Part 1's noun have, garden): ordering goes through få (må jeg få …?) and bede om; har carries
// possession. The past is taught from Part 3's U71, so past lines are fine. Left out: tom (empty; Tatoeba's Tom is a
// name), live (English), jer and jeres (plural you), and the spoon (ske is Part 3's to happen).
// Ids: Part 3's words run to W1599, so this part starts at W2001 and W2201 (both ranges free).
// Used by scripts/add-part.mjs (COURSE=da PART=4).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U81', order: 121, row: 21, after: '', title: 'At the Café', tasks: 'T07',
    grammar: 'Må jeg få en kop kaffe? (may I have a cup of coffee?); en kaffe, tak; jeg vil gerne bestille; regningen, tak (the bill); værsgo (here you are)',
    words: ['bestille', 'kop', 'sukker', 'kage', 'sandwich', 'regningen', 'tjener', 'mad', 'smager', 'værsgo', 'øl', 'chokolade'] },
  { unit_id: 'U26', order: 121.5, row: 21.5, after: 'row 21', title: 'Excuse Me', help: true, tasks: 'T13',
    grammar: 'Undskyld, kan du hjælpe mig?; undskyld, at jeg forstyrrer; ingen årsag (you are welcome); vær sød at … (please …); det gør ikke noget (no problem)',
    words: ['årsag', 'forstyrrer', 'forstyrre', 'vær', 'naturligvis', 'undskylde'] },
  { unit_id: 'U82', order: 122, row: 22, after: 'row 21', title: 'At the Restaurant', tasks: 'T07;T09',
    grammar: 'Dagens ret (the dish of the day); kylling med ris; kniv og gaffel; et bord til to; kød, fisk eller grøntsager?',
    words: ['kniv', 'gaffel', 'kød', 'kylling', 'ris', 'suppe', 'salat', 'dessert', 'kartofler', 'salt', 'pizza', 'æg', 'smør', 'bordet'] },
  { unit_id: 'U83', order: 123, row: 22, after: 'row 21', title: 'Asking the Way', tasks: 'T08',
    grammar: 'Til højre, til venstre, ligeud: directions; drej til venstre ved hjørnet; gå ad den vej (go that way); hvor langt er der til byen?',
    words: ['højre', 'venstre', 'ligeud', 'hjørnet', 'bro', 'vej', 'vejen', 'ad', 'meter', 'drej', 'fortsæt', 'længere', 'gaden', 'byen', 'retning', 'midt'] },
  { unit_id: 'U27', order: 123.5, row: 22.5, after: 'row 22', title: "I'm Lost", help: true, tasks: 'T13;T08',
    grammar: 'Jeg er faret vild (I am lost); kan du vise mig det på kortet?; herhen (to here), derhen (to there): kom herhen!; hvor er den nærmeste …?',
    words: ['vild', 'faret', 'kortet', 'herhen', 'derhen', 'adressen', 'nærmeste'] },
  { unit_id: 'U84', order: 124, row: 23, after: 'row 22', title: 'Getting Around', tasks: 'T08',
    grammar: 'Med bus, med tog, til fods: how you go; jeg tager bilen; skifte (change): du skifter på næste station; stå af (get off); hente (pick up)',
    words: ['metroen', 'stoppested', 'skifter', 'skifte', 'stiger', 'til fods', 'lufthavnen', 'kørekort', 'parkere', 'bilen', 'hente', 'henter', 'cykler', 'cykle'] },
  { unit_id: 'U85', order: 125, row: 23, after: 'row 22', title: 'My Family', tasks: 'T06',
    grammar: 'Farfar (father\'s father), mormor (mother\'s mother): the word says whose side; min søn, min datter; de er gift; søskende (brothers and sisters)',
    words: ['søn', 'datter', 'sønner', 'døtre', 'farfar', 'mormor', 'onkel', 'tante', 'fætter', 'kusine', 'gift', 'kone', 'søskende', 'brødre', 'søstre', 'bedsteforældre', 'skilt'] },
  { unit_id: 'U86', order: 126, row: 24, after: 'row 23', title: 'At Home', tasks: 'T06',
    grammar: 'Min lejlighed har tre værelser; stuen, soveværelset; på anden sal (on the second floor); leje (to rent): jeg lejer en lejlighed',
    words: ['huset', 'lejlighed', 'stue', 'soveværelse', 'vindue', 'vinduet', 'væg', 'stol', 'skab', 'nøgle', 'nøglen', 'køleskab', 'leje', 'etage'] },
  { unit_id: 'U87', order: 127, row: 24, after: 'row 23', title: 'At Work', tasks: 'T06',
    grammar: 'Jeg er sygeplejerske: no en before a job; jeg arbejder på et kontor; min chef, min kollega; et firma (a company)',
    words: ['kontor', 'kontoret', 'chef', 'kollega', 'kolleger', 'computer', 'firma', 'sygeplejerske', 'kok', 'job', 'arbejdet', 'løn', 'kunde', 'problemer', 'mødet'] },
  { unit_id: 'U28', order: 127.5, row: 24.5, after: 'row 24', title: 'Explaining a Problem', help: true, tasks: 'T13',
    grammar: 'Den virker ikke. Den er i stykker. Der er noget galt med …; jeg har ondt i … (it hurts); ring efter en ambulance!',
    words: ['stykker', 'ulykke', 'ambulance', 'brand', 'farlig', 'farligt', 'ondt', 'galt', 'stjålet', 'skadet', 'ring'] },
  { unit_id: 'U88', order: 128, row: 25, after: 'row 24', title: 'Filling In Forms', tasks: 'T10',
    grammar: 'Navn, adresse, fødselsdato: the words on a form; en blanket (a form); dine oplysninger (your details); gift, ugift, skilt',
    words: ['blanket', 'fødselsdato', 'underskrift', 'køn', 'postnummer', 'statsborgerskab', 'ugift', 'oplysninger', 'alder', 'udfyld'] },
  { unit_id: 'U89', order: 129, row: 25, after: 'row 24', title: 'Messages + Postcards', tasks: 'T11',
    grammar: 'Kære Anna, hej Erik: how a message starts; kærlig hilsen, knus: ways to end; hils … (say hello to …); send mig en sms!',
    words: ['kære', 'hilsen', 'kærlig', 'hilsner', 'kram', 'knus', 'kys', 'brev', 'brevet', 'postkort', 'sms', 'send', 'sende'] },
]

const vocab = [
  { unit_id: 'U91', order: 121.2, row: 21, after: '', title: 'Ideas + Things',
    grammar: 'En grund, en slags, en del: everyday nouns; hvad slags …? (what kind of …?); en del af (a part of); sandheden (the truth); resten (the rest)',
    words: ['grund', 'slags', 'del', 'sag', 'sagen', 'historie', 'resten', 'sandheden', 'stedet', 'steder', 'dagen', 'fred', 'masse', 'ansigt', 'hovedet', 'skat', 'fyr', 'nyheder'] },
  { unit_id: 'U92', order: 123.2, row: 22, after: 'row 21', title: 'Describing Words',
    grammar: 'Hård, hårdt: the -t form after et and after det (det er hårdt); den eneste (the only one); hvert år (every year); til sidst (at last); det er fedt! (that is great)',
    words: ['eneste', 'rigtige', 'hård', 'hårdt', 'fedt', 'fast', 'død', 'døde', 'hvert', 'sidst', 'klar', 'parat', 'normalt', 'vigtig', 'svag'] },
  { unit_id: 'U93', order: 125.2, row: 23, after: 'row 22', title: 'Doing + Getting',
    grammar: 'Holde, klare, redde, vinde: everyday verbs side by side; jeg klarer det (I can manage); det handler om … (it is about …); lade (let): han lader mig køre',
    words: ['holde', 'holder', 'holdt', 'klare', 'klarer', 'lader', 'redde', 'spiller', 'handler', 'slå', 'slår', 'slog', 'vinder', 'åbner', 'fat'] },
  { unit_id: 'U94', order: 127.2, row: 24, after: 'row 23', title: 'Thinking + Saying',
    grammar: 'Jeg aner det ikke (I have no idea); er du enig?; jeg lover det; hvad foregår der? (what is going on?); da (when, for the past): da jeg var lille …',
    words: ['aner', 'forstået', 'lover', 'foregår', 'da', 'enig', 'tvivl', 'bekymret', 'forventer'] },
  { unit_id: 'U95', order: 129.2, row: 25, after: 'row 24', title: 'Commands',
    grammar: 'Bliv her! Pas på! Slap af!: the command is the verb\'s stem, verb first; skynd dig (hurry up); hold op (stop it); læg den der',
    words: ['hold', 'læg', 'slip', 'løb', 'pas', 'bliv', 'tænk', 'slap', 'skynd', 'stå', 'spis', 'drik'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Prices in kroner (femogtres kroner), times as in Part 3; Danish phone numbers are eight digits said in pairs;
// floors as Danes say them (anden sal).
const listen = [
  ['N301', 'U81', 'price', 'En kop kaffe koster tredive kroner.', '30'], ['N302', 'U81', 'price', 'Det bliver femogtres kroner.', '65'],
  ['N303', 'U82', 'price', 'Dagens ret koster hundrede og tyve kroner.', '120'], ['N304', 'U82', 'price', 'Regningen er på to hundrede og fyrre kroner.', '240'],
  ['N305', 'U83', 'number', 'Apoteket ligger hundrede meter længere fremme.', '100'], ['N306', 'U83', 'number', 'Museet ligger tre hundrede meter herfra.', '300'],
  ['N307', 'U84', 'number', 'Tag bus nummer fire.', '4'], ['N308', 'U84', 'time', 'Toget kommer kvart over syv.', '7:15'],
  ['N309', 'U86', 'number', 'Jeg bor på anden sal, i lejlighed tolv.', '12'], ['N310', 'U87', 'time', 'Mødet er klokken halv elleve.', '10:30'],
  ['N311', 'U88', 'phone', 'Mit nummer er tolv, fireogtredive, seksoghalvtreds, otteoghalvfjerds.', '12 34 56 78'], ['N312', 'U88', 'date', 'Jeg er født den tolvte marts.', '12/3'],
]
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const texts = [
  text('R301', 'U82', 'menu', 'Dagens ret', ['Suppe, kylling med ris og salat', 'Dessert: is', '125 kr.'],
    [q('How much is the dish of the day?', ['125 kroner', '25 kroner', '150 kroner']), q('What is there for dessert?', ['Ice cream', 'Cake', 'Fruit'])]),
  text('R302', 'U82', 'menu', 'Café Hjørnet', ['Kaffe: 30 kr.', 'Te: 25 kr.', 'Wienerbrød: 35 kr.', 'Sandwich: 60 kr.'],
    [q('How much is a sandwich?', ['60 kroner', '30 kroner', '35 kroner']), q('What costs 25 kroner?', ['A tea', 'A coffee', 'A Danish pastry'])]),
  text('R303', 'U82', 'notice', 'Restaurant Fisken', ['Fisk og kød', 'Åbent tirsdag til søndag', 'Mandag: lukket'],
    [q('When is the restaurant closed?', ['On Mondays', 'On Sundays', 'On Tuesdays']), q('What does the restaurant serve?', ['Fish and meat', 'Pizza', 'Only salads'])]),
  text('R304', 'U83', 'message', 'En sms fra Anna', ['Mit hus ligger tæt på stationen.', 'Gå ligeud til torvet.', 'Min gade er den anden til højre.'],
    [q('Where is Anna\'s house?', ['Near the station', 'Near the school', 'In the city centre']), q('Which street is hers?', ['The second on the right', 'The first on the left', 'The second on the left'])]),
  text('R305', 'U83', 'sign', 'I byen', ['Museum: 200 m til venstre', 'Kirke: ligeud', 'Station: til højre'],
    [q('Where is the museum?', ['200 metres on the left', '200 metres on the right', 'Straight on']), q('Where is the station?', ['On the right', 'On the left', 'Straight on'])]),
  text('R306', 'U83', 'notice', 'Hotellet', ['Hotellet ligger for enden af gaden.', 'Fem minutter til fods til centrum', 'Bussen stopper foran hotellet'],
    [q('How far is the hotel from the centre?', ['Five minutes on foot', 'Five minutes by car', 'Half an hour on foot']), q('Where is the bus stop?', ['In front of the hotel', 'Behind the hotel', 'At the station'])]),
  text('R307', 'U86', 'notice', 'Lejlighed til leje', ['Lejlighed i centrum', 'To soveværelser, stue, køkken og badeværelse', 'Med altan', '9.000 kr. om måneden'],
    [q('How many bedrooms does the flat have?', ['Two', 'Three', 'One']), q('What else does it have?', ['A balcony', 'A garden', 'A garage'])]),
  text('R308', 'U86', 'message', 'En sms fra Maria', ['Min nye lejlighed er lille.', 'Den har et soveværelse, en stue og et køkken.', 'Der er ingen altan.'],
    [q('What is Maria\'s new flat like?', ['Small', 'Big', 'Old']), q('What doesn\'t it have?', ['A balcony', 'A kitchen', 'A bedroom'])]),
  text('R309', 'U86', 'notice', 'Værelse til en studerende', ['Værelse til leje for en studerende', 'Med seng, bord og stol', 'Tæt på universitetet'],
    [q('Who is the room for?', ['A student', 'A family', 'A tourist']), q('What is in the room?', ['A bed, a table and a chair', 'A sofa and a lamp', 'A fridge'])]),
  text('R310', 'U87', 'notice', 'Ledige job', ['Restaurant søger en kok', 'Tirsdag til lørdag, 17.00 til 23.00', 'Ring 12 34 56 78'],
    [q('What job is it?', ['A cook', 'A waiter', 'A driver']), q('Which days?', ['Tuesday to Saturday', 'Monday to Friday', 'Every day'])]),
  text('R311', 'U87', 'message', 'Mit job', ['Jeg er sygeplejerske og arbejder på et sygehus.', 'Jeg begynder klokken syv om morgenen.', 'Min chef er meget sød.'],
    [q('Where does she work?', ['In a hospital', 'In a school', 'In a shop']), q('When does she start?', ['At seven in the morning', 'At seven in the evening', 'At nine'])]),
  text('R312', 'U87', 'notice', 'Firmaet', ['Firma søger en chauffør', 'Kørekort er et krav', 'Mandag til fredag'],
    [q('Who is the company looking for?', ['A driver', 'A secretary', 'A teacher']), q('What do you need?', ['A driving licence', 'A university degree', 'A car'])]),
  text('R313', 'U89', 'message', 'Et postkort fra Anna', ['Kære Erik!', 'Jeg er ved havet med min familie. Det er varmt, og havet er dejligt.', 'Kærlig hilsen, Anna'],
    [q('Where is Anna?', ['At the seaside', 'In the mountains', 'In the city']), q('What is the weather like?', ['Warm', 'Cold', 'Rainy'])]),
  text('R314', 'U89', 'message', 'En sms fra Tom', ['Hej Maria!', 'På lørdag har jeg fødselsdag. Kommer du til min fest?', 'Festen er hjemme hos mig klokken otte.', 'Tom'],
    [q('Why is Tom having a party?', ['It\'s his birthday', 'He has a new job', 'It\'s Christmas']), q('Where is the party?', ['At his home', 'At a restaurant', 'In the park'])]),
  text('R315', 'U89', 'message', 'En seddel', ['Anna!', 'Jeg er ikke hjemme. Jeg er tilbage klokken seks.', 'Maden står i køleskabet.', 'Erik'],
    [q('When is Erik back?', ['At six', 'At eight', 'At five']), q('Where is the food?', ['In the fridge', 'At a restaurant', 'In the oven'])]),
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F301', unit_id: 'U88', card: 'Jeg hedder Anna Jensen. Jeg er dansk. Jeg er født den 10. april i Odense. Jeg er gift. Jeg bor på Vestergade 12 i Aarhus.',
      fields: [{ key: 'name', label: 'Navn', rule: 'text', answer: 'Anna Jensen' }, { key: 'nat', label: 'Statsborgerskab', rule: 'text', answer: 'dansk', also: ['Dansk', 'Danmark'] },
        { key: 'born', label: 'Fødselsdato', rule: 'text', answer: '10/4', also: ['10. april', '10 april', '10.4', '10-4', '10/04', '10. April'] }, { key: 'place', label: 'Fødested', rule: 'text', answer: 'Odense' },
        { key: 'civil', label: 'Civilstand', rule: 'text', answer: 'gift', also: ['Gift'] }, { key: 'town', label: 'By', rule: 'text', answer: 'Aarhus', also: ['Århus'] }] },
    { id: 'F302', unit_id: 'U87', card: 'Jeg hedder Erik Larsen. Jeg er tredive år. Jeg er sygeplejerske og arbejder på et sygehus i Aalborg. Jeg er ikke gift.',
      fields: [{ key: 'name', label: 'Fornavn', rule: 'text', answer: 'Erik' }, { key: 'last', label: 'Efternavn', rule: 'text', answer: 'Larsen' }, { key: 'age', label: 'Alder', rule: 'number', answer: '30' },
        { key: 'job', label: 'Stilling', rule: 'text', answer: 'sygeplejerske', also: ['Sygeplejerske'] }, { key: 'civil', label: 'Civilstand', rule: 'text', answer: 'ugift', also: ['ikke gift', 'Ugift', 'single'] }] },
    { id: 'F303', unit_id: 'U81', card: 'På caféen: Tom bestiller en kaffe og en kage. Maria bestiller en kop te. De betaler halvfems kroner.',
      fields: [{ key: 'tom', label: 'Tom', rule: 'text', answer: 'en kaffe og en kage', also: ['kaffe og kage', 'kaffe, kage', 'en kaffe, en kage', 'kaffe og en kage'] },
        { key: 'maria', label: 'Maria', rule: 'text', answer: 'en kop te', also: ['te', 'en te', 'kop te'] }, { key: 'total', label: 'I alt (kroner)', rule: 'number', answer: '90' }] },
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
  U91: [['reading', 'Reading', 'I can recognize everyday words for ideas and things: a reason, a kind, a part, the truth.']],
  U26: [['speaking', 'Spoken interaction', 'I can get someone\'s attention politely and ask for help.']],
  U82: [['reading', 'Reading', 'I can understand a simple menu and its prices.'], ['speaking', 'Spoken interaction', 'I can order a meal in a restaurant.']],
  U83: [['listening', 'Listening', 'I can follow simple directions: left, right, straight on.'], ['speaking', 'Spoken interaction', 'I can ask the way to a place.']],
  U92: [['reading', 'Reading', 'I can recognize common describing words: hard, only, every, ready, important.']],
  U27: [['speaking', 'Spoken interaction', 'I can say I am lost and ask someone to show me the way.']],
  U84: [['speaking', 'Spoken production', 'I can say how I get around: by bus, by metro, on foot.']],
  U85: [['speaking', 'Spoken production', 'I can talk about my family in simple words.']],
  U93: [['speaking', 'Spoken production', 'I can say what someone does with everyday verbs: hold, manage, win, open.']],
  U86: [['reading', 'Reading', 'I can understand a short ad for a flat or a room.'], ['speaking', 'Spoken production', 'I can describe my home: its rooms and its things.']],
  U87: [['speaking', 'Spoken production', 'I can say what I do for work and where.']],
  U94: [['speaking', 'Spoken interaction', 'I can say whether I agree, promise something and say I have no idea.']],
  U28: [['speaking', 'Spoken interaction', 'I can say that something doesn\'t work or that something is wrong.']],
  U88: [['writing', 'Writing', 'I can fill in a form with my personal details.']],
  U89: [['writing', 'Writing', 'I can write a short postcard or message.'], ['reading', 'Reading', 'I can understand a short personal message or postcard.']],
  U95: [['listening', 'Listening', 'I can understand short commands: stay here, look out, hurry up.']],
}

// Turned off in the gather (ids kept): Wiktionary has no Danish entry for them, so no checked sense or gloss (the
// circle keeps the words around them; ordering, forms and transport go on without them).
const NO_ENTRY = 'turned off in the gather: Wiktionary has no Danish entry, so no checked gloss'
const off = { salat: NO_ENTRY, metroen: NO_ENTRY, stoppested: NO_ENTRY, underskrift: NO_ENTRY, postnummer: NO_ENTRY, udfyld: NO_ENTRY,
  fat: `${NO_ENTRY} (få fat i, get hold of, has no entry either)` }
const late = []

export default {
  part: 4, off, late, wordBase: 2001, vocabBase: 2201, cdBase: 501,
  slots: [{ slot_id: 'C07', part: 4, after_row: 22 }, { slot_id: 'C08', part: 4, after_row: 24 }],
  situation, vocab, items, canDo,
}
