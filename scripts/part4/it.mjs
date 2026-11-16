// Italian A1 · Part 4, Out and About (Dan, 2026-11-16, overnight build), the last part, in the format of French and
// Spanish Part 4: the café and the restaurant (T07), asking the way and getting around (T08), family, home and work
// (T06), forms (T10) and messages (T11); the help thread ends (T13). Standard Italian as spoken in Italy.
// The Kelly A1 list's 600 most frequent words are the target (90% by the end of this part), and many of the ones left
// are the list's formal and abstract words (it is drawn from a web corpus): the situation circles carry the ones that
// fit them (the forms circle its office words, the messages circle its media words), and the five vocabulary circles
// carry the rest as ideas and things, describing words, rules and offices, and two sets of everyday verbs, given in
// natural present forms (offre, permette, contiene) where the bare infinitive would make awkward A1 lines; a present
// form counts for its infinitive. Read and Answer has three texts per circle that has it.
// Used by scripts/add-part.mjs (COURSE=it PART=4).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U81', order: 121, row: 21, after: '', title: 'At the Café', tasks: 'T07',
    grammar: 'Un caffè per me, per favore; prendiamo (we will have), offro io (my treat); basta così (that is enough)',
    words: ['bar', 'cameriere', 'birra', 'succo', 'zucchero', 'cornetto', 'me', 'prendiamo', 'offro', 'offre', 'basta', 'bastare'] },
  { unit_id: 'U26', order: 121.5, row: 21.5, after: 'row 21', title: 'Excuse Me', help: true, tasks: 'T13',
    grammar: 'Permesso? (may I come through?); mi fa un favore?; c\'è qualcuno?; nessun problema', words: ['permesso', 'favore', 'qualcuno', 'nessun', 'aiuto', 'aiutare'] },
  { unit_id: 'U82', order: 122, row: 22, after: 'row 21', title: 'At the Restaurant', tasks: 'T07;T09',
    grammar: 'Ordinare: ordino, ordini; il primo (pasta or soup) and il secondo (meat or fish); un piatto di …',
    words: ['menù', 'piatto', 'carne', 'pollo', 'pasta', 'insalata', 'dolce', 'ordino', 'ordinare', 'qualità', 'prodotto', 'prodotti'] },
  { unit_id: 'U83', order: 123, row: 22, after: 'row 21', title: 'Asking the Way', tasks: 'T08',
    grammar: 'A destra, a sinistra, dritto; davanti a, dietro, di fronte a, sotto: words for where; a cento metri',
    words: ['sinistra', 'destra', 'dritto', 'sotto', 'fronte', 'davanti', 'dietro', 'presso', 'attraverso', 'metri', 'diretto', 'direttamente', 'percorso', 'posizione'] },
  { unit_id: 'U27', order: 123.5, row: 22.5, after: 'row 22', title: "I'm Lost", help: true, tasks: 'T13;T08',
    grammar: 'Mi sono perso, mi sono persa: I am lost; mi può aiutare?; gira a destra', words: ['perso', 'persa', 'mappa', 'gira', 'indietro'] },
  { unit_id: 'U84', order: 124, row: 23, after: 'row 22', title: 'Getting Around', tasks: 'T08',
    grammar: 'Guidare: guido; salire (salgo) and scendere (scendo); in macchina, in tram, a piedi; entro le otto (by eight)',
    words: ['guidare', 'guido', 'tram', 'traffico', 'rete', 'scendo', 'scendere', 'salgo', 'salire', 'raggiungere', 'entro', 'mezzi'] },
  { unit_id: 'U85', order: 125, row: 23, after: 'row 22', title: 'My Family', tasks: 'T06',
    grammar: 'Mio padre, mia madre: no article before a family member in the singular, but i miei genitori; sposato, sposata',
    words: ['figlio', 'figlia', 'figli', 'fratello', 'sorella', 'marito', 'moglie', 'genitori', 'nonno', 'nonna', 'zio', 'zia', 'sposato', 'sposata', 'carattere', 'rapporto'] },
  { unit_id: 'U86', order: 126, row: 24, after: 'row 23', title: 'At Home', tasks: 'T06',
    grammar: 'La mia casa ha tre stanze; la camera da letto; all\'interno (inside); un oggetto, gli oggetti',
    words: ['stanza', 'camera', 'finestra', 'porta', 'sedia', 'divano', 'armadio', 'frigorifero', 'interno', 'oggetto', 'oggetti', 'costruire'] },
  { unit_id: 'U87', order: 127, row: 24, after: 'row 23', title: 'At Work', tasks: 'T06',
    grammar: 'Lavoro in un\'azienda; faccio l\'impiegato: fare + the job; il mio capo, i miei colleghi',
    words: ['collega', 'capo', 'azienda', 'impresa', 'progetto', 'riunione', 'esperienza', 'professionale', 'contratto', 'personale', 'settore', 'impiegato', 'stipendio', 'gestione'] },
  { unit_id: 'U28', order: 127.5, row: 24.5, after: 'row 24', title: 'Explaining a Problem', help: true, tasks: 'T13',
    grammar: 'Non funziona (it does not work); manca qualcosa; bisogna + a verb (one has to); è grave?', words: ['funziona', 'manca', 'soluzione', 'grave', 'bisogna', 'rischio'] },
  { unit_id: 'U88', order: 128, row: 25, after: 'row 24', title: 'Filling In Forms', tasks: 'T10',
    grammar: 'Data di nascita, luogo di nascita, stato civile: the words on a form; il seguente modulo; dichiaro (I declare)',
    words: ['modulo', 'firma', 'documento', 'documenti', 'richiesta', 'nascita', 'civile', 'professione', 'titolo', 'residenza', 'condizione', 'procedura', 'modalità', 'seguente', 'presente', 'dichiaro', 'dichiarare'] },
  { unit_id: 'U89', order: 129, row: 25, after: 'row 24', title: 'Messages + Postcards', tasks: 'T11',
    grammar: 'Cara Anna, caro Marco: dear (caro agrees); tanti saluti, un abbraccio: ways to end; ti invio una foto',
    words: ['cartolina', 'saluti', 'abbraccio', 'inviare', 'invio', 'rispondo', 'contenuto', 'immagine', 'immagini', 'sito', 'comunicazione', 'soltanto', 'infine', 'ormai', 'futuro'] },
]

const vocab = [
  { unit_id: 'U91', order: 121.2, row: 21, after: '', title: 'Ideas + Things',
    grammar: 'Nouns for ideas: il caso, il senso, la base, il valore; in questo caso, in ogni caso, per questo motivo',
    words: ['caso', 'senso', 'base', 'forma', 'fatto', 'termine', 'valore', 'effetto', 'forza', 'misura', 'elemento', 'modello', 'tema', 'materia', 'ruolo', 'scopo', 'risultato', 'obiettivo', 'risorsa', 'strumento', 'processo', 'fase', 'capacità', 'necessità', 'esigenza', 'ciò', 'tale', 'soprattutto', 'nulla'] },
  { unit_id: 'U92', order: 123.2, row: 22, after: 'row 21', title: 'Describing Words',
    grammar: 'Adjectives in -e (generale, principale) are the same for both genders; adjectives in -o agree (specifico, specifica)',
    words: ['generale', 'particolare', 'specifico', 'principale', 'fondamentale', 'attuale', 'precedente', 'successivo', 'ulteriore', 'eventuale', 'intero', 'singolo', 'vario', 'numeroso', 'medio', 'massimo', 'superiore', 'disponibile', 'noto', 'storico', 'culturale', 'umano', 'tecnico', 'finanziario', 'ufficiale', 'regionale', 'amministrativo'] },
  { unit_id: 'U93', order: 125.2, row: 23, after: 'row 22', title: 'Rules + Offices',
    grammar: 'L\'ente, l\'istituto, la commissione: the words of offices and rules; un atto, una norma, un decreto',
    words: ['norma', 'decreto', 'comma', 'atto', 'provvedimento', 'disposizione', 'amministrazione', 'ente', 'istituzione', 'istituto', 'commissione', 'consiglio', 'associazione', 'organizzazione', 'struttura', 'contributo', 'intervento', 'iniziativa', 'partecipazione', 'collaborazione', 'valutazione', 'applicazione', 'produzione', 'formazione', 'sviluppo'] },
  { unit_id: 'U94', order: 127.2, row: 24, after: 'row 23', title: 'Thinking + Saying',
    grammar: 'Ritengo, considero: verbs of opinion; esiste, appare, risulta: the lui form is the everyday one; riguarda (it concerns)',
    words: ['considero', 'considerare', 'ritengo', 'ritenere', 'intendo', 'intendere', 'esprimere', 'afferma', 'affermare', 'riconosco', 'riconoscere', 'dimostra', 'dimostrare', 'definire', 'propongo', 'proporre', 'sostiene', 'sostenere', 'comprendo', 'comprendere', 'riferisce', 'riporta', 'rappresenta', 'appare', 'esiste', 'risulta', 'riguarda', 'tratta', 'rende'] },
  { unit_id: 'U95', order: 129.2, row: 25, after: 'row 24', title: 'Doing + Getting',
    grammar: 'Everyday verbs in the lui form: offre, permette, contiene; ottenere (ottengo), proporre (propongo): irregular',
    words: ['ottengo', 'ottenere', 'fornisce', 'garantisce', 'permette', 'consente', 'prevede', 'realizza', 'supera', 'affronta', 'riduce', 'aggiunge', 'applica', 'utilizza', 'verifica', 'modifica', 'produce', 'promuove', 'partecipa', 'assume', 'occupa', 'impegna', 'dedica', 'destina', 'raccoglie', 'deriva', 'costituisce', 'svolge', 'effettua', 'stabilisce', 'determina', 'individua', 'opera', 'interviene', 'assicura', 'adotta', 'conclude', 'pubblica', 'approva', 'avviene', 'contiene', 'pone', 'dispone', 'richiede', 'rivolge', 'comincia', 'vale', 'evita'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Prices in euro; timetables on the 24-hour clock.
const listen = [
  ['N301', 'U81', 'price', 'Un caffè costa un euro e venti.', '1,20'], ['N302', 'U81', 'price', 'Sono tre euro e cinquanta.', '3,50'],
  ['N303', 'U82', 'price', 'Il menù costa quindici euro.', '15'], ['N304', 'U82', 'price', 'Il conto è di quarantadue euro.', '42'],
  ['N305', 'U83', 'number', 'La farmacia è a cento metri.', '100'], ['N306', 'U83', 'number', 'Il museo è a trecento metri.', '300'],
  ['N307', 'U84', 'number', 'Prenda il tram numero otto.', '8'], ['N308', 'U84', 'time', 'Il tram passa alle sette e un quarto.', '7:15'],
  ['N309', 'U86', 'number', 'Abito al numero ventisei.', '26'], ['N310', 'U87', 'time', 'La riunione è alle dieci e mezza.', '10:30'],
  ['N311', 'U88', 'phone', 'Il mio numero è tre, quattro, sette, dodici, venti, diciotto.', '347 12 20 18'], ['N312', 'U88', 'date', 'Sono nato il dodici marzo.', '12/3'],
]
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const texts = [
  text('R301', 'U82', 'menu', 'Menù del giorno', ['Primo: pasta al pomodoro o minestra', 'Secondo: pollo o pesce', 'Dolce: frutta', '15 euro'],
    [q('How much is the menu of the day?', ['15 euros', '5 euros', '50 euros']), q('What is there for dessert?', ['Fruit', 'Cake', 'Ice cream'])]),
  text('R302', 'U82', 'menu', 'Bar Centrale', ['Caffè: 1,20 euro', 'Cappuccino: 1,50 euro', 'Birra: 4 euro', 'Panino al formaggio: 3,50 euro'],
    [q('How much is a beer?', ['4 euros', '1.20 euros', '3.50 euros']), q('What costs 3.50 euros?', ['A cheese sandwich', 'A cappuccino', 'A coffee'])]),
  text('R303', 'U82', 'notice', 'Ristorante Da Marco', ['Pesce e pasta fresca', 'Aperto dal martedì alla domenica', 'Chiuso il lunedì'],
    [q('When is the restaurant closed?', ['On Mondays', 'On Sundays', 'On Tuesdays']), q('What does the restaurant serve?', ['Fish and fresh pasta', 'Pizza', 'Meat only'])]),
  text('R304', 'U83', 'message', 'Un messaggio di Anna', ['La mia casa è vicino alla stazione.', 'Vai dritto e attraversa la piazza.', 'La mia via è la seconda a destra.'],
    [q('Where is Anna\'s house?', ['Near the station', 'Near the school', 'In the centre']), q('Which street is hers?', ['The second on the right', 'The first on the left', 'The second on the left'])]),
  text('R305', 'U83', 'sign', 'In città', ['Museo: 200 metri, a sinistra', 'Chiesa: dritto', 'Stazione: a destra'],
    [q('Where is the museum?', ['200 metres on the left', '200 metres on the right', 'Straight on']), q('Where is the station?', ['On the right', 'On the left', 'Straight on'])]),
  text('R306', 'U83', 'notice', 'L\'albergo', ['L\'albergo è in fondo alla via.', 'A cinque minuti a piedi dal centro', 'Fermata del tram davanti all\'albergo'],
    [q('How far is the hotel from the centre?', ['Five minutes on foot', 'Five minutes by car', 'Half an hour on foot']), q('Where is the tram stop?', ['In front of the hotel', 'Behind the hotel', 'At the station'])]),
  text('R307', 'U86', 'notice', 'Affittasi', ['Appartamento in centro', 'Due camere, cucina e bagno', 'Con balcone', '800 euro al mese'],
    [q('How many bedrooms does the flat have?', ['Two', 'Three', 'One']), q('How much is it a month?', ['800 euros', '80 euros', '8,000 euros'])]),
  text('R308', 'U86', 'message', 'Un messaggio di Giulia', ['La mia casa nuova è piccola.', 'Ha una camera, un soggiorno e una cucina.', 'Non ha il giardino.'],
    [q('What is Giulia\'s new house like?', ['Small', 'Big', 'Old']), q('What doesn\'t it have?', ['A garden', 'A kitchen', 'A bedroom'])]),
  text('R309', 'U86', 'notice', 'Camera per studenti', ['Affittasi camera a studente', 'Con armadio, letto e tavolo', 'Vicino all\'università'],
    [q('Who is the room for?', ['A student', 'A family', 'A tourist']), q('Where is it?', ['Near the university', 'Near the station', 'In the countryside'])]),
  text('R310', 'U87', 'notice', 'Lavoro', ['Ristorante cerca cameriere', 'Dal martedì al sabato, dalle 18:00 alle 23:00', 'Telefonare al 347 12 20 18'],
    [q('What job is it?', ['A waiter', 'A cook', 'A driver']), q('Which days?', ['Tuesday to Saturday', 'Monday to Friday', 'Every day'])]),
  text('R311', 'U87', 'message', 'Il mio lavoro', ['Sono infermiera e lavoro in un ospedale.', 'Comincio alle sette di mattina.', 'Il mio capo è molto gentile.'],
    [q('Where does she work?', ['In a hospital', 'In a school', 'In a shop']), q('When does she start?', ['At seven in the morning', 'At seven in the evening', 'At nine'])]),
  text('R312', 'U87', 'notice', 'L\'azienda', ['Azienda di trasporti cerca autista', 'Con patente', 'Orario: dal lunedì al venerdì'],
    [q('Who is the company looking for?', ['A driver', 'A secretary', 'A teacher']), q('What do you need?', ['A driving licence', 'A university degree', 'A car'])]),
  text('R313', 'U89', 'message', 'Una cartolina di Anna', ['Caro Marco,', 'sono al mare con la mia famiglia. Fa caldo e il mare è bellissimo.', 'Un abbraccio, Anna'],
    [q('Where is Anna?', ['At the seaside', 'In the mountains', 'In the city']), q('What is the weather like?', ['Hot', 'Cold', 'Rainy'])]),
  text('R314', 'U89', 'message', 'Un messaggio di Luca', ['Ciao Giulia,', 'sabato è il mio compleanno. Vieni alla mia festa?', 'È a casa mia alle otto.', 'Luca'],
    [q('Why is Luca having a party?', ['It\'s his birthday', 'He has a new job', 'It\'s Christmas']), q('Where is the party?', ['At his house', 'At a restaurant', 'At the park'])]),
  text('R315', 'U89', 'message', 'Un biglietto', ['Anna,', 'non sono a casa. Torno alle sei.', 'La cena è in cucina.', 'Marco'],
    [q('When is Marco back?', ['At six', 'At eight', 'At five']), q('Where is dinner?', ['In the kitchen', 'At a restaurant', 'In the fridge'])]),
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F301', unit_id: 'U88', card: 'Mi chiamo Anna Bianchi. Sono italiana. Sono nata il 10 aprile a Roma. Sono sposata. Abito in via Garibaldi 12, a Milano.',
      fields: [{ key: 'name', label: 'Nome e cognome', rule: 'text', answer: 'Anna Bianchi' }, { key: 'nat', label: 'Nazionalità', rule: 'text', answer: 'italiana', also: ['italiano', 'Italiana'] },
        { key: 'born', label: 'Data di nascita', rule: 'text', answer: '10/4', also: ['10 aprile', '10/04', '10.4', '10 Aprile'] }, { key: 'place', label: 'Luogo di nascita', rule: 'text', answer: 'Roma' },
        { key: 'civil', label: 'Stato civile', rule: 'text', answer: 'sposata', also: ['Sposata', 'sposato'] }, { key: 'town', label: 'Residenza', rule: 'text', answer: 'Milano', also: ['via Garibaldi 12, Milano', 'Via Garibaldi 12, Milano'] }] },
    { id: 'F302', unit_id: 'U87', card: 'Mi chiamo Luca Rossi. Ho trenta anni. Sono ingegnere e lavoro in un\'azienda a Torino. Non sono sposato.',
      fields: [{ key: 'name', label: 'Nome', rule: 'text', answer: 'Luca' }, { key: 'last', label: 'Cognome', rule: 'text', answer: 'Rossi' }, { key: 'age', label: 'Età', rule: 'number', answer: '30' },
        { key: 'job', label: 'Professione', rule: 'text', answer: 'ingegnere', also: ['Ingegnere'] }, { key: 'town', label: 'Città', rule: 'text', answer: 'Torino' }] },
    { id: 'F303', unit_id: 'U81', card: 'Al bar: Marco prende un caffè e un cornetto. Anna prende un succo. Pagano sei euro.',
      fields: [{ key: 'marco', label: 'Marco', rule: 'text', answer: 'un caffè e un cornetto', also: ['caffè e cornetto', 'caffè, cornetto', 'un caffè, un cornetto'] },
        { key: 'anna', label: 'Anna', rule: 'text', answer: 'un succo', also: ['succo'] }, { key: 'total', label: 'Totale (euro)', rule: 'number', answer: '6' }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: texts.map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P301', unit_id: 'U85', prompt: 'Write a few lines about your family: who they are and what they are like.', points: 'who is in your family;what they are like', min_words: 30, max_words: 40 },
    { id: 'P302', unit_id: 'U86', prompt: 'Write a short message about your home: where it is and which rooms it has.', points: 'where it is;which rooms it has', min_words: 30, max_words: 40 },
    { id: 'P303', unit_id: 'U89', prompt: 'Write a postcard to a friend from a trip: where you are, the weather and what you do.', points: 'where you are;the weather;what you do', min_words: 30, max_words: 40 },
    { id: 'P304', unit_id: 'U89', prompt: 'Write back to a friend who invited you to a party: say thank you, say if you can come, and ask one question.', points: 'thank you;if you can come;one question', min_words: 30, max_words: 40 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

const canDo = {
  U81: [['speaking', 'Spoken interaction', 'I can order a drink and something to eat at a café, and pay.']],
  U26: [['speaking', 'Spoken interaction', 'I can get someone\'s attention politely and ask for help.']],
  U82: [['reading', 'Reading', 'I can understand a simple menu and its prices.'], ['speaking', 'Spoken interaction', 'I can order a meal in a restaurant.']],
  U83: [['listening', 'Listening', 'I can follow simple directions: left, right, straight on.'], ['speaking', 'Spoken interaction', 'I can ask the way to a place.']],
  U27: [['speaking', 'Spoken interaction', 'I can say I am lost and ask someone to show me the way.']],
  U84: [['speaking', 'Spoken production', 'I can say how I get around: by car, by tram, on foot.']],
  U85: [['speaking', 'Spoken production', 'I can talk about my family in simple words.']],
  U86: [['reading', 'Reading', 'I can understand a short ad for a flat or a room.'], ['speaking', 'Spoken production', 'I can describe my home: its rooms and its things.']],
  U87: [['speaking', 'Spoken production', 'I can say what I do for work and where.']],
  U28: [['speaking', 'Spoken interaction', 'I can say that something doesn\'t work or is missing.']],
  U88: [['writing', 'Writing', 'I can fill in a form with my personal details.']],
  U89: [['writing', 'Writing', 'I can write a short postcard or message.'], ['reading', 'Reading', 'I can understand a short personal message or postcard.']],
  U91: [['reading', 'Reading', 'I can recognise common words for ideas and things in a short text.']],
  U92: [['reading', 'Reading', 'I can recognise common describing words in a short text.']],
  U93: [['reading', 'Reading', 'I can recognise the words of offices and rules in a notice.']],
  U94: [['reading', 'Reading', 'I can recognise everyday verbs of thinking and saying.']],
  U95: [['reading', 'Reading', 'I can recognise everyday verbs of doing and getting in a short text.']],
}

export default {
  part: 4, wordBase: 1601, vocabBase: 1801, cdBase: 501,
  slots: [{ slot_id: 'C07', part: 4, after_row: 22 }, { slot_id: 'C08', part: 4, after_row: 24 }],
  situation, vocab, items, canDo,
  // Turned off in review (2026-11-16): an infinitive with no natural A1 line; its present form teaches the list word.
  off: Object.fromEntries([['ritenere', 'ritengo'], ['intendere', 'intendo'], ['affermare', 'afferma'], ['sostenere', 'sostiene']]
    .map(([inf, form]) => [inf, `the infinitive has no natural A1 line; ${form} teaches the list word`])),
}
