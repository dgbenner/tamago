// Claude explains a mistake on a typed answer (Phase 4). Off until Dan sets TAMAGO_ANTHROPIC_API_KEY as a Cloudflare Pages secret
// (a key for Tamago only; a generic ANTHROPIC_API_KEY from another project is never used): GET reports whether it's ready, so the app shows nothing in lessons until it is.
// Facts stay out of the model's memory: it may only use the sentence, the accepted answers and the Wiktionary
// hints the app sends. A smaller, faster model (feature list: "a smaller, cheaper model for answer checking").
import Anthropic from '@anthropic-ai/sdk'

const MODEL = 'claude-haiku-5-5'
const SYSTEM = `You explain one mistake to an English speaker learning French at CEFR A1.
You get the exercise, the learner's answer, the accepted answers, and word meanings taken from Wiktionary.
Reply with one or two short, plain sentences saying what differs between the learner's answer and the closest accepted answer, and why it matters.
Use only the information given. Do not define words or give verb forms beyond the meanings and answers provided; if the reason can't be told from them, just name the difference.
No greeting, no praise, no exclamation marks, no lists, no markdown.`

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } })
const clip = (s, n) => String(s ?? '').slice(0, n)

// Shared by the Cloudflare Pages Function (functions/api/) and the old Netlify one; each passes in its own
// TAMAGO_ANTHROPIC_API_KEY.
export async function handle(req, key) {
  const ready = Boolean(key)
  if (req.method === 'GET') return json({ ready })
  if (req.method !== 'POST') return json({ error: 'method' }, 405)
  if (!ready) return json({ ready: false, error: 'needs setup' }, 503)
  // Only the app's own pages may ask (a light guard until sign-in gives a real per-learner limit).
  const origin = req.headers.get('origin')
  if (origin && new URL(origin).host !== new URL(req.url).host) return json({ error: 'origin' }, 403)

  let b
  try { b = await req.json() } catch { return json({ error: 'body' }, 400) }
  const exercise = b.direction === 'en_to_fr' ? 'Translate into French' : b.direction === 'fr_to_en' ? 'Translate into English' : 'Write the French sentence'
  const hints = (Array.isArray(b.hints) ? b.hints : []).slice(0, 12).map((h) => `${clip(h.form, 40)} = ${clip(h.hint, 80)}`).join('\n')
  const accepted = (Array.isArray(b.accepted) ? b.accepted : []).slice(0, 8).map((a) => `- ${clip(a, 200)}`).join('\n')
  const prompt = `Exercise: ${exercise}
Prompt shown: ${clip(b.shown, 200)}
Learner's answer: ${clip(b.given, 200)}
Accepted answers:
${accepted}
Word meanings (Wiktionary):
${hints || '(none)'}`

  // The key is passed explicitly, so the SDK never falls back to ANTHROPIC_API_KEY.
  const client = new Anthropic({ apiKey: key })
  try {
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 2000,
      output_config: { effort: 'low' },
      system: SYSTEM,
      messages: [{ role: 'user', content: prompt }],
    })
    if (res.stop_reason === 'refusal') return json({ explanation: null })
    const text = res.content.filter((c) => c.type === 'text').map((c) => c.text).join(' ').trim()
    return json({ explanation: text || null })
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) return json({ error: 'busy' }, 429)
    if (error instanceof Anthropic.AuthenticationError) return json({ error: 'key' }, 503)
    if (error instanceof Anthropic.APIError) return json({ error: 'api' }, 502)
    return json({ error: 'network' }, 502)
  }
}
