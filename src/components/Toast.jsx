// Toasts (Dan, 2026-11-11): a short line that slides down from the top of the screen, holds about 3 seconds and
// slides back up by itself; no tap. Kinds: info, success, warning, error, and pass (a passed lesson: green, larger).
// Lifted from Home.jsx unchanged (design-system branch). line is { id, kind, text }, or null for none.
export default function Toast({ line, onGone }) {
  return (
    <div className="toast-region" aria-live="polite">
      {line && <p key={line.id} className={`toast toast-${line.kind ?? 'info'}`}
        onAnimationEnd={(e) => { if (e.animationName === 'toast-out' || e.animationName === 'toast-fade') onGone() }}>{line.text}</p>}
    </div>
  )
}
