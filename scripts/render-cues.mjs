// Renders the interface sounds (src/lib/cue-recipes.js) to public/sounds/<name>.wav: mono, 44.1 kHz, 16-bit.
// The recipes are Web Audio, so they are rendered by a real browser's OfflineAudioContext (Chrome, through
// Playwright), at the bus level the app used live (CUE_LEVEL). Run again after changing a recipe:
//   node scripts/render-cues.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'

const RATE = 44100
const LENGTH = 1.2 // seconds rendered; the silent tail is trimmed
const TAIL = 0.03 // seconds kept after the last audible sample
const recipes = readFileSync(new URL('../src/lib/cue-recipes.js', import.meta.url), 'utf8').replace(/^export /gm, '')

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage()
const rendered = await page.evaluate(async ({ recipes, RATE, LENGTH }) => {
  const { CUES, CUE_LEVEL } = new Function(`${recipes}\nreturn { CUES, CUE_LEVEL }`)()
  const out = {}
  for (const [name, recipe] of Object.entries(CUES)) {
    const c = new OfflineAudioContext(1, Math.ceil(RATE * LENGTH), RATE)
    const bus = c.createGain()
    bus.gain.value = CUE_LEVEL
    bus.connect(c.destination)
    recipe(c, bus)
    out[name] = Array.from((await c.startRendering()).getChannelData(0))
  }
  return out
}, { recipes, RATE, LENGTH })
await browser.close()

mkdirSync('public/sounds', { recursive: true })
for (const [name, samples] of Object.entries(rendered)) {
  let last = samples.length - 1
  while (last > 0 && Math.abs(samples[last]) < 0.0002) last--
  const n = Math.min(samples.length, last + Math.ceil(RATE * TAIL))
  const fade = Math.ceil(RATE * 0.01)
  const wav = Buffer.alloc(44 + n * 2)
  wav.write('RIFF', 0); wav.writeUInt32LE(36 + n * 2, 4); wav.write('WAVEfmt ', 8)
  wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22)
  wav.writeUInt32LE(RATE, 24); wav.writeUInt32LE(RATE * 2, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34)
  wav.write('data', 36); wav.writeUInt32LE(n * 2, 40)
  let peak = 0
  for (let i = 0; i < n; i++) {
    const v = samples[i] * Math.min(1, (n - i) / fade) // the last 10 ms fade to nothing, so the end never clicks
    peak = Math.max(peak, Math.abs(v))
    wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, v)) * 32767), 44 + i * 2)
  }
  writeFileSync(`public/sounds/${name}.wav`, wav)
  console.log(`${name}.wav  ${(n / RATE).toFixed(2)} s  peak ${(20 * Math.log10(peak)).toFixed(1)} dBFS  ${wav.length} bytes`)
}
