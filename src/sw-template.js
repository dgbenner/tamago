// Everything the app needs is cached at install, so a lesson runs with no connection.
const CACHE = 'tamago-__VERSION__'
const FILES = __FILES__
const NAV_WAIT_MS = 1500 // how long a launch waits for the page from the network before opening the saved copy

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()))
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
    if (!cached) return fetch(request)
    return request.headers.has('range') ? rangeResponse(request, cached) : cached
  })())
})
