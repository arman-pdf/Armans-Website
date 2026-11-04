import React, { useState } from 'react';
import { contact } from '../content';

const field =
  'mt-2 w-full bg-transparent border-0 border-b-2 border-ink-3 px-0 py-2 text-ink placeholder:text-ink-3 focus:border-flag-ink focus:outline-none focus:ring-0';

// Posts to /api/contact (a Cloudflare Pages Function that forwards the message).
export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      e.currentTarget.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div role="status" className="py-6">
        <p className="font-display font-bold text-3xl tracking-[-0.02em]">Message received.</p>
        <p className="mt-3 text-ink-2">Thank you. I will reply to the email address you gave.</p>
        <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-sm font-medium text-flag-ink underline underline-offset-4">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form name="contact" method="POST" onSubmit={onSubmit} className="space-y-8">
      <p className="hidden">
        <label>Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </p>
      <label className="block text-sm font-medium">
        Name
        <input className={field} name="name" type="text" required autoComplete="name" />
      </label>
      <label className="block text-sm font-medium">
        Email
        <input className={field} name="email" type="email" required autoComplete="email" />
      </label>
      <label className="block text-sm font-medium">
        Message
        <textarea className={`${field} resize-y min-h-28`} name="message" rows={4} required />
      </label>
      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-flag text-deep font-semibold px-7 py-3 hover:bg-flag-ink hover:text-paper transition-colors disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        {status === 'error' && (
          <p role="alert" className="text-sm text-flag-ink">
            That didn't send. Please email{' '}
            <a className="underline underline-offset-4" href={`mailto:${contact.email}`}>{contact.email}</a> instead.
          </p>
        )}
      </div>
    </form>
  );
}
