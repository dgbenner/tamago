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
      ": a translucent banner from the top with the sushi icon"
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
      ": a filled capsule"
    ],
    [
      "",
      "Konsta Chip",
      ": an outlined chip with 8dp corners"
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
    "AnswerBar",
    [
      "Adapted: translucent bar with a thin colored edge; its Continue is the iOS Button"
    ],
    [
      "Adapted: 28dp top corners and a shadow, no edge; its Continue is the Android Button"
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
