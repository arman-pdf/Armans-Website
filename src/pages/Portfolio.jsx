import React from 'react';
import Section from '../components/Section';
import Entry, { Details } from '../components/Entry';
import {
  profile, contact, bio, skills, experiences, education, projects, projectsIntro,
} from '../content';

const linkClass =
  'underline decoration-rule underline-offset-4 hover:decoration-accent hover:text-accent transition-colors';

function Hero() {
  return (
    <section className="pt-20 md:pt-32 pb-20">
      <div className="mx-auto max-w-[1040px] px-4 md:px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <h1 className="font-display font-medium text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.02em]">
            {profile.name}
          </h1>
          <p className="mt-4 font-display text-xl md:text-2xl text-ink-2">{profile.title}</p>
          <p className="mt-8 text-lg max-w-[60ch]">{profile.tagline}</p>

          <div className="mt-8 font-mono text-[13px] space-y-2">
            <p className="flex items-start gap-2 text-ink-2">
              <span aria-hidden className="inline-block h-1.5 w-1.5 shrink-0 mt-[7px] rounded-full bg-accent" />
              {profile.status} · {profile.location} · {profile.relocation}
            </p>
            <p className="text-ink-3">
              {profile.stats.coopTerms} co-op terms · {projects.length} projects completed ·{' '}
              {profile.stats.yearsExperience} years experience
            </p>
          </div>

          <p className="mt-8 flex gap-6 text-ink">
            <a className={linkClass} href={`mailto:${contact.email}`}>Email ↗</a>
            <a className={linkClass} href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </p>
          <div id="assistant-slot" />
        </div>
        <div className="lg:col-span-5">
          <div id="terrain-slot" className="aspect-[5/4] w-full" />
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <>
      <Hero />

      <Section id="about" label="About">
        <div className="space-y-5 max-w-[68ch]">
          {bio.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <dl className="mt-14 border-t border-rule">
          {skills.map((g) => (
            <div key={g.category} className="grid md:grid-cols-[180px_1fr] gap-x-8 gap-y-1 py-4 border-b border-rule">
              <dt className="font-mono text-[13px] text-ink-2">{g.category}</dt>
              <dd>
                {g.items.map((s, i) => (
                  <span key={s.name}>
                    {i > 0 && <span className="text-ink-3"> · </span>}
                    <span className="text-ink">{s.name}</span>{' '}
                    <span className="text-ink-3 text-sm">{s.desc}</span>
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="experience" label="Experience">
        {experiences.map((e) => <Entry key={e.id} entry={e} />)}
        <h3 className="mt-16 mb-8 font-mono text-xs uppercase tracking-[0.08em] text-ink-2">Education</h3>
        <Entry entry={education} />
      </Section>

      <Section id="projects" label="Projects">
        <p className="text-ink-2 max-w-[68ch] mb-10">{projectsIntro}</p>
        <ol>
          {projects.map((p, i) => (
            <li key={p.slug} className="group/row grid grid-cols-[40px_1fr] gap-x-4 py-6 border-t border-rule last:border-b">
              <span className="font-mono text-[13px] text-ink-3 pt-1">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-semibold text-ink transition-colors group-hover/row:text-accent">{p.title}</h3>
                <p className="mt-1 text-ink-2 max-w-[68ch]">{p.brief}</p>
                <p className="mt-2 font-mono text-[13px] text-ink-3">{p.tags.join(' · ')}</p>
                <Details>
                  <p className="max-w-[68ch]">{p.detailed}</p>
                </Details>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="contact" label="Contact">
        <p className="text-ink-2 max-w-[56ch]">{contact.intro}</p>
        <a
          href={`mailto:${contact.email}`}
          className="mt-8 inline-block font-display text-3xl md:text-4xl underline decoration-rule underline-offset-8 hover:decoration-accent break-all"
        >
          {contact.email}
        </a>
        <ul className="mt-8 space-y-2 font-mono text-[13px] text-ink-2">
          <li><a className={linkClass} href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
          <li>{profile.location} · {profile.relocation}</li>
          <li>{profile.degreeLine}</li>
        </ul>
      </Section>
    </>
  );
}
