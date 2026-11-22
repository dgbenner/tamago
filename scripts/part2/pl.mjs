// Polish A1 · Part 2, Everyday Life (Dan, 2026-11-21; Builder 2, branch content/pl-a1), in the format of Danish, Swedish
// and Dutch Part 2: names and spelling (T01, T02), phone numbers, age, where you live and where you are from (T03),
// numbers to 100, shopping and prices (T04); the help thread goes on (T13). Standard Polish, ty throughout (Pan and Pani
// kept out); prices in złoty. Present tense, imperfective; a perfective only as a fixed phrase or as an infinitive after
// chcę, muszę, mogę, możesz (miło cię poznać, poproszę, niech zobaczę, chcę kupić, muszę to zrobić).
// Cases: Part 1 used the nominative and the accusative (the genitive only after nie with pies and kot, and lat). Part 2
// brings in the genitive properly (U42 do and numer telefonu, U45 u and od, U46 z and uczę się, U47 potrzebuję and dla,
// U48 złotych, U49 quantities, nie ma and bez) and the locative after w, na and o for places and topics (U45 w domu,
// U46 w Polsce, U55 w szkole and o tym, U58 w lesie). The instrumental and the dative stay out (Part 3 can bring the
// instrumental for z as with and jestem studentem). Every case form is a word of its own, with its own hint, met first
// in the circle that names it. Words chosen for the Polish Kelly list's core 600 (content-pl/a1-list.json) where they fit
// the situations, and for the forms that open the most checked Tatoeba lines within the words known by then.
// Used by scripts/add-part.mjs (COURSE=pl PART=2).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U41', order: 101, row: 11, after: '', title: 'Your Name, Please', tasks: 'T01;T02',
    grammar: 'Jak masz na imię? Jak się nazywasz? Moje nazwisko to …; miło cię poznać (a fixed phrase: poznać is perfective); znam, znasz, zna; the accusative of the pronouns: cię and ciebie (you), go (him), ją (her), nas (us), ich (them), kogo (whom); jego, jej and ich (his, her, their) never change; piszę, piszesz, pisze',
    words: ['nazwisko', 'znam', 'znasz', 'zna', 'znać', 'cię', 'ciebie', 'go', 'ją', 'jego', 'jej', 'ich', 'nas', 'kogo', 'nikogo', 'miło', 'poznać', 'piszę', 'piszesz', 'pisze', 'pisać', 'kolega', 'list'] },
  { unit_id: 'U34', order: 101.5, row: 11.5, after: 'row 11', title: 'Spelling It Out', help: true, tasks: 'T02;T13',
    grammar: 'Jak to się pisze? Możesz to napisać? Możesz to przeliterować?: możesz with an infinitive (napisać and powiedzieć are perfective, used here after możesz); duża litera, mała litera; powiedz (say)',
    words: ['litera', 'litery', 'literę', 'napisać', 'przeliterować', 'powiedzieć', 'powiedz', 'zapisać'] },
  { unit_id: 'U42', order: 102, row: 12, after: 'row 11', title: 'Phone Numbers', tasks: 'T02',
    grammar: 'Numbers 0 to 20: zero, jedenaście … dwadzieścia (-naście for 11 to 19); a Polish phone number is said digit by digit or in threes; numer telefonu: telefonu is the genitive (the number of the phone); do + the genitive: zadzwoń do mnie (mnie is also the genitive of ja); dzwonię, dzwonisz, dzwoni; słyszę, słyszysz; czekam; albo and lub (or)',
    words: ['numer', 'telefonu', 'zero', 'jedenaście', 'dwanaście', 'trzynaście', 'czternaście', 'piętnaście', 'szesnaście', 'siedemnaście', 'osiemnaście', 'dziewiętnaście', 'dwadzieścia', 'dzwonię', 'dzwonisz', 'dzwoni', 'dzwonić', 'zadzwoń', 'albo', 'lub', 'halo', 'do', 'słyszę', 'słyszysz', 'słyszy', 'słyszeć', 'czekam', 'czekasz', 'czeka', 'czekać'] },
  { unit_id: 'U43', order: 103, row: 12, after: 'row 11', title: 'Age + Birthdays', tasks: 'T03',
    grammar: 'Ile masz lat? Mam dwadzieścia lat: mieć for age; rok for one year, lata after two to four (dwa lata), lat from five; urodziny is plural only (kiedy masz urodziny?); wszystkiego najlepszego! (a fixed wish, in the genitive); sto lat! (the birthday song); starszy and młodszy niż (older and younger than); prawie, dopiero, już',
    words: ['urodziny', 'wszystkiego', 'najlepszego', 'rok', 'lata', 'prawie', 'młody', 'młoda', 'starszy', 'starsza', 'młodszy', 'młodsza', 'niż', 'dopiero', 'sto', 'wiek'] },
  { unit_id: 'U35', order: 103.5, row: 12.5, after: 'row 12', title: 'Checking Numbers', help: true, tasks: 'T13',
    grammar: 'Chwileczkę. Moment. Zaraz. Zgadza się? Dokładnie. To błąd. Niech zobaczę (let me see: a fixed phrase). Na pewno? Jesteś pewien? (pewien, pewny, pewna: sure). W porządku (all right: porządku is a locative in a fixed phrase).',
    words: ['chwila', 'chwileczkę', 'moment', 'zaraz', 'dokładnie', 'zgadza', 'błąd', 'niech', 'zobaczę', 'pewno', 'pewny', 'pewna', 'pewien', 'porządku'] },
  { unit_id: 'U44', order: 104, row: 13, after: 'row 12', title: 'Numbers to 100', tasks: 'T04',
    grammar: 'Tens to 100: trzydzieści and czterdzieści (-dzieści), pięćdziesiąt to dziewięćdziesiąt (-dziesiąt), sto; 21 to 99 are two words, the ten first: dwadzieścia jeden, czterdzieści pięć; więcej and mniej (more, less): więcej niż; liczę, liczysz; kilka, wiele, tyle (a noun after them comes in the genitive, in Bottles + Bags); trzeci (third)',
    words: ['trzydzieści', 'czterdzieści', 'pięćdziesiąt', 'sześćdziesiąt', 'siedemdziesiąt', 'osiemdziesiąt', 'dziewięćdziesiąt', 'tysiąc', 'więcej', 'mniej', 'liczba', 'liczę', 'liczysz', 'liczyć', 'kilka', 'wiele', 'około', 'tyle', 'dość', 'trzeci'] },
  { unit_id: 'U45', order: 105, row: 13, after: 'row 12', title: 'Where You Live', tasks: 'T03',
    grammar: 'Brings in the locative: w and na with the locative for where something is: dom, w domu; miasto, w mieście; mieszkanie, w mieszkaniu; Warszawa, w Warszawie; praca, w pracy; wieś, na wsi; ulica, na ulicy. And the genitive after u, od and do: u rodziców (at my parents\'), daleko od domu, wracam do domu (domu is both). sam, sama (alone); razem (together); żyję, żyjesz, żyje',
    words: ['domu', 'mieście', 'mieszkaniu', 'Warszawie', 'wsi', 'pracy', 'ulicy', 'adres', 'sam', 'sama', 'razem', 'rodzice', 'rodziców', 'u', 'chłopak', 'miejsce', 'żyję', 'żyjesz', 'żyje', 'żyć', 'od', 'obok', 'gdzieś', 'codziennie', 'wracam', 'wraca', 'właśnie', 'czasami', 'czasem', 'życie'] },
  { unit_id: 'U46', order: 106, row: 14, after: 'row 13', title: 'Countries + Languages', tasks: 'T03',
    grammar: 'Skąd jesteś? Jestem z Polski: z (from) with the genitive (Polska, z Polski; Niemcy, z Niemiec); w with the locative for the country you live in (w Polsce, w Niemczech, we Francji); countries take a capital, languages do not (po polsku, angielski); po with the -sku form for in a language (po francusku, po niemiecku); pochodzę z … (I come from); uczę się polskiego: uczyć się takes the genitive (uczę alone is I teach); także, również (also); dlatego (that\'s why)',
    words: ['skąd', 'z', 'we', 'Polska', 'Polski', 'Polsce', 'Anglii', 'Niemiec', 'Niemczech', 'Francji', 'Japonii', 'Ameryka', 'kraj', 'świat', 'świecie', 'pochodzę', 'pochodzisz', 'pochodzi', 'angielski', 'francuski', 'po', 'niemiecku', 'francusku', 'japońsku', 'także', 'również', 'dlatego', 'uczę', 'uczysz', 'uczy', 'uczyć', 'polskiego', 'angielskiego', 'francuskiego'] },
  { unit_id: 'U47', order: 107, row: 14, after: 'row 13', title: 'At the Market', tasks: 'T04',
    grammar: 'Chciałbym, chciałabym … (I would like: a fixed polite form, said by a man and by a woman); poproszę kilo … (I\'ll have: a fixed phrase); kupuję, kupujesz, kupuje (I am buying), kupić after chcę, muszę, mogę; potrzebuję with the genitive (potrzebuję pomocy); dla with the genitive (dla ciebie); tego and czego, the genitive of to and co (czego szukasz?); do sklepu (genitive), w sklepie, na rynku (locative); trzeba, można (one must, one may); musi, musimy, możemy',
    words: ['rynek', 'rynku', 'kupuję', 'kupujesz', 'kupuje', 'kupić', 'owoce', 'warzywa', 'kilo', 'chciałbym', 'chciałabym', 'poproszę', 'potrzebuję', 'potrzebujesz', 'potrzebuje', 'potrzebny', 'trzeba', 'można', 'biorę', 'bierze', 'dla', 'sklepu', 'sklepie', 'jeśli', 'tego', 'czego', 'musi', 'musimy', 'możemy', 'pomocy', 'pomóc', 'zrobić', 'zakupy'] },
  { unit_id: 'U36', order: 107.5, row: 14.5, after: 'row 14', title: 'Checking You Understood', help: true, tasks: 'T13',
    grammar: 'Oczywiście. Jasne. Chyba tak. Pewnie. No tak. Czyli …? Masz rację (rację: the accusative of racja, in a fixed phrase). Mam nadzieję (I hope; the same). Po prostu. Wcale nie. Wierzę. Zgadzam się. Dzięki.',
    words: ['oczywiście', 'jasne', 'chyba', 'wiadomo', 'pewnie', 'no', 'czyli', 'rację', 'nadzieję', 'prostu', 'wcale', 'wierzę', 'wierzysz', 'wierzyć', 'dzięki', 'raczej', 'uważam', 'zgadzam'] },
  { unit_id: 'U48', order: 108, row: 15, after: 'row 14', title: 'How Much Is It?', tasks: 'T04',
    grammar: 'Ile to kosztuje? Ile kosztują? To kosztuje dziesięć złotych: jeden złoty, dwa złote (two to four), pięć złotych (five and up: the genitive plural); grosz, groszy; drogi, drogie, tani, tanie; za drogie (too dear); za and the accusative for what you pay for (dziesięć złotych za kilo); płacę, płacisz, płaci; te (these); tę (the accusative of ta); pieniędzy (the genitive of pieniądze: nie mam pieniędzy)',
    words: ['kosztują', 'cena', 'złoty', 'złote', 'złotych', 'grosz', 'groszy', 'drogi', 'drogie', 'tani', 'tanie', 'drogo', 'tanio', 'płacę', 'płacisz', 'płaci', 'płacić', 'zapłacić', 'za', 'te', 'tę', 'takie', 'pieniędzy', 'niestety', 'więc'] },
  { unit_id: 'U49', order: 109, row: 15, after: 'row 14', title: 'Bottles + Bags', tasks: 'T04',
    grammar: 'Brings in the genitive after a quantity: butelka wody, filiżanka kawy, kilo jabłek, trochę sera (woda, wody; kawa, kawy; mleko, mleka; jabłka, jabłek); after nie ma and nie mam (nie ma mleka, nie mam czasu); after bez (bez cukru); after kilka and wiele, in the plural (wiele książek); każdy, cały, wszystkie; żaden and ani go with nie',
    words: ['butelka', 'butelkę', 'butelki', 'wody', 'kawy', 'herbaty', 'mleka', 'sera', 'cukru', 'soku', 'chleba', 'kawałek', 'szklankę', 'filiżankę', 'paczka', 'torba', 'każdy', 'cały', 'cała', 'wszystkie', 'żaden', 'ani', 'bez', 'jabłek', 'książek', 'jedzenia', 'rzeczy', 'niczego', 'czas', 'czasu'] },
]

const vocab = [
  { unit_id: 'U54', order: 101.2, row: 11, after: '', title: 'Clothes',
    grammar: 'Noszę, nosisz, nosi (wear); what you wear takes the accusative: kurtka, kurtkę; spodnie, buty and okulary are plural only; piękny, piękna, piękne agree with the noun',
    words: ['spodnie', 'sukienka', 'koszula', 'kurtka', 'kurtkę', 'buty', 'okulary', 'sweter', 'rozmiar', 'noszę', 'nosisz', 'nosi', 'kapelusz', 'piękny', 'piękna', 'piękne'] },
  { unit_id: 'U55', order: 103.2, row: 12, after: 'row 11', title: 'In Class',
    grammar: 'Brings in the locative after w, na and o: szkoła, w szkole; klasa, w klasie; lekcja, na lekcji; o czym? o tym (about what? about that); do szkoły (the genitive after do); pytam, pytasz, pyta; słucham, słuchasz, słucha; rozmawiać (to talk); mówią, rozumie, wiemy, robimy',
    words: ['lekcja', 'lekcji', 'klasa', 'klasie', 'szkole', 'szkoły', 'pytam', 'pytasz', 'pyta', 'pytać', 'odpowiada', 'odpowiadać', 'odpowiedź', 'długopis', 'ołówek', 'zdanie', 'przykład', 'zadanie', 'słucham', 'słuchasz', 'słucha', 'słuchać', 'używam', 'używasz', 'używać', 'gotowy', 'gotowi', 'słownik', 'komputer', 'o', 'tym', 'czym', 'rozumie', 'mówią', 'wiemy', 'robimy', 'tekst', 'strona', 'temat', 'uniwersytet', 'gazeta', 'rozmawiać', 'rozmowa', 'historia', 'potrafię', 'potrafi', 'koniec', 'nauka'] },
  { unit_id: 'U56', order: 105.2, row: 13, after: 'row 12', title: 'What People Are Like',
    grammar: 'On jest miły, ona jest miła: the adjective agrees with the person; myślę, że … (I think that …); wygląda dobrze (looks well): wyglądać with an adverb; kocham, kochasz, kocha with the accusative',
    words: ['miły', 'miła', 'gruby', 'chudy', 'spokojny', 'cichy', 'nudny', 'ciekawy', 'ciekawa', 'mądry', 'zabawny', 'dziwny', 'dziwne', 'przystojny', 'wygląda', 'wyglądasz', 'wyglądam', 'kocham', 'kochasz', 'kocha', 'miłość', 'osoba', 'podobny', 'leniwy', 'myślę', 'myślisz', 'myśli', 'myśleć', 'głupi', 'bogaty', 'silny', 'twarz', 'serce'] },
  { unit_id: 'U57', order: 107.2, row: 14, after: 'row 13', title: 'Opposites',
    grammar: 'Otwarty, zamknięty; łatwy, trudny: with to the adjective takes its neuter -e form (to jest trudne, to jest ważne); trudno and łatwo as adverbs; lepszy, lepiej (better), najlepszy (best); to samo (the same); nadal and wciąż (still)',
    words: ['otwarty', 'otwarte', 'zamknięty', 'zamknięte', 'łatwe', 'łatwo', 'trudny', 'trudne', 'trudno', 'pełny', 'pusty', 'szybki', 'wolno', 'ciężki', 'ciemno', 'jasno', 'czysty', 'brudny', 'brudne', 'ważne', 'lepszy', 'lepiej', 'najlepszy', 'samo', 'prosty', 'proste', 'możliwe', 'niemożliwe', 'duże', 'małe', 'nowe', 'nawet', 'ostatni', 'następny', 'nadal', 'wciąż', 'długo', 'wielki', 'różne', 'większy', 'prawdziwy', 'zupełnie'] },
  { unit_id: 'U58', order: 109.2, row: 15, after: 'row 14', title: 'Outdoors',
    grammar: 'Brings in the locative for outdoor places: las, w lesie; plaża, na plaży; góry, w górach; przez with the accusative (przez park); widzę, widzisz, widzi; chodzę (I walk, I go regularly) beside idę (I am going now); siedzę, stoję',
    words: ['morze', 'las', 'lesie', 'góra', 'góry', 'górach', 'jezioro', 'rzeka', 'drzewo', 'drzewa', 'kwiaty', 'słońce', 'niebo', 'plaża', 'plaży', 'ptaki', 'siedzę', 'siedzisz', 'siedzi', 'siedzieć', 'stoję', 'stoi', 'stać', 'chodzę', 'chodzisz', 'chodzi', 'chodzić', 'przez', 'spacer', 'widzę', 'widzisz', 'widzi', 'widzieć', 'zimno', 'droga', 'ziemia', 'dalej', 'światło'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Polish mobile numbers have nine digits, said here digit by digit in threes; prices in złoty (złote after 2 to
// 4, złotych from 5).
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const items = {
  a1_listen: [
    ['N101', 'U42', 'number', 'piętnaście', '15'], ['N102', 'U42', 'number', 'siedemnaście', '17'], ['N103', 'U42', 'phone', 'sześć zero jeden, dwa trzy cztery, pięć sześć siedem', '601 234 567'],
    ['N104', 'U42', 'phone', 'pięć zero dwa, osiem dziewięć zero, jeden trzy sześć', '502 890 136'],
    ['N105', 'U43', 'number', 'Mam dwadzieścia lat.', '20'], ['N106', 'U43', 'number', 'Ona ma osiemnaście lat.', '18'],
    ['N107', 'U44', 'number', 'siedemdziesiąt', '70'], ['N108', 'U44', 'number', 'dziewięćdziesiąt', '90'], ['N109', 'U44', 'number', 'czterdzieści pięć', '45'], ['N110', 'U44', 'number', 'dziewięćdziesiąt dziewięć', '99'],
    ['N111', 'U48', 'price', 'trzydzieści złotych', '30'], ['N112', 'U48', 'price', 'dziesięć złotych', '10'], ['N113', 'U48', 'price', 'sto złotych', '100'], ['N114', 'U48', 'price', 'pięćdziesiąt złotych', '50'],
  ].map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F101', unit_id: 'U45', card: 'Nazywam się Piotr Nowak. Mam czterdzieści lat. Mieszkam w Warszawie. Mój adres to ulica Zielona dziesięć.',
      fields: [{ key: 'first', label: 'Imię', rule: 'text', answer: 'Piotr' }, { key: 'last', label: 'Nazwisko', rule: 'text', answer: 'Nowak' }, { key: 'age', label: 'Wiek', rule: 'number', answer: '40' },
        { key: 'address', label: 'Adres', rule: 'text', answer: 'ulica Zielona 10', also: ['Zielona 10', 'ul. Zielona 10', 'Ulica Zielona 10', 'ulica Zielona dziesięć', 'zielona 10'] }, { key: 'town', label: 'Miasto', rule: 'text', answer: 'Warszawa', also: ['warszawa'] }] },
    { id: 'F102', unit_id: 'U46', card: 'Nazywam się Anna Kowalska. Mam trzydzieści lat. Jestem z Polski. Mieszkam we Francji. Mój numer telefonu to sześć zero jeden, dwa trzy cztery, pięć sześć siedem.',
      fields: [{ key: 'first', label: 'Imię', rule: 'text', answer: 'Anna' }, { key: 'last', label: 'Nazwisko', rule: 'text', answer: 'Kowalska' }, { key: 'age', label: 'Wiek', rule: 'number', answer: '30' },
        { key: 'nat', label: 'Narodowość', rule: 'text', answer: 'polska', also: ['Polska', 'Polka', 'polka', 'polskie'] }, { key: 'country', label: 'Kraj', rule: 'text', answer: 'Francja', also: ['francja'] },
        { key: 'tel', label: 'Telefon', rule: 'phone', answer: '601 234 567' }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: [
    text('R101', 'U47', 'sign', 'Na rynku', ['Owoce i warzywa', 'Jabłka: pięć złotych za kilo', 'Rynek: poniedziałek i sobota'],
      [q('How much is a kilo of apples?', ['5 złotych', '15 złotych', '50 złotych']), q('When is the market on?', ['Monday and Saturday', 'Every day', 'Only on Sunday'])]),
    text('R102', 'U47', 'notice', 'Rynek w mieście', ['Rynek w mieście', 'Sobota i niedziela', 'Owoce, warzywa, chleb i ser'],
      [q('When is the market?', ['On Saturday and Sunday', 'On Monday', 'Every day']), q('What can you buy there?', ['Fruit, vegetables, bread and cheese', 'Clothes and shoes', 'Books and maps'])]),
    text('R103', 'U47', 'message', 'Anna pisze', ['Piotr!', 'Jestem na rynku. Kupuję owoce i warzywa.', 'Chcesz jabłko?', 'Anna'],
      [q('Where is Anna?', ['At the market', 'At school', 'In the park']), q('What does she offer Piotr?', ['An apple', 'A coffee', 'Some bread'])]),
    text('R104', 'U48', 'menu', 'Ceny', ['Chleb: pięć złotych', 'Ser: dwadzieścia złotych', 'Mleko: cztery złote', 'Woda: dwa złote'],
      [q('How much is the cheese?', ['5 złotych', '20 złotych', '4 złote'], 1), q('What costs 5 złotych?', ['The bread', 'The milk', 'The water'])]),
    text('R105', 'U48', 'menu', 'Kawa i herbata', ['Kawa: dwanaście złotych', 'Herbata: dziesięć złotych', 'Lody: piętnaście złotych'],
      [q('How much is a tea?', ['10 złotych', '12 złotych', '15 złotych']), q('What costs the most?', ['The ice cream', 'The coffee', 'The tea'])]),
    text('R106', 'U48', 'notice', 'Stare książki', ['Stare książki', 'Jedna książka: dziesięć złotych', 'Trzy książki: dwadzieścia złotych'],
      [q('How much is one book?', ['10 złotych', '20 złotych', '30 złotych']), q('How much are three books?', ['20 złotych', '30 złotych', '10 złotych'])]),
    text('R107', 'U49', 'message', 'Maria pisze', ['Piotr!', 'Możesz kupić butelkę mleka, trochę sera i kilo jabłek?', 'Dziękuję!', 'Maria'],
      [q('What does Maria want?', ['Milk, cheese and apples', 'Bread and water', 'Fruit and vegetables']), q('How much milk?', ['One bottle', 'Two bottles', 'A kilo'])]),
    text('R108', 'U49', 'sign', 'W sklepie', ['Woda: dwie butelki, pięć złotych', 'Kawa: kilo, czterdzieści złotych'],
      [q('How much are two bottles of water?', ['5 złotych', '4 złote', '40 złotych']), q('What costs 40 złotych?', ['A kilo of coffee', 'Two bottles of water', 'A bottle of juice'])]),
    text('R109', 'U49', 'message', 'Na urodziny', ['Na urodziny:', 'dwie butelki soku,', 'trochę sera,', 'kilo jabłek!'],
      [q('How many bottles of juice?', ['Two', 'One', 'Three']), q('What is the list for?', ['A birthday', 'School', 'A trip'])]),
  ].map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P101', unit_id: 'U45', prompt: 'Write a short message to a new friend: your name, how old you are and where you live.', points: 'your name;your age;where you live', min_words: 15, max_words: 30 },
    { id: 'P102', unit_id: 'U46', prompt: 'Write a short postcard about yourself: where you are from, where you live and which languages you speak.', points: 'where you are from;where you live;your languages', min_words: 20, max_words: 35 },
    { id: 'P103', unit_id: 'U49', prompt: 'Write a short message to a friend: what to buy at the market, and how much of each.', points: 'two or three things;how much of each', min_words: 15, max_words: 30 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

// "I can" statements, on the CEFR self-assessment grid's A1 rows (as Danish, Swedish and Dutch Part 2).
const canDo = {
  U41: [['speaking', 'Spoken interaction', 'I can say my name and ask someone theirs.']],
  U34: [['speaking', 'Spoken interaction', 'I can ask how a word or a name is spelled, and spell my own.']],
  U42: [['listening', 'Listening', 'I can understand a phone number said slowly.'], ['speaking', 'Spoken production', 'I can give my phone number.']],
  U43: [['speaking', 'Spoken interaction', 'I can ask and say how old someone is.']],
  U35: [['speaking', 'Spoken interaction', 'I can ask someone to repeat a number and check that I have it right.']],
  U44: [['listening', 'Listening', 'I can understand numbers up to 100 said slowly.']],
  U45: [['writing', 'Writing', 'I can write where I live: my street, my town, my country.'], ['speaking', 'Spoken production', 'I can say where I live.']],
  U46: [['reading', 'Reading', 'I can understand which country someone comes from and which languages they speak.']],
  U47: [['speaking', 'Spoken interaction', 'I can ask for things at a market and say how much I want.']],
  U36: [['speaking', 'Spoken interaction', 'I can say that I have understood, or check that I have.']],
  U48: [['listening', 'Listening', 'I can understand prices.'], ['speaking', 'Spoken interaction', 'I can ask how much something costs.']],
  U49: [['reading', 'Reading', 'I can understand quantities on a shopping list.']],
  U54: [['speaking', 'Spoken production', 'I can say what someone is wearing.']],
  U55: [['reading', 'Reading', 'I can understand everyday words for the classroom.']],
  U56: [['speaking', 'Spoken production', 'I can say what someone is like: kind, funny, quiet, clever.']],
  U57: [['reading', 'Reading', 'I can understand simple descriptions: easy or hard, open or closed, clean or dirty.']],
  U58: [['reading', 'Reading', 'I can recognise everyday words for the countryside and the outdoors.']],
}

// Turned off in the gather (ids kept): too few checked lines this early, not on the core list, and a twin form or the
// circle carries the meaning.
const thin = 'turned off in the gather: too few lines this early, not on the core list; its twin or its circle carries it'
const off = Object.fromEntries([].map((f) => [f, thin]))
off['około'] = 'turned off in the gather: około takes the genitive of a number (około czterdziestu), forms the course does not teach yet, so no line can use it'
const late = []

export default {
  part: 2, off, late, wordBase: 1501, wordSpan: 300, vocabBase: 1101, cdBase: 301,
  slots: [{ slot_id: 'C03', part: 2, after_row: 12 }, { slot_id: 'C04', part: 2, after_row: 14 }],
  situation, vocab, items, canDo,
}
