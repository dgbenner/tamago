# Tamago: Dan's test notes

November 9, 2026. Dan's notes from using Tamago on desktop, phone and iPad, sorted by screen. For the builder.

## Decisions on open items

Where Dan's notes left a choice open, use these:

- **Make → "Self-Study".**
- **Review checkpoint → "Checkpoint"**, so it doesn't collide with the Review button.
- **Review and Practice Weak Skills merge into one bottom button, "Practice".** It draws from missed questions
  first, then the weakest skills. It's always usable. When there are misses, it shows the count:
  "Practice · 4 Mistakes". Remove Practice Weak Skills from the menu.
- **Continue and Resume → "Next Lesson"**, followed by the unit title ("Next Lesson: Saying Hello"). It resumes a
  half-done lesson or starts the next one; the learner doesn't need to know which.
- **Before any level**: show "Starting Out" until the learner finishes their first unit. Then show level markers.
- **The secondary menu** (Glossary, Verbs, Self-Study and later tools): on phone, a horizontal scroll of icon tiles
  directly under the header, out of the tree. On desktop and iPad, a right-hand panel that lists each tool with a
  one-line explanation and opens it in the same panel.
- **Locked units**: a lock icon in place of the sushi.
- **Unit titles**: rename every unit to 2 or 3 words in Title Case ("Hello" → "Saying Hello"). The unit number
  appears only inside the unit details.
- **Glossary scope now**: A1 only. A2 and later wait for that content.

## Build order

1. **Pass 1, all devices**: global, home tree, bottom buttons, lesson intro, phone sizing, audio volume,
   settings grouping, in-lesson Can't listen / Can't speak.
2. **Pass 2, desktop and iPad**: header layout, right-hand panel, centered pop-ups, side-by-side buttons,
   larger quiz items, iPad landscape only.
3. **Pass 3**: the combined Glossary tool.

Commit and push after each pass.

## Global (all devices)

- **Loading screen**: looks good. Make the mask movement more fluid: a little faster, holds a little longer,
  with easing.
- **Loading to home transition**: the loading logo fades out quickly while the header logo moves up from below
  into its place, so it reads as the logo snapping up to the top.
- **Top bar pinned**: points, the Tamago wordmark and settings stay visible when scrolling.
- **Top bar height**: reduce its vertical height.

- **Points at zero**: "0 points" looks different from the normal points display. Use the same style at every
  value, zero included.
- **Fixed header and footer, each with a thin horizontal line** marking its edge, so it's clear where they
  end. Applies to desktop and mobile.
- **Header contents**: points, the Tamago wordmark, settings. Possibly a profile item later.
- **Title Case for every label and button** ("Review Checkpoint", "Very Early A1", "Practice Weak Skills",
  "Your Topic"). Lowercase reads weak.

- **Make everything bigger on phone**: icons and labels look small (seen on mobile, light mode).
- **Audio volume levels vary**: some recordings are very loud, some very quiet. Different voices are fine;
  normalize the loudness across all audio.

- **Logo load is jumpy on all three devices**: the "Tamago" wordmark loads first, then the graphic loads and
  pushes the text up. Load both together, with the space reserved, so nothing shifts.
- **Swipe right to left to skip a question** works and is useful for Dan's testing. Keep it while testing.
- **Tapping a locked unit**: explain what it is. Keep this across all devices.
- **"Unit 1", "Unit 2" labels are confusing.** Learners won't count along. Lead with the unit title instead.

## iPad

- **Landscape only.**
- Use the space the same way as desktop (see Desktop): it currently feels ported from mobile.
- **Two stacked bottom buttons go side by side** on iPad and desktop.
- **Bigger quiz items**, icons and labels; more vertical spacing (same as other devices).

## Desktop and iPad header

- **Left-aligned logo with the tamago sushi graphic next to the wordmark.** Utilities (points, settings)
  move to the right, like a typical desktop site or app.

## Desktop and iPad: unit details

- **Unit details open as a centered pop-up**, not a bottom sheet. Keep the bottom sheet on phone. Treat it
  more like a website.

## Bottom buttons: Review and Continue / Resume (all devices)

- **Review is unclear.** Does it mean there's something to review? When it's grayed out, does that mean nothing
  can be reviewed? Needs a label that says what it is, and it should be usable whenever the learner wants to
  review.
- **Continue and Resume are unclear** about what they continue. Learners won't know. The button should say
  what it does: start the next lesson. (Dan: "Resume" should just be "start next exercise", always.)
- **Thin line above the pinned bottom area.**

## Lesson intro (the screen after Continue)

- It shows "Unit 1 · Grammar note · Hello", which feels choppy.
- Add a short intro in plain words that says what this screen is and what the lesson covers.
- The bottom button "Start Lesson" is the right label. The button that leads to this screen needs a better
  label than Continue.

## Settings

- **Desktop settings are the phone layout.** Fine for now; switch to a desktop layout if it's simple.
- **Group settings into sections.** Everything is at one level now, which is a lot.
- **Can't listen now / Can't speak now in the lesson itself**: keep them in Settings, and also show a faint
  button at the bottom center of every listening or speaking question so the learner can switch it off there,
  as old Duolingo did.

## Desktop

- **Top strip is too tall**; there's spare margin on desktop. Tighten it.
- **Desktop is phone-sized.** Treat desktop like a landscape tablet, in the spirit of 2015 Duolingo desktop:
  use the right-hand side.
- **Right-hand panel for context**: on desktop, things that open in modals now open in the right panel instead.

## Home: the secondary menu (all devices)

- The four buttons under "Very early A1" work as a secondary menu of things to do.
- **Rename Words to Glossary.** "Vocabulary" could mean only what's been learned; "Glossary" covers everything.
- **Glossary as one combined tool**:
  - Opens to the learner's own words by default, showing strength: learned, missed, decaying, not yet learned.
  - A filter or checkbox turns on the full glossary by level (A1, A2 and on).
  - Content for the full glossary needs building.
- **Practice Weak Skills is grayed out**, and it isn't clear why.
- **Rename Make.** The label is unclear; it's a whole set of self-study tools. Candidate: "Self-Study" (Dan's
  leaning) or "Study".
- **The four buttons take too much space and read as part of the learning tree.** Move them out of the tree:
  - A horizontal scroll of features, so more can be added later. More iconic.
  - Desktop: a mega menu that explains each mode and opens it; or show the tools in the right-hand panel.
  - Possibly a footer navigation later, maybe on home only. Placement still open.

## Home: level label and progress (all devices)

- "Very early A1 · Progress" doesn't look clickable and reads as one sentence.
- **Level markers on the tree as a timeline**: a horizontal line across the tree with the level in italics,
  like a date divider in a social feed ("Very Early A1"). The learner sees them while scrolling: "I'm almost to
  Early A1".
- **Progress becomes a tertiary button**: no fill, gray or outlined, low emphasis. Italics and a quieter color
  for the level label so it sits back.
- **Don't show "Very Early A1" at the start.** A new learner has nothing yet. Start with a more general label,
  and show Very Early A1 only after they've learned a few things.

## Home: the learning tree (all devices)

- **Rounds as a visual counter on the unit circle**: the circle is divided into segments that fill as rounds
  finish. Replaces the row of five dots.
- **Unclear what "Round 1 · Lesson 1 of 7" means** against the five dots. Dan wasn't sure of the structure.
  Consider a tap target that opens details or starts the lesson instead of the text line. Tapping the big circle
  to start is already clear on mobile.
- **Bigger icons** in the circles.
- **Unit titles of 2 to 3 words**, to be more graphic.
- **Less vertical space between tree items**, but enough separation that each item reads on its own.
- **Locked units: no sushi icon.** Show a lock (or something better) until unlocked.
- **Your Topic**: show a big "?" until the learner chooses; the choice fills it.
- **Review checkpoint**:
  - Rename to "Review" or "Checkpoint", one word.
  - Small checkered flag in front.
  - Less emphasis than the unit circles.
  - Drop "Units 1, 2 and 3" from the tree label. "Unit" isn't clearly the circles; save that detail for the
    screen that opens when it's tapped.
  - Add a Skip button on that screen.
