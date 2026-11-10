// The Developer page (Dan, 2026-11-10; was Developer Notes in Settings): the project's own documents, read straight from _source and _review at build time,
// so every deploy carries the current text. Loaded only when the section is opened (a separate chunk).
// Never shows secrets: anything shaped like a key or token is blanked before rendering, and the test suite checks it.
import { marked } from 'marked'
import { gradesSection, redact } from './redact.js'

// Only these files are bundled; nothing else in _source reaches the app.
const SOURCE = import.meta.glob([
  '../../_source/model-story.md', '../../_source/craft-review.md', '../../_source/tamago-feature-list.md', '../../_source/question-types.md', '../../_source/build-phases.md',
  '../../_source/autonomous-build.md', '../../_source/test-notes.md', '../../_source/check-in.md',
], { query: '?raw', import: 'default' })
const REVIEWS = import.meta.glob(['../../_review/*/craft-review.md'], { query: '?raw', import: 'default' })

// In this order: the rubric, the latest grades, then the specs and the running notes.
// The Developer page's documents, in Dan's order (Course Snapshot comes first, built from the content in the page).
export const DOCS = [
  { id: 'model-story', title: 'Model Story', file: 'model-story.md' },
  { id: 'craft-review', title: 'Craft Rubric', file: 'craft-review.md' },
  { id: 'grades', title: 'Latest Grades', review: true },
  { id: 'test-notes', title: 'Test Notes', file: 'test-notes.md' },
  { id: 'features', title: 'Feature List', file: 'tamago-feature-list.md' },
  { id: 'question-types', title: 'Question Types', file: 'question-types.md' },
  { id: 'build-phases', title: 'Build Phases', file: 'build-phases.md' },
  { id: 'autonomous-build', title: 'Autonomous Brief', file: 'autonomous-build.md' },
  { id: 'check-in', title: 'Check-In', file: 'check-in.md' },
]

async function markdownOf(doc) {
  if (doc.review) {
    const keys = Object.keys(REVIEWS).sort()
    const latest = keys.at(-1)
    if (!latest) return 'No review yet.'
    const date = latest.match(/_review\/([^/]+)\//)?.[1] ?? ''
    return `*From the review of ${date}.*\n\n${gradesSection(await REVIEWS[latest]())}`
  }
  const key = Object.keys(SOURCE).find((k) => k.endsWith(`/${doc.file}`))
  return key ? SOURCE[key]() : `${doc.file} is missing.`
}

// Markdown to HTML. The documents are the project's own, but raw HTML in them is shown as text, never run.
const renderer = new marked.Renderer()
renderer.html = ({ text }) => text.replace(/[&<>]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[ch])
renderer.link = ({ href, text }) => (/^https?:\/\//.test(href) ? `<a href="${href}" target="_blank" rel="noreferrer">${text}</a>` : text)
renderer.table = function (token) { return `<div class="doc-table" tabindex="0" role="region" aria-label="Table">${marked.Renderer.prototype.table.call(this, token)}</div>` }

export async function renderDoc(doc) {
  return marked.parse(redact(await markdownOf(doc)), { renderer, gfm: true })
}
