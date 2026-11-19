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

## Also Lifted

- **WrongMark** (`src/components/WrongMark.jsx`): the small red X with "Incorrect" beside a wrong answer. ChoiceList needs it and so do seven other places in `Lesson.jsx`, so it moved out with ChoiceList.

## Duplicates to Settle

Places where the app builds something close to a component here, on its own. Candidates to merge later; nothing is changed yet.

- **Pick What You Heard builds its own choice list** (`PickHeard` in `src/screens/Lesson.jsx`). It looks like ChoiceList but has a picked state: a tap turns the choice orange (`choice-selected`) and the answer waits for Check. ChoiceList has no picked state, since its tap is checked at once. Merging the two would mean giving ChoiceList an optional "pick first, then Check" mode.
