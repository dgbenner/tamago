// German A1 · Part 2, Everyday Life (Dan, 2026-11-14), after French Part 2: standard German as spoken in Germany, du
// and Sie, prices in euros. Words from Goethe Start Deutsch 1 where they fit the situations (plus the numbers, which A1
// needs), checked against Tatoeba first (scripts/circle-feasibility.mjs). Vocabulary themes stay clear of Part 1's
// (Free Time, People and Feelings, Around Town) and of Parts 3 and 4 (time; food, directions, home, family, work).
// Body words, which Tatoeba couldn't support by Part 1's row 7, fit here.
// Used by scripts/add-part2.mjs.
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U41', order: 101, row: 11, after: '', title: 'Your Name, Please', tasks: 'T01;T02',
    grammar: 'Wie heißen Sie? Wie heißt du?: Sie with the -en form, du with -st; Ihr Name (polite), dein Name',
    words: ['Name', 'Vorname', 'heiße', 'heißen', 'Ihr', 'Ihre'] },
  { unit_id: 'U34', order: 101.5, row: 11.5, after: 'row 11', title: 'Spelling It Out', help: true, tasks: 'T02;T13',
    grammar: 'Wie schreibt man das? Können Sie das buchstabieren?: können + a verb at the end', words: ['schreibt', 'schreiben', 'Buchstabe', 'buchstabieren', 'können'] },
  { unit_id: 'U42', order: 102, row: 12, after: 'row 11', title: 'Phone Numbers', tasks: 'T02',
    grammar: 'Numbers 0 to 20; meine Nummer ist …; dreizehn to neunzehn: the unit, then -zehn',
    words: ['Nummer', 'Telefonnummer', 'Handy', 'anrufen', 'null', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn', 'zwanzig'] },
  { unit_id: 'U43', order: 103, row: 12, after: 'row 11', title: 'Age + Birthdays', tasks: 'T03',
    grammar: 'Ich bin … Jahre alt: sein for age; Wie alt bist du?; Alles Gute zum Geburtstag!', words: ['Jahre', 'Jahr', 'Alter', 'Geburtstag', 'Monate', 'geboren'] },
  { unit_id: 'U35', order: 103.5, row: 12.5, after: 'row 12', title: 'Checking Numbers', help: true, tasks: 'T13',
    grammar: 'Einen Moment, bitte. Ist das richtig? Nein, das ist falsch.', words: ['Moment', 'Augenblick', 'richtig', 'falsch'] },
  { unit_id: 'U44', order: 104, row: 13, after: 'row 12', title: 'Numbers to 100', tasks: 'T04',
    grammar: 'Tens to 100: dreißig … neunzig, hundert; einundzwanzig: the unit first, then und, then the ten',
    words: ['dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig', 'hundert'] },
  { unit_id: 'U45', order: 105, row: 13, after: 'row 12', title: 'Where You Live', tasks: 'T03',
    grammar: 'Ich wohne, du wohnst, er wohnt: regular verbs; wohnen in …; weit, nah',
    words: ['wohne', 'wohnst', 'wohnt', 'wohnen', 'Adresse', 'Wohnung', 'Land', 'Postleitzahl', 'weit', 'nah'] },
  { unit_id: 'U46', order: 106, row: 14, after: 'row 13', title: 'Countries + Languages', tasks: 'T03',
    grammar: 'Ich komme aus Deutschland; ich spreche, du sprichst, er spricht: sprechen changes its vowel',
    words: ['Deutschland', 'Frankreich', 'Spanien', 'Italien', 'England', 'Österreich', 'Französisch', 'Spanisch', 'Sprache', 'Sprachen', 'spreche', 'sprichst', 'spricht'] },
  { unit_id: 'U47', order: 107, row: 14, after: 'row 13', title: 'At the Market', tasks: 'T04',
    grammar: 'Ich kaufe, du kaufst; ich brauche …: the thing you buy takes einen for der words; ein Kilo …',
    words: ['Markt', 'kaufen', 'kaufe', 'kaufst', 'Kilo', 'Obst', 'Gemüse', 'Tomaten', 'Kartoffeln', 'brauche'] },
  { unit_id: 'U36', order: 107.5, row: 14.5, after: 'row 14', title: 'Checking You Understood', help: true, tasks: 'T13',
    grammar: 'Genau. Klar. Verstanden. Stimmt das?', words: ['genau', 'klar', 'verstanden', 'stimmt'] },
  { unit_id: 'U48', order: 108, row: 15, after: 'row 14', title: 'How Much Is It?', tasks: 'T04',
    grammar: 'Was kostet das? Das kostet … Euro; kosten for more than one; billig, teuer',
    words: ['kostet', 'kosten', 'Euro', 'Cent', 'Preis', 'bezahlen', 'zahlen', 'Karte', 'bar', 'billig', 'teuer', 'zusammen'] },
  { unit_id: 'U49', order: 109, row: 15, after: 'row 14', title: 'Bottles + Bags', tasks: 'T04',
    grammar: 'Eine Flasche Wasser, ein Glas Milch: no word for "of" after a quantity; wenig, genug, mehr',
    words: ['Flasche', 'Packung', 'Glas', 'Tüte', 'Tasche', 'wenig', 'genug', 'mehr', 'Kekse'] },
]

const vocab = [
  { unit_id: 'U54', order: 101.2, row: 11, after: '', title: 'Body',
    grammar: 'Der Kopf tut weh: wehtun for pain; mein Arm, meine Hand: mein and meine',
    words: ['Kopf', 'Hand', 'Fuß', 'Arm', 'Augen', 'Haare', 'Mund', 'Bauch', 'tut', 'weh'] },
  { unit_id: 'U55', order: 103.2, row: 12, after: 'row 11', title: 'In Class',
    grammar: 'Ich lerne, du lernst: regular verbs; eine Frage, der Tisch, der Stuhl',
    words: ['Frage', 'Papier', 'Kugelschreiber', 'Bleistift', 'Wörterbuch', 'Tisch', 'Stuhl', 'Prüfung', 'lernen', 'lerne', 'lernst'] },
  { unit_id: 'U56', order: 105.2, row: 13, after: 'row 12', title: 'Clothes',
    grammar: 'Ich trage, du trägst, er trägt: tragen changes its vowel; die Hose, das Hemd, die Schuhe',
    words: ['Kleidung', 'Hose', 'Hemd', 'Rock', 'Kleid', 'Jacke', 'Schuhe', 'Mantel', 'Brille', 'trage', 'trägt', 'trägst'] },
  { unit_id: 'U57', order: 107.2, row: 14, after: 'row 13', title: 'Opposites',
    grammar: 'Das ist einfach, das ist schwierig: an adjective after sein never changes',
    words: ['schnell', 'langsam', 'leicht', 'schwer', 'einfach', 'schwierig', 'interessant', 'schlecht', 'offen', 'geschlossen'] },
  { unit_id: 'U58', order: 109.2, row: 15, after: 'row 14', title: 'Outdoors',
    grammar: 'Der Berg, der Wald, der See: im Wald, am See (in dem, an dem)',
    words: ['Berg', 'Wald', 'See', 'Fluss', 'Himmel', 'Baum', 'Blume', 'Blumen'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words (Tatoeba has nothing in these
// shapes), so drafts for the native-speaker check. Phone numbers in pairs, prices in euros.
const items = {
  a1_listen: [
    ['N101', 'U42', 'number', 'fünfzehn', '15'], ['N102', 'U42', 'number', 'siebzehn', '17'], ['N103', 'U42', 'phone', 'null, sechs, elf, fünfzehn, neunzehn, zwanzig', '06 11 15 19 20'],
    ['N104', 'U42', 'phone', 'null, sieben, zwölf, sechzehn, achtzehn, vierzehn', '07 12 16 18 14'],
    ['N105', 'U43', 'number', 'Ich bin zwanzig Jahre alt.', '20'], ['N106', 'U43', 'number', 'Sie ist achtzehn Jahre alt.', '18'],
    ['N107', 'U44', 'number', 'siebzig', '70'], ['N108', 'U44', 'number', 'neunzig', '90'], ['N109', 'U44', 'number', 'fünfundvierzig', '45'], ['N110', 'U44', 'number', 'neunundneunzig', '99'],
    ['N111', 'U48', 'price', 'drei Euro fünfzig', '3.50'], ['N112', 'U48', 'price', 'zehn Euro', '10'], ['N113', 'U48', 'price', 'ein Euro zwanzig', '1.20'], ['N114', 'U48', 'price', 'fünfundzwanzig Euro', '25'],
  ].map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F101', unit_id: 'U45', card: 'Ich heiße Tom Becker. Ich bin vierzig Jahre alt. Ich wohne in der Parkstraße zehn, in Hamburg.',
      fields: [{ key: 'last', label: 'Name', rule: 'text', answer: 'Becker' }, { key: 'first', label: 'Vorname', rule: 'text', answer: 'Tom' }, { key: 'age', label: 'Alter', rule: 'number', answer: '40' },
        { key: 'address', label: 'Adresse', rule: 'text', answer: 'Parkstraße 10', also: ['Parkstrasse 10', 'Parkstraße zehn', 'Parkstr. 10'] }, { key: 'town', label: 'Stadt', rule: 'text', answer: 'Hamburg' }] },
    { id: 'F102', unit_id: 'U46', card: 'Ich heiße Anna Weber. Ich bin dreißig Jahre alt. Ich komme aus Österreich. Ich wohne in Deutschland. Meine Nummer ist null, sechs, elf, fünfzehn, neunzehn, zwanzig.',
      fields: [{ key: 'first', label: 'Vorname', rule: 'text', answer: 'Anna' }, { key: 'last', label: 'Name', rule: 'text', answer: 'Weber' }, { key: 'age', label: 'Alter', rule: 'number', answer: '30' },
        { key: 'from', label: 'Herkunftsland', rule: 'text', answer: 'Österreich', also: ['Oesterreich', 'Osterreich'] }, { key: 'country', label: 'Wohnort (Land)', rule: 'text', answer: 'Deutschland' },
        { key: 'tel', label: 'Telefon', rule: 'phone', answer: '06 11 15 19 20' }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: [
    { id: 'R101', unit_id: 'U47', kind: 'sign', title: 'Auf dem Markt', lines: ['Obst und Gemüse', 'Äpfel: 2 € das Kilo', 'Der Markt: Montag und Samstag'],
      questions: [{ question: 'How much is a kilo of apples?', choices: ['€2', '€3', '€20'], answer: 0 }, { question: 'When is the market on?', choices: ['Monday and Saturday', 'Every day', 'Only on Saturday'], answer: 0 }] },
    { id: 'R102', unit_id: 'U48', kind: 'menu', title: 'Die Preise', lines: ['Brot: 1 €', 'Käse: 4,50 €', 'Milch: 1,20 €', 'Wasser: 0,80 €'],
      questions: [{ question: 'How much is the cheese?', choices: ['€1.20', '€4.50', '€0.80'], answer: 1 }, { question: 'What costs €1?', choices: ['The bread', 'The milk', 'The water'], answer: 0 }] },
    { id: 'R103', unit_id: 'U49', kind: 'message', title: 'Eine Nachricht von Anna', lines: ['Tom,', 'kannst du eine Flasche Milch, eine Packung Kekse und ein Kilo Äpfel kaufen?', 'Danke!', 'Anna'],
      questions: [{ question: 'What does Anna want from the shop?', choices: ['Milk, cookies and apples', 'Bread and water', 'Fruit and vegetables'], answer: 0 }, { question: 'How much milk?', choices: ['One bottle', 'Two bottles', 'A kilo'], answer: 0 }] },
  ].map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P101', unit_id: 'U45', prompt: 'Write a short message to a new friend: your name, how old you are and where you live.', points: 'your name;your age;where you live', min_words: 20, max_words: 35 },
    { id: 'P102', unit_id: 'U46', prompt: 'Write a short postcard about yourself: where you are from, where you live and which languages you speak.', points: 'where you are from;where you live;your languages', min_words: 30, max_words: 40 },
    { id: 'P103', unit_id: 'U49', prompt: 'Write a short message to a friend: what to buy at the market, and how much of each.', points: 'two or three things;how much of each', min_words: 20, max_words: 35 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

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
  U54: [['speaking', 'Spoken production', 'I can name parts of the body and say where it hurts.']],
  U55: [['reading', 'Reading', 'I can understand everyday words for the classroom.']],
  U56: [['speaking', 'Spoken production', 'I can say what someone is wearing.']],
  U57: [['reading', 'Reading', 'I can understand simple descriptions: easy or hard, fast or slow, open or closed.']],
  U58: [['reading', 'Reading', 'I can recognise everyday words for the countryside and the outdoors.']],
}

// Added for coverage (Dan's target, 2026-11-14: a quarter of the gap to 90% of Goethe Start Deutsch 1, about 41%):
// official-list words in the vocabulary circles only, checked against Tatoeba first. Numbered after every vocabulary
// word, so no id moves.
const late = [
  { unit_id: 'U55', words: ['Klasse', 'Fehler', 'Beispiel', 'fragen', 'antworten', 'erklären', 'Satz', 'Text', 'Aufgabe', 'Lösung', 'Test', 'Unterricht', 'Bild'] },
  { unit_id: 'U57', words: ['kurz', 'laut', 'leise', 'hell', 'kaputt', 'frei', 'besetzt', 'fertig', 'möglich', 'spät', 'breit', 'aber', 'oder'] },
  { unit_id: 'U58', words: ['draußen', 'wandern', 'Wind', 'Welt', 'immer', 'oft'] },
  // From Fable's German Part 2 check (2026-11-14): "Tom kommt zu spät" needs zu (only zu Hause was known), and a
  // mountain is hoch, not groß. Both on the Goethe list.
  { unit_id: 'U57', words: ['zu'] },
  { unit_id: 'U58', words: ['hoch'] },
]

export default { situation, vocab, items, canDo, late, off: {} }
