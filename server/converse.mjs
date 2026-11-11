// Conversation (Dan, 2026-11-10): a short spoken or typed exchange with Claude in the course language, for the
// conversation scenes on the path and the conversation partner in Self-Study. Off until TAMAGO_ANTHROPIC_API_KEY is
// set (a key for Tamago only; a generic ANTHROPIC_API_KEY is never used).
// A small, low-cost model (Haiku 5.5, effort low), a hard limit per conversation (turns and characters), and the
// Tamago workspace's $5 monthly cap. The system prompt and word lists stay the same for a whole conversation, so they
// are cached after the first turn. Meanings never come from here: the app finds the course words in what Claude said
// and takes their meanings from its own Wiktionary data. Never graded.
//   kind "turn": Claude's next line (and, if corrections are on each turn, a note on the learner's last line).
//   kind "review": at the end, when corrections are set to the end, notes on the learner's lines.
import Anthropic from '@anthropic-ai/sdk'

const MODEL = 'claude-haiku-5-5'
export const LIMITS = { turns: 14, chars: 240, words: 400 }
const LANG = { fr: 'French', es: 'Latin American Spanish (use ustedes, never vosotros)', de: 'standard German as spoken in Germany' }
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } })
const clip = (s, n) => String(s ?? '').slice(0, n)

// What each help phrase asks of Claude. The learner taps a phrase (sent in the course language); Claude answers it
// properly, in the course language, never in English.
const HELP = {
  understand: 'The learner said they don\'t understand. Say the same thing again more simply: fewer and easier words, a shorter sentence.',
  slower: 'The learner asked you to speak more slowly. Say your last line again, the same meaning, broken into short pieces. (The app also slows the voice.)',
  repeat: 'The learner asked you to repeat. Say your last line again exactly, word for word.',
  meaning: 'The learner asked what something means (a word they name, or your last line). Explain it in the course language with simpler words, a synonym or a tiny example. Never translate into English.',
  say: 'The learner asked how to say something; the thing may be in English. Give them the course-language word or phrase in a short, natural sentence they can repeat, then carry on.',
  word: 'The learner is looking for a word and is describing it ("it\'s a thing for…"). Guess the word, say it clearly, and check if that is what they meant.',
}

function system(b) {
  const lang = LANG[b.lang]
  const known = (b.known ?? []).join(', ')
  const pool = (b.pool ?? []).join(', ')
  const level = b.stretch === 'scene'
    ? 'Speak slightly above the learner\'s level on purpose: mostly words from their list, and in each line one or two words or a phrase from the A1 list they may not know yet, so that asking for help is part of the practice.'
    : b.stretch === 'few'
      ? 'Use words from the learner\'s list. Now and then (at most one word in a line) you may use a word from the A1 list that is not in theirs.'
      : 'Use only words from the learner\'s list (and names). If you need another word, choose a different way to say it.'
  return `You are a friendly conversation partner for an English speaker learning ${lang} at CEFR A1, in a language-learning app.
Speak only ${lang}. Never use English in what you say, even when explaining.
Keep every line short: one or two sentences, at most about 15 words in all. Ask one simple question at a time to keep the conversation going.
${level}
Be warm and natural; never grade, praise effusively or lecture. Don't use emoji, lists or markdown.
The learner may tap help phrases. When they do, help properly and in ${lang}: slow down, repeat, rephrase or explain, then carry on.
Stay in the scene. If the learner writes in English, answer in simple ${lang} and help them say it.

Scene: ${clip(b.scene?.title, 80)}. ${clip(b.scene?.setting, 300)}
You are: ${clip(b.scene?.ai, 120)}. The learner is: ${clip(b.scene?.learner, 120)}.

The learner's words (forms they have met): ${known || '(very few yet)'}
A1 words of the course: ${pool}
Names you may use: ${(b.names ?? []).join(', ') || 'none'}`
}

const TURN = {
  type: 'object', additionalProperties: false, required: ['say', 'english', 'correction', 'done'],
  properties: {
    say: { type: 'string', description: 'Your next line, in the course language only.' },
    english: { type: 'string', description: 'A plain English translation of your line, shown only if the learner asks.' },
    correction: { type: 'string', description: 'Empty unless corrections are on each turn and the learner\'s last line had a mistake: then the corrected line in the course language, a dash, and a few English words on why.' },
    done: { type: 'boolean', description: 'True when the scene has reached a natural end.' },
  },
}
const MESSAGE = {
  type: 'object', additionalProperties: false, required: ['meaning', 'grammar', 'missing', 'better'],
  properties: {
    meaning: { type: 'string', description: 'One plain English sentence: does the message get its point across?' },
    grammar: { type: 'array', items: { type: 'string' }, description: 'Up to 3 short English notes on mistakes, each quoting the words and the fix.' },
    missing: { type: 'array', items: { type: 'string' }, description: 'Points of the task the message does not cover yet, in English.' },
    better: { type: 'string', description: 'The message rewritten correctly in the course language, staying close to what the learner wrote.' },
  },
}
const REVIEW = {
  type: 'object', additionalProperties: false, required: ['notes'],
  properties: { notes: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['said', 'better', 'why'], properties: { said: { type: 'string' }, better: { type: 'string' }, why: { type: 'string' } } } } },
}

export async function handle(req, key) {
  if (req.method === 'GET') return json({ ready: Boolean(key), limits: LIMITS })
  if (req.method !== 'POST') return json({ error: 'method' }, 405)
  if (!key) return json({ ready: false, error: 'needs setup' }, 503)
  const origin = req.headers.get('origin')
  if (origin && new URL(origin).host !== new URL(req.url).host) return json({ error: 'origin' }, 403)

  let b
  try { b = await req.json() } catch { return json({ error: 'body' }, 400) }
  if (!LANG[b.lang]) return json({ error: 'lang' }, 400)
  // QT16 (A1 Complete): notes on a short written message. Not scored; one call per message.
  if (b.kind === 'message') {
    const client = new Anthropic({ apiKey: key })
    try {
      const res = await client.messages.create({
        model: MODEL, max_tokens: 1500,
        output_config: { effort: 'low', format: { type: 'json_schema', schema: MESSAGE } },
        system: `You read a short message an English speaker learning ${LANG[b.lang]} at CEFR A1 wrote for a task, and give brief, kind notes in plain English. No praise beyond a word, no grade, no markdown. Judge only against A1: simple sentences are right.`,
        messages: [{ role: 'user', content: `Task: ${clip(b.prompt, 300)}\nPoints to cover: ${(Array.isArray(b.points) ? b.points : []).slice(0, 6).map((p) => clip(p, 120)).join('; ') || 'none listed'}\nThe learner's message:\n${clip(b.text, 800)}` }],
      })
      if (res.stop_reason === 'refusal' || res.stop_reason === 'max_tokens') return json({ result: null })
      return json({ result: JSON.parse(res.content.filter((c) => c.type === 'text').map((c) => c.text).join('')) })
    } catch (error) {
      if (error instanceof SyntaxError) return json({ result: null })
      if (error instanceof Anthropic.RateLimitError) return json({ error: 'busy' }, 429)
      if (error instanceof Anthropic.APIError) return json({ error: 'api' }, 502)
      return json({ error: 'network' }, 502)
    }
  }
  const kind = b.kind === 'review' ? 'review' : 'turn'
  const history = (Array.isArray(b.messages) ? b.messages : []).slice(0, LIMITS.turns * 2 + 2)
  const learnerTurns = history.filter((m) => m.role === 'learner').length
  if (kind === 'turn' && learnerTurns > LIMITS.turns) return json({ error: 'limit' }, 429)
  const body = {
    lang: b.lang, scene: b.scene ?? {}, stretch: ['scene', 'few', 'mine'].includes(b.stretch) ? b.stretch : 'mine',
    known: (Array.isArray(b.known) ? b.known : []).slice(0, LIMITS.words).map((w) => clip(w, 30)),
    pool: (Array.isArray(b.pool) ? b.pool : []).slice(0, LIMITS.words).map((w) => clip(w, 30)),
    names: (Array.isArray(b.names) ? b.names : []).slice(0, 10).map((n) => clip(n, 30)),
  }
  // The conversation as alternating turns; Claude speaks first, so a "start" user turn opens it. A help tap carries
  // its instruction in brackets after the learner's words.
  const messages = [{ role: 'user', content: '(The conversation starts. Say your first line.)' }]
  for (const m of history) {
    if (m.role === 'ai') messages.push({ role: 'assistant', content: JSON.stringify({ say: clip(m.text, LIMITS.chars), english: '', correction: '', done: false }) })
    else messages.push({ role: 'user', content: `${clip(m.text, LIMITS.chars)}${HELP[m.help] ? `\n[${HELP[m.help]}]` : ''}${b.corrections === 'each' && !m.help ? '\n[Corrections are on: fill in correction if this line has a mistake.]' : ''}` })
  }
  if (kind === 'review') messages.push({ role: 'user', content: '[The conversation is over. List up to 5 of the learner\'s lines that had a mistake: what they said, a better way in the course language, and why in a few plain English words. Skip help phrases. An empty list if there were none.]' })
  // Merge any two user turns in a row (the API takes them, but one turn reads more clearly).
  const merged = messages.reduce((a, m) => { const last = a.at(-1); if (last && last.role === m.role) last.content += `\n${m.content}`; else a.push({ ...m }); return a }, [])

  // The key goes in explicitly, so the SDK never falls back to ANTHROPIC_API_KEY.
  const client = new Anthropic({ apiKey: key })
  try {
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 1500,
      cache_control: { type: 'ephemeral' },
      output_config: { effort: 'low', format: { type: 'json_schema', schema: kind === 'review' ? REVIEW : TURN } },
      system: system(body),
      messages: merged,
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
