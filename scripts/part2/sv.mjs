// Swedish A1 · Part 2, Everyday Life (Dan, 2026-11-21; Builder 2, branch content/sv-a1), in the format of Dutch,
// Italian and Portuguese Part 2: names and spelling (T01, T02), phone numbers, age, where you live and where you are
// from (T03), numbers to 100, shopping and prices (T04); the help thread goes on (T13). Standard Swedish (rikssvenska),
// du throughout (Swedish has no everyday polite you; ni stays out); prices in kronor. Words chosen for the course's
// frequency list (content-sv/a1-list.json, the Swedish Kelly list; its 600 most frequent as the core target, 90% by the
// end of Part 4) where they fit the situations: Part 1 taught almost none of its small words (att, med, men, för,
// eller, som, bara, ingen) or its everyday verbs past the present (kan, vill, måste, kommer, tar, får, blir), so Part 2
// brings them in early, where they open the most Tatoeba lines. Swedish verbs have one present form for every person,
// so each verb comes as its present and, where a modal needs it, its infinitive (kan … skriva). Vocabulary themes stay
// clear of Part 1's (Body + Looks, Free Time, Around Town) and of Parts 3 and 4 (time; food, directions, home, family,
// work). Used by scripts/add-part.mjs (COURSE=sv PART=2).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U41', order: 101, row: 11, after: '', title: 'Your Name, Please', tasks: 'T01;T02',
    grammar: 'Vad heter du? Jag heter …; vad heter du i efternamn?; trevligt att träffas; inte comes after the verb (jag känner honom inte); object pronouns mig, dig, honom, henne, oss',
    words: ['namn', 'namnet', 'förnamn', 'efternamn', 'känner', 'mig', 'dig', 'honom', 'henne', 'oss', 'träffas', 'trevligt', 'att', 'välkommen'] },
  { unit_id: 'U34', order: 101.5, row: 11.5, after: 'row 11', title: 'Spelling It Out', help: true, tasks: 'T02;T13',
    grammar: 'Hur stavar man det? Kan du stava det?: kan + an infinitive with no att (kan du skriva det?); kan is the same for every person',
    words: ['skriver', 'skriva', 'stavar', 'stava', 'bokstav', 'kan', 'kunna', 'vara', 'hjälpa', 'bara', 'så'] },
  { unit_id: 'U42', order: 102, row: 12, after: 'row 11', title: 'Phone Numbers', tasks: 'T02',
    grammar: 'Numbers 0 to 20; mitt nummer är …; ringa: jag ringer, du ringer; elva to nitton; eller (or)',
    words: ['nummer', 'numret', 'telefon', 'ringer', 'ringa', 'noll', 'elva', 'tolv', 'tretton', 'fjorton', 'femton', 'sexton', 'sjutton', 'arton', 'nitton', 'tjugo', 'eller'] },
  { unit_id: 'U43', order: 103, row: 12, after: 'row 11', title: 'Age + Birthdays', tasks: 'T03',
    grammar: 'Jag är … år (gammal): vara for age; hur gammal är du?; grattis på födelsedagen!; jag fyller år (it is my birthday); hon blir tio (she turns ten); redan, nästan, snart',
    words: ['födelsedag', 'födelsedagen', 'grattis', 'fyller', 'blir', 'bli', 'månad', 'månader', 'född', 'redan', 'nästan', 'snart', 'äldre', 'yngre', 'bebis', 'med'] },
  { unit_id: 'U35', order: 103.5, row: 12.5, after: 'row 12', title: 'Checking Numbers', help: true, tasks: 'T13',
    grammar: 'Ett ögonblick. Vänta lite. Stämmer det? Det är fel. Precis.', words: ['ögonblick', 'vänta', 'väntar', 'lite', 'stämmer', 'fel', 'rätt', 'precis', 'okej', 'riktigt'] },
  { unit_id: 'U44', order: 104, row: 13, after: 'row 12', title: 'Numbers to 100', tasks: 'T04',
    grammar: 'Tens to 100: trettio … nittio, hundra; tjugoett, fyrtiofem: the ten first, then the unit, all one word; mer än, mindre än, fler än',
    words: ['trettio', 'fyrtio', 'femtio', 'sextio', 'sjuttio', 'åttio', 'nittio', 'hundra', 'tusen', 'miljon', 'miljoner', 'mer', 'fler', 'mindre', 'än', 'ungefär', 'över'] },
  { unit_id: 'U45', order: 105, row: 13, after: 'row 12', title: 'Where You Live', tasks: 'T03',
    grammar: 'Jag bor i Göteborg: bo; jag bor, du bor; hos (at someone\'s home): jag bor hos mina föräldrar; hemma (at home), hem (home, after a verb of going)',
    words: ['bor', 'bo', 'adress', 'land', 'landet', 'by', 'hemma', 'hem', 'ute', 'inne', 'hos', 'föräldrar', 'ensam', 'själv', 'tillsammans', 'människor', 'deras', 'plats'] },
  { unit_id: 'U46', order: 106, row: 14, after: 'row 13', title: 'Countries + Languages', tasks: 'T03',
    grammar: 'Jag kommer från Sverige: komma från for where you are from; var kommer du ifrån?; countries take a capital, languages and nationalities do not (svenska, svensk)',
    words: ['Sverige', 'Norge', 'Danmark', 'Finland', 'Tyskland', 'Frankrike', 'England', 'Spanien', 'Europa', 'kommer', 'ifrån', 'svensk', 'tyska', 'franska', 'spanska', 'språk', 'talar', 'tala', 'världen'] },
  { unit_id: 'U47', order: 107, row: 14, after: 'row 13', title: 'At the Market', tasks: 'T04',
    grammar: 'Jag vill ha …; får jag …? (may I); jag måste … (I have to); jag tar …; ett kilo …: vill and måste take a plain infinitive (jag vill träffa henne, trevligt att lära känna dig)',
    words: ['marknad', 'köper', 'köpa', 'vill', 'vilja', 'ha', 'får', 'få', 'tar', 'ta', 'måste', 'kilo', 'frukt', 'grönsaker', 'ägg', 'tomat', 'banan', 'behöver', 'något', 'någon', 'känna', 'träffa', 'komma'] },
  { unit_id: 'U36', order: 107.5, row: 14.5, after: 'row 14', title: 'Checking You Understood', help: true, tasks: 'T13',
    grammar: 'Självklart. Klart. Verkligen? Säkert. Vad menar du? Jag tror det.', words: ['självklart', 'klart', 'verkligen', 'säkert', 'menar', 'tror', 'alltså', 'fattar', 'kanske', 'tyvärr', 'ju', 'faktiskt'] },
  { unit_id: 'U48', order: 108, row: 15, after: 'row 14', title: 'How Much Is It?', tasks: 'T04',
    grammar: 'Vad kostar det? Det kostar … kronor; det är dyrt, det är billigt (the -t form after det); för dyrt (too dear); den här, det här (this)',
    words: ['kostar', 'pris', 'priset', 'krona', 'kronor', 'dyr', 'dyrt', 'billig', 'billigt', 'betalar', 'betala', 'pengar', 'för', 'men', 'kort', 'kontant', 'detta', 'dessa'] },
  { unit_id: 'U49', order: 109, row: 15, after: 'row 14', title: 'Bottles + Bags', tasks: 'T04',
    grammar: 'En flaska vatten, ett kilo äpplen: no word for of after a quantity; ingen, inget, inga (no, none) follow the noun\'s gender and number; alla, allt, varje',
    words: ['flaska', 'flaskor', 'paket', 'låda', 'påse', 'väska', 'glas', 'bit', 'par', 'tillräckligt', 'alla', 'allt', 'varje', 'ingen', 'inget', 'inga', 'av', 'dem'] },
]

const vocab = [
  { unit_id: 'U54', order: 101.2, row: 11, after: '', title: 'Clothes',
    grammar: 'Hon har en röd tröja på sig (she is wearing a red jumper): ha på sig for what you wear; kläder is always plural',
    words: ['kläder', 'byxor', 'kjol', 'klänning', 'jacka', 'skor', 'tröja', 'hatt', 'mössa', 'glasögon', 'skjorta', 'storlek', 'bär', 'sig'] },
  { unit_id: 'U55', order: 103.2, row: 12, after: 'row 11', title: 'In Class',
    grammar: 'Jag lär mig svenska: lära sig (to learn); en fråga, ett svar; fråga is a noun and a verb (jag frågar)',
    words: ['lektion', 'klass', 'fråga', 'frågar', 'svar', 'svarar', 'svara', 'penna', 'papper', 'lär', 'lära', 'student', 'elev', 'prov', 'läxor', 'gör', 'göra'] },
  { unit_id: 'U56', order: 105.2, row: 13, after: 'row 12', title: 'What People Are Like',
    grammar: 'Han är trevlig, en trevlig man; ett trevligt barn: an adjective takes -t with an ett-word; ganska and väldigt before an adjective; som (who, that): det är Tom som läser',
    words: ['tjock', 'smal', 'trevlig', 'vänlig', 'lugn', 'konstig', 'ärlig', 'lycklig', 'tyst', 'tråkig', 'duktig', 'söt', 'intressant', 'person', 'ganska', 'väldigt', 'som'] },
  { unit_id: 'U57', order: 107.2, row: 14, after: 'row 13', title: 'Opposites',
    grammar: 'Lätt, svårt; öppen, stängd; för (too) before an adjective: för svårt; bättre (better), samma (the same)',
    words: ['öppen', 'öppet', 'stängd', 'lätt', 'svår', 'svårt', 'full', 'snabbt', 'långsamt', 'tung', 'mörkt', 'ljust', 'ren', 'smutsig', 'viktigt', 'bättre', 'samma', 'enkelt'] },
  { unit_id: 'U58', order: 109.2, row: 15, after: 'row 14', title: 'Outdoors',
    grammar: 'Vid havet, i skogen, på berget: vid, i and på for places; solen, himlen (the definite form ends the noun)',
    words: ['hav', 'havet', 'sjö', 'skog', 'skogen', 'berg', 'träd', 'blomma', 'blommor', 'sol', 'solen', 'himlen', 'gräs', 'ser', 'se'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Swedish mobile numbers as they are said: 07x, then three digits, then two pairs; prices in kronor.
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const items = {
  a1_listen: [
    ['N101', 'U42', 'number', 'femton', '15'], ['N102', 'U42', 'number', 'sjutton', '17'], ['N103', 'U42', 'phone', 'noll sju noll, fem två fyra, tolv, nitton', '070 524 12 19'],
    ['N104', 'U42', 'phone', 'noll sju tre, sex åtta noll, elva, sexton', '073 680 11 16'],
    ['N105', 'U43', 'number', 'Jag är tjugo år.', '20'], ['N106', 'U43', 'number', 'Hon är arton år.', '18'],
    ['N107', 'U44', 'number', 'sjuttio', '70'], ['N108', 'U44', 'number', 'nittio', '90'], ['N109', 'U44', 'number', 'fyrtiofem', '45'], ['N110', 'U44', 'number', 'nittionio', '99'],
    ['N111', 'U48', 'price', 'trettio kronor', '30'], ['N112', 'U48', 'price', 'tio kronor', '10'], ['N113', 'U48', 'price', 'hundra kronor', '100'], ['N114', 'U48', 'price', 'femtio kronor', '50'],
  ].map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F101', unit_id: 'U45', card: 'Jag heter Lars Andersson. Jag är fyrtio år. Jag bor på Storgatan tio i Göteborg.',
      fields: [{ key: 'first', label: 'Förnamn', rule: 'text', answer: 'Lars' }, { key: 'last', label: 'Efternamn', rule: 'text', answer: 'Andersson' }, { key: 'age', label: 'Ålder', rule: 'number', answer: '40' },
        { key: 'address', label: 'Adress', rule: 'text', answer: 'Storgatan 10', also: ['Storgatan, 10', 'storgatan 10', 'Storgatan tio'] }, { key: 'town', label: 'Ort', rule: 'text', answer: 'Göteborg', also: ['Goteborg', 'göteborg'] }] },
    { id: 'F102', unit_id: 'U46', card: 'Jag heter Eva Lind. Jag är trettio år. Jag kommer från Sverige. Jag bor i Frankrike. Mitt nummer är noll sju noll, fem två fyra, tolv, nitton.',
      fields: [{ key: 'first', label: 'Förnamn', rule: 'text', answer: 'Eva' }, { key: 'last', label: 'Efternamn', rule: 'text', answer: 'Lind' }, { key: 'age', label: 'Ålder', rule: 'number', answer: '30' },
        { key: 'nat', label: 'Medborgarskap', rule: 'text', answer: 'svensk', also: ['Svensk', 'svenska', 'Svenska', 'Sverige'] }, { key: 'country', label: 'Land', rule: 'text', answer: 'Frankrike' },
        { key: 'tel', label: 'Telefon', rule: 'phone', answer: '070 524 12 19' }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: [
    text('R101', 'U47', 'sign', 'På torget', ['Frukt och grönsaker', 'Äpplen: 25 kronor per kilo', 'Marknad: måndag och lördag'],
      [q('How much is a kilo of apples?', ['25 kronor', '15 kronor', '52 kronor']), q('When is the market on?', ['Monday and Saturday', 'Every day', 'Only on Sunday'])]),
    text('R102', 'U47', 'notice', 'Marknad på torget', ['Marknad på torget', 'Varje lördag', 'Frukt, grönsaker, bröd och ost'],
      [q('When is the market?', ['On Saturdays', 'On Mondays', 'Every day']), q('What can you buy there?', ['Fruit, vegetables, bread and cheese', 'Clothes and shoes', 'Books and maps'])]),
    text('R103', 'U47', 'message', 'Ett sms från Anna', ['Erik!', 'Jag är på torget. Jag köper frukt och grönsaker.', 'Vill du ha ett äpple?', 'Anna'],
      [q('Where is Anna?', ['At the market square', 'At school', 'In the park']), q('What does she offer Erik?', ['An apple', 'A coffee', 'Some bread'])]),
    text('R104', 'U48', 'menu', 'Priser', ['Bröd: 30 kronor', 'Ost: 90 kronor', 'Mjölk: 15 kronor', 'Vatten: 20 kronor'],
      [q('How much is the cheese?', ['30 kronor', '90 kronor', '15 kronor'], 1), q('What costs 30 kronor?', ['The bread', 'The milk', 'The water'])]),
    text('R105', 'U48', 'menu', 'På kaféet', ['Kaffe: 35 kronor', 'Te: 30 kronor', 'Äppelkaka: 45 kronor'],
      [q('How much is a tea?', ['30 kronor', '35 kronor', '45 kronor']), q('What costs the most?', ['The apple cake', 'The coffee', 'The tea'])]),
    text('R106', 'U48', 'notice', 'Gamla böcker', ['Gamla böcker', 'En bok: 20 kronor', 'Tre böcker: 50 kronor'],
      [q('How much is one book?', ['20 kronor', '30 kronor', '50 kronor']), q('How much are three books?', ['50 kronor', '60 kronor', '20 kronor'])]),
    text('R107', 'U49', 'message', 'Ett sms från Maria', ['Tom!', 'Kan du köpa en flaska mjölk, ett paket kaffe och ett kilo äpplen?', 'Tack!', 'Maria'],
      [q('What does Maria want?', ['Milk, coffee and apples', 'Bread and water', 'Fruit and vegetables']), q('How much milk?', ['One bottle', 'Two bottles', 'A kilo'])]),
    text('R108', 'U49', 'sign', 'I affären', ['Vatten: sex flaskor, 40 kronor', 'Choklad: två askar, 50 kronor'],
      [q('How many bottles do you get for 40 kronor?', ['Six', 'Four', 'Two']), q('What costs 50 kronor?', ['Two boxes of chocolates', 'Six bottles of water', 'One box of chocolates'])]),
    text('R109', 'U49', 'message', 'Till festen', ['Till festen:', 'två flaskor saft,', 'en ask choklad,', 'mycket frukt!'],
      [q('How many bottles of squash?', ['Two', 'One', 'Three']), q('What is the list for?', ['A party', 'School', 'A trip'])]),
  ].map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P101', unit_id: 'U45', prompt: 'Write a short message to a new friend: your name, how old you are and where you live.', points: 'your name;your age;where you live', min_words: 20, max_words: 35 },
    { id: 'P102', unit_id: 'U46', prompt: 'Write a short postcard about yourself: where you are from, where you live and which languages you speak.', points: 'where you are from;where you live;your languages', min_words: 30, max_words: 40 },
    { id: 'P103', unit_id: 'U49', prompt: 'Write a short message to a friend: what to buy at the market, and how much of each.', points: 'two or three things;how much of each', min_words: 20, max_words: 35 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

// "I can" statements, on the CEFR self-assessment grid's A1 rows (as Dutch, Italian and Portuguese Part 2).
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

// Turned off in the gather (ids kept): too few lines for the circle's vocabulary, and the list word they would carry is
// taught by a twin form (vill for vilja, kronor for krona, havet for hav) or not on the list at all.
const thin = 'turned off in the gather: too few lines this early; its twin form carries the circle'
const off = Object.fromEntries(['namnet', 'mössa', 'storlek', 'kjol', 'numret', 'miljoner', 'landet', 'student', 'ljust', 'smutsig', 'priset', 'krona', 'flaskor', 'låda', 'hav', 'skog', 'blomma', 'sol'].map((f) => [f, thin]))
off.vilja = 'no natural A1 line (skulle vilja comes later); vill teaches the list word'
off['använda'] = "added late for coverage, but no line with the circle's words yet (Part 3 or 4)"

// Core words added after the ids were set (Kelly core, for coverage; each opens Tatoeba lines with the course's words),
// numbered after their range so nothing renumbers (situation ids stop at W1000, so most sit in the vocabulary circles). Time, food, directions, family and work words wait for Parts 3 and 4.
const late = [
  { unit_id: 'U47', words: ['säljer'] }, { unit_id: 'U49', words: ['ge'] },
  { unit_id: 'U36', words: ['hjälp', 'hoppas', 'tänker', 'väl', 'heller'] },
  { unit_id: 'U55', words: ['lyssnar', 'mening', 'exempel', 'bild', 'använda', 'räknar'] }, { unit_id: 'U56', words: ['verkar', 'saknar'] },
  { unit_id: 'U57', words: ['klarar', 'lika', 'möjligt', 'olika', 'helt', 'nog'] },
]

export default {
  part: 2, off, late, wordBase: 801, vocabBase: 1101, cdBase: 301,
  slots: [{ slot_id: 'C03', part: 2, after_row: 12 }, { slot_id: 'C04', part: 2, after_row: 14 }],
  situation, vocab, items, canDo,
}
