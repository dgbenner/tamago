// Everything the app needs is cached at install, so a lesson runs with no connection.
const CACHE = 'tamago-__VERSION__'
const FILES = __FILES__

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
  // Opening the app (Dan, 2026-11-11): with a connection, the page comes from the network every time, so a launch
  // after a deploy opens the newest version straight away; the saved copy is only for when there's no connection.
  // The fresh page isn't saved over the old one: its files are cached together by the new worker's install.
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request, { cache: 'no-cache' }).catch(async () => (await caches.match('/')) ?? Response.error()))
    return
  }
  event.respondWith((async () => {
    const key = url.pathname
    const cached = await caches.match(key)
    if (!cached) return fetch(request)
    return request.headers.has('range') ? rangeResponse(request, cached) : cached
  })())
})
