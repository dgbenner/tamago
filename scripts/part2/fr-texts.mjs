// French A1 Part 2: Read and Answer brought up to three texts in each circle that has it (Dan, 2026-11-15), to match
// Parts 3 to 6: U47 At the Market, U48 How Much Is It?, U49 Bottles + Bags each had one (R101 to R103).
// Only words taught by then. Used by scripts/add-items.mjs.
const DRAFT = 'draft: written for Tamago, native check'
const texts = [
  { id: 'R104', unit_id: 'U47', kind: 'sign', title: 'Fruits et légumes', lines: ['Pommes : 2 € le kilo', 'Oranges : 3 € le kilo', 'Légumes : 4 € le kilo'],
    questions: [{ question: 'How much is a kilo of oranges?', choices: ['€3', '€2', '€4'], answer: 0 }, { question: 'What costs €2 a kilo?', choices: ['Apples', 'Oranges', 'Vegetables'], answer: 0 }] },
  { id: 'R105', unit_id: 'U47', kind: 'message', title: 'Un message de Paul', lines: ['Marie,', 'Tu vas au marché ?', 'Tu peux acheter des pommes et un kilo de légumes ?', 'Merci !'],
    questions: [{ question: 'Where is Marie going?', choices: ['To the market', 'Home', 'To work'], answer: 0 }, { question: 'What does Paul want?', choices: ['Apples and vegetables', 'Bread and cheese', 'Milk and water'], answer: 0 }] },
  { id: 'R106', unit_id: 'U48', kind: 'menu', title: 'Sandwichs', lines: ['Sandwich au fromage : 4 €', 'Pain : 1,50 €', 'Eau : 1 €'],
    questions: [{ question: 'How much is the cheese sandwich?', choices: ['€4', '€1.50', '€1'], answer: 0 }, { question: 'What costs €1.50?', choices: ['The bread', 'The water', 'The sandwich'], answer: 0 }] },
  { id: 'R107', unit_id: 'U48', kind: 'message', title: 'Un message de Léa', lines: ['Paul,', 'Le pain coûte 1 €.', 'Le fromage est cher : 9 € !', 'Léa'],
    questions: [{ question: 'How much does the bread cost?', choices: ['€1', '€9', '€10'], answer: 0 }, { question: 'What is expensive?', choices: ['The cheese', 'The bread', 'The milk'], answer: 0 }] },
  { id: 'R108', unit_id: 'U49', kind: 'message', title: 'Un message de Paul', lines: ['Marie,', "Tu peux acheter deux bouteilles d'eau et une boîte de biscuits ?", 'Merci, Paul'],
    questions: [{ question: 'How many bottles of water?', choices: ['Two', 'One', 'Three'], answer: 0 }, { question: 'What else does Paul want?', choices: ['A box of biscuits', 'A bag of apples', 'A glass of milk'], answer: 0 }] },
  { id: 'R109', unit_id: 'U49', kind: 'message', title: 'Un message de Marie', lines: ['Paul,', "J'ai assez de lait, mais pas de pain.", 'Tu peux acheter un peu de fromage ?', 'Marie'],
    questions: [{ question: 'What is there enough of?', choices: ['Milk', 'Bread', 'Cheese'], answer: 0 }, { question: 'What should Paul buy?', choices: ['Bread and a little cheese', 'Milk and apples', 'Nothing'], answer: 0 }] },
]
export default {
  note: 'A1 · Part 2: Read and Answer up to three texts per circle (R104 to R109: two more each for U47, U48 and U49).',
  items: { a1_texts: texts.map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })) },
}
