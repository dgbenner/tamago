// Downloads the Tatoeba exports once into .cache/tatoeba and loads what the check needs.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const DIR = join(import.meta.dirname, '../../.cache/tatoeba')
const BASE = 'https://downloads.tatoeba.org/exports'

function ensure(file, remote, unpack) {
  if (existsSync(join(DIR, file))) return
  mkdirSync(DIR, { recursive: true })
  const archive = remote.split('/').pop()
  console.log(`  downloading ${archive}`)
  execFileSync('curl', ['-sSf', '-o', archive, `${BASE}/${remote}`], { cwd: DIR })
  execFileSync(...unpack(archive), { cwd: DIR })
}
const bunzip = (a) => ['bunzip2', ['-kf', a]]
const untar = (a) => ['tar', ['-xjf', a]]

const rows = (file) => readFileSync(join(DIR, file), 'utf8').split('\n').filter(Boolean).map((l) => l.split('\t'))

export function loadTatoeba() {
  ensure('fra_sentences_detailed.tsv', 'per_language/fra/fra_sentences_detailed.tsv.bz2', bunzip)
  ensure('eng_sentences.tsv', 'per_language/eng/eng_sentences.tsv.bz2', bunzip)
  ensure('fra-eng_links.tsv', 'per_language/fra/fra-eng_links.tsv.bz2', bunzip)
  ensure('tags.csv', 'tags.tar.bz2', untar)
  ensure('user_languages.csv', 'user_languages.tar.bz2', untar)

  const french = rows('fra_sentences_detailed.tsv').map(([id, , text, owner]) => ({ id, text, owner }))
  const links = new Map()
  for (const [fr, en] of rows('fra-eng_links.tsv')) {
    if (!links.has(fr)) links.set(fr, [])
    links.get(fr).push(en)
  }
  const english = new Map()
  for (const [id, , text] of rows('eng_sentences.tsv')) english.set(id, text)
  const natives = new Set(rows('user_languages.csv').filter((r) => r[0] === 'fra' && r[1] === '5').map((r) => r[2]))
  const okTagged = new Set(rows('tags.csv').filter((r) => r[1] === 'OK').map((r) => r[0]))

  return {
    french,
    englishFor: (id) => (links.get(id) ?? []).map((e) => english.get(e)).filter(Boolean),
    // Tatoeba has no "checked" field. These are the two signals it does publish.
    trustOf: (s) => ({ native_owner: natives.has(s.owner), ok_tag: okTagged.has(s.id) }),
  }
}
