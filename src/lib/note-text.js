// Grammar notes and circle overviews (Dan, 2026-11-16): the target language is bold, English is regular weight.
// In the content, a run of the target language sits between double asterisks, "**Comment tu t'appelles ?** (to a
// friend)", and nothing else is marked. A newline starts a new line (an example on its own line); a blank line starts a
// new paragraph. parseNote gives paragraphs of lines of runs, { text, tl }, for NoteText.jsx to draw; plainNote gives
// the words alone, for anything that reads a note as text (a label, a prompt, a search).
export function parseNote(text) {
  return String(text ?? '').replace(/\r\n?/g, '\n').split(/\n{2,}/).map((para) => para.split('\n').map((line) => {
    const runs = []
    line.split(/\*\*/).forEach((part, i) => { if (part) runs.push({ text: part, tl: i % 2 === 1 }) })
    return runs
  }).filter((runs) => runs.length)).filter((lines) => lines.length)
}
export const plainNote = (text) => String(text ?? '').replace(/\*\*/g, '')
// A note is well formed when its markers pair up, no bold run is empty and none crosses a line.
export function noteProblems(text) {
  const t = String(text ?? ''), out = []
  if ((t.match(/\*\*/g) ?? []).length % 2) out.push('an odd number of ** markers')
  for (const line of t.split('\n')) {
    if ((line.match(/\*\*/g) ?? []).length % 2) out.push(`a bold run crosses a line: "${line.slice(0, 40)}"`)
    if (line.split(/\*\*/).some((part, i) => i % 2 === 1 && !part.trim())) out.push(`an empty bold run: "${line.slice(0, 40)}"`)
  }
  if (t.replace(/\*\*/g, '').includes('*')) out.push('a stray asterisk')
  if (/^\s|\s$/.test(t)) out.push('space at the start or the end')
  return out
}
