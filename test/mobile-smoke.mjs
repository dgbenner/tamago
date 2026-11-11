// Mobile smoke test (2026-11-11). Must pass before every push: the pre-push hook in .githooks runs it (npm run smoke).
// In WebKit, the engine of every iPhone and iPad browser, with iPhone and iPad emulation and touch, on a fresh cache:
// read the version name on the opening screen, open home, open a circle, start a lesson, answer three questions by
// tapping (a recording and a spoken sentence must each start once, within 0.2 s, on a tap and on replay), finish the lesson, tap Practice Mistakes (a tool since 2026-11-11), tap Next Lesson. It fails if a tap doesn't lead where it should, if the page throws, if the page stops answering (the
// freeze of 2026-11-10, when one audio player per recording locked Safari), or if the page makes too many players.
//
//   npm run smoke                                  builds the app and tests the build
//   npm run smoke -- https://tamago-83f.pages.dev  tests a site that is already up
//   first time on a machine: npx playwright install webkit
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import { devices, webkit } from 'playwright'
import { versionName } from '../src/lib/version.js'

// The version this checkout would deploy; a site under test must show the same name on its opening screen.
const VERSION = versionName(JSON.parse(readFileSync(new URL('../src/version.json', import.meta.url), 'utf8')).number)

const DEVICES = ['iPhone 14', 'iPad Pro 11 landscape']
const FROZEN_MS = 3000 // a page that takes longer than this to answer counts as frozen
const MAX_AUDIO_PLAYERS = 16
const TAPPED_ANSWERS = 3
const SOUND_MS = 200 // from a tap to the sound starting (Dan, 2026-11-11)
const OWN_WAIT_MS = 100 // the most the page itself may add on a fast machine

let url = process.argv[2]
let server = null
let outDir = null
if (!url) {
  const { build, preview } = await import('vite')
  outDir = mkdtempSync(join(tmpdir(), 'tamago-smoke-'))
  await build({ logLevel: 'error', build: { outDir, emptyOutDir: true } })
  server = await preview({ logLevel: 'error', build: { outDir }, preview: { port: 5391, strictPort: false, open: false } })
  url = server.resolvedUrls.local[0]
}

async function run(name) {
  const browser = await webkit.launch()
  const context = await browser.newContext({ ...devices[name], serviceWorkers: 'block' })
  const page = await context.newPage()
  page.setDefaultTimeout(8000)
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  // Watch the page's sound: the audio players it makes, and every sound it starts, timed from the last tap.
  await page.addInitScript(() => {
    const sounds = [] // { kind, ms from the last tap to the start }; kind: 'recording' (decoded, through Web Audio), 'audio element', 'voice'
    let tapped = 0
    window.__sounds = sounds
    window.__audioPlayers = 0
    document.addEventListener('touchstart', () => { tapped = performance.now() }, true)
    const heard = (kind) => sounds.push({ kind, ms: Math.round(performance.now() - tapped) })
    const Real = window.Audio
    window.Audio = function Audio(...args) {
      window.__audioPlayers++
      const el = new Real(...args)
      el.addEventListener('playing', () => heard('audio element'))
      return el
    }
    window.Audio.prototype = Real.prototype
    const start = AudioBufferSourceNode.prototype.start
    AudioBufferSourceNode.prototype.start = function (...args) { if (this.buffer?.length > 1) heard('recording'); return start.apply(this, args) }
    const speak = speechSynthesis.speak.bind(speechSynthesis)
    speechSynthesis.speak = (u) => { u.addEventListener('start', () => heard('voice')); return speak(u) }
  })
  let step = 'opening the page'
  const at = (s) => { step = s }
  // The page must answer promptly after every step.
  const alive = async () => {
    let timer
    const frozen = new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`the page froze (no answer in ${FROZEN_MS} ms)`)), FROZEN_MS) })
    try { return await Promise.race([page.evaluate(() => true), frozen]) } finally { clearTimeout(timer) }
  }
  const inLesson = () => page.locator('main.lesson').count().then(Boolean)
  // The lesson in hand, as the app saved it: the question on screen and its right answer.
  const session = (index) => page.evaluate(async (wanted) => {
    const names = (await indexedDB.databases()).map((d) => d.name).filter((n) => n?.startsWith('tamago'))
    for (let tries = 0; tries < 40; tries++) {
      for (const name of names) {
        const db = await new Promise((resolve) => { const r = indexedDB.open(name); r.onsuccess = () => resolve(r.result); r.onerror = () => resolve(null) })
        if (!db || !db.objectStoreNames.contains('kv')) { db?.close(); continue }
        const row = await new Promise((resolve) => { const r = db.transaction('kv').objectStore('kv').get('current_session'); r.onsuccess = () => resolve(r.result); r.onerror = () => resolve(null) })
        db.close()
        const s = row?.value
        if (s && (wanted == null || s.index === wanted)) return { index: s.index, length: s.queue.length, q: s.queue[s.index] }
      }
      await new Promise((r) => setTimeout(r, 100))
    }
    return null
  }, index)
  // Taps, then expects exactly one sound of that kind, started within SOUND_MS of the tap.
  const checked = { recording: false, voice: false }
  const timings = []
  const soundAfter = async (tap, kind, what) => {
    await page.waitForTimeout(350) // into the last sound, or just past it: a replay
    const before = await page.evaluate(() => window.__sounds.length)
    await tap()
    await page.waitForFunction((n) => window.__sounds.length > n, before, { timeout: 4000 }).catch(() => { throw new Error(`no sound on ${what}`) })
    await page.waitForTimeout(450) // anything said twice, or late, shows up by now
    const news = await page.evaluate((n) => window.__sounds.slice(n), before)
    if (news.length !== 1) throw new Error(`${news.length} sounds started on ${what} (stutter)`)
    if (news[0].kind !== kind) throw new Error(`${what} was played by the ${news[0].kind} path`)
    // On this machine a cancel finishes at once and a decoded recording starts at once, so anything over OWN_WAIT_MS
    // is a wait the page itself added (the fixed 150 ms of 2026-11-11 was one); SOUND_MS is the target on a device.
    if (news[0].ms > Math.min(SOUND_MS, OWN_WAIT_MS)) throw new Error(`sound started ${news[0].ms} ms after ${what} (limit ${Math.min(SOUND_MS, OWN_WAIT_MS)} ms)`)
    timings.push(news[0].ms)
  }
  const exact = (text) => new RegExp(`^\\s*${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`)
  // Answers the question on screen by tapping, where this test knows how; says whether it did.
  const tapAnswer = async (q) => {
    const lesson = page.locator('main.lesson')
    if (q.typed) return false
    if (q.type === 'QT01') {
      for (const pair of q.pairs) {
        const word = lesson.locator('.grid > div').nth(0).locator('button').filter({ hasText: exact(pair.form) })
        // A word with a recording must be heard on the first tap and again on a second tap (the replay), each time
        // once and within SOUND_MS of the tap.
        if (pair.audio?.file && !checked.recording) {
          for (const tap of ['the first tap', 'a second tap (replay)']) await soundAfter(() => word.tap(), 'recording', `${tap} of a word with a recording`)
          checked.recording = true
        } else await word.tap()
        await lesson.locator('.grid > div').nth(1).locator('button').filter({ hasText: exact(pair.hint) }).tap()
        await alive()
      }
      return true
    }
    if (q.type === 'QT02') { await lesson.locator('.grid button.choice').nth(q.choices.findIndex((c) => c.word_id === q.answer)).tap(); return true }
    if (q.type === 'QT03' || (q.type === 'QT04' && q.variant === 'V0404')) { await lesson.locator('button.choice').filter({ hasText: exact(q.answer) }).tap(); return true }
    if (q.type === 'QT04') {
      await lesson.locator('button.choice').nth(q.audioChoices.findIndex((a) => a.sentence_id === q.answer)).tap()
      await lesson.locator('[data-check]').tap()
      return true
    }
    // Say It Aloud is never graded: Done counts it.
    if (q.type === 'QT10') { await lesson.locator('[data-check]').tap(); return true }
    if (q.type === 'QT05') { await lesson.locator('button.chip').filter({ hasText: exact(q.choices.find((c) => c.toLowerCase() === q.answer)) }).tap(); return true }
    return false
  }
  // Any other question: the Testing Shortcuts swipe, right to left from the right half, as on a touch screen.
  const swipePast = () => page.evaluate(() => {
    // Desktop WebKit can't construct Touch objects, so the events carry plain points; the app reads only these.
    const fire = (type, touches, changed) => {
      const e = new Event(type, { bubbles: true })
      Object.defineProperty(e, 'touches', { value: touches })
      Object.defineProperty(e, 'changedTouches', { value: changed })
      window.dispatchEvent(e)
    }
    const from = { clientX: window.innerWidth - 30, clientY: 300 }
    const to = { clientX: window.innerWidth - 180, clientY: 300 }
    fire('touchstart', [from], [from])
    fire('touchend', [], [to])
  })
  // One question: answer it, see it marked right, tap Continue. Returns true if it was answered by tapping.
  const answerOne = async (index) => {
    const s = await session(index)
    if (!s) throw new Error('the lesson in hand was not saved')
    at(`question ${s.index + 1} of ${s.length} (${s.q.type})`)
    let tapped = await tapAnswer(s.q)
    if (tapped) {
      const outcome = await page.locator('section[data-outcome]').getAttribute('data-outcome')
      if (outcome !== 'correct') throw new Error('the right answer was marked wrong')
      if (s.q.speaking) tapped = false // not one of the three answered questions
      await alive()
      await page.getByRole('button', { name: 'Continue', exact: true }).tap()
    } else await swipePast()
    await alive()
    return { tapped, last: s.index + 1 >= s.length, next: s.index + 1 }
  }

  try {
    await page.goto(url, { waitUntil: 'load' })
    at('reading the version name on the opening screen')
    const shown = (await page.locator('.splash [data-version]').textContent()).trim()
    if (shown !== `Version ${VERSION}`) throw new Error(`the opening screen says "${shown}", this checkout is "Version ${VERSION}"`)
    const box = await page.locator('.splash [data-version]').boundingBox()
    const view = page.viewportSize()
    if (!(box.x < view.width / 4 && box.y > view.height * 0.8 && box.height >= 16)) throw new Error('the version name is not in the lower left at a readable size')

    at('picking a language on the opening screen')
    await page.locator('.splash-choose button').first().tap()
    await page.locator('.splash').waitFor({ state: 'detached' })
    await alive()

    at('opening a circle from home')
    await page.locator('button[data-state]').first().tap()
    const sheet = page.locator('[role=dialog]')
    await sheet.waitFor()
    await alive()

    at('starting the lesson from the circle')
    await sheet.locator('.btn-submit').tap()
    const startLesson = page.getByRole('button', { name: 'Start Lesson' })
    await Promise.race([startLesson.waitFor(), page.locator('main.lesson').waitFor()])
    if (await startLesson.count()) await startLesson.tap() // the grammar note comes first, once
    await page.locator('main.lesson').waitFor()
    await alive()

    let tapped = 0
    let answered = 0
    for (let index = 0, guard = 0; guard < 60; guard++) {
      const r = await answerOne(index)
      answered++
      if (r.tapped) tapped++
      if (r.last) break
      index = r.next
    }
    at('finishing the lesson')
    if (tapped < TAPPED_ANSWERS) throw new Error(`only ${tapped} of ${answered} questions could be answered by tapping`)
    // A lesson can end on a one-line screen with Continue; then home.
    const bottom = page.locator('.bottom-buttons')
    const ending = page.getByRole('button', { name: 'Continue', exact: true })
    await Promise.race([bottom.waitFor(), ending.waitFor()])
    if (!(await bottom.count())) await ending.tap()
    await bottom.waitFor()
    await alive()

    // A sentence with no recording is spoken by the device voice: Settings' Test Sound is one. It must sound once and
    // in time, on a tap and on a replay while it is still being spoken.
    at('checking the device voice (Settings, Test Sound)')
    await page.getByRole('button', { name: 'Settings' }).tap()
    const testSound = page.getByRole('button', { name: 'Test Sound' })
    for (const tap of ['a tap', 'a second tap (replay)']) await soundAfter(() => testSound.tap(), 'voice', `${tap} on a spoken sentence`)
    checked.voice = true
    await page.getByRole('button', { name: 'Back', exact: true }).first().tap()
    await bottom.waitFor()
    await alive()

    at('tapping Practice Mistakes in the tools')
    await page.locator('button:visible', { hasText: 'Practice Mistakes' }).first().tap()
    await Promise.race([page.locator('main.lesson').waitFor(), page.locator('[role=dialog]').waitFor()])
    await alive()
    if (await inLesson()) {
      await answerOne(null)
      at('leaving Practice')
      if (await inLesson()) await page.getByRole('button', { name: 'Leave lesson' }).tap()
    } else await page.locator('[role=dialog]').getByRole('button', { name: 'Close' }).tap()
    await bottom.waitFor()
    await alive()

    at('tapping Next Lesson')
    await bottom.locator('.btn-submit').tap()
    await page.locator('main.lesson').waitFor()
    await alive()
    await answerOne(null)

    at('counting audio players')
    const players = await page.evaluate(() => window.__audioPlayers)
    if (players > MAX_AUDIO_PLAYERS) throw new Error(`the page made ${players} audio players (at most ${MAX_AUDIO_PLAYERS})`)
    if (!checked.recording) throw new Error('no question had a recording to check the sound on')
    if (!checked.voice) throw new Error('no question had a spoken sentence to check the sound on')
    if (errors.length) throw new Error(`the page threw: ${errors.join(' | ')}`)
    console.log(`ok    ${name} (WebKit ${browser.version()}): Version ${VERSION}; ${answered} questions, ${tapped} by tapping; sound on tap and replay ${timings.join(', ')} ms after the tap; Practice and Next Lesson open; ${players} audio players`)
    return true
  } catch (e) {
    console.log(`FAIL  ${name} (WebKit ${browser.version()}), while ${step}: ${String(e.message ?? e).split('\n')[0]}`)
    if (errors.length) console.log(`      the page threw: ${errors.join(' | ')}`)
    return false
  } finally {
    await Promise.race([browser.close(), new Promise((r) => setTimeout(r, 3000))]) // a frozen page can't close
  }
}

let passed = true
for (const name of DEVICES) passed = (await run(name)) && passed
await new Promise((resolve) => (server ? server.httpServer.close(resolve) : resolve()))
if (outDir) rmSync(outDir, { recursive: true, force: true })
console.log(passed ? 'Mobile smoke test passed.' : 'Mobile smoke test FAILED.')
process.exit(passed ? 0 : 1)
