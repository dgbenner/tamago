import { useEffect, useRef, useState } from 'react'

// The Compare view: one story drawn three times, Tamago, iOS and Android side by side. Each is its own small
// window (an iframe) of the real size, so every style lays itself out exactly as it would on that screen.
const STYLES = [['tamago', 'Tamago'], ['ios', 'iOS'], ['android', 'Android']]
const SIZE = { phone: { width: 390, height: 844 }, desktop: { width: 1440, height: 900 } }
const label = { font: '600 13px system-ui, sans-serif', color: 'var(--muted)', margin: '0 0 6px' }

// stacked: one under another, each as large as the space allows (the default at desktop size, where three
// 1440px windows side by side would be too small to read).
export default function Compare({ storyId, size = 'phone', theme = 'light', stacked = false }) {
  const { width, height } = SIZE[size]
  const box = useRef(null)
  const [scale, setScale] = useState(1)
  // Shrink the three windows together to fit the space, never enlarge them.
  useEffect(() => {
    const fit = () => setScale(Math.min(1, stacked ? (box.current.clientWidth - 32) / width : (box.current.clientWidth - 2 * 16 - 32) / (3 * width)))
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(box.current)
    return () => ro.disconnect()
  }, [width, stacked])
  return (
    <div ref={box} style={{ display: 'flex', flexDirection: stacked ? 'column' : 'row', gap: stacked ? 24 : 16, padding: 16, justifyContent: 'center', alignItems: stacked ? 'center' : 'flex-start', minWidth: 0 }}>
      {STYLES.map(([style, name]) => (
        <div key={style} style={{ width: width * scale, flex: 'none' }}>
          <p style={label}>{name}</p>
          <div style={{ width: width * scale, height: height * scale, overflow: 'hidden', borderRadius: 12 * scale + 4, boxShadow: '0 0 0 1px var(--line), 0 6px 24px rgb(0 0 0 / 0.12)' }}>
            <iframe title={`${name} style`} src={`iframe.html?id=${storyId}&viewMode=story&globals=style:${style};theme:${theme}`}
              style={{ width, height, border: 0, transform: `scale(${scale})`, transformOrigin: '0 0', display: 'block' }} />
          </div>
        </div>
      ))}
    </div>
  )
}
