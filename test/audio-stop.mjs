// Nothing plays on into the next question (Dan, 2026-11-12, batch 4): record a long answer, play it back, finish the
// question, and check that the playback, the model, the device voice and the microphone have all stopped; then start
// a recording and move on mid-recording, and check the microphone is off. Chrome with a fake microphone (WebKit can't
// fake one). Runs in the pre-push hook after the smoke test.
//   npm run audio-stop
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { chromium } from 'playwright'

const outDir = mkdtempSync(join(tmpdir(), 'tamago-audio-stop-'))
const { build, preview } = await import('vite')
process.env.VITE_TEST_HOOK = '1'
await build({ logLevel: 'error', build: { outDir, emptyOutDir: true } })
const server = await preview({ logLevel: 'error', build: { outDir }, preview: { port: 5392, strictPort: false, open: false } })
const url = server.resolvedUrls.local[0]
const browser = await chromium.launch({ channel: 'chrome', args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'] })
let failed = null
try {
  const context = await browser.newContext({ permissions: ['microphone'], serviceWorkers: 'block', viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  page.setDefaultTimeout(10000)
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  // Every microphone stream the page opens, to check none is left live.
  await page.addInitScript(() => {
    window.__streams = []
    const get = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices)
    navigator.mediaDevices.getUserMedia = async (c) => { const s = await get(c); window.__streams.push(s); return s }
  })
  const micLive = () => page.evaluate(() => window.__streams.some((s) => s.getTracks().some((t) => t.readyState === 'live')))
  const sound = () => page.evaluate(() => ({ playing: window.__tamagoAudio.playing(), now: window.__tamagoAudio.now(), outside: window.__tamagoAudio.outside() }))
  await page.goto(url)
  await page.locator('.splash-choose button').first().click()
  await page.locator('.splash').waitFor({ state: 'detached' })
  // A speaking question: open rounds 4 and 5 of the first circle until one has Speak and Compare.
  const findSpeak = async () => {
    for (let tries = 0; tries < 12; tries++) {
      await page.evaluate((r) => window.__tamago.lesson('U01', r), 4 + (tries % 2))
      await page.locator('main.lesson').waitFor()
      for (let i = 0; i < 14; i++) {
        if (await page.getByRole('button', { name: 'Record Voice' }).count()) return
        if (!(await page.locator('main.lesson').count())) break
        await page.keyboard.press('ArrowRight'); await page.waitForTimeout(120)
      }
      if (await page.locator('main.lesson').count()) await page.getByRole('button', { name: 'Leave lesson' }).click()
    }
    throw new Error('no Speak and Compare question found')
  }

  // 1. A long recording, played back, then the question finished and the next one opened.
  await findSpeak()
  await page.getByRole('button', { name: 'Record Voice' }).click()
  await page.getByRole('button', { name: 'Stop Recording' }).waitFor()
  await page.waitForTimeout(6000) // a long answer
  await page.getByRole('button', { name: 'Stop Recording' }).click()
  await page.getByRole('button', { name: 'Yours' }).click()
  await page.waitForTimeout(400)
  const during = await sound()
  if (!during.now?.startsWith('yours:') || !during.outside) throw new Error(`the recording didn't play back: ${JSON.stringify(during)}`)
  await page.getByRole('button', { name: 'Done' }).click()
  await page.locator('section[data-outcome] .btn-primary').click()
  await page.waitForTimeout(300)
  const after = await sound()
  if (after.outside || after.now?.startsWith('yours:')) throw new Error(`the recording kept playing on the next question: ${JSON.stringify(after)}`)
  if (await micLive()) throw new Error('the microphone stayed on after the question')
  await page.getByRole('button', { name: 'Leave lesson' }).click()
  await page.waitForTimeout(300)
  const left = await sound()
  if (left.playing) throw new Error(`something still plays after leaving the lesson: ${JSON.stringify(left)}`)

  // 2. Moving on in the middle of a recording turns the microphone off.
  await findSpeak()
  await page.getByRole('button', { name: 'Record Voice' }).click()
  await page.getByRole('button', { name: 'Stop Recording' }).waitFor()
  await page.waitForTimeout(1500)
  await page.keyboard.press('ArrowRight') // Testing shortcut: moves on at once
  await page.waitForTimeout(400)
  if (await micLive()) throw new Error('a recording in progress kept the microphone on after moving on')
  if ((await sound()).outside) throw new Error('an outside sound kept playing after moving on')
  if (errors.length) throw new Error(`the page threw: ${errors.join(' | ')}`)
  console.log('ok    Chrome: a 6 s recording played back stops when the question changes; nothing plays after leaving; moving on mid-recording turns the microphone off')
} catch (e) {
  failed = e
  console.log(`FAIL  ${String(e.message ?? e).split('\n')[0]}`)
} finally {
  await browser.close()
  await new Promise((r) => server.httpServer.close(r))
  rmSync(outDir, { recursive: true, force: true })
}
if (failed) process.exit(1)
console.log('Audio stop test passed.')
