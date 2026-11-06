// Calls /api/chat and reports the answer as it streams in.
export class AskError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

export async function ask(messages, { signal, onText }) {
  let res;
  try {
    res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal,
    });
  } catch (e) {
    if (e.name === 'AbortError') throw e;
    throw new AskError('network');
  }
  if (!res.ok) {
    let code = 'unavailable';
    try { code = (await res.json()).error || code; } catch { /* keep default */ }
    throw new AskError(code);
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let text = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
    onText(text);
  }
  text += decoder.decode();
  onText(text);
  if (!text.trim()) throw new AskError('unavailable');
  return text;
}
