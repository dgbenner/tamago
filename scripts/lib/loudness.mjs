// Evens out recording loudness (Dan's test notes: some recordings were very loud, some very quiet). Course clips are
// often under a second, too short for ffmpeg's loudnorm to adjust, so: measure the integrated loudness (EBU R128),
// apply the exact gain to reach -16 LUFS, and let a fast limiter hold the few peaks that would pass -1.5 dB. Needs ffmpeg.
import { execFileSync, spawnSync } from 'node:child_process'

const TARGET_LUFS = -16
const CEILING = 10 ** (-1.5 / 20)

export function loudnessOf(file) {
  const { stderr } = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', file, '-af', 'loudnorm=print_format=json', '-f', 'null', '-'], { encoding: 'utf8' })
  return Number(JSON.parse(stderr.slice(stderr.lastIndexOf('{'), stderr.lastIndexOf('}') + 1)).input_i)
}

export function normaliseFile(input, output, extra = []) {
  // The limiter takes back a little of the gain on peaky clips, so a second pass adds what it took.
  let gain = TARGET_LUFS - loudnessOf(input)
  for (let pass = 0; pass < 3; pass++) {
    const af = `volume=${gain.toFixed(2)}dB,alimiter=limit=${CEILING.toFixed(3)}:attack=1:release=40:level=false`
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', input, '-af', af, '-ar', '48000', ...extra, output])
    const short = TARGET_LUFS - loudnessOf(output)
    if (short < 0.5) return
    gain += short
  }
}
