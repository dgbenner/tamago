import { IconBack } from './icons.jsx'

// The variant test bank, for Dan: switch each variant between live, testing and off. Nothing is deleted.
// A type always keeps at least one live variant; a variant tied to a setting (cant_listen_now only) can't be the last.
export default function VariantBank({ types, variants, onChange, onBack }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-8">
      <header className="flex items-center gap-2">
        <button onClick={onBack} aria-label="Back" className="icon-btn -ml-2"><IconBack /></button>
        <h1 className="text-xl font-semibold">Variant Test Bank</h1>
      </header>
      <p className="text-sm text-muted">Changes apply from the next lesson and stay on this device. Testing variants aren't used in lessons.</p>
      {types.map((t) => {
        const list = variants.filter((v) => v.type_id === t.type_id)
        const liveNormal = list.filter((v) => v.status === 'live' && !/ only$/.test(String(v.use_in_rounds)))
        return (
          <section key={t.type_id} className="flex flex-col gap-2">
            <h2 className="font-semibold">{t.type_id} {t.name}</h2>
            {list.map((v) => {
              const last = v.status === 'live' && liveNormal.length === 1 && liveNormal[0] === v
              return (
                <div key={v.variant_id} className="flex flex-col gap-1.5 rounded-xl border-2 border-line bg-surface p-3">
                  <p className="text-sm"><span className="font-semibold">{v.variant_id}</span> {v.description}{v.use_in_rounds ? <span className="text-muted"> · rounds {v.use_in_rounds}</span> : null}</p>
                  <div className="flex overflow-hidden rounded-xl border-2 border-line">
                    {['live', 'testing', 'off'].map((s) => (
                      <button key={s} aria-pressed={v.status === s} disabled={last && s !== 'live'} onClick={() => onChange(v.variant_id, s)}
                        className={`min-h-10 flex-1 text-sm disabled:opacity-40 ${v.status === s ? 'bg-orange font-semibold text-white' : 'bg-surface'}`}>{s}</button>
                    ))}
                  </div>
                </div>
              )
            })}
          </section>
        )
      })}
    </main>
  )
}
