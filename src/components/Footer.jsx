import React from 'react';
import { profile, contact } from '../content';

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[1040px] px-4 md:px-6 py-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between font-mono text-xs text-ink-3">
        <p>&copy; {new Date().getFullYear()} {profile.name}</p>
        <p className="flex gap-5">
          <a className="hover:text-accent" href={`mailto:${contact.email}`}>Email</a>
          <a className="hover:text-accent" href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </p>
      </div>
    </footer>
  );
}
