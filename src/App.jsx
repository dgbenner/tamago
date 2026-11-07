import { useEffect, useState } from 'react'

// Phase 0 shell: proves the built content loads. The lesson player arrives in Phase 1.
export default function App() {
  const [counts, setCounts] = useState(null)

  useEffect(() => {
    Promise.all(['sentences', 'words'].map((t) => fetch(`/content/${t}.json`).then((r) => r.json())))
      .then(([sentences, words]) => setCounts({ sentences: sentences.length, words: words.length }))
  }, [])

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-6 px-4 text-center">
      <img src="/logo.png" alt="" className="w-40 rounded-3xl" />
      <h1 className="text-3xl font-semibold">Tamago</h1>
      <p className="text-muted">
        {counts ? `Unit 1: ${counts.sentences} of 30 sentences live, ${counts.words} of 18 words live.` : ' '}
      </p>
    </main>
  )
}
