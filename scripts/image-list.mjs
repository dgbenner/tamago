// _source/image-list.md: every picturable A1 word without a picture in the sushi style, for French and Spanish (Dan,
// 2026-11-10). One row per picture idea, with its French and Spanish words; Language is Shared (both courses use
// it), French or Spanish (food and culture items stay with their own language). Also writes content-es/pictures.json:
// the Spanish words that use a shared picture (Dan's set, or OpenMoji where his isn't made yet).
// Usage: node scripts/image-list.mjs   (after both courses' content is built)
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
const R = join(import.meta.dirname, '..') + '/'
const j = (p) => JSON.parse(readFileSync(R + p, 'utf8'))
const words = j('src/content/words.json'), sw = j('src/content/sentence_words.json'), live = new Set(j('src/content/sentences.json').map((s) => s.sentence_id))
const units = new Map(j('src/content/units.json').map((u) => [u.unit_id, u]))
const uses = {}; for (const r of sw) if (live.has(r.sentence_id) && r.word_id) (uses[r.word_id] ??= new Set()).add(r.sentence_id)
// form: [English, what to draw, shares the image of]
const D = {
  enfants: ['children', 'two young children standing side by side'],
  chien: ['dog', 'a friendly brown dog sitting, seen from the side'],
  pomme: ['apple', 'one red apple with a leaf'],
  chat: ['cat', 'one ginger cat sitting'],
  livre: ['book', 'one closed hardback book, red cover, no title'],
  pain: ['bread', 'a French baguette and a round loaf'],
  femme: ['woman', 'a woman, head and shoulders, plain top'],
  chats: ['cats', 'two cats sitting together'],
  garçon: ['boy', 'a boy of about eight, head and shoulders'],
  homme: ['man', 'a man, head and shoulders, plain top'],
  lettre: ['letter', 'a sealed paper envelope'],
  ami: ['friend (male)', 'two young men side by side, one arm around the other’s shoulder'],
  chiens: ['dogs', 'two dogs side by side'],
  souris: ['mouse', 'a small grey mouse with a long tail'],
  amie: ['friend (female)', 'two young women side by side, smiling, one arm around the other’s shoulder'],
  enfant: ['child', 'one young child, head and shoulders'],
  cheval: ['horse', 'a brown horse standing, seen from the side'],
  blanc: ['white', 'a glossy white circle, like a paint swatch, with a light grey outline so it shows'],
  filles: ['girls', 'two girls side by side'],
  eau: ['water', 'a clear glass of water'],
  livres: ['books', 'a small stack of three books, no titles'],
  noir: ['black', 'a glossy black circle, like a paint swatch'],
  fille: ['girl', 'a girl of about eight, head and shoulders'],
  tortue: ['turtle', 'a green tortoise walking, seen from the side'],
  pommes: ['apples', 'three red apples together'],
  malade: ['sick', 'a person in bed under a blanket, pale, with a tissue (not a thermometer: that is fièvre)'],
  femmes: ['women', 'two women side by side'],
  école: ['school', 'a small school building with a bell and a flag pole (no flag, no words)'],
  parc: ['park', 'a green park with two trees, a path and a bench'],
  magasin: ['shop', 'a small shop front with an awning and a window display (no sign text)'],
  garçons: ['boys', 'two boys side by side'],
  lait: ['milk', 'a glass of milk beside a milk carton (no label text)'],
  animaux: ['animals', 'a dog, a cat and a bird together'],
  thé: ['tea', 'a cup of tea with a tea bag string over the side'],
  oiseaux: ['birds', 'two small birds on a branch'],
  rouge: ['red', 'a glossy red circle, like a paint swatch'],
  blanche: ['white', 'same image as blanc', 'blanc'],
  jaune: ['yellow', 'a glossy yellow circle, like a paint swatch'],
  restaurant: ['restaurant', 'a restaurant table set for two, white cloth, plates and glasses'],
  bureau: ['office', 'an office desk with a computer screen, a chair and a mug'],
  médecin: ['doctor', 'a doctor in a white coat with a stethoscope, head and shoulders'],
  docteur: ['doctor', 'same image as médecin', 'médecin'],
  hommes: ['men', 'two men side by side'],
  journal: ['newspaper', 'a folded newspaper (squiggles for text, no real letters)'],
  fromage: ['cheese', 'a wedge of yellow cheese with holes'],
  sandwich: ['sandwich', 'a sandwich cut in half, ham and lettuce visible'],
  canard: ['duck', 'a duck with a green head, seen from the side'],
  sucre: ['sugar', 'a few white sugar cubes, one on a spoon'],
  viande: ['meat', 'a raw steak on a small board'],
  poisson: ['fish', 'one whole fish, blue and silver, seen from the side'],
  lettres: ['letters', 'three envelopes fanned out'],
  bleu: ['blue', 'a glossy blue circle, like a paint swatch'],
  verte: ['green', 'same image as vert', 'vert'],
  ville: ['town, city', 'a small cluster of city buildings with windows'],
  orange: ['orange', 'one orange fruit with a leaf'],
  oiseau: ['bird', 'one small blue bird perched'],
  neige: ['snow', 'snowflakes falling over a snowy ground'],
  pluie: ['rain', 'a grey cloud with raindrops falling'],
  soleil: ['sun', 'a bright yellow sun with rays'],
  froid: ['cold', 'a thermometer showing low, blue, beside a snowflake'],
  chaud: ['hot', 'a thermometer showing high, red, beside a sun'],
  bébé: ['baby', 'a baby sitting, in a onesie'],
  famille: ['family', 'two parents and two children together'],
  maison: ['house', 'a small house with a red roof, a door and two windows'],
  table: ['table', 'a plain wooden table, nothing on it'],
  chaise: ['chair', 'one wooden chair'],
  cuisine: ['kitchen', 'a kitchen corner: cooker, a pan, cupboards'],
  lit: ['bed', 'a bed with a pillow and a blanket, nobody in it'],
  porte: ['door', 'a closed wooden front door with a handle'],
  fenêtre: ['window', 'a window with four panes and open curtains'],
  musique: ['music', 'two musical notes'],
  piano: ['piano', 'an upright piano'],
  guitare: ['guitar', 'an acoustic guitar'],
  chanteur: ['singer', 'a man singing into a microphone'],
  café: ['coffee', 'a small cup of black coffee on a saucer'],
  chocolat: ['chocolate', 'a bar of dark chocolate, partly unwrapped (no label text)'],
  tasse: ['cup', 'an empty cup on a saucer, seen from the side'],
  croissant: ['croissant', 'one golden croissant'],
  poulet: ['chicken', 'a roast chicken on a plate'],
  riz: ['rice', 'a bowl of white rice'],
  banane: ['banana', 'one yellow banana'],
  tomate: ['tomato', 'one red tomato with its green stalk'],
  œuf: ['egg', 'one brown egg'],
  œufs: ['eggs', 'three brown eggs together'],
  beurre: ['butter', 'a block of butter on a dish, a knife beside it'],
  plage: ['beach', 'a beach with sand, sea and a parasol'],
  mer: ['sea', 'open sea with waves, a strip of sky, no land'],
  bateau: ['boat', 'a small sailing boat on water'],
  sable: ['sand', 'a small heap of sand with a bucket and spade'],
  chevaux: ['horses', 'two horses side by side'],
  bleue: ['blue', 'same image as bleu', 'bleu'],
  vert: ['green', 'a glossy green circle, like a paint swatch'],
  noire: ['black', 'same image as noir', 'noir'],
  stylo: ['pen', 'one ballpoint pen'],
  médecins: ['doctors', 'two doctors in white coats side by side'],
  hôpital: ['hospital', 'a hospital building with a red cross on the front (no words)'],
  fièvre: ['fever', 'a thermometer showing a high red reading, with a hot red glow'],
}
const ascii = (f) => f.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/œ/g, 'oe').replace(/[^a-z]/g, '')

// The Spanish words for each French row (a row is one picture idea; Spanish words reuse its picture).
const ES = {
  homme: ['hombre'], femme: ['mujer'], garçon: ['niño'], fille: ['niña'], enfant: [], enfants: ['niños'], pain: ['pan'], eau: ['agua'], lait: ['leche'], fromage: ['queso'],
  orange: ['naranja'], pomme: ['manzana'], pommes: ['manzanas'], chien: ['perro'], chiens: ['perros'], chat: ['gato'], chats: ['gatos'], cheval: ['caballo'], oiseau: ['pájaro'],
  canard: ['pato'], tortue: ['tortuga'], souris: ['ratón'], rouge: ['rojo', 'roja'], bleu: ['azul'], vert: ['verde'], noir: ['negro', 'negra'], blanc: ['blanco', 'blanca'],
  jaune: ['amarillo', 'amarilla'], ville: ['ciudad'], école: ['escuela'], parc: ['parque'], restaurant: ['restaurante'], magasin: ['tienda'], livre: ['libro'], livres: ['libros'],
  lettre: ['carta'], ami: ['amigo'], amie: ['amiga'], médecin: ['médico'], malade: ['enfermo'], femmes: ['mujeres'], filles: ['chicas'], café: ['café'], maison: ['casa'],
  table: ['mesa'], lit: ['cama'], porte: ['puerta'], cuisine: ['cocina'], journal: ['periódico'], animaux: [],
  famille: ['familia'], bébé: ['bebé'], hommes: ['hombres'], sucre: ['azúcar'], thé: ['té'], chocolat: ['chocolate'], chanteur: ['cantante'],
  musique: ['música'], guitare: ['guitarra'], tasse: ['taza'], hôpital: ['hospital'],
}
// The German words for each French row (2026-11-10), the same way: German words reuse the row's picture.
const DE = {
  homme: ['Mann'], femme: ['Frau'], garçon: ['Junge'], fille: ['Mädchen'], enfant: ['Kind'], enfants: ['Kinder'], pain: ['Brot'], eau: ['Wasser'], lait: ['Milch'], fromage: ['Käse'],
  pomme: ['Apfel'], pommes: ['Äpfel'], chien: ['Hund'], chiens: ['Hunde'], chat: ['Katze'], chats: ['Katzen'], cheval: ['Pferd'], oiseau: ['Vogel'], canard: ['Ente'], souris: ['Maus'],
  rouge: ['rot'], bleu: ['blau'], vert: ['grün'], noir: ['schwarz'], blanc: ['weiß'], jaune: ['gelb'], ville: ['Stadt'], école: ['Schule'], parc: ['Park'], restaurant: ['Restaurant'],
  livre: ['Buch'], livres: ['Bücher'], lettre: ['Brief'], ami: ['Freund'], amie: ['Freundin'], médecin: ['Arzt'], malade: ['krank'], femmes: ['Frauen'], hommes: ['Männer'],
  café: ['Kaffee'], maison: ['Haus'], journal: ['Zeitung'], famille: ['Familie'], sucre: ['Zucker'], thé: ['Tee'], chocolat: ['Schokolade'], chanteur: ['Sänger'], hôpital: ['Krankenhaus'],
  fièvre: ['Fieber'], viande: ['Fleisch'], poisson: ['Fisch'], riz: ['Reis'], banane: ['Banane'], œufs: ['Eier'], plage: ['Strand'], mer: ['Meer'], bateau: ['Boot'], neige: ['Schnee'],
  soleil: ['Sonne'], froid: ['kalt'], chaud: ['heiß'], cuisine: [], musique: ['Musik'], piano: ['Klavier'], guitare: ['Gitarre'], tasse: ['Tasse'], bureau: ['Büro'],
}
// Food and culture items that belong to one language; everything else is Shared.
const LANGUAGE = { croissant: 'French' }
// Spanish words with no French row: pictured only in the Spanish course.
const ES_ONLY = {
  profesor: ['teacher (man)', 'a male teacher in front of a blackboard with chalk squiggles (no letters)'],
  profesora: ['teacher (woman)', 'a female teacher in front of a blackboard with chalk squiggles (no letters)'],
  estudiante: ['student', 'a young student with a backpack and a notebook'],
  baño: ['bathroom', 'a small bathroom: a bathtub, a sink and a towel'],
}
const esWords = j('src/content-es/words.json'), esSw = j('src/content-es/sentence_words.json'), esLive = new Set(j('src/content-es/sentences.json').map((s) => s.sentence_id))
const esUses = {}; for (const r of esSw) if (esLive.has(r.sentence_id) && r.word_id) (esUses[r.word_id] ??= new Set()).add(r.sentence_id)
const esCount = (forms) => Math.max(0, ...forms.map((f) => esUses[esWords.find((w) => w.form === f)?.word_id]?.size ?? 0))
const frByForm = new Map(words.map((w) => [w.form, w]))

// A French word that no longer ships (pluie left the Weather pack) drops out of the list.
const rows = Object.entries(D).filter(([form]) => words.some((x) => x.form === form)).map(([form, [en, draw, share]]) => {
  const w = words.find((x) => x.form === form)
  const es = ES[form] ?? []
  const n = Math.max(uses[w.word_id]?.size ?? 0, esCount(es))
  const done = String(w.image_file).startsWith('pictures/')
  return { w, form, es, en, draw, share, n, unit: unitName(w.first_unit), file: `${ascii(share ?? form)}.png`, language: LANGUAGE[form] ?? 'Shared',
    note: done ? 'done: in lessons' : w.image_file ? 'replaces the OpenMoji stand-in' : '' }
})
for (const [form, [en, draw]] of Object.entries(ES_ONLY)) {
  const w = esWords.find((x) => x.form === form)
  if (!w) throw new Error(form)
  rows.push({ form: '', es: [form], en, draw, n: esCount([form]), unit: `Spanish Unit ${Number(w.first_unit.slice(1))}`, file: `es-${ascii(form)}.png`, language: 'Shared', note: 'Spanish word only, so far' })
}
rows.sort((a, b) => (a.note.startsWith('done') ? 1 : 0) - (b.note.startsWith('done') ? 1 : 0) || b.n - a.n || (a.form || a.es[0]).localeCompare(b.form || b.es[0], 'fr'))
const pri = (n) => (n >= 10 ? 'High' : n >= 5 ? 'Medium' : 'Low')
function unitName(id) { const u = units.get(id); return u.is_topic_pick === 'yes' ? `${u.title} (topic)` : `Unit ${u.order}` }
const todo = rows.filter((r) => !r.note.startsWith('done'))
const out = [
  '# Pictures for Pick the Picture',
  '',
  `November 10, 2026. Every A1 word in French and Spanish that can be pictured (people, food, animals, objects, colours, places, weather). ${todo.length} rows still need a picture, most-used first; the ${rows.length - todo.length} already in lessons are at the end. Language says who can use the picture: Shared (any course; nearly all of them, even where only one course has the word so far), French or Spanish (food and culture items stay with their own language: croissant is French). A Spanish word on a French row uses that row's picture.`,
  '',
  'Left out on purpose: verbs, numbers, days and times, and words a picture can’t tell apart from another in the same set (mère, père, frère, sœur, fils, parents, patron; chambre; chanson; temps, travail, animal). Size and quality adjectives need two pictures to compare, which Pick the Picture doesn’t do.',
  '',
  '## Where to put them',
  '',
  'Drop finished PNGs in `_source/pictures/`, named as in the File column. I copy them into the app, resize them and wire them to the words in both courses. A word keeps its stand-in until its picture arrives.',
  '',
  '## The prompt',
  '',
  'Attach one sushi icon as the style reference (for example `_source/icons/nigiri/Ebi.png`) and use this each time, changing only the last line:',
  '',
  '```',
  'Make an icon in exactly the same style as the attached sushi image: a single emoji-style object, softly lit and',
  'gently glossy, with clean simple shapes, rich natural colours and a soft shadow underneath. Flat emoji style, no',
  'outlines, no photo realism. Square, 1024 by 1024. Plain white background, nothing else in the frame. The subject',
  'centred and filling about three quarters of the square. No text, no letters, no numbers, no logos, no brand or',
  'cartoon character. People: simple, friendly, neutral faces, plain clothes, no particular celebrity.',
  'Subject: <description from the table>',
  '```',
  '',
  '## The list',
  '',
  '| # | French | Spanish | English | File | What to draw | Language | Priority | Sentences | Unit | Note |',
  '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ...rows.map((r, i) => `| ${i + 1} | ${r.form} | ${r.es.join(', ')} | ${r.en} | ${r.file} | ${r.draw} | ${r.language} | ${pri(r.n)} | ${r.n} | ${r.unit} | ${r.note} |`),
  '',
  'Priority: High is in 10 or more live sentences in either course, Medium 5 to 9, Low under 5. Sentences counts the larger of the two courses. Unit is the French unit, or the Spanish one for a Spanish-only row.',
  '',
]
writeFileSync(R + '_source/image-list.md', out.join('\n'))

// Spanish words that use a shared picture: Dan's where it's made, else the French word's OpenMoji stand-in.
const pictures = {}
for (const r of rows) for (const f of r.es) {
  const esw = esWords.find((x) => x.form === f) ?? JSON.parse(readFileSync(R + 'content-es/raw/words.json', 'utf8')).find((x) => x.form === f)
  const frw = r.form ? frByForm.get(r.form) : null
  const file = frw?.image_file
  if (esw && file) pictures[esw.word_id] = file
}
writeFileSync(R + 'content-es/pictures.json', JSON.stringify({ _about: 'Spanish words that use a shared picture (scripts/image-list.mjs): Dan\'s where it is made, else the OpenMoji stand-in of the French word on the same row.', words: pictures }, null, 2) + '\n')
// German words that use a shared picture, the same way (content-de/pictures.json).
const dePictures = {}
const deWords = JSON.parse(readFileSync(R + 'content-de/raw/words.json', 'utf8'))
for (const r of rows) for (const f of DE[r.form] ?? []) {
  const dew = deWords.find((x) => x.form === f && !String(x.status).startsWith('off'))
  const file = r.form ? frByForm.get(r.form)?.image_file : null
  if (dew && file) dePictures[dew.word_id] = file
}
writeFileSync(R + 'content-de/pictures.json', JSON.stringify({ _about: 'German words that use a shared picture (scripts/image-list.mjs): Dan\'s where it is made, else the OpenMoji stand-in of the French word on the same row.', words: dePictures }, null, 2) + '\n')
console.log(`German words with a picture: ${Object.keys(dePictures).length}`)
console.log(`${rows.length} rows (${todo.length} to make), ${new Set(rows.map((r) => r.file)).size} files; Spanish words with a picture: ${Object.keys(pictures).length}`)
