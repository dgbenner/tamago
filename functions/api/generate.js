// Cloudflare Pages Function at /api/generate. The handler is in server/generate.mjs; the key is a Pages secret.
import { handle } from '../../server/generate.mjs'
export const onRequest = ({ request, env }) => handle(request, env.TAMAGO_ANTHROPIC_API_KEY)
