# Image needs, beyond flags

November 16, 2026. Research only; nothing in the repo was changed. Read from main as last pushed (French, Spanish and German A1 complete, Italian Parts 1 to 4, Portuguese Part 1).

## The ranking

| Rank | What | New images | Why it ranks here |
| --- | --- | --- | --- |
| 1 | Word pictures, Batch 1: Town | 19 | Unlocks Pick the Picture on a circle's own words in up to 38 to 40 circles per course once the batches land; this first batch alone covers 72 course words, 65 of them in circles with no picture today. One image serves three to five courses. |
| 2 | Sushi: maki and temaki | 20 | Seen on the home screen every day. In French one temaki appears 5 times down the tree and one maki 4 times; nigiri never more than twice. |
| 3 | Speaker avatars | 12 | Shown in three question types, about once or twice a lesson. Five men's faces serve 64 tagged male voices, two children's faces serve every child voice, nobody is older, and one avatar is in a different style from the rest. |
| 4 | Word pictures, Batches 2 to 5 (Food + Drink, Things You Carry + Use, Nature + Weather, School + Free Time) | about 75 | The same gain as Batch 1, spread over more circles. Lists are in `_review/picture-gaps.md`. |
| 5 | Word pictures, Batches 6 to 10 (Travel, Home, Body, Clothes, Jobs + People) | about 85 | As above; lower because more of these words sit in one or two courses only. |
| 6 | Conversation scenes | 8 | Three scenes and five task scenes per course are text only. One small picture each would serve all five courses. |
| 7 | Topic packs | 12 | The packs behind Pick Your Own (Weather, Family Life, At Home, Music, At the Café and the rest) have no icon of their own; only the two Pick Your Own nodes wear a dish. 24 misc dishes exist and only 2 are on a tree, so this needs no new art, only a decision to use them. |
| 8 | Tree items that are icons, not art | up to 5 | Final Check, Conversations, checkpoints and the I Can pills are small line icons in a pill. Brush-Up has one miso soup for every slot (12 in French). Low: they read clearly as they are. |
| 9 | Part cards and empty states | 0 to 10 | The part carousel cards and the empty states ("Nothing to brush up yet", "Nothing to bring back yet") are text only, by design so far. Listed for completeness. |

Nothing in the app is on a stand-in picture any more: no word uses an OpenMoji placeholder in any course, and the old miso soup placeholder is gone.

## 1. Word pictures

From `_review/picture-gaps.md`: 284 picturable meanings have no picture (666 course words), in 20 ranked batches; 37 more were already drawn in another course and are being mapped now, with no new art. The top five batches:

| Batch | Meanings | Course words |
| --- | --- | --- |
| 1 Town | 20 (19 to draw) | 72 |
| 2 Food + Drink | 20 | see the gaps file |
| 3 Things You Carry + Use | 20 | see the gaps file |
| 4 Nature + Weather | 20 | see the gaps file |
| 5 School + Free Time | 20 | see the gaps file |

### Prompt 1: Town (19 pictures)

Attach `public/images/pictures/maison.webp` and `magasin.webp` (or their originals) and send one request per picture, changing only the last line.

```
Make a picture in exactly the same style as the attached images: a single emoji-style subject, softly lit and
gently glossy, with clean simple shapes, rich natural colours and a soft shadow underneath. Flat emoji style, no
outlines, no photo realism. Square, 1024 by 1024. Plain white background, nothing else in the frame. The subject
centred and filling about three quarters of the square. No text, no letters, no numbers, no logos, no brand or
cartoon character, no flags. Signs on buildings are symbols only, never words. People, if any: simple, friendly,
neutral faces, plain clothes. The picture must read at the size of a thumbnail and must not be mistaken for any
other picture in this list.
Subject: <one line from the list>
```

1. `banque.png`: a small classical bank building with columns and a coin symbol over the door
2. `hotel.png`: a tall hotel building with rows of windows, a canopy over the entrance and a bed symbol on the sign
3. `gare.png`: a railway station building with a clock over the entrance and a train standing at the platform beside it
4. `rue.png`: a street running away between two rows of small houses, with a pavement and one street lamp, no cars
5. `marche.png`: an open-air market stall with a striped awning and crates of fruit and vegetables
6. `pharmacie.png`: a small pharmacy shopfront with a green cross sign and medicine bottles in the window
7. `cinema.png`: a cinema front with a lit blank marquee, a film reel symbol and a box of popcorn
8. `sortie.png`: an open door seen from inside with a green running-figure exit sign above it and an arrow pointing out
9. `eglise.png`: a small stone church with a bell tower and a round window
10. `musee.png`: a museum building with wide steps and columns, a framed painting and a statue at the entrance
11. `theatre.png`: a stage with red curtains drawn open and the two theatre masks above it
12. `place.png`: a paved town square with a fountain in the middle and houses around it
13. `coin.png`: a street corner seen from above: two streets meeting at a right angle around the corner of one building
14. `route.png`: a country road with a dashed centre line winding away between green fields
15. `bar.png`: a bar counter with two stools, a row of bottles on a shelf behind and two glasses on the counter
16. `village.png`: a few small houses and a church tower clustered on a green hill
17. `entree.png`: a building's double doors standing open with a welcome mat and an arrow pointing in
18. `boulangerie.png`: a bakery shopfront with loaves, baguettes and pastries in the window and a wheat symbol on the sign
19. `supermarche.png`: a wide supermarket front with glass doors and a shopping trolley full of groceries in front

Which word each serves, and the pairs to keep apart, are in `_review/picture-gaps.md`.

## 2. Sushi icons

The catalog has 90 images: 37 nigiri, 12 maki (3 of them the help rolls), 8 temaki, 26 misc (one is the miso soup, one the logo), 7 desserts (held). The rule is nigiri, maki and temaki by thirds of each part, no image twice in a part or across a part boundary, no two red-toned pieces side by side.

How the tree art is spread now (main circles, not help circles):

| Course | Nigiri | Maki | Temaki |
| --- | --- | --- | --- |
| French (6 parts) | 30 circles on 25 images, at most 2 times each | 24 circles on 9 images, up to 4 times | 29 circles on 8 images, up to 5 times |
| Spanish (4 parts) | 20 on 17, at most 2 | 18 on 9, up to 3 | 22 on 8, up to 3 |
| German (4 parts) | 20 on 18, at most 2 | 18 on 9, up to 3 | 22 on 8, up to 4 |
| Italian (4 parts) | 20 on 16, at most 2 | 18 on 8, up to 3 | 22 on 8, up to 3 |
| Portuguese (1 part) | 5 on 5 | 6 on 6 | 7 on 7 |

Shortage, counted against the longest course (French), for every circle to wear its own image:

| Category | Have (tree use) | Needed | Short | Colours now | Colours to add |
| --- | --- | --- | --- | --- | --- |
| Nigiri | 37 | 30 | none (12 never reach a French tree) | 19 of 37 red-toned (red 7, orange 7, pink 5), white 8, brown 4, pale pink 3, silver 3 | none needed; yellow and green would help keep red-toned apart |
| Maki | 9 | 24 | **15** | orange 4, yellow 2, pale pink 1, green 1, brown 1 | white, green, brown, black (nori outside), purple |
| Temaki | 8 | 29 | **21** | orange 2, white 2, pink 1, yellow 1, green 1, brown 1 | green, brown, yellow, white, black |
| Help rolls | 3 | 3 per part | none by rule (the same three in every part: 6 times each in French) | white, orange, red | Dan's call whether each part gets its own three |
| Brush-Up | 1 miso soup | 1 | none by rule (12 slots in French share it) | brown | a second and third soup would vary it |
| Misc | 24 | 2 used (Pick Your Own) | none | yellow 9, brown 8, green 4, white 3 | none |
| Dessert | 7 | 0 used | none | held for later | none |

So the shortage is 36 images, all maki and temaki. A first batch of 20 (9 maki, 11 temaki) brings the worst repeat in French from 5 times to 2 or 3.

### Prompt 2: sushi, maki and temaki (20 images)

This is the catalog's own prompt (`_source/sushi-catalog.md`, "Prompt for the next batch"), with a longer list and no nigiri. Attach two or three current images as the style reference, for example `_source/sushi-originals` copies of kappa maki, unakyu maki and hotate temaki.

```
Make a set of Japanese food illustrations to match the attached reference images: glossy, slightly stylised 3D
food art like a premium emoji, one item per image, three-quarter view from slightly above, soft studio light, a
soft shadow under the piece, no plate unless it is part of the dish, no text.
Each one a PNG at 1536 x 1024 with a real transparent background (true alpha, not a painted checkerboard and not
white).
Make these, one image each, with the main colour as given:
- Avocado maki, maki, main colour green
- Dragon roll (avocado slices on top), maki, main colour green
- Kanpyo maki (simmered gourd), maki, main colour brown
- Natto maki, maki, main colour brown
- Kani maki (crab stick), maki, main colour white
- Tamago maki (rolled omelette), maki, main colour yellow
- Corn mayo gunkan, maki, main colour yellow
- Oshinko maki cut as futomaki (thick roll, mixed pickles), maki, main colour purple
- Black sesame uramaki (inside-out roll coated in black sesame), maki, main colour black
- Kappa temaki (cucumber hand roll), temaki, main colour green
- Avocado cucumber temaki, temaki, main colour green
- Shiso ume temaki (plum paste and shiso leaf), temaki, main colour green
- Ebi tempura temaki, temaki, main colour yellow
- Tamago temaki (omelette), temaki, main colour yellow
- California temaki, temaki, main colour white
- Ika temaki (squid), temaki, main colour white
- Natto temaki, temaki, main colour brown
- Soft-shell crab temaki, temaki, main colour brown
- Shiitake temaki (simmered mushroom), temaki, main colour brown
- Spicy tuna temaki, temaki, main colour red
Do not repeat any of these existing dishes: Unakyu maki, California roll, Kappa maki, Philadelphia roll, Salmon
avocado roll, Takuan maki, Ebi tempura roll, Tekka maki, Negihama maki, Ikura gunkan, Tobiko gunkan, Uni gunkan,
Wakame temaki, Ikura temaki, Negitoro temaki, Salmon temaki, Hotate temaki, Unagi temaki, Uni temaki, Kani temaki.
```

Seventeen of the twenty are a calm colour, on purpose: red-toned pieces can't sit side by side, and most of the existing art is red-toned. One caution carried over from the flags: ask for true transparency and check it, since earlier files arrived with a checkerboard painted in.

## 3. Speaker avatars

Thirteen avatars: six women, five men, one girl, one boy. They show in Answer the Question, Pick What You Heard and, for a question put to the learner, Pick the Meaning. The avatar follows the voice's tag (Female, Male, Child) and is picked from that group by the sentence, so the same sentence always has the same face.

| Gap | What the numbers say |
| --- | --- |
| Men | 5 faces. 64 recorded speakers are tagged Male (and 1 device voice). Two questions in a row with a man's voice show the same face one time in five. |
| Women | 6 faces for 21 tagged speakers and 4 device voices; the same face one time in six. Five of the six have long dark or brown wavy hair and read as one person at 56 px; only the blonde stands apart. |
| Children | 2 faces, one girl and one boy, for the 4 voices tagged Child. Every girl's voice is the same girl. |
| Older people | None. Every adult looks 25 to 35. |
| Style | `male-blond-glasses` is a photo-like portrait on a grey background; the other twelve are glossy emoji-style busts on white. It stands out in a lesson. |
| Background | Two files have a transparent background and eleven a white one; in the circle the white ones show a white disc and the transparent ones the app's warm disc. Worth making them all transparent when new ones are made. |

With a lesson's three speaker questions on one device voice, at least two share a face about 44% of the time for a woman's voice and 52% for a man's. Doubling each group to ten or so brings that under 30%.

### Prompt 3: speaker avatars (12 images)

Attach two of the current avatars as the style reference: `female-chestnut` and `male-bearded-brown` (full-size originals are in `_source/speakers`).

```
Make a set of friendly speaker avatars to match the attached reference images exactly: a glossy, softly lit,
emoji-style 3D bust, head and shoulders only, facing the viewer, mouth open in a warm smile as if speaking,
simple plain top in one colour, soft shadow under the bust. One person per image. Square, 1024 by 1024, with a
real transparent background (true alpha, not a painted checkerboard and not white). The head and shoulders fill
the square, with the shoulders running to the bottom edge and a little space above the hair. No text, no logos,
no jewellery beyond small earrings, no real person's likeness. Each one must look clearly different from the
others and from the references at thumbnail size: vary age, hair, skin tone and top colour as described.
Make these twelve:
1. Woman, about 70, short white hair, round glasses, teal top
2. Woman, about 65, grey hair in a bun, warm brown skin, mustard top
3. Man, about 70, bald with a short white beard, navy top
4. Man, about 65, grey hair and moustache, light skin, olive green top
5. Woman, about 30, short black curly hair, dark brown skin, orange top
6. Woman, about 40, red hair in a ponytail, freckles, grey top
7. Woman, about 25, straight black bob with a fringe, light skin, yellow top
8. Man, about 30, shaved head, dark brown skin, clean-shaven, red top
9. Man, about 45, short blond hair, glasses, clean-shaven, light blue top (replaces the photo-style blond man)
10. Girl, about 8, two black braids, medium brown skin, purple top
11. Boy, about 8, red hair, freckles, green top
12. Girl, about 10, short blonde hair, light skin, coral top
```

That makes 9 women, 8 men and 5 children with the current set, two men and two women of them older. Each new file needs a Female, Male or Child place in the app's avatar lists (Lesson.jsx SPEAKERS and CHILDREN), which is a small code change for Builder 1.

## 4. Everything else, in short

- **Conversation scenes (8):** café, new neighbour, finding the way; and the task scenes ordering food, asking directions, introducing yourself, shopping, making a plan. One picture each, shared by every course, in the word-picture style.
- **Topic packs (12 titles across courses):** Weather, Family Life, At Home, Music, At the Café, At the Supermarket, At the Beach, At the Office, At the Doctor, At the Hotel, In the Garden. No new art: 22 misc dishes are unused.
- **Tree pills:** Final Check (checkered flag icon), Conversations (speech icon), checkpoints (flag), I Can (text). Art is optional.
- **Part cards (6 in French, 4 elsewhere):** text and pills only. A small scene per part would be 6 images at most.
- **Empty states (3 found):** Brush-Up with nothing in it, Practice Mistakes with nothing to bring back, the Conversations prep screen. Text only.

## Counts

| Kind | Have | Short or missing |
| --- | --- | --- |
| Word pictures | 95 files serving 300 course words | 284 meanings (666 course words); 19 in the first batch |
| Sushi, maki | 9 on trees | 15 |
| Sushi, temaki | 8 on trees | 21 |
| Sushi, nigiri / misc / dessert | 37 / 24 / 7 | none |
| Speaker avatars | 13 (6 women, 5 men, 2 children) | 12 proposed, one of them a replacement |
| Conversation scenes | 0 | 8 |
| Part cards, pills, empty states | icons or text | optional, up to about 15 |
