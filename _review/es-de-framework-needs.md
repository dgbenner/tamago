# Spanish and German A1 Parts 3 and 4: framework needs

Branch `content/es-de-a1`, 2026-11-15. The parts are content only. Nothing in `src/` (outside the content folders),
`test/`, `server/` or `functions/` was changed. What the app still needs is listed here for the main builder.

## 1. The mock exam formats (the one thing that needs app code)

The brief asks for the final A1 check after Part 4 to be a mock exam in the real format. The format table is
`FORMATS` in `src/lib/finalcheck.js`, which only has `fr`; Spanish and German fall back to the general `PARTS`. The
content for both mock exams is in place (the a1_* tables of Parts 2 to 4); the two entries below are all that is
missing. Until they are added, the final check runs in the general format.

### Spanish: DELE A1

DELE A1 has four papers in this order: Comprensión de lectura, Comprensión auditiva, Expresión e interacción escritas,
Expresión e interacción orales. Reading comes first, unlike DELF.

```js
es: [
  { id: 'reading', label: 'Reading', paper: 'Comprensión de lectura', items: [['QT14', 3, 4], ['QT03', 2, 2]] },
  { id: 'listening', label: 'Listening', paper: 'Comprensión auditiva', items: [['QT04', 2, 3], ['QT17', 3, 4], ['QT11', 4, 2]] },
  { id: 'writing', label: 'Writing', paper: 'Expresión e interacción escritas', items: [['QT15', 4, 1], ['QT16', 5, 1], ['QT12', 4, 2]] },
  { id: 'speaking', label: 'Speaking', paper: 'Expresión e interacción orales', items: [['QT13', 5, 3]] },
],
```

And a `format` line for `EXAMS.es`, as French has: "A message, a notice, an ad and a menu or timetable to read;
numbers, prices and short lines to listen to; a form and a short message to write; then speaking."

What the Spanish tables hold for it: 33 Read and Answer texts (13 notices and small ads, 10 messages and postcards,
5 signs, 3 menus, 2 timetables), 38 Write the Number items (numbers, phone numbers, prices, times, dates), 7 forms,
10 Write a Message prompts.

If `finalItems` assumes listening is the first paper anywhere (results keyed by position rather than by `id`), check
that before putting reading first.

### German: Goethe-Zertifikat A1 (Start Deutsch 1)

See section 4.

## 2. Nothing else is needed for the parts to open

Parts 3 and 4 use only what French Parts 3 to 6 already use: `scripts/add-part.mjs`, the `parts` tab (status live),
Brush-Up slots C05 to C08, the a1_* tables, `units.borrow_words`. The tree, the part carousel, the part review and
the Developer page read all of it from the content.

## 3. Spanish notes for the main builder

- Workbooks: `_source/tamago-es-data-v8.xlsx` (Part 3) and `v9` (Part 4); `scripts/lib/course.mjs` points at v9.
- Part configs: `scripts/part3/es.mjs`, `scripts/part4/es.mjs`.
- Two PCIC spellings are taught in their current or Latin American form, so they don't count toward coverage:
  `guion` (the list has guión, which the Real Academia dropped in 2010) and `video` (the list has Spain's vídeo).
- `rico` ships with the hint "tasty; rich": Wiktionary's entry is rich, and the restaurant circle teaches está rico.
- `planta` is taught as a floor of a building and `cuarto` as a quarter of an hour; Tatoeba lines that use them as
  plant and as room or fourth were cut in review.

## 4. German: Goethe-Zertifikat A1 (Start Deutsch 1)

The exam's papers are Hören, Lesen, Schreiben and Sprechen, in that order. Schreiben is exactly a form and a short
message, so the entry has no typed lines.

```js
de: [
  { id: 'listening', label: 'Listening', paper: 'Hören', items: [['QT17', 3, 4], ['QT04', 2, 4], ['QT11', 4, 2]] },
  { id: 'reading', label: 'Reading', paper: 'Lesen', items: [['QT14', 3, 5], ['QT03', 2, 2]] },
  { id: 'writing', label: 'Writing', paper: 'Schreiben', items: [['QT15', 4, 1], ['QT16', 5, 1]] },
  { id: 'speaking', label: 'Speaking', paper: 'Sprechen', items: [['QT13', 5, 3]] },
],
```

And a `format` line for `EXAMS.de`: "Numbers, times, prices and announcements to listen to; messages, notices and
signs to read; a form and a short message to write; then speaking."

What the German tables hold for it: 40 Write the Number items (15 numbers, 10 times, 8 prices, 4 dates, 3 phone
numbers), 33 Read and Answer texts (11 notices, 10 messages, 6 signs, 4 menus, 2 timetables), 7 forms, 11 Write a
Message prompts.

## 5. German notes for the main builder

- Workbooks: `_source/tamago-de-data-v8.xlsx` (Part 3) and `v9` (Part 4); `scripts/lib/course.mjs` points at v9.
  Part configs: `scripts/part3/de.mjs`, `scripts/part4/de.mjs`.
- `scripts/a1-coverage.mjs` has a German entry in its alias map (`ELIDED`), beside the French one. The Goethe list
  writes stems and verb partners (ander, jed, dies, letzt, nächst, best, all, welch, meist, weh tun, Rad fahren, sich
  kümmern) and the course teaches the full forms (andere, jeder, diese …). The map counts 12 list words that way.
  Without it German stands at 560 of 627, with it 572.
- The analyser folds capital letters, so Reise, Liebe and Mal were read as reise, liebe and mal. Those lines were cut
  in review; Fable's candidates may hold the same trap. A case-aware analyser for German would be the real fix.
- nächste and nächsten resolve to the lemma nah on Wiktionary ("superlative of nah"); the hint says "next; nearest".
- A few German Read and Answer texts use words the course doesn't teach (Schwimmbad, Ferien, Fest, Knopf, Anfänger,
  Miete, Eis), and a few Spanish ones do too (Llegada, baile, busca, Se alquila). Noted in case
  texts should be held to course words.
- German Part 2 still has one Read and Answer text per circle (U47, U48, U49), where Parts 3 and 4 have three. Spanish
  Part 2 is the same. French Part 2 was brought to three with `scripts/part2/fr-texts.mjs` and `scripts/add-items.mjs`;
  the same could be done for both.
- Five old Part 2 rejects of "Wie spät ist es" lines were taken out of `content-de/sweep/packs-review.json`, since
  Part 3 teaches the time. The pull did not pick them; "Wie spät ist es?" is a draft in U61.

## 6. Test time

`test/lesson.test.js` and `test/choices.test.js` now take many minutes with two more parts in each of two courses
(a full `npm test` ran about 30 minutes on this machine while builds were running beside it). Nothing fails; the
tests walk every lesson of every course. Worth a look before the pre-push hook depends on them.

## 7. After Fable's reviews (2026-11-15)

Fable's reviews of Spanish Parts 3 and 4 are applied on this branch. Three things in them need app code:

- **A verb form whose table would mislead.** The Glossary shows a present-tense table for any word that is a Verb
  whose lemma has one (`src/App.jsx` `tableOf`). Spanish quisiera (lemma querer) and German hätte, möchten and war
  never appear in those tables. Their hints now carry the short note ("I would like (a fixed polite form of
  querer)"), but hiding the table needs a flag the content can set, for example `no_table` on the word, read by
  `tableOf`. Content alone can't do it: the lemma comes from Wiktionary's form-of line.
- **Type the Word and regional alternates.** The Spain wording of a sentence is an accepted answer wherever the
  Mexican word is taught (review-decisions `accepted_additions`, direction en_to_fr, each with a keep ruling). Type
  the Word (QT18) checks a single word and has no such list, so a learner who types coche for car is marked wrong.
  A per-word `also` list would cover it.
- **Reflexive verbs.** lavarse, bañarse, dedicarse, llamarse, levantarse and ducharse have no table of their own;
  the tables shown are lavar, bañar and so on without the pronouns. A table with me, te, se would need the reader
  and the Verbs screen to carry the pronoun.

Spanish coverage after the switch to Mexican words: 479 of 534 PCIC words (90%), from 500 (94%). The PCIC list is
Spain's, so each word the course now teaches in its Mexican form (carro, lentes, departamento, mesero, bolsa,
manejar, rentar, credencial, timbre, recámara, clóset, librero, borrador, pizarrón, tarea, básquetbol, café for
brown, derecho) no longer counts for its Spain twin. `scripts/a1-coverage.mjs` could count a list word as taught
when its regional twin is (an alias map, as German and French have); that is a measuring choice for Dan.

Workbooks: Spanish is now v11. v8 and v9 come from the part configs, v10 from `scripts/review/es-part3.mjs`
(carro for coche) and v11 from `scripts/review/es-part4.mjs` (departamento, lentes, prompts at 30 to 40 words).

## 8. German after Fable's reviews (2026-11-15)

Fable's reviews of German Parts 3 and 4 are applied on this branch. What they leave for the app:

- **The Goethe speaking round.** Sprechen Teil 1 ends with spelling a word and saying a number. The speaking paper in
  the proposed `FORMATS.de` is three QT13 lines; to mirror the exam, the last should be two short ungraded prompts:
  "Spell your family name" (German teaches this in U34 Spelling It Out: Wie schreibt man das?, buchstabieren,
  Buchstabe) and "Say your phone number" or a number from an a1_listen item (15 number and 3 phone items; U42 Phone
  Numbers, U44 Numbers to 100). No question type does this today; it needs a small speaking prompt type or a fixed
  pair of prompts in `finalcheck.js`. Until then the round is three spoken lines.
- **hätte, möchten, war** (and Spanish quisiera): see section 7. A rule that would work without a flag: show no table
  when the word's form is not in its lemma's present table (separable forms such as stehe / stehe auf need a looser
  match).
- **Which verbs get a table.** `scripts/check-content.mjs` `verbLemmas` takes an infinitive only when it ends in
  -er, -ir or -re, which fits French and skips German -en and Spanish -ar infinitives. On this branch the missing
  verbs were added through each circle's `conjugation_lemma` (72 German verbs, a dozen Spanish ones), so every one
  has a table, but a grammar note now shows every table of its circle: German U69 Instructions shows 13 and U73
  shows 8. Widening that test (any infinitive the course teaches) would let the lists come back out of the notes.
- **German conjugation reader.** `german()` in `scripts/lib/conjugation.mjs` now reads the verb page's own template.
  A page that opens with `==German==` has no line break before the heading, the shared reader missed the section
  and fell back to a bare template that guesses regular forms (nehmst, nehmt). Other languages' readers may have
  the same blind spot for a page whose first section is theirs.
- Gleis: Wiktionary has "(individual) track" and no "platform" sense; the hint says "platform, track (Gleis 3)".
