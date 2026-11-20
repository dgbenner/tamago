// Samples for the Type and Spacing page. The numbers are counts of each class across the app's screens and
// components (2026-11-19, design-system branch); the layout uses plain styles so nothing here adds to the app's CSS.
const th = { textAlign: 'left', padding: '8px 10px', fontSize: 13, borderBottom: '2px solid #ddd' }
const td = { padding: '10px', fontSize: 14, borderBottom: '1px solid #e6e6e6', verticalAlign: 'middle' }
const mono = { fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13 }
const Table = ({ head, children }) => <table style={{ borderCollapse: 'collapse', width: '100%' }}><thead><tr>{head.map((h) => <th key={h} style={th}>{h}</th>)}</tr></thead><tbody>{children}</tbody></table>

// rem at the app's 17px root (phones, and 1024px and wider); 16px between.
const SIZES = [
  ['text-xs', 0.75, 28, 'Tiny labels: "Slow", "Show Words", the Start Here marker'],
  ['text-sm', 0.875, 210, 'Captions, notes, toasts, tool pills: the most used size'],
  ['text-base', 1, 28, 'Body text, circle titles'],
  ['text-lg', 1.125, 29, 'Choices and word chips on phones'],
  ['text-xl', 1.25, 35, 'Headings: the question heading, sheet titles'],
  ['text-2xl', 1.5, 15, 'The sentence being learned'],
  ['text-3xl', 1.875, 1, 'Used once'],
]
export function TypeSizes() {
  return (
    <Table head={['Class', 'Size', 'Uses', 'Sample', 'Where']}>
      {SIZES.map(([cls, rem, n, where]) => (
        <tr key={cls}>
          <td style={{ ...td, ...mono }}>{cls}</td>
          <td style={td}>{rem}rem · {Math.round(rem * 17 * 10) / 10}px</td>
          <td style={td}>{n}</td>
          <td style={td}><span style={{ fontSize: `${rem * 17}px`, lineHeight: 1.3 }}>Bonjour, ça va ?</span></td>
          <td style={td}>{where}</td>
        </tr>
      ))}
    </Table>
  )
}

const WEIGHTS = [['font-normal', 400, 9, 'Body text (the default)'], ['font-medium', 500, 65, 'Buttons with an outline, labels'], ['font-semibold', 600, 123, 'Headings, main buttons, titles']]
export function TypeWeights() {
  return (
    <Table head={['Class', 'Weight', 'Uses', 'Sample', 'Where']}>
      {WEIGHTS.map(([cls, w, n, where]) => <tr key={cls}><td style={{ ...td, ...mono }}>{cls}</td><td style={td}>{w}</td><td style={td}>{n}</td><td style={td}><span style={{ fontWeight: w, fontSize: 17 }}>Bonjour, ça va ?</span></td><td style={td}>{where}</td></tr>)}
    </Table>
  )
}

const bar = (px) => <span style={{ display: 'inline-block', width: px, height: 14, background: '#d3460f', borderRadius: 2 }} />
const GAPS = [['gap-0.5', 0.125, 7], ['gap-1', 0.25, 39], ['gap-1.5', 0.375, 18], ['gap-2', 0.5, 136], ['gap-2.5', 0.625, 5], ['gap-3', 0.75, 52], ['gap-4', 1, 13], ['gap-5', 1.25, 20], ['gap-6', 1.5, 15]]
export function Gaps() {
  return (
    <Table head={['Class', 'Size', 'Uses', 'Shown']}>
      {GAPS.map(([cls, rem, n]) => <tr key={cls}><td style={{ ...td, ...mono }}>{cls}</td><td style={td}>{rem}rem · {Math.round(rem * 17 * 10) / 10}px</td><td style={td}>{n}</td><td style={td}>{bar(rem * 17)}</td></tr>)}
    </Table>
  )
}
const PADS = [['px-4', 1, 57, 'Page side margins, buttons'], ['px-3', 0.75, 36, 'Pills, small boxes'], ['p-3', 0.75, 23, 'Cards'], ['p-4', 1, 8, 'Larger cards'], ['p-5 (sheet)', 1.25, 1, 'Inside a sheet']]
export function Paddings() {
  return (
    <Table head={['Class', 'Size', 'Uses', 'Shown', 'Where']}>
      {PADS.map(([cls, rem, n, where]) => <tr key={cls}><td style={{ ...td, ...mono }}>{cls}</td><td style={td}>{rem}rem · {Math.round(rem * 17 * 10) / 10}px</td><td style={td}>{n}</td><td style={td}>{bar(rem * 17)}</td><td style={td}>{where}</td></tr>)}
    </Table>
  )
}

const box = (extra) => <span style={{ display: 'inline-block', width: 72, height: 44, background: '#fff', border: '2px solid #1c1a17', ...extra }} />
const RADII = [['rounded-lg', '0.5rem', 10, 'Small boxes, text links'], ['rounded-xl', '0.75rem', 67, 'Buttons, choices, chips, cards: the standard corner'], ['rounded-2xl', '1rem', 11, 'Sheets, bubbles'], ['rounded-full', '999px', 30, 'Pills, circles, the progress bar']]
export function Corners() {
  return (
    <Table head={['Class', 'Radius', 'Uses', 'Shown', 'Where']}>
      {RADII.map(([cls, r, n, where]) => <tr key={cls}><td style={{ ...td, ...mono }}>{cls}</td><td style={td}>{r}</td><td style={td}>{n}</td><td style={td}>{box({ borderRadius: r })}</td><td style={td}>{where}</td></tr>)}
    </Table>
  )
}
const LINES = [['border-2', 2, 'The standard line: cards, sheets, pills, dividers'], ['border-4', 4, 'Things you press in a lesson: choices, chips, the outlined button']]
export function Lines() {
  return (
    <Table head={['Class', 'Width', 'Shown', 'Where']}>
      {LINES.map(([cls, w, where]) => <tr key={cls}><td style={{ ...td, ...mono }}>{cls}</td><td style={td}>{w}px</td><td style={td}>{box({ borderWidth: w, borderRadius: 12, borderColor: '#979287' })}</td><td style={td}>{where}</td></tr>)}
    </Table>
  )
}
const HEIGHTS = [['min-h-9', 2.25, 'Text links'], ['min-h-10', 2.5, 'Tool pills'], ['min-h-11 / h-11', 2.75, 'Icon buttons, word chips: the smallest comfortable tap target'], ['min-h-12', 3, 'Main buttons and choices'], ['h-16', 4, 'The big speaker button']]
export function Heights() {
  return (
    <Table head={['Class', 'Height', 'Shown', 'Where']}>
      {HEIGHTS.map(([cls, rem, where]) => <tr key={cls}><td style={{ ...td, ...mono }}>{cls}</td><td style={td}>{rem}rem · {Math.round(rem * 17 * 10) / 10}px</td><td style={td}><span style={{ display: 'inline-block', width: 110, height: rem * 17, background: '#ffc21a', borderRadius: 12 }} /></td><td style={td}>{where}</td></tr>)}
    </Table>
  )
}
