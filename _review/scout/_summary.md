# Scout summary — ranked by readiness (2026-11-20)

None is plain Ready: both buildable languages need the analyser's tokeniser widened first (french.mjs takes Latin-1 only, so
Romanian ă ș ț and Polish ą ć ę ł ń ś ź ż split words). Source is ranked first because the dry-source rule is a hard stop and
grammar is engineering.

"Usable lines" = Tatoeba lines linked to English, native owner, ≤ 8 words, made only of the 1,000 most frequent word forms.
Calibration from built Part 1s: Swedish 9,385 → 13% drafts, Danish 7,886 → 21%, Norwegian 2,847 → 52%.

1. **Polish — Ready-with-caveats.** 60,141 short native lines, 6,899 usable (near Danish); Kelly A1 list with CEFR bands (1,073
   lemmas, CC BY-NC-SA 2.0, as Italian's); 98,587 Lingua Libre files. Projected drafts 20–30% Part 1, 25–35% later (estimate).
   Caveats: tokeniser (blocking), seven cases mean several listed forms per word, `pl-noun` / `pl-conj` readers needed.
2. **Romanian — Ready-with-caveats, at risk of Hold-dry.** 18,942 short native lines but only 3,661 usable (nearer Norwegian
   than Danish); no Kelly or open official list (hermitdave stand-in, CC BY-SA 4.0); 24,123 Lingua Libre files. Projected drafts
   40–50% Part 1, 40–55% later (estimate). Tonight's Part 1 draft share decides: over 40% means Hold-dry before Parts 2–4.
   Caveats: tokeniser (blocking), enclitic definite article, `ro-noun` / `ro-conj` readers, ş ţ → ș ț folding.
3. **Norwegian Bokmål (Parts 2–4) — Hold-dry.** Part 1 already 52% drafts; 2,847 usable lines; only 29% of the 863 untaught
   Kelly A1 words have ≥ 5 usable lines. Projected drafts 55–70% a part (estimate).

## For Dan

- Polish's Kelly list is CC BY-NC-SA 2.0 (non-commercial), the same as Italian's. Accept it, or use hermitdave (CC BY-SA 4.0).
- Norwegian: Lingua Libre has 5,800 Norwegian (`nor`, Q9043) recordings; the pipeline asks only for `nob` (Q25167, 16 files).
  174 of Part 1's 219 words have one. Needs a Bokmål-spelling check per file. Your call whether Builder 1 points the check there.
- Norwegian: a Kelly list with CEFR bands exists (1,000 A1 words, CC BY-SA 4.0); content-no/a1-list.json says it doesn't.
  Your call whether to switch the measuring list.
- Before any Polish or Romanian build: the tokeniser change in scripts/lib/french.mjs (Builder 1, engine).

Greek, Czech, Hungarian, Finnish: struck by Dan, 2026-11-20 (not scouted).
