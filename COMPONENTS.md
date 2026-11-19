# Components

The parts of Tamago's design system, on the `design-system` branch (a demonstration; not in the live app). Each one is shown with all its states in Storybook: `npm run storybook`, then http://localhost:6006/.

## Styles

Every component can be drawn in three styles: **Tamago** (the app's own, and the only one the app uses), **iOS** and **Android**. In Storybook, pick one with the Style switch in the toolbar. Each entry below has a "Styles" line saying how its iOS and Android versions are made: either a Konsta UI component given Tamago's colors (`src/components/platform/`), or Tamago's own component adapted by a stylesheet (`.storybook/platform.css`). Usage is the same in every style: the component reads the style from `StyleProvider` (`src/components/style/StyleContext.jsx`); with no provider, as in the app, it is Tamago.

```jsx
<StyleProvider style="ios" parts={platformParts}>
  <Button kind="main">Check</Button>
</StyleProvider>
```

## ChoiceList

- **File:** `src/components/ChoiceList.jsx`
- **What it's for:** a column of answer choices in a lesson, where one tap picks and the pick is checked at once (Pick the Meaning, Fill the Blank).
- **Styles:** Konsta UI's List on iOS and Android (rows in one block; a green check or "Incorrect" at the row's end).
- **Main settings:**
  - `choices`: the texts to show, in order.
  - `answer`: the right choice.
  - `chosen`: the choice the learner tapped, or `null`.
  - `result`: `null` until answered. Once set, the choices can no longer be tapped: the right one gets a green edge, a wrong pick a red edge with "Incorrect", the others fade.
  - `onPick(choice)`: called with the tapped choice.
  - `lang`: the language of the choices (`"en"` or the course language), for screen readers.

```jsx
<ChoiceList
  choices={['Good evening', 'Good morning', 'Good night']}
  answer="Good evening"
  chosen={chosen}
  result={result}
  lang="en"
  onPick={(choice) => setChosen(choice)}
/>
```

## AnswerBar

- **File:** `src/components/AnswerBar.jsx`
- **What it's for:** the bar pinned to the bottom of a lesson once a question is answered. It gives the verdict ("Right!" or "Incorrect"), the translation or the right answer, notes on accents and capitals, and the Continue button.
- **Styles:** Tamago's own, adapted (iOS: translucent bar, thin edge; Android: rounded top corners and a shadow, no colored edge, and a small check or X beside the verdict). Its Continue button is the platform's Button.
- **Main settings:**
  - `q`: the question (its type, the sentence in both languages, the answer shown).
  - `result`: how the answer went (`correct`, what the learner `given`, flags such as `accent` or `typo`).
  - `cantListen`: `true` keeps the bar silent; otherwise it plays the sentence as it appears.
  - `flagReasons`: the reasons offered under the flag button.
  - `onFlag(reasonId)`: called when the learner flags the question.
  - `onContinue()`: called by Continue.
- **Good to know:** the Why? button shows only for a wrong typed answer, and only once an explanation has arrived from the server.

```jsx
<AnswerBar
  q={question}
  result={{ correct: false, given: 'Un thé, merci.' }}
  cantListen={false}
  flagReasons={content.flag_reasons}
  onFlag={(reasonId) => saveFlag(question, reasonId)}
  onContinue={nextQuestion}
/>
```

## Sheet, with SheetHead

- **File:** `src/components/Sheet.jsx`
- **What it's for:** details shown over the page: a bottom sheet on a phone, a centered pop-up from 1024 px wide. It dims the page behind, keeps keyboard focus inside, and closes on Escape or a tap outside. SheetHead is its top row: a small line above the title, the title, and a close button.
- **Styles:** Konsta UI's Sheet on phones and Popup on desktop; SheetHead is Tamago's own, adapted. The keyboard behaviour (`useSheetFocus`) is shared by all three.
- **Main settings:**
  - Sheet `onClose()`: called by Escape or a tap outside.
  - Sheet `children`: what goes inside, starting with a SheetHead.
  - SheetHead `title`: the heading; it also names the sheet for screen readers.
  - SheetHead `kicker`: an optional small line above the title.
  - SheetHead `onClose()`: called by the close button.

```jsx
<Sheet onClose={close}>
  <SheetHead kicker="Grammar Note" title="At the Café" onClose={close} />
  <p className="mt-2 text-muted">Ordering politely.</p>
  <button onClick={start} className="btn-submit mt-5 w-full">Start Lesson</button>
  <button onClick={close} className="btn-tertiary">Back</button>
</Sheet>
```

## Button

- **File:** `src/components/Button.jsx`
- **What it's for:** the app's buttons by kind, so the look is chosen by one word instead of a class name.
- **Styles:** Konsta UI's Button on iOS (capsule) and Android (fully rounded, ripple), in Tamago's yellow and green.
- **Main settings:**
  - `kind`: `main` (yellow, the main action: Check, Done, Start Lesson), `continue` (green: Continue), `outline` (outlined), `link` (a quiet text link: Back, Slow, Can't Listen Now). Each maps to one of the app's classes (`btn-submit`, `btn-primary`, `btn-secondary`, `btn-tertiary`), which keep their names.
  - `className`: extra layout classes, such as `w-full`.
  - Everything else (`onClick`, `disabled`, and so on) passes straight to the button.

```jsx
<Button kind="main" disabled={!text} onClick={check} className="w-full">Check</Button>
<Button kind="link" onClick={back}>Back</Button>
```

## ProgressBar

- **File:** `src/components/ProgressBar.jsx`
- **What it's for:** the green bar at the top of a lesson. The fill slides to each new value.
- **Styles:** Konsta UI's Progressbar on iOS and Android, in Tamago's green.
- **Main settings:**
  - `value`: how far along, from 0 to 1.
  - `label`: the name read by screen readers (default "Lesson progress").

```jsx
<ProgressBar value={answered / total} />
```

## QuestionHeading

- **File:** `src/components/QuestionHeading.jsx`
- **What it's for:** the text of a question's heading ("Translate", "Pick the Meaning"). From Part 3 it is in the course language; a tap shows the English beside it.
- **Styles:** Tamago's own, adapted (iOS: 22pt bold; Android: 22sp regular).
- **Main settings:**
  - `english`: the heading in English.
  - `part`: the part of the course the question belongs to; decides the language.

```jsx
<h1 className="text-xl font-semibold"><QuestionHeading english="Pick the Meaning" part={3} /></h1>
```

## AudioHelp

- **File:** `src/components/AudioHelp.jsx`
- **What it's for:** the play button on every listening question. After the first replay, two text links appear beside it: Slow and Show Words.
- **Styles:** Tamago's own, adapted (iOS: round borderless button; Android: 16dp corners with a shadow). Slow and Show Words are the platform's text buttons.
- **Main settings:**
  - `audio`: what to play (a recording, or text for the device voice).
  - `words`: what to show when Show Words is tapped.
  - `wordsShown`: `true` once they are showing.
  - `onShowWords()`: called by Show Words.
  - `bare`: `true` inside a speech bubble, where the button has no frame of its own.
  - `label`: the button's name for screen readers.

```jsx
<AudioHelp audio={q.audio} words={<p>{q.french}</p>} wordsShown={shown} onShowWords={() => setShown(true)} />
```

## SentenceText (FrenchText and FirstSight)

- **File:** `src/components/SentenceText.jsx`
- **What it's for:** FrenchText is the sentence in the course language, each word tappable for its meaning. FirstSight is the line under it that gives a new word's meaning the first time it appears.
- **Styles:** Tamago's own, adapted (the hint is a popover on iOS and Material's small tooltip on Android).
- **Main settings:**
  - `q`: the question; its `segments` are the words, each with its hint.
  - `newWords`: the ids of words new in this lesson; they get an orange dot.
  - `onHint(segment)`: called when a hint is opened.
  - FrenchText `blankIndex`, `filled`: turns one word into a gap (Fill in the Blank) and fills it.
  - FrenchText `markNewOnly`: underline only the new words.
  - FirstSight `except`: a word to leave out (the blank).

```jsx
<FrenchText q={q} newWords={newWords} onHint={logHint} />
<FirstSight q={q} newWords={newWords} />
```

## CircleNode

- **File:** `src/components/CircleNode.jsx`
- **What it's for:** a lesson circle on the main page: the sushi on a disc, a ring that fills as lessons are done, and the title.
- **Styles:** Tamago's own, adapted (title type and press feedback; the disc, ring and sushi are the same everywhere).
- **Main settings:**
  - `title`, `icon`: the name and the sushi picture.
  - `lessonsDone`, `lessonsTotal`: how full the ring is. Equal means finished.
  - `recall`: from 0 to 1; a finished ring fades as recall drops.
  - `early`: `true` for a circle ahead of the learner: faded, still tappable.
  - `marker`: `"start"` shows "Start Here" above the first circle.
  - `onPick()`: called by a tap. `onInfo()`, `onNote()`: add the two small icons. On phones they sit above the circle like ears, info at the upper left and the grammar note at the upper right up and out from the ring with clear space between (Dan, 2026-11-19; this branch only, the live app still has them beside the circle). From 1024 px they sit beside the circle, as before. On phones the pair is also quieter (28% strength at rest, against 40% on wide screens) and the notebook is drawn 5% smaller than the info icon, so the two look the same size. Wide screens are exactly as before. A circle shows the notebook only when it is given `onNote`; in the app that is a circle with a grammar note.
  - `caption`, `badge`, `ring`: for a Brush-Up (a line under the title, a count, no ring).

```jsx
<CircleNode title="At the Café" icon="/sushi/nigiri/aburi-salmon-nigiri.webp" lessonsDone={8} lessonsTotal={20} onPick={startLesson} />
```

## ToolTile (ToolPill and ToolCard)

- **File:** `src/components/ToolTile.jsx`
- **What it's for:** one tool on the main page (Glossary, Verbs, Progress). ToolPill is the phone shape, a pill in a sideways strip. ToolCard is the wide-screen shape, a card with a line of description.
- **Styles:** ToolPill is Konsta UI's Chip on iOS and Android (32 px tall, with invisible touch padding to 44 px on iOS and 48 px on Android); ToolCard is Tamago's own, adapted.
- **Main settings:**
  - `tool`: `{ id, label, about, onOpen, quiet }`. `id` picks the icon; `quiet` is Developer's dashed, muted look.

```jsx
<ToolPill tool={{ id: 'glossary', label: 'Glossary', onOpen: openGlossary }} />
<ToolCard tool={{ id: 'glossary', label: 'Glossary', about: 'Every word, with its meaning', onOpen: openGlossary }} />
```

## FlagRow

- **File:** `src/components/FlagRow.jsx`
- **What it's for:** the grid of course flags, on the opening screen and in Settings. Courses not ready yet are faded and say "Coming Soon" when tapped.
- **Styles:** Tamago's own, adapted (the running course: an outline on iOS, a tinted background on Android).
- **Main settings:**
  - `size`: `md` (Settings; the running course is outlined) or `lg` (the opening screen).
  - `onPick(courseId)`: called with the chosen course. Without it, a tap switches course and reloads the app.

```jsx
<FlagRow size="lg" onPick={(id) => chooseCourse(id)} />
```

## Logo (Logo, LogoInline, SushiMark)

- **File:** `src/components/Logo.jsx`
- **What it's for:** Logo is the full logo, the three-line wordmark with the sushi in front. LogoInline is the main page's header wordmark, one yellow line. SushiMark is the sushi picture alone.
- **Styles:** The same in every style; it is the brand.
- **Main settings:**
  - `className` on LogoInline and SushiMark, for size and position. Logo takes none.

```jsx
<Logo />
<LogoInline />
<SushiMark className="w-full" />
```

## LevelLine

- **File:** `src/components/LevelLine.jsx`
- **What it's for:** the thin line across the tree that names the level reached ("Early A1"). A list item, because the tree is a list.
- **Styles:** Tamago's own, adapted (hairline and small capitals on iOS; 1dp line and a medium label on Android).
- **Main settings:**
  - `label`: the level's name.

```jsx
<LevelLine label="Early A1" />
```

## Toast

- **File:** `src/components/Toast.jsx`
- **What it's for:** a short message that slides down from the top, holds about 3 seconds and leaves by itself.
- **Styles:** Konsta UI's Notification on iOS (a plain, compact banner from the top: the message alone, no icon or title) and Konsta UI's Toast on Android (a snackbar at the bottom).
- **Main settings:**
  - `line`: `{ id, kind, text }`, or `null` for none. `kind` is `info`, `success` or `pass` (a passed lesson: green and larger); `warning` and `error` are styled but not used in the app yet. A new `id` plays it again.
  - `onGone()`: called when it has left.

```jsx
<Toast line={{ id: Date.now(), kind: 'pass', text: 'Say Hi · 8 of 10 · Nicely Done' }} onGone={clear} />
```

## TopBar

- **File:** `src/components/TopBar.jsx`
- **What it's for:** the main page's header: the course flag (opens the language pop-up), the wordmark (reloads the app), and the gear (Settings).
- **Styles:** Konsta UI's Navbar on iOS (wordmark centred, flag left, gear right) and Android (wordmark left, flag and gear right).
- **Main settings:**
  - `flag`, `languageName`: the course's flag picture and name.
  - `onLanguage()`, `onLogo()`, `onSettings()`: called by the flag, the wordmark and the gear.
  - `start`: anything to show before the flag.

```jsx
<TopBar flag="/flags/fr.webp" languageName="French" onLanguage={pickLanguage} onLogo={reload} onSettings={openSettings} />
```

## ToolStrip and ToolPanel

- **File:** `src/components/ToolTile.jsx`
- **What it's for:** the list of tools on the main page. ToolStrip is the phone's row of ToolPills; ToolPanel is the wide screen's column of ToolCards, Developer last.
- **Styles:** ToolStrip is Konsta UI's Tabbar on iOS and Android, pinned to the bottom: Learn, three tools, and More (a sheet with the rest). The current place (Learn) is marked by a tinted pill on both platforms, with room above and below the sushi: a 64 × 32 pill behind the icon on Android, a circle behind the icon on iOS. ToolPanel is Tamago's own, adapted; the screen puts it at the left on iOS and Android.
- **Main settings:**
  - `tools`: the list, each `{ id, label, about, onOpen, quiet }`.

```jsx
<ToolStrip tools={tools} />
<ToolPanel tools={tools} />
```

## PinnedAction

- **File:** `src/components/PinnedAction.jsx`
- **What it's for:** the main page's one pinned action at the bottom, always on screen: "Next Lesson: Say Hi".
- **Styles:** the platform's Button floating above the tab bar on iOS; Konsta UI's Fab with its label (an extended floating action button) on Android.
- **Main settings:**
  - `label`: the button's words.
  - `onClick()`: called by a tap.

```jsx
<PinnedAction label="Next Lesson: At the Café" onClick={startNextLesson} />
```

## IconButton

- **File:** `src/components/IconButton.jsx`
- **What it's for:** a button that is just an icon (close, settings, flag), 44 px square.
- **Styles:** Tamago's own, adapted (round on both platforms; a small grey circle for close on iOS, a pressed layer on Android).
- **Main settings:**
  - `label`: its name for screen readers, since it has no text.
  - `children`: the icon.
  - `className`, `onClick` and the rest pass straight through.

```jsx
<IconButton label="Leave lesson" onClick={leave}><IconClose /></IconButton>
```

## Screens

- **Files:** `src/components/screens/QuestionPage.jsx`, `MainPage.jsx`, `sample.js` (the fixed sample content), `Compare.jsx`
- **What they're for:** two whole screens built only from the components above, to show the library working together in each style. Not part of the app.
  - **QuestionPage:** Pick the Meaning. `picked` starts it already answered (right or wrong); otherwise a tap answers it.
  - **MainPage:** the header, the tools, part of the tree, the pinned Next Lesson. `sheetFor` opens a circle's sheet.
  - **Compare:** one story drawn in Tamago, iOS and Android together, each in its own window of the real size. `size` is `phone` or `desktop`; `stacked` puts them one under another.

## Icons

- **File:** `src/screens/icons.jsx` (not moved; 28 files import it)
- **What it's for:** every icon in the app, 21 in all, drawn as lines in the text's color. Storybook's Icons page shows each with its name.
- **Styles:** The same in every style.
- **Main settings:** none, except `IconSpeaker playing` and `IconMic live`, which animate.

```jsx
<span className="[&_svg]:size-5"><IconBook /></span>
```

## Also Lifted

- **WrongMark** (`src/components/WrongMark.jsx`): the small red X with "Incorrect" beside a wrong answer. ChoiceList needs it and so do seven other places in `Lesson.jsx`, so it moved out with ChoiceList.

## Duplicates to Settle

Places where the app builds something close to a component here, on its own. Candidates to merge later; nothing is changed yet.

- **Pick What You Heard builds its own choice list** (`PickHeard` in `src/screens/Lesson.jsx`). It looks like ChoiceList but has a picked state: a tap turns the choice orange (`choice-selected`) and the answer waits for Check. ChoiceList has no picked state, since its tap is checked at once. Merging the two would mean giving ChoiceList an optional "pick first, then Check" mode.
- **Buttons are still mostly plain class names (left as they are: Dan, 2026-11-19; this stays a demonstration on two screens).** Button is used on the question page (Check, Done, Continue, the text links). Everywhere else the app still writes `<button className="btn-submit">` and the like by hand, about 110 places. Same look either way; one way would be simpler.
- **Button's kinds and the app's class names differ.** Button uses plain names (`main`, `continue`, `outline`, `link`); the classes underneath keep theirs (`btn-submit`, `btn-primary`, `btn-secondary`, `btn-tertiary`), and `btn-primary` is the green Continue although the app's rule calls yellow the primary colour. Settled for now by Dan (2026-11-19): leave the class names.
- **Two play buttons.** AudioHelp has its own speaker button; `SpeakerButton` in `Lesson.jsx` is a second one (Type What You Hear, Speak and Compare, word pictures) with a slightly different frame and no Slow or Show Words. A third, smaller speaker sits inside each Pick What You Heard choice.
- **Two ways to show a sentence.** FrenchText draws the sentence with hints; Pick What You Heard writes it as a plain paragraph with the same size classes, and Read and Answer has its own `HintLine` in `A1Tasks.jsx`.
- **The New tag and the new-word dot are bare markup.** `<span className="tag">` and `<span className="new-dot">` are written out wherever they appear; no component.
- **The progress bar's look appears elsewhere by hand.** The Verbs trainer and the Progress page (three bars) draw the same track and fill with their own markup.
- **Two tool shapes, one list.** ToolPill and ToolCard draw the same tool two ways; Home picks by screen width. Could be one ToolTile with a `shape` setting.
- **Colors written straight into the code** (see Storybook's Colors page): the passed-lesson toast's green `#15803d` and edge `#116b33`, and the points chip's blue `#1f6dfb`.
- **A dark-mode gap in the tokens.** `--electric` has a dark value (`#5c9bff`) only when the device is dark; choosing Dark in Settings keeps the light blue `#1f6dfb`. The Colors page shows it as "same as light".
- **Two toast kinds are not used in the app yet.** `warning` and `error` are styled in `src/index.css`, but the app only sends `info`, `success` and `pass`. Kept in the library and labeled (Dan, 2026-11-19).
- **The Sheet's two platform shapes are chosen in code.** Tamago's Sheet switches from bottom sheet to pop-up with CSS alone at 1024px; the iOS and Android version picks Konsta's Sheet or Popup by measuring the window. Two mechanisms for one rule.
- **A check on right answers is worth considering for Tamago.** Tamago's ChoiceList shows a right answer by a green edge alone, so right is carried by color only. The iOS and Android lists add a small green check (kept there: Dan, 2026-11-19; drawn inside `src/components/platform/ChoiceList.jsx`, not in `icons.jsx`). Giving Tamago's own list the same check would help anyone who can't tell the green from the red. The Android answer bar has the same kind of mark beside its verdict; Tamago's and the iOS bar rely on the colored edge and the word.
- **Style hooks.** The adapted components are found by the stylesheet through `data-ds` attributes (sentence, first-sight, level-line, flag-row, tool-card, sheet-head) and a few existing class names. One naming scheme for all of them would be tidier.
- **IconButton is used by the two screens only.** The app, and the library's own AnswerBar, SheetHead and CircleNode, still write `<button className="icon-btn">` by hand (about 40 places).
- **The tree's rows are layout written into the screen.** `MainPage.jsx` repeats the list and row classes from `Home.jsx` (`home-tree`, the row's gap). A TreeRow component would give both one source.
- **The lesson's frame is layout written into the screen.** `QuestionPage.jsx` repeats the page and top-bar classes from `Lesson.jsx`. A LessonFrame component would give both one source.
- **The New tag is still bare markup** in the question page, as in `Lesson.jsx` and the QuestionHeading stories (noted above); the screen made it a third copy.
- **Two icons live outside `icons.jsx`.** The More dots in the bottom bar and the check on right answers are drawn inside `src/components/platform/`. If they stay, they belong in the icon file.
- **Which three tools sit in the bottom bar** (Practice, Glossary, Progress) is an assumption in `src/components/platform/ToolStrip.jsx`; Tamago's strip has no order of importance beyond the alphabet.
- **Recall fading.** CircleNode still fades a finished ring as recall drops; the app has since switched that off. The story is labeled; the setting could be removed from the component once the app's change reaches this branch.
