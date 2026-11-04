import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import ProjectImage from '../components/ProjectImage';
import { projects, projectLinks } from '../content';

function Bullets({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="pl-5 relative before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-flag">
          {it.text}
          {it.sub.length > 0 && (
            <ul className="mt-2 space-y-1.5 text-ink-2">
              {it.sub.map((s, j) => <li key={j} className="pl-5 relative before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-ink-3">{s}</li>)}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return <Navigate to="/projects" replace />;
  const p = projects[i];
  const prev = projects[i - 1];
  const next = projects[i + 1];
  const links = projectLinks[p.slug];
  const credit = p.team ? { label: 'Team', value: p.team } : p.role ? { label: 'Role', value: p.role } : null;

  return (
    <article className="mx-auto max-w-[1180px] px-5 md:px-8 pt-10 md:pt-16 pb-24">
      <Link to="/projects" className="text-sm font-medium text-flag-ink hover:underline underline-offset-4">← All projects</Link>
      <h1 className="mt-8 font-display font-extrabold text-[clamp(2.25rem,6vw,4.75rem)] leading-[0.98] tracking-[-0.035em] max-w-[20ch] text-balance">
        {p.title}
      </h1>
      <p className="mt-6 text-xl md:text-2xl text-ink-2 max-w-[44ch] text-balance">{p.tagline}</p>

      <div className="mt-10 aspect-[16/9] md:aspect-[2/1] max-h-[560px] overflow-hidden border border-rule bg-white/60">
        <ProjectImage project={p} size="hero" priority />
      </div>

      <div className="mt-14 grid md:grid-cols-12 gap-x-12 gap-y-12">
        <div className="md:col-span-8 space-y-12">
          <section>
            <h2 className="font-display font-extrabold text-3xl tracking-[-0.03em] mb-4">Overview</h2>
            <p className="text-lg leading-[1.7] max-w-[68ch]">{p.overview}</p>
          </section>
          <section>
            <h2 className="font-display font-extrabold text-3xl tracking-[-0.03em] mb-4">What I did</h2>
            <div className="max-w-[68ch]"><Bullets items={p.did} /></div>
          </section>
          <section>
            <h2 className="font-display font-extrabold text-3xl tracking-[-0.03em] mb-4">Outcomes</h2>
            <div className="max-w-[68ch]"><Bullets items={p.outcomes} /></div>
          </section>
          {links && (
            <section>
              <h2 className="font-display font-extrabold text-3xl tracking-[-0.03em] mb-4">Files and code</h2>
              <ul className="space-y-2 text-lg">
                {links.github && <li><a className="underline decoration-flag decoration-2 underline-offset-4 hover:text-flag-ink" href={links.github} target="_blank" rel="noopener noreferrer">View on GitHub ↗</a></li>}
                {links.report && <li><a className="underline decoration-flag decoration-2 underline-offset-4 hover:text-flag-ink" href={links.report} target="_blank" rel="noopener noreferrer">Read the report ↗</a></li>}
              </ul>
            </section>
          )}
          {p.related && (
            <section>
              <h2 className="font-display font-extrabold text-3xl tracking-[-0.03em] mb-4">Related co-op work</h2>
              <p className="text-lg max-w-[68ch]">{p.related.charAt(0).toUpperCase() + p.related.slice(1)}</p>
            </section>
          )}
        </div>

        <aside className="md:col-span-4 space-y-8 text-sm md:border-l md:border-rule md:pl-8 self-start">
          <div><p className="text-ink-3">When</p><p className="mt-1 text-base">{p.context}</p></div>
          {credit && <div><p className="text-ink-3">{credit.label}</p><p className="mt-1 text-base">{credit.value}</p></div>}
          <div><p className="text-ink-3">Tools and methods</p><p className="mt-1 text-base text-ink-2">{p.tools}</p></div>
          <div>
            <p className="text-ink-3">Topics</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <li key={t}><Link to={`/projects?tag=${encodeURIComponent(t)}`} className="inline-block border border-ink-3/50 px-3 py-1 text-ink-2 hover:border-ink hover:text-ink transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {p.image?.gallery.length > 0 && (
        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {p.image.gallery.map((g) => (
            <img key={g} src={`/projects/${p.slug}/${g}`} alt={`${p.title}: additional figure`} loading="lazy" decoding="async" className="w-full border border-rule bg-white/60" />
          ))}
        </div>
      )}

      <nav className="mt-20 grid grid-cols-2 gap-8 border-t border-rule pt-8" aria-label="More projects">
        <div>{prev && <Link to={`/projects/${prev.slug}`} className="group block"><span className="text-sm text-ink-3">← Previous</span><span className="mt-1 block font-display font-bold text-lg group-hover:text-flag-ink transition-colors text-balance">{prev.title}</span></Link>}</div>
        <div className="text-right">{next && <Link to={`/projects/${next.slug}`} className="group block"><span className="text-sm text-ink-3">Next →</span><span className="mt-1 block font-display font-bold text-lg group-hover:text-flag-ink transition-colors text-balance">{next.title}</span></Link>}</div>
      </nav>
    </article>
  );
}
