import React, { useState } from 'react';

/**
 * GlowingCard Component
 *
 * Purpose: Modern card with animated glow effect on hover and gradient borders
 * Placement: Projects section, Experience cards, any content cards
 * Performance: CSS-based animations with GPU acceleration
 *
 * Features:
 * - Animated gradient border that follows mouse position
 * - Soft glow effect on hover
 * - Glassmorphism background
 * - Smooth transitions
 * - Customizable glow colors
 *
 * Usage:
 * <GlowingCard glowColor="green" | "blue" | "cyan" | "purple">
 *   <YourContent />
 * </GlowingCard>
 */
const GlowingCard = ({
  children,
  glowColor = 'green',
  className = '',
  onClick = null,
  hoverable = true
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const glowColors = {
    green: {
      primary: 'rgba(16, 185, 129, 0.4)',
      secondary: 'rgba(5, 150, 105, 0.3)',
      border: 'from-emerald-400 via-green-500 to-teal-400'
    },
    blue: {
      primary: 'rgba(59, 130, 246, 0.4)',
      secondary: 'rgba(37, 99, 235, 0.3)',
      border: 'from-blue-400 via-cyan-500 to-blue-600'
    },
    cyan: {
      primary: 'rgba(34, 211, 238, 0.4)',
      secondary: 'rgba(6, 182, 212, 0.3)',
      border: 'from-cyan-400 via-blue-400 to-teal-400'
    },
    purple: {
      primary: 'rgba(168, 85, 247, 0.4)',
      secondary: 'rgba(147, 51, 234, 0.3)',
      border: 'from-purple-400 via-violet-500 to-indigo-400'
    },
    orange: {
      primary: 'rgba(251, 146, 60, 0.4)',
      secondary: 'rgba(249, 115, 22, 0.3)',
      border: 'from-orange-400 via-amber-500 to-yellow-400'
    }
  };

  const selectedGlow = glowColors[glowColor] || glowColors.green;

  const handleMouseMove = (e) => {
    if (!hoverable) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}
      onClick={onClick}
    >
      {/* Animated gradient border - only visible on hover */}
      {isHovered && (
        <div
          className="absolute -inset-[1px] rounded-xl transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${selectedGlow.primary}, ${selectedGlow.secondary})`,
            filter: 'blur(2px)',
            opacity: 0.4
          }}
        />
      )}

      {/* Glow effect - only visible on hover, contained within card */}
      {isHovered && (
        <div
          className="absolute inset-0 blur-md transition-opacity duration-300 rounded-xl pointer-events-none overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${selectedGlow.primary}, transparent 50%)`,
            opacity: 0.15
          }}
        />
      )}

      {/* Card content with glassmorphism */}
      <div className="relative bg-white/90 backdrop-blur-md rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50">
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-rotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-rotate {
          background-size: 200% 200%;
          animation: gradient-rotate 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default GlowingCard;
