// Pictures of people meet the bottom edge of their circle or frame (Dan, 2026-11-16). The artwork leaves a margin
// and a soft shadow under the bust, which showed as a small gap. The picture is scaled up from its top centre, so
// the top stays where it was and the bust runs out through the bottom edge, which the circle or frame clips.
// Speaker avatars (public/images/speakers) all take one scale: their busts end 184 to 191 px down a 192 px square.
export const AVATAR_FILL = 1.12
// Word pictures of people (public/images/pictures, 384 px): only the ones cut off at the chest or waist, each by
// what its own margin needs (384 over the row where the solid artwork ends, plus 0.03 to clear the shadow).
// Whole figures (bebe, es-estudiante) and pictures already at the edge (garcons, hommes) are left alone.
const PICTURE_FILL = {
  ami: 1.08, amie: 1.07, enfant: 1.07, enfants: 1.14, famille: 1.08, femme: 1.07, femmes: 1.09, fille: 1.11, filles: 1.14,
  garcon: 1.07, homme: 1.06, malade: 1.09, medecin: 1.04, medecins: 1.07, 'es-profesor': 1.12, 'es-profesora': 1.09,
  chanteur: 1.08, fievre: 1.1,
}
// The scale for a picture's address or file ("/images/pictures/femme.webp", "pictures/femme.webp"); 1 for the rest.
export const pictureFill = (src) => PICTURE_FILL[String(src ?? '').match(/pictures\/([^/.]+)\.webp$/)?.[1]] ?? 1
export const fillStyle = (scale) => (scale > 1 ? { transform: `scale(${scale})`, transformOrigin: '50% 0' } : undefined)
