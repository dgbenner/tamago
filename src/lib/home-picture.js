// Home as it last looked, kept per course for the next launch (Dan, 2026-11-25): index.html shows it from the first paint,
// styled by the app's own stylesheet (inlined by vite.config.js), until the app has drawn the real one. Only the top of
// the tree, which is all a launch shows.
import { course } from './course.js'

const KEY = `tamago-home:${course.id}`
const ROWS = 9
let timer = 0
export function saveHomePicture() {
  clearTimeout(timer)
  timer = setTimeout(() => {
    const home = document.querySelector('#root > main.home')
    if (!home || home.querySelector('.panel-screen, .sheet, .tree-cascade')) return
    const copy = document.createElement('div')
    copy.className = home.className
    copy.innerHTML = home.innerHTML
    for (const li of [...copy.querySelectorAll('.home-tree > li')].slice(ROWS)) li.remove()
    for (const x of copy.querySelectorAll('.toast-region, h1, .sheet-backdrop')) x.remove()
    for (const x of copy.querySelectorAll('[id]')) x.removeAttribute('id')
    try { localStorage.setItem(KEY, copy.outerHTML) } catch { /* full or private: next launch shows the course's first circles */ }
  }, 400)
}
export const forgetHomePicture = (id = course.id) => { try { localStorage.removeItem(`tamago-home:${id}`) } catch { /* private */ } }
