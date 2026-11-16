// Renders the interface sounds (src/lib/cue-recipes.js) to public/sounds/<name>.wav: mono, 44.1 kHz, 16-bit.
// The recipes are Web Audio, so they are rendered by a real browser's OfflineAudioContext (Chrome, through
// Playwright), at the bus level the app used live (CUE_LEVEL), then each is levelled to CUE_LUFS (measured by
// ffmpeg's EBU R128 meter) with its peak held under CUE_PEAK_DB. Run again after changing a recipe:
//   node scripts/render-cues.mjs
import { spawnSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'

const RATE = 44100
const LENGTH = 1.2 // seconds rendered; the silent tail is trimmed
const TAIL = 0.03 // seconds kept after the last audible sample
const recipes = readFileSync(new URL('../src/lib/cue-recipes.js', import.meta.url), 'utf8').replace(/^export /gm, '')

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage()
const { CUE_LUFS, CUE_PEAK_DB } = new Function(`${recipes}\nreturn { CUE_LUFS, CUE_PEAK_DB }`)()
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
const header = (n) => {
  const wav = Buffer.alloc(44 + n * 2)
  wav.write('RIFF', 0); wav.writeUInt32LE(36 + n * 2, 4); wav.write('WAVEfmt ', 8)
  wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22)
  wav.writeUInt32LE(RATE, 24); wav.writeUInt32LE(RATE * 2, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34)
  wav.write('data', 36); wav.writeUInt32LE(n * 2, 40)
  return wav
}
const write = (path, samples, gain) => {
  const wav = header(samples.length)
  let peak = 0
  for (let i = 0; i < samples.length; i++) {
    const v = samples[i] * gain
    peak = Math.max(peak, Math.abs(v))
    wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, v)) * 32767), 44 + i * 2)
  }
  writeFileSync(path, wav)
  return { peak, bytes: wav.length }
}
// Integrated loudness by ffmpeg's EBU R128 meter; a second of silence is padded on so a short sound is measured whole.
const measure = (path) => {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', path, '-af', 'apad=pad_dur=1,ebur128', '-f', 'null', '-'], { encoding: 'utf8' })
  const m = [...String(r.stderr).matchAll(/^\s+I:\s+(-?[\d.]+) LUFS/gm)].pop()
  if (!m) throw new Error(`no loudness reading for ${path} (is ffmpeg installed?)`)
  return Number(m[1])
}
for (const [name, raw] of Object.entries(rendered)) {
  let last = raw.length - 1
  while (last > 0 && Math.abs(raw[last]) < 0.0002) last--
  const n = Math.min(raw.length, last + Math.ceil(RATE * TAIL))
  const fade = Math.ceil(RATE * 0.01)
  const samples = Float64Array.from({ length: n }, (_, i) => raw[i] * Math.min(1, (n - i) / fade)) // the last 10 ms fade to nothing, so the end never clicks
  const path = `public/sounds/${name}.wav`
  const before = write(path, samples, 1)
  const was = measure(path)
  const ceiling = 10 ** (CUE_PEAK_DB / 20)
  const gain = Math.min(10 ** ((CUE_LUFS - was) / 20), ceiling / before.peak)
  const after = write(path, samples, gain)
  const now = measure(path)
  console.log(`${name}.wav  ${(n / RATE).toFixed(2)} s  ${was.toFixed(1)} to ${now.toFixed(1)} LUFS  peak ${(20 * Math.log10(after.peak)).toFixed(1)} dBFS  ${after.bytes} bytes${gain === ceiling / before.peak ? '  (held by the peak cap)' : ''}`)
}
