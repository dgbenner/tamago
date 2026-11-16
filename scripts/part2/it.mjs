// Italian A1 · Part 2, Everyday Life (Dan, 2026-11-15, overnight build), after Spanish and German Part 2: standard
// Italian as spoken in Italy; tu with friends, Lei (the polite you, the same word as lei, she) taught in U41; prices in
// euro. Words chosen for the Kelly A1 list's 600 most frequent (the core target, 90% by the end of Part 4) where they fit
// the situations, plus the numbers A1 needs, and checked against Tatoeba's short trusted lines. Vocabulary themes stay
// clear of Part 1's (Body + Looks, Free Time, Around Town) and of Parts 3 and 4 (time; food, directions, home, family,
// work). Used by scripts/add-part.mjs (COURSE=it PART=2).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U41', order: 101, row: 11, after: '', title: 'Your Name, Please', tasks: 'T01;T02',
    grammar: 'Come ti chiami? to a friend, Come si chiama? politely: Lei, the polite you, takes the lei form; mi chiamo …; piacere',
    words: ['nome', 'cognome', 'chiamo', 'chiami', 'piacere', 'signore', 'signora', 'persona', 'conosco', 'conoscere', 'presento', 'presentare'] },
  { unit_id: 'U34', order: 101.5, row: 11.5, after: 'row 11', title: 'Spelling It Out', help: true, tasks: 'T02;T13',
    grammar: 'Come si scrive? Può ripetere?: potere + a verb; posso, puoi, può', words: ['scrive', 'scrivere', 'lettera', 'può', 'posso', 'puoi', 'chiedo', 'chiedere'] },
  { unit_id: 'U42', order: 102, row: 12, after: 'row 11', title: 'Phone Numbers', tasks: 'T02',
    grammar: 'Numbers 0 to 20; il mio numero è …; sei is six and you are',
    words: ['numero', 'telefono', 'cellulare', 'chiamare', 'zero', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove', 'venti', 'messaggio'] },
  { unit_id: 'U43', order: 103, row: 12, after: 'row 11', title: 'Age + Birthdays', tasks: 'T03',
    grammar: 'Ho … anni: avere for age; quanti anni hai?; buon compleanno!; sono nato, sono nata',
    words: ['anno', 'anni', 'età', 'compleanno', 'mese', 'mesi', 'auguri', 'buon', 'nato', 'nata', 'vita'] },
  { unit_id: 'U35', order: 103.5, row: 12.5, after: 'row 12', title: 'Checking Numbers', help: true, tasks: 'T13',
    grammar: 'Un momento. Aspetta. È giusto? Certo.', words: ['momento', 'attimo', 'aspetta', 'giusto', 'certo', 'subito'] },
  { unit_id: 'U44', order: 104, row: 13, after: 'row 12', title: 'Numbers to 100', tasks: 'T04',
    grammar: 'Tens to 100: trenta … novanta, cento, mille, un milione; ventuno, ventotto: the tens drop their last vowel before uno and otto',
    words: ['trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta', 'cento', 'mille', 'milione'] },
  { unit_id: 'U45', order: 105, row: 13, after: 'row 12', title: 'Where You Live', tasks: 'T03',
    grammar: 'Abito a Roma, in Italia: a with towns, in with countries; vivo, vivi, vive (-ere verbs); vicino a, lontano da',
    words: ['abito', 'abiti', 'abita', 'vivo', 'vivi', 'vive', 'vivere', 'indirizzo', 'via', 'appartamento', 'vicino', 'lontano', 'centro', 'zona', 'luogo', 'posto', 'nostro', 'nostra', 'resto', 'restare'] },
  { unit_id: 'U46', order: 106, row: 14, after: 'row 13', title: 'Countries + Languages', tasks: 'T03',
    grammar: 'Sono italiano, sono italiana: nationalities agree; parlo, parli, parla: -are verbs; languages take no capital',
    words: ['Italia', 'Francia', 'Germania', 'Spagna', 'Europa', 'mondo', 'francese', 'tedesco', 'spagnolo', 'italiana', 'lingua', 'parlo', 'straniero', 'europeo'] },
  { unit_id: 'U47', order: 107, row: 14, after: 'row 13', title: 'At the Market', tasks: 'T04',
    grammar: 'Voglio …, vorrei … (politer): volere; devo, deve: dovere; ho bisogno di …; prendo, compro; un chilo di …',
    words: ['mercato', 'comprare', 'compro', 'voglio', 'vuoi', 'vorrei', 'prendo', 'prendere', 'chilo', 'frutta', 'verdura', 'uova', 'trovo', 'qualcosa', 'bisogno', 'devo', 'deve', 'dovere'] },
  { unit_id: 'U36', order: 107.5, row: 14.5, after: 'row 14', title: 'Checking You Understood', help: true, tasks: 'T13',
    grammar: "D'accordo. Chiaro. Ho capito. Vero?", words: ["d'accordo", 'chiaro', 'capito', 'vero', 'esatto', 'cioè'] },
  { unit_id: 'U48', order: 108, row: 15, after: 'row 14', title: 'How Much Is It?', tasks: 'T04',
    grammar: 'Quanto costa? Costa … euro; costano for more than one; è caro, è economico; il conto',
    words: ['quanto', 'costa', 'costano', 'prezzo', 'euro', 'centesimi', 'caro', 'cara', 'economico', 'pago', 'pagare', 'soldi', 'carta', 'conto', 'spesa', 'meno', 'costo', 'cambio'] },
  { unit_id: 'U49', order: 109, row: 15, after: 'row 14', title: 'Bottles + Bags', tasks: 'T04',
    grammar: "Una bottiglia di …, un pacchetto di …: di after a quantity; troppo, poco, un po'; ogni, altro",
    words: ['bottiglia', 'pacchetto', 'scatola', 'bicchiere', 'borsa', 'abbastanza', 'troppo', 'poco', 'tanto', 'tutto', "po'", 'biscotti', 'ogni', 'altro', 'quello', 'quella', 'qualche', 'nessuno'] },
]

const vocab = [
  { unit_id: 'U54', order: 101.2, row: 11, after: '', title: 'Clothes',
    grammar: 'Porto, porti: portare for what you wear; i vestiti; gli occhiali (always plural)',
    words: ['vestiti', 'pantaloni', 'gonna', 'camicia', 'scarpe', 'vestito', 'giacca', 'cappello', 'occhiali', 'orologio', 'porto', 'porti'] },
  { unit_id: 'U55', order: 103.2, row: 12, after: 'row 11', title: 'In Class',
    grammar: 'Studio, studi: -are verbs; imparare; una domanda, una risposta; per esempio',
    words: ['classe', 'domanda', 'risposta', 'pagina', 'penna', 'matita', 'dizionario', 'esame', 'studiare', 'studio', 'imparare', 'esempio', 'corso', 'insegnante', 'università', 'spiega', 'spiegare'] },
  { unit_id: 'U56', order: 105.2, row: 13, after: 'row 12', title: 'Looks',
    grammar: 'È basso, è bassa: adjectives agree; essere for what someone is like; ha la barba',
    words: ['basso', 'bassa', 'magro', 'magra', 'biondo', 'bionda', 'barba', 'intelligente', 'lungo', 'lunga', 'corto', 'corta', 'diverso', 'stesso', 'uguale'] },
  { unit_id: 'U57', order: 107.2, row: 14, after: 'row 13', title: 'Opposites',
    grammar: 'Facile, difficile: adjectives in -e are the same for both genders; è importante',
    words: ['veloce', 'lento', 'facile', 'difficile', 'interessante', 'cattivo', 'brutto', 'aperto', 'chiuso', 'pieno', 'vuoto', 'semplice', 'possibile', 'importante', 'utile', 'necessario', 'speciale', 'breve', 'unico'] },
  { unit_id: 'U58', order: 109.2, row: 15, after: 'row 14', title: 'Outdoors',
    grammar: 'Al mare, in montagna, in campagna: a and in for places; il sole, la luce',
    words: ['spiaggia', 'montagna', 'campagna', 'mare', 'fiume', 'sole', 'lago', 'bosco', 'cielo', 'terra', 'luce', 'natura', 'albero', 'fiore', 'campo', 'ambiente', 'spazio'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Phone numbers in pairs, prices in euro. Three Read and Answer texts in each circle that has them.
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const items = {
  a1_listen: [
    ['N101', 'U42', 'number', 'quindici', '15'], ['N102', 'U42', 'number', 'diciassette', '17'], ['N103', 'U42', 'phone', 'zero, tre, undici, quindici, diciannove, venti', '03 11 15 19 20'],
    ['N104', 'U42', 'phone', 'zero, sette, dodici, sedici, diciotto, quattordici', '07 12 16 18 14'],
    ['N105', 'U43', 'number', 'Ho venti anni.', '20'], ['N106', 'U43', 'number', 'Lei ha diciotto anni.', '18'],
    ['N107', 'U44', 'number', 'settanta', '70'], ['N108', 'U44', 'number', 'novanta', '90'], ['N109', 'U44', 'number', 'quarantacinque', '45'], ['N110', 'U44', 'number', 'novantanove', '99'],
    ['N111', 'U48', 'price', 'trenta euro', '30'], ['N112', 'U48', 'price', 'dieci euro', '10'], ['N113', 'U48', 'price', 'cento euro', '100'], ['N114', 'U48', 'price', 'cinquanta euro', '50'],
  ].map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F101', unit_id: 'U45', card: 'Mi chiamo Marco Rossi. Ho quaranta anni. Abito in via Roma, numero dieci, a Milano.',
      fields: [{ key: 'first', label: 'Nome', rule: 'text', answer: 'Marco' }, { key: 'last', label: 'Cognome', rule: 'text', answer: 'Rossi' }, { key: 'age', label: 'Età', rule: 'number', answer: '40' },
        { key: 'address', label: 'Indirizzo', rule: 'text', answer: 'Via Roma 10', also: ['via Roma, 10', 'Via Roma, 10', 'via Roma 10', 'via Roma numero dieci', 'Roma 10'] }, { key: 'town', label: 'Città', rule: 'text', answer: 'Milano' }] },
    { id: 'F102', unit_id: 'U46', card: 'Mi chiamo Anna Bianchi. Ho trenta anni. Sono italiana. Abito in Francia. Il mio numero è zero, tre, undici, quindici, diciannove, venti.',
      fields: [{ key: 'first', label: 'Nome', rule: 'text', answer: 'Anna' }, { key: 'last', label: 'Cognome', rule: 'text', answer: 'Bianchi' }, { key: 'age', label: 'Età', rule: 'number', answer: '30' },
        { key: 'nat', label: 'Nazionalità', rule: 'text', answer: 'italiana', also: ['italiano'] }, { key: 'country', label: 'Paese', rule: 'text', answer: 'Francia' },
        { key: 'tel', label: 'Telefono', rule: 'phone', answer: '03 11 15 19 20' }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: [
    text('R101', 'U47', 'sign', 'Al mercato', ['Frutta e verdura', 'Mele: 3 euro al chilo', 'Il mercato: lunedì e sabato'],
      [q('How much is a kilo of apples?', ['3 euros', '13 euros', '30 euros']), q('When is the market on?', ['Monday and Saturday', 'Every day', 'Only on Sunday'])]),
    text('R102', 'U47', 'notice', 'Il mercato in piazza', ['Mercato in piazza', 'La domenica', 'Frutta, verdura, pane e formaggio'],
      [q('When is the market?', ['On Sundays', 'On Mondays', 'Every day']), q('What can you buy there?', ['Fruit, vegetables, bread and cheese', 'Clothes and shoes', 'Books and maps'])]),
    text('R103', 'U47', 'message', 'Un messaggio di Giulia', ['Marco,', 'al mercato compro frutta e verdura.', 'Vuoi una mela?', 'Giulia'],
      [q('Where is Giulia?', ['At the market', 'At school', 'In the park']), q('What does she offer Marco?', ['An apple', 'A coffee', 'Some bread'])]),
    text('R104', 'U48', 'menu', 'I prezzi', ['Pane: 2 euro', 'Formaggio: 5 euro', 'Latte: 1 euro', 'Acqua: 1 euro'],
      [q('How much is the cheese?', ['1 euro', '5 euros', '2 euros'], 1), q('What costs 2 euros?', ['The bread', 'The milk', 'The water'])]),
    text('R105', 'U48', 'menu', 'Al bar', ['Caffè: 1 euro', 'Tè: 2 euro', 'Vino: 4 euro'],
      [q('How much is a tea?', ['2 euros', '1 euro', '4 euros']), q('What costs the most?', ['The wine', 'The coffee', 'The tea'])]),
    text('R106', 'U48', 'notice', 'Libri usati', ['Libri usati', 'Un libro: 3 euro', 'Tre libri: 8 euro'],
      [q('How much is one book?', ['3 euros', '5 euros', '13 euros']), q('How much are three books?', ['8 euros', '9 euros', '6 euros'])]),
    text('R107', 'U49', 'message', 'Un messaggio di Maria', ['Tom,', 'puoi comprare una bottiglia di latte, un pacchetto di biscotti e un chilo di mele?', 'Grazie!', 'Maria'],
      [q('What does Maria want?', ['Milk, biscuits and apples', 'Bread and water', 'Fruit and vegetables']), q('How much milk?', ['One bottle', 'Two bottles', 'A kilo'])]),
    text('R108', 'U49', 'sign', 'Al supermercato', ['Acqua: sei bottiglie, 3 euro', 'Biscotti: due pacchetti, 4 euro'],
      [q('How many bottles do you get for 3 euros?', ['Six', 'Three', 'Two']), q('What costs 4 euros?', ['Two packets of biscuits', 'Six bottles of water', 'One packet of biscuits'])]),
    text('R109', 'U49', 'message', 'Per la festa', ['Per la festa:', 'due bottiglie di vino,', 'una scatola di biscotti,', 'tanta frutta!'],
      [q('How many bottles of wine?', ['Two', 'One', 'Three']), q('What is the list for?', ['A party', 'School', 'A trip'])]),
  ].map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P101', unit_id: 'U45', prompt: 'Write a short message to a new friend: your name, how old you are and where you live.', points: 'your name;your age;where you live', min_words: 20, max_words: 35 },
    { id: 'P102', unit_id: 'U46', prompt: 'Write a short postcard about yourself: where you are from, where you live and which languages you speak.', points: 'where you are from;where you live;your languages', min_words: 30, max_words: 40 },
    { id: 'P103', unit_id: 'U49', prompt: 'Write a short message to a friend: what to buy at the market, and how much of each.', points: 'two or three things;how much of each', min_words: 20, max_words: 35 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

// "I can" statements, on the CEFR self-assessment grid's A1 rows (as Spanish and German Part 2).
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
  U56: [['speaking', 'Spoken production', 'I can describe what someone looks like: tall or short, fair or dark.']],
  U57: [['reading', 'Reading', 'I can understand simple descriptions: easy or hard, fast or slow, open or closed.']],
  U58: [['reading', 'Reading', 'I can recognise everyday words for the countryside and the outdoors.']],
}

export default {
  part: 2, wordBase: 801, vocabBase: 1101, cdBase: 301,
  slots: [{ slot_id: 'C03', part: 2, after_row: 12 }, { slot_id: 'C04', part: 2, after_row: 14 }],
  situation, vocab, items, canDo,
  // Turned off in review (2026-11-15): kept as ids, never shown.
  off: {
    dovere: 'the infinitive has no natural A1 line; devo and deve teach the list word',
    cambio: 'money change is il resto in Italian, and cambio is currency exchange: no clear A1 line',
  },
}
