// Instructions in the course language (Dan, 2026-11-15; feature list: "instructions shift toward French as the course
// goes up in level"): from Part 3 on, the headings of common question types appear in the course language, phased in
// by part, with a tap for the English. Short informal imperatives (tu, du; você for Brazilian Portuguese), written by
// Claude for the native-speaker check like the drafts; they're interface text, not course content.
// PHASE: the part from which each heading (the English heading Lesson.jsx shows) switches.
export const PHASE = {
  Translate: 3, 'Match the Pairs': 3, 'Pick the Meaning': 3, 'Type the Word': 3,
  'Type What You Hear': 4, 'Tap What You Hear': 4, 'Pick What You Heard': 4, 'Listen and Translate': 4, 'Listen and Pick the Meaning': 4,
  'Fill in the Blank': 5, 'Pick the Picture': 5, 'Read and Answer': 5, 'Say It Aloud': 5, 'Speak and Compare': 5,
  'Fill In the Form': 6, 'Write a Message': 6, 'Write the Number': 6, 'Answer the Question': 6,
}
const KEYS = ['Translate', 'Match the Pairs', 'Pick the Meaning', 'Type the Word', 'Type What You Hear', 'Tap What You Hear', 'Pick What You Heard',
  'Listen and Translate', 'Listen and Pick the Meaning', 'Fill in the Blank', 'Pick the Picture', 'Read and Answer', 'Say It Aloud',
  'Speak and Compare', 'Fill In the Form', 'Write a Message', 'Write the Number', 'Answer the Question']
const row = (list) => Object.fromEntries(KEYS.map((k, i) => [k, list[i]]))
export const HEADINGS = {
  fr: row(['Traduis', 'Associe les paires', 'Choisis le sens', 'Écris le mot', 'Écoute et écris', 'Touche ce que tu entends', 'Choisis ce que tu as entendu',
    'Écoute et traduis', 'Écoute et choisis le sens', 'Complète la phrase', "Choisis l'image", 'Lis et réponds', 'Dis-le à voix haute',
    'Parle et compare', 'Remplis le formulaire', 'Écris un message', 'Écris le nombre', 'Réponds à la question']),
  es: row(['Traduce', 'Une las parejas', 'Elige el significado', 'Escribe la palabra', 'Escucha y escribe', 'Toca lo que oyes', 'Elige lo que oíste',
    'Escucha y traduce', 'Escucha y elige el significado', 'Completa la frase', 'Elige la imagen', 'Lee y responde', 'Dilo en voz alta',
    'Habla y compara', 'Llena el formulario', 'Escribe un mensaje', 'Escribe el número', 'Responde la pregunta']),
  de: row(['Übersetze', 'Finde die Paare', 'Wähle die Bedeutung', 'Schreib das Wort', 'Hör zu und schreib', 'Tippe, was du hörst', 'Wähle, was du gehört hast',
    'Hör zu und übersetze', 'Hör zu und wähle die Bedeutung', 'Ergänze den Satz', 'Wähle das Bild', 'Lies und antworte', 'Sag es laut',
    'Sprich und vergleiche', 'Füll das Formular aus', 'Schreib eine Nachricht', 'Schreib die Zahl', 'Beantworte die Frage']),
  it: row(['Traduci', 'Abbina le coppie', 'Scegli il significato', 'Scrivi la parola', 'Ascolta e scrivi', 'Tocca quello che senti', 'Scegli quello che hai sentito',
    'Ascolta e traduci', 'Ascolta e scegli il significato', 'Completa la frase', "Scegli l'immagine", 'Leggi e rispondi', 'Dillo ad alta voce',
    'Parla e confronta', 'Compila il modulo', 'Scrivi un messaggio', 'Scrivi il numero', 'Rispondi alla domanda']),
  pt: row(['Traduza', 'Combine os pares', 'Escolha o significado', 'Escreva a palavra', 'Ouça e escreva', 'Toque no que você ouve', 'Escolha o que você ouviu',
    'Ouça e traduza', 'Ouça e escolha o significado', 'Complete a frase', 'Escolha a imagem', 'Leia e responda', 'Diga em voz alta',
    'Fale e compare', 'Preencha o formulário', 'Escreva uma mensagem', 'Escreva o número', 'Responda à pergunta']),
}

// The heading in the course language for this part, or null (English stays): only from the heading's phase on.
export function courseHeading(english, part, courseId) {
  const from = PHASE[english]
  if (!from || !(part >= from)) return null
  return HEADINGS[courseId]?.[english] ?? null
}
