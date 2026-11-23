// Cloudflare Worker entry. The site is deployed as a Worker with static assets:
// everything in /dist is served as-is, and only /api/* runs code here.
// The handlers in /functions keep the Pages Functions shape, so `npm run dev`
// (see vite.config.js) and this Worker run exactly the same code.
import * as chat from '../functions/api/chat.js';
import * as contact from '../functions/api/contact.js';

const routes = { '/api/chat': chat, '/api/contact': contact };

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    const mod = routes[pathname];
    if (!mod) {
      if (pathname.startsWith('/api/')) {
        return new Response('{"error":"not_found"}', { status: 404, headers: { 'Content-Type': 'application/json' } });
      }
      return env.ASSETS.fetch(request);
    }
    const handler = request.method === 'POST' && mod.onRequestPost ? mod.onRequestPost : mod.onRequest;
    return handler({ request, env, params: {}, data: {}, waitUntil: (p) => ctx.waitUntil(p) });
  },
};
