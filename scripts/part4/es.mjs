// Spanish A1 · Part 4, Out and About (Dan, 2026-11-15), the last part: ordering food and drink (T07), asking the way
// and getting around (T08), family, home and work (T06), filling in a form (T10), a short message or postcard (T11),
// menus and small ads (T09); the help thread goes on (T13). Latin American Spanish: mesero beside camarero, manejar
// beside conducir, derecho beside recto, prices in pesos. Words from the PCIC A1 inventory first
// (scripts/a1-coverage.mjs --missing), checked against Tatoeba (scripts/circle-feasibility.mjs). My Family, At Home
// and At Work borrow the Family and Office packs' words. Read and Answer has three texts per circle that has it.
// The mock DELE A1 follows this part. Used by scripts/add-part.mjs (COURSE=es PART=4).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U81', order: 121, row: 21, after: '', title: 'At the Café', tasks: 'T07',
    grammar: '¿Qué va a tomar? Quisiera un café: quisiera is the polite I would like; tengo sed, tengo hambre: tener; otro, otra; la cuenta, por favor',
    words: ['bar', 'mesero', 'camarero', 'cerveza', 'vino', 'tinto', 'gas', 'cuenta', 'sándwich', 'hamburguesa', 'tomar', 'tomo', 'quisiera', 'algo', 'otro', 'otra', 'sed', 'hambre'] },
  { unit_id: 'U26', order: 121.5, row: 21.5, after: 'row 21', title: 'Excuse Me', help: true, tasks: 'T13',
    grammar: 'Disculpe (usted), disculpa (tú). Necesito ayuda. ¿Me puede ayudar?', words: ['disculpe', 'disculpa', 'ayuda', 'ayudar', 'necesito', 'necesita'] },
  { unit_id: 'U82', order: 122, row: 22, after: 'row 21', title: 'At the Restaurant', tasks: 'T07;T09',
    grammar: 'De primer plato, de segundo, de postre; pedir (e to i): pido; está rico, está rica: estar for how food tastes',
    words: ['menú', 'primer', 'plato', 'postre', 'sopa', 'ensalada', 'carne', 'pescado', 'pollo', 'arroz', 'tortilla', 'paella', 'rico', 'rica', 'pedir', 'pido'] },
  { unit_id: 'U83', order: 123, row: 22, after: 'row 21', title: 'Asking the Way', tasks: 'T08',
    grammar: '¿Dónde está …? A la derecha, a la izquierda, todo recto (in Latin America also derecho); al lado de, al final de; sigue, cruza',
    words: ['derecha', 'izquierda', 'recto', 'derecho', 'lado', 'final', 'acá', 'allá', 'metros', 'sigue', 'siga', 'cruza', 'esquina'] },
  { unit_id: 'U27', order: 123.5, row: 22.5, after: 'row 22', title: "I'm Lost", help: true, tasks: 'T13;T08',
    grammar: 'Estoy perdido, estoy perdida. ¿Sabe dónde está …? No conozco la ciudad: saber for facts, conocer for places and people',
    words: ['perdido', 'perdida', 'sabe', 'sabes', 'encuentro', 'encontrar', 'conozco', 'conoces'] },
  { unit_id: 'U84', order: 124, row: 23, after: 'row 22', title: 'Getting Around', tasks: 'T08',
    grammar: 'En coche, en bicicleta, a pie; conducir and manejar (Latin America) both mean to drive; al norte, al sur; a dos kilómetros',
    words: ['transporte', 'conducir', 'conduce', 'manejar', 'andando', 'bicicleta', 'kilómetro', 'kilómetros', 'norte', 'sur', 'oeste'] },
  { unit_id: 'U85', order: 125, row: 23, after: 'row 22', title: 'My Family', tasks: 'T06',
    grammar: 'Mi tío, mi tía: family words in -o and -a; los abuelos, los tíos: the masculine plural covers both; estar casado, ser soltero',
    words: ['tío', 'tía', 'sobrino', 'sobrina', 'abuelo', 'abuela', 'abuelos', 'nieto', 'nieta', 'primo', 'prima', 'pareja', 'novio', 'novia', 'marido', 'esposo', 'esposa', 'casado', 'casada', 'soltero', 'soltera'],
    borrow: ['madre', 'padre', 'hermano', 'hermana', 'hijo', 'hija', 'bebé', 'padres', 'mamá', 'papá'] },
  { unit_id: 'U86', order: 126, row: 24, after: 'row 23', title: 'At Home', tasks: 'T06',
    grammar: 'La casa tiene tres habitaciones; en la sala, en el dormitorio; hay un sofá: hay for what there is',
    words: ['habitación', 'habitaciones', 'sala', 'dormitorio', 'salón', 'garaje', 'terraza', 'ventana', 'sofá', 'sillón', 'armario', 'estantería'],
    borrow: ['jardín'] },
  { unit_id: 'U87', order: 127, row: 24, after: 'row 23', title: 'At Work', tasks: 'T06',
    grammar: '¿A qué te dedicas? Soy abogado: no un or una with a job; es abogada, es enfermero: jobs agree; vender: vendo, vende',
    words: ['jefe', 'compañero', 'compañera', 'empresa', 'abogado', 'abogada', 'taxista', 'ingeniero', 'ingeniera', 'enfermera', 'enfermero', 'policía', 'profesión', 'dedicarse', 'dedicas', 'dedico', 'vender', 'vendo', 'vende', 'vendedor'],
    borrow: ['oficina', 'trabajo', 'trabaja', 'trabajas', 'jefa', 'reunión', 'ocupado', 'ocupada'] },
  { unit_id: 'U28', order: 127.5, row: 24.5, after: 'row 24', title: 'Explaining a Problem', help: true, tasks: 'T13',
    grammar: 'Tengo un problema. No funciona. Está roto, está rota. ¿Qué pasa? Regular (so-so)', words: ['problema', 'funciona', 'roto', 'rota', 'falta', 'pasa', 'regular', 'okay'] },
  { unit_id: 'U88', order: 128, row: 25, after: 'row 24', title: 'Filling In Forms', tasks: 'T10',
    grammar: 'Nombre, apellido, fecha de nacimiento, nacionalidad, estado civil, correo electrónico: the words on a form; firmar: firme aquí',
    words: ['formulario', 'firmar', 'firma', 'nacimiento', 'nacionalidad', 'estado', 'civil', 'código', 'postal', 'correo', 'electrónico', 'carné', 'identidad', 'avenida', 'paseo', 'llamarse', 'divorciado', 'viudo', 'separado', 'arroba', 'punto', 'guion'],
    borrow: ['teléfono'] },
  { unit_id: 'U89', order: 129, row: 25, after: 'row 24', title: 'Messages + Postcards', tasks: 'T11',
    grammar: 'Querido Juan, Querida Ana: how a message opens; un abrazo, saludos: how it ends; escribir, mandar, recibir',
    words: ['mensaje', 'sello', 'quiosco', 'querido', 'querida', 'saludos', 'abrazo', 'escribo', 'mandar', 'mando', 'recibir'] },
]

const vocab = [
  { unit_id: 'U91', order: 121.2, row: 21, after: '', title: 'Everyday Things',
    grammar: 'Mis llaves, mi cartera; muchos and pocos agree with the noun: muchas cosas, pocos euros',
    words: ['llaves', 'llave', 'cartera', 'bolso', 'billete', 'crédito', 'euro', 'euros', 'céntimo', 'muchos', 'pocos', 'cosas'] },
  { unit_id: 'U92', order: 123.2, row: 22, after: 'row 21', title: 'Getting Ready',
    grammar: 'Lavarse, bañarse: verbs with se; me lavo las manos: las, not mis, with parts of the body',
    words: ['lavarse', 'lavo', 'bañarse', 'jabón', 'ducha', 'lavabo', 'toalla', 'espejo'] },
  { unit_id: 'U93', order: 125.2, row: 23, after: 'row 22', title: 'School + Study',
    grammar: 'Estudio historia en la universidad: a subject takes no el or la after estudiar; el colegio, el instituto',
    words: ['instituto', 'universidad', 'biblioteca', 'colegio', 'matemáticas', 'historia', 'goma', 'fotocopia', 'pizarra', 'director', 'directora'] },
  { unit_id: 'U94', order: 127.2, row: 24, after: 'row 23', title: 'Culture + Media',
    grammar: 'El actor, la actriz; el rey, la reina: pairs with their own feminine; un centro comercial',
    words: ['actor', 'actriz', 'rey', 'reina', 'presidente', 'religión', 'publicidad', 'video', 'web', 'comercial', 'Madrid'] },
  { unit_id: 'U95', order: 129.2, row: 25, after: 'row 24', title: 'At the Hotel',
    grammar: 'Una habitación doble, una habitación individual; con aire acondicionado, con calefacción; alquilar un coche',
    words: ['doble', 'individual', 'reserva', 'recepción', 'aire', 'acondicionado', 'calefacción', 'alquilar', 'interior', 'exterior', 'céntrico'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Small ads and notes are kind notice; menus kind menu. Prices in pesos.
const listen = [
  ['N301', 'U81', 'price', 'Un café y una cerveza: cuarenta y cinco pesos.', '45'], ['N302', 'U81', 'price', 'La cuenta: ochenta pesos, por favor.', '80'],
  ['N303', 'U82', 'price', 'El menú del día cuesta noventa pesos.', '90'], ['N304', 'U82', 'number', 'Su mesa es la número doce.', '12'],
  ['N305', 'U83', 'number', 'El banco está a cincuenta metros.', '50'], ['N306', 'U83', 'number', 'La farmacia está en el número veinte de esta calle.', '20'],
  ['N307', 'U84', 'number', 'La playa está a quince kilómetros.', '15'], ['N308', 'U86', 'number', 'La casa tiene cuatro habitaciones.', '4'],
  ['N309', 'U88', 'phone', 'Mi teléfono es el cero, cinco, trece, veinte, once, diecisiete.', '05 13 20 11 17'], ['N310', 'U88', 'date', 'Fecha de nacimiento: el diez de abril.', '10/4'],
  ['N311', 'U95', 'number', 'Su habitación es la número dieciocho.', '18'], ['N312', 'U95', 'price', 'La habitación doble cuesta cien dólares.', '100'],
]
const texts = [
  { id: 'R301', unit_id: 'U82', kind: 'menu', title: 'Menú del día', lines: ['Entrada: sopa o ensalada', 'Plato fuerte: pollo con arroz o pescado', 'Postre: fruta', '90 pesos'],
    questions: [{ question: 'What can you have as a first course?', choices: ['Soup or salad', 'Chicken or fish', 'Fruit'], answer: 0 }, { question: 'How much is the set menu?', choices: ['90 pesos', '19 pesos', '60 pesos'], answer: 0 }] },
  { id: 'R302', unit_id: 'U82', kind: 'menu', title: 'Bar La Plaza', lines: ['Café: 25 pesos', 'Cerveza: 40 pesos', 'Vino tinto: 60 pesos', 'Sándwich de queso: 50 pesos'],
    questions: [{ question: 'How much is a beer?', choices: ['40 pesos', '25 pesos', '60 pesos'], answer: 0 }, { question: 'What kind of sandwich is there?', choices: ['Cheese', 'Chicken', 'Fish'], answer: 0 }] },
  { id: 'R303', unit_id: 'U82', kind: 'notice', title: 'Restaurante El Puerto', lines: ['Pescado y paella', 'Abierto de martes a domingo', 'Cerrado los lunes'],
    questions: [{ question: 'What does the restaurant serve?', choices: ['Fish and paella', 'Meat and soup', 'Sandwiches'], answer: 0 }, { question: 'When is it closed?', choices: ['On Mondays', 'On Sundays', 'On Tuesdays'], answer: 0 }] },
  { id: 'R304', unit_id: 'U83', kind: 'message', title: 'Un mensaje de Ana', lines: ['Mi casa está cerca de la estación.', 'Sigue derecho y cruza la plaza.', 'Mi calle está a la derecha, al lado del banco.'],
    questions: [{ question: 'What do you cross?', choices: ['The square', 'The park', 'The station'], answer: 0 }, { question: "Which way is Ana's street?", choices: ['To the right', 'To the left', 'Straight ahead'], answer: 0 }] },
  { id: 'R305', unit_id: 'U83', kind: 'sign', title: 'En la calle', lines: ['Museo: a 200 metros, a la izquierda', 'Catedral: derecho', 'Estación: a la derecha'],
    questions: [{ question: 'Where is the museum?', choices: ['200 meters to the left', '200 meters to the right', '200 meters straight ahead'], answer: 0 }, { question: 'Which way is the station?', choices: ['Right', 'Left', 'Behind you'], answer: 0 }] },
  { id: 'R306', unit_id: 'U83', kind: 'notice', title: 'El hotel', lines: ['El hotel está al final de la avenida.', 'A cinco minutos del centro a pie', 'Parada de autobús en la esquina'],
    questions: [{ question: 'Where is the hotel?', choices: ['At the end of the avenue', 'Next to the station', 'In the square'], answer: 0 }, { question: 'How far is the center?', choices: ['Five minutes on foot', 'Five minutes by bus', 'Fifteen minutes on foot'], answer: 0 }] },
  { id: 'R307', unit_id: 'U86', kind: 'notice', title: 'Se renta', lines: ['Departamento en el centro', 'Dos habitaciones, sala y terraza', 'Con garaje', '8,000 pesos al mes'],
    questions: [{ question: 'How many bedrooms does it have?', choices: ['Two', 'Three', 'One'], answer: 0 }, { question: 'What does it come with?', choices: ['A garage', 'A garden', 'A sofa'], answer: 0 }] },
  { id: 'R308', unit_id: 'U86', kind: 'message', title: 'Un mensaje de María', lines: ['Mi casa nueva es pequeña.', 'Tiene una habitación, una sala y una cocina.', 'No tiene jardín, pero tiene una terraza grande.'],
    questions: [{ question: "What is María's new home like?", choices: ['Small', 'Big', 'Old'], answer: 0 }, { question: 'What does it not have?', choices: ['A garden', 'A terrace', 'A kitchen'], answer: 0 }] },
  { id: 'R309', unit_id: 'U86', kind: 'notice', title: 'Habitación', lines: ['Se renta habitación para estudiante', 'Con clóset, cama y mesa', 'Cerca de la universidad'],
    questions: [{ question: 'Who is the room for?', choices: ['A student', 'A family', 'A tourist'], answer: 0 }, { question: 'Where is it?', choices: ['Near the university', 'Near the station', 'In the center'], answer: 0 }] },
  { id: 'R310', unit_id: 'U87', kind: 'notice', title: 'Trabajo', lines: ['Restaurante busca mesero', 'De martes a sábado, de 6 a 11 de la noche', 'Llamar al 55 12 16 18'],
    questions: [{ question: 'What job is it?', choices: ['Waiter', 'Cook', 'Taxi driver'], answer: 0 }, { question: 'Which days?', choices: ['Tuesday to Saturday', 'Monday to Friday', 'Every day'], answer: 0 }] },
  { id: 'R311', unit_id: 'U87', kind: 'message', title: 'Mi trabajo', lines: ['Soy enfermera y trabajo en un hospital.', 'Empiezo a las siete de la mañana.', 'Mi jefa es muy simpática.'],
    questions: [{ question: 'Where does she work?', choices: ['In a hospital', 'In an office', 'In a school'], answer: 0 }, { question: 'What is her boss like?', choices: ['Very nice', 'Very serious', 'Very busy'], answer: 0 }] },
  { id: 'R312', unit_id: 'U87', kind: 'notice', title: 'La empresa', lines: ['Empresa de transporte busca chofer', 'Con licencia de manejar', 'Horario: de lunes a viernes'],
    questions: [{ question: 'What is the company looking for?', choices: ['A driver', 'An engineer', 'A salesperson'], answer: 0 }, { question: 'What do you need?', choices: ["A driver's license", 'A car', 'A passport'], answer: 0 }] },
  { id: 'R313', unit_id: 'U89', kind: 'message', title: 'Una postal de Ana', lines: ['Querido Juan:', 'Estoy en la playa con mi familia. Hace calor y el mar es hermoso.', 'Vuelvo el domingo.', 'Un abrazo, Ana'],
    questions: [{ question: 'Where is Ana?', choices: ['At the beach', 'In the mountains', 'At home'], answer: 0 }, { question: 'When does she come back?', choices: ['On Sunday', 'On Saturday', 'Next month'], answer: 0 }] },
  { id: 'R314', unit_id: 'U89', kind: 'message', title: 'Un mensaje de Carlos', lines: ['Hola, María:', 'El sábado es mi cumpleaños. ¿Vienes a mi fiesta?', 'Es en mi casa, a las ocho.', 'Saludos, Carlos'],
    questions: [{ question: 'What is on Saturday?', choices: ["Carlos's birthday", 'A concert', 'A class'], answer: 0 }, { question: 'Where is the party?', choices: ["At Carlos's home", 'At a restaurant', 'At the beach'], answer: 0 }] },
  { id: 'R315', unit_id: 'U89', kind: 'message', title: 'Una nota', lines: ['Ana:', 'No estoy en casa. Vuelvo a las seis.', 'La cena está en la cocina.', 'Pedro'],
    questions: [{ question: 'When does Pedro come back?', choices: ['At six', 'At eight', 'Tomorrow'], answer: 0 }, { question: 'Where is the dinner?', choices: ['In the kitchen', 'On the terrace', 'At the restaurant'], answer: 0 }] },
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F301', unit_id: 'U88', card: 'Me llamo Ana Torres García. Soy mexicana. Mi fecha de nacimiento es el 10 de abril. Estoy casada. Vivo en la avenida Juárez, número quince, en Guadalajara.',
      fields: [{ key: 'first', label: 'Nombre', rule: 'text', answer: 'Ana' }, { key: 'last', label: 'Apellidos', rule: 'text', answer: 'Torres García', also: ['Torres Garcia'] },
        { key: 'nat', label: 'Nacionalidad', rule: 'text', answer: 'mexicana', also: ['mexicano'] }, { key: 'born', label: 'Fecha de nacimiento', rule: 'text', answer: '10 de abril', also: ['10/4', '10/04', '10 abril', 'diez de abril', 'el 10 de abril'] },
        { key: 'status', label: 'Estado civil', rule: 'text', answer: 'casada', also: ['casado'] }, { key: 'town', label: 'Ciudad', rule: 'text', answer: 'Guadalajara' }] },
    { id: 'F302', unit_id: 'U87', card: 'Me llamo Luis García. Tengo treinta años. Soy ingeniero y trabajo en una empresa en Guadalajara. Estoy soltero.',
      fields: [{ key: 'first', label: 'Nombre', rule: 'text', answer: 'Luis' }, { key: 'last', label: 'Apellido', rule: 'text', answer: 'García', also: ['Garcia'] }, { key: 'age', label: 'Edad', rule: 'number', answer: '30' },
        { key: 'job', label: 'Profesión', rule: 'text', answer: 'ingeniero' }, { key: 'status', label: 'Estado civil', rule: 'text', answer: 'soltero' }, { key: 'town', label: 'Ciudad', rule: 'text', answer: 'Guadalajara' }] },
    { id: 'F303', unit_id: 'U95', card: 'Soy Carlos López, de España. Quisiera una habitación doble para tres noches, con aire acondicionado.',
      fields: [{ key: 'first', label: 'Nombre', rule: 'text', answer: 'Carlos' }, { key: 'last', label: 'Apellido', rule: 'text', answer: 'López', also: ['Lopez'] }, { key: 'country', label: 'País', rule: 'text', answer: 'España', also: ['Espana'] },
        { key: 'room', label: 'Habitación', rule: 'text', answer: 'doble', also: ['habitación doble', 'una habitación doble'] }, { key: 'nights', label: 'Noches', rule: 'number', answer: '3' }] },
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
  U81: [['speaking', 'Spoken interaction', 'I can order a drink and something to eat, and ask for the check.']],
  U26: [['speaking', 'Spoken interaction', "I can get someone's attention politely and ask for help."]],
  U82: [['reading', 'Reading', 'I can understand a simple menu.'], ['speaking', 'Spoken interaction', 'I can order a meal.']],
  U83: [['speaking', 'Spoken interaction', 'I can ask the way and understand simple directions.']],
  U27: [['speaking', 'Spoken interaction', "I can say I'm lost and ask where something is."]],
  U84: [['speaking', 'Spoken production', 'I can say how I get somewhere and how far it is.']],
  U85: [['speaking', 'Spoken interaction', 'I can ask and answer simple questions about my family.']],
  U86: [['speaking', 'Spoken production', 'I can describe my home in simple words.'], ['reading', 'Reading', 'I can understand a short ad for a room or an apartment.']],
  U87: [['speaking', 'Spoken interaction', 'I can say what my job is and ask someone theirs.']],
  U28: [['speaking', 'Spoken interaction', "I can say that something is wrong or doesn't work."]],
  U88: [['writing', 'Writing', 'I can fill in a form with my name, date of birth, nationality and address.']],
  U89: [['writing', 'Writing', 'I can write a short, simple postcard or message.'], ['reading', 'Reading', 'I can understand a short, simple message from a friend.']],
  U91: [['reading', 'Reading', 'I can recognise everyday words for the things I carry.']],
  U92: [['speaking', 'Spoken production', 'I can say simple things about getting ready.']],
  U93: [['reading', 'Reading', 'I can understand everyday words about school and study.']],
  U94: [['reading', 'Reading', 'I can recognise familiar words about famous people and the media.']],
  U95: [['speaking', 'Spoken interaction', 'I can ask for a hotel room and say what I need.']],
}

export default {
  part: 4, wordBase: 1601, vocabBase: 1801, cdBase: 401,
  slots: [{ slot_id: 'C07', part: 4, after_row: 22 }, { slot_id: 'C08', part: 4, after_row: 24 }],
  situation, vocab, items, canDo,
  // Fable's Part 4 review (Dan, 2026-11-15): the Mexican word is taught and the Spain word is an accepted answer.
  off: Object.fromEntries(['camarero', 'bolso', 'recto', 'goma', 'pizarra', 'salón', 'dormitorio', 'armario', 'estantería', 'conducir', 'conduce', 'alquilar', 'carné', 'identidad', 'sello'].map((w) => [w, 'Spain: the course teaches the Mexican word (Dan, 2026-11-15)'])),
  // Added for coverage of the main path (PCIC words the first pass left out).
  late: [{ unit_id: 'U82', words: ['merienda'] }, { unit_id: 'U84', words: ['tierra'] }, { unit_id: 'U87', words: ['bombero'] }, { unit_id: 'U88', words: ['fijo'] }, { unit_id: 'U94', words: ['circo'] },
    // The Mexican words from Fable's Part 4 review (ids after the ones above, so none moves).
    { unit_id: 'U84', words: ['maneja'] }, { unit_id: 'U86', words: ['recámara', 'clóset', 'librero'] }, { unit_id: 'U88', words: ['licencia', 'credencial'] }, { unit_id: 'U89', words: ['timbre'] },
    { unit_id: 'U93', words: ['borrador', 'pizarrón'] }, { unit_id: 'U95', words: ['rentar', 'renta'] }],
}
