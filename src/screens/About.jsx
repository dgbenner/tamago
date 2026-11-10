import Logo from './Logo.jsx'
import { IconBack } from './icons.jsx'

const A = ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="inline-block min-h-6 py-0.5 underline underline-offset-2">{children}</a>

export default function About({ content, onBack }) {
  const tatoeba = content.sentences.filter((s) => s.source === 'tatoeba')
  const owners = [...new Set(tatoeba.map((s) => s.source_owner))].sort((a, b) => a.localeCompare(b))
  const recordings = content.sentences.filter((s) => s.lingua_libre)
  const wordRecordings = content.words.filter((w) => w.lingua_libre)
  const nativeRecorded = content.sentences.filter((s) => s.native_recording)
  const originals = content.sentences.filter((s) => s.source === 'tamago_original').length
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="relative flex justify-center">
        <button onClick={onBack} aria-label="Back" className="icon-btn absolute top-0 left-0 -ml-2"><IconBack /></button>
        <Logo />
      </header>
      <h1 className="text-xl font-semibold">About the Content</h1>

      <section className="flex flex-col gap-2">
        <h2 className="font-semibold">Sentences</h2>
        <p>{tatoeba.length} sentences and their translations come from <A href="https://tatoeba.org">Tatoeba</A>, licensed under <A href="https://creativecommons.org/licenses/by/2.0/fr/deed.en">CC BY 2.0 FR</A>. Contributors: {owners.join(', ')}.</p>
        <ul className="flex flex-wrap gap-x-3 text-sm text-muted">
          {tatoeba.map((s) => <li key={s.sentence_id}><A href={`https://tatoeba.org/en/sentences/show/${s.source_id}`}>#{s.source_id}</A></li>)}
        </ul>
        <p>{originals} sentences were written for Tamago.</p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-semibold">Words and Hints</h2>
        <p>Parts of speech, genders, definitions and hints come from <A href="https://en.wiktionary.org">Wiktionary</A>, licensed under <A href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</A>. Hints may be shortened. Content built from these sources is shared under the same license.</p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-semibold">Pictures</h2>
        {content.words.some((w) => String(w.image_file).startsWith('pictures/')) && <p>Most pictures for word to image were made for Tamago.</p>}
        {content.image_set.map((set) => (
          <p key={set.name}>The others are <A href={set.url}>{set.name}</A> {set.version}, licensed under <A href={set.license_url}>{set.license}</A>.</p>
        ))}
        <p>Verb tables in the grammar notes come from Wiktionary, under the same license as the words.</p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-semibold">Recordings</h2>
        <p>Native recordings come from <A href="https://lingualibre.org">Lingua Libre</A>. Other audio is your device's text-to-speech.</p>
        <ul className="flex flex-col gap-1 text-sm text-muted">
          {recordings.map((s) => (
            <li key={s.sentence_id}><span lang="fr">{s.french}</span> by {s.lingua_libre.speaker}, {s.lingua_libre.license}. <A href={`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(s.lingua_libre.file)}`}>Source</A></li>
          ))}
          {wordRecordings.map((w) => (
            <li key={w.word_id}><span lang="fr">{w.form}</span> by {w.lingua_libre.speaker}, {w.lingua_libre.license}. <A href={`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(w.lingua_libre.file)}`}>Source</A></li>
          ))}
        </ul>
        {nativeRecorded.length > 0 && (
          <>
            <p>Recorded for Tamago by native speakers during the sentence check, under CC BY-SA 4.0:</p>
            <ul className="flex flex-col gap-1 text-sm text-muted">
              {[...new Set(nativeRecorded.map((s) => s.native_recording.speaker))].map((who) => (
                <li key={who}>{who}: {nativeRecorded.filter((s) => s.native_recording.speaker === who).length} sentences</li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  )
}
