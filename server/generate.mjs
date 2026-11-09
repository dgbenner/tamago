// Learner-guided content (Phase 5): Claude writes practice material from the words a learner has met, in Tamago's
// shapes. Off until Dan sets TAMAGO_ANTHROPIC_API_KEY (a key for Tamago only; a generic ANTHROPIC_API_KEY is never
// used). The app re-checks every French line against its own word list (Wiktionary-backed) and drops anything
// outside it, so meanings never come from the model.
//   kind "sentences": short practice sentences.
//   kind "listening": a short two-person exchange with three comprehension questions (QT20).
import Anthropic from '@anthropic-ai/sdk'

const MODEL = 'claude-opus-5-5'
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } })
const clip = (s, n) => String(s ?? '').slice(0, n)

const RULES = `You write French practice material for an English speaker at CEFR A1.
Use only the French words in the list you are given, in the forms listed (you may add punctuation, and the names listed). Never use a French word that is not in the list.
Keep sentences short, natural and literal; nothing idiomatic. The English is a plain, faithful translation.`

const SCHEMAS = {
  sentences: {
    type: 'object', additionalProperties: false, required: ['sentences'],
    properties: { sentences: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['french', 'english'], properties: { french: { type: 'string' }, english: { type: 'string' } } } } },
  },
  listening: {
    type: 'object', additionalProperties: false, required: ['title', 'lines', 'questions'],
    properties: {
      title: { type: 'string' },
      lines: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['speaker', 'french', 'english'], properties: { speaker: { type: 'string', enum: ['A', 'B'] }, french: { type: 'string' }, english: { type: 'string' } } } },
      questions: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['question', 'choices', 'answer'], properties: { question: { type: 'string' }, choices: { type: 'array', items: { type: 'string' } }, answer: { type: 'integer' } } } },
    },
  },
}
const TASKS = {
  sentences: (n, focus) => `Write ${n} different practice sentences${focus ? ` about: ${focus}` : ''}. Vary the sentence patterns.`,
  listening: (_, focus) => `Write a short exchange of 4 to 6 lines between two people, A and B${focus ? `, about: ${focus}` : ''}. Then write 3 questions in English about what was said, each with 3 short English choices and the index (0, 1 or 2) of the right one. A question must be answerable only by understanding the French.`,
}

// Shared by the Cloudflare Pages Function (functions/api/) and the old Netlify one; each passes in its own
// TAMAGO_ANTHROPIC_API_KEY.
export async function handle(req, key) {
  if (req.method === 'GET') return json({ ready: Boolean(key) })
  if (req.method !== 'POST') return json({ error: 'method' }, 405)
  if (!key) return json({ ready: false, error: 'needs setup' }, 503)
  const origin = req.headers.get('origin')
  if (origin && new URL(origin).host !== new URL(req.url).host) return json({ error: 'origin' }, 403)

  let b
  try { b = await req.json() } catch { return json({ error: 'body' }, 400) }
  const kind = b.kind in SCHEMAS ? b.kind : null
  if (!kind) return json({ error: 'kind' }, 400)
  const words = (Array.isArray(b.words) ? b.words : []).slice(0, 150).map((w) => `${clip(w.form, 40)} (${clip(w.hint, 60)})`)
  if (words.length < 10) return json({ error: 'words' }, 400)
  const names = (Array.isArray(b.names) ? b.names : []).slice(0, 10).map((n) => clip(n, 30))
  const count = Math.min(Math.max(Number(b.count) || 6, 1), 8)

  // The key goes in explicitly, so the SDK never falls back to ANTHROPIC_API_KEY.
  const client = new Anthropic({ apiKey: key })
  try {
    const res = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 8000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: 'low', format: { type: 'json_schema', schema: SCHEMAS[kind] } },
      system: RULES,
      messages: [{ role: 'user', content: `French words you may use (meaning in brackets):\n${words.join('\n')}\n\nNames you may use: ${names.join(', ') || 'none'}\n\n${TASKS[kind](count, clip(b.focus, 80))}` }],
    })
    if (res.stop_reason === 'refusal' || res.stop_reason === 'max_tokens') return json({ result: null })
    const text = res.content.filter((c) => c.type === 'text').map((c) => c.text).join('')
    return json({ result: JSON.parse(text) })
  } catch (error) {
    if (error instanceof SyntaxError) return json({ result: null })
    if (error instanceof Anthropic.RateLimitError) return json({ error: 'busy' }, 429)
    if (error instanceof Anthropic.AuthenticationError) return json({ error: 'key' }, 503)
    if (error instanceof Anthropic.APIError) return json({ error: 'api' }, 502)
    return json({ error: 'network' }, 502)
  }
}
