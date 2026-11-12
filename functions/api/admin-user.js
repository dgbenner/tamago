// Cloudflare Pages Function at /api/admin-user (accounts layer 1). The handler is in server/admin-user.mjs; the
// Supabase URL and service-role key are Pages secrets (_source/accounts-spec.md, Setup).
import { handle } from '../../server/admin-user.mjs'
export const onRequest = ({ request, env }) => handle(request, env)
