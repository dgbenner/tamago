import { Progressbar } from 'konsta/react'

// The progress bar in the iOS and Android styles: Konsta UI's Progressbar in Tamago's green.
// iOS: a 6px rounded track. Android: Material 3's 4px track with the stop dot at the end.
const colors = { activeBgIos: 'bg-green', activeBgMaterial: 'bg-green', trackBgIos: 'bg-line', trackBgMaterial: 'bg-line' }
export default function PlatformProgressBar({ value, label = 'Lesson progress' }) {
  return <Progressbar progress={value} colors={colors} className="tg-progress flex-1" role="progressbar" aria-label={label} aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100} />
}
