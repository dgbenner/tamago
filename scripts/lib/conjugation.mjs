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
  // A leading newline, so a page that opens with its language heading (appeler, épeler: ==French== on the first line)
  // is found too; it fell back to the bare template, which gives the 1990 spelling appèle (Dan, 2026-11-15).
  const wt = '\n' + (r?.parse?.wikitext?.['*'] ?? '')
  const section = wt.split(/\n==(?!=)/).find((s) => s.startsWith(`${C.wiktionarySection}==`)) ?? ''
  return section.match(new RegExp(`\\{\\{${name}(?:\\|[^{}]*)?\\}\\}`))?.[0] ?? `{{${name}}}`
}

async function french(lemma) {
  // The page's own template (Fable, 2026-11-15): rappeler's says type=xxer, the double-l "rappelle" the course teaches;
  // the bare template gives the 1990 spelling "rappèle".
  const rows = tableRows(await render(lemma, await pageTemplate(lemma, 'fr-conj-auto')))
  // The person header comes just before the indicative block; the first "present" row after it is the one.
  const at = rows.findIndex((r) => r[0] === 'indicative')
  const persons = rows[at]?.slice(1)
  const row = rows.slice(at + 1).find((r) => r.includes('present'))
  if (!persons || !row) return null
  // Cells carry the pronunciation after the form (ai /e/), sometimes several joined by "or" (asseyons /…/ or /…/ or
  // /…/); drop the whole run, so no "or" is left hanging; keep the form or forms.
  const forms = row.slice(row.indexOf('present') + 1).map((cell) => cell.replace(/\s*\/[^/]*\/(?:\s+or\s+\/[^/]*\/)*/g, '').replace(/\s+\d+$/, '').replace(/\s+or\s*$/, '').trim())
  return persons.map((p, i) => ({ person: p, form: forms[i] })).filter((x) => x.person && x.form)
}

// Reflexive verbs (Dan, 2026-11-15): lavarse is lavar's own table with the pronoun in front of each form, me lavo, te
// lavas, se lava, nos lavamos, se lavan; the forms still come from Wiktionary (the plain verb's page).
const ES_REFLEXIVE = ['me', 'te', 'se', 'nos', 'se']
async function spanish(lemma) {
  if (/[aeií]rse$/.test(lemma)) {
    const base = await spanish(lemma.slice(0, -2))
    return base ? base.map((x, i) => ({ ...x, form: x.form === '—' ? x.form : String(x.form).split(/\s*,\s*|\s+or\s+/).map((f) => `${ES_REFLEXIVE[i]} ${f}`).join(', ') })) : null
  }
  const rows = tableRows(await render(lemma, await pageTemplate(lemma, 'es-conj')))
  const at = rows.findIndex((r) => r[0] === 'indicative')
  const row = rows[at + 1]
  if (at < 0 || row?.[0] !== 'present' || row.length < 7) return null
  // Cells: yo, tú (with "tú … vos …" alternatives), él/usted, nosotros, vosotros, ellos/ustedes. Keep the first form.
  const cell = (i) => row[i].split(/\s+(?:tú|vos)(?=\s|$)/)[0].replace(/\s+\d+$/, '').trim().replace(/\s+,/g, ',')
  // Weather verbs are taught in the third person only. Wiktionary marks llover that way (dashes) but gives nevar a
  // full table for its figurative use; both show the same shape (Fable's Part 3 review, 2026-11-15).
  const WEATHER = new Set(['llover', 'nevar'])
  const out = [['yo', 1], ['tú', 2], ['él, ella, usted', 3], ['nosotros, nosotras', 4], ['ellos, ellas, ustedes', 6]].map(([person, i]) => ({ person, form: WEATHER.has(lemma) && i !== 3 ? '—' : cell(i) }))
  return out.every((x) => x.form && !/[{}]/.test(x.form)) ? out : null
}

async function german(lemma) {
  // The page's own template, read here because a page that opens with ==German== has no line break before the
  // heading and the shared reader then misses the section and falls back to the bare template, which guesses regular
  // forms (nehmen came out as nehmst, nehmt; Fable, 2026-11-15).
  const r = await getJson(`https://en.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(lemma)}&prop=wikitext&format=json`)
  const section = ('\n' + (r?.parse?.wikitext?.['*'] ?? '')).split(/\n==(?!=)/).find((s) => s.startsWith(`${C.wiktionarySection}==`)) ?? ''
  const template = section.match(/\{\{de-conj(?:\|[^{}]*)?\}\}/)?.[0]
  if (!template) return null
  const rows = tableRows(await render(lemma, template))
  // present: [present, ich …, wir …, i, ich … (subjunctive)], then [du …, ihr …, …], then [er …, sie …, …].
  const at = rows.findIndex((r) => r[0] === 'present' && /^ich /.test(r[1] ?? ''))
  if (at < 0) return null
  const [a, b, c] = [rows[at].slice(1, 3), rows[at + 1]?.slice(0, 2), rows[at + 2]?.slice(0, 2)]
  if (!b || !c) return null
  // A cell may list alternatives, each with its pronoun (du duschst du duscht; ich daure ich dauere ich dauer): keep
  // one, the longest that keeps the verb's whole stem (duschst, dauere), else the first.
  const stem = lemma.replace(/e?n$/, '')
  const strip = (cell, pronoun) => {
    if (!cell?.startsWith(pronoun + ' ')) return ''
    const alts = cell.split(new RegExp(`(?:^|\\s)${pronoun}\\s`)).map((x) => x.replace(/\s+\d+$/, '').trim()).filter(Boolean)
    const whole = alts.filter((x) => x.split(' ')[0].startsWith(stem)).sort((x, y) => y.length - x.length)
    return whole[0] ?? alts[0] ?? ''
  }
  const out = [['ich', a[0], 'ich'], ['du', b[0], 'du'], ['er, sie, es', c[0], 'er'], ['wir', a[1], 'wir'], ['ihr', b[1], 'ihr'], ['sie, Sie', c[1], 'sie']]
    .map(([person, cell, p]) => ({ person, form: strip(cell, p) }))
  return out.every((x) => x.form && !/[{}]/.test(x.form)) ? out : null
}

// Italian (2026-11-14): {{it-conj|…}} as written on the verb's page. The table prints stress marks that are not
// spelling (hò, màngio, capìsco), so each form is read from its link's title, which is the word as written.
// Impersonal verbs (Dan, 2026-11-16): bisogna is the only form a learner meets, so it gets a note in its hint and no
// six-person table.
const IT_IMPERSONAL = new Set(['bisognare'])
async function italian(lemma) {
  if (IT_IMPERSONAL.has(lemma)) return null
  const r = await getJson(`https://en.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(lemma)}&prop=wikitext&format=json`)
  const section = ('\n' + (r?.parse?.wikitext?.['*'] ?? '')).split(/\n==(?!=)/).find((s) => s.startsWith(`${C.wiktionarySection}==`)) ?? ''
  const template = section.match(/\{\{it-conj(?:\|[^{}]*)?\}\}/)?.[0]
  if (!template) return null
  const html = await render(lemma, template)
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) => [...m[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((c) => c[1]))
  const at = rows.findIndex((row) => text(row[0] ?? '') === 'indicative' && text(row[1] ?? '') === 'io')
  const row = rows[at + 1]
  if (at < 0 || !row || text(row[0]) !== 'present' || row.length < 7) return null
  const form = (cell) => cell.match(/<a [^>]*title="([^"#(]+?)(?: \(page does not exist\))?"/)?.[1]?.trim() ?? ''
  const out = [['io', 1], ['tu', 2], ['lui, lei, Lei', 3], ['noi', 4], ['voi', 5], ['loro', 6]].map(([person, i]) => ({ person, form: form(row[i]) }))
  return out.every((x) => x.form && !/[{}<>]/.test(x.form)) ? out : null
}

// Brazilian Portuguese (2026-11-14): {{pt-conj}} as written on the verb's page. The course's persons: eu, você with
// ele and ela, nós, vocês with eles and elas (no tu, no vós).
// Impersonal verbs (Fable, 2026-11-19): chove, neva and há are the only forms a learner meets, so no table, and the
// Glossary hint says so. The você command (vire, pare, siga: the present subjunctive's third person) joins each table
// as its last row, so the Glossary shows it its table and the trainer asks for it.
const PT_IMPERSONAL = new Set(['chover', 'nevar', 'haver'])
async function portuguese(lemma) {
  if (PT_IMPERSONAL.has(lemma)) return null
  const r = await getJson(`https://en.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(lemma)}&prop=wikitext&format=json`)
  const section = ('\n' + (r?.parse?.wikitext?.['*'] ?? '')).split(/\n==(?!=)/).find((s) => s.startsWith(`${C.wiktionarySection}==`)) ?? ''
  const template = section.match(/\{\{pt-conj(?:\|[^{}]*)?\}\}/)?.[0]
  if (!template) return null
  const rows = tableRows(await render(lemma, template))
  const at = rows.findIndex((row) => row[0] === 'Indicative')
  const row = rows[at + 1]
  if (at < 0 || row?.[0] !== 'Present' || row.length < 7) return null
  const cell = (i) => row[i].split(/\s*[,/]\s*/)[0].replace(/\s+\d+$/, '').trim()
  const out = [['eu', 1], ['você, ele, ela', 3], ['nós', 4], ['vocês, eles, elas', 6]].map(([person, i]) => ({ person, form: cell(i) }))
  const sub = rows.findIndex((row) => row[0] === 'Subjunctive'), subRow = rows[sub + 1]
  if (sub >= 0 && subRow?.[0] === 'Present' && subRow.length >= 4) {
    const cmd = subRow[3].split(/\s*[,/]\s*/)[0].replace(/\s+\d+$/, '').trim()
    if (cmd && !/[{}<>—]/.test(cmd)) out.push({ person: 'você (imperativo)', form: cmd })
  }
  return out.every((x) => x.form && !/[{}<>—]/.test(x.form)) ? out : null
}

// Dutch (2026-11-19): the verb page's own conjugation template ({{nl-conj-wk}} weak, {{nl-conj-st}} strong,
// {{nl-conj-irr}} irregular). The present-tense column of the table; the course's persons are ik, jij/je,
// hij/zij/het and the plural (wij, jullie, zij — all the infinitive). The 2nd-person cell lists the inverted
// form after a comma (jij loopt, loop jij?): keep the first, the plain jij form.
async function dutch(lemma) {
  const r = await getJson(`https://en.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(lemma)}&prop=wikitext&format=json`)
  const section = ('\n' + (r?.parse?.wikitext?.['*'] ?? '')).split(/\n==(?!=)/).find((s) => s.startsWith(`${C.wiktionarySection}==`)) ?? ''
  const template = section.match(/\{\{nl-conj[a-z-]*(?:\|[^{}]*)?\}\}/)?.[0]
  if (!template) return null
  const rows = tableRows(await render(lemma, template))
  const head = rows.findIndex((row) => row.includes('present tense'))
  if (head < 0) return null
  const col = rows[head].indexOf('present tense')
  const byLabel = (label) => { const row = rows.find((r) => r[0] === label); return row ? String(row[col] ?? '').split(',')[0].replace(/\s+\d+$/, '').trim() : '' }
  const out = [
    { person: 'ik', form: byLabel('1st person singular') },
    { person: 'jij, je', form: byLabel('2nd person sing. ( jij )') },
    { person: 'hij, zij, het', form: byLabel('3rd person singular') },
    { person: 'wij, jullie, zij', form: byLabel('plural') },
  ]
  return out.every((x) => x.form && !/[{}<>—]/.test(x.form)) ? out : null
}

// Swedish (2026-11-19): the present tense is one form for every person (jag/du/han/vi talar), so a per-person table
// would only repeat it. No table is built; the grammar note carries the pattern in prose. Returning null is the
// "no table" signal check-content already handles (like the other readers when a table can't be read).
async function swedish() { return null }

// Danish (2026-11-19): the present tense is one form for every person (jeg er, du er, han er; jeg taler, vi taler),
// so the course teaches no per-person verb table. No grammar note sets a conjugation_lemma; this stays null.
// Norwegian Bokmål (2026-11-19): the present tense is one form for every person (jeg er, du er, han er; jeg spiser,
// du spiser), so a per-person table teaches nothing and the grammar note carries the rule instead. No table is built,
// the same outcome as a verb whose table the other courses can't parse (null), which the pipeline already handles.
async function norwegian() { return null }

// Polish (2026-11-21, branch content/pl-a1): the verb page's own {{pl-conj|…}} call, as written in its Polish section;
// never a bare template. Its table has a "present tense" row (1st person: singular, plural) and the next two rows
// (2nd, 3rd); the persons are ja, ty, on/ona/ono, my, wy, oni/one, the course's ty throughout (Pan and Pani, which
// take the third person, are not a column of their own). A perfective verb has no present row (its simple forms are
// the future), so it gets no table: Part 1 teaches the imperfective present only. A cell with two forms keeps both,
// joined by "or" as the other courses' tables do.
async function polish(lemma) {
  const r = await getJson(`https://en.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(lemma)}&prop=wikitext&format=json`)
  const section = ('\n' + (r?.parse?.wikitext?.['*'] ?? '')).split(/\n==(?!=)/).find((s) => s.startsWith(`${C.wiktionarySection}==`)) ?? ''
  const template = section.match(/\{\{pl-conj(?:\|(?:[^{}]|\{\{[^{}]*\}\})*)?\}\}/)?.[0]
  if (!template) return null
  const rows = tableRows(await render(lemma, template))
  const at = rows.findIndex((row) => row[0] === 'present tense' && row[1] === '1 st')
  if (at < 0 || rows[at + 1]?.[0] !== '2 nd' || rows[at + 2]?.[0] !== '3 rd') return null
  const [first, second, third] = [rows[at].slice(2), rows[at + 1].slice(1), rows[at + 2].slice(1)]
  if ([first, second, third].some((x) => x.length !== 2)) return null
  const form = (c) => c.split(/\s*,\s*/).map((x) => x.replace(/\s+\d+$/, '').trim()).filter(Boolean).join(' or ')
  const out = [['ja', first[0]], ['ty', second[0]], ['on, ona, ono', third[0]], ['my', first[1]], ['wy', second[1]], ['oni, one', third[1]]].map(([person, c]) => ({ person, form: form(c) }))
  return out.every((x) => x.form && !/[{}<>—]/.test(x.form)) ? out : null
}

export const presentIndicative = { fr: french, es: spanish, de: german, it: italian, pt: portuguese, nl: dutch, sv: swedish, da: async () => null, no: norwegian, pl: polish }[COURSE]
