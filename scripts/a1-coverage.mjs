// A1 coverage (A1 Complete, section 3): how much of a course's official A1 word list the course teaches, from its
// shipped content. A list word is taught when a course word has it as its lemma or form (soy counts for ser, habe for
// haben), and covered when those words appear in 3 or more live sentences. Numbers, prices, times, days, months and
// dates are measured on their own. Writes nothing; prints a report.
// Usage: COURSE=de node scripts/a1-coverage.mjs [--missing]
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { at, COURSE } from './lib/course.mjs'

const dir = at('src/content')
const t = Object.fromEntries(readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => [f.replace('.json', ''), JSON.parse(readFileSync(`${dir}/${f}`, 'utf8'))]))
const listFile = at('content/a1-list.json')
const list = existsSync(listFile) ? JSON.parse(readFileSync(listFile, 'utf8')) : null
const fold = (s) => String(s).toLowerCase().normalize('NFC').trim()

// Where a word sits: the main path (A1 units and help circles) or an optional topic pack.
const kind = new Map(t.units.map((u) => [u.unit_id, u.is_topic_pick === 'yes' ? 'pack' : 'path']))
const live = new Set(t.sentences.map((s) => s.sentence_id))
const sentencesOf = new Map()
for (const r of t.sentence_words) if (r.word_id && live.has(r.sentence_id)) (sentencesOf.get(r.word_id) ?? sentencesOf.set(r.word_id, new Set()).get(r.word_id)).add(r.sentence_id)
// Each course word under its lemma and its form.
const byKey = new Map()
for (const w of t.words) for (const k of new Set([fold(w.lemma || w.form), fold(w.form)])) (byKey.get(k) ?? byKey.set(k, []).get(k)).push(w)

function measure(words, { pathOnly = false } = {}) {
  let taught = 0, covered = 0
  const missing = [], thin = []
  for (const head of words) {
    const ws = (byKey.get(fold(head)) ?? []).filter((w) => !pathOnly || kind.get(w.first_unit) === 'path')
    if (!ws.length) { missing.push(head); continue }
    taught++
    const n = new Set(ws.flatMap((w) => [...(sentencesOf.get(w.word_id) ?? [])])).size
    if (n >= 3) covered++; else thin.push(`${head} (${n})`)
  }
  return { total: words.length, taught, covered, missing, thin }
}

// The theme sets the spec names, per language (plain vocabulary, written out here).
const THEMES = {
  de: {
    'Numbers to 100': ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig', 'hundert'],
    Prices: ['Euro', 'Cent', 'kosten', 'Preis', 'billig', 'teuer', 'bezahlen', 'Geld'],
    Times: ['Uhr', 'Minute', 'Stunde', 'halb', 'Viertel', 'vor', 'nach', 'Morgen', 'Vormittag', 'Mittag', 'Nachmittag', 'Abend', 'Nacht', 'spät', 'früh'],
    Days: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag', 'Wochenende', 'Tag', 'Woche', 'heute', 'morgen', 'gestern'],
    Months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember', 'Monat'],
    Dates: ['Datum', 'Jahr', 'erste', 'zweite', 'dritte', 'Geburtstag', 'Frühling', 'Sommer', 'Herbst', 'Winter'],
  },
  es: {
    'Numbers to 100': ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa', 'cien'],
    Prices: ['peso', 'dólar', 'euro', 'costar', 'precio', 'barato', 'caro', 'pagar', 'dinero'],
    Times: ['hora', 'minuto', 'media', 'cuarto', 'menos', 'mañana', 'mediodía', 'tarde', 'noche', 'temprano'],
    Days: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo', 'fin de semana', 'día', 'semana', 'hoy', 'mañana', 'ayer'],
    Months: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre', 'mes'],
    Dates: ['fecha', 'año', 'primero', 'cumpleaños', 'primavera', 'verano', 'otoño', 'invierno'],
  },
  fr: {
    'Numbers to 100': ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingts', 'quatre-vingt-dix', 'cent'],
    Prices: ['euro', 'centime', 'coûter', 'prix', 'cher', 'payer', 'argent'],
    Times: ['heure', 'minute', 'demie', 'quart', 'moins', 'matin', 'midi', 'après-midi', 'soir', 'nuit', 'tôt', 'tard'],
    Days: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche', 'week-end', 'jour', 'semaine', "aujourd'hui", 'demain', 'hier'],
    Months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre', 'mois'],
    Dates: ['date', 'an', 'année', 'premier', 'anniversaire', 'printemps', 'été', 'automne', 'hiver'],
  },
}

const pct = (a, b) => (b ? `${Math.round((a * 100) / b)}%` : '–')
console.log(`${COURSE}: ${t.words.length} course words, ${t.sentences.length} live sentences`)
if (list) {
  const all = measure(list.words)
  const path = measure(list.words, { pathOnly: true })
  console.log(`A1 list: ${list.words.length} words (${list.source.split(',')[0]})`)
  console.log(`  taught anywhere: ${all.taught} (${pct(all.taught, all.total)}); in 3+ sentences: ${all.covered} (${pct(all.covered, all.total)})`)
  console.log(`  main path only (units and help circles): taught ${path.taught} (${pct(path.taught, path.total)}); in 3+ sentences: ${path.covered} (${pct(path.covered, path.total)})`)
  // French core target (Dan, 2026-11-10): the list's 600 most frequent A1 words; the full list is the stretch goal.
  if (list.core) {
    const core = measure(list.core), corePath = measure(list.core, { pathOnly: true })
    console.log(`Core: the ${list.core.length} most frequent: taught ${core.taught} (${pct(core.taught, core.total)}); in 3+ sentences ${core.covered} (${pct(core.covered, core.total)}); main path ${corePath.taught} (${pct(corePath.taught, corePath.total)})`)
    if (process.argv.includes('--missing')) console.log(`  core missing, most frequent first: ${core.missing.join(', ')}`)
  }
  if (process.argv.includes('--missing')) { console.log(`  thin (under 3): ${all.thin.join(', ')}`); console.log(`  missing: ${all.missing.join(', ')}`) }
} else console.log('A1 list: none loaded (no official list stored for this course)')
for (const [name, words] of Object.entries(THEMES[COURSE])) {
  const m = measure(words)
  console.log(`  ${name}: taught ${m.taught} of ${m.total}; in 3+ sentences ${m.covered}${m.missing.length ? `; missing ${m.missing.slice(0, 12).join(', ')}${m.missing.length > 12 ? '…' : ''}` : ''}`)
}
