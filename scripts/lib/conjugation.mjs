// Present indicative from Wiktionary's own conjugation table, rendered from the verb page's template. Never from
// memory: if the table can't be read, the grammar note shows no table.
// French renders {{fr-conj-auto}}. Spanish and German render the template call written on the verb's own page
// (2026-11-10: a bare template guessed regular forms, and the French reader read nonsense out of the Spanish table).
// Spanish keeps the course's persons: yo, tú, él/ella/usted, nosotros, ellos/ellas/ustedes (no vosotros, no vos).
import { getJson } from './http.mjs'
import { COURSE, C } from './course.mjs'

const text = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&#160;|&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
const tableRows = (html) => [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) => [...m[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((c) => text(c[1])))
const render = async (lemma, template) => (await getJson(`https://en.wiktionary.org/w/api.php?action=parse&title=${encodeURIComponent(lemma)}&text=${encodeURIComponent(template)}&prop=text&format=json`))?.parse?.text?.['*'] ?? ''

// The conjugation template written in the course language's section of the verb's page, else the bare template.
async function pageTemplate(lemma, name) {
  const r = await getJson(`https://en.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(lemma)}&prop=wikitext&format=json`)
  const wt = r?.parse?.wikitext?.['*'] ?? ''
  const section = wt.split(/\n==(?!=)/).find((s) => s.startsWith(`${C.wiktionarySection}==`)) ?? ''
  return section.match(new RegExp(`\\{\\{${name}(?:\\|[^{}]*)?\\}\\}`))?.[0] ?? `{{${name}}}`
}

async function french(lemma) {
  const rows = tableRows(await render(lemma, '{{fr-conj-auto}}'))
  // The person header comes just before the indicative block; the first "present" row after it is the one.
  const at = rows.findIndex((r) => r[0] === 'indicative')
  const persons = rows[at]?.slice(1)
  const row = rows.slice(at + 1).find((r) => r.includes('present'))
  if (!persons || !row) return null
  // Cells carry the pronunciation after the form (ai /e/); keep the form.
  const forms = row.slice(row.indexOf('present') + 1).map((cell) => cell.replace(/\s*\/[^/]*\//g, '').replace(/\s+or\s*$/, '').replace(/\s+\d+$/, '').trim())
  return persons.map((p, i) => ({ person: p, form: forms[i] })).filter((x) => x.person && x.form)
}

async function spanish(lemma) {
  const rows = tableRows(await render(lemma, await pageTemplate(lemma, 'es-conj')))
  const at = rows.findIndex((r) => r[0] === 'indicative')
  const row = rows[at + 1]
  if (at < 0 || row?.[0] !== 'present' || row.length < 7) return null
  // Cells: yo, tú (with "tú … vos …" alternatives), él/usted, nosotros, vosotros, ellos/ustedes. Keep the first form.
  const cell = (i) => row[i].split(/\s+(?:tú|vos)(?=\s|$)/)[0].replace(/\s+\d+$/, '').trim().replace(/\s+,/g, ',')
  const out = [['yo', 1], ['tú', 2], ['él, ella, usted', 3], ['nosotros, nosotras', 4], ['ellos, ellas, ustedes', 6]].map(([person, i]) => ({ person, form: cell(i) }))
  return out.every((x) => x.form && !/[{}]/.test(x.form)) ? out : null
}

async function german(lemma) {
  const rows = tableRows(await render(lemma, await pageTemplate(lemma, 'de-conj')))
  // present: [present, ich …, wir …, i, ich … (subjunctive)], then [du …, ihr …, …], then [er …, sie …, …].
  const at = rows.findIndex((r) => r[0] === 'present' && /^ich /.test(r[1] ?? ''))
  if (at < 0) return null
  const [a, b, c] = [rows[at].slice(1, 3), rows[at + 1]?.slice(0, 2), rows[at + 2]?.slice(0, 2)]
  if (!b || !c) return null
  const strip = (cell, pronoun) => (cell?.startsWith(pronoun + ' ') ? cell.slice(pronoun.length + 1).replace(/\s+\d+$/, '').trim() : '')
  const out = [['ich', a[0], 'ich'], ['du', b[0], 'du'], ['er, sie, es', c[0], 'er'], ['wir', a[1], 'wir'], ['ihr', b[1], 'ihr'], ['sie, Sie', c[1], 'sie']]
    .map(([person, cell, p]) => ({ person, form: strip(cell, p) }))
  return out.every((x) => x.form && !/[{}]/.test(x.form)) ? out : null
}

export const presentIndicative = { fr: french, es: spanish, de: german }[COURSE]
