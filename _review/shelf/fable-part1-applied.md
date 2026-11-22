# Fable Part 1 findings — applied check (Swedish + Danish)

Read-only verification against the courses **as they sit on local main** (`dc9edee`, "Merge content/da-a1…"). Sources: `tamago-swedish/_review/swedish-part1-check.md`, `tamago-danish/_review/danish-part1-check.md`. Evidence is from the shipped content on main: `src/content-sv/` and `src/content-da/` (`sentences.json` carries both `source_id` (Tatoeba id) and `french` (the target text); `words.json` carries `hint`/`gender`). Checked 2026-11-21. I edited/committed/merged nothing.

## Swedish

| Finding | Status | Evidence |
|---|---|---|
| **var** taught as "where"; 16 shipped lines use past-tense "was/were" — still in the course? | **Applied (out)** | The check lists 15 Reject rows citing past-tense `var` (prose said "16"). All absent from `src/content-sv/sentences.json` by `source_id` (1998350, 1587330, 4423933, 3840620, 1131156, 4446570, 3710525, 3710526, 1988739, 1936173, 4344169, 6080457, 4170143, 2097931, 2097932 → 0 present). The only shipped `var`+"was" lines are Part 2/3, where past tense is taught: S43006 "Var är Tom född? / Where was Tom born?", S62003, S62016, S62018, S62030 — not the flagged Part 1 lines. |
| **36 Reject candidates** — out? | **Applied (out)** | 0 of 36 Reject `source_id`s present in `src/content-sv/sentences.json` (checked all 36 ids from the check file). |
| **3 Fix drafts** — fixed? | **Applied** | S32103 `french` = "Säg ordet på engelska." (old fragment "Ordet på engelska." absent). S51102 `french` = "Det är ett öga." (old "Jag har ett öga." absent). S52107 ships "Jag gillar film." with `english` = "I like films." (the English fix). |

## Danish

| Finding | Status | Evidence |
|---|---|---|
| **lide** — still carries hint "suffer"? | **Applied (no)** | `src/content-da/words.json` W044 (`lide`) `hint` = "kan lide: to like". The learner-facing Glossary shows `hint`; the raw `gloss`/`gloss_full` field still reads "suffer" but is not shown. |
| **køkken** — still missing gender? | **Applied (no)** | `src/content-da/words.json` W094 (`køkken`) `gender` = "et". |
| **47 Reject candidates** — out? | **Applied (out)** | 0 of 47 Reject `sentence_id`s present in `src/content-da/sentences.json` (all 47 ids from the check file absent). |
| **10 Fix drafts** — fixed? | **Applied** | All carry the fixed text: S32102 "Hvad betyder det ord?", S7101 "Det er en ny bil.", S7102 "Det er en gammel cykel.", S7104 "Det er en grim bil.", S7105 "Det er en sjov bog.", S13101 "Det er en rød bil.", S13102 "Det er en grøn cykel.", S13103 "Det er en gul bus.", S13104 "Det er en brun hund."; S3103 `english` = "How is it going? It is going well." |
| **1 Cut draft (S53110)** — out? | **Applied (out)** | `sentence_id` S53110 ("En station er nær.") absent from `src/content-da/sentences.json`. |

## Summary

- **Swedish — all applied:** the 36 Rejects (incl. all 15 past-tense `var`-as-"was" lines) are cut, and the 3 Fix drafts (S32103, S51102, S52107) are rewritten; the only `var`+"was" lines left are Part 2/3 where past tense is taught.
- **Danish — all applied:** the 47 Rejects, 10 Fix drafts and 1 Cut (S53110) are out or rewritten, `lide`'s hint is "kan lide: to like" (not "suffer"), and `køkken` now has gender `et`.
