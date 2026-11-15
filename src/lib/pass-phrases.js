// The end-of-lesson toast (Dan, 2026-11-15): only on a pass (60% and up), the circle's name and a short phrase for the
// score's band, about six per band, picked at random. Title Case like every toast; no phrase under 60%.
export const PASS_PHRASES = {
  pass: ['Good Work', 'Nice Going', 'Keep It Up', 'Getting There', 'Solid Lesson', 'On Your Way'], // 60 to 79%
  strong: ['Great Work', 'Nicely Done', 'Well Done', 'Strong Lesson', 'Really Good', 'Excellent Work'], // 80 to 99%
  perfect: ['Perfect Score!', 'Every One Right!', 'Flawless!', 'Not a Single Slip!', 'Spot On, Every Time!', 'All Correct!'], // 100%
}
export const passBand = (share) => (share >= 1 ? 'perfect' : share >= 0.8 ? 'strong' : share >= 0.6 ? 'pass' : null)
export function passPhrase(share, rng = Math.random) {
  const band = passBand(share)
  if (!band) return null
  const list = PASS_PHRASES[band]
  return list[Math.floor(rng() * list.length)]
}
