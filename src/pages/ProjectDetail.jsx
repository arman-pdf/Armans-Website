import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { projects } from '../content';

export default function ProjectDetail() {
  const { slug } = useParams();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return <Navigate to="/projects" replace />;
  const p = projects[i];
  const prev = projects[i - 1];
  const next = projects[i + 1];

  return (
    <article className="mx-auto max-w-[1180px] px-5 md:px-8 pt-12 md:pt-20 pb-24">
      <Link to="/projects" className="text-sm font-medium text-flag-ink hover:underline underline-offset-4">← All projects</Link>
      <h1 className="mt-8 font-display font-extrabold text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.035em] max-w-[22ch] text-balance">
        {p.title}
      </h1>
      <p className="mt-6 text-xl text-ink-2 max-w-[60ch]">{p.brief}</p>
      <div className="mt-12 grid md:grid-cols-12 gap-x-8 gap-y-8 border-t border-rule pt-10">
        <p className="md:col-span-8 text-lg leading-[1.7] max-w-[68ch]">{p.detailed}</p>
        <ul className="md:col-span-4 text-sm text-ink-2 space-y-2">
          {p.tags.map((t) => <li key={t} className="border-b border-rule pb-2">{t}</li>)}
        </ul>
      </div>
      <nav className="mt-20 grid grid-cols-2 gap-8 border-t border-rule pt-8" aria-label="More projects">
        <div>{prev && <Link to={`/projects/${prev.slug}`} className="group block"><span className="text-sm text-ink-3">Previous</span><span className="mt-1 block font-display font-bold text-lg group-hover:text-flag-ink transition-colors">{prev.title}</span></Link>}</div>
        <div className="text-right">{next && <Link to={`/projects/${next.slug}`} className="group block"><span className="text-sm text-ink-3">Next</span><span className="mt-1 block font-display font-bold text-lg group-hover:text-flag-ink transition-colors">{next.title}</span></Link>}</div>
      </nav>
    </article>
  );
}
