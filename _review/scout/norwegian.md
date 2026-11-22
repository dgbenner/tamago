# Norwegian Bokmål (nob) — scout report, Parts 2–4

Scout pass, 2026-11-20. Research only. Part 1 is built (src/content-no: 258 sentences, 123 Tatoeba, 135 drafts = 52% drafts;
219 words; 21 circles averaging about 12 lines each, against Dutch 776 / Swedish 519 / Danish 536). This report covers
Parts 2–4. Numbers are measured unless marked *estimate*.

## Sources

**Tatoeba** (exports downloaded 2026-11-20 into `.cache/tatoeba/`):

| measure | count |
|---|---|
| Bokmål sentences, all | 18,898 |
| linked to an English translation | 14,228 |
| … by a native owner (level 5) | 9,863 |
| … short (≤ 8 words), any owner | 11,888 |
| … short **and** native | **8,633** |
| … native and ≤ 5 words | 5,434 |
| registered native users | 86 |
| share of short native lines from the top 3 owners (Mayk, eirik174, sotolf) | 69% |

Usable at A1 (short native lines made entirely of the most frequent forms, hermitdave no list, diacritics folded):
top 500 forms 1,717; **top 1,000 forms 2,847**; top 2,000 forms 4,103. For comparison Danish 7,886 and Swedish 9,385 at
1,000 forms. Part 1 has already used 123 of these lines.

Coverage of the words Parts 2–4 would teach, measured against the **Norwegian Kelly A1 band** (1,000 words; see below):
- 137 of the 1,000 are already taught in Part 1, leaving **863**.
- Of those 863, only **250 (29%)** appear as the exact form in ≥ 5 short native lines, 85 (10%) in ≥ 20. Allowing any
  form that starts with the word's stem (an upper bound), 420 (49%).
- Swedish, for comparison: 50% of its Kelly A1 list appears in ≥ 5 lines (Swedish Part 1 came in at 13% drafts).
- Hermitdave ranks 601–1,500: only 29% of words appear in ≥ 5 short native lines (Danish 72%, Swedish 70%).

**Wiktionary** (en.wiktionary API, 2026-11-20). Sample: every 15th word of the hermitdave no top 600 (40 words).
- Entries with a Norwegian Bokmål section: **38 / 40** (missing: john, jack — names from subtitles).
- 17 lemma pages, 21 form-of pages (inflected forms, e.g. tiden, saken, jenta, hører, fortalte).
- Gender is carried by the **template name**, not a parameter: `{{nb-noun-m1}}` (masculine, en), `{{nb-noun-f1}}` (feminine,
  ei), `{{nb-noun-n1}}` / `-n3` / `-nu` (neuter, et), or `{{head|nb|noun|g=m}}`. `{{nb-noun-c}}` is "common" (masculine
  **or** feminine) and does not decide between en and ei — 2 of the 16 noun sections in the sample used it (hei, stund).
  check-content.mjs genderFrom already reads these (nb-noun-n → et, everything else → en), which means **ei is never read
  from Wiktionary**; ei/en for feminine nouns rests on the reviewer's `gender` pass, as Part 1 did.
- Verbs: `{{head|nb|verb|imperative|…|present tense|…|simple past|…|past participle|…}}` with the principal parts inline
  (ha, være, se, ta, få, gjøre, bli, si) or a class template (`{{nb-verb-comireg}}` gå). No conjugation table is needed —
  the present is one form for every person (conjugation.mjs returns null by design, ONE_FORM).
- No declension tables beyond what the noun templates generate (definite singular/plural forms).

**Lingua Libre — finding.** The pipeline (scripts/lib/course.mjs) looks for `LL-Q25167 (nob)`. Commons
`Category:Lingua Libre pronunciation-nob` holds **16 files**. But `Category:Lingua Libre pronunciation-nor`
(LL-Q9043, "Norwegian", no written-standard split) holds **5,800 files, 5,626 distinct words**, mostly from one speaker
(Telaneo 4,263; Teodor605 938; Sebbog13 274; EdoAug 186). Matched by spelling:
- **174 of Part 1's 219 word forms** have a `nor` recording (hallo, nei, ikke, er, mann, kvinne, gutt, jente, barn, bok, hus,
  lege …).
- **753 of the 1,000 Kelly A1 words** have one.
So "no recordings" for Norwegian is a configuration miss, not an absence. The files are labelled Norwegian, not Bokmål,
so each would need a Bokmål-spelling check (and a listen for dialect) before use. Not changed here.

## A1 word list

- **Norwegian Kelly list exists and is downloadable** (content-no/a1-list.json says it was not; it was looked for on the
  wrong mirror):
  - Kelly M3 list with CEFR bands: `Norwegian_M3.xls`, archived from kellyproject.eu at
    http://web.archive.org/web/20141128232055/http://www.kellyproject.eu/wp-content/uploads/2012/07/Norwegian_M3.xls
    — 8,942 rows, bands A1 1,000 / A2 1,000 / B1 1,000 / B2 1,000 / C1 1,000 / C2 3,942; columns include CEFR, word, POS,
    frequency (NoWaC corpus), English translation.
  - University of Oslo Tekstlab copies: https://www.hf.uio.no/iln/om/organisasjon/tekstlab/tjenester/kelly-word-list-norwegian-english.xls
    (6,025 rows, word / POS / English, no band column) and a refined JSON
    https://tekstlab.uio.no/kelly/Norwegian-KELLY-Contributions-Shu-Wang.json (5,953 entries, rank, POS, English).
  - Licence, per the UiO page: **CC BY-SA 4.0**.
- The current list (hermitdave FrequencyWords no_50k, CC BY-SA 4.0) overlaps poorly: of the 1,000 Kelly A1 words, 417 are in
  its 1,000 and 296 in its core 600. Kelly is web-corpus based (NoWaC), so like Italian's it holds formal words
  (utfordring, virksomhet, aksje, pasient); an a1-exclude list as Italian's would be needed.
- Recommendation: Dan's call whether to switch the measuring list to Kelly A1 (CEFR-graded, same licence) for Parts 2–4.

## Grammar load for A1

- **Gender:** three in Bokmål (en / ei / et), with feminine optionally merged into masculine (en bok / ei bok both standard).
  Wiktionary's `nb-noun-c` does not separate them; the Part 1 gloss/gender errors (W049 vann) came from here.
- **Articles:** indefinite separate (en, ei, et); **definite is a suffix** (gutten, jenta, huset; plural -ene) — each
  definite noun is its own form for the analyser; double definiteness with adjectives (den store gutten).
- **No cases** on nouns (genitive -s only); object pronouns (meg, deg, ham/han, henne, oss, dem).
- **Verbs:** one present form (-r) for all persons; past and perfect forms arrive in Parts 3–4.
- **Word order:** V2 and inversion after a fronted adverb (I dag går jeg), negation placement (ikke after the verb).
- **Script:** Latin plus æ ø å — all inside the analyser's Latin-1 tokeniser range, so no tokeniser change needed.
- Analyser load is light: nouns need 2–4 forms (indefinite/definite, singular/plural), verbs 1 present form.

## Nearness

Closest built courses: **Danish** and **Swedish** (and Norwegian's own Part 1). Everything carries over: the part frame
(`scripts/add-part.mjs` with `part2/no.mjs` etc.), ONE_FORM verbs, the additive `gender` decisions with
`gender_corrections`, the Bokmål link-template expansion already in check-content.mjs. Swedish Parts 2–4 are not built
either, so there is no Scandinavian later-part config to copy; Italian/Portuguese part configs are the template.

## Judging themes for Norwegian

- Every word introduced before it's tested; ≤ 4 new words a lesson — **definite forms (gutten, jenta) are new forms**.
- Accepted answers use only taught words; generated answers must not bring in formal De or untaught definite forms.
- **Gender from Wiktionary, en/ei/et checked per noun**: `nb-noun-c` is not a gender; a feminine noun's ei needs a source
  (the Part 1 vann error). No glosses from memory.
- Drafts stay within the unit's words, marked `tamago_original` — and with drafts over half the course, every draft needs the
  native check before testers.
- Cut Nynorsk or dialect spellings from Tatoeba lines (eg, ikkje, kva) and from any `nor` recording.
- Cut idioms, odd and subtitle-style lines (69% of usable lines come from three people — watch for one person's habits).
- Near-cognates with Danish/Swedish/English handled, not only identical matches.
- V2 inversion and ikke placement introduced in order; past tense not before it is taught.
- Register: du throughout.

## Projected draft share

Part 1 already came in at **52% drafts** with only ~12 lines a circle. Parts 2–4 (~700 sentences each) reach further down the
frequency list, where coverage gets thinner: 29% of the remaining Kelly A1 words, and 29% of hermitdave ranks 601–1,500,
reach even 5 usable lines. Projected drafts for Parts 2–4: **roughly 55–70%** (*estimate*), every part over the 40% line.

## Verdict

**Hold-dry.** Part 1 is already at 52% drafts; Parts 2–4 would be worse (29% of the 863 remaining Kelly A1 words have ≥ 5
usable Tatoeba lines; 2,847 usable short lines in all, against Danish's 7,886). The dry-source rule trips on every part.

Two things for Dan regardless of the Hold, both found while scouting:
1. **Recordings exist:** 174 of Part 1's 219 words have Lingua Libre files under `nor` (Q9043), which the pipeline does not
   query (it asks for `nob`, Q25167, 16 files). Pointing the check at Q9043 too, with a Bokmål-spelling check, would give
   Part 1 recordings.
2. **The Norwegian Kelly list is available** (CEFR bands, 1,000 A1 words, CC BY-SA 4.0), contrary to content-no/a1-list.json.
