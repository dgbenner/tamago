# Sushi catalog

Every piece of Tamago food art, 90 images. Made by `node scripts/sushi-catalog.mjs` from scripts/lib/sushi-meta.mjs; do not edit by hand. Originals are untouched in Cloudflare R2, bucket `tamago-sushi`, under `originals/` (and locally in _source/sushi-originals, not in git). The app uses only the small copies in public/sushi: WebP, trimmed and scaled to the same visible size, 80 px and 160 px (@2x).

## Usage rules

- **Main circles:** nigiri for the easiest third of each part, maki for the middle, temaki for the hardest. A vocabulary circle takes the type of the circle before it.
- **Help circles:** the three help rolls, in order: California roll, salmon avocado roll, tekka maki. Nothing else wears them.
- **Pick Your Own:** a misc dish instead of the "?", kept after a topic is chosen.
- **Catch-Up:** the new miso soup.
- **Checkpoints:** the flag. The tamago sushi is the logo only.
- **Dessert:** not on the tree. Held for a later special use.
- **No image twice** within a part or across a part boundary (a part's first 6 places never use one from the last 6 of the part before), **and no two similar colours side by side.** Red, orange and pink are one tone (red-toned: tuna, salmon, shrimp), so two red-toned pieces never sit together; white, yellow, green, brown, silver and pale pink mix in between.
- **Shortages:** a type with fewer images than circles borrows from the type before it at the edge of its run (easy-to-hard order kept). An image repeats only when every type is used up.
- Assignment: `COURSE=fr|es|de node scripts/assign-icons.mjs`, then import and build; test/icons.test.js fails on any repeat or colour clash. Images: `node scripts/make-icons.mjs`.

## Duplicates

- 16 files in the Desktop batch were the same files as the earlier glossy set; each is listed once.
- The old placeholder miso soup (/icons/sides/miso-soup.svg) is replaced by the new miso soup.
- Same dish, different art (both kept, since each is its own picture; the assignment puts a new dish ahead of one already in the part):
  - anago-nigiri, anago-nigiri-sq
  - amaebi-nigiri, amaebi-nigiri-sq
  - chutoro-nigiri, chutoro-nigiri-sq
  - tako-nigiri, tako-nigiri-sq
  - sake-nigiri-sq, salmon-mayo-nigiri, salmon-nigiri-3, salmon-nigiri-4
  - hotate-nigiri, hotate-nigiri-sq
  - ika-nigiri, ika-nigiri-sq
  - tai-nigiri, tai-nigiri-sq
  - ebi-nigiri, ebi-nigiri-sq
  - maguro-nigiri-1, maguro-nigiri-2, maguro-nigiri-3, maguro-nigiri-sq
  - unagi-nigiri, unagi-nigiri-sq
  - hamachi-nigiri-4, hamachi-nigiri-5, hamachi-nigiri-sq
  - otoro-nigiri, otoro-nigiri-sq
  - saba-nigiri, saba-nigiri-sq

## Nigiri (37)

| Image | Dish | Colour | Used | Notes |
| --- | --- | --- | --- | --- |
| `aburi-salmon-nigiri` | Aburi salmon nigiri with spicy mayo | orange | German Part 1, People + Things (U02) |  |
| `anago-nigiri` | Anago nigiri (glazed sea eel) | brown | Spanish Part 1, Food + Drink (U04) | same dish as anago-nigiri-sq |
| `amaebi-nigiri` | Amaebi nigiri (sweet shrimp) | pink | not used yet | same dish as amaebi-nigiri-sq |
| `beef-tataki-nigiri` | Beef tataki nigiri | red | not used yet |  |
| `chutoro-nigiri` | Chūtoro nigiri (medium-fat tuna) | red | not used yet | same dish as chutoro-nigiri-sq |
| `tako-nigiri` | Tako nigiri (octopus) | white | French Part 2, Birthdays (U43) | same dish as tako-nigiri-sq |
| `salmon-nigiri-3` | Salmon nigiri | orange | not used yet | same dish as salmon-nigiri-4, salmon-mayo-nigiri, sake-nigiri-sq |
| `salmon-nigiri-4` | Salmon nigiri | orange | not used yet | same dish as salmon-nigiri-3, salmon-mayo-nigiri, sake-nigiri-sq |
| `salmon-mayo-nigiri` | Salmon nigiri with spicy mayo | orange | not used yet | same dish as salmon-nigiri-3, salmon-nigiri-4, sake-nigiri-sq |
| `hotate-nigiri` | Hotate nigiri (scallop) | white | French Part 1, Polite Phrases (U03) | same dish as hotate-nigiri-sq |
| `ika-nigiri` | Ika nigiri (squid) | white | not used yet | same dish as ika-nigiri-sq |
| `tai-nigiri` | Tai nigiri (sea bream) | white | not used yet | same dish as tai-nigiri-sq |
| `ebi-nigiri` | Ebi nigiri (shrimp) | orange | not used yet | same dish as ebi-nigiri-sq |
| `maguro-nigiri-1` | Maguro nigiri (tuna) | red | French Part 2, Phone Numbers (U42) | same dish as maguro-nigiri-2, maguro-nigiri-3, maguro-nigiri-sq |
| `maguro-nigiri-2` | Maguro nigiri (tuna) | red | French Part 1, Say Hi (U01) | same dish as maguro-nigiri-1, maguro-nigiri-3, maguro-nigiri-sq |
| `unagi-nigiri` | Unagi nigiri (freshwater eel) | brown | Spanish Part 1, People + Things (U02) | same dish as unagi-nigiri-sq |
| `hamachi-nigiri-4` | Hamachi nigiri (yellowtail) | pink | French Part 1, Food + Drink (U04) | same dish as hamachi-nigiri-5, hamachi-nigiri-sq |
| `otoro-nigiri` | Ōtoro nigiri (fatty tuna) | pink | not used yet | same dish as otoro-nigiri-sq |
| `hamachi-nigiri-5` | Hamachi nigiri (yellowtail) | pale pink | not used yet | same dish as hamachi-nigiri-4, hamachi-nigiri-sq |
| `maguro-nigiri-3` | Maguro nigiri (tuna) | red | not used yet | same dish as maguro-nigiri-1, maguro-nigiri-2, maguro-nigiri-sq |
| `saba-nigiri` | Saba nigiri (mackerel) | silver | French Part 1, Animals (U05) | same dish as saba-nigiri-sq |
| `aji-nigiri-sq` | Aji nigiri (horse mackerel) | silver | not used yet |  |
| `amaebi-nigiri-sq` | Amaebi nigiri (sweet shrimp) | pink | not used yet | same dish as amaebi-nigiri |
| `anago-nigiri-sq` | Anago nigiri (glazed sea eel) | brown | German Part 1, Food + Drink (U04) | same dish as anago-nigiri |
| `chutoro-nigiri-sq` | Chūtoro nigiri (medium-fat tuna) | red | Spanish Part 1, Say Hi (U01) | same dish as chutoro-nigiri |
| `ebi-nigiri-sq` | Ebi nigiri (shrimp) | orange | not used yet | same dish as ebi-nigiri |
| `hamachi-nigiri-sq` | Hamachi nigiri (yellowtail) | pale pink | French Part 2, Around Town (U51) | same dish as hamachi-nigiri-4, hamachi-nigiri-5 |
| `hirame-nigiri-sq` | Hirame nigiri (flounder) | white | Spanish Part 1, Animals (U05) |  |
| `hotate-nigiri-sq` | Hotate nigiri (scallop) | white | Spanish Part 1, Polite Phrases (U03); German Part 1, Polite Phrases (U03) | same dish as hotate-nigiri |
| `ika-nigiri-sq` | Ika nigiri (squid) | white | French Part 2, Your Name, Please (U41); German Part 1, Animals (U05) | same dish as ika-nigiri |
| `maguro-nigiri-sq` | Maguro nigiri (tuna) | red | German Part 1, Say Hi (U01) | same dish as maguro-nigiri-1, maguro-nigiri-2, maguro-nigiri-3 |
| `otoro-nigiri-sq` | Ōtoro nigiri (fatty tuna) | pink | French Part 2, Free Time (U52) | same dish as otoro-nigiri |
| `saba-nigiri-sq` | Saba nigiri (mackerel) | silver | not used yet | same dish as saba-nigiri |
| `sake-nigiri-sq` | Salmon nigiri | orange | not used yet | same dish as salmon-nigiri-3, salmon-nigiri-4, salmon-mayo-nigiri |
| `tai-nigiri-sq` | Tai nigiri (sea bream) | pale pink | not used yet | same dish as tai-nigiri |
| `tako-nigiri-sq` | Tako nigiri (octopus) | white | not used yet | same dish as tako-nigiri |
| `unagi-nigiri-sq` | Unagi nigiri (freshwater eel) | brown | French Part 1, People + Things (U02) | same dish as unagi-nigiri |

## Maki (12)

| Image | Dish | Colour | Used | Notes |
| --- | --- | --- | --- | --- |
| `unakyu-maki` | Unakyu maki (eel and cucumber) | brown | French Part 2, Countries + Languages (U46); Spanish Part 1, Ser or Estar (U09); German Part 1, Mine + Yours (U09) |  |
| `california-roll` | California roll | white | French Part 1, Getting Help (U31); French Part 2, Spelling It Out (U34); Spanish Part 1, Getting Help (U31); German Part 1, Getting Help (U31) | help roll |
| `kappa-maki` | Kappa maki (cucumber) | green | French Part 2, Where You Live (U45); Spanish Part 1, Plurals (U06) |  |
| `philadelphia-roll` | Philadelphia roll | orange | French Part 1, Plurals (U06); German Part 1, Free Time (U52) |  |
| `salmon-avocado-roll` | Salmon avocado roll | orange | French Part 1, Conversation Help (U32); French Part 2, Checking Numbers (U35); Spanish Part 1, Conversation Help (U32); German Part 1, Conversation Help (U32) | help roll |
| `takuan-maki` | Takuan maki (pickled radish) | yellow | French Part 1, Asking Questions (U09); Spanish Part 1, Where Things Are (U08); German Part 1, Asking Questions (U10) |  |
| `ebi-tempura-roll` | Ebi tempura roll | orange | not used yet | the original has a checkerboard painted in, not transparency; the app copy has it lifted out |
| `tekka-maki` | Tekka maki (tuna) | red | French Part 1, Finding the Word (U33); French Part 2, Checking You Understood (U36); Spanish Part 1, Finding the Word (U33); German Part 1, Finding the Word (U33) | help roll |
| `negihama-maki` | Negihama maki (yellowtail and scallion) | pale pink | French Part 2, Numbers to 100 (U44); Spanish Part 1, Mine + Yours (U10); German Part 1, Describing Things (U07) |  |
| `ikura-gunkan-sq` | Ikura gunkan (salmon roe) | orange | French Part 2, Body + Feelings (U53); Spanish Part 1, Body + Feelings (U51) |  |
| `tobiko-gunkan-sq` | Tobiko gunkan (flying fish roe) | orange | French Part 1, Mine + Yours (U08); German Part 1, Plurals (U06) |  |
| `uni-gunkan-sq` | Uni gunkan (sea urchin) | yellow | French Part 1, Describing Things (U07); Spanish Part 1, Describing Things (U07); German Part 1, Not + None (U08) |  |

## Temaki (8)

| Image | Dish | Colour | Used | Notes |
| --- | --- | --- | --- | --- |
| `wakame-temaki` | Wakame temaki (seaweed) | green | French Part 1, Intro to Numbers (U10); Spanish Part 1, Time (U14); German Part 1, Want + Can (U15) |  |
| `ikura-temaki` | Ikura temaki (salmon roe) | orange | French Part 1, Colors (U11); German Part 1, Intro to Numbers (U11) |  |
| `negitoro-temaki` | Negitoro temaki (tuna and scallion) | pink | French Part 2, At the Market (U47); Spanish Part 1, Free Time (U52) |  |
| `salmon-temaki` | Salmon temaki | orange | French Part 2, Bottles + Bags (U49); Spanish Part 1, Going Places (U15); German Part 1, Colors (U12) |  |
| `hotate-temaki` | Hotate temaki (scallop) | white | French Part 2, How Much Is It? (U48); Spanish Part 1, Around Town (U53); German Part 1, Around Town (U53) |  |
| `unagi-temaki` | Unagi temaki (eel) | brown | French Part 1, Going Places (U13); Spanish Part 1, Colors (U13); German Part 1, Time (U13) |  |
| `uni-temaki` | Uni temaki (sea urchin) | yellow | French Part 1, Time (U12); French Part 2, Outdoors (U55); Spanish Part 1, Asking Questions (U11); German Part 1, Going Places (U14) |  |
| `kani-temaki` | Kani temaki (crab) | white | French Part 2, People (U54); Spanish Part 1, Intro to Numbers (U12); German Part 1, People + Feelings (U51) |  |

## Misc (26)

| Image | Dish | Colour | Used | Notes |
| --- | --- | --- | --- | --- |
| `korokke` | Potato korokke | brown | not used yet |  |
| `kabocha-tempura` | Kabocha tempura (pumpkin) | yellow | not used yet |  |
| `asparagus-bacon-skewer` | Asparagus bacon skewer | green | not used yet |  |
| `chawanmushi` | Chawanmushi (savoury egg custard) | white | not used yet |  |
| `edamame` | Edamame | green | not used yet |  |
| `gyoza` | Gyoza | yellow | not used yet |  |
| `inari` | Inari sushi | brown | not used yet |  |
| `gyudon` | Gyudon (beef bowl) | brown | not used yet |  |
| `oyakodon` | Oyakodon (chicken and egg bowl) | yellow | not used yet |  |
| `katsudon` | Katsudon (pork cutlet bowl) | yellow | not used yet |  |
| `korean-street-toast` | Korean street toast | brown | not used yet | Korean, not Japanese |
| `tebasaki` | Tebasaki (glazed chicken wings) | brown | not used yet |  |
| `satsumaimo-tempura` | Sweet potato tempura | yellow | not used yet |  |
| `takoyaki` | Takoyaki | brown | not used yet |  |
| `tendon` | Tendon (tempura rice bowl) | yellow | French Part 1, Pick Your Own (U100); Spanish Part 1, Pick Your Own (U200) |  |
| `shumai` | Shumai | white | not used yet |  |
| `wakame-salad` | Wakame salad | green | German Part 1, Pick Your Own (U100) |  |
| `yakitori` | Yakitori negima | brown | not used yet |  |
| `agedashi-tofu` | Agedashi tofu | yellow | Spanish Part 1, Pick Your Own (U100) |  |
| `broccoli-tempura` | Broccoli tempura | green | not used yet |  |
| `ebi-tempura` | Ebi tempura (shrimp) | yellow | not used yet |  |
| `kakiage` | Kakiage (vegetable tempura) | yellow | French Part 1, Pick Your Own (U200); German Part 1, Pick Your Own (U200) |  |
| `seared-scallops` | Seared scallops | brown | not used yet |  |
| `kani-sunomono` | Kani sunomono (crab and cucumber salad) | white | not used yet |  |
| `miso-soup` | Miso soup | brown | Catch-Up, every course | Catch-Up |
| `tamago-nigiri` (no app copy) | Tamago nigiri (sweet omelette) | yellow | the logo only | logo |

## Dessert (7)

| Image | Dish | Colour | Used | Notes |
| --- | --- | --- | --- | --- |
| `tempura-ice-cream` (no app copy) | Tempura ice cream | yellow | held for a later special use | held |
| `purin` (no app copy) | Purin (caramel custard) | yellow | held for a later special use | held |
| `hanami-dango` (no app copy) | Hanami dango | pink | held for a later special use | held |
| `matcha-cheesecake` (no app copy) | Matcha cheesecake | green | held for a later special use | held |
| `matcha-ice-cream` (no app copy) | Matcha ice cream | green | held for a later special use | held |
| `mochi-trio` (no app copy) | Mochi trio (matcha and strawberry) | pink | held for a later special use | held |
| `ichigo-daifuku` (no app copy) | Ichigo daifuku (strawberry mochi) | pink | held for a later special use | held |

## What is short

Targets: nigiri 14, maki 14, temaki 14 (two neighbouring parts without a repeat), misc 12; at least 2 of each calm colour (white, yellow, green, brown) in each tree type, and no more than half red-toned. Help rolls, the miso soup, the logo and desserts are not counted.

- **nigiri** (37: red 7, orange 7, pink 5, pale pink 3, white 8, brown 4, silver 3): too red: 19 of 37 are red-toned, so calm colours are needed to keep red-toned ones apart; yellow: 0 of 2; green: 0 of 2
- **maki** (9: orange 4, pale pink 1, yellow 2, green 1, brown 1): 5 more images (9 of 14); white: 0 of 2; green: 1 of 2; brown: 1 of 2
- **temaki** (8: orange 2, pink 1, white 2, yellow 1, green 1, brown 1): 6 more images (8 of 14); yellow: 1 of 2; green: 1 of 2; brown: 1 of 2
- **misc** (24: white 3, yellow 9, green 4, brown 8): nothing short

## Prompt for the next batch

Paste into ChatGPT with two or three current images attached as the style reference:

```
Make a set of Japanese food illustrations to match the attached reference images: glossy, slightly stylised 3D food art like a premium emoji, one item per image, three-quarter view from slightly above, soft studio light, a soft shadow under the piece, no plate unless it is part of the dish, no text.
Each one a PNG at 1536 x 1024 with a real transparent background (true alpha, not a painted checkerboard and not white).
Make these, one image each, with the main colour as given:
- Kazunoko nigiri (herring roe), nigiri, main colour yellow
- Avocado nigiri, nigiri, main colour green
- Okra nigiri, nigiri, main colour green
- Shiso cucumber nigiri, nigiri, main colour green
- Engawa nigiri (flounder fin), nigiri, main colour white
- Avocado maki, maki, main colour green
- Dragon roll (avocado on top), maki, main colour green
- Kanpyo maki (gourd), maki, main colour brown
- Natto maki, maki, main colour brown
- Kani maki (crab stick), maki, main colour white
- Corn mayo gunkan, maki, main colour yellow
- Kappa temaki (cucumber), temaki, main colour green
- Avocado cucumber temaki, temaki, main colour green
- Ebi tempura temaki, temaki, main colour yellow
- California temaki, temaki, main colour white
- Natto temaki, temaki, main colour brown
- Soft-shell crab temaki, temaki, main colour brown
Do not repeat any of these existing dishes: Aburi salmon nigiri with spicy mayo, Agedashi tofu, Aji nigiri, Amaebi nigiri, Anago nigiri, Asparagus bacon skewer, Beef tataki nigiri, Broccoli tempura, California roll, Chawanmushi, Chūtoro nigiri, Ebi nigiri, Ebi tempura, Ebi tempura roll, Edamame, Gyoza, Gyudon, Hamachi nigiri, Hanami dango, Hirame nigiri, Hotate nigiri, Hotate temaki, Ichigo daifuku, Ika nigiri, Ikura gunkan, Ikura temaki, Inari sushi, Kabocha tempura, Kakiage, Kani sunomono, Kani temaki, Kappa maki, Katsudon, Korean street toast, Maguro nigiri, Matcha cheesecake, Matcha ice cream, Miso soup, Mochi trio, Negihama maki, Negitoro temaki, Oyakodon, Philadelphia roll, Potato korokke, Purin, Saba nigiri, Salmon avocado roll, Salmon nigiri, Salmon nigiri with spicy mayo, Salmon temaki, Seared scallops, Shumai, Sweet potato tempura, Tai nigiri, Tako nigiri, Takoyaki, Takuan maki, Tamago nigiri, Tebasaki, Tekka maki, Tempura ice cream, Tendon, Tobiko gunkan, Unagi nigiri, Unagi temaki, Unakyu maki, Uni gunkan, Uni temaki, Wakame salad, Wakame temaki, Yakitori negima, Ōtoro nigiri.
```
