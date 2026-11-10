// Cloudflare Pages Function at /api/converse. The handler is in server/converse.mjs; the key is a Pages secret.
import { handle } from '../../server/converse.mjs'
export const onRequest = ({ request, env }) => handle(request, env.TAMAGO_ANTHROPIC_API_KEY)
