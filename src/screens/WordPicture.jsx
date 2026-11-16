import { fillStyle, pictureFill } from '../lib/person-pictures.js'

// A word picture in its rounded frame. A picture of a person fills the frame to its bottom edge (person-pictures.js).
export default function WordPicture({ src, className = '', fit = '' }) {
  return <span className={`block overflow-hidden rounded-xl ${className}`}><img src={src} alt="" className={`size-full ${fit}`} style={fillStyle(pictureFill(src))} /></span>
}
