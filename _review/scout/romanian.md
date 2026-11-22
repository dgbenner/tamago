# Romanian (ron) — scout report, Parts 1–4

Scout pass, 2026-11-20. Research only. Part 1 is being gathered tonight by another job; this report covers Parts 1–4.
Numbers are measured unless marked *estimate*.

## Sources

**Tatoeba** (per-language exports downloaded 2026-11-20 into `.cache/tatoeba/`):

| measure | count |
|---|---|
| Romanian sentences, all | 41,983 |
| linked to an English translation | 31,994 |
| … by a native owner (user_languages.csv level 5) | 23,200 |
| … short (≤ 8 words), any owner | 26,174 |
| … short **and** native | **18,942** |
| … native and ≤ 5 words | 10,731 |
| registered native Romanian users | 151 |
| share of short native lines from the top 3 owners (CataG, elenacristina260, fathe) | 76% |

How usable the pool is at A1 (the deciding measure; diacritics folded on both sides): short native lines made **entirely**
of the most frequent word forms (hermitdave ro list):

| | top 500 forms | top 1,000 | top 2,000 |
|---|---|---|---|
| Romanian | 1,412 | **3,661** | 6,145 |
| Norwegian (Part 1 built: 52% drafts) | 1,717 | 2,847 | 4,103 |
| Danish (Part 1 built: 21% drafts) | 3,659 | 7,886 | 12,531 |
| Swedish (Part 1 built: 13% drafts) | 4,662 | 9,385 | 13,789 |
| Polish | 3,013 | 6,899 | 12,251 |

Word-level coverage (exact forms, short native lines): of the hermitdave top 600, 546 (91%) occur in ≥ 5 lines and 393 (66%)
in ≥ 20; of ranks 601–1,500, 63% occur in ≥ 5 lines.

Spelling: 269 Tatoeba Romanian lines use the old cedilla letters ş ţ instead of comma-below ș ț (17,847 use the correct ones).
The subtitle frequency list is cedilla-heavy and full of diacritic-less forms (sa, si, asa, daca). Both must be folded to
ș ț before any matching.

**Wiktionary** (en.wiktionary API, 2026-11-20). Sample: every 15th word of the hermitdave ro top 600 (40 words).
- Entries with a Romanian section: **36 / 40** (missing: înseamnă, ba, dupa (diacritic-less subtitle spelling), dl (abbreviation)).
- 25 lemma pages, 11 form-of pages.
- Noun headword template `{{ro-noun|<g>|<plural>}}`: gender is the first parameter (m / f / n, e.g. `{{ro-noun|f|zile}}`,
  `{{ro-noun|n|lucruri}}`, `{{ro-noun|m|fii}}`). In a second sample (first 25 noun and 15 verb lemma sections walking the list
  from rank 30), **25 / 25** noun headwords carried a gender. Caveat: several of those were homograph noun sections of
  function words (dacă, si, pot), which a sense pick must skip.
- Declension tables: `ro-noun-<gender>-<ending>` templates (ro-noun-f-e, ro-noun-n-uri, ro-noun-m-u …), and `ro-decl-adj` for
  adjectives. The rendered table for zi reads: nominative-accusative zi / ziua / zile / zilele; genitive-dative zile / zilei /
  zile / zilelor; vocative ziuo / zilelor — i.e. indefinite and definite (enclitic article) forms in one table.
- Conjugation: `{{ro-verb|<3sg>|<past participle>|<subjunctive>}}` headword plus `ro-conj-<class>` tables (ro-conj-2 face,
  ro-conj-e spune, ro-conj-ea putea, ro-conj-i / ro-conj-i-esc trebui, ro-conj-aux). Future/conditional auxiliaries have
  their own `{{ro-aux|…}}` pages (va, voi, vom, ar).
- `scripts/lib/conjugation.mjs` reads fr/es/de/it/pt/nl templates only; **ro-conj is not supported yet**.
- `check-content.mjs` genderFrom reads fr/de/es/it/pt/nb headwords only; **ro-noun is not read yet** (one regex to add).

**Lingua Libre:** Commons `Category:Lingua Libre pronunciation-ron` holds **24,123 files**.

## A1 word list

- **No Kelly list** (Kelly's nine languages: Arabic, Chinese, English, Greek, Italian, Norwegian, Polish, Russian, Swedish).
- **No open official list.** The nearest authority is an academic inventory, *Inventarul lexical al limbii române ca limbă
  străină, nivel A1* (Antonela-Carmen Arieșan-Simion, Babeș-Bolyai University, Cluj; thesis and book) — copyright, not
  downloadable as data. The Institutul Limbii Române publishes no A1 word list that the search found.
- **Recommended:** the frequency stand-in the Dutch, Danish and Norwegian builds used — hermitdave FrequencyWords
  `content/2018/ro/ro_50k.txt` (OpenSubtitles 2018), content **CC BY-SA 4.0**, https://github.com/hermitdave/FrequencyWords.
  Fold cedilla → comma-below and drop diacritic-less duplicates before cutting the top 600 / 1,000.
  Alternative: Leipzig Corpora Collection word lists (CC BY 4.0), written-language register.

## Grammar load for A1

- **Gender:** three (masculine, feminine, neuter; the neuter is masculine in the singular and feminine in the plural:
  *un lucru*, *două lucruri*). Wiktionary gives it in every sampled noun headword.
- **Articles:** indefinite *un / o* (plural *niște*) are separate words, so `lesson.js ARTICLES` fits them. The **definite
  article is enclitic** — a suffix (zi → ziua, zile → zilele, as Wiktionary's table shows). Every definite noun is a separate
  form the analyser must list. Teach the indefinite first, the definite form as a second form of each noun.
- **Cases:** nominative-accusative and genitive-dative (plus vocative). A1 learners meet nom-acc from the start, genitive-
  dative with *lui / ei* and possession around Part 2–3, vocative in greetings only as fixed phrases.
- **Verbs:** person-marked present with four conjugation classes, subject dropped; *a fi*, *a avea*, *a vrea* irregular; the
  subjunctive *să* + verb is everywhere in natural A1 Romanian (vreau să mănânc, trebuie să plec) and arrives early.
- **Clitic pronouns** joined by hyphen (s-a, m-am, nu-i, să-mi) — very frequent in the subtitle list.
- **Script:** Latin with ă â î ș ț.
- **Analyser impact — blocking:** `scripts/lib/french.mjs` tokenises with `[A-Za-zÀ-ÖØ-öø-ÿŒœ]`, which covers â and î but
  **not ă, ș, ț**. Tested: "Mulțumesc, mă bucur" tokenises as `Mul | umesc | m | bucur`. The tokeniser must be widened
  (e.g. to `\p{L}`) before any Romanian line can be checked. Not changed here (scout makes no code changes).
- Inflection load is moderate: each noun needs roughly 2–4 listed forms (indefinite/definite, singular/plural), each verb
  its present persons. Lighter than Polish, heavier than Italian.

## Nearness

Closest built course: **Italian** (Romance, no official A1 list, the same "frequency stand-in" path), then Spanish and
Portuguese. Carries over: the Part 1–4 frame (`scripts/add-part.mjs` with a `part2/ro.mjs` etc.), the circle themes, the
Italian/Portuguese pull and review flow, accent-pair handling (distinctByAccent) for ă/a, î/i, ș/s pairs. Does not carry
over: article logic (enclitic definite), the conjugation reader (needs ro-conj), the gender reader (needs ro-noun), and the
tokeniser.

## Judging themes for Romanian

- Every word introduced before it's tested; at most four new words a lesson — **definite forms count as new forms** (ziua is
  not zi to the analyser), so plan them in.
- Accepted answers use only taught words and taught forms (watch generated answers bringing in definite forms or *să* +
  subjunctive before they are taught).
- Gender, meaning, conjugation from Wiktionary (`ro-noun` gender, `ro-conj-*` tables); no glosses from memory.
- Drafts stay within the unit's words, marked `tamago_original`.
- Cut idioms and subtitle-style colloquialisms (naiba, haide, the clipped *tre'*), and Moldovan-only words if any appear.
- Cases in order: nom-acc first; genitive-dative not before it is taught; vocative only as set phrases.
- Spelling: comma-below ș ț only; reject cedilla lines or normalise them; reject diacritic-less lines.
- Near-cognates with Italian/French/English (familie, important, telefon) handled, not only identical matches.
- Register: tu for A1; dumneavoastră kept out until taught.
- Owner monoculture: 76% of usable lines come from three people — read for one person's quirks repeating.

## Projected draft share (*estimate*)

Calibration from built Part 1s: lines made of the top 1,000 forms — Swedish 9,385 → 13% drafts, Danish 7,886 → 21%,
Norwegian 2,847 → 52%. Romanian has **3,661**, much nearer Norwegian than Danish. Interpolating, Part 1 (~600–800 sentences)
would need roughly **40–50% drafts** (*estimate*); Parts 2–4 (~700 each, ranks 600–1,500, where only 63% of words reach 5
lines) roughly **40–55%** (*estimate*). That is at or over the spec's 40% dry-source line.

## Verdict

**Ready-with-caveats — at risk of Hold-dry.** Source richness is borderline: 18,942 short native lines, but only 3,661 built
from the 1,000 most frequent forms (Norwegian, which tripped, has 2,847). Let tonight's Part 1 decide: if its draft share
comes in over 40%, mark Romanian Hold-dry before Parts 2–4. Before any build: widen the tokeniser (ă ș ț), add ro-noun to
genderFrom and ro-conj to conjugation.mjs, and fold ş ţ → ș ț.
