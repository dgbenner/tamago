// Netlify wrapper (old host, builds paused). The handler is in server/explain.mjs.
import { handle } from '../../server/explain.mjs'
export default (req) => handle(req, process.env.TAMAGO_ANTHROPIC_API_KEY)
