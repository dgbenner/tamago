// Danish A1 · Part 2, Everyday Life (Dan, 2026-11-21; Builder 2, branch content/da-a1), in the format of Swedish and
// Dutch Part 2: names and spelling (T01, T02), phone numbers, age, where you live and where you are from (T03), numbers
// to 100, shopping and prices (T04); the help thread goes on (T13). Standard Danish, modern du throughout (formal De and
// plural I stay out); prices in kroner. Words chosen for the course's frequency list (content-da/a1-list.json, a
// subtitle frequency stand-in; its 600 most frequent as the core target, about 44% after this part, 90% by the end of
// Part 4) where they fit the situations: Part 1 taught almost none of its small words (at, med, så, for, men, eller, som,
// bare, ingen) or its everyday verbs past the present (vil, skal, må, kommer, tager, får, bliver), so Part 2 brings them
// in early, where they open the most Tatoeba lines. Danish verbs have one present form for every person, so each verb
// comes as its present and, where a modal needs it, its infinitive (kan … skrive). Past forms (var, kom, sagde, havde)
// wait for Part 3. The verb have (to have) is spelled as Part 1's noun have (garden), so lines with the verb are cut in
// review; the market circle asks with må jeg få and jeg tager instead. Vocabulary themes stay clear of Part 1's
// (Body + Looks, Free Time, Around Town) and of Parts 3 and 4 (time; food, directions, home, family, work).
// Used by scripts/add-part.mjs (COURSE=da PART=2).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U41', order: 101, row: 11, after: '', title: 'Your Name, Please', tasks: 'T01;T02',
    grammar: 'Hvad hedder du? Jeg hedder …; hvad er dit efternavn?; rart at møde dig; ikke comes after the verb (jeg kender ham ikke); object pronouns mig, dig, ham, hende, os',
    words: ['navn', 'fornavn', 'efternavn', 'kender', 'kalder', 'mig', 'dig', 'ham', 'hende', 'os', 'møde', 'rart', 'at'] },
  { unit_id: 'U34', order: 101.5, row: 11.5, after: 'row 11', title: 'Spelling It Out', help: true, tasks: 'T02;T13',
    grammar: 'Hvordan staver man det? Kan du stave det?: kan + an infinitive with no at (kan du skrive det?); kan is the same for every person',
    words: ['skriver', 'skrive', 'staver', 'stave', 'bogstav', 'kunne', 'være', 'hjælpe', 'bare', 'så', 'sige', 'tale'] },
  { unit_id: 'U42', order: 102, row: 12, after: 'row 11', title: 'Phone Numbers', tasks: 'T02',
    grammar: 'Numbers 0 to 20; mit nummer er …: Danish phone numbers are said in pairs (tolv, fjorten …); ringe: jeg ringer, du ringer; elleve to nitten; eller (or)',
    words: ['nummer', 'nummeret', 'telefon', 'ringer', 'ringe', 'nul', 'elleve', 'tolv', 'tretten', 'fjorten', 'femten', 'seksten', 'sytten', 'atten', 'nitten', 'tyve', 'eller', 'hallo'] },
  { unit_id: 'U43', order: 103, row: 12, after: 'row 11', title: 'Age + Birthdays', tasks: 'T03',
    grammar: 'Jeg er … år (gammel): være for age; hvor gammel er du?; tillykke med fødselsdagen!; jeg fylder tyve (I turn twenty); hun bliver ti; allerede, næsten, snart',
    words: ['fødselsdag', 'fødselsdagen', 'tillykke', 'fylder', 'bliver', 'blive', 'måneder', 'født', 'allerede', 'næsten', 'snart', 'stadig', 'ældre', 'yngre', 'med'] },
  { unit_id: 'U35', order: 103.5, row: 12.5, after: 'row 12', title: 'Checking Numbers', help: true, tasks: 'T13',
    grammar: 'Et øjeblik. Vent lidt. Passer det? Det er forkert. Præcis. Lad mig se.',
    words: ['øjeblik', 'vent', 'venter', 'vente', 'lidt', 'passer', 'fejl', 'rigtigt', 'rigtig', 'præcis', 'forkert', 'lige', 'sikker', 'lad', 'se'] },
  { unit_id: 'U44', order: 104, row: 13, after: 'row 12', title: 'Numbers to 100', tasks: 'T04',
    grammar: 'Tens to 100: tredive, fyrre, halvtreds, tres, halvfjerds, firs, halvfems, hundrede; the unit comes first, all one word: enogtyve, femogfyrre; mere end, mindre end, flere end',
    words: ['tredive', 'fyrre', 'halvtreds', 'tres', 'halvfjerds', 'firs', 'halvfems', 'hundrede', 'tusind', 'mere', 'flere', 'mest', 'mindre', 'end'] },
  { unit_id: 'U45', order: 105, row: 13, after: 'row 12', title: 'Where You Live', tasks: 'T03',
    grammar: 'Jeg bor i Aarhus: bo; jeg bor, du bor; hos (at someone\'s home): jeg bor hos mine forældre; hjemme (at home), hjem (home, after a verb of going)',
    words: ['bor', 'bo', 'adresse', 'land', 'hjemme', 'hjem', 'ude', 'ud', 'ind', 'hos', 'forældre', 'kæreste', 'alene', 'selv', 'sammen', 'mennesker', 'folk', 'deres', 'sted', 'mine', 'dine', 'finde'] },
  { unit_id: 'U46', order: 106, row: 14, after: 'row 13', title: 'Countries + Languages', tasks: 'T03',
    grammar: 'Jeg kommer fra Danmark: komme fra for where you are from; hvor kommer du fra?; countries take a capital, languages and nationalities do not (dansk, svensk)',
    words: ['Danmark', 'Sverige', 'Norge', 'Tyskland', 'Frankrig', 'England', 'kommer', 'komme', 'fra', 'svensk', 'tysk', 'fransk', 'sprog', 'snakker', 'verden'] },
  { unit_id: 'U47', order: 107, row: 14, after: 'row 13', title: 'At the Market', tasks: 'T04',
    grammar: 'Jeg vil gerne …; må jeg få …? (may I have); jeg skal … (I have to); jeg tager …; et kilo …; jeg har brug for … (I need); vil, skal and må take a plain infinitive (jeg vil gerne købe …)',
    words: ['marked', 'køber', 'købe', 'sælger', 'vil', 'gerne', 'får', 'få', 'tager', 'tage', 'skal', 'må', 'gå', 'kilo', 'frugt', 'grøntsager', 'brug', 'behøver', 'noget', 'nogen', 'for'] },
  { unit_id: 'U36', order: 107.5, row: 14.5, after: 'row 14', title: 'Checking You Understood', help: true, tasks: 'T13',
    grammar: 'Selvfølgelig. Det er klart. Virkelig? Sikkert. Hvad mener du? Jeg tror det. Det lyder godt.',
    words: ['selvfølgelig', 'klart', 'virkelig', 'sikkert', 'mener', 'tror', 'synes', 'altså', 'måske', 'jo', 'faktisk', 'nok', 'vel', 'håber', 'tænker', 'lyder', 'heller', 'hvis', 'om', 'vide', 'sådan'] },
  { unit_id: 'U48', order: 108, row: 15, after: 'row 14', title: 'How Much Is It?', tasks: 'T04',
    grammar: 'Hvad koster det? Det koster … kroner; det er dyrt, det er billigt (the -t form after det); for dyrt (too dear); denne, dette, disse (this, these)',
    words: ['koster', 'pris', 'kroner', 'pengene', 'penge', 'dyrt', 'billigt', 'betaler', 'betale', 'kun', 'men', 'denne', 'dette', 'disse'] },
  { unit_id: 'U49', order: 109, row: 15, after: 'row 14', title: 'Bottles + Bags', tasks: 'T04',
    grammar: 'En flaske vand, et kilo æbler: no word for of after a quantity; ingen, intet (no, none) follow the noun\'s gender; alle, alt, hver, hele',
    words: ['flaske', 'flasker', 'pakke', 'pose', 'glas', 'par', 'alle', 'alt', 'hele', 'hver', 'ingen', 'intet', 'ingenting', 'nogle', 'af', 'dem', 'give', 'giver', 'plads'] },
]

const vocab = [
  { unit_id: 'U54', order: 101.2, row: 11, after: '', title: 'Clothes',
    grammar: 'Hun har en rød trøje på (she is wearing a red jumper): have … på for what you wear; tøj is a mass noun (tøjet)',
    words: ['tøj', 'bukser', 'nederdel', 'kjole', 'jakke', 'sko', 'trøje', 'hat', 'hue', 'briller', 'skjorte', 'størrelse', 'prøver', 'prøve'] },
  { unit_id: 'U55', order: 103.2, row: 12, after: 'row 11', title: 'In Class',
    grammar: 'Jeg lærer dansk: lære (to learn); et spørgsmål, et svar; spørge (to ask): jeg spørger',
    words: ['lektion', 'klasse', 'spørgsmål', 'spørger', 'spørge', 'svar', 'svarer', 'svare', 'blyant', 'papir', 'lære', 'elev', 'lektier', 'gør', 'gøre', 'laver', 'lave', 'side', 'eksempel', 'lytter', 'bruger', 'bruge', 'færdig', 'piger', 'drenge', 'besked', 'husker', 'problem', 'hjælp'] },
  { unit_id: 'U56', order: 105.2, row: 13, after: 'row 12', title: 'What People Are Like',
    grammar: 'Han er sød, en sød mand; et sødt barn: an adjective takes -t with an et-word; ret and meget before an adjective; som (who, that): det er Tom, som læser',
    words: ['tyk', 'tynd', 'sød', 'venlig', 'rolig', 'mærkelig', 'ærlig', 'lykkelig', 'stille', 'kedelig', 'dygtig', 'flink', 'interessant', 'flot', 'person', 'ret', 'som', 'føler', 'sig', 'ligner', 'virker', 'elsker'] },
  { unit_id: 'U57', order: 107.2, row: 14, after: 'row 13', title: 'Opposites',
    grammar: 'Let, svært; åben, lukket; for (too) before an adjective: for svært; bedre (better), samme (the same); små, gode, nye: the plural adds -e (små stays)',
    words: ['åben', 'åbent', 'lukket', 'let', 'svær', 'svært', 'fuld', 'hurtigt', 'langsomt', 'tung', 'mørkt', 'ren', 'beskidt', 'vigtigt', 'bedre', 'bedste', 'samme', 'anden', 'andet', 'andre', 'nemt', 'muligt', 'forskellige', 'helt', 'perfekt', 'stort', 'nyt', 'små', 'gode', 'nye', 'gamle', 'unge', 'døren', 'over', 'inde'] },
  { unit_id: 'U58', order: 109.2, row: 15, after: 'row 14', title: 'Outdoors',
    grammar: 'Ved havet, i skoven, på bjerget: ved, i and på for places; solen, himlen (the definite form ends the noun)',
    words: ['hav', 'havet', 'sø', 'skov', 'skoven', 'bjerg', 'træ', 'træer', 'blomst', 'blomster', 'sol', 'solen', 'himlen', 'græs', 'jorden', 'sidder'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Danish phone numbers have eight digits and are said in pairs (tolv, fjorten, nitten, elleve); prices in kroner.
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const items = {
  a1_listen: [
    ['N101', 'U42', 'number', 'femten', '15'], ['N102', 'U42', 'number', 'sytten', '17'], ['N103', 'U42', 'phone', 'tolv, fjorten, nitten, elleve', '12 14 19 11'],
    ['N104', 'U42', 'phone', 'seksten, tyve, tretten, atten', '16 20 13 18'],
    ['N105', 'U43', 'number', 'Jeg er tyve år.', '20'], ['N106', 'U43', 'number', 'Hun er atten år.', '18'],
    ['N107', 'U44', 'number', 'halvfjerds', '70'], ['N108', 'U44', 'number', 'halvfems', '90'], ['N109', 'U44', 'number', 'femogfyrre', '45'], ['N110', 'U44', 'number', 'nioghalvfems', '99'],
    ['N111', 'U48', 'price', 'tredive kroner', '30'], ['N112', 'U48', 'price', 'ti kroner', '10'], ['N113', 'U48', 'price', 'hundrede kroner', '100'], ['N114', 'U48', 'price', 'halvtreds kroner', '50'],
  ].map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F101', unit_id: 'U45', card: 'Jeg hedder Lars Jensen. Jeg er fyrre år. Jeg bor på Storegade ti i Aarhus.',
      fields: [{ key: 'first', label: 'Fornavn', rule: 'text', answer: 'Lars' }, { key: 'last', label: 'Efternavn', rule: 'text', answer: 'Jensen' }, { key: 'age', label: 'Alder', rule: 'number', answer: '40' },
        { key: 'address', label: 'Adresse', rule: 'text', answer: 'Storegade 10', also: ['Storegade, 10', 'storegade 10', 'Storegade ti'] }, { key: 'town', label: 'By', rule: 'text', answer: 'Aarhus', also: ['aarhus', 'Århus', 'århus'] }] },
    { id: 'F102', unit_id: 'U46', card: 'Jeg hedder Mette Hansen. Jeg er tredive år. Jeg kommer fra Danmark. Jeg bor i Frankrig. Mit nummer er tolv, fjorten, nitten, elleve.',
      fields: [{ key: 'first', label: 'Fornavn', rule: 'text', answer: 'Mette' }, { key: 'last', label: 'Efternavn', rule: 'text', answer: 'Hansen' }, { key: 'age', label: 'Alder', rule: 'number', answer: '30' },
        { key: 'nat', label: 'Nationalitet', rule: 'text', answer: 'dansk', also: ['Dansk', 'dansker', 'Dansker', 'Danmark'] }, { key: 'country', label: 'Land', rule: 'text', answer: 'Frankrig' },
        { key: 'tel', label: 'Telefon', rule: 'phone', answer: '12 14 19 11' }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: [
    text('R101', 'U47', 'sign', 'På torvet', ['Frugt og grøntsager', 'Æbler: 25 kroner kiloet', 'Marked: mandag og lørdag'],
      [q('How much is a kilo of apples?', ['25 kroner', '15 kroner', '52 kroner']), q('When is the market on?', ['Monday and Saturday', 'Every day', 'Only on Sunday'])]),
    text('R102', 'U47', 'notice', 'Marked på torvet', ['Marked på torvet', 'Hver lørdag', 'Frugt, grøntsager, brød og ost'],
      [q('When is the market?', ['On Saturdays', 'On Mondays', 'Every day']), q('What can you buy there?', ['Fruit, vegetables, bread and cheese', 'Clothes and shoes', 'Books and maps'])]),
    text('R103', 'U47', 'message', 'En sms fra Anna', ['Lars!', 'Jeg er på torvet. Jeg køber frugt og grøntsager.', 'Skal jeg købe et æble til dig?', 'Anna'],
      [q('Where is Anna?', ['At the market square', 'At school', 'In the park']), q('What does she offer to buy for Lars?', ['An apple', 'A coffee', 'Some bread'])]),
    text('R104', 'U48', 'menu', 'Priser', ['Brød: 30 kroner', 'Ost: 90 kroner', 'Mælk: 15 kroner', 'Vand: 20 kroner'],
      [q('How much is the cheese?', ['30 kroner', '90 kroner', '15 kroner'], 1), q('What costs 30 kroner?', ['The bread', 'The milk', 'The water'])]),
    text('R105', 'U48', 'menu', 'På caféen', ['Kaffe: 35 kroner', 'Te: 30 kroner', 'Æblekage: 45 kroner'],
      [q('How much is a tea?', ['30 kroner', '35 kroner', '45 kroner']), q('What costs the most?', ['The apple cake', 'The coffee', 'The tea'])]),
    text('R106', 'U48', 'notice', 'Gamle bøger', ['Gamle bøger', 'En bog: 20 kroner', 'Tre bøger: 50 kroner'],
      [q('How much is one book?', ['20 kroner', '30 kroner', '50 kroner']), q('How much are three books?', ['50 kroner', '60 kroner', '20 kroner'])]),
    text('R107', 'U49', 'message', 'En sms fra Maria', ['Peter!', 'Kan du købe en flaske mælk, en pakke kaffe og et kilo æbler?', 'Tak!', 'Maria'],
      [q('What does Maria want?', ['Milk, coffee and apples', 'Bread and water', 'Fruit and vegetables']), q('How much milk?', ['One bottle', 'Two bottles', 'A kilo'])]),
    text('R108', 'U49', 'sign', 'I butikken', ['Vand: seks flasker, 40 kroner', 'Chokolade: to æsker, 50 kroner'],
      [q('How many bottles do you get for 40 kroner?', ['Six', 'Four', 'Two']), q('What costs 50 kroner?', ['Two boxes of chocolates', 'Six bottles of water', 'One box of chocolates'])]),
    text('R109', 'U49', 'message', 'Til festen', ['Til festen:', 'to flasker saftevand,', 'en æske chokolade,', 'masser af frugt!'],
      [q('How many bottles of squash?', ['Two', 'One', 'Three']), q('What is the list for?', ['A party', 'School', 'A trip'])]),
  ].map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P101', unit_id: 'U45', prompt: 'Write a short message to a new friend: your name, how old you are and where you live.', points: 'your name;your age;where you live', min_words: 20, max_words: 35 },
    { id: 'P102', unit_id: 'U46', prompt: 'Write a short postcard about yourself: where you are from, where you live and which languages you speak.', points: 'where you are from;where you live;your languages', min_words: 30, max_words: 40 },
    { id: 'P103', unit_id: 'U49', prompt: 'Write a short message to a friend: what to buy at the market, and how much of each.', points: 'two or three things;how much of each', min_words: 20, max_words: 35 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

// "I can" statements, on the CEFR self-assessment grid's A1 rows (as Swedish, Dutch, Italian and Portuguese Part 2).
const canDo = {
  U41: [['speaking', 'Spoken interaction', 'I can say my name and ask someone theirs.']],
  U34: [['speaking', 'Spoken interaction', 'I can ask how a word or a name is spelled, and spell my own.']],
  U42: [['listening', 'Listening', 'I can understand a phone number said slowly.'], ['speaking', 'Spoken production', 'I can give my phone number.']],
  U43: [['speaking', 'Spoken interaction', 'I can ask and say how old someone is.']],
  U35: [['speaking', 'Spoken interaction', 'I can ask someone to repeat a number and check that I have it right.']],
  U44: [['listening', 'Listening', 'I can understand numbers up to 100 said slowly.']],
  U45: [['writing', 'Writing', 'I can write where I live: my street, my town, my country.'], ['speaking', 'Spoken production', 'I can say where I live.']],
  U46: [['reading', 'Reading', 'I can understand which country someone comes from and which languages they speak.']],
  U47: [['speaking', 'Spoken interaction', 'I can ask for things at a market and say how much I want.']],
  U36: [['speaking', 'Spoken interaction', 'I can say that I have understood, or check that I have.']],
  U48: [['listening', 'Listening', 'I can understand prices.'], ['speaking', 'Spoken interaction', 'I can ask how much something costs.']],
  U49: [['reading', 'Reading', 'I can understand quantities on a shopping list.']],
  U54: [['speaking', 'Spoken production', 'I can say what someone is wearing.']],
  U55: [['reading', 'Reading', 'I can understand everyday words for the classroom.']],
  U56: [['speaking', 'Spoken production', 'I can say what someone is like: kind, funny, quiet, honest.']],
  U57: [['reading', 'Reading', 'I can understand simple descriptions: easy or hard, open or closed, clean or dirty.']],
  U58: [['reading', 'Reading', 'I can recognise everyday words for the countryside and the outdoors.']],
}

// Turned off in the gather (ids kept): too few lines for the circle's vocabulary, none of them on the core list, and the
// circle reads well without them (a twin form carries some: nummer for nummeret, fødselsdagen for fødselsdag, flaske
// for flasker, havet and solen for hav and sol, åben and svært for åbent and svær, hat for hue).
const thin = 'turned off in the gather: too few lines this early, not on the core list; its twin or its circle carries it'
const off = Object.fromEntries(['nummeret', 'fødselsdag', 'hue', 'nederdel', 'lektion', 'lektier', 'mærkelig', 'ærlig', 'flink', 'person', 'åbent', 'svær', 'tung', 'sø', 'bjerg', 'græs', 'pose', 'flasker', 'hav', 'sol'].map((f) => [f, thin]))
off['altså'] = 'no Danish entry on Wiktionary (only Norwegian), so no checked meaning'
off.blyant = 'no Danish entry on Wiktionary, so no checked meaning'
const late = []

export default {
  part: 2, off, late, wordBase: 801, vocabBase: 1101, cdBase: 301,
  slots: [{ slot_id: 'C03', part: 2, after_row: 12 }, { slot_id: 'C04', part: 2, after_row: 14 }],
  situation, vocab, items, canDo,
}
