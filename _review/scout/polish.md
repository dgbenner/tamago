# Polish (pol) — scout report, full A1 (Parts 1–4)

Scout pass, 2026-11-20. Research only; nothing built. Numbers are measured unless marked *estimate*.

## Sources

**Tatoeba** (exports downloaded 2026-11-20 into `.cache/tatoeba/`):

| measure | count |
|---|---|
| Polish sentences, all | 137,214 |
| linked to an English translation | 78,664 |
| … by a native owner (level 5) | 65,235 |
| … short (≤ 8 words), any owner | 72,076 |
| … short **and** native | **60,141** |
| … native and ≤ 5 words | 43,262 |
| registered native users | 777 |
| share of short native lines from the top 3 owners (jeedrek, zipangu, arie) | 40% (the least concentrated of the three languages) |

Usable at A1 (short native lines made entirely of the most frequent forms, hermitdave pl list, diacritics folded):
top 500 forms 3,013; **top 1,000 forms 6,899**; top 2,000 forms 12,251 — close to Danish (7,886 / 12,531) and far above
Norwegian (2,847 / 4,103). Because Polish inflects, the top 1,000 *forms* cover fewer lemmas than in Danish, so this measure
already prices in the case load.

Word coverage: of the hermitdave top 600 forms, 590 (98%) occur in ≥ 5 short native lines and 559 (93%) in ≥ 20; of ranks
601–1,500, 90% reach 5 lines. Against the **Polish Kelly A1 band** (1,073 distinct single-word lemmas): 652 (61%) appear as the
exact lemma form in ≥ 5 short native lines, 385 (36%) in ≥ 20; counting any form on the lemma's stem (upper bound), 931 (87%).
Swedish's Kelly A1 scores 50% on the same exact-form test, and Swedish Part 1 came in at 13% drafts.

**Wiktionary** (en.wiktionary API, 2026-11-20). Sample: every 15th word of the hermitdave pl top 600 (40 words).
- Entries with a Polish section: **40 / 40**. Many top-600 words are inflected forms (musisz, wiemy, ludzi, kobiety, czasie,
  prawdę), which Polish Wiktionary gives as `{{pl-head|…}}` form entries pointing to the lemma.
- Noun headword `{{pl-noun|<gender>}}`, gender first: `m-pr` (masculine personal: pan, kto), `m-anml` (animate), `m-in`
  (inanimate: czas, dzień, raz), `f` (prawda, cześć, pani), `n` (życie, nic), plural-only `vr-p` (virile: ludzie) / `nv-p`
  (drzwi, dzięki). In a second sample (first 25 noun lemma sections from rank 30), **24 / 25** headwords carried the gender
  (the 25th was a stray `{{wp}}` line). Several were homograph noun sections of function words (coś, teraz, bez, niż), which
  a sense pick must skip.
- Declension: `pl-ndecl` (nouns), `pl-adecl` (adjectives). The rendered table for dzień gives all seven cases, singular and
  plural (nominative dzień / dni, dnie; genitive dnia / dni; dative dniowi, dniu / dniom; accusative dzień; instrumental
  dniem / dniami; locative dniu / dniach; vocative dniu).
- Verbs: `{{pl-verb|impf|pf=…}}` / `{{pl-verb|pf|impf=…}}` — **aspect and its partner verb are in the headword**
  (być impf; zrobić pf ↔ robić; powiedzieć pf ↔ mówić; zobaczyć pf ↔ widzieć). **15 / 15** sampled verbs carried aspect and
  a `pl-conj` table.
- conjugation.mjs reads no `pl-conj`; check-content genderFrom reads no `pl-noun`. Both need adding.

**Lingua Libre:** Commons `Category:Lingua Libre pronunciation-pol` holds **98,587 files** — the richest of any course
language, built or not (Italian 12,638, Swedish 9,797).

## A1 word list

- **Polish Kelly list, with CEFR bands.** `Polish_M3.xls` (Kelly project; the University of Leeds Kelly page no longer serves
  it), archived from kellyproject.eu:
  http://web.archive.org/web/20141128233029/http://www.kellyproject.eu/wp-content/uploads/2012/07/Polish_M3.xls
  — 8,459 rows: A1 1,399 / A2 1,310 / B1 1,304 / B2 1,408 / C1 1,386 / C2 1,652; columns ipm, band, lemma, POS, sense
  indication. A1 = 1,097 distinct lemmas (1,073 single words).
- **Licence:** Wiktionary's Polish frequency-list page gives it as Creative Commons **BY-NC-SA 2.0** — the same licence the
  Italian Kelly list already ships under (content-it/a1-list.json), so there is precedent.
- Register: like Italian, a web corpus — the A1 band holds administracja, archiwum, armia, analiza, parlament, podatek,
  papież. An `a1-exclude.json` (Italian has 44) will be needed.
- Alternatives: hermitdave FrequencyWords `content/2018/pl/pl_50k.txt` (CC BY-SA 4.0) as Dutch/Danish used; Leipzig Corpora
  (CC BY 4.0). No open official (State Commission for the Certification of Polish) A1 word list was found.

## Grammar load for A1

- **Cases: seven** (nominative, genitive, accusative, dative, instrumental, locative, vocative). Order for A1, as the
  dangers come: nominative (to jest…) → accusative (mam kota, lubię kawę) → instrumental with być for jobs and identity
  (jestem studentem) → locative with w / na for places (w domu, w Warszawie) → genitive with nie ma, quantities, numbers 5+
  (nie ma mleka, pięć złotych) → vocative only in set phrases (Panie…, Mamo!) → dative late (pronouns mi, ci in podoba mi się).
  Genitive of negation (nie mam czasu) appears in almost every negative line — it can't wait until late.
- **Gender:** three in the singular; masculine split personal / animate / inanimate; plural virile vs non-virile. All in
  the Wiktionary headword.
- **No articles.** lesson.js ARTICLES gets none; Type the Word's "with or without an article" doesn't apply.
- **Aspect:** imperfective/perfective pairs; A1 present uses the imperfective, perfective futures (zrobię, zobaczę) and the
  past (gendered: zrobiłem / zrobiłam) arrive by Parts 3–4. The past tense's gender agreement means drafts must pick the
  speaker's gender.
- **Numbers govern case** (2–4 + nominative plural, 5+ + genitive plural).
- **Formal address** Pan / Pani with the third person — frequent in Tatoeba; keep ty for A1 or teach Pan/Pani as a unit.
- **Script:** Latin plus ą ć ę ł ń ó ś ź ż.
- **Analyser impact — blocking:** `scripts/lib/french.mjs` tokenises with `[A-Za-zÀ-ÖØ-öø-ÿŒœ]`; of Polish's letters only
  ó is inside it. Tested: "Dziękuję, łóżko źle" tokenises as `Dzi | kuj | ó | ko | le`. The tokeniser must be widened (e.g.
  `\p{L}`) before any Polish line can be checked. Not changed here.
- **Analyser impact — form load:** the analyser matches exact listed forms. Each noun used in several cases is several
  words (kot, kota, kotem, kocie), each verb several persons. "At most four new words a lesson" will bite: a circle's word
  list will be roughly 2–3× its lemma count (*estimate*). Grouping forms of one lemma so that a known lemma's new case form
  counts lighter would help, but that is an engine decision, not a content one.

## Nearness

No Slavic course is built. Nearest for **cases**: German (forms listed as separate words: der/den/dem, the de-conj table
reader). Nearest for **workflow**: Italian (Kelly A1 list with CEFR bands, NC licence, a1-exclude for officialese, the same
four-part frame via `scripts/add-part.mjs` and `part2/pl.mjs` …). Carries over: the pull/review/apply-candidates flow,
word-senses, the accent-pair guard (distinctByAccent; Polish pairs like z/ż, o/ó, a/ą will need it), regional.js not needed.
New: tokeniser, `pl-noun` gender, `pl-conj` tables, a declension display if the Glossary is to show cases.

## Judging themes for Polish

- **Cases appearing before they're taught** — the first thing to watch: a Part 1 line with nie ma + genitive or w + locative
  before those notes exist.
- Every word introduced before it's tested; ≤ 4 new words a lesson, **with each case form counted as a word**.
- Accepted answers use only taught words *and taught case forms*; generated answers will reach for forms not yet taught.
- Gender (incl. personal/animate), meaning, aspect partner and conjugation from Wiktionary (`pl-noun`, `pl-verb`, `pl-conj`);
  no glosses from memory.
- Gender agreement: adjectives with nouns; past-tense verbs with the speaker (drafts must be consistent).
- Aspect: imperfective present first; perfective only with its note.
- Drafts stay within the unit's words and are marked; drafts must not outnumber sourced lines.
- Cut idioms, misleading-at-level lines and Pan/Pani lines until formal address is taught.
- Near-cognates (telefon, problem, autobus, kawa ~ coffee) handled.
- Register: ty for A1.

## Projected draft share (*estimate*)

Calibration from built Part 1s, lines made of the top 1,000 forms: Swedish 9,385 → 13% drafts, Danish 7,886 → 21%,
Norwegian 2,847 → 52%. Polish has 6,899, so Part 1 (~600–800 sentences) projects to roughly **20–30% drafts**. Later parts
(~700 each): 90% of ranks 601–1,500 reach 5 usable lines, but the Kelly register words (as in Italian, whose Part 4 drafted
heavily on its officialese) and the "taught forms only" rule will push drafts up — roughly **25–35%** (*estimate*). Under the
40% line on source alone; the form-matching rule is the real risk, and it is not measured here.

## Verdict

**Ready-with-caveats.** Source-rich (60,141 short native lines; 6,899 made of the top 1,000 forms; 98,587 recordings) — the
best-sourced of the three. The caveats are grammar and engine, not source: the tokeniser must take ą ć ę ł ń ś ź ż first
(blocking), `pl-noun` gender and `pl-conj` tables need readers, and seven cases mean many listed forms per word, so Part 1's
circle plan needs the case order above built in from the start.
