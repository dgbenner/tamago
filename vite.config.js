import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]))

// Writes dist/sw.js with every built file precached, named by a hash of their contents.
function serviceWorker() {
  return {
    name: 'tamago-service-worker',
    apply: 'build',
    closeBundle() {
      const files = walk('dist').filter((f) => !f.endsWith('sw.js') && !/[\\/]_(headers|redirects)$/.test(f)) // host config files are never served
      const hash = createHash('sha1')
      for (const f of files) hash.update(readFileSync(f))
      const urls = files.map((f) => `/${relative('dist', f)}`)
      const source = readFileSync('src/sw-template.js', 'utf8')
        .replace('__VERSION__', hash.digest('hex').slice(0, 12))
        .replace('__FILES__', JSON.stringify(urls))
      writeFileSync('dist/sw.js', source)
    },
  }
}

export default defineConfig({ plugins: [react(), tailwindcss(), serviceWorker()] })
