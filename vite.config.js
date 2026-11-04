import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync, readFileSync } from 'node:fs';

// Runs the Cloudflare Pages Functions in /functions inside `npm run dev`,
// so the assistant and contact form work locally without extra tools.
// Secrets for local testing go in .dev.vars (gitignored), one KEY=value per line.
function pagesFunctionsDev() {
  const loadEnv = () => {
    const env = {};
    if (existsSync('.dev.vars')) {
      for (const line of readFileSync('.dev.vars', 'utf8').split('\n')) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
        if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
      }
    }
    return env;
  };
  return {
    name: 'pages-functions-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next();
        const route = req.url.split('?')[0].replace(/^\/api\//, '').replace(/[^a-z0-9-]/gi, '');
        let mod;
        try {
          mod = await server.ssrLoadModule(`/functions/api/${route}.js`);
        } catch {
          res.statusCode = 404;
          return res.end('{"error":"not_found"}');
        }
        const chunks = [];
        for await (const c of req) chunks.push(c);
        const hasBody = !['GET', 'HEAD'].includes(req.method);
        const request = new Request(`http://${req.headers.host}${req.url}`, {
          method: req.method,
          headers: req.headers,
          body: hasBody ? Buffer.concat(chunks) : undefined,
        });
        const name = `onRequest${req.method[0]}${req.method.slice(1).toLowerCase()}`;
        const handler = mod[name] || mod.onRequest;
        const response = await handler({ request, env: loadEnv() });
        res.statusCode = response.status;
        response.headers.forEach((v, k) => res.setHeader(k, v));
        if (!response.body) return res.end();
        const reader = response.body.getReader();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
        res.end();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), pagesFunctionsDev()],
  server: {
    port: 3000,
    open: true,
  },
});
