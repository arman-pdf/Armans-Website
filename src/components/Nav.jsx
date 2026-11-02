import React, { useEffect, useState } from 'react';
import { profile } from '../content';

const links = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const linkClass = (id) =>
    `font-sans text-sm transition-colors hover:text-accent ${
      active === id ? 'text-accent underline underline-offset-8 decoration-1' : 'text-ink-2'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/95 border-b ${scrolled ? 'border-rule' : 'border-transparent'}`}
    >
      <div className="mx-auto max-w-[1040px] px-4 md:px-6 h-14 flex items-center justify-between">
        <a href="#top" className="font-display text-lg text-ink">
          {profile.name}
        </a>
        <nav className="hidden md:flex gap-8" aria-label="Primary">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={linkClass(l.id)}>
              {l.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden font-mono text-xs uppercase tracking-[0.08em] text-ink-2"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="md:hidden border-t border-rule bg-paper px-4 py-4 flex flex-col gap-4" aria-label="Primary">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={linkClass(l.id)} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
