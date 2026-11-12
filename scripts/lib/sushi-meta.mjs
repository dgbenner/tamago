// What each piece of Dan's food art is (Dan, 2026-11-11): the dish, its category, its main colour (the colour that
// reads at a glance: the topping on nigiri, the filling of a nori maki, the rice of an inside-out roll), and any
// special use. Keyed by the original's path under _source/sushi-originals (also in R2, bucket tamago-sushi, under
// originals/). Judged by eye from contact sheets of every image. scripts/sushi-catalog.mjs turns this into
// content/sushi-catalog.json and _source/sushi-catalog.md.
//
// Colours: red, orange, pink, pale pink, white, yellow, green, brown, silver. Red, orange and pink count as one tone
// (red-toned: tuna, salmon, shrimp) for the side-by-side rule; every other colour is its own tone.
export const COLORS = ['red', 'orange', 'pink', 'pale pink', 'white', 'yellow', 'green', 'brown', 'silver']
export const toneOf = (color) => (['red', 'orange', 'pink'].includes(color) ? 'red-toned' : color)
export const CATEGORIES = ['nigiri', 'maki', 'temaki', 'misc', 'dessert']
// The help thread's rolls, in order (help circles only).
export const HELP_ROLLS = ['california-roll', 'salmon-avocado-roll', 'tekka-maki']

// [original path, slug, dish, category, colour, note]
export const META = [
  // Nigiri (Desktop batch, 2026-11-11)
  ['Nigiri/Aburi Salmon Nigiri with Spicy Mayo.png', 'aburi-salmon-nigiri', 'Aburi salmon nigiri with spicy mayo', 'nigiri', 'orange'],
  ['Nigiri/Glazed Anago Nigiri with Sesame-2.png', 'anago-nigiri', 'Anago nigiri (glazed sea eel)', 'nigiri', 'brown'],
  ['Nigiri/Glossy Amaebi Nigiri Sushi Icon-1.png', 'amaebi-nigiri', 'Amaebi nigiri (sweet shrimp)', 'nigiri', 'pink'],
  ['Nigiri/Glossy Beef Tataki Nigiri with Garnishes-1.png', 'beef-tataki-nigiri', 'Beef tataki nigiri', 'nigiri', 'red'],
  ['Nigiri/Glossy Chūtoro Nigiri Sushi-2.png', 'chutoro-nigiri', 'Chūtoro nigiri (medium-fat tuna)', 'nigiri', 'red'],
  ['Nigiri/Glossy Octopus Nigiri Sushi Icon-1.png', 'tako-nigiri', 'Tako nigiri (octopus)', 'nigiri', 'white'],
  ['Nigiri/Glossy Salmon Nigiri Sushi-3.png', 'salmon-nigiri-3', 'Salmon nigiri', 'nigiri', 'orange'],
  ['Nigiri/Glossy Salmon Nigiri Sushi-4.png', 'salmon-nigiri-4', 'Salmon nigiri', 'nigiri', 'orange'],
  ['Nigiri/Glossy Salmon Nigiri with Spicy Mayo-2.png', 'salmon-mayo-nigiri', 'Salmon nigiri with spicy mayo', 'nigiri', 'orange'],
  ['Nigiri/Glossy Scallop Nigiri Sushi Icon-2.png', 'hotate-nigiri', 'Hotate nigiri (scallop)', 'nigiri', 'white'],
  ['Nigiri/Glossy Scored Squid Nigiri-2.png', 'ika-nigiri', 'Ika nigiri (squid)', 'nigiri', 'white'],
  ['Nigiri/Glossy Sea Bream Nigiri Sushi-6.png', 'tai-nigiri', 'Tai nigiri (sea bream)', 'nigiri', 'white'],
  ['Nigiri/Glossy Shrimp Nigiri Sushi-2.png', 'ebi-nigiri', 'Ebi nigiri (shrimp)', 'nigiri', 'orange'],
  ['Nigiri/Glossy Tuna Nigiri Emoji-1.png', 'maguro-nigiri-1', 'Maguro nigiri (tuna)', 'nigiri', 'red'],
  ['Nigiri/Glossy Tuna Nigiri on Dark Gradient-2.png', 'maguro-nigiri-2', 'Maguro nigiri (tuna)', 'nigiri', 'red'],
  ['Nigiri/Glossy Unagi Nigiri Sushi-1.png', 'unagi-nigiri', 'Unagi nigiri (freshwater eel)', 'nigiri', 'brown'],
  ['Nigiri/Glossy Yellowtail Nigiri Sushi-4.png', 'hamachi-nigiri-4', 'Hamachi nigiri (yellowtail)', 'nigiri', 'pink'],
  ['Nigiri/Glossy Ōtoro Nigiri Sushi-3.png', 'otoro-nigiri', 'Ōtoro nigiri (fatty tuna)', 'nigiri', 'pink'],
  ['Nigiri/Hamachi Nigiri Sushi Emoji-5.png', 'hamachi-nigiri-5', 'Hamachi nigiri (yellowtail)', 'nigiri', 'pale pink'],
  ['Nigiri/Maguro Tuna Nigiri Emoji-1.png', 'maguro-nigiri-3', 'Maguro nigiri (tuna)', 'nigiri', 'red'],
  ['Nigiri/Realistic Saba Nigiri on Transparent Background-1.png', 'saba-nigiri', 'Saba nigiri (mackerel)', 'nigiri', 'silver'],
  // Square set (Dan, made with ChatGPT; in rotation since 2026-11-11)
  ['Square Set/Nigiri/Aji.png', 'aji-nigiri-sq', 'Aji nigiri (horse mackerel)', 'nigiri', 'silver'],
  ['Square Set/Nigiri/Amaebi.png', 'amaebi-nigiri-sq', 'Amaebi nigiri (sweet shrimp)', 'nigiri', 'pink'],
  ['Square Set/Nigiri/Anago.png', 'anago-nigiri-sq', 'Anago nigiri (glazed sea eel)', 'nigiri', 'brown'],
  ['Square Set/Nigiri/Chutoro.png', 'chutoro-nigiri-sq', 'Chūtoro nigiri (medium-fat tuna)', 'nigiri', 'red'],
  ['Square Set/Nigiri/Ebi.png', 'ebi-nigiri-sq', 'Ebi nigiri (shrimp)', 'nigiri', 'orange'],
  ['Square Set/Nigiri/Hamachi.png', 'hamachi-nigiri-sq', 'Hamachi nigiri (yellowtail)', 'nigiri', 'pale pink'],
  ['Square Set/Nigiri/Hirame.png', 'hirame-nigiri-sq', 'Hirame nigiri (flounder)', 'nigiri', 'white'],
  ['Square Set/Nigiri/Hotate.png', 'hotate-nigiri-sq', 'Hotate nigiri (scallop)', 'nigiri', 'white'],
  ['Square Set/Nigiri/Ika.png', 'ika-nigiri-sq', 'Ika nigiri (squid)', 'nigiri', 'white'],
  ['Square Set/Nigiri/Maguro.png', 'maguro-nigiri-sq', 'Maguro nigiri (tuna)', 'nigiri', 'red'],
  ['Square Set/Nigiri/Otoro.png', 'otoro-nigiri-sq', 'Ōtoro nigiri (fatty tuna)', 'nigiri', 'pink'],
  ['Square Set/Nigiri/Saba.png', 'saba-nigiri-sq', 'Saba nigiri (mackerel)', 'nigiri', 'silver'],
  ['Square Set/Nigiri/Sake.png', 'sake-nigiri-sq', 'Salmon nigiri', 'nigiri', 'orange'],
  ['Square Set/Nigiri/Tai.png', 'tai-nigiri-sq', 'Tai nigiri (sea bream)', 'nigiri', 'pale pink'],
  ['Square Set/Nigiri/Tako.png', 'tako-nigiri-sq', 'Tako nigiri (octopus)', 'nigiri', 'white'],
  ['Square Set/Nigiri/Unagi.png', 'unagi-nigiri-sq', 'Unagi nigiri (freshwater eel)', 'nigiri', 'brown'],
  // Maki
  ['Maki/Glazed Eel and Cucumber Maki Sticker.png', 'unakyu-maki', 'Unakyu maki (eel and cucumber)', 'maki', 'brown'],
  ['Maki/Glossy California Roll Emoji-7.png', 'california-roll', 'California roll', 'maki', 'white', 'help roll 1'],
  ['Maki/Glossy Cucumber Maki Roll.png', 'kappa-maki', 'Kappa maki (cucumber)', 'maki', 'green'],
  ['Maki/Glossy Philadelphia Roll Sushi.png', 'philadelphia-roll', 'Philadelphia roll', 'maki', 'orange'],
  ['Maki/Glossy Salmon Avocado Sushi Roll-6.png', 'salmon-avocado-roll', 'Salmon avocado roll', 'maki', 'orange', 'help roll 2'],
  ['Maki/Glossy Takuan Maki Sushi Roll.png', 'takuan-maki', 'Takuan maki (pickled radish)', 'maki', 'yellow'],
  ['Maki/Glossy Tempura Shrimp Sushi   Roll.png', 'ebi-tempura-roll', 'Ebi tempura roll', 'maki', 'orange', 'the original has a checkerboard painted in, not transparency; the app copy has it lifted out'],
  ['Maki/Glossy Tuna Maki Sushi Roll-5.png', 'tekka-maki', 'Tekka maki (tuna)', 'maki', 'red', 'help roll 3'],
  ['Maki/Glossy Yellowtail Scallion Sushi Roll.png', 'negihama-maki', 'Negihama maki (yellowtail and scallion)', 'maki', 'pale pink'],
  ['Square Set/Maki/Ikura.png', 'ikura-gunkan-sq', 'Ikura gunkan (salmon roe)', 'maki', 'orange'],
  ['Square Set/Maki/Tobiko.png', 'tobiko-gunkan-sq', 'Tobiko gunkan (flying fish roe)', 'maki', 'orange'],
  ['Square Set/Maki/Uni.png', 'uni-gunkan-sq', 'Uni gunkan (sea urchin)', 'maki', 'yellow'],
  // Temaki
  ['Temaki/Glossy Emerald Wakame Temaki Roll.png', 'wakame-temaki', 'Wakame temaki (seaweed)', 'temaki', 'green'],
  ['Temaki/Glossy Ikura Temaki Sushi Roll-1.png', 'ikura-temaki', 'Ikura temaki (salmon roe)', 'temaki', 'orange'],
  ['Temaki/Glossy Negitoro Tuna Hand Roll-2.png', 'negitoro-temaki', 'Negitoro temaki (tuna and scallion)', 'temaki', 'pink'],
  ['Temaki/Glossy Salmon Temaki Hand Roll-1.png', 'salmon-temaki', 'Salmon temaki', 'temaki', 'orange'],
  ['Temaki/Glossy Scallop Temaki Roll-1.png', 'hotate-temaki', 'Hotate temaki (scallop)', 'temaki', 'white'],
  ['Temaki/Glossy Unagi Temaki Hand Roll-3.png', 'unagi-temaki', 'Unagi temaki (eel)', 'temaki', 'brown'],
  ['Temaki/Glossy Uni Temaki Hand Roll-2.png', 'uni-temaki', 'Uni temaki (sea urchin)', 'temaki', 'yellow'],
  ['Temaki/Temaki Hand Roll with Fresh Fillings-2.png', 'kani-temaki', 'Kani temaki (crab)', 'temaki', 'white'],
  // Miscellaneous: side dishes and Japanese street food
  ['Miscellaneous/Crispy Golden Potato Korokke-2.png', 'korokke', 'Potato korokke', 'misc', 'brown'],
  ['Miscellaneous/Crispy Tempura Kabocha Slices.png', 'kabocha-tempura', 'Kabocha tempura (pumpkin)', 'misc', 'yellow'],
  ['Miscellaneous/Glossy Asparagus Bacon Skewer-1.png', 'asparagus-bacon-skewer', 'Asparagus bacon skewer', 'misc', 'green'],
  ['Miscellaneous/Glossy Chawanmushi Ceramic Cup-2.png', 'chawanmushi', 'Chawanmushi (savoury egg custard)', 'misc', 'white'],
  ['Miscellaneous/Glossy Edamame Pods and Beans-2.png', 'edamame', 'Edamame', 'misc', 'green'],
  ['Miscellaneous/Glossy Golden Gyoza Cluster-1.png', 'gyoza', 'Gyoza', 'misc', 'yellow'],
  ['Miscellaneous/Glossy Golden Inari Sushi Duo-1.png', 'inari', 'Inari sushi', 'misc', 'brown'],
  ['Miscellaneous/Glossy Gyudon with Pickled Ginger-1.png', 'gyudon', 'Gyudon (beef bowl)', 'misc', 'brown'],
  ['Miscellaneous/Glossy Japanese Oyakodon Bowl-2.png', 'oyakodon', 'Oyakodon (chicken and egg bowl)', 'misc', 'yellow'],
  ['Miscellaneous/Glossy Katsudon Rice Bowl-1.png', 'katsudon', 'Katsudon (pork cutlet bowl)', 'misc', 'yellow'],
  ['Miscellaneous/Glossy Korean Street Toast Sandwich.png', 'korean-street-toast', 'Korean street toast', 'misc', 'brown', 'Korean, not Japanese'],
  ['Miscellaneous/Glossy Sesame-Glazed Chicken Wings-2.png', 'tebasaki', 'Tebasaki (glazed chicken wings)', 'misc', 'brown'],
  ['Miscellaneous/Glossy Sweet Potato Tempura Slices-1.png', 'satsumaimo-tempura', 'Sweet potato tempura', 'misc', 'yellow'],
  ['Miscellaneous/Glossy Takoyaki in Wooden Boat.png', 'takoyaki', 'Takoyaki', 'misc', 'brown'],
  ['Miscellaneous/Glossy Tempura Rice Bowl Emoji-2.png', 'tendon', 'Tendon (tempura rice bowl)', 'misc', 'yellow'],
  ['Miscellaneous/Glossy Trio of Orange-Topped Shumai-2.png', 'shumai', 'Shumai', 'misc', 'white'],
  ['Miscellaneous/Glossy Wakame Seaweed Salad Ramekin-1.png', 'wakame-salad', 'Wakame salad', 'misc', 'green'],
  ['Miscellaneous/Glossy Yakitori Negima Skewer-1.png', 'yakitori', 'Yakitori negima', 'misc', 'brown'],
  ['Miscellaneous/Golden Agedashi Tofu with Daikon and Scallions-2.png', 'agedashi-tofu', 'Agedashi tofu', 'misc', 'yellow'],
  ['Miscellaneous/Golden Broccoli Tempura Duo.png', 'broccoli-tempura', 'Broccoli tempura', 'misc', 'green'],
  ['Miscellaneous/Golden Tempura Shrimp Duo.png', 'ebi-tempura', 'Ebi tempura (shrimp)', 'misc', 'yellow'],
  ['Miscellaneous/Golden Vegetable Kakiage Tempura-2.png', 'kakiage', 'Kakiage (vegetable tempura)', 'misc', 'yellow'],
  ['Miscellaneous/Golden-Seared Scallop Trio with Chives-1.png', 'seared-scallops', 'Seared scallops', 'misc', 'brown'],
  ['Miscellaneous/Kani Sunomono Salad in Speckled Ramekin-2.png', 'kani-sunomono', 'Kani sunomono (crab and cucumber salad)', 'misc', 'white'],
  ['Miscellaneous/Miso Soup with Tofu and Wakame.png', 'miso-soup', 'Miso soup', 'misc', 'brown', 'Brush-Up'],
  ['Miscellaneous/Tamago Nigiri Sushi Emoji.png', 'tamago-nigiri', 'Tamago nigiri (sweet omelette)', 'misc', 'yellow', 'logo'],
  // Dessert: held for a later special use, never on the tree
  ['Dessert/Chocolate-Drizzled Tempura Ice Cream-1.png', 'tempura-ice-cream', 'Tempura ice cream', 'dessert', 'yellow'],
  ['Dessert/Glossy Caramel Purin on Speckled Saucer-1.png', 'purin', 'Purin (caramel custard)', 'dessert', 'yellow'],
  ['Dessert/Glossy Hanami Dango Skewer-2.png', 'hanami-dango', 'Hanami dango', 'dessert', 'pink'],
  ['Dessert/Glossy Matcha Cheesecake Slice-2.png', 'matcha-cheesecake', 'Matcha cheesecake', 'dessert', 'green'],
  ['Dessert/Matcha Ice Cream in Patterned Ceramic Bowl-1.png', 'matcha-ice-cream', 'Matcha ice cream', 'dessert', 'green'],
  ['Dessert/Matcha Mochi Trio with Cutaway.png', 'mochi-trio', 'Mochi trio (matcha and strawberry)', 'dessert', 'pink'],
  ['Dessert/Photorealistic Ichigo Daifuku Close-Up.png', 'ichigo-daifuku', 'Ichigo daifuku (strawberry mochi)', 'dessert', 'pink'],
].map(([path, slug, dish, category, color, note = '']) => ({ path, slug, dish, category, color, note }))

// Lifts a painted-in checkerboard off an opaque original (the app copy only).
export const NEEDS_CUTOUT = new Set(['ebi-tempura-roll'])
