import React from 'react';
import { Link } from 'react-router-dom';
import TerrainFigure from '../components/TerrainFigure';
import { profile, experiences, projects } from '../content';

const [first, ...rest] = profile.name.split(' ');

function Arrow() {
  return <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>;
}

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 5);

  return (
    <>
      <section className="on-deep bg-deep text-paper">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-14 md:py-24 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <h1 className="font-display font-extrabold text-[clamp(3.25rem,10vw,6rem)] leading-[0.92] tracking-[-0.04em]">
              {first}<br />{rest.join(' ')}
            </h1>
            <p className="mt-6 font-display text-xl md:text-2xl text-paper/80 tracking-[-0.01em]">{profile.title}</p>
            <p className="mt-6 text-lg text-paper/90 max-w-[52ch]">{profile.tagline}</p>
            <p className="mt-6 flex items-start gap-2 text-sm text-paper/70">
              <span aria-hidden className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-flag" />
              {profile.status} · {profile.location} · {profile.relocation}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link to="/projects" className="bg-flag text-deep font-semibold px-7 py-3 hover:bg-paper transition-colors">
                See projects
              </Link>
              <Link to="/contact" className="font-medium underline decoration-flag decoration-2 underline-offset-8 hover:text-flag">
                Get in touch
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <TerrainFigure />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 md:px-8 py-20 md:py-28">
        <div className="flex items-end justify-between gap-6 mb-10">
          <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-[-0.03em] leading-none">Experience</h2>
          <Link to="/work" className="group text-sm font-medium text-flag-ink">All experience <Arrow /></Link>
        </div>
        <ul>
          {experiences.slice(0, 3).map((e) => (
            <li key={e.id} className="border-t border-rule last:border-b">
              <Link to="/work" className="group grid md:grid-cols-12 gap-x-8 gap-y-1 py-6 items-baseline">
                <span className="md:col-span-5 font-display font-bold text-xl md:text-2xl tracking-[-0.02em] group-hover:text-flag-ink transition-colors">{e.role}</span>
                <span className="md:col-span-4 text-ink-2">{e.company}</span>
                <span className="md:col-span-3 text-sm text-ink-3 tnum md:text-right">{e.period}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-rule">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-20 md:py-28">
          <div className="flex items-end justify-between gap-6 mb-10">
            <h2 className="font-display font-extrabold text-4xl md:text-5xl tracking-[-0.03em] leading-none">Projects</h2>
            <Link to="/projects" className="group text-sm font-medium text-flag-ink">All projects <Arrow /></Link>
          </div>
          <ul>
            {featured.map((p) => (
              <li key={p.slug} className="border-t border-rule last:border-b">
                <Link to={`/projects/${p.slug}`} className="group flex items-baseline justify-between gap-6 py-6">
                  <span>
                    <span className="block font-display font-bold text-xl md:text-2xl tracking-[-0.02em] group-hover:text-flag-ink transition-colors text-balance">{p.title}</span>
                    <span className="mt-1 block text-ink-2 max-w-[60ch]">{p.tagline}</span>
                  </span>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
