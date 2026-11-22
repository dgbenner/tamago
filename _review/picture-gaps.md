# Picture gaps

November 16, 2026. Research only; nothing in the repo was changed. Read from main at the last pushed commit (French, Spanish and German A1 complete, Italian Parts 1 to 4, Portuguese Part 1; Portuguese Part 2 was not pushed yet and is not counted).

## What a picture does

- **Pick the Picture** (QT02) is asked twice in ten questions in round 1 of every circle, and once more in round 2 of a vocabulary circle. It needs three pictured words the learner has met, and it asks the circle's new words first. In a circle whose own words have no picture, the slot re-asks pictures from earlier circles or falls back to Pick the Meaning.
- **Type the Word** (QT18, vocabulary circles and Brush-Up) shows the word's picture beside the English when it has one.
- **Picture Match Pairs does not exist.** Match Pairs has two variants and both pair a word with its meaning in text. Pairing words with pictures would be a new variant for Builder 1; the same pictures would feed it.
- So "unlocks" below means: the circle gets Pick the Picture on its own words (and the picture on Type the Word). Circles marked **first picture** have no pictured word of their own today.

## Counts

| Course | Words | With a picture | Circles | Circles with a pictured word of their own |
| --- | --- | --- | --- | --- |
| French | 989 | 96 | 110 | 17 |
| Spanish | 907 | 63 | 78 | 14 |
| German | 934 | 66 | 81 | 15 |
| Italian | 1103 | 36 | 72 | 9 |
| Portuguese | 274 | 39 | 21 | 10 |

- **Gaps found:** 284 picturable meanings without a picture, which is 666 course words (a meaning counts once per course form: German Hund and Spanish perro are one meaning, two words).
- **Batches:** 20, of about 20 meanings each, in 11 themes.
- **One image, several courses:** 167 of the 284 meanings are taught in two or more courses, so one picture serves them all; 63 are in four or five.
- **No new art needed:** 37 meanings already have a picture in another course (or under another form) and only need mapping; they cover 62 course words. Listed first in section "Already drawn".

| Course | Circles with no pictured word of their own | Would get a first picture from these batches |
| --- | --- | --- |
| French | 93 | 38 |
| Spanish | 64 | 40 |
| German | 66 | 38 |
| Italian | 63 | 29 |
| Portuguese | 11 | 3 |

Circles that stay without one are the ones with nothing to draw: help circles, grammar circles (Plurals, Mine + Yours, Asking Questions), numbers, days and months, little words.

## How the ranking works

Each meaning scores 3 for every course that teaches it, 1 for every course word it covers, and 1 more for every circle it would give a first picture. Batches are ranked by the sum. Abstract nouns, days, months, numbers, languages and countries are left out.

Reading a row: **Courses** is F French, S Spanish, G German, I Italian, P Portuguese. **Where** lists the word and its circle in each course; a circle in bold gets its first picture.

## Already drawn: map these first

37 meanings have a picture in the app already. Mapping the existing file to the other courses' words costs no art. German does this through scripts/image-list.mjs; Italian and Portuguese have hand-written pictures.json files.

| Meaning | Existing picture | Words still without it |
| --- | --- | --- |
| shop | pictures/magasin.webp | G Geschäft: **U92 Shops + Services**; G Laden: **U92 Shops + Services**; P loja: U15 Going Places |
| chicken | pictures/poulet.webp | S pollo: **U82 At the Restaurant**; G Hähnchen: **U91 Food**; I pollo: **U82 At the Restaurant** |
| pen | pictures/stylo.webp | S bolígrafo: **U55 In Class**; G Kugelschreiber: **U55 In Class**; I penna: **U55 In Class** |
| letter | pictures/lettre.webp, pictures/lettres.webp | S letra: **U34 Spelling It Out**; G Buchstabe: **U34 Spelling It Out**; I lettera: **U34 Spelling It Out** |
| window | pictures/fenetre.webp | S ventana: **U86 At Home**; G Fenster: **U69 Instructions**; I finestra: **U86 At Home** |
| chair | pictures/chaise.webp | S silla: **U55 In Class**; G Stuhl: **U55 In Class**; I sedia: **U86 At Home** |
| doctor | pictures/medecin.webp | S doctor: U202 At the Doctor (topic pack); G Ärztin: U202 At the Doctor (topic pack); G Doktor: **U87 At Work** |
| meat | pictures/viande.webp | S carne: **U82 At the Restaurant**; I carne: **U82 At the Restaurant** |
| egg | pictures/oeuf.webp, pictures/oeufs.webp | G Ei: **U91 Food**; I uova: **U47 At the Market** |
| sea | pictures/mer.webp | S mar: **U58 Outdoors**; I mare: **U58 Outdoors** |
| beach | pictures/plage.webp | S playa: **U58 Outdoors**; I spiaggia: **U58 Outdoors** |
| sun | pictures/soleil.webp | S sol: **U58 Outdoors**; I sole: **U58 Outdoors** |
| door | pictures/porte.webp | G Tür: **U69 Instructions**; I porta: **U86 At Home** |
| town | pictures/ville.webp | S pueblo: **U53 Around Town**; I comune: **U75 Town + Region** |
| office | pictures/bureau.webp | S oficina: **U201 At the Office (topic pack)**; I ufficio: **U66 Signs + Notices** |
| fish | pictures/poisson.webp | S pescado: **U82 At the Restaurant**; G Fische: U212 At the Beach (topic pack) |
| child | pictures/enfant.webp, pictures/enfants.webp, pictures/garcon.webp | I bambino: U01 Say Hi; P criança: U01 Say Hi |
| girl | pictures/fille.webp, pictures/filles.webp | S chica: U01 Say Hi; I bambina: U01 Say Hi |
| boat | pictures/bateau.webp | S barco: **U67 Timetables** |
| table | pictures/table.webp | G Tisch: **U55 In Class** |
| bed | pictures/lit.webp | G Bett: **U65 My Day** |
| kitchen | pictures/cuisine.webp | G Küche: **U86 At Home** |
| school | pictures/ecole.webp | S colegio: **U93 School + Study** |
| restaurant | pictures/restaurant.webp | G Lokal: **U82 At the Restaurant** |
| eggs | pictures/oeufs.webp | S huevos: **U47 At the Market** |
| rice | pictures/riz.webp | S arroz: **U82 At the Restaurant** |
| butter | pictures/beurre.webp | G Butter: **U81 At the Café** |
| sandwich | pictures/sandwich.webp | S sándwich: **U81 At the Café** |
| sugar | pictures/sucre.webp | I zucchero: **U81 At the Café** |
| baby | pictures/bebe.webp | G Baby: **U51 People + Feelings** |
| man | pictures/homme.webp, pictures/hommes.webp | G Herr: **U51 People + Feelings** |
| boy | pictures/garcon.webp, pictures/garcons.webp | S chico: U01 Say Hi |
| newspaper | pictures/journal.webp | I giornale: **U72 In the News** |
| singer | pictures/chanteur.webp | G Sängerin: U205 Music (topic pack) |
| snow | pictures/neige.webp | S nieve: **U72 The Weather** |
| cold | pictures/froid.webp | P frio: **U09 How You Feel** |
| fever | pictures/fievre.webp | S fiebre: U202 At the Doctor (topic pack) |

## Ranked batches

### Batch 1: Town (1 of 3)

20 meanings, 72 course words, 65 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| bank | FSGIP | F banque: **U86 Shops + Services**; S banco: **U66 Signs + Notices**; G Bank: **U92 Shops + Services**; I banca: **U66 Signs + Notices**; P banco: U53 Around Town | one image for 5 courses |
| hotel | FSGIP | F hôtel: **U51 Around Town**; S hotel: **U53 Around Town**; G Hotel: **U204 At the Hotel (topic pack)**; I albergo: **U53 Around Town**; P hotel: U53 Around Town | one image for 5 courses |
| station | FSGIP | F gare: **U51 Around Town**; S estación: **U53 Around Town**; G Bahnhof: **U53 Around Town**; I stazione: **U53 Around Town**; P estação: U53 Around Town | one image for 5 courses |
| street | FSGIP | F rue: **U45 Where You Live**; S calle: **U53 Around Town**; G Straße: **U53 Around Town**; I via: **U45 Where You Live**; P rua: U53 Around Town | one image for 5 courses |
| market | FSGI | F marché: **U47 At the Market**; S mercado: **U47 At the Market**; G Markt: **U47 At the Market**; I mercato: **U47 At the Market** | one image for 4 courses |
| pharmacy | FSGI | F pharmacie: **U86 Shops + Services**; S farmacia: **U66 Signs + Notices**; G Apotheke: **U92 Shops + Services**; I farmacia: **U66 Signs + Notices** | one image for 4 courses |
| cinema | FSGI | F cinéma: **U51 Around Town**; S cine: **U53 Around Town**; G Kino: **U53 Around Town**; I cinema: **U53 Around Town** | one image for 4 courses |
| exit | FSGI | F sortie: **U66 Signs + Notices**; S salida: **U66 Signs + Notices**; G Ausgang: **U66 Signs + Notices**; I uscita: **U66 Signs + Notices** | one image for 4 courses |
| church | FSIP | F église: **U51 Around Town**; S iglesia: **U53 Around Town**; I chiesa: **U53 Around Town**; P igreja: U53 Around Town | one image for 4 courses |
| museum | FSIP | F musée: **U51 Around Town**; S museo: **U53 Around Town**; I museo: **U53 Around Town**; P museu: U53 Around Town | one image for 4 courses |
| theater | FSI | F théâtre: **U602 Going Out**; S teatro: **U53 Around Town**; I teatro: **U53 Around Town** | one image for 3 courses |
| road | FSI | F route: **U55 Outdoors**; S carretera: **U68 Announcements**; I strada: **U53 Around Town** | one image for 3 courses |
| bar | FSI | F bar: **U602 Going Out**; S bar: **U81 At the Café**; I bar: **U81 At the Café** | one image for 3 courses |
| entrance | FSG | F entrée: **U66 Signs + Notices**; S entrada: **U66 Signs + Notices**; G Eingang: **U66 Signs + Notices** | one image for 3 courses |
| shop | GP | G Geschäft: **U92 Shops + Services**; G Laden: **U92 Shops + Services**; P loja: U15 Going Places | already drawn, map it |
| bakery | FG | F boulangerie: **U86 Shops + Services**; G Bäckerei: **U92 Shops + Services** | one image for 2 courses |
| supermarket | FG | F supermarché: **U86 Shops + Services**; G Supermarkt: **U92 Shops + Services** | one image for 2 courses |

### Batch 2: Food + Drink (1 of 3)

20 meanings, 68 course words, 62 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| wine | FSGIP | F vin: **U81 At the Café**; S vino: **U81 At the Café**; G Wein: **U81 At the Café**; I vino: U04 Food + Drink; P vinho: U04 Food + Drink | one image for 5 courses |
| juice | FSGIP | F jus: **U81 At the Café**; S jugo: U206 At the Café (topic pack); G Saft: U206 At the Café (topic pack); I succo: **U81 At the Café**; P suco: U04 Food + Drink | one image for 5 courses |
| fruit | FSGI | F fruits: **U47 At the Market**; F fruit: **U47 At the Market**; S fruta: **U47 At the Market**; G Obst: **U47 At the Market**; I frutta: **U47 At the Market** | one image for 4 courses |
| beer | FSGI | F bière: **U81 At the Café**; S cerveza: **U81 At the Café**; G Bier: **U81 At the Café**; I birra: **U81 At the Café** | one image for 4 courses |
| salad | FSGI | F salade: **U82 At the Restaurant**; S ensalada: **U82 At the Restaurant**; G Salat: **U91 Food**; I insalata: **U82 At the Restaurant** | one image for 4 courses |
| dessert | FSGI | F dessert: **U82 At the Restaurant**; S postre: **U82 At the Restaurant**; G Nachtisch: **U82 At the Restaurant**; I dolce: **U82 At the Restaurant** | one image for 4 courses |
| cookies | FSGI | F biscuits: **U49 Bottles + Bags**; S galletas: **U49 Bottles + Bags**; G Kekse: **U49 Bottles + Bags**; I biscotti: **U49 Bottles + Bags** | one image for 4 courses |
| bottle | FSGI | F bouteille: **U49 Bottles + Bags**; S botella: **U49 Bottles + Bags**; G Flasche: **U49 Bottles + Bags**; I bottiglia: **U49 Bottles + Bags** | one image for 4 courses |
| glass | FSGI | F verre: **U49 Bottles + Bags**; S vaso: **U49 Bottles + Bags**; G Glas: **U49 Bottles + Bags**; I bicchiere: **U49 Bottles + Bags** | one image for 4 courses |
| soup | FSG | F soupe: **U82 At the Restaurant**; S sopa: **U82 At the Restaurant**; G Suppe: **U91 Food** | one image for 3 courses |
| vegetables | FSG | F légumes: **U47 At the Market**; S verdura: **U47 At the Market**; G Gemüse: **U47 At the Market** | one image for 3 courses |
| chicken | SGI | S pollo: **U82 At the Restaurant**; G Hähnchen: **U91 Food**; I pollo: **U82 At the Restaurant** | already drawn, map it |
| breakfast | SGI | S desayuno: **U65 My Day**; G Frühstück: **U91 Food**; I colazione: **U65 My Day** | one image for 3 courses |
| lunch | FGI | F déjeuner: **U65 My Day**; G Mittagessen: **U91 Food**; I pranzo: **U65 My Day** | one image for 3 courses |
| dinner | FGI | F dîner: **U65 My Day**; G Abendessen: **U91 Food**; I cena: **U65 My Day** | one image for 3 courses |
| menu | FSG | F menu: **U82 At the Restaurant**; S menú: **U82 At the Restaurant**; G Speisekarte: **U81 At the Café** | one image for 3 courses |
| plate | SI | S plato: **U82 At the Restaurant**; I piatto: **U82 At the Restaurant** | one image for 2 courses |
| meat | SI | S carne: **U82 At the Restaurant**; I carne: **U82 At the Restaurant** | already drawn, map it |
| egg | GI | G Ei: **U91 Food**; I uova: **U47 At the Market** | already drawn, map it |
| cake | FG | F gâteau: **U82 At the Restaurant**; G Kuchen: U206 At the Café (topic pack) | one image for 2 courses |

### Batch 3: Things You Carry + Use (1 of 2)

20 meanings, 65 course words, 61 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| euro | FSGI | F euro: **U48 How Much Is It?**; F euros: **U48 How Much Is It?**; S euro: **U91 Everyday Things**; S euros: **U91 Everyday Things**; G Euro: **U48 How Much Is It?**; I euro: **U48 How Much Is It?** | one image for 4 courses |
| photo | FSGIP | F photo: **U52 Free Time**; S foto: **U52 Free Time**; G Foto: **U52 Free Time**; I foto: U52 Free Time; P foto: U52 Free Time | one image for 5 courses |
| bag | FSGI | F sac: **U49 Bottles + Bags**; S bolsa: **U49 Bottles + Bags**; G Tüte: **U49 Bottles + Bags**; G Tasche: **U49 Bottles + Bags**; I borsa: **U49 Bottles + Bags** | one image for 4 courses |
| ticket | FSGI | F billet: **U88 Travelling**; S boleto: **U67 Timetables**; G Fahrkarte: **U67 Timetables**; G Ticket: **U67 Timetables**; I biglietto: **U67 Timetables** | one image for 4 courses |
| mobile phone | FSGI | F portable: **U42 Phone Numbers**; S celular: **U42 Phone Numbers**; G Handy: **U42 Phone Numbers**; I cellulare: **U42 Phone Numbers** | one image for 4 courses |
| money | FSGI | F argent: **U48 How Much Is It?**; S dinero: **U48 How Much Is It?**; G Geld: **U08 Not + None**; I soldi: **U48 How Much Is It?** | one image for 4 courses |
| card | FSGI | F carte: **U48 How Much Is It?**; S tarjeta: **U48 How Much Is It?**; G Karte: **U48 How Much Is It?**; I carta: **U48 How Much Is It?** | one image for 4 courses |
| package | FSGI | F paquet: **U49 Bottles + Bags**; S paquete: **U49 Bottles + Bags**; G Packung: **U49 Bottles + Bags**; I pacchetto: **U49 Bottles + Bags** | one image for 4 courses |
| suitcase | FSGI | F valise: **U88 Travelling**; S maleta: **U68 Announcements**; G Koffer: **U68 Announcements**; I valigia: **U68 Announcements** | one image for 4 courses |
| telephone | FSGI | F téléphone: **U42 Phone Numbers**; S teléfono: **U201 At the Office (topic pack)**; G Telefon: U201 At the Office (topic pack); I telefono: **U42 Phone Numbers** | one image for 4 courses |
| box | FSI | F boîte: **U49 Bottles + Bags**; S caja: **U49 Bottles + Bags**; I scatola: **U49 Bottles + Bags** | one image for 3 courses |
| passport | SGI | S pasaporte: **U68 Announcements**; G Pass: **U94 Trips**; I passaporto: **U68 Announcements** | one image for 3 courses |
| computer | FSG | F ordinateur: **U504 Housework**; S computadora: **U201 At the Office (topic pack)**; G Computer: U201 At the Office (topic pack) | one image for 3 courses |
| television | FS | F télé: **U504 Housework**; S televisión: **U73 Hobbies** | one image for 2 courses |
| present | FG | F cadeau: **U52 Free Time**; G Geschenk: **U52 Free Time** | one image for 2 courses |
| map | FS | F plan: **U27 I'm Lost**; S mapa: **U55 In Class** | one image for 2 courses |
| street map | SG | S plano: **U75 Places to Visit**; G Stadtplan: **U27 I'm Lost** | one image for 2 courses |
| radio | S | S radio: **U73 Hobbies** |  |
| wallet | S | S cartera: **U91 Everyday Things** |  |
| watch | S | S reloj: **U54 Clothes** |  |

### Batch 4: Nature + Weather (1 of 2)

20 meanings, 61 course words, 60 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| tree | FSGI | F arbre: **U55 Outdoors**; S árbol: **U207 In the Garden (topic pack)**; G Baum: **U58 Outdoors**; I albero: **U58 Outdoors** | one image for 4 courses |
| flower | FSGI | F fleur: **U55 Outdoors**; S flor: **U207 In the Garden (topic pack)**; G Blume: **U58 Outdoors**; I fiore: **U58 Outdoors** | one image for 4 courses |
| mountain | FSGI | F montagne: **U55 Outdoors**; S montaña: **U58 Outdoors**; G Berg: **U58 Outdoors**; I montagna: **U58 Outdoors** | one image for 4 courses |
| spring | FSGI | F printemps: **U63 Months + Seasons**; S primavera: **U63 Months + Seasons**; G Frühling: **U72 Seasons + Times of Day**; I primavera: **U63 Months + Seasons** | one image for 4 courses |
| summer | FSGI | F été: **U63 Months + Seasons**; S verano: **U63 Months + Seasons**; G Sommer: **U72 Seasons + Times of Day**; I estate: **U63 Months + Seasons** | one image for 4 courses |
| autumn | FSGI | F automne: **U63 Months + Seasons**; S otoño: **U63 Months + Seasons**; G Herbst: **U72 Seasons + Times of Day**; I autunno: **U63 Months + Seasons** | one image for 4 courses |
| winter | FSGI | F hiver: **U63 Months + Seasons**; S invierno: **U63 Months + Seasons**; G Winter: **U72 Seasons + Times of Day**; I inverno: **U63 Months + Seasons** | one image for 4 courses |
| night | FSGI | F nuit: **U61 What Time Is It?**; S noche: **U61 What Time Is It?**; G Nacht: **U61 What Time Is It?**; I notte: **U61 What Time Is It?** | one image for 4 courses |
| sky | FSGI | F ciel: U101 The Weather (topic pack); S cielo: **U58 Outdoors**; G Himmel: **U58 Outdoors**; I cielo: **U58 Outdoors** | one image for 4 courses |
| lake | SGI | S lago: **U58 Outdoors**; G See: **U58 Outdoors**; I lago: **U58 Outdoors** | one image for 3 courses |
| river | SGI | S río: **U58 Outdoors**; G Fluss: **U58 Outdoors**; I fiume: **U58 Outdoors** | one image for 3 courses |
| forest | SGI | S bosque: **U58 Outdoors**; G Wald: **U58 Outdoors**; I bosco: **U58 Outdoors** | one image for 3 courses |
| wind | FSG | F vent: **U55 Outdoors**; S viento: **U72 The Weather**; G Wind: **U58 Outdoors** | one image for 3 courses |
| flowers | FG | F fleurs: **U55 Outdoors**; G Blumen: **U58 Outdoors** | one image for 2 courses |
| countryside | FS | F campagne: **U55 Outdoors**; S campo: **U58 Outdoors** | one image for 2 courses |
| sea | SI | S mar: **U58 Outdoors**; I mare: **U58 Outdoors** | already drawn, map it |
| beach | SI | S playa: **U58 Outdoors**; I spiaggia: **U58 Outdoors** | already drawn, map it |
| sun | SI | S sol: **U58 Outdoors**; I sole: **U58 Outdoors** | already drawn, map it |
| heat | SP | S calor: **U72 The Weather**; P calor: **U09 How You Feel** | one image for 2 courses |
| island | F | F île: **U75 Places to Visit** |  |

### Batch 5: School + Free Time (1 of 2)

20 meanings, 53 course words, 49 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| party | FSGIP | F fête: **U52 Free Time**; S fiesta: **U52 Free Time**; G Party: **U52 Free Time**; I festa: U52 Free Time; P festa: U52 Free Time | one image for 5 courses |
| birthday | FSGI | F anniversaire: **U43 Birthdays**; S cumpleaños: **U43 Age + Birthdays**; G Geburtstag: **U43 Age + Birthdays**; I compleanno: **U43 Age + Birthdays** | one image for 4 courses |
| holiday | FSGI | F vacances: **U52 Free Time**; S vacaciones: **U52 Free Time**; G Urlaub: **U52 Free Time**; I vacanza: **U53 Around Town** | one image for 4 courses |
| football | SGIP | S fútbol: **U52 Free Time**; G Fußball: **U52 Free Time**; I calcio: U52 Free Time; P futebol: U52 Free Time | one image for 4 courses |
| dictionary | SGI | S diccionario: **U55 In Class**; G Wörterbuch: **U55 In Class**; I dizionario: **U55 In Class** | one image for 3 courses |
| pencil | SGI | S lápiz: **U55 In Class**; G Bleistift: **U55 In Class**; I matita: **U55 In Class** | one image for 3 courses |
| pen | SGI | S bolígrafo: **U55 In Class**; G Kugelschreiber: **U55 In Class**; I penna: **U55 In Class** | already drawn, map it |
| letter | SGI | S letra: **U34 Spelling It Out**; G Buchstabe: **U34 Spelling It Out**; I lettera: **U34 Spelling It Out** | already drawn, map it |
| exam | FSG | F examen: **U506 School + Study**; S examen: **U55 In Class**; G Prüfung: **U55 In Class** | one image for 3 courses |
| film | FSG | F film: **U52 Free Time**; S película: **U52 Free Time**; G Film: **U52 Free Time** | one image for 3 courses |
| paper | SG | S papel: **U55 In Class**; G Papier: **U55 In Class** | one image for 2 courses |
| page | SI | S página: **U55 In Class**; I pagina: **U55 In Class** | one image for 2 courses |
| stamp | SG | S timbre: **U89 Messages + Postcards**; G Briefmarke: **U92 Shops + Services** | one image for 2 courses |
| homework | SG | S tarea: **U69 Instructions**; G Hausaufgaben: **U75 Must + May** | one image for 2 courses |
| wedding | FG | F mariage: **U502 My Family**; G Hochzeit: **U85 My Family** | one image for 2 courses |
| concert | FS | F concert: **U602 Going Out**; S concierto: **U64 Making Plans** | one image for 2 courses |
| tennis | FS | F tennis: **U93 Sport**; S tenis: **U73 Hobbies** | one image for 2 courses |
| exhibition | FS | F exposition: **U602 Going Out**; S exposición: **U75 Places to Visit** | one image for 2 courses |
| blackboard | S | S pizarrón: **U93 School + Study** |  |
| eraser | S | S borrador: **U93 School + Study** |  |

### Batch 6: Travel

17 meanings, 56 course words, 51 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| bus | FSGIP | F bus: **U51 Around Town**; S autobús: **U53 Around Town**; S autobuses: **U68 Announcements**; G Bus: **U53 Around Town**; I autobus: **U53 Around Town**; P ônibus: U53 Around Town | one image for 5 courses |
| taxi | FSGIP | F taxi: **U87 Getting Around**; S taxi: **U53 Around Town**; S taxis: **U68 Announcements**; G Taxi: **U53 Around Town**; I taxi: **U53 Around Town**; P táxi: U53 Around Town | one image for 5 courses |
| train | FSGIP | F train: **U51 Around Town**; S tren: **U53 Around Town**; G Zug: **U53 Around Town**; G Bahn: **U67 Timetables**; I treno: **U53 Around Town**; P trem: U53 Around Town | one image for 5 courses |
| bicycle | FSGIP | F vélo: **U51 Around Town**; S bicicleta: **U84 Getting Around**; G Fahrrad: **U53 Around Town**; G Rad: **U84 Getting Around**; I bicicletta: **U53 Around Town**; P bicicleta: U53 Around Town | one image for 5 courses |
| car | FSGIP | F voiture: **U51 Around Town**; S carro: **U53 Around Town**; G Auto: **U07 Describing Things**; I macchina: **U07 Describing Things**; P carro: **U07 Describing Things** | one image for 5 courses |
| airport | FSGIP | F aéroport: **U88 Travelling**; S aeropuerto: **U67 Timetables**; G Flughafen: **U53 Around Town**; I aeroporto: **U67 Timetables**; P aeroporto: U53 Around Town | one image for 5 courses |
| aeroplane | FSGI | F avion: **U88 Travelling**; S avión: **U67 Timetables**; G Flugzeug: **U68 Announcements**; I aereo: **U67 Timetables** | one image for 4 courses |
| platform | FGI | F quai: **U67 Timetables**; G Gleis: **U67 Timetables**; G Bahnsteig: **U67 Timetables**; I binario: **U67 Timetables** | one image for 3 courses |
| metro | FSI | F métro: **U51 Around Town**; S metro: **U68 Announcements**; I metropolitana: **U68 Announcements** | one image for 3 courses |
| stop | SGI | S parada: **U67 Timetables**; G Haltestelle: **U84 Getting Around**; I fermata: **U67 Timetables** | one image for 3 courses |
| tram | GI | G Straßenbahn: **U84 Getting Around**; I tram: **U84 Getting Around** | one image for 2 courses |
| suburban train | G | G S-Bahn: **U84 Getting Around** |  |
| boat | S | S barco: **U67 Timetables** | already drawn, map it |
| ship | I | I nave: **U67 Timetables** |  |
| truck | G | G Lkw: **U84 Getting Around** |  |
| motorway | G | G Autobahn: **U84 Getting Around** |  |
| flight | G | G Flug: **U68 Announcements** |  |

### Batch 7: Home (1 of 2)

20 meanings, 49 course words, 44 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| garden | FSGIP | F jardin: **U52 Free Time**; S jardín: **U207 In the Garden (topic pack)**; G Garten: **U52 Free Time**; I giardino: U08 Where Things Are; P jardim: U08 Where Things Are | one image for 5 courses |
| apartment | FSGI | F appartement: **U45 Where You Live**; S departamento: **U45 Where You Live**; G Wohnung: **U45 Where You Live**; I appartamento: **U45 Where You Live** | one image for 4 courses |
| bathroom | SGIP | S baño: U08 Where Things Are; G Bad: **U86 At Home**; I bagno: U08 Where Things Are; P banheiro: U08 Where Things Are | one image for 4 courses |
| living room | FSG | F salon: **U503 At Home**; S sala: **U86 At Home**; G Wohnzimmer: **U86 At Home** | one image for 3 courses |
| key | FSG | F clé: **U503 At Home**; S llave: **U91 Everyday Things**; G Schlüssel: **U204 At the Hotel (topic pack)** | one image for 3 courses |
| sofa | SGI | S sofá: **U86 At Home**; G Sofa: **U86 At Home**; I divano: **U86 At Home** | one image for 3 courses |
| window | SGI | S ventana: **U86 At Home**; G Fenster: **U69 Instructions**; I finestra: **U86 At Home** | already drawn, map it |
| chair | SGI | S silla: **U55 In Class**; G Stuhl: **U55 In Class**; I sedia: **U86 At Home** | already drawn, map it |
| lift | SGI | S ascensor: **U66 Signs + Notices**; G Aufzug: **U66 Signs + Notices**; I ascensore: **U66 Signs + Notices** | one image for 3 courses |
| light | FGI | F lumière: **U614 Describing**; G Licht: **U86 At Home**; I luce: **U58 Outdoors** | one image for 3 courses |
| door | GI | G Tür: **U69 Instructions**; I porta: **U86 At Home** | already drawn, map it |
| stairs | SG | S escalera: **U66 Signs + Notices**; G Treppe: **U86 At Home** | one image for 2 courses |
| refrigerator | GI | G Kühlschrank: **U86 At Home**; I frigorifero: **U86 At Home** | one image for 2 courses |
| wardrobe | SI | S clóset: **U86 At Home**; I armadio: **U86 At Home** | one image for 2 courses |
| clock | GI | G Uhr: **U13 Time**; I orologio: **U54 Clothes** | one image for 2 courses |
| keys | S | S llaves: **U91 Everyday Things** |  |
| armchair | S | S sillón: **U86 At Home** |  |
| table | G | G Tisch: **U55 In Class** | already drawn, map it |
| bed | G | G Bett: **U65 My Day** | already drawn, map it |
| kitchen | G | G Küche: **U86 At Home** | already drawn, map it |

### Batch 8: Body

18 meanings, 48 course words, 48 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| eyes | FSGIP | F yeux: **U53 Body + Feelings**; S ojos: **U51 Body + Feelings**; G Augen: **U54 Body**; I occhi: **U51 Body + Looks**; P olhos: **U51 Body + Looks** | one image for 5 courses |
| hair | FSGIP | F cheveux: **U53 Body + Feelings**; S pelo: **U51 Body + Feelings**; G Haare: **U54 Body**; I capelli: **U51 Body + Looks**; P cabelo: **U51 Body + Looks** | one image for 5 courses |
| foot | FSGP | F pied: **U53 Body + Feelings**; S pie: **U51 Body + Feelings**; G Fuß: **U54 Body**; P pé: **U51 Body + Looks** | one image for 4 courses |
| hand | FGIP | F main: **U53 Body + Feelings**; G Hand: **U54 Body**; I mano: **U51 Body + Looks**; P mão: **U51 Body + Looks** | one image for 4 courses |
| head | FGIP | F tête: **U53 Body + Feelings**; G Kopf: **U54 Body**; I testa: **U51 Body + Looks**; P cabeça: **U51 Body + Looks** | one image for 4 courses |
| arm | GIP | G Arm: **U54 Body**; I braccio: **U51 Body + Looks**; P braço: **U51 Body + Looks** | one image for 3 courses |
| leg | GIP | G Bein: **U95 People + Things**; I gamba: **U51 Body + Looks**; P perna: **U51 Body + Looks** | one image for 3 courses |
| mouth | GIP | G Mund: **U54 Body**; I bocca: **U51 Body + Looks**; P boca: **U51 Body + Looks** | one image for 3 courses |
| nose | SIP | S nariz: **U51 Body + Feelings**; I naso: **U51 Body + Looks**; P nariz: **U51 Body + Looks** | one image for 3 courses |
| face | FSI | F face: **U85 Where It Is**; S cara: **U51 Body + Feelings**; I faccia: **U51 Body + Looks** | one image for 3 courses |
| feet | SI | S pies: **U51 Body + Feelings**; I piedi: **U51 Body + Looks** | one image for 2 courses |
| hands | SI | S manos: **U51 Body + Feelings**; I mani: **U51 Body + Looks** | one image for 2 courses |
| beard | SI | S barba: **U56 Looks**; I barba: **U56 Looks** | one image for 2 courses |
| teeth | S | S dientes: **U51 Body + Feelings** |  |
| back | F | F dos: **U53 Body + Feelings** |  |
| stomach | G | G Bauch: **U54 Body** |  |
| heart | F | F cœur: **U515 Love + Dreams** |  |
| moustache | S | S bigote: **U74 Looks + Character** |  |

### Batch 9: Clothes

12 meanings, 35 course words, 35 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| clothes | FSGI | F vêtement: **U91 Clothes**; F vêtements: **U91 Clothes**; S ropa: **U54 Clothes**; G Kleidung: **U56 Clothes**; I vestiti: **U54 Clothes** | one image for 4 courses |
| shirt | FSGI | F chemise: **U91 Clothes**; S camisa: **U54 Clothes**; G Hemd: **U56 Clothes**; I camicia: **U54 Clothes** | one image for 4 courses |
| trousers | FSGI | F pantalon: **U91 Clothes**; S pantalones: **U54 Clothes**; G Hose: **U56 Clothes**; I pantaloni: **U54 Clothes** | one image for 4 courses |
| dress | FSG | F robe: **U91 Clothes**; S vestido: **U54 Clothes**; G Kleid: **U56 Clothes** | one image for 3 courses |
| hat | FSI | F chapeau: **U91 Clothes**; S sombrero: **U54 Clothes**; I cappello: **U54 Clothes** | one image for 3 courses |
| jacket | SGI | S chaqueta: **U54 Clothes**; G Jacke: **U56 Clothes**; I giacca: **U54 Clothes** | one image for 3 courses |
| skirt | SGI | S falda: **U54 Clothes**; G Rock: **U56 Clothes**; I gonna: **U54 Clothes** | one image for 3 courses |
| shoes | FSG | F chaussures: **U91 Clothes**; S zapatos: **U54 Clothes**; G Schuhe: **U56 Clothes** | one image for 3 courses |
| glasses | SGI | S lentes: **U54 Clothes**; G Brille: **U56 Clothes**; I occhiali: **U54 Clothes** | one image for 3 courses |
| coat | FG | F manteau: **U91 Clothes**; G Mantel: **U56 Clothes** | one image for 2 courses |
| shoe | I | I scarpe: **U54 Clothes** |  |
| suit | I | I vestito: **U54 Clothes** |  |

### Batch 10: Jobs + People (1 of 2)

20 meanings, 41 course words, 34 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| teacher | FSGIP | F professeur: **U54 People**; F prof: **U506 School + Study**; S profesor: U09 Ser or Estar; S profesora: U09 Ser or Estar; G Lehrer: **U51 People + Feelings**; G Lehrerin: **U51 People + Feelings**; I insegnante: **U55 In Class**; P professor: U02 People + Things; P professora: U02 People + Things | one image for 5 courses |
| student | FS | F étudiant: **U54 People**; F étudiante: **U54 People**; S estudiante: U09 Ser or Estar | one image for 2 courses |
| waiter | SI | S mesero: **U81 At the Café**; I cameriere: **U81 At the Café** | one image for 2 courses |
| king | FS | F roi: **U613 People + Places**; S rey: **U94 Culture + Media** | one image for 2 courses |
| queen | FS | F reine: **U613 People + Places**; S reina: **U94 Culture + Media** | one image for 2 courses |
| president | SI | S presidente: **U94 Culture + Media**; I presidente: **U72 In the News** | one image for 2 courses |
| tourist | FS | F touriste: **U54 People**; S turista: **U75 Places to Visit** | one image for 2 courses |
| doctor | SG | S doctor: U202 At the Doctor (topic pack); G Ärztin: U202 At the Doctor (topic pack); G Doktor: **U87 At Work** | already drawn, map it |
| lawyer | S | S abogado: **U87 At Work**; S abogada: **U87 At Work** |  |
| engineer | S | S ingeniero: **U87 At Work**; S ingeniera: **U87 At Work** |  |
| nurse | S | S enfermera: **U87 At Work**; S enfermero: **U87 At Work** |  |
| principal | S | S director: **U93 School + Study**; S directora: **U93 School + Study** |  |
| driver | S | S conductor: **U68 Announcements** |  |
| taxi driver | S | S taxista: **U87 At Work** |  |
| firefighter | S | S bombero: **U87 At Work** |  |
| actor | S | S actor: **U94 Culture + Media** |  |
| actress | S | S actriz: **U94 Culture + Media** |  |
| pupil | F | F élève: **U54 People** |  |
| journalist | F | F journaliste: **U505 At Work** |  |
| secretary | F | F secrétaire: **U505 At Work** |  |

### Batch 11: Town (2 of 3)

20 meanings, 29 course words, 29 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| post office | FG | F poste: **U86 Shops + Services**; G Post: **U92 Shops + Services** | one image for 2 courses |
| bridge | FG | F pont: **U55 Outdoors**; G Brücke: **U83 Asking the Way** | one image for 2 courses |
| kiosk | SG | S quiosco: **U89 Messages + Postcards**; G Kiosk: **U92 Shops + Services** | one image for 2 courses |
| university | FS | F université: **U506 School + Study**; S universidad: **U93 School + Study** | one image for 2 courses |
| town | SI | S pueblo: **U53 Around Town**; I comune: **U75 Town + Region** | already drawn, map it |
| toilets | FG | F toilettes: **U66 Signs + Notices**; G Toiletten: **U66 Signs + Notices** | one image for 2 courses |
| traffic light | FG | F feu: **U84 Following Directions**; G Ampel: **U83 Asking the Way** | one image for 2 courses |
| police | SG | S policía: **U87 At Work**; G Polizei: **U92 Shops + Services** | one image for 2 courses |
| office | SI | S oficina: **U201 At the Office (topic pack)**; I ufficio: **U66 Signs + Notices** | already drawn, map it |
| castle | F | F château: **U75 Places to Visit** |  |
| cathedral | S | S catedral: **U75 Places to Visit** |  |
| monument | S | S monumento: **U75 Places to Visit** |  |
| building | S | S edificio: **U75 Places to Visit** |  |
| library | S | S biblioteca: **U93 School + Study** |  |
| school | S | S colegio: **U93 School + Study** | already drawn, map it |
| restaurant | G | G Lokal: **U82 At the Restaurant** | already drawn, map it |
| café | G | G Café: **U53 Around Town** |  |
| car park | F | F parking: **U66 Signs + Notices** |  |
| swimming pool | F | F piscine: **U51 Around Town** |  |
| circus | S | S circo: **U94 Culture + Media** |  |

### Batch 12: Food + Drink (2 of 3)

20 meanings, 22 course words, 21 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| fish | SG | S pescado: **U82 At the Restaurant**; G Fische: U212 At the Beach (topic pack) | already drawn, map it |
| drink | G | G Getränk: **U81 At the Café**; G Getränke: **U81 At the Café** |  |
| vegetable | I | I verdura: **U47 At the Market** |  |
| eggs | S | S huevos: **U47 At the Market** | already drawn, map it |
| rice | S | S arroz: **U82 At the Restaurant** | already drawn, map it |
| butter | G | G Butter: **U81 At the Café** | already drawn, map it |
| sandwich | S | S sándwich: **U81 At the Café** | already drawn, map it |
| sugar | I | I zucchero: **U81 At the Café** | already drawn, map it |
| ham | G | G Schinken: **U91 Food** |  |
| hamburger | S | S hamburguesa: **U81 At the Café** |  |
| bread roll | G | G Brötchen: **U81 At the Café** |  |
| french fries | G | G Pommes frites: **U91 Food** |  |
| sausage | G | G Wurst: **U91 Food** |  |
| salt | G | G Salz: **U91 Food** |  |
| oil | G | G Öl: **U91 Food** |  |
| pear | G | G Birne: **U91 Food** |  |
| potatoes | G | G Kartoffeln: **U47 At the Market** |  |
| tomatoes | G | G Tomaten: **U47 At the Market** |  |
| paella | S | S paella: **U82 At the Restaurant** |  |
| tortilla | S | S tortilla: **U82 At the Restaurant** |  |

### Batch 13: Family

10 meanings, 20 course words, 13 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| grandfather | FSGI | F grand-père: **U511 Family Words**; S abuelo: **U85 My Family**; G Opa: **U85 My Family**; I nonno: **U85 My Family** | one image for 4 courses |
| grandmother | FSGI | F grand-mère: **U511 Family Words**; S abuela: **U85 My Family**; G Oma: **U85 My Family**; I nonna: **U85 My Family** | one image for 4 courses |
| grandparents | SG | S abuelos: **U85 My Family**; G Großeltern: **U85 My Family** | one image for 2 courses |
| child | IP | I bambino: U01 Say Hi; P criança: U01 Say Hi | already drawn, map it |
| boys | SI | S chicos: U06 Plurals; I ragazzi: U06 Plurals | one image for 2 courses |
| girl | SI | S chica: U01 Say Hi; I bambina: U01 Say Hi | already drawn, map it |
| baby | G | G Baby: **U51 People + Feelings** | already drawn, map it |
| man | G | G Herr: **U51 People + Feelings** | already drawn, map it |
| couple | I | I coppia: **U69 Instructions** |  |
| boy | S | S chico: U01 Say Hi | already drawn, map it |

### Batch 14: Home (2 of 2)

16 meanings, 16 course words, 16 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| bedroom | S | S recámara: **U86 At Home** |  |
| balcony | G | G Balkon: **U86 At Home** |  |
| terrace | S | S terraza: **U86 At Home** |  |
| garage | S | S garaje: **U86 At Home** |  |
| cooker | G | G Herd: **U86 At Home** |  |
| cupboard | G | G Schrank: **U86 At Home** |  |
| bookcase | S | S librero: **U86 At Home** |  |
| mirror | S | S espejo: **U92 Getting Ready** |  |
| towel | S | S toalla: **U92 Getting Ready** |  |
| soap | S | S jabón: **U92 Getting Ready** |  |
| shower | S | S ducha: **U92 Getting Ready** |  |
| bath | F | F bain: **U503 At Home** |  |
| bathroom sink | S | S lavabo: **U92 Getting Ready** |  |
| toilet | G | G Toilette: **U66 Signs + Notices** |  |
| furniture | G | G Möbel: **U86 At Home** |  |
| wall | F | F mur: **U503 At Home** |  |

### Batch 15: Things You Carry + Use (2 of 2)

7 meanings, 7 course words, 7 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| picture | G | G Bild: **U55 In Class** |  |
| painting | F | F peinture: **U602 Going Out** |  |
| banknote | S | S billete: **U91 Everyday Things** |  |
| luggage | G | G Gepäck: **U68 Announcements** |  |
| magazine | S | S revista: **U73 Hobbies** |  |
| newspaper | I | I giornale: **U72 In the News** | already drawn, map it |
| ball | F | F ballon: **U93 Sport** |  |

### Batch 16: School + Free Time (2 of 2)

6 meanings, 6 course words, 6 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| photocopy | S | S fotocopia: **U93 School + Study** |  |
| postcard | I | I cartolina: **U89 Messages + Postcards** |  |
| basketball | S | S básquetbol: **U73 Hobbies** |  |
| ski | F | F ski: **U52 Free Time** |  |
| dance | F | F danse: **U52 Free Time** |  |
| gymnastics | S | S gimnasia: **U73 Hobbies** |  |

### Batch 17: Jobs + People (2 of 2)

6 meanings, 6 course words, 5 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| salesperson | S | S vendedor: **U87 At Work** |  |
| gardener | S | S jardinero: **U207 In the Garden (topic pack)** |  |
| housewife | G | G Hausfrau: **U87 At Work** |  |
| passengers | S | S pasajeros: **U68 Announcements** |  |
| passenger | I | I passeggeri: **U68 Announcements** |  |
| singer | G | G Sängerin: U205 Music (topic pack) | already drawn, map it |

### Batch 18: Town (3 of 3)

5 meanings, 5 course words, 5 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| discotheque | S | S discoteca: **U64 Making Plans** |  |
| port | S | S puerto: **U67 Timetables** |  |
| high school | F | F lycée: **U506 School + Study** |  |
| nursery school | G | G Kindergarten: **U85 My Family** |  |
| cash desk | G | G Kasse: **U66 Signs + Notices** |  |

### Batch 19: Nature + Weather (2 of 2)

5 meanings, 5 course words, 4 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| snow | S | S nieve: **U72 The Weather** | already drawn, map it |
| rain | S | S lluvia: **U72 The Weather** |  |
| fire | G | G Feuer: **U95 People + Things** |  |
| cold | P | P frio: **U09 How You Feel** | already drawn, map it |
| fever | S | S fiebre: U202 At the Doctor (topic pack) | already drawn, map it |

### Batch 20: Food + Drink (3 of 3)

2 meanings, 2 course words, 2 of those words sit in a circle that has no picture of its own yet.

| Meaning | Courses | Where | Note |
| --- | --- | --- | --- |
| supper | S | S cena: **U65 My Day** |  |
| afternoon snack | S | S merienda: **U82 At the Restaurant** |  |

## Held back: a picture can't tell these apart

Square, corner and village (Batch 1) were skipped on purpose (Dan, 2026-11-16) and moved here from the batch.

The 2026-11-10 picture list left these out on purpose, and the reason still holds: in a row of three or four pictures, father, brother, husband and son are all a man; boss and colleague are a person at a desk. They are listed so the count is honest, not ranked. If Dan wants them, they need a convention (a family tree with one figure lit, for example), which is a design question first.

| Meaning | Courses | Words |
| --- | --- | --- |
| square | FSI | F place, S plaza, I piazza (skipped on purpose, Dan 2026-11-16; the one picture sent was a painted scene, not the style) |
| corner | FSG | F coin, S esquina, G Ecke (skipped on purpose, Dan 2026-11-16) |
| village | FGI | F village, G Dorf, I paese (skipped on purpose, Dan 2026-11-16) |
| room | FSGI | F chambre, F salle, F pièce, S habitación, G Zimmer, G Raum, I stanza, I camera |
| boss | FSGI | F patron, S jefa, S jefe, G Chef, G Chefin, I capo |
| father | FSGIP | F père, S padre, G Vater, I padre, P pai |
| mother | FSGIP | F mère, S madre, G Mutter, I madre, P mãe |
| husband | FSGI | F mari, S marido, S esposo, G Ehemann, I marito |
| colleague | FSGI | F collègue, S compañero, S compañera, G Kollege, I collega |
| animal | FSGIP | F animal, S animal, G Tier, I animale, P animal |
| thing | FSGP | F chose, S cosa, G Ding, G Sache, P coisa |
| brother | FSGI | F frère, S hermano, G Bruder, I fratello |
| sister | FSGI | F sœur, S hermana, G Schwester, I sorella |
| son | FSGI | F fils, S hijo, G Sohn, I figlio |
| friends | SIP | S amigos, S amigas, I amici, P amigos |
| people | FSGI | F gens, S gente, G Leute, I gente |
| class | FSGI | F classe, S clase, G Klasse, I classe |
| daughter | SGI | S hija, G Tochter, I figlia |
| wife | SGI | S esposa, G Ehefrau, I moglie |
| aunt | FSI | F tante, S tía, I zia |
| uncle | FSI | F oncle, S tío, I zio |
| cousin | FS | F cousin, S primo, S prima |
| parents | FSG | F parents, S padres, G Eltern |
| dad | FSG | F papa, S papá, G Papa |
| mum | FSG | F maman, S mamá, G Mama |
| song | FSG | F chanson, S canción, G Lied |
| sport | FSG | F sport, S deporte, G Sport |
| game | FIP | F jeu, I gioco, P jogo |
| partner | SG | S pareja, G Partner, G Partnerin |
| boyfriend | FS | F copain, S novio |
| girlfriend | FS | F copine, S novia |
| friend | IP | I amica, P amiga |
| neighbour | F | F voisin, F voisine |
| customer | FG | F client, G Kunde |
| weather | SG | S tiempo, G Wetter |
| things | FS | F affaires, S cosas |
| dish | FG | F plat, G Gericht |
| houses | SG | S casas, G Häuser |
| person | GI | G Mensch, I persona |
| nephew | S | S sobrino |
| niece | S | S sobrina |
| grandson | S | S nieto |
| granddaughter | S | S nieta |
| siblings | G | G Geschwister |
| sons | I | I figli |
| guest | G | G Gast |
| rooms | S | S habitaciones |
| home | G | G Heimat |
| food | S | S comida |
| body | I | I ente |

## ChatGPT prompt for Batch 1 (Town, 1 of 3)

Nineteen new pictures; the twentieth meaning in the batch, shop, is already drawn (`magasin`) and only needs mapping to German Geschäft and Laden and Portuguese loja.

The existing pictures were made with the prompt in `_source/image-list.md`. This is the same prompt, with a place picture as the reference instead of a sushi icon, since these are all buildings and street scenes. Attach `public/images/pictures/maison.webp` and `magasin.webp` (or their full-size originals) and send one request per picture, changing only the last line.

```
Make a picture in exactly the same style as the attached images: a single emoji-style subject, softly lit and
gently glossy, with clean simple shapes, rich natural colours and a soft shadow underneath. Flat emoji style, no
outlines, no photo realism. Square, 1024 by 1024. Plain white background, nothing else in the frame. The subject
centred and filling about three quarters of the square. No text, no letters, no numbers, no logos, no brand or
cartoon character, no flags. Signs on buildings are symbols only, never words. People, if any: simple, friendly,
neutral faces, plain clothes. The picture must read at the size of a thumbnail and must not be mistaken for any
other picture in this list.
Subject: <the "What to draw" line>
```

File names follow the existing pictures (the French word, no accents), so one file serves every course.

| # | File | Meaning | What to draw | Serves |
| --- | --- | --- | --- | --- |
| 1 | banque.png | bank | a small classical bank building with columns and a coin symbol over the door | F banque, S banco, G Bank, I banca, P banco |
| 2 | hotel.png | hotel | a tall hotel building with rows of windows, a canopy over the entrance and a bed symbol on the sign | F hôtel, S hotel, G Hotel, I albergo, P hotel |
| 3 | gare.png | station | a railway station building with a clock over the entrance and a train standing at the platform beside it | F gare, S estación, G Bahnhof, I stazione, P estação |
| 4 | rue.png | street | a street running away between two rows of small houses, with a pavement and one street lamp, no cars | F rue, S calle, G Straße, I via, P rua |
| 5 | marche.png | market | an open-air market stall with a striped awning and crates of fruit and vegetables | F marché, S mercado, G Markt, I mercato |
| 6 | pharmacie.png | pharmacy | a small pharmacy shopfront with a green cross sign and medicine bottles in the window | F pharmacie, S farmacia, G Apotheke, I farmacia |
| 7 | cinema.png | cinema | a cinema front with a lit marquee (blank, no words), a film reel symbol and a box of popcorn | F cinéma, S cine, G Kino, I cinema |
| 8 | sortie.png | exit | an open door seen from inside with a green running-figure exit sign above it and an arrow pointing out | F sortie, S salida, G Ausgang, I uscita |
| 9 | eglise.png | church | a small stone church with a bell tower and a round window | F église, S iglesia, I chiesa, P igreja |
| 10 | musee.png | museum | a museum building with wide steps and columns, and a framed painting and a statue showing at the entrance | F musée, S museo, I museo, P museu |
| 11 | theatre.png | theater | a stage with red curtains drawn open and the two theatre masks above it | F théâtre, S teatro, I teatro |
| 12 | place.png | square | a paved town square with a fountain in the middle and houses around it | F place, S plaza, I piazza |
| 13 | coin.png | corner | a street corner seen from above: two streets meeting at a right angle around the corner of one building | F coin, S esquina, G Ecke |
| 14 | route.png | road | a country road with a dashed centre line winding away between green fields | F route, S carretera, I strada |
| 15 | bar.png | bar | a bar counter with two stools, a row of bottles on a shelf behind and two glasses on the counter | F bar, S bar, I bar |
| 16 | village.png | village | a few small houses and a church tower clustered on a green hill | F village, G Dorf, I paese |
| 17 | entree.png | entrance | a building's double doors standing open with a welcome mat and an arrow pointing in | F entrée, S entrada, G Eingang |
| 18 | boulangerie.png | bakery | a bakery shopfront with loaves, baguettes and pastries in the window and a pretzel-or-wheat symbol on the sign | F boulangerie, G Bäckerei |
| 19 | supermarche.png | supermarket | a wide supermarket front with glass doors and a shopping trolley full of groceries in front | F supermarché, G Supermarkt |

Pairs to keep apart, since they can land in the same row of choices: station and hotel (the train must show); street, road and corner (houses for the street, fields for the road, the turn for the corner); exit and entrance (the arrow's direction and the green sign); market and supermarket (stall against building); town, already drawn as tall buildings, and village (small houses on a hill); theater and cinema (curtains and masks against marquee and popcorn).

Two cautions. Spanish entrada is also the starter on a menu, and French place is also a seat; the picture fixes the meaning the circle teaches (entrance, square). And a street corner is the hardest of the nineteen to read small: if it doesn't work, drop it and the batch is eighteen.

## Culture-specific words already in the courses

A list only, as asked: no recommendations. Each word is given with its hint and the circle that teaches it; names and places are counted over sentences and task items. Regional vocabulary that is simply the local word (Spanish mesero, timbre, credencial; Portuguese ônibus, banheiro) is included where it marks the course's country.

### French

**Words:** croissant (croissant; U105 At the Café; pictured); euro (euro; U48 How Much Is It?); euros (euros; U48 How Much Is It?); France (France; U46 Countries + Languages); Allemagne (Germany; U46 Countries + Languages); Italie (Italy; U46 Countries + Languages); Angleterre (England; U46 Countries + Languages); Espagne (Spain; U46 Countries + Languages); monsieur (Mr; sir; U41 Your Name, Please); madame (Mrs; madam; U41 Your Name, Please); mademoiselle (Miss; U508 Filling In Forms); lycée (high school (ages 15 to 18); U506 School + Study); collège (secondary school; U506 School + Study); bises (love (at the end of a message); U509 See You Soon); bise (kiss (on the cheek); U509 See You Soon); fromage (cheese; U04 Food + Drink; pictured); vin (wine; U81 At the Café); café (coffee; U105 At the Café; pictured); gare (station; U51 Around Town); métro (metro, subway; U51 Around Town); château (castle; U75 Places to Visit); quai (platform; U67 Timetables)

**Names and places in sentences and task items (times seen):** Paris (3), Lyon (4), Nice (2), Rome (2), Londres (1), Berlin (1), Marie (67), Paul (62), Sophie (7), Julie (2), Marc (3), Martin (4), Durand (2), Dubois (2), Bernard (1)

### Spanish

**Words:** peso (peso; U48 How Much Is It?); pesos (pesos; U48 How Much Is It?); dólares (dollars; U48 How Much Is It?); euro (euro; U91 Everyday Things); euros (euro (euro); U91 Everyday Things); céntimo (cent (of a euro); U91 Everyday Things); paella (paella; U82 At the Restaurant); tortilla (tortilla (corn flatbread); in Spain, an omelette; U82 At the Restaurant); España (Spain; U46 Countries + Languages); México (Mexico; U46 Countries + Languages); Francia (France; U46 Countries + Languages); Alemania (Germany; U46 Countries + Languages); Madrid (Madrid; U94 Culture + Media); mexicano (Mexican; U46 Countries + Languages); señor (Mr, sir; U01 Say Hi); señora (Mrs, madam; U01 Say Hi); plaza (square; U53 Around Town); fiesta (party; U52 Free Time); guitarra (guitar; U205 Music; pictured); credencial (ID card, credential; U88 Filling In Forms); timbre (stamp (Mexico); doorbell; U89 Messages + Postcards); mesero (waiter (Latin America); U81 At the Café); merienda (afternoon snack; U82 At the Restaurant)

**Names and places in sentences and task items (times seen):** Guadalajara (6), Juárez (4), Madrid (11), María (27), Juan (10), Ana (17), Pedro (1), Carlos (4), Luis (3), López (4), Torres (2), García (3)

### German

**Words:** Euro (euro, euros; U48 How Much Is It?); Cent (cent, cents; U48 How Much Is It?); Bahnhof (station; U53 Around Town); S-Bahn (suburban train; U84 Getting Around); Straßenbahn (tram, streetcar; U84 Getting Around); Brötchen (bread roll; U81 At the Café); Pommes frites (French fries, chips; U91 Food); Bier (beer; U81 At the Café); Autobahn (motorway; U84 Getting Around); Kindergarten (nursery school, kindergarten; U85 My Family); Hähnchen (chicken (as food); U91 Food); Deutschland (Germany; U46 Countries + Languages); Österreich (Austria; U46 Countries + Languages); Frankreich (France; U46 Countries + Languages); Spanien (Spain; U46 Countries + Languages); Italien (Italy; U46 Countries + Languages); England (England; U46 Countries + Languages); Wurst (sausage; U91 Food); Schinken (ham; U91 Food); Herr (man, gentleman; U51 People + Feelings); Frau (woman; U01 Say Hi; pictured); Gleis (platform, track (Gleis 3); U67 Timetables); Bahnsteig (train platform; U67 Timetables); Bäckerei (bakery; U92 Shops + Services); Kiosk (kiosk; U92 Shops + Services); Abendessen (dinner, supper; U91 Food); Kaffee (coffee; U04 Food + Drink; pictured); Kuchen (cake; U206 At the Café); Lkw (truck, lorry; U84 Getting Around)

**Names and places in sentences and task items (times seen):** Berlin (18), Hamburg (13), London (8), Paris (10), Tom (361), Maria (30), Anna (20), Peter (8), Ken (3)

### Italian

**Words:** euro (euro; U48 How Much Is It?); Italia (Italy; U46 Countries + Languages); Europa (Europe; U46 Countries + Languages); Francia (France; U46 Countries + Languages); Germania (Germany; U46 Countries + Languages); Spagna (Spain; U46 Countries + Languages); caffè (coffee; U04 Food + Drink; pictured); pasta (paste; U82 At the Restaurant); cornetto (horn-shaped amulet resembling a hot pepper; U81 At the Café); signore (sir; gentleman; U41 Your Name, Please); signora (madam; Mrs; lady; U41 Your Name, Please); primo (first; U63 Months + Seasons); secondo (second; U63 Months + Seasons); piazza (square; U53 Around Town); vino (wine; U04 Food + Drink); comune (town, municipality; U75 Town + Region); provincia (province, also used generically to refer to non-federal administrative divisions or to the area around a big city; U75 Town + Region); regione (region, area, zone, district; U75 Town + Region); decreto (decree; U93 Rules + Offices); bar (bar; U81 At the Café); albergo (hotel; U53 Around Town)

**Names and places in sentences and task items (times seen):** Roma (17), Milano (7), Torino (1), Parigi (2), Garibaldi (1), Rossi (4), Bianchi (4), Marco (15), Anna (14), Giulia (6), Luca (3)

### Portuguese

**Words:** ônibus (bus; U53 Around Town); trem (train; U53 Around Town); banheiro (bathroom; toilet; restroom; U08 Where Things Are); cachorro (dog; U05 Animals; pictured); praia (beach; U53 Around Town; pictured); futebol (soccer; football; U52 Free Time); café (coffee; U04 Food + Drink; pictured); pão (bread; U04 Food + Drink; pictured); suco (juice; U04 Food + Drink); você (you; U01 Say Hi)

**Names and places in sentences and task items (times seen):** Brasil (1), Paris (6), Londres (4), Ana (2), Maria (6), Tom (93)
