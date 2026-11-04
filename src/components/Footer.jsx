import React from 'react';
import { Link } from 'react-router-dom';
import { profile, contact } from '../content';
import meta from '../assets/terrain.json';

export default function Footer() {
  return (
    <footer className="on-deep bg-deep text-paper">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 py-14 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-6">
          <p className="font-display font-bold text-3xl md:text-4xl tracking-[-0.02em] leading-tight">
            Open to opportunities in groundwater, GIS, compliance and ESG.
          </p>
          <a href={`mailto:${contact.email}`} className="mt-6 inline-block text-lg underline decoration-flag decoration-2 underline-offset-8 hover:text-flag">
            {contact.email}
          </a>
        </div>
        <nav className="md:col-span-3 flex flex-col gap-2 text-paper/80" aria-label="Footer">
          <Link className="hover:text-flag" to="/work">Work</Link>
          <Link className="hover:text-flag" to="/projects">Projects</Link>
          <Link className="hover:text-flag" to="/about">About</Link>
          <Link className="hover:text-flag" to="/contact">Contact</Link>
          <a className="hover:text-flag" href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </nav>
        <p className="md:col-span-3 font-mono text-[11px] leading-relaxed text-paper/60">
          &copy; {new Date().getFullYear()} {profile.name}
          <br />
          Terrain: {meta.name}, {meta.minElevation}–{meta.maxElevation} m. Elevation data from {meta.source}.
          <br />
          Optional spoken answers: AI-generated voice, Pocket TTS by Kyutai (CC BY 4.0). Landscape pillars by Hairline (MIT).{' '}
          <a className="underline hover:text-flag" href="/tts/NOTICE.txt" target="_blank" rel="noopener noreferrer">Credits</a>
        </p>
      </div>
    </footer>
  );
}
