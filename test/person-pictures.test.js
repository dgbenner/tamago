// Pictures of people fill their circle or frame to the bottom edge (Dan, 2026-11-16; src/lib/person-pictures.js).
import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { AVATAR_FILL, fillStyle, pictureFill } from '../src/lib/person-pictures.js'

const at = (p) => new URL(`../${p}`, import.meta.url)

test('a picture of a person is scaled from its top, by a little; other pictures are left alone', () => {
  assert.equal(pictureFill('/images/pictures/femme.webp'), 1.07)
  assert.equal(pictureFill('pictures/es-profesor.webp'), 1.12)
  for (const other of ['/images/pictures/chat.webp', '/images/pictures/bebe.webp', '/images/pictures/hommes.webp', '/images/openmoji/1F34E.svg', null]) assert.equal(pictureFill(other), 1)
  assert.deepEqual(fillStyle(1.07), { transform: 'scale(1.07)', transformOrigin: '50% 0' })
  assert.equal(fillStyle(1), undefined)
  assert.ok(AVATAR_FILL > 1 && AVATAR_FILL <= 1.2)
})

test('every picture with a fill is a file the app ships, and the scale stays small', () => {
  const names = [...readFileSync(at('src/lib/person-pictures.js'), 'utf8').match(/const PICTURE_FILL = \{([\s\S]*?)\n\}/)[1].matchAll(/'?([a-z-]+)'?: ([\d.]+)/g)]
  assert.ok(names.length >= 15)
  for (const [, name, scale] of names) {
    assert.ok(existsSync(at(`public/images/pictures/${name}.webp`)), `${name}.webp is missing`)
    assert.ok(Number(scale) > 1 && Number(scale) <= 1.15, `${name}: ${scale}`)
  }
})

test('the avatar and both word-picture places use the fill', () => {
  const lesson = readFileSync(at('src/screens/Lesson.jsx'), 'utf8')
  assert.match(lesson, /style=\{fillStyle\(AVATAR_FILL\)\}/)
  assert.equal(lesson.match(/<WordPicture /g).length, 2)
  assert.match(readFileSync(at('src/screens/Conversation.jsx'), 'utf8'), /<WordPicture /)
})
