import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

/**
 * GlassNavigation Component
 */
const GlassNavigation = ({ logo = "Arman Kanorwalla", links = [], activeSection = null }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, link) => {
    if (link.scrollTo) {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(link.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(link.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActiveLink = (link) => {
    if (link.scrollTo && location.pathname === '/') {
      return activeSection === link.scrollTo;
    }
    return location.pathname === link.href;
  };

  const linkBaseStyles = "px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium font-body";
  const linkActiveStyles = "text-green-700 bg-green-50";
  const linkInactiveStyles = "text-gray-600 hover:text-green-700 hover:bg-green-50/50";

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm'
          : 'bg-white/60 backdrop-blur-md'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xl font-bold text-gray-900 hover:text-green-700 transition-colors"
        >
          {logo}
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {links.map((link) => {
            const active = isActiveLink(link);

            if (link.scrollTo) {
              return (
                <button
                  key={link.href}
                  onClick={(e) => handleClick(e, link)}
                  className={`${linkBaseStyles} ${active ? linkActiveStyles : linkInactiveStyles}`}
                >
                  {link.label}
                </button>
              );
            }

            return (
              <NavLink
                key={link.href}
                to={link.href}
                className={`${linkBaseStyles} ${active ? linkActiveStyles : linkInactiveStyles}`}
              >
                {link.label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default GlassNavigation;
