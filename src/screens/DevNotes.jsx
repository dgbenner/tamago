import { useState } from 'react'

// Developer Notes at the bottom of Settings: collapsed, and one collapsible item per document, read only. The renderer
// and the documents load the first time the section is opened. Hidden entirely by the Developer Notes setting.
export default function DevNotes() {
  const [lib, setLib] = useState(null)
  const load = (e) => { if (e.currentTarget.open && !lib) import('../lib/devnotes.js').then(setLib) }
  return (
    <details className="devnotes border-t-2 border-line pt-5" onToggle={load}>
      <summary className="cursor-pointer text-lg font-semibold">Developer Notes</summary>
      <p className="mt-2 text-sm text-muted">The project's documents as of this version, for reading. They update with every deploy.</p>
      {lib
        ? <div className="mt-4 flex flex-col gap-2">{lib.DOCS.map((d) => <Doc key={d.id} doc={d} render={lib.renderDoc} />)}</div>
        : <p className="mt-4 text-sm text-muted">Loading…</p>}
    </details>
  )
}

function Doc({ doc, render }) {
  const [html, setHtml] = useState(null)
  const load = (e) => { if (e.currentTarget.open && html === null) render(doc).then(setHtml) }
  return (
    <details className="rounded-xl border-2 border-line bg-surface" onToggle={load}>
      <summary className="cursor-pointer px-4 py-3 font-medium">{doc.title}</summary>
      <div className="doc border-t-2 border-line px-4 py-3" dangerouslySetInnerHTML={{ __html: html ?? '<p>Loading…</p>' }} />
    </details>
  )
}
