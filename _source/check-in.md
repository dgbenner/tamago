# Tamago check-in

Updated November 14, 2026. **New: Italian is merged and wired in, visible only while Developer is on; its audits are clean. Earlier today: French Parts 3 and 4 are built; FLELex core coverage is 435 of 600 (73%, was 40%). Capitals and accents now get a note in the answer bar. Fable reviews the Part 3 and Part 4 candidates and drafts together; nothing is swapped.**

## Done since last check-in

- **Portuguese merged, Developer only:** wired by Builder 2; ACESSO (A1) confirmed; the every-lesson check went from 4 accent issues to 0. Senses re-picked: 8.
- **Match Pairs:** tapping a selected tile again deselects it; a wrong pair always returns both tiles.

- **Fable's Part 3 and 4 review applied:** 541 Use candidates (529 new rows), 12 swaps, 7 draft fixes, 4 Read and Answer fixes, 35 Glossary senses fixed across all four parts. Audits clean.
- **Choices:** never two one accent apart (ou/où, a/à, la/là).
- **Language picker:** alphabetical; one row of six on desktop and iPad, 3 + 3 on phones.
- **Italian core:** Kelly's 600 most frequent A1 words, 90 taught (15%).

- **Italian, Developer only:** Builder 2's branch merged into main and wired into every per-course list. With Developer off it shows as Coming Soon. Audits on Italian Part 1: word audit 0 and 0 (665 lessons), every-lesson check 0 (6,650 questions), browser pass 0 flags.

- **Capitals and accents:** a missing capital or accent counts as right by default, and the answer bar shows a short note with the letter in bold ("Don't forget the capital: **D**an", "Watch the accent: caf**é**"). In Strict both count as wrong. Answers built from word chips can't miss a capital, since chips are shown in lower case.
- **French Part 3, Time and Plans:** 17 circles, Brush-Up C05 and C06, and 32 task items.
  - Nine situation circles: telling the time, days, months and seasons, making plans, my day, signs and notices, timetables, announcements, instructions.
  - Three help circles: Didn't Catch That, Thinking It Over, Not Sure.
  - Five vocabulary circles: Little Words, Me + You, Doing Things, Likes + Opinions, Places to Visit.
  - Read and Answer has three texts in each circle that uses it, so a circle doesn't repeat one.
- **French Part 4, Out and About:** 17 circles, Brush-Up C07 and C08, and 28 task items.
  - Nine situation circles: the café, the restaurant, asking the way, following directions, where things are, shops, getting around, travelling, comparing.
  - Three help circles: Excuse Me, I'm Lost, Explaining a Problem.
  - Five vocabulary circles: Clothes, Linking Words, Sport, Telling + Asking, Changing + Deciding.
- **FLELex core 600:** 240 (40%) to 358 (60%) after Part 3, and 435 (73%) after Part 4.
- **Tasks now covered:** T05 (times, days and plans), T07 (ordering food and drink), T08 (directions), T09 (signs and timetables), T12 (announcements and instructions), alongside T01 to T04 and T13.
- **Audits:** both clean on Parts 3 and 4. The Part 3 browser pass found 13 Read and Answer texts that repeated a choice between their two questions; they're fixed, down to 0.

## Waiting for Dan

- **Italian approval:** once approved, drop `devOnly` in src/lib/course.js.

- **(Done) Fable's review of Parts 3 and 4 together:**
  - Part 3: _review/french-part3-candidates.md (639 candidates for 144 drafts) and _review/french-part3-drafts.md.
  - Part 4: _review/french-part4-candidates.md (478 candidates for 100 drafts) and _review/french-part4-drafts.md.
- **Native-speaker check:** the new drafts join the list.
