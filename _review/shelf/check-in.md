# Tamago: shelf note (on ice from 2026-11-22)

Read this first when Tamago comes back.

## Live now

- **Deploy:** Penguin (deploy 70), main, https://tamago-83f.pages.dev. The courses went public in Otter (deploy 69). Penguin adds only the archived review files and this note.
- **Public courses: nine, all at A1, each with a final check.** French, Spanish (Latin American), German, Italian, Portuguese (Brazilian), Dutch, Swedish, Danish, Polish.
  - Dutch, Swedish, Danish and Polish became public in Otter, after Fable's review and clean checks on the final main.
  - Each course's final check is a mock of its language's official A1 exam:

    | Course | Exam |
    |---|---|
    | French | DELF A1 |
    | Spanish | DELE A1 |
    | German | Goethe Start Deutsch 1 |
    | Italian | CELI Impatto |
    | Portuguese | ACESSO |
    | Dutch | Basic Civic Integration Exam Abroad |
    | Swedish | Swedex (starts at A2; the app says so) |
    | Polish | state certificate exam at A1 (the app says adult sessions now start at A2, so A1 sittings are rare) |
    | Danish | none; Denmark has no A1 exam, so it uses the general A1 format |

- **Picker:** nine flags, three to a row on phones, with "A1 · N circles" under each name. Checked in Firefox in normal mode on phone and desktop.
- **Copy:** the README lists the nine languages and their mock exams. It also says plainly that in the four newest courses about a quarter to a third of sentences were written for Tamago and have had no native check yet. In the app, the only lists of languages are the picker and the About screen, and both already read each course on its own.

## Checks on the final main (before the public switch)

- **Word audit:** 0 words met early and 0 lessons over four new words, in every course.
- **Every-lesson check:** no issues in about 252,000 questions.
- **Fast tests:** 318 of 318 passed, with all nine courses swept in full.
- **Smoke test:** passed on iPhone 14 and iPad Pro (WebKit) in the pre-push run for Otter.
- **Public courses:** French, Spanish, German, Italian and Portuguese changed only in US spelling (29 to 73 English strings each) and form-of hints (Spanish 1, Italian 5). One more change, metadata only: seven past participles now count toward their verb on the A1 list (French né, compris, entendu, situé; German geboren, verstanden, gehört), under the existing rule from 2026-11-16. No hint or sentence changed for these.

## What the wrap-up pass applied (Dan approved all of it)

- **Pipeline, every course:**
  - Form-of hints now carry a meaning, built from the lemma's Wiktionary page, e.g. "to be able, can (present of kunne)". Bare form-of labels went from Swedish 136, Danish 163 and Dutch 39 to 0.
  - US spelling throughout the English, with a test so UK spellings can't creep back. Accepted answers take either spelling.
  - Where the meaning built from Wiktionary's first sense read oddly, the hint now takes the sense the course's own lines use: Swedish kan, låt, låter; Danish sker, sket, talte, talt.
- **Fable's phase 6 verdicts, all four new courses:**
  - Cuts and draft fixes.
  - Hint and sense fixes.
  - Gender blanks filled from Wiktionary: Danish months, morgen, lov; Dutch kopje, drankje, kaartje; Polish 23 case forms. Swedish skönt refiled as an adjective.
  - Generated accepted answers with untaught words left out:

    | Course | Before | After |
    |---|---|---|
    | Dutch | 43 | 19 |
    | Danish | 11 | 4 |
    | Swedish | 6 | 3 |
    | Polish | 62 | 36 |

  - Reading texts reworded into taught words: Dutch 32, Swedish 37, Danish 36, Polish 10.
- **Dan's calls:**
  - **Swedish Part 4:** 49 newsroom words stoplisted, 18 of them turned off.
  - **Formal address:** Dutch u and Polish pan/pani are taught from Part 2.
  - **Danish:** død, døde and hader cut with their lines.
  - **Polish:** Toma from U41 and Tomem from U64, which brought in 40 Tatoeba lines. The six Bóg lines in U95 cut. U95 then pruned the Swedish way: 13 words off, now 12 lines at 83% drafts.
  - **Pipeline:** a picked line isn't offered to later circles.
  - **Polish exam note:** says adult sessions start at A2.
- **Picker:** only the nine languages. Norwegian is parked in `src/lib/course.js` PARKED with its content, tables and tests kept; putting the entry back brings it back. Romanian, Finnish, Czech, Hungarian and Greek are gone from the picker; their flag files stay.

## Branches

- **Kept on GitHub, not merged:**
  - `content/ro-a1`, Romanian Part 1: on hold. Drafts were 64%, over the 40% limit, because Tatoeba is too thin for Romanian.
  - `lab/tree-lines`, the tree-lines lab: dropped by Dan on 2026-11-12; kept for the record, never to be merged.
- **Deleted locally:** every branch already in main. Their history is on origin/main; the old remote copies are untouched.
- **Worktrees:** all removed except `Sites/tamago-design-system`, left in place. Its branch has nothing that isn't already in origin/main, so there was nothing to push.
- **Review files:** every review file that existed only in a worktree (57) is in `_review/archive/<worktree>/`. All of main's review files (shelf check-ins, scout reports, Fable's reviews, craft screens) are committed too.
- **Disk:** about 9.6 GB freed (14 worktrees).
- **Not touched:** `Sites/tamago-held` (3.4 MB, unconfirmed icons from 2026-11-10). It isn't a git folder and holds files outside the repo, so it's yours to keep or delete.

## Held for the next pass

- **Engine: near-cognate fix.** Match Pairs only drops a word that is identical to its English. "a park" stays on the board, and near-cognates (musik/music, hotell/hotel) are never considered. Fable's framework ask is in each phase 6 review, Appendix E (in the archive).
- **Engine: accepted-answer filter.** Generated answers aren't checked against the circle's words when they are built. This pass filtered them per course instead (`decisions.generated_off`, or `cut_answers` in Swedish), so the check belongs in check-content.
- **Content, v2:**
  - Polish U95 (Society + News) needs a source beyond Tatoeba to rebuild properly. Its title still says Society, which is now off.
  - Circles still over 40% drafts:
    - Swedish U86, U88, U91, U92, U94, U95
    - Danish U42, U54, U63, U88
    - Dutch U42, U63, U67, U73, U88, U94, U95
- **The native-speaker check:** no native speaker has checked the drafts yet:

  | Course | Drafts | Share of sentences |
  |---|---|---|
  | Dutch | 676 | 23% |
  | Swedish | 951 | 31% |
  | Danish | 671 | 23% |
  | Polish | 1,613 | 35% |

- **Parked spec: the feedback system.** It isn't in the repo; it lives with Dan's planning notes.
- **Romanian and Norwegian:** on hold, because Tatoeba has too few sentences for either. Norwegian's options (plain-Norwegian recordings, a Kelly list swap) stay parked.

## Waiting for Dan

- Nothing is running. Every Tamago dev server, preview and headless browser is stopped. Builder 2 is idle and has stopped.

## Final sweep before closing the sessions (2026-11-22)

- **Norwegian branch:** `lang/norwegian` is on origin and now matches the last local tip (b36df6d). The copy on origin was older and has been fast-forwarded. Its Part 1 is also in main, parked.
- **This Mac:**
  - Nothing Tamago-related is running: no builds, dev or preview servers, Storybook, headless browsers or watchers.
  - None of the open Claude sessions, Builder 2 included, has a child process, so its background watch is gone too.
  - This session has no scheduled jobs and no background agents left.
- **Scheduled jobs on this Mac:** none start Tamago work.
  - The only crontab entry is `price-intelligence-tracker/run_collection.sh` at 6:00 daily, which is not Tamago.
  - The LaunchAgents and LaunchDaemons are all Box, Dropbox, Google, Microsoft, Zoom, Mullvad and Tidepool.
  - Nothing was changed.
- **What still runs on its own:**

  | What | Repo | Trigger | Does | Cost |
  |---|---|---|---|---|
  | Full suite | dgbenner/tamago | each push to main, or manual | runs the full test suite | free: public repo |
  | Daily snapshot | dgbenner/tamago-dashboard | daily at 10:37 UTC, or manual | reads Tamago's public runs and events with the built-in token, commits new data, redeploys the dashboard | free: public repo, no paid API |
  | Deploy to GitHub Pages | dgbenner/tamago-dashboard | each push to main, manual, or called by the daily snapshot | builds and publishes the dashboard | free |

  - The daily snapshot keeps committing to the dashboard repo every day while Tamago is on ice. To stop it, disable that workflow in the repo's Actions tab. GitHub also pauses scheduled workflows by itself after 60 days without repo activity, but the snapshot's own daily commits may keep the repo counting as active.
  - **Cloudflare:** no cron triggers or scheduled workers. Tamago runs on Pages, with four Pages Functions (`/api/converse`, `/api/explain`, `/api/generate`, `/api/admin-user`). They run only when someone uses the app; there is no wrangler config and no scheduled handler. They cost nothing on Cloudflare's free tier unless traffic passes its daily request allowance.
- **API spend (`TAMAGO_ANTHROPIC_API_KEY`):** the key and the account were not touched.
  - **What the app limits:** each conversation is capped at 14 learner turns, with each line clipped to 240 characters, word lists to 400 and replies to 1,500 tokens. Explain and practice inputs are clipped as well. Conversations and explanations use Haiku 5.5. Practice generation (`/api/generate`) uses Opus 5.5, which costs more per call.
  - **What it doesn't limit:** there is no per-user or per-IP rate limit and no daily or monthly cap in the app. The only gate is a check that the request comes from the app's own pages, and the code calls that "a light guard until sign-in gives a real per-learner limit". So spend scales with use and with anyone who scripts those endpoints.
  - **Check this, Dan:** a comment in `server/converse.mjs` refers to "the Tamago workspace's $5 monthly cap". That is the only spending limit, and it lives in the Anthropic Console, not the app. Please check in the Console that a monthly spend limit really is set on the workspace this key belongs to.
