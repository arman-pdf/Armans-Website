import React, { useState, useEffect } from 'react';

/**
 * ScrollIndicator Component
 *
 * Purpose: Shows vertical dots indicating current section and allows navigation
 * Placement: Fixed on right side of screen
 *
 * Features:
 * - Visual indicator of current section
 * - Click to navigate to sections
 * - Smooth transitions
 * - Accessible
 */
const ScrollIndicator = ({ sections = [] }) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Get the scroll container (the main div with overflow-y-scroll)
      const scrollContainer = document.querySelector('.snap-y');
      if (!scrollContainer) return;

      const scrollPosition = scrollContainer.scrollTop + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollContainer.scrollTop;
          const elementBottom = elementTop + rect.height;

          // Check if the center of the viewport is within this section
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(index);
          }
        }
      });
    };

    // Listen to scroll on the main container
    const scrollContainer = document.querySelector('.snap-y');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check

      // Also check on window resize
      window.addEventListener('resize', handleScroll);

      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative"
          aria-label={`Go to ${section.label}`}
        >
          {/* Dot indicator */}
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index
                ? 'bg-gradient-to-r from-green-600 to-blue-600 scale-125'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
          />

          {/* Tooltip label */}
          <span className="absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ScrollIndicator;
