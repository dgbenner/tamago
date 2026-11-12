// Turning an account off or on (accounts layer 1, Dan, 2026-11-11; _source/accounts-spec.md). Needs Supabase's
// service-role key, so it runs here, never in the browser. The caller sends their own access token; this checks it
// with Supabase, checks their profile says admin, then bans or unbans the user and mirrors it in profiles.disabled.
// Answers 503 until the secrets exist (TAMAGO_SUPABASE_URL, TAMAGO_SUPABASE_SERVICE_ROLE_KEY). Not run yet.
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

export async function handle(request, env) {
  if (request.method !== 'POST') return json(405, { error: 'POST only.' })
  const url = env.TAMAGO_SUPABASE_URL
  const service = env.TAMAGO_SUPABASE_SERVICE_ROLE_KEY
  if (!url || !service) return json(503, { error: 'Accounts aren’t set up yet.' })
  const token = (request.headers.get('authorization') ?? '').replace(/^Bearer /, '')
  if (!token) return json(401, { error: 'Sign in first.' })
  const admin = { apikey: service, authorization: `Bearer ${service}`, 'content-type': 'application/json' }
  // Who is asking: their token, checked by Supabase.
  const who = await fetch(`${url}/auth/v1/user`, { headers: { apikey: service, authorization: `Bearer ${token}` } })
  if (!who.ok) return json(401, { error: 'Sign in again.' })
  const caller = await who.json()
  const prof = await fetch(`${url}/rest/v1/profiles?id=eq.${caller.id}&select=role`, { headers: admin })
  if ((await prof.json())?.[0]?.role !== 'admin') return json(403, { error: 'Admins only.' })
  let body
  try { body = await request.json() } catch { return json(400, { error: 'Send JSON.' }) }
  const { user_id: userId, disabled } = body ?? {}
  if (!/^[0-9a-f-]{36}$/.test(String(userId))) return json(400, { error: 'Which user?' })
  if (userId === caller.id) return json(400, { error: 'You can’t turn off your own account.' })
  // A long ban turns the account off; "none" lifts it. The profile flag is what the console shows.
  const ban = await fetch(`${url}/auth/v1/admin/users/${userId}`, { method: 'PUT', headers: admin, body: JSON.stringify({ ban_duration: disabled ? '876000h' : 'none' }) })
  if (!ban.ok) return json(502, { error: 'Supabase didn’t accept that.' })
  await fetch(`${url}/rest/v1/profiles?id=eq.${userId}`, { method: 'PATCH', headers: { ...admin, prefer: 'return=minimal' }, body: JSON.stringify({ disabled: Boolean(disabled) }) })
  return json(200, { ok: true })
}
