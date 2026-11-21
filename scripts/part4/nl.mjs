// Dutch A1 · Part 4, Out and About (Dan, 2026-11-20; Builder 2, branch content/nl-a1), the last part, in the format of
// Italian and Portuguese Part 4: the café and the restaurant (T07), asking the way and getting around (T08), family,
// home and work (T06), forms (T10) and messages (T11); the help thread ends (T13). Standard Dutch as spoken in the
// Netherlands, je and jij; u in requests only where a waiter or an official would use it (as in U41). The course's
// frequency list (content-nl/a1-list.json, 90% of its 600 most frequent by the end of this part) is the target: the
// situation circles carry the words that fit them, and the five vocabulary circles the rest (food and cooking, the
// perfect tense, health, thinking and saying, and the simple past). Left out on purpose: the list's subtitle words
// (mr, mrs, sir, miss, john, jack, the, lk, ie, dr), its oaths and violence (god, verdomme, klootzak, vermoord,
// vermoorden, moord, doden, schiet, wapen, bloed, oorlog) and terms of endearment (schat, lieverd). Read and Answer has
// three texts per circle that has it. Used by scripts/add-part.mjs (COURSE=nl PART=4).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U81', order: 121, row: 21, after: '', title: 'At the Café', tasks: 'T07',
    grammar: 'Mag ik een koffie? Ik wil graag een thee: mogen and willen for ordering; de rekening, alstublieft; een kopje koffie, een glas water',
    words: ['bestel', 'bestellen', 'ober', 'menu', 'kopje', 'kop', 'suiker', 'taart', 'ijs', 'rekening', 'mag', 'mogen', 'drankje', 'gezellig'] },
  { unit_id: 'U26', order: 121.5, row: 21.5, after: 'row 21', title: 'Excuse Me', help: true, tasks: 'T13',
    grammar: 'Pardon, mag ik even langs? Kunt u mij helpen?; het spijt me (I am sorry); geen probleem', words: ['excuseer', 'hulp', 'probleem', 'iemand', 'niemand', 'spijt', 'niets', 'niks'] },
  { unit_id: 'U82', order: 122, row: 22, after: 'row 21', title: 'At the Restaurant', tasks: 'T07;T09',
    grammar: 'Het voorgerecht, het hoofdgerecht, het toetje: the courses; een bord soep; de vork, het mes, de lepel; eet smakelijk!',
    words: ['bord', 'vork', 'mes', 'lepel', 'vlees', 'kip', 'rijst', 'soep', 'salade', 'toetje', 'pasta', 'friet', 'zout', 'peper', 'smakelijk'] },
  { unit_id: 'U83', order: 123, row: 22, after: 'row 21', title: 'Asking the Way', tasks: 'T08',
    grammar: 'Rechts, links, rechtdoor: directions; ga hier linksaf (turn left here); bij het stoplicht, op de hoek; de eerste straat rechts',
    words: ['rechts', 'links', 'rechtdoor', 'linksaf', 'rechtsaf', 'hoek', 'kruispunt', 'stoplicht', 'brug', 'verder', 'kant', 'manier', 'plek', 'af'] },
  { unit_id: 'U27', order: 123.5, row: 22.5, after: 'row 22', title: "I'm Lost", help: true, tasks: 'T13;T08',
    grammar: 'Ik ben de weg kwijt (I am lost); kunt u het me op de kaart laten zien?; is het hier?', words: ['kwijt', 'verdwaald', 'laten', 'kaart', 'plattegrond'] },
  { unit_id: 'U84', order: 124, row: 23, after: 'row 22', title: 'Getting Around', tasks: 'T08',
    grammar: 'Met de bus, met de fiets, lopend: how you go; ik neem de tram; uitstappen, overstappen: stap hier uit',
    words: ['tram', 'metro', 'halte', 'stap', 'overstappen', 'lopend', 'rijbewijs', 'file', 'neemt', 'snelweg', 'heen'] },
  { unit_id: 'U85', order: 125, row: 23, after: 'row 22', title: 'My Family', tasks: 'T06',
    grammar: 'Mijn broer, mijn zus; zij zijn getrouwd; een gezin (parents and children); elkaar (each other); allemaal (all of us)',
    words: ['zoon', 'dochter', 'opa', 'oma', 'oom', 'tante', 'neef', 'nicht', 'getrouwd', 'gezin', 'papa', 'mama', 'pap', 'mam', 'broers', 'zussen', 'elkaar', 'allemaal', 'eigen', 'jongens'] },
  { unit_id: 'U86', order: 126, row: 24, after: 'row 23', title: 'At Home', tasks: 'T06',
    grammar: 'Mijn huis heeft drie kamers; de woonkamer, de slaapkamer; boven, beneden; huren (to rent): de huur',
    words: ['woonkamer', 'slaapkamer', 'raam', 'muur', 'stoel', 'kast', 'trap', 'sleutel', 'verdieping', 'huur', 'huren', 'lamp', 'vloer', 'dak', 'zelf'] },
  { unit_id: 'U87', order: 127, row: 24, after: 'row 23', title: 'At Work', tasks: 'T06',
    grammar: 'Ik ben verpleegkundige: no een before a job; ik werk op een kantoor; mijn baas, mijn collega',
    words: ['baan', 'kantoor', 'baas', 'collega', 'computer', 'bedrijf', 'verpleegkundige', 'politie', 'agent', 'kok', 'boer', 'team', 'zaken', 'beroep', 'druk', 'bezig', 'hard', 'hoeft'] },
  { unit_id: 'U28', order: 127.5, row: 24.5, after: 'row 24', title: 'Explaining a Problem', help: true, tasks: 'T13',
    grammar: 'Het werkt niet. Hij is kapot. Wat is er gebeurd?; bel de politie!', words: ['kapot', 'ongeluk', 'ambulance', 'gebeurd', 'gebeurt', 'gebeuren', 'veilig', 'problemen', 'mis', 'wees', 'orde'] },
  { unit_id: 'U88', order: 128, row: 25, after: 'row 24', title: 'Filling In Forms', tasks: 'T10',
    grammar: 'Naam, geboortedatum, adres, burgerlijke staat: the words on a form; vul hier uw naam in; teken hier',
    words: ['formulier', 'geboortedatum', 'handtekening', 'gescheiden', 'geslacht', 'woonplaats', 'postcode', 'nationaliteit', 'teken', 'invullen', 'mail'] },
  { unit_id: 'U89', order: 129, row: 25, after: 'row 24', title: 'Messages + Postcards', tasks: 'T11',
    grammar: 'Beste Anna, lieve Jan: dear (beste for anyone, lieve for someone close); groetjes, liefs: ways to end; sturen (to send)',
    words: ['beste', 'lieve', 'groeten', 'groetjes', 'liefs', 'brief', 'bericht', 'stuur', 'sturen', 'jou', 'hele', 'geluk', 'best'] },
]

const vocab = [
  { unit_id: 'U91', order: 121.2, row: 21, after: '', title: 'Food + Cooking',
    grammar: 'Een liter melk, honderd gram kaas: no van after a quantity; koken (to cook): ik kook, jij kookt; zoet, zuur, zout',
    words: ['kook', 'kookt', 'koken', 'boter', 'olie', 'gram', 'liter', 'zoet', 'zuur', 'smaak', 'proeven', 'recept', 'groenten', 'dingen', 'zoveel', 'rest'] },
  { unit_id: 'U92', order: 123.2, row: 22, after: 'row 21', title: 'What I Did',
    grammar: 'Ik heb het gedaan: hebben (or zijn for coming and going) + the past participle at the end; ge- … -d or -t (gemaakt), or ge- … -en (gezien); ik ben er geweest',
    words: ['gedaan', 'gezien', 'gezegd', 'gehad', 'gemaakt', 'gehoord', 'gevonden', 'geweest', 'gekomen', 'gegeven', 'gebruikt', 'begrepen', 'verteld', 'vergeten', 'geleden', 'gegeten', 'gekocht', 'gewerkt', 'net', 'eerder', 'steeds'] },
  { unit_id: 'U93', order: 125.2, row: 23, after: 'row 22', title: 'Health',
    grammar: 'Ik heb pijn in mijn rug; ik heb hoofdpijn, ik heb koorts; ik ben verkouden; beterschap! (get well soon)',
    words: ['lichaam', 'gezicht', 'handen', 'pijn', 'arts', 'medicijn', 'koorts', 'hoofdpijn', 'tand', 'tanden', 'rug', 'gezond', 'rust', 'verkouden', 'zorg', 'zorgen', 'zich'] },
  { unit_id: 'U94', order: 127.2, row: 24, after: 'row 23', title: 'Thinking + Saying',
    grammar: 'Hij vertelt een verhaal; dat klinkt goed; het lijkt me leuk; want (because) keeps the word order, omdat sends the verb to the end',
    words: ['vertel', 'vertellen', 'klinkt', 'lijkt', 'waarheid', 'reden', 'nieuws', 'zoiets', 'eigenlijk', 'gewoon', 'inderdaad', 'want', 'daarom', 'volgens', 'hetzelfde', 'dezelfde', 'andere', 'anders', 'soort', 'zoals', 'echte', 'zelfs', 'gelijk', 'kans', 'ander', 'anderen', 'enige', 'veranderen', 'geval', 'helemaal', 'zodat', 'alsof'] },
  { unit_id: 'U95', order: 129.2, row: 25, after: 'row 24', title: 'Long Ago',
    grammar: 'Ik was, wij waren; ik had, wij hadden: the simple past of zijn and hebben; ging, kwam, zag: strong verbs change their vowel; toen (then, back then)',
    words: ['was', 'waren', 'had', 'hadden', 'ging', 'kwam', 'zag', 'wist', 'wilde', 'kon', 'moest', 'zat', 'stond', 'deed', 'kreeg', 'vond', 'gaf', 'nam', 'werd', 'toen', 'zou', 'zouden', 'vertelde', 'maakte', 'hield', 'liet', 'hoorde', 'ooit', 'laatste', 'leven', 'voordat', 'terwijl', 'tijdens', 'na'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Prices in euros, said the Dutch way (twaalf euro vijftig); times as in Part 3.
const listen = [
  ['N301', 'U81', 'price', 'Een koffie kost drie euro.', '3'], ['N302', 'U81', 'price', 'Dat is twaalf euro vijftig.', '12,50'],
  ['N303', 'U82', 'price', 'Het dagmenu kost vijfentwintig euro.', '25'], ['N304', 'U82', 'price', 'De rekening is tweeënveertig euro.', '42'],
  ['N305', 'U83', 'number', 'De apotheek is honderd meter verder.', '100'], ['N306', 'U83', 'number', 'Het museum is driehonderd meter verder.', '300'],
  ['N307', 'U84', 'number', 'Neem bus acht.', '8'], ['N308', 'U84', 'time', 'De tram komt om kwart over zeven.', '7:15'],
  ['N309', 'U86', 'number', 'Ik woon op nummer zesentwintig.', '26'], ['N310', 'U87', 'time', 'De vergadering is om half elf.', '10:30'],
  ['N311', 'U88', 'phone', 'Mijn mobiele nummer is nul zes, twaalf, twintig, achttien, negen.', '06 12 20 18 09'], ['N312', 'U88', 'date', 'Ik ben geboren op twaalf maart.', '12/3'],
]
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const texts = [
  text('R301', 'U82', 'menu', 'Dagmenu', ['Soep, kip met rijst en salade', 'Toetje: ijs', '€ 18'],
    [q('How much is the menu of the day?', ['18 euros', '8 euros', '28 euros']), q('What is there for dessert?', ['Ice cream', 'Cake', 'Fruit'])]),
  text('R302', 'U82', 'menu', 'Café De Hoek', ['Koffie: € 3', 'Jus d\'orange: € 4', 'Appeltaart: € 4,50', 'Tosti: € 5'],
    [q('How much is the apple pie?', ['4.50 euros', '3 euros', '5 euros']), q('What costs 3 euros?', ['A coffee', 'An orange juice', 'A toasted sandwich'])]),
  text('R303', 'U82', 'notice', 'Restaurant De Vis', ['Vis en vlees', 'Open van dinsdag tot zondag', 'Op maandag gesloten'],
    [q('When is the restaurant closed?', ['On Mondays', 'On Sundays', 'On Tuesdays']), q('What does the restaurant serve?', ['Fish and meat', 'Pizza', 'Only salads'])]),
  text('R304', 'U83', 'message', 'Een bericht van Anna', ['Mijn huis is dicht bij het station.', 'Ga rechtdoor tot het plein.', 'Mijn straat is de tweede rechts.'],
    [q('Where is Anna\'s house?', ['Near the station', 'Near the school', 'In the city centre']), q('Which street is hers?', ['The second on the right', 'The first on the left', 'The second on the left'])]),
  text('R305', 'U83', 'sign', 'In de stad', ['Museum: 200 meter, links', 'Kerk: rechtdoor', 'Station: rechts'],
    [q('Where is the museum?', ['200 metres on the left', '200 metres on the right', 'Straight on']), q('Where is the station?', ['On the right', 'On the left', 'Straight on'])]),
  text('R306', 'U83', 'notice', 'Het hotel', ['Het hotel is aan het eind van de straat.', 'Vijf minuten lopen naar het centrum', 'Bushalte voor het hotel'],
    [q('How far is the hotel from the centre?', ['Five minutes on foot', 'Five minutes by car', 'Half an hour on foot']), q('Where is the bus stop?', ['In front of the hotel', 'Behind the hotel', 'At the station'])]),
  text('R307', 'U86', 'notice', 'Te huur', ['Appartement in het centrum', 'Twee slaapkamers, woonkamer, keuken en badkamer', 'Met balkon', '€ 1200 per maand'],
    [q('How many bedrooms does the flat have?', ['Two', 'Three', 'One']), q('What else does it have?', ['A balcony', 'A garden', 'A garage'])]),
  text('R308', 'U86', 'message', 'Een bericht van Maria', ['Mijn nieuwe huis is klein.', 'Het heeft een slaapkamer, een woonkamer en een keuken.', 'Er is geen tuin.'],
    [q('What is Maria\'s new house like?', ['Small', 'Big', 'Old']), q('What doesn\'t it have?', ['A garden', 'A kitchen', 'A bedroom'])]),
  text('R309', 'U86', 'notice', 'Kamer voor een student', ['Kamer te huur voor een student', 'Met bed, tafel en stoel', 'Dicht bij de universiteit'],
    [q('Who is the room for?', ['A student', 'A family', 'A tourist']), q('Where is it?', ['Near the university', 'Near the station', 'In the countryside'])]),
  text('R310', 'U87', 'notice', 'Vacature', ['Restaurant zoekt een kok', 'Van dinsdag tot zaterdag, 17.00 tot 23.00 uur', 'Bel 06 12 20 18 09'],
    [q('What job is it?', ['A cook', 'A waiter', 'A driver']), q('Which days?', ['Tuesday to Saturday', 'Monday to Friday', 'Every day'])]),
  text('R311', 'U87', 'message', 'Mijn werk', ['Ik ben verpleegkundige en ik werk in een ziekenhuis.', 'Ik begin om zeven uur \'s ochtends.', 'Mijn baas is heel aardig.'],
    [q('Where does she work?', ['In a hospital', 'In a school', 'In a shop']), q('When does she start?', ['At seven in the morning', 'At seven in the evening', 'At nine'])]),
  text('R312', 'U87', 'notice', 'Het bedrijf', ['Bedrijf zoekt een chauffeur', 'Met rijbewijs', 'Van maandag tot vrijdag'],
    [q('Who is the company looking for?', ['A driver', 'A secretary', 'A teacher']), q('What do you need?', ['A driving licence', 'A university degree', 'A car'])]),
  text('R313', 'U89', 'message', 'Een kaart van Anna', ['Lieve Jan,', 'ik ben met mijn familie aan zee. Het is warm en de zee is prachtig.', 'Groetjes, Anna'],
    [q('Where is Anna?', ['At the seaside', 'In the mountains', 'In the city']), q('What is the weather like?', ['Warm', 'Cold', 'Rainy'])]),
  text('R314', 'U89', 'message', 'Een bericht van Tom', ['Hoi Maria,', 'zaterdag ben ik jarig. Kom je naar mijn feest?', 'Het is bij mij thuis, om acht uur.', 'Tom'],
    [q('Why is Tom having a party?', ['It\'s his birthday', 'He has a new job', 'It\'s Christmas']), q('Where is the party?', ['At his house', 'At a restaurant', 'In the park'])]),
  text('R315', 'U89', 'message', 'Een briefje', ['Anna,', 'ik ben niet thuis. Ik ben om zes uur terug.', 'Het eten staat in de koelkast.', 'Jan'],
    [q('When is Jan back?', ['At six', 'At eight', 'At five']), q('Where is the food?', ['In the fridge', 'At a restaurant', 'In the oven'])]),
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F301', unit_id: 'U88', card: 'Mijn naam is Anna Bakker. Ik ben Nederlandse. Ik ben geboren op 10 april in Utrecht. Ik ben getrouwd. Ik woon in de Bloemstraat 12 in Amsterdam.',
      fields: [{ key: 'name', label: 'Naam', rule: 'text', answer: 'Anna Bakker' }, { key: 'nat', label: 'Nationaliteit', rule: 'text', answer: 'Nederlandse', also: ['Nederlands', 'nederlandse', 'nederlands'] },
        { key: 'born', label: 'Geboortedatum', rule: 'text', answer: '10/4', also: ['10 april', '10-4', '10-04', '10.4', '10 April'] }, { key: 'place', label: 'Geboorteplaats', rule: 'text', answer: 'Utrecht' },
        { key: 'civil', label: 'Burgerlijke staat', rule: 'text', answer: 'getrouwd', also: ['Getrouwd', 'gehuwd'] }, { key: 'town', label: 'Woonplaats', rule: 'text', answer: 'Amsterdam' }] },
    { id: 'F302', unit_id: 'U87', card: 'Mijn naam is Jan de Vries. Ik ben dertig jaar. Ik ben verpleegkundige en ik werk in een ziekenhuis in Rotterdam. Ik ben niet getrouwd.',
      fields: [{ key: 'name', label: 'Voornaam', rule: 'text', answer: 'Jan' }, { key: 'last', label: 'Achternaam', rule: 'text', answer: 'de Vries', also: ['De Vries', 'Vries'] }, { key: 'age', label: 'Leeftijd', rule: 'number', answer: '30' },
        { key: 'job', label: 'Beroep', rule: 'text', answer: 'verpleegkundige', also: ['Verpleegkundige'] }, { key: 'civil', label: 'Burgerlijke staat', rule: 'text', answer: 'ongehuwd', also: ['niet getrouwd', 'Ongehuwd', 'ongetrouwd', 'alleenstaand'] }] },
    { id: 'F303', unit_id: 'U81', card: 'In het café: Tom bestelt een koffie en een stuk taart. Maria bestelt een thee. Ze betalen tien euro.',
      fields: [{ key: 'tom', label: 'Tom', rule: 'text', answer: 'een koffie en een stuk taart', also: ['koffie en taart', 'koffie, taart', 'een koffie, een stuk taart', 'koffie en een stuk taart'] },
        { key: 'maria', label: 'Maria', rule: 'text', answer: 'een thee', also: ['thee'] }, { key: 'total', label: 'Totaal (euro)', rule: 'number', answer: '10' }] },
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
  U28: [['speaking', 'Spoken interaction', 'I can say that something doesn\'t work or that something has happened.']],
  U88: [['writing', 'Writing', 'I can fill in a form with my personal details.']],
  U89: [['writing', 'Writing', 'I can write a short postcard or message.'], ['reading', 'Reading', 'I can understand a short personal message or postcard.']],
  U91: [['reading', 'Reading', 'I can recognize everyday words for food, cooking and quantities.']],
  U92: [['speaking', 'Spoken production', 'I can say in simple words what I did.']],
  U93: [['speaking', 'Spoken production', 'I can say what hurts and that I feel ill.']],
  U94: [['speaking', 'Spoken interaction', 'I can say what I think of something and give a simple reason.']],
  U95: [['reading', 'Reading', 'I can understand a short, simple story about the past.']],
}

export default {
  part: 4, wordBase: 1601, vocabBase: 1801, cdBase: 501,
  slots: [{ slot_id: 'C07', part: 4, after_row: 22 }, { slot_id: 'C08', part: 4, after_row: 24 }],
  situation, vocab, items, canDo,
  // Turned off before the pull (kept as an id, never shown): Wiktionary has liefs only as a partitive adjective, not the
  // letter closing, so its gloss would be wrong.
  off: { liefs: "Wiktionary's only entry is the partitive of lief, not the letter closing (love)" },
}
