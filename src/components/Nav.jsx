import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { profile } from '../content';

const links = [
  { to: '/work', label: 'Work' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  const cls = ({ isActive }) =>
    `text-sm transition-colors hover:text-flag-ink ${isActive ? 'text-ink underline decoration-flag decoration-2 underline-offset-[10px]' : 'text-ink-2'}`;

  return (
    <header className="sticky top-0 z-40 bg-paper/95 border-b border-rule">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8 h-14 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-lg tracking-[-0.01em] text-ink">
          {profile.name}
        </Link>
        <nav className="hidden md:flex gap-9" aria-label="Primary">
          {links.map((l) => <NavLink key={l.to} to={l.to} className={cls}>{l.label}</NavLink>)}
        </nav>
        <button
          type="button"
          className="md:hidden text-sm font-medium text-ink"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Primary" className="md:hidden border-t border-rule bg-paper px-5 py-5 flex flex-col gap-5">
          {links.map((l) => <NavLink key={l.to} to={l.to} className={cls}>{l.label}</NavLink>)}
        </nav>
      )}
    </header>
  );
}
