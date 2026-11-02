import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { projects, projectsIntro } from '../content';

export default function Projects() {
  return (
    <>
      <PageHeader title="Projects">{projectsIntro}</PageHeader>
      <ul className="mx-auto max-w-[1180px] px-5 md:px-8 pb-24">
        {projects.map((p) => (
          <li key={p.slug} className="border-t border-rule last:border-b">
            <Link to={`/projects/${p.slug}`} className="group grid md:grid-cols-12 gap-x-8 gap-y-2 py-8">
              <span className="md:col-span-7 font-display font-bold text-2xl md:text-3xl tracking-[-0.02em] leading-tight group-hover:text-flag-ink transition-colors text-balance">
                {p.title}
              </span>
              <span className="md:col-span-5 text-ink-2">
                {p.brief}
                <span className="mt-2 block text-sm text-ink-3">{p.tags.join(' · ')}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
