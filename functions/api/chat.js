// Cloudflare Pages Function: POST /api/chat
// Streams a short answer about Arman's projects. Provider order (first one configured wins):
//   1. Groq (GROQ_API_KEY)               free tier, OpenAI-compatible, fast
//   2. Workers AI binding (env.AI)       production: no API key exists anywhere
//   3. Workers AI over REST              local dev: CF_ACCOUNT_ID + CF_API_TOKEN in .dev.vars
//   4. Ollama Cloud (OLLAMA_API_KEY)     optional; needs paid credits on Ollama's side
// ASSISTANT_MOCK only answers with sample text when NO real provider is configured.
import { buildSystemPrompt } from '../_prompt.js';

const EMAIL = 'azkanorw@uwaterloo.ca';
const MAX_BODY = 24_000; // bytes
const MAX_TURNS = 10; // messages kept from history
const MAX_USER_CHARS = 500;
const MAX_ASSISTANT_CHARS = 2_000;
const OLLAMA_URL = 'https://ollama.com/api/chat';
const WORKERS_MODEL = '@cf/qwen/qwen3-30b-a3b-fp8'; // ~30 neurons per question: ~300 questions/day free
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GEN = { temperature: 0.3, max_tokens: 400 };

const json = (status, body, extra = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extra } });

function cleanMessages(input) {
  if (!Array.isArray(input) || input.length === 0) return null;
  const out = [];
  for (const m of input.slice(-MAX_TURNS)) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') return null;
    const max = m.role === 'user' ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS;
    if (m.content.length === 0 || m.content.length > max) return null;
    out.push({ role: m.role, content: m.content });
  }
  return out.at(-1).role === 'user' ? out : null;
}

async function verifyTurnstile(env, token, ip) {
  if (!env.TURNSTILE_SECRET) return true; // not configured (local dev)
  if (!token) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip }),
  });
  return Boolean((await res.json()).success);
}

// Best-effort global daily cap using KV when bound; protects the free model quota.
async function underDailyCap(env) {
  if (!env.CHAT_KV) return true;
  const key = `day:${new Date().toISOString().slice(0, 10)}`;
  const cap = Number(env.DAILY_CAP) || 300;
  const used = Number(await env.CHAT_KV.get(key)) || 0;
  if (used >= cap) return false;
  await env.CHAT_KV.put(key, String(used + 1), { expirationTtl: 172_800 });
  return true;
}

// Ollama streams newline-delimited JSON; forward only the visible text.
function ndjsonToText(upstream) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';
  return new ReadableStream({
    async start(controller) {
      const reader = upstream.getReader();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nl;
          while ((nl = buffer.indexOf('\n')) >= 0) {
            const line = buffer.slice(0, nl).trim();
            buffer = buffer.slice(nl + 1);
            if (!line) continue;
            try {
              const piece = JSON.parse(line)?.message?.content;
              if (piece) controller.enqueue(encoder.encode(piece));
            } catch { /* skip a malformed line */ }
          }
        }
      } finally {
        controller.close();
      }
    },
  });
}

// Workers AI streams server-sent events: `data: {"response":"..."}` (or OpenAI-style deltas).
// Forward only the visible text; ignore reasoning fields and the [DONE] marker.
function sseToText(upstream) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';
  const pull = (line, controller) => {
    if (!line.startsWith('data:')) return;
    const data = line.slice(5).trim();
    if (!data || data === '[DONE]') return;
    try {
      const o = JSON.parse(data);
      const piece = o.response ?? o.choices?.[0]?.delta?.content ?? o.choices?.[0]?.text;
      if (typeof piece === 'string' && piece) controller.enqueue(encoder.encode(piece));
    } catch { /* skip a malformed line */ }
  };
  return new ReadableStream({
    async start(controller) {
      const reader = upstream.getReader();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nl;
          while ((nl = buffer.indexOf('\n')) >= 0) {
            pull(buffer.slice(0, nl).trim(), controller);
            buffer = buffer.slice(nl + 1);
          }
        }
        pull(buffer.trim(), controller);
      } finally {
        controller.close();
      }
    },
  });
}

const quotaHit = (e) => /4006|429|neurons|rate.?limit|quota/i.test(String(e?.message ?? e));

const MOCK = "This is a local test answer. Arman's Ore Chimney report (see /projects/ore-chimney-ni-43-101) was a group project with Celina Cayabyab, Michael Forte and Kiara Harmon. It validated 164 core assays and estimated an indicated resource of about 646 oz of gold.";

export async function onRequestPost({ request, env }) {
  const url = new URL(request.url);
  const origin = request.headers.get('Origin');
  if (origin && origin !== url.origin) return json(403, { error: 'forbidden' });

  const len = Number(request.headers.get('Content-Length') || 0);
  if (len > MAX_BODY) return json(413, { error: 'too_large' });

  let body;
  try { body = JSON.parse(await request.text()); } catch { return json(400, { error: 'bad_request' }); }
  const messages = cleanMessages(body?.messages);
  if (!messages) return json(400, { error: 'bad_request' });

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (!(await verifyTurnstile(env, request.headers.get('X-Turnstile-Token'), ip))) return json(403, { error: 'bot_check' });
  if (env.RATE_LIMITER && !(await env.RATE_LIMITER.limit({ key: `chat:${ip}` })).success) return json(429, { error: 'rate_limited' });
  if (!(await underDailyCap(env))) return json(503, { error: 'daily_cap' });

  const stream = { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } };

  const hasProvider = env.GROQ_API_KEY || env.AI || (env.CF_ACCOUNT_ID && env.CF_API_TOKEN) || env.OLLAMA_API_KEY;
  if (env.ASSISTANT_MOCK && !hasProvider) return new Response(MOCK, stream);
  const system = { role: 'system', content: buildSystemPrompt(EMAIL, messages.filter((m) => m.role === 'user').map((m) => m.content)) };
  const model = env.WORKERS_MODEL || WORKERS_MODEL;

  // 1: Groq (OpenAI-compatible streaming)
  if (env.GROQ_API_KEY) {
    try {
      const res = await fetch(GROQ_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: env.GROQ_MODEL || 'openai/gpt-oss-120b',
          stream: true,
          messages: [system, ...messages],
          temperature: GEN.temperature,
          max_completion_tokens: 500, // Groq reserves prompt + this many tokens per request against its per-minute cap
          reasoning_effort: 'low',
          include_reasoning: false,
        }),
      });
      if (res.status === 429 || res.status === 402) {
        // Per-minute caps clear in seconds ('busy'); per-day caps do not ('quota').
        const msg = JSON.stringify(await res.json().catch(() => ({}))).toLowerCase();
        return json(503, { error: /per day|tpd|rpd|daily/.test(msg) ? 'quota' : 'busy' });
      }
      if (!res.ok || !res.body) return json(503, { error: 'unavailable' });
      return new Response(sseToText(res.body), stream);
    } catch {
      return json(503, { error: 'unavailable' });
    }
  }

  // 2 + 3: Workers AI (binding in production, REST for local testing)
  if (env.AI || (env.CF_ACCOUNT_ID && env.CF_API_TOKEN)) {
    try {
      let body;
      if (env.AI) {
        body = await env.AI.run(model, { messages: [system, ...messages], stream: true, ...GEN });
      } else {
        const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/ai/run/${model}`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${env.CF_API_TOKEN}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [system, ...messages], stream: true, ...GEN }),
        });
        if (res.status === 429) return json(503, { error: 'quota' });
        if (!res.ok || !res.body) return json(503, { error: 'unavailable' });
        body = res.body;
      }
      return new Response(sseToText(body), stream);
    } catch (e) {
      return json(503, { error: quotaHit(e) ? 'quota' : 'unavailable' });
    }
  }

  // 4: Ollama Cloud
  if (!env.OLLAMA_API_KEY) return json(503, { error: 'not_configured' });
  let upstream;
  try {
    upstream = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.OLLAMA_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: env.OLLAMA_MODEL || 'gpt-oss:120b',
        stream: true,
        messages: [system, ...messages],
        options: { temperature: GEN.temperature, num_predict: GEN.max_tokens },
      }),
    });
  } catch {
    return json(503, { error: 'unavailable' });
  }
  if (upstream.status === 429 || upstream.status === 402) return json(503, { error: 'quota' });
  if (!upstream.ok || !upstream.body) return json(503, { error: 'unavailable' });

  return new Response(ndjsonToText(upstream.body), stream);
}

export const onRequest = () => json(405, { error: 'method_not_allowed' }, { Allow: 'POST' });
