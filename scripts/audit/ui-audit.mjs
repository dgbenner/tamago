// Playthrough audit, browser pass (Dan, 2026-11-12): WebKit, desktop and iPhone emulation, every circle and round of
// every course, one lesson answered right and again answered wrong. Builds the app with the test hook, reads each
// question from the saved session (IndexedDB), answers it through the screen, and flags crashes, blank or stuck
// questions, wrong verdicts, a missing translation or the learner's own answer in the bar, choices that look alike,
// text cut off, off screen or overlapping, and a heard question where no sound starts (speech, a recording or an audio
// element, watched as the page starts them). Screenshots go to ~/Desktop/tamago-playthrough-screens; JSON to the path
// given.   node scripts/audit/ui-audit.mjs out.json [course] [maxCircles]
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { join } from 'node:path'
import { devices, webkit } from 'playwright'
import { COURSES, tablesOf, treeOrder } from './walk.mjs'

const [outFile = 'ui-issues.json', only, maxCircles] = process.argv.slice(2)
const SHOTS = `${homedir()}/Desktop/tamago-playthrough-screens`
mkdirSync(SHOTS, { recursive: true })
const fold = (t) => String(t ?? '').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[’ʼ]/g, "'").replace(/[^\p{L}\p{N}' ]/gu, ' ').replace(/\s+/g, ' ').trim()
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const outDir = mkdtempSync(join(tmpdir(), 'tamago-ui-audit-'))
process.env.VITE_TEST_HOOK = '1'
const { build, preview } = await import('vite')
await build({ logLevel: 'error', build: { outDir, emptyOutDir: true } })
const server = await preview({ logLevel: 'error', build: { outDir }, preview: { port: 5394, strictPort: false, open: false } })
const url = server.resolvedUrls.local[0]

const issues = [], counts = {}, shotKeys = new Set()
const browser = await webkit.launch()
async function worker([course, dir, cid], device) {
  const db = { fr: 'tamago', es: 'tamago-es', de: 'tamago-de' }[cid]
  const ctx = await browser.newContext(device === 'iPhone' ? { ...devices['iPhone 14'], serviceWorkers: 'block' } : { viewport: { width: 1280, height: 800 }, serviceWorkers: 'block' })
  await ctx.addInitScript((id) => {
    localStorage.setItem('tamago-course', id)
    window.__sound = 0 // every sound the page starts: speech, a decoded recording, an audio element
    const speak = speechSynthesis.speak.bind(speechSynthesis)
    speechSynthesis.speak = (u) => { window.__sound++; return speak(u) }
    const start = AudioBufferSourceNode.prototype.start
    AudioBufferSourceNode.prototype.start = function (...a) { if (this.buffer?.length > 1) window.__sound++; return start.apply(this, a) }
    const play = HTMLMediaElement.prototype.play
    HTMLMediaElement.prototype.play = function (...a) { window.__sound++; return play.apply(this, a) }
  }, cid)
  const page = await ctx.newPage()
  page.setDefaultTimeout(5000)
  let errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(url)
  await page.waitForFunction(() => window.__tamago, null, { timeout: 30000 })
  await page.locator('.splash').click({ timeout: 3000 }).catch(() => {})
  await page.locator('.splash').waitFor({ state: 'detached', timeout: 15000 }).catch(() => {})
  const c = counts[`${course}|${device}`] = { questions: 0, lessons: 0, byType: {} }
  const flag = async (w, q, issue, severity, shot = true) => {
    let file = ''
    const key = `${course}|${device}|${q?.type}|${issue.replace(/"[^"]*"/g, '"…"').slice(0, 60)}|${w.circle}`
    if (shot && !shotKeys.has(key) && shotKeys.size < 400) {
      shotKeys.add(key)
      file = `${cid}-${device.toLowerCase()}-${w.unit}-r${w.round}-${w.pass}-q${w.qi + 1}-${q?.type ?? 'lesson'}.png`
      await page.screenshot({ path: `${SHOTS}/${file}` }).catch(() => { file = '' })
    }
    issues.push({ course, device, circle: w.circle, round: w.round, lesson: `1 (${w.pass === 'right' ? 'answered right' : 'answered wrong'})`, question: w.qi + 1, type: q?.type ?? '-', issue, severity, screenshot: file })
  }
  const session = () => page.evaluate((name) => new Promise((res) => {
    const r = indexedDB.open(name); r.onsuccess = () => { const g = r.result.transaction('kv').objectStore('kv').get('current_session'); g.onsuccess = () => res(g.result?.value ?? null); g.onerror = () => res(null) }; r.onerror = () => res(null)
  }), db)
  const layout = () => page.evaluate(() => {
    const out = [], vw = window.innerWidth
    if (document.documentElement.scrollWidth > vw + 1) out.push(`the page scrolls sideways (${document.documentElement.scrollWidth}px in ${vw}px)`)
    for (const el of document.querySelectorAll('main.lesson h1, main.lesson p, main.lesson button, main.lesson input, section[data-outcome] p, section[data-outcome] button')) {
      if (el.closest('.sr-only')) continue
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue
      if (r.right > vw + 1 || r.left < -1) out.push(`"${(el.textContent || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 40)}" runs off the screen`)
      const cs = getComputedStyle(el)
      if ((cs.overflow === 'hidden' || cs.textOverflow === 'ellipsis' || el.tagName === 'BUTTON') && el.scrollWidth > el.clientWidth + 2 && el.tagName !== 'INPUT') out.push(`"${el.textContent.trim().slice(0, 40)}" is cut off`)
    }
    const boxes = [...document.querySelectorAll('main.lesson button.choice, main.lesson button.chip')].map((b) => ({ t: b.textContent.trim(), r: b.getBoundingClientRect() })).filter((b) => b.r.width)
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i].r, b = boxes[j].r
      if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 3 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 3) out.push(`"${boxes[i].t.slice(0, 20)}" overlaps "${boxes[j].t.slice(0, 20)}"`)
    }
    const texts = [...document.querySelectorAll('main.lesson button.choice:not([lang="en"]):not([lang]), main.lesson .flex-col > button.choice')].map((b) => b.textContent.trim()).filter(Boolean)
    const norm = texts.map((x) => x.toLowerCase().replace(/[.!?¡¿,]/g, '').trim())
    if (new Set(norm).size !== norm.length) out.push(`choices look the same on screen: ${JSON.stringify(texts)}`)
    return [...new Set(out)]
  })
  const nth = (sel, i) => page.locator(sel).nth(i)
  async function answer(q, right) {
    const t = q.type
    if (t === 'QT01') {
      const F = (f) => page.locator('main.lesson button[lang]:not([lang="en"])').filter({ hasText: new RegExp(`^${esc(f)}$`) }).first()
      const E = (h) => page.locator('main.lesson button[lang="en"]').filter({ hasText: new RegExp(`^${esc(h)}$`) }).first()
      if (!right) { await F(q.pairs[0].form).click(); await E(q.pairs[1].hint).click(); await page.waitForTimeout(350) }
      for (const p of q.pairs) if (await F(p.form).isEnabled().catch(() => false)) { await F(p.form).click(); await E(p.hint).click() }
      return 'pairs'
    }
    if (t === 'QT02') { const i = q.choices.findIndex((x) => x.word_id === q.answer); await nth('main.lesson .grid button', right ? i : (i + 1) % q.choices.length).click(); return }
    if (t === 'QT03' || (t === 'QT04' && q.variant === 'V0404')) { const i = q.choices.indexOf(q.answer); await nth('main.lesson button.choice', right ? i : (i + 1) % q.choices.length).click(); return }
    if (t === 'QT04') { const i = q.audioChoices.findIndex((a) => a.sentence_id === q.answer); await nth('main.lesson button.choice', right ? i : (i + 1) % q.audioChoices.length).click(); await page.locator('[data-check]').click(); return }
    if (t === 'QT05') { const i = q.choices.findIndex((x) => x.toLowerCase() === q.answer); await nth('main.lesson button.chip', right ? i : (i + 1) % q.choices.length).click(); return }
    if (t === 'QT10' || t === 'QT13' || t === 'QT16') {
      if (t === 'QT16') await page.locator('main.lesson textarea').fill('je suis ici avec toi')
      const rec = page.getByRole('button', { name: 'Record Voice' })
      if (await rec.count()) { await rec.click(); await page.waitForTimeout(300); const stop = page.getByRole('button', { name: 'Stop Recording' }); if (await stop.count()) { await page.waitForTimeout(400); await stop.click(); await page.waitForTimeout(300) } }
      await page.locator('[data-check]').click(); return
    }
    if (t === 'QT17') { await page.locator('main.lesson input').fill(right ? String(q.answer) : '999999'); await page.locator('[data-check]').click(); return }
    if (t === 'QT14' || t === 'QT15') { await page.keyboard.press('ArrowRight'); return 'skipped' }
    const kb = page.getByRole('button', { name: 'Use the keyboard' })
    if (await kb.count()) await kb.click()
    await page.locator('main.lesson input').first().fill(right ? (q.accepted?.[0] ?? q.form) : 'zzz qqq')
    await page.locator('[data-check]').click()
  }
  const units = treeOrder(tablesOf(dir))
  // PART=2 runs one part's circles only (2026-11-14).
  const inPart = units.filter((u) => !process.env.PART || Number(u.part || 1) === Number(process.env.PART))
  for (const u of maxCircles ? inPart.slice(0, Number(maxCircles)) : inPart) {
    for (let r = 1; r <= 5; r++) for (const pass of ['right', 'wrong']) {
      const w = { circle: u.title, unit: u.unit_id, round: r, pass, qi: -1 }
      errors = []
      let mark = await page.evaluate(() => window.__sound) // sounds started before this question opened
      await page.evaluate(([id, rr]) => window.__tamago.lesson(id, rr), [u.unit_id, r])
      try { await page.locator('main.lesson').waitFor({ timeout: 4000 }) } catch { await flag(w, null, 'the lesson did not open (blank screen)', 'critical'); continue }
      c.lessons++
      const answered = new Set()
      for (let step = 0; step < 30; step++) {
        if (!(await page.locator('main.lesson').count())) break
        const s = await session(); const q = s?.queue[s.index]
        if (!q) break
        w.qi = s.index
        const firstTime = !answered.has(q.qid); answered.add(q.qid)
        c.questions++; c.byType[q.type] = (c.byType[q.type] ?? 0) + 1
        if (!(await page.locator('main.lesson h1').first().textContent().catch(() => '')).trim()) await flag(w, q, 'blank question: no heading', 'critical')
        if (firstTime) for (const msg of await layout()) await flag(w, q, msg, /overlap|cut off|off the screen|sideways/.test(msg) ? 'medium' : 'high')
        if (firstTime && ['QT04', 'QT07', 'QT11'].includes(q.type)) {
          // The question plays on load; give it a moment, then ask whether the page started any sound since it opened.
          const started = await page.waitForFunction((n) => window.__sound > n, mark, { timeout: 800 }).then(() => true).catch(() => false)
          if (!started) await flag(w, q, `no sound started on load (${q.audio?.file ? 'recording ' + q.audio.file : 'device voice'})`, 'medium', false)
        }
        // Taken before answering: a skipped question (QT14, QT15) moves on at once, and the next one's sound can start
        // before a mark taken afterwards (2026-11-14: three false 'no sound' flags after Read and Answer).
        const before = await page.evaluate(() => window.__sound)
        const how = await answer(q, pass === 'right').catch((e) => `failed: ${e.message.split('\n')[0]}`)
        if (how?.startsWith?.('failed')) { if (q.type !== 'QT01') await flag(w, q, `could not answer: ${how}`, 'high'); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(150); continue }
        if (how === 'skipped') { mark = before; await page.waitForTimeout(200); continue }
        const bar = page.locator('section[data-outcome]')
        try { await bar.waitFor({ timeout: 4000 }) } catch { await flag(w, q, 'stuck: no answer bar after answering', 'critical'); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(200); continue }
        const text = (await bar.innerText()).split('\n').map((x) => x.trim()).filter((x) => x && x !== 'Continue')
        const ungraded = q.speaking || q.ungraded
        const expected = ungraded ? 'Done.' : pass === 'right' ? 'Right!' : 'Incorrect'
        // A wrong tap on a word met for the first time isn't a miss (by design), so Match Pairs is only checked when right.
        if (text[0] !== expected && !(q.type === 'QT01' && pass === 'wrong')) await flag(w, q, `${pass === 'right' ? 'a correct answer' : 'a wrong answer'} got "${text[0]}"`, 'critical')
        if (q.sentence_id && !ungraded) {
          const body = text.slice(1).map(fold)
          const has = (x) => x && body.some((b) => b === fold(x))
          if (!has(q.english) && !has(q.french) && !(q.answers ?? []).some((a) => has(a.english))) await flag(w, q, `answer bar has no translation (shows ${JSON.stringify(text.slice(1))})`, 'high')
          const own = pass === 'right' ? (q.type === 'QT03' || q.type === 'QT04' ? (q.variant === 'V0404' || q.type === 'QT03' ? q.answer : null) : q.accepted?.[0]) : null
          if (own && has(own)) await flag(w, q, `answer bar repeats the learner's own answer "${own}"`, 'medium')
        }
        if (firstTime && pass === 'wrong') for (const msg of await layout()) if (!/choices look/.test(msg)) await flag(w, q, `with the answer bar: ${msg}`, 'medium')
        if (errors.length) { await flag(w, q, `page error: ${errors.join(' | ').slice(0, 200)}`, 'critical'); errors = [] }
        mark = await page.evaluate(() => window.__sound)
        await bar.locator('.btn-primary').click()
        await bar.waitFor({ state: 'detached', timeout: 3000 }).catch(async () => { await flag(w, q, 'stuck: Continue did not move on', 'critical') })
      }
      if (errors.length) await flag(w, null, `page error: ${errors.join(' | ').slice(0, 200)}`, 'critical')
      if (await page.locator('main.lesson').count()) await page.getByRole('button', { name: 'Leave lesson' }).click().catch(() => {})
      await page.waitForTimeout(100)
    }
    process.stdout.write(`${course}/${device} ${u.unit_id} done (${c.questions} q)\n`)
  }
  await ctx.close()
}
const t0 = Date.now()
const list = COURSES.filter((x) => !only || x[2] === only)
await Promise.all(list.flatMap((co) => ['Desktop', 'iPhone'].map((d) => worker(co, d).catch((e) => issues.push({ course: co[0], device: d, circle: '-', round: '-', lesson: '-', question: '-', type: '-', issue: `worker stopped: ${e.message.split('\n')[0]}`, severity: 'critical', screenshot: '' })))))
await browser.close()
await new Promise((r) => server.httpServer.close(r))
rmSync(outDir, { recursive: true, force: true })
writeFileSync(outFile, JSON.stringify({ counts, issues, minutes: (Date.now() - t0) / 60000 }, null, 1))
console.log('minutes', ((Date.now() - t0) / 60000).toFixed(1))
const by = {}
for (const i of issues) { const k = `${i.course} ${i.device} | ${i.type} | ${i.issue.replace(/"[^"]*"/g, '"…"').replace(/\(.*\)/, '').slice(0, 70)}`; by[k] = (by[k] ?? 0) + 1 }
console.log(Object.entries(by).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${v}\t${k}`).join('\n') || 'no issues')
