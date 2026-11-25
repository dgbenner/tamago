// What the opening screen (index.html #opening, screens/Splash.jsx) knows of the app, which loads behind it and has its
// own React root: ready (a page is drawn under it), choose (ask for a language), line (where the learner is);
// and what the learner did on it: picked (a flag's course), skip (a tap elsewhere).
let state = { ready: false, choose: false, line: null, picked: null, skip: false }
const subs = new Set()
export const openingState = () => state
export const onOpening = (fn) => { subs.add(fn); return () => subs.delete(fn) }
export function tellOpening(next) {
  if (Object.keys(next).every((k) => next[k] === state[k])) return
  state = { ...state, ...next }
  for (const fn of subs) fn()
}
// A course picked on the first launch reloads into it; the black screen and the logo hold across that one reload.
export const keepOpening = () => { try { sessionStorage.setItem('tamago-picked', '1') } catch { /* private mode */ } }
