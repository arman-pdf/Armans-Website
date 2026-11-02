import React from 'react';

export function Details({ children, onDeep = false }) {
  return (
    <details className="group mt-4">
      <summary className="inline-flex items-center gap-2 text-sm font-medium text-flag-ink hover:underline underline-offset-4">
        <span aria-hidden className="group-open:hidden">+</span>
        <span aria-hidden className="hidden group-open:inline">–</span>
        Details
      </summary>
      <div className={`mt-3 ${onDeep ? 'text-paper/80' : 'text-ink-2'}`}>{children}</div>
    </details>
  );
}

export default function Entry({ entry }) {
  return (
    <article className="grid md:grid-cols-12 gap-x-8 gap-y-3 py-9 border-t border-rule">
      <div className="md:col-span-3 text-sm tnum">
        <p className="text-ink font-medium">{entry.period}</p>
        <p className="text-ink-3 mt-1">{entry.location}</p>
      </div>
      <div className="md:col-span-9">
        <h2 className="font-display font-bold text-2xl md:text-3xl tracking-[-0.02em] leading-tight text-balance">{entry.role}</h2>
        <p className="mt-1 text-ink-2">{entry.company}</p>
        <p className="mt-4 max-w-[68ch]">{entry.brief}</p>
        <Details>
          <p className="max-w-[68ch]">{entry.detailed}</p>
          <p className="mt-3 text-sm text-ink-3">{entry.tags.join(' · ')}</p>
        </Details>
      </div>
    </article>
  );
}
