// Italian A1 · Part 3, Time and Plans (Dan, 2026-11-15, overnight build), in the format of French and Spanish Part 3:
// telling the time, days, months and dates, making plans and a day's routine (T05); signs, notices and timetables (T09);
// announcements and simple instructions (T12); the help thread goes on (T13). Standard Italian as spoken in Italy.
// Words from the Kelly A1 list's 600 most frequent first (scripts/a1-coverage.mjs --missing), checked against Tatoeba
// (scripts/circle-feasibility.mjs). Vocabulary circles carry the list's small words (with the joined prepositions, del,
// nella, dal …), the news, everyday verbs, likes and opinions, and town and region; themes stay clear of Part 4 (food
// and drink, directions, home, family, work, forms and messages). Read and Answer has three texts per circle that has
// it. Used by scripts/add-part.mjs (COURSE=it PART=3).
const DRAFT = 'draft: written for Tamago, native check'

const situation = [
  { unit_id: 'U61', order: 111, row: 16, after: '', title: 'What Time Is It?', tasks: 'T05',
    grammar: "Che ore sono? È l'una, sono le due: è only with one; e mezza, e un quarto, meno un quarto; di mattina, di sera",
    words: ['minuto', 'minuti', 'ore', 'mezza', 'mezzo', 'quarto', 'mattina', 'mezzogiorno', 'mezzanotte', 'pomeriggio', 'sera', 'notte', 'presto', 'tardi', 'tempo', 'periodo', 'appena'] },
  { unit_id: 'U37', order: 111.5, row: 16.5, after: 'row 16', title: "Didn't Catch That", help: true, tasks: 'T13',
    grammar: 'Scusi? Non ho sentito. Come ha detto? Non sento bene', words: ['sento', 'sentito', 'sentire', 'detto', 'voce'] },
  { unit_id: 'U62', order: 112, row: 17, after: 'row 16', title: 'Days of the Week', tasks: 'T05;T09',
    grammar: 'Lunedì (this Monday), il lunedì (every Monday); tutti i giorni, ogni settimana; la settimana prossima, il mese scorso: prossimo and scorso agree',
    words: ['martedì', 'mercoledì', 'giovedì', 'venerdì', 'fine', 'ieri', 'giorni', 'tutti', 'sempre', 'mai', 'spesso', 'volta', 'volte', 'prossimo', 'prossima', 'scorso', 'scorsa', 'fino', 'durante', 'ultimo', 'ultima'] },
  { unit_id: 'U63', order: 113, row: 17, after: 'row 16', title: 'Months + Seasons', tasks: 'T05;T09',
    grammar: "A gennaio, in estate; il primo maggio, il due maggio: primo only for the first; months take no capital",
    words: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre', 'primavera', 'estate', 'autunno', 'inverno', 'data', 'primo', 'secondo', 'terzo'] },
  { unit_id: 'U38', order: 113.5, row: 17.5, after: 'row 17', title: 'Thinking It Over', help: true, tasks: 'T13',
    grammar: 'Un attimo… Vediamo. Allora… Fammi pensare', words: ['penso', 'pensare', 'vediamo', 'allora', 'dunque', 'quindi'] },
  { unit_id: 'U64', order: 114, row: 18, after: 'row 17', title: 'Making Plans', tasks: 'T05',
    grammar: 'Vieni? Andiamo al cinema?; venire: vengo, vieni, viene; uscire: esco; possiamo + a verb; ci vediamo',
    words: ['vieni', 'viene', 'venire', 'vengo', 'uscire', 'esco', 'vedere', 'vedo', 'andiamo', 'andare', 'insieme', 'libero', 'libera', 'occupato', 'occupata', 'incontro', 'idea', 'forse', 'possiamo', 'decido', 'decidere', 'organizzare', 'occasione'] },
  { unit_id: 'U65', order: 115, row: 18, after: 'row 17', title: 'My Day', tasks: 'T05',
    grammar: 'Fare: faccio, fai, fa; finire: finisco (-isc- verbs); prima, poi, dopo: the order of the day',
    words: ['faccio', 'fai', 'fa', 'fare', 'lavoro', 'lavorare', 'lavora', 'torno', 'tornare', 'inizio', 'iniziare', 'finisco', 'finire', 'prima', 'poi', 'dopo', 'colazione', 'pranzo', 'cena', 'giornata', 'mentre', 'continuo', 'continuare'] },
  { unit_id: 'U66', order: 116, row: 19, after: 'row 18', title: 'Signs + Notices', tasks: 'T09',
    grammar: "Aperto, chiuso: on a sign; la farmacia è aperta, l'ufficio è chiuso: they agree; vietato fumare",
    words: ['entrata', 'uscita', 'vietato', 'attenzione', 'ufficio', 'servizio', 'orario', 'pubblico', 'privato', 'informazione', 'informazioni', 'farmacia', 'banca', 'ascensore', 'aperta', 'chiusa', 'area', 'limite', 'sezione'] },
  { unit_id: 'U67', order: 117, row: 19, after: 'row 18', title: 'Timetables', tasks: 'T09',
    grammar: 'Il treno parte alle otto e arriva alle dieci: partire and arrivare; un biglietto di andata e ritorno',
    words: ['parte', 'partire', 'arriva', 'arrivare', 'arrivo', 'partenza', 'binario', 'ritardo', 'biglietto', 'andata', 'ritorno', 'aereo', 'nave', 'aeroporto', 'fermata', 'viaggio', 'viaggiare', 'linea'] },
  { unit_id: 'U39', order: 117.5, row: 19.5, after: 'row 19', title: 'Not Sure', help: true, tasks: 'T13',
    grammar: 'Non sono sicuro, non sono sicura. Credo di sì. Forse. Sembra di sì', words: ['credo', 'credere', 'sicuro', 'sicura', 'probabilmente', 'sembra', 'davvero'] },
  { unit_id: 'U68', order: 118, row: 20, after: 'row 19', title: 'Announcements', tasks: 'T12',
    grammar: 'Signore e signori, attenzione: the words of an announcement; il treno è in ritardo; per motivi di sicurezza',
    words: ['signori', 'passeggeri', 'annuncio', 'avviso', 'passaporto', 'valigia', 'entrare', 'metropolitana', 'causa', 'motivo', 'sicurezza', 'controllo', 'ordine', 'direzione'] },
  { unit_id: 'U69', order: 119, row: 20, after: 'row 19', title: 'Instructions', tasks: 'T12',
    grammar: 'Ascolta, guarda, rispondi, scegli: the tu command; leggete, scrivete: the voi command',
    words: ['ascolta', 'guarda', 'rispondi', 'scegli', 'completa', 'esercizio', 'attività', 'lezione', 'gruppi', 'coppia', 'usare', 'seguire', 'mettere', 'metti', 'aprire', 'apri', 'chiudere', 'chiudi', 'indicare', 'testo', 'modo', 'punto', 'scelta', 'inserire'] },
]

const vocab = [
  { unit_id: 'U71', order: 111.2, row: 16, after: '', title: 'Little Words',
    grammar: 'Ma, o, oppure, se, senza, tra: words that join; fino a (until), verso (towards), contro (against); di + il is del, in + la is nella, da + il is dal: the joined prepositions',
    words: ['ma', 'o', 'se', 'su', 'da', 'tra', 'fra', 'senza', 'così', 'però', 'invece', 'solo', 'già', 'quasi', 'proprio', 'sopra', 'dentro', 'fuori', 'del', 'della', 'dei', 'nel', 'nella', 'dal', 'verso', 'contro', 'oltre', 'circa', 'almeno', 'oppure', 'infatti', 'inoltre'] },
  { unit_id: 'U72', order: 113.2, row: 17, after: 'row 16', title: 'In the News',
    grammar: "Il governo, il presidente, lo stato: the words of a headline; la notizia, le notizie; c'è un problema",
    words: ['notizia', 'notizie', 'giornale', 'storia', 'governo', 'presidente', 'politica', 'guerra', 'pace', 'problema', 'situazione', 'società', 'articolo', 'stato', 'sistema', 'diritto', 'diritti', 'politico', 'sociale', 'ministro', 'repubblica'] },
  { unit_id: 'U73', order: 115.2, row: 18, after: 'row 17', title: 'Doing Things',
    grammar: 'Metto, do, guardo: -are, -ere and -ire verbs side by side; dare: do, dà; tenere: tengo; riuscire: riesco (I manage to)',
    words: ['metto', 'dare', 'do', 'dà', 'trovare', 'guardare', 'guardo', 'ricordo', 'ricordare', 'lascio', 'lasciare', 'passo', 'passare', 'aspetto', 'aspettare', 'provo', 'provare', 'uso', 'tengo', 'tenere', 'riesco', 'riuscire', 'diventa', 'diventare', 'perdo', 'perdere', 'ricevo', 'ricevere', 'cambiare', 'creare'] },
  { unit_id: 'U74', order: 117.2, row: 19, after: 'row 18', title: 'Likes + Opinions',
    grammar: 'Preferisco (-isc-), amo, odio; mi piacciono for more than one; meglio, migliore; avere ragione',
    words: ['preferisco', 'preferire', 'amo', 'odio', 'migliore', 'meglio', 'peggio', 'ragione', 'torto', 'opinione', 'piacciono', 'bravo', 'brava', 'interesse', 'realtà', 'tipo', 'genere'] },
  { unit_id: 'U75', order: 119.2, row: 20, after: 'row 19', title: 'Town + Region',
    grammar: 'Il comune, la regione, la provincia: how Italy is divided; la gente takes a singular verb',
    words: ['gente', 'gruppo', 'comune', 'regione', 'provincia', 'cittadino', 'cittadini', 'territorio', 'nazionale', 'internazionale', 'locale', 'sede', 'comunità'] },
]

// The part's A1 task items (QT14 to QT17), written for Tamago from the part's words, so drafts for the native-speaker
// check. Times on the 24-hour clock in timetables, as in Italy.
const listen = [
  ['N201', 'U61', 'time', 'Sono le tre e mezza.', '3:30'], ['N202', 'U61', 'time', 'Sono le otto e un quarto.', '8:15'],
  ['N203', 'U61', 'time', 'È mezzogiorno.', '12:00'], ['N204', 'U61', 'time', 'Sono le dieci meno un quarto.', '9:45'],
  ['N205', 'U63', 'date', 'Il cinque marzo.', '5/3'], ['N206', 'U63', 'date', 'Il primo maggio.', '1/5'],
  ['N207', 'U63', 'date', 'Il quindici settembre.', '15/9'], ['N208', 'U63', 'date', 'Il trenta dicembre.', '30/12'],
  ['N209', 'U67', 'time', 'Il treno parte alle quattro e venti.', '4:20'], ['N210', 'U67', 'time', 'Il treno arriva alle nove e dieci.', '9:10'],
  ['N211', 'U68', 'time', 'Attenzione: il treno per Roma parte alle sei.', '6:00'], ['N212', 'U68', 'number', 'Il treno per Milano è al binario sette.', '7'],
]
const text = (id, unit_id, kind, title, lines, questions) => ({ id, unit_id, kind, title, lines, questions })
const q = (question, choices, answer = 0) => ({ question, choices, answer })
const texts = [
  text('R201', 'U62', 'notice', 'Il negozio', ['Aperto dal lunedì al venerdì: 9:00 – 20:00', 'Sabato: 10:00 – 18:00', 'Domenica: chiuso'],
    [q('When is the shop closed?', ['Sunday', 'Saturday', 'Monday']), q('What time does it open on Saturday?', ['10:00', '9:00', '18:00'])]),
  text('R202', 'U62', 'message', 'Un messaggio di Marco', ['Giulia,', 'andiamo al cinema mercoledì? Sono libero mercoledì e giovedì.', 'Sabato lavoro.', 'Marco'],
    [q('When is Marco free?', ['Wednesday and Thursday', 'Saturday', 'Every day']), q('What does Marco do on Saturday?', ['He works', 'He goes to the cinema', 'He stays at home'])]),
  text('R203', 'U62', 'notice', 'Il museo', ['Il museo è chiuso il martedì.', 'Visita per bambini: mercoledì alle 15:00'],
    [q('Which day is the museum closed?', ['Tuesday', 'Wednesday', 'Monday']), q('When is the visit for children?', ['Wednesday at 3 pm', 'Tuesday at 3 pm', 'Wednesday at 5 pm'])]),
  text('R204', 'U63', 'notice', 'Le vacanze', ['La scuola è chiusa dal 20 dicembre al 6 gennaio.', 'Primo giorno di lezione: mercoledì 7 gennaio'],
    [q('Which day of the week does school start again?', ['Wednesday', 'Monday', 'Saturday']), q('When do the holidays begin?', ['20 December', '7 January', '6 January'])]),
  text('R205', 'U63', 'sign', 'La festa', ['Grande festa in piazza', 'Sabato 21 giugno, alle 18:00', 'Musica e balli'],
    [q('When is the party?', ['Saturday 21 June', 'Sunday 21 June', 'Saturday 21 July']), q('What time does it start?', ['6 pm', '8 pm', '9 pm'])]),
  text('R206', 'U63', 'message', 'Una cartolina di Anna', ['A luglio andiamo al mare.', 'In inverno andiamo in montagna.', 'E tu?'],
    [q('Where does Anna go in July?', ['To the seaside', 'To the mountains', 'To the countryside']), q('When does she go to the mountains?', ['In winter', 'In July', 'In spring'])]),
  text('R207', 'U66', 'sign', 'Al negozio', ['Entrata', 'Aperto dalle 9:00 alle 19:00', 'Chiuso la domenica'],
    [q('When is the shop closed?', ['On Sundays', 'On Saturdays', 'Every evening']), q('What time does it close?', ['7 pm', '9 pm', '9 am'])]),
  text('R208', 'U66', 'sign', 'In stazione', ['Bagni: primo piano', 'Farmacia: secondo piano', "Informazioni: all'entrata"],
    [q('Where are the toilets?', ['On the first floor', 'On the second floor', 'Next to the exit']), q('Where can you get information?', ['At the entrance', 'At the pharmacy', 'On the train'])]),
  text('R209', 'U66', 'notice', 'La banca', ['Banca di Roma', 'Aperta dal lunedì al venerdì, dalle 8:30 alle 16:00', 'Sabato e domenica: chiusa'],
    [q('Is the bank open on Saturday?', ['No', 'Yes', 'Only in the morning']), q('What time does it close on Friday?', ['4 pm', '8:30 am', '6 pm'])]),
  text('R210', 'U67', 'timetable', 'Treni per Milano', ['Partenza: 8:15 – Arrivo: 10:20', 'Partenza: 12:40 – Arrivo: 14:45', 'Partenza: 18:00 – Arrivo: 20:05'],
    [q('When does the 12:40 train arrive?', ['14:45', '10:20', '20:05']), q('What time is the first train?', ['8:15', '12:40', '18:00'])]),
  text('R211', 'U67', 'timetable', 'Autobus 12', ['Partenza dalla stazione: 7:00, 7:30, 8:00', 'La domenica: un autobus ogni ora'],
    [q('Where does the bus leave from?', ['The station', 'The centre', 'The school']), q('How often is the bus on Sundays?', ['Every hour', 'Every half hour', 'Not at all'])]),
  text('R212', 'U67', 'message', 'Un messaggio di Marco', ['Arrivo in stazione alle 17:30.', 'Il mio treno parte da Roma alle 15:00.', 'A presto!'],
    [q('When does Marco arrive?', ['5:30 pm', '3 pm', '7:30 pm']), q('Where does his train leave from?', ['Rome', 'The airport', 'Milan'])]),
  text('R213', 'U69', 'notice', 'In classe', ['Ascolta il testo.', 'Rispondi alle domande.', 'Scegli una foto.'],
    [q('What do you do first?', ['Listen to the text', 'Answer the questions', 'Choose a photo']), q('What do you choose?', ['A photo', 'A book', 'A word'])]),
  text('R214', 'U69', 'notice', 'La porta', ['Chiudi la porta, per favore.', 'Attenzione: chiudi piano.'],
    [q('What should you do with the door?', ['Close it', 'Leave it open', 'Lock it']), q('How should you close it?', ['Gently', 'Quickly', 'With a key'])]),
  text('R215', 'U69', 'notice', "L'esercizio", ['Scegli un numero.', 'Apri il libro a quella pagina.', 'Leggi il testo.'],
    [q('What do you open?', ['The book', 'The door', 'The dictionary']), q('What do you do last?', ['Read the text', 'Choose a number', 'Close the book'])]),
]
const items = {
  a1_listen: listen.map(([id, unit_id, kind, say, answer]) => ({ id, unit_id, kind, say, answer, status: DRAFT, notes: '' })),
  a1_forms: [
    { id: 'F201', unit_id: 'U64', card: 'Marco e Giulia vanno al cinema sabato alle otto e mezza di sera. Si vedono in piazza.',
      fields: [{ key: 'day', label: 'Giorno', rule: 'text', answer: 'sabato', also: ['Sabato'] }, { key: 'time', label: 'Ora', rule: 'text', answer: '20:30', also: ['8:30', '8.30', '20.30', 'otto e mezza', 'le otto e mezza'] },
        { key: 'where', label: 'Dove', rule: 'text', answer: 'in piazza', also: ['piazza', 'la piazza', 'In piazza'] }] },
    { id: 'F202', unit_id: 'U65', card: 'Mi chiamo Anna. Faccio colazione alle sette. Inizio il lavoro alle nove e finisco alle cinque.',
      fields: [{ key: 'name', label: 'Nome', rule: 'text', answer: 'Anna' }, { key: 'breakfast', label: 'Colazione', rule: 'text', answer: '7:00', also: ['7', '7.00', 'sette', 'alle sette', 'le sette'] },
        { key: 'start', label: 'Inizio del lavoro', rule: 'text', answer: '9:00', also: ['9', '9.00', 'nove', 'alle nove', 'le nove'] }, { key: 'end', label: 'Fine del lavoro', rule: 'text', answer: '17:00', also: ['5', '5:00', '17', '17.00', 'cinque', 'alle cinque', 'le cinque'] }] },
  ].map((f) => ({ id: f.id, unit_id: f.unit_id, card: f.card, fields_json: JSON.stringify(f.fields), status: DRAFT, notes: '' })),
  a1_texts: texts.map((t) => ({ id: t.id, unit_id: t.unit_id, kind: t.kind, title: t.title, lines: t.lines.join('\n'), questions_json: JSON.stringify(t.questions), source: 'written for Tamago', status: DRAFT, notes: '' })),
  a1_prompts: [
    { id: 'P201', unit_id: 'U62', prompt: 'Write a short message to a friend about your week: what you do on two days.', points: 'two days;what you do', min_words: 30, max_words: 40 },
    { id: 'P202', unit_id: 'U64', prompt: 'Write a short message to invite a friend out: what, which day and what time.', points: 'what;which day;what time', min_words: 30, max_words: 40 },
    { id: 'P203', unit_id: 'U65', prompt: 'Write a few lines about your day: when you have breakfast, work and have dinner.', points: 'when you have breakfast;when you work;when you have dinner', min_words: 30, max_words: 40 },
  ].map((x) => ({ ...x, status: DRAFT, notes: '' })),
}

const canDo = {
  U61: [['listening', 'Listening', 'I can understand the time when someone says it.'], ['speaking', 'Spoken interaction', 'I can ask what time it is and say it.']],
  U37: [['speaking', 'Spoken interaction', "I can say I didn't hear and ask someone to say it again."]],
  U62: [['speaking', 'Spoken production', 'I can say what day it is and how often I do something.']],
  U63: [['listening', 'Listening', 'I can understand dates and months.'], ['speaking', 'Spoken production', 'I can say when my birthday is.']],
  U38: [['speaking', 'Spoken interaction', 'I can ask for a moment to think.']],
  U64: [['speaking', 'Spoken interaction', 'I can make a simple plan with someone: what, when and where.']],
  U65: [['speaking', 'Spoken production', 'I can describe my day in simple words.']],
  U66: [['reading', 'Reading', 'I can understand simple signs and notices: open, closed, entrance, exit.']],
  U67: [['reading', 'Reading', 'I can find a departure or arrival time on a timetable.']],
  U39: [['speaking', 'Spoken interaction', "I can say I'm not sure or don't know."]],
  U68: [['listening', 'Listening', 'I can understand a short announcement at a station.']],
  U69: [['reading', 'Reading', 'I can follow short, simple instructions.']],
  U71: [['reading', 'Reading', 'I can understand the small words that link a sentence: but, or, if, without, between.']],
  U72: [['reading', 'Reading', 'I can recognise the words of a simple headline.']],
  U73: [['speaking', 'Spoken production', 'I can say what I do with everyday verbs: put, give, look, wait, try.']],
  U74: [['speaking', 'Spoken production', 'I can say what I like, prefer or hate, and give a simple opinion.']],
  U75: [['reading', 'Reading', 'I can understand words for towns, regions and the people who live there.']],
}

export default {
  part: 3, wordBase: 1201, vocabBase: 1401, cdBase: 401,
  slots: [{ slot_id: 'C05', part: 3, after_row: 17 }, { slot_id: 'C06', part: 3, after_row: 19 }],
  situation, vocab, items, canDo,
  // Turned off in review (2026-11-16): kept as ids, never shown.
  off: { preferire: 'the infinitive has no natural A1 line; preferisco teaches the list word' },
}
