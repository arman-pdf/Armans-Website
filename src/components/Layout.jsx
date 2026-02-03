import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';
import GlassNavigation from './GlassNavigation';
import FloatingChatButton from './FloatingChatButton';

/**
 * Layout Component
 *
 * Wraps all pages with shared navigation and footer
 */
export default function Layout() {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Navigation links - scroll sections for homepage, routes for other pages
  const navLinks = [
    { href: '/', label: 'Home', scrollTo: 'home' },
    { href: '/#about', label: 'About', scrollTo: 'about' },
    { href: '/projects', label: 'Projects' },
    { href: '/experience', label: 'Experience' },
    { href: '/#contact', label: 'Contact', scrollTo: 'contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 relative">
      <AnimatedBackground variant="hero" />
      <GlassNavigation
        logo="Arman Kanorwalla"
        links={navLinks}
        activeSection={location.pathname === '/' ? activeSection : null}
      />

      <main>
        <Outlet context={{ setActiveSection }} />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <p className="font-body">&copy; 2025 Arman Kanorwalla. All rights reserved.</p>
        </div>
      </footer>

      <FloatingChatButton />
    </div>
  );
}
