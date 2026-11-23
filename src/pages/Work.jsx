import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Entry from '../components/Entry';
import ResumeLink from '../components/ResumeLink';
import { experiences, education } from '../content';

// One row per role. The whole row opens that role's own page.
function Role({ e }) {
  return (
    <Link to={`/work/${e.slug}`} className="group grid md:grid-cols-12 gap-x-8 gap-y-3 py-9 border-t border-rule">
      <div className="md:col-span-3 text-sm tnum">
        <p className="text-ink font-medium">{e.period}</p>
        <p className="text-ink-3 mt-1">{e.location}</p>
      </div>
      <div className="md:col-span-9">
        <h2 className="font-display font-bold text-2xl md:text-3xl tracking-[-0.02em] leading-tight text-balance group-hover:text-flag-ink transition-colors">{e.role}</h2>
        <p className="mt-1 text-ink-2">{e.company}</p>
        <p className="mt-4 max-w-[68ch]">{e.brief}</p>
        <p className="mt-4 text-sm font-medium text-flag-ink">
          What I did and what I learned{' '}
          <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </p>
      </div>
    </Link>
  );
}

export default function Work() {
  return (
    <>
      <PageHeader title="Experience">
        Want the short version? It all fits on <ResumeLink>my one-page resume (PDF)</ResumeLink>.
      </PageHeader>
      <div className="mx-auto max-w-[73.75rem] px-5 md:px-8 pb-24">
        {experiences.map((e) => <Role key={e.slug} e={e} />)}
        <h2 className="mt-16 mb-2 font-display font-extrabold text-4xl md:text-5xl tracking-[-0.03em]">Education</h2>
        <Entry entry={education} />
      </div>
    </>
  );
}
