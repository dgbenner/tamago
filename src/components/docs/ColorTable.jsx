import css from '../../index.css?raw'

// Reads the color tokens straight out of src/index.css, so this page can't drift from the app.
const block = (start) => { const i = css.indexOf(start); return i < 0 ? '' : css.slice(i, css.indexOf('\n}', i)) }
const tokens = (text) => Object.fromEntries([...text.matchAll(/(--[a-z-]+):\s*(#[0-9a-fA-F]{3,8})/g)].map((m) => [m[1], m[2]]))
const light = tokens(block(':root {'))
const dark = { ...light, ...tokens(block(":root[data-theme='dark'] {")) }

// Where each one is used, written by hand from the app's code.
const USED = {
  '--bg': 'The page behind everything',
  '--surface': 'Cards, sheets, choices, word chips, the answer bar',
  '--ink': 'Text',
  '--muted': 'Quiet text: captions, hints, text links',
  '--line': 'Borders, dividers, the empty track of the progress bar and the circle ring',
  '--accent': 'Yellow, the main button (Check, Start Lesson, Next Lesson) and the small wordmark',
  '--accent-ink': 'Text on yellow',
  '--green': 'The Continue button and the progress bar\'s fill',
  '--orange': 'A picked choice, the new-word dot, the current flag\'s outline, the drop bar when dragging a chip',
  '--logo-green': 'The outer line of the big wordmark',
  '--logo-orange': 'The inner line of the big wordmark',
  '--right': 'A right answer: the verdict and the choice\'s edge',
  '--wrong': 'A wrong answer: the verdict, the choice\'s edge, "Incorrect"',
  '--ring': 'The lesson circle\'s progress ring and "Start Here"',
  '--electric': 'Small icons under the mouse (the grammar notebook, the info icon)',
  '--disc': 'The warm disc behind the sushi in a lesson circle',
  '--focus': 'The outline around whatever the keyboard is on',
  '--field': 'Edges of text fields and menus; Developer\'s dashed outline',
  '--toast-info-bg': 'Toast, info: fill (also the reply bubble in Answer the Question)',
  '--toast-info-ink': 'Toast, info: text',
  '--toast-success-bg': 'Toast, success: fill',
  '--toast-success-ink': 'Toast, success: text',
  '--toast-warning-bg': 'Toast, warning: fill',
  '--toast-warning-ink': 'Toast, warning: text',
  '--toast-error-bg': 'Toast, error: fill',
  '--toast-error-ink': 'Toast, error: text',
}
// Colors written directly into the code instead of being named in the token list.
const LOOSE = [
  ['#15803d', 'The passed-lesson toast\'s fill (src/index.css, .toast-pass)'],
  ['#116b33', 'The passed-lesson toast\'s edge (src/index.css, .toast-pass)'],
  ['#ffffff', 'Text on the passed-lesson toast, on Continue and on a picked choice'],
  ['#1f6dfb', 'The points chip in Home.jsx (hidden for now); the same blue as --electric in light'],
]

const th = { textAlign: 'left', padding: '8px 10px', fontSize: 13, borderBottom: '2px solid #ddd' }
const td = { padding: '8px 10px', fontSize: 14, borderBottom: '1px solid #e6e6e6', verticalAlign: 'middle' }
const mono = { fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13 }
const Swatch = ({ hex }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
    <span style={{ width: 36, height: 36, borderRadius: 8, background: hex, border: '1px solid rgb(0 0 0 / 0.25)', flex: 'none' }} />
    <span style={mono}>{hex}</span>
  </span>
)

export function ColorTable() {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead><tr><th style={th}>Name</th><th style={th}>Light</th><th style={th}>Dark</th><th style={th}>Where It's Used</th></tr></thead>
      <tbody>
        {Object.keys(light).map((name) => (
          <tr key={name}>
            <td style={{ ...td, ...mono }}>{name}</td>
            <td style={td}><Swatch hex={light[name]} /></td>
            <td style={td}><Swatch hex={dark[name]} />{dark[name].toLowerCase() === light[name].toLowerCase() && <div style={{ fontSize: 12, color: '#666' }}>same as light</div>}</td>
            <td style={td}>{USED[name] ?? 'Not described yet'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function LooseColors() {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead><tr><th style={th}>Color</th><th style={th}>Where It's Used</th></tr></thead>
      <tbody>{LOOSE.map(([hex, where]) => <tr key={hex}><td style={td}><Swatch hex={hex} /></td><td style={td}>{where}</td></tr>)}</tbody>
    </table>
  )
}
