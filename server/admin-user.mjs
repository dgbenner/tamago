// Admin actions that need Supabase's service-role key (accounts layer 1, Dan, 2026-11-11; _source/accounts-spec.md),
// so they run here, never in the browser. The caller sends their own access token; this checks it with Supabase and
// checks their profile says admin. Actions:
//   disable   { user_id, disabled }  turn an account off (a long ban) or on, mirrored in profiles.disabled
//   invite    { email, role }        Supabase emails an invite; its link opens /account/invite. Only with TAMAGO_INVITES=open
//   withdraw  { invite_id }          withdraw an invite not yet accepted (the unconfirmed user is removed)
// Answers 503 until the secrets exist (TAMAGO_SUPABASE_URL, TAMAGO_SUPABASE_SERVICE_ROLE_KEY). Not run against
// Supabase yet.
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })
const ROLES = ['learner', 'contributor', 'reviewer', 'admin']

export async function handle(request, env, origin = new URL(request.url).origin) {
  if (request.method !== 'POST') return json(405, { error: 'POST only.' })
  const url = env.TAMAGO_SUPABASE_URL
  const service = env.TAMAGO_SUPABASE_SERVICE_ROLE_KEY
  if (!url || !service) return json(503, { error: 'Accounts aren’t set up yet.' })
  const token = (request.headers.get('authorization') ?? '').replace(/^Bearer /, '')
  if (!token) return json(401, { error: 'Sign in first.' })
  const admin = { apikey: service, authorization: `Bearer ${service}`, 'content-type': 'application/json' }
  const rest = (path, init = {}) => fetch(`${url}/rest/v1/${path}`, { ...init, headers: { ...admin, ...(init.headers ?? {}) } })
  // Who is asking: their token, checked by Supabase; then their role.
  const who = await fetch(`${url}/auth/v1/user`, { headers: { apikey: service, authorization: `Bearer ${token}` } })
  if (!who.ok) return json(401, { error: 'Sign in again.' })
  const caller = await who.json()
  if ((await (await rest(`profiles?id=eq.${caller.id}&select=role`)).json())?.[0]?.role !== 'admin') return json(403, { error: 'Admins only.' })
  let body
  try { body = await request.json() } catch { return json(400, { error: 'Send JSON.' }) }
  const isId = (x) => /^[0-9a-f-]{36}$/.test(String(x))

  if (body?.action === 'disable') {
    const { user_id: userId, disabled } = body
    if (!isId(userId)) return json(400, { error: 'Which user?' })
    if (userId === caller.id) return json(400, { error: 'You can’t turn off your own account.' })
    const ban = await fetch(`${url}/auth/v1/admin/users/${userId}`, { method: 'PUT', headers: admin, body: JSON.stringify({ ban_duration: disabled ? '876000h' : 'none' }) })
    if (!ban.ok) return json(502, { error: 'Supabase didn’t accept that.' })
    await rest(`profiles?id=eq.${userId}`, { method: 'PATCH', headers: { prefer: 'return=minimal' }, body: JSON.stringify({ disabled: Boolean(disabled) }) })
    return json(200, { ok: true })
  }
  if (body?.action === 'invite') {
    if (env.TAMAGO_INVITES !== 'open') return json(403, { error: 'Invites are off until Dan approves them.' })
    const email = String(body.email ?? '').trim().toLowerCase()
    const role = ROLES.includes(body.role) ? body.role : 'learner'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json(400, { error: 'Enter an email address.' })
    const row = await rest('invites', { method: 'POST', headers: { prefer: 'return=representation' }, body: JSON.stringify({ email, role, invited_by: caller.id }) })
    if (!row.ok) return json(409, { error: 'That email already has an invite or an account.' })
    const sent = await fetch(`${url}/auth/v1/invite?redirect_to=${encodeURIComponent(`${origin}/account/invite`)}`, { method: 'POST', headers: admin, body: JSON.stringify({ email }) })
    if (!sent.ok) return json(502, { error: 'Supabase didn’t send the invite.' })
    const [inv] = await row.json()
    return json(200, { ...inv, code: inv.id, link: null })
  }
  if (body?.action === 'withdraw') {
    if (!isId(body.invite_id)) return json(400, { error: 'Which invite?' })
    const [inv] = await (await rest(`invites?id=eq.${body.invite_id}&select=email,accepted_at`)).json()
    if (!inv || inv.accepted_at) return json(400, { error: 'That invite was already accepted.' })
    const [p] = await (await rest(`profiles?email=eq.${encodeURIComponent(inv.email)}&select=id`)).json()
    if (p) await fetch(`${url}/auth/v1/admin/users/${p.id}`, { method: 'DELETE', headers: admin })
    await rest(`invites?id=eq.${body.invite_id}`, { method: 'PATCH', headers: { prefer: 'return=minimal' }, body: JSON.stringify({ revoked_at: new Date().toISOString() }) })
    return json(200, { ok: true })
  }
  return json(400, { error: 'Unknown action.' })
}
