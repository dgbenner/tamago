// Polite, disk-cached GET for Wiktionary and Commons. Nothing is fetched twice:
// delete .cache/http to force a refresh.
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const CACHE = join(import.meta.dirname, '../../.cache/http')
const UA = 'TamagoContentCheck/0.1 (personal language-learning app)'
const SPACING_MS = 1500
const MAX_TRIES = 6
let last = 0

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export async function getJson(url) {
  mkdirSync(CACHE, { recursive: true })
  const file = join(CACHE, createHash('sha1').update(url).digest('hex') + '.json')
  if (existsSync(file)) return JSON.parse(readFileSync(file, 'utf8'))

  for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
    const wait = last + SPACING_MS - Date.now()
    if (wait > 0) await sleep(wait)
    last = Date.now()
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (res.status === 404) {
      writeFileSync(file, 'null')
      return null
    }
    if (res.ok) {
      const data = await res.json()
      writeFileSync(file, JSON.stringify(data))
      return data
    }
    if (res.status === 429 || res.status >= 500) {
      const retry = Number(res.headers.get('retry-after')) || 15 * attempt
      console.error(`  ${res.status}, waiting ${retry}s: ${url.slice(0, 80)}`)
      await sleep(retry * 1000)
      continue
    }
    throw new Error(`${res.status} from ${url}`)
  }
  throw new Error(`gave up after ${MAX_TRIES} tries: ${url}`)
}

// Downloads a file once. The destination existing is the cache.
export async function getFile(url, dest) {
  if (existsSync(dest)) return
  for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
    const wait = last + SPACING_MS - Date.now()
    if (wait > 0) await sleep(wait)
    last = Date.now()
    const res = await fetch(url, { headers: { 'User-Agent': UA } })
    if (res.ok) {
      writeFileSync(dest, Buffer.from(await res.arrayBuffer()))
      return
    }
    if (res.status === 429 || res.status >= 500) {
      await sleep((Number(res.headers.get('retry-after')) || 15 * attempt) * 1000)
      continue
    }
    throw new Error(`${res.status} from ${url}`)
  }
  throw new Error(`gave up after ${MAX_TRIES} tries: ${url}`)
}
