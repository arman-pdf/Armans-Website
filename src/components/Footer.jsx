import React from 'react';
import { Link } from 'react-router-dom';
import { profile, contact, otter } from '../content';
import meta from '../assets/terrain.json';
import ResumeLink from './ResumeLink';

export default function Footer() {
  return (
    <footer className="on-deep bg-deep text-paper">
      <div className="mx-auto max-w-[73.75rem] px-5 md:px-8 py-14 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-6">
          <p className="font-display font-bold text-3xl md:text-4xl tracking-[-0.02em] leading-tight">
            Open to opportunities in groundwater, GIS, compliance and ESG.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a href={`mailto:${contact.email}`} className="text-lg underline decoration-flag decoration-2 underline-offset-8 hover:text-flag">
              {contact.email}
            </a>
            <ResumeLink variant="button">One-page resume</ResumeLink>
          </div>
        </div>
        <nav className="md:col-span-3 flex flex-col gap-2 text-paper/80" aria-label="Footer">
          <Link className="hover:text-flag" to="/work">Work</Link>
          <Link className="hover:text-flag" to="/projects">Projects</Link>
          <Link className="hover:text-flag" to="/about">About</Link>
          <Link className="hover:text-flag" to="/contact">Contact</Link>
          <a className="hover:text-flag" href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </nav>
        <p className="md:col-span-3 font-mono text-[0.6875rem] leading-relaxed text-paper/60">
          &copy; {new Date().getFullYear()} {profile.name}
          <br />
          Terrain: {meta.name}, {meta.minElevation}–{meta.maxElevation} m. Elevation data from {meta.source}.
          <br />
          Wildlife on site: <a href={otter.href} className="underline decoration-paper/30 underline-offset-2 hover:text-flag hover:decoration-flag">one otter</a>.
        </p>
      </div>
    </footer>
  );
}
