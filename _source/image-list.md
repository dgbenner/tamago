# Pictures for Pick the Picture

November 10, 2026. 97 A1 words that can be pictured (people, food, animals, objects, colours, places, weather), most-used first. 30 of them show an OpenMoji stand-in today, which doesn't match the sushi icons, so they're listed too. 5 rows reuse another word's picture (feminine colours, docteur), so there are 92 pictures to make.

Left out on purpose: verbs, numbers, days and times, and words a picture can’t tell apart from another in the same set: mère, père, frère, sœur, fils, parents and patron would all look like femme, homme or famille; chambre like lit; chanson like musique; temps, travail and animal are too general. Size and quality adjectives (grand, petit, bon, beau, jeune, vieux, gentil, occupé) need two pictures to compare, which Pick the Picture doesn’t do.

## Where to put them

Drop finished PNGs in `_source/pictures/`, named as in the File column. I copy them into the app, resize them and wire them to the words. A word keeps its stand-in until its picture arrives.

## The prompt

Attach one sushi icon as the style reference (for example `_source/icons/nigiri/Ebi.png`) and use this each time, changing only the last line:

```
Make an icon in exactly the same style as the attached sushi image: a single emoji-style object, softly lit and
gently glossy, with clean simple shapes, rich natural colours and a soft shadow underneath. Flat emoji style, no
outlines, no photo realism. Square, 1024 by 1024. Plain white background, nothing else in the frame. The subject
centred and filling about three quarters of the square. No text, no letters, no numbers, no logos, no brand or
cartoon character. People: simple, friendly, neutral faces, plain clothes, no particular celebrity.
Subject: <description from the table>
```

## The list

| # | French | English | File | What to draw | Priority | Sentences | Unit | Note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | enfants | children | enfants.png | two young children standing side by side | High | 23 | Unit 2 |  |
| 2 | chien | dog | chien.png | a friendly brown dog sitting, seen from the side | High | 22 | Unit 5 | replaces the OpenMoji stand-in |
| 3 | chat | cat | chat.png | one ginger cat sitting | High | 20 | Unit 5 | replaces the OpenMoji stand-in |
| 4 | pomme | apple | pomme.png | one red apple with a leaf | High | 20 | Unit 4 | replaces the OpenMoji stand-in |
| 5 | livre | book | livre.png | one closed hardback book, red cover, no title | High | 19 | Unit 2 |  |
| 6 | pain | bread | pain.png | a French baguette and a round loaf | High | 18 | Unit 4 | replaces the OpenMoji stand-in |
| 7 | chats | cats | chats.png | two cats sitting together | High | 16 | Unit 6 |  |
| 8 | femme | woman | femme.png | a woman, head and shoulders, plain top | High | 16 | Unit 1 | replaces the OpenMoji stand-in |
| 9 | garçon | boy | garcon.png | a boy of about eight, head and shoulders | High | 14 | Unit 1 | replaces the OpenMoji stand-in |
| 10 | ami | friend (male) | ami.png | two young men side by side, one arm around the other’s shoulder | High | 13 | Unit 8 |  |
| 11 | homme | man | homme.png | a man, head and shoulders, plain top | High | 13 | Unit 1 | replaces the OpenMoji stand-in |
| 12 | lettre | letter | lettre.png | a sealed paper envelope | High | 13 | Unit 2 |  |
| 13 | chiens | dogs | chiens.png | two dogs side by side | High | 12 | Unit 6 |  |
| 14 | amie | friend (female) | amie.png | two young women side by side, smiling, one arm around the other’s shoulder | High | 11 | Unit 8 |  |
| 15 | souris | mouse | souris.png | a small grey mouse with a long tail | High | 11 | Unit 5 | replaces the OpenMoji stand-in |
| 16 | blanc | white | blanc.png | a glossy white circle, like a paint swatch, with a light grey outline so it shows | High | 10 | Unit 11 | replaces the OpenMoji stand-in |
| 17 | cheval | horse | cheval.png | a brown horse standing, seen from the side | High | 10 | Unit 5 | replaces the OpenMoji stand-in |
| 18 | enfant | child | enfant.png | one young child, head and shoulders | High | 10 | Unit 1 | replaces the OpenMoji stand-in |
| 19 | eau | water | eau.png | a clear glass of water | Medium | 9 | Unit 4 | replaces the OpenMoji stand-in |
| 20 | filles | girls | filles.png | two girls side by side | Medium | 9 | Unit 2 |  |
| 21 | livres | books | livres.png | a small stack of three books, no titles | Medium | 9 | Unit 6 |  |
| 22 | noir | black | noir.png | a glossy black circle, like a paint swatch | Medium | 9 | Unit 11 | replaces the OpenMoji stand-in |
| 23 | fille | girl | fille.png | a girl of about eight, head and shoulders | Medium | 8 | Unit 1 | replaces the OpenMoji stand-in |
| 24 | malade | sick | malade.png | a person in bed under a blanket, pale, with a tissue (not a thermometer: that is fièvre) | Medium | 7 | At the Doctor (topic) |  |
| 25 | pommes | apples | pommes.png | three red apples together | Medium | 7 | Unit 6 |  |
| 26 | tortue | turtle | tortue.png | a green tortoise walking, seen from the side | Medium | 7 | Unit 5 | replaces the OpenMoji stand-in |
| 27 | école | school | ecole.png | a small school building with a bell and a flag pole (no flag, no words) | Medium | 6 | Unit 13 | replaces the OpenMoji stand-in |
| 28 | femmes | women | femmes.png | two women side by side | Medium | 6 | Unit 2 |  |
| 29 | magasin | shop | magasin.png | a small shop front with an awning and a window display (no sign text) | Medium | 6 | Unit 13 | replaces the OpenMoji stand-in |
| 30 | parc | park | parc.png | a green park with two trees, a path and a bench | Medium | 6 | Unit 13 | replaces the OpenMoji stand-in |
| 31 | animaux | animals | animaux.png | a dog, a cat and a bird together | Medium | 5 | Unit 5 |  |
| 32 | blanche | white | blanc.png | same image as blanc | Medium | 5 | Unit 11 |  |
| 33 | bureau | office | bureau.png | an office desk with a computer screen, a chair and a mug | Medium | 5 | At the Office (topic) |  |
| 34 | docteur | doctor | medecin.png | same image as médecin | Medium | 5 | At the Doctor (topic) |  |
| 35 | garçons | boys | garcons.png | two boys side by side | Medium | 5 | Unit 2 |  |
| 36 | jaune | yellow | jaune.png | a glossy yellow circle, like a paint swatch | Medium | 5 | Unit 11 | replaces the OpenMoji stand-in |
| 37 | lait | milk | lait.png | a glass of milk beside a milk carton (no label text) | Medium | 5 | Unit 4 | replaces the OpenMoji stand-in |
| 38 | médecin | doctor | medecin.png | a doctor in a white coat with a stethoscope, head and shoulders | Medium | 5 | At the Doctor (topic) |  |
| 39 | oiseaux | birds | oiseaux.png | two small birds on a branch | Medium | 5 | Unit 6 |  |
| 40 | restaurant | restaurant | restaurant.png | a restaurant table set for two, white cloth, plates and glasses | Medium | 5 | Unit 13 | replaces the OpenMoji stand-in |
| 41 | rouge | red | rouge.png | a glossy red circle, like a paint swatch | Medium | 5 | Unit 11 | replaces the OpenMoji stand-in |
| 42 | thé | tea | the.png | a cup of tea with a tea bag string over the side | Medium | 5 | At the Café (topic) |  |
| 43 | bleu | blue | bleu.png | a glossy blue circle, like a paint swatch | Low | 4 | Unit 11 | replaces the OpenMoji stand-in |
| 44 | canard | duck | canard.png | a duck with a green head, seen from the side | Low | 4 | Unit 5 | replaces the OpenMoji stand-in |
| 45 | fromage | cheese | fromage.png | a wedge of yellow cheese with holes | Low | 4 | Unit 4 | replaces the OpenMoji stand-in |
| 46 | hommes | men | hommes.png | two men side by side | Low | 4 | Unit 2 |  |
| 47 | journal | newspaper | journal.png | a folded newspaper (squiggles for text, no real letters) | Low | 4 | Unit 2 |  |
| 48 | lettres | letters | lettres.png | three envelopes fanned out | Low | 4 | Unit 6 |  |
| 49 | poisson | fish | poisson.png | one whole fish, blue and silver, seen from the side | Low | 4 | At the Beach (topic) |  |
| 50 | sandwich | sandwich | sandwich.png | a sandwich cut in half, ham and lettuce visible | Low | 4 | Unit 4 | replaces the OpenMoji stand-in |
| 51 | sucre | sugar | sucre.png | a few white sugar cubes, one on a spoon | Low | 4 | At the Café (topic) |  |
| 52 | verte | green | vert.png | same image as vert | Low | 4 | Unit 11 |  |
| 53 | viande | meat | viande.png | a raw steak on a small board | Low | 4 | At the Supermarket (topic) |  |
| 54 | ville | town, city | ville.png | a small cluster of city buildings with windows | Low | 4 | Unit 13 | replaces the OpenMoji stand-in |
| 55 | banane | banana | banane.png | one yellow banana | Low | 3 | At the Supermarket (topic) |  |
| 56 | bateau | boat | bateau.png | a small sailing boat on water | Low | 3 | At the Beach (topic) |  |
| 57 | bébé | baby | bebe.png | a baby sitting, in a onesie | Low | 3 | Family Life (topic) |  |
| 58 | beurre | butter | beurre.png | a block of butter on a dish, a knife beside it | Low | 3 | At the Supermarket (topic) |  |
| 59 | bleue | blue | bleu.png | same image as bleu | Low | 3 | Unit 11 |  |
| 60 | café | coffee | cafe.png | a small cup of black coffee on a saucer | Low | 3 | At the Café (topic) |  |
| 61 | chaise | chair | chaise.png | one wooden chair | Low | 3 | At Home (topic) |  |
| 62 | chanteur | singer | chanteur.png | a man singing into a microphone | Low | 3 | Music and Songs (topic) |  |
| 63 | chaud | hot | chaud.png | a thermometer showing high, red, beside a sun | Low | 3 | The Weather (topic) |  |
| 64 | chevaux | horses | chevaux.png | two horses side by side | Low | 3 | Unit 6 |  |
| 65 | chocolat | chocolate | chocolat.png | a bar of dark chocolate, partly unwrapped (no label text) | Low | 3 | At the Café (topic) |  |
| 66 | croissant | croissant | croissant.png | one golden croissant | Low | 3 | At the Café (topic) |  |
| 67 | cuisine | kitchen | cuisine.png | a kitchen corner: cooker, a pan, cupboards | Low | 3 | At Home (topic) |  |
| 68 | famille | family | famille.png | two parents and two children together | Low | 3 | Family Life (topic) |  |
| 69 | fenêtre | window | fenetre.png | a window with four panes and open curtains | Low | 3 | At Home (topic) |  |
| 70 | fièvre | fever | fievre.png | a thermometer showing a high red reading, with a hot red glow | Low | 3 | At the Doctor (topic) |  |
| 71 | froid | cold | froid.png | a thermometer showing low, blue, beside a snowflake | Low | 3 | The Weather (topic) |  |
| 72 | guitare | guitar | guitare.png | an acoustic guitar | Low | 3 | Music and Songs (topic) |  |
| 73 | hôpital | hospital | hopital.png | a hospital building with a red cross on the front (no words) | Low | 3 | At the Doctor (topic) |  |
| 74 | lit | bed | lit.png | a bed with a pillow and a blanket, nobody in it | Low | 3 | At Home (topic) |  |
| 75 | maison | house | maison.png | a small house with a red roof, a door and two windows | Low | 3 | At Home (topic) |  |
| 76 | médecins | doctors | medecins.png | two doctors in white coats side by side | Low | 3 | At the Doctor (topic) |  |
| 77 | mer | sea | mer.png | open sea with waves, a strip of sky, no land | Low | 3 | At the Beach (topic) |  |
| 78 | musique | music | musique.png | two musical notes | Low | 3 | Music and Songs (topic) |  |
| 79 | neige | snow | neige.png | snowflakes falling over a snowy ground | Low | 3 | The Weather (topic) |  |
| 80 | noire | black | noir.png | same image as noir | Low | 3 | Unit 11 |  |
| 81 | œuf | egg | oeuf.png | one brown egg | Low | 3 | At the Supermarket (topic) |  |
| 82 | œufs | eggs | oeufs.png | three brown eggs together | Low | 3 | At the Supermarket (topic) |  |
| 83 | oiseau | bird | oiseau.png | one small blue bird perched | Low | 3 | Unit 5 | replaces the OpenMoji stand-in |
| 84 | orange | orange | orange.png | one orange fruit with a leaf | Low | 3 | Unit 4 | replaces the OpenMoji stand-in |
| 85 | piano | piano | piano.png | an upright piano | Low | 3 | Music and Songs (topic) |  |
| 86 | plage | beach | plage.png | a beach with sand, sea and a parasol | Low | 3 | At the Beach (topic) |  |
| 87 | pluie | rain | pluie.png | a grey cloud with raindrops falling | Low | 3 | The Weather (topic) |  |
| 88 | porte | door | porte.png | a closed wooden front door with a handle | Low | 3 | At Home (topic) |  |
| 89 | poulet | chicken | poulet.png | a roast chicken on a plate | Low | 3 | At the Supermarket (topic) |  |
| 90 | riz | rice | riz.png | a bowl of white rice | Low | 3 | At the Supermarket (topic) |  |
| 91 | sable | sand | sable.png | a small heap of sand with a bucket and spade | Low | 3 | At the Beach (topic) |  |
| 92 | soleil | sun | soleil.png | a bright yellow sun with rays | Low | 3 | The Weather (topic) |  |
| 93 | stylo | pen | stylo.png | one ballpoint pen | Low | 3 | At the Office (topic) |  |
| 94 | table | table | table.png | a plain wooden table, nothing on it | Low | 3 | At Home (topic) |  |
| 95 | tasse | cup | tasse.png | an empty cup on a saucer, seen from the side | Low | 3 | At the Café (topic) |  |
| 96 | tomate | tomato | tomate.png | one red tomato with its green stalk | Low | 3 | At the Supermarket (topic) |  |
| 97 | vert | green | vert.png | a glossy green circle, like a paint swatch | Low | 3 | Unit 11 | replaces the OpenMoji stand-in |

Priority: High is in 10 or more live sentences, Medium 5 to 9, Low under 5. Sentences counts the live sentences that use the word.
