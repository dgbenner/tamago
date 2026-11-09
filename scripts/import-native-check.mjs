// Folds a native-speaker check file (Settings, Native-speaker check, "Save the results") into the content.
// - content/native-check.json keeps every verdict, fix and note, merged with earlier files.
// - Recordings go to public/audio-native/ only if the checker agreed to share them (CC BY-SA 4.0, credited).
// - A fix to a drafted sentence is written into content/drafts.json; a fix to a workbook row is listed for Claude.
// The build then marks checked sentences, plays their recordings first, and holds back any fix not yet applied.
// Usage: node scripts/import-native-check.mjs <tamago-native-check-YYYY-MM-DD.json>
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
const ROOT = join(import.meta.dirname, '..')
const file = process.argv[2]
if (!file) throw new Error('usage: import-native-check.mjs <file>')
const data = JSON.parse(readFileSync(file, 'utf8'))
if (data.app !== 'tamago' || data.kind !== 'native_check') throw new Error('Not a Tamago native-check file.')

const OUT = join(ROOT, 'content/native-check.json')
const store = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : { checks: [], results: {} }
store.checks.push({ checker: data.checker, license_agreed: Boolean(data.license_agreed), saved_at: data.saved_at, count: data.results.length })
const AUDIO = join(ROOT, 'public/audio-native')
mkdirSync(AUDIO, { recursive: true })
const EXT = { 'audio/webm': 'webm', 'audio/mp4': 'm4a', 'audio/ogg': 'ogg', 'audio/wav': 'wav', 'audio/mpeg': 'mp3' }

const DRAFTS = join(ROOT, 'content/drafts.json')
const drafts = JSON.parse(readFileSync(DRAFTS, 'utf8'))
const forClaude = []
for (const r of data.results) {
  const entry = { verdict: r.verdict ?? null, note: r.note ?? '', checker: data.checker ?? '', checked_at: r.checked_at }
  if (r.verdict === 'fix') Object.assign(entry, { french_fix: r.french_fix ?? r.french, english_fix: r.english_fix ?? r.english, french_before: r.french, english_before: r.english })
  if (r.audio && data.license_agreed) {
    const [, mime, b64] = r.audio.match(/^data:([^;,]+)[^,]*;base64,(.*)$/) ?? []
    const ext = EXT[String(mime).split(';')[0]] ?? 'webm'
    const raw = join(AUDIO, `${r.sentence_id}.${ext}`)
    writeFileSync(raw, Buffer.from(b64, 'base64'))
    entry.audio_file = `${r.sentence_id}.${ext}`
    // Chrome records WebM, which older iPhones can't play: convert to AAC (m4a) when ffmpeg is installed.
    if (ext !== 'm4a') {
      try {
        execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', raw, '-ac', '1', '-c:a', 'aac', '-b:a', '64k', join(AUDIO, `${r.sentence_id}.m4a`)])
        rmSync(raw)
        entry.audio_file = `${r.sentence_id}.m4a`
      } catch { console.log(`ffmpeg unavailable or failed; ${r.sentence_id} stays .${ext}`) }
    }
  }
  store.results[r.sentence_id] = entry
  if (r.verdict === 'fix' && (entry.french_fix !== r.french || entry.english_fix !== r.english)) {
    const d = drafts.sentences.find((x) => x.sentence_id === r.sentence_id)
    if (d) Object.assign(d, { french: entry.french_fix, english: entry.english_fix, notes: `${d.notes ?? ''} | native fix (was "${r.french}" = "${r.english}")` })
    else forClaude.push(`${r.sentence_id}: "${r.french}" -> "${entry.french_fix}" (${entry.english_fix})`)
  }
}
writeFileSync(OUT, JSON.stringify(store, null, 2) + '\n')
writeFileSync(DRAFTS, JSON.stringify(drafts, null, 2) + '\n')
console.log(`${data.results.length} results saved; ${data.license_agreed ? 'recordings kept' : 'no licence agreement, recordings not used'}.`)
if (forClaude.length) console.log(`Workbook rows with fixes, held back until applied in the workbook:\n  ${forClaude.join('\n  ')}`)
console.log('Run npm run content next (import re-checks every fixed draft against the unit\'s words).')
