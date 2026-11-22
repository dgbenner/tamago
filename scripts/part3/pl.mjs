// Polish A1 · Part 3, Time and Plans (Dan, 2026-11-21; Builder 2, branch content/pl-a1), in the format of Swedish, Danish
// and Dutch Part 3: telling the time, days, months and seasons, making plans and a day's routine (T05); signs, notices and
// timetables (T09); announcements and simple instructions (T12); the help thread goes on (T13). Standard Polish, ty
// throughout (Pan and Pani kept out); times as Poles say them (jest ósma, wpół do czwartej is 3:30, kwadrans po ósmej,
// za kwadrans dziesiąta; o ósmej, at eight), timetables and notices on the 24-hour clock (18:00).
// Part 1 already taught the days of the week (U14 Time) and free time (U52), so U62 takes the days in use (w sobotę, the
// accusative after w; zwykle, rzadko, w przyszłym tygodniu) and Free Time gives way to Little Words, as in Danish.
// The past tense comes in here, the way Danish Part 3 brought it in (U71 Yesterday, first in the part, with wczoraj):
// być first (byłem, byłam, był, była, było), then the past of verbs the course already has (miałem, zrobiłem, powiedział,
// poszedł, widziałem), each form a word with its own hint; -łem is said by a man and -łam by a woman, -ł is he and -ła
// she. From there the later circles may use it (U37 Co powiedziałeś?, U62 w zeszłym tygodniu, ostatnio). The future of
// być follows (U72 jutro będzie ciepło; U64 będę, będziesz, będziemy), with no other future forms.
// Cases: the instrumental comes in gradually, never before row 18: U64 z + the instrumental for with (ze mną, z tobą,
// z kolegą, z rodziną); U65 być + the instrumental for jobs (jestem nauczycielem, kim jesteś?); U67 travelling by
// (jadę autobusem, pociągiem); U74 przed, za, pod, nad, między + the instrumental for where (pod stołem, przed domem; przy
// takes the locative); U75 interesować się + the instrumental (interesuję się muzyką). Times use the feminine ordinals
// (godzina is understood): the nominative for jest ósma, the -ej form after o, po, do, od and wpół do (ósmej). Seasons in
// taught cases only (w lecie, w zimie, na jesieni: locative; na wiosnę: accusative), months in the locative (w maju).
// The dative stays out except the fixed phrases podoba mi się and wydaje mi się (U39, U75), each one course word.
// Words chosen for the Polish Kelly list's core 600 (content-pl/a1-list.json) where they fit the situations (pod, przed,
// przy, nad, między, wtedy, gdy, jednak, przecież, uwaga, informacja, plan, spotkanie, decyzja, pora, początek, noc,
// kierunek, podczas, sądzić, dać, wziąć, znaleźć, zacząć, zostać, przyjść, wrócić, pokazać, zmienić, wybrać, spotkać,
// próbować, trwać, latać, prosić, zrozumieć, odpowiedzieć, szczęście, coraz, aż, oba, inaczej, myśl), and for the forms
// that open the most checked Tatoeba lines within the words known by then (the past forms above).
// Ids: Part 2 holds W1501 to W1781 (situation, span 300) and W1101 to W1277 (vocabulary), so Part 3 takes W1801 to W2100
// (situation, span 300) and W2101 to W2400 (vocabulary, span 300); Part 4 can start at W2401.
// Left out while planning, before the ids were set: pogodę, sądzić and interesować (no natural line within the words
// known; sądzę and interesuję carry the lemmas), czynny, pchać, ciągnąć and cisza (signs with no line), and Free Time
// (Part 1's U52). Names stay nominative only: Toma, Tomem and the like would open many Tatoeba lines, but no hint can
// carry a name's case, so they stay out (a decision for Dan).
// Used by scripts/add-part.mjs (COURSE=pl PART=3).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U61', order: 111, row: 16, after: '', title: 'What Time Is It?', tasks: 'T05',
    grammar: 'Która jest godzina? Jest ósma: the hour is a feminine ordinal (godzina is understood): pierwsza, druga, trzecia … dwunasta; o której? o ósmej (at eight: the -ej form after o); wpół do czwartej is 3:30 (half to the next hour); kwadrans po ósmej (8:15), za kwadrans dziesiąta (9:45); pół godziny, pięć minut (the genitive plural after five); w nocy',
    words: ['której', 'pierwsza', 'druga', 'trzecia', 'czwarta', 'piąta', 'szósta', 'siódma', 'ósma', 'dziewiąta', 'dziesiąta', 'jedenasta', 'dwunasta', 'trzeciej', 'czwartej', 'ósmej', 'wpół', 'kwadrans', 'pół', 'minuta', 'minut', 'godziny', 'godzinę', 'południe', 'północ', 'noc', 'nocy', 'później', 'wcześniej', 'zegarek', 'spóźniony', 'spóźniona'] },
  { unit_id: 'U37', order: 111.5, row: 16.5, after: 'row 16', title: "Didn't Catch That", help: true, tasks: 'T13',
    grammar: 'Co powiedziałeś? Co powiedziałaś? (the past: -łeś to a man, -łaś to a woman); Nie zrozumiałem, nie zrozumiałam; Nie słyszę cię. Możesz mówić głośniej?; słabo cię słyszę; nic nie słychać',
    words: ['powiedziałeś', 'powiedziałaś', 'zrozumiałem', 'zrozumiałam', 'zrozumieć', 'głos', 'cicho', 'głośno', 'znowu', 'słabo', 'słychać', 'usłyszeć'] },
  { unit_id: 'U62', order: 112, row: 17, after: 'row 16', title: 'Days of the Week', tasks: 'T05;T09',
    grammar: 'W poniedziałek, w sobotę, w niedzielę (w with the accusative for on a day); zwykle, często, czasami, rzadko, nigdy; dwa razy w tygodniu; w przyszłym tygodniu, w zeszłym tygodniu (the locative); najpierw … potem; wtedy (then), gdy (when)',
    words: ['sobotę', 'niedzielę', 'środę', 'weekend', 'zwykle', 'rzadko', 'pojutrze', 'przedwczoraj', 'razy', 'tygodniu', 'przyszłym', 'zeszłym', 'ostatnio', 'najpierw', 'potem', 'wtedy', 'gdy', 'dni'] },
  { unit_id: 'U63', order: 113, row: 17, after: 'row 16', title: 'Months + Seasons', tasks: 'T05;T09',
    grammar: 'W maju, w lipcu, we wrześniu: the months in the locative, after w (no capital); wiosna, lato, jesień, zima: na wiosnę, w lecie, na jesieni, w zimie; pora roku (a season); na początku (at the start)',
    words: ['styczniu', 'lutym', 'marcu', 'kwietniu', 'maju', 'czerwcu', 'lipcu', 'sierpniu', 'wrześniu', 'październiku', 'listopadzie', 'grudniu', 'wiosna', 'lato', 'jesień', 'zima', 'wiosnę', 'lecie', 'jesieni', 'zimie', 'pora', 'roku', 'początku', 'wakacje', 'święta', 'data'] },
  { unit_id: 'U38', order: 113.5, row: 17.5, after: 'row 17', title: 'Thinking It Over', help: true, tasks: 'T13',
    grammar: 'Niech pomyślę (let me think: a fixed phrase, as niech zobaczę). Zastanawiam się. Muszę się zastanowić. Poczekaj. Właściwie … No cóż. Przecież …, jednak …',
    words: ['pomyślę', 'zastanawiam', 'zastanowić', 'właściwie', 'cóż', 'poczekaj', 'przecież', 'jednak', 'myśl'] },
  { unit_id: 'U64', order: 114, row: 18, after: 'row 17', title: 'Making Plans', tasks: 'T05',
    grammar: 'Brings in the instrumental after z (with): ja, ze mną; ty, z tobą; my, z nami; kolega, z kolegą; rodzina, z rodziną; będę, będziesz, będziemy (the future of być); chodźmy! (let\'s go); idziemy do kina? (the genitive after do); spotkajmy się',
    words: ['ze', 'mną', 'tobą', 'nami', 'kolegą', 'przyjacielem', 'rodziną', 'będę', 'będziesz', 'będziemy', 'plan', 'plany', 'spotkanie', 'spotkać', 'spotkajmy', 'spotykamy', 'kina', 'teatr', 'teatru', 'chętnie', 'chodź', 'chodźmy', 'pójść', 'decyzja', 'wieczór', 'przyszłości'] },
  { unit_id: 'U65', order: 115, row: 18, after: 'row 17', title: 'My Day', tasks: 'T05',
    grammar: 'Wstaję o siódmej: o and the hour\'s -ej form; śniadanie, obiad, kolacja; kończę pracę o piątej; być with the instrumental for a job: jestem nauczycielem, ona jest lekarzem, kim jesteś? (kim: the instrumental of kto); pracuję jako … (as)',
    words: ['wstaję', 'wstajesz', 'wstaje', 'wstawać', 'budzę', 'śniadanie', 'obiad', 'kolacja', 'kolację', 'prysznic', 'myję', 'zęby', 'kończę', 'kończy', 'kończyć', 'jako', 'kim', 'nauczycielem', 'nauczycielką', 'lekarzem', 'studentem', 'studentką', 'siódmej', 'szóstej', 'dziewiątej', 'piątej', 'pracę'] },
  { unit_id: 'U66', order: 116, row: 19, after: 'row 18', title: 'Signs + Notices', tasks: 'T09',
    grammar: 'Wejście, wyjście; czynne, nieczynne (open, closed, on a shop or office); uwaga! (attention); zakaz palenia (palenia: the genitive of palenie); nie palić, nie dotykać: nie with an infinitive on a notice; wstęp wolny',
    words: ['wejście', 'wyjście', 'uwaga', 'zakaz', 'palenia', 'palić', 'toaleta', 'apteka', 'policja', 'informacja', 'kasa', 'czynne', 'nieczynne', 'wstęp', 'dotykać'] },
  { unit_id: 'U67', order: 117, row: 19, after: 'row 18', title: 'Timetables', tasks: 'T09',
    grammar: 'Jadę autobusem, pociągiem, samochodem: the instrumental for how you travel; lecę samolotem; pociąg odjeżdża o dziesiątej i przyjeżdża o dwunastej; odjazd, przyjazd; bilet, na dworcu, na przystanku (the locative)',
    words: ['autobusem', 'pociągiem', 'samochodem', 'rowerem', 'samolotem', 'samolot', 'tramwaj', 'tramwajem', 'jedziesz', 'jedzie', 'jedziemy', 'jechać', 'lecę', 'lecieć', 'latać', 'odjeżdża', 'przyjeżdża', 'odjazd', 'przyjazd', 'bilet', 'bilety', 'stacja', 'stacji', 'przystanek', 'przystanku', 'peron', 'peronu', 'dworcu', 'podróż', 'dziesiątej', 'jedenastej', 'dwunastej', 'drugiej'] },
  { unit_id: 'U39', order: 117.5, row: 19.5, after: 'row 19', title: 'Not Sure', help: true, tasks: 'T13',
    grammar: 'Być może. To zależy. Prawdopodobnie. Nie jestem pewien. Wydaje mi się, że … (it seems to me: a fixed phrase; mi is the dative of ja). Sądzę, że … Chociaż …',
    words: ['być może', 'zależy', 'prawdopodobnie', 'wydaje mi się', 'sądzę', 'sądzisz', 'chociaż'] },
  { unit_id: 'U68', order: 118, row: 20, after: 'row 19', title: 'Announcements', tasks: 'T12',
    grammar: 'Uwaga, pasażerowie: the words of an announcement; pociąg jest opóźniony; pociąg przyjedzie na peron drugi (przyjedzie: it will arrive); w kierunku (towards, with the genitive); prosimy (we ask), przepraszamy (we apologise); podczas (during)',
    words: ['pasażerowie', 'pasażerów', 'opóźniony', 'opóźnienie', 'przyjedzie', 'odjedzie', 'tor', 'kierunku', 'prosimy', 'prosić', 'przepraszamy', 'zatrzymuje', 'podczas', 'lot', 'odwołany'] },
  { unit_id: 'U69', order: 119, row: 20, after: 'row 19', title: 'Instructions', tasks: 'T12',
    grammar: 'Przeczytaj tekst. Wybierz poprawną odpowiedź. Napisz zdanie.: the command (przeczytaj, napisz, wybierz, odpowiedz), with the verb first; nie zapomnij …; pamiętaj',
    words: ['przeczytaj', 'napisz', 'posłuchaj', 'wybierz', 'odpowiedz', 'zamknij', 'otwórz', 'spójrz', 'sprawdź', 'zaznacz', 'uzupełnij', 'zapomnij', 'pamiętaj', 'ćwiczenie', 'obrazek', 'stronie', 'poprawną', 'odpowiedzieć', 'wybrać', 'słowa'] },
]

const vocab = [
  { unit_id: 'U71', order: 111.2, row: 16, after: '', title: 'Yesterday',
    grammar: 'Wczoraj byłem w domu: the past tense. być: byłem (I was, said by a man), byłam (by a woman), byłeś, byłaś (you were), był (he was), była (she was), było (it was), byliśmy (we were); the same endings on other verbs: miałem, zrobiłam, powiedział, poszła; poszedł and przyszedł are irregular',
    words: ['wczoraj', 'być', 'był', 'była', 'było', 'byłem', 'byłam', 'byłeś', 'byłaś', 'byliśmy', 'miał', 'miała', 'miałem', 'miałam', 'zrobił', 'zrobiła', 'zrobiłem', 'zrobiłam', 'powiedział', 'powiedziała', 'powiedziałem', 'poszedł', 'poszła', 'poszedłem', 'widział', 'widziałem', 'wiedziałem', 'myślałem', 'myślałam', 'kupił', 'kupiłem', 'chciałem', 'wrócił', 'przyszedł', 'zaczął', 'znalazłem', 'został', 'mógł'] },
  { unit_id: 'U72', order: 113.2, row: 17, after: 'row 16', title: 'The Weather',
    grammar: 'Jaka jest pogoda? Pada deszcz, pada śnieg, wieje wiatr; jest ciepło, jest zimno, jest gorąco (an adverb after jest); jutro będzie ciepło (będzie: it will be, the future of być); dwadzieścia stopni (the genitive plural)',
    words: ['pogoda', 'deszcz', 'pada', 'padać', 'śnieg', 'wiatr', 'wieje', 'ciepło', 'gorąco', 'chłodno', 'słonecznie', 'stopni', 'burza', 'będzie', 'parasol', 'chmury'] },
  { unit_id: 'U73', order: 115.2, row: 18, after: 'row 17', title: 'Doing Things',
    grammar: 'Verbs in pairs: daję (I give, I am giving) beside dać (to give, once), after chcę, muszę, mogę; the command: daj, weź, pokaż, spróbuj, zostań, przyjdź; to trwa długo; to nie działa; wystarczy',
    words: ['daj', 'daję', 'dajesz', 'daje', 'dać', 'weź', 'wziąć', 'znaleźć', 'zaczynam', 'zaczyna', 'zacząć', 'pokaż', 'pokazać', 'zmienić', 'próbuję', 'próbujesz', 'próbuje', 'próbować', 'spróbuj', 'spróbować', 'trwa', 'wrócić', 'przyjść', 'przyjdź', 'działa', 'zostać', 'zostań', 'zostaw', 'otworzyć', 'naprawić', 'wystarczy'] },
  { unit_id: 'U74', order: 117.2, row: 19, after: 'row 18', title: 'Little Words',
    grammar: 'Przed, za, pod, nad, między with the instrumental for where something is: przed domem, pod stołem, nad oknem; przy with the locative (przy stole); naprzeciwko and wokół with the genitive; z nim, z nią; coraz, aż, oba, inaczej',
    words: ['przed', 'pod', 'nad', 'między', 'przy', 'naprzeciwko', 'wokół', 'poza', 'wśród', 'aż', 'coraz', 'oba', 'obie', 'inaczej', 'domem', 'stołem', 'stole', 'oknem', 'łóżkiem', 'sklepem', 'nim', 'nią'] },
  { unit_id: 'U75', order: 119.2, row: 20, after: 'row 19', title: 'Likes + Feelings',
    grammar: 'Interesuję się muzyką: interesować się takes the instrumental; uwielbiam, nienawidzę; podoba mi się (I like it: a fixed phrase; mi is the dative of ja); cieszę się, boję się; wolę (I prefer); mam ochotę na … (I feel like); szkoda',
    words: ['interesuję', 'interesujesz', 'interesuje', 'muzyką', 'sportem', 'historią', 'sport', 'uwielbiam', 'uwielbiasz', 'uwielbia', 'nienawidzę', 'podoba mi się', 'cieszę', 'boję', 'boisz', 'boi', 'wolę', 'wolisz', 'woli', 'ochotę', 'szkoda', 'świetnie', 'zadowolony', 'zadowolona', 'szczęście'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Spoken times as Poles say them (wpół do czwartej is 3:30); timetables and notices on the 24-hour clock with a
// colon (18:00). No date items: a Polish date (piątego marca) needs the genitive ordinal and month, which Part 3 does not
// teach; U63 teaches the months in the locative.
const listen = [
  ['N201', 'U61', 'time', 'Jest wpół do czwartej.', '3:30'], ['N202', 'U61', 'time', 'Jest kwadrans po ósmej.', '8:15'],
  ['N203', 'U61', 'time', 'Jest dwunasta.', '12:00'], ['N204', 'U61', 'time', 'Jest za kwadrans dziesiąta.', '9:45'],
  ['N205', 'U65', 'time', 'Wstaję o siódmej.', '7:00'], ['N206', 'U65', 'time', 'Kończę pracę o szóstej.', '6:00'],
  ['N207', 'U67', 'time', 'Autobus odjeżdża o dziesiątej.', '10:00'], ['N208', 'U67', 'time', 'Pociąg przyjeżdża o dwunastej.', '12:00'],
  ['N209', 'U68', 'number', 'Pociąg odjeżdża z peronu numer pięć.', '5'], ['N210', 'U68', 'number', 'Samolot jest opóźniony o dwadzieścia minut.', '20'],
]
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const texts = [
  text('R201', 'U62', 'notice', 'Sklep', ['Poniedziałek – piątek: 9:00 – 18:00', 'Sobota: 10:00 – 16:00', 'Niedziela: zamknięte'],
    [q('When is the shop closed?', ['Sunday', 'Saturday', 'Monday']), q('What time does it open on Saturday?', ['10:00', '9:00', '16:00'])]),
  text('R202', 'U64', 'message', 'Piotr pisze', ['Anna!', 'Idziemy do kina w środę? W środę i w czwartek mam czas.', 'W sobotę pracuję.', 'Piotr'],
    [q('When is Piotr free?', ['Wednesday and Thursday', 'Saturday', 'Every day']), q('What does Piotr do on Saturday?', ['He works', 'He goes to the cinema', 'He stays at home'])]),
  text('R203', 'U62', 'notice', 'Muzeum', ['Muzeum jest zamknięte w poniedziałek.', 'Dla dzieci: środa, 15:00'],
    [q('Which day is the museum closed?', ['Monday', 'Wednesday', 'Tuesday']), q('When is the visit for children?', ['Wednesday at 3 pm', 'Monday at 3 pm', 'Wednesday at 5 pm'])]),
  text('R204', 'U63', 'notice', 'Wakacje', ['W lipcu i w sierpniu nie ma lekcji.', 'Szkoła: znowu we wrześniu.'],
    [q('When are there no lessons?', ['In July and August', 'In September', 'In June']), q('When does school start again?', ['In September', 'In July', 'In May'])]),
  text('R205', 'U63', 'sign', 'Muzyka na rynku', ['Muzyka na rynku', 'W czerwcu i w lipcu', 'Sobota, 18:00'],
    [q('When is the music on?', ['In June and July', 'In May', 'In August']), q('What time does it start?', ['6 pm', '8 pm', '9 pm'])]),
  text('R206', 'U63', 'message', 'Maria pisze', ['W lipcu jestem na plaży.', 'W grudniu jestem w górach.', 'A ty?'],
    [q('Where is Maria in July?', ['At the beach', 'In the mountains', 'In the city']), q('When is she in the mountains?', ['In December', 'In July', 'In spring'])]),
  text('R207', 'U66', 'sign', 'Apteka', ['Apteka', 'Czynne: 8:00 – 20:00', 'Niedziela: nieczynne'],
    [q('When is the chemist\'s closed?', ['On Sundays', 'On Saturdays', 'Every evening']), q('What time does it close?', ['8 pm', '8 am', '10 pm'])]),
  text('R208', 'U67', 'sign', 'Na dworcu', ['Wyjście', 'Kasa: bilety', 'Informacja: tutaj', 'Toaleta: dwa złote'],
    [q('Where can you buy tickets?', ['At the ticket office', 'At the information desk', 'At the exit']), q('How much is the toilet?', ['2 złote', '5 złotych', 'Nothing'])]),
  text('R209', 'U66', 'notice', 'Uwaga!', ['Uwaga!', 'Zakaz palenia.', 'Nie dotykać!'],
    [q('What is not allowed?', ['Smoking', 'Eating', 'Talking']), q('What must you not do?', ['Touch', 'Look', 'Sit down'])]),
  text('R210', 'U67', 'timetable', 'Pociągi', ['Odjazd 8:15 – przyjazd 9:05', 'Odjazd 12:40 – przyjazd 13:30', 'Odjazd 18:00 – przyjazd 18:50'],
    [q('When does the 12:40 train arrive?', ['13:30', '9:05', '18:50']), q('What time is the first train?', ['8:15', '12:40', '18:00'])]),
  text('R211', 'U67', 'timetable', 'Autobus numer pięć', ['Odjazd: 7:00, 9:00, 11:00', 'W niedzielę: tylko 9:00'],
    [q('When is there a bus on Sundays?', ['Only at 9:00', 'At 7:00 and 11:00', 'Not at all']), q('What time is the first bus?', ['7:00', '9:00', '11:00'])]),
  text('R212', 'U67', 'message', 'Tom pisze', ['Jestem na dworcu o piątej.', 'Mój pociąg odjeżdża o trzeciej.', 'Cześć!'],
    [q('When is Tom at the station?', ['At five', 'At three', 'At seven']), q('When does his train leave?', ['At three', 'At five', 'At one'])]),
  text('R213', 'U69', 'notice', 'Na lekcji', ['Przeczytaj tekst.', 'Odpowiedz na pytanie.', 'Wybierz obrazek.'],
    [q('What do you do first?', ['Read the text', 'Answer the question', 'Choose a picture']), q('What do you choose?', ['A picture', 'A book', 'A word'])]),
  text('R214', 'U69', 'notice', 'Drzwi', ['Zamknij drzwi, proszę.', 'Uwaga: zamknij powoli.'],
    [q('What should you do with the door?', ['Close it', 'Leave it open', 'Lock it']), q('How should you close it?', ['Slowly', 'Quickly', 'With a key'])]),
  text('R215', 'U69', 'notice', 'Ćwiczenie', ['Wybierz słowo.', 'Otwórz książkę na stronie dziesięć.', 'Przeczytaj zdanie.'],
    [q('What do you open?', ['The book', 'The door', 'The window']), q('What do you do last?', ['Read the sentence', 'Choose a word', 'Close the book'])]),
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F201', unit_id: 'U64', card: 'W sobotę idę z kolegą do kina. Film jest o ósmej. Spotykamy się na rynku.',
      fields: [{ key: 'day', label: 'Dzień', rule: 'text', answer: 'sobota', also: ['Sobota', 'w sobotę', 'W sobotę', 'sobotę'] }, { key: 'time', label: 'Godzina', rule: 'text', answer: '20:00', also: ['8:00', '20.00', '8.00', '8', '20', 'ósma', 'o ósmej'] },
        { key: 'where', label: 'Gdzie', rule: 'text', answer: 'na rynku', also: ['rynek', 'Rynek', 'rynku', 'Na rynku'] }] },
    { id: 'F202', unit_id: 'U65', card: 'Nazywam się Anna. Wstaję o siódmej. Śniadanie jem o ósmej. Pracuję od dziewiątej do piątej.',
      fields: [{ key: 'name', label: 'Imię', rule: 'text', answer: 'Anna' }, { key: 'up', label: 'Wstaje', rule: 'text', answer: '7:00', also: ['7', '7.00', 'siódma', 'o siódmej'] },
        { key: 'breakfast', label: 'Śniadanie', rule: 'text', answer: '8:00', also: ['8', '8.00', 'ósma', 'o ósmej'] },
        { key: 'start', label: 'Praca od', rule: 'text', answer: '9:00', also: ['9', '9.00', 'dziewiąta', 'od dziewiątej'] }, { key: 'end', label: 'Praca do', rule: 'text', answer: '17:00', also: ['5', '5:00', '17', '17.00', 'piąta', 'do piątej'] }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: texts.map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P201', unit_id: 'U62', prompt: 'Write a short message to a friend about your week: what you do on two days.', points: 'two days;what you do', min_words: 20, max_words: 35 },
    { id: 'P202', unit_id: 'U64', prompt: 'Write a short message to invite a friend out: what, which day and what time.', points: 'what;which day;what time', min_words: 20, max_words: 35 },
    { id: 'P203', unit_id: 'U65', prompt: 'Write a few lines about your day: when you get up, work and have dinner.', points: 'when you get up;when you work;when you have dinner', min_words: 20, max_words: 35 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

// "I can" statements, on the CEFR self-assessment grid's A1 rows (as Swedish, Danish and Dutch Part 3).
const canDo = {
  U61: [['listening', 'Listening', 'I can understand the time when someone says it.'], ['speaking', 'Spoken interaction', 'I can ask what time it is and say it.']],
  U71: [['speaking', 'Spoken production', 'I can say in simple words what I did yesterday.']],
  U37: [['speaking', 'Spoken interaction', "I can say I didn't hear and ask someone to speak up."]],
  U62: [['speaking', 'Spoken production', 'I can say which day I do something and how often.']],
  U63: [['speaking', 'Spoken production', 'I can say in which month or season something happens.']],
  U72: [['speaking', 'Spoken production', 'I can say what the weather is like.']],
  U38: [['speaking', 'Spoken interaction', 'I can ask for a moment to think.']],
  U64: [['speaking', 'Spoken interaction', 'I can make a simple plan with someone: what, when and where.']],
  U65: [['speaking', 'Spoken production', 'I can describe my day in simple words and say what I do for a living.']],
  U73: [['speaking', 'Spoken production', 'I can say what I do with everyday verbs: give, take, find, start, show, try.']],
  U66: [['reading', 'Reading', 'I can understand simple signs and notices: open, closed, entrance, exit.']],
  U67: [['reading', 'Reading', 'I can find a departure or arrival time on a timetable.']],
  U74: [['reading', 'Reading', 'I can understand the small words that say where something is: in front of, behind, under, above, between.']],
  U39: [['speaking', 'Spoken interaction', "I can say I'm not sure or that I think so."]],
  U68: [['listening', 'Listening', 'I can understand a short announcement at a station or an airport.']],
  U69: [['reading', 'Reading', 'I can follow short, simple instructions.']],
  U75: [['speaking', 'Spoken production', 'I can say what I like and how I feel.']],
}

const off = {
  wśród: 'turned off in the gather: wśród takes the genitive plural (wśród przyjaciół, wśród drzew), forms the course does not teach yet, so no line can use it; Part 4',
}
// Kelly core words added once the circles were gathered, where they fit the circle and open Tatoeba lines with its
// words (numbered after every word of their kind, so no id moves; Part 2 had 48% of the core 600).
const late = [
  { unit_id: 'U62', words: ['obecnie', 'kolejny'] },
  { unit_id: 'U38', words: ['przypadek', 'fakt'] },
  { unit_id: 'U64', words: ['powinieneś', 'powinienem', 'powinniśmy', 'powinien', 'żeby', 'okazja', 'wybór', 'cel', 'możliwość'] },
  { unit_id: 'U65', words: ['lekarka', 'lekarką', 'profesorem', 'dyrektorem', 'firmie', 'przygotować', 'Polakiem', 'Polką', 'projekt'] },
  { unit_id: 'U69', words: ['sposób', 'część', 'rodzaj', 'artykuł', 'obraz', 'wynik'] },
  { unit_id: 'U39', words: ['sprawa', 'prawo', 'sytuacja', 'sytuacji'] },
  { unit_id: 'U68', words: ['powód', 'powodu'] },
  { unit_id: 'U73', words: ['prowadzić', 'prowadzi', 'zająć', 'dodać', 'dziękować'] },
  { unit_id: 'U74', words: ['swój', 'swoje', 'swoją', 'jakiś', 'jakieś', 'ponieważ', 'jeżeli', 'aby', 'ponad', 'mimo', 'własne'] },
  { unit_id: 'U75', words: ['zdrowie', 'sens', 'sensu', 'kultura', 'kulturą', 'sztuka', 'sztuką'] },
]

export default {
  part: 3, off, late, wordBase: 1801, wordSpan: 300, vocabBase: 2101, vocabSpan: 300, cdBase: 401,
  slots: [{ slot_id: 'C05', part: 3, after_row: 17 }, { slot_id: 'C06', part: 3, after_row: 19 }],
  situation, vocab, items, canDo,
}
