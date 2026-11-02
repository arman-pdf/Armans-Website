import React from 'react';
import PageHeader from '../components/PageHeader';
import { bio, skills } from '../content';

export default function About() {
  const [lead, ...more] = bio;
  return (
    <>
      <PageHeader title="About" />
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 pb-24">
        <p className="font-display text-2xl md:text-3xl tracking-[-0.015em] leading-snug max-w-[30ch] text-balance">{lead}</p>
        <div className="mt-10 space-y-5 max-w-[68ch] text-lg">
          {more.map((p, i) => <p key={i}>{p}</p>)}
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
