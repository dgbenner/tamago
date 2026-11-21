// Dutch A1 · Part 2, Everyday Life (Dan, 2026-11-20; Builder 2, branch content/nl-a1), in the format of Italian and
// Portuguese Part 2: names and spelling (T01, T02), phone numbers, age, where you live and where you are from (T03),
// numbers to 100, shopping and prices (T04); the help thread goes on (T13). Standard Dutch as spoken in the
// Netherlands; je and jij in the lessons, with u (the polite you) and uw met in U41 only, where being polite is the
// point; prices in euros. Words chosen for the course's frequency list (content-nl/a1-list.json, the 600 most frequent
// as the core target, 90% by the end of Part 4) where they fit the situations: Part 1 taught almost none of its small
// words (niet, met, maar, voor, geen, wel), so Part 2 brings them in early, where they open the most Tatoeba lines.
// Vocabulary themes stay clear of Part 1's (Body + Looks, Free Time, Around Town) and of Parts 3 and 4 (time; food,
// directions, home, family, work). Used by scripts/add-part.mjs (COURSE=nl PART=2).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U41', order: 101, row: 11, after: '', title: 'Your Name, Please', tasks: 'T01;T02',
    grammar: 'Hoe heet je? to a friend, Hoe heet u? politely: u, the polite you, takes the same verb form as jij after it (u bent, u heeft or u hebt); mijn naam is …; aangenaam; niet comes after the verb (ik ken hem niet)',
    words: ['naam', 'voornaam', 'achternaam', 'u', 'uw', 'meneer', 'mevrouw', 'ken', 'kent', 'kennen', 'aangenaam', 'me', 'mij', 'hem', 'niet', 'welkom', 'alstublieft'] },
  { unit_id: 'U34', order: 101.5, row: 11.5, after: 'row 11', title: 'Spelling It Out', help: true, tasks: 'T02;T13',
    grammar: 'Hoe schrijf je dat? Kun je dat spellen?: kunnen + a verb at the end; ik kan, jij kunt (kun je …? in a question), hij kan',
    words: ['schrijf', 'schrijft', 'schrijven', 'letter', 'kan', 'kun', 'kunt', 'spellen', 'even'] },
  { unit_id: 'U42', order: 102, row: 12, after: 'row 11', title: 'Phone Numbers', tasks: 'T02',
    grammar: 'Numbers 0 to 20; mijn nummer is …; bellen: ik bel, jij belt; elf to negentien; of (or)',
    words: ['nummer', 'telefoon', 'bel', 'belt', 'bellen', 'nul', 'één', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien', 'twintig', 'of'] },
  { unit_id: 'U43', order: 103, row: 12, after: 'row 11', title: 'Age + Birthdays', tasks: 'T03',
    grammar: 'Ik ben … jaar (oud): zijn for age; hoe oud ben je?; gefeliciteerd!; ik ben jarig (it is my birthday); al, pas, bijna',
    words: ['jarig', 'verjaardag', 'gefeliciteerd', 'maand', 'maanden', 'jaren', 'geboren', 'al', 'pas', 'bijna', 'ouder', 'jonger', 'baby', 'met'] },
  { unit_id: 'U35', order: 103.5, row: 12.5, after: 'row 12', title: 'Checking Numbers', help: true, tasks: 'T13',
    grammar: 'Een moment. Wacht even. Klopt dat? Dat is fout.', words: ['moment', 'wacht', 'klopt', 'precies', 'fout', 'oké', 'juist'] },
  { unit_id: 'U44', order: 104, row: 13, after: 'row 12', title: 'Numbers to 100', tasks: 'T04',
    grammar: 'Tens to 100: dertig … negentig, honderd; eenentwintig, tweeëntwintig: the unit first, then en, then the ten, all one word; meer dan, minder dan',
    words: ['dertig', 'veertig', 'vijftig', 'zestig', 'zeventig', 'tachtig', 'negentig', 'honderd', 'duizend', 'miljoen', 'meer', 'minder', 'dan', 'ongeveer'] },
  { unit_id: 'U45', order: 105, row: 13, after: 'row 12', title: 'Where You Live', tasks: 'T03',
    grammar: 'Ik woon in Utrecht: wonen; ik woon, jij woont; bij (at someone\'s house): ik woon bij mijn ouders; thuis (at home)',
    words: ['woon', 'woont', 'wonen', 'adres', 'land', 'buurt', 'dorp', 'thuis', 'buiten', 'binnen', 'bij', 'ouders', 'alleen', 'samen', 'plaats', 'mensen', 'hun'] },
  { unit_id: 'U46', order: 106, row: 14, after: 'row 13', title: 'Countries + Languages', tasks: 'T03',
    grammar: 'Ik kom uit Nederland: komen uit for where you are from; ik kom, jij komt; waar kom je vandaan?; languages and countries take a capital',
    words: ['Nederland', 'België', 'Duitsland', 'Frankrijk', 'Engeland', 'Spanje', 'Europa', 'kom', 'komt', 'komen', 'uit', 'vandaan', 'Frans', 'Duits', 'Spaans', 'taal', 'talen', 'spreekt', 'wereld'] },
  { unit_id: 'U47', order: 107, row: 14, after: 'row 13', title: 'At the Market', tasks: 'T04',
    grammar: 'Ik wil …, ik wil graag … (politer): willen; ik wil, jij wilt (wil je …?); ik moet … (I have to): moeten; ik neem …; een kilo …',
    words: ['markt', 'supermarkt', 'koop', 'kopen', 'wil', 'wilt', 'willen', 'neem', 'nemen', 'kilo', 'fruit', 'groente', 'ei', 'eieren', 'tomaat', 'banaan', 'nodig', 'iets', 'moet', 'moeten'] },
  { unit_id: 'U36', order: 107.5, row: 14.5, after: 'row 14', title: 'Checking You Understood', help: true, tasks: 'T13',
    grammar: 'Natuurlijk. Duidelijk. Echt? Zeker. Wat bedoel je? Bedankt!', words: ['natuurlijk', 'duidelijk', 'echt', 'zeker', 'bedoel', 'dus', 'snap', 'bedankt', 'wel'] },
  { unit_id: 'U48', order: 108, row: 15, after: 'row 14', title: 'How Much Is It?', tasks: 'T04',
    grammar: 'Wat kost het? Het kost … euro; kosten for more than one; het is duur, het is goedkoop; te duur (too dear)',
    words: ['kost', 'kosten', 'prijs', 'euro', 'cent', 'duur', 'goedkoop', 'betaal', 'betalen', 'geld', 'voor', 'maar', 'per', 'dollar'] },
  { unit_id: 'U49', order: 109, row: 15, after: 'row 14', title: 'Bottles + Bags', tasks: 'T04',
    grammar: 'Een fles water, een kilo appels: no van after a quantity; geen (not a, no) before a noun, niet before the rest; alle, elke',
    words: ['fles', 'pak', 'doos', 'zak', 'tas', 'glas', 'beetje', 'paar', 'genoeg', 'alle', 'alles', 'elke', 'elk', 'geen', 'stuk'] },
]

const vocab = [
  { unit_id: 'U54', order: 101.2, row: 11, after: '', title: 'Clothes',
    grammar: 'Ik draag …: dragen for what you wear; ik heb een jas aan (I have a coat on); de kleren (always plural)',
    words: ['kleren', 'broek', 'rok', 'jurk', 'jas', 'schoenen', 'trui', 'hoed', 'bril', 'draag', 'draagt', 'dragen', 'maat', 'aan'] },
  { unit_id: 'U55', order: 103.2, row: 12, after: 'row 11', title: 'In Class',
    grammar: 'Ik leer Nederlands: leren is to learn and to teach; een vraag, een antwoord; vragen (to ask): ik vraag, jij vraagt',
    words: ['les', 'klas', 'vraag', 'vragen', 'antwoord', 'pen', 'potlood', 'papier', 'leer', 'leert', 'leren', 'student', 'examen', 'huiswerk'] },
  { unit_id: 'U56', order: 105.2, row: 13, after: 'row 12', title: 'What People Are Like',
    grammar: 'Hij is aardig, een aardige man: an adjective takes -e before a de-word, and before a het-word after de, het or dit; een klein kind',
    words: ['dik', 'dun', 'kleine', 'lief', 'aardig', 'vriendelijk', 'grappig', 'rustig', 'gek', 'eerlijk', 'gelukkig', 'stil', 'saai', 'goede'] },
  { unit_id: 'U57', order: 107.2, row: 14, after: 'row 13', title: 'Opposites',
    grammar: 'Makkelijk, moeilijk; open, dicht; te (too) before an adjective: te moeilijk; beter (better), best (best)',
    words: ['open', 'dicht', 'makkelijk', 'moeilijk', 'vol', 'leeg', 'snel', 'langzaam', 'zwaar', 'licht', 'donker', 'schoon', 'vies', 'belangrijk', 'beter', 'nieuwe', 'oude'] },
  { unit_id: 'U58', order: 109.2, row: 15, after: 'row 14', title: 'Outdoors',
    grammar: 'Aan zee, in het bos, op de berg: aan, in and op for places; de zon, de lucht',
    words: ['zee', 'rivier', 'bos', 'berg', 'boom', 'bomen', 'bloem', 'bloemen', 'zon', 'lucht', 'gras'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Phone numbers in pairs after 06, as Dutch mobile numbers are said; prices in euros.
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const items = {
  a1_listen: [
    ['N101', 'U42', 'number', 'vijftien', '15'], ['N102', 'U42', 'number', 'zeventien', '17'], ['N103', 'U42', 'phone', 'nul zes, twaalf, vijftien, negentien, twintig', '06 12 15 19 20'],
    ['N104', 'U42', 'phone', 'nul zes, elf, zestien, achttien, veertien', '06 11 16 18 14'],
    ['N105', 'U43', 'number', 'Ik ben twintig jaar.', '20'], ['N106', 'U43', 'number', 'Zij is achttien jaar.', '18'],
    ['N107', 'U44', 'number', 'zeventig', '70'], ['N108', 'U44', 'number', 'negentig', '90'], ['N109', 'U44', 'number', 'vijfenveertig', '45'], ['N110', 'U44', 'number', 'negenennegentig', '99'],
    ['N111', 'U48', 'price', 'dertig euro', '30'], ['N112', 'U48', 'price', 'tien euro', '10'], ['N113', 'U48', 'price', 'honderd euro', '100'], ['N114', 'U48', 'price', 'vijftig euro', '50'],
  ].map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F101', unit_id: 'U45', card: 'Mijn naam is Jan de Vries. Ik ben veertig jaar. Ik woon in de Bloemstraat, nummer tien, in Utrecht.',
      fields: [{ key: 'first', label: 'Voornaam', rule: 'text', answer: 'Jan' }, { key: 'last', label: 'Achternaam', rule: 'text', answer: 'de Vries', also: ['De Vries', 'Vries'] }, { key: 'age', label: 'Leeftijd', rule: 'number', answer: '40' },
        { key: 'address', label: 'Adres', rule: 'text', answer: 'Bloemstraat 10', also: ['Bloemstraat, 10', 'bloemstraat 10', 'de Bloemstraat 10', 'Bloemstraat nummer tien'] }, { key: 'town', label: 'Woonplaats', rule: 'text', answer: 'Utrecht' }] },
    { id: 'F102', unit_id: 'U46', card: 'Mijn naam is Anna Bakker. Ik ben dertig jaar. Ik kom uit Nederland. Ik woon in Frankrijk. Mijn nummer is nul zes, twaalf, vijftien, negentien, twintig.',
      fields: [{ key: 'first', label: 'Voornaam', rule: 'text', answer: 'Anna' }, { key: 'last', label: 'Achternaam', rule: 'text', answer: 'Bakker' }, { key: 'age', label: 'Leeftijd', rule: 'number', answer: '30' },
        { key: 'nat', label: 'Nationaliteit', rule: 'text', answer: 'Nederlandse', also: ['Nederlands', 'nederlandse', 'nederlands'] }, { key: 'country', label: 'Land', rule: 'text', answer: 'Frankrijk' },
        { key: 'tel', label: 'Telefoon', rule: 'phone', answer: '06 12 15 19 20' }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: [
    text('R101', 'U47', 'sign', 'Op de markt', ['Groente en fruit', 'Appels: 2 euro per kilo', 'Markt: maandag en zaterdag'],
      [q('How much is a kilo of apples?', ['2 euros', '12 euros', '20 euros']), q('When is the market on?', ['Monday and Saturday', 'Every day', 'Only on Sunday'])]),
    text('R102', 'U47', 'notice', 'Markt op het plein', ['Markt op het plein', 'Elke woensdag', 'Fruit, groente, brood en kaas'],
      [q('When is the market?', ['On Wednesdays', 'On Mondays', 'Every day']), q('What can you buy there?', ['Fruit, vegetables, bread and cheese', 'Clothes and shoes', 'Books and maps'])]),
    text('R103', 'U47', 'message', 'Een bericht van Anna', ['Jan,', 'ik ben op de markt. Ik koop fruit en groente.', 'Wil je een appel?', 'Anna'],
      [q('Where is Anna?', ['At the market', 'At school', 'In the park']), q('What does she offer Jan?', ['An apple', 'A coffee', 'Some bread'])]),
    text('R104', 'U48', 'menu', 'De prijzen', ['Brood: 2 euro', 'Kaas: 15 euro', 'Melk: 1 euro', 'Water: 3 euro'],
      [q('How much is the cheese?', ['5 euros', '15 euros', '2 euros'], 1), q('What costs 2 euros?', ['The bread', 'The milk', 'The water'])]),
    text('R105', 'U48', 'menu', 'In het café', ['Koffie: 3 euro', 'Thee: 2 euro', 'Appeltaart: 4 euro'],
      [q('How much is a tea?', ['2 euros', '3 euros', '4 euros']), q('What costs the most?', ['The apple pie', 'The coffee', 'The tea'])]),
    text('R106', 'U48', 'notice', 'Oude boeken', ['Oude boeken', 'Eén boek: 5 euro', 'Drie boeken: 12 euro'],
      [q('How much is one book?', ['5 euros', '3 euros', '12 euros']), q('How much are three books?', ['12 euros', '15 euros', '10 euros'])]),
    text('R107', 'U49', 'message', 'Een bericht van Maria', ['Tom,', 'kun je een fles melk, een pak koffie en een kilo appels kopen?', 'Bedankt!', 'Maria'],
      [q('What does Maria want?', ['Milk, coffee and apples', 'Bread and water', 'Fruit and vegetables']), q('How much milk?', ['One bottle', 'Two bottles', 'A kilo'])]),
    text('R108', 'U49', 'sign', 'In de supermarkt', ['Water: zes flessen, 3 euro', 'Chocolade: twee dozen, 5 euro'],
      [q('How many bottles do you get for 3 euros?', ['Six', 'Three', 'Two']), q('What costs 5 euros?', ['Two boxes of chocolate', 'Six bottles of water', 'One box of chocolate'])]),
    text('R109', 'U49', 'message', 'Voor het feest', ['Voor het feest:', 'twee flessen sap,', 'een doos chocolade,', 'veel fruit!'],
      [q('How many bottles of juice?', ['Two', 'One', 'Three']), q('What is the list for?', ['A party', 'School', 'A trip'])]),
  ].map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P101', unit_id: 'U45', prompt: 'Write a short message to a new friend: your name, how old you are and where you live.', points: 'your name;your age;where you live', min_words: 20, max_words: 35 },
    { id: 'P102', unit_id: 'U46', prompt: 'Write a short postcard about yourself: where you are from, where you live and which languages you speak.', points: 'where you are from;where you live;your languages', min_words: 30, max_words: 40 },
    { id: 'P103', unit_id: 'U49', prompt: 'Write a short message to a friend: what to buy at the market, and how much of each.', points: 'two or three things;how much of each', min_words: 20, max_words: 35 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

// "I can" statements, on the CEFR self-assessment grid's A1 rows (as Italian and Portuguese Part 2).
const canDo = {
  U41: [['speaking', 'Spoken interaction', 'I can say my name and ask someone theirs, politely or to a friend.']],
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

export default {
  part: 2, wordBase: 801, vocabBase: 1101, cdBase: 301,
  slots: [{ slot_id: 'C03', part: 2, after_row: 12 }, { slot_id: 'C04', part: 2, after_row: 14 }],
  situation, vocab, items, canDo,
}
