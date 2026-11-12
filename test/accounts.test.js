// Accounts layer 1 (Dan, 2026-11-11): the mock account service, which stands in for Supabase with the same
// interface. Sign-up, sign-in, sign-out, reset, profile, progress and sessions, the admin actions, and who reaches what.
import test from 'node:test'
import assert from 'node:assert/strict'
import { createMockAuth, memoryStore } from '../src/lib/auth/mock.js'
import { can, deviceType } from '../src/lib/auth/config.js'
import { chooseSync } from '../src/lib/auth/sync-rule.js'
import { demoPhrase } from '../src/lib/auth/mock-demo.js' // test fixture, not a secret

// Passwords here are made up for the test, built at runtime: none is real.
const DEMO = demoPhrase()
const made = (n) => `made-up-${n}-for-test`

const slot = () => { let v = null; return { get: () => v, set: (x) => { v = x } } }
const fresh = () => createMockAuth({ store: memoryStore(), session: slot() })

test('demo accounts exist, and sign-in checks the password', async () => {
  const a = fresh()
  assert.equal(await a.session(), null)
  await assert.rejects(a.signIn({ email: 'admin@tamago.test', password: made('wrong') }), /don’t match/)
  const u = await a.signIn({ email: 'Admin@Tamago.test ', password: DEMO })
  assert.equal(u.role, 'admin')
  assert.equal('password' in u, false, 'no password hash leaves the service')
  await a.signOut()
  assert.equal(await a.session(), null)
})

test('sign-up is by invite: an admin makes one, the invitee sets a screen name and password from it, once', async () => {
  const a = fresh()
  assert.equal(typeof a.signUp, 'undefined', 'no public sign-up')
  await a.signIn({ email: 'learner@tamago.test', password: DEMO })
  await assert.rejects(a.admin.createInvite({ email: 'new@example.test' }), /Admins only/)
  await a.signOut()
  await a.signIn({ email: 'admin@tamago.test', password: DEMO })
  await assert.rejects(a.admin.createInvite({ email: 'learner@tamago.test' }), /already has an account/)
  const inv = await a.admin.createInvite({ email: 'New@Example.test' })
  const code = new URL(inv.link, 'http://x').searchParams.get('code')
  assert.equal((await a.admin.listInvites())[0].email, 'new@example.test')
  await a.signOut()
  assert.equal((await a.readInvite(code)).email, 'new@example.test')
  await assert.rejects(a.acceptInvite({ code, password: 'x'.repeat(5), screenName: 'New' }), /8 characters/)
  const u = await a.acceptInvite({ code, password: made('invite'), screenName: '  Newbie ' })
  assert.deepEqual([u.role, u.screen_name, (await a.session()).id], ['learner', 'Newbie', u.id])
  await a.signOut()
  await assert.rejects(a.acceptInvite({ code, password: made('again'), screenName: 'Again' }), /already been used/)
  assert.ok(await a.signIn({ email: 'new@example.test', password: made('invite') }))
})

test('sign-ins are kept with the device type, for the console', async () => {
  const a = fresh()
  const me = await a.signIn({ email: 'learner@tamago.test', password: DEMO })
  await a.signOut()
  await a.signIn({ email: 'admin@tamago.test', password: DEMO })
  const [latest] = await a.admin.signIns(me.id) // newest first; the demo learner also has seeded ones
  assert.ok(Date.now() - Date.parse(latest.at) < 60000, 'the sign-in just made is first')
  assert.equal(typeof latest.device, 'string')
})

test('forgot password, then reset with the link; the link works once', async () => {
  const a = fresh()
  const r = await a.requestPasswordReset('learner@tamago.test')
  const token = new URL(r.link, 'http://x').searchParams.get('token')
  assert.ok(token)
  assert.deepEqual(await a.requestPasswordReset('nobody@example.test'), { sent: true, link: null }, 'the same answer for an unknown email')
  await a.resetPassword({ token, password: made('reset') })
  await assert.rejects(a.resetPassword({ token, password: made('again') }), /expired/)
  await assert.rejects(a.signIn({ email: 'learner@tamago.test', password: DEMO }))
  assert.ok(await a.signIn({ email: 'learner@tamago.test', password: made('reset') }))
})

test('profile: screen name and password change', async () => {
  const a = fresh()
  await a.signIn({ email: 'learner@tamago.test', password: DEMO })
  assert.equal((await a.updateProfile({ screenName: 'Renamed' })).screen_name, 'Renamed')
  await assert.rejects(a.changePassword({ current: made('nope'), next: made('changed') }), /isn’t right/)
  await a.changePassword({ current: DEMO, next: made('changed') })
  await a.signOut()
  assert.ok(await a.signIn({ email: 'learner@tamago.test', password: made('changed') }))
})

test('progress and sessions go to the signed-in account only', async () => {
  const a = fresh()
  assert.equal(await a.loadProgress('fr'), null)
  const me = await a.signIn({ email: 'learner@tamago.test', password: DEMO })
  await a.saveProgress('fr', { app: 'tamago', stores: { lessons: [{ passed: true }] } }, { lessons_done: 1, circles_started: 1, words_met: 5 })
  await a.recordSession({ course: 'fr', kind: 'lesson', unit_id: 'U01', unit_title: 'Say Hi', round: 1, score: 9, size: 10, passed: true, finished_at: new Date().toISOString() })
  assert.equal((await a.loadProgress('fr')).snapshot.stores.lessons.length, 1)
  await a.signOut()
  await a.signIn({ email: 'admin@tamago.test', password: DEMO })
  assert.equal(await a.loadProgress('fr'), null, 'another account has its own progress')
  const details = await a.admin.getUser(me.id)
  assert.equal(details.progress.find((p) => p.course === 'fr').lessons_done, 1)
  assert.equal((await a.admin.sessions(me.id))[0].unit_title, 'Say Hi')
})

test('admin: list and search, turn off and on, change role, send a reset; not for others', async () => {
  const a = fresh()
  await a.signIn({ email: 'learner@tamago.test', password: DEMO })
  await assert.rejects(a.admin.listUsers(), /Admins only/)
  await a.signOut()
  const me = await a.signIn({ email: 'admin@tamago.test', password: DEMO })
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
  await assert.rejects(a.signIn({ email: 'learner@tamago.test', password: DEMO }), /turned off/)
  await a.signIn({ email: 'admin@tamago.test', password: DEMO })
  await a.admin.setDisabled(learner.id, false)
  await a.signOut()
  assert.equal((await a.signIn({ email: 'learner@tamago.test', password: DEMO })).role, 'reviewer')
})

test('who reaches what: Users for admins, Review and Contribute for their roles and admins', () => {
  const u = (role) => ({ role })
  assert.deepEqual(['learner', 'contributor', 'reviewer', 'admin'].map((r) => [can.console(u(r)), can.users(u(r)), can.review(u(r)), can.contribute(u(r))]), [
    [false, false, false, false], [true, false, false, true], [true, false, true, false], [true, true, true, true],
  ])
  assert.equal(can.console(null), false)
})

test('device and account progress: upload, download, nothing to do, or ask the learner', () => {
  const L = (lessons) => ({ any: lessons > 0, lessons })
  const R = (saved_at) => ({ any: true, saved_at })
  assert.equal(chooseSync({ local: L(0), remote: null, marker: null }), 'none')
  assert.equal(chooseSync({ local: L(3), remote: null, marker: null }), 'upload', 'first sign-in: the device goes up')
  assert.equal(chooseSync({ local: L(0), remote: R('t1'), marker: null }), 'download', 'a new device takes the account')
  assert.equal(chooseSync({ local: L(12), remote: R('t1'), marker: null }), 'ask', 'both, never synced here: ask')
  assert.equal(chooseSync({ local: L(5), remote: R('t1'), marker: { saved_at: 't1', lessons: 5 } }), 'same')
  assert.equal(chooseSync({ local: L(7), remote: R('t1'), marker: { saved_at: 't1', lessons: 5 } }), 'upload', 'only the device moved on')
  assert.equal(chooseSync({ local: L(5), remote: R('t2'), marker: { saved_at: 't1', lessons: 5 } }), 'download', 'only the account moved on')
  assert.equal(chooseSync({ local: L(7), remote: R('t2'), marker: { saved_at: 't1', lessons: 5 } }), 'ask', 'both moved on: ask')
})

test('device types for the sign-in history', () => {
  assert.equal(deviceType('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)', 5), 'iPhone')
  assert.equal(deviceType('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari', 5), 'iPad')
  assert.equal(deviceType('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Firefox', 0), 'Mac')
  assert.equal(deviceType('Mozilla/5.0 (Linux; Android 14; Pixel 8) Mobile', 5), 'Android Phone')
  assert.equal(deviceType('Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 0), 'Windows PC')
})
