// Swedish A1 · Part 4, Out and About (Dan, 2026-11-21; Builder 2, branch content/sv-a1), the last part, in the format of
// Dutch, Italian and Portuguese Part 4: the café and the restaurant (T07), asking the way and getting around (T08),
// family, home and work (T06), forms (T10) and messages (T11); the help thread ends (T13). Standard Swedish, du
// throughout (ni only as the plural, never polite); prices in kronor; Swedish forms ask for personnummer. The course's
// frequency list (content-sv/a1-list.json, the Swedish Kelly list) is the target: about 90% of its 600 most frequent by
// the end of this part. The situation circles carry the words that fit them (mat, son, väg, håll, sida, företag,
// uppgift, ort, ring), and the five vocabulary circles the rest, as Italian's Part 4 did: Ideas + Things, Describing
// Words, Society + News, Thinking + Saying, Doing + Getting. Verbs come as their present (one form for every person),
// with the infinitive where a modal needs it; word-senses.json gives each present its infinitive as lemma. No past
// tense yet (var as was stays cut). Used by scripts/add-part.mjs (COURSE=sv PART=4).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U81', order: 121, row: 21, after: '', title: 'At the Café', tasks: 'T07',
    grammar: 'Jag skulle vilja ha en kaffe (I would like a coffee); kan jag få en kopp te?; notan, tack (the bill); fika: coffee and something sweet',
    words: ['beställa', 'beställer', 'kopp', 'socker', 'kaka', 'bulle', 'smörgås', 'glass', 'notan', 'servitör', 'meny', 'fika', 'skulle', 'mat', 'smakar'] },
  { unit_id: 'U26', order: 121.5, row: 21.5, after: 'row 21', title: 'Excuse Me', help: true, tasks: 'T13',
    grammar: 'Ursäkta, kan du hjälpa mig?; förlåt att jag stör; ingen fara (no problem); ingen orsak (you are welcome)',
    words: ['snälla', 'ingenting', 'fara', 'orsak', 'visst', 'ursäkt', 'stör', 'störa'] },
  { unit_id: 'U82', order: 122, row: 22, after: 'row 21', title: 'At the Restaurant', tasks: 'T07;T09',
    grammar: 'Förrätt, varmrätt, efterrätt: the courses; en tallrik soppa; gaffel, kniv och sked; smaklig måltid! (enjoy your meal)',
    words: ['tallrik', 'gaffel', 'kniv', 'sked', 'kött', 'kyckling', 'ris', 'soppa', 'sallad', 'efterrätt', 'potatis', 'salt', 'peppar', 'smaklig', 'måltid', 'boka', 'pizza'] },
  { unit_id: 'U83', order: 123, row: 22, after: 'row 21', title: 'Asking the Way', tasks: 'T08',
    grammar: 'Till höger, till vänster, rakt fram: directions; sväng vänster vid hörnet; på samma sida som banken; åt vilket håll? (which way?)',
    words: ['höger', 'vänster', 'rakt', 'hörnet', 'korsning', 'trafikljus', 'bro', 'väg', 'vägen', 'håll', 'hållet', 'sida', 'sidan', 'meter', 'sväng', 'svänger', 'fortsätt', 'längre', 'gatan'] },
  { unit_id: 'U27', order: 123.5, row: 22.5, after: 'row 22', title: "I'm Lost", help: true, tasks: 'T13;T08',
    grammar: 'Jag är vilse (I am lost); kan du visa mig på kartan?; hit (to here), dit (to there): kom hit!',
    words: ['vilse', 'karta', 'kartan', 'hit', 'dit', 'adressen', 'borde'] },
  { unit_id: 'U84', order: 124, row: 23, after: 'row 22', title: 'Getting Around', tasks: 'T08',
    grammar: 'Med buss, med tunnelbanan, till fots: how you go; jag tar spårvagnen; byta (change): du byter vid nästa hållplats; stiga av (get off)',
    words: ['spårvagn', 'tunnelbana', 'tunnelbanan', 'hållplats', 'byter', 'byta', 'stiger', 'till fots', 'taxi', 'flygplats', 'trafik', 'kö', 'körkort', 'parkera', 'cykla'] },
  { unit_id: 'U85', order: 125, row: 23, after: 'row 22', title: 'My Family', tasks: 'T06',
    grammar: 'Farmor (father\'s mother), mormor (mother\'s mother): the word says whose side; min son, min dotter; de är gifta; syskon (brothers and sisters)',
    words: ['son', 'dotter', 'söner', 'döttrar', 'farfar', 'farmor', 'morfar', 'mormor', 'farbror', 'morbror', 'faster', 'moster', 'kusin', 'gift', 'fru', 'syskon', 'bröder', 'systrar', 'barnbarn', 'släkt', 'egen'] },
  { unit_id: 'U86', order: 126, row: 24, after: 'row 23', title: 'At Home', tasks: 'T06',
    grammar: 'Min lägenhet har tre rum; vardagsrummet, sovrummet; på andra våningen; hyra (to rent): jag hyr en lägenhet',
    words: ['vardagsrum', 'sovrum', 'fönster', 'vägg', 'stol', 'skåp', 'trappa', 'nyckel', 'våning', 'hyra', 'hyr', 'lampa', 'golv', 'tak', 'lägenhet', 'soffa', 'kylskåp', 'balkong'] },
  { unit_id: 'U87', order: 127, row: 24, after: 'row 23', title: 'At Work', tasks: 'T06',
    grammar: 'Jag är sjuksköterska: no en before a job; jag jobbar på ett kontor; min chef, min kollega; ett företag (a company)',
    words: ['kontor', 'chef', 'kollega', 'dator', 'företag', 'sjuksköterska', 'kock', 'bonde', 'lön', 'yrke', 'kund', 'uppgift', 'projekt', 'grupp', 'tjänst'] },
  { unit_id: 'U28', order: 127.5, row: 24.5, after: 'row 24', title: 'Explaining a Problem', help: true, tasks: 'T13',
    grammar: 'Den fungerar inte. Den är trasig. Det är något fel på …; jag har ont i … (it hurts); ring en ambulans!',
    words: ['trasig', 'sönder', 'olycka', 'ambulans', 'brand', 'farlig', 'ont', 'stulen', 'skadad'] },
  { unit_id: 'U88', order: 128, row: 25, after: 'row 24', title: 'Filling In Forms', tasks: 'T10',
    grammar: 'Namn, personnummer, adress, ort: the words on a form; fyll i blanketten; skriv under här (sign here)',
    words: ['blankett', 'blanketten', 'födelsedatum', 'underskrift', 'kön', 'ort', 'postnummer', 'personnummer', 'medborgarskap', 'ogift', 'civilstånd', 'mejl', 'skriv', 'uppgifter'] },
  { unit_id: 'U89', order: 129, row: 25, after: 'row 24', title: 'Messages + Postcards', tasks: 'T11',
    grammar: 'Kära Anna, hej Erik: how a message starts; hälsningar, kram: ways to end; hälsa till … (say hello to …); ring mig!',
    words: ['kära', 'hälsningar', 'hälsar', 'hälsa', 'kram', 'kramar', 'brev', 'meddelande', 'sms', 'vykort', 'ring', 'skicka'] },
]

const vocab = [
  { unit_id: 'U91', order: 121.2, row: 21, after: '', title: 'Ideas + Things',
    grammar: 'Ett fall, en typ, ett mål: everyday abstract nouns; i så fall (in that case); på grund av (because of) waits for Thinking + Saying',
    words: ['fall', 'form', 'typ', 'system', 'resultat', 'situation', 'skillnad', 'faktum', 'mål', 'grund', 'behov', 'anledning', 'skäl', 'syfte', 'princip', 'punkt', 'nivå', 'mängd', 'antal', 'procent', 'betydelse', 'ansvar', 'krav', 'stöd', 'förändring', 'ändring', 'kunskap', 'handling', 'kropp', 'jord', 'gräns', 'ämne', 'område', 'massa', 'gram'] },
  { unit_id: 'U92', order: 123.2, row: 22, after: 'row 21', title: 'Describing Words',
    grammar: 'Hög, låg: the -t form after ett (ett högt hus) and -a in the plural (höga hus); vissa (some), flest (most)',
    words: ['hög', 'höga', 'låg', 'viss', 'vissa', 'gemensam', 'allmän', 'särskild', 'enskild', 'personlig', 'övrig', 'övriga', 'liknande', 'riktig', 'social', 'mänsklig', 'offentlig', 'internationell', 'nationell', 'europeisk', 'amerikansk', 'ekonomisk', 'politisk', 'kristen', 'flest', 'varenda', 'ena'] },
  { unit_id: 'U93', order: 125.2, row: 23, after: 'row 22', title: 'Society + News',
    grammar: 'Ett samhälle, en stat, ett parti: the words of the news; vi röstar i valet; jag är medlem i …',
    words: ['samhälle', 'stat', 'politik', 'politiker', 'parti', 'val', 'rösta', 'röstar', 'demokrati', 'debatt', 'diskussion', 'diskuterar', 'ekonomi', 'organisation', 'medlem', 'samarbete', 'utbildning', 'kultur', 'artikel', 'rapport', 'internet', 'länk', 'kommentar', 'makt', 'rättighet', 'utveckling', 'folk'] },
  { unit_id: 'U94', order: 127.2, row: 24, after: 'row 23', title: 'Thinking + Saying',
    grammar: 'Jag anser att …; det gäller alla; på grund av, trots, dock: linking words; du bör (you should)',
    words: ['anser', 'inser', 'finner', 'nämner', 'beskriver', 'kallar', 'gäller', 'bör', 'dock', 'däremot', 'liksom', 'nämligen', 'trots', 'trots att', 'även om', 'så att', 'genom att', 'efter att', 'på grund av', 'i alla fall', 'framför allt', 'bland annat', 'när det gäller', 'dels', 'såväl', 'vidare', 'igenom', 'inom', 'inför', 'per', 'dess'] },
  { unit_id: 'U95', order: 129.2, row: 25, after: 'row 24', title: 'Doing + Getting',
    grammar: 'Äga, skapa, öka, växa: everyday verbs side by side; det sker (it happens); få tag på (get hold of)',
    words: ['äger', 'skapar', 'ökar', 'minskar', 'växer', 'leder', 'driver', 'föra', 'kräver', 'tvingar', 'påverkar', 'utvecklar', 'deltar', 'bidrar', 'innehåller', 'bryter', 'faller', 'rör', 'vänder', 'sker', 'övar', 'tag'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Prices in kronor (tjugofem kronor), times as in Part 3; Swedish phone numbers start 07.
const listen = [
  ['N301', 'U81', 'price', 'En kaffe kostar trettio kronor.', '30'], ['N302', 'U81', 'price', 'Det blir sextiofem kronor.', '65'],
  ['N303', 'U82', 'price', 'Dagens lunch kostar hundratjugo kronor.', '120'], ['N304', 'U82', 'price', 'Notan är tvåhundrafyrtio kronor.', '240'],
  ['N305', 'U83', 'number', 'Apoteket ligger hundra meter längre fram.', '100'], ['N306', 'U83', 'number', 'Museet ligger trehundra meter härifrån.', '300'],
  ['N307', 'U84', 'number', 'Ta buss fyra.', '4'], ['N308', 'U84', 'time', 'Spårvagnen kommer kvart över sju.', '7:15'],
  ['N309', 'U86', 'number', 'Jag bor på andra våningen, i lägenhet tolv.', '12'], ['N310', 'U87', 'time', 'Mötet är klockan halv elva.', '10:30'],
  ['N311', 'U88', 'phone', 'Mitt nummer är noll sju noll, tolv, trettiofyra, femtiosex.', '070 12 34 56'], ['N312', 'U88', 'date', 'Jag är född den tolfte mars.', '12/3'],
]
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const texts = [
  text('R301', 'U82', 'menu', 'Dagens lunch', ['Soppa, kyckling med ris och sallad', 'Efterrätt: glass', '125 kr'],
    [q('How much is the lunch of the day?', ['125 kronor', '25 kronor', '150 kronor']), q('What is there for dessert?', ['Ice cream', 'Cake', 'Fruit'])]),
  text('R302', 'U82', 'menu', 'Kafé Hörnet', ['Kaffe: 30 kr', 'Te: 25 kr', 'Kanelbulle: 35 kr', 'Smörgås: 60 kr'],
    [q('How much is a sandwich?', ['60 kronor', '30 kronor', '35 kronor']), q('What costs 25 kronor?', ['A tea', 'A coffee', 'A cinnamon bun'])]),
  text('R303', 'U82', 'notice', 'Restaurang Fisken', ['Fisk och kött', 'Öppet tisdag till söndag', 'Måndag: stängt'],
    [q('When is the restaurant closed?', ['On Mondays', 'On Sundays', 'On Tuesdays']), q('What does the restaurant serve?', ['Fish and meat', 'Pizza', 'Only salads'])]),
  text('R304', 'U83', 'message', 'Ett sms från Anna', ['Mitt hus ligger nära stationen.', 'Gå rakt fram till torget.', 'Min gata är den andra till höger.'],
    [q('Where is Anna\'s house?', ['Near the station', 'Near the school', 'In the city centre']), q('Which street is hers?', ['The second on the right', 'The first on the left', 'The second on the left'])]),
  text('R305', 'U83', 'sign', 'I stan', ['Museum: 200 m till vänster', 'Kyrka: rakt fram', 'Station: till höger'],
    [q('Where is the museum?', ['200 metres on the left', '200 metres on the right', 'Straight on']), q('Where is the station?', ['On the right', 'On the left', 'Straight on'])]),
  text('R306', 'U83', 'notice', 'Hotellet', ['Hotellet ligger i slutet av gatan.', 'Fem minuter till fots till centrum', 'Busshållplats framför hotellet'],
    [q('How far is the hotel from the centre?', ['Five minutes on foot', 'Five minutes by car', 'Half an hour on foot']), q('Where is the bus stop?', ['In front of the hotel', 'Behind the hotel', 'At the station'])]),
  text('R307', 'U86', 'notice', 'Lägenhet att hyra', ['Lägenhet i centrum', 'Två sovrum, vardagsrum, kök och badrum', 'Med balkong', '9 000 kr i månaden'],
    [q('How many bedrooms does the flat have?', ['Two', 'Three', 'One']), q('What else does it have?', ['A balcony', 'A garden', 'A garage'])]),
  text('R308', 'U86', 'message', 'Ett sms från Maria', ['Min nya lägenhet är liten.', 'Den har ett sovrum, ett vardagsrum och ett kök.', 'Det finns ingen balkong.'],
    [q('What is Maria\'s new flat like?', ['Small', 'Big', 'Old']), q('What doesn\'t it have?', ['A balcony', 'A kitchen', 'A bedroom'])]),
  text('R309', 'U86', 'notice', 'Rum för en student', ['Rum att hyra för en student', 'Med säng, bord och stol', 'Nära universitetet'],
    [q('Who is the room for?', ['A student', 'A family', 'A tourist']), q('What is in the room?', ['A bed, a table and a chair', 'A sofa and a lamp', 'A fridge'])]),
  text('R310', 'U87', 'notice', 'Lediga jobb', ['Restaurang söker en kock', 'Tisdag till lördag, 17.00 till 23.00', 'Ring 070 123 45 67'],
    [q('What job is it?', ['A cook', 'A waiter', 'A driver']), q('Which days?', ['Tuesday to Saturday', 'Monday to Friday', 'Every day'])]),
  text('R311', 'U87', 'message', 'Mitt jobb', ['Jag är sjuksköterska och jobbar på ett sjukhus.', 'Jag börjar klockan sju på morgonen.', 'Min chef är mycket snäll.'],
    [q('Where does she work?', ['In a hospital', 'In a school', 'In a shop']), q('When does she start?', ['At seven in the morning', 'At seven in the evening', 'At nine'])]),
  text('R312', 'U87', 'notice', 'Företaget', ['Företag söker en chaufför', 'Körkort krävs', 'Måndag till fredag'],
    [q('Who is the company looking for?', ['A driver', 'A secretary', 'A teacher']), q('What do you need?', ['A driving licence', 'A university degree', 'A car'])]),
  text('R313', 'U89', 'message', 'Ett vykort från Anna', ['Kära Erik!', 'Jag är vid havet med min familj. Det är varmt och havet är underbart.', 'Kram, Anna'],
    [q('Where is Anna?', ['At the seaside', 'In the mountains', 'In the city']), q('What is the weather like?', ['Warm', 'Cold', 'Rainy'])]),
  text('R314', 'U89', 'message', 'Ett sms från Tom', ['Hej Maria!', 'På lördag fyller jag år. Kommer du på min fest?', 'Festen är hemma hos mig, klockan åtta.', 'Tom'],
    [q('Why is Tom having a party?', ['It\'s his birthday', 'He has a new job', 'It\'s Christmas']), q('Where is the party?', ['At his home', 'At a restaurant', 'In the park'])]),
  text('R315', 'U89', 'message', 'En lapp', ['Anna!', 'Jag är inte hemma. Jag är tillbaka klockan sex.', 'Maten står i kylskåpet.', 'Erik'],
    [q('When is Erik back?', ['At six', 'At eight', 'At five']), q('Where is the food?', ['In the fridge', 'At a restaurant', 'In the oven'])]),
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F301', unit_id: 'U88', card: 'Jag heter Anna Lindqvist. Jag är svensk. Jag är född den 10 april i Uppsala. Jag är gift. Jag bor på Storgatan 12 i Stockholm.',
      fields: [{ key: 'name', label: 'Namn', rule: 'text', answer: 'Anna Lindqvist' }, { key: 'nat', label: 'Medborgarskap', rule: 'text', answer: 'svensk', also: ['Svensk', 'Sverige', 'svenskt', 'Svenskt'] },
        { key: 'born', label: 'Födelsedatum', rule: 'text', answer: '10/4', also: ['10 april', '10-4', '04-10', '10.4', '10 April'] }, { key: 'place', label: 'Födelseort', rule: 'text', answer: 'Uppsala' },
        { key: 'civil', label: 'Civilstånd', rule: 'text', answer: 'gift', also: ['Gift'] }, { key: 'town', label: 'Ort', rule: 'text', answer: 'Stockholm' }] },
    { id: 'F302', unit_id: 'U87', card: 'Jag heter Erik Berg. Jag är trettio år. Jag är sjuksköterska och jobbar på ett sjukhus i Göteborg. Jag är inte gift.',
      fields: [{ key: 'name', label: 'Förnamn', rule: 'text', answer: 'Erik' }, { key: 'last', label: 'Efternamn', rule: 'text', answer: 'Berg' }, { key: 'age', label: 'Ålder', rule: 'number', answer: '30' },
        { key: 'job', label: 'Yrke', rule: 'text', answer: 'sjuksköterska', also: ['Sjuksköterska'] }, { key: 'civil', label: 'Civilstånd', rule: 'text', answer: 'ogift', also: ['inte gift', 'Ogift', 'singel'] }] },
    { id: 'F303', unit_id: 'U81', card: 'På kaféet: Tom beställer en kaffe och en bulle. Maria beställer en kopp te. De betalar nittio kronor.',
      fields: [{ key: 'tom', label: 'Tom', rule: 'text', answer: 'en kaffe och en bulle', also: ['kaffe och bulle', 'kaffe, bulle', 'en kaffe, en bulle', 'kaffe och en bulle'] },
        { key: 'maria', label: 'Maria', rule: 'text', answer: 'en kopp te', also: ['te', 'en te', 'kopp te'] }, { key: 'total', label: 'Totalt (kronor)', rule: 'number', answer: '90' }] },
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
  U26: [['speaking', 'Spoken interaction', 'I can get someone\'s attention politely and ask for help.']],
  U82: [['reading', 'Reading', 'I can understand a simple menu and its prices.'], ['speaking', 'Spoken interaction', 'I can order a meal in a restaurant.']],
  U83: [['listening', 'Listening', 'I can follow simple directions: left, right, straight on.'], ['speaking', 'Spoken interaction', 'I can ask the way to a place.']],
  U27: [['speaking', 'Spoken interaction', 'I can say I am lost and ask someone to show me the way.']],
  U84: [['speaking', 'Spoken production', 'I can say how I get around: by bus, by tram, on foot.']],
  U85: [['speaking', 'Spoken production', 'I can talk about my family in simple words.']],
  U86: [['reading', 'Reading', 'I can understand a short ad for a flat or a room.'], ['speaking', 'Spoken production', 'I can describe my home: its rooms and its things.']],
  U87: [['speaking', 'Spoken production', 'I can say what I do for work and where.']],
  U28: [['speaking', 'Spoken interaction', 'I can say that something doesn\'t work or that something is wrong.']],
  U88: [['writing', 'Writing', 'I can fill in a form with my personal details.']],
  U89: [['writing', 'Writing', 'I can write a short postcard or message.'], ['reading', 'Reading', 'I can understand a short personal message or postcard.']],
  U91: [['reading', 'Reading', 'I can recognize everyday words for ideas and things: a case, a goal, a reason, a result.']],
  U92: [['reading', 'Reading', 'I can recognize common describing words: high, low, common, personal, public.']],
  U93: [['reading', 'Reading', 'I can recognize the words of a simple news item: politics, parties, elections, the economy.']],
  U94: [['speaking', 'Spoken interaction', 'I can say what I think of something and give a simple reason.']],
  U95: [['speaking', 'Spoken production', 'I can say what grows, changes or happens with everyday verbs.']],
}

// Turned off in the gather (ids kept): Wiktionary has no Swedish entry for them, so no checked sense or gloss.
const NO_ENTRY = "turned off in the gather: Wiktionary has no Swedish entry, so no checked gloss"
// And after the pull: forms Tatoeba has no lines for and the circle does not need (the base word or a near twin
// carries the meaning: sida, adress, blankett, hyr, vissa, övriga), so drafts stay for the words that matter.
const TWIN = (w) => `turned off after the pull: no Tatoeba lines; ${w} carries it`
const off = { postnummer: NO_ENTRY, 'trots att': NO_ENTRY, 'även om': NO_ENTRY, 'efter att': NO_ENTRY, 'när det gäller': NO_ENTRY,
  servitör: 'turned off after the pull: no Tatoeba lines; ordering goes through the counter (kan jag få …)', korsning: TWIN('hörnet'), trafikljus: TWIN('hörnet'),
  sidan: TWIN('sida'), adressen: TWIN('adress (Part 2)'), tunnelbana: TWIN('tunnelbanan'), blanketten: TWIN('blankett'), hyra: TWIN('hyr'),
  viss: TWIN('vissa'), övrig: TWIN('övriga'), cykla: TWIN('cyklar (Part 3)'),
  // Not list words and no Tatoeba lines: At Home and At Work keep the words their lines need.
  skåp: 'turned off after the pull: no Tatoeba lines, not a list word', lampa: 'turned off after the pull: no Tatoeba lines, not a list word',
  kylskåp: 'turned off after the pull: no Tatoeba lines, not a list word', balkong: 'turned off after the pull: no Tatoeba lines, not a list word',
  bonde: 'turned off after the pull: one Tatoeba line, not a list word',
  // List words with no natural line in reach: ena pairs with andra (the other), which the course teaches as second;
  // Wiktionary has massa only as a mass, not en massa (a lot of), so its hint would be wrong.
  ena: 'turned off after the pull: den ena … den andra needs andra as other, taught as second',
  massa: "turned off after the pull: Wiktionary's sense is a mass, not en massa (a lot), so the hint would mislead" }
// Dry-source rule (Builder 1, 2026-11-21): Part 4 stood at 46% drafts, so the vocabulary circles' draft-only words were
// turned off, least frequent Kelly rank first, until the part sat under 38%; their drafts went with them (nine drafts
// that also carried a kept word were rewritten without it). kunskap was skipped: it takes Tatoeba's Kunskap är makt,
// which makt needs.
const DRY = 'turned off under the dry-source rule: only drafted lines in its circle (Part 4 at 46% drafts)'
for (const w of ['innehåller', 'bryter', 'personlig', 'rapport', 'handling', 'kropp', 'framför allt', 'dels', 'övriga', 'ämne', 'faller', 'samarbete', 'deltar', 'gräns', 'igenom', 'ändring', 'punkt', 'enskild', 'nämner', 'jord', 'såväl', 'offentlig', 'per', 'länk', 'mängd', 'nivå', 'nämligen', 'princip', 'kultur', 'gram', 'beskriver', 'liksom', 'särskild', 'amerikansk', 'driver', 'allmän', 'trots', 'ekonomi', 'däremot', 'i alla fall', 'minskar', 'påverkar', 'tvingar', 'grund', 'organisation', 'ansvar']) off[w] = DRY

export default {
  part: 4, off, wordBase: 1601, vocabBase: 1801, cdBase: 501,
  slots: [{ slot_id: 'C07', part: 4, after_row: 22 }, { slot_id: 'C08', part: 4, after_row: 24 }],
  situation, vocab, items, canDo,
}
