import { useSyncExternalStore } from 'react'
import { nowPlaying, onPlaying } from './audio.js'

// True while the sound with this key plays (audio.js audioKey), for a speaker icon's playing state.
export const usePlaying = (key) => useSyncExternalStore(onPlaying, () => key != null && nowPlaying() === key, () => false)
