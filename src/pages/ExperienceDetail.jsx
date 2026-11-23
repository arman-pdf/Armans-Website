import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { experiences } from '../content';

function Points({ items }) {
  return (
    <ul className="space-y-3 max-w-[68ch]">
      {items.map((t, i) => (
        <li key={i} className="pl-5 relative before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-flag">{t}</li>
      ))}
    </ul>
  );
}

const h2 = 'font-display font-extrabold text-3xl tracking-[-0.03em] mb-4';

// One page per role, laid out like a project page: what it was, what I did, what I learned.
export default function ExperienceDetail() {
  const { slug } = useParams();
  const i = experiences.findIndex((e) => e.slug === slug);
  if (i === -1) return <Navigate to="/work" replace />;
  const e = experiences[i];
  const newer = experiences[i - 1];
  const older = experiences[i + 1];

  return (
    <article className="mx-auto max-w-[73.75rem] px-5 md:px-8 pt-10 md:pt-16 pb-24">
      <Link to="/work" className="text-sm font-medium text-flag-ink hover:underline underline-offset-4">← All experience</Link>
      <h1 className="mt-8 font-display font-extrabold text-[clamp(2.25rem,6vw,4.75rem)] leading-[0.98] tracking-[-0.035em] max-w-[20ch] text-balance">
        {e.role}
      </h1>
      <p className="mt-5 font-display text-xl md:text-2xl tracking-[-0.01em]">{e.company}</p>
      <p className="mt-4 text-xl text-ink-2 max-w-[52ch] text-balance">{e.brief}</p>

      <div className="mt-12 border-t border-rule pt-12 grid md:grid-cols-12 gap-x-12 gap-y-12">
        <div className="md:col-span-8 space-y-12">
          <section>
            <h2 className={h2}>Overview</h2>
            <div className="space-y-5 text-lg leading-[1.7] max-w-[68ch]">
              {e.overview.map((t, n) => <p key={n}>{t}</p>)}
            </div>
          </section>
          <section>
            <h2 className={h2}>What I did</h2>
            <Points items={e.did} />
          </section>
          <section>
            <h2 className={h2}>What I learned</h2>
            <Points items={e.learned} />
          </section>
          {e.links.length > 0 && (
            <section>
              <h2 className={h2}>Related</h2>
              <ul className="space-y-2 text-lg">
                {e.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="underline decoration-flag decoration-2 underline-offset-4 hover:text-flag-ink">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="md:col-span-4 space-y-8 text-sm md:border-l md:border-rule md:pl-8 self-start">
          <div><p className="text-ink-3">When</p><p className="mt-1 text-base tnum">{e.period}</p></div>
          <div><p className="text-ink-3">Where</p><p className="mt-1 text-base">{e.location}</p></div>
          <div>
            <p className="text-ink-3">Skills</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {e.skills.map((t) => <li key={t} className="border border-ink-3/50 px-3 py-1 text-ink-2">{t}</li>)}
            </ul>
          </div>
          <div><p className="text-ink-3">Worked with</p><p className="mt-1 text-base text-ink-2">{e.workedWith}</p></div>
        </aside>
      </div>

      <nav className="mt-20 grid grid-cols-2 gap-8 border-t border-rule pt-8" aria-label="More experience">
        <div>{newer && <Link to={`/work/${newer.slug}`} className="group block"><span className="text-sm text-ink-3">← More recent</span><span className="mt-1 block font-display font-bold text-lg group-hover:text-flag-ink transition-colors text-balance">{newer.role}</span></Link>}</div>
        <div className="text-right">{older && <Link to={`/work/${older.slug}`} className="group block"><span className="text-sm text-ink-3">Earlier →</span><span className="mt-1 block font-display font-bold text-lg group-hover:text-flag-ink transition-colors text-balance">{older.role}</span></Link>}</div>
      </nav>
    </article>
  );
}
