// The table on the Styles page: how each component is made in each style. Plain styles, so the app's CSS gains nothing.
const ROWS = [
  [
    "Button",
    [
      "",
      "Konsta Button",
      ": a capsule, 50pt tall, 17pt semibold; dims when pressed"
    ],
    [
      "",
      "Konsta Button",
      ": fully rounded, 14sp medium; ripple when pressed"
    ]
  ],
  [
    "ProgressBar",
    [
      "",
      "Konsta Progressbar",
      ": 6px rounded track"
    ],
    [
      "",
      "Konsta Progressbar",
      ": 4px track with a stop dot at the end"
    ]
  ],
  [
    "ChoiceList",
    [
      "",
      "Konsta List",
      ": one grouped block, rows parted by hairlines, 44pt rows; a green check or red \"Incorrect\" at the row's end"
    ],
    [
      "",
      "Konsta List",
      ": 56dp rows in an outlined block, ripple; the same check and \"Incorrect\""
    ]
  ],
  [
    "Sheet",
    [
      "",
      "Konsta Sheet",
      " on phones (large top corners, a grabber); ",
      "Konsta Popup",
      " on desktop"
    ],
    [
      "",
      "Konsta Sheet",
      " on phones (28dp top corners, a drag handle); ",
      "Konsta Popup",
      " on desktop"
    ]
  ],
  [
    "SheetHead",
    [
      "Adapted: 20pt bold title, a small round grey close button"
    ],
    [
      "Adapted: 24sp regular title, a round close button with a pressed layer"
    ]
  ],
  [
    "Toast",
    [
      "",
      "Konsta Notification",
      ": a plain, compact, translucent banner from the top: the message alone"
    ],
    [
      "",
      "Konsta Toast",
      ": Material's snackbar at the bottom, 4dp corners"
    ]
  ],
  [
    "ToolTile, pill",
    [
      "",
      "Konsta Chip",
      ": a filled capsule, 32px tall with an invisible 44pt tap area"
    ],
    [
      "",
      "Konsta Chip",
      ": an outlined chip with 8dp corners, 32dp tall with an invisible 48dp tap area"
    ]
  ],
  [
    "ToolTile, card",
    [
      "Adapted: borderless, 20pt corners, 17pt title"
    ],
    [
      "Adapted: outlined card, 12dp corners, 16sp medium title"
    ]
  ],
  [
    "TopBar",
    [
      "",
      "Konsta Navbar",
      ": the wordmark centred, the flag at the left, the gear at the right"
    ],
    [
      "",
      "Konsta Navbar",
      ": the wordmark at the left, the flag and the gear together at the right (a top app bar)"
    ]
  ],
  [
    "ToolStrip (phone)",
    [
      "",
      "Konsta Tabbar",
      " at the bottom: Learn, three tools, More"
    ],
    [
      "",
      "Konsta Tabbar",
      " at the bottom (a navigation bar): Learn, three tools, More"
    ]
  ],
  [
    "ToolPanel (desktop)",
    [
      "Adapted, and moved to the left edge (a sidebar)"
    ],
    [
      "Adapted, and moved to the left edge (a navigation drawer): rows without boxes"
    ]
  ],
  [
    "PinnedAction",
    [
      "The iOS Button, floating just above the tab bar"
    ],
    [
      "",
      "Konsta Fab",
      " with its label (an extended floating action button), lower right"
    ]
  ],
  [
    "IconButton",
    [
      "Adapted: round; the close button is a small grey circle"
    ],
    [
      "Adapted: round, with a pressed layer"
    ]
  ],
  [
    "AnswerBar",
    [
      "Adapted: translucent bar with a thin colored edge; its Continue is the iOS Button"
    ],
    [
      "Adapted: 28dp top corners and a shadow, no edge; a small check or X beside the verdict; its Continue is the Android Button"
    ]
  ],
  [
    "QuestionHeading",
    [
      "Adapted: 22pt bold (Title 2)"
    ],
    [
      "Adapted: 22sp regular (Title Large)"
    ]
  ],
  [
    "AudioHelp",
    [
      "Adapted: a round, borderless play button; Slow and Show Words are iOS text buttons"
    ],
    [
      "Adapted: 16dp corners, a soft shadow that deepens when pressed; Material text buttons"
    ]
  ],
  [
    "SentenceText",
    [
      "Adapted: the word hint is a soft, rounded popover"
    ],
    [
      "Adapted: the word hint is Material's small dark tooltip, 4dp corners"
    ]
  ],
  [
    "CircleNode",
    [
      "Adapted: 15pt title; the circle dims when pressed"
    ],
    [
      "Adapted: 14sp medium title; a soft ring spreads when pressed"
    ]
  ],
  [
    "FlagRow",
    [
      "Adapted: the running course keeps its orange outline, a little thinner"
    ],
    [
      "Adapted: the running course gets an orange-tinted background instead of an outline"
    ]
  ],
  [
    "LevelLine",
    [
      "Adapted: a hairline, small capitals, no italics"
    ],
    [
      "Adapted: a 1dp line, 12sp medium, no italics"
    ]
  ],
  [
    "Logo",
    [
      "Unchanged: it is the brand"
    ],
    [
      "Unchanged: it is the brand"
    ]
  ],
  [
    "Icons",
    [
      "Unchanged (see below)"
    ],
    [
      "Unchanged (see below)"
    ]
  ]
]

const th = { textAlign: 'left', padding: '8px 10px', fontSize: 13, borderBottom: '2px solid #ddd', verticalAlign: 'bottom' }
const td = { padding: '10px', fontSize: 14, lineHeight: 1.45, borderBottom: '1px solid #e6e6e6', verticalAlign: 'top' }
const Rich = ({ parts }) => parts.map((t, i) => (i % 2 ? <strong key={i}>{t}</strong> : <span key={i}>{t}</span>))

export function StylesTable() {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead><tr><th style={th}>Component</th><th style={th}>Tamago</th><th style={th}>iOS</th><th style={th}>Android</th></tr></thead>
      <tbody>
        {ROWS.map(([name, ios, android]) => (
          <tr key={name}>
            <td style={{ ...td, fontWeight: 600, whiteSpace: 'nowrap' }}>{name}</td>
            <td style={{ ...td, whiteSpace: 'nowrap', color: '#555' }}>Tamago's own</td>
            <td style={td}><Rich parts={ios} /></td>
            <td style={td}><Rich parts={android} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// What moved on each screen to follow the platform (the Styles page, "The Two Screens").
const MOVED = [
  ['Main page: header', 'Flag left, wordmark centred, gear right', 'The same places, as a navigation bar', 'Wordmark left; flag and gear together at the right'],
  ['Main page: tools, phone', 'A strip of pills under the header, all seven', 'A tab bar at the bottom: Learn, three tools, More', 'A navigation bar at the bottom: Learn, three tools, More'],
  ['Main page: tools, desktop', 'A panel of cards at the right', 'The same cards at the left, as a sidebar', 'The same list at the left, as a navigation drawer'],
  ['Main page: Next Lesson', 'A full-width button pinned at the bottom, with a line above', 'The same button, floating above the tab bar', 'A floating action button with its label, lower right'],
  ['Main page: circle sheet', 'Bottom sheet, or a pop-up on desktop', 'The same, with a grabber', 'The same, with a drag handle'],
  ['Question page: top', 'Close button, then the progress bar', 'The same; the close button is a small grey circle', 'The same'],
  ['Question page: choices', 'Four separate boxes', 'One grouped list', 'One outlined list'],
  ['Question page: result', 'A bar at the bottom with a colored edge', 'A translucent bar with a thin colored edge', 'A sheet-like bar with a check or X beside the verdict'],
]
export function ScreensTable() {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead><tr><th style={th}>Where</th><th style={th}>Tamago</th><th style={th}>iOS</th><th style={th}>Android</th></tr></thead>
      <tbody>{MOVED.map(([where, ...cells]) => <tr key={where}><td style={{ ...td, fontWeight: 600 }}>{where}</td>{cells.map((c, i) => <td key={i} style={td}>{c}</td>)}</tr>)}</tbody>
    </table>
  )
}
