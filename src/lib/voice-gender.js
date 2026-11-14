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
