// A feature that needs an account, a server or a key Dan hasn't set up yet. Says so plainly; the steps are in
// _source/check-in.md.
export default function NeedsSetup({ title, children }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-line p-3">
      <p className="flex items-center gap-2 font-medium">{title} <span className="tag">Needs setup</span></p>
      <p className="mt-1 text-sm text-muted">{children}</p>
    </div>
  )
}
