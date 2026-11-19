// A level marker across the tree ("Early A1"): a thin line with the level in italics in the middle. A list item, since
// the tree is a list. Lifted from Home.jsx, where it was called Marker (design-system branch).
export default function LevelLine({ label }) {
  return (
    <li className="flex w-full items-center gap-3 text-sm text-muted" aria-label={`Level: ${label}`}>
      <span className="h-0.5 flex-1 bg-line" />
      <span className="italic">{label}</span>
      <span className="h-0.5 flex-1 bg-line" />
    </li>
  )
}
