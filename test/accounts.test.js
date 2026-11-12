// Accounts layer 1 (Dan, 2026-11-11): the mock account service, which stands in for Supabase with the same
// interface. Sign-up, sign-in, sign-out, reset, profile, progress and sessions, the admin actions, and who reaches what.
import test from 'node:test'
import assert from 'node:assert/strict'
import { createMockAuth, memoryStore } from '../src/lib/auth/mock.js'
import { MOCK_PASSWORD, can } from '../src/lib/auth/config.js'

const slot = () => { let v = null; return { get: () => v, set: (x) => { v = x } } }
const fresh = () => createMockAuth({ store: memoryStore(), session: slot() })

test('demo accounts exist, and sign-in checks the password', async () => {
  const a = fresh()
  assert.equal(await a.session(), null)
  await assert.rejects(a.signIn({ email: 'admin@tamago.test', password: 'wrong-one' }), /don’t match/)
  const u = await a.signIn({ email: 'Admin@Tamago.test ', password: MOCK_PASSWORD })
  assert.equal(u.role, 'admin')
  assert.equal('password' in u, false, 'no password hash leaves the service')
  await a.signOut()
  assert.equal(await a.session(), null)
})

test('sign-up makes a learner, signed in, and refuses a taken email or a short password', async () => {
  const a = fresh()
  await assert.rejects(a.signUp({ email: 'new@example.test', password: 'short', screenName: 'New' }), /8 characters/)
  await assert.rejects(a.signUp({ email: 'learner@tamago.test', password: 'long-enough', screenName: 'X' }), /already has an account/)
  const u = await a.signUp({ email: 'new@example.test', password: 'long-enough', screenName: '  Newbie ' })
  assert.equal(u.role, 'learner')
  assert.equal(u.screen_name, 'Newbie')
  assert.equal((await a.session()).id, u.id)
})

test('forgot password, then reset with the link; the link works once', async () => {
  const a = fresh()
  const r = await a.requestPasswordReset('learner@tamago.test')
  const token = new URL(r.link, 'http://x').searchParams.get('token')
  assert.ok(token)
  assert.deepEqual(await a.requestPasswordReset('nobody@example.test'), { sent: true, link: null }, 'the same answer for an unknown email')
  await a.resetPassword({ token, password: 'brand-new-pass' })
  await assert.rejects(a.resetPassword({ token, password: 'again-again' }), /expired/)
  await assert.rejects(a.signIn({ email: 'learner@tamago.test', password: MOCK_PASSWORD }))
  assert.ok(await a.signIn({ email: 'learner@tamago.test', password: 'brand-new-pass' }))
})

test('profile: screen name and password change', async () => {
  const a = fresh()
  await a.signIn({ email: 'learner@tamago.test', password: MOCK_PASSWORD })
  assert.equal((await a.updateProfile({ screenName: 'Renamed' })).screen_name, 'Renamed')
  await assert.rejects(a.changePassword({ current: 'nope-nope', next: 'another-pass' }), /isn’t right/)
  await a.changePassword({ current: MOCK_PASSWORD, next: 'another-pass' })
  await a.signOut()
  assert.ok(await a.signIn({ email: 'learner@tamago.test', password: 'another-pass' }))
})

test('progress and sessions go to the signed-in account only', async () => {
  const a = fresh()
  assert.equal(await a.loadProgress('fr'), null)
  const me = await a.signIn({ email: 'learner@tamago.test', password: MOCK_PASSWORD })
  await a.saveProgress('fr', { app: 'tamago', stores: { lessons: [{ passed: true }] } }, { lessons_done: 1, circles_started: 1, words_met: 5 })
  await a.recordSession({ course: 'fr', kind: 'lesson', unit_id: 'U01', unit_title: 'Say Hi', round: 1, score: 9, size: 10, passed: true, finished_at: new Date().toISOString() })
  assert.equal((await a.loadProgress('fr')).snapshot.stores.lessons.length, 1)
  await a.signOut()
  await a.signIn({ email: 'admin@tamago.test', password: MOCK_PASSWORD })
  assert.equal(await a.loadProgress('fr'), null, 'another account has its own progress')
  const details = await a.admin.getUser(me.id)
  assert.equal(details.progress.find((p) => p.course === 'fr').lessons_done, 1)
  assert.equal((await a.admin.sessions(me.id))[0].unit_title, 'Say Hi')
})

test('admin: list and search, turn off and on, change role, send a reset; not for others', async () => {
  const a = fresh()
  await a.signIn({ email: 'learner@tamago.test', password: MOCK_PASSWORD })
  await assert.rejects(a.admin.listUsers(), /Admins only/)
  await a.signOut()
  const me = await a.signIn({ email: 'admin@tamago.test', password: MOCK_PASSWORD })
  const all = await a.admin.listUsers()
  assert.ok(all.length >= 12)
  assert.deepEqual((await a.admin.listUsers({ q: 'REVIEWER' })).map((u) => u.email), ['reviewer@tamago.test'])
  const learner = all.find((u) => u.email === 'learner@tamago.test')
  await a.admin.setDisabled(learner.id, true)
  await assert.rejects(a.admin.setDisabled(me.id, true), /your own/)
  await a.admin.setRole(learner.id, 'reviewer')
  await assert.rejects(a.admin.setRole(me.id, 'learner'), /your own/)
  assert.ok((await a.admin.sendPasswordReset(learner.id)).link)
  await a.signOut()
  await assert.rejects(a.signIn({ email: 'learner@tamago.test', password: MOCK_PASSWORD }), /turned off/)
  await a.signIn({ email: 'admin@tamago.test', password: MOCK_PASSWORD })
  await a.admin.setDisabled(learner.id, false)
  await a.signOut()
  assert.equal((await a.signIn({ email: 'learner@tamago.test', password: MOCK_PASSWORD })).role, 'reviewer')
})

test('who reaches what: Users for admins, Review and Contribute for their roles and admins', () => {
  const u = (role) => ({ role })
  assert.deepEqual(['learner', 'contributor', 'reviewer', 'admin'].map((r) => [can.console(u(r)), can.users(u(r)), can.review(u(r)), can.contribute(u(r))]), [
    [false, false, false, false], [true, false, false, true], [true, false, true, false], [true, true, true, true],
  ])
  assert.equal(can.console(null), false)
})
