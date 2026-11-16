// The interface sounds' recipes: Dan's picks from the Sound Lab (lab/sounds/index.html), as written there.
// Since 2026-11-15 the app doesn't make these live: `node scripts/render-cues.mjs` renders each one to
// public/sounds/<name>.wav and audio.js plays the files through audio elements, because an iPhone (iPhone 11,
// iOS 27.2, Home Screen web app) never sounded the live Web Audio ones. Change a recipe here, then render again.
// No imports: the render script runs this file's text inside a browser page.
export const CUE_LEVEL = 0.32 // the bus gain the recipes are rendered at, before levelling
// Levelling (Dan, 2026-11-16: too quiet on a real iPad and iPhone): render-cues.mjs brings each file to CUE_LUFS,
// 6 dB under the lesson recordings (levelled to -16 LUFS, scripts/lib/loudness.mjs), with no peak above CUE_PEAK_DB.
// A sound whose peak reaches the cap first stays as loud as the cap allows. Before this they sat at -33 to -41 LUFS.
export const CUE_LUFS = -22
export const CUE_PEAK_DB = -1

// A struck tone: partials (frequency ratio, level), quick attack, exponential decay. The Sound Lab's `tone`.
export function cueTone(c, dest, freq, { at = 0, partials = [[1, 1]], attack = 0.004, decay = 0.25, level = 0.5, type = 'sine', lowpass = null, glide = null } = {}) {
  const t = c.currentTime + at
  let node = dest
  if (lowpass) { const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = lowpass; f.connect(dest); node = f }
  for (const [ratio, lvl] of partials) {
    const o = c.createOscillator(), g = c.createGain(), d = decay / Math.sqrt(ratio)
    o.type = type
    o.frequency.setValueAtTime(freq * ratio, t)
    if (glide) o.frequency.exponentialRampToValueAtTime(glide * ratio, t + decay * 0.8)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(level * lvl, t + attack)
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + d)
    o.connect(g).connect(node)
    o.start(t); o.stop(t + attack + d + 0.05)
  }
}

export const CUES = {
  start: (c, d) => { for (const f of [261.63, 329.63, 392]) cueTone(c, d, f, { attack: 0.08, decay: 0.5, level: 0.16, lowpass: 1800 }) }, // Soft swell
  button: (c, d) => cueTone(c, d, 160, { type: 'triangle', decay: 0.12, level: 0.6, lowpass: 900 }), // Warm thump
  match: (c, d) => { cueTone(c, d, 523.25, { partials: [[1, 1], [4, 0.2]], decay: 0.3, level: 0.4 }); cueTone(c, d, 659.25, { at: 0.08, partials: [[1, 1], [4, 0.2]], decay: 0.4, level: 0.4 }) }, // Two marimba notes
  slot: (c, d) => { cueTone(c, d, 1200, { glide: 900, decay: 0.04, level: 0.18 }); cueTone(c, d, 180, { decay: 0.06, level: 0.35, lowpass: 600 }) }, // Pebble
  correct: (c, d) => cueTone(c, d, 587.33, { glide: 784, attack: 0.006, decay: 0.2, level: 0.32, lowpass: 2400 }), // Warm lift
  incorrect: (c, d) => { cueTone(c, d, 220, { attack: 0.01, decay: 0.28, level: 0.3, lowpass: 1100 }); cueTone(c, d, 261.63, { attack: 0.01, decay: 0.28, level: 0.26, lowpass: 1100 }) }, // Muted minor
}
