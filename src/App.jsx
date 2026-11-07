import { useEffect, useState } from 'react'

// Phase 0 shell: proves the built content loads. The lesson player arrives in Phase 1.
export default function App() {
  const [counts, setCounts] = useState(null)

  useEffect(() => {
    Promise.all(['sentences', 'words', 'units'].map((t) => fetch(`/content/${t}.json`).then((r) => r.json())))
      .then(([sentences, words, units]) => setCounts({ sentences: sentences.length, words: words.length, live: units[0]?.status === 'live' }))
  }, [])

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-6 px-4 text-center">
      <img src="/logo.png" alt="" className="w-40 rounded-3xl" />
      <h1 className="text-3xl font-semibold">Tamago</h1>
      <p className="text-muted">
        {counts ? `Unit 1: ${counts.sentences} sentences, ${counts.words} words. ${counts.live ? 'Live.' : 'Waiting for approval.'}` : '\u00a0'}
      </p>
    </main>
  )
}
