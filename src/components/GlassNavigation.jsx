import React, { useState, useEffect } from 'react';

/**
 * GlassNavigation Component
 *
 * Purpose: Modern glassmorphism navigation bar with blur effect and smooth transitions
 * Placement: Replaces existing navigation bar
 * Performance: CSS backdrop-filter with GPU acceleration
 *
 * Features:
 * - Glassmorphism effect (frosted glass)
 * - Smooth scroll-based opacity changes
 * - Active link highlighting with glow
 * - Mobile-responsive
 * - Smooth animations
 *
 * Props:
 * - logo: string or component
 * - links: array of {href, label}
 */
const GlassNavigation = ({ logo = "Arman Kanorwalla", links = [] }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Listen to scroll on the snap-y container instead of window
    const scrollContainer = document.querySelector('.snap-y');

    const handleScroll = () => {
      if (scrollContainer) {
        setScrolled(scrollContainer.scrollTop > 50);

        // Update active section based on scroll position in the container
        const scrollPosition = scrollContainer.scrollTop + window.innerHeight / 2;
        const sections = links.map(link => link.href.replace('#', ''));

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
              setActiveSection(sections[i]);
              break;
            }
          }
        }
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [links]);

  return (
    <>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/60 backdrop-blur-xl border-b border-green-100/30'
            : 'bg-white/40 backdrop-blur-md border-b border-white/10'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo with glow effect */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500" />
            <a
              href="#home"
              className="relative text-2xl font-bold bg-gradient-to-r from-green-700 via-blue-600 to-emerald-600 bg-clip-text text-transparent transition-all duration-300 hover:scale-105"
            >
              {logo}
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-6">
            {links.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <div key={link.href} className="relative">
                  {/* Active link glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur-sm opacity-50 animate-pulse" />
                  )}

                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const targetId = link.href.replace('#', '');
                      const targetSection = document.getElementById(targetId);
                      const scrollContainer = document.querySelector('.snap-y');

                      if (targetSection && scrollContainer) {
                        scrollContainer.scrollTo({
                          top: targetSection.offsetTop,
                          behavior: 'smooth'
                        });
                        setActiveSection(targetId);
                      }
                    }}
                    className={`relative px-3 py-1 rounded-lg transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'text-green-700 font-semibold bg-white/60'
                        : 'text-gray-700 hover:text-green-600 hover:bg-white/40'
                    }`}
                  >
                    {link.label}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content jump */}
      <div className="h-20" />
    </>
  );
};

export default GlassNavigation;
