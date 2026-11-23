import React from 'react';
import { resume } from '../content';

// The one-page resume, one click away on every page. Opens the PDF in a new tab.
//   tab     bordered tab in the header (paper background)
//   button  outlined button on the dark green panels (hero, footer)
//   text    underlined link inside a sentence on paper
const styles = {
  tab: 'group inline-flex items-center gap-2 border border-ink px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:border-deep hover:bg-deep hover:text-paper',
  button: 'group inline-flex items-center gap-2.5 border border-paper/60 px-6 py-3 font-semibold text-paper transition-colors hover:border-flag hover:text-flag',
  text: 'font-medium underline decoration-flag decoration-2 underline-offset-4 hover:text-flag-ink',
};

const tag = {
  tab: 'hidden min-[400px]:inline font-mono text-[0.6875rem] tracking-[0.04em] text-ink-3 group-hover:text-paper/70',
  button: 'font-mono text-[0.6875rem] tracking-[0.04em] text-paper/60 group-hover:text-flag',
};

export default function ResumeLink({ variant = 'text', children }) {
  const marked = variant !== 'text';
  return (
    <a href={resume.href} target="_blank" rel="noopener noreferrer" className={styles[variant]}>
      {marked && <span aria-hidden className="inline-block h-2 w-2 shrink-0 bg-flag [clip-path:polygon(0_0,100%_50%,0_100%)]" />}
      {children ?? resume.label}
      {marked && <span className={tag[variant]}>PDF</span>}
    </a>
  );
}
