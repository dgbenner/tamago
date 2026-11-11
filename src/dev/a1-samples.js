// Samples of the A1 task question types (QT14 to QT17), for the Developer page's "Try the A1 Task Types" only. Not
// course content: Part 2 writes the real items into the workbook, Tatoeba first, drafts marked for the native check.
export const A1_SAMPLES = {
  fr: {
    QT14: { id: 'SX14', kind: 'menu', title: 'Café de la Gare', lines: ['Café : 2,50 €', 'Thé : 3 €', 'Croissant : 1,80 €', 'Sandwich : 5,50 €'],
      questions: [{ question: 'How much is a tea?', choices: ['€2.50', '€3', '€5.50'], answer: 1 }, { question: 'What costs €1.80?', choices: ['A coffee', 'A croissant', 'A sandwich'], answer: 1 }] },
    QT15: { id: 'SX15', card: "Je m'appelle Hélène Dupont. J'ai 32 ans. J'habite 12 rue des Lilas, à Lyon. Je suis française. Mon numéro : 06 12 34 56 78.",
      fields: [{ key: 'name', label: 'Nom et prénom', rule: 'text', answer: 'Hélène Dupont', also: ['Dupont Hélène'] }, { key: 'age', label: 'Âge', rule: 'number', answer: '32' },
        { key: 'address', label: 'Adresse', rule: 'text', answer: '12 rue des Lilas, Lyon', also: ['12 rue des Lilas'] }, { key: 'nat', label: 'Nationalité', rule: 'text', answer: 'française' },
        { key: 'tel', label: 'Téléphone', rule: 'phone', answer: '06 12 34 56 78' }] },
    QT16: { id: 'SX16', prompt: 'Write a short postcard to a friend from your holiday.', points: ['where you are', 'the weather', 'what you do each day'], min_words: 30, max_words: 40 },
    QT17: { id: 'SX17', kind: 'price', say: 'trois euros cinquante', answer: '3.50' },
  },
  es: {
    QT14: { id: 'SX14', kind: 'menu', title: 'Cafetería Sol', lines: ['Café: 30 pesos', 'Té: 25 pesos', 'Pan dulce: 18 pesos', 'Torta: 55 pesos'],
      questions: [{ question: 'How much is a tea?', choices: ['30 pesos', '25 pesos', '55 pesos'], answer: 1 }, { question: 'What costs 18 pesos?', choices: ['A coffee', 'Sweet bread', 'A torta'], answer: 1 }] },
    QT15: { id: 'SX15', card: 'Me llamo Lucía Gómez. Tengo 28 años. Vivo en la calle Sol 15, en Puebla. Soy mexicana. Mi teléfono es 55 1234 5678.',
      fields: [{ key: 'name', label: 'Nombre', rule: 'text', answer: 'Lucía Gómez' }, { key: 'age', label: 'Edad', rule: 'number', answer: '28' },
        { key: 'address', label: 'Dirección', rule: 'text', answer: 'calle Sol 15, Puebla', also: ['calle Sol 15'] }, { key: 'nat', label: 'Nacionalidad', rule: 'text', answer: 'mexicana' },
        { key: 'tel', label: 'Teléfono', rule: 'phone', answer: '55 1234 5678' }] },
    QT16: { id: 'SX16', prompt: 'Write a short postcard to a friend from your holiday.', points: ['where you are', 'the weather', 'what you do each day'], min_words: 30, max_words: 40 },
    QT17: { id: 'SX17', kind: 'number', say: 'veinticinco', answer: '25' },
  },
  de: {
    QT14: { id: 'SX14', kind: 'menu', title: 'Café am Markt', lines: ['Kaffee: 2,80 €', 'Tee: 2,20 €', 'Brötchen: 1,10 €', 'Kuchen: 3,50 €'],
      questions: [{ question: 'How much is a tea?', choices: ['€2.80', '€2.20', '€3.50'], answer: 1 }, { question: 'What costs €1.10?', choices: ['A coffee', 'A bread roll', 'A cake'], answer: 1 }] },
    QT15: { id: 'SX15', card: 'Ich heiße Jonas Weber. Ich bin 41 Jahre alt. Ich wohne in der Gartenstraße 8 in Köln. Ich bin Deutscher. Meine Telefonnummer ist 0221 123456.',
      fields: [{ key: 'name', label: 'Name', rule: 'text', answer: 'Jonas Weber', also: ['Weber Jonas'] }, { key: 'age', label: 'Alter', rule: 'number', answer: '41' },
        { key: 'address', label: 'Adresse', rule: 'text', answer: 'Gartenstraße 8, Köln', also: ['Gartenstrasse 8, Köln', 'Gartenstraße 8'] }, { key: 'nat', label: 'Nationalität', rule: 'text', answer: 'deutsch', also: ['Deutscher', 'Deutsch'] },
        { key: 'tel', label: 'Telefon', rule: 'phone', answer: '0221 123456' }] },
    QT16: { id: 'SX16', prompt: 'Write a short postcard to a friend from your holiday.', points: ['where you are', 'the weather', 'what you do each day'], min_words: 30, max_words: 40 },
    QT17: { id: 'SX17', kind: 'time', say: 'vierzehn Uhr dreißig', answer: '14:30' },
  },
}
