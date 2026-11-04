import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ProjectImage from '../components/ProjectImage';
import { projects, projectsIntro } from '../content';

const FlagMark = () => (
  <span aria-label="Featured" role="img" className="inline-block h-2.5 w-2.5 bg-flag [clip-path:polygon(0_0,100%_50%,0_100%)]" />
);

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const active = params.get('tag');

  const tags = useMemo(() => {
    const counts = {};
    projects.forEach((p) => p.tags.forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, []);

  const shown = active ? projects.filter((p) => p.tags.includes(active)) : projects;
  const years = [...new Set(shown.map((p) => p.year))];

  const chip = (isOn) =>
    `px-3.5 py-1.5 text-sm border transition-colors ${isOn ? 'bg-deep text-paper border-deep' : 'border-ink-3/50 text-ink-2 hover:border-ink hover:text-ink'}`;

  return (
    <>
      <PageHeader title="Projects">{projectsIntro}</PageHeader>

      <div className="mx-auto max-w-[1180px] px-5 md:px-8 pb-10">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by topic">
          <button type="button" className={chip(!active)} aria-pressed={!active} onClick={() => setParams({})}>All</button>
          {tags.map((t) => (
            <button key={t} type="button" className={chip(active === t)} aria-pressed={active === t} onClick={() => setParams({ tag: t })}>
              {t}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-3" aria-live="polite">
          {shown.length} {shown.length === 1 ? 'project' : 'projects'}{active ? ` in ${active}` : ''}
          {' · '}<span className="inline-flex items-center gap-1.5"><FlagMark /> featured</span>
        </p>
      </div>

      <div className="mx-auto max-w-[1180px] px-5 md:px-8 pb-24">
        {years.map((y) => (
          <section key={y} className="grid md:grid-cols-12 gap-x-8 border-t border-rule pt-8 pb-6" aria-label={`Projects from ${y}`}>
            <h2 className="md:col-span-2 font-display font-extrabold text-3xl tracking-[-0.03em] mb-4 md:mb-0 tnum">{y}</h2>
            <ul className="md:col-span-10 space-y-10">
              {shown.filter((p) => p.year === y).map((p) => (
                <li key={p.slug}>
                  <Link to={`/projects/${p.slug}`} className="group grid sm:grid-cols-[200px_1fr] gap-x-8 gap-y-4">
                    <span className="block aspect-[4/3] overflow-hidden border border-rule bg-white/60">
                      <ProjectImage project={p} className="transition-transform duration-500 group-hover:scale-[1.03]" />
                    </span>
                    <span>
                      <span className="flex items-start gap-2.5">
                        {p.featured && <span className="mt-[11px]"><FlagMark /></span>}
                        <span className="font-display font-bold text-2xl leading-tight tracking-[-0.02em] text-balance group-hover:text-flag-ink transition-colors">{p.title}</span>
                      </span>
                      <span className="mt-2 block text-ink-2 max-w-[62ch]">{p.tagline}</span>
                      <span className="mt-3 block text-sm text-ink-3">{p.context}</span>
                      <span className="mt-1 block text-sm text-ink-3">{p.tags.join(' · ')}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
