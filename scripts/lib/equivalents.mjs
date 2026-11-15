// Equivalent answers (Dan, 2026-11-15: "accept equivalent word orders and meanings more widely, so a learner doesn't
// get stuck on one question"). Added at build time for every course, on top of the workbook's answers:
//   1. linked: every English translation Tatoeba links to the sentence (other people's renderings of the same
//      line), unless the shown English was replaced in review (then Tatoeba's lines were judged wrong for it);
//   2. order: safe English reorderings of each accepted English answer: "Here we are" / "We are here", "Here is the
//      book" / "The book is here", a time phrase at the start or the end ("Tomorrow I'm leaving" / "I'm leaving
//      tomorrow"), statements only;
//   3. spelling: US and UK words and spellings (film / movie, flat / apartment, colour / color);
//   4. course order: the same time-phrase move in the course language (French, Spanish, Italian, Portuguese; not
//      German, whose verb moves with it).
// Each new row says which of these made it (source). Nothing already accepted, in other words or punctuation, is added.
const NAMES = 'Paul|Marie|Mary|Tom|Léa|Sophie|Marc|Julie|Anna|Ken|Pierre|Jean|John|Maria|Ana|Pedro|Juan|Carlos|Luca|Marco|Giulia|Anna'
const key = (t) => String(t).toLowerCase().normalize('NFC').replace(/[’ʼ]/g, "'").replace(/[^\p{L}\p{N}' ]+/gu, ' ').replace(/\s+/g, ' ').trim()
const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1)
const uncap = (t) => (/^(I|I'm|I'll|I've|I'd)\b/.test(t) || /^[A-Z]{2}/.test(t) || new RegExp(`^(${NAMES})\\b`).test(t) ? t : t.charAt(0).toLowerCase() + t.slice(1))
const ending = (t) => t.match(/[.!]$/)?.[0] ?? '.'
const isQuestion = (t) => /\?\s*$/.test(t)

const SUBJECT = new RegExp(`^(I|you|he|she|it|we|they|I'm|you're|he's|she's|it's|we're|they're|I'll|you'll|he'll|she'll|we'll|they'll|my|your|his|her|our|their|the|this|that|${NAMES})\\b`, 'i')
// A time word that ends a prepositional phrase stays where it is (thanks for yesterday; merci pour hier).
const EN_DANGLING = /\b(for|of|to|from|until|since|by|and|or|than|about|at|on|in|with|without|before|after|is|are|am|was|were|be|it's|that's)$/i
const EN_TIME = ['today', 'tomorrow', 'tonight', 'now', 'yesterday', 'this morning', 'this afternoon', 'this evening', 'every day', 'in the morning', 'in the evening', 'at night', 'on Monday', 'on Tuesday', 'on Wednesday', 'on Thursday', 'on Friday', 'on Saturday', 'on Sunday', 'on Saturdays', 'on Sundays', 'next week', 'this week', 'later', 'usually', 'sometimes']
const PRONOUN_BE = { 'I am': 'I am', 'we are': 'we are', 'you are': 'you are', 'they are': 'they are', 'he is': 'he is', 'she is': 'she is', 'it is': 'it is' }

function englishOrders(t) {
  if (isQuestion(t)) return []
  const out = []
  const body = t.replace(/[.!]\s*$/, '').trim()
  const end = ending(t)
  // "Here we are" <-> "We are here".
  let m = body.match(/^Here (I am|we are|you are|they are|he is|she is|it is)$/i)
  if (m) out.push(`${cap(PRONOUN_BE[m[1].toLowerCase().replace(/^i am$/, 'I am')] ?? m[1])} here${end}`)
  m = body.match(/^(I am|We are|You are|They are|He is|She is|It is) (here|there)$/)
  if (m) out.push(`${cap(m[2])} ${uncap(m[1])}${end}`)
  // "Here is the book" <-> "The book is here" (a short subject only).
  m = body.match(/^(Here) (is|are) ((?:the|my|your|his|her|our|their) [\p{L}' -]{1,30})$/u)
  if (m && m[3].split(' ').length <= 4) out.push(`${cap(m[3])} ${m[2]} ${m[1].toLowerCase()}${end}`)
  m = body.match(/^((?:The|My|Your|His|Her|Our|Their) [\p{L}' -]{1,30}) (is|are) (here)$/u)
  if (m && m[1].split(' ').length <= 4) out.push(`${cap(m[3])} ${m[2]} ${uncap(m[1])}${end}`)
  // A time phrase at the start or the end of a statement whose subject comes first.
  for (const tp of EN_TIME) {
    const lead = body.match(new RegExp(`^${tp},? (.+)$`, 'i'))
    if (lead && SUBJECT.test(lead[1])) out.push(`${cap(lead[1])} ${tp}${end}`)
    const tail = body.match(new RegExp(`^(.+?),? ${tp}$`, 'i'))
    if (tail && SUBJECT.test(tail[1]) && !EN_DANGLING.test(tail[1]) && !/\b(not|n't)\s*$/.test(tail[1])) out.push(`${cap(tp)}, ${uncap(tail[1])}${end}`)
  }
  return out
}

// US and UK words that mean the same at A1, both ways, whole words only.
const SPELLING = [['movie', 'film'], ['movies', 'films'], ['mom', 'mum'], ['apartment', 'flat'], ['vacation', 'holiday'], ['vacations', 'holidays'],
  ['store', 'shop'], ['stores', 'shops'], ['pants', 'trousers'], ['cell phone', 'mobile phone'], ['cellphone', 'mobile'], ['elevator', 'lift'],
  ['soccer', 'football'], ['cookie', 'biscuit'], ['cookies', 'biscuits'], ['candy', 'sweets'], ['garbage', 'rubbish'], ['trash', 'rubbish'],
  ['sidewalk', 'pavement'], ['color', 'colour'], ['colors', 'colours'], ['favorite', 'favourite'], ['neighbor', 'neighbour'], ['center', 'centre'],
  ['theater', 'theatre'], ['gray', 'grey'], ['traveling', 'travelling'], ['okay', 'OK'], ['math', 'maths'], ['schedule', 'timetable']]
// a / an follows the new word (a flat, an apartment).
const article = (t) => t.replace(/\b(a|an|A|An) ([\p{L}]+)/gu, (m, art, w) => { const an = /^[aeiou]/i.test(w) && !/^(uni|use|one|eu)/i.test(w); const base = an ? 'an' : 'a'; return `${art[0] === 'A' ? cap(base) : base} ${w}` })
function spellings(t) {
  const out = []
  for (const [us, uk] of SPELLING) for (const [a, b] of [[us, uk], [uk, us]]) {
    const re = new RegExp(`\\b${a}\\b`, 'i')
    if (re.test(t)) out.push(article(t.replace(new RegExp(`\\b${a}\\b`, 'gi'), (w, off) => (b === 'OK' ? 'OK' : a === 'OK' ? (off === 0 ? 'Okay' : 'okay') : w[0] === w[0].toUpperCase() ? cap(b) : b))))
  }
  return out
}

const COURSE_TIME = {
  fr: ["aujourd'hui", 'demain', 'ce soir', 'maintenant', 'hier', 'ce matin', 'le matin', 'le soir', "d'habitude", 'parfois', 'en général'],
  es: ['hoy', 'mañana', 'esta noche', 'ahora', 'ayer', 'por la mañana', 'por la tarde', 'por la noche', 'a veces', 'normalmente'],
  it: ['oggi', 'domani', 'stasera', 'adesso', 'ieri', 'di solito', 'a volte', 'la mattina', 'la sera'],
  pt: ['hoje', 'amanhã', 'agora', 'ontem', 'de manhã', 'à noite', 'às vezes', 'normalmente'],
}
const FR_SUBJECT = new RegExp(`^(je |j'|tu |il |elle |on |nous |vous |ils |elles |c'|ce |mon |ma |mes |ton |ta |tes |son |sa |ses |le |la |les |l'|(?:${NAMES}) )`, 'i')
const DANGLING = /(?:^|\s|')(pour|de|du|des|à|au|aux|et|ou|depuis|par|en|avec|sans|que|jusqu'à|est|sont|para|por|con|sin|desde|y|o|e|es|son|per|da|di|è|com|sem|até|é)$/i
const LEADING_WORD = /^(oui|non|si|mais|et|alors|yes|no|sí|sì|sim|não|pero|ma|mas)\b/i
function courseOrders(t, lang) {
  const list = COURSE_TIME[lang]
  if (!list || isQuestion(t)) return []
  const out = []
  const body = t.replace(/[.!]\s*$/, '').trim()
  const end = lang === 'fr' && ending(t) === '!' ? ' !' : ending(t)
  const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  for (const tp of list) {
    const lead = body.match(new RegExp(`^${esc(tp)},? (.+)$`, 'iu'))
    if (lead && !LEADING_WORD.test(lead[1]) && (lang !== 'fr' || FR_SUBJECT.test(lead[1]))) out.push(`${cap(lead[1])} ${tp}${end}`)
    const tail = body.match(new RegExp(`^(.+?),? ${esc(tp)}$`, 'iu'))
    if (tail && !LEADING_WORD.test(tail[1]) && !DANGLING.test(tail[1]) && /\s/.test(tail[1]) && (lang !== 'fr' || FR_SUBJECT.test(tail[1]))) out.push(`${cap(tp)}, ${tail[1].charAt(0).toLowerCase() + tail[1].slice(1)}${end}`)
  }
  return out
}

// rows: the accepted answers so far; returns the new rows and a count per source.
// reviewed: the answers sweep's file (content/sweep/answers-review.json): a sentence whose translations it reviewed gets
// none linked here, and a translation it left out is never added.
export function equivalentAnswers({ sentences, rows, lang, englishFor = null, overridden = new Set(), reviewed = null }) {
  const swept = new Set([...(reviewed?.add ?? []), ...(reviewed?.skipped ?? [])].map((x) => x.sentence_id))
  const refused = new Set((reviewed?.skipped ?? []).filter((x) => !/contractions/.test(x.reason)).map((x) => `${x.sentence_id}|${key(x.answer)}`))
  const added = []
  const counts = { linked: 0, order: 0, spelling: 0, course_order: 0 }
  let n = 0
  const have = new Map()
  const seen = (sid, dir) => have.get(`${sid}|${dir}`) ?? have.set(`${sid}|${dir}`, new Set()).get(`${sid}|${dir}`)
  for (const s of sentences) { seen(s.sentence_id, 'fr_to_en').add(key(s.english)); seen(s.sentence_id, 'en_to_fr').add(key(s.french)) }
  for (const r of rows) seen(r.sentence_id, r.direction).add(key(r.answer))
  const add = (s, direction, answer, source) => {
    const set = seen(s.sentence_id, direction)
    if (!answer || set.has(key(answer)) || refused.has(`${s.sentence_id}|${key(answer)}`)) return false
    set.add(key(answer))
    added.push({ answer_id: `AE${String(++n).padStart(5, '0')}`, sentence_id: s.sentence_id, direction, answer, source: `equivalent: ${source}`, status: 'live' })
    counts[source]++
    return true
  }
  for (const s of sentences) {
    if (englishFor && s.source === 'tatoeba' && s.source_id && !overridden.has(s.sentence_id) && !swept.has(s.sentence_id)) {
      const linked = englishFor(String(s.source_id))
      if (linked.some((e) => key(e) === key(s.english))) for (const e of linked) add(s, 'fr_to_en', e, 'linked')
    }
    const english = [s.english, ...rows.filter((r) => r.sentence_id === s.sentence_id && r.direction === 'fr_to_en').map((r) => r.answer), ...added.filter((r) => r.sentence_id === s.sentence_id && r.direction === 'fr_to_en').map((r) => r.answer)]
    for (const e of english) for (const v of englishOrders(e)) add(s, 'fr_to_en', v, 'order')
    for (const e of [...english, ...added.filter((r) => r.sentence_id === s.sentence_id && r.source === 'equivalent: order').map((r) => r.answer)]) for (const v of spellings(e)) add(s, 'fr_to_en', v, 'spelling')
    for (const v of courseOrders(s.french, lang)) add(s, 'en_to_fr', v, 'course_order')
  }
  return { added, counts }
}
