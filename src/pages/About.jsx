import React from 'react';
import PageHeader from '../components/PageHeader';
import { bio, skills } from '../content';

export default function About() {
  const [lead, ...more] = bio;
  return (
    <>
      <PageHeader title="About" />
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 pb-24">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12 items-start">
          <div className="lg:col-span-7 lg:order-1 order-2">
            <p className="font-display text-2xl md:text-3xl tracking-[-0.015em] leading-snug max-w-[30ch] text-balance">{lead}</p>
            <div className="mt-10 space-y-5 max-w-[60ch] text-lg">
              {more.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          <figure className="lg:col-span-5 lg:order-2 order-1 max-w-[420px] lg:max-w-none lg:sticky lg:top-24">
            <div className="overflow-hidden border border-rule bg-deep">
              <img
                src="/about/arman-900.jpg"
                srcSet="/about/arman-640.jpg 640w, /about/arman-900.jpg 900w"
                sizes="(min-width: 1024px) 440px, 90vw"
                width="900"
                height="1350"
                alt="Arman Kanorwalla smiling in his black University of Waterloo convocation gown with a teal hood, holding his diploma folder on campus at night"
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.04em] text-ink-3">
              <span aria-hidden className="inline-block h-2.5 w-2.5 bg-flag [clip-path:polygon(0_0,100%_50%,0_100%)]" />
              UNIVERSITY OF WATERLOO · CONVOCATION
            </figcaption>
          </figure>
        </div>

        <h2 className="mt-20 mb-6 font-display font-extrabold text-3xl md:text-4xl tracking-[-0.03em]">Toolkit</h2>
        <dl className="border-t border-rule">
          {skills.map((g) => (
            <div key={g.category} className="grid md:grid-cols-12 gap-x-8 gap-y-1 py-5 border-b border-rule">
              <dt className="md:col-span-3 font-medium">{g.category}</dt>
              <dd className="md:col-span-9">
                {g.items.map((s, i) => (
                  <span key={s.name}>
                    {i > 0 && <span className="text-ink-3"> · </span>}
                    <span>{s.name}</span>{' '}
                    <span className="text-ink-3 text-sm">{s.desc}</span>
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
