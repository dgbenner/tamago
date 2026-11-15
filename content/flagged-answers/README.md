# Flagged answers

Files exported from the app's Developer page (Flagged Answers, Export Accepted Answers) go here, one per export, as
saved: `flagged-answers-fr-YYYY-MM-DD.json`. `npm run content` reads every file in this folder (scripts/import.mjs)
and adds each accepted answer for everyone. Other courses use their own folder: content-es/flagged-answers/,
content-de/flagged-answers/, content-it/flagged-answers/, content-pt/flagged-answers/.
