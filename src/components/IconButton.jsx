// A button that is just an icon: close, settings, flag. 44px square so it is easy to tap; `label` names it for
// screen readers, since there is no text. Added for the two screens (design-system branch): the app writes
// <button className="icon-btn"> by hand; this draws the same class.
export default function IconButton({ label, className = '', children, ...rest }) {
  return <button {...rest} aria-label={label} className={className ? `icon-btn ${className}` : 'icon-btn'}>{children}</button>
}
