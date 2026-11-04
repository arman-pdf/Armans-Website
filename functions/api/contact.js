// Cloudflare Pages Function: POST /api/contact
// Validates the message, then delivers it by any of these (whichever are configured):
//   RESEND_API_KEY + CONTACT_TO  -> email via Resend (optional CONTACT_FROM)
//   CONTACT_WEBHOOK_URL          -> e.g. an n8n webhook
//   CONTACT_KV                   -> backup copy so nothing is lost
// The destination is configured in the environment, never hard-coded.
const MAX_BODY = 10_000;

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function verifyTurnstile(env, token, ip) {
  if (!env.TURNSTILE_SECRET) return true;
  if (!token) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip }),
  });
  return Boolean((await res.json()).success);
}

export async function onRequestPost({ request, env }) {
  const url = new URL(request.url);
  const origin = request.headers.get('Origin');
  if (origin && origin !== url.origin) return json(403, { error: 'forbidden' });
  if (Number(request.headers.get('Content-Length') || 0) > MAX_BODY) return json(413, { error: 'too_large' });

  let body;
  try { body = JSON.parse(await request.text()); } catch { return json(400, { error: 'bad_request' }); }

  // Honeypot: real visitors never fill this. Pretend success so bots learn nothing.
  if (str(body['bot-field'], 50)) return json(200, { ok: true });

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const message = str(body.message, 4000);
  if (!name || !EMAIL_RE.test(email) || message.length < 3) return json(400, { error: 'invalid' });

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (!(await verifyTurnstile(env, request.headers.get('X-Turnstile-Token'), ip))) return json(403, { error: 'bot_check' });
  if (env.RATE_LIMITER && !(await env.RATE_LIMITER.limit({ key: `contact:${ip}` })).success) return json(429, { error: 'rate_limited' });

  const entry = { name, email, message, receivedAt: new Date().toISOString(), site: url.origin };
  let delivered = false;

  if (env.CONTACT_KV) {
    // Backup copy: nothing is lost even if the webhook is down. Kept 90 days.
    await env.CONTACT_KV.put(`msg:${entry.receivedAt}:${crypto.randomUUID()}`, JSON.stringify(entry), { expirationTtl: 7_776_000 });
    delivered = true;
  }
  if (env.CONTACT_WEBHOOK_URL) {
    try {
      const res = await fetch(env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(env.CONTACT_WEBHOOK_SECRET ? { 'X-Webhook-Secret': env.CONTACT_WEBHOOK_SECRET } : {}) },
        body: JSON.stringify(entry),
      });
      delivered = delivered || res.ok;
    } catch { /* fall through: KV copy may still have saved it */ }
  }

  if (env.RESEND_API_KEY && env.CONTACT_TO) {
    try {
      const oneLine = (v, n) => v.replace(/[\r\n\t]+/g, ' ').slice(0, n);
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>',
          to: [env.CONTACT_TO],
          reply_to: email, // hitting Reply answers the visitor directly
          subject: `Portfolio message from ${oneLine(name, 80)}`,
          text: `${message}\n\n-- \n${oneLine(name, 120)} <${email}>\nSent from ${url.origin}`,
        }),
      });
      delivered = delivered || res.ok;
    } catch { /* fall through */ }
  }

  return delivered ? json(200, { ok: true }) : json(503, { error: 'not_configured' });
}

export const onRequest = () => json(405, { error: 'method_not_allowed' });
