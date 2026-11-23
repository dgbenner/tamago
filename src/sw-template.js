// Offline copy (2026-11-23): the app itself (FILES, no course) is cached at install; a course's own files, its content
// chunks and recordings (COURSE_FILES), are cached once the page says that course is open (message cache-course, sent
// after the first screen is up), so a first visit no longer downloads every course at once. Anything else the page
// fetches is kept as it arrives. Once a course is cached, its lessons run with no connection.
const CACHE = 'tamago-__VERSION__'
const FILES = __FILES__
const COURSE_FILES = __COURSE_FILES__
const NAV_WAIT_MS = 1500 // how long a launch waits for the page from the network before opening the saved copy

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()))
})

// The open course's files, a few at a time so the page's own requests still get through, skipping what's cached.
self.addEventListener('message', (event) => {
  if (event.data?.type !== 'cache-course') return
  const list = COURSE_FILES[event.data.id] ?? []
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE)
    const todo = []
    for (const u of list) if (!(await cache.match(u))) todo.push(u)
    const worker = async () => { for (let u = todo.shift(); u; u = todo.shift()) await cache.add(u).catch(() => {}) }
    await Promise.all([worker(), worker(), worker(), worker()])
  })())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

// Safari asks for audio in byte ranges and rejects a plain 200, so answer those with a 206.
async function rangeResponse(request, response) {
  const match = /bytes=(\d+)-(\d*)/.exec(request.headers.get('range'))
  const blob = await response.blob()
  const start = Number(match[1])
  const end = match[2] ? Number(match[2]) + 1 : blob.size
  return new Response(blob.slice(start, end), {
    status: 206,
    headers: {
      'Content-Type': response.headers.get('Content-Type') ?? 'audio/wav',
      'Content-Range': `bytes ${start}-${end - 1}/${blob.size}`,
      'Content-Length': String(end - start),
      'Accept-Ranges': 'bytes',
    },
  })
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin) return
  // Opening the app (Dan, 2026-11-11; time limit 2026-11-23): the page comes from the network when it answers within
  // NAV_WAIT_MS, so a launch after a deploy opens the newest version straight away. On weak Wi-Fi the wait had no limit
  // (a white screen on the iPad), so past the limit, or with no connection, the saved copy opens instead. The fresh page
  // isn't saved over the old one: its files are cached together by the new worker's install.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const fresh = fetch(request, { cache: 'no-cache' })
      const saved = await caches.match('/')
      if (!saved) return fresh.catch(() => Response.error())
      const late = new Promise((resolve) => setTimeout(() => resolve(saved), NAV_WAIT_MS))
      return Promise.race([fresh.catch(() => saved), late])
    })())
    return
  }
  event.respondWith((async () => {
    const key = url.pathname
    const cached = await caches.match(key)
    if (cached) return request.headers.has('range') ? rangeResponse(request, cached) : cached
    const response = await fetch(request)
    // Kept for next time (a course's chunks the page loads before cache-course has run, for instance); a partial
    // answer to a byte range isn't, since it isn't the whole file.
    if (response.ok && response.status === 200 && !request.headers.has('range')) {
      const copy = response.clone()
      event.waitUntil(caches.open(CACHE).then((cache) => cache.put(key, copy)).catch(() => {}))
    }
    return response
  })())
})
