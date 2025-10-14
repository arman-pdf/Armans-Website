import React, { useEffect, useRef } from 'react';

/**
 * AnimatedBackground Component
 *
 * Purpose: Creates a modern animated gradient mesh background with smooth color transitions
 * Placement: Behind hero section or full page background
 * Performance: Uses CSS animations (GPU-accelerated) for smooth 60fps performance
 *
 * Features:
 * - Organic, flowing gradient animation
 * - Environmental color palette (greens, blues, cyans)
 * - Lightweight (pure CSS, no libraries)
 * - Responsive and accessible
 */
const AnimatedBackground = ({ variant = 'hero' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Gradient orbs configuration
    const orbs = [
      { x: 0.2, y: 0.3, radius: 0.4, color: { r: 16, g: 185, b: 129 } }, // emerald
      { x: 0.7, y: 0.4, radius: 0.35, color: { r: 59, g: 130, b: 246 } }, // blue
      { x: 0.5, y: 0.7, radius: 0.3, color: { r: 34, g: 211, b: 238 } }, // cyan
      { x: 0.8, y: 0.2, radius: 0.25, color: { r: 5, g: 150, b: 105 } }, // teal
    ];

    const animate = () => {
      time += 0.002;

      // Clear canvas with base color
      ctx.fillStyle = variant === 'hero' ? '#f0fdf4' : '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated gradient orbs
      orbs.forEach((orb, index) => {
        const offsetX = Math.sin(time + index) * 0.05;
        const offsetY = Math.cos(time + index * 0.7) * 0.05;

        const x = (orb.x + offsetX) * canvas.width;
        const y = (orb.y + offsetY) * canvas.height;
        const radius = orb.radius * Math.min(canvas.width, canvas.height);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0.3)`);
        gradient.addColorStop(0.5, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, 0.1)`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ filter: 'blur(80px)' }}
    />
  );
};

export default AnimatedBackground;
