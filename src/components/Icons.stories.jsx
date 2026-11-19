import * as icons from '../screens/icons.jsx'

// Every icon in src/screens/icons.jsx, by the name used in code. The list builds itself from the file, so a new icon
// shows up here without anyone adding it.
const names = Object.keys(icons).filter((n) => n.startsWith('Icon')).sort()
const cell = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '14px 6px', border: '2px solid var(--line)', borderRadius: 12, background: 'var(--surface)', color: 'var(--ink)' }
const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(8.5rem, 1fr))', gap: 10, padding: 16 }
const label = { fontSize: 12, color: 'var(--muted)', textAlign: 'center' }
const Cell = ({ name, children }) => <div style={cell}>{children}<span style={label}>{name}</span></div>

export default { title: 'Icons' }

export const EveryIcon = {
  render: () => (
    <div style={grid}>
      {names.map((n) => { const Icon = icons[n]; return <Cell key={n} name={n}><Icon /></Cell> })}
    </div>
  ),
}

// Two icons move while something is happening: the speaker while its sound plays, the microphone while recording.
export const MovingIcons = {
  render: () => (
    <div style={grid}>
      <Cell name="IconSpeaker playing"><icons.IconSpeaker playing /></Cell>
      <Cell name="IconMic live"><icons.IconMic live /></Cell>
    </div>
  ),
}
