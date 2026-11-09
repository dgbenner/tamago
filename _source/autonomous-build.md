# Tamago: autonomous build brief

November 9, 2026. For Claude Code. Build the remaining phases in build-phases.md (2a to 5) in order, without
stopping to ask Dan except where this brief says to. Dan checks in about once a day.

## How to run

1. Work phase by phase. At the end of each phase: all tests pass, commit, push to GitHub, then start the next.
2. Keep a log at `_source/build-log.md`. For each phase: what was built, every decision you made under this
   brief and why, what's stubbed, and anything waiting for Dan.
3. Keep a short `_source/check-in.md` with three sections: Done since last check-in, Decisions made, Waiting for
   Dan. Overwrite it each time. Dan reads only this file.
4. Don't wait on Dan's approval of review.md. Make the content calls below, record them, and keep building.
   Dan reviews afterward and can reverse any call.

## You own the workbook now

- Edit tamago-data in place and keep a changelog row in its README tab. Bump the version (v8, v9 …) at the end
  of each phase.
- Keep the data shape: add columns and tabs, don't rename or delete them. Set rows to "off" instead of deleting.

## Content calls you can make

- **Tatoeba first.** Pull sentences under the content_pull rules.
- **Too few sentences:** first widen the unit's vocabulary with the most common A1 words that fit its topic and
  grammar point, then pull again. If still short, draft sentences to reach the target.
- **Drafted French** is marked source "tamago_original", status "live: native check before Phase 4". Keep each
  draft to the unit's words. Every drafted sentence is listed in check-in.md.
- **Cut** sentences whose English is an idiom, misleading at the learner's level, or odd ("Je suis un chat.").
- **Hints:** shortest Wiktionary sense that fits the sentence. Write a plain short hint when Wiktionary's text is
  too long (eau = water), and mark hint_source "short form of Wiktionary".
- **Grammar notes:** plain words, two or three examples from the unit's live sentences. Conjugation tables come
  from Wiktionary. Never state a definition or conjugation from memory.
- **New units** beyond U05: follow the old Duolingo A1 order (plurals, adjectives, possessives, questions,
  numbers, colors, time, places). Same unit shape as U02 to U05. Stop adding units at the end of A1.

## Build calls you can make

- Interpret open specs in the direction of: speed between questions first, less on screen, no game rewards.
- When two rules conflict, follow the newer one and log it.
- Images for word-to-image: use an openly licensed set and record its license on the About the content page. If
  none fits, leave QT02 on its fallback and log it.

## Stop and wait for Dan only for

- Anything that costs money or needs a new account (hosting change, auth provider, API keys, domain).
- Making anything public, or opening it to testers.
- Deleting Dan's data or files outside the repo.
- The native-speaker check: no AI does this. Prepare the list and recordings plan; Dan arranges the person.

For Phases 4 and 5, build everything that doesn't need an account or key, stub the rest behind a clear
"needs setup" screen, and list the setup steps in check-in.md.

## Never

- Hearts, chests, gems, combo counters, interjections, celebration screens, timers.
- Loading spinners inside a lesson.
- Definitions or conjugations from model memory.
