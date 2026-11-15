// Voice genders (Dan, 2026-11-14): the voice decides who is speaking, so Answer the Question's picture follows it.
// Dan tags each source in the Voice Lab (/voice-lab.html, local only): a device voice by its name ("voice:Thomas"),
// a recorded person by their name ("speaker:LoquaxFR"; Lingua Libre usernames, native checkers), so every file of
// theirs follows. Tags live in voice-genders.json, written by the dev server when the lab saves.
import TAGS from './voice-genders.json'

export const voiceKey = (name) => `voice:${name}`
export const speakerKey = (name) => `speaker:${name}`
export const TAG_LABELS = { female: 'Female', male: 'Male' }
// 'female', 'male' or null (untagged, or tagged unsure).
export const genderOf = (key) => (key && (TAGS[key] === 'female' || TAGS[key] === 'male') ? TAGS[key] : null)
// A child's voice (Dan, 2026-11-14): its own tag beside the gender, "child:speaker:<name>": true.
export const childKey = (key) => `child:${key}`
export const isChild = (key) => Boolean(key && TAGS[childKey(key)] === true)
export const allTags = () => ({ ...TAGS })
// One recording's own gender (Dan, 2026-11-15: Rdrg109's "una" is a woman's voice), "file:<path>", over its person's.
// The path includes the course's folder (/audio-es/W010.m4a), since file names repeat across courses.
export const fileKey = (file) => `file:${file}`
// The gender and child flag for a recording (its file's tag first, then its person's) or a device voice.
export function whoSpeaks({ file = null, speaker = null, voice = null } = {}) {
  const key = file ? speakerKey(speaker) : voice ? voiceKey(voice) : null
  const gender = (file && genderOf(fileKey(file))) || genderOf(key)
  return { gender, child: Boolean(gender) && isChild(key) }
}
