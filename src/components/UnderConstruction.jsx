// The yellow "Under construction" banner (Dan, 2026-11-23): under the title on the tool screens that are still being
// built (Conversations, Glossary, Progress, Self-Study, Verbs). Plain on purpose: no date, no "coming soon".
// The warning toast's colors, so it reads the same in light and dark.
export default function UnderConstruction() {
  return (
    <p data-ds="under-construction" role="note"
      className="rounded-lg border border-[color-mix(in_srgb,var(--toast-warning-ink)_25%,transparent)] bg-[var(--toast-warning-bg)] px-3 py-2 text-sm font-medium text-[var(--toast-warning-ink)]">
      Under construction.
    </p>
  )
}
