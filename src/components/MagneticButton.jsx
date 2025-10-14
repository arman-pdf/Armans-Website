import React, { useRef, useState } from 'react';

/**
 * MagneticButton Component
 *
 * Purpose: Interactive button with magnetic effect (follows mouse) and glow
 * Placement: CTA buttons, "View My Work", "Send Message", etc.
 * Performance: CSS transforms for GPU acceleration
 *
 * Features:
 * - Magnetic effect (button follows mouse when nearby)
 * - Smooth glow animation
 * - Ripple effect on click
 * - Customizable colors and sizes
 *
 * Props:
 * - children: button content
 * - variant: 'primary' | 'secondary' (default: 'primary')
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - onClick: click handler
 * - href: optional link
 * - Icon: optional icon component
 */
const MagneticButton = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick = null,
  href = null,
  Icon = null,
  className = ''
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Magnetic effect within 100px radius
    if (distance < 100) {
      const strength = 0.3;
      setPosition({
        x: distanceX * strength,
        y: distanceY * strength
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e) => {
    // Ripple effect
    const rect = buttonRef.current.getBoundingClientRect();
    const ripple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now()
    };
    setRipples([...ripples, ripple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  // Style variants
  const variants = {
    primary: {
      bg: 'bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600',
      glow: 'from-green-400 to-teal-400',
      text: 'text-white'
    },
    secondary: {
      bg: 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700',
      glow: 'from-blue-400 to-cyan-400',
      text: 'text-white'
    }
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg'
  };

  const selectedVariant = variants[variant];
  const selectedSize = sizes[size];

  const ButtonContent = () => (
    <>
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${selectedVariant.glow} rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse`} />

      {/* Button */}
      <div
        ref={buttonRef}
        className={`relative ${selectedVariant.bg} ${selectedSize} ${selectedVariant.text} rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group-hover:scale-105`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* Ripple effects */}
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0
            }}
          />
        ))}

        {/* Content */}
        <span className="relative flex items-center gap-2 justify-center">
          {children}
          {Icon && <Icon className="w-5 h-5" />}
        </span>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      <style jsx>{`
        @keyframes ripple {
          to {
            width: 500px;
            height: 500px;
            opacity: 0;
            transform: translate(-50%, -50%);
          }
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
      `}</style>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`relative inline-block group ${className}`}
      >
        <ButtonContent />
      </a>
    );
  }

  return (
    <div className={`relative inline-block group ${className}`}>
      <ButtonContent />
    </div>
  );
};

export default MagneticButton;
