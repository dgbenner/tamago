// A1 coverage (A1 Complete, section 3): how much of a course's official A1 word list the course teaches, from its
// shipped content. A list word is taught when a course word has it as its lemma or form (soy counts for ser, habe for
// haben), and covered when those words appear in 3 or more live sentences. Numbers, prices, times, days, months and
// dates are measured on their own. Writes nothing; prints a report.
// Usage: COURSE=de node scripts/a1-coverage.mjs [--missing]
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { at, COURSE } from './lib/course.mjs'
import { REGIONAL as REGIONAL_TWINS } from '../src/lib/regional.js'

const dir = at('src/content')
const t = Object.fromEntries(readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => [f.replace('.json', ''), JSON.parse(readFileSync(`${dir}/${f}`, 'utf8'))]))
const listFile = at('content/a1-list.json')
const list = existsSync(listFile) ? JSON.parse(readFileSync(listFile, 'utf8')) : null
// œ folds to oe (FLELex writes oeil, Wiktionary œil).
const fold = (s) => String(s).toLowerCase().normalize('NFC').replace(/œ/g, 'oe').trim()

// Where a word sits: the main path (A1 units and help circles) or an optional topic pack.
const kind = new Map(t.units.map((u) => [u.unit_id, u.is_topic_pick === 'yes' ? 'pack' : 'path']))
const live = new Set(t.sentences.map((s) => s.sentence_id))
const sentencesOf = new Map()
for (const r of t.sentence_words) if (r.word_id && live.has(r.sentence_id)) (sentencesOf.get(r.word_id) ?? sentencesOf.set(r.word_id, new Set()).get(r.word_id)).add(r.sentence_id)
// Each course word under its lemma and its form.
const byKey = new Map()
for (const w of t.words) for (const k of new Set([fold(w.lemma || w.form), fold(w.form)])) (byKey.get(k) ?? byKey.set(k, []).get(k)).push(w)
// French elided forms teach their headword (j' is je, c'est carries ce), which FLELex lists in full; FLELex lists
// vacances under vacance.
const ELIDED = { fr: { "j'": 'je', "l'": 'le', "s'": 'se', "m'": 'me', "t'": 'te', "d'": 'de', "n'": 'ne', "qu'": 'que', "c'": 'ce', "c'est": 'ce', vacances: 'vacance' },
  // German (2026-11-15): the Goethe list writes inflected words as stems (ander-, dies-, jed-, letzt-, nächst-, best-,
  // all-, welch-, meist-) and some verbs with their partner (weh tun, Rad fahren, sich kümmern); the course teaches
  // the full forms.
  de: { andere: 'ander', anderen: 'ander', jeden: 'jed', jede: 'jed', diese: 'dies', dieser: 'dies', dieses: 'dies', letzte: 'letzt', letzten: 'letzt', nächste: 'nächst', nächsten: 'nächst',
    beste: 'best', besten: 'best', alle: 'all', welche: 'welch', meisten: 'meist', weh: 'weh tun', rad: 'rad fahren', kümmern: 'sich kümmern' } }[COURSE] ?? {}
for (const w of t.words) { const k = ELIDED[fold(w.form)]; if (k) (byKey.get(k) ?? byKey.set(k, []).get(k)).push(w) }
// Regional twins (Dan, 2026-11-15; src/lib/regional.js, the list Type the Word accepts too): Spanish is Mexican-standard
// and the PCIC list is Spain's, so a Mexican word the course teaches counts for its Spain headword. Both numbers are
// reported: the list as written, and with the twins.
const REGIONAL = Object.fromEntries((REGIONAL_TWINS[COURSE] ?? []).map(([m, spain, head]) => [m, head ?? spain]))
const byKeyTwins = new Map([...byKey].map(([k, v]) => [k, [...v]]))
for (const w of t.words) { const k = REGIONAL[fold(w.form)]; if (k) (byKeyTwins.get(k) ?? byKeyTwins.set(k, []).get(k)).push(w) }
const hasTwins = Object.keys(REGIONAL).length > 0

function measure(words, { pathOnly = false, keys = byKey } = {}) {
  let taught = 0, covered = 0
  const missing = [], thin = []
  for (const head of words) {
    const ws = (keys.get(fold(head)) ?? []).filter((w) => !pathOnly || kind.get(w.first_unit) === 'path')
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
  it: {
    'Numbers to 100': ['zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci', 'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta', 'cento'],
    Prices: ['euro', 'centesimo', 'costare', 'prezzo', 'caro', 'economico', 'pagare', 'soldi'],
    Times: ['ora', 'minuto', 'mezzo', 'quarto', 'meno', 'mattina', 'mezzogiorno', 'pomeriggio', 'sera', 'notte', 'presto', 'tardi'],
    Days: ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato', 'domenica', 'fine settimana', 'giorno', 'settimana', 'oggi', 'domani', 'ieri'],
    Months: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre', 'mese'],
    Dates: ['data', 'anno', 'primo', 'compleanno', 'primavera', 'estate', 'autunno', 'inverno'],
  },
  pt: {
    'Numbers to 100': ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa', 'cem'],
    Prices: ['real', 'centavo', 'custar', 'preço', 'caro', 'barato', 'pagar', 'dinheiro'],
    Times: ['hora', 'minuto', 'meia', 'quarto', 'menos', 'manhã', 'meio-dia', 'tarde', 'noite', 'cedo'],
    Days: ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo', 'fim de semana', 'dia', 'semana', 'hoje', 'amanhã', 'ontem'],
    Months: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro', 'mês'],
    Dates: ['data', 'ano', 'primeiro', 'aniversário', 'primavera', 'verão', 'outono', 'inverno'],
  },
  nl: {
    'Numbers to 100': ['nul', 'een', 'één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien', 'twintig', 'dertig', 'veertig', 'vijftig', 'zestig', 'zeventig', 'tachtig', 'negentig', 'honderd'],
    Prices: ['euro', 'cent', 'kosten', 'prijs', 'goedkoop', 'duur', 'betalen', 'geld'],
    Times: ['uur', 'minuut', 'half', 'kwart', 'voor', 'over', 'ochtend', 'middag', 'avond', 'nacht', 'vroeg', 'laat'],
    Days: ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag', 'weekend', 'dag', 'week', 'vandaag', 'morgen', 'gisteren'],
    Months: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december', 'maand'],
    Dates: ['datum', 'jaar', 'eerste', 'tweede', 'derde', 'verjaardag', 'lente', 'zomer', 'herfst', 'winter'],
  },
  sv: {
    'Numbers to 100': ['noll', 'en', 'ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv', 'tretton', 'fjorton', 'femton', 'sexton', 'sjutton', 'arton', 'nitton', 'tjugo', 'trettio', 'fyrtio', 'femtio', 'sextio', 'sjuttio', 'åttio', 'nittio', 'hundra'],
    Prices: ['krona', 'kronor', 'öre', 'kosta', 'pris', 'billig', 'dyr', 'betala', 'pengar'],
    Times: ['timme', 'minut', 'halv', 'kvart', 'över', 'förmiddag', 'eftermiddag', 'morgon', 'kväll', 'natt', 'tidig', 'sen'],
    Days: ['måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag', 'söndag', 'helg', 'dag', 'vecka', 'idag', 'imorgon', 'igår'],
    Months: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december', 'månad'],
    Dates: ['datum', 'år', 'första', 'andra', 'tredje', 'födelsedag', 'vår', 'sommar', 'höst', 'vinter'],
  },
  da: {
    'Numbers to 100': ['nul', 'en', 'én', 'et', 'to', 'tre', 'fire', 'fem', 'seks', 'syv', 'otte', 'ni', 'ti', 'elleve', 'tolv', 'tretten', 'fjorten', 'femten', 'seksten', 'sytten', 'atten', 'nitten', 'tyve', 'tredive', 'fyrre', 'halvtreds', 'tres', 'halvfjerds', 'firs', 'halvfems', 'hundrede'],
    Prices: ['krone', 'kroner', 'øre', 'koster', 'pris', 'billig', 'dyr', 'betaler', 'penge'],
    Times: ['time', 'minut', 'halv', 'kvart', 'i', 'over', 'morgen', 'formiddag', 'eftermiddag', 'aften', 'nat', 'tidlig', 'sen'],
    Days: ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag', 'weekend', 'dag', 'uge', 'i dag', 'i morgen', 'i går'],
    Months: ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december', 'måned'],
    Dates: ['dato', 'år', 'første', 'anden', 'tredje', 'fødselsdag', 'forår', 'sommer', 'efterår', 'vinter'],
  },
  no: {
    'Numbers to 100': ['null', 'en', 'én', 'ett', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'syv', 'åtte', 'ni', 'ti', 'elleve', 'tolv', 'tretten', 'fjorten', 'femten', 'seksten', 'sytten', 'atten', 'nitten', 'tjue', 'tretti', 'førti', 'femti', 'seksti', 'sytti', 'åtti', 'nitti', 'hundre'],
    Prices: ['krone', 'kroner', 'øre', 'koste', 'pris', 'billig', 'dyr', 'betale', 'penger'],
    Times: ['time', 'minutt', 'halv', 'kvart', 'over', 'morgen', 'formiddag', 'ettermiddag', 'kveld', 'natt', 'tidlig', 'sent'],
    Days: ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag', 'helg', 'dag', 'uke', 'i dag', 'i morgen', 'i går'],
    Months: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember', 'måned'],
    Dates: ['dato', 'år', 'første', 'andre', 'tredje', 'bursdag', 'vår', 'sommer', 'høst', 'vinter'],
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

// Register exclusions (Dan, 2026-11-16; content*/a1-exclude.json): list words left out of the A1 target, such as
// Kelly's legal and administrative words. Both numbers are reported: the list as written, and the target without them.
const excludeFile = at('content/a1-exclude.json')
const EXCLUDE = new Set(existsSync(excludeFile) ? JSON.parse(readFileSync(excludeFile, 'utf8')).words.map((x) => fold(x.word)) : [])
const target = (ws) => ws.filter((w) => !EXCLUDE.has(fold(w)))

const pct = (a, b) => (b ? `${Math.round((a * 100) / b)}%` : '–')
console.log(`${COURSE}: ${t.words.length} course words, ${t.sentences.length} live sentences`)
if (list) {
  const all = measure(list.words)
  const path = measure(list.words, { pathOnly: true })
  console.log(`A1 list: ${list.words.length} words (${list.source.split(',')[0]})`)
  console.log(`  taught anywhere: ${all.taught} (${pct(all.taught, all.total)}); in 3+ sentences: ${all.covered} (${pct(all.covered, all.total)})`)
  console.log(`  main path only (units and help circles): taught ${path.taught} (${pct(path.taught, path.total)}); in 3+ sentences: ${path.covered} (${pct(path.covered, path.total)})`)
  if (EXCLUDE.size) { const x = measure(target(list.words)); console.log(`  without ${list.words.length - x.total} register words: taught ${x.taught} of ${x.total} (${pct(x.taught, x.total)}); in 3+ sentences ${x.covered} (${pct(x.covered, x.total)})`) }
  if (hasTwins) {
    const tw = measure(list.words, { keys: byKeyTwins }), twPath = measure(list.words, { pathOnly: true, keys: byKeyTwins })
    console.log(`  with regional twins (a Mexican word counts for its Spain headword): taught ${tw.taught} (${pct(tw.taught, tw.total)}); in 3+ sentences ${tw.covered} (${pct(tw.covered, tw.total)}); main path ${twPath.taught} (${pct(twPath.taught, twPath.total)})`)
  }
  // French core target (Dan, 2026-11-10): the list's 600 most frequent A1 words; the full list is the stretch goal.
  if (list.core) {
    const core = measure(list.core), corePath = measure(list.core, { pathOnly: true })
    console.log(`Core: the ${list.core.length} most frequent: taught ${core.taught} (${pct(core.taught, core.total)}); in 3+ sentences ${core.covered} (${pct(core.covered, core.total)}); main path ${corePath.taught} (${pct(corePath.taught, corePath.total)})`)
    if (EXCLUDE.size) {
      const x = measure(target(list.core)), xPath = measure(target(list.core), { pathOnly: true })
      console.log(`Core target without ${list.core.length - x.total} register words (a1-exclude.json): taught ${x.taught} of ${x.total} (${pct(x.taught, x.total)}); in 3+ sentences ${x.covered} (${pct(x.covered, x.total)}); main path ${xPath.taught} (${pct(xPath.taught, xPath.total)})`)
      if (process.argv.includes('--missing')) console.log(`  target missing, most frequent first: ${x.missing.join(', ')}`)
    }
    if (process.argv.includes('--missing')) console.log(`  core missing, most frequent first: ${core.missing.join(', ')}`)
  }
  if (process.argv.includes('--missing')) { console.log(`  thin (under 3): ${all.thin.join(', ')}`); console.log(`  missing: ${all.missing.join(', ')}`) }
} else console.log('A1 list: none loaded (no official list stored for this course)')
for (const [name, words] of Object.entries(THEMES[COURSE])) {
  const m = measure(words)
  console.log(`  ${name}: taught ${m.taught} of ${m.total}; in 3+ sentences ${m.covered}${m.missing.length ? `; missing ${m.missing.slice(0, 12).join(', ')}${m.missing.length > 12 ? '…' : ''}` : ''}`)
}
