// Netlify wrapper (old host, builds paused). The handler is in server/generate.mjs.
import { handle } from '../../server/generate.mjs'
export default (req) => handle(req, process.env.TAMAGO_ANTHROPIC_API_KEY)
