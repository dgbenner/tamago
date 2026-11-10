// Blanks anything shaped like a key or token, for Developer Notes (devnotes.js). Pure, so the tests run it too.
export const SECRET = [
  /sk-ant-[A-Za-z0-9_-]{8,}/g, // Anthropic
  /\bsk-[A-Za-z0-9]{20,}/g, // other sk- keys
  /\bgh[pousr]_[A-Za-z0-9]{20,}/g, /\bgithub_pat_[A-Za-z0-9_]{20,}/g, // GitHub
  /\bAKIA[0-9A-Z]{16}\b/g, // AWS
  /\bxox[abprs]-[A-Za-z0-9-]{10,}/g, // Slack
  /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g, // JWT
  /\b(?=[A-Za-z0-9_-]*\d)(?=[A-Za-z0-9_-]*[a-z])(?=[A-Za-z0-9_-]*[A-Z])[A-Za-z0-9_-]{40,}\b/g, // long mixed-case tokens
  /((?:api[_-]?key|token|secret|password)\s*[:=]\s*)["']?[^\s"'`]{8,}/gi, // key = value
]
export function redact(text) {
  let out = text
  for (const re of SECRET) out = out.replace(re, (m, label) => (typeof label === 'string' && m.startsWith(label) ? `${label}[removed]` : '[removed]'))
  return out
}

// The grade table: the "## Grades" section of the newest review.
export function gradesSection(md) {
  const start = md.search(/^## Grades/m)
  if (start < 0) return md
  const rest = md.slice(start)
  const end = rest.slice(3).search(/^## /m)
  return end < 0 ? rest : rest.slice(0, end + 3)
}

