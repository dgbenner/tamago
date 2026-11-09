// Progress on the device (IndexedDB), using the workbook's runtime_schema table names. Reads happen once at
// startup; after that the app works from memory and writes behind, so saving never slows a question.
const STORES = {
  attempts: 'attempt_id', lessons: 'lesson_id', review_bank: 'sentence_id', hints_log: 'hint_id',
  unit_progress: 'unit_id', points: 'date', flags: 'flag_id', kv: 'key',
}
let dbPromise = null

function open() {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve) => {
    let req
    try { req = indexedDB.open('tamago', 1) } catch { return resolve(null) }
    req.onupgradeneeded = () => {
      for (const [name, keyPath] of Object.entries(STORES)) {
        if (!req.result.objectStoreNames.contains(name)) req.result.createObjectStore(name, { keyPath })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => resolve(null)
  })
  return dbPromise
}

export async function getAll(store) {
  const db = await open()
  if (!db) return []
  return new Promise((resolve) => {
    const req = db.transaction(store).objectStore(store).getAll()
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => resolve([])
  })
}

export function put(store, row) {
  open().then((db) => db?.transaction(store, 'readwrite').objectStore(store).put(row))
}
export function remove(store, key) {
  open().then((db) => db?.transaction(store, 'readwrite').objectStore(store).delete(key))
}
export const putKv = (key, value) => put('kv', { key, value })
export async function getKv(key) {
  const db = await open()
  if (!db) return undefined
  return new Promise((resolve) => {
    const req = db.transaction('kv').objectStore('kv').get(key)
    req.onsuccess = () => resolve(req.result?.value)
    req.onerror = () => resolve(undefined)
  })
}

export async function loadState() {
  const [bank, progress, points, kv] = await Promise.all(['review_bank', 'unit_progress', 'points', 'kv'].map(getAll))
  return { bank, progress, points, kv: Object.fromEntries(kv.map((r) => [r.key, r.value])) }
}

// Phase 4 backup: every store as plain JSON (Blobs, such as native-check recordings, as data URLs), and back.
const toDataUrl = (blob) => new Promise((resolve) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.readAsDataURL(blob) })
const fromDataUrl = async (url) => (await fetch(url)).blob()
async function encode(value) {
  if (value instanceof Blob) return { $blob: await toDataUrl(value) }
  if (Array.isArray(value)) return Promise.all(value.map(encode))
  if (value && typeof value === 'object') return Object.fromEntries(await Promise.all(Object.entries(value).map(async ([k, v]) => [k, await encode(v)])))
  return value
}
async function decode(value) {
  if (value && typeof value === 'object' && typeof value.$blob === 'string') return fromDataUrl(value.$blob)
  if (Array.isArray(value)) return Promise.all(value.map(decode))
  if (value && typeof value === 'object') return Object.fromEntries(await Promise.all(Object.entries(value).map(async ([k, v]) => [k, await decode(v)])))
  return value
}
export async function dumpAll() {
  const stores = Object.fromEntries(await Promise.all(Object.keys(STORES).map(async (s) => [s, await encode(await getAll(s))])))
  return { app: 'tamago', format: 1, saved_at: new Date().toISOString(), stores }
}
// Replaces everything on the device with the backup. The caller reloads the app afterwards.
export async function restoreAll(backup) {
  if (backup?.app !== 'tamago' || !backup.stores) throw new Error('This file is not a Tamago backup.')
  const db = await open()
  if (!db) throw new Error('This browser has no storage for Tamago.')
  const decoded = Object.fromEntries(await Promise.all(Object.keys(STORES).map(async (s) => [s, await decode(backup.stores[s] ?? [])])))
  await new Promise((resolve, reject) => {
    const t = db.transaction(Object.keys(STORES), 'readwrite')
    for (const s of Object.keys(STORES)) { const os = t.objectStore(s); os.clear(); for (const row of decoded[s]) os.put(row) }
    t.oncomplete = resolve
    t.onerror = () => reject(t.error)
  })
}
