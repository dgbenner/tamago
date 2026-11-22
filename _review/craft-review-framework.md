# Tamago craft review: the new framework

November 14, 2026. Rubric: `_source/craft-review.md` (nine criteria, 1 to 5). Change no code. Screenshots in `_review/craft-screens/`, named `<screen>-<device>-<mode>.png`.

## What was reviewed and how

- **Where:** the working tree at commit 63112eb, served by its own Vite dev server. The live site's bundle does not yet carry the framework (no parts carousel, Grammar Note, Brush-Up or chat bubbles in `index-DJbPRX3S.js`), so the live address could not show these screens. The dev server also allowed `?try=QT14` and the rest, which open a lesson of one question type.
- **Playwright**, Chrome channel: desktop 1280 × 800, and iPhone 13 emulation (390 × 844 at 3×, touch); each in light and dark (`colorScheme`). Four passes, 86 screenshots.
- **Screens:** the tree with the parts carousel (carousel opened on "Everyday Life", then stepped to "Time and Plans"); the Say Hi grammar note from the notebook icon; one lesson each of Read and Answer, Fill the Form, Write a Message, Write the Number and Answer the Question; the answer bar right (the form filled from its card, a phone number written after Show Words, a chat reply) and wrong (Read and Answer, the form, Write the Number, the chat).
- **Timing:** Continue to the next question 29 to 56 ms over eight transitions (the next question's text was on screen within one frame). The opening screen holds 3.4 to 4.2 s on every load, as designed.
- **Write the Number:** no "Can't Listen Now" link appears on this type, so the words-on-screen state was reached with Show Words after one replay; the heading stays "Write What You Hear" in both states.
- Developer was on (the default), so the type label at the lower left is in every lesson shot. Claude's notes on Write a Message never arrived (no key on the dev server).

## Grades per screen

### Tree with the parts carousel

Screenshots: `home-tree-desktop-light`, `home-carousel-desktop-light`, `home-carousel-next-desktop-light`, `home-tree-phone-light`, `home-carousel-phone-light`, `home-tree-desktop-dark`, `home-carousel-desktop-dark`, `home-tree-phone-dark`

| Criterion | Grade | Reason (grades under 4) |
| --- | --- | --- |
| No dead time | 4 |  |
| One thing on screen | 4 |  |
| Obvious in one second | 3 | The carousel card is a lock, "A1", six pills and a title; nothing says it is the next part or what the pills count (home-carousel-desktop-light). |
| Consistency | 4 |  |
| Typography and spacing | 3 | On the phone the card is half empty below its three lines, sized to the tallest card in the set (home-carousel-phone-light). |
| Light and dark | 4 |  |
| Tone | 4 |  |
| Single bite | 4 |  |
| Feedback and states | 4 |  |

Screen average: **3.8**

### Grammar note

Screenshots: `grammar-note-desktop-light`, `grammar-note-phone-light`, `grammar-note-desktop-dark`, `grammar-note-phone-dark`

| Criterion | Grade | Reason (grades under 4) |
| --- | --- | --- |
| No dead time | 4 |  |
| One thing on screen | 4 |  |
| Obvious in one second | 4 |  |
| Consistency | 4 |  |
| Typography and spacing | 3 | The verb table is cut mid-row at the sheet's fold with no fade or scroll hint; "être, present" hangs as a heading with nothing under it (grammar-note-desktop-light). |
| Light and dark | 4 |  |
| Tone | 4 |  |
| Single bite | 4 |  |
| Feedback and states | 4 |  |

Screen average: **3.9**

### Read and Answer (QT14)

Screenshots: `qt14-read-desktop-light`, `qt14-read-phone-light`, `qt14-wrong-desktop-light`, `qt14-wrong-desktop-dark`, `qt14-read-phone-dark`, `bar-wrong-qt14-phone-light`

| Criterion | Grade | Reason (grades under 4) |
| --- | --- | --- |
| No dead time | 4 |  |
| One thing on screen | 3 | The second question and its choices sit below the fold on both devices, and on the phone the Developer type label prints over the question text (qt14-read-phone-light). |
| Obvious in one second | 3 | Nothing says there is a second question further down, and the task submits itself on the last pick; a learner who stops after the first question waits for nothing (qt14-read-desktop-light). |
| Consistency | 3 | The only type that checks without a Check button; everywhere else Check is the one commitment (qt14-read-desktop-light). |
| Typography and spacing | 4 |  |
| Light and dark | 4 |  |
| Tone | 4 |  |
| Single bite | 4 |  |
| Feedback and states | 3 | The bar says "Incorrect" and nothing else; the green and red marks are in the question, and on desktop the bar covers the second question's marks (qt14-wrong-desktop-light). |

Screen average: **3.6**

### Fill the Form (QT15)

Screenshots: `qt15-form-desktop-light`, `qt15-form-phone-light`, `qt15-checked-desktop-light`, `qt15-checked-desktop-dark`, `qt15-right-desktop-light`, `qt15-right-phone-light`

| Criterion | Grade | Reason (grades under 4) |
| --- | --- | --- |
| No dead time | 4 |  |
| One thing on screen | 4 |  |
| Obvious in one second | 4 |  |
| Consistency | 4 |  |
| Typography and spacing | 4 |  |
| Light and dark | 4 |  |
| Tone | 4 |  |
| Single bite | 4 |  |
| Feedback and states | 4 |  |

Screen average: **4.0**

### Write a Message (QT16)

Screenshots: `qt16-message-desktop-light`, `qt16-message-phone-light`, `qt16-typed-desktop-light`, `qt16-done-desktop-light`, `qt16-done-desktop-dark`, `qt16-done-phone-light`

| Criterion | Grade | Reason (grades under 4) |
| --- | --- | --- |
| No dead time | 4 |  |
| One thing on screen | 3 | The prompt names the three points in its sentence and then lists the same three as bullets (qt16-message-desktop-light). |
| Obvious in one second | 4 |  |
| Consistency | 4 |  |
| Typography and spacing | 4 |  |
| Light and dark | 4 |  |
| Tone | 4 |  |
| Single bite | 4 |  |
| Feedback and states | 3 | After Done the bar says "Done." and the page goes quiet; nothing says whether notes are coming, and with the key unset they never do (qt16-done-desktop-light). |

Screen average: **3.8**

### Write the Number (QT17)

Screenshots: `qt17-hear-desktop-light`, `qt17-hear-phone-light`, `qt17-words-desktop-light`, `qt17-words-desktop-dark`, `qt17-words-phone-dark`, `qt17-right-desktop-light`, `qt17-answered-phone-light`

| Criterion | Grade | Reason (grades under 4) |
| --- | --- | --- |
| No dead time | 4 |  |
| One thing on screen | 4 |  |
| Obvious in one second | 3 | Two instructions stacked: the heading "Write What You Hear" and the line "Write the number"; the Developer label calls the same screen "Write the Number" (qt17-hear-desktop-light). |
| Consistency | 3 | The field arrives already focused with a heavy black double ring that no other type shows on arrival, and the heading does not match the type's name (qt17-hear-desktop-light). |
| Typography and spacing | 4 |  |
| Light and dark | 4 |  |
| Tone | 4 |  |
| Single bite | 4 |  |
| Feedback and states | 4 |  |

Screen average: **3.8**

### Answer the Question, the chat (QT09)

Screenshots: `qt09-chat-desktop-light`, `qt09-chat-phone-light`, `qt09-chat-reply-desktop-light`, `qt09-chat-answered-desktop-light`, `qt09-chat-answered-phone-light`, `qt09-chat-answered-desktop-dark`, `qt09-chat-answered-phone-dark`

| Criterion | Grade | Reason (grades under 4) |
| --- | --- | --- |
| No dead time | 4 |  |
| One thing on screen | 3 | Before the question is revealed the yellow bubble is a box holding another box (the speaker button), and the reply is an empty blue slab; on the phone they fill the top half (qt09-chat-phone-light). |
| Obvious in one second | 3 | No heading, a bubble with only a speaker, and an empty blue block: a new learner has to guess that the speaker plays the question and the block is where the reply goes (qt09-chat-phone-light). |
| Consistency | 4 |  |
| Typography and spacing | 3 | The empty reply bubble is a full-width 72 px slab with nothing in it, and once revealed every word of the question carries a dotted underline that reads as a spelling mark (qt09-chat-answered-phone-light). |
| Light and dark | 4 |  |
| Tone | 4 |  |
| Single bite | 4 |  |
| Feedback and states | 4 |  |

Screen average: **3.7**

### Answer bar, right

Screenshots: `bar-right-qt15-desktop-light`, `bar-right-qt15-phone-light`, `qt17-answered-phone-light`, `qt09-chat-answered-phone-light`, `bar-right-qt15-desktop-dark`

| Criterion | Grade | Reason (grades under 4) |
| --- | --- | --- |
| No dead time | 5 |  |
| One thing on screen | 4 |  |
| Obvious in one second | 4 |  |
| Consistency | 4 |  |
| Typography and spacing | 4 |  |
| Light and dark | 4 |  |
| Tone | 4 |  |
| Single bite | 4 |  |
| Feedback and states | 4 |  |

Screen average: **4.1**

### Answer bar, wrong

Screenshots: `bar-wrong-qt14-desktop-light`, `bar-wrong-qt15-desktop-light`, `qt17-right-desktop-light`, `qt09-chat-answered-desktop-dark`, `bar-wrong-qt14-phone-light`

| Criterion | Grade | Reason (grades under 4) |
| --- | --- | --- |
| No dead time | 4 |  |
| One thing on screen | 4 |  |
| Obvious in one second | 4 |  |
| Consistency | 3 | Two kinds of wrong bar: Write the Number and the chat show the right answer under "Incorrect", Read and Answer and the form show the word alone (qt17-right-desktop-light, bar-wrong-qt14-desktop-light). |
| Typography and spacing | 4 |  |
| Light and dark | 4 |  |
| Tone | 4 |  |
| Single bite | 4 |  |
| Feedback and states | 3 | On Read and Answer and the form the bar carries no answer; the correction is in the question, and on desktop the bar hides part of it (bar-wrong-qt14-desktop-light). |

Screen average: **3.8**

## Summary table

| Criterion | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | Avg |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| No dead time | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 5 | 4 | 4.1 |
| One thing on screen | 4 | 4 | 3 | 4 | 3 | 4 | 3 | 4 | 4 | 3.7 |
| Obvious in one second | 3 | 4 | 3 | 4 | 4 | 3 | 3 | 4 | 4 | 3.6 |
| Consistency | 4 | 4 | 3 | 4 | 4 | 3 | 4 | 4 | 3 | 3.7 |
| Typography and spacing | 3 | 3 | 4 | 4 | 4 | 4 | 3 | 4 | 4 | 3.7 |
| Light and dark | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4.0 |
| Tone | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4.0 |
| Single bite | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4.0 |
| Feedback and states | 4 | 4 | 3 | 4 | 3 | 4 | 4 | 4 | 3 | 3.7 |

Columns: 1 tree and carousel, 2 grammar note, 3 Read and Answer, 4 Fill the Form, 5 Write a Message, 6 Write the Number, 7 Answer the Question, 8 answer bar right, 9 answer bar wrong.

**Overall grade: 3.8** (the average of the nine criterion averages). Nothing on the never-acceptable list appeared: no hearts, gems, timers, celebrations or spinners, and nothing unreadable in either mode.

## The ten most valuable fixes, ranked

1. **Read and Answer: show the whole task before it submits.** Screenshot: `qt14-read-desktop-light, qt14-wrong-desktop-dark`. The second question sits below the fold on both devices and the task checks itself on the last pick. Add a Check button like every other type, and keep both questions in view (a smaller sign card on desktop, or one question at a time). Lifts criterion 3, 4, 9.
2. **The wrong bar on Read and Answer and the form says "Incorrect" and nothing more.** Screenshot: `bar-wrong-qt14-desktop-light, qt15-checked-desktop-light`. The corrections live in the question, which the bar partly covers on desktop. Put one line in the bar ("1 of 2 right" or the first expected value) or scroll the first wrong item into view above the bar. Lifts criterion 9, 4.
3. **The chat before the question is revealed is boxes inside boxes.** Screenshot: `qt09-chat-phone-light, qt09-chat-desktop-light`. The yellow bubble holds a framed speaker button; the reply is an empty blue slab the full width of the screen. Let the speaker sit bare in the bubble (one frame), and start the reply bubble as a short line that grows with the first chip. Lifts criterion 2, 3, 5.
4. **Write the Number has two instructions and two names.** Screenshot: `qt17-hear-desktop-light, qt17-hear-phone-light`. The heading says "Write What You Hear", the next line "Write the number", the type label "Write the Number". One heading, "Write the Number" (or "Write the Phone Number", "Write the Price"), and no second line. Lifts criterion 3, 4.
5. **The parts carousel card does not say what it is.** Screenshot: `home-carousel-desktop-light, home-carousel-phone-light`. A lock, "A1", six pills and a title. Add a quiet kicker ("Part 2 · Next") and let the pills carry a title; on the phone size the card to its content rather than the tallest card. Lifts criterion 3, 5.
6. **The Developer type label prints over content on the phone.** Screenshot: `qt14-read-phone-light, qt15-form-phone-light`. It sits over "When is the market on?" and "Ville". Give it a page-colour backing, or move it into the top bar beside the progress line. Lifts criterion 2.
7. **Write a Message says its three points twice and goes quiet after Done.** Screenshot: `qt16-message-desktop-light, qt16-done-desktop-light`. Keep the bullets, shorten the sentence to the task ("Write a short message to a new friend."). After Done, one muted line where the notes will appear ("Notes on your message arrive here") and none when the feature is off. Lifts criterion 2, 9.
8. **Write the Number arrives with a heavy black focus ring.** Screenshot: `qt17-hear-desktop-light, qt17-hear-phone-light`. The autofocused field shows the 3 px ink ring before any key is pressed, which reads as an error outline in light mode. Focus the field without the visible ring (as headings are), or let the ring appear on the first keypress. Lifts criterion 5, 9.
9. **The grammar note cuts its verb table at the fold.** Screenshot: `grammar-note-desktop-light, grammar-note-phone-light`. "être, present" is a heading with its first row sliced off. A fade at the sheet's bottom edge, or the table starting above the fold, tells the learner there is more. Lifts criterion 5.
10. **Dotted underlines under every word of the revealed question.** Screenshot: `qt09-chat-answered-phone-light, qt09-chat-answered-desktop-dark`. Each word of "Tu es un homme ?" is underlined in dots, the mark proofreaders use for errors. Use the course's orange new-word dot on new words only, or no mark. Lifts criterion 5, 9.

## Smaller notes, not ranked

- "Right!" is the one exclamation mark in the lesson; "Right." would match "Done." and "Incorrect".
- Fill the Form labels are French (Nom, Prénom, Âge); that is the task, but Nom for last name is a known trap, and the bar could say "Nom is the last name" the first time it is missed.
- The carousel's "Dev: Jump Here" is tiny and unboxed as specified; it still reads as a stray caption to anyone not told what it is.
- On the phone the tool tiles take the top third of home before the tree starts; the desktop panel version reads better.
- The dark mode is designed, not inverted: the sign card, the form fields, the navy reply bubble and the light-blue focus ring on Continue all hold.
- Everything measured was quick: no spinner, no hold between questions, no screen after Continue.
