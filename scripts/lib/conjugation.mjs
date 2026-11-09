// Present indicative from Wiktionary's own conjugation table ({{fr-conj-auto}} rendered on the verb's page).
// Never from memory: if the table can't be read, the grammar note shows no table.
import { getJson } from './http.mjs'

const text = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&#160;|&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()

export async function presentIndicative(lemma) {
  const r = await getJson(`https://en.wiktionary.org/w/api.php?action=parse&title=${encodeURIComponent(lemma)}&text=${encodeURIComponent('{{fr-conj-auto}}')}&prop=text&format=json`)
  const html = r?.parse?.text?.['*'] ?? ''
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) => [...m[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((c) => text(c[1])))
  // The person header comes just before the indicative block; the first "present" row after it is the one.
  const at = rows.findIndex((r) => r[0] === 'indicative')
  const persons = rows[at]?.slice(1)
  const row = rows.slice(at + 1).find((r) => r.includes('present'))
  if (!persons || !row) return null
  // Cells carry the pronunciation after the form (ai /e/); keep the form.
  const forms = row.slice(row.indexOf('present') + 1).map((cell) => cell.replace(/\s*\/[^/]*\//g, '').replace(/\s+or\s*$/, '').replace(/\s+\d+$/, '').trim())
  return persons.map((p, i) => ({ person: p, form: forms[i] })).filter((x) => x.person && x.form)
}
