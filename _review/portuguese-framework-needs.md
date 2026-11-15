# Brazilian Portuguese: framework needs

Branch `lang/portuguese`, 2026-11-14. Portuguese content is built and audited on this branch, but the app does not
offer Portuguese: every item in sections 1 to 3 is a change to shared code, so none is made here. They are listed for
the main builder. All are one-line additions to a per-course list unless marked otherwise. No app code is changed on
this branch.

## 1. App registration (needed before Portuguese can be opened at all)

| File | What to add |
| --- | --- |
| `src/lib/course.js` `COURSES` | `{ id: 'pt', name: 'Portuguese', sample: 'maçã, queijo, gato…', lang: 'pt-BR', voice: ['pt-BR', 'pt'], db: 'tamago-pt', flag: '/flags/pt.webp', ready: true }` (branch `lang/italian` already lists it with `ready: false`) |
| `src/main.jsx` `tablesFor` | `pt: () => import('./lib/tables-pt.js')` |
| `src/lib/tables-pt.js` (new file) | A copy of `tables-de.js` reading `../content-pt/` |
| `public/flags/pt.webp` | Dan's Brazilian flag badge. The cut-out and the app-size copy are on branch `lang/italian` (`_source/flags/`, `public/flags/pt.webp`); bring them over |
| `vite.config.js` `WORKBOOKS` | `pt: COURSE_FILE.match(/tamago-pt-data-(v\d+)\.xlsx/)?.[1] ?? ''` |
| `src/screens/Developer.jsx` | `partsPt` import and `PARTS.pt`; a Portuguese column in Course Snapshot (tables, lesson log `tamago-pt`, workbook version) |

The device voice matters more here than for the other courses: `pt-BR` must come first in `voice`, or a device may
read Brazilian sentences with a European Portuguese voice.

## 2. Per-course lists inside the engine

| File | What to add | Without it |
| --- | --- | --- |
| `src/lib/lesson.js` `ARTICLES` | `pt: ['o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas']` | Type the Word refuses a Portuguese noun typed with its article |
| `src/lib/finalcheck.js` `EXAMS` | A Portuguese A1 exam entry. Brazil's own exam, Celpe-Bras, starts at intermediate and has no A1; the A1 exam for Portuguese is ACESSO (CAPLE, University of Lisbon), which is European Portuguese. Dan to choose | `EXAMS[course.id]` is undefined for Portuguese |
| `src/lib/converse.js` `HELP_PHRASES`, `SCENES` | Portuguese help phrases (Não entendo. / Mais devagar, por favor. / Pode repetir, por favor? / O que significa? / Como se diz…? / Estou procurando a palavra…) and the three scenes with Portuguese key words (café, chá, água, leite, por favor, obrigado; oi, casa, família, crianças, cachorro; onde, parque, escola, restaurante, cidade) | Conversations has no Portuguese phrases or scenes |
| `server/converse.mjs` `LANG` | `pt: 'Portuguese as spoken in Brazil (você, never tu; Brazilian spelling and words)'` | The partner has no language instruction, and may answer in European Portuguese |
| `src/lib/auth/mock.js`, `src/lib/auth/supabase.js` `COURSES` | `'pt'` | Portuguese progress does not sync to an account |
| `src/admin/AdminApp.jsx` `COURSE_NAMES` | `pt: 'Portuguese'` | The console shows "pt" |
| `src/dev/a1-samples.js` | Portuguese samples for QT14 to QT17 (only for Try the A1 Task Types; Part 1 uses none) | |
| `src/lib/by-ear.js` | Nothing needed now: no Portuguese line repeats a word (checked on this branch) | |
| `scripts/lib/french.mjs` `loose` and `src/lib/check.js` | Check that ã, õ and ç fold as the other accents do when "a missing accent is right" (lenient checking). Not tested here, since the app cannot open Portuguese yet | A learner who types "nao" or "maca" may be marked wrong, or right when Strict is on |

## 3. Tests and audits that list courses by hand

| File | What to add |
| --- | --- |
| `test/choices.test.js`, `test/by-ear.test.js`, `test/icons.test.js`, `test/converse.test.js` | `['pt', 'src/content-pt']` (or the file's own form of it) |
| `scripts/audit/walk.mjs` `COURSES` | `['Portuguese', 'content-pt', 'pt']` |
| `scripts/audit/ui-audit.mjs` | `pt: 'tamago-pt'` in the database map |
| `scripts/audit/merge.mjs` | `'Portuguese'` in the course list |
| `scripts/assign-icons.mjs` `RANK` | `['pt', 'content-pt']` |
| `scripts/sushi-catalog.mjs`, `scripts/content-report.mjs` | `['Portuguese', 'content-pt']` / `['Portuguese', 'src/content-pt']` |
| `scripts/image-list.mjs` | A Portuguese map onto the shared picture rows, as German has. Until then `content-pt/pictures.json` is written by hand (nouns matched by meaning to a picture another course already uses) |

The two audits were run on this branch against Portuguese from temporary copies of the audit scripts with the
Portuguese entry added; the copies are not committed.

## 4. Content pipeline registrations made on this branch

The content scripts cannot run for a course that is not registered, so these additions were made. Each adds a
Portuguese entry and changes nothing for French, Spanish or German.

- `scripts/lib/course.mjs`: the `pt` course (workbook `_source/tamago-pt-data-vN.xlsx`, Tatoeba `por`, Wiktionary
  Portuguese, Lingua Libre `LL-Q5146 (por)`).
- `scripts/lib/tatoeba.mjs`: `pt: 'por'`.
- `scripts/lib/help-circles.mjs`: the Portuguese help circles' words; `Portuguese` in the Wiktionary section map.
- `scripts/lib/a1-plan.mjs`: `PARTS.pt` (four parts, as Spanish and German).
- `scripts/add-vocab-part1.mjs`: the Portuguese vocabulary circles.
- `scripts/part-summaries.mjs`, `scripts/retitle-units.mjs`: Portuguese entries.
- `scripts/lib/conjugation.mjs`: a reader for Wiktionary's `{{pt-conj}}` table, keeping the course's persons: eu,
  você with ele and ela, nós, vocês with eles and elas (no tu, no vós).
- `scripts/check-content.mjs`: `pt-noun` joins the headword patterns that give a noun's gender.
- `scripts/a1-coverage.mjs`: Portuguese theme sets (numbers, prices in reais, times, days, months, dates).
- New file: `scripts/make-portuguese-workbook.mjs`.

These overlap with the Italian branch's additions to the same files (each branch adds its own line beside the
other's), so bringing both to main means keeping both lines.

## 5. Tatoeba mixes Brazil and Portugal

Tatoeba files Brazilian and European Portuguese under one language, and a checked owner may be from either country.
The course's word list keeps most European lines out, because their words are not in it (autocarro, comboio, cão,
estás, tu). What can still slip through is a line built only from shared words in a European pattern. Every pulled
line was read for that in review, and Fable's pass should read for it again.

## 6. The A1 list: the Camões A1 notions, with Brazilian swaps

Dan's call (2026-11-14). No free CEFR-graded list exists for Brazilian Portuguese: Kelly has no Portuguese, and the
Portuguese Vocabulary Profile is not published as a file and lacks Brazilian words. So the list is the level A1
inventories of general and specific notions in the Referencial Camões PLE (Camões Institute, 2017), read from the
institute's own page, https://www.instituto-camoes.pt/activity/centro-virtual/referencial-camoes-ple.

- Stored in `content-pt/a1-list.json` as headwords only, with the source, the way the Spanish PCIC list is: each
  notion phrase split into its words. 648 words.
- The Referencial is all rights reserved; only headwords are kept, for measuring coverage.
- It describes European Portuguese. 36 words used only in Portugal were replaced by the Brazilian word, and every
  replacement is recorded in the file's `swaps` (telemóvel to celular, autocarro to ônibus, comboio to trem, cão to
  cachorro, gelado to sorvete, constipado to resfriado, and so on). Two words were added where Portugal has a
  phrase: banheiro and camiseta. A Brazilian speaker should look over the swaps.
- Left out: the grammar terms and example sentences inside the general notions, descriptive lines such as "names
  of countries", plurals whose singular is listed, and contractions.

Coverage after Part 1: 136 of 648 (21%), all 136 in three or more sentences. Spanish and German stood at 27% and
25% after their Part 1.

## 7. One audit finding that needs the engine

The every-lesson check finds one issue in 6,040 questions: a Fill the Blank in Body + Looks offers tem and têm
together as choices. The two differ only by an accent, so with lenient checking they read as the same answer. The
content can't prevent it, since the engine picks the wrong choices; the choice picker should skip a word that
equals the answer, or another choice, once accents are folded. Portuguese has other such pairs waiting (e and é,
a and à, esta and está).
