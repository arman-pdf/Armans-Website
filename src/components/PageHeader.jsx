import React from 'react';

export default function PageHeader({ title, children }) {
  return (
    <div className="mx-auto max-w-[1180px] px-5 md:px-8 pt-16 md:pt-24 pb-12 md:pb-16">
      <h1 className="font-display font-extrabold text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] tracking-[-0.035em] text-balance">
        {title}
      </h1>
      {children && <div className="mt-6 max-w-[60ch] text-lg text-ink-2">{children}</div>}
    </div>
  );
}
