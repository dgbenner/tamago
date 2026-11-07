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

export async function loadState() {
  const [bank, progress, points, kv] = await Promise.all(['review_bank', 'unit_progress', 'points', 'kv'].map(getAll))
  return { bank, progress, points, kv: Object.fromEntries(kv.map((r) => [r.key, r.value])) }
}
