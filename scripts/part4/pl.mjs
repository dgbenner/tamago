// Polish A1 · Part 4, Out and About (Dan, 2026-11-21; Builder 2, branch content/pl-a1), the last part, in the format of
// Swedish, Danish and Dutch Part 4: the café and the restaurant (T07), asking the way and getting around (T08), family,
// home and work (T06), forms (T10) and messages (T11); the help thread ends (T13). Standard Polish, ty throughout: pan and
// pani are taught only as a man and a woman spoken about (ten pan, ta pani), never as the formal you, so lines that
// address someone as pan or pani are cut in review. Prices in złoty (dwanaście złotych), times as Part 3 says them.
// The dative comes in gradually, pronouns only: U26 Excuse Me brings mi and ci (możesz mi pomóc?, mogę ci pomóc?), U82
// uses them with smakować (smakuje ci?), U85 My Family adds mu and nam (kupię mu prezent, daj nam chwilę); jej, taught in
// Part 2 as her, carries the dative her too (daj jej książkę). Dative nouns (mamie, bratu) stay out.
// The perfective future comes in at U84 Getting Around (pojadę, pójdę, wrócę, przyjdę), then U85 (kupię, dam) and U89
// (napiszę, zadzwonię, zrobię); Part 3 already had przyjedzie and odjedzie as single words in announcements.
// Dates stay out: a Polish date (piątego marca) needs the genitive ordinal and the genitive of all twelve months, each
// a new word with three lines of its own and almost none on Tatoeba without digits; forms take the date of birth in
// digits (data urodzenia: 10.04.1990), and urodziłem się, urodziłam się carry the past.
// Words: the Polish Kelly list's core 600 (content-pl/a1-list.json) is the target, about 90% by the end of this part. The
// situation circles carry the list words that fit them (prosto, środku, tyłu, bliski, zespół, stanowisko, obowiązek,
// kontakt, dokument, pan, pani), and the five vocabulary circles the rest, as Swedish and Danish did: Ideas + Things,
// Describing Words, Doing + Getting, Thinking + Saying, Society + News. Verbs come in natural present, past or
// infinitive forms, which count for their infinitives.
// Ids: Part 3 holds W1801 to W2074 (situation) and W2101 to W2255 (vocabulary), so Part 4 takes W2401 to W2700
// (situation, span 300) and W2701 to W3000 (vocabulary, span 300).
// Names stay nominative only (Toma, Tomem, Tomowi would open many lines; a decision for Dan).
// Used by scripts/add-part.mjs (COURSE=pl PART=4).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U81', order: 121, row: 21, after: '', title: 'At the Café', tasks: 'T07',
    grammar: 'Poproszę kawę (the accusative after poproszę); kawa z mlekiem (z and the instrumental); kawałek ciasta (the genitive after kawałek); rachunek, proszę (the bill); coś do picia (something to drink)',
    words: ['kawiarnia', 'kawiarni', 'kelner', 'kelnerka', 'ciasto', 'ciasta', 'cukier', 'cukrem', 'mlekiem', 'sok', 'piwo', 'piwa', 'wino', 'napój', 'kanapkę', 'kanapki', 'rachunek', 'zamówić', 'zamawiam', 'pić', 'picia', 'napić'] },
  { unit_id: 'U26', order: 121.5, row: 21.5, after: 'row 21', title: 'Excuse Me', help: true, tasks: 'T13',
    grammar: 'Brings in the dative of ja and ty: mi (to me), ci (to you): możesz mi pomóc? (pomóc takes the dative), mogę ci pomóc?; przepraszam, że przeszkadzam (sorry to bother you); nie ma za co (you are welcome); nie ma problemu',
    words: ['mi', 'ci', 'przeszkadzam', 'przeszkadzać', 'nie ma za co', 'problemu', 'pomoc', 'chwilę', 'sobie'] },
  { unit_id: 'U82', order: 122, row: 22, after: 'row 21', title: 'At the Restaurant', tasks: 'T07;T09',
    grammar: 'Zupa, danie, deser: the courses; smakuje ci? (do you like the taste? smakować takes the dative); smacznego! (enjoy your meal); nie jem mięsa (the genitive after nie); ten stolik jest wolny?',
    words: ['zupa', 'zupę', 'mięso', 'mięsa', 'kurczaka', 'ryż', 'ziemniaki', 'sałatka', 'deser', 'danie', 'jedzenie', 'smacznego', 'smakuje', 'smaczne', 'pyszne', 'talerz', 'nóż', 'widelec', 'łyżka', 'stolik', 'menu', 'zjeść', 'jajka', 'pizzę'] },
  { unit_id: 'U83', order: 123, row: 22, after: 'row 21', title: 'Asking the Way', tasks: 'T08',
    grammar: 'W prawo, w lewo, prosto: directions; skręć w lewo na rogu (skręć: the command); idź prosto przez skrzyżowanie (przez and the accusative); sto metrów (the genitive plural); w środku, z tyłu (inside, at the back)',
    words: ['w prawo', 'w lewo', 'prosto', 'skręć', 'skręcić', 'rogu', 'róg', 'skrzyżowanie', 'skrzyżowania', 'most', 'metrów', 'drogę', 'drodze', 'centrum', 'idź', 'środku', 'tyłu', 'koło', 'niedaleko'] },
  { unit_id: 'U27', order: 123.5, row: 22.5, after: 'row 22', title: "I'm Lost", help: true, tasks: 'T13;T08',
    grammar: 'Zgubiłem się, zgubiłam się (I am lost: the past, -łem said by a man, -łam by a woman); możesz mi pokazać na mapie? (na and the locative); tędy (this way)',
    words: ['zgubiłem', 'zgubiłam', 'zgubić', 'mapa', 'mapę', 'mapie', 'tędy', 'zgubił'] },
  { unit_id: 'U84', order: 124, row: 23, after: 'row 22', title: 'Getting Around', tasks: 'T08',
    grammar: 'Brings in the perfective future: pojadę (I will go, by transport), pójdę (I will go, on foot), wrócę, przyjdę: the same endings as the present (-ę, -esz, -e); jadę metrem, taksówką (the instrumental); pieszo (on foot); wysiadam przy dworcu (przy and the locative)',
    words: ['metro', 'metrem', 'taksówką', 'pieszo', 'wysiadam', 'wysiąść', 'wsiadam', 'pojadę', 'pojedziemy', 'pojedziesz', 'pójdę', 'pójdzie', 'pójdziemy', 'wrócę', 'wróci', 'przyjdę', 'przyjdzie', 'kierowca', 'jeżdżę', 'jeździć', 'prawo jazdy'] },
  { unit_id: 'U85', order: 125, row: 23, after: 'row 22', title: 'My Family', tasks: 'T06',
    grammar: 'Babcia, dziadek, wujek, ciocia: the wider family; mu (to him) and nam (to us), the dative: kupię mu prezent (kupię: I will buy, the perfective future), daj nam chwilę; jestem żonaty (said by a man), jestem mężatką (by a woman)',
    words: ['babcia', 'babci', 'dziadek', 'dziadka', 'dziadkowie', 'wujek', 'ciocia', 'kuzyn', 'kuzynka', 'wnuk', 'rodzeństwo', 'żonaty', 'mężatką', 'ślub', 'prezent', 'mu', 'nam', 'kupię', 'dam', 'bliski', 'syna', 'córkę'] },
  { unit_id: 'U86', order: 126, row: 24, after: 'row 23', title: 'At Home', tasks: 'T06',
    grammar: 'W pokoju, w kuchni, w łazience (the locative); na piętrze (upstairs: on the upper floor); mam klucz, mam klucze; wynajmuję mieszkanie (I rent a flat)',
    words: ['pokoju', 'kuchni', 'łazienka', 'łazience', 'sypialnia', 'salon', 'salonie', 'piętro', 'piętrze', 'schody', 'klucz', 'klucze', 'ściana', 'podłoga', 'dach', 'krzesło', 'szafa', 'lampa', 'lodówka', 'lodówce', 'balkon', 'wynajmuję', 'sprzątam', 'ogrodzie'] },
  { unit_id: 'U87', order: 127, row: 24, after: 'row 23', title: 'At Work', tasks: 'T06',
    grammar: 'Pracuję w biurze (the locative); mój szef, moja koleżanka; pracować (to work) after muszę, chcę; ten pan, ta pani (a man, a woman, spoken about); zespół (a team), stanowisko (a post)',
    words: ['biuro', 'biurze', 'szef', 'koleżanka', 'firma', 'pracownik', 'zawód', 'kucharz', 'pielęgniarka', 'pielęgniarką', 'sprzedawca', 'klient', 'pensja', 'pracować', 'zespół', 'stanowisko', 'obowiązek', 'kontakt', 'pan', 'pani', 'kierownik'] },
  { unit_id: 'U28', order: 127.5, row: 24.5, after: 'row 24', title: 'Explaining a Problem', help: true, tasks: 'T13',
    grammar: 'Co się stało? Co się dzieje? (what happened? what is going on?); to jest zepsute; telefon nie działa; miałem wypadek; pomocy! (help!); wezwij pogotowie (call an ambulance)',
    words: ['stało', 'dzieje', 'zepsuty', 'zepsute', 'zepsuł', 'wypadek', 'pogotowie', 'pożar', 'niebezpieczny', 'kłopot', 'kłopoty', 'ukradł', 'bądź'] },
  { unit_id: 'U88', order: 128, row: 25, after: 'row 24', title: 'Filling In Forms', tasks: 'T10',
    grammar: 'Imię, nazwisko, adres, data urodzenia: the words on a form (urodzenia: the genitive of urodzenie); wypełnij formularz; podpisz tutaj (sign here); urodziłem się w Polsce (I was born: -łem said by a man, -łam by a woman)',
    words: ['formularz', 'wypełnić', 'wypełnij', 'podpis', 'podpisz', 'urodzenia', 'urodziłem', 'urodziłam', 'urodził', 'urodziła', 'płeć', 'obywatelstwo', 'kod', 'pocztowy', 'dokument', 'dokumenty', 'dowód', 'stan', 'cywilny', 'e-mail'] },
  { unit_id: 'U89', order: 129, row: 25, after: 'row 24', title: 'Messages + Postcards', tasks: 'T11',
    grammar: 'Cześć Anna! Kochany! Kochana!: how a message starts; pozdrawiam, pozdrowienia, całuję: ways to end; napiszę, zadzwonię (the perfective future: I will write, I will call); do zobaczenia (see you); tęsknię za tobą (za and the instrumental)',
    words: ['kochany', 'kochana', 'pozdrawiam', 'pozdrowienia', 'całuję', 'wiadomość', 'wiadomości', 'pocztówka', 'pocztówkę', 'napiszę', 'zadzwonię', 'zrobię', 'wyślij', 'wysłać', 'wkrótce', 'tęsknię', 'do zobaczenia', 'kiedyś', 'zdjęcie', 'zdjęcia'] },
]

const vocab = [
  { unit_id: 'U91', order: 121.2, row: 21, after: '', title: 'Ideas + Things',
    grammar: 'Zasada, zmiana, szansa, rozwiązanie: everyday abstract nouns; nie ma zmian (the genitive after nie ma); nie jestem w stanie (I am not able to)',
    words: ['zasada', 'zasady', 'system', 'zmiana', 'zmiany', 'formie', 'stanie', 'punkt', 'poziom', 'opinia', 'typ', 'typu', 'rozwiązanie', 'szansa', 'szansę', 'szans', 'sukces', 'koszt', 'brak', 'wpływ', 'przyczyna', 'zachowanie', 'charakter', 'wiedza', 'wartość', 'ilość', 'większość', 'materiał', 'źródło', 'metoda', 'proces', 'program', 'element', 'rola', 'siła', 'okres', 'ruch', 'grupa'] },
  { unit_id: 'U92', order: 123.2, row: 22, after: 'row 21', title: 'Describing Words',
    grammar: 'Główny, wspólny, jedyny, ogromny: adjectives agree with their noun (ogromny dom, ogromne miasto); mam z nim wiele wspólnego (in common)',
    words: ['główny', 'publiczny', 'częsty', 'daleki', 'ludzki', 'obecny', 'wspólnego', 'wspólny', 'jedyny', 'jedynym', 'podstawowy', 'naukowy', 'ogromny', 'ogromne', 'specjalny', 'specjalnego', 'odpowiedni', 'dalszy', 'narodowy', 'międzynarodowy', 'światowy', 'amerykański', 'zawodowy', 'związany'] },
  { unit_id: 'U93', order: 125.2, row: 23, after: 'row 22', title: 'Doing + Getting',
    grammar: 'Do kogo należy ten parasol? (należeć do: to belong to); to wymaga czasu (wymagać takes the genitive); miłość istnieje; everyday verbs side by side, in the present, the past and after mogę, muszę, chcę',
    words: ['należy', 'należą', 'istnieje', 'istnieć', 'wymaga', 'wykonać', 'wykonuje', 'przyjąć', 'uznać', 'pozostać', 'powstać', 'zawiera', 'otrzymać', 'osiągnąć', 'stworzyć', 'zdjąć', 'zdjął', 'przekonać', 'przekonał', 'przedstawić', 'wprowadzić', 'traktować', 'badać', 'leczyć', 'leczy', 'bronić', 'służy', 'rozpocząć', 'wykorzystać', 'pozwalać', 'polegać', 'opowiadać', 'zdać', 'wydać', 'podjąć', 'stanąć', 'wiedzieć', 'zobaczyć', 'porozmawiać', 'dostać'] },
  { unit_id: 'U94', order: 127.2, row: 24, after: 'row 23', title: 'Thinking + Saying',
    grammar: 'Oraz, lecz, natomiast, choć: linking words; według mnie (in my opinion: według and the genitive); w ogóle (at all); szczególnie, głównie, znacznie (adverbs); by (in order to, as żeby)',
    words: ['oraz', 'natomiast', 'choć', 'lecz', 'zresztą', 'zwłaszcza', 'szczególnie', 'głównie', 'wreszcie', 'jednocześnie', 'znacznie', 'według', 'wobec', 'wówczas', 'jedynie', 'zarówno', 'ogóle', 'wszelki', 'by', 'ono', 'czemu', 'całkiem', 'ciągle', 'bardziej'] },
  { unit_id: 'U95', order: 129.2, row: 25, after: 'row 24', title: 'Society + News',
    grammar: 'Społeczeństwo, naród, wolność, bezpieczeństwo: the words of the news; bezpieczeństwo jest ważne; dziękuję za współpracę (za and the accusative)',
    words: ['społeczeństwo', 'naród', 'organizacja', 'związek', 'wolność', 'bezpieczeństwo', 'ochrona', 'współpraca', 'interes', 'produkcja', 'budowa', 'sieć', 'tytuł', 'umowa', 'służba', 'akcja', 'kwestia', 'wiara', 'duch', 'bóg', 'ciało', 'środowisko', 'badanie', 'rozwój', 'warunek', 'udział', 'wzrost', 'milion'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Prices in złoty (złote after two to four, złotych after five and up), times as in Part 3, phone numbers said
// digit by digit in threes as Part 2 did. No dates (see above).
const listen = [
  ['N301', 'U81', 'price', 'Kawa kosztuje dwanaście złotych.', '12'], ['N302', 'U81', 'price', 'Ciasto kosztuje piętnaście złotych.', '15'],
  ['N303', 'U82', 'price', 'Zupa kosztuje dwadzieścia złotych.', '20'], ['N304', 'U82', 'price', 'Rachunek to osiemdziesiąt pięć złotych.', '85'],
  ['N305', 'U83', 'number', 'Apteka jest sto metrów stąd.', '100'], ['N306', 'U83', 'number', 'Idź prosto pięćdziesiąt metrów.', '50'],
  ['N307', 'U84', 'number', 'Jadę autobusem numer dwanaście.', '12'], ['N308', 'U84', 'time', 'Pojadę pociągiem o wpół do ósmej.', '7:30'],
  ['N309', 'U86', 'number', 'Mieszkam w mieszkaniu numer osiem.', '8'], ['N310', 'U87', 'time', 'Spotkanie jest o dziesiątej.', '10:00'],
  ['N311', 'U88', 'phone', 'Mój numer to pięć zero jeden, dwa trzy cztery, pięć sześć siedem.', '501 234 567'], ['N312', 'U89', 'time', 'Zadzwonię jutro o szóstej.', '6:00'],
]
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const texts = [
  text('R301', 'U82', 'menu', 'Obiad dnia', ['Zupa i sałatka', 'Ryż i ziemniaki', 'Deser: lody', '35 zł'],
    [q('How much is the lunch of the day?', ['35 złoty', '25 złoty', '53 złoty']), q('What is there for dessert?', ['Ice cream', 'Cake', 'Fruit'])]),
  text('R302', 'U81', 'menu', 'Kawiarnia', ['Kawa: 12 zł', 'Herbata: 9 zł', 'Ciasto: 15 zł', 'Kanapki: 14 zł'],
    [q('How much are the sandwiches?', ['14 złoty', '12 złoty', '15 złoty']), q('What costs 9 złoty?', ['A tea', 'A coffee', 'A piece of cake'])]),
  text('R303', 'U82', 'notice', 'Restauracja Ryba', ['Ryby i mięso', 'Otwarte: wtorek – niedziela', 'Poniedziałek: zamknięte'],
    [q('When is the restaurant closed?', ['On Mondays', 'On Sundays', 'On Tuesdays']), q('What does the restaurant serve?', ['Fish and meat', 'Pizza', 'Only salads'])]),
  text('R304', 'U83', 'message', 'Wiadomość od Anny', ['Mój dom jest blisko rynku.', 'Idź prosto do rogu.', 'Moja ulica jest druga w prawo.'],
    [q('Where is Anna\'s house?', ['Near the market square', 'Near the school', 'In the city centre']), q('Which street is hers?', ['The second on the right', 'The first on the left', 'The second on the left'])]),
  text('R305', 'U83', 'sign', 'W mieście', ['Muzeum: 200 m w lewo', 'Kościół: prosto', 'Dworzec: w prawo'],
    [q('Where is the museum?', ['200 metres on the left', '200 metres on the right', 'Straight on']), q('Where is the station?', ['On the right', 'On the left', 'Straight on'])]),
  text('R306', 'U84', 'notice', 'Hotel', ['Hotel jest w centrum.', 'Dworzec: dziesięć minut pieszo.', 'Przystanek jest przed hotelem.'],
    [q('How far is the station?', ['Ten minutes on foot', 'Ten minutes by car', 'Half an hour on foot']), q('Where is the bus stop?', ['In front of the hotel', 'Behind the hotel', 'At the station'])]),
  text('R307', 'U86', 'notice', 'Mieszkanie', ['Mieszkanie w centrum', 'Sypialnia, salon, kuchnia i łazienka', 'Mieszkanie ma balkon.', '2500 zł'],
    [q('Where is the flat?', ['In the centre', 'Near the sea', 'In the country']), q('What else does it have?', ['A balcony', 'A garden', 'A garage'])]),
  text('R308', 'U86', 'message', 'Wiadomość od Marii', ['Moje nowe mieszkanie jest małe.', 'Jest tam sypialnia, salon i kuchnia.', 'Łazienka jest bardzo mała.'],
    [q('What is Maria\'s new flat like?', ['Small', 'Big', 'Old']), q('What is very small?', ['The bathroom', 'The kitchen', 'The bedroom'])]),
  text('R309', 'U86', 'notice', 'Pokój dla studenta', ['Pokój dla studenta', 'Łóżko, stół, krzesło i szafa', 'Uniwersytet jest blisko.'],
    [q('Who is the room for?', ['A student', 'A family', 'A tourist']), q('What is in the room?', ['A bed, a table, a chair and a wardrobe', 'A sofa and a lamp', 'A fridge'])]),
  text('R310', 'U87', 'notice', 'Praca', ['Praca: kucharz', 'Wtorek – sobota, 17:00 – 23:00', 'Tel. 501 234 567'],
    [q('What job is it?', ['A cook', 'A waiter', 'A driver']), q('Which days?', ['Tuesday to Saturday', 'Monday to Friday', 'Every day'])]),
  text('R311', 'U87', 'message', 'Moja praca', ['Jestem pielęgniarką i pracuję w szpitalu.', 'Zaczynam pracę o siódmej rano.', 'Mój szef jest bardzo miły.'],
    [q('Where does she work?', ['In a hospital', 'In a school', 'In a shop']), q('When does she start?', ['At seven in the morning', 'At seven in the evening', 'At nine'])]),
  text('R312', 'U87', 'notice', 'Firma', ['Praca: kierowca', 'Prawo jazdy: tak', 'Poniedziałek – piątek'],
    [q('Who is the company looking for?', ['A driver', 'A secretary', 'A teacher']), q('What do you need?', ['A driving licence', 'A university degree', 'A car'])]),
  text('R313', 'U89', 'message', 'Pocztówka od Anny', ['Cześć!', 'Jestem z rodziną na plaży. Jest ciepło i morze jest piękne.', 'Całuję, Anna'],
    [q('Where is Anna?', ['At the seaside', 'In the mountains', 'In the city']), q('What is the weather like?', ['Warm', 'Cold', 'Rainy'])]),
  text('R314', 'U89', 'message', 'Wiadomość od Toma', ['Cześć Maria!', 'W sobotę mam urodziny. Chcesz przyjść?', 'Spotykamy się u mnie o ósmej.', 'Tom'],
    [q('Why is Tom having a party?', ['It\'s his birthday', 'He has a new job', 'It\'s Christmas']), q('Where is the party?', ['At his home', 'At a restaurant', 'In the park'])]),
  text('R315', 'U89', 'message', 'Kartka', ['Anna!', 'Nie ma mnie w domu. Wrócę o szóstej.', 'Jedzenie jest w lodówce.', 'Marek'],
    [q('When is Marek back?', ['At six', 'At eight', 'At five']), q('Where is the food?', ['In the fridge', 'At a restaurant', 'In the oven'])]),
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F301', unit_id: 'U88', card: 'Nazywam się Anna Kowalska. Jestem Polką. Urodziłam się w Polsce. Data urodzenia: 10.04.1990. Mieszkam w Warszawie. Jestem mężatką.',
      fields: [{ key: 'name', label: 'Imię i nazwisko', rule: 'text', answer: 'Anna Kowalska' }, { key: 'nat', label: 'Obywatelstwo', rule: 'text', answer: 'polskie', also: ['Polskie', 'Polka', 'polka', 'Polska', 'polska', 'polskie obywatelstwo'] },
        { key: 'born', label: 'Data urodzenia', rule: 'text', answer: '10.04.1990', also: ['10/04/1990', '10-04-1990', '10.4.1990', '1990-04-10', '10 04 1990'] }, { key: 'place', label: 'Miejsce urodzenia', rule: 'text', answer: 'Polska', also: ['polska', 'Polsce', 'w Polsce'] },
        { key: 'civil', label: 'Stan cywilny', rule: 'text', answer: 'mężatka', also: ['Mężatka', 'zamężna', 'Zamężna'] }, { key: 'town', label: 'Miejscowość', rule: 'text', answer: 'Warszawa', also: ['warszawa'] }] },
    { id: 'F302', unit_id: 'U87', card: 'Nazywam się Piotr Nowak. Mam trzydzieści lat. Mój zawód: kucharz. Pracuję w Warszawie. Nie jestem żonaty.',
      fields: [{ key: 'name', label: 'Imię', rule: 'text', answer: 'Piotr' }, { key: 'last', label: 'Nazwisko', rule: 'text', answer: 'Nowak' }, { key: 'age', label: 'Wiek', rule: 'number', answer: '30' },
        { key: 'job', label: 'Zawód', rule: 'text', answer: 'kucharz', also: ['Kucharz', 'kucharzem'] }, { key: 'civil', label: 'Stan cywilny', rule: 'text', answer: 'kawaler', also: ['Kawaler', 'nieżonaty', 'nie jest żonaty', 'wolny'] }] },
    { id: 'F303', unit_id: 'U81', card: 'Tom chce kawę i kawałek ciasta. Maria chce herbatę. Rachunek: trzydzieści sześć złotych.',
      fields: [{ key: 'tom', label: 'Tom', rule: 'text', answer: 'kawa i ciasto', also: ['kawę i kawałek ciasta', 'kawa, ciasto', 'kawę i ciasto', 'kawa i kawałek ciasta'] },
        { key: 'maria', label: 'Maria', rule: 'text', answer: 'herbata', also: ['herbatę', 'Herbata', 'Herbatę'] }, { key: 'total', label: 'Razem (złote)', rule: 'number', answer: '36' }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: texts.map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P301', unit_id: 'U85', prompt: 'Write a few lines about your family: who they are and what they are like.', points: 'who is in your family;what they are like', min_words: 20, max_words: 35 },
    { id: 'P302', unit_id: 'U86', prompt: 'Write a short message about your home: where it is and which rooms it has.', points: 'where it is;which rooms it has', min_words: 20, max_words: 35 },
    { id: 'P303', unit_id: 'U89', prompt: 'Write a postcard to a friend from a trip: where you are, the weather and what you do.', points: 'where you are;the weather;what you do', min_words: 20, max_words: 35 },
    { id: 'P304', unit_id: 'U89', prompt: 'Write back to a friend who invited you to a party: say thank you, say if you can come, and ask one question.', points: 'thank you;if you can come;one question', min_words: 20, max_words: 35 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

const canDo = {
  U81: [['speaking', 'Spoken interaction', 'I can order a drink and something to eat at a café, and pay.']],
  U26: [['speaking', 'Spoken interaction', 'I can get someone\'s attention politely and ask for help.']],
  U82: [['reading', 'Reading', 'I can understand a simple menu and its prices.'], ['speaking', 'Spoken interaction', 'I can order a meal in a restaurant.']],
  U83: [['listening', 'Listening', 'I can follow simple directions: left, right, straight on.'], ['speaking', 'Spoken interaction', 'I can ask the way to a place.']],
  U27: [['speaking', 'Spoken interaction', 'I can say I am lost and ask someone to show me the way.']],
  U84: [['speaking', 'Spoken production', 'I can say how I get around and where I will go: by bus, by metro, on foot.']],
  U85: [['speaking', 'Spoken production', 'I can talk about my family in simple words.']],
  U86: [['reading', 'Reading', 'I can understand a short ad for a flat or a room.'], ['speaking', 'Spoken production', 'I can describe my home: its rooms and its things.']],
  U87: [['speaking', 'Spoken production', 'I can say what I do for work and where.']],
  U28: [['speaking', 'Spoken interaction', 'I can say that something doesn\'t work or that something is wrong.']],
  U88: [['writing', 'Writing', 'I can fill in a form with my personal details.']],
  U89: [['writing', 'Writing', 'I can write a short postcard or message.'], ['reading', 'Reading', 'I can understand a short personal message or postcard.']],
  U91: [['reading', 'Reading', 'I can recognize everyday words for ideas and things: a rule, a change, a chance, a solution.']],
  U92: [['reading', 'Reading', 'I can recognize common describing words: main, common, only, huge, special.']],
  U93: [['speaking', 'Spoken production', 'I can say what belongs to whom and what something needs, with everyday verbs.']],
  U94: [['speaking', 'Spoken interaction', 'I can link simple ideas with words like and, but, although and especially.']],
  U95: [['reading', 'Reading', 'I can recognize the words of a simple news item: society, freedom, safety, work together.']],
}

// Turned off after the pull (ids kept): forms Tatoeba has no or one line for, whose twin in the same circle carries the
// word, so the drafts go to the words that matter.
const TWIN = (w) => `turned off after the pull: under three Tatoeba lines; ${w} carries it`
const off = { kawiarni: TWIN('kawiarnia'), kelnerka: TWIN('kelner'), zamawiam: TWIN('zamówić'), cukrem: TWIN('mlekiem (z and the instrumental)'),
  skrzyżowania: TWIN('skrzyżowanie'), róg: TWIN('rogu (na rogu)'), wysiąść: TWIN('wysiadam'), babci: TWIN('babcia'), dziadka: TWIN('dziadek'),
  salonie: TWIN('salon'), piętro: TWIN('piętrze (na piętrze)'), pielęgniarka: TWIN('pielęgniarką (jestem pielęgniarką)'), kierownik: TWIN('szef'),
  pocztówka: TWIN('pocztówkę'),
  koło: 'turned off after the pull: no Tatoeba line, and koło is also a wheel and a circle; niedaleko carries near' }
// Vocabulary words with no natural line within the words known by their circle (each would need a form the course
// does not teach): podjąć (its line is podjąć decyzję, and decyzję is not taught), wszelki (na wszelki wypadek, and
// wypadek comes after U94), służba (służba zdrowia, na służbie); typu is typ's genitive, and typ carries it.
off.podjąć = 'turned off in the gather: no line within the words known (podjąć decyzję needs decyzję, not taught)'
off.wszelki = 'turned off in the gather: no line within the words known (na wszelki wypadek needs wypadek, taught after U94)'
off.służba = 'turned off in the gather: no line within the words known (służba zdrowia, na służbie)'
off.typu = TWIN('typ')
// Dry-source rule (brief, 2026-11-21): with every word drafted, Part 4 would stand at about 41% drafts, so the
// vocabulary circles' draft-only words (no Tatoeba line in their circle) were turned off, least frequent on the Kelly
// list first, until the part was under 38%; their drafts were never written. Ids kept.
const DRY = 'turned off under the dry-source rule: only drafted lines in its circle (Part 4 would stand at about 41% drafts)'
for (const w of ['szansę', 'wprowadzić', 'badać', 'zdać', 'wzrost', 'jednocześnie', 'umowa', 'traktować', 'wiara', 'zawodowy', 'opowiadać', 'budowa',
  'produkcja', 'tytuł', 'sieć', 'światowy', 'sukces', 'bronić', 'osiągnąć', 'duch', 'amerykański', 'stworzyć', 'współpraca']) off[w] = DRY
// około was turned off in Part 2 (it takes the genitive of a number); Part 3 taught the hour's -ej form, so około
// dziesiątej (at about ten) is now in reach.
const revive = { około: 'U94' }

export default {
  part: 4, off, revive, wordBase: 2401, wordSpan: 300, vocabBase: 2701, vocabSpan: 300, cdBase: 501,
  slots: [{ slot_id: 'C07', part: 4, after_row: 22 }, { slot_id: 'C08', part: 4, after_row: 24 }],
  situation, vocab, items, canDo,
}
