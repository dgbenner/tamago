// Cloudflare Pages Function at /api/explain. The handler is in server/explain.mjs; the key is a Pages secret.
import { handle } from '../../server/explain.mjs'
export const onRequest = ({ request, env }) => handle(request, env.TAMAGO_ANTHROPIC_API_KEY)
