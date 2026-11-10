// Scratch: how many checked Tatoeba sentences each help circle can reach (deleted after use).
import { readFileSync } from 'node:fs'
import { at, COURSE } from './scripts/lib/course.mjs'
import { loadTatoeba } from './scripts/lib/tatoeba.mjs'
import { analyse, formIndexFor, loose, norm } from './scripts/lib/french.mjs'
const raw = (t) => JSON.parse(readFileSync(at(`content/raw/${t}.json`), 'utf8'))
const H = JSON.parse(process.env.HELP)
const words = raw('words').filter((w) => !String(w.status).startsWith('off'))
const units = raw('units').filter((u) => !['yes', 'node'].includes(u.is_topic_pick)).sort((a, b) => a.order - b.order).map((u) => u.unit_id)
const taken = new Set(raw('sentences').map((s) => loose(s.french)))
const t = loadTatoeba()
const pool = t.french.filter((s) => { const r = t.trustOf(s); return (r.native_owner || r.ok_tag) && !/\d/.test(s.text) && !taken.has(loose(s.text)) })
const names = new Set(['tom', 'maria', 'marie', 'mary', 'anna', 'ken', 'peter'])
let prevOwn = []
for (const h of H) {
  const base = words.filter((w) => units.slice(0, h.after).includes(w.first_unit) || h.borrow.includes(w.form))
  const own = h.own.filter((f) => !words.some((w) => w.form === f)).map((form, i) => ({ word_id: `${h.id}_${i}`, form }))
  const clash = h.own.filter((f) => words.some((w) => w.form === f))
  const index = formIndexFor([...base, ...prevOwn, ...own])
  const ownIds = new Set(own.map((w) => w.word_id))
  const found = []; const seen = new Set()
  for (const s of pool) {
    const a = analyse(s.text, index, { names })
    if (a.unknown || a.count < 1 || a.count > 7) continue
    if (!a.parts.some((p) => ownIds.has(p.word_id))) continue
    const k = loose(s.text); if (seen.has(k)) continue; seen.add(k)
    const en = t.englishFor(s.id); if (!en.length) continue
    found.push({ s: norm(s.text), en: en[0], f: a.parts.filter((p) => ownIds.has(p.word_id)).map((p) => own.find((w) => w.word_id === p.word_id).form) })
  }
  const per = Object.fromEntries(own.map((w) => [w.form, found.filter((x) => x.f.includes(w.form)).length]))
  console.log(`${h.id} after ${h.after}: ${found.length} | ${Object.entries(per).map(([f, n]) => `${f} ${n}`).join(', ')}${clash.length ? ` | CLASH ${clash.join(', ')}` : ''}`)
  if (process.env.SHOW === h.id) for (const x of found.slice(0, 80)) console.log('   ', x.s, '|', x.en)
  prevOwn = [...prevOwn, ...own]
}
