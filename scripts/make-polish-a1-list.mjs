// The Polish A1 list (Builder 2, 2026-11-21, branch content/pl-a1; Dan's choice): every A1 entry of the Polish Kelly
// list, headwords only, from Polish_M3.xls (Kelly project, archived from kellyproject.eu). Rows whose lemma cell is
// empty are the list's multiword items under a lemma (dzień dobry under dzień) and are not headwords of their own.
// A lemma that names forms is split into them: autor/ka → autor, autorka; leka-rz/rka → lekarz, lekarka;
// przewodnicząc-y/a → przewodniczący, przewodnicząca; czasami/czasem → both; przeciw(ko) → przeciw, przeciwko;
// zapytać (się) → zapytać. Reflexive verbs keep się (uczyć się), as the list writes them. A headword listed under two
// parts of speech (tak, jak, za) appears once, at its highest frequency. Words are ranked by the list's own ipm, most
// frequent first; core is the 600 most frequent (as Italian's Kelly list).
// Usage: node scripts/make-polish-a1-list.mjs <Polish_M3.xls> content-pl/a1-list.json
import { writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const XLSX = createRequire(import.meta.url)('xlsx')
const [from, to] = process.argv.slice(2)
const rows = XLSX.utils.sheet_to_json(XLSX.readFile(from).Sheets.list, { defval: '' }).filter((r) => r.band === 'A1' && String(r.lemma).trim())
const SPLIT = {
  'autor/ka': ['autor', 'autorka'], 'czasami/czasem': ['czasami', 'czasem'], 'leka-rz/rka': ['lekarz', 'lekarka'],
  'przeciw(ko)': ['przeciw', 'przeciwko'], 'przewodnicząc-y/a': ['przewodniczący', 'przewodnicząca'], 'skąd(że)': ['skąd', 'skądże'],
  'szef/owa': ['szef', 'szefowa'], 'Żyd/ówka': ['Żyd', 'Żydówka'], 'zapytać (się)': ['zapytać'],
}
const best = new Map()
for (const r of rows) {
  const lemma = String(r.lemma).trim()
  const forms = SPLIT[lemma] ?? (/[/()-]/.test(lemma) ? null : [lemma])
  if (!forms) throw new Error(`unhandled lemma ${lemma}`)
  for (const f of forms) if (!best.has(f) || best.get(f) < Number(r.ipm)) best.set(f, Number(r.ipm))
}
const words = [...best].sort((a, b) => b[1] - a[1]).map(([w]) => w)
const out = {
  _about: `The A1 word list the Polish course is measured against (Dan, 2026-11-21): every entry graded A1 in the Polish Kelly list, headwords only (${rows.length} A1 lemma rows; its multiword items under a lemma are left out). Lemmas that name two forms are split into both (autor/ka gives autor and autorka; leka-rz/rka lekarz and lekarka), so the list holds ${words.length} words; reflexive verbs keep się as the list writes them. Kelly grades by corpus frequency (a web corpus), so the band leans to written, public Polish (administracja, parlament, papież) more than a syllabus would. Core target (as Italian's Kelly list): the 600 most frequent of these words by the list's own ipm; the full list is the stretch goal. Built by scripts/make-polish-a1-list.mjs.`,
  source: 'Kelly project (Keywords for Language Learning for Young and adults alike), Polish list Polish_M3.xls, archived from http://www.kellyproject.eu/wp-content/uploads/2012/07/Polish_M3.xls (http://web.archive.org/web/20141128233029/http://www.kellyproject.eu/wp-content/uploads/2012/07/Polish_M3.xls)',
  license: 'CC BY-NC-SA 2.0 (https://creativecommons.org/licenses/by-nc-sa/2.0/); headwords only',
  citation: 'Kilgarriff, A., Charalabopoulou, F., Gavrilidou, M., Johannessen, J. B., Khalil, S., Johansson Kokkinakis, S., Lew, R., Sharoff, S., Vadlapudi, R. and Volodina, E. (2014). Corpus-based vocabulary lists for language learners for nine languages. Language Resources and Evaluation 48, 121-163.',
  retrieved: '2026-11-21',
  words,
  core: words.slice(0, 600),
}
writeFileSync(to, JSON.stringify(out, null, 2) + '\n')
console.log(`${to}: ${words.length} words, core ${out.core.length}`)
