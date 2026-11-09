// Mistake explanations (Phase 4) from the explain function (/api/explain). Asked for in the background as soon as a typed
// answer is wrong; the answer bar shows "Why?" only once one has arrived, so nothing in a lesson waits on it.
// Off (no request at all) until the function reports it's set up. A daily cap on this device stands in for the
// per-learner limit that comes with sign-in.
const URL_ = '/api/explain'
const DAILY = 30
let ready = null
export const explainReady = () => (ready ??= fetch(URL_).then((r) => (r.ok ? r.json() : { ready: false })).then((j) => Boolean(j.ready)).catch(() => false))

function underCap() {
  try {
    const today = new Date().toLocaleDateString('en-CA')
    const c = JSON.parse(localStorage.getItem('tamago_explain') ?? '{}')
    const n = c.date === today ? c.n : 0
    if (n >= DAILY) return false
    localStorage.setItem('tamago_explain', JSON.stringify({ date: today, n: n + 1 }))
    return true
  } catch { return true }
}

export async function explain(q, given) {
  if (!(await explainReady()) || !underCap()) return null
  const direction = q.type === 'QT07' || q.type === 'QT11' ? null : q.lang === 'fr' ? 'en_to_fr' : 'fr_to_en'
  const body = {
    direction, given, accepted: q.accepted,
    shown: direction === 'en_to_fr' ? q.english : direction === 'fr_to_en' ? q.french : '(audio)',
    hints: (q.segments ?? []).filter((s) => s.hint).map((s) => ({ form: s.text, hint: s.hint })),
  }
  try {
    const r = await fetch(URL_, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
    return r.ok ? (await r.json()).explanation ?? null : null
  } catch { return null }
}
