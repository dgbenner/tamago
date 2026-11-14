// Spanish A1 · Part 2, Everyday Life (Dan, 2026-11-14), after French Part 2: Latin American Spanish, ustedes, prices in
// pesos. Words from the PCIC A1 inventory where they fit the situations (plus the numbers, which A1 needs), checked
// against Tatoeba first (scripts/circle-feasibility.mjs). Vocabulary themes stay clear of Part 1's (Body and Feelings,
// Free Time, Around Town) and of Parts 3 and 4 (time; food, directions, home, family, work).
// Used by scripts/add-part2.mjs.
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U41', order: 101, row: 11, after: '', title: 'Your Name, Please', tasks: 'T01;T02',
    grammar: '¿Cómo se llama usted? ¿Cómo te llamas?: usted takes the él form; nombre and apellido; encantado, encantada',
    words: ['nombre', 'apellido', 'llaman', 'encantado', 'encantada', 'nombres'] },
  { unit_id: 'U34', order: 101.5, row: 11.5, after: 'row 11', title: 'Spelling It Out', help: true, tasks: 'T02;T13',
    grammar: '¿Cómo se escribe? ¿Puede deletrear …?: poder + a verb', words: ['escribe', 'escribir', 'letra', 'puede', 'puedes', 'deletrear'] },
  { unit_id: 'U42', order: 102, row: 12, after: 'row 11', title: 'Phone Numbers', tasks: 'T02',
    grammar: 'Numbers 0 to 20; mi número es …; dieciséis to diecinueve are one word',
    words: ['número', 'celular', 'llamar', 'cero', 'uno', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte'] },
  { unit_id: 'U43', order: 103, row: 12, after: 'row 11', title: 'Age + Birthdays', tasks: 'T03',
    grammar: 'Tengo … años: tener for age; ¿cuántos años tienes?; ¡feliz cumpleaños!', words: ['años', 'año', 'edad', 'cumpleaños', 'mes', 'meses', 'feliz'] },
  { unit_id: 'U35', order: 103.5, row: 12.5, after: 'row 12', title: 'Checking Numbers', help: true, tasks: 'T13',
    grammar: '¿Puede repetir? Un momento. ¿Es correcto?', words: ['repetir', 'momento', 'espera', 'correcto'] },
  { unit_id: 'U44', order: 104, row: 13, after: 'row 12', title: 'Numbers to 100', tasks: 'T04',
    grammar: 'Tens to 100: treinta … noventa, cien; treinta y uno: y between tens and units',
    words: ['treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa', 'cien'] },
  { unit_id: 'U45', order: 105, row: 13, after: 'row 12', title: 'Where You Live', tasks: 'T03',
    grammar: 'Vivo, vives, vive: -ir verbs; vivir en …; cerca de, lejos de',
    words: ['vivo', 'vives', 'vive', 'vivir', 'dirección', 'piso', 'apartamento', 'país', 'cerca', 'lejos'] },
  { unit_id: 'U46', order: 106, row: 14, after: 'row 13', title: 'Countries + Languages', tasks: 'T03',
    grammar: 'Soy mexicano, soy mexicana: nationalities agree; hablo, hablas: -ar verbs; languages take no capital',
    words: ['España', 'México', 'Francia', 'Alemania', 'francés', 'alemán', 'mexicano', 'japonés', 'idioma', 'hablo', 'hablas', 'extranjero'] },
  { unit_id: 'U47', order: 107, row: 14, after: 'row 13', title: 'At the Market', tasks: 'T04',
    grammar: 'Quiero …, ¿quieres …?: querer (e to ie); comprar: compro, compras; un kilo de …',
    words: ['mercado', 'comprar', 'compro', 'compras', 'quiero', 'quieres', 'kilo', 'fruta', 'verdura', 'huevos'] },
  { unit_id: 'U36', order: 107.5, row: 14.5, after: 'row 14', title: 'Checking You Understood', help: true, tasks: 'T13',
    grammar: 'De acuerdo. Claro. Comprendo. ¿Verdad?', words: ['acuerdo', 'claro', 'comprendo', 'exacto', 'verdad'] },
  { unit_id: 'U48', order: 108, row: 15, after: 'row 14', title: 'How Much Is It?', tasks: 'T04',
    grammar: '¿Cuánto cuesta? Cuesta … pesos; cuestan for more than one; es caro, es barato',
    words: ['precio', 'cuesta', 'cuestan', 'peso', 'pesos', 'dólares', 'caro', 'barato', 'pagar', 'dinero', 'tarjeta'] },
  { unit_id: 'U49', order: 109, row: 15, after: 'row 14', title: 'Bottles + Bags', tasks: 'T04',
    grammar: 'Una botella de …, un paquete de …: de after a quantity; mucho, poco, bastante',
    words: ['botella', 'paquete', 'caja', 'vaso', 'bolsa', 'bastante', 'mucho', 'mucha', 'poco', 'galletas'] },
]

const vocab = [
  { unit_id: 'U54', order: 101.2, row: 11, after: '', title: 'Clothes',
    grammar: 'Llevo, llevas, lleva: llevar for what you wear; la ropa (always singular)',
    words: ['ropa', 'pantalones', 'falda', 'camisa', 'zapatos', 'vestido', 'chaqueta', 'sombrero', 'gafas', 'reloj', 'llevo', 'lleva', 'llevas'] },
  { unit_id: 'U55', order: 103.2, row: 12, after: 'row 11', title: 'In Class',
    grammar: 'Estudio, estudias: -ar verbs; aprender (an -er verb); una pregunta, la clase',
    words: ['clase', 'pregunta', 'página', 'papel', 'bolígrafo', 'lápiz', 'diccionario', 'mapa', 'silla', 'examen', 'estudiar', 'estudio', 'aprender'] },
  { unit_id: 'U56', order: 105.2, row: 13, after: 'row 12', title: 'Looks',
    grammar: 'Es alto, es alta: adjectives agree; ser for what someone is like; tiene barba',
    words: ['alto', 'alta', 'bajo', 'baja', 'delgado', 'delgada', 'rubio', 'moreno', 'barba', 'inteligente', 'largo', 'corto'] },
  { unit_id: 'U57', order: 107.2, row: 14, after: 'row 13', title: 'Opposites',
    grammar: 'Fácil, difícil: adjectives in -e and -l are the same for both genders; es interesante',
    words: ['rápido', 'lento', 'caliente', 'frío', 'fácil', 'difícil', 'interesante', 'malo', 'feo', 'abierto', 'cerrado'] },
  { unit_id: 'U58', order: 109.2, row: 15, after: 'row 14', title: 'Outdoors',
    grammar: 'En la playa, en el campo: en for where you are; el mar, el sol',
    words: ['playa', 'montaña', 'campo', 'mar', 'río', 'sol', 'lago', 'bosque', 'cielo'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words (Tatoeba has nothing in these
// shapes), so drafts for the native-speaker check. Phone numbers in pairs, prices in pesos.
const items = {
  a1_listen: [
    ['N101', 'U42', 'number', 'quince', '15'], ['N102', 'U42', 'number', 'diecisiete', '17'], ['N103', 'U42', 'phone', 'cero, seis, once, quince, diecinueve, veinte', '06 11 15 19 20'],
    ['N104', 'U42', 'phone', 'cero, siete, doce, dieciséis, dieciocho, catorce', '07 12 16 18 14'],
    ['N105', 'U43', 'number', 'Tengo veinte años.', '20'], ['N106', 'U43', 'number', 'Ella tiene dieciocho años.', '18'],
    ['N107', 'U44', 'number', 'setenta', '70'], ['N108', 'U44', 'number', 'noventa', '90'], ['N109', 'U44', 'number', 'cuarenta y cinco', '45'], ['N110', 'U44', 'number', 'noventa y nueve', '99'],
    ['N111', 'U48', 'price', 'treinta pesos', '30'], ['N112', 'U48', 'price', 'diez pesos', '10'], ['N113', 'U48', 'price', 'cien pesos', '100'], ['N114', 'U48', 'price', 'cincuenta pesos', '50'],
  ].map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F101', unit_id: 'U45', card: 'Me llamo Juan López. Tengo cuarenta años. Vivo en la calle Juárez, número diez, en Guadalajara.',
      fields: [{ key: 'first', label: 'Nombre', rule: 'text', answer: 'Juan' }, { key: 'last', label: 'Apellido', rule: 'text', answer: 'López', also: ['Lopez'] }, { key: 'age', label: 'Edad', rule: 'number', answer: '40' },
        { key: 'address', label: 'Dirección', rule: 'text', answer: 'Calle Juárez 10', also: ['calle Juárez, 10', 'Calle Juarez 10', 'calle Juárez número diez', 'Juárez 10'] }, { key: 'town', label: 'Ciudad', rule: 'text', answer: 'Guadalajara' }] },
    { id: 'F102', unit_id: 'U46', card: 'Me llamo Ana Torres. Tengo treinta años. Soy mexicana. Vivo en España. Mi número es el cero, seis, once, quince, diecinueve, veinte.',
      fields: [{ key: 'first', label: 'Nombre', rule: 'text', answer: 'Ana' }, { key: 'last', label: 'Apellido', rule: 'text', answer: 'Torres' }, { key: 'age', label: 'Edad', rule: 'number', answer: '30' },
        { key: 'nat', label: 'Nacionalidad', rule: 'text', answer: 'mexicana', also: ['mexicano'] }, { key: 'country', label: 'País', rule: 'text', answer: 'España', also: ['Espana'] },
        { key: 'tel', label: 'Teléfono', rule: 'phone', answer: '06 11 15 19 20' }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: [
    { id: 'R101', unit_id: 'U47', kind: 'sign', title: 'En el mercado', lines: ['Frutas y verduras', 'Manzanas: 30 pesos el kilo', 'El mercado: lunes y domingo'],
      questions: [{ question: 'How much is a kilo of apples?', choices: ['30 pesos', '40 pesos', '13 pesos'], answer: 0 }, { question: 'When is the market on?', choices: ['Monday and Sunday', 'Every day', 'Only on Sunday'], answer: 0 }] },
    { id: 'R102', unit_id: 'U48', kind: 'menu', title: 'Los precios', lines: ['Pan: 10 pesos', 'Queso: 45 pesos', 'Leche: 25 pesos', 'Agua: 12 pesos'],
      questions: [{ question: 'How much is the cheese?', choices: ['25 pesos', '45 pesos', '12 pesos'], answer: 1 }, { question: 'What costs 10 pesos?', choices: ['The bread', 'The milk', 'The water'], answer: 0 }] },
    { id: 'R103', unit_id: 'U49', kind: 'message', title: 'Un mensaje de María', lines: ['Tom:', '¿Puedes comprar una botella de leche, un paquete de galletas y un kilo de manzanas?', '¡Gracias!', 'María'],
      questions: [{ question: 'What does María want from the shop?', choices: ['Milk, cookies and apples', 'Bread and water', 'Fruit and vegetables'], answer: 0 }, { question: 'How much milk?', choices: ['One bottle', 'Two bottles', 'A kilo'], answer: 0 }] },
  ].map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P101', unit_id: 'U45', prompt: 'Write a short message to a new friend: your name, how old you are and where you live.', points: 'your name;your age;where you live', min_words: 20, max_words: 35 },
    { id: 'P102', unit_id: 'U46', prompt: 'Write a short postcard about yourself: where you are from, where you live and which languages you speak.', points: 'where you are from;where you live;your languages', min_words: 30, max_words: 40 },
    { id: 'P103', unit_id: 'U49', prompt: 'Write a short message to a friend: what to buy at the market, and how much of each.', points: 'two or three things;how much of each', min_words: 20, max_words: 35 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

// "I can" statements, on the CEFR self-assessment grid's A1 rows (the same as French Part 2, plus the vocabulary circles).
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

// Added in review (2026-11-14): ¿Cuánto cuesta? needs cuánto, which Part 1 never taught (only cuántos, cuántas).
const late = [{ unit_id: 'U48', words: ['cuánto'] }]

export default { situation, vocab, items, canDo, late, off: {
  mucha: 'no Wiktionary entry the check can read; mucho teaches the list word',
  nombres: 'a plural Tatoeba only has in idioms (no voy a decir nombres); nombre teaches the list word',
} }
