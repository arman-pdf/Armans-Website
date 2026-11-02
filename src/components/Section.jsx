import React from 'react';

export default function Section({ id, label, children }) {
  return (
    <section id={id} className="border-t border-rule py-20 md:py-28 scroll-mt-14">
      <div className="mx-auto max-w-[1040px] px-4 md:px-6 grid md:grid-cols-12 gap-y-8 md:gap-x-8">
        <div className="md:col-span-3 md:sticky md:top-24 self-start">
          <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-ink-2">{label}</h2>
          <div data-rule-draw className="mt-3 h-px w-12 bg-accent origin-left" />
        </div>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}
