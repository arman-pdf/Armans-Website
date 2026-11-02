import React from 'react';

export default function Entry({ entry }) {
  return (
    <article className="grid md:grid-cols-[190px_1fr] gap-x-8 gap-y-2 border-t border-rule first:border-t-0 pt-8 mt-8 first:pt-0 first:mt-0">
      <div className="font-mono text-[13px] leading-snug">
        <p className="text-ink-2">{entry.period}</p>
        <p className="text-ink-3 mt-1">{entry.location}</p>
      </div>
      <div>
        <h3 className="font-semibold text-lg text-ink leading-snug">{entry.role}</h3>
        <p className="text-ink-2">{entry.company}</p>
        <p className="mt-3 text-ink max-w-[68ch]">{entry.brief}</p>
        <Details>
          <p className="max-w-[68ch]">{entry.detailed}</p>
          <p className="mt-3 font-mono text-[13px] text-ink-3">{entry.tags.join(' · ')}</p>
        </Details>
      </div>
    </article>
  );
}

export function Details({ children }) {
  return (
    <details className="group mt-3">
      <summary className="inline-flex items-center gap-2 font-mono text-[13px] text-accent hover:underline underline-offset-4">
        <span className="group-open:hidden">+</span>
        <span className="hidden group-open:inline">–</span>
        Details
      </summary>
      <div className="mt-3 text-ink-2">{children}</div>
    </details>
  );
}
