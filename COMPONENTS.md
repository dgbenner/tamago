# Components

The parts of Tamago's design system, on the `design-system` branch (a demonstration; not in the live app). Each one is shown with all its states in Storybook: `npm run storybook`, then http://localhost:6006/.

## ChoiceList

- **File:** `src/components/ChoiceList.jsx`
- **What it's for:** a column of answer choices in a lesson, where one tap picks and the pick is checked at once (Pick the Meaning, Fill the Blank).
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
- **Main settings:**
  - `value`: how far along, from 0 to 1.
  - `label`: the name read by screen readers (default "Lesson progress").

```jsx
<ProgressBar value={answered / total} />
```

## QuestionHeading

- **File:** `src/components/QuestionHeading.jsx`
- **What it's for:** the text of a question's heading ("Translate", "Pick the Meaning"). From Part 3 it is in the course language; a tap shows the English beside it.
- **Main settings:**
  - `english`: the heading in English.
  - `part`: the part of the course the question belongs to; decides the language.

```jsx
<h1 className="text-xl font-semibold"><QuestionHeading english="Pick the Meaning" part={3} /></h1>
```

## AudioHelp

- **File:** `src/components/AudioHelp.jsx`
- **What it's for:** the play button on every listening question. After the first replay, two text links appear beside it: Slow and Show Words.
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
- **Main settings:**
  - `title`, `icon`: the name and the sushi picture.
  - `lessonsDone`, `lessonsTotal`: how full the ring is. Equal means finished.
  - `recall`: from 0 to 1; a finished ring fades as recall drops.
  - `early`: `true` for a circle ahead of the learner: faded, still tappable.
  - `marker`: `"start"` shows "Start Here" above the first circle.
  - `onPick()`: called by a tap. `onInfo()`, `onNote()`: add the two small icons beside it.
  - `caption`, `badge`, `ring`: for a Brush-Up (a line under the title, a count, no ring).

```jsx
<CircleNode title="At the Café" icon="/sushi/nigiri/aburi-salmon-nigiri.webp" lessonsDone={8} lessonsTotal={20} onPick={startLesson} />
```

## ToolTile (ToolPill and ToolCard)

- **File:** `src/components/ToolTile.jsx`
- **What it's for:** one tool on the main page (Glossary, Verbs, Progress). ToolPill is the phone shape, a pill in a sideways strip. ToolCard is the wide-screen shape, a card with a line of description.
- **Main settings:**
  - `tool`: `{ id, label, about, onOpen, quiet }`. `id` picks the icon; `quiet` is Developer's dashed, muted look.

```jsx
<ToolPill tool={{ id: 'glossary', label: 'Glossary', onOpen: openGlossary }} />
<ToolCard tool={{ id: 'glossary', label: 'Glossary', about: 'Every word, with its meaning', onOpen: openGlossary }} />
```

## FlagRow

- **File:** `src/components/FlagRow.jsx`
- **What it's for:** the grid of course flags, on the opening screen and in Settings. Courses not ready yet are faded and say "Coming Soon" when tapped.
- **Main settings:**
  - `size`: `md` (Settings; the running course is outlined) or `lg` (the opening screen).
  - `onPick(courseId)`: called with the chosen course. Without it, a tap switches course and reloads the app.

```jsx
<FlagRow size="lg" onPick={(id) => chooseCourse(id)} />
```

## Logo (Logo, LogoInline, SushiMark)

- **File:** `src/components/Logo.jsx`
- **What it's for:** Logo is the full logo, the three-line wordmark with the sushi in front. LogoInline is the main page's header wordmark, one yellow line. SushiMark is the sushi picture alone.
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
- **Main settings:**
  - `label`: the level's name.

```jsx
<LevelLine label="Early A1" />
```

## Toast

- **File:** `src/components/Toast.jsx`
- **What it's for:** a short message that slides down from the top, holds about 3 seconds and leaves by itself.
- **Main settings:**
  - `line`: `{ id, kind, text }`, or `null` for none. `kind` is `info`, `success` or `pass` (a passed lesson: green and larger); `warning` and `error` are styled but not used in the app yet. A new `id` plays it again.
  - `onGone()`: called when it has left.

```jsx
<Toast line={{ id: Date.now(), kind: 'pass', text: 'Say Hi · 8 of 10 · Nicely Done' }} onGone={clear} />
```

## Icons

- **File:** `src/screens/icons.jsx` (not moved; 28 files import it)
- **What it's for:** every icon in the app, 21 in all, drawn as lines in the text's color. Storybook's Icons page shows each with its name.
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
